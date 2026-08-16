# CBD-102 — Provider Requirements and Hard-Gate Catalog

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Derived from approved CBD-72/CBD-91/CBD-92 material and the `docs/architecture.md` security baseline. Product Owner approval is required before CBD-103–107 may score a vendor against it. |
| Document version | 0.1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Pending Product Owner review |
| Jira | [CBD-102](https://cobudget.atlassian.net/browse/CBD-102) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Repository baseline | `2e372f6` |
| Last updated | August 16, 2026 |

## 1. Purpose and authority

This catalog is the pass/fail half of the CBD-15 provider decision method. It
assembles the hard gates a managed provider must satisfy into one register that
CBD-103 through CBD-107 measure a vendor against.

Every gate here is **derived**, not invented. Each one restates an already-approved
constraint from CBD-72, CBD-91, CBD-92, or the `docs/architecture.md` security
baseline in the form of a question a vendor can be measured against. Where the
approved material does not settle something, this catalog does not create a
gate — that material belongs in the weighted rubric for non-gating qualities,
which is a structurally separate document.

This catalog does not:

* select, recommend, or rank any provider;
* approve a deployment topology, retention schedule, or cost;
* set the rate, quota, or resource **values** that `RL-92-007` and `ME-94-010`
  assign to architecture and CBD-94;
* substitute for the independent security review that CBD-92 §1 and the
  architecture baseline both require before public launch;
* close any `EG-91-*` evidence gap or `RF-92-*` review finding.

## 2. Method

### 2.1 What makes something a gate

A hard gate is a binary provider property with an approved binding source. If a
vendor fails it, the vendor is not eligible for that category regardless of any
other score.

A candidate becomes a gate only when it cites one of four approved sources:

| Source class | Citation form | Authority |
| --- | --- | --- |
| CBD-91 data class or rule | `DI-91-NNN`, CBD-91 §4 rule N, CBD-91 §5.1 surface row | Approved Private MVP Data Inventory v1.0.1 |
| CBD-92 contract ID | `SA-92-*`, `CA-92-*`, `CL-92-*`, `PA-92-*`, `NT-92-*`, `EM-92-*`, `OP-92-*`, `AN-92-*`, `RL-92-*` | Product Owner-approved normative contracts, CBD-92 §2.4–2.12 |
| CBD-72 permission or invariant | `PM-72-NNN`, permission number, CBD-72 §5.x/§8/§9 | Product Owner-approved collaboration permission model |
| Architecture security baseline | `docs/architecture.md` § Security baseline | Approved technical direction |

**A candidate with no citation is a preference, and belongs in the weighted
rubric instead.** This rule is applied strictly below; several plausible
provider requirements were moved to the rubric for exactly this reason and are
listed in §9 so the omission is visible rather than silent.

### 2.2 Measurability

Every gate carries a **pass test**: the observation that decides it. A gate whose
pass test is "the vendor says so in marketing copy" is not measurable. Where the
only available evidence is a vendor assertion, the pass test says so explicitly
and the evidence register records the confidence and limitation, per CBD-92
§10.3 — *a provider name alone is not closure evidence*.

### 2.3 Satisfaction type

Each gate is marked with who must supply the property:

| Mark | Meaning |
| --- | --- |
| **Vendor** | Depends on a vendor capability. If the product does not have it, no amount of CoBudget configuration creates it, and the vendor fails. |
| **Config** | CoBudget can satisfy this by configuration or implementation on any provider that does not actively prevent it. The gate fails only where the provider forecloses it. |

This distinction is required by CBD-102's acceptance criteria and matters for
sequencing: **Vendor** gates decide eligibility during evaluation, while
**Config** gates become CoBudget implementation obligations that CBD-94
verification must later prove.

### 2.4 Compensating controls

A provider that fails a gate but offers a compensating control is **not** scored
as a pass. The evaluation records, as a distinct outcome:

1. the gate that failed and its cited source;
2. the compensating control offered, and whether it is a vendor capability or
   CoBudget-side work;
3. the **residual risk** that remains after the control, expressed against the
   affected `DI-91-*` class and its sensitivity tier;
4. the accountable approver, because accepting a residual against an approved
   contract is a Product Owner decision, not an evaluator's judgment.

`Fail + compensating control` is a third outcome alongside `Pass` and `Fail`. It
never aggregates into a score. This preserves the CBD-102 acceptance criterion
that scores cannot hide a failed hard gate.

### 2.5 Threshold status of the two custody gates

The CBD-102 ticket instructs that `HG-102-005` and `HG-102-006` — the
`OP-92-004` standing-access and `OP-92-006` separated-custody gates — carry a
pending threshold set by a CBD-94 solo-operator separation-of-duties
disposition. **That disposition does not exist**, and these gates are therefore
recorded firm.

What CBD-94 actually contains is three unconditional requirements:

* `SR-94-068` — exceptional access requires a *distinct* strongly authenticated
  requester and approver (cites `OP-92-003–005`);
* `SR-94-069` — "Data, key, approval, evidence, and return-to-service duties
  MUST remain organizationally and technically separated; one person MUST NOT
  combine customer data and keys or approve their own access" (cites
  `OP-92-004/006`);
* `SR-94-081` — recovery occurs in an isolated environment with separated
  data/key custody and independent review.

The genuinely open CBD-94 item is `ME-94-013` — *"Recovery architecture and
rehearsal: backup inventory, isolated environment, duty separation, RTO/RPO,
ledger reconciliation, authority non-resurrection, independent review."* That is
pending **evidence that the requirement is implemented**, not a pending
threshold for the requirement itself. Evidence pending does not soften a gate.

Two consequences follow, and both are recorded rather than resolved here:

* CBD-102 has **no dependency on CBD-94**. The ticket's dependency note can be
  corrected.
* `SR-94-069`'s *organizationally* separated duties are in genuine tension with
  a single-operator project. Nothing in CBD-91, CBD-92, CBD-93, or CBD-94
  records or resolves that tension. It is carried as `OI-102-001` in §10 and
  needs a Product Owner disposition — but it is an unrecorded gap in CBD-94, not
  something this catalog can settle by weakening a gate.

### 2.6 Identifier stability

`HG-102-*` numbers are stable citation keys. They are never reused, renumbered,
or made semantically dependent on display order or category. A gate that later
moves category keeps its number. Numbering is flat across the whole catalog for
this reason, with category carried in a column, following the CBD-92 `TH-92-*`
convention.

## 3. Category map

| Category | Consuming subtask | Scope |
| --- | --- | --- |
| **X** — Cross-category | All | Applies to every provider in every category |
| **H** — Hosting, runtime, jobs, telemetry | CBD-103 | Compute, gateway/edge, queue/scheduler, observability, secret storage |
| **I** — Identity | CBD-104 | Managed IdP, factors, sessions, assurance |
| **D** — Managed PostgreSQL | CBD-105 | Primary datastore, replicas, backup, restore |
| **E** — Transactional email | CBD-106 | Invitation, lifecycle/security, and routine product email |
| **F** — Financial-data connectivity | CBD-107 | Provider consent, accounts, transactions, webhooks |

Push and SMS are bounded by `NT-92-*` and appear in this catalog only through
the cross-category gates and `HG-102-047`. CBD-102's scope names five provider
categories; a dedicated push/SMS category is not one of them, and `EG-91-006`
still owns that selection. §10 records this as `OI-102-004`.

## 4. Cross-category gates

These apply to **every** provider under evaluation. A vendor failing one of
these fails in every category it is proposed for.

| ID | Cat | Hard gate | Pass test | Source | Type |
| --- | --- | --- | --- | --- | --- |
| HG-102-001 | X | Provider telemetry can be constrained to the `AN-92-003` S1 allowlist: service/component and deployed version, coarse operation class, safe outcome/error class, duration/capacity bucket, aggregate health count. It must carry no subject, space, resource, account, connection, destination, device/network, financial, free-text, membership/role, lifecycle, hidden-scope, or security-decision label. | Field-level schema control is demonstrated on a live account, with a captured payload showing no customer-derived field. A provider that emits a fixed enriched schema containing user or request identity, and cannot suppress those fields, fails. | `AN-92-003`; `DI-91-041` | Vendor |
| HG-102-002 | X | Short-lived request correlation identifiers cannot be reused as a stable identity across sessions or purposes. | Correlation identifier lifetime and scope are documented; the provider does not require or default to a persistent end-user identifier for correlation. | `AN-92-003`; `AN-92-006` | Vendor |
| HG-102-003 | X | Reliability, security, support, audit, and aggregate-measurement data remain in distinct schemas, stores, access roles, and retention policies. An identifier or event collected for one purpose cannot be joined, enriched, exported, sold, shared, or reused for another. | The provider's own data model is inspected for a shared identity graph across its telemetry, support, and analytics surfaces. A platform whose unified observability product co-mingles reliability, security, and behavioural data under one access role and one retention policy fails. | `AN-92-006`; `DI-91-038`; `DI-91-041`; `DI-91-062` | Vendor |
| HG-102-004 | X | Any product analytics, session replay, heatmap, keystroke or form capture, DOM or screenshot recording, cross-site tracker, advertising identifier, or third-party behavioural pixel injected by the platform can be disabled **provably** — not merely by an unverified setting. | Disablement is verified by observed absence in network traffic and stored data, not by a configuration screenshot. A platform that injects any of these by default and offers no verifiable off-switch fails. Consent banners and pseudonymization do not satisfy this gate. | `AN-92-001`; `AN-92-002` | Vendor |
| HG-102-005 | X | The provider does not require a durable human-held production credential for ordinary operation. Operator access can be made just-in-time, least-privilege, time-bound, and non-renewing by default, and standing production access is unavailable. | The access model supports expiry and revocation conditions bound to a named change or incident record. A platform whose only administrative path is a permanent console login held by a named person fails. **Firm — see §2.5.** | `OP-92-004`; `SR-94-068` | Vendor |
| HG-102-006 | X | Backup data access, key recovery, restore execution, and approval are separable so that no single operator can combine customer data and keys, or return a restore to service unilaterally. | Distinct permissions exist for backup read, key use/recovery, restore execution, and restore approval, and can be held by different principals. A provider where one role implies all four fails. **Firm — see §2.5.** | `OP-92-006`; `SR-94-069`; `SR-94-081` | Vendor |
| HG-102-007 | X | Vendor personnel have no routine path to CoBudget customer content. Employment, ticket assignment, platform administration, or a customer support request does not create customer-data authority for vendor staff. | The vendor's documented support and operations model is examined for a default staff read path to stored customer data, logs containing it, or database contents. A support model granting vendor personnel ordinary customer-data access fails. | `OP-92-001`; `DI-91-043` | Vendor |
| HG-102-008 | X | The provider's operational model contains no general customer impersonation, no password or factor bypass, and no unrestricted database or log browsing for vendor staff. | Vendor break-glass documentation is reviewed for an impersonation or unrestricted-query capability. Where such a capability exists, the gate fails unless it is technically constrained to a mediated, audited, non-impersonating path. | `OP-92-005` | Vendor |
| HG-102-009 | X | Vendor-side access to CoBudget data produces durable, attributable evidence — actor, time, approved scope, actions, and result — obtainable by CoBudget, without copying customer payloads into the evidence record. | An access-log or audit export covering vendor personnel actions is available to the customer. A provider that logs only CoBudget's own API calls and not its own staff's access fails. | `OP-92-007` | Vendor |
| HG-102-010 | X | Data is encrypted in transit, and at rest where the provider persists it. | Transport and at-rest encryption are documented and verifiable, with the algorithm and key custody stated. | Architecture § Security baseline | Vendor |
| HG-102-011 | X | The provider supports explicit region selection, and discloses the regions and subprocessors that will hold or process CoBudget data. | A written region and subprocessor list is obtained and dated. A provider that will not commit to a processing region, or will not enumerate subprocessors, fails. | `DI-91-044`; `DI-91-072`; CBD-91 §5.1 provider row | Vendor |
| HG-102-012 | X | The provider offers a documented deletion or suppression request path with a verifiable response, so that a CBD-91 lifecycle event can be propagated and evidenced. | A deletion request is exercised and its request/response, effective date, and any unsupported-copy limitation are captured. A provider that cannot evidence deletion fails, because CoBudget cannot then make a completion claim. | CBD-91 §5.1 provider row; `DI-91-045`; Architecture § Security baseline | Vendor |
| HG-102-013 | X | Provider-controlled backup behaviour is stated contractually and cannot be assumed from CoBudget's own backup policy. | A contract or written evidence states the provider's backup retention, region, and expiry for CoBudget data. Silence fails. | CBD-91 §5.1 provider row | Vendor |
| HG-102-014 | X | S4 credential and bearer material never enters the provider's ordinary data, log, telemetry, support, or analytics surfaces. | The integration is designed and reviewed so no `DI-91-002/003/006/010/051/064/072` value reaches the provider outside a purpose-built secret boundary. | CBD-91 §2.1; `DI-91-051`; Architecture § Security baseline | Config |
| HG-102-015 | X | Where the provider stores any audit or evidence record CoBudget relies on, that record is append-only and its omission, reordering, overwrite, or selective deletion is detectable. | Immutability or retention-lock is demonstrated. A provider offering only a mutable, operator-deletable log for evidence CoBudget depends on fails. | Architecture § Security baseline; `DI-91-037`; `DI-91-038`; CBD-72 §9 | Vendor |

## 5. Hosting, runtime, jobs, and telemetry (CBD-103)

| ID | Cat | Hard gate | Pass test | Source | Type |
| --- | --- | --- | --- | --- | --- |
| HG-102-016 | H | A background job can carry structured authority context on the job itself: authority mode, named `SA-92-*` purpose or user-delegated subject/recipient binding, service-policy version, tenant/resource identity, authorization version, and idempotency key. | A job payload and its metadata are inspected for arbitrary structured fields that survive enqueue, retry, and dead-letter. A runtime that cannot carry that context on a job fails. | `SA-92-001`–`SA-92-008`; `DI-91-039`; `EP-92-007`; `TB-92-008`; `TB-92-009` | Vendor |
| HG-102-017 | H | Missing, ambiguous, unlisted, or stale job authority fails closed rather than executing with a default. | The consumer contract permits rejecting a job on schema or authority validation without the platform silently retrying it into success or dropping it unlogged. | `SA-92-*` preamble, CBD-92 §2.4; CBD-91 §4 rule 9 | Config |
| HG-102-018 | H | Queue, scheduler, retry, dead-letter, synchronization, and delivery paths support maximum attempt counts, backoff, per-tenant and per-connection concurrency caps, and a terminal state. | Each control is configured on a live account. A queue or delivery service without a maximum attempt count, backoff, dead-letter handling, or terminal state fails. Note the per-tenant and per-connection **concurrency caps**, which the CBD-102 ticket's paraphrase of `RL-92-006` omits. | `RL-92-006`; `EP-92-007` | Vendor |
| HG-102-019 | H | No background path retries indefinitely, and shedding under pressure preserves ordered progress and lifecycle obligations rather than silently dropping them. Provider quota exhaustion is a bounded, observable failure, not an unlogged stall. | Exhaustion behaviour is observed under test: the failure surfaces as a terminal, logged state. | `RL-92-006` | Vendor |
| HG-102-020 | H | The edge or gateway can emit throttled and unthrottled responses that are uniform in status, body, error class, header set, `Retry-After` value, and observable timing. | Responses are captured for existing, non-existent, ineligible, and unauthorized subjects and compared field by field. A gateway that emits state-varying quota or remaining-attempt headers and cannot suppress them fails. | `RL-92-003`; `TB-92-002`; CBD-72 `XSP-02` | Vendor |
| HG-102-021 | H | Ceilings can be applied per surface rather than as one global limit, covering each `RL-92-001` bounded surface. | Independent policies can be attached to the distinct entry points `EP-92-001`, `EP-92-002`, `EP-92-004`, `EP-92-005`, `EP-92-006`, `EP-92-008`, `EP-92-009`, `EP-92-010`, `EP-92-011`, `EP-92-014`, and `EP-92-015`. A platform offering only one account-wide limit fails. | `RL-92-001`; `RL-92-002` | Vendor |
| HG-102-022 | H | Rate-limit counting can bind to caller-controlled and infrastructure-derived keys, so an unauthenticated attempt is not counted against a claimed account identifier. | A limiter policy is configured with a non-subject key on a pre-authentication surface. A platform that only supports keying on an asserted user identity fails, because throttling behaviour would then reveal that identifier's existence. | `RL-92-004` | Vendor |
| HG-102-023 | H | Reaching a ceiling denies the action without letting an attacker lock a legitimate subject out of their own account, invitation, provider connection, export, or lifecycle workflow. | The limiter supports an independent recovery path for the legitimate subject where a subject-bound limit is unavoidable. | `RL-92-005` | Config |
| HG-102-024 | H | A dedicated secret manager, KMS, or HSM is available, with non-exportable keys where supported, workload identity, and least privilege, separated from ordinary application records and metadata. | Key non-exportability and workload-identity authentication are demonstrated. A platform whose only secret mechanism is a plaintext environment variable visible in a console or build log fails. | `DI-91-051`; `DI-91-072`; `EP-92-015`; `TB-92-017` | Vendor |
| HG-102-025 | H | The edge can verify a provider webhook signature and reject replay before the payload reaches a durable queue, and can discard raw signature and bearer material at that boundary. | Signature verification and timestamp/replay rejection are performed at the edge, with raw signature material absent from the durable record. | `DI-91-012`; `EP-92-006`; Architecture § Security baseline | Config |
| HG-102-026 | H | Restricted diagnostic capture is a separate boundary from ordinary telemetry, with stronger access control, deliberate rather than continuous capture, redaction, and case linkage. | Two distinct destinations with distinct access roles are configurable. A platform offering one log stream with one access role for both fails, since `DI-91-062` evidence and `DI-91-041` S1 telemetry cannot share a boundary. | `DI-91-062`; `DI-91-041`; `AN-92-006` | Vendor |
| HG-102-027 | H | Dead-letter and failed-job state is reachable only through a restricted path, not by ordinary operator browsing, and replay can be made to require current authorization. | The failure store has an access boundary distinct from ordinary queue operation. | `DI-91-061`; `OP-92-001` | Vendor |

## 6. Identity (CBD-104)

| ID | Cat | Hard gate | Pass test | Source | Type |
| --- | --- | --- | --- | --- | --- |
| HG-102-028 | I | The IdP retains the credential boundary entirely: CoBudget stores no password, passkey private key, MFA seed or code, or recovery secret at any point in the flow. | The integration is traced end to end for any factor material transiting or resting in CoBudget. A provider whose integration model requires CoBudget to receive a password or seed fails. | `DI-91-002`; `TB-92-003` | Vendor |
| HG-102-029 | I | MFA and passkeys are supported as first-class factors. | Both are available on the evaluated plan and can be enforced by policy. | Architecture § Security baseline; `EG-91-004` safe interim position | Vendor |
| HG-102-030 | I | Step-up reauthentication is supported and its result can be bound to a specific subject, action, and budget space, at a stated assurance level, with a short validity window. | A protected-action reauthentication is performed and the resulting assertion is inspected for action binding and expiry. An IdP offering only session-level authentication with no action-bound step-up fails, because CBD-72 permissions 20a, 20b, 27, 29, 34, and 35 each require fresh reauthentication. | `DI-91-052`; CBD-72 permissions 20a/20b/27/29/34/35; CBD-72 §6.1; `EP-92-004` | Vendor |
| HG-102-031 | I | Sessions can be revoked promptly and individually — on logout, recovery, account lock, or a security event — and revocation state is checkable by the application. | Individual session revocation is exercised and observed to take effect on the next protected call. | `DI-91-003`; `TB-92-003`; CBD-72 `PM-72-003` | Vendor |
| HG-102-032 | I | Registration, authentication, and recovery surfaces are resistant to account enumeration, returning uniform responses that do not distinguish an existing from a non-existent account. | Responses and observable timing are compared across existing and non-existent identifiers on IdP-hosted screens. A hosted flow that reveals account existence and cannot be configured otherwise fails. | `EP-92-001`; `RL-92-003`; `RL-92-004` | Vendor |
| HG-102-033 | I | Device, network, and risk context, detection signals, and authentication evidence remain restricted single-purpose security evidence and are not exposed as, or exported into, a product analytics dataset. | The provider's data flows are checked for an analytics or behavioural product fed by authentication evidence. An IdP that routes sign-in telemetry into a marketing or product-analytics surface by default, without a verifiable off-switch, fails. | `AN-92-004`; `DI-91-053`; `AN-92-006` | Vendor |
| HG-102-034 | I | SMS one-time codes are not the only available second factor, and a phone number collected for notification purposes is never reused as an authentication factor or identity key. | Factor options are inspected; a phone-number-as-identity model fails. | `DI-91-029`; `NT-92-001`; `NT-92-002` | Vendor |
| HG-102-035 | I | An identity can be deleted at the provider, and the provider's retention of identity and authentication records is disclosed. | A deletion is exercised and the response, effective date, and residual retention are captured. | `DI-91-002`; CBD-91 §5.1 provider row; `PA-92-006` | Vendor |
| HG-102-036 | I | The IdP does not require or default to a durable human-held administrative credential for production identity configuration. | Administrative access supports just-in-time, expiring grants. This is `HG-102-005` applied to the identity console, recorded separately because the identity console is a distinct privilege boundary. | `OP-92-004`; `EP-92-015` | Vendor |
| HG-102-037 | I | Authentication assurance results carry a short, action-bound validity window rather than an indefinite one, and cannot be replayed after expiry. | Assertion lifetime and replay protection are verified. | `DI-91-052`; `TB-92-003` | Vendor |

## 7. Managed PostgreSQL (CBD-105)

| ID | Cat | Hard gate | Pass test | Source | Type |
| --- | --- | --- | --- | --- | --- |
| HG-102-038 | D | The service is genuine PostgreSQL with full transactional semantics, sufficient to write a domain record and its outbox entry in one transaction. | A transactional outbox write is exercised. A wire-compatible engine that weakens transactional guarantees fails, because `DI-91-039` and the architecture synchronization flow both depend on the outbox committing atomically with the domain change. | `DI-91-039`; Architecture § Synchronization flow | Vendor |
| HG-102-039 | D | Encryption at rest uses keys whose custody can be separated from the operators holding backup-data access. | Key custody is documented and shown to be separable from backup read access. A provider where a single console role reaches both data and keys fails `HG-102-006` in this category. | `OP-92-006`; `DI-91-051`; `DI-91-072`; Architecture § Security baseline | Vendor |
| HG-102-040 | D | Backups are encrypted, and their restoration is testable by CoBudget rather than asserted by the vendor. | A restore is performed and verified in the evaluation. An untested restore path fails, because the architecture baseline requires tested backup restoration. | Architecture § Security baseline; `DI-91-044` | Vendor |
| HG-102-041 | D | A backup can be restored into an isolated environment separate from production, rather than only in place. | An isolated restore target is created. A provider supporting only in-place restore fails, because `OP-92-006` and `SR-94-081` require restoration in an isolated boundary that reconciles current deletion and authorization state before release. | `OP-92-006`; `SR-94-081`; `TB-92-015` | Vendor |
| HG-102-042 | D | Point-in-time recovery is available, and backup retention and expiry are stated so that purge completion can be evidenced rather than assumed. | Retention windows, immutability period, and expiry behaviour are obtained in writing and dated. | `DI-91-044`; `DI-91-045`; CBD-91 §5.1 provider row | Vendor |
| HG-102-043 | D | Vendor personnel cannot browse database contents as an ordinary support action. | The vendor's support model is examined for a staff query path into customer databases. Where one exists, the gate fails unless technically constrained to a mediated, audited, approved path. | `OP-92-001`; `OP-92-005`; `TB-92-006` | Vendor |
| HG-102-044 | D | Replica and region placement is controllable, so that a replica does not silently place S3 data outside the approved region. | Replica regions are explicitly configurable and enumerable. | `DI-91-044`; `DI-91-072` | Vendor |
| HG-102-045 | D | Row-level access decisions are not delegated to the database's own end-user identity model in place of application authorization. | The design is reviewed to confirm authorization remains a server-side application decision bound to the CBD-72 §8 inputs. A provider pattern that pushes tenant isolation into client-issued database credentials fails `PM-72-002`, which requires server-side evaluation at open and mutation time. | CBD-72 `PM-72-001`; `PM-72-002`; `PM-72-010`; CBD-72 §8; `TB-92-006` | Config |
| HG-102-046 | D | Database and query telemetry emitted to the provider's own observability surface can be constrained to exclude statement text and parameter values carrying S3 customer data. | Captured slow-query or statement logs are inspected for financial values, free text, and identifiers. A service that always ships full statement text with bound parameters to a shared vendor console fails. | `AN-92-003`; `DI-91-041`; CBD-91 §4 rule 5 | Vendor |

## 8. Transactional email (CBD-106)

| ID | Cat | Hard gate | Pass test | Source | Type |
| --- | --- | --- | --- | --- | --- |
| HG-102-047 | E | Message content is fully controlled by CoBudget, so the three `EM-92-*` purpose tiers can be enforced exactly: routine email content-free, invitation email identifying only the action class, and lifecycle/security email adding only action class, action-required flag, and deadline. | Templates are authored with exact content control and no vendor-injected body, footer, or subject decoration beyond legally required unsubscribe handling. A provider that appends promotional or branded content to message bodies fails. | `EM-92-001`; `EM-92-002`; `EM-92-003` | Vendor |
| HG-102-048 | E | Open tracking, click tracking, and link rewriting can be fully disabled, and no tracking pixel or remote customer-specific image is inserted. | A delivered message is inspected end to end: no rewritten URL, no pixel, no decoration beyond CoBudget's own opaque locator. A provider that rewrites links for analytics and cannot disable it fails — link rewriting also breaks `EM-92-004`, under which a locator must locate without carrying customer data in the URL or referrer. | `EM-92-007`; `EM-92-004` | Vendor |
| HG-102-049 | E | The provider payload can be limited to destination, approved purpose-tier template identifier, permitted action-class and deadline fields, opaque attempt/template/workflow identifiers, channel controls, and minimum delivery metadata. | The send API is exercised with a minimal payload. A provider requiring a descriptive campaign, tag, category, or analytics label that would encode event or resource context fails. | `EM-92-005` | Vendor |
| HG-102-050 | E | Delivery, bounce, and complaint callbacks are authenticatable and replay/idempotency protected, and carry no rendered message content. | Callback authentication and replay protection are verified, and a captured callback contains no body content. | `EM-92-006`; `DI-91-059`; `EP-92-010` | Vendor |
| HG-102-051 | E | Suppression state can be read, set, and deleted programmatically, so that revocation, opt-out, and lifecycle events suppress stale work. | Suppression entries are created and removed via API. | `EM-92-006`; `DI-91-059`; `NT-92-005` | Vendor |
| HG-102-052 | E | Retention of rendered message bodies at the provider is bounded and disclosed, and body retention can be minimized or disabled. | The provider's body-retention period is obtained in writing. A provider retaining full rendered bodies indefinitely, with no reduction option, fails — `DI-91-049` governs the delivered copy by its highest permitted content sensitivity, and CoBudget cannot promise a custody boundary it cannot describe. | `DI-91-049`; `EM-92-007`; CBD-91 §5.1 provider row | Vendor |
| HG-102-053 | E | Recipient destinations held by the provider can be deleted on request, and the provider's retention of destination data is disclosed. | A destination deletion is exercised and evidenced. Every destination is personal data under `DI-91-029`. | `DI-91-029`; `DI-91-059`; CBD-91 §5.1 provider row | Vendor |
| HG-102-054 | E | The provider does not require a shared or vendor-branded sending domain that would leak product or event context in the envelope. | Custom domain authentication (SPF/DKIM/DMARC) is available and the envelope carries no event-descriptive routing. | `EM-92-001`; `EM-92-005` | Vendor |
| HG-102-055 | E | Provider-side template preview, testing, or debugging surfaces do not retain customer-specific rendered content beyond the disclosed retention boundary. | Preview and event-inspection surfaces are checked for stored per-recipient rendered content. | `EM-92-007`; `DI-91-049`; `OP-92-001` | Vendor |

## 9. Financial-data connectivity (CBD-107)

| ID | Cat | Hard gate | Pass test | Source | Type |
| --- | --- | --- | --- | --- | --- |
| HG-102-056 | F | The provider hosts the institution authentication ceremony, so CoBudget never collects or stores online-banking credentials. | The consent flow is traced: credentials are entered only in a provider-hosted or provider-controlled context. A provider whose integration requires CoBudget to collect bank credentials fails outright — this is the single hardest gate in the catalog and both the architecture baseline and `DI-91-010` state it unconditionally. | Architecture § Security baseline; `DI-91-010`; `DF-91-004`; `TB-92-010` | Vendor |
| HG-102-057 | F | Each connection has exactly one authorizer, with its own consent, secret, cursor, revocation state, observations, and provenance, and no connection inherits another's authority. | The provider's model is checked for per-authorization independence. A model that merges multiple end-user authorizations for one institution into a single item any party can manage or revoke fails `PM-72-011` and `CA-92-002`. | CBD-72 `PM-72-011`; CBD-72 permission 31; `CA-92-002`; `CA-92-012` | Vendor |
| HG-102-058 | F | Access tokens are issued in a form CoBudget can hold under field-level encryption, separated from ordinary application data. | Token handling is designed so the value rests only in the encrypted secret boundary. A provider SDK that mandates its own plaintext local token store fails. | Architecture § Security baseline; `DI-91-010`; `CA-92-001` | Vendor |
| HG-102-059 | F | Webhooks are signed, and signature verification plus timestamp/replay rejection are possible before the payload becomes durable. | A forged and a replayed webhook are both rejected in test. | Architecture § Security baseline; `DI-91-012`; `EP-92-006` | Vendor |
| HG-102-060 | F | Incremental synchronization is cursor-based, and the cursor is connection-scoped rather than account- or institution-global. | Cursor semantics are documented and observed to be per connection. Cross-connection cursor sharing fails `DI-91-055`, which binds the cursor to the exact connection. | `DI-91-055`; `CA-92-002`; Architecture § Synchronization flow | Vendor |
| HG-102-061 | F | Provider-supplied transaction fields are retrievable as immutable source observations with stable provenance, so a normalized presentation can retain reversible edges to every contributing connection. | The provider exposes stable per-observation identifiers. A provider that silently mutates or re-keys history without a change signal fails `PM-72-009` and `CA-92-003`. | CBD-72 `PM-72-009`; `CA-92-003`; `DI-91-068` | Vendor |
| HG-102-062 | F | A stable provider account identifier is available for canonicalization, so that weak signals — names, balances, timing, or membership — are never required to merge records. | Identifier stability across sync cycles and reauthentication is documented. Where the provider offers only weak identifiers, the gate fails, since `CA-92-003` forbids merging on them. | `CA-92-003`; `EG-91-012` interim position | Vendor |
| HG-102-063 | F | Disconnection revokes or destroys the provider authorization for that connection only, without terminating or transferring another independently authorized connection. | A disconnect is exercised on one of two connections and the other is observed to continue. | CBD-72 permission 32; `CA-92-007`; `DI-91-010` | Vendor |
| HG-102-064 | F | A connection can reach a permanent terminal state that no other party can adopt or reauthorize. | The provider supports irreversible termination of a single authorization. This is required by the `CA-92-013` orphaned-connection rule, under which a connection whose authorizer is permanently gone can never resume. | `CA-92-013`; CBD-72 `OD-72-04`; `DI-91-011` | Vendor |
| HG-102-065 | F | The provider's own retention and deletion behaviour for consent, account, transaction, and connection records is disclosed, and a deletion request path exists. | Written, dated retention and deletion evidence is obtained and a deletion exercised. | `EG-91-005` interim position; CBD-91 §5.1 provider row; `DI-91-011` | Vendor |
| HG-102-066 | F | Provider error and failure detail can be kept out of budget-space-visible surfaces, so that only the `DI-91-056` allowlisted health status reaches members. | The integration can map provider failure codes to the safe derived status without leaking institution configuration, cursor internals, or the authorizer's personal circumstance. | `DI-91-056`; CBD-72 permission 33; `CR-91-011` | Config |
| HG-102-067 | F | Raw incremental-sync payloads can be confined to a service-only processing boundary and deleted after durable source observations exist. | Payload handling is designed for minimum retention. `DI-91-057` prohibits this class from reaching any customer role, ordinary support, logs, analytics, or exports. | `DI-91-057`; `TB-92-011` | Config |

## 10. Candidates deliberately not made gates

Under §2.1, a candidate with no approved citation is a preference and belongs in
the weighted rubric. These were considered and moved, and are listed so the
omission is visible:

| Candidate | Why it is not a gate | Where it goes |
| --- | --- | --- |
| Uptime SLA percentage | No approved input sets an availability threshold. CBD-92 records denial-of-service threats but assigns no SLO. | Rubric — reliability |
| Support responsiveness and plan tier | No approved source sets a support threshold. `OP-92-*` constrains what support may *access*, not how fast it answers. | Rubric — support |
| Accessibility conformance level | Required to be represented by CBD-102's acceptance criteria, but no approved source makes a specific conformance level binding on a *provider*. `SR-94-109` binds CoBudget's own copy, not a vendor's console. | Rubric — accessibility |
| Data export and portability format | `HG-102-012` gates deletion because CBD-91 §5.1 requires it. Portability of CoBudget's own data out of a vendor is an exit-cost question with no approved threshold. | Rubric — portability |
| Solo-operator ongoing operational burden | Required to be represented and scored on ongoing burden rather than setup, but no approved source makes any burden level binding. | Rubric — solo-operator effort |
| Stronger authentication for "access" generally | `docs/architecture.md` requires this, but `CR-91-010` classifies the wording as an unresolved ambiguity rather than an approved decision, pending `EG-91-004/007`. Only the action-bound assurance in `HG-102-030` is gated. | Rubric — security, pending `EG-91-004` |
| Named provider suitability (e.g. Plaid) | `CR-91-006` fixes that provider names in `docs/architecture.md` are hypotheses until CBD-15 selects. A name is not a gate. | Neither; evaluation input only |

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-102-001 | `SR-94-069` requires organizationally separated duties, which is in genuine tension with a single-operator project. No CBD-9x document records or resolves this. `HG-102-005/006` are recorded firm on the approved text. | Needs a Product Owner disposition. Does not block this catalog; will determine whether any realistic provider can pass `HG-102-006` without a compensating control under §2.4. |
| OI-102-002 | The CBD-102 ticket states CBD-94 sets a pending threshold for the custody gates via a solo-operator disposition that does not exist, and its `RL-92-006` paraphrase omits per-tenant and per-connection concurrency caps. | Ticket text should be corrected. No effect on this catalog, which follows the approved documents. |
| OI-102-003 | Rate, quota, and resource **values** remain unselected under `RL-92-007` and `ME-94-010`. The gates here test provider *capability* to enforce a ceiling, not the ceiling itself. | Capability gates are decidable now; values remain a CBD-94/architecture obligation before any `RL-92-001` surface is released. |
| OI-102-004 | Push and SMS have an approved `NT-92-*` content ceiling but no CBD-102 provider category and no CBD-10x subtask in scope. `EG-91-006` still owns that selection. | A push/SMS provider cannot be evaluated against this catalog as written. Needs a scope decision on the CBD-15 track. |
| OI-102-005 | `HG-102-004`, `HG-102-007`, `HG-102-008`, and `HG-102-043` may only be answerable from vendor assertion rather than observation for some providers. | The evidence register must record confidence and limitation per §2.2; an assertion-only pass is a weaker result than an observed one and must be visible as such. |

## 12. Traceability

| Approved source | Gates derived |
| --- | --- |
| `AN-92-001/002` | HG-102-004 |
| `AN-92-003` | HG-102-001, 002, 046 |
| `AN-92-004` | HG-102-033 |
| `AN-92-006` | HG-102-002, 003, 026, 033 |
| `OP-92-001` | HG-102-007, 027, 043, 055 |
| `OP-92-004` | HG-102-005, 036 |
| `OP-92-005` | HG-102-008, 043 |
| `OP-92-006` | HG-102-006, 039, 041 |
| `OP-92-007` | HG-102-009 |
| `RL-92-001/002` | HG-102-021 |
| `RL-92-003` | HG-102-020, 032 |
| `RL-92-004` | HG-102-022, 032 |
| `RL-92-005` | HG-102-023 |
| `RL-92-006` | HG-102-018, 019 |
| `SA-92-001`–`008` | HG-102-016, 017 |
| `CA-92-001`–`013` | HG-102-057, 058, 060, 061, 062, 063, 064 |
| `EM-92-001`–`007` | HG-102-047, 048, 049, 050, 051, 052, 054, 055 |
| `NT-92-001/002/005` | HG-102-034, 051 |
| `PA-92-006` | HG-102-035 |
| CBD-72 `PM-72-001/002/003/009/010/011` | HG-102-031, 045, 057, 061 |
| CBD-72 permissions 20a/20b/27/29/31/32/33/34/35 | HG-102-030, 057, 063, 066 |
| CBD-72 §8, §9, `XSP-02` | HG-102-015, 020, 045 |
| CBD-91 §2.1 tiers, §4 rules, §5.1 surfaces | HG-102-011, 012, 013, 014, 035, 046, 052, 053, 065 |
| `DI-91-*` classes | HG-102-001, 003, 009–012, 014, 024–031, 033, 035, 037–044, 046, 049–053, 055–067 |
| Architecture § Security baseline | HG-102-010, 012, 015, 029, 038, 039, 040, 056, 058, 059 |
| Architecture § Synchronization flow | HG-102-038, 060 |

Every gate in §4–§9 appears at least once above. A gate that cannot be placed in
this table has no approved source and must be moved to the rubric under §2.1.
