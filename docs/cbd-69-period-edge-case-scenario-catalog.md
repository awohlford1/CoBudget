# CBD-69 — Period Edge-Case Scenario Catalog

| Field | Value |
| --- | --- |
| Status | In Review |
| Version | 0.9.2 |
| Owner | Alexander Wohlford |
| Jira | [CBD-69](https://cobudget.atlassian.net/browse/CBD-69) |
| Governing specification | [CBD-69 — Period Edge Cases and Validation Rule Specification](cbd-69-period-edge-cases-validation-specification.md) |
| Traceability | [CBD-69 — Acceptance Criteria Traceability and Review Record](cbd-69-acceptance-criteria-traceability.md) |
| Last updated | August 12, 2026 |

## 1. Purpose and conventions

These fixtures demonstrate deterministic outcomes for every row of the governing specification's classification matrix, reconciliation states, and open-decision resolutions. Unless stated otherwise:

* The authoritative budget-space time zone is **America/New_York**.
* Dates are Gregorian calendar dates and period display dates are inclusive.
* Weekly periods anchor on Monday, reusing the CBD-67 §5.2 reference calendar: **Aug 10–16, 2026** and **Aug 17–23, 2026** are adjacent weekly periods (Aug 10, 2026 is a Monday), and **Aug 24–30** and **Aug 31–Sep 6** follow contiguously. Fixtures that need a period boundary use these dates so results can be checked against the CBD-67 reference calendar directly.
* Dollar amounts are illustrative and use two-decimal currency precision.

### Coverage depth

Following the CBD-67 catalog convention, this catalog documents two levels of evidence: **fully worked fixtures**, which show concrete dates, amounts, and step-by-step expected outcomes, and **compact assertion-table entries**, which state input and expected outcome without an extended narrative. Both levels are binding acceptance evidence. This version contains **29 fully worked fixtures** and no compact assertion-table entries; every required case family received a full fixture.

| Prefix | Meaning |
| --- | --- |
| DATE | Source-date selection and boundary classification |
| PEND | Pending-to-posted lifecycle (amount change, disappearance, unmatched, duplicate) |
| REC | Manual reconciliation controls: match, unmatch, split, dismiss |
| INC | Expected and actual income |
| TYPE | Transfers, bills, and manual transactions |
| REV | Refund-versus-reversal contrast pair |
| LATE | Completed-period late adjustment |
| OVR | Override, permission, and audit behavior |
| REP | Budget-date and statement report views |
| ALT | Alert type, eligibility, and suppression behavior |
| CAL | Calendar and schedule-validation edge cases |

## 2. Scenario coverage matrix

| AC | Scenario evidence |
| --- | --- |
| AC01 | DATE-01–04 |
| AC02 | DATE-01, DATE-02 |
| AC03 | DATE-03, DATE-04 |
| AC04 | PEND-01, PEND-02 |
| AC05 | PEND-01, PEND-04, REV-01 |
| AC06 | PEND-02–04, REC-01, REC-02, REC-02a, REC-03 |
| AC07 | INC-01, INC-02 |
| AC08 | TYPE-01–03, REV-01, REV-02 |
| AC09 | LATE-01, ALT-02 |
| AC10 | LATE-01, REP-01 |
| AC11 | ALT-01, ALT-02 |
| AC12 | OVR-01, OVR-02, REC-01, REC-02a, REV-01 |
| AC13 | DATE-04, CAL-01–04 |
| AC14 | All scenarios |
| AC15 | REP-01, all data-bearing scenarios |

## 3. Transaction-date classification fixtures

### DATE-01 — Authorization date wins across a settlement boundary

* Input: expense authorized **Friday, August 14, 2026** (within the Aug 10–16 period) for $86.00; settles **Tuesday, August 18, 2026** (within the Aug 17–23 period) for a final $91.40.
* Expected: budget date is August 14; the $86.00 provisional impact appears in the Aug 10–16 category total; on settlement, the Aug 10–16 total becomes $91.40 (the provisional amount is replaced, not added to); the Aug 17–23 period is unaffected.
* Evidence: EC-69-01, EC-69-04, EC-69-08; INV-69-05, INV-69-06, INV-69-09.

### DATE-02 — Missing authorization date falls back to posted date

* Input: a grocery expense has no authorization date and posts **Monday, August 17, 2026** for $54.12.
* Expected: budget date is August 17 with fallback provenance recorded; it belongs to the Aug 17–23 period and is settled directly with no pending stage shown.
* Evidence: EC-69-02; INV-69-05.

### DATE-03 — Date supplied without a reliable time

* Input: the financial institution supplies "2026-08-17" with no time component.
* Expected: CoBudget uses August 17 as supplied. It does not infer 00:00 UTC, convert through a time zone, or shift the transaction to August 16 or August 18.
* Evidence: EC-69-03; INV-69-03, INV-69-18 (time-based conversion prohibition applies identically outside DST windows).

### DATE-04 — Same-day boundary classification

* Input: a manually entered expense uses user-selected date **August 17, 2026**, the first day of the Aug 17–23 period; the prior period ended August 16.
* Expected: the expense belongs to Aug 17–23, not Aug 10–16, consistent with the start-inclusive boundary convention.
* Evidence: EC-69-16, EC-69-11; INV-69-02, INV-69-20.

## 4. Pending-to-posted lifecycle fixtures

### PEND-01 — Amount changes at settlement, same period

* Input: $75.00 pending authorization on **August 18, 2026**; settles for $62.00 on **August 22, 2026**. Both dates fall in Aug 17–23.
* Expected: the $75.00 provisional impact becomes $62.00 settled spending in the same period; the category total is never $137.00.
* Evidence: EC-69-04; INV-69-06.

### PEND-02 — Pending authorization disappears without settlement

* Input: a $100.00 hotel hold appears **August 12, 2026** (Aug 10–16) and disappears without settling on **August 15, 2026**.
* Expected: the provisional impact is fully removed; the Aug 10–16 category total returns to its pre-authorization state; no settled spending or firm overspending alert results.
* Evidence: EC-69-05; INV-69-06.

### PEND-03 — Unmatched posted transaction with weak candidates

* Input: a $48.00 posted expense on **August 19, 2026** (Aug 17–23) has two weak pending candidates from August 17 and 18 that the automatic matcher cannot confidently link.
* Expected: the posted item is counted exactly once, using the posted-date fallback (EC-69-02), in Aug 17–23; the weak candidates are presented for review rather than silently merged or double-counted.
* Evidence: EC-69-06, EC-69-07; INV-69-06.

### PEND-04 — Apparent pending/posted duplicate

* Input: a pending $49.90 charge authorized August 20 and a posted $50.00 charge on August 21 share the same merchant but have no reliable institution-supplied link.
* Expected: the pair enters Duplicate-review; only one instance counts toward category and period totals while unresolved; the interface shows an unresolved-match indicator on both records.
* Evidence: EC-69-07; §7.1–7.2 of the specification.

## 5. Manual reconciliation control fixtures (resolves OD-69-01)

### REC-01 — Manual match

* Input: a pending $200.00 charge (August 12) and a settled-unmatched $200.00 charge (August 14) from the same merchant sit in Duplicate-review with no automatic link. An authorized Collaborator selects **Match**.
* Expected: the pair moves to Matched-settled; the combined record is counted once, using the pending record's August 12 budget date; the match actor and timestamp are recorded.
* Evidence: EC-69-07; specification §7.2–7.3.

### REC-02 — Manual split of one authorization into two settlements

* Input: a single pending authorization of $150.00 on **August 15, 2026** (Aug 10–16) is posted by the institution as two separate settlements on **August 18, 2026**: $90.00 and $60.00. Automatic matching cannot link one pending record to two posted records. An authorized Collaborator selects **Split**.
* Expected: the split produces two matched records of $90.00 and $60.00, each retaining the original authorization's August 15 budget date (EC-69-01) and therefore both landing in Aug 10–16; the split amounts sum to exactly $150.00, matching the original authorization, or the split is blocked pending correction; each resulting record carries its own audit trail linked to the original authorization.
* Evidence: specification §7.3; INV-69-06 (no amount is counted twice across the split).

### REC-02a — Manual unmatch of an incorrect automatic match

* Input: the automatic matcher links a $75.00 pending charge (August 15) to a $75.00 settled charge (August 17) from a different merchant that coincidentally shares the amount. An authorized Collaborator selects **Unmatch**.
* Expected: both records return to their independent states — the pending record to Pending-unmatched and the settled record to Settled-unmatched — and each is then classified under its own rule (EC-69-01/05 for the pending side depending on its eventual outcome, EC-69-06 for the settled side); the unmatch actor and timestamp are recorded, and the prior match remains visible in audit history.
* Evidence: specification §7.2–7.3; INV-69-11.

### REC-03 — Dismiss a weak candidate

* Input: a pending $40.00 charge (August 13) and a settled $42.00 charge (August 20) are flagged as a weak candidate match by the automatic matcher due to similar merchant spelling. An authorized Collaborator selects **Dismiss**.
* Expected: Duplicate-review ends without merging; the pending charge and the settled charge are counted independently under their own rules (EC-69-05 or EC-69-01 for the pending side depending on its eventual outcome; EC-69-06 for the settled side).
* Evidence: specification §7.2–7.3.

## 6. Income fixtures

### INC-01 — Expected income received in a later period

* Input: $2,000.00 expected **August 16, 2026** (last day of Aug 10–16); actual $1,950.00 settles **August 18, 2026** (Aug 17–23).
* Expected: the Aug 10–16 projection remains expected-only and is never shown as actual income in that period; on August 18, the $1,950.00 updates actual-income totals, account balances, and cash-flow reporting in Aug 17–23; the Aug 10–16 projection is marked reconciled with a −$50.00 variance shown. No spending target changes as a direct effect, and no allocation step or allocation requirement occurs (CBD-11/CBD-69 consistency decision).
* Evidence: EC-69-09; INV-69-07, INV-69-08.

### INC-02 — Expected income never arrives

* Input: income expected **August 20, 2026** passes with no matching deposit by the Aug 17–23 period's end (August 23).
* Expected: the projection is marked missing/unmatched; no actual-income, balance, cash-flow-reporting, or spending-target change occurs; no period boundary changes.
* Evidence: EC-69-10; INV-69-07.

## 7. Other transaction-type fixtures

### TYPE-01 — Transfer between owned accounts

* Input: a $500.00 transfer posts **August 18, 2026** from a checking account to a savings account, both owned by the same budget space.
* Expected: reconciled on its posted date (August 18); excluded from both income and spending totals in every view.
* Evidence: EC-69-12; INV-69-08 (no budget impact from a non-spending event).

### TYPE-02 — Bill due date differs from payment date

* Input: a bill is due **August 16, 2026** (last day of Aug 10–16); its payment transaction is authorized **August 18, 2026** (Aug 17–23).
* Expected: the bill occurrence appears in the Aug 10–16 planning view by its due date; the payment transaction is classified independently in Aug 17–23 using the expense-date rules (EC-69-01); both dates are shown explicitly linked.
* Evidence: EC-69-15.

### TYPE-03 — Manually entered expense

* Input: a user manually enters an expense and selects **August 19, 2026** as its date.
* Expected: the budget date is August 19 directly; there is no authorization/settlement fallback because no institution pending stage exists.
* Evidence: EC-69-11.

## 8. Refund-versus-reversal fixtures (resolves RF-69-02)

### REV-01 — Refund for a previously settled expense

* Input: an expense authorizes and settles **August 12, 2026** (Aug 10–16) for $120.00. A refund posts **August 25, 2026** (Aug 24–30) for $30.00, linked to the original expense.
* Expected: the refund uses its own August 25 receipt date; net spending in Aug 24–30 is reduced by $30.00; the original Aug 10–16 expense total remains $120.00 and is never retroactively reduced to $90.00.
* Evidence: EC-69-13; specification §9.3.

### REV-02 — Reversal (void) of a pending authorization before settlement

* Input: a pending authorization of $45.00 appears **August 19, 2026** (Aug 17–23) and is canceled by the merchant before it ever settles, on **August 20, 2026**.
* Expected: the provisional impact is fully removed; no refund line item is created because nothing ever settled; the Aug 17–23 period returns to its pre-authorization state — directly contrasting REV-01, where a settled expense produces a separate, independently dated refund event.
* Evidence: EC-69-14; specification §9.3.

## 9. Completed-period adjustment fixtures

### LATE-01 — Settlement adjusts an already-completed period

* Input: as of "today" **August 25, 2026**, the Aug 10–16 period is completed. A $90.00 expense authorized **August 14, 2026** finally settles for $110.00 on **August 20, 2026** — after the period ended — creating a settled overage against a $100.00 category budget.
* Expected: the Aug 10–16 period's total updates from $90.00 to $110.00; its boundaries, schedule-version reference, and planned allocations are unchanged; the period is labeled "Adjusted after period end"; because the settlement creates an overage, the resulting alert is identified as a late adjustment (see ALT-02), not a current-period overage.
* Evidence: EC-69-21; INV-69-09, INV-69-10, INV-69-16.

## 10. Override and permission fixtures (resolves OD-69-04)

### OVR-01 — Authorized budget-date override

* Input: an expense's derived budget date is August 18 (posted-date fallback, EC-69-02), but the purchase actually occurred August 16. A Collaborator with the required permission overrides the budget date to August 16, moving the transaction from Aug 17–23 to Aug 10–16.
* Expected: the original source dates are preserved unchanged; both the Aug 10–16 and Aug 17–23 period totals recalculate; no period boundary changes; the actor, an optional reason, a timestamp, and the before/after budget date are recorded.
* Evidence: EC-69-22; INV-69-11, INV-69-12, INV-69-13.

### OVR-02 — Override attempted without permission

* Input: a Viewer without override permission attempts the same change as OVR-01.
* Expected: no financial-state change occurs; the interface explains the required permission; the denied attempt is recorded per CBD-12's security policy.
* Evidence: EC-69-23; INV-69-12.

## 11. Reporting fixtures (resolves OD-69-02)

### REP-01 — Budget-date view versus statement view

* Input: DATE-01's expense (authorized August 14, settled August 18, final $91.40) and REV-01's refund (posted August 25, $30.00).
* Expected: the budget-date view shows $91.40 in Aug 10–16 and −$30.00 in Aug 24–30. The statement view shows the expense's $91.40 grouped under its posted date, August 18 (Aug 17–23), while the refund appears identically in both views because it has no separate authorization stage. An export of the same data includes both the budget date and the posted date as distinct columns for every item.
* Evidence: specification §11; INV-69-04, INV-69-17.

## 12. Alert fixtures (resolves OD-69-03)

### ALT-01 — Informational warning cleared on removal

* Input: a pending $300.00 charge on August 14 in a category with $250.00 remaining triggers an informational pending-activity warning. The authorization is removed without settlement on August 16 (as in PEND-02).
* Expected: the informational warning fires once, on August 14; it is cleared — not re-fired — when the authorization is removed on August 16; no firm alert is ever created for this charge.
* Evidence: specification §12.1–12.2; INV-69-15.

### ALT-02 — Late-adjustment alert distinct from a current-period alert

* Input: LATE-01's fixture, where the Aug 10–16 period's settled total rises from $90.00 to $110.00 against a $100.00 budget after the period has ended.
* Expected: the resulting alert explicitly identifies itself as a late adjustment to the completed Aug 10–16 period, and is visibly distinguishable from any independent current-period overage alert that might fire for Aug 17–23 or later.
* Evidence: specification §12.1; INV-69-16.

## 13. Calendar and schedule-validation fixtures

### CAL-01 — Daylight-saving transition

* Input: daily calendar coverage crosses the **November 1, 2026** fall-back transition in America/New_York (the first Sunday of November, when the local clock repeats 1:00–2:00 a.m.).
* Expected: each calendar date — including November 1 itself — appears exactly once in period classification; no period gains or loses a day because the local clock day has 25 hours.
* Evidence: EC-69-17; INV-69-18.

### CAL-02 — Leap day and short month

* Input: a valid weekly or monthly period includes **February 29, 2028** (2028 is a leap year); a separate invalid request specifies a monthly anchor of "February 30," which does not exist.
* Expected: February 29 classifies normally within whatever valid period contains it; the invalid February 30 anchor is rejected or clamped only where the governing CBD-67 monthly-anchor clamping rule (INV-18) explicitly permits clamping — this specification does not independently invent clamping behavior.
* Evidence: EC-69-18; INV-69-19.

### CAL-03 — Gap and overlap block activation

* Input: a proposed custom schedule of August 1–10 followed by August 12–20 (a gap); a separate proposed schedule of August 1–10 followed by August 10–20 (an overlap on August 10).
* Expected: activation is blocked in both cases; the gap case identifies missing August 11; the overlap case identifies duplicate August 10; no partial schedule is written.
* Evidence: EC-69-19; CBD-68 §11.

### CAL-04 — Duplicate anchor and skipped payday — **Provisional, pending CBD-68 Final Draft**

* Input: a business-day adjustment collapses two separate anchor occurrences onto the same calendar date; a separate, independently confirmed schedule change skips one anchor occurrence entirely.
* Expected: the collapsed anchors produce exactly one period boundary; the skip's effect on classification appears only after its schedule change is confirmed under CBD-67/CBD-68 rules — transaction activity is never used to infer or move a boundary in advance of confirmation.
* Evidence: EC-69-20; CBD-68 §7, §9, §10. This fixture must be re-verified against CBD-68's Final Draft numbering and examples before CBD-69 can be marked Approved (RF-69-01).

## 14. Coverage still to refine

* CAL-04 requires re-verification once CBD-68 reaches Final Draft (RF-69-01, tracked in the traceability record).
* Automatic-match confidence-scoring fixtures (exact thresholds an implementation would use to distinguish PEND-03 from PEND-04 automatically) are deferred to implementation scope; see FF-007 in the governing specification §18.
* Export file-format-specific fixtures are deferred; see FF-008 in the governing specification §18.
* Role-specific fixtures beyond OVR-01/OVR-02 (for example, an Accountability Partner viewing but not acting on a Duplicate-review state) may be added once CBD-12 publishes its role model; the current fixtures use the CBD-67-derived placeholder role set.
