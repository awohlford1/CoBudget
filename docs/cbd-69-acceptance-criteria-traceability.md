# CBD-69 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | In Review |
| Document version | 0.9.5 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner review performed August 12, 2026 (§9). Independent third pass still outstanding (RF-69-06). |
| Jira subtask | [CBD-69](https://cobudget.atlassian.net/browse/CBD-69) |
| Parent | [CBD-11](https://cobudget.atlassian.net/browse/CBD-11) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Rule specification | [CBD-69 — Period Edge Cases and Validation Rule Specification](cbd-69-period-edge-cases-validation-specification.md) |
| Scenario catalog | [CBD-69 — Period Edge-Case Scenario Catalog](cbd-69-period-edge-case-scenario-catalog.md) |
| Future Feature Register | [CoBudget — Future Feature Register](cobudget-future-feature-register.md) |
| Last updated | August 12, 2026 |

## 1. Purpose and completion rule

This record demonstrates how every acceptance criterion in the CBD-69 Jira Description and Acceptance Criteria field is addressed by the rule specification, scenario catalog, and core invariants. It also records review findings, deferred decisions, and the evidence still required after product definition.

"Complete for Final Draft" means the intended product behavior is defined with deterministic outcomes and cross-document coverage has been demonstrated. It does **not** mean the feature has been technically designed, implemented, tested in executable software, or formally approved.

### 1.1 Evidence states

| State | Meaning |
| --- | --- |
| Mapped | The criterion has an explicit specification, scenario, and invariant mapping. |
| Demonstrated | At least one concrete scenario shows the intended behavior or boundary. |
| Complete for Final Draft | Product rules are mapped and demonstrated with no known implementation-blocking product decision. |
| Provisional | Mapped and demonstrated, but dependent on an upstream document that has not reached Final Draft. |
| Formally approved | An assigned reviewer has reviewed and approved the product definition. |
| Implemented and verified | The implementation exists and linked executable tests or other objective evidence pass. |

A criterion may be complete for Final Draft while formal approval and implementation evidence remain outstanding.

## 2. Acceptance criteria traceability matrix

Criterion summaries reflect the CBD-69 Acceptance Criteria field verbatim in substance. Specification references are to the rule specification; scenario IDs are defined in the scenario catalog. Parent and epic traces are copied from the CBD-69 Acceptance Criteria field's own stated traces.

| AC | Requirement summary | Specification evidence | Scenario evidence | Key invariants | Parent / epic trace | Product evidence | Implementation evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AC-01 | Authorization date, posted/settlement date, transaction time, derived budget date, and date-source provenance have distinct definitions. | §3, §5.1 | DATE-01–04 | INV-69-03, INV-69-04, INV-69-05 | CBD-11-AC01; CBD-1-AC01, AC07 | Complete for Final Draft | Not started |
| AC-02 | Expenses use the authorization date when available and the posted or settlement date as fallback. | §5.1, §6 (EC-69-01, EC-69-02, EC-69-26) | DATE-01, DATE-02, DATE-02a | INV-69-05 | CBD-11-AC02; CBD-1-AC01 | Complete for Final Draft — EC-69-26 added in the Product Owner review to cover a pending transaction with no authorization date (RF-69-11) | Not started |
| AC-03 | Transaction time is not used for budget-period classification, and a date supplied without a reliable time is used as provided. | §3, §5.1, §6 (EC-69-03) | DATE-03, DATE-04 | INV-69-02, INV-69-03, INV-69-18 | CBD-11-AC01, AC02; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-04 | Pending expenses create a visible provisional category impact rather than finalized spending. | §5.2, §6 (EC-69-01), §7.1 | PEND-01, PEND-02 | INV-69-06, INV-69-14 | CBD-11-AC03, AC09; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-05 | Settlement replaces the provisional amount while retaining the authorization-based budget date. | §6 (EC-69-01, EC-69-04), §7.2 | PEND-01, PEND-04, REV-01 | INV-69-05, INV-69-06, INV-69-09 | CBD-11-AC03; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-06 | Missing, changed, removed, unmatched, and duplicate pending or posted transactions have explicit reconciliation behavior. | §6 (EC-69-04–07, EC-69-26), §7.1–7.3 | PEND-02–04, REC-01, REC-02, REC-02a, REC-02b, REC-03, DATE-02a | INV-69-06, INV-69-22 | CBD-11-AC03, AC20; CBD-1-AC01 | Complete for Final Draft — resolves OD-69-01; Duplicate-review counting and the split-amount rule were corrected in the Product Owner review (RF-69-09, RF-69-10) | Not started |
| AC-07 | Income is counted only when posted, settled, or manually confirmed and never changes budget values automatically. | §1, §2, §3, §5.1, §6 (EC-69-09, EC-69-10), §8 | INC-01, INC-02 | INV-69-07, INV-69-08 | CBD-11-AC04, AC10; CBD-1-AC01, AC07 | Complete for Final Draft — aligned to the target-and-tracking consistency decision in the updated CBD-69 and CBD-11 Descriptions; receipt updates account balances, actual-income totals, and cash-flow reporting only (RF-69-07 closed) | Not started |
| AC-08 | Transfers, refunds, bills, and manually entered transactions have explicit classification and date rules. | §6 (EC-69-11–15, EC-69-25), §9.1–9.4 | TYPE-01–03, REV-01, REV-01a, REV-02 | INV-69-08, INV-69-21 | CBD-11-AC01, AC02, AC09; CBD-1-AC01 | Complete for Final Draft — resolves RF-69-02. Refund dating was **reversed** in the Product Owner review: a linked refund now nets to the period of the expense it refunds (RF-69-08) | Not started |
| AC-09 | Late-settling activity may adjust an ended period without changing its schedule boundaries or version. | §6 (EC-69-08, EC-69-21), §10 | LATE-01, ALT-02 | INV-69-09, INV-69-10 | CBD-11-AC05, AC17; CBD-1-AC01, AC07 | Complete for Final Draft | Not started |
| AC-10 | Late-adjusted periods and authorization-versus-statement date differences have clear user-facing explanations. | §10, §11 | LATE-01, REP-01, REV-01 | INV-69-04, INV-69-16, INV-69-17, INV-69-21 | CBD-11-AC05, AC06; CBD-1-AC01 | Complete for Final Draft — resolves OD-69-02. The Product Owner confirmed the full statement view as MVP scope even though AC-10's literal wording would accept less (RF-69-12) | Not started |
| AC-11 | Pending activity uses informational warnings, while firm settled overspending and late-adjustment alert behavior is documented for owners, collaborators, and Accountability Partners. | §3 (Firm alert, Informational alert), §4, §12 | ALT-01–06 | INV-69-15, INV-69-16, INV-69-23, INV-69-24, INV-69-25 | CBD-11-AC06; CBD-1-AC01 | Complete for Final Draft — resolves OD-69-03 for the CBD-69-scoped portion. The firm/informational distinction was undefined until v0.9.4 (RF-69-13); Viewer and Accountability Partner eligibility was an open Product Owner question until v0.9.5 (RF-69-14); channel, threshold, cooldown, and quiet-hours configuration remains CBD-12 scope | Not started |
| AC-12 | Original dates, date-source provenance, budget-date overrides, permissions, and reconciliation decisions remain auditable. | §4, §6 (EC-69-22–24), §13 | OVR-01, OVR-02, REC-01, REC-02a, REV-01 | INV-69-11, INV-69-12, INV-69-13 | CBD-11-AC06, AC17; CBD-1-AC01, AC07 | Complete for Final Draft — resolves OD-69-04 for the CBD-69-scoped portion; final role names and enforcement remain CBD-12 scope | Not started |
| AC-13 | The matrix covers time zones, daylight-saving behavior, inclusive display boundaries, internal start-inclusive and end-exclusive boundaries, leap years, short months, gaps, overlaps, invalid ranges, duplicate anchors, skipped paydays, and schedule changes. | §3, §6 (EC-69-16–20) | DATE-04, CAL-01–04 | INV-69-01, INV-69-02, INV-69-18, INV-69-19, INV-69-20 | CBD-11-AC14, AC15, AC16; CBD-1-AC01 | Provisional — CAL-04 and EC-69-20 depend on CBD-68 Final Draft (RF-69-01) | Not started |
| AC-14 | Every edge case identifies the expected period and financial-state impact plus a validation message, customer explanation, or recovery path. | §6 (all 26 rows carry all nine required columns) | All scenarios | INV-69-17 | CBD-11-AC14, AC15, AC16, AC20; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-15 | The output is detailed enough to design database fields, interface states, reconciliation logic, reports, alerts, audit events, and automated tests. | §11, §12, §13, §14, §15, §16 | REP-01, all data-bearing scenarios | INV-69-11, INV-69-17 | CBD-11-AC20; CBD-1-AC01, AC06, AC07 | Complete for Final Draft | Not started |

## 3. Parent and epic traceability

CBD-69 criteria trace to CBD-11-AC01 through AC06, AC09, AC10, AC14 through AC17, and AC20, plus CBD-1-AC01, AC06, and AC07, as recorded in the CBD-69 Jira Acceptance Criteria field. The traces in §2 are copied from that field rather than independently derived. Final verification before approval must compare the then-current Jira fields rather than rely solely on this summary. The CBD-69 and CBD-11 fields were last modified August 12, 2026 at 17:48, and this record was verified against that revision (RF-69-07).

## 4. Coverage roll-up

| Measure | Result | Interpretation |
| --- | --- | --- |
| Jira acceptance criteria reviewed | 15 of 15 | Both the Description and the Acceptance Criteria field were included. |
| Acceptance criteria mapped to specification evidence | 15 of 15 | No criterion lacks a product-rule reference. |
| Acceptance criteria mapped to scenario evidence | 15 of 15 | Each criterion has at least one concrete scenario. |
| Acceptance criteria Complete for Final Draft | 14 of 15 | AC-13 remains Provisional pending the CBD-68 reconciliation gate. |
| Core invariants available for verification | 25 | Expanded from 10 in v0.1, then by the Product Owner review: INV-69-21 refund netting, INV-69-22 Duplicate-review counting, INV-69-23 the firm-versus-informational alert contract, INV-69-24 Viewer alert scoping, INV-69-25 Accountability Partner default informational delivery and the mute control. |
| Classification matrix rows | 26 | Each row carries all nine columns required by the Jira Description. Expanded from 20 rows with five columns in v0.1, then by two rows in the Product Owner review (EC-69-25 unlinked refund, EC-69-26 pending without authorization date). |
| Required case families from the Jira Description | 17 of 17 covered | Each named case maps to at least one EC-69 row; see §5. |
| Scenario IDs in the catalog | 36 (all fully worked fixtures; no compact assertion-table entries) | Coverage depth is documented in Scenario Catalog §1, following the CBD-67 RF-07 convention. Seven fixtures were added by the Product Owner review (DATE-02a, REC-02b, REV-01a, ALT-03, ALT-04, ALT-05, ALT-06). |
| Known implementation-blocking product decisions | 0 | All four v0.1 open decisions were resolved in scope; see §6. |
| Deferred non-blocking decisions | 2 | FF-007 and FF-008. |
| Upstream reconciliation gates | 1 | RF-69-01 (CBD-68). |
| Formal product approvals | 0 | No approval has been recorded for any CBD-69 version. |
| Executable implementation evidence | 0 | Implementation and testing have not started under this document. |

## 5. Required-case coverage

The CBD-69 Jira Description names 17 case families that the deliverable must cover. Each maps to at least one classification-matrix row:

| # | Required case | Matrix row(s) | Scenario(s) |
| --- | --- | --- | --- |
| 1 | Missing authorization date | EC-69-02, EC-69-26 | DATE-02, DATE-02a |
| 2 | Missing or unreliable transaction time | EC-69-03 | DATE-03 |
| 3 | Authorization and settlement in different periods | EC-69-08, EC-69-21 | DATE-01, LATE-01 |
| 4 | A pending amount changing at settlement | EC-69-04 | PEND-01, DATE-01 |
| 5 | A pending authorization disappearing | EC-69-05 | PEND-02, ALT-01 |
| 6 | An unmatched posted transaction | EC-69-06 | PEND-03 |
| 7 | Apparent pending/posted duplicates | EC-69-07 | PEND-04, REC-01, REC-03 (counting rule: INV-69-22) |
| 8 | Income expected in one period and received in another | EC-69-09, EC-69-10 | INC-01, INC-02 |
| 9 | Same-day transactions at a period boundary | EC-69-16 | DATE-04 |
| 10 | Refunds and reversals | EC-69-13, EC-69-14, EC-69-25 | REV-01, REV-01a, REV-02 |
| 11 | Transfers between owned accounts | EC-69-12 | TYPE-01 |
| 12 | Bill due date and payment date in different periods | EC-69-15 | TYPE-02 |
| 13 | Daylight-saving transitions | EC-69-17 | CAL-01 |
| 14 | Leap years and short months | EC-69-18 | CAL-02 |
| 15 | Gaps, overlaps, invalid ranges, duplicate anchors, skipped paydays, mid-period schedule changes | EC-69-19, EC-69-20 | CAL-03, CAL-04 |
| 16 | Late adjustments to completed periods | EC-69-21 | LATE-01, ALT-02 |
| 17 | User overrides and permission failures | EC-69-22, EC-69-23 | OVR-01, OVR-02 |

Manually entered transactions (EC-69-11, TYPE-03) and post-classification category or date changes (EC-69-24) are additional rows not enumerated in the Description's 17-case list but required by AC-08 and AC-12 respectively.

## 6. Resolution of the v0.1 open decisions

| ID | v0.1 open decision | Disposition in v0.9 | Remaining scope elsewhere |
| --- | --- | --- | --- |
| OD-69-01 | Define automatic-match confidence rules and the exact manual match, unmatch, split, and dismiss controls. | **Resolved in scope.** Specification §7 defines eight reconciliation states, seven transitions, and all four manual controls, with fixtures REC-01, REC-02, REC-02a, REC-03. AC-06 requires explicit behavior, so this could not be deferred wholesale. | Confidence-scoring algorithm and tuning deferred to FF-007 (implementation / data-science scope). Note the partial overlap with the existing FF-004, which covers *projection-to-transaction* matching rather than *pending-to-posted* matching; the two are distinct and both remain open. |
| OD-69-02 | Confirm which reports provide authorization-date, posted-date, or selectable views and define export behavior. | **Resolved in scope.** Specification §11 establishes the budget-date view as default, requires a labeled statement (posted-date) view alongside it, requires both dates as distinct export columns, and requires late-adjustment labeling in both views. Fixture REP-01. | Export file formats and scheduled/automated delivery deferred to FF-008. |
| OD-69-03 | Confirm alert recipients, thresholds, suppression rules, and delivery channels. | **Resolved in scope.** Specification §12.1 names five alert types with firm/informational classification; §12.2 defines eligibility by role and the CBD-69-scoped suppression rule. Fixtures ALT-01, ALT-02. | Delivery channels, numeric thresholds, cooldowns, deduplication windows, and quiet hours are CBD-12 scope by its own Jira description. |
| OD-69-04 | Map override and reconciliation privileges to final CBD-12 roles. | **Resolved in scope.** Specification §4 provides a twelve-action permission matrix across the five roles, using the CBD-67 §4 role model as the best-available baseline since CBD-12 is Ready but unspecified. §13 states the override and reconciliation permission and audit requirements. Fixtures OVR-01, OVR-02. | Final role names, exact grant mechanics, and enforcement remain CBD-12 scope and require reconciliation when CBD-12 is specified. |
| RF-69-02 | Refund/reversal accounting direction needs a deterministic reporting outcome. | **Resolved.** Specification §9.3 separates the two cases on a single deterministic test — whether the original authorization ever reached settlement. A settled-then-returned event is a refund with its own posted date (EC-69-13); a never-settled-then-canceled event is a reversal that removes the provisional impact entirely (EC-69-14). Contrast fixtures REV-01 and REV-02. | None. |

## 7. Review findings

| ID | Date | Review | Finding | Resolution / required action | Status |
| --- | --- | --- | --- | --- | --- |
| RF-69-01 | August 11, 2026 | CBD-68 dependency | Schedule-boundary rows depend on the CBD-68 working draft, which has not reached Final Draft. | EC-69-20 and fixture CAL-04 are explicitly marked Provisional and AC-13 is recorded as Provisional rather than Complete. Both must be re-verified against CBD-68's Final Draft before CBD-69 can be marked Approved. | Open — reconciliation gate |
| RF-69-02 | August 11, 2026 | Accounting direction | Refund and reversal were treated as one case in v0.1 EC-69-11, leaving the reporting outcome non-deterministic. | Separated into EC-69-13 (refund) and EC-69-14 (reversal) with the settlement test in §9.3 and contrast fixtures REV-01/REV-02. | Resolved |
| RF-69-03 | August 12, 2026 | Structural completeness audit of v0.1 | The v0.1 classification table collapsed the nine attributes required by the Jira Description into five content columns, merging four pairs: authoritative source date with derived budget date ("Authoritative date / budget date"); pending-or-settled status with period and category impact ("State and financial impact"); reporting behavior with alert behavior ("Reporting / alert"); and customer explanation/recovery with audit event ("Recovery / audit"). Merging the source date with the derived date is the most consequential of the four, because the entire purpose of the specification is to show how one is derived from the other. The merges also understated AC-14, which requires each case to identify its impact *and* a validation message, customer explanation, or recovery path, and AC-11/AC-12, which require alert and audit behavior to be separately documented. | The matrix was rebuilt with all nine attributes as discrete columns across 24 rows. | Resolved |
| RF-69-04 | August 12, 2026 | Depth benchmark against CBD-67 | v0.1 carried 10 invariants and 20 scenarios against the approved CBD-67 package's 89 invariants and 57 scenarios, with several v0.1 rows stating an outcome without a verification method. | Invariants expanded from 10 to 20, each with a stated rationale and verification method following the CBD-67 four-column invariant format; scenarios expanded from 20 to 29 fully worked fixtures. CBD-69 remains a narrower subject than CBD-67, so parity in raw counts is not itself the target — coverage of every named case family is (see §5). | Resolved |
| RF-69-05 | August 12, 2026 | Documentation sync | Neither CBD-69 nor CBD-68 had a `docs/` mirror, though CBD-67 did, breaking the standing rule that a Confluence publication is accompanied by a repository mirror. | The three CBD-69 documents were authored as `docs/` files and published to their existing Confluence pages in the same change. **CBD-68 remains unmirrored and is outside CBD-69's scope.** | Resolved for CBD-69; CBD-68 gap remains open |
| RF-69-07 | August 12, 2026 | Upstream product-decision conflict | CBD-68 product decision **PD-68-01**, captured as FF-006 in the Future Feature Register on August 12, 2026, establishes that the MVP is target-and-tracking: users set spending targets and compare actual results **without assigning income**. The CBD-69 and CBD-11 Jira Descriptions at that time still stated that income receipt updates "available-to-assign funds" / income "becomes available to assign," and CBD-69 v0.9 initially inherited that language in seven locations. | **Closed.** Both Jira issues were updated on August 12, 2026 at 17:48: CBD-69 gained a "Consistency decision" paragraph applying the target-and-tracking model and stating that income "does not fund categories or create an available-to-assign pool," and CBD-11's product principles were revised to match. The canonical effect of receipt is now "account balances, actual-income totals, and cash-flow reporting." CBD-69 v0.9.2 was re-aligned to that exact vocabulary across INV-69-07, INV-69-08, EC-69-09, EC-69-10, §1, §2, §3, §5.1, §8, and fixtures INC-01/INC-02, replacing "received-income totals" with "actual-income totals," adding the previously missing cash-flow-reporting effect, and replacing "budget value" with "spending target." No contradiction remains between the Jira text, PD-68-01, and this document set. | Resolved |
| RF-69-08 | August 12, 2026 | Product Owner review — refund dating | v0.9.2 dated a refund to its own posted date, leaving the original expense's period untouched. This kept completed periods stable but meant a category's history never showed the true net cost of a purchase, and — under the no-rollover MVP — a refund created unearned room in whatever later period it happened to post in. The decision had been made without explicit Product Owner input. | **Reversed by Product Owner decision.** A reliably linked refund now nets against the budget period of the expense it refunds (EC-69-13, INV-69-21), reusing EC-69-21's late-adjustment behavior when that period has closed. EC-69-25 was added as the explicit fallback for a refund that cannot be linked. Fixtures REV-01 rewritten and REV-01a added; REP-01's arithmetic recomputed. The accepted cost is that a refund can now change a completed period's totals, and that the budget-date and statement views will assign a refund to different periods — documented in §9.3 as intentional. | Resolved |
| RF-69-09 | August 12, 2026 | Product Owner review — internal contradiction | EC-69-07 stated that a Duplicate-review pair's budget date was "the authorization date of the pending candidate" with status "Provisional," implying the pending record was counted. Fixture PEND-03 stated the posted item "is counted exactly once, using the posted-date fallback." These are different answers to the same question, and neither location said which record's amount reached the category total. | **Resolved by Product Owner decision:** the posted amount is counted, because the money has moved and the figure is final, classified to the pending candidate's authorization date. Where two or more candidates exist no single authorization date can be selected, so the posted date is used until a user resolves the pair — which reconciles PEND-03 and PEND-04. Recorded as INV-69-22. | Resolved |
| RF-69-10 | August 12, 2026 | Product Owner review — internal contradiction | §7.3 required that split settlement amounts "must equal the original amount or the split is blocked pending correction." This contradicted EC-69-04, which explicitly permits a pending amount to change at settlement, and would have blocked the single most common real case: a restaurant tip added after authorization. Fixture REC-02 repeated the error. | **Resolved by Product Owner decision:** settlements need not sum to the authorization. The split is recorded, the variance between authorized and settled totals is displayed, and no split is blocked on an amount mismatch alone. Fixture REC-02b added covering a tip adjustment (+$10.00) and a partial fulfilment (−$15.00). | Resolved |
| RF-69-11 | August 12, 2026 | Product Owner review — uncovered input condition | EC-69-02's status column read "Settled on import," which assumed that an expense lacking a reliable authorization date must already be posted. A linked account can report a **pending** transaction with no reliable authorization date, and no matrix row classified it. | **Resolved.** EC-69-02 was narrowed to the posted case and EC-69-26 added for the pending case: the transaction takes its supplied posted/available date as a provisional budget date, follows the ordinary pending lifecycle, and has its budget date re-derived under EC-69-01/02 if an authorization date arrives with settlement. Fixture DATE-02a added. | Resolved |
| RF-69-12 | August 12, 2026 | Product Owner review — MVP scope | §11 requires a full parallel statement (posted-date) report view. AC-10's literal wording asks only for "clear user-facing explanations" of authorization-versus-statement date differences, which a per-transaction dual-date display would satisfy at materially lower build cost. v0.9.2 therefore enlarged MVP scope on the drafter's own authority rather than by an explicit decision. | **Confirmed in scope by Product Owner decision.** The statement view is retained as drafted and is now load-bearing for the refund-netting rule, since it is the mechanism that explains why a linked refund appears in a different period from the one the bank reports (§9.3, §11, REP-01). Recorded here so the scope choice is visible to whoever plans the build. | Resolved |
| RF-69-13 | August 12, 2026 | Product Owner review — undefined load-bearing terms | The words **firm** and **informational** classified every alert and gated eligibility (§4), suppression (§12.2), interface treatment (§14), and stored data (§15), yet neither term was ever defined. Neither appeared in §3's terminology table while twenty-odd less consequential terms did. Because delivery channels are CBD-12 scope, the labels had almost no user-visible consequence beyond firing at different times and looking different — they implied a weight the specification never delivered. The CBD-69 Description's own clause allowing the interface to show that pending activity "would exceed a budget without representing the overage as final" had also never been captured as a rule. | **Resolved.** Both terms are now defined in §3 on the axis of assertion strength: an informational alert states a possible outcome of provisional activity, may never present an overage as final, clears itself when its provisional record resolves, and requires no user action; a firm alert states a settled fact, supports acknowledgement, and does not self-clear. Added INV-69-23, a §12 lead paragraph, and the §14 interface, §15 data-model, and §16 test consequences. Fixture ALT-03 added for firm-alert persistence and acknowledgement, and ALT-01 extended to assert the informational copy restriction. Two of the four consequences are new product rules approved by the Product Owner rather than clarifications: firm alerts support acknowledgement, and informational alerts require no user action. | Resolved |
| RF-69-14 | August 12, 2026 | Product Owner review — Viewer and Accountability Partner alert eligibility | v0.9.4 left an inconsistency and an open question, both raised alongside RF-69-13. First, every other Viewer visibility row in §4 followed the explicit-provisioning scope pattern, but both alert rows were a flat "No" regardless of provisioning — an inconsistency rather than a considered decision. Second, whether an Accountability Partner should receive informational alerts by default, rather than by opt-in, had been carried as an open Product Owner question since v0.9.3 (recorded in the v0.9.3 and v0.9.4 revision-history entries). | **Resolved by Product Owner decision, split for the two roles.** Viewer: firm alerts now follow the same explicit-provisioning scope as every other Viewer row (INV-69-24), since a firm alert reports a fact about data the Viewer can already see if provisioned; informational alerts remain categorically excluded regardless of provisioning, since a Viewer holds no override or reconciliation permission to act on still-changing pending activity. Accountability Partner: informational alerts now deliver by default (INV-69-25), matching what INV-69-23 guarantees an informational alert cannot do — it never asserts an exceeded limit and requires no action — which made the prior opt-in gate a stricter posture than the rest of the role's automatic access already reflected. Paired with a new **mute control**, available only to a Primary Owner or Co-owner and never to the Accountability Partner, that silences informational delivery without affecting firm-alert eligibility — a safeguard against the surveillance and coercion risks CBD-12 identifies for the role. The mute control is a new interface, data-model, and audit commitment with no prior specification elsewhere in this document. Fixtures ALT-04, ALT-05, ALT-06 added. | Resolved |
| RF-69-06 | August 12, 2026 | Approval independence | No review of any kind has been recorded for CBD-69. CBD-67 required, under its amended §7.7 governance rule, an independent review pass by a reviewer other than the author of the drafts under review before a version may be marked Approved. | Partially addressed. The August 12 Product Owner review (§9) was performed by a reviewer who did not author the drafts, which satisfies the literal §7.7 requirement, and across three passes (v0.9.2, v0.9.4, v0.9.5 drafts) it produced seven substantive findings (RF-69-08 through RF-69-14). It does **not** reproduce CBD-67 v1.2's separation: there, the independent auditor had not written the drafts under audit, whereas here Claude authored every version reviewed and also presented the findings each time. Whether that is sufficient for this documentation-scope subtask is an explicit Product Owner judgment that has not yet been recorded. | Open — approval gate, narrowed |

## 8. Deferred decisions and required follow-up

| ID | Topic | Affected evidence | Current disposition | Blocks Final Draft? | Future closure evidence |
| --- | --- | --- | --- | --- | --- |
| FF-007 | Automatic pending-to-posted match confidence scoring and tuning | AC-06, AC-15; §7.3 | Deferred to implementation / data-science scope. Product-level states, transitions, and manual controls are fully specified. | No | Implemented matcher with measured false-match and Duplicate-review rates |
| FF-008 | Export file formats and scheduled/automated export delivery | AC-10, AC-15; §11 | Deferred. The requirement that both budget date and posted date appear as distinct columns is specified; format and delivery are not. | No | Approved export specification and linked implementation evidence |
| FF-004 | Projection matching and occurrence resolution (pre-existing, from CBD-67) | AC-06, AC-08; §7, §8, §9.2 | Already deferred under CBD-67. Distinct from FF-007: FF-004 concerns matching a *projected occurrence* to a transaction; FF-007 concerns matching a *pending* record to a *posted* record. | No | Approved matching specification and linked scenarios/tests |
| RF-69-01 | CBD-68 reconciliation gate | AC-13; EC-69-20, CAL-04 | Open until CBD-68 reaches Final Draft. | No for the rest of the package; **yes for AC-13 and for marking CBD-69 Approved** | Re-verified EC-69-20 and CAL-04 against CBD-68 Final Draft |
| CBD-12-01 | Final role names, grant mechanics, alert channel/threshold/cooldown/quiet-hours configuration | AC-11, AC-12; §4, §12.2, §13 | CBD-12 is Ready but unspecified. This document uses the CBD-67 §4 role model as a documented placeholder. | No | Reconciled §4, §12.2, and §13 against approved CBD-12 |
| TECH-69-01 | Technical specification for date storage, provenance, reconciliation-state persistence, and audit events | All criteria; especially AC-06, AC-12, AC-15 | Planned future task; issue key to be assigned when created. | No for product Final Draft; yes for implementation authorization | Approved technical specification with requirement and invariant mappings |
| QA-69-01 | Executable verification for the 15 criteria and 20 invariants | All criteria | Planned as part of implementation; requirements listed in specification §16. | No for product Final Draft; yes for release | Linked automated test results with pass/fail disposition |

## 9. Validation and approval record

| Review activity | Responsible party | Date | Evidence | Result |
| --- | --- | --- | --- | --- |
| Initial working-draft assembly | Codex, owner Alexander Wohlford | August 11, 2026 | v0.1 of all three CBD-69 documents | Draft created; no approval recorded |
| Structural completeness audit of v0.1 | Alexander Wohlford with Claude assistance | August 12, 2026 | RF-69-03, RF-69-04, RF-69-05 in §7 | Findings raised and resolved in v0.9 |
| Open-decision resolution | Alexander Wohlford with Claude assistance | August 12, 2026 | §6; specification §7, §11, §12, §13, §9.3 | OD-69-01 through OD-69-04 and RF-69-02 resolved in scope |
| Date and calendar arithmetic verification | Claude assistance | August 12, 2026 | All weekday claims in the scenario catalog verified computationally against the CBD-67 reference calendar (Aug 10, 2026 = Monday); Nov 1, 2026 confirmed as the first Sunday of November; Feb 29, 2028 confirmed to exist | Passed |
| Jira alignment verification | Alexander Wohlford with Claude assistance | August 12, 2026 | Package compared against the CBD-69 and CBD-11 fields as updated at 17:48; RF-69-07 raised and closed; vocabulary aligned in 14 locations | Passed |
| Cross-document reference audit | Claude assistance | August 12, 2026 | Programmatic check for dangling EC-69, INV-69, FF, RF-69, scenario, and section references across all three documents, including subsection-level pointers | Passed; four stale internal pointers found and corrected |
| Product Owner review of the v0.9.2 package | Alexander Wohlford, with Claude presenting findings against its own draft | August 12, 2026 | §7 RF-69-08 through RF-69-12; four product decisions taken and three internal defects corrected | Passed with findings; all findings resolved in v0.9.3 |
| Alert-policy definition review | Alexander Wohlford with Claude assistance | August 12, 2026 | §7 RF-69-13; §3 definitions, INV-69-23, fixture ALT-03 | Gap identified and closed; two new product rules approved |
| Alert-eligibility review | Alexander Wohlford with Claude assistance | August 12, 2026 | §7 RF-69-14; INV-69-24, INV-69-25, fixtures ALT-04–06 | Open question and inconsistency both resolved; new mute-control commitment approved |
| Cross-document traceability review | Not performed | Not performed | Required before Final Draft sign-off | Not started |
| CBD-68 synchronization review | Not performed | Not performed | Blocked by RF-69-01 | Not started |
| Independent review pass by a reviewer other than the drafts' author | Partially satisfied | August 12, 2026 | The Product Owner review above was performed by a reviewer who did not author the drafts, satisfying the letter of CBD-67 §7.7. However, Claude authored v0.9.2 and also presented the findings, so no third party independent of both authorship and approval has reviewed the package — a thinner chain than CBD-67 v1.2, where the auditor had not written the drafts under audit. | Letter satisfied; spirit outstanding — see RF-69-06 |
| Technical handoff review | Product and Engineering | Not performed | Separate technical specification required (TECH-69-01) | Not started |
| Release verification | Engineering and QA | Not performed | Linked implementation and executable test evidence required (QA-69-01) | Not started |

Codex and Claude assistance indicate document drafting, reconciliation, and audit support. Neither is a substitute for the accountable human approver.

## 10. Change and evidence governance

This document adopts the CBD-67 §7 governance rules. Restated for CBD-69, with the CBD-69-specific additions in items 8 and 9:

1. Confluence is the authoritative source for this record and the related product documents. The local Markdown copies must be synchronized after each published update.
2. Any material change to the CBD-69 Description, Acceptance Criteria field, rule specification, scenario catalog, or invariant set requires a traceability review.
3. A changed rule must update every affected criterion row, scenario, invariant reference, review finding, and deferred-decision entry.
4. Implementation evidence must link to an objective artifact such as an automated test, reviewed manual test record, monitoring result, or accepted defect disposition.
5. A documentation status must not be used as evidence that the implementation exists or passes.
6. A failed or missing verification blocks release of the affected workflow even if the criterion is complete for Final Draft.
7. A version may be marked Approved only after an independent review pass by a reviewer **other than the author of the drafts under review**, and after all approval-blocking findings are resolved. For documentation-scope subtasks, that independent pass may be an AI-assisted critical audit, provided the audited drafts were not authored by the approver and the audit findings are recorded and resolved. A named human approver remains accountable in all cases. This concession does not extend to technical specifications, implementation, or release verification.
8. CBD-69 may not be marked Approved while RF-69-01 remains open, because AC-13 depends on CBD-68 boundary rules that have not reached Final Draft.
9. A classification-matrix row must retain all nine columns required by the Jira Description. A row that cannot state one of the nine must say so explicitly and give the reason, rather than merging or omitting the column.

## 11. Revision history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 0.1 | August 11, 2026 | Codex, owner Alexander Wohlford | Created the initial traceability matrix with 15 criteria at mixed draft states, four open decisions, and two review findings. |
| 0.9 | August 12, 2026 | Alexander Wohlford with Claude assistance | Reconciled all 15 criteria to the rebuilt 24-row nine-column classification matrix, 20 invariants, and 29 fully worked scenario fixtures. Recorded the resolution of OD-69-01 through OD-69-04 and RF-69-02 in §6, with the remaining out-of-scope portions routed to FF-007, FF-008, and CBD-12. Added the required-case coverage table (§5) demonstrating all 17 Description case families are covered. Raised and resolved RF-69-03 (nine-column shortfall), RF-69-04 (depth benchmark), and RF-69-05 (docs mirror gap); raised RF-69-06 (approval independence) as an open gate. Recorded AC-13 as Provisional under RF-69-01. Verified all scenario date arithmetic computationally. Status moved from Working Draft to In Review; no approval is claimed. |
| 0.9.1 | August 12, 2026 | Alexander Wohlford with Claude assistance | Merged against the concurrently updated Future Feature Register. The CBD-69 deferrals were renumbered FF-006→FF-007 and FF-007→FF-008 because FF-006 was claimed by CBD-68 product decision PD-68-01 (optional hybrid target-and-allocation mode); all references across the three CBD-69 documents were updated. Raised RF-69-07 and reconciled seven locations to PD-68-01's target-and-tracking scope, removing available-to-assign as an MVP concept. Corrected two internal section pointers (§5.3→§7.3, §6.4→§12.2). No classification-matrix row, invariant, scenario outcome, or acceptance-criterion mapping changed in substance. |
| 0.9.2 | August 12, 2026 | Alexander Wohlford with Claude assistance | Verified the package against the CBD-69 and CBD-11 Jira Descriptions as updated on August 12, 2026 at 17:48, which added the target-and-tracking consistency decision and removed the available-to-assign language. Closed RF-69-07. Adopted the Jira's canonical vocabulary in 14 locations: receipt now updates "account balances, actual-income totals, and cash-flow reporting" (cash-flow reporting was previously missing entirely), "received-income totals" became "actual-income totals," "received income" became "actual income" as the state name, and "budget value" became "spending target." Rewrote the §8 scope note to cite the Jira consistency decision rather than only PD-68-01. Ran a subsection-level reference audit and corrected four stale internal pointers. Published all three documents to Confluence and committed the `docs/` mirror on branch `docs/cbd-69-period-edge-cases-validation`. No classification-matrix row, invariant, scenario outcome, or acceptance-criterion mapping changed in substance. |
| 0.9.3 | August 12, 2026 | Alexander Wohlford with Claude assistance | Product Owner review of the v0.9.2 package. Unlike 0.9.1 and 0.9.2, this revision **does** change product behavior. Four decisions and three defect fixes are recorded as RF-69-08 through RF-69-12: refund dating reversed to net against the refunded expense's period (RF-69-08); Duplicate-review counting settled on the posted amount, resolving an EC-69-07 / PEND-03 contradiction (RF-69-09); the split-amount equality gate removed because it contradicted EC-69-04 and would have blocked an ordinary restaurant tip (RF-69-10); EC-69-26 added for a pending transaction with no authorization date, an input condition the matrix did not cover (RF-69-11); and the §11 statement view explicitly confirmed as MVP scope despite exceeding AC-10's literal ask (RF-69-12). Matrix rows 24→26, invariants 20→22, fixtures 29→32. This revision also reconciled three items that had been added to the published Confluence page during the v0.9.2 publish but never mirrored locally. RF-69-06 narrowed but not closed: the review satisfied §7.7's letter, since the reviewer did not author the drafts, but no party independent of both authorship and approval has examined the package. |
| 0.9.4 | August 12, 2026 | Alexander Wohlford with Claude assistance | Closed RF-69-13 by defining **firm** and **informational** alerts, terms the package had used throughout as load-bearing classifiers without ever defining either. Both are now defined by assertion strength, with four user-visible consequences: what the alert may assert, whether it self-clears, whether it supports acknowledgement, and its default audience. Added INV-69-23 and fixture ALT-03; extended ALT-01. Delivery channels, thresholds, cooldowns, and quiet hours remain CBD-12 scope. Invariants 22→23, fixtures 32→33. Accountability Partner and Viewer alert eligibility remains an open Product Owner question, unchanged from v0.9.3. |
| 0.9.5 | August 12, 2026 | Alexander Wohlford with Claude assistance | Closed RF-69-14, the Viewer/Accountability Partner alert-eligibility question carried since v0.9.3. Viewer firm alerts now scoped by explicit provisioning like every other Viewer row (INV-69-24); Viewer informational alerts remain categorically excluded. Accountability Partner informational alerts now default on (INV-69-25), paired with a new Primary-Owner/Co-owner-only mute control that never affects firm-alert eligibility — a new interface, data-model, and audit commitment. Fixtures ALT-04–06 added. Invariants 23→25, fixtures 33→36. |

## 12. Completion checklist

### Product-definition evidence

- [x] Jira Description reviewed.
- [x] Jira Acceptance Criteria field reviewed (15 criteria).
- [x] All 15 acceptance criteria mapped to specification evidence.
- [x] All 15 acceptance criteria mapped to scenario evidence.
- [x] All 17 required case families from the Description covered (§5).
- [x] Classification matrix carries all nine required columns for every row.
- [x] Core invariants identified with rationale and verification method for each.
- [x] Transaction-date selection and provenance covered.
- [x] Pending-to-posted reconciliation states, transitions, and manual controls covered.
- [x] Income projection versus receipt covered.
- [x] Transfers, refunds, reversals, bills, and manual transactions covered.
- [x] Late adjustment to completed periods covered.
- [x] Reporting, alert, permission, and audit behavior covered.
- [x] Firm and informational alerts defined with user-visible consequences (RF-69-13).
- [x] Viewer and Accountability Partner alert eligibility resolved, including the new Accountability Partner mute control (RF-69-14).
- [x] Data-model, interface-state, and automated-test implications recorded.
- [x] Scenario date arithmetic verified.
- [x] Scenario-catalog coverage depth documented and reported.
- [x] Package verified against the current Jira Description and Acceptance Criteria field.
- [x] Cross-document reference audit passed.
- [x] Deferred items recorded in the Future Feature Register.
- [x] Confluence pages published and `docs/` mirror synchronized.
- [x] No implementation-blocking product decision remains in CBD-69's own scope.

### Remaining gates

- [x] Product Owner review of the full package performed, with findings recorded and resolved (RF-69-08 through RF-69-14).
- [ ] Cross-document traceability review performed by a reviewer.
- [ ] RF-69-01 closed: EC-69-20 and CAL-04 re-verified against CBD-68 Final Draft.
- [ ] AC-13 promoted from Provisional to Complete for Final Draft.
- [ ] Product Owner reviewer identified and review performed.
- [ ] Independent review pass by a reviewer other than the drafts' author completed (RF-69-06).
- [ ] Version explicitly approved with recorded justification.
- [ ] CBD-12 reconciliation of §4, §12.2, and §13 once the role model is approved.
- [ ] Separate technical specification created and approved (TECH-69-01) — requires human review.
- [ ] Implementation completed.
- [ ] Executable tests mapped to affected criteria and invariants (QA-69-01).
- [ ] Release verification evidence linked and passed.
