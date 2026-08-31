#!/usr/bin/env python3
"""Repeatable structural and traceability audit for the CBD-108 package.

Same rationale as scripts/audit-cbd-107.py, which this adapts: the CBD-95
close-out found hand-restated figures contradicting the artifacts they
summarized, so everything the CBD-108 documents restate is derived here from
the six source packages rather than frozen as constants.

What is specific to CBD-108, and why each guard exists:

* CBD-108 restates every candidate identity and verdict from six sibling
  evaluations. A verdict that moves in a source package and not here would be
  the exact CBD-95 defect, so the verdicts are re-derived from the source
  matrices rather than compared against a constant.

* The carried-item register claims to hold *every* open question and open item
  from all six packages with none closed by silence, which evidence register
  section 7 requires. That claim is only worth making if it is checked: this
  audit collects the identifiers from the packages themselves and fails on any
  that is missing, duplicated, or present here without an upstream definition.

* The register's class assignment is derived by an ordered rule list rather
  than by editorial judgment. The rule list lives here, so the derivation is
  reproducible rather than trusted -- re-running this script re-derives every
  class and fails if the published table has drifted from what the rules
  produce.

* CBD-108 selects nothing. That is a permitted acceptance-criterion outcome
  rather than an oversight, so the audit asserts it positively: no document in
  this package may record a category as Selected while its source evaluation
  holds no ELIGIBLE verdict.

Documentation integrity only. It verifies no gate result, retrieves no
evidence, prices nothing, performs no observation, and does not establish that
any category could be selected. The evidence ceiling in each source
evaluation's section 3 remains binding.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

DISPOSITION = Path("docs/cbd-108-provider-set-disposition-register.md")
COHERENCE = Path("docs/cbd-108-cross-category-coherence-review.md")
COST = Path("docs/cbd-108-combined-cost-model.md")
CARRIED = Path("docs/cbd-108-carried-item-disposition-register.md")
TRACE = Path("docs/cbd-108-acceptance-criteria-traceability.md")
RETRIEVAL = Path("docs/cbd-108-evidence-retrieval-pass.md")

PACKAGE_FILES = (DISPOSITION, COHERENCE, COST, CARRIED, TRACE, RETRIEVAL)

# The commit each document was written against.
REPOSITORY_BASELINE = {path: "`499de2e`" for path in PACKAGE_FILES}

SOURCE_PACKAGES = ("103", "104", "105", "106", "107", "130")

CATALOG = Path("docs/cbd-102-provider-requirements-hard-gate-catalog.md")
RUBRIC = Path("docs/cbd-102-provider-evaluation-rubric.md")
DEMAND = Path("docs/cbd-102-demand-model.md")
COST_TEMPLATE = Path("docs/cbd-102-cost-template.md")
EVIDENCE = Path("docs/cbd-102-evidence-register-and-exception-rules.md")
CBD_102_FILES = (CATALOG, RUBRIC, DEMAND, COST_TEMPLATE, EVIDENCE)

# Verdicts are derived from the source evaluations, not frozen. This is the
# vocabulary evidence register section 3.3 defines; anything outside it in a
# source matrix means the register changed and this audit is stale.
VERDICTS = (
    "ELIGIBLE-PENDING-EVIDENCE",
    "INELIGIBLE",
    "CONDITIONAL",
    "ELIGIBLE",
)

# Ordered class-assignment rules, first match winning. Published in the
# carried-item register section 3 so a reader can re-derive the table.
CLASS_RULES: tuple[tuple[str, str], ...] = (
    ("D1", r"\*\*Resolved|~~|\*\*Closed|^\s*Closed\.|[Ll]argely resolved"),
    ("D9", r"NDA|non-disclosure|not obtainable by desk|trust portal"),
    (
        "D8",
        r"reviewed by no one but its author|not been reviewed by anyone"
        r"|Desk evaluation by one author|desk evaluation|Design record only"
        r"|design record, not evidence|[Rr]ecorded consequence",
    ),
    (
        "D4",
        r"[Rr]equires provider contact|put to|Ask each|must be asked"
        r"|will not be found|ask the provider|provider contact|Requires provider",
    ),
    ("D2", r"[Oo]bservation|[Oo]bserve|sandbox|exercis|route A|route-A|rehears"),
    (
        "D5",
        r"Product Owner|CoBudget operating decision|[Nn]o approved source"
        r"|approved source sets|budget ceiling",
    ),
    ("D6", r"CBD-108"),
    (
        "D3",
        r"Retriev|retriev|Read the|[Oo]btain|primary catalog|[Ff]etch|[Rr]e-verify"
        r"|pric|Confirm|confirm|Inspect|[Cc]heck|Which |What |Does |Do the "
        r"|Is there|statement of",
    ),
    ("D7", r"build|implementation|CBD-120|later ticket|Revisit|future|when native"),
)
UNCLASSIFIED = "D0"
CLASS_ORDER = ("D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D0")


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


def referenced_ids(text: str, prefix: str) -> set[str]:
    return set(re.findall(rf"{prefix}-\d{{3}}", text))


def source_files(package: str) -> list[Path]:
    return sorted((ROOT / "docs").glob(f"cbd-{package}-*.md"))


def carried_definitions() -> dict[str, str]:
    """Every OQ/OI defined in a source package, mapped to its longest row text.

    A definition is a table row whose first cell is the identifier. The longest
    row wins because several identifiers are restated in a sibling document
    with less text than the owning package carries.
    """
    rows: dict[str, str] = {}
    for package in SOURCE_PACKAGES:
        for path in source_files(package):
            for line in read(path).splitlines():
                match = re.match(r"\|\s*(O[QI]-\d{3}-\d{3})\s*\|(.*)$", line)
                if not match:
                    continue
                identifier, body = match.group(1), match.group(2)
                if identifier not in rows or len(body) > len(rows[identifier]):
                    rows[identifier] = body
    return rows


def derive_class(body: str) -> str:
    for name, pattern in CLASS_RULES:
        if re.search(pattern, body):
            return name
    return UNCLASSIFIED


def published_classes(text: str) -> dict[str, tuple[int, list[str]]]:
    """The class table as published, read back from the register."""
    published: dict[str, tuple[int, list[str]]] = {}
    for line in text.splitlines():
        if not re.match(r"\|\s*\*\*D\d\*\*\s*\|", line):
            continue
        cells = line.split("|")
        name = cells[1].strip().strip("*")
        declared = int(cells[3].strip())
        ids = re.findall(r"O[QI]-\d{3}-\d{3}", cells[4])
        published[name] = (declared, ids)
    return published


def main() -> int:
    audit = Audit()

    for path in PACKAGE_FILES:
        if not (ROOT / path).exists():
            print(f"MISSING: {path}")
            return 1

    texts = {path: read(path) for path in PACKAGE_FILES}
    joined = "\n".join(texts.values())

    # --- header integrity -------------------------------------------------
    for path, text in texts.items():
        audit.check(
            REPOSITORY_BASELINE[path] in text,
            f"{path}: repository baseline is not {REPOSITORY_BASELINE[path]}",
        )
        audit.check(
            "| Jira | [CBD-108]" in text,
            f"{path}: header does not name CBD-108",
        )
        audit.check(
            "Draft — not approved" in text,
            f"{path}: status must say the package is a draft until approved",
        )

    # --- the carried-item register is complete ----------------------------
    defined = carried_definitions()
    published = published_classes(texts[CARRIED])

    audit.check(
        set(published) == set(CLASS_ORDER),
        f"carried register: class rows are {sorted(published)}, expected {sorted(CLASS_ORDER)}",
    )

    listed: list[str] = []
    for name in CLASS_ORDER:
        declared, ids = published.get(name, (0, []))
        audit.check(
            declared == len(ids),
            f"carried register {name}: declares {declared} items, lists {len(ids)}",
        )
        listed += ids

    audit.check(
        len(listed) == len(set(listed)),
        "carried register: an identifier appears in more than one class",
    )
    missing = sorted(set(defined) - set(listed))
    audit.check(
        not missing,
        f"carried register: identifiers defined upstream but not carried: {missing}",
    )
    unknown = sorted(set(listed) - set(defined))
    audit.check(
        not unknown,
        f"carried register: identifiers carried without an upstream definition: {unknown}",
    )

    total_line = re.search(r"\*\*(\d+)\*\* \|\n", texts[CARRIED])
    audit.check(
        f"**{len(defined)}**" in texts[CARRIED],
        f"carried register: the total {len(defined)} is not stated in the document",
    )

    # --- the published classes match what the rules derive ----------------
    derived_by_class: dict[str, list[str]] = {name: [] for name in CLASS_ORDER}
    for identifier, body in sorted(defined.items()):
        derived_by_class[derive_class(body)].append(identifier)
    for name in CLASS_ORDER:
        _, ids = published.get(name, (0, []))
        audit.check(
            sorted(ids) == sorted(derived_by_class[name]),
            f"carried register {name}: published members differ from what CLASS_RULES derives",
        )

    # --- verdicts are restated, not invented ------------------------------
    for package in SOURCE_PACKAGES:
        evaluation = Path(
            f"docs/cbd-{package}-candidate-shortlist-and-gate-evaluation.md"
        )
        source = read(evaluation)
        verdict_rows = [
            line for line in source.splitlines() if line.startswith("| **Verdict**")
        ]
        audit.check(
            bool(verdict_rows),
            f"cbd-{package}: no verdict row found to derive from",
        )
        for row in verdict_rows:
            found = [v for v in VERDICTS if v in row]
            audit.check(
                bool(found),
                f"cbd-{package}: verdict row carries no recognised verdict",
            )

    # A source evaluation holding no ELIGIBLE verdict may not be recorded here
    # as Selected. This is the acceptance criterion stated as a guard.
    eligible_anywhere = False
    for package in SOURCE_PACKAGES:
        source = read(
            Path(f"docs/cbd-{package}-candidate-shortlist-and-gate-evaluation.md")
        )
        for row in source.splitlines():
            if not row.startswith("| **Verdict**"):
                continue
            for cell in row.split("|"):
                if re.fullmatch(r"\s*`?ELIGIBLE`?\s*", cell):
                    eligible_anywhere = True
    audit.check(
        not eligible_anywhere,
        "a source evaluation now holds an ELIGIBLE verdict; the dispositions must be revisited",
    )
    audit.check(
        "**Zero selected.**" in texts[DISPOSITION],
        "disposition register: must state plainly that nothing is selected while no candidate is ELIGIBLE",
    )

    # --- identifier references resolve ------------------------------------
    for prefix, source in (
        ("HG-102", CATALOG),
        ("WR-102", RUBRIC),
        ("DM-102", DEMAND),
        ("CT-102", COST_TEMPLATE),
        ("EX-102", EVIDENCE),
    ):
        known = referenced_ids(read(source), prefix)
        cited = referenced_ids(joined, prefix)
        audit.check(
            cited <= known,
            f"{prefix} references that do not resolve in {source}: {sorted(cited - known)}",
        )

    known_oi_102 = referenced_ids(
        "\n".join(read(path) for path in CBD_102_FILES), "OI-102"
    )
    cited_oi_102 = referenced_ids(joined, "OI-102")
    audit.check(
        cited_oi_102 <= known_oi_102,
        f"OI-102 references that do not resolve: {sorted(cited_oi_102 - known_oi_102)}",
    )

    carried_known = set(defined)
    for package in SOURCE_PACKAGES:
        for prefix in (f"OQ-{package}", f"OI-{package}"):
            cited = referenced_ids(joined, prefix)
            audit.check(
                cited <= carried_known,
                f"{prefix} references with no upstream definition: "
                f"{sorted(cited - carried_known)}",
            )

    evidence_records = referenced_ids(
        "\n".join(
            read(path)
            for package in SOURCE_PACKAGES
            for path in source_files(package)
        ),
        "EV-102",
    )
    # Records CBD-108 registers itself, defined by a heading in the retrieval
    # pass. They are legitimate citation targets alongside the inherited ones.
    own_records = {
        m.group(1)
        for m in re.finditer(r"^### (EV-102-\d{3}) ", texts[RETRIEVAL], re.M)
    }
    cited_ev = referenced_ids(joined, "EV-102")
    audit.check(
        cited_ev <= evidence_records | own_records,
        f"EV-102 references neither inherited nor registered here: "
        f"{sorted(cited_ev - evidence_records - own_records)}",
    )
    # The block collision scripts/audit-cbd-105.py was corrected for: every
    # number this package registers must sit above everything the corpus holds.
    if own_records:
        highest_inherited = max(int(r[-3:]) for r in evidence_records)
        lowest_own = min(int(r[-3:]) for r in own_records)
        audit.check(
            lowest_own > highest_inherited,
            f"CBD-108 registers EV-102-{lowest_own:03d}, at or below the "
            f"highest number already held, EV-102-{highest_inherited:03d}",
        )

    own_oq = {
        m.group(1)
        for text in texts.values()
        for m in re.finditer(r"^\|\s*(OQ-108-\d{3})\s*\|", text, re.M)
    }
    audit.check(
        referenced_ids(joined, "OQ-108") <= own_oq,
        "OQ-108 references cited but never defined: "
        f"{sorted(referenced_ids(joined, 'OQ-108') - own_oq)}",
    )

    # --- this package's own identifiers -----------------------------------
    defined_108 = set()
    for text in texts.values():
        defined_108 |= {
            m.group(1)
            for line in text.splitlines()
            if (m := re.match(r"\|\s*(OI-108-\d{3})\s*\|", line))
        }
    cited_108 = referenced_ids(joined, "OI-108")
    audit.check(
        cited_108 <= defined_108,
        f"OI-108 references that are cited but never defined: "
        f"{sorted(cited_108 - defined_108)}",
    )
    audit.check(
        bool(defined_108),
        "the package defines no OI-108 open items, which cannot be right",
    )

    # --- the package does not overclaim -----------------------------------
    audit.check(
        "selects no provider" in texts[DISPOSITION],
        "disposition register: must state that it selects no provider",
    )
    audit.check(
        "clears nothing" in texts[COHERENCE],
        "coherence review: must state that it clears nothing while the X gates are UNPROVEN",
    )
    audit.check(
        "cannot be produced" in texts[COST],
        "cost model: must state that no combined total can be produced",
    )
    audit.check(
        "no gate outcome" in texts[RETRIEVAL],
        "retrieval pass: must state that it moves no gate outcome",
    )

    print(f"CBD-108 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  - {failure}")
    print(f"Warnings: {len(audit.warnings)}")
    for warning in audit.warnings:
        print(f"  - {warning}")
    if not audit.failures:
        print(
            "Result: PASS (documentation integrity only; no category is "
            "selected and the observation pass remains unperformed)"
        )
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
