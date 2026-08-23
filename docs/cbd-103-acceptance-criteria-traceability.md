# CBD-103 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026. Maps each CBD-103 acceptance criterion and deliverable to the exact evidence that answers it, and states plainly where the answer is a design record rather than a verified property. v1.1 records the cross-category documentary pass run on August 21, 2026 — see §9.1. No acceptance criterion changes status, and no verdict moves. |
| Document version | 1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 30 topology decisions, the screening and 27-gate evaluation with its verdicts and evidence register, the operational and cost assessment with its `CR4` unknowns, this traceability record, and the `OI-103-008` disposition. It approves no provider, publishes no rubric score, gathers no evidence, and leaves `OI-103-009`, `OI-102-022`, and every `OQ-103` question open. **v1.1 and v1.2 approval additionally covers thirty new evidence records and nine moved documentary gate outcomes across the six packages. `OI-103-019` was raised and then closed by retrieval; **all five of `OI-103-017`, `OI-103-018`, `OI-103-020`, `OI-103-021` and `OI-103-022` were resolved by Product Owner decision on August 22, 2026 and are recorded closed at §11.** |
| Jira | [CBD-103](https://cobudget.atlassian.net/browse/CBD-103) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Runtime Topology Specification v1.0; Candidate Shortlist and Gate Evaluation v1.2; Operational and Cost Assessment v1.0 |
| Confluence page | [CBD-103 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12386305) |
| Repository baseline | `c689192` |
| Last updated | August 22, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-103-runtime-topology-specification.md` | The managed execution and operational boundary, as 30 `TD-103-*` decisions |
| `docs/cbd-103-candidate-shortlist-and-gate-evaluation.md` | Shortlist, screening, 27-gate comparison matrix, verdicts, and the `EV-102-*` evidence register |
| `docs/cbd-103-operational-and-cost-assessment.md` | Deployment, rollback, outage, regional availability, service limits, telemetry retention, cost, support, and exit |
| `docs/cbd-103-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-103.py` | Mechanical guard over identifier resolution, matrix completeness, and the restated tallies |

## 2. Status vocabulary used below

CBD-103 is a research and evaluation task, so most criteria are answered by a
design record or a piece of retrieved evidence rather than by a working system.
The distinction is kept visible:

| Status | Meaning |
| --- | --- |
| **Met** | The criterion asks for a documented outcome, and the document exists and answers it |
| **Met (design)** | The criterion is answered by a design decision with a cited approved source. Nothing is built, and this is not evidence that the design works |
| **Partially met** | Part of the criterion is answered and part is named as an open question with a retrieval action |

No criterion is marked Met on the strength of a claim that has no evidence
record behind it.

## 3. Acceptance criteria

### AC1 — Separately deployable API and workers without premature service decomposition

**Status: Met (design).**

| Evidence | Where |
| --- | --- |
| Two deployment units, one build artifact, one codebase | `TD-103-001` |
| The scheduler is a managed trigger, not a third unit | `TD-103-002` |
| Why this is not a microservice split — one image, no inter-unit network call, no versioned interface, no per-unit module ownership | Topology §4.2 |
| Why the split is operationally necessary rather than aesthetic — background work is roughly twice request volume and bursty | Topology §4.2, citing `DM-102-021` and `DM-102-024` |
| Screening for the primitive that supports it | Evaluation §4.1 class 1 |

The criterion has two halves that pull against each other, and §4.2 is where
that tension is resolved rather than asserted away: the split is drawn on one
property only — whether work is triggered by a request or by a queue.

### AC2 — Durable and idempotent jobs and recovery reconciliation have a defined failure-recovery path

**Status: Met (design).**

| Evidence | Where |
| --- | --- |
| The job envelope, field by field, with the source forcing each field | `TD-103-006` |
| Authority re-evaluated at execution; effects derived rather than accumulated | `TD-103-007` |
| Every path bounded: max attempts, backoff, per-tenant and per-connection concurrency caps, dead-letter, terminal state | `TD-103-008` |
| Dead-letter as a restricted boundary; replay reauthorizes | `TD-103-009` |
| The six-step recovery path, including scheduled reconciliation and the per-connection watermark | `TD-103-010` |
| Component finding: Cloud Tasks deletes exhausted work and cannot serve this path | Evaluation §7.2, `EV-102-013` |
| Outage behaviour per component | Operational §3 |

`TD-103-007` carries the longest rationale in the package because it resolves a
genuine conflict between `RL-92-006`'s ordered-progress requirement and
`HG-102-018`'s dead-letter requirement. Its cost is recorded as `OI-103-004`:
the convergence argument holds only while no background effect is
order-dependent or accumulative, and nothing mechanically enforces that today.

### AC3 — Least privilege, secret handling, database access, auditability, and log redaction satisfy CBD-14

**Status: Met (design), with one part deferred by scope.**

| Sub-criterion | Evidence | CBD-14 requirement satisfied |
| --- | --- | --- |
| Least privilege | `TD-103-017` workload identity; `TD-103-024` account separation; `TD-103-020` break-glass custody | `SR-94-041`, `SR-94-068`, `SR-94-069` |
| Secret handling | `TD-103-017` dedicated secret manager or KMS; `TD-103-018` field-level provider-token encryption; `TD-103-019` rotation enumerates dependents | `SR-94-039`, `SR-94-040`, `SR-94-042` |
| Database access | `TD-103-015` private networking; `TD-103-018` token ciphertext unreadable from a database or backup alone | `SR-94-040`; remainder is CBD-105 |
| Auditability | `TD-103-030` audit evidence commits transactionally with the effect | `SR-94-063`, `SR-94-064`, `OP-92-007` |
| Log redaction | `TD-103-021` three separate boundaries; `TD-103-022` structural allowlist rather than a filter | `SR-94-043`, `SR-94-066`, `AN-92-003`, `AN-92-006` |

Two statements are needed for this to be read correctly.

**"Satisfy CBD-14" is met as a design that the cited requirements permit, not as
a verified system.** No mitigation in the CBD-14 package is implemented, its own
close-out record says so, and nothing here changes that. `EX-102-007` states the
governing principle: a control that is CoBudget-side work is not effective until
built and verified.

**Database access is only partly CBD-103's.** The datastore itself is CBD-105.
This package settles the parts a hosting topology owns — network reachability
and the field-level token boundary — and leaves backup, restore, replica
placement, and row-level access to `HG-102-038`–`046` under CBD-105.

`TD-103-030` deserves specific mention because it closes a gap that the
three-boundary separation in `TD-103-021` did not, and that was found while
writing the outage assessment rather than while writing the topology: if audit
evidence were shipped to an observability vendor, an observability outage during
which the application kept serving would produce undetectable evidence omission,
which is exactly what `SR-94-064` requires be detectable.

### AC4 — Regional availability, service limits, telemetry retention, cost cliffs, and support are explicit

**Status: Partially met.**

| Sub-criterion | Status | Where |
| --- | --- | --- |
| Regional availability | **Met.** Single region, United States, Product Owner confirmed August 18, 2026, closing `OI-102-012`. Failover position and the availability consequence stated. | Operational §4; `OI-103-001` |
| Service limits | **Partially met.** The limit classes that bind this topology are enumerated with the demand quantity each is measured against. No per-candidate limit **value** was retrieved. | Operational §5; `OQ-103-013`, `OQ-103-014` |
| Telemetry retention | **Partially met.** The `DI-91-041` S1 short-retention constraint and the `AN-92-006` distinct-retention requirement are stated, including the finding that one retention policy across destinations fails `HG-102-003` independently of access roles. No candidate's retention values retrieved. | Operational §5; `OQ-103-017` |
| Cost cliffs | **Met.** Six specific cliffs named with their triggers, rather than a general instruction to watch cost. | Operational §6.4 |
| Support | **Met.** What support may be told, what it must do without customer content, what disqualifies a provider, and why the rubric weight is low. | Operational §7 |

The honest reading of "explicit" is what sets this to Partially met. Naming a
service limit as a question makes the *requirement* explicit; it does not make
the *limit* explicit. Two are load-bearing and should be resolved first —
scheduler minimum interval, which `TD-103-004` needs at 15 minutes or finer, and
queue message retention, which converts a worker outage duration into a
durable-loss answer.

Cost is addressed at AC-level under the deliverables in §4 rather than here,
because this criterion names cost *cliffs* rather than cost figures.

### AC5 — Deployment and rollback can be reproduced from versioned configuration

**Status: Met (design).**

| Evidence | Where |
| --- | --- |
| Every deployable input versioned; image addressed by content digest, never a mutable tag | `TD-103-027` |
| Rollback is a code and configuration operation, never a schema reversal; expand-and-contract | `TD-103-028` |
| The reproducibility test: production state reconstructible from repository plus secret manager alone | `TD-103-029` |
| Operational assessment of the design, including the rollback-window consequence | Operational §2 |

`TD-103-028` records why a reversible "down" migration is rejected rather than
merely not chosen: it can destroy committed customer data to recover an
application fault, and it is the least-rehearsed path in the system at the
moment it is most needed. `docs/architecture.md` § Key data rules and CBD-67
`INV-22` both require historical period stability that a down migration could
silently violate during an outage.

Not rehearsed. `OQ-103-012` carries that, and `WR-102-030` cannot be scored
without it.

## 4. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| Shortlist and comparison matrix | **Met.** Five-primitive screen, seven candidates screened out with the missing primitive named, three carried into a 27-gate matrix. | Evaluation §4, §6 |
| Proposed topology — runtime | Met (design) | `TD-103-001`–`005` |
| Proposed topology — jobs and queues | Met (design) | `TD-103-006`–`011` |
| Proposed topology — networking | Met (design) | `TD-103-012`–`016` |
| Proposed topology — secrets | Met (design) | `TD-103-017`–`020` |
| Proposed topology — logs, traces, errors | Met (design) | `TD-103-021`–`023`, `TD-103-030` |
| Proposed topology — environment isolation | Met (design) | `TD-103-024`–`026` |
| Deployment and rollback assessment | Met (design) | `TD-103-027`–`029`; Operational §2 |
| Outage assessment | **Met** | Operational §3 |
| Support assessment | **Met** | Operational §7 |
| Cost assessment | **Partially met.** Structure complete against the `CT-102-*` template with every price line marked `UNKNOWN` under `CR4`; three structural findings established without a price. | Operational §6 |
| Exit assessment | **Met** | Operational §8 |

The cost row is the one that would be easy to overstate. `CR4` requires an
unobtainable figure to be marked unknown rather than estimated, and evidence
register §3.2 requires Documented-or-stronger evidence for any cost figure. No
price was retrieved, so no price is stated. What is established without one:
cost will be floor-dominated at this scale, two seats must be priced not one,
and `HG-102-009` already forces a paid support plan on one candidate.

## 5. Dependency satisfied

CBD-103's stated dependency is that it *"consumes the approved rubric and hard
gates."*

| Consumed | How |
| --- | --- |
| Hard-Gate Catalog v1.0 | All 15 **X** and 12 **H** gates evaluated per candidate | 
| Evaluation Rubric v1.0 | `R1` verdicts applied; `R4` and `R5` are why no total is published (Evaluation §8) |
| Demand Model v1.0 | Sizing throughout; `OI-102-010` fan-out confirmed at three under `TD-103-011`; `OI-102-012` single region closed as `OI-103-001` |
| Cost Template v1.0 | `CT-102-001`–`021` structure applied with `CR0`–`CR7` |
| Evidence Register and Exception Rules v1.0 | `EV-102-*` records opened; §3.2 classes and §3.3 verdicts applied; §7 open-question carry-forward followed |

Two CBD-102 open items are advanced by this package:

* **`OI-102-010`** — the demand model asked CBD-103 to confirm the three-job
  fan-out. The topology produces four distinct `SA-92-*` purposes, and
  `TD-103-011` folds invalidation into recalculation to keep the figure at
  three. `DM-102-021` stands unchanged. `OI-103-005` records that an
  eager-rebuild design would raise it by roughly a third.
* **`OI-102-012`** — single-region confirmed, recorded as `OI-103-001`.

`OI-102-022` — the unfilled second principal — is **not** advanced. `TD-103-020`
describes the arrangement; nobody holds the role.

## 6. FU-95-008 disposition

`FU-95-008` (P0) routes to CBD-103: *"Hosting topology, KMS, secrets, and
service identity."*

| Required bounded work | Where | Status |
| --- | --- | --- |
| Select managed hosting and key-management controls | Evaluation §6 | **Not closed.** Three candidates evaluated, none selectable. Selection is CBD-108. |
| Environment and account separation | `TD-103-024`, `TD-103-025` | Met (design) |
| Workload identity | `TD-103-017` | Met (design) |
| Secret envelope | `TD-103-017`, `TD-103-018` | Met (design) |
| Rotation | `TD-103-019` | Met (design) |
| Break-glass custody | `TD-103-020` | Met (design); blocked in practice by `OI-102-022` |
| Log redaction | `TD-103-022` | Met (design) |
| Local-development boundary | `TD-103-026` | Met (design) |
| Restore and redeploy path | `TD-103-027`–`029`; restore is CBD-105 | Met (design) for redeploy; restore deferred to CBD-105 |
| Never place provider tokens in client storage or ordinary application logs | `TD-103-018`, `TD-103-022`; `CL-92-002` forbids client persistence | Met (design) |

**`FU-95-008` remains open.** Its closure evidence requires *"approved provider
evidence; topology and trust-boundary diagram; KMS/IAM policy review;
rotation/revocation exercise; secret-scanning and log-leak tests."* This package
supplies the topology and trust-boundary diagram (topology §12). It supplies no
approved provider evidence, no policy review, no rotation exercise, and no
tests. Its stated effect — *"Provider connectivity, production deployment, and
protected-data processing are blocked"* — is unchanged.

## 7. What this package does not establish

Stated plainly, because a traceability record that only lists what was achieved
is the easiest place for a package to overstate itself.

* **No provider is selected.** Evaluation §3 establishes that ten of 27 pass
  tests require a live-account observation, so every candidate terminates at
  `ELIGIBLE-PENDING-EVIDENCE` until those observations are performed.
  `OI-103-008` was resolved on August 20, 2026 by authorizing them; the
  verdicts stand until the evidence is actually gathered.
* **The evidence pass was not symmetric.** `OI-103-009`. It changes no verdict,
  because all three candidates share one, but it must be completed before
  CBD-108 ranks anything.
* **No rubric score is published.** Evaluation §8.
* **No price is stated.** Operational §6.1.
* **Nothing is built, rehearsed, or tested.** Every `TD-103-*` is a design
  record.
* **Nothing here has been reviewed by a second person**, and no provider was
  contacted. The independent security review that CBD-92 §1 and the architecture
  baseline require before public launch remains outstanding.
* **No CBD-11, CBD-12, or CBD-14 decision is changed.** Where this package cites
  one, it cites it as a binding input. `TD-103-003` and `TD-103-004` in
  particular exist to keep CBD-67 `INV-22`, `INV-31`, and `GC-01` true under a
  hosting topology, not to reinterpret them.

## 8. Consistency check against CBD-11, CBD-12, and CBD-14

The approved decisions most likely to be contradicted by a hosting topology, and
where each is honoured.

| Approved decision | Source | Honoured by |
| --- | --- | --- |
| The active budget cycle never depends on a background job completing | CBD-67 `INV-22` | `TD-103-003` — period state is derived on read; the job writes a cache |
| A future schedule change becomes authoritative at local midnight regardless of background processing | CBD-67 `INV-31` | `TD-103-003` |
| The budget-space named IANA time zone governs local dates and local midnight | CBD-71 `GC-01`; CBD-67 `INV-08`, `INV-11` | `TD-103-004` — local-date comparison on a 15-minute tick |
| A daylight-saving transition classifies each calendar date exactly once | CBD-69 `EC-69-17` | `TD-103-004` — comparing dates, never elapsed hours |
| Holiday data is versioned local reference data, not a live mutable service | CBD-71 `GC-04`, `SD-071-030` | `TD-103-005` — shipped in the build artifact; no runtime dependency |
| Historical periods remain stable and auditable | CBD-11; CBD-67 `INV-22` | `TD-103-028` — forward-only migrations; no down migration can drop schedule-version history |
| Permission loss invalidates open work; a later submission is rejected against current authority | CBD-72 `PM-72-003` | `TD-103-007` — authority re-evaluated at execution, not trusted from enqueue |
| Profile changes immediately invalidate jobs, caches, reports, and pending packages | CBD-72 permission 22 | `TD-103-007`, `TD-103-009` — dead-letter replay reauthorizes rather than re-enqueueing |
| Routine staff access to customer content is default-deny | `OP-92-001` | `TD-103-025` — no production data in any lower environment; Operational §7 |
| Product analytics disabled; reliability telemetry content-free; S3 security evidence separated | `AN-92-001`–`003`, `AN-92-006` | `TD-103-021`, `TD-103-022`, `TD-103-023` |
| Data, key, approval, and return-to-service duties remain separated | `SR-94-069`; `OP-92-006` | `TD-103-020` — catalog §2.5.1 second principal |
| Required security and audit evidence makes omission detectable | `SR-94-064` | `TD-103-030` — audit commits transactionally with the effect |
| Every background path is bounded with a terminal state | `RL-92-006` | `TD-103-008` |
| Per-surface ceilings, never one global limit; the limit may not become an oracle | `RL-92-002`, `RL-92-003` | `TD-103-013` — including the requirement to suppress rate-limit headers |

One tension was found and resolved rather than papered over: `RL-92-006`'s
"ordered progress" against `HG-102-018`'s dead-letter requirement. `TD-103-007`
resolves it by locating ordering in the database rather than the broker, and
`OI-103-004` records the obligation that resolution creates.

## 9. Review record

| Property | Value |
| --- | --- |
| Reviewed by | Alexander Wohlford — Product Owner. Package approved at v1.0 on August 20, 2026, together with the `OI-103-008` disposition. |
| Independent review | None. No second person has read any document in this package. |
| Provider contact | None. All evidence is desk research retrieved August 18, 2026, and August 21, 2026 for the v1.1 records. |
| Mechanical verification | `scripts/audit-cbd-103.py`; `scripts/check-doc-vocabulary.py` |
| Limitations | Evaluation §3 (evidence ceiling), §3.4 (asymmetric pass), §3.5 (what the v1.1 pass did not cover); Operational §6.1 (no prices); §7 above |

### 9.1 Revision record

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | August 20, 2026 | Initial approved package. |
| 1.1 | August 21, 2026 | Runs the cross-category documentary pass that `OI-103-009` required and that route-A guardrail five makes a precondition of the observation pass. Registers twenty-three provider-level records — `EV-102-007`–`012` in the block v1.0 reserved for this purpose, and `EV-102-162`–`179` in a new block above the CBD-15 range, with `180`–`181` reserved. Moves seven documentary gate outcomes: C1 gains `HG-102-010` and `HG-102-002`; C2 gains `HG-102-011`, `HG-102-010` and `HG-102-002`; C3 gains `HG-102-005` and `HG-102-010`. Nine of the ten shared documentary gates are answered; only `HG-102-003` is untouched, its pass test asking for an inspection of a provider's own data model rather than a retrieval. Adds §7.7, the one gate where a vendor's published schema argues against it. `HG-102-010` is the only cross-category gate the pass carried to every candidate. **Closes two of its own open items by retrieval rather than by decision**: `OQ-103-022` (`EV-102-174` supplies a current AWS transport source and supersedes the historical whitepaper) and `OI-103-019` (`EV-102-175` records Customer Lockbox as unsupported for PostgreSQL Flexible Server under control `PA-8`, so C3 has no Lockbox coverage in any of its five candidacies). Adds findings §7.4 (Customer Lockbox service coverage across all five Azure candidacies), §7.5 (`HG-102-005` inverts the `HG-102-009` ordering) and §7.6 (every candidate separates three of the four custody duties and none separates the fourth), §3.5 (what the pass did and did not do), eight open questions `OQ-103-018`–`025`, and four open items `OI-103-017`–`020`. **No verdict, no observation, no price, no `TD-103-*` decision, and no acceptance-criterion status changes.** `OI-103-009` is partially discharged and stays open. |
| 1.2 | August 22, 2026 | Extends the cross-category documentary pass past the three hyperscalers to the seven remaining provider identities, beginning with `HG-102-011`. Seven records `EV-102-180`–`186`; the block statement widens from `181` to `211` and no registered or cited number moves. Two candidates gain the gate — C4 Auth0 (`EV-102-180`, the only documented contractual objection right in the set) and C10 Twilio (`EV-102-186`) — and C10's `WR-102-006` rubric score rises from `0` to `1`, moving its published total to `0.14`. Adds §7.8, that AWS sits underneath C4, C5 and C10 so the candidate set is less independent than it looks, and §7.9 with `OI-103-022`, that **all four category F candidates gate their subprocessor material behind a request or an NDA**, so CBD-107's documentary gap cannot be closed by desk research at all. **No verdict moves.** |

The v1.1 change adds evidence and moves four gate outcomes. It does not move
any candidate off `ELIGIBLE-PENDING-EVIDENCE`, because §3's ceiling is set by
the ten observation gates and this pass performed none of them. §2's criterion
statuses are unaffected: every criterion that was **Partially met** at v1.0 is
partially met for the same reason at v1.1.

Three of the v1.1 records are worth flagging to a reviewer because they cut
against the grain of a comfortable reading. `EV-102-010` narrows an AWS claim a
search summary had overstated. `EV-102-166` is registered at Low confidence and
explicitly not relied on, because AWS marks the page "for historical reference
only". `EV-102-167` files Microsoft's trust page as `Asserted` rather than
`Documented`, matching `EV-102-001`, which denies C3 two gate outcomes it would
otherwise have collected on a classification decision. `EV-102-169` and
`EV-102-170` are registered for what they rule out — a Microsoft retention page
that turns out to cover Microsoft 365 rather than Azure, and an AWS contract
that could not be parsed — so that a limit of CoBudget's tooling is never read
as a gap in a vendor's contract. `EV-102-178` is the one record that argues **against** the candidate whose
documentation it comes from, and it is recorded as `UNPROVEN` rather than
resolved in Microsoft's favour even though the mechanism at issue belongs to a
browser SDK this project has no plan to use. `EV-102-175` is registered at Low
confidence even though it answers an open item, because the same page is
demonstrably wrong about Azure Private Link; the conclusion rests on `EV-102-012` with the
baseline as corroboration, and `EV-102-176` was retrieved for the sole purpose
of testing whether current documentation contradicts it.
