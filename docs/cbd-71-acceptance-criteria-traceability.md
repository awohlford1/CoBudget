# CBD-71 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft — approval evidence incomplete** |
| Document version | 0.7 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval pending, on the evidence of Codex-authored consolidation drafts and an independent AI-assisted critical audit by Claude (see §5, RF-71-05 through RF-71-14), consistent with the CBD-68 and CBD-70 precedent |
| Jira | [CBD-71](https://cobudget.atlassian.net/browse/CBD-71) |
| Decision register | [MVP Schedule Decisions register](cbd-71-mvp-schedule-decision-register.md) |
| Validation checklist | [Validation checklist](cbd-71-validation-checklist.md) |
| Last updated | August 14, 2026 |

## 1. Completion rule

CBD-71 is complete only when the decision register covers the frozen CBD-67 through CBD-70 baseline, every CBD-71 criterion has final evidence, deferred and unresolved work is explicit and linked, all required reviews are complete, and the Product Owner approves MVP Schedule Decisions v1.0.

## 2. Acceptance-criteria traceability

| Criterion | Requirement | Register evidence | Validation evidence | Status |
| --- | --- | --- | --- | --- |
| CBD-71-AC01 | One authoritative register covers confirmed requirements from CBD-67 through CBD-70. | Register §§1–4; SD-071-020–048 | Checklist §2 | Draft evidence complete; approval pending |
| CBD-71-AC02 | Every decision has a stable ID and one permitted status. | Register §§3–6 | Checklist §2 | Draft evidence complete |
| CBD-71-AC03 | Validation is explicitly Product Owner approval, internal consistency, implementation readiness, and architecture alignment without a market-validation claim. | Register §1; checklist §1 | Checklist §§1, 4 | Met except Product Owner approval |
| CBD-71-AC04 | Every decision records all required decision fields. | Register §§3–4 | Checklist §§2–3 | Draft evidence complete |
| CBD-71-AC05 | Cadence and calendar decisions are covered. | SD-071-020–026, SD-071-030, SD-071-033, SD-071-049; governance §3.4 (GC-01–08) | Checklist §3 | Draft evidence complete |
| CBD-71-AC06 | Income, target, cash, transaction, and reconciliation states are covered. | SD-071-031–042 | Checklist §3 | Draft evidence complete |
| CBD-71-AC07 | Changes, transition periods, proration, balance disposition, pending-change limit, and history are covered. | SD-071-026–029, SD-071-033, SD-071-045 | Checklist §3 | Draft evidence complete |
| CBD-71-AC08 | Alerts, explanations, overrides, permissions, provenance, and audit are covered. | SD-071-034–048 | Checklist §3 | Draft evidence complete |
| CBD-71-AC09 | Accepted decisions have an auditable chain to CBD-1, CBD-11, CBD-67 through CBD-70, and scenarios. | Source column in SD-071-020–050; governance §3.4 chain and GC-01–09 source columns; register §2 | Source/traceability review in checklist §4 | Met; independent verification complete |
| CBD-71-AC10 | Each accepted decision has one outcome and sufficient normal and exceptional evidence for design and testing. | Atomic selected behavior and scenario evidence in SD-071-020–049 | Checklist §3 | Draft evidence complete; approval pending |
| CBD-71-AC11 | Contradictory or ambiguous rules cannot be accepted. | Register §§6–8 | Checklist §§2, 4 | Control defined; final review pending |
| CBD-71-AC12 | Deferred and unresolved decisions record rationale, impact, dependencies, and follow-up work. | Register §§5–6 | Checklist §§2, 5 | Draft evidence complete |
| CBD-71-AC13 | Product, technical, security, privacy, accessibility, role, and operational implications are reviewed. | Register §§3.3–3.4 and implication column in SD-071-020–050 | Architecture-alignment review in checklist §4 | Met; architecture-alignment pass complete with RF-71-20 through RF-71-24 recorded as technical-design follow-ups |
| CBD-71-AC14 | Owner, approval date, outcome, and conditions are recorded for every accepted decision. | Register §§3.2, 9 | Checklist §§2–3 | **Not met: approval pending** |
| CBD-71-AC15 | The approved set is versioned as MVP Schedule Decisions v1.0 and made authoritative. | Register §§1, 9 | Checklist §2 | **Not met: version remains 0.2** |
| CBD-71-AC16 | Material changes create revisions, preserve history, and identify affected artifacts. | Register §8 | Checklist §2 | Control defined; no post-approval change yet |
| CBD-71-AC17 | Final review confirms disposition and traceability of CBD-11-AC01 through AC20 and links unmet criteria. | Register source chains; this record §3 | Final review in checklist §4 | **Pending final Story-level review** |

## 3. CBD-11 disposition

| CBD-11 criteria | Primary CBD-71 disposition | Evidence | Status |
| --- | --- | --- | --- |
| AC01–AC05 | Financial states, expected/actual income, targets, cash, and transactions | SD-071-031–042 | Covered in draft |
| AC06 | Alerts, permissions, provenance, privacy, and audit | SD-071-041–048 | Covered in draft |
| AC07–AC08 | Weekly, monthly, paycheck, semimonthly, and custom cadences | SD-071-020–026, SD-071-030, SD-071-033, SD-071-049 | Covered in draft |
| AC09–AC10 | Income and financial-state separation | SD-071-031–036, SD-071-041–042 | Covered in draft |
| AC11–AC15 | Anchors, boundaries, multiple incomes, and calendar behavior | SD-071-020–025, SD-071-030, SD-071-049; governance §3.4 (GC-01–08) | Covered in draft |
| AC16 | Immediate/future changes, transitions, proration, and balance disposition | SD-071-026–029, SD-071-033 | Covered in draft |
| AC17 | History, permissions, audit, alerts, and operational recovery | SD-071-026/029, SD-071-041–048 | Covered in draft |
| AC18 | Deterministic examples and test-ready traceability | SD-071-020–050; governance §3.4 (GC-01–09); approved CBD-70 package | Covered in draft |
| AC19 | Internal validation and unresolved-decision control | Register §§1, 6–9; validation checklist | Covered; all required reviews except approval complete |
| AC20 | Authoritative decision register and change control | Entire register; validation checklist; this record | Pending Product Owner approval |

No CBD-11 criterion is currently identified as unmet because of a missing product rule. AC19 and AC20 remain incomplete only because the required review and approval evidence has not yet been recorded.

## 4. Follow-up backlog disposition

| Register item | Follow-up source | MVP impact | Link state |
| --- | --- | --- | --- |
| DD-071-001–010 | FF-001–FF-010 | Non-blocking for CBD-71; DD-071-002 remains a broader-MVP dependency | Existing Future Feature Register entries cited; Jira links remain to be assigned when future work is scoped |
| UD-071 series | None identified | A material new item blocks affected approval | Stable ID reserved by policy |
| CBD-70 and CBD-71 Confluence pages | Register §8.4 | No longer blocking; pages published August 14, 2026 and the repository mirror is current | Published; front-matter page links to be added on the CBD-67 through CBD-69 pattern |

## 5. Review findings

| ID | Review | Finding | Required action | Status |
| --- | --- | --- | --- | --- |
| RF-71-01 | Initial consolidation | CBD-70 description contained legacy positive-rollover scenario wording, while the approved CBD-67/CBD-68/CBD-70 package requires no carry-forward. | Treat approved no-carry-forward behavior as authoritative and retain rollover as deferred FF-003. | Resolved in SD-071-028 and DD-071-003 |
| RF-71-02 | Initial consolidation | CBD-71 cannot inherit CBD-70’s approval as approval of this new consolidated register. | Keep every active SD-071 decision Proposed and the register in draft until explicit Product Owner approval of the exact set. | Resolved by current status model |
| RF-71-03 | Initial consolidation | Broader CBD-12 role design is not yet specified, but the approved schedule/reconciliation action matrix is sufficient for this scope. | Preserve the approved action boundary, identify CBD-12 as a dependency, and do not invent broader role behavior. | Resolved in SD-071-046–048 |
| RF-71-04 | Product Owner decision-quality review | Several v0.1 rows contained multiple independently testable outcomes; SD-071-009 and SD-071-016 used non-self-contained wording; former SD-071-018 was governance rather than product behavior; DD-071-002 was over-broad; and DD-071-004 conflated two distinct matching problems. | Create atomic replacement decisions, move determinism to governance, enumerate policies and triggers, split role/enforcement/accessibility, reclassify the time-zone dependency, and separate FF-004 from FF-007. | Resolved in register v0.2; Product Owner agreed with every recommendation August 14, 2026 |
| RF-71-05 | Independent final review | SD-071-048 and superseded SD-071-019 cited `CBD-68-AC17`; CBD-68 defines AC01 through AC16 only, so the chain required by CBD-71-AC09 was broken. | Correct both citations to `CBD-68-AC16`, which covers accessible interaction and deterministic testing, and record the superseded-row correction under register §8.6. | Resolved in register v0.3 |
| RF-71-06 | Independent final review | Demoting SD-071-018 to governance §3.4 in v0.2 dropped its source chain. §3.4 carried no criteria or scenario evidence, leaving CBD-67-AC05 traced by no active row and governing-criteria coverage at 48 of 50. | Give §3.4 a per-control table with source criteria and scenario evidence and a common epic chain. | Resolved by GC-01 through GC-08 in register v0.3; coverage restored to 50 of 50 |
| RF-71-07 | Independent final review | Two approved CBD-70 scenarios were referenced nowhere in the register. `PREV-02` lost the atomicity and idempotency clause that v0.1 SD-071-007 carried, and `VAL-01` setup-input validation had no home in any active decision. | Restore the atomic-activation and replay clause to SD-071-029 with `PREV-02` evidence, and add SD-071-049 for schedule-setup input validation citing CBD-67-AC06, CBD-69-AC14, and `VAL-01`. | Resolved in register v0.3; 75 of 75 scenarios now referenced |
| RF-71-08 | Independent final review | DD-071-003, DD-071-006, and DD-071-008 linked to superseded v0.1 rows SD-071-006, SD-071-010, and SD-071-003. | Repoint each to its active replacement: SD-071-028, SD-071-031, and SD-071-023/025. | Resolved in register v0.4 |
| RF-71-09 | Independent final review | Every §4A row printed `MVP / Proposed` in its status cell and the checklist §3.1 matrix returned Proposed, contradicting CBD-71-AC02 while the corresponding gate read Pass. | Set the status cell to Superseded while retaining the v0.1 text in place, and set the superseded matrix Result to Superseded with PO not applicable. | Resolved in register v0.4 and checklist v0.4 |
| RF-71-10 | Independent final review | Checklist §3 collapsed all active decisions into one roll-up row while giving 19 individual rows to superseded drafts, inverting validation depth against CBD-71-AC10. | Expand §3 to one row per active decision with a topic label and a stated verification basis distinguishing mechanically verified gates from carried-forward content review. | Resolved in checklist v0.4 |
| RF-71-11 | Independent final review | The frozen baseline omitted the approved CBD-67 (1.5), CBD-68 (1.0), and CBD-69 (1.0) scenario catalogs while stating that only listed artifacts may determine an accepted outcome. | Add all three to register §2. | Resolved in register v0.4 |
| RF-71-12 | Independent final review | SD-071-044 cited `CBD-68-AC13/16` for notification behavior, but AC13 is the cadence-change adapter; the alert rules are product decisions PD-68-13 and PD-68-16. | Cite CBD-68-AC10/16 with PD-68-13/16, and add PD-68-17 to the accessibility decision SD-071-048. | Resolved in register v0.4 |
| RF-71-13 | Independent final review | "19 of 19 required decision groups represented" was circular: the groups were defined by the superseded v0.1 rows being replaced. | Replace with coverage of the 50 approved governing criteria and 75 approved scenarios, both mechanically verifiable. | Resolved in checklist v0.4 and this record v0.4 |
| RF-71-14 | Independent final review | CBD-70 and CBD-71 documents carry no Confluence page links, while CBD-67 through CBD-69 each do. Register §8.4 requires Jira, repository, and published register to be updated together. | Publish the CBD-70 and CBD-71 pages and add their links before v1.0 issuance; tracked as a checklist §2 gate. | Resolved — Product Owner published both pages August 14, 2026; front-matter page links remain to be added |
| RF-71-15 | Calendar and calculation sweep | SD-071-039 omitted the CBD-69 INV-69-21 excess-refund rule: a linked refund above the original expense stays as an excess credit in the original period and category and may make net actual spending negative. | Restate the rule in SD-071-039. | Resolved in register v0.6 |
| RF-71-16 | Calendar and calculation sweep | Budget-date override behavior (CBD-69 INV-69-12/13) appeared only as an audit obligation. No active decision stated who may override, what an override changes, or that retained source dates are never altered. | Add an atomic decision for override behavior. | Resolved by SD-071-050 in register v0.6 |
| RF-71-17 | Calendar and calculation sweep | SD-071-041 omitted CBD-69 INV-69-22: while a pending and posted pair is in Duplicate-review, the settled amount is counted and the pending record contributes no separate impact. | Restate the counting rule in SD-071-041. | Resolved in register v0.6 |
| RF-71-18 | Calendar and calculation sweep | The CBD-69 INV-69-18 daylight-saving invariant had no home; GC-01 covered the time zone but not the calendar-day-count guarantee. | Add the invariant as a governance control. | Resolved by GC-09 in register v0.6 |
| RF-71-19 | Calendar and calculation sweep | SD-071-043 labeled alerts informational without CBD-69 INV-69-23's testable properties: never asserts a limit was exceeded, self-clears when the provisional record resolves, requires no acknowledgement. | Restate the lifecycle in SD-071-043. | Resolved in register v0.6 |
| RF-71-20 | Architecture alignment | The versioned holiday reference dataset required by SD-071-030 and GC-04 has no home in `architecture.md`: it is neither a domain module nor a key data rule, and the block-on-unsupported-year behavior has no stated owner. | Add reference-data storage, versioning, and refresh verification to the architecture before schedule implementation. | Open — technical design follow-up |
| RF-71-21 | Architecture alignment | SD-071-044 treats email, push, and SMS as opt-in MVP channels, while `architecture.md` phases delivery as in-app and email first with push and SMS later. | Reconcile before implementation: either scope the MVP channel set in the register or record the phasing in the architecture. Not a product-rule conflict. | Open — requires Product Owner and technical-design decision |
| RF-71-22 | Architecture alignment | Three data-model consequences of accepted decisions are not recorded in the architecture: a schedule version must reference its boundary-anchoring income schedule (SD-071-024), category identifiers must be stable and never reused for the residual-cent tie-break (SD-071-027, CBD-67 INV-84), and a confirmation identity must persist so activation replay stays idempotent (SD-071-029, GC-08). | Record all three as key data rules. | Open — technical design follow-up |
| RF-71-23 | Architecture alignment | SD-071-048 makes accessible schedule and reconciliation interaction MVP behavior, but `architecture.md` states no accessibility baseline and its critical automated tests include no accessibility coverage. | Add an accessibility baseline and automated coverage to the architecture. | Open — technical design follow-up |
| RF-71-24 | Architecture alignment | SD-071-034 depends on the financial-data provider supplying reliable authorization dates. The architecture names a provider adapter with Plaid first; if authorization dates are unreliable, the approved posted-or-settlement fallback becomes the normal path and changes observed period attribution. | Confirm provider authorization-date reliability under CBD-15 before implementation. | Open — provider evidence needed, tracked with FF-007 |

## 6. Completion summary

| Measure | Result |
| --- | --- |
| Frozen predecessor packages | 4 of 4 |
| Proposed MVP decisions | 31 atomic decisions |
| Superseded v0.1 grouping rows | 19 retained for history |
| Governing criteria represented by an active decision or governance control | 50 of 50 |
| Approved CBD-70 scenarios referenced | 75 of 75 |
| Deferred decisions explicitly listed | 10 |
| Unresolved in-MVP decisions | 0 identified |
| CBD-71 criteria with draft evidence | 17 of 17 |
| CBD-71 criteria finally satisfied | 14 of 17 provisionally; AC14, AC15, and AC17 remain gated |
| Required review passes complete | 4 of 5; only Product Owner approval remains |
| Product Owner approval | Pending |

## 7. Revision history

| Version | Date | Author | Summary | Decision |
| --- | --- | --- | --- | --- |
| 0.1 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Created initial CBD-71 criterion mapping, CBD-11 disposition, follow-up disposition, and review-finding record against the approved CBD-70 baseline. | Draft; approval pending |
| 0.2 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Recorded the accepted decision-quality findings and remapped traceability from the 19 superseded grouping rows to 29 active atomic decisions and 10 explicit deferrals. | Draft; final approval pending |
| 0.3 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Resolved independent-review findings RF-71-05 through RF-71-07. Corrected the nonexistent CBD-68-AC17 citation, gave governance §3.4 its own source and scenario evidence as GC-01–08, and added SD-071-049 so setup-input validation has an active decision. Active set is 30 decisions with 50 of 50 governing criteria and 75 of 75 scenarios referenced. | Draft; final approval pending |
| 0.4 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded findings RF-71-08 through RF-71-14 and their resolutions. Coverage is now stated as 50 of 50 governing criteria and 75 of 75 scenarios rather than a self-defined group count. RF-71-14 remains open pending Confluence publication. | Draft; final approval pending |
| 0.5 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Closed RF-71-14 after Product Owner publication, added the Reviewer field on the CBD-68 and CBD-70 precedent, and updated the review-pass status summary. | Draft; final approval pending |
| 0.6 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the completed calendar-and-calculation and architecture-alignment passes and findings RF-71-15 through RF-71-24. Active set is 31 decisions and 9 governance controls. Product Owner approval is the only remaining gate. | Draft; ready for Product Owner approval |
| 0.7 | August 14, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the SD-071-034 back-reference to SD-071-050. Editorial; no criterion disposition changed. | Draft; ready for Product Owner approval |
