# CBD-71 — MVP Schedule Decisions Validation Checklist

| Field | Value |
| --- | --- |
| Status | **In review** |
| Document version | 0.2 |
| Decision register | [CBD-71 MVP Schedule Decisions](cbd-71-mvp-schedule-decision-register.md) |
| Jira | [CBD-71](https://cobudget.atlassian.net/browse/CBD-71) |
| Owner | Alexander Wohlford |
| Last updated | August 14, 2026 |

## 1. Validation standard

A decision is validated only when it is Product Owner approved, internally consistent, implementation-ready, and architecture-aligned. This checklist records internal product validation for a solo project. It does not claim customer or market validation.

## 2. Register-level gates

| Gate | Evidence | Result |
| --- | --- | --- |
| Frozen approved sources are identified by artifact and version. | Register §2; CBD-70 traceability §2 | Pass |
| All 19 required decision groups are represented. | Register SD-071-020–048 and traceability §3 | Pass |
| Every decision has a stable ID and permitted status. | Register §§3–6 | Pass |
| Every decision records statement, sources, problem, behavior, alternatives, rationale, classification, implications, dependencies, owner, approval date, status, and revision history. | Register §§3–4; common fields in §3.2 apply to every row | Pass |
| Accepted and superseded records will be retained. | Register §8 | Pass |
| Deferred behavior is separated from MVP behavior. | Register §5; Future Feature Register | Pass |
| Unresolved behavior is explicit and blocks affected acceptance. | Register §6 and §8 | Pass |
| Determinism, interval, reference-data, calculation, and idempotency controls are register-level governance rather than compound product decisions. | Register §3.4 | Pass |
| Product Owner approval is recorded for this exact revision. | Register §9 | **Pending** |
| Approved set is issued as MVP Schedule Decisions v1.0. | Register front matter and §9 | **Pending** |

## 3. Active decision validation matrix

`Sources`, `Outcome`, `Normal/exception`, `UX/recovery`, `Audit`, `Implications`, and `Dependencies` correspond to the CBD-71 validation checklist. `PO` remains pending until explicit approval.

| Decision | Sources | Outcome | Dates / states / calculation | No conflict | Normal / exception | UX / recovery | Audit | Implications | Dependencies | PO | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SD-071-020–048 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed; 29 atomic rows reviewed |

Every ID in the inclusive range SD-071-020–048 has its own row in the register. The range is used here only as a validation roll-up; it does not merge their expected outcomes.

### 3.1 Superseded version 0.1 matrix

The historical rows below applied to SD-071-001–019 before the Product Owner-directed atomicity review. They are retained for audit only and do not describe active proposals.

| Decision | Sources | Outcome | Dates / states / calculation | No conflict | Normal / exception | UX / recovery | Audit | Implications | Dependencies | PO | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SD-071-001 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-002 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-003 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-004 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-005 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-006 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-007 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-008 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-009 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-010 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-011 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-012 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-013 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-014 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-015 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-016 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-017 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-018 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |
| SD-071-019 | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pending | Proposed |

The active Pass results mean the proposed consolidation has evidence in the frozen baseline. They do not promote any decision to Accepted for MVP without the `PO` gate.

## 4. Required review passes

| Review | Scope | Reviewer | Status | Findings |
| --- | --- | --- | --- | --- |
| Source and traceability | Verify all register claims against approved CBD-67 through CBD-70 artifacts and both directions of criterion/scenario mapping. | Codex | Draft complete; independent verification pending | Initial consolidation found no blocking source conflict. |
| Calendar and calculation | Reconfirm anchors, inclusive/exclusive boundaries, short months, leap years, holiday handling, proration, rounding, and reconciliation equations. | _TBD_ | Pending | — |
| Decision quality | Check that every selected behavior is singular, implementation-neutral, understandable, and covers exceptional behavior or a linked deferral. | Alexander Wohlford — Product Owner | Initial review complete | Accepted all structural findings; compound v0.1 rows were superseded by SD-071-020–048. Final decision approval remains pending. |
| Architecture alignment | Check named dependencies against architecture and identify data-model, interface, security, privacy, accessibility, role, and operational consequences. | _TBD_ | Pending | — |
| Product Owner approval | Review all proposed, deferred, and unresolved dispositions and approve the exact version. | Alexander Wohlford | Pending | — |

## 5. Current validation outcome

| Measure | Result |
| --- | --- |
| Proposed MVP decisions | 29 atomic decisions across 19 required groups |
| Superseded draft grouping rows | 19 |
| Deferred decisions | 10 |
| Unresolved in-MVP decisions | 0 identified |
| Active decisions with baseline evidence | 29 of 29 |
| Active decisions explicitly approved in this consolidated register | 0 of 29 |
| Blocking gate | Independent reviews and explicit Product Owner approval |

The register is ready for review but is not yet authoritative. Any review finding that changes behavior must update the decision row, traceability record, affected source requirements, and scenarios before approval.

## 6. Revision history

| Version | Date | Author | Summary | Outcome |
| --- | --- | --- | --- | --- |
| 0.1 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Created the validation framework and performed the initial source-consistency pass over SD-071-001–019. | In review |
| 0.2 | August 14, 2026 | Codex with Alexander Wohlford as Product Owner | Recorded the Product Owner's agreement with all review recommendations; validated the 29 replacement decisions for atomicity and separated governance and deferral concerns. | In review; final approval pending |
