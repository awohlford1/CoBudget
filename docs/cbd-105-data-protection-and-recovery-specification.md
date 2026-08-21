# CBD-105 — Data Protection and Recovery Specification

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026. Defines the recovery posture and data-protection boundary CBD-105 evaluates managed PostgreSQL providers against. It selects no provider; the candidate evaluation measures against it, and CBD-108 makes the selection. Product Owner approved v1.1 on August 21, 2026: it moves this package's evidence-register reservation out of a range a sibling evaluation had already registered records in, and changes no record, gate outcome, verdict, tally, or price. |
| Document version | 1.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-105](https://cobudget.atlassian.net/browse/CBD-105) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Candidate Shortlist and Gate Evaluation v1.1; Operational and Cost Assessment v1.1; Acceptance Criteria Traceability v1.1 |
| Confluence page | [CBD-105 — Data Protection and Recovery Specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12812289) |
| Repository baseline | `6b1ac8e` |
| Last updated | August 21, 2026 |

## 1. Purpose and authority

CBD-105 must select *"managed PostgreSQL and a recovery posture for sensitive
financial, consent, and audit data."* A provider cannot be measured against a
posture that has not been described, so this document describes it first and
the candidate evaluation measures providers against it.

Every decision carries a stable `DP-105-*` key and cites the approved source
that forces it, following the convention the CBD-103 topology established with
`TD-103-*`. Where no approved source settles a question — a retention window, a
recovery-time objective — this document says so and records an open item rather
than inventing a value.

The authoritative inputs are the approved CBD-102 method, the approved CBD-103
topology (`TD-103-*`), the CBD-91 data classification this subtask's dependency
names, the CBD-92 contracts and trust boundaries, the CBD-94 requirements, and
`docs/architecture.md`. `DP-105-*` numbers are never reused or renumbered.

## 2. What this document does not do

* It selects no provider and provisions nothing.
* It sets no retention, RTO, or RPO **value**. No approved source supplies one;
  §7 records what owns each.
* It closes no `EG-91-*` evidence gap — `EG-91-001`–`003` (retention and
  deletion durations, account deletion, budget-space deletion) remain open and
  are consumed here as explicit unknowns, exactly as CBD-91 §2.3 instructs:
  *"An evidence-gap ID is an explicit unknown, not permission to choose a value
  during implementation."*
* It implements nothing. Every decision is a design record.

## 3. What the datastore holds, and what it never holds

`DP-105-001` — **The primary datastore holds every application class; S4
material appears only as field-level ciphertext.**

The managed PostgreSQL instance is `SYS-92-004`, the primary application
datastore, holding the application classes CBD-91 assigns there: transactions
and their source observations (`DI-91-015`–`018`, `DI-91-068`), budget spaces,
memberships and authorization versions (`DI-91-004`, `DI-91-005`), schedules
and generated periods, plans, categories, bills, goals, comments, the
transactional outbox and job state the queue consumes (`DI-91-039`), the
customer-visible audit history (`DI-91-037` — transactionally, per
`TD-103-030`), the lifecycle completion ledger (`DI-91-045`), and archival
snapshots (`DI-91-075`).

What never appears in an ordinary row, per CBD-91 §2.1 and `SR-94-040`:

| Excluded | Why | Where it lives instead |
| --- | --- | --- |
| Authentication factors, recovery secrets | `DI-91-002` is IdP-only | The identity provider (CBD-104) |
| Provider connection secrets, plaintext | `DI-91-010` is S4 | Field-level ciphertext in the datastore; keys in the KMS boundary (`TD-103-018`) |
| Service credentials, signing keys | `DI-91-051` | Secret manager / KMS (`TD-103-017`) |
| Restricted diagnostics | `DI-91-062` | The separate diagnostic boundary (`TD-103-021`) |
| Raw webhook signature material | `DI-91-012` | Discarded at the edge (`TD-103-016`) |

Schema conventions follow `docs/architecture.md` § Key data rules directly:
integer minor units with a currency code, UTC timestamps with a budget-space
time zone, versioned schedule definitions generating concrete periods, and
historical periods preserved across schedule changes.

**Source:** CBD-91 §2.1, §3; `SYS-92-004`; `SR-94-040`; `TD-103-018`,
`TD-103-030`; `docs/architecture.md` § Key data rules.

## 4. Encryption and key custody

`DP-105-002` — **The database and its backups are encrypted under
customer-managed keys, from the first production instance onward.**

Provider-managed storage encryption alone leaves the provider holding both the
data and the keys, which gives the catalog §2.5.1 second principal nothing to
hold. Customer-managed keys (CMEK/CMK) place key custody in the hosting KMS
boundary (`TD-103-017`), where:

* the second principal can hold key-recovery custody as a `DI-91-072` recovery
  custodian **without** any path to customer content — the separation
  `HG-102-006` and `SR-94-069` require;
* backups inherit the same custody, so a backup copy is unreadable without a
  key the backup holder does not have (`HG-102-039`);
* key disablement is an effective emergency stop: on every evaluated candidate,
  revoking key access suspends or makes the instance inaccessible.

**This is a create-time decision on every evaluated candidate, and that fact is
load-bearing.** The candidate evaluation's finding F2 records the evidence:
Cloud SQL cannot enable CMEK on an existing instance, RDS encrypts only at
creation, and Azure selects the mode *"only at server creation time."*
Retrofit means a snapshot-copy or restore migration on every platform. The
first production instance must therefore be created with CMK, not upgraded to
it later.

One custody interaction is deliberate: on AWS, sharing an encrypted snapshot to
another account — the isolated-restore route — is impossible under the
provider's own managed key and requires a customer-managed key. The CMK posture
is what makes `DP-105-007` executable there at all.

**Source:** `OP-92-006`; `SR-94-069`; catalog §2.5.1; `HG-102-006`,
`HG-102-039`; `DI-91-051`, `DI-91-072`; `TD-103-017`, `TD-103-018`,
`TD-103-020`; Architecture § Security baseline; evaluation finding F2.

`DP-105-003` — **Connectivity is private, TLS-enforced, and role-separated.**

* The instance is reachable only from the API and worker units over private
  networking, with no public endpoint (`TD-103-015`; `TB-92-006`).
* TLS is required on every connection.
* Three database roles, least-privilege per `SR-94-041`: an **api** role and a
  **worker** role holding data-manipulation rights on application schemas only,
  and a **migration** role holding schema-change rights, used exclusively by
  the deployment pipeline (`TD-103-028`). No application path holds superuser.
* Authentication uses the platform's workload-identity mechanism where the
  selected provider supports it, falling back to secret-manager-held
  credentials under `TD-103-017` rotation (`SR-94-042`) otherwise.

**Source:** `TD-103-015`, `TD-103-017`; `TB-92-006`; `SR-94-041`, `SR-94-042`;
CBD-103 acceptance criterion AC3 (database-access half deferred to this
document).

`DP-105-004` — **Authorization stays in the application; database identities
are workload identities.** *(Settles Config gate `HG-102-045`.)*

Row-level access decisions are never delegated to the database's own end-user
identity model. `PM-72-002` requires server-side evaluation of current
membership, role, resource, field, consent, lifecycle, and version at open and
mutation time — inputs the database does not hold. Therefore:

* No per-customer database credentials, ever. The api and worker roles are the
  only DML principals.
* PostgreSQL row-level security is not used as the tenant-isolation mechanism.
  Tenant scoping is parameter-bound in every query under `TB-92-006`, decided
  by the `SYS-92-003` policy path.
* A provider pattern that pushes tenant isolation into client-issued database
  credentials is a design violation here regardless of vendor support.

**Source:** `HG-102-045`; CBD-72 `PM-72-001`, `PM-72-002`, `PM-72-010`, §8;
`TB-92-006`; `SYS-92-003`/`SYS-92-004`.

## 5. Backup, recovery, and the restore boundary

`DP-105-005` — **Backup coverage is total or explicitly excepted.**

`DI-91-044` requires that *"every persisted non-secret server class is included
or has"* an explicit exclusion. The backup inventory therefore enumerates every
`DP-105-001` class as covered, and records exactly one deliberate exclusion:
secret and key material, which recovers through the separate `DI-91-072`
KMS-recovery boundary, never through database backups.

**Source:** `DI-91-044`; `TB-92-015`; `SYS-92-015`; `DI-91-072`.

`DP-105-006` — **Point-in-time recovery is required; the retention window is an
open value; purge completion is evidenced, not assumed.**

* PITR capability is gated (`HG-102-042`) and continuous log capture bounds the
  achievable recovery point.
* **No approved source sets the retention-window value.** `EG-91-001` holds
  retention durations open across the inventory. The window is chosen at
  provisioning under `OI-105-002`, not silently here.
* Backup retention interacts with deletion truthfully: a deleted record
  persists in backups until they expire. Every deletion-completion claim
  therefore states its backup horizon — *deleted from live state now; falls
  out of recoverable backups when the last containing backup expires* — using
  the provider's stated retention and expiry, which is exactly what
  `HG-102-042` requires be obtained in writing. A completion claim that cannot
  state its horizon fails closed, per `SR-94-124`.

**Source:** `HG-102-042`; `DI-91-044`, `DI-91-045`; `EG-91-001`; `SR-94-121`,
`SR-94-124`; CBD-91 §5.1 provider row.

`DP-105-007` — **Restore lands in an isolated boundary, under separated
custody, and reconciles before release.**

The restore path, end to end:

1. **Target** — a restore creates a *new* instance in a dedicated isolated
   boundary (a separate project/account/subscription), outside the three
   `TD-103-024` environments, per `TD-103-025`. Every evaluated candidate
   restores to a new instance rather than in place; the evaluation's finding F3
   records how isolated the target can be made per candidate.
2. **Custody** — the operator executes the restore; the §2.5.1 second principal
   approves return to service and never executes; neither combines data and
   keys (`OP-92-006`, `SR-94-069`, `TD-103-020`).
3. **Reconciliation** — before anything returns to service, the restored state
   is reconciled against the current deletion, consent, session, membership,
   link, connection, job, package, notification, and authorization state, per
   `OP-92-006` and `SR-94-081`. A `PA-92-006` terminal deletion is never
   resurrected by a restore; the `DI-91-045` ledger is the reconciliation
   input.
4. **Rehearsal** — the architecture baseline requires tested backup restoration
   before public launch. The rehearsal exercises this exact path. Its cadence
   has no approved value (`OI-105-003`), and `OI-102-022` — the unfilled second
   principal — blocks any claim that recovery *works*, exactly as it did in
   CBD-103.

**Source:** `OP-92-006`; `SR-94-081`; `TB-92-015`; `SYS-92-015`, `SYS-92-016`;
`PA-92-005`–`007`; `TD-103-020`, `TD-103-024`, `TD-103-025`;
Architecture § Security baseline; `HG-102-040`, `HG-102-041`.

`DP-105-008` — **Recovery objectives are explicit as questions, because no
approved source supplies values.**

CBD-105's acceptance criteria require recovery objectives to be *explicit*.
Honestly stated:

| Objective | What bounds it | Value status |
| --- | --- | --- |
| Recovery point | Continuous WAL/log capture; two candidates document ≤ 5-minute log shipping | **No approved RPO exists.** `ME-94-013` owns the eventual recovery architecture evidence |
| Recovery time | Restore provisioning plus log replay; providers document minutes-to-hours without commitment | **No approved RTO exists.** Demand model `OI-102-009` records the model is not fit for an SLO |
| Rehearsal proof | `HG-102-040` requires a performed restore, not an asserted one | Blocked on the authorized observations and on `OI-102-022` |

Recording a number here would manufacture an SLO no approved document supports.
What the evaluation records instead is each provider's *capability envelope*,
so that when CBD-94's `ME-94-013` work sets objectives, the selected provider's
envelope is already known to contain them.

**Source:** `ME-94-013`; `OI-102-009`; `HG-102-040`; CBD-105 acceptance
criterion 3.

`DP-105-009` — **Single-region posture extends to backups: no geo-redundant
backup in Private MVP.**

`OI-103-001` fixed a single US deployment region. A geo-redundant backup places
a continuously replicated copy of every S3 class in a second region, which:

* widens the `HG-102-011` disclosure surface to a region CoBudget does not
  operate in;
* contradicts the single-region residence posture without any approved source
  asking for it — no RTO/RPO exists that cross-region recovery would serve
  (`DP-105-008`);
* is, on at least one candidate, a **create-time-only** choice (Azure
  configures geo-redundant backup only at server creation), so deferring the
  decision is not available — it must be decided before the first instance
  exists.

Backups therefore use the provider's in-region redundancy (zone-redundant where
offered). Multi-region recovery is a re-evaluation trigger alongside
`OI-103-001`'s, not a Private MVP option. Regional failure consequently means
what CBD-103's outage assessment already records: a full outage, bounded by
provider region recovery, with off-region recovery impossible by design during
Private MVP. That consequence is accepted and visible rather than implied.

**Source:** `OI-103-001`; `HG-102-011`; `DI-91-044`; CBD-103 operational §4;
evaluation `EV-102-033`.

## 6. Telemetry, monitoring, and export

`DP-105-010` — **Query text never reaches an ordinary vendor console.**

Statement text and bound parameters carry S3 financial values, free text, and
identifiers; CBD-91 §4 makes a derived copy inherit the sensitivity of its
inputs, and `AN-92-003` excludes all of it from the S1 allowlist. Therefore:

* Provider query-insight features that capture statement text (each candidate
  offers one) are disabled, or configured so query text and parameter values
  are excluded — whichever the observation under `HG-102-046` shows the
  provider can actually enforce.
* Slow-query and error logs that may embed statements route to the restricted
  diagnostics boundary (`DI-91-062`, `TD-103-021`), never the S1 stream.
* What the ordinary operator dashboard shows is the content-free envelope:
  connections, storage, CPU, replication lag, backup success — `DI-91-041`
  material.

**Source:** `HG-102-046`; `AN-92-003`; `DI-91-041`, `DI-91-062`; CBD-91 §4
rule 5; `TD-103-021`, `TD-103-022`.

`DP-105-011` — **Export and exit are logical, standard, and proprietary-free.**

* The exit format is PostgreSQL logical export — `pg_dump`/`pg_restore` or
  logical replication — restorable to any genuine PostgreSQL target. This is
  what CBD-105's acceptance criterion 5 demands: no proprietary data-model
  dependence.
* The domain schema uses community-PostgreSQL types and features only. Any
  extension must exist in community PostgreSQL or be portable across every
  evaluated candidate; none is currently required.
* Provider snapshot formats are treated as recovery artifacts, not exit
  artifacts — at least one candidate documents that its backups cannot be
  exported at all, which is exactly why exit never depends on them.
* Exit executes as: logical export → restore into the successor → cutover by
  configuration under `TD-103-027`. No customer action is required, preserving
  hosting-category portability asymmetry recorded in CBD-103 operational §8.

**Source:** CBD-105 acceptance criterion 5; Architecture § Proposed stack
(typed SQL layer); `WR-102-023`–`026`; `TD-103-027`; evaluation `EV-102-033`.

`DP-105-012` — **Deletion propagates on a ledger, and restores cannot undo
it.**

The `SA-92-008` lifecycle orchestrator applies each class-specific disposition
in dependency order and records completion in the `DI-91-045` ledger. For the
datastore specifically:

* Live rows delete or tombstone per their approved disposition (for example,
  the CBD-72 30-day manual-transaction window and its minimal tombstone).
* Backup copies age out on the `DP-105-006` horizon; the ledger holds the
  per-class completion state including that horizon.
* A restore under `DP-105-007` reconciles against the ledger, so a terminal
  `PA-92-006` state survives its own backup: restoring data from before a
  deletion does not resurrect the deleted state, because reconciliation
  re-applies the ledger before release.
* Unresolved lifecycle designs stay unresolved: `EG-91-002` (personal-account
  deletion) and `EG-91-003` (budget-space deletion) are consumed as open, and
  nothing here narrows them.

**Source:** `SA-92-008`; `PA-92-001`–`008`; `DI-91-045`; `SR-94-121`,
`SR-94-124`; `TB-92-016`; `EG-91-001`–`003`; CBD-72 §5.6.

## 7. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-105-001 | `DP-105-002` makes customer-managed keys a create-time requirement, and finding F2 shows retrofit is a migration on every candidate. | The first production instance must be provisioned with CMK. This constrains CBD-19 and CBD-120 execution order: KMS setup precedes database creation. |
| OI-105-002 | The PITR retention-window value has no approved source (`EG-91-001`). | Chosen at provisioning as a Product Owner decision, recorded with its deletion-horizon consequence per `DP-105-006`. |
| OI-105-003 | Restore-rehearsal cadence has no approved source; the architecture baseline fixes only "before public launch". | A rehearsal must be scheduled before launch; cadence is an operating decision. `OI-102-022` blocks any recovery claim until the second principal exists. |
| OI-105-004 | `DP-105-009` extends single-region posture to backups and notes the choice is create-time-only on at least one candidate. | Confirm at provisioning. Reversing it later on Azure means a new server. |
| OI-105-005 | No approved RTO or RPO exists (`DP-105-008`). | `ME-94-013` and CBD-94 own the values. The evaluation records capability envelopes so a later objective can be checked against the selected provider without re-evaluation. |
| OI-105-006 | This specification has been reviewed by no one but its author, and nothing in it is built. | Design record only. The independent security review required before public launch remains outstanding. |
