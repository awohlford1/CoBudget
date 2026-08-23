# CBD-103 — Hosting Candidate Shortlist and Gate Evaluation

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026, resolving `OI-103-008` by authorizing the ten gate observations (§3.3). It selects no provider; CBD-108 does that. **No candidate reaches `ELIGIBLE` until the authorized observations are performed — §3 explains why that is a structural result rather than a finding about any provider.** v1.1 runs the cross-category documentary pass `OI-103-009` required, registering thirty provider-level records for reuse by every sibling category (§3.5, §9). v1.2 extends it past the three hyperscalers to all ten provider identities for `HG-102-011`, and records at §7.9 that category F's documentary evidence is not obtainable by desk research at all. It moves four documentary gate outcomes, changes **no verdict**, and performs no observation. |
| Document version | 1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-103](https://cobudget.atlassian.net/browse/CBD-103) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Runtime Topology Specification v1.0; Operational and Cost Assessment v1.0; Acceptance Criteria Traceability v1.2 |
| Confluence page | [CBD-103 — Hosting Candidate Shortlist and Gate Evaluation](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12353537) |
| Repository baseline | `c689192` |
| Last updated | August 22, 2026 |

## 1. Purpose

CBD-103 must produce a shortlist and comparison matrix for the hosting, runtime,
jobs, and operational-services category. This document is that matrix. It
measures candidates against the 27 CBD-102 hard gates that apply to category
**H** — the 15 cross-category **X** gates plus the 12 **H** gates — using the
evidence classes and verdicts the CBD-102 evidence register fixes.

The topology those candidates are measured against is the companion Runtime
Topology Specification. A provider is evaluated on whether it can host that
topology, not on general merit.

## 2. What this document does not do

* It selects and recommends nothing. `CR3` and rubric `R1` both forbid a score or
  a cost from settling an order that the gates have not settled.
* It provisions nothing and creates no account. CBD-15 excludes production
  accounts, credentials, contracts, purchasing, provisioning, deployment, and
  integration.
* It publishes no weighted rubric total. §8 explains why, and why publishing one
  now would break rubric rule `R4`.
* It closes no `EG-91-*` evidence gap and no `RF-92-*` review finding.

## 3. The evidence ceiling — the finding that shapes everything below

**No hosting candidate can reach an `ELIGIBLE` verdict inside CBD-15's stated
scope.** This is a structural consequence of two approved documents disagreeing
about what CBD-103 is permitted to do, and it is the single most important
result in this evaluation.

### 3.1 The two constraints

CBD-15's OUT OF SCOPE list excludes *"production accounts, credentials,
contracts, purchasing, provisioning, deployment, or integration."*

The CBD-102 hard-gate catalog §2.2 makes the **pass test** the thing that decides
a gate: *"Every gate carries a pass test: the observation that decides it."* Ten
of the 27 applicable pass tests name an observation that can only be made on a
live provider account.

| Gate | What its pass test requires |
| --- | --- |
| `HG-102-001` | Field-level schema control *"demonstrated on a live account, with a captured payload"* |
| `HG-102-004` | Disablement *"verified by observed absence in network traffic and stored data, not by a configuration screenshot"* |
| `HG-102-012` | *"A deletion request is exercised and its request/response, effective date... captured"* |
| `HG-102-015` | *"Immutability or retention-lock is demonstrated"* |
| `HG-102-016` | *"A job payload and its metadata are inspected"* |
| `HG-102-018` | *"Each control is configured on a live account"* |
| `HG-102-019` | *"Exhaustion behaviour is observed under test"* |
| `HG-102-020` | *"Responses are captured... and compared field by field"* |
| `HG-102-022` | *"A limiter policy is configured with a non-subject key on a pre-authentication surface"* |
| `HG-102-024` | *"Key non-exportability and workload-identity authentication are demonstrated"* |

The remaining 17 divide into 13 that documentation or a contract can settle and
4 that the topology settles as CoBudget obligations.

### 3.2 Why this is not resolvable by reading harder

The evidence register §3.2 permits a gate to pass on *"Documented or stronger"*
evidence, which might seem to let vendor documentation substitute for the
observation. It does not, for these ten. Documentation establishes that a
capability **exists**; these ten pass tests were written to establish that the
capability **behaves as claimed on CoBudget's own account**, and several were
written specifically to reject documentary evidence — `HG-102-004` names a
configuration screenshot as insufficient, and `HG-102-001` requires a captured
payload.

That distinction is deliberate and correct. `HG-102-001` is the gate that keeps
customer identity out of provider telemetry; a vendor page saying fields are
configurable is exactly the kind of unsupported claim `CBD-92` §10.3 warns
about.

### 3.3 The consequence, and the decision it needs

Every candidate below therefore terminates at
**`ELIGIBLE-PENDING-EVIDENCE`** — not disqualified, but not selectable. The
evidence register is explicit that this verdict *"cannot be selected until
resolved."*

CBD-108 must select a provider set. It cannot do so from this evaluation alone.
Three routes are available, and the choice is a Product Owner decision that
CBD-103 cannot make:

| Route | What it costs | What it risks |
| --- | --- | --- |
| **A — Authorize evidence provisioning.** Amend CBD-15 scope to permit non-production trial accounts for the sole purpose of running the ten pass tests. | Operator time; free-tier or minimal spend. No production data is involved. | Little. The tests are read-only or synthetic by nature. |
| **B — Select at `ELIGIBLE-PENDING-EVIDENCE` and resolve during build.** | Nothing now. | A gate that fails on first observation invalidates the selection after integration work has started. `HG-102-001` and `HG-102-024` are the two most likely to bite, and both are expensive to discover late. |
| **C — Amend the ten pass tests to accept documentary evidence.** | A Product Owner decision amending an approved CBD-102 document. | Weakens the gates in exactly the place `CBD-92` §10.3 says not to. Not recommended. |

Route A is the smallest change that preserves the approved method, and it is
recommended. Note that it is a **scope amendment, not an exception**: exception
rule `EX-102-003` cannot help here, because an exception converts a `FAIL`, and
these gates are `UNPROVEN`. `UNPROVEN` has one remedy — better evidence.

`OI-103-008` records this for the Product Owner.

**Resolved August 20, 2026.** The Product Owner chose route A: non-production
evaluation accounts holding only synthetic data are authorized solely to
execute the ten observation pass tests, under five recorded guardrails — one
account per candidate, created by the operator; synthetic data only; free-tier
spend with a nominal $25 cap before separate approval and no contract beyond
click-through terms; results registered as `EV-102-*` Observed evidence with
credentials kept out of the repository; and the §3.4 symmetric documentary pass
completing first, so observations run only on candidates without a documentary
`FAIL`. The decision is recorded on the CBD-15 ticket, whose OUT OF SCOPE
bullet is amended by it. The verdicts in §6.3 stand unchanged until the
observations are actually performed — authorization gathers no evidence.

### 3.4 Evidence-pass asymmetry, stated plainly

The documentary evidence pass below was **not symmetric across candidates**. Some
gates were researched for one candidate and not the others, because the research
followed the questions that looked most likely to differentiate rather than
covering a fixed matrix.

This would normally invalidate a comparison. It does not invalidate this one,
for a specific reason: because §3.1 caps every candidate at
`ELIGIBLE-PENDING-EVIDENCE`, **no ranking is produced and no candidate is
excluded**, so an asymmetric pass cannot change an outcome. Every `UNPROVEN`
below means "not yet asked or not yet answered," never "the provider lacks
this."

Before CBD-108 ranks anything, the evidence pass must be completed
symmetrically — the same question put to every candidate. `OI-103-009` records
this.

### 3.5 The v1.1 cross-category documentary pass — what it did and did not do

`OI-103-009` is **partially discharged, not closed.** On August 21, 2026 a
documentary pass was run across the ten `DOC` cross-category gates, symmetrically
by construction: each question was put to all three candidates and each answer
was recorded whether or not it favoured the candidate. **Thirty records** were
registered — `EV-102-007`–`012` in the block v1.0 reserved for exactly this, and
`EV-102-162`–`186` in a new block above the CBD-15 range.

The pass ran in two legs. The first put all ten `DOC` gates to the three
hyperscalers. The second, at v1.2, extended `HG-102-011` to the seven remaining
provider identities — C4 Auth0, C5 Postmark, C6 Plaid, C7 MX, C8 Mastercard,
C9 Akoya and C10 Twilio — which is the first time any shared gate has been
asked of the whole candidate set. §7.8 and §7.9 are what that leg produced.

Seven gate outcomes moved and no verdict did:

* **Settled for every candidate** — `HG-102-010`, the only cross-category gate
  the pass carried to all three.
* **Settled for two of three** — `HG-102-002`, `HG-102-005` and `HG-102-011`.
* **Better evidenced but still `UNPROVEN`** — `HG-102-006`, `007`, `008`,
  `009`, `013`. Two of these produced findings rather than outcomes: §7.6 shows
  that no candidate documents a restore-approval permission, and §7.4 that
  Customer Lockbox covers **none** of the Azure services CBD-15 evaluates —
  which closed `OI-103-019` by retrieval rather than by Product Owner decision.
* **Not advanced** — `HG-102-003` purpose separation, the last of the ten. Its
  pass test asks that *"the provider's own data model is inspected for a shared
  identity graph"* across telemetry, support and analytics surfaces, which is
  closer to an observation than to a retrieval. One fragment surfaced
  incidentally at `EV-102-178` and is recorded there rather than used.

`HG-102-003` and the six category `DOC` gates are what remains of `OI-103-009`
for this category. **Nine of the ten shared gates are now answered.**

Three properties of this pass are worth stating plainly, because they constrain
how its results may be read.

**It was run at provider level, and provider level is not service level.** The
records establish claims about AWS, Azure and Google Cloud. They do not
establish those claims for Cloud Run, Container Apps, or App Runner. Where a
vendor scopes a capability per service, this pass found the scoping and recorded
it rather than generalizing over it — §7.4 is the clearest instance, and it is
the reason CBD-104 was right to decline reuse of `EV-102-005`.

**An `UNPROVEN` produced by this pass still never means "the provider lacks
this."** Three of the remaining gaps are CoBudget's retrieval failures and say
nothing about the vendor: Google's subprocessor page defeated the fetch tool
three times, Microsoft's subprocessor list sits behind a separate retrieval
path, and AWS's transport-encryption statement was found only in a whitepaper
the vendor marks *"for historical reference only."* Each is named in §10 so it
is not mistaken for a finding.

**A trust page is `Asserted` whoever publishes it.** `EV-102-167` records
Microsoft's data-access page at the same class `EV-102-001` gives AWS's operator
page, because they are the same form of source. Filing one as `Documented` and
the other as `Asserted` would have handed C3 two gate outcomes on nothing but a
classification decision.

**Two records are registered for what they rule out rather than what they
establish.** `EV-102-169` records that the Microsoft retention page which
appears to answer `HG-102-013` is scoped to Microsoft 365 and not to Azure, and
`EV-102-170` records that the AWS DPA could not be parsed at all. Neither
supports a gate outcome. They exist so the next evaluator does not spend the
same retrieval twice, and so that a gap caused by CoBudget's tooling is never
mistaken for a gap in a vendor's contract.

## 4. Screening

### 4.1 The screen

Candidates were screened before gate evaluation on one published, checkable
property: **does the provider offer a first-party managed service in each of the
five primitive classes the topology requires?**

| # | Primitive class | Topology decision it serves |
| --- | --- | --- |
| 1 | Container compute supporting a separately deployed long-running worker tier | `TD-103-001` |
| 2 | Edge or gateway with per-surface policy and response-header control | `TD-103-012`, `TD-103-013` |
| 3 | Durable queue with a dead-letter destination, plus a managed scheduler | `TD-103-008`, `TD-103-002` |
| 4 | Secret manager or KMS with non-exportable keys and workload identity | `TD-103-017` |
| 5 | Observability with at least two separately access-controlled destinations | `TD-103-021` |

A missing primitive is not automatically disqualifying — it can be supplied by a
third party. But doing so adds a subprocessor, which triggers an `HG-102-011`
disclosure obligation and requires that third party to pass the full 15-gate **X**
set on its own. At Private MVP scale that roughly doubles the evaluation for a
category the demand model already shows sits below every provider's entry tier.

**A screen is not a verdict.** Nothing below is recorded as `INELIGIBLE`. A
screened-out candidate has not been measured against a gate, and the screen is
reversible if the published catalogue is wrong or changes.

### 4.2 Screened out

| Candidate | Missing primitive class | Basis |
| --- | --- | --- |
| Render | 3 and 4 | No first-party durable queue with dead-letter handling and no first-party KMS in the published product catalogue. The environment-variable and secret-file mechanism is documented operationally; `EV-102-016` records that the documentation does not disclose backend storage, dashboard visibility, KMS or HSM use, key rotation, or workload identity, so no claim about its adequacy is made here in either direction. |
| Fly.io | 3 and 4 | Same two classes absent from the published catalogue. Not separately evidenced. |
| Railway | 3 and 4 | Same. Not separately evidenced. |
| Vercel | 1 and 3 | Serverless-first execution model; no separately deployed long-running worker tier of the shape `TD-103-001` requires. Not separately evidenced. |
| Heroku | 3, 4, and 5 | Queue and datastore capability is supplied through third-party add-ons, each of which becomes a disclosed subprocessor under `HG-102-011`. Not separately evidenced. |
| DigitalOcean App Platform | 3 and 4 | Same two classes absent. Not separately evidenced. |
| Self-managed IaaS | — | Contradicts the "managed provider" premise of CBD-15 and moves every gate from Vendor to Config, transferring the entire operational burden to the single operator that rubric dimension `WR-102-027`–`031` exists to protect. |

Five of these seven rows are marked *not separately evidenced*. They rest on
published product catalogues rather than retrieved and registered evidence, and
under evidence register §3.2 that is not sufficient to establish anything. They
are recorded as a screening judgment, and `OQ-103-005` carries the question
forward rather than closing it by silence.

### 4.3 Carried into gate evaluation

| ID | Candidate | Composition evaluated |
| --- | --- | --- |
| **C1** | Google Cloud | Cloud Run; Cloud Armor / HTTPS Load Balancing; Pub/Sub with dead-letter topic; Cloud Scheduler; Secret Manager and Cloud KMS; Cloud Logging |
| **C2** | Amazon Web Services | ECS on Fargate; API Gateway / CloudFront with WAF; SQS with redrive; EventBridge Scheduler; Secrets Manager and KMS; CloudWatch |
| **C3** | Microsoft Azure | Container Apps; Front Door / API Management; Service Bus with dead-letter queue; Azure Container Apps jobs or Logic Apps scheduling; Key Vault; Azure Monitor |

Each composition is one plausible arrangement of that provider's primitives, not
the only one. A different composition can change a gate result, and §7 notes
where that is specifically true for C3.

## 5. Gate evaluation method

Each gate carries one outcome per candidate, per evidence register §3.3:

| Outcome | Meaning here |
| --- | --- |
| `PASS` | Documented or stronger evidence confirms the property, and the pass test is satisfiable by that evidence |
| `UNPROVEN` | Evidence is Asserted or Absent — including "the pass test needs an observation CBD-15 excludes" |
| `FAIL` | Evidence shows the property is absent |

Gates marked **Config** in the catalog are recorded as `PASS (design)` where the
topology settles CoBudget's side and no evidence of provider foreclosure exists.
A `PASS (design)` is a statement about provider eligibility, not evidence that
CoBudget built the control — `EX-102-007` states the same principle for
compensating controls, and CBD-94 verification must prove the build separately.

## 6. Comparison matrix

`OBS` marks a gate whose pass test requires the live-account observation §3
describes. `DOC` marks one documentation or a contract can settle. `CFG` marks a
Config gate.

### 6.1 Cross-category gates

| Gate | Kind | C1 Google Cloud | C2 AWS | C3 Azure | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-001 telemetry allowlist | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Captured payload required. |
| HG-102-002 correlation identifiers | DOC | `PASS` | `PASS` | `UNPROVEN` | **Asked of all three at v1.1 and it separates them — see §7.7.** C1 `EV-102-179`: W3C `traceparent`, a 128-bit trace ID scoped to *"the overall end-to-end request"*, and no end-user identifier mentioned anywhere. C2 `EV-102-177`: a 96-bit random trace ID plus timestamp scoped to *"a single client request"*, with `user` an **optional** field the customer populates. C3 `EV-102-178` is the exception: `operation_Id` is per-operation and clean, but the same data model defines an anonymous `user_Id` that the JavaScript SDK *"typically persists... in a user cookie"* and that feeds *"sampling score generation"*, plus a `user_AuthenticatedId` identifying a user *"persistently across browsers and devices"*. Not required, and engaged by the browser SDK rather than server-side telemetry — so `UNPROVEN` pending `OI-103-021`, not a `FAIL`. `OQ-103-001` |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-103-002` |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Screenshot explicitly insufficient. |
| HG-102-005 no standing credential | DOC | `PASS` | `UNPROVEN` | `PASS` | **Settled at v1.1 and now a differentiator — see §7.5.** C1 `EV-102-006` (Privileged Access Manager, native). C3 `EV-102-011` (Privileged Identity Management, native, time-bound with start and end dates, approval, justification, downloadable audit history). C2 stays `UNPROVEN`: `EV-102-008` establishes that AWS ships no native capability and validates four third-party partner products instead. That is not a `FAIL` — AWS does not meet the fail condition — but whether a partner integration satisfies a `Vendor`-type gate is `OI-103-017`. |
| HG-102-006 separable custody | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | **Asked symmetrically of all three at v1.1 and the answer is the same for all three — see §7.6.** The gate needs four separable permissions: backup read, key use or recovery, restore execution, and restore approval. Three of the four are separable everywhere — C1 `EV-102-173` (`cloudsql.backupRuns.get` versus `cloudsql.instances.restoreBackup`, with `roles/cloudsql.editor` carrying *"No ability to import data or restore from a backup"*), C2 `EV-102-172` (`AWSBackupServiceRolePolicyForBackup` and `AWSBackupServiceRolePolicyForRestores` as distinct policies), C3 `EV-102-171` (Backup Reader, Backup Operator, Backup Contributor). **No candidate documents a restore-approval permission at all.** Custody material at `EV-102-009` and `EV-102-163` addresses the key leg without addressing the split. Not a `FAIL` — the fail condition is one role implying all four, which no candidate meets — but not passable as written either. **Firm** under catalog §2.5; `OI-103-020`; also gated in practice by `OI-102-022`. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Both vendor positions are now on the record and both are `Asserted`, which §3.2 cannot convert to a `PASS`. C2 `EV-102-001`, `EV-102-010`: *"AWS support personnel who assist customers with their support requests do not have access to customer data."* C3 `EV-102-167`: *"Microsoft engineers don't have default access to cloud customer data"*, qualified by *"minimizing standing access to production data"* rather than eliminating it. C1 not retrieved. |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Unchanged at v1.1, and the reason is now specific rather than general: **the two trust pages retrieved for `HG-102-007` were each checked for this gate and neither addresses it.** `EV-102-010` does not mention impersonation, break-glass, or unrestricted log or database browsing; `EV-102-167` does not either. Silence on a break-glass capability is not evidence that none exists, which is what this gate asks about. `OQ-103-023`. |
| HG-102-009 staff-access evidence | DOC | **`PASS`** | `UNPROVEN` | `UNPROVEN` | `EV-102-002`–`004` for C1. **Both non-passing positions are now documented rather than merely unretrieved.** C2 `EV-102-001`, `EV-102-010`: customer visibility is scoped to *"on behalf of"* service operations, which raises a `FAIL` question — `OI-103-018`. C3 `EV-102-005`, `EV-102-012`: **Azure Container Apps is absent from the Customer Lockbox supported-services list**, so the C3 runtime this evaluation carries has no Lockbox coverage — §7.4. Neither flips: absence from a list is not evidence of absence from the product. See §7.1. |
| HG-102-010 encryption in transit and at rest | DOC | `PASS` | `PASS` | `PASS` | **Settled at v1.1 for all three — the only cross-category gate that reaches every candidate.** The pass test needs both halves with algorithm and key custody stated. C1 `EV-102-164` (AES-256, AES-GCM, DEK→KEK→Keystore, *"We own and manage the keys"*) and `EV-102-165` (ALTS, PSP). C3 `EV-102-162` (AES-256 DEK, KEK never leaves Key Vault) and `EV-102-163` (MACsec, AES-256, SHA-384). C2 `EV-102-009` for at rest (256-bit AES-GCM, three custody models) with `EV-102-174` for transport — *"All data flowing across AWS Regions over the AWS global network is automatically encrypted at the physical layer"*, *"All traffic between AZs is encrypted"*, and the TLS floor *"We require TLS 1.2"*. `EV-102-174` **supersedes `EV-102-166`** as the transport source and closes `OQ-103-022`; the historical whitepaper is no longer relied on for anything. |
| HG-102-011 region and subprocessors | DOC | `UNPROVEN` | `PASS` | `UNPROVEN` | **The first gate in the CBD-15 set where C2 leads.** C2 `EV-102-007`: an enumerated list, dated "Last Updated: July 28, 2026" on the page itself, with a 30-day advance-notice commitment and region scoping — the pass test asks that the list be *"obtained and dated"*, and it was. C1 and C3 stay `UNPROVEN` because neither list was **obtained**: Google's page defeated retrieval on three attempts, and Microsoft's list sits on the Service Trust Portal behind a separate retrieval path (`EV-102-167` names it and its six-month notice commitment). Both are retrieval gaps on CoBudget's side, not vendor silence — `OQ-103-018`. |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Request must be exercised. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Contractual class; still not obtained for any candidate. **The v1.1 pass read the contracts, and the position is now precise rather than blank.** The pass test says *"Silence fails"*, but that means the **provider's** silence once its contract has been read — not CoBudget's failure to read it. One of three was read. C1 `EV-102-168`: the Cloud Data Processing Addendum states a recovery window and a 180-day expiry covering *"existing copies"*, but defers region to Service Specific Terms not retrieved — two of the three elements, so still not a `PASS`. C2 `EV-102-170`: the DPA PDF is compressed and no clause text could be extracted. C3 `EV-102-169`: the retention page that appears to answer this is scoped to **Microsoft 365, not Azure**, and is registered as a negative record so it is not re-found and misread. This is the one gate in the set where completing the documentary pass could produce `FAIL`s across every candidate at once, and CBD-108 should not be surprised by that. `OQ-103-024`. |
| HG-102-014 S4 out of ordinary surfaces | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `TD-103-017`, `TD-103-018`, `TD-103-022`. Non-exceptable under §5.2. |
| HG-102-015 append-only evidence | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Retention-lock must be demonstrated. |

### 6.2 Hosting gates

| Gate | Kind | C1 Google Cloud | C2 AWS | C3 Azure | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-016 job authority context | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. All three carry arbitrary message attributes; the pass test still requires inspection through retry and dead-letter. |
| HG-102-017 authority fails closed | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `TD-103-006`, `TD-103-007` |
| HG-102-018 bounded queue controls | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. See §7.2 for a component-level finding that applies regardless. |
| HG-102-019 no indefinite retry | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. |
| HG-102-020 uniform throttled response | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. The header-suppression requirement in `TD-103-013` makes this a genuine differentiator once observable. |
| HG-102-021 per-surface ceilings | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Must confirm independent policies on all eleven `EP-92-*` entry points the pass test names. |
| HG-102-022 safe counting keys | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. |
| HG-102-023 exhaustion not weaponizable | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `TD-103-014` |
| HG-102-024 secret manager or KMS | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Non-exportability and workload identity must be demonstrated. All three publish a KMS product; that is not the pass test. |
| HG-102-025 webhook verification at edge | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `TD-103-016` |
| HG-102-026 diagnostics separate from telemetry | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Two destinations with **distinct access roles** is the test, not two destinations. |
| HG-102-027 dead-letter access boundary | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `TD-103-009` sets CoBudget's side; the provider must permit a distinct role. |

### 6.3 Tally

The 27 applicable gates divide by evidence kind into 10 `OBS`, 13 `DOC`, and 4
`CFG`. Every figure in this table is recomputed from the §6.1 and §6.2 tables by
`scripts/audit-cbd-103.py`, so it cannot drift from the matrix it summarizes.

| | C1 | C2 | C3 |
| --- | --- | --- | --- |
| `PASS` | 4 | 3 | 2 |
| `PASS (design)` | 4 | 4 | 4 |
| `UNPROVEN` | 19 | 20 | 21 |
| `FAIL` | 0 | 0 | 0 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |

No candidate carries a `FAIL`, so no compensating control, exception, or
residual-risk record is required, and no `CONDITIONAL` verdict arises. Nothing
in §5 of the exception rules is engaged.

**The v1.1 pass moved seven documentary outcomes and no verdict.** C1 gained
`HG-102-010` and `HG-102-002`; C2 gained `HG-102-011`, `HG-102-010` and
`HG-102-002`; C3 gained `HG-102-005` and `HG-102-010`.
Every candidate still terminates at `ELIGIBLE-PENDING-EVIDENCE`, because §3
caps them on the ten observation gates and this pass performed no observation.
The movement matters anyway: at v1.0 two of the three candidates had no `PASS`
of any kind, which made the comparison entirely empty. It is now merely thin.

## 7. Findings that survive the evidence ceiling

Three findings below are usable now, because they rest on retrieved vendor
documentation rather than on an observation.

### 7.1 `HG-102-009` is the sharpest differentiator in the category

The gate asks whether *"vendor-side access to CoBudget data produces durable,
attributable evidence — actor, time, approved scope, actions, and result —
obtainable by CoBudget."* Its fail test is direct: *"A provider that logs only
CoBudget's own API calls and not its own staff's access fails."*

The three candidates are in materially different positions.

**C1 Google Cloud — `PASS`.** Access Transparency records the actions Google
personnel take on customer data, including *"the affected resource and action,
the time of the action, the reason for the action, and information about the
accessor"* — with accessor detail covering physical location, employing entity,
and job category. The enable documentation describes it as *"a default security
control for every Google Cloud organization."* Critically for this category, the
supported-services list covers **every primitive the C1 composition uses** —
Cloud Run, Pub/Sub, Cloud Scheduler, Secret Manager, Cloud KMS, and Cloud
Logging are all listed at GA, as is Cloud Tasks. Access Approval additionally
permits authorizing or denying access before it occurs. `EV-102-002`–`004`.

**C2 AWS — `UNPROVEN`, and specifically so.** AWS states that support personnel
*"do not have access to customer data,"* that support-role permissions *"are
accessed from dedicated roles that can be disabled by each AWS customer,"* and
that use of those roles *"is also logged in AWS CloudTrail."* That covers staff
access **through an assumed role inside the customer account**. What the
retrieved material does not establish is customer-obtainable evidence of
infrastructure-plane operator access; the commitment there is that operator
actions are *"traceable in fine-grained forensic detail"* internally, which is
an assurance about AWS's own records rather than an export available to
CoBudget. Under evidence register §3.2 that is Asserted evidence, which cannot
produce a `PASS`. `EV-102-001`.

**C3 Azure — `UNPROVEN`, with a composition-specific problem worth acting on.**
Customer Lockbox gives the customer approval rights over Microsoft engineer
access and writes request, approval, denial, and expiry records to the
subscription activity log or the Entra audit log — genuinely responsive to this
gate. But the published supported-services list **does not include Azure
Container Apps, Azure Service Bus, or Azure Key Vault**, which are exactly
primitives 1, 3, and 4 of the C3 composition. Key Vault is where `DI-91-051` S4
key material would live.

Two further limits are documented and apply to C3 regardless of composition:
Lockbox has a minimum **Developer** support-plan requirement, which is a `CR0`
tier-forcing fact for the cost record; and it explicitly does not trigger for
emergency break-glass scenarios, for inadvertent exposure during platform
troubleshooting, or for external legal demands. `EV-102-005`.

**Actionable consequence for C3.** A composition using Azure App Service or
Azure Functions for compute — both on the supported list — would close primitive
1. Service Bus and Key Vault have no listed substitute, so the gap on primitives
3 and 4 is not composable away within Azure's first-party set. This should be
put to Microsoft directly before CBD-108, and `OQ-103-006` records it.

### 7.2 Google Cloud Tasks cannot be the durable job queue

This is a component finding, not a provider finding, and it holds regardless of
which provider is selected.

Cloud Tasks provides `max_attempts`, `min_backoff` and `max_backoff`,
`max_doublings`, `max_retry_duration`, `max_dispatches_per_second`, and
`max_concurrent_dispatches` — every control `HG-102-018` names except one. It
documents **no native dead-letter destination**, and when a task exhausts its
retry configuration, *the task is deleted*. `EV-102-013`.

A deleted task is the *"unlogged stall"* `HG-102-019` prohibits and the *"silent
drop"* `RL-92-006` prohibits. `TD-103-008` therefore excludes Cloud Tasks from
the durable job path. Pub/Sub with a dead-letter topic is the C1 queue
primitive, which is why §4.3 names it.

Note that this finding was reached from documentation and does **not** resolve
`HG-102-018`, whose pass test still requires live-account configuration. It
narrows the composition to be tested; it does not test it.

### 7.3 Pub/Sub ordering degrades when dead-lettering is enabled

Pub/Sub documents that *"if both message ordering and a dead-letter topic are
enabled on a subscription, this behavior might not be true, as Pub/Sub forwards
messages to dead-letter topics on a best-effort basis,"* and that *"order might
not be preserved when messages are written to a dead-letter topic."*
`EV-102-014`.

The two features are not mutually exclusive — a secondary source claimed they
were, and retrieval of the vendor page does not support that stronger claim.
What is documented is that the ordering guarantee becomes best-effort in the
presence of dead-lettering.

`TD-103-007` resolves this by making ordering a database property rather than a
broker property, so no candidate is penalized for it. The finding is recorded
because it is the evidence that decision rests on, and because it constrains
CoBudget's implementation rather than the provider's: `OI-103-004` carries the
obligation that no background effect may be order-dependent or accumulative.

### 7.4 Azure Customer Lockbox covers almost none of the Azure services CBD-15 evaluates — added at v1.1

`EV-102-005` established that Container Apps, Service Bus and Key Vault are
absent from the Customer Lockbox supported-services list, and noted that absence
from the list is not proof that no staff-access record exists by another route.
That caution stands. What v1.1 adds is the **full** list, and the full list is
worse than the sample suggested.

Across the six CBD-15 categories, the Azure candidate is a different Azure
service each time. Lockbox covers one of them, and even that one is uncertain:

| Category | C3 service | In the Lockbox list? |
| --- | --- | --- |
| CBD-103 hosting | Azure Container Apps | **No** |
| CBD-104 identity | Microsoft Entra External ID | **No** — only "Microsoft Entra Diagnostics Data" appears |
| CBD-105 PostgreSQL | Azure Database for PostgreSQL Flexible Server | **No** — resolved, see below |
| CBD-106 email | Azure Communication Services Email | **No** |
| CBD-130 push and SMS | Azure Communication Services SMS | **No** |

The PostgreSQL row was the one genuinely in doubt, and it is now settled. The
list contains "Azure Database for PostgreSQL", which might have read as covering
Flexible Server as a deployment model of it. Two things say otherwise. The same
list separately names **both** "Azure Database for MySQL" **and** "Azure
Database for MySQL Flexible Server", so it does not use the shorter name as an
umbrella. And the Microsoft cloud security benchmark baseline for Flexible
Server states it outright under control PA-8: Customer Lockbox Supported
**False**, *"This feature is not supported to secure this service"*
(`EV-102-175`).

**`OI-103-019` is therefore closed by retrieval rather than by decision, and the
answer is no.** The care taken over it is still worth recording, because the
baseline that answers it is **stale on another row** — it marks Azure Private
Link unsupported for Flexible Server while the current security overview tells
the reader to use Private Link (`EV-102-176`). A source that is wrong about one
feature is not authority about another, so the load-bearing evidence remains
`EV-102-012`, the current supported-services list, with the baseline as
corroboration. `EV-102-176` was retrieved specifically to check whether the
current documentation contradicts the PA-8 row; it does not mention Customer
Lockbox at all.

Three consequences. First, this is the evidence CBD-104 was missing when it
declined to reuse `EV-102-005` for Entra; that refusal is now positively
supported rather than merely cautious. Second, **C3 has no Customer Lockbox
coverage in any of the five categories it is a candidate in** — that is now
established rather than inferred. Third, `HG-102-009` still remains `UNPROVEN`
for C3 rather than becoming a `FAIL`, because the `EV-102-005` limitation holds:
absence from the Lockbox list is not evidence that no staff-access record exists
by another route. But a reader should understand that C3's position on the
category's sharpest differentiator is weaker than a bare `UNPROVEN` conveys.

### 7.5 `HG-102-005` inverts the `HG-102-009` ordering — added at v1.1

§7.1 records `HG-102-009` as the sharpest differentiator in the category, with
C1 the only candidate to pass it. `HG-102-005` now runs the other way, and the
two together are more informative than either alone.

| | C1 Google Cloud | C2 AWS | C3 Azure |
| --- | --- | --- | --- |
| `HG-102-009` staff-access evidence | `PASS` — Access Transparency | `UNPROVEN` — scoped to "on behalf of" | `UNPROVEN` — service not covered |
| `HG-102-005` no standing credential | `PASS` — Privileged Access Manager | `UNPROVEN` — no native product | `PASS` — Privileged Identity Management |
| `HG-102-011` region and subprocessors | `UNPROVEN` — not obtained | **`PASS`** — obtained and dated | `UNPROVEN` — not obtained |

Read across, no candidate leads on all three, and the one gate C2 wins it wins
outright: AWS is the only candidate whose subprocessor list was published in a
form that could simply be read and dated. C1 is the only candidate passing both
access gates.

The C2 `HG-102-005` position deserves care, because it is easy to overstate.
AWS does **not** fail this gate. Its access model has federated identity,
permission sets and session durations, so the fail condition — *"a platform
whose only administrative path is a permanent console login held by a named
person"* — is plainly not met. What `EV-102-008` establishes is narrower: AWS
ships no native temporary-elevated-access product and instead validates four
partner products, so the pass test's *"bound to a named change or incident
record"* is reachable on AWS only by buying a third party. Whether that
satisfies a gate the catalog types `Vendor` is a reading question the evaluator
should not settle — `OI-103-017` — and it carries a `CR0` cost consequence that
no price has yet been put to.

### 7.6 Every candidate separates three of the four custody duties, and none separates the fourth — added at v1.1

`HG-102-006` is one of the two **firm** gates, and `SR-94-069` states the
requirement it serves without qualification: *"Data, key, approval, evidence,
and return-to-service duties MUST remain organizationally and technically
separated; one person MUST NOT combine customer data and keys or approve their
own access."*

The pass test breaks that into four permissions that must be separable — backup
read, key use or recovery, restore execution, and restore approval. Asked of all
three candidates on the same terms, the result is uniform:

| Leg | C1 Google Cloud | C2 AWS | C3 Azure |
| --- | --- | --- | --- |
| Backup read | `cloudsql.backupRuns.get`/`.list` | `AWSBackupAuditAccess` | Backup Reader |
| Restore execution | `cloudsql.instances.restoreBackup` | `AWSBackupServiceRolePolicyForRestores` | Backup Operator + Contributor on target |
| Key use or recovery | Cloud KMS IAM (recorded by the PostgreSQL evaluation) | KMS key policy (`EV-102-009`) | Key Vault / Managed HSM (`EV-102-163`) |
| **Restore approval** | **not documented** | **not documented** | **not documented** |

Three legs are genuinely separable everywhere. Google states the separation in
its role descriptions — `roles/cloudsql.editor` carries *"No ability to import
data or restore from a backup"*. AWS ships backup and restore as distinct
managed policies. Azure ships three built-in roles and frames them as duty
segregation in its own words.

**The fourth leg does not exist as a permission on any of the three.** No
approval step for a restore appears in any of the three sources, and none was
found elsewhere.

Two observations follow, and neither is a finding against a vendor.

**This is a gate-design question, not a provider gap.** A cloud IAM system
grants or denies; it does not natively model "a second person must approve this
specific restore". Read strictly, `HG-102-006` is unsatisfiable by any
hyperscaler, which mirrors `OI-130-010` in the push and SMS category and cannot
be the catalog's intent. `OI-103-020` puts it to the Product Owner.

**One candidate has the nearest mechanism, and it is the one this evaluation
already credited elsewhere.** Azure's Privileged Identity Management
(`EV-102-011`) requires approval to *activate* a privileged role, so approval
can be bound to the act of becoming able to restore even though it cannot be
bound to the restore call. That is a real difference from C1 and C2, which would
need a third-party product or a CoBudget-side control. It is **not** scored here,
because reading it as satisfying the gate would convert a `Vendor` gate into a
`Config` one, and §2.5 forbids widening a firm gate by drafting. The point is
recorded so `OI-103-020` can be decided with it in view.

Note also what this does **not** establish. That distinct permissions exist says
nothing about whether they are *held* by different principals in CoBudget's
account — that is `§2.5.1`'s named-second-principal disposition and an
observation, not a document. And C1's predefined roles collapse restore into
`roles/cloudsql.admin`, *"Full control for all Cloud SQL resources"*, so the
separation there depends on building a custom role rather than on using what
ships.

### 7.7 `HG-102-002` is the only gate where a vendor's own data model argues against it — added at v1.1

Nine of the ten documentary cross-category gates resolved on what a vendor
publishes about a capability. This one resolved on what a vendor publishes about
its own schema, and that turned out to be the sharper instrument.

The pass test has two halves: correlation identifier lifetime and scope must be
documented, and the provider must not *"require or default to a persistent
end-user identifier for correlation."* All three candidates satisfy the first
half. They diverge on the second, and the divergence is visible only because
each vendor documents its telemetry fields.

| | C1 Google Cloud | C2 AWS | C3 Azure |
| --- | --- | --- | --- |
| Correlation identifier | W3C `traceparent`, 128-bit | 96-bit random plus timestamp | `operation_Id` per operation |
| Scope | *"overall end-to-end request"* | *"a single client request"* | root operation |
| End-user identifier in the model | **none mentioned** | `user`, **optional** | `user_Id`, `user_AuthenticatedId`, `session_Id` |
| Persisted by default | — | no mechanism | **cookie, via the JavaScript SDK** |

C2's position is the cleanest of the three: the field exists, it is opt-in, and
AWS frames it as a search convenience the customer switches on. C1's is clean by
silence — Cloud Trace's context documentation never raises the subject, though it
also never states how its trace IDs are generated, which `OQ-103-026` records as
the one place C1's evidence is thinner than C2's.

C3 is the exception, and it is worth being precise about **why it is `UNPROVEN`
and not a `FAIL`**. Application Insights does not require a user identifier.
What its data model documents is that one exists as a first-class context field,
that the JavaScript SDK *"typically persists this value in a user cookie"*, and
that it participates in *"sampling score generation"* — the platform's own
machinery consuming a user identifier. Whether that counts as the provider
*defaulting* to one depends entirely on whether the browser SDK is inside
CoBudget's boundary, and nothing in the topology plans browser telemetry.

That is a scope question about CoBudget, not a capability question about
Microsoft, so `OI-103-021` puts it to the Product Owner and this evaluation
records the unfavourable-but-honest `UNPROVEN` rather than assuming the reading
that would hand C3 the gate.

Two facts surfaced while reading that model are worth carrying even though they
belong to other gates. `client_IP` is **masked by default** — Application
Insights *"uses the IP address to derive geolocation and then stores `0.0.0.0`
in this field"* — which is a point in C3's favour on `HG-102-001`, while the
derived `client_City`, `client_StateOrProvince` and `client_CountryOrRegion` are
retained and are not. And Azure Monitor supports per-table access restriction,
with generative-AI content routed to a dedicated table that can be *"set as
protected"* — evidence against the `HG-102-003` fail condition, though it was
found incidentally and the equivalent question was not put to C1 or C2, so it
moves nothing.

### 7.8 The candidate set is less independent than it looks — added at v1.1

`HG-102-011` was answered for all ten provider identities, and the answers do
more than settle a gate. Read together, the seven lists that could be obtained
describe a supply chain in which several nominally separate candidates rest on
the same infrastructure, and in which one candidate appears three times in three
different roles.

| Candidate | Named in its own list |
| --- | --- |
| C4 Auth0 | **AWS** and **Microsoft** for hosting; **Twilio** for the SMS authenticator; SendGrid for email; Cloudflare, DataDog, Snowflake, MongoDB, Aiven, Salesforce |
| C5 Postmark | **AWS** and Deft for infrastructure; Zendesk |
| C10 Twilio | **AWS** for hosting and storage; Google; Deepgram |
| C2 AWS | **Twilio** and seven other aggregators for A2P messaging; 250ok for email deliverability metrics |

Three observations, none of which is a finding against any vendor. Disclosure is
what this gate asks for, and every provider above is being penalised by nothing
except its own transparency.

**AWS is underneath at least three other candidates.** Selecting Auth0, Postmark
or Twilio does not diversify away from AWS; it adds a layer above it. A
provider-set decision that treats those as independent of the hosting choice is
reasoning about brands rather than about infrastructure. `HG-102-011` is
satisfied in each case — the point is what the satisfied gate reveals.

**Twilio occupies three positions at once**: a candidate in category N, a
subprocessor of AWS for A2P messaging, and a subprocessor of Auth0 for the SMS
authenticator. `OI-130-022` records the first two; the third means that
selecting C4 for identity also introduces Twilio, in a category where C10
currently carries the set's only `FAIL`. That `FAIL` concerns Twilio's own
opt-out API surface and does not transfer, but a reader tracking which
processors touch customer data should know Twilio arrives by three separate
routes.

**Concentration is not automatically a fault.** A single well-understood
infrastructure provider under several vendors may be preferable to four
different ones. What it is, is a fact CBD-108 must hold deliberately rather than
discover after selecting, and it bears directly on the acceptance criterion
requiring that the combined set have *"no contradictory identity, networking,
secret, regional, retention, deletion, incident, or support assumptions."*

Nothing here is complete. Three of the ten lists could not be obtained at all
and a fourth is undated, so the map above is what disclosure permits rather than
what exists — §7.9 records why that limit falls almost entirely on one category.

### 7.9 Category F's documentary evidence is not obtainable by desk research — added at v1.1

The `HG-102-011` sweep produced a split that runs along category lines rather
than along vendor quality.

| Provider | List obtained? | Why |
| --- | --- | --- |
| C2 AWS, C4 Auth0, C10 Twilio | **Yes, dated** | Published openly |
| C5 Postmark | Yes, **undated** | Published openly; carries no date |
| C1 Google, C3 Azure | No | Retrieval failure and a portal path |
| **C6 Plaid, C7 MX, C8 Mastercard, C9 Akoya** | **No** | **Gated behind a request or an NDA** |

All four financial-connectivity candidates withhold the material. Plaid runs a
Trust Center requiring an access request. MX states that its compliance
documentation is *"shared securely under NDA"* through a third-party trust
exchange. Mastercard publishes a privacy contact rather than a list. Akoya
publishes neither.

This is a category property, and it changes what "complete the documentary pass"
can mean for CBD-107. That evaluation holds **forty open cross-category cells,
the largest block in the set**, and §3.1 of it already records that no
provider-level record could be reused because no category **F** candidate
appears elsewhere. What this pass adds is that the gap is not a retrieval
failure anyone can fix by reading more carefully: **the documents are not
public.** Closing category F's documentary evidence requires a customer
relationship, a trust-portal request, or a signed NDA — none of which CBD-15's
scope currently contemplates, and the first of which the OUT OF SCOPE list
excludes outright.

Two consequences for CBD-108. First, category F cannot reach parity with the
other five by desk research, so a decision is needed about whether to pursue
trust-portal access or to select an aggregator on thinner evidence than every
other category — `OI-103-022`. Second, none of the four is recorded as a `FAIL`.
The gate fails a provider that *"will not enumerate subprocessors"*, and a list
held behind an access request has not been shown to be refused. Treating
gated-but-available as refused would convert a diligence step into a
disqualification.

## 8. Why no weighted rubric total is published

Rubric rule `R4` requires that per-dimension subscores always accompany a total,
so that *"strength in one dimension cannot silently mask a `0` in another."*
Rule `R5` requires an evidence-confidence profile alongside every result.

Publishing a total now would break both. The evidence-confidence profile for
every candidate is dominated by Absent evidence, and `R3` scores absent evidence
as `0`. A total computed over 33 criteria of which a handful have evidence would
be a number describing the research effort rather than the provider — precisely
the misleading artefact `R4` exists to prevent.

Evidence register §7 governs the alternative and is followed here: *"Open
questions are carried forward between CBD-103–107 rather than closed by
silence. A question that stops being asked is recorded as `Absent` evidence,
which scores 0 under rubric rule `R3`."* The open questions in §10 are carried,
not closed, so no criterion has yet become a `0`.

Scoring is deferred to the completed evidence pass. Rule `R1` makes this
harmless: the eligibility verdict settles order before any total is compared,
and all three candidates currently hold the same verdict, so no ordering
information is being withheld.

## 9. Evidence register

Records are append-only. Each carries the fields the evidence register §2
requires. `EV-102-001`–`006` and `013`–`016` were retrieved on **August 18,
2026**; `EV-102-007`–`012` and `EV-102-162`–`167` were retrieved on **August 21,
2026** for the v1.1 cross-category documentary pass described in §3.4. All were
desk research; none involved a provider account.

**This register is the CBD-15 home for provider-level cross-category records.**
`EV-102-001`–`006` were already reused by the PostgreSQL evaluation rather than
re-retrieved, and the v1.1 records below are written to be reused the same way
by every sibling category. A provider-level record establishes a claim about a
provider; it does not establish that claim for a particular service, and each
record's limitations state which services it was and was not shown to cover.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-001 | `HG-102-007`, `HG-102-008`, `HG-102-009` | AWS (H) | AWS Trust Center, "Security Controls — Operator Access", `https://aws.amazon.com/trust-center/operator-access/` | Asserted | Low | Vendor statement about its own internal controls with no independent support on the page. Establishes that support-role assumption is CloudTrail-logged; does **not** establish customer-obtainable evidence of infrastructure-plane operator access. Not product documentation and not versioned. | November 18, 2026 |
| EV-102-002 | `HG-102-009` | Google Cloud (H) | "Overview of Access Transparency", `https://docs.cloud.google.com/assured-workloads/access-transparency/docs/overview` | Documented | Medium | Establishes log field content and the existence of Access Approval. Does not establish per-service coverage or support-plan prerequisites; those are `EV-102-003` and `EV-102-004`. | February 18, 2027 |
| EV-102-003 | `HG-102-009` | Google Cloud (H) | "Supported services", `https://docs.cloud.google.com/assured-workloads/access-transparency/docs/supported-services` | Documented | Medium | Establishes GA coverage for Cloud Run, Cloud Tasks, Pub/Sub, Cloud Scheduler, Secret Manager, Cloud KMS, and Cloud Logging. Coverage of a service is not evidence that a log was produced for a given access; that would be Observed. | February 18, 2027 |
| EV-102-004 | `HG-102-009` | Google Cloud (H) | "Enable Access Transparency", `https://docs.cloud.google.com/assured-workloads/access-transparency/docs/enable` | Documented | Medium | States Access Transparency is a default control for every Google Cloud organization and names only IAM role prerequisites. **A secondary source asserted a Standard/Enhanced/Premium support-level requirement; the vendor page does not.** The discrepancy is unresolved and is a `CR0` cost question — see `OQ-103-007`. | February 18, 2027 |
| EV-102-005 | `HG-102-009` | Azure (H) | "Customer Lockbox for Microsoft Azure", `https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview`, page dated July 21, 2026 | Documented | Medium | Establishes the minimum **Developer** support-plan requirement, the supported-services list, activity-log and Entra audit-log records, and three documented exclusions (emergency break-glass, inadvertent exposure during platform troubleshooting, external legal demands). Container Apps, Service Bus, and Key Vault are **absent** from the list. Absence from the Lockbox list is not evidence that no staff-access record exists for those services by another route. | February 18, 2027 |
| EV-102-006 | `HG-102-005` | Google Cloud (H) | "Privileged Access Manager overview", `https://docs.cloud.google.com/iam/docs/pam-overview` | Documented | Medium | Establishes just-in-time temporary elevation with time-limited approved grants, multi-level approval, and post-hoc audit. Retrieved via search index rather than direct page fetch, so confidence is held at Medium and the page should be fetched directly before selection. Does not establish that standing production access is *unavailable*, which is the second half of the `HG-102-005` pass test. | February 18, 2027 |
| EV-102-013 | `HG-102-018`, `HG-102-019` | Google Cloud (H) | "Configuring queues", `https://docs.cloud.google.com/tasks/docs/configuring-queues` | Documented | Medium | Establishes that Cloud Tasks supports max attempts, min/max backoff, max doublings, max retry duration, dispatch-rate and concurrency caps, documents **no** native dead-letter destination, and deletes a task that exhausts retries. Concerns Cloud Tasks only; says nothing about Pub/Sub. | February 18, 2027 |
| EV-102-014 | `HG-102-018`, `TD-103-007` | Google Cloud (H) | "Order messages", `https://docs.cloud.google.com/pubsub/docs/ordering` | Documented | Medium | Establishes that ordering with a dead-letter topic becomes best-effort and that order might not be preserved for dead-lettered messages. Does **not** state that the two cannot both be enabled; the stronger claim came from a secondary source and is not supported. | February 18, 2027 |
| EV-102-015 | `HG-102-018` | Google Cloud (H) | "Dead-letter topics", `https://docs.cloud.google.com/pubsub/docs/dead-letter-topics` | Documented | Medium | Establishes a maximum-delivery-attempts range of 5–100 with a default of 5, and best-effort forwarding. Contains no statement about the ordering interaction; that is `EV-102-014`. | February 18, 2027 |
| EV-102-016 | Screening, `HG-102-024` | Render (H) | "Environment Variables and Secrets", `https://render.com/docs/configure-environment-variables` | Documented | Low | Operational documentation only. Explicitly does **not** disclose backend storage, dashboard visibility to a logged-in user, KMS or HSM use, key rotation, or workload identity. Confidence lowered below class under §3.1 because the page does not address the claim. **No conclusion about Render's secret handling is drawn from this record in either direction.** | February 18, 2027 |

### 9.1 Cross-category records — the v1.1 documentary pass

The six numbers reserved at v1.0 are now filled, and they are filled with what
the reservation was made for: AWS and Azure counterparts to `EV-102-001`–`006`,
adjacent to the records they answer, with nothing already cited renumbered. A
`(X)` in the Provider column marks a provider-level cross-category record rather
than a hosting-specific one.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-007 | `HG-102-011` | AWS (X) | "AWS Sub-processors", `https://aws.amazon.com/compliance/sub-processors/`, page states "Last Updated: July 28, 2026" | Documented | Medium | Establishes the enumerated, dated subprocessor list the pass test requires, engaged "in accordance with the AWS Data Processing Addendum". Establishes the change commitment: *"AWS will update this page at least 30 days before engaging a new sub-processor, and if you subscribe for updates, AWS will notify you by email of changes to this page."* Establishes region scoping — *"Sub-processors relevant to an individual customer will depend on the AWS Region the customer selects and the particular AWS services that the customer uses."* Establishes that **Twilio, Inc. is an AWS subprocessor for A2P messaging**, alongside Cequens, Infobip, Vonage/Nexmo, Route Mobile, Sinch, Tanla and TeleSign; and that "250ok Inc. / Email Data Source, Inc." provide "Email deliverability metrics". Does **not** map subprocessors to individual services beyond the activity descriptions, so which of the A2P pool carries a given message is not established. | February 21, 2027 |
| EV-102-008 | `HG-102-005` | AWS (X) | "Temporary elevated access for AWS accounts", `https://docs.aws.amazon.com/singlesignon/latest/userguide/temporary-elevated-access.html` | Documented | Medium | Establishes that AWS ships **no native** temporary-elevated-access capability: *"AWS IAM Identity Center integrates with the solutions from AWS Security Competency partners. AWS validates that these solutions address a common set of temporary elevated access requirements."* Names the validated partners — Apono, CyberArk Secure Cloud Access, Okta Access Requests, and Tenable (previously Ermetic). Establishes the definition AWS works to: *"a way to request, approve, and track the use of a permission to perform a specific task during a specified time."* Does **not** establish that AWS's own access model fails the gate — permission sets carry session durations and access is federated, so the pass test's fail condition (a permanent console login as the only administrative path) is not met. Whether a validated partner integration satisfies a `Vendor`-type gate is a reading question, not a retrieval gap — `OI-103-017`. No partner product was priced; that is a `CR0` fact and is not in this record. | February 21, 2027 |
| EV-102-009 | `HG-102-010`, `HG-102-006` | AWS (X) | "AWS KMS concepts — AWS KMS keys", `https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html` | Documented | Medium | Establishes the at-rest algorithm and key custody the pass test names. Key hierarchy states exact ciphers: the domain key is *"A 256-bit AES-GCM key only in memory of an HSM"* rotated daily; the derived encryption key is *"A 256-bit AES-GCM key only in memory of an HSM used to encrypt customer data and keys"*; the HSM backing key is *"A 256-bit symmetric key or RSA or elliptic curve private key"* rotated yearly. Establishes non-export: the HBK *"is generated on an HSM in the domain and is designed never to be exported from the HSM in plaintext."* Establishes three custody models — customer managed, AWS managed, AWS owned — and that **AWS owned keys are the default for new services**: *"AWS managed keys are a legacy key type that is no longer being created for new AWS services as of 2021. Instead, new (and legacy) AWS services are using what's known as an AWS owned key to encrypt customer data by default."* For AWS owned keys the customer *"cannot change their policies, you cannot audit activities on these keys, and you cannot delete them"*, with logging *"Not viewable by the customer."* That last property bears on `HG-102-006` separability and on `HG-102-009`, and it is the general form of the service-level limitation already recorded for AWS End User Messaging. Covers at-rest only; the transport half of `HG-102-010` is `EV-102-166`. | February 21, 2027 |
| EV-102-010 | `HG-102-009`, `HG-102-007` | AWS (X) | AWS Trust Center, "Security Controls — Operator Access", `https://aws.amazon.com/trust-center/operator-access/`, re-read at the primary page August 21, 2026 | Asserted | Low | Second retrieval of the `EV-102-001` source, registered separately because it establishes content that record did not capture. Establishes that customer visibility is **scoped**: *"In addition, these actions, known as 'on behalf of' service operations, are logged and made visible to customers in AWS CloudTrail."* The qualifier is the whole question — a search summary rendered this sentence without it, and the unqualified version would have flipped the gate. Establishes that internal logging is not customer-obtainable: *"Any access to systems that store or process customer data or metadata is logged, monitored for anomalies, and audited."* Establishes a support-model claim relevant to `HG-102-007`: *"AWS support personnel who assist customers with their support requests do not have access to customer data"*, with support permissions reached through dedicated roles *"that can be disabled by each AWS customer"*. The page does **not** address break-glass, unrestricted log or database browsing, standing versus just-in-time access, or impersonation. Asserted class under §3.2 cannot produce a `PASS`. Separately checked and found unusable for this gate: `https://aws.amazon.com/trust-center/data-center/our-controls/` concerns **physical** data-centre access only. | November 21, 2026 |
| EV-102-011 | `HG-102-005` | Azure (X) | "What is Privileged Identity Management?", `https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure`, page dated April 23, 2026 | Documented | Medium | Establishes a **native** Microsoft capability with no third-party dependency, in the vendor's own words: *"Provide just-in-time privileged access to Microsoft Entra ID and Azure resources"*; *"Assign time-bound access to resources using start and end dates"*; *"Require approval to activate privileged roles"*; *"Use justification to understand why users activate"*; *"Download audit history for internal or external audit."* Establishes the "time-bound eligible" assignment — *"A role assignment where a user is eligible to activate the role only within start and end dates"* — and that activation requires selecting a duration within an administrator-set maximum plus a reason. Graph APIs exist for both Entra roles and groups. Does **not** name the licence tier: the page states only *"Using Privileged Identity Management requires licenses"* and links out. The tier is a `CR0` cost fact and was not retrieved — `OQ-103-019`. Justification is free text and approval is by a named approver, so the pass test's *"bound to a named change or incident record"* is met by convention rather than enforced by the product; the same gap applies to `EV-102-006`. | February 21, 2027 |
| EV-102-012 | `HG-102-009` | Azure (X) | "Customer Lockbox for Microsoft Azure", `https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview`, page dated July 21, 2026 | Documented | Medium | Extends `EV-102-005` with the **complete** supported-services list, retrieved in full. Establishes the presences that matter to CBD-15 — "Azure Database for PostgreSQL", "Microsoft Entra Diagnostics Data", "Azure App Service", "Azure Functions", "Azure Kubernetes Service", "Azure Monitor (Log Analytics)", "Azure Storage" — and the absences: **Azure Container Apps, Azure Communication Services, Azure Key Vault, Microsoft Entra External ID as a service, and "Azure Database for PostgreSQL Flexible Server" are all absent.** The list names both "Azure Database for MySQL" and "Azure Database for MySQL Flexible Server" as separate entries while naming only "Azure Database for PostgreSQL", so the Flexible Server absence is conspicuous rather than shorthand — see §7.4. Establishes customer-obtainable evidence where Lockbox does apply: auditing logs *"are written to the activity logs for subscription-scoped requests and to the Microsoft Entra audit log for tenant-scoped requests"*, with named operations Create, Approve, Deny and Expiry. Establishes a Developer support-plan floor and a four-day default-deny expiry. Confirms the three `EV-102-005` exclusions verbatim and adds that *"Role assignments scoped to management groups aren't supported."* **Absence from this list is not evidence that no staff-access record exists by another route** — the `EV-102-005` limitation is carried forward unchanged. | February 21, 2027 |

### 9.2 A second block, above the CBD-15 range

`EV-102-001`–`161` are fully claimed by the six category evaluations, and
`EV-102-132`–`161` were the last block allocated. **This pass allocates
`EV-102-162`–`211`**, using `162`–`186` now and reserving `187`–`211` for its
completion. A future block starts above `211`. The allocation was widened from
`181` when the pass was extended past the three hyperscalers to the seven
remaining provider identities; no number already registered or cited moved.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-162 | `HG-102-010` | Azure (X) | "Azure data encryption at rest", `https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-atrest`, page dated July 8, 2026 | Documented | Medium | Establishes the at-rest algorithm — the data encryption key is *"A symmetric AES-256 key that encrypts a partition or block of data"* — and the envelope model in which a KEK *"never leaves Key Vault"*. Establishes key custody in both directions: platform-managed keys are the default and *"Azure encrypts data at rest by default by using platform-managed keys"*, while customer-managed keys are available through Azure Key Vault or Managed HSM, and Managed HSM external key management (preview) *"keeps the key encryption key (KEK) in a customer-operated hardware security module (HSM) entirely outside Azure."* Does **not** establish coverage for any specific service: the page routes per-service detail to a separate data-encryption-models table that was not retrieved, and states that *"Microsoft is also working toward encrypting all customer data at rest by default"*, which implies incomplete coverage. Container Apps, Communication Services and PostgreSQL Flexible Server were not individually confirmed — `OQ-103-020`. | February 21, 2027 |
| EV-102-163 | `HG-102-010` | Azure (X) | "Azure encryption overview", `https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-overview`, page dated July 8, 2026 | Documented | Medium | Establishes the transport half. Link-layer: *"Whenever Azure customer traffic moves between datacenters over links outside physical boundaries that Microsoft controls, Azure applies a data-link layer encryption method by using the IEEE 802.1AE MAC Security Standards, also known as MACsec"*, and *"MACsec encryption is on by default for all Azure traffic traveling within a region or between regions."* Transport-layer algorithms are named: connections *"support RSA-based 2,048-bit key lengths, ECC 256-bit key lengths, SHA-384 message authentication, and AES-256 data encryption."* Establishes the TLS floor as a transition rather than a completed state: *"Azure is transitioning to require TLS 1.2 or later for all connections to Azure services. Most Azure services completed this transition by August 31, 2025."* — "most", not all. Also establishes a custody boundary worth carrying to `HG-102-006`: Managed HSM *"provides a customer-owned security domain where Microsoft has no access to your key material."* | February 21, 2027 |
| EV-102-164 | `HG-102-010` | Google Cloud (X) | "Default encryption at rest", `https://docs.cloud.google.com/docs/security/encryption/default-encryption` | Documented | Medium | Establishes algorithm and custody together, which is what the pass test asks for. Algorithm: *"All data at the storage level is encrypted by DEKs, which use AES-256 by default"*, with *"AES-GCM (256 bits)"* the preferred symmetric protocol. Establishes chunking — *"Data is broken into logical chunks... Each chunk is encrypted at the storage level with an individual data encryption key (DEK)"* — and the full hierarchy DEK → KEK → Keystore → Keystore master key → Root Keystore. Establishes default custody in Google's own words: *"We own and manage the keys used in default encryption at rest"*, with Cloud KMS available for customer-managed keys. Covers at-rest only; transit is `EV-102-165`. Per-service coverage is not enumerated. | February 21, 2027 |
| EV-102-165 | `HG-102-010` | Google Cloud (X) | "Encryption in transit", `https://docs.cloud.google.com/docs/security/encryption-in-transit` | Documented | Medium | Establishes the transport half by named mechanism: *"Google's infrastructure uses ALTS for the authentication, integrity, and encryption of connections from the GFE to a Google Cloud service, and from one Google Cloud service to another Google Cloud service"*, and *"Google infrastructure uses PSP to encrypt traffic within and between our data centers."* Establishes the scope claim *"Google Cloud encrypts customer data in transit within Google's networks, unless described otherwise in this section"* — note the carve-out — and that *"VM-to-VM connections within VPC networks and peered VPC networks inside of Google's production network are integrity-protected and encrypted."* Client-facing traffic is *"secured with TLS"* over HTTPS, HTTP/2 or HTTP/3, terminated at the GFE. **No TLS version floor was stated on the retrieved content**, so the minimum version is not established — `OQ-103-021`. | February 21, 2027 |
| EV-102-166 | `HG-102-010` | AWS (X) | "Encrypting Data-at-Rest and Data-in-Transit", Logical Separation on AWS whitepaper, `https://docs.aws.amazon.com/whitepapers/latest/logical-separation/encrypting-data-at-rest-and--in-transit.html` | Documented | **Low** | **Confidence lowered below class because the vendor disclaims the source**: the page opens *"This whitepaper is for historical reference only. Some content might be outdated and some links might not be available."* Subject to that, it states *"All network traffic between AWS data centers is transparently encrypted at the physical layer"*, that *"All traffic within a VPC and between peered VPCs across regions is transparently encrypted at the network layer when using supported Amazon EC2 instance types"* — conditional on instance type, which CoBudget's runtime choice may not satisfy — and that *"All AWS service endpoints support TLS."* No minimum TLS version is stated. Also establishes FIPS 140-2 validated HSMs where *"plaintext keys cannot be used outside the HSM by anyone, including AWS employees"*, that *"Customer keys can only be used within the AWS region in which they were created"*, and that *"Every request made of AWS KMS is logged to AWS CloudTrail."* **This record is not relied on for any gate outcome.** A current AWS source for the transport half was not retrieved — `OQ-103-022`. | November 21, 2026 |
| EV-102-167 | `HG-102-007`, `HG-102-008`, `HG-102-011` | Microsoft (X) | "Microsoft Data Access", Microsoft Trust Center, `https://www.microsoft.com/en-us/trust-center/privacy/data-access` | Asserted | Low | Classified **Asserted** for the same reason `EV-102-001` is: a vendor statement about its own internal controls, on a trust page rather than product documentation, with no independent support and no version. Classifying it as Documented while AWS's counterpart is Asserted would advantage Azure by a filing decision. Subject to that, it states *"Microsoft engineers don't have default access to cloud customer data. Instead, they are granted access, under management oversight, only when necessary"* and that virtual access is restricted by *"role-based access control, multifactor authentication, minimizing standing access to production data, and other controls"* — **minimizing** standing access, not eliminating it. Establishes the subprocessor notice commitment: *"Microsoft publishes the names of any new subprocessors for its online services at least six months in advance"*, against AWS's 30 days. Does **not** address break-glass, impersonation, or unrestricted query. The Microsoft Online Services Subprocessor List itself was **not obtained** — see `OQ-103-018`. Asserted cannot produce a `PASS`. | November 21, 2026 |
| EV-102-168 | `HG-102-013` | Google Cloud (X) | "Cloud Data Processing Addendum", `https://cloud.google.com/terms/data-processing-addendum` | Documented | Medium | The only one of the three DPAs whose text was successfully retrieved. Establishes an **expiry** covering copies, §6.2 verbatim: *"Customer instructs Google to delete all remaining Customer Data (including existing copies) from Google's systems at the end of the Term. After a recovery period of up to 30 days from that date, Google will comply with this Instruction as soon as reasonably practicable and within a maximum period of 180 days."* Two of the pass test's three elements are therefore present — a retention window of up to 30 days recovery, and an expiry of 180 days maximum. The third is **not**: §10.1 defers data location to the Service Specific Terms and Appendix 3, neither retrieved, so region is stated by reference rather than stated. The contract does not use the word backup or separately describe provider-held backup copies; *"including existing copies"* is the nearest language. **Not sufficient for a `PASS`, and not evidence of silence either** — the deferred documents exist and were not read. `OQ-103-025`. | February 21, 2027 |
| EV-102-169 | `HG-102-013` | Microsoft (X) | "Data retention, deletion, and destruction in Microsoft 365", `https://learn.microsoft.com/en-us/compliance/assurance/assurance-data-retention-deletion-and-destruction-overview`, page dated June 24, 2024 | Documented | Medium | **Registered as a negative record: this page does not apply to the candidate.** It is scoped to Microsoft 365 in its title, in its description — *"An overview of Microsoft policies for Microsoft 365"* — and in every provision, and CoBudget's C3 candidacies are Azure services. A search summary presented its contents as general Microsoft policy; they are not. Recorded so the next evaluator does not re-find it and mistake it for the answer. For completeness, what it states for M365: *"If a paid subscription ends or is terminated, Microsoft retains customer data stored in Microsoft 365 in a limited-function account for 90 days"*, then *"No more than 180 days after expiration or termination... Microsoft disables the account and deletes all customer data"*, and *"Once the maximum retention period for any data elapses, the data is rendered commercially unrecoverable."* **No conclusion about Azure is drawn from this record in either direction.** `OQ-103-025`. | February 21, 2027 |
| EV-102-170 | `HG-102-013` | AWS (X) | "AWS Data Processing Addendum (DPA)", `https://docs.aws.amazon.com/whitepapers/latest/navigating-gdpr-compliance/aws-data-processing-addendum-dpa.html`, and the DPA itself at `https://d1.awsstatic.com/legal/aws-dpa/aws-dpa.pdf` | Documented | **Low** | **Confidence lowered below class because the operative document could not be read.** The DPA PDF was retrieved but its content streams are compressed and no clause text could be extracted, so nothing in it is quoted or relied on here. The summary page establishes only that the DPA exists, that it *"is incorporated into the AWS Service Terms and applies automatically to all customers globally"*, and that a Supplementary Addendum adds commitments about **governmental requests** — redirecting them to customers, notifying, challenging overly broad requests, and minimizing disclosure. Those concern compulsory disclosure, not backup behaviour. The page **does not address AWS's own backup retention, an expiry for AWS-held copies, or a region commitment for backups**. This is a retrieval limitation on CoBudget's side, not evidence that AWS's contract is silent. `OQ-103-025`. | November 21, 2026 |
| EV-102-171 | `HG-102-006` | Azure (X) | "Manage Backups with Azure role-based access control", `https://learn.microsoft.com/en-us/azure/backup/backup-rbac-rs-vault`, page dated April 30, 2026 | Documented | Medium | Establishes three distinct built-in roles and the vendor's own separation-of-duties framing: *"Azure RBAC enables fine-grained access management for Azure. Using Azure RBAC, you can segregate duties within your team."* **Backup Reader** — *"permissions to view all backup management operations"*; **Backup Operator** — *"everything a contributor does except removing backup and managing backup policies... can't perform destructive operations"*; **Backup Contributor** — *"all permissions to create and manage backup except deleting Recovery Services vault and giving access to others."* Establishes that restoring a PostgreSQL server needs **two roles at two scopes** — Backup Operator on the vault plus Contributor on the target server — so restore execution is not implied by backup management alone. **Establishes no restore-approval permission**; no approval step appears anywhere on the page. Custom roles are available. | February 21, 2027 |
| EV-102-172 | `HG-102-006` | AWS (X) | "Managed policies for AWS Backup", `https://docs.aws.amazon.com/aws-backup/latest/devguide/security-iam-awsmanpol.html` | Documented | Medium | Establishes that backup and restore are separable at the policy level by their existence as distinct managed policies: `AWSBackupServiceRolePolicyForBackup` and `AWSBackupServiceRolePolicyForRestores` are separate, alongside `AWSBackupOperatorAccess`, `AWSBackupFullAccess`, `AWSBackupAuditAccess`, `AWSBackupSearchOperatorAccess` and `AWSBackupServiceRolePolicyForItemRestores`. Audit is separable from operation: `AWSBackupAuditAccess` *"grants permissions for users to create controls and frameworks... and to audit AWS Backup resources and activities against their defined controls"*. Establishes that customer managed policies *"give you fine-grained controls to set access to backups"*, with the vendor's own example of scoping a backup administrator to RDS but not EFS. **Establishes no restore-approval policy or approval workflow**; none is named. The page exceeded the retrieval limit and was parsed for policy names and descriptions rather than read end to end. | February 21, 2027 |
| EV-102-173 | `HG-102-006` | Google Cloud (X) | "Cloud SQL IAM roles and permissions", `https://docs.cloud.google.com/sql/docs/postgres/iam-roles` | Documented | Medium | Establishes distinct permission strings, which is what the gate asks for: `cloudsql.backupRuns.list` and `.get` are held by `roles/cloudsql.admin`, `editor` and `viewer`; `cloudsql.backupRuns.create` by admin and editor; `cloudsql.backupRuns.delete` and **`cloudsql.instances.restoreBackup` by `roles/cloudsql.admin` alone**. Establishes the separation explicitly in the role descriptions: `roles/cloudsql.viewer` is *"Read-only access to all Cloud SQL resources"* and `roles/cloudsql.editor` carries *"No ability to import data or restore from a backup"*, while `roles/cloudsql.admin` is *"Full control for all Cloud SQL resources."* **The only predefined role holding restore is full control**, so predefined roles alone collapse restore into everything else; the permission is nonetheless distinct and grantable through a custom role. **Establishes no restore-approval permission**; none is documented. | February 21, 2027 |
| EV-102-174 | `HG-102-010`, `HG-102-007` | AWS (X) | "Data protection in Amazon EC2", `https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/data-protection.html` | Documented | Medium | **Closes `OQ-103-022` and replaces the historical whitepaper as the transport source.** Establishes the physical-layer claim on a current page: *"All data flowing across AWS Regions over the AWS global network is automatically encrypted at the physical layer before it leaves AWS secured facilities. All traffic between AZs is encrypted."* Establishes the TLS floor `EV-102-166` could not: *"We require TLS 1.2 and recommend TLS 1.3."* Establishes instance-to-instance encryption using *"Authenticated Encryption with Associated Data (AEAD) algorithms, with 256-bit encryption"*, **conditional on instance type**, same-Region, and same or peered VPC without an intervening load balancer or transit gateway — an enumerated list, not a universal property. Also establishes an at-rest cipher for NVMe instance store — *"encrypted using an XTS-AES-256 cipher"* with keys *"generated by, and only reside within, the hardware module, which is inaccessible to AWS personnel"* — which bears on `HG-102-007` for the compute plane. Concerns EC2 and the AWS global network; it does not enumerate per-service at-rest behaviour, which `EV-102-009` covers through KMS. | February 21, 2027 |
| EV-102-175 | `HG-102-009` | Azure (X) | "Azure security baseline for Azure Database for PostgreSQL - Flexible Server", `https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-database-for-postgresql-flexible-server-security-baseline`, page dated February 25, 2025 | Documented | **Low** | **Answers `OI-103-019` directly.** Under control **PA-8, Determine access process for cloud provider support**, the feature table for **Customer Lockbox** reads Supported **False**, Enabled By Default *Not Applicable*, with the guidance *"This feature is not supported to secure this service."* **Confidence is lowered below class because this source is demonstrably stale on another row**: the same baseline marks Azure Private Link *"not supported"* for Flexible Server, while the current security overview (`EV-102-176`, July 2026) directs the reader to use Private Link. The page carries its own supersession banner — *"This security baseline is based on a previous version of Microsoft Cloud Security Benchmark (v1.0)"*. It is therefore **corroboration, not proof**; the load-bearing evidence for the Lockbox position is `EV-102-012`, the current supported-services list, which omits Flexible Server. Also records, subject to the same staleness caveat, that **Azure RBAC for Data Plane** is marked Supported False for this service. | November 21, 2026 |
| EV-102-176 | `HG-102-009`, `HG-102-010` | Azure (X) | "Secure Your Azure Database for PostgreSQL Flexible Server", `https://learn.microsoft.com/en-us/azure/postgresql/security/security-overview`, page dated July 14, 2026 | Documented | Medium | The current replacement for the superseded baseline, retrieved to test `EV-102-175` rather than to rely on it. **Contains no mention of Customer Lockbox at all** — it neither confirms nor contradicts the PA-8 row, so the Lockbox position rests on `EV-102-012` and this record removes a possible contradiction rather than adding support. Establishes that the baseline is stale on network isolation: this page directs the reader to *"Azure Database for PostgreSQL networking with Private Link"*, which the baseline marks unsupported. For `HG-102-010` it adds service-level confirmation that the provider-level records could not give: *"Azure Database for PostgreSQL automatically encrypts data at rest by using service-managed keys (SMK)... It covers the primary server, replicas, point-in-time-recovery (PITR), and backups"*, with CMK available in Key Vault or Managed HSM, and in transit *"Azure PostgreSQL always uses SSL or TLS to encrypt data in transit"* with TLS 1.3 configurable as a requirement. | February 21, 2027 |
| EV-102-177 | `HG-102-002` | AWS (X) | "AWS X-Ray segment documents", `https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html` | Documented | Medium | Establishes both halves of the pass test. **Lifetime and scope**: `trace_id` is *"A unique identifier that connects all segments and subsegments originating from a single client request"*, formatted as a version, an 8-hex-digit epoch timestamp, and *"A globally unique 96-bit identifier for the trace in 24 hexadecimal digits"*, with W3C Trace Context accepted. Randomness is addressed directly — *"Generate trace IDs with a secure random algorithm to ensure that attackers cannot calculate future trace IDs"* — and the page notes trace IDs are visible in response headers. **No persistent end-user identifier is required or defaulted**: `user` appears under **Optional Segment Fields** as *"A string that identifies the user who sent the request"*, populated only if the customer chooses, and the page frames it as an opt-in search convenience — *"if you set the `user` field on a segment to a unique identifier, you can search for segments associated with specific users."* Separately relevant to `HG-102-001`: the SDK's default `http` block carries `client_ip` and `user_agent`, which is telemetry content rather than a correlation identifier and does not bear on this gate. | February 21, 2027 |
| EV-102-178 | `HG-102-002`, `HG-102-003` | Azure (X) | "Application Insights telemetry data model", `https://learn.microsoft.com/en-us/azure/azure-monitor/app/data-model-complete`, page dated July 13, 2026 | Documented | Medium | **The one candidate whose data model documents a persistent end-user identifier as a platform mechanism.** Correlation itself is per-operation and clean: `operation_Id` is *"The unique identifier of the root operation"* and *"Either a request or a page view creates the operation ID."* But the same context table defines `user_Id` as *"The anonymous user ID"* and states that *"In browser apps, the JavaScript SDK typically persists this value in a user cookie"*, and that *"An anonymous user ID is used for sampling score generation"* — so a user identifier participates in the platform's own sampling. `user_AuthenticatedId` is described as initialized *"with a value that identifies the user persistently across browsers and devices. In this way, all telemetry items are attributed to that unique ID."* `session_Id` is *"the instance of the user's interaction with the app."* None of these is required, and all three are engaged by the JavaScript SDK rather than by server-side telemetry — which is why this is recorded as a reading question at `OI-103-021` rather than as a failure. Two findings incidental to this gate: `client_IP` is masked by default — *"Application Insights uses the IP address to derive geolocation and then stores `0.0.0.0` in this field"* — while `client_City`, `client_StateOrProvince` and `client_CountryOrRegion` are derived and retained; and for `HG-102-003`, Azure Monitor supports per-table access restriction, with generative-AI content routed to a dedicated table that can be *"set as protected"*, which is evidence against the gate's one-access-role fail condition but was not sought symmetrically. | February 21, 2027 |
| EV-102-179 | `HG-102-002` | Google Cloud (X) | "Trace context", `https://docs.cloud.google.com/trace/docs/trace-context` | Documented | Medium | Establishes scope and format: Cloud Trace propagates W3C `traceparent`, whose `TRACE_ID` is *"a 32-character hexadecimal value representing a 128-bit number"* and is *"the unique identifier of the overall end-to-end request, provided by the parent"*, with a legacy `X-Cloud-Trace-Context` form retained for compatibility. **The page contains no mention of any end-user identifier**, persistent or otherwise, so nothing requires or defaults to one. Weaker than `EV-102-177` in one respect and the difference is recorded rather than smoothed: the page does **not** state how trace IDs are generated or what entropy they carry, where AWS states the requirement explicitly. Scope is documented, generation is not — `OQ-103-026`. | February 21, 2027 |
| EV-102-180 | `HG-102-011` | Auth0 / Okta (X) | "Subprocessors", `https://www.okta.com/legal/trustandcompliance/subprocessors/`, *"Effective Date: May 2026"* and *"Posted Date: May 2026"* | Documented | Medium | **The strongest `HG-102-011` position of any candidate in the CBD-15 set.** Establishes an Auth0-specific enumerated list — *"The following Sub-processors are authorized by Okta to process Personal Data and assist Okta with respect to Auth0 (formerly Customer Identity Cloud) subscriptions"* — dated on the page, with a processing location against every entry. Establishes the only **contractual objection right** found anywhere in this pass: *"you may object to Okta's use of a new Sub-processor by notifying Okta promptly in writing within ten (10) business days after receipt of Okta's notice."* That is the `WR-102-006` band-4 descriptor, though `R2` caps a Documented criterion at `2`. The list names Amazon Web Services and Microsoft for hosting, Cloudflare for CDN and DDoS, DataDog for analytics, Snowflake, MongoDB, Aiven, Salesforce for support ticketing, SendGrid for email notifications, **Twilio for the SMS authenticator**, and Computer Generated Solutions Romania for 24x7 support — see §7.8. Auth0-scoped; the Okta Workforce lists are separate and were not read. | February 22, 2027 |
| EV-102-181 | `HG-102-011` | Postmark (X) | "EU Privacy", `https://postmarkapp.com/eu-privacy` | Documented | Medium | Establishes an enumerated list and a processing region, and **fails the pass test on the one remaining word**. The list names Deft (formerly ServerCentral) and Amazon Web Services for infrastructure, and Zendesk for help-desk software, with the region stated as *"Postmark's primary data and servers are hosted at Deft's data center (located outside of Chicago), and Amazon Web Services (AWS)."* Change notification is offered by subscription. **The page carries no last-updated or effective date**, and the pass test requires the list be *"obtained and dated"*. This is a property of the page, not a retrieval gap — the list was obtained. It is **not** a `FAIL`: the fail condition is a provider that will not enumerate subprocessors or commit to a region, and Postmark does both. `OQ-106-013`. | February 22, 2027 |
| EV-102-182 | `HG-102-011` | Plaid (X) | Privacy and security policies, `https://plaid.com/legal/`, and the Plaid Trust Center, `https://security.plaid.com/` | Documented | **Low** | **No public subprocessor list exists to obtain.** The legal page describes categories of recipient — *"Cloud storage services providers"*, *"Fraud prevention services providers"* — and states sharing *"With our data processors and other service providers, partners, agents, or contractors"*, without naming entities, dating a list, or committing to notice. Three searches of the vendor's own domain found no enumerated list. What exists is a Trust Center gating SOC 2 Type 2, ISO 27001 and ISO 27701 material behind an access request. Confidence is Low because this record establishes an **absence across pages searched**, not a vendor statement. **Not recorded as a `FAIL`**: the gate fails a provider that *"will not enumerate subprocessors"*, and a list available to customers under request has not been shown to be refused. `OQ-107-024`. | November 22, 2026 |
| EV-102-183 | `HG-102-011` | MX (X) | "MX Trust and Safety", `https://www.mx.com/trust/`, and the security whitepaper | Documented | **Low** | Same position as `EV-102-182` and stated by the vendor more explicitly. MX documents a third-party risk programme — each third party gets *"a risk-based assessment... prior to engaging"*, third parties are *"contractually obligated to secure their own networks and systems in a manner consistent with MX requirements"*, and critical ones are reviewed annually — but **names none of them**. Compliance documentation is *"available through the Trust Exchange"*, with access *"to documents shared securely under NDA"*. Establishes a programme, not a list. **Not a `FAIL`** for the same reason as Plaid. `OQ-107-024`. | November 22, 2026 |
| EV-102-184 | `HG-102-011` | Mastercard / Finicity (X) | "Terms & Privacy", `https://www.finicity.com/terms-privacy/en-US/` | Documented | **Low** | No enumerated subprocessor list found. The privacy material describes categories — service providers including analytics and OS or platform providers — and states that personal information is shared *"with partners such as financial institutions or payment processors, as well as to affiliates within the Mastercard group"*, which is a disclosure of kind rather than of identity, and the affiliate scope is unbounded on the page. A privacy contact is published for enquiries. **Not a `FAIL`**, on the same reasoning. `OQ-107-024`. | November 22, 2026 |
| EV-102-185 | `HG-102-011`, `HG-102-007` | Akoya (X) | "Security", `https://akoya.com/security`, and the privacy policy | Documented | **Low** | No enumerated subprocessor list found, so the gate position matches the other three aggregators. Establishes something the others do not, which is why this record also cites `HG-102-007`: Akoya describes a **pass-through model** in which it *"does not store any data accessed or shared on its network"*, and states that *"at no point does Akoya know who the consumer is or what data they are sharing."* If sustained, that materially changes what a subprocessor of Akoya could be exposed to and what vendor staff could reach — but it is a vendor claim on a marketing security page, unaccompanied here by an architectural description, and it is **not relied on for any gate outcome**. `OQ-107-025` records it as worth testing rather than accepting. `OQ-107-024`. | November 22, 2026 |
| EV-102-186 | `HG-102-011` | Twilio (X) | "Sub-processors", `https://www.twilio.com/en-us/legal/sub-processors`, *"Last Updated: April 2026"* | Documented | Medium | Establishes the enumerated, dated list the pass test requires: *"Twilio uses the third party companies below (each, a 'sub-processor') to process personal data (i) on behalf of Twilio customers; (ii) in accordance with customer instructions as communicated by Twilio; and (iii) in strict accordance with the terms of a written contract between Twilio and the sub-processor."* Locations are given per entry. Change notification is by subscription — *"Twilio customers may subscribe to notifications of sub-processor changes"* — with **no notice period in days stated**, weaker than AWS's thirty days and Auth0's ten-business-day objection window, which bears on `WR-102-006` rather than on this gate. Names **Amazon Web Services as its infrastructure provider** for hosting and storage, alongside Google and Deepgram — see §7.8. | February 22, 2027 |

Twenty-five numbers are reserved rather than left as gaps, because the register
is append-only and a gap is indistinguishable from a deleted record:

| ID | Status |
| --- | --- |
| EV-102-187 | **Reserved** for the cross-category documentary pass |
| EV-102-188 | **Reserved** for the cross-category documentary pass |
| EV-102-189 | **Reserved** for the cross-category documentary pass |
| EV-102-190 | **Reserved** for the cross-category documentary pass |
| EV-102-191 | **Reserved** for the cross-category documentary pass |
| EV-102-192 | **Reserved** for the cross-category documentary pass |
| EV-102-193 | **Reserved** for the cross-category documentary pass |
| EV-102-194 | **Reserved** for the cross-category documentary pass |
| EV-102-195 | **Reserved** for the cross-category documentary pass |
| EV-102-196 | **Reserved** for the cross-category documentary pass |
| EV-102-197 | **Reserved** for the cross-category documentary pass |
| EV-102-198 | **Reserved** for the cross-category documentary pass |
| EV-102-199 | **Reserved** for the cross-category documentary pass |
| EV-102-200 | **Reserved** for the cross-category documentary pass |
| EV-102-201 | **Reserved** for the cross-category documentary pass |
| EV-102-202 | **Reserved** for the cross-category documentary pass |
| EV-102-203 | **Reserved** for the cross-category documentary pass |
| EV-102-204 | **Reserved** for the cross-category documentary pass |
| EV-102-205 | **Reserved** for the cross-category documentary pass |
| EV-102-206 | **Reserved** for the cross-category documentary pass |
| EV-102-207 | **Reserved** for the cross-category documentary pass |
| EV-102-208 | **Reserved** for the cross-category documentary pass |
| EV-102-209 | **Reserved** for the cross-category documentary pass |
| EV-102-210 | **Reserved** for the cross-category documentary pass |
| EV-102-211 | **Reserved** for the cross-category documentary pass |

## 10. Open questions carried forward

Per evidence register §7, these are carried to CBD-108 rather than closed. A
question that stops being asked becomes `Absent` evidence and scores `0`.

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-103-001 | Correlation-identifier lifetime and scope; does the provider default to a persistent end-user identifier? | `HG-102-002` | Retrieve observability documentation for all three |
| OQ-103-002 | Is there a shared identity graph across the provider's telemetry, support, and analytics surfaces? | `HG-102-003` | Inspect each provider's own data model |
| OQ-103-003 | At-rest and in-transit encryption with algorithm and key custody stated | `HG-102-010` | **Largely resolved at v1.1.** Answered for C1 (`EV-102-164`, `EV-102-165`) and C3 (`EV-102-162`, `EV-102-163`), and for C2's at-rest half (`EV-102-009`). Only C2's transport half remains — `OQ-103-022`. The v1.0 note that this was "expected straightforward" proved right for five of six halves. |
| OQ-103-004 | Region list and subprocessor list, **obtained and dated** | `HG-102-011` | **Partially resolved at v1.1.** C2 obtained and dated (`EV-102-007`). C1 and C3 still outstanding, and the reason is retrieval rather than vendor silence — `OQ-103-018`. |
| OQ-103-005 | Do the six screened-out candidates in §4.2 actually lack the primitives attributed to them? | Screening | Confirm from each published catalogue before the screen is relied on |
| OQ-103-006 | Does Azure provide customer-obtainable staff-access evidence for Service Bus and Key Vault by any route other than Customer Lockbox? | `HG-102-009` | Put directly to Microsoft |
| OQ-103-007 | Does Access Transparency require a paid support level? Vendor page and secondary source disagree. | `HG-102-009`, `CR0` | Resolve before pricing C1 |
| OQ-103-008 | Per-surface ceiling policies on all eleven `EP-92-*` entry points named in the pass test | `HG-102-021` | Retrieve gateway documentation for all three |
| OQ-103-009 | Two telemetry destinations with genuinely **distinct access roles** | `HG-102-026` | Retrieve for all three |
| OQ-103-010 | A dead-letter access boundary distinct from ordinary queue operation | `HG-102-027` | Retrieve for all three |
| OQ-103-011 | Contractual statement of provider backup retention, region, and expiry. Silence fails this gate. | `HG-102-013` | Must be asked explicitly; will not be found in public documentation. **Unchanged at v1.1, and now the highest-consequence documentary question in the set** — see `OQ-103-024`. |
| OQ-103-018 | Google Cloud and Microsoft subprocessor lists, obtained and dated | `HG-102-011` | Google's page defeated retrieval three times; Microsoft's list is on the Service Trust Portal, named by `EV-102-167` but not obtained. Both are CoBudget-side retrieval gaps, not vendor silence, and neither is evidence about the provider. |
| OQ-103-019 | Which Microsoft Entra licence tier does Privileged Identity Management require? | `HG-102-005`, `CR0` | `EV-102-011` states only that it "requires licenses". The tier is a `CR0` tier-forcing fact and could change C3's cost position. Do not assume P2. |
| OQ-103-020 | Does Azure at-rest encryption cover Container Apps, Communication Services, and PostgreSQL Flexible Server specifically? | `HG-102-010` | `EV-102-162` is provider-level and routes per-service detail to a data-encryption-models table not retrieved. The page's own "working toward encrypting all customer data at rest by default" implies coverage is incomplete somewhere. |
| OQ-103-021 | What minimum TLS version does Google Cloud enforce on service endpoints? | `HG-102-010` | `EV-102-165` names ALTS and PSP but states no TLS floor. **Now the only candidate without one**: AWS's is *"We require TLS 1.2"* (`EV-102-174`) and Azure's is a transition to 1.2-or-later described as mostly complete (`EV-102-163`), with TLS 1.3 requirable per service (`EV-102-176`). C1 still holds `HG-102-010` on ALTS and PSP, so this does not block an outcome; it is the last asymmetry in the gate's evidence. |
| OQ-103-022 | ~~A **current** AWS source for transport encryption~~ **Closed August 21, 2026** | `HG-102-010` | `EV-102-174` supplies it from the current EC2 User Guide and supersedes `EV-102-166`, which is no longer relied on. C2 gains `HG-102-010`. Note the one qualification carried forward: instance-to-instance AEAD-256 encryption is conditional on an enumerated instance-type list, same Region, and no intervening load balancer or transit gateway — the physical-layer and TLS claims are unconditional, the instance-to-instance one is not. |
| OQ-103-023 | Does any candidate document a break-glass, impersonation, or unrestricted-query capability for its own staff? | `HG-102-008` | Both trust pages retrieved at v1.1 are silent on all three. Silence is not absence, and this gate asks precisely about a capability a vendor has no incentive to describe. |
| OQ-103-024 | Do the AWS, Google and Microsoft DPAs state provider backup retention, region, and expiry? | `HG-102-013` | **Read the DPAs before CBD-108 ranks anything.** The pass test says "Silence fails", so if the contracts are silent this gate fails for every candidate simultaneously — the only gate in the set with that property. It is currently `UNPROVEN` only because the contracts have not been read, which is not the same thing. |
| OQ-103-025 | The three specific documents that would settle `HG-102-013`: Google's **Service Specific Terms** and CDPA Appendix 3, an extractable copy of the **AWS DPA**, and an **Azure**-scoped retention statement | `HG-102-013` | Narrows `OQ-103-024` from "read the DPAs" to three named retrievals. `EV-102-168` shows Google's contract states two of the three elements and defers the third; `EV-102-170` shows the AWS DPA could not be parsed; `EV-102-169` shows the Microsoft page that looks like the answer is Microsoft 365 only. None of the three is evidence of provider silence yet. |
| OQ-103-026 | How does Google Cloud generate trace IDs, and with what entropy? | `HG-102-002` | `EV-102-179` documents the 128-bit W3C format and the request scope but not the generation algorithm, where `EV-102-177` states AWS's requirement outright. It does not block C1's `PASS` — the gate asks about lifetime, scope and the absence of a persistent user identifier, and all three are established — but it is the remaining asymmetry in this gate's evidence. |

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-103-008 | §3 established that no candidate could reach `ELIGIBLE` inside CBD-15's stated scope, because ten pass tests require a live-account observation the scope excluded. It was a scope question, not an exception question — `EX-102-003` cannot convert an `UNPROVEN`. | **Resolved August 20, 2026 by Product Owner decision** — route A, recorded in §3.3 and on the CBD-15 ticket. Observation evidence is now obtainable; the §6.3 verdicts stand until it is actually gathered. |
| OI-103-009 | The documentary evidence pass was not symmetric across candidates. | Harmless now, because all three hold the same verdict and no ranking is produced. Must be completed symmetrically before CBD-108 ranks anything. **Partially discharged at v1.1 — see §3.5.** The ten `DOC` cross-category gates were passed symmetrically and eleven records registered; `HG-102-002`, `HG-102-003`, `HG-102-013` and the six category `DOC` gates remain. The item stays open. |
| OI-103-010 | The C3 Azure composition uses three primitives absent from the Customer Lockbox supported-services list, two of which have no listed first-party substitute. | Does not disqualify C3. It does mean C3's `HG-102-009` position is weaker than C1's on the evidence retrieved so far, and it should be settled with Microsoft rather than inferred. |
| OI-103-011 | This evaluation covers category **H** only. Cross-category coherence — that the selected set shares no contradictory identity, networking, secret, regional, retention, deletion, incident, or support assumption — is a CBD-108 acceptance criterion and is not addressed here. | CBD-108 must perform it. The X gates were evaluated against the hosting candidate; the same X gates apply independently to every other category's provider. |
| OI-103-012 | No part of this evaluation has been reviewed by anyone other than its author, and no provider was contacted. | It is a desk evaluation. The independent security review that CBD-92 §1 and the architecture baseline require before public launch remains outstanding and is not substituted for by anything here. Unchanged at v1.1. |
| OI-103-017 | **Does a validated third-party integration satisfy a gate the catalog types `Vendor`?** `EV-102-008` establishes that AWS ships no native temporary-elevated-access capability and instead validates four partner products. | **Product Owner decision on the gate's reading.** Read as satisfied, C2 gains `HG-102-005` and the gate stops differentiating. Read as unsatisfied, C2's only route to it is a paid third party, which is a `CR0` fact no price has been put to. The evaluator declined to settle this by drafting, as `HG-102-005` is **firm** under catalog §2.5 and firm gates should not be widened silently. |
| OI-103-018 | **`HG-102-009` may be a `FAIL` for C2 rather than an `UNPROVEN`.** The pass test fails a provider that "logs only CoBudget's own API calls and not its own staff's access", and `EV-102-010` establishes that AWS's customer-visible record is scoped to *"on behalf of"* service operations. | **Product Owner decision.** No AWS equivalent of Access Transparency or Customer Lockbox was found, but this rests on two pages, and absence from two pages is not proof of absence from the product. Recorded as `UNPROVEN` with the question raised rather than declared a `FAIL` on thin retrieval. If it is a `FAIL`, C2 becomes `INELIGIBLE` in **every** category, which is why it should be settled deliberately. |
| OI-103-019 | ~~**Does "Azure Database for PostgreSQL" in the Customer Lockbox list cover Flexible Server?**~~ **Resolved August 21, 2026: it does not.** | **Closed by retrieval rather than by decision.** `EV-102-175` records that the Microsoft cloud security benchmark baseline for Flexible Server marks Customer Lockbox Supported **False** under control PA-8, with the guidance *"This feature is not supported to secure this service."* That source is stale on another row, so the load-bearing evidence remains `EV-102-012`, the current supported-services list, which omits Flexible Server while naming MySQL Flexible Server separately; `EV-102-176` confirms the current security overview raises no contradiction. **Consequence: C3 has no Customer Lockbox coverage in any of the five categories it is a candidate in.** No Product Owner decision is needed. |
| OI-103-020 | **No hyperscaler documents a restore-approval permission, so `HG-102-006` may be unsatisfiable as written** — §7.6. Three of its four legs are separable on all three candidates; the fourth exists nowhere. | **Product Owner decision on the gate's reading**, and the same shape as `OI-130-010`. Read strictly, no hyperscaler can ever pass a **firm** gate, which cannot be the intent. Read as satisfied by an approval bound to the *activation* of the restoring role, Azure's Privileged Identity Management (`EV-102-011`) supplies it natively and the other two need a third party or a CoBudget-side control — which would make a `Vendor` gate turn on a `Config` mechanism. The evaluator declines to choose, because widening a firm gate by drafting is precisely what catalog §2.5 forbids. |
| OI-103-021 | **Is Application Insights' cookie-persisted anonymous `user_Id` a provider default for the purposes of `HG-102-002`?** `EV-102-178` establishes that the JavaScript SDK persists it in a cookie and that it feeds the platform's sampling. | **Product Owner decision on scope, not on the vendor.** The mechanism belongs to the browser SDK. If the JavaScript SDK is outside CoBudget's boundary — which `TD-103-021` and `AN-92-003` would suggest, since nothing here plans browser telemetry — C3 passes on the same terms as C1 and C2. If it is inside, the gate asks precisely about a persistent end-user identifier and the answer is on the record. The evaluator declines to decide the boundary on the vendor's behalf, and records `UNPROVEN` rather than assuming the favourable reading. |
| OI-103-022 | **Category F's documentary evidence is gated behind requests and NDAs, so CBD-107 cannot reach documentary parity with the other five categories by desk research** — §7.9. All four aggregators withhold subprocessor and compliance material. | **Product Owner decision on method, not on a vendor.** Either trust-portal access is pursued for one or more aggregators — which is a contact CBD-15's OUT OF SCOPE list does not currently permit — or category F is selected on materially thinner evidence than every other category, and that asymmetry is accepted explicitly rather than absorbed silently. Raised here because this evaluation owns the cross-category register; the consequence lands on CBD-107 and CBD-108. |
