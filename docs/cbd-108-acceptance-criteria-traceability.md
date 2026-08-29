# CBD-108 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Maps each CBD-108 acceptance criterion and deliverable to the exact document that answers it, and states plainly where the answer is *"met"*, *"partially met"*, or *"not met"*. **Three of seven acceptance criteria are met, three partially, and one — Product Owner approval — is the gate this document is submitted to.** §4 records two places where the ticket's own text does not match what exists. |
| Document version | 0.19 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.19; Cross-Category Coherence Review v0.19; Combined Cost Model v0.19; Carried Item Disposition Register v0.19; Evidence Retrieval Pass v0.19 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `55cd5c0` |
| Last updated | August 29, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-108-provider-set-disposition-register.md` | Seven dispositions across six categories, each with a named gap, review trigger, cost guardrail structure, and legal position |
| `docs/cbd-108-cross-category-coherence-review.md` | The `OI-103-011` review: seven assumption dimensions, the hosting constraint chain, subprocessor concentration, outage, support, lock-in, and six named incoherent combinations |
| `docs/cbd-108-combined-cost-model.md` | The complete demand side, the empty price side, the cliffs, and the retrieval list that would close it |
| `docs/cbd-108-carried-item-disposition-register.md` | All 227 carried open questions and items, classified, with none closed by silence |
| `docs/cbd-108-evidence-retrieval-pass.md` | Evidence obtained against the `D3` carried items, registered in block `EV-102-212`+ |
| `docs/cbd-108-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-108.py` | Mechanical guard over carried-item completeness, class derivation, restated verdicts, identifier resolution, and the `EV-102` block this package claims |

The status vocabulary is the one CBD-103's traceability record §2 defined:
**Met**, **Met (design)**, **Partially met** — with no criterion marked Met on a
claim that lacks an evidence record or a cited approved source. This package
adds **Not met**, because one criterion is genuinely unmet and recording it as
partial would be generous to itself.

## 2. Acceptance criteria

### AC1 — Every category is selected, deferred, or blocked by a named evidence gap

**Status: Met.**

| Category | Disposition | Named gap | Where |
| --- | --- | --- | --- |
| H — Hosting | Blocked | Observation pass; no price; `HG-102-013` `UNPROVEN` | Disposition §4.1 |
| I — Identity | Blocked | Observation pass; `OQ-104-008` tier question | Disposition §4.2 |
| D — PostgreSQL | Blocked | Observation pass; no price; `OI-105-009` custody questions | Disposition §4.3 |
| E — Email | Blocked | Observation pass; no price; `OI-106-010` preview dependency | Disposition §4.4 |
| F — Financial connectivity | Blocked, doubly | Observation pass; `OI-102-023` documentary constraint | Disposition §4.5 |
| N — SMS | Blocked | Observation pass; field reduced to two by C10's `INELIGIBLE` | Disposition §4.6 |
| N — Push | Deferred | No selection exists to make | Disposition §4.6 |

**The criterion is met in its third branch, not its first.** Zero categories are
selected. The criterion's wording permits that explicitly, and `OI-108-001`
records that meeting it this way does not complete the ticket.

### AC2 — No selection rests only on a weighted score

**Status: Met.**

No selection rests on anything, because none is made. Three approved rules make
the position binding rather than a stylistic choice, and disposition §2.1 cites
each: `CR3` (cost never overrides a gate), `EX-102-003` (an exception never
converts an `UNPROVEN`), and evidence register §4 (evidence must be current on
the date of selection).

**This package publishes no rubric score of its own** and reproduces none as a
ranking. `OI-108-003` records why the one category with published scores,
category F, is not comparable with the others on its face.

### AC3 — The topology has no contradictory identity, networking, secret, regional, retention, deletion, or incident assumptions

**Status: Partially met.**

| Dimension | Analysis | Result |
| --- | --- | --- |
| Identity | Coherence §4.1 | Analyzed. `OQ-103-029`'s standing constraint identified as binding CoBudget's build, not a provider |
| Networking | Coherence §4.2 | **No contradiction is possible** — no approved source imposes a networking assumption (`OI-103-006`) |
| Secret | Coherence §4.3 | Analyzed. `HG-102-014` non-exceptable; the second principal is defined but unfilled (`OI-103-002`) |
| Regional | Coherence §4.4 | Analyzed. Single US region confirmed August 18, 2026 (`OI-103-001`); no category contradicts it |
| Retention | Coherence §4.5 | Analyzed. `HG-102-013` is the one gate that could fail every candidate at once |
| Deletion | Coherence §4.6 | Analyzed. Three different suppression blast radii across the email candidates |
| Incident | Coherence §4.7 | **One actual contradiction found** — the Customer Lockbox assumption fails in two categories |

**Why partial.** The X gates that would clear the criterion are `UNPROVEN`
across categories F and N entirely and partially elsewhere, so no set can be
certified coherent. Coherence §9 states the five steps that would convert the
map into a clearance. `OI-108-007` records the shortfall.

**What was nevertheless produced**: one live contradiction, five conditional
ones, and a constraint map showing that two of three hosting candidates support
a single-ecosystem set across five categories while the third does not.

### AC4 — Cost warning/stop thresholds, owner, cadence, and actions are explicit

**Status: Partially met.**

| Element | Status |
| --- | --- |
| Owner | **Explicit** — Product Owner, per `EX-102-001` |
| Cadence | **Explicit** — monthly, aligned to the provider billing period |
| Actions | **Explicit** — disposition §5, including the rule that no automatic tier downgrade is permitted because `CR0` ties tier to gate clearance |
| Cliffs | **Explicit** — six enumerated in cost model §5.1 |
| Warning threshold | **Cannot be set** |
| Stop threshold | **Cannot be set** |

Two blockers, both recorded upstream: `OI-102-017` (no budget ceiling exists)
and `UNKNOWN` prices in three of six categories — **down from five**, because the
retrieval pass priced category E and partly priced category N on August 29,
2026. `OI-108-002` and `OI-108-013`
record it. Cost model §7 lists the retrievals that would close the price side —
and notes that even a complete price side leaves the thresholds unset without a
ceiling.

### AC5 — Legal/contract review needs and limitations are stated

**Status: Met.**

Disposition §6 states four positions: the DPAs are the highest-leverage legal
action available, because `HG-102-013` is the one gate whose outcome moves every
category at once; NDAs for evaluation evidence are permitted but **no longer
useful for gate purposes** after `OI-102-023`; executed agreements after
selection raise a register question recorded at `OI-102-024`; and the limitation
is stated plainly — **no qualified legal reviewer has read any instrument in
this set.**

### AC6 — CBD-14 findings have explicit dispositions

**Status: Partially met**, and §4.1 records why the criterion cannot be read
literally.

The carried-item register gives an explicit disposition to all **227** open
questions and items from the six category packages, with completeness enforced
mechanically rather than asserted. That covers every CBD-14-derived finding that
reached the CBD-15 packages, because CBD-14's output arrives as the `SR-94-*`,
`EM-92-*`, `NT-92-*` and `DI-91-*` registers rather than as a separate findings
list.

**Why partial.** Two limits. `OI-108-015` records that 24 of the 227 do not
state, in their own text, what would resolve them, so their class is `D0` —
recorded honestly rather than guessed. And §4.1 below records that the
reconciliation artifact the ticket names does not exist in the form named.

### AC7 — Product Owner approves the exact package and residual risks

**Status: Not met.**

This is the gate the package is submitted to, not a claim it can make about
itself. The residual risks requiring explicit acceptance are:

1. **Nothing is selected** (`OI-108-001`) — approving this package does not
   complete CBD-108.
2. **No coherence clearance** (`OI-108-007`) — six named combinations are
   conditional risks, not cleared ones.
3. **No cost totals or thresholds** (`OI-108-002`, `OI-108-011`).
4. **Category F is not comparable with the other five** (`OI-108-003`).
5. **No independent review** (`OI-108-004`) — this package and all six it
   consumes were written and reviewed by the same person.

## 3. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| Selection and fallback disposition for every category | **Partially met** — dispositions complete; **no fallback can be named**, because naming a second choice would rank candidates the evaluations deliberately declined to rank | Disposition §4 |
| Decision records with alternatives, evidence, tradeoffs, hard-gate results, risks, cost guardrails, review triggers | **Partially met** — gate results, risks, guardrail structure and review triggers are here; alternatives and tradeoffs remain in the source evaluations and are not re-derived | Disposition §4, §5 |
| Combined low/base/high monthly and annual cost model | **Not met** — no total can be produced at any scenario; the demand side is complete and the price side is empty | Cost model §2–§4, `OI-108-011` |
| Cross-provider data-flow, subprocessor, outage, support, and lock-in review | **Met** | Coherence §5, §6, §7 |
| CBD-14 reconciliation and follow-up register | **Partially met** — the follow-up register is complete and mechanically checked; the reconciliation is discussed at §4.1 | Carried register; `OI-108-006` |

## 4. Where the ticket's text does not match what exists

Recorded rather than worked around, following the precedent `OI-107-021` set
when CBD-107's ticket stated its CBD-14 dependency backwards.

### 4.1 The named CBD-14 reconciliation artifact

The ticket's `DEPENDENCIES` line reads *"Consumes all CBD-15 category
evaluations and CBD-14 reconciliation."* The reconciliation artifact that
exists is CBD-95's, and its matrix reconciles **CBD-12**
(`docs/cbd-95-cbd-12-reconciliation-matrix.md`). CBD-14's own output reaches the
CBD-15 packages as approved registers, not as a reconciliation document.

**This package followed the approved documents and proceeded.** If the Product
Owner reads the dependency differently, the AC6 mapping changes and no evidence
does. Recorded at `OI-108-006`.

### 4.2 The Jira blocking links

CBD-108 **was** blocked in Jira by **CBD-77, CBD-78 and CBD-79** — the
activation, engagement and reliability metrics subtasks — all `Ready` and
unstarted, while the ticket's own `DEPENDENCIES` line did not mention them and no
metrics definition bears on provider selection.

**Resolved: the three links were removed on August 29, 2026**, and the removal
was verified against the live issue the same day. CBD-108 now carries eight
links, all seven inbound blockers are `Done`, and the outbound link to CBD-120 is
intact. `OI-108-005` is closed.

**CBD-108 is therefore no longer blocked by anything in Jira.** That is a tracker
correction, not an evidence one — §2's dispositions are unchanged, and the
route-A observation pass still stands between each of them and a selection.

## 5. Consistency check against the approved decisions

No approved decision is reopened, weakened, or reinterpreted by this package.

* **No CBD-11, CBD-12, CBD-14, CBD-91, CBD-92, or CBD-95 decision is changed.**
  Where this package cites one, it cites it as governing.
* **No CBD-102 rule is amended.** `CR0`, `CR3`, `CR4`, `EX-102-001`,
  `EX-102-003`, evidence register §3.3 and §4 are applied as written.
* **No CBD-103–107 or CBD-130 verdict, gate outcome, rubric score, evidence
  record, or price moves.** Every verdict restated here is derived from its
  source matrix by `scripts/audit-cbd-108.py` rather than retyped, and the
  audit fails if a source verdict changes without this package being revisited.
* **`OI-102-023` is applied, not revisited.** Its consequence for category F is
  carried into the disposition and the coherence review.

## 6. What this package does not establish

* **No provider is selected in any category**, and no ranking is published.
* **No coherence clearance is issued**; six combinations are named as risks.
* **No cost total exists** at any scenario.
* **No observation was performed, no provider contacted, no account created,
  nothing built, nothing signed.**
* **No exception is granted or sought.**
* **This is a desk package by one author**, inheriting the same limitation from
  all six evaluations it consumes.

## 7. Open item raised by this record

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-018 | **Three of seven acceptance criteria are partially met and one is not met**, and the unmet one is the approval gate itself. A package that meets its criteria in their weakest permitted branch is a defensible answer to the question CBD-108 asks, and not the answer the ticket was written expecting. | Recorded so the approval decision is taken with the shortfall visible rather than inferred from the individual sections. The route to the stronger answer is the observation pass and the `D3` retrieval block, in that order. |

## 8. Revision record

| Version | Date | Change |
| --- | --- | --- |
| 0.1 | August 29, 2026 | Initial draft package. Issues the CBD-108 decision package on the evidence that exists: seven dispositions across six categories with **zero selected**, the `OI-103-011` coherence review with one live contradiction and five conditional ones, a cost model with a complete demand side and an empty price side, and a carried-item register holding all **227** open questions and items with completeness enforced by `scripts/audit-cbd-108.py`. **No verdict, gate outcome, rubric score, evidence record or price moves anywhere.** |
| 0.2 | August 29, 2026 | Closes `OI-108-005`. The three incorrect Jira blocking links from CBD-77, CBD-78 and CBD-79 were removed on August 29, 2026 and the removal was verified against the live issue: eight links remain, all seven inbound blockers are `Done`, and the outbound link to CBD-120 is intact. **CBD-108 is no longer blocked by anything in Jira.** Recorded in §4.2 and in the disposition register's open items. The whole package moves to v0.2 because its documents cite each other by version and it is one unapproved draft; the coherence review, cost model and carried-item register carry no content change at this version. **No disposition, gate outcome, verdict, rubric score, evidence record or price changes, and the route-A observation pass remains unperformed.** |
| 0.3 | August 29, 2026 | Adds `docs/cbd-108-evidence-retrieval-pass.md`, tranche 1 of the `D3` retrieval work `OI-108-017` records as unowned. Six evidence records in a new block `EV-102-212`–`217`, above CBD-103's reservation. **Closes `OQ-106-010`** and prices category E for the first time — C2 `$0.04`, C3 `$0.06 + data`, C5 `$15.00` per month at Base — and **falsifies CBD-106 §5.1's hypothesis** that Base volume sits inside every candidate's allowance: it sits inside none of the three. Partially answers `OQ-104-016`, confirming the *"first 50,000 monthly active users"* allowance verbatim while leaving unproven that Conditional Access sits inside *"core features"*, so CBD-104 §6.6's `$0.00` for C3 still rests on an unconfirmed premise. Raises `OQ-108-001`–`004` and `OI-108-019`–`021`. **No gate outcome, verdict, rubric score or disposition changes, and no provider was contacted.** |
| 0.4 | August 29, 2026 | Tranche 2 of the retrieval pass, working the **DPA block** — `HG-102-013`, the one gate whose outcome could move every candidate in every category at once. Six further records, `EV-102-218`–`223`. **No gate outcome moves**, and the reason now differs per candidate: **C1 Google has a contractual statement of all three elements for the first time** — retention and expiry from the CDPA, region from the Service Specific Terms — blocked only by an unverified scope condition that `OQ-108-005` closes in one retrieval; **C2 AWS has had a second contractual instrument read which defers rather than states**, narrowing toward the pass test's *"Silence fails"* without establishing it; and **C3's named retrieval was found and is insufficient**, being product documentation where the test demands a contract, and scoped to Recovery Services vaults rather than the evaluated composition. `OQ-105-002` is partially answered and explicitly not closed. `OQ-107-023` was **not attempted**, because `OI-102-023` makes NDA-bound aggregator agreements unregistrable. Raises `OQ-108-005`–`006`. **No verdict, rubric score, price or disposition changes.** |
| 0.5 | August 29, 2026 | Tranche 3 retries the retrieval tranche 2 named as decisive for `HG-102-013`, and **the answer removes a prospective `PASS` rather than producing one**. Three records, `EV-102-224`–`226`. The `EV-102-218` region commitment applies only to services on Google's data-residency list; that list, read at its **April 9, 2024 snapshot** because the live page cannot be fetched, covers Cloud Run, Pub/Sub, Cloud Logging and Cloud KMS but **omits Cloud Scheduler and Secret Manager** — two components of the evaluated C1 composition, holding the `TD-103-004` scheduling surface and `HG-102-014` S4 material between them. The gate stays `UNPROVEN` for C1, now because the condition **fails for part of the composition** rather than because it is unverified. Three qualifications are recorded: the snapshot is two years old, a companion *"without location configuration"* list returned truncated and is unread (`EV-102-226`), and absence from a list is not absence of a commitment. **§4.6 of the retrieval pass states the correction to tranche 2 explicitly** rather than leaving a reader to infer it. Closes `OQ-108-005`, raises `OQ-108-007`. **No verdict, gate outcome, rubric score, price or disposition changes.** |
| 0.6 | August 29, 2026 | Tranche 4 returns to the pricing block. Three records, `EV-102-227`–`229`. **Category N is partly priced**: at Base the recurring floor is `$2.50`/month for C3 on 10DLC against `$11.00` for C2 — a 6.7× difference driven entirely by the campaign-registration fee — plus one-time registration of `$44` and `$67`, against roughly `$0.60` of monthly traffic. **`OI-130-021`'s claim that the A2P floor is not negotiable downward by low volume is now measured at 85–96% of the bill.** C2's per-segment rate was not obtainable (`OQ-108-008`). **`OQ-103-019` is answered**: Privileged Identity Management requires Microsoft Entra ID P2 or ID Governance and is on neither Free nor P1, which puts a **second** condition on CBD-104 §6.6's `$0.00` for C3 — the first being `OQ-104-016` — both pointing the same way. The record establishes what PIM requires, **not** that `HG-102-005` requires PIM; `OQ-108-009` puts that question properly. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.7 | August 29, 2026 | Tranche 5 opens categories **H** and **D** and covers part of one of them; §4.10 of the retrieval pass states plainly what it did not do. Two records, `EV-102-230`–`231`, both for C3. The expected finding — a compute-tier restriction on customer-managed keys — **did not appear**, and is registered as a negative finding rather than passed over. A sharper constraint did: **CMK on C3 is create-time-only and irreversible**, which sources the property `OI-105-004` anticipated and bears on `HG-102-039`. The `CR0` finding is the one that moves: **Azure's cheapest PostgreSQL tier is described by Microsoft as *"Not recommended for production workloads"* and *"does not qualify for 24/7 support"***, so if CoBudget will not run its primary datastore there, C3's category D floor is General Purpose at 2 vCores and 8 GiB — against a Base database of 0.4 GB. That is a floor set by support terms rather than demand, and `OQ-108-010` puts the judgment to the Product Owner rather than settling it by drafting. **No price figure was obtained in either category**, and `OI-108-022` records that the remaining H and D work is a different shape from the single-page retrievals that closed category E. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.8 | August 29, 2026 | Tranche 6 closes `OQ-108-007` using the current data-residency list, **supplied by the Product Owner** because the page truncates when fetched here — provenance stated on `EV-102-232` rather than presented as a retrieval. It **corrects tranche 3**: **Secret Manager is on the current list**, and the April 2024 snapshot that said otherwise is superseded. **Seven of the eight named C1 components are covered**, including Google Cloud Armor, checked for the first time. `HG-102-013` for C1 now turns on **two nameable things**: **Cloud Scheduler**, absent from all four lists including the companion list for services holding no customer data — so Google is not asserting it stores nothing — and whether the composition's HTTPS load balancing is the **regional** variant the list covers, a distinction CBD-103 §5 never recorded. Raises `OQ-108-011`–`012`. Two observations recorded and not acted on: **Workflows** and **Eventarc** are listed and could meet `TD-103-004` without Cloud Scheduler, which is CBD-103's composition to change; and **Cloud Monitoring** is listed only under Assured Workloads. **No gate outcome moves — `HG-102-013` stays `UNPROVEN` for C1**, and moving it is CBD-103's to do once the two questions settle. |
| 0.9 | August 29, 2026 | Tranche 7 answers `OQ-108-011` from the Product Owner: **the C1 composition uses both global and regional load balancing**, so the regional half is covered by `EV-102-218` and the **global** half is not. Two C1 components remain uncovered, and §4.12 separates them by whether a like-for-like substitute exists — **Cloud Scheduler plausibly has one in Workflows or Eventarc; the global load balancer does not**, since dropping the global tier is a functional change rather than a swap. Records the Product Owner's direction to move to regional-only as **an input to CBD-103, not executed here**, together with the consequence that must be checked first: **Cloud Armor attaches to global and regional load balancers through different policy types**, so a swap could move a gate outcome rather than only a data-location scope (`OQ-108-014`). **Amends the coherence review's regional finding** at §4.4, which had asserted that no category contradicts the single-region posture without having checked the C1 front door; the claim is narrowed and `OQ-108-013` carries whether the global load balancer stores customer data at rest. **No `EV-102-*` record is registered** — the load-balancer fact is about CoBudget's own design, not a provider claim. **No gate outcome, verdict, rubric score or disposition changes.** |
| 0.10 | August 29, 2026 | Tranche 8 settles `OQ-108-014`, and the answer is that **the question does not arise**. Four checks: **no WAF gate exists** in the catalog or rubric; **Cloud Armor is cited by no gate row**, appearing once in the whole CBD-103 package as a §5 composition component; the two edge gates that are genuinely capability-dependent, `HG-102-020` and `HG-102-021`, are **already `UNPROVEN` for all three candidates**, and a swap cannot lower an `UNPROVEN`; and `HG-102-025`, the one edge gate that passes, is `PASS (design)` of kind `CFG` resting on CoBudget's own `TD-103-016`. `EV-102-233` records that regional backend security policies support rate limiting, WAF, Adaptive Protection, bot management and TLS fingerprinting, and attach to the regional external Application Load Balancer — the product `EV-102-232` lists. **The swap is clear to execute.** The residual is stated rather than waved away: `HG-102-020` and `HG-102-021` must later be evaluated against the **regional** product, because `EV-102-233` establishes what regional supports and **not** parity with global. After the swap, **Cloud Scheduler is the single remaining uncovered C1 component**. **No gate outcome, verdict, rubric score or disposition changes.** |
| 0.11 | August 29, 2026 | Records the load-balancer swap as **executed** — CBD-103 evaluation and traceability at v1.3, both Confluence pages at v5, with `HG-102-020` and `HG-102-021` each noting that C1's eventual evaluation must run against regional Cloud Armor. Answers `OQ-108-012` **in the negative and corrects tranche 6**: `EV-102-234` records that Google's documented route to a recurring workflow *is* Cloud Scheduler, so substituting **Workflows would add it on top of Cloud Scheduler rather than replace it**. `TD-103-004` needs a fifteen-minute cron, which is not what Workflows provides. **The cheap fix is gone**: one of the two C1 gaps was closable by composition change and has been closed; the other is not, on the evidence in hand. Three routes remain and none is a retrieval — accept and record, ask Google (class `D4`), or weigh it in the selection. Raises `OQ-108-015` for Eventarc and Airflow, both unexamined, and **`OI-108-023`: nine tranches have examined C1's region position and C2's and C3's not at all**, which is an asymmetry of retrieval that must not be read as one of risk. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.12 | August 29, 2026 | Tranche 10 puts the region question to **C2 and C3**, closing the retrieval asymmetry `OI-108-023` recorded — **and the warning proved correct**. Two records, `EV-102-235`–`236`. **Only C1's region commitment is contractual**: C2's sits on a compliance FAQ and C3's in a documentation page, and evidence register §3.2 forbids a hard gate passing on Asserted evidence — so **neither C2 nor C3 can satisfy `HG-102-013`'s region element on what has been retrieved**. The three also differ in granularity, C3 committing at **Geo** level where a Geo contains many regions, and in shape: **C2 publishes no service list at all**, so no per-composition check is possible against it, and the absence of a C2 finding is an absence of evidence. **C1 looked worse because it publishes a list that can be checked.** Azure names **Microsoft Entra ID** among services that cannot have a region specified — a second independent finding against the C3 identity candidate after `EV-102-012`, carried at `OQ-108-016`. `OQ-108-017` records that neither the AWS DPA nor the Microsoft Product Terms has been read and either could change the comparison again. The coherence review is amended at §4.4 and §4.7. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.13 | August 29, 2026 | Tranche 11 settles `OQ-108-017` and **corrects tranche 10**. Two records, `EV-102-237`–`238`. **C3's region commitment is contractual after all** — the Privacy & Security Terms state that *"If Customer configures a particular service to be deployed within a Geo then, for that service, Microsoft will store Customer Data at rest within the specified Geo"* — so tranche 10's claim that only C1's was contractual was true of what had been retrieved and not of what exists. **C1 and C3 have the same shape**: contractual, conditional on a covered set, one composition component outside it. The difference is that Google enumerates the set and Microsoft does not (`OQ-108-018`). **C2 has not improved**: the DPA is incorporated into the Service Terms, the instrument `EV-102-220` already read without finding a region clause, so two routes have now failed to produce it — which establishes that the clause **has not been found**, not that it is absent, and `HG-102-013`'s *"Silence fails"* turns on the latter (`OQ-108-019`). §4.19 also collects the **four corrections this pass has made to itself**, all of which came from retrieving one more thing rather than from re-reasoning over evidence already held. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.14 | August 29, 2026 | Tranche 12 reads the **AWS DPA itself**, supplied by the Product Owner, and **corrects tranche 11**. Two records, `EV-102-239`—`240`. **C2's region commitment is contractual after all**: DPA §12.1 states that *"AWS will not transfer Customer Data from Customer's selected Region(s) except as necessary to provide the Services initiated by Customer"* — the clause `EV-102-238` reported as absent. That record's error was an **inference**: it treated the DPA's incorporation into the Service Terms as making `EV-102-220`'s partial read of the Service Terms a second route into the DPA, and incorporation by reference does not merge texts. **All three candidates now commit contractually.** For C2 the upgrade is not an improvement: §17 scopes the commitment to **Personal Data only**, narrower than the *"your content"* of the Asserted statement it replaces; §16 subordinates the DPA to the Service Terms; and the open-ended carve-out turns out to be contractual rather than a gloss. **`HG-102-013` still fails for C2**, but nameably: §5.2 and §8 **assign backup and archiving to the customer**, so retention and expiry fail by allocation rather than by the pass test's *"Silence fails"* — which no further parse of the DPA can overturn. `EV-102-170` and `EV-102-238` are superseded. Closes `OQ-108-017` and `OQ-108-019`, raises `OQ-108-020`—`022` and `OI-108-024`. The coherence review is amended at §4.4 and §4.5 and the disposition register at §4.1. **No verdict, gate outcome, rubric score, price or disposition changes.** |
| 0.15 | August 29, 2026 | Tranche 13 settles `OQ-108-018` and `OQ-108-016`. Two records, `EV-102-241`–`242`, and the pass's evidence reservation is widened from `212`–`241` to `212`–`271`. **`OQ-108-018`**: `EV-102-241` retrieves the Microsoft Azure Core Services list, so **C3's composition can be checked against its commitment for the first time** — Container Apps, API Management, Service Bus, Key Vault, Azure Monitor, PostgreSQL, Communication Services and Entra ID are on it; **Front Door and Logic Apps were not seen**, which would give C3 the same shape of gap as C1, an edge component and a scheduler. Recorded as *not seen* rather than absent, because the list may have been rendered incompletely and tranche 3 made the mirror-image mistake (`OQ-108-023`). **`OQ-108-016`**: settled, and **the tranche 10 worry is retired** — `EV-102-242` establishes that an external tenant selects its own geographic location, so the Entra ID non-regional naming does not reach Entra External ID. What replaces it is more precise: the selectable unit is **North America**, coarser than `OI-103-001`'s single-United-States-region posture; the choice **cannot be changed after it is set**, the second create-time-irreversible decision found in the C3 set after `EV-102-230`; and MFA data sits *"North America and/or in geo location"*. The coherence review §4.7 is amended to **withdraw** the second finding, leaving the Customer Lockbox absence standing alone. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.16 | August 29, 2026 | Tranche 14 answers `OQ-108-022` and records a Product Owner ruling. Two records, `EV-102-243`—`244`. **`OQ-108-022`: no.** The **AWS Customer Agreement** — the one general AWS instrument the corpus had never retrieved — states a 30-day post-termination floor at §5.3(b) (*"we will not take action to remove"*, not a holding period) and assigns backup and archiving to the customer at §2.3, a **second** instrument carrying `EV-102-240`'s allocation. Against the C1 benchmark of a recovery window plus a 180-day maximum, no AWS instrument states either element. **The term is deferred, not absent**: Service Terms §1.15 points at per-service technical documentation, which `EV-102-220` already recorded at tranche 2 — tranche 12's framing of `OQ-108-022` understated what the pass held, and §4.23 records that as the sixth correction and the first to a framing rather than a claim. **Product Owner ruling, August 29, 2026: `HG-102-013`'s pass test governs and written evidence is enough.** The tension is unique to that row across the whole catalog, and evidence register §3.2 still bars Asserted evidence from a `PASS`, so the operative rule is Documented-or-stronger, contract or not. `EV-102-236` becomes sufficient for C3's region element on its own and `EV-102-221` loses its class objection while keeping its scope objection; `EV-102-235` still fails but on class rather than instrument type. **No gate moves** — the ruling changes what kind of evidence would move them, and for C2 and C3 the remaining work becomes a bounded `D3` documentation retrieval. Two misreferences in tranche 13 corrected (`OQ-108-020` cited for `OQ-108-023`), with `OI-108-026` recording that the audit checks identifier existence rather than appropriateness. Closes `OQ-108-022`, raises `OQ-108-025`—`027`, `OI-108-025` and `OI-108-026`. The coherence review is amended at §4.5 and the disposition register at §4.1. **No verdict, gate outcome, rubric score, price or disposition changes.** |
| 0.17 | August 29, 2026 | Tranche 15 settles `OQ-108-023`, **and it splits**. One record, `EV-102-245`, from a targeted re-read of the Azure Core Services list. **Logic Apps is present** — nested inside *"App Service (API Apps, Logic Apps, Mobile Apps, WebJobs, Functions)"*, so it was never missing, only invisible to the flat enumeration `EV-102-241` produced. **Azure Front Door is absent**, established on a list that rendered from Anomaly Detector to VPN Gateway without truncating. **C3's composition therefore has one uncovered component, not two**, and it is the **global edge** — the exact structure C1 carried before the tranche 7 swap, since CBD-103 §5 names the C3 edge as *"Front Door / API Management"* with API Management on the list and Front Door not. `OQ-108-028` puts the C3 counterpart of that swap, under the same caution: dropping a global edge tier is a functional change, not a swap. Records that the §4.24 ruling **does not reach Front Door** — the objection there is **scope**, not class, and the ruling relaxed class while leaving every scope condition untouched. **No verdict, gate outcome, rubric score or disposition changes.** |
| 0.19 | August 29, 2026 | Tranche 17 settles `OQ-108-026`, **drafted concurrently with separate `OQ-108-025` work on another branch**. The evidence reservation is sub-divided to prevent the collision `scripts/audit-cbd-105.py` was corrected for: **`246`–`255` is reserved for the concurrent tranche and this one claims `256` onward**, so the gap below `256` is deliberate. One record, `EV-102-256`. **A correctly scoped Azure retention and expiry statement exists**: Azure Database for PostgreSQL Flexible Server states retention of 7 days default to 35 maximum, expiry — backups *"automatically deleted after the retention period"* and deleted with the server — and region, zone-redundant storage restricting replication *"to within a country or region"*. It **supersedes `EV-102-221` for this purpose**, whose scope objection survived the §4.24 ruling and does not apply here. **It does not move the gate**: `HG-102-013` is cross-category and this covers the database component only, with the hosting components carrying no equivalent statement (`OQ-108-029`), and the outcome belongs to CBD-105 and CBD-103 rather than here. Three findings carried beyond the question: backup custody is genuinely separated, which bears on `HG-102-039`; **geo-redundancy is the third create-time-irreversible decision found in the C3 set**, after `EV-102-230` and `EV-102-242`, across three categories; and the **default** redundancy is the one compatible with `OI-103-001`, with the incompatible option opt-in. §4.29 folds in the tranche 15 baseline annotation, now stale, and records that the audit checks document-and-constant agreement rather than currency — the same property `OI-108-026` observes about identifier checking. **No verdict, gate outcome, rubric score or disposition changes.** |
