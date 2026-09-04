#!/usr/bin/env python3
"""Structural audit for the CBD-76 boundary and readiness package.

This proves that the four-way machine-readable boundary, human-readable record,
and traceability report stay synchronized. It does not approve a product
decision, prove an implementation, or satisfy an external evidence gate.

The record says that if its prose and the JSON register differ, the package
fails review. This script is what makes that sentence true: every §4 table row
must quote the register's capability string verbatim, every boundary or
decision ID cited anywhere in the package must exist, every Deferred follow-up
must be a Jira key routed in §5, and every CBD-12 readiness row must use the
CBD-76-AC09 vocabulary.

The expected version, the draft-status strings, and the conditional-close
sentence are pinned on purpose. Promoting the package to v1.0 must edit this
file in the same change; a promotion that leaves it untouched fails CI.
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

EXPECTED_VERSION = "1.0"
EXPECTED_IDS = {
    "Included": {f"INC-76-{n:03d}" for n in range(1, 14)},
    "Prohibited": {f"PRO-76-{n:03d}" for n in range(1, 9)},
    "Excluded from MVP": {f"EXC-76-{n:03d}" for n in range(1, 5)},
    "Deferred": {f"DEF-76-{n:03d}" for n in range(1, 6)},
}
EXPECTED_DECISIONS = {f"DL-76-{n:03d}" for n in range(1, 22)}
EXPECTED_AC = {f"CBD-76-AC{n:02d}" for n in range(1, 11)}
EXPECTED_CBD12 = {f"AC{n:02d}" for n in range(1, 37)}
READINESS_VALUES = ("Met", "Partially met", "Unmet", "Blocked")
JIRA_KEY = re.compile(r"^CBD-\d+$")

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


def section(text: str, start: str, end: str) -> str:
    """The text between two headings, empty if either is missing."""
    try:
        return text[text.index(start) : text.index(end)]
    except ValueError:
        return ""


record = read_text(RECORD)
trace = read_text(TRACE)
register_text = read_text(REGISTER)

try:
    register = json.loads(register_text)
except json.JSONDecodeError as exc:
    failures.append(f"invalid JSON in {REGISTER.as_posix()}: {exc}")
    register = {}

check(register.get("schemaVersion") == 1, "register schemaVersion must be 1")
check(register.get("documentVersion") == EXPECTED_VERSION, f"register documentVersion must be {EXPECTED_VERSION}")
check(f"| Document version | {EXPECTED_VERSION} |" in record[:1500], "record header must carry the package version")
check(f"| Document version | {EXPECTED_VERSION} |" in trace[:1500], "trace header must carry the package version")
check("Approved v1.0" in record[:600] and "September 4, 2026" in record[:600], "record header must carry the v1.0 approval and its date")
check("approval required" not in record[:600], "an approved record must not still ask for approval")
check(register.get("status", "").startswith("Approved v1.0"), "register status must carry the v1.0 approval")

rows = register.get("classifications", [])
check(isinstance(rows, list), "register classifications must be a list")
rows = [row for row in rows if isinstance(row, dict)] if isinstance(rows, list) else []
by_id = {row.get("id"): row for row in rows}
check(len(by_id) == len(rows), "classification IDs must be unique")

for classification, expected in EXPECTED_IDS.items():
    actual = {row.get("id") for row in rows if row.get("classification") == classification}
    check(actual == expected, f"{classification} IDs differ: expected {sorted(expected)}, found {sorted(actual)}")

all_expected = set().union(*EXPECTED_IDS.values())
check(set(by_id) == all_expected, "register has missing or unexpected classification IDs")

follow_up_section = section(record, "## 5. Follow-up issue and creation-action list", "## 6. Open execution")
for row in rows:
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
        follow_up = str(row.get("followUp", ""))
        check(bool(JIRA_KEY.match(follow_up)), f"{row_id} followUp must be a single Jira key, found {follow_up!r}")
        check(follow_up in follow_up_section, f"{row_id} followUp {follow_up} is not routed in record §5")
    check(record.count(f"`{row_id}`") >= 1, f"{row_id} is not represented in the boundary record")

# Every §4 table row must quote the register's capability string verbatim.
summary = section(record, "## 4. MVP boundary summary", "## 5. Follow-up issue and creation-action list")
table_rows = re.findall(r"^\| `((?:INC|PRO|EXC|DEF)-76-\d{3})` \| ([^|]+?) \|", summary, flags=re.MULTILINE)
check({row_id for row_id, _ in table_rows} == all_expected, "record §4 tables must list every register row exactly")
for row_id, capability in table_rows:
    expected_capability = by_id.get(row_id, {}).get("capability")
    check(capability.strip() == expected_capability, f"record §4 capability for {row_id} differs from the register: {capability.strip()!r} vs {expected_capability!r}")

# Every boundary or decision ID cited anywhere in the package must exist.
for name, text in (("record", record), ("trace", trace)):
    cited = set(re.findall(r"\b(?:INC|PRO|EXC|DEF)-76-\d{3}\b", text))
    check(cited <= all_expected, f"{name} cites boundary IDs that are not in the register: {sorted(cited - all_expected)}")
    cited_decisions = set(re.findall(r"\bDL-76-\d{3}\b", text))
    check(cited_decisions <= EXPECTED_DECISIONS, f"{name} cites decision IDs outside the log: {sorted(cited_decisions - EXPECTED_DECISIONS)}")

decision_rows = set(re.findall(r"^\| `(DL-76-\d{3})` \|", record, flags=re.MULTILINE))
check(decision_rows == EXPECTED_DECISIONS, "decision log rows are missing or unexpected")

trace_ac = set(re.findall(r"\bCBD-76-AC\d{2}\b", trace))
check(trace_ac == EXPECTED_AC, "CBD-76 criterion mapping is incomplete or has unexpected IDs")

readiness_rows = re.findall(r"^\| `AC(\d{2})` [^|]*\| [^|]*\| ([^|]+?) \|", trace, flags=re.MULTILINE)
cbd12_ids = {f"AC{number}" for number, _ in readiness_rows}
check(cbd12_ids == EXPECTED_CBD12 and len(readiness_rows) == 36, "CBD-12 readiness table must contain AC01 through AC36 exactly once")
for number, readiness in readiness_rows:
    value = readiness.strip().strip("*")
    check(value.startswith(READINESS_VALUES), f"AC{number} readiness must start with one of {READINESS_VALUES}, found {value!r}")
partially_met = {f"AC{number}" for number, readiness in readiness_rows if readiness.strip().strip("*").startswith("Partially met")}
check(not partially_met, f"an approved package leaves no CBD-12 criterion partially met; found {sorted(partially_met)}")

for heading in (
    "## 3. Versioned decision log",
    "## 4. MVP boundary summary",
    "### 4.1 Included",
    "### 4.2 Prohibited",
    "### 4.3 Excluded from MVP",
    "### 4.4 Deferred",
    "## 5. Follow-up issue and creation-action list",
    "## 6. Open execution, evidence, and specialist gates",
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

for role in ("Primary Owner", "Co-owner", "Collaborator", "Viewer", "Accountability Partner"):
    check(role in record, f"canonical role missing from record: {role}")

check(f"close CBD-76 at v{EXPECTED_VERSION} once the merge commit" in trace, "approved package must carry the closure instruction")
check("| Met in draft" not in trace and "partially met until" not in trace, "approved traceability must not describe itself as a draft")
check("Confluence remains read-only" in record, "approval checklist must preserve merge-first publication")
check("edits the audit in the same change" in record, "approval checklist must say promotion edits this audit")
check("FU-95-004" in record, "closed stale-deferred-list finding must be recorded")
check("FU-95-022" in record, "terminal personal-account gate must be routed")
check("CBD-108" in record, "provider decision route must be explicit")
check("PN-130-003" in record, "push-has-no-provider finding must be recorded")
check("CBD-132" in record, "formal specialist evidence route must be explicit")
check("`OD-72-01`–`OD-72-06`" in record, "record §6 must state that CBD-72 has no open decisions")

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
