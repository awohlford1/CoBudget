#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-107 package.

Same rationale as scripts/audit-cbd-106.py, which this adapts: the CBD-95
close-out found hand-restated figures contradicting the artifacts they
summarized, so everything the CBD-107 documents restate is derived here from
the matrix rather than frozen as constants.

Category-F specifics this audit adds over the CBD-106 shape:

* the package is five documents rather than four -- the lifecycle and coverage
  map carries deliverables 2, 3 and 5, which are not gate questions -- so the
  identifier checks span the wider set;
* the applicable gate set is X plus F (27 gates) with three Config gates, two
  of them contributed by category F itself (HG-102-066, HG-102-067), and the
  matrix is split so section 6.1 carries exactly X and section 6.2 exactly F;
* four candidates rather than three, so a column dropped from one matrix table
  and not the other is caught by shape rather than by eye;
* the package defines two identifier families of its own, FC-107-* decisions in
  the specification and PS-107-* provider signals in the lifecycle map, and
  each must be defined in its own document rather than anywhere in the package;
* the EV-102 register now spans five documents; this package's stated block is
  092-131, with records 092-109 and reservations 110-131 read separately so a
  number appearing in both fails -- the collision scripts/audit-cbd-105.py was
  corrected for.

Documentation integrity only. It verifies no gate result, retrieves no
evidence, prices nothing, connects to no institution, and does not establish
that any FC-107 design is implemented. The evidence ceiling in evaluation
section 3 remains binding.
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

SPEC = Path("docs/cbd-107-connection-and-provenance-boundary-specification.md")
EVALUATION = Path("docs/cbd-107-candidate-shortlist-and-gate-evaluation.md")
LIFECYCLE = Path("docs/cbd-107-transaction-lifecycle-and-coverage-map.md")
OPERATIONAL = Path("docs/cbd-107-operational-and-cost-assessment.md")
TRACE = Path("docs/cbd-107-acceptance-criteria-traceability.md")

H_EVALUATION = Path("docs/cbd-103-candidate-shortlist-and-gate-evaluation.md")
H_TOPOLOGY = Path("docs/cbd-103-runtime-topology-specification.md")
H_OPERATIONAL = Path("docs/cbd-103-operational-and-cost-assessment.md")
H_TRACE = Path("docs/cbd-103-acceptance-criteria-traceability.md")

I_EVALUATION = Path("docs/cbd-104-candidate-shortlist-and-gate-evaluation.md")
I_BOUNDARY = Path("docs/cbd-104-identity-integration-boundary-specification.md")
I_OPERATIONAL = Path("docs/cbd-104-operational-and-cost-assessment.md")
I_TRACE = Path("docs/cbd-104-acceptance-criteria-traceability.md")

D_EVALUATION = Path("docs/cbd-105-candidate-shortlist-and-gate-evaluation.md")
E_EVALUATION = Path("docs/cbd-106-candidate-shortlist-and-gate-evaluation.md")

PACKAGE_FILES = (SPEC, EVALUATION, LIFECYCLE, OPERATIONAL, TRACE)

# The commit each document was written against. The v1.1 cross-category note
# amended two of the five, so a single shared constant would either pass a
# stale baseline or fail a correct one.
REPOSITORY_BASELINE = {
    SPEC: "`c15b526`",
    EVALUATION: "`598dbbb`",
    LIFECYCLE: "`c15b526`",
    OPERATIONAL: "`c15b526`",
    TRACE: "`9aabc13`",
}
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST, EVIDENCE)
CBD_103_FILES = (H_TOPOLOGY, H_EVALUATION, H_OPERATIONAL, H_TRACE)
CBD_104_FILES = (I_BOUNDARY, I_EVALUATION, I_OPERATIONAL, I_TRACE)
SIBLING_REGISTERS = (H_EVALUATION, I_EVALUATION, D_EVALUATION, E_EVALUATION)

CROSS_CATEGORY = "X"
FINANCIAL_CATEGORY = "F"
EVALUATED_CATEGORIES = (CROSS_CATEGORY, FINANCIAL_CATEGORY)
CANDIDATES = ("C6", "C7", "C8", "C9")
MATRIX_OUTCOMES = ("PASS (design)", "PASS", "UNPROVEN", "FAIL")
EVIDENCE_KINDS = ("OBS", "DOC", "CFG")
FINDINGS = ("F1", "F2", "F3", "F4", "F5", "F6")

# EV-102 numbers this package may use. 001-091 are held by the hosting,
# identity, PostgreSQL and email evaluations, including the PostgreSQL
# evaluation's corrected 082-091 reservation.
EV_RECORDS = range(92, 110)
EV_RESERVED = range(110, 132)

FC_DECISIONS = 18
PS_SIGNALS = 11

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
    "CA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EM-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "NT-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TH-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SR-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "RK-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "ME-94": (
        "cbd-94-risk-mitigation-requirement-register.md",
        "cbd-94-verification-review-inventory.md",
    ),
    "FU-95": ("cbd-95-architecture-roadmap-follow-up-register.md",),
    "PM-72": ("cbd-72-collaboration-permission-model.md",),
    "OD-72": ("cbd-72-collaboration-permission-model.md",),
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
    """Parse a comparison-matrix table into gate -> {kind, per-candidate}.

    A row is recognised only when it carries a known evidence kind in the
    second cell and one cell per candidate after it, so a dropped column is a
    parse miss rather than a silently shifted outcome.
    """
    rows: dict[str, dict[str, str]] = {}
    width = 2 + len(CANDIDATES)
    for line in text.splitlines():
        if not line.startswith("| HG-102-"):
            continue
        cell = cells(line)
        if len(cell) < width + 1 or cell[1] not in EVIDENCE_KINDS:
            continue
        gate = cell[0].split()[0]
        rows[gate] = dict({"kind": cell[1]}, **dict(zip(CANDIDATES, cell[2:width])))
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
    """Identifiers this package defines: a table row, or a decision heading.

    Both patterns require digits, so a ``FC-107-*`` wildcard in prose is not
    mistaken for a decision.
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
        PACKAGE_FILES + CBD_102_FILES + CBD_103_FILES + CBD_104_FILES
        + (D_EVALUATION, E_EVALUATION)
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
    applicable = by_category[CROSS_CATEGORY] | by_category[FINANCIAL_CATEGORY]
    audit.check(
        len(applicable) == 27,
        f"applicable X+F gate count changed: expected 27, found {len(applicable)}",
    )

    # Evaluation section 5 states category F carries two Config gates of its
    # own -- more than any other category. That sentence is only true while the
    # catalog agrees.
    financial_config = {
        gate
        for gate in by_category[FINANCIAL_CATEGORY]
        if gates[gate]["type"].lower() == "config"
    }
    audit.check(
        len(financial_config) == 2,
        "evaluation section 5 states category F carries two Config gates, but "
        f"the catalog now marks {sorted(financial_config)} Config",
    )

    # ---- Matrix completeness, per section ------------------------------------
    evaluation = package[EVALUATION]
    cross_section, _, rest = evaluation.partition("### 6.2")
    financial_section, _, _ = rest.partition("### 6.3")
    cross_section = cross_section.partition("### 6.1")[2]

    cross_rows = matrix_rows(cross_section)
    financial_rows = matrix_rows(financial_section)
    audit.check(
        set(cross_rows) == by_category[CROSS_CATEGORY],
        "section 6.1 does not carry exactly the cross-category gates; "
        f"missing {sorted(by_category[CROSS_CATEGORY] - set(cross_rows))}, "
        f"unexpected {sorted(set(cross_rows) - by_category[CROSS_CATEGORY])}",
    )
    audit.check(
        set(financial_rows) == by_category[FINANCIAL_CATEGORY],
        "section 6.2 does not carry exactly the category-F gates; "
        f"missing {sorted(by_category[FINANCIAL_CATEGORY] - set(financial_rows))}, "
        f"unexpected {sorted(set(financial_rows) - by_category[FINANCIAL_CATEGORY])}",
    )

    rows = {**cross_rows, **financial_rows}
    audit.check(
        set(rows) == applicable,
        "comparison matrix does not cover exactly the applicable X+F gates; "
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
        "section 3 names a gate outside the applicable X+F set; "
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

    for label, files, prefixes in (
        ("CBD-103", CBD_103_FILES, ("TD-103", "OI-103", "OQ-103")),
        ("CBD-104", CBD_104_FILES, ("ID-104", "OI-104", "OQ-104")),
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
    # Each family is defined in exactly one document. Defining an FC-107
    # decision outside the specification, or a PS-107 signal outside the
    # lifecycle map, would put the definition where no reader looks for it.
    fc_defined = defined_ids(package[SPEC], "FC-107")
    fc_cited = referenced_ids(joined, "FC-107")
    audit.check(
        fc_cited <= fc_defined,
        f"FC-107 references with no decision: {sorted(fc_cited - fc_defined)}",
    )
    audit.check(
        fc_defined == {f"FC-107-{n:03d}" for n in range(1, FC_DECISIONS + 1)},
        f"FC-107 numbering is not a contiguous 001..{FC_DECISIONS:03d} range: "
        f"{sorted(fc_defined)}",
    )

    ps_defined = defined_ids(package[LIFECYCLE], "PS-107")
    ps_cited = referenced_ids(joined, "PS-107")
    audit.check(
        ps_cited <= ps_defined,
        f"PS-107 references with no signal row: {sorted(ps_cited - ps_defined)}",
    )
    audit.check(
        ps_defined == {f"PS-107-{n:03d}" for n in range(1, PS_SIGNALS + 1)},
        f"PS-107 numbering is not a contiguous 001..{PS_SIGNALS:03d} range: "
        f"{sorted(ps_defined)}",
    )

    # EV-102: records and reservations are read separately so a number in both
    # is detectable. Deriving one set by subtracting the other would make that
    # collision impossible to observe -- the defect audit-cbd-105.py was fixed
    # for.
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
        r for r in defined_records if int(r.rsplit("-", 1)[1]) not in EV_RECORDS
    }
    audit.check(
        not outside_records,
        "the section 8 register defines a record outside "
        f"EV-102-{EV_RECORDS[0]:03d}..{EV_RECORDS[-1]:03d}: {sorted(outside_records)}",
    )
    outside_block = {
        r for r in reserved if int(r.rsplit("-", 1)[1]) not in EV_RESERVED
    }
    audit.check(
        reserved and not outside_block,
        "section 8.1 reserves nothing, or reserves numbers outside "
        f"EV-102-{EV_RESERVED[0]:03d}..{EV_RESERVED[-1]:03d}: {sorted(outside_block)}",
    )
    audit.check(
        not (reserved & defined_records),
        "section 8.1 reserves numbers that section 8 already defines: "
        f"{sorted(reserved & defined_records)}",
    )

    ev_known = ev_here
    for path in SIBLING_REGISTERS:
        ev_known |= register_rows(read(path))
    ev_cited = referenced_ids(joined, "EV-102")
    audit.check(
        ev_cited <= ev_known,
        "EV-102 references with no register row in any evaluation: "
        f"{sorted(ev_cited - ev_known)}",
    )

    for prefix in ("OI-107", "OQ-107"):
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
            f"{path}: repository baseline is not {REPOSITORY_BASELINE[path]}",
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

    # HG-102-056 is one of the three non-exceptable gates. A package that stops
    # saying so has lost the single most important constraint in the category.
    audit.check(
        "non-exceptable" in package[SPEC].lower()
        and "HG-102-056" in package[SPEC],
        "the specification no longer records HG-102-056 as non-exceptable",
    )

    # ---- Repository wiring ---------------------------------------------------
    workflow = read(Path(".github/workflows/ci.yml"))
    audit.check(
        "python3 scripts/audit-cbd-107.py" in workflow,
        "CI does not run the CBD-107 structural audit",
    )
    vocabulary = read(Path("scripts/check-doc-vocabulary.py"))
    audit.check(
        "cbd-107" in vocabulary or "cbd-10?-*" in vocabulary,
        "scripts/check-doc-vocabulary.py does not cover the CBD-107 documents",
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-107 documentation audit: {audit.checks} checks")
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
