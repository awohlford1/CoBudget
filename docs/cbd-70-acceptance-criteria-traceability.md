# CBD-70 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | Working draft — 75 of 75 scenarios drafted; three technical reviews complete; Product Owner approval pending |
| Document version | 0.10 |
| Owner | Alexander Wohlford |
| Jira subtask | [CBD-70](https://cobudget.atlassian.net/browse/CBD-70) |
| Parent | [CBD-11](https://cobudget.atlassian.net/browse/CBD-11) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Repository baseline | `d7f75f3` |
| Last updated | August 14, 2026 |

## 1. Purpose and completion rule

This record freezes the approved CBD-67 through CBD-69 product-rule baseline used by CBD-70, inventories every governing acceptance criterion, and will map those criteria to the CBD-70 calendar fixtures and deterministic scenarios. It also records the CBD-70 delivery criteria, catalog-governance decisions, review findings, unresolved in-MVP decisions, and approval evidence.

CBD-70 cannot be approved until every governing criterion and every CBD-70 delivery criterion has bidirectional scenario coverage, every required calculation is reproducible, no blocking MVP decision remains unresolved, and all required reviews are complete. Behavior outside MVP receives no scenario.

## 2. Frozen authority baseline

Only the final-approved artifacts in this table may determine CBD-70 expected outcomes. Draft, provisional, superseded, and similarly named unapproved files are excluded.

| Source | Approved artifact | Version | Approval date | Repository file | Criteria |
| --- | --- | ---: | --- | --- | ---: |
| CBD-67 | Weekly and Monthly Budget Cycle Workflow Specification | 1.0 | August 11, 2026 | [Specification](cbd-67-weekly-monthly-cadence-workflow-specification.md) | 19 |
| CBD-67 | Acceptance Criteria Traceability and Review Record | 1.2 | August 11, 2026 | [Traceability](cbd-67-acceptance-criteria-traceability.md) | 19 |
| CBD-68 | Paycheck and Custom Budget Cadence Workflow Specification | 1.0 | August 13, 2026 | [Specification](cbd-68-paycheck-custom-cadence-workflow-specification.md) | 16 |
| CBD-68 | Acceptance Criteria Traceability and Review Record | 1.0 | August 13, 2026 | [Traceability](cbd-68-acceptance-criteria-traceability.md) | 16 |
| CBD-69 | Period Edge Cases and Validation Rule Specification | 1.0 | August 13, 2026 | [Specification](cbd-69-period-edge-cases-validation-rule-specification.md) | 15 |
| CBD-69 | Acceptance Criteria Traceability and Review Record | 1.0 | August 13, 2026 | [Traceability](cbd-69-acceptance-criteria-traceability.md) | 15 |

The unapproved `cbd-69-period-edge-cases-validation-specification.md` file is explicitly non-authoritative for CBD-70.

The frozen baseline contains **50 governing criteria**: 19 from CBD-67, 16 from CBD-68, and 15 from CBD-69. A governing-source revision requires an explicit CBD-70 impact assessment and traceability review before it can change expected outcomes.

## 3. Normalized governing-requirements inventory

The `Planned mapping` label in these inventory tables identifies architecture-level coverage rather than final approval status. All referenced scenarios are now drafted; current draft and approval status is reported in §§4, 7, and 8.

### 3.1 CBD-67 — Weekly and monthly schedules

| Requirement ID | Authoritative requirement summary | Specification evidence | CBD-70 scenarios | Inventory status |
| --- | --- | --- | --- | --- |
| CBD-67-AC01 | Weekly setup documents the Monday default and selection of any weekday anchor. | §§5–6, 19 | PER-W-01, PER-W-02 | Planned mapping |
| CBD-67-AC02 | Initial weekly and monthly onboarding opens the complete current anchored period. | §§5–7 | PER-W-01, PER-M-01, SET-01 | Planned mapping |
| CBD-67-AC03 | Monthly setup supports numbered anchors 1 through 31 and an explicit Last day option. | §6 | PER-M-01–03, SET-02 | Planned mapping |
| CBD-67-AC04 | Missing monthly dates, February, and leap-year cases clamp to the final valid date and return to the selected numbered anchor when possible. | §6 | PER-M-02, PER-M-03, SET-02 | Planned mapping |
| CBD-67-AC05 | Weekly and monthly dates, local-midnight behavior, and previews use the authoritative budget time zone. | §§3, 5–6, 14 | PER-W-01, PER-W-02, TXN-04 | Planned mapping |
| CBD-67-AC06 | Required inputs, validation messages, confirmation behavior, and setup previews showing the current period plus at least the next three periods are documented. | §§5–7, 14, 17 | SET-01, SET-02, VAL-01 | Planned mapping |
| CBD-67-AC07 | Schedule changes require an exact effective date of today or a future date and reject past dates. | §8 | CHG-01–04, CHG-09 | Planned mapping |
| CBD-67-AC08 | Today uses the budget calendar date at local midnight, and the MVP permits only one pending future change per budget. | §§3, 8, 13–14 | CHG-02, CHG-08 | Planned mapping |
| CBD-67-AC09 | A pending change remains visible, editable, and cancelable until execution while the current schedule remains authoritative. | §§4, 8, 13–14 | CHG-02, CHG-06–08, SEC-01 | Planned mapping |
| CBD-67-AC10 | A mid-period change closes the old period through the previous day and creates the defined transition period. | §§8–10 | CHG-01, CHG-02, E2E-01 | Planned mapping |
| CBD-67-AC11 | A boundary-aligned change starts a full period without unnecessary proration. | §§8–10 | CHG-03, CHG-04 | Planned mapping |
| CBD-67-AC12 | Planned category allocations are prorated by included calendar days, while actual transactions and bills are never prorated. | §§9–12, 16 | CHG-01, FIN-01, TYPE-02, E2E-01 | Planned mapping |
| CBD-67-AC13 | Positive remaining amounts stay in the completed or closed period’s history and are not carried into a transition or later period during the MVP. | §§10–11, 13, 19 | HIST-01, FIN-02 | Planned mapping |
| CBD-67-AC14 | Overspending stays in completed or closed period history, no balance is carried forward, and rollover is explicitly deferred. | §§10–11, 13, 19 | HIST-01, FIN-03, ALERT-02 | Planned mapping |
| CBD-67-AC15 | Change previews show the old period, transition period when applicable, first full new period, allocation changes, affected bills, and affected transactions. | §§8–12, 16 | CHG-01–04, FIN-01, TYPE-02, E2E-01 | Planned mapping |
| CBD-67-AC16 | Confirmation explicitly identifies the effective date, new cadence and anchor, and proration result. | §§8–10, 12, 14 | CHG-01–04, FIN-01 | Planned mapping |
| CBD-67-AC17 | Scheduled, edited, canceled, confirmed, and executed changes create auditable records. | §§8, 13–15, 18 | CHG-02, CHG-04, CHG-06, CHG-07, CHG-10, HIST-01, SEC-02, E2E-01 | Planned mapping |
| CBD-67-AC18 | Completed periods retain their dates, planned amounts, actual amounts, and schedule-version references. | §§13, 15, 18 | CHG-10, HIST-01, LATE-01, E2E-01 | Planned mapping |
| CBD-67-AC19 | Examples cover weekly-to-monthly and monthly-to-weekly changes across immediate, future, mid-period, and boundary-aligned cases; deferred rollover and unresolved questions are recorded as follow-up work. | §§19–20 and approved scenario catalog | CHG-01–04, FIN-02, FIN-03 | Planned mapping |

### 3.2 CBD-68 — Paycheck, income, and custom schedules

| Requirement ID | Authoritative requirement summary | Specification evidence | CBD-70 scenarios | Inventory status |
| --- | --- | --- | --- | --- |
| CBD-68-AC01 | Paycheck-period start and end rules are independent of occurrence exceptions. | §§7, 11, 15–17 | PER-PAY-01–03, E2E-02 | Planned mapping |
| CBD-68-AC02 | All income schedules use one canonical budget timeline. | §§5, 7–8 | PER-PAY-01, PER-SEMI-01, PER-MULTI-01, INC-01, E2E-02 | Planned mapping |
| CBD-68-AC03 | Anchor and secondary income schedules have explicit behavior. | §§8–9 | PER-MULTI-01, INC-01, E2E-02 | Planned mapping |
| CBD-68-AC04 | Spending target, expected income, actual income, current cash, pending activity, settled activity, and actual spending remain distinct. | §§2, 4, 6 | FIN-01, INC-01, INC-02, INC-07, E2E-01, E2E-02 | Planned mapping |
| CBD-68-AC05 | Expected income affects neither actual cash nor spending targets. | §§2, 6, 12–13 | INC-02, E2E-01, E2E-02 | Planned mapping |
| CBD-68-AC06 | Actual income updates actual reporting without modifying spending targets or requiring allocation. | §§2, 6, 13 | INC-03, INC-04, INC-06, INC-07, E2E-01, E2E-02 | Planned mapping |
| CBD-68-AC07 | The previous-business-day default and supported alternatives have explicit behavior. | §10 | PER-SEMI-02, INC-08, INC-09, E2E-02 | Planned mapping |
| CBD-68-AC08 | US holiday handling, occurrence overrides, and previews have explicit behavior. | §§10–11, 15 | PER-SEMI-02, PREV-01, INC-08–10, HOL-01, E2E-02 | Planned mapping |
| CBD-68-AC09 | Shift, skip, extra, and amount occurrence exceptions modify projections only. | §11 | PER-PAY-02, INC-04–06, INC-10, VAL-04, E2E-02 | Planned mapping |
| CBD-68-AC10 | Early, late, missing, unexpected, and different-amount income outcomes have explicit behavior. | §§12–13, 19 | INC-03, INC-04, INC-05, INC-06, INC-07, E2E-02 | Planned mapping |
| CBD-68-AC11 | Semimonthly schedules, multiple anchors, duplicate adjusted dates, and short months have explicit behavior. | §§9–10 | PER-SEMI-01, PER-SEMI-02, VAL-04 | Planned mapping |
| CBD-68-AC12 | Custom recurrence is bounded, fixed-length, contiguous indefinitely, editable, and validated at 1–366 days. | §14 | PER-CUST-01, PER-CUST-02, VAL-02, VAL-03 | Planned mapping |
| CBD-68-AC13 | Active schedule changes follow CBD-67 through the cadence-neutral boundary-and-target adapter. | §§8, 11, 14–17, 20 | SET-03, CHG-05, CHG-10, E2E-02 | Planned mapping |
| CBD-68-AC14 | Normal and exceptional examples cover all behavioral sections. | All behavioral sections | PER-PAY-01–03, PER-SEMI-01, PER-SEMI-02, PER-CUST-01, PER-CUST-02, INC-01–10, HOL-01, CHG-05, E2E-02 | Planned mapping |
| CBD-68-AC15 | MVP limitations and deferred automation are explicit. | §§2–3, 22, 24–25 | FIN-02, FIN-03 | Planned mapping |
| CBD-68-AC16 | The product definition is sufficient for data, interface, reconciliation, accessible interaction, and deterministic tests while preserving future hybrid compatibility. | §§15–23 | SET-03, PREV-01, PREV-02, A11Y-01, CHG-05, HOL-01, REC-05, SEC-03, RECOV-01, E2E-01, E2E-02 | Planned mapping |

### 3.3 CBD-69 — Classification, reconciliation, and validation

| Requirement ID | Authoritative requirement summary | Specification evidence | CBD-70 scenarios | Inventory status |
| --- | --- | --- | --- | --- |
| CBD-69-AC01 | Authorization date, posted or settlement date, transaction time, derived budget date, and date-source provenance have distinct definitions. | §§3, 5.1 | TXN-01–04, REP-01, E2E-02 | Planned mapping |
| CBD-69-AC02 | Expenses use the authorization date when available and the posted or settlement date as fallback. | §§5.1, 6 | TXN-01–03, E2E-02 | Planned mapping |
| CBD-69-AC03 | Transaction time is not used for budget-period classification, and a date supplied without a reliable time is used as provided. | §§3, 5.1, 6 | TXN-04, E2E-02 | Planned mapping |
| CBD-69-AC04 | Pending expenses create a visible provisional category impact rather than finalized spending. | §§5.2, 6, 7.1 | TXN-01, REC-01, ALERT-01, E2E-01, E2E-02 | Planned mapping |
| CBD-69-AC05 | Settlement replaces the provisional amount while retaining the authorization-based budget date. | §§6, 7.2 | TXN-01, TXN-02, REC-04, REC-05, AUDIT-01, E2E-01, E2E-02 | Planned mapping |
| CBD-69-AC06 | Missing, changed, removed, unmatched, and duplicate pending or posted transactions have explicit reconciliation behavior. | §§6, 7.1–7.3 | TXN-03, REC-01, REC-02, REC-03, REC-04, REC-05, RECOV-01, ALERT-01, AUDIT-01, E2E-02 | Planned mapping |
| CBD-69-AC07 | Income is counted only when posted, settled, or manually confirmed and never changes budget values automatically. | §§1–3, 5.1, 6, 8 | INC-02–07, E2E-02 | Planned mapping |
| CBD-69-AC08 | Transfers, refunds, bills, and manually entered transactions have explicit classification and date rules. | §§6, 9.1–9.4 | TYPE-01–04, E2E-02 | Planned mapping |
| CBD-69-AC09 | Late-settling activity may adjust an ended period without changing its schedule boundaries or version. | §§6, 10 | HIST-01, TXN-02, LATE-01, ALERT-03, AUDIT-01, E2E-02 | Planned mapping |
| CBD-69-AC10 | Late-adjusted periods and authorization-versus-statement date differences have clear user-facing explanations. | §§10–11 | LATE-01, TYPE-03, ALERT-03, REP-01, E2E-02 | Planned mapping |
| CBD-69-AC11 | Pending activity uses informational warnings, while firm settled overspending and late-adjustment alert behavior is documented for owners, collaborators, and Accountability Partners. | §§3–4, 12 | LATE-01, ALERT-01–04, AUDIT-01, E2E-01, E2E-02 | Planned mapping |
| CBD-69-AC12 | Original dates, date-source provenance, budget-date overrides, permissions, and reconciliation decisions remain auditable. | §§4, 6, 13 | REC-05, OVR-01, TYPE-04, SEC-01–03, ALERT-04, AUDIT-01, E2E-01, E2E-02 | Planned mapping |
| CBD-69-AC13 | The decision matrix covers time zones, daylight-saving behavior, inclusive display boundaries, internal start-inclusive and end-exclusive boundaries, leap years, short months, gaps, overlaps, invalid ranges, duplicate anchors, skipped paydays, and schedule changes. | §§3, 6 | PER-W-02, PER-M-02, PER-M-03, PER-SEMI-02, PER-CUST-02, TXN-04, VAL-02–04, E2E-02 | Planned mapping |
| CBD-69-AC14 | Every edge case identifies the expected period and financial-state impact plus a validation message, customer explanation, or recovery path. | §6 | CHG-09, REC-02, OVR-01, VAL-01–04, SEC-02, SEC-03, RECOV-01, E2E-02 | Planned mapping |
| CBD-69-AC15 | The output is detailed enough to design database fields, interface states, reconciliation logic, reports, alerts, audit events, and automated tests. | §§11–16 | REC-05, SEC-03, RECOV-01, ALERT-04, REP-01, AUDIT-01, E2E-01, E2E-02 | Planned mapping |

## 4. CBD-70 delivery-criteria inventory

This section records the CBD-70 Acceptance Criteria field as updated August 12, 2026 at 23:07:56 America/New_York. These are delivery criteria rather than approved upstream product rules.

| Requirement ID | Delivery requirement | CBD-70 evidence | Status |
| --- | --- | --- | --- |
| CBD-70-AC01 | A standard scenario template is documented and used consistently. | Scenario catalog §5; used by all 75 drafted scenarios | Draft evidence complete |
| CBD-70-AC02 | A fixed reference dataset defines dates, time zone, currency, schedules, income, and category budgets. | [Calendar example set](cbd-70-calendar-example-set.md) §§2–4; scenario catalog §3 | Draft evidence complete |
| CBD-70-AC03 | A traceability matrix maps every confirmed CBD-67 through CBD-69 criterion to scenario coverage. | This record §3; scenario catalog §4 | Planned mapping complete |
| CBD-70-AC04 | Every supported cadence has a normal period-generation example. | PER-W-01, PER-M-01, PER-PAY-01, PER-PAY-03, PER-SEMI-01, PER-MULTI-01, PER-CUST-01; PER-PAY-03 explicitly closes the six-pattern paycheck matrix | Draft evidence complete |
| CBD-70-AC05 | Weekly, monthly, paycheck, semimonthly, multiple-anchor, and custom boundary cases are covered. | PER-W-02, PER-M-02, PER-M-03, PER-PAY-02, PER-SEMI-02, PER-MULTI-01, PER-CUST-02 | Draft evidence complete |
| CBD-70-AC06 | Immediate, future, mid-period, and boundary-aligned schedule changes have exact expected results. | CHG-01–05 | Draft evidence complete |
| CBD-70-AC07 | Proration, MVP no-carry-forward disposition, transition-period targets, and overspending behavior have exact monetary results. | FIN-01–03, CHG-01 | Draft evidence complete |
| CBD-70-AC08 | Multiple-income examples demonstrate one canonical budget timeline with anchor and secondary income schedules. | PER-MULTI-01, INC-01, PREV-01, E2E-01 | Draft evidence complete |
| CBD-70-AC09 | Spending targets, expected income, actual income, current cash position, pending activity, settled activity, and actual spending remain distinct in every applicable example, and income receipt does not fund categories. | INC-01–07, INC-10, AUDIT-01, E2E-01, E2E-02 | Draft evidence complete |
| CBD-70-AC10 | Authorization-date classification, pending settlement, posted-date fallback, reconciliation, and late adjustments are covered. | TXN-01–04, REC-01–05, LATE-01 | Draft evidence complete |
| CBD-70-AC11 | Invalid schedules, gaps, overlaps, duplicate anchors, invalid dates, duration limits, prohibited changes, direct unauthorized requests, and attempts to use occurrence exceptions as boundary edits produce defined responses. | CHG-08, CHG-09, VAL-01–04, SEC-03, ALERT-04 | Draft evidence complete |
| CBD-70-AC12 | Short months, leap years, holidays, business-day adjustments, unavailable holiday years, holiday-source corrections, and daylight-saving cases have explicit results. | PER-W-02, PER-M-02, PER-M-03, PER-SEMI-02, INC-08, INC-09, HOL-01, TXN-04 | Draft evidence complete |
| CBD-70-AC13 | Each scenario defines expected period, budget, projection, transaction, validation, alert, and audit outcomes where applicable. | Scenario catalog §§5.2–5.7; all 75 scenarios drafted | Draft evidence complete |
| CBD-70-AC14 | All dates, state transitions, and calculations are deterministic and reproducible without undocumented assumptions. | Scenario catalog §§3, 5.2–5.7; all 75 scenarios drafted | Draft evidence complete |
| CBD-70-AC15 | Monetary examples follow one documented rounding policy, and proration inputs, formulas, intermediate values, and final results are visible. | Governance D13–D14; calendar example set §3; FIN-01 | Draft evidence complete |
| CBD-70-AC16 | Unresolved or contradictory requirements are explicitly identified and returned for product review rather than resolved through assumptions. | §6; governance D03 and D21; documented TYPE-04 correction | Draft evidence complete |
| CBD-70-AC17 | The catalog is reviewed and approved as sufficiently precise for later conversion into automated tests without changing expected outcomes. | §8; governance D23–D24; three technical reviews complete; Product Owner approval pending | Planned mapping |
| CBD-70-AC18 | Completion requires the scenario catalog, calendar examples, and traceability matrix but does not require application code or automated-test implementation. | This record; [scenario catalog](cbd-70-scenario-catalog.md); [calendar example set](cbd-70-calendar-example-set.md); governance D24 | Draft evidence complete |

## 5. Agreed catalog-governance baseline

| Decision | Agreed rule |
| --- | --- |
| D01 | Approved CBD-68 no-carry-forward behavior is authoritative; positive remainder and overspending remain historical and do not alter later targets. |
| D02 | Unauthorized edit controls are not offered; mutation authorization is rechecked; actual denied mutations are audited without changing state. |
| D03 | Only final-approved governing documents determine expected outcomes. |
| D04 | Governing source versions and the repository baseline are frozen; later revisions require impact review. |
| D05 | Calendars, actors, schedules, periods, categories, income, transactions, bills, and changes use stable fixture IDs. |
| D06 | Each scenario references one reusable baseline, declares its starting state and delta, and does not inherit from another scenario. |
| D07 | Checkpoints are local to a scenario, chronological, exactly dated, and descriptively labeled. |
| D08 | Initial state is complete; uncertainty uses Known, Not provided, Pending, Unresolved match, Not applicable, or Product decision unresolved. |
| D09 | User commands, imported financial events, scheduled events, derived calculations, security events, and administrative events remain distinct. |
| D10 | Event arrival order is explicit; equivalent sequences converge on the same final financial state. |
| D11 | Exact event replays are idempotent and cannot duplicate financial or successful-action state. |
| D12 | Expected outcomes are reported separately for period, schedule, targets, income, cash, transactions, bills, validation, alerts, audit, and non-changes. |
| D13 | Proration follows CBD-67 Approved §10: calculate exact category amounts, sum them, round the exact overall total once using half-up midpoint rounding, then reconcile category cents by descending fractional remainder with stable category ID as the tie-breaker. |
| D14 | Financial scenarios include reproducible reconciliation equations. |
| D15 | Canonical periods use `[startDate, exclusiveEndDate)`; inclusive display ends are derived rather than stored as a second source of truth. |
| D16 | Holiday behavior uses explicit, versioned fixture data rather than a live service. |
| D17 | Fixtures use ISO dates, ISO 8601 date-times, IANA time zones, ISO currency codes, and other locale-independent formats. |
| D18 | Scenarios state both intended changes and protected non-changes. |
| D19 | Coverage uses pairwise selection with targeted full combinations for high-risk interactions. |
| D20 | Each scenario has one primary classification: Normal, Boundary, Failure, Recovery, or End-to-end; optional risk tags may supplement it. |
| D21 | Unresolved in-MVP decisions use stable IDs and block approval when material; behavior outside MVP receives no scenario. |
| D22 | Approval requires complete bidirectional traceability, reproducible fixtures and calculations, exceptional coverage, resolved MVP decisions, and completed reviews. |
| D23 | Review uses separate source/traceability, calendar/calculation, scenario-quality, and Product Owner approval passes. |
| D24 | Authoritative deliverables are structured Markdown; no test code or duplicate machine-readable source is created by CBD-70. |

## 6. Unresolved in-MVP decision register

| ID | Question | Source | Affected requirements | Affected evidence | Owner | Blocking? | Status | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| None | No unresolved in-MVP decision has been identified during requirements inventory. | — | — | — | Product Owner | — | Current | — |

Legacy CBD-70 description text requesting accepted and declined positive rollover is superseded by CBD-68 Approved v1.0, CBD-67-AC13/14, current CBD-70-AC07, and governance decision D01. It is a source-maintenance correction, not an unresolved product decision.

The earlier architecture title for TYPE-04 proposed reconciling a manually entered expense to later imported activity, behavior not defined by the final-approved CBD-69 specification. Under D03 and D21 it was replaced with the approved EC-69-11 behavior: a manual expense uses its user-selected date and has no institution pending stage. No unsupported scenario remains and no in-MVP decision was inferred.

## 7. Coverage roll-up

| Measure | Count | Status |
| --- | ---: | --- |
| Frozen approved source artifacts | 6 | Complete |
| CBD-67 governing criteria inventoried | 19 of 19 | Complete |
| CBD-68 governing criteria inventoried | 16 of 16 | Complete |
| CBD-69 governing criteria inventoried | 15 of 15 | Complete |
| Total governing criteria inventoried | 50 of 50 | Complete |
| CBD-70 delivery criteria inventoried | 18 of 18 | Complete |
| Governing criteria mapped to planned CBD-70 scenarios | 50 of 50 | Complete for architecture |
| Planned CBD-70 scenarios | 75 | Architecture complete after review-driven expansion |
| Drafted CBD-70 scenarios | 75 of 75 | All six families complete; three technical reviews complete |
| Planned reusable calendars | 21 | All 21 fixtures defined and calendar/calculation review complete |
| CBD-70 delivery criteria mapped to planned evidence | 18 of 18 | Complete for architecture |
| CBD-70 delivery criteria with final evidence | 0 of 18 | Technical reviews complete; Product Owner approval pending |
| Blocking in-MVP decisions | 0 identified | Confirmed by the three completed technical reviews |

## 8. Review and revision record

### 8.1 Required review passes

| Review | Reviewer | Status | Findings |
| --- | --- | --- | --- |
| Source and traceability review | Codex | Complete | All 50 approved governing criteria and 18 CBD-70 delivery criteria remain mapped. Review gaps were resolved with PREV-01–02, A11Y-01, SEC-03, ALERT-04, AUDIT-01, and updated source mappings. |
| Calendar and calculation review | Codex | Complete | All 21 calendar IDs resolve; intervals, offsets, chronology, monetary calculations, holiday versions, unsupported-year behavior, and six supported paycheck patterns were verified. Two stale reverse references were removed. |
| Scenario-quality review | Codex | Complete | Review expanded the catalog from 66 to 75 scenarios and resolved preview freshness/atomicity, accessibility, amount-only override, holiday correction, permission, partner-alert, audit-chain, report/export, deterministic wording, and exact-baseline findings. |
| Product Owner approval | Alexander Wohlford | Not started | — |

### 8.2 Draft-completion checks

These mechanical checks support, but do not replace, the four required human review passes.

| Check | Result | Evidence |
| --- | --- | --- |
| Scenario identity and count | Passed | Registry and detailed sections contain the same 75 unique IDs and titles; all 75 registry rows are Drafted. |
| Template completeness | Passed | All 75 scenarios contain classification, authority, fixture, starting state, chronological checkpoints, applicable outcome layers, and Given/When/Then wording. |
| Calendar identity and count | Passed | The calendar set contains 21 unique fixtures, every catalog `CAL-*` reference resolves, and no defined fixture is orphaned. |
| Date, interval, and chronology consistency | Passed | All 848 ISO-date occurrences parse, all 75 checkpoint sequences are chronological, and 203 interval examples were checked. Every authoritative interval has increasing start/exclusive-end dates; the one reversed interval is the explicitly rejected VAL-02 failure input. |
| Time-zone and daylight-saving consistency | Passed | All 247 explicit date-time occurrences use a valid America/New_York offset, including both valid offsets for the repeated fall-back time. |
| Monetary arithmetic and reconciliation | Passed | Proration, residual-cent allocation, target totals, income variance, cash, late settlement, and overage equations reproduce the documented results. |
| Markdown and link integrity | Passed | Tables have consistent column structure, local Markdown links resolve, ISO dates are valid, and no trailing whitespace was found. |

### 8.3 Revision history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 0.10 | August 14, 2026 | Codex with Alexander Wohlford as owner | Recorded the full source/traceability, calendar/calculation, and scenario-quality review; resolved all identified findings by expanding to 75 scenarios and 21 calendars; refreshed bidirectional mappings, deterministic checks, and evidence counts. Product Owner approval remains pending. |
| 0.9 | August 13, 2026 | Codex with Alexander Wohlford as owner | Recorded complete drafts for ALERT-01–03, REP-01, and E2E-01–02; updated all CBD-70 draft-evidence mappings and added the draft-completion check record. Required reviews and Product Owner approval remain pending. |
| 0.8 | August 13, 2026 | Codex with Alexander Wohlford as owner | Recorded complete drafts for VAL-01–04, SEC-01–02, and RECOV-01, completing validation, prohibited-boundary, permission-recheck, denied-action audit, and recoverable bank-data evidence. |
| 0.7 | August 13, 2026 | Codex with Alexander Wohlford as owner | Recorded complete drafts for TXN-01–04, REC-01–05, LATE-01, OVR-01, and TYPE-01–04, completing transaction/reconciliation and DST/date-classification evidence. Corrected TYPE-04 to the final-approved manual-entry rule instead of inventing unsupported manual-to-import reconciliation. |
| 0.6 | August 13, 2026 | Codex with Alexander Wohlford as owner | Recorded complete drafts for FIN-01–03 and INC-01–09, including exact proration and no-carry-forward results, distinct projection/actual/cash layers, income exceptions and reconciliation, and holiday-policy evidence. |
| 0.5 | August 13, 2026 | Codex with Alexander Wohlford as owner | Recorded complete drafts for SET-01–03, CHG-01–10, and HIST-01, including both change directions and all immediate/future/mid-period/boundary-aligned outcomes. |
| 0.4 | August 13, 2026 | Codex with Alexander Wohlford as owner | Recorded complete draft evidence for the 12 period-generation scenarios and updated CBD-70 delivery-criterion progress. |
| 0.3 | August 13, 2026 | Codex with Alexander Wohlford as owner | Defined and linked all 20 reusable calendar fixtures, including fixed intervals, holiday provenance, schedule transitions, custom limits, date-classification boundaries, and event timelines. Corrected D13 to match the approved CBD-67 overall-total and largest-remainder rounding rule. |
| 0.2 | August 13, 2026 | Codex with Alexander Wohlford as owner | Grouped the governing requirements into six families, mapped all 50 criteria to 66 planned scenarios, mapped all 18 CBD-70 criteria to planned evidence, and linked the new scenario-catalog architecture. |
| 0.1 | August 13, 2026 | Codex with Alexander Wohlford as owner | Froze the approved source baseline, inventoried all 50 CBD-67 through CBD-69 governing criteria and all 18 CBD-70 delivery criteria, and recorded the 24 agreed catalog-governance decisions. |
