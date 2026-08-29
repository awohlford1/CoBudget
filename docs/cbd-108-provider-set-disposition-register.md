# CBD-108 — Provider Set Disposition Register

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Issues the CBD-108 decision package on the evidence that exists on August 29, 2026. **It selects no provider, because no candidate in any category is selectable**, and §2 records why that is a structural result rather than a finding about any vendor. Every category receives an explicit disposition with a named gap, per the ticket's first acceptance criterion. |
| Document version | 0.6 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Cross-Category Coherence Review v0.6; Combined Cost Model v0.6; Carried Item Disposition Register v0.6; Acceptance Criteria Traceability v0.6; Evidence Retrieval Pass v0.6 |
| Confluence page | **Not published.** No page is registered in `scripts/sync-confluence.py`; registration follows approval, per AGENTS.md. |
| Repository baseline | `153312e` |
| Last updated | August 29, 2026 |

## 1. Purpose and standing

CBD-108's title has two halves — *"Select managed provider set **and** issue
decision package"* — and only one of them is available on current evidence.

This document issues the package. It does not select, and §2 explains that the
inability to select is not a judgment this document is making. The ticket's
first acceptance criterion permits exactly this: *"Every category is
**selected, deferred, or blocked by a named evidence gap**."* Three outcomes,
not one.

**What this document does.** It gives each category an explicit disposition, a
named gap where it is blocked, a fallback where one can be named, the review
trigger that changes the disposition, and the legal and contractual work the
category will need. It closes nothing by silence.

**What it does not do.** It names no preferred provider, publishes no ranking,
performs no observation, retrieves no price, and grants no exception. It also
does not weaken any evaluation's verdict: every verdict below is the one its own
approved package recorded, restated rather than re-derived.

## 2. The position this package inherits

**No candidate in any category holds an `ELIGIBLE` verdict.** This is not six
independent findings that happened to agree. It is one cause, recorded
identically in all six packages.

`OI-103-008` established that a block of pass tests in every category require a
live-account observation that CBD-15's original scope excluded. The Product
Owner resolved it on August 20, 2026 by authorizing route A — observation
evidence is now obtainable — but **the observations have not been performed**.
Until they are, evidence register §3.3 fixes the outcome: an observation-bound
gate is `UNPROVEN`, and a candidate with one or more `UNPROVEN` and no `FAIL` is
`ELIGIBLE-PENDING-EVIDENCE`, which that section defines as *not disqualified,
but not selectable*.

| Category | Subtask | Candidates | Verdicts | Observation-bound pass tests |
| --- | --- | --- | --- | --- |
| **H** — Hosting, runtime, jobs, telemetry | CBD-103 | C1 Google Cloud, C2 AWS, C3 Azure | All three `ELIGIBLE-PENDING-EVIDENCE` | 10 (`OI-103-008`) |
| **I** — Identity | CBD-104 | C2 Amazon Cognito, C3 Microsoft Entra External ID, C4 Auth0 | All three `ELIGIBLE-PENDING-EVIDENCE` | 9 (`OI-104-007`) |
| **D** — Managed PostgreSQL | CBD-105 | C1 Cloud SQL, C2 Amazon RDS, C3 Azure Flexible Server | All three `ELIGIBLE-PENDING-EVIDENCE` | 8 (`OI-105-007`) |
| **E** — Transactional email | CBD-106 | C2 Amazon SES, C3 Azure Communication Services Email, C5 Postmark | All three `ELIGIBLE-PENDING-EVIDENCE` | 11 (`OI-106-007`) |
| **F** — Financial-data connectivity | CBD-107 | C6 Plaid, C7 MX, C8 Mastercard (Finicity), C9 Akoya | All four `ELIGIBLE-PENDING-EVIDENCE` | 9 (`OI-107-007`) |
| **N** — Push and SMS | CBD-130 | C2 AWS End User Messaging SMS, C3 Azure Communication Services SMS, C10 Twilio | C2 and C3 `ELIGIBLE-PENDING-EVIDENCE`; **C10 `INELIGIBLE`** | — |

**C10 Twilio is the only candidate in the CBD-15 set carrying a `FAIL`**, on
`HG-102-073`. `OI-130-009` records the Product Owner's decision of August 22,
2026 not to approve the exception, so C10 stays `INELIGIBLE` and, under the
route-A guardrail that observations run only on candidates without a documentary
`FAIL`, drops out of the observation pass entirely. Category N's field is two.

### 2.1 Why a selection cannot be made by weighing what is known

The ticket's second acceptance criterion — *"No selection rests only on a
weighted score"* — is satisfied here in the strongest available form: **no
selection rests on anything, because none is made.** Three rules make the
position binding rather than cautious.

* **`CR3` — cost never overrides a gate.** The one category with retrieved
  prices, identity, has a spread of `$0.00 + unknowns` to `$35.00/month`
  (CBD-104 §6.6). Cheapest is not a route into selection while nine observation
  gates are open for each candidate.
* **`EX-102-003` — an exception never converts an `UNPROVEN`.** Exceptions
  address `FAIL`s. There is no mechanism by which an unperformed observation
  becomes a pass.
* **Evidence register §4 — re-verify before final selection.** Evidence must be
  current *on the date the provider is chosen*. Selecting now on August evidence
  and observing afterwards inverts that rule.

## 3. Disposition vocabulary

| Disposition | Meaning |
| --- | --- |
| **Selected** | A provider is chosen for the category and the choice is defensible on current evidence |
| **Deferred** | No decision is required in this phase — the category has nothing to select, or the choice does not arise for Private MVP |
| **Blocked** | A decision is required and cannot be made, with the specific gap named |

**"Blocked" is a statement about evidence, not about vendors.** In every case
below, the gap is work CoBudget has not done, not a deficiency any candidate has
been shown to have.

## 4. Dispositions

| # | Category | Disposition | Named gap |
| --- | --- | --- | --- |
| 1 | **H** — Hosting | **Blocked** | Route-A observation pass unperformed (10 tests); no price retrieved for any candidate; `HG-102-013` `UNPROVEN` for all three |
| 2 | **I** — Identity | **Blocked** | Route-A observation pass unperformed (9 tests); `OQ-104-008` unresolved, which moves C4's price by an unbounded amount |
| 3 | **D** — PostgreSQL | **Blocked** | Route-A observation pass unperformed (8 tests); no price retrieved; C3 custody questions at `OI-105-009` unanswered |
| 4 | **E** — Email | **Blocked** | Route-A observation pass unperformed (11 tests, requiring live sending); C3 suppression list in preview without an SLA (`OI-106-010`). **The price gap is closed** — see §4.4 |
| 5 | **F** — Financial connectivity | **Blocked, and doubly** | Route-A observation pass unperformed (9 tests); **and** the documentary gap is now constrained by `OI-102-023` — §4.5 |
| 6a | **N** — SMS | **Blocked** | Route-A observation pass unperformed; field reduced to two by C10's `INELIGIBLE` verdict |
| 6b | **N** — Push | **Deferred** | **No selection exists to make** — §4.6 |

Six categories, seven dispositions. **Zero selected.**

### 4.1 H — Hosting, runtime, jobs, telemetry

**Blocked.** Ten pass tests are observation-bound and none has been run. No
price was retrieved for any of the three candidates — CBD-103 §6.1 records that
this is deliberate, because cost rule `CR4` forbids recording an unknown price
as zero and evidence register §3.2 requires Documented-or-stronger evidence for
a cost figure.

**No fallback can be named.** A fallback is a second choice, and naming one
would rank candidates the evaluation deliberately declined to rank.

**Why this is the category to unblock first.** Not because its gap is largest,
but because every other category's answer depends on it. The companion coherence
review §2 sets out the constraint chain: a hosting selection materially narrows
identity, database, email and SMS at once.

**The `HG-102-013` half of this gap moved on August 29, 2026**, though the gate
did not. The retrieval pass §4.4 records the position per candidate: **C1 now has
a contractual statement of all three elements**, blocked by a scope condition that
tranche 3 then **verified and found wanting** — the commitment's service list
omits **Cloud Scheduler** and **Secret Manager**, two components of the evaluated
composition, so the remaining work is `OQ-108-007` rather than the single retrieval
tranche 2 predicted; **C2 has had a second contractual
instrument read that defers rather than states**; and **C3's named retrieval was
found and is insufficient**, being documentation where the pass test demands a
contract. The gate stays `UNPROVEN` for all three.

**Review trigger.** The route-A observation pass completing for C1, C2 and C3,
and `OQ-108-005` for the `HG-102-013` half.

### 4.2 I — Identity

**Blocked.** Nine pass tests are observation-bound. This is the only category
with retrieved prices, and they do not help: `CR3` prevents cost from selecting,
and CBD-104 §6.6 states the honest summary — identity cost is close to a
rounding error against the decision's other terms.

**One gap is disproportionate to its size.** `OQ-104-008` asks whether
`HG-102-031` can be satisfied by refresh-token revocation on Auth0's Essentials
plan. If it cannot, `CR0` moves C4 from `$35/month` to a contact-sales
Enterprise tier — an unbounded move, and the sharpest cost cliff in the set. It
is a retrieval, not an observation, and it can be closed independently of the
pass.

**Constrained by the hosting choice.** `OI-104-010` records that a C1 hosting
selection forces a standalone identity vendor, because Google Cloud Identity
Platform lacks passkeys. That rests on a single screening record (`EV-102-029`),
and `OQ-104-013` asks for it to be re-confirmed from primary catalogs before it
is relied on. **This package does not rely on it** — it is carried into the
coherence review as a constraint to verify, not as a conclusion.

**Review trigger.** The observation pass, plus `OQ-104-008` and `OQ-104-013`.

### 4.3 D — Managed PostgreSQL

**Blocked.** Eight pass tests are observation-bound. `OI-105-007` records that
the D observations can share the H evaluation accounts, so this category adds
little to the pass's cost. No price was retrieved.

`OI-105-009` records two C3 custody questions — cross-subscription restore and
post-restore key revocation — unanswered by retrieved documentation. Neither is
a `FAIL`, and both are exactly the kind of question that must be answered before
C3 could be selected here.

**Review trigger.** The observation pass, plus `OI-105-009`'s two questions.

### 4.4 E — Transactional email

**Blocked.** Eleven pass tests are observation-bound, and this is the only
category whose observations mean **sending mail**. `OI-106-007` records the
guardrail the route-A authorization imposes: destinations must be mailboxes
CoBudget controls, and no live customer address appears in an evaluation
account.

**This category's price gap is closed**, and it is the only one where that is
true. The retrieval pass of August 29, 2026 registered `EV-102-212`–`215`: at
Base, **C2 `$0.04`, C3 `$0.06 + data`, C5 `$15.00`** per month. It also
falsified CBD-106 §5.1's hypothesis — Base volume of 250 messages sits inside
**none** of the three candidates' allowances. The disposition does not change,
because `CR3` prevents cost from selecting and eleven observation-bound tests
remain, but the ~250× spread is now a known input rather than an unknown, and it
prices the standalone option a C1 hosting selection would force.

`OI-106-010` records that C3's suppression list is in public preview without a
service-level agreement while `ED-106-003` depends on suppression working. Not a
`FAIL` — the capability is documented — but a preview dependency in a
release-blocking path, and one that may resolve itself before selection. The
evaluation set a re-verification date of **November 21, 2026**, earlier than the
register's usual shelf life.

**Review trigger.** The observation pass, plus the November 21 re-verification.

### 4.5 F — Financial-data connectivity

**Blocked, and the only category blocked by two independent things.**

Nine pass tests are observation-bound, as elsewhere. What is not as elsewhere is
the documentary position. `OI-102-023` was settled on August 29, 2026: material
received under a non-disclosure agreement does not enter the evidence register
and supports no finding. All four candidates gate their subprocessor and
compliance material behind a request or an NDA (`EV-102-182`–`185`), where every
other category's equivalent material is public.

The consequences, recorded so they are not rediscovered:

* **C7 MX's route cannot close a gate whatever it supplies**, because its trust
  portal states an NDA requirement explicitly.
* **C6 Plaid is the only confirmed route that can produce a registrable
  record**, because it is the only one stating no NDA.
* **C8 and C9's terms are unknown** and must be established *before* material is
  requested — the disposition binds from the moment of receipt.
* **Category F's rubric ceiling of `2` stands** for any candidate whose only
  stronger material is NDA-bound. `WR-102-*` scores in this category are
  therefore not comparable on their face with the other five.

**This is the most important asymmetry in the package.** It must be weighed as a
limit of what was obtainable on publishable terms, **not as a finding about the
aggregators**. All four are being penalised by nothing except a disclosure
practice their market treats as normal.

**Review trigger.** The observation pass, the C6 trust-portal request, and the
C8/C9 terms enquiries.

### 4.6 N — Push and SMS, which need separate dispositions

**SMS: blocked.** Observation-bound as elsewhere, on a field of two. C3's
Opt-Out Management API is in preview without an SLA and `HG-102-073` depends on
it (`OI-130-020`), which is a real risk to a two-candidate field —
`OQ-130-011` re-verifies by **November 21, 2026**.

**Push: deferred, because no selection exists to make.** CBD-130 §4.3 records
that the push transports are **not candidates**; they are measured as
subprocessors, because the platform forces them. `OI-130-014` records the
resulting mismatch with the ticket's own title. There is nothing here to select,
to defer *between*, or to block — and recording it as blocked would imply an
absent decision that is not absent.

**Review trigger for SMS.** The observation pass, plus `OQ-130-011`.

## 5. Cost guardrails

The ticket requires that *"cost warning/stop thresholds, owner, cadence, and
actions are explicit."* The structure is specified below. **The two threshold
values cannot be set**, and saying so is more useful than inventing them.

Two facts block the numbers, both recorded upstream rather than discovered here:

* **`OI-102-017` — no budget ceiling exists.** No approved source sets one, so
  cost cannot exclude a provider in any category.
* **Prices are `UNKNOWN` in four of six categories.** Identity and email carry
  retrieved figures; two of identity's three totals depend on unresolved tier
  questions (CBD-104 §6.6), and email's C3 rate is held at Low confidence on the
  vendor's own disclaimer.

| Element | Position |
| --- | --- |
| **Owner** | Product Owner, as the only role `EX-102-001` permits to accept a residual |
| **Cadence** | Monthly during Private MVP, aligned to the provider billing period |
| **Warning threshold** | **Cannot be set.** Requires a budget ceiling (`OI-102-017`) and retrieved prices |
| **Stop threshold** | **Cannot be set**, same reason |
| **Action on breach** | Structure available: identify the driving `CT-102-*` line, check it against the cliffs each cost assessment enumerates, and refer a tier change to the Product Owner. No automatic downgrade, because `CR0` ties tier to gate clearance — a cheaper tier can fail a gate |
| **Cliffs to monitor** | Enumerated per category in each assessment's cost-cliff section. The sharpest is `OQ-104-008`'s unbounded Auth0 Enterprise move |

**This is a named gap, recorded at `OI-108-002`.** The combined cost model
companion sets out exactly what must be retrieved to close it.

## 6. Legal and contract review

Required by the ticket's fifth acceptance criterion. **No legal review has been
performed, and this package does not constitute one.**

| Need | Position |
| --- | --- |
| **Data processing agreements** | Unread for most candidates. `HG-102-013`'s pass test says *"Silence fails"*, and `OQ-103-024`/`OQ-107-023` record that this is the one gate that could fail every candidate in every category simultaneously. **Reading the DPAs is the highest-leverage legal action available** |
| **NDAs for evaluation evidence** | Permitted by the CBD-15 amendment of August 22, 2026, but `OI-102-023` now establishes that material so obtained supports no finding. **Signing an NDA to obtain evaluation evidence is no longer useful for gate purposes** |
| **Executed agreements after selection** | Out of scope here. `OI-102-024` records the register question it raises: a confidential executed DPA is not registrable under evidence register §3.0.2, yet `HG-102-013` expects gate outcomes to rest on exactly such instruments |
| **Limitation** | No qualified legal reviewer has read any instrument in this set. Every contractual statement in the CBD-15 packages is a reading of a published document by its author |

## 7. What this package does not establish

* **No provider is selected, in any category.** Nothing here is a preference, a
  shortlist within a shortlist, or a ranking.
* **No verdict moves.** Every verdict in §2 is restated from its approved
  package.
* **No gate outcome, rubric score, price, or evidence record changes.**
* **No exception is granted**, and none is sought.
* **Nothing is built, provisioned, contacted, or signed.**
* **This is a desk package by one author**, inheriting that limitation from all
  six evaluations, none of which was reviewed by anyone other than its author.

## 8. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-001 | **The package selects nothing, which is a permitted outcome but not a useful one.** Its value sits in the coherence review, the carried-item register, and the named gaps — not in the selection deliverable the ticket leads with. | Recorded so approving this package is not mistaken for completing CBD-108. A second version after the observation pass is what converts dispositions into selections. |
| OI-108-002 | **Cost warning and stop thresholds cannot be set** — §5. No budget ceiling exists and prices are `UNKNOWN` in five of six categories. | The ticket's fifth acceptance criterion is **partially met**: owner, cadence, action structure and cliffs are explicit; the two numbers are not. |
| OI-108-003 | **Category F's rubric scores are not comparable on their face with the other five categories'**, because `OI-102-023` caps them at `2` for any candidate whose stronger material is NDA-bound. | Any cross-category comparison must state this. It is a limit of what was obtainable on publishable terms, not a finding about the aggregators. |
| OI-108-004 | **This package has been reviewed by no one other than its author**, and inherits the same limitation from all six evaluations it consumes. | The independent security review required before public launch remains outstanding. A selection made on this basis carries that residual. |
| OI-108-005 | ~~**CBD-108 is blocked in Jira by CBD-77, CBD-78 and CBD-79**~~ **Resolved — the three links were removed on August 29, 2026.** Verified against the live issue the same day: CBD-108 now carries eight links, and all seven inbound blockers — CBD-95, CBD-103, CBD-104, CBD-105, CBD-106, CBD-107 and CBD-130 — are `Done`, with the outbound link to CBD-120 intact. | Closed. **CBD-108 is no longer blocked by anything in Jira.** That removes a tracker obstacle and not an evidence one: the route-A observation pass still stands between every disposition in §4 and a selection, and this issue's `Ready` status is now an accurate description of the position rather than an artifact of three unstarted metrics subtasks. |
| OI-108-006 | **The ticket's `DEPENDENCIES` line names "CBD-14 reconciliation", but the reconciliation this package can consume is CBD-95's**, whose matrix reconciles **CBD-12** (`docs/cbd-95-cbd-12-reconciliation-matrix.md`). CBD-14's own findings reach the CBD-15 packages as the `SR-94-*`, `EM-92-*`, `NT-92-*` and `DI-91-*` registers rather than as a reconciliation artifact. | Recorded rather than resolved. The traceability companion maps the acceptance criterion to what actually exists; if the Product Owner reads the dependency differently, the mapping changes and no evidence does. |
