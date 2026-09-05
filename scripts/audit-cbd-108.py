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

* The package was approved on September 5, 2026, so the status guard requires
  the approval and forbids the draft string. It required the opposite until that
  day, correctly. This is the third guard in this package inverted by a decision
  rather than by a defect -- OI-108-085 -- and the inversion is the price of a
  guard that asserts something true, not a sign the guard was wrong.

* Tranche 71 completed the cost model and six places across three documents
  went on saying it could not be completed, through 117 green checks, because
  the guard of the day pinned one sentence and the survivors used six other
  wordings. The price-side guard therefore matches the *claim* as a family
  across the five current-state documents, exempting struck and quoted text so
  that recording the defect does not trip it. OI-108-082.

* CBD-108 selected six categories on September 2, 2026 under route B, at
  ELIGIBLE-PENDING-EVIDENCE with the observations deferred to build (evidence
  register section 3.3.1). The audit asserts that the disposition register
  states that basis and its deferred consequence on its face, states the
  selection outcome, and no longer carries the pre-selection claim that it
  selects no provider -- a claim this audit required until tranche 65, six
  tranches after it stopped being true. It also fails if any source evaluation
  moves to ELIGIBLE, because the dispositions would then need revisiting.

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
REPOSITORY_BASELINE = {path: "`054bc56`" for path in PACKAGE_FILES}

SOURCE_PACKAGES = ("103", "104", "105", "106", "107", "130")

# The exact verdict row each source evaluation carries, in candidate order.
#
# Tranche 66. The guard below this used to check only that no source had been
# upgraded to a bare ELIGIBLE, while the traceability claimed the audit "fails
# if a source verdict changes". It did not: mutating every identity candidate to
# INELIGIBLE -- including C2 Amazon Cognito, which CBD-108 selects -- passed with
# zero failures. A selected candidate turning INELIGIBLE is the most dangerous
# drift available to this package, so the verdicts are pinned exactly and any
# change in any direction fails until the dispositions are revisited.
SOURCE_VERDICTS = {
    "103": ("ELIGIBLE-PENDING-EVIDENCE", "INELIGIBLE", "INELIGIBLE"),
    "104": ("ELIGIBLE-PENDING-EVIDENCE",) * 3,
    "105": ("ELIGIBLE-PENDING-EVIDENCE", "INELIGIBLE", "ELIGIBLE-PENDING-EVIDENCE"),
    "106": ("ELIGIBLE-PENDING-EVIDENCE",) * 3,
    "107": ("ELIGIBLE-PENDING-EVIDENCE",) * 4,
    "130": ("ELIGIBLE-PENDING-EVIDENCE", "ELIGIBLE-PENDING-EVIDENCE", "INELIGIBLE"),
}

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
        # Inverted at tranche 77, and this is the third inversion of the shape
        # OI-108-085 records. The requirement for "Draft -- not approved" was
        # true and worth asserting until the Product Owner approved on
        # September 5, 2026, at which point it became a requirement for a false
        # statement -- section 4.77's defect exactly. Shown to fail against the
        # approved text before this replacement was written.
        audit.check(
            "**Approved v1.0**" in text,
            f"{path}: status must record the September 5, 2026 approval",
        )
        audit.check(
            "| Status | **Draft — not approved" not in text,
            f"{path}: status row still says the package is an unapproved draft",
        )
        audit.check(
            "Approved September 5, 2026" in text,
            f"{path}: reviewer row must record who approved and when",
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

    # Every source verdict row still reads exactly as it did when the
    # dispositions were made. Any change -- an upgrade that would make the
    # selection basis weaker than what is available, or a downgrade that could
    # leave an INELIGIBLE candidate selected -- fails here.
    for package, expected in SOURCE_VERDICTS.items():
        source = read(
            Path(f"docs/cbd-{package}-candidate-shortlist-and-gate-evaluation.md")
        )
        actual: tuple[str, ...] = ()
        for row in source.splitlines():
            if row.startswith("| **Verdict**"):
                actual = tuple(
                    cell.strip().strip("`")
                    for cell in row.split("|")[2:]
                    if cell.strip()
                )
        audit.check(
            actual == expected,
            f"cbd-{package}: verdicts are now {actual}, pinned as {expected}; "
            "the CBD-108 dispositions must be revisited",
        )

    # Retained as a named check so the ELIGIBLE case reports its own reason.
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
    # Route B, Product Owner decision of September 2, 2026 (evidence register
    # 3.3.1): a candidate at ELIGIBLE-PENDING-EVIDENCE may be selected. The
    # register must carry the basis and the deferred risk on its face, so that a
    # later reader cannot mistake the selection for a settled evaluation.
    audit.check(
        "at `ELIGIBLE-PENDING-EVIDENCE` under" in texts[DISPOSITION],
        "disposition register: a selection under route B must state that basis explicitly",
    )
    audit.check(
        "resolve during build" in texts[DISPOSITION],
        "disposition register: must carry route B's deferred-observation consequence",
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
    # Tranche 65: this guard required the words "selects no provider" for six
    # tranches after the register selected six categories, which kept the
    # stale sentence in place. Inverted: the register must state the outcome
    # and must not carry the old claim.
    audit.check(
        "Six selected, one deferred" in texts[DISPOSITION],
        "disposition register: must state the selection outcome on its face",
    )
    audit.check(
        "selects no provider" not in texts[DISPOSITION],
        "disposition register: still carries the pre-route-B claim that it selects no provider",
    )
    audit.check(
        "clears nothing" in texts[COHERENCE],
        "coherence review: must state that it clears nothing while the X gates are UNPROVEN",
    )
    # Tranche 71: inverted. This required the words "cannot be produced" from the
    # tranche when that was true, and tranche 71 produced a total at cost model
    # section 2.1. Section 4.77 recorded this exact failure once already -- a guard
    # that requires a false statement is worse than no guard, and it is why the
    # disposition register's stale sentence survived six tranches. The model must
    # now carry its comparison figure and must not still claim it has none.
    audit.check(
        "$62.56" in texts[COST],
        "cost model: must state the CT-102-017 steady-state comparison figure",
    )
    audit.check(
        "no combined total is produced" not in texts[COST].lower(),
        "cost model: still claims no combined total is produced",
    )
    audit.check(
        "no gate outcome" in texts[RETRIEVAL],
        "retrieval pass: must state that it moves no gate outcome",
    )

    # OI-108-084: the carried register's class table is derived above and was
    # never wrong. What went wrong twice was a count written in prose beside a
    # correct table -- the D0 figure taken from the D2 row four lines below it.
    # So this anchors on the claim's shape, "N `D0` items" or "N carried items",
    # and requires N to be the derived D0 count or the carried total. Derived,
    # not pinned: re-classifying an item moves the guard with the table.
    #
    # Quoted text is exempt for the reason section 4.87 needs it to be -- that
    # section quotes the wrong figure verbatim in order to record it, and a
    # guard that fails on its own correction is the section 4.77 defect.
    d0_count = len(derived_by_class[UNCLASSIFIED])
    carried_total = sum(len(members) for members in derived_by_class.values())
    d0_prose = re.compile(
        r"(\d{1,4})\s+(?:of\s+\d{1,4}\s+)?(?:`D0`\s+items|carried\s+items)",
        re.IGNORECASE,
    )
    quoted_span = re.compile(r'\*"[^"]{0,400}"\*', re.DOTALL)
    for path in (TRACE, RETRIEVAL, CARRIED, DISPOSITION):
        live = quoted_span.sub(" ", " ".join(texts[path].split()))
        for stated in d0_prose.findall(live):
            audit.check(
                int(stated) in (d0_count, carried_total),
                f"{path.name}: prose states {stated} carried/D0 items, which is "
                f"neither the derived D0 count ({d0_count}) nor the carried "
                f"total ({carried_total}) -- OI-108-084",
            )

    # OI-108-082: the price-side decay class. Tranche 71 completed the cost
    # model and six places across three documents went on saying it could not
    # be completed, two of them contradicting newer text on their own page,
    # through 117 green checks. The tranche 71 guard below pins one sentence --
    # "no combined total is produced" -- and the six survivors phrased the same
    # claim six other ways, which is the lesson: a guard pinned to a sentence
    # catches that sentence.
    #
    # So this one matches the CLAIM as a family. It runs on the five
    # current-state documents and not on the retrieval pass, which is an
    # append-only ledger of dated tranches where a superseded statement is the
    # record rather than a defect. Struck text and quoted text are exempt for
    # the same reason: section 4.87 quotes every one of these verbatim in order
    # to record that they were stale, and a guard that fails on its own
    # correction is the section 4.77 defect again.
    struck = re.compile(r"~~.*?~~", re.DOTALL)
    quoted = re.compile(r'\*"[^"]{0,400}"\*', re.DOTALL)
    price_side_decay = (
        ("price side is empty", re.compile(r"price side[^.\n|]{0,30}\bis empty\b", re.I)),
        ("the total cannot be produced", re.compile(r"\bcannot be produced\b", re.I)),
        ("no combined total exists", re.compile(r"\bno (?:combined )?total (?:is|exists|can be)\b", re.I)),
        ("no cost totals", re.compile(r"\bno cost totals\b", re.I)),
        # Eighth wording, found at tranche 77 in the disposition register's own
        # status row while promoting it to v1.0 -- past all seven above.
        ("no combined cost model", re.compile(r"\bno combined cost model\b", re.I)),
        ("thresholds cannot be set", re.compile(r"\bthresholds cannot be set\b", re.I)),
        ("no budget ceiling exists", re.compile(r"\bno budget ceiling exists\b", re.I)),
        (
            "prices unknown in N of six categories",
            re.compile(r"\bprices?\b[^.\n|]{0,20}\b(?:are|remain)\b[^.\n|]{0,20}`?UNKNOWN`?[^.\n|]{0,20}\bin\b[^.\n|]{0,20}\bof six\b", re.I),
        ),
    )
    revision_record = re.compile(r"^## \d+\. Revision record$.*", re.M | re.DOTALL)
    for path in PACKAGE_FILES:
        if path == RETRIEVAL:
            continue
        # A revision record is the same kind of artifact as the retrieval pass:
        # dated entries describing what was true at that version. Exempt it for
        # the same reason, and only it -- the exemption is anchored to the
        # heading, so prose cannot drift into it.
        current = revision_record.sub("", texts[path])
        live = quoted.sub(" ", struck.sub(" ", current))
        for label, pattern in price_side_decay:
            audit.check(
                pattern.search(live) is None,
                f"{path.name}: still asserts, unstruck, that {label} -- "
                "the cost model states $45.57/$62.56/$164.21 at section 2.1 (OI-108-082)",
            )

    # OI-108-055: template placeholders and generator source have shipped into
    # merged prose three times, each through a green build. The claim that a
    # document audit could not see this was wrong -- the residue is literal text.
    for path in PACKAGE_FILES:
        for token in ('{D}', '{S}', '" + D + "', '" + S + "'):
            occurrences = texts[path].count(token)
            # The retrieval pass documents this defect at OI-108-055, so a
            # backticked mention of the token is discussion, not residue.
            if path == RETRIEVAL:
                occurrences -= texts[path].count("`" + token + "`")
            audit.check(
                occurrences == 0,
                f"{path.name}: unrendered template residue {token!r} in prose",
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
            "Result: PASS (documentation integrity only; selections are recorded at "
            "disposition register section 4, made at ELIGIBLE-PENDING-EVIDENCE under "
            "route B, and the observation pass remains unperformed)"
        )
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
