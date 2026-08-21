# CBD-106 — Email Delivery and Content Boundary Specification

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Defines the email posture CBD-106 evaluates transactional email providers against, including the authentication-versus-product routing recommendation the ticket asks for. It selects no provider; the candidate evaluation measures against it, and CBD-108 makes the selection. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-106](https://cobudget.atlassian.net/browse/CBD-106) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Candidate Shortlist and Gate Evaluation v0.1; Operational and Cost Assessment v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `d98defd` |
| Last updated | August 21, 2026 |

## 1. Purpose and authority

CBD-106 must *"select email delivery for authentication and privacy-safe product
notifications."* A provider cannot be measured against a posture that has not
been described, so this document describes it first and the candidate evaluation
measures providers against it.

Every decision carries a stable `ED-106-*` key and cites the approved source that
forces it, following the convention CBD-103 established with `TD-103-*`, CBD-104
with `ID-104-*`, and CBD-105 with `DP-105-*`. Where no approved source settles a
question — a retention window, a retry ceiling — this document says so and
records an open item rather than inventing a value.

The authoritative inputs are the `EM-92-001`–`EM-92-007` email contracts, the
`SYS-92-011` notification rendering and delivery boundary and the `TB-92-012`
trust boundary, the approved CBD-102 method, the approved CBD-103 topology, the
approved CBD-104 identity boundary, the CBD-91 data classification, the CBD-94
requirements, and the approved CBD-73 and CBD-74 message and alert boundaries.
`ED-106-*` numbers are never reused or renumbered.

**This category has an unusually tight ceiling and unusually little freedom.**
`EM-92-001`–`003` already fix what each of the three email tiers may say, and
CBD-74 §6.1 and §6.2 already fix what an external alert may contain. Almost
nothing here is a new content decision. What this document adds is the
*delivery* posture that ceiling implies: how many providers, how many streams,
which domain, what the payload may carry, what a callback may do, and where the
provider's own event data is allowed to land.

## 2. What this document does not do

* It selects no provider and provisions nothing. CBD-108 selects.
* It writes no copy. Exact strings are `FU-95-017` and `EG-91-006`, and CBD-73's
  inventory is explicit that it defines *"semantics, not strings"*. Nothing here
  narrows or pre-empts that work.
* It sets no retention, retry, or rate value. §12 records what owns each.
* It closes no `EG-91-*` evidence gap. `EG-91-006` — provider selection,
  per-channel template schemas, preview policy, suppression and
  token-invalidation data, destination protection and vendor retention — remains
  open and is consumed here as an explicit unknown.
* It does not extend to push or SMS. Those are `NT-92-*` and provider category
  **N** (CBD-130). `ED-106-015` records the one place the boundary between them
  matters.
* It implements nothing. Every decision is a design record, and `EX-102-007`
  applies: a control that is CoBudget-side work is not effective until built and
  verified.

## 3. What email is for, and what it is not

`ED-106-001` — **Three purpose tiers, three template families, and nothing else
leaves CoBudget by email.**

The approved contracts define exactly three tiers, and each is a ceiling rather
than a target:

| Tier | Contract | Maximum content | Volume driver |
| --- | --- | --- | --- |
| **Routine product** | `EM-92-001` | A generic subject and body stating only that a CoBudget update is available, directing the recipient to authenticate. No event category, person, budget, membership, account, institution, amount, merchant, label, alert condition, lifecycle fact, deadline, denial reason, or resource identifier. | `DM-102-037` |
| **Invitation** | `EM-92-002` | That the message is a CoBudget invitation, plus the recipient-bound invitation locator. No inviter identity, budget name, proposed role, membership relationship, financial content, other recipient, expiration reason, or eligibility result. | `DM-102-033` |
| **Lifecycle and security** | `EM-92-003` | The safe action class, whether recipient action is required, and an applicable deadline. Nothing else. | `DM-102-034` |

Two consequences follow immediately, and they shape the whole evaluation:

* **Every alert email is routine email.** CBD-74 §6.1 states it directly: *"No
  alert email qualifies for the `EM-92-002` invitation tier or the `EM-92-003`
  lifecycle and security tier."* Routine mail is the largest volume
  (`DM-102-037`: 1,728 of 1,956 messages at Base) and carries the least content.
* **There is no fourth tier and no per-user widening.** CBD-74 §6.2 is explicit
  that no preference, verbosity level, privacy-detail setting, or trusted-device
  exception adds customer-specific content to an external notification. A
  provider feature that exists to personalize message content therefore has no
  use here, and a provider that *requires* personalization tokens is a problem
  rather than a convenience.

**Source:** `EM-92-001`–`EM-92-003`; `SYS-92-011`; `TB-92-012`; CBD-74 §6.1,
§6.2, `AB-74-004`; CBD-73 §4; `DM-102-033`, `DM-102-034`, `DM-102-037`.

## 4. Routing: how many providers, and how many streams

This section is the ticket's second deliverable — the
authentication-versus-product routing recommendation.

`ED-106-002` — **One transactional email provider carries both authentication
and product email.**

The alternative — a dedicated provider for authentication and security mail,
separate from product mail — is a real and defensible pattern at scale. It is
the wrong choice here, for reasons specific to this project rather than general:

* A second provider is a second subprocessor under `HG-102-011`, a second full
  15-gate cross-category pass, a second store of `DI-91-029` destinations, and a
  second deletion path that every `DI-91-045` lifecycle completion claim must
  reach and evidence.
* The demand it would serve is 150 lifecycle and security messages in year one
  (`DM-102-034`) against a peak month of 250 messages across all three tiers
  (`DM-102-039`). Splitting that volume across two providers makes both of them
  low-volume senders, which is the condition under which sender reputation is
  least stable — see the operational assessment §3.2.
* The isolation the split is meant to buy is available *inside* one provider,
  through the stream separation in `ED-106-003`, at no additional subprocessor
  cost.

**This is a preference with stated reasons, in the `TD-103-015` sense, not a
gate.** No approved source requires one provider or two. If CBD-108 finds that
the selected provider cannot separate streams as `ED-106-003` requires, a second
provider becomes the way to obtain that separation, and this decision is
reconsidered rather than overridden.

**Source:** `HG-102-011`; `DI-91-029`; `DI-91-045`; `DM-102-034`, `DM-102-039`;
`WR-102-027`–`WR-102-031`; catalog §11 — a provider name is an evaluation
input, not a gate.

`ED-106-003` — **Each purpose tier is a separate provider stream on a separate
sending subdomain, and suppression is per stream with one exception.**

One provider does not mean one undifferentiated pipe. The three tiers are
separated at the provider:

| Tier | Stream | Subdomain shape | Why separate |
| --- | --- | --- | --- |
| Routine product | Routine | A dedicated notification subdomain | Highest volume, lowest content, and the only tier a recipient may reasonably complain about |
| Invitation | Invitation | A dedicated subdomain | Sent to addresses that have consented to nothing yet, so its complaint profile is structurally different |
| Lifecycle and security | Lifecycle | A dedicated subdomain | `MN-74-02` requires these are *"never routed through alert preferences"* |

Suppression follows the separation, with one deliberate exception:

* A **complaint** — the recipient marking a message as spam — is a preference
  signal. It suppresses **that stream only**. A complaint about routine alert
  mail is treated as the recipient opting that category out under `CF-74-01`,
  and it must never suppress an `EM-92-003` lifecycle or security notice, which
  `MN-74-02` places outside alert preferences entirely.
* A **hard bounce** is a delivery fact about the address, not a preference. It
  suppresses on **every** stream, because the address does not work.
* An address change, revocation, invitation replacement or expiry, restoration,
  cancellation, membership or profile change, or event supersession suppresses
  the work it makes stale, on every stream, per `EM-92-006`.

**The separation is a boundary condition on the evaluation, not a convenience.**
A provider whose suppression list is account-global with no per-stream scope
cannot implement the complaint rule above, which would mean one spam click on a
routine alert silently disabling a recipient's security notices. The evaluation
records each candidate's suppression scope for exactly this reason.

**Source:** `EM-92-003`, `EM-92-006`; CBD-74 §4.2 `MN-74-01`/`MN-74-02`, §5.1
`CF-74-01`; `NT-92-004`; `HG-102-051`; `SR-94-048`; `DI-91-059`.

`ED-106-004` — **The identity provider's own ceremony email is brought inside
this boundary where the selected IdP allows it, and documented as outside it
where it does not.**

`ID-104-018` records that the IdP's ceremony messages — verification codes,
recovery links, factor-enrollment prompts — are `EM-92-003` tier communications
when delivered by email, and that whether a candidate's ceremony email can be
brought under CoBudget's content control is an assessment question per
candidate. This specification takes the position that document left open, for
this category:

* **Preferred**: the IdP hands the message to the CBD-106 provider, or at
  minimum sends from a CoBudget-controlled domain under CoBudget's template
  control, so that one envelope policy and one `EM-92-003` ceiling govern every
  security-class message a customer receives.
* **Where a candidate cannot do that**, the ceremony email is a documented
  boundary CoBudget does not control, recorded with what it may contain and what
  domain it comes from. It is not silently treated as CoBudget email.

This decision does not bind CBD-104's selection and creates no new gate. It
states what CBD-108 should prefer when it weighs an identity candidate and an
email candidate together, and it is why `OQ-104-015` matters to this subtask as
well as to that one.

**Source:** `ID-104-018`; `OI-104-005`; `EM-92-003`; `EM-92-005`; `HG-102-047` —
the category-E gate whose absence in category I is precisely what `ID-104-018`
records.

## 5. Envelope and destination

`ED-106-005` — **The sending domain is CoBudget's, authenticated with SPF, DKIM,
and DMARC, and no vendor-branded envelope is used in production.**

* A dedicated subdomain per stream under `ED-106-003`, each with its own DKIM
  key and its own SPF-aligned bounce or MAIL FROM domain, under a DMARC policy
  on the organizational domain.
* The envelope carries no event-descriptive routing. A subdomain named for a
  *stream* discloses only the purpose class CoBudget already discloses by
  sending at all; a subdomain or MAIL FROM address named for an *event*, a
  budget space, or a recipient state would encode exactly what `EM-92-001` and
  `EM-92-005` forbid.
* A provider-supplied shared or vendor-branded sending domain is not usable in
  production. `HG-102-054` gates this, and the evaluation records that one
  candidate's managed domain is a vendor-branded envelope of the shape
  `donotreply@<identifier>.<vendor>.net`.

The DMARC policy target is enforcement — `p=quarantine`, then `p=reject` —
reached through the monitoring-first rollout both AWS and Microsoft document. **No
approved source sets the policy value or the rollout date**; `OI-106-002` owns
them.

**Source:** `HG-102-054`; `EM-92-001`, `EM-92-005`; Architecture § Security
baseline; evaluation `EV-102-052`, `EV-102-058`, `EV-102-065`.

`ED-106-006` — **One message, one recipient. Two destinations never share an
envelope.**

Every send carries exactly one destination. No `To` line with two addresses, no
`Cc`, and no `Bcc` — not as a performance choice but because a shared envelope
discloses one recipient's `DI-91-029` destination to another, which CBD-106's own
acceptance criteria name directly and CBD-72's scope rules forbid.

Two observable consequences the evaluation uses:

* A provider whose per-recipient delivery event is *degraded* when a message has
  multiple recipients is describing its own model. One candidate documents that
  its engagement event's recipient field *"is empty when the original email was
  sent to multiple recipients at a time."* Under this decision that case never
  arises.
* Fan-out is per recipient at the CoBudget outbox (`TB-92-012`; CBD-74 §5.3
  step 2), so the provider never performs recipient expansion and never needs a
  recipient list.

**Source:** CBD-106 acceptance criterion 3; `DI-91-029`; `EM-92-005`; CBD-72
`PM-72-006`; `TB-92-012`; CBD-74 §5.3; evaluation `EV-102-064`.

`ED-106-007` — **Open tracking, click tracking, and link rewriting are off, and
"off" is asserted on every send rather than inherited from an account setting.**

`EM-92-007` prohibits any third-party tracking pixel, remote customer-specific
image, open fingerprint, externally hosted sensitive asset, or link decoration
beyond the opaque protected locator. Link rewriting additionally breaks
`EM-92-004`, because a rewritten URL places a provider-held identifier and the
original destination into a third party's request path and the recipient's
referrer.

The posture is therefore belt and braces:

* Tracking is disabled at every scope the provider offers — account, domain,
  stream, and configuration set.
* Where the provider exposes a per-message tracking parameter, CoBudget sends it
  explicitly set to off on **every** message. An account-level default that is
  correct today is one console click away from being wrong; a per-message
  assertion is a property of the code that sends.
* Messages carry no remote images at all. Not "no tracking pixel" — no remote
  image, because a remote image is an open fingerprint whatever it depicts.

**Source:** `EM-92-007`, `EM-92-004`; `HG-102-048`; `AN-92-001`, `AN-92-002`;
CBD-74 §6.2; evaluation `EV-102-054`, `EV-102-060`, `EV-102-066`.

## 6. Payload, links, and eligibility

`ED-106-008` — **The provider payload is an allowlist enforced in code, and
provider labelling fields carry opaque identifiers or nothing.**

`EM-92-005` fixes the allowlist. The send call may carry:

| Permitted | Notes |
| --- | --- |
| The single destination | `ED-106-006` |
| The approved purpose-tier template identifier | Stable, opaque, versioned |
| Permitted action-class and deadline fields | **Lifecycle and security tier only.** Routine and invitation templates never receive these fields at all |
| Opaque attempt, template, and workflow locator identifiers | No customer data recoverable from the value |
| Channel controls | Tracking off, stream selection, suppression scope |
| Minimum delivery metadata | Sender identity, reply behaviour, message identifier |

Everything else is excluded, and the exclusions are the point:

* No campaign, category, tag, segment, list, or analytics label that encodes
  event, resource, budget-space, membership, or recipient context. Where a
  provider offers such a field optionally, it is left empty or carries an opaque
  identifier. Where a provider *requires* a descriptive label, it fails
  `HG-102-049`.
* No custom header carrying product state. A provider header, tag, or callback
  field that encodes prohibited context is prohibited by the same rule that
  prohibits it in the body — CBD-74 §6.2 lists provider template names, tags,
  categories, headers, analytics labels, and callback fields explicitly.
* No subject-line personalization, because there is nothing permitted to
  personalize it with.

**Enforced in code** means the send adapter constructs the payload from a typed
allowlist rather than serializing a domain object and trusting review to catch
additions. This is the structural-redaction principle `TD-103-022` already
established for telemetry, applied to the one other place CoBudget hands data to
a third party.

**Source:** `EM-92-005`; `HG-102-049`; CBD-74 §6.2, `AB-74-004`; `SR-94-045`,
`SR-94-046`, `SR-94-049`; `TD-103-022`.

`ED-106-009` — **The locator locates and never authorizes.**

`EM-92-004` is unusually complete, and this decision adds only its delivery
consequences:

* Invitation, lifecycle, and security links carry an opaque, single-purpose,
  short-lived locator bound to the intended recipient and workflow version, with
  no customer data or resource name in the URL or referrer.
* The locator may find a workflow. It cannot accept, restore, transfer, delete,
  export, authenticate, recover, acknowledge, or complete any protected action
  without the in-app identity, assurance, eligibility, current-state, and
  confirmation checks. `TH-92-006` is the threat this closes: an intercepted,
  forwarded, resent, expired, replaced, or cross-recipient locator replayed as
  membership authority.
* Routine email carries only a generic authenticated application destination —
  no locator at all, because routine mail identifies no workflow to locate.
* Because links are never rewritten (`ED-106-007`), the URL the recipient's
  client receives is the URL CoBudget wrote. That is what makes the locator's
  properties verifiable rather than aspirational.

**Source:** `EM-92-004`; `TH-92-006`; `HG-102-048`; CBD-72 permissions 24 and 26;
`DI-91-054`.

`ED-106-010` — **Every attempt rechecks at send time, and a failed recheck
suppresses rather than sends.**

`EM-92-006` requires that every email attempt rechecks current recipient and
destination, purpose, event freshness, authorization and lifecycle state, and
template version. CBD-74 §5.3 step 5 states the same list as a delivery
precondition. The delivery boundary therefore evaluates, at the moment of send
and not at the moment of enqueue: recipient identity; destination ownership and
version; opt-in for the category on this channel; current eligibility;
authorization and lifecycle versions; material revision; template version; and
suppression state on the stream.

Any failed recheck suppresses the attempt. It does not send a degraded message,
and it does not send to a fallback destination — there is no fallback, per
`MN-74-01`'s no-fallback rule for safety-channel delivery. `TH-92-021` is the
threat this closes: a queued message delivered after the state that justified it
became stale.

**Source:** `EM-92-006`; `TH-92-021`; CBD-74 §5.3, §4.2 `MN-74-01`; `SR-94-048`;
`TB-92-008`, `TB-92-012`; `SA-92-008`.

`ED-106-011` — **Callbacks change delivery and suppression state only, and
CoBudget authenticates and de-duplicates them at its own edge whatever the
provider offers.**

A delivery, bounce, complaint, or delay callback may update delivery-attempt
state and suppression state. It may not authenticate anyone, acknowledge an
in-app instance, create or recreate an event, change a preference, or alter any
product authority — `EM-92-006` and CBD-74 §5.3 step 7 both state this.

Provider mechanisms differ, and the design does not depend on which one the
selected provider offers:

* The callback endpoint sits behind the `TD-103-012` edge, and signature or
  credential verification and timestamp/replay rejection happen there, before
  the payload becomes durable — the same placement `TD-103-016` fixes for
  financial webhooks.
* Idempotency is CoBudget's, keyed on the provider's stable event or attempt
  identifier. A provider that supplies a retry-stable identifier makes this
  cheaper; a provider that does not makes it CoBudget's own key derivation, but
  never makes it optional. `EP-92-010` requires the property, not a particular
  vendor feature.
* A callback that fails verification is dropped and counted, not partially
  applied.

Where a provider offers only a shared-secret mechanism rather than a per-payload
signature, that is recorded as a rubric-scored weakness with its residual, not as
a reason to weaken the edge. The evaluation's finding F4 records where the
candidates sit.

**Source:** `EM-92-006`; `EP-92-010`; `HG-102-050`; `TD-103-012`, `TD-103-016`;
CBD-74 §5.3 step 7; `SR-94-050`; `DI-91-059`.

## 7. Provider event data, retention, and deletion

`ED-106-012` — **Provider event data is restricted diagnostics, not reliability
telemetry.**

Delivery and engagement events name a destination. A destination is personal
data under `DI-91-029`, and `AN-92-003` excludes subject, destination, and
account labels from the S1 allowlist that ordinary reliability telemetry is
confined to. Therefore:

| Surface | Content | Boundary |
| --- | --- | --- |
| Ordinary operator dashboard | Attempt counts, outcome classes, duration and capacity buckets, aggregate bounce and complaint rates — content-free | S1; `DI-91-041`; `TD-103-021` |
| Provider delivery and bounce events | Destination address, SMTP diagnostics, provider identifiers | Restricted diagnostics; `DI-91-062`; `TD-103-021` |
| Provider engagement events | Clicked URL, user agent, recipient IP address | **Do not exist**, because `ED-106-007` turns tracking off |
| Suppression state | Destination plus reason | Application state; `DI-91-059` — not telemetry |

The middle row is the load-bearing one, and the evaluation's finding F5 shows it
is not hypothetical: one candidate publishes its email log schema field by field,
and the recipient address is in it. Routing provider email logs into the ordinary
telemetry stream would put `DI-91-029` destinations on the S1 surface by
accident. They go to the restricted diagnostics boundary, or they are not
collected.

**Source:** `AN-92-003`; `HG-102-001`; `DI-91-029`, `DI-91-041`, `DI-91-059`,
`DI-91-062`; `TD-103-021`, `TD-103-022`; CBD-91 §4 rule 5; evaluation
`EV-102-062`.

`ED-106-013` — **Destinations and rendered bodies at the provider are bounded,
disclosed, and deletable, and a completion claim states its horizon.**

Two distinct provider-held classes, with two distinct rules:

* **Destinations** — `DI-91-029`, and the `DI-91-059` bounce and suppression
  records built on them. Every one is personal data. The provider must offer a
  deletion path with a verifiable response, and its own retention must be
  disclosed. `HG-102-053` gates this; `HG-102-012` gates the evidence.
* **Rendered bodies** — `DI-91-049`, the delivered copy, governed by its highest
  permitted content sensitivity. Retention must be bounded, disclosed, and
  minimized or disabled. Where the provider stores bodies to power an activity or
  preview console, that store is inside the disclosed boundary or the provider
  fails `HG-102-052` and `HG-102-055`.

**Preference, in order**: no body retention at all; then the shortest bounded
retention the provider offers; then the provider's default, recorded with its
consequence. **No approved source sets the value** — `EG-91-001` holds retention
durations open across the inventory, and `OI-106-003` records that the choice is
a Product Owner decision at provisioning, not an implementer's.

Deletion propagates on the `DI-91-045` ledger like every other class: the
`SA-92-008` lifecycle orchestrator issues the provider deletion, records the
response, and every completion claim states its provider horizon — *removed from
the provider's live state now; falls out of the provider's retained copies when
its stated retention expires* — failing closed per `SR-94-124` where the horizon
cannot be stated. Bounce and complaint records the provider retains for its own
abuse prevention are named in the claim as an uncontrolled copy rather than
quietly omitted.

**Source:** `HG-102-052`, `HG-102-053`, `HG-102-055`, `HG-102-012`; `DI-91-029`,
`DI-91-045`, `DI-91-049`, `DI-91-059`; `EG-91-001`, `EG-91-006`; `SA-92-008`;
`SR-94-121`, `SR-94-124`; CBD-91 §5.1 provider row; `TB-92-016`.

`ED-106-014` — **The delivered copy is not CoBudget's, and no message or setting
says otherwise.**

`EM-92-007` fixes the custody boundary and CBD-74 §6.4 fixes the copy that must
accompany it. Inboxes, forwarding, provider retention, previews, backups,
printing, and screenshots are recipient- and provider-controlled copies.
CoBudget does not promise remote erasure after delivery, does not claim previews
are hidden, and does not describe any channel as private.

This is why `ED-106-001`'s ceiling is the actual control. A message that cannot
be recalled is safe only if it never carried anything worth recalling — which is
the entire reason routine email is content-free rather than merely careful.

**Source:** `EM-92-007`; CBD-74 §6.4; `DI-91-049`; `SR-94-053`; `EG-91-024`;
`PA-92-008`.

## 8. Reliability and the in-app relationship

`ED-106-015` — **The send is a job on the transactional outbox, and email never
delays, blocks, or duplicates the in-app instance.**

Email is an optional transport hint on top of a mandatory in-app surface, and the
ordering is fixed by CBD-74 §5.3: the shared event is created, eligibility is
computed, the mandatory in-app instance is created for every eligible recipient
*without consulting any preference*, and only then is external delivery
scheduled.

Delivery therefore runs as a background job on the `TD-103-006`
authority-carrying outbox:

* The job carries its own authority context and is re-evaluated at execution
  (`TD-103-007`), which is what makes the `ED-106-010` send-time recheck possible
  at all.
* Retries are bounded and end in an observable terminal state (`TD-103-008`); a
  permanently failing attempt lands in the restricted dead-letter boundary
  (`TD-103-009`), never in a customer-visible surface.
* **No approved source sets the retry ceiling, backoff, or attempt expiry.**
  `RL-92-007` and `ME-94-010` hold rate and resource values open generally;
  `OI-106-004` records these specific ones.
* A provider outage delays external copies and nothing else. In-app instances
  already exist, and CBD-74 §5.3 states that an external delivery failure at any
  step never removes, delays, or duplicates the in-app instance.

The push and SMS boundary matters in exactly one place: an email failure never
escalates to another channel, and no channel is a fallback for another.
`NT-92-*` channels are separately opt-in and carry a different, narrower body.
They are not a retry path for email, and email is not a retry path for them.

**Source:** `TD-103-006`, `TD-103-007`, `TD-103-008`, `TD-103-009`; CBD-74 §5.3,
§4.2 `MN-74-01`; `TB-92-008`, `TB-92-009`, `TB-92-012`; `RL-92-007`;
`NT-92-004`; CBD-106 acceptance criterion 5.

## 9. Exit

`ED-106-016` — **Exit is DNS and template source, and no template is authored
only at the provider.**

The email integration is deliberately the thinnest in the provider set:

* Template *content* lives in the repository as versioned source and is deployed
  to the provider, never authored in a provider console. A template that exists
  only at the provider is content CoBudget would have to re-author in order to
  leave, and it is also content outside the `FU-95-017` copy-version discipline
  the approved-copy work will impose.
* The send interface is the provider's API or SMTP. Provider code lives in the
  edge adapter, never in domain modules — the same seam `TD-103-001` and
  `ID-104-019` keep.
* Exit executes as: verify the domains at the successor, publish new DKIM and
  SPF records, re-point the streams, import the suppression list, cut over by
  configuration under `TD-103-027`. No customer action, and no data migration
  beyond suppression state.
* **Suppression state is the one genuine exit artifact**, and it is not fully
  portable: the evaluation's finding F6 records that one candidate cannot delete
  spam-complaint suppressions at all, and another writes hard bounces to a
  cross-customer list CoBudget can neither enumerate nor delete from. Exit
  therefore reconstructs suppression from CoBudget's own `DI-91-059` state, and
  the provider's list is treated as a cache of that state rather than the record.

**Source:** `WR-102-023`–`WR-102-026`; `TD-103-001`, `TD-103-027`; `ID-104-019`;
`DI-91-059`; `FU-95-017`; evaluation finding F6.

## 10. Boundary summary

| Direction | What crosses | Governed by |
| --- | --- | --- |
| CoBudget → provider | One destination, one template identifier, tier-permitted action-class and deadline fields, opaque identifiers, channel controls, minimum delivery metadata | `ED-106-006`, `ED-106-008`; `EM-92-005`; `HG-102-049` |
| Provider → recipient | A message whose content ceiling is `EM-92-001`/`EM-92-002`/`EM-92-003`, from a CoBudget domain, with no pixel, no rewritten link, and no vendor decoration | `ED-106-005`, `ED-106-007`; `HG-102-047`, `HG-102-048`, `HG-102-054` |
| Provider → CoBudget | Delivery, bounce, complaint, and delay events carrying destination and diagnostics, and nothing that changes product authority | `ED-106-011`, `ED-106-012`; `HG-102-050` |
| Provider-held at rest | Destinations, suppression records, and whatever body retention the provider discloses | `ED-106-013`; `HG-102-052`, `HG-102-053`, `HG-102-055` |
| Never crosses | Financial values, budget-space or person identity, membership or role, event category or alert condition, lifecycle state, reasons, resource identifiers, credentials, secrets, and any cross-user personal state | `ED-106-001`, `ED-106-008`; `HG-102-014`; CBD-74 §6.2 |

## 11. Gate disposition carried by this specification

The evaluation records outcomes per candidate; this table records which gates
this specification settles on **CoBudget's** side, so that the evaluation is
measuring only the provider.

| Gate | What this specification settles | What remains a provider question |
| --- | --- | --- |
| `HG-102-014` (Config) | `ED-106-008` — no S4 value enters the provider payload, log, or callback surface. Non-exceptable under exception rules §5.2 | Nothing; this gate is CoBudget's |
| `HG-102-047` | `ED-106-001` — the three tiers and their exact ceilings | Whether the provider injects body, footer, or subject content |
| `HG-102-048` | `ED-106-007` — tracking off at every scope, asserted per message | Whether the provider can be made not to rewrite or fingerprint |
| `HG-102-049` | `ED-106-008` — the allowlist | Whether the provider *requires* a field outside it |
| `HG-102-050` | `ED-106-011` — verification and idempotency at CoBudget's edge | Whether the callback is authenticatable at all, and whether it carries body content |
| `HG-102-051` | `ED-106-003` — per-stream suppression semantics | Whether suppression is programmatically readable, writable, and deletable at that scope |
| `HG-102-054` | `ED-106-005` — CoBudget domains, per stream | Whether the provider permits them and supports SPF, DKIM, and DMARC |

## 12. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-106-001 | `ED-106-002` recommends one provider for both authentication and product email as a stated preference, not a gated requirement. | If the selected provider cannot separate streams per `ED-106-003`, the recommendation is reconsidered rather than overridden, and a second provider becomes the way to obtain the separation. CBD-108 owns the combined choice. |
| OI-106-002 | The DMARC policy value and the enforcement rollout date have no approved source. `ED-106-005` fixes enforcement as the target and the monitoring-first path as the method. | Chosen at provisioning as a Product Owner decision. A `p=none` record that never advances is a monitoring posture recorded as an enforcement one. |
| OI-106-003 | The provider body-retention and destination-retention values have no approved source (`EG-91-001`, `EG-91-006`). `ED-106-013` fixes the preference order, not a number. | Chosen at provisioning with its deletion-horizon consequence recorded, exactly as `DP-105-006` handles the database retention window. On at least one candidate the shortest option is a paid add-on — operational assessment §5.3. |
| OI-106-004 | Retry ceiling, backoff schedule, and attempt expiry for the send job have no approved source (`RL-92-007`, `ME-94-010`). | `ED-106-015` fixes the shape — bounded, observable, terminal — and CBD-94 owns the values before any external delivery is released. |
| OI-106-005 | `ED-106-004` states a preference for bringing IdP ceremony email inside this boundary, but no approved source binds a message the identity provider originates. `OI-104-005` carries the same disposition from the other side. | Neither subtask can settle it alone. CBD-108 weighs the identity and email candidates together, and `OQ-104-015` is the retrieval that makes the question answerable. |
| OI-106-006 | This specification has been reviewed by no one but its author, and nothing in it is built. Exact copy remains blocked under `FU-95-017` and `EG-91-006`. | Design record only. No customer-facing email ships from this document, and the independent security review required before public launch remains outstanding. |
