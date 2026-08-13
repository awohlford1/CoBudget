# CBD-69 — Period Edge-Case Scenario Catalog

| Field | Value |
| --- | --- |
| Status | **Approved** |
| Version | 1.0 |
| Owner | Alexander Wohlford |
| Approval | Approved August 13, 2026 after Claude initial analysis, Product Owner review, Codex audit, and final Product Owner review |
| Jira | [CBD-69](https://cobudget.atlassian.net/browse/CBD-69) |
| Schedule workflow input | [CBD-68](https://cobudget.atlassian.net/browse/CBD-68) (paycheck/custom, Approved v1.0; RF-69-01 closed August 13, 2026) |
| Governing specification | [CBD-69 — Period Edge Cases and Validation Rule Specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3538946) |
| Traceability | [CBD-69 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/3670026) |
| Last updated | August 13, 2026 |

## 1. Purpose and conventions

These fixtures demonstrate deterministic outcomes for every row of the governing specification's classification matrix, reconciliation states, and open-decision resolutions. Unless stated otherwise:

* The authoritative budget-space time zone is **America/New_York**.
* Dates are Gregorian calendar dates and period display dates are inclusive.
* Weekly periods anchor on Monday, reusing the CBD-67 §5.2 reference calendar: **Aug 10–16, 2026** and **Aug 17–23, 2026** are adjacent weekly periods (Aug 10, 2026 is a Monday), and **Aug 24–30** and **Aug 31–Sep 6** follow contiguously. Fixtures that need a period boundary use these dates so results can be checked against the CBD-67 reference calendar directly.
* Dollar amounts are illustrative and use two-decimal currency precision.

### Coverage depth

Following the CBD-67 catalog convention, this catalog documents two levels of evidence: **fully worked fixtures**, which show concrete dates, amounts, and step-by-step expected outcomes, and **compact assertion-table entries**, which state input and expected outcome without an extended narrative. Both levels are binding acceptance evidence. This version contains **36 fully worked fixtures** and no compact assertion-table entries; every required case family received a full fixture.

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
| AC02 | DATE-01, DATE-02, DATE-02a |
| AC03 | DATE-03, DATE-04 |
| AC04 | PEND-01, PEND-02, DATE-02a |
| AC05 | PEND-01, PEND-04, DATE-02a, REV-01 |
| AC06 | PEND-02–04, REC-01, REC-02, REC-02a, REC-02b, REC-03 |
| AC07 | INC-01, INC-02 |
| AC08 | TYPE-01–03, REV-01, REV-01a, REV-01b, REV-02 |
| AC09 | LATE-01, ALT-02 |
| AC10 | LATE-01, REP-01 |
| AC11 | ALT-01, ALT-02, ALT-03, ALT-04, ALT-05, ALT-06 |
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

### DATE-02a — Pending transaction with no authorization date

* Input: a linked account reports a **pending** $63.00 charge with no reliable authorization date, supplying only an available date of **August 18, 2026** (Aug 17–23). It later settles for $63.00 on August 21.
* Expected: the charge is not treated as settled merely because it lacks an authorization date. It takes August 18 as a provisional budget date, appears as pending in Aug 17–23 with the ordinary pending labeling, and produces only an informational warning. On settlement the final amount replaces the provisional one; if an authorization date arrives with the settlement, the budget date is re-derived under EC-69-01.
* Evidence: EC-69-26; INV-69-06, INV-69-14, INV-69-15.

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
* Expected: the posted item is counted exactly once at $48.00 in Aug 17–23. Because two candidates exist, no single authorization date can be selected, so the posted date August 19 is used until a user resolves the pair (EC-69-07). The candidates are presented for review rather than silently merged or double-counted.
* Evidence: EC-69-06, EC-69-07; INV-69-06, INV-69-22.

### PEND-04 — Apparent pending/posted duplicate

* Input: a pending $49.90 charge authorized August 20 and a posted $50.00 charge on August 21 share the same merchant but have no reliable institution-supplied link.
* Expected: the pair enters Duplicate-review. The **posted $50.00** is the amount counted, because the money has moved and the figure is final; it is classified to the pending record's August 20 authorization date, since exactly one candidate exists. The pending $49.90 contributes no separate impact, so the category total is $50.00 — never $49.90 and never $99.90. Both records stay visible with an unresolved-match indicator.
* Evidence: EC-69-07; INV-69-22; specification §7.1–7.2.

## 5. Manual reconciliation control fixtures (resolves OD-69-01)

### REC-01 — Manual match

* Input: a pending $200.00 charge (August 12) and a settled-unmatched $200.00 charge (August 14) from the same merchant sit in Duplicate-review with no automatic link. An authorized Collaborator selects **Match**.
* Expected: the pair moves to Matched-settled; the combined record is counted once, using the pending record's August 12 budget date; the match actor and timestamp are recorded.
* Evidence: EC-69-07; specification §7.2–7.3.

### REC-02 — Manual split of one authorization into two settlements

* Input: a single pending authorization of $150.00 on **August 15, 2026** (Aug 10–16) is posted by the institution as two separate settlements on **August 18, 2026**: $90.00 and $60.00. Automatic matching cannot link one pending record to two posted records. An authorized Collaborator selects **Split**.
* Expected: the split produces two matched records of $90.00 and $60.00, each retaining the original authorization's August 15 budget date (EC-69-01) and therefore both landing in Aug 10–16; each carries its own audit trail linked to the original authorization. Here the settlements happen to sum to the $150.00 authorized, but that is not required — see REC-02b.
* Evidence: specification §7.3; INV-69-06 (no amount is counted twice across the split).

### REC-02a — Manual unmatch of an incorrect automatic match

* Input: the automatic matcher links a $75.00 pending charge (August 15) to a $75.00 settled charge (August 17) from a different merchant that coincidentally shares the amount. An authorized Collaborator selects **Unmatch**.
* Expected: both records return to their independent states — the pending record to Pending-unmatched and the settled record to Settled-unmatched — and each is then classified under its own rule (EC-69-01/05 for the pending side depending on its eventual outcome, EC-69-06 for the settled side); the unmatch actor and timestamp are recorded, and the prior match remains visible in audit history.
* Evidence: specification §7.2–7.3; INV-69-11.

### REC-02b — Split whose settlements exceed the authorization

* Input: a restaurant authorization of $50.00 on **August 18, 2026** (Aug 17–23) settles as $60.00 after a $10.00 tip is added. A separate case: a $150.00 authorization settles as $90.00 and $45.00 only, totalling $135.00, because part of the order was never fulfilled.
* Expected: both are accepted. The settled amounts govern — $60.00 in the first case, $135.00 in the second — and neither is blocked for failing to equal the authorization. The variance is displayed (+$10.00 and −$15.00 respectively). This is the same amount-change behavior EC-69-04 already grants an unsplit transaction; the earlier requirement that split amounts sum exactly to the authorization was removed in v0.9.3 because it would have blocked an ordinary tip.
* Evidence: specification §7.3; EC-69-04; INV-69-06.

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

* Input: income is expected **Thursday, August 20, 2026** and no matching deposit is confirmed. There are no Federal Reserve closures in the following five-business-day window.
* Expected: the occurrence is **Expected today** on August 20; **Late** from Friday August 21 through Thursday August 27, the fifth Federal Reserve business day after the expected date; and **Missing** beginning Friday August 28. Late remains in expected totals and the near-term forecast. Missing remains in historical expected totals and variance reporting but leaves forward-looking cash projections. No actual-income, balance, cash-flow-reporting, spending-target, or period-boundary change occurs. The interface offers three distinct actions: **Edit this expected paycheck**, **Skip this occurrence**, and **Review repeating schedule**. Skip removes the occurrence from current expected totals and the forward forecast while preserving the original expectation and action in history; it does not delete the record or change boundaries.
* Evidence: EC-69-10; INV-69-07; CBD-68 PD-68-07.

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

### REV-01 — Linked refund nets into the original expense's period

* Input: an expense authorizes and settles **August 12, 2026** (Aug 10–16) for $120.00. A refund of $30.00 posts **August 25, 2026** (Aug 24–30), reliably linked to that expense. "Today" is August 25, so Aug 10–16 has already completed.
* Expected: the refund retains August 25 as its source posted date, but classifies to the original expense's **August 12** budget date. The Aug 10–16 category actual drops from $120.00 to $90.00, showing the true net cost of the purchase. Aug 24–30 is **not** reduced and gains no additional room. Because Aug 10–16 had already closed, it is labeled "Adjusted after period end"; its boundaries, schedule-version reference, and planned amounts are unchanged. The statement view still shows the −$30.00 on August 25 (see REP-01).
* Evidence: EC-69-13, EC-69-21; INV-69-10, INV-69-21.

### REV-01b — Linked refund exceeds the original expense

* Input: an expense authorizes and settles **August 12, 2026** in the Aug 10–16 period for **$100.00**. A reliably linked **$120.00** refund posts **August 25, 2026**, after the original period has ended.
* Expected: budget-date reporting applies the full $120.00 to the original Aug 10–16 period and category. The first $100.00 fully offsets the purchase; the remaining **$20.00 is displayed as an excess refund credit**, producing **−$20.00 net actual spending** for that category and period. The spending target is unchanged, nothing moves to Aug 24–30 or another category, and no allocation action is created. Aug 10–16 is labeled “Adjusted after period end.” Statement reporting shows the full −$120.00 refund on August 25. No overage alert is created; if the category previously had an overage, the refund may resolve it.
* Evidence: EC-69-13, EC-69-21; INV-69-10, INV-69-16, INV-69-21.

### REV-01a — Unlinked refund falls back to its own posted date

* Input: a $25.00 merchant credit posts **August 26, 2026** (Aug 24–30) with no reliable link to any prior expense.
* Expected: because EC-69-13's netting cannot be applied, the refund uses its own August 26 posted date and reduces net spending in Aug 24–30. No earlier period is altered and no period is labeled as adjusted. The interface offers a link-to-purchase action; if the user later links it to an expense budgeted to an earlier period, the refund reclassifies under EC-69-13 and EC-69-24, and the earlier period is then labeled as adjusted.
* Evidence: EC-69-25, EC-69-24; INV-69-21.

### REV-02 — Reversal (void) of a pending authorization before settlement

* Input: a pending authorization of $45.00 appears **August 19, 2026** (Aug 17–23) and is canceled by the merchant before it ever settles, on **August 20, 2026**.
* Expected: the provisional impact is fully removed; no refund line item is created because nothing ever settled; the Aug 17–23 period returns to its pre-authorization state. This contrasts with REV-01 on the dividing line in §9.3: there, the expense reached settlement, so its return is a real refund event that reduces the purchase's own period; here nothing ever settled, so there is no event to date and nothing to net.
* Evidence: EC-69-14, EC-69-05; specification §9.3.

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

* Input: three items — DATE-01's expense (authorized August 14, posted August 18, final $91.40); REV-01's expense ($120.00, authorized and posted August 12); and REV-01's linked refund (−$30.00, posted August 25).
* Expected, budget-date view: all three classify to **Aug 10–16**, because the first uses its August 14 authorization date, the second its August 12 date, and the refund nets to the expense it refunds. The period's net actual is $91.40 + $120.00 − $30.00 = **$181.40**. Aug 17–23 and Aug 24–30 show none of these items.
* Expected, statement view: the same three items spread across three periods by posted date — $120.00 in Aug 10–16 (posted August 12), $91.40 in Aug 17–23 (posted August 18), and −$30.00 in Aug 24–30 (posted August 25).
* Expected, both: the views disagree about the period for two of the three items, and neither is presented as a correction of the other. An export includes both the budget date and the posted date as distinct columns for every item, so either reconciliation is reproducible outside the product.
* Evidence: specification §11, §9.3; EC-69-13; INV-69-04, INV-69-17.

## 12. Alert fixtures (resolves OD-69-03)

### ALT-01 — Informational warning cleared on removal

* Input: a pending $300.00 charge on August 14 in a category with $250.00 remaining triggers an informational pending-activity warning. The authorization is removed without settlement on August 16 (as in PEND-02).
* Expected: the informational warning fires once, on August 14. Its copy states that the pending charge **would** exceed the category, never that it has been exceeded (INV-69-23). It offers no acknowledgement action. When the authorization is removed on August 16 the warning clears itself with no user action; it is not re-fired, and no firm alert is ever created for this charge.
* Evidence: specification §12.1–12.2; INV-69-15, INV-69-23.

### ALT-02 — Late-adjustment alert distinct from a current-period alert

* Input: LATE-01's fixture, where the Aug 10–16 period's settled total rises from $90.00 to $110.00 against a $100.00 budget after the period has ended.
* Expected: the resulting alert explicitly identifies itself as a late adjustment to the completed Aug 10–16 period, and is visibly distinguishable from any independent current-period overage alert that might fire for Aug 17–23 or later.
* Evidence: specification §12.1; INV-69-16.

### ALT-03 — Firm alert persists and is acknowledged

* Input: settled spending of $310.00 against a $250.00 category target in the **active** Aug 17–23 period produces a firm settled-overspending alert. A Co-owner acknowledges it. No further transactions are added.
* Expected: the alert states the overage as a fact, not a possibility, because the money has settled (INV-69-23). It offers an acknowledgement action, and acknowledging it records the actor and timestamp without changing any financial value or clearing the underlying overage. The alert does not clear itself, because the $60.00 overage remains true. A later, smaller settlement inside the same overage state does not re-fire it (§12.2). Contrast ALT-01, where the informational form self-clears and offers no acknowledgement.
* Evidence: specification §12.1–12.2, §4; INV-69-15, INV-69-23.

### ALT-04 — Accountability Partner receives an informational alert by default

* Input: an invitation has been accepted, so the person now holds the active Accountability Partner role. The Partner is provisioned for the affected category, and applicable masking permits a category-level amount but hides restricted merchant detail. No separate informational-alert opt-in has been taken. A pending $180.00 charge on August 14 in a category with $150.00 remaining triggers an informational warning (as in ALT-01).
* Expected: the active, provisioned Accountability Partner receives the masked informational alert by default. The alert contains only information permitted by provisioning and masking, states that the charge **would** exceed the category rather than asserting a final overage (INV-69-23), and remains subject to the final CBD-12 consent and notification rules. A pending invitation or a Partner without provisioning for the category receives nothing.
* Evidence: INV-69-25; specification §4, §12.2.

### ALT-05 — Primary Owner mutes informational alerts to the Accountability Partner without affecting firm alerts

* Input: the same active and provisioned Accountability Partner relationship as ALT-04. The Primary Owner mutes informational alerts to the Accountability Partner. A new pending charge then triggers an informational warning, and separately a settled transaction creates a firm overspending alert.
* Expected: after the mute, the Accountability Partner does not receive the new informational warning. The firm overspending alert is still delivered, unaffected by the mute. The mute action is recorded with the actor and timestamp. An attempt by a Collaborator, or by the Accountability Partner themself, to perform the same mute is denied and recorded.
* Evidence: INV-69-25; specification §4, §12.2, §13.

### ALT-06 — Provisioned Viewer receives a scoped firm alert but never an informational one

* Input: a Viewer is explicitly provisioned to see one category's settled activity and audit history (per §4's scoped-visibility pattern). Settled spending in that category later exceeds its remaining budget, producing a firm overspending alert; separately, a pending charge in the same category would exceed the budget, producing an informational warning.
* Expected: the Viewer receives the firm overspending alert, because it reports a fact about data already provisioned to them. The Viewer never receives the informational warning, regardless of provisioning, because they hold no permission to act on still-changing pending activity (§4).
* Evidence: INV-69-24; specification §4, §12.2.

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
* Evidence: EC-69-19; CBD-68 §§14–16.

### CAL-04 — Duplicate anchor and skipped payday

* Input: a business-day adjustment collapses two separate anchor occurrences onto the same calendar date. Separately, a user applies **Skip occurrence** to an expected anchor paycheck and later proposes an explicit CBD-67 schedule change that removes a future boundary.
* Expected: the collapsed anchor occurrences produce exactly one boundary while retaining separate event identities. **Skip occurrence changes the income projection only and leaves every canonical boundary unchanged.** The future boundary moves or disappears only after the separate schedule change is previewed and confirmed under CBD-67/CBD-68 rules. Transaction activity never infers or moves a boundary.
* Evidence: EC-69-20; CBD-68 Approved v1.0 §§9–11, §16; PD-68-10, PD-68-15. This fixture was re-verified against the approved boundary rules on August 13, 2026; RF-69-01 is closed.

## 14. Coverage still to refine

* CAL-04 was re-verified against CBD-68 Approved v1.0 on August 13, 2026 (RF-69-01 closed; see the traceability record).
* Automatic-match confidence-scoring fixtures (exact thresholds an implementation would use to distinguish PEND-03 from PEND-04 automatically) are deferred to implementation scope; see FF-007 in the governing specification §18.
* Export file-format-specific fixtures are deferred; see FF-008 in the governing specification §18.
* Role-specific alert-eligibility fixtures now exist (ALT-04, ALT-05, ALT-06); further role-specific fixtures outside alerts and overrides (for example, an Accountability Partner viewing but not acting on a Duplicate-review state) may still be added once CBD-12 publishes its role model. All current fixtures use the CBD-67-derived placeholder role set.


