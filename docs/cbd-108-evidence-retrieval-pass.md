# CBD-108 — Evidence Retrieval Pass

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Registers evidence obtained by CBD-108's retrieval pass against the `D3` class of the carried-item register — items whose disposition is that a document exists and has not been read. **Tranches 1 and 2 of an incomplete pass.** Tranche 1 closes `OQ-106-010`, partially answers `OQ-104-016`, and **falsifies a hypothesis CBD-106 §5.1 recorded as likely**. Tranche 2 works the DPA block and materially narrows `HG-102-013` — **the one gate whose outcome could move every candidate in every category at once** — without moving it, for a different reason per candidate. **Tranche 3 retries the retrieval tranche 2 named as decisive, and the answer removes a prospective `PASS` rather than producing one** — §4.6 records the correction explicitly. **Tranche 4 returns to the pricing block**: category **N** is partly priced, quantifying `OI-130-021`'s A2P-floor claim, and `OQ-103-019` is answered in a way that puts a **second** condition on C3's `$0.00` identity figure. **Tranche 5 opens categories H and D and covers part of one of them** — §4.10 states what it did not do. It finds that Azure's cheapest PostgreSQL tier is excluded from production support by Microsoft's own documentation, which moves the `CR0` floor without producing a price. **Tranche 6 closes `OQ-108-007` from a list the Product Owner supplied, corrects tranche 3, and brings `HG-102-013` for C1 down to nameable components. Tranche 7 answers `OQ-108-011` — the composition uses **both** global and regional load balancing, so the regional half is covered and the global half is not — and separates the two remaining gaps by whether a like-for-like substitute exists. It also corrects the coherence review's regional finding. **Tranche 8 settles `OQ-108-014`: the regional-only swap moves no gate outcome. Tranche 9 records the swap as executed in CBD-103, and answers `OQ-108-012` in the negative — **Workflows cannot substitute for Cloud Scheduler**, correcting tranche 6. The cheap fix for the remaining gap is gone. **Tranche 10 puts the region question to C2 and C3, and C1 turns out to look worse only because it publishes a list that can be checked. Tranche 11 settles `OQ-108-017` and corrects tranche 10 in turn: C3's commitment is contractual too, in the Product Terms — §4.19 also collects the four corrections this pass has made to itself. **Tranche 12 reads the AWS DPA itself, supplied by the Product Owner, and corrects tranche 11 in turn: §12.1 states the region commitment contractually, so all three candidates now have one — but for C2 it is **narrower** than the Asserted statement it replaces, and the DPA assigns backup to the customer, so `HG-102-013`'s retention and expiry elements fail by allocation rather than by silence. **Tranche 13 settles `OQ-108-018` and `OQ-108-016`: C3's composition can be checked against its commitment for the first time, and the tranche 10 worry about Entra External ID is retired. Tranche 14 reads the AWS Customer Agreement, the last unread general AWS instrument, and answers `OQ-108-022` in the negative — no AWS contract states a backup retention or expiry term, because Service Terms §1.15 defers it to documentation. It records the Product Owner's ruling that `HG-102-013` accepts written evidence, which changes what would move that gate for C2 and C3 without moving it, and corrects two misreferences in tranche 13.** **Tranche 18 follows Service Terms §1.15's deferral into the per-service documentation and answers `OQ-108-025`: the deferral is followable and what it leads to is the wrong shape — overwhelmingly customer-configured retention, with provider-controlled lag on top that one page leaves explicitly unbounded. It corrects tranche 14's optimism about the cheap path.** **Tranche 20 completes `OQ-108-030` for two of five C2 components and corrects the reason tranche 18 gave for asking it: the retention of CoBudget's data in these services serves the `DI-91-*` inventory, not `HG-102-003`, which is about AWS's own data model. The composition does not bound retention uniformly — SQS cannot hold a message beyond fourteen days and CloudWatch Logs holds indefinitely by default.** **Tranche 21 answers `OQ-108-034` and discharges the C2 third of the upstream `OQ-103-009`: CloudWatch Logs scopes IAM to an individual log group by ARN and by tag, so two destinations with distinct access roles are configurable and `HG-102-026`'s pass test is met on the evidence. It is the first retrieval in this pass to produce evidence sufficient for a gate to pass rather than evidence that narrows one, and the outcome is CBD-103's to record. It also finds that the provider's redaction mechanism is the one `TD-103-022` rejects, which costs CoBudget nothing because its redaction is structural.** **Tranche 22 completes `OQ-103-009` by putting the same question to C1 and C3, and all three candidates meet `HG-102-026`'s pass test. The gate CBD-103 called the second most likely to eliminate a candidate eliminates none of them, and the evidence block this pass reserved is now exhausted.** It performs no observation, contacts no provider, and moves no gate outcome or verdict. |
| Document version | 0.24 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.20; Cross-Category Coherence Review v0.20; Combined Cost Model v0.20; Carried Item Disposition Register v0.20; Acceptance Criteria Traceability v0.20 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `447d3b7` |
| Last updated | August 29, 2026 |

## 1. Scope and evidence block

The carried-item register puts **91 items** in class `D3` — a document exists and
has not been read — and records that this is the cheapest work in the CBD-15
corpus and that nothing is driving it (`OI-108-017`). This document is where
CBD-108 discharges them.

**Evidence block: `EV-102-212` onward.** CBD-103's cross-category pass reserved
through `EV-102-211` (evaluation §8.1), and no number above that is claimed
anywhere in the corpus. **The reservation is widened here from `212`–`241` to `212`–`271`.**
`scripts/audit-cbd-108.py` fails if this package registers a number at or below
the corpus high-water mark.

**Sub-blocks, because two tranches are being drafted concurrently.** Tranche 17
was written alongside separate `OQ-108-025` work on another branch, and the two
would otherwise claim the same numbers. **`246`–`255` is reserved for the
concurrent `OQ-108-025` tranche; tranche 17 claims `256` onward.** This follows
the convention CBD-107's evaluation §8.1 set when it recorded that *a
concurrently drafted CBD-130 evaluation must claim a block above `131`* — the
same collision `scripts/audit-cbd-105.py` was corrected for. The gap between
`245` and `256` is deliberate and is not a numbering error.

**Tranche 18 is that concurrent tranche**, and it claims `246`–`249` from the block reserved for it. It is numbered **after** tranche 17 because it was committed after it and stacks on it, while its evidence numbers sit **below** tranche 17's. **That inversion is the reservation working as intended**, not a numbering error either.

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

### EV-102-233 — Cloud Armor policy types, and what regional backend policies support

| Field | Content |
| --- | --- |
| Claim | `HG-102-020`, `HG-102-021`, `HG-102-025` supporting material for C1, category **H** (`OQ-108-014`) |
| Provider / category | Google Cloud Armor (C1) / H |
| Source | *"Security policy overview"*, `https://docs.cloud.google.com/armor/docs/security-policy-overview` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Globally scoped**: backend security policy, edge security policy, internal service security policy. **Regionally scoped**: regional backend security policy, network edge security policy. **Global backend** policies attach to the global external Application Load Balancer, the classic Application Load Balancer, the global external proxy Network Load Balancer, and the classic proxy Network Load Balancer. **Regional backend** policies attach to the **regional external Application Load Balancer** and the regional internal Application Load Balancer. Regional backend security policies support: **Client IP address, Client geography, Client ASN, Rate limiting, TLS fingerprinting (JA3 and JA4), Bot management, HTTP filtering, WAF, Adaptive Protection, Address Group, and Request logging.** |
| Limitations | **The page does not state feature parity between global and regional policies in comparative language.** It presents each type's supported features in its own table. This record therefore establishes what regional policies **do** support; it does not establish that nothing is lost relative to global. A capability CoBudget later depends on must be checked against the regional table specifically. |
| Re-verify by | February 28, 2027 |

### EV-102-234 — Workflows has no scheduler of its own; scheduling requires Cloud Scheduler

| Field | Content |
| --- | --- |
| Claim | `TD-103-004` substitution question for C1, category **H** (`OQ-108-012`) |
| Provider / category | Google Cloud Workflows (C1) / H |
| Source | *"Schedule a workflow using Cloud Scheduler"*, `https://docs.cloud.google.com/workflows/docs/schedule-workflow` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | The page's title is itself the answer. Its opening states: *"This page shows you how to use Cloud Scheduler to run a workflow on a particular schedule, such as every Monday at 9 AM or every 15 minutes."* Google's documented route to running a workflow on a recurring basis is **Cloud Scheduler**. |
| Limitations | Establishes the documented route, not the exhaustive absence of any other. It says nothing about **Eventarc** or **Managed Service for Apache Airflow**, neither of which was retrieved. |
| Re-verify by | February 28, 2027 |

### EV-102-235 — AWS commits to the chosen Region, on a compliance page rather than in the terms

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **region element** for C2, category **X** (`OI-108-023`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"Data Privacy - Amazon Web Services (AWS)"*, `https://aws.amazon.com/compliance/data-privacy-faq/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Asserted** / Low |
| Content | *"We will not move or replicate your content outside of your chosen AWS Region(s) without your agreement."* The same section states the commitment with its carve-out: *"We will not move or replicate your content outside of your chosen AWS Region(s), except as necessary to provide the services you initiated, or as necessary to comply with the law or a binding order of a governmental body."* **No service list accompanies it** — the statement is made about customer content generally. |
| Limitations | **This is a compliance FAQ page, not a contract.** Evidence register §3.0.1 places a statement about the vendor's own practice as **Asserted** regardless of where it is published, and §3.2 is explicit that a hard gate *"never passes on Asserted evidence alone"*. `HG-102-013`'s pass test requires the behaviour to be *"stated contractually"*, so **this record cannot satisfy it**. `EV-102-220` records that the AWS **Service Terms** contain no clause stating the region or location of customer content, and `EV-102-170` that the DPA could not be parsed. The carve-out *"as necessary to provide the services you initiated"* is open-ended and its scope is not defined on the page. |
| Re-verify by | November 29, 2026 (Asserted, 3 months) |

### EV-102-236 — Azure commits at Geo granularity, for most services, with named exceptions

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **region element** for C3, categories **X** and **I** (`OI-108-023`) |
| Provider / category | Microsoft Azure (C3) / X |
| Source | *"Data residency in Azure"*, `https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Low — lowered per §3.1, see limitations |
| Content | *"Microsoft will not store or process customer data outside the customer-specified Geo without your authorization."* Scope is qualified: *"Most Azure services enable you to specify the region where your customer data will be stored and processed."* An exceptions list follows — *"The following services may store or process certain data outside the specified Geo:"* — naming Azure Cloud Services, Azure Data Explorer, Language Understanding, Azure Machine Learning and Azure Databricks among others. Separately: *"Certain Azure services do not enable the customer to specify the region where the service will be deployed"*, referencing non-regional services **including Azure CDN and Microsoft Entra ID**. |
| **Granularity** | The commitment is to a **Geo**, not a Region. A Geo such as *United States* contains multiple regions, so this is **coarser than the commitment C1 makes** and coarser than the single-region posture `OI-103-001` fixes. |
| Limitations | **This is a documentation page, not the Product Terms**, so like `EV-102-235` it does not meet `HG-102-013`'s requirement for a contractual statement. The Microsoft Product Terms and DPA were **not retrieved** by this pass and may state the commitment contractually. The page directs the reader to *"Products available by region"* for the complete service list, which was not retrieved. |
| Re-verify by | February 28, 2027 |

### EV-102-237 — Microsoft states the Geo commitment contractually, in the Product Terms

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **region element** for C3, category **X** (`OQ-108-017`) |
| Provider / category | Microsoft Azure (C3) / X |
| Source | *"Privacy & Security Terms"*, `https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/all` |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium |
| Content | Under the Microsoft Azure Core Services commitment: *"If Customer configures a particular service to be deployed within a Geo then, for that service, Microsoft will store Customer Data at rest within the specified Geo."* The document separately carries an Office 365 commitment enumerating a list of Geos and the data types covered, and an **EU Data Boundary** commitment: *"For EU Data Boundary Services, Microsoft will store and process Customer Data and Personal Data...at rest within the EU Data Boundary."* |
| **Scope condition** | The commitment is **doubly conditional**: the service must be one of the **"Microsoft Azure Core Services"**, and the Customer must be able to **configure it to a Geo**. `EV-102-236` records that Azure names services which *"do not enable the customer to specify the region"* — **Microsoft Entra ID** among them — and those fall outside this clause by its own construction. |
| Limitations | **Which services are "Microsoft Azure Core Services" was not retrieved**, so the covered set is not enumerated here — the same shape of scope condition `EV-102-218` carries for C1, and unresolved in the same way. `OQ-108-018`. No effective date appeared on the page. The commitment is to a **Geo**, which contains many regions, and is therefore coarser than the single-region posture `OI-103-001` fixes. It addresses **storage location** and says nothing about backup **retention** or **expiry**, which `HG-102-013` also requires. |
| Supersedes | **`EV-102-236` in part** — that record placed the commitment in documentation and classed it Documented. The commitment also exists contractually, which is what this record establishes. |
| Re-verify by | Contract term or amendment |

### EV-102-238 — The AWS DPA sits inside the Service Terms, where no region clause was found

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **region element** for C2, category **X** (`OQ-108-017`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"General Data Protection Regulation (GDPR) Center"*, `https://aws.amazon.com/compliance/gdpr-center/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium — what is documented is where the instrument lives |
| Content | The DPA is **incorporated into the AWS Service Terms**: *"The AWS Service Terms include the SCCs adopted by the European Commission (EC) in June 2021, and the AWS DPA confirms that the SCCs will apply automatically…"* and *"The UK GDPR Addendum is part of the AWS Service Terms and applies automatically for all customers who require a data processing agreement…"* On data location the page describes **customer choice** rather than an AWS commitment — that customers may *"Determine where their customer data will be stored, including the type of storage and geographic region of that storage."* **No clause stating that AWS will not move customer content outside a selected Region appears.** |
| Limitations | **This locates the instrument; it does not exhaustively parse it.** The AWS Service Terms are a very long document and both this retrieval and `EV-102-220`'s were necessarily partial. What can be said is that **two independent routes into the contractual instrument have not produced a region clause** — `EV-102-220` reading the Service Terms directly, and this page pointing at them. That is the strongest position short of a full parse, and it is not the same as a full parse. |
| **Superseded** | **In whole by `EV-102-239`**, which parses the primary instrument. This record's premise — that the DPA's incorporation into the Service Terms makes `EV-102-220`'s partial read of the Service Terms a second route into the DPA — is wrong. **Incorporation by reference does not merge texts**: the DPA is a separate instrument with its own numbering, and its §12.1 states the clause this record reports as absent. Retained rather than deleted so the error stays visible, on the precedent §4.6 set. |
| Re-verify by | February 28, 2027 |

### EV-102-239 — The AWS DPA states the Region commitment contractually, at §12.1

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **region element** for C2, category **X** (`OQ-108-017`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"AWS Data Processing Addendum"*, the PDF itself, supplied by the Product Owner on August 29, 2026. Parsed in full — §1 through §17 and Annex 1. |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium |
| Content | §12.1 *"Regions"*: *"Customer can specify the location(s) where Customer Data will be processed within the AWS Network (each a “Region”), including Regions in the EEA. Once Customer has made its choice, AWS will not transfer Customer Data from Customer's selected Region(s) except as necessary to provide the Services initiated by Customer, or as necessary to comply with the law or valid and binding order of a governmental body."* §17 defines *"Region"* by reference to §12.1, and §6.1(iii) operates on the term: a customer objecting to a sub-processor may *"move the relevant Customer Data to another Region where AWS has not engaged the Sub-processor."* |
| **Scope condition** | §17 defines *"Customer Data"* as *"the Personal Data that is uploaded to the Services under Customer's AWS accounts."* The commitment therefore reaches **personal data only**. `EV-102-235`'s compliance-FAQ wording was *"your content"*, unqualified — so **the contractual commitment is narrower in scope than the Asserted one it replaces**, which is the opposite of what an upgrade in evidence class ordinarily means. `OQ-108-021`. |
| **Subordination** | §16: *"If there is a conflict between the Agreement and this DPA, the terms of this DPA will control, except that the Service Terms will control over this DPA."* `EV-102-220` read the Service Terms without finding a region clause, so no conflict is known and §12.1 stands — but it stands beneath an instrument that does not restate it. `OQ-108-020`. |
| Limitations | **The carve-out is contractual, not a gloss.** *"except as necessary to provide the Services initiated by Customer"* is `EV-102-235`'s open-ended qualifier almost verbatim, so reaching the contract ratifies it rather than resolving it, and its scope is defined nowhere in the DPA. The document carries **no version number and no effective date anywhere in its text**, so `Re-verify by` cannot be anchored to a document version. This record establishes the **region element only** — §12.1 says nothing about backup retention or expiry, which `EV-102-240` addresses. It is a reading of a contract by a non-lawyer, which disposition register §6 already records as true of every contractual statement in the CBD-15 packages. |
| Supersedes | **`EV-102-238` in whole** — the clause it reports as absent is present. **`EV-102-170` in whole** — the DPA is no longer unparsed, and that record has been load-bearing since tranche 2. **`EV-102-235` in part** — its Asserted class no longer decides the region element, though its carve-out finding survives into this record. |
| Re-verify by | Contract term or amendment |

### EV-102-240 — The AWS DPA assigns backup and archiving to the customer

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **retention and expiry elements** for C2, category **X** — **negative record** (`OQ-108-017`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"AWS Data Processing Addendum"*, as `EV-102-239` |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium — what is contractual is the **allocation**, not a backup term |
| Content | §5.2 lists, among measures *"Customer can elect to implement"*, *"measures to allow Customer to backup and archive appropriately in order to restore availability and access to Customer Data in a timely manner in the event of a physical or technical incident"*. §8 makes Customer responsible for *"using the Service Controls to allow Customer to restore the availability and access to Customer Data in a timely manner in the event of a physical or technical incident (for example backups and routine archiving of Customer Data)"*. Annex 1 §1.2.B commits AWS to *"implement redundant systems for the AWS Network designed to minimize the effect of a malfunction on the AWS Network"* — availability engineering, not a backup term. §14 gives a return-or-delete right *"for 90 days following the Termination Date"*. |
| **Why this is not silence** | `HG-102-013`'s pass test ends *"Silence fails"*. **The DPA does not fall silent on backups. It allocates them to the customer** and commits AWS to redundancy instead. The gate asks for *"provider-controlled backup behaviour"*, and this instrument's answer is that under it there is none to state. That is a more specific finding than silence, and unlike silence it is not one a further parse of the same document can overturn. |
| Limitations | **The DPA is not the only AWS instrument.** C1's retention and expiry elements come from the CDPA (`EV-102-168`), a document separate from the Service Specific Terms that carry its region element; **no AWS equivalent has been identified**, and this record does not establish that none exists — `OQ-108-022`. §14's 90 days is a **deletion right on termination**, not a backup expiry term, and must not be read as one. Service-level backup behaviour — RDS automated backups and their retention range — is a different question, carried at `OQ-108-006`. |
| Re-verify by | Contract term or amendment |

### EV-102-241 — The Microsoft Azure Core Services list

| Field | Content |
| --- | --- |
| Claim | Scope condition on `EV-102-237`, for C3, category **X** (`OQ-108-018`) |
| Provider / category | Microsoft Azure (C3) / X |
| Source | *"Privacy & Security Terms"*, `https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/all`, **Core Online Services → Microsoft Azure Core Services** |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium — the list is the set `EV-102-237`'s commitment operates on |
| Content | The section enumerates the Azure services the Geo commitment covers. Present among them: **Azure Container Apps**, **API Management**, **Application Gateway**, **Service Bus**, **Key Vault**, **Azure Monitor**, **Azure Database for PostgreSQL**, **Azure Communication Services**, **Microsoft Entra ID**, **Azure DNS**, **Load Balancer**, **Traffic Manager**, **Virtual Network**, **Azure Firewall**, **Storage**, **Backup**, **Site Recovery**, **Azure Kubernetes Service**, **Azure Cosmos DB**, **SQL Database**. The section also carries the qualifier: *"Certain services may not enable Customer to configure deployment in a particular Geo or outside the United States and may store backups in other locations."* |
| Limitations | **The list as retrieved may be incomplete.** It was returned as a long enumeration from a very large page, and this pass cannot confirm it was rendered in full. **Absence of a service from the list as recorded here is therefore not evidence that it is absent from the list itself** — the same care `EV-102-224` required. `OQ-108-023` carries the two services this matters for. |
| Re-verify by | Contract term or amendment |

### EV-102-242 — Microsoft Entra External ID selects a geo-location, at North America granularity, once

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` region element and `HG-102-011` for C3, category **I** (`OQ-108-016`) |
| Provider / category | Microsoft Entra External ID (C3) / I |
| Source | *"Microsoft Entra ID and data residency - Microsoft Entra \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/entra/fundamentals/data-residency` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"Microsoft Entra External ID is a customer identity and access management (CIAM) solution with the option and flexibility to store and manage data in a separate tenant created for your customer-facing apps and customer directory data. This tenant is called an external tenant. **When you create an external tenant, you have the option to select the geographic location** (shown as 'Country/Region' in the admin portal) for data storage. **It's important to note that the data locations and region availability may differ from those of Microsoft Entra ID**, as indicated in this article."* The selectable geo-locations are **Australia, Asia/Pacific, EMEA, Japan, North America, Worldwide** — with Australia and Japan *"available for external tenants with the Go-Local add-on"*, a **paid** add-on whose local-residence option currently covers only Australia and Japan. *"Tenant location can't be changed after it's set."* |
| **Two further data-location facts** | **Multifactor authentication** data is recorded as residing *"North America and/or in geo location"*, and the service *"logs the User Principal Name (UPN), voice-call telephone numbers, and SMS challenges"*. **Managed identities** write issued certificates to *"Azure Cosmos DB in the East US region"*, and *"Database replication puts a read-only copy in each region that Microsoft Entra managed identities runs."* |
| Limitations | Documentation, not the Product Terms. It establishes that an external tenant **can** select a geo-location — which is the opposite of what a naive reading of `EV-102-236` would suggest — but the selectable unit is a **geo-location such as North America**, not an Azure region and not the United States. The managed-identity replication statement is about the Microsoft Entra managed-identity service generally; whether CoBudget's C3 composition depends on it was not established. |
| Re-verify by | February 28, 2027 |

### EV-102-243 {D} The AWS Customer Agreement holds content for 30 days after termination, and states no retention or expiry term

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **retention and expiry elements** for C2, category **X** (`OQ-108-022`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"AWS Customer Agreement"*, `https://aws.amazon.com/agreement/`, {S}5.3(b). Effective date shown on the page: **August 14, 2026** |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium |
| Content | {S}5.3(b) *"Post-Termination"*: *"Unless we terminate your use of the Services pursuant to Section 5.2(b), during the 30 days following the Termination Date: (i) we will not take action to remove from the AWS systems any of Your Content as a result of the termination; and (ii) we will allow you to retrieve Your Content from the Services only if you have paid all amounts due under this Agreement."* |
| **Why this is not the term the gate asks for** | It is a **floor, not a retention period**. AWS undertakes **not to delete** for 30 days; it does not state how long AWS holds Your Content, how long it holds backups of it, or a maximum period after which copies are gone. The C1 benchmark (`EV-102-168`, Google CDPA {S}6.2) states both a recovery window **and** a 180-day maximum reaching *"existing copies"*. {S}5.3(b) states neither. |
| Limitations | **This is the third and last general AWS instrument.** The Customer Agreement had not been retrieved anywhere in the corpus before this record. It does not follow that no AWS document states the term {D} {S}1.15 of the Service Terms defers it to per-service technical documentation (`EV-102-220`), and that documentation is unread (`OQ-108-025`). The words *"backup"* and *"archive"* appear in the Customer Agreement only at {S}2.3 (`EV-102-244`). Retrieval passed through a page-to-markdown extraction step rather than a locally parsed file, so provenance is weaker than `EV-102-239`'s; the section numbering and wording were obtained twice on differently framed prompts and were stable. **Published reseller and historical copies use a different numbering** ({S}7.3, {S}7.2(b), *"we will not erase"*); the live agreement is {S}5.3(b), *"we will not take action to remove"*. |
| Re-verify by | Contract term or amendment |

### EV-102-244 {D} The AWS Customer Agreement assigns backup to the customer, restating the DPA's allocation

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **retention and expiry elements** for C2, category **X** {D} corroborating record (`OQ-108-022`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"AWS Customer Agreement"*, `https://aws.amazon.com/agreement/`, {S}2.3 |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium |
| Content | {S}2.3 is headed *"Your Security and Backup"*: *"You are responsible for properly configuring and using the Services and otherwise taking appropriate action to secure, protect and backup your accounts and Your Content in a manner that will provide appropriate security and protection, which might include use of encryption to protect Your Content from unauthorized access and routinely archiving Your Content."* |
| **What it adds** | A **second instrument** making the allocation `EV-102-240` found at DPA {S}5.2 and {S}8. Two AWS contracts now assign backup and archiving to the customer, in a section the Customer Agreement titles *"Your Security and Backup"*. `EV-102-240`'s finding {D} that for C2 the retention and expiry elements fail by **allocation** rather than by silence {D} rests on two independent instruments rather than one. |
| Limitations | **Corroborates; moves nothing.** Register {S}3.1 is explicit that repetition is not corroboration for *confidence*, and this record does not raise `EV-102-240`'s. What it establishes is that the allocation is the settled position of the AWS contract set rather than a feature of one document. It does not establish that AWS holds no backups, only that no AWS instrument read so far undertakes anything about them. |
| Re-verify by | Contract term or amendment |

### EV-102-245 — Front Door is absent from the Azure Core Services list; Logic Apps is present, inside the App Service entry

| Field | Content |
| --- | --- |
| Claim | Scope condition on `EV-102-237`, for C3, category **X** (`OQ-108-023`) |
| Provider / category | Microsoft Azure (C3) / X |
| Source | *"Privacy & Security Terms"*, `https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/all`, **Core Online Services → Microsoft Azure Core Services** |
| Retrieval date | August 29, 2026 |
| Class / confidence | **Contractual** / Medium |
| Content | A targeted re-read of the same list `EV-102-241` enumerated, asking only whether two named services appear. **Azure Front Door: absent.** Neither *"Azure Front Door"* nor *"Front Door"* appears. **Logic Apps: present**, not under its own name but within the entry *"App Service (API Apps, Logic Apps, Mobile Apps, WebJobs, Functions)"*. The list runs alphabetically from **Anomaly Detector** to **VPN Gateway** and rendered without truncation on this retrieval. |
| Limitations | Establishes membership for **two named services only**. It does not re-verify the rest of `EV-102-241`'s enumeration, and it does not address the qualifier `EV-102-241` records — that a service may be **on** the list and still not configurable to a Geo, which remains true of both. |
| Refines | **`EV-102-241`**, which recorded both services as *"not seen"*. That record stands as the enumeration; this one corrects what the enumeration implied about Logic Apps. |
| Re-verify by | Contract term or amendment |

### EV-102-246 — AWS KMS states a provider-enforced deletion waiting period, and excludes cluster backups from it

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **expiry element** for C2, category **X** (`OQ-108-025`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"Delete an AWS KMS key"*, `https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"AWS KMS never deletes your KMS keys unless you explicitly schedule them for deletion and the mandatory waiting period expires."* On the period: *"AWS KMS requires you to set a waiting period of 7 — 30 days. The default waiting period is 30 days."* And: *"the actual waiting period might be up to 24 hours longer than the one you scheduled."* On completion: *"After the waiting period ends, AWS KMS deletes the KMS key, its aliases, and all related AWS KMS metadata."* |
| **Why this one counts** | **The floor and the ceiling are both enforced by AWS**, not chosen by the customer. This is the **first provider-controlled expiry term found for C2** in the whole pass, and under the §4.24 ruling its Documented class is sufficient. |
| **The backup carve-out** | Scoped to AWS CloudHSM key stores: *"AWS KMS does not delete the key material from cluster backups. Even if you delete the KMS key from AWS KMS and delete its key material from your AWS CloudHSM cluster, clusters created from backups might contain the deleted key material."* **A documented statement that deletion does not reach backups**, which is the element `HG-102-013` is named for. |
| Limitations | Covers **key material only**, not the data encrypted under it, and the deletion path is customer-initiated throughout. The carve-out is scoped to CloudHSM custom key stores; whether CoBudget's C2 composition uses one is not established here and is not assumed. Retrieval passed through a page-to-markdown extraction step. |
| Re-verify by | February 28, 2027 |

### EV-102-247 — The Secrets Manager recovery window has a stated minimum that the same page documents how to bypass

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **retention element** for C2, category **X** — **negative record** (`OQ-108-025`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"Delete an AWS Secrets Manager secret"*, `https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage_delete-secret.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"Secrets Manager does not immediately delete secrets. Instead, Secrets Manager immediately makes the secrets inaccessible and scheduled for deletion after a recovery window of a minimum of seven days."* |
| **Why it is registered as negative** | The same page documents the override: `--force-delete-without-recovery` *"deletes a secret immediately without a recovery window. You can't recover this secret."* **A minimum the customer can elect out of is not a provider-controlled retention term**, which is what `HG-102-013` asks for and what its gate statement says *"cannot be assumed from CoBudget's own backup policy"*. |
| Limitations | Establishes the default-path minimum and its override, not what Secrets Manager retains internally after either. Says nothing about backups of the secret store. |
| Re-verify by | February 28, 2027 |

### EV-102-248 — Amazon RDS documents provider-side recovery for six days after deletion, and cross-Region backups that survive it

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **retention and region elements** for C2, category **X** (`OQ-108-025`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"Deleting a DB instance"*, `https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Provider-side recovery after deletion**: *"If you need to restore an unintentionally deleted instance, contact the AWS Support team immediately. Recovery might be possible for up to six days after the deletion request."* **Customer-configured retention**: *"If you retain automated backups, RDS keeps them for the retention period that is in effect for the DB instance at the time when you delete it."* **Cross-Region survival**: *"If your automated backups have been replicated to another AWS Region, RDS keeps them even if you don't choose to retain automated backups."* And: *"When you delete your DB instance, RDS doesn't delete manual DB snapshots."* |
| **The six days is the finding** | It is a **provider-held copy that outlives the customer's deletion**, disclosed in documentation and configured by no one. It is the closest thing in the AWS set to the *"existing copies"* language Google's CDPA §6.2 uses (`EV-102-168`) — but it is stated as *"might be possible"*, which describes a capability rather than undertaking a period. |
| **The cross-Region clause bears on region, not only expiry** | Replicated automated backups are kept *"even if you don't choose to retain automated backups"*. That is a documented path by which AWS-held copies survive a deletion **and** sit outside the deployment Region. `OI-103-001` fixes a single United States region and CoBudget replicates nothing, so this does not bite today; it is registered because it is a provider behaviour that customer deletion does not reach. |
| Limitations | Written about **customer-initiated instance deletion**, not about AWS's own backups of the platform. The six-day statement is about what Support *might* achieve, and no clause undertakes that copies are gone at any point. |
| Re-verify by | February 28, 2027 |

### EV-102-249 — CloudWatch Logs retains indefinitely by default and states an unbounded tail on deletion

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **retention and expiry elements** for C2, category **X** — **negative record** (`OQ-108-025`) |
| Provider / category | Amazon Web Services (C2) / X |
| Source | *"Working with log groups and log streams"*, `https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Default**: *"By default, log data is stored in CloudWatch Logs indefinitely. However, you can configure how long to store log data in a log group. Any data older than the current retention setting is deleted."* **The tail**: *"CloudWatch Logs doesn't immediately delete log events when they reach their retention setting. It typically takes up to 72 hours after that before log events are deleted, but in rare situations might take longer."* |
| **Why this is the sharpest negative in the set** | The retention period is customer-configured, and the provider's actual deletion lags it by a period AWS states as typical and then **explicitly declines to bound** — *"might take longer"*. **A retention term with an unbounded tail is not a retention term.** `HG-102-013` asks for the provider's expiry; this page states that the provider's expiry is the customer's setting plus an unspecified amount. |
| **Second finding** | The **default is indefinite**. Absent deliberate configuration, CoBudget's C2 logs are retained forever, which bears on `HG-102-003`'s distinct-retention requirement as much as on this gate. |
| Limitations | Concerns log data in CloudWatch Logs, not other C2 components. Does not establish what AWS retains internally beyond the deletion it describes. |
| Re-verify by | February 28, 2027 |

### EV-102-250 — Amazon SQS bounds message retention at fourteen days, a ceiling the customer cannot raise

| Field | Content |
| --- | --- |
| Claim | `DI-91-*` inventory for C2, category **H** (`OQ-108-030`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"Amazon SQS message quotas"*, `https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Message retention: *"By default, a message is retained for 4 days. The minimum is 60 seconds (1 minute). The maximum is 1,209,600 seconds (14 days)."* |
| **The ceiling is the finding** | The period is customer-set within bounds AWS fixes, and **the upper bound is a provider-enforced maximum**: a message cannot persist in SQS beyond 14 days whatever the customer configures. That is the **opposite shape** from `EV-102-249`'s CloudWatch Logs, which defaults to indefinite retention and bounds nothing. Two components of the same composition sit at opposite extremes. |
| Limitations | Concerns messages in the queue, not dead-letter queues configured separately, and not whatever SQS retains internally after expiry. `HG-102-013` is **not** in play: this is a customer-set period inside provider bounds, which §4.30 established is not what that gate asks for. Two earlier retrievals against other SQS pages returned no retention statement; this is the third attempt and the first to render it, and the two failures are not evidence of absence — `EV-102-219` and `EV-102-226` are the precedents. |
| Re-verify by | February 28, 2027 |

### EV-102-251 — EventBridge Scheduler does not delete a recurring schedule that has no end date

| Field | Content |
| --- | --- |
| Claim | `DI-91-*` inventory for C2, category **H** (`OQ-108-030`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"Deleting a schedule in EventBridge Scheduler"*, `https://docs.aws.amazon.com/scheduler/latest/UserGuide/managing-schedule-delete.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Automatic deletion is opt-in: *"When you configure automatic deletion for a schedule, EventBridge Scheduler deletes the schedule after its last target invocation."* For recurring schedules the last invocation is the one *"closest to the `EndDate` you specify"*. And the condition that matters: *"If you configure a schedule with automatic deletion but do not specify a value for `EndDate`, EventBridge Scheduler does not automatically delete the schedule."* |
| **Why it matters for the inventory** | `TD-103-004` specifies a **recurring** fifteen-minute tick, which by its nature carries no end date. **So the schedule definition and its target payload persist until something deletes them**, and nothing on this page undertakes that anything will. This is the C2 analogue of what §4.17 recorded for C1's Cloud Scheduler — job definitions, target URLs and payloads rather than customer financial data — now with a documented default of indefinite persistence. |
| Limitations | **No retention period is stated anywhere on this page**, and its absence is what is registered. Establishes the deletion behaviour of the schedule resource, not what EventBridge Scheduler retains internally after a schedule is deleted, and not what the invocation history holds. |
| Re-verify by | February 28, 2027 |

### EV-102-252 — CloudWatch Logs scopes IAM to an individual log group, by ARN and by tag

| Field | Content |
| --- | --- |
| Claim | `HG-102-026` **pass test** for C2, category **H** (`OQ-108-034`, `OQ-103-009`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"Using identity-based policies (IAM policies) for CloudWatch Logs"*, `https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-identity-based-access-control-cwl.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / **High** — the page carries working policy documents, not prose about them |
| Content | **By ARN.** *"Log group: `arn:aws:logs:{region}:{account}:log-group:{LogGroupName}`"*, with a worked example scoping log-group actions to one group: *"Resource": "arn:aws:logs:us-west-2:123456789012:log-group:SampleLogGroupName"*. A second example scopes log-stream actions with the `:*` suffix. **By tag.** *"You can grant users access to certain log groups while preventing them from accessing other log groups. To do so, tag your log groups and use IAM policies that refer to those tags."* |
| **What it establishes for the test** | `HG-102-026`'s pass test asks that *"Two distinct destinations with distinct access roles are configurable"*. A log group is a distinct destination, and access to it is grantable independently of any other log group by two separate mechanisms. **The three-destination arrangement `TD-103-021` specifies is reachable the same way** — log groups are ordinary resources, so three cost no more configuration than two. |
| Limitations | **Two operations cannot be resource-scoped.** The page states that for `StopQuery` and `StopLiveTail` *"you must set the value of the `Resource` field as `*`"*, because they act on a session or query rather than a resource. Neither reads log content, so this does not breach the boundary the gate protects, but a role holding them holds them across all log groups. **This is a configuration capability, not an observation**: it establishes that the separation is configurable, not that CoBudget has configured it. `HG-102-026` is typed **Config** in the catalog, so the remaining work is CoBudget's own. |
| Re-verify by | February 28, 2027 |

### EV-102-253 — CloudWatch Logs redaction is pattern matching at ingestion, the mechanism `TD-103-022` rejects

| Field | Content |
| --- | --- |
| Claim | `HG-102-026` **redaction element** for C2, category **H** — **qualifying record** (`OQ-108-034`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"Help protect sensitive log data with masking"*, `https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Scope: policies *"let you audit and mask sensitive data that appears in log events ingested by the log groups in your account"*, and can be set *"for all log groups in your account"* or *"for individual log groups"*. Access: *"Only users who have the `logs:Unmask` IAM permission can view unmasked data."* Timing: *"Sensitive data is detected and masked when it is ingested into the log group. When you set a data protection policy, log events ingested to the log group before that time are not masked."* Mechanism: *"CloudWatch Logs data protection allows you to leverage pattern matching and machine learning models to detect sensitive data"*, via **managed data identifiers** for credentials, financial information, PII, PHI and device identifiers, plus custom identifiers. |
| **Why this is registered as qualifying** | `TD-103-022` states CoBudget's position: *"Redaction is structural, not a filter"*, and it names the rejected alternative as *"a redaction filter that strips known-sensitive patterns on the way out"*, rejected because it *"fails open: it removes what it recognizes and forwards what it does not"*. **CloudWatch Logs data protection is that alternative**, and its own documentation states the fail-open property in two forms: detection is by pattern and model against an enumerated identifier set, and events ingested before the policy exists are never masked. |
| **What it does not mean** | **This costs CoBudget nothing.** `TD-103-022` puts redaction in the logger's closed typed field set, so the S1 sink cannot carry an unlisted field and the design does not depend on provider masking. The record exists so a later reader does not cite this feature as satisfying `TD-103-022` — it is the mechanism that requirement was written against. `logs:Unmask` is noted because it is a genuinely distinct permission, and would matter if masking were ever relied on. |
| Re-verify by | February 28, 2027 |

### EV-102-254 — Google Cloud Logging restricts access per log view, with a dedicated IAM role

| Field | Content |
| --- | --- |
| Claim | `HG-102-026` **pass test** for C1, category **H** (`OQ-108-037`, `OQ-103-009`) |
| Provider / category | Google Cloud (C1) / H |
| Source | *"Configure log views on a log bucket"*, `https://docs.cloud.google.com/logging/docs/logs-views` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Purpose: *"Log views let you grant a user access to only a subset of the logs stored in a log bucket."* Role: **`roles/logging.viewAccessor`**. Mechanism: *"To grant a principal access to only a specific log view… Create an IAM policy for the log view, and then add an IAM binding to that policy which grants the principal access to the log view."* Effect: a project owner *"can then grant each user access to one or more log views, and thereby restrict which logs the users can view."* |
| **What it establishes for the test** | Two log views on a bucket are two distinct destinations, and `roles/logging.viewAccessor` is grantable on one without the other. **The pass test is met for C1.** The three-destination arrangement `TD-103-021` specifies follows the same way. |
| Limitations | **The retrieval found no statement about broader roles overriding a log-view restriction**, and its absence is registered rather than read as reassurance — a project-level logging role that confers read access regardless of view bindings would defeat the separation, and this page does not say whether one exists. `OQ-108-038`. The page notes only that *"IAM evaluates all applicable policies, with the first evaluation at the resource level."* As with C2 this is a **configuration capability, not an observation**, and `HG-102-026` is typed `Config`. The original URL redirected; the record cites the destination that served the content. |
| Re-verify by | February 28, 2027 |

### EV-102-255 — Azure Monitor separates log access by table, with a deny-by-default mode that is in preview

| Field | Content |
| --- | --- |
| Claim | `HG-102-026` **pass test** for C3, category **H** (`OQ-108-037`, `OQ-103-009`) |
| Provider / category | Microsoft Azure (C3) / H |
| Source | *"Manage access to Log Analytics workspaces"*, `https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-access`. Page `ms.date` 2026-06-22, updated 2026-08-25 |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Per-table permission**: *"Access a specific log table - legacy method"* via `Microsoft.OperationalInsights/workspaces/query/<table_name>/read`, with **granular RBAC** described as *"the recommended method for table and row-level access control"*. **Deny by default**: protected tables provide *"a 'deny by default' isolation model for sensitive telemetry"*, with a `protectionLevel` of `General` or `Protected`; *"When you set a table to `Protected`, users who previously had access through workspace-level or resource-level read roles no longer see data from that table unless they receive an explicit grant."* **Dedicated role**: **Privileged Monitoring Data Reader** *"Provides access to protected tables… without providing broader access to the workspace or other data."* **Closing the bypass**: `DataActionsOnly` mode means *"control plane roles such as Reader and Monitoring Reader… no longer grant implicit data access."* |
| **What it establishes for the test** | Tables are distinct destinations, access is grantable per table, and a named built-in role exists for the restricted tier. **The pass test is met for C3, and by the widest margin of the three.** |
| **Three qualifications** | **Protected tables is a preview feature**, and the page carries a preview limitations table — evidence register treatment of preview functionality applies. **Denial is silent**: *"Queries against protected tables succeed but return no data when the caller lacks access. The query doesn't return a 400 or 403 error."* **Schema is not hidden**: *"Table metadata, including column names and types, is accessible regardless of the protection level."* |
| **Inheritance can defeat it** | The page's own Example 4 warns, of blocking a table by `NonAction`: *"If the user inherits the read action from another role that's assigned to this resource or to the subscription or resource group, they could read all log types."* The separation is only as good as the surrounding assignments, which is a CoBudget configuration obligation rather than a provider limitation. |
| **Cross-link worth carrying** | Privileged Monitoring Data Reader *"works with Microsoft Entra Privileged Identity Management (PIM) for time-bound and just-in-time access"*. **The C3 mechanism that best satisfies this gate is the one whose licensing cost `OQ-108-009` records as unresolved** — `EV-102-229` establishes what PIM requires without establishing that PIM is required. |
| Re-verify by | February 28, 2027 |

### EV-102-256 — Azure PostgreSQL Flexible Server states retention, region and expiry for its own backups

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` — all three elements — for C3, category **D** (`OQ-108-026`) |
| Provider / category | Azure Database for PostgreSQL Flexible Server (C3) / D |
| Source | *"Backup and Restore in Azure Database for PostgreSQL Flexible Server - Azure Database for PostgreSQL \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-backup-restore` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| **Retention** | *"The default backup retention period is seven days, but you can extend the period to a maximum of 35 days."* And: *"You can select a retention period between 7 (default) and 35 days."* |
| **Expiry** | *"The backup files are automatically deleted after the retention period."* And, on server deletion: *"If you delete a server, all backups that belong to the server are also deleted and can't be recovered."* |
| **Region** | Three redundancy options. **Zone-redundant**, the default where availability zones exist, *"restricts replication of data to within a country or region to meet data residency requirements"*. **Locally redundant**, the default elsewhere, *"stores multiple copies of backups in the same datacenter"*. **Geo-redundant** *"replicates the data to a geo-paired region"* and is **opt-in**: *"You can configure geo-redundant storage for backup only during server creation. After a server is provisioned, you can't change the backup storage redundancy option."* |
| **Custody** | *"You can't export these backup files as they're stored in Microsoft-managed storage accounts. You have read-only access to restore these files but can't modify or delete them."* |
| Limitations | **Scoped to the database component of the C3 set, not to the whole composition.** `HG-102-013` is a cross-category **X** gate, so the hosting components — Container Apps, Service Bus, Key Vault, Azure Monitor — are untouched by this record and have no equivalent statement retrieved. It is **Documented**, not Contractual, which the §4.24 ruling makes sufficient for this gate and which would not have been sufficient before it. |
| Supersedes | **`EV-102-221` for this purpose.** That record carried a scope objection — it described Azure Backup Recovery Services vaults rather than the evaluated composition. This record is scoped to an evaluated service and the objection does not apply to it. |
| Re-verify by | February 28, 2027 |

### EV-102-257 — Key Vault soft-delete retention is 7–90 days, on by default, and fixed at creation

| Field | Content |
| --- | --- |
| Claim | `HG-102-013`, `HG-102-014` supporting material for C3, category **H** (`OQ-108-029`) |
| Provider / category | Azure Key Vault (C3) / H |
| Source | *"Azure Key Vault soft-delete \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| **Retention** | *"Once a secret, key, certificate, or key vault is deleted, it remains recoverable for a configurable period of 7 to 90 calendar days. If no configuration is specified, the default recovery period is set to 90 days."* |
| **Expiry** | *"Unless a key vault or key vault object is recovered, at the end of the retention interval the service performs a purge of the soft-deleted key vault or key vault object and its content. Resource deletion can not be rescheduled."* |
| **Fixed at creation** | *"When creating a new key vault, soft-delete is on by default. Once soft-delete is enabled on a key vault, it can't be disabled."* And: *"The retention policy interval can only be configured during key vault creation and can't be changed afterwards."* |
| Purge protection | *"Purge protection is an optional Key Vault behavior and is **not enabled by default**."* When on, *"a vault or an object in the deleted state can't be purged until the retention period passes"*. Once its interval is set, *"it can't be changed for that vault"*. |
| Limitations | **This is a deletion-recovery window, not a provider backup.** Nothing on the page describes Azure taking or holding a backup of vault contents. No region statement appears. The record therefore answers what happens to **deleted** material and does not answer `HG-102-013`'s question about provider-controlled backups. |
| Re-verify by | February 28, 2027 |

### EV-102-258 — Log Analytics retention is 30 days by default, configurable from 4 days to 12 years

| Field | Content |
| --- | --- |
| Claim | `HG-102-013`, `DI-91-041` supporting material for C3, category **H** (`OQ-108-029`) |
| Provider / category | Azure Monitor Logs / Log Analytics (C3) / H |
| Source | *"Manage Data Retention in a Log Analytics Workspace - Azure Monitor \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| **Retention** | *"By default, all tables in a Log Analytics workspace retain data for 30 days, except for log tables with 90-day default retention."* Analytics retention extends *"up to two years"*; total retention including long-term *"up to 12 years (4,383 days)"*. Table-level retention *"can be between 4 and 730"* days. |
| **Expiry** | *"When you shorten a table's total retention, Azure Monitor Logs waits 30 days before removing the data, so you can revert the change and avoid data loss if you made an error in configuration."* An `immediatePurgeDataOn30Days` workspace property is available, described as a *"Flag that indicates whether data is immediately removed after 30 days and is nonrecoverable"*, with the caution that *"Workspaces with 30-day retention might keep data for 31 days."* |
| Limitations | **Retention of primary telemetry, not of a provider backup.** The page describes no Azure-held backup of workspace data. The 31-day observation matters for a lifecycle commitment stated as 30 days, and `immediatePurgeDataOn30Days` is settable only through the update API. |
| Re-verify by | February 28, 2027 |

### EV-102-259 — Service Bus messages expire by TTL, and no provider backup is described

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` for C3, category **H** (`OQ-108-029`) |
| Provider / category | Azure Service Bus (C3) / H |
| Source | *"Azure Service Bus Message Expiration and TTL Explained - Azure Service Bus \| Microsoft Learn"*, `https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-expiration` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Messages carry a time-to-live; *"expires-at-utc"* is *"enqueued-time-utc + time-to-live"*. Entity-level default expiration is *"the largest possible value for a signed 64-bit integer"* on standard and premium tiers, and *"14 days"* on basic. Expired messages are either dead-lettered or, *"If you leave the option disabled, expired messages are dropped."* The broker *"might choose to lazily expire these messages"*, so removal is not instantaneous. |
| **Negative finding** | **No provider-side backup of Service Bus messages is described anywhere on the page.** Messages persist until consumed or expired; nothing states that Azure retains a copy beyond that. |
| Limitations | Establishes the expiry model for messages. It does not address namespace metadata, which geo-disaster-recovery features handle separately and which was not retrieved. |
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

### 4.14 `OQ-108-014` is settled: the regional-only swap moves no gate outcome

The question was whether regional Cloud Armor offers the capability set the
CBD-103 gate matrix relied on when it was evaluated against a global load
balancer. **It does not arise, and four separate checks say so.**

**1 — No WAF gate exists.** Neither the hard-gate catalog nor the evaluation
rubric contains a gate or criterion requiring a web application firewall. The
concern that prompted this question assumed one.

**2 — Cloud Armor is cited by no gate row.** It appears exactly **once** in the
whole CBD-103 package: in the §5 composition line, *"Cloud Armor / HTTPS Load
Balancing"*. No matrix cell, no evidence record, and no finding rests on a Cloud
Armor capability.

**3 — The two edge gates that *are* capability-dependent are already
`UNPROVEN`.** `TD-103-012` and `TD-103-013` do make the edge load-bearing for
rate limiting, and the topology is explicit that header suppression *"is a
genuine differentiator between gateway products"*. But the matrix records both
as unresolved for **all three** candidates:

| Gate | Kind | C1 | Why |
| --- | --- | --- | --- |
| `HG-102-020` uniform throttled response | `OBS` | `UNPROVEN` | Blocked by §3 — observation-bound |
| `HG-102-021` per-surface ceilings | `DOC` | `UNPROVEN` | Not retrieved |

**A swap cannot lower an `UNPROVEN`.** Neither gate is holding a pass that the
change could take away.

**4 — The one edge gate that passes does not depend on the product.**
`HG-102-025`, webhook verification at the edge, is `PASS (design)` of kind
`CFG`, resting on `TD-103-016` — CoBudget's own design record. It is a statement
about what the topology requires, not about what Google supplies, and nothing in
`TD-103-012`'s edge description is global-specific: TLS termination, origin and
input validation, per-surface ceilings, uniform denial shape, and webhook
signature verification are all available on the regional product.

**And the capability is there anyway.** `EV-102-233` records that regional
backend security policies support **rate limiting, WAF, Adaptive Protection, bot
management, TLS fingerprinting and HTTP filtering**, and attach to the
**regional external Application Load Balancer** — which is the product
`EV-102-232` lists under *"Cloud Load Balancing - Regional Load Balancers
(Application, Proxy Network)"*. The swap lands inside the Data Location
commitment rather than beside it.

#### The residual, which is real and is not a blocker

`HG-102-020` and `HG-102-021` are `UNPROVEN` and will be evaluated later. **They
must be evaluated against the regional product, not the global one.** The
header-suppression behaviour `HG-102-020` turns on, and the per-surface policy
attachment across eleven `EP-92-*` entry points that `HG-102-021` requires, are
both configuration surfaces that could differ between the two Cloud Armor policy
types — and `EV-102-233` explicitly does **not** establish parity, only what
regional supports.

So the swap is safe **because nothing currently passes on the global product**,
not because the two products have been shown equivalent. That is a narrower
claim and it is the one the evidence supports.

#### What the composition would look like after the swap

| Component | On the data-residency list? |
| --- | --- |
| Cloud Run | **Yes** |
| Google Cloud Armor | **Yes** |
| Regional Load Balancers (Application) | **Yes** |
| Pub/Sub | **Yes** |
| Secret Manager | **Yes** |
| Cloud KMS | **Yes** |
| Cloud Logging | **Yes** |
| **Cloud Scheduler** | **No** |

**The regional-only swap would leave Cloud Scheduler as the single remaining
uncovered component of the C1 composition**, and `OQ-108-012` — whether
`TD-103-004`'s scheduling requirement must be met by Cloud Scheduler rather than
by the listed Workflows or Eventarc — becomes the last thing between C1 and a
`HG-102-013` region element that covers the whole composition.

### 4.15 The load-balancer swap is executed

CBD-103 was amended on August 29, 2026 and the change is merged and published:
§5's C1 composition now reads **"Cloud Armor on the regional external
Application Load Balancer"**, evaluation and traceability at v1.3, both
Confluence pages at v5. `HG-102-020` and `HG-102-021` each carry a note that
their eventual evaluation for C1 must run against **regional** Cloud Armor
policies.

The runtime topology specification was **not** amended. §7 describes the edge
as an enforcement point in product-agnostic terms — TLS termination, origin and
input validation, per-surface ceilings, uniform denial shape, webhook signature
verification — and names no load-balancer product. That the amendment touched
one document rather than two is a property of how the topology was written.

### 4.16 `OQ-108-012`: Workflows cannot substitute for Cloud Scheduler, and tranche 6 was wrong to suggest it might

**This corrects tranche 6.** That tranche observed that Workflows and Eventarc
are both on the data-residency list and suggested a composition meeting
`TD-103-004` through a listed service *"would close this gap without any new
evidence."* It framed this as a question rather than a claim, which was right,
because the answer is **no** for the leading candidate.

**What `TD-103-004` actually requires.** Each budget space has one IANA time
zone and work runs at local midnight. Time zones exist at **15-minute offset
granularity**, so *"a scheduler firing on the hour cannot align to every local
midnight."* The design is **one frequent tick — at most every 15 minutes** —
selecting spaces whose local date has advanced. That is a cron requirement, not
an orchestration requirement.

**Workflows does not provide one.** `EV-102-234` records that Google's
documented route to running a workflow on a recurring basis is Cloud Scheduler —
the page is titled *"Schedule a workflow using Cloud Scheduler"*. **Substituting
Workflows would not remove Cloud Scheduler from the composition; it would add
Workflows on top of it.**

**What this settles and what it does not.** The Workflows half of `OQ-108-012`
is answered and negative. Two listed services remain unexamined: **Eventarc**,
and **Managed Service for Apache Airflow (formerly Cloud Composer)**, which is
on the General list and does carry a scheduler of its own. Neither was
retrieved, and this pass asserts nothing about them — `OQ-108-015` carries them.
An Airflow deployment to provide a fifteen-minute tick at Private MVP scale
would be disproportionate on its face, but "disproportionate" is a judgment, not
a retrieval, and it is not this document's to make.

### 4.17 Where C1 now stands, and why it is a CBD-108 problem rather than a CBD-103 one

After the swap, the C1 composition is **entirely inside the Data Location
commitment except for Cloud Scheduler**.

| Component | On the data-residency list? |
| --- | --- |
| Cloud Run, Google Cloud Armor, Regional Load Balancers (Application), Pub/Sub, Secret Manager, Cloud KMS, Cloud Logging | **Yes** |
| **Cloud Scheduler** | **No** |

**The cheap fix is gone.** Tranche 6 held out the possibility that both gaps
were closable by composition change with no new evidence. One was, and it has
been. **The other is not**, on the evidence now in hand: the scheduler is
required, it is not on the list, and the substitute this pass proposed does not
substitute.

Three routes remain, and none is a retrieval:

1. **Accept and record.** `HG-102-013`'s region element covers seven of eight
   components; Cloud Scheduler sits outside it. Whether that is acceptable
   depends on what Cloud Scheduler holds — job definitions, target URLs, and
   payloads, not customer financial data — and it is a Product Owner judgment
   against `DI-91-*` classes, not a gate reading.
2. **Ask Google.** Whether a region commitment covers Cloud Scheduler by another
   route is a question only the provider can answer. That is class `D4` in the
   carried-item register, the class no amount of reading closes.
3. **Weigh it in the hosting selection.** C2 and C3 have their own equivalents of
   this question, entirely unexamined — this pass has looked at Google's
   data-residency list and at neither of the others'.

**Route 3 is the one CBD-108 must not skip.** Nine tranches have examined C1's
region position in detail and the other two candidates' not at all. A selection
that treated C1 as the risky option because it is the documented one would be
making exactly the mistake `OI-106-018` warns about in another category:
mistaking an asymmetry of retrieval for an asymmetry of risk. `OI-108-023`
records it.

### 4.18 The same question put to C2 and C3, and it inverts the picture

`OI-108-023` recorded that nine tranches had examined C1's region position and
the other two candidates' not at all, and warned that a selection could mistake
an asymmetry of retrieval for one of risk. **The warning was correct, and the
correction runs further than expected.**

| | **C1 Google** | **C2 AWS** | **C3 Azure** |
| --- | --- | --- | --- |
| Where the commitment lives | **Service Specific Terms §1** — a contract | Compliance FAQ page | Documentation page |
| Evidence class | **Contractual** | **Asserted** | Documented |
| Granularity | **Region**; backups within the country of that region | Region | **Geo** — coarser than a region |
| Scope model | Explicit **per-service list** | **Blanket, no list** | *"Most"* services, with a named exceptions list and named non-regional services |
| Carve-out | Conditional on the service being listed | *"except as necessary to provide the services you initiated"* — open-ended | Named service exceptions, plus non-regional services |
| Gap found in CoBudget's composition | **Cloud Scheduler**, 1 of 8 components | **Cannot be determined — there is no list to check** | **Microsoft Entra ID is named non-regional** |

**Only C1's region commitment is contractual.** That is the finding that
reverses the position. `HG-102-013`'s pass test requires provider backup
behaviour to be *"stated contractually"*, and evidence register §3.2 is explicit
that a hard gate never passes on Asserted evidence alone. C2's region statement
sits on a compliance FAQ; `EV-102-220` already established that the AWS
**Service Terms** contain no region clause and `EV-102-170` that the DPA could
not be parsed. C3's sits in documentation, and the Product Terms were not
retrieved at all.

**C1 looked worse because it publishes a list you can check against.** Nine
tranches found one uncovered component in the C1 composition. The equivalent
exercise cannot be performed for C2 at all — a blanket commitment with no
service list yields no gap because it admits no check, which is not the same as
having no gap. **The absence of a finding for C2 is an absence of evidence.**

**And the C3 finding is worse than C1's, not better.** Azure names **Microsoft
Entra ID** among services that do not let the customer specify a region.
CoBudget's C3 **identity** candidate is Microsoft Entra External ID. If that
naming reaches it, the uncovered component in the C3 set is the **identity
provider** — which holds authentication material — where the uncovered
component in the C1 set is a **scheduler**, holding job definitions and target
URLs. `OQ-108-016` puts the question, because "Entra ID" and "Entra External
ID" are distinct products and this pass will not assume the naming transfers.

This is the second finding of its kind against C3's identity candidate.
`EV-102-012` already records that **Entra External ID is absent from the
Customer Lockbox supported-services list**, which the coherence review §4.7
identified as the one live contradiction in the whole set. Two independent
retrievals now point at the same component from different directions.

**The granularity difference is the quiet one.** `OI-103-001` fixes a single
United States deployment region. C1 commits at region level and bounds backup
replication to the country. C2 commits at region level. **C3 commits at Geo
level**, and a Geo contains many regions — so a commitment honoured to the
letter still permits customer data to sit in a different region from the one
CoBudget deploys to. Whether that matters is a Product Owner judgment against
`DI-91-*`, but it is a real difference between the three that no evaluation has
recorded.

**What this does not establish.** Neither C2's nor C3's contractual instruments
have been read — the AWS DPA is unparsed and the Microsoft Product Terms were
never fetched. **Both may state the commitment contractually**, in which case
both records here are superseded and the comparison changes again. That is the
work `OQ-108-017` names, and until it is done the honest summary is not that C1
is best but that **C1 is the only one whose position has been established at
all**.

### 4.19 `OQ-108-017` settled — and it corrects tranche 10

> **The C2 half of this section is wrong and is corrected at §4.20.** The AWS DPA does state the region commitment contractually. The section is left as written because the correction ledger below is about exactly this kind of error.

Tranche 10 concluded that **only C1's region commitment is contractual**. That
was true of what had been retrieved and is **not true of what exists**. C3's is
contractual too, in the Product Terms.

| | **C1 Google** | **C2 AWS** | **C3 Azure** |
| --- | --- | --- | --- |
| Contractual region commitment | **Yes** — Service Specific Terms §1 | **Not found**, by two routes | **Yes** — Privacy & Security Terms |
| Granularity | **Region**, backups within the country | — | **Geo** — contains many regions |
| Scope condition | Service must be on the data-residency list | — | Service must be a **Core Service** *and* configurable to a Geo |
| Covered set enumerated? | **Yes** — and checkable | — | **No** — "Core Services" not retrieved |
| Known uncovered component | **Cloud Scheduler**, 1 of 8 | Undeterminable | **Entra ID** named non-regional |

**C1 and C3 have the same shape.** Both make a contractual commitment
conditional on the service falling in a covered set, and in both cases a
component of CoBudget's composition sits outside it. The difference is that
**Google enumerates the set and Microsoft does not** — `EV-102-218`'s condition
could be checked against the composition in tranche 6, and `EV-102-237`'s
cannot, because *"Microsoft Azure Core Services"* was not retrieved
(`OQ-108-018`).

**C2 is the one that has not improved.** The DPA turns out to live **inside the
Service Terms** — the instrument `EV-102-220` already read and found to carry no
region clause. So the contractual instrument has now been approached twice, from
two directions, without producing the region element. The commitment exists only
on a compliance FAQ, which §3.0.1 classes **Asserted** and §3.2 forbids a hard
gate from passing on.

**That is the strongest position short of a full parse, and it is not a full
parse.** The Service Terms are very long and both retrievals were partial. The
honest statement is that the clause **has not been found**, not that it is
**not there** — and `HG-102-013`'s *"Silence fails"* turns on the latter.

#### Three corrections this pass has now made to itself

Worth collecting, because the pattern is consistent and it is not flattering.

| Tranche | Claim | Corrected by | Direction |
| --- | --- | --- | --- |
| 2 | C1 is *"one retrieval away"* from a `HG-102-013` `PASS` | 3 | Against |
| 3 | Secret Manager is absent from the data-residency list | 6 | For |
| 6 | Cloud Scheduler *"plausibly has a like-for-like substitute"* | 9 | Against |
| 10 | Only C1's commitment is contractual | **11** | **For C3** |

**Every correction came from retrieving one more thing.** None came from
re-reasoning over evidence already held. That is an argument for continuing the
pass rather than concluding from it, and it is the strongest available evidence
for `OI-108-017`'s claim that the `D3` block is the cheapest work in the corpus.

#### What the region dimension now supports

**Not a ranking.** `HG-102-013` remains `UNPROVEN` for all three candidates, and
this pass moves no gate outcome. What has changed is that the reasons are now
different and specific:

* **C1** — contractual, enumerated, one composition component outside it.
* **C2** — no contractual clause found by two routes; only an Asserted
  statement, which cannot pass the gate.
* **C3** — contractual, **not** enumerated, coarser granularity, and one
  composition component named as outside it.

**All three still need their retention and expiry elements**, which this
dimension does not touch. `EV-102-168` supplies them for C1 alone.

### 4.20 The DPA read directly: C2's commitment is contractual, and tranche 11 was wrong

The Product Owner supplied the AWS DPA as a PDF on August 29, 2026. It parses in
full — §1 through §17 and Annex 1 — and the clause `EV-102-238` reports as
absent is §12.1, headed **"Regions"**:

> *"Customer can specify the location(s) where Customer Data will be processed
> within the AWS Network (each a “Region”)... Once Customer has made its choice,
> AWS will not transfer Customer Data from Customer's selected Region(s) except
> as necessary to provide the Services initiated by Customer, or as necessary to
> comply with the law or valid and binding order of a governmental body."*

`EV-102-239` registers it. **`HG-102-013`'s region element is stated
contractually for C2**, and evidence register §3.2's bar on a hard gate passing
by Asserted evidence no longer applies to it.

#### The error was an inference, not a miss

This matters more than the fact corrected. `EV-102-238` reasoned that the DPA is
**incorporated into** the AWS Service Terms, that `EV-102-220` had read the
Service Terms without finding a region clause, and therefore that *"two
independent routes into the contractual instrument have not produced a region
clause."*

**Incorporation by reference does not merge texts.** The DPA is a standalone
instrument with its own numbering, its own definitions in §17, and — at
§16 — its own conflict rule for reconciling itself with the Service Terms,
which a document that *was* the Service Terms would not need. Reading the
Service Terms establishes nothing about §12.1 of the DPA.

So there were never two routes. There was one partial parse of a **different**
document, plus a page describing **where** the DPA lives. `EV-102-238` classed
itself Documented on the express grounds that *"what is documented is where the
instrument lives"* — which is correct, and is precisely why it could not carry
a finding about what the instrument says. The record's own limitations field
drew the right line and its conclusion crossed it.

#### The corrected picture

| | **C1 Google** | **C2 AWS** | **C3 Azure** |
| --- | --- | --- | --- |
| Contractual region commitment | **Yes** — Service Specific Terms §1 | **Yes** — DPA §12.1 | **Yes** — Privacy & Security Terms |
| Granularity | **Region**, backups within the country | **Region**, no backup locality bound | **Geo** — contains many regions |
| Scope condition | Service on the data-residency list | **None by service** — but **personal data only** (§17) | Service is a **Core Service** *and* configurable to a Geo |
| Covered set enumerated? | **Yes** — and checkable | Not applicable — no service list, none needed | **No** — "Core Services" not retrieved |
| Known uncovered component | **Cloud Scheduler**, 1 of 8 | **None by service**; non-personal data is outside | **Entra ID** named non-regional |
| Subordinate to another instrument? | No | **Yes** — §16, Service Terms control | No |

**All three commit contractually.** Tranche 10 said only C1 did; tranche 11
corrected that to C1 and C3; the answer is all three. The two tranches that got
it wrong both reasoned about the DPA from secondary sources, and they reached
**opposite** wrong answers about the same document.

#### The upgrade is not an improvement

C2's position improves in class and worsens in three other ways at once.

* **The scope contracts.** §17 defines *"Customer Data"* as *"the Personal
  Data that is uploaded to the Services under Customer's AWS accounts."*
  `EV-102-235`'s FAQ said *"your content"*, unqualified. **The contractual
  commitment covers less than the Asserted one it replaces** — anything
  CoBudget holds in AWS that is not Personal Data under Applicable Data
  Protection Law falls outside §12.1 by its own definition. `OQ-108-021` puts
  that against the `DI-91-*` classes, because whether CoBudget has such data is
  a question about CoBudget, not about AWS.
* **It is subordinated.** §16: *"the Service Terms will control over this
  DPA."* The governing instrument is the one `EV-102-220` read and found to say
  nothing about regions. Silence is not conflict, so §12.1 stands — but a
  future Service Terms provision would override it without amending it.
  `OQ-108-020`.
* **The carve-out is contractual.** *"except as necessary to provide the
  Services initiated by Customer"* is the FAQ qualifier almost verbatim.
  Tranche 10 flagged it as open-ended and undefined and hoped the contract would
  bound it. The contract **is** where it comes from.

#### `HG-102-013` for C2, recomputed

The pass test wants three elements: *"the provider's backup retention, region,
and expiry."*

| Element | Position after `EV-102-239`—`240` |
| --- | --- |
| **Region** | **Stated contractually.** §12.1, personal data only |
| **Retention** | **Assigned to the customer.** §5.2, §8 |
| **Expiry** | **Assigned to the customer.** Same clauses; §14's 90 days is a deletion right on termination, not a backup expiry |

**The gate still fails for C2, and the reason is now nameable.** It is not
*"Silence fails"* — the DPA does not fall silent on backups, it **allocates
them away**, listing backup and archiving among measures *"Customer can elect to
implement"* and committing AWS to redundancy for availability instead. Silence
invites another parse. Allocation does not: no further reading of this document
will produce a provider retention term, because the document says there isn't
one to state. What remains open is whether a **different** AWS instrument
carries what C1's CDPA carries — `OQ-108-022`.

#### The correction ledger, and what it now says

| Tranche | Claim | Corrected by | Direction |
| --- | --- | --- | --- |
| 2 | C1 is *"one retrieval away"* from a `HG-102-013` `PASS` | 3 | Against |
| 3 | Secret Manager is absent from the data-residency list | 6 | For |
| 6 | Cloud Scheduler *"plausibly has a like-for-like substitute"* | 9 | Against |
| 10 | Only C1's commitment is contractual | 11 | For C3 |
| 11 | C2's region clause *"has not been found"* by two routes | **12** | **For C2, and against it** |
| 10 | C3's uncovered component may be its **identity provider** | **13** | **For C3** |

Tranche 11 drew the lesson that *"every correction came from retrieving one more
thing"* and that none came from re-reasoning. **This correction narrows that.**
The thing retrieved was not one more secondary source; it was the **primary
instrument**, and two tranches had already reasoned confidently about it from
pages that described it. The rule the ledger actually supports is that a finding
about what a contract says requires the contract, and that a record locating an
instrument cannot be counted as a route into its text — which is what
`OI-108-024` records.

#### What this does not establish

**`HG-102-013` remains `UNPROVEN` for all three candidates**, and no verdict,
rubric score, price or disposition moves. Retention and expiry are unmet for C2
and C3 and met for C1 alone (`EV-102-168`). This is not a ranking: C2's newly
contractual region element is narrower in scope than C1's and subordinate to an
instrument that does not restate it, and the three commitments remain different
enough in shape that no single dimension orders them.

### 4.21 `OQ-108-018` settled: C3's composition can now be checked, and it has the same shape of gap as C1's

`EV-102-241` supplies the set `EV-102-237`'s commitment operates on — the C3
equivalent of Google's data-residency list. Checked against CBD-103 §5's C3
hosting composition:

| C3 component | On the Azure Core Services list as retrieved? |
| --- | --- |
| Container Apps | **Yes** |
| API Management | **Yes** |
| Service Bus | **Yes** |
| Key Vault | **Yes** |
| Azure Monitor | **Yes** |
| **Front Door** | **Not seen** |
| **Logic Apps** | **Not seen** |
| Azure Database for PostgreSQL (the database candidate) | **Yes** |
| Azure Communication Services (email and SMS) | **Yes** |
| Microsoft Entra ID (the identity candidate) | **Yes** |

**Two components of the C3 hosting composition were not seen on the list**, and
CBD-103 §5 names both: *"Front Door / API Management"* for the edge, and *"Azure
Container Apps jobs or Logic Apps scheduling"* for the scheduler. **That is the
same shape as C1's position** — an edge component and a scheduling component,
the exact two places C1's composition fell outside Google's list.

**This is stated as "not seen", not "absent", and the distinction is doing
work.** `EV-102-241` records that the list was returned from a very large page
and may be incomplete. Tranche 3 made precisely this mistake in the other
direction — reading a stale snapshot and recording Secret Manager as absent when
it was present — and the correction cost two tranches. `OQ-108-023` puts the
question rather than banking the finding.

**If it holds, the region dimension stops separating C1 from C3.** Both would
have a contractual commitment, conditional on an enumerated set, with an edge
and a scheduling component outside it. The remaining difference would be
granularity: C1 commits at region with backups bounded to the country, C3 at
Geo.

**Note also the qualifier `EV-102-241` carries**, which has no C1 counterpart:
*"Certain services may not enable Customer to configure deployment in a
particular Geo or outside the United States and may store backups in other
locations."* A service can be **on** the list and still not be configurable to a
Geo. Membership is necessary and not sufficient, which makes the C3 check weaker
than the C1 one even once the list is confirmed.

### 4.22 `OQ-108-016` settled: the Entra ID naming does **not** transfer, and what replaces it is more precise

Tranche 10 recorded that Azure names **Microsoft Entra ID** among services that
do not let the customer specify a region, and asked whether that reaches
**Entra External ID**, the C3 identity candidate. **It does not, and the page
says so directly.**

*"When you create an external tenant, you have the option to select the
geographic location… for data storage. It's important to note that the data
locations and region availability may differ from those of Microsoft Entra ID."*

**So the C3 identity candidate is not in the uncovered class after all.** The
worry in tranche 10's §4.18 — that C3's uncovered component might be the
identity provider holding authentication material, where C1's is a scheduler —
**is retired.** That is the fifth correction this pass has made to itself, and
the second in C3's favour.

**Three facts replace it, and they are more specific than the worry was.**

**The selectable unit is a geo-location, not a region and not a country.** The
options are Australia, Asia/Pacific, EMEA, Japan, **North America**, and
Worldwide. For a United States deployment the selection is **North America** —
which includes Canada and Mexico. `OI-103-001` fixes a single **United States**
region. **The identity candidate's data-location granularity is therefore
coarser than the topology's own assumption**, and coarser again than the Geo
granularity `EV-102-237` commits to. Australia and Japan can be narrowed through
the **paid Go-Local add-on**; the United States is not among the countries that
add-on covers.

**The choice is made once and cannot be revised.** *"Tenant location can't be
changed after it's set."* This is the **second** create-time-irreversible
decision found in the C3 set, after `EV-102-230`'s customer-managed-key mode on
PostgreSQL. Neither is a gate failure; together they are a pattern worth
carrying into a selection, because they mean C3's data-location posture is fixed
at provisioning across two categories at once.

**Two component-level data-location facts sit beneath the tenant choice.**
Multifactor authentication data is recorded as residing *"North America and/or
in geo location"* while logging *"the User Principal Name (UPN), voice-call
telephone numbers, and SMS challenges"* — authentication material with a
location qualifier of its own. And managed identities write issued certificates
to *"Azure Cosmos DB in the East US region"* with *"a read-only copy in each
region that Microsoft Entra managed identities runs."* Whether CoBudget's
composition depends on that service was not established and this pass asserts
nothing about it — `OQ-108-024`.

**What this does to the coherence review's incident finding.** §4.7 records
`EV-102-012` — Entra External ID absent from the Customer Lockbox
supported-services list — as one of two independent findings converging on the
same component. **That convergence is now one finding, not two.** The Lockbox
absence stands; the region-exclusion worry does not.

### 4.23 `OQ-108-022` answered: the last general AWS instrument is read, and it does not carry the term

Tranche 12 asked whether any AWS instrument states provider-controlled backup
retention and expiry as C1's CDPA does. The **AWS Customer Agreement** — the
one general AWS instrument the corpus had never retrieved — has now been read.
**It does not.**

| Instrument | What it does with retention and expiry |
| --- | --- |
| **Customer Agreement §5.3(b)** (`EV-102-243`) | A **30-day floor**: AWS will not remove Your Content *as a result of the termination*. States no holding period and no maximum |
| **Customer Agreement §2.3** (`EV-102-244`) | **Assigns backup and archiving to the customer**, in a section headed *"Your Security and Backup"* |
| **DPA §5.2, §8** (`EV-102-240`) | The same allocation, in a second instrument |
| **DPA §14** (`EV-102-240`) | A 90-day customer-initiated return-or-delete right. A deletion right on termination, not a backup expiry |
| **Service Terms §1.15** (`EV-102-220`) | **Defers** deletion timing to *"the technical documentation applicable to the Services"* |

Against the C1 benchmark — `EV-102-168`, Google CDPA §6.2, a 30-day recovery
window **and** a 180-day maximum reaching *"existing copies"* — no AWS
instrument states either element.

#### A correction to tranche 12's framing

`EV-102-240`'s limitations field said *"no AWS equivalent has been identified"*,
and `OQ-108-022` was raised as though the ground were unexplored. **It was not.**
`EV-102-220`, registered at tranche 2, already recorded Service Terms §1.15
deferring deletion timing to per-service technical documentation. Re-retrieving
§1.15 this tranche returned identical wording at an identical section number,
which corroborates that record and registers nothing new.

The question was still worth asking — the Customer Agreement was genuinely
unread, and it is where a retention term would most naturally sit. But the
framing understated what the pass already held, and a reader could have taken
§1.15 for a fresh finding. **It is not new evidence.** This is the sixth
correction in the ledger and the first the pass has made to its own framing
rather than to a claim.

**What has changed about §1.15 is its standing, not its content.**
`EV-102-220` recorded it as *"narrowing where the answer could be"* and named the
DPA as *"the document that decides this gate for C2"*. Tranche 12 read the DPA,
and it does not decide it. §1.15 is therefore promoted from a narrowing to
**the operative clause**: C2's expiry term exists, and it lives in per-service
technical documentation. `OQ-108-025` retrieves it.

#### Stated by reference rather than stated, on both sides

C1's region element is stated by reference — CDPA §10.1 defers it to the
Service Specific Terms, which `EV-102-168` recorded as *"stated by reference
rather than stated"*. C2's expiry element is stated by reference in exactly the
same way, §1.15 deferring to technical documentation.

**Two of three candidates now have an element of this gate delivered by
deferral.** That reads less like a property of either provider and more like a
property of `HG-102-013`: it asks for three specific numbers, and hyperscaler
contracts habitually push operational specifics down into documentation.
`OI-108-025` records it, because it bears on how the remaining work is
estimated — deferrals are followable, and a followable deferral is cheaper
than provider contact.

### 4.24 Product Owner ruling on `HG-102-013`: written evidence is enough

`HG-102-013` states itself two ways in one catalog row. The gate reads
*"Provider-controlled backup behaviour is **stated contractually**"*; the pass
test reads *"**A contract or written evidence** states the provider's backup
retention, region, and expiry for CoBudget data. Silence fails."*

**Product Owner ruling, August 29, 2026: the pass test governs. Written evidence
is enough.** Recorded here with attribution and date, on the precedent §4.12
set for direction given mid-pass.

#### The scope of the ruling, checked rather than assumed

* **The tension is unique to `HG-102-013`.** Every row of the hard gate catalog
  was scanned for a gate statement demanding a contract against a pass test
  admitting written evidence. `HG-102-013` is the only one. The ruling cascades
  to no other gate.
* **Evidence register §3.2 is untouched and still binds.** *"Hard gate `PASS`
  — Documented or stronger. A gate never passes on Asserted evidence alone."*
  The ruling is about **instrument type**; §3.2 is about **class**. Both apply.

The operative rule is therefore: **Documented or stronger, contract or not.**

#### What the ruling changes in records already held

| Record | Reason recorded for insufficiency | Position under the ruling |
| --- | --- | --- |
| `EV-102-235` — AWS compliance FAQ, **Asserted** | *"a compliance FAQ page, not a contract"* | **Reason void, outcome unchanged.** It fails under §3.2 on class, not for being non-contractual. Moot in any case — `EV-102-239` supersedes it for region |
| `EV-102-236` — Azure residency page, **Documented** | *"a documentation page, not the Product Terms"* | **Void. Sufficient on its own** for C3's region element. C3's outcome does not change because `EV-102-237` already supersedes it — but **C3's region element was satisfiable at tranche 10** and the pass did not know it |
| `EV-102-221` — Azure vault retention, **Documented** | *"Two limitations, either of which is fatal"* | **The first is void** — Documented now counts. **The second stands**: it is scoped to Recovery Services vaults, not to the evaluated C3 composition. Still insufficient, now on **scope alone**. `OQ-108-026` |
| `EV-102-169` — Microsoft retention page | scoped to Microsoft 365, not Azure | **Unaffected.** It failed on scope, not class |

Three sections of this document reason from the superseded reading and are left
as written: §4.4's *"C1 is one page from a `PASS`, and the page is not a
contract"*, its C3 paragraph on documentation *"where the pass test demands a
contractual statement"*, and §4.19's citation of §3.2 against C2. The first is
already superseded by tranches 3 and 6 on other grounds.

#### No gate moves, and the reason matters

When the ruling was given, this pass flagged that tranche 14 might be the first
to move a gate outcome. **It is not, and the correction is worth stating
plainly.** The ruling changes **what kind of evidence would move these gates**,
not what evidence is held:

* **C1** — blocked by Cloud Scheduler sitting outside the data-residency list.
  A scope gap. The ruling does not touch it.
* **C2** — region stated contractually (`EV-102-239`); retention and expiry
  live in documentation §1.15 defers to, **which has not been retrieved**.
* **C3** — region stated contractually (`EV-102-237`), conditional on a list
  with two components unconfirmed (`OQ-108-023`); the nearest retention record
  fails on **scope**, which the ruling does not cure.

**`HG-102-013` remains `UNPROVEN` for all three candidates.**

What the ruling does change is the **shape and cost** of the remaining work. For
C2 and C3 the outstanding elements are now a bounded documentation retrieval —
class `D3`, the cheapest class in the register — where before the ruling they
were a hunt for a contractual statement that might not exist anywhere. That is a
materially better position than the one the pass held this morning, and it is
the second time in this pass that a Product Owner answer has been worth more
than a retrieval.

#### The catalog row still states the gate both ways

The ruling settles how to read it. It does not fix the text, and the next reader
re-derives the same contradiction. **CBD-102 is approved and upstream of
CBD-108**, so this pass records that the amendment is needed rather than making
it — `OQ-108-027`, on the standing rule that a CBD-108 tranche does not amend
its source packages mid-pass (`OI-108-020`).

### 4.25 Two misreferences in tranche 13, corrected

Tranche 13 cited `OQ-108-020` twice where `OQ-108-023` was meant: in
`EV-102-241`'s limitations field, and in §4.21's closing sentence. `OQ-108-020`
is tranche 12's question about whether the AWS Service Terms conflict with DPA
§12.1; `OQ-108-023` is tranche 13's own question about whether Front Door and
Logic Apps appear on the Core Services list. A reader following either citation
landed on an unrelated question about a different provider. Both are corrected
in place.

**The audit does not catch this class of error, and cannot readily be made to.**
`scripts/audit-cbd-108.py` checks that every cited `OQ-108` identifier is defined
somewhere in the package. A citation of a **real** identifier in the **wrong**
place satisfies that check exactly as a correct one does. The guard validates
**existence, not appropriateness** — `OI-108-026`.

### 4.26 `OQ-108-023` settled, and it splits: Logic Apps is covered, Front Door is not

Tranche 13 recorded both as *"not seen"* rather than absent, on the ground that
the enumeration might be incomplete. **That caution was right, and it paid on
one of the two.**

| Service | Tranche 13 | Tranche 15 |
| --- | --- | --- |
| **Logic Apps** | Not seen | **Present** — inside *"App Service (API Apps, Logic Apps, Mobile Apps, WebJobs, Functions)"* |
| **Azure Front Door** | Not seen | **Absent**, on a targeted check of a list that rendered in full |

**Logic Apps was never missing; it was nested.** The Core Services list names it
inside a parenthesised group under **App Service**, so a flat enumeration of
top-level entries — which is what `EV-102-241` produced — does not surface it.
This is a retrieval-shape failure rather than a reading error, and it is the
kind that a second, narrower question catches and a broader one does not.

**Front Door is absent, and the check was made in the form that can establish
that.** `EV-102-245` asked only about two named services against a list that ran
alphabetically from Anomaly Detector to VPN Gateway without truncating. That is
a materially stronger basis than tranche 13's, which is why *"not seen"* becomes
*"absent"* here and not there.

#### C3's composition now has one uncovered component, not two

| C3 component | Covered by `EV-102-237`'s commitment? |
| --- | --- |
| Container Apps, API Management, Service Bus, Key Vault, Azure Monitor | **Yes** |
| **Logic Apps** (the scheduling half of CBD-103 §5) | **Yes** |
| Azure Database for PostgreSQL, Azure Communication Services, Microsoft Entra ID | **Yes** |
| **Azure Front Door** | **No** |

**And the symmetry with C1 is exact.** CBD-103 §5 names C3's edge as *"Front
Door / API Management"* — two products, of which **API Management is on the list
and Front Door is not**. That is the same structure the C1 composition had at
tranche 7: an edge line naming two products, one listed and one not, with the
unlisted one being the **global** product.

**Front Door is Azure's global edge**, as the global external Application Load
Balancer is Google's. The `CR5` reasoning CBD-103 §6 applies — that multi-region
capability is *"an option CoBudget is not exercising"* — reaches it the same way,
and `OI-103-001`'s single-region posture is the same argument against it.

**So the remedy that closed C1's edge gap is available here, and this document
does not apply it.** Whether C3's composition can drop Front Door and stand on
API Management is a CBD-103 question and a functional one: Front Door and API
Management are not the same product, any more than a global and a regional load
balancer were. `OQ-108-028` puts it, and §4.12's caution applies unchanged —
**dropping a global edge tier is a functional change, not a swap.**

#### What the ruling at §4.24 does and does not do here

The Product Owner ruling that `HG-102-013` accepts written evidence rather than
requiring a contract **does not help Front Door**. The objection to Front Door
is **scope** — it is not in the set the commitment operates on — not **class**.
A documentation-grade statement about Front Door would still not bring it inside
`EV-102-237`, because `EV-102-237` reaches only Core Services.

What the ruling changes for C3 is elsewhere, and §4.24 already records it:
`EV-102-236` becomes sufficient on its own for the region element. **The
scope-versus-class distinction is the one to hold**: the ruling relaxed class
for the whole catalog row and left every scope condition exactly where it was.

#### The correction ledger

| Tranche | Claim | Corrected by | Direction |
| --- | --- | --- | --- |
| 13 | **Logic Apps** *"not seen"* on the Core Services list | **15** | **For C3** |

Recorded as a correction rather than a completion because tranche 13's table put
Logic Apps in the same row as Front Door, and a reader scanning it would have
taken two gaps where there was one. The hedge was accurate; the impression it
left was not.

### 4.28 `OQ-108-026` settled: the statement exists, and it is scoped to an evaluated service

`EV-102-221` answered the wrong question — it described Azure Backup Recovery
Services vaults, not the composition CBD-103 and CBD-105 evaluate. §4.24's
ruling removed that record's **class** objection and left its **scope**
objection standing. `OQ-108-026` asked whether a correctly scoped statement
exists. **It does.**

| `HG-102-013` element | C3, category **D**, per `EV-102-256` |
| --- | --- |
| **Retention** | 7 days by default, configurable to a maximum of 35 |
| **Expiry** | *"automatically deleted after the retention period"*; on server deletion, *"all backups… are also deleted and can't be recovered"* |
| **Region** | Zone-redundant by default, which *"restricts replication of data to within a country or region"*; geo-redundant is opt-in and replicates to the paired region |

**All three elements are stated, in Documented class, scoped to an evaluated
service.** Under the §4.24 ruling that is the standard `HG-102-013` now applies.
Before that ruling it would not have been, and the ruling is what makes this
retrieval worth making.

#### What this does not do

**It does not move the gate, and CBD-108 could not move it if it wanted to.**
`HG-102-013` is a cross-category **X** gate. This record covers the **database**
component of the C3 set and nothing else — Container Apps, Service Bus, Key
Vault and Azure Monitor have no equivalent statement retrieved, and the Product
Terms commitment at `EV-102-237` speaks to **location**, not to retention or
expiry. **A gate that applies across a composition is not satisfied by one
component of it.** `OQ-108-029` names the remainder.

**The gate outcome belongs to CBD-105 and CBD-103**, not here. What this pass
can do is put the evidence in front of them, and it has.

#### Three findings worth carrying beyond this question

**Backup custody is genuinely separated, which bears on `HG-102-039`.** *"You
have read-only access to restore these files but can't modify or delete them."*
`HG-102-039` asks whether key custody can be separated from backup-data access;
this establishes that on C3 the customer cannot reach the backup objects at all.
Whether that helps or hurts depends on which way the gate reads it, and this
document does not decide.

**Geo-redundancy is the third create-time-irreversible decision in the C3 set.**
*"You can configure geo-redundant storage for backup only during server
creation. After a server is provisioned, you can't change the backup storage
redundancy option."* That joins `EV-102-230`'s customer-managed-key mode and
`EV-102-242`'s external-tenant location. **Three separate C3 decisions are fixed
at provisioning and cannot be revised**, across three different categories. None
is a gate failure. Together they are a property of the candidate that a
selection should hold deliberately: **C3's data-protection posture is chosen
once, before anything is running.**

**Default redundancy sits inside the region; the option that leaves it must be
chosen.** Zone-redundant storage restricts replication *"to within a country or
region"*, which is compatible with `OI-103-001`'s single-United-States-region
posture. Geo-redundant backup replicates to the paired region, which is a second
region — still inside the Geo `EV-102-237` commits to, but outside the single
region the topology assumes. **The default is the compatible one**, and the
incompatible one is opt-in and irreversible, which is a better position than the
reverse would be.

### 4.29 Housekeeping: the tranche 15 baseline annotation

Tranche 15 recorded its repository baseline as `` `93429d5` (tranche 15 stacks
on the unmerged tranche 14) ``. That was accurate when written and is stale now
— tranche 14 merged as `d6d96f0` and tranche 15 as `55cd5c0`. The annotation is
removed and the baseline moved forward with this tranche.

The pinned constant in `scripts/audit-cbd-108.py` moves with it, which is why
the stale annotation was never a build failure: **the audit checks that the
document and the constant agree, not that either is current.** That is the same
limitation `OI-108-026` records about identifier checking — the guard verifies
consistency, not correctness — and it is worth noting that the two independent
observations point at the same property of these audits.

### 4.30 `OQ-108-025` settled: the deferral is followable, and it leads to the wrong shape

Service Terms §1.15 defers deletion timing to *"the technical documentation
applicable to the Services"* (`EV-102-220`). §4.23 recorded that this makes C2's
remaining work a bounded retrieval rather than a hunt. **The retrieval has been
made, and it does not close the gate.**

Four kinds of statement came back, and only the first is what `HG-102-013` asks
for.

| | What the documentation states | Is it what the gate asks? |
| --- | --- | --- |
| **KMS** (`EV-102-246`) | Waiting period of **7—30 days**, default 30, floor and ceiling enforced by AWS; key deleted at the end | **Yes.** The first provider-controlled expiry term found for C2 |
| **Secrets Manager** (`EV-102-247`) | Recovery window, *"a minimum of seven days"* | **No.** The same page documents `--force-delete-without-recovery`, which removes it |
| **RDS** (`EV-102-248`) | Support recovery *"for up to six days after the deletion request"*; retention otherwise **customer-set** | **Partly.** A provider-held copy outliving deletion, but stated as a capability, not undertaken as a period |
| **CloudWatch Logs** (`EV-102-249`) | Retention customer-set, **default indefinite**; deletion lags it by *"up to 72 hours… but in rare situations might take longer"* | **No, and it cuts the other way** |

#### Why this does not satisfy the gate

`HG-102-013`'s gate statement is explicit that provider-controlled backup
behaviour *"cannot be assumed from CoBudget's own backup policy"*. **What
§1.15's deferral leads to is, in the main, CoBudget's own backup policy** —
per-service documentation is written for the operator configuring the service,
and it describes the knobs that operator sets.

Where provider behaviour does appear, it appears as **lag on top of the
customer's setting**, and in the sharpest case it is unbounded:

* **CloudWatch Logs**: the provider's actual expiry is the customer's retention
  setting plus a period AWS calls typical and then declines to bound — *"in
  rare situations might take longer"*. **A retention term with an unbounded tail
  is not a retention term.**
* **RDS**: *"Recovery might be possible for up to six days after the deletion
  request."* A provider-held copy that outlives the customer's deletion, and the
  nearest thing in the AWS set to the *"including existing copies"* language
  Google's CDPA §6.2 carries (`EV-102-168`). But *"might be possible"*
  describes a capability; it undertakes nothing.
* **KMS on CloudHSM key stores**: *"AWS KMS does not delete the key material
  from cluster backups."* An explicit statement that deletion does not reach
  backups.

**`HG-102-013` remains `UNPROVEN` for C2**, now for a reason no further
retrieval in this direction will change: the documentation the contract points
at is a different genre from the statement the gate requires.

#### This corrects tranche 14

§4.24 recorded that the ruling put C2 and C3 in *"a materially better
position"*, the remaining work being *"a bounded documentation retrieval —
class `D3`, the cheapest class in the register"*. **The cost claim was right and
the implied optimism was not.** The retrieval was cheap, it was bounded, it was
made within a day, and the gate did not move.

That is the **seventh correction** in this pass's ledger, and the second in two
tranches to a claim this document made about its own prospects rather than about
a provider. `OI-108-027` records the pattern, because a pass that keeps
overestimating what its next step will achieve is worth calibrating.

| Tranche | Claim | Corrected by | Direction |
| --- | --- | --- | --- |
| 2 | C1 is *"one retrieval away"* from a `HG-102-013` `PASS` | 3 | Against |
| 3 | Secret Manager is absent from the data-residency list | 6 | For |
| 6 | Cloud Scheduler *"plausibly has a like-for-like substitute"* | 9 | Against |
| 10 | Only C1's commitment is contractual | 11 | For C3 |
| 11 | C2's region clause *"has not been found"* by two routes | 12 | For C2, and against it |
| 12 | *"No AWS equivalent has been identified"*, as though unexplored | 14 | Framing |
| 14 | The ruling leaves C2 and C3 *"a materially better position"* | **18** | **Against** |

#### What is left, and what it is worth

Four of C2's components are covered. **SQS was not retrieved** — the
message-lifecycle page carried no retention statement — and ECS, API Gateway,
CloudFront and EventBridge Scheduler have no equivalent statement retrieved.
`OQ-108-030` names them.

**But the value of completing that list has fallen.** Before this tranche, the
remaining components were unknowns that might have carried the gate. After it,
the genre problem applies to all of them equally: per-service operator
documentation will state customer-configurable retention, and `HG-102-013` asks
for something else. Completing `OQ-108-030` is worth doing for `HG-102-003` and
for the `DI-91-*` picture; **it is not worth doing in the expectation that it
moves `HG-102-013`**, and this document says so now rather than after the
retrieval.

The route that could still move the gate for C2 is `OQ-108-031`: whether AWS
publishes any statement about **its own** backups of the platform, as distinct
from the resources a customer creates and deletes. Nothing retrieved in eighteen
tranches suggests it does.

### 4.31 `OQ-108-029`: the hosting components have retention statements, and none of them is about a backup

The question asked whether the remaining evaluated C3 hosting components carry
retention and expiry statements of their own. **Three of four do. None of the
three describes a provider backup**, and that distinction is the finding.

| Component | Retention | Expiry | Is it a **backup**? |
| --- | --- | --- | --- |
| **Key Vault** | 7–90 days soft-delete, default 90 | Purged at end of interval; *"Resource deletion can not be rescheduled"* | **No** — a deletion-recovery window |
| **Azure Monitor Logs** | 30 days default, 4 days to 12 years configurable | Removed at end of total retention, with a 30-day grace on shortening | **No** — retention of primary telemetry |
| **Service Bus** | Message TTL; entity default max-int64, 14 days on basic | Expired messages dead-lettered or *"dropped"* | **No** — and no provider backup is described at all |
| **Container Apps** | **Not retrieved** | **Not retrieved** | — |

**`HG-102-013` asks about provider-controlled *backup* behaviour.** Its pass test
wants *"a contractual statement of provider backup retention, region, and
expiry"*, with *"Silence fails"*. What these three components have is
**customer-configured retention of primary data**. That is a different object.
Azure is not holding a copy of the material against CoBudget's wishes; it is
holding the material itself, for a period CoBudget sets, and then destroying it.

**So the gate does not cleanly engage here, and this pass will not pretend it
does either way.** Three readings are available and this document picks none:

1. **The gate is satisfied.** Its purpose is that provider-held copies of
   customer data have a known lifetime. These statements give exactly that, in
   more detail than a backup clause usually would.
2. **The gate fails on silence.** Its pass test names *backup* retention, and
   none of these describes a backup, so the provider is silent on the thing
   asked about.
3. **The gate does not apply to these components.** It is written around a
   datastore, where provider backups are a real and distinct artifact, and a
   stateless compute service or a message broker has no equivalent.

**Reading 3 is the one this pass would flag to the catalog**, and it is not
CBD-108's to settle. `OQ-108-027` already asks whether the `HG-102-013` row
should be amended so its gate statement and pass test agree; **this is a second
and independent reason to look at that row** — not that its two halves disagree
with each other, but that both halves assume a service shape that four of the
five categories do not have. `OQ-108-032` records it.

#### Key Vault is the fourth create-time-irreversible decision in the C3 set

*"The retention policy interval can only be configured during key vault creation
and can't be changed afterwards."* And soft-delete itself: *"Once soft-delete is
enabled on a key vault, it can't be disabled."*

That joins `EV-102-230`'s customer-managed-key mode, `EV-102-242`'s
external-tenant location, and `EV-102-256`'s backup redundancy. **Four separate
C3 decisions are fixed at provisioning and cannot be revised, across four
categories.** Tranche 17 recorded three and called it a property worth holding
deliberately; a fourth makes it a characteristic of the candidate rather than a
coincidence of three services.

**It cuts both ways, and the register should say so.** Irreversibility is a
control as well as a constraint: a soft-delete window that cannot be shortened
or disabled is a protection against exactly the rogue-operator deletion
`HG-102-006` is concerned with. What it is not is adjustable, and a provider set
whose data-protection posture is fixed before the first deployment leaves less
room to respond to what the observation pass finds.

#### Two smaller things worth recording

**A 30-day retention setting may keep data for 31 days.** *"Workspaces with
30-day retention might keep data for 31 days."* If a `DI-91-*` lifecycle
commitment is ever expressed as exactly 30 days, that one-day overhang is a real
discrepancy, and the fix — `immediatePurgeDataOn30Days` — is settable only
through the update API, not the portal.

**Service Bus expiry is lazy, not prompt.** *"The broker might choose to lazily
expire these messages."* Messages past their TTL may still be counted and
peekable. For a deletion commitment measured against a clock this is a gap
between the stated policy and the observable state, and it is the kind of thing
the route-A observation pass could measure and no document will settle.

### 4.32 `OQ-108-030` answered, and the reason tranche 18 gave for asking was wrong

#### The correction first

Tranche 18 recorded `OQ-108-030` as *"worth completing for `HG-102-003` and the
`DI-91-*` picture, not for `HG-102-013`"*. **The `HG-102-003` half is wrong.**

That gate's pass test reads: *"The provider's own data model is inspected for a
shared identity graph across its telemetry, support, and analytics surfaces. A
platform whose unified observability product co-mingles reliability, security,
and behavioural data under one access role and one retention policy fails."*
**It is about AWS's own data model**, not about how long CoBudget's data sits in
a queue. Nothing this tranche retrieved bears on it.

The `DI-91-*` half was right, and that is what the retrieval serves. Where
per-service retention numbers do reach a hard gate it is **`HG-102-042`** —
*"Retention windows, immutability period, and expiry behaviour are obtained in
writing and dated"* — and that gate is category **D**, so it reaches the
database and not the hosting components this question named.

**Eighth entry in the ledger, and the third to a forward-looking claim.**
`OI-108-027` recorded one tranche ago that this pass is *"reliable about what it
has retrieved and unreliable about what retrieval will yield next"*. It is now
evidenced rather than asserted.

#### What was retrieved

| Component | Statement | Bound by the provider? |
| --- | --- | --- |
| **SQS** (`EV-102-250`) | *"By default, a message is retained for 4 days. The minimum is 60 seconds… The maximum is… (14 days)."* | **Ceiling.** A message cannot persist beyond 14 days whatever the customer sets |
| **EventBridge Scheduler** (`EV-102-251`) | *"If you configure a schedule with automatic deletion but do not specify a value for `EndDate`, EventBridge Scheduler does not automatically delete the schedule."* | **None.** No retention period is stated at all |

**Not retrieved: ECS on Fargate, API Gateway, CloudFront.** Stated rather than
inferred. Their data-at-rest story plausibly reduces to CloudWatch Logs, which
`EV-102-249` already covers, but this pass has been wrong before about what a
document will say and does not assert it. `OQ-108-035` carries them, at inventory
value only.

#### The finding worth having: the composition does not bound retention uniformly

| Component | Provider-enforced bound on how long data persists |
| --- | --- |
| **KMS** (`EV-102-246`) | **Floor and ceiling** — deletion waiting period of 7—30 days |
| **SQS** (`EV-102-250`) | **Ceiling** — 14 days, unraisable |
| **RDS** (`EV-102-248`) | **None stated**, plus support recovery *"for up to six days"* |
| **CloudWatch Logs** (`EV-102-249`) | **None** — indefinite by default, with an unbounded deletion tail |
| **EventBridge Scheduler** (`EV-102-251`) | **None** — a recurring schedule without an end date is never auto-deleted |

**One service in this composition cannot hold data beyond fourteen days and
another holds it forever by default.** For a `DI-91-*` inventory that is the
useful output: retention in the C2 set is a property of each service rather than
of the composition, and two of them sit at opposite extremes. `OI-108-028`.

**The scheduler finding is the one to carry into CBD-103.** `TD-103-004`
specifies a recurring fifteen-minute tick, which carries no end date by nature,
so the schedule and its target payload persist indefinitely unless something
deletes them. That is the same class of content §4.17 identified in C1's Cloud
Scheduler — job definitions, target URLs, payloads — and the same question
follows: what the scheduler holds is a Product Owner judgment against `DI-91-*`,
not a gate reading.

#### Tranche 19 reached the same structural finding on C3, independently

`OQ-108-032`, raised by tranche 19 on the Azure side, asks whether `HG-102-013`
**applies** to services that hold no provider backup, observing that Key Vault,
Log Analytics and Service Bus offer *"customer-configured retention of primary
data"* instead.

**That is the same distinction §4.30 drew for AWS**, reached from the other
candidate on the same day and without contact between the two retrievals. The
convergence is worth recording: it is now a finding about **cloud services
generally** rather than about either provider, and it strengthens the case that
`HG-102-013`'s premise — that a provider holds backups whose retention it
controls and states — may be mis-specified for managed services. `OQ-108-027`
already carries the catalog row to CBD-102; **this is a second and independent
reason to look at it**, and the two questions should be considered together
rather than separately.

#### The question about the C2 components that does serve a hard gate

It is not retention. It is **`HG-102-026`**, whose test reads: *"Two distinct
destinations with distinct access roles are configurable. A platform offering one
log stream with one access role for both fails, since `DI-91-062` evidence and
`DI-91-041` S1 telemetry cannot share a boundary."*

That is a per-service question about the same C2 observability surface, it is
answerable from documentation, and **unlike `OQ-108-030` it can produce a gate
outcome**. `OQ-108-034` raises it. Naming it is the practical form of
`OI-108-027`'s calibration: the way to stop over-valuing a retrieval is to say
what would actually move something.

#### One piece of housekeeping

Tranche 18 inserted its own sentence into the status line on an anchor that
matched inside tranche 12's, so the summary read **12, 18, 13, 14**. It is moved
to its place here. The line also carries no sentence for tranches 15, 17 or 19;
that is for whoever maintains it, and this tranche has not written summaries of
other tranches' work into it.

### 4.33 `OQ-108-034`: the first retrieval in this pass that could let a gate pass

`HG-102-026` has been `UNPROVEN` for all three candidates since CBD-103's
evaluation, which recorded *"Not retrieved. Two destinations with **distinct
access roles** is the test, not two destinations."* That warning was the right
one to carry, and the retrieval was made against it rather than against the
easier question.

**The test is met on the evidence for C2.** `EV-102-252` establishes that
CloudWatch Logs scopes IAM to an individual log group two ways: by ARN
(*"Resource": "arn:aws:logs:us-west-2:123456789012:log-group:SampleLogGroupName"*)
and by tag (*"grant users access to certain log groups while preventing them from
accessing other log groups"*). A log group is a distinct destination; access to
one is grantable independently of the others.

**`TD-103-021` asks for three destinations, not two**, with three access roles
and three retention policies — reliability, restricted diagnostics, and audit
evidence. The mechanism reaches three as easily as two, because log groups are
ordinary resources and `EV-102-249` already records that each carries *"the same
retention, monitoring, and access control settings"* as a unit. **So CoBudget's
own arrangement, which is stricter than the gate, is configurable too.**

#### What this is and is not

**It is the first retrieval in twenty-one tranches to produce evidence
sufficient for a gate to pass rather than evidence that narrows one.** Every
prior tranche closed by recording what a gate still lacked. This one records
what a gate has.

**It is not a gate outcome.** `HG-102-026` belongs to CBD-103, and CBD-108 does
not move gate outcomes — the same position tranche 17 took at §4.28 for the
C3 database record. What this pass can do is put the evidence in front of the
package that owns the gate.

**It is not an observation either, and the gate is typed `Config`.** The
retrieval establishes that the separation is **configurable**. Whether CoBudget
has configured three destinations with three roles is CoBudget's own work, not
the provider's, and no document about AWS can discharge it.

**And it covers one candidate of three.** `OQ-103-009` says *"Retrieve for all
three"*. C1 and C3 are untouched; `OQ-108-037` carries them.

#### The redaction element, which cuts the other way

`HG-102-026`'s **gate statement** names five properties: a separate boundary,
stronger access control, deliberate rather than continuous capture, redaction,
and case linkage. Its **pass test** checks two of them. Only the test has been
answered here.

On redaction specifically, the provider's mechanism is the one CoBudget's own
design rejects. `EV-102-253` records that CloudWatch Logs data protection works
by *"pattern matching and machine learning models"* against an enumerated
identifier set, and that *"log events ingested to the log group before that time
are not masked"*. `TD-103-022` names exactly this shape as the rejected
alternative, *"a redaction filter that strips known-sensitive patterns on the way
out"*, because it *"fails open"*.

**This costs CoBudget nothing**, and the record says so. `TD-103-022` places
redaction in the logger's closed typed field set, so the S1 sink cannot emit an
unlisted field and the design never depended on provider masking. The record
exists so that a later reader does not cite this feature as satisfying
`TD-103-022`. `OI-108-029`.

#### A pass-test-versus-gate-statement question, not to be settled by analogy

§4.24 recorded a Product Owner ruling that `HG-102-013`'s **pass test governs**
over its gate statement. `HG-102-026` presents a structurally similar gap —
five properties named, two tested — and **this pass does not extend the ruling
to it.**

The `HG-102-013` ruling resolved a specific contradiction, a gate demanding a
contract against a test admitting written evidence, and §4.24 recorded that the
contradiction was unique to that row across the whole catalog. **A gate statement
being broader than its pass test is a different thing** and may well be common,
since a test is meant to be operable where a statement is meant to be complete.
Whether the narrower test is sufficient here is a CBD-102 question, and
`OQ-108-036` puts it rather than assuming the earlier answer transfers.

### 4.34 `OQ-108-037` completes `OQ-103-009`, and the gate discriminates between nobody

C1 and C3 were put to the same question tranche 21 put to C2. **All three meet
`HG-102-026`'s pass test.**

| | Distinct destination | Grant mechanism | Named role |
| --- | --- | --- | --- |
| **C1 Google** | Log view on a log bucket | IAM policy bound to the view | **`roles/logging.viewAccessor`** |
| **C2 AWS** | Log group | IAM by ARN, or by resource tag | (no dedicated role; scoped policy) |
| **C3 Azure** | Table in a workspace | Per-table permission, granular RBAC, protected tables | **Privileged Monitoring Data Reader** |

#### The finding is the non-result

CBD-103's topology says of this gate: *"This is the second gate most likely to
eliminate a candidate, and it eliminates exactly the class of platform that
markets a single unified observability product as a feature."*

**It eliminates none of the three.** The expectation was reasonable and it is
not what the documentation says. Every hyperscaler in the set offers
per-destination access control, because every one of them sells to customers who
must separate one team's logs from another's.

That is worth stating plainly for two reasons. **A gate that passes for all
candidates does no selection work**, and CBD-103 should know that before it
weights this dimension. And the expectation that it *would* discriminate came
from a reasonable reading of the market rather than from evidence — which is
the same failure mode `OI-108-027` records about this pass's own forecasts,
appearing here in a source package.

**Where discriminating power may remain** is in the four properties of the gate
statement its pass test does not check: deliberate rather than continuous
capture, redaction, case linkage, and what *"stronger access control"* requires.
`OQ-108-036` already asks CBD-102 whether the test governs. **That question now
matters more than it did**, because on the test alone the gate has no
discriminating power at all.

#### The three are not equivalent, even passing alike

**C3 passes by the widest margin and has the most caveats.** Protected tables
give *"a 'deny by default' isolation model"* that no other candidate matches,
plus `DataActionsOnly` mode to close the control-plane bypass. But the feature is
**preview**, unauthorised queries *"succeed but return no data"* rather than
erroring, and table metadata stays visible regardless. Its own Example 4 warns
that an inherited read action defeats a table `NonAction`.

**C1 is the thinnest record of the three.** `roles/logging.viewAccessor` is a
clean, purpose-built grant, but **the retrieval found no statement about whether
a broader project-level role overrides a log-view restriction**, and `EV-102-254`
registers that absence rather than reading it as reassurance. `OQ-108-038`.

**C2 sits between them**, with two grant mechanisms and one precise limitation
already recorded: `StopQuery` and `StopLiveTail` cannot be resource-scoped.

#### A cost cross-link the selection should not miss

Azure's **Privileged Monitoring Data Reader** *"works with Microsoft Entra
Privileged Identity Management (PIM) for time-bound and just-in-time access"*.

**So the C3 mechanism that best satisfies this gate is the one whose licensing
cost is an open question.** `OQ-108-009` asks whether `HG-102-005` can be
satisfied for C3 without PIM and what Entra ID P2 costs per administrator seat;
`EV-102-229` establishes what PIM requires without establishing that PIM is
required. **C3's advantage on this dimension has a price attached that nobody has
obtained**, and a comparison that credits the advantage without the price would
be reading half the record. `OI-108-030`.

#### The evidence block is exhausted

`246`—`255` was reserved at tranche 17 for the concurrent `OQ-108-025` line of
work. `EV-102-254` and `255` close it. The next tranche on this branch takes
numbers above `259`, which is the corpus high-water mark, and
`scripts/audit-cbd-108.py` fails if it does not.

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
| OQ-108-012 | ~~Must `TD-103-004`'s scheduling requirement be met by Cloud Scheduler? Workflows and Eventarc are listed.~~ **Answered for Workflows at §4.16, and the answer is that it cannot substitute** — Google's documented route to a recurring workflow *is* Cloud Scheduler (`EV-102-234`). | **Corrects tranche 6.** Substituting Workflows would add it on top of Cloud Scheduler, not replace it. Eventarc and Managed Service for Apache Airflow remain unexamined — `OQ-108-015` |
| OQ-108-013 | Does the **global external Application Load Balancer** store Customer Data at rest? It is absent both from the configurable list and from the companion list of services that store nothing. | **Decides whether the C1 front door merely sits outside the region commitment or actually contradicts the single-region posture** — §4.13 |
| OQ-108-014 | ~~Do Cloud Armor's regional backend policies offer the capability set the CBD-103 gate matrix relied on?~~ **Settled at §4.14: the question does not arise.** No WAF gate exists; Cloud Armor is cited by no gate row; the two capability-dependent edge gates are already `UNPROVEN` for all three candidates; and the one that passes is `PASS (design)` on CoBudget's own record. | Closed. **The swap is clear to execute.** The residual is that `HG-102-020` and `HG-102-021` must later be evaluated against the **regional** product — `EV-102-233` establishes what regional supports, not parity with global |
| OQ-108-015 | Can **Eventarc** or **Managed Service for Apache Airflow** provide `TD-103-004`'s fifteen-minute tick without Cloud Scheduler? Both are on the data-residency list; neither was retrieved. | The remainder of `OQ-108-012`. Airflow does carry its own scheduler, but deploying it for a fifteen-minute tick at Private MVP scale is a proportionality judgment rather than a retrieval |
| OQ-108-016 | ~~Does Azure's naming of Microsoft Entra ID reach Entra External ID?~~ **Settled at §4.22: it does not.** An external tenant *"has the option to select the geographic location… for data storage"*, and the page states the locations *"may differ from those of Microsoft Entra ID"*. | Closed, **and the tranche 10 worry is retired** — C3's identity candidate is not in the uncovered class. What replaces it is more precise: the unit is **North America**, coarser than the topology's single-US-region assumption, and the choice **cannot be changed after it is set** |
| OQ-108-017 | ~~Do the AWS DPA and the Microsoft Product Terms state the region commitment contractually?~~ **Settled at §4.20, after §4.19 settled it wrongly for C2.** **C3: yes**, the Privacy & Security Terms (`EV-102-237`). **C2: yes**, DPA §12.1 (`EV-102-239`) — the DPA was read directly and states the clause `EV-102-238` reported as absent. | Closed. **All three candidates commit contractually.** C2's is narrower than the Asserted statement it replaces (personal data only) and is subordinated by DPA §16. Raises `OQ-108-020`, `OQ-108-021`, `OQ-108-022` |
| OQ-108-018 | ~~Which services are "Microsoft Azure Core Services"?~~ **Settled at §4.21** — `EV-102-241` retrieves the list. | Closed. **C3's composition can now be checked**, and Front Door and Logic Apps were not seen on it. Note the qualifier with no C1 counterpart: a service can be **on** the list and still not be configurable to a Geo, so membership is necessary and not sufficient. `OQ-108-023` |
| OQ-108-019 | ~~Does a **complete** parse of the AWS Service Terms contain a region clause? Two partial retrievals have not produced one.~~ **The premise is gone — §4.20.** The region element is carried by the DPA, a separate instrument, so the Service Terms need not carry it and their silence decides nothing. | Closed as posed. What the Service Terms say still matters, but for **conflict** rather than for silence — `OQ-108-020` |
| OQ-108-020 | Does any provision of the AWS Service Terms **conflict** with DPA §12.1? §16 makes the Service Terms control over the DPA, and `EV-102-220`'s parse was partial. | **Whether C2's region element survives its own subordination clause.** No conflict is known; the parse that would establish none has not been done |
| OQ-108-021 | Does CoBudget hold data in AWS that is **not Personal Data** under Applicable Data Protection Law? DPA §12.1 commits only as to Personal Data, so any such data sits outside the region commitment by the instrument's own definition. | **A question about CoBudget, not about AWS.** Product Owner judgment against the `DI-91-*` classes — and the reason C2's contractual upgrade is not a clean improvement |
| OQ-108-022 | ~~Is there an AWS instrument stating **provider-controlled** backup retention and expiry, as C1's CDPA does (`EV-102-168`)?~~ **Answered at §4.23: no.** The Customer Agreement, the last unread general AWS instrument, states a 30-day post-termination floor (`EV-102-243`) and assigns backup to the customer (`EV-102-244`). | Closed. **The term is not absent, it is deferred** — Service Terms §1.15 points at per-service technical documentation, which `EV-102-220` recorded at tranche 2 and this tranche re-reads. `OQ-108-025` follows the deferral |
| OQ-108-023 | ~~Are Azure Front Door and Logic Apps on the Microsoft Azure Core Services list?~~ **Settled at §4.26, and it splits.** **Logic Apps: present**, nested inside *"App Service (API Apps, Logic Apps, Mobile Apps, WebJobs, Functions)"* — never missing, only invisible to a flat enumeration. **Front Door: absent**, on a targeted check of a list that rendered in full (`EV-102-245`). | Closed. **C3 has one uncovered component, not two**, and it is the **global edge** — the exact structure C1 had before the tranche 7 swap. `OQ-108-028` |
| OQ-108-024 | Does CoBudget's C3 composition depend on **Microsoft Entra managed identities**, whose issued certificates `EV-102-242` records as written to Cosmos DB *"in the East US region"* with a read-only copy in every region the service runs? | Only material if the composition uses them; this pass establishes the provider behaviour, not CoBudget's dependence on it |
| OQ-108-025 | ~~What do the per-service technical documents that Service Terms §1.15 defers to state, for the components of CoBudget's evaluated C2 composition?~~ **Settled at §4.30.** Four components retrieved. One provider-enforced expiry (KMS, `EV-102-246`); one bypassable floor (`EV-102-247`); one provider-held copy outliving deletion but stated as a capability (`EV-102-248`); one unbounded deletion tail on a customer-set period (`EV-102-249`). | Closed, and **it does not move the gate**. The documentation §1.15 points at is written for the operator configuring the service, and `HG-102-013` asks for provider behaviour. **Corrects tranche 14** |
| OQ-108-026 | ~~Is there an Azure retention and expiry statement scoped to the evaluated C3 composition?~~ **Settled at §4.28: yes, for the database component.** `EV-102-256` states retention (7–35 days), expiry (*"automatically deleted after the retention period"*) and region (zone-redundant *"within a country or region"*) for Azure Database for PostgreSQL Flexible Server. It supersedes `EV-102-221` for this purpose, whose scope objection does not apply to it. **It does not move the gate** — `HG-102-013` is a cross-category gate and the hosting components have no equivalent statement (`OQ-108-029`). Original: `EV-102-221` gives 14 days for soft-deleted vault data and fails on scope. | **C3's retention and expiry elements.** The ruling voids `EV-102-221`'s class objection and leaves only its scope objection, so the target is now a narrower retrieval than tranche 2 supposed |
| OQ-108-027 | Should the `HG-102-013` catalog row be amended so its gate statement and pass test agree? The row demands a contract in one and admits written evidence in the other; the Product Owner has ruled the pass test governs. | **Upstream, in approved CBD-102.** The ruling settles the reading but not the text, so the contradiction survives for the next reader. Recorded here rather than amended, per `OI-108-020` |
| OQ-108-028 | Can C3's composition stand on **API Management** without **Azure Front Door**? CBD-103 §5 names the edge as *"Front Door / API Management"*; API Management is on the Core Services list and Front Door is not. | **The C3 counterpart of the swap that closed C1's edge gap at tranche 7**, and subject to the same caution — Front Door is a global product and dropping it is a functional change, not a swap. A CBD-103 question |
| OQ-108-029 | ~~Do the remaining evaluated C3 hosting components carry retention and expiry statements of their own?~~ **Settled at §4.31: three of four do, and none of them is about a backup.** Key Vault (7–90 days soft-delete), Azure Monitor Logs (30 days to 12 years) and Service Bus (message TTL) all state retention and expiry for **primary data**; none describes a provider-held backup, and Container Apps was not retrieved. **`HG-102-013` does not cleanly engage**, and §4.31 sets out the three available readings without picking one — `OQ-108-032`. Original: Do the remaining evaluated **C3 hosting** components — Container Apps, Service Bus, Key Vault, Azure Monitor — carry retention and expiry statements of their own? `EV-102-256` covers the database only, and `EV-102-237`'s Product Terms commitment speaks to **location**, not retention or expiry. | **The remainder of `HG-102-013` for C3.** A cross-category gate is not satisfied by one component of a composition — §4.28 |
| OQ-108-030 | ~~What do the per-service documents state for the remaining C2 components?~~ **Settled at §4.32 for SQS and EventBridge Scheduler; three components remain unretrieved.** SQS bounds retention at **14 days, a ceiling the customer cannot raise** (`EV-102-250`); EventBridge Scheduler states **no retention at all** and does not auto-delete a recurring schedule without an `EndDate` (`EV-102-251`). | Closed as posed. **Tranche 18's stated reason for asking was wrong** — `HG-102-003` concerns AWS's own data model, not CoBudget's data in these services. The value is `DI-91-*` inventory. Residue at `OQ-108-035` |
| OQ-108-031 | Does AWS publish any statement about **its own** backups of the platform, as distinct from the resources a customer creates and deletes? | **The only route left that could move `HG-102-013`'s retention and expiry elements for C2.** Eighteen tranches have found nothing suggesting it exists, which is not the same as establishing that it does not |
| OQ-108-032 | Does `HG-102-013` **apply** to services that hold no provider backup? Its pass test asks for backup retention, region and expiry, and Key Vault, Log Analytics and Service Bus have customer-configured retention of **primary data** instead. | **A second and independent reason to look at the row `OQ-108-027` already questions** — not that its halves disagree, but that both assume a datastore shape four of the five categories do not have. A CBD-102 catalog question |
| OQ-108-033 | Do **Azure Container Apps** state a retention or expiry position for anything they hold? The fourth C3 hosting component was not retrieved. | Completes `OQ-108-029` for the composition |
| OQ-108-034 | ~~Does C2's observability surface satisfy **`HG-102-026`**?~~ **Answered at §4.33: the pass test is met on the evidence.** CloudWatch Logs scopes IAM to an individual log group by ARN and by tag (`EV-102-252`), so two destinations — or the three `TD-103-021` specifies — with distinct access roles are configurable. | Closed. **The first evidence in this pass sufficient for a gate to pass rather than to narrow.** The outcome is CBD-103's; the gate is typed `Config`, so configuring it is CoBudget's own work. Discharges the C2 third of `OQ-103-009` |
| OQ-108-035 | What do the per-service documents state for **ECS on Fargate, API Gateway and CloudFront**, the three C2 components not retrieved at tranche 20? | **Inventory value only.** Their data-at-rest story plausibly reduces to CloudWatch Logs (`EV-102-249`), but this pass does not assert what a document says before reading it |
| OQ-108-036 | Does `HG-102-026`'s **pass test govern its gate statement**, as §4.24 ruled for `HG-102-013`? The statement names a separate boundary, stronger access control, deliberate rather than continuous capture, redaction and case linkage; the test checks two of the five. | **CBD-102 question, deliberately not settled by analogy.** The `HG-102-013` ruling resolved a contradiction unique to that row. A statement broader than its test is a different thing and may be common across the catalog |
| OQ-108-037 | ~~The same `HG-102-026` retrieval for **C1 and C3**.~~ **Done at §4.34, and all three candidates meet the pass test.** C1 by log views and `roles/logging.viewAccessor` (`EV-102-254`); C3 by per-table RBAC, protected tables and Privileged Monitoring Data Reader (`EV-102-255`). | Closed, and **completes the upstream `OQ-103-009`**. The finding is the non-result: the gate CBD-103 called *"the second gate most likely to eliminate a candidate"* **eliminates none of them**, so on its pass test it does no selection work. Raises `OQ-108-038`, `OI-108-030` |
| OQ-108-038 | Does a **broader project-level Google Cloud logging role override a log-view restriction**? `EV-102-254` found no statement either way, and an absence is not a reassurance. | **Whether C1's separation actually holds.** C2's equivalent limitation is recorded (`StopQuery`, `StopLiveTail`) and C3's is recorded (inherited read actions defeat a table `NonAction`); C1's is simply unknown, which makes it the thinnest of the three records rather than the cleanest |
| OQ-108-001 | Does *"core features"* in the Entra External ID allowance include Conditional Access, and what is the per-MAU rate beyond 50,000? Neither is stated on any page retrieved. | `OQ-104-016`; CBD-104 §6.6's `$0.00` figure for C3 |
| OQ-108-002 | Which plan clears the `ED-106-*` gate set for each email candidate? `CR0` prices the **cheapest gate-clearing tier**, and these records price the cheapest tier of any kind. For C2 that is Essentials; whether Essentials clears the gates is unestablished. | `CR0`; `OQ-106-010`'s remainder |
| OQ-108-003 | What is CoBudget's average outbound message size? C3 meters data transferred at `$0.00012/MB`, and no approved source establishes a message size, so the C3 figure carries an unresolved term. | `CT-102-006` for C3, category E |
| OQ-108-004 | Do the Azure Communication Services email rates in the Learn document match the rates the signed-in pricing page returns? The Learn page disclaims its own figures and the pricing page renders placeholders. | `EV-102-214`, `EV-102-215` |

## 6. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-022 | **The remaining H and D pricing work is a different shape from the tranches that preceded it.** Category H prices a composition of six services across three providers, and neither category has an established instance sizing to price against — which is part of why both were `UNKNOWN` to begin with. | Recorded so the pass's rate of progress is not extrapolated from the single-page retrievals that closed category E. The next useful step in category H may be `OQ-103-016`, which converts to an `HG-102-006` failure and is a gate question wearing a cost question's clothes, rather than the price lines of `OQ-103-015`. |
| OI-108-023 | ~~Nine tranches have examined C1's region position and C2's and C3's not at all.~~ **Addressed at tranche 10, and the warning proved correct.** The same question put to both inverts the picture: **only C1's commitment is contractual**, C2's blanket statement admits no per-composition check at all, and C3 names Microsoft Entra ID among services that cannot have a region specified. | Closed as a retrieval asymmetry; **the substantive position is now that C1 is the only candidate whose region position has been established**, not that it is the best. `OQ-108-017` carries the two unread contractual instruments that could change it again. |
| OI-108-024 | **A record that locates an instrument is not a route into its text.** Tranches 10 and 11 both reasoned about the AWS DPA from pages describing it, reached **opposite** conclusions, and both were wrong. `EV-102-238` stated the limit correctly in its own class note — *"what is documented is where the instrument lives"* — and then drew a conclusion about what the instrument says. | Recorded as a rule for the remaining `D3` block, which is largely contractual instruments: **a finding about what a document says requires that document.** It also qualifies §4.19's lesson that corrections come from retrieving one more thing — what mattered was retrieving the **primary** one. |
| OI-108-025 | **Two of three candidates deliver an element of `HG-102-013` by deferral rather than by statement.** C1's region element is deferred by CDPA §10.1 to the Service Specific Terms; C2's expiry element is deferred by Service Terms §1.15 to per-service technical documentation. | Recorded because it bears on estimating the rest of this gate. `HG-102-013` asks for three specific numbers and hyperscaler contracts habitually push operational specifics into documentation, so **deferral is the expected shape here, not an evasion**. A followable deferral is class `D3` work, far cheaper than the `D4` provider contact the gate's remaining items were assumed to need. |
| OI-108-026 | **The audit validates identifier existence, not appropriateness.** Tranche 13 cited `OQ-108-020` where `OQ-108-023` was meant, twice, and `scripts/audit-cbd-108.py` passed 84/84 both times — the check is membership of the defined set, which a wrong-but-real identifier satisfies. | Recorded as a known limit of the guard rather than a defect to fix: no mechanical check distinguishes a citation that is wrong from one that is right without understanding the claim. **The mitigation is that corrections are cheap when caught in the next tranche**, which is what happened here — §4.25. |
| OI-108-027 | **This pass has now twice overestimated what its own next step would achieve.** Tranche 14 called the post-ruling position *"materially better"* and the retrieval that followed moved nothing; tranche 2 called C1 *"one retrieval away"* from a `PASS` and tranche 3 removed the prospective `PASS` instead. Five of the seven ledger entries run **against** the claim they correct. | Recorded as a calibration note rather than a finding. **The pass is reliable about what it has retrieved and unreliable about what retrieval will yield next**, and its forward-looking statements should be read with that asymmetry in mind. It is also an argument for continuing to state expectations explicitly, since that is what makes them checkable. |
| OI-108-028 | **Retention in the C2 set is a property of each service, not of the composition, and two services sit at opposite extremes.** SQS cannot hold a message beyond **14 days** whatever the customer configures; CloudWatch Logs holds **indefinitely** by default and bounds its deletion lag not at all. KMS enforces both a floor and a ceiling; RDS and EventBridge Scheduler enforce neither. | Recorded for the `DI-91-*` inventory and for CBD-105. **A statement about "C2's retention" is not available and should not be attempted** — the honest unit is the service. It also explains why `HG-102-013`, which asks a composition-level question, cannot be satisfied by summing per-service answers. |
| OI-108-029 | **The provider's redaction mechanism is the one CoBudget's design rejects, and CoBudget does not depend on it.** CloudWatch Logs data protection masks by *"pattern matching and machine learning models"* against an enumerated identifier set, and does not mask events ingested before the policy existed. `TD-103-022` names that shape as the rejected alternative because it *"fails open"*. | Recorded so the feature is **not later cited as satisfying `TD-103-022`** — it is the mechanism that requirement was written against. It costs nothing here because `TD-103-022` puts redaction in the logger's closed typed field set rather than in a filter. The general lesson is that a provider capability matching a requirement **by name** may be the thing the requirement excludes. |
| OI-108-030 | **The C3 mechanism that best satisfies `HG-102-026` is the one whose licensing cost is unresolved.** Privileged Monitoring Data Reader *"works with Microsoft Entra Privileged Identity Management (PIM) for time-bound and just-in-time access"*, and `OQ-108-009` records that neither the necessity of PIM nor the per-seat cost of Entra ID P2 has been established. | Recorded so a comparison does not credit C3's advantage on this dimension while leaving its price in a different document. **The same feature appears as a strength in category H and as an unpriced dependency in categories H and I**, and `CR0` prices the cheapest gate-clearing configuration, not the cheapest one. |
| OI-108-019 | **This is tranche 1 of an incomplete pass.** Six records against 91 `D3` items; two questions touched, one closed. | The pass is worth continuing on these terms — every record here came from a public page in a single sitting. `OI-108-017`'s point stands: the constraint is that nothing is driving the work, not that the work is hard. |
| OI-108-020 | **The source packages are not amended.** CBD-106 §5.1 still records its hypothesis as untested and `OQ-106-010` as open; CBD-104 §6.6 still rests C3's `$0.00` on `OQ-104-016`. | Deliberate. Propagating into two approved, Confluence-published packages mid-pass would mean amending them again at the end. The record of what is now known lives here until the pass closes, and this document is cited by the disposition register so the position is not lost. |
| OI-108-021 | **`EV-102-214` is the first cost record in the corpus whose own source disclaims it.** Register §3.2 requires Documented-or-stronger for a cost figure, and this is Documented — but the page says its figures *"may not reflect the latest Azure pricing."* | Recorded at Low confidence per §3.1 rather than excluded, because a disclaimed figure from the vendor is still better than the `UNKNOWN` it replaces, and the disclaimer is quoted so no reader mistakes it for a firm price. If a firm C3 email rate is needed, `OQ-108-004` is the route. |
