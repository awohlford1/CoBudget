# CBD-70 — Deterministic Calendar Example Set

| Field | Value |
| --- | --- |
| Status | **Approved** |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval August 14, 2026, on the evidence of three Codex technical review passes, an independent Claude review that re-derived every date, interval, and monetary result, and the resolution of findings RF-70-01 through RF-70-06 (§8). |
| Jira subtask | [CBD-70](https://cobudget.atlassian.net/browse/CBD-70) |
| Scenario catalog | [CBD-70 Deterministic Budget Calendar and Financial Scenario Catalog](cbd-70-scenario-catalog.md) |
| Traceability record | [CBD-70 Acceptance Criteria Traceability and Review Record](cbd-70-acceptance-criteria-traceability.md) |
| Repository baseline | `eedd136` |
| Last updated | August 14, 2026 |

## 1. Purpose

This document defines the fixed calendar fixtures referenced by CBD-70 scenarios. Each fixture uses exact dates, a named budget-space time zone, a canonical start-inclusive/end-exclusive interval, and explicit schedule or event inputs. Fixtures are reusable baselines; scenario-specific changes and expected financial outcomes remain in the scenario catalog.

The fixture dates never use relative expressions such as “today,” “next Friday,” or “the current month.”

## 2. Shared conventions

| Convention | Value |
| --- | --- |
| Default budget space | `SPACE-01` |
| Default time zone | `America/New_York` |
| Default currency | `USD` |
| Canonical interval | `[startDate, exclusiveEndDate)` |
| Displayed interval | Inclusive start through `exclusiveEndDate - 1 calendar day` |
| Date format | ISO `YYYY-MM-DD` |
| Date-time format | ISO 8601 offset plus named IANA time zone |
| Week length | Seven calendar dates regardless of DST offset changes |
| Business-week days | Monday through Friday, excluding dates closed under the frozen holiday dataset |
| Monthly numbered anchor | Clamp to the final valid calendar date, then return to the configured number when possible |
| Paycheck boundary | Distinct adjusted anchor date; occurrence exceptions never change it |
| Custom boundary | Confirmed start plus integer multiples of the fixed 1–366-day length |
| Schedule transition | Effective date is exact; no backdating to a prior natural boundary |

### 2.1 Frozen holiday fixture

| Field | Value |
| --- | --- |
| Dataset ID | `HOL-FED-2028-v1` |
| Jurisdiction | United States |
| Product source | Federal Reserve Financial Services standard holiday schedule, as required by CBD-68 Approved §10 |
| Source URL | [Federal Reserve System Holiday Schedule](https://www.frbservices.org/about/holiday-schedules/) |
| Snapshot date | August 13, 2026 |
| Covered year | 2028 |
| Weekend rule | Saturday and Sunday are non-business days |
| Saturday holiday rule | The preceding Friday remains a Federal Reserve business day unless independently closed |
| Sunday holiday rule | The following Monday is closed |

The 2028 dates frozen for these fixtures are:

| Holiday | Calendar date | Day | Business-day treatment |
| --- | --- | --- | --- |
| New Year’s Day | 2028-01-01 | Saturday | Saturday is non-business; 2027-12-31 remains a business day |
| Martin Luther King Jr. Day | 2028-01-17 | Monday | Closed |
| Washington’s Birthday | 2028-02-21 | Monday | Closed |
| Memorial Day | 2028-05-29 | Monday | Closed |
| Juneteenth | 2028-06-19 | Monday | Closed |
| Independence Day | 2028-07-04 | Tuesday | Closed |
| Labor Day | 2028-09-04 | Monday | Closed |
| Columbus Day | 2028-10-09 | Monday | Closed |
| Veterans Day | 2028-11-11 | Saturday | Saturday is non-business; 2028-11-10 remains a business day |
| Thanksgiving Day | 2028-11-23 | Thursday | Closed |
| Christmas Day | 2028-12-25 | Monday | Closed |

Confirmed historical fixture dates do not change if a later holiday dataset changes. A future source correction requires an explicit CBD-70 impact review.

`HOL-FED-2028-v2` is the controlled corrected-version fixture used only by HOL-01. It retains every 2028 business-day result above but updates the dataset verification metadata on August 14, 2026. The version change is result-affecting provenance: it invalidates an unconfirmed v1 preview and requires a visible refresh, while already confirmed v1 history remains unchanged. `HOL-FED-COVERAGE-2035-ABSENT` is a deliberate no-dataset condition; it contains no inferred holidays and forces confirmation to block rather than falling back to weekdays alone.

### 2.2 Frozen holiday fixture — 2029

A biweekly December 2028 anchor sequence necessarily generates its next occurrence in 2029. Because an uncovered year must block confirmation rather than fall back to weekdays alone, any schedule whose previewed occurrences cross into 2029 requires verified 2029 coverage. `HOL-FED-2029-v1` supplies it. It uses the same jurisdiction, product source, weekend rule, Saturday rule, and Sunday rule as `HOL-FED-2028-v1`, snapshot date August 14, 2026, covered year 2029.

| Holiday | Calendar date | Day | Business-day treatment |
| --- | --- | --- | --- |
| New Year’s Day | 2029-01-01 | Monday | Closed |
| Martin Luther King Jr. Day | 2029-01-15 | Monday | Closed |
| Washington’s Birthday | 2029-02-19 | Monday | Closed |
| Memorial Day | 2029-05-28 | Monday | Closed |
| Juneteenth | 2029-06-19 | Tuesday | Closed |
| Independence Day | 2029-07-04 | Wednesday | Closed |
| Labor Day | 2029-09-03 | Monday | Closed |
| Columbus Day | 2029-10-08 | Monday | Closed |
| Veterans Day | 2029-11-11 | Sunday | Sunday is non-business; the following Monday 2029-11-12 is closed |
| Thanksgiving Day | 2029-11-22 | Thursday | Closed |
| Christmas Day | 2029-12-25 | Tuesday | Closed |

The only 2029 date material to the current fixtures is the E2E-02 boundary 2029-01-08, a Monday that is neither a weekend nor a listed holiday. Under Previous business day it therefore resolves to itself and requires no adjustment. The 2029-01-01 closure one week earlier is exactly why the year must be verified rather than assumed.

## 3. Shared financial reference data

Calendar fixtures may reference these stable entities. A scenario may override them explicitly as its delta.

| ID | Type | Value |
| --- | --- | --- |
| ACTOR-01 | Actor | Authenticated actor with schedule-management permission |
| ACTOR-02 | Actor | Authenticated actor with read access and no schedule-management permission |
| CAT-01 | Category | Housing |
| CAT-02 | Category | Groceries |
| CAT-03 | Category | Transportation |
| ACCT-01 | Account | Primary checking account |
| INCOME-SCHED-01 | Income schedule | Canonical anchor income |
| INCOME-SCHED-02 | Income schedule | Secondary income |

For the five-day weekly transition calculation in `CAL-TRANS-MID`, reviewed full-period targets are:

| Category | Full weekly target | Exact five-day value |
| --- | ---: | ---: |
| CAT-01 | USD 100.00 | `100.00 × 5 ÷ 7 = 71.428571…` |
| CAT-02 | USD 50.00 | `50.00 × 5 ÷ 7 = 35.714285…` |
| CAT-03 | USD 25.01 | `25.01 × 5 ÷ 7 = 17.864285…` |
| **Total** | **USD 175.01** | **`125.007142…`, rounded half-up once to USD 125.01** |

Largest-remainder reconciliation assigns the two residual cents to CAT-01 first and CAT-02 second; CAT-02 wins its tie with CAT-03 by stable category ID. Final transition targets are CAT-01 `USD 71.43`, CAT-02 `USD 35.72`, and CAT-03 `USD 17.86`, totaling `USD 125.01`.

## 4. Calendar fixtures

### 4.1 CAL-WEEK-01 — Normal Monday-anchored weekly sequence

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-WEEK-01` |
| Configuration | Weekly, Monday anchor |
| Reference date | 2028-01-19, Wednesday |
| Applicable scenarios | PER-W-01, SET-01, VAL-01 |

| Period ID | Canonical interval | Inclusive display | Days |
| --- | --- | --- | ---: |
| PERIOD-W01-01 | `[2028-01-17, 2028-01-24)` | 2028-01-17–2028-01-23 | 7 |
| PERIOD-W01-02 | `[2028-01-24, 2028-01-31)` | 2028-01-24–2028-01-30 | 7 |
| PERIOD-W01-03 | `[2028-01-31, 2028-02-07)` | 2028-01-31–2028-02-06 | 7 |
| PERIOD-W01-04 | `[2028-02-07, 2028-02-14)` | 2028-02-07–2028-02-13 | 7 |

The complete current anchored period on the reference date is `PERIOD-W01-01`; setup preview includes it and the next three periods.

### 4.2 CAL-WEEK-DST — Weekly dates across spring daylight saving

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-WEEK-DST` |
| Configuration | Weekly, Sunday anchor |
| DST event | America/New_York spring transition on 2028-03-12 |
| Applicable scenarios | PER-W-02 |

| Period ID | Canonical interval | Inclusive display | Days |
| --- | --- | --- | ---: |
| PERIOD-WDST-01 | `[2028-03-05, 2028-03-12)` | 2028-03-05–2028-03-11 | 7 |
| PERIOD-WDST-02 | `[2028-03-12, 2028-03-19)` | 2028-03-12–2028-03-18 | 7 |
| PERIOD-WDST-03 | `[2028-03-19, 2028-03-26)` | 2028-03-19–2028-03-25 | 7 |

The DST offset change does not add or remove a budget date. `PERIOD-WDST-02` contains seven dates even though elapsed clock time differs from 168 hours.

### 4.3 CAL-MONTH-31 — Numbered day-31 anchor across short months

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-MONTH-31` |
| Configuration | Monthly, numbered anchor 31 |
| Applicable scenarios | PER-M-02, SET-02, VAL-01 |

| Boundary | Reason |
| --- | --- |
| 2028-01-31 | Configured 31st |
| 2028-02-29 | Clamped to leap-February final day |
| 2028-03-31 | Returns to configured 31st |
| 2028-04-30 | Clamped to April final day |
| 2028-05-31 | Returns to configured 31st |

| Period ID | Canonical interval | Inclusive display | Days |
| --- | --- | --- | ---: |
| PERIOD-M31-01 | `[2028-01-31, 2028-02-29)` | 2028-01-31–2028-02-28 | 29 |
| PERIOD-M31-02 | `[2028-02-29, 2028-03-31)` | 2028-02-29–2028-03-30 | 31 |
| PERIOD-M31-03 | `[2028-03-31, 2028-04-30)` | 2028-03-31–2028-04-29 | 30 |
| PERIOD-M31-04 | `[2028-04-30, 2028-05-31)` | 2028-04-30–2028-05-30 | 31 |

Clamping is informational expected behavior and does not change the stored numbered anchor.

### 4.4 CAL-MONTH-LAST — Explicit last-day anchor across leap February

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-MONTH-LAST` |
| Configuration | Monthly, explicit Last day anchor |
| Applicable scenarios | PER-M-03 |

| Period ID | Canonical interval | Inclusive display |
| --- | --- | --- |
| PERIOD-MLAST-01 | `[2028-01-31, 2028-02-29)` | 2028-01-31–2028-02-28 |
| PERIOD-MLAST-02 | `[2028-02-29, 2028-03-31)` | 2028-02-29–2028-03-30 |
| PERIOD-MLAST-03 | `[2028-03-31, 2028-04-30)` | 2028-03-31–2028-04-29 |

The generated dates currently match the numbered-31 fixture, but the stored and displayed rule remains `Last day`; no clamping explanation is shown.

### 4.5 CAL-YEAR-01 — Monthly sequence across a calendar-year boundary

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-YEAR-01` |
| Configuration | Monthly, numbered anchor 15 |
| Reference date | 2027-12-20, Monday |
| Applicable scenarios | PER-M-01 |

| Period ID | Canonical interval | Inclusive display |
| --- | --- | --- |
| PERIOD-YEAR-01 | `[2027-12-15, 2028-01-15)` | 2027-12-15–2028-01-14 |
| PERIOD-YEAR-02 | `[2028-01-15, 2028-02-15)` | 2028-01-15–2028-02-14 |
| PERIOD-YEAR-03 | `[2028-02-15, 2028-03-15)` | 2028-02-15–2028-03-14 |

The complete current anchored period on the reference date is `PERIOD-YEAR-01`, which is open when the calendar year changes on 2028-01-01. The year change does not close or split that period and does not reset schedule identity, target history, or period numbering.

### 4.6 CAL-PAY-BIWEEK — Biweekly anchor with a three-paycheck month

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-PAY-BIWEEK` |
| Recurrence origin | 2028-01-07, Friday |
| Rule | Every 14 calendar days; Keep original calendar date |
| Applicable scenarios | PER-PAY-01, SET-03, E2E-02 |

Unadjusted and adjusted anchor dates are identical: 2028-01-07, 2028-01-21, 2028-02-04, 2028-02-18, 2028-03-03, 2028-03-17, 2028-03-31, and 2028-04-14. March contains three expected anchor-income occurrences.

| Period ID | Canonical interval | Inclusive display |
| --- | --- | --- |
| PERIOD-PAY-01 | `[2028-03-03, 2028-03-17)` | 2028-03-03–2028-03-16 |
| PERIOD-PAY-02 | `[2028-03-17, 2028-03-31)` | 2028-03-17–2028-03-30 |
| PERIOD-PAY-03 | `[2028-03-31, 2028-04-14)` | 2028-03-31–2028-04-13 |

### 4.7 CAL-PAY-TWICE-WEEK — Twice-per-week and remaining paycheck-pattern variants

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-PAY-TWICE-WEEK` |
| Rule | Twice per week on Monday and Thursday; Keep original calendar date |
| Applicable scenarios | PER-PAY-03 |

| Period ID | Canonical interval | Inclusive display | Days |
| --- | --- | --- | ---: |
| PERIOD-P2W-01 | `[2028-08-07, 2028-08-10)` | 2028-08-07–2028-08-09 | 3 |
| PERIOD-P2W-02 | `[2028-08-10, 2028-08-14)` | 2028-08-10–2028-08-13 | 4 |
| PERIOD-P2W-03 | `[2028-08-14, 2028-08-17)` | 2028-08-14–2028-08-16 | 3 |
| PERIOD-P2W-04 | `[2028-08-17, 2028-08-21)` | 2028-08-17–2028-08-20 | 4 |

Monday-to-Thursday periods contain three budget dates and Thursday-to-Monday periods contain four. The alternating length is the normal deterministic result of two weekly anchors, not a gap, overlap, or proration event.

The same fixture also supplies independent normal variants for the other paycheck patterns not already represented by CAL-PAY-BIWEEK or CAL-PAY-SEMI. Each variant uses Keep original calendar date and repeats indefinitely.

| Variant | Configuration | First two canonical intervals | Days |
| --- | --- | --- | --- |
| `SCHED-PAY-WEEKLY` | Weekly on Monday | `[2028-08-07, 2028-08-14)`, `[2028-08-14, 2028-08-21)` | 7, 7 |
| `SCHED-PAY-MONTHLY` | Monthly on the 15th | `[2028-08-15, 2028-09-15)`, `[2028-09-15, 2028-10-15)` | 31, 30 |
| `SCHED-PAY-3WEEK` | Monday every 3 weeks from 2028-08-07 | `[2028-08-07, 2028-08-28)`, `[2028-08-28, 2028-09-18)` | 21, 21 |

CAL-PAY-TWICE-WEEK, CAL-PAY-BIWEEK, and CAL-PAY-SEMI therefore provide exact normal generation for twice per week, weekly, every two weeks, twice per month, monthly, and a custom recurring interval within the supported 1–4-week range.

### 4.8 CAL-PAY-SEMI — Normal semimonthly anchor sequence

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-PAY-SEMI` |
| Rule | Twice per month on the 15th and Last day; Keep original calendar date |
| Applicable scenarios | PER-SEMI-01 |

| Boundary | Source anchor |
| --- | --- |
| 2028-01-15 | 15th |
| 2028-01-31 | Last day |
| 2028-02-15 | 15th |
| 2028-02-29 | Last day |
| 2028-03-15 | 15th |
| 2028-03-31 | Last day |

Every interval begins on one ordered distinct anchor and ends immediately before the next.

### 4.9 CAL-MULTI-01 — Multiple income schedules on one timeline

| Field | Value |
| --- | --- |
| Canonical anchor | `INCOME-SCHED-01`, biweekly Fridays 2028-02-18, 2028-03-03, 2028-03-17, 2028-03-31 |
| Secondary schedule | `INCOME-SCHED-02`, monthly on the 15th |
| Applicable scenarios | PER-MULTI-01, INC-01–03, INC-07, E2E-01 |

| Date | Event | Canonical effect |
| --- | --- | --- |
| 2028-03-03 | Anchor expected income, USD 2,000.00 | Opens `[2028-03-03, 2028-03-17)` |
| 2028-03-15 | Secondary expected income, USD 600.00 | Remains inside the current canonical period |
| 2028-03-17 | Anchor expected income, USD 2,000.00 | Opens `[2028-03-17, 2028-03-31)` |
| 2028-03-31 | Anchor expected income, USD 2,000.00 | Opens `[2028-03-31, 2028-04-14)` |

Secondary expected or actual income never creates a budget boundary or becomes the anchor automatically.

### 4.10 CAL-HOLIDAY-01 — Holiday adjustment and duplicate adjusted anchors

| Field | Value |
| --- | --- |
| Holiday dataset | `HOL-FED-2028-v1`; `HOL-FED-2029-v1` where a previewed occurrence crosses into 2029 |
| Default policy | Previous business day |
| Applicable scenarios | PER-SEMI-02, INC-08, INC-09, VAL-04, E2E-02 |

| Source occurrence | Policy | Adjusted date | Reason |
| --- | --- | --- | --- |
| 2028-01-01 | Previous business day | 2027-12-31 | Saturday; preceding Friday remains open |
| 2028-01-15 | Previous business day | 2028-01-14 | Saturday |
| 2028-01-16 | Previous business day | 2028-01-14 | Sunday |
| 2028-12-25 | Previous business day | 2028-12-22 | Monday holiday; weekend intervenes |
| 2028-12-25 | Next business day | 2028-12-26 | Supported alternative policy |
| 2028-12-25 | Keep original calendar date | 2028-12-25 | Supported alternative policy |

The 15th and 16th source occurrences remain separately traceable but produce one deduplicated 2028-01-14 boundary.

### 4.11 CAL-CUSTOM-01 — Valid repeating ten-day custom cadence

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-CUSTOM-10` |
| Start boundary | 2028-01-03 |
| Fixed length | 10 calendar days |
| Applicable scenarios | PER-CUST-01, SET-03, VAL-02 |

| Period ID | Canonical interval | Inclusive display | Days |
| --- | --- | --- | ---: |
| PERIOD-C10-01 | `[2028-01-03, 2028-01-13)` | 2028-01-03–2028-01-12 | 10 |
| PERIOD-C10-02 | `[2028-01-13, 2028-01-23)` | 2028-01-13–2028-01-22 | 10 |
| PERIOD-C10-03 | `[2028-01-23, 2028-02-02)` | 2028-01-23–2028-02-01 | 10 |
| PERIOD-C10-04 | `[2028-02-02, 2028-02-12)` | 2028-02-02–2028-02-11 | 10 |

The confirmed rule repeats indefinitely; it cannot generate a gap, overlap, finite end, or hand-authored exception period.

### 4.12 CAL-TRANS-MID — Mid-period schedule-transition variants

| Field | Value |
| --- | --- |
| Primary variant | A — monthly-to-weekly |
| Old schedule | `SCHED-MONTH-01`, monthly on the 1st |
| New schedule | `SCHED-WEEK-01`, weekly on Monday |
| Effective date | 2028-06-14, Wednesday |
| Next natural boundary | 2028-06-19, Monday |
| Applicable scenarios | CHG-01, CHG-02, CHG-05, CHG-09, FIN-01, E2E-01 |

| Period state | Canonical interval | Inclusive display | Target treatment |
| --- | --- | --- | --- |
| Shortened old period | `[2028-06-01, 2028-06-14)` | 2028-06-01–2028-06-13 | Retains its existing historical target and activity |
| Short transition | `[2028-06-14, 2028-06-19)` | 2028-06-14–2028-06-18 | Five days; targets prorated using `5 ÷ 7` |
| First full weekly | `[2028-06-19, 2028-06-26)` | 2028-06-19–2028-06-25 | Full reviewed weekly targets |
| Next full weekly | `[2028-06-26, 2028-07-03)` | 2028-06-26–2028-07-02 | Full reviewed weekly targets |

The effective date is not moved backward to Monday 2028-06-12. Transactions and bills are assigned by date and never prorated.

Variant B is a future weekly-to-monthly change confirmed on 2028-06-01 and effective 2028-06-14:

| Period state | Canonical interval | Inclusive display | Target treatment |
| --- | --- | --- | --- |
| Shortened old weekly | `[2028-06-12, 2028-06-14)` | 2028-06-12–2028-06-13 | Existing weekly target remains historical |
| Short monthly transition | `[2028-06-14, 2028-07-01)` | 2028-06-14–2028-06-30 | Seventeen days; proposed monthly targets use `17 ÷ 30` |
| First full monthly | `[2028-07-01, 2028-08-01)` | 2028-07-01–2028-07-31 | Full reviewed monthly targets |

Variant B is not backdated to the prior monthly boundary on 2028-06-01. Reviewed monthly targets CAT-01 `USD 1,200.00`, CAT-02 `USD 600.00`, and CAT-03 `USD 300.00` prorate exactly to `USD 680.00`, `USD 340.00`, and `USD 170.00`, totaling `USD 1,190.00`.

Variant C changes from monthly to a fixed ten-day custom cadence whose natural boundaries include 2028-06-10 and 2028-06-20. An effective date of 2028-06-14 creates `[2028-06-14, 2028-06-20)`, a six-day transition using a ten-day basis. Reviewed full custom targets CAT-01 `USD 300.00`, CAT-02 `USD 150.00`, and CAT-03 `USD 50.00` prorate exactly to `USD 180.00`, `USD 90.00`, and `USD 30.00`, totaling `USD 300.00`.

### 4.13 CAL-TRANS-BOUND — Boundary-aligned transition variants

| Field | Value |
| --- | --- |
| Old schedule | `SCHED-MONTH-01`, monthly on the 1st |
| New schedule | `SCHED-WEEK-01`, weekly on Monday |
| Effective date | 2028-06-19, Monday |
| Applicable scenarios | CHG-03, CHG-04, CHG-06–08, SEC-01, SEC-02 |

| Period state | Canonical interval | Inclusive display | Target treatment |
| --- | --- | --- | --- |
| Closed old period | `[2028-06-01, 2028-06-19)` | 2028-06-01–2028-06-18 | Historical; no carry-forward |
| First full weekly | `[2028-06-19, 2028-06-26)` | 2028-06-19–2028-06-25 | Full reviewed weekly targets |
| Next full weekly | `[2028-06-26, 2028-07-03)` | 2028-06-26–2028-07-02 | Full reviewed weekly targets |

No transition period or transition proration exists.

Variant B changes from weekly-on-Monday to monthly-on-the-1st, effective 2028-07-01. The old weekly schedule remains authoritative through 2028-06-30; the affected old weekly period is shortened to `[2028-06-26, 2028-07-01)`. A full monthly period begins `[2028-07-01, 2028-08-01)`. Because 2028-07-01 is a natural monthly boundary, no transition period or proration exists.

### 4.14 CAL-PAY-SKIP — Projection-only occurrence exceptions

| Field | Value |
| --- | --- |
| Schedule ID | `SCHED-PAY-BIWEEK` |
| Recurring anchor dates | 2028-02-04, 2028-02-18, 2028-03-03, 2028-03-17, 2028-03-31 |
| Applicable scenarios | PER-PAY-02, INC-04–06 |

| Exception or receipt | Date | Projection effect | Boundary effect |
| --- | --- | --- | --- |
| Shift 2028-02-18 occurrence | 2028-02-17 | Expected date changes once | None; boundary remains 2028-02-18 |
| Skip 2028-03-03 occurrence | 2028-03-03 | Expected occurrence is skipped | None; boundary remains 2028-03-03 |
| Extra expected income | 2028-03-10 | Adds a projection event | None |
| Missing expected receipt | 2028-03-17 | Expected remains unreconciled | None |
| Late receipt for 2028-03-17 | 2028-03-20 | Updates actual-income reporting on receipt | None |

Canonical periods remain `[2028-02-18, 2028-03-03)`, `[2028-03-03, 2028-03-17)`, and `[2028-03-17, 2028-03-31)`.

### 4.15 CAL-CROSS-SETTLE — Authorization and settlement across periods

| Field | Value |
| --- | --- |
| Schedule | Semimonthly boundaries on the 1st and 15th |
| Applicable scenarios | TXN-02, TXN-03, REC-01, REC-02, REC-04, REC-05, OVR-01, RECOV-01, ALERT-01, REP-01, E2E-02 |

| Period ID | Canonical interval | Inclusive display |
| --- | --- | --- |
| PERIOD-XSET-01 | `[2028-02-15, 2028-03-01)` | 2028-02-15–2028-02-29 |
| PERIOD-XSET-02 | `[2028-03-01, 2028-03-15)` | 2028-03-01–2028-03-14 |

| Event | Source date | Ingestion checkpoint |
| --- | --- | --- |
| Authorization `TXN-01`, USD 75.00 | 2028-02-29 | Scenario-defined order on 2028-03-01 |
| Settlement `TXN-01`, USD 82.00 | 2028-03-02 | Scenario-defined order |

After reconciliation, the authorization-derived budget date is 2028-02-29, the settled amount is USD 82.00, and the transaction remains in `PERIOD-XSET-01`.

### 4.16 CAL-DST-FALL — Repeated local hour

| Field | Value |
| --- | --- |
| Time zone | America/New_York |
| DST event | 2028-11-05 fall transition |
| Applicable scenarios | TXN-04 |

| Event | Timestamp | Derived budget date |
| --- | --- | --- |
| TX-DST-01 | `2028-11-05T01:30:00-04:00` America/New_York | 2028-11-05 |
| TX-DST-02 | `2028-11-05T01:30:00-05:00` America/New_York | 2028-11-05 |

The timestamps are distinct instants but share one local budget date. Transaction time does not select a different period.

### 4.17 CAL-TZ-UTC — UTC and budget-space dates disagree

| Field | Value |
| --- | --- |
| Time zone | America/New_York |
| Boundary | 2028-03-01 local date |
| Applicable scenarios | TXN-04 |

| Timestamp | Local representation | Derived budget date | Period |
| --- | --- | --- | --- |
| `2028-03-01T00:30:00Z` | `2028-02-29T19:30:00-05:00` | 2028-02-29 | `[2028-02-15, 2028-03-01)` |
| `2028-03-01T05:30:00Z` | `2028-03-01T00:30:00-05:00` | 2028-03-01 | `[2028-03-01, 2028-03-15)` |

UTC calendar date is not substituted for the derived budget-space date.

### 4.18 CAL-CUSTOM-LIMIT — Custom-duration limits

| Field | Value |
| --- | --- |
| Start boundary | 2028-01-01 |
| Applicable scenarios | PER-CUST-02, VAL-03 |

| Length input | Result |
| ---: | --- |
| 0 | Rejected; below the 1-day minimum |
| 1 | Accepted; first interval `[2028-01-01, 2028-01-02)` |
| 366 | Accepted; first interval `[2028-01-01, 2029-01-01)` |
| 367 | Rejected; above the 366-day maximum |

All accepted lengths repeat indefinitely; acceptance does not create a finite one-period schedule.

### 4.19 CAL-SAME-DATE — Multiple independent events on one date

| Field | Value |
| --- | --- |
| Budget date | 2028-04-03, Monday |
| Natural boundary | Weekly period opens on 2028-04-03 |
| Applicable scenarios | CHG-10, TXN-01, REC-03, TYPE-01, TYPE-04 |

For CHG-10, the confirmed pending replacement changes a monthly-on-the-1st schedule to weekly-on-Monday effective 2028-04-03. The old period is shortened to `[2028-04-01, 2028-04-03)` and the first full weekly period is `[2028-04-03, 2028-04-10)`.

| Local sequence | Event type | Event |
| ---: | --- | --- |
| 1 | Scheduled system event | Weekly boundary and any due confirmed schedule change execute at local midnight |
| 2 | Imported financial event | Expected anchor income is received |
| 3 | Imported financial event | Card authorization is received |
| 4 | Imported financial event | Same-date settlement or correction is received |
| 5 | Derived calculation | Reconciliation, balances, warnings, and audit projections update |

Individual scenarios may use a subset or reverse import steps 3 and 4. The exact arrival sequence affects intermediate state but equivalent sequences must converge on the same final financial state.

### 4.20 CAL-HISTORY-01 — Historical stability across a schedule change

| Field | Value |
| --- | --- |
| Old schedule | Monthly on the 1st |
| New schedule | Weekly on Monday, effective 2028-05-15 |
| Applicable scenarios | HIST-01, FIN-02, FIN-03, LATE-01, TYPE-03, ALERT-02, ALERT-03 |

| Period state | Canonical interval | Status |
| --- | --- | --- |
| Monthly January | `[2028-01-01, 2028-02-01)` | Completed |
| Monthly February | `[2028-02-01, 2028-03-01)` | Completed; includes leap day |
| Monthly March | `[2028-03-01, 2028-04-01)` | Completed |
| Monthly April | `[2028-04-01, 2028-05-01)` | Completed before the schedule change |
| Shortened monthly May | `[2028-05-01, 2028-05-15)` | Closed when new schedule activates |
| First weekly | `[2028-05-15, 2028-05-22)` | First full new period |
| Second weekly | `[2028-05-22, 2028-05-29)` | Full new period |

A transaction authorized on 2028-05-14 and settled on 2028-06-01 adjusts the closed `[2028-05-01, 2028-05-15)` period without changing its boundaries, schedule-version reference, or targets.

### 4.21 CAL-BILL-01 — Bill due, payment, and settlement in different periods

| Field | Value |
| --- | --- |
| Schedule | Semimonthly boundaries on the 1st and 15th |
| Bill ID | `BILL-01` |
| Amount | USD 120.00 |
| Applicable scenarios | TYPE-02 |

| Event | Date | Applicable period |
| --- | --- | --- |
| Bill due | 2028-02-29 | `[2028-02-15, 2028-03-01)` |
| Payment authorization | 2028-03-01 | `[2028-03-01, 2028-03-15)` under transaction-date rules |
| Payment settlement | 2028-03-18 | Posted in statement activity during `[2028-03-15, 2028-04-01)`, while the authorization-derived budget date remains 2028-03-01 |

The bill’s due status, payment transaction classification, and statement settlement date remain distinct. The actual bill amount is never prorated.

## 5. Fixture coverage roll-up

| Measure | Count | Status |
| --- | ---: | --- |
| Planned calendar IDs from scenario architecture | 21 | Complete |
| Calendar fixtures defined | 21 | Complete, reviewed, and approved |
| Duplicate calendar IDs | 0 | Verified |
| Relative dates | 0 | Verified |
| Unsupported out-of-MVP calendars | 0 | Verified |
| Holiday datasets | 2 versioned 2028 fixtures, 1 versioned 2029 fixture, plus 1 explicit absent-year condition | Defined |
| Years with verified holiday coverage | 2028, 2029 | Covers every previewed occurrence in the fixture set |
| Calendar and calculation review | 1 of 1 | Complete; Product Owner approval granted August 14, 2026 |

## 6. Revision history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | August 14, 2026 | Alexander Wohlford, Product Owner | **Approved.** Product Owner approval granted alongside the traceability record v1.0 and scenario catalog v1.0. No fixture ID, interval, anchor, adjusted date, holiday dataset, or monetary value changed at approval. Confirmed fixture dates are now frozen historical evidence: a later holiday-source correction requires an explicit CBD-70 impact review rather than a silent recalculation. |
| 0.3 | August 14, 2026 | Alexander Wohlford, Product Owner, with Claude assistance | Resolved independent-review findings RF-70-03 and RF-70-04. Added the `HOL-FED-2029-v1` frozen fixture so that E2E-02's 2029-01-08 boundary rests on verified coverage rather than an uncovered year, and referenced it from CAL-HOLIDAY-01. Gave CAL-YEAR-01 an explicit 2027-12-20 reference date so its December-to-January purpose is exercised by PER-M-01, and removed the "available year-boundary variants" phrase, which named no scenario. Re-pinned the repository baseline to `eedd136`. No interval, anchor, adjusted date, or monetary result changed. |
| 0.2 | August 14, 2026 | Codex with Alexander Wohlford as owner | Added the twice-per-week and remaining paycheck-pattern fixture, versioned holiday correction and uncovered-year conditions, corrected stale reverse references, and completed the calendar/calculation review across all 21 fixtures. |
| 0.1 | August 13, 2026 | Codex with Alexander Wohlford as owner | Defined all 20 planned reusable calendar fixtures with exact dates, canonical intervals, anchors, holiday provenance, schedule transitions, occurrence exceptions, and representative event timelines. Corrected the catalog rounding convention to the approved CBD-67 overall-total and largest-remainder rule. |
