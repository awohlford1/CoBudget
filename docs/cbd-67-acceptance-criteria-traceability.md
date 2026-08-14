# CBD-67 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | Approved |
| Document version | 1.5 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval, on the evidence of an independent AI-assisted audit of Codex-authored drafts (see §6 and RF-07) |
| Jira subtask | [CBD-67](https://cobudget.atlassian.net/browse/CBD-67) |
| Workflow specification | [CBD-67 — Weekly and Monthly Budget Cycle Workflow Specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/655361) |
| Scenario catalog | [CBD-67 — Weekly and Monthly Cadence Scenario Catalog](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/688129) |
| Future Feature Register | [CoBudget Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) |
| Last updated | August 12, 2026 |

## 1. Purpose and completion rule

This record demonstrates how every acceptance criterion in the Jira description and Acceptance Criteria field for CBD-67 is addressed by the product workflow specification, scenario catalog, and core invariants. It also records review findings, deferred decisions, and the evidence still required after product definition.

“Complete for Final Draft” means the intended product behavior is defined and cross-document coverage has been demonstrated. It does **not** mean the feature has been technically designed, implemented, tested in executable software, or formally approved.

### 1.1 Evidence states

| State | Meaning |
| --- | --- |
| Mapped | The criterion has an explicit specification, scenario, and invariant mapping. |
| Demonstrated | At least one concrete scenario shows the intended behavior or boundary. |
| Complete for Final Draft | Product rules are mapped and demonstrated with no known implementation-blocking product decision. |
| Formally approved | An assigned reviewer has reviewed and approved the product definition. |
| Implemented and verified | The implementation exists and linked executable tests or other objective evidence pass. |

A criterion may be complete for Final Draft while formal approval and implementation evidence remain outstanding.

## 2. Acceptance criteria traceability matrix

The criterion summaries below reflect both the CBD-67 Description and Acceptance Criteria fields. Specification references are to the finalized workflow specification; scenario IDs are defined in the scenario catalog.

| AC | Requirement summary | Specification evidence | Scenario evidence | Key invariants | Parent / epic trace | Product evidence | Implementation evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AC-01 | Weekly setup documents the Monday default and selection of any weekday anchor. | §§5–6, 19 | SCN-W-01, SCN-W-02 | INV-02, INV-04, INV-05, INV-18, INV-87 | CBD-11-AC07, AC14; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-02 | Initial weekly and monthly onboarding opens the complete current anchored period. | §§5–7 | SCN-W-01, SCN-W-02, SCN-M-01–05 | INV-15, INV-17, INV-19, INV-69, INV-77 | CBD-11-AC07, AC14; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-03 | Monthly setup supports numbered anchors 1 through 31 and an explicit Last day option. | §6 | SCN-M-01–05 | INV-18, INV-87 | CBD-11-AC07, AC14; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-04 | Missing monthly dates, February, and leap-year cases clamp to the final valid date and return to the selected numbered anchor when possible. | §6 | SCN-M-02, SCN-M-03, SCN-M-04 | INV-18, INV-87 | CBD-11-AC14; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-05 | Weekly and monthly dates, local-midnight behavior, and previews use the authoritative budget time zone. | §§3, 5–6, 14 | SCN-W-01, SCN-W-02, SCN-M-01–05, ERR-09–12; Catalog §12.1 | INV-06–08, INV-11, INV-22, INV-24, INV-75, INV-87 | CBD-11-AC14, AC20; CBD-1-AC01, AC07 | Complete for Final Draft | Not started |
| AC-06 | Required inputs, validation messages, confirmation behavior, and setup previews showing the current period plus at least the next three periods are documented. | §§5–7, 14, 17 | SCN-W-01, SCN-W-02, SCN-M-01–05, ERR-03–12, A11Y-01 | INV-15, INV-17, INV-19, INV-38, INV-69, INV-70, INV-88 | CBD-11-AC07, AC18, AC20; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-07 | Schedule changes require an exact effective date of today or a future date and reject past dates. | §8 | SCN-C-01–05, ERR-01, ERR-14 | INV-08, INV-23, INV-29, INV-30, INV-60 | CBD-11-AC16; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-08 | Today uses the budget calendar date at local midnight, and the MVP permits only one pending future change per budget. | §§3, 8, 13–14 | SCN-C-01–05, LIFE-01, ERR-02 | INV-08, INV-22, INV-26, INV-29, INV-31, INV-60 | CBD-11-AC16; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-09 | A pending change remains visible, editable, and cancelable until execution while the current schedule remains authoritative. | §§4, 8, 13–14 | SCN-C-02, SCN-C-04, LIFE-01–04, PERM-01–03, HIST-01 | INV-26–28, INV-31–33, INV-61, INV-66, INV-71 | CBD-11-AC16, AC17; CBD-1-AC01, AC07 | Complete for Final Draft | Not started |
| AC-10 | A mid-period change closes the old period through the previous day and creates the defined transition period. | §§8–10 | SCN-C-01, SCN-C-04, SCN-C-05 | INV-23, INV-29, INV-35, INV-62 | CBD-11-AC16; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-11 | A boundary-aligned change starts a full period without unnecessary proration. | §§8–10 | SCN-C-02, SCN-C-03 | INV-30, INV-35, INV-62 | CBD-11-AC16; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-12 | Planned category allocations are prorated by included calendar days, while actual transactions and bills are never prorated. | §§9–12, 16 | SCN-C-01–05, CALC-01, LIFE-05, LIFE-06, FIN-01; Catalog §12.2 | INV-09, INV-35–37, INV-40–56, INV-78, INV-84, INV-85 | CBD-11-AC16; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-13 | Positive remaining amounts stay in the completed or closed period’s history and are not carried into a transition or later period during the MVP. | §§10–11, 13, 19 | HIST-02, SCOPE-01 | INV-21, INV-57, INV-63, INV-74 | CBD-11-AC16; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-14 | Overspending stays in completed or closed period history, no balance is carried forward, and rollover is explicitly deferred. | §§10–11, 13, 19; Future Feature Register | HIST-02, SCOPE-01 | INV-21, INV-57, INV-63, INV-74 | CBD-11-AC16, AC17; CBD-1-AC01, AC06, AC07 | Complete for Final Draft | Not started |
| AC-15 | Change previews show the old period, transition period when applicable, first full new period, allocation changes, affected bills, and affected transactions. | §§8–12, 16 | SCN-C-01–05, FIN-01–04, PERM-01 | INV-34, INV-40–51, INV-58–60, INV-74, INV-82 | CBD-11-AC18, AC20; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-16 | Confirmation explicitly identifies the effective date, new cadence and anchor, and proration result. | §§8–10, 12, 14 | SCN-C-01–05; Catalog §4.1 | INV-35–38, INV-52–56, INV-76, INV-79, INV-84, INV-85 | CBD-11-AC16, AC20; CBD-1-AC01 | Complete for Final Draft | Not started |
| AC-17 | Scheduled, edited, canceled, confirmed, and executed changes create auditable records. | §§8, 13–15, 18 | SCN-C-01–05, LIFE-01, LIFE-02, LIFE-04, REC-01–05, HIST-01, HIST-02 | INV-03, INV-21, INV-57, INV-61–67, INV-76, INV-79–85 | CBD-11-AC16, AC17; CBD-1-AC01, AC07 | Complete for Final Draft | Not started |
| AC-18 | Completed periods retain their dates, planned amounts, actual amounts, and schedule-version references. | §§13, 15, 18 | HIST-02–04, PERM-03, REC-05 | INV-21, INV-57, INV-63, INV-76, INV-79–83 | CBD-11-AC17; CBD-1-AC01, AC07 | Complete for Final Draft | Not started |
| AC-19 | Examples cover weekly-to-monthly and monthly-to-weekly changes across immediate, future, mid-period, and boundary-aligned cases; deferred rollover and unresolved questions are recorded as follow-up work. | §§19–20; Scenario Catalog; Future Feature Register | SCN-W-01, SCN-W-02, SCN-M-01–05, SCN-C-01–05, SCOPE-01; Catalog §13 | INV-29, INV-30, INV-35, INV-42, INV-86–89 | CBD-11-AC18, AC19, AC20; CBD-1-AC01, AC06 | Complete for Final Draft | Not started |

## 3. Coverage roll-up

| Measure | Result | Interpretation |
| --- | --- | --- |
| Jira acceptance criteria reviewed | 19 of 19 | Both the Description and Acceptance Criteria fields were included in the review. |
| Acceptance criteria mapped to specification evidence | 19 of 19 | No criterion lacks a product-rule reference. |
| Acceptance criteria mapped to scenario evidence | 19 of 19 | Each criterion has at least one concrete scenario or catalog evidence section. |
| Core invariants available for verification | 89 | All invariants remain candidates for technical and executable verification. |
| Scenario IDs in the catalog | 61 (21 fully worked fixtures; 40 compact assertion-table entries) | Setup, change, lifecycle, calculation, financial, permission, recovery, history, accessibility, scope, and error paths are represented. Coverage depth is defined in Scenario Catalog §1; both levels are binding acceptance evidence. |
| Known implementation-blocking product decisions | 0 | The product definition can proceed to formal review and technical specification. |
| Deferred non-blocking decisions | 2 | FF-002 and FF-004 remain in the Future Feature Register. |
| Formal product approvals | 5 | Versions 1.0 and 1.2 were approved on August 11, 2026. Versions 1.3–1.5 were approved on August 12, 2026 after permission, cadence-adapter, and matching-scope reconciliation. The independent review limitation recorded in RF-07 remains applicable. |
| Executable implementation evidence | 0 | Implementation and testing have not started under this document. |

## 4. Review findings

| ID | Date | Review | Finding | Resolution / required action | Status |
| --- | --- | --- | --- | --- | --- |
| RF-01 | August 11, 2026 | Cross-document consistency | The original traceability template contained stale scenario references and “Not started” product statuses. | Reconciled all 19 criteria against the current Jira fields, specification, scenario catalog, and invariants. | Resolved |
| RF-02 | August 11, 2026 | Scenario arithmetic | The initial largest-remainder example did not provide a clean deterministic tie fixture. | Scenario SCN-CALC-01 was corrected to use four equal categories, explicit floor amounts, and deterministic cent assignment. | Resolved |
| RF-03 | August 11, 2026 | Formal review readiness | No formal product reviewer was assigned during Final Draft. | Alexander Wohlford completed and recorded Product Owner approval after the final critical review and closure corrections. | Resolved |
| RF-04 | August 11, 2026 | Delivery readiness | A separate technical specification and executable implementation evidence do not yet exist. | Create the technical specification, map implementation tests to the affected criteria and invariants, and record results here. | Open — future delivery gate |
| RF-05 | August 11, 2026 | Independent completion audit | Several traceability summaries and scenario associations had drifted from the exact Jira acceptance-criterion meanings, particularly AC02, AC08, and AC13–AC19. | Replaced the summaries with criterion-faithful language and reconciled the scenario catalog and traceability evidence to the current Jira fields. | Resolved |
| RF-06 | August 11, 2026 | Final critical completion review | The old-period financial-preview rules conflicted, AC13/AC14 used weak scenario evidence, AC16 confirmation assertions were implicit, and document approval metadata remained inconsistent. | Defined dates-only old-period presentation, mapped AC13/AC14 to HIST-02 and SCOPE-01, made AC16 assertions explicit, aligned complete-authorized-set wording, and promoted the package to version 1.0 Approved. | Resolved |
| RF-07 | August 11, 2026 | AI-assisted critical audit — accepted as the independent review pass for v1.2 under the amended §7.7 rule | An independent read of the workflow specification and scenario catalog verified the self-reported counts (89 invariants, 57 scenario IDs, 20 specification sections) and independently recomputed the calendar and proration arithmetic in CALC-01 and SCN-C-01, SCN-C-03, SCN-C-04, and SCN-C-05 — all checks passed. Two process issues were identified: the 57 scenario IDs span two undocumented levels of depth (21 fully worked fixtures and 36 compact assertion-table entries), which the unqualified count overstated; and author, reviewer, and Product Owner approver for version 1.0 were the same person, so the formal review process described in §6 and §7.7 was self-administered with no independent human review. | Coverage-depth issue resolved: Scenario Catalog §1 now documents the two levels and the §3 roll-up reports the split. Approval-independence issue resolved by Product Owner decision on August 11, 2026: the drafts under audit were authored by Codex rather than by the approver, the Product Owner reviewed them, and this audit supplied an independent critical pass over work the approver did not write. The Product Owner accepted that combination as sufficient separation for this documentation-scope subtask and amended §7.7 accordingly. The independent reviewer was an AI system, not a second human; a reader weighing this approval should account for that. | Resolved — accepted by Product Owner decision |
| RF-08 | August 12, 2026 | CBD-68 cross-document permission audit | The CBD-67 permission matrix authorized Collaborators to perform schedule changes, but several narrative, audit, interface-state, recovery, and verification passages incorrectly restricted those actions to Owners and Co-owners. | Made the matrix authoritative throughout: Primary Owner, Co-owner, and Collaborator are authorized schedule editors. Viewer and Accountability Partner remain read-only. Owner/Co-owner-only authority is retained for the separate budget-time-zone setting. Updated REC-04 and verified consistency with CBD-68 PD-68-12 and FF-001. | Resolved — approved by Product Owner |
| RF-09 | August 12, 2026 | CBD-68 cadence-extension audit | CBD-67 described weekly/monthly boundaries but did not define how paycheck or fixed-length custom cadences supply natural boundaries, nor how differently sized proposed-period targets are reviewed. | Added §8.10 cadence-neutral boundary-and-target adapter, generalized the proration basis, required explicit review of proposed full-period targets, and added ADAPT-01–04. Existing weekly/monthly outcomes are unchanged. | Resolved — approved by Product Owner |
| RF-10 | August 12, 2026 | Future-feature scope consistency | FF-004 broadly deferred income matching and overdue resolution already defined by CBD-68 PD-68-06/07. | Made CBD-68 authoritative for MVP one-to-one income matching and Late/Missing/Skip; narrowed FF-004 and CBD-67 references to the remaining bill, pending, complex, advanced-confidence, and additional-resolution work. | Resolved — approved by Product Owner |

No unresolved product-definition content defect remains. The approval-independence gate recorded in RF-07 was closed by Product Owner decision on August 11, 2026 under the amended §7.7 rule.

## 5. Deferred decisions and required follow-up

| ID | Topic | Affected evidence | Current disposition | Blocks Final Draft? | Future closure evidence |
| --- | --- | --- | --- | --- | --- |
| DEC-TZ-01 / FF-002 | Refine the time-zone change experience beyond the MVP budget-setting workflow. | AC-05; time-zone rules in §§3, 5, and 14 | Deferred to the Future Feature Register. MVP behavior remains fully defined. | No | Approved future-feature specification and linked implementation evidence |
| DEC-PM-01 / FF-004 | Define projection matching beyond CBD-68's resolved MVP one-to-one income rules. | AC-15, AC-16; §§9 and 15 | CBD-68 PD-68-06/07 are authoritative for income. FF-004 is narrowed to projected bills, pending interaction, complex cardinality/groups, advanced confidence, and additional resolution behavior. | No | Approved advanced matching specification and linked scenarios/tests |
| TECH-01 | Produce the separate technical specification for schedule storage, activation, recovery, period materialization, and observability. | All criteria; especially AC-08, AC-12, AC-17, AC-18, AC-19 | Planned future task; issue key to be assigned when created. | No for product Final Draft; yes for implementation authorization | Approved technical specification with requirement and invariant mappings |
| QA-01 | Create executable verification for the 19 criteria and applicable 89 invariants. | All criteria | Planned as part of implementation. | No for product Final Draft; yes for release | Linked automated/manual test results with pass/fail disposition |
| REV-01 | Obtain independent review and approval of the product-document package by a reviewer other than the drafter. | All criteria; §6 approval record; §7.7 governance rule | Closed August 11, 2026. Satisfied under the amended §7.7 rule by an independent AI-assisted critical audit of Codex-authored drafts, accepted and approved by the Product Owner. Not satisfied by a second human reviewer. | No — closed | Recorded in §6 and RF-07 |

The two deferred feature decisions are intentional scope choices, not gaps in the MVP behavior described by this document set.

## 6. Validation and approval record

| Review activity | Responsible party | Date | Evidence | Result |
| --- | --- | --- | --- | --- |
| Author completeness review | Alexander | August 11, 2026 | Jira CBD-67; workflow specification v0.9; scenario catalog v0.9 | Complete for Final Draft |
| Cross-document traceability review | Alexander with Codex assistance | August 11, 2026 | Matrix in §2 and coverage roll-up in §3 | Passed for Final Draft |
| Rules and edge-case review | Alexander | August 11, 2026 | Specification §§1–20; scenario catalog setup, change, lifecycle, error, and recovery scenarios | Complete for Final Draft |
| Formal product approval | Alexander Wohlford — Product Owner | August 11, 2026 | Final critical review findings resolved; version 1.0 package explicitly approved | Approved — self-administered; superseded as a completion gate by RF-07 |
| AI-assisted critical audit | Alexander Wohlford with Claude assistance | August 11, 2026 | Independent recount of invariants, scenario IDs, and specification sections; recomputation of CALC-01 and SCN-C-01/03/04/05 arithmetic; review of the v1.0 approval chain | Content verified; process findings raised as RF-07 |
| Independent review of drafts not authored by the approver | Claude (AI-assisted critical audit), supervised by Alexander Wohlford | August 11, 2026 | Independent audit of Codex-authored drafts: counts verified, CALC-01 and SCN-C-01/03/04/05 arithmetic recomputed, coverage-depth and approval-independence findings raised as RF-07 | Passed with findings; findings resolved |
| Final product approval (v1.2) | Alexander Wohlford — Product Owner | August 11, 2026 | Codex-authored drafts, Product Owner review, and the independent AI-assisted audit above, accepted together as sufficient reviewer separation under the amended §7.7 rule | Approved |
| Permission reconciliation approval (v1.3) | Alexander Wohlford — Product Owner, with Codex assistance | August 12, 2026 | CBD-67 matrix, narrative rules, audit actor labels, interface states, REC-04, CBD-68 PD-68-12, and FF-001 | Approved; Collaborators are authorized cadence schedule editors |
| Cadence-adapter approval (v1.4) | Alexander Wohlford — Product Owner, with Codex assistance | August 12, 2026 | Specification §8.10, §§9–10 and §12; ADAPT-01–04; CBD-68 PD-68-15 | Approved; deterministic boundary adapter and explicit target review required |
| Matching-scope reconciliation (v1.5) | Alexander Wohlford — Product Owner, with Codex assistance | August 12, 2026 | CBD-68 PD-68-06/07, narrowed FF-004, CBD-67 §§9/15/18, scenario §13 | Approved; CBD-68 income behavior is not deferred |
| Second-human independent review | Not performed | Not performed | No second human reviewer was available for this subtask | Not performed — consciously accepted by the Product Owner |
| Technical handoff review | Product and Engineering | Not performed | Separate technical specification required | Not started |
| Release verification | Engineering and QA | Not performed | Linked implementation and executable test evidence required | Not started |

Codex and Claude assistance indicate document reconciliation, drafting, and audit support. Neither is a substitute for the accountable human approver: the Product Owner remains accountable for this approval. Under the amended §7.7 rule, an AI-assisted audit may serve as the independent review pass when the audited drafts were not authored by the approver, but it does not transfer accountability and does not carry the assurance of a second human reviewer.

## 7. Change and evidence governance

1. Confluence is the authoritative source for this record and the related product documents. The local Markdown copies must be synchronized after each published update.
2. Any material change to the CBD-67 Description, Acceptance Criteria field, workflow specification, scenario catalog, or invariant set requires a traceability review.
3. A changed rule must update every affected criterion row, scenario, invariant reference, review finding, and deferred-decision entry.
4. Implementation evidence must link to an objective artifact such as an automated test, reviewed manual test record, monitoring result, or accepted defect disposition.
5. A documentation status must not be used as evidence that the implementation exists or passes.
6. A failed or missing verification blocks release of the affected workflow even if the criterion is complete for Final Draft.
7. A version may be marked Approved only after an independent review pass by a reviewer **other than the author of the drafts under review**, and after all approval-blocking findings are resolved. For documentation-scope subtasks, that independent pass may be an AI-assisted critical audit, provided the audited drafts were not authored by the approver and the audit findings are recorded and resolved. A named human approver remains accountable for the approval in all cases. This concession is scoped to product-documentation approval only; it does not extend to technical specifications, implementation, or release verification, each of which requires human review.

## 8. Revision history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 0.1 | August 9, 2026 | Alexander | Created the initial traceability and review template. |
| 0.9 | August 11, 2026 | Alexander with Codex assistance | Reconciled all 19 Jira criteria to the finalized workflow specification, 57-scenario catalog, and 89 invariants; documented review findings, deferred decisions, and remaining approval and delivery gates. |
| 0.9.1 | August 11, 2026 | Alexander with Codex assistance | Corrected criterion summaries and scenario mappings after an independent completion audit; retained formal approval as the remaining documentation gate. |
| 1.0 | August 11, 2026 | Alexander Wohlford with Codex assistance | Resolved the final critical-review findings, approved the product-document package, and established CBD-67 as complete for its documentation scope. |
| 1.1 | August 11, 2026 | Alexander Wohlford with Claude assistance | Recorded RF-07 from a supplementary AI-assisted critical audit: verified counts and arithmetic, documented the scenario-catalog coverage-depth split in the §3 roll-up, and identified that v1.0 approval was self-administered. Added REV-01, tightened the §7.7 approval rule to require a reviewer other than the author, and returned the package to In Review pending independent human review. No product rule, scenario outcome, or acceptance-criterion mapping was changed. |
| 1.2 | August 11, 2026 | Alexander Wohlford with Claude assistance | Product Owner decision: accepted the independent AI-assisted audit of Codex-authored drafts, supervised by the Product Owner, as sufficient reviewer separation for this documentation-scope subtask. Amended §7.7 to permit an AI-assisted independent pass for product-documentation approval only, with a named human approver remaining accountable and the concession explicitly not extending to technical specification, implementation, or release verification. Resolved RF-07, closed REV-01, recorded the approval and its justification in §6, and returned the package to Approved. No product rule, scenario outcome, or acceptance-criterion mapping was changed at any point in the 1.1 or 1.2 revisions. |
| 1.3 | August 12, 2026 | Alexander Wohlford with Codex assistance | Resolved RF-08 by making the authoritative permission matrix consistent throughout the CBD-67 package: Collaborators may perform cadence schedule changes without separate Owner approval; Viewer and Accountability Partner remain read-only; time-zone changes remain Owner/Co-owner-only. Updated REC-04 and aligned with CBD-68 PD-68-12. |
| 1.4 | August 12, 2026 | Alexander Wohlford with Codex assistance | Resolved RF-09 by adding the cadence-neutral boundary-and-target adapter, explicit proposed full-period target review, generalized paycheck/custom proration inputs, and ADAPT-01–04. Approved without changing existing weekly/monthly outcomes. |
| 1.5 | August 12, 2026 | Alexander Wohlford with Codex assistance | Resolved RF-10 by recognizing CBD-68 PD-68-06/07 as authoritative MVP income behavior and narrowing FF-004/CBD-67 language to projected-bill, pending, complex-cardinality, advanced-confidence, and additional-resolution work. |

## 9. Completion checklist

### Product-definition evidence

- [x] Jira Description reviewed.
- [x] Jira Acceptance Criteria field reviewed.
- [x] All 19 acceptance criteria mapped to specification evidence.
- [x] All 19 acceptance criteria mapped to scenario evidence.
- [x] Applicable core invariants identified for every criterion.
- [x] Weekly and monthly setup paths covered.
- [x] Immediate and future-dated change paths covered.
- [x] Transition-period and proration behavior covered.
- [x] Financial-data, estimate, projection, and permission behavior covered.
- [x] Lifecycle, history, recovery, and terminal-result behavior covered.
- [x] Accessibility, validation, error, and operational expectations covered.
- [x] MVP exclusions and deferred future features recorded.
- [x] Scenario-catalog coverage depth documented and reported.
- [x] No known implementation-blocking product decision remains.

### Remaining gates

- [x] Product Owner reviewer identified.
- [x] Final product review findings resolved.
- [x] Version 1.0 explicitly approved by the author acting as Product Owner.
- [x] Independent review pass by a reviewer other than the drafts' author completed and approval recorded (REV-01 / RF-07) — satisfied by AI-assisted audit under the amended §7.7 rule, not by a second human reviewer.
- [x] Version 1.2 explicitly approved with recorded justification.
- [x] Version 1.3 permission reconciliation explicitly approved.
- [x] Version 1.4 cadence-adapter and target-review rules explicitly approved.
- [x] Version 1.5 matching-scope reconciliation explicitly approved.
- [ ] Separate technical specification created and approved — requires human review; the §7.7 AI concession does not apply.
- [ ] Implementation completed.
- [ ] Executable tests mapped to affected criteria and invariants.
- [ ] Release verification evidence linked and passed.
