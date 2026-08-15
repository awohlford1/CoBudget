# CBD-68 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | Approved |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval, on the evidence of an independent AI-assisted critical audit of Codex-authored drafts by Claude (see §11, RF-68-17–20), consistent with the CBD-67 precedent (CBD-67 traceability record §7) |
| Jira subtask | [CBD-68](https://cobudget.atlassian.net/browse/CBD-68) |
| Parent | [CBD-11](https://cobudget.atlassian.net/browse/CBD-11) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Workflow specification | [CBD-68 workflow specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3735553) |
| Scenario catalog | [CBD-68 scenario catalog](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3342349) |
| Future Feature Register | [CoBudget Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) |
| Last updated | August 13, 2026 |

## 1. Purpose and completion rule

This record demonstrates coverage of CBD-68-AC01 through AC16 and records remaining cross-document review findings. No CBD-68 product decision remains open.

**First Draft complete** means every criterion has specification coverage and scenario evidence or a clearly identified decision dependency. It does not by itself mean the product definition is technically designed, implemented, or tested in executable software.

**Approved** (recorded below in §11) means the Product Owner has reviewed the completed package — original drafts authored by Codex, reviewed by the Product Owner (PD-68-01–17), and audited by an independent AI-assisted critical pass (RF-68-17–20) — and formally approved it as the binding product definition for CBD-68. It does not mean the feature has been technically designed, implemented, or tested in executable software; those remain separate gates (§10).

## 2. Evidence states

| State | Meaning |
| --- | --- |
| Mapped | Explicit specification and invariant references exist. |
| Demonstrated | At least one deterministic scenario shows the rule. |
| Conditional | Coverage exists but a named open decision prevents final expected results. |
| Complete for First Draft | Sufficient for structured product review with no hidden gaps. |
| Complete for Final Draft | Open decisions resolved or explicitly deferred and all outcomes finalized. |
| Formally approved | Product owner/reviewer recorded approval. |
| Implemented and verified | Linked implementation and objective test evidence pass. |

## 3. Acceptance-criteria traceability matrix

| AC | Requirement | Specification evidence | Scenario evidence | Invariants | Parent / epic trace | First-draft result |
| --- | --- | --- | --- | --- | --- | --- |
| AC01 | Paycheck-period start and end rules independent of occurrence exceptions | §§7, 11, 15–17 | PAY-01–02, PAY-04–06, EXC-01–06, PREVIEW-02 | 01, 02, 10, 14, 15, 19–21 | CBD-11-AC07; CBD-1-AC01 | Demonstrated |
| AC02 | One canonical timeline | §§5, 7–8 | PAY-01, PAY-03, MULTI-01, MULTI-04 | 01–03 | CBD-11-AC08; CBD-1-AC01, AC07 | Demonstrated |
| AC03 | Anchor and secondary income behavior | §§8–9 | MULTI-01–04, BIZ-04 | 02, 03, 16 | CBD-11-AC11; CBD-1-AC01 | Demonstrated |
| AC04 | Target, expected, actual, cash, pending, settled, and spending states are distinct | §§2, 4, 6 | MODEL-01–02, MULTI-02, REC-01–03 | 04–08 | CBD-11-AC09; CBD-1-AC01, AC07 | Demonstrated |
| AC05 | Expected income affects neither actual cash nor targets | §§2, 6, 12–13 | MODEL-01–02, REC-04 | 04–06 | CBD-11-AC09, AC10; CBD-1-AC01, AC07 | Demonstrated |
| AC06 | Actual income updates actual reporting without modifying targets or requiring allocation | §§2, 6, 13 | MODEL-01, MULTI-02, REC-01–05 | 04, 06–08 | CBD-11-AC09, AC10; CBD-1-AC01, AC07 | Demonstrated |
| AC07 | Previous-business-day default and alternatives | §10 | BIZ-01–03, PAY-02 | 08, 16, 17 | CBD-11-AC12; CBD-1-AC01 | Demonstrated |
| AC08 | US holiday handling, overrides, and preview | §§10–11, 15 | BIZ-01–05, EXC-01, PREVIEW-01 | 09, 14, 16, 17 | CBD-11-AC12, AC14; CBD-1-AC01 | Demonstrated |
| AC09 | Shift, skip, extra, and amount exceptions modify projections only | §11 | EXC-01–06 | 07, 09, 21 | CBD-11-AC13; CBD-1-AC01 | Demonstrated |
| AC10 | Early, late, missing, unexpected, and different-amount outcomes | §§12–13, 19 | REC-01–13, REC-05A–05B, EXC-05, NOTIFY-07–09 | 05–09 | CBD-11-AC13; CBD-1-AC01 | Demonstrated |
| AC11 | Semimonthly, multiple anchor, duplicate dates, and short months | §§9–10 | SEMI-01–04, BIZ-04 | 16, 17 | CBD-11-AC14; CBD-1-AC01 | Demonstrated |
| AC12 | Bounded fixed-length custom recurrence, indefinite contiguity, editing, and 1–366-day validation | §14 | CUSTOM-01–10, CHANGE-02, CHANGE-06 | 10–15, 19–20 | CBD-11-AC15; CBD-1-AC01 | Demonstrated |
| AC13 | Active changes follow CBD-67 through the cadence-neutral boundary-and-target adapter | §§8, 11, 14–17, 20 | CHANGE-01–07, PREVIEW-01; CBD-67 ADAPT-01–04 | 09, 13–15 | CBD-11-AC16, AC17; CBD-1-AC01, AC07 | Demonstrated; cross-document adapter and permissions reconciled |
| AC14 | Normal and exceptional examples | All behavioral sections | PAY through PREVIEW suites | All applicable | CBD-11-AC18; CBD-1-AC01 | Complete for First Draft |
| AC15 | MVP limitations and deferred automation | §§2–3, 22, 24–25 | MODEL-03 plus dependency list | 18 | CBD-11-AC19; CBD-1-AC06, AC07 | Complete for First Draft |
| AC16 | Sufficient for data, interface, reconciliation, accessible interaction, and deterministic tests while preserving hybrid compatibility | §§15–23 | All scenarios; especially MODEL-03, REC-07–13, LANG-01–02, A11Y-01–05, PREVIEW-01–06 | All | CBD-11-AC20; CBD-1-AC01, AC06, AC07 | Complete for First Draft; final cross-artifact verification remains |

## 4. Required-example traceability

| Jira-required example | Scenario |
| --- | --- |
| Biweekly Friday with no adjustment | PAY-01 |
| Previous-business-day adjustment | BIZ-01 |
| Next-business-day adjustment | BIZ-02 |
| Fifteenth and last day | SEMI-01 |
| Multiple incomes with one anchor | MULTI-01 |
| Secondary income received inside period | MULTI-02 |
| Actual income early or late | REC-02–03 |
| Actual amount differs | REC-03 |
| Shifted, skipped, or extra paycheck | EXC-01–03 |
| Multiple adjusted events on one day | BIZ-04 |
| Valid contiguous custom periods | CUSTOM-01 |
| Invalid gap or overlap | CUSTOM-05–06 |
| Anchor change during active period | CHANGE-01 |

All required examples are present. Several additional cases cover missing anchors, calendar outages, clamping, reconciliation ambiguity, one-day and maximum custom periods, concurrency, atomic failure, and duplicate confirmation.

## 5. Invariant coverage

| Invariant group | Evidence |
| --- | --- |
| Canonical timeline and anchor | PAY-01–03, MULTI-01–04 |
| Target-and-tracking separation | MODEL-01–03, REC-01–05 |
| Projection/actual preservation | REC-01–13, REC-05A–05B |
| Projection-only exceptions versus schedule changes | EXC-01–06 |
| Inclusive, valid, fixed-length, recurring, and open-ended periods | PAY-01, PAY-04–05, CUSTOM-01–10 |
| Historical integrity and concurrency | CHANGE-01–04, PREVIEW-01–03 |
| Same-date identity and deduplication | BIZ-04, SEMI-03 |
| Hybrid compatibility | MODEL-03 |

## 6. Confirmed decisions

| ID | Decision | Evidence/owner | Date |
| --- | --- | --- | --- |
| PD-68-01 | MVP uses target-and-tracking. Income does not fund categories or create an available-to-assign pool. Optional hybrid allocation is deferred and must be non-destructive. | Alexander Wohlford; CBD-68 discussion and Jira alignment | August 12, 2026 |
| PD-68-02 | One canonical budget timeline exists per budget space; exactly one selected income schedule anchors paycheck periods. | CBD-68 Jira AC01–03 | Existing requirement |
| PD-68-03 | Expected and actual values remain separate; actual deposits do not move boundaries automatically. | CBD-68 Jira AC04–10 | Existing requirement |
| PD-68-04 | Active schedule edits inherit CBD-67 effective-date, transition, proration, no-carry-forward, preview, history, and audit rules. Superseded in detail by PD-68-15. | CBD-68 Jira AC13 | Existing requirement |
| PD-68-05 | Federal Reserve Financial Services is the authoritative US banking-holiday source. Use verified versioned local data, block unsupported years, preserve confirmed history, and visibly regenerate affected future projections after corrections. | Alexander Wohlford | August 12, 2026 |
| PD-68-06 | A unique exact date-and-amount match may reconcile automatically. Non-exact candidates within ±5 Federal Reserve business days and ±5% of expected value require user confirmation. Ambiguity never auto-matches; MVP exposes one-to-one reconciliation. | Alexander Wohlford | August 12, 2026 |
| PD-68-07 | Expected income progresses Projected → Expected today → Late → Missing. Late remains in the five-business-day near-term forecast; Missing leaves forward projection but stays in historical expected totals. Skip occurrence is the single reversible non-receipt action. | Alexander Wohlford | August 12, 2026 |
| PD-68-08 | Recurring paycheck schedules generate deterministically on demand; its finite-schedule portion is superseded by PD-68-14. | Alexander Wohlford | August 12, 2026 |
| PD-68-09 | Explicit recurrence is required; its finite/expiration portion is superseded by PD-68-14. | Alexander Wohlford | August 12, 2026 |
| PD-68-14 | Paycheck and custom cadences are bounded, deterministic, recurring, and indefinite until explicitly replaced. Paycheck patterns are limited to common recurring forms; custom cadence uses one fixed length. Finite/expiring schedules and arbitrary period lists are FF-010. | Alexander Wohlford | August 12, 2026 |
| PD-68-15 | Paycheck and custom changes supply deterministic natural boundaries through CBD-67 §8.10. Users explicitly review proposed full-period targets; CBD-67 governs transition and proration mechanics. Supersedes PD-68-04 in detail. | Alexander Wohlford | August 12, 2026 |
| PD-68-16 | Actual-income variance notification occurs only after confirmed reconciliation with a nonzero date or amount difference. No extra materiality threshold applies. Events deduplicate by reconciliation revision; a material correction may create one updated event. | Alexander Wohlford | August 12, 2026 |
| PD-68-17 | Internal domain terms remain precise, while customer-facing content uses plain equivalents. Forms, previews, validation, dynamic states, same-date events, and notification settings have explicit keyboard and screen-reader requirements. | Alexander Wohlford | August 12, 2026 |
| PD-68-10 | Shift, skip, extra, and amount occurrence exceptions modify projected income only and never change canonical boundaries. A boundary change requires an explicit CBD-67 schedule change. | Alexander Wohlford | August 12, 2026 |
| PD-68-11 | Preview lifetime is 30 minutes. Result-affecting dependencies and budget-space local midnight invalidate immediately; display-only changes do not. Draft inputs survive refresh and confirmation is idempotent. | Alexander Wohlford | August 12, 2026 |
| PD-68-12 | Primary Owner, Co-owner, and Collaborator may mutate CBD-68 schedules, projections, and reconciliation links. Viewer is read-only within one current CBD-72 visibility profile and its inherited scope. Accountability Partner is financially read-only across its comprehensive accepted-role resource scope under the fixed CBD-72 field boundary, may create personal firm-alert acknowledgements and attributed comments on supported readable targets, and has no resource-level provisioning. | Alexander Wohlford | August 12, 2026; CBD-72 amendments approved August 15, 2026 |
| PD-68-13 | In-app notification is mandatory for applicable events. Email, push, and SMS are optional and configurable per user and event/category, with consent, privacy, access, and quiet-hour controls. User-defined custom alerts are FF-009. | Alexander Wohlford | August 12, 2026 |

## 7. Open-decision register

No CBD-68 product decisions remain open after the August 12, 2026 major-decision review. Any new conflict or material scope change must receive a new decision ID and traceability review.

## 8. Review findings

| ID | Finding | Severity | Disposition |
| --- | --- | --- | --- |
| RF-68-01 | Earlier drafts assumed envelope-style “available to assign” behavior. | Critical | Resolved by PD-68-01 and Jira consistency updates. |
| RF-68-02 | Holiday behavior lacked provider, provenance, and outage rules. | Major | Resolved by PD-68-05; scenarios corrected to Federal Reserve closure rules. |
| RF-68-03 | Reconciliation lacked match cardinality, tolerances, and correction controls. | Major | Resolved by PD-68-06 and PD-68-12, including matching controls and authorized roles. |
| RF-68-04 | Schedule generation horizon was unspecified. | Major | Resolved by PD-68-08 and PD-68-14: recurring rules generate on demand and remain open-ended until replaced. |
| RF-68-05 | Earlier draft allowed occurrence exceptions to change canonical periods. | Critical | Resolved by PD-68-10; exceptions are projection-only and boundary edits use CBD-67. |
| RF-68-06 | Missing-income lifecycle and forecast reporting were underspecified. | Major | Resolved by PD-68-07 with unified Skip occurrence behavior and separate expected/actual totals. |
| RF-68-07 | Finite schedules created uncovered dates and conflicted with CBD-67 continuity. | Critical | Resolved by PD-68-14: all MVP paycheck/custom schedules are open-ended; finite and arbitrary schedules are FF-010. |
| RF-68-08 | Preview, permissions, and notifications were unresolved. | Major | Resolved by PD-68-11 through PD-68-13. |
| RF-68-09 | Failure, concurrency, and duplicate confirmation were absent from early scenarios. | Major | Addressed by CHANGE-03–04 and PREVIEW-01–03. |
| RF-68-10 | Future hybrid compatibility could encourage speculative envelope implementation. | Moderate | Compatibility constraints specify clean boundaries without premature allocation workflows. |
| RF-68-11 | CBD-67 lacked a cadence-neutral contract for paycheck/custom boundaries and could silently reuse targets across different period sizes. | Critical | Resolved by PD-68-15 and CBD-67 PD-67-09: deterministic boundary adapter, explicit proposed full-period target review, generalized proration inputs, and CHANGE-05–07 / ADAPT-01–04. |
| RF-68-12 | FF-004 broadly deferred income matching and occurrence resolution already governed by PD-68-06/07. | Major | Resolved by narrowing FF-004 to projected bills, pending interaction, complex cardinality/groups, advanced confidence, and additional behavior. CBD-68 remains authoritative for MVP income matching and Late/Missing/Skip. |
| RF-68-13 | Actual-income variance was listed as a notification event without a precise trigger, threshold, or deduplication rule. | Major | Resolved by PD-68-16 and NOTIFY-07–09: confirmed nonzero reconciliation variance only, no extra threshold, revision-based deduplication, and corrected-revision behavior. |
| RF-68-14 | Customer-facing copy exposed internal terms and accessibility requirements were too generic to verify. | Major | Resolved by PD-68-17, vocabulary mapping, representative copy, §21.1, LANG-01–02, and A11Y-01–05. Internal terms remain available for engineering and audit. |

| RF-68-15 | Final audit found incomplete scenario template fields, one invalid custom-scenario range, ambiguous fixture inputs, and misplaced section headings. | Major | Resolved: every scenario now has Evidence/Given/When/Then, the shared dataset fixes the reference year, ambiguous notification/matching cases have explicit inputs, CUSTOM-01–10 is the valid range, and headings are normalized. |

| RF-68-16 | CBD-68 lacked the repository Markdown mirrors required alongside Confluence publication. | Major | Resolved: specification, scenario catalog, and traceability mirrors were created on `codex/cbd-68-documentation` and verified against the published content. |

| RF-68-17 | The specification's own §25 decision register omitted PD-68-02, PD-68-03, and PD-68-04, which appeared only in this record's §6 confirmed-decisions table, and PD-68-04 had been silently superseded in substance by PD-68-15 with no cross-reference in either document. | Moderate | Resolved: PD-68-02–04 added to the spec's §25 decision register with their existing-requirement status, and the PD-68-04/PD-68-15 supersession is now cross-referenced in both documents. |

| RF-68-18 | The traceability matrix's AC12 row omitted CHANGE-06 even though that scenario self-declares AC12 evidence (§4, CHANGE-06 Evidence line). | Minor | Resolved: AC12 row now includes CHANGE-06. |

| RF-68-19 | Core invariants (spec §5) were listed out of numeric sequence: INV-68-21 appeared before INV-68-10, and INV-68-19–20 appeared before INV-68-16. | Minor | Resolved: the invariant table was reordered into ascending numeric sequence; no invariant IDs changed and no cross-reference required an update. |

| RF-68-20 | "Twice per week," one of six supported paycheck patterns (spec §9.3), had no scenario demonstrating actual boundary generation; PAY-04 only lists it as an available choice. | Minor | Resolved: added PAY-06 to the scenario catalog §4, demonstrating alternating 3/4-day periods for a Monday/Thursday pattern; AC01 scenario evidence updated accordingly. |

## 9. Cross-artifact consistency

| Artifact | Required consistency |
| --- | --- |
| CBD-11 | Target-and-tracking terminology and financial-state definitions |
| CBD-67 | Active schedule-change behavior, time-zone semantics, history, proration, and no-carry-forward |
| CBD-69 | Transaction receipt, pending/settled, reconciliation, date classification, and edge-case outcomes |
| CBD-70 | Scenarios must use target, expected income, actual income, cash, pending/settled, and actual-spending states |
| CBD-12 | Final permission matrix and collaboration behavior |
| Future Feature Register | FF-004 is narrowed to advanced/bill/complex matching beyond PD-68-06/07; FF-006 hybrid allocation, FF-009 custom alerts, and FF-010 finite/arbitrary schedules remain deferred |

A material change to any governing rule requires review of this matrix, the workflow specification, and affected scenarios.

## 10. Implementation-readiness evidence

The first draft identifies:

* Domain records and stable identities
* Projected-versus-actual separation
* Anchor and period-generation rules
* Business-day calculation order and provenance
* Exception types and schedule-version behavior
* Custom-period validation formulas and messages
* Preview contents and staleness rules
* Atomic activation and idempotency expectations
* Lifecycle and interface states
* Audit-event distinctions
* Future hybrid compatibility constraints

Technical design must not resolve open product decisions silently. It must return contradictions or gaps for product review.

## 11. Review record

| Review | Reviewer | Date | Outcome |
| --- | --- | --- | --- |
| Initial working-draft assembly | Codex with Alexander Wohlford as owner | August 11, 2026 | Draft package created |
| Budgeting-model decision | Alexander Wohlford | August 12, 2026 | Target-and-tracking adopted; hybrid deferred |
| Comprehensive first-draft audit | Codex | August 12, 2026 | AC01–AC16 mapped; required examples covered; nine decisions prepared for review |
| Major-decision review | Alexander Wohlford | August 12, 2026 | PD-68-01 and PD-68-05 through PD-68-14 confirmed; superseded portions recorded |
| Final traceability verification | Codex with Alexander Wohlford as owner | August 12, 2026 | Completed; scenario template, references, deterministic fixtures, CBD-67 consistency, and downstream dependency drift audited and repaired |
| Independent critical-audit pass (AI-assisted, per the CBD-67 documentation-scope precedent for an AI-assisted critical audit as the independent review pass) | Claude (Anthropic), with Alexander Wohlford as owner | August 13, 2026 | RF-68-17–20 identified and resolved; decision register, traceability matrix, invariant ordering, and scenario coverage corrected; document versions advanced to 0.4 |
| Formal approval (v1.0) | Alexander Wohlford — Product Owner | August 13, 2026 | Approved: original drafts authored by Codex, reviewed and confirmed by the Product Owner (PD-68-01–17), and audited by Claude's independent critical-audit pass (RF-68-17–20), accepted together as sufficient reviewer separation for this documentation-scope subtask — consistent with the CBD-67 precedent (CBD-67 traceability record §6–7). The independent reviewer was an AI system, not a second human. Package promoted to v1.0 Approved. |

## 12. First-draft quality gate

| Check | Result |
| --- | --- |
| All 16 Jira criteria mapped | Passed |
| Every required example represented | Passed |
| Core invariants documented | Passed |
| Target-and-tracking terminology consistent | Passed |
| Future hybrid compatibility captured | Passed |
| Validation and failure behavior represented | Passed |
| Open decisions explicitly identified | Passed |
| Formal product decisions complete | Passed |
| Final expected outcomes for conditional scenarios | Passed; no conditional CBD-68 scenario remains |
| Formal approval | Passed; approved by Alexander Wohlford — Product Owner — on August 13, 2026 (v1.0; see §11) |
| Final cross-artifact and automated-test-convertibility audit | Passed; 86 uniquely identified scenarios use Evidence/Given/When/Then and fixed reference context |
| Repository mirror synchronization | Passed; all three CBD-68 artifacts are mirrored on the working branch |
| Implementation and executable tests | Not started |

## 13. Remaining gates

CBD-68 is Approved as of v1.0 (August 13, 2026). No product-definition content defect remains open. The gates below are separate from documentation approval and are not satisfied by it:

1. Separate technical specification for schedule storage, activation, recovery, period materialization, and observability — requires human review; the AI-assisted-audit concession is scoped to product-documentation approval only.
2. Implementation of the approved product behavior.
3. Executable tests mapped to the 86 scenarios and applicable invariants.
4. Release verification evidence.


