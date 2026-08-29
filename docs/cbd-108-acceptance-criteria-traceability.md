# CBD-108 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Maps each CBD-108 acceptance criterion and deliverable to the exact document that answers it, and states plainly where the answer is *"met"*, *"partially met"*, or *"not met"*. **Three of seven acceptance criteria are met, three partially, and one — Product Owner approval — is the gate this document is submitted to.** §4 records two places where the ticket's own text does not match what exists. |
| Document version | 0.3 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.3; Cross-Category Coherence Review v0.3; Combined Cost Model v0.3; Carried Item Disposition Register v0.3; Evidence Retrieval Pass v0.3 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `ec62d9a` |
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
and `UNKNOWN` prices in four of six categories — **down from five**, because the
retrieval pass priced category E on August 29, 2026. `OI-108-002` and `OI-108-013`
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
