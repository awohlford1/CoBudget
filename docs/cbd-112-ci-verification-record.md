# CBD-112 — Pull-request CI verification record

| Field | Value |
| --- | --- |
| Status | Verification and in-scope hardening complete; production merge enforcement is active and the final CBD-112 pull request must pass it |
| Jira | [CBD-112](https://cobudget.atlassian.net/browse/CBD-112) |
| Verification date | September 2, 2026 |
| Verified baseline | `6167d7d77975743e464da36ccb030241c3547ee1` on `main` |
| Final integration base | `3c4013fca3feb6ac4db12de5f1129725a9a119b6` on `main` |
| Verified baseline workflow | `.github/workflows/ci.yml` (`24b1019b7d5ba20069e97363740b05270574e7db`) |
| Hardened workflow in this change | `.github/workflows/ci.yml` (`3278b4bd834889b27de3f41b0821dc9b87619627`) |
| Automated contract guard | `scripts/check-ci-contract.mjs` with 22 negative/positive self-tests |
| Production merge gate | Protected `main`; strict required check `Documentation, lint, type-check, test, and build` from GitHub Actions app ID `15368` |
| Node version source | `.nvmrc` (`a45fd52cc5891570d6299fab38643103c3955474`), containing `24` |
| Runner | GitHub-hosted `ubuntu-latest` |

## 1. Purpose and claim boundary

This record first verifies the pull-request check that existed when CBD-112
began, then records the in-scope hardening applied after an adversarial review.
The verification establishes that:

1. a fresh GitHub Actions job checks out the repository and installs the locked
   dependency graph with `npm ci`;
2. lint, type-check, test, and build faults each make the job fail when introduced
   one at a time;
3. the clean baseline completes `npm run check`; and
4. GitHub Actions obtains the Node major version from `.nvmrc` rather than from a
   second version literal in the workflow; and
5. the hardened workflow fails closed if its triggers, permissions, action pins,
   action inputs, command order, toolchain contract, or workspace participation
   drift from the reviewed design; and
6. GitHub blocks changes to `main` that do not arrive through a pull request with
   the required, up-to-date GitHub Actions check passing.

The negative controls prove that the named failure paths are connected to the CI
job. They do not prove that the linters, compiler, tests, or build detect every
possible defect, and they do not establish production readiness for application
features.

## 2. Workflow under verification

The `checks` job runs on every pull request and on pushes to `main`, with
read-only repository contents permission and a 15-minute timeout. Its effective
order is:

1. `actions/checkout` pinned to reviewed v4.4.0 commit
   `11d5960a326750d5838078e36cf38b85af677262`, with persisted Git credentials
   disabled;
2. the repository's Python documentation audits;
3. `actions/setup-node` pinned to reviewed v4.4.0 commit
   `49933ea5288caeca8642d1e84afbd3f7d6820020`, with
   `node-version-file: .nvmrc` and lockfile-bound npm caching;
4. `npm ci`;
5. `npm audit --audit-level=high`; and
6. `npm run check`.

The job sets `CI=true`, opts out of install-time Scarf analytics, and cancels a
superseded run for the same pull request or Git ref. The concurrency key includes
the workflow and pull-request number (falling back to the Git ref), so unrelated
pull requests cannot cancel one another.

At the verified baseline, `npm run check` is a fail-fast command chain:

```text
check:ci -> check:docs -> check:tokens -> lint -> typecheck -> test -> build -> check:pages
```

The root `engines.node` constraint, `>=24 <25`, agrees with `.nvmrc`. The
workflow contains no `node-version` value and therefore has no separate Node
version pin to drift from `.nvmrc`. `check:ci` first runs the contract checker's
adversarial self-tests, then checks the live repository.

The contract guard fails when an external action is unpinned, moved off its
exact reviewed commit, or outside the reviewed allowlist; the protected job is
renamed or another job or trigger is added; a workflow command is added,
removed, duplicated, or reordered; the high-severity dependency audit is
weakened; a secret/token expression, conditional, fail-open setting, or
pull-request exclusion appears; checkout or setup inputs are substituted; the
Node sources disagree; or a workspace silently loses a required lint,
type-check, test, or application-build script.

## 3. Positive control

| Evidence | Result |
| --- | --- |
| [PR #165](https://github.com/awohlford1/CoBudget/pull/165) | Passed the complete `checks` job before merge |
| [GitHub Actions run 33672270421](https://github.com/awohlford1/CoBudget/actions/runs/33672270421) | Fresh checkout, documentation audits, `npm ci`, and `npm run check` all succeeded on Linux |
| Tested head | `97b9e268a18ae0ea2ea8ff58cfdb6018891b2aa4` |
| Current `main` merge | `6167d7d77975743e464da36ccb030241c3547ee1` |
| Git tree for both commits | `e5af1483fe555a30683392e751196d00ea09bb95` |

The identical Git tree establishes that the passing PR run tested the same file
contents as the current baseline, even though the merge commit has a different
commit ID. The final CBD-112 pull request is required to repeat the clean
positive control against the hardened workflow. GitHub now enforces that
successful, up-to-date check as a merge prerequisite for `main`.

An additional clean Windows clone of the baseline completed `npm ci` with 658
packages installed and zero reported vulnerabilities. Its first `npm run check`
exposed a cold-start weakness: two API subprocess-startup tests reached fixed
10-second deadlines before producing output. The hardened change gives process
harnesses a bounded, platform-aware deadline: 30 seconds on Windows and the
original 10 seconds on Linux/CI. After a fresh 658-package `npm ci`, the complete
local gate passed; the formerly failing Windows configuration test took 22.95
seconds, proving that the original deadline was insufficient and the replacement
remains finite. This local result supports the fix but does not replace the
required final Linux pull-request run.

## 4. Isolated negative controls

Each negative control began directly from the verified `main` baseline. Only the
named fault was introduced. The fault was checked locally, pushed to a temporary
branch, and exercised in its own draft pull request. No proof branch was merged.

| Control | Injected fault | Evidence | Observed result |
| --- | --- | --- | --- |
| Lint | Added a Worker source file containing `void process.env;`, which violates `no-restricted-syntax` | [PR #166](https://github.com/awohlford1/CoBudget/pull/166), [run 33702778472](https://github.com/awohlford1/CoBudget/actions/runs/33702778472), commit `c3515734c4655880a8a5928a24ac3f98ec471117` | Checkout, documentation audits, setup, `npm ci`, documentation checks, and token checks succeeded. Worker lint rejected the file and the job exited non-zero. |
| Type-check | Assigned the number `112` to a value declared as `string` | [PR #167](https://github.com/awohlford1/CoBudget/pull/167), [run 33702921520](https://github.com/awohlford1/CoBudget/actions/runs/33702921520), commit `b3197f275e9c7e3f441939102e7f1371c56ab090` | Lint succeeded. Worker TypeScript compilation emitted `TS2322` and the job exited non-zero. |
| Test | Added a Worker test that calls `assert.fail("CBD-112 deliberate test failure")` | [PR #168](https://github.com/awohlford1/CoBudget/pull/168), [run 33703055842](https://github.com/awohlford1/CoBudget/actions/runs/33703055842), commit `9c625079d87707e65580ae91f3420b708715fafe` | Lint and type-check succeeded. The API suite passed; the deliberate Worker test failed and the job exited non-zero. |
| Build | Replaced only the Worker build command with `node -e "process.exit(112)"` | [PR #169](https://github.com/awohlford1/CoBudget/pull/169), [run 33703220992](https://github.com/awohlford1/CoBudget/actions/runs/33703220992), commit `f1b29b9a5b58167decf7b725eae6727e10cbf2ca` | Lint, type-check, and all tests succeeded. The Worker build exited with code `112`, making the job fail. |

The four draft pull requests were closed without merge. Their remote and local
proof branches were deleted after their run logs were inspected. The linked
pull requests, workflow runs, and immutable commit IDs retain the audit trail.

## 5. Acceptance-criteria traceability

| Acceptance criterion | Evidence | Disposition |
| --- | --- | --- |
| A deliberate lint error fails CI | PR #166 and run 33702778472 | Pass |
| A deliberate type error fails CI | PR #167 and run 33702921520 | Pass |
| A deliberate test failure fails CI | PR #168 and run 33703055842 | Pass |
| A deliberately broken build fails CI | PR #169 and run 33703220992 | Pass |
| A clean checkout passes from `npm ci` and `npm run check` | PR #165 and run 33672270421; tested and baseline Git trees are identical | Pass for the Linux pull-request runner; final CBD-112 PR must repeat |
| Node version comes from `.nvmrc` rather than a separate CI pin | Workflow blob `24b1019...` uses only `node-version-file: .nvmrc`; `.nvmrc` blob `a45fd52...` contains `24` | Pass |
| Coverage and gaps are written down | Sections 1, 2, and 6 of this record | Pass |

### 5.1 Hardening controls added after verification

| Control | Failure closed by |
| --- | --- |
| Floating or substituted Actions | Full commit-SHA pins, an exact action allowlist, and action-input allowlists |
| Substitution to another commit in an approved Action | The contract binds each approved Action identity to its exact reviewed commit; Action updates require a deliberate contract update |
| Protected-check identity drift | The workflow must retain exactly the `checks` job and the branch rule's stable check name; extra jobs and triggers fail the contract |
| Pull-request bypass | Required unfiltered `pull_request` trigger; forbidden `pull_request_target`, path/branch/type filters, conditions, and `continue-on-error` |
| Excess workflow authority | Top-level `contents: read`; forbidden write permissions, token/secret expressions, and persisted checkout credentials |
| Command injection or accidental omission | Exact command allowlist, uniqueness checks, and fail-fast order enforcement |
| Toolchain drift | `.nvmrc`, `engines.node`, and the executing Node major are checked together; npm's `packageManager` value must be exact |
| Silent workspace omission | Every workspace must remain private and define lint/type-check plus its applicable test/build scripts despite root `--if-present` aggregation |
| Redundant work | Per-pull-request/ref concurrency cancels superseded runs without cross-PR cancellation |
| Install analytics | `SCARF_ANALYTICS=false` is mandatory and regression-checked |
| Known dependency vulnerabilities | CI runs `npm audit --audit-level=high` after the clean install and before repository checks; high and critical advisories block the required check |
| Stale dependency or Action pins | Dependabot checks npm and GitHub Actions weekly and may keep at most five pull requests open for each ecosystem |
| Unlinted repository tooling | A root ESLint boundary now checks every `scripts/**/*.mjs` file before workspace lint |
| Cold Windows process-test flake | API and Worker subprocess harnesses retain a 10-second Linux bound and use a finite 30-second Windows bound |

## 6. Gaps and follow-up boundaries

### 6.1 Production merge enforcement

The repository initially had no protection for `main` and no applicable branch
rules. With explicit authorization on September 2, 2026, `main` was protected
and the resulting API state was independently read back with these controls:

- changes must arrive through a pull request;
- `Documentation, lint, type-check, test, and build` must pass, must come from
  GitHub Actions app ID `15368`, and must be tested against the latest `main`;
- the rule applies to repository administrators;
- all review conversations must be resolved; and
- force pushes and branch deletion are disabled.

The repository has one direct administrator, so the approval count is zero and
code-owner review is not required. Requiring one approval would make the sole
maintainer unable to merge their own pull requests. If another trusted
maintainer is added, raising the approval count to one and requiring code-owner
review is the next governance hardening step. This is an independent-review
boundary, not a CI execution gap.

### 6.2 Diagnostic and execution gaps

- All Node checks are reported through one `checks` job and one `npm run check`
  step. A reviewer must inspect logs to identify the failing substage, and later
  stages do not run after an earlier `&&` failure.
- npm's workspace runner can continue checking other workspaces after one
  workspace fails. This preserves more diagnostics but makes intentional failure
  runs slower and can obscure the first causal error in long logs.
- Test reports, coverage reports, and build outputs are not retained as CI
  artifacts. The workflow log is the only durable diagnostic produced by this
  job.

### 6.3 Coverage gaps

- There is no enforced code-coverage threshold. A passing test command proves
  that discovered tests passed, not that important application paths were
  exercised.
- There is no browser-level end-to-end suite. `check:pages` validates the public
  page output statically; it is not a replacement for browser interaction,
  accessibility, or cross-browser verification.
- There is no database-backed integration tier in this workflow. CBD-118 owns
  the planned test-database work.
- There is no secret-scanning stage. CBD-114 owns that separate control.
- The dependency policy blocks high and critical npm advisories. Moderate and
  low advisories are reported but do not block merges; changing that risk
  threshold requires an explicit policy decision.
- The negative controls cover one representative failure per requested stage.
  They do not cover every workspace, compiler diagnostic, test runner, bundler,
  or documentation/public-page check failure mode.

### 6.4 Reliability and reproducibility gaps

- `ubuntu-latest` is a moving runner image. The two Actions are now pinned to
  immutable, verified commits, but the runner image can still change beneath a
  commit.
- Immutable Action pins still require deliberate review before update. The
  checked-in weekly npm and GitHub Actions Dependabot policies propose updates
  and cap each ecosystem at five open pull requests. The contract guard rejects
  removal or weakening of those policies, and an Action update remains red until
  its newly reviewed commit is also recorded in the contract.
- `.nvmrc` fixes only Node major version `24`, not an exact runtime patch. The
  repository intentionally avoids a second CI version literal, but results can
  still change when the selected Node 24 patch or bundled npm version changes.

## 7. Completion rule

The contract checker is a repository regression guard, not an independent trust
boundary: a pull request can propose changing the guard and workflow together.
The protected branch independently requires the stable GitHub Actions check and
prevents direct updates, but the sole-maintainer approval exception means human
review is not independent. The branch rule itself also remains an administrative
control and can be changed only by a repository administrator.

CBD-112 is evidentially complete when the permanent pull request containing this
record passes the hardened, required CI workflow from a fresh GitHub checkout.
Merging the record does not close the remaining section 6 boundaries. Each
requires its own scoped decision or implementation task, and repository settings
must continue to be verified independently from a green status.
