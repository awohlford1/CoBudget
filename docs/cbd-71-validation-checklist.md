# CBD-71 — MVP Schedule Decisions Validation Checklist

| Field | Value |
| --- | --- |
| Status | **Draft v1.1 amendment validation** |
| Document version | 1.1.0-draft |
| Decision register | [CBD-71 MVP Schedule Decisions](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/6914050) |
| Jira | [CBD-71](https://cobudget.atlassian.net/browse/CBD-71) |
| Confluence page | [CBD-71 — MVP Schedule Decisions Validation Checklist](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/6160404) |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval August 14, 2026, on the evidence of Codex-authored consolidation drafts and an independent AI-assisted critical audit by Claude (see traceability record §5, RF-71-05 through RF-71-24), consistent with the CBD-68 and CBD-70 precedent |
| Last updated | August 14, 2026 |

## 1. Validation standard

A decision is validated only when it is Product Owner approved, internally consistent, implementation-ready, and architecture-aligned. This checklist records internal product validation for a solo project. It does not claim customer or market validation.

## 2. Register-level gates

| Gate | Evidence | Result |
| --- | --- | --- |
| Governing sources are identified by artifact and version. | Register §2; CBD-70 traceability §2 | Pending — CBD-69 v1.1 amendment is draft |
| All 50 approved governing criteria are represented by an active decision or governance control. | Register §§3.4, 4; 50 of 50 | Pass |
| All 75 approved deterministic scenarios are referenced. | Register §§3.4, 4; 75 of 75 | Pass |
| Every decision has a stable ID and permitted status. | Register §§3–6 | Pass |
| Every decision records statement, sources, problem, behavior, alternatives, rationale, classification, implications, dependencies, owner, approval date, status, and revision history. | Register §§3–4; common fields in §3.2 apply to every row | Pass |
| Accepted and superseded records will be retained. | Register §8 | Pass |
| Deferred behavior is separated from MVP behavior. | Register §5; Future Feature Register | Pass |
| Unresolved behavior is explicit and blocks affected acceptance. | Register §6 and §8 | Pass |
| Determinism, interval, reference-data, calculation, and idempotency controls are register-level governance rather than compound product decisions. | Register §3.4 | Pass |
| Governance controls carry source-criteria and scenario evidence equivalent to a decision row. | Register §3.4, GC-01–09 | Pass (added in v0.3; **Fail** in v0.2) |
| Every approved CBD-70 scenario is referenced by an active decision or governance control. | Register §§3.4, 4; 75 of 75 | Pass (added in v0.3; **Fail** in v0.2 — `VAL-01` and `PREV-02` unreferenced) |
| Every cited predecessor criterion exists in its approved source. | Register §§3.4, 4; 50 of 50 governing criteria | Pass (added in v0.3; **Fail** in v0.2 — `CBD-68-AC17` does not exist) |
| Product Owner approval is recorded for this exact revision. | Register §9 | Pending for v1.1 |
| Approved set is issued as MVP Schedule Decisions v1.1. | Register front matter and §9 | Pending |
| Approved artifacts are published to Confluence and mirrored in the repository, per register §8.4. | v1.0 remains published; v1.1 repository amendment is not yet published | Pending |

## 3. Active decision validation matrix

`Sources`, `Outcome`, `Normal/exception`, `UX/recovery`, `Audit`, `Implications`, and `Dependencies` correspond to the CBD-71 validation checklist. `PO` was satisfied by explicit Product Owner approval on August 14, 2026.

| Decision | Topic | Sources | Outcome | Dates / states / calculation | No conflict | Normal / exception | UX / recovery | Audit | Implications | Dependencies | PO | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SD-071-020 | Weekly and monthly anchors | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-021 | Initial setup period and preview | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-022 | Monthly anchor clamping | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-023 | Paycheck, semimonthly, multiple-anchor, and custom recurrence | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-024 | Single boundary-anchoring income | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-025 | Custom cadence length | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-026 | Change effective date and transition period | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-027 | Transition proration and rounding | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-028 | No carry-forward of remainder or overspending | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-029 | Single pending change and atomic activation | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-030 | Non-business-day policy and holiday authority | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-031 | Financial-state separation | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-032 | Income occurrence exceptions | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-033 | Cadence-neutral change adapter | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-034 | Expense budget date | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-035 | Transaction time excluded from classification | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-036 | Actual-income receipt rule | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-037 | Internal transfers | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-038 | Bill due date versus payment date | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-039 | Reversals and refunds | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-040 | Manually entered expenses | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-041 | Pending-to-settled reconciliation | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-042 | Late settlement in an ended period | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-043 | Alert certainty | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-044 | Personal notification channels and consent; recipient-only preference control | Pass | Pass | Pass | Pending | Pass | Pass | Pass | Pass | Pass | Pending | Proposed v1.1 amendment |
| SD-071-045 | History and audit retention | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-046 | Role action boundary | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-047 | Authorization enforcement and concurrency | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-048 | Accessibility | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-049 | Setup input validation | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |
| SD-071-050 | Budget-date override | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved | Accepted for MVP |

**Verification basis.** `Sources` and `Dependencies` were verified mechanically in v0.3: every cited predecessor criterion exists in its approved source, every cited scenario ID exists in the approved CBD-70 catalog, and every dependency reference resolves to an active decision or a governance control. The remaining gates carry the v0.2 content review forward at per-decision granularity; they were re-read against each row in v0.3 but have not been independently reviewed by a second reviewer. The calendar-and-calculation and architecture-alignment passes in §4 were subsequently completed and are recorded there.

### 3.1 Superseded version 0.1 matrix

The historical rows below applied to SD-071-001–019 before the Product Owner-directed atomicity review. They are retained for audit only and do not describe active proposals.

| Decision | Sources | Outcome | Dates / states / calculation | No conflict | Normal / exception | UX / recovery | Audit | Implications | Dependencies | PO | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SD-071-001 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-002 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-003 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-004 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-005 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-006 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-007 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-008 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-009 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-010 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-011 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-012 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-013 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-014 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-015 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-016 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-017 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-018 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |
| SD-071-019 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | n/a | Superseded |

The Pass results mean each decision has evidence in the frozen baseline. The `PO` gate was satisfied on August 14, 2026, promoting SD-071-020 through SD-071-050 to Accepted for MVP.

## 4. Required review passes

| Review | Scope | Reviewer | Status | Findings |
| --- | --- | --- | --- | --- |
| Source and traceability | Verify all register claims against approved CBD-67 through CBD-70 artifacts and both directions of criterion/scenario mapping. | Codex draft; independent audit by Claude | Complete | Codex consolidation found no blocking source conflict. The independent Claude audit verified that all 50 governing criteria and all 75 approved scenarios are represented, that every cited criterion exists in its approved source, and that every dependency reference resolves; it raised RF-71-05 through RF-71-14, all resolved except the publication item. |
| Calendar and calculation | Reconfirm anchors, inclusive/exclusive boundaries, short months, leap years, holiday handling, proration, rounding, and reconciliation equations. | Independent audit by Claude, on the CBD-70 re-derivation precedent | Complete | Full sweep of every rule restatement in the active decisions and governance controls against the frozen sources. All calendar and calculation restatements reproduce, including anchors and the Monday default, short-month clamping, the three non-business-day policies, the Federal Reserve holiday authority, the four income projection states, the 1–366 day custom bound, half-up rounding with largest-remainder cent assignment and stable-ID tie-breaking, and the role action matrix. The sweep raised RF-71-15 through RF-71-19, all approved rules omitted from the consolidation rather than errors in it; all five are resolved in register v0.6. Underlying dates, intervals, and monetary results were re-derived under the approved CBD-70 review and are inherited through the §2 baseline. |
| Decision quality | Check that every selected behavior is singular, implementation-neutral, understandable, and covers exceptional behavior or a linked deferral. | Alexander Wohlford — Product Owner | Complete | Accepted all structural findings; compound v0.1 rows were superseded by SD-071-020–048. Final decision approval recorded August 14, 2026. |
| Architecture alignment | Check named dependencies against architecture and identify data-model, interface, security, privacy, accessibility, role, and operational consequences. | Independent audit by Claude | Complete | Checked all 31 active decisions and 9 governance controls against `architecture.md`. No decision contradicts the architecture. Append-only audit, historical-period preservation, changeable imported transactions, deny-by-default authorization, notification deduplication, UTC storage with a budget-space time zone, integer minor units, and idempotent jobs all support named decisions directly. Raised RF-71-20 through RF-71-24 as architecture and technical-design follow-ups; none blocks a product decision, and all fall to technical design, CBD-12, or CBD-15 rather than to CBD-71 scope. |
| Product Owner approval | Review all proposed, deferred, and unresolved dispositions and approve the exact version. | Alexander Wohlford | Complete | Approved MVP Schedule Decisions v1.0 on August 14, 2026. RF-71-20 through RF-71-24 accepted as out-of-scope follow-ups that do not change an accepted decision. |

## 5. Current validation outcome

| Measure | Result |
| --- | --- |
| Superseded draft grouping rows | 19 |
| Deferred decisions | 10 |
| Unresolved in-MVP decisions | 0 identified |
| Active decisions with baseline evidence | 31 of 31 |
| Active decisions explicitly approved in this consolidated register | 31 of 31 |
| Governing criteria represented | 50 of 50 |
| Proposed MVP decisions | 31 atomic decisions |
| Approved scenarios referenced | 75 of 75 |
| Blocking gate | CBD-69/CBD-71 consistency review, updated scenario audit, publication, and Product Owner approval |

MVP Schedule Decisions v1.0 remains the historical approved release. The v1.1 amendment is not authoritative until its updated source, scenario, consistency, publication, and Product Owner approval gates pass.

## 6. Revision history

| Version | Date | Author | Summary | Outcome |
| --- | --- | --- | --- | --- |
| 0.1 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Created the validation framework and performed the initial source-consistency pass over SD-071-001–019. | In review |
| 0.2 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Recorded the Product Owner's agreement with all review recommendations; validated the 29 replacement decisions for atomicity and separated governance and deferral concerns. | In review; final approval pending |
| 0.3 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Added three integrity gates that the v0.2 checklist did not test, and revalidated after the RF-71-05 through RF-71-07 corrections. Active set is now 30 decisions. | In review; final approval pending |
| 0.4 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Resolved RF-71-09, RF-71-10, RF-71-13, and RF-71-14: expanded §3 to one row per active decision with a stated verification basis, set the superseded matrix to Superseded, replaced the circular decision-group gate with criteria and scenario coverage gates, and added the Confluence publication gate. | In review; final approval pending |
| 0.5 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Named the outstanding review passes on the CBD-68 and CBD-70 reviewer precedent, recorded the source-and-traceability pass as complete, and closed the publication gate after the Product Owner published the CBD-70 and CBD-71 pages. | In review; final approval pending |
| 0.6 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Completed the calendar-and-calculation sweep and the architecture-alignment pass, raising RF-71-15 through RF-71-24. All five required review passes except Product Owner approval are now complete. | In review; Product Owner approval is the only remaining gate |
| 0.7 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Revalidated SD-071-034 and SD-071-050 after the back-reference was added. | In review; Product Owner approval is the only remaining gate |
| 1.0 | August 14, 2026 | Alexander Wohlford — Product Owner | Recorded Product Owner approval. All register-level gates pass and all five review passes are complete. | **Complete;** SD-071-020 through SD-071-050 Accepted for MVP |
| 1.1.0-draft | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Reopened the affected validation gates for the SD-071-044 amendment making delivery preferences recipient-controlled personal-account settings. | In review; updated consistency, scenario, publication, and Product Owner approval pending |
