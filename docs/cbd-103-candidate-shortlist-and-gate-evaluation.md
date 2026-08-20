# CBD-103 — Hosting Candidate Shortlist and Gate Evaluation

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 20, 2026, resolving `OI-103-008` by authorizing the ten gate observations (§3.3). It selects no provider; CBD-108 does that. **No candidate reaches `ELIGIBLE` until the authorized observations are performed — §3 explains why that is a structural result rather than a finding about any provider.** |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-103](https://cobudget.atlassian.net/browse/CBD-103) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Runtime Topology Specification v1.0; Operational and Cost Assessment v1.0; Acceptance Criteria Traceability v1.0 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `5745587` |
| Last updated | August 20, 2026 |

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
| HG-102-002 correlation identifiers | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-103-001` |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-103-002` |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Screenshot explicitly insufficient. |
| HG-102-005 no standing credential | DOC | `PASS` | `UNPROVEN` | `UNPROVEN` | `EV-102-006` for C1. C2/C3 equivalents not retrieved — see §3.4. |
| HG-102-006 separable custody | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Also gated in practice by `OI-102-022`. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `EV-102-001` is Asserted for C2, which cannot produce a `PASS`. |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `EV-102-001` Asserted for C2. C1/C3 not retrieved. |
| HG-102-009 staff-access evidence | DOC | **`PASS`** | `UNPROVEN` | `UNPROVEN` | `EV-102-002`–`004` for C1; `EV-102-001` for C2; `EV-102-005` for C3. See §7.1. |
| HG-102-010 encryption in transit and at rest | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Expected straightforward; `OQ-103-003` |
| HG-102-011 region and subprocessors | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. All three publish lists; must be obtained **and dated**. `OQ-103-004` |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Request must be exercised. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Contractual class; not obtained. Silence fails, so this must be asked explicitly. |
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
| `PASS` | 2 | 0 | 0 |
| `PASS (design)` | 4 | 4 | 4 |
| `UNPROVEN` | 21 | 23 | 23 |
| `FAIL` | 0 | 0 | 0 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |

No candidate carries a `FAIL`, so no compensating control, exception, or
residual-risk record is required, and no `CONDITIONAL` verdict arises. Nothing
in §5 of the exception rules is engaged.

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
requires. All retrievals were performed on **August 18, 2026** by desk research;
none involved a provider account.

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

Six numbers are reserved rather than left as gaps, because the register is
append-only and a gap is indistinguishable from a deleted record:

| ID | Status |
| --- | --- |
| EV-102-007 | **Reserved** for the symmetric evidence pass required by §3.4 |
| EV-102-008 | **Reserved** for the symmetric evidence pass required by §3.4 |
| EV-102-009 | **Reserved** for the symmetric evidence pass required by §3.4 |
| EV-102-010 | **Reserved** for the symmetric evidence pass required by §3.4 |
| EV-102-011 | **Reserved** for the symmetric evidence pass required by §3.4 |
| EV-102-012 | **Reserved** for the symmetric evidence pass required by §3.4 |

Reserving them lets the completing pass record AWS and Azure counterparts to
`EV-102-001`–`006` adjacent to the records they answer, without renumbering
anything already cited.

## 10. Open questions carried forward

Per evidence register §7, these are carried to CBD-108 rather than closed. A
question that stops being asked becomes `Absent` evidence and scores `0`.

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-103-001 | Correlation-identifier lifetime and scope; does the provider default to a persistent end-user identifier? | `HG-102-002` | Retrieve observability documentation for all three |
| OQ-103-002 | Is there a shared identity graph across the provider's telemetry, support, and analytics surfaces? | `HG-102-003` | Inspect each provider's own data model |
| OQ-103-003 | At-rest and in-transit encryption with algorithm and key custody stated | `HG-102-010` | Retrieve; expected straightforward |
| OQ-103-004 | Region list and subprocessor list, **obtained and dated** | `HG-102-011` | Retrieve all three; a stale list does not satisfy the pass test |
| OQ-103-005 | Do the six screened-out candidates in §4.2 actually lack the primitives attributed to them? | Screening | Confirm from each published catalogue before the screen is relied on |
| OQ-103-006 | Does Azure provide customer-obtainable staff-access evidence for Service Bus and Key Vault by any route other than Customer Lockbox? | `HG-102-009` | Put directly to Microsoft |
| OQ-103-007 | Does Access Transparency require a paid support level? Vendor page and secondary source disagree. | `HG-102-009`, `CR0` | Resolve before pricing C1 |
| OQ-103-008 | Per-surface ceiling policies on all eleven `EP-92-*` entry points named in the pass test | `HG-102-021` | Retrieve gateway documentation for all three |
| OQ-103-009 | Two telemetry destinations with genuinely **distinct access roles** | `HG-102-026` | Retrieve for all three |
| OQ-103-010 | A dead-letter access boundary distinct from ordinary queue operation | `HG-102-027` | Retrieve for all three |
| OQ-103-011 | Contractual statement of provider backup retention, region, and expiry. Silence fails this gate. | `HG-102-013` | Must be asked explicitly; will not be found in public documentation |

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-103-008 | §3 established that no candidate could reach `ELIGIBLE` inside CBD-15's stated scope, because ten pass tests require a live-account observation the scope excluded. It was a scope question, not an exception question — `EX-102-003` cannot convert an `UNPROVEN`. | **Resolved August 20, 2026 by Product Owner decision** — route A, recorded in §3.3 and on the CBD-15 ticket. Observation evidence is now obtainable; the §6.3 verdicts stand until it is actually gathered. |
| OI-103-009 | The documentary evidence pass was not symmetric across candidates. | Harmless now, because all three hold the same verdict and no ranking is produced. Must be completed symmetrically before CBD-108 ranks anything. |
| OI-103-010 | The C3 Azure composition uses three primitives absent from the Customer Lockbox supported-services list, two of which have no listed first-party substitute. | Does not disqualify C3. It does mean C3's `HG-102-009` position is weaker than C1's on the evidence retrieved so far, and it should be settled with Microsoft rather than inferred. |
| OI-103-011 | This evaluation covers category **H** only. Cross-category coherence — that the selected set shares no contradictory identity, networking, secret, regional, retention, deletion, incident, or support assumption — is a CBD-108 acceptance criterion and is not addressed here. | CBD-108 must perform it. The X gates were evaluated against the hosting candidate; the same X gates apply independently to every other category's provider. |
| OI-103-012 | No part of this evaluation has been reviewed by anyone other than its author, and no provider was contacted. | It is a desk evaluation. The independent security review that CBD-92 §1 and the architecture baseline require before public launch remains outstanding and is not substituted for by anything here. |
