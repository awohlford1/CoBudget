# CBD-67 — Weekly and Monthly Cadence Scenario Catalog

| Field | Value |
| --- | --- |
| Status | Approved |
| Document version | 1.5 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval, on the evidence of an independent AI-assisted audit of Codex-authored drafts (see traceability record §6 and RF-07) |
| Jira | [CBD-67](https://cobudget.atlassian.net/browse/CBD-67) |
| Governing specification | [CBD-67 — Weekly and Monthly Budget Cycle Workflow Specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/655361) |
| Traceability | [CBD-67 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/720897) |
| Last updated | August 12, 2026 |

## 1. Purpose and conventions

This catalog provides deterministic, human-reviewable examples of the product behavior defined in the governing CBD-67 specification. It supports product review, interface examples, implementation fixtures, acceptance testing, and automated regression coverage.

The governing specification remains authoritative. A scenario demonstrates a rule but does not create, override, narrow, or expand one. If a scenario conflicts with the specification, correct the scenario and review the affected traceability.

**Coverage depth.** This catalog uses two intentional levels of depth. Complex or novel behavior — initial setup, cross-cadence changes, and proration — is demonstrated with fully worked fixtures using concrete dates, amounts, and Given/When/Then structure (21 scenario IDs: SCN-W-01–02, SCN-M-01–05, SCN-C-01–05, CALC-01, FIN-01–03, PERM-01–03, A11Y-01, SCOPE-01). Simpler or highly repetitive behavior — validation messages, lifecycle transitions, recovery outcomes, and historical-integrity rules — is captured as compact one-row assertion tables rather than full narrative fixtures (40 scenario IDs: LIFE-01–06, ADAPT-01–04, FIN-04, REC-01–05, HIST-01–04, ERR-01–20). Both levels are binding acceptance evidence; the compact-table format is a density choice reflecting the underlying test-fixture role, not a placeholder for missing content.

### 1.1 Scenario types

| Prefix | Type |
| --- | --- |
| SCN-W | Weekly initial-setup fixture |
| SCN-M | Monthly initial-setup fixture |
| SCN-C | Cross-cadence change fixture |
| CALC | Proration and rounding fixture |
| LIFE | Pending-change and transition lifecycle |
| FIN | Financial presentation and preview behavior |
| PERM | Roles, permissions, and masking |
| REC | Concurrency, recovery, and definitive outcomes |
| HIST | History, audit, and domain integrity |
| A11Y | Accessibility behavior |
| SCOPE | MVP exclusion boundary |
| ERR | Validation, conflict, stale-state, or failure case |

### 1.2 Date and time-zone conventions

* All period start and end dates are inclusive.
* The Gregorian calendar is used.
* Every fixture states the year explicitly.
* The named budget-space time zone is authoritative.
* “Today” means the budget-space calendar date, independent of the viewer’s device date or time zone.
* Local midnight is determined from the budget’s named time zone and the rules applicable on that date.
* Transaction categorization uses each item’s authoritative budget date, not its timestamp.
* Unless a scenario says otherwise, the budget time zone is **America/New_York**.
* Setup and change previews are evaluated from controlled dates; tests must not use the executing machine’s clock or time zone.

### 1.3 Amount and calculation conventions

* Unless stated otherwise, the budget currency is USD with two fractional digits.
* Zero and positive base planned allocations are valid; negative base planned allocations are rejected.
* Weekly transition proration is base allocation multiplied by included transition days divided by 7.
* Monthly transition proration is base allocation multiplied by included transition days divided by the actual days in the applicable anchored month.
* Calculations retain sufficient internal precision before currency rounding.
* The overall prorated target uses half-up rounding to the currency precision.
* Category results reconcile to that target using largest fractional remainder.
* Equal fractional remainders are resolved by stable category identity, never category label or display order.
* Actual transactions, pending transactions, projected bills, and projected income are never prorated.
* Estimated projected amounts use italic presentation with a leading tilde, such as _\\\~$50.00_.
* An aggregate containing an estimated amount is displayed as approximate.
* An item with no usable amount is displayed when otherwise appropriate but contributes nothing to totals.

### 1.4 Identity and state conventions

* Initial creation produces schedule version 1 only when the budget and schedule become authoritative together.
* A confirmed future change has a stable pending-change identity but no future schedule version.
* A new schedule version is created only when the configuration becomes authoritative.
* Previews and unconfirmed proposals are transient.
* A compact confirmation record preserves the material facts reviewed at confirmation.
* Completed period boundaries, planned allocations, and schedule-version references do not change.
* Post-close financial adjustments update historical actuals through audited append-only behavior.

## 2. Scenario coverage matrix

AC references below mean CBD-67-AC01 through CBD-67-AC19.

| Scenario ID | Cadence or behavior | Timing | Boundary or state | Primary ACs | Status |
| --- | --- | --- | --- | --- | --- |
| SCN-W-01 | Weekly setup, Monday default | Setup | Natural | AC01, AC02, AC05, AC06 | Defined |
| SCN-W-02 | Weekly setup, Thursday | Setup | Natural | AC01, AC02, AC05, AC06 | Defined |
| SCN-M-01 | Monthly setup, default 1st | Setup | Natural | AC02, AC03, AC05, AC06 | Defined |
| SCN-M-02 | Monthly setup, 31st across short months | Setup | Clamp | AC02–AC06 | Defined |
| SCN-M-03 | Monthly setup, explicit Last day | Setup | Last-day rule | AC02–AC06 | Defined |
| SCN-M-04 | Monthly setup, 31st in leap-year February | Setup | Leap-year clamp | AC02–AC06 | Defined |
| SCN-M-05 | Monthly setup, numbered 15th | Setup | Natural | AC02, AC03, AC05, AC06 | Defined |
| SCN-C-01 | Weekly Monday to monthly 1st | Immediate | Mid-period | AC07, AC08, AC10, AC12, AC15–AC17, AC19 | Defined |
| SCN-C-02 | Weekly Saturday to monthly 1st | Future | Boundary-aligned | AC07–AC09, AC11, AC12, AC15–AC17, AC19 | Defined |
| SCN-C-03 | Monthly 1st to weekly Monday | Immediate | Boundary-aligned | AC07, AC08, AC11, AC12, AC15–AC17, AC19 | Defined |
| SCN-C-04 | Monthly 1st to weekly Monday | Future | Mid-period | AC07–AC10, AC12, AC15–AC17, AC19 | Defined |
| SCN-C-05 | Monthly 1st to weekly Monday on June 17 | Immediate | Mid-period reference fixture | AC07, AC08, AC10, AC12, AC15–AC17, AC19 | Defined |
| CALC-01 | Weekly largest-remainder tie | Immediate or future | Five-day transition | AC12 | Defined |
| LIFE-01 | Create and view one future pending change | Future | Pending | AC08, AC09, AC17 | Defined |
| LIFE-02 | Edit and confirm a pending revision | Future | Pending revision | AC09, AC17 | Defined |
| LIFE-03 | Abandon pending revision | Future | Unconfirmed revision | AC09 | Defined |
| LIFE-04 | Cancel pending change | Future | Canceled | AC09, AC17 | Defined |
| LIFE-05 | Edit base allocations during active transition | Active transition | Choice required | AC12 | Defined |
| LIFE-06 | Edit base allocations after transition | Completed transition | Normal edit | AC12 | Defined |
| FIN-01 | Authorized proposed-period financial picture | Preview | Current preview | AC12, AC15 | Defined |
| FIN-02 | Reliable transaction-to-projection match | Preview | Matched item | AC15 | Defined |
| FIN-03 | Multiple recurring occurrences | Preview | Unmatched projections | AC15 | Defined |
| FIN-04 | Stale synchronization | Preview | Informational or blocking | AC15 | Defined |
| PERM-01 | Role and provisioned-access matrix | All | Permission states | AC09, AC15 | Defined |
| PERM-02 | Permission lost during workflow | Open workflow | Authorization changed | AC09 | Defined |
| PERM-03 | Accountability Partner history visibility | Pending and history | Read-only | AC09, AC18 | Defined |
| REC-01 | Concurrent confirmation | Immediate or future | Same version | AC17 | Defined |
| REC-02 | Response lost after commit | Any operation | Recovery | AC17 | Defined |
| REC-03 | Interruption before commit | Any operation | Recovery | AC17 | Defined |
| REC-04 | Definitive future-execution failure | Effective date | Failed | AC17 | Defined |
| REC-05 | Integrity recovery | Active budget | Read-only outage | AC17, AC18 | Defined |
| HIST-01 | Pending change has no schedule version | Future | Pending | AC09, AC17 | Defined |
| HIST-02 | Completed period and post-close adjustment | Historical | Immutable boundary | AC17, AC18 | Defined |
| HIST-03 | Canonical transaction across budgets | Historical and current | Budget assignments | AC18 | Defined |
| HIST-04 | Stable category identity and rule context | Historical | Rename and archive | AC18 | Defined |
| A11Y-01 | Keyboard, errors, focus, and status announcements | All | Accessible interaction | AC06 | Defined |
| SCOPE-01 | Excluded MVP functionality remains unavailable | All | Scope boundary | AC13, AC14, AC19 | Defined |

### 2.1 Acceptance-criterion coverage

| Acceptance criterion | Catalog coverage |
| --- | --- |
| CBD-67-AC01 | SCN-W-01, SCN-W-02 |
| CBD-67-AC02 | SCN-W-01, SCN-W-02, SCN-M-01–SCN-M-05 |
| CBD-67-AC03 | SCN-M-01–SCN-M-05 |
| CBD-67-AC04 | SCN-M-02, SCN-M-03, SCN-M-04 |
| CBD-67-AC05 | SCN-W-01, SCN-W-02, SCN-M-01–SCN-M-05, ERR-09–ERR-12, Section 12.1 |
| CBD-67-AC06 | SCN-W-01, SCN-W-02, SCN-M-01–SCN-M-05, ERR-03–ERR-12, A11Y-01 |
| CBD-67-AC07 | SCN-C-01–SCN-C-05, ERR-01, ERR-14 |
| CBD-67-AC08 | SCN-C-01–SCN-C-05, LIFE-01, ERR-02 |
| CBD-67-AC09 | SCN-C-02, SCN-C-04, LIFE-01–LIFE-04, PERM-01–PERM-03, HIST-01 |
| CBD-67-AC10 | SCN-C-01, SCN-C-04, SCN-C-05 |
| CBD-67-AC11 | SCN-C-02, SCN-C-03 |
| CBD-67-AC12 | SCN-C-01–SCN-C-05, CALC-01, LIFE-05, LIFE-06, FIN-01, Section 12.2 |
| CBD-67-AC13 | HIST-02, SCOPE-01 |
| CBD-67-AC14 | HIST-02, SCOPE-01 |
| CBD-67-AC15 | SCN-C-01–SCN-C-05, FIN-01–FIN-04, PERM-01 |
| CBD-67-AC16 | SCN-C-01–SCN-C-05 |
| CBD-67-AC17 | SCN-C-01–SCN-C-05, LIFE-01, LIFE-02, LIFE-04, REC-01–REC-05, HIST-01, HIST-02 |
| CBD-67-AC18 | HIST-02–HIST-04, PERM-03, REC-05 |
| CBD-67-AC19 | SCN-W-01, SCN-W-02, SCN-M-01–SCN-M-05, SCN-C-01–SCN-C-05, SCOPE-01, Section 13 |

## 3. Initial schedule setup fixtures

### 3.1 Common setup contract

Unless a fixture overrides a value:

**Given**

* The actor is the primary Owner and is authorized to create a budget.
* The user may have linked accounts in a financial profile, but no account is yet assigned to the proposed budget.
* No persistent budget, authoritative schedule, budget period, category, allocation, bill, income schedule, goal, transaction assignment, or schedule version exists.
* The proposed budget name is **Household Budget**.
* The selected time zone is **America/New_York** from the supported named-time-zone list.

**When**

1. The Owner starts budget creation.
2. The Owner reviews or changes cadence, anchor, name, and time zone.
3. The product generates the complete current anchored period plus the next three complete periods.
4. The Owner selects **Create budget**.

**Expected confirmation content**

* Budget name.
* Named budget time zone.
* Weekly or monthly cadence.
* Persisted anchor rule.
* Complete current-period dates.
* Next natural boundary.
* The following three complete period date ranges.
* A clear statement that the budget and initial schedule will be created together.

**Then**

* The budget, initial authoritative schedule, schedule version 1, and complete current active period become authoritative as one user-visible outcome.
* No partial budget exists if creation fails.
* The active period is the complete anchored period containing the controlled budget date; it does not begin on the creation date unless that date is the anchor.
* Account selection and all period-dependent setup become available only after success.
* The optional setup wizard may launch with skippable steps for accounts, categories, spending targets, bills, and income schedules.
* One Schedule created audit event identifies the actor, cadence, anchor, time zone, period boundaries, version, confirmation time, and request identity.

### SCN-W-01 — Weekly setup using the Monday default

**Acceptance criteria:** CBD-67-AC01, AC02, AC05, AC06

**Controlled input**

| Input | Value |
| --- | --- |
| Budget date | Tuesday, August 11, 2026 |
| Cadence | Weekly |
| Anchor | Monday, retained without reopening the control |
| Time zone | America/New_York |

**Expected preview**

| Period | Start | End | Length | Notes |
| --- | --- | --- | --- | --- |
| Current | August 10, 2026 | August 16, 2026 | 7 days | Complete anchored week |
| Next 1 | August 17, 2026 | August 23, 2026 | 7 days | Complete |
| Next 2 | August 24, 2026 | August 30, 2026 | 7 days | Complete |
| Next 3 | August 31, 2026 | September 6, 2026 | 7 days | Complete |

**Assertions**

* Monday is valid by default and requires no warning, reselection, or acknowledgement.
* The preview visibly identifies Weekly, Monday, and all four periods.
* Version 1 persists Monday.
* The active period is August 10–16, not August 11–16.

### SCN-W-02 — Weekly setup using Thursday

**Acceptance criteria:** CBD-67-AC01, AC02, AC05, AC06

| Input | Value |
| --- | --- |
| Budget date | Tuesday, August 11, 2026 |
| Cadence | Weekly |
| Anchor | Thursday |
| Time zone | America/New_York |

| Period | Start | End | Length |
| --- | --- | --- | --- |
| Current | August 6, 2026 | August 12, 2026 | 7 days |
| Next 1 | August 13, 2026 | August 19, 2026 | 7 days |
| Next 2 | August 20, 2026 | August 26, 2026 | 7 days |
| Next 3 | August 27, 2026 | September 2, 2026 | 7 days |

**Assertions**

* Any weekday is selectable.
* Version 1 persists Thursday.
* The active period is complete and includes dates before budget creation.

### SCN-M-01 — Monthly setup using the default 1st

**Acceptance criteria:** CBD-67-AC02, AC03, AC05, AC06

| Input | Value |
| --- | --- |
| Budget date | Tuesday, August 11, 2026 |
| Cadence | Monthly |
| Anchor | 1st, retained as the default |
| Time zone | America/New_York |

| Period | Start | End | Length |
| --- | --- | --- | --- |
| Current | August 1, 2026 | August 31, 2026 | 31 days |
| Next 1 | September 1, 2026 | September 30, 2026 | 30 days |
| Next 2 | October 1, 2026 | October 31, 2026 | 31 days |
| Next 3 | November 1, 2026 | November 30, 2026 | 30 days |

**Assertions**

* The 1st is valid by default with no warning or acknowledgement.
* The current period begins August 1, not August 11.
* Version 1 persists the numbered anchor 1st.

### SCN-M-02 — Monthly 31st across short months

**Acceptance criteria:** CBD-67-AC02–AC06

| Input | Value |
| --- | --- |
| Budget date | Tuesday, February 10, 2026 |
| Cadence | Monthly |
| Anchor | 31st |
| Time zone | America/New_York |

| Period | Start | End | Length | Notes |
| --- | --- | --- | --- | --- |
| Current | January 31, 2026 | February 27, 2026 | 28 days | Next boundary clamps to February 28 |
| Next 1 | February 28, 2026 | March 30, 2026 | 31 days | February clamp; persisted anchor remains 31st |
| Next 2 | March 31, 2026 | April 29, 2026 | 30 days | Returns to 31st |
| Next 3 | April 30, 2026 | May 30, 2026 | 31 days | April clamps to 30th |

**Assertions**

* The helper text explains that a missing 31st uses the month’s final valid day.
* The selected rule remains 31st in confirmation, version, history, and audit.
* No warning or acknowledgement is required.
* The March boundary returns to March 31.

### SCN-M-03 — Monthly explicit Last day

**Acceptance criteria:** CBD-67-AC02–AC06

| Input | Value |
| --- | --- |
| Budget date | Tuesday, February 10, 2026 |
| Cadence | Monthly |
| Anchor | Last day |
| Time zone | America/New_York |

| Period | Start | End | Length | Notes |
| --- | --- | --- | --- | --- |
| Current | January 31, 2026 | February 27, 2026 | 28 days | Next start is February’s actual last day |
| Next 1 | February 28, 2026 | March 30, 2026 | 31 days | Last-day rule |
| Next 2 | March 31, 2026 | April 29, 2026 | 30 days | Last-day rule |
| Next 3 | April 30, 2026 | May 30, 2026 | 31 days | Next boundary is May 31 |

**Assertions**

* Last day is stored and displayed as a rule distinct from 31st.
* The product does not imply that Last day and clamped 31st currently generate different dates.
* No warning or acknowledgement is required.

### SCN-M-04 — Monthly 31st in leap-year February

**Acceptance criteria:** CBD-67-AC02–AC06

| Input | Value |
| --- | --- |
| Budget date | Thursday, February 10, 2028 |
| Cadence | Monthly |
| Anchor | 31st |
| Time zone | America/New_York |

| Period | Start | End | Length |
| --- | --- | --- | --- |
| Current | January 31, 2028 | February 28, 2028 | 29 days |
| Next 1 | February 29, 2028 | March 30, 2028 | 31 days |
| Next 2 | March 31, 2028 | April 29, 2028 | 30 days |
| Next 3 | April 30, 2028 | May 30, 2028 | 31 days |

**Assertions**

* Leap-year February clamps to February 29.
* The persisted rule remains 31st.
* March resumes on the 31st.

### SCN-M-05 — Monthly numbered 15th

**Acceptance criteria:** CBD-67-AC02, AC03, AC05, AC06

| Input | Value |
| --- | --- |
| Budget date | Tuesday, August 11, 2026 |
| Cadence | Monthly |
| Anchor | 15th |
| Time zone | America/New_York |

| Period | Start | End | Length |
| --- | --- | --- | --- |
| Current | July 15, 2026 | August 14, 2026 | 31 days |
| Next 1 | August 15, 2026 | September 14, 2026 | 31 days |
| Next 2 | September 15, 2026 | October 14, 2026 | 30 days |
| Next 3 | October 15, 2026 | November 14, 2026 | 31 days |

**Assertions**

* A numbered anchor does not need to align to the first day of a calendar month.
* Each period ends the day before the next generated 15th.

## 4. Cross-cadence change fixtures

### 4.1 Common change-preview and confirmation contract

Unless a fixture states otherwise:

* The actor is an Owner with full financial visibility.
* The current schedule and any pending change remain visually separate from the unconfirmed proposal.
* A changed cadence, anchor, or effective date invalidates the previous preview.
* The preview shows the old-period closing date, any transition, and the first three complete new periods.
* Proposed-period details include all authorized known items through the visible horizon.
* Per-period totals remain separated into planned allocations, transactions, unmatched projected bills, and unmatched projected income.
* The preview does not show old-schedule financial totals, an aggregate affected amount, or a combined net-impact figure.
* Final review repeats the exact schedule timeline and authorized proposed financial picture.
* Final review explicitly identifies the effective date, proposed cadence and anchor, and either the calculated proration result or the boundary-aligned statement that no proration applies.
* The shortened old period shows its original dates and proposed closing date but no itemized financial details or monetary totals. Financial details and totals begin with the transition or first new-schedule period.
* **Apply schedule change** is used for the current budget date.
* **Schedule change** is used for a later exact date.
* No checkbox, typed phrase, warning acknowledgement, or second confirmation dialog is required.
* Positive remaining amounts and overspending remain historical; no rollover or carry-forward occurs.
* A compact immutable confirmation record is created.
* All authoritative effects and audit records commit atomically and idempotently.

### SCN-C-01 — Immediate weekly-to-monthly mid-period transition

**Acceptance criteria:** CBD-67-AC07, AC08, AC10, AC12, AC15–AC17, AC19

**Given**

| Input | Value |
| --- | --- |
| Budget date | Wednesday, July 15, 2026 |
| Current schedule | Weekly, Monday |
| Current old-schedule period | July 13–19, 2026 |
| Proposed schedule | Monthly, 1st |
| Effective date | July 15, 2026 |
| New monthly base allocations | Housing $1,550.00; Food $620.00; Transport $310.00 |
| New monthly base total | $2,480.00 |

**Expected timeline**

| Segment | Start | End | Days | Allocation result |
| --- | --- | --- | --- | --- |
| Shortened old weekly period | July 13 | July 14 | 2 | Old version; preview shows closure but no old financial total |
| Monthly transition | July 15 | July 31 | 17 of 31 | Housing $850.00; Food $340.00; Transport $170.00; total $1,360.00 |
| Full monthly period 1 | August 1 | August 31 | 31 | Full $2,480.00 |
| Full monthly period 2 | September 1 | September 30 | 30 | Full $2,480.00 |
| Full monthly period 3 | October 1 | October 31 | 31 | Full $2,480.00 |

**Assertions**

* The new schedule is not backdated to July 1.
* The entire July 15 budget date uses the new schedule, including items received before confirmation but dated July 15.
* Items dated July 14 or earlier remain under the old schedule.
* The old weekly version ends July 14.
* One new schedule version begins July 15.
* No pending future change remains.

### SCN-C-02 — Future weekly-to-monthly boundary-aligned change

**Acceptance criteria:** CBD-67-AC07–AC09, AC11, AC12, AC15–AC17, AC19

**Given**

| Input | Value |
| --- | --- |
| Budget date when confirmed | Wednesday, July 15, 2026 |
| Current schedule | Weekly, Saturday |
| Proposed schedule | Monthly, 1st |
| Effective date | Saturday, August 1, 2026 |
| New monthly base total | $2,480.00 |

**Expected before execution**

* One pending change is created.
* The current weekly schedule remains authoritative.
* No future schedule version is created.
* The pending summary shows Monthly, 1st, August 1, time zone, boundary-aligned result, confirmation time, and current-impact estimate.
* The final review states: **Period amounts may update before this schedule change takes effect.**

**Expected execution timeline**

| Segment | Start | End | Result |
| --- | --- | --- | --- |
| Last old weekly period | July 25 | July 31 | Complete old period |
| First new monthly period | August 1 | August 31 | Full $2,480.00; no transition |
| Full monthly period 2 | September 1 | September 30 | Full $2,480.00 |
| Full monthly period 3 | October 1 | October 31 | Full $2,480.00 |

**Assertions**

* August 1 is a natural boundary under both schedules.
* No transition or proration is created.
* Execution occurs from the effective budget date without requiring a user session.
* Exactly one new version and one execution outcome are created.

### SCN-C-03 — Immediate monthly-to-weekly boundary-aligned change

**Acceptance criteria:** CBD-67-AC07, AC08, AC11, AC12, AC15–AC17, AC19

| Input | Value |
| --- | --- |
| Budget date | Monday, June 1, 2026 |
| Current schedule | Monthly, 1st |
| Proposed schedule | Weekly, Monday |
| Effective date | June 1, 2026 |
| New weekly base allocations | Housing $350.00; Food $140.00; Transport $70.00 |
| New weekly base total | $560.00 |

| Segment | Start | End | Result |
| --- | --- | --- | --- |
| Last old monthly period | May 1 | May 31 | Complete old period |
| First new weekly period | June 1 | June 7 | Full $560.00 |
| Full weekly period 2 | June 8 | June 14 | Full $560.00 |
| Full weekly period 3 | June 15 | June 21 | Full $560.00 |

**Assertions**

* June 1 is a natural Monday boundary.
* No transition or proration occurs.
* The old schedule ends May 31 and the new version begins June 1.

### SCN-C-04 — Future monthly-to-weekly mid-period change

**Acceptance criteria:** CBD-67-AC07–AC10, AC12, AC15–AC17, AC19

| Input | Value |
| --- | --- |
| Budget date when confirmed | Wednesday, June 10, 2026 |
| Current schedule | Monthly, 1st |
| Current period | June 1–30, 2026 |
| Proposed schedule | Weekly, Monday |
| Effective date | Wednesday, June 17, 2026 |
| New weekly base allocations | Housing $350.00; Food $140.00; Transport $70.00 |
| New weekly base total | $560.00 |

| Segment after execution | Start | End | Days | Result |
| --- | --- | --- | --- | --- |
| Shortened old monthly period | June 1 | June 16 | 16 | Old version |
| Weekly transition | June 17 | June 21 | 5 of 7 | Housing $250.00; Food $100.00; Transport $50.00; total $400.00 |
| Full weekly period 1 | June 22 | June 28 | 7 | Full $560.00 |
| Full weekly period 2 | June 29 | July 5 | 7 | Full $560.00 |
| Full weekly period 3 | July 6 | July 12 | 7 | Full $560.00 |

**Assertions**

* Confirmation creates a pending change but no future version.
* Before June 17, the monthly schedule remains authoritative.
* At the beginning of June 17 in the budget time zone, the pending change becomes non-editable and non-cancelable.
* Successful execution uses the latest authoritative weekly base allocations.
* The original compact confirmation record remains unchanged even if the current-impact estimate or execution inputs later change.

### SCN-C-05 — Immediate June 17 monthly-to-weekly reference fixture

This is the fixed reference fixture required by Section 16 of the governing specification.

**Acceptance criteria:** CBD-67-AC07, AC08, AC10, AC12, AC15–AC17, AC19

| Input | Value |
| --- | --- |
| Budget date | Wednesday, June 17, 2026 |
| Current schedule | Monthly, 1st |
| Current old-schedule period | June 1–30, 2026 |
| Proposed schedule | Weekly, Monday |
| Effective date | June 17, 2026, selected explicitly |
| New weekly base allocations | Housing $350.00; Food $140.00; Transport $70.00 |
| New weekly base total | $560.00 |

| Segment | Start | End | Days | Proration | Final allocation |
| --- | --- | --- | --- | --- | --- |
| Shortened old monthly period | June 1 | June 16 | 16 | None under new schedule | Old version closes June 16 |
| Weekly transition | June 17 | June 21 | 5 | 5/7 | Housing $250.00; Food $100.00; Transport $50.00; total $400.00 |
| Full weekly period 1 | June 22 | June 28 | 7 | None | $560.00 |
| Full weekly period 2 | June 29 | July 5 | 7 | None | $560.00 |
| Full weekly period 3 | July 6 | July 12 | 7 | None | $560.00 |

**Known financial items in the visible horizon**

| Item | Authoritative date | Amount | Proposed period | Treatment |
| --- | --- | --- | --- | --- |
| Posted grocery transaction | June 18 | $84.25 | Transition | Display transaction in normal posted state; never prorate |
| Pending fuel transaction | June 19 | $32.10 | Transition | Display and label Pending; never prorate |
| Rent projected occurrence | June 20 | $1,000.00 | Transition | Display one Projected occurrence; never prorate |
| Paycheck projected occurrence | June 26 | _\\\~$2,500.00_ | June 22–28 | Display italicized with tilde; income total is approximate |
| Utility occurrence without usable amount | July 2 | No usable amount | June 29–July 5 | Display when otherwise authorized; exclude from totals |

**Preview and confirmation assertions**

* The preview makes the short June 17–21 transition prominent.
* It does not suggest backdating to Monday, June 15.
* It shows per-period category totals and all authorized items through July 12.
* It shows no old-period financial totals, aggregate affected total, or net-impact figure.
* Confirmation uses **Apply schedule change**.
* Successful confirmation immediately creates the new version effective for all of June 17.
* No pending future state remains.
* The compact confirmation record preserves the timeline, allocation inputs, $400.00 transition result, known item picture, actor, and timestamp.

### CALC-01 — Largest-remainder tie using stable category identity

**Given**

* A five-day weekly transition.
* Four categories with stable IDs CAT-001, CAT-002, CAT-003, and CAT-004.
* Each weekly base allocation is $100.00.

**Calculation**

| Category | Exact 5/7 result | Floor to cents | Fractional remainder | Final |
| --- | --- | --- | --- | --- |
| CAT-001 | $71.428571… | $71.42 | Equal | $71.43 |
| CAT-002 | $71.428571… | $71.42 | Equal | $71.43 |
| CAT-003 | $71.428571… | $71.42 | Equal | $71.43 |
| CAT-004 | $71.428571… | $71.42 | Equal | $71.42 |

The exact overall result is $285.714285…, which half-up rounds to $285.71. The floored category sum is $285.68, so three cents are assigned to CAT-001, CAT-002, and CAT-003 by stable ID order. CAT-004 does not receive a remainder cent.

**Assertions**

* Final category allocations total exactly $285.71.
* Renaming or reordering categories does not change which stable identities receive the three cents.
* Repeating the request produces the same allocation set and no duplicate records.

## 5. Pending-change and transition lifecycle scenarios

| ID | Given and action | Expected result |
| --- | --- | --- |
| LIFE-01 | An Owner confirms SCN-C-04 for June 17. | One pending-change identity and one immutable confirmed revision exist; the current schedule remains authoritative; no new schedule version exists; Owner and Co-owner may edit or cancel; read-only roles see permitted information. |
| LIFE-02 | A Co-owner edits the pending cadence, anchor, or effective date and confirms the refreshed preview. | A new immutable confirmed revision atomically becomes current within the same pending identity; prior revision remains historical; Pending change edited audit event records before and after; no second pending record or version is created. |
| LIFE-03 | A Co-owner edits a pending change and then leaves, times out, fails validation, loses connectivity, or abandons confirmation. | The original confirmed pending revision remains authoritative and scheduled; transient work disappears; no audit event, schedule version, or replacement revision is created. |
| LIFE-04 | An Owner explicitly confirms cancellation of a pending change. | Pending state becomes Canceled; current schedule is unchanged; no replacement version or period is created; an attributable cancellation audit record is created; no cancellation reason is requested or stored. |
| LIFE-05 | During June 17–21 from SCN-C-05, an authorized user changes weekly base allocations and saves. | Transition allocations cannot be edited directly. The user must make a non-default choice: recalculate the complete transition from all current base allocations or keep the transition unchanged. Cancel saves nothing. Recalculation is atomic and never changes financial activity. |
| LIFE-06 | On or after June 22, an authorized user changes weekly base allocations. | No transition choice appears because the transition ended at local midnight. The normal recurring weekly allocations change prospectively under ordinary audited allocation behavior. |

### Cadence-adapter scenarios

| ID | Given and action | Expected result |
| --- | --- | --- |
| ADAPT-01 | Current monthly schedule; proposed biweekly Friday paycheck boundaries are August 7 and August 21, 2026; effective date August 12; user explicitly reviews a $280 full-period Groceries target. | Old period closes August 11. Transition is August 12–20 (9 days). Basis period is August 7–20 (14 days). Groceries transition target is $280 × 9 ÷ 14 = $180. First full paycheck period is August 21–September 3 with the reviewed $280 target. |
| ADAPT-02 | Same proposed paycheck rule and reviewed target, effective August 21. | August 21 is a natural boundary. A full August 21–September 3 period begins with the reviewed $280 target; no transition or proration appears. |
| ADAPT-03 | Proposed custom cadence has origin August 1, 2026 and fixed length 10 days; effective date August 14; user reviews a $300 full-period Groceries target. | Adapter returns basis August 11–20 and next boundary August 21. Transition is August 14–20 (7 days), so Groceries target is $300 × 7 ÷ 10 = $210. First full period is August 21–30 with $300. |
| ADAPT-04 | Old cadence has a $500 Groceries target and the user proposes a differently sized cadence. | Product may prefill $500 with provenance but cannot confirm until the user explicitly reviews the proposed full-period target. It never silently assumes the old amount is appropriate for the new frequency. Editing the reviewed target invalidates and regenerates the preview. |

## 6. Financial presentation scenarios

### FIN-01 — Complete authorized proposed-period picture

Using SCN-C-05:

* Show planned-allocation, transaction, unmatched projected-bill, and unmatched projected-income totals separately for each period.
* Order items chronologically by authoritative budget date, using normal product tie ordering.
* Show posted and pending transactions with their business-as-usual presentation.
* Show each unmatched projected occurrence separately.
* Display _\\\~$2,500.00_ as estimated and make the containing income total approximate.
* Exclude the no-amount utility occurrence from totals.
* Do not show old financial totals, an aggregate affected count or amount, total affected, net change, or combined net-impact figure.
* Every displayed total must reconcile to its expandable authorized items.

### FIN-02 — Reliable match replaces a projection once

**Given**

* A projected rent occurrence dated June 20 for $1,000.00.
* A posted transaction reliably matched to that occurrence.

**Expected**

* Display the canonical transaction in its normal presentation.
* Do not display or total the projected occurrence.
* Retain the projection and match identities in the domain model and audit context.
* If the separate matching capability later removes the match, the projection may reappear according to that capability’s rules.
* CBD-67 does not calculate confidence or decide whether the match is reliable.

### FIN-03 — Multiple recurring occurrences remain separate

**Given**

* A weekly projected bill with occurrences on June 19, June 26, July 3, and July 10 inside the horizon.

**Expected**

* Show four separate projected occurrences in their proposed periods.
* The recurring definition creates no additional item or amount.
* A match replaces only the matched occurrence.
* Occurrence dates and amounts determine period totals.

### FIN-04 — Synchronization freshness

| Stored-data state | Expected behavior |
| --- | --- |
| Current and complete | Generate and permit confirmation of a current preview. |
| Stale but complete and internally reliable | Show an informational freshness notice without warning acknowledgement; confirmation may remain available while the notice remains visible. |
| Incomplete, inconsistent, or unable to support a reliable complete calculation | Keep confirmation unavailable and explain that the preview cannot be completed. |
| New data arrives before confirmation | Mark the preview stale and require recalculation. |
| New data arrives after future confirmation | Keep the pending schedule valid; refresh only the informational current-impact estimate. |

## 7. Roles, permissions, and masking

### PERM-01 — Role and provisioned-access matrix

| Role or access | View current schedule | View pending and history | View financial details | Create, edit, cancel, or confirm |
| --- | --- | --- | --- | --- |
| Owner | Complete | Complete | Complete subject to underlying account authority | Yes |
| Co-owner | Complete | Complete | Complete subject to underlying account authority | Yes |
| Accountability Partner | Complete read-only | Complete read-only, including confirmed pending changes and failures | Complete budget financial picture | No |
| Viewer with full schedule provision | Provisioned complete schedule view | Only provisioned history and pending information | Only provisioned financial information | No |
| Viewer with partial financial provision | Provisioned schedule information | Only provisioned history and pending information | Only explicitly provisioned items and totals | No |
| Viewer with no applicable access | No restricted schedule details | No restricted history or pending details | No restricted details, counts, or totals | No |

**Assertions**

* Restricted financial content appears as one consolidated meaningful masked block.
* Masking reveals no restricted item count, subtotal, amount, category, or timing.
* Unavailable actions have accessible explanations and are not represented only by disabled styling.
* Accountability Partner is never treated as a flexible Viewer and always retains comprehensive read-only schedule visibility.

### PERM-02 — Permission changes during an open workflow

**Given**

* An Owner has a current preview or final confirmation open.
* The user loses schedule-modification permission before submission.

**Expected**

* Revalidate permission before preview and before confirmation.
* Keep the proposal non-authoritative.
* Make confirmation unavailable and explain the permission change.
* Preserve safe visible information according to the user’s new permissions.
* Create no pending change, version, confirmation record, or audit event for the abandoned submission.

### PERM-03 — Accountability Partner history

**Expected**

* Show current schedule, schedule history, confirmed pending changes, confirmed revisions, cancellations, execution failures, compact confirmation evidence, and authorized financial context read-only.
* Never show modification controls.
* Preserve this access for archived history subject to budget membership and the broader permission model.

## 8. Concurrency, recovery, and definitive outcomes

| ID | Injected condition | Expected authoritative result |
| --- | --- | --- |
| REC-01 | Two Owners confirm competing proposals against the same current version. | At most one proposal commits against that version. The other becomes stale or conflicts, creates no partial or duplicate state, and requires a new preview. |
| REC-02 | Confirmation commits, but the response is lost and the same request is retried. | Resolve the stable operation identity to the existing Succeeded outcome; return the committed active or pending state; create no duplicate version, period, confirmation record, pending record, or audit event. |
| REC-03 | The operation is interrupted before authoritative commit. | Resolve to Failed when non-commit is proven; prior schedule and pending state remain complete and unchanged; no partial domain or audit records exist. |
| REC-04 | A future change reaches its effective date, transient retries fail, and the system proves the atomic change did not commit. | Preserve the prior schedule; retain immutable failed change and audit evidence; show safe explanation and audit reference; Primary Owners, Co-owners, and Collaborators may use Review and try again, which opens a newly previewed immediate proposal. |
| REC-05 | Contradictory or partial authoritative records are detected. | Treat as a data-integrity outage; show last safe information; make modifications read-only; recover automatically to one valid state; never display an empty budget or indefinite Processing state; do not require the user to contact support. |

Every recovery scenario must end with exactly one durable **Succeeded** or **Failed** operation outcome. A worker’s Processing response is never the business outcome.

## 9. History, audit, and domain-integrity scenarios

| ID | Action | Assertions |
| --- | --- | --- |
| HIST-01 | Confirm, edit, cancel, fail, and execute future changes. | Versions exist only for authoritative schedules. One pending identity contains immutable confirmed revisions. Cancellation and failure preserve evidence without creating a future version. Successful execution links old and new versions, pending identity, confirmation, periods, allocations, and audit. |
| HIST-02 | Add, correct, remove, or reclassify a transaction after a period completes. | Historical actual and remaining amounts update with audit detail. Period dates, completed state, planned allocations, schedule-version reference, and later-period allocations remain unchanged. Surplus and overspending never carry forward automatically. |
| HIST-03 | Assign one canonical transaction to two budgets with different schedules. | The transaction is not duplicated. Each budget has its own authoritative assignment, period, classification, and permission boundary. Removing it from one budget does not corrupt the canonical transaction or the other budget. |
| HIST-04 | Rename, reorder, archive, and recreate a category with the same label; later change rule implementation. | Stable non-reused category identity preserves history and rounding ties. Historical currency precision, named time-zone context, calculation-rule version, and original references remain interpretable. |

### Required audit-event assertions

Fixtures must verify applicable events and actors for:

* Schedule created.
* Change confirmed.
* Change scheduled.
* Pending change edited.
* Pending change canceled.
* Change executed.
* Change execution failed.
* Transition allocations recalculated.
* Transition allocations kept unchanged.
* Post-close financial adjustment.

A budget-time-zone change is a separate future settings event and does not create a cadence schedule version.

## 10. Validation, invalid, stale, and conflict cases

| Scenario ID | Condition | Required user-facing behavior | Authoritative state |
| --- | --- | --- | --- |
| ERR-01 | Effective date is before the current budget date. | Date is unavailable; if submitted, show **Choose today or a future date.** | Current schedule and any existing pending change remain unchanged. |
| ERR-02 | A confirmed future change already exists and a user tries to start another. | Show the current schedule and separate existing pending summary with permitted edit or cancel actions; do not open an independent second proposal. | Current schedule plus original pending change. |
| ERR-03 | Required cadence or anchor is missing, unsupported, or invalid. | Highlight the applicable control, explain the valid selection, and keep preview and confirmation unavailable. Weekly Monday and monthly 1st defaults are valid without reselection. | Setup: no budget. Change: current schedule unchanged. |
| ERR-04 | User abandons budget creation before confirmation. | No error; return to the financial dashboard or prior context. | No budget, schedule, period, or version exists. |
| ERR-05 | Budget or initial schedule creation fails after confirmation. | Show a safe recoverable failure and permit retry after current validation and preview. Never imply that only one component succeeded. | No partial budget, schedule, period, or version is authoritative. |
| ERR-06 | Budget name is empty or whitespace. | Highlight the field and show **Enter a budget name.** | No budget created. |
| ERR-07 | Budget name exceeds 100 user-perceived characters. | Keep input visible, show counter, and display **Budget names must be 100 characters or fewer.** Never truncate silently. | No budget created. |
| ERR-08 | Budget name contains unsupported control or invisible formatting characters. | Highlight the field and display **Remove unsupported invisible or control characters.** | No budget created. |
| ERR-09 | Owner time zone is missing or unsupported and GMT is selected automatically. | Display **We couldn’t determine your local time zone. GMT has been selected. Confirm GMT or choose another time zone.** Block confirmation until verified. | No schedule creation or change. |
| ERR-10 | Previously selected time zone is no longer supported. | Display **Select a supported time zone to determine your budget dates.** | No confirmation. |
| ERR-11 | Time-zone or input change makes setup preview stale or recalculation fails. | Remove or mark stale output, keep confirmation unavailable, and display **Your budget dates could not be updated. Try again before creating the budget.** | No change. |
| ERR-12 | Setup crosses a new weekly or monthly boundary before authoritative acceptance. | Refresh dates. Weekly: **A new budget week has started. Review the updated period dates before creating your budget.** Monthly: **A new budget period started before your budget was created. Review the updated dates and try again.** | No stale creation is committed. |
| ERR-13 | Proposed cadence and anchor equal the current authoritative schedule, including after values are changed back. | Remove any prior preview, keep confirmation unavailable, and show **Your selected cadence and anchor match the current schedule. Choose a different cadence or anchor to continue.** | Current schedule unchanged; no durable records. |
| ERR-14 | Selected effective date becomes past while review is open. | Display **The selected effective date has passed. Choose today or a future date and review the updated preview.** Require explicit reselection and a new preview; never shift the date automatically. | Current schedule and pending state unchanged. |
| ERR-15 | Preview is incomplete, stale, loading, or recalculating. | Explain status, preserve safe valid inputs, provide Try again for temporary calculation failure, and keep confirmation unavailable. | No change. |
| ERR-16 | Base planned allocation is negative. | Highlight the allocation and explain that it must be zero or greater. | No allocation or schedule-change save. |
| ERR-17 | Active-transition base allocations are saved without choosing keep or recalculate. | Present both accessible choices with no preselection and keep save unavailable until one is selected. | Existing base and transition allocations remain unchanged. |
| ERR-18 | User loses edit permission before confirmation. | Explain changed permission, remove modification action, and apply the new view/masking rules. | No change. |
| ERR-19 | Cancel, Back, or navigation occurs before explicit confirmation. | Return safely according to the action and discard the transient proposal or final-review state. | Current schedule and original pending change remain unchanged. |
| ERR-20 | Preview data is permission-restricted. | Show one consolidated masked section without counts or totals; never insert restricted values into period totals. | No unauthorized disclosure. |

Validation errors must associate the message with the violating field or condition, place focus in the error summary when appropriate, support navigation to the field, and never rely on color alone.

## 11. Accessibility and MVP scope boundaries

### A11Y-01 — Accessible workflow completion

Automated checks and later assistive-technology review must verify:

* programmatic labels for every input;
* error association and error-summary focus;
* keyboard access to previews, expandable item details, Back, Cancel, edit, cancellation, and confirmation;
* accessible announcements for loading, recalculation, stale state, success, failure, service unavailable, and recovery;
* an accessible explanation for unavailable actions;
* meaningful masked content without restricted information;
* no color-only status or validation communication; and
* logical focus after success, failure, and return from final review.

### SCOPE-01 — Excluded MVP functionality

Across setup, change, preview, confirmation, history, and settings:

* expose no balance rollover or carry-forward controls or automatic calculations;
* expose no multi-currency budget behavior or currency-change workflow;
* expose no Owner-approval or second-person approval workflow;
* assign no schedule version to an unconfirmed or merely pending future configuration;
* expose no budget-time-zone editing within a schedule-change workflow; and
* do not treat the future-feature register as implemented behavior.

## 12. Generated and matrix verification requirements

Fixed fixtures do not replace broader generated coverage.

### 12.1 Calendar generation

Generated tests must cover:

* all seven weekly anchors;
* monthly numbered anchors 1 through 31;
* explicit Last day;
* common and leap years;
* short-month clamping and return to a numbered anchor;
* daylight-saving transitions and named time zones with different offsets;
* dates on, before, and after natural boundaries; and
* immediate and future mid-period dates.

For every generated date range, verify:

* each budget date belongs to exactly one applicable period;
* periods have no gaps or overlaps;
* adjacent end and start boundaries are consistent;
* generated dates are valid;
* completed boundaries remain unchanged;
* numbered anchors resume when valid; and
* Last day remains the actual final calendar day.

### 12.2 Allocation generation

Generated allocation sets must verify:

* weekly days/7 and monthly actual-days proration;
* zero and positive inputs;
* negative rejection;
* values below, exactly at, and above half-up midpoints;
* zero-, two-, and three-decimal currency precision in calculation-rule fixtures;
* largest-remainder reconciliation;
* stable-identity tie resolution; and
* exact equality between the rounded target and final category sum.

### 12.3 Role, state, and failure matrices

Exercise every relevant combination of:

* Owner, Co-owner, Accountability Partner, and each Viewer provisioning level;
* active, active-with-pending, executing, failed, recovery, and historical states;
* current, stale, unavailable, incomplete, and permission-filtered preview data;
* interruption before and after commit;
* lost response, duplicate delivery, retry, and concurrent action; and
* permission or time-zone context changing while work is open.

## 13. Coverage gaps and deferred follow-up

No known CBD-67 MVP scenario gap blocks implementation planning.

| Deferred area | CBD-67 boundary | Linked work | Status |
| --- | --- | --- | --- |
| Budget-time-zone changes after creation | Time-zone selection during creation is covered; editing an existing budget time zone is unavailable in cadence workflows. | FF-002 in the [Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) | Deferred; non-blocking |
| Advanced projection matching and occurrence resolution | FIN-02 consumes a reliable result. CBD-68 governs MVP one-to-one income matching and Late/Missing/Skip. Projected bills, pending interaction, complex cardinality, advanced confidence, and additional resolution behavior remain outside CBD-67. | FF-004 in the [Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) | Narrowed deferred remainder; non-blocking |
| Implementation architecture and executable fixture formats | This catalog defines product inputs and expected outcomes without prescribing frameworks, APIs, storage, clocks, or job design. | Planned CBD-67 technical specification | Required before implementation authorization |
| Final visual design | Scenarios define required information, state, and accessibility behavior without prescribing final layout. | Future design work | Non-blocking for product-specification review |

If a new blocking ambiguity is found, assign a stable scenario or open-question ID, document the affected capability and release consequence, link Jira work, and update the governing specification before inventing an implementation default.

## 14. Review record

| Date | Reviewer | Scope | Findings | Outcome |
| --- | --- | --- | --- | --- |
| August 11, 2026 | Author review — Alexander Wohlford | Governing specification decisions, CBD-67 description and acceptance criteria, AC01–AC19 coverage, deterministic setup and cross-cadence fixtures, lifecycle, permissions, presentation, recovery, history, accessibility, and scope boundaries | No known MVP-blocking scenario gaps; FF-002 and FF-004 remain deferred; formal human approval and executable-test implementation remain pending | Final Draft prepared for formal review |
| August 11, 2026 | Alexander Wohlford — Product Owner | Final completion review of old-period preview presentation, AC13/AC14 evidence, AC16 confirmation assertions, cross-document consistency, and deferred boundaries | All closure findings resolved; technical design and executable implementation tests remain separate future delivery work | Version 1.0 Approved |
| August 11, 2026 | Alexander Wohlford with Claude assistance — AI-assisted critical audit | Independent verification of scenario and invariant counts, recomputation of calendar and proration arithmetic in CALC-01 and SCN-C-01/03/04/05, and review of the v1.0 approval chain | Counts and arithmetic verified correct; the 57 scenario IDs were found to span two undocumented levels of depth, and v1.0 was authored, reviewed, and approved by the same person with no independent human review | Coverage-depth note added to Section 1; version 1.1 returned to In Review. See RF-07 in the traceability record. |
| August 11, 2026 | Alexander Wohlford — Product Owner | Approval decision on reviewer independence for this documentation-scope subtask | The drafts under audit were authored by Codex rather than by the approver; the Product Owner reviewed them and the AI-assisted audit supplied an independent critical pass over work the approver did not write. Accepted as sufficient reviewer separation. The independent reviewer was an AI system, not a second human. | Version 1.2 Approved under the amended §7.7 rule in the traceability record. RF-07 resolved and REV-01 closed. |
| August 12, 2026 | Alexander Wohlford — Product Owner, with Codex assistance | Permission consistency against the authoritative CBD-67 matrix and CBD-68 PD-68-12 | REC-04 and permission outcomes now include Collaborators as authorized schedule editors; Viewer and Accountability Partner remain read-only. | Version 1.3 Approved. |
| August 12, 2026 | Alexander Wohlford — Product Owner, with Codex assistance | Cadence-neutral adapter and proposed-target review | Added ADAPT-01–04 for mid-period and boundary-aligned paycheck/custom transitions and explicit full-period target review. | Version 1.4 Approved. |
| August 12, 2026 | Alexander Wohlford — Product Owner, with Codex assistance | Matching-scope reconciliation | Recognized CBD-68 as authoritative for MVP one-to-one income matching and narrowed the FF-004 scenario boundary to projected bills, pending interaction, complex cardinality, advanced confidence, and additional resolution behavior. | Version 1.5 Approved. |
