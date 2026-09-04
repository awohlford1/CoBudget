#!/usr/bin/env python3
"""Check the claims documents make about Jira issues and pinned source versions.

Why this exists
---------------
Approving a package or closing a story does not only change a ticket. It
silently falsifies every sentence elsewhere in the repository that described
that ticket's old state, and those sentences are the routing layer for open
work. On September 4, 2026 the CBD-95 follow-up register still sent open
implementation work to CBD-12 and CBD-73 through CBD-76 as "likely focused
targets" days after all six closed as planning packages, and still said "no
providers are selected" after CBD-108 selected six. Nothing failed, because no
guard compared a document's prose to the live board.

The same decay hits version pins. A frozen-baseline table that names a version
its source has moved past is a live defect, not a stale note, because those
tables say only the listed artifacts may determine an accepted outcome. CBD-71
pinned CBD-68 at v1.0 for twenty days after it became v1.1.

This runs the comparison the reviewer would otherwise do by eye.

Scope and limits
----------------
Three things are checkable and are checked:

* a direct status claim -- "CBD-72 In Progress", "CBD-12 is Ready";
* "blocked by CBD-nnn" where that issue has since reached Done;
* a pinned source version that no longer matches the document it names.

Two things are deliberately not checked, because no mechanical rule separates
them from correct prose, and a noisy guard gets ignored -- which is worse than
no guard:

* domain claims that merely correlate with status, like "no providers are
  selected". Only a reader knows which artifact settles them.
* routing language such as "the likely focused target", which is wrong only
  once the named issue closes, and reads as fine in every other case.

Snapshots are not defects
-------------------------
Some rows record what a review saw, and are the evidence that review ran
against: a "Live Jira snapshot" cell, a "live state used by this review"
column, a closed follow-up row's state when it was raised. Rewriting one
falsifies the record. This tool reports those separately as DATED, so the
answer is to date them, never to correct them. A claim counts as dated when a
snapshot marker sits in its own table cell, in the header row of its table, or
in an enclosing revision-history section.

Setup
-----
    export JIRA_EMAIL=you@example.com
    export JIRA_API_TOKEN=...

Credentials are read by `scripts/audit-jira-links.py`, which takes them from the
environment first and then from an untracked `.env.local`, per
`docs/development.md`. The token is never printed or written to disk.

Usage
-----
    python scripts/check-jira-freshness.py             # everything
    python scripts/check-jira-freshness.py --offline   # version pins only, no Jira
    python scripts/check-jira-freshness.py --strict    # dated snapshots fail too

Run it before transitioning an issue or approving a package, and fix what it
reports in the same change. `--offline` needs no credentials and is the half
that could run in CI.

Exit code is 0 when every live claim matches, 1 when one does not.
"""

from __future__ import annotations

import argparse
import base64
import importlib.util
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from types import ModuleType

REPO_ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = REPO_ROOT / "docs"
SCRIPTS_DIR = REPO_ROOT / "scripts"

JIRA_STATUSES = ("Planning", "Ready", "In Progress", "In Review", "Done")

# "CBD-72 In Progress", "CBD-12 is Ready", "CBD-94 remains Done". The verb is
# optional because register cells state the status bare, which is exactly the
# form that went stale in FU-95-030.
STATUS_CLAIM = re.compile(
    r"\b(CBD-\d+)\s+(?:is|was|are|were|remains?|stays?|stayed|reached)?\s*"
    r"(" + "|".join(JIRA_STATUSES) + r")\b"
)

BLOCKED_BY = re.compile(r"\bblocked by\s+(CBD-\d+)", re.IGNORECASE)

# A pin of the form: `docs/cbd-71-....md` | Document version **1.1.2**
DOC_PATH_PIN = re.compile(
    r"`(docs/[a-z0-9.\-]+\.md)`[^|\n]*\|[^|\n]*?"
    r"Document version \*\*([0-9][0-9.]*)\*\*"
)

# A pin that names a Confluence page instead of a path, as CBD-71 section 2
# does. The page id resolves to a repository file through the sync script's own
# target table, so the two never drift apart independently.
PAGE_REF = re.compile(r"https://cobudget\.atlassian\.net/wiki/spaces/[A-Z]+/pages/(\d+)")
VERSION_CELL = re.compile(r"^\d+(?:\.\d+)+$")

DOC_VERSION = re.compile(r"^\|\s*(?:Document version|Version)\s*\|\s*([^|]+?)\s*\|", re.M)

# Markers that say a line records a past observation rather than a current one.
SNAPSHOT_MARKER = re.compile(
    r"\bas (?:at|of|read)\b[^.|]{0,60}\d{4}"
    r"|\b[A-Z][a-z]+ \d{1,2}(?:\s*[-–]\s*\d{1,2})?, \d{4}\s*[:,]\s*(?=[A-Z`'\"])"
    r"|\bwhen this (?:row|review|record|audit|specification|document|catalog|register)\b"
    r"[^.|]{0,40}(?:closed|performed|written|ran|was made)"
    r"|\blive jira snapshot\b"
    r"|\blive state used by this review\b",
    re.IGNORECASE,
)

SECTION_HEADING = re.compile(r"^#{2,6}\s+(.*?)\s*$")
REVISION_SECTION = re.compile(r"revision history|approval record", re.IGNORECASE)
TABLE_SEPARATOR = re.compile(r"^\|[\s:|-]+\|$")


@dataclass(frozen=True)
class Finding:
    path: str
    line: int
    kind: str
    claim: str
    actual: str
    dated: bool


def load_sibling(name: str) -> ModuleType:
    """Import a hyphenated sibling script for reuse.

    Both targets guard their entry point with `if __name__ == "__main__"`, so
    importing them runs only their definitions.
    """
    module_name = name.replace("-", "_")
    spec = importlib.util.spec_from_file_location(module_name, SCRIPTS_DIR / f"{name}.py")
    if spec is None or spec.loader is None:  # pragma: no cover - defensive
        sys.exit(f"cannot import scripts/{name}.py")
    module = importlib.util.module_from_spec(spec)
    # Registered before execution because a module-level @dataclass resolves its
    # own module through sys.modules, and sync-confluence defines one.
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


def page_id_to_path() -> dict[str, str]:
    """Confluence page id to repository file, taken from the sync script.

    Reusing its table means a page can never be pinned here against a file the
    publisher disagrees about.
    """
    sync = load_sibling("sync-confluence")
    return {target.page_id: target.path for target in sync.TARGETS}


def fetch_statuses(keys: set[str]) -> dict[str, str]:
    """One JQL read for every issue the documents mention."""
    if not keys:
        return {}
    links = load_sibling("audit-jira-links")
    base, email, token = links.load_credentials()
    auth = base64.b64encode(f"{email}:{token}".encode()).decode()
    statuses: dict[str, str] = {}
    ordered = sorted(keys, key=lambda k: int(k.split("-")[1]))
    for start in range(0, len(ordered), 80):
        batch = ordered[start : start + 80]
        jql = urllib.parse.quote(f"key in ({','.join(batch)})")
        request = urllib.request.Request(
            f"{base}/rest/api/3/search/jql?jql={jql}&fields=status&maxResults=100",
            headers={"Authorization": f"Basic {auth}", "Accept": "application/json"},
        )
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                payload = json.load(response)
        except urllib.error.HTTPError as error:  # pragma: no cover - network path
            sys.exit(f"Jira request failed: {error.code} {error.reason}")
        for issue in payload.get("issues", []):
            statuses[issue["key"]] = issue["fields"]["status"]["name"]
    return statuses


def table_header(lines: list[str], index: int) -> str:
    """The header row of the table containing `index`, or an empty string.

    A dated column header dates every row beneath it, which is how the CBD-95
    live-state table marks its whole snapshot at once.
    """
    for cursor in range(index, max(index - 400, -1), -1):
        line = lines[cursor]
        if not line.startswith("|"):
            return ""
        if TABLE_SEPARATOR.match(line):
            return lines[cursor - 1] if cursor else ""
    return ""


def cell_containing(line: str, position: int) -> str:
    """The single table cell a match falls in, so a date elsewhere in a long
    row does not date an unrelated claim."""
    if not line.startswith("|"):
        return line
    start = line.rfind("|", 0, position) + 1
    end = line.find("|", position)
    return line[start : end if end != -1 else len(line)]


def scan_document(
    path: Path, statuses: dict[str, str], pages: dict[str, str], offline: bool
) -> list[Finding]:
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")
    relative = path.relative_to(REPO_ROOT).as_posix()
    findings: list[Finding] = []
    section = ""

    for index, line in enumerate(lines):
        heading = SECTION_HEADING.match(line)
        if heading:
            section = heading.group(1)
            continue

        in_history = bool(REVISION_SECTION.search(section))
        header = table_header(lines, index)

        def is_dated(match_start: int) -> bool:
            cell = cell_containing(line, match_start)
            return (
                in_history
                or bool(SNAPSHOT_MARKER.search(cell))
                or bool(SNAPSHOT_MARKER.search(header))
            )

        if not offline:
            for match in STATUS_CLAIM.finditer(line):
                key, claimed = match.group(1), match.group(2)
                actual = statuses.get(key)
                if actual is None or actual == claimed:
                    continue
                findings.append(
                    Finding(relative, index + 1, "status", f"{key} {claimed}",
                            f"{key} is {actual}", is_dated(match.start()))
                )

            for match in BLOCKED_BY.finditer(line):
                key = match.group(1).upper()
                if statuses.get(key) != "Done":
                    continue
                findings.append(
                    Finding(relative, index + 1, "blocks", f"blocked by {key}",
                            f"{key} is Done; the link no longer withholds it",
                            is_dated(match.start()))
                )

        for match in DOC_PATH_PIN.finditer(line):
            target, pinned = match.group(1), match.group(2)
            actual = document_version(REPO_ROOT / target)
            if actual is None or actual == pinned:
                continue
            findings.append(
                Finding(relative, index + 1, "pin", f"{target} pinned at {pinned}",
                        f"{target} is version {actual}", is_dated(match.start()))
            )

        page_match = PAGE_REF.search(line)
        if page_match and line.startswith("|"):
            target = pages.get(page_match.group(1))
            cells = [cell.strip().strip("`") for cell in line.strip("|").split("|")]
            pinned = next((cell for cell in cells if VERSION_CELL.match(cell)), None)
            if target and pinned:
                actual = document_version(REPO_ROOT / target)
                if actual is not None and actual != pinned:
                    findings.append(
                        Finding(relative, index + 1, "pin",
                                f"{target} pinned at {pinned}",
                                f"{target} is version {actual}",
                                is_dated(page_match.start()))
                    )

    return findings


def document_version(path: Path) -> str | None:
    if not path.is_file():
        return None
    match = DOC_VERSION.search(path.read_text(encoding="utf-8"))
    return match.group(1).strip().strip("*") if match else None


def referenced_keys(paths: list[Path]) -> set[str]:
    keys: set[str] = set()
    for path in paths:
        text = path.read_text(encoding="utf-8")
        for line in text.split("\n"):
            keys.update(match.group(1) for match in STATUS_CLAIM.finditer(line))
            keys.update(match.group(1).upper() for match in BLOCKED_BY.finditer(line))
    return keys


def report(findings: list[Finding], label: str) -> None:
    if not findings:
        return
    print(f"\n{label}")
    for finding in sorted(findings, key=lambda f: (f.path, f.line)):
        print(f"  {finding.path}:{finding.line}")
        print(f"    says   {finding.claim}")
        print(f"    actual {finding.actual}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--offline", action="store_true",
                        help="check version pins only; no Jira credentials needed")
    parser.add_argument("--strict", action="store_true",
                        help="treat dated snapshots as failures too")
    parser.add_argument("--path", metavar="GLOB", default="*.md",
                        help="limit to documents matching this glob under docs/")
    args = parser.parse_args()

    paths = sorted(DOCS_DIR.glob(args.path))
    if not paths:
        sys.exit(f"no documents match docs/{args.path}")

    statuses: dict[str, str] = {}
    if not args.offline:
        statuses = fetch_statuses(referenced_keys(paths))

    pages = page_id_to_path()
    findings = [
        f for path in paths for f in scan_document(path, statuses, pages, args.offline)
    ]
    stale = [f for f in findings if not f.dated]
    dated = [f for f in findings if f.dated]

    report(stale, f"STALE — {len(stale)} claim(s) the live board contradicts:")
    report(dated, f"DATED — {len(dated)} snapshot(s), correct as history; date them, do not rewrite:")

    checked = "version pins" if args.offline else f"{len(statuses)} issues and version pins"
    print(
        f"\nchecked {len(paths)} document(s) against {checked}: "
        f"{len(stale)} stale, {len(dated)} dated"
    )
    return 1 if stale or (args.strict and dated) else 0


if __name__ == "__main__":
    raise SystemExit(main())
