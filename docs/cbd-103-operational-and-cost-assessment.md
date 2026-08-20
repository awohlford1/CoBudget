# CBD-103 — Deployment, Outage, Support, Cost, and Exit Assessment

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026. Records the operational and cost half of CBD-103 against the approved CBD-102 cost template. **It contains no prices**; §6 explains why every price line is recorded as unknown under cost rule `CR4` rather than estimated. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-103](https://cobudget.atlassian.net/browse/CBD-103) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Runtime Topology Specification v1.0; Candidate Shortlist and Gate Evaluation v1.0; Acceptance Criteria Traceability v1.0 |
| Confluence page | [CBD-103 — Deployment, Outage, Support, Cost, and Exit Assessment](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12320790) |
| Repository baseline | `5745587` |
| Last updated | August 20, 2026 |

## 1. Purpose

CBD-103's third deliverable is a *"deployment, rollback, outage, support, cost,
and exit assessment,"* and its fourth acceptance criterion requires that
*"regional availability, service limits, telemetry retention, cost cliffs, and
support are explicit."* This document is both.

It assesses the **topology**, not a provider. Where a statement depends on which
provider is selected, it says so and names the question rather than guessing.

## 2. Deployment and rollback

### 2.1 The operational shape

`TD-103-027` makes every deployable input versioned and `TD-103-028` makes
rollback a code-and-configuration operation rather than a schema reversal. The
operational assessment of that design:

| Property | Assessment |
| --- | --- |
| Deployment unit | One container image digest, deployed to two services with different entrypoints |
| Deployment trigger | A commit merged to `main` producing a digest; promotion between environments is an explicit action, not an automatic consequence |
| Rollback mechanism | Activate the previous service revision, which references the previous digest |
| Rollback scope | Application code and runtime configuration only. Never schema. |
| Rollback prerequisite | The previous revision must still be a valid target — meaning the `contract` step of the previous schema change has not yet run |
| Reproducibility | Production state is reconstructible from repository plus secret manager alone |

### 2.2 The rollback window is a schema-migration property

The most important operational consequence of `TD-103-028` is one that is easy
to miss: **the length of time a rollback remains available is set by the
expand-and-contract schedule, not by the platform.**

Once the `contract` step removes an old column, every application version that
read it stops being a valid rollback target. A team that contracts eagerly has a
rollback window of hours; one that contracts after a deliberate soak has a window
of days.

This is a CoBudget operating decision with no approved source, so it is recorded
as an open item (`OI-103-013`) rather than decided here. It matters more than
usual for CoBudget because there is one operator: a rollback that has expired is
not recoverable by escalating to a colleague at 2 a.m.

### 2.3 What is not yet true

Nothing in §2 has been built or rehearsed. `WR-102-030` scores one-person
recoverability including *"restore, without vendor involvement"*, and that score
is unattainable without a rehearsal. A deployment and rollback rehearsal is
named in `OQ-103-012`.

## 3. Outage behaviour

Component-by-component, given the topology. This table is a design property, not
a measurement, and it changes if `TD-103-003` or `TD-103-030` changes.

| Component unavailable | Immediate effect | What continues | Recovery | Durable-loss risk |
| --- | --- | --- | --- | --- |
| Edge / gateway | Total interactive outage | Background work already queued, if workers are up | Provider recovery | None. No write is accepted, so none is half-applied. |
| API unit | Interactive outage; provider webhooks rejected | Queue drains; scheduled work continues | Redeploy or scale | None. `TD-103-010` step 5 scheduled reconciliation recovers every webhook that was refused. |
| Worker unit | No background effect; queue depth grows | **All interactive reads and writes. Period boundaries stay correct.** | Redeploy | None while queue retention exceeds outage duration. That retention is a provider limit and is `OQ-103-013`. |
| Durable queue | No new background work; producers must fail closed rather than proceed | Interactive reads and writes | Provider recovery | Depends on the transactional outbox: events committed to the outbox survive, events not yet written do not exist. |
| Scheduler | Missed ticks | **Everything. Period correctness is unaffected.** | Automatic catch-up under `TD-103-004` | None. |
| Secret manager / KMS | New instances cannot start | Running instances until cached material expires | Provider recovery | None. |
| Primary datastore | Total outage | Nothing | CBD-105 | Per the CBD-105 recovery objective. Out of scope here. |
| Observability sink | Operating blind; diagnostics unavailable | Everything, **including audit evidence** | Provider recovery | Loss of S1 content-free operational metadata only, by `TD-103-030`. |

### 3.1 Two rows worth stating in prose

**The scheduler row is the payoff from `TD-103-003`.** Because the active budget
period is a pure function of the budget-space date and the schedule version,
rather than a record a midnight job creates, a scheduler outage cannot move a
budget space into the wrong period, cannot split a calendar date between
schedule versions, and cannot reopen a completed period. CBD-67 `INV-22` and
`INV-31` require exactly this. The practical consequence for provider selection
is that **scheduler availability is a freshness and cost question, not a
correctness one**, and no candidate needs to be excluded or compensated for it.

**The observability row is the payoff from `TD-103-030`.** Because audit
evidence commits in the same database transaction as the effect it records,
rather than being shipped to an observability vendor, an observability outage
cannot produce undetectable evidence omission. `SR-94-064` requires omission to
be detectable, and evidence never written is the one omission a downstream
integrity check cannot see. This is the reason the decision exists.

### 3.2 The outage case the topology does not yet answer

If the **durable queue** is unavailable, producers must fail closed. The
approved material requires this — `HG-102-017` and CBD-91 §4 rule 9 both make
ambiguous or unavailable authority a closed failure rather than a default — but
it raises a question this topology has not settled: **does an interactive
request that cannot enqueue its follow-up work fail, or succeed with the
follow-up deferred?**

Both answers are defensible and they differ in customer-visible behaviour:

* Failing the request keeps the system consistent but converts a background
  outage into an interactive one.
* Succeeding with deferral keeps the interactive surface up, but requires the
  transactional outbox to be the durable record and the queue to be only a
  dispatch mechanism — which is what `docs/architecture.md` § Synchronization
  flow step 5 already describes.

The architecture's outbox pattern points at the second answer, and adopting it
would mean the queue is never the system of record for pending work. That is
probably correct, but it is a design decision with customer-visible
consequences and no approved source, so it is recorded as `OI-103-014` rather
than decided here.

## 4. Regional availability

`OI-103-001` records the Product Owner's confirmation of **a single deployment
region in the United States**, closing `OI-102-012`.

| Property | Position |
| --- | --- |
| Region count | One. Multi-region is a re-evaluation trigger, not a Private MVP option. |
| Region locale | United States. The specific region is not fixed and is a per-candidate `HG-102-011` question. |
| Failover | None within Private MVP. A regional outage is a full outage. |
| Consequence for the rubric | `WR-102-017` scores multi-region capability. A candidate scoring well there is buying an option CoBudget is not exercising, and `CR5` prevents that from inflating a Base-scenario comparison. |

The reliability consequence should be stated plainly rather than left implicit:
**single-region means CoBudget's availability cannot exceed its provider's
single-region availability, and no candidate's multi-region capability changes
that until CoBudget pays to use it.** No approved source sets an availability
threshold — catalog §11 moved uptime to rubric `WR-102-014`/`015` for exactly
that reason — so this is a recorded consequence, not a gate.

## 5. Service limits and telemetry retention

Acceptance criterion 4 requires service limits and telemetry retention to be
explicit. They are explicit as **questions**, because none has been retrieved.

| Limit class | Why it matters here | Demand-model reference |
| --- | --- | --- |
| Queue message retention | Sets the maximum worker outage survivable without durable loss (§3) | `DM-102-021`: 29,280 jobs/month Base |
| Maximum in-flight or queued messages | Sets the burst the queue absorbs against a webhook spike | `DM-102-017`: 5,490 webhooks/month Base |
| Maximum delivery attempts | Bounded under `TD-103-008`; Pub/Sub documents 5–100 (`EV-102-015`) | — |
| Scheduler minimum interval | `TD-103-004` needs a tick of 15 minutes or finer to cover 15-minute time-zone offsets | — |
| Concurrent execution limits | Per-tenant and per-connection caps required by `HG-102-018` | `DM-102-010`: 61 connections Base |
| Log ingest and retention | Retention is a cost cliff and a `DI-91-041` lifecycle question | `DM-102-032`: 1.0 GB/month Base |
| Secret manager operations | Workload identity means every instance start reads secrets | — |

Two are load-bearing and should be resolved first:

* **Scheduler minimum interval.** If a candidate's managed scheduler cannot fire
  more often than hourly, `TD-103-004` cannot align to every local midnight and
  the design needs a different mechanism. This is cheap to check and expensive
  to discover late. `OQ-103-014`.
* **Queue message retention.** It is the single number that converts "the worker
  was down for N hours" into "and no work was lost." `OQ-103-013`.

Telemetry retention carries a second constraint beyond cost. `DI-91-041` is S1
with *"short-lived"* retention in its own definition, and `AN-92-006` requires
that reliability, security, support, audit, and aggregate-measurement retention
policies remain **distinct**. A provider whose observability product applies one
retention policy across all destinations fails `HG-102-003` on retention alone,
independently of access roles. `OQ-103-009` covers the access-role half; this
adds the retention half to it.

## 6. Cost

### 6.1 Why there are no prices in this document

Cost rule `CR4` is explicit: *"An unknown price is recorded as unknown, not as
zero. A figure that could not be obtained is marked and listed in the record's
open questions. A missing line item must never silently improve a total."*
Evidence register §3.2 adds that a cost figure requires *"Documented or
stronger"* evidence and that *"an Asserted price is recorded as unknown."*

No price was retrieved for any candidate. Producing estimates would therefore
create figures with no evidence record behind them, in a document whose purpose
is to make cost comparable. §6.3 records the structure with unknowns marked,
which is what the template asks for and what makes the pricing work
enumerable.

### 6.2 What is known about the shape of the answer

Three structural facts are established and do not need a price to be useful.

**The comparison will be decided by floors, not usage.** Demand model §9.1 is
unambiguous: at every scenario including High, Private MVP sits below the entry
tier of essentially every managed provider. Base is 15,600 API requests and
29,280 background jobs per month against 1.0 GB of log ingest. A per-unit rate
comparison at this scale compares the least significant term.

**Two seats, not one.** `CT-102-003` requires pricing **two** seats in every
category: the operator, plus the catalog §2.5.1 named second principal who holds
key-recovery custody and restore approval. `OI-102-015` names the specific trap
— a provider whose cheapest tier caps seats at one *"becomes an `HG-102-006`
failure, not merely a cost line."* That converts a pricing question into a gate
question and should be checked on every candidate's cheapest gate-clearing tier.

**At least one gate is already known to force a tier.** `CR0` requires pricing
*"the cheapest tier that clears every hard gate, not the cheapest tier."*
Customer Lockbox, which is Azure's answer to `HG-102-009`, documents a minimum
**Developer** support-plan requirement (`EV-102-005`). That plan is therefore
part of C3's price, not an optional extra. Whether Access Transparency carries
an equivalent support-level requirement on C1 is genuinely unresolved —
`EV-102-004` records that the vendor page describes it as a default control
while a secondary source asserts a paid support level — and `OQ-103-007` carries
it because it moves C1's floor.

### 6.3 Cost record structure, per candidate

One record per candidate, following cost template §4. Every line is `UNKNOWN`
under `CR4`. The header fields that are **not** unknown are filled, because they
are established by this evaluation.

| Field | C1 Google Cloud | C2 AWS | C3 Azure |
| --- | --- | --- | --- |
| Category | H | H | H |
| Tier priced | `UNKNOWN` — cannot be named until `CR0` gate-forcing is resolved | `UNKNOWN` | `UNKNOWN` — but **at least Developer support**, forced by `HG-102-009` via Customer Lockbox |
| Gates forcing the tier | Possibly Access Transparency support level; unresolved (`OQ-103-007`) | Not yet identified | `HG-102-009` |
| Eligibility verdict | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |
| Currency and billing region | `UNKNOWN` — `OI-102-014` records that no approved source fixes CoBudget's billing currency or jurisdiction | | |
| Quote date and source | Not obtained | | |

Line items, identical in structure for all three:

| ID | Line item | Status | Note |
| --- | --- | --- | --- |
| CT-102-001 | Plan or tier base fee | `UNKNOWN` | Depends on the `CR0` tier |
| CT-102-002 | Platform, account, or project fee | `UNKNOWN` | |
| CT-102-003 | Per-seat cost × **2** | `UNKNOWN` | Record the per-seat rate separately, and note where a provider charges full price for an approval-only seat |
| CT-102-004 | Minimum committed spend | `UNKNOWN` | |
| CT-102-005 | Support plan fee | `UNKNOWN` | **C3: not optional.** Minimum Developer plan, forced by `HG-102-009` |
| CT-102-006 | Primary billable unit × Base quantity | `UNKNOWN` | Three primary units for category H — 15,600 requests, 29,280 jobs, 1.0 GB log ingest |
| CT-102-007 | Secondary metered units | `UNKNOWN` | Compute hours, memory-GB-hours, egress GB, queue operations, retention days |
| CT-102-008 | Included allowance | `UNKNOWN` | Likely to absorb all Base usage; that is the §6.2 finding |
| CT-102-009 | Overage rate beyond allowance | `UNKNOWN` | |
| CT-102-010 | Free-tier allowance | `UNKNOWN` | Permanent or trial, and what it excludes |
| CT-102-011 | Promotional or startup credits | `UNKNOWN` | Amount **and expiry**; a credit without a stated expiry is unknown under `CR2`, not ongoing |
| CT-102-012 | Introductory pricing | `UNKNOWN` | Discount, duration, and the price it steps up to |
| CT-102-013 | Taxes | `UNKNOWN` | |
| CT-102-014 | Exit and data-return cost | `UNKNOWN` | Egress to retrieve data on termination |
| CT-102-015 | Currency and FX exposure | `UNKNOWN` | `OI-102-014` |
| CT-102-016 | Month-1 cost | `UNKNOWN` | |
| CT-102-017 | **Steady-state monthly** | `UNKNOWN` | **The comparison figure.** Section C excluded entirely per `CR1` |
| CT-102-018 | 12-month total | `UNKNOWN` | |
| CT-102-019 | 36-month total | `UNKNOWN` | |
| CT-102-020 | Steady state at High | `UNKNOWN` | 104,000 requests, 315,000 jobs, 8.0 GB ingest |
| CT-102-021 | First overage threshold | `UNKNOWN` | The demand level at which the tier stops being sufficient |

### 6.4 Cost cliffs to look for

Acceptance criterion 4 requires cost cliffs to be explicit. The demand model
identifies where they are structurally likely for category H, and these are the
specific thresholds to price rather than a general instruction to watch costs.

| Cliff | Why it is a cliff here | Trigger |
| --- | --- | --- |
| Support-plan floor | `HG-102-009` may force a paid support plan (confirmed for C3, unresolved for C1). Support is a floor, not a usage term. | Gate-forced, not volume-driven — it applies at Low demand |
| Second seat | `CT-102-003` requires two. A per-seat price that is trivial at one seat doubles. | Applies immediately |
| Log ingest and retention tiers | Observability products commonly price retention in steps. `DM-102-032` moves 1.0 GB → 8.0 GB between Base and High, an eightfold move. | High scenario |
| Egress on exit | `CT-102-014`. A one-time cost invisible until termination. | Exit only |
| Queue operations at High | `DM-102-021` moves 29,280 → 315,000 jobs/month, over tenfold — the largest multiplier in the model. | High scenario |
| Free-tier expiry | `CR1` excludes credits from the comparison figure precisely because this cliff is invisible during the decision window. | Credit expiry date |

Demand model §9.1 also inverts the usual expectation: at High, the categories
that hurt are those metered per connection or per active user, which scale with
people. Category H's units scale with *work*, and `DM-102-021`'s tenfold move is
the one to watch.

## 7. Support

`WR-102-019`–`022` score support; this records what CoBudget can actually use.

The binding constraint is that `OP-92-001` and `OP-92-002` remove the support
model that would make vendor support most valuable. Vendor staff have no routine
path to CoBudget customer content, and the routine support surface may expose
only allowlisted service-health state, public version information, a safe status
or error class, and a customer-provided opaque correlation identifier.

| Property | Assessment |
| --- | --- |
| What support may be told | A correlation identifier and a safe error class. Never customer content, resource existence, counts, membership, lifecycle, destination, financial, security, or cross-space signals. |
| What support must be able to do | Diagnose from correlation identifiers and service state alone — `WR-102-022`'s scale |
| What disqualifies a provider | Support that is only effective when staff can read customer data. That is not a low score; it fails `HG-102-007`. |
| Escalation | `WR-102-020` scores an escalation route available without an account team. CoBudget will not have one. |
| Support as a cost | `CT-102-005`. For C3, gate-forced and therefore not optional. |

The rubric weights support at 8 out of 100 for hosting — the lowest of the seven
dimensions — and rubric §4.1 gives the reason directly: `OP-92-001` and
`OP-92-002` *"already prohibit the vendor-support model that would make support
most valuable."* That weighting is correct and this assessment does not disturb
it.

## 8. Exit

`WR-102-023`–`026` score portability. The assessment for category H:

| Question | Position |
| --- | --- |
| What would have to move | Container images, Terraform configuration, secret values, queue topology, scheduler entries, observability configuration, and log history worth retaining |
| What is genuinely portable | The application. `TD-103-001` keeps business modules in one codebase with no provider SDK in the domain layer, so exit is an infrastructure exercise, not a rewrite. |
| What is not portable | Provider-specific infrastructure configuration. Terraform reduces the rewrite but does not eliminate it; a queue and an IAM model do not translate one-for-one. |
| The irreversible part | Nothing, for category H. This is the important asymmetry — hosting is the **most** portable category in CBD-15. |
| Exit cost | `CT-102-014`, `UNKNOWN`. Primarily egress. |

The asymmetry deserves emphasis because it should affect how much weight the
selection places on this category. Rubric §4.1 explains why financial
connectivity carries the highest portability weight at 16: exit means *"every
user re-authorizes every connection through a new provider-hosted ceremony;
there is no data-migration substitute."* Hosting carries 12, and even that
overstates the stickiness relative to identity or financial connectivity,
because **no customer action is required to leave a hosting provider.**

A hosting mistake is recoverable by CoBudget alone, at a cost in operator time.
A financial-connectivity mistake is recoverable only by asking every customer to
re-authorize. That does not change any gate, and it does not change the approved
weights, which are fixed for the duration of CBD-103–107. It is recorded because
CBD-108 must weigh a cross-category set, and knowing which mistakes are
reversible is part of that.

## 9. Open questions and items

| ID | Question | Owner |
| --- | --- | --- |
| OQ-103-012 | Has a deployment and rollback rehearsal been performed? | CBD-108 or later; `WR-102-030` cannot be scored without it |
| OQ-103-013 | Queue message retention limit per candidate | Retrieve; determines survivable worker outage |
| OQ-103-014 | Managed scheduler minimum interval per candidate — must be 15 minutes or finer for `TD-103-004` | Retrieve; cheap to check, expensive to discover late |
| OQ-103-015 | All `CT-102-*` price lines for all three candidates at the `CR0` gate-clearing tier | Blocked on completing the gate evaluation, since `CR0` needs to know which gates force which tier |
| OQ-103-016 | Does any candidate's cheapest gate-clearing tier cap seats at one? | Converts to an `HG-102-006` failure if so, per `OI-102-015` |
| OQ-103-017 | Does any candidate apply one retention policy across all observability destinations? | Fails `HG-102-003` on retention independently of access roles |

| ID | Item | Effect |
| --- | --- | --- |
| OI-103-013 | The rollback window is set by the expand-and-contract schedule, and no approved source fixes it. | A CoBudget operating decision. It matters more than usual with one operator, because an expired rollback cannot be recovered by escalating to a colleague. |
| OI-103-014 | §3.2 — whether an interactive request that cannot enqueue its follow-up work fails or succeeds with deferral is not settled. | Customer-visible behaviour. The architecture's transactional outbox points at deferral, which would make the queue a dispatch mechanism rather than the system of record for pending work. Needs a decision before the first `RL-92-001` surface ships. |
| OI-103-015 | No price in this document, and no provider contacted. `OI-102-017` records that no budget ceiling exists. | CBD-103 can produce a fully evidenced, gate-clearing recommendation that turns out to be unaffordable, with no documented basis for having ruled it out earlier. `CT-102-017` and `CT-102-019` are the figures to watch. |
| OI-103-016 | Single-region United States means availability cannot exceed the provider's single-region availability. | Recorded consequence, not a gate. No approved source sets an availability threshold. |
