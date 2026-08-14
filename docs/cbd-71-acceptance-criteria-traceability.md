# CBD-71 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft — approval evidence incomplete** |
| Document version | 0.2 |
| Owner | Alexander Wohlford |
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
| CBD-71-AC03 | Validation is explicitly Product Owner approval, internal consistency, implementation readiness, and architecture alignment without a market-validation claim. | Register §1; checklist §1 | Checklist §§1, 4 | Draft evidence complete; reviews pending |
| CBD-71-AC04 | Every decision records all required decision fields. | Register §§3–4 | Checklist §§2–3 | Draft evidence complete |
| CBD-71-AC05 | Cadence and calendar decisions are covered. | SD-071-020–026, SD-071-030, SD-071-033; governance §3.4 | Checklist §3 | Draft evidence complete |
| CBD-71-AC06 | Income, target, cash, transaction, and reconciliation states are covered. | SD-071-031–042 | Checklist §3 | Draft evidence complete |
| CBD-71-AC07 | Changes, transition periods, proration, balance disposition, pending-change limit, and history are covered. | SD-071-026–029, SD-071-033, SD-071-045 | Checklist §3 | Draft evidence complete |
| CBD-71-AC08 | Alerts, explanations, overrides, permissions, provenance, and audit are covered. | SD-071-034–048 | Checklist §3 | Draft evidence complete |
| CBD-71-AC09 | Accepted decisions have an auditable chain to CBD-1, CBD-11, CBD-67 through CBD-70, and scenarios. | Source column in SD-071-020–048; register §2 | Source/traceability review in checklist §4 | Draft evidence complete; independent verification pending |
| CBD-71-AC10 | Each accepted decision has one outcome and sufficient normal and exceptional evidence for design and testing. | Atomic selected behavior and scenario evidence in SD-071-020–048 | Checklist §3 | Draft evidence complete; approval pending |
| CBD-71-AC11 | Contradictory or ambiguous rules cannot be accepted. | Register §§6–8 | Checklist §§2, 4 | Control defined; final review pending |
| CBD-71-AC12 | Deferred and unresolved decisions record rationale, impact, dependencies, and follow-up work. | Register §§5–6 | Checklist §§2, 5 | Draft evidence complete |
| CBD-71-AC13 | Product, technical, security, privacy, accessibility, role, and operational implications are reviewed. | Register §§3.3–3.4 and implication column in SD-071-020–048 | Architecture-alignment review in checklist §4 | Recorded; review pending |
| CBD-71-AC14 | Owner, approval date, outcome, and conditions are recorded for every accepted decision. | Register §§3.2, 9 | Checklist §§2–3 | **Not met: approval pending** |
| CBD-71-AC15 | The approved set is versioned as MVP Schedule Decisions v1.0 and made authoritative. | Register §§1, 9 | Checklist §2 | **Not met: version remains 0.2** |
| CBD-71-AC16 | Material changes create revisions, preserve history, and identify affected artifacts. | Register §8 | Checklist §2 | Control defined; no post-approval change yet |
| CBD-71-AC17 | Final review confirms disposition and traceability of CBD-11-AC01 through AC20 and links unmet criteria. | Register source chains; this record §3 | Final review in checklist §4 | **Pending final Story-level review** |

## 3. CBD-11 disposition

| CBD-11 criteria | Primary CBD-71 disposition | Evidence | Status |
| --- | --- | --- | --- |
| AC01–AC05 | Financial states, expected/actual income, targets, cash, and transactions | SD-071-031–042 | Covered in draft |
| AC06 | Alerts, permissions, provenance, privacy, and audit | SD-071-041–048 | Covered in draft |
| AC07–AC08 | Weekly, monthly, paycheck, semimonthly, and custom cadences | SD-071-020–026, SD-071-030, SD-071-033 | Covered in draft |
| AC09–AC10 | Income and financial-state separation | SD-071-031–036, SD-071-041–042 | Covered in draft |
| AC11–AC15 | Anchors, boundaries, multiple incomes, and calendar behavior | SD-071-020–025, SD-071-030; governance §3.4 | Covered in draft |
| AC16 | Immediate/future changes, transitions, proration, and balance disposition | SD-071-026–029, SD-071-033 | Covered in draft |
| AC17 | History, permissions, audit, alerts, and operational recovery | SD-071-026/029, SD-071-041–048 | Covered in draft |
| AC18 | Deterministic examples and test-ready traceability | SD-071-020–048; governance §3.4; approved CBD-70 package | Covered in draft |
| AC19 | Internal validation and unresolved-decision control | Register §§1, 6–9; validation checklist | Pending required reviews |
| AC20 | Authoritative decision register and change control | Entire register; validation checklist; this record | Pending Product Owner approval |

No CBD-11 criterion is currently identified as unmet because of a missing product rule. AC19 and AC20 remain incomplete only because the required review and approval evidence has not yet been recorded.

## 4. Follow-up backlog disposition

| Register item | Follow-up source | MVP impact | Link state |
| --- | --- | --- | --- |
| DD-071-001–010 | FF-001–FF-010 | Non-blocking for CBD-71; DD-071-002 remains a broader-MVP dependency | Existing Future Feature Register entries cited; Jira links remain to be assigned when future work is scoped |
| UD-071 series | None identified | A material new item blocks affected approval | Stable ID reserved by policy |

## 5. Review findings

| ID | Review | Finding | Required action | Status |
| --- | --- | --- | --- | --- |
| RF-71-01 | Initial consolidation | CBD-70 description contained legacy positive-rollover scenario wording, while the approved CBD-67/CBD-68/CBD-70 package requires no carry-forward. | Treat approved no-carry-forward behavior as authoritative and retain rollover as deferred FF-003. | Resolved in SD-071-028 and DD-071-003 |
| RF-71-02 | Initial consolidation | CBD-71 cannot inherit CBD-70’s approval as approval of this new consolidated register. | Keep every active SD-071 decision Proposed and the register in draft until explicit Product Owner approval of the exact set. | Resolved by current status model |
| RF-71-03 | Initial consolidation | Broader CBD-12 role design is not yet specified, but the approved schedule/reconciliation action matrix is sufficient for this scope. | Preserve the approved action boundary, identify CBD-12 as a dependency, and do not invent broader role behavior. | Resolved in SD-071-046–048 |
| RF-71-04 | Product Owner decision-quality review | Several v0.1 rows contained multiple independently testable outcomes; SD-071-009 and SD-071-016 used non-self-contained wording; former SD-071-018 was governance rather than product behavior; DD-071-002 was over-broad; and DD-071-004 conflated two distinct matching problems. | Create atomic replacement decisions, move determinism to governance, enumerate policies and triggers, split role/enforcement/accessibility, reclassify the time-zone dependency, and separate FF-004 from FF-007. | Resolved in register v0.2; Product Owner agreed with every recommendation August 14, 2026 |

## 6. Completion summary

| Measure | Result |
| --- | --- |
| Frozen predecessor packages | 4 of 4 |
| Proposed MVP decisions | 29 atomic decisions |
| Superseded v0.1 grouping rows | 19 retained for history |
| Required decision groups represented | 19 of 19 |
| Deferred decisions explicitly listed | 10 |
| Unresolved in-MVP decisions | 0 identified |
| CBD-71 criteria with draft evidence | 17 of 17 |
| CBD-71 criteria finally satisfied | 14 of 17 provisionally; AC14, AC15, and AC17 remain gated |
| Required review passes complete | Initial source review only |
| Product Owner approval | Pending |

## 7. Revision history

| Version | Date | Author | Summary | Decision |
| --- | --- | --- | --- | --- |
| 0.1 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Created initial CBD-71 criterion mapping, CBD-11 disposition, follow-up disposition, and review-finding record against the approved CBD-70 baseline. | Draft; approval pending |
| 0.2 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Recorded the accepted decision-quality findings and remapped traceability from the 19 superseded grouping rows to 29 active atomic decisions and 10 explicit deferrals. | Draft; final approval pending |
