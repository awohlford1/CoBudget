# CBD-108 — Evidence Retrieval Pass

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Registers evidence obtained by CBD-108's retrieval pass against the `D3` class of the carried-item register — items whose disposition is that a document exists and has not been read. **Tranche 1 of an incomplete pass**: it closes `OQ-106-010`, partially answers `OQ-104-016`, and **falsifies a hypothesis CBD-106 §5.1 recorded as likely**. It performs no observation, contacts no provider, and moves no gate outcome or verdict. |
| Document version | 0.3 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.3; Cross-Category Coherence Review v0.3; Combined Cost Model v0.3; Carried Item Disposition Register v0.3; Acceptance Criteria Traceability v0.3 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `ec62d9a` |
| Last updated | August 29, 2026 |

## 1. Scope and evidence block

The carried-item register puts **91 items** in class `D3` — a document exists and
has not been read — and records that this is the cheapest work in the CBD-15
corpus and that nothing is driving it (`OI-108-017`). This document is where
CBD-108 discharges them.

**Evidence block: `EV-102-212` onward.** CBD-103's cross-category pass reserved
through `EV-102-211` (evaluation §8.1), and no number above that is claimed
anywhere in the corpus. `212`–`241` is reserved for this pass; `212`–`217` are
registered below and the remainder are unused.

**This tranche covers two questions**, chosen because each is answerable from
published pages alone and each has a consequence larger than its size:

* `OQ-106-010` — the `CT-102-*` price lines for the three email candidates,
  **and specifically the included monthly allowance**, which CBD-106 §5.1
  advanced a checkable hypothesis about.
* `OQ-104-016` — whether Conditional Access sits inside Microsoft Entra External
  ID's free 50,000-MAU core, on which CBD-104 §6.6's `$0.00` figure for C3
  explicitly depends.

## 2. What this pass does not do

* **It changes no gate outcome and no verdict.** Every category's disposition in
  the register companion is unchanged, and the route-A observation pass remains
  unperformed.
* **It selects nothing.** `CR3` — cost never overrides a gate — and every
  candidate remains `ELIGIBLE-PENDING-EVIDENCE`.
* **It contacts no provider and creates no account.** Every record below comes
  from a page published to the open web.
* **It does not amend the source packages.** CBD-106's and CBD-104's own texts
  still describe these questions as open. Propagation to the sibling packages
  follows once the pass is complete, on the pattern CBD-103's cross-category
  pass used.

## 3. Evidence records

Fields follow evidence register §2. Retrieval date is **August 29, 2026** for
every record. Class is **Documented** throughout — these are vendor-published
pages about product behaviour and price — with confidence per §3.1, which
permits lowering below the class but never raising.

### EV-102-212 — Amazon SES outbound send price and allowance

| Field | Content |
| --- | --- |
| Claim | `CT-102-006`, `CT-102-008` for C2, category **E** (`OQ-106-010`) |
| Provider / category | Amazon SES (C2) / E |
| Source | *"Amazon SES pricing"*, `https://aws.amazon.com/ses/pricing/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"$0.16 per 1,000 emails"* for 0–10M emails/month on the **Essentials** plan. Attachments: *"$0.12 per gigabyte (GB) of data in the attachments you send"*. Plans offered are **Essentials, Pro, Enterprise**, plus *"À la carte pricing"* where *"you pay only for what you use with no minimum fees or mandatory service usage"*. |
| **Included allowance** | **None that is permanent.** The page offers *"up to $200 in AWS Free Tier credits"* to **new** AWS customers, usable *"within 12 months of your account creation date"*, with the *"free plan… available for 6 months after account creation"*. |
| Limitations | Establishes list price for the Essentials plan only. Does **not** establish which plan clears the `ED-106-*` gate set, so `CR0` tier selection is not settled by this record. Does not establish whether a legacy origin-based free tier still applies to sending from within AWS. Regional price variation was not checked. |
| Re-verify by | February 28, 2027 (Documented, 6 months) |

### EV-102-213 — Postmark plan floor, allowance, and overage

| Field | Content |
| --- | --- |
| Claim | `CT-102-006`, `CT-102-008` for C5, category **E** (`OQ-106-010`) |
| Provider / category | Postmark (C5) / E |
| Source | *"Postmark Pricing and Free Trial"*, `https://postmarkapp.com/pricing` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Free** plan: *"100 emails/month"* with *"No overages allowed in this plan"*. **Basic**: *"$15.00/mo"* including *"10,000 emails/month"*, overage *"Extra emails @ $1.80 / 1,000"*, *"Up to 15 streams"*. Pro overage *"$1.30 / 1,000"*; Platform *"$1.20 / 1,000"* with *"Unlimited"* streams. Dedicated IPs *"Starts at $50/month per IP"* and are *"Only available on Pro plans or higher"*. |
| **Included allowance** | **100 emails/month on the Free plan, with overages forbidden.** |
| Limitations | Does not establish which plan clears the `ED-106-*` gate set. The stream counts are recorded because `ED-106-003` requires one stream per purpose tier; Basic's 15 is not shown to be insufficient, but the requirement was not counted against it here. |
| Re-verify by | February 28, 2027 |

### EV-102-214 — Azure Communication Services Email rates, as documented

| Field | Content |
| --- | --- |
| Claim | `CT-102-006` for C3, category **E** (`OQ-106-010`) |
| Provider / category | Azure Communication Services Email (C3) / E |
| Source | *"Email pricing - An Azure Communication Services concept document \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/communication-services/concepts/email-pricing` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / **Low — lowered per §3.1**, on the page's own disclaimer below |
| Content | Email Send **`0.00025/email`**; Data Transferred **`$0.00012/MB`**. Worked example: *"3000 Emails x 0.00025 = $0.75 USD"* and *"3000 MB x 0.00012 = $0.36 USD"*. Basis: *"The price is based on number of messages sent to the recipient and amount of data transferred to each recipient which includes headers, message content (including text and images), and attachments."* |
| Limitations | **The page states of its own figures: *"The prices in the following examples are for illustrative purposes and may not reflect the latest Azure pricing."*** That is why confidence is Low against a Documented class. The authoritative pricing page does not render rates — `EV-102-215`. No free monthly allowance for email is stated anywhere retrieved. The document carries an `ms.date` of 2023-03-31 with a later edit stamp. |
| Re-verify by | February 28, 2027 |

### EV-102-215 — Azure's authoritative pricing page does not publish the email rates

| Field | Content |
| --- | --- |
| Claim | `CT-102-006` for C3, category **E** — **negative record** (`OQ-106-010`) |
| Provider / category | Azure Communication Services (C3) / E |
| Source | *"Azure Communication Services pricing \| Microsoft Azure"*, `https://azure.microsoft.com/en-us/pricing/details/communication-services/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium — the *absence* is what is documented |
| Content | The Email row renders as **`$-/Email sent`** and **`$-/MB transferred`**. The page states *"Prices are estimates only"* and directs the reader to sign in to the pricing calculator or contact a sales specialist. |
| Limitations | Establishes only that the rates are not obtainable from this page **without signing in**. It does not establish that they are unpublished, and it does not contradict `EV-102-214`. |
| Re-verify by | February 28, 2027 |
| Why registered | So the page is not re-fetched and misread as evidence of a zero price. This follows the precedent of the Microsoft 365 retention page registered as a negative record in the CBD-103 pass. |

### EV-102-216 — Microsoft Entra External ID free monthly-active-user allowance

| Field | Content |
| --- | --- |
| Claim | `CT-102-008` for C3, category **I** (`OQ-104-016`) |
| Provider / category | Microsoft Entra External ID (C3) / I |
| Source | *"Microsoft Entra plans and pricing"*, `https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"The External ID core features are free for your first 50,000 monthly active users."* |
| Limitations | **The page does not enumerate what "core features" contains**, and states no per-MAU rate beyond the allowance, directing the reader to a separate pricing link. It therefore confirms the allowance quantity but **does not by itself place Conditional Access inside it** — which is exactly what `OQ-104-016` asks. |
| Re-verify by | February 28, 2027 |

### EV-102-217 — Conditional Access in external tenants: available, with a reduced capability set

| Field | Content |
| --- | --- |
| Claim | `HG-102-029`-adjacent capability and `CT-102-008` for C3, category **I** (`OQ-104-016`) |
| Provider / category | Microsoft Entra External ID (C3) / I |
| Source | *"External Tenant Features - Microsoft Entra External ID \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/entra/external-id/customers/concept-supported-features-customers` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | The page carries a **Conditional Access** comparison table for external tenants. Available there: assignments limited to *"Include all users, and exclude users and groups"*; conditions limited to **Device platforms** and **Locations**; grant controls **Block access**, **Require multifactor authentication**, **Require password reset**; session controls *"Sign-in frequency"* and *"Persistent browser session"*. |
| **Not available** | Sign-in risk and user risk conditions are absent from the external-tenant column, and **Microsoft Entra ID Protection** is listed as *"Not available."* Terms-of-use Conditional Access policies are *"Not available."* |
| Limitations | **The page states no price and does not say whether Conditional Access is a "core" feature.** It also carries the note: *"During the preview, features or capabilities that require a premium license are unavailable in external tenants."* That sentence establishes that premium-licensed capabilities are **absent** rather than **chargeable** in external tenants, which is suggestive but is not a statement that Conditional Access is free. |
| Re-verify by | February 28, 2027 |

## 4. What the records establish

### 4.1 `OQ-106-010` is closed, and CBD-106 §5.1's hypothesis is falsified

CBD-106 §5.1 advanced a hypothesis it described as *checkable in one page per
candidate*: that Base volume sits inside every candidate's included allowance.
Base is **250 messages per month** (`DM-102-039`).

| Candidate | Included allowance | Does Base fit inside it? |
| --- | --- | --- |
| **C2 Amazon SES** | None that is permanent | **No** — billed from the first message |
| **C3 Azure ACS Email** | None stated anywhere retrieved | **No** |
| **C5 Postmark** | 100/month on Free, **overages forbidden** | **No** — 250 exceeds 100, and the plan cannot absorb the excess |

**The hypothesis is false for all three, and for a different reason in each
case.** Two candidates have no allowance at all; the third has one too small to
hold Base and structurally unable to overflow.

Its practical consequence is the opposite of the hypothesis's, and mild: because
the two hyperscalers meter from the first message at very low rates, the absence
of an allowance costs almost nothing. The candidate **with** an allowance is the
expensive one, because falling out of it means buying a plan.

### 4.2 The first real cost separation in the CBD-15 set

| Candidate | Base, 250/month | High, 1,600/month | Annual at Base |
| --- | --- | --- | --- |
| **C2 Amazon SES** | **$0.04** | $0.26 | **$0.48** |
| **C3 Azure ACS Email** | **$0.06 + data** | $0.40 + data | **$0.75 + data** |
| **C5 Postmark** | **$15.00** | $15.00 | **$180.00** |

Arithmetic: C2 `250 × $0.16/1,000`; C3 `250 × $0.00025` plus an unresolved data
term; C5 the **Basic** plan floor, because Free holds 100 and forbids overages.

Three things this does and does not mean.

**It is floor-dominated, exactly as predicted.** CBD-103 §6.2 said the
comparison would be decided by floors rather than usage, and demand model §9.1
said Private MVP sits below the entry tier of essentially every provider. Both
hold: C5's figure is entirely its plan floor and does not move between Base and
High, and the per-message rates are the least significant term.

**It is nonetheless a ~250× spread**, and the first in the corpus. CBD-104 §6.6
concluded that identity cost is *"close to a rounding error"*; that conclusion
does not transfer to email, where the standalone candidate costs two orders of
magnitude more than either hyperscaler at Private MVP volume.

**It selects nothing.** `CR3` is explicit that cost never overrides a gate, all
three candidates are `ELIGIBLE-PENDING-EVIDENCE`, and `OI-102-017` records that
no budget ceiling exists, so $180/year cannot exclude C5. What the figure does
is put a price on the standalone option that §3 of the coherence review shows a
C1 hosting selection would **force**.

### 4.3 `OQ-104-016` is partially answered, and the residue is precise

**Established:** the free allowance is *"your first 50,000 monthly active
users"* (`EV-102-216`), against a Base of 30 MAU and a High of 120. Conditional
Access exists in external tenants with a documented and materially reduced
capability set (`EV-102-217`).

**Not established:** that Conditional Access is inside *"core features"*. No
retrieved page enumerates "core", and none prices Conditional Access for
external tenants. The strongest available inference is the preview note —
premium-licensed capabilities are **unavailable** in external tenants rather
than sold — which suggests there is nothing to charge for, but is not a
statement that the feature is free.

**CBD-104 §6.6's `$0.00` for C3 therefore still rests on an unconfirmed
premise**, and this pass narrows rather than removes it. `OQ-108-001` carries
the residue.

**A second finding, unasked for.** `EV-102-217` records that sign-in-risk and
user-risk conditions and Microsoft Entra ID Protection are **not available** in
external tenants. That is a capability fact rather than a price fact, and no
`HG-102-*` gate in the approved catalog demands risk-based conditions — but it
belongs on the record before any later requirement assumes them.

## 5. Open questions raised by this pass

| ID | Question | Bears on |
| --- | --- | --- |
| OQ-108-001 | Does *"core features"* in the Entra External ID allowance include Conditional Access, and what is the per-MAU rate beyond 50,000? Neither is stated on any page retrieved. | `OQ-104-016`; CBD-104 §6.6's `$0.00` figure for C3 |
| OQ-108-002 | Which plan clears the `ED-106-*` gate set for each email candidate? `CR0` prices the **cheapest gate-clearing tier**, and these records price the cheapest tier of any kind. For C2 that is Essentials; whether Essentials clears the gates is unestablished. | `CR0`; `OQ-106-010`'s remainder |
| OQ-108-003 | What is CoBudget's average outbound message size? C3 meters data transferred at `$0.00012/MB`, and no approved source establishes a message size, so the C3 figure carries an unresolved term. | `CT-102-006` for C3, category E |
| OQ-108-004 | Do the Azure Communication Services email rates in the Learn document match the rates the signed-in pricing page returns? The Learn page disclaims its own figures and the pricing page renders placeholders. | `EV-102-214`, `EV-102-215` |

## 6. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-019 | **This is tranche 1 of an incomplete pass.** Six records against 91 `D3` items; two questions touched, one closed. | The pass is worth continuing on these terms — every record here came from a public page in a single sitting. `OI-108-017`'s point stands: the constraint is that nothing is driving the work, not that the work is hard. |
| OI-108-020 | **The source packages are not amended.** CBD-106 §5.1 still records its hypothesis as untested and `OQ-106-010` as open; CBD-104 §6.6 still rests C3's `$0.00` on `OQ-104-016`. | Deliberate. Propagating into two approved, Confluence-published packages mid-pass would mean amending them again at the end. The record of what is now known lives here until the pass closes, and this document is cited by the disposition register so the position is not lost. |
| OI-108-021 | **`EV-102-214` is the first cost record in the corpus whose own source disclaims it.** Register §3.2 requires Documented-or-stronger for a cost figure, and this is Documented — but the page says its figures *"may not reflect the latest Azure pricing."* | Recorded at Low confidence per §3.1 rather than excluded, because a disclaimed figure from the vendor is still better than the `UNKNOWN` it replaces, and the disclaimer is quoted so no reader mistakes it for a firm price. If a firm C3 email rate is needed, `OQ-108-004` is the route. |
