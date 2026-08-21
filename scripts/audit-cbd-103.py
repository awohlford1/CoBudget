#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-103 package.

What this audit exists to catch
-------------------------------
The CBD-95 close-out found six statements in an approved record that contradicted
the artifacts they summarized -- a reconciliation tally stated as 2/33/1/0
against a matrix counting 2/34/0/0, and a check total stated three different
ways. Every one of them was a hand-written restatement of something a parser
could derive.

CBD-103 restates two things the same way and both are guarded here by
derivation rather than by a frozen constant:

* the per-candidate gate tally in the evaluation's section 6.3, derived from the
  section 6.1 and 6.2 matrix rows; and
* the evidence-kind split (OBS / DOC / CFG), derived from the same rows.

The audit additionally proves that the matrix is *complete* against the approved
CBD-102 catalog -- every gate in categories X and H appears exactly once -- and
that the Config rows agree with the catalog's own satisfaction-type column. A
matrix that silently dropped a gate would otherwise read as a clean evaluation.

What it does not prove
----------------------
Documentation integrity only. It does not verify a gate result, retrieve
evidence, price anything, or establish that any TD-103 design is implemented.
The evidence ceiling in evaluation section 3 and the open items in every
document remain binding regardless of this audit passing.
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

TOPOLOGY = Path("docs/cbd-103-runtime-topology-specification.md")
EVALUATION = Path("docs/cbd-103-candidate-shortlist-and-gate-evaluation.md")
OPERATIONAL = Path("docs/cbd-103-operational-and-cost-assessment.md")
TRACE = Path("docs/cbd-103-acceptance-criteria-traceability.md")

PACKAGE_FILES = (TOPOLOGY, EVALUATION, OPERATIONAL, TRACE)
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST, EVIDENCE)

# The commit each document was written against. Two documents were amended by
# the v1.1 cross-category documentary pass and two were not, so a single shared
# constant would either pass a stale baseline or fail a correct one. Keyed per
# document so an amended file cannot quietly keep its predecessor's baseline.
REPOSITORY_BASELINE: dict[Path, str] = {
    TOPOLOGY: "5745587",
    EVALUATION: "d0d5bb1",
    OPERATIONAL: "5745587",
    TRACE: "d0d5bb1",
}

# The categories CBD-103 evaluates: cross-category plus hosting. A gate in any
# other category belongs to a sibling subtask and must not appear in the matrix.
EVALUATED_CATEGORIES = ("X", "H")

CANDIDATES = ("C1", "C2", "C3")

# Outcomes the matrix may record, per evidence register section 3.3 plus the
# "PASS (design)" form the evaluation defines in its section 5 for Config gates.
MATRIX_OUTCOMES = ("PASS (design)", "PASS", "UNPROVEN", "FAIL")

EVIDENCE_KINDS = ("OBS", "DOC", "CFG")

# Identifier namespaces CBD-103 borrows from approved upstream packages, mapped
# to the document that owns each definition.
BORROWED_IDENTIFIERS: dict[str, tuple[str, ...]] = {
    "DI-91": ("cbd-91-private-mvp-data-inventory.md",),
    "SA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "OP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "AN-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TB-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "CA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "CL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "SR-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "PR-94": (
        "cbd-94-risk-mitigation-requirement-register.md",
        "cbd-94-verification-review-inventory.md",
    ),
    "FU-95": ("cbd-95-architecture-roadmap-follow-up-register.md",),
    "PM-72": ("cbd-72-collaboration-permission-model.md",),
    "SD-071": ("cbd-71-mvp-schedule-decision-register.md",),
    "EC-69": (
        "cbd-69-period-edge-case-scenario-catalog.md",
        "cbd-69-period-edge-cases-validation-rule-specification.md",
    ),
    "INV-69": ("cbd-69-period-edge-cases-validation-rule-specification.md",),
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
    """Every HG-102-* gate in the approved catalog, with category and type."""
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
    """Gate rows from the evaluation's comparison matrix.

    A matrix row is a table line whose first cell names a gate and whose second
    cell is an evidence kind. This shape distinguishes it from the prose tables
    elsewhere in the package that also mention gate identifiers.
    """
    rows: dict[str, dict[str, str]] = {}
    for line in text.splitlines():
        if not line.startswith("| HG-102-"):
            continue
        cell = cells(line)
        if len(cell) < 6 or cell[1] not in EVIDENCE_KINDS:
            continue
        gate = cell[0].split()[0]
        rows[gate] = {
            "kind": cell[1],
            "C1": cell[2],
            "C2": cell[3],
            "C3": cell[4],
        }
    return rows


def normalise_outcome(cell: str) -> str | None:
    """Reduce a matrix cell to the outcome it records, or None if malformed."""
    bare = cell.replace("`", "").replace("**", "").strip()
    for outcome in MATRIX_OUTCOMES:
        if bare == outcome:
            return outcome
    return None


def declared_tally(text: str) -> dict[str, dict[str, int]]:
    """The tally the evaluation restates in section 6.3, as written."""
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
    """Identifiers this package defines, as opposed to merely mentions.

    A TD-103 or EV-102 identifier is defined where it opens a decision paragraph
    or a register row; an OI-103 or OQ-103 identifier is defined in the first
    cell of an open-item or open-question table row.
    """
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


def _row_cells(line: str) -> list[str]:
    stripped = line.strip()
    if not stripped.startswith("|"):
        return []
    return [cell.strip() for cell in stripped.strip("|").split("|")]


def ev_registered(text: str) -> set[str]:
    """EV-102 numbers carrying a real record: a full eight-column register row.

    Read independently of ev_reserved rather than derived by subtracting it.
    Deriving one set from the other is what made an overlap undetectable in a
    sibling package, where a reservation and a registered record claimed the
    same numbers on main and no audit noticed.
    """
    found: set[str] = set()
    for line in text.splitlines():
        cells = _row_cells(line)
        if len(cells) < 8:
            continue
        match = re.fullmatch(r"(EV-102-\d+)", cells[0])
        if match:
            found.add(match.group(1))
    return found


def _is_reservation_row(line: str) -> bool:
    cells = _row_cells(line)
    return (
        len(cells) == 2
        and re.fullmatch(r"EV-102-\d+", cells[0]) is not None
        and "Reserved" in cells[1]
    )


def ev_reserved(text: str) -> set[str]:
    """EV-102 numbers held as reservations: a two-column row saying Reserved."""
    found: set[str] = set()
    for line in text.splitlines():
        if _is_reservation_row(line):
            found.add(_row_cells(line)[0])
    return found


def without_reservation_rows(text: str) -> str:
    """The text minus its reservation rows.

    A reservation row names its own number, so counting it as a citation would
    make every reserved number look like it was being used.
    """
    return "\n".join(
        line for line in text.splitlines() if not _is_reservation_row(line)
    )


def main() -> int:
    audit = Audit()

    for path in PACKAGE_FILES + CBD_102_FILES:
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
        len(applicable) == 27,
        f"applicable X+H gate count changed: expected 27, found {len(applicable)}",
    )

    # ---- Matrix completeness -------------------------------------------------
    rows = matrix_rows(package[EVALUATION])
    audit.check(
        set(rows) == applicable,
        "comparison matrix does not cover exactly the applicable X+H gates; "
        f"missing {sorted(applicable - set(rows))}, "
        f"unexpected {sorted(set(rows) - applicable)}",
    )

    for gate, row in sorted(rows.items()):
        for candidate in CANDIDATES:
            outcome = normalise_outcome(row[candidate])
            audit.check(
                outcome is not None,
                f"{gate} {candidate}: unrecognised outcome {row[candidate]!r}; "
                f"expected one of {MATRIX_OUTCOMES}",
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

    # A gate the catalog marks Vendor can never be satisfied by CoBudget design.
    for gate, row in sorted(rows.items()):
        if gate in catalog_config:
            continue
        for candidate in CANDIDATES:
            audit.check(
                normalise_outcome(row[candidate]) != "PASS (design)",
                f"{gate} is a Vendor gate but {candidate} records PASS (design)",
            )

    # ---- Derived tally must equal the restated one --------------------------
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
        audit.check(
            outcome in declared,
            f"section 6.3 does not restate a {outcome} row",
        )
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

    # ---- Evidence-kind split must match the prose ---------------------------
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
            "stated evidence-kind split "
            f"{[int(v) for v in stated.groups()]} does not match the matrix "
            f"{[kind_counts[k] for k in EVIDENCE_KINDS]}",
        )

    # The evidence ceiling in section 3 lists the observation-blocked gates.
    # That list and the matrix's OBS rows are the same claim stated twice.
    ceiling_section = package[EVALUATION].split("### 3.2")[0]
    ceiling_gates = referenced_ids(ceiling_section, "HG-102")
    obs_gates = {gate for gate, row in rows.items() if row["kind"] == "OBS"}
    audit.check(
        ceiling_gates >= obs_gates,
        "section 3.1 does not list every gate the matrix marks OBS; "
        f"missing {sorted(obs_gates - ceiling_gates)}",
    )
    audit.check(
        ceiling_gates <= applicable,
        "section 3.1 lists a gate outside the applicable X+H set; "
        f"unexpected {sorted(ceiling_gates - applicable)}",
    )

    # ---- Every cited identifier resolves ------------------------------------
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

    # OI-102-* items are spread across all five CBD-102 documents.
    known_oi_102 = referenced_ids("\n".join(read(path) for path in CBD_102_FILES), "OI-102")
    cited_oi_102 = referenced_ids(joined, "OI-102")
    audit.check(
        cited_oi_102 <= known_oi_102,
        f"OI-102 references that do not resolve: {sorted(cited_oi_102 - known_oi_102)}",
    )

    # CBD-103 argues almost entirely by citing approved CBD-11, CBD-12, and
    # CBD-14 material. A citation that does not resolve is the failure mode that
    # makes a derived document look authoritative while resting on nothing, so
    # every prefix it borrows is checked against the document that owns it.
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

    # CBD-67 invariants and CBD-71 governance clauses are cited in backticked
    # form and defined only as table rows, so they need their own shapes.
    for prefix, owner in (
        ("INV", "cbd-67-weekly-monthly-cadence-workflow-specification.md"),
        ("GC", "cbd-71-mvp-schedule-decision-register.md"),
    ):
        owner_text = read(Path(f"docs/{owner}"))
        known = set(re.findall(rf"\|\s*({prefix}-\d+)\s*\|", owner_text))
        cited = set(re.findall(rf"`({prefix}-\d+)`", joined))
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in {owner}: "
            f"{sorted(cited - known)}",
        )

    # ---- The package's own identifiers ---------------------------------------
    td_defined = defined_ids(package[TOPOLOGY], "TD-103")
    td_cited = referenced_ids(joined, "TD-103")
    audit.check(
        td_cited <= td_defined,
        f"TD-103 references with no decision: {sorted(td_cited - td_defined)}",
    )
    audit.check(
        len(td_defined) == 30,
        f"topology defines {len(td_defined)} TD-103 decisions, expected 30",
    )
    audit.check(
        td_defined == {f"TD-103-{number:03d}" for number in range(1, 31)},
        "TD-103 numbering is not a contiguous 001..030 range",
    )

    ev_defined = defined_ids(package[EVALUATION], "EV-102")
    ev_cited = referenced_ids(joined, "EV-102")
    audit.check(
        ev_cited <= ev_defined,
        f"EV-102 references with no register row: {sorted(ev_cited - ev_defined)}",
    )

    # ---- The evidence register's two blocks ---------------------------------
    # This package is the CBD-15 home for provider-level cross-category records,
    # so its register carries both the original 001-016 block and a second block
    # above the range the six category evaluations claimed. Both are guarded by
    # reading the register rows and the reservation rows independently.
    registered = ev_registered(package[EVALUATION])
    reserved = ev_reserved(package[EVALUATION])

    audit.check(
        not (registered & reserved),
        "EV-102 numbers both registered and reserved: "
        f"{sorted(registered & reserved)}",
    )
    ev_used = referenced_ids(without_reservation_rows(joined), "EV-102")
    audit.check(
        not (ev_used & reserved),
        "EV-102 references pointing at a reserved number: "
        f"{sorted(ev_used & reserved)}",
    )

    # The block statement wraps across lines in the source, so match against a
    # whitespace-normalized copy rather than assuming where the line breaks fall.
    stated = re.search(
        r"allocates `EV-102-(\d+)`–`(\d+)`\*\*, using `(\d+)`–`(\d+)` now "
        r"and reserving `(\d+)`–`(\d+)`",
        re.sub(r"\s+", " ", package[EVALUATION]),
    )
    audit.check(
        stated is not None,
        "evaluation section 9.2 does not state its EV-102 block allocation",
    )
    if stated:
        block_lo, block_hi, use_lo, use_hi, res_lo, res_hi = (
            int(group) for group in stated.groups()
        )
        block = {f"EV-102-{n:03d}" for n in range(block_lo, block_hi + 1)}
        used = {f"EV-102-{n:03d}" for n in range(use_lo, use_hi + 1)}
        held = {f"EV-102-{n:03d}" for n in range(res_lo, res_hi + 1)}

        audit.check(
            used | held == block,
            "the stated second block does not partition into its used and "
            f"reserved halves: {sorted(block ^ (used | held))}",
        )
        audit.check(
            not (used & held),
            "the stated used and reserved halves overlap: "
            f"{sorted(used & held)}",
        )
        audit.check(
            used <= registered,
            f"stated as used but carrying no register row: {sorted(used - registered)}",
        )
        audit.check(
            held <= reserved,
            f"stated as reserved but carrying no reservation row: {sorted(held - reserved)}",
        )
        # Nothing in the second block may collide with the six category
        # evaluations, which claimed 001-161 between them.
        audit.check(
            block_lo > 161,
            f"the second block starts at {block_lo}, inside the range the six "
            "category evaluations claimed (001-161)",
        )

    for prefix in ("OI-103", "OQ-103"):
        defined: set[str] = set()
        for text in package.values():
            defined |= defined_ids(text, prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= defined,
            f"{prefix} references with no row: {sorted(cited - defined)}",
        )

    # ---- Claims the package must keep making --------------------------------
    for path, text in package.items():
        audit.check(
            f"`{REPOSITORY_BASELINE[path]}`" in text,
            f"{path}: repository baseline is not "
            f"`{REPOSITORY_BASELINE[path]}`",
        )
        audit.check(
            "Confluence page" in text,
            f"{path}: header does not record Confluence publication status",
        )

    # Every package document must be a registered sync-confluence target, so a
    # header claiming a Confluence page cannot outrun the mechanism that
    # publishes it. Registered here means the exact repo path appears in a
    # Target row; the sync script's own title comparison guards the rest.
    sync_source = read(Path("scripts/sync-confluence.py"))
    for path in PACKAGE_FILES:
        audit.check(
            f'path="{path.as_posix()}"' in sync_source,
            f"{path} is not registered as a sync-confluence target",
        )

    # No candidate may be reported as selectable while the evidence ceiling
    # stands. This is the single claim most likely to drift if a later edit
    # resolves some gates without resolving the ten observation-blocked ones.
    for candidate in CANDIDATES:
        selectable = derived["FAIL"][candidate] == 0 and derived["UNPROVEN"][candidate] == 0
        audit.check(
            not selectable or "ELIGIBLE-PENDING-EVIDENCE" not in package[EVALUATION],
            f"{candidate} has no UNPROVEN gates left but the evaluation still "
            "records ELIGIBLE-PENDING-EVIDENCE; the verdict needs revisiting",
        )
        audit.check(
            derived["UNPROVEN"][candidate] == 0 or "ELIGIBLE-PENDING-EVIDENCE" in package[EVALUATION],
            f"{candidate} carries UNPROVEN gates but the evaluation does not "
            "record the ELIGIBLE-PENDING-EVIDENCE verdict",
        )

    audit.check(
        "no price is stated" in package[TRACE].lower()
        or "UNKNOWN" in package[OPERATIONAL],
        "cost record does not mark unobtained figures UNKNOWN under CR4",
    )

    # ---- Repository wiring ---------------------------------------------------
    workflow = read(Path(".github/workflows/ci.yml"))
    audit.check(
        "python3 scripts/audit-cbd-103.py" in workflow,
        "CI does not run the CBD-103 structural audit",
    )
    vocabulary = read(Path("scripts/check-doc-vocabulary.py"))
    audit.check(
        "cbd-103" in vocabulary or "cbd-10?-*" in vocabulary,
        "scripts/check-doc-vocabulary.py does not cover the CBD-103 documents, "
        "which use the eligibility-verdict and gate-outcome vocabularies",
    )
    audit.check(
        "```mermaid" in package[TOPOLOGY],
        "topology does not carry the trust-boundary diagram FU-95-008 requires",
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-103 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    print(f"Warnings: {len(audit.warnings)}")
    for warning in audit.warnings:
        print(f"  WARN: {warning}")
    if not audit.failures:
        print("Result: PASS (documentation integrity only; the evidence ceiling "
              "in evaluation section 3 remains binding)")
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
