# Committed-secret guard

## Local verification

Run `npm run check:secrets` (or the full `npm run check`) from the repository
root. Python 3.10+ and Git must be on PATH. Stage new files before scanning.
The local mode checks HEAD, the index, and tracked working files, including
staged content subsequently removed from the working file. It does not read
ignored or untracked files, including `.env.local`. Symlink target text is
scanned from Git without following the target.

The first run downloads Gitleaks 8.30.1 from its official GitHub release and
verifies the committed SHA-256 archive digest. Subsequent runs verify the cached
archive and executable. There is no PATH fallback, remote scanning service,
telemetry, or repository-content upload. Configuration and binary verification
fail closed. Supported release targets are Windows x64, Linux x64, and macOS
x64/ARM64. Other platforms fail rather than silently skipping the check.

Gitleaks is MIT-licensed. The version, upstream, archive digests, update owner,
and review cadence are in `config/secret-scanner.json`. Alexander Wohlford owns
monthly security-update review. A tool or detection-rule update must update the
independent CI contract pins and rerun every synthetic fixture before merging.

## History coverage

`python scripts/secret_scanner.py history` scans all commits and blobs reachable
from HEAD. `python scripts/secret_scanner.py range BASE_SHA HEAD_SHA` scans the
objects reachable from that exact head but not the exact trusted base. Both
SHAs must identify locally available commits. Shallow or grafted history fails;
replace objects are disabled. Missing objects, unsupported submodules or paths,
subprocess failures, and timeouts fail rather than reducing coverage to the tip.

The wrapper reads Git objects directly, not just diffs. It reconstructs every
covered blob's paths, scans complete file versions and commit messages, and
therefore detects content deleted before the tip and merge-only content. Raw
objects are supplied to the scanner through an in-memory stream with line
mapping, not stored as plaintext reports or temporary checkout files. An ASCII
preamble avoids binary-type skipping; no scanner path exclusions are applied.
CRLF is normalized to LF for stable Windows/Git fingerprints. The input cap is
256 MiB; exceeding it fails coverage and requires a reviewed scaling change.

CI checks out full history with no persisted Git credential. On pull requests,
the trusted base/head come from the GitHub event, never branch-supplied shell
text. It scans both the introduced range and the reachable merge-head history.
On main pushes, it scans reachable event-head history. The event checkout SHA
must match HEAD. Each CI scan must complete in under 60 seconds; the existing
required job retains its 15-minute timeout and read-only contents permission.

Detection is pattern-based, not proof that arbitrary data contains no secret.
Encrypted/compressed payloads are scanned as raw bytes, not recursively unpacked;
path-only upstream rules are not evaluated by the content stream. Unknown token
formats, encoding tricks, and patterns spanning the scanner's internal fragment
boundaries remain limitations. Do not commit credential containers or rely on
this control instead of credential hygiene and review.

## Findings and exceptions

Output contains only the named rule, repository path, one-based line, and a
SHA-256 fingerprint. Child stdout/stderr and exception details are never relayed.
The scanner also receives its full-redaction flag. A finding exits 1; a coverage
or execution error exits 2. Both block the required check.

`config/secret-allowlist.json` accepts only exact rule/path/fingerprint entries
with rationale, owner, creation date, and expiry (at most 366 days). The
fingerprint hashes the rule plus the complete matched source lines. Changing a
matched value or moving it to another path invalidates its exception. No global
rule/path regex, inline `gitleaks:allow`, local ignore file, or warning-only mode
is supported. Expired exceptions fail the guard.

The initial 43 exceptions are verified non-secrets: 42 document target
identifiers in the Confluence publication script and one pre-existing synthetic
configuration-error test sentinel. No credential value is in exception metadata.

If a finding may be real, stop ordinary implementation and involve the owner.
Revoke/rotate first, never paste the value into an issue, log, or review, and
record only safe location metadata. Credential rotation and history rewriting
require separate authorization; never hide a real finding with an exception.

## Synthetic regression catalog

The catalog lives in `scripts/test_secret_scanner.py`; complete nonfunctional
values are assembled only in isolated test memory/repositories.

| Fixture ID | Intended rule | Neighbor control |
| --- | --- | --- |
| provider-api-token | github-pat | Non-provider-shaped text |
| postgresql-url | cobudget-postgresql-credential | URL without user/password |
| pem-private-key | private-key | Public-key heading |
| entropy-assignment | cobudget-secret-assignment | Short local marker |

Tests cover each positive and negative, `.env.example` with zero matches,
exact exceptions and mutations, output redaction, binary-prefix/path skipping,
line mapping past scanner chunk boundaries, CRLF fingerprints, missing binary,
malformed/error reports, staged-versus-working content, and a real multi-commit
add/rename/delete history in both range and history modes.

## Completion evidence

Local baseline: `610b2314e372dd537403d1a0f9f2201803fe438e`, 519 reachable
commits. Initial full-object scan took approximately seven seconds on Windows.
The historical non-secrets above were classified before exceptions were added.

GitHub clean/failing run IDs, PRs, exact implementation and fixture commits,
runner timings, and final reachable-main scan are still pending. CBD-114 must
not be marked Done until that immutable evidence is recorded and the merged
reachable-main scan has zero unallowlisted findings. Synthetic negative-control
branches must never be merged.
