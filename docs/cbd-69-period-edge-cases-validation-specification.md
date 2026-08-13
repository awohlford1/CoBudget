# CBD-69 — Period Edge Cases and Validation Rule Specification

| Field | Value |
| --- | --- |
| Status | In Review |
| Document version | 0.9.2 |
| Owner | Alexander Wohlford |
| Reviewer | Not yet assigned |
| Jira | [CBD-69](https://cobudget.atlassian.net/browse/CBD-69) |
| Parent | [CBD-11](https://cobudget.atlassian.net/browse/CBD-11) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Schedule workflow input | [CBD-67](https://cobudget.atlassian.net/browse/CBD-67) (weekly/monthly, Approved v1.2), [CBD-68](https://cobudget.atlassian.net/browse/CBD-68) (paycheck/custom, Working Draft v0.1) |
| Role and permission input | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) (Ready, not yet specified) |
| Scenario catalog | [CBD-69 — Period Edge-Case Scenario Catalog](cbd-69-period-edge-case-scenario-catalog.md) |
| Traceability and review | [CBD-69 — Acceptance Criteria Traceability and Review Record](cbd-69-acceptance-criteria-traceability.md) |
| Last updated | August 12, 2026 |

> **Provisional-rows notice:** Rows that classify activity relative to paycheck, semimonthly, or custom-schedule boundaries (§9) are written against the CBD-68 v0.1 working draft and are explicitly marked **Provisional**. They must be reconciled when CBD-68 reaches its own Final Draft. No other rule in this document depends on an unresolved upstream decision.

## 1. Purpose and outcome

This specification is the single authoritative decision table for how CoBudget converts source financial dates and transaction-lifecycle events into a budget date, a period and category impact, a reporting behavior, an alert behavior, a customer-facing explanation or recovery action, and an audit event. It exists so that the data model, interface, reconciliation engine, reports, alerts, collaboration features, and automated tests reference one set of rules rather than each inventing behavior independently.

This specification governs transaction-date classification and validation. It does not govern which calendar dates a schedule generates as period boundaries — that is CBD-67 (weekly/monthly) and CBD-68 (paycheck/custom). Where this document must reference a boundary to classify an item relative to it, it treats the boundary as an input supplied by the governing schedule specification.

### Intended outcome

When this specification is complete:

* Every source financial-date condition listed in the CBD-69 deliverable resolves to one deterministic budget date, impact, and disposition.
* Pending-to-posted reconciliation states and the manual controls available to resolve them are named and unambiguous.
* Income receipt is provably separated from planning: no receipt event can change a spending target by itself, and no allocation step exists.
* Late settlement can be explained without ever appearing to rewrite period boundaries or history.
* Alert and reporting behavior for pending versus settled activity is specific enough to build without further product decisions.
* Every override and reconciliation action has a named permission requirement and a required audit record.
* Designers, engineers, QA, and support can derive interface states, data-model fields, and test cases directly from this document.

## 2. Scope

### In scope

* Selection of the authoritative source date and derived budget date for every supported transaction type
* The distinction between transaction time and budget date, and the rule that time never affects classification
* Pending-to-posted (authorization-to-settlement) lifecycle states, transitions, and the manual controls that resolve unclear matches
* Income projection versus income receipt, and the rule that receipt never changes a spending target automatically
* Transfers, refunds, reversals, bills, and manually entered transactions as distinct classification cases
* Late settlement into an already-completed budget period, and the labeling and alert behavior that results
* Informational versus firm alert behavior for pending and settled activity, and alert eligibility by role
* User overrides of a derived budget date, including the permission and audit requirements
* Reporting behavior that must reconcile budget-date totals against posted-date (statement) totals
* Calendar-level edge cases that affect classification: daylight-saving transitions, leap years, short months, same-day boundary activity
* The classification boundary with CBD-67/CBD-68 schedule validity (gaps, overlaps, invalid ranges, duplicate anchors, skipped paydays, mid-period schedule changes) — this document defines only how transaction classification behaves once a schedule is valid and authoritative; schedule validity itself remains CBD-67/CBD-68 scope
* Data-model, interface-state, and automated-test implications sufficient to begin technical design

### Out of scope

* Which calendar dates constitute a valid budget period or schedule (CBD-67, CBD-68)
* The role and permission model itself, including invitation, consent, and alert-delivery configuration (CBD-12) — this document defines only which actions require elevated permission and what must be audited
* Automatic-match confidence scoring algorithms and their tuning (implementation and data-science scope; see §7.3 and FF-007)
* Export file formats and scheduled/automated export delivery (see §11 and FF-008)
* Alert delivery channels, thresholds, cooldowns, deduplication, and quiet hours (CBD-12 scope; see §12.2)
* Assignment or allocation of actual income to categories, goals, or future periods — excluded by the target-and-tracking MVP decision PD-68-01; optional hybrid allocation is captured as [FF-006](cobudget-future-feature-register.md) (see §8)
* Multi-currency transaction classification (deferred; see [FF-005](cobudget-future-feature-register.md))
* Balance rollover or carry-forward of remaining or overspent amounts between periods (deferred; see [FF-003](cobudget-future-feature-register.md))
* Technical architecture, database schema, and implementation design

## 3. Terminology and invariants

| Term | Definition |
| --- | --- |
| Authoritative budget date | The single calendar date used to assign a transaction, refund, reversal, transfer, or bill payment to a budget period. Derived under the classification rules in §4 and not recalculated from a timestamp during period assignment. |
| Authorization date | The calendar date on which a financial institution authorizes a pending expense. Preferred budget date for expenses when reliable. |
| Budget date | Synonym for authoritative budget date, used in field and interface naming. |
| Date-source provenance | The retained record of which source date and rule produced a transaction's budget date, including whether a user override replaced it. |
| Derived budget date | A budget date produced by applying the classification rules in §4, as distinct from a user-selected override. |
| Duplicate-review state | The reconciliation state in which a pending and a posted record plausibly represent the same economic event but lack a reliable institution-supplied link. |
| Late adjustment | A change to a completed budget period's actual totals caused by a transaction that settles after the period's end date (EC-69-21) or by a linked refund of an expense budgeted to that period (EC-69-13). Never changes the period's boundaries, schedule-version reference, or planned allocations. |
| Manual match | An authorized user's explicit action linking a pending record and a posted record (or dismissing a candidate link) when automatic matching does not resolve the pair. |
| Manually entered expense | An expense created directly by a user rather than imported from a linked financial institution. |
| Posted date / settlement date | The calendar date on which a financial institution recognizes an item as final. Fallback budget date for expenses without a reliable authorization date; authoritative date for actual income, transfers, and refunds. |
| Provisional impact | The category and period effect of a pending expense before it settles. Visibly labeled as pending and never counted as final settled spending. |
| Actual income | Income counted only once it has posted, settled, or been manually confirmed by an authorized user; also referred to as received income when naming the receipt event. Never established by an authorization or expected date. Actual income updates actual-income totals, account balances, and cash-flow reporting, and never funds a category or creates an available-to-assign pool (CBD-11/CBD-69 consistency decision). |
| Reversal (void) | The cancellation of a pending authorization before it settles, such that the underlying economic event never completes. Removes the provisional impact entirely rather than creating a new dated event. Distinct from a refund (§9.3). |
| Refund | A settled return of funds for a previously completed (settled) expense, recorded as its own event. It retains its own posted date as a source date, but for budget classification a linked refund nets against the budget period of the expense it refunds (EC-69-13). An unlinked refund falls back to its own posted date (EC-69-25). Distinct from a reversal (§9.3). |
| Statement view | A report presentation using posted/settlement dates, provided alongside the default budget-date view so a user can reconcile CoBudget against a bank or credit-card statement. |
| Transaction lifecycle status | The current state of a transaction along the pending-to-settled path: pending, settled, removed-without-settlement, reversed, or refunded. |
| Transaction time | The time-of-day component of a source date, when supplied. Retained when available but never used to determine budget-period classification. |

### Core invariants

| ID | Invariant | Why it matters | How to verify |
| --- | --- | --- | --- |
| INV-69-01 | Each budget space has one authoritative time zone shared by all collaborators, per CBD-67 INV-11. | Gives every date-classification rule in this document one unambiguous calendar context. | Confirm every classification example resolves identically for every collaborator regardless of their personal time zone. |
| INV-69-02 | Budget periods use calendar dates. Display boundaries are inclusive; a period begins at local midnight on its start date and ends immediately before the next period's local midnight, per CBD-67 INV-05. | Prevents fixed-hour-duration assumptions from leaking into transaction classification. | Verify a transaction dated on a period's displayed end date classifies into that period, not the next one. |
| INV-69-03 | Transaction time is never used to classify a transaction into a budget period; only the authoritative budget date is used. | Prevents timestamp or time-zone conversions from silently moving a transaction across a period boundary. | Classify transactions sharing a budget date but differing source times; all must resolve to the same period. |
| INV-69-04 | Source authorization date and source posted/settlement date are retained separately from the derived budget date for the life of the transaction record. | Preserves the ability to explain, audit, and reconcile against bank statements. | Confirm both source dates remain queryable after budget-date derivation, override, and settlement. |
| INV-69-05 | An expense uses the authorization date as its budget date when a reliable authorization date exists; otherwise it uses the posted or settlement date. | Establishes one deterministic fallback so no expense is left unclassified. | Remove the authorization date from a fixture and confirm the posted date is used with fallback provenance recorded. |
| INV-69-06 | A pending expense's provisional impact and its eventual settled impact are never both counted; settlement replaces the provisional amount rather than adding to it. | Prevents double-counting during the pending-to-settled transition. | Confirm the category total after settlement equals the settled amount, not the pending amount plus the settled amount. |
| INV-69-07 | Expected income is a projection only; income is counted as received solely on its posted, settled, or manually confirmed receipt date. An authorization or expected date never causes income to be counted as received. | Keeps the budget plan separate from projected cash flow, per CBD-67/CBD-68 core product principles. | Confirm actual-income totals, account balances, and cash-flow reporting are unaffected by an expected occurrence until an actual receipt event exists. |
| INV-69-08 | Receiving income updates account balances, actual-income totals, and cash-flow reporting, but never changes a spending target, planned amount, or period boundary automatically, and never creates an income-allocation requirement. | Preserves the separation between the user's plan and actual cash flow. Under the target-and-tracking MVP (PD-68-01), receipt has no allocation step at all; this invariant must continue to hold if optional hybrid allocation is later introduced under FF-006. | Confirm no spending target or planned amount changes value as a direct effect of an income-receipt event, and that no allocation prompt or requirement is produced. |
| INV-69-09 | A transaction authorized (or otherwise budget-dated) in one period and settled in a later period remains assigned to its authorization-date (budget-date) period, even after that period has ended. | Keeps classification consistent regardless of when settlement happens to occur. | Settle a transaction after its period's end date and confirm it remains assigned to the original period, not the settlement-date period. |
| INV-69-10 | A schedule change, category edit, or budget-date override never modifies a completed period's boundaries or schedule-version reference; it may only recalculate that period's actual totals. | Preserves historical period integrity per CBD-67 INV-03. | Compare a completed period's boundaries and schedule-version reference before and after a late adjustment; they must be unchanged. |
| INV-69-11 | Every budget date derivation, override, match, unmatch, and dismissal retains the actor, timestamp, before-and-after values, and provenance required for audit, consistent with CBD-67 INV-64. | Makes every classification decision reconstructable. | Trace one transaction from import through override and confirm a complete, ordered audit trail exists. |
| INV-69-12 | A user may override a derived budget date only when authorized under the CBD-12 permission model; a denied override attempt produces no financial-state change and is itself audited. | Keeps date correction a permissioned, accountable action rather than an implicit side effect of viewing a transaction. | Attempt an override as an unauthorized role and confirm no state change occurs and a denial is recorded. |
| INV-69-13 | An override changes only the derived budget date used for classification; it never alters the retained source authorization or posted/settlement dates. | Preserves an auditable, unedited record of what the financial institution actually reported. | Compare source dates before and after an override; they must be identical. |
| INV-69-14 | A pending expense's provisional impact is visibly and unambiguously distinguished from settled spending in every view that shows both. | Prevents a user from mistaking a provisional hold for final spending. | Inspect category, period, and transaction views containing both pending and settled activity; confirm distinct labeling in each. |
| INV-69-15 | Firm overspending, collaborator, and Accountability Partner alerts wait for settlement by default; pending activity produces only an informational warning. | Avoids escalating alerts from temporary authorization holds or amounts that may still change. | Create an overage from pending activity alone and confirm no firm alert fires until settlement. |
| INV-69-16 | A settled transaction that creates an overage in an already-completed period produces an alert explicitly identified as a late adjustment, distinguishable from a current-period overage alert. | Prevents a late adjustment from being confused with an active, actionable current-period overage. | Settle a transaction into a completed period that creates an overage and confirm the alert is labeled as a late adjustment. |
| INV-69-17 | Every transaction and category total shown in a report or preview reconciles exactly to its itemized detail using the same budget-date assignment used by the underlying calculation. | Keeps summary totals trustworthy and independently checkable, consistent with CBD-67 INV-34. | Sum itemized transaction amounts for a period and category and confirm the sum equals the displayed total. |
| INV-69-18 | Daylight-saving transitions never shorten or lengthen the number of calendar days in a budget period, and no transaction gains, loses, or duplicates a classification as a result of a transition. | Prevents clock-time artifacts from corrupting calendar-date-based classification. | Classify transactions across a spring-forward and a fall-back transition and confirm one classification per calendar date with no gap or duplicate. |
| INV-69-19 | Every calendar date, including February 29 in a leap year, classifies deterministically into exactly one budget period under a valid schedule. | Prevents leap-year and short-month arithmetic from producing an unclassifiable date. | Classify a February 29 transaction against a period containing it and confirm exactly one resulting assignment. |
| INV-69-20 | A transaction dated exactly on a period boundary is assigned to the period beginning on that date, consistent with the start-inclusive convention in §3. | Removes ambiguity for same-day boundary activity. | Classify a transaction dated on a period's start date and confirm it belongs to the period beginning that day, not the prior period. |
| INV-69-21 | A reliably linked refund reduces the budget period of the expense it refunds, not the period in which the refund posted. Only a refund with no reliable link uses its own posted date. | Keeps category history reflecting the true net cost of a purchase, and prevents a refund from creating unearned room in a later period under the no-rollover MVP. | Refund a purchase budgeted to an earlier, completed period; confirm the original period's actual drops, the refund's own period is unchanged, and the completed period is labeled as adjusted. |
| INV-69-22 | While a pending/posted pair is in Duplicate-review, the posted (settled) amount is the amount counted and the pending record contributes no separate impact. | Prevents a provisional figure from being reported when a final one already exists, and makes double counting structurally impossible while the pair is unresolved. | Create an unresolved pair with differing amounts and confirm the category total equals the posted amount exactly, never the pending amount and never their sum. |

## 4. Roles and permissions

[CBD-12](https://cobudget.atlassian.net/browse/CBD-12) is not yet specified; it will govern role definitions, membership, consent, invitation, and the broader permission model. Until CBD-12 publishes its own product definition, this document reuses the five-role model and the visibility/modification pattern established in [CBD-67 §4](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/655361) (Primary Owner, Co-owner, Collaborator, Viewer, Accountability Partner) as the best-available baseline for the permission-sensitive actions this specification introduces. Final role names, exact permission grants, and enforcement mechanics remain authoritative in CBD-12 and must be reconciled when it is specified.

### Date, reconciliation, and audit permission matrix

| Action | Primary Owner | Co-owner | Collaborator | Viewer | Accountability Partner |
| --- | --- | --- | --- | --- | --- |
| View a transaction's derived budget date, source dates, and provenance | Yes | Yes | Yes | Only when explicitly provisioned | Yes |
| View pending versus settled status and provisional labeling | Yes | Yes | Yes | Only when explicitly provisioned | Yes |
| Override a derived budget date | Yes | Yes | Yes | No | No |
| Manually match, unmatch, split, or dismiss a pending-to-posted candidate | Yes | Yes | Yes | No | No |
| Categorize an imported transaction (date and amount unaffected) | Yes | Yes | Yes | No | No |
| View late-adjustment labeling and completed-period audit history | Yes | Yes | Yes | Only when explicitly provisioned | Yes |
| View statement (posted-date) report alongside budget-date report | Yes | Yes | Yes | Only when explicitly provisioned | Yes |
| Receive informational (pending) alerts | Yes | Yes | Yes | No | Only if separately opted in (§12.2) |
| Receive firm (settled overage / late-adjustment) alerts | Yes | Yes | Yes | No | Yes, when provisioned |
| Acknowledge a supported alert or add a supported comment | Yes | Yes | Yes | Only when explicitly provisioned | Yes |
| Modify any financial record, permission, or configuration through this workflow | As permitted by CBD-12 | As permitted by CBD-12 | As permitted by CBD-12 | No | No |

This table resolves the CBD-69-scoped question of *which actions require elevated permission and who is presumptively eligible*. It does not replace CBD-12's authority over exact role definitions, grant mechanics, or enforcement (see the **OD-69-04 resolution** in §13).

## 5. Canonical date and lifecycle vocabulary

### 5.1 Date fields

| Field | Definition | Classification use |
| --- | --- | --- |
| Authorization date | Calendar date on which an expense was authorized by the financial institution | Preferred expense budget date |
| Posted / settlement date | Date on which the institution recognizes final account activity | Expense fallback budget date; authoritative date for actual income, transfers, and refunds |
| Manual transaction date | Date explicitly selected by an authorized user for a manually entered expense | Budget date for manual activity |
| Expected date | Projected income or bill occurrence date | Planning and projection only; never establishes actual income |
| Due date | The calendar date a bill is due | Planning-view classification for the bill occurrence; independent of its payment transaction's classification |
| Budget date | The derived or explicitly overridden date used to assign activity to a budget period | Authoritative classification date |
| Date-source provenance | The source and derivation path that produced the selected budget date | Explanation, audit, and diagnostics |
| Transaction time | Time-of-day supplied by a source, when available | Retained but never used for period classification (INV-69-03) |

### 5.2 Transaction lifecycle statuses

| Status | Meaning |
| --- | --- |
| Pending | An authorized amount not yet settled; provisional impact only. |
| Settled | A posted, final amount reflected in balances and category totals. |
| Removed without settlement | A pending authorization that disappeared before settling; provisional impact removed. |
| Reversed | A pending authorization canceled before settlement; treated identically to removed-without-settlement (§9.3). |
| Refunded | A previously settled expense with a linked, separately dated settled return. |

## 6. Classification decision matrix

This is the authoritative decision table required by the CBD-69 deliverable. Every row states an input condition and its authoritative source date, derived budget date, pending/settled status, period and category impact, reporting behavior, alert behavior, customer-facing explanation or recovery action, and audit event. IDs are stable identifiers used by the scenario catalog and traceability record; they supersede the CBD-69 v0.1 draft's row numbering.

| ID | Input condition | Authoritative source date | Derived budget date | Pending / settled status | Period and category impact | Reporting behavior | Alert behavior | Customer explanation / recovery | Audit event |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EC-69-01 | Expense has a reliable authorization date | Authorization date | Authorization date | Pending, then settled | Provisional impact in the authorization-date period; settlement replaces the provisional amount in the same period | Budget-date view shows the period from first authorization; statement view reconciles to the posted date | Informational warning while pending; firm alert only after settlement (INV-69-15) | "Pending — amount may change until it settles." | Import, settlement match, and provenance recorded |
| EC-69-02 | Expense lacks a reliable authorization date **and the source reports it as posted** | Posted / settlement date | Posted / settlement date | Settled on import | Settled category spending in the period containing the posted date | Budget-date and statement views agree (same date used for both) | Standard settled-activity alert rules apply | "No authorization date was available; we used the posted date." | Missing-authorization-date and fallback provenance recorded |
| EC-69-03 | Source supplies a date without a reliable time | Supplied calendar date | Supplied calendar date | Per transaction type | Normal impact for the transaction type; no time-of-day adjustment | No distinct behavior; time is never shown as authoritative | No distinct behavior | Not customer-facing; internal provenance only | Time-precision flag recorded on the source record |
| EC-69-04 | Pending amount changes before settlement | Authorization date (unchanged) | Authorization date (unchanged) | Pending → settled with a different amount | Provisional amount is replaced by the final settled amount in the same period; never summed | Category and period totals reflect only the current (latest known) amount at all times | No new alert solely for the amount change; overage alert rules evaluate the final settled amount | "The pending amount changed from $X to $Y when it settled." | Before/after amount and match recorded |
| EC-69-05 | Pending authorization disappears without settling | Authorization date (final, before removal) | N/A after removal | Removed without settlement | Provisional impact fully removed; no settled spending results | Category and period totals return to their pre-authorization state | Any related informational warning is cleared; no firm alert is created | "A pending charge for $X was removed and did not affect your budget." | Removal event and last-known values recorded |
| EC-69-06 | A posted transaction has no reliable pending match | Posted / settlement date | Posted / settlement date (EC-69-02 fallback applies) | Settled | Counted once in the period containing the posted date | Shown as a normal settled transaction; not held pending review | No distinct alert; standard settled-activity rules apply | No customer action required unless a later duplicate is detected (EC-69-07) | Import and no-match evaluation recorded |
| EC-69-07 | A pending and a posted record plausibly represent the same event but lack a reliable link | The posted record's amount is authoritative because the money has actually moved and the figure is final; the pending record supplies the budget date | The pending candidate's authorization date when exactly one candidate exists. When two or more candidates exist, no single authorization date can be selected, so the posted date is used until a user resolves the pair | Duplicate-review; the posted amount is the amount counted | The posted (settled) amount is counted exactly once; the pending record contributes no separate impact while unresolved, so the pair can never be double counted (INV-69-22) | Both candidate records remain visible with an unresolved-match indicator; totals reflect the posted amount, not the provisional one | Neither record independently triggers a firm overage alert while unresolved | "We found two possible matches for this charge. We're counting the settled amount — review and confirm." | Automatic-match evaluation, presented candidates, which record was counted, and eventual resolution recorded |
| EC-69-08 | An expense authorizes in one period and settles in a later period that has not yet ended | Authorization date | Authorization date | Pending → settled | Remains assigned to the authorization-date period even though settlement lands later | Budget-date view keeps the original period; statement view shows the later posted date | Standard pending/settled alert rules apply per period | "This charge is budgeted to the date it was authorized, not the date it settled." | Settlement match and elapsed-period gap recorded |
| EC-69-09 | Expected income is received in a period different from the one in which it was projected | Posted, settled, or manually confirmed receipt date | Receipt date | N/A (income has no pending provisional stage; it is either expected or received) | Actual-income totals, account balances, and cash-flow reporting update in the period containing the receipt date; the projection in the originally expected period is marked reconciled but is never treated as actual income. No spending target changes and no allocation requirement is created (CBD-11/CBD-69 consistency decision) | Projection and actual receipt are shown separately with their date variance | No overage-style alert; a variance/reconciliation indicator is shown | "Expected on [date]; received on [date]." | Expected occurrence, actual receipt, and variance recorded |
| EC-69-10 | An expected income occurrence never arrives | Expected date only; no receipt date exists | None (remains unreceived) | Missing / unmatched | No cash, balance, actual-income, or cash-flow-reporting impact; no target or boundary change | Projection is marked missing/unmatched | No firm alert; an informational missing-income indicator may be shown | "Expected income has not been received. You can update or remove this projection." | Missing-occurrence state recorded; any user resolution audited |
| EC-69-11 | Manually entered expense | User-selected date | User-selected date | Settled at entry (no pending stage) | Counted in the period containing the selected date | Budget-date and statement views both show the user-selected date | Standard settled-activity alert rules apply | Not applicable; the user chose the date directly | Entry actor, date, and amount recorded |
| EC-69-12 | Transfer between accounts owned by the same budget space | Posted date (both sides) | Posted date | Settled | Excluded from income and spending totals; used only for balance reconciliation | Shown as a transfer, not as income or spending, in both budget-date and statement views | No overage-style alert; a transfer is never spending | "Transfers between your own accounts don't count as income or spending." | Both-side linkage and posted dates recorded |
| EC-69-13 | Refund of a previously settled expense, reliably linked to that expense (§9.3: settled return, distinct from a reversal) | The refund's own posted / receipt date is retained as a source date; the **original expense's authoritative budget date** governs classification | The original expense's authoritative budget date | Settled | Reduces the actual spending recorded against the original expense's period and category, so category history reflects the true net cost of the purchase. If that period has already ended, the reduction is a late adjustment governed by EC-69-21: actuals change while boundaries, schedule version, and planned amounts do not (INV-69-10, INV-69-21) | Budget-date view shows the reduction in the original expense's period, labeled "Adjusted after period end" when that period had closed; statement view shows the refund on its own posted date (§11) | No overage alert is raised by a refund. A refund that clears an existing overage resolves it, and any resulting change to a completed period is identified as a late adjustment (INV-69-16) | "This $X refund was applied back to [original period], where the purchase was budgeted." | Refund event, link to original expense, both dates, and before/after period totals recorded |
| EC-69-14 | Reversal (void) of a pending authorization before settlement (§9.3: distinct from a refund) | Authorization date of the canceled authorization | N/A after reversal | Reversed (treated as EC-69-05) | Provisional impact fully removed; no settled spending and no separate refund line item are created | Category and period totals return to their pre-authorization state | Any related informational warning is cleared; no firm alert is created | "The pending charge for $X was canceled before it settled and did not affect your budget." | Reversal event and last-known values recorded |
| EC-69-15 | Bill due date and its payment transaction's date differ | Due date for the bill occurrence; expense-date rules (EC-69-01/02/11) for the payment transaction | Due date (bill); independently derived date (payment) | Bill occurrence: projected; payment: pending or settled per its own rule | Bill occurrence appears in planning for the period containing its due date; the payment transaction is classified independently and may land in a different period | Bill-due and payment-transaction dates are both shown, explicitly linked | Standard pending/settled and overage rules apply to the payment transaction only | "This bill was due on [date]; your payment posted on [date]." | Bill-payment link and both dates recorded |
| EC-69-16 | A transaction is dated exactly on a period boundary | Its authoritative budget date (per the applicable rule above) | Same date | Per transaction type | Assigned to the period that begins on that date (start-inclusive), never the period ending the day before | No distinct behavior beyond standard period assignment | No distinct alert | Not customer-facing unless the user asks; period assignment is deterministic | Boundary-date assignment recorded |
| EC-69-17 | A budget-space date range crosses a daylight-saving transition | Calendar date (unaffected by clock-time shift) | Calendar date | Per transaction type | Each calendar date in the range is classified exactly once; no date is skipped or duplicated because a local day has 23 or 25 hours | No distinct behavior; totals are unaffected by the transition | No distinct alert | Not customer-facing; the transition is invisible to date-based classification | Not applicable beyond standard classification audit |
| EC-69-18 | A transaction falls on February 29 or the final day of a short month | Calendar date | Calendar date | Per transaction type | Classified into whichever valid period contains that calendar date under the governing schedule | No distinct behavior | No distinct alert | Not customer-facing; the date is valid and classifies normally | Not applicable beyond standard classification audit |
| EC-69-19 | A custom-period definition contains a gap, overlap, reversed range, or an out-of-range duration | Not applicable — no transaction is classified | Not applicable | Not applicable | Schedule activation is blocked; no period exists to classify against (CBD-68 §11) | Not applicable | Not applicable | "Fix the highlighted dates before activating this schedule," identifying the exact rows | Blocked-activation attempt recorded per CBD-68 §12 |
| EC-69-20 | Duplicate anchors, a skipped payday, or an active mid-period schedule change affect which period a date belongs to — **Provisional, pending CBD-68 Final Draft** | Per the confirmed CBD-67/CBD-68 schedule version in effect for that date | Per the confirmed schedule version | Per transaction type | Only a confirmed schedule version determines boundaries; transaction activity is never used to infer or move a boundary | Preview shows consequences before confirmation; classification never anticipates an unconfirmed change | Standard rules apply once classified under the confirmed version | "Your schedule determines your budget periods; transaction activity never changes them." | Schedule-version reference recorded on every classified transaction |
| EC-69-21 | A transaction settles after its authorization-date period has already ended (a linked refund of an expense in a closed period, EC-69-13, uses this same machinery) | Authorization date (unchanged) | Authorization date (unchanged period) | Settled, late | The already-completed period's actual totals are updated; its boundaries, schedule-version reference, and planned allocations are unchanged (INV-69-10) | The affected period is labeled "Adjusted after period end"; reports explain that authorization-date totals may differ from a posted-date bank statement | If the adjustment creates an overage, the alert is explicitly identified as a late adjustment (INV-69-16), not a current-period overage | "This period was adjusted after it ended because a charge settled late." | Late-settlement event, before/after period totals, and adjustment label recorded |
| EC-69-22 | An authorized user overrides a derived budget date | Original source dates (unchanged) | User-selected override date | Per transaction type, unaffected by the override | Affected period and category totals recalculate for both the original and new period; boundaries are unchanged | Both the original derived date and the override are shown in provenance | Standard rules apply to the transaction under its new budget date | "You changed this transaction's budget date from [X] to [Y]." | Actor, reason (if supplied), timestamp, and before/after budget date recorded |
| EC-69-23 | An unauthorized user attempts to override a budget date or resolve a pending/posted match | N/A — no change is made | Unchanged | Unchanged | No financial-state change | No change to any report | No change to any alert state | "You don't have permission to change this. Ask a Primary Owner, Co-owner, or Collaborator." | Denied-action attempt recorded per CBD-12 security policy |
| EC-69-24 | A category or budget-date change is made to an already-classified transaction | Original source dates (unchanged) | Updated per the change | Unchanged | Affected period totals recalculate; period boundaries never change | Updated totals are shown immediately; historical audit retains the prior state | Overage alert rules re-evaluate under the new category/date if applicable | "This change updated your totals; it did not move any period boundaries." | Before/after category or date, actor, and timestamp recorded |
| EC-69-25 | Refund with no reliable link to an original expense (unlinked credit, or a link that cannot be established) | Refund's posted / receipt date | Refund's posted / receipt date | Settled | Reduces net spending in the period containing the refund's own posted date; no earlier period is altered. This is the explicit fallback when EC-69-13's netting cannot be applied | Shown as an unlinked credit in both the budget-date and statement views | No overage alert; may resolve an overage in the period it lands in | "We couldn't match this refund to a purchase, so it's applied to the period it posted in. You can link it to a purchase." | Unlinked-refund state recorded, plus any later user-supplied link and the resulting reclassification (EC-69-24) |
| EC-69-26 | Transaction lacks a reliable authorization date **and the source reports it as still pending** | Posted / available date supplied with the pending record | Posted / available date, treated as provisional | Pending | Provisional impact in the period containing that date, following the ordinary pending lifecycle (§7); on settlement the final amount replaces the provisional amount and the budget date is re-derived under EC-69-01/02 if an authorization date becomes available | Shown with the same pending labeling as EC-69-01 (INV-69-14) | Informational warning while pending; firm alert only after settlement (INV-69-15) | "Pending — amount may change until it settles." | Missing-authorization-date provenance, provisional date basis, and any date re-derivation at settlement recorded |

## 7. Pending-to-settled reconciliation (resolves OD-69-01)

### 7.1 States

| State | Meaning |
| --- | --- |
| Pending-unmatched | A pending authorization with no candidate posted record yet. |
| Pending-match-candidate | A pending authorization with one or more plausible posted candidates identified automatically. |
| Settled-unmatched | A posted transaction with no pending predecessor found (EC-69-06). |
| Matched-settled | A pending authorization and its posted settlement have been linked, automatically or manually, and are treated as one transaction (EC-69-01, EC-69-04). |
| Duplicate-review | A pending and a posted record plausibly represent the same event but lack a reliable link and have not been resolved (EC-69-07). |
| Manually-resolved | A duplicate-review or ambiguous state resolved by an explicit user action rather than an automatic match. |
| Removed-without-settlement | A pending authorization that disappeared before settling (EC-69-05). |
| Reversed | A pending authorization explicitly canceled before settling (EC-69-14); handled identically to removed-without-settlement for financial impact. |

### 7.2 Transitions

| From | Trigger | To | User-visible effect |
| --- | --- | --- | --- |
| Pending-unmatched | A posted record with a high-confidence link arrives | Matched-settled | Provisional amount replaced by settled amount; same budget date retained |
| Pending-unmatched | A posted record with a plausible but uncertain link arrives | Pending-match-candidate or Duplicate-review | Unresolved-match indicator shown; both records visible |
| Pending-unmatched | The pending authorization disappears from the source feed | Removed-without-settlement | Provisional impact removed |
| Pending-unmatched | An authorized user or institution cancels the authorization | Reversed | Provisional impact removed |
| Pending-match-candidate / Duplicate-review | An authorized user confirms the match | Matched-settled | Provisional amount replaced by settled amount |
| Pending-match-candidate / Duplicate-review | An authorized user dismisses the candidate link | Settled-unmatched (posted side) and Removed-without-settlement or Reversed (pending side, per actual outcome) | Both records counted independently per their own rules |
| Settled-unmatched | An authorized user manually links it to a previously missed pending record | Matched-settled | Records merge; budget date follows EC-69-01 |

### 7.3 Manual controls

* **Match** — an authorized user (Primary Owner, Co-owner, or Collaborator) links a pending and a posted record explicitly, moving the pair to Matched-settled.
* **Unmatch** — an authorized user separates a previously matched pair, restoring each record to its independent state and requiring re-resolution.
* **Split** — an authorized user associates one pending record with more than one posted record, or vice versa, for the case where an institution posts a single authorization as multiple settlements (or the reverse). Each resulting record retains its own amount and audit trail. The sum of the settlements **need not equal** the original authorization: tip adjustments, partial captures, and partial fulfilment legitimately change the total, exactly as EC-69-04 already permits for an unsplit transaction. The product records the split, displays the variance between the authorized total and the settled total, and never blocks a split on an amount mismatch alone.
* **Dismiss** — an authorized user declares that two candidate records are not the same event, ending Duplicate-review without creating a match.

Automatic-match confidence scoring (the algorithm and its tuning) is implementation and data-science scope and is not defined by this product specification; see [FF-007](cobudget-future-feature-register.md). This section defines the product-visible states, transitions, and manual controls that any matching implementation must expose.

## 8. Income projection and receipt

Expected income is visible in projections and on the calendar but does not count as actual income, current cash, actual spending, or a spending target (INV-69-07). When an actual inflow is confirmed through synchronization or manual entry, CoBudget reconciles the expected occurrence where possible (EC-69-09) and updates account balances, actual-income totals, and cash-flow reporting. Receipt never modifies a spending target or planned amount automatically and never creates an income-allocation requirement (INV-69-08).

> **Target-and-tracking scope.** The CBD-11 product principles and the CBD-69 Description consistency decision (both updated August 12, 2026) establish that the MVP is target-and-tracking: spending targets, expected income, actual income, cash position, pending and settled activity, and actual spending remain separate concepts, and **income does not fund categories or create an available-to-assign pool**. This originates in CBD-68 product decision PD-68-01 and is captured as [FF-006](cobudget-future-feature-register.md). This specification therefore defines no allocation step for income receipt and no available-to-assign balance. If optional hybrid allocation is later introduced under FF-006, every rule in this section must continue to hold unchanged — income receipt must still never alter a spending target automatically, and any allocation must remain an explicit, separate user action.

Early, late, missing (EC-69-10), unexpected, or different-amount deposits are surfaced with an explicit variance indicator rather than silently changing the projection or the budget. Same-date income events remain separately identifiable even when grouped visually in the calendar, consistent with CBD-67/CBD-68 presentation rules for same-date events.

## 9. Other transaction types

### 9.1 Transfers

A transfer between accounts owned by the same budget space reconciles on its posted date but is excluded from income and spending totals (EC-69-12). Both sides of the transfer retain their linkage so a user can trace the movement without it distorting category totals.

### 9.2 Bills

A bill is assigned to a calendar period by its due date for planning purposes. Its linked payment transaction is classified independently using the ordinary expense-date rules (EC-69-01/02/11), and the two dates may fall in different periods (EC-69-15). The interface links the bill occurrence and its payment transaction explicitly so the difference is never presented as an error.

### 9.3 Refunds versus reversals (resolves RF-69-02)

CBD-69 v0.1 treated refunds and reversals as one case (EC-69-11 in v0.1). This creates two different economic events that require two different rules, so this Final Draft separates them:

* **Reversal (void)** — the underlying pending authorization is canceled *before* it ever settles. Nothing was ever spent. The provisional impact is removed entirely, with no new dated event created (EC-69-14). This is financially and procedurally identical to a pending authorization disappearing (EC-69-05); the only difference is that a reversal is an explicit cancellation rather than a silent disappearance, which the interface may (but is not required to) label differently for clarity.
* **Refund** — a previously *settled* expense is returned, in whole or in part, after the fact. Something was spent and later given back. The refund is its own settled event and retains its own posted date as a source date, but for budget classification a reliably linked refund **nets against the budget period of the expense it refunds** (EC-69-13), so a category's history reflects the true net cost of the purchase rather than showing full spending in one period and an unexplained credit in another. When the original expense's period has already ended, that reduction is a late adjustment governed by EC-69-21 — the period's actuals change; its boundaries, schedule version, and planned amounts do not. A refund that cannot be reliably linked to an original expense falls back to its own posted date (EC-69-25).

This distinction is deterministic and requires no further product decision: the dividing line is whether the original authorization ever reached settlement. If it did, a subsequent return is a refund. If it did not, a cancellation is a reversal.

Two consequences of the netting rule are intentional. First, a refund can change a completed period's totals, which is why it reuses EC-69-21's late-adjustment labeling rather than inventing separate behavior. Second, the budget-date and statement views will legitimately disagree about which period a refund belongs to — the budget-date view nets it to the purchase, the bank statement shows it on its posted date — which is precisely the difference §11's dual view exists to explain.

A refund whose amount exceeds the linked expense (for example, a goodwill credit larger than the purchase) is recorded in full and may drive that period's net actual for the category below zero. This specification does not cap or redistribute the excess; refining that presentation is product work outside CBD-69's scope.

### 9.4 Manually entered transactions

A manually entered expense uses the date the user selects as its budget date directly; there is no authorization/settlement fallback because there is no institution-supplied pending stage (EC-69-11).

## 10. Late settlement and completed-period adjustment

A transaction authorized (or otherwise budget-dated) in one period and settled in a later period remains assigned to its original budget-date period, even after that period has ended (INV-69-09, EC-69-21). Settlement may therefore adjust the totals of a period that has already been marked complete. Period boundaries, the schedule version that governed the period, and its planned allocations never change as a result (INV-69-10).

An ended period changed by a late-settling transaction is visibly marked **"Adjusted after period end."** Reports explain that authorization-date budgeting may differ from a bank or credit-card statement that uses posted dates, and a user can view both the authorization and posted dates whenever they differ (§11).

## 11. Reporting behavior (resolves OD-69-02)

Reports default to the **budget-date view**: every total is computed using each item's authoritative budget date, consistent with the classification matrix in §6. Alongside the default view, CoBudget provides a **statement view** using posted/settlement dates, so a user can reconcile CoBudget's numbers against a bank or credit-card statement that recognizes activity only on posted dates. The two views are clearly labeled and never silently mixed within one total.

A period modified by a late adjustment (§10) is visibly labeled in both views. Because a linked refund nets to the period of the expense it refunds (EC-69-13) while a bank statement shows it on its posted date, the two views will legitimately assign a refund to different periods; this is the clearest case the dual view exists to explain, and neither view is presented as a correction of the other. Exported data includes both the budget date and the posted date as distinct columns so a user (or their accountant) can reconcile either way outside the product. The exact export file formats, scheduled/automated export delivery, and any additional report cuts (for example, category-level statement reconciliation) are implementation and design scope beyond this decision; see [FF-008](cobudget-future-feature-register.md).

## 12. Alerts and collaboration (resolves OD-69-03)

### 12.1 Alert types

| Alert type | Trigger | Firm or informational |
| --- | --- | --- |
| Pending-activity warning | A pending expense's provisional impact would exceed or approach a category's remaining budget | Informational |
| Settled overspending alert | Settled spending exceeds a category's remaining budget in the active period | Firm |
| Late-adjustment overage alert | A late settlement (EC-69-21) creates or increases an overage in an already-completed period | Firm, explicitly labeled as a late adjustment (INV-69-16) |
| Duplicate/unresolved-match indicator | A pending/posted pair enters Duplicate-review (§7.1) | Informational |
| Missing-income indicator | An expected income occurrence passes without a matching receipt (EC-69-10) | Informational |

### 12.2 Eligibility and suppression

Firm and informational alert eligibility by role is defined in §4's permission matrix. Within that eligibility, the CBD-69-scoped suppression rule is: an informational pending-activity warning fires at most once per pending record per threshold crossing and is cleared (not re-fired) if the pending record is later removed, reversed, or settles below the threshold; a firm settled-overage alert fires once per period/category overage state and does not re-fire solely because a later, smaller settlement occurs within the same already-alerted overage.

Exact delivery channels, numeric thresholds, cooldown windows, deduplication windows, and quiet-hours behavior are CBD-12 scope, per its own Jira description ("independent categories, thresholds, channels, cooldowns, deduplication, quiet hours"). This document defines only which alert types exist, what triggers them, whether they are firm or informational, and who is presumptively eligible to receive them — the portion of AC-11 that belongs to CBD-69 rather than CBD-12.

## 13. Overrides, permissions, and audit (resolves OD-69-04)

A user may override a derived budget date when financial-institution data is missing or incorrect (EC-69-22). An override:

* Requires the permission defined in §4's matrix (Primary Owner, Co-owner, or Collaborator, as permitted by CBD-12).
* Never alters the original source authorization or posted/settlement dates (INV-69-13).
* Recalculates the affected period and category totals for both the original and new period without moving any period boundary (INV-69-10, EC-69-24).
* Is recorded with the actor, an optional reason, a timestamp, and the before/after budget date (INV-69-11).

An unauthorized override attempt produces no financial-state change, shows a clear permission explanation, and is itself recorded per CBD-12's security policy (EC-69-23). Manual pending/posted match, unmatch, split, and dismiss actions (§7.3) follow the same permission and audit requirements.

Complete audit coverage for this specification includes: source dates and provenance, derived budget date and any override, transaction lifecycle status transitions, automatic-match evidence, manual match/unmatch/split/dismiss decisions, denied privileged actions, late adjustments, category or budget-date changes, and — for every event — actor, timestamp, and before/after state (INV-69-11). Final role names and enforcement mechanics remain CBD-12 scope (§4).

## 14. Interface-state implications

The interface must support, at minimum: a pending transaction visibly distinct from settled spending (§6, §7); a duplicate/unresolved-match review state with match/unmatch/split/dismiss controls (§7.3); an expected-income projection visibly distinct from received income (§8); a refund shown as a linked line item that nets to the period of the expense it refunds, visibly distinct from a reversal's silent removal (§9.3), and an unlinked refund offering a link-to-purchase action (EC-69-25); a bill occurrence linked to, but visually distinct from, its payment transaction (§9.2); a completed period labeled "Adjusted after period end" with an explanation (§10); a budget-date report view and a statement report view, clearly labeled (§11); an informational pending-activity indicator distinct from a firm overage alert, and a late-adjustment alert distinct from a current-period overage alert (§12); an override control gated by permission, with a visible before/after when applied (§13); and a permission-denied explanation state for unauthorized override or match/unmatch/split/dismiss attempts (§13).

## 15. Data-model implications

The product definition in this document implies fields or equivalent records for, at minimum: source authorization date, source posted/settlement date, source time precision flag, derived budget date, budget-date provenance (including override metadata: actor, reason, timestamp, prior value), transaction lifecycle status (pending, settled, removed-without-settlement, reversed, refunded), reconciliation state (§7.1) and its transition history, refund-to-original-expense linkage, bill-to-payment linkage, transfer both-side linkage, period ID and schedule-version ID for the assigned period, a late-adjustment flag on affected periods, alert-type and firm/informational classification per fired alert, and audit events covering every state transition and permissioned action listed in §13. Technical design may choose storage shape and naming but must preserve every distinction this specification requires to be independently visible and auditable.

## 16. Automated-test implications

Automated verification must cover, at minimum: every row of the classification matrix in §6 under deterministic fixed dates and the authoritative budget-space time zone; every reconciliation state transition in §7.2 including manual match/unmatch/split/dismiss; the invariant that income receipt never changes a spending target (INV-69-08); the invariant that provisional and settled amounts for the same transaction are never summed (INV-69-06); late settlement into a completed period producing the "Adjusted after period end" label and a correctly labeled late-adjustment alert (§10, §12); the refund-versus-reversal distinction under both a settled-then-returned fixture and a never-settled-then-canceled fixture (§9.3), including a refund that nets into an already-completed period and an unlinked refund that falls back to its own posted date (EC-69-13, EC-69-25); the Duplicate-review counting rule under one candidate and under several (INV-69-22); and a split whose settlements do not sum to the authorization (§7.3); daylight-saving, leap-year, and same-day-boundary classification (EC-69-16 through EC-69-18); permission-denied behavior for override and reconciliation actions (EC-69-23); and full audit-trail reconstruction for a transaction that passes through import, a disputed match, an override, and a late settlement in sequence.

## 17. Dependencies, risks, and assumptions

### Dependencies

* [CBD-67](https://cobudget.atlassian.net/browse/CBD-67) — weekly/monthly schedule and period-boundary rules (Approved v1.2). This specification treats CBD-67 boundaries as authoritative input.
* [CBD-68](https://cobudget.atlassian.net/browse/CBD-68) — paycheck/custom schedule and period-boundary rules (Working Draft v0.1). Rows in §6 marked Provisional depend on CBD-68 reaching Final Draft.
* [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) — role, permission, and alert-configuration model (Ready, not yet specified). §4, §12.2, and §13 use a placeholder role model pending CBD-12.

### Risks

* If CBD-68's boundary rules change materially before its Final Draft, EC-69-20 and any dependent scenario fixtures must be revisited before this document can be marked Approved.
* If CBD-12 introduces role names, grants, or an alert-configuration model materially different from the CBD-67-derived baseline used here, §4, §12.2, and §13 require reconciliation.
* Automatic-match confidence scoring (§7.3) is unspecified by design; a poorly tuned implementation could produce excessive Duplicate-review volume even though the product-level states and controls are correctly defined here.

### Assumptions

* One budget space uses one authoritative currency and precision context, consistent with CBD-67 INV-85; multi-currency classification is out of scope (FF-005).
* The financial-data provider(s) selected under CBD-15 supply at minimum a posted/settlement date for every transaction type covered here, and an authorization date for expense-type pending transactions where the underlying account type supports one.

## 18. Open questions and follow-up work

No acceptance-criterion-blocking product decision remains open as of this Final Draft. The following are explicitly deferred, non-blocking follow-ups:

| ID | Topic | Disposition |
| --- | --- | --- |
| FF-007 | Automatic pending-to-posted match confidence scoring and tuning | Deferred to implementation/data-science scope; product-level states and manual controls are fully specified in §7. |
| FF-008 | Export file formats and scheduled/automated export delivery | Deferred; §11 specifies that both budget-date and posted-date columns must be present, but not file format or delivery mechanics. |
| RF-69-01 | CBD-68 reconciliation gate for EC-69-20 and related Provisional rows | Open until CBD-68 reaches Final Draft; tracked in the traceability record. |

See [FF-007 and FF-008 in the Future Feature Register](cobudget-future-feature-register.md) for full entries.

## 19. Supporting documents

* [CBD-69 — Period Edge-Case Scenario Catalog](cbd-69-period-edge-case-scenario-catalog.md)
* [CBD-69 — Acceptance Criteria Traceability and Review Record](cbd-69-acceptance-criteria-traceability.md)
* [CBD-67 — Weekly and Monthly Budget Cycle Workflow Specification](cbd-67-weekly-monthly-cadence-workflow-specification.md)
* [CoBudget — Future Feature Register](cobudget-future-feature-register.md)

## 20. Revision history and approval

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 0.1 | August 11, 2026 | Codex, owner Alexander Wohlford | Initial working draft: 10 invariants, a 20-row classification table with five of the nine required columns, 4 open decisions, 1 reconciliation flag. |
| 0.9 | August 12, 2026 | Alexander Wohlford with Claude assistance | Rebuilt the classification matrix to all nine required columns across 24 rows covering all 17 named case families; expanded invariants from 10 to 20; resolved OD-69-01 (reconciliation states and manual controls, §7), OD-69-02 (report views, §11), OD-69-03 (alert types and eligibility, §12), OD-69-04 (permission matrix, §4, §13), and RF-69-02 (refund-versus-reversal distinction, §9.3); added roles/permissions, data-model, and automated-test implication sections; marked CBD-68-dependent rows Provisional; moved status from Working Draft to In Review pending Product Owner and independent review. No CBD-67/CBD-68 boundary rule was altered by this document. |
| 0.9.1 | August 12, 2026 | Alexander Wohlford with Claude assistance | Merged against the concurrently updated Future Feature Register: the CBD-69 deferrals were renumbered to FF-007 (match confidence scoring) and FF-008 (export formats) because FF-006 was claimed by CBD-68 product decision PD-68-01. Corrected two internal section pointers (§5.3→§7.3, §6.4→§12.2) and added the income-allocation exclusion to §2. |
| 0.9.2 | August 12, 2026 | Alexander Wohlford with Claude assistance | Aligned to the CBD-69 and CBD-11 Jira Descriptions as updated August 12, 2026 at 17:48, which added the target-and-tracking consistency decision. Adopted the canonical effect of income receipt — account balances, actual-income totals, and **cash-flow reporting**, the last of which this document previously omitted — and replaced "received-income totals" with "actual-income totals," "received income" with "actual income" as the state name, and "budget value" with "spending target." Rewrote the §8 scope note to cite the Jira consistency decision. Also corrected two further stale internal pointers found in a subsection-level reference audit (§6.4→§12.2 in the §4 permission matrix, §7.4→§13 in the §4 closing note). No classification-matrix row, invariant, or scenario outcome changed in substance. |
| 0.9.3 | August 12, 2026 | Alexander Wohlford with Claude assistance | Product Owner review. Four decisions and three defect fixes, all changing product behavior. **Refund dating reversed:** a reliably linked refund now nets against the budget period of the expense it refunds (EC-69-13, INV-69-21) rather than reducing the period it posted in, reusing EC-69-21 late-adjustment behavior when that period has closed; EC-69-25 added as the unlinked-refund fallback. **Duplicate-review counting settled:** the posted amount is counted, classified to the pending candidate's authorization date, or to the posted date when several candidates exist (EC-69-07, INV-69-22) — this resolved a contradiction between EC-69-07 and fixture PEND-03. **Split rule corrected:** settlements need not sum to the authorization, since tip adjustments and partial captures legitimately differ and the old equality gate contradicted EC-69-04 (§7.3). **Uncovered input added:** EC-69-26 handles a pending transaction with no reliable authorization date, which the previous EC-69-02 wrongly assumed was always settled. §11's statement view was confirmed in MVP scope. Matrix rows 24→26, invariants 20→22. |

**Approval status:** Not yet approved. This version is submitted for Product Owner review following the CBD-67 review pattern (traceability check, rules/edge-case review, formal approval, independent review pass). See the traceability record §6 for the pending review schedule.
