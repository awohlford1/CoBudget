# CBD-68 — Paycheck and Custom Budget Cadence Workflow Specification

| Field | Value |
| --- | --- |
| Status | Approved |
| Document version | 1.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval, on the evidence of an independent AI-assisted critical audit of Codex-authored drafts by Claude (see traceability record §11, RF-68-17–20), consistent with the CBD-67 precedent (CBD-67 traceability record §7) |
| Jira | [CBD-68](https://cobudget.atlassian.net/browse/CBD-68) |
| Parent | [CBD-11](https://cobudget.atlassian.net/browse/CBD-11) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Governing schedule-change rules | [CBD-67 specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/655361) |
| Scenario catalog | [CBD-68 scenario catalog](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3342349) |
| Traceability and review | [CBD-68 traceability record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3768321) |
| Future features | [CoBudget Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) |
| Last updated | August 15, 2026 |

> **Approved:** This document defines binding product behavior for paycheck-based and custom budget periods. All product decisions (PD-68-01–17) are confirmed, no open decisions remain, and all cross-document review findings (RF-68-01–20) are resolved. Approved by Alexander Wohlford — Product Owner — on August 13, 2026.

## 1. Purpose and intended outcome

This specification defines user-visible behavior for paycheck-based and user-defined custom budget periods. It separates spending targets, expected-income projections, actual income, account activity, and actual spending. It is the product-rule input for interface design, technical design, reporting, reconciliation, and deterministic testing; it does not prescribe storage technology or implementation architecture.

A successful implementation lets a household:

* Maintain one understandable budget timeline even with multiple income sources.
* Set spending targets without allocating income to categories.
* Preview expected income and cash flow without treating projections as actual cash.
* Reconcile actual income without moving period boundaries or rewriting targets.
* Configure predictable paycheck, semimonthly, and custom periods.
* Understand every schedule change before confirmation.
* Preserve historical periods, source values, and audit evidence.

## 2. Product-model decision

### 2.1 Confirmed: target and tracking

The MVP uses **target-and-tracking**. A spending target states intended category spending for a period. Actual spending is compared with that target. Expected income informs projections. Actual income and account balances inform actual cash-flow reporting.

Income is not assigned to or used to fund categories. Receiving income:

* Updates actual-income totals when the supported receipt rule is satisfied.
* Updates account balances according to the transaction lifecycle.
* Updates actual and projected cash-flow views.
* May reconcile an expected occurrence.
* Never creates an “available to assign” pool.
* Never changes a spending target, actual spending, or canonical period.

### 2.2 Future hybrid compatibility

Optional envelope-style allocation is deferred as FF-006. Current design must keep targets, projections, actuals, periods, categories, and transactions independently modeled with stable identifiers. A future allocation layer may reference these records but must not change their meaning or rewrite historical target-and-tracking data.

## 3. Scope

### 3.1 In scope

* One canonical schedule and period sequence per budget space
* Multiple projected income sources
* Exactly one selected anchor schedule for paycheck-based periods
* Biweekly and other recurrence-based anchor generation
* Semimonthly and multiple calendar anchors
* Previous-business-day, next-business-day, and original-date policies
* One-time shift, skip, extra-occurrence, and projected-amount exceptions
* Expected-to-actual income reconciliation boundaries
* Inclusive custom periods lasting 1 through 366 days
* Preview, validation, confirmation, activation, versioning, and audit
* Active-schedule edits governed by CBD-67
* Implementation-facing entities, states, invariants, and error outcomes

### 3.2 Deferred

* Deposit-driven automatic period changes
* Automatic anchor selection
* Automatic spending-target changes based on income
* Envelope allocation and selectable hybrid mode
* Machine-learning prediction of irregular income
* Holiday calendars outside the supported US market
* Multiple simultaneous timelines in one budget space
* Final permissions and notification policy where CBD-12 must govern
* Technical choice of holiday provider or reconciliation algorithm
* Finite or expiring paycheck schedules
* Arbitrary nonrepeating custom-period lists and intentional gaps without an authoritative schedule

## 4. Terminology

| Term | Definition |
| --- | --- |
| Budget space | Shared planning context with one authoritative time zone, currency, schedule, and canonical period sequence. |
| Canonical schedule | The single active rule set that generates budget periods. |
| Schedule version | Immutable snapshot of confirmed schedule rules and effective dates. |
| Canonical period | Inclusive start and end dates generated by the canonical schedule. |
| Income source | Named source of expected or actual income, independent of schedule anchoring. |
| Income schedule | Recurrence and date-adjustment rules that generate expected occurrences. |
| Anchor schedule | The selected income schedule whose confirmed recurrence and business-day policy generate scheduled boundary dates independently of occurrence exceptions. |
| Secondary schedule | Income schedule whose occurrences appear within canonical periods but create no boundaries. |
| Expected occurrence | Projected income event with original date, adjusted date, projected amount, and status. |
| Actual income | Actual inflow counted on its posted, settled, or manually confirmed receipt date, as governed by CBD-69. |
| Reconciliation link | Relationship between expected occurrence and actual transaction; neither record replaces the other. |
| Occurrence exception | One-time change to a generated occurrence that does not edit the recurring rule. |
| Spending target | User-defined intended category spending for a period. |
| Actual spending | Applicable transaction activity compared with a spending target. |
| Current cash position | Supported account-balance view; distinct from targets and projections. |
| Preview | Non-authoritative calculation of proposed dates, periods, warnings, and effects. |

### 4.1 Internal and customer-facing vocabulary

Internal specifications, APIs, data models, audit records, and technical diagnostics retain the exact domain terms in §4. Customer-facing interfaces, notifications, help, validation, and accessible names use the following plain-language equivalents:

| Internal term | Customer-facing term |
| --- | --- |
| Canonical period | Budget period |
| Canonical schedule | Budget schedule |
| Anchor schedule | Paycheck schedule that sets budget dates; shortened to **Budget-date paycheck** where space is limited |
| Secondary schedule | Other expected-income schedule |
| Recurrence origin | Schedule start |
| Expected occurrence | Expected paycheck or expected income |
| Actual income | Received income |
| Reconciliation / reconciliation link | Match / matched paycheck |
| Business-day policy | Weekend and holiday payday rule |
| Occurrence exception | One-time paycheck change |
| Transition period | Short budget period |
| Dependency fingerprint | Preview inputs, or omitted when the implementation detail is unnecessary |

Customer copy must not expose IDs, version hashes, “canonical,” “recurrence origin,” “reconciliation,” or similar implementation language unless shown in an explicitly technical support context. Plain language does not weaken the underlying domain definitions.

## 5. Core invariants

| ID | Invariant |
| --- | --- |
| INV-68-01 | From initial activation onward, a budget space has exactly one authoritative schedule for every budget-space calendar date. A pending future change is not authoritative until execution, and the active rule continues until an explicit CBD-67 replacement becomes authoritative. |
| INV-68-02 | Only the selected anchor schedule creates paycheck-period boundaries. |
| INV-68-03 | Secondary income never creates a boundary. |
| INV-68-04 | A spending target changes only through an explicit authorized action. |
| INV-68-05 | Expected income is not actual income or current cash. |
| INV-68-06 | Actual income never changes spending targets automatically. |
| INV-68-07 | Actual transaction timing alone never moves a boundary. |
| INV-68-08 | Expected and actual values remain separately identifiable after reconciliation. |
| INV-68-09 | Recurring edits and occurrence exceptions are different, audited operations. |
| INV-68-10 | Period start and end dates are inclusive. |
| INV-68-11 | Canonical periods are chronological and non-overlapping. |
| INV-68-12 | A custom cadence is one confirmed fixed-length recurring rule whose generated periods are contiguous, non-overlapping, and indefinite until explicitly replaced. |
| INV-68-13 | Completed periods retain the schedule-version identity that governed them. |
| INV-68-14 | Confirmation cannot accept a stale preview. |
| INV-68-15 | Schedule activation is atomic; partial schedules are not authoritative. |
| INV-68-16 | Same-date income events retain distinct identities even if grouped visually. |
| INV-68-17 | Duplicate adjusted anchor dates create one boundary, not a zero-day period. |
| INV-68-18 | Future allocation records must not change historical target-and-tracking semantics. |
| INV-68-19 | Every activated paycheck or custom cadence is explicitly selected, recurring, deterministic, and open-ended until replaced through CBD-67. |
| INV-68-20 | No activated MVP paycheck or custom cadence expires automatically or creates an uncovered calendar date. |
| INV-68-21 | Shift, skip, extra, and amount occurrence exceptions modify income projections only and never modify canonical boundaries. |

## 6. Financial-state model

| State or measure | Source | Product effect |
| --- | --- | --- |
| Spending target | Explicit user plan | Baseline for target-versus-actual reporting |
| Expected income | Income schedule or occurrence override | Projection and calendar only |
| Actual income | Qualifying actual inflow | Actual-income and cash-flow reporting |
| Current cash position | Account balances and supported transaction lifecycle | Cash reporting; not category funding |
| Pending activity | Imported or entered but unsettled activity | Separately labeled provisional reporting |
| Settled activity | Posted or settled account activity | Actual reporting |
| Actual spending | Classified outflow | Compared with spending target |
| Target remaining | Target minus applicable actual spending | Performance measure, not reserved cash |
| Projection variance | Expected versus actual date and amount | Explanation; no schedule or target mutation |

## 7. Paycheck-based initial setup

### 7.1 Required inputs

For each income source:

* Display name
* Projected amount and currency context
* Recurrence type and recurrence-specific values
* Supported recurring pattern and recurrence-specific values
* First applicable unadjusted occurrence or recurrence origin
* Non-business-day policy
* Whether the schedule is active
* One selected canonical anchor among eligible active schedules

### 7.2 User journey

1. Select **Paycheck-based** cadence.
2. Add at least one income source and valid schedule.
3. Select exactly one anchor schedule.
4. Review generated unadjusted and adjusted occurrences.
5. Review canonical periods and secondary events.
6. Resolve blocking errors.
7. Confirm the exact preview.
8. System atomically creates the schedule version, expected occurrences, and canonical periods.
9. Interface shows activation outcome and audit reference.

### 7.3 Period formula

For ordered, distinct adjusted anchor dates A\[n\]:

* Period n starts on A\[n\].
* Period n ends on A\[n+1\] minus one calendar day.
* The start and end are inclusive.
* A preview must include enough future anchor dates to display every shown period’s end.
* Duplicate scheduled adjusted boundary dates are deduplicated for boundary generation only.
* Occurrence exceptions do not alter A\[n\]. Any boundary change is a CBD-67 schedule change.
* The confirmed recurring rule generates occurrences and periods deterministically on demand.
* Every paycheck schedule is open-ended and remains authoritative until explicitly replaced through CBD-67.
* Preview shows the current applicable period and sufficient future periods to demonstrate recurrence and every displayed end boundary.
* No end date, occurrence-count limit, automatic expiration, or uncovered post-schedule state exists for an MVP paycheck schedule.

**Decision PD-68-14:** Paycheck schedules are deterministic, recurring, and indefinite until explicitly replaced. This supersedes the finite-paycheck portion of PD-68-08. Approved by Alexander Wohlford on August 12, 2026.

## 8. Multiple-income behavior

* One and only one eligible income schedule is selected as anchor.
* Every other income schedule is secondary.
* Secondary expected and actual income is displayed within the applicable canonical period.
* Same-day events may be grouped for readability but retain source, amount, status, variance, and reconciliation identity.
* Disabling or deleting the current anchor is blocked until another valid anchor is selected as part of the same confirmed change.
* Changing the anchor creates a new canonical schedule version and follows CBD-67.
* Reconciliation of any income source never promotes it to anchor automatically.
* An unexpected deposit never becomes an anchor occurrence without an explicit schedule or exception action.

## 9. Recurrence and calendar-anchor rules

### 9.1 Interval-based recurrence

An interval recurrence preserves its cadence from the configured recurrence origin. A biweekly schedule advances by 14 calendar days from its unadjusted origin before business-day adjustment. Adjusting one occurrence does not move the recurrence origin.

### 9.2 Semimonthly and multiple anchors

Supported patterns include numbered dates and **Last day of month**, including combinations such as 1st/15th and 15th/last day.

Generation order:

1. Generate each calendar anchor in the budget-space calendar.
2. For a numbered anchor that does not exist, clamp to the last valid calendar day.
3. A clamped anchor returns to the configured number in a later month where it exists.
4. A Last day anchor uses the actual final day.
5. Sort unadjusted dates chronologically.
6. Apply each schedule’s business-day policy.
7. Sort adjusted dates.
8. Deduplicate adjusted dates for boundary creation.
9. Retain all source occurrences and adjustment provenance.

### 9.3 Supported paycheck patterns and bounded customization

| Pattern | Configuration |
| --- | --- |
| Twice per week | Two distinct weekdays in each week |
| Weekly | One selected weekday |
| Every two weeks | One selected weekday and recurrence origin, advancing by 14 calendar days |
| Twice per month | Two distinct monthly anchors, each a numbered date or Last day |
| Monthly | One numbered monthly anchor or Last day |
| Custom recurring interval | One selected weekday recurring every 1, 2, 3, or 4 weeks |

The interface does not use **bimonthly**, because it can mean twice per month or every two months. It uses the explicit names above.

Customization is limited to repeatable inputs: weekday or monthly anchor, recurrence origin where applicable, expected amount, business-day policy, and one-time occurrence exceptions. Users cannot hand-author unrelated paycheck periods, enter a finite paycheck schedule, or create a nonrepeating anchor sequence.

All supported patterns repeat indefinitely until an authorized user confirms a replacement through CBD-67.

## 10. Business-day adjustment

### 10.1 Policies

| Policy | Result |
| --- | --- |
| Previous business day | Move backward to the nearest supported business day; MVP default. |
| Next business day | Move forward to the nearest supported business day. |
| Keep original calendar date | Do not adjust, even if weekend or holiday. |

For the US MVP, a business day is Monday through Friday when Federal Reserve Banks are open under the **Federal Reserve Financial Services standard holiday schedule**. The OPM federal-employee observed-holiday calendar is not used because its closure rules can differ from Federal Reserve banking operations.

Confirmed weekend-observance rule:

* When a Federal Reserve holiday falls on Saturday, Federal Reserve Banks remain open on the preceding Friday; that Friday remains a business day.
* When a Federal Reserve holiday falls on Sunday, Federal Reserve Banks close on the following Monday; that Monday is not a business day.
* Employer-specific payday behavior is represented by the selected recurring policy or a one-time occurrence override, not by changing the authoritative banking calendar.

### 10.2 Stored and displayed evidence

Every adjusted occurrence retains:

* Unadjusted calendar date
* Adjusted date
* Policy used
* Holiday/weekend reason when adjustment occurs
* Holiday-data version or equivalent provenance
* Schedule version
* Occurrence-exception reference, if any

### 10.3 Dataset, failure, and change behavior

* The application uses a locally available, versioned holiday dataset verified against the Federal Reserve Financial Services schedule; preview and confirmation do not require a live external request.
* The stored provenance identifies the source, covered years, dataset version, and verification or publication date.
* Preview shows both original and adjusted dates.
* Adjustment occurs before boundary generation.
* Confirmed historical occurrences are not silently recalculated when holiday data changes.
* Unconfirmed previews may be invalidated when relevant calendar data changes.
* If a required year is not covered by a verified dataset, confirmation is blocked for schedules that require holiday adjustment. The interface identifies the unsupported year and does not silently use weekday-only logic.
* Dataset refreshes are verified against the Federal Reserve source before activation.
* A source correction invalidates affected unconfirmed previews and regenerates affected future, unexecuted projections with a visible explanation.
* Confirmed historical occurrence and boundary dates are never silently recalculated. Any correction to authoritative confirmed history requires an explicit, audited correction workflow.

**Decision PD-68-05 / resolved OD-68-01:** Federal Reserve Financial Services is the authoritative holiday source. Use versioned local data, block unsupported calculations, preserve confirmed history, and expose future corrections. Approved by Alexander Wohlford on August 12, 2026.

## 11. One-time occurrence exceptions

| Exception | Projection effect | Boundary effect |
| --- | --- | --- |
| Shift | Move one expected-income event to another date | None |
| Skip | Suppress one expected-income event | None |
| Extra | Add one expected-income event inside the existing timeline | None |
| Amount override | Change one projected amount | None |

Rules:

* The recurring rule remains unchanged.
* Preview shows the base occurrence, exception, affected projection and cash-flow totals, and an explicit statement that canonical period dates remain unchanged.
* The exception stores before/after values, actor, timestamp, schedule version, and optional reason.
* Removing an unexecuted exception restores the base generated result after a new preview.
* An actual transaction cannot create, edit, or remove an exception automatically.
* An exception affecting an active or completed period preserves period boundaries and follows the applicable projection-history and audit rules.
* To move, add, or remove a boundary, the user must initiate an explicit schedule change governed by CBD-67.

**Decision PD-68-10 / resolved OD-68-04:** Occurrence exceptions never affect canonical boundaries, so a skipped paycheck cannot lengthen a period and no exception-specific maximum paycheck-period decision is required. Approved by Alexander Wohlford on August 12, 2026.

## 12. Expected-income lifecycle

Confirmed statuses and transitions:

| Status | Timing and meaning | Income-total and forecast behavior |
| --- | --- | --- |
| Projected | Before the adjusted expected date | Included in current expected-income total and forward cash-flow projection; excluded from actual income |
| Expected today | On the adjusted expected date | Included in expected income and near-term forecast; excluded from actual income until qualifying receipt |
| Late | Beginning the calendar day after the expected date, once that business day has closed without receipt, through the end of the fifth Federal Reserve business day after the expected date | Remains in expected-income total and near-term forecast, visibly labeled Late; excluded from actual income |
| Missing | After the fifth Federal Reserve business day passes without a confirmed match | Remains in the historical expected-income total and expected-versus-actual variance; excluded from forward-looking cash projections and actual income |
| Reconciled | Linked under PD-68-06 | Expected and actual remain separate; actual is counted on actual receipt date |
| Reconciled late | A Late or Missing occurrence later reconciles | Original period preserves its expectation; actual belongs to the receipt-date period; cross-period link explains fulfillment |
| Skipped occurrence | User explicitly applies the existing Skip occurrence exception before or after the expected date | Removed from the current expected-income total and forward forecast; original expectation and skip remain in audit/forecast-revision history |
| Replaced | Superseded by a regenerated schedule version while history is retained | Governed by schedule-version history |

The Late window opens and closes on different bases, which is deliberate. It opens on the **calendar** day after the expected date, because that business day has closed without the paycheck and the expectation is unmet from that moment. It closes at the end of the fifth Federal Reserve **business** day, because that measures how long a legitimate interbank transfer may still take. An earlier revision opened the window on the next Federal Reserve business day, which left a Friday payday with no status across the following weekend — neither still due nor yet late.

There is no separate Dismiss, Mark not expected, or Not received resolution action. **Skip occurrence** expresses the same user intention at any lifecycle stage and is reversible. If actual income arrives after a skip, it is unexpected actual income unless the user reverses the skip and reconciles it.

### 12.1 Period and aggregate income totals

For each canonical period, report at least:

* **Current expected income:** current non-skipped projected occurrences associated with their expected dates.
* **Actual income:** qualifying actual inflows associated with their receipt dates.
* **Income variance:** actual income minus current expected income for the period.
* **Prior expectation / forecast revision:** historical projected values changed by skips, amount overrides, or schedule revisions.
* **Reconciliation explanation:** links actual income in one period to an expectation from another without reclassifying the actual receipt date.

A Late or Missing occurrence stays in its original expected-date period's expected total. It contributes no actual income. Missing removes the occurrence from forward-looking cash projection after the five-business-day window but preserves the historical expected total and negative variance.

When income reconciles after the original period, the original period retains the expectation and the receipt-date period contains the actual income. Aggregate reports spanning both periods use the reconciliation link to explain the relationship without double counting.

**Decision PD-68-07 / resolved OD-68-05:** Use Projected → Expected today → Late → Missing; retain expected totals, separate actual totals, remove Missing from forward forecast, allow reversible Skip occurrence at every stage, and preserve cross-period reconciliation. Approved by Alexander Wohlford on August 12, 2026.

## 13. Actual-income and reconciliation workflow

### 13.1 Actual income

Income is actual only on its posted, settled, or manually confirmed receipt date under CBD-69. Pending expected or imported income remains visibly distinct.

### 13.2 Reconciliation principles

Reconciliation uses two tiers:

1. **Automatic exact match:** The system may reconcile automatically only when one unique eligible expected occurrence and one unique eligible actual transaction have the same receipt date and exact currency amount, have compatible source identity, and have no competing candidate.
2. **Suggested match:** A non-exact candidate is shown for user confirmation only when **both** tolerances are satisfied: the actual receipt date is within five Federal Reserve business days before or after the expected date, inclusive, **and** the actual amount is within 5% above or below the expected amount, inclusive. A candidate that satisfies only one of the two tolerances is not suggested.

A business day for the matching window uses PD-68-05. The expected date is day zero. The window includes the fifth qualifying business day on each side and excludes weekends and Federal Reserve closure days when counting.

Amount tolerance is calculated as `absolute(actual amount − expected amount) ≤ absolute(expected amount) × 0.05`, evaluated in the budget currency before display rounding. The expected amount must be positive. Boundary equality qualifies. Currency mismatch never qualifies.

Additional rules:

* Expected occurrence and actual transaction remain separate.
* A link stores match provenance, actor or automation source, confidence where applicable, and timestamps.
* Actual date and amount never overwrite projected date and amount.
* Variances are calculated and displayed.
* Match, unmatch, and correction actions are audited.
* One unexpected transaction may remain unmatched.
* A candidate outside either the date or amount tolerance is not suggested automatically but may remain available for an explicitly initiated manual search, subject to permission.
* Compatible source identity is required for automatic reconciliation. Missing or weaker source identity limits the result to a suggestion.
* If more than one expected occurrence or actual transaction qualifies, none is reconciled automatically; the interface presents the ambiguity for confirmation.
* Rejected suggestions remain separate and the rejection is audited so the same unchanged pairing is not repeatedly suggested.
* MVP matching exposed to users is one expected occurrence to one actual transaction. Split, combined, partial, one-to-many, many-to-one, and many-to-many reconciliation are deferred, while the domain model must not preclude future reconciliation groups.
* Reconciliation never moves a period boundary or changes a target.

### 13.3 Outcome matrix

| Situation | Projection outcome | Actual outcome | Boundary/target effect |
| --- | --- | --- | --- |
| Unique exact date, amount, currency, and compatible source | Automatically reconciled | Count actual income | None |
| Within ±5 Federal Reserve business days **and** within ±5% of the expected amount, with the date, the amount, or both non-exact | Suggested; user confirmation required | Count on the actual receipt date and amount independently of matching | None |
| Within one tolerance but outside the other | Not suggested automatically; remains available to an explicitly initiated manual search | Count actual if qualified | None |
| Missing | Past due/unmatched | No actual income | None |
| Unexpected | No projection or candidate match | Count actual if qualified | None |
| Multiple candidates | Suggestions require review; no automatic match | Actual retained | None |
| Match removed | Expected and actual become separate again | Actual remains actual | None |

**Decision PD-68-06 / resolved OD-68-02:** A unique exact date-and-amount match may reconcile automatically. Non-exact candidates within ±5 Federal Reserve business days and ±5% of expected value are suggestions requiring confirmation. Ambiguity never auto-matches. MVP exposes one-to-one matching; more complex cardinalities are deferred without constraining the future data model. Approved by Alexander Wohlford on August 12, 2026.

Manual match, rejection, and unmatch are available to Primary Owners, Co-owners, and Collaborators under PD-68-12. These operations preserve actual income and audit history.

## 14. Custom cadence

Custom cadence provides bounded flexibility without becoming an arbitrary period-construction engine. It uses one fixed period length that repeats indefinitely.

### 14.1 Required fields

* One inclusive start date that becomes the first custom-period boundary
* One whole-number period length from 1 through 366 calendar days
* Optional display label

The MVP does not accept a hand-authored list of period rows, a one-time schedule, an end date, or a finite repetition count.

### 14.2 Generation and validation

For start date S and confirmed length L:

* Period 1 starts on S and ends on S + L − 1 calendar days.
* Every later period starts the day after the preceding period ends.
* Every period uses the same L-day length and generates deterministically on demand.
* L must be a whole number from 1 through 366.
* Missing or invalid inputs block preview and confirmation.
* A stale preview blocks confirmation and requires regeneration.

This generator cannot create gaps, overlaps, duplicate rows, unsorted rows, or silent truncation.

### 14.3 Preview, confirmation, and editing

Preview shows the first applicable period and enough following periods to demonstrate the repeating interval, with inclusive dates and day counts.

Confirmation atomically creates one open-ended schedule version and generation rule. The rule remains authoritative until replaced.

Editing an active custom cadence is a CBD-67 schedule change. Completed-period boundaries remain immutable. Effective-date, transition, proration, no-carry-forward, confirmation, concurrency, history, and audit behavior follow CBD-67, with CBD-68 supplying the proposed fixed-length boundary generator.

Arbitrary nonrepeating period lists, finite coverage, expiration, and intentional uncovered dates are deferred as FF-010.

**Decision PD-68-14:** Every activated paycheck and custom cadence is repetitive, deterministic, and indefinite until explicitly replaced through CBD-67. Paycheck customization is limited to supported recurring patterns, and custom cadence is limited to one fixed period length. This supersedes the finite and expiring behavior in PD-68-08 and PD-68-09. Approved by Alexander Wohlford on August 12, 2026.

### 14.4 CBD-67 schedule-change adapter

When a user changes into, out of, or between paycheck and fixed-length custom cadences, CBD-68 supplies the cadence-specific inputs required by CBD-67 §8.10:

* Stable cadence and rule identity
* Human-readable recurrence summary
* Complete versioned recurrence, anchor, business-day, and calendar provenance
* Natural boundary immediately before or on any date and the next natural boundary after it
* First three complete periods after any transition
* Proof that generated periods remain chronological, contiguous, non-overlapping, and open-ended
* Explicitly reviewed full-period spending targets by stable category identity

For paycheck cadence, the boundary generator uses adjusted dates from the confirmed recurring anchor schedule. Shift, Skip occurrence, Extra occurrence, amount override, actual transaction timing, and reconciliation are excluded from boundary generation.

For fixed-length custom cadence, boundaries are derived from the confirmed start boundary plus integer multiples of the fixed calendar-day length.

CBD-67 decides whether the effective date is boundary-aligned or creates a transition. When a transition exists, its target is prorated using:

`reviewed proposed-cadence full-period target × transition calendar days ÷ complete proposed-cadence basis-period calendar days`

The user must explicitly review the full-period target for every active category before confirmation. The product may prefill an old target for convenience only if it identifies the source; it never assumes that an amount appropriate for a monthly period is also appropriate for a weekly, biweekly, paycheck, or custom period. Editing a proposed target invalidates the preview.

**Decision PD-68-15 / CBD-67 PD-67-09:** Paycheck and custom cadence changes use the cadence-neutral boundary-and-target adapter. CBD-67 remains authoritative for effective date, pending changes, transition creation, proration mechanics, no-carry-forward, permissions, confirmation, execution, history, and audit. Approved by Alexander Wohlford on August 12, 2026.

## 15. Preview contract

A schedule preview contains:

* Preview identifier and generation timestamp
* Budget-space time zone and authoritative current date
* Input schedule version or draft revision
* Income-source and anchor identities
* Recurrence inputs and occurrence exceptions
* Holiday-data provenance
* Original and adjusted income dates
* Canonical periods with inclusive dates and day counts
* Secondary income placement
* Changed, added, removed, shortened, or lengthened periods
* CBD-67 transition, proration, and history effects where applicable
* Current and proposed cadence-specific rule summaries
* Reviewed proposed-cadence full-period spending targets and prefill provenance
* Transition basis period, day counts, formula, and reconciled target results when applicable
* Blocking errors and nonblocking warnings
* Explicit exclusions: actual deposits do not move boundaries; income does not fund categories

A preview is non-authoritative and creates no schedule state.

### 15.1 Preview lifetime and dependency fingerprint

A preview expires 30 minutes after generation and immediately becomes stale when any result-affecting dependency changes. The preview and confirmation request are bound to a dependency fingerprint covering at least:

* Active schedule version
* Anchor selection and recurrence inputs
* Income schedules and occurrence exceptions
* Custom-period dates and recurrence configuration
* Proposed effective date
* Spending targets used in CBD-67 proration
* Budget-space time zone and authoritative budget-space date
* Relevant Federal Reserve holiday-data version
* Actor permission required to confirm

Crossing budget-space local midnight invalidates the preview. Display-only or unrelated metadata changes, such as an avatar or non-calculation label, do not invalidate it.

An expired or stale preview preserves editable draft inputs, explains the invalidating reason where safe, and offers **Refresh preview**. It cannot create partial schedule state.

## 16. Confirmation, concurrency, and atomicity

Confirmation succeeds only within 30 minutes of preview generation and if:

* Actor is authorized.
* Preview belongs to the budget space and actor context.
* Preview has not exceeded its 30-minute lifetime.
* Schedule inputs and relevant versions are unchanged.
* Anchor and income schedules remain eligible.
* Relevant holiday/calendar provenance is unchanged.
* The proposed effective date remains valid under CBD-67.
* All blocking validations still pass.
* The dependency fingerprint still matches.

The confirmation endpoint is idempotent for the same preview and confirmation identity. A repeated successful request returns the existing outcome and cannot create a duplicate schedule version.

Otherwise, reject confirmation without partial activation and explain what changed. Successful confirmation creates the schedule version, periods, expected occurrences, and audit event atomically.

**Decision PD-68-11 / resolved OD-68-07:** Preview lifetime is 30 minutes, local midnight and result-affecting dependencies invalidate immediately, display-only changes do not invalidate, draft inputs survive refresh, and confirmation is idempotent. Approved by Alexander Wohlford on August 12, 2026.

## 17. Schedule lifecycle

| State | Meaning | Allowed actions |
| --- | --- | --- |
| Draft | Unconfirmed recurring inputs | Edit, preview, discard |
| Previewed | Calculation exists but is not authoritative | Confirm if current, regenerate, edit, discard |
| Active | Open-ended rule governs current and future periods | View, propose change, create eligible occurrence exception |
| Pending change | Future confirmed replacement awaiting its CBD-67 effective date | View, edit, or cancel under CBD-67; current rule remains authoritative |
| Superseded | Replaced by a later authoritative version | Read-only history |
| Failed activation | Atomic confirmation failed | Review error and regenerate; prior authority remains unchanged |

An active schedule never expires automatically. If the user takes no action, the current confirmed rule continues generating canonical periods.

## 18. Permissions and collaboration boundary

CBD-68 inherits the CBD-67 schedule-workflow roles. Exact provisioning mechanics remain governed by CBD-12.

| Action | Primary Owner | Co-owner | Collaborator | Viewer | Accountability Partner |
| --- | --- | --- | --- | --- | --- |
| View schedule and projections | Yes | Yes | Yes | Only when explicitly provisioned | Yes |
| View reconciliation and variance history | Yes | Yes | Yes | Only when explicitly provisioned | Yes, excluding restricted security or credential details |
| Configure, preview, and confirm paycheck or custom schedule | Yes | Yes | Yes | No | No |
| Select or change anchor | Yes | Yes | Yes | No | No |
| Shift, skip, add, or edit projected occurrence | Yes | Yes | Yes | No | No |
| Confirm or reject a suggested reconciliation | Yes | Yes | Yes | No | No |
| Manually match or unmatch income | Yes | Yes | Yes | No | No |
| View detailed audit history | Yes | Yes | As permitted by CBD-12 | Only when explicitly provisioned | Yes, excluding restricted details |

Rules:

* Permissions belong to the budget space and do not imply bank-account ownership, money control, fiduciary status, or legal authority.
* MVP has no additional Owner-approval step for an authorized Collaborator; FF-001 retains that future option.
* Every modifying action is audited.
* Authorization is checked when a workflow opens and again at confirmation or mutation.
* Permission loss invalidates an open preview or pending mutation.
* Removing the actor who created a confirmed future change does not cancel that change; an authorized user must cancel it explicitly.
* Concurrent edits surface a conflict and never silently overwrite confirmed state.
* Exact Viewer grant/revocation mechanics and fixed role-field boundaries remain CBD-12 scope. Accountability Partner has no resource-level provisioning.

**Decision PD-68-12 / resolved OD-68-08, amended August 15, 2026 by CBD-72:** Primary Owner, Co-owner, and Collaborator may perform CBD-68 schedule and reconciliation mutations. Viewer is read-only only for explicitly granted resources. Accountability Partner is financially read-only across the comprehensive accepted-role resource scope and uses the fixed CBD-72 field boundary; it has no resource-level provisioning.

## 19. Notifications and customer explanations

CBD-68 produces built-in notification events for:

| Event | Eligible audience |
| --- | --- |
| Schedule activated | Users who may view the schedule |
| Future schedule change confirmed, edited, canceled, or executed | Users who may view schedule changes |
| Anchor changed | Users who may view the schedule |
| Expected income becomes Late or Missing | Users permitted to view the income details |
| Possible paycheck match needs review | Users permitted to reconcile |
| Matched paycheck date or amount differs | Users permitted to view the income details; created only after automatic or user-confirmed matching under PD-68-16 |
| Stale, concurrent, or permission-rejected action | Acting user only |

### 19.1 Delivery channels

* **In-app notification is always created** for every applicable recipient and cannot be disabled. It may be read, archived, or dismissed from the active view without changing the underlying schedule or financial state.
* **Email, push, and SMS are optional** and disabled unless the individual user enables them.
* External-channel choices are stored per user, not imposed at the budget-space level.
* A user may configure each supported built-in event or notification category independently for email, push, and SMS.
* Preferences may vary by budget space, with the user's global settings supplying defaults and explicit budget-space settings overriding them.
* Email and SMS require verified destinations. Push requires an authorized device/token. SMS additionally requires recorded opt-in and supported opt-out handling.
* Quiet hours, recipient time zone, digest versus immediate delivery where supported, and sensitive-amount visibility are user-level settings.
* External content uses least disclosure by default. Lock-screen push and SMS do not include amounts unless the recipient explicitly opts in.
* Removing or masking access prevents future delivery of information the recipient may no longer view.
* Delivery failures do not change the underlying event and are not proof of receipt.

### 19.2 Delivery behavior

* Repeated notifications for the same materially unchanged event are deduplicated or grouped.
* Material status changes may create a new notification.
* Every notification deep-links to an authorized relevant context.
* Acknowledging a notification never confirms a schedule, reconciles income, skips an occurrence, or changes financial state.
* An active Accountability Partner is eligible for events across the comprehensive accepted-role resource scope; event content uses the fixed CBD-72 field boundary and personal delivery preferences. Partial resource sharing requires Viewer instead.
* Language is neutral and factual: “Expected income has not been received,” not “You missed a paycheck.”
* Notifications never imply that income funds categories or increases permitted spending.

### 19.3 Confirmed actual-income variance event

A built-in variance notification is created only when an expected occurrence and actual transaction become reconciled through either permitted automatic exact reconciliation or explicit user confirmation, and the confirmed actual receipt date or currency amount differs from the expectation.

Rules:

* A unique exact match with zero date and amount variance creates no variance notification.
* A suggested pairing creates no variance notification while awaiting confirmation.
* A rejected suggestion or unmatched transaction creates no variance notification.
* Any confirmed nonzero date or currency-precision amount difference qualifies; the MVP applies no additional hidden materiality threshold.
* The event records expected and actual dates and amounts, calculated differences, reconciliation identity, and reconciliation revision.
* One materially unchanged reconciliation revision creates at most one notification event per eligible recipient; delivery retries do not create new events.
* A later correction that materially changes the confirmed variance may create one new event tied to the new reconciliation revision and explains the update.
* Unmatch removes the confirmed relationship but does not delete historical notifications. Any unmatch notification would require its own predefined event or future custom rule.
* Reading, archiving, or dismissing the notification never confirms, rejects, corrects, or removes a reconciliation.

The MVP supports configurable delivery of these predefined events. Users cannot define arbitrary conditions, formulas, thresholds, compound triggers, or custom recipient workflows. That capability is deferred as FF-009 in the Future Feature Register.

**Decision PD-68-13 / resolved OD-68-09:** In-app notification is mandatory for applicable events. Email, push, and SMS are optional, highly configurable per user and event/category, privacy-protected, and consent-based. User-defined custom alerts are deferred. Approved by Alexander Wohlford on August 12, 2026.

**Decision PD-68-16:** Actual-income variance notification occurs only after confirmed reconciliation with a nonzero date or amount difference, has no extra materiality threshold, deduplicates by reconciliation revision, and may repeat only after a material correction creates a new revision. Approved by Alexander Wohlford on August 12, 2026.

### 19.4 Notification copy

Notification titles and bodies use the customer vocabulary in §4.1 and state the event, relevant date, and next action without blame or funding implications.

Examples:

* **Expected paycheck is late** — “Your expected paycheck for August 21 has not been matched to received income.”
* **Review a possible paycheck match** — “We found received income that may match your expected paycheck. Review the date and amount.”
* **Paycheck amount or date changed** — “Your matched paycheck differs from what you expected. Review the date and amount.”
* **Budget schedule changed** — “Your new budget schedule starts August 21.”
* **Review updated budget dates** — “Your schedule or targets changed after this preview. Review the updated budget periods before confirming.”

Amounts are omitted from lock-screen push and SMS unless the user opted in. Copy never says that income funds a category or increases permitted spending.

## 20. History and audit

Audit evidence must distinguish:

* Schedule draft/preview from confirmed state
* Initial activation from later change
* Anchor change from secondary-schedule edit
* Recurring-rule edit from occurrence exception
* Projection change from actual transaction change
* Automatic match from manual match or unmatch
* Spending-target edit from income or transaction event

Retain before/after values, actor or automation identity, budget-space date/time context, version identifiers, reason where supplied, and outcome. Completed periods retain their governing schedule-version reference.

## 21. Interface states and messages

Required states include empty setup, incomplete schedule, missing anchor, valid preview, blocking validation, warning-only preview, stale preview, confirmation in progress, activation success, activation failure, active schedule, pending change, expected paycheck, late or missing expected paycheck, unmatched received income, matched paycheck with a date or amount difference, multiple possible matches, invalid custom-schedule coverage, permission denied, and concurrent edit.

Representative customer-facing messages:

* “Choose the paycheck schedule that sets your budget dates.”
* “Enter a schedule start date.”
* “Enter a whole number from 1 to 366 days.”
* “This budget period is 367 days. Custom budget periods can be 1–366 days.”
* “Your schedule or targets changed after this preview. Review the updated budget periods before confirming.”
* “This received income differs from your expected paycheck. Your spending targets and budget dates did not change.”
* “We could not match this received income automatically. Review the possible matches.”
* “Skip this expected paycheck?” — supporting text: “This removes it from current expected totals. It does not change your budget dates or repeating schedule.”

Messages identify the problem, affected field or event, consequence, and recovery action. They avoid blame, unexplained acronyms, implementation terms, and reliance on punctuation, color, or iconography alone.

### 21.1 Accessibility acceptance requirements

* Every input has a persistent visible label and programmatic accessible name; placeholder text is never the only label.
* Recurrence controls expose their group name, selected option, required state, and help text. “Twice per month” and “Every two weeks” are announced exactly as displayed.
* Date inputs expose an unambiguous localized date and the budget time-zone context. Original and adjusted payday dates are distinguishable without color.
* Amounts expose currency and sign to assistive technology; approximate, expected, received, and variance states are conveyed in text.
* Validation messages are programmatically associated with fields. On blocked submission, focus moves to an error summary that links to each invalid field, while entered values remain intact.
* Preview periods use semantic headings or table headers and can be read in chronological order. Old period, short budget period, and first full period have textual labels.
* Recalculation announces a concise status such as “Preview updated: three budget periods changed” through a polite live region. It does not repeatedly announce the entire preview.
* Confirmation-in-progress, success, failure, stale-preview, Late, Missing, and match-status changes are exposed to assistive technology without requiring visual monitoring.
* All actions are keyboard operable with visible focus. Focus order follows the visual and logical workflow. Dialog focus is trapped while open and returns to the invoking control when closed.
* Grouped same-date events remain individually reachable and expose source, expected or received state, amount, and match status.
* Notification channel settings use labeled groups and independent controls for in-app, email, push, and SMS. Required in-app delivery is described as always on rather than presented as a disabled unexplained control.
* SMS consent is explicit and never preselected. Quiet-hours start/end fields and time zone are announced together.
* Charts or calendars that communicate schedule or variance information provide an equivalent structured text or table view.
* Motion is not required to understand a state change; reduced-motion preferences are respected where animation is used.
* Automated accessibility checks and keyboard/screen-reader manual review are required before release; color contrast and target-size requirements follow the product’s adopted accessibility standard.

## 22. Implementation-facing data requirements

The product behavior implies records or equivalent concepts for:

* Budget schedule and immutable schedule version
* Canonical period
* Income source and income schedule
* Recurrence rule
* Expected occurrence
* Occurrence exception
* Actual transaction
* Reconciliation link
* Spending target and target history
* Preview snapshot or reproducible preview context
* Audit event

Required compatibility characteristics:

* Stable identifiers
* Separate projected and actual fields
* Original and adjusted date provenance
* Explicit canonical-anchor reference
* Version/effective-date history
* Independent target, transaction, reconciliation, and future-allocation histories
* No target field overloaded as funded cash
* A versioned budgeting-mode capability with only target_tracking supported initially
* Future allocation records able to reference existing entities without rewriting them

## 23. Nonfunctional product requirements

* Deterministic calculation from the same versioned inputs
* Date-only calendar semantics in the budget-space time zone
* Accessible labels that do not rely on color alone
* Keyboard-operable schedule and custom-period editing
* Clear source and freshness language for projections and actuals
* Atomic confirmation and recoverable failures
* Idempotent confirmation handling
* Explainable variance and adjustment provenance
* No silent destructive recalculation of historical periods

## 24. Risks

| ID | Risk | Mitigation |
| --- | --- | --- |
| R-68-01 | Income language accidentally introduces envelope semantics | Use target-and-tracking vocabulary and MODEL scenarios. |
| R-68-02 | Holiday-source changes alter confirmed history | Version provenance; never silently recalculate history. |
| R-68-03 | Reconciliation overwrites projections | Separate records linked by audited relationship. |
| R-68-04 | Duplicate adjusted anchors create zero-day periods | Deduplicate boundaries while retaining events. |
| R-68-05 | Anchor deletion breaks canonical timeline | Require replacement anchor in same atomic change. |
| R-68-06 | Excessive customization creates nonrepeatable or uncovered periods | Limit paycheck setup to supported recurring patterns and custom cadence to one fixed-length open-ended rule; defer finite or arbitrary construction as FF-010. |
| R-68-07 | Concurrent edits confirm stale results | Version-bound preview and conflict rejection. |
| R-68-08 | Future hybrid mode forces migration | Preserve independent semantics and stable identifiers. |
| R-68-09 | Cross-document drift with CBD-69/70 | Traceability review whenever governing requirements change. |

## 25. Decision register

| ID | Topic | Decision | Status |
| --- | --- | --- | --- |
| PD-68-01 | Budgeting model | Target-and-tracking MVP; hybrid deferred | Confirmed August 12, 2026 |
| PD-68-02 | Canonical timeline | One canonical budget timeline per budget space; exactly one selected income schedule anchors paycheck periods | Existing requirement (CBD-68 Jira AC01–03) |
| PD-68-03 | Expected/actual separation | Expected and actual income values remain separate; actual deposits do not move boundaries automatically | Existing requirement (CBD-68 Jira AC04–10) |
| PD-68-04 | Active schedule edits | Active schedule edits inherit CBD-67 effective-date, transition, proration, no-carry-forward, preview, history, and audit rules | Existing requirement (CBD-68 Jira AC13); superseded in detail by PD-68-15 |
| PD-68-05 | Holiday authority | Federal Reserve Financial Services; versioned local data; unsupported calculations blocked; confirmed history preserved | Confirmed August 12, 2026 |
| PD-68-06 | Reconciliation | Unique exact matches may auto-reconcile; ±5 Federal Reserve business days and ±5% non-exact candidates require confirmation; one-to-one MVP | Confirmed August 12, 2026 |
| PD-68-07 | Late and missing income | Projected → Expected today → Late → Missing; separate totals; Skip occurrence is the non-receipt resolution | Confirmed August 12, 2026 |
| PD-68-08 | Generation horizon | Recurring rules generate deterministically on demand | Confirmed; finite-paycheck portion superseded by PD-68-14 |
| PD-68-09 | Custom recurrence | Explicit recurrence required | Confirmed; finite/expiration portion superseded by PD-68-14 |
| PD-68-10 | Occurrence exceptions | Exceptions change projections only; boundary changes use CBD-67 | Confirmed August 12, 2026 |
| PD-68-11 | Preview integrity | 30-minute lifetime; result-affecting changes and local midnight invalidate; idempotent confirmation | Confirmed August 12, 2026 |
| PD-68-12 | Permissions | Owner, Co-owner, and Collaborator may mutate; Viewer and Accountability Partner are read-only | Confirmed August 12, 2026 |
| PD-68-13 | Notifications | In-app always; email, push, and SMS optional per user and event; custom alerts deferred | Confirmed August 12, 2026 |
| PD-68-14 | Recurring continuity and bounded customization | Paycheck and custom cadences are repetitive, deterministic, open-ended, and remain authoritative until replaced. Finite/expiring schedules and arbitrary period lists are FF-010. | Confirmed August 12, 2026 |
| PD-68-15 | Cadence-change adapter and targets | Cadence supplies deterministic natural boundaries; user explicitly reviews proposed full-period targets; CBD-67 governs transition and proration mechanics. Supersedes PD-68-04 in detail. | Confirmed August 12, 2026 |
| PD-68-16 | Actual-income variance notification | Fire only after confirmed reconciliation with nonzero date/amount variance; no extra threshold; deduplicate by reconciliation revision; corrections may create one updated event | Confirmed August 12, 2026 |
| PD-68-17 | Customer language and accessibility | Preserve precise internal terms, use plain-language customer equivalents, and require testable accessible forms, previews, errors, statuses, and notification settings | Confirmed August 12, 2026 |

No CBD-68 product decision remains open. All cross-document findings are reconciled and this document is approved.

## 26. First-draft completion checklist

- [x] MVP target-and-tracking model recorded.
- [x] Core terminology and invariants defined.
- [x] Paycheck, multiple-income, business-day, semimonthly, exception, and bounded custom rules drafted.
- [x] Projection and reconciliation boundaries drafted.
- [x] Preview, confirmation, concurrency, audit, interface, and data requirements drafted.
- [x] Future hybrid and finite/arbitrary-schedule deferrals recorded.
- [x] Product decisions resolved or explicitly superseded.
- [x] Reconcile CBD-67 role wording with PD-68-12.
- [x] Define and verify paycheck/custom schedule-change adapter details.
- [x] Complete final customer-language and accessibility review.
- [x] Complete final scenario and traceability review.
- [x] Record formal approval.
