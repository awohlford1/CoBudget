#!/usr/bin/env python3
"""Repeatable mechanical audit for the CBD-73 documentation package.

This script verifies document structure, stable identifiers, declared totals,
and direct cross-references across the four CBD-73 package documents.  It does
not decide whether a product rule is safe, complete, approved, or correctly
implemented; those semantic judgments belong in the independent review record.
"""

from __future__ import annotations

import re
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

SPEC = Path("docs/cbd-73-invitation-consent-lifecycle-specification.md")
MESSAGES = Path("docs/cbd-73-customer-message-inventory.md")
TESTS = Path("docs/cbd-73-negative-recovery-test-inventory.md")
TRACE = Path("docs/cbd-73-acceptance-criteria-traceability.md")
REVIEW = Path("docs/cbd-73-exhaustive-review-findings.md")
PACKAGE_FILES = (SPEC, MESSAGES, TESTS, TRACE)

EXPECTED_DEFINITIONS: dict[str, set[str]] = {
    "IC": {f"IC-73-{number:03d}" for number in range(1, 15)},
    "TR": {f"TR-73-{number:02d}" for number in range(1, 15)},
    "RC": {f"RC-73-{number:02d}" for number in range(1, 15)},
    "DR": {f"DR-73-{number:02d}" for number in range(1, 10)},
    "AE": {f"AE-73-{number:02d}" for number in range(1, 27)},
    "MSG": {
        *(f"MSG-73-{number:03d}" for number in range(1, 7)),
        *(f"MSG-73-{number:03d}" for number in range(10, 22)),
        *(f"MSG-73-{number:03d}" for number in range(30, 37)),
        *(f"MSG-73-{number:03d}" for number in range(40, 43)),
    },
}

SCENARIO_COUNTS = {
    "INV": 9,
    "VER": 6,
    "CNS": 5,
    "DCL": 9,
    "DST": 5,
    "CHG": 7,
    "RVK": 12,
    "TRF": 4,
}

REQUIRED_HEADINGS = {
    SPEC: (
        "## 3. Governing invariants",
        "## 4. Invitation lifecycle state model",
        "## 6. Consent policy",
        "## 10. Role and resource-scope changes after acceptance",
        "## 11. Revocation and removal",
        "## 12. Primary ownership transfer consent ceremony",
        "## 13. Invitation and consent data requirements",
        "## 14. Audit-event inventory",
        "## 15. Execution-level decisions and gated work",
    ),
    MESSAGES: (
        "## 2. Cross-cutting semantic rules",
        "## 3. Message inventory",
        "## 5. Evidence gates",
    ),
    TESTS: (
        "## 2. Scenario families",
        "## 3. Scenario inventory",
        "## 4. Required-case coverage check",
    ),
    TRACE: (
        "## 2. Deliverable traceability",
        "## 3. Per-criterion acceptance-criteria mapping",
        "## 6. Discrepancy and decision register",
        "## 8. Review gates",
        "## 9. Work remaining before approval",
    ),
}

LOCAL_ID = re.compile(r"\b(?:IC|TR|RC|DR|AE|MSG)-73-\d{2,3}\b")
SCENARIO_ID = re.compile(r"\b(?:INV|VER|CNS|DCL|DST|CHG|RVK|TRF)-\d{2}\b")
AC_ID = re.compile(r"\bCBD-73-AC\d{2}\b")


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


def table_ids(text: str, pattern: str) -> list[str]:
    return re.findall(rf"^\|\s*({pattern})\s*\|", text, flags=re.MULTILINE)


def report_set_difference(
    audit: Audit, label: str, actual: set[str], expected: set[str]
) -> None:
    missing = sorted(expected - actual)
    unexpected = sorted(actual - expected)
    audit.check(not missing, f"{label}: missing definitions: {', '.join(missing)}")
    audit.check(
        not unexpected,
        f"{label}: unexpected definitions: {', '.join(unexpected)}",
    )


def check_markdown_structure(audit: Audit, path: Path, text: str) -> None:
    audit.check(text.startswith("# "), f"{path}: missing level-one title")
    audit.check(
        len(re.findall(r"^# ", text, flags=re.MULTILINE)) == 1,
        f"{path}: expected exactly one level-one title",
    )
    audit.check(
        text.count("```") % 2 == 0,
        f"{path}: unbalanced fenced code block",
    )
    audit.check(
        "| Status | **Draft v0.1" in text,
        f"{path}: package status is not Draft v0.1",
    )
    audit.check(
        "| Document version | 0.1 |" in text,
        f"{path}: document version is not 0.1",
    )
    for heading in REQUIRED_HEADINGS[path]:
        audit.check(heading in text, f"{path}: missing heading {heading!r}")


def main() -> int:
    audit = Audit()
    texts: dict[Path, str] = {}

    for path in PACKAGE_FILES:
        audit.check((ROOT / path).is_file(), f"missing package file: {path}")
        if not (ROOT / path).is_file():
            continue
        texts[path] = read(path)
        check_markdown_structure(audit, path, texts[path])

    if len(texts) != len(PACKAGE_FILES):
        return finish(audit)

    definition_sources = {
        "IC": (SPEC, r"IC-73-\d{3}"),
        "TR": (SPEC, r"TR-73-\d{2}"),
        "RC": (SPEC, r"RC-73-\d{2}"),
        "DR": (SPEC, r"DR-73-\d{2}"),
        "AE": (SPEC, r"AE-73-\d{2}"),
        "MSG": (MESSAGES, r"MSG-73-\d{3}"),
    }

    all_definitions: set[str] = set()
    for family, (path, pattern) in definition_sources.items():
        ids = table_ids(texts[path], pattern)
        duplicates = sorted(identifier for identifier, count in Counter(ids).items() if count > 1)
        audit.check(
            not duplicates,
            f"{path}: duplicate {family} definitions: {', '.join(duplicates)}",
        )
        actual = set(ids)
        report_set_difference(audit, family, actual, EXPECTED_DEFINITIONS[family])
        all_definitions.update(actual)

    scenario_definitions: set[str] = set()
    for family, count in SCENARIO_COUNTS.items():
        ids = table_ids(texts[TESTS], rf"{family}-\d{{2}}")
        expected = {f"{family}-{number:02d}" for number in range(1, count + 1)}
        duplicates = sorted(identifier for identifier, value in Counter(ids).items() if value > 1)
        audit.check(
            not duplicates,
            f"{TESTS}: duplicate {family} scenarios: {', '.join(duplicates)}",
        )
        report_set_difference(audit, family, set(ids), expected)
        scenario_definitions.update(ids)

    ac_rows = table_ids(texts[TRACE], r"CBD-73-AC\d{2}")
    expected_ac = {f"CBD-73-AC{number:02d}" for number in range(1, 18)}
    duplicates = sorted(identifier for identifier, count in Counter(ac_rows).items() if count > 1)
    audit.check(
        not duplicates,
        f"{TRACE}: duplicate acceptance-criterion rows: {', '.join(duplicates)}",
    )
    report_set_difference(audit, "CBD-73 AC", set(ac_rows), expected_ac)

    audit.check((ROOT / REVIEW).is_file(), f"missing independent review file: {REVIEW}")
    if (ROOT / REVIEW).is_file():
        review_text = read(REVIEW)
        review_rows = table_ids(review_text, r"RV-73-\d{3}")
        expected_review = {f"RV-73-{number:03d}" for number in range(1, 28)}
        review_duplicates = sorted(
            identifier
            for identifier, count in Counter(review_rows).items()
            if count > 1
        )
        audit.check(
            not review_duplicates,
            f"{REVIEW}: duplicate review rows: {', '.join(review_duplicates)}",
        )
        report_set_difference(
            audit, "CBD-73 independent review", set(review_rows), expected_review
        )

    package_text = "\n".join(texts[path] for path in PACKAGE_FILES)
    direct_local_references = set(LOCAL_ID.findall(package_text))
    direct_scenario_references = set(SCENARIO_ID.findall(package_text))
    direct_ac_references = set(AC_ID.findall(package_text))

    audit.check(
        direct_local_references <= all_definitions,
        "dangling local identifiers: "
        + ", ".join(sorted(direct_local_references - all_definitions)),
    )
    audit.check(
        direct_scenario_references <= scenario_definitions,
        "dangling scenario identifiers: "
        + ", ".join(sorted(direct_scenario_references - scenario_definitions)),
    )
    audit.check(
        direct_ac_references <= expected_ac,
        "dangling CBD-73 acceptance-criterion identifiers: "
        + ", ".join(sorted(direct_ac_references - expected_ac)),
    )

    audit.check(
        len(EXPECTED_DEFINITIONS["MSG"]) == 28,
        "internal audit configuration error: expected message total is not 28",
    )
    audit.check(
        "28 rows" in texts[TRACE] and "28 message definitions" in texts[MESSAGES],
        "declared 28-message total is missing or inconsistent",
    )
    scenario_total = sum(SCENARIO_COUNTS.values())
    audit.check(scenario_total == 57, "internal audit configuration error: scenario total")
    audit.check(
        "57 scenarios" in texts[TRACE]
        and "57 scenarios" in texts[TESTS]
        and "eight scenario families" in texts[TESTS],
        "declared 57-scenario/eight-family total is missing or inconsistent",
    )

    for path in (SPEC, MESSAGES, TESTS):
        literal = str(path).replace("\\", "/")
        audit.check(
            f"`{literal}`" in package_text,
            f"package does not cross-reference {literal}",
        )

    # The state diagram currently abbreviates transition identifiers to TR-01
    # style even though the stable IDs are TR-73-01 style. This is recorded as
    # a warning because it does not create a dangling full identifier, but it
    # can make generated diagrams and reviews harder to reconcile.
    abbreviated = sorted(set(re.findall(r"\bTR-\d{2}(?!-)", texts[SPEC])))
    audit.warn(
        not abbreviated,
        "state diagram uses abbreviated transition labels: " + ", ".join(abbreviated),
    )

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-73 mechanical audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    print(f"Warnings: {len(audit.warnings)}")
    for warning in audit.warnings:
        print(f"  WARN: {warning}")
    if not audit.failures:
        print("Result: PASS (mechanical structure only; see the independent review record)")
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
