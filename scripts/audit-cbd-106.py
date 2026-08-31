#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-106 package.

Same rationale as scripts/audit-cbd-105.py, which this adapts: the CBD-95
close-out found hand-restated figures contradicting the artifacts they
summarized, so everything the CBD-106 documents restate is derived here from
the matrix rather than frozen as constants.

Category-E specifics this audit adds over the CBD-105 shape:

* the applicable gate set is X plus E (24 gates) with exactly one Config gate
  (HG-102-014) -- category E itself contributes none, which evaluation section
  5 states in prose and this audit asserts against the catalog, so a future
  catalog retype cannot leave that sentence quietly false;
* the matrix is split by category: section 6.1 must carry exactly the X gates
  and section 6.2 exactly the E gates, rather than the union being correct
  while a gate sits in the wrong table;
* the EV-102 evidence register now spans four documents -- hosting 001-016,
  identity 017-029 and 040-051, PostgreSQL 030-039, and this evaluation's
  stated 052-081 block -- so citation resolution checks the union, and a
  record defined outside this package's block fails;
* the reserved-number table in section 8.1 is checked against the block and
  against the defined records, because a reservation that overlaps a real
  record is worse than no reservation;
* findings F1-F6 must each have a section 7 heading, since the matrix and the
  companion documents cite them by label;
* the package borrows identifiers from three approved packages (CBD-103
  topology, CBD-104 identity, CBD-105 data protection) and from the approved
  CBD-74 alert boundary, all of which must resolve.

Documentation integrity only. It verifies no gate result, retrieves no
evidence, prices nothing, sends no mail, and does not establish that any
ED-106 design is implemented. The evidence ceiling in evaluation section 3
remains binding.
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

SPEC = Path("docs/cbd-106-email-delivery-and-content-boundary-specification.md")
EVALUATION = Path("docs/cbd-106-candidate-shortlist-and-gate-evaluation.md")
OPERATIONAL = Path("docs/cbd-106-operational-and-cost-assessment.md")
TRACE = Path("docs/cbd-106-acceptance-criteria-traceability.md")

H_EVALUATION = Path("docs/cbd-103-candidate-shortlist-and-gate-evaluation.md")
H_TOPOLOGY = Path("docs/cbd-103-runtime-topology-specification.md")
H_OPERATIONAL = Path("docs/cbd-103-operational-and-cost-assessment.md")
H_TRACE = Path("docs/cbd-103-acceptance-criteria-traceability.md")

I_EVALUATION = Path("docs/cbd-104-candidate-shortlist-and-gate-evaluation.md")
I_BOUNDARY = Path("docs/cbd-104-identity-integration-boundary-specification.md")
I_OPERATIONAL = Path("docs/cbd-104-operational-and-cost-assessment.md")
I_TRACE = Path("docs/cbd-104-acceptance-criteria-traceability.md")

D_EVALUATION = Path("docs/cbd-105-candidate-shortlist-and-gate-evaluation.md")
D_SPEC = Path("docs/cbd-105-data-protection-and-recovery-specification.md")
D_OPERATIONAL = Path("docs/cbd-105-operational-and-cost-assessment.md")
D_TRACE = Path("docs/cbd-105-acceptance-criteria-traceability.md")

ALERT_BOUNDARY = Path("docs/cbd-74-accountability-alert-boundary-specification.md")

PACKAGE_FILES = (SPEC, EVALUATION, OPERATIONAL, TRACE)

# The commit each document was written against. The v1.1 cross-category pass
# amended two of the four, so a single shared constant would either pass a
# stale baseline or fail a correct one.
REPOSITORY_BASELINE = {
    SPEC: "`c689192`",
    EVALUATION: "`598dbbb`",
    OPERATIONAL: "`d98defd`",
    TRACE: "`c689192`",
}
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST, EVIDENCE)
CBD_103_FILES = (H_TOPOLOGY, H_EVALUATION, H_OPERATIONAL, H_TRACE)
CBD_104_FILES = (I_BOUNDARY, I_EVALUATION, I_OPERATIONAL, I_TRACE)
CBD_105_FILES = (D_SPEC, D_EVALUATION, D_OPERATIONAL, D_TRACE)

CROSS_CATEGORY = "X"
EMAIL_CATEGORY = "E"
EVALUATED_CATEGORIES = (CROSS_CATEGORY, EMAIL_CATEGORY)
CANDIDATES = ("C2", "C3", "C5")
MATRIX_OUTCOMES = ("PASS (design)", "PASS", "UNPROVEN", "FAIL")
EVIDENCE_KINDS = ("OBS", "DOC", "CFG")
FINDINGS = ("F1", "F2", "F3", "F4", "F5", "F6")

# EV-102 numbers this package may define. 001-016 belong to the hosting
# evaluation, 017-029 and 040-051 to the identity evaluation, 030-039 to the
# PostgreSQL evaluation; this package's stated block is 052-081, using 052-070
# for records and reserving 071-081 for its observation records.
EV_BLOCK = range(52, 82)
EV_RECORDS = range(52, 71)

ED_DECISIONS = 16

BORROWED_IDENTIFIERS: dict[str, tuple[str, ...]] = {
    "DI-91": ("cbd-91-private-mvp-data-inventory.md",),
    "EG-91": ("cbd-91-private-mvp-data-inventory.md",),
    "SA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "OP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "AN-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TB-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "PA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SYS-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EM-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "NT-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TH-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SR-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "ME-94": (
        "cbd-94-risk-mitigation-requirement-register.md",
        "cbd-94-verification-review-inventory.md",
    ),
    "FU-95": ("cbd-95-architecture-roadmap-follow-up-register.md",),
    "PM-72": ("cbd-72-collaboration-permission-model.md",),
    "AB-74": ("cbd-74-accountability-alert-boundary-specification.md",),
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

    def warn(self, condition: bool, message: str) -> None:
        if not condition:
            self.warnings.append(message)


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
    for line in text.splitlines():
        if not line.startswith("| HG-102-"):
            continue
        cell = cells(line)
        if len(cell) < 6 or cell[1] not in EVIDENCE_KINDS:
            continue
        gate = cell[0].split()[0]
        rows[gate] = dict(
            {"kind": cell[1]}, **dict(zip(CANDIDATES, cell[2:5]))
        )
    return rows


def normalise_outcome(cell: str) -> str | None:
    bare = cell.replace("`", "").replace("**", "").strip()
    return bare if bare in MATRIX_OUTCOMES else None


def declared_tally(text: str) -> dict[str, dict[str, int]]:
    declared: dict[str, dict[str, int]] = {}
    for line in text.splitlines():
        cell = cells(line)
        if len(cell) != 4:
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
    """Identifiers this package *defines*: a register-table row, or a decision
    heading that opens a line with the backticked key.

    Both patterns require digits, so the ``ED-106-*`` wildcard the specification
    uses when talking about the scheme in general is not mistaken for a
    seventeenth decision.
    """
    found: set[str] = set()
    row = re.compile(rf"^\|\s*({prefix}-\d+)\s*\|")
    heading = re.compile(rf"^`({prefix}-\d+)`")
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


def main() -> int:
    audit = Audit()

    every_file = (
        PACKAGE_FILES
        + CBD_102_FILES
        + CBD_103_FILES
        + CBD_104_FILES
        + CBD_105_FILES
        + (ALERT_BOUNDARY,)
    )
    for path in every_file:
        audit.check((ROOT / path).is_file(), f"missing {path}")
    if audit.failures:
        return finish(audit)

    package = {path: read(path) for path in PACKAGE_FILES}
    joined = "\n".join(package.values())

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
    applicable = by_category[CROSS_CATEGORY] | by_category[EMAIL_CATEGORY]
    audit.check(
        len(applicable) == 24,
        f"applicable X+E gate count changed: expected 24, found {len(applicable)}",
    )

    # Evaluation section 5 states that category E contributes no Config gate.
    # That sentence is only true while the catalog agrees.
    email_config = {
        gate
        for gate in by_category[EMAIL_CATEGORY]
        if gates[gate]["type"].lower() == "config"
    }
    audit.check(
        not email_config,
        "evaluation section 5 states category E has no Config gate, but the "
        f"catalog now marks {sorted(email_config)} Config",
    )

    # ---- Matrix completeness, per section ------------------------------------
    evaluation = package[EVALUATION]
    cross_section, _, rest = evaluation.partition("### 6.2")
    email_section, _, _ = rest.partition("### 6.3")
    cross_section = cross_section.partition("### 6.1")[2]

    cross_rows = matrix_rows(cross_section)
    email_rows = matrix_rows(email_section)
    audit.check(
        set(cross_rows) == by_category[CROSS_CATEGORY],
        "section 6.1 does not carry exactly the cross-category gates; "
        f"missing {sorted(by_category[CROSS_CATEGORY] - set(cross_rows))}, "
        f"unexpected {sorted(set(cross_rows) - by_category[CROSS_CATEGORY])}",
    )
    audit.check(
        set(email_rows) == by_category[EMAIL_CATEGORY],
        "section 6.2 does not carry exactly the category-E gates; "
        f"missing {sorted(by_category[EMAIL_CATEGORY] - set(email_rows))}, "
        f"unexpected {sorted(set(email_rows) - by_category[EMAIL_CATEGORY])}",
    )

    rows = {**cross_rows, **email_rows}
    audit.check(
        set(rows) == applicable,
        "comparison matrix does not cover exactly the applicable X+E gates; "
        f"missing {sorted(applicable - set(rows))}, "
        f"unexpected {sorted(set(rows) - applicable)}",
    )

    for gate, row in sorted(rows.items()):
        for candidate in CANDIDATES:
            audit.check(
                normalise_outcome(row[candidate]) is not None,
                f"{gate} {candidate}: unrecognised outcome {row[candidate]!r}",
            )

    # ---- Config rows agree with the catalog ---------------------------------
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
                1
                for row in rows.values()
                if normalise_outcome(row[candidate]) == outcome
            )
            for candidate in CANDIDATES
        }
        for outcome in MATRIX_OUTCOMES
    }
    declared = declared_tally(evaluation)
    for outcome in MATRIX_OUTCOMES:
        audit.check(outcome in declared, f"section 6.3 does not restate a {outcome} row")
        if outcome in declared:
            audit.check(
                declared[outcome] == derived[outcome],
                f"section 6.3 {outcome} row is stated as {declared[outcome]} "
                f"but the matrix counts {derived[outcome]}",
            )
    for candidate in CANDIDATES:
        total = sum(derived[outcome][candidate] for outcome in MATRIX_OUTCOMES)
        audit.check(
            total == len(applicable),
            f"{candidate} outcomes total {total}, not {len(applicable)}",
        )

    # ---- Evidence-kind split matches the prose ------------------------------
    kind_counts = {
        kind: sum(1 for row in rows.values() if row["kind"] == kind)
        for kind in EVIDENCE_KINDS
    }
    stated = re.search(
        r"divide by evidence kind into (\d+) `OBS`, (\d+) `DOC`, and (\d+)\s*\n?`?CFG`?",
        evaluation,
    )
    audit.check(stated is not None, "section 6.3 does not state the evidence-kind split")
    if stated:
        audit.check(
            [int(value) for value in stated.groups()]
            == [kind_counts[kind] for kind in EVIDENCE_KINDS],
            f"stated evidence-kind split {[int(v) for v in stated.groups()]} "
            f"does not match the matrix {[kind_counts[k] for k in EVIDENCE_KINDS]}",
        )

    # The evidence-ceiling section lists the observation-bound gates; that list
    # and the matrix OBS rows are one claim stated twice.
    ceiling_section = evaluation.split("### 3.1")[0]
    ceiling_gates = referenced_ids(ceiling_section, "HG-102")
    obs_gates = {gate for gate, row in rows.items() if row["kind"] == "OBS"}
    audit.check(
        ceiling_gates >= obs_gates,
        "section 3 does not name every gate the matrix marks OBS; "
        f"missing {sorted(obs_gates - ceiling_gates)}",
    )
    audit.check(
        ceiling_gates <= applicable,
        "section 3 names a gate outside the applicable X+E set; "
        f"unexpected {sorted(ceiling_gates - applicable)}",
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
    cited_oi_102 = referenced_ids(joined, "OI-102")
    audit.check(
        cited_oi_102 <= known_oi_102,
        f"OI-102 references that do not resolve: {sorted(cited_oi_102 - known_oi_102)}",
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

    # Identifiers borrowed from the approved sibling packages.
    for label, files, prefixes in (
        ("CBD-103", CBD_103_FILES, ("TD-103", "OI-103", "OQ-103")),
        ("CBD-104", CBD_104_FILES, ("ID-104", "OI-104", "OQ-104")),
        ("CBD-105", CBD_105_FILES, ("DP-105", "OI-105", "OQ-105")),
    ):
        sibling = "\n".join(read(path) for path in files)
        for prefix in prefixes:
            known = referenced_ids(sibling, prefix)
            cited = referenced_ids(joined, prefix)
            audit.check(
                cited <= known,
                f"{prefix} references that do not resolve in the {label} package: "
                f"{sorted(cited - known)}",
            )

    # ---- The package's own identifiers --------------------------------------
    ed_defined = defined_ids(package[SPEC], "ED-106")
    ed_cited = referenced_ids(joined, "ED-106")
    audit.check(
        ed_cited <= ed_defined,
        f"ED-106 references with no decision: {sorted(ed_cited - ed_defined)}",
    )
    audit.check(
        ed_defined == {f"ED-106-{number:03d}" for number in range(1, ED_DECISIONS + 1)},
        f"ED-106 numbering is not a contiguous 001..{ED_DECISIONS:03d} range: "
        f"{sorted(ed_defined)}",
    )

    # EV-102 records: the union of all four evaluations' registers, and this
    # package may only define numbers inside its stated block. A register row
    # is a table row -- a backticked citation at line start is prose, which is
    # why this uses the table-row pattern alone rather than defined_ids.
    ev_siblings = (
        register_rows(read(H_EVALUATION))
        | register_rows(read(I_EVALUATION))
        | register_rows(read(D_EVALUATION))
    )
    # The register proper is section 8 up to the 8.1 reservation table; 8.1
    # reserves the tail of the block. The two are read separately so that a
    # number appearing in both is detectable -- deriving one by subtracting the
    # other would make the collision impossible to see.
    register_section, _, tail = evaluation.partition("### 8.1")
    register_section = register_section.partition("## 8. Evidence register")[2]
    reserved_section = tail.partition("## 9.")[0]

    defined_records = register_rows(register_section)
    reserved = register_rows(reserved_section)
    ev_here = defined_records | reserved

    audit.check(
        ev_here == register_rows(evaluation),
        "the evaluation defines EV-102 rows outside sections 8 and 8.1: "
        f"{sorted(register_rows(evaluation) - ev_here)}",
    )
    outside_records = {
        record
        for record in defined_records
        if int(record.rsplit("-", 1)[1]) not in EV_RECORDS
    }
    audit.check(
        not outside_records,
        f"the section 8 register defines a record outside EV-102-052..070: "
        f"{sorted(outside_records)}",
    )
    outside_block = {
        record for record in reserved if int(record.rsplit("-", 1)[1]) not in EV_BLOCK
    }
    audit.check(
        reserved and not outside_block,
        "section 8.1 reserves nothing, or reserves numbers outside the stated "
        f"EV-102-052..081 block: {sorted(outside_block)}",
    )
    audit.check(
        not (reserved & defined_records),
        "section 8.1 reserves numbers that section 8 already defines: "
        f"{sorted(reserved & defined_records)}",
    )

    ev_known = ev_siblings | ev_here
    ev_cited = referenced_ids(joined, "EV-102")
    audit.check(
        ev_cited <= ev_known,
        "EV-102 references with no register row in any evaluation: "
        f"{sorted(ev_cited - ev_known)}",
    )

    for prefix in ("OI-106", "OQ-106"):
        defined: set[str] = set()
        for text in package.values():
            defined |= defined_ids(text, prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= defined,
            f"{prefix} references with no row: {sorted(cited - defined)}",
        )

    # ---- Claims the package must keep making --------------------------------
    sync_source = read(Path("scripts/sync-confluence.py"))
    for path, text in package.items():
        audit.check(
            REPOSITORY_BASELINE[path] in text,
            f"{path}: repository baseline is not recorded",
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

    for candidate in CANDIDATES:
        audit.check(
            derived["UNPROVEN"][candidate] == 0
            or "ELIGIBLE-PENDING-EVIDENCE" in evaluation,
            f"{candidate} carries UNPROVEN gates but the evaluation does not "
            "record the ELIGIBLE-PENDING-EVIDENCE verdict",
        )

    audit.check(
        "UNKNOWN" in package[OPERATIONAL],
        "cost record does not mark unobtained figures UNKNOWN under CR4",
    )

    # ---- Repository wiring ---------------------------------------------------
    workflow = read(Path(".github/workflows/ci.yml"))
    audit.check(
        "python3 scripts/audit-cbd-106.py" in workflow,
        "CI does not run the CBD-106 structural audit",
    )
    vocabulary = read(Path("scripts/check-doc-vocabulary.py"))
    audit.check(
        "cbd-106" in vocabulary or "cbd-10?-*" in vocabulary,
        "scripts/check-doc-vocabulary.py does not cover the CBD-106 documents",
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-106 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    print(f"Warnings: {len(audit.warnings)}")
    for warning in audit.warnings:
        print(f"  WARN: {warning}")
    if not audit.failures:
        print(
            "Result: PASS (documentation integrity only; the evidence ceiling "
            "in evaluation section 3 remains binding)"
        )
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
