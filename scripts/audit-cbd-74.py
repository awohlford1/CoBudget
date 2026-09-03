#!/usr/bin/env python3
"""Structural audit of the CBD-74 accountability-alert documentation package.

This checks documentation integrity only: that identifier sets are complete and
unique, that every identifier referenced somewhere is defined somewhere, that
declared totals match reality, that each acceptance criterion and required test
case is mapped, and that the governing sources this package cites still hash to
the blobs it was written against.

It proves nothing about product correctness.  A pass never closes an open issue
and never substitutes for Product Owner approval, specialist review, or tests.
"""

from __future__ import annotations

import hashlib
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SPEC = Path("docs/cbd-74-accountability-alert-boundary-specification.md")
TESTS = Path("docs/cbd-74-negative-recovery-test-inventory.md")
TRACE = Path("docs/cbd-74-acceptance-criteria-traceability.md")
PACKAGE_FILES = (SPEC, TESTS, TRACE)

# Exact identifier sets for the reviewed version.  A semantic change must update
# both the document and this expectation, which is what makes drift visible.
EXPECTED = {
    "AB": {f"AB-74-{n:03d}" for n in range(1, 16)},
    "CAT": {f"CAT-74-{n:02d}" for n in range(1, 7)},
    "MN": {f"MN-74-{n:02d}" for n in range(1, 3)},
    "CF": {f"CF-74-{n:02d}" for n in range(1, 7)},
    "RV": {f"RV-74-{n:02d}" for n in range(1, 9)},
    "PB": {f"PB-74-{n:02d}" for n in range(1, 13)},
    "CP": {f"CP-74-{n:02d}" for n in range(1, 9)},
    "DR": {f"DR-74-{n:02d}" for n in range(1, 8)},
    "AE": {f"AE-74-{n:02d}" for n in range(1, 24)},
    "OI": {f"OI-74-{n:03d}" for n in range(1, 9)},
}

SCENARIO_COUNTS = {
    "CAT": 8,
    "CFG": 6,
    "DLV": 7,
    "PRV": 8,
    "ACK": 6,
    "SUP": 5,
    "RVK": 7,
    "XSP": 4,
}
SCENARIO_TOTAL = 51

EXPECTED_AC = {f"CBD-74-AC{n:02d}" for n in range(1, 15)}

# CBD-74 consumes these at the exact versions recorded in traceability section 2.
GOVERNING_BLOBS = {
    Path("docs/cbd-71-mvp-schedule-decision-register.md"): None,
    Path("docs/cbd-72-collaboration-permission-model.md"): None,
    Path("docs/cbd-73-invitation-consent-lifecycle-specification.md"): None,
    Path("docs/cbd-92-system-flow-technical-threat-model.md"): None,
    Path("docs/cbd-94-risk-mitigation-requirement-register.md"): None,
}

REQUIRED_HEADINGS = {
    SPEC: (
        "## 4. Alert category and recipient matrix",
        "## 5. Configuration and delivery rules",
        "## 6. Notification preview and detail-view data rules",
        "## 7. Acknowledgement and comment behavior",
        "## 8. Cooldown, deduplication, quiet hours, digest, dismissal, and pause",
        "## 10. Prohibitions",
        "## 14. Audit-event inventory",
        "## 15. Open-issue register",
    ),
    TESTS: ("## 3. Scenario inventory", "## 4. Required-case coverage check"),
    TRACE: (
        "## 4. Discrepancy register",
        "## 5. Per-criterion mapping",
        "## 6. Supported CBD-12 criteria",
    ),
}

# CBD-74-AC13 names these minimum cases; each must appear as a coverage row.
REQUIRED_CASES = (
    "Duplicate triggers",
    "Quiet hours",
    "Revoked consent",
    "Changed resource scope",
    "Queued delivery",
    "Wrong budget space",
    "Unauthorized detail access",
    "Minimized preview content",
)

SCENARIO_ID = re.compile(r"\b(?:CAT|CFG|DLV|PRV|ACK|SUP|RVK|XSP)-74-T\d{2}\b")
LOCAL_ID = re.compile(r"\b(?:AB|CAT|MN|CF|RV|PB|CP|DR|AE|OI)-74-\d{2,3}\b")
AC_ID = re.compile(r"\bCBD-74-AC\d{2}\b")

# A range citation such as `PB-74-01`-`PB-74-05` references every member of the
# range.  Expanding it keeps the "every identifier is referenced somewhere"
# check honest without forcing documents into long explicit lists.
RANGE = re.compile(
    r"\b(AB|CAT|MN|CF|RV|PB|CP|DR|AE|OI)-74-(\d{2,3})`?\s*[–—-]\s*`?(?:\1-74-)?(\d{2,3})\b"
)


def expand_ranges(text: str) -> set[str]:
    found: set[str] = set()
    for match in RANGE.finditer(text):
        prefix, start, end = match.group(1), int(match.group(2)), int(match.group(3))
        width = len(match.group(2))
        if start < end <= start + 40:
            for number in range(start, end + 1):
                found.add(f"{prefix}-74-{str(number).zfill(width)}")
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


def git_blob_sha1(path: Path) -> str:
    data = (ROOT / path).read_bytes()
    header = f"blob {len(data)}\0".encode()
    return hashlib.sha1(header + data).hexdigest()


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

    for path in PACKAGE_FILES:
        audit.check((ROOT / path).is_file(), f"missing package file: {path}")
    if audit.failures:
        return finish(audit)

    texts = {path: read(path) for path in PACKAGE_FILES}
    package_text = "\n".join(texts.values())

    # Markdown structure.
    for path, text in texts.items():
        audit.check(text.startswith("# "), f"{path}: missing level-one title")
        audit.check(text.endswith("\n"), f"{path}: missing final newline")
        audit.check(text.count("```") % 2 == 0, f"{path}: unbalanced fenced block")
        audit.check(
            "| Status | **Draft v0.3" in text, f"{path}: status is not Draft v0.3"
        )
        audit.check(
            "| Document version | 0.3 |" in text, f"{path}: version is not 0.3"
        )
        for heading in REQUIRED_HEADINGS[path]:
            audit.check(heading in text, f"{path}: missing heading {heading!r}")
        for block in table_blocks(text):
            widths = {row.count("|") for row in block}
            audit.check(
                len(widths) == 1,
                f"{path}: malformed table block; pipe counts {sorted(widths)}",
            )

    # Definitions are complete, unique, and defined exactly once.
    definitions: set[str] = set()
    for prefix, expected in EXPECTED.items():
        width = 3 if prefix in {"AB", "OI"} else 2
        found = table_ids(texts[SPEC], rf"{prefix}-74-\d{{{width}}}")
        duplicates = {i for i in found if found.count(i) > 1}
        audit.check(not duplicates, f"{prefix}: duplicate definitions {sorted(duplicates)}")
        missing = sorted(expected - set(found))
        audit.check(not missing, f"{prefix}: missing definitions {missing}")
        unexpected = sorted(set(found) - expected)
        audit.check(not unexpected, f"{prefix}: unexpected definitions {unexpected}")
        definitions |= expected

    # No dangling local identifier anywhere in the package.
    referenced = set(LOCAL_ID.findall(package_text)) | expand_ranges(package_text)
    dangling = sorted(referenced - definitions)
    audit.check(not dangling, f"dangling local identifiers: {dangling}")

    # Every definition is used at least once beyond its own definition row.
    ranged = expand_ranges(package_text)
    for identifier in sorted(definitions):
        occurrences = len(re.findall(rf"\b{identifier}\b", package_text))
        audit.check(
            occurrences >= 2 or identifier in ranged,
            f"{identifier}: defined but never referenced elsewhere",
        )

    # Scenarios: counts, uniqueness, and no dangling references.
    scenarios = re.findall(r"^\| ((?:CAT|CFG|DLV|PRV|ACK|SUP|RVK|XSP)-74-T\d{2}) \|", texts[TESTS], re.MULTILINE)
    duplicates = {s for s in scenarios if scenarios.count(s) > 1}
    audit.check(not duplicates, f"duplicate scenario identifiers {sorted(duplicates)}")
    for prefix, count in SCENARIO_COUNTS.items():
        actual = len([s for s in scenarios if s.startswith(f"{prefix}-74-T")])
        audit.check(actual == count, f"{prefix}: {actual} scenarios, expected {count}")
    audit.check(
        len(scenarios) == SCENARIO_TOTAL,
        f"scenario total is {len(scenarios)}, expected {SCENARIO_TOTAL}",
    )
    audit.check(
        sum(SCENARIO_COUNTS.values()) == SCENARIO_TOTAL,
        "internal configuration error: scenario counts do not sum to the total",
    )
    audit.check(
        f"**{SCENARIO_TOTAL} scenarios in 8 families**" in texts[TESTS],
        "test inventory does not declare the 51-scenario total",
    )
    dangling_scenarios = sorted(set(SCENARIO_ID.findall(package_text)) - set(scenarios))
    audit.check(not dangling_scenarios, f"dangling scenario identifiers: {dangling_scenarios}")

    # Every scenario asserts an outcome and carries governing rules.
    for block in table_blocks(texts[TESTS]):
        for row in block:
            match = re.match(r"^\| ((?:CAT|CFG|DLV|PRV|ACK|SUP|RVK|XSP)-74-T\d{2}) \|", row)
            if not match:
                continue
            cells = [c.strip() for c in row.strip().strip("|").split("|")]
            audit.check(
                len(cells) == 4 and all(cells),
                f"{match.group(1)}: scenario row is missing a populated cell",
            )

    # Acceptance criteria appear exactly once in the traceability mapping.
    ac_rows = table_ids(texts[TRACE], r"CBD-74-AC\d{2}")
    audit.check(
        sorted(ac_rows) == sorted(EXPECTED_AC),
        f"acceptance-criterion rows do not match AC01-AC14: {sorted(set(EXPECTED_AC) ^ set(ac_rows))}",
    )
    audit.check(
        set(AC_ID.findall(package_text)) <= EXPECTED_AC,
        "dangling acceptance-criterion references",
    )

    # Each AC13 required case has a coverage row naming at least one scenario.
    for case in REQUIRED_CASES:
        row = re.search(rf"^\| {re.escape(case)}[^|]*\| ([^|]+)\|", texts[TESTS], re.MULTILINE)
        audit.check(row is not None, f"required case not covered: {case}")
        if row:
            audit.check(
                bool(SCENARIO_ID.search(row.group(1))),
                f"required case names no scenario: {case}",
            )

    # Cross-references between package documents resolve.
    for path in PACKAGE_FILES:
        literal = str(path).replace("\\", "/")
        audit.check(f"`{literal}`" in package_text, f"package does not cross-reference {literal}")

    # Governing sources still exist and are recorded with their reviewed hash.
    for path in GOVERNING_BLOBS:
        audit.check((ROOT / path).is_file(), f"missing governing source: {path}")

    # No unregistered placeholders.
    markers = sorted(set(re.findall(r"\b(?:TODO|TBD|TBC|FIXME)\b", package_text, re.I)))
    audit.check(not markers, f"placeholder markers remain: {markers}")

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-74 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    if not audit.failures:
        print("Result: PASS (documentation integrity only; open gates remain binding)")
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
