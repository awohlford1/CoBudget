#!/usr/bin/env python3
"""Structural audit of the CBD-75 role-terminology and copy-standard package.

Two documents and two machine-readable registers have to agree, and the
interesting failure is not a missing file -- it is the day someone edits a rule
in the JSON and leaves the table in the document saying the old thing, or adds
approved copy to the JSON that the document never shows a reviewer. So the
central check here is bidirectional: every identifier and every approved string
exists on both sides, spelled the same way.

What this does not prove: that a role description matches the permission it
describes. That is read against CBD-72 by a person, and this package contains a
worked example of the gap -- RD-75-04 passed every structural check while
overclaiming the Viewer export limit. The traceability record keeps the count.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STANDARD = Path("docs/cbd-75-role-terminology-and-copy-standard.md")
TRACE = Path("docs/cbd-75-acceptance-criteria-traceability.md")
MARKDOWN_FILES = (STANDARD, TRACE)

REGISTER = Path("docs/cbd-75-prohibited-language-register.json")
COPY = Path("docs/cbd-75-approved-copy.json")
JSON_FILES = (REGISTER, COPY)

CHECKS = (
    Path("scripts/copy-language.mjs"),
    Path("scripts/brand-foundation.mjs"),
    Path("scripts/check-copy-language.mjs"),
    Path("scripts/check-public-pages.mjs"),
)

DOCUMENT_VERSION = "1.0"

# Exact identifier sets for the reviewed version. A semantic change must update
# both the document and this expectation, which is what makes drift visible.
EXPECTED = {
    "RD": {f"RD-75-{n:02d}" for n in range(1, 7)},
    "RT": {f"RT-75-{n:02d}" for n in range(1, 7)},
    "CS": {f"CS-75-{n:02d}" for n in range(1, 13)},
    "PT": {f"PT-75-{n:02d}" for n in range(1, 10)},
    "PL": {f"PL-75-{n:02d}" for n in range(1, 15)},
    "CK": {f"CK-75-{n:02d}" for n in range(1, 11)},
    "VP": {f"VP-75-{n:02d}" for n in range(1, 8)},
    "OI": {f"OI-75-{n:03d}" for n in range(1, 9)},
}

EXPECTED_AC = {f"CBD-75-AC{n:02d}" for n in range(1, 11)}

EXPECTED_ROLES = (
    ("RD-75-01", "Primary Owner", "primary_owner"),
    ("RD-75-02", "Co-owner", "co_owner"),
    ("RD-75-03", "Collaborator", "collaborator"),
    ("RD-75-04", "Viewer", "viewer"),
    ("RD-75-05", "Accountability Partner", "accountability_partner"),
)

REQUIRED_HEADINGS = {
    STANDARD: (
        "## 3. The role vocabulary",
        "### 3.1 Canonical role register",
        "### 3.3 Terms that are not roles",
        "## 4. Product naming",
        "### 5.1 Cross-cutting requirements",
        "### 5.2 Reusable message patterns",
        "## 6. Prohibited and misleading language",
        "### 6.2 The rules",
        "### 6.3 Recorded exceptions",
        "## 7. Consistency checklist",
        "## 8. Validation plan and evidence",
        "## 9. Open-issue register",
    ),
    TRACE: (
        "## 4. Discrepancy register",
        "## 5. Per-criterion mapping",
        "## 6. Supported CBD-12 criteria",
        "## 7. Evidence gates",
    ),
}

LOCAL_ID = re.compile(r"\b(?:RD|RT|CS|PT|PL|CK|VP|OI)-75-\d{2,3}\b")
AC_ID = re.compile(r"\bCBD-75-AC\d{2}\b")

RANGE = re.compile(
    r"\b(RD|RT|CS|PT|PL|CK|VP|OI)-75-(\d{2,3})`?\s*[–—-]\s*`?(?:\1-75-)?(\d{2,3})\b"
)


def expand_ranges(text: str) -> set[str]:
    """`PL-75-01`-`PL-75-05` references every member of the range."""
    found: set[str] = set()
    for match in RANGE.finditer(text):
        prefix, start, end = match.group(1), int(match.group(2)), int(match.group(3))
        width = len(match.group(2))
        if start < end <= start + 40:
            for number in range(start, end + 1):
                found.add(f"{prefix}-75-{str(number).zfill(width)}")
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

    for path in MARKDOWN_FILES + JSON_FILES + CHECKS:
        audit.check((ROOT / path).is_file(), f"missing package file: {path}")
    if audit.failures:
        return finish(audit)

    texts = {path: read(path) for path in MARKDOWN_FILES}
    package_text = "\n".join(texts.values())
    register = json.loads(read(REGISTER))
    copy = json.loads(read(COPY))

    # Markdown structure.
    for path, text in texts.items():
        audit.check(text.startswith("# "), f"{path}: missing level-one title")
        audit.check(text.endswith("\n"), f"{path}: missing final newline")
        audit.check(text.count("```") % 2 == 0, f"{path}: unbalanced fenced block")
        audit.check(
            f"| Document version | {DOCUMENT_VERSION} |" in text,
            f"{path}: version is not {DOCUMENT_VERSION}",
        )
        audit.check(
            # Anchored on the Status field, not the bare string.  Unanchored,
            # this matched the "**Approved v1.0**" cell in the revision table
            # and so passed while the status line said Draft.
            f"| Status | **Approved v{DOCUMENT_VERSION}" in text,
            f"{path}: status line is not Approved v{DOCUMENT_VERSION}",
        )
        for heading in REQUIRED_HEADINGS[path]:
            audit.check(heading in text, f"{path}: missing heading {heading!r}")
        for block in table_blocks(text):
            widths = {row.count("|") for row in block}
            audit.check(
                len(widths) == 1,
                f"{path}: malformed table block; pipe counts {sorted(widths)}",
            )

    # Every register is defined once, in a table, in the standard.
    for prefix, expected in EXPECTED.items():
        width = 3 if prefix == "OI" else 2
        found = table_ids(texts[STANDARD], rf"{prefix}-75-\d{{{width}}}")
        duplicates = {i for i in found if found.count(i) > 1}
        audit.check(not duplicates, f"{prefix}: duplicate definitions {sorted(duplicates)}")
        audit.check(not sorted(expected - set(found)), f"{prefix}: missing {sorted(expected - set(found))}")
        audit.check(
            not sorted(set(found) - expected), f"{prefix}: unexpected {sorted(set(found) - expected)}"
        )

    # No identifier is referenced anywhere in the package without a definition.
    defined = set().union(*EXPECTED.values())
    referenced = set(LOCAL_ID.findall(package_text)) | expand_ranges(package_text)
    audit.check(
        not sorted(referenced - defined), f"dangling references: {sorted(referenced - defined)}"
    )

    # Acceptance criteria appear exactly once each in the traceability mapping.
    ac_rows = table_ids(texts[TRACE], r"CBD-75-AC\d{2}")
    audit.check(
        sorted(ac_rows) == sorted(EXPECTED_AC),
        f"criterion rows do not match AC01-AC10: {sorted(set(EXPECTED_AC) ^ set(ac_rows))}",
    )
    audit.check(
        set(AC_ID.findall(package_text)) <= EXPECTED_AC, "dangling criterion references"
    )

    # --- The registers and the document agree, in both directions. ---------

    for path, payload in ((REGISTER, register), (COPY, copy)):
        audit.check(payload.get("package") == "CBD-75", f"{path}: package is not CBD-75")
        audit.check(
            payload.get("document") == str(STANDARD).replace("\\", "/"),
            f"{path}: does not name the standard as its authority",
        )
        audit.check(
            payload.get("version") == DOCUMENT_VERSION,
            f"{path}: version is not {DOCUMENT_VERSION}",
        )

    rule_ids = [rule["id"] for rule in register["rules"]]
    audit.check(
        sorted(rule_ids) == sorted(EXPECTED["PL"]),
        f"register rules do not match the PL set: {sorted(set(rule_ids) ^ EXPECTED['PL'])}",
    )
    audit.check(len(set(rule_ids)) == len(rule_ids), "register has duplicate rule ids")

    for rule in register["rules"]:
        for field in ("title", "scope", "why", "instead", "sources", "patterns", "example"):
            audit.check(bool(rule.get(field)), f"{rule['id']}: missing {field}")
        audit.check(
            rule.get("scope") in register["scopes"],
            f"{rule['id']}: scope {rule.get('scope')!r} is not one of {sorted(register['scopes'])}",
        )
        audit.check(
            bool(rule.get("negatedExample")) == bool(rule.get("negatable")),
            f"{rule['id']}: negatedExample must be present exactly when negatable is true",
        )
        # A rule the document does not show a reviewer is a rule nobody agreed to.
        audit.check(
            f"`{rule['id']}` | {rule['title']}" in texts[STANDARD],
            f"{rule['id']}: the standard's section 6.2 does not carry the title {rule['title']!r}",
        )
        for pattern in rule["patterns"]:
            try:
                re.compile(pattern)
            except re.error as error:
                audit.failures.append(f"{rule['id']}: pattern does not compile: {error}")
            audit.checks += 1

    for exception in register["knownExceptions"]:
        for field in ("where", "rule", "phrase", "kind", "recorded", "why"):
            audit.check(bool(exception.get(field)), f"exception in {exception.get('where')}: missing {field}")
        audit.check(
            exception["rule"] in EXPECTED["PL"], f"exception names unknown rule {exception['rule']}"
        )
        audit.check(
            exception["kind"] in {"copy-defect", "rule-limit"},
            f"exception kind {exception['kind']!r} is neither copy-defect nor rule-limit",
        )
        # Section 6.3 must show the reviewer every exception the build honours.
        audit.check(
            f"| {exception['phrase']} |" in texts[STANDARD],
            f"exception phrase {exception['phrase']!r} is not listed in section 6.3",
        )

    # Approved copy: the roles, their identifiers, and every string the document
    # must render verbatim so a reviewer approves what the build enforces.
    audit.check(
        tuple((role["id"], role["name"], role["enum"]) for role in copy["roles"]) == EXPECTED_ROLES,
        "approved copy roles do not match the reviewed five roles, in order",
    )
    for role in copy["roles"]:
        audit.check(
            role["enum"] == role["name"].lower().replace("-", "_").replace(" ", "_"),
            f"{role['id']}: enum {role['enum']!r} is not the snake_case form of {role['name']!r}",
        )
        for field in ("short", "long"):
            audit.check(
                role[field] in texts[STANDARD],
                f"{role['id']}: the {field} description is not rendered verbatim in the standard",
            )
        audit.check(
            f"| `{role['id']}` | {role['name']} | {role['plural']} | `{role['enum']}` |"
            in texts[STANDARD],
            f"{role['id']}: the section 3.1 row does not match the approved name, plural, and enum",
        )
    for item in copy["labels"]:
        audit.check(
            item["text"] in texts[STANDARD],
            f"{item['id']}: the approved label is not rendered verbatim in the standard",
        )
        audit.check(item["id"] in EXPECTED["RD"], f"{item['id']}: not in the RD register")

    # Every package file cross-references the others by path.
    for path in MARKDOWN_FILES + JSON_FILES + CHECKS:
        literal = str(path).replace("\\", "/")
        audit.check(f"`{literal}`" in package_text, f"package does not cross-reference {literal}")

    # The public-page check must actually use the shared register, or the
    # standard applies to everything except the pages customers see first.
    pages = read(Path("scripts/check-public-pages.mjs"))
    audit.check(
        'from "./copy-language.mjs"' in pages,
        "scripts/check-public-pages.mjs no longer applies the shared register",
    )
    audit.check(
        "FORBIDDEN" not in pages,
        "scripts/check-public-pages.mjs has grown a second word list; there is one register",
    )

    markers = sorted(set(re.findall(r"\b(?:TODO|TBD|TBC|FIXME)\b", package_text, re.I)))
    audit.check(not markers, f"placeholder markers remain: {markers}")

    return finish(audit)


def finish(audit: Audit) -> int:
    print(f"CBD-75 documentation audit: {audit.checks} checks")
    print(f"Failures: {len(audit.failures)}")
    for failure in audit.failures:
        print(f"  FAIL: {failure}")
    if not audit.failures:
        print("Result: PASS (structure and register agreement only; open gates remain binding)")
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())
