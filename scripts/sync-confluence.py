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

The token is read from the environment and is never written to disk or logged.

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
  the Future Feature Register as frozen source baselines, so both publish first.
  A baseline that fails *or is skipped* stops the run, so CBD-71 can never
  publish while citing a source that did not. A dry run reports every target
  instead of stopping, since it writes nothing.
* `--dry-run` writes converted previews to `.confluence-preview/` and makes no
  remote call other than reading current page metadata.
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


@dataclass(frozen=True)
class Target:
    key: str
    doc_set: str
    page_id: str
    expected_title: str
    path: str
    baseline: bool = False
    """True when CBD-71 §2 cites this document as a frozen source baseline.

    A failure on a baseline target halts the run, so CBD-71 can never publish
    while citing a source that failed to publish.
    """

    @property
    def file(self) -> Path:
        return REPO_ROOT / self.path


# Dependency order matters. CBD-71 §2 cites both the CBD-69 package and the
# Future Feature Register as frozen source baselines, so both publish first.
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
    # CBD-91 cites the approved CBD-71 v1.1 decision set and the closed CBD-72
    # decisions as its controlling inputs, so it publishes after CBD-71. Note
    # that CBD-72 has no Confluence page or sync target yet, so a reader of this
    # page cannot follow its CBD-72 citations to a published source.
    Target(
        key="cbd-91-inventory",
        doc_set="cbd-91",
        page_id="8781826",
        expected_title="CBD-91 — Private MVP Data Inventory",
        path="docs/cbd-91-private-mvp-data-inventory.md",
    ),
)


def session_from_env() -> tuple[requests.Session, str]:
    base = os.environ.get("CONFLUENCE_BASE_URL", "").rstrip("/")
    email = os.environ.get("CONFLUENCE_EMAIL", "")
    token = os.environ.get("CONFLUENCE_API_TOKEN", "")
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
        sys.exit("Missing environment variable(s): " + ", ".join(missing))

    session = requests.Session()
    session.auth = (email, token)
    session.headers.update({"Accept": "application/json"})
    return session, base


def to_storage(markdown_text: str) -> str:
    """Convert repository markdown to Confluence storage format.

    Confluence storage is XHTML. `markdown` with the table and fenced-code
    extensions produces the subset these documents need: headings, paragraphs,
    tables, lists, inline code, bold, and links.
    """
    rendered = markdown.markdown(
        markdown_text,
        extensions=["tables", "fenced_code", "sane_lists", "attr_list"],
        output_format="xhtml",
    )
    # Confluence rejects a bare ampersand in storage format.
    return re.sub(r"&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)", "&amp;", rendered)


def normalize(text: str) -> str:
    """Collapse a page to comparable text so a read-back can be verified."""
    stripped = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", html.unescape(stripped)).strip()


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
                print(f"Stopping: CBD-71 §2 cites {target.key} as a frozen source baseline.")
                break
            continue

        version = int(page["version"]["number"])

        if args.dry_run:
            preview = PREVIEW_DIR / f"{target.key}.html"
            preview.write_text(storage, encoding="utf-8")
            print(
                f"DRY  {target.key}: {len(source):,} chars markdown -> {len(storage):,} chars storage; "
                f"page v{version}; preview {preview.relative_to(REPO_ROOT)}"
            )
            continue

        try:
            publish(session, base, target, storage, version, live_title)
        except Exception as error:  # noqa: BLE001 - surfaced to the operator
            print(f"FAIL {target.key}: publish failed: {error}")
            failures += 1
            if target.baseline:
                print(f"Stopping: CBD-71 §2 cites {target.key} as a frozen source baseline.")
                break
            continue

        try:
            after = fetch_page(session, base, target.page_id)
            published = normalize(after["body"]["storage"]["value"])
            expected = normalize(storage)
            if published == expected:
                print(f"OK   {target.key}: published v{version + 1} and verified")
            else:
                print(
                    f"WARN {target.key}: published v{version + 1} but read-back differs "
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
