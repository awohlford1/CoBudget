#!/usr/bin/env python3
"""Structural audit of the CBD-82 financial-profile and account-ownership package.

Checks that identifier sets are complete and unique, that every identifier
referenced somewhere is defined somewhere, that declared totals match reality,
that each acceptance criterion is mapped, and that every governing CA-92-*
contract this model claims to implement actually exists in CBD-92.

That last check is the one worth having.  This package's whole claim is that it
makes CA-92-001 through CA-92-012 implementable without changing them, so a
citation that resolves to nothing is the failure that matters most.

It proves nothing about product correctness.  A pass closes no open issue and
substitutes for no Product Owner approval, provider evidence, or test.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

MODEL = Path("docs/cbd-82-financial-profile-and-account-ownership-model.md")
SCENARIOS = Path("docs/cbd-82-account-lifecycle-scenario-catalog.md")
TRACE = Path("docs/cbd-82-acceptance-criteria-traceability.md")
PACKAGE_FILES = (MODEL, SCENARIOS, TRACE)

SOURCE = Path("docs/cbd-92-system-flow-technical-threat-model.md")

DOCUMENT_VERSION = "0.1"

EXPECTED = {
    "EN": {f"EN-82-{n:02d}" for n in range(1, 13)},
    "CD": {f"CD-82-{n:02d}" for n in range(1, 13)},
    "AU": {f"AU-82-{n:02d}" for n in range(1, 11)},
    "LK": {f"LK-82-{n:02d}" for n in range(1, 8)},
    "AS": {f"AS-82-{n:02d}" for n in range(1, 9)},
    "OC": {f"OC-82-{n:02d}" for n in range(1, 8)},
    "LC": {f"LC-82-{n:02d}" for n in range(1, 5)},
    "PB": {f"PB-82-{n:02d}" for n in range(1, 11)},
    "DR": {f"DR-82-{n:02d}" for n in range(1, 5)},
    "AE": {f"AE-82-{n:02d}" for n in range(1, 4)},
    "OI": {f"OI-82-{n:03d}" for n in range(1, 5)},
}

SCENARIO_COUNTS = {"LNK": 7, "AUTH": 6, "CANON": 6, "JOINT": 8, "LIFE": 8, "ISO": 7, "DEL": 4}
SCENARIO_TOTAL = 46

EXPECTED_AC = {f"CBD-82-AC{n:02d}" for n in range(1, 13)}

# Every CA-92-* contract this package claims to implement must exist upstream.
EXPECTED_CA = {f"CA-92-{n:03d}" for n in range(1, 13)}

REQUIRED_HEADINGS = {
    MODEL: (
        "## 3. Logical entities",
        "## 4. Cardinality and uniqueness",
        "## 5. The authority matrix",
        "## 6. The account-to-space link",
        "## 7. Canonicalization and joint projection",
        "## 8. Lifecycle and the outcome matrix",
        "## 9. Prohibitions",
        "## 12. Open issues",
        "## 13. What this closes, and what it does not",
    ),
    SCENARIOS: ("## 3. Scenario inventory", "## 4. Family totals"),
    TRACE: (
        "## 3. Per-criterion mapping",
        "## 4. Discrepancy register",
        "## 6. Evidence gates",
    ),
}

LOCAL_ID = re.compile(r"\b(?:EN|CD|AU|LK|AS|OC|LC|PB|DR|AE|OI)-82-\d{2,3}\b")
SCENARIO_ID = re.compile(r"\b(?:LNK|AUTH|CANON|JOINT|LIFE|ISO|DEL)-82-T\d{2}\b")
AC_ID = re.compile(r"\bCBD-82-AC\d{2}\b")
CA_ID = re.compile(r"\bCA-92-\d{3}\b")

RANGE = re.compile(
    r"\b(EN|CD|AU|LK|AS|OC|LC|PB|DR|AE|OI)-82-(\d{2,3})`?\s*[–—-]\s*`?(?:\1-82-)?(\d{2,3})\b"
)
SCENARIO_RANGE = re.compile(
    r"\b(LNK|AUTH|CANON|JOINT|LIFE|ISO|DEL)-82-T(\d{2})`?\s*[–—-]\s*`?(?:\1-82-)?T?(\d{2})\b"
)


def expand_ranges(text: str) -> set[str]:
    found: set[str] = set()
    for match in RANGE.finditer(text):
        prefix, start, end = match.group(1), int(match.group(2)), int(match.group(3))
        width = len(match.group(2))
        if start < end <= start + 40:
            for number in range(start, end + 1):
                found.add(f"{prefix}-82-{str(number).zfill(width)}")
    for match in SCENARIO_RANGE.finditer(text):
        prefix, start, end = match.group(1), int(match.group(2)), int(match.group(3))
        if start < end <= start + 40:
            for number in range(start, end + 1):
                found.add(f"{prefix}-82-T{number:02d}")
    return found


class Audit:
    def __init__(self) -> None:
        self.checks = 0
        self.failures: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        self.checks += 1
        if not condition:
            self.failures.append(message)


def read(path: Path) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def table_ids(text: str, pattern: str) -> list[str]:
    return re.findall(rf"^\| (?:`)?({pattern})(?:`)? \|", text, re.MULTILINE)


def table_blocks(text: str) -> list[list[str]]:
    blocks, current = [], []
    for line in text.splitlines():
        if line.startswith("|"):
            current.append(line)
        elif current:
            blocks.append(current)
            current = []
    if current:
        blocks.append(current)
    return blocks


def main() -> int:
    audit = Audit()

    for path in PACKAGE_FILES + (SOURCE,):
        audit.check((ROOT / path).is_file(), f"missing file: {path}")
    if audit.failures:
        return finish(audit)

    texts = {path: read(path) for path in PACKAGE_FILES}
    package_text = "\n".join(texts.values())
    source_text = read(SOURCE)

    for path, text in texts.items():
        audit.check(text.startswith("# "), f"{path}: missing level-one title")
        audit.check(text.endswith("\n"), f"{path}: missing final newline")
        audit.check(text.count("```") % 2 == 0, f"{path}: unbalanced fenced block")
        audit.check(
            f"| Document version | {DOCUMENT_VERSION} |" in text,
            f"{path}: version is not {DOCUMENT_VERSION}",
        )
        audit.check(
            f"| Status | **Draft v{DOCUMENT_VERSION}" in text,
            f"{path}: status line is not Draft v{DOCUMENT_VERSION}",
        )
        for heading in REQUIRED_HEADINGS[path]:
            audit.check(heading in text, f"{path}: missing heading {heading!r}")
        for block in table_blocks(text):
            widths = {row.count("|") for row in block}
            audit.check(
                len(widths) == 1,
                f"{path}: malformed table block; pipe counts {sorted(widths)}",
            )

    # Registers are defined once each, in the model.
    for prefix, expected in EXPECTED.items():
        width = 3 if prefix == "OI" else 2
        found = table_ids(texts[MODEL], rf"{prefix}-82-\d{{{width}}}")
        duplicates = {i for i in found if found.count(i) > 1}
        audit.check(not duplicates, f"{prefix}: duplicate definitions {sorted(duplicates)}")
        audit.check(
            not sorted(expected - set(found)), f"{prefix}: missing {sorted(expected - set(found))}"
        )
        audit.check(
            not sorted(set(found) - expected),
            f"{prefix}: unexpected {sorted(set(found) - expected)}",
        )

    defined = set().union(*EXPECTED.values())
    referenced = set(LOCAL_ID.findall(package_text)) | {
        i for i in expand_ranges(package_text) if not i.count("-T")
    }
    audit.check(
        not sorted(referenced - defined), f"dangling references: {sorted(referenced - defined)}"
    )

    # Scenarios: defined once, counted correctly, and every one cites a rule.
    scenarios = table_ids(texts[SCENARIOS], r"(?:LNK|AUTH|CANON|JOINT|LIFE|ISO|DEL)-82-T\d{2}")
    audit.check(
        len(scenarios) == SCENARIO_TOTAL,
        f"scenario count is {len(scenarios)}, declared {SCENARIO_TOTAL}",
    )
    audit.check(len(set(scenarios)) == len(scenarios), "duplicate scenario identifiers")
    audit.check(
        f"**{SCENARIO_TOTAL} scenarios**" in texts[SCENARIOS],
        f"the coverage rule does not state {SCENARIO_TOTAL} scenarios",
    )
    for family, count in SCENARIO_COUNTS.items():
        actual = len([s for s in scenarios if s.startswith(f"{family}-82-T")])
        audit.check(actual == count, f"{family}: {actual} scenarios, declared {count}")
        audit.check(
            f"| {family} | {count} |" in texts[SCENARIOS],
            f"{family}: the totals table does not state {count}",
        )
    for block in table_blocks(texts[SCENARIOS]):
        for row in block:
            match = re.match(r"^\| ((?:LNK|AUTH|CANON|JOINT|LIFE|ISO|DEL)-82-T\d{2}) \|", row)
            if not match:
                continue
            cells = [c.strip() for c in row.strip().strip("|").split("|")]
            audit.check(
                len(cells) == 4 and all(cells),
                f"{match.group(1)}: scenario row is missing a populated cell",
            )

    ac_rows = table_ids(texts[TRACE], r"CBD-82-AC\d{2}")
    audit.check(
        sorted(ac_rows) == sorted(EXPECTED_AC),
        f"criterion rows do not match AC01-AC12: {sorted(set(EXPECTED_AC) ^ set(ac_rows))}",
    )
    audit.check(set(AC_ID.findall(package_text)) <= EXPECTED_AC, "dangling criterion references")

    # Every CA-92-* contract cited here exists upstream, and this package cites
    # the whole closed set rather than a convenient subset of it.
    cited = set(CA_ID.findall(package_text))
    audit.check(
        cited <= EXPECTED_CA, f"cites CA-92 identifiers outside the closed set: {sorted(cited - EXPECTED_CA)}"
    )
    for contract in sorted(EXPECTED_CA):
        audit.check(
            f"| {contract} |" in source_text,
            f"{contract} is cited here but not defined in {SOURCE}",
        )

    for path in PACKAGE_FILES:
        literal = str(path).replace("\\", "/")
        audit.check(f"`{literal}`" in package_text, f"package does not cross-reference {literal}")

    markers = sorted(set(re.findall(r"\b(?:TODO|TBD|TBC|FIXME)\b", package_text, re.I)))
    audit.check(not markers, f"placeholder markers remain: {markers}")

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-82 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    if not audit.failures:
        print("Result: PASS (documentation integrity only; open gates remain binding)")
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
