# CBD-68 — Paycheck and Custom Cadence Scenario Catalog

| Field | Value |
| --- | --- |
| Status | Approved |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval, on the evidence of an independent AI-assisted critical audit of Codex-authored drafts by Claude (see traceability record §11, RF-68-17–20), consistent with the CBD-67 precedent (CBD-67 traceability record §7) |
| Jira | [CBD-68](https://cobudget.atlassian.net/browse/CBD-68) |
| Governing specification | [CBD-68 workflow specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3735553) |
| Traceability | [CBD-68 traceability record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3768321) |
| Last updated | August 13, 2026 |

## 1. Purpose

This catalog supplies deterministic examples for product review, interface design, technical fixtures, and later automated tests. The governing specification is authoritative. A scenario demonstrates a rule but does not create one. Any dependency on an unresolved decision is labeled rather than silently assumed.

## 2. Shared conventions and dataset

Unless overridden:

| Attribute | Value |
| --- | --- |
| Budget-space time zone | America/New_York |
| Reference year | 2026 unless a scenario explicitly specifies another year |
| Currency | USD, two fractional digits |
| Budgeting model | target_tracking |
| Period dates | Inclusive |
| Date calendar | Gregorian |
| Income accounting | Expected and actual remain separate |
| Category model | Spending targets, not funded allocations |
| Confirmation | Atomic and version-bound |
| Primary household income | Salary A, projected $2,000 |
| Secondary household income | Salary B, projected $900 |
| Example category | Groceries, spending target $500 |

Expected income never counts as actual income. Actual income never changes spending targets or canonical boundaries. Fixed dates must replace execution-time expressions in tests.

## 3. Scenario template

Every scenario records:

* Scenario ID and title
* Governing requirements
* Given inputs and authoritative date context
* When action or event occurs
* Then exact boundaries, financial-state effects, messages, and audit outcome
* Open-decision dependency where applicable

## 4. Paycheck period generation

### PAY-01 — Biweekly Friday with no adjustment

**Evidence:** AC01, AC02, AC14; INV-68-01, 02, 10.

**Given:** Salary A is the anchor; recurrence origin Friday August 7, 2026; interval 14 days; policy Keep original calendar date.

**When:** Preview is generated.

**Then:**

* Anchor dates are August 7, August 21, and September 4.
* Periods are August 7–20 and August 21–September 3.
* August 21 is both the next occurrence and next period start.
* Confirmation records the recurrence origin and schedule version.

### PAY-02 — Adjusted occurrence does not shift recurrence origin

**Evidence:** AC01, AC07, AC08, AC14.

**Given:** Biweekly unadjusted dates are Friday June 19 and Friday July 3, 2026; policy Previous business day.

**When:** Dates are evaluated against the Federal Reserve Financial Services schedule.

**Then:**

* June 19 is a Federal Reserve holiday and adjusts to Thursday June 18.
* July 3 remains Friday July 3 because Federal Reserve Banks remain open on the Friday preceding a Saturday holiday.
* The following unadjusted occurrence remains July 17, calculated from the original recurrence sequence rather than either adjusted date.

### PAY-03 — Missing anchor blocks confirmation

**Evidence:** AC02, AC03, AC16.

**Given:** Two active income schedules exist and neither is selected as anchor.

**When:** User requests preview or confirmation.

**Then:** Preview reports “Choose the paycheck schedule that sets your budget dates.”; confirmation is blocked; no schedule version or period is created.

### PAY-06 — Twice-per-week generation with alternating period length

**Evidence:** AC01, AC14; INV-68-01, 02, 10, 11.

**Given:** Anchor pattern Twice per week, Monday and Thursday; recurrence origin Monday August 3, 2026; Keep original calendar date.

**When:** Preview is generated.

**Then:**

* Anchor dates are August 3, August 6, August 10, and August 13.
* Periods are August 3–5 (Monday–Wednesday, 3 days), August 6–9 (Thursday–Sunday, 4 days), and August 10–12 (Monday–Wednesday, 3 days).
* Period length alternates between 3 and 4 days every week; neither weekday requires a separate schedule or exception.
* No adjustment applies because none of the anchor dates fall on a weekend or Federal Reserve holiday.

## 5. Business-day adjustment

### BIZ-01 — Previous business day across observed holiday

**Evidence:** AC07, AC08, AC14.

**Given:** Unadjusted anchor Saturday July 4, 2026; Previous business day policy.

**When:** The schedule preview evaluates the described unadjusted date or dates.

**Then:** Adjusted date is Friday July 3 because Federal Reserve Banks remain open on the preceding Friday when a holiday falls on Saturday. Both July 4 and July 3 are displayed; July 3 is the boundary.

### BIZ-02 — Next business day across holiday

**Evidence:** AC07, AC08, AC14.

**Given:** Unadjusted anchor Saturday September 5, 2026; Next business day policy; Monday September 7 is Labor Day.

**When:** The schedule preview evaluates the described unadjusted date or dates.

**Then:** Adjusted date is Tuesday September 8; September 8 is the boundary.

### BIZ-03 — Keep original calendar date

**Evidence:** AC07, AC14.

**Given:** Unadjusted anchor Saturday September 5, 2026; Keep original calendar date.

**When:** The schedule preview evaluates the described unadjusted date or dates.

**Then:** Expected date and boundary remain September 5; no warning implies that cash will actually arrive that day.

### BIZ-04 — Two events adjust to one date

**Evidence:** AC03, AC08, AC11, AC14; INV-68-16, 17.

**Given:** Two separately identified expected events adjust to the same supported business date.

**When:** The schedule preview evaluates the described unadjusted date or dates.

**Then:** Calendar may group them visually; both events retain separate IDs, sources, amounts, and reconciliation states. If both are anchor occurrences, only one canonical boundary is generated and no zero-day period exists.

### BIZ-05 — Required year absent from verified local dataset

**Evidence:** AC08, AC16.

**Given:** A policy requiring holiday adjustment is selected and the required year is not present in the verified local Federal Reserve dataset.

**When:** The schedule preview evaluates the described unadjusted date or dates.

**Then:** Confirmation is blocked; the interface identifies the unsupported year; no weekday-only fallback is used. Existing confirmed historical dates remain unchanged.

## 6. Semimonthly and multiple anchors

### SEMI-01 — Fifteenth and last day in leap February

**Evidence:** AC11, AC14.

**Given:** Anchors are 15th and Last day; Keep original calendar date; year 2028.

**When:** The recurrence engine generates and previews the described monthly anchors.

**Then:** Boundaries are February 15, February 29, March 15, and March 31. Periods include February 15–28, February 29–March 14, and March 15–30.

### SEMI-02 — Numbered date clamps in short month

**Evidence:** AC11, AC14.

**Given:** Anchors are 15th and 31st; Keep original date; February through April 2027.

**When:** The recurrence engine generates and previews the described monthly anchors.

**Then:** The 31st anchor generates February 28, March 31, and April 30; it returns to 31 in May. The configured value remains 31.

### SEMI-03 — Duplicate calendar anchors after clamping

**Evidence:** AC11, AC14.

**Given:** Anchors are 30th and Last day for February 2027; Keep original date.

**When:** The recurrence engine generates and previews the described monthly anchors.

**Then:** Both source occurrences calculate February 28. They remain distinguishable, but produce one boundary.

### SEMI-04 — Adjustment happens after anchor calculation

**Evidence:** AC07, AC11, AC14.

**Given:** A Last day anchor lands on a non-business day.

**When:** The recurrence engine generates and previews the described monthly anchors.

**Then:** System first calculates the actual last calendar day and then applies the selected adjustment. It does not calculate “last business day” as the calendar anchor itself.

## 7. Multiple income sources

### MULTI-01 — One canonical anchor

**Evidence:** AC02, AC03, AC14.

**Given:** Salary A is biweekly anchor; Salary B is monthly secondary income.

**When:** The schedule preview or income workflow evaluates the described events.

**Then:** Only Salary A creates boundaries. Salary B appears in the applicable period as a projection.

### MULTI-02 — Secondary income received in an existing period

**Evidence:** AC03–AC06, AC14.

**Given:** Canonical period is August 7–20, 2026; Salary B projects $900 on August 12; actual $900 settles August 12.

**When:** The schedule preview or income workflow evaluates the described events.

**Then:** Actual income, balance, and cash-flow reporting reflect $900; expected and actual records reconcile; period remains August 7–20; Groceries target remains $500; no allocation step occurs.

### MULTI-03 — Same-day secondary and anchor income

**Evidence:** AC03, AC11, AC14.

**Given:** Anchor and secondary income both occur August 21.

**When:** The schedule preview or income workflow evaluates the described events.

**Then:** August 21 boundary comes only from anchor identity. Both events remain separately visible and reconcilable.

### MULTI-04 — Attempt to remove current anchor

**Evidence:** AC02, AC03, AC13, AC16.

**Given:** Salary A is current anchor.

**When:** User disables Salary A without selecting a replacement.

**Then:** Change is blocked. If Salary B is selected as replacement in the same change, the system previews a CBD-67 schedule transition and creates a new version only after confirmation.

## 8. Target-and-tracking behavior

### MODEL-01 — Income receipt does not fund categories

**Evidence:** AC04–AC06, AC14, AC16; INV-68-04–06.

**Given:** Groceries target is $500; actual spending is $180; $2,000 salary settles.

**When:** The described projection or received-income event is processed.

**Then:**

* Groceries target remains $500.
* Target remaining remains $320, subject to governing transaction rules.
* Actual income and current cash reporting update.
* No category-funding or available-to-assign record is created.

### MODEL-02 — Expected income changes without target changes

**Evidence:** AC04, AC05, AC10.

**Given:** Expected Salary A changes from $2,000 to $1,900 before receipt.

**When:** The described projection or received-income event is processed.

**Then:** Projected cash flow changes by −$100; spending targets and actual income remain unchanged; audit/history identifies a projection change.

### MODEL-03 — Future hybrid compatibility boundary

**Evidence:** AC15, AC16; INV-68-18.

**Given:** Historical target-and-tracking data exists and a future separately designed hybrid mode is enabled.

**When:** The described projection or received-income event is processed.

**Then:** Existing targets, periods, expected occurrences, actual transactions, and reconciliation links retain their meanings and IDs. New allocation records reference them without rewriting history. This is an architectural acceptance constraint, not MVP interface behavior.

## 9. Reconciliation outcomes

### REC-01 — Exact match

**Evidence:** AC04–AC06, AC10, AC14.

**Given:** $2,000 expected August 21; qualifying actual $2,000 received August 21.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** If source identity is compatible and there is no competing candidate, the occurrence is automatically reconciled; actual income is $2,000; date and amount variances are zero; targets and boundaries do not change.

### REC-02 — Early income

**Evidence:** AC06, AC10, AC14.

**Given:** $2,000 expected Friday August 21; qualifying actual $2,000 received Thursday August 20; compatible source identity; no competing candidate.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** The date differs, so the system presents a suggested match requiring user confirmation. Actual income is counted on August 20 independently of confirmation; display −1-day variance; boundary remains August 21.

### REC-03 — Late and different amount

**Evidence:** AC04–AC06, AC10, AC14.

**Given:** $2,000 expected August 21; $1,950 qualifies on August 24.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** August 24 is one Federal Reserve business day after August 21 and $1,950 is 2.5% below expected. The system presents a suggested match requiring confirmation. After confirmation, display +3 calendar-day / +1 business-day and −$50 / −2.5% variances. Actual reporting uses $1,950 on August 24 regardless of match confirmation; no target or boundary change.

### REC-04 — Missing income

**Evidence:** AC05, AC10, AC14.

**Given:** Expected date passes with no qualifying actual inflow.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:**

* On the next Federal Reserve business day it becomes Late and remains in current expected income and the near-term forecast.
* After the fifth Federal Reserve business day passes, it becomes Missing.
* Missing remains in the expected-date period's expected-income total and negative variance but is removed from forward-looking cash projection.
* Actual income, balances, targets, and boundaries do not change.

### REC-05 — Late income crosses period boundary

**Evidence:** AC04–AC06, AC10, AC14.

**Given:** $2,000 expected in Period A; it becomes Missing; qualifying $2,000 actual income arrives in Period B and reconciles.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** Period A retains $2,000 expected and $0 actual, labeled Reconciled late. Period B records $2,000 actual on receipt date and identifies the prior-period expectation. Aggregate reporting links the records without double counting or moving either period boundary.

### REC-05A — Skip a Late or Missing occurrence

**Evidence:** AC09, AC10, AC14.

**Given:** User applies Skip occurrence to a Late or Missing $2,000 occurrence.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** It is removed from current expected-income totals and forward forecast; original projected values and the skip remain in forecast-revision and audit history; it no longer contributes to expected-versus-actual variance. The recurring schedule is unchanged and the skip is reversible.

### REC-05B — Income arrives after skip

**Evidence:** AC09, AC10, AC14.

**Given:** Actual income arrives after its expected occurrence was skipped.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** It is recorded as unexpected actual income. User may retain it separately or reverse the skip and reconcile it. No automatic reversal occurs.

### REC-06 — Unexpected income

**Evidence:** AC06, AC10, AC14.

**Given:** A qualifying inflow has no expected occurrence.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** It counts as actual income. It is suggested only if one eligible expected occurrence satisfies the ±5 Federal Reserve business-day, ±5% amount, currency, and source rules; otherwise it remains unmatched. No schedule, target, or boundary change.

### REC-07 — Ambiguous candidates

**Evidence:** AC10, AC16.

**Given:** One actual inflow could match two expected occurrences.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** Preserve all records, present the qualifying candidates for user review, and reconcile none automatically.

### REC-08 — Manual unmatch

**Evidence:** AC10, AC16.

**Given:** User with permission removes an automatic or confirmed reconciliation link.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** A Primary Owner, Co-owner, or Collaborator may unmatch. Expected and actual records become separate; actual income remains actual; prior link and unmatch are audited; no target or boundary change.

### REC-09 — Suggestion at exact tolerance boundaries

**Evidence:** AC10, AC16.

**Given:** $2,000 is expected Monday August 3, 2026. One candidate arrives Monday August 10, 2026, exactly five Federal Reserve business days later, for $1,900, exactly 5% below expected, with compatible source identity.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** The candidate qualifies as a suggestion and requires confirmation. It does not reconcile automatically because date and amount are non-exact.

### REC-10 — Outside either tolerance

**Evidence:** AC10, AC16.

**Given:** Parameterize two cases: (A) $2,000 is expected Monday August 3, 2026 and a $2,000 candidate arrives Tuesday August 11, six Federal Reserve business days later; (B) $2,000 is expected and a same-day candidate is $1,899.99, more than 5% below expected.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** It is not suggested automatically. Actual income remains separately recorded. A permitted user may initiate a broader manual search, but the system does not imply a match.

### REC-11 — Competing exact candidates

**Evidence:** AC10, AC16.

**Given:** Two expected occurrences are equally eligible for the same exact actual transaction.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** No automatic reconciliation occurs. The interface requests user selection and records the confirmed choice.

### REC-12 — Rejected suggestion

**Evidence:** AC10, AC16.

**Given:** User rejects a suggested pairing.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** Expected and actual records remain separate; rejection is audited; the unchanged pairing is not repeatedly suggested.

### REC-13 — Split or combined income

**Evidence:** AC10, AC15, AC16.

**Given:** One expected paycheck appears as two deposits, or one deposit represents two expected occurrences.

**When:** The matching and expected-income lifecycle rules are evaluated.

**Then:** MVP does not automatically or manually reconcile the group as a single match. Records remain independently visible. Future reconciliation-group support is deferred, while stable identifiers preserve an extension path.

## 10. Occurrence exceptions

### EXC-01 — Shift anchor occurrence

**Evidence:** AC09, AC14.

**Given:** Anchor expected August 21 is shifted to August 24.

**When:** The described one-time change or income event is previewed and processed.

**Then:** Preview shows original and shifted projection dates and cash-flow effects. Canonical boundaries and adjacent period dates remain unchanged. Recurrence after the occurrence remains based on the original rule.

### EXC-02 — Skip anchor occurrence

**Evidence:** AC09, AC14.

**Given:** August 21 anchor occurrence is skipped and next anchor is September 4.

**When:** The described one-time change or income event is previewed and processed.

**Then:** Preview suppresses the August 21 income projection. Boundaries remain August 7, August 21, and September 4; periods remain August 7–20 and August 21–September 3.

### EXC-03 — Add extra anchor occurrence

**Evidence:** AC09, AC14.

**Given:** Extra anchor occurrence August 14 is inserted between August 7 and August 21.

**When:** The described one-time change or income event is previewed and processed.

**Then:** Preview adds an expected-income event on August 14 inside the existing August 7–20 period. No new boundary or period is created; the recurring rule remains unchanged.

### EXC-04 — Amount-only override

**Evidence:** AC09, AC10, AC14.

**Given:** One projected amount changes from $2,000 to $2,150.

**When:** The described one-time change or income event is previewed and processed.

**Then:** Projection changes by $150; dates and boundaries do not change; later occurrences retain $2,000.

### EXC-05 — Boundary change requires schedule change

**Evidence:** AC01, AC09, AC13, AC14.

**Given:** User wants August 21 to stop being a canonical boundary.

**When:** The described one-time change or income event is previewed and processed.

**Then:** Skip occurrence is not offered as a boundary edit. User must initiate a CBD-67 schedule change with effective-date, transition, proration, preview, history, and audit behavior.

### EXC-06 — Actual deposit does not create exception

**Evidence:** AC09, AC10.

**Given:** A unique expected $2,000 paycheck and a source-compatible actual $2,000 deposit share the same adjusted expected date; no competing candidate exists.

**When:** The described one-time change or income event is previewed and processed.

**Then:** The system automatically matches the records and shows zero variance. Processing the actual deposit does not shift, skip, or add any scheduled occurrence.

## 11. Custom recurring cadence

### CUSTOM-01 — Valid fixed-length recurring cadence

**Evidence:** AC12, AC14.

**Given:** Start August 1, 2026; period length 10 calendar days.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** Periods are August 1–10, August 11–20, and August 21–30, continuing indefinitely without gaps or overlaps.

### CUSTOM-02 — One-day periods

**Evidence:** AC12, AC14.

**Given:** Start August 11; length 1.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** Each calendar date is its own valid period and the sequence continues indefinitely.

### CUSTOM-03 — Maximum duration

**Evidence:** AC12, AC14.

**Given:** Start January 1, 2028; length 366.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** The first period is January 1–December 31, 2028 and is valid.

### CUSTOM-04 — Exceeds maximum

**Evidence:** AC12, AC14, AC16.

**Given:** Length 367.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** Confirmation is blocked with “Custom periods can be 1–366 days.”

### CUSTOM-05 — Nonpositive or fractional length

**Evidence:** AC12, AC14, AC16.

**Given:** Length is 0, negative, or not a whole number.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** Preview and confirmation are blocked with a field-specific validation message.

### CUSTOM-06 — Missing start boundary

**Evidence:** AC12, AC14, AC16.

**Given:** Length is valid but no start date is supplied.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** Preview and confirmation are blocked; no schedule version is created.

### CUSTOM-07 — Deterministic on-demand generation

**Evidence:** AC12, AC14, AC16.

**Given:** A confirmed 15-day cadence has been active for several years.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** Any historical or future window is generated from the same start boundary and length without arbitrary expiration.

### CUSTOM-08 — No expiration or Unplanned gap

**Evidence:** AC12, AC15.

**Given:** User takes no schedule action after confirmation.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** The rule continues generating canonical periods; it never becomes Expired and activity never becomes Unplanned because of schedule age.

### CUSTOM-09 — Active custom change

**Evidence:** AC12–14.

**Given:** User proposes changing a 10-day rule to a 14-day rule.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** CBD-67 governs effective date, transition, proration, no-carry-forward, confirmation, history, and audit; completed periods remain unchanged.

### CUSTOM-10 — Arbitrary period list unavailable

**Evidence:** AC12, AC15.

**Given:** User attempts to enter unrelated period rows or a finite end date.

**When:** The user requests preview or confirmation of the described custom cadence.

**Then:** MVP does not offer those controls. The user selects a fixed repeating length or another supported cadence; arbitrary and finite schedules are deferred as FF-010.

## 12. Supported paycheck cadence choices

### PAY-04 — Supported recurring paycheck patterns

**Evidence:** AC01, AC14, AC15.

**Given:** User opens paycheck cadence selection.

**When:** The interface or recurrence engine evaluates the described paycheck rule.

**Then:** The interface offers Twice per week, Weekly, Every two weeks, Twice per month, Monthly, and Custom recurring interval every 1–4 weeks. It does not use the ambiguous label Bimonthly.

### PAY-05 — Paycheck recurrence is indefinite

**Evidence:** AC01, AC14, AC15.

**Given:** A valid paycheck schedule is confirmed and no replacement is later confirmed.

**When:** The interface or recurrence engine evaluates the described paycheck rule.

**Then:** Its recurring rule continues generating occurrences and canonical boundaries deterministically on demand; it has no end date or automatic expiration.

## 13. Active schedule changes

### CHANGE-01 — Change anchor during active period

**Evidence:** AC13, AC14.

**Given:** Salary A is current anchor; user selects Salary B during an active period.

**When:** The user previews or confirms the described schedule change.

**Then:** Preview follows CBD-67 effective-date, transition, proration, no-carry-forward, history, and audit rules; completed periods remain unchanged; confirmation creates a new version.

### CHANGE-02 — Edit active custom schedule

**Evidence:** AC12, AC13.

**Given:** User changes future custom boundaries while current schedule is active.

**When:** The user previews or confirms the described schedule change.

**Then:** CBD-67 governs immediate/future effective date and transition behavior. Direct mutation of completed periods is prohibited.

### CHANGE-03 — Permission revoked after preview

**Evidence:** AC13, AC16.

**Given:** Authorized user generates preview; permission is revoked before confirmation.

**When:** The user previews or confirms the described schedule change.

**Then:** Confirmation is rejected; no partial version activates; user sees a permission explanation. Primary Owner, Co-owner, and Collaborator may act; Viewer and Accountability Partner cannot.

### CHANGE-04 — Concurrent schedule edit

**Evidence:** AC13, AC16.

**Given:** Two collaborators preview from the same version; one confirms first.

**When:** The user previews or confirms the described schedule change.

**Then:** The second preview becomes stale and cannot overwrite the first change.

### CHANGE-05 — Mid-period change to paycheck cadence

**Evidence:** AC13, AC14, AC16; PD-68-15.

**Given:** Current schedule is monthly. Proposed anchor is biweekly Friday with adjusted boundaries August 7 and August 21, 2026. Effective date is August 12. User reviews a $280 full-period Groceries target.

**When:** The user previews or confirms the described schedule change.

**Then:** Old period closes August 11. Transition is August 12–20. Adapter basis is August 7–20, 14 days. Groceries transition target is $180 after `$280 × 9 ÷ 14`. First full period is August 21–September 3 with $280. Occurrence exceptions do not affect these dates.

### CHANGE-06 — Boundary-aligned change to custom cadence

**Evidence:** AC12–14, AC16; PD-68-15.

**Given:** Proposed custom cadence has start boundary August 1 and fixed length 10 days. Effective date is August 21. User reviews a $300 full-period Groceries target.

**When:** The user previews or confirms the described schedule change.

**Then:** August 21 is a natural boundary. The first full period is August 21–30 with $300. No transition or proration is shown.

### CHANGE-07 — Explicit target review for a differently sized cadence

**Evidence:** AC04, AC13, AC16; PD-68-15.

**Given:** Old cadence has a $500 Groceries target and user proposes a cadence with a different period length.

**When:** The user previews or confirms the described schedule change.

**Then:** Product may prefill $500 with source explanation but cannot confirm until the user explicitly reviews the proposed full-period target. It never silently frequency-converts or reuses the amount. Any edit regenerates the preview.

## 14. Permissions

### PERM-01 — Collaborator performs schedule change

**Evidence:** AC13, AC16.

**Given:** Collaborator has active budget-space membership and no separate approval workflow is enabled.

**When:** The user attempts the described schedule action.

**Then:** Collaborator may configure, preview, and confirm the change; action is audited; no Owner approval is required in MVP.

### PERM-02 — Accountability Partner views but cannot act

**Evidence:** AC13, AC16.

**Given:** Accountability Partner views schedule, projections, and permitted history.

**When:** The user attempts the described schedule action.

**Then:** Information is visible subject to masking, but schedule, exception, match, unmatch, and confirmation controls are unavailable.

### PERM-03 — Profile-scoped Viewer

**Evidence:** AC13, AC16.

**Given:** Viewer has a Planning or Full-budget profile that includes schedule/projection access.

**When:** The user attempts the described schedule action.

**Then:** Viewer may view permitted data but cannot mutate or acknowledge on behalf of the budget space.

## 15. Notifications

### NOTIFY-01 — Mandatory in-app, optional external channels

**Evidence:** AC10, AC13, AC16.

**Given:** An eligible user receives a built-in Late-income event and has enabled push but not email or SMS.

**When:** Notification eligibility and delivery are evaluated.

**Then:** One in-app notification is created and one push is attempted. No email or SMS is sent.

### NOTIFY-02 — Per-user preferences differ

**Evidence:** AC16.

**Given:** Two eligible collaborators have different channel preferences for the same anchor-change event.

**When:** Notification eligibility and delivery are evaluated.

**Then:** Both receive in-app notifications. Each receives only their individually enabled email, push, or SMS deliveries.

### NOTIFY-03 — Access removed before delivery

**Evidence:** AC13, AC16.

**Given:** An external notification is pending and the recipient loses access to its financial detail.

**When:** Notification eligibility and delivery are evaluated.

**Then:** Delivery is canceled or redacted according to current access; no restricted amount is disclosed.

### NOTIFY-04 — Quiet hours and urgent preference

**Evidence:** AC16.

**Given:** A push/SMS event occurs during the user's quiet hours and the user has not enabled an urgent-event bypass.

**When:** Notification eligibility and delivery are evaluated.

**Then:** External delivery waits until quiet hours end; the in-app notification exists immediately.

### NOTIFY-04A — Explicit urgent-event bypass

**Evidence:** AC16; PD-68-13.

**Given:** A push/SMS event eligible for urgent delivery occurs during quiet hours and the user explicitly enabled the urgent-event bypass for that built-in event type.

**When:** Notification eligibility and delivery are evaluated.

**Then:** The enabled external channel is attempted immediately and the in-app notification exists immediately. The bypass does not enable another channel or change financial state.

### NOTIFY-05 — Notification acknowledgment has no domain effect

**Evidence:** AC10, AC13, AC16.

**Given:** User reads or dismisses a Missing-income or anchor-change notification.

**When:** Notification eligibility and delivery are evaluated.

**Then:** No occurrence, reconciliation, schedule, target, or transaction state changes.

### NOTIFY-06 — Custom trigger unavailable in MVP

**Evidence:** AC15, AC16.

**Given:** User attempts to define “Text me when projected income is 10% below targets for two periods.”

**When:** Notification eligibility and delivery are evaluated.

**Then:** MVP does not provide a custom-rule builder. Built-in event preferences remain available; custom alert creation is deferred as FF-009.

### NOTIFY-07 — Confirmed nonzero variance

**Evidence:** AC10, AC16; PD-68-16.

**Given:** $2,000 is expected August 21. A $1,950 transaction received August 24 is suggested and the user confirms the reconciliation.

**When:** Notification eligibility and delivery are evaluated.

**Then:** One confirmed actual-income variance event is created because both date and amount differ. It records +3 calendar days, +1 Federal Reserve business day, −$50, and −2.5%. Every eligible recipient receives in-app; optional channels follow individual preferences. Retrying delivery creates no second event.

### NOTIFY-08 — Speculative or exact pairing creates no variance event

**Evidence:** AC10, AC16; PD-68-16.

**Given:** Test each state: an unconfirmed suggestion, a rejected suggestion, an unmatched transaction, and a unique exact match with zero date and amount variance.

**When:** Notification eligibility and delivery are evaluated.

**Then:** None creates an actual-income variance notification. The suggestion/rejection/matching workflows retain their normal state and audit behavior.

### NOTIFY-09 — Corrected reconciliation revision

**Evidence:** AC10, AC16; PD-68-16.

**Given:** A confirmed variance event exists, then an authorized correction materially changes the linked actual amount.

**When:** Notification eligibility and delivery are evaluated.

**Then:** The unchanged original revision cannot notify again. The material correction creates at most one new variance event tied to the new revision and explains the updated difference. Historical notification evidence remains. Reading or dismissing either event changes no financial state.

## 16. Customer language and accessibility

### LANG-01 — Customer vocabulary replaces internal terms

**Evidence:** AC14, AC16; PD-68-17.

**Given:** A user configures, previews, confirms, and later reviews a paycheck match.

**When:** The applicable customer-facing content is rendered.

**Then:** Customer-facing content uses Budget period, Budget schedule, Schedule start, Expected paycheck, Received income, Match, Weekend and holiday payday rule, One-time paycheck change, and Short budget period. It does not expose Canonical period, Recurrence origin, Reconciliation, Dependency fingerprint, or raw identifiers. Audit and technical records retain the precise internal terms.

### LANG-02 — Neutral actionable notification language

**Evidence:** AC10, AC16; PD-68-13, PD-68-16, PD-68-17.

**Given:** An expected paycheck becomes Late, a possible match needs review, or a confirmed match has a variance.

**When:** The applicable customer-facing content is rendered.

**Then:** Copy identifies the event, relevant date, and next action without blame or suggesting that income funds spending. External privacy settings determine whether amounts appear.

### A11Y-01 — Keyboard and screen-reader schedule setup

**Evidence:** AC01–03, AC07–08, AC11–12, AC16; PD-68-17.

**Given:** A user completes paycheck and fixed-length custom setup using only a keyboard and a screen reader.

**When:** The described workflow is completed and its observable accessibility output is inspected.

**Then:** Every control has a persistent label, recurrence groups announce selection and help, dates include budget time-zone context, original and adjusted dates are distinguishable in text, focus follows schedule type → recurrence inputs → weekend/holiday payday rule → preview → confirm, all actions have visible focus, and confirmation is possible without pointer input.

### A11Y-02 — Validation and error recovery

**Evidence:** AC12, AC16; PD-68-17.

**Given:** Custom length is invalid, schedule start is missing, and confirmation is attempted.

**When:** The described workflow is completed and its observable accessibility output is inspected.

**Then:** Focus moves to a linked error summary; each message is associated with its field; entered values remain; messages identify the problem and correction; color and icons are not the only indicators.

### A11Y-03 — Accessible preview and dynamic updates

**Evidence:** AC13, AC16; PD-68-11, PD-68-15, PD-68-17.

**Given:** A preview contains old, short, and full periods and then recalculates.

**When:** The described workflow is completed and its observable accessibility output is inspected.

**Then:** Periods have semantic chronological headings or table headers, textual state labels, an equivalent structured view for any calendar/chart, and one polite live-region announcement stating “Preview updated” and the number of changed budget periods. Focus remains on the initiating control and the full preview table is not announced.

### A11Y-04 — Accessible notification preferences

**Evidence:** AC16; PD-68-13, PD-68-17.

**Given:** User configures channels, quiet hours, privacy, and SMS consent.

**When:** The described workflow is completed and its observable accessibility output is inspected.

**Then:** Channels are labeled independent groups; in-app is described as always on; optional controls expose state; SMS consent is explicit and not preselected; quiet hours include time-zone context; settings are keyboard operable.

### A11Y-05 — Match and same-date event identity

**Evidence:** AC03, AC10–11, AC16; PD-68-17.

**Given:** Multiple expected or received income events share a displayed date.

**When:** The described workflow is completed and its observable accessibility output is inspected.

**Then:** Each remains individually reachable and announces source, expected/received state, amount, date, and match status. Visual grouping does not merge accessible identity.

## 17. Preview and failure behavior

### PREVIEW-01 — Result-affecting change invalidates preview

**Evidence:** AC08, AC13, AC16.

**Given:** Preview exists and a fingerprinted schedule, target, calendar, or permission dependency changes.

**When:** The preview or confirmation operation is evaluated.

**Then:** Confirmation is rejected; draft inputs are preserved; the interface explains that the preview must be refreshed; no partial state is written.

### PREVIEW-02 — Thirty-minute expiration

**Evidence:** AC13, AC16.

**Given:** No dependency changes, but the user confirms more than 30 minutes after preview generation.

**When:** The preview or confirmation operation is evaluated.

**Then:** Confirmation is rejected as expired; draft inputs remain available; Refresh preview recalculates against current dependencies.

### PREVIEW-03 — Local midnight invalidation

**Evidence:** AC13, AC16.

**Given:** Preview is generated before budget-space local midnight and confirmation is attempted afterward.

**When:** The preview or confirmation operation is evaluated.

**Then:** Preview is stale even if less than 30 minutes old because the authoritative date changed.

### PREVIEW-04 — Display-only change does not invalidate

**Evidence:** AC16.

**Given:** An unrelated avatar or non-calculation label changes after preview.

**When:** The preview or confirmation operation is evaluated.

**Then:** Fingerprint remains valid and confirmation may proceed if every other condition passes.

### PREVIEW-05 — Atomic activation failure

**Evidence:** AC01, AC12, AC16.

**Given:** Persistence fails while confirming a valid schedule.

**When:** The preview or confirmation operation is evaluated.

**Then:** No schedule version, subset of periods, or subset of occurrences becomes authoritative; retry is safe and auditable.

### PREVIEW-06 — Duplicate confirmation request

**Evidence:** AC16.

**Given:** Same confirmation is submitted twice.

**When:** The preview or confirmation operation is evaluated.

**Then:** System produces one authoritative activation or returns the existing success; duplicate schedule versions are not created.

## 18. Scenario coverage summary

| Area | Scenarios |
| --- | --- |
| Paycheck boundaries | PAY-01–06 |
| Business-day handling | BIZ-01–05 |
| Semimonthly and duplicates | SEMI-01–04 |
| Multiple income | MULTI-01–04 |
| Target-and-tracking | MODEL-01–03 |
| Reconciliation | REC-01–13 plus REC-05A–05B |
| Occurrence exceptions | EXC-01–06 |
| Custom recurring cadence | CUSTOM-01–10 |
| Active changes and permissions | CHANGE-01–07, PERM-01–03 |
| Notifications | NOTIFY-01–09 plus NOTIFY-04A |
| Customer language and accessibility | LANG-01–02, A11Y-01–05 |
| Preview/failure | PREVIEW-01–06 |

## 19. Review dependencies

No scenario depends on an unresolved CBD-68 product decision. CBD-67 permissions and cadence adapter, customer language, accessibility, and notification wording are reconciled. Final cross-artifact verification is complete and the package is approved; remaining work is the separate technical specification and implementation.

## 20. First-draft exit checklist

- [x] Every required Jira example is represented or updated to the bounded recurring model.
- [x] All 16 acceptance criteria have scenario evidence.
- [x] Target-and-tracking behavior is demonstrated.
- [x] Normal, exceptional, validation, concurrency, and failure cases are included.
- [x] Dates and calculations are fixed and reproducible.
- [x] Finite/expiring and arbitrary-period behavior is removed from MVP scenarios.
- [x] Complete content and accessibility review.
- [x] Complete final cross-document and automated-test-convertibility review.
- [x] Record formal approval.


