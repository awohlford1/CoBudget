# CBD-108 — Cross-Category Coherence Review

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Performs the review `OI-103-011` assigns to CBD-108 and that no category evaluation could perform: whether a combined provider set would share contradictory identity, networking, secret, regional, retention, deletion, or incident assumptions. **It clears nothing**, because §2 establishes that the gates which would clear it are largely `UNPROVEN`. It maps the constraint structure, names the specific combinations that would be incoherent, and records what must be observed to convert the map into a clearance. |
| Document version | 0.46 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.46; Combined Cost Model v0.46; Carried Item Disposition Register v0.46; Acceptance Criteria Traceability v0.46; Evidence Retrieval Pass v0.46 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `b969ecb` |
| Last updated | August 29, 2026 |

## 1. What this review is for

CBD-108's third acceptance criterion: *"The topology has no contradictory
identity, networking, secret, regional, retention, deletion, or incident
assumptions."*

`OI-103-011` records why no evaluation could satisfy it. Each evaluated the
**X** gates against its own category's candidates, and *"the same X gates apply
independently to every other category's provider."* Four sibling packages record
the identical limitation — `OI-104-*`, `OI-105-010`, `OI-106-011`, and the
category F and N equivalents. Coherence is the one CBD-108 deliverable that
**no other ticket owns and no amount of further category work produces.**

It is also the deliverable least affected by the evidence gap that blocks
selection, which is why it is worth doing now rather than after the observation
pass.

## 2. Coherence can be mapped, but not cleared

The **X** gates are the mechanism by which coherence would be verified. There
are fifteen, and they carve up almost exactly the seven dimensions the
acceptance criterion names.

| Dimension | Bearing X gates |
| --- | --- |
| **Identity** | `HG-102-002` correlation-identifier reuse; `HG-102-003` schema and role separation; `HG-102-004` trackers and analytics capture |
| **Networking** | No X gate. Catalog §11 moved network isolation to rubric `WR-102-005` — `OI-103-006` records that private networking is a preference, not a derived requirement |
| **Secret** | `HG-102-014` S4 credential material; `HG-102-005` durable human-held production credentials |
| **Regional** | `HG-102-011` region selection and subprocessor disclosure |
| **Retention** | `HG-102-003` distinct retention; `HG-102-013` contractual backup behaviour |
| **Deletion** | `HG-102-012` deletion or suppression path with verifiable response |
| **Incident** | `HG-102-009` durable attributable evidence; `HG-102-015` append-only audit records; `HG-102-007` and `HG-102-008` vendor personnel access and impersonation |

**The state of those gates is what prevents a clearance.** `OI-107-009` records
that *every* cross-category X gate is `UNPROVEN` for every category F candidate
with no inherited passes. `OI-130-012` records the same for category N, with
one exception — C2's `HG-102-010`. The cross-category documentary pass of
August 21–22, 2026 moved a block of X-gate outcomes for the three hyperscalers,
which is why the four hyperscaler-bearing categories sit in a better position
than financial connectivity and push/SMS. It moved nothing for the aggregators,
because no category F candidate is a hyperscaler.

**A coherence clearance would require the X gates to be settled across the
selected set. They are not.** What follows is therefore a constraint map and a
risk register, not a sign-off. §9 states precisely what would convert it.

## 3. The constraint chain — hosting decides most of the set

The single most useful structural fact in the CBD-15 corpus is that the
candidate identities are **shared across categories**: `C1` is Google Cloud,
`C2` is AWS and `C3` is Microsoft Azure in every category they appear in, as
CBD-104 §4.4, CBD-105 §4.3 and CBD-106 §4.4 each restate. That makes the
following table derivable rather than speculative.

| Category | C1 Google | C2 AWS | C3 Azure | Standalone candidates |
| --- | --- | --- | --- | --- |
| **H** Hosting | ✅ | ✅ | ✅ | — |
| **I** Identity | ❌ | ✅ Cognito | ✅ Entra External ID | C4 Auth0 |
| **D** PostgreSQL | ✅ Cloud SQL | ✅ RDS | ✅ Flexible Server | — |
| **E** Email | ❌ | ✅ SES | ✅ ACS Email | C5 Postmark |
| **N** SMS | ❌ | ✅ End User Messaging | ✅ ACS SMS | C10 Twilio (`INELIGIBLE`) |
| **F** Financial connectivity | ❌ | ❌ | ❌ | C6, C7, C8, C9 only |

Three consequences follow directly.

**A single-ecosystem set is available for C2 and C3, and not for C1.** AWS and
Azure each carry an evaluated candidate in all five of the categories outside
financial connectivity. Google Cloud carries one in two of the five.

**A C1 hosting selection forces standalone vendors in three categories at
once.** Identity, because Google Cloud Identity Platform lacks passkeys
(CBD-104 §7.3); email, because the Google Cloud catalog publishes no first-party
transactional email send service (CBD-106 §4.3); and SMS, because **CBD-130
carries no C1 candidate at all** — leaving C2, C3, or the `INELIGIBLE` C10.

**Category F is standalone for everyone.** No hosting choice reaches it, so the
aggregator decision is independent of the rest of the set in a way no other
category is.

### 3.1 The C1 constraint rests on thinner evidence than its consequence

Both screening facts that drive it are single-record judgments the evaluations
themselves flagged.

* Identity: `OI-104-010` records that the consequence *"rests on one screening
  record (`EV-102-029`)"*, and `OQ-104-013` asks for re-confirmation from
  primary catalogs before it is relied on.
* Email: CBD-106 §4.3 states plainly that *"absence from the published catalog
  is not proof of absence"*, carries the confirmation at `OQ-106-001`, and
  records the row as **not separately evidenced**.

**This review does not rely on either.** They are recorded as a constraint to
verify. Two retrievals would settle both, and they are cheap relative to their
effect: between them they decide whether the C1 branch of the decision tree
means one extra vendor or three.

## 4. The seven dimensions

### 4.1 Identity

**The live risk is telemetry correlation, not authentication.** `HG-102-002`
asks whether short-lived correlation identifiers can be reused as a stable
identity. The August 22 decision at `OI-103-021` passed it for C3 in all five
categories on the ground that the persisting identifier belongs to the
Application Insights **JavaScript SDK**, which sits outside the evaluated
boundary — and attached a standing constraint at `OQ-103-029`: **adopting that
browser SDK reopens the gate for C3 everywhere.**

That is a coherence constraint in the strict sense. It is not a property of any
one category's selection; it is a condition on CoBudget's own future behaviour
that would invalidate an X-gate outcome across five categories simultaneously.
It belongs in the build brief, not only in an evaluation appendix.

`HG-102-003` — separation of reliability, security, support, audit and
aggregate-measurement data — is the dimension's second half, and `OQ-103-017`
records the specific unanswered question: whether any candidate applies **one
retention policy across all observability destinations**, which would fail the
gate on retention independently of access roles.

### 4.2 Networking

**No contradiction is possible here, because no approved source imposes a
networking assumption.** Catalog §11 moved network isolation to rubric
`WR-102-005`, and `OI-103-006` records that private networking is a preference
rather than a derived requirement. A mixed set spanning two or three ecosystems
would traverse the public internet between components; that is a rubric-scored
property, not a gate, and it cannot make the topology incoherent.

It does have a cost and an operational consequence, and §6 records it.

### 4.3 Secret

`HG-102-014` — S4 credential and bearer material never entering provider log,
telemetry, support or analytics surfaces — is one of the **three non-exceptable
gates** confirmed at `OI-102-020`. No compensating control can carry a failure.

**The coherence exposure is multiplicative.** Each additional provider in the
set is another surface on which S4 material must not appear. A single-ecosystem
C2 or C3 set spans one vendor's surfaces across five categories plus an
aggregator; a C1 set spans four vendors plus an aggregator. That is not an
argument for concentration — §5 gives the argument against — but it is the
dimension where adding a vendor adds the most non-exceptable risk.

`HG-102-005`, the durable human-held production credential, interacts with
`OI-103-002`: the CBD-102 §2.5.1 **second principal is defined but unfilled**.
`TD-103-020` describes the arrangement and nobody holds the role. Every
separation-of-duty assumption in the set currently rests on a role with no
occupant, and that is uniform across categories rather than contradictory
between them.

### 4.4 Regional

**The topology assumes a single United States deployment region**, confirmed by
the Product Owner on August 18, 2026 (`OI-103-001`). Every category's candidate
composition was evaluated on that basis, and **no category**
contradicts it.

**Amended at v0.9.** This section previously asserted the absence of any
contradiction without having checked the C1 front door. The C1 composition uses
**both global and regional** load balancing (Product Owner, August 29, 2026). The
regional half is covered by the Data Location commitment; the **global** external
Application Load Balancer is a global product by construction and is absent from
every list that commitment attaches to — and absent, too, from the companion
list of services that store no customer data. Whether that is an actual
contradiction turns on a fact nothing retrieved has established: whether the
global load balancer stores customer data at rest (`OQ-108-013`). **The claim is
now that no category contradicts the regional posture; whether one component of
one candidate's composition does is open.** Retrieval pass §4.13.

`OI-103-016` records the honest consequence: single-region means availability
cannot exceed the provider's single-region availability. In a mixed set that
compounds — the achievable availability of the whole is bounded by the product
of the single-region availabilities of each distinct vendor in it, and no
approved source sets a target that would make this a gate.

**Amended again at v0.14 — all three commit contractually, and they still
do not commit alike.** The retrieval pass §4.18, §4.19 and §4.20 put the same
region question to all three, and the answer moved twice before settling. **All
three make a contractual commitment**: C1 in the Service Specific Terms against
an enumerated service list, C3 in the Privacy & Security Terms against an
unenumerated set of *"Core Services"*, and C2 at DPA §12.1 against no service
list at all. Tranche 11's finding that C2's commitment could not be found in a
contract rested on a page describing the DPA rather than on the DPA itself;
tranche 12 read the instrument and corrected it.

They differ in three ways that matter more than the class they share. In
**granularity**, C1 and C2 commit at **region** level and C3 at **Geo** level,
and a Geo contains many regions, so a commitment honoured to the letter still
permits C3 to hold data in a region other than the one CoBudget deploys to. In
**what the commitment attaches to**, C1's and C3's are conditional on the
**service** — which is why C1's uncovered component could be found at all —
while C2's is conditional on the **data**, reaching *"Personal Data"* only (DPA
§17), so any part of CoBudget's estate that is not personal data sits outside
it. And in **standing**, C2's alone is subordinated: DPA §16 makes the Service
Terms control over the DPA.

**The shape argument this section previously made no longer holds.** It read
C1's single uncovered component as an artefact of C1 being checkable, and the
absence of an equivalent C2 finding as an absence of evidence. That was right
about C1 and wrong about C2: **C2 publishes no service list because its
commitment does not turn on one.** The C2 gap is real but lies on a different
axis — data class rather than service — and `OQ-108-021` puts it.

`HG-102-011` is the gate here, and it is the one where the documentary pass made
most progress: seven of ten provider identities disclosed. The three that did
not, plus one undated, fall almost entirely in category F — §5.

### 4.5 Retention

**`HG-102-013` is the coherence dimension's sharpest instrument, and it is
`UNPROVEN` everywhere.** Its pass test says *"Silence fails"*, and
`OQ-103-024`/`OQ-107-023` record that it is **the one gate that could fail every
candidate in every category simultaneously** — the only single point of
correlated failure in the entire CBD-15 set.

The v1.1 documentary pass sharpened the position without moving it: Google's
addendum states a recovery window and a 180-day expiry covering existing copies
but defers region to terms not retrieved; the AWS addendum could not be parsed;
and the Microsoft retention page that appears to answer it is **scoped to
Microsoft 365, not Azure**, and is registered as a negative record so it is not
re-found and misread. None of the three is provider silence *yet*.

**Amended at v0.14.** The AWS addendum has since been read (`EV-102-239`,
`EV-102-240`). It carries the region element at §12.1 and **assigns backup and
archiving to the customer** at §5.2 and §8, committing AWS to redundancy for
availability instead. For C2 the retention and expiry elements therefore fail by
**allocation** rather than by silence — a finding no further parse of that
document can overturn, and one that moves the remaining work to whether another
AWS instrument carries what C1's CDPA carries (`OQ-108-022`). Retrieval pass
§4.20.

**Amended again at v0.16, and the dimension has changed shape.** Two things happened on August 29. The **AWS Customer Agreement** was read (`EV-102-243`, `EV-102-244`) and states no retention or expiry term either, restating the DPA's allocation of backup to the customer in a section headed *"Your Security and Backup"* — so all three general AWS instruments are now read and none carries the term. And the **Product Owner ruled that `HG-102-013` accepts written evidence**, the pass test governing over the gate statement.

The ruling moves no gate — `HG-102-013` is still `UNPROVEN` for all three — but it changes what would. **For C2 and C3 the outstanding elements are now a bounded documentation retrieval rather than a hunt for a contractual statement.** C2's expiry is deferred by Service Terms §1.15 to per-service technical documentation (`OQ-108-025`); C3's nearest record, `EV-102-221`, loses its class objection and retains only its scope objection, being written about Recovery Services vaults rather than the evaluated composition (`OQ-108-026`). C1 is untouched by the ruling and still blocked by Cloud Scheduler. Retrieval pass §4.23 and §4.24.

**Amended at v0.20, and the C2 route is now closed rather than open.** Tranche 18 followed Service Terms §1.15's deferral into the per-service documentation for four C2 components. It found one provider-enforced expiry (KMS, 7—30 days, `EV-102-246`) and otherwise **customer-configured retention with provider lag on top** — CloudWatch Logs deleting *"up to 72 hours"* after the configured period *"but in rare situations might take longer"* (`EV-102-249`), and RDS support recovery *"for up to six days after the deletion request"* (`EV-102-248`). **`HG-102-013` asks for provider behaviour and the documentation states operator configuration**, so the gate does not move and no further retrieval in that direction will move it. This corrects the v0.16 amendment's expectation that the post-ruling path was *"materially better"*. Retrieval pass §4.30.

**Amended at v0.22 with the per-service picture, which does not aggregate.** Tranche 20 completed the C2 component sweep for SQS and EventBridge Scheduler. **Retention in the C2 set is a property of each service rather than of the composition**: SQS bounds a message at *"14 days"* and the customer cannot raise it (`EV-102-250`); CloudWatch Logs holds *"indefinitely"* by default (`EV-102-249`); KMS enforces both a floor and a ceiling (`EV-102-246`); RDS and EventBridge Scheduler enforce neither, and a recurring schedule without an `EndDate` is never auto-deleted (`EV-102-251`). **A statement about "C2's retention" is not available and should not be attempted**, which is a further reason `HG-102-013` cannot be satisfied by summing per-service answers — it asks a composition-level question. `OI-108-028`. Retrieval pass §4.32.

**Added at v0.24 — a dimension that turns out not to separate the candidates.** Tranches 21 and 22 put `HG-102-026`'s pass test to all three, and **all three meet it**: C1 by log views and `roles/logging.viewAccessor` (`EV-102-254`), C2 by per-log-group IAM by ARN or tag (`EV-102-252`), C3 by per-table RBAC with protected tables and a dedicated Privileged Monitoring Data Reader role (`EV-102-255`). CBD-103's topology called this *"the second gate most likely to eliminate a candidate"*; **it eliminates none of them**, so on the pass test it does no selection work and this review should not weight it as though it did. Any remaining discriminating power lies in the four gate-statement properties the test does not check, which `OQ-108-036` puts to CBD-102. The three are not equivalent even in passing: C3 passes widest but on a **preview** feature with silent denial, and its best mechanism depends on PIM, whose cost `OQ-108-009` leaves open (`OI-108-030`); C1's record is thinnest, because no statement was found about broader roles overriding a log-view restriction (`OQ-108-038`). Retrieval pass §4.34.

**Amended at v0.25 — the DPAs have been read, and the answer is the one this section feared.** All three are now retrieved, and **none describes a provider-held backup with a stated retention, region and expiry**. C1's CDPA comes closest, and `EV-102-168` records that it *"does not use the word backup or separately describe provider-held backup copies"*. C2's contracts **assign** backup to the customer; C3's per-service statements describe customer-configured retention of primary data. Read literally, the pass test's *"Silence fails"* therefore reaches **every candidate in every category at once** — the correlated failure `OQ-103-024` named. CBD-108 does not move the outcome and picks none of the three available readings; `OQ-108-027` specifies what CBD-102 must decide and `OQ-108-039` asks whether the `EX-102` exception route leaves a selectable set, given it yields `CONDITIONAL` rather than `PASS`. **The documentary route here is exhausted and what remains is class `D4`** (`OI-108-031`). Retrieval pass §4.35.

**Amended at v0.26 — the gate itself has changed.** The Product Owner amended `HG-102-013` on August 29, 2026 (CBD-102 v1.2, §12.1), on the precedent that amended `HG-102-006` and `HG-102-074`. The test now asks for a bounded lifetime over **every copy the provider holds** and a stated location, admits a customer-set period **only** where the provider states a ceiling the customer cannot raise, and fails a bound with an unbounded tail. **Re-measured against it, all three candidates still fail — but each on a named component rather than on a definition**: C1 on location, for Cloud Scheduler outside the data-residency list; C2 on lifetime, for CloudWatch Logs holding indefinitely by default and deleting *"up to 72 hours"* after the configured period *"but in rare situations might take longer"*; C3 on both, for Front Door outside Core Services and Service Bus defaulting to a max-int64 expiration with no stated ceiling. **C1 and C3 fail location on an edge or scheduling component; C2 is the only one that meets location and the only one whose lifetime failure sits in its observability surface.** The correlated-failure warning this section carried is discharged in its original form: the gate no longer fails every candidate for the same definitional reason. Retrieval pass §4.36.

**Amended at v0.27 — C2's lifetime failure has no composition remedy, and the amended clause needs checking.** Tranche 25 asked whether routing logs off CloudWatch would remove C2's failure. **FireLens makes the substitution available and S3 makes it worse**: S3 states only *"There may be a delay between the expiration date and the date at which Amazon S3 removes an object"*, with no figure and no bound, where CloudWatch at least gives 72 hours (`EV-102-260`, `EV-102-261`). The pattern across four AWS services is that **deletion bounds are stated where deletion is scheduled and not where it is bulk and asynchronous** (`OI-108-033`), which makes this structural for the storage tier rather than a defect of one service. **That raises a question about the amended gate**: *"a stated bound with an unbounded tail fails"* may fail AWS's storage layer generally, and if Google Cloud Storage and Azure Blob say the same thing it would recreate the correlated failure the amendment removed. `OQ-108-043` should be retrieved **before** the six evaluations re-measure. Retrieval pass §4.37.

**Amended at v0.28 — the amended clause separates the candidates, and the tranche 25 worry is scoped.** The three logging surfaces the compositions actually contain state **three different things**: Azure Monitor Logs is **bounded** (*"waits 30 days"*, *"might keep data for 31 days"*), CloudWatch Logs has an unbounded tail, and Cloud Logging states **nothing** about routine expiry timing (`EV-102-262`) — which the gate's own *"Silence fails"* catches independently. **Azure comes out best on this element**, the reverse of its position on §4.4's caveats. Separately, **all three object stores disclaim a bound**, Google's most explicitly: *"Your applications shouldn't rely on lifecycle actions occurring within a certain amount of time"* (`EV-102-263`). **No evaluated composition contains object storage**, so that is prospective (`OI-108-034`) — but the FireLens-to-S3 remedy §4.5's previous amendment discussed would have introduced it. Retrieval pass §4.38.

**Reading the remaining DPAs is the highest-leverage action available to
CBD-108**, in the precise sense that it is the one retrieval whose outcome could
change every category's disposition at once, in either direction.

### 4.6 Deletion

`HG-102-012` requires a documented deletion or suppression path with a
verifiable response, so a CBD-91 lifecycle event can be discharged against the
provider. **The coherence question is whether a deletion event propagates
consistently across a set**, and it is answerable only once the set is known.

Two recorded facts bear on it now. The PITR value set on August 22, 2026 was
recorded *as a deletion constraint as much as a recovery one* — a 14-day
point-in-time window is 14 days during which a deletion is not yet complete
anywhere it applies. And category E carries a distinct suppression semantics
per candidate: account-level for C2, domain-level for C3, per-stream for C5,
which means a suppression event has three different blast radii depending on the
email selection.

### 4.7 Incident

`HG-102-009` — durable, attributable evidence of vendor-side access — carries
the set's highest-consequence unresolved reading. `OI-103-018` records the
Product Owner decision of August 22, 2026 that C2's position is `UNPROVEN` and
**not** a `FAIL`, on the ground that absence from two trust pages is not proof
of absence from the product. The decision text states the stake plainly: if it
*were* a `FAIL`, **C2 becomes `INELIGIBLE` in every category at once.**

That is the second correlated-failure mode in the set, after `HG-102-013`. It is
now an observation rather than a document — `OQ-103-028` asks what an exercised
AWS support interaction actually produces in CloudTrail — which places it inside
the route-A pass rather than ahead of it.

**Amended at v0.15 — the second finding is withdrawn.** This section previously
recorded `EV-102-236`'s naming of Microsoft Entra ID among non-regional services
as converging with the Lockbox absence on the same component. `EV-102-242`
establishes that the naming does **not** reach Entra External ID: an external
tenant selects its own geographic location, and Microsoft states the locations
*"may differ from those of Microsoft Entra ID"*. **The Customer Lockbox absence
stands as a single finding, not a convergence** — retrieval pass §4.22.

The Customer Lockbox family shows the opposite pattern, where a control assumed
to be ecosystem-wide is not. `EV-102-012` establishes that **Microsoft Entra
External ID is absent from the Customer Lockbox supported-services list**, and
CBD-105 §7.6 records that Lockbox **may not cover PostgreSQL Flexible Server at
all**. A set assembled on the assumption that "Azure has Customer Lockbox" would
carry a contradictory incident assumption in two categories. That is exactly the
class of error this review exists to catch, and it is the clearest one found.

## 5. Subprocessor concentration and data flow

CBD-103 §7.8 established, from the providers' own disclosure, that **the
candidate set is less independent than it looks**.

| Candidate | Named in its own subprocessor list |
| --- | --- |
| C4 Auth0 | **AWS** and Microsoft for hosting; **Twilio** for the SMS authenticator; SendGrid for email |
| C5 Postmark | **AWS** and Deft for infrastructure |
| C10 Twilio | **AWS** for hosting and storage; Google |
| C2 AWS | **Twilio** and seven other aggregators for A2P messaging; 250ok for email deliverability metrics |

**Selecting the standalone vendors does not diversify away from AWS; it adds a
layer above it.** The C1 hosting branch — the one that forces C4 for identity
and C5 for email — is therefore also the branch that introduces AWS as a
sub-processor twice while not selecting AWS. A set chosen to avoid vendor
concentration would achieve the opposite of its intent.

**Twilio arrives by three separate routes**: as a category N candidate, as AWS's
A2P subprocessor, and as Auth0's SMS authenticator. C10's `FAIL` concerns its
own opt-out API surface and does not transfer to the other two roles — but a
reader tracking which processors touch customer data should know that declining
C10 does not remove Twilio from the topology.

**The map is incomplete, and the incompleteness is concentrated.** Three of the
ten provider lists could not be obtained and a fourth is undated. All of the
missing ones are category F, and after `OI-102-023` the gap is structural rather
than a matter of effort: C7's route cannot produce a registrable record at all.
**Category F is the one part of the data-flow map that cannot be completed by
the means available**, and any topology diagram of the selected set will carry a
labelled hole there.

## 6. Outage and support

**Outage.** No approved source sets an availability target
(`OI-105-005` records that no approved RTO or RPO exists; `ME-94-013` and CBD-94
own the values). Coherence here is therefore not gate-bound. The structural fact
is the one in §4.4: each additional distinct vendor multiplies into the achievable
availability, and single-region deployment bounds each term.

One category-specific coupling is worth carrying: `OI-104-012` records that
**identity availability is on the critical path for every CBD-72 protected
action, with no approved fallback.** In a mixed set the identity vendor's
single-region availability becomes the ceiling for the product's protected
surface regardless of how the other five are chosen.

**Support.** `OQ-107-022` and `OQ-130-016` ask the same question in two
categories — the support model, its response commitments, and **whether support
staff can see customer financial data or message destinations**. Neither has
been answered. That question is `HG-102-007`'s in a commercial wrapper, and it
is unanswered for every candidate in the two categories carrying the most
sensitive material. A support-plan purchase may also move `HG-102-005`:
`OQ-103-019` records that the Entra licence tier required for Privileged
Identity Management is unretrieved, and `OI-103-018`'s resolution notes a paid
AWS support plan as a possible `CR0` driver.

## 7. Lock-in and exit

The exit costs are **not symmetric across categories**, and the asymmetry does
not follow the size of the category.

**Category F carries the highest exit cost in the set by a wide margin.**
CBD-107 §5 records that changing aggregator requires *a new ceremony with the
successor for every connection* — 61 at Base, 375 at High — because there is no
data-migration substitute for a credential ceremony the end user must perform.
Exit is customer-visible and cannot be done silently.

**Category I is second**, because a passkey is bound to the relying party. A set
that treats identity as swappable is reasoning about the API surface rather than
about the credentials users hold.

**Hosting, database, email and SMS are ordinary.** Managed PostgreSQL is portable by
dump and restore; email and SMS are re-pointable; hosting is a redeployment.

The coherence consequence: **the two categories with the highest exit cost are
the two least constrained by the hosting choice** — F is standalone for
everyone, and I has a standalone option in every branch. The set's stickiest
decisions are therefore also its freest, and there is no reason to make them
early or to let a hosting selection drag them.

## 8. Combinations that would be incoherent

Stated as findings, each traceable to §4 or §5.

| # | Combination | Why it would be incoherent |
| --- | --- | --- |
| 1 | Any set assuming **"Azure has Customer Lockbox"** uniformly | `EV-102-012` excludes Entra External ID and CBD-105 §7.6 questions Flexible Server. The incident assumption would be contradictory in two categories — §4.7 |
| 2 | **C1 hosting chosen to reduce vendor count** | It raises the count from one ecosystem to four vendors, and introduces AWS twice as a subprocessor — §3, §5 |
| 3 | **Declining C10 believing it removes Twilio** | Twilio remains via AWS A2P and via Auth0's SMS authenticator — §5 |
| 4 | Any set adopting the **Application Insights JavaScript SDK** alongside a C3 selection | `OQ-103-029`'s standing constraint reopens `HG-102-002` for C3 in five categories at once — §4.1 |
| 5 | A **C2 set treated as settled** before `OQ-103-028` is observed | If `HG-102-009` resolves as a `FAIL`, C2 is `INELIGIBLE` in every category simultaneously — §4.7 |
| 6 | **Any set at all**, if the remaining DPAs are silent on backup retention, region and expiry | `HG-102-013` fails every candidate in every category at once — §4.5 |

Findings 5 and 6 are the two correlated-failure modes. Neither is a reason to
delay the observation pass; both are reasons **not to treat any provisional
preference as durable** until they are settled.

## 9. What would convert this map into a clearance

In dependency order, cheapest first:

1. **Read the remaining DPAs** (`OQ-103-024`, `OQ-103-025`, `OQ-107-023`). One
   retrieval, decisive in either direction for every category.
2. **Re-confirm the two C1 screening facts** (`OQ-104-013`, `OQ-106-001`). Two
   retrievals that decide whether the C1 branch costs one extra vendor or three.
3. **Run the route-A observation pass**, which closes `OQ-103-028` and with it
   the C2 correlated-failure mode, along with the observation-bound X gates.
4. **Establish C8 and C9's disclosure terms** before requesting material, and
   make the C6 trust-portal request — the only category F route that can produce
   a registrable record.
5. **Re-run this review against the resulting X-gate matrix.** Only then is a
   clearance available.

## 10. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-007 | **This review clears nothing.** The X gates that would clear it are `UNPROVEN` across category F and N entirely, and partially elsewhere. | The acceptance criterion is **partially met**: the dimensions are analyzed and six incoherent combinations are named, but no set is certified coherent. §9 states what would change that. |
| OI-108-008 | **Finding 1 in §8 is the only contradiction found by reading; the other five are conditional.** | Recorded so the review is not read as having found a set of live defects. Five of the six are constraints on future choices, not errors in present ones. |
| OI-108-009 | **The C1 branch analysis rests on two single-record screening judgments** that both source evaluations flagged as unconfirmed (`EV-102-029`; CBD-106 §4.3's "not separately evidenced"). | §3.1 declines to rely on them. If either is wrong, §3's constraint table changes shape and findings 2 and 3 weaken. Two retrievals settle it. |
| OI-108-010 | **`OQ-103-029`'s standing constraint is recorded in an evaluation appendix, but it binds CoBudget's build rather than any provider.** | It should reach the implementation brief for CBD-120 and its siblings, not only the evaluation record. Adopting the Application Insights browser SDK would silently reopen a passed gate in five categories. |
