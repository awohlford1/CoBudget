# CBD-106 — Transactional Email Candidate Shortlist and Gate Evaluation

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Applies the approved CBD-102 method to transactional email candidates. It selects no provider; CBD-108 does that. No candidate reaches `ELIGIBLE` until the authorized observations are performed — §3 records why, and the remedy is already authorized. |
| Document version | 1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-106](https://cobudget.atlassian.net/browse/CBD-106) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Email Delivery and Content Boundary Specification v1.0; Operational and Cost Assessment v1.0; Acceptance Criteria Traceability v1.2 |
| Confluence page | [CBD-106 — Transactional Email Candidate Shortlist and Gate Evaluation](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12845090) |
| Repository baseline | `c689192` |
| Last updated | August 22, 2026 |

## 1. Purpose

CBD-106's first deliverable is a provider shortlist and comparison for the
transactional email category. This document is that comparison. It measures
candidates against the 24 CBD-102 hard gates that apply to category **E** — the
15 cross-category **X** gates plus the 9 **E** gates — using the evidence classes
and verdicts the CBD-102 evidence register fixes, against the posture the
companion Email Delivery and Content Boundary Specification describes.

## 2. What this document does not do

* It selects and recommends nothing; `CR3` and rubric `R1` settle order by
  verdict, not by score or cost.
* It provisions nothing and creates no account. Nothing was sent.
* It publishes no weighted rubric total, for the reasons CBD-103's evaluation §8
  records; they apply here unchanged, and more strongly — see §6.3, where the
  evidence-confidence profile is dominated by Absent evidence.
* It closes no `EG-91-*` evidence gap and no `RF-92-*` review finding.
  `EG-91-006` owns the eventual selection; this supplies the measurement.

## 3. The evidence ceiling, and why it is worst in this category

The structural finding of CBD-103's evaluation §3 applies here, and applies
harder. **Eleven of the 24 applicable pass tests are observation-bound** — four
**X** gates (`HG-102-001`, `HG-102-004`, `HG-102-012`, `HG-102-015`) and seven of
the nine **E** gates:

| Gate | The observation its pass test names |
| --- | --- |
| `HG-102-047` | *"Templates are authored with exact content control"* |
| `HG-102-048` | *"A delivered message is inspected end to end"* |
| `HG-102-049` | *"The send API is exercised with a minimal payload"* |
| `HG-102-050` | *"Callback authentication and replay protection are verified"* |
| `HG-102-051` | *"Suppression entries are created and removed via API"* |
| `HG-102-053` | *"A destination deletion is exercised and evidenced"* |
| `HG-102-055` | *"Preview and event-inspection surfaces are checked"* |

This is finding F1, and it is a property of the category rather than of the
research: category **E**'s gates ask what a message looks like *after it leaves
CoBudget's control*, and what the provider keeps once it has been sent. Neither
question has a documentary answer. Only two **E** gates — `HG-102-052` body
retention and `HG-102-054` domain authentication — can be settled in writing, and
both were asked of all three candidates below.

**The remedy already exists.** `OI-103-008` was resolved by Product Owner
decision on August 20, 2026, recorded on the CBD-15 ticket: non-production
evaluation accounts holding only synthetic data are authorized solely to execute
these pass tests, under five guardrails, and the decision states explicitly that
it extends to the sibling categories including this one. No new decision is
needed. Until the observations are performed, every candidate below terminates at
`ELIGIBLE-PENDING-EVIDENCE`.

One category-specific note on those guardrails. Executing these pass tests means
**sending mail**, which the sibling categories' observations did not require. The
synthetic-data condition therefore has a concrete meaning here: destinations must
be mailboxes CoBudget controls, and a live customer address never appears in an
evaluation account. `OI-106-007` records it so it is not rediscovered at
execution time.

### 3.1 Symmetry

The documentary pass was **symmetric by design**. Five questions were put to all
three candidates and answered from each vendor's own documentation:
custom-domain authentication (`EV-102-052`/`053`, `EV-102-058`/`059`,
`EV-102-065`), tracking disablement (`EV-102-054`, `EV-102-060`, `EV-102-066`),
suppression management (`EV-102-055`, `EV-102-061`, `EV-102-067`), callback
mechanism (`EV-102-057`, `EV-102-064`, `EV-102-068`), and provider-held retention
(`EV-102-056`, `EV-102-063`, `EV-102-069`/`070`). Gates not asked are symmetric by
omission and appear identically as `UNPROVEN` with an open question.

Where the *answers* differ in completeness — §7.2 — the difference is in what
each vendor publishes about its own product, not in how hard each was searched.
That distinction is recorded rather than smoothed over, because a documentation
asymmetry read as a product asymmetry is exactly the error the evidence
register's limitations field exists to prevent.

**No provider-level records are reused in this evaluation.** The hosting and
identity evaluations retrieved nothing about these products, and C5 is a provider
identity appearing in no other category. The consequence is visible in §6.1:
every cross-category **X** gate is `UNPROVEN` for every candidate, with no
inherited passes. That is an honest floor, not an oversight.

## 4. Screening

### 4.1 The screen

Following the capability screen CBD-104 §4.1 established, category E screens on
one published, checkable property: **does the provider's published catalog offer,
first-party, every capability class the boundary specification consumes?**

| # | Capability class | Boundary decision it serves |
| --- | --- | --- |
| 1 | Managed operation — the vendor runs the sending infrastructure | CBD-15 "managed provider" premise |
| 2 | A transactional send API or authenticated SMTP submission, per message | `ED-106-006`, `ED-106-008` |
| 3 | Customer-owned sending domain with SPF, DKIM, and DMARC | `ED-106-005`; `HG-102-054` |
| 4 | Open tracking, click tracking, and link rewriting disableable | `ED-106-007`; `HG-102-048` |
| 5 | Programmatic suppression read, write, and delete | `ED-106-003`; `HG-102-051` |
| 6 | Delivery, bounce, and complaint callbacks CoBudget can receive | `ED-106-011`; `HG-102-050` |

**A screen is not a verdict.** Nothing below is recorded as `INELIGIBLE`. A
screened-out candidate has not been measured against a gate, and every screening
row is reversible if the published catalog is wrong or changes.

### 4.2 The carried-set rule

This category has the same structural choice CBD-104 faced, with one difference:
the ecosystem is thinner. Two of the three CBD-103 hosting candidates publish a
first-party transactional email service and one does not, so the carried set is:

* the ecosystem email service of each CBD-103 hosting candidate that passes the
  capability screen, and
* one provider-neutral standalone, so the comparison contains the alternative
  that no hosting selection forecloses.

The standalone slot is filled by **Postmark**, on three stated grounds:

1. **Transactional-only sending model.** It publishes no campaign product, so
   there is no required campaign, list, or segment field to collide with
   `EM-92-005` and `HG-102-049`. A marketing-first platform's transactional mode
   carries that field set whether or not CoBudget uses it.
2. **It publishes a number for the one gate documentation can settle.**
   `HG-102-052` asks for a body-retention period *in writing*; Postmark states
   one, with an adjustment mechanism and a stated range. The ecosystem
   candidates do not — §7.2.
3. **Its tracking controls are documented with a stated default**, at server and
   per-message scope, which is what `ED-106-007` needs to be verifiable rather
   than asserted.

Other standalone vendors with published transactional products — SendGrid,
Mailgun, Resend, Sparkpost, Mailjet, Mailchimp Transactional, Brevo — were **not
evaluated and are not screened out**. No claim is made about their catalogs, and
`OQ-106-002` carries the option of evaluating a second standalone if CBD-108
wants one.

### 4.3 Screened out

| Candidate | Missing capability class | Basis |
| --- | --- | --- |
| Google Cloud first-party transactional email | 1, 2 | The Google Cloud catalog publishes no first-party transactional email send service; its documented path for outbound application mail is a third-party provider. Absence from the published catalog is not proof of absence, and `OQ-106-001` carries the confirmation. Not separately evidenced. |
| Self-managed MTA on IaaS, or SMTP relay through a general mail host | 1 | Contradicts the managed premise of CBD-15 and moves every gate from Vendor to Config. It also moves IP warm-up, blocklist remediation, and reputation recovery onto the single operator that rubric dimension `WR-102-027`–`WR-102-031` exists to protect — the same reasoning as CBD-103 §4.2's self-managed-IaaS row and CBD-104 §4.3's self-hosted-identity row. |

The Google row has the same cross-category consequence CBD-104 §7.3 recorded for
identity, and it now applies to two categories at once: **a C1 hosting selection
forces a standalone email vendor**, and therefore a subprocessor the other two
hosting ecosystems would not require. That is a CBD-108 input, not a CBD-106
conclusion.

### 4.4 Carried into gate evaluation

Candidate identifiers are **provider identities carried across categories**,
following the convention CBD-105 §4.3 states and CBD-104 §4.4 restates: `C1` is
Google Cloud, `C2` is AWS, and `C3` is Microsoft Azure in every category they
appear in. `C4` is Auth0, introduced by CBD-104 for its standalone identity slot,
and does not appear here — it publishes no general-purpose transactional email
product, only the ceremony mail `ID-104-018` describes. **`C5` is a new provider
identity**, introduced here because this category's standalone slot has no
counterpart in any earlier category. `C1` appears only as the
screened-out row in §4.3, which is itself the finding above.

| ID | Candidate | Composition evaluated |
| --- | --- | --- |
| **C2** | Amazon SES | Sending in a single region on verified domain identities with Easy DKIM and a custom MAIL FROM domain; one configuration set per `ED-106-003` stream; account-level suppression list; event publishing to a CoBudget-owned destination |
| **C3** | Azure Communication Services Email | Email Communication Services resource with custom verified domains, one sender subdomain per `ED-106-003` stream; Event Grid delivery-report subscription; domain-level suppression list |
| **C5** | Postmark | One message stream per `ED-106-003` tier on verified custom domains with a custom Return-Path; per-stream suppression; webhooks per stream |

Each composition is one plausible arrangement of that provider's published
product, not the only one. The evaluated plan follows cost rule `CR0` and is
recorded per candidate in the companion assessment §5.

## 5. Gate evaluation method

Each gate carries one outcome per candidate, per evidence register §3.3:

| Outcome | Meaning here |
| --- | --- |
| `PASS` | Documented or stronger evidence confirms the property, and the pass test is satisfiable by that evidence |
| `UNPROVEN` | Evidence is Asserted or Absent — including "the pass test needs an observation not yet performed" |
| `FAIL` | Evidence shows the property is absent |

The one gate marked **Config** in the catalog for this gate set — `HG-102-014` —
is recorded as `PASS (design)` where the boundary specification settles
CoBudget's side and no evidence of provider foreclosure exists. A `PASS (design)`
is a statement about provider eligibility, not evidence that CoBudget built the
control; CBD-94 verification must prove the build separately. `HG-102-014` is
also non-exceptable under exception rules §5.2.

**Category E has no Config gate of its own.** All nine `HG-102-047`–`HG-102-055`
are marked Vendor in the catalog, and this evaluation does not re-type approved
gates. Where the boundary specification settles CoBudget's half of a Vendor gate
— and §11 of that document lists exactly where — the gate still turns on the
provider's half.

## 6. Comparison matrix

`OBS` marks a gate blocked on the §3 observations. `DOC` marks one documentation
or a contract can settle. `CFG` marks a Config gate.

### 6.1 Cross-category gates

| Gate | Kind | C2 Amazon SES | C3 ACS Email | C5 Postmark | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-001 telemetry allowlist | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. `EV-102-062` publishes C3's email log field list and it is **not** S1-clean; see §7.5. `EV-102-057` establishes the C2 event payload. Neither is the captured-payload observation the pass test names. |
| HG-102-002 correlation identifiers | DOC | `PASS` | `PASS` | `UNPROVEN` | Not retrieved. Shared with `OQ-103-001` for C2 and C3; new for C5 under `OQ-106-003`. **Asked of the hyperscalers at v1.1 and it separates them.** C2 `EV-102-177`: a 96-bit random trace ID plus timestamp scoped to *"a single client request"*, with `user` an **optional** field the customer populates — no default persistence mechanism exists. C1 `EV-102-179`: W3C `traceparent`, 128-bit, and no end-user identifier mentioned anywhere. C3 `EV-102-178` is the exception and stays `UNPROVEN`: `operation_Id` is per-operation and clean, but the same data model defines an anonymous `user_Id` that the JavaScript SDK *"typically persists... in a user cookie"* and that feeds *"sampling score generation"*. Not required, and engaged by the browser SDK rather than server-side telemetry, so the reading is `OI-103-021` and not a `FAIL`. |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Shared with `OQ-103-002` for C2 and C3; `OQ-106-003` for C5. |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. This gate concerns the vendor's own console, not the sent message; `HG-102-048` covers the message. |
| HG-102-005 no standing credential | DOC | `UNPROVEN` | `PASS` | `UNPROVEN` | **v1.1 reverses this row's v1.0 stance on reuse, deliberately.** v1.0 declined to reuse any provider-level record; the CBD-103 cross-category pass makes reuse correct here because the administrative access model for ACS *is* the Azure and Entra access model, not an ACS-specific one. C3 `EV-102-011`: Privileged Identity Management, native, just-in-time, time-bound with start and end dates, approval, justification, downloadable audit history. C2 `EV-102-008`: AWS ships no native equivalent and validates four partner products — not a `FAIL`, but reachable only by buying a third party (`OI-103-017`). C5 is a standalone vendor with no such record, and none was retrieved. |
| HG-102-006 separable custody | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Partial material at v1.1, none of it sufficient for the four-way split the gate requires. C2 `EV-102-009`: under AWS owned keys — the default for new services since 2021 — key policies cannot be changed and key activity is *"Not viewable by the customer"*. C3 `EV-102-163`: Managed HSM is *"a customer-owned security domain where Microsoft has no access to your key material"*. Both address custody, neither separability. **Firm** under catalog §2.5. `OI-102-022` still gates practice. **Asked symmetrically of all three hyperscalers at v1.1 and the answer is uniform**: backup read, restore execution and key use are separable on every one of them, and **none documents a restore-approval permission at all**. The hosting evaluation records the comparison and the reading question it raises at `OI-103-020` — read strictly, this firm gate is unsatisfiable by any hyperscaler, which mirrors the carrier half of `HG-102-074`. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Both hyperscaler positions now on the record and both `Asserted`, which §3.2 cannot convert to a `PASS` — C2 `EV-102-010`, C3 `EV-102-167`. Neither statement is email-specific. `OI-102-005` flagged this gate as assertion-prone and both records are exactly the kind of assertion it meant. C5's own retention page states that *"we monitor activity on all accounts as an anti-spam and anti-abuse measure"* (`EV-102-070`), which is a reason to ask the question precisely, not an answer to it. |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Unchanged at v1.1, and now specific rather than general: both trust pages retrieved for `HG-102-007` were checked for this gate and **neither addresses impersonation, break-glass, or unrestricted query** — `OQ-103-023`. `OI-102-005`. |
| HG-102-009 staff-access evidence | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | **`OQ-106-004` is half-answered at v1.1, and the answer is no.** `EV-102-012` retrieves the complete Customer Lockbox supported-services list: **Azure Communication Services does not appear on it**, so C3 has no Lockbox coverage for this candidate. C2 `EV-102-010`: AWS's customer-visible record is scoped to *"on behalf of"* service operations, which raises the `OI-103-018` `FAIL` question and is not SES-specific either way. Neither flips — absence from a list is not evidence of absence from the product — but no candidate here has a documented staff-access surface. A standalone vendor equivalent for C5 remains unknown. |
| HG-102-010 encryption in transit and at rest | DOC | `PASS` | `PASS` | `UNPROVEN` | **Settled for C3 at v1.1.** `EV-102-162` (at rest: *"A symmetric AES-256 key"*, KEK never leaving Key Vault, platform-managed by default) and `EV-102-163` (in transit: MACsec on by default within and between regions, *"RSA-based 2,048-bit key lengths, ECC 256-bit key lengths, SHA-384 message authentication, and AES-256 data encryption"*). Both halves carry algorithm and key custody. C2 `EV-102-009` names 256-bit AES-GCM for at rest. **C2 settled at v1.1 by a later retrieval in the same pass**: `EV-102-174`, the current EC2 data-protection page, states *"All data flowing across AWS Regions over the AWS global network is automatically encrypted at the physical layer before it leaves AWS secured facilities"*, *"All traffic between AZs is encrypted"*, and the TLS floor *"We require TLS 1.2"*. It supersedes the historical whitepaper, which is no longer relied on for anything. C5 not retrieved. Per-service confirmation for ACS specifically is `OQ-103-020`. |
| HG-102-011 region and subprocessors | DOC | `PASS` | `UNPROVEN` | `UNPROVEN` | **Settled for C2 at v1.1, with a category-E detail attached.** `EV-102-007`: an enumerated AWS-wide list dated "Last Updated: July 28, 2026" on the page, with a 30-day advance-notice commitment and region scoping. It names *"250ok Inc. / Email Data Source, Inc."* for *"Email deliverability metrics"* — a subprocessor that processes email telemetry and is therefore directly in this category's path, which `OI-106-018` records. C3 keeps its v1.0 position: `EV-102-063` establishes geography selection at resource creation and that Event Grid system topics are *"created in a global location"*, but the Microsoft Online Services Subprocessor List was **not obtained** (`OQ-103-018`). **C5 retrieved at v1.1 and it misses on one word.** `EV-102-181`: Postmark publishes an enumerated list — Deft and AWS for infrastructure, Zendesk for help desk — and states its region, *"Postmark's primary data and servers are hosted at Deft's data center (located outside of Chicago), and Amazon Web Services (AWS)"*. **The page carries no date**, and the pass test requires the list be *"obtained and dated"*. That is a property of the page rather than a retrieval gap, and it is not a `FAIL` — C5 both enumerates and commits to a region. `OQ-106-013`. Note also that C5 runs on AWS, so selecting it does not diversify away from C2 — CBD-103 §7.8. `OQ-106-005`. |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. `HG-102-053` below is this gate's category-E instance for destinations. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. The category-E form of the question is what the provider's own retained copies of messages and destinations survive in, which `HG-102-052` and `HG-102-053` ask directly. **The contracts were read at v1.1 and the position is precise rather than blank.** Google's addendum states a recovery window and a 180-day expiry covering existing copies but defers region to terms not retrieved; the AWS addendum could not be parsed; and the Microsoft retention page that appears to answer this is scoped to Microsoft 365, not Azure. `OQ-103-025` names the three retrievals that would settle it. None of the three is provider silence yet, which is why this is `UNPROVEN` and not `FAIL`. |
| HG-102-014 S4 out of ordinary surfaces | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `ED-106-008` payload allowlist; `TD-103-017`, `TD-103-022`. Non-exceptable under exception rules §5.2. |
| HG-102-015 append-only evidence | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. §7.5 records the category-E interpretation. |

### 6.2 Transactional email gates

| Gate | Kind | C2 Amazon SES | C3 ACS Email | C5 Postmark | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-047 exact content control | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — authoring the three `ED-106-001` templates on an account and inspecting what arrives is the pass test. No candidate is documented to inject body or footer content; absence of a documented injection is not evidence of its absence. `OQ-106-006`. |
| HG-102-048 tracking and rewriting off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — the pass test inspects a delivered message. All three document tracking as opt-in or off by default, by three different mechanisms at three different scopes: `EV-102-054`, `EV-102-060`, `EV-102-066`. See §7.3. |
| HG-102-049 minimal payload | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — the send API must be exercised. `EV-102-057` shows C2 treats message tags as an optional list; no candidate is documented to *require* a descriptive label. `OQ-106-006`. |
| HG-102-050 authenticated, replay-safe callbacks | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Mechanisms differ in kind and one candidate documents the absence of signatures: `EV-102-057`, `EV-102-064`, `EV-102-068`. See §7.4. Body content is absent from all three documented payloads; C2's carries the original message headers. |
| HG-102-051 programmatic suppression | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — entries must be created and removed via API. All three document the capability with a different terminal edge each: `EV-102-055`, `EV-102-061`, `EV-102-067`. See §7.6. |
| HG-102-052 body retention bounded and disclosed | DOC | `UNPROVEN` | `UNPROVEN` | **`PASS`** | `EV-102-069`/`070`: C5 states 45 days by default, adjustable 7–365, with permanent removal at expiry. C2's `EV-102-056` documents an opt-in archive with a 180-day default but no statement of what is retained when archiving is off; C3's `EV-102-063` states real-time processing without the explicit non-retention statement it makes for SMS. See §7.2. `OQ-106-007`. |
| HG-102-053 destination deletion and retention | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — a deletion must be exercised. `EV-102-063` records that C3 *"temporarily retains recipient email addresses that resulted in hard bounced messages"* without stating a period; `EV-102-055` records that C2 writes hard bounces to a cross-customer global list. Both are §7.6 material. |
| HG-102-054 custom domain SPF/DKIM/DMARC | DOC | **`PASS`** | **`PASS`** | **`PASS`** | All three document customer-owned sending domains with SPF, DKIM, and DMARC: `EV-102-052`/`053`, `EV-102-058`/`059`, `EV-102-065`. The gate's second edge — no event-descriptive envelope routing — is `ED-106-005`'s obligation and is not a provider property. C3 carries a limitation, not a failure: its managed domain is vendor-branded, so a custom domain is mandatory rather than preferred. |
| HG-102-055 preview surfaces bounded | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — the surfaces must be checked. `EV-102-056` documents that C2's archive console can *"view the text of a message"*; `EV-102-070` documents that C5's Activity page stores full content and that this *"cannot be hidden or deleted immediately"*. Both are inside a disclosed boundary, which is what the gate asks; the observation confirms nothing escapes it. |

### 6.3 Tally

The 24 applicable gates divide by evidence kind into 11 `OBS`, 12 `DOC`, and 1
`CFG`. Every figure in this table is recomputed from the §6.1 and §6.2 tables by
`scripts/audit-cbd-106.py`, so it cannot drift from the matrix it summarizes.

| | C2 | C3 | C5 |
| --- | --- | --- | --- |
| `PASS` | 4 | 4 | 2 |
| `PASS (design)` | 1 | 1 | 1 |
| `UNPROVEN` | 19 | 19 | 21 |
| `FAIL` | 0 | 0 | 0 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |

No candidate carries a `FAIL`, so no compensating control, exception, or
residual-risk record is required, and nothing in exception rules §5 is engaged.

**The pass counts are low because eleven of 24 pass tests cannot be satisfied by
any document, not because the documentary pass was thin.** Both of the two
documentary **E** gates were asked of all three candidates, and one of them —
`HG-102-054` — passes three ways. A higher number here would mean the standard
had slipped.

## 7. Findings that survive the evidence ceiling

### 7.1 Category E is the most observation-bound category evaluated so far — F1

Seven of nine category gates and eleven of 24 applicable gates require an
observation. Against the sibling evaluations that is the highest share in the
set: ten of 27 in category H, nine of 25 in category I, and eight of 24 in
category D. The reason is structural: every other category's gates ask what a
provider *holds*, which a vendor can document. Category E's gates mostly ask what
a message *looks like when it arrives* and what the provider *keeps afterwards* —
properties that exist only once a message has been sent.

The practical consequence for CBD-108 is that this category's evidence cannot be
completed by more reading. It needs three evaluation accounts, three verified
domains, three sends, and three inspections. That work is already authorized
(§3); it has simply not been done, and no amount of further desk research
substitutes for it.

### 7.2 The retention gate rewards disclosure, and the ecosystem candidates do not disclose — F2

`HG-102-052` asks that body retention be *"bounded and disclosed"* and
*"minimized or disabled"*, with a pass test that obtains the period **in
writing**. The outcome inverts what an intuition about privacy would predict:

* **C5 passes** — and it is the candidate that retains the *most*. It stores
  *"email content, events (e.g. delivery, click, open), and metadata for all
  messages for 45 days by default"*, adjustable *"from 7 to 365 days"*, with
  original content and metadata *"removed permanently"* at expiry
  (`EV-102-069`). Bounded, disclosed, and minimizable — three for three. It also
  states plainly that content storage *"cannot be hidden or deleted
  immediately"* (`EV-102-070`), so the disable half is genuinely unavailable and
  the gate is met by the minimize half alone.
* **C2 does not pass** — because what it documents is an *opt-in archive*.
  `EV-102-056` establishes that archiving applies only *"through a configuration
  set with the archiving option enabled"*, with a *"default retention period of
  180 days"* that can be overridden and an archive that can be encrypted under a
  CoBudget KMS key. What it does **not** establish is what SES retains when
  archiving is off. Silence is not a disclosure.
* **C3 does not pass** — and the reason is precise enough to be worth quoting.
  Microsoft's own privacy page makes an explicit non-retention statement for
  SMS — *"ACS does not retain the contents of SMS messages after successful
  delivery or failure notification"* — and makes no equivalent statement for
  Email, saying only that *"the system processes email message content in
  real-time"* (`EV-102-063`). The two sections sit on the same page. The
  asymmetry within a single vendor document is what makes this an open question
  rather than an assumption either way.

The lesson generalizes beyond this package: **a provider that retains nothing has
nothing to publish, and therefore cannot pass a gate whose pass test is a
published period.** The remedy is not to soften the gate — the gate is correctly
derived from `DI-91-049` and CBD-91 §5.1 — but to obtain a written statement of
non-retention, which is what `OQ-106-007` asks for. A vendor confirming in
writing that it retains no bodies satisfies "bounded and disclosed" completely.

**One classification judgement carries this finding, and it belongs to the
reviewer rather than to the evaluator.** `EV-102-069` and `EV-102-070` are
vendor support-centre articles. Evidence register §3 defines **Documented** as
*"the vendor's own versioned technical documentation"* and **Asserted** as a
vendor statement without independent support, giving *"a support-ticket reply"*
as an example. A published support-centre article stating a product's retention
policy sits between the two: it is the vendor's own published documentation of
the product, and it carries no version marker. This evaluation classifies it
**Documented**, and the limitation is recorded on both records. If the Product
Owner classifies it **Asserted** instead, §3.2's rule that *a gate never passes
on Asserted evidence alone* applies and C5's `HG-102-052` pass becomes
`UNPROVEN` — leaving the gate unpassed on all three candidates. `OI-106-017`
carries the decision, because it changes a matrix outcome and no evaluator
should settle that quietly.

### 7.3 Tracking is off by default on all three — by three mechanisms, at three scopes — F3

`ED-106-007` requires tracking off and asserted per message. Each candidate can
deliver that, and each fails differently if the assertion is skipped:

* **C2** — tracking is a *consequence of subscribing to it*. `EV-102-054`
  establishes that *"when you use event publishing to capture open and click
  events, Amazon SES makes minor changes to the emails you send"*: a 1×1
  transparent GIF for opens, and for clicks SES *"replaces the links in your
  emails with links to a server operated by SES"*. Not adding the Open and Click
  event types to a configuration set's event destination is what leaves the
  message unmodified. The scope is the configuration set — which under
  `ED-106-003` is the stream, so the control and the separation are the same
  object.
* **C3** — tracking is a domain-level switch that starts off. `EV-102-060`
  states *"User interaction tracking is Off by default"*, turning it on requires
  a confirmation dialog and an explicit acknowledgement that the customer is
  *"giving consent to collect your customers' email activity"*, and it *"can't be
  enabled for Azure Managed Domains or custom domains with default sending
  limits"*. The right outcome arrives partly for an unrelated reason, which is
  worth knowing: a sending-limit increase is also a tracking-capability increase.
* **C5** — tracking is per server *and* per message, and the documented default
  is off. `EV-102-066` records the `TrackLinks` values and states of `None`:
  *"This is the default setting for all messages and new and existing servers."*
  Individual links can additionally be excluded with `data-pm-no-track`. The
  per-message scope is the sharpest edge in the set — it is the strongest control
  and the easiest to get wrong once, which is precisely why `ED-106-007` requires
  the parameter be sent explicitly rather than defaulted.

One shared caveat: all three are `UNPROVEN` because the pass test inspects a
delivered message, and every one of these mechanisms is a claim about what the
provider does to a message body. That claim is checkable in about ten minutes on
an evaluation account and in no other way.

### 7.4 Callback authentication differs in kind, and one candidate documents the absence of signatures — F4

* **C2** — event data is published to an AWS-side destination rather than posted
  to CoBudget. `EV-102-057` establishes the payload: a `mail` object carrying
  `messageId`, `source`, `destination`, the original `headers` and
  `commonHeaders`, and `tags`, plus a per-event object. **No body content
  appears.** The headers do include the subject line, which under `EM-92-003` may
  carry the action class — permitted content, but a reason to state that the
  callback is not content-free rather than to assume it is. Authentication is a
  property of the AWS destination service rather than of SES, and was not
  retrieved; `OQ-106-008`.
* **C3** — events are delivered through Azure Event Grid (`EV-102-064`), with
  `Email Delivery Report Received` and `Email Engagement Tracking Report
  Received` types. The engagement type does not arise under `ED-106-007`. The
  retrieved page describes subscription and payload but not endpoint
  authentication, which is an Event Grid property; `OQ-106-008`.
* **C5** — the position is documented and negative, which under evidence register
  §3.2 is the one direction a vendor statement is reliable in: *"Postmark does
  not currently support HMAC webhook signature verification. The recommended
  approach to protect your webhook endpoint is HTTP Basic Authentication
  ... combined with allowlisting Postmark's IP ranges"* (`EV-102-068`). The same
  page documents an escalating retry schedule and an
  `X-PM-Webhook-Trace-Id` header *"that stays stable across retries of the same
  event"*.

**This is not a `FAIL`.** `HG-102-050` asks that callbacks be *authenticatable*
and *replay/idempotency protected*. Basic authentication over TLS authenticates
the caller, and a retry-stable trace identifier is an idempotency key — so the
properties the gate names are present. But a shared secret is a materially weaker
mechanism than a per-payload signature: it does not bind the credential to the
payload, and it is the credential most likely to end up in a URL. `ED-106-011`
already places verification at CoBudget's edge for exactly this reason, and the
difference is rubric material under the security dimension rather than gate
material.

### 7.5 Provider event data in this category carries destinations by design — F5

`EV-102-062` is the most concrete telemetry evidence in the package, because
Microsoft publishes the email log schema field by field. Two rows decide the
posture:

* `RecipientId` — *"The email address for the targeted recipient"* — appears in
  every recipient-level delivery status log.
* Engagement logs carry `EngagementContext` (the clicked URL) and `UserAgent`.

Under `AN-92-003` none of that belongs on the S1 reliability surface, and CBD-91
§4 rule 5 makes a derived copy inherit its inputs' sensitivity. The email
operational logs are therefore a **restricted diagnostics destination by
construction** (`DI-91-062`, `TD-103-021`), not a dashboard — which is what
`ED-106-012` records.

Two qualifications keep this finding honest. First, it is not a C3 deficiency:
the same data exists at every candidate, and Microsoft's disadvantage here is
that it published the field list. Second, C3's diagnostic settings are opt-in and
CoBudget chooses the destination workspace, so the routing `ED-106-012` requires
is available — the finding is that the default of "turn logs on and look at them"
is the wrong default.

`HG-102-015` lands in the same place as it did in category D: `TD-103-030` puts
CoBudget's audit evidence in the primary datastore, so the append-only property
attaches to CoBudget's own schema. The vendor-side half that remains is whether
delivery evidence CoBudget relies on is tamper-evident at the provider, which the
§3 observations cover. The matrix keeps the gate `UNPROVEN` rather than
converting it to a Config gate, because the catalog marks it Vendor.

### 7.6 Suppression is programmatic on all three, with a different terminal edge each — F6

`ED-106-003` needs suppression that CoBudget can read, write, delete, and scope
per stream. All three document the capability. None of them documents it without
an edge:

* **C2** — the account-level list is fully programmatic:
  `PutSuppressedDestination`, `ListSuppressedDestinations`,
  `DeleteSuppressedDestination`, with bulk import and removal, and
  configuration-set-level override that maps onto `ED-106-003` streams
  (`EV-102-055`). The edge is one sentence: *"When you use your account-level
  suppression list, SES adds addresses that result in hard bounces to the global
  suppression list as well."* That global list spans customers. CoBudget can
  neither enumerate it nor delete from it, which makes part of a customer's
  suppression state permanently outside CoBudget's control and outside any
  `DI-91-045` completion claim.
* **C3** — domain-level lists with *"create, read, update, and delete (CRUD)
  operations via the Azure portal, management SDKs, or REST APIs"*, filtered in
  the sending pipeline (`EV-102-061`). The edge is maturity: the feature is
  *"currently in preview"*, *"provided without a service-level agreement"*,
  *"we don't recommend it for production workloads"*, and the function is
  *"only available in the latest Azure.ResourceManager.Communication SDK beta
  versions"*. Confidence on that record is lowered to Low for exactly this
  reason.
* **C5** — per-stream suppression, which matches `ED-106-003` most directly of
  the three, with list, bulk create, and delete operations and three reasons:
  `HardBounce`, `SpamComplaint`, `ManualSuppression` (`EV-102-067`). The edge is
  terminal: *"SpamComplaint suppressions cannot be deleted."*

None of these is a `FAIL`; the gate asks that suppression be readable, settable,
and deletable, and each candidate offers that over the state it controls. But all
three edges have the same shape — **a slice of suppression state that CoBudget
cannot remove** — and that is a real constraint on `ED-106-016` exit and on any
deletion-completion claim. `ED-106-013` already requires such copies to be named
in the claim rather than omitted; this finding is where the requirement came from.

## 8. Evidence register

Records are append-only under the CBD-102 evidence register rules. All retrievals
below were performed on **August 21, 2026** by desk research; none involved a
provider account, and nothing was sent.

**Number-block allocation.** `EV-102-001`–`016` belong to the hosting
evaluation (with `007`–`012` reserved there), `EV-102-017`–`029` and
`EV-102-040`–`051` to the identity evaluation, and `EV-102-030`–`039` to the
PostgreSQL evaluation. **This evaluation allocates `EV-102-052`–`081`**, using
`052`–`070` now and reserving `071`–`081` for this category's observation
records, of which §3 shows there will be many. Numbers are never reused or
renumbered, and the block is stated here rather than assumed so that a
concurrently drafted sibling — CBD-107 or CBD-130 — takes a block above `081`
instead of colliding.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-052 | `HG-102-054` | Amazon SES (E) | "Authenticating Email with DKIM in Amazon SES", `https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication-dkim.html` | Documented | Medium | Establishes Easy DKIM, Deterministic Easy DKIM, BYODKIM and manual signing on customer-owned domain identities; 2048-bit default with key-rotation frequency restrictions; DKIM inheritance from parent domain to subdomains and addresses, with per-identity override. Per-Region setup is required, which interacts with the single-region posture. Does **not** cover SPF, the custom MAIL FROM domain, or DMARC — `EV-102-053` carries those. | February 21, 2027 |
| EV-102-053 | `HG-102-054`, `ED-106-005` | Amazon SES (E) | "Complying with DMARC authentication protocol in Amazon SES", `https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication-dmarc.html` | Documented | Medium | Establishes that SPF alignment requires a custom MAIL FROM domain and a relaxed `aspf` policy, that SES uses strict DKIM alignment by default, the `_dmarc` TXT record shape, and the `p=none` → `p=quarantine` → `p=reject` rollout. Establishes the mechanism, not that CoBudget's domains are configured; that is `ED-106-005` work and `OI-106-002` owns the policy value. | February 21, 2027 |
| EV-102-054 | `HG-102-048`, `ED-106-007` | Amazon SES (E) | "Configuring custom domains to handle open and click tracking", `https://docs.aws.amazon.com/ses/latest/dg/configure-custom-open-click-domains.html` | Documented | Medium | Establishes that open tracking inserts a 1×1 transparent GIF and click tracking replaces links with SES-operated redirects, and that both occur when open/click event types are enabled on a configuration set's event destination. The page describes how to **enable** tracking; the inverse — that a configuration set without those event types modifies nothing — is implied by the page's own conditional framing rather than stated as a guarantee. That inference is exactly what the `HG-102-048` observation must confirm. | February 21, 2027 |
| EV-102-055 | `HG-102-051`, `HG-102-053`, `ED-106-003` | Amazon SES (E) | "Using the Amazon SES account-level suppression list", `https://docs.aws.amazon.com/ses/latest/dg/sending-email-suppression-list.html` | Documented | Medium | Establishes `PutSuppressedDestination`, `ListSuppressedDestinations`, `DeleteSuppressedDestination`, bulk import/delete via `CreateImportJob`, per-configuration-set override of account-level suppression, `BOUNCE`/`COMPLAINT` reasons, case-sensitive matching, and that entries persist until removed. Establishes the §7.6 edge: hard bounces are also written to a cross-customer **global** suppression list. Bulk operations require production access, so a sandbox account cannot exercise the full pass test. Tenant-level suppression exists and was not evaluated. | February 21, 2027 |
| EV-102-056 | `HG-102-052`, `HG-102-055` | Amazon SES (E) | "Email archiving", `https://docs.aws.amazon.com/ses/latest/dg/eb-archiving.html` | Documented | Medium | Establishes that outbound archiving applies only when sending *"through a configuration set with the archiving option enabled"*, a *"default retention period of 180 days"* that can be overridden at creation and edited later, optional CoBudget-KMS encryption of the archive and of exports, a console that can *"view the text of a message"* and download it, 30-day search windows, and 30-day delayed deletion of a deleted archive. Does **not** state what SES retains for a message sent without archiving, which is the half `HG-102-052` needs — `OQ-106-007`. | February 21, 2027 |
| EV-102-057 | `HG-102-050`, `HG-102-049`, `HG-102-001` | Amazon SES (E) | "Contents of event data that Amazon SES publishes to Amazon SNS", `https://docs.aws.amazon.com/ses/latest/dg/event-publishing-retrieving-sns-contents.html` | Documented | Medium | Establishes the full event payload: a `mail` object with `messageId`, `source`, `destination`, `headers`, `commonHeaders` and `tags`, plus per-event objects. **No rendered body appears in any event type.** Establishes that `tags` is a list rather than a required label, and that Open and Click objects carry the recipient's IP address, user agent and clicked link — data that does not arise under `ED-106-007`. Does **not** establish how the receiving endpoint authenticates the message; that is a property of the destination service and is `OQ-106-008`. | February 21, 2027 |
| EV-102-058 | `HG-102-054`, `ED-106-005` | Azure Communication Services Email (E) | "Email domains and sender authentication", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/email/email-domain-and-sender-authentication`, page updated February 26, 2026 | Documented | Medium | Establishes two domain types: a free Azure managed subdomain sending as `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`, preconfigured for authentication; and customer-owned custom domains requiring ownership verification plus SPF and DKIM records. Establishes that the managed domain is a vendor-branded envelope, making a custom domain mandatory under `HG-102-054` rather than preferred. Names **no DMARC** step — `EV-102-059` carries that. Each Communication Services resource links one verified domain at a time. | February 21, 2027 |
| EV-102-059 | `HG-102-054`, `ED-106-005` | Azure Communication Services Email (E) | "Best practices for sender authentication support", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/email/email-authentication-best-practice`, page updated March 25, 2026 | Documented | Medium | Establishes Microsoft's documented SPF, DKIM, DMARC and ARC guidance for this product, including the recommendation that published DMARC records be *"p=reject" where possible, "p=quarantine" otherwise*, that `p=none`/`sp=none` be treated as transitional, and that a `rua` tag be included. Guidance rather than a product capability statement: it establishes that DMARC is supported practice for ACS Email senders, not that the service verifies or enforces it. | February 21, 2027 |
| EV-102-060 | `HG-102-048`, `ED-106-007` | Azure Communication Services Email (E) | "Enable user engagement tracking", `https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/enable-user-engagement-tracking`, page updated April 17, 2025 | Documented | Medium | Establishes that *"User interaction tracking is **Off** by default"* per verified domain, that enabling it requires a portal action plus a confirmation dialog and carries the acknowledgement *"you're enabling open/click tracking and giving consent to collect your customers' email activity"*, that it applies to HTML content only, and that it *"can't be enabled for Azure Managed Domains or custom domains with default sending limits"*. Does not state whether any message modification occurs while tracking is off; the `HG-102-048` observation decides that. | February 21, 2027 |
| EV-102-061 | `HG-102-051`, `ED-106-003` | Azure Communication Services Email (E) | "Manage email opt-out", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/email/email-optout-management`, page updated February 25, 2026 | Documented | **Low** | Establishes domain-level customer-managed suppression lists with *"create, read, update, and delete (CRUD) operations via the Azure portal, management SDKs, or REST APIs"*, sending-pipeline filtering of all recipients against the list, per-sender-address lists, and programmatic addition. **Confidence is lowered below the Documented default** because the page states the feature is *"currently in preview"*, *"provided without a service-level agreement"*, *"we don't recommend it for production workloads"*, and the function is *"only available in the latest Azure.ResourceManager.Communication SDK beta versions"*. A preview capability is not a production capability, and evidence register §3.1 permits lowering confidence but never raising it. | November 21, 2026 |
| EV-102-062 | `HG-102-001`, `HG-102-055`, `ED-106-012` | Azure Communication Services Email (E) | "Email logs", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/analytics/logs/email-logs`, page updated March 25, 2026 | Documented | Medium | Establishes three opt-in diagnostic categories with their complete field lists. Send Mail logs carry `Size`, recipient **counts**, and `AttachmentsCount` but no addresses. Status Update logs carry `RecipientId` — *"The email address for the targeted recipient"* — plus `SenderDomain`, `SenderUsername`, and SMTP status codes. User Engagement logs carry `EngagementContext` (the clicked URL) and `UserAgent`. **No subject line and no body appear in any schema.** Destination workspace and retention are CoBudget's choice through Azure Monitor. | February 21, 2027 |
| EV-102-063 | `HG-102-052`, `HG-102-053`, `HG-102-011` | Azure Communication Services Email (E) | "Data residency and user privacy for Azure Communication Services", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/privacy`, page updated March 25, 2026 | Documented | Medium | Establishes for Email that *"the system processes email message content in real-time"* in the resource's Data Location, that delivery logs live in a CoBudget-controlled Azure Monitor workspace, that sender username/MailFrom values are stored *"until explicitly deleted"*, and that *"for spam and abuse prevention and detection, the system temporarily retains recipient email addresses that resulted in hard bounced messages"*. Establishes geography selection at resource creation with an enumerated list, and that Event Grid system topics are *"created in a global location"*. **Does not state a body-retention period, and makes no explicit non-retention statement for Email** — the same page makes one for SMS. "Temporarily" is not a period. No subprocessor list. | February 21, 2027 |
| EV-102-064 | `HG-102-050`, `ED-106-006` | Azure Communication Services Email (E) | "Handle Email events", `https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/handle-email-events`, page updated July 14, 2026 | Documented | Medium | Establishes Event Grid delivery of `Microsoft.Communication.EmailDeliveryReportReceived` and `EmailEngagementTrackingReportReceived`, webhook endpoint subscription, terminal-state semantics, and that the engagement event's `Recipient` field *"is empty when the original email was sent to multiple recipients at a time"* — the observation `ED-106-006` relies on. Describes no endpoint authentication, replay protection, or retry semantics; those are Event Grid properties not retrieved (`OQ-106-008`). No body content is described in either payload. | February 21, 2027 |
| EV-102-065 | `HG-102-054`, `ED-106-005` | Postmark (E) | "How do I verify a domain?", `https://postmarkapp.com/support/article/1046-how-do-i-verify-a-domain` | Documented | Medium | Establishes DKIM by TXT record with verification within 48 hours, a custom Return-Path CNAME (`pm_bounces`) whose purpose is that *"messages sent by Postmark for your domain will start to pass SPF alignment"*, and DMARC guidance beginning at `p=none`. The single page covers all three mechanisms, which is a documentation-layout difference from C2 and C3 rather than a product difference — §3.1. A support article rather than versioned product documentation, which is why confidence is not raised despite the completeness. | February 21, 2027 |
| EV-102-066 | `HG-102-048`, `ED-106-007` | Postmark (E) | "Tracking links", `https://postmarkapp.com/developer/user-guide/tracking-links` | Documented | Medium | Establishes the `TrackLinks` values `None`, `HtmlAndText`, `HtmlOnly`, `TextOnly`, and states of `None`: *"This is the default setting for all messages and new and existing servers."* Establishes that enabling rewrites links through a Postmark tracking domain, that configuration is available at server scope and per message, and that individual links can be excluded with `data-pm-no-track`. Establishes the default and the scope, not that a message sent with `None` is unmodified — the `HG-102-048` observation decides that. Open tracking is documented separately and carries an equivalent per-server and per-message control. | February 21, 2027 |
| EV-102-067 | `HG-102-051`, `ED-106-003` | Postmark (E) | "Suppressions API", `https://postmarkapp.com/developer/api/suppressions-api` | Documented | Medium | Establishes list, bulk-create (up to 50 per call) and delete operations scoped to a **message stream** — the scope `ED-106-003` needs — with reasons `HardBounce`, `SpamComplaint` and `ManualSuppression`, origins `Recipient`, `Customer` and `Admin`, and per-entry success/failure results. Establishes the §7.6 edge: *"SpamComplaint suppressions cannot be deleted."* Does not state how long suppression entries are retained after deletion of the stream or the account. | February 21, 2027 |
| EV-102-068 | `HG-102-050`, `ED-106-011` | Postmark (E) | "Webhooks overview", `https://postmarkapp.com/developer/webhooks/webhooks-overview` | Documented | Medium | Establishes that *"Postmark does not currently support HMAC webhook signature verification. The recommended approach to protect your webhook endpoint is HTTP Basic Authentication ... combined with allowlisting Postmark's IP ranges"*, that HTTPS is *"highly recommend[ed]"*, that custom headers and basic-auth credentials are configurable through the interface and API, an escalating retry schedule, and an `X-PM-Webhook-Trace-Id` header *"that stays stable across retries of the same event"* with the guidance to *"always check whether you've already processed a MessageID before acting on it"*. Does not enumerate every payload field, so absence of body content in the payload is not established here — the `HG-102-050` observation covers it. | February 21, 2027 |
| EV-102-069 | `HG-102-052` | Postmark (E) | "How long are Inbound and Outbound messages stored in activity?", `https://postmarkapp.com/support/article/how-long-are-inbound-and-outbound-messages-stored-in-activity` | Documented | Medium | Establishes that Postmark *"stores email content, events (e.g. delivery, click, open), and metadata for all messages for 45 days by default"*, that a Retention Add-on adjusts this *"from 7 to 365 days"*, that at expiry Postmark *"deletes email content and related metadata for all delivered messages"*, and that *"Postmark stores aggregated statistics forever. This includes bounce and spam complaints."* The permanent aggregate-statistics carve-out is an uncontrolled copy for `ED-106-013` purposes. The minimization mechanism is a **paid add-on**, which is a `CR0` interaction — assessment §5.3. A support article rather than versioned product documentation. | February 21, 2027 |
| EV-102-070 | `HG-102-052`, `HG-102-055`, `HG-102-007` | Postmark (E) | "Can I hide or turn off saving of message content in my Activity page?", `https://postmarkapp.com/support/article/can-i-hide-or-turn-off-saving-of-message-content-in-my-activity-page` | Documented | Medium | Establishes that message content storage **cannot be disabled** — *"Message content cannot be hidden or deleted immediately"* — at any scope, and the stated reason: *"For compliance reasons we monitor activity on all accounts as an anti-spam and anti-abuse measure."* Establishes that the retention window is the only control. The monitoring statement bears on `HG-102-007` (routine vendor access to customer content) but does not settle it in either direction: it establishes that a monitoring process exists, not what human access it implies. `OQ-106-004`. | February 21, 2027 |

### 8.1 Reserved numbers

`EV-102-071`–`081` are reserved for this category's observation records, so that
the §3 observations can be registered without renumbering when they run. Eleven
gates × three candidates will not fit in eleven numbers; the reservation assumes
one record per candidate per observation session rather than per gate, following
the practice CBD-103 §9 established.

| ID | Held for |
| --- | --- |
| EV-102-071 | Reserved — C2 observation session (`HG-102-047`–`051`, `053`, `055`) |
| EV-102-072 | Reserved — C2 observation session, telemetry and console gates (`HG-102-001`, `004`, `012`, `015`) |
| EV-102-073 | Reserved — C3 observation session (`HG-102-047`–`051`, `053`, `055`) |
| EV-102-074 | Reserved — C3 observation session, telemetry and console gates |
| EV-102-075 | Reserved — C5 observation session (`HG-102-047`–`051`, `053`, `055`) |
| EV-102-076 | Reserved — C5 observation session, telemetry and console gates |
| EV-102-077 | Reserved — the §9 documentary retrievals, C2 |
| EV-102-078 | Reserved — the §9 documentary retrievals, C3 |
| EV-102-079 | Reserved — the §9 documentary retrievals, C5 |
| EV-102-080 | Reserved — contractual evidence (DPA, subprocessor list, retention commitment) |
| EV-102-081 | Reserved — contractual evidence, second candidate |

## 9. Open questions carried forward

Per evidence register §7, carried to CBD-108 rather than closed; a question that
stops being asked becomes `Absent` evidence and scores `0`. Questions shared with
the hosting evaluation (`OQ-103-001`–`004`) are cross-referenced there rather
than duplicated.

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-106-001 | Does the Google Cloud catalog in fact publish no first-party transactional email send service? | Screening | Confirm from the current catalogue before the §4.3 screen is relied on. The cross-category consequence in §4.3 depends on it |
| OQ-106-002 | Should a second standalone be evaluated, and which? | Screening | CBD-108's call. The §4.2 grounds for Postmark are stated; no claim is made about the unevaluated field |
| OQ-106-003 | Correlation-identifier lifetime and purpose separation for C5, the provider identity with no other category | `HG-102-002`, `HG-102-003` | Retrieve. C2 and C3 are covered by `OQ-103-001`/`002` |
| OQ-106-004 | Vendor staff access to message content and destinations for all three, including what C5's stated account monitoring implies | `HG-102-007`, `HG-102-008`, `HG-102-009` | Retrieve support-model and access-transparency documentation ×3. `OI-102-005` flags these as assertion-prone |
| OQ-106-005 | Dated region and subprocessor lists ×3 | `HG-102-011` | Retrieve. C3's geography list is in `EV-102-063`; the subprocessor half is missing for all three |
| OQ-106-006 | Whether any candidate injects body, footer, or subject content, and whether any *requires* a descriptive campaign, tag, or category label | `HG-102-047`, `HG-102-049` | The observations decide both; a documentary pre-check narrows what to look for |
| OQ-106-007 | A written statement of what each provider retains when body storage is minimized or off — the half `EV-102-056` and `EV-102-063` leave open | `HG-102-052` | Put to AWS and Microsoft directly. C5 is settled by `EV-102-069`/`070`. A written non-retention statement passes the gate as completely as a period does — §7.2 |
| OQ-106-008 | Callback endpoint authentication and replay protection for the AWS event destination and for Azure Event Grid | `HG-102-050` | Retrieve the SNS message-signature and Event Grid endpoint-authentication documentation. C5 is settled and negative (`EV-102-068`) |
| OQ-106-009 | Whether suppression entries and destination records survive account or stream deletion, and for how long | `HG-102-053`, `ED-106-016` | Retrieve ×3; interacts with every `DI-91-045` completion claim |

## 10. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-106-007 | Eleven pass tests are observation-bound, and executing them means **sending mail** — which no sibling category's observations required. | Verdicts stay `ELIGIBLE-PENDING-EVIDENCE` until the observations run. The `OI-103-008` authorization covers them; its synthetic-data guardrail means destinations must be mailboxes CoBudget controls, and no live customer address appears in an evaluation account. |
| OI-106-008 | The `EV-102-052`–`081` block allocation in §8 binds this document only. `001`–`051` are held by CBD-103, CBD-104 and CBD-105 on `main`. | A concurrently drafted CBD-107 or CBD-130 evaluation must claim a block above `081` or state its own. Prevents append-only register collision between concurrently drafted evaluations. |
| OI-106-009 | Every cross-category **X** gate is `UNPROVEN` for every candidate, and no provider-level record was reused. | This is the widest evidence gap of any CBD-15 category evaluation, and it is real rather than presentational: nothing has been retrieved about how these three vendors handle operator access, telemetry separation, or subprocessors. `OQ-106-004` and `OQ-106-005` are the largest remaining work. |
| OI-106-010 | C3's suppression list is in public preview without a service-level agreement, and `ED-106-003` depends on suppression working. | Not a `FAIL` — the capability is documented — but a preview dependency in a release-blocking path is a selection risk CBD-108 must weigh, and it may resolve itself before selection. Re-verify by November 21, 2026, sooner than the register's usual Documented shelf life. |
| OI-106-011 | This evaluation covers category **E** only; cross-category coherence is CBD-108's acceptance criterion. | The **X** gates were evaluated against the email candidates; the same gates apply independently in every category. The `ED-106-004` ceremony-email question and the §4.3 Google finding are the two places this category's result constrains another's. |
| OI-106-012 | Desk evaluation by one author; no provider contacted, nothing built, nothing sent. | The independent security review required before public launch remains outstanding, and `EG-91-006` remains open. |
| OI-106-017 | ~~`EV-102-069` and `EV-102-070` are vendor support-centre articles, classified **Documented** here.~~ **Resolved by Product Owner decision, August 22, 2026: class follows what a statement is about, not where it is hosted.** A statement about how the product behaves is `Documented` wherever the vendor publishes it, including a help centre; a statement about the vendor's own internal practice is `Asserted` wherever it appears. Recorded at evidence register §3.0.1. Suppression and retention behaviour is product behaviour, so **`EV-102-069` and `EV-102-070` keep their `Documented` class and C5's `HG-102-052` pass stands.** The rule also settles the equivalent record in the push and SMS evaluation, and it is the line `EV-102-001` already drew in practice — that record is `Asserted` because it describes internal controls, not because it sits on a trust page. Original text: Evidence register §3 does not place that form of source explicitly, and the classification decides an outcome — §7.2. | **Product Owner decision.** Classified Asserted instead, C5's `HG-102-052` pass becomes `UNPROVEN` under §3.2 and no candidate passes that gate. Numbered out of sequence because it was added after the §10 rows below it; `HG-102-*` §2.6 identifier stability applies to `OI-106-*` equally. |
| OI-106-018 | **AWS routes email deliverability metrics through a named subprocessor.** `EV-102-007` lists *"250ok Inc. / Email Data Source, Inc."* against *"Email deliverability metrics"*. | Not a gate outcome and not a finding against C2 — disclosure is what `HG-102-011` asks for, and C2 is the only candidate whose list was obtained at all. It matters because `ED-106-*` treats delivery telemetry as in-boundary, and a subprocessor processing that telemetry is a party CBD-108 should know about before selecting C2. The equivalent question cannot yet be asked of C3 or C5 because their lists were not obtained, so this is an asymmetry of retrieval, not of risk. |
| OQ-106-013 | Does Postmark date its subprocessor list anywhere, or state a change-notice period? | `HG-102-011`, `WR-102-006` | `EV-102-181` obtained the list and the region but found no effective or last-updated date, which is the only thing standing between C5 and a `PASS` on this gate. A dated copy in the DPA or on a trust page would settle it. |
