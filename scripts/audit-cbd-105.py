#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-105 package.

Same rationale as scripts/audit-cbd-103.py, which this adapts: the CBD-95
close-out found hand-restated figures contradicting the artifacts they
summarized, so everything the CBD-105 documents restate is derived here from
the matrix rather than frozen as constants.

Category-D specifics this audit adds over the CBD-103 shape:

* the applicable gate set is X plus D (24 gates), with two Config gates
  (HG-102-014, HG-102-045);
* the EV-102 evidence register now spans two documents -- the hosting
  evaluation defines 001-016 and the PostgreSQL evaluation defines its block
  from 030 -- so citation resolution checks the union, and a citation into the
  unallocated gap (017-029, reserved for CBD-104) fails;
* the package borrows identifiers from the approved CBD-103 topology
  (TD-103-*, OI-103-*, OQ-103-*), which must resolve against the merged
  CBD-103 documents.

Documentation integrity only. It verifies no gate result, retrieves no
evidence, prices nothing, and does not establish that any DP-105 design is
implemented. The evidence ceiling in evaluation section 3 remains binding.
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

SPEC = Path("docs/cbd-105-data-protection-and-recovery-specification.md")
EVALUATION = Path("docs/cbd-105-candidate-shortlist-and-gate-evaluation.md")
OPERATIONAL = Path("docs/cbd-105-operational-and-cost-assessment.md")
TRACE = Path("docs/cbd-105-acceptance-criteria-traceability.md")

H_EVALUATION = Path("docs/cbd-103-candidate-shortlist-and-gate-evaluation.md")
H_TOPOLOGY = Path("docs/cbd-103-runtime-topology-specification.md")
H_OPERATIONAL = Path("docs/cbd-103-operational-and-cost-assessment.md")
H_TRACE = Path("docs/cbd-103-acceptance-criteria-traceability.md")

PACKAGE_FILES = (SPEC, EVALUATION, OPERATIONAL, TRACE)
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST, EVIDENCE)
CBD_103_FILES = (H_TOPOLOGY, H_EVALUATION, H_OPERATIONAL, H_TRACE)

EVALUATED_CATEGORIES = ("X", "D")
CANDIDATES = ("C1", "C2", "C3")
MATRIX_OUTCOMES = ("PASS (design)", "PASS", "UNPROVEN", "FAIL")
EVIDENCE_KINDS = ("OBS", "DOC", "CFG")

# EV-102 numbers this package may define. 001-016 belong to the hosting
# evaluation; 017-029 are left for CBD-104; this package's stated block is
# 030-049 (using 030-039 now, reserving the rest for its observation records).
EV_BLOCK = range(30, 50)

BORROWED_IDENTIFIERS: dict[str, tuple[str, ...]] = {
    "DI-91": ("cbd-91-private-mvp-data-inventory.md",),
    "EG-91": ("cbd-91-private-mvp-data-inventory.md",),
    "SA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "OP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "AN-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TB-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "PA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SYS-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "CL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SR-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "ME-94": (
        "cbd-94-risk-mitigation-requirement-register.md",
        "cbd-94-verification-review-inventory.md",
    ),
    "FU-95": ("cbd-95-architecture-roadmap-follow-up-register.md",),
    "PM-72": ("cbd-72-collaboration-permission-model.md",),
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
        rows[gate] = {"kind": cell[1], "C1": cell[2], "C2": cell[3], "C3": cell[4]}
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
    found: set[str] = set()
    pattern = re.compile(rf"^\|\s*({prefix}-\d+)\s*\|")
    for line in text.splitlines():
        match = pattern.match(line)
        if match:
            found.add(match.group(1))
        if line.startswith(f"`{prefix}-"):
            found.add(line[1:].split("`")[0])
    return found


def referenced_ids(text: str, prefix: str) -> set[str]:
    return set(re.findall(rf"\b{prefix}-\d+\b", text))


def main() -> int:
    audit = Audit()

    for path in PACKAGE_FILES + CBD_102_FILES + CBD_103_FILES:
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

    applicable = {
        gate for gate, meta in gates.items() if meta["category"] in EVALUATED_CATEGORIES
    }
    audit.check(
        len(applicable) == 24,
        f"applicable X+D gate count changed: expected 24, found {len(applicable)}",
    )

    # ---- Matrix completeness -------------------------------------------------
    rows = matrix_rows(package[EVALUATION])
    audit.check(
        set(rows) == applicable,
        "comparison matrix does not cover exactly the applicable X+D gates; "
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
    declared = declared_tally(package[EVALUATION])
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
        package[EVALUATION],
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
    ceiling_section = package[EVALUATION].split("### 3.1")[0]
    ceiling_gates = referenced_ids(ceiling_section, "HG-102")
    obs_gates = {gate for gate, row in rows.items() if row["kind"] == "OBS"}
    audit.check(
        ceiling_gates >= obs_gates,
        "section 3 does not name every gate the matrix marks OBS; "
        f"missing {sorted(obs_gates - ceiling_gates)}",
    )
    audit.check(
        ceiling_gates <= applicable,
        "section 3 names a gate outside the applicable X+D set; "
        f"unexpected {sorted(ceiling_gates - applicable)}",
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
        known = set()
        for owner in owners:
            known |= referenced_ids(read(Path(f"docs/{owner}")), prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in {', '.join(owners)}: "
            f"{sorted(cited - known)}",
        )

    # Identifiers borrowed from the approved CBD-103 package.
    cbd_103_joined = "\n".join(read(path) for path in CBD_103_FILES)
    for prefix in ("TD-103", "OI-103", "OQ-103"):
        known = referenced_ids(cbd_103_joined, prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in the CBD-103 package: "
            f"{sorted(cited - known)}",
        )

    # ---- The package's own identifiers --------------------------------------
    dp_defined = defined_ids(package[SPEC], "DP-105")
    dp_cited = referenced_ids(joined, "DP-105")
    audit.check(
        dp_cited <= dp_defined,
        f"DP-105 references with no decision: {sorted(dp_cited - dp_defined)}",
    )
    audit.check(
        dp_defined == {f"DP-105-{number:03d}" for number in range(1, 13)},
        f"DP-105 numbering is not a contiguous 001..012 range: {sorted(dp_defined)}",
    )

    # EV-102 records: the union of both evaluations' registers, and this
    # package may only define numbers inside its stated block. A register row
    # is a table row -- a backticked citation at line start is prose, which is
    # why this uses the table-row pattern alone rather than defined_ids.
    def register_rows(text: str) -> set[str]:
        return set(re.findall(r"^\|\s*(EV-102-\d+)\s*\|", text, re.M))

    ev_h = register_rows(read(H_EVALUATION))
    ev_d = register_rows(package[EVALUATION])
    for record in sorted(ev_d):
        number = int(record.rsplit("-", 1)[1])
        audit.check(
            number in EV_BLOCK,
            f"{record} is defined by the CBD-105 evaluation outside its stated "
            "EV-102-030..049 block",
        )
    ev_known = ev_h | ev_d
    ev_cited = referenced_ids(joined, "EV-102")
    audit.check(
        ev_cited <= ev_known,
        f"EV-102 references with no register row in either evaluation: "
        f"{sorted(ev_cited - ev_known)}",
    )

    for prefix in ("OI-105", "OQ-105"):
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
            "`6b1ac8e`" in text,
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
            or "ELIGIBLE-PENDING-EVIDENCE" in package[EVALUATION],
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
        "python3 scripts/audit-cbd-105.py" in workflow,
        "CI does not run the CBD-105 structural audit",
    )
    vocabulary = read(Path("scripts/check-doc-vocabulary.py"))
    audit.check(
        "cbd-105" in vocabulary or "cbd-10?-*" in vocabulary,
        "scripts/check-doc-vocabulary.py does not cover the CBD-105 documents",
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-105 documentation audit: {audit.checks} checks")
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
