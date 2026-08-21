#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-130 package.

Same rationale as the five sibling audits: the CBD-95 close-out found
hand-restated figures contradicting the artifacts they summarized, so everything
the CBD-130 documents restate is derived here rather than frozen as constants.

Category-N specifics this audit adds over the CBD-107 shape:

* the applicable gate set is X plus N (23 gates) with two Config gates, one of
  them contributed by category N itself (HG-102-075);
* **this is the only package that publishes rubric scores**, so the audit
  recomputes the weighted totals from the per-dimension subscores and fails if
  the published total drifts, and checks the category-N weight column against
  the approved rubric rather than trusting a transcription;
* the evaluation records the set's first FAIL, so the audit asserts that a FAIL
  carries an INELIGIBLE verdict and that the residual record names an approver
  field -- a FAIL silently upgraded to CONDITIONAL without one would be an
  unapproved exception, which EX-102-001 forbids;
* PN-130-* decisions live in the specification and the two documents must not
  collide on OI-130-* numbering, which they did in draft and which this audit
  now prevents;
* the EV-102 register spans six documents; this package's stated block is
  132-161, with records and reservations read separately so a number appearing
  in both fails.

Documentation integrity only. It verifies no gate result, retrieves no
evidence, prices nothing, sends nothing, and does not establish that any PN-130
design is implemented.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

CATALOG = Path("docs/cbd-102-provider-requirements-hard-gate-catalog.md")
RUBRIC = Path("docs/cbd-102-provider-evaluation-rubric.md")
DEMAND = Path("docs/cbd-102-demand-model.md")
COST = Path("docs/cbd-102-cost-template.md")
EVIDENCE = Path("docs/cbd-102-evidence-register-and-exception-rules.md")

SPEC = Path("docs/cbd-130-push-and-sms-delivery-boundary-specification.md")
EVALUATION = Path("docs/cbd-130-candidate-shortlist-and-gate-evaluation.md")
OPERATIONAL = Path("docs/cbd-130-operational-and-cost-assessment.md")
TRACE = Path("docs/cbd-130-acceptance-criteria-traceability.md")

H_TOPOLOGY = Path("docs/cbd-103-runtime-topology-specification.md")
H_EVALUATION = Path("docs/cbd-103-candidate-shortlist-and-gate-evaluation.md")
H_OPERATIONAL = Path("docs/cbd-103-operational-and-cost-assessment.md")
H_TRACE = Path("docs/cbd-103-acceptance-criteria-traceability.md")

I_EVALUATION = Path("docs/cbd-104-candidate-shortlist-and-gate-evaluation.md")
D_EVALUATION = Path("docs/cbd-105-candidate-shortlist-and-gate-evaluation.md")
E_EVALUATION = Path("docs/cbd-106-candidate-shortlist-and-gate-evaluation.md")
F_EVALUATION = Path("docs/cbd-107-candidate-shortlist-and-gate-evaluation.md")

PACKAGE_FILES = (SPEC, EVALUATION, OPERATIONAL, TRACE)
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST, EVIDENCE)
CBD_103_FILES = (H_TOPOLOGY, H_EVALUATION, H_OPERATIONAL, H_TRACE)
SIBLING_REGISTERS = (
    H_EVALUATION, I_EVALUATION, D_EVALUATION, E_EVALUATION, F_EVALUATION,
)

CROSS_CATEGORY = "X"
NOTIFICATION_CATEGORY = "N"
EVALUATED_CATEGORIES = (CROSS_CATEGORY, NOTIFICATION_CATEGORY)
CANDIDATES = ("C2", "C3", "C10")
MATRIX_OUTCOMES = ("PASS (design)", "PASS", "UNPROVEN", "FAIL")
EVIDENCE_KINDS = ("OBS", "DOC", "CFG")
FINDINGS = ("F1", "F2", "F3", "F4", "F5", "F6")

EV_RECORDS = range(132, 141)
EV_RESERVED = range(141, 162)

PN_DECISIONS = 16

# Category-N rubric weights, checked against the approved rubric rather than
# trusted. The evaluation's weighted totals are recomputed from these.
DIMENSIONS = (
    ("Security", 16),
    ("Privacy", 26),
    ("Reliability", 18),
    ("Portability", 14),
    ("Solo-operator ongoing effort", 10),
    ("Support", 8),
    ("Accessibility", 8),
)

BORROWED_IDENTIFIERS: dict[str, tuple[str, ...]] = {
    "DI-91": ("cbd-91-private-mvp-data-inventory.md",),
    "EG-91": ("cbd-91-private-mvp-data-inventory.md",),
    "CR-91": ("cbd-91-private-mvp-data-inventory.md",),
    "DF-91": ("cbd-91-private-mvp-data-inventory.md",),
    "SA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "OP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "AN-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TB-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "PA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SYS-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "NT-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EM-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "CL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TH-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SR-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "ME-94": (
        "cbd-94-risk-mitigation-requirement-register.md",
        "cbd-94-verification-review-inventory.md",
    ),
    "FU-95": ("cbd-95-architecture-roadmap-follow-up-register.md",),
    "PM-72": ("cbd-72-collaboration-permission-model.md",),
    "CF-74": ("cbd-74-accountability-alert-boundary-specification.md",),
    "MN-74": ("cbd-74-accountability-alert-boundary-specification.md",),
}


@dataclass
class Audit:
    checks: int = 0
    failures: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def check(self, condition: bool, message: str) -> None:
        self.checks += 1
        if not condition:
            self.failures.append(message)


def read(path: Path) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def catalog_gates() -> dict[str, dict[str, str]]:
    gates: dict[str, dict[str, str]] = {}
    for line in read(CATALOG).splitlines():
        if not line.startswith("| HG-102-"):
            continue
        cell = cells(line)
        if len(cell) < 6:
            continue
        gates[cell[0]] = {"category": cell[1], "type": cell[5]}
    return gates


def matrix_rows(text: str) -> dict[str, dict[str, str]]:
    rows: dict[str, dict[str, str]] = {}
    width = 2 + len(CANDIDATES)
    for line in text.splitlines():
        if not line.startswith("| HG-102-"):
            continue
        cell = cells(line)
        if len(cell) < width + 1 or cell[1] not in EVIDENCE_KINDS:
            continue
        rows[cell[0].split()[0]] = dict(
            {"kind": cell[1]}, **dict(zip(CANDIDATES, cell[2:width]))
        )
    return rows


def normalise_outcome(cell: str) -> str | None:
    bare = cell.replace("`", "").replace("**", "").strip()
    return bare if bare in MATRIX_OUTCOMES else None


def declared_tally(text: str) -> dict[str, dict[str, int]]:
    declared: dict[str, dict[str, int]] = {}
    for line in text.splitlines():
        cell = cells(line)
        if len(cell) != 1 + len(CANDIDATES):
            continue
        label = cell[0].replace("`", "").strip()
        if label not in MATRIX_OUTCOMES:
            continue
        try:
            declared[label] = {
                name: int(value) for name, value in zip(CANDIDATES, cell[1:])
            }
        except ValueError:
            continue
    return declared


def defined_ids(text: str, prefix: str) -> set[str]:
    found: set[str] = set()
    row = re.compile(rf"^\|\s*({prefix}-\d+)\s*\|")
    heading = re.compile(rf"^`({prefix}-\d+)` — \*\*")
    for line in text.splitlines():
        for pattern in (row, heading):
            match = pattern.match(line)
            if match:
                found.add(match.group(1))
    return found


def referenced_ids(text: str, prefix: str) -> set[str]:
    return set(re.findall(rf"\b{prefix}-\d+\b", text))


def register_rows(text: str) -> set[str]:
    return set(re.findall(r"^\|\s*(EV-102-\d+)\s*\|", text, re.M))


def rubric_weight_column() -> dict[str, int]:
    """Read the category-N weight column out of the approved rubric §4 table."""
    weights: dict[str, int] = {}
    for line in read(RUBRIC).splitlines():
        cell = cells(line)
        if len(cell) != 8 or not cell[0] or cell[0].startswith("---"):
            continue
        name = cell[0].replace("**", "").strip()
        try:
            weights[name] = int(cell[7])
        except ValueError:
            continue
    return weights


def main() -> int:
    audit = Audit()

    every_file = (
        PACKAGE_FILES + CBD_102_FILES + CBD_103_FILES + SIBLING_REGISTERS
    )
    for path in every_file:
        audit.check((ROOT / path).is_file(), f"missing {path}")
    if audit.failures:
        return finish(audit)

    package = {path: read(path) for path in PACKAGE_FILES}
    joined = "\n".join(package.values())
    evaluation = package[EVALUATION]

    gates = catalog_gates()
    audit.check(
        len(gates) == 75,
        f"catalog gate count changed: expected 75, found {len(gates)}",
    )

    by_category = {
        category: {
            gate for gate, meta in gates.items() if meta["category"] == category
        }
        for category in EVALUATED_CATEGORIES
    }
    applicable = by_category[CROSS_CATEGORY] | by_category[NOTIFICATION_CATEGORY]
    audit.check(
        len(applicable) == 23,
        f"applicable X+N gate count changed: expected 23, found {len(applicable)}",
    )

    notification_config = {
        gate
        for gate in by_category[NOTIFICATION_CATEGORY]
        if gates[gate]["type"].lower() == "config"
    }
    audit.check(
        len(notification_config) == 1,
        "the evaluation states category N carries one Config gate, but the "
        f"catalog now marks {sorted(notification_config)} Config",
    )

    # ---- Matrix completeness, per section ------------------------------------
    cross_section, _, rest = evaluation.partition("### 6.2")
    notification_section, _, _ = rest.partition("### 6.3")
    cross_section = cross_section.partition("### 6.1")[2]

    cross_rows = matrix_rows(cross_section)
    notification_rows = matrix_rows(notification_section)
    audit.check(
        set(cross_rows) == by_category[CROSS_CATEGORY],
        "section 6.1 does not carry exactly the cross-category gates; "
        f"missing {sorted(by_category[CROSS_CATEGORY] - set(cross_rows))}, "
        f"unexpected {sorted(set(cross_rows) - by_category[CROSS_CATEGORY])}",
    )
    audit.check(
        set(notification_rows) == by_category[NOTIFICATION_CATEGORY],
        "section 6.2 does not carry exactly the category-N gates; "
        f"missing {sorted(by_category[NOTIFICATION_CATEGORY] - set(notification_rows))}, "
        f"unexpected {sorted(set(notification_rows) - by_category[NOTIFICATION_CATEGORY])}",
    )

    rows = {**cross_rows, **notification_rows}
    audit.check(set(rows) == applicable, "matrix does not cover the X+N gate set")

    for gate, row in sorted(rows.items()):
        for candidate in CANDIDATES:
            audit.check(
                normalise_outcome(row[candidate]) is not None,
                f"{gate} {candidate}: unrecognised outcome {row[candidate]!r}",
            )

    catalog_config = {
        gate for gate in applicable if gates[gate]["type"].lower() == "config"
    }
    matrix_config = {gate for gate, row in rows.items() if row["kind"] == "CFG"}
    audit.check(
        catalog_config == matrix_config,
        "matrix CFG rows disagree with the catalog Config gates; "
        f"catalog {sorted(catalog_config)}, matrix {sorted(matrix_config)}",
    )
    for gate in sorted(matrix_config):
        for candidate in CANDIDATES:
            audit.check(
                normalise_outcome(rows[gate][candidate]) == "PASS (design)",
                f"{gate} is a Config gate but {candidate} does not record "
                "PASS (design)",
            )
    for gate, row in sorted(rows.items()):
        if gate in catalog_config:
            continue
        for candidate in CANDIDATES:
            audit.check(
                normalise_outcome(row[candidate]) != "PASS (design)",
                f"{gate} is a Vendor gate but {candidate} records PASS (design)",
            )

    # ---- Derived tally equals the restated one ------------------------------
    derived = {
        outcome: {
            candidate: sum(
                1 for row in rows.values()
                if normalise_outcome(row[candidate]) == outcome
            )
            for candidate in CANDIDATES
        }
        for outcome in MATRIX_OUTCOMES
    }
    declared = declared_tally(evaluation)
    for outcome in MATRIX_OUTCOMES:
        audit.check(outcome in declared, f"section 6.4 does not restate a {outcome} row")
        if outcome in declared:
            audit.check(
                declared[outcome] == derived[outcome],
                f"section 6.4 {outcome} row is stated as {declared[outcome]} "
                f"but the matrix counts {derived[outcome]}",
            )
    for candidate in CANDIDATES:
        total = sum(derived[outcome][candidate] for outcome in MATRIX_OUTCOMES)
        audit.check(
            total == len(applicable),
            f"{candidate} outcomes total {total}, not {len(applicable)}",
        )

    kind_counts = {
        kind: sum(1 for row in rows.values() if row["kind"] == kind)
        for kind in EVIDENCE_KINDS
    }
    stated = re.search(
        r"divide by evidence kind into (\d+) `OBS`, (\d+) `DOC`, and (\d+)\s*\n?`?CFG`?",
        evaluation,
    )
    audit.check(stated is not None, "section 6.4 does not state the evidence-kind split")
    if stated:
        audit.check(
            [int(v) for v in stated.groups()]
            == [kind_counts[k] for k in EVIDENCE_KINDS],
            f"stated evidence-kind split {[int(v) for v in stated.groups()]} "
            f"does not match the matrix {[kind_counts[k] for k in EVIDENCE_KINDS]}",
        )

    # ---- A FAIL must carry INELIGIBLE and an approver field -----------------
    # EX-102-001 reserves exception approval to the Product Owner, so a package
    # that records a FAIL and quietly reports CONDITIONAL has approved an
    # exception nobody granted.
    for candidate in CANDIDATES:
        if derived["FAIL"][candidate]:
            audit.check(
                "INELIGIBLE" in evaluation,
                f"{candidate} carries a FAIL but the evaluation records no "
                "INELIGIBLE verdict",
            )
            audit.check(
                "EX-102-001" in evaluation and "Approver" in evaluation,
                f"{candidate} carries a FAIL but the evaluation does not record "
                "an approver field citing EX-102-001",
            )
        else:
            audit.check(
                derived["UNPROVEN"][candidate] == 0
                or "ELIGIBLE-PENDING-EVIDENCE" in evaluation,
                f"{candidate} carries UNPROVEN gates but the evaluation does "
                "not record the ELIGIBLE-PENDING-EVIDENCE verdict",
            )

    # ---- Rubric arithmetic ---------------------------------------------------
    # This is the only package that publishes scores, so the totals are
    # recomputed from the subscore table rather than trusted.
    approved = rubric_weight_column()
    for name, weight in DIMENSIONS:
        audit.check(
            approved.get(name) == weight,
            f"category-N weight for {name} is {approved.get(name)} in the "
            f"approved rubric but {weight} here",
        )
    audit.check(
        sum(weight for _, weight in DIMENSIONS) == 100,
        "category-N weights do not sum to 100",
    )

    subscores: dict[str, dict[str, float]] = {c: {} for c in CANDIDATES}
    published_totals: dict[str, float] = {}
    for line in evaluation.splitlines():
        cell = cells(line)
        if len(cell) != 2 + len(CANDIDATES):
            continue
        label = cell[0].replace("**", "").strip()
        if label in dict(DIMENSIONS):
            try:
                for candidate, value in zip(CANDIDATES, cell[2:]):
                    subscores[candidate][label] = float(value)
            except ValueError:
                continue
        elif label == "Weighted total":
            for candidate, value in zip(CANDIDATES, cell[2:]):
                match = re.search(r"([\d.]+)\s*/\s*4\.00", value.replace("**", ""))
                if match:
                    published_totals[candidate] = float(match.group(1))

    for candidate in CANDIDATES:
        audit.check(
            set(subscores[candidate]) == set(dict(DIMENSIONS)),
            f"section 8.1 does not carry all seven subscores for {candidate}; "
            f"found {sorted(subscores[candidate])}",
        )
        audit.check(
            candidate in published_totals,
            f"section 8.1 does not publish a weighted total for {candidate}",
        )
        if set(subscores[candidate]) == set(dict(DIMENSIONS)) and candidate in published_totals:
            computed = sum(
                weight * subscores[candidate][name] for name, weight in DIMENSIONS
            ) / 100
            audit.check(
                abs(computed - published_totals[candidate]) < 0.005,
                f"{candidate} weighted total is published as "
                f"{published_totals[candidate]:.2f} but the subscores compute "
                f"{computed:.2f}",
            )
        for name in subscores[candidate]:
            audit.check(
                0.0 <= subscores[candidate][name] <= 4.0,
                f"{candidate} {name} subscore {subscores[candidate][name]} is "
                "outside the 0..4 scale",
            )

    # R5 requires the profile; R4 requires every zero listed.
    audit.check(
        "Evidence-confidence profile" in evaluation,
        "the evaluation publishes scores without the R5 evidence-confidence profile",
    )
    audit.check(
        re.search(r"criterion scoring zero", evaluation, re.I) is not None,
        "the evaluation publishes scores without the R4 explicit zero list",
    )

    # ---- Findings carry their own sections ----------------------------------
    for finding in FINDINGS:
        audit.check(
            re.search(rf"^### 7\.\d+ .*— {finding}$", evaluation, re.M) is not None,
            f"finding {finding} is cited but has no section 7 heading",
        )

    # ---- Cited identifiers resolve ------------------------------------------
    for prefix, source in (
        ("HG-102", CATALOG),
        ("WR-102", RUBRIC),
        ("DM-102", DEMAND),
        ("CT-102", COST),
        ("EX-102", EVIDENCE),
    ):
        known = referenced_ids(read(source), prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in {source}: "
            f"{sorted(cited - known)}",
        )

    known_oi_102 = referenced_ids(
        "\n".join(read(path) for path in CBD_102_FILES), "OI-102"
    )
    audit.check(
        referenced_ids(joined, "OI-102") <= known_oi_102,
        "OI-102 references that do not resolve: "
        f"{sorted(referenced_ids(joined, 'OI-102') - known_oi_102)}",
    )

    for prefix, owners in BORROWED_IDENTIFIERS.items():
        known: set[str] = set()
        for owner in owners:
            known |= referenced_ids(read(Path(f"docs/{owner}")), prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in {', '.join(owners)}: "
            f"{sorted(cited - known)}",
        )

    cbd_103 = "\n".join(read(path) for path in CBD_103_FILES)
    for prefix in ("TD-103", "OI-103", "OQ-103"):
        known = referenced_ids(cbd_103, prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in the CBD-103 package: "
            f"{sorted(cited - known)}",
        )

    for prefix, sibling in (("OI-106", E_EVALUATION), ("OI-107", F_EVALUATION)):
        known = referenced_ids(read(sibling), prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in the sibling package: "
            f"{sorted(cited - known)}",
        )

    # ---- The package's own identifiers --------------------------------------
    pn_defined = defined_ids(package[SPEC], "PN-130")
    pn_cited = referenced_ids(joined, "PN-130")
    audit.check(
        pn_cited <= pn_defined,
        f"PN-130 references with no decision: {sorted(pn_cited - pn_defined)}",
    )
    audit.check(
        pn_defined == {f"PN-130-{n:03d}" for n in range(1, PN_DECISIONS + 1)},
        f"PN-130 numbering is not a contiguous 001..{PN_DECISIONS:03d} range: "
        f"{sorted(pn_defined)}",
    )

    # OI-130 rows are defined across two documents and must not collide, which
    # they did in draft.
    spec_items = defined_ids(package[SPEC], "OI-130")
    eval_items = defined_ids(evaluation, "OI-130")
    operational_items = defined_ids(package[OPERATIONAL], "OI-130")
    for left_name, left, right_name, right in (
        ("specification", spec_items, "evaluation", eval_items),
        ("specification", spec_items, "operational", operational_items),
        ("evaluation", eval_items, "operational", operational_items),
    ):
        audit.check(
            not (left & right),
            f"OI-130 rows defined in both the {left_name} and the {right_name}: "
            f"{sorted(left & right)}",
        )

    for prefix in ("OI-130", "OQ-130"):
        defined: set[str] = set()
        for text in package.values():
            defined |= defined_ids(text, prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= defined,
            f"{prefix} references with no row: {sorted(cited - defined)}",
        )

    # ---- EV-102 register -----------------------------------------------------
    register_section, _, tail = evaluation.partition("### 9.1")
    register_section = register_section.partition("## 9. Evidence register")[2]
    reserved_section = tail.partition("## 10.")[0]

    defined_records = register_rows(register_section)
    reserved = register_rows(reserved_section)
    ev_here = defined_records | reserved

    audit.check(
        ev_here == register_rows(evaluation),
        "the evaluation defines EV-102 rows outside sections 9 and 9.1: "
        f"{sorted(register_rows(evaluation) - ev_here)}",
    )
    outside_records = {
        r for r in defined_records if int(r.rsplit("-", 1)[1]) not in EV_RECORDS
    }
    audit.check(
        not outside_records,
        "the section 9 register defines a record outside "
        f"EV-102-{EV_RECORDS[0]}..{EV_RECORDS[-1]}: {sorted(outside_records)}",
    )
    outside_block = {
        r for r in reserved if int(r.rsplit("-", 1)[1]) not in EV_RESERVED
    }
    audit.check(
        reserved and not outside_block,
        "section 9.1 reserves nothing, or reserves numbers outside "
        f"EV-102-{EV_RESERVED[0]}..{EV_RESERVED[-1]}: {sorted(outside_block)}",
    )
    audit.check(
        not (reserved & defined_records),
        "section 9.1 reserves numbers that section 9 already defines: "
        f"{sorted(reserved & defined_records)}",
    )

    ev_known = set(ev_here)
    for path in SIBLING_REGISTERS:
        ev_known |= register_rows(read(path))
    ev_cited = referenced_ids(joined, "EV-102")
    audit.check(
        ev_cited <= ev_known,
        "EV-102 references with no register row in any evaluation: "
        f"{sorted(ev_cited - ev_known)}",
    )

    # ---- Claims the package must keep making --------------------------------
    sync_source = read(Path("scripts/sync-confluence.py"))
    for path, text in package.items():
        audit.check(
            "`d7c3b29`" in text, f"{path}: repository baseline is not recorded"
        )
        audit.check(
            "Confluence page" in text,
            f"{path}: header does not record Confluence publication status",
        )
        if "Not yet registered" not in text:
            audit.check(
                f'path="{path.as_posix()}"' in sync_source,
                f"{path}: header claims a Confluence page but the path is not a "
                "registered sync-confluence target",
            )

    audit.check(
        "UNKNOWN" in package[OPERATIONAL],
        "cost record does not mark unobtained figures UNKNOWN under CR4",
    )

    # Cost template section 5.1 requires the SMS assumption be restated in every
    # SMS cost record rather than silently inherited.
    audit.check(
        "United States only" in package[OPERATIONAL]
        and re.search(r"segment", package[OPERATIONAL], re.I) is not None,
        "the cost record does not restate the segments-per-message assumption "
        "and destination scope required by cost template section 5.1",
    )

    # ---- Repository wiring ---------------------------------------------------
    workflow = read(Path(".github/workflows/ci.yml"))
    audit.check(
        "python3 scripts/audit-cbd-130.py" in workflow,
        "CI does not run the CBD-130 structural audit",
    )
    vocabulary = read(Path("scripts/check-doc-vocabulary.py"))
    audit.check(
        "cbd-130" in vocabulary or "cbd-1??-*" in vocabulary,
        "scripts/check-doc-vocabulary.py does not cover the CBD-130 documents",
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-130 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    print(f"Warnings: {len(audit.warnings)}")
    for warning in audit.warnings:
        print(f"  WARN: {warning}")
    if not audit.failures:
        print(
            "Result: PASS (documentation integrity only; the evidence ceiling "
            "in evaluation section 3.1 remains binding)"
        )
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
