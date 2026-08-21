# CBD-105 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026. Maps each CBD-105 acceptance criterion and deliverable to the exact evidence that answers it, and states plainly where the answer is a design record, a retrieved document, or an open question. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 12 `DP-105-*` decisions, the screening and 24-gate evaluation with its verdicts and `EV-102-030`–`039` records, the operational and cost assessment with its `CR4` unknowns, and this traceability record. It approves no provider, publishes no rubric score, performs no observation, and leaves `OI-105-001`–`013`, `OI-102-022`, and every `OQ-105` question open. |
| Jira | [CBD-105](https://cobudget.atlassian.net/browse/CBD-105) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Data Protection and Recovery Specification v1.0; Candidate Shortlist and Gate Evaluation v1.0; Operational and Cost Assessment v1.0 |
| Confluence page | [CBD-105 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12910593) |
| Repository baseline | `6b1ac8e` |
| Last updated | August 20, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-105-data-protection-and-recovery-specification.md` | The recovery posture and data-protection boundary, as 12 `DP-105-*` decisions |
| `docs/cbd-105-candidate-shortlist-and-gate-evaluation.md` | Screening, 24-gate comparison matrix over three candidates, verdicts, findings F1–F4, and evidence records `EV-102-030`–`039` |
| `docs/cbd-105-operational-and-cost-assessment.md` | Capacity and connection arithmetic, maintenance, monitoring, outage behaviour, export/migration/deletion operations, and the `CT-102-*` cost structure with `CR4` unknowns |
| `docs/cbd-105-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-105.py` | Mechanical guard over identifier resolution, matrix completeness, and the restated tallies |

The status vocabulary below is the one CBD-103's traceability record §2
defined: **Met**, **Met (design)**, **Partially met** — with no criterion
marked Met on a claim that lacks an evidence record or a cited approved source.

## 2. Acceptance criteria

### AC1 — PostgreSQL compatibility and typed-SQL access are confirmed

**Status: Partially met.**

| Evidence | Where |
| --- | --- |
| Each candidate is its provider's genuine-PostgreSQL offering; wire-compatible re-implementations were screened out precisely to keep the genuineness question closed | Evaluation §4.2 |
| The typed-SQL layer (`docs/architecture.md` § Proposed stack) is CoBudget-side and requires only the community wire protocol and transactional semantics | `DP-105-011` |
| The confirming observation — a transactional outbox write exercised on a live instance — is the `HG-102-038` pass test, authorized but not yet performed | Evaluation §3 |

"Confirmed" is the criterion's word, and under this project's evidence standard
confirmation is the observation, not the product name. Documentary positioning
supports all three candidates; the version-page retrieval is `OQ-105-003`; the
observation completes the criterion.

### AC2 — Secure connectivity, least-privilege identities, TLS, encryption, key boundaries, and audit logs are evaluated

**Status: Met.**

| Sub-criterion | Evidence |
| --- | --- |
| Secure connectivity | `DP-105-003` — private-network-only, TLS-enforced, per `TD-103-015` and `TB-92-006` |
| Least-privilege identities | `DP-105-003` — api/worker/migration role separation per `SR-94-041`; `DP-105-004` — no per-customer database credentials, settling `HG-102-045` |
| Encryption and key boundaries | `DP-105-002`; `HG-102-039` **passes on all three candidates** (`EV-102-034`–`036`), and finding F2 records the create-time constraint with its `OI-105-001` sequencing consequence |
| Audit logs | `TD-103-030` places audit evidence in the datastore transactionally; evaluation §7.5 records how `HG-102-015` lands in this category; provider-side pgaudit capability is `OQ-105-006` |

The criterion asks that these be *evaluated*, and each row above is an
evaluation with a cited outcome. The open pgaudit question does not unseat it;
it is named rather than silently absorbed.

### AC3 — Backup retention, point-in-time recovery, restore testing, regional failure, maintenance, and recovery objectives are explicit

**Status: Partially met.**

| Sub-criterion | Status | Where |
| --- | --- | --- |
| Backup retention | **Explicit for C3 in writing** (7–35 days, expiry stated — `EV-102-033`, giving C3 `HG-102-013` and `HG-102-042` passes); C1/C2 ranges not yet retrieved (`OQ-105-002`); the CoBudget-side window value is `OI-105-002` | Evaluation §6; `DP-105-006` |
| Point-in-time recovery | **Met.** Documented on all three with new-instance restore semantics; granularity and log-shipping characteristics recorded | `EV-102-031`–`033` |
| Restore testing | **Explicit as required-and-blocked.** The performed restore is the `HG-102-040`/`041` observation; custody and reconciliation are `DP-105-007`; `OI-102-022` blocks any recovery *claim* | Evaluation §3; spec §5 |
| Regional failure | **Met.** Single-region acceptance stated with its off-region-recovery-impossible consequence made deliberate by `DP-105-009` | Operational §3.3 |
| Maintenance | **Met.** Windows, upgrade policy, and the expand-and-contract interaction | Operational §3.1 |
| Recovery objectives | **Met as questions, deliberately.** No approved RTO/RPO exists; `DP-105-008` records what bounds each and who owns the values (`ME-94-013`) | Spec §5 |

The same honest reading CBD-103 applied to its AC4 applies here: naming a value
as an open question makes the *requirement* explicit, not the value. Two
retrievals (`OQ-105-002`) and the observations close the gap.

### AC4 — Connection limits/pooling support API and worker workloads

**Status: Met (design).**

| Evidence | Where |
| --- | --- |
| Demand arithmetic: ≈ 0.017 requests+jobs/second at Base against two long-running units — three orders of magnitude of margin over single-digit pools | Operational §2 |
| Pooling capability evidenced symmetrically on all three candidates, with the tier and cost interactions named (Enterprise Plus; Burstable exclusion; separate proxy) | Finding F4; `EV-102-037`–`039` |
| Conclusion: no server-side pooler needed, therefore no tier forced by pooling under `CR0` | Operational §2 |
| Per-tier `max_connections` values not retrieved | `OQ-105-007`, `OI-105-012` |

### AC5 — Logical export and migration avoid proprietary data-model dependence

**Status: Met (design).**

| Evidence | Where |
| --- | --- |
| Exit format is community-PostgreSQL logical export; provider snapshots are recovery artifacts, never exit artifacts — reinforced by C3's documented non-exportable backups | `DP-105-011`; `EV-102-033` |
| Domain schema restricted to community types; no extension currently required | `DP-105-011` |
| Migration path: logical export → restore to any genuine PostgreSQL → configuration cutover, no customer action | Operational §4 |

## 3. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| Provider shortlist and comparison | **Met.** Two-property screen, four screened rows with reversibility stated, 24-gate matrix over three candidates, symmetric documentary pass | Evaluation §4–§6 |
| Encryption, access, backup, PITR, restore testing, maintenance, monitoring, and capacity assessment | **Met (design)** across the specification (§3–§6) and operational assessment (§2–§3), with the observation-bound parts named in evaluation §3 | Spec; Operational |
| Export/migration/deletion plan | **Met (design)** | `DP-105-011`, `DP-105-012`; Operational §4 |
| Full cost scenarios | **Partially met.** The `CT-102-*` structure is complete with every price line `UNKNOWN` under `CR4`; category-specific cliffs and tier interactions are named so pricing cannot be surprised by them. No price was retrieved, so no scenario carries figures | Operational §5 |

## 4. Dependencies satisfied

| Dependency | How consumed |
| --- | --- |
| Approved rubric and hard gates (CBD-102) | 24-gate matrix; verdicts per register §3.3; `CR0`–`CR7` and `R1`–`R5` applied; `EV-102-*` block allocation extends the register without collision |
| Hosting topology (CBD-103) | `TD-103-015`/`017`/`018`/`020`–`022`/`024`/`025`/`027`/`028`/`030` are load-bearing inputs throughout; the deferred database-access half of CBD-103's AC3 is settled by `DP-105-003`/`004`; the deferred restore path by `DP-105-007` |
| CBD-14 data classification (CBD-91) | `DP-105-001` places every class; CBD-91 §2.1 tiering excludes S4 from ordinary rows; `EG-91-001`–`003` consumed as explicit unknowns |

## 5. Follow-up register disposition

No `FU-95-*` row names CBD-105 as its target — the August 18, 2026 linkage
pass added pointer comments to every targeted issue, and CBD-105 received
none. The adjacent disposition worth recording: `FU-95-008`'s restore/redeploy
path, which CBD-103's traceability deferred to this subtask for the restore
half, is now specified at `DP-105-007`. Its closure evidence still requires
the exercised restore and rehearsal, which remain open with `OI-102-022`.

## 6. Consistency check against CBD-11, CBD-12, CBD-14, and CBD-103

| Approved decision | Source | Honoured by |
| --- | --- | --- |
| Historical periods preserved; schedule versions durable | CBD-11; Architecture § Key data rules | `DP-105-001` schema conventions; `TD-103-028` forward-only migrations |
| Integer minor units, UTC plus budget-space time zone | Architecture § Key data rules | `DP-105-001` |
| Server-side authorization at open and mutation time; no UI- or DB-delegated authority | CBD-72 `PM-72-002`; CBD-12 | `DP-105-004` — no RLS-as-authorization, no per-customer DB credentials |
| Factors and recovery secrets never in application storage | `DI-91-002`; CBD-14 | `DP-105-001` exclusion table |
| Provider tokens field-encrypted separately from ordinary data | Architecture § Security baseline; `DI-91-010` | `DP-105-001`/`DP-105-002` — ciphertext only, keys in KMS |
| Separated custody: no one combines data and keys or approves their own access | `OP-92-006`; `SR-94-069`; catalog §2.5.1 | `DP-105-002`, `DP-105-007` — CMK custody with the second principal |
| Restore reconciles deletion/consent/authorization before service | `OP-92-006`; `SR-94-081` | `DP-105-007` step 3; `DP-105-012` ledger reconciliation |
| Terminal deletion is never resurrected | `PA-92-006`; `TB-92-016` | `DP-105-012` — restore re-applies the `DI-91-045` ledger |
| Deletion completion fails closed and states its limits | `SR-94-124`; CBD-91 §5.1 | `DP-105-006` backup-horizon claims |
| Telemetry content-free; derived copies inherit sensitivity | `AN-92-003`; CBD-91 §4 rule 5 | `DP-105-010` — query text out of ordinary consoles |
| Audit evidence omission-detectable, transactional with effect | `SR-94-064`; `TD-103-030` | Spec §3; evaluation §7.5 |
| Single US deployment region | `OI-103-001` | `DP-105-009` — extended to backups, with the create-time caveat |
| Retention and deletion durations are open evidence gaps, not implementer choices | `EG-91-001`–`003`; CBD-91 §2.3 | `DP-105-006`, `DP-105-012`; `OI-105-002` |

No approved decision is reopened, weakened, or reinterpreted by this package.

## 7. What this package does not establish

* **No provider is selected, and none is selectable yet.** All three candidates
  hold `ELIGIBLE-PENDING-EVIDENCE`; the observations are authorized
  (`OI-103-008` resolution, extended to this category) but not performed.
* **No rubric total is published and no price is stated**, under the same rules
  as the hosting evaluation (`R4`/`R5`; `CR4`).
* **No retention window, RTO, or RPO value exists.** `OI-105-002`,
  `DP-105-008`, and `ME-94-013` own them.
* **Nothing is built, rehearsed, or restored.** Every `DP-105-*` decision is a
  design record; `EX-102-007`'s principle applies — a control that is
  CoBudget-side work is not effective until built and verified.
* **Recovery claims remain blocked** by `OI-102-022` — the second principal is
  still a defined, unfilled role.
* **No second person has reviewed this package**, and no provider was
  contacted.

## 8. Review record

| Property | Value |
| --- | --- |
| Reviewed by | Alexander Wohlford — Product Owner, August 20, 2026. |
| Independent review | None. |
| Provider contact | None. All evidence is desk research retrieved August 20, 2026. |
| Mechanical verification | `scripts/audit-cbd-105.py`; `scripts/check-doc-vocabulary.py` |
| Limitations | Evaluation §3 (evidence ceiling, remedy authorized), §3.1 (symmetry statement); Operational §5.1 (no prices); §7 above |
