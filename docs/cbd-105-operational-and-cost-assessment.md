# CBD-105 — Capacity, Maintenance, Monitoring, Cost, and Exit Assessment

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Records the operational and cost half of CBD-105 against the approved CBD-102 cost template. **It contains no prices**; §5 records every price line as unknown under cost rule `CR4`, with the tier interactions already known named so they are not discovered at pricing time. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-105](https://cobudget.atlassian.net/browse/CBD-105) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Data Protection and Recovery Specification v0.1; Candidate Shortlist and Gate Evaluation v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `6b1ac8e` |
| Last updated | August 20, 2026 |

## 1. Purpose

CBD-105's second and third deliverables require a maintenance, monitoring, and
capacity assessment and an export/migration/deletion plan with full cost
scenarios. This document is both, for the parts the Data Protection and
Recovery Specification does not already own: the specification fixes the
posture (`DP-105-*`); this records what operating it looks like and what it
costs to the extent evidence exists.

## 2. Capacity and connections

CBD-105's acceptance criterion 4 asks whether connection limits and pooling
support the API and worker workloads. The honest answer at Private MVP scale is
that the workloads are small enough for arithmetic:

| Input | Base | High | Source |
| --- | --- | --- | --- |
| API requests/month | 15,600 | 104,000 | `DM-102-024` |
| Background jobs/month | 29,280 | 315,000 | `DM-102-021` |
| Average combined rate | ≈ 0.017/s | ≈ 0.16/s | Derived: (15,600 + 29,280) ÷ 2,629,800 s |
| Deployment units holding pools | 2 (API, worker) | 2 | `TD-103-001` |

Even allowing three orders of magnitude between average and peak concurrency, a
client-side pool of single-digit connections per unit covers Base, and tens
cover High. Two consequences:

* **No server-side pooler is required at Private MVP scale**, on any candidate.
  The API and worker are long-running processes (`TD-103-001`), not
  per-request functions, so connection churn — the problem poolers solve — is
  structurally absent.
* **Therefore no tier is forced by pooling.** This matters because finding F4
  shows every candidate ties pooling to tier or cost somewhere: Cloud SQL's
  managed pooling requires Enterprise Plus (`EV-102-037`), Azure's built-in
  PgBouncer excludes the Burstable tier (`EV-102-039`), and RDS Proxy is a
  separately provisioned component with unstated cost (`EV-102-038`). Under
  `CR0` none of these forces the priced tier, because the gate set does not
  require a pooler.

What remains open is the other half of the criterion: per-instance
`max_connections` by instance size, which was not retrieved (`OQ-105-007`). The
conclusion above is robust to it — the smallest managed instances typically
allow more connections than this workload needs — but the pass-test standard
this project holds evidence to means the numbers get retrieved, not assumed.

Prepared-statement note for implementation: transaction-mode poolers constrain
protocol-level prepared statements (explicit on C1's mode limitations and C3's
`max_prepared_statements`). Since no pooler is needed, the typed-SQL layer can
use prepared statements freely; this constraint resurfaces only if a pooler is
ever introduced.

## 3. Maintenance, monitoring, and outage behaviour

### 3.1 Maintenance

Managed PostgreSQL means the provider patches the engine and the host. What
CoBudget operates is the window and the version policy:

* Maintenance windows are announced provider events; `WR-102-018` scores their
  predictability and notice. Single-region posture (`OI-103-001`) means a
  maintenance restart is a brief full outage of the datastore — the CBD-103
  outage table's "primary datastore" row — mitigated by scheduling, not by
  redundancy, in Private MVP.
* Major-version upgrades follow `WR-102-028` (cadence and notice, scored) and
  the `TD-103-028` expand-and-contract discipline on CoBudget's side: the
  application never requires a schema state the previous version cannot run
  against, which is also what keeps an engine upgrade rehearsable.

### 3.2 Monitoring

The monitoring posture follows `DP-105-010` and the three-boundary telemetry
model (`TD-103-021`):

| Surface | Content | Boundary |
| --- | --- | --- |
| Ordinary dashboard | Connections, CPU, storage, replication lag, backup success — content-free operational envelope | S1, `DI-91-041` |
| Query-insight features | Statement text and parameters — S3 by inheritance | Disabled, or text-capture excluded, per `HG-102-046` observation |
| Slow-query and error logs | May embed statements | Restricted diagnostics, `DI-91-062` |
| Backup verification | The `DP-105-007` rehearsal, not a green checkbox | Evidence, not telemetry |

C3's built-in PgBouncer metrics and logs (`EV-102-039`) are content-free pool
statistics and may join the S1 surface if that candidate and feature are ever
selected together.

### 3.3 Outage behaviour

The CBD-103 operational assessment §3 already records the datastore row: a
primary-datastore outage stops everything, and recovery is this category's
subject. What this document adds:

| Failure | Behaviour under the posture |
| --- | --- |
| Instance failure | Provider restart or failover within the region; zone-redundant options exist on the candidates and are scored (`WR-102-017`), not gated |
| Regional failure | Full outage for the region's duration. `DP-105-009` makes off-region recovery impossible **by design** during Private MVP — no geo-redundant backup exists to restore from. Accepted, visible consequence of the single-region posture. |
| Key inaccessibility | Every candidate documents a hard stop (F2): suspension or an inaccessible state. This is the emergency stop working as intended; recovery is key restoration, not data restoration. |
| Data corruption or bad deploy | PITR to a pre-event point under `DP-105-007` custody, into the isolated boundary, reconciled before release |
| Accidental deletion of the instance | Candidate-specific: C3 documents that deleting the server deletes its backups (`EV-102-033`), making resource locks part of the posture there; C1/C2 equivalents are inside `OQ-105-002` |

## 4. Export, migration, and deletion plan

The plan itself is `DP-105-011` and `DP-105-012`; operationally:

1. **Routine export capability** — proven by the same logical-dump path exit
   uses; exercising it is part of the restore rehearsal cadence
   (`OI-105-003`), so exit capability never decays into an assumption.
2. **Migration** — logical export → restore into the successor (any genuine
   PostgreSQL) → configuration cutover (`TD-103-027`). No customer action, no
   provider cooperation beyond egress.
3. **Deletion** — lifecycle-ledger-driven (`DI-91-045`), with completion claims
   stating the backup horizon per `DP-105-006`, failing closed per
   `SR-94-124`.
4. **Exit cost** — egress on the logical dump: `CT-102-014`, `UNKNOWN`. At 0.4
   GB Base the figure will be small; it is still recorded, not waved away.

## 5. Cost

### 5.1 No prices, same rule as hosting

No price was retrieved for any candidate; every `CT-102-*` line is `UNKNOWN`
under `CR4` and the evidence register's rule that an Asserted price is recorded
as unknown. What the demand model already establishes: at 0.4 GB Base / 4.1 GB
High (`DM-102-030`), cost is floor-dominated — the instance's smallest viable
tier and its per-seat and support terms will dwarf storage arithmetic.

### 5.2 Cost record structure

One record per candidate; identical structure; abridged here to the fields with
category-D content. Every unlisted `CT-102-*` line is `UNKNOWN`.

| Field | C1 Cloud SQL | C2 RDS | C3 Azure Flexible |
| --- | --- | --- | --- |
| Tier priced | `UNKNOWN` — no gate is yet known to force a tier | `UNKNOWN` — same | `UNKNOWN` — same; the `HG-102-009` Developer-support floor from hosting applies per provider account, not per category, and lands wherever Azure appears in the final set |
| Eligibility verdict | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |
| CT-102-003 seats × 2 | `UNKNOWN` — §2.5.1 second principal holds KMS custody; whether the DB product itself prices seats is a retrieval question | `UNKNOWN` | `UNKNOWN` |
| CT-102-006 primary unit (DB GB) | `UNKNOWN` × 0.4 GB Base | `UNKNOWN` | `UNKNOWN` — with up to 100% of provisioned storage as free backup storage documented (`EV-102-033`) |
| CT-102-007 secondary units | Instance hours, IOPS, backup GB, PITR log storage | Instance hours, IOPS, backup GB; RDS Proxy hours **if ever adopted** | Instance hours, IOPS, backup GB over the free allowance |
| CT-102-021 first overage threshold | `UNKNOWN` | `UNKNOWN` | Backup storage exceeding provisioned size is the first documented overage boundary |

### 5.3 Cost cliffs specific to this category

| Cliff | Why it is a cliff | Evidence |
| --- | --- | --- |
| Pooling-tier coupling | Cloud SQL managed pooling → Enterprise Plus; Azure PgBouncer → not Burstable; RDS Proxy → separate component. Dormant while no pooler is needed (§2); a future pooling need re-prices the candidate, not just adds a feature | `EV-102-037`–`039` |
| Geo-redundant backup | Doubles backup storage billing where enabled (documented for C3) — and `DP-105-009` disables it, so its *absence* is the posture; enabling it later on C3 means a new server | `EV-102-033` |
| CMK key operations | KMS key storage and operation fees exist on all three platforms; small, but per-key and per-operation, and the custody posture makes them non-optional | `EV-102-034`–`036`; amounts `UNKNOWN` |
| High-scenario storage | 0.4 → 4.1 GB is a tenfold move that stays inside most entry tiers; the cliff, if any, is IOPS or instance class, not GB | `DM-102-030` |
| Retention-window choice | Backup storage scales with the `OI-105-002` window and WAL volume — C3 documents that heavy transactional activity grows backup storage independent of database size | `EV-102-033` |

## 6. Open questions

Operational additions to the evaluation's §9 list; same carry-forward rule.

| ID | Question | Action |
| --- | --- | --- |
| OQ-105-008 | All `CT-102-*` price lines ×3 at the `CR0` gate-clearing tier | Blocked on completing the gate evidence; none currently forces a tier in this category |
| OQ-105-009 | Whether any candidate's cheapest viable tier restricts CMK, private networking, or PITR | The category-D version of the `CR0` trap: a capability the posture requires living on a higher tier **is** the price |
| OQ-105-010 | Instance-deletion protection mechanics ×3 (locks, deletion protection flags) | C3's backup-deletion-with-server behaviour makes this part of the posture; retrieve equivalents |

## 7. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-105-012 | The §2 connection arithmetic rests on demand-model figures whose confidence is Low and on retrieved pool defaults, not on per-tier `max_connections` values. | The conclusion has wide margin, but `OQ-105-007` retrieval closes it properly. |
| OI-105-013 | No budget ceiling exists (`OI-102-017`), and this category adds mandatory KMS costs on top of instance costs. | Same consequence as hosting: a fully evidenced recommendation can be unaffordable with no documented basis for exclusion. `CT-102-017`/`019` remain the watch figures. |
