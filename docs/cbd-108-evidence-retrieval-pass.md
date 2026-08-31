# CBD-108 — Evidence Retrieval Pass

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Registers evidence obtained by CBD-108's retrieval pass against the `D3` class of the carried-item register — items whose disposition is that a document exists and has not been read. **Tranches 1 and 2 of an incomplete pass.** Tranche 1 closes `OQ-106-010`, partially answers `OQ-104-016`, and **falsifies a hypothesis CBD-106 §5.1 recorded as likely**. Tranche 2 works the DPA block and materially narrows `HG-102-013` — **the one gate whose outcome could move every candidate in every category at once** — without moving it, for a different reason per candidate. **Tranche 3 retries the retrieval tranche 2 named as decisive, and the answer removes a prospective `PASS` rather than producing one** — §4.6 records the correction explicitly. **Tranche 4 returns to the pricing block**: category **N** is partly priced, quantifying `OI-130-021`'s A2P-floor claim, and `OQ-103-019` is answered in a way that puts a **second** condition on C3's `$0.00` identity figure. **Tranche 5 opens categories H and D and covers part of one of them** — §4.10 states what it did not do. It finds that Azure's cheapest PostgreSQL tier is excluded from production support by Microsoft's own documentation, which moves the `CR0` floor without producing a price. **Tranche 6 closes `OQ-108-007` from a list the Product Owner supplied, corrects tranche 3, and brings `HG-102-013` for C1 down to nameable components. Tranche 7 answers `OQ-108-011` — the composition uses **both** global and regional load balancing, so the regional half is covered and the global half is not — and separates the two remaining gaps by whether a like-for-like substitute exists. It also corrects the coherence review's regional finding. **Tranche 8 settles `OQ-108-014`: the regional-only swap moves no gate outcome. Tranche 9 records the swap as executed in CBD-103, and answers `OQ-108-012` in the negative — **Workflows cannot substitute for Cloud Scheduler**, correcting tranche 6. The cheap fix for the remaining gap is gone. **Tranche 10 puts the region question to C2 and C3, and C1 turns out to look worse only because it publishes a list that can be checked. Tranche 11 settles `OQ-108-017` and corrects tranche 10 in turn: C3's commitment is contractual too, in the Product Terms — §4.19 also collects the four corrections this pass has made to itself. **Tranche 12 reads the AWS DPA itself, supplied by the Product Owner, and corrects tranche 11 in turn: §12.1 states the region commitment contractually, so all three candidates now have one — but for C2 it is **narrower** than the Asserted statement it replaces, and the DPA assigns backup to the customer, so `HG-102-013`'s retention and expiry elements fail by allocation rather than by silence. **Tranche 13 settles `OQ-108-018` and `OQ-108-016`: C3's composition can be checked against its commitment for the first time, and the tranche 10 worry about Entra External ID is retired. Tranche 14 reads the AWS Customer Agreement, the last unread general AWS instrument, and answers `OQ-108-022` in the negative — no AWS contract states a backup retention or expiry term, because Service Terms §1.15 defers it to documentation. It records the Product Owner's ruling that `HG-102-013` accepts written evidence, which changes what would move that gate for C2 and C3 without moving it, and corrects two misreferences in tranche 13.** **Tranche 18 follows Service Terms §1.15's deferral into the per-service documentation and answers `OQ-108-025`: the deferral is followable and what it leads to is the wrong shape — overwhelmingly customer-configured retention, with provider-controlled lag on top that one page leaves explicitly unbounded. It corrects tranche 14's optimism about the cheap path.** **Tranche 20 completes `OQ-108-030` for two of five C2 components and corrects the reason tranche 18 gave for asking it: the retention of CoBudget's data in these services serves the `DI-91-*` inventory, not `HG-102-003`, which is about AWS's own data model. The composition does not bound retention uniformly — SQS cannot hold a message beyond fourteen days and CloudWatch Logs holds indefinitely by default.** **Tranche 21 answers `OQ-108-034` and discharges the C2 third of the upstream `OQ-103-009`: CloudWatch Logs scopes IAM to an individual log group by ARN and by tag, so two destinations with distinct access roles are configurable and `HG-102-026`'s pass test is met on the evidence. It is the first retrieval in this pass to produce evidence sufficient for a gate to pass rather than evidence that narrows one, and the outcome is CBD-103's to record. It also finds that the provider's redaction mechanism is the one `TD-103-022` rejects, which costs CoBudget nothing because its redaction is structural.** **Tranche 22 completes `OQ-103-009` by putting the same question to C1 and C3, and all three candidates meet `HG-102-026`'s pass test. The gate CBD-103 called the second most likely to eliminate a candidate eliminates none of them, and the evidence block this pass reserved is now exhausted.** **Tranche 23 registers no evidence and answers `OQ-108-027` by synthesis: all three DPAs have now been read, none describes a provider-held backup, and the upstream `OQ-103-024` is answered in the way it feared. Read literally, `HG-102-013` fails every candidate in every category at once. The documentary route on this gate is exhausted and what remains is class `D4`.** **Tranche 24 records the `HG-102-013` amendment the Product Owner made on August 29 (CBD-102 v1.2, §12.1) and re-measures all three candidates against the new pass test from evidence already held. All three still fail, now each on a named component rather than on a definition, and three records change their bearing without changing their content.** **Tranche 25 answers `OQ-108-040`: the substitute exists and it is worse. FireLens can route ECS logs away from CloudWatch, but S3's expiration states only that *"there may be a delay"* with no bound and no typical figure, where CloudWatch at least gives 72 hours. The unbounded tail is a property of asynchronous deletion rather than of one service, which raises a question about the clause this pass drafted.** **Tranche 26 answers `OQ-108-043` and the tranche 25 concern is half allayed and half confirmed: the three logging surfaces say materially different things, so the clause discriminates where the compositions actually are, but all three object stores are unbounded and Google's says so outright. No evaluated composition contains object storage, which makes that a prospective trap rather than a current failure — and the remedy tranche 25 examined would have sprung it.** **Tranche 27 answers `OQ-108-036` from CBD-102 §2.2 rather than by analogy — the pass test is *"the observation that decides"* every gate, so it governs by definition and no amendment is needed. It also corrects this pass's own error: `HG-102-026` is typed **Vendor**, not `Config`, which strengthens tranches 21 and 22 rather than weakening them.** **Tranche 28 opens category H at the line CBD-103 §6.2 says decides it — the support plan, a fixed floor rather than a rate. `CT-102-005` is priced for C2 and C3 and not for C1, whose page would not render across four URLs. The first comparable cost line in the category separates the candidates, and Azure's forced plan is described for non-production, exactly as its cheapest database tier was.** **Tranche 29 works the category H gate-forcing map and finds two things: every tier-forcing gate identified so far lands on **C3**, and C3 is also the candidate whose prices will not render. The price side of the cost model is blocked asymmetrically — AWS retrieves, Google and Azure largely do not — which changes what closing it requires.** **Tranche 30 completes two rows of the map. `OQ-103-007` is answered and it **removes** a suspected forcer: Access Transparency is *"a default security control for every Google Cloud organization"*, so C1's floor is not moved by `HG-102-009` after all. And `HG-102-024` gates a tier on C3 alone — AWS makes non-exportability standard — which turns tranche 29's C3 concentration from a possible retrieval artefact into evidence, for that row.** **Tranche 31 runs the `OI-102-015` seat check. The failure it feared does not materialise on either candidate checked, but the check prices `OQ-108-009`'s open half — Entra ID P2 at **$10.00 user/month** — and with `CT-102-003`'s two seats gives C3 the **first numbered floor in category H**, at $49.00/month, conditional on PIM being required.** **Tranche 32 completes the category H gate-forcing map, and the completed map corrects the reading tranche 30 gave the partial one. C2 forces no tier on two gates because it has **no passing control to gate** — which is not the same as being cheap. And C3's only priced line buys a control from which its own evaluated runtime is absent.** **Tranche 33 closes the first `$-` gap, from pricing the Product Owner supplied, and the figures correct this pass twice: Key Vault Premium is **not a plan-fee tier**, so the cost belongs in `CT-102-007` rather than `CT-102-001`; and the same gate reading produces either **$1 per key per month** or **$2,336.00 per month** depending on which Azure HSM product it requires.** **Tranche 34 closes the second `$-` gap from Product Owner supply and puts a number on `OQ-108-010`: the Burstable ruling moves C3's category D line from **$12.41** to **$163.52** a month, a **13.2x** move on a Product Owner judgment. The supplied General Purpose figures are the confidential-computing series only, so that ceiling may be too high.** **Tranche 35 closes the third `$-` gap and settles `OQ-108-004` in the direction nobody could assume: the Azure email rates the Learn page **disclaimed** are the rates the authoritative page carries. The figure does not change; its standing does, and `OI-108-021` resolves.** **Tranche 36 records three Product Owner rulings of August 30, 2026 and registers no evidence. Two of them price out: C3's identified floor settles at **$61.41**, and `HG-102-024` now forces a tier on **no** candidate. The third defers the `EX-102` question until the six evaluations re-measure, which makes that re-measurement the critical path.** **Tranche 37 answers `OQ-108-060` and the answer qualifies the re-measurement this pass supported two days' work earlier: nothing compensates for a region failure, because the region failure rests on an unexamined premise. The gate governs copies of CoBudget data, and whether the two out-of-region components hold any has never been established.** It performs no observation, contacts no provider, and moves no gate outcome or verdict. |
| Document version | 0.41 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.20; Cross-Category Coherence Review v0.20; Combined Cost Model v0.20; Carried Item Disposition Register v0.20; Acceptance Criteria Traceability v0.20 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `587eadd` |
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
* **It selects nothing.** `CR3` — cost never overrides a gate — and this pass
  moves no verdict. *(As at v0.39 the verdicts are no longer uniform: the
  August 30 re-measurement against catalog v1.3 makes all three `INELIGIBLE` in
  category H and C2 `INELIGIBLE` in category D. Those outcomes are CBD-103's and
  CBD-105's, not this pass's.)*
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
| Limitations | **Two operations cannot be resource-scoped.** The page states that for `StopQuery` and `StopLiveTail` *"you must set the value of the `Resource` field as `*`"*, because they act on a session or query rather than a resource. Neither reads log content, so this does not breach the boundary the gate protects, but a role holding them holds them across all log groups. **This is a configuration capability, not an observation**: it establishes that the separation is configurable, not that CoBudget has configured it. **Corrected at §4.39: `HG-102-026` is typed `Vendor`, not `Config`.** Under §2.3 a `Vendor` gate turns on whether the product has the capability, which is what this record establishes. The evidentiary caution stands — a document shows a capability, not a deployment — but the catalog grounding first given for it was wrong. |
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
| Limitations | **The retrieval found no statement about broader roles overriding a log-view restriction**, and its absence is registered rather than read as reassurance — a project-level logging role that confers read access regardless of view bindings would defeat the separation, and this page does not say whether one exists. `OQ-108-038`. The page notes only that *"IAM evaluates all applicable policies, with the first evaluation at the resource level."* As with C2 this is a **capability shown by document rather than by observation**. *(Corrected at §4.39: this field originally added that `HG-102-026` is typed `Config`; it is typed `Vendor`.)* The original URL redirected; the record cites the destination that served the content. |
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

### EV-102-260 — FireLens routes ECS logs away from CloudWatch Logs, on Fargate

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **lifetime element**, composition question for C2, category **H** (`OQ-108-040`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"Send Amazon ECS logs to an AWS service or AWS Partner"*, `https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"You can use FireLens for Amazon ECS to use task definition parameters to route logs to an AWS service or AWS Partner Network (APN) destination for log storage and analytics."* It *"works with Fluentd and Fluent Bit"*. Firehose is named as a destination in the permissions example: *"if a container is routing logs to Firehose, the task requires permission to call the `firehose:PutRecordBatch` API"*. Support: *"FireLens for Amazon ECS is supported for tasks that are hosted on both AWS Fargate on Linux and Amazon EC2 on Linux."* |
| **What it establishes** | **CloudWatch Logs is avoidable for the ECS on Fargate portion of the C2 composition.** The composition-change remedy that closed C1's edge gap at tranche 15 is therefore **available** here in principle. Whether it helps is `EV-102-261`. |
| Limitations | Covers **task container logs** routed through the log router. It does not establish that every C2 component can avoid CloudWatch Logs — API Gateway, RDS and others emit to it natively, and this record asserts nothing about them. It also does not establish where the FireLens container's **own** logs go; the page does not say, and the absence is not read as reassurance. |
| Re-verify by | February 28, 2027 |

### EV-102-261 — S3 states an unbounded expiration delay, and states it more weakly than CloudWatch Logs

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **lifetime element** for C2, category **H** — **negative record** (`OQ-108-040`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"Expiring objects"*, `https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Mechanism: on a nonversioned bucket, *"Amazon S3 queues the object for removal and removes it asynchronously, permanently removing the object."* Timing: **"There may be a delay between the expiration date and the date at which Amazon S3 removes an object."** Tag-based rules are evaluated *"daily"* and queued *"for asynchronous processing"*. |
| **Why the substitute is worse** | `EV-102-249` records CloudWatch Logs deleting *"up to 72 hours"* after the retention setting, *"but in rare situations might take longer"* — a typical figure with an unbounded tail. **S3 gives no figure at all.** *"There may be a delay"* states the existence of a lag and bounds it nowhere, so routing logs from CloudWatch to S3 **replaces a partly-bounded statement with an entirely unbounded one**. |
| Limitations | Concerns lifecycle **expiration**, not an explicit `DeleteObject` call, and says nothing about how long AWS retains an object after an immediate delete. Establishes the documented position, not observed behaviour. |
| Re-verify by | February 28, 2027 |

### EV-102-262 — Cloud Logging states a retention range and a shortening grace, and nothing about routine deletion timing

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **lifetime element** for C1, category **H** (`OQ-108-043`) |
| Provider / category | Google Cloud (C1) / H |
| Source | *"Configure and manage log buckets"*, `https://docs.cloud.google.com/logging/docs/buckets` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Retention: *"If you don't customize the retention period, the default is `30 days`"*, configurable *"between 1 day and 3650 days"*. Shortening: *"If you shorten the retention period of a log bucket, then there is a 7-day grace period in which expired logs aren't deleted."* |
| **Deletion timing on routine expiry: not stated** | The page gives **no** statement of how long after the retention period elapses the logs are actually removed. The 7-day grace applies to a **shortened** retention period, not to ordinary expiry. Registered as an absence, on the `EV-102-219` and `EV-102-226` precedent, and **not** read as an implicit promise of promptness. |
| **Contrast** | This is a third shape. `EV-102-249` gives a typical figure with an unbounded tail (CloudWatch); `EV-102-258` gives a **bounded** one for Azure, waiting 30 days on shortening and conceding a workspace *"might keep data for 31 days"*; Cloud Logging gives neither. |
| Limitations | Concerns log buckets, not Google's contractual position, which `EV-102-168` carries at the CDPA level and which the amended pass test admits by its *"for the provider as a whole"* clause. Whether the contract-level commitment reaches **routine expiry** as well as instructed deletion is `OQ-108-044`. |
| Re-verify by | February 28, 2027 |

### EV-102-263 — Google Cloud Storage disclaims any bound on lifecycle deletion timing, in terms

| Field | Content |
| --- | --- |
| Claim | `HG-102-013` **lifetime element**, cross-provider comparison — **negative record** (`OQ-108-043`) |
| Provider / category | Google Cloud (C1) / X |
| Source | *"Object Lifecycle Management"*, `https://docs.cloud.google.com/storage/docs/lifecycle` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"Cloud Storage performs an action asynchronously, so there can be a lag between when the conditions are satisfied and when the action is taken."* And, explicitly: **"Your applications shouldn't rely on lifecycle actions occurring within a certain amount of time after a lifecycle condition is met."** Configuration: *"Changes to a bucket's lifecycle configuration can take up to 24 hours to go into effect, and Object Lifecycle Management might still perform actions based on the old configuration during this time."* Illustration: *"if an object meets the conditions for deletion, the object might not be deleted right away, and you see the object until the lifecycle action is executed on the object."* |
| **The strongest statement of the three** | S3 says *"There may be a delay"* (`EV-102-261`). Google goes further and **instructs the reader not to rely on any bound at all**. On the amended gate's *"unbounded tail"* clause this is the clearest failure of the three object stores, and it is Google's. |
| Limitations | **Object storage is in no evaluated composition** — CBD-103 §5 names none for C1, C2 or C3 — so this record bears on the gate **prospectively** and not today. `OI-108-034`. Azure Blob Storage was not retrieved; `OQ-108-045`. |
| Re-verify by | February 28, 2027 |

### EV-102-264 — AWS support: Basic is free and the entry paid tier is Business Support+ at $29 per month

| Field | Content |
| --- | --- |
| Claim | `CT-102-005` for C2, category **H** (`OQ-103-015`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"AWS Support Plan Pricing"*, `https://aws.amazon.com/premiumsupport/pricing/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"Basic Support is included for all AWS customers."* **Business Support+**: *"Whichever is greater: $29/month per account - or - 9% of monthly AWS charges up to $10K"*, rising through 7%, 5% and 3% bands. **Enterprise Support**: *"Whichever is greater: $5k/month"* or 10% of charges up to $150K. **Unified Operations**: *"Whichever is greater: $50k/month"*. |
| **The figure that applies** | Demand model §9.1 puts Private MVP *"below the entry tier of essentially every managed provider"*, so the percentage bands never bind and **the applicable number is the $29/month floor** if a paid plan is taken at all. |
| **Whether it is forced** | CBD-103 §6.3 records C2's tier-forcing gates as *"Not yet identified"*. **No gate has been shown to force C2 off Basic**, so `CT-102-005` for C2 is **$0.00 unless one is found** — which is a different position from C3's. |
| Limitations | The page presents **Business Support+** as the entry paid tier; the *"Developer"* plan that older material describes does not appear, and this record does not assert it has been withdrawn. Establishes list price, not which plan clears the `ED-*`/`HG-*` sets. Billing currency and jurisdiction remain unfixed (`OI-102-014`). |
| Re-verify by | February 28, 2027 (Documented, 6 months) |

### EV-102-265 — Azure support: Developer is $29 per month and is described for non-production

| Field | Content |
| --- | --- |
| Claim | `CT-102-005` for C3, category **H** — **the `CR0`-forced line** (`OQ-103-015`) |
| Provider / category | Microsoft Azure (C3) / H |
| Source | *"Azure support plans"*, `https://azure.microsoft.com/en-us/support/plans/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Basic**: *"Included for all Azure customers"*, covering *"24/7 self-help resources"* and health notifications. **Developer**: *"$29 per month"*, for *"trial and non-production environments on Azure"*. **Standard**: *"$100 per month"*, for *"production workload environments on Azure"*. **Professional Direct**: *"$1,000 per month"*. |
| **This is the first `CR0`-forced price in category H** | CBD-103 §6.3 records C3's tier as *"at least Developer support, forced by `HG-102-009`"* via Customer Lockbox. That requirement now has a number: **$29.00 per month**, and it is not optional. |
| **The tier's own description cuts against it** | Developer is for *"trial and non-production environments"*; production is Standard at **$100 per month**. **This is the same shape as `EV-102-231`**, where Azure's cheapest PostgreSQL tier is *"Not recommended for production workloads"*. Two categories, one provider, the same question: whether CoBudget accepts a tier its vendor scopes away from production. `OQ-108-047`. |
| Limitations | List price only. Does not establish that Developer satisfies Customer Lockbox's requirement in substance — `EV-102-005` establishes the minimum plan, and this record prices it. Seat counts are not addressed; `CT-102-003` requires two, and `OI-102-015` makes a one-seat cap an `HG-102-006` failure rather than a cost line. |
| Re-verify by | February 28, 2027 |

### EV-102-266 — Google Cloud support pricing could not be retrieved, across four URLs

| Field | Content |
| --- | --- |
| Claim | `CT-102-005` for C1, category **H** — **negative record** (`OQ-103-015`, `OQ-103-007`) |
| Provider / category | Google Cloud (C1) / H |
| Source | Attempted: `https://cloud.google.com/support`, `https://cloud.google.com/support/plans` (404), `https://cloud.google.com/support/standard`, and a search that returned only third-party summaries |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium — the **failure** is what is documented |
| Content | No Google Cloud Customer Care tier pricing rendered from any page attempted. `/support/plans` returned a 404; the others returned content truncated before any pricing table. |
| **Why the third-party figures are not recorded** | A web search returned tier prices attributed to Google, from vendor-partner and blog sources. **They are not registered here.** `OI-108-024` states the rule this pass adopted after tranches 10 and 11: *a finding about what a document says requires that document*. Registering a price for a hard cost line from a reseller's summary would be the same error in a more expensive place, and evidence register §3.2 requires Documented-or-stronger for a cost figure. |
| Limitations | **This is a failure of retrieval, not a finding about Google.** It establishes nothing about what Google charges, and must not be read as evidence that C1's support is free or unpriced. `OQ-108-048` carries the retry. It also leaves `OQ-103-007` untouched — whether Access Transparency forces a paid support level for C1 is still open, and that question decides whether the price matters. |
| Re-verify by | February 28, 2027 |

### EV-102-267 — Azure Key Vault reserves HSM-protected keys to the Premium tier, and will not render its prices

| Field | Content |
| --- | --- |
| Claim | Tier-forcing for C3 via `HG-102-024`, category **H** (`OQ-103-015`). *(Recorded as `CT-102-001`; corrected to `CT-102-007` at §4.45, Premium carrying no plan fee.)* |
| Provider / category | Microsoft Azure (C3) / H |
| Source | *"Key Vault pricing"*, `https://azure.microsoft.com/en-us/pricing/details/key-vault/` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium for the **tier split**; the prices are absent |
| **The tier split, which did render** | **HSM-protected keys are listed *"N/A"* on Standard and available on Premium.** Software-protected keys, including RSA 2048, RSA 3072, RSA 4096 and ECC, are available on both tiers at the same transaction rate. |
| **The prices, which did not** | Every figure renders as **`$-`** — *"$-/10,000 transactions"* for secret and certificate operations on both tiers, and *"$- per key per month"* for HSM-protected keys. **This is the second time an Azure pricing page has behaved this way**: `EV-102-215` records the Azure Communication Services page rendering *"$-/Email sent"* and *"$-/MB transferred"*. |
| **Why the tier split matters without the price** | `CR0` prices *"the cheapest tier that clears every hard gate"*. If `HG-102-024`'s *"non-exportable keys where supported"* requires HSM protection, **C3 must use Premium and not Standard**, whatever the figures turn out to be. *(Corrected at §4.45: this originally said C3's **`CT-102-001`** is Premium. `EV-102-276` shows Premium carries **no plan fee** — the two tiers charge identical rates and differ only in whether HSM keys may be held — so the cost belongs in `CT-102-007`, not `CT-102-001`.)* `OQ-108-049` asks whether the gate's *"where supported"* qualifier makes HSM optional. |
| Limitations | Establishes the availability split only. Does **not** establish that Premium is required — that turns on reading `HG-102-024`, not on reading this page. Does not price either tier. `HG-102-024` is recorded *"Blocked by " + S + "3"* in CBD-103's matrix, so the **gate outcome** remains observation-bound; this record bears on the **tier**, which is a different question. |
| Re-verify by | February 28, 2027 |

### EV-102-268 — Google Cloud KMS pricing could not be retrieved, and the canonical URL redirects to itself

| Field | Content |
| --- | --- |
| Claim | `CT-102-007` for C1, category **H** — **negative record** (`OQ-103-015`) |
| Provider / category | Google Cloud (C1) / H |
| Source | Attempted: `https://cloud.google.com/kms/pricing` (content truncated before any pricing table) and `https://docs.cloud.google.com/kms/pricing` (301 redirect back to the first) |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium — the **failure** is what is documented |
| Content | No per-key-version or per-operation figure rendered, and no software-versus-HSM price comparison. The documentation domain that served `EV-102-254` and `EV-102-262` redirects to the marketing domain for this path, so the two routes are one route. |
| **Second Google pricing failure in two tranches** | `EV-102-266` records Google Cloud support pricing failing across four URLs in tranche 28. Together these are six failed attempts at Google list prices, against zero failures for AWS. |
| Limitations | **A failure of retrieval, not a finding about Google.** Establishes nothing about what Cloud KMS costs and must not be read as evidence that it is free. No third-party figures are registered, per `OI-108-024`. |
| Re-verify by | February 28, 2027 |

### EV-102-269 — Access Transparency is a default control, so `HG-102-009` forces no support tier on C1

| Field | Content |
| --- | --- |
| Claim | `CT-102-001` and `CT-102-005` tier-forcing for C1 via `HG-102-009`, category **H** (`OQ-103-007`) |
| Provider / category | Google Cloud (C1) / H |
| Source | *"Enable Access Transparency"*, `https://docs.cloud.google.com/assured-workloads/access-transparency/docs/enable` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **"Access Transparency is a default security control for every Google Cloud organization."** Viewing and configuring it requires an IAM role — *"Access Approval Viewer (`roles/accessapproval.viewer`) or Access Transparency Admin (`roles/axt.admin`)"* — which are permissions to use the feature, not prerequisites to obtain it. **No Cloud Customer Care support level is stated as a requirement.** |
| **What it settles** | `OQ-103-007` asked whether Access Transparency carries a support-level requirement, and CBD-103 §6.2 recorded that it *"moves C1's floor"*. **It does not.** `HG-102-009` forces no paid tier on C1, so C1's support line is not compelled by this gate — the mirror image of C3, where Customer Lockbox compels Developer support at $29.00/month (`EV-102-265`). |
| **It also corrects a secondary source** | `EV-102-004` recorded that *"the vendor page describes it as a default control while a secondary source asserts a paid support level"*. **The primary document says default control.** This is a further instance of `OI-108-024`: the secondary source was wrong and the vendor page was right. |
| Limitations | Establishes that no support tier is required to **have** Access Transparency. Does **not** establish that Access Transparency satisfies `HG-102-009` §, which CBD-103 records as `UNPROVEN` and which this record does not move. Access **Approval**, a separate product, is not addressed here and may carry different terms. |
| Re-verify by | February 28, 2027 |

### EV-102-270 — AWS KMS non-exportability is a standard property, so `HG-102-024` forces no tier on C2

| Field | Content |
| --- | --- |
| Claim | `CT-102-001` tier-forcing for C2 via `HG-102-024`, category **H** (`OQ-108-049`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"AWS KMS keys"*, `https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | On key material: the HSM backing key *"is generated on an HSM in the domain and is designed never to be exported from the HSM in plaintext."* On use: *"All objects encrypted under a KMS key (either customer-supplied data or HSM-generated keys) can be decrypted only on an HSM via a call through AWS KMS."* On price: customer managed keys carry *"a monthly cost… In addition, requests use and/or manage the key incur a usage cost"*, with no plan or tier named. |
| **What it settles** | **Non-exportable, HSM-backed key material is the standard property of every KMS key**, at per-key pricing, with **no account tier gating it** and no requirement for CloudHSM or a custom key store. `HG-102-024` therefore forces **no tier** on C2, and the cost lands in `CT-102-007` as a usage rate rather than in `CT-102-001` as a plan fee. |
| Limitations | Establishes the documented design property. The gate's pass test requires non-exportability and workload identity to be **demonstrated**, which CBD-103 records as *"Blocked by §3"* and which this record does not discharge. Says nothing about which services in the C2 composition can be configured to use customer managed keys. |
| Re-verify by | February 28, 2027 |

### EV-102-271 — Cloud HSM states no tier requirement, and states no price either

| Field | Content |
| --- | --- |
| Claim | `CT-102-001` tier-forcing for C1 via `HG-102-024`, category **H** — **weak record** (`OQ-108-049`) |
| Provider / category | Google Cloud (C1) / H |
| Source | *"Cloud HSM"*, `https://docs.cloud.google.com/kms/docs/hsm` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / **Low** — what is recorded is mostly an absence |
| Content | The page describes creating and using HSM-backed keys. On consumption: *"When you use HSM-backed keys and key versions for cryptographic operations, the Google Cloud project that makes the cryptographic request incurs cryptographic operation quota usage, and the Google Cloud project that contains the HSM keys incurs HSM QPM quota usage."* |
| **What it does and does not establish** | **No paid tier, subscription or plan is named as a prerequisite**, and HSM is presented as a **protection level on a key** rather than as an account tier. That is consistent with `HG-102-024` forcing no tier on C1 — **but it is an absence, not a statement**, and this pass does not read it as one. The quota language is about capacity, not price; `EV-102-268` records that Cloud KMS pricing did not render. |
| Limitations | Held at **Low** confidence deliberately. A page that does not mention a tier requirement is weaker evidence than one that states availability by tier, which is exactly what makes the C3 comparison in §4.42 uneven. `OQ-108-051` carries the confirmation. |
| Re-verify by | February 28, 2027 |

### EV-102-272 — Microsoft Entra ID P2 is $10.00 per user per month, and licensing is per user

| Field | Content |
| --- | --- |
| Claim | `CT-102-003` for C3, category **H**, and the price half of `OQ-108-009`, which also bears on category **I** |
| Provider / category | Microsoft Azure (C3) / H |
| Source | *"Microsoft Entra pricing"*, `https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | **Microsoft Entra ID P1**: *"$7.00 user/month, paid yearly (annual commitment)"*. **P2**: *"$10.00 user/month, paid yearly (annual commitment)"*. **Free**: no price listed, included with Microsoft cloud subscriptions. Licensing is **per user** for both paid plans. Privileged Identity Management is listed among Microsoft Entra ID Governance features as **included in P2**. |
| **What it settles, and what it does not** | This answers the **price** half of `OQ-108-009`, open since tranche 5. It does **not** answer the necessity half: the page lists PIM as included in P2 but does not state that PIM is the only route to `HG-102-005`, which is exactly the limitation `EV-102-229` recorded — *"establishes what PIM requires, not that PIM is required"*. |
| **Applied to `CT-102-003`** | The template requires **two** seats, the operator plus the catalog §2.5.1 named second principal. At P2 that is **$20.00 per month**, or $240 annually, on an annual commitment. |
| Limitations | Annual commitment is stated; no monthly-commitment price was retrieved. The figure is a list price and no billing currency is fixed for CoBudget (`OI-102-014`). Whether the second principal, who holds key-recovery custody and restore approval, needs a **full** P2 licence or a lesser one is not established here — `CT-102-003` asks the record to *"note where a provider charges full price for an approval-only seat"*, and this page does not address that. |
| Re-verify by | February 28, 2027 |

### EV-102-273 — AWS IAM quotas do not cap administrative principals near two

| Field | Content |
| --- | --- |
| Claim | `OI-102-015` seat check for C2, category **H** (`OQ-108-052`) |
| Provider / category | Amazon Web Services (C2) / H |
| Source | *"IAM and AWS STS quotas"*, `https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | Auto-approved quota table: **Roles per account, default 1000, maximum 10000**. **Groups per account, default 300, maximum 500**. Character limits are given for user, role and group names, so all three entity types exist as ordinary account objects. |
| **What it settles** | **`OI-102-015`'s failure mode does not arise for C2.** Nothing caps administrative principals at one, or near two. The `HG-102-006` risk that a cheapest tier permits only a single operator is not present. |
| Limitations | **This is a quotas page and states no prices**, so it does not establish that IAM principals are free of charge — that is a separate claim and is not made here. It also does not establish that the four `HG-102-006` duties can be separated across those principals, which is the gate's actual test and which CBD-103 records as unresolved. |
| Re-verify by | February 28, 2027 |

### EV-102-274 — Cloud Identity edition pricing could not be retrieved — the seventh Google pricing failure

| Field | Content |
| --- | --- |
| Claim | `OI-102-015` seat check and `CT-102-003` for C1, category **H** — **negative record** (`OQ-108-052`) |
| Provider / category | Google Cloud (C1) / H |
| Source | Attempted: `https://support.google.com/cloudidentity/answer/7319251` (301 to the marketing domain), `https://cloud.google.com/identity` (301 to the documentation domain), `https://docs.cloud.google.com/identity/docs` (no pricing) |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium — the **failure** is what is documented |
| Content | No Cloud Identity edition names, per-user price or free-tier user cap rendered. The support domain redirects to the marketing domain and the marketing domain redirects to the documentation domain, which carries guides rather than pricing. |
| **Seventh in the series** | `EV-102-266` (support, four URLs), `EV-102-268` (Cloud KMS) and now this. **Seven failed attempts at Google list prices against zero for AWS.** `OI-108-037` records the pattern; this record extends it from category H pricing into the seat question. |
| Limitations | Establishes nothing about C1's seat position. **It must not be read as evidence that C1 has no seat cap**, which is the mirror of the error `OI-108-023` recorded. `OQ-108-053` carries it. |
| Re-verify by | February 28, 2027 |

### EV-102-275 — Privileged Access Manager, read directly at last, states the capability and no price

| Field | Content |
| --- | --- |
| Claim | `CT-102-001` tier-forcing for C1 via `HG-102-005`, category **H** (`OQ-108-052`); discharges `EV-102-006`'s standing caveat |
| Provider / category | Google Cloud (C1) / H |
| Source | *"Privileged Access Manager overview"*, `https://docs.cloud.google.com/iam/docs/pam-overview` |
| Retrieval date | August 29, 2026 |
| Class / confidence | Documented / Medium |
| Content | *"You can use Privileged Access Manager (PAM) to control just-in-time temporary privilege elevation for select principals"*, with approval optional — *"Whether requests need approval from a select set of principals"* — and post-hoc audit: *"view audit logs afterwards to find out who had access to what and when"*. |
| **It discharges a standing caveat** | `EV-102-006` recorded PAM's capability but noted it was *"retrieved via search index rather than direct page fetch, so confidence is held at Medium and **the page should be fetched directly before selection**"*. **This is that fetch.** The capability claim survives contact with the primary document, which is the outcome `OI-108-024` exists to make people check for. |
| **Pricing: not stated** | The page makes no mention of cost, billing, tiers, or whether PAM is included at no additional charge. A separate attempt at `cloud.google.com/security/products/privileged-access-manager` returned **404**. `OQ-108-054`. |
| Limitations | Establishes the capability and the absence of a price statement on this page. Does **not** establish that PAM is free, and must not be read that way — the mirror of the error `OI-108-023` records. Does not establish that standing production access is unavailable, which is `EV-102-006`'s other recorded limitation and remains open. |
| Re-verify by | February 28, 2027 |

### EV-102-276 — Azure Key Vault pricing, and Premium is a rate card rather than a plan

| Field | Content |
| --- | --- |
| Claim | `CT-102-007` for C3 via `HG-102-024`, category **H**; closes the `$-` gap `EV-102-267` recorded (`OQ-108-049`) |
| Provider / category | Microsoft Azure (C3) / H |
| Source | *"Azure Key Vault pricing"*, content **supplied by the Product Owner** on August 30, 2026, from the page `EV-102-267` records as rendering every figure as `$-` to this pass's retrieval method. Same provenance class as `EV-102-239`. |
| Retrieval date | August 30, 2026 |
| Class / confidence | Documented / Medium |
| **Rates identical on both tiers** | Secrets operations **$0.03/10,000 transactions** on Standard and Premium alike. Software-protected keys: RSA 2,048-bit **$0.03/10,000 transactions**; advanced types, RSA 3,072, RSA 4,096 and ECC, **$0.15/10,000 transactions** — again the same on both. Certificate renewals **$3 per renewal request**. Automated key rotation **$1 per scheduled rotation**. |
| **The only tier difference** | **HSM-protected keys.** Standard: **N/A**. Premium: RSA 2,048-bit at **$1 per key per month** plus $0.03/10,000 transactions; advanced types at **$5 per key per month** for the first 250 keys, falling to $2.50, $0.90 and $0.40 in higher bands, plus $0.15/10,000 transactions. |
| **Managed HSM is a separate product at a separate price** | *"Managed HSM Pools — Hourly usage fee per HSM pool — Standard B1 $3.20"*. At 730 hours that is **$2,336.00 per month**, and it is charged **per pool** rather than per key. |
| **Billing detail that compounds with rotation** | *"Only actively used HSM protected keys (used in prior 30-day period) are charged, and each version of an HSM protected key is counted as a separate key."* Automated rotation therefore has two costs: $1 per scheduled rotation, **and** each surviving version counted separately while active. |
| Limitations | **No effective date appears in the supplied content**, so the figures cannot be version-compared, and `Re-verify by` rests on the supply date. Currency is not stated and `OI-102-014` records that no approved source fixes CoBudget's billing currency. The content was **not independently retrieved by this pass** — `EV-102-267` records why — so it carries the provenance of a Product Owner supply rather than of a page fetch. |
| Re-verify by | February 28, 2027 |

### EV-102-277 — Azure Database for PostgreSQL Flexible Server compute pricing

| Field | Content |
| --- | --- |
| Claim | `CT-102-006` for C3, category **D**; prices the `OQ-108-010` decision (`OQ-105-009`) |
| Provider / category | Microsoft Azure (C3) / D |
| Source | *"Azure Database for PostgreSQL pricing"*, content **supplied by the Product Owner** on August 30, 2026. Same provenance class as `EV-102-239` and `EV-102-276`. |
| Retrieval date | August 30, 2026 |
| Class / confidence | Documented / Medium |
| **Burstable, pay as you go** | **B1ms**, 1 vCore, 2 GiB — **$12.41/month**. B2s, 2 vCores, 4 GiB — $49.64. B2ms, 2 vCores, 8 GiB — $99.28. B4ms — $198.56, rising to B20ms, 20 vCores, 80 GiB — $992.80. |
| **General Purpose, DCadsv6-series, pay as you go** | **DC2ads v6**, 2 vCores, 8 GiB — **$163.52/month**, or **$130.82** on a *"1 year savings plan"* at *"~20% savings"*. DC4ads v6 — $327.04, doubling through the series to DC96ads v6, 96 vCores, 384 GiB — $7,848.96. |
| **What it prices** | `EV-102-231` established that Azure's cheapest PostgreSQL tier is excluded from production support by Microsoft's own documentation, and CBD-103 recorded that `CR0` is *"plausibly General Purpose at 2 vCores / 8 GiB rather than Burstable"* pending `OQ-108-010`. **That decision now has a number**: `CR0` moves from **$12.41** to **$163.52**, a factor of **13.2**. |
| **The General Purpose figures are one series only** | Everything supplied under General Purpose is **DCadsv6**, which is Azure's **confidential computing** series. Whether a cheaper General Purpose series exists for PostgreSQL Flexible Server was not supplied and is not assumed — if one does, **$163.52 is an over-estimate of the General Purpose floor**. `OQ-108-057`. |
| Limitations | **Compute only.** Storage, backup, IOPS and any high-availability multiplier are priced separately and were not supplied, so `CT-102-006` is not closed and `CT-102-007` is untouched. `DM-102-030` puts Base at **0.4 GB**, so storage will be small but is not zero. No effective date appears in the supplied content; currency is unstated (`OI-102-014`). The savings-plan figure implies a one-year commitment, which `CT-102-004` treats as a distinct line. |
| Re-verify by | February 28, 2027 |

### EV-102-278 — The Azure Communication Services rates, obtained, and the disclaimed email figures are correct

| Field | Content |
| --- | --- |
| Claim | `CT-102-006` for C3, category **E** (`OQ-108-004`, `OQ-106-010`) |
| Provider / category | Azure Communication Services (C3) / E |
| Source | *"Azure Communication Services pricing"*, content **supplied by the Product Owner** on August 30, 2026, from the page `EV-102-215` records as rendering `$-`. Same provenance class as `EV-102-239`, `EV-102-276` and `EV-102-277`. |
| Retrieval date | August 30, 2026 |
| Class / confidence | Documented / Medium |
| **Email — the operative line** | **`$0.00025/Email sent`** and **`$0.00012/MB transferred`**. |
| Other rates supplied | Chat `$0.0008/Message sent`; Number Lookup, line type, `$0.005/request`; Messaging Connect (Preview) `$0.0025/Message`; Advanced Messaging `$0.005/User message`; Job Router *"0-100 jobs per month: free"*, then `$0.01 per job routed`. Phone-number leasing and the SMS routes render as *"Learn more"* links rather than figures. |
| **What it settles** | `OQ-108-004` asked whether the Learn document's rates match what the authoritative pricing page returns. **They match exactly**, both terms. `EV-102-214` recorded `0.00025/email` and `$0.00012/MB` from a page that disclaimed itself: *"The prices in the following examples are for illustrative purposes and may not reflect the latest Azure pricing."* **The disclaimed figures were right.** |
| **Effect on the earlier records** | It **corroborates `EV-102-214`** and discharges the limitation that forced its Low confidence under §3.1. It **closes the gap `EV-102-215` recorded without contradicting it** — that record documents what the page renders to this pass's retrieval method, which is unchanged; the rates were obtained by supply, not by fetch. |
| Limitations | **The SMS routes are not priced here**, showing *"Learn more"* rather than values; `EV-102-228` already carries complete US SMS figures for C3, so no gap opens. Chat, Messaging Connect, Advanced Messaging and Job Router are **not in CoBudget's evaluated composition** and are recorded only so a later reader does not re-retrieve them. No effective date appears in the supplied content; currency is unstated (`OI-102-014`). |
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

**It selects nothing.** `CR3` is explicit that cost never overrides a gate, the
category E candidates remain `ELIGIBLE-PENDING-EVIDENCE`, and `OI-102-017` records that
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

**It is not an observation either.** The retrieval establishes that the
separation is **configurable**, from a document rather than from a deployment.
*(Corrected at §4.39: this paragraph originally added "and the gate is typed
`Config`", which is wrong — `HG-102-026` is typed `Vendor`. The evidentiary
caution stands; the catalog grounding given for it did not.)*

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

### 4.35 `OQ-108-027`: the row needs amending on two independent grounds, and the second is the serious one

**This tranche registers no evidence.** It is the first in the pass that does
not, and it is here because `OQ-108-027` is not a retrieval — everything it
needs was gathered by tranches 2, 12, 18, 19 and 20. What it does is put those
findings together and state what CBD-102 has to decide.

#### First ground: the row still states itself two ways

The gate reads *"Provider-controlled backup behaviour is **stated
contractually**"*; the pass test reads *"**A contract or written evidence**
states the provider's backup retention, region, and expiry."* The Product Owner
ruled at §4.24 that the pass test governs. **The ruling settled the reading and
not the text**, so the next reader re-derives the same contradiction. This part
is mechanical.

#### Second ground: no candidate's contract describes the object the row asks about

**All three DPAs have now been read.** That was `OQ-103-024`, which CBD-103
recorded as *"the highest-consequence documentary question in the set"*.

| | What the contract says about provider-held backups |
| --- | --- |
| **C1 Google** | CDPA §6.2 commits to deleting *"all remaining Customer Data (including existing copies)"* on a 30-day recovery window and a 180-day maximum. **`EV-102-168` records that the contract *"does not use the word backup or separately describe provider-held backup copies"*** — *"existing copies"* is the nearest language |
| **C2 AWS** | The DPA **assigns** backup and archiving to the customer (§5.2, §8), the Customer Agreement does the same at §2.3, and Service Terms §1.15 defers deletion timing to per-service documentation which describes customer-configured retention of primary data (`EV-102-240`, `EV-102-244`, tranche 20) |
| **C3 Azure** | Three of four hosting components carry retention statements and **none describes a backup** — they are customer-configured retention of primary data (§4.31) |

**No candidate's contract describes a provider-held backup with a stated
retention, region and expiry.** C1 comes closest and its own evidence record
says why it does not arrive.

#### The literal consequence, stated plainly

The pass test ends *"Silence fails"*. On the evidence now in hand the providers
are not silent about deletion — they are silent about **backups**, because
none of them treats a backup as a distinct artifact with a published lifetime.

`OQ-103-024` spelled out what follows: *"if the contracts are silent this gate
fails for every candidate simultaneously"*. `HG-102-013` is a cross-category
**X** gate, so a `FAIL` reaches C1, C2 and C3 in **every** category at once.
**Read literally, the gate as written eliminates the entire CBD-15 shortlist.**

**CBD-108 does not move gate outcomes and is not doing so here.** The outcome
belongs to CBD-103 and CBD-105. What this pass can say is that the evidence
those packages were waiting for has arrived, and it is not the answer anyone
was hoping for.

#### Three readings, and CBD-108 picks none

§4.31 set these out for C3 and they generalise to all three:

1. **The gate is satisfied.** Its purpose is that provider-held copies of
   customer data have a known lifetime, and C1's 30-and-180 does exactly that
   for *"existing copies"*.
2. **The gate fails on silence.** Its test names *backup* retention, nothing
   describes a backup, so the provider is silent on the thing asked about.
3. **The gate is mis-specified.** It is written around a datastore, where
   provider backups are a real and distinct artifact. A stateless compute
   service, a message broker, a queue and a secret store have no equivalent, and
   four of five categories are not datastores.

Reading 3 is what `OQ-108-032` and this section both point at. **It is not
CBD-108's to settle**, and `OI-108-020` is why: this pass does not amend its
source packages.

#### What the exception route does and does not offer

If the gate fails, `EX-102-001`—`007` is the only route onward, and its shape
matters to the decision:

* `EX-102-003` — *"An exception never converts a `FAIL` into a `PASS`, never
  aggregates into a rubric score, and never removes the `CONDITIONAL` verdict."*
  **So every candidate would be `CONDITIONAL`, not eligible.**
* `EX-102-004` — exceptions expire at 12 months or the end of the Private MVP,
  and an expired exception *"reverts the gate to `FAIL` and the provider to
  `INELIGIBLE`"*.
* `EX-102-001` — only the Product Owner may approve one.

**An exception is therefore a way to proceed, not a way to pass**, and it puts
every provider in the set on the same conditional footing with a dated expiry.
`OQ-108-039` puts that question rather than assuming the route is acceptable.

#### The documentary route on this gate is exhausted

`OQ-103-011` said so before any of this began: *"Must be asked explicitly; will
not be found in public documentation."* Twenty-three tranches later that
judgment is confirmed rather than overturned. Every named document has been
retrieved — three DPAs, two sets of service terms, a customer agreement, and
the per-service documentation two of them defer to.

**What remains is class `D4`, provider contact**, which the carried-item register
describes as the class no amount of reading closes. `OI-108-031`. That is worth
recording as a boundary: this pass has been productive because `D3` was cheap
and undriven, and on **this gate** it has now run out.

### 4.36 The `HG-102-013` amendment, and the position re-measured against it

**`OQ-108-027` is answered by decision rather than by this pass.** The Product
Owner amended `HG-102-013` on August 29, 2026, recorded at CBD-102 §12.1, taking
the catalog to **v1.2**. It follows the August 22 precedent that amended
`HG-102-006` and `HG-102-074` on the same trigger: a gate shown unsatisfiable by
any provider in its market.

The amended pass test asks for *"the maximum period after a deletion instruction
within which the provider will have destroyed every copy of CoBudget data it
holds, and the region or geography those copies occupy"*, adding that *"a
customer-configured period satisfies this **only** where the provider also states
a ceiling the customer cannot raise"* and that *"a stated bound with an unbounded
tail fails"*.

**This tranche registers no evidence.** It re-measures from what is already held,
which is the second synthesis-only tranche and the reason `OQ-108-027` needed no
retrieval.

#### The three candidates against the new test

| | **Lifetime** | **Location** |
| --- | --- | --- |
| **C1 Google** | **Met.** CDPA §6.2 states 30-day recovery and a 180-day maximum over *"all remaining Customer Data (including existing copies)"*, provider-stated and account-level, which the amended test's *"for the provider as a whole"* clause admits (`EV-102-168`) | **Not met.** Service Specific Terms cover only services on the data-residency list, and **Cloud Scheduler is not on it** (`EV-102-218`, §4.17) |
| **C2 AWS** | **Not met.** KMS states a provider ceiling of 7—30 days (`EV-102-246`) and SQS one of 14 days (`EV-102-250`), but **CloudWatch Logs holds indefinitely by default with no ceiling, and deletes *"up to 72 hours"* after the configured period *"but in rare situations might take longer"*** (`EV-102-249`). RDS retention is customer-set with no provider ceiling and a six-day support-recovery window (`EV-102-248`) | **Met.** DPA §12.1, contractually, though **as to Personal Data only** (§17) (`EV-102-239`) |
| **C3 Azure** | **Not met.** Key Vault purges at a 7—90 day ceiling (`EV-102-257`) and Log Analytics caps total retention at 12 years (`EV-102-258`), but **Service Bus entity default expiration is *"the largest possible value for a signed 64-bit integer"*** on standard and premium tiers with no stated ceiling (`EV-102-259`) | **Not met.** Product Terms cover Core Services, and **Front Door is absent from the list** (§4.26) |

**All three still fail, and that is the amendment working rather than failing.**
Under the previous text they failed because no hyperscaler describes a *backup*.
Under this one each fails on a **named component**: C1's scheduler, C2's log
sink, C3's edge and its broker. Those are findings about providers. The old
failure was a finding about the catalog.

**Two symmetries worth carrying to CBD-103.** C1 and C3 both fail on **location**
for a single component sitting outside an enumerated list, and in both cases it
is an edge or scheduling component rather than a datastore. C2 is the mirror
image: it is the only candidate that meets location, and the only one whose
lifetime failure is in its **observability** surface rather than its composition
edges.

#### Three records change their bearing without changing their content

This is not a correction and does not enter the ledger. **The records are
unchanged and were not wrong; the standard they are measured against moved.**

| Record | Bearing before | Bearing now |
| --- | --- | --- |
| `EV-102-250` SQS 14-day ceiling | Tranche 20 filed it as `DI-91-*` inventory and said plainly *"`HG-102-013` is **not** in play"* | **In play, and positive.** A provider ceiling the customer cannot raise is exactly what the amended test asks for |
| `EV-102-249` CloudWatch unbounded tail | A negative curiosity about deletion lag | **Load-bearing.** It is the specific clause on which C2's lifetime element fails |
| `EV-102-247` Secrets Manager bypassable minimum | Evidence that a stated **floor** can be elected out of | **Largely moot.** The amended test asks about a **ceiling**; a bypassable minimum neither satisfies nor fails it |

**The distinction matters for how this pass is read.** `OI-108-027` calibrates
the pass's forward-looking claims and five of its seven ledger entries run
against the claim they correct. **None of that applies here.** A record whose
relevance changes because the gate changed is a different event from a claim
that was wrong when made, and collapsing the two would make the ledger
meaningless. `OI-108-032`.

#### A weakness in the amended test, noted by the pass that proposed it

`EV-102-258` records that Log Analytics caps total retention at *"up to 12 years
(4,383 days)"*. **That is a ceiling the customer cannot raise, so it satisfies
the amended test as written.** Whether a twelve-year ceiling satisfies what the
gate is *for* is a different question, and this pass does not think the drafting
settles it.

Recording it here rather than leaving it for a later reader to find, because
this document proposed the wording that the Product Owner adopted, and a test
whose weakest pass is twelve years should say so out loud. `OQ-108-041`.

#### What this tranche does not do

**The six evaluations are not re-measured.** CBD-102 §12.1's own rule is that
*"every candidate already measured against the previous text must be re-measured
against this one"*, and `HG-102-013` is a cross-category `X` gate, so that reaches
CBD-103, 104, 105, 106, 107 and 130 at their own revision records. `OI-108-020`
is why this pass does not do it: CBD-108 does not amend its source packages.

**And no gate outcome moves here.** The re-measurement above is evidence put in
front of the packages that own the gate, not a verdict. `OQ-108-039` remains
live, because all three candidates still fail and the `EX-102` route is still
the only way onward if that stands.

### 4.37 `OQ-108-040`: the substitute exists, and it is worse

The question was whether C2's lifetime failure could be removed by composition
change, as C1's edge gap was at tranche 15. **It cannot, and the reason is more
interesting than a simple no.**

**The substitution is available.** `EV-102-260` establishes that FireLens routes
ECS task logs *"to an AWS service or AWS Partner Network (APN) destination"* on
Fargate, so CloudWatch Logs is not compulsory for the container tier.

**And the destination is worse.** `EV-102-261` records S3's expiration timing:
*"There may be a delay between the expiration date and the date at which Amazon
S3 removes an object."* That is the whole statement — no typical figure, no
bound. CloudWatch Logs at least says *"up to 72 hours"* before conceding it
*"might take longer"*.

| | Typical figure | Bound |
| --- | --- | --- |
| **CloudWatch Logs** (`EV-102-249`) | *"up to 72 hours"* | None — *"might take longer"* |
| **S3 lifecycle** (`EV-102-261`) | **None given** | **None** |

**Swapping the sink trades a partly-bounded statement for an entirely unbounded
one.** The composition remedy that worked for C1's load balancer does not
transfer.

#### The tail is a property of asynchronous deletion, not of one service

Set the four AWS deletion statements this pass has retrieved side by side:

| Service | Deletion model | Bound stated |
| --- | --- | --- |
| **KMS** (`EV-102-246`) | Scheduled, per key, on a waiting period | **Yes** — 7—30 days, provider-enforced |
| **SQS** (`EV-102-250`) | Per message, on TTL | **Yes** — 14 days maximum |
| **CloudWatch Logs** (`EV-102-249`) | Bulk, asynchronous | **No** — typical only |
| **S3** (`EV-102-261`) | Bulk, asynchronous, queued | **No** — not even typical |

**Services that delete on a schedule state bounds; services that delete in bulk
asynchronously do not.** That is a coherent engineering position rather than an
oversight — a queue drained at scale has no per-object deadline to promise
— and it means the gap is structural for the storage tier rather than a
CloudWatch defect. `OI-108-033`.

#### This raises a question about the clause this pass drafted

The amended `HG-102-013` says **"a stated bound with an unbounded tail fails"**.
That wording came from this document, on the strength of `EV-102-249`, and the
Product Owner adopted it.

**It now appears to fail AWS's asynchronous storage deletion generally**, not
one badly-worded page. And the obvious follow-up has not been retrieved: **do
Google Cloud Storage and Azure Blob Storage say the same thing?** Bulk
asynchronous deletion is not an AWS invention, and if all three hyperscalers
describe it the same way, **the clause recreates the failure mode the amendment
was made to remove** — a gate that fails every candidate for a reason that is
about how cloud storage works rather than about any provider's diligence.

`OQ-108-043` puts that retrieval, and it should be made **before** the six
evaluations re-measure against the amended text, because the answer changes what
they would be re-measuring against.

**This is the second concern raised about the amended wording in two tranches**,
after `OQ-108-041`'s twelve-year ceiling. Both come from the pass that proposed
the wording, and both are recorded rather than quietly worked around. The
amendment is still a large improvement on a test that failed everyone for asking
about an artifact providers do not name — but *"unbounded tail fails"* is a
sharper instrument than it looked when drafted, and it is worth knowing where it
cuts before the evaluations harden around it.

#### What is left for C2 on this element

Three routes, and none is a retrieval this pass can make:

1. **Accept under `EX-102`**, with the consequences §4.35 records —
   `CONDITIONAL`, not `PASS`, expiring at 12 months.
2. **Ask AWS to bound it.** Class `D4`, the class no reading closes, and the
   same answer `OQ-103-011` reached about this gate before the pass began.
3. **Revisit the clause**, via `OQ-108-042` and `OQ-108-043`.

### 4.38 `OQ-108-043`: the clause discriminates where the compositions are, and would not where they are not

Tranche 25 worried that *"a stated bound with an unbounded tail fails"* might
recreate the correlated failure the amendment removed. **The worry is half
allayed and half confirmed, and the halves are cleanly separable.**

#### Allayed: the logging surfaces say three different things

These are what the evaluated compositions actually contain.

| Surface | What it states about deletion timing | Under the amended clause |
| --- | --- | --- |
| **C3 Azure Monitor Logs** (`EV-102-258`) | *"waits 30 days before removing the data"* on shortening; a workspace *"might keep data for 31 days"* | **Bounded. Passes** |
| **C2 CloudWatch Logs** (`EV-102-249`) | *"up to 72 hours"*, *"but in rare situations might take longer"* | **Unbounded tail. Fails** |
| **C1 Cloud Logging** (`EV-102-262`) | A 7-day grace on **shortened** retention, and **nothing at all** about ordinary expiry | **Silence, which the gate's own *"Silence fails"* catches independently** |

**Three providers, three different answers.** The clause does not fail everyone
at the composition level — it separates them, which is what a working gate
does. Tranche 25's concern was reasonable on the evidence it had and is not
borne out here.

Note that Azure comes out **best** on this element, which is the reverse of its
position on §4.34's caveats and worth holding alongside them.

#### Confirmed: all three object stores are unbounded, and Google's is the worst

| Object store | Statement |
| --- | --- |
| **Google Cloud Storage** (`EV-102-263`) | *"Your applications shouldn't rely on lifecycle actions occurring within a certain amount of time after a lifecycle condition is met."* |
| **Amazon S3** (`EV-102-261`) | *"There may be a delay between the expiration date and the date at which Amazon S3 removes an object."* |
| **Azure Blob Storage** | **Not retrieved** — `OQ-108-045` |

**Google's is the strongest disclaimer of the three.** S3 concedes a delay;
Google instructs the reader not to rely on a bound existing. If the clause were
applied to object storage it would fail C1 and C2 outright, and probably C3.

#### Why that does not bite, and exactly when it would

**No evaluated composition contains object storage.** CBD-103 §5 names Cloud
Run, Cloud Armor, a load balancer, Pub/Sub, Cloud Scheduler, Secret Manager, KMS
and Cloud Logging for C1, and the equivalents for C2 and C3. Not one names a
bucket. **So the finding is prospective.** `OI-108-034`.

**And it closes a loop from the previous tranche.** §4.37 examined routing C2's
logs off CloudWatch via FireLens, and found S3 the natural destination. Doing
that would have introduced object storage into the C2 composition — the one
surface where all three providers disclaim a bound. **The remedy would have
sprung the trap.** That is worth recording plainly, because the remedy looked
sensible and this pass came close to recommending it before retrieving
`EV-102-261`.

#### One scoping question the retrieval exposed

C1's lifetime element was recorded as **met** at §4.36, through CDPA §6.2's
30-and-180 over *"existing copies"*, which the amended test admits by its *"for
the provider as a whole"* clause. But CDPA §6.2 is triggered by an instruction
*"at the end of the Term"*, and `EV-102-262` shows Cloud Logging saying nothing
about **routine retention expiry**, which is not an instruction at all.

**Does the amended test reach routine expiry, or only instructed deletion?** A
retention setting is arguably a standing instruction and arguably not. If it is
not, C1's lifetime element rests on a clause about contract termination and
Cloud Logging's ordinary behaviour is unstated. `OQ-108-044`.

#### Three wording questions in three tranches, and what that is worth

`OQ-108-041`, `OQ-108-042` and now `OQ-108-044` all concern the amended text,
and all were raised by the pass that proposed it.

**That is not a sign the amendment was wrong.** It replaced a test that failed
every candidate for asking about an artifact no provider names, and this tranche
shows the replacement **separating** the three where the old one could not. It
is a sign that a newly amended gate needs exercising before it hardens, and that
exercising it against real evidence surfaces things drafting alone does not.
**All three are cheaper to settle now than after six evaluations have
re-measured against the text.**

### 4.39 `OQ-108-036` is answered by CBD-102 §2.2, and this pass had the gate's type wrong

#### The answer is in the catalog, not in an analogy

`OQ-108-036` asked whether `HG-102-026`'s pass test governs its broader gate
statement, and §4.33 declined to settle it by analogy with the §4.24 ruling.
**It does not need an analogy.** CBD-102 §2.2 defines the relationship for every
gate in the catalog:

> *"Every gate carries a **pass test**: the observation that decides it."*

**The pass test is the deciding instrument by definition.** The gate statement
describes the property; the test decides it. That is the catalog's own
construction and it applies to all 75 rows, not to `HG-102-026` specially.

**The empirical check agrees.** Thirty-seven of the seventy-five gate statements
enumerate three or more comma-separated requirements, so a statement naming more
than its test operationalises is the **normal shape** of this catalog rather than
a defect in one row. If breadth meant *untested*, half the catalog would be
unenforceable.

**This also reframes the §4.24 ruling in a useful way.** `HG-102-013` needed a
Product Owner decision because its gate and test **contradicted** each other —
one demanded a contract, the other admitted written evidence, and no reading
satisfies both. `HG-102-026` presents no contradiction, only breadth, and §2.2
resolves breadth without a ruling. **Two different phenomena that looked alike.**

So `OQ-108-036` closes with no amendment required, and §4.34's finding stands:
on its pass test `HG-102-026` is met by all three candidates and does no
selection work.

#### Where the four unchecked properties actually live

The gate statement names a separate boundary, stronger access control,
deliberate rather than continuous capture, redaction, and case linkage. The test
checks the first two. **The other three are not unenforced** — they are
enforced somewhere else, and CBD-103 is explicit about it:

* **Deliberate, case-linked capture** is `TD-103-021`'s restricted-diagnostics
  destination: *"Deliberate, case-linked, redacted capture when S1 is
  insufficient"*, a CoBudget design obligation.
* **Redaction** is `TD-103-022`: *"Redaction is structural, not a filter"*,
  implemented in the logger's closed typed field set and verified by
  `SR-94-043`'s build-time and runtime scanning.

**They are CoBudget-side obligations verified by CBD-94, not provider properties
a document about AWS could establish.** That is why the pass test does not check
them, and it is a coherent division rather than an omission. `OQ-108-046` asks
whether anything checks them **for the provider**, which is a smaller residue
than it first appeared.

#### A correction: the gate is typed `Vendor`, not `Config`

Tranche 21 wrote, in `EV-102-252`'s limitations, at §4.33 and in the
`OQ-108-034` row, that `HG-102-026` is typed `Config`, and tranche 22 repeated
it in `EV-102-254`. **It is typed `Vendor`.** All four places are corrected in
this tranche and the original wording is quoted at the correction
so the error is visible.

The distinction is not cosmetic. §2.3 defines them:

* **Vendor** — *"Depends on a vendor capability. If the product does not have
  it, no amount of CoBudget configuration creates it, and the vendor fails."*
* **Config** — *"CoBudget can satisfy this by configuration… The gate fails
  only where the provider forecloses it."*

**The correction strengthens tranches 21 and 22 rather than weakening them.** On
a `Vendor` gate, showing that the product offers per-destination access control
with distinct roles **is** what the gate asks. Tranche 21 hedged that the
retrieval showed a capability rather than a deployment, and then grounded the
hedge in a satisfaction type the gate does not carry. The hedge is still right as
an evidentiary caution — a document is not an observation — but it was
resting on the wrong shelf.

**Ninth entry in the ledger.** It is the first correction to a fact about the
**catalog** rather than about a provider or about this pass's own forecasts, and
it came from reading §2.3 while answering a different question, which is the
same way §4.35's finding arrived.

**It also took a sweep to find, not a grep.** The first search located two
instances; a mechanical count of every mention of the type found four, in two
tranches and three document sections. A wrong-but-plausible claim propagates by
being restated in slightly different words, which is exactly the shape
`OI-108-026` records the audit cannot catch.

#### One incidental confirmation for `OQ-108-039`

Evidence register §5.2 lists the gates that may not be excepted: `HG-102-056`,
`HG-102-028` and `HG-102-014`. **`HG-102-013` is not among them.** So the
`EX-102` route `OQ-108-039` asks about is genuinely open, and that question rests
on a premise now checked rather than assumed.

### 4.40 Category H opens at the support line, and it is the line that separates the candidates

`OI-108-022` warned that category H is *"a different shape from the tranches
that preceded it"* — six services across three providers, with no established
instance sizing to price against. **CBD-103 §6.2 says where to start instead**,
and it is not the services:

> *"The comparison will be decided by floors, not usage."*

Demand model §9.1 puts Private MVP below the entry tier of essentially every
managed provider at every scenario including High. Base is 15,600 API requests,
29,280 background jobs and 1.0 GB of log ingest per month. **A per-unit rate
comparison at that scale compares the least significant term.** The floors are
`CT-102-001` through `CT-102-005`, and of those the support plan is the one a
gate already forces.

#### `CT-102-005`, priced for two of three

| | Free tier | Entry paid tier | Forced by a gate? |
| --- | --- | --- | --- |
| **C1 Google** | Not retrieved | **Not retrieved** (`EV-102-266`) | **Unresolved** — `OQ-103-007` |
| **C2 AWS** | Basic, *"included for all AWS customers"* | Business Support+, **$29/month** floor | **No gate identified.** CBD-103 §6.3: *"Not yet identified"* |
| **C3 Azure** | Basic, *"Included for all Azure customers"* | Developer, **$29.00/month** | **Yes** — `HG-102-009` via Customer Lockbox |

**This is the first `CR0`-forced price in category H.** CBD-103 §6.3 recorded
C3's tier as *"at least Developer support, forced by `HG-102-009`"* with the
price `UNKNOWN`. It is now **$29.00 per month**, and not optional.

**And the line separates the candidates rather than levelling them.** C3 pays
$29/month because Customer Lockbox requires a support plan. **C2 has no
identified gate forcing it off Basic**, so on the evidence in hand C2's
`CT-102-005` is **$0.00**. That is a real difference produced by a gate rather
than by a rate card, which is exactly the shape §6.2 predicted the comparison
would take.

**It is a small number and that is the point.** $29/month is $348/year, against
a category whose other five line items are still `UNKNOWN`. The finding is not
the magnitude; it is that the first comparable line in category H is decided by
which provider's transparency control carries a support prerequisite.

#### Azure's forced plan is scoped away from production, exactly as its database tier was

Developer support is *"for trial and non-production environments on Azure"*.
Production is **Standard at $100 per month**.

**`EV-102-231` found the same shape in category D**: Azure's cheapest PostgreSQL
tier is *"Not recommended for production workloads"* and *"does not qualify for
24/7 support"*, which is why `OQ-108-010` asks whether CoBudget accepts it.

**Two categories, one provider, one question.** If the Product Owner rules that
CoBudget does not run production on a tier its vendor scopes away from
production, consistency carries that ruling from the database to the support
plan, and **C3's support line moves from $29 to $100 per month**. `OQ-108-047`
puts them together, because deciding them separately would be how an
inconsistency gets into the cost model.

#### What was not retrieved, and why the available numbers were not used

Google's support pricing did not render from any of four URLs. A search returned
tier figures attributed to Google from vendor-partner and blog sources, and
**this pass does not register them**.

`OI-108-024` records the rule adopted after tranches 10 and 11 reached opposite
wrong conclusions about the AWS DPA from pages describing it: **a finding about
what a document says requires that document.** A cost figure taken from a
reseller's summary would be that error in a more consequential place, and
evidence register §3.2 independently requires Documented-or-stronger for a
price. `EV-102-266` registers the failure so the attempt is not repeated blindly
and so no reader mistakes the gap for a zero.

**`OQ-103-007` matters more than the missing price.** Whether Access Transparency
forces a paid support level on C1 decides whether C1's support line is a floor
at all. Until it is answered, C1's `CT-102-005` is unknown in **two** ways: the
price, and whether any gate compels paying it.

#### Where this leaves the cost model

`CT-102-005` moves from `UNKNOWN` in three of three to a figure in two of three,
with one of those two conditional on a Product Owner ruling. **Five of seven
category H line items remain `UNKNOWN`**, and the cost model's acceptance
criterion is unchanged — no combined total can be produced. What has changed
is that the category now has one line where the candidates differ for a reason
the evaluation can state.

### 4.41 The category H gate-forcing map, and two patterns in it

`CR0` prices *"the cheapest tier that clears every hard gate, not the cheapest
tier"*, so the category H cost lines cannot be filled until it is known **which
gates force which tiers**. That is the map this section starts.

#### The method, and why §3 does not block it

Twelve gates carry category **H** and fifteen cross-category **X** gates apply
to it. Most are capability questions — does the product do this — not tier
questions. **A gate forces a tier only where the capability sits behind a paid
plan.**

CBD-103's matrix records `HG-102-020`, `022` and `024` as *"Blocked by §3"*,
the unperformed observation pass. **That blocks the gate outcome and not the
tier-forcing question.** `CR0` asks which tier *could* clear a gate, which is a
documented capability-by-tier question answerable now. `EV-102-267` is an
example: whether C3's Key Vault clears `HG-102-024` needs observation, but
whether HSM keys require Premium is on the pricing page today.

#### The map so far

| Gate | Candidate | Tier forced | Status |
| --- | --- | --- | --- |
| `HG-102-009` Customer Lockbox | **C3** | Developer support | **Priced, $29.00/mo** — `EV-102-265` |
| `HG-102-009` Access Transparency | **C1** | A paid support level? | **Unresolved** — `OQ-103-007`, `EV-102-004` |
| `HG-102-005` just-in-time access | **C3** | Entra ID P2 / PIM | **Unpriced** — `OQ-108-009`, `EV-102-229` |
| `HG-102-026` diagnostics boundary | **C3** | PIM again, via Privileged Monitoring Data Reader | **Unpriced** — `OI-108-030` |
| `HG-102-024` secret manager | **C3** | **Key Vault Premium**, if non-exportability requires HSM | **Unpriced** — `EV-102-267`, `OQ-108-049` |
| `HG-102-024` | C1, C2 | Not established | Not retrieved |
| `OI-102-015` seat cap | Any | Cheapest tier capping seats at one is an `HG-102-006` **failure**, not a cost line | Not checked on any candidate |

#### First pattern: every identified forcer lands on C3

Five tier-forcing relationships are identified and **all five are Azure's**.

**That is not yet a finding about which provider costs more**, and this pass
will not present it as one. Two readings are open and the evidence does not
separate them:

1. **C3 genuinely gates more behind paid tiers** — Customer Lockbox needs a
   support plan, PIM needs P2, HSM keys need Premium.
2. **C3 documents capability-by-tier explicitly where the others bundle or stay
   silent.** A provider that publishes a Standard-versus-Premium matrix can be
   checked; one that does not yields no finding, which §4.18 already warned is
   *"an absence of evidence"* rather than a clean result.

**The same asymmetry-of-retrieval trap `OI-108-023` recorded on the region
question is live here**, and it was wrong then in C1's favour. The corrective is
`OQ-108-049` and the unchecked C1/C2 half of the `HG-102-024` row, not a
conclusion drawn now.

#### Second pattern: the candidate with the most forced tiers is the one that will not publish prices

`EV-102-267` renders every Key Vault figure as **`$-`**. `EV-102-215` recorded
the same on Azure Communication Services. `EV-102-268` records Google Cloud KMS
truncating, and `EV-102-266` records Google support pricing failing across four
URLs.

| Provider | List prices retrieved | Failures |
| --- | --- | --- |
| **C2 AWS** | Support tiers, SES, End User Messaging floors | **None** |
| **C1 Google** | None in category H | KMS, support — **six attempts** |
| **C3 Azure** | Structure only, never figures | Key Vault, ACS email — both render `$-` |

**The price side of the cost model is blocked asymmetrically**, and that changes
what closing it takes. It is not one more retrieval pass. For C1 and C3 the
remaining route is a **signed-in pricing calculator or a quote**, which
`OQ-108-004` already names for one Azure line and which `OQ-108-050` now
generalises to the cost model. `OI-108-037` records it.

**This is the more consequential of the two patterns.** A tier-forcing map can
be completed by reading. A price side cannot, for two of three candidates, and
the cost model is the single acceptance criterion CBD-108 has not met.

#### What this does not establish

No gate outcome moves, and none could — `HG-102-024` remains `UNPROVEN` for
all three and observation-bound. No tier is named for C1 or C2 in any category H
line. **`CT-102-001` is still `UNKNOWN` for all three candidates**, because a
forced tier without a price is not a cost line.

### 4.42 Two rows of the map complete, and one of them removes a forcer

#### `OQ-103-007` is answered, in C1's favour

CBD-103 §6.2 recorded that whether Access Transparency carries a support-level
requirement *"moves C1's floor"*, and `EV-102-004` recorded a vendor page
calling it a default control against *"a secondary source"* asserting a paid
support level.

**The primary document settles it**: *"Access Transparency is a default security
control for every Google Cloud organization."* (`EV-102-269`.)

**`HG-102-009` forces no support tier on C1.** That is the exact mirror of C3,
where the same gate compels Developer support at $29.00/month via Customer
Lockbox. **The gate that produces category H's only priced line for one
candidate produces nothing for another**, and the difference is a product
design choice rather than a rate.

**It is also a fifth instance of `OI-108-024`.** A secondary source asserted a
paid support level; the vendor's own page did not. This pass has now been wrong,
or nearly wrong, five times by reading about a document instead of reading it.

#### `HG-102-024`: C3 gates a tier, C1 and C2 do not

| | Non-exportable / HSM key material | Tier forced? |
| --- | --- | --- |
| **C1 Google** | HSM is a **protection level on a key**; no tier named (`EV-102-271`) | **No tier stated** — an absence, held **Low** |
| **C2 AWS** | *"designed never to be exported from the HSM in plaintext"*, standard on every KMS key (`EV-102-270`) | **No** — cost is a usage rate, `CT-102-007` |
| **C3 Azure** | HSM-protected keys *"N/A"* on Standard, Premium only (`EV-102-267`) | **Yes**, if `HG-102-024` requires HSM |

**This is the row where tranche 29's open question resolves.** §4.41 set out two
readings of the C3 concentration — that Azure genuinely gates more, or that
Azure merely documents capability-by-tier where others bundle — and declined
to choose.

**For this row the first reading is now evidenced.** C2 does not gate HSM
behind a tier because it does not need to: non-exportability is the default
property of the product. That is a substantive difference in how the capability
is sold, not a difference in how it is written up.

**The C1 half remains weak and is marked so.** `EV-102-271` records an absence,
and an absence is what §4.18 warned is *"an absence of evidence"* rather than a
clean result. `OQ-108-051` carries it, because a two-of-three row with one weak
leg is exactly how the region question went wrong at tranche 10.

#### The map after this tranche

| Gate | C1 | C2 | C3 |
| --- | --- | --- | --- |
| `HG-102-009` | **No tier** — default control | Not checked | **Developer support, $29.00/mo** |
| `HG-102-024` | No tier stated (weak) | **No tier** — standard property | **Key Vault Premium**, if HSM required |
| `HG-102-005` | Not checked | Not checked | **Entra ID P2 / PIM**, unpriced |
| `HG-102-026` | Not checked | Not checked | **PIM again**, unpriced |
| `OI-102-015` seat cap | Not checked | Not checked | Not checked |

**Two rows are complete enough to compare and both favour C1 and C2 on cost.**
That is a narrow finding about two gates and not a ranking; three rows are
unchecked on two candidates each, and `OQ-108-052` names the one most likely to
change the picture.

#### What is still unchecked, in priority order

1. **The seat cap** (`OI-102-015`). Unchecked on all three, and it is the item
   that converts a cost line into a **gate failure** rather than a price —
   *"a provider whose cheapest tier caps seats at one becomes an `HG-102-006`
   failure, not merely a cost line."* `CT-102-003` requires two seats.
2. **C2's `HG-102-009` answer.** C1's is a default control and C3's costs
   $29/month. C2's has not been identified at all, which leaves the only priced
   row in the category resting on two of three.
3. **`HG-102-005` and `HG-102-026` for C1 and C2.** Both are recorded as forcing
   PIM on C3; neither has been put to the other two, which is the same
   one-sided shape that made §4.41 refuse to draw a conclusion.

### 4.43 The seat check: the feared failure does not appear, and the check prices something else

`OI-102-015` warned that *"a provider whose cheapest tier caps seats at one
becomes an `HG-102-006` failure, not merely a cost line"*, and `CT-102-003`
requires **two** seats — the operator plus the catalog §2.5.1 named second
principal who holds key-recovery custody and restore approval.

| | Seat cap at the free floor? | Per-seat cost |
| --- | --- | --- |
| **C1 Google** | **Not retrieved** (`EV-102-274`) | Not retrieved |
| **C2 AWS** | **No** — 1000 roles per account by default (`EV-102-273`) | Not stated on the quotas page |
| **C3 Azure** | **No** — Entra ID Free exists | **$10.00 user/month** at P2 (`EV-102-272`) |

**The failure `OI-102-015` feared does not materialise on either candidate
checked.** That is a negative result and it is worth having: the item was
carried as the one that could convert a cost line into a gate failure, and on
the evidence it does not. The `HG-102-006` risk, where it exists, lies in
whether the four duties can be **separated** across principals — which
CBD-103 records as unresolved and which no pricing page decides.

#### The check answered a different question instead

`OQ-108-009` has been open since tranche 5, asking what Entra ID P2 costs per
administrator seat. **`EV-102-272` answers it: $10.00 user/month on an annual
commitment.**

Applied to `CT-102-003`'s two seats that is **$20.00 per month**, and combined
with `EV-102-265`'s Developer support it gives C3 a number:

| C3 identified forced floor | Monthly |
| --- | --- |
| Developer support, forced by `HG-102-009` (`EV-102-265`) | $29.00 |
| Entra ID P2 × 2 seats, **if** PIM is required (`EV-102-272`) | $20.00 |
| **Total identified so far** | **$49.00** |

**Three cautions on that number, and they matter more than the number.**

**It is partial.** It counts only the forcers identified so far. `CT-102-001`,
`002`, `004`, `006` and `007` are still `UNKNOWN` for C3, and Key Vault Premium
was a forced tier with no price until `EV-102-276` priced it at $1 per key
per month. **$49.00 is a floor under a
floor**, not a monthly cost.

**It is conditional.** The $20.00 depends on PIM being required for
`HG-102-005`, which `EV-102-229` explicitly did not establish and which
`OQ-108-009`'s remaining half still asks. If PIM is not required, C3's seat cost
may be zero.

**It has no counterpart.** C2's seat cost is not stated on the page retrieved
and C1's was not retrieved at all, so **$49.00 cannot be compared to anything**.
Publishing it beside two blanks is precisely the legibility trap `OI-108-037`
records, and this pass states the number only with that written next to it.

#### A refinement to `OI-108-037` that is immediately useful

`OI-108-037` recorded that Azure prices render as `$-`. **That is too broad.**
`EV-102-272` retrieved Entra pricing in full, with figures, from
`microsoft.com/en-us/security/business/`. The failures — `EV-102-267` Key
Vault, `EV-102-215` Communication Services — are both on
`azure.microsoft.com/en-us/pricing/details/`.

**So the blocked surface is one specific path, not Microsoft generally.** That
is worth knowing before anyone opens a signed-in calculator session under
`OQ-108-050`: Microsoft security-product pricing is retrievable from the open
web, and Azure per-service pricing is not. Google's failures show no such
split — seven attempts across four distinct domains have produced nothing.

### 4.44 The completed map, and why it is not a cost comparison

The remaining cells resolve from evidence CBD-103 already holds plus one
retrieval. **The completed map says something different from what the partial
one appeared to say.**

| Gate | **C1 Google** | **C2 AWS** | **C3 Azure** |
| --- | --- | --- | --- |
| `HG-102-005` JIT access | **PAM, native** (`EV-102-006`, `EV-102-275`). Price **not stated** | **No native capability** (`EV-102-008`) | **PIM, native**, needs Entra ID P2 — **$10.00 user/mo**, $20.00 for two seats |
| `HG-102-009` staff-access evidence | **Access Transparency**, a *"default security control"* — **no tier** | **No passing control**; visibility scoped to *"on behalf of"* operations, `OI-103-018` raises a `FAIL` question | **Customer Lockbox** — **Developer support $29.00/mo** |
| `HG-102-024` secret manager | HSM a protection level; no tier stated (weak) | **Non-exportability standard** on every KMS key — no tier | **Key Vault Premium** for HSM |
| `HG-102-026` diagnostics | Log views, `roles/logging.viewAccessor` | Log groups by ARN or tag | Protected tables, and Privileged Monitoring Data Reader *"works with… PIM"* |
| `OI-102-015` seat cap | Not retrieved | **No cap** — 1000 roles/account | **No cap**, but P2 is per-seat |

#### The correction: C2's zeros are absences of capability, not absences of cost

§4.42 concluded that *"both completed rows favour C1 and C2 on cost"*. **With the
map complete that reading does not survive.**

On `HG-102-005`, `EV-102-008` establishes that **AWS ships no native
temporary-elevated-access capability** and instead validates partner products
— Apono, CyberArk Secure Cloud Access and others. On `HG-102-009`, `EV-102-001`
and `EV-102-010` scope customer visibility to *"on behalf of"* service
operations, which `OI-103-018` records as raising a `FAIL` question.

**You cannot force a tier for a capability a provider does not offer.** C2
therefore shows no tier-forcing on the two gates where C3 shows the most —
**and that is the worst of the three positions, not the best.** The cost of C2's
answer is either a gate failure or a third-party product licence; the cost of
C3's is $10.00 per user per month.

**A gate-forcing map ranks nothing, and reading it as a cost comparison inverts
the result.** `OI-108-040`. This is the tenth entry in the correction ledger and
the fourth to a claim this pass made about its own findings rather than about a
provider.

#### The template has no line for C2's actual cost

`CT-102-001` through `007` price plan fees, platform fees, seats, committed
spend, support, and metered units — **all of them provider charges.** A
third-party product bought to supply a capability the provider lacks fits none
of them.

So C2's `HG-102-005` cost is not merely unknown; **it has nowhere to be
recorded.** `OQ-108-055` puts that to CBD-102, because a cost model that cannot
represent a candidate's largest cost on a gate would understate it as `$0.00`,
which is `CR4`'s *"a missing line item must never silently improve a total"*
happening through the template rather than through an omission.

#### C3's only priced line buys a control that excludes its own runtime

`EV-102-012` retrieved the **complete** Customer Lockbox supported-services
list. It includes *"Azure Database for PostgreSQL"*, *"Azure Monitor (Log
Analytics)"*, *"Azure App Service"*, *"Azure Functions"* and *"Azure Kubernetes
Service"*. **Azure Container Apps is absent**, and Container Apps is the C3
runtime CBD-103 §5 carries.

**So the $29.00/month Developer support plan that `HG-102-009` forces on C3 buys
a control that does not cover the service the evaluation actually proposes to
run.** The coherence review already records this as the set's one live
contradiction; what tranche 28 added, without noticing, was a price tag on it.

That does not make the $29.00 wrong — the plan is still forced, because
Customer Lockbox is still C3's answer to the gate for the services it does
cover. It makes the figure **less useful than it looked**, and it is a third
caution to set beside `OI-108-039`'s three.

#### What the map is actually good for

Not ranking. **It tells a signed-in pricing session which tier to price**, which
was the point:

* **C1** — price nothing extra for `HG-102-005` or `HG-102-009` until
  `OQ-108-054` says whether PAM carries a charge.
* **C2** — price no tier for either gate, and record that the real question is
  a `FAIL` or a third-party licence, not a plan.
* **C3** — price **Developer support**, **Entra ID P2 × 2**, and **Key Vault
  Premium**, and note that the first buys a control excluding Container Apps.

### 4.45 The first `$-` gap closes, and the figures correct this pass twice

The Product Owner supplied the Key Vault pricing that `EV-102-267` recorded as
rendering `$-`. **It is the first of the blocked Azure figures to be obtained by
any route**, and it corrects two things this pass had inferred from the tier
split alone.

#### First correction: Premium is not a plan-fee tier

`EV-102-267` established that HSM-protected keys are *"N/A"* on Standard and
available on Premium, and §4.41 concluded from that: *"C3's `CT-102-001` is
Premium and not Standard."*

**`CT-102-001` is the wrong line.** The figures show Standard and Premium
charging **identical rates** for secrets operations, for RSA 2,048-bit software
keys, and for advanced software key types. **There is no Premium subscription
fee.** The tiers differ only in whether HSM-protected keys may be held at all.

So the cost of the forced tier is not a plan fee of any size — it is
**$1 per key per month** for RSA 2,048-bit HSM keys, which lands in
`CT-102-007`, secondary metered units.

**Eleventh entry in the correction ledger.** The inference was reasonable and
wrong in the same way §4.44's was: a tier split was read as implying a tier
*fee*, when a tier can be a capability boundary with no subscription behind it.
Both errors came from reasoning about a price from something adjacent to it
rather than from the price.

#### Second correction, and it is the consequential one: a 2,336× spread

`HG-102-024` asks for *"a dedicated secret manager, KMS, or HSM… with
non-exportable keys where supported"*. **Azure sells two different things that
answer that**, and the supplied pricing puts them three orders of magnitude
apart.

| Reading of `HG-102-024` | Azure product | Monthly cost |
| --- | --- | --- |
| HSM-protected **keys** suffice | Key Vault **Premium** | **$1 per key** (RSA 2,048), or $5 per key for advanced types |
| A dedicated **HSM** is required | **Managed HSM pool**, Standard B1 | **$2,336.00** — $3.20/hour, per pool |

**One drafting question moves C3's category H cost by a factor of 2,336 for a
single key.** `OQ-108-049` was already asking whether *"where supported"* makes
HSM optional; it must now also say **which HSM product** the gate means, and
`OQ-108-056` states that half separately because it is the larger consequence.

**For scale**: at the Managed HSM reading, C3's identified floor goes from
`OI-108-039`'s $49.00 to roughly **$2,385**, and every other line in the
category becomes a rounding error. At the Key Vault reading it goes to about
**$50**. The cost model cannot be completed for C3 without this answer, and no
amount of further price retrieval substitutes for it.

#### A billing detail that interacts with rotation

*"Only actively used HSM protected keys (used in prior 30-day period) are
charged, and each version of an HSM protected key is counted as a separate
key."*

So a rotated key is not one charge. **Automated rotation costs $1 per scheduled
rotation and multiplies the per-key charge across surviving active versions.**
`TD-103-022` and the `HG-102-024` custody requirements imply rotation, and no
approved source fixes a rotation period — `OQ-108-056` carries the count.

#### What this says about the route to the remaining figures

**`OQ-108-050`'s route works.** The pass could not retrieve these figures from
the open web and recorded that as a hard blocker on the cost model; supplied
directly, they closed in one turn and immediately corrected two inferences.

That is worth recording as method rather than as a one-off (`OI-108-041`). The
remaining Azure gaps — Communication Services Email (`OQ-108-004`), PostgreSQL
Flexible Server at both candidate tiers, and the category H composition — are
the same shape, and the same route closes them. **It also shows what the gap was
costing**: two of this pass's inferences stood uncorrected only because the
figures were absent.

### 4.46 `OQ-108-010` has a price now, and it is a 13.2x decision

`EV-102-231` established that Azure's cheapest PostgreSQL tier is *"Not
recommended for production workloads"* and *"does not qualify for 24/7
support"*, and `OQ-108-010` asks whether CoBudget accepts a tier its vendor
scopes away from production. **The supplied pricing turns that judgment into a
figure.**

| `CR0` reading | Instance | Monthly |
| --- | --- | --- |
| Burstable is acceptable | **B1ms**, 1 vCore, 2 GiB | **$12.41** |
| Burstable is excluded | **DC2ads v6**, 2 vCores, 8 GiB | **$163.52** |

**A factor of 13.2, on a Product Owner judgment rather than on a retrieval.**
`DM-102-030` puts the Base database at **0.4 GB**, so B1ms's 2 GiB is ample and
the cheaper reading is not a stretch on capacity — the question is entirely
about the vendor's production disclaimer, not about fit.

**A spec-matched comparison is much narrower**, and worth stating so the 13.2x
is not over-read: B2ms at the same 2 vCores and 8 GiB is $99.28 against
DC2ads v6's $163.52, a factor of 1.65. **The 13.2x figure is a `CR0` artefact**
— `CR0` prices *"the cheapest tier that clears every hard gate"*, so excluding
Burstable does not move CoBudget to the matched Burstable size, it moves it to
the cheapest General Purpose one.

#### The General Purpose ceiling may be too high

**Everything supplied under General Purpose is the DCadsv6 series**, which is
Azure's **confidential computing** line. Whether Flexible Server offers a
cheaper General Purpose series was not supplied, and this pass does not assume
it either way.

If one exists, **$163.52 over-states the General Purpose floor** and the 13.2x
narrows. `OQ-108-057` carries it, and it should be answered before
`OQ-108-010` is decided — deciding against Burstable on the strength of a
confidential-computing price would be deciding against it on the wrong number.

#### The running total, with everything still attached to it

| Line | Burstable reading | General Purpose reading |
| --- | --- | --- |
| Support, Developer (`EV-102-265`) | $29.00 | $29.00 |
| Entra ID P2 x 2 seats (`EV-102-272`) | $20.00 | $20.00 |
| Key Vault Premium, one HSM key (`EV-102-276`) | $1.00 | $1.00 |
| PostgreSQL compute (`EV-102-277`) | **$12.41** | **$163.52** |
| **Identified across categories H and D** | **$62.41** | **$213.52** |

**Every caution `OI-108-039` attached still applies, and two more now do.** The
figure counts only identified forcers and covers two of the six categories; the
other four are absent, as is most of category H itself. It assumes one HSM key. It assumes PIM is
required. **And it excludes the Managed HSM branch entirely** — at that
reading of `HG-102-024` the same total is about **$2,548**, which `OQ-108-056`
still governs.

**It remains a figure for one candidate with no counterpart.** C1 and C2 have no
comparable line in either category, so this cannot be read as C3 being
expensive; it is C3 being the only candidate whose prices exist.

#### Second gap closed by supply, and the method holds

`OI-108-041` recorded after tranche 33 that the supply route works and that the
`$-` gap had been costing accuracy. **This is the second instance in two
tranches**, and it behaves the same way: a figure that could not be retrieved
turned a standing Product Owner question from a judgment about a disclaimer
into a judgment about $151.11 a month.

The remaining Azure gaps — Communication Services Email (`OQ-108-004`),
PostgreSQL storage and backup, and the category H composition — are the same
shape. The composition still needs a container sizing decision before it can be
priced at all (`OI-108-022`), which supply does not solve.

### 4.47 `OQ-108-004` settles, and the disclaimed figure was right

`EV-102-214` recorded Azure's email rates from a Learn page that disclaimed its
own numbers — *"The prices in the following examples are for illustrative
purposes and may not reflect the latest Azure pricing"* — and this pass held
it at **Low** confidence under §3.1 for that reason. `EV-102-215` then recorded
the authoritative pricing page rendering **`$-/Email sent`** and
**`$-/MB transferred`**, so the disclaimer could not be checked.

**`OQ-108-004` asked whether the two agree. They agree exactly.**

| | Learn page (`EV-102-214`) | Authoritative page (`EV-102-278`) |
| --- | --- | --- |
| Email send | `0.00025/email` | **`$0.00025/Email sent`** |
| Data transferred | `$0.00012/MB` | **`$0.00012/MB transferred`** |

#### The number does not change; its standing does

The cost model already carries C3's email at **`$0.06 + data`** at Base, from
`EV-102-214`. At `DM-102-039`'s Base of 250 messages, 250 x $0.00025 is
**$0.0625**, which is the figure already recorded. **Nothing in the cost model
moves.**

What changes is that the figure no longer rests on a source that disclaims
itself. `OI-108-021` recorded `EV-102-214` as *"the first cost record in the
corpus whose own source disclaims it"*, kept at Low *"because a disclaimed
figure from the vendor is still better than the `UNKNOWN` it replaces"*.
**That judgment is now vindicated rather than merely defensible**, and the item
resolves.

**This is a quieter result than the previous two supplies and worth saying so.**
Tranches 33 and 34 each corrected something. This one confirms. A retrieval pass
that only ever reports corrections would be describing its own error rate rather
than the evidence, and `OI-108-027`'s calibration cuts both ways: the pass has
been wrong about its forecasts and right about this.

#### What still blocks category E for C3

**One term, and it is not a price.** `$0.00012/MB transferred` needs a message
size, and `OQ-108-003` records that **no approved source establishes CoBudget's
average outbound message size**. That is a CoBudget input, not a retrieval, and
it is now the **only** thing standing between C3 and a complete category E line.

At Base the send term is $0.0625. A 100 KB message would add
250 x 0.1 x $0.00012, about **$0.003**; a 1 MB message about **$0.03**. **The
data term is small at every plausible size**, which is worth recording so
`OQ-108-003` is not treated as blocking more than it does — it bounds a
rounding error, not a decision.

#### Three supplies, three closures, and the pattern is now established

`OI-108-041` recorded after tranche 33 that the supply route works. **It is now
three for three**: Key Vault, PostgreSQL compute, Communication Services. Each
closed in one turn what this pass had recorded as unobtainable, and between them
they have corrected two inferences and confirmed a third.

**The remaining Azure gap in the cost model is the category H composition**,
and supply does not solve it — `OI-108-022` records that it needs a container
sizing decision before any calculator can produce a figure.

### 4.48 Three Product Owner rulings, August 30, 2026

**This tranche registers no evidence.** It records decisions, on the pattern
§4.12 and §4.24 set, and works out what they change.

#### Ruling 1 — vendor-disclaimed tiers are accepted for the Private MVP

`OQ-108-010` and `OQ-108-047` asked the same question of two Azure products:
whether CoBudget runs production on a tier its vendor scopes away from
production. §4.40 recorded that deciding them apart is how an inconsistency
enters the cost model, and they were put together.

**Ruling: both accepted, for the Private MVP, to be revisited before public
launch.**

| Line | Accepted | Rejected alternative |
| --- | --- | --- |
| PostgreSQL compute | **Burstable B1ms**, $12.41/mo | General Purpose DC2ads v6, $163.52 |
| Support plan | **Developer**, $29.00/mo | Standard, $100.00 |

**The saving is $222.11 a month against the strict reading**, and it is bought
by knowingly running on tiers Microsoft describes as *"Not recommended for
production workloads"* and for *"trial and non-production environments"*.
`EV-102-231` and `EV-102-265` carry the vendor's exact words, and this pass
records them beside the ruling so the decision is legible rather than implicit.

**It is scoped, and the scope needs a trigger.** *"Before public launch"* is not
a date or an event the evaluation can test. `OQ-108-058` asks for a named
trigger, because an acceptance that expires on an unnamed condition expires on
none.

**`OQ-108-057` is not answered and no longer blocks.** It asked whether a
cheaper General Purpose series than DCadsv6 exists, and it mattered only to the
size of the gap being rejected. It stays open for the revisit.

#### Ruling 2 — `HG-102-024`'s *"where supported"* makes HSM optional

`OQ-108-049` and `OQ-108-056` asked whether the gate requires HSM protection
and, if so, which Azure product — Key Vault Premium HSM keys at $1 per key
per month, or a Managed HSM pool at $2,336.00.

**Ruling: neither. The qualifier makes HSM optional, so Key Vault Standard with
software-protected keys satisfies the gate.**

**Three consequences, and the third is the one to carry.**

**C3's Key Vault line is $0.00.** Standard and Premium charge identical rates
for secrets operations and software keys (`EV-102-276`), so declining HSM costs
nothing rather than saving something.

**The 2,336x question closes without being answered.** §4.45 recorded it as the
single largest unresolved lever in the C3 cost model. It is now moot, not
resolved — if the ruling were revisited, the lever returns.

**`HG-102-024` now forces a tier on no candidate at all.** C2 never did
(`EV-102-270`), C1 never did on the evidence held (`EV-102-271`), and C3 no
longer does. **The gate-forcing map's `HG-102-024` row is empty**, and the only
forcers left in category H are `HG-102-009` and `HG-102-005`, both on C3 alone.
`OI-108-043`.

#### Ruling 3 — the `EX-102` question waits for the re-measurement

`OQ-108-039` asked whether the exception route leaves CBD-15 a selectable set,
given `EX-102-003` yields `CONDITIONAL` rather than `PASS` and `EX-102-004`
expires at twelve months.

**Ruling: deferred until the six evaluations re-measure against `HG-102-013`
v1.2.**

**This is the right order and it makes one thing the critical path.** CBD-102
§12.1 requires every candidate measured against the previous text to be
re-measured against the amended one, and that has not been done for any of the
six. Until it is, nobody knows which candidates still fail, so the exception
question would be answered on stale inputs.

**It also means the largest remaining piece of work on this ticket is not a
retrieval.** It is six evaluation revisions, and `OI-108-020` keeps this pass
from performing them.

#### Where C3's identified floor lands

| Line | Monthly |
| --- | --- |
| Developer support, forced by `HG-102-009` | $29.00 |
| Entra ID P2 x 2 seats, **if** PIM is required | $20.00 |
| Key Vault Standard, HSM declined under ruling 2 | **$0.00** |
| PostgreSQL Burstable B1ms | $12.41 |
| **Identified across categories H and D** | **$61.41** |

**Every caution `OI-108-039` attached still applies.** It counts identified
forcers across two of the six categories, assumes PIM is required, and **has no
counterpart for C1 or C2**. It is not a comparison and must not be read as one.

What the rulings changed is the **range**: from *$62.41, or $213.52, or about
$2,548* down to a single figure. **The uncertainty removed was decision
uncertainty, not measurement uncertainty**, and it was removed by three
sentences rather than by any retrieval this pass could have made.

### 4.49 `OQ-108-060`: nothing compensates, because the failure is not established

`OQ-108-060` asked what compensating control addresses the **region** limb of
`HG-102-013`, given that §5 of the disposition register offers cryptographic
erasure and erasure bounds a copy's lifetime rather than its location.

**The answer is that no control does, and that pursuing one was the wrong
question.**

#### Three candidates, and why each fails

| Candidate control | Why it does not work |
| --- | --- |
| **Cryptographic erasure** | Bounds **when** a copy stops being readable, not **where** it sits. The limb is untouched |
| **Encryption with in-region keys** | The "residency by key residency" argument. It is contestable on its own terms and the gate does not recognise it — `HG-102-013` asks where copies **occupy**, not whether they are legible |
| **Composition change** | Removing Cloud Scheduler or Front Door works, but it is **not an exception**. It is a different composition, and it already sits with CBD-103 at §4.17 and `OQ-108-028` |

#### The question underneath, which is better than the one asked

`HG-102-013` v1.3 governs *"every copy of CoBudget data"* the provider holds.
**A component that holds no CoBudget data cannot produce a region failure**,
because there is no copy for a commitment to fail to cover. The gate is
vacuously satisfied for it.

So the operative question is not *what compensates* but **whether the failure
exists**, and Google publishes the exact distinction that would settle it: a
list of services configurable to a region, and **a companion list of services
that store nothing**.

**The easy answer is not available, and this pass checked rather than assumed
it.** `EV-102-232` records Cloud Scheduler as *"absent from all four lists"* —
including the stores-nothing one. Absence from that list is not evidence that a
service stores something, since the list is not a census of everything that
stores nothing; but it is not the clean exemption either.

`OQ-108-013` already asks this of C1's global load balancer in precisely the
right form. **It has never been asked of Cloud Scheduler or of Azure Front
Door**, which are the two components the August 30 re-measurement failed C1 and
C3 on. `OQ-108-061`.

#### What this does to the re-measurement

The re-measurement recorded C1 and C3 as `FAIL` on region because the
commitment does not reach those components. **That remains true.** What it did
not establish is that the components hold copies for the commitment to reach.

**The `FAIL` is therefore premature rather than wrong.** It is sound if Cloud
Scheduler and Front Door hold CoBudget data at rest and vacuous if they do not,
and nobody has looked. **Twelfth entry in the correction ledger, and the fifth
to a claim this pass made about its own findings.**

**A stricter reading would go further, and this pass does not take it
unilaterally.** Register §3.3 gives `FAIL` only where *"evidence shows the
property is absent"*. On the strict reading, evidence shows the **commitment**
is absent for those components and says nothing about whether copies exist, so
the outcome should be `UNPROVEN` until `OQ-108-061` is answered. That would
reverse two of the three category H failures and restore C1 and C3 to
`ELIGIBLE-PENDING-EVIDENCE`.

**That is a verdict change and it is not this pass's to make.** `OQ-108-062`
puts it to CBD-103, which owns the outcome, and the evaluation carries a
qualification note in the meantime so no reader takes the `FAIL` as settled.

**C2's `FAIL` is untouched by any of this.** It fails on **lifetime**, on
CloudWatch Logs stating a bound with an unbounded tail, and that finding does
not depend on whether any component stores data — the component in question
demonstrably does.

## 5. Open questions raised by this pass

| ID | Question | Bears on |
| --- | --- | --- |
| OQ-108-005 | ~~Which Google Cloud services appear on the data-residency list at `cloud.google.com/terms/data-residency`, and does CoBudget's evaluated C1 composition appear on it? `EV-102-219` records that the page could not be read.~~ **Substantially answered at tranche 3 — §4.6.** The April 2024 snapshot covers Cloud Run, Pub/Sub, Cloud Logging and Cloud KMS, and **omits Cloud Scheduler and Secret Manager**. | **The answer removed a prospective `PASS` rather than producing one.** The remaining work is `OQ-108-007`, not this. |
| OQ-108-006 | The transaction-log retention window for Cloud SQL and RDS, and the numeric automated-backup retention range for RDS. | `OQ-105-002`'s remainder; `HG-102-042` |
| OQ-108-007 | Do **Cloud Scheduler** and **Secret Manager** appear on the current Google data-residency list, or on the companion *"without location configuration"* list? `EV-102-224` is an April 2024 snapshot that omits both; `EV-102-226` records that the companion list could not be read. | **The retrieval that now decides `HG-102-013` for C1**, replacing `OQ-108-005` in that role |
| OQ-108-008 | The per-segment US SMS send rate and the quantified carrier fees for AWS End User Messaging. `EV-102-227` records that neither is on the pricing page. | `CT-102-006` for C2, category N — the one term missing from the §4.7 comparison |
| OQ-108-009 | Can `HG-102-005` be satisfied for C3 without Privileged Identity Management, and if not, what does Entra ID P2 or ID Governance cost per administrator seat? | **`CR0` for C3 across categories H and I.** `EV-102-229` establishes what PIM requires, not that PIM is required |
| OQ-108-010 | ~~Does CoBudget accept a database tier its vendor describes as *"Not recommended for production workloads"*?~~ **Ruled August 30, 2026: accepted for the Private MVP, to be revisited before public launch** §4.48. | Closed. C3's category D line is **Burstable B1ms at $12.41/month** rather than General Purpose at $163.52. Decided together with `OQ-108-047`. The revisit needs a named trigger — `OQ-108-058` |
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
| OQ-108-027 | ~~Should the `HG-102-013` catalog row be amended so its gate statement and pass test agree?~~ **Amended by Product Owner decision, August 29, 2026** — CBD-102 v1.2, §12.1, on the August 22 precedent. Both defects fixed: the gate no longer says *"contractually"*, and the test asks for a bounded lifetime over every copy the provider holds rather than for a *backup* by name. | Closed. **Re-measured at §4.36**: all three candidates still fail, each on a named component rather than on a definition. Raises `OQ-108-040`, `OQ-108-041`, `OI-108-032` |
| OQ-108-028 | Can C3's composition stand on **API Management** without **Azure Front Door**? CBD-103 §5 names the edge as *"Front Door / API Management"*; API Management is on the Core Services list and Front Door is not. | **The C3 counterpart of the swap that closed C1's edge gap at tranche 7**, and subject to the same caution — Front Door is a global product and dropping it is a functional change, not a swap. A CBD-103 question |
| OQ-108-029 | ~~Do the remaining evaluated C3 hosting components carry retention and expiry statements of their own?~~ **Settled at §4.31: three of four do, and none of them is about a backup.** Key Vault (7–90 days soft-delete), Azure Monitor Logs (30 days to 12 years) and Service Bus (message TTL) all state retention and expiry for **primary data**; none describes a provider-held backup, and Container Apps was not retrieved. **`HG-102-013` does not cleanly engage**, and §4.31 sets out the three available readings without picking one — `OQ-108-032`. Original: Do the remaining evaluated **C3 hosting** components — Container Apps, Service Bus, Key Vault, Azure Monitor — carry retention and expiry statements of their own? `EV-102-256` covers the database only, and `EV-102-237`'s Product Terms commitment speaks to **location**, not retention or expiry. | **The remainder of `HG-102-013` for C3.** A cross-category gate is not satisfied by one component of a composition — §4.28 |
| OQ-108-030 | ~~What do the per-service documents state for the remaining C2 components?~~ **Settled at §4.32 for SQS and EventBridge Scheduler; three components remain unretrieved.** SQS bounds retention at **14 days, a ceiling the customer cannot raise** (`EV-102-250`); EventBridge Scheduler states **no retention at all** and does not auto-delete a recurring schedule without an `EndDate` (`EV-102-251`). | Closed as posed. **Tranche 18's stated reason for asking was wrong** — `HG-102-003` concerns AWS's own data model, not CoBudget's data in these services. The value is `DI-91-*` inventory. Residue at `OQ-108-035` |
| OQ-108-031 | Does AWS publish any statement about **its own** backups of the platform, as distinct from the resources a customer creates and deletes? | **The only route left that could move `HG-102-013`'s retention and expiry elements for C2.** Eighteen tranches have found nothing suggesting it exists, which is not the same as establishing that it does not |
| OQ-108-032 | Does `HG-102-013` **apply** to services that hold no provider backup? Its pass test asks for backup retention, region and expiry, and Key Vault, Log Analytics and Service Bus have customer-configured retention of **primary data** instead. | **A second and independent reason to look at the row `OQ-108-027` already questions** — not that its halves disagree, but that both assume a datastore shape four of the five categories do not have. A CBD-102 catalog question |
| OQ-108-033 | Do **Azure Container Apps** state a retention or expiry position for anything they hold? The fourth C3 hosting component was not retrieved. | Completes `OQ-108-029` for the composition |
| OQ-108-034 | ~~Does C2's observability surface satisfy **`HG-102-026`**?~~ **Answered at §4.33: the pass test is met on the evidence.** CloudWatch Logs scopes IAM to an individual log group by ARN and by tag (`EV-102-252`), so two destinations — or the three `TD-103-021` specifies — with distinct access roles are configurable. | Closed. **The first evidence in this pass sufficient for a gate to pass rather than to narrow.** The outcome is CBD-103's, and the gate is typed **`Vendor`** — corrected at §4.39 from the `Config` this row first recorded — so showing the product has the capability is what the gate asks. Discharges the C2 third of `OQ-103-009` |
| OQ-108-035 | What do the per-service documents state for **ECS on Fargate, API Gateway and CloudFront**, the three C2 components not retrieved at tranche 20? | **Inventory value only.** Their data-at-rest story plausibly reduces to CloudWatch Logs (`EV-102-249`), but this pass does not assert what a document says before reading it |
| OQ-108-036 | ~~Does `HG-102-026`'s pass test govern its broader gate statement?~~ **Answered at §4.39 from CBD-102 §2.2, not by analogy: *"Every gate carries a pass test: the observation that decides it."*** The test governs by definition, for all 75 gates. | Closed, **no amendment required**. 37 of 75 statements enumerate 3+ requirements, so breadth is the catalog's normal shape. `HG-102-013` needed a ruling because its halves **contradicted**; breadth is a different phenomenon. §4.34's finding stands |
| OQ-108-037 | ~~The same `HG-102-026` retrieval for **C1 and C3**.~~ **Done at §4.34, and all three candidates meet the pass test.** C1 by log views and `roles/logging.viewAccessor` (`EV-102-254`); C3 by per-table RBAC, protected tables and Privileged Monitoring Data Reader (`EV-102-255`). | Closed, and **completes the upstream `OQ-103-009`**. The finding is the non-result: the gate CBD-103 called *"the second gate most likely to eliminate a candidate"* **eliminates none of them**, so on its pass test it does no selection work. Raises `OQ-108-038`, `OI-108-030` |
| OQ-108-038 | Does a **broader project-level Google Cloud logging role override a log-view restriction**? `EV-102-254` found no statement either way, and an absence is not a reassurance. | **Whether C1's separation actually holds.** C2's equivalent limitation is recorded (`StopQuery`, `StopLiveTail`) and C3's is recorded (inherited read actions defeat a table `NonAction`); C1's is simply unknown, which makes it the thinnest of the three records rather than the cleanest |
| OQ-108-039 | If `HG-102-013` fails all three candidates, does the `EX-102` route leave CBD-15 a selectable set? **Deferred by Product Owner ruling, August 30, 2026, until the six evaluations re-measure against `HG-102-013` v1.2** §4.48. | **Open, and deliberately so.** CBD-102 §12.1 requires the re-measurement and none has been done, so the question would otherwise be answered on stale inputs. **This makes the six evaluation revisions the critical path**, and `OI-108-020` keeps this pass from doing them |
| OQ-108-040 | ~~Can C2's lifetime failure be removed by composition change?~~ **Answered at §4.37: no, and the substitute is worse.** FireLens can route ECS logs off CloudWatch (`EV-102-260`), but S3 states only *"There may be a delay between the expiration date and the date at which Amazon S3 removes an object"* — no figure, no bound, where CloudWatch at least gives 72 hours (`EV-102-261`). | Closed. **The tail is a property of asynchronous bulk deletion, not of one service** — `OI-108-033`. Raises `OQ-108-042` and `OQ-108-043` about the amended clause |
| OQ-108-041 | Does a **twelve-year ceiling** satisfy what `HG-102-013` is for? `EV-102-258` records Log Analytics capping total retention at *"up to 12 years (4,383 days)"*, which is a ceiling the customer cannot raise and therefore passes the amended test **as written**. | **A weakness in wording this pass proposed.** The amended test asks whether a ceiling exists, not whether it is proportionate. CBD-102's to decide whether that is the intent |
| OQ-108-042 | Does the amended test's **"a stated bound with an unbounded tail fails"** clause fail AWS's asynchronous storage deletion **generally**, and is that the intent? **Partly answered at §4.38: it fails AWS's object storage and log sink, but not Azure's log sink, and Google's log sink fails on silence instead.** | **The factual half is settled and the intent half is CBD-102's.** The clause separates the three candidates at the composition level rather than failing them alike |
| OQ-108-043 | ~~Do Google Cloud Storage and Azure Blob Storage describe bulk deletion the same way AWS does?~~ **Answered at §4.38 for Google, and the answer is worse than AWS's**: *"Your applications shouldn't rely on lifecycle actions occurring within a certain amount of time"* (`EV-102-263`). Azure Blob not retrieved (`OQ-108-045`). | Closed for Google. **But no evaluated composition contains object storage**, so the clause does not recreate correlated failure today — `OI-108-034`. The logging surfaces, which the compositions do contain, give three different answers |
| OQ-108-044 | Does the amended test reach **routine retention expiry**, or only **instructed deletion**? CDPA §6.2 is triggered *"at the end of the Term"*, and `EV-102-262` shows Cloud Logging silent on ordinary expiry timing. | **Decides whether C1's lifetime element is met.** §4.36 recorded it met through the contract-level route; if the test reaches routine expiry, Cloud Logging's silence matters. Third wording question about the amended text, and CBD-102's |
| OQ-108-045 | Does **Azure Blob Storage** disclaim a bound on lifecycle deletion timing, as S3 and Google Cloud Storage do? | Completes the object-storage trio. **Prospective only** while no evaluated composition contains a bucket, but decisive if one ever does |
| OQ-108-046 | Does anything check `HG-102-026`'s **provider-side** redaction and case-linkage properties, which its pass test does not? | **Smaller than it looks.** §4.39 finds deliberate case-linked capture and structural redaction are `TD-103-021` and `TD-103-022` CoBudget obligations verified by `SR-94-043`, not provider properties. The residue is whether any provider-side element remains |
| OQ-108-047 | ~~Does CoBudget accept Azure Developer support, described for *"trial and non-production environments"*?~~ **Ruled August 30, 2026: accepted for the Private MVP** §4.48. | Closed. `CT-102-005` for C3 stays **$29.00/month** rather than Standard at $100.00. Decided together with `OQ-108-010`, as §4.40 required |
| OQ-108-048 | **Google Cloud Customer Care tier pricing.** `EV-102-266` records that it did not render from four URLs, and that third-party figures were deliberately not registered. | `CT-102-005` for C1. **Subordinate to `OQ-103-007`** — whether Access Transparency forces a paid support level decides whether the price is a floor at all |
| OQ-108-049 | ~~Does `HG-102-024`'s *"non-exportable keys where supported"* require HSM protection?~~ **Ruled August 30, 2026: the qualifier makes HSM optional** §4.48. | Closed. **Key Vault Standard with software-protected keys satisfies the gate**, so C3's Key Vault line is **$0.00** — Standard and Premium charge identical rates for software keys. `HG-102-024` now forces a tier on no candidate (`OI-108-043`) |
| OQ-108-050 | **How are C1 and C3 list prices to be obtained at all?** Six Google attempts have failed and both Azure pricing pages render `$-`; AWS has failed none. | **Generalises `OQ-108-004` from one email line to the cost model.** For two of three candidates the remaining route is a signed-in calculator or a quote, which is not a retrieval this pass can make. **The cost model is CBD-108's only unmet acceptance criterion**, so this is the binding constraint on it |
| OQ-108-051 | Does Google Cloud state **positively** that HSM protection needs no paid tier? `EV-102-271` records only that no tier is **mentioned**, and is held at Low confidence for that reason. | **Firms up the weak leg of the `HG-102-024` row.** A two-of-three row resting on one absence is how the region question went wrong at tranche 10 |
| OQ-108-052 | **The `OI-102-015` seat check, on all three candidates.** Does any candidate's cheapest gate-clearing tier cap administrative seats at one? `CT-102-003` requires **two** — the operator plus the catalog §2.5.1 named second principal. | **The highest-value unchecked item in category H**, because `OI-102-015` makes a one-seat cap *"an `HG-102-006` failure, not merely a cost line"*. It is a gate question wearing a cost question's clothes, which is what `OI-108-022` said category H's next step would be |
| OQ-108-053 | **C1's seat position.** Cloud Identity edition names, per-user price and any free-tier user cap. `EV-102-274` records three URLs producing none of them. | Completes the `OI-102-015` seat check, which found **no cap on C2 or C3**. Also the **seventh** Google pricing failure — `OI-108-037` |
| OQ-108-054 | **Does Privileged Access Manager carry a charge?** `EV-102-275` confirms the capability from the primary document and records that the page states no price; `cloud.google.com/security/products/privileged-access-manager` returned 404. | The last unpriced cell in C1's column, and the **eighth** Google pricing failure (`OI-108-037`). Until answered, C1's `HG-102-005` cost is unknown rather than zero |
| OQ-108-055 | **Where does a third-party product licence belong in the cost template?** `EV-102-008` establishes AWS ships no native JIT capability and validates partner products instead. `CT-102-001`—`007` price provider charges only. | **CBD-102 question.** A cost model that cannot represent a candidate's largest cost on a gate records it as absent, which is `CR4`'s *"a missing line item must never silently improve a total"* occurring through the template itself |
| OQ-108-056 | ~~Which Azure HSM product does `HG-102-024` require, and how many keys?~~ **Moot under the August 30 ruling** §4.48 — HSM is optional, so neither Key Vault Premium at $1/key/month nor a Managed HSM pool at $2,336.00/month is required. | Closed as moot rather than answered. **If ruling 2 is ever revisited the 2,336x lever returns**, which is why the alternatives stay recorded here |
| OQ-108-057 | **Does Azure Database for PostgreSQL Flexible Server offer a General Purpose series cheaper than DCadsv6?** Everything supplied under General Purpose is the **confidential computing** series, at $163.52/month for 2 vCores and 8 GiB (`EV-102-277`). | **Should be answered before `OQ-108-010` is decided.** If a cheaper series exists, $163.52 over-states the General Purpose floor and the 13.2x spread narrows — and ruling against Burstable on a confidential-computing price would be ruling on the wrong number |
| OQ-108-058 | **What names the trigger that revisits ruling 1?** The August 30 acceptance of Burstable and Developer support is scoped *"before public launch"*, which is not a date or an event the evaluation can test. | **An acceptance that expires on an unnamed condition expires on none.** CBD-94 verification or the CBD-15 selection record are the natural homes. Small, and it protects a $222.11/month decision from becoming permanent by default |
| OQ-108-059 | **Does `EX-102-006` bar an individual exception on `HG-102-013`?** The rule fires on *"any exception on a gate citing S4 material"*, and the gate cites CBD-91 §5.1, which mentions S4 — but mentions it to **exclude** those classes from backups. | **Decides whether the exception route exists at all.** If it fires, a full re-evaluation replaces individual approval. Text and intent point opposite ways, which `EX-102-001` reserves to the Product Owner — disposition register §5.0 |
| OQ-108-060 | ~~What compensating control addresses the region limb of `HG-102-013`?~~ **Answered at §4.49: none, and the question was the wrong one.** Erasure bounds lifetime not location; key-residency is not what the gate asks; composition change is not an exception. | Closed. **The operative question is whether the failure exists** — a component holding no CoBudget data cannot produce a region failure. Raises `OQ-108-061` and `OQ-108-062` |
| OQ-108-061 | **Do Cloud Scheduler and Azure Front Door hold CoBudget data at rest?** `OQ-108-013` asks this of C1's global load balancer; it has never been asked of the two components the August 30 re-measurement failed C1 and C3 on. `EV-102-232` records Cloud Scheduler as *"absent from all four lists"*, including the stores-nothing one. | **Decides whether two of the three category H failures are real or vacuous.** The gate governs copies of CoBudget data; a component holding none cannot fail it |
| OQ-108-062 | **Should C1's and C3's category H outcome be `UNPROVEN` rather than `FAIL`?** Register §3.3 gives `FAIL` only where *"evidence shows the property is absent"*, and the evidence shows the **commitment** absent while saying nothing about whether copies exist. | **CBD-103's to decide, not this pass's.** It would reverse two of three category H failures and restore C1 and C3 to `ELIGIBLE-PENDING-EVIDENCE`. Subordinate to `OQ-108-061` |
| OQ-108-001 | Does *"core features"* in the Entra External ID allowance include Conditional Access, and what is the per-MAU rate beyond 50,000? Neither is stated on any page retrieved. | `OQ-104-016`; CBD-104 §6.6's `$0.00` figure for C3 |
| OQ-108-002 | Which plan clears the `ED-106-*` gate set for each email candidate? `CR0` prices the **cheapest gate-clearing tier**, and these records price the cheapest tier of any kind. For C2 that is Essentials; whether Essentials clears the gates is unestablished. | `CR0`; `OQ-106-010`'s remainder |
| OQ-108-003 | What is CoBudget's average outbound message size? C3 meters data transferred at `$0.00012/MB`, and no approved source establishes a message size, so the C3 figure carries an unresolved term. | `CT-102-006` for C3, category E |
| OQ-108-004 | ~~Do the Azure Communication Services email rates in the Learn document match the rates the signed-in pricing page returns?~~ **Settled at §4.47: they match exactly.** `$0.00025/Email sent` and `$0.00012/MB transferred` (`EV-102-278`). | Closed. **The disclaimed figures were right**, so `EV-102-214` is corroborated and the limitation forcing its Low confidence is discharged. No figure in the cost model moves |

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
| OI-108-031 | **The documentary route on `HG-102-013` is exhausted.** Every named document has been retrieved — three DPAs, two sets of service terms, a customer agreement, and the per-service documentation two of them defer to. `OQ-103-011` predicted this before the pass began: *"Must be asked explicitly; will not be found in public documentation."* | Confirmed rather than overturned. **What remains on this gate is class `D4`**, which the carried-item register describes as the class no amount of reading closes. Recorded as a boundary: this pass has been productive because `D3` was cheap and undriven, and on this gate that seam is worked out. It does not generalise — `D3` elsewhere is untouched. |
| OI-108-032 | **Three records changed their bearing on `HG-102-013` without changing their content**, because the gate was amended under them. `EV-102-250`'s SQS ceiling went from *"`HG-102-013` is not in play"* to positive evidence; `EV-102-249`'s CloudWatch tail went from a curiosity to the clause C2 fails on; `EV-102-247`'s bypassable minimum went largely moot, the amended test asking about ceilings rather than floors. | **Explicitly not a correction, and not in the ledger.** A record whose relevance moves because the standard moved is a different event from a claim that was wrong when made, and collapsing the two would make `OI-108-027`'s calibration meaningless. Recorded because a re-read of tranche 20 against the current catalog would otherwise look like an error. |
| OI-108-033 | **AWS states deletion bounds where deletion is scheduled and not where it is bulk and asynchronous.** KMS (7—30 days) and SQS (14 days) both state provider-enforced bounds; CloudWatch Logs gives a typical figure and no bound, and S3 gives *"There may be a delay"* and nothing else. | Recorded because it reframes C2's failure. **This is a coherent engineering position rather than an oversight** — a queue drained at scale has no per-object deadline to promise — which means the gap is structural for the storage tier and not a defect one provider could be asked to fix. It also predicts that C1 and C3 will say something similar, which `OQ-108-043` tests. |
| OI-108-034 | **Object storage is in no evaluated composition, and that is the only reason the unbounded-deletion finding does not bite.** CBD-103 §5 names no bucket for C1, C2 or C3. All three object stores disclaim a bound on lifecycle deletion, Google's most explicitly. | Recorded as a **prospective** constraint on composition change rather than a current failure. **The remedy §4.37 examined would have sprung it**: routing C2's logs off CloudWatch via FireLens leads naturally to S3, which would have introduced object storage into the composition and with it the one surface where every provider declines to bound deletion. Any future proposal to move customer data into a bucket should be measured against this before it is adopted. |
| OI-108-035 | **This pass misread a satisfaction type, and the misreading ran for two tranches.** `HG-102-026` was recorded as `Config` in `EV-102-252` and at §4.33; it is typed `Vendor`. Under §2.3 that is the difference between a property CoBudget can create by configuration and one that fails the vendor outright. | Corrected at §4.39, and **the correction strengthens the finding it touches** — on a `Vendor` gate, showing the product has the capability is what the gate asks. Recorded because the pass reads satisfaction types often and had not, until now, verified one against the catalog before citing it. **The evidentiary caution it was attached to was sound; only its grounding was wrong**, which is the harder kind of error to notice. |
| OI-108-036 | **The first comparable line in category H is decided by a gate, not by a rate card.** C3 pays $29/month for support because Customer Lockbox requires a plan; **C2 has no identified gate forcing it off free Basic**, so its line is $0.00 on the evidence in hand. | Recorded because it confirms CBD-103 §6.2's prediction that *"the comparison will be decided by floors, not usage"* and shows what that means concretely. **It also sets the method for the rest of category H**: the productive question is which gates force which tiers, not what the per-unit rates are, and `CR0` prices the cheapest **gate-clearing** configuration. The magnitude is small; the mechanism is the finding. |
| OI-108-037 | **The price side is blocked asymmetrically, and not by effort.** AWS list prices have retrieved on every attempt; Google's have failed six times across support and KMS; Azure's render structure but every figure as `$-`, on two separate pricing pages. | Recorded because it changes what finishing the cost model requires. **It is not one more retrieval pass** — for C1 and C3 the route is a signed-in calculator or a quote (`OQ-108-050`). It also means a naive comparison would favour **C2 by legibility rather than by price**, which is the same error `OI-108-023` recorded on the region question and which cost two tranches to correct there. |
| OI-108-038 | **The gate that produces category H's only priced line for C3 produces nothing for C1.** `HG-102-009` compels Developer support at $29.00/month on Azure via Customer Lockbox, and on Google *"Access Transparency is a default security control for every Google Cloud organization"*. | Recorded because it is the first **evidenced** cost consequence of a product-design difference rather than of a rate card, and because it cuts **against** the C3 concentration §4.41 flagged rather than for it. Two rows of the map now favour C1 and C2, which is a narrow finding about two gates and **not a ranking** — three rows remain unchecked on two candidates each. |
| OI-108-039 | **C3 has the first numbered floor in category H, and it is a floor under a floor.** Developer support at $29.00/month plus Entra ID P2 at $10.00 user/month for `CT-102-003`'s two seats gives **$49.00/month** — counting only the forcers identified so far, conditional on PIM being required, and with **no counterpart figure for C1 or C2**. | Recorded with all three cautions attached because the number will otherwise be quoted without them. `CT-102-001`, `002`, `004`, `006` and `007` remain `UNKNOWN` for C3, and Key Vault Premium was a forced tier with no price until `EV-102-276`. **A single-candidate figure beside two blanks is the legibility trap `OI-108-037` names**, and it is more dangerous here than elsewhere because it is the only number in the category. |
| OI-108-040 | **A gate-forcing map ranks nothing, and reading it as a cost comparison inverts the result.** §4.42 read two completed rows as favouring C1 and C2 on cost. With the map complete, **C2's zeros on `HG-102-005` and `HG-102-009` are absences of capability**: AWS ships no native just-in-time elevation (`EV-102-008`) and its staff-access visibility raises a `FAIL` question (`OI-103-018`). | You cannot force a tier for a capability a provider does not offer, so **the candidate showing the least tier-forcing on these gates holds the worst position on them, not the best**. Tenth ledger entry, and the fourth to a claim this pass made about its own findings rather than about a provider. The map's use is telling a pricing session **which tier to price**, not which candidate is cheaper. |
| OI-108-041 | **The first `$-` gap closed by Product Owner supply, and it corrected two inferences immediately.** `EV-102-267` recorded Key Vault figures as unobtainable; supplied directly they showed Premium carries **no plan fee**, moving the cost from `CT-102-001` to `CT-102-007`, and revealed a **2,336×** spread between two Azure HSM products. | Recorded as **method**, not as a one-off. `OQ-108-050`'s route works, and the remaining Azure gaps — Communication Services Email, PostgreSQL at both candidate tiers, the category H composition — are the same shape. **It also shows what the gap was costing**: two inferences stood uncorrected only because the figures were absent, which is a stronger argument for closing the rest than the missing lines themselves. |
| OI-108-042 | **`OQ-108-010` is now a $151.11 per month decision rather than a judgment about a disclaimer.** `CR0` moves C3's category D line from **$12.41** (Burstable B1ms) to **$163.52** (General Purpose DC2ads v6) if the Product Owner rules that CoBudget does not run production on a tier its vendor scopes away from production. | Recorded because the decision has been open since tranche 5 as a qualitative question and is now quantified. **The 13.2x is a `CR0` artefact**, not a like-for-like gap: at matched 2 vCores and 8 GiB the ratio is 1.65. And it pairs with `OQ-108-047`, which asks the identical question about Developer support — `§4.40 records that deciding them separately is how an inconsistency enters the cost model. |
| OI-108-043 | **`HG-102-024` now forces a tier on no candidate.** C2 never did, since non-exportability is standard on every KMS key (`EV-102-270`); C1 never did on the evidence held (`EV-102-271`); and the August 30 ruling that *"where supported"* makes HSM optional removes C3's. | The gate-forcing map's `HG-102-024` row is **empty**, and the only forcers left in category H are `HG-102-009` and `HG-102-005`, **both on C3 alone**. Recorded because §4.44 warned that a map with rows on one candidate only invites being read as a ranking, and that risk rises as rows empty. It also means **a single ruling removed the largest cost lever in the C3 model** — which is worth knowing if the ruling is revisited. |
| OI-108-044 | **The August 30 re-measurement's region failures rest on an unexamined premise.** `HG-102-013` governs copies of CoBudget data, and whether Cloud Scheduler and Front Door hold any has never been established — `OQ-108-013` asks it only of C1's load balancer. | Recorded as a **qualification, not a reversal**: the commitment genuinely does not reach those components, which is what the re-measurement found. What it did not find is that there are copies for it to reach. **Twelfth ledger entry and the fifth to a claim about this pass's own findings**, which is a rate worth watching: the pass is reliable on what documents say and repeatedly optimistic about what its findings establish. |
| OI-108-019 | **This is tranche 1 of an incomplete pass.** Six records against 91 `D3` items; two questions touched, one closed. | The pass is worth continuing on these terms — every record here came from a public page in a single sitting. `OI-108-017`'s point stands: the constraint is that nothing is driving the work, not that the work is hard. |
| OI-108-020 | **The source packages are not amended.** CBD-106 §5.1 still records its hypothesis as untested and `OQ-106-010` as open; CBD-104 §6.6 still rests C3's `$0.00` on `OQ-104-016`. | Deliberate. Propagating into two approved, Confluence-published packages mid-pass would mean amending them again at the end. The record of what is now known lives here until the pass closes, and this document is cited by the disposition register so the position is not lost. |
| OI-108-021 | ~~**`EV-102-214` is the first cost record in the corpus whose own source disclaims it.**~~ **Resolved at §4.47.** The authoritative page carries the same two rates (`EV-102-278`), so the disclaimed figures were correct. | Closed. The decision to record it at Low rather than exclude it — *"a disclaimed figure from the vendor is still better than the `UNKNOWN` it replaces"* — is **vindicated rather than merely defensible**. Worth keeping as precedent for the next disclaimed source. |
