# CBD-130 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Maps each CBD-130 acceptance criterion and deliverable to the exact evidence that answers it. §7 records that this is the last CBD-15 category evaluation, and what CBD-108 inherits from all six. |
| Document version | 1.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 16 `PN-130-*` decisions, the screening and 23-gate evaluation with its verdicts and `EV-102-132`–`140` records, the published rubric scores with their R5 profile, the operational and cost assessment with its verified segment conversion and `CR4` unknowns, and this traceability record. It approves no provider, performs no observation, sends no message, and registers no origination identity. **It expressly does not approve the `HG-102-073` exception**: `EX-102-001` reserves that decision, `OI-130-009` requests it, and C10 stands `INELIGIBLE` until it is granted. It leaves `OI-130-001`–`021`, `OI-130-010`'s gate-reading question, `OI-102-022`, `EG-91-006`, `EG-91-024`, and every `OQ-130` question open. |
| Jira | [CBD-130](https://cobudget.atlassian.net/browse/CBD-130) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Push and SMS Delivery Boundary Specification v1.0; Candidate Shortlist and Gate Evaluation v1.1; Operational and Cost Assessment v1.0 |
| Confluence page | [CBD-130 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/13860865) |
| Repository baseline | `d0d5bb1` |
| Last updated | August 21, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-130-push-and-sms-delivery-boundary-specification.md` | The push and SMS posture, as 16 `PN-130-*` decisions |
| `docs/cbd-130-candidate-shortlist-and-gate-evaluation.md` | 23-gate matrix over three SMS candidates, the push-transport measurement, findings F1–F6, rubric scores with the R5 profile, evidence `EV-102-132`–`140`, and the §12 recommendation |
| `docs/cbd-130-operational-and-cost-assessment.md` | Volume, the verified segment conversion, channel operations, outage behaviour, exit, and the `CT-102-*` structure with `CR4` unknowns |
| `docs/cbd-130-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-130.py` | Mechanical guard over identifier resolution, matrix completeness, the restated tallies, and the rubric arithmetic |

The status vocabulary is the one CBD-103's traceability record §2 defined:
**Met**, **Met (design)**, **Partially met**.

## 2. Acceptance criteria

### AC1 — Every candidate is measured against all category N and cross-category gates

**Status: Met.**

All 23 applicable gates — 15 cross-category **X** plus 8 category **N** — carry
an outcome for each of the three SMS candidates in evaluation §6.1 and §6.2, and
`scripts/audit-cbd-130.py` derives the §6.4 tally from those tables so the
restatement cannot drift.

The push half is measured in §6.3 against the transports rather than against
candidates, because §7.1 establishes there is nothing to select. That is a
departure from the ticket's framing and it is recorded at `OI-130-001` and
`OI-130-014` rather than glossed.

One qualification the criterion invites: three category-N gates are
channel-specific and the catalog cannot scope a gate to one channel — finding
F5. `HG-102-071` asks about push registration tokens, which SMS does not have.
It is recorded `UNPROVEN` against the SMS candidates rather than given an
invented outcome, because the approved vocabulary offers three values and this
evaluation does not extend an approved closed set.

### AC2 — No gate passes on vendor assertion alone; assertion or absent evidence produces `UNPROVEN`, not a pass

**Status: Met.**

Exactly one gate passes anywhere in the matrix — `HG-102-010` on C2 — and it
rests on `EV-102-135`, a vendor technical documentation page at **Documented**
class. No `PASS` anywhere rests on Asserted or Absent evidence.

The rule is visible working in the opposite direction too: `EV-102-139` records
C3's opt-out API capability, and the gate is still `UNPROVEN`, because the pass
test requires suppression entries be created and removed via API and a carrier
keyword observed to register. Documented capability did not become a pass.

### AC3 — A gate failure carrying a compensating control records the control, the residual risk against the affected `DI-91` class and tier, and the approver; it is never scored as a pass

**Status: Met.**

Evaluation §7.3 carries the CBD-15 set's first `FAIL`. Every field catalog §2.4
and exception rules §6 require is present:

| Required field | Where |
| --- | --- |
| The failed gate and its cited source | `HG-102-073`, citing `NT-92-004`, `NT-92-005`, `DI-91-059` |
| The compensating control, and whether vendor or CoBudget work | `PN-130-008` — **CoBudget-side**, so `EX-102-007` applies and the control is not effective until built and verified |
| Residual — affected classes and tier | `DI-91-029` destinations (S3) and `DI-91-059` suppression state (S3); no S4 class involved |
| Residual — threat re-opened | CoBudget cannot reconcile against, or clear, the provider-side block |
| Residual — who bears it, and can they perceive it | The recipient, and **yes** — with no in-product remedy |
| Residual — detection | Partial: detectable on a send attempt, never proactively |
| Residual — reversal condition | The vendor exposing read and write access |
| Residual — interaction | None; `EX-102-006`'s stacking threshold is not engaged |
| **Approver** | **Not approved.** `EX-102-001` reserves it to the Product Owner; `OI-130-009` requests the decision |

It is not scored as a pass: the matrix records `FAIL`, the verdict is
`INELIGIBLE`, and evaluation §8.1 prints the verdict beside the score per R1.

### AC4 — SMS cost is converted from messages to billable segments, with the assumed segments-per-message and destination countries recorded

**Status: Met**, and computed rather than assumed.

| Sub-criterion | Where |
| --- | --- |
| Conversion performed | Operational §2.2 — `DM-102-047`'s 60 peak-month messages equal **60 billable segments** at Base, 500 at High |
| Segments-per-message stated | **1**, and *verified*: `NT-92-001`'s body is 56 characters, all basic GSM-7, occupying 35% of a 160-character segment |
| Destination scope stated | **United States only** |
| Restated per cost template §5.1 | Yes — in operational §2.2 and again in every row of the §5.2 cost record |
| The assumption's expiry named | Operational §2.2 — in UCS-2 the current English body uses 56 of 70 characters, so **the permitted URL alone doubles the line** before any translation. `OI-130-004` records that the URL and locale decisions are one decision |

The template asked that the assumption be restated rather than silently
inherited. This package restates it and then checks it, which is why the
expiry condition is stated as arithmetic rather than as a caution.

### AC5 — Every evidence item records source, retrieval date, confidence, and limitations

**Status: Met.**

All nine records `EV-102-132`–`140` carry a precise source with URL and page
title, a retrieval date of August 21, 2026, an evidence class, a confidence, a
limitations field, and a re-verify date.

Two confidence values are lowered below their class default with the reason
stated, per §3.1: `EV-102-139` to Low because the feature is in preview without
an SLA — the same treatment `EV-102-061` received in CBD-106 — and no record is
raised above its class anywhere.

One limitation is worth naming because it records a research decision rather
than a source property: `EV-102-134` states that Twilio's 13-month default
retention figure **is not relied on for any gate outcome**, because it appears in
support material that was not fetched at source. An earlier search summary in
the same session proved wrong in both directions, so the record uses only what
the primary page establishes.

### AC6 — Scores cannot hide a failed hard gate or an unsupported claim

**Status: Met**, and this is the criterion the package works hardest at.

| Mechanism | Where |
| --- | --- |
| Verdict printed with every score | Evaluation §8.1 — C10's `INELIGIBLE` sits beside its total, per R1 |
| No total reported alone | §8.1 carries all seven subscores; §8.2 names every non-zero cell; §8.3 lists every zero |
| Every zero listed explicitly per R4 | §8.3 — twenty-four of thirty criteria on all three candidates, plus the candidate-specific additions |
| Evidence-confidence profile per R5 | §8.5 — 80%, 90% and 93% Absent, and **no criterion anywhere rests on Observed, Contractual or Attested evidence**, which is why nothing scores above `2` |
| The score's meaning stated | §8.4 — the totals rank retrieval depth, not providers, and the lowest total belongs to the candidate whose material is most scattered |
| The failed gate cannot be averaged away | C10's `FAIL` appears in the matrix, the tally, the verdict, §7.3's residual record, §8.1's verdict line, and §12.2's refusal to recommend |

R4's concern is a total masking a zero. Here the inverse risk is larger — a
reader treating three near-zero totals as a verdict on three companies — and
§8.4 addresses it directly rather than leaving the numbers to speak.

## 3. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| Gate evaluation per candidate with an eligibility verdict | **Met.** Three verdicts: two `ELIGIBLE-PENDING-EVIDENCE`, one `INELIGIBLE` | Evaluation §6.4 |
| Rubric scores with per-dimension subscores, every zero listed, and an evidence-confidence profile | **Met.** The first published rubric scores in the CBD-15 set | Evaluation §8 |
| Cost record naming the tier priced and the gates that forced it, with SMS converted to billable segments | **Partially met.** The conversion is done and verified, the assumptions are restated, and the cliffs are named. **No tier is named because no gate forces one and no price was retrieved** — `CR4` | Operational §2.2, §5 |
| Evidence register entries recording source, retrieval date, confidence, and limitations | **Met.** Nine records, `EV-102-132`–`140`, with `141`–`161` reserved | Evaluation §9 |
| Recommendation with compensating controls, residual risks, and open questions | **Partially met.** Push is recommended fully — adopt no provider. **No SMS provider is recommended**, and §12.2 states why: ten observation-bound gates unperformed, and two Product Owner decisions that would change the candidate set before comparison is meaningful | Evaluation §12 |

## 4. Dependencies satisfied

| Dependency | How consumed |
| --- | --- |
| CBD-102 gate catalog, rubric, demand model, cost template, evidence register | All five. The 23-gate matrix; verdicts per evidence register §3.3; rubric column N with R1–R5 applied in full for the first time in the set; `DM-102-040`–`047`; the `CT-102-*` structure with `CR0`–`CR7`; `EV-102-132`–`161` extending the register without collision |
| Category N rubric weight column, approved August 16, 2026 | Applied as fixed. Evaluation §8.1 uses the approved weights unchanged, and `OI-130-019` records a limitation of the solo-operator weighting **without** proposing to change it — the ticket and `OI-102-006` both fix the profile for the duration |
| `EG-91-006` per-channel template and preview policy | **Open**, consumed as an explicit unknown. It gates the localized text that operational §2.2's segment conversion depends on, which the ticket itself records |
| `EG-91-024` SMS and push threat surface | **Open**, consumed as an explicit unknown. `PN-130-004` and `PN-130-014` are written so neither depends on its answer |

The ticket's own dependency note is accurate and needed no correction — unlike
CBD-107's, which stated its CBD-14 dependency backwards. It correctly records
that `DM-102-045`'s conversion depends on approved localized text and therefore
that cost cannot be finalized before `EG-91-006` closes.

## 5. Follow-up register disposition

**No `FU-95-*` row names CBD-130.** The August 18, 2026 linkage pass added
pointer comments to every targeted issue and this one received none, which is
consistent with CBD-130 having been created by the Product Owner decision of
August 16, 2026 that added category N — after the CBD-95 register was written.

The adjacent disposition worth recording: `FU-95-017`, which names CBD-106,
owns the approved copy inventory including *"notification templates"*. The
`NT-92-001` fixed body this package relies on throughout is semantics, not
approved strings, and `EG-91-006` owns the localized equivalents. Nothing here
closes either.

## 6. Consistency check against the approved decisions

| Approved decision | Source | Honoured by |
| --- | --- | --- |
| Push and SMS carry the fixed content-free body | `NT-92-001` | `PN-130-001` |
| A push tap opens a generic entry point; SMS carries at most the public application URL | `NT-92-002` | `PN-130-002`, `PN-130-009` |
| The provider payload is destination, fixed body or template identifier, channel controls, opaque identifier, minimum metadata | `NT-92-003` | `PN-130-001`; evaluation §6.2 `HG-102-069` |
| Both channels are per-recipient, per-category opt-in with send-time recheck | `NT-92-004` | `PN-130-011`; CBD-74 §5.1 `CF-74-01` |
| Stale suppression; callbacks change delivery and preference state only | `NT-92-005` | `PN-130-008`, `PN-130-012` |
| The generic-body rule applies even when a platform claims previews are hidden | `NT-92-006` | `PN-130-004`, `PN-130-014` — stated explicitly against the temptation that encryption makes the ceiling redundant |
| Neither channel is an authentication or protected-action channel; a token is never an authorization input | `NT-92-001`, `NT-92-002`; `DI-91-073` | `PN-130-002`; `HG-102-075` `PASS (design)` |
| In-app is mandatory and unaffected by external failure | CBD-74 §5.3 | `PN-130-015` |
| No preference widens external content | CBD-74 §6.2 | `PN-130-001` |
| Lock screens, carriers, forwarding and backups are recipient- and platform-controlled copies | `NT-92-006`; CBD-74 §6.4 | `PN-130-014` |
| Telemetry is content-free; destinations are personal data | `AN-92-003`; `DI-91-029` | `PN-130-013` |
| Suppression state is CoBudget's | `DI-91-059` | `PN-130-008` |
| Verification and replay rejection at the edge | `TD-103-016`; `EP-92-010` | `PN-130-012` |
| The SMS segment assumption is provisional and must be restated per record | Cost template §5.1; Product Owner, August 16, 2026 | Operational §2.2 and every §5.2 row |
| Rubric weights are fixed for the duration | Rubric §4; `OI-102-006` | Evaluation §8.1; `OI-130-019` records a limitation without changing a weight |

No approved decision is reopened, weakened, or reinterpreted by this package.

## 7. What this package does not establish — and what CBD-15 now has

* **No provider is selected.** Push has none to select; no SMS provider is
  recommended, and evaluation §12.2 states why.
* **Nothing was sent.** Ten pass tests are observation-bound and none was
  performed. `OI-130-008` records that one of them needs a real handset.
* **Two Product Owner decisions gate any comparison**: `OI-130-009`, the
  `HG-102-073` exception, and `OI-130-010`, whether `HG-102-074`'s carrier half
  is satisfiable at all. Read strictly, the second means no category-N provider
  can ever be `ELIGIBLE`.
* **No price exists**, though unlike CBD-107 these are retrievable by reading.
* **The rubric totals settle nothing**, and §8.4 says so in the document that
  publishes them.
* **Nothing is built.** Every `PN-130-*` decision is a design record, and the
  two `PASS (design)` gates are CoBudget obligations CBD-94 must prove.
* **No second person has reviewed this package**, and no provider was contacted.

### 7.1 The CBD-15 category set is now complete

CBD-130 is the sixth and last category evaluation. Across all six:

| Category | Subtask | Applicable gates | Verdicts |
| --- | --- | --- | --- |
| **H** hosting | CBD-103 | 27 | 3 × `ELIGIBLE-PENDING-EVIDENCE` |
| **I** identity | CBD-104 | 25 | 3 × `ELIGIBLE-PENDING-EVIDENCE` |
| **D** PostgreSQL | CBD-105 | 24 | 3 × `ELIGIBLE-PENDING-EVIDENCE` |
| **E** email | CBD-106 | 24 | 3 × `ELIGIBLE-PENDING-EVIDENCE` |
| **F** financial | CBD-107 | 27 | 4 × `ELIGIBLE-PENDING-EVIDENCE` |
| **N** push and SMS | CBD-130 | 23 | 2 × `ELIGIBLE-PENDING-EVIDENCE`, **1 × `INELIGIBLE`** |

**Not one candidate in any category has reached `ELIGIBLE`**, and the reason is
the same in all six: pass tests that require an observation nobody has performed.
The `OI-103-008` authorization has covered them since August 20, 2026.

CBD-108 therefore inherits a complete, consistent, and entirely unobserved
evidence base — plus three gate-reading questions that no evaluator should
settle: `OI-106-017` on source classification, `OI-107-008` on cursor-based
synchronization, and `OI-130-010` on carrier retention.

## 8. Review record

| Property | Value |
| --- | --- |
| Reviewed by | Alexander Wohlford — Product Owner, August 21, 2026. |
| Independent review | None. |
| Provider contact | None. All evidence is desk research retrieved August 21, 2026. No account was created, no message was sent, and no origination identity was registered. |
| Mechanical verification | `scripts/audit-cbd-130.py`; `scripts/check-doc-vocabulary.py` |
| Limitations | Evaluation §3.1 (evidence ceiling), §3.2 (two recorded retrieval asymmetries), §8.4 (what the scores measure); operational §5.1 (no prices); §7 above |

### 9.1 Revision record

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | August 21, 2026 | Initial approved package. |
| 1.1 | August 21, 2026 | Reuses the CBD-103 cross-category documentary pass of the same date. Three documentary gate outcomes move — C2 gains `HG-102-011` (`EV-102-007`), C3 gains `HG-102-005` (`EV-102-011`) and `HG-102-010` (`EV-102-162`, `EV-102-163`) — and **no verdict does**: C2 and C3 stay `ELIGIBLE-PENDING-EVIDENCE`, C10 stays `INELIGIBLE` on the `HG-102-073` `FAIL`, which this pass neither touches nor mitigates. **Repairs a v1.0 overclaim**: `HG-102-010` passed for C2 on `EV-102-135`, whose own limitation said the at-rest cipher was not named, against a pass test requiring *"the algorithm and key custody stated"*; `EV-102-009` now names it. Adds finding §7.7 (`F7`) and `OI-130-022`: `EV-102-007` names **Twilio as an AWS subprocessor for A2P messaging**, so C2 and C10 are not the independent candidates this evaluation scored them as — though C10's `FAIL` does not transfer to C2, which operates its own opt-out layer. Rubric subscores are recomputed rather than left stale: `WR-102-003` C3 `0`→`1`, `WR-102-006` C2 `1`→`2`, giving totals `0.40`, `0.28`, `0.09` and a C3 evidence profile of 13% Documented. Half-closes the `OQ-130-004` asymmetry and adds `OQ-130-017`. Also carries two gates the same pass advanced without moving an outcome: `HG-102-006`, where all three hyperscalers separate backup read, restore execution and key use but none documents a restore-approval permission (`OI-103-020`), and `HG-102-013`, where the contracts were read and the remaining gap is named at `OQ-103-025`. **No observation, no price, no `PN-130-*` decision, and no acceptance-criterion status changes.** |

Two things in the v1.1 change are worth a reviewer's attention because they cut
against a comfortable reading. C3's `WR-102-006` was **left at `0`** even though
`EV-102-167` records a six-month subprocessor notice commitment — longer than
AWS's 30 days — because the list itself was not obtained and rubric rule `R3`
scores an assertion whose evidence attempt failed as `0` rather than giving it
the benefit of the doubt. And C2's new `HG-102-011` `PASS` and `WR-102-006` score
of `2` reflect **disclosure that was retrievable**, not a demonstrated gap
between vendors: C2 is the only candidate in this category whose subprocessor
list was obtained at all, which `OQ-130-017` records so the asymmetry is not read
as a provider difference.
