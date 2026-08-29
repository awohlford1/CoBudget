# CBD-108 — Evidence Retrieval Pass

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Registers evidence obtained by CBD-108's retrieval pass against the `D3` class of the carried-item register — items whose disposition is that a document exists and has not been read. **Tranches 1 and 2 of an incomplete pass.** Tranche 1 closes `OQ-106-010`, partially answers `OQ-104-016`, and **falsifies a hypothesis CBD-106 §5.1 recorded as likely**. Tranche 2 works the DPA block and materially narrows `HG-102-013` — **the one gate whose outcome could move every candidate in every category at once** — without moving it, for a different reason per candidate. **Tranche 3 retries the retrieval tranche 2 named as decisive, and the answer removes a prospective `PASS` rather than producing one** — §4.6 records the correction explicitly. **Tranche 4 returns to the pricing block**: category **N** is partly priced, quantifying `OI-130-021`'s A2P-floor claim, and `OQ-103-019` is answered in a way that puts a **second** condition on C3's `$0.00` identity figure. **Tranche 5 opens categories H and D and covers part of one of them** — §4.10 states what it did not do. It finds that Azure's cheapest PostgreSQL tier is excluded from production support by Microsoft's own documentation, which moves the `CR0` floor without producing a price. **Tranche 6 closes `OQ-108-007` from a list the Product Owner supplied, corrects tranche 3, and brings `HG-102-013` for C1 down to nameable components. Tranche 7 answers `OQ-108-011` — the composition uses **both** global and regional load balancing, so the regional half is covered and the global half is not — and separates the two remaining gaps by whether a like-for-like substitute exists. It also corrects the coherence review's regional finding.** It performs no observation, contacts no provider, and moves no gate outcome or verdict. |
| Document version | 0.9 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.9; Cross-Category Coherence Review v0.9; Combined Cost Model v0.9; Carried Item Disposition Register v0.9; Acceptance Criteria Traceability v0.9 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `ee5eb99` |
| Last updated | August 29, 2026 |

## 1. Scope and evidence block

The carried-item register puts **91 items** in class `D3` — a document exists and
has not been read — and records that this is the cheapest work in the CBD-15
corpus and that nothing is driving it (`OI-108-017`). This document is where
CBD-108 discharges them.

**Evidence block: `EV-102-212` onward.** CBD-103's cross-category pass reserved
through `EV-102-211` (evaluation §8.1), and no number above that is claimed
anywhere in the corpus. `212`–`241` is reserved for this pass; `212`–`232` are
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

### EV-102-227 — AWS End User Messaging SMS: origination and registration fees, usage rate not retrieved

| Field | Content |
| --- | --- |
| Claim | `CT-102-006`, `CT-102-007` for C2, category **N** |
| Provider / category | AWS End User Messaging SMS (C2) / N |
| Source | *"AWS End User Messaging Pricing"*, `https://aws.amazon.com/end-user-messaging/pricing/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Origination: *"$1 per 10DLC phone number"* monthly; toll-free *"monthly lease price of $2"*. 10DLC registration: *"$4.50 one-time fee per company"*; *"$12.50 one-time per company"* for company authentication verification; *"$50 one-time campaign activation fee"*; *"$10 per regular 10DLC campaign"* monthly. Carrier fees: *"Carrier fees will vary based on the type of number sending the message."* |
| Limitations | **The per-segment US send rate was not obtainable from this page** — the retrieval found no consolidated US SMS rate table, and the page refers the reader to a pricing tool. Carrier fees are acknowledged but not quantified. `OQ-108-008` carries both. |
| Re-verify by | February 28, 2027 |

### EV-102-228 — Azure Communication Services SMS: complete US figures for both routes

| Field | Content |
| --- | --- |
| Claim | `CT-102-006`, `CT-102-007` for C3, category **N** |
| Provider / category | Azure Communication Services SMS (C3) / N |
| Source | *"SMS pricing - An Azure Communication Services concept document \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/communication-services/concepts/sms-pricing` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **10DLC route.** Brand Registration *"$4"* one-time; Brand Vetting Standard *"$40"* one-time, *"required in most cases"*; Campaign Registration monthly — Low Volume *"$1.50"*, Sole Proprietor *"$2"*, Charity *"$3"*; phone number leasing *"$1"* monthly. Usage, United States: send *"$0.0075"* per segment. Carrier surcharge per outbound segment: AT&T *"$0.0020"*, T-Mobile *"$0.0030"*, Verizon *"$0.0030"*, US Cellular *"$0.0050"*. **Toll-free route.** Leasing *"$2/mo"*; usage United States send *"$0.0075"*; carrier surcharge United States send *"$0.0025"*. |
| Limitations | Prices are stated *"exclusive of the required communications taxes and fees"*. Carrier surcharge is *"subject to change"* and varies by the recipient's carrier, which CoBudget's demand model does not break down — so the surcharge term is a range, not a figure. Short-code pricing is recorded on the page but is not a candidate route at this volume. |
| Re-verify by | February 28, 2027 |

### EV-102-229 — Privileged Identity Management requires Entra ID P2 or ID Governance

| Field | Content |
| --- | --- |
| Claim | `HG-102-005`, `CR0` for C3, in the hosting and identity categories (`OQ-103-019`) |
| Provider / category | Microsoft Entra (C3) / hosting and identity |
| Source | *"Microsoft Entra ID Governance licensing fundamentals - Microsoft Entra ID Governance \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/entra/id-governance/licensing-fundamentals` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"You need either Microsoft Entra ID Governance licenses or Microsoft Entra ID P2 licenses to use PIM and all of its settings."* The features table marks **Privileged Identity Management** as present for **Microsoft Entra ID P2**, **Microsoft Entra ID Governance** and **Microsoft Entra Suite**, and **absent for Free and for Microsoft Entra ID P1**. Licences are required for *"Users with eligible and/or time-bound assignments to Microsoft Entra ID or Azure roles managed using PIM"* and for *"Users able to approve or reject activation requests in PIM"*. |
| Limitations | Establishes the licence requirement, **not** that `HG-102-005` can only be satisfied through PIM. The gate asks whether operator access *"can be made just-in-time"*; PIM is one mechanism and this record does not establish it is the only one. It also does not price P2 or ID Governance per seat. `OQ-108-009` carries both. |
| Re-verify by | February 28, 2027 |
| Supersedes | Narrows `EV-102-011`, which stated only that PIM *"requires licensing"* without naming the tier |

### EV-102-230 — Azure PostgreSQL Flexible Server CMK is create-time-only and irreversible

| Field | Content |
| --- | --- |
| Claim | `HG-102-039`, `DP-105-009` for C3, category **D** (`OQ-105-009`, `OI-105-004`) |
| Provider / category | Azure Database for PostgreSQL Flexible Server (C3) / D |
| Source | *"Data Encryption at Rest in Azure Database for PostgreSQL Flexible Server - Azure Database for PostgreSQL \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-data-encryption` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | From the limitations section: *"You can configure customer managed key encryption only during creation of a new server, not as an update to an existing Azure Database for PostgreSQL flexible server."* And: *"After you configure customer managed key encryption, you can't revert back to system managed key."* And: *"The instance of Azure Key Vault Managed HSM or the instance of Azure Key Vault on which you plan to store the encryption key must exist in the same region where you're creating the Azure Database for flexible server."* Also, in the body: *"You can select the mode only at server creation time. You can't change the mode from one to another for the lifetime of the server."* |
| **Negative finding** | **The limitations section states no compute-tier restriction on CMK.** Burstable, General Purpose and Memory Optimized are not distinguished anywhere on the page in relation to customer-managed keys. |
| Limitations | Establishes the constraint for **C3 only**. It does not establish the equivalent for C1 Cloud SQL or C2 Amazon RDS, which `OQ-105-009` also asks about and this tranche did not retrieve. The absence of a stated tier restriction is an absence on **this** page, not a positive statement that every tier supports CMK. |
| Re-verify by | February 28, 2027 |

### EV-102-231 — Azure's cheapest PostgreSQL tier is disqualified from production by its own documentation

| Field | Content |
| --- | --- |
| Claim | `CR0`, `WR-102-019`/`020` for C3, category **D** (`OQ-105-009`) |
| Provider / category | Azure Database for PostgreSQL Flexible Server (C3) / D |
| Source | *"Compute Options - Azure Database for PostgreSQL \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-compute` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Three tiers are offered: **Burstable, General Purpose, Memory Optimized**. Of Burstable: *"Best suited for web servers, proof-of-concept environments, small databases, and development builds. **Not recommended for production workloads.**"* And: *"This tier is primarily designed for nonproduction scenarios such as development, staging, or testing, **does not qualify for 24/7 support**, and root cause analysis (RCA) may not be provided."* The smallest General Purpose server type is **D2s_v3 at 2 vCores and 8 GiB**. Automated backup retention is **7 to 35 days** on all three tiers, with long-term retention *"up to 10 years"*. |
| Limitations | The vendor's recommendation is not a technical restriction — nothing here says Burstable cannot run a production database, only that it is not recommended and carries no 24/7 support. Whether CoBudget treats that as disqualifying is a Product Owner judgment, recorded at `OQ-108-010`. No price is attached to any tier on this page. |
| Re-verify by | February 28, 2027 |

### EV-102-232 — The current Google data-residency service list, supplied by the Product Owner

| Field | Content |
| --- | --- |
| Claim | Scope condition on `EV-102-218`, for C1, categories **X** and **D** (`OQ-108-005`, `OQ-108-007`) |
| Provider / category | Google Cloud (C1) / X |
| Source | *"Google Cloud Platform Services Data Residency"*, `https://cloud.google.com/terms/data-residency`, **live page as at August 29, 2026** |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium — see provenance below |
| **Provenance** | **The list content was supplied by the Product Owner from the live page, not retrieved by this pass.** `EV-102-219` and `EV-102-226` record that the page and its companion truncate when fetched by the tooling available here. The URL is public and the content is re-retrievable by a second reader; the transcription step is why confidence is Medium rather than High, and it is stated so the record is not read as a direct retrieval. |
| Content | Four lists. **General** — *"The following Services may be configured for data location pursuant to the 'Data Location' Section of the General Terms"* — includes **Cloud Run**, **Pub/Sub**, **Cloud Logging**, **Cloud Key Management Service (Cloud KMS)**, **Cloud SQL**, **Google Cloud Armor**, **Secret Manager**, **Cloud Load Balancing - Regional Load Balancers (Application, Proxy Network)**, **Workflows**, **Eventarc**, **Cloud Storage**, **Compute Engine**, **Firestore**, **Cloud Run functions**. **AI/ML Data Location** and **Assured Workloads** carry separate lists. A fourth list, *"Additional Google Cloud Platform Services Supporting Data Residency (without location configuration)"*, introduces itself as *"Customers with data residency requirements may consider using the following Services, which do not store Customer Data at-rest or process Customer Data in use"* and includes Access Approval, Access Transparency, Cloud DNS, IAM, VPC and VPC Service Controls. |
| **Cloud Scheduler** | **Absent from all four lists.** |
| Limitations | Classed Contractual because `EV-102-218` attaches its commitment to *"any Service listed at"* this page, so inclusion is what the contract operates on. The page carries **no effective date** in the content supplied, so it cannot be compared by version against `EV-102-224`. Coverage of a service by this list establishes only that the Data Location commitment reaches it — not any retention or expiry term, which come from the CDPA at `EV-102-168`. |
| Supersedes | **`EV-102-224`**, the April 9, 2024 snapshot, which is now known to be stale in at least one respect |
| Re-verify by | Contract term or amendment |

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

### 4.7 Category N is partly priced, and `OI-130-021`'s claim is now quantified

`OI-130-021` records category **N** as *"the category least able to be
constrained by a ceiling — the A2P floor is not negotiable downward by low
volume."* That was a structural argument. It is now a figure.

At Base, `DM-102-047` gives **60 message segments per month**.

| | C3 Azure, 10DLC | C3 Azure, toll-free | C2 AWS, 10DLC | C2 AWS, toll-free |
| --- | --- | --- | --- | --- |
| Number lease | $1.00/mo | $2.00/mo | $1.00/mo | $2.00/mo |
| Campaign registration | $1.50/mo (Low Volume) | — | **$10.00/mo** | — |
| **Recurring floor** | **$2.50/mo** | **$2.00/mo** | **$11.00/mo** | **$2.00/mo** |
| Usage, 60 segments | $0.45 | $0.45 | *rate not retrieved* | *rate not retrieved* |
| Carrier surcharge, 60 segments | $0.12–$0.30 | $0.15 | *not quantified* | *not quantified* |
| **One-time registration** | **$44.00** | — | **$67.00** | — |

**The floor is 85–96% of the monthly bill at Base.** For C3 on 10DLC, $2.50 of
recurring charge sits against roughly $0.60 of traffic. `OI-130-021` is
correct, and the ratio is the evidence for it: sending ten times fewer messages
changes the bill by pennies.

**The registration floor is the larger term and it is one-time.** $44 for C3 and
$67 for C2 to register a brand and a campaign, before a single message. Against
a category whose Base traffic costs about sixty cents a month, the entry cost is
roughly six years of usage.

**Two findings worth carrying to a selection.**

**AWS's 10DLC campaign fee is 6.7× Azure's**, $10.00 against $1.50 monthly, and
it is the dominant recurring term for both. That is the difference between the
two candidates at this volume — not the per-message rate, which is unretrieved
for C2 but cannot plausibly matter at 60 segments.

**Toll-free is cheaper than 10DLC on both platforms at this volume**, and avoids
the registration fees entirely. It is not obviously the right route — toll-free
verification has its own requirements this pass did not price, and `PN-130-*`
does not choose between them — but a selection that assumes 10DLC because it is
the default would be choosing the more expensive option without noticing.

**It selects nothing.** `CR3` again, and C2 and C3 both remain
`ELIGIBLE-PENDING-EVIDENCE` with C10 `INELIGIBLE` and out of the field.

### 4.8 `OQ-103-019` is answered, and it puts a condition on C3's `$0.00`

`EV-102-011` recorded only that Privileged Identity Management *"requires
licensing"*. It is now precise: **PIM requires Microsoft Entra ID P2 or
Microsoft Entra ID Governance, and is available on neither the Free tier nor
P1** (`EV-102-229`).

`HG-102-005` asks whether *"operator access can be made just-in-time"*. PIM is
Azure's mechanism for exactly that. **If CoBudget satisfies that gate for C3
through PIM, then `CR0` — the cheapest gate-clearing tier — includes P2 or ID
Governance licences, and C3's identity cost is not `$0.00`.**

Three qualifications, and they matter because this is a cost claim about a
candidate.

**The gate does not name PIM.** It asks whether just-in-time access is possible,
not whether a particular product provides it. This record establishes what PIM
costs to enable, not that PIM is required. `OQ-108-009` puts that question
properly.

**The licences are for CoBudget's own administrators, not for its customers.**
The 50,000-MAU allowance at `EV-102-216` covers external-tenant users. PIM
licensing is counted per administrator with an eligible assignment and per
approver — a single-digit number at Private MVP, against `OI-103-002`'s
observation that the second principal role is defined and unfilled.

**No per-seat price was retrieved**, so the size of the consequence is unknown.
It is the difference between `$0.00` and something, not between `$0.00` and a
known figure.

**What this does to CBD-104 §6.6.** That section rests C3's `$0.00 + unknowns`
on Conditional Access being free (`OQ-104-016`, narrowed at §4.3 and still
unproven). This adds a second condition of the same kind from a different
direction: the hosting category's `HG-102-005` may drag a paid Entra tier into
the identity category's bill. Neither condition is settled, and **both point the
same way** — C3's zero is the least robust figure in the one category that has
figures at all.

### 4.9 Category D: the cheapest tier is not the cheapest *viable* tier, and `CR0` turns on that

`OQ-105-009` asks whether any candidate's cheapest viable tier restricts CMK,
private networking, or PITR. For **C3** the answer is more interesting than the
question anticipated, and this tranche covers **C3 only** — §4.10 records what
was not done.

**The expected finding did not appear.** The obvious hypothesis was a tier
restriction on customer-managed keys — that CMK requires General Purpose or
above. `EV-102-230` records that **the limitations section states no
compute-tier restriction at all**. That is recorded as a negative finding rather
than passed over, because it is the kind of assumption a selection would
otherwise carry unexamined.

**A sharper constraint appeared instead.** CMK on C3 is **create-time-only and
irreversible**: *"You can select the mode only at server creation time"*, and
*"After you configure customer managed key encryption, you can't revert back to
system managed key."* Reversing either decision means restoring to a new server.
This is the constraint `OI-105-004` anticipated — it recorded that the
single-region backup choice *"is create-time-only on at least one candidate"* —
and it now has a source. It bears on `HG-102-039`, whose subject is whether key
custody can be separated from backup-data access: on C3 that separation is a
decision taken once, at provisioning, and not revisited.

**The `CR0` finding is the one that moves the cost floor.** Azure's cheapest
PostgreSQL tier is **Burstable**, and Microsoft's own documentation says it is
*"Not recommended for production workloads"*, is *"primarily designed for
nonproduction scenarios"*, and **"does not qualify for 24/7 support"** with RCA
*"may not be provided"*.

`CR0` prices the cheapest **gate-clearing** tier, not the cheapest tier. If
CoBudget will not run its primary datastore on a tier the vendor excludes from
production support, then C3's category **D** floor is **General Purpose**, whose
smallest server type is `D2s_v3` at 2 vCores and 8 GiB.

**That is a floor set by support terms, not by demand.** `DM-102-030` puts the
Base database at **0.4 GB** and High at **4.1 GB**, against a minimum General
Purpose server carrying 8 GiB of memory and a 32 GiB storage minimum. Category D
will be paying for roughly twenty times the storage it uses and a machine sized
for a workload CoBudget does not have — which is precisely the floor-dominated
outcome CBD-103 §6.2 predicted, now with a named tier rather than an inference.

**Whether Burstable is actually disqualifying is a Product Owner call**, not a
gate outcome. Nothing says Burstable cannot run the database; it says Microsoft
does not recommend it and will not support it around the clock. `OQ-108-010`
puts that question rather than settling it by drafting — and the answer moves
C3's category D cost by the difference between the two tiers.

**One incidental answer.** `EV-102-231` records automated backup retention of
**7 to 35 days on all three tiers**, which is part of what `OQ-105-002` asks and
which the evaluation had recorded as settled for C3 by `EV-102-033`. It
corroborates rather than moves.

### 4.10 What this tranche did not do

Stated plainly because the tranche was opened to work **categories H and D**, and
it covered part of one of them.

* **Category H is untouched.** No hosting price was retrieved for any candidate.
  `OQ-103-015` remains open in full, and `OQ-103-016` — whether any candidate's
  cheapest gate-clearing tier caps seats at one, which converts to an
  `HG-102-006` failure per `OI-102-015` — was not attempted.
* **Category D covers C3 only.** `OQ-105-009` asks about all three candidates;
  the Cloud SQL and Amazon RDS tier restrictions were not retrieved, and
  `OQ-105-008`'s price lines were not retrieved for any candidate.
* **No price figure was obtained in either category.** Both pages consulted
  defer pricing to a calculator or a separate pricing page. What this tranche
  produced is a **constraint on which tier must be priced**, not a price.

The remaining H and D work is larger than the tranches before it: category H
prices a composition of six services across three providers, and neither
category has an established instance sizing to price against. That is a
different shape of work from the single-page retrievals that closed category E
and answered `OQ-103-019`, and `OI-108-022` records it.

### 4.11 The current list resolves `OQ-108-007`, corrects tranche 3, and leaves `HG-102-013` for C1 turning on one service

`EV-102-232` supplies what `EV-102-219` and `EV-102-226` could not fetch. Read
against the C1 composition CBD-103 §5 records:

| C1 component | On the current list? | Change from `EV-102-224` |
| --- | --- | --- |
| Cloud Run | **Yes** | — |
| Pub/Sub | **Yes** | — |
| Cloud Logging | **Yes** | — |
| Cloud KMS | **Yes** | — |
| **Secret Manager** | **Yes** | **Now present — the April 2024 snapshot omitted it** |
| **Google Cloud Armor** | **Yes** | Newly checked; never examined before |
| **HTTPS load balancing** | **Regional variants only** | Newly checked; see below |
| **Cloud Scheduler** | **No — absent from all four lists** | Unchanged |
| Cloud SQL (category **D**) | **Yes** | — |

**Tranche 3's Secret Manager finding was stale, and this corrects it.** That
tranche read the April 9, 2024 snapshot because the live page could not be
fetched, and recorded Secret Manager as absent. It is present on the current
list. The snapshot was doing the job of a live page and got one of two answers
wrong — which is precisely the risk `EV-102-224` was marked Low confidence for,
and the reason it is now superseded rather than merely supplemented.

**Cloud Scheduler is absent, and the absence is now much better established.**
Tranche 3 could say only that it was missing from one two-year-old list.
`EV-102-232` shows it missing from **all four** — General, AI/ML, Assured
Workloads, and the companion list for services that hold no customer data at
all. That last one matters: the companion list is how Google says *"this service
needs no location configuration because it stores nothing"*, and Cloud Scheduler
is not on it either. **Google is not asserting that Cloud Scheduler holds no
customer data; the page simply does not address it.**

**A new gap this pass had never checked.** The General list covers *"Cloud Load
Balancing - **Regional** Load Balancers (Application, Proxy Network)"*. CBD-103
§5 names the component as *"Cloud Armor / HTTPS Load Balancing"* without
specifying regional or global. Google's global external Application Load
Balancer is a different product from the regional one, and **it is not on the
list**. Whether the composition is covered therefore depends on a variant
CBD-103 did not record. `OQ-108-011`.

**Where this leaves the gate.** `HG-102-013` for C1 needs retention, region and
expiry stated contractually. Retention and expiry come from the CDPA
(`EV-102-168`); region comes from the Service Specific Terms (`EV-102-218`) for
listed services. **Seven of the eight named components are covered. The gate now
turns on Cloud Scheduler, plus the load-balancer variant question.**

That is a materially better position than either tranche 2 or tranche 3
described, and it is the first time the gate has come down to a specific,
nameable thing rather than a class of unread documents.

**One design observation, recorded and not acted on.** **Workflows** and
**Eventarc** are both on the General list. `TD-103-004` requires a managed
scheduler at fifteen-minute-or-finer granularity; it does not require *Cloud
Scheduler* specifically. A C1 composition that met the scheduling requirement
through a listed service would close this gap without any new evidence.
**That is CBD-103's composition to change, not CBD-108's**, and `OQ-108-012`
puts the question rather than assuming the answer.

**A second observation, outside the composition.** **Cloud Monitoring** appears
only in the Assured Workloads list, annotated *"also subject to the 'General'
Section above if used as part of Assured Workloads"* — and **not** in the
General list on its own. CBD-103 §5 names Cloud Logging for observability, which
is covered. If observability later expands to Cloud Monitoring without Assured
Workloads, that would open a gap of the same kind. Recorded so it is not
discovered later.

**No gate outcome moves in this document.** `HG-102-013` stays `UNPROVEN` for
C1, because one component of the evaluated composition is uncovered and a second
is ambiguous. Moving it is CBD-103's to do, on this evidence, once
`OQ-108-011` and `OQ-108-012` are settled.

### 4.12 `OQ-108-011` is answered: the C1 front door sits outside the region commitment

**Product Owner, August 29, 2026: the composition uses both global and regional
load balancing.** No `EV-102-*` record is registered for this, because it is a
fact about CoBudget's own design rather than a provider claim — the evidence
register holds the latter.

`EV-102-232` covers *"Cloud Load Balancing - **Regional** Load Balancers
(Application, Proxy Network)"*. **The regional half of the composition is
therefore covered. The global external Application Load Balancer is a different
product and is not on any of the four lists** — so `EV-102-218`'s Data Location
commitment does not attach to it, and, as with Cloud Scheduler, it is absent
from the companion list too, meaning **Google makes no assertion that it holds
no customer data either**.

**Two of the named C1 components remain uncovered**, and they are not equally
remediable.

| Uncovered component | Listed alternative | Is the substitution like-for-like? |
| --- | --- | --- |
| **Cloud Scheduler** | **Workflows**, **Eventarc** | **Yes, plausibly.** `TD-103-004` asks for a managed scheduler at fifteen-minute granularity and does not name a product |
| **Global external Application Load Balancer** | Regional Application Load Balancer, which **is** listed | **No.** Global and regional load balancing differ in what they do, not only in what they cost. Dropping the global tier is a functional change, and whether CoBudget can is a design question this pass cannot answer |

**That distinction is the useful result of this thread.** The scheduler gap
looks closable by composition change with no new evidence. **The load-balancer
gap may not be closable at all without giving up global load balancing**, and no
amount of further reading changes that — six tranches have established that the
contract, the terms, and the list say what they say.

**This is a CBD-103 decision, not a CBD-108 one.** CBD-108 selects from
compositions the category evaluations define; it does not redesign them. The two
questions belong on CBD-103's docket, and `OQ-108-012` and this section are how
they get there.

#### Product Owner direction, August 29, 2026: drop to regional-only

**Recorded here as an input to CBD-103, and not executed here.** The Product
Owner's direction is to swap the C1 composition to regional-only load
balancing, which would bring the component inside `EV-102-218`'s commitment.

**The direction is well founded on the topology's own terms.** `OI-103-001`
fixes a single United States deployment region, and CBD-103 §6's `CR5`
reasoning is that a candidate scoring well on multi-region capability *"is
buying an option CoBudget is not exercising."* A global load balancer in a
single-region topology is that option in another form. Dropping it removes a
data-location gap and buys back nothing CoBudget was using.

**One consequence must be checked before it is executed, and this pass cannot
check it.** **Cloud Armor is in the same composition**, and Google attaches
security policies to global and regional load balancers through **different
policy types with different capability sets**. A swap that silently narrows the
available WAF capability would move a gate outcome, not just a data-location
scope. `OQ-108-014` carries it.

**What executing this actually requires** is therefore a CBD-103 change, not a
text edit: §5's composition line, plus a re-check of every gate whose outcome
rests on the load-balancing or Cloud Armor component, in a package whose matrix
`scripts/audit-cbd-103.py` derives rather than restates. Editing the
composition and leaving the matrix would be the precise defect the CBD-95
close-out found and the audits exist to prevent.

### 4.13 A correction to the coherence review's regional finding

The companion coherence review §4.4 states that the single-United-States-region
posture is confirmed and that **"no category contradicts it."** That is now too
strong, and this section corrects it.

**A global load balancer is a global product by construction.** It is not a
deployment region, and running one does not by itself put customer data outside
the United States — but it is the one part of the C1 composition the region
commitment was never written to reach, and §4.4 asserted the absence of any
contradiction without having checked the front door. That the composition also
uses regional load balancing does not settle it: the covered half being covered
says nothing about the uncovered half.

**Whether it is an actual contradiction turns on an unestablished fact**: does
the global external Application Load Balancer store customer data at rest? If it
does, the single-region posture and the composition disagree. If it does not,
the position is merely uncovered rather than contradictory. Nothing retrieved in
six tranches answers that, and Google's own companion list — which exists
precisely to name services that store nothing — does not include it.
`OQ-108-013` carries the question.

**The coherence review is amended at v0.9** to record the finding as
*unverified* rather than as *no contradiction*. It remains the case that no
**category** contradicts the regional posture; what is now open is whether one
**component** of one candidate's composition does.

## 5. Open questions raised by this pass

| ID | Question | Bears on |
| --- | --- | --- |
| OQ-108-005 | ~~Which Google Cloud services appear on the data-residency list at `cloud.google.com/terms/data-residency`, and does CoBudget's evaluated C1 composition appear on it? `EV-102-219` records that the page could not be read.~~ **Substantially answered at tranche 3 — §4.6.** The April 2024 snapshot covers Cloud Run, Pub/Sub, Cloud Logging and Cloud KMS, and **omits Cloud Scheduler and Secret Manager**. | **The answer removed a prospective `PASS` rather than producing one.** The remaining work is `OQ-108-007`, not this. |
| OQ-108-006 | The transaction-log retention window for Cloud SQL and RDS, and the numeric automated-backup retention range for RDS. | `OQ-105-002`'s remainder; `HG-102-042` |
| OQ-108-007 | Do **Cloud Scheduler** and **Secret Manager** appear on the current Google data-residency list, or on the companion *"without location configuration"* list? `EV-102-224` is an April 2024 snapshot that omits both; `EV-102-226` records that the companion list could not be read. | **The retrieval that now decides `HG-102-013` for C1**, replacing `OQ-108-005` in that role |
| OQ-108-008 | The per-segment US SMS send rate and the quantified carrier fees for AWS End User Messaging. `EV-102-227` records that neither is on the pricing page. | `CT-102-006` for C2, category N — the one term missing from the §4.7 comparison |
| OQ-108-009 | Can `HG-102-005` be satisfied for C3 without Privileged Identity Management, and if not, what does Entra ID P2 or ID Governance cost per administrator seat? | **`CR0` for C3 across categories H and I.** `EV-102-229` establishes what PIM requires, not that PIM is required |
| OQ-108-010 | Does CoBudget accept a database tier its vendor describes as *"Not recommended for production workloads"* and that *"does not qualify for 24/7 support"*? If not, C3's category D floor is General Purpose rather than Burstable. | **Product Owner decision, and it sets `CR0` for C3 in category D.** `EV-102-231` |
| OQ-108-011 | ~~Is CoBudget's C1 HTTPS load balancing the regional or the global Application Load Balancer?~~ **Answered by the Product Owner, August 29, 2026: the composition uses both.** The regional half is listed; the **global** external Application Load Balancer is on none of the four lists. | Closed. **Two C1 components remain uncovered, and unlike the scheduler this one has no like-for-like substitute** — §4.12. Raises `OQ-108-013` |
| OQ-108-012 | Must `TD-103-004`'s fifteen-minute scheduling requirement be met by **Cloud Scheduler**, the one composition component absent from all four data-residency lists? **Workflows** and **Eventarc** are both listed. | **The other thing `HG-102-013` for C1 turns on.** A CBD-103 composition question, not a CBD-108 one |
| OQ-108-013 | Does the **global external Application Load Balancer** store Customer Data at rest? It is absent both from the configurable list and from the companion list of services that store nothing. | **Decides whether the C1 front door merely sits outside the region commitment or actually contradicts the single-region posture** — §4.13 |
| OQ-108-014 | Do Google Cloud Armor's **regional** backend security policies offer the capability set the CBD-103 gate matrix relied on when it was evaluated against a **global** load balancer? | **Must be settled before the regional-only swap is executed.** A silent narrowing of WAF capability would move a gate outcome, not only a data-location scope — §4.12 |
| OQ-108-001 | Does *"core features"* in the Entra External ID allowance include Conditional Access, and what is the per-MAU rate beyond 50,000? Neither is stated on any page retrieved. | `OQ-104-016`; CBD-104 §6.6's `$0.00` figure for C3 |
| OQ-108-002 | Which plan clears the `ED-106-*` gate set for each email candidate? `CR0` prices the **cheapest gate-clearing tier**, and these records price the cheapest tier of any kind. For C2 that is Essentials; whether Essentials clears the gates is unestablished. | `CR0`; `OQ-106-010`'s remainder |
| OQ-108-003 | What is CoBudget's average outbound message size? C3 meters data transferred at `$0.00012/MB`, and no approved source establishes a message size, so the C3 figure carries an unresolved term. | `CT-102-006` for C3, category E |
| OQ-108-004 | Do the Azure Communication Services email rates in the Learn document match the rates the signed-in pricing page returns? The Learn page disclaims its own figures and the pricing page renders placeholders. | `EV-102-214`, `EV-102-215` |

## 6. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-022 | **The remaining H and D pricing work is a different shape from the tranches that preceded it.** Category H prices a composition of six services across three providers, and neither category has an established instance sizing to price against — which is part of why both were `UNKNOWN` to begin with. | Recorded so the pass's rate of progress is not extrapolated from the single-page retrievals that closed category E. The next useful step in category H may be `OQ-103-016`, which converts to an `HG-102-006` failure and is a gate question wearing a cost question's clothes, rather than the price lines of `OQ-103-015`. |
| OI-108-019 | **This is tranche 1 of an incomplete pass.** Six records against 91 `D3` items; two questions touched, one closed. | The pass is worth continuing on these terms — every record here came from a public page in a single sitting. `OI-108-017`'s point stands: the constraint is that nothing is driving the work, not that the work is hard. |
| OI-108-020 | **The source packages are not amended.** CBD-106 §5.1 still records its hypothesis as untested and `OQ-106-010` as open; CBD-104 §6.6 still rests C3's `$0.00` on `OQ-104-016`. | Deliberate. Propagating into two approved, Confluence-published packages mid-pass would mean amending them again at the end. The record of what is now known lives here until the pass closes, and this document is cited by the disposition register so the position is not lost. |
| OI-108-021 | **`EV-102-214` is the first cost record in the corpus whose own source disclaims it.** Register §3.2 requires Documented-or-stronger for a cost figure, and this is Documented — but the page says its figures *"may not reflect the latest Azure pricing."* | Recorded at Low confidence per §3.1 rather than excluded, because a disclaimed figure from the vendor is still better than the `UNKNOWN` it replaces, and the disclaimer is quoted so no reader mistakes it for a firm price. If a firm C3 email rate is needed, `OQ-108-004` is the route. |
