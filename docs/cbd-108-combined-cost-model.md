# CBD-108 — Combined Cost Model

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** The ticket asks for a *"combined low/base/high monthly and annual cost model"*. **It cannot be produced as a figure**, because no price was retrieved in three of the six categories and cost rule `CR4` forbids recording an unknown price as zero. **Category E is priced and category N is partly priced**, by the CBD-108 retrieval pass. §2 gives the reason, §3–§4 give what can be produced — a complete demand side, an empty price side, and the exact retrieval list that would close it. Producing an estimated total would be the specific failure this model exists to prevent. |
| Document version | 0.31 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.31; Cross-Category Coherence Review v0.31; Carried Item Disposition Register v0.31; Acceptance Criteria Traceability v0.31; Evidence Retrieval Pass v0.31 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `471f0de` |
| Last updated | August 29, 2026 |

## 1. What was asked for, and what is available

CBD-108's third deliverable is a *"combined low/base/high monthly and annual cost
model"*, and its fifth acceptance criterion requires explicit cost warning and
stop thresholds.

**Neither is available as a number, and the reason is recorded upstream rather
than discovered here.**

A cost model has two sides. The demand side — how much CoBudget will consume —
is **complete, approved, and stated at all three scenarios** in the CBD-102
demand model. The price side — what each candidate charges for that consumption
— is **`UNKNOWN` in three of six categories**.

Multiplying a complete quantity by an unknown rate does not produce an estimate.
It produces a number with no evidence record behind it, in a document whose only
purpose is to make cost comparable.

## 2. Why there are no totals

Three approved rules converge, and none of them is discretionary.

* **Cost rule `CR4`** — *"An unknown price is recorded as unknown, not as zero. A
  figure that could not be obtained is marked and listed in the record's open
  questions. **A missing line item must never silently improve a total.**"*
* **Evidence register §3.2** — a cost figure requires Documented-or-stronger
  evidence, and *"an Asserted price is recorded as unknown"*.
* **`OI-102-017`** — no budget ceiling exists. No approved source sets one, so
  cost cannot exclude a provider even once it is known.

CBD-103 §6.1 already applied this reasoning to a single category and reached the
same conclusion: *"Producing estimates would therefore create figures with no
evidence record behind them, in a document whose purpose is to make cost
comparable."* This document applies it to all six.

**Three categories are different.** CBD-104 retrieved identity prices, and §6.6 states
them carefully: at Base demand, **C2 `$0.00 + unknowns`, C3 `$0.00 + unknowns`,
C4 `≥ $35.00/month`**. Two of those three totals depend on unresolved tier
questions, and the third carries the sharpest cliff in the set — `OQ-104-008`,
which could move C4 to an unbounded contact-sales Enterprise tier. **They are a
starting position, not a settled comparison** (`OI-104-013`).

**Category E was priced by this package on August 29, 2026** — see the evidence
retrieval pass §4.2, on records `EV-102-212`–`215`. At Base, **C2 `$0.04`, C3
`$0.06 + data`, C5 `$15.00`** per month. That pass also **falsified** CBD-106
§5.1's hypothesis that Base volume sits inside every candidate's included
allowance: it sits inside none of the three.

**Category N was partly priced on the same day** — retrieval pass §4.7, records
`EV-102-227`–`228`. At Base the **recurring floor is $2.50/month for C3 on
10DLC and $11.00/month for C2**, against roughly $0.60 of traffic, plus a
one-time registration cost of $44 and $67 respectively. C2's per-segment rate
was not obtainable. **`OI-130-021`'s claim that the A2P floor is not negotiable
downward by low volume is now a measured 85–96% of the bill.**

## 3. The demand side, which is complete

Every figure below is approved, sourced, and stated at all three scenarios. It
is the half of the model that does not depend on any provider.

| Category | Primary billable unit | Low | Base | High | Source |
| --- | --- | --- | --- | --- | --- |
| **H** — Hosting | API requests / month | 3,700 | 15,600 | 104,000 | `DM-102-024` |
| **H** — Hosting | Background jobs / month | 2,880 | 29,280 | 315,000 | `DM-102-021` |
| **H** — Hosting | Log and telemetry ingest, GB / month | 0.2 | 1.0 | 8.0 | `DM-102-032` |
| **I** — Identity | Monthly active users | 7 | 30 | 120 | `DM-102-005 × DM-102-008` |
| **D** — PostgreSQL | Database size, year 1, GB | 0.1 | 0.4 | 4.1 | `DM-102-030` |
| **E** — Email | Peak monthly messages | 40 | 250 | 1,600 | `DM-102-039` |
| **F** — Financial connectivity | Provider connections | 8 | 61 | 375 | `DM-102-010` |
| **F** — Financial connectivity | Connected accounts | 12 | 135 | 1,125 | `DM-102-012` |
| **F** — Financial connectivity | Provider webhooks / month | 480 | 5,490 | 67,500 | `DM-102-017` |
| **N** — Push | Peak monthly messages | 20 | 200 | 1,400 | `DM-102-046` |
| **N** — SMS | Peak monthly messages | 5 | 60 | 500 | `DM-102-047` |

**Category F carries two candidate billable units, not one.** CBD-107 §2.1
records that some candidates meter per *account* and others per *connection* — a
difference of more than 2× at Base and 3× at High. Until the unit is known per
candidate, the same demand produces two different bills, and this is the one
category where the metering question is as consequential as the rate.

## 4. The price side, which is empty

| Category | Prices retrieved? | Position |
| --- | --- | --- |
| **H** — Hosting | **Partly** — August 29, 2026 | **`CT-102-005` is priced for two of three.** C3 **$29.00/month** Developer support, the first `CR0`-forced price in the category, and not optional (`EV-102-265`); C2 **$0.00** unless a gate is found to force it off free Basic, its entry paid tier being $29 (`EV-102-264`); **C1 not retrieved across four URLs** (`EV-102-266`), and subordinate to `OQ-103-007` in any case. Five of seven line items remain `UNKNOWN`. Retrieval pass §4.40 |
| **I** — Identity | **Partially** | The only category with figures. Two of three totals carry unresolved tier risk — CBD-104 §6.6 |
| **D** — PostgreSQL | **No**, but the floor is narrowed | `CT-102-006` still `UNKNOWN × 0.4 GB Base`. **The tier to price is now identified for C3**: `EV-102-231` records that Azure's cheapest tier is excluded from production support, so `CR0` is plausibly General Purpose at 2 vCores / 8 GiB rather than Burstable — pending `OQ-108-010` |
| **E** — Email | **Yes** — August 29, 2026 | Retrieved by this package: `EV-102-212`–`215`. C2 `$0.04`, C3 `$0.06 + data`, C5 `$15.00` at Base. C3's rate carries the vendor's own *"illustrative purposes"* disclaimer and is held at Low confidence |
| **F** — Financial connectivity | **No** | `OQ-107-020` records that this category **requires provider contact** — reading will not close it |
| **N** — Push and SMS | **Partly** — August 29, 2026 | Floors and registration fees retrieved for both candidates (`EV-102-227`–`228`); **C2's per-segment rate was not obtainable** and carrier fees are unquantified for it (`OQ-108-008`) |

**A combined total therefore has three known-ish terms out of six**, and three
`UNKNOWN`. There is still no honest way to present that as a low/base/high
range — but the position has moved for the first time, and §7's list is one item
shorter.

### 4.1 The price side is blocked asymmetrically, not uniformly — added at v0.31

Retrieval attempts across tranches 28 and 29 did not fail evenly. **AWS list prices have retrieved on every attempt.** **Google's have failed six times**, across support tiers (four URLs, `EV-102-266`) and Cloud KMS (`EV-102-268`, where the documentation domain redirects to the marketing domain, so the two routes are one). **Azure's render structure but never figures** — Key Vault shows *"$- per key per month"* (`EV-102-267`) exactly as Communication Services showed *"$-/Email sent"* (`EV-102-215`).

**This changes what completing §4 requires.** It is not one more retrieval pass. For C1 and C3 the remaining route is a signed-in pricing calculator or a quote (`OQ-108-050`), which no amount of public reading substitutes for. It also means **a comparison drawn today would favour C2 by legibility rather than by price**, which `OI-108-037` records so the cost model is not read that way. Retrieval pass §4.41.

## 5. What is known without prices

Three structural facts are established, and they are more useful than a
speculative total would be.

**The comparison will be decided by floors, not by usage.** Demand model §9.1 is
unambiguous: *"At every scenario including High, Private MVP sits below the entry
tier of essentially every managed provider."* Base is 15,600 API requests and
29,280 background jobs against 1.0 GB of log ingest. At this scale a per-unit
rate comparison compares the least significant term, and the entry tier,
minimum commitment, or seat floor is what will actually be paid.

**The High scenario is not where the risk is.** CBD-103 §6.2 records the
inversion: High is headroom rather than a forecast, and a tenfold move in
database size — 0.4 GB to 4.1 GB — stays inside most entry tiers. **The cliffs
are tier and feature boundaries, not volume.**

**Cost cannot exclude a provider.** `OI-102-017` again. Cost is recorded and
compared; it does not select and it does not disqualify. `CR3` states the
positive form: cost never overrides a gate.

### 5.1 The cliffs, which are the real cost question

| Cliff | Category | Consequence |
| --- | --- | --- |
| **`OQ-104-008`** — whether `HG-102-031` needs Auth0 Enterprise | I | **Unbounded.** Moves C4 from `$35/month` to contact-sales. The sharpest in the set |
| ~~**`OQ-103-019`**~~ **Answered** — PIM requires **Entra ID P2 or ID Governance**, and is on neither Free nor P1 (`EV-102-229`) | H and I | **The cliff is real and its size is unknown.** If `HG-102-005` is satisfied for C3 through PIM, `CR0` includes paid Entra seats and C3's `$0.00` identity figure does not hold. `OQ-108-009` settles whether PIM is required and what a seat costs |
| **`OQ-103-016`** — whether any candidate's cheapest gate-clearing tier caps seats at one | H | Converts to an `HG-102-006` failure if so, per `OI-102-015` — a cost question that becomes a gate question |
| **Paid support plans** | All | `OI-103-018`'s resolution notes a paid AWS support plan as a possible `CR0` driver; `OQ-107-022` and `OQ-130-016` ask what support tiers cost and what support staff can see |
| **Minimum commitments** | F | `OI-107-020` records this as the category most likely to carry one, and a contract term with it |
| **A2P registration floor** | N | `OI-130-021` records this as the category least able to be constrained by a ceiling — the floor is not negotiable downward by low volume |

**Every cliff above is a retrieval or a contact, not an observation.** They can
be closed independently of the route-A pass and in parallel with it.

## 6. Annualization

Stated so the rule is fixed before figures exist: **annual = monthly × 12**, with
no discount assumed. Committed-use and annual-prepay discounts are real in this
market and would reduce the figure, but assuming one before a term is negotiated
would understate the comparison in favour of whichever provider happens to
publish the deepest commitment discount. Per `CR4`, an unconfirmed discount is
recorded as unknown rather than applied.

## 7. What would close this

In the order that produces the most per unit of effort:

1. **The `CR0` gate-clearing tier and its published price, for each candidate in
   hosting, database, email and SMS.** One pricing page per candidate. This
   is the bulk of the model and it is ordinary desk work.
2. **`OQ-104-008`** — the remaining tier question whose answer moves figures by
   more than the rates do. ~~`OQ-103-019`~~ was answered on August 29, 2026, and
   replaced by the narrower `OQ-108-009`.
3. ~~**`OQ-106-010`** — the included monthly allowance for each email
   candidate.~~ **Done, August 29, 2026.** One page per candidate, exactly as
   CBD-106 §5.1 predicted the effort would be. The hypothesis it tested turned
   out to be false for all three candidates — retrieval pass §4.1.
4. **`OQ-107-020`** — category F pricing, which **requires provider contact**,
   and which must also settle the per-account versus per-connection metering
   question from §3.
5. **A budget ceiling, or an explicit decision that none exists** —
   `OI-102-017`. Without it the warning and stop thresholds have nothing to be
   measured against, regardless of how complete the price side becomes.

Items 1–3 are desk retrievals and would move five of six categories from
`UNKNOWN` to a comparable figure. **The cost model is the least
evidence-blocked deliverable in CBD-108 and the one closest to being
completable** — and item 3 took a single sitting, which is evidence for that
claim rather than an assertion of it.

## 8. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-011 | **No combined total is produced, at any scenario.** The ticket's third deliverable is not met. | Deliberate. `CR4` forbids the alternative, and an estimated total in a comparison document is worse than no total. §7 is the route to producing one. |
| OI-108-012 | **The one category with figures cannot be generalized from.** Identity is cheap, retrievable, and floor-dominated; category F is none of those. | `OI-104-013` already records that its figures are a starting position. Nothing about the identity result predicts the shape of the aggregator bill. |
| OI-108-013 | **Cost thresholds cannot be set** — mirrors `OI-108-002` in the disposition register. | The blocker is `OI-102-017`, not retrieval. Even a complete price side would not produce a warning threshold without a ceiling to measure against. |
| OI-108-014 | **Category F's billable unit is not established per candidate**, and the two candidate units differ by more than 2× at Base. | Recorded so that any later comparison in this category states which unit each figure uses. Comparing a per-account price against a per-connection price is not a comparison. |
