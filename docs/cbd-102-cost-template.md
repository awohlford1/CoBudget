# CBD-102 — Provider Cost Template

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 18, 2026. The structure a CBD-103–107 and CBD-130 cost comparison must be recorded in. It contains no prices; providers are not selected here. **v1.1 adds `CT-102-022`, a line for a third-party licence a gate requires, by Product Owner decision of September 2, 2026. It closes a `CR4` breach occurring through the template itself — CBD-108 `OQ-108-055`.** |
| Document version | 1.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 22 line items, the CR0–CR7 rules, the cost record structure, and the per-category billable units. It fixes no price, approves no tier, and does not close the open items in §8 — including the recorded consequence of `OI-102-017`, that no budget ceiling exists. |
| Jira | [CBD-102](https://cobudget.atlassian.net/browse/CBD-102) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Hard-Gate Catalog v1.0; Evaluation Rubric v1.0; Demand Model v1.0; Evidence Register and Exception Rules v1.0 |
| Confluence page | [CBD-102 — Provider Cost Template](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/9469982) |
| Repository baseline | `fd36443` |
| Last updated | September 2, 2026 |

## 1. Purpose

This template fixes **how** a provider's cost is recorded, so that two providers
can be compared without one of them looking cheap for a reason that will not
survive the year.

It carries no prices. CBD-103 through CBD-107 fill it in per candidate, and the
evidence register governs how each figure is sourced and dated.

The demand model established the fact that shapes this template: at every
scenario including High, Private MVP sits below the entry tier of essentially
every managed provider. **Cost is dominated by floors, not usage.** A template
organized around per-unit rates would compare the least significant term.

## 2. The rule that matters most

**CR0 — Price the cheapest tier that clears every hard gate, not the cheapest
tier.**

This is the single largest source of misleading provider cost comparisons, and
it binds the three CBD-102 documents together. If audit-log export
(`HG-102-009`), private networking (`HG-102-005` and the isolation `WR-102-005`
scores), region pinning (`HG-102-011`), isolated restore (`HG-102-041`), or
tracking suppression (`HG-102-048`) is available only on a higher tier, then
**that** higher tier is the provider's price. A cheaper tier that fails a gate
is not a cheaper option; it is not an option.

Every cost record therefore names the tier priced and the gates that forced it.
A record that does not name its tier is incomplete.

## 3. What the record must separate, and why

CBD-102's acceptance criteria require cost assumptions to distinguish credits,
introductory pricing, minimums, variable usage, overages, taxes, and support.
Each exists because each distorts a comparison in a different direction:

| Term | Distortion it creates if not separated |
| --- | --- |
| Credits | A provider looks free for as long as the credit lasts, then costs full price. Cash-flow relief is not a lower price. |
| Introductory pricing | A discount that expires on a date makes the expensive option look cheapest during exactly the window in which the decision is made. |
| Minimums | The dominant term at CoBudget's scale. A provider with a low per-unit rate and a high floor is expensive here, and per-unit comparison hides that entirely. |
| Variable usage | The term everyone compares and the one that matters least at Private MVP volume. |
| Overages | Invisible until a threshold is crossed, then discontinuous. Determines what a High-scenario spike actually costs. |
| Taxes | Vary by jurisdiction and can move a total by a material percentage. Quoted prices routinely exclude them. |
| Support | Frequently a percentage of spend or a separate plan floor. `WR-102-019` scores support quality; this records what it costs. |

## 4. Cost record structure

One record per provider per category. Line items are stable citation keys.

### 4.1 Header

| Field | Content |
| --- | --- |
| Provider and category | Name, and one of H / I / D / E / F / N |
| **Tier priced** | The exact plan, and **the gates that forced it** under CR0 |
| Eligibility verdict | Carried from the gate evaluation: `ELIGIBLE`, `ELIGIBLE-PENDING-EVIDENCE`, `CONDITIONAL`, or `INELIGIBLE` |
| Currency and billing region | As quoted |
| Quote date and source | Per the evidence register |

### 4.2 A — Recurring floor, charged regardless of usage

| ID | Line item | Notes |
| --- | --- | --- |
| CT-102-001 | Plan or tier base fee | For the tier named under CR0 |
| CT-102-002 | Platform, account, or project fee | Charged separately from the plan on some providers |
| CT-102-003 | Per-seat cost | **Two seats**, not one: the operator, plus the named second principal from catalog §2.5.1 who holds key-recovery custody and restore approval. Record the per-seat rate as well as the total, and note where a provider charges full price for a seat that only approves |
| CT-102-004 | Minimum committed spend | Where a contract sets a floor above the plan fee |
| CT-102-005 | Support plan fee | Flat, or a percentage of spend — state which |
| CT-102-022 | Third-party licence required by a gate | Where a gate's pass test is reachable only through a partner or third-party product, that product's licence cost. **Numbered out of sequence deliberately**, to leave `CT-102-006`—`021` untouched; it belongs to **section A** and is therefore inside `CT-102-017`. Added September 2, 2026 — see the note below |

**Why `CT-102-022` exists — Product Owner decision, September 2, 2026.** `CR4` holds that a
missing line item must never silently improve a total. CBD-108 `OQ-108-055` found that
breach occurring **through this template**: where a gate is clearing only because a
third-party product supplies the capability — CBD-108 `EV-102-008` records AWS shipping
no native just-in-time elevation and validating partner products instead — that
licence is not a provider charge and had no line. It was therefore absent from
`CT-102-017`, the comparison figure, making a candidate that must buy a product look
cheaper than one whose capability is native. **Record the cost whether or not it is
incurred**; where the gate is met natively, record zero.

### 4.3 B — Variable usage, metered against the demand model

| ID | Line item | Notes |
| --- | --- | --- |
| CT-102-006 | Primary billable unit: rate × Base quantity | Quantity from §5; this is the headline usage term |
| CT-102-007 | Secondary metered units | Egress, storage, log ingest, build minutes, per-request fees |
| CT-102-008 | Included allowance | What the floor already covers — subtract before charging usage |
| CT-102-009 | Overage rate beyond the allowance | Rate and the threshold at which it starts |

### 4.4 C — Time-limited reductions, never part of steady state

| ID | Line item | Notes |
| --- | --- | --- |
| CT-102-010 | Free-tier allowance | Whether it is permanent or trial, and what it excludes |
| CT-102-011 | Promotional or startup credits | Amount **and expiry date** |
| CT-102-012 | Introductory pricing | Discount, duration, and **the price it steps up to** |

### 4.5 D — Additive

| ID | Line item | Notes |
| --- | --- | --- |
| CT-102-013 | Taxes | Rate and whether quoted prices include it |
| CT-102-014 | Exit and data-return cost | Egress to retrieve data on termination. `WR-102-023`–`026` score portability; this records its cash cost |
| CT-102-015 | Currency and FX exposure | Where billing is not in the operating currency |

### 4.6 E — Derived figures

| ID | Figure | Definition |
| --- | --- | --- |
| CT-102-016 | Month-1 cost | Everything payable in the first month, credits and introductory pricing applied |
| CT-102-017 | **Steady-state monthly cost** | A + B + D at Base demand, with **section C excluded entirely**. This is the comparison figure |
| CT-102-018 | 12-month total | Includes section C for the period it actually applies |
| CT-102-019 | 36-month total | Beyond every credit and introductory window; shows the real cost of the choice |
| CT-102-020 | Steady-state cost at High demand | Headroom check. Reveals which term becomes discontinuous first |
| CT-102-021 | First overage threshold | The demand level at which the tier stops being sufficient |

## 5. Per-category billable units

Quantities come directly from the demand model §9. Fill `CT-102-006` with the
provider's rate for its own unit against these.

| Cat | Primary billable unit | Base quantity | High quantity | Demand source | Common secondary units |
| --- | --- | --- | --- | --- | --- |
| **H** | API requests/month | 15,600 | 104,000 | `DM-102-024` | Compute hours, memory-GB-hours, egress GB |
| **H** | Background jobs/month | 29,280 | 315,000 | `DM-102-021` | Worker hours, queue operations |
| **H** | Log ingest GB/month | 1.0 | 8.0 | `DM-102-032` | Retention days, indexed volume |
| **I** | Monthly active users | 30 | 120 | `DM-102-005 × DM-102-008` | MFA/SMS per-message, per-tenant, per-connection |
| **D** | Database GB | 0.4 | 4.1 | `DM-102-030` | Instance size, IOPS, backup GB, PITR window |
| **E** | Messages/month, peak | 250 | 1,600 | `DM-102-039` | Dedicated IP, domain authentication, validation |
| **F** | Connections/month | 61 | 375 | `DM-102-010` | Per-account, per-API-product, per-request |
| **N** | Push messages/month, peak | 200 | 1,400 | `DM-102-046` | Per-device registration, per-topic, platform fee |
| **N** | SMS **segments**/month, peak | 60 | 500 | `DM-102-047` at 1 segment/message, US only | Per-destination-country rate, sender ID or short-code rental, carrier surcharge |

### 5.1 Watch the unit mismatch

A provider's billing unit will often not match the demand model's. Financial
providers may meter per *account* (`DM-102-012`: Base 135, High 1,125) rather
than per *connection* (`DM-102-010`: Base 61, High 375) — a difference of more
than 2× at Base and 3× at High. Identity providers vary in what counts as
"active".

**Record the provider's own unit and its definition, then convert using an
explicitly stated demand row.** A conversion that is not written down is the
most likely place for a cost comparison to go quietly wrong.

SMS is the sharpest case. Billing is per *segment* and per destination country,
while `DM-102-047` counts messages. The Product Owner assumption of August 16,
2026 — **one segment per message, US destinations only** — makes the two equal
so a cost record can be produced now.

That assumption is provisional and **must be restated in every SMS cost
record**, not silently inherited. It breaks in two ways: a localized
`NT-92-001` body longer than the English one, and any non-Latin-script locale
falling back to UCS-2 encoding at 70 characters per segment instead of 160.
Either doubles the line. Adding a destination country adds a per-country rate
and may add sender-ID or short-code registration, which is a floor rather than a
per-message charge. `EG-91-006` owns the template text that settles this.

An SMS figure that does not state its assumed segments-per-message and
destination scope is not comparable between providers.

## 6. Rules that keep cost from distorting the decision

**CR1 — The comparison figure is `CT-102-017`, steady state.** Credits and
introductory pricing are excluded from it entirely. A provider that is free for
twelve months and expensive afterwards is an expensive provider with a cash-flow
benefit, and is recorded as exactly that.

**CR2 — Time-limited reductions are reported with their expiry date.** A credit
without a stated expiry is recorded as unknown under CR4, not as ongoing.

**CR3 — Cost never overrides a gate.** As with rubric rule R1, an `INELIGIBLE`
provider's cost is recorded for completeness and is not compared. Being cheapest
is not a route back into consideration, and a `CONDITIONAL` provider's cost
carries its compensating-control record wherever it is quoted.

**CR4 — An unknown price is recorded as unknown, not as zero.** A figure that
could not be obtained is marked and listed in the record's open questions. A
missing line item must never silently improve a total.

**CR5 — Base is the comparison; High is a headroom check.** `CT-102-020` and
`CT-102-021` answer "does this tier have room, and what breaks first?" They are
not a second comparison, and a provider is not penalized for a High figure it
would only reach after Private MVP has ended.

**CR6 — Operator time is scored, not priced.** Ongoing operational burden is
`WR-102-027`–`031` in the rubric. It is deliberately not converted to a cash
figure here, because doing so would both double-count it against the rubric and
invent an hourly rate no approved source supplies. A provider that is cheap in
cash and expensive in operator time shows that in its solo-operator subscore,
not in its cost record.

**CR7 — Quote every figure at the same demand scenario.** Mixing a Base-quantity
usage line with a High-quantity overage line produces a number that describes no
actual month.

## 7. Worked shape

```
Provider: <name>                          Category: D — managed PostgreSQL
Tier priced: <tier>       Forced by: HG-102-041 (isolated restore),
                                     HG-102-009 (staff access audit export)
Verdict: ELIGIBLE                         Quoted: USD, <region>, <date>

A  Recurring floor
   CT-102-001 plan base                          $ ---
   CT-102-002 platform fee                       $ ---
   CT-102-003 per-seat × 1                       $ ---   (rate $--- /seat)
   CT-102-005 support plan                       $ ---   (flat | % of spend)
B  Variable at Base (0.4 GB, DM-102-030)
   CT-102-006 storage                            $ ---
   CT-102-007 backup GB, IOPS                    $ ---
   CT-102-008 included allowance                (---)
   CT-102-009 overage rate                       $ --- per GB above ---
C  Time-limited  [EXCLUDED from CT-102-017]
   CT-102-011 credits          $ ---   expires <date>
   CT-102-012 intro pricing    --% for -- months, steps up to $ ---
D  Additive
   CT-102-013 tax --%                            $ ---
   CT-102-014 exit egress                        $ ---

E  CT-102-016 month 1                            $ ---
   CT-102-017 steady-state monthly               $ ---   <- comparison figure
   CT-102-018 12-month total                     $ ---
   CT-102-019 36-month total                     $ ---
   CT-102-020 steady state at High (4.1 GB)      $ ---
   CT-102-021 first overage threshold            --- GB

Unknown: <line items that could not be sourced>       [CR4]
```

## 8. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-102-014 | The template assumes a single operating currency and billing region. `CT-102-015` records FX exposure but no approved source fixes CoBudget's billing currency or jurisdiction. | Confirm before comparing providers that quote in different currencies. |
| OI-102-015 | **Resolved August 16, 2026.** Catalog §2.5.1 names a second principal holding key custody and restore approval, so `CT-102-003` is priced at two seats in every category. | Closed. Watch for providers that charge a full seat for an approval-only role, and for providers whose cheapest tier caps seats at one — that becomes an `HG-102-006` failure, not merely a cost line. |
| OI-102-016 | 36-month totals (`CT-102-019`) extend well beyond the Private MVP phase the demand model describes. | Use it to see past credit and introductory windows, not as a volume forecast. The demand model explicitly does not project growth. |
| OI-102-017 | **Decided August 16, 2026: no budget ceiling.** Cost is recorded and compared but cannot exclude a provider. | Closed as a decision, with a consequence worth stating plainly: CBD-103–107 can produce a fully evidenced, gate-clearing recommendation that turns out to be unaffordable, and there will be no documented basis for having ruled it out earlier. `CT-102-017` and `CT-102-019` are the figures to watch for that, and a ceiling can be introduced later if one becomes obvious. |
