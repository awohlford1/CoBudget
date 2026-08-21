#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-104 package.

What this audit exists to catch
-------------------------------
The same failure mode CBD-95 exposed and CBD-103 guarded against: a
hand-written restatement of something a parser could derive, drifting away
from the artifact it summarizes. CBD-104 restates the same two things its
sibling does, and both are guarded here by derivation rather than by a frozen
constant:

* the per-candidate gate tally in the evaluation's section 6.3, derived from
  the section 6.1 and 6.2 matrix rows; and
* the evidence-kind split (OBS / DOC / CFG), derived from the same rows.

It additionally proves the matrix is *complete* against the approved CBD-102
catalog -- every gate in categories X and I appears exactly once -- and that
the Config rows agree with the catalog's own satisfaction-type column.

Two guards are new here, because CBD-104 does two things CBD-103 did not.

* **No PASS without a registered evidence record.** Evidence register section
  3.2 fixes that a hard gate never passes on Asserted or Absent evidence.
  CBD-104 records the category's first documentary passes, so the rule stops
  being theoretical: every `PASS` cell's row must cite at least one `EV-102-*`
  record. A pass that cites nothing is exactly the unsupported claim CBD-92
  section 10.3 warns about.
* **Priced quantities are derived, not retyped.** CBD-104 states real prices,
  quoted against the demand model's identity row. The Base and High MAU
  figures in the cost assessment are checked against the approved cost
  template's category-I row, so a demand change cannot leave a stale quantity
  behind a real-looking dollar figure.

What it does not prove
----------------------
Documentation integrity only. It does not verify a gate result, retrieve
evidence, confirm a price, or establish that any ID-104 design is
implemented. The unperformed observation pass in evaluation section 3 and the
open items in every document remain binding regardless of this audit passing.
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

CBD_103_TOPOLOGY = Path("docs/cbd-103-runtime-topology-specification.md")
CBD_103_EVALUATION = Path("docs/cbd-103-candidate-shortlist-and-gate-evaluation.md")
CBD_105_EVALUATION = Path("docs/cbd-105-candidate-shortlist-and-gate-evaluation.md")
CBD_103_OPERATIONAL = Path("docs/cbd-103-operational-and-cost-assessment.md")
CBD_103_TRACE = Path("docs/cbd-103-acceptance-criteria-traceability.md")

BOUNDARY = Path("docs/cbd-104-identity-integration-boundary-specification.md")
EVALUATION = Path("docs/cbd-104-candidate-shortlist-and-gate-evaluation.md")
ASSESSMENT = Path("docs/cbd-104-operational-and-cost-assessment.md")
TRACE = Path("docs/cbd-104-acceptance-criteria-traceability.md")

PACKAGE_FILES = (BOUNDARY, EVALUATION, ASSESSMENT, TRACE)
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST, EVIDENCE)
CBD_103_FILES = (
    CBD_103_TOPOLOGY,
    CBD_103_EVALUATION,
    CBD_103_OPERATIONAL,
    CBD_103_TRACE,
)

# The categories CBD-104 evaluates: cross-category plus identity. A gate in
# any other category belongs to a sibling subtask and must not appear.
EVALUATED_CATEGORIES = ("X", "I")

# Candidate identifiers are provider identities carried across categories,
# following the CBD-105 convention: C2 is AWS, C3 is Azure, C4 is Auth0.
CANDIDATES = ("C2", "C3", "C4")

# Outcomes the matrix may record, per evidence register section 3.3 plus the
# "PASS (design)" form the evaluation defines for Config gates.
MATRIX_OUTCOMES = ("PASS (design)", "PASS", "UNPROVEN", "FAIL")

EVIDENCE_KINDS = ("OBS", "DOC", "CFG")

# The commit each document was written against. The v1.2 cross-category pass
# amended two of the four, so a single shared constant would either pass a
# stale baseline or fail a correct one.
BASELINE = {
    BOUNDARY: "`6b1ac8e`",
    EVALUATION: "`d0d5bb1`",
    ASSESSMENT: "`6b1ac8e`",
    TRACE: "`d0d5bb1`",
}

# EV-102-007..012 are reserved by CBD-103 section 9 for its own completion
# pass. CBD-104 continues the shared append-only register and must not reuse
# them; a collision would silently overwrite a sibling package's reservation.
CBD_103_RESERVED_EVIDENCE = {f"EV-102-{n:03d}" for n in range(7, 13)}

# Sibling category evaluations that register into the same shared EV-102
# namespace. CBD-104 must not redefine a number any of them already holds.
# Siblings are checked when present rather than required, because each
# category evaluation is merged on its own branch and CBD-104 must not fail
# for standing on a commit where a sibling has not landed yet. Once both are
# on a branch the collision check applies to both.
SIBLING_EVALUATIONS = (CBD_103_EVALUATION, CBD_105_EVALUATION)

# Identifier namespaces CBD-104 borrows from approved upstream packages,
# mapped to the document that owns each definition.
BORROWED_IDENTIFIERS: dict[str, tuple[str, ...]] = {
    "DI-91": ("cbd-91-private-mvp-data-inventory.md",),
    "EG-91": ("cbd-91-private-mvp-data-inventory.md",),
    "CR-91": ("cbd-91-private-mvp-data-inventory.md",),
    "SA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "OP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "AN-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EP-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "TB-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "CL-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "EM-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "NT-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "PA-92": ("cbd-92-system-flow-technical-threat-model.md",),
    "RI-93": ("cbd-93-privacy-coercion-abuse-analysis.md",),
    "SR-94": ("cbd-94-risk-mitigation-requirement-register.md",),
    "PR-94": (
        "cbd-94-risk-mitigation-requirement-register.md",
        "cbd-94-verification-review-inventory.md",
    ),
    "FU-95": ("cbd-95-architecture-roadmap-follow-up-register.md",),
    "PM-72": ("cbd-72-collaboration-permission-model.md",),
    "IC-73": ("cbd-73-invitation-consent-lifecycle-specification.md",),
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

    A matrix row is a table line whose first cell names a gate and whose
    second cell is an evidence kind. That shape distinguishes it from the
    prose tables elsewhere in the package that also mention gate identifiers.
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
            "C2": cell[2],
            "C3": cell[3],
            "C4": cell[4],
            "evidence": cell[5],
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

    An ID-104 or EV-102 identifier is defined where it opens a decision
    paragraph or a register row; an OI-104 or OQ-104 identifier is defined in
    the first cell of an open-item or open-question table row.
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
        len(applicable) == 25,
        f"applicable X+I gate count changed: expected 25, found {len(applicable)}",
    )

    # ---- Matrix completeness -------------------------------------------------
    rows = matrix_rows(package[EVALUATION])
    audit.check(
        set(rows) == applicable,
        "comparison matrix does not cover exactly the applicable X+I gates; "
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

    # ---- No PASS without a registered evidence record -----------------------
    # Evidence register section 3.2: a hard gate never passes on Asserted or
    # Absent evidence. A PASS whose row cites no EV-102 record is unsupported.
    for gate, row in sorted(rows.items()):
        passes = [
            candidate
            for candidate in CANDIDATES
            if normalise_outcome(row[candidate]) == "PASS"
        ]
        if not passes:
            continue
        audit.check(
            bool(referenced_ids(row["evidence"], "EV-102")),
            f"{gate} records PASS for {passes} but its evidence cell cites no "
            "EV-102 record; evidence register 3.2 forbids a pass without "
            "Documented-or-stronger evidence",
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

    # The observation list in section 3 and the matrix's OBS rows are the same
    # claim stated twice.
    ceiling_section = package[EVALUATION].split("### 3.1")[0]
    ceiling_gates = referenced_ids(ceiling_section, "HG-102")
    obs_gates = {gate for gate, row in rows.items() if row["kind"] == "OBS"}
    audit.check(
        ceiling_gates >= obs_gates,
        "section 3 does not list every gate the matrix marks OBS; "
        f"missing {sorted(obs_gates - ceiling_gates)}",
    )
    audit.check(
        ceiling_gates <= applicable,
        "section 3 lists a gate outside the applicable X+I set; "
        f"unexpected {sorted(ceiling_gates - applicable)}",
    )

    # ---- Priced quantities are derived from the approved demand row ---------
    # CBD-104 states real prices. A stale quantity behind a real dollar figure
    # is the failure this guards, so the identity row is read from the
    # approved cost template rather than trusted from the assessment's prose.
    identity_row = re.search(
        r"^\|\s*\*\*I\*\*\s*\|[^|]*\|\s*([\d,]+)\s*\|\s*([\d,]+)\s*\|",
        read(COST),
        re.MULTILINE,
    )
    audit.check(
        identity_row is not None,
        "cost template section 5 has no category I billable-unit row",
    )
    if identity_row:
        base, high = (value.replace(",", "") for value in identity_row.groups())
        audit.check(
            f"Base {base}" in package[ASSESSMENT],
            f"assessment does not quote the approved Base identity quantity "
            f"({base} MAU) from the cost template",
        )
        audit.check(
            f"High {high}" in package[ASSESSMENT],
            f"assessment does not quote the approved High identity quantity "
            f"({high} MAU) from the cost template",
        )

    # Every candidate carried into the matrix needs a cost record.
    for candidate in CANDIDATES:
        audit.check(
            candidate in package[ASSESSMENT],
            f"{candidate} appears in the matrix but has no cost record",
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
    known_oi_102 = referenced_ids(
        "\n".join(read(path) for path in CBD_102_FILES), "OI-102"
    )
    cited_oi_102 = referenced_ids(joined, "OI-102")
    audit.check(
        cited_oi_102 <= known_oi_102,
        f"OI-102 references that do not resolve: {sorted(cited_oi_102 - known_oi_102)}",
    )

    # CBD-104 plugs into the CBD-103 topology and inherits its open items, so
    # every borrowed CBD-103 identifier must resolve in that package.
    cbd_103_text = "\n".join(read(path) for path in CBD_103_FILES)
    for prefix in ("TD-103", "OI-103", "OQ-103"):
        known = referenced_ids(cbd_103_text, prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in the CBD-103 package: "
            f"{sorted(cited - known)}",
        )

    # A citation that does not resolve is the failure mode that makes a derived
    # document look authoritative while resting on nothing, so every borrowed
    # prefix is checked against the document that owns it.
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

    # ---- The package's own identifiers ---------------------------------------
    id_defined = defined_ids(package[BOUNDARY], "ID-104")
    id_cited = referenced_ids(joined, "ID-104")
    audit.check(
        id_cited <= id_defined,
        f"ID-104 references with no decision: {sorted(id_cited - id_defined)}",
    )
    audit.check(
        len(id_defined) == 19,
        f"boundary defines {len(id_defined)} ID-104 decisions, expected 19",
    )
    audit.check(
        id_defined == {f"ID-104-{number:03d}" for number in range(1, 20)},
        "ID-104 numbering is not a contiguous 001..019 range",
    )

    # The shared EV-102 register is append-only across sibling packages.
    ev_defined_here = defined_ids(package[EVALUATION], "EV-102")
    ev_defined_siblings: set[str] = set()
    siblings_present = [s for s in SIBLING_EVALUATIONS if (ROOT / s).is_file()]
    for sibling in siblings_present:
        ev_defined_siblings |= defined_ids(read(sibling), "EV-102")
    ev_cited = referenced_ids(joined, "EV-102")
    audit.check(
        ev_cited <= (ev_defined_here | ev_defined_siblings),
        "EV-102 references with no register row in any package: "
        f"{sorted(ev_cited - ev_defined_here - ev_defined_siblings)}",
    )
    audit.check(
        not (ev_defined_here & ev_defined_siblings),
        "CBD-104 redefines EV-102 records a sibling evaluation already holds: "
        f"{sorted(ev_defined_here & ev_defined_siblings)}",
    )
    audit.warn(
        len(siblings_present) == len(SIBLING_EVALUATIONS),
        "not every sibling evaluation is present on this branch, so the shared "
        "EV-102 collision check covered only "
        f"{[s.name for s in siblings_present]}",
    )
    audit.check(
        not (ev_defined_here & CBD_103_RESERVED_EVIDENCE),
        "CBD-104 uses EV-102 numbers CBD-103 reserved for its completion pass: "
        f"{sorted(ev_defined_here & CBD_103_RESERVED_EVIDENCE)}",
    )

    for prefix in ("OI-104", "OQ-104"):
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
            BASELINE[path] in text,
            f"{path}: repository baseline is not {BASELINE[path]}",
        )
        audit.check(
            "Confluence page" in text,
            f"{path}: header does not record Confluence publication status",
        )

    # A header may claim a Confluence page only once a sync target exists for
    # it. Publication follows merge, so while the header still says "Not yet
    # registered" this is a warning that turns into a real check on
    # registration -- the CBD-103 package followed the same sequence.
    sync_source = read(Path("scripts/sync-confluence.py"))
    for path, text in package.items():
        if "Not yet registered" in text:
            continue
        audit.warn(
            f'path="{path.as_posix()}"' in sync_source,
            f"{path}: header claims a Confluence page; confirm the sync target "
            "exists in scripts/sync-confluence.py",
        )

    # No candidate may be reported as selectable while observation gates remain
    # unresolved. This is the claim most likely to drift if a later edit
    # resolves some gates without resolving all of them.
    for candidate in CANDIDATES:
        audit.check(
            derived["UNPROVEN"][candidate] == 0
            or "ELIGIBLE-PENDING-EVIDENCE" in package[EVALUATION],
            f"{candidate} carries UNPROVEN gates but the evaluation does not "
            "record the ELIGIBLE-PENDING-EVIDENCE verdict",
        )
        selectable = (
            derived["FAIL"][candidate] == 0 and derived["UNPROVEN"][candidate] == 0
        )
        audit.check(
            not selectable or "ELIGIBLE-PENDING-EVIDENCE" not in package[EVALUATION],
            f"{candidate} has no UNPROVEN gates left but the evaluation still "
            "records ELIGIBLE-PENDING-EVIDENCE; the verdict needs revisiting",
        )

    audit.check(
        "UNKNOWN" in package[ASSESSMENT],
        "cost records do not mark unobtained figures UNKNOWN under CR4",
    )

    # ---- Repository wiring ---------------------------------------------------
    workflow = read(Path(".github/workflows/ci.yml"))
    audit.check(
        "python3 scripts/audit-cbd-104.py" in workflow,
        "CI does not run the CBD-104 structural audit",
    )
    vocabulary = read(Path("scripts/check-doc-vocabulary.py"))
    audit.check(
        "cbd-10?" in vocabulary or "cbd-104" in vocabulary,
        "scripts/check-doc-vocabulary.py does not cover the CBD-104 documents, "
        "which use the eligibility-verdict and gate-outcome vocabularies",
    )
    audit.check(
        "```mermaid" in package[BOUNDARY],
        "boundary specification does not carry the identity boundary diagram",
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-104 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    print(f"Warnings: {len(audit.warnings)}")
    for warning in audit.warnings:
        print(f"  WARN: {warning}")
    if not audit.failures:
        print(
            "Result: PASS (documentation integrity only; the unperformed "
            "observation pass in evaluation section 3 remains binding)"
        )
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
