#!/usr/bin/env python3
"""Publish approved repository documents to their Confluence pages.

The repository is the working source for Confluence-backed documentation. A
document is synchronized to Confluence only after its change has merged to
`main`, per the repository working rules in AGENTS.md. This script performs
that synchronization so the published page is a mechanical copy of the merged
file rather than a hand-retyped one.

Setup
-----
    pip install markdown requests

    export CONFLUENCE_BASE_URL=https://cobudget.atlassian.net
    export CONFLUENCE_EMAIL=you@example.com
    export CONFLUENCE_API_TOKEN=...      # id.atlassian.com/manage-profile/security/api-tokens

Values are read from the environment first, then from an untracked `.env.local`
at the repository root, which is where `docs/development.md` places secrets.
The token is never written to disk or logged.

Usage
-----
    python scripts/sync-confluence.py --dry-run            # convert only, write previews
    python scripts/sync-confluence.py --only cbd-71-register
    python scripts/sync-confluence.py --set cbd-69         # publish one document set
    python scripts/sync-confluence.py --set cross-cutting  # the Future Feature Register
    python scripts/sync-confluence.py                      # publish everything, in order

Publish one page first and look at it in Confluence before doing a whole set.
Markdown-to-storage conversion is deterministic but not visually identical to
the Confluence editor, and these are approved governing documents.

Safety behavior
---------------
* Every target records the page title it expects. If the live title differs the
  page is skipped, so a wrong or reused page ID cannot silently overwrite an
  unrelated page. Page titles are managed in Confluence and are not derived from
  the document heading; several intentionally differ. Read the live title before
  changing an expected_title, and never relax the comparison to make a mismatch
  pass.
* Targets publish in dependency order. CBD-71 §2 cites the CBD-69 package and
  the Future Feature Register as frozen source baselines, so both publish first;
  CBD-91 cites the CBD-72 permission model and traceability record, so CBD-72
  publishes before it. A baseline that fails *or is skipped* stops the run, so a
  citing document can never publish while a source it cites did not. A dry run
  reports every target instead of stopping, since it writes nothing.
* `--dry-run` writes converted previews to `.confluence-preview/` and makes no
  remote call other than reading current page metadata.
* A ```mermaid fence publishes as a code block, keeping the diagram source
  readable on the page. The installed mermaid app stores diagrams as page
  attachments rendered in the browser, which a server-side publisher cannot
  produce; see the MERMAID_FENCE comment before attempting macro output again.
* After each write the page is read back and compared on a normalized text
  projection. A mismatch is reported and sets a non-zero exit code.
"""

from __future__ import annotations

import argparse
import html
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path

try:
    import markdown  # type: ignore
except ImportError:  # pragma: no cover - dependency guidance
    sys.exit("Missing dependency. Run: pip install markdown requests")

try:
    import requests  # type: ignore
except ImportError:  # pragma: no cover - dependency guidance
    sys.exit("Missing dependency. Run: pip install markdown requests")


REPO_ROOT = Path(__file__).resolve().parent.parent
PREVIEW_DIR = REPO_ROOT / ".confluence-preview"

# A ```mermaid fence publishes as a code block. This is a decision, not a gap.
#
# The "Mermaid Diagrams for Confluence" app installed here (macro key
# `mermaid-cloud`) does not read a diagram from the macro body. It keeps two
# page attachments per diagram — an extensionless file holding the mermaid
# source, and a sibling `.png` of the rendered image — and the macro carries
# only `filename`, `toolbar`, `zoom` and `revision` pointing at that pair. The
# PNG is produced by the app's renderer in the browser when someone edits the
# macro, so a server-side publisher cannot generate it.
#
# Publishing the macro with the source in `ac:plain-text-body` was tried on
# 2026-08-16: Confluence accepted the macro, silently discarded the body, and
# CBD-92 section 4 published as four empty diagrams with the source lost from
# the page. Code blocks keep the source readable and are the approved behavior
# per the Product Owner decision that day. Diagrams render from the same
# markdown on GitHub.
#
# Reviving macro output requires uploading both attachments per diagram and
# solving the browser-side render, not a flag.
MERMAID_FENCE = re.compile(r"^```mermaid[ \t]*\n(.*?)^```[ \t]*$", re.MULTILINE | re.DOTALL)


@dataclass(frozen=True)
class Target:
    key: str
    doc_set: str
    page_id: str
    expected_title: str
    path: str
    baseline: bool = False
    """True when a later target cites this document as a frozen source baseline.

    A failure on a baseline target halts the run, so a citing document can never
    publish while the source it cites failed to publish. CBD-71 §2 cites the
    CBD-69 package and the Future Feature Register; CBD-91 cites the CBD-72
    permission model and traceability record.
    """

    @property
    def file(self) -> Path:
        return REPO_ROOT / self.path


# Dependency order matters. CBD-71 §2 cites both the CBD-69 package and the
# Future Feature Register as frozen source baselines, so both publish first.
# CBD-72 then publishes before CBD-91, which cites its closed decisions, and
# CBD-91 before CBD-92, which CBD-93 in turn consumes.
TARGETS: tuple[Target, ...] = (
    Target(
        key="cbd-69-specification",
        doc_set="cbd-69",
        page_id="3538946",
        expected_title="CBD-69 — Period Edge Cases & Validation Rule Specification",
        path="docs/cbd-69-period-edge-cases-validation-rule-specification.md",
        baseline=True,
    ),
    Target(
        key="cbd-69-scenarios",
        doc_set="cbd-69",
        page_id="3571722",
        expected_title="CBD-69 — Period Edge Case Scenario Catalog",
        path="docs/cbd-69-period-edge-case-scenario-catalog.md",
        baseline=True,
    ),
    Target(
        key="cbd-69-traceability",
        doc_set="cbd-69",
        page_id="3670026",
        expected_title="CBD-69 — Acceptance Criteria Traceability",
        path="docs/cbd-69-acceptance-criteria-traceability.md",
        baseline=True,
    ),
    Target(
        key="future-feature-register",
        doc_set="cross-cutting",
        page_id="950274",
        expected_title="CoBudget Future Feature Register",
        path="docs/cobudget-future-feature-register.md",
        baseline=True,
    ),
    Target(
        key="cbd-71-register",
        doc_set="cbd-71",
        page_id="6914050",
        expected_title="CBD-71 — MVP Schedule Decisions",
        path="docs/cbd-71-mvp-schedule-decision-register.md",
    ),
    Target(
        key="cbd-71-checklist",
        doc_set="cbd-71",
        page_id="6160404",
        expected_title="CBD-71 — MVP Schedule Decisions Validation Checklist",
        path="docs/cbd-71-validation-checklist.md",
    ),
    Target(
        key="cbd-71-traceability",
        doc_set="cbd-71",
        page_id="6782985",
        expected_title="CBD-71 — Acceptance Criteria Traceability and Review Record",
        path="docs/cbd-71-acceptance-criteria-traceability.md",
    ),
    # CBD-72 inherits CBD-71 v1.1 under its closed decision OD-72-06, so it
    # publishes after CBD-71. The permission model and the traceability record
    # are baselines: CBD-91 §1 and §8 cite the model's closed OD-72 decisions,
    # and CBD-91 v1.0.1 additionally cites RF-72-61, which lives in the
    # traceability record. The scenario catalog is not a baseline because no
    # later target cites it.
    Target(
        key="cbd-72-model",
        doc_set="cbd-72",
        page_id="8880130",
        expected_title="CBD-72 — Collaboration Permission Model",
        path="docs/cbd-72-collaboration-permission-model.md",
        baseline=True,
    ),
    Target(
        key="cbd-72-scenarios",
        doc_set="cbd-72",
        page_id="8880151",
        expected_title="CBD-72 — Authorization Scenario Catalog",
        path="docs/cbd-72-authorization-scenario-catalog.md",
    ),
    Target(
        key="cbd-72-traceability",
        doc_set="cbd-72",
        page_id="8880172",
        expected_title="CBD-72 — Acceptance Criteria Traceability and Review Record",
        path="docs/cbd-72-acceptance-criteria-traceability.md",
        baseline=True,
    ),
    # CBD-91 cites the approved CBD-71 v1.1 decision set and the closed CBD-72
    # decisions as its controlling inputs, so it publishes after both. It is
    # itself a baseline because CBD-93 §1 and §12 cite the v1.0.1 inventory as
    # the authoritative input its whole analysis is built on.
    Target(
        key="cbd-91-inventory",
        doc_set="cbd-91",
        page_id="8781826",
        expected_title="CBD-91 — Private MVP Data Inventory",
        path="docs/cbd-91-private-mvp-data-inventory.md",
        baseline=True,
    ),
    # CBD-92 consumes the CBD-91 inventory and the approved CBD-72 decisions, so
    # it publishes after both. The technical model is a baseline because CBD-93
    # consumes its approved SA/CA/CL/PA/NT/EM/OP/AN/RL contracts and cites its
    # threat register throughout. The traceability record is not a baseline
    # because no later document cites it.
    Target(
        key="cbd-92-threat-model",
        doc_set="cbd-92",
        page_id="8945669",
        expected_title="CBD-92 — System Flow, Trust Boundary, and Technical Threat Model",
        path="docs/cbd-92-system-flow-technical-threat-model.md",
        baseline=True,
    ),
    Target(
        key="cbd-92-traceability",
        doc_set="cbd-92",
        page_id="8945690",
        expected_title="CBD-92 — Acceptance Criteria Traceability and Review Record",
        path="docs/cbd-92-acceptance-criteria-traceability.md",
    ),
    # CBD-93 consumes the CBD-91 inventory, the CBD-72 permission model, and the
    # CBD-92 contracts, so it publishes before CBD-94. It is a baseline because
    # CBD-94 §2 freezes its v1.1 blob and routes all 86 AB-93 scenarios, 96
    # active SG-93 safeguards, EG-93-001–010, and RI-93-001–019 from it.
    Target(
        key="cbd-93-abuse-analysis",
        doc_set="cbd-93",
        page_id="8749076",
        expected_title="CBD-93 — Privacy, Coercion, Surveillance, and Abuse-Case Analysis",
        path="docs/cbd-93-privacy-coercion-abuse-analysis.md",
        baseline=True,
    ),
    # CBD-94 consumes the frozen CBD-91 v1.0.1, CBD-92 v1.0, and CBD-93 v1.1
    # blobs listed in its §2 source baseline, so the whole set publishes after
    # them. Within the set the order follows the header citations: the register
    # is cited by the inventory's "Governing register" field and the
    # traceability record's "Primary evidence" field; the inventory is cited by
    # "Verification evidence"; the findings record is cited by "Independent
    # review". The traceability record therefore publishes last and is not a
    # baseline, since nothing cites it. This mirrors the CBD-92 arrangement.
    #
    # These four pages were created as placeholders on August 16, 2026 to
    # reserve the targets; the first successful run replaces that placeholder
    # text with the merged v1.0 content. Until then the repository files are
    # authoritative, per traceability record RV-94-019.
    Target(
        key="cbd-94-register",
        doc_set="cbd-94",
        page_id="9601026",
        expected_title="CBD-94 — Risk, Mitigation, and Security/Privacy Requirement Register",
        path="docs/cbd-94-risk-mitigation-requirement-register.md",
        baseline=True,
    ),
    Target(
        key="cbd-94-verification-inventory",
        doc_set="cbd-94",
        page_id="9535490",
        expected_title="CBD-94 — Verification, Negative-Test, and Specialist-Review Inventory",
        path="docs/cbd-94-verification-review-inventory.md",
        baseline=True,
    ),
    Target(
        key="cbd-94-review-findings",
        doc_set="cbd-94",
        page_id="9633793",
        expected_title="CBD-94 — Exhaustive Review Findings",
        path="docs/cbd-94-exhaustive-review-findings.md",
        baseline=True,
    ),
    Target(
        key="cbd-94-traceability",
        doc_set="cbd-94",
        page_id="9273364",
        expected_title="CBD-94 — Acceptance Criteria Traceability and Review Record",
        path="docs/cbd-94-acceptance-criteria-traceability.md",
    ),
    # CBD-95 consolidates the frozen CBD-91 through CBD-94 blobs recorded in its
    # manifest §2, so the whole set publishes after them. Within the set the
    # order follows the header citations: the matrix names the manifest as its
    # "Governing package"; the register names both the manifest and the matrix;
    # the traceability record cites all three as deliverable evidence. The
    # traceability record therefore publishes last and is not a baseline, since
    # nothing cites it. This mirrors the CBD-92 and CBD-94 arrangements.
    #
    # The execution plan is deliberately not a target. It is working material
    # rather than a CBD-95 deliverable: the plan's own §4 lists the manifest,
    # matrix, register, traceability record, and audit script as the artifacts,
    # and CBD-94 likewise published no plan.
    #
    # These four pages were created as placeholders on August 16, 2026 to
    # reserve the targets; the first successful run replaces that placeholder
    # text with the merged approved content. Until then the repository files on
    # `main` are authoritative.
    Target(
        key="cbd-95-manifest",
        doc_set="cbd-95",
        page_id="9797633",
        expected_title="CBD-95 — Threat-Model and Data-Inventory Package Manifest",
        path="docs/cbd-95-threat-model-package-manifest.md",
        baseline=True,
    ),
    Target(
        key="cbd-95-reconciliation-matrix",
        doc_set="cbd-95",
        page_id="9830401",
        expected_title="CBD-95 — CBD-12 Security and Privacy Reconciliation Matrix",
        path="docs/cbd-95-cbd-12-reconciliation-matrix.md",
        baseline=True,
    ),
    Target(
        key="cbd-95-follow-up-register",
        doc_set="cbd-95",
        page_id="9863169",
        expected_title="CBD-95 — Architecture, Roadmap, and Follow-up Register",
        path="docs/cbd-95-architecture-roadmap-follow-up-register.md",
        baseline=True,
    ),
    Target(
        key="cbd-95-traceability",
        doc_set="cbd-95",
        page_id="9895937",
        expected_title="CBD-95 — Acceptance Criteria Traceability and Review Record",
        path="docs/cbd-95-acceptance-criteria-traceability.md",
    ),
    # CBD-73 consumes the approved CBD-72 permission model, the CBD-71 v1.1
    # schedule decisions, the CBD-91 data classes, and the CBD-94
    # SR-94-007–SR-94-011 requirements, so it publishes after those sets.
    # Within the set the order follows the header citations: the lifecycle
    # specification is cited by every other document's "Governing
    # specification" field, the message and test inventories are cited by the
    # traceability record's deliverable table, and the findings record is cited
    # by its "Independent review" field. The traceability record therefore
    # publishes last and is not a baseline, since nothing cites it.
    #
    # These five pages were created as placeholders on August 18, 2026 to
    # reserve the targets; the first successful run replaces that placeholder
    # text with the merged approved v1.0 content. Until then the repository
    # files on `main` are authoritative, per OI-73-007.
    Target(
        key="cbd-73-specification",
        doc_set="cbd-73",
        page_id="11370497",
        expected_title="CBD-73 — Invitation, Consent, and Revocation Lifecycle Specification",
        path="docs/cbd-73-invitation-consent-lifecycle-specification.md",
        baseline=True,
    ),
    Target(
        key="cbd-73-message-inventory",
        doc_set="cbd-73",
        page_id="11403265",
        expected_title="CBD-73 — Customer-Facing Message Inventory",
        path="docs/cbd-73-customer-message-inventory.md",
        baseline=True,
    ),
    Target(
        key="cbd-73-test-inventory",
        doc_set="cbd-73",
        page_id="11436033",
        expected_title="CBD-73 — Negative and Recovery Test Inventory",
        path="docs/cbd-73-negative-recovery-test-inventory.md",
        baseline=True,
    ),
    Target(
        key="cbd-73-review-findings",
        doc_set="cbd-73",
        page_id="11468801",
        expected_title="CBD-73 — Exhaustive Review Findings",
        path="docs/cbd-73-exhaustive-review-findings.md",
        baseline=True,
    ),
    Target(
        key="cbd-73-traceability",
        doc_set="cbd-73",
        page_id="11403286",
        expected_title="CBD-73 — Acceptance Criteria Traceability and Review Record",
        path="docs/cbd-73-acceptance-criteria-traceability.md",
    ),
    # CBD-102 derives its gates from the approved CBD-72 permission model, the
    # CBD-91 inventory, the CBD-92 contract registers, and the architecture
    # security baseline, so the whole set publishes after those.
    #
    # Within the set the ordering rule differs from every set above, and the
    # difference is deliberate rather than an oversight. The CBD-9x sets form an
    # acyclic citation chain, so their order is the citation order. CBD-102 does
    # not: the catalog §2.4 cites the evidence register §3.3 for the UNPROVEN
    # gate outcome, and the evidence register cites catalog gates throughout.
    # The rubric and the demand model are mutually referential the same way,
    # since WR-102-019 scores against the demand model's base tier while the
    # demand model exists to serve the rubric and cost template. No acyclic
    # order exists to follow.
    #
    # The five documents were written and merged as one unit at one version in
    # PR #47, so the order below is reading order — the gates, the rubric that
    # scores what the gates deliberately do not, the demand quantities, the cost
    # structure those quantities feed, and the evidence rules that govern all
    # four. The first four carry baseline=True so that any failure or skip halts
    # the run and the set cannot publish half-way, which is the property that
    # actually matters for a mutually-referential set. The evidence register is
    # not a baseline only because nothing publishes after it.
    #
    # These five pages were created as placeholders on August 16, 2026 and were
    # first published from the repository later that day, so they hold real
    # content rather than placeholder text. The Product Owner approved the set
    # at v1.0 on August 18, 2026 after a full audit; this run republishes that
    # approved content.
    Target(
        key="cbd-102-gate-catalog",
        doc_set="cbd-102",
        page_id="9371654",
        expected_title="CBD-102 — Provider Requirements and Hard-Gate Catalog",
        path="docs/cbd-102-provider-requirements-hard-gate-catalog.md",
        baseline=True,
    ),
    Target(
        key="cbd-102-rubric",
        doc_set="cbd-102",
        page_id="9142327",
        expected_title="CBD-102 — Weighted Provider Evaluation Rubric",
        path="docs/cbd-102-provider-evaluation-rubric.md",
        baseline=True,
    ),
    Target(
        key="cbd-102-demand-model",
        doc_set="cbd-102",
        page_id="9273396",
        expected_title="CBD-102 — Private MVP Demand Model",
        path="docs/cbd-102-demand-model.md",
        baseline=True,
    ),
    Target(
        key="cbd-102-cost-template",
        doc_set="cbd-102",
        page_id="9469982",
        expected_title="CBD-102 — Provider Cost Template",
        path="docs/cbd-102-cost-template.md",
        baseline=True,
    ),
    Target(
        key="cbd-102-evidence-register",
        doc_set="cbd-102",
        page_id="9601048",
        expected_title="CBD-102 — Evidence Register and Exception Rules",
        path="docs/cbd-102-evidence-register-and-exception-rules.md",
    ),
)


def load_env_file() -> dict[str, str]:
    """Read `.env.local` if present. Values are returned, never logged.

    `docs/development.md` places secrets in an untracked `.env.local`, so an
    operator who followed that guidance should not also have to export the same
    values into the shell. Environment variables still win, which keeps CI and
    one-off overrides working.
    """
    path = REPO_ROOT / ".env.local"
    if not path.is_file():
        return {}
    values: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def session_from_env() -> tuple[requests.Session, str]:
    from_file = load_env_file()

    def credential(name: str) -> str:
        return os.environ.get(name) or from_file.get(name, "")

    base = credential("CONFLUENCE_BASE_URL").rstrip("/")
    email = credential("CONFLUENCE_EMAIL")
    token = credential("CONFLUENCE_API_TOKEN")
    missing = [
        name
        for name, value in (
            ("CONFLUENCE_BASE_URL", base),
            ("CONFLUENCE_EMAIL", email),
            ("CONFLUENCE_API_TOKEN", token),
        )
        if not value
    ]
    if missing:
        sys.exit(
            "Missing credential(s): "
            + ", ".join(missing)
            + ". Set them in the environment or in an untracked .env.local at the "
            "repository root."
        )

    session = requests.Session()
    session.auth = (email, token)
    session.headers.update({"Accept": "application/json"})
    return session, base


def to_storage(markdown_text: str) -> str:
    """Convert repository markdown to Confluence storage format.

    Confluence storage is XHTML. `markdown` with the table and fenced-code
    extensions produces the subset these documents need: headings, paragraphs,
    tables, lists, inline code, bold, and links. A ```mermaid fence becomes a
    code block; see the MERMAID_FENCE comment for why that is the decision.
    """
    rendered = markdown.markdown(
        markdown_text,
        extensions=["tables", "fenced_code", "sane_lists", "attr_list"],
        output_format="xhtml",
    )
    # Confluence rejects a bare ampersand in storage format.
    return re.sub(r"&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)", "&amp;", rendered)


def normalize(text: str) -> str:
    """Collapse a page to comparable text so a read-back can be verified.

    CDATA content is held aside before tags are stripped. Confluence stores a
    code-macro body as CDATA, and that body is literal text that may contain
    `<`, `>` or `-->`; stripping tags over it consumes from the CDATA opener to
    the first `>` inside the code and leaves the read-back comparing two equally
    damaged projections rather than the content it is supposed to verify. That
    matters most for the documents whose diagrams publish as code blocks.
    """
    literals: list[str] = []

    def hold(match: re.Match[str]) -> str:
        literals.append(match.group(1))
        return f" \x01{len(literals) - 1}\x01 "

    text = re.sub(r"<!\[CDATA\[(.*?)\]\]>", hold, text, flags=re.DOTALL)
    stripped = re.sub(r"<[^>]+>", " ", text)
    collapsed = re.sub(r"\s+", " ", html.unescape(stripped)).strip()
    for index, literal in enumerate(literals):
        collapsed = collapsed.replace(f"\x01{index}\x01", re.sub(r"\s+", " ", literal).strip())
    return collapsed


def fetch_page(session: requests.Session, base: str, page_id: str) -> dict:
    response = session.get(
        f"{base}/wiki/api/v2/pages/{page_id}",
        params={"body-format": "storage"},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def publish(session: requests.Session, base: str, target: Target, storage: str, version: int, title: str) -> None:
    payload = {
        "id": target.page_id,
        "status": "current",
        "title": title,
        "body": {"representation": "storage", "value": storage},
        "version": {
            "number": version + 1,
            "message": f"Sync from repository {target.path} on main",
        },
    }
    response = session.put(
        f"{base}/wiki/api/v2/pages/{target.page_id}",
        json=payload,
        headers={"Content-Type": "application/json"},
        timeout=60,
    )
    if not response.ok:
        raise RuntimeError(f"{response.status_code} {response.text[:400]}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="convert and write previews without publishing")
    parser.add_argument("--only", metavar="KEY", help="publish a single target by key")
    parser.add_argument("--set", metavar="DOC_SET", dest="doc_set", help="publish one document set, e.g. cbd-69")
    parser.add_argument("--list", action="store_true", help="list targets and exit")
    args = parser.parse_args()

    if args.list:
        for target in TARGETS:
            print(f"{target.key:24} {target.doc_set:8} page {target.page_id:9} {target.path}")
        return 0

    selected = [
        target
        for target in TARGETS
        if (not args.only or target.key == args.only) and (not args.doc_set or target.doc_set == args.doc_set)
    ]
    if not selected:
        sys.exit("No targets matched. Use --list to see available keys.")

    session, base = session_from_env()
    if args.dry_run:
        PREVIEW_DIR.mkdir(exist_ok=True)

    failures = 0
    for target in selected:
        if not target.file.exists():
            print(f"FAIL {target.key}: missing {target.path}")
            failures += 1
            continue

        source = target.file.read_text(encoding="utf-8")
        storage = to_storage(source)
        diagrams = len(MERMAID_FENCE.findall(source))

        try:
            page = fetch_page(session, base, target.page_id)
        except Exception as error:  # noqa: BLE001 - surfaced to the operator
            print(f"FAIL {target.key}: cannot read page {target.page_id}: {error}")
            failures += 1
            continue

        live_title = page.get("title", "")
        if live_title != target.expected_title:
            print(
                f"SKIP {target.key}: page {target.page_id} is titled {live_title!r}, "
                f"expected {target.expected_title!r}. Refusing to overwrite an unexpected page."
            )
            print(f"     If the page was deliberately renamed, update expected_title for {target.key}.")
            failures += 1
            if target.baseline and not args.dry_run:
                print(f"Stopping: a later target cites {target.key} as a frozen source baseline.")
                break
            continue

        version = int(page["version"]["number"])

        if args.dry_run:
            preview = PREVIEW_DIR / f"{target.key}.html"
            preview.write_text(storage, encoding="utf-8")
            note = f"; {diagrams} mermaid diagram(s) as code blocks" if diagrams else ""
            print(
                f"DRY  {target.key}: {len(source):,} chars markdown -> {len(storage):,} chars storage; "
                f"page v{version}; preview {preview.relative_to(REPO_ROOT)}{note}"
            )
            continue

        try:
            publish(session, base, target, storage, version, live_title)
        except Exception as error:  # noqa: BLE001 - surfaced to the operator
            print(f"FAIL {target.key}: publish failed: {error}")
            failures += 1
            if target.baseline:
                print(f"Stopping: a later target cites {target.key} as a frozen source baseline.")
                break
            continue

        try:
            after = fetch_page(session, base, target.page_id)
            published = normalize(after["body"]["storage"]["value"])
            expected = normalize(storage)
            # Report the version Confluence actually stored, not the one this
            # run expected. When the converted storage is byte-identical to the
            # live page Confluence keeps the existing version, so `version + 1`
            # would claim a revision that does not exist and turn a no-op into
            # false evidence of a publish.
            stored = after.get("version", {}).get("number", version + 1)
            unchanged = " (content already current, no new version)" if stored == version else ""
            if published == expected:
                print(f"OK   {target.key}: page v{stored} verified{unchanged}")
            else:
                print(
                    f"WARN {target.key}: page v{stored} but read-back differs "
                    f"({len(expected):,} vs {len(published):,} normalized chars). Review the page."
                )
                failures += 1
        except Exception as error:  # noqa: BLE001 - surfaced to the operator
            print(f"WARN {target.key}: published but verification failed: {error}")
            failures += 1

    if failures:
        print(f"\n{failures} target(s) need attention.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
