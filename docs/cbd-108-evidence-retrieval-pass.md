# CBD-108 — Evidence Retrieval Pass

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Registers evidence obtained by CBD-108's retrieval pass against the `D3` class of the carried-item register — items whose disposition is that a document exists and has not been read. **Tranches 1 and 2 of an incomplete pass.** Tranche 1 closes `OQ-106-010`, partially answers `OQ-104-016`, and **falsifies a hypothesis CBD-106 §5.1 recorded as likely**. Tranche 2 works the DPA block and materially narrows `HG-102-013` — **the one gate whose outcome could move every candidate in every category at once** — without moving it, for a different reason per candidate. **Tranche 3 retries the retrieval tranche 2 named as decisive, and the answer removes a prospective `PASS` rather than producing one** — §4.6 records the correction explicitly. It performs no observation, contacts no provider, and moves no gate outcome or verdict. |
| Document version | 0.5 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.5; Cross-Category Coherence Review v0.5; Combined Cost Model v0.5; Carried Item Disposition Register v0.5; Acceptance Criteria Traceability v0.5 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `b52d569` |
| Last updated | August 29, 2026 |

## 1. Scope and evidence block

The carried-item register puts **91 items** in class `D3` — a document exists and
has not been read — and records that this is the cheapest work in the CBD-15
corpus and that nothing is driving it (`OI-108-017`). This document is where
CBD-108 discharges them.

**Evidence block: `EV-102-212` onward.** CBD-103's cross-category pass reserved
through `EV-102-211` (evaluation §8.1), and no number above that is claimed
anywhere in the corpus. `212`–`241` is reserved for this pass; `212`–`226` are
registered below and the remainder are unused.

**This tranche covers two questions**, chosen because each is answerable from
published pages alone and each has a consequence larger than its size:

* `OQ-106-010` — the `CT-102-*` price lines for the three email candidates,
  **and specifically the included monthly allowance**, which CBD-106 §5.1
  advanced a checkable hypothesis about.
* `OQ-104-016` — whether Conditional Access sits inside Microsoft Entra External
  ID's free 50,000-MAU core, on which CBD-104 §6.6's `$0.00` figure for C3
  explicitly depends.

**Tranche 2 works the DPA block** — `OQ-103-024`, `OQ-103-025`, `OQ-105-002` —
because `HG-102-013` is the single point of correlated failure in the CBD-15
set. Its four aggregator counterpart, `OQ-107-023`, is **not attempted here**:
`OI-102-023` establishes that NDA-bound material supports no finding, and the
aggregator agreements are not published.

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

### EV-102-218 — Google contractually bounds backup replication to the selected region's country

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **region element** for C1, category **X** (`OQ-103-025`) |
| Provider / category | Google Cloud (C1) / X |
| Source | *"Service Specific Terms \| Google Cloud"*, `https://cloud.google.com/terms/service-terms`, §1 **Data Location** |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium — lowered per §3.1 on the scope condition below |
| Content | *"For any Service listed at https://cloud.google.com/terms/data-residency, Customer may select a specific Region or Multi-Region as detailed in the Cloud Locations Page, and Google will store Customer Data for that Service at rest only within the selected Region or Multi-Region. Google may replicate that Customer Data within any other Region located within the country of the selected Region or within the country or countries of the selected Multi-Region (as applicable) for backup, reliability, debugging, support, maintenance, or security purposes."* |
| Limitations | **The commitment is conditional on the Service appearing on the data-residency list**, which `EV-102-219` records could not be retrieved. It therefore does not yet establish that CoBudget's evaluated C1 composition is covered. It bounds backup replication to the **country** of the selected Region, which is weaker than the Region itself — though sufficient for the single-United-States-region posture `OI-103-001` fixes. |
| Re-verify by | Contract term or amendment (Contractual, per §4) |

### EV-102-219 — The Google data-residency service list could not be read

| Field | Content |
| --- | --- |
| Claim | Scope condition on `EV-102-218` — **retrieval-failure record** |
| Provider / category | Google Cloud (C1) / X |
| Source | `https://cloud.google.com/terms/data-residency` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Absent / None |
| Content | The page was fetched and its content returned **truncated**, so the service list could not be read. Nothing about its contents is established either way. |
| Limitations | **This is a failure of retrieval, not a finding about Google.** It must not be read as evidence that the services are absent from the list. `OQ-108-005` carries the retry. |
| Re-verify by | Immediately — this is an unfinished retrieval, not evidence |

### EV-102-220 — The AWS Service Terms defer deletion timing and state no retention, region, or expiry

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` for C2, category **X** (`OQ-103-024`, `OQ-103-025`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"AWS Service Terms"*, `https://aws.amazon.com/service-terms/`, §1.15 |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium |
| Content | *"Following closure of your AWS account, we will delete Your Content in accordance with the technical documentation applicable to the Services."* No retention period in days appears, and no clause states the region or location in which customer content or backups are stored. |
| Limitations | **This is the Service Terms, not the Data Processing Addendum.** `EV-102-170` records that the DPA itself could not be parsed, and that document remains the one that decides this gate for C2. What this record establishes is that **a second contractual instrument was read and it defers rather than states** — narrowing where the answer could be, without establishing provider silence. |
| Re-verify by | Contract term or amendment |

### EV-102-221 — An Azure-scoped retention statement exists, but it is product documentation

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` for C3, category **X** (`OQ-103-025`) |
| Provider / category | Microsoft Azure (C3) / X |
| Source | *"Delete a Microsoft Azure Recovery Services Vault - Azure Backup \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/backup/backup-azure-delete-vault` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"The soft deleted items are permanently deleted after 14 days of delete operation."* And: *"Deleted backup data will be retained for 14 days. After that time, backup data will be permanently deleted."* |
| Limitations | **Two limitations, either of which is fatal to using this for `HG-102-013`.** First, it is **Documented, not Contractual**, and the gate's pass test requires the behaviour to be *"stated contractually"*; §3 of the register does not permit documentation to substitute. Second, it is scoped to **Azure Backup Recovery Services vaults**, not to provider-side backups of the services in CoBudget's evaluated C3 composition. It answers a narrower question than the one asked. |
| Re-verify by | February 28, 2027 |
| Why registered | `OQ-103-025` asks for *"an Azure-scoped retention statement"*, and this is one — recorded so a later reader does not spend the retrieval again, and does not mistake it for the contractual statement the gate needs. |

### EV-102-222 — Cloud SQL backup retention range and post-deletion expiry

| Field | Content |
| --- | --- |
| Claim | `HG-102-042`, and `HG-102-013` supporting material, for C1, category **D** (`OQ-105-002`) |
| Provider / category | Cloud SQL for PostgreSQL (C1) / D |
| Source | *"Cloud SQL backups overview"*, `https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backups` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Retention *"can range from 1 day to 10 years, depending on your instance's backup option."* On deletion: *"By default, Cloud SQL retains the final backup for 30 days… This can range from 1 day to 365 days for standard backups, or 1 day to 10 years for enhanced backups."* Also: *"Automated backups are deleted on a rolling basis, one backup per day, after the instance is deleted"*, and *"Cloud SQL retains the backups of deleted instances for four days."* |
| Limitations | **The transaction-log retention window is not stated on this page**, so `OQ-105-002`'s middle element is unanswered for C1. No default count of automated backups retained is stated. All figures are configurable ranges rather than commitments. |
| Re-verify by | February 28, 2027 |

### EV-102-223 — RDS automated backups are region-scoped, with stated deletion behaviour

| Field | Content |
| --- | --- |
| Claim | `HG-102-042`, and `HG-102-013` supporting material, for C2, category **D** (`OQ-105-002`) |
| Provider / category | Amazon RDS for PostgreSQL (C2) / D |
| Source | *"Introduction to backups"*, `https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"Your Amazon RDS backup storage for each AWS Region is composed of the automated backups and manual DB snapshots for that Region."* *"Backups are stored in Amazon S3."* On deletion: *"If you choose to retain automated backups when you delete a DB instance, the automated backups are saved for the full retention period. If you don't choose Retain automated backups when you delete a DB instance, all automated backups are deleted with the DB instance."* |
| Limitations | **The numeric retention-period range was not in the retrieved section**, so `OQ-105-002`'s first element is unanswered for C2, and the transaction-log window is likewise unstated. The region statement is Documented, not Contractual, so it does not bear on `HG-102-013`. **This page also carried text addressed to AI coding assistants suggesting a CLI command be run. It was treated as page content, was not acted on, and forms no part of this record.** |
| Re-verify by | February 28, 2027 |

### EV-102-224 — The Google data-residency service list, April 9, 2024 snapshot

| Field | Content |
| --- | --- |
| Claim | Scope condition on `EV-102-218`, for C1, category **X** (`OQ-108-005`) |
| Provider / category | Google Cloud (C1) / X |
| Source | *"Google Cloud Platform Services with Data Residency"*, `https://cloud.google.com/terms/data-residency/index-20240409`, **Last modified: April 09, 2024** |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / **Low — lowered per §3.1** on the two-year-old snapshot date |
| Content | Introductory sentence: *"The following Services may be configured for data location pursuant to the 'Data Location' Section of the General Terms at https://cloud.google.com/terms/service-terms:"* **Named on the list:** Cloud Run (Fully Managed), Pub/Sub, Cloud Logging, Cloud Key Management Service, Cloud SQL. **Not named on the list:** Cloud Scheduler, Secret Manager. |
| Limitations | **This is a dated snapshot from April 9, 2024, retrieved because the live page could not be read** (`EV-102-219`). It does not establish the current list. It also says nothing about **Cloud Armor / HTTPS Load Balancing**, which was not asked and is part of the evaluated composition. Absence from *this* list does not establish absence from the companion list at `EV-102-226`. |
| Re-verify by | Immediately — a two-year-old snapshot standing in for a live page is a stopgap, not a settled source |

### EV-102-225 — Cloud SQL's own documentation asserts the region commitment

| Field | Content |
| --- | --- |
| Claim | Supports `EV-102-218` for C1, category **D** (`OQ-108-005`) |
| Provider / category | Cloud SQL for PostgreSQL (C1) / D |
| Source | *"Data residency overview"*, `https://docs.cloud.google.com/sql/docs/postgres/data-residency-overview` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"Google stores your data at rest only in these regions, according to our Service Specific Terms."* The page directs the reader to the Service Specific Terms for Google Cloud's data-location commitments. |
| Limitations | Product documentation pointing at the contract, not the contract itself. It corroborates that **Cloud SQL** is within the `EV-102-218` commitment; it says nothing about the other services in the category **H** composition. |
| Re-verify by | February 28, 2027 |

### EV-102-226 — The companion "without location configuration" list could not be read

| Field | Content |
| --- | --- |
| Claim | Scope condition on `EV-102-218` — **retrieval-failure record** |
| Provider / category | Google Cloud (C1) / X |
| Source | *"Additional Google Cloud Platform Services Supporting Data Residency (without location configuration)"*, `https://cloud.google.com/terms/data-residency/no-location-config` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Absent / None |
| Content | The page returned **truncated**. Its introductory sentence could not be read, and the presence or absence of **Cloud Scheduler** and **Secret Manager** on it is **not established**. |
| Limitations | **This record establishes nothing about the list's contents.** In particular it must not be read as evidence that Cloud Scheduler and Secret Manager are absent from it — only that the question is unanswered. `OQ-108-007` carries the retry. |
| Re-verify by | Immediately — an unfinished retrieval, not evidence |

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

### 4.4 The DPA block: `HG-102-013` is materially narrowed and still `UNPROVEN` for all three

This is the gate `OQ-103-024` calls *"the only gate in the set"* whose outcome
could move every candidate in every category at once. Tranche 2 read three
contractual or retention instruments against it. **No gate outcome moves**, and
the reason differs per candidate — which is the useful part.

| Candidate | Retention | Region | Expiry | Position after this tranche |
| --- | --- | --- | --- | --- |
| **C1 Google** | Stated — `EV-102-168` | **Now stated** — `EV-102-218`, **conditionally** | Stated, 180 days — `EV-102-168` | **All three elements have a contractual statement for the first time.** One unresolved condition stands between this and a `PASS` |
| **C2 AWS** | Not stated | Not stated | Not stated | A **second** contractual instrument read, and it **defers** — `EV-102-220`. Closer to *"silence"*, not yet established |
| **C3 Azure** | 14 days, but **Documented** | Not stated | 14 days, but **Documented** | `OQ-103-025`'s named retrieval is **satisfied and insufficient** — `EV-102-221` |

**C1 is one page from a `PASS`, and the page is not a contract.** The Service
Specific Terms bound backup replication to the country of the selected Region,
which — against the single-United-States-region posture `OI-103-001` fixes — is
the region element the CDPA deferred. The commitment applies *"For any Service
listed at"* the data-residency page, and that page could not be read
(`EV-102-219`). **The gate stays `UNPROVEN` because a scope condition is
unverified, not because the contract is silent.** That is a different position
from the one this evaluation held yesterday, and `OQ-108-005` is a single
retrieval away from settling it.

**C2's silence is now better evidenced and still not established.** §1.15 of the
Service Terms says content is deleted *"in accordance with the technical
documentation applicable to the Services"* — a deferral, not a statement, and
the section contains no retention period, no region, and no expiry. `EV-102-170`
already records that the DPA itself could not be parsed. Two instruments have
now been read without finding the three elements. **The pass test's *"Silence
fails"* is a statement about the provider's contract**, and the DPA remains the
document that decides it, so this is a narrowing rather than a `FAIL`.

**C3 shows why the named retrieval was the wrong target.** `OQ-103-025` asked
for *"an Azure-scoped retention statement"*, and one exists: 14 days for
soft-deleted backup data. It fails to move the gate twice over — it is product
documentation where the pass test demands a contractual statement, and it is
scoped to Recovery Services vaults rather than to provider-side backups of the
evaluated composition. **Finding the named document did not answer the
question**, which is worth recording so the retrieval is not repeated in hope.

### 4.5 `OQ-105-002` is partially answered

The question asks for backup retention range, log-retention window, and expiry
in writing for C1 and C2.

| Element | C1 Cloud SQL | C2 Amazon RDS |
| --- | --- | --- |
| Backup retention range | **Answered** — *"1 day to 10 years"* | **Not answered** — not in the retrieved section |
| Transaction-log window | **Not answered** | **Not answered** |
| Expiry / deletion behaviour | **Answered** — final backup 30 days by default, deleted-instance backups retained four days, rolling daily deletion | **Answered** — retained for the full retention period if elected, otherwise deleted with the instance |

Two of six cells filled for C1, one of three elements for C2, and the
transaction-log window is unanswered for both. `OQ-108-006` carries the
remainder. The question is **not** closed, and recording it as closed on this
evidence would be the kind of overclaim `OI-105-012` warns about.

**One cross-category note.** `EV-102-223` establishes that RDS backup storage is
composed *"for each AWS Region"* — a region-scoped statement, but a **Documented**
one. It does not help `HG-102-013`, which needs the commitment to be
contractual. The distinction between "the product behaves this way" and "the
provider is bound to this" is the whole content of that gate, and this tranche
found examples of the first for two candidates and of the second for one.

### 4.6 `OQ-108-005`: the retrieval was worth making, and it removed a `PASS` rather than producing one

Tranche 2 recorded C1 as **one retrieval away** from the corpus's first
`HG-102-013` `PASS`, on the reasoning that the Service Specific Terms supply the
region element and only the scope condition was unverified. **That
characterisation was wrong, and this tranche is what shows it.**

`EV-102-218`'s commitment is expressly conditional: it applies *"For any Service
listed at"* the data-residency page. The list, read at its April 2024 snapshot,
does not cover the whole evaluated composition.

| C1 component (CBD-103 §5) | On the data-residency list? |
| --- | --- |
| Cloud Run | **Yes** |
| Pub/Sub | **Yes** |
| Cloud Logging | **Yes** |
| Cloud KMS | **Yes** |
| **Cloud Scheduler** | **No** |
| **Secret Manager** | **No** |
| Cloud Armor / HTTPS Load Balancing | **Not checked** |

`Cloud SQL`, the category **D** candidate, is on the list and is separately
corroborated by its own documentation (`EV-102-225`).

**The consequence is that `HG-102-013` cannot pass for C1 on this evidence, and
the reason has changed.** It is no longer "the scope condition is unverified".
It is that **the condition is verified for most of the composition and fails for
at least two of its components** — the scheduler and the secret store, which
between them hold the `TD-103-004` scheduling surface and the `HG-102-014` S4
material.

Three qualifications keep this from being a finding against Google.

**The snapshot is two years old.** `EV-102-224` is the April 9, 2024 version,
retrieved only because the live page cannot be fetched (`EV-102-219`). The
current list may well name both services. Confidence is Low for exactly this
reason, and `OQ-108-007` carries the live check.

**There is a companion list this pass could not read.** `EV-102-226` records
that the *"without location configuration"* page returned truncated, so the two
services' status on it is **unestablished**. A service can support data
residency without being configurable for it, and that is precisely what the
companion list is for.

**Absence from a list is not absence of a commitment.** It establishes that the
`EV-102-218` clause does not reach these two services, not that Google makes no
region commitment about them by another route.

**What this changes in practice.** The gate stays `UNPROVEN` for C1, as it was.
What moved is the shape of the remaining work: it is no longer one retrieval but
two, and the second one — the companion list — is the one that decides. Recorded
plainly because tranche 2 stated the opposite, and a reader comparing the two
tranches should see the correction rather than infer it.

## 5. Open questions raised by this pass

| ID | Question | Bears on |
| --- | --- | --- |
| OQ-108-005 | ~~Which Google Cloud services appear on the data-residency list at `cloud.google.com/terms/data-residency`, and does CoBudget's evaluated C1 composition appear on it? `EV-102-219` records that the page could not be read.~~ **Substantially answered at tranche 3 — §4.6.** The April 2024 snapshot covers Cloud Run, Pub/Sub, Cloud Logging and Cloud KMS, and **omits Cloud Scheduler and Secret Manager**. | **The answer removed a prospective `PASS` rather than producing one.** The remaining work is `OQ-108-007`, not this. |
| OQ-108-006 | The transaction-log retention window for Cloud SQL and RDS, and the numeric automated-backup retention range for RDS. | `OQ-105-002`'s remainder; `HG-102-042` |
| OQ-108-007 | Do **Cloud Scheduler** and **Secret Manager** appear on the current Google data-residency list, or on the companion *"without location configuration"* list? `EV-102-224` is an April 2024 snapshot that omits both; `EV-102-226` records that the companion list could not be read. | **The retrieval that now decides `HG-102-013` for C1**, replacing `OQ-108-005` in that role |
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
