# CBD-130 — Push and SMS Delivery Boundary Specification

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Defines the push and SMS posture CBD-130 evaluates providers against. It records that Private MVP has no push provider to select, and that SMS does. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-130](https://cobudget.atlassian.net/browse/CBD-130) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Candidate Shortlist and Gate Evaluation v0.1; Operational and Cost Assessment v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `d7c3b29` |
| Last updated | August 21, 2026 |

## 1. Purpose and authority

CBD-130 must *"select the push and SMS provider for Private MVP"*. This document
describes the posture the evaluation measures providers against, and records one
structural finding that changes what the word *select* can mean for one of the
two channels.

Every decision carries a stable `PN-130-*` key and cites the approved source
that forces it, following the convention CBD-103 established with `TD-103-*` and
its four siblings. `PN-130-*` numbers are never reused or renumbered.

The authoritative inputs are the `NT-92-001`–`NT-92-006` notification contracts,
the `SYS-92-011` notification rendering and delivery boundary with trust
boundary `TB-92-012`, the approved CBD-102 method, the approved CBD-103
topology, the CBD-91 data classification, the CBD-94 requirements, and the
approved CBD-74 alert boundary.

**`NT-92-*` is the tightest content ceiling in the approved set**, and the
catalog says so: push and SMS are optional transport hints, never a copy of the
in-app view, and never an authentication, authorization, or protected-action
channel. Almost nothing here is a new content decision. What this document adds
is the delivery posture that ceiling implies, and an accurate account of what is
actually selectable.

## 2. What this document does not do

* It selects no provider. The evaluation measures; CBD-108 selects.
* It approves no template text, localization, or preview policy. `EG-91-006`
  owns those and remains open.
* It closes no `EG-91-*` gap. `EG-91-006` and `EG-91-024` — the latter covering
  the SMS and push threat surface including SIM-swap, mirroring, and lock-screen
  behaviour — are consumed here as explicit unknowns.
* It sets no retry, cadence, or retention value. §10 records what owns each.
* It implements nothing. Every decision is a design record.

## 3. What both channels are for

`PN-130-001` — **Both channels carry the fixed `NT-92-001` body and nothing
else, in any locale, under any preference.**

`NT-92-001` fixes the semantic message: *"You have a new CoBudget update. Open
CoBudget to review."* or an approved localized equivalent with identical
information content. It excludes person, budget, membership or role, account,
institution, event category, and every other customer-specific element.

CBD-74 §6.2 states the widening rule negatively and exhaustively: there is no
per-user opt-in, verbosity level, privacy-detail setting, or trusted-device
exception that adds customer-specific content to an external notification.

Two consequences the evaluation measures directly:

* A provider that **requires** per-recipient personalization tokens, a
  descriptive campaign or topic label, or an analytics tag encoding event
  context cannot be used as specified. `HG-102-068` and `HG-102-069` gate this.
* Because the body never varies, **the message is not the asset** — the
  destination is. `DI-91-029` destinations and `DI-91-073` registrations are
  what a provider actually holds that matters, which is why the rubric weights
  this category's privacy dimension at 26, the highest weight in the whole
  rubric.

**Source:** `NT-92-001`; `SYS-92-011`; `TB-92-012`; CBD-74 §6.1, §6.2;
`HG-102-068`, `HG-102-069`; rubric §4.1.

`PN-130-002` — **Neither channel is an authentication, authorization, or
protected-action channel, and no registration is ever an authorization input.**
*(Settles Config gate `HG-102-075`.)*

`NT-92-002` permits a push tap to open only a generic authenticated entry point
or notification inbox, and permits SMS to carry only the ordinary public
application URL if a URL is included. Neither may carry an invitation token, a
restoration secret, an export or download link, or any protected-action
capability.

`DI-91-073` records the reasoning for the token's own classification: it is
*"deliberately not S4"* because the token alone cannot authenticate a session,
account, or protected action. That property is only preserved if CoBudget never
treats it as one — which is what this decision fixes.

**Source:** `NT-92-001`, `NT-92-002`; `DI-91-073`; `HG-102-070`, `HG-102-075`;
CBD-74 §6.1.

## 4. Push in Private MVP

`PN-130-003` — **Private MVP push is Web Push to an installed progressive web
app. There is no push provider to select, and the transports are unavoidable
subprocessors rather than candidates.**

This is the structural finding of the package, and it follows from approved
scope rather than from any provider's documentation:

* `docs/product-plan.md` § Deferred capabilities lists **"Native iOS and Android
  applications"** as deferred.
* `docs/architecture.md` § Proposed stack puts Web at Next.js with **"PWA
  support"** and Mobile at **"Expo and React Native in a later phase"**.

So there is no native application in Private MVP, and therefore no APNs or FCM
native token integration. Push means the W3C Push API, delivered through the
push service **the recipient's browser chooses** — Apple's for Safari, Mozilla's
for Firefox, Google's for Chrome. CoBudget does not choose it, does not contract
with it, and on at least one platform does not register with it at all: WebKit
records that Web Push on iOS uses Apple's push service and that *"You do not
need to be a member of the Apple Developer Program to use it."*

Three consequences:

1. **The category-N gates still apply**, because the transports handle
   `DI-91-073` registrations and deliver `DI-91-049` copies. They are measured
   in the evaluation as subprocessors, not ranked as candidates.
2. **`HG-102-011` subprocessor disclosure has a different shape here.** The set
   of push services is determined by which browsers CoBudget's recipients use,
   so it is enumerable but not chosen.
3. **iOS push requires the recipient to add the web app to their Home Screen.**
   That is an adoption precondition, not a preference, and the operational
   assessment records what it does to `DM-102-042`'s 0.35 push opt-in
   assumption.

**Source:** `docs/product-plan.md` § Deferred capabilities; `docs/architecture.md`
§ Proposed stack; `DI-91-073`; `HG-102-011`; `DM-102-042`; evaluation
finding F1.

`PN-130-004` — **The push payload is encrypted to the subscription's own keys,
so no push service can read it, and CoBudget sends no plaintext to any of
them.**

The Web Push protocol encrypts the message body to keys the browser generates
and holds. MDN records that `PushSubscription.getKey()` returns *"a client
public key, which can then be sent to a server and used in encrypting push
message data"*, with `p256dh` an ECDH P-256 public key and `auth` an
*"authentication secret, as described in Message Encryption for Web Push"*.

This is the single most favourable privacy property available in this category,
and it is worth stating precisely because it is easy to overstate:

* **What it gives**: the push service relays ciphertext. A service that cannot
  decrypt cannot inject content into the body, cannot mine it, and retains
  ciphertext rather than a message.
* **What it does not give**: the push service still sees the subscription
  endpoint, the timing, and the size. And the *recipient's device* decrypts and
  renders the body on a lock screen — which is exactly the surface `NT-92-006`
  addresses and `EG-91-024` holds open.

`PN-130-001`'s content-free body is therefore **not** made redundant by
encryption. It is the control that survives decryption, and it is why
`NT-92-006` applies the generic-body rule *even when a platform claims previews
are hidden*.

**Source:** `NT-92-006`; `DI-91-049`; `EG-91-024`; `HG-102-068`, `HG-102-074`;
evaluation `EV-102-137`.

`PN-130-005` — **A push subscription is a `DI-91-073` registration bound to one
browser installation, and it is purged on logout, account switch, permission
revocation, expiry, and rotation.**

`HG-102-071` requires that unregistered and invalid results be reported so the
class can be purged. In Web Push the reporting mechanism is the HTTP status the
push service returns to CoBudget's own send: a `404` or `410` on the
subscription endpoint means the subscription is gone, and CoBudget deletes the
registration on that signal rather than retaining a dead endpoint.

Because CoBudget posts directly to the endpoint, this feedback needs no vendor
feature and no callback — which is `PN-130-003`'s advantage stated concretely.

**Source:** `DI-91-073`; `HG-102-071`; `NT-92-004`, `NT-92-005`; CBD-74 §5.1
`CF-74-01`.

`PN-130-006` — **No push fan-out intermediary is introduced in Private MVP.**

A fan-out service — a managed push platform sitting between CoBudget and the
browser push services — is available and is deliberately not adopted:

* It would add a subprocessor under `HG-102-011` to a channel that currently has
  none of CoBudget's choosing.
* It would require handing that intermediary the subscription endpoint and keys,
  which converts an end-to-end encrypted path into one with a decrypting
  middleman — forfeiting `PN-130-004` entirely.
* At `DM-102-046`'s 200 push messages per peak month, it would buy operational
  convenience CoBudget does not need.

**This is a preference with stated reasons, not a gate.** The reversal condition
is explicit: when native applications leave the deferred list, APNs and FCM
become mandatory transports with token models a fan-out layer may genuinely
simplify, and this decision is revisited rather than assumed to hold.

**Source:** `HG-102-011`; `DM-102-046`; `docs/product-plan.md` § Deferred
capabilities; `PN-130-004`.

## 5. SMS

`PN-130-007` — **SMS is a genuine provider selection, and the provider is a
carrier aggregator.**

Unlike push, SMS has no path that avoids a commercial intermediary: reaching a
mobile number requires an aggregator with carrier relationships and, in the
United States, a registered origination identity. The evaluation therefore
carries real candidates for this channel and measures them against the full
gate set.

AWS's own documentation states the property that makes this channel different
in kind: *"The SMS protocol does not support encryption... the SMS message will
not be end-to-end encrypted."* Where push gives CoBudget an encrypted path by
construction, SMS gives it none, and the content ceiling is the only control.

**Source:** `NT-92-001`, `NT-92-006`; `HG-102-011`; evaluation `EV-102-135`;
`EG-91-024`.

`PN-130-008` — **CoBudget's own suppression state is the record. A provider's
opt-out list is a cache of it, never the authority.**

`DI-91-059` places suppression state in CoBudget's own boundary, and
`NT-92-005` requires that revocation, opt-out, lifecycle change, and event
supersession suppress pending attempts. This decision fixes the direction of
authority, and the evaluation shows why it is not academic: **one carried
candidate documents that its blocked-number list can be neither read nor written
by the customer**, through either its console or its API.

The posture that survives that:

* Every opt-out signal CoBudget can observe — an inbound `STOP` relayed to
  CoBudget's webhook, a preference change in the application, a lifecycle event
  — writes CoBudget's own suppression record, and the send path consults that
  record first.
* A provider's own list is treated as a second, independent enforcement layer.
  Where CoBudget can also write it, CoBudget keeps the two consistent. Where it
  cannot, the divergence is recorded and its consequence disclosed.
* **The divergence has a customer-visible consequence** and it is named rather
  than hidden: a recipient who texted `STOP` and later re-enables SMS inside
  CoBudget remains blocked at a provider whose list CoBudget cannot clear, and
  only that recipient texting `START` restores delivery. `OI-130-002` carries it.

**Source:** `DI-91-059`; `NT-92-004`, `NT-92-005`; `HG-102-073`; CBD-74 §5.1
`CF-74-01`; evaluation finding F3.

`PN-130-009` — **The SMS body is the fixed text, and the only permitted URL is
the ordinary public application URL.**

`NT-92-002` permits *"only the ordinary public CoBudget application URL if a URL
is included"*. No link shortener, no per-recipient link, no click tracking, and
no campaign parameter — a shortened or rewritten link is a per-recipient
identifier in a message that is supposed to carry none, and `HG-102-070` gates
providers that rewrite URLs for click tracking.

Whether to include the URL at all is a live choice with a measurable cost, and
§5's segment arithmetic in the operational assessment settles it rather than
leaving it to implementation.

**Source:** `NT-92-002`; `HG-102-070`; CBD-74 §6.2.

`PN-130-010` — **Private MVP SMS is United States only, one segment per
message, and that assumption is now verified rather than assumed.**

The cost template records a Product Owner assumption of August 16, 2026 — one
segment per message, US destinations only — and requires it be restated in every
SMS cost record rather than silently inherited. This decision restates it and
adds the arithmetic the template asked for:

The `NT-92-001` body is **56 characters**, entirely within the basic GSM-7
alphabet. In GSM-7 a single segment holds 160 characters, so the body occupies
35% of one segment with 104 characters spare — the assumption holds with
generous headroom, and an English-length localized equivalent stays inside it.

**In UCS-2 it does not.** A non-Latin-script locale encodes at 70 characters per
single segment, so the *current English* body already consumes 56 of 70 with 14
spare, and adding the `NT-92-002` URL alone pushes the message to two segments.

That sharpens the template's warning rather than merely repeating it: the risk
is not a verbose translation, it is the URL. `EG-91-006` owns the localized text,
and `OI-130-004` records that the URL decision and the locale decision are the
same decision.

**Source:** Cost template §5.1 and the Product Owner assumption of August 16,
2026; `NT-92-001`, `NT-92-002`; `DM-102-047`; `EG-91-006`; operational
assessment §5.

## 6. Common delivery rules

`PN-130-011` — **Every attempt rechecks at send time, and a failed recheck
suppresses rather than sends.**

`NT-92-004` requires each attempt to recheck current account state, recipient
eligibility, membership, role and profile where relevant, lifecycle,
authorization version, and destination or token version. CBD-74 §5.3 step 5
states the same list as a delivery precondition.

A failed recheck suppresses. It does not send a degraded message and does not
fall back to another channel — `MN-74-01`'s no-fallback rule applies, and
`PN-130-015` restates it for these two channels.

**Source:** `NT-92-004`, `NT-92-005`; CBD-74 §5.3, §4.2 `MN-74-01`;
`SR-94-048`; `TB-92-012`.

`PN-130-012` — **Callbacks change delivery and preference state only, and
CoBudget authenticates and de-duplicates them at its own edge whatever the
provider offers.**

`NT-92-005` limits provider delivery, bounce, opt-out and retry callbacks to
delivery and preference state: a callback never authenticates anyone,
acknowledges an in-app instance, creates or recreates an event, or alters
product authority. CBD-74 §5.3 step 7 says the same.

Verification and replay rejection happen at the `TD-103-012` edge before the
payload becomes durable, per `TD-103-016` and `EP-92-010`. The evaluation
records that the carried candidates' mechanisms differ, and that at least one
signs with a construction whose replay protection is not documented — which the
edge compensates for rather than the design depending on it.

**Source:** `NT-92-005`; `EP-92-010`; `HG-102-072`; `TD-103-012`, `TD-103-016`;
CBD-74 §5.3 step 7; `SR-94-050`.

`PN-130-013` — **Provider event data is restricted diagnostics, not reliability
telemetry.**

A delivery event names a destination, and `DI-91-029` makes every destination
personal data. `AN-92-003` excludes destination labels from the S1 allowlist.
So delivery events route to the restricted diagnostics boundary
(`DI-91-062`, `TD-103-021`), and the ordinary operator dashboard sees only
content-free counts and outcome classes.

**Source:** `AN-92-003`; `HG-102-001`; `DI-91-029`, `DI-91-041`, `DI-91-062`;
`TD-103-021`, `TD-103-022`; CBD-91 §4 rule 5.

`PN-130-014` — **The delivered copy is not CoBudget's, and the ceiling is the
control.**

`NT-92-006` treats lock screens, notification centers, paired devices, carrier
systems, SMS forwarding, backups and screenshots as recipient- and
platform-controlled copies, and applies the generic-body rule **even when a
platform claims previews are hidden**. CBD-74 §6.4 fixes the copy that must
accompany channel settings: it must state plainly that these surfaces are
outside CoBudget's control, and must not claim a channel is private.

This is why `PN-130-001` is the actual control. A message that cannot be
recalled, and that a carrier may retain, is safe only because it never carried
anything worth retaining.

**Source:** `NT-92-006`; CBD-74 §6.4; `DI-91-049`; `SR-94-053`; `EG-91-024`.

## 7. Reliability

`PN-130-015` — **In-app is mandatory and unaffected, and neither channel is a
fallback for the other or for email.**

CBD-74 §5.3 fixes the ordering: the shared event is created, eligibility is
computed, the mandatory in-app instance is created for every eligible recipient
*without consulting any preference*, and only then is external delivery
scheduled. An external failure at any step never removes, delays, or duplicates
the in-app instance.

No channel escalates to another. Push failure does not send an SMS, SMS failure
does not send an email, and email failure does not send either. Each is
separately opt-in under `NT-92-004`, and a fallback would deliver on a channel
the recipient did not choose.

**Source:** CBD-74 §5.3, §4.2 `MN-74-01`; `NT-92-004`; `TD-103-006`,
`TD-103-008`; `TB-92-012`; `CL-92-002` — the client holds no queue of its own.

## 8. Exit

`PN-130-016` — **Exit differs by channel, and one channel has nothing to exit.**

* **Push**: there is no provider contract, no stored vendor state, and no
  migration. Subscriptions are held by CoBudget and addressed directly. If
  `PN-130-006` is ever reversed and a fan-out layer adopted, exit becomes
  re-subscription for every installation — which is a reason to weigh that
  decision as a portability question rather than a convenience one.
* **SMS**: exit means porting or re-provisioning the origination identity,
  re-registering it for US A2P messaging, and reconstructing suppression from
  CoBudget's own `DI-91-059` state. The re-registration is the slow part and it
  is a cost as well as a delay.

**Source:** `WR-102-023`–`WR-102-026`; `DI-91-059`; `TD-103-001`, `TD-103-027`;
operational assessment §4.

## 9. Gate disposition carried by this specification

| Gate | What this specification settles | What remains a provider question |
| --- | --- | --- |
| `HG-102-014` (Config) | No S4 value enters any provider surface | Nothing; this gate is CoBudget's |
| `HG-102-075` (Config) | `PN-130-002` — neither channel is an authority channel | Nothing; this gate is CoBudget's |
| `HG-102-068` | `PN-130-001` — the fixed body | Whether the provider injects or substitutes content |
| `HG-102-069` | `PN-130-001` — no descriptive labels | Whether the provider *requires* one |
| `HG-102-070` | `PN-130-009` — no shortened or rewritten links | Whether the provider rewrites URLs for tracking |
| `HG-102-071` | `PN-130-005` — purge on invalid-registration signal | Whether the provider reports the signal |
| `HG-102-072` | `PN-130-012` — verify and de-duplicate at the edge | Whether the callback is authenticatable at all |
| `HG-102-073` | `PN-130-008` — CoBudget's state is the record | Whether the provider's list is readable and writable |
| `HG-102-074` | `PN-130-014` — the ceiling, not a custody promise | Whether platform retention is disclosed |

## 10. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-130-001 | `PN-130-003` records that Private MVP has no push provider to select. The CBD-130 ticket is titled *"Evaluate and select the push and SMS provider"*. | The ticket's premise holds for SMS and not for push. This is a scope observation rather than a defect — the gates still apply to the push transports, and the evaluation measures them. `OI-130-007` carries the ticket wording. |
| OI-130-002 | `PN-130-008`'s divergence has a customer-visible consequence: on a provider whose opt-out list CoBudget cannot write, a recipient who texted `STOP` and later re-enables SMS in CoBudget stays blocked until they text `START`. | The copy that must explain this does not exist. `EG-91-006` and `FU-95-017` own it, and no SMS ships without it. |
| OI-130-003 | Whether to include the `NT-92-002` URL in the SMS body is unresolved, and it is the decision that determines whether a non-Latin locale costs one segment or two. | `PN-130-010` supplies the arithmetic; the choice is a Product Owner decision taken with `EG-91-006`, not an implementation detail. |
| OI-130-004 | `PN-130-010`'s one-segment assumption is verified for GSM-7 and **fails for UCS-2 with a URL**. | Private MVP is US-English only, so the assumption holds now. It expires the moment a non-Latin locale is added, and the cost record says so rather than carrying the assumption forward silently. |
| OI-130-005 | `PN-130-006` declines a push fan-out layer, and that decision is coupled to native apps being deferred. | Revisit when native applications leave the deferred list. APNs and FCM then become mandatory transports and the trade changes. |
| OI-130-006 | `EG-91-024` — the SMS and push threat surface including SIM-swap, mirroring, and lock-screen behaviour — is open, and `EG-91-006` owns template and preview policy. | Consumed here as explicit unknowns. `PN-130-004` and `PN-130-014` are written so that neither depends on the answer. |
| OI-130-007 | This specification has been reviewed by no one but its author, and nothing in it is built. | Design record only. No push or SMS ships from this document. |
