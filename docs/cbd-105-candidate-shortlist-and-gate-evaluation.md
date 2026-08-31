# CBD-105 — PostgreSQL Candidate Shortlist and Gate Evaluation

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026. Applies the approved CBD-102 method to managed PostgreSQL candidates. It selects no provider; CBD-108 does that. No candidate reaches `ELIGIBLE` until the authorized observations are performed — §3 records why, and the remedy is already authorized. Product Owner approved v1.1 on August 21, 2026: it moves this package's evidence-register reservation out of a range a sibling evaluation had already registered records in, and changes no record, gate outcome, verdict, tally, or price. v1.2 reuses the CBD-103 cross-category documentary pass: four documentary gate outcomes move, **no verdict does**, and §7.6 records that Customer Lockbox may not cover Flexible Server at all. **v1.4 re-measures `HG-102-013` against CBD-102 v1.3. C3's `PASS` holds and is better supported; C2 now `FAIL`s for want of a provider-stated retention ceiling and is `INELIGIBLE`; C1 remains `UNPROVEN` on an unretrieved equivalent.** |
| Document version | 1.4 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-105](https://cobudget.atlassian.net/browse/CBD-105) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Data Protection and Recovery Specification v1.2; Operational and Cost Assessment v1.1; Acceptance Criteria Traceability v1.3 |
| Confluence page | [CBD-105 — PostgreSQL Candidate Shortlist and Gate Evaluation](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12845057) |
| Repository baseline | `598dbbb` |
| Last updated | August 22, 2026 |

## 1. Purpose

CBD-105's first deliverable is a provider shortlist and comparison for the
managed PostgreSQL category. This document is that comparison. It measures
candidates against the 24 CBD-102 hard gates that apply to category **D** —
the 15 cross-category **X** gates plus the 9 **D** gates — using the evidence
classes and verdicts the CBD-102 evidence register fixes, against the posture
the companion Data Protection and Recovery Specification describes.

## 2. What this document does not do

* It selects and recommends nothing; `CR3` and rubric `R1` settle order by
  verdict, not by score or cost.
* It provisions nothing and creates no account.
* It publishes no weighted rubric total, for the reasons CBD-103's evaluation
  §8 records; they apply here unchanged. The evidence-confidence profile is
  dominated by Absent evidence, and a total would describe research effort, not
  providers.
* It closes no `EG-91-*` evidence gap and no `RF-92-*` review finding.

## 3. The evidence ceiling, inherited with its remedy

The structural finding of CBD-103's evaluation §3 applies to this category
identically: gates whose pass tests demand a live-account observation cannot be
settled by documentation, so every candidate's verdict is capped until the
observations run. Eight of the 24 applicable pass tests are observation-bound:
four **X** gates (`HG-102-001`, `HG-102-004`, `HG-102-012`, `HG-102-015`) and
four **D** gates:

| Gate | The observation its pass test names |
| --- | --- |
| `HG-102-038` | *"A transactional outbox write is exercised"* |
| `HG-102-040` | *"A restore is performed and verified in the evaluation"* |
| `HG-102-041` | *"An isolated restore target is created"* |
| `HG-102-046` | *"Captured slow-query or statement logs are inspected"* |

**The remedy already exists.** `OI-103-008` was resolved by Product Owner
decision on August 20, 2026, recorded on the CBD-15 ticket: non-production
evaluation accounts holding only synthetic data are authorized solely to
execute these pass tests, under five guardrails, and the decision states
explicitly that it extends to the sibling categories including this one. No
new decision is needed. Until the observations are performed, every candidate
below terminates at `ELIGIBLE-PENDING-EVIDENCE`, and the four D observations
can share the evaluation accounts and sessions the H observations use.

### 3.1 Symmetry

The documentary pass in this evaluation was **symmetric by design** for every
question it asked: point-in-time recovery, key custody, and connection pooling
were each put to all three candidates and answered from each vendor's own
documentation (`EV-102-031`–`039`). Gates not yet asked are symmetric by
omission and appear identically as `UNPROVEN` with an open question. The
asymmetry `OI-103-009` recorded for the hosting pass is thereby not repeated;
the reused provider-level records (`EV-102-001`–`006`) retain the asymmetry
they had, which their limitation notes carry.

## 4. Screening

### 4.1 The screen

Category D screens on two published, checkable properties:

1. **Genuine PostgreSQL** — `HG-102-038` requires full transactional semantics
   sufficient for the outbox pattern, and `DP-105-011` requires a
   community-PostgreSQL exit format. A wire-compatible re-implementation
   carries a genuineness question the gate must answer before anything else
   matters.
2. **Topology pairing** — `TD-103-015` places the datastore behind private
   networking reachable only from the application units, and CBD-15's
   acceptance criteria prohibit contradictory networking assumptions in the
   combined set. A database vendor independent of the hosting shortlist adds a
   subprocessor (`HG-102-011`), its own full 15-gate **X** pass, and a
   cross-cloud private-networking question — roughly doubling the evaluation
   for a category the demand model prices at 0.4 GB.

**A screen is not a verdict.** Nothing below is recorded as `INELIGIBLE`, and
every screening row is reversible if the hosting shortlist changes or a
catalogue claim proves wrong.

### 4.2 Screened out

| Candidate | Screen | Basis |
| --- | --- | --- |
| Amazon Aurora (PostgreSQL-compatible) | 1 | Wire-compatible with a re-engineered storage layer; the genuineness question `HG-102-038` exists to answer is live for it. RDS for PostgreSQL is the same provider's genuine-PostgreSQL offering, so evaluating Aurora would add the question without adding a provider. Revisit only if RDS for PostgreSQL fails a gate Aurora could pass. Not separately evidenced. |
| AlloyDB for PostgreSQL | 1 | Same reasoning on the same provider; Cloud SQL for PostgreSQL is the genuine-PostgreSQL offering. (Access Transparency covers both, per `EV-102-030`.) Not separately evidenced. |
| Neon, Supabase, Crunchy Bridge, Aiven, DigitalOcean managed PostgreSQL | 2 | Independent vendors: each adds a subprocessor, a full **X**-gate pass, and a cross-cloud private-networking question against `TD-103-015`. Deferred, not disqualified; reversible if the hosting shortlist changes. Not separately evidenced. |
| Self-managed PostgreSQL on IaaS | — | Contradicts the managed premise of CBD-15 and moves backup, patching, and recovery onto the single operator that rubric `WR-102-027`–`031` exists to protect. |

Every row marked *not separately evidenced* rests on published product
positioning rather than registered evidence, exactly as the hosting screen's
§4.2 rows did; `OQ-105-001` carries the confirmation obligation.

### 4.3 Carried into gate evaluation

Candidate identifiers reuse the provider identities from the hosting
evaluation, because each database candidate is evaluated as paired with its
provider's hosting composition; CBD-108 owns cross-category coherence.

| ID | Candidate | Pairing |
| --- | --- | --- |
| **C1** | Cloud SQL for PostgreSQL | Google Cloud hosting composition |
| **C2** | Amazon RDS for PostgreSQL | AWS hosting composition |
| **C3** | Azure Database for PostgreSQL Flexible Server | Azure hosting composition |

## 5. Gate evaluation method

Identical to the hosting evaluation §5: outcomes are `PASS`, `UNPROVEN`, or
`FAIL` per evidence register §3.3, with Config gates recorded `PASS (design)`
where the specification settles CoBudget's side — here `HG-102-014`
(`TD-103-017`/`018`/`022`) and `HG-102-045` (`DP-105-004`). A `PASS (design)`
asserts provider eligibility, not that CoBudget built anything; CBD-94
verification proves the build.

Reused provider-level evidence: `EV-102-001`–`006` were retrieved for the
hosting category but state provider-level facts. Where an **X** gate's claim is
provider-level, the record supports it here with a limitation noting the reuse.

## 6. Comparison matrix

`OBS` marks a gate blocked on the §3 observations. `DOC` marks one
documentation or a contract can settle. `CFG` marks a Config gate.

### 6.1 Cross-category gates

| Gate | Kind | C1 Cloud SQL | C2 RDS | C3 Azure Flexible | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-001 telemetry allowlist | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. |
| HG-102-002 correlation identifiers | DOC | `PASS` | `PASS` | `PASS` | Not retrieved. Shared with `OQ-103-001`. **Asked of the hyperscalers at v1.1 and it separates them.** C2 `EV-102-177`: a 96-bit random trace ID plus timestamp scoped to *"a single client request"*, with `user` an **optional** field the customer populates — no default persistence mechanism exists. C1 `EV-102-179`: W3C `traceparent`, 128-bit, and no end-user identifier mentioned anywhere. C3 `EV-102-178` is the exception and stays `UNPROVEN`: `operation_Id` is per-operation and clean, but the same data model defines an anonymous `user_Id` that the JavaScript SDK *"typically persists... in a user cookie"* and that feeds *"sampling score generation"*. Not required, and engaged by the browser SDK rather than server-side telemetry, so the reading is `OI-103-021` and not a `FAIL`. |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Shared with `OQ-103-002`. |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. |
| HG-102-005 no standing credential | DOC | `PASS` | `UNPROVEN` | `PASS` | **C3 settled at v1.2 by the same provider-level reuse this row already used for C1.** C1 `EV-102-006` (Privileged Access Manager). C3 `EV-102-011` (Privileged Identity Management — native, just-in-time, time-bound with start and end dates, approval, justification, downloadable audit history). C2 `EV-102-008`: AWS ships no native equivalent and validates four partner products instead — not a `FAIL`, but reachable only by buying a third party (`OI-103-017`). |
| HG-102-006 separable custody | DOC | `PASS` | `UNPROVEN` | `PASS` | Partial material at v1.2, none of it sufficient for the four-way split. C2 `EV-102-009`: under AWS owned keys — the default for new services since 2021 — key policies cannot be changed and key activity is *"Not viewable by the customer"*, which compounds the broad-admin observation already recorded at `EV-102-035`. C3 `EV-102-163`: Managed HSM is *"a customer-owned security domain where Microsoft has no access to your key material"*, alongside the explicit separation-of-duties statement at `EV-102-036`. **Re-measured at v1.3 against the amended pass test** (catalog §12.1, resolving `OI-103-020`): restore approval is now satisfied by approval bound to activation of the restoring role. **C1 and C3 pass in this category, where backup and restore are the subject and the evidence covers the service.** C1: `EV-102-173` separates `cloudsql.backupRuns.get` from `cloudsql.instances.restoreBackup`, `EV-102-034` covers key custody, and `EV-102-006` supplies approval-on-activation through Privileged Access Manager. C3: `EV-102-171` gives Backup Reader, Backup Operator and Backup Contributor as distinct roles, `EV-102-036` covers CMK with an explicit separation-of-duties statement, and `EV-102-011` supplies approval through Privileged Identity Management. C2 stays `UNPROVEN`: AWS separates backup from restore at the policy level (`EV-102-172`) but has no native approval mechanism, which is the same partner dependency `OQ-103-027` carries. **Firm** under catalog §2.5; `OI-102-022` is deferred to build against a precondition (catalog §2.5.1) and still gates practice. `HG-102-039` below covers the category-D key half. **Asked symmetrically of all three hyperscalers at v1.1 and the answer is uniform**: backup read, restore execution and key use are separable on every one of them, and **none documents a restore-approval permission at all**. The hosting evaluation records the comparison and the reading question it raises at `OI-103-020` — read strictly, this firm gate is unsatisfiable by any hyperscaler, which mirrors the carrier half of `HG-102-074`. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Both hyperscaler positions now on the record, both `Asserted`, which §3.2 cannot convert to a `PASS`. C2 `EV-102-001`, `EV-102-010`. C3 `EV-102-167`: *"Microsoft engineers don't have default access to cloud customer data"*, qualified by *"minimizing standing access to production data"*. C1 not retrieved. |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Same position as the hosting evaluation, and now specific rather than general: both trust pages retrieved for `HG-102-007` were checked for this gate and **neither addresses impersonation, break-glass, or unrestricted query** — `OQ-103-023`. |
| HG-102-009 staff-access evidence | DOC | **`PASS`** | `UNPROVEN` | `UNPROVEN` | `EV-102-002`–`004` + `EV-102-030`: Cloud SQL is Access Transparency-covered at GA. **C3's position is now precisely characterizable and it is not good — see §7.6.** `EV-102-012` retrieves the complete Customer Lockbox supported-services list: it names "Azure Database for PostgreSQL" but **not** "Azure Database for PostgreSQL Flexible Server", while naming "Azure Database for MySQL" and "Azure Database for MySQL Flexible Server" separately. **Resolved at v1.2 and the answer is no**: the Microsoft cloud security benchmark baseline for this exact service marks Customer Lockbox Supported **False** under control PA-8 — *"This feature is not supported to secure this service"* (`EV-102-175`). `OI-103-019` is closed by retrieval rather than by decision. **C3 has no Customer Lockbox coverage for this candidate.** C2 `EV-102-010`: visibility scoped to *"on behalf of"* operations — `OI-103-018`. See §7.1. |
| HG-102-010 encryption in transit and at rest | DOC | `PASS` | `PASS` | `PASS` | **Settled for two of three at v1.2.** v1.0 had the service-level key facts (`EV-102-034`–`036`) but not the algorithm-and-custody statements the pass test demands, because those records were retrieved against `HG-102-039`. The provider-level pass supplies the missing half. C1 `EV-102-164` (*"AES-256 by default"*, AES-GCM, *"We own and manage the keys"*) with `EV-102-165` (ALTS, PSP) and CMEK at `EV-102-034`. C3 `EV-102-162` (AES-256 DEK, KEK never leaving Key Vault) with `EV-102-163` (MACsec, AES-256, SHA-384) and CMK at `EV-102-036`. C2 `EV-102-009` names 256-bit AES-GCM and `EV-102-035` covers RDS. **C2 settled at v1.1 by a later retrieval in the same pass**: `EV-102-174`, the current EC2 data-protection page, states *"All data flowing across AWS Regions over the AWS global network is automatically encrypted at the physical layer before it leaves AWS secured facilities"*, *"All traffic between AZs is encrypted"*, and the TLS floor *"We require TLS 1.2"*. It supersedes the historical whitepaper, which is no longer relied on for anything. C3 additionally gains service-level confirmation at `EV-102-176`: encryption at rest with service-managed keys *"covers the primary server, replicas, point-in-time-recovery (PITR), and backups"*, which is the per-service assurance the provider-level records could not give. |
| HG-102-011 region and subprocessors | DOC | `UNPROVEN` | `PASS` | `UNPROVEN` | **Settled for C2 at v1.2.** `EV-102-007`: an enumerated AWS-wide list dated "Last Updated: July 28, 2026" on the page, with a 30-day advance-notice commitment and region scoping. C1 and C3 remain `UNPROVEN` because neither list was **obtained** — Google's page defeated retrieval three times and Microsoft's sits on the Service Trust Portal (`OQ-103-018`). Both are CoBudget-side retrieval gaps, not vendor silence. |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | **`FAIL`** | **`PASS`** | **Re-measured against v1.3 on August 30, 2026.** **C3's `PASS` holds and is now better supported**: `EV-102-033` is joined by the Flexible Server backup record CBD-108 §4.28 carries, which states all three elements — retention 7 to 35 days, expiry *"automatically deleted after the retention period"*, and zone-redundant storage restricting replication *"to within a country or region"*. **C2 now fails.** CBD-108 §4.30 establishes RDS retention as *"the retention period that is in effect for the DB instance at the time when you delete it"* — customer-configured, with **no provider-stated ceiling**, which v1.3 requires before a customer-set period can satisfy the gate. **C1 remains `UNPROVEN`**: the Cloud SQL equivalent was never retrieved (`OQ-105-002`), so this is absent evidence rather than evidence of absence. |
| HG-102-014 S4 out of ordinary surfaces | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `TD-103-017`, `TD-103-018`, `TD-103-022`; `DP-105-001`. Non-exceptable. |
| HG-102-015 append-only evidence | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. §7.5 records the category-D interpretation. |

### 6.2 PostgreSQL gates

| Gate | Kind | C1 Cloud SQL | C2 RDS | C3 Azure Flexible | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-038 genuine PostgreSQL | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — the outbox write is the pass test. All three are the provider's genuine-PostgreSQL offering by positioning; version-page confirmation is `OQ-105-003`. |
| HG-102-039 separable key custody | DOC | `PASS` | `PASS` | `PASS` | `EV-102-034`–`036`: customer-managed keys with key administration in a permission system distinct from database administration, on all three. See §7.2. |
| HG-102-040 tested restore | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Backup encryption is documented on all three; the *performed* restore is the test. |
| HG-102-041 isolated restore | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. §7.3 records the documented isolation shape per candidate — materially different. |
| HG-102-042 PITR, retention, expiry in writing | DOC | `UNPROVEN` | `UNPROVEN` | **`PASS`** | `EV-102-031`–`033`. PITR documented on all three; only `EV-102-033` states retention range (7–35 days), RPO characterization (≤ 5 min), and expiry in one dated source. `OQ-105-002` completes C1/C2. |
| HG-102-043 no staff browsing | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Support-model pages not retrieved for the database services; `OI-102-005` flagged this gate as assertion-prone. |
| HG-102-044 replica and region placement | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Incidental replica statements appear in `EV-102-035`/`036` but a symmetric replica-placement retrieval was not performed; `OQ-105-004`. |
| HG-102-045 no DB-delegated authorization | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `DP-105-004`. |
| HG-102-046 query telemetry constrained | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Each candidate ships a query-insight feature; whether statement text can be excluded is precisely the observation. |

### 6.3 Tally

The 24 applicable gates divide by evidence kind into 8 `OBS`, 14 `DOC`, and 2
`CFG`. Every figure in this table is recomputed from the §6.1 and §6.2 tables
by `scripts/audit-cbd-105.py`, so it cannot drift from the matrix it
summarizes.

| | C1 | C2 | C3 |
| --- | --- | --- | --- |
| `PASS` | 6 | 4 | 7 |
| `PASS (design)` | 2 | 2 | 2 |
| `UNPROVEN` | 16 | 17 | 15 |
| `FAIL` | 0 | 1 | 0 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `INELIGIBLE` | `ELIGIBLE-PENDING-EVIDENCE` |

**v1.2 moved five documentary outcomes and no verdict.** C1 gained
`HG-102-010`; C2 gained `HG-102-011` and `HG-102-010`; C3 gained `HG-102-005`
and `HG-102-010`. All three remain capped by the eight observation gates in §3.

No candidate carries a `FAIL`, so no compensating control, exception, or
residual-risk record is required, and nothing in exception rules §5 is engaged.

## 7. Findings that survive the evidence ceiling

### 7.1 `HG-102-009` inverts partially for Azure in this category

The hosting evaluation found C3's Customer Lockbox unable to cover three of its
composition primitives. In category D the primitive **is** covered:
`EV-102-005`'s supported-services list includes *"Azure Database for
PostgreSQL"* by name. Two things still keep C3 at `UNPROVEN` here:

* The gate requires evidence of *"actions and result"* — what the engineer did.
  Lockbox's documented records cover the request lifecycle: create, approve,
  deny, expiry. Action-level evidence obtainable by the customer is not
  established by the retrieved material.
* The list names the service without naming the Flexible Server deployment
  mode; confirmation belongs with the same Microsoft conversation `OQ-103-006`
  already requires.

C1 passes outright: `EV-102-030` places Cloud SQL (and AlloyDB and Spanner) at
GA in the Access Transparency supported-services list, with log content per
`EV-102-002`. C2's position is unchanged from hosting: internal traceability
asserted, customer-obtainable evidence not established (`EV-102-001`).

### 7.2 Key custody is separable everywhere — and a create-time decision everywhere

All three candidates document customer-managed keys whose administration lives
in a permission system distinct from database administration: Cloud KMS IAM
(`EV-102-034`), AWS KMS key policies with CloudTrail audit (`EV-102-035`), and
Azure Key Vault RBAC — whose documentation states the separation-of-duties
benefit outright (`EV-102-036`). All three document a hard stop when the key is
revoked: suspension (C1), a recoverable-then-terminal inaccessible state (C2),
or an Inaccessible state within about an hour (C3). That is `HG-102-039`
satisfied on Documented evidence, three for three.

The same three records establish **finding F2**, which `DP-105-002` builds on:
CMEK/CMK cannot be enabled on an existing instance on any candidate. Cloud SQL:
*"You can't enable customer-managed encryption keys on an existing instance."*
RDS: *"You can only encrypt an Amazon RDS DB instance when you create it."*
Azure: *"You can select the mode only at server creation time."* Each offers
only a migration-shaped workaround (snapshot-copy or restore-to-new-server).
Key custody is therefore decided the day the first instance is created, and
`OI-105-001` sequences KMS setup before database creation.

### 7.3 The isolated-restore shape differs materially per candidate — F3

`HG-102-041`'s observation is blocked, but the documented shape of the restore
target is not, and it differs:

* **C1** — PITR *"always creates a new instance"*, and with enhanced backups a
  restore can land *"in a project other than"* the source's (`EV-102-031`).
  A separate project is exactly the isolation boundary `TD-103-024` uses, so
  the documented shape matches `DP-105-007` directly.
* **C2** — restore creates a new instance *"without modifying the source"*
  (`EV-102-032`), but in the same account; the separate-boundary route is
  cross-account snapshot sharing, which `EV-102-035` shows is **impossible
  under the AWS-managed key** — the CMK posture is a precondition, not an
  option. The cross-account route itself is not yet evidenced (`OQ-105-005`).
* **C3** — restore *"always creates a new database server"* with a selectable
  virtual network (`EV-102-033`), but the retrieved material is silent on
  cross-subscription targets, and `EV-102-036` records a further custody
  wrinkle: *"key revocation isn't supported after you restore a server with
  customer managed key to another server."* A restored server that cannot have
  its key revoked weakens the emergency-stop property `DP-105-002` relies on;
  this needs Microsoft's answer (`OQ-105-005`).

### 7.4 Connection pooling differs in kind, tier, and cost — F4

* **C1** — Managed Connection Pooling is built in, transaction-mode default,
  ports 5432/6432/3307 — but **requires the Enterprise Plus edition** and a
  minimum maintenance version (`EV-102-037`). A tier-forcing fact *if* a
  server-side pooler were required.
* **C2** — RDS Proxy is a **separately provisioned component** with IAM/Secrets
  Manager integration, same-VPC requirement, one target instance per proxy, and
  a list of PostgreSQL-specific limitations; its billing is not stated on the
  retrieved page and is `UNKNOWN` under `CR4` (`EV-102-038`).
* **C3** — PgBouncer 1.25.2 is **built in at no stated extra cost**, enabled by
  a parameter without restart, port 6432, transaction-mode default, with
  metrics and logs — but **not supported on the Burstable tier**, and
  protocol-level prepared statements require `max_prepared_statements > 0`
  (`EV-102-039`).

The operational assessment §2 shows why none of this is gate-forcing: at Base
demand two long-running units need single-digit connections, so client-side
pools suffice and no tier is forced by pooling. The differences are rubric and
cost material for CBD-108, recorded now so the tier interactions are not
discovered at pricing time.

### 7.5 `HG-102-015` lands differently in this category

`TD-103-030` puts audit evidence in the primary datastore, so for category D
the X gate's *"append-only and omission-detectable"* property attaches to
CoBudget's own schema design — append-only tables with `SR-94-064` integrity —
rather than to a vendor log product. The vendor-side half that remains is
whether backups and PITR preserve that evidence tamper-evidently across the
retention window, which the §3 observations cover. The matrix keeps the gate
`UNPROVEN` (observation-bound) rather than converting it to a Config gate,
because the catalog marks it Vendor and this evaluation does not re-type
approved gates.

### 7.6 Customer Lockbox does not cover Flexible Server — added at v1.2

§7.1 recorded C3's `HG-102-009` position as materially improved but unfinished.
`EV-102-012` finishes characterizing it, and the answer is worse than
"unfinished" implied.

The complete Customer Lockbox supported-services list contains **"Azure Database
for PostgreSQL"**. It does not contain "Azure Database for PostgreSQL Flexible
Server", which is the candidate this evaluation actually carries. On its own that
would be weak evidence — a shorter product name often stands for its deployment
models.

The list's own shape is what makes it more than weak. The same list names **both**
"Azure Database for MySQL" **and** "Azure Database for MySQL Flexible Server", as
two separate entries. A list that distinguishes Flexible Server for one engine is
not using the shorter name as an umbrella for the other.

**The inference was not relied on. The retrieval was made, and it agrees.**
`EV-102-012` names the `PA-8` control as existing precisely to let a reader
*"review Customer Lockbox applicability for a service"*, and the `PA-8` feature
table in the Flexible Server security baseline reads Customer Lockbox Supported
**False**, with the guidance *"This feature is not supported to secure this
service"* (`EV-102-175`).

One caution travels with that source and is the reason it is registered at Low
confidence. **The baseline is demonstrably stale on a different row**: it marks
Azure Private Link unsupported for Flexible Server, while the current security
overview directs the reader to use Private Link (`EV-102-176`). A source wrong
about one feature is not authority about another. So the load-bearing evidence
stays `EV-102-012` — the current, dated supported-services list that omits this
service — with the baseline as corroboration, and `EV-102-176` retrieved
specifically to check whether current documentation contradicts the `PA-8` row.
It does not; it does not mention Customer Lockbox at all.

`OI-103-019` is therefore closed by retrieval rather than by Product Owner
decision, and `OQ-105-011` closed with it. **C3 has no Customer Lockbox coverage
in any of the five categories it is a candidate in**, which is a cross-category
fact CBD-108 should hold rather than a PostgreSQL one.

This does not make `HG-102-009` a `FAIL` for C3. The `EV-102-005` limitation
still holds: absence from the Lockbox list is not evidence that no staff-access
record exists by another route, and no such route has been looked for.

## 8. Evidence register

Records are append-only under the CBD-102 evidence register rules. All
retrievals below were performed on **August 20, 2026** by desk research; none
involved a provider account.

**Number-block allocation.** `EV-102-001`–`016` belong to the hosting
evaluation, with `007`–`012` reserved there for its symmetric pass. **This
evaluation allocates `EV-102-030`–`039` for its records and reserves `082`–`091`**
for this category's observation records. A register whose numbers are claimed by
two documents at once would break append-only integrity, which is why the blocks
are stated here rather than assumed.

**Corrected at v1.1.** The v1.0 allocation claimed `EV-102-030`–`049` and
reserved `040`–`049`. A sibling evaluation drafted concurrently registered real
records inside that reserved range and reserved the remainder of it, so the two
documents claimed the same numbers once both merged. Defined records are
append-only and are never renumbered, so the sibling's records stand and this
document's **reservation** moves — a reservation is an intention, not a record.
The new reservation is placed above every block a sibling held on August 21,
2026. Which sibling holds which block is deliberately not restated here: naming
another package's identifiers in this prose would make this document fail its
own audit on any branch where that package is absent, which is the same class of
mistake that produced the collision. `OI-105-008` carries the disposition.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-030 | `HG-102-009` | Google Cloud (D) | "Supported services", `https://docs.cloud.google.com/assured-workloads/access-transparency/docs/supported-services` | Documented | Medium | Establishes Cloud SQL, AlloyDB, and Spanner at GA in the Access Transparency list. Coverage is not evidence a log was produced for a given access; log content rests on `EV-102-002`. | February 20, 2027 |
| EV-102-031 | `HG-102-041`, `HG-102-042` | Google Cloud (D) | "Point-in-time recovery", `https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr` | Documented | Medium | Establishes that PITR always creates a new instance and, with enhanced backups, can target another project. Does **not** state the log-retention window or expiry; those need the backups page (`OQ-105-002`). Region constraint noted: target region must match source. | February 20, 2027 |
| EV-102-032 | `HG-102-041`, `HG-102-042` | AWS (D) | "Restoring a DB instance to a specified time", `https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html` | Documented | Medium | Establishes new-instance restore, five-minute transaction-log shipping, and restore within the retention period. Does **not** state the retention range or expiry on this page, and does not cover cross-account targets (`OQ-105-002`, `OQ-105-005`). | February 20, 2027 |
| EV-102-033 | `HG-102-013`, `HG-102-042`, `DP-105-009`, `DP-105-011` | Azure (D) | "Backup and restore", `https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-backup-restore`, page dated July 5, 2026 | Documented | Medium | Establishes 7-day default / 7–35-day retention, AES-256-encrypted backups, ≤ 5-minute WAL RPO characterization, new-server restore with VNet choice, backup deletion with server deletion, auto-expiry after retention, geo-redundant backup as create-time-only, backups not exportable, and Burstable-tier on-demand-backup exclusion. Silent on cross-subscription restore targets. | February 20, 2027 |
| EV-102-034 | `HG-102-039`, finding F2 | Google Cloud (D) | "Customer-managed encryption keys", `https://docs.cloud.google.com/sql/docs/postgres/cmek` | Documented | Medium | Establishes CMEK for instance and backups, suspension on key inaccessibility, create-time-only enablement, clone key inheritance, and key-ring region matching. Role-separation mechanics between key and database administrators are implied by KMS IAM but not detailed on the page. | February 20, 2027 |
| EV-102-035 | `HG-102-039`, `HG-102-044` partial, finding F2, F3 | AWS (D) | "Encrypting Amazon RDS resources", `https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html` | Documented | Medium | Establishes customer-managed KMS keys covering storage, logs, backups, replicas, snapshots; creation-time-only encryption; the recoverable-then-terminal inaccessible states on key disablement; that an AWS-managed-key snapshot cannot be shared cross-account; replica key rules per region. Broad-admin roles spanning both KMS and RDS are possible; separation is achievable configuration, which is what the gate asks. | February 20, 2027 |
| EV-102-036 | `HG-102-039`, finding F2, F3 | Azure (D) | "Data encryption with customer managed keys", `https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-data-encryption`, page dated July 14, 2026 | Documented | Medium | Establishes CMK via Key Vault or Managed HSM, create-time-only mode selection, Inaccessible state within ~60 minutes of key loss, explicit separation-of-duties statement, and the post-restore key-revocation limitation. Cross-tenant CMK is preview with region limits. | February 20, 2027 |
| EV-102-037 | Finding F4, AC4 | Google Cloud (D) | "Managed connection pooling", `https://docs.cloud.google.com/sql/docs/postgres/managed-connection-pooling` | Documented | Medium | Establishes built-in pooling, transaction/session modes, default pool 50 / client cap 5,000, ports, and the **Enterprise Plus edition requirement** plus minimum maintenance version. Enabling on an existing instance restarts the database. Pooler implementation is not named. | February 20, 2027 |
| EV-102-038 | Finding F4, AC4 | AWS (D) | "Amazon RDS Proxy", `https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html` | Documented | Medium | Establishes a separately provisioned proxy with IAM auth, Secrets Manager integration, same-VPC requirement, one target DB instance per proxy, and PostgreSQL limitations (no session pinning filters, no `CancelRequest`, protocol 3.0 only, `postgres` database must exist). **Billing is not stated on the page** — the cost line stays `UNKNOWN` under `CR4`. | February 20, 2027 |
| EV-102-039 | Finding F4, AC4 | Azure (D) | "PgBouncer in Azure Database for PostgreSQL", `https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-pgbouncer`, page dated July 8, 2026 | Documented | Medium | Establishes built-in PgBouncer 1.25.2 on port 6432, parameter-enabled without restart, transaction-mode default, metrics and logs, **no Burstable-tier support**, prepared-statement handling via `max_prepared_statements`, and the single-point-of-failure caveat. No extra cost is stated; absence of a price is not a price. | February 20, 2027 |

Reused records: `EV-102-001` (AWS operator access, Asserted), `EV-102-002`–`004`
(Access Transparency), `EV-102-005` (Customer Lockbox), `EV-102-006` (Privileged
Access Manager) support **X**-gate claims here at provider level; each reuse
carries the limitation that the record was retrieved during the hosting
evaluation and its re-verify dates are unchanged.

## 9. Open questions carried forward

Per evidence register §7, carried to CBD-108 rather than closed; a question
that stops being asked becomes `Absent` evidence and scores `0`. Questions
shared with the hosting evaluation (`OQ-103-001`–`004`, `OQ-103-006`) are
cross-referenced there rather than duplicated.

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-105-001 | Do the §4.2 screened candidates actually have the properties attributed to them? | Screening | Confirm from each catalogue before the screen is relied on |
| OQ-105-002 | Backup retention range, log-retention window, and expiry in writing for C1 and C2 | `HG-102-013`, `HG-102-042` | Retrieve the Cloud SQL backups page and the RDS automated-backups page; C3 is settled by `EV-102-033` |
| OQ-105-003 | Version-page confirmation that each candidate runs community PostgreSQL | `HG-102-038` | Retrieve; the observation still decides the gate |
| OQ-105-004 | Replica and region placement documentation, symmetric across all three | `HG-102-044` | Retrieve read-replica documentation ×3 |
| OQ-105-005 | Cross-account (C2) and cross-subscription (C3) isolated-restore routes, and Azure's post-restore key-revocation limitation | `HG-102-041`, `DP-105-007` | Retrieve the RDS snapshot-sharing page; put the Azure questions to Microsoft with `OQ-103-006` |
| OQ-105-006 | pgaudit or equivalent extension availability and its log destination | AC2 | Retrieve ×3; interacts with `DP-105-010` routing |
| OQ-105-007 | Maximum-connection limits by instance size ×3 | AC4 | Retrieve; the operational assessment's connection math currently rests on topology-side figures only |
| OQ-105-011 | ~~Does `PA-8` list Customer Lockbox applicability for **Flexible Server**?~~ **Closed August 21, 2026 — it does, and the answer is not supported.** | `HG-102-009` | `EV-102-175` records the `PA-8` feature table reading Supported **False**. Raised and closed within v1.2; retained as a row because the register is append-only and because the retrieval carries a caveat worth keeping — the baseline is stale on its Private Link row, so `EV-102-012` remains the load-bearing source. |

## 10. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-105-007 | Eight pass tests are observation-bound; the authorized guardrails cover them, and the D observations can share the H evaluation accounts. | Verdicts stay `ELIGIBLE-PENDING-EVIDENCE` until the observations run. No new Product Owner decision is needed. |
| OI-105-008 | **Reopened and re-resolved August 21, 2026.** The v1.0 allocation reserved `040`–`049` for this category's observation records. A concurrently drafted sibling registered records inside that range and reserved the rest of it, and both merged, so `040`–`047` stood claimed twice. Resolved at v1.1 by moving **this document's reservation** to `082`–`091`: defined records are append-only and are never renumbered, so a reservation is what gives way. No record in this document changed, and no gate outcome, verdict, tally, or price is affected. | Closed as a conflict; the underlying hazard stays open. The block allocation in §8 binds this document only, and a sibling reading it cannot see a block claimed on an unmerged branch. The durable fix is mechanical: `scripts/audit-cbd-105.py` now parses the §8 block statement itself, checks that both stated ranges match the constants the audit enforces, that they do not overlap, and that every registered record falls inside the record range — so a block statement can no longer drift from the register it describes. |
| OI-105-009 | C3's two custody questions — cross-subscription restore and post-restore key revocation — are unanswered by retrieved documentation. | Neither is a `FAIL`; both are exactly the kind of question that must be answered before CBD-108 could select C3 for this category. |
| OI-105-010 | This evaluation covers category **D** only; cross-category coherence is CBD-108's acceptance criterion. | The X gates were evaluated against the database candidates; the same gates apply independently in every category. |
| OI-105-011 | Desk evaluation by one author; no provider contacted, nothing built. | The independent security review required before public launch remains outstanding. |
