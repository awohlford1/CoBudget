#!/usr/bin/env python3
"""Structural audit for the CBD-76 boundary and readiness package.

This proves that the four-way machine-readable boundary, human-readable record,
and traceability report stay synchronized. It does not approve a product
decision, prove an implementation, or satisfy an external evidence gate.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RECORD = Path("docs/cbd-76-mvp-boundary-and-readiness-record.md")
TRACE = Path("docs/cbd-76-acceptance-criteria-traceability.md")
REGISTER = Path("docs/cbd-76-mvp-boundary-register.json")

EXPECTED_VERSION = "0.1"
EXPECTED_IDS = {
    "Included": {f"INC-76-{n:03d}" for n in range(1, 9)},
    "Prohibited": {f"PRO-76-{n:03d}" for n in range(1, 9)},
    "Excluded from MVP": {f"EXC-76-{n:03d}" for n in range(1, 5)},
    "Deferred": {f"DEF-76-{n:03d}" for n in range(1, 6)},
}
EXPECTED_DECISIONS = {f"DL-76-{n:03d}" for n in range(1, 17)}
EXPECTED_AC = {f"CBD-76-AC{n:02d}" for n in range(1, 11)}
EXPECTED_CBD12 = {f"AC{n:02d}" for n in range(1, 37)}

checks = 0
failures: list[str] = []


def check(condition: bool, message: str) -> None:
    global checks
    checks += 1
    if not condition:
        failures.append(message)


def read_text(path: Path) -> str:
    full = ROOT / path
    check(full.is_file(), f"missing {path.as_posix()}")
    return full.read_text(encoding="utf-8") if full.is_file() else ""


record = read_text(RECORD)
trace = read_text(TRACE)
register_text = read_text(REGISTER)

try:
    register = json.loads(register_text)
except json.JSONDecodeError as exc:
    failures.append(f"invalid JSON in {REGISTER.as_posix()}: {exc}")
    register = {}

check(register.get("schemaVersion") == 1, "register schemaVersion must be 1")
check(
    register.get("documentVersion") == EXPECTED_VERSION,
    f"register documentVersion must be {EXPECTED_VERSION}",
)
check(EXPECTED_VERSION in record[:500], "record header must carry the package version")
check(EXPECTED_VERSION in trace[:500], "trace header must carry the package version")
check("Product Owner approval required" in record[:500], "record must not imply draft approval")
check("Product Owner approval required" in register.get("status", ""), "register must not imply draft approval")

rows = register.get("classifications", [])
check(isinstance(rows, list), "register classifications must be a list")
rows = rows if isinstance(rows, list) else []
ids = [row.get("id") for row in rows if isinstance(row, dict)]
check(len(ids) == len(set(ids)), "classification IDs must be unique")

for classification, expected in EXPECTED_IDS.items():
    actual = {
        row.get("id")
        for row in rows
        if isinstance(row, dict) and row.get("classification") == classification
    }
    check(actual == expected, f"{classification} IDs differ: expected {sorted(expected)}, found {sorted(actual)}")

all_expected = set().union(*EXPECTED_IDS.values())
check(set(ids) == all_expected, "register has missing or unexpected classification IDs")

for row in rows:
    if not isinstance(row, dict):
        check(False, "every classification row must be an object")
        continue
    row_id = row.get("id", "<missing>")
    for field in ("id", "classification", "capability", "sources", "owner", "targetPhase"):
        check(bool(row.get(field)), f"{row_id} missing {field}")
    check(isinstance(row.get("sources"), list) and bool(row.get("sources")), f"{row_id} sources must be a non-empty list")
    if row.get("classification") in {"Included", "Prohibited"}:
        check(bool(row.get("boundary")), f"{row_id} missing controlling boundary")
    if row.get("classification") == "Excluded from MVP":
        check(bool(row.get("rationale")), f"{row_id} missing rationale")
        check(bool(row.get("reconsiderationGate")), f"{row_id} missing reconsiderationGate")
    if row.get("classification") == "Deferred":
        for field in ("rationale", "risk", "evidenceGate", "followUp"):
            check(bool(row.get(field)), f"{row_id} missing {field}")
    check(record.count(f"`{row_id}`") >= 1, f"{row_id} is not represented in the boundary record")

decision_ids = set(re.findall(r"\bDL-76-\d{3}\b", record))
check(decision_ids == EXPECTED_DECISIONS, "decision log IDs are missing or unexpected")

trace_ac = set(re.findall(r"\bCBD-76-AC\d{2}\b", trace))
check(trace_ac == EXPECTED_AC, "CBD-76 criterion mapping is incomplete or has unexpected IDs")

cbd12_rows = set(re.findall(r"^\| `AC(\d{2})` ", trace, flags=re.MULTILINE))
cbd12_ids = {f"AC{number}" for number in cbd12_rows}
check(cbd12_ids == EXPECTED_CBD12, "CBD-12 readiness table must contain AC01 through AC36 exactly once")

for heading in (
    "## 3. Versioned decision log",
    "## 4. MVP boundary summary",
    "### 4.2 Prohibited",
    "### 4.3 Excluded from MVP",
    "### 4.4 Deferred",
    "## 5. Follow-up issue and creation-action list",
    "## 7. Terminology audit",
    "## 8. CBD-12 readiness recommendation",
    "## 9. Approval checklist",
):
    check(heading in record, f"record missing heading: {heading}")

for heading in (
    "## 2. CBD-1 to Story coverage",
    "## 3. CBD-12 per-criterion readiness",
    "## 4. CBD-76 per-criterion mapping",
    "## 5. Discrepancy register",
    "## 6. Completeness and readiness conclusion",
):
    check(heading in trace, f"traceability report missing heading: {heading}")

for phrase in (
    "Unauthorized access",
    "Money movement",
    "Spending or purchase approval",
    "Transaction blocking",
    "External-account control",
    "User lockout",
    "Coercive monitoring",
    "Cross-budget disclosure",
):
    check(phrase in record, f"prohibited behavior missing from record: {phrase}")

for phrase in (
    "Legally supervised arrangements",
    "Minor accounts or arrangements involving minors",
    "Employer monitoring or organizational administration",
    "Unsupported legal, security, privacy, usability, or market claims",
):
    check(phrase in record, f"excluded capability missing from record: {phrase}")

for phrase in (
    "Role stacking within one budget space",
    "User-authored arbitrary alert rules and thresholds",
    "Final managed delivery-provider selection",
    "Final production message inventory and templates",
    "Formal external validation",
):
    check(phrase in register_text, f"deferred capability missing from register: {phrase}")

for role in ("Primary Owner", "Co-owner", "Collaborator", "Viewer", "Accountability Partner"):
    check(role in record, f"canonical role missing from record: {role}")

check("do not close CBD-76 or CBD-12 at v0.1" in trace, "draft must retain the conditional close recommendation")
check("Confluence remains read-only" in record, "approval checklist must preserve merge-first publication")
check("FU-95-004" in record, "closed stale-deferred-list finding must be recorded")
check("FU-95-022" in record, "terminal personal-account gate must be routed")
check("CBD-108" in record, "provider decision route must be explicit")
check("CBD-132" in record, "formal specialist evidence route must be explicit")

if failures:
    print(f"CBD-76 audit failed: {len(failures)} failure(s) across {checks} checks")
    for failure in failures:
        print(f"- {failure}")
    sys.exit(1)

print(
    "CBD-76 audit passed: "
    f"{checks} checks; {len(rows)} four-way boundary rows; "
    f"{len(EXPECTED_DECISIONS)} decisions; 10 CBD-76 criteria; 36 CBD-12 readiness rows"
)
