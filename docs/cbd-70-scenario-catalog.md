# CBD-70 — Deterministic Budget Calendar and Financial Scenario Catalog

| Field | Value |
| --- | --- |
| Status | Working draft — 75 of 75 scenarios drafted, technically reviewed, and independently reviewed; Product Owner approval pending |
| Document version | 0.10 |
| Owner | Alexander Wohlford |
| Jira subtask | [CBD-70](https://cobudget.atlassian.net/browse/CBD-70) |
| Governing traceability record | [CBD-70 Acceptance Criteria Traceability and Review Record](cbd-70-acceptance-criteria-traceability.md) |
| Calendar example set | [CBD-70 Deterministic Calendar Example Set](cbd-70-calendar-example-set.md) |
| Repository baseline | `eedd136` |
| Last updated | August 14, 2026 |

## 1. Purpose and current scope

This catalog groups the 50 final-approved CBD-67 through CBD-69 acceptance criteria into deterministic scenario families. The registry assigns stable scenario IDs, primary coverage classifications, calendar dependencies, and authoritative requirement mappings. All registry entries have complete draft scenario content; the three technical reviews and the independent review are complete and every finding is resolved; Product Owner approval remains pending.

The catalog contains **75 scenarios in six families**. The count is a draft coverage baseline, not a quota: a review may merge equivalent cases or add a case when traceability, risk, or an in-MVP product decision requires it. Any count change must preserve bidirectional coverage.

Behavior outside MVP receives no scenario.

## 2. Scenario families and counts

| Family | Prefixes | Purpose | Scenario count |
| --- | --- | --- | ---: |
| Period generation | `PER-*` | Normal and boundary generation for every supported cadence | 13 |
| Setup, schedule change, and history | `SET-*`, `PREV-*`, `A11Y-*`, `CHG-*`, `HIST-*` | Onboarding, previews, accessibility, immediate/future changes, lifecycle, execution, and historical stability | 17 |
| Targets, income, and cash | `FIN-*`, `INC-*`, `HOL-*` | Proration, no-carry-forward, canonical income timeline, receipt, occurrence exceptions, and business-day policy | 14 |
| Transactions and reconciliation | `TXN-*`, `REC-*`, `LATE-*`, `OVR-*`, `TYPE-*` | Date classification, pending/settled lifecycle, reconciliation, late adjustments, and transaction types | 15 |
| Validation, permission, and recovery | `VAL-*`, `SEC-*`, `RECOV-*` | Invalid schedules, prohibited actions, authorization, and recoverable inconsistent data | 8 |
| Alerts, reporting, and end-to-end | `ALERT-*`, `REP-*`, `AUDIT-*`, `E2E-*` | Alert lifecycle, reporting views, audit reconstruction, and cross-subsystem convergence | 8 |
| **Total** |  |  | **75** |

## 3. Reusable calendar dependencies

These IDs identify the reusable calendars defined in the [CBD-70 Deterministic Calendar Example Set](cbd-70-calendar-example-set.md).

| Calendar ID | Purpose |
| --- | --- |
| CAL-WEEK-01 | Normal Monday-anchored weekly sequence |
| CAL-WEEK-DST | Alternate weekly anchor across a daylight-saving transition |
| CAL-MONTH-31 | Numbered monthly anchor across short months |
| CAL-MONTH-LAST | Explicit last-day anchor across leap February |
| CAL-YEAR-01 | December-to-January year boundary |
| CAL-PAY-BIWEEK | Biweekly paycheck cadence including a three-paycheck month |
| CAL-PAY-TWICE-WEEK | Twice-per-week alternating periods plus weekly, monthly, and every-three-weeks paycheck variants |
| CAL-PAY-SEMI | Semimonthly cadence with two natural anchors |
| CAL-MULTI-01 | Multiple income schedules on one canonical budget timeline |
| CAL-HOLIDAY-01 | Versioned US holiday and weekend adjustments |
| CAL-CUSTOM-01 | Valid contiguous fixed-length custom periods |
| CAL-TRANS-MID | Mid-period schedule transition |
| CAL-TRANS-BOUND | Boundary-aligned schedule transition |
| CAL-PAY-SKIP | Skipped, shifted, extra, and missing income occurrences |
| CAL-CROSS-SETTLE | Authorization and settlement in different periods |
| CAL-DST-FALL | Repeated local hour during the daylight-saving fall transition |
| CAL-TZ-UTC | UTC/local-date disagreement near local midnight |
| CAL-CUSTOM-LIMIT | One-day, 366-day, and invalid-duration custom periods |
| CAL-SAME-DATE | Multiple independent events sharing one budget date |
| CAL-HISTORY-01 | Multiple completed periods before and after a schedule change |
| CAL-BILL-01 | Bill due, authorization, payment, and settlement across periods |

## 4. Scenario registry

### 4.1 Period generation — 13 scenarios

| Scenario ID | Title | Primary class | Calendar | Governing requirements | Status |
| --- | --- | --- | --- | --- | --- |
| PER-W-01 | Monday-anchored weekly period generation | Normal | CAL-WEEK-01 | CBD-67-AC01, AC02, AC05 | Drafted |
| PER-W-02 | Alternate weekday anchor across a DST change | Boundary | CAL-WEEK-DST | CBD-67-AC01, AC05; CBD-69-AC13 | Drafted |
| PER-M-01 | Numbered monthly anchor in an ordinary month | Normal | CAL-YEAR-01 | CBD-67-AC02, AC03 | Drafted |
| PER-M-02 | Day-31 anchor clamps in a short month and returns | Boundary | CAL-MONTH-31 | CBD-67-AC03, CBD-67-AC04; CBD-69-AC13 | Drafted |
| PER-M-03 | Last-day anchor across leap February | Boundary | CAL-MONTH-LAST | CBD-67-AC03, AC04; CBD-69-AC13 | Drafted |
| PER-PAY-01 | Normal biweekly paycheck-period generation | Normal | CAL-PAY-BIWEEK | CBD-68-AC01, AC02 | Drafted |
| PER-PAY-02 | Shifted paycheck occurrence leaves canonical boundaries unchanged | Boundary | CAL-PAY-SKIP | CBD-68-AC01, AC09 | Drafted |
| PER-PAY-03 | Remaining supported paycheck patterns generate deterministic periods | Normal | CAL-PAY-TWICE-WEEK | CBD-68-AC01, AC14 | Drafted |
| PER-SEMI-01 | Normal semimonthly period generation | Normal | CAL-PAY-SEMI | CBD-68-AC02, CBD-68-AC11 | Drafted |
| PER-SEMI-02 | Adjusted semimonthly anchors collide on one date | Boundary | CAL-HOLIDAY-01 | CBD-68-AC07, AC08, AC11; CBD-69-AC13 | Drafted |
| PER-MULTI-01 | Multiple income schedules share one canonical timeline | Normal | CAL-MULTI-01 | CBD-68-AC02, CBD-68-AC03 | Drafted |
| PER-CUST-01 | Valid contiguous fixed-length custom recurrence | Normal | CAL-CUSTOM-01 | CBD-68-AC12 | Drafted |
| PER-CUST-02 | One-day and 366-day custom-period boundaries | Boundary | CAL-CUSTOM-LIMIT | CBD-68-AC12; CBD-69-AC13 | Drafted |

### 4.2 Setup, schedule change, and history — 17 scenarios

| Scenario ID | Title | Primary class | Calendar | Governing requirements | Status |
| --- | --- | --- | --- | --- | --- |
| SET-01 | Weekly onboarding opens the current period and previews three future periods | Normal | CAL-WEEK-01 | CBD-67-AC02, AC06 | Drafted |
| SET-02 | Monthly setup validates anchor and previews clamped periods | Boundary | CAL-MONTH-31 | CBD-67-AC03, AC04, AC06 | Drafted |
| SET-03 | Paycheck and custom setup preview uses the cadence-neutral model | Normal | CAL-PAY-BIWEEK, CAL-CUSTOM-01 | CBD-68-AC13, AC16 | Drafted |
| PREV-01 | Expired or stale previews block confirmation while display-only changes do not | Failure | CAL-PAY-BIWEEK, CAL-HOLIDAY-01 | CBD-68-AC08, AC16 | Drafted |
| PREV-02 | Atomic activation failure recovers and duplicate confirmation is idempotent | Recovery | CAL-CUSTOM-01 | CBD-68-AC16 | Drafted |
| A11Y-01 | Schedule, preview, validation, and reconciliation remain keyboard and screen-reader operable | Normal | CAL-HOLIDAY-01, CAL-SAME-DATE | CBD-68-AC16 | Drafted |
| CHG-01 | Immediate monthly-to-weekly mid-period change with proration | Boundary | CAL-TRANS-MID | CBD-67-AC07, CBD-67-AC10, CBD-67-AC12, CBD-67-AC15, CBD-67-AC16, CBD-67-AC19 | Drafted |
| CHG-02 | Future weekly-to-monthly mid-period change | Boundary | CAL-TRANS-MID | CBD-67-AC07–AC10, AC15–AC17, AC19 | Drafted |
| CHG-03 | Weekly-to-monthly boundary-aligned change without proration | Normal | CAL-TRANS-BOUND | CBD-67-AC07, CBD-67-AC11, CBD-67-AC15, CBD-67-AC16, CBD-67-AC19 | Drafted |
| CHG-04 | Monthly-to-weekly boundary-aligned change | Normal | CAL-TRANS-BOUND | CBD-67-AC07, AC11, AC15–AC17, AC19 | Drafted |
| CHG-05 | Custom cadence change uses the CBD-67 adapter | Boundary | CAL-TRANS-MID | CBD-68-AC13, AC16 | Drafted |
| CHG-06 | Edit a pending future schedule change | Normal | CAL-TRANS-BOUND | CBD-67-AC09, AC17 | Drafted |
| CHG-07 | Cancel a pending future schedule change | Normal | CAL-TRANS-BOUND | CBD-67-AC09, AC17 | Drafted |
| CHG-08 | Reject a second pending schedule change | Failure | CAL-TRANS-BOUND | CBD-67-AC08, AC09 | Drafted |
| CHG-09 | Reject past and otherwise invalid effective dates | Failure | CAL-TRANS-MID | CBD-67-AC07; CBD-69-AC14 | Drafted |
| CHG-10 | Execute a pending change once and ignore an exact replay | Recovery | CAL-SAME-DATE | CBD-67-AC17, AC18; CBD-68-AC13 | Drafted |
| HIST-01 | Completed periods and schedule-version references remain stable | Boundary | CAL-HISTORY-01 | CBD-67-AC13, AC14, AC17, AC18; CBD-69-AC09 | Drafted |

### 4.3 Targets, income, and cash — 14 scenarios

| Scenario ID | Title | Primary class | Calendar | Governing requirements | Status |
| --- | --- | --- | --- | --- | --- |
| FIN-01 | Mid-period target proration with visible half-up rounding | Boundary | CAL-TRANS-MID | CBD-67-AC12, AC15, AC16; CBD-68-AC04 | Drafted |
| FIN-02 | Positive remaining target does not carry forward | Boundary | CAL-HISTORY-01 | CBD-67-AC13, AC19; CBD-68-AC15 | Drafted |
| FIN-03 | Overspending remains historical and does not reduce the next target | Boundary | CAL-HISTORY-01 | CBD-67-AC14, AC19; CBD-68-AC15 | Drafted |
| INC-01 | Anchor and secondary income share one canonical budget timeline | Normal | CAL-MULTI-01 | CBD-68-AC02, AC03, AC04 | Drafted |
| INC-02 | Expected income changes neither actual cash nor spending targets | Normal | CAL-MULTI-01 | CBD-68-AC04, CBD-68-AC05; CBD-69-AC07 | Drafted |
| INC-03 | Expected income is received exactly as projected | Normal | CAL-MULTI-01 | CBD-68-AC06, CBD-68-AC10; CBD-69-AC07 | Drafted |
| INC-04 | Early and late income update receipt reporting but not boundaries or targets | Boundary | CAL-PAY-SKIP | CBD-68-AC06, AC09, AC10; CBD-69-AC07 | Drafted |
| INC-05 | Missing and skipped income preserve projection history without becoming actual | Failure | CAL-PAY-SKIP | CBD-68-AC09, AC10; CBD-69-AC07 | Drafted |
| INC-06 | Extra and unexpected income do not create a boundary or fund categories | Boundary | CAL-PAY-SKIP | CBD-68-AC06, AC09, AC10; CBD-69-AC07 | Drafted |
| INC-07 | Received amount differs from expected amount | Boundary | CAL-MULTI-01 | CBD-68-AC04, AC06, AC10; CBD-69-AC07 | Drafted |
| INC-08 | Previous-business-day adjustment across a versioned holiday | Boundary | CAL-HOLIDAY-01 | CBD-68-AC07, CBD-68-AC08 | Drafted |
| INC-09 | Supported alternative non-business-day policy | Boundary | CAL-HOLIDAY-01 | CBD-68-AC07, AC08 | Drafted |
| INC-10 | Amount-only occurrence override changes projection but never a boundary | Boundary | CAL-PAY-SKIP | CBD-68-AC08, AC09, AC14 | Drafted |
| HOL-01 | Missing holiday coverage blocks confirmation and a source correction refreshes only unconfirmed work | Recovery | CAL-HOLIDAY-01 | CBD-68-AC08, AC16 | Drafted |

### 4.4 Transactions and reconciliation — 15 scenarios

| Scenario ID | Title | Primary class | Calendar | Governing requirements | Status |
| --- | --- | --- | --- | --- | --- |
| TXN-01 | Authorization and settlement occur in one period with an amount change | Boundary | CAL-SAME-DATE | CBD-69-AC01, CBD-69-AC02, AC04, AC05 | Drafted |
| TXN-02 | Authorization and settlement occur in different periods | Boundary | CAL-CROSS-SETTLE | CBD-69-AC01, AC02, AC05, AC09 | Drafted |
| TXN-03 | Missing authorization date uses posted or provisional fallback | Recovery | CAL-CROSS-SETTLE | CBD-69-AC01, AC02, AC06 | Drafted |
| TXN-04 | Date-only classification remains stable across DST and UTC/local disagreement | Boundary | CAL-DST-FALL, CAL-TZ-UTC | CBD-67-AC05; CBD-69-AC01, CBD-69-AC03, AC13 | Drafted |
| REC-01 | Pending authorization disappears without settlement | Recovery | CAL-CROSS-SETTLE | CBD-69-AC04, AC06 | Drafted |
| REC-02 | Unmatched posted transaction has weak reconciliation candidates | Recovery | CAL-CROSS-SETTLE | CBD-69-AC06, AC14 | Drafted |
| REC-03 | Apparent pending and posted duplicate enters review | Recovery | CAL-SAME-DATE | CBD-69-AC06 | Drafted |
| REC-04 | One authorization reconciles to multiple settlements | Boundary | CAL-CROSS-SETTLE | CBD-69-AC05, AC06 | Drafted |
| REC-05 | Settlement-first and authorization-first imports converge idempotently | Recovery | CAL-CROSS-SETTLE | CBD-69-AC05, AC06, AC12, CBD-69-AC15 | Drafted |
| LATE-01 | Late settlement adjusts an ended period without changing boundaries | Boundary | CAL-HISTORY-01 | CBD-67-AC18; CBD-69-AC09, AC10, AC11 | Drafted |
| OVR-01 | Authorized budget-date override and removal remain auditable | Boundary | CAL-CROSS-SETTLE | CBD-69-AC12, AC14 | Drafted |
| TYPE-01 | Owned-account transfer preserves aggregate cash and is not spending | Normal | CAL-SAME-DATE | CBD-69-AC08 | Drafted |
| TYPE-02 | Bill due date, payment date, authorization, and settlement remain distinct | Boundary | CAL-BILL-01 | CBD-67-AC12, AC15; CBD-69-AC08 | Drafted |
| TYPE-03 | Linked and unlinked refunds remain distinct from reversals | Boundary | CAL-HISTORY-01 | CBD-69-AC08, CBD-69-AC10 | Drafted |
| TYPE-04 | Manually entered expense uses the user-selected date without a pending stage | Normal | CAL-SAME-DATE | CBD-69-AC08, AC12 | Drafted |

### 4.5 Validation, permission, and recovery — 8 scenarios

| Scenario ID | Title | Primary class | Calendar | Governing requirements | Status |
| --- | --- | --- | --- | --- | --- |
| VAL-01 | Weekly and monthly setup rejects missing or invalid inputs | Failure | CAL-WEEK-01, CAL-MONTH-31 | CBD-67-AC06; CBD-69-AC14 | Drafted |
| VAL-02 | Custom preview blocks a generated gap, overlap, or reversed interval | Failure | CAL-CUSTOM-01 | CBD-68-AC12; CBD-69-AC13, AC14 | Drafted |
| VAL-03 | Custom duration rejects zero and 367 days while accepting limits | Boundary | CAL-CUSTOM-LIMIT | CBD-68-AC12; CBD-69-AC13, AC14 | Drafted |
| VAL-04 | Duplicate adjusted anchors deduplicate while occurrence exceptions cannot edit boundaries | Failure | CAL-HOLIDAY-01 | CBD-68-AC09, AC11; CBD-69-AC13, AC14 | Drafted |
| SEC-01 | Read-only actor is not offered schedule-mutation controls | Failure | CAL-TRANS-BOUND | CBD-67-AC09; CBD-69-AC12 | Drafted |
| SEC-02 | Permission revoked during editing causes a denied and audited mutation | Failure | CAL-TRANS-BOUND | CBD-67-AC17; CBD-69-AC12, AC14 | Drafted |
| SEC-03 | Hidden financial controls and direct unauthorized mutations are denied and audited | Failure | CAL-CROSS-SETTLE | CBD-69-AC12, AC14, AC15 | Drafted |
| RECOV-01 | Recoverable bank-data inconsistency preserves evidence and offers a recovery path | Recovery | CAL-CROSS-SETTLE | CBD-69-AC06, AC14, AC15 | Drafted |

### 4.6 Alerts, reporting, and end-to-end — 8 scenarios

| Scenario ID | Title | Primary class | Calendar | Governing requirements | Status |
| --- | --- | --- | --- | --- | --- |
| ALERT-01 | Informational pending warning clears when pending activity disappears | Recovery | CAL-CROSS-SETTLE | CBD-69-AC04, AC06, AC11 | Drafted |
| ALERT-02 | Settled overspending creates a firm alert that can be acknowledged | Boundary | CAL-HISTORY-01 | CBD-67-AC14; CBD-69-AC11 | Drafted |
| ALERT-03 | Late adjustment creates a distinct completed-period alert | Boundary | CAL-HISTORY-01 | CBD-69-AC09, AC10, AC11 | Drafted |
| ALERT-04 | Partner provisioning, masking, mute, and firm-alert independence remain explicit | Boundary | CAL-SAME-DATE | CBD-69-AC11, AC12, AC15 | Drafted |
| REP-01 | Budget-date and statement-date views explain different period placement | Normal | CAL-CROSS-SETTLE | CBD-69-AC01, AC10, AC15 | Drafted |
| AUDIT-01 | Disputed match, override, late settlement, and category correction remain reconstructable | End-to-end | CAL-CROSS-SETTLE | CBD-69-AC05, AC06, AC09, AC11, AC12, AC15 | Drafted |
| E2E-01 | Weekly-to-monthly change preserves target, income, transaction, alert, and audit invariants | End-to-end | CAL-TRANS-MID, CAL-MULTI-01 | CBD-67-AC10, AC12, AC14–AC18; CBD-68-AC04–AC06; CBD-69-AC04, AC05, AC11, AC12, AC15 | Drafted |
| E2E-02 | Holiday-adjusted paycheck with late settlement converges across the canonical timeline | End-to-end | CAL-PAY-BIWEEK, CAL-HOLIDAY-01, CAL-CROSS-SETTLE | CBD-68-AC01, AC02, AC04–AC10, AC13, AC14, AC16; CBD-69-AC01, AC02, AC04, AC05, AC07, AC09–AC12, AC14, AC15 | Drafted |

## 5. Detailed scenarios

### 5.1 Standard scenario template

Every scenario uses this fixed structure:

| Field | Required content |
| --- | --- |
| Scenario identity | Stable ID, title, primary classification, optional risk tags |
| Authority | Governing acceptance criteria and specification rule IDs |
| Base fixture | Calendar, budget space, actors, schedules, categories, income, transactions, bills, and prior audit state |
| Starting state | Complete values or a precise non-value state such as Pending or Not applicable |
| Checkpoints | Scenario-local `T0…Tn`, each with an exact date/time and descriptive event label |
| Delta | User command, imported event, scheduled event, derived calculation, security event, or administrative event |
| Expected outcomes | Period, schedule, target, income, cash, transaction, bill, validation, alert, audit, and non-change layers |
| Calculations | Formula, exact category values, exact summed total, one half-up rounding step on the overall total, largest-remainder cent reconciliation with stable-ID tie-breaking, final USD results, and reconciliation equations |
| Acceptance wording | Deterministic Given/When/Then statements |

### 5.2 Period-generation scenarios

#### PER-W-01 — Monday-anchored weekly period generation

| Field | Value |
| --- | --- |
| Classification | Normal |
| Authority | CBD-67-AC01, CBD-67-AC02, CBD-67-AC05 |
| Base fixture | CAL-WEEK-01; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; no periods; USD cash, income, pending, settled, and spending values are all `0.00`; category targets and bills are Not applicable to period generation |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-01-19T09:00:00-05:00` America/New_York | ACTOR-01 selects Weekly with the default Monday anchor |
| T1 — Confirmation | `2028-01-19T09:05:00-05:00` America/New_York | ACTOR-01 confirms the current preview |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | Current `[2028-01-17, 2028-01-24)`; next periods `[2028-01-24, 2028-01-31)`, `[2028-01-31, 2028-02-07)`, and `[2028-02-07, 2028-02-14)`; every period contains seven dates |
| Schedule | One active weekly schedule version with Monday anchor and America/New_York |
| Targets | Not applicable; schedule confirmation does not invent category targets |
| Income / cash | Expected income `USD 0.00`; actual income `USD 0.00`; current cash `USD 0.00` |
| Transactions / bills | Pending `USD 0.00`; settled `USD 0.00`; actual spending `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; no warning or alert |
| Audit | One schedule-creation event records ACTOR-01, T1, Weekly, Monday, time zone, initial effective date 2028-01-17, and schedule-version identity |
| Non-changes | No income, cash, target, transaction, bill, or alert value changes |

**Given** SPACE-01 has no schedule and its budget date is 2028-01-19, **when** ACTOR-01 confirms Weekly with the default Monday anchor, **then** the complete current Monday-to-Sunday period and the next three contiguous seven-day periods are created exactly as listed.

#### PER-W-02 — Alternate weekday anchor across a DST change

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `dst`, `time-zone` |
| Authority | CBD-67-AC01, CBD-67-AC05, CBD-69-AC13 |
| Base fixture | CAL-WEEK-DST; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; Sunday is an unconfirmed alternate anchor; financial layers are all `USD 0.00` or Not applicable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-03-08T09:00:00-05:00` America/New_York | ACTOR-01 changes the weekly anchor from Monday to Sunday |
| T1 — Confirmation | `2028-03-08T09:05:00-05:00` America/New_York | ACTOR-01 confirms the refreshed preview |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | Current `[2028-03-05, 2028-03-12)`; next `[2028-03-12, 2028-03-19)` and `[2028-03-19, 2028-03-26)`; all contain seven budget dates |
| Schedule | One active weekly schedule version with Sunday anchor and America/New_York |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and current cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; DST produces no warning and no altered day count |
| Audit | One schedule-creation event records Sunday anchor, time zone, T1, and schedule-version identity |
| Non-changes | The 2028-03-12 offset change does not move a boundary or create a 6-day or 8-day period |

**Given** the named budget time zone enters daylight saving on 2028-03-12, **when** ACTOR-01 confirms a Sunday weekly anchor, **then** 2028-03-12 is a natural boundary and its period still contains exactly seven calendar dates.

#### PER-M-01 — Numbered monthly anchor in an ordinary month

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `year-boundary` |
| Authority | CBD-67-AC02, CBD-67-AC03 |
| Base fixture | CAL-YEAR-01; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; monthly anchor proposal is the numbered 15th; financial layers are `USD 0.00` or Not applicable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2027-12-20T09:00:00-05:00` America/New_York | ACTOR-01 selects Monthly and the numbered 15th anchor |
| T1 — Confirmation | `2027-12-20T09:05:00-05:00` America/New_York | ACTOR-01 confirms the preview |
| T2 — Year boundary passes | `2028-01-01T00:00:00-05:00` America/New_York | The calendar year changes inside the open current period |

| Outcome layer | Expected result |
| --- | --- |
| Period | Current `[2027-12-15, 2028-01-15)` displayed 2027-12-15–2028-01-14; next `[2028-01-15, 2028-02-15)` and `[2028-02-15, 2028-03-15)`. The current period spans the year change and is not split by it |
| Schedule | One active Monthly schedule version retaining the numbered anchor `15`; the same version remains authoritative across T2 |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted without clamping explanation or warning; T2 produces no notification, rollover prompt, or year-end action |
| Audit | One schedule-creation event records Monthly, numbered anchor 15, time zone, T1, and schedule-version identity; T2 creates no audit event |
| Non-changes | Crossing 2027–2028 at T2 does not close or split the open period, reset schedule identity, restart period numbering, reset target history, or create a gap |

**Given** a numbered monthly anchor of 15 confirmed on 2027-12-20, **when** the calendar year changes on 2028-01-01 inside the open period, **then** the complete current period remains `[2027-12-15, 2028-01-15)` and the next boundary is 2028-01-15 with no year-end effect on schedule identity or history.

#### PER-M-02 — Day-31 anchor clamps in a short month and returns

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `short-month`, `leap-year` |
| Authority | CBD-67-AC03, CBD-67-AC04, CBD-69-AC13 |
| Base fixture | CAL-MONTH-31; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; proposal stores the numbered anchor `31`; financial layers are `USD 0.00` or Not applicable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-01-30T09:00:00-05:00` America/New_York | Preview generates 2028-01-31, 2028-02-29, 2028-03-31, and 2028-04-30 boundaries |
| T1 — Confirmation | `2028-01-30T09:05:00-05:00` America/New_York | ACTOR-01 confirms the numbered-31 schedule |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | `[2028-01-31, 2028-02-29)`, `[2028-02-29, 2028-03-31)`, and `[2028-03-31, 2028-04-30)` are contiguous and non-overlapping |
| Schedule | Stored anchor remains numbered `31`; it is not rewritten to 29 or Last day |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; informational explanation states that February uses 2028-02-29 because it lacks a 31st and the schedule returns to the 31st in March; no warning or acknowledgement |
| Audit | One schedule-creation event retains configured anchor 31 and generated preview evidence |
| Non-changes | Clamping does not change the saved anchor or create a gap, overlap, or extra period |

**Given** a persisted numbered anchor of 31 in leap year 2028, **when** the preview reaches February, **then** the February boundary clamps to 2028-02-29 and the following boundary returns to 2028-03-31 without changing the stored rule.

#### PER-M-03 — Last-day anchor across leap February

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `last-day`, `leap-year` |
| Authority | CBD-67-AC03, CBD-67-AC04, CBD-69-AC13 |
| Base fixture | CAL-MONTH-LAST; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; proposal uses the explicit Last day rule; financial layers are `USD 0.00` or Not applicable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-01-30T10:00:00-05:00` America/New_York | Preview generates final-day boundaries for January through April |
| T1 — Confirmation | `2028-01-30T10:05:00-05:00` America/New_York | ACTOR-01 confirms Last day |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | `[2028-01-31, 2028-02-29)`, `[2028-02-29, 2028-03-31)`, and `[2028-03-31, 2028-04-30)` |
| Schedule | Stored and displayed anchor is `Last day`, distinct from numbered 31 |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; no clamping explanation because final-day generation is the direct rule |
| Audit | One schedule-creation event records the explicit Last day configuration |
| Non-changes | Matching numbered-31 boundary dates do not cause the configuration to be stored or displayed as 31 |

**Given** the explicit Last day rule, **when** ACTOR-01 confirms a schedule spanning leap February, **then** February begins on its actual last date while the persisted rule remains Last day and is not described as clamped.

#### PER-PAY-01 — Normal biweekly paycheck-period generation

| Field | Value |
| --- | --- |
| Classification | Normal |
| Authority | CBD-68-AC01, CBD-68-AC02 |
| Base fixture | CAL-PAY-BIWEEK; SPACE-01; ACTOR-01; INCOME-SCHED-01 |
| Starting state | No authoritative schedule; anchor income is projected at `USD 2,000.00` every 14 days from 2028-01-07; no receipts or account activity exist |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-03-01T09:00:00-05:00` America/New_York | ACTOR-01 selects Paycheck-based, INCOME-SCHED-01 as anchor, and Keep original calendar date |
| T1 — Confirmation | `2028-03-01T09:05:00-05:00` America/New_York | ACTOR-01 confirms the preview |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | Current `[2028-02-18, 2028-03-03)`; future `[2028-03-03, 2028-03-17)`, `[2028-03-17, 2028-03-31)`, and `[2028-03-31, 2028-04-14)` |
| Schedule | One open-ended paycheck schedule version; 14-day recurrence origin remains 2028-01-07 |
| Targets | Not applicable to boundary generation; no category is funded by projected income |
| Income / cash | Expected anchor occurrences are `USD 2,000.00`; actual income and current cash remain `USD 0.00` before receipt |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; no warning |
| Audit | One schedule-creation event records recurrence origin, anchor selection, policy, generated occurrences, and schedule version |
| Non-changes | Three March occurrences do not create a monthly budget timeline or any available-to-assign pool |

**Given** an every-14-days anchor schedule originating 2028-01-07, **when** ACTOR-01 confirms it as the canonical anchor, **then** each distinct occurrence opens one contiguous period ending immediately before the next occurrence.

#### PER-PAY-02 — Shifted paycheck occurrence leaves canonical boundaries unchanged

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `occurrence-exception`, `non-change` |
| Authority | CBD-68-AC01, CBD-68-AC09 |
| Base fixture | CAL-PAY-SKIP; SPACE-01; ACTOR-01; active SCHED-PAY-BIWEEK |
| Starting state | Canonical boundaries include 2028-02-18 and 2028-03-03; expected 2028-02-18 income is `USD 2,000.00`; actual income and cash are `USD 0.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial | `2028-02-10T09:00:00-05:00` America/New_York | Active schedule has no exception |
| T1 — Exception saved | `2028-02-10T09:05:00-05:00` America/New_York | ACTOR-01 shifts only the expected 2028-02-18 occurrence to 2028-02-17 |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | Canonical `[2028-02-18, 2028-03-03)` remains unchanged; no boundary is added on 2028-02-17 |
| Schedule | Recurrence origin, cadence, anchor schedule, and schedule version remain authoritative and unchanged |
| Targets | Unchanged; no target is recalculated or funded |
| Income / cash | Expected date changes to 2028-02-17 for this occurrence only; expected amount remains `USD 2,000.00`; actual income and cash remain `USD 0.00` |
| Transactions / bills | All remain `USD 0.00` or Not applicable |
| Validation / alerts | Accepted; preview explains that the projection changes but budget periods do not |
| Audit | One occurrence-exception event records original date, shifted date, actor, T1, and unchanged schedule-version reference |
| Non-changes | No canonical boundary, later recurrence date, spending target, actual-income value, or cash value changes |

**Given** a confirmed 2028-02-18 anchor occurrence, **when** ACTOR-01 shifts that expected occurrence to 2028-02-17, **then** only its projection changes and the canonical boundary remains 2028-02-18.

#### PER-PAY-03 — Remaining supported paycheck patterns generate deterministic periods

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `paycheck-patterns`, `twice-per-week`, `weekly`, `monthly`, `custom-week-interval` |
| Authority | CBD-68-AC01, CBD-68-AC14 |
| Base fixture | CAL-PAY-TWICE-WEEK; independent spaces SPACE-P2W, SPACE-PW, SPACE-PM, and SPACE-P3W; ACTOR-01; one new income schedule per space |
| Starting state | No authoritative schedule or period exists in any space. Proposals use Keep original calendar date and `USD 1,000.00` per occurrence: SPACE-P2W selects Monday and Thursday; SPACE-PW selects Monday weekly; SPACE-PM selects the 15th monthly; SPACE-P3W selects Monday every three weeks from 2028-08-07. Targets, actual income, cash, pending, settled spending, transactions, bills, alerts, and audit events are `USD 0.00`, empty, or Not applicable in every space |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Previews | `2028-08-01T09:00:00-04:00` America/New_York | ACTOR-01 previews all four proposals in their independent spaces |
| T1 — Confirmations | `2028-08-01T09:05:00-04:00` America/New_York | ACTOR-01 confirms each current preview independently |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | SPACE-P2W creates `[2028-08-07, 2028-08-10)`, `[2028-08-10, 2028-08-14)`, `[2028-08-14, 2028-08-17)`, and `[2028-08-17, 2028-08-21)` with day counts `3, 4, 3, 4`. SPACE-PW creates `[2028-08-07, 2028-08-14)` and `[2028-08-14, 2028-08-21)`. SPACE-PM creates `[2028-08-15, 2028-09-15)` and `[2028-09-15, 2028-10-15)`. SPACE-P3W creates `[2028-08-07, 2028-08-28)` and `[2028-08-28, 2028-09-18)`. Each schedule is open-ended, contiguous, and independent |
| Targets | Not applicable to boundary generation; no target is inferred from income |
| Income / cash | Each generated boundary has one expected occurrence of `USD 1,000.00` in its own space; actual income and cash remain `USD 0.00` in every space |
| Transactions / bills | Pending, settled, and actual spending remain `USD 0.00`; transactions and bills are empty |
| Validation / alerts | All four proposals are accepted; each preview names its explicit pattern and interval and produces no warning or alert |
| Audit | Each space has exactly one schedule-creation event recording its pattern-specific inputs, policy, expected amount, generated preview, actor, timestamp, and schedule version |
| Non-changes | No pattern creates a gap, overlap, zero-day period, target proration, actual receipt, cross-space effect, or finite expiration |

**Given** independent valid proposals for twice-per-week, weekly, monthly, and every-three-weeks paycheck patterns, **when** ACTOR-01 confirms them, **then** each pattern creates the exact indefinite canonical intervals above without gaps, overlaps, or effects on another space. Together with PER-PAY-01 every-two-weeks and PER-SEMI-01 twice-per-month, this demonstrates all six supported paycheck patterns.

#### PER-SEMI-01 — Normal semimonthly period generation

| Field | Value |
| --- | --- |
| Classification | Normal |
| Authority | CBD-68-AC02, CBD-68-AC11 |
| Base fixture | CAL-PAY-SEMI; SPACE-01; ACTOR-01; INCOME-SCHED-01 |
| Starting state | No authoritative schedule; proposal uses the 15th and Last day with Keep original calendar date; expected amount is `USD 1,500.00` per occurrence |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-02-10T09:00:00-05:00` America/New_York | Preview sorts 2028-01-31, 2028-02-15, 2028-02-29, and 2028-03-15 anchors |
| T1 — Confirmation | `2028-02-10T09:05:00-05:00` America/New_York | ACTOR-01 confirms the semimonthly anchor schedule |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | Current `[2028-01-31, 2028-02-15)`; next `[2028-02-15, 2028-02-29)` and `[2028-02-29, 2028-03-15)` |
| Schedule | One open-ended paycheck schedule version with ordered 15th and Last day anchors |
| Targets | Not applicable to boundary generation; expected income funds no category |
| Income / cash | Expected `USD 1,500.00` per occurrence; actual income and cash `USD 0.00` before receipt |
| Transactions / bills | Pending, settled, and spending `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; no warning |
| Audit | One schedule-creation event records both anchors, policy, order, schedule version, and generated preview |
| Non-changes | Leap February changes the Last day date but not the configured Last day rule or 15th anchor |

**Given** distinct 15th and Last day anchors, **when** ACTOR-01 confirms the semimonthly schedule, **then** each ordered anchor starts one contiguous canonical period.

#### PER-SEMI-02 — Adjusted semimonthly anchors collide on one date

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `holiday`, `deduplication` |
| Authority | CBD-68-AC07, CBD-68-AC08, CBD-68-AC11, CBD-69-AC13 |
| Base fixture | CAL-HOLIDAY-01; HOL-FED-2028-v1; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; twice-monthly source anchors are the 15th and 16th, each projecting `USD 1,000.00`; policy is Previous business day |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-01-10T09:00:00-05:00` America/New_York | 2028-01-15 and 2028-01-16 both adjust to 2028-01-14 |
| T1 — Confirmation | `2028-01-10T09:05:00-05:00` America/New_York | ACTOR-01 confirms the preview with both provenance records visible |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | One deduplicated 2028-01-14 boundary; next distinct adjusted boundary is 2028-02-15; canonical interval is `[2028-01-14, 2028-02-15)` |
| Schedule | Both configured source anchors and both adjusted occurrence records remain stored; boundary generator uses one distinct adjusted date |
| Targets | Not applicable to boundary generation |
| Income / cash | Two expected occurrences retain separate identity and amounts; actual income and cash remain `USD 0.00` until receipt |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; informational preview explains the shared adjusted date; no zero-day period and no blocking duplicate error |
| Audit | One schedule-creation event records both unadjusted dates, shared adjusted date, policy, holiday-data version, and deduplication result |
| Non-changes | Source occurrences are not merged, deleted, or silently rewritten; only boundary creation deduplicates the date |

**Given** distinct source anchors that both adjust to 2028-01-14, **when** ACTOR-01 confirms, **then** both occurrences remain traceable but exactly one boundary is generated for that date.

#### PER-MULTI-01 — Multiple income schedules share one canonical timeline

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `multiple-income` |
| Authority | CBD-68-AC02, CBD-68-AC03 |
| Base fixture | CAL-MULTI-01; SPACE-01; ACTOR-01; INCOME-SCHED-01; INCOME-SCHED-02 |
| Starting state | No authoritative schedule; anchor income is biweekly `USD 2,000.00`; secondary income is monthly `USD 600.00`; no receipts exist |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-03-01T10:00:00-05:00` America/New_York | ACTOR-01 selects INCOME-SCHED-01 as the only canonical anchor |
| T1 — Confirmation | `2028-03-01T10:05:00-05:00` America/New_York | ACTOR-01 confirms both schedules and the anchor choice atomically |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | Current `[2028-02-18, 2028-03-03)`; future `[2028-03-03, 2028-03-17)`, `[2028-03-17, 2028-03-31)`, and `[2028-03-31, 2028-04-14)` derive only from INCOME-SCHED-01 |
| Schedule | One canonical budget timeline; INCOME-SCHED-01 is anchor and INCOME-SCHED-02 is secondary |
| Targets | Not applicable to boundary generation; neither income schedule funds categories |
| Income / cash | Expected anchor and secondary amounts remain distinct; actual income and cash remain `USD 0.00` before receipts |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; no warning |
| Audit | One schedule-creation event records both income schedules, exact anchor selection, canonical periods, and schedule version |
| Non-changes | The secondary 2028-03-15 occurrence creates no boundary and cannot promote itself to anchor through receipt or reconciliation |

**Given** one anchor and one secondary income schedule, **when** ACTOR-01 confirms them, **then** only the anchor generates budget boundaries and the secondary occurrence remains inside the applicable canonical period.

#### PER-CUST-01 — Valid contiguous fixed-length custom recurrence

| Field | Value |
| --- | --- |
| Classification | Normal |
| Authority | CBD-68-AC12 |
| Base fixture | CAL-CUSTOM-01; SPACE-01; ACTOR-01 |
| Starting state | No authoritative schedule; proposal has start 2028-01-03 and whole-number length 10; financial layers are `USD 0.00` or Not applicable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-01-02T09:00:00-05:00` America/New_York | Preview generates the first four ten-day periods |
| T1 — Confirmation | `2028-01-02T09:05:00-05:00` America/New_York | ACTOR-01 confirms the fixed-length rule |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period | `[2028-01-03, 2028-01-13)`, `[2028-01-13, 2028-01-23)`, `[2028-01-23, 2028-02-02)`, and `[2028-02-02, 2028-02-12)`; each contains 10 dates |
| Schedule | One open-ended custom schedule version with immutable start boundary and fixed length 10 |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Accepted; no gap, overlap, finite end, or warning |
| Audit | One schedule-creation event records start, length, time zone, preview, and schedule version |
| Non-changes | Month and leap boundaries do not alter the ten-date length or create a hand-authored period |

**Given** a custom start of 2028-01-03 and fixed length 10, **when** ACTOR-01 confirms, **then** the system generates an indefinite sequence of contiguous, non-overlapping ten-date intervals.

#### PER-CUST-02 — One-day and 366-day custom-period boundaries

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `minimum`, `maximum`, `leap-year` |
| Authority | CBD-68-AC12, CBD-69-AC13 |
| Base fixture | CAL-CUSTOM-LIMIT; SPACE-01; ACTOR-01 |
| Starting state | Two independent clean budget spaces, `SPACE-CMIN` and `SPACE-CMAX`, each with start 2028-01-01, no authoritative schedule, and financial layers of `USD 0.00` or Not applicable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial state | `2027-12-31T08:55:00-05:00` America/New_York | SPACE-CMIN and SPACE-CMAX are independent and have no schedules |
| T1 — Minimum confirmation | `2027-12-31T09:05:00-05:00` America/New_York | ACTOR-01 previews and confirms length 1 in SPACE-CMIN |
| T2 — Maximum confirmation | `2027-12-31T10:05:00-05:00` America/New_York | ACTOR-01 previews and confirms length 366 in SPACE-CMAX |

| Outcome layer | Expected result |
| --- | --- |
| Period | Variant A first interval `[2028-01-01, 2028-01-02)`; Variant B first interval `[2028-01-01, 2029-01-01)`; both repeat contiguously |
| Schedule | Each variant creates one separate open-ended custom schedule version; neither creates a finite schedule |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, and spending remain `USD 0.00`; bills Not applicable |
| Validation / alerts | Both boundary values are accepted without warning; zero and 367 are handled later by VAL-03 |
| Audit | T1 and T2 each create one schedule-creation event in the applicable budget space with its exact length and first interval |
| Non-changes | Leap day is included in the 366-date interval but does not create a 367th date; neither variant affects the other |

**Given** the allowed custom range is 1–366 whole calendar days, **when** independent clean spaces confirm lengths 1 and 366 from 2028-01-01, **then** both are accepted and generate exactly `[2028-01-01, 2028-01-02)` and `[2028-01-01, 2029-01-01)` respectively.

### 5.3 Setup, schedule-change, and history scenarios

#### SET-01 — Weekly onboarding opens the current period and previews three future periods

| Field | Value |
| --- | --- |
| Classification | Normal |
| Authority | CBD-67-AC02, CBD-67-AC06 |
| Base fixture | CAL-WEEK-01; SPACE-01; ACTOR-01 |
| Starting state | New budget named `CoBudget Home`; no schedule, periods, transactions, bills, income, targets, alerts, or audit events; all applicable monetary values `USD 0.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Entry | `2028-01-19T11:00:00-05:00` America/New_York | Weekly onboarding opens with Monday selected by default |
| T1 — Preview | `2028-01-19T11:01:00-05:00` America/New_York | Required inputs validate and preview `PREVIEW-SET-01` is generated |
| T2 — Confirmation | `2028-01-19T11:05:00-05:00` America/New_York | ACTOR-01 confirms the unexpired preview |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | Current `[2028-01-17, 2028-01-24)` plus the next three CAL-WEEK-01 periods; one active Monday-weekly schedule version |
| Targets / income / cash | Targets Not applicable; expected income, actual income, and cash remain `USD 0.00` |
| Transactions / bills | Pending, settled, spending, and bills remain empty and `USD 0.00` where applicable |
| Validation / alerts | Budget name, time zone, cadence, and anchor are valid; confirmation is enabled only for the current preview; no alert |
| Audit | T2 atomically creates one schedule-creation event with actor, preview identity, configuration, effective date, and schedule version |
| Non-changes | No account, target, income, transaction, bill, or alert is invented by onboarding |

**Given** all required weekly setup inputs are valid, **when** ACTOR-01 confirms the current preview, **then** the complete current anchored period and at least three future periods are created atomically with one schedule version and audit event.

#### SET-02 — Monthly setup validates anchor and previews clamped periods

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `preview`, `clamping` |
| Authority | CBD-67-AC03, CBD-67-AC04, CBD-67-AC06 |
| Base fixture | CAL-MONTH-31; SPACE-01; ACTOR-01 |
| Starting state | New budget; no authoritative schedule or financial activity; proposal is Monthly with numbered anchor 31 |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Input | `2028-01-30T11:00:00-05:00` America/New_York | ACTOR-01 selects numbered anchor 31 |
| T1 — Preview | `2028-01-30T11:01:00-05:00` America/New_York | Preview shows 2028-01-31, 2028-02-29, 2028-03-31, and 2028-04-30 boundaries |
| T2 — Confirmation | `2028-01-30T11:05:00-05:00` America/New_York | ACTOR-01 confirms the current preview |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | CAL-MONTH-31 periods are created; stored schedule rule remains numbered 31 |
| Targets / income / cash | Targets Not applicable; all income and cash values remain `USD 0.00` |
| Transactions / bills | Empty; pending, settled, and spending `USD 0.00` |
| Validation / alerts | Required inputs pass; leap-February clamping explanation is informational and requires no acknowledgement |
| Audit | One schedule-creation event records anchor 31, generated dates, preview identity, actor, timestamp, and schedule version |
| Non-changes | The preview does not rewrite 31 to 29 or Last day and does not create a warning state |

**Given** a valid numbered-31 monthly proposal, **when** ACTOR-01 reviews and confirms the refreshed preview, **then** the schedule activates with deterministic clamped boundaries while preserving the configured anchor.

#### SET-03 — Paycheck and custom setup preview uses the cadence-neutral model

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `adapter`, `atomic-confirmation` |
| Authority | CBD-68-AC13, CBD-68-AC16 |
| Base fixture | CAL-PAY-BIWEEK and CAL-CUSTOM-01; independent spaces SPACE-PSET and SPACE-CSET; ACTOR-01 |
| Starting state | Both spaces have no schedule; reviewed full-period targets are explicitly supplied for CAT-01–03; no income receipts or transactions exist |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial | `2028-01-02T12:00:00-05:00` America/New_York | Both independent spaces are clean |
| T1 — Custom confirmation | `2028-01-02T12:10:00-05:00` America/New_York | SPACE-CSET confirms start 2028-01-03, length 10, first periods, and reviewed targets |
| T2 — Paycheck confirmation | `2028-03-01T12:10:00-05:00` America/New_York | SPACE-PSET confirms a current preview containing recurrence origin, anchor identity, policy, occurrence dates, canonical periods, and reviewed targets |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | SPACE-PSET receives one biweekly paycheck schedule; SPACE-CSET receives one ten-day custom schedule; both are open-ended, contiguous, and versioned |
| Targets | Reviewed targets remain explicit inputs by stable category; income does not fund them; no cross-cadence amount is assumed |
| Income / cash | Paycheck projections are expected income only; actual income and cash remain `USD 0.00`; custom setup has no income requirement |
| Transactions / bills | Empty and `USD 0.00` where applicable |
| Validation / alerts | Both previews are current, under 30 minutes old, and dependency fingerprints match; no alert |
| Audit | T1 and T2 each atomically create one schedule version, periods, applicable expected occurrences, and one schedule-creation audit event in the correct space |
| Non-changes | The two spaces cannot affect each other; neither confirmation creates an allocation pool or finite expiration |

**Given** complete cadence-specific inputs and reviewed targets, **when** the independent paycheck and custom previews are confirmed, **then** each adapter produces one deterministic open-ended schedule without inferring targets from income or another cadence.

#### PREV-01 — Expired or stale previews block confirmation while display-only changes do not

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `preview-expiry`, `dependency-fingerprint`, `local-midnight`, `refresh` |
| Authority | CBD-68-AC08, CBD-68-AC16 |
| Base fixture | CAL-PAY-BIWEEK and CAL-HOLIDAY-01; HOL-FED-2028-v1/v2; independent SPACE-DISPLAY, SPACE-EXPIRE, SPACE-DEPENDENCY, and SPACE-MIDNIGHT; ACTOR-01 |
| Starting state | Each space has no authoritative schedule, periods, income receipts, transactions, bills, alerts, or success audit event; each proposal has reviewed targets `USD 175.01`, actual income `USD 0.00`, cash `USD 1,000.00`, and complete valid inputs; no preview exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Display preview | `2028-12-01T09:00:00-05:00` America/New_York | SPACE-DISPLAY generates PREVIEW-DISPLAY-01 |
| T1 — Display-only change | `2028-12-01T09:05:00-05:00` America/New_York | ACTOR-01 changes only an avatar label that is outside the dependency fingerprint |
| T2 — Display confirmation | `2028-12-01T09:10:00-05:00` America/New_York | PREVIEW-DISPLAY-01 confirms successfully |
| T3 — Expiry preview | `2028-12-01T10:00:00-05:00` America/New_York | SPACE-EXPIRE generates PREVIEW-EXPIRE-01 |
| T4 — Expired confirmation | `2028-12-01T10:30:01-05:00` America/New_York | ACTOR-01 submits PREVIEW-EXPIRE-01 after its 30-minute lifetime |
| T5 — Dependency preview | `2028-12-01T11:00:00-05:00` America/New_York | SPACE-DEPENDENCY previews the December 25 occurrence with HOL-FED-2028-v1 |
| T6 — Result dependency changes | `2028-12-01T11:05:00-05:00` America/New_York | Verified HOL-FED-2028-v2 replaces v1 for unconfirmed work |
| T7 — Midnight preview | `2028-12-01T23:59:00-05:00` America/New_York | SPACE-MIDNIGHT generates PREVIEW-MIDNIGHT-01 for budget date December 1 |
| T8 — Midnight confirmation | `2028-12-02T00:00:01-05:00` America/New_York | ACTOR-01 submits after the authoritative budget date changes |
| T9 — Refresh | `2028-12-02T00:05:00-05:00` America/New_York | Expired and stale spaces refresh while preserving their entered values |

| Outcome layer | Expected result at T9 |
| --- | --- |
| Period / schedule | Only SPACE-DISPLAY creates one schedule version at T2. T4, T6, and T8 create no authoritative period or schedule; T9 produces new non-authoritative previews bound to current time, date, and HOL-FED-2028-v2 |
| Targets | Every reviewed target remains `USD 175.01`; refresh preserves entered targets but creates no authoritative target until a refreshed preview is confirmed |
| Income / cash | Expected income changes only inside refreshed projections; actual income remains `USD 0.00` and cash remains `USD 1,000.00` in every space |
| Transactions / bills | Empty and unchanged; preview invalidation creates no transaction, settlement, or bill effect |
| Validation / alerts | T4 says `This preview expired. Refresh it before confirming.` T6 says holiday data changed and identifies v1/v2. T8 says the budget date changed. Each stale state offers Refresh preview, retains inputs, and blocks confirmation; the display-only change does not invalidate T2; no financial alert |
| Audit | T2 creates one schedule-creation event. Preview generation, invalidation reason, fingerprint versions, and refresh identities remain distinguishable operational evidence; rejected confirmations create no success event |
| Non-changes | Expiry, dependency change, and midnight crossing create no partial schedule, period, expected occurrence, target, cash movement, or success audit; confirmed v1 history elsewhere is never recalculated by v2 |

**Given** four otherwise valid previews, **when** one receives only a display change while the others expire, lose a dependency match, or cross local midnight, **then** only the display-only case confirms and every stale case preserves inputs but requires a new preview.

#### PREV-02 — Atomic activation failure recovers and duplicate confirmation is idempotent

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `atomicity`, `activation-failure`, `retry`, `idempotency` |
| Authority | CBD-68-AC16 |
| Base fixture | CAL-CUSTOM-01; SPACE-PREV-RECOVERY; ACTOR-01; CAT-01–03; stable confirmation identity CONFIRM-CUSTOM-01 |
| Starting state | No schedule, period, target, expected or actual income, cash account, transaction, bill, alert, or success audit exists; valid custom inputs are start 2028-01-03 and length 10; reviewed targets total `USD 500.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Current preview | `2028-01-02T09:00:00-05:00` America/New_York | PREVIEW-CUSTOM-01 is generated with a matching dependency fingerprint |
| T1 — Activation failure | `2028-01-02T09:05:00-05:00` America/New_York | CONFIRM-CUSTOM-01 encounters a deterministic recoverable persistence failure before atomic commit |
| T2 — Refreshed preview | `2028-01-02T09:10:00-05:00` America/New_York | Inputs are retained and PREVIEW-CUSTOM-02 is generated |
| T3 — Retry succeeds | `2028-01-02T09:15:00-05:00` America/New_York | CONFIRM-CUSTOM-02 atomically commits the refreshed result |
| T4 — Duplicate request | `2028-01-02T09:15:05-05:00` America/New_York | The exact CONFIRM-CUSTOM-02 identity is replayed |

| Outcome layer | Expected result at T4 |
| --- | --- |
| Period / schedule | T1 leaves zero authoritative rows. T3 creates exactly one open-ended ten-day schedule and periods `[2028-01-03, 2028-01-13)`, `[2028-01-13, 2028-01-23)`, and `[2028-01-23, 2028-02-02)`; T4 returns the same outcome |
| Targets | Exactly one reviewed target set totaling `USD 500.00` is linked to the created schedule; neither failure nor replay duplicates it |
| Income / cash | Expected and actual income remain `USD 0.00`; cash is Not applicable because no account is selected |
| Transactions / bills | Empty; activation, retry, and replay synthesize no financial activity |
| Validation / alerts | T1 shows `We couldn't activate this schedule. Your current budget was not changed. Review and try again.` T2 offers the retained inputs. T3 succeeds; T4 is not shown as an error; no financial alert |
| Audit | Failure evidence records the attempted identity and zero committed objects. Exactly one schedule-creation success event records CONFIRM-CUSTOM-02; the replay creates no second successful-action event |
| Non-changes | T1 cannot leave a schedule without periods, periods without a version, targets without their version, or any partial success; T4 duplicates no version, period, target, or audit success |

**Given** a valid custom preview whose first activation fails before commit, **when** ACTOR-01 refreshes, retries successfully, and replays the successful confirmation identity, **then** the final state contains exactly one complete schedule outcome and no partial or duplicate records.

#### A11Y-01 — Schedule, preview, validation, and reconciliation remain keyboard and screen-reader operable

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `accessibility`, `keyboard`, `screen-reader`, `focus`, `live-region` |
| Authority | CBD-68-AC16 |
| Base fixture | CAL-HOLIDAY-01 and CAL-SAME-DATE; independent SPACE-A11Y-SCHEDULE and SPACE-A11Y-MATCH; ACTOR-01 using keyboard and a screen reader; CAT-01 target `USD 200.00` |
| Starting state | SPACE-A11Y-SCHEDULE has no schedule or financial activity and an incomplete twice-per-month proposal; SPACE-A11Y-MATCH has one expected `USD 600.00` occurrence and one same-date actual `USD 630.00` candidate, cash `USD 1,630.00`, actual income `USD 630.00`, no expense, bill, or alert; visible focus begins on the schedule heading |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Keyboard entry | `2028-01-05T09:00:00-05:00` America/New_York | ACTOR-01 reaches every recurrence, date, policy, and amount input without a pointer |
| T1 — Blocked validation | `2028-01-05T09:05:00-05:00` America/New_York | Required second monthly anchor is omitted and preview is requested |
| T2 — Accessible preview update | `2028-01-05T09:10:00-05:00` America/New_York | ACTOR-01 supplies Last day; preview recalculates original/adjusted dates and three chronological periods |
| T3 — Same-date match review | `2028-01-05T09:15:00-05:00` America/New_York | ACTOR-01 reviews and confirms the `USD 600.00 → USD 630.00` reconciliation candidate by keyboard |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | T2 remains a non-authoritative preview with semantic headings/table headers, textual old/short/full labels where applicable, inclusive dates, day counts, and budget time-zone context; no schedule is confirmed in this scenario |
| Targets | CAT-01 remains `USD 200.00`; currency and sign are exposed programmatically and no target is inferred from income |
| Income / cash | Expected `USD 600.00`, received `USD 630.00`, and `USD 30.00` variance are announced as distinct text states; cash remains `USD 1,630.00` because reviewing the existing receipt moves no money |
| Transactions / bills | Same-date expected and actual records remain individually reachable with source, amount, status, and match identity; expenses and bills remain empty |
| Validation / alerts | Every input has a persistent visible/programmatic label. T1 moves focus to a linked error summary without erasing values. T2 announces `Preview updated: three budget periods changed` through a polite live region and never relies on color alone. T3 exposes match status and success without visual monitoring; no financial alert |
| Audit | One user-confirmed reconciliation event records actor, timestamp, before/after match state, expected/actual amounts, and candidate identity; keyboard or assistive-technology use changes no audit semantics |
| Non-changes | Focus order, focus return, reduced-motion preference, and structured text alternatives cannot change schedule, period, target, cash, source data, or permission state |

**Given** keyboard-only and screen-reader interaction, **when** validation, recalculation, and reconciliation states occur, **then** labels, focus, status, dates, amounts, and recovery actions remain perceivable and operable without color, pointer input, or visual monitoring.

#### CHG-01 — Immediate monthly-to-weekly mid-period change with proration

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `immediate`, `proration`, `mid-period` |
| Authority | CBD-67-AC07, CBD-67-AC10, CBD-67-AC12, CBD-67-AC15, CBD-67-AC16, CBD-67-AC19 |
| Base fixture | CAL-TRANS-MID variant A; SPACE-01; ACTOR-01; CAT-01–03 |
| Starting state | Monthly-on-the-1st is active on 2028-06-14; current cash `USD 1,000.00`; settled TX-OLD `USD 20.00` dated 2028-06-13; settled TX-EFFECTIVE `USD 30.00` dated 2028-06-14; BILL-CHANGE `USD 40.00` due 2028-06-19; no pending change |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial | `2028-06-14T09:00:00-04:00` America/New_York | Monthly schedule is authoritative for dates through 2028-06-13 |
| T1 — Preview | `2028-06-14T09:05:00-04:00` America/New_York | ACTOR-01 previews immediate Weekly/Monday with reviewed targets from CAL-TRANS-MID |
| T2 — Confirmation | `2028-06-14T09:10:00-04:00` America/New_York | ACTOR-01 confirms the current preview; execution is immediate for the entire budget date |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Old `[2028-06-01, 2028-07-01)` closes as `[2028-06-01, 2028-06-14)`; transition `[2028-06-14, 2028-06-19)`; first full weekly `[2028-06-19, 2028-06-26)`; Weekly/Monday is authoritative; no pending record |
| Targets | Transition exact total `USD 125.007142…`, rounded once to `USD 125.01`; reconciled CAT-01 `71.43`, CAT-02 `35.72`, CAT-03 `17.86`; first full weekly total `USD 175.01` |
| Income / cash | Expected and actual income unchanged; cash remains `USD 1,000.00` because the schedule action itself moves no money |
| Transactions / bills | TX-OLD remains in the shortened old period; TX-EFFECTIVE belongs to the transition despite arriving before confirmation; BILL-CHANGE belongs to the first full weekly period; no amount is prorated |
| Validation / alerts | Accepted; preview explicitly labels the five-day transition and states that the effective date is not backdated |
| Audit | Linked Change confirmed and Change executed events record actor, timestamp, old/new versions, exact periods, calculation inputs, final reconciled targets, and financial references |
| Non-changes | Historical activity before 2028-06-14, transaction/bill amounts, income, and cash do not change; no remainder or overspending carries forward |

**Given** monthly-on-the-1st is active on Wednesday 2028-06-14, **when** ACTOR-01 confirms an immediate Monday-weekly change, **then** the old period closes June 13, a five-day transition starts June 14 with `USD 125.01` reconciled targets, and the first full week starts June 19.

#### CHG-02 — Future weekly-to-monthly mid-period change

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `future`, `mid-period`, `pending` |
| Authority | CBD-67-AC07–AC10, CBD-67-AC15–AC17, CBD-67-AC19 |
| Base fixture | CAL-TRANS-MID variant B; SPACE-01; ACTOR-01; CAT-01–03 |
| Starting state | Weekly/Monday schedule is active on 2028-06-01; no pending change; reviewed monthly targets total `USD 2,100.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial | `2028-06-01T09:00:00-04:00` America/New_York | Current weekly schedule remains authoritative |
| T1 — Preview | `2028-06-01T09:05:00-04:00` America/New_York | ACTOR-01 previews Monthly/1st effective 2028-06-14 |
| T2 — Confirmation | `2028-06-01T09:10:00-04:00` America/New_York | ACTOR-01 confirms the future change |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Current weekly schedule and periods remain authoritative; one pending record stores effective date 2028-06-14 and previewed shortened `[2028-06-12, 2028-06-14)`, transition `[2028-06-14, 2028-07-01)`, and first full `[2028-07-01, 2028-08-01)` |
| Targets | Pending preview shows exact 17/30 transition targets CAT-01 `USD 680.00`, CAT-02 `340.00`, CAT-03 `170.00`, total `USD 1,190.00`; no authoritative target changes yet |
| Income / cash / transactions / bills | All authoritative financial state remains unchanged until execution |
| Validation / alerts | Accepted; pending summary is visible and clearly separate from the current schedule |
| Audit | Linked Change confirmed and Change scheduled events record one immutable pending revision; no future schedule version or Change executed event exists yet |
| Non-changes | Confirmation does not shorten a current period, materialize the transition, replace the active version, or create a second pending record |

**Given** Weekly/Monday is active on 2028-06-01, **when** ACTOR-01 confirms Monthly/1st effective 2028-06-14, **then** one pending change is created with exact 17-day transition results while the weekly schedule remains authoritative.

#### CHG-03 — Weekly-to-monthly boundary-aligned change without proration

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `future`, `boundary-aligned` |
| Authority | CBD-67-AC07, CBD-67-AC11, CBD-67-AC15, CBD-67-AC16, CBD-67-AC19 |
| Base fixture | CAL-TRANS-BOUND variant B; SPACE-01; ACTOR-01 |
| Starting state | Weekly/Monday is active on 2028-06-20; no pending change; reviewed Monthly/1st targets total `USD 2,100.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial | `2028-06-20T09:00:00-04:00` America/New_York | Weekly schedule is authoritative |
| T1 — Confirmation | `2028-06-20T09:10:00-04:00` America/New_York | ACTOR-01 confirms Monthly/1st effective 2028-07-01 after reviewing the current preview |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | One pending change previews shortened old weekly `[2028-06-26, 2028-07-01)` and first full monthly `[2028-07-01, 2028-08-01)` |
| Targets | First monthly period shows full reviewed `USD 2,100.00`; no transition target or formula exists |
| Financial layers | Income, cash, transactions, bills, and authoritative targets remain unchanged before execution |
| Validation / alerts | Accepted; preview states that the date is a natural boundary and omits all transition rows and warnings |
| Audit | Change confirmed and Change scheduled events; no future schedule version yet |
| Non-changes | No transition period, proration, carry-forward, or immediate period change |

**Given** Weekly/Monday is active, **when** Monthly/1st is scheduled for its natural 2028-07-01 boundary, **then** the preview creates no transition and uses the full monthly target.

#### CHG-04 — Monthly-to-weekly boundary-aligned change

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `immediate`, `boundary-aligned` |
| Authority | CBD-67-AC07, CBD-67-AC11, CBD-67-AC15–AC17, CBD-67-AC19 |
| Base fixture | CAL-TRANS-BOUND variant A; SPACE-01; ACTOR-01 |
| Starting state | Monthly/1st is active on Monday 2028-06-19; no pending change; reviewed weekly targets total `USD 175.01` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Initial | `2028-06-19T09:00:00-04:00` America/New_York | Monthly schedule governed dates through 2028-06-18 |
| T1 — Confirmation | `2028-06-19T09:10:00-04:00` America/New_York | ACTOR-01 confirms immediate Weekly/Monday |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Old period closes as `[2028-06-01, 2028-06-19)`; first weekly `[2028-06-19, 2028-06-26)`; Weekly/Monday becomes authoritative |
| Targets | First weekly period receives full CAT-01–03 total `USD 175.01`; no transition target |
| Financial layers | Income, cash, transaction amounts, and bill amounts remain unchanged; dates before June 19 remain old-schedule history |
| Validation / alerts | Accepted; explicit no-transition/no-proration explanation |
| Audit | Linked Change confirmed and Change executed events; one new authoritative schedule version |
| Non-changes | No pending record, transition period, proration, or carry-forward is created |

**Given** 2028-06-19 is a Monday natural boundary, **when** ACTOR-01 confirms an immediate Weekly/Monday change, **then** a full week begins that date with full targets and no transition.

#### CHG-05 — Custom cadence change uses the CBD-67 adapter

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `custom`, `adapter`, `proration` |
| Authority | CBD-68-AC13, CBD-68-AC16 |
| Base fixture | CAL-TRANS-MID variant C; SPACE-01; ACTOR-01; CAT-01–03 |
| Starting state | Monthly/1st is active on 2028-06-14; proposed custom rule starts from natural boundary 2028-06-10 and repeats every 10 days; reviewed full custom targets total `USD 500.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-06-14T10:00:00-04:00` America/New_York | Adapter supplies recurrence identity, boundaries, first three periods, provenance, and reviewed targets |
| T1 — Confirmation | `2028-06-14T10:10:00-04:00` America/New_York | ACTOR-01 confirms immediate custom cadence |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Old monthly closes before 2028-06-14; custom transition `[2028-06-14, 2028-06-20)`; first full custom `[2028-06-20, 2028-06-30)`; one custom schedule version becomes authoritative |
| Targets | Six-of-ten-day transition: CAT-01 `USD 180.00`, CAT-02 `90.00`, CAT-03 `30.00`, total `USD 300.00`; first full custom total `USD 500.00` |
| Financial layers | Income, cash, transactions, and bills remain unchanged; none are prorated or used to infer targets |
| Validation / alerts | Accepted; adapter proves contiguous open-ended generation and current preview integrity |
| Audit | Change confirmed and Change executed record cadence-specific rule, basis period, proration, target provenance, and old/new versions |
| Non-changes | The effective date is not moved to 2028-06-10; completed history and source financial dates remain unchanged |

**Given** the custom adapter supplies a ten-day rule with reviewed targets, **when** ACTOR-01 confirms it effective 2028-06-14, **then** CBD-67 creates the exact six-day transition and first full custom period without inferring targets.

#### CHG-06 — Edit a pending future schedule change

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `pending`, `edit` |
| Authority | CBD-67-AC09, CBD-67-AC17 |
| Base fixture | CAL-TRANS-BOUND; SPACE-01; ACTOR-01 |
| Starting state | Monthly/1st is authoritative; pending record CHANGE-01 proposes Weekly/Monday effective 2028-06-19; its original confirmed revision remains immutable |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Pending summary | `2028-06-05T09:00:00-04:00` America/New_York | CHANGE-01 is visible with Edit and Cancel actions |
| T1 — Edit opened | `2028-06-05T09:02:00-04:00` America/New_York | ACTOR-01 opens a non-authoritative revision; no audit event occurs |
| T2 — Refreshed preview | `2028-06-05T09:05:00-04:00` America/New_York | Effective date changes to 2028-06-26 and preview is regenerated |
| T3 — Revision confirmed | `2028-06-05T09:10:00-04:00` America/New_York | ACTOR-01 confirms the revised pending change |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | Monthly/1st remains authoritative; CHANGE-01 remains the single pending record, now with a new immutable confirmed revision effective 2028-06-26 |
| Targets / financial layers | Revised preview stores applicable full weekly targets; no authoritative target, income, cash, transaction, or bill value changes before execution |
| Validation / alerts | Accepted; prior preview became stale and could not be reused; no alert |
| Audit | Exactly one Pending change edited event records pending ID, before/after effective dates, preview and confirmation references, actor, and current schedule version |
| Non-changes | No concurrent second pending record, future schedule version, period closure, or execution event is created; the original revision remains in history |

**Given** one confirmed pending change exists, **when** ACTOR-01 edits its effective date and confirms a refreshed preview, **then** the same pending lifecycle receives a new immutable revision while the current schedule remains authoritative.

#### CHG-07 — Cancel a pending future schedule change

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `pending`, `cancel` |
| Authority | CBD-67-AC09, CBD-67-AC17 |
| Base fixture | CAL-TRANS-BOUND; SPACE-01; ACTOR-01 |
| Starting state | Monthly/1st is authoritative; CHANGE-01 proposes Weekly/Monday effective 2028-06-19; no other pending change exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Pending summary | `2028-06-05T10:00:00-04:00` America/New_York | CHANGE-01 is visible |
| T1 — Cancellation review | `2028-06-05T10:02:00-04:00` America/New_York | Confirmation identifies pending cadence, anchor, and effective date |
| T2 — Cancellation confirmed | `2028-06-05T10:05:00-04:00` America/New_York | ACTOR-01 explicitly confirms cancellation |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | CHANGE-01 is canceled; Monthly/1st and all existing periods remain authoritative and unchanged; a new blank proposal may now be started |
| Financial layers | Targets, income, cash, transactions, bills, spending, and alerts remain unchanged |
| Validation | Accepted; cancellation removes only the future change |
| Audit | One Pending change canceled event retains pending ID, canceled revision, cadence, anchor, effective date, actor, timestamp, and unchanged current schedule reference |
| Non-changes | No replacement schedule version, period, transition, execution event, or requested cancellation reason is created |

**Given** CHANGE-01 is the single confirmed future change, **when** ACTOR-01 explicitly confirms cancellation, **then** only that pending lifecycle is canceled and the current schedule remains unchanged.

#### CHG-08 — Reject a second pending schedule change

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `concurrency`, `single-pending` |
| Authority | CBD-67-AC08, CBD-67-AC09 |
| Base fixture | CAL-TRANS-BOUND; SPACE-01; ACTOR-01 |
| Starting state | Monthly/1st is authoritative; CHANGE-01 is confirmed pending for Weekly/Monday effective 2028-06-19; targets total `USD 175.01`; expected and actual income `USD 0.00`; cash `USD 1,000.00`; pending activity, settled spending, and actual spending `USD 0.00`; no transaction, bill, validation error, or alert exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Entry attempt | `2028-06-05T11:00:00-04:00` America/New_York | ACTOR-01 opens the schedule-change entry point or an old new-change link |
| T1 — Existing summary | `2028-06-05T11:00:01-04:00` America/New_York | The interface opens CHANGE-01 rather than a blank proposal |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Current schedule and CHANGE-01 remain unchanged; pending count remains exactly one |
| Targets | Target total remains `USD 175.01` |
| Income / cash | Expected and actual income remain `USD 0.00`; cash remains `USD 1,000.00` |
| Transactions / bills | Pending, settled, and actual spending remain `USD 0.00`; transaction and bill sets remain empty |
| Validation / alerts | New proposal is unavailable; explanation: “This budget already has a scheduled change. Edit or cancel it before creating another change.” This is workflow guidance, not a financial alert |
| Audit | No event; viewing the existing pending summary and being prevented from starting a second normal workflow are not mutations or security violations |
| Non-changes | No draft, preview, confirmation, schedule version, period, or second pending identifier is created |

**Given** one confirmed pending change exists, **when** ACTOR-01 attempts to start another independent change, **then** the existing summary opens and no second proposal or state change is created.

#### CHG-09 — Reject past and otherwise invalid effective dates

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `validation`, `midnight` |
| Authority | CBD-67-AC07, CBD-69-AC14 |
| Base fixture | CAL-TRANS-MID; SPACE-01; ACTOR-01 |
| Starting state | Monthly/1st is authoritative; budget date is 2028-06-14; Weekly/Monday differs from the current schedule; no pending change; targets total `USD 175.01`; expected and actual income `USD 0.00`; cash `USD 1,000.00`; pending activity, settled spending, and actual spending `USD 0.00`; no transaction, bill, validation error, or alert exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Missing date | `2028-06-14T23:55:00-04:00` America/New_York | Changed cadence is selected but effective date is empty |
| T1 — Past submission | `2028-06-14T23:56:00-04:00` America/New_York | A direct request submits 2028-06-13 |
| T2 — Midnight invalidation | `2028-06-15T00:00:01-04:00` America/New_York | An unconfirmed 2028-06-14 preview becomes past when the budget date advances |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | Current schedule and periods remain authoritative; no pending record |
| Targets | Target total remains `USD 175.01` |
| Income / cash | Expected and actual income remain `USD 0.00`; cash remains `USD 1,000.00` |
| Transactions / bills | Pending, settled, and actual spending remain `USD 0.00`; transaction and bill sets remain empty |
| Validation / alerts | T0: “Select the date this schedule change should take effect.” T1: “Choose today or a future date.” T2: “The selected effective date has passed. Choose today or a future date and review the updated preview.” Confirmation remains unavailable |
| Audit | No schedule or audit event; rejected validation attempts do not create authoritative lifecycle history |
| Non-changes | Entered proposal values remain editable, but no preview may execute and no financial or schedule state changes |

**Given** the effective date is missing, already past, or becomes past at local midnight, **when** confirmation is attempted, **then** the proposal is rejected with the applicable recovery message and no authoritative state changes.

#### CHG-10 — Execute a pending change once and ignore an exact replay

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `execution`, `idempotency` |
| Authority | CBD-67-AC17, CBD-67-AC18, CBD-68-AC13 |
| Base fixture | CAL-SAME-DATE; SPACE-01; pending CHANGE-APR-01 |
| Starting state | Monthly/1st is authoritative; CHANGE-APR-01 is confirmed for Weekly/Monday effective 2028-04-03; full weekly target total `USD 175.01`; stable execution identity `EXEC-APR-01` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Pending | `2028-04-02T23:59:59-04:00` America/New_York | Current schedule and pending revision are intact |
| T1 — Execution | `2028-04-03T00:00:00-04:00` America/New_York | EXEC-APR-01 atomically executes the due change |
| T2 — Exact replay | `2028-04-03T00:00:05-04:00` America/New_York | The same stable execution identity is delivered again |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Old period closes as `[2028-04-01, 2028-04-03)`; exactly one new weekly version and `[2028-04-03, 2028-04-10)` period exist; pending state ends |
| Targets | Exactly one full weekly target set totaling `USD 175.01` exists for the new period |
| Financial layers | Income, cash, transactions, and bills remain unchanged; no amounts are duplicated |
| Validation / alerts | T1 succeeds; T2 returns or recognizes the existing outcome without a user-facing error |
| Audit | Exactly one Change executed event links the pending revision, old/new versions, created period, target inputs, and execution identity. The duplicate delivery is retained as one non-authoritative ignored-replay diagnostic linked to `EXEC-APR-01` |
| Non-changes | T2 creates no duplicate version, period, target, pending outcome, confirmation, notification, or successful-action audit event |

**Given** one future change is due with stable identity EXEC-APR-01, **when** execution succeeds and the identical event is replayed, **then** exactly one authoritative schedule outcome and one Change executed event exist.

#### HIST-01 — Completed periods and schedule-version references remain stable

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `history`, `immutability`, `no-carry-forward` |
| Authority | CBD-67-AC13, CBD-67-AC14, CBD-67-AC17, CBD-67-AC18, CBD-69-AC09 |
| Base fixture | CAL-HISTORY-01; SPACE-01; ACTOR-01 |
| Starting state | Monthly version SCHED-V1 governs completed January–April periods; January has positive remaining `USD 50.00`; February has overspending `USD 25.00`; Weekly/Monday change is confirmed effective 2028-05-15 |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Before execution | `2028-05-14T23:59:59-04:00` America/New_York | SCHED-V1 and its completed periods are immutable history |
| T1 — Change executes | `2028-05-15T00:00:00-04:00` America/New_York | Weekly version SCHED-V2 becomes authoritative on its natural boundary |
| T2 — History reviewed | `2028-05-15T09:00:00-04:00` America/New_York | ACTOR-01 opens schedule versions, activity history, and completed periods |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | January–April boundaries and SCHED-V1 references are unchanged; May closes as `[2028-05-01, 2028-05-15)` under SCHED-V1; `[2028-05-15, 2028-05-22)` links to SCHED-V2 |
| Targets | Every completed period retains its original planned amounts; the first weekly period receives only its full reviewed weekly targets |
| Income / cash / transactions | Historical actual values remain attached to their original periods; no receipt or transaction moves because of the schedule change |
| Validation / alerts | History distinguishes immutable schedule versions from change activity; no rollover choice is shown |
| Audit | Prior confirmation/scheduling events remain append-only; one Change executed event links CHANGE-HIST-01 to SCHED-V2 and the new period |
| Non-changes | January’s `USD 50.00` remains historical and is not added to May; February’s `USD 25.00` overspending does not reduce May; no prior boundary, actor, timestamp, amount, or version link is rewritten |

**Given** completed monthly periods contain both positive remainder and overspending, **when** a boundary-aligned weekly change executes, **then** all completed dates, planned and actual amounts, and SCHED-V1 references remain unchanged and nothing carries into SCHED-V2.

### 5.4 Targets, income, and cash scenarios

#### FIN-01 — Mid-period target proration with visible half-up rounding

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `proration`, `rounding`, `largest-remainder` |
| Authority | CBD-67-AC12, CBD-67-AC15, CBD-67-AC16, CBD-68-AC04 |
| Base fixture | CAL-TRANS-MID variant A; SPACE-01; ACTOR-01; CAT-01–03 |
| Starting state | Monthly/1st is active; ACTOR-01 has reviewed full Weekly/Monday targets CAT-01 `USD 100.00`, CAT-02 `USD 50.00`, and CAT-03 `USD 25.01`; effective date is 2028-06-14; current cash is `USD 1,000.00`; no expected or actual income is present |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Inputs fixed | `2028-06-14T09:00:00-04:00` America/New_York | The five-day transition and seven-day full-period basis are known |
| T1 — Calculation preview | `2028-06-14T09:05:00-04:00` America/New_York | The service calculates exact category values, one overall rounded total, and reconciled cents |
| T2 — Confirmation | `2028-06-14T09:10:00-04:00` America/New_York | ACTOR-01 confirms the preview without changing any monetary input |

| Calculation step | CAT-01 | CAT-02 | CAT-03 | Total |
| --- | ---: | ---: | ---: | ---: |
| Full weekly target | `100.00` | `50.00` | `25.01` | `175.01` |
| Exact value at `5 ÷ 7` | `71.428571…` | `35.714285…` | `17.864285…` | `125.007142…` |
| Initial whole cents | `71.42` | `35.71` | `17.86` | `124.99` |
| Residual-cent order | 1 | 2 | 3 | Two cents required to reach `125.01` |
| Final reconciled target | `71.43` | `35.72` | `17.86` | `125.01` |

CAT-01 receives the first residual cent. CAT-02 and CAT-03 have **exactly equal** fractional remainders — both are `3/7` of a cent, since `35.714285…` and `17.864285…` share the identical repeating tail — so the tie is exact at every precision rather than an artifact of display rounding. Stable category ID is therefore the deterministic discriminator, and it makes CAT-02 the winner of the second cent. The exact overall sum is rounded half-up once; category amounts are not independently rounded as the source of truth.

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Transition is `[2028-06-14, 2028-06-19)` and the first full weekly period is `[2028-06-19, 2028-06-26)` |
| Targets | Transition targets are CAT-01 `USD 71.43`, CAT-02 `USD 35.72`, CAT-03 `USD 17.86`, total `USD 125.01`; the next full period total is `USD 175.01` |
| Income / cash | Expected income `USD 0.00`, actual income `USD 0.00`, and current cash `USD 1,000.00` are unchanged |
| Transactions / bills | None; no transaction or bill amount is prorated |
| Validation / alerts | Preview labels the `5 ÷ 7` basis, exact values, half-up rule, and cent assignments; no validation or financial alert |
| Audit | Change confirmation records the input targets, exact values, exact sum, rounded total, residual-cent order, final targets, actor, timestamp, and schedule versions |
| Non-changes | No category receives income, no available-to-assign pool is created, and no historical remainder or overspending is included |

**Given** reviewed weekly targets total `USD 175.01`, **when** a five-day transition is confirmed, **then** the exact total `USD 125.007142…` is rounded once to `USD 125.01` and reconciled deterministically to CAT-01 `71.43`, CAT-02 `35.72`, and CAT-03 `17.86`.

#### FIN-02 — Positive remaining target does not carry forward

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `no-carry-forward`, `positive-remaining` |
| Authority | CBD-67-AC13, CBD-67-AC19, CBD-68-AC15 |
| Base fixture | CAL-HISTORY-01; SPACE-01; CAT-01 |
| Starting state | January period `[2028-01-01, 2028-02-01)` has CAT-01 target `USD 1,000.00`, settled spending `USD 950.00`, positive remaining `USD 50.00`, and current cash `USD 2,050.00`; February's reviewed base target is `USD 1,000.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Before boundary | `2028-01-31T23:59:59-05:00` America/New_York | January shows `1,000.00 − 950.00 = 50.00` remaining |
| T1 — Boundary | `2028-02-01T00:00:00-05:00` America/New_York | January completes and February opens |
| T2 — History reviewed | `2028-02-01T09:00:00-05:00` America/New_York | ACTOR-01 compares the completed and current periods |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | January is completed and retains its interval; February is `[2028-02-01, 2028-03-01)` under the same schedule version |
| Targets | January retains target `USD 1,000.00`, spending `USD 950.00`, and remaining `USD 50.00`; February target is exactly its base `USD 1,000.00`, not `USD 1,050.00` |
| Income / cash | No income event occurs; current cash remains `USD 2,050.00` across the boundary |
| Transactions / bills | January's settled activity remains in January; no activity is copied into February |
| Validation / alerts | No rollover choice, recommendation, estimate, or available-to-assign prompt is shown |
| Audit | The normal period-close/open history records the boundary and retained values; there is no transfer, allocation, or rollover audit event |
| Non-changes | The `USD 50.00` remains historical and changes neither February targets nor cash |

Reconciliation: January `target 1,000.00 − settled spending 950.00 = remaining 50.00`; February `base target 1,000.00 + carry-forward 0.00 = target 1,000.00`.

**Given** January closes with `USD 50.00` positive remaining, **when** February opens, **then** January retains the `USD 50.00` historical result and February starts with only its `USD 1,000.00` base target.

#### FIN-03 — Overspending remains historical and does not reduce the next target

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `no-carry-forward`, `overspending` |
| Authority | CBD-67-AC14, CBD-67-AC19, CBD-68-AC15 |
| Base fixture | CAL-HISTORY-01; SPACE-01; CAT-01 |
| Starting state | February `[2028-02-01, 2028-03-01)` has CAT-01 target `USD 1,000.00`, settled spending `USD 1,025.00`, overspending `USD 25.00`, and current cash `USD 1,975.00`; March's reviewed base target is `USD 1,000.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Before boundary | `2028-02-29T23:59:59-05:00` America/New_York | February shows `1,025.00 − 1,000.00 = 25.00` overspending |
| T1 — Boundary | `2028-03-01T00:00:00-05:00` America/New_York | February completes and March opens |
| T2 — Current period viewed | `2028-03-01T09:00:00-05:00` America/New_York | ACTOR-01 compares March with February history |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | February remains `[2028-02-01, 2028-03-01)`; March is `[2028-03-01, 2028-04-01)` |
| Targets | February retains target `USD 1,000.00`, spending `USD 1,025.00`, and overspending `USD 25.00`; March target is exactly `USD 1,000.00`, not `USD 975.00` |
| Income / cash | No income event occurs; current cash remains `USD 1,975.00` across the boundary |
| Transactions / bills | The settled expenses remain in February; none is reclassified or copied |
| Validation / alerts | February remains eligible for the firm settled-overspending alert specified by ALERT-02; no rollover or debt-offset control is shown in March |
| Audit | The period transition records retained historical totals; no target-reduction, transfer, or rollover audit event exists |
| Non-changes | March targets, boundaries, and cash do not change because of historical overspending |

Reconciliation: February `settled spending 1,025.00 − target 1,000.00 = overspending 25.00`; March `base target 1,000.00 − carry-forward 0.00 = target 1,000.00`.

**Given** February closes `USD 25.00` overspent, **when** March opens, **then** the overspending remains in February history and March retains its full `USD 1,000.00` base target.

#### INC-01 — Anchor and secondary income share one canonical budget timeline

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `canonical-timeline`, `multiple-income` |
| Authority | CBD-68-AC02, CBD-68-AC03, CBD-68-AC04 |
| Base fixture | CAL-MULTI-01; SPACE-01; INCOME-SCHED-01 anchor `USD 2,000.00`; INCOME-SCHED-02 secondary `USD 600.00` |
| Starting state | Immediately before 2028-03-03, current cash is `USD 1,000.00`, reviewed spending targets total `USD 175.01`, and no March actual income, pending activity, settled spending, transaction, or bill exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Anchor boundary | `2028-03-03T00:00:00-05:00` America/New_York | Anchor occurrence opens the canonical `[2028-03-03, 2028-03-17)` period |
| T1 — Anchor received | `2028-03-03T09:00:00-05:00` America/New_York | The exact `USD 2,000.00` anchor receipt is imported and reconciled |
| T2 — Secondary expected date | `2028-03-15T09:00:00-04:00` America/New_York | Secondary `USD 600.00` occurrence reaches Expected today |
| T3 — Next anchor boundary | `2028-03-17T00:00:00-04:00` America/New_York | The next anchor opens `[2028-03-17, 2028-03-31)` |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | T1 and T2 remain in `[2028-03-03, 2028-03-17)`; only anchor dates 2028-03-03 and 2028-03-17 are boundaries |
| Targets | Target total remains `USD 175.01` in each applicable period and is not derived from either income schedule |
| Income / cash | At T2 the period's current expected income is `USD 2,600.00` (`2,000.00 + 600.00`), actual income is `USD 2,000.00`, variance is `USD -600.00`, and cash is `USD 3,000.00`; the period opened at T3 has expected anchor income `USD 2,000.00` |
| Transactions / bills | T1 retains the anchor income receipt with source/date provenance; expense, pending, settled-spending, and bill totals are `USD 0.00` |
| Validation / alerts | Both schedule identities and the anchor/secondary roles are visible; no validation or financial alert |
| Audit | T1 records the receipt and exact reconciliation; reaching the secondary expected date creates no cash, allocation, or schedule-change audit event |
| Non-changes | The secondary occurrence does not create, split, shorten, or move a period and does not become an anchor automatically |

**Given** biweekly anchor and monthly secondary income schedules, **when** the secondary occurrence reaches 2028-03-15, **then** it contributes to expected income inside the one anchor-defined period without creating a boundary or changing targets, actual income, or cash.

#### INC-02 — Expected income changes neither actual cash nor spending targets

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `projection-separation`, `financial-layers` |
| Authority | CBD-68-AC04, CBD-68-AC05, CBD-69-AC07 |
| Base fixture | CAL-MULTI-01; SPACE-01; INCOME-SCHED-02 occurrence `USD 600.00`; CAT-01–03 |
| Starting state | In `[2028-03-03, 2028-03-17)`, the March 3 anchor is already received and reconciled; target total is `USD 175.01`, current expected income is `USD 2,600.00`, actual income `USD 2,000.00`, cash `USD 3,000.00`, pending expense `USD 15.00`, settled activity and actual spending `USD 20.00`; no secondary receipt exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Projected | `2028-03-14T09:00:00-04:00` America/New_York | The secondary occurrence is Projected for 2028-03-15 |
| T1 — Expected today | `2028-03-15T00:00:00-04:00` America/New_York | The occurrence changes lifecycle label without a receipt event |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Period remains `[2028-03-03, 2028-03-17)`; schedule and boundaries are unchanged |
| Targets | Spending targets remain `USD 175.01`; no target is funded or recalculated |
| Income / cash | Current expected income remains `USD 2,600.00`; actual income remains `USD 2,000.00`; cash remains `USD 3,000.00` |
| Transactions / bills | The reconciled anchor receipt remains intact; pending expense remains `USD 15.00`; settled activity and actual spending remain `USD 20.00`; no secondary receipt exists |
| Validation / alerts | Label changes from Projected to Expected today; no available-to-assign value or allocation control is presented |
| Audit | One projection-lifecycle history event records the occurrence moving from Projected to Expected today; it is not an actual-income, cash, or target mutation |
| Non-changes | No financial amount changes merely because the expected date begins |

Reconciliation at both checkpoints: `cash 3,000.00 + secondary actual receipt 0.00 = cash 3,000.00`; `base target 175.01 + expected income contribution 0.00 = target 175.01`.

**Given** the `USD 600.00` secondary projection has no qualifying receipt, **when** its expected date begins, **then** only its lifecycle label changes and all actual, cash, spending-target, pending, and settled layers retain their exact values.

#### INC-03 — Expected income is received exactly as projected

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `exact-receipt`, `automatic-reconciliation` |
| Authority | CBD-68-AC06, CBD-68-AC10, CBD-69-AC07 |
| Base fixture | CAL-MULTI-01; SPACE-01; unique INCOME-SCHED-02 occurrence expected 2028-03-15 for `USD 600.00`; compatible source SRC-PAY-02 |
| Starting state | Period `[2028-03-03, 2028-03-17)`; the March 3 anchor is already received and reconciled; targets `USD 175.01`; current expected income `USD 2,600.00`; actual income `USD 2,000.00`; cash `USD 3,000.00`; actual spending `USD 20.00`; no competing secondary match |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Expected today | `2028-03-15T08:59:59-04:00` America/New_York | Expected and actual records remain separate; no receipt yet |
| T1 — Settled receipt imported | `2028-03-15T09:00:00-04:00` America/New_York | SRC-PAY-02 posts actual income `USD 600.00` with receipt date 2028-03-15 and stable event ID INCOME-ACT-01 |
| T2 — Exact match applied | `2028-03-15T09:00:01-04:00` America/New_York | The unique same-date, same-amount, compatible-source match reconciles automatically |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Period and schedule are unchanged |
| Targets | Targets remain `USD 175.01`; receipt creates no allocation requirement or pool |
| Income / cash | Secondary expected and actual records are each `USD 600.00`; period expected and actual totals are each `USD 2,600.00`, so variance is `USD 0.00`; cash is `3,000.00 + 600.00 = USD 3,600.00` |
| Transactions / bills | Actual receipt INCOME-ACT-01 is retained with source and receipt-date provenance; actual spending remains `USD 20.00`; bills unchanged |
| Validation / alerts | Reconciled status is visible; no variance notification because date and amount variance are both zero |
| Audit | One receipt event and one automatic reconciliation decision link the two immutable records; exact replay of INCOME-ACT-01 is idempotent |
| Non-changes | Projection date/amount, targets, spending, schedule, and boundaries are not overwritten |

**Given** one compatible secondary expected occurrence and no competitor, **when** an exact settled receipt arrives on the expected date, **then** actual income and cash increase by `USD 600.00`, the distinct records reconcile automatically with zero period variance, and targets remain `USD 175.01`.

#### INC-04 — Early and late income update receipt reporting but not boundaries or targets

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `early`, `late`, `cross-period`, `suggested-match` |
| Authority | CBD-68-AC06, CBD-68-AC09, CBD-68-AC10, CBD-69-AC07 |
| Base fixture | CAL-PAY-SKIP; independent SPACE-EARLY and SPACE-LATE; expected anchor occurrence INCOME-EXP-MAR17 for `USD 2,000.00`; targets `USD 175.01`; opening cash `USD 1,000.00` in each space |
| Starting state | In both spaces the expected record is dated 2028-03-17, no actual receipt exists, and canonical boundaries are 2028-03-03, 2028-03-17, and 2028-03-31 |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Early receipt | `2028-03-15T09:00:00-04:00` America/New_York | SPACE-EARLY imports settled INCOME-ACT-EARLY `USD 2,000.00` dated 2028-03-15 |
| T1 — Early link confirmed | `2028-03-15T09:05:00-04:00` America/New_York | ACTOR-01 confirms the unique suggested match to INCOME-EXP-MAR17 |
| T2 — Late status | `2028-03-20T00:00:00-04:00` America/New_York | SPACE-LATE's unreconciled occurrence is Late on the next Federal Reserve business day |
| T3 — Late receipt | `2028-03-20T09:00:00-04:00` America/New_York | SPACE-LATE imports settled INCOME-ACT-LATE `USD 2,000.00` dated 2028-03-20 and ACTOR-01 confirms the unique suggestion |

| Outcome layer | Expected result after the applicable confirmation |
| --- | --- |
| Period / schedule | In SPACE-EARLY the actual belongs to `[2028-03-03, 2028-03-17)` while the expectation remains dated 2028-03-17 in `[2028-03-17, 2028-03-31)`; in SPACE-LATE both dates fall in `[2028-03-17, 2028-03-31)`; all canonical boundaries remain fixed |
| Targets | Each space retains targets `USD 175.01` in every affected period |
| Income / cash | Each actual receipt is `USD 2,000.00` on its real receipt date and changes that space's cash from `USD 1,000.00` to `USD 3,000.00`; each expected record remains dated 2028-03-17 and linked rather than overwritten |
| Transactions / bills | Receipt provenance is retained; no expense, pending activity, or bill changes |
| Validation / alerts | Each date-mismatched candidate requires confirmation rather than exact auto-match; confirmed links produce a date-variance explanation and mandatory in-app notification; SPACE-LATE shows Late before T3 |
| Audit | Separate receipt and user-confirmed reconciliation records store expected date, actual date, amount, source, actor, timestamp, and match decision |
| Non-changes | Neither receipt creates or shifts a budget boundary, alters a target, edits the recurring rule, or funds a category |

**Given** identical `USD 2,000.00` receipts occur two days early and three calendar days late in independent spaces, **when** their suggested links are confirmed, **then** actual income is reported on each receipt date while the original expectation, canonical boundaries, and `USD 175.01` targets remain unchanged.

#### INC-05 — Missing and skipped income preserve projection history without becoming actual

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `late`, `missing`, `skip`, `projection-history` |
| Authority | CBD-68-AC09, CBD-68-AC10, CBD-69-AC07 |
| Base fixture | CAL-PAY-SKIP; SPACE-01; INCOME-EXP-MAR17 expected 2028-03-17 for `USD 2,000.00`; HOL-FED-2028-v1 |
| Starting state | Period `[2028-03-17, 2028-03-31)`; targets `USD 175.01`; expected income `USD 2,000.00`; actual income `USD 0.00`; cash `USD 1,000.00`; no receipt or reconciliation link |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Expected date passes | `2028-03-17T23:59:59-04:00` America/New_York | No qualifying receipt has arrived |
| T1 — Missing threshold passed | `2028-03-25T00:00:00-04:00` America/New_York | Five Federal Reserve business days—March 20 through March 24—have passed |
| T2 — Skip applied | `2028-03-25T09:00:00-04:00` America/New_York | ACTOR-01 applies reversible Skip to the occurrence rather than dismissing it |

| Outcome layer | Expected result at T1 and T2 |
| --- | --- |
| Period / schedule | The occurrence remains associated with `[2028-03-17, 2028-03-31)`; boundaries and recurring rule never change |
| Targets | Targets remain `USD 175.01` throughout |
| Income / cash | At T1 the historical expected amount remains `USD 2,000.00`, actual income is `USD 0.00`, and the occurrence is removed from forward cash forecast; at T2 current expected becomes `USD 0.00` while prior expectation/revision history retains `USD 2,000.00`; cash remains `USD 1,000.00` |
| Transactions / bills | No receipt transaction, pending activity, settlement, or bill change exists |
| Validation / alerts | T1 shows Missing and its in-app notification; T2 no longer asserts a current expected receipt, while the missing/skip history remains explainable |
| Audit | Automatic lifecycle history records Late and Missing thresholds; one occurrence-exception audit event records the Skip before/after values, actor, timestamp, schedule version, and optional reason |
| Non-changes | Missing and Skip never create actual income, modify cash, fund categories, edit boundaries, or alter other occurrences |

Reconciliation at T2: `actual income 0.00`; `cash 1,000.00 + receipts 0.00 = 1,000.00`; `current expected 2,000.00 − skipped occurrence 2,000.00 = 0.00`, with the original `2,000.00` retained in history.

**Given** no receipt arrives through the fifth Federal Reserve business day, **when** the occurrence becomes Missing and is then skipped, **then** it never becomes actual or cash, leaves forward projection, and preserves its original expected amount and lifecycle in history.

#### INC-06 — Extra and unexpected income do not create a boundary or fund categories

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `extra-projection`, `unexpected-actual`, `independent-spaces` |
| Authority | CBD-68-AC06, CBD-68-AC09, CBD-68-AC10, CBD-69-AC07 |
| Base fixture | CAL-PAY-SKIP; independent SPACE-EXTRA and SPACE-UNEXPECTED; targets `USD 175.01`; opening cash `USD 1,000.00` in each space |
| Starting state | Both spaces use canonical period `[2028-03-03, 2028-03-17)`; SPACE-EXTRA has no March 10 occurrence; SPACE-UNEXPECTED has no expected income on or near 2028-03-10 and no reconciliation candidate |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Extra projection added | `2028-03-08T09:00:00-05:00` America/New_York | ACTOR-01 adds EXTRA-EXP-01 for `USD 300.00` on 2028-03-10 in SPACE-EXTRA |
| T1 — Extra date | `2028-03-10T09:00:00-05:00` America/New_York | EXTRA-EXP-01 is Expected today; no receipt exists |
| T2 — Unexpected receipt | `2028-03-10T10:00:00-05:00` America/New_York | SPACE-UNEXPECTED imports settled INCOME-ACT-UNEXPECTED `USD 500.00` dated 2028-03-10 |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | Both events remain inside `[2028-03-03, 2028-03-17)`; boundaries stay 2028-03-03 and 2028-03-17 |
| Targets | Both spaces retain target total `USD 175.01` |
| Income / cash | SPACE-EXTRA expected income increases by `USD 300.00`, actual income remains `USD 0.00`, and cash remains `USD 1,000.00`; SPACE-UNEXPECTED actual income increases by `USD 500.00`, cash becomes `USD 1,500.00`, and no projection is fabricated |
| Transactions / bills | SPACE-UNEXPECTED retains the actual receipt with source/date provenance and Unmatched/Unexpected classification; no expense or bill changes |
| Validation / alerts | Extra projection is clearly labeled; unexpected actual has no automatic or suggested link because no compatible occurrence exists |
| Audit | SPACE-EXTRA records one occurrence-exception event; SPACE-UNEXPECTED records one actual receipt event; no reconciliation decision exists |
| Non-changes | Neither event creates a boundary, changes a recurring anchor, modifies a target, creates available-to-assign, or affects the other space |

**Given** one independent space adds an extra expected occurrence and another receives income with no expectation, **when** both occur on 2028-03-10, **then** the first changes projection only, the second changes actual income and cash only, and neither changes boundaries or category targets.

#### INC-07 — Received amount differs from expected amount

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `amount-variance`, `suggested-match` |
| Authority | CBD-68-AC04, CBD-68-AC06, CBD-68-AC10, CBD-69-AC07 |
| Base fixture | CAL-MULTI-01; SPACE-01; unique secondary occurrence INCOME-EXP-02 expected 2028-03-15 for `USD 600.00`; compatible source SRC-PAY-02 |
| Starting state | Period `[2028-03-03, 2028-03-17)`; the March 3 anchor is already received and reconciled; targets `USD 175.01`; current expected income `USD 2,600.00`; actual income `USD 2,000.00`; cash `USD 3,000.00`; no competing secondary match |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Expected today | `2028-03-15T08:59:59-04:00` America/New_York | Expected and actual records are separate |
| T1 — Different amount imported | `2028-03-15T09:00:00-04:00` America/New_York | SRC-PAY-02 posts INCOME-ACT-02 for `USD 630.00` on the expected date |
| T2 — Suggested match confirmed | `2028-03-15T09:05:00-04:00` America/New_York | ACTOR-01 confirms the unique candidate at the permitted `5%` amount threshold |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Period, boundaries, and schedules are unchanged |
| Targets | Targets remain `USD 175.01`; the `USD 30.00` favorable variance is not allocated automatically |
| Income / cash | Secondary expected remains `USD 600.00` and actual is `USD 630.00`; period expected is `USD 2,600.00`, actual is `USD 2,630.00`, and variance is `2,630.00 − 2,600.00 = USD 30.00`; percentage difference is `30.00 ÷ 600.00 = 5%`; cash is `3,000.00 + 630.00 = USD 3,630.00` |
| Transactions / bills | The actual receipt retains `USD 630.00`, date, and source; no expenses or bills change |
| Validation / alerts | T1 offers a suggestion rather than automatic reconciliation because amount is not exact; T2 produces one confirmed nonzero amount-variance in-app notification |
| Audit | Receipt and user-confirmed reconciliation records retain both amounts, the `5%` calculation, actor, timestamp, and decision |
| Non-changes | Expected amount is not overwritten; no target, allocation pool, boundary, or recurring rule changes |

**Given** secondary expected income of `USD 600.00`, **when** a compatible same-date receipt of `USD 630.00` is confirmed at the inclusive `5%` suggestion threshold, **then** cash rises by `USD 630.00`, period variance is `USD 30.00`, and targets remain unchanged.

#### INC-08 — Previous-business-day adjustment across a versioned holiday

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `holiday`, `previous-business-day`, `fixture-version` |
| Authority | CBD-68-AC07, CBD-68-AC08 |
| Base fixture | CAL-HOLIDAY-01; SPACE-01; HOL-FED-2028-v1; anchor source occurrence 2028-12-25 for `USD 1,000.00`; policy Previous business day |
| Starting state | Schedule proposal is unconfirmed; targets are `USD 175.01`; actual income `USD 0.00`; cash `USD 1,000.00`; no receipt or transaction |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Preview | `2028-12-01T09:00:00-05:00` America/New_York | ACTOR-01 previews the December occurrence using the frozen holiday fixture |
| T1 — Confirmation | `2028-12-01T09:05:00-05:00` America/New_York | ACTOR-01 confirms the reviewed schedule and policy |
| T2 — Adjusted expected date | `2028-12-22T00:00:00-05:00` America/New_York | The occurrence reaches Expected today on the preceding Friday |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Source occurrence 2028-12-25 adjusts to canonical anchor/boundary 2028-12-22 because December 25 is a Monday holiday and the weekend intervenes |
| Targets | Target total remains `USD 175.01` and is not derived from expected income |
| Income / cash | Expected income is `USD 1,000.00` on 2028-12-22; actual income is `USD 0.00`; cash remains `USD 1,000.00` |
| Transactions / bills | No receipt, pending activity, settlement, expense, or bill changes |
| Validation / alerts | Preview exposes source date, adjusted date, Previous business day policy, Federal Reserve Financial Services 2028 coverage verified August 13, 2026, and holiday/weekend reason; no live-calendar dependency |
| Audit | Schedule confirmation retains policy, fixture version, source occurrence, adjusted date, actor, and timestamp |
| Non-changes | The source date remains traceable; no category is funded and no later occurrence is shifted by this single calculation |

**Given** a natural occurrence on the Monday 2028-12-25 holiday, **when** Previous business day is confirmed against `HOL-FED-2028-v1`, **then** the expected occurrence and anchor are 2028-12-22 with complete provenance and no actual-income, cash, or target change.

#### INC-09 — Supported alternative non-business-day policy

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `holiday`, `alternative-policy`, `independent-spaces` |
| Authority | CBD-68-AC07, CBD-68-AC08 |
| Base fixture | CAL-HOLIDAY-01; HOL-FED-2028-v1; independent SPACE-NEXT and SPACE-KEEP; natural anchor occurrence 2028-12-25 for `USD 1,000.00`; targets `USD 175.01`; opening cash `USD 1,000.00` in each space |
| Starting state | SPACE-NEXT proposes Next business day; SPACE-KEEP proposes Keep original calendar date; neither proposal is confirmed |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Alternative previews | `2028-12-01T10:00:00-05:00` America/New_York | ACTOR-01 compares the two independent policy previews |
| T1 — Next-business confirmation | `2028-12-01T10:05:00-05:00` America/New_York | SPACE-NEXT confirms its reviewed preview |
| T2 — Keep-original confirmation | `2028-12-01T10:10:00-05:00` America/New_York | SPACE-KEEP confirms its reviewed preview |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | SPACE-NEXT stores adjusted anchor/boundary 2028-12-26; SPACE-KEEP stores 2028-12-25 even though it is a holiday; both retain source occurrence 2028-12-25 |
| Targets | Each space retains targets `USD 175.01` |
| Income / cash | SPACE-NEXT expects `USD 1,000.00` on 2028-12-26; SPACE-KEEP expects `USD 1,000.00` on 2028-12-25; actual income is `USD 0.00` and cash `USD 1,000.00` in both |
| Transactions / bills | None; no receipt or financial activity is synthesized by confirmation |
| Validation / alerts | Each preview names its policy, resulting date, and Federal Reserve Financial Services 2028 coverage verified August 13, 2026; Keep original explicitly warns that receipt processing may occur later without moving the expected date |
| Audit | Each space records one schedule confirmation with policy, source/result dates, fixture version, actor, and timestamp |
| Non-changes | Policies do not affect another space, fund categories, or consult a live holiday source; no duplicate boundary is created within either space |

**Given** the same holiday source occurrence in independent spaces, **when** Next business day and Keep original calendar date are confirmed, **then** their deterministic dates are respectively 2028-12-26 and 2028-12-25, with identical provenance and no target, actual-income, or cash effect.

#### INC-10 — Amount-only occurrence override changes projection but never a boundary

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `amount-override`, `occurrence-exception`, `projection-only`, `removal` |
| Authority | CBD-68-AC09, CBD-68-AC14 |
| Base fixture | CAL-PAY-SKIP; SPACE-01; ACTOR-01; INCOME-EXP-MAR17 expected 2028-03-17 for `USD 2,000.00`; targets `USD 175.01`; opening cash `USD 1,000.00` |
| Starting state | Canonical boundaries are 2028-03-03, 2028-03-17, and 2028-03-31; current expected income is `USD 2,000.00`; actual income `USD 0.00`; cash `USD 1,000.00`; pending, settled spending, transactions, bills, validation errors, and alerts are `USD 0.00`, empty, or Not applicable; no exception exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Override preview | `2028-03-08T09:00:00-05:00` America/New_York | ACTOR-01 proposes changing only the March 17 expected amount from `USD 2,000.00` to `USD 2,200.00` |
| T1 — Override saved | `2028-03-08T09:05:00-05:00` America/New_York | OCC-AMOUNT-01 is confirmed with reason `Commission estimate updated` |
| T2 — Override removed | `2028-03-09T09:00:00-05:00` America/New_York | ACTOR-01 removes OCC-AMOUNT-01 before the occurrence executes |

| Outcome layer | Expected result at T1 and T2 |
| --- | --- |
| Period / schedule | Boundaries remain 2028-03-03, 2028-03-17, and 2028-03-31; recurring rule, anchor role, and schedule version never change |
| Targets | Target total remains `USD 175.01`; neither projected amount is assigned to a category |
| Income / cash | T1 current expected becomes `USD 2,200.00`; T2 restores current expected to `USD 2,000.00`; actual income remains `USD 0.00` and cash `USD 1,000.00` |
| Transactions / bills | No actual receipt, expense, pending activity, settlement, reconciliation link, or bill is created |
| Validation / alerts | Preview explicitly says `This changes the expected amount only; budget period dates do not move.` Both save and removal succeed without a financial alert |
| Audit | Save records `2,000.00 → 2,200.00`, actor, timestamp, reason, schedule version, and occurrence ID; removal records `2,200.00 → 2,000.00` without deleting the prior revision |
| Non-changes | The exception cannot change dates, boundaries, later occurrences, targets, actual income, cash, or the recurring amount outside this occurrence |

**Given** a `USD 2,000.00` anchor occurrence on a canonical boundary, **when** its expected amount is overridden to `USD 2,200.00` and later restored, **then** only current projection and revision history change while every boundary and actual financial value remains fixed.

#### HOL-01 — Missing holiday coverage blocks confirmation and a source correction refreshes only unconfirmed work

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `unsupported-year`, `holiday-source-correction`, `preview-invalidation`, `history-preservation` |
| Authority | CBD-68-AC08, CBD-68-AC16 |
| Base fixture | CAL-HOLIDAY-01; HOL-FED-2028-v1/v2 and HOL-FED-COVERAGE-2035-ABSENT; independent SPACE-NOCOVER, SPACE-CORRECTION, and SPACE-HISTORY; ACTOR-01 |
| Starting state | SPACE-NOCOVER proposes a 2035-12-25 anchor with Previous business day and no verified 2035 data; SPACE-CORRECTION has an unconfirmed v1 preview for 2028-12-25 → 2028-12-22; SPACE-HISTORY has the same mapping already confirmed under v1; each has targets `USD 175.01`, actual income `USD 0.00`, cash `USD 1,000.00`, and no transaction, bill, or alert |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Unsupported preview | `2028-12-01T12:00:00-05:00` America/New_York | SPACE-NOCOVER requests holiday adjustment for uncovered year 2035 |
| T1 — Unsupported confirmation | `2028-12-01T12:05:00-05:00` America/New_York | ACTOR-01 attempts to confirm without verified coverage |
| T2 — Corrected version activates | `2028-12-01T12:10:00-05:00` America/New_York | HOL-FED-2028-v2 replaces v1 for unconfirmed and future unexecuted projections |
| T3 — Corrected preview refreshed | `2028-12-01T12:15:00-05:00` America/New_York | SPACE-CORRECTION refreshes under v2; SPACE-HISTORY is inspected without correction action |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | SPACE-NOCOVER creates no schedule or boundary. SPACE-CORRECTION's v1 preview becomes stale and a new v2 preview retains adjusted date 2028-12-22 with updated provenance. SPACE-HISTORY retains its confirmed v1 boundary and schedule version unchanged |
| Targets | Every target remains `USD 175.01`; blocked or refreshed holiday work changes no category value |
| Income / cash | Expected projection in the refreshed preview remains `USD 1,000.00` on 2028-12-22; actual income remains `USD 0.00` and cash `USD 1,000.00` in all spaces |
| Transactions / bills | Empty; no receipt, settlement, transaction reclassification, or bill change occurs |
| Validation / alerts | T1 blocks with `Holiday data for 2035 is not verified. Choose Keep original calendar date or try again after coverage is available.` No weekday-only fallback occurs. T2 explains the source correction and requires refresh; neither condition creates a financial alert |
| Audit | Unsupported-year diagnostics record requested year/policy/version absence. Refresh records old/new dataset IDs and unchanged calculated date; SPACE-HISTORY retains v1 provenance without a recalculation event |
| Non-changes | Missing coverage cannot infer a banking date or partially activate. Dataset correction cannot silently rewrite confirmed historical occurrences, boundaries, schedule versions, targets, cash, or source dates |

**Given** one proposal lacks verified holiday coverage and another depends on corrected holiday provenance, **when** confirmation and refresh are attempted, **then** the uncovered year blocks without fallback, unconfirmed work refreshes visibly, and confirmed v1 history remains immutable.

### 5.5 Transaction and reconciliation scenarios

#### TXN-01 — Authorization and settlement occur in one period with an amount change

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `pending`, `settlement`, `amount-change`, `same-date-boundary` |
| Authority | CBD-69-AC01, CBD-69-AC02, CBD-69-AC04, CBD-69-AC05 |
| Base fixture | CAL-SAME-DATE; SPACE-01; CAT-01; TX-ONE-01 |
| Starting state | Weekly period `[2028-04-03, 2028-04-10)` has just opened; CAT-01 target `USD 200.00`, settled spending `USD 20.00`, pending activity `USD 0.00`, and cash `USD 1,000.00`; TX-ONE-01 is Not provided |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Boundary executed | `2028-04-03T00:00:00-04:00` America/New_York | The new weekly period becomes authoritative before financial imports |
| T1 — Authorization imported | `2028-04-03T09:00:00-04:00` America/New_York | Reliable authorization TX-ONE-01 arrives for `USD 75.00`, authorization date 2028-04-03 |
| T2 — Settlement imported | `2028-04-03T15:00:00-04:00` America/New_York | The reliably linked settlement posts for `USD 82.00`, settlement date 2028-04-03 |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Start-inclusive classification places both lifecycle states in `[2028-04-03, 2028-04-10)`; schedule and boundary are unchanged |
| Targets | CAT-01 target remains `USD 200.00` |
| Income / cash | Expected and actual income remain `USD 0.00`; T1 does not count a settled cash movement; T2 changes cash from `USD 1,000.00` to `USD 918.00` |
| Transactions / bills | T1 shows pending `USD 75.00` separately from settled spending `USD 20.00`; T2 replaces it with settled `USD 82.00`, so CAT-01 settled spending is `20.00 + 82.00 = USD 102.00`, pending is `USD 0.00`, and the total is never `USD 177.00`; bills unchanged |
| Validation / alerts | T1 copy says the amount may change; T2 explains `USD 75.00 → USD 82.00`; no alert because final remaining target is `200.00 − 102.00 = USD 98.00` |
| Audit | Import, reliable link, authorization/settlement dates, before/after amounts, derived budget date 2028-04-03, and schedule-version reference are recorded in order |
| Non-changes | Settlement changes neither the authorization-derived budget date nor any period boundary, target, income record, or unrelated category |

**Given** a `USD 75.00` authorization on the first day of a weekly period, **when** it settles the same day for `USD 82.00`, **then** the provisional amount is replaced, CAT-01 settled spending is exactly `USD 102.00`, and no amount is counted twice.

#### TXN-02 — Authorization and settlement occur in different periods

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `cross-period`, `authorization-date`, `late-settlement` |
| Authority | CBD-69-AC01, CBD-69-AC02, CBD-69-AC05, CBD-69-AC09 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; CAT-01; TX-CROSS-01 |
| Starting state | PERIOD-XSET-01 target is `USD 200.00` with settled spending `USD 20.00`; PERIOD-XSET-02 target is `USD 200.00` with settled spending `USD 0.00`; cash is `USD 1,000.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Authorization imported | `2028-02-29T10:00:00-05:00` America/New_York | TX-CROSS-01 authorizes for `USD 75.00` with reliable authorization date 2028-02-29 |
| T1 — Original period ends | `2028-03-01T00:00:00-05:00` America/New_York | PERIOD-XSET-01 becomes completed; TX-CROSS-01 remains pending there |
| T2 — Settlement imported | `2028-03-02T09:00:00-05:00` America/New_York | Reliable settlement posts for `USD 82.00` with settlement date 2028-03-02 |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Budget date remains 2028-02-29 in PERIOD-XSET-01; statement date 2028-03-02 lies in PERIOD-XSET-02; PERIOD-XSET-01 is labeled `Adjusted after period end` without changing either interval |
| Targets | Both period targets remain `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash changes from `USD 1,000.00` to `USD 918.00` only when settlement is counted |
| Transactions / bills | PERIOD-XSET-01 settled spending becomes `20.00 + 82.00 = USD 102.00`; its `USD 75.00` provisional impact is removed; PERIOD-XSET-02 budget-date spending remains `USD 0.00`, while statement view shows `USD 82.00` on March 2; bills unchanged |
| Validation / alerts | Explanation states that the charge is budgeted to its authorization date; no overage alert because `102.00 < 200.00` |
| Audit | Authorization import, period link, settlement link, `75.00 → 82.00`, elapsed-period gap, before/after totals, and late-adjustment label are recorded |
| Non-changes | Settlement does not move the transaction to PERIOD-XSET-02 or modify boundaries, schedule-version references, targets, or source dates |

**Given** a charge authorized February 29 and settled March 2 for a different amount, **when** settlement arrives after the original period ends, **then** `USD 82.00` replaces `USD 75.00` in PERIOD-XSET-01 and appears only by posted date in PERIOD-XSET-02's statement view.

#### TXN-03 — Missing authorization date uses posted or provisional fallback

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `missing-authorization`, `fallback`, `re-derivation` |
| Authority | CBD-69-AC01, CBD-69-AC02, CBD-69-AC06 |
| Base fixture | CAL-CROSS-SETTLE; independent SPACE-POSTED and SPACE-PENDING; CAT-01 target `USD 200.00`; opening cash `USD 1,000.00` in each space |
| Starting state | Neither space has a reliable authorization date or existing activity; all income and bill totals are `USD 0.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Posted fallback | `2028-03-02T09:00:00-05:00` America/New_York | SPACE-POSTED imports settled TX-FALLBACK-01 for `USD 82.00`, posted 2028-03-02, authorization date Not provided |
| T1 — Provisional fallback | `2028-03-02T09:05:00-05:00` America/New_York | SPACE-PENDING imports pending TX-FALLBACK-02 for `USD 63.00` with available date 2028-03-02 and authorization date Not provided |
| T2 — Reliable date arrives | `2028-03-04T09:00:00-05:00` America/New_York | TX-FALLBACK-02 settles for `USD 63.00` and supplies reliable authorization date 2028-02-29 |

| Outcome layer | Expected result |
| --- | --- |
| Period / schedule | SPACE-POSTED uses posted-date fallback 2028-03-02 in PERIOD-XSET-02; SPACE-PENDING provisionally uses 2028-03-02 at T1, then re-derives budget date 2028-02-29 and moves the final impact to PERIOD-XSET-01 at T2; no boundary changes |
| Targets | Each space retains CAT-01 target `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; SPACE-POSTED cash is `1,000.00 − 82.00 = USD 918.00`; SPACE-PENDING cash remains `USD 1,000.00` at T1 and becomes `USD 937.00` at T2 |
| Transactions / bills | TX-FALLBACK-01 is Settled-unmatched and counted once at `USD 82.00`; TX-FALLBACK-02 is pending `USD 63.00` at T1 and settled `USD 63.00` in PERIOD-XSET-01 at T2; bills unchanged |
| Validation / alerts | SPACE-POSTED explains that posted date was used because authorization was unavailable; SPACE-PENDING remains visibly pending at T1 and shows the re-derived date at T2; no overage alert |
| Audit | Each fallback records the missing authorization field and source used; T2 records before/after budget dates, source precision, settlement, and completed-period adjustment provenance |
| Non-changes | Missing authorization never causes a pending record to be treated as settled, and later re-derivation alters neither source dates, targets, nor boundaries |

**Given** two expenses lack authorization dates, **when** one is already posted and the other is still pending, **then** the posted item uses its posted date while the pending item uses a provisional source date and is re-derived if a reliable authorization date arrives at settlement.

#### TXN-04 — Date-only classification remains stable across DST and UTC/local disagreement

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `date-only`, `DST`, `UTC`, `time-precision` |
| Authority | CBD-67-AC05, CBD-69-AC01, CBD-69-AC03, CBD-69-AC13 |
| Base fixture | CAL-DST-FALL and CAL-TZ-UTC; independent SPACE-DST and SPACE-TZ; CAT-01 target `USD 200.00`; opening cash `USD 1,000.00` in each space |
| Starting state | All events are posted expenses; there is no expected/actual income, pending activity, bill, or prior spending |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — UTC/local disagreement A | `2028-03-01T00:30:00Z` (`2028-02-29T19:30:00-05:00` America/New_York) | SPACE-TZ receives TX-TZ-01 for `USD 40.00` |
| T1 — UTC/local disagreement B | `2028-03-01T05:30:00Z` (`2028-03-01T00:30:00-05:00` America/New_York) | SPACE-TZ receives TX-TZ-02 for `USD 50.00` |
| T2 — Date only | `2028-03-01T09:00:00-05:00` America/New_York | SPACE-TZ receives TX-DATE-ONLY for `USD 30.00` with supplied date `2028-03-01` and time Not provided |
| T3 — First repeated hour | `2028-11-05T01:30:00-04:00` America/New_York | SPACE-DST receives TX-DST-01 for `USD 10.00`, supplied budget date 2028-11-05 |
| T4 — Second repeated hour | `2028-11-05T01:30:00-05:00` America/New_York | SPACE-DST receives TX-DST-02 for `USD 20.00`, supplied budget date 2028-11-05 |

| Outcome layer | Expected result at T4 |
| --- | --- |
| Period / schedule | Both repeated-hour events classify once to 2028-11-05 in the period beginning that date; TX-TZ-01 classifies to 2028-02-29 in `[2028-02-15, 2028-03-01)`; TX-TZ-02 and TX-DATE-ONLY classify to 2028-03-01 in `[2028-03-01, 2028-03-15)` |
| Targets | Each space retains CAT-01 target `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; SPACE-DST cash is `USD 970.00`; SPACE-TZ cash is `1,000.00 − 40.00 − 50.00 − 30.00 = USD 880.00` |
| Transactions / bills | SPACE-DST settled spending is `USD 30.00` with two distinct event identities; SPACE-TZ settled spending is `USD 40.00` in the earlier period and `USD 80.00` in the later period; bills unchanged |
| Validation / alerts | No time conversion is applied to TX-DATE-ONLY; no date is skipped, duplicated, or shifted by the repeated hour; no alert |
| Audit | Source timestamps, offsets, supplied date, time-precision flag, derived local budget date, period ID, and schedule-version reference remain queryable |
| Non-changes | Transaction time does not choose a period; UTC date is not substituted for the budget-space date; DST changes no interval boundary or day count |

**Given** two distinct repeated-hour instants, two UTC instants straddling local midnight, and one date with no time, **when** they are classified in America/New_York, **then** each uses exactly one authoritative local calendar date and the date-only value remains 2028-03-01 without inferred time-zone conversion.

#### REC-01 — Pending authorization disappears without settlement

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `pending-removal`, `informational-alert`, `self-clear` |
| Authority | CBD-69-AC04, CBD-69-AC06 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; CAT-01; TX-HOLD-01 |
| Starting state | PERIOD-XSET-01 target `USD 100.00`, settled spending `USD 40.00`, pending `USD 0.00`, cash `USD 1,000.00`; TX-HOLD-01 Not provided |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Hold imported | `2028-02-29T10:00:00-05:00` America/New_York | TX-HOLD-01 authorizes for `USD 75.00` on 2028-02-29 and remains Pending-unmatched |
| T1 — Hold removed | `2028-03-02T10:00:00-05:00` America/New_York | Source reports that TX-HOLD-01 disappeared without settlement |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | The last-known authorization date remains in audit history; no authoritative transaction remains classified after removal; period boundaries remain fixed |
| Targets | CAT-01 target remains `USD 100.00` |
| Income / cash | Income remains `USD 0.00`; cash remains `USD 1,000.00` because no settlement occurred |
| Transactions / bills | T0 shows settled `USD 40.00` plus provisional `USD 75.00`, never settled `USD 115.00`; T1 moves TX-HOLD-01 to Removed-without-settlement, removes the provisional amount, and restores settled spending `USD 40.00`; no bill changes |
| Validation / alerts | T0 creates one informational warning stating that provisional activity would make CAT-01 `USD 15.00` over if it settles; it does not assert a settled overage. T1 self-clears that warning and creates no firm alert |
| Audit | Removal event retains stable ID, last-known amount/date/category, prior Pending-unmatched state, removal timestamp, source, and `75.00 → 0.00` provisional effect |
| Non-changes | No settled expense, refund, reversal line item, firm alert, target change, cash movement, or period change is created |

**Given** a pending `USD 75.00` hold would make provisional activity exceed CAT-01's target, **when** the hold disappears without settlement, **then** its provisional impact and informational warning clear, settled spending returns to `USD 40.00`, and no firm result exists.

#### REC-02 — Unmatched posted transaction has weak reconciliation candidates

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `multiple-candidates`, `duplicate-review`, `count-once` |
| Authority | CBD-69-AC06, CBD-69-AC14 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; CAT-01 target `USD 200.00`; pending candidates TX-CAND-A and TX-CAND-B; posted TX-POST-01 |
| Starting state | TX-CAND-A is pending `USD 80.00`, authorized 2028-02-28; TX-CAND-B is pending `USD 75.00`, authorized 2028-02-29; no reliable link exists; settled spending `USD 0.00`; cash `USD 1,000.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Candidates visible | `2028-03-02T08:59:59-05:00` America/New_York | Both weak pending candidates remain separately identifiable |
| T1 — Posted item imported | `2028-03-02T09:00:00-05:00` America/New_York | TX-POST-01 posts for `USD 82.00` with posted date 2028-03-02 and weak similarity to both candidates |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Because two candidates exist, neither authorization date is selected; TX-POST-01 provisionally uses posted date 2028-03-02 in PERIOD-XSET-02; boundaries unchanged |
| Targets | CAT-01 target remains `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 82.00 = USD 918.00` |
| Transactions / bills | Duplicate-review counts posted `USD 82.00` exactly once; neither pending candidate contributes a second counted impact while unresolved; all three source records remain visible; bills unchanged |
| Validation / alerts | Interface explains that multiple possible matches need review and that `USD 82.00` is being counted; unresolved-match indicator is informational and no candidate independently triggers a firm alert |
| Audit | No-match/ambiguity evaluation records both candidate IDs, scores or evidence supplied by the matcher, posted-date fallback, counted record, and unresolved state |
| Non-changes | No silent merge, authorization-date choice, target change, boundary change, duplicate spending, or automatic manual-control decision occurs |

**Given** one settled `USD 82.00` charge has two weak pending candidates, **when** no reliable link can select one, **then** it enters Duplicate-review at its posted date and exactly `USD 82.00` is counted once while all candidates remain reviewable.

#### REC-03 — Apparent pending and posted duplicate enters review

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `single-candidate`, `match`, `unmatch`, `dismiss` |
| Authority | CBD-69-AC06 |
| Base fixture | CAL-SAME-DATE; independent SPACE-MATCH, SPACE-UNMATCH, and SPACE-DISMISS; CAT-01 target `USD 200.00`; ACTOR-01 |
| Starting state | SPACE-MATCH and SPACE-DISMISS each contain pending TX-PEND-01 `USD 49.90` authorized 2028-04-03; SPACE-UNMATCH contains an earlier automatic match between equivalent pending `USD 49.90` and posted `USD 50.00` records; opening cash is `USD 1,000.00` per space |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Posted duplicate arrives | `2028-04-03T15:00:00-04:00` America/New_York | SPACE-MATCH and SPACE-DISMISS receive TX-POST-02 `USD 50.00` with no reliable institution link but exactly one plausible pending candidate |
| T1 — Match | `2028-04-03T15:05:00-04:00` America/New_York | ACTOR-01 selects Match in SPACE-MATCH |
| T2 — Unmatch | `2028-04-03T15:10:00-04:00` America/New_York | ACTOR-01 selects Unmatch on the earlier automatic match in SPACE-UNMATCH |
| T3 — Dismiss | `2028-04-03T15:15:00-04:00` America/New_York | ACTOR-01 selects Dismiss in SPACE-DISMISS |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | At T0 the posted amount uses the single candidate's authorization date 2028-04-03; every record remains in `[2028-04-03, 2028-04-10)` and no boundary changes |
| Targets | CAT-01 target remains `USD 200.00` in all spaces |
| Income / cash | Income remains `USD 0.00`; each posted `USD 50.00` changes its space's cash to `USD 950.00`; pending records cause no settled cash movement |
| Transactions / bills | Before resolution, actual spending is posted `USD 50.00`, never `49.90` or `99.90`; SPACE-MATCH ends Matched-settled at `USD 50.00`; SPACE-UNMATCH restores separate Pending-unmatched `USD 49.90` and Settled-unmatched `USD 50.00`; SPACE-DISMISS ends the candidate relationship with the same independent states; bills unchanged |
| Validation / alerts | Duplicate-review indicator appears before Match/Dismiss; no firm alert; each control is available only to ACTOR-01 and provides a visible result |
| Audit | Automatic evaluation plus each Match, Unmatch, and Dismiss records actor, timestamp, before/after state, both stable IDs, amount/date provenance, and prior decisions without deletion |
| Non-changes | Manual controls do not edit source dates/amounts, count the posted item twice, alter targets/boundaries, or erase the earlier automatic match from history |

**Given** apparent duplicates lack a reliable institution link, **when** authorized users match, unmatch, or dismiss them in independent spaces, **then** the posted amount remains the only settled amount counted and every reconciliation decision remains explicit and auditable.

#### REC-04 — One authorization reconciles to multiple settlements

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `split`, `one-to-many`, `amount-variance`, `late-adjustment` |
| Authority | CBD-69-AC05, CBD-69-AC06 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; CAT-01; AUTH-SPLIT-01; SETTLE-SPLIT-A and SETTLE-SPLIT-B; ACTOR-01 |
| Starting state | PERIOD-XSET-01 target `USD 200.00` and settled spending `USD 20.00`; PERIOD-XSET-02 settled spending `USD 0.00`; cash `USD 1,000.00`; no split records exist |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Authorization | `2028-02-29T10:00:00-05:00` America/New_York | AUTH-SPLIT-01 authorizes `USD 75.00` on 2028-02-29 |
| T1 — First settlement | `2028-03-02T09:00:00-05:00` America/New_York | SETTLE-SPLIT-A posts `USD 50.00` on 2028-03-02 |
| T2 — Second settlement | `2028-03-03T09:00:00-05:00` America/New_York | SETTLE-SPLIT-B posts `USD 30.00` on 2028-03-03; automatic one-to-one matching cannot resolve the group |
| T3 — Split confirmed | `2028-03-03T09:05:00-05:00` America/New_York | ACTOR-01 selects Split and associates both settlements with AUTH-SPLIT-01 |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | Both final records inherit authorization-derived budget date 2028-02-29 in PERIOD-XSET-01; statement dates remain March 2 and March 3 in PERIOD-XSET-02; boundaries unchanged |
| Targets | CAT-01 target remains `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 50.00 − 30.00 = USD 920.00` |
| Transactions / bills | The `USD 75.00` provisional impact is replaced by settled records `USD 50.00 + USD 30.00 = USD 80.00`; authorization-to-settlement variance is `80.00 − 75.00 = USD 5.00`; PERIOD-XSET-01 settled spending becomes `20.00 + 80.00 = USD 100.00`; no amount is counted twice; bills unchanged |
| Validation / alerts | Split is accepted despite the `USD 5.00` mismatch and displays the variance; completed PERIOD-XSET-01 is marked adjusted; no overage alert because `100.00 < 200.00` |
| Audit | Split decision records actor, timestamp, all three IDs, original/final amounts, `USD 5.00` variance, both source settlement dates, inherited budget date, and before/after totals |
| Non-changes | Amount mismatch does not block Split; source records, targets, schedule versions, boundaries, income, and unrelated categories remain unchanged |

**Given** one `USD 75.00` authorization settles as `USD 50.00` and `USD 30.00`, **when** ACTOR-01 confirms Split, **then** two settled records totaling `USD 80.00` remain in the authorization-date period and the `USD 5.00` variance is visible rather than rejected.

#### REC-05 — Settlement-first and authorization-first imports converge idempotently

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `arrival-order`, `convergence`, `idempotency` |
| Authority | CBD-69-AC05, CBD-69-AC06, CBD-69-AC12, CBD-69-AC15 |
| Base fixture | CAL-CROSS-SETTLE; independent SPACE-AUTH-FIRST and SPACE-SETTLE-FIRST; stable source identities AUTH-ORDER-01 and SETTLE-ORDER-01; CAT-01 target `USD 200.00` |
| Starting state | Each space has PERIOD-XSET-01 settled spending `USD 20.00`, PERIOD-XSET-02 settled spending `USD 0.00`, and cash `USD 1,000.00`; no source event has been processed |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Authorization first | `2028-03-01T09:00:00-05:00` America/New_York | SPACE-AUTH-FIRST imports AUTH-ORDER-01 for `USD 75.00`, source authorization date 2028-02-29 |
| T1 — Settlement in both spaces | `2028-03-02T09:00:00-05:00` America/New_York | Both spaces import SETTLE-ORDER-01 for `USD 82.00`, source settlement date 2028-03-02 and reliable linkage metadata |
| T2 — Authorization arrives late | `2028-03-02T09:05:00-05:00` America/New_York | SPACE-SETTLE-FIRST imports AUTH-ORDER-01 after initially counting the settlement by posted-date fallback |
| T3 — Exact replay | `2028-03-02T09:10:00-05:00` America/New_York | Both stable source events are replayed to both spaces |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | Both spaces end Matched-settled with budget date 2028-02-29 in PERIOD-XSET-01 and statement date 2028-03-02 in PERIOD-XSET-02; SPACE-SETTLE-FIRST reclassifies once when authorization arrives; boundaries unchanged |
| Targets | CAT-01 target remains `USD 200.00` in both spaces |
| Income / cash | Income remains `USD 0.00`; cash is exactly `USD 918.00` in each space and does not change on reclassification or replay |
| Transactions / bills | Each space has one economic transaction, final amount `USD 82.00`; PERIOD-XSET-01 settled spending is `20.00 + 82.00 = USD 102.00`; pending impact is `USD 0.00`; PERIOD-XSET-02 budget-date spending is `USD 0.00`; bills unchanged |
| Validation / alerts | Both spaces show the same adjusted-period explanation and no overage alert; replay produces no user-facing error |
| Audit | Arrival histories differ but converge to the same source records, link, budget date, totals, and one counted settlement; replay is logged diagnostically at most and creates no duplicate successful-action event |
| Non-changes | Event order and replay cannot duplicate cash, spending, records, alerts, periods, targets, or audit success entries |

**Given** identical reliable authorization and settlement events arrive in opposite orders, **when** both orders and exact replays are processed, **then** each space converges on one `USD 82.00` transaction budgeted to February 29 with cash `USD 918.00`.

#### LATE-01 — Late settlement adjusts an ended period without changing boundaries

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `completed-period`, `late-adjustment`, `firm-alert` |
| Authority | CBD-67-AC18, CBD-69-AC09, CBD-69-AC10, CBD-69-AC11 |
| Base fixture | CAL-HISTORY-01; SPACE-01; CAT-01; TX-LATE-01 |
| Starting state | Shortened May period `[2028-05-01, 2028-05-15)` under SCHED-V1 has CAT-01 target `USD 100.00` and settled spending `USD 40.00`; cash `USD 1,000.00`; Weekly SCHED-V2 begins 2028-05-15 |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Authorization | `2028-05-14T10:00:00-04:00` America/New_York | TX-LATE-01 authorizes for `USD 75.00` on the final date of the shortened May period |
| T1 — Period ends | `2028-05-15T00:00:00-04:00` America/New_York | `[2028-05-01, 2028-05-15)` closes and SCHED-V2 opens `[2028-05-15, 2028-05-22)` |
| T2 — Late settlement | `2028-06-01T09:00:00-04:00` America/New_York | TX-LATE-01 settles for `USD 82.00`, source settlement date 2028-06-01 |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Budget date remains 2028-05-14 in the completed shortened May period; that period remains `[2028-05-01, 2028-05-15)` under SCHED-V1 and is labeled `Adjusted after period end`; SCHED-V2 periods do not move |
| Targets | Completed CAT-01 target remains `USD 100.00`; no later target changes |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 82.00 = USD 918.00` at settlement |
| Transactions / bills | Provisional `USD 75.00` is replaced by settled `USD 82.00`; completed-period actual spending becomes `40.00 + 82.00 = USD 122.00`, overspending `122.00 − 100.00 = USD 22.00`; statement view shows `USD 82.00` on June 1; bills unchanged |
| Validation / alerts | Pending informational warning clears; one firm alert states that a late adjustment produced `USD 22.00` completed-period overspending and is distinguishable from a current-period alert |
| Audit | Settlement records source dates, `75.00 → 82.00`, before/after actuals, overspending calculation, SCHED-V1 reference, adjustment label, and firm-alert identity |
| Non-changes | Settlement does not reopen or resize the period, rewrite SCHED-V1, alter its target, carry overspending into SCHED-V2, or change the transaction's budget date |

**Given** a May 14 authorization settles June 1 after its period ended, **when** the final amount is `USD 82.00`, **then** the completed period becomes `USD 22.00` overspent and visibly adjusted while all boundaries, schedule-version references, and targets remain unchanged.

#### OVR-01 — Authorized budget-date override and removal remain auditable

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `override`, `removal`, `reclassification`, `audit` |
| Authority | CBD-69-AC12, CBD-69-AC14 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; ACTOR-01; CAT-01; TX-OVR-01 |
| Starting state | TX-OVR-01 is a settled `USD 82.00` expense with authorization date Not provided, posted date 2028-03-02, and derived budget date 2028-03-02 in PERIOD-XSET-02; PERIOD-XSET-01 other spending `USD 20.00`, PERIOD-XSET-02 other spending `USD 30.00`; each target `USD 200.00`; cash `USD 918.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Derived state | `2028-03-02T09:00:00-05:00` America/New_York | Posted-date fallback produces PERIOD-XSET-02 totals `30.00 + 82.00 = USD 112.00` |
| T1 — Override applied | `2028-03-02T10:00:00-05:00` America/New_York | ACTOR-01 changes budget date to 2028-02-29 with reason `Merchant purchase-date correction` |
| T2 — Override removed | `2028-03-02T11:00:00-05:00` America/New_York | ACTOR-01 removes the override, restoring the derived budget date 2028-03-02 |

| Outcome layer | Expected result at T1 and T2 |
| --- | --- |
| Period / schedule | T1 classifies TX-OVR-01 to PERIOD-XSET-01; T2 returns it to PERIOD-XSET-02; both intervals and schedule-version references stay unchanged |
| Targets | Each period target remains `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash remains `USD 918.00` because classification changes move no money |
| Transactions / bills | At T1 PERIOD-XSET-01 spending is `20.00 + 82.00 = USD 102.00` and PERIOD-XSET-02 is `USD 30.00`; at T2 totals return to `USD 20.00` and `30.00 + 82.00 = USD 112.00`; source posted date remains 2028-03-02; bills unchanged |
| Validation / alerts | Applied and removed states show derived and current budget dates; no overage alert under the `USD 200.00` targets |
| Audit | Append-only events record fallback derivation, override actor/reason/timestamp and `2028-03-02 → 2028-02-29`, then removal actor/timestamp and `2028-02-29 → 2028-03-02`; prior state is never deleted |
| Non-changes | Override and removal do not edit source dates/amount, cash, targets, boundaries, schedule versions, transaction lifecycle, or another category |

**Given** a posted-date fallback transaction in PERIOD-XSET-02, **when** ACTOR-01 overrides it to February 29 and later removes that override, **then** period totals move out and back exactly while source evidence and both decisions remain auditable.

#### TYPE-01 — Owned-account transfer preserves aggregate cash and is not spending

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `transfer`, `aggregate-cash`, `non-spending` |
| Authority | CBD-69-AC08 |
| Base fixture | CAL-SAME-DATE; SPACE-01; ACCT-01 checking and ACCT-02 savings; TRANSFER-01 |
| Starting state | ACCT-01 balance `USD 1,000.00`; ACCT-02 balance `USD 500.00`; aggregate cash `USD 1,500.00`; target `USD 175.01`; income and spending totals `USD 0.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Transfer posts | `2028-04-03T12:00:00-04:00` America/New_York | Linked transfer sides post `USD 250.00` from ACCT-01 to ACCT-02 on 2028-04-03 |

| Outcome layer | Expected result at T0 |
| --- | --- |
| Period / schedule | Posted date 2028-04-03 associates the transfer with the current period for traceability but creates no budget impact or boundary |
| Targets | Target remains `USD 175.01` |
| Income / cash | ACCT-01 becomes `USD 750.00`; ACCT-02 becomes `USD 750.00`; aggregate cash remains `750.00 + 750.00 = USD 1,500.00`; income remains `USD 0.00` |
| Transactions / bills | Both transfer sides are linked and labeled Transfer; actual spending remains `USD 0.00`; bills unchanged |
| Validation / alerts | Explanation says owned-account transfers do not count as income or spending; no overage or income alert |
| Audit | Both source sides, account IDs, posted date, amounts, linkage, and balance reconciliation are recorded |
| Non-changes | No target, category total, expected/actual income, aggregate cash, period boundary, or schedule changes |

**Given** both accounts belong to one budget space, **when** `USD 250.00` transfers between them, **then** individual balances change while aggregate cash stays `USD 1,500.00` and income and spending remain zero.

#### TYPE-02 — Bill due date, payment date, authorization, and settlement remain distinct

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `bill`, `payment`, `three-period`, `date-provenance` |
| Authority | CBD-67-AC12, CBD-67-AC15, CBD-69-AC08 |
| Base fixture | CAL-BILL-01; SPACE-01; BILL-01 `USD 120.00`; PAYMENT-01; CAT-01 target `USD 200.00`; cash `USD 1,000.00` |
| Starting state | BILL-01 is projected due 2028-02-29; no payment authorization or settlement exists; actual spending `USD 0.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Bill due | `2028-02-29T00:00:00-05:00` America/New_York | BILL-01 reaches its due date in `[2028-02-15, 2028-03-01)` |
| T1 — Payment authorized | `2028-03-01T09:00:00-05:00` America/New_York | PAYMENT-01 authorizes `USD 120.00` with authorization date 2028-03-01 |
| T2 — Payment settles | `2028-03-18T09:00:00-04:00` America/New_York | PAYMENT-01 settles `USD 120.00` with posted date 2028-03-18 |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Bill planning date belongs to `[2028-02-15, 2028-03-01)`; payment budget date belongs to `[2028-03-01, 2028-03-15)`, which is labeled `Adjusted after period end` at T2; statement date belongs to `[2028-03-15, 2028-04-01)`; no boundary changes |
| Targets | CAT-01 target remains `USD 200.00`; bill/payment amounts are never prorated |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 120.00 = USD 880.00` at settlement |
| Transactions / bills | BILL-01 remains a `USD 120.00` planning occurrence linked to PAYMENT-01; final payment spending `USD 120.00` is counted once in its authorization-date period; pending clears at settlement |
| Validation / alerts | Explanation states `Due February 29; payment authorized March 1; posted March 18`; no overage alert because `120.00 < 200.00` |
| Audit | Bill occurrence, payment authorization, reliable settlement link, all three dates, period IDs, amount, fulfilled-bill state, and completed-period adjustment are recorded |
| Non-changes | Payment does not move the bill's due date, bill planning period, payment budget date, targets, or boundaries and never creates a prorated bill amount |

**Given** BILL-01 is due February 29, authorized March 1, and settled March 18, **when** the linked lifecycle completes, **then** planning, budget-date spending, and statement activity occupy their three exact periods while the amount stays `USD 120.00`.

#### TYPE-03 — Linked and unlinked refunds remain distinct from reversals

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `refund`, `reversal`, `excess-credit`, `independent-spaces` |
| Authority | CBD-69-AC08, CBD-69-AC10 |
| Base fixture | CAL-HISTORY-01; independent SPACE-REFUND, SPACE-UNLINKED, and SPACE-REVERSAL; CAT-01 target `USD 150.00` |
| Starting state | SPACE-REFUND has settled EXP-REFUND-01 `USD 100.00`, budget date 2028-04-20 in completed April period, and cash `USD 900.00`; SPACE-UNLINKED has settled spending `USD 40.00`, cash `USD 1,000.00`, and no matching purchase; SPACE-REVERSAL has settled spending `USD 20.00`, cash `USD 1,000.00`, and no pending item |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Reversal authorization | `2028-05-14T10:00:00-04:00` America/New_York | SPACE-REVERSAL imports pending AUTH-REV-01 for `USD 100.00`, authorized 2028-05-14 |
| T1 — Reversal completes | `2028-05-14T15:00:00-04:00` America/New_York | Institution explicitly cancels AUTH-REV-01 before settlement |
| T2 — Unlinked refund posts | `2028-05-22T09:00:00-04:00` America/New_York | SPACE-UNLINKED imports REFUND-UNLINKED-01 for `USD 25.00` with no reliable purchase link |
| T3 — Linked refund posts | `2028-06-01T09:00:00-04:00` America/New_York | SPACE-REFUND imports reliably linked REFUND-01 for `USD 120.00`, posted 2028-06-01 |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | REFUND-01 retains source posted date June 1 but classifies to original expense budget date April 20, so April is labeled `Adjusted after period end`; REFUND-UNLINKED-01 uses its own posted date in `[2028-05-22, 2028-05-29)` and alters no earlier period; reversal leaves no classified settled event; boundaries and versions unchanged |
| Targets | CAT-01 remains `USD 150.00` in all three spaces; no refund credit funds another category |
| Income / cash | Linked refund raises SPACE-REFUND cash from `USD 900.00` to `USD 1,020.00`; unlinked refund raises SPACE-UNLINKED cash from `USD 1,000.00` to `USD 1,025.00`; neither is income; reversal leaves SPACE-REVERSAL cash `USD 1,000.00` because nothing settled |
| Transactions / bills | SPACE-REFUND net April spending is `100.00 − 120.00 = USD -20.00`, with `USD 20.00` labeled excess refund credit; statement view shows `USD -120.00` on June 1; SPACE-UNLINKED net current-period spending is `40.00 − 25.00 = USD 15.00`; SPACE-REVERSAL removes provisional `USD 100.00`, retains settled spending `USD 20.00`, and creates no refund line; bills unchanged |
| Validation / alerts | Refunds create no overage alert; unlinked refund explains posted-date fallback and offers Link to purchase; reversal clears any pending informational warning and creates no firm alert |
| Audit | Linked refund stores original link, both dates, full amount, before/after April totals, excess credit, and late-adjustment state; unlinked refund stores fallback state and any future link separately; reversal stores last-known authorization values and cancellation event |
| Non-changes | Linked refund is not capped or moved to June budget totals; unlinked refund does not alter earlier history without an explicit later link; reversal is not represented as a dated refund; none changes targets, boundaries, or income |

**Given** linked, unlinked, and never-settled return cases in independent spaces, **when** they resolve, **then** the linked refund produces `USD -20.00` net historical spending, the unlinked refund reduces only its posted-date period to `USD 15.00`, and the reversal merely removes its provisional impact.

#### TYPE-04 — Manually entered expense uses the user-selected date without a pending stage

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `manual-entry`, `selected-date`, `no-pending-stage` |
| Authority | CBD-69-AC08, CBD-69-AC12 |
| Base fixture | CAL-SAME-DATE; SPACE-01; ACTOR-01; CAT-01; MANUAL-EXP-01 |
| Starting state | Weekly period `[2028-04-03, 2028-04-10)`; CAT-01 target `USD 200.00`; settled spending `USD 20.00`; cash Not applicable because no account is selected; no institution source record or pending authorization exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Manual entry confirmed | `2028-04-03T11:00:00-04:00` America/New_York | ACTOR-01 creates MANUAL-EXP-01 for `USD 45.00` and selects transaction date 2028-04-03 |

| Outcome layer | Expected result at T0 |
| --- | --- |
| Period / schedule | User-selected date is the authoritative budget date and assigns the expense to start-inclusive `[2028-04-03, 2028-04-10)`; no boundary changes |
| Targets | CAT-01 target remains `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash is Not applicable because the manual entry is not assigned to an account and contains no balance mutation |
| Transactions / bills | MANUAL-EXP-01 is Settled at entry for `USD 45.00`, with no pending lifecycle; CAT-01 settled spending becomes `20.00 + 45.00 = USD 65.00`; budget-date and statement views both use 2028-04-03; bills unchanged |
| Validation / alerts | Entry succeeds; no authorization/posted-date fallback message and no alert because `65.00 < 200.00` |
| Audit | Entry records actor, timestamp, selected date, amount, category, manual provenance, period ID, and schedule-version reference |
| Non-changes | No institution authorization, posted date, pending state, reconciliation candidate, cash mutation, target change, or imported-activity match is inferred |

**Given** ACTOR-01 manually records `USD 45.00` on the first day of a weekly period, **when** entry is confirmed, **then** it is settled immediately on the selected date with CAT-01 spending `USD 65.00` and no pending or import-reconciliation stage.

### 5.6 Validation, permission, and recovery scenarios

#### VAL-01 — Weekly and monthly setup rejects missing or invalid inputs

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `setup-validation`, `field-errors`, `valid-clamping` |
| Authority | CBD-67-AC06, CBD-69-AC14 |
| Base fixture | CAL-WEEK-01 and CAL-MONTH-31; four independent unconfirmed proposals; ACTOR-01 |
| Starting state | ACTOR-01 is authenticated and authorized; no budget space, schedule version, period, target, income, cash, transaction, bill, alert, or creation audit exists; inputs not named in each variant are valid |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Blank weekly name | `2028-01-19T09:00:00-05:00` America/New_York | PROPOSAL-WEEK-NAME submits budget name `   ` with Weekly/Monday and America/New_York |
| T1 — Unsupported time zone | `2028-01-19T09:05:00-05:00` America/New_York | PROPOSAL-WEEK-TZ retains valid name `Household` but its previously selected time zone is no longer supported |
| T2 — Missing monthly anchor | `2028-01-19T09:10:00-05:00` America/New_York | PROPOSAL-MONTH-MISSING submits no valid anchor through authoritative validation |
| T3 — Numbered 31 accepted | `2028-01-19T09:15:00-05:00` America/New_York | PROPOSAL-MONTH-31 selects numbered anchor 31 and requests preview |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | T0–T2 create no authoritative period or schedule; T3 produces only a non-authoritative preview with boundaries 2028-01-31, 2028-02-29, and 2028-03-31 and retains saved anchor 31 |
| Targets | Not applicable before budget creation; no target record exists |
| Income / cash | Expected income, actual income, and cash are Not applicable; no account is in scope |
| Transactions / bills | None and no period-dependent records can be created |
| Validation / alerts | T0: `Enter a budget name.` T1: `Select a supported time zone to determine your budget dates.` T2: `Select when each monthly period should start.` Each blocks preview/confirmation and remains associated with its field. T3 is valid and shows the nonblocking short-month explanation; no alert |
| Audit | Rejected validations and T3 preview create no authoritative creation or schedule audit event; operational validation diagnostics may retain request identity without representing success |
| Non-changes | Valid fields remain entered; names are not silently truncated; anchor 31 is not rejected or rewritten to Last day; no partial budget, membership, schedule, period, or financial state is created |

**Given** independent weekly and monthly proposals with a blank name, unsupported time zone, missing anchor, and valid anchor 31, **when** validation runs, **then** the first three block with field-specific recovery messages while anchor 31 previews deterministic clamping without becoming an error.

#### VAL-02 — Custom preview blocks a generated gap, overlap, or reversed interval

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `custom-generator`, `integrity-check`, `gap`, `overlap`, `reversed-range` |
| Authority | CBD-68-AC12, CBD-69-AC13, CBD-69-AC14 |
| Base fixture | CAL-CUSTOM-01; independent PROPOSAL-GAP, PROPOSAL-OVERLAP, and PROPOSAL-REVERSED; ACTOR-01 |
| Starting state | Each proposal has valid custom inputs start date 2028-01-03 and whole-number length 10; no user can hand-author period rows; no authoritative schedule or financial state exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Gap detected | `2028-01-03T09:00:00-05:00` America/New_York | Integrity check receives faulty generated intervals `[2028-01-03, 2028-01-13)` and `[2028-01-14, 2028-01-24)`, leaving 2028-01-13 uncovered |
| T1 — Overlap detected | `2028-01-03T09:05:00-05:00` America/New_York | Independent preview returns `[2028-01-03, 2028-01-13)` and `[2028-01-12, 2028-01-22)`, duplicating 2028-01-12 |
| T2 — Reversed interval detected | `2028-01-03T09:10:00-05:00` America/New_York | Independent preview returns invalid interval `[2028-01-23, 2028-01-13)` |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | All three generated results are rejected before confirmation; no proposed row becomes authoritative and the valid stored rule is not silently substituted |
| Targets | Not applicable; no target record exists |
| Income / cash | Expected income, actual income, and cash are Not applicable |
| Transactions / bills | None and no classification is attempted without a valid authoritative schedule |
| Validation / alerts | Gap: `Your budget periods have a gap after January 12. Refresh the preview.` Overlap: `January 12 appears in more than one budget period. Refresh the preview.` Reversed: `A budget period must end after it starts. Refresh the preview.` Confirmation remains unavailable; no financial alert |
| Audit | Calculation-failure diagnostics retain preview ID, exact faulty intervals, rule inputs, and failure category; no schedule-confirmation or creation audit event exists |
| Non-changes | Entered start/length values remain available for retry; no arbitrary period-list editor, gap, overlap, duplicate row, finite end, schedule version, period, or financial state is created |

**Given** valid fixed-length inputs but a faulty generated preview, **when** integrity validation finds a gap, overlap, or reversed interval, **then** confirmation is blocked with the exact defect and refresh action while the product never exposes hand-authored custom periods as an MVP capability.

#### VAL-03 — Custom duration rejects zero and 367 days while accepting limits

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `duration-limit`, `one-day`, `366-day`, `open-ended` |
| Authority | CBD-68-AC12, CBD-69-AC13, CBD-69-AC14 |
| Base fixture | CAL-CUSTOM-LIMIT; independent PROPOSAL-L0, SPACE-L1, SPACE-L366, and PROPOSAL-L367; ACTOR-01 |
| Starting state | Every variant uses start boundary 2028-01-01 and has no prior schedule or financial state; the stated duration is the only delta |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Zero rejected | `2028-01-01T09:00:00-05:00` America/New_York | PROPOSAL-L0 submits whole-number duration 0 |
| T1 — One day confirmed | `2028-01-01T09:05:00-05:00` America/New_York | ACTOR-01 confirms a current preview for SPACE-L1 with duration 1 |
| T2 — 366 days confirmed | `2028-01-01T09:10:00-05:00` America/New_York | ACTOR-01 confirms a current preview for SPACE-L366 with duration 366 |
| T3 — 367 rejected | `2028-01-01T09:15:00-05:00` America/New_York | PROPOSAL-L367 submits duration 367 |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | PROPOSAL-L0 and PROPOSAL-L367 remain non-authoritative. SPACE-L1 creates `[2028-01-01, 2028-01-02)` then `[2028-01-02, 2028-01-03)` and repeats daily. SPACE-L366 creates `[2028-01-01, 2029-01-01)` then `[2029-01-01, 2030-01-02)` and repeats every 366 calendar days |
| Targets | No targets are inferred; totals are `USD 0.00` until explicitly configured |
| Income / cash | Expected and actual income are `USD 0.00`; cash is Not applicable because no account is selected |
| Transactions / bills | Empty; no activity is synthesized by schedule confirmation |
| Validation / alerts | T0: `Enter a whole number from 1 to 366 days.` T3: `This budget period is 367 days. Custom budget periods can be 1–366 days.` T1/T2 succeed without warnings; no alert |
| Audit | T1 and T2 each create exactly one schedule version and schedule-creation event with start, length, actor, timestamp, and first periods; rejected proposals create no success event |
| Non-changes | Accepted schedules have no finite end or expiration; rejected values create no partial schedule, period, target, or financial record |

**Given** custom durations 0, 1, 366, and 367 with the same start date, **when** they are validated and eligible previews confirmed, **then** only 1 and 366 create contiguous indefinite schedules and the two out-of-range values remain non-authoritative with exact recovery messages.

#### VAL-04 — Duplicate adjusted anchors deduplicate while occurrence exceptions cannot edit boundaries

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `duplicate-anchor`, `deduplication`, `occurrence-exception`, `prohibited-boundary-edit` |
| Authority | CBD-68-AC09, CBD-68-AC11, CBD-69-AC13, CBD-69-AC14 |
| Base fixture | CAL-HOLIDAY-01; SPACE-01; source occurrences 2028-01-15 and 2028-01-16; Previous business day; HOL-FED-2028-v1; ACTOR-01 |
| Starting state | Both source occurrences adjust to 2028-01-14; no schedule is confirmed; expected amounts are `USD 500.00` each; actual income and cash are `USD 0.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Deduplicated preview | `2028-01-05T09:00:00-05:00` America/New_York | Preview retains two expected occurrences but generates one distinct boundary on 2028-01-14 |
| T1 — Schedule confirmed | `2028-01-05T09:05:00-05:00` America/New_York | ACTOR-01 confirms the reviewed recurrence and business-day policy |
| T2 — Skip occurrence | `2028-01-05T09:10:00-05:00` America/New_York | ACTOR-01 applies Skip to only the 2028-01-15 source occurrence |
| T3 — Boundary-edit attempt | `2028-01-05T09:15:00-05:00` America/New_York | A direct occurrence-exception command attempts to move the 2028-01-14 boundary to 2028-01-17 |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | T1 creates exactly one 2028-01-14 boundary from the duplicate adjusted dates; T2 and rejected T3 leave that boundary and schedule version unchanged |
| Targets | All targets remain unchanged and independent of income projections |
| Income / cash | T1 current expected income on 2028-01-14 is `500.00 + 500.00 = USD 1,000.00`; T2 current expected becomes `USD 500.00` while preserving skipped history; actual income and cash remain `USD 0.00` |
| Transactions / bills | None; occurrence exceptions create no actual transaction or bill change |
| Validation / alerts | T3 is rejected with `Expected-paycheck changes do not move budget dates. Use schedule change to change a boundary.` No financial alert |
| Audit | T1 records both source-to-adjusted-date mappings and one boundary; T2 records the Skip before/after values; T3 retains rejected-command diagnostic/security evidence but creates no successful exception or schedule-change event |
| Non-changes | Deduplication never merges the two occurrence identities; Skip does not remove the boundary; T3 creates no version, period, target, cash, actual-income, or projection mutation |

**Given** two source occurrences adjust to the same banking date, **when** one is skipped and a later exception command attempts a boundary edit, **then** one boundary remains, the two occurrence histories stay distinct, and the boundary edit is rejected in favor of the schedule-change workflow.

#### SEC-01 — Read-only actor is not offered schedule-mutation controls

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `read-only`, `hidden-controls`, `least-privilege` |
| Authority | CBD-67-AC09, CBD-69-AC12 |
| Base fixture | CAL-TRANS-BOUND; SPACE-01; ACTOR-02 as explicitly provisioned Viewer |
| Starting state | Monthly/1st schedule is active; one confirmed Weekly/Monday change is pending effective 2028-06-19; ACTOR-02 may view this schedule and pending summary but has no schedule-mutation permission |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Active schedule viewed | `2028-06-01T09:00:00-04:00` America/New_York | ACTOR-02 opens the provisioned schedule view |
| T1 — Pending summary viewed | `2028-06-01T09:05:00-04:00` America/New_York | ACTOR-02 opens the confirmed pending-change summary |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Authorized schedule dates and pending effective date are read-only; active and pending versions remain unchanged |
| Targets | Only provisioned target information is visible; no target edit control exists and no value changes |
| Income / cash | Only explicitly provisioned values are visible; restricted values are omitted or masked rather than shown as zero; no financial value changes |
| Transactions / bills | Only provisioned records are visible; no mutation or override control exists |
| Validation / alerts | Configure, Preview change, Confirm, Edit pending change, and Cancel pending change controls are absent; read-only context explains that schedule changes require an authorized role; no denied-action error because no action was attempted |
| Audit | Viewing creates no successful or denied schedule-mutation audit event; ordinary access logging, if present, remains separate from financial audit history |
| Non-changes | Merely viewing cannot create a proposal, preview, pending revision, cancellation, schedule version, period, target, financial mutation, or security-denial event |

**Given** an explicitly provisioned Viewer may read the active schedule and pending summary, **when** ACTOR-02 opens both views, **then** authorized data is visible but every schedule-mutation control is absent and no denied action is fabricated.

#### SEC-02 — Permission revoked during editing causes a denied and audited mutation

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `permission-revocation`, `confirmation-recheck`, `security-audit` |
| Authority | CBD-67-AC17, CBD-69-AC12, CBD-69-AC14 |
| Base fixture | CAL-TRANS-BOUND; SPACE-01; ACTOR-01 initially authorized Collaborator; CHANGE-SEC-01 proposal |
| Starting state | Monthly/1st is active; no pending change; targets `USD 175.01`; cash `USD 1,000.00`; ACTOR-01 has configure/preview/confirm permission at T0 |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Editor opened | `2028-06-01T09:00:00-04:00` America/New_York | ACTOR-01 begins Weekly/Monday effective 2028-06-19 |
| T1 — Preview generated | `2028-06-01T09:05:00-04:00` America/New_York | A current boundary-aligned preview shows `[2028-06-19, 2028-06-26)` with full target `USD 175.01` |
| T2 — Permission revoked | `2028-06-01T09:06:00-04:00` America/New_York | A Primary Owner revokes ACTOR-01's schedule-mutation permission |
| T3 — Confirmation attempted | `2028-06-01T09:07:00-04:00` America/New_York | ACTOR-01 submits the previously valid preview and confirmation identity |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | Authoritative Monthly/1st schedule remains active; no pending change, future version, or proposed period becomes authoritative |
| Targets | Target remains `USD 175.01`; preview values are discarded as non-authoritative |
| Income / cash | Expected/actual income remain `USD 0.00`; cash remains `USD 1,000.00` |
| Transactions / bills | None change; no reclassification occurs |
| Validation / alerts | Confirmation rechecks permission and returns `You don't have permission to change this. Ask a Primary Owner, Co-owner, or Collaborator.` The preview becomes unusable and mutation controls are removed; no financial alert |
| Audit | Permission revocation is recorded as its own administrative/security event; denied confirmation records actor, timestamp, target action, preview/change identity, permission state, and unchanged before/after authoritative state; no Change confirmed/scheduled event exists |
| Non-changes | Denial cannot create or modify a schedule version, period, pending record, target, income, cash, transaction, bill, alert, or successful-action audit event |

**Given** ACTOR-01 loses schedule permission after generating a valid preview, **when** confirmation is submitted, **then** authoritative reauthorization denies the mutation, records the security event, and leaves every schedule and financial value unchanged.

#### SEC-03 — Hidden financial controls and direct unauthorized mutations are denied and audited

| Field | Value |
| --- | --- |
| Classification | Failure; tags: `least-privilege`, `direct-request`, `override`, `reconciliation`, `security-audit` |
| Authority | CBD-69-AC12, CBD-69-AC14, CBD-69-AC15 |
| Base fixture | CAL-CROSS-SETTLE; independent SPACE-SEC-OVERRIDE and SPACE-SEC-MATCH; provisioned VIEWER-01 and active provisioned PARTNER-01; CAT-01 target `USD 200.00` |
| Starting state | SPACE-SEC-OVERRIDE contains settled TX-SEC-OVR `USD 82.00`, posted and budget-dated 2028-03-02, cash `USD 918.00`, spending `USD 82.00`. SPACE-SEC-MATCH contains pending `USD 75.00` authorized 2028-02-29 plus posted `USD 82.00` dated 2028-03-02 in Duplicate-review, counted once at `USD 82.00`, cash `USD 918.00`. Income and bills are `USD 0.00` or empty; neither actor has override or reconciliation permission; no denial event exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Read-only views | `2028-03-02T13:00:00-05:00` America/New_York | Each actor opens explicitly provisioned transaction detail; override and Match/Unmatch/Split/Dismiss controls are absent |
| T1 — Direct override request | `2028-03-02T13:05:00-05:00` America/New_York | VIEWER-01 submits a direct request to change TX-SEC-OVR's budget date to 2028-02-29 |
| T2 — Direct match request | `2028-03-02T13:10:00-05:00` America/New_York | PARTNER-01 submits a direct request to match the Duplicate-review records |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | Both requests are denied before mutation; TX-SEC-OVR remains in `[2028-03-01, 2028-03-15)` and the disputed records retain their existing classification; no boundary or schedule version changes |
| Targets | Each target remains `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash remains `USD 918.00` in both spaces |
| Transactions / bills | TX-SEC-OVR retains budget date 2028-03-02 and spending `USD 82.00`. SPACE-SEC-MATCH remains Duplicate-review with one counted `USD 82.00` settlement and separate visible candidate evidence; bills remain empty |
| Validation / alerts | T1 and T2 return `You don't have permission to change this. Ask a Primary Owner, Co-owner, or Collaborator.` Controls remain hidden after denial; report and alert state remain unchanged |
| Audit | Two denied-action security events record actor, role, timestamp, space, target action, record IDs, attempted values, authorization result, and identical before/after financial state; no override or reconciliation-success event is created |
| Non-changes | Direct access cannot broaden provisioning, expose restricted details, edit a date, resolve a match, change totals, move cash, change alerts, or create a successful financial mutation |

**Given** provisioned read-only actors are not offered financial mutation controls, **when** they nevertheless submit direct override and reconciliation requests, **then** authorization denies both, records both security events, and preserves every date, record, total, and alert exactly.

#### RECOV-01 — Recoverable bank-data inconsistency preserves evidence and offers a recovery path

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `ambiguous-bank-data`, `source-correction`, `evidence-preservation`, `convergence` |
| Authority | CBD-69-AC06, CBD-69-AC14, CBD-69-AC15 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; CAT-01 target `USD 200.00`; PEND-RECOV-A `USD 80.00` authorized 2028-02-28; PEND-RECOV-B `USD 75.00` authorized 2028-02-29; settled spending `USD 20.00`; cash `USD 1,000.00` |
| Starting state | Both pending records are independently visible and lack a reliable settlement link; no posted record or firm alert exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Ambiguous settlement | `2028-03-02T09:00:00-05:00` America/New_York | POST-RECOV-01 settles `USD 82.00` on 2028-03-02 with weak similarity to both pending records |
| T1 — Reliable source correction | `2028-03-02T10:00:00-05:00` America/New_York | Institution supplies reliable linkage from POST-RECOV-01 to PEND-RECOV-B |
| T2 — Other hold removed | `2028-03-03T09:00:00-05:00` America/New_York | Source reports PEND-RECOV-A disappeared without settlement |

| Outcome layer | Expected result at T2 |
| --- | --- |
| Period / schedule | T0 temporarily uses posted date 2028-03-02 because two candidates exist; T1 reclassifies the unique matched settlement to PEND-RECOV-B's budget date 2028-02-29 in PERIOD-XSET-01; boundaries and schedule references never change |
| Targets | CAT-01 target remains `USD 200.00` |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 82.00 = USD 918.00` at T0 and never changes again during linking or removal |
| Transactions / bills | T0 counts posted `USD 82.00` once in PERIOD-XSET-02 while both candidates are suppressed from separate counted impact; T1 moves the same `USD 82.00` to PERIOD-XSET-01, whose settled spending becomes `20.00 + 82.00 = USD 102.00`, and restores PEND-RECOV-A as independent provisional `USD 80.00`; T2 removes that provisional amount as Removed-without-settlement; bills unchanged |
| Validation / alerts | T0 explains that multiple possible matches need review and permits waiting for synchronization or authorized review; T1 explains the source-resolved match; unresolved indicator clears; no firm alert because settled spending is below target |
| Audit | Append-only history retains both candidates, initial counted record/date, ambiguity evidence, reliable-link correction, `2028-03-02 → 2028-02-29` reclassification, before/after totals, and removal of PEND-RECOV-A |
| Non-changes | Recovery never deletes source evidence, counts `USD 82.00` twice, changes cash twice, rewrites source dates/amounts, alters targets/boundaries, or requires an assumed match |

**Given** one settlement initially has two plausible pending candidates, **when** reliable bank linkage later identifies one and the other hold disappears, **then** the system converges on one `USD 82.00` expense in PERIOD-XSET-01 while preserving the complete ambiguity and recovery history.

### 5.7 Alert, reporting, and end-to-end scenarios

#### ALERT-01 — Informational pending warning clears when pending activity disappears

| Field | Value |
| --- | --- |
| Classification | Recovery; tags: `informational-alert`, `pending`, `self-clear`, `recipient-scope` |
| Authority | CBD-69-AC04, CBD-69-AC06, CBD-69-AC11 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; CAT-01; TX-ALERT-PEND; ACTOR-01; provisioned VIEWER-01 and active provisioned PARTNER-01 |
| Starting state | PERIOD-XSET-01 CAT-01 target `USD 100.00`, settled spending `USD 40.00`, pending `USD 0.00`, cash `USD 1,000.00`; PARTNER-01 informational delivery is unmuted; no alert exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Pending hold | `2028-02-29T10:00:00-05:00` America/New_York | TX-ALERT-PEND authorizes `USD 75.00` on 2028-02-29 |
| T1 — Hold disappears | `2028-03-02T10:00:00-05:00` America/New_York | Source removes TX-ALERT-PEND without settlement |

| Outcome layer | Expected result at T0 and T1 |
| --- | --- |
| Period / schedule | T0 provisionally associates the hold with PERIOD-XSET-01; T1 removes its active classification; boundaries and schedule references stay unchanged |
| Targets | CAT-01 target remains `USD 100.00` |
| Income / cash | Income remains `USD 0.00`; cash remains `USD 1,000.00` because nothing settles |
| Transactions / bills | T0 keeps settled spending `USD 40.00` and separately shows provisional `USD 75.00`; T1 moves the hold to Removed-without-settlement and restores pending to `USD 0.00`; bills unchanged |
| Validation / alerts | T0 creates one informational warning stating that pending activity would make CAT-01 `USD 15.00` over if it settles; it never says the target has been exceeded. Eligibility includes ACTOR-01 and active, provisioned, unmuted PARTNER-01 but excludes VIEWER-01. Actual external delivery remains subject to CBD-12 consent and channel rules. T1 clears the in-product warning automatically without acknowledgement and creates no firm alert |
| Audit | Pending import and removal preserve amount/date/category, recipient eligibility result, alert creation/clear reason, timestamps, and last-known state |
| Non-changes | Informational delivery does not change permission, provisioning, financial state, or acknowledgement state; removal creates no settled spending, cash movement, firm alert, target change, or boundary change |

**Given** a pending hold would exceed CAT-01 only provisionally, **when** the hold disappears, **then** the informational warning clears itself, no Viewer is eligible for it, and settled spending remains exactly `USD 40.00`.

#### ALERT-02 — Settled overspending creates a firm alert that can be acknowledged

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `firm-alert`, `settled-overspending`, `acknowledgement` |
| Authority | CBD-67-AC14, CBD-69-AC11 |
| Base fixture | CAL-HISTORY-01; SPACE-01; CAT-01; TX-ALERT-SETTLED; ACTOR-01; provisioned VIEWER-01 and active provisioned PARTNER-01 |
| Starting state | February `[2028-02-01, 2028-03-01)` is active; CAT-01 target `USD 100.00`, settled spending `USD 90.00`, cash `USD 1,000.00`; no pending activity or alert |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Settlement | `2028-02-29T10:00:00-05:00` America/New_York | TX-ALERT-SETTLED posts and settles for `USD 20.00` with budget date 2028-02-29 |
| T1 — Acknowledgement | `2028-02-29T10:05:00-05:00` America/New_York | ACTOR-01 acknowledges the resulting firm alert |

| Outcome layer | Expected result at T1 |
| --- | --- |
| Period / schedule | Transaction remains in the active February period; boundaries and schedule version unchanged |
| Targets | CAT-01 target remains `USD 100.00`; no negative amount carries to March |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 20.00 = USD 980.00` |
| Transactions / bills | Settled spending becomes `90.00 + 20.00 = USD 110.00`; overspending is `110.00 − 100.00 = USD 10.00`; bills unchanged |
| Validation / alerts | T0 creates one firm alert that states CAT-01 is `USD 10.00` over. Recipient eligibility includes ACTOR-01, provisioned VIEWER-01, and active provisioned PARTNER-01; actual external delivery remains subject to CBD-12 consent and channel rules. T1 records acknowledgement but the firm alert does not self-clear while underlying overspending remains |
| Audit | Settlement, alert identity/type/eligible scope, overage calculation, acknowledgement actor, and acknowledgement timestamp are recorded |
| Non-changes | Acknowledgement changes no spending, target, cash, transaction, period, role, provisioning, or alert fact and does not create a second alert |

**Given** settled spending rises from `USD 90.00` to `USD 110.00` against a `USD 100.00` target, **when** ACTOR-01 acknowledges the firm alert, **then** `USD 10.00` overspending remains a settled fact and the acknowledgement is recorded without clearing or changing it.

#### ALERT-03 — Late adjustment creates a distinct completed-period alert

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `late-adjustment`, `completed-period`, `firm-alert` |
| Authority | CBD-69-AC09, CBD-69-AC10, CBD-69-AC11 |
| Base fixture | CAL-HISTORY-01; SPACE-01; CAT-01; TX-ALERT-LATE |
| Starting state | Shortened May `[2028-05-01, 2028-05-15)` under SCHED-V1 has CAT-01 target `USD 100.00` and settled spending `USD 40.00`; cash `USD 1,000.00`; no alert |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Pending authorization | `2028-05-14T10:00:00-04:00` America/New_York | TX-ALERT-LATE authorizes `USD 75.00` in the final date of the period |
| T1 — Period completes | `2028-05-15T00:00:00-04:00` America/New_York | SCHED-V2 opens while the authorization remains pending in the completed SCHED-V1 period |
| T2 — Late settlement | `2028-06-01T09:00:00-04:00` America/New_York | TX-ALERT-LATE settles for `USD 82.00` |
| T3 — Alert viewed | `2028-06-01T09:05:00-04:00` America/New_York | ACTOR-01 opens the resulting alert and completed-period detail |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | Budget date remains 2028-05-14; `[2028-05-01, 2028-05-15)` is labeled `Adjusted after period end` and retains SCHED-V1; SCHED-V2 periods unchanged |
| Targets | Completed target remains `USD 100.00`; no overspending carries into a later target |
| Income / cash | Income remains `USD 0.00`; cash becomes `USD 918.00` at settlement |
| Transactions / bills | Pending `USD 75.00` is replaced by settled `USD 82.00`; actual spending becomes `40.00 + 82.00 = USD 122.00`; completed-period overspending is `USD 22.00`; bills unchanged |
| Validation / alerts | Pending informational warning clears. One firm alert is explicitly titled/labeled as a late adjustment, names the completed May period and `USD 22.00` overage, and is visually and textually distinct from a current-period overspending alert |
| Audit | Settlement, before/after totals, SCHED-V1 reference, adjustment label, overage calculation, alert identity/type, and recipient eligibility remain attributable; T3 records exactly one view event for ACTOR-01 and the completed-period detail |
| Non-changes | Alert creation and viewing do not reopen the period, alter its target/boundaries/version, move the transaction, carry overspending, or create a current-period overage alert |

**Given** a May 14 authorization settles June 1 and makes its completed period `USD 22.00` overspent, **when** the alert is viewed, **then** it is unmistakably a firm late-adjustment alert and every completed-period boundary, version, and target remains unchanged.

#### ALERT-04 — Partner provisioning, masking, mute, and firm-alert independence remain explicit

| Field | Value |
| --- | --- |
| Classification | Boundary; tags: `accountability-partner`, `masking`, `mute`, `firm-independence`, `denied-action` |
| Authority | CBD-69-AC11, CBD-69-AC12, CBD-69-AC15 |
| Base fixture | CAL-SAME-DATE; SPACE-ALERT-ROLE; CAT-01 target `USD 100.00`; settled spending `USD 90.00`; cash `USD 1,000.00`; Primary Owner ACTOR-01; authorized COLLAB-01; provisioned VIEWER-01; active provisioned PARTNER-01; pending invite INVITEE-01; active unprovisioned PARTNER-02 |
| Starting state | PARTNER-01 may see category name and amount but merchant detail is masked; informational delivery is initially unmuted. INVITEE-01 has no role or access. PARTNER-02 has no CAT-01 provisioning. No pending activity, alert, acknowledgement, mute audit event, transaction, bill, or income exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — First pending warning | `2028-04-03T10:00:00-04:00` America/New_York | TX-ROLE-A authorizes `USD 15.00`, which would make provisional spending `USD 105.00` |
| T1 — Owner mute | `2028-04-03T10:05:00-04:00` America/New_York | ACTOR-01 mutes informational alerts to PARTNER-01 |
| T2 — First hold removed | `2028-04-03T10:10:00-04:00` America/New_York | TX-ROLE-A disappears without settlement and its warning clears |
| T3 — Second pending warning | `2028-04-03T10:15:00-04:00` America/New_York | TX-ROLE-B authorizes `USD 20.00`, which would make provisional spending `USD 110.00` |
| T4 — Second hold settles | `2028-04-03T10:20:00-04:00` America/New_York | TX-ROLE-B settles for `USD 20.00`, producing settled overspending `USD 10.00` |
| T5 — Collaborator unmute attempt | `2028-04-03T10:25:00-04:00` America/New_York | COLLAB-01 submits a direct request to unmute PARTNER-01 |
| T6 — Partner unmute attempt | `2028-04-03T10:30:00-04:00` America/New_York | PARTNER-01 submits the same direct request |

| Outcome layer | Expected result at T6 |
| --- | --- |
| Period / schedule | All activity remains in `[2028-04-03, 2028-04-10)`; schedule and boundaries remain unchanged |
| Targets | CAT-01 target remains `USD 100.00` |
| Income / cash | Income remains `USD 0.00`; cash becomes `1,000.00 − 20.00 = USD 980.00` only at settlement |
| Transactions / bills | TX-ROLE-A ends Removed-without-settlement. TX-ROLE-B replaces pending `USD 20.00` with settled `USD 20.00`; settled spending is `90.00 + 20.00 = USD 110.00`; bills remain empty |
| Validation / alerts | T0 eligibility includes ACTOR-01, COLLAB-01, and masked PARTNER-01; it excludes VIEWER-01, INVITEE-01, and PARTNER-02. After T1, T3 eligibility excludes PARTNER-01 but still includes ACTOR-01/COLLAB-01. T4 creates a firm alert eligible to ACTOR-01, COLLAB-01, provisioned VIEWER-01, and PARTNER-01 despite the informational mute. External delivery remains subject to CBD-12. T5/T6 are denied with the permission explanation |
| Audit | Warning create/clear identities, eligibility and masking results, Owner mute actor/time, settlement, firm alert, and both denied unmute security events are append-only; the mute value remains true |
| Non-changes | Mute changes no provisioning, masking, role, financial value, or firm eligibility; pending/inactive/unprovisioned identities receive no eligibility; denied requests change no mute or alert state |

**Given** active, inactive, provisioned, unprovisioned, muted, Viewer, and Collaborator cases, **when** pending and settled overages occur, **then** informational and firm eligibility, masking, mute independence, and denied actions resolve exactly without presuming CBD-12 delivery consent.

#### REP-01 — Budget-date and statement-date views explain different period placement

| Field | Value |
| --- | --- |
| Classification | Normal; tags: `reporting`, `budget-date`, `statement-date`, `reconciliation` |
| Authority | CBD-69-AC01, CBD-69-AC10, CBD-69-AC15 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-01; TX-REPORT-A and TX-REPORT-B; CAT-01 target `USD 200.00` per period; opening cash `USD 1,000.00` |
| Starting state | No transaction, bill, income, pending activity, report adjustment, or alert exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Cross-period authorization | `2028-02-29T10:00:00-05:00` America/New_York | TX-REPORT-A authorizes `USD 75.00` on 2028-02-29 |
| T1 — Cross-period settlement | `2028-03-02T09:00:00-05:00` America/New_York | TX-REPORT-A settles for `USD 82.00` on 2028-03-02 |
| T2 — Posted-only expense | `2028-03-02T09:05:00-05:00` America/New_York | TX-REPORT-B posts for `USD 30.00` with no authorization date and uses posted-date fallback |
| T3 — Reports opened | `2028-03-02T10:00:00-05:00` America/New_York | ACTOR-01 opens budget-date and statement-date views for both periods |

| View | `[2028-02-15, 2028-03-01)` | `[2028-03-01, 2028-03-15)` | Two-period total |
| --- | ---: | ---: | ---: |
| Budget-date view | TX-REPORT-A `82.00` | TX-REPORT-B `30.00` | `112.00` |
| Statement-date view | `0.00` | TX-REPORT-A `82.00` + TX-REPORT-B `30.00` = `112.00` | `112.00` |

| Outcome layer | Expected result at T3 |
| --- | --- |
| Period / schedule | Budget date 2028-02-29 keeps TX-REPORT-A in PERIOD-XSET-01, which is labeled adjusted; statement date 2028-03-02 shows it in PERIOD-XSET-02; TX-REPORT-B uses March 2 in both views; boundaries unchanged |
| Targets | Each target remains `USD 200.00` and is not mixed into transaction totals |
| Income / cash | Income remains `USD 0.00`; cash is `1,000.00 − 82.00 − 30.00 = USD 888.00` in either view |
| Transactions / bills | Each item appears once per view; budget-date period totals are `82.00` and `30.00`; statement totals are `0.00` and `112.00`; both views reconcile to itemized grand total `USD 112.00`. Exported rows contain distinct `budgetDate` and `postedDate` columns: TX-REPORT-A `2028-02-29` / `2028-03-02`, TX-REPORT-B `2028-03-02` / `2028-03-02`; bills unchanged |
| Validation / alerts | Views are clearly labeled and explain authorization versus posted date; no alert because each budget-date period is below its target |
| Audit | Source and derived dates, provenance, period IDs, settlement link, fallback rule, and report query context remain available; opening a report changes no financial audit state |
| Non-changes | Neither view reclassifies data, edits source dates, changes cash/targets/boundaries, duplicates an item, or presents one view as correcting the other |

**Given** one expense budgets to February but posts in March and another uses March posted-date fallback, **when** both report views and an export open, **then** their period totals differ exactly as shown, both date columns remain distinct, and both itemizations and grand totals reconcile to `USD 112.00`.

#### AUDIT-01 — Disputed match, override, late settlement, and category correction remain reconstructable

| Field | Value |
| --- | --- |
| Classification | End-to-end; tags: `audit-reconstruction`, `disputed-match`, `override`, `late-settlement`, `category-change`, `alert-reevaluation` |
| Authority | CBD-69-AC05, CBD-69-AC06, CBD-69-AC09, CBD-69-AC11, CBD-69-AC12, CBD-69-AC15 |
| Base fixture | CAL-CROSS-SETTLE; SPACE-AUDIT-01; authorized COLLAB-01; CAT-01 target `USD 100.00`; CAT-02 target `USD 200.00`; TX-AUDIT-01 |
| Starting state | PERIOD-XSET-01 has CAT-01 settled spending `USD 40.00` and CAT-02 `USD 20.00`; PERIOD-XSET-02 has `USD 0.00`; cash `USD 1,000.00`; income and bills `USD 0.00` or empty; no pending transaction, override, match, late-adjustment label, alert, or audit chain exists |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Pending import | `2028-02-29T10:00:00-05:00` America/New_York | TX-AUDIT-01 authorizes `USD 75.00` in CAT-01 with budget date 2028-02-29 |
| T1 — Budget-date override | `2028-02-29T10:05:00-05:00` America/New_York | COLLAB-01 changes the derived budget date to 2028-02-28 with reason `Receipt date correction` |
| T2 — Period completes | `2028-03-01T00:00:00-05:00` America/New_York | PERIOD-XSET-01 ends while TX-AUDIT-01 remains pending |
| T3 — Disputed late settlement | `2028-03-02T09:00:00-05:00` America/New_York | A weakly linked posted record settles for `USD 82.00`; exactly one pending candidate exists, so the posted amount is counted once at the candidate's overridden budget date while Duplicate-review opens |
| T4 — Manual match | `2028-03-02T09:05:00-05:00` America/New_York | COLLAB-01 confirms Match after reviewing merchant evidence |
| T5 — Category correction | `2028-03-02T09:10:00-05:00` America/New_York | COLLAB-01 changes TX-AUDIT-01 from CAT-01 to CAT-02 with reason `Correct category` |
| T6 — Audit and reports opened | `2028-03-02T09:15:00-05:00` America/New_York | COLLAB-01 reconstructs the timeline and opens both report views/export |

| Outcome layer | Expected result at T6 |
| --- | --- |
| Period / schedule | TX-AUDIT-01 retains overridden budget date 2028-02-28 in completed PERIOD-XSET-01 and posted date 2028-03-02 in PERIOD-XSET-02; the completed period is labeled `Adjusted after period end`; neither boundary nor schedule version changes |
| Targets | CAT-01 remains `USD 100.00`; CAT-02 remains `USD 200.00`; category correction changes actual classification only |
| Income / cash | Income remains `USD 0.00`; cash changes once at T3 to `1,000.00 − 82.00 = USD 918.00` and never changes for match, date, category, report, or audit operations |
| Transactions / bills | T0 provisional `USD 75.00` is replaced at T3 by one counted settled `USD 82.00`. Before T5 CAT-01 actual is `40.00 + 82.00 = USD 122.00`; after T5 CAT-01 returns to `USD 40.00` and CAT-02 becomes `20.00 + 82.00 = USD 102.00`; bills unchanged. The T6 export has separate `authorizationDate`, `postedDate`, `derivedBudgetDate`, and `currentBudgetDate` columns containing `2028-02-29`, `2028-03-02`, `2028-02-29`, and `2028-02-28` for TX-AUDIT-01 |
| Validation / alerts | T3 shows Duplicate-review and creates one firm late-adjustment alert for CAT-01 overage `122.00 − 100.00 = USD 22.00`. T4 clears only the unresolved-match indicator. T5 re-evaluates and resolves the overage alert because CAT-01 is no longer over and creates no CAT-02 alert because `102.00 < 200.00` |
| Audit | One ordered append-only chain retains import provenance, `2028-02-29 → 2028-02-28` override, period completion, weak candidate evidence, settlement `75.00 → 82.00`, Duplicate-review, manual Match, `CAT-01 → CAT-02` correction, before/after totals, late label, alert creation/resolution, actors, timestamps, reasons, record IDs, and schedule-version reference |
| Non-changes | No step overwrites source authorization/posted dates, deletes the disputed state or prior classification, counts settlement twice, moves cash twice, alters targets/boundaries, or loses either date in report/export |

**Given** one pending expense is overridden before its period ends and later settles through a disputed match, **when** an authorized category correction resolves the resulting overage, **then** cash moves once, totals and alerts re-evaluate exactly, and the full import-to-correction history remains reconstructable without rewritten evidence.

#### E2E-01 — Weekly-to-monthly change preserves target, income, transaction, alert, and audit invariants

| Field | Value |
| --- | --- |
| Classification | End-to-end; tags: `weekly-to-monthly`, `transition`, `income`, `late-settlement`, `idempotency` |
| Authority | CBD-67-AC10–AC18, CBD-68-AC04–AC06, CBD-69-AC04, CBD-69-AC05, CBD-69-AC11, CBD-69-AC12, CBD-69-AC15 |
| Base fixture | CAL-TRANS-MID variant B and continued CAL-MULTI-01 income recurrences; SPACE-E2E-01; ACTOR-01; CAT-01–03; TX-E2E-01 |
| Starting state | Weekly/Monday is authoritative; a prior explicit change made INCOME-SCHED-01/02 projection-only rather than boundary owners. Reviewed Monthly/1st targets are CAT-01 `USD 1,200.00`, CAT-02 `600.00`, CAT-03 `300.00`. Upcoming income is anchor `USD 2,000.00` on 2028-06-09 and secondary `USD 600.00` on 2028-06-15. Cash `USD 1,000.00`. Weekly period `[2028-06-12, 2028-06-14)` will have CAT-01 target `USD 100.00` and existing settled spending `USD 40.00` |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Future change confirmed | `2028-06-01T09:00:00-04:00` America/New_York | ACTOR-01 confirms Monthly/1st effective 2028-06-14 |
| T1 — Anchor income received | `2028-06-09T09:00:00-04:00` America/New_York | Exact `USD 2,000.00` anchor receipt posts and reconciles automatically |
| T2 — Expense authorized | `2028-06-13T10:00:00-04:00` America/New_York | TX-E2E-01 authorizes `USD 75.00` in `[2028-06-12, 2028-06-14)` |
| T3 — Change executes | `2028-06-14T00:00:00-04:00` America/New_York | Monthly/1st becomes authoritative and the 17-day transition opens |
| T4 — Secondary receipt | `2028-06-15T09:00:00-04:00` America/New_York | Secondary actual income posts `USD 630.00` on its expected date |
| T5 — Variance match confirmed | `2028-06-15T09:05:00-04:00` America/New_York | ACTOR-01 confirms the unique `5%` amount-variance suggestion |
| T6 — Expense settles late | `2028-06-16T09:00:00-04:00` America/New_York | TX-E2E-01 settles for `USD 82.00` after its weekly period ended |
| T7 — Exact replays | `2028-06-16T09:05:00-04:00` America/New_York | Stable execution, income, match, and settlement identities are replayed |

| Outcome layer | Expected result at T7 |
| --- | --- |
| Period / schedule | Old weekly `[2028-06-12, 2028-06-14)` remains under SCHED-WEEK; transition `[2028-06-14, 2028-07-01)` and full `[2028-07-01, 2028-08-01)` use SCHED-MONTH; income events create no boundary |
| Targets | Transition targets are CAT-01 `USD 680.00`, CAT-02 `340.00`, CAT-03 `170.00`, total `USD 1,190.00` from `17 ÷ 30`; full monthly target is `USD 2,100.00`. Old-period target stays `USD 100.00`; no remainder or overspending carries into the transition |
| Income / cash | Anchor expected/actual remain separate at `USD 2,000.00`; secondary expected stays `USD 600.00`, actual is `USD 630.00`, variance `USD 30.00`; cash is `1,000.00 + 2,000.00 + 630.00 − 82.00 = USD 3,548.00` |
| Transactions / bills | TX-E2E-01 keeps budget date June 13 in the completed weekly period; pending `USD 75.00` is replaced by settled `USD 82.00`; old-period settled spending is `40.00 + 82.00 = USD 122.00`; transition transaction spending is `USD 0.00`; bills unchanged |
| Validation / alerts | Pending informational warning clears at settlement; confirmed secondary match creates one `USD 30.00` variance notification; old period receives one firm late-adjustment alert for `122.00 − 100.00 = USD 22.00`; no current-transition overage alert |
| Audit | Linked schedule confirmation/execution, target inputs/calculation, both income receipts, automatic and user-confirmed matches, transaction lifecycle, late adjustment, alert identities, actors, timestamps, schedule versions, and before/after values form one ordered history |
| Non-changes | Income never funds categories; transaction settlement never moves its budget date; alerts never alter financial state; replay creates no duplicate cash, income, transaction, period, target, notification, alert, or successful audit event |

**Given** a weekly budget schedules a mid-period Monthly/1st change while income and an expense progress independently, **when** the change executes, income reconciles, the expense settles late, and every event replays, **then** exact targets, cash `USD 3,548.00`, old-period spending `USD 122.00`, alerts, dates, and audit history converge once without carry-forward or allocation.

#### E2E-02 — Holiday-adjusted paycheck with late settlement converges across the canonical timeline

| Field | Value |
| --- | --- |
| Classification | End-to-end; tags: `holiday`, `paycheck-anchor`, `late-income`, `late-settlement`, `idempotency` |
| Authority | CBD-68-AC01, CBD-68-AC02, CBD-68-AC04–AC10, CBD-68-AC13, CBD-68-AC14, CBD-68-AC16, CBD-69-AC01, CBD-69-AC02, CBD-69-AC04, CBD-69-AC05, CBD-69-AC07, CBD-69-AC09–AC12, CBD-69-AC15 |
| Base fixture | A December date variant of CAL-PAY-BIWEEK combined with CAL-HOLIDAY-01 and a December date variant of CAL-CROSS-SETTLE; SPACE-E2E-02; HOL-FED-2028-v1 and HOL-FED-2029-v1; ACTOR-01; CAT-01–03; TX-E2E-02 |
| Starting state | Biweekly anchor source dates are 2028-12-11, 2028-12-25, and 2029-01-08 with Previous business day policy; source 2028-12-25 adjusts to 2028-12-22. Because the third source occurrence falls in 2029, verified coverage for both 2028 and 2029 is required before confirmation; `HOL-FED-2029-v1` supplies it, and 2029-01-08 is an open Monday that needs no adjustment. Reviewed period targets total `USD 175.01`; `[2028-12-11, 2028-12-22)` has CAT-01 target `USD 100.00` and settled spending `USD 40.00`. Expected paycheck is `USD 2,000.00`; cash `USD 1,000.00`; no actual receipt or pending expense |

| Checkpoint | Exact time | Event |
| --- | --- | --- |
| T0 — Schedule confirmed | `2028-12-01T09:00:00-05:00` America/New_York | ACTOR-01 confirms previewed boundaries 2028-12-11, 2028-12-22, and 2029-01-08 with verified 2028 and 2029 holiday provenance |
| T1 — Expense authorized | `2028-12-21T10:00:00-05:00` America/New_York | TX-E2E-02 authorizes `USD 75.00` in `[2028-12-11, 2028-12-22)` |
| T2 — Adjusted anchor boundary | `2028-12-22T00:00:00-05:00` America/New_York | `[2028-12-22, 2029-01-08)` opens and the paycheck becomes Expected today |
| T3 — Paycheck late | `2028-12-26T00:00:00-05:00` America/New_York | After the weekend and December 25 closure, the unreconciled paycheck becomes Late on the next Federal Reserve business day |
| T4 — Paycheck received | `2028-12-26T09:00:00-05:00` America/New_York | Actual income `USD 2,000.00` posts on 2028-12-26 |
| T5 — Date-variance match confirmed | `2028-12-26T09:05:00-05:00` America/New_York | ACTOR-01 confirms the unique suggested link to the December 22 expectation |
| T6 — Expense settles late | `2028-12-26T10:00:00-05:00` America/New_York | TX-E2E-02 settles for `USD 82.00` after its authorization-date period ended |
| T7 — Exact replays | `2028-12-26T10:05:00-05:00` America/New_York | Schedule, income, match, authorization, and settlement identities replay |

| Outcome layer | Expected result at T7 |
| --- | --- |
| Period / schedule | Source occurrence December 25 remains traceable; adjusted distinct boundary is December 22; periods are `[2028-12-11, 2028-12-22)` and `[2028-12-22, 2029-01-08)`; occurrence/transaction events never move them |
| Targets | Current target remains full `USD 175.01`; prior CAT-01 target stays `USD 100.00`; no positive remainder or `USD 22.00` overspending carries forward and no target is funded from income |
| Income / cash | Expected record remains `USD 2,000.00` on December 22; actual is `USD 2,000.00` on December 26; date variance is four calendar days and one Federal Reserve business day, amount variance `USD 0.00`; cash is `1,000.00 + 2,000.00 − 82.00 = USD 2,918.00` |
| Transactions / bills | TX-E2E-02 retains budget date December 21 in the completed prior period; pending `USD 75.00` is replaced by settled `USD 82.00`; prior-period actual spending is `40.00 + 82.00 = USD 122.00`; statement view shows settlement December 26; bills unchanged |
| Validation / alerts | Pending warning and Late-income indicator clear on their respective resolutions; confirmed income link creates one date-variance notification; completed prior period receives one firm late-adjustment alert for `USD 22.00`; no current-period overage alert |
| Audit | Schedule confirmation retains source/adjusted dates, policy, and both HOL-FED-2028-v1 and HOL-FED-2029-v1 provenance, including that 2029-01-08 required no adjustment; income lifecycle/match, transaction lifecycle, late adjustment, alerts, actors, timestamps, values, and period/version links are append-only and reconstructable |
| Non-changes | No live holiday request, income allocation, boundary mutation, target mutation, source-date overwrite, double count, or replay duplicate occurs |

**Given** a Christmas anchor adjusts to December 22 and a December 21 expense later settles with a December 26 paycheck, **when** all lifecycle events and replays finish, **then** the canonical dates stay fixed, cash is `USD 2,918.00`, prior spending is `USD 122.00`, and every alert, variance, and audit outcome occurs exactly once.

## 6. Coverage controls

* Every scenario must map to at least one CBD-67 through CBD-69 criterion.
* Every governing criterion must map to at least one scenario.
* Important rules require at least one Normal case and at least one Boundary, Failure, or Recovery case, either directly or through an explicitly documented interaction.
* Pairwise selection replaces exhaustive Cartesian combinations, except where a governing rule or high-risk interaction requires a full combination.
* Draft mappings become final evidence only after Product Owner approval confirms the technically reviewed fixtures, checkpoints, calculations, outcomes, and acceptance wording.

## 7. Revision history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 0.10 | August 14, 2026 | Alexander Wohlford, Product Owner, with Claude assistance | Resolved independent-review findings RF-70-02 through RF-70-04 and RF-70-06. Replaced E2E-01's `CBD-67-AC10–AC18` range with an explicit list, since the range asserted AC11 (boundary-aligned change without proration) that a mid-period prorated transition cannot demonstrate, and AC13, which has no positive-remainder case in that scenario. Added CBD-68-AC08 to INC-10 and CBD-69-AC14 to E2E-02 to match the traceability record. Moved PER-M-01 to a 2027-12-20 confirmation with a year-boundary checkpoint so CAL-YEAR-01's stated purpose is exercised. Bound E2E-02 to the new `HOL-FED-2029-v1` fixture. Corrected the FIN-01 tie-break note: the CAT-02/CAT-03 remainders are exactly equal at `3/7`, not equal only at display precision. No expected period, monetary result, validation message, alert, or audit outcome changed. |
| 0.9 | August 14, 2026 | Codex with Alexander Wohlford as owner | Added nine review-driven scenarios for preview freshness and atomicity, accessibility, amount-only exceptions, holiday coverage/corrections, twice-per-week and remaining paycheck patterns, direct-request authorization, Accountability Partner controls, and cross-layer audit/report behavior. Tightened deterministic wording, financial baselines, eligibility semantics, and fixture references; all 75 scenarios are drafted. |
| 0.8 | August 13, 2026 | Codex with Alexander Wohlford as owner | Drafted ALERT-01–03, REP-01, and E2E-01–02, completing all 66 scenario drafts with alert lifecycle, recipient scope, dual-view reporting, cross-subsystem invariants, holiday provenance, and replay convergence. |
| 0.7 | August 13, 2026 | Codex with Alexander Wohlford as owner | Drafted VAL-01–04, SEC-01–02, and RECOV-01 with field-specific setup errors, custom-generator integrity and duration limits, duplicate-anchor and occurrence-exception boundaries, hidden read-only controls, audited mid-workflow permission revocation, and evidence-preserving bank-data recovery. |
| 0.6 | August 13, 2026 | Codex with Alexander Wohlford as owner | Drafted TXN-01–04, REC-01–05, LATE-01, OVR-01, and TYPE-01–04 with exact date classification, pending/settled counting, manual controls, arrival-order convergence, late adjustments, overrides, transfers, bills, refunds, reversals, and manual-entry behavior. Replaced an unsupported manual-to-import reconciliation proposal with the final-approved manual-entry rule. |
| 0.5 | August 13, 2026 | Codex with Alexander Wohlford as owner | Drafted FIN-01–03 and INC-01–09 with exact target calculations, no-carry-forward equations, projection/actual/cash separation, income lifecycle and reconciliation outcomes, and versioned business-day alternatives. |
| 0.4 | August 13, 2026 | Codex with Alexander Wohlford as owner | Drafted SET-01–03, CHG-01–10, and HIST-01 with exact setup previews, both change directions, immediate/future and mid-period/boundary behavior, pending lifecycle, validation, idempotent execution, audit, and historical stability. |
| 0.3 | August 13, 2026 | Codex with Alexander Wohlford as owner | Drafted all 12 period-generation scenarios with complete initial state, exact checkpoints, layered outcomes, audit and non-change assertions, and deterministic Given/When/Then wording. |
| 0.2 | August 13, 2026 | Codex with Alexander Wohlford as owner | Linked the completed draft calendar example set and corrected the calculation template to the approved CBD-67 overall-total rounding and largest-remainder reconciliation rule. |
| 0.1 | August 13, 2026 | Codex with Alexander Wohlford as owner | Created six scenario families, assigned 66 stable planned scenario IDs, reserved 20 reusable calendar dependencies, and mapped every planned scenario to final-approved governing criteria. |
