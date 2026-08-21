# CBD-130 — Channel Operations, Registration, Cost, and Exit Assessment

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Records the operational and cost half of CBD-130 against the approved CBD-102 cost template. **It contains no prices**; §5 records every line as unknown under cost rule `CR4`. §2.2 carries the message-to-segment conversion CBD-130's acceptance criteria require, computed rather than assumed. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-130](https://cobudget.atlassian.net/browse/CBD-130) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Push and SMS Delivery Boundary Specification v1.0; Candidate Shortlist and Gate Evaluation v1.0; Acceptance Criteria Traceability v1.0 |
| Confluence page | [CBD-130 — Channel Operations, Registration, Cost, and Exit Assessment](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/13828097) |
| Repository baseline | `d7c3b29` |
| Last updated | August 21, 2026 |

## 1. Purpose

CBD-130 requires a cost record naming the tier priced and the gates that forced
it, **with SMS converted from messages to billable segments**, and an assessment
of what operating these two channels costs in effort as well as money. This
document is both.

## 2. Volume, and the two conversions

| Input | Base | High | Source |
| --- | --- | --- | --- |
| Devices per subject | 1.5 | 2.0 | `DM-102-040` |
| Registered push tokens | 75 | 400 | `DM-102-041` |
| Push opt-in share | 0.35 | 0.45 | `DM-102-042` |
| SMS opt-in share | 0.10 | 0.15 | `DM-102-043` |
| Push messages, year 1 | 1,512 | 11,232 | `DM-102-044` |
| SMS messages, year 1 | 432 | 3,744 | `DM-102-045` |
| **Peak monthly push** | **200** | **1,400** | `DM-102-046` |
| **Peak monthly SMS** | **60** | **500** | `DM-102-047` |

Two conversions stand between these rows and a cost record. One the cost
template warned about; the other it could not have anticipated.

### 2.1 The push opt-in share acquires a precondition the demand model did not have

`DM-102-042` sets push opt-in at 0.35 of recipients at Base. That figure was set
when push meant a native application, where opting in is a single permission
prompt.

Private MVP push is Web Push to an installed progressive web app
(`PN-130-003`), and on Apple's platform the funnel has an extra step: WebKit
records that Web Push is available only to *"Web Apps added to the Home Screen"*
(`EV-102-138`). An iOS recipient must therefore install the web app **and then**
grant notification permission. Two conversions, not one.

**This is not a correction to `DM-102-042`.** That figure is approved and fixed
for the duration of CBD-103–107 and CBD-130, and changing a demand row
mid-evaluation would invalidate comparison the same way changing a weight would.
It is an interaction recorded so that whoever eventually measures adoption knows
the model assumed a one-step funnel where iOS has two. `OI-130-017` carries it,
and the consequence is bounded: push costs nothing per message (§3.1), so a
lower-than-modelled opt-in share costs reach rather than money.

### 2.2 The message-to-segment conversion, computed

Cost template §5.1 is explicit that *"An SMS figure that does not state its
assumed segments-per-message and destination scope is not comparable between
providers"*, and requires the Product Owner assumption of August 16, 2026 — one
segment per message, US destinations only — be **restated in every SMS cost
record** rather than silently inherited.

Restated here, and then verified rather than left as an assumption.

`NT-92-001` fixes the body: *"You have a new CoBudget update. Open CoBudget to
review."* That is **56 characters**, every one of them in the basic GSM-7
alphabet, so none consumes the two character-slots the GSM-7 extension table
requires.

| Encoding | Single-segment limit | Body alone | With the `NT-92-002` URL |
| --- | --- | --- | --- |
| **GSM-7** — Latin scripts | 160 | 56 chars → **1 segment**, 104 spare | ~82 chars → **1 segment**, ~78 spare |
| **UCS-2** — non-Latin scripts | 70 | 56 chars → **1 segment**, 14 spare | ~82 chars → **2 segments** |

**The assumption holds for Private MVP**, which is US English-only, with
generous headroom: the body uses 35% of a GSM-7 segment, so an English-length
localized equivalent stays comfortably inside one.

**It fails the moment a non-Latin locale is added**, and the arithmetic sharpens
the template's warning rather than repeating it. The template anticipated a
longer translation tipping past the boundary. The real trigger is smaller than
that: in UCS-2 the *current English* body already occupies 56 of 70 characters,
so **the permitted application URL alone doubles the line** before any
translation is considered.

So `DM-102-047`'s 60 peak-month messages equal **60 billable segments** at Base
and 500 at High, US destinations only, English GSM-7 body — and that equality is
the first thing to recheck when `EG-91-006` approves localized text.
`OI-130-004` in the boundary specification already records that the URL decision
and the locale decision are the same decision.

## 3. Operating the two channels

### 3.1 Push costs nothing to operate and has no vendor to manage

This is the only channel in the entire CBD-15 provider set with no provider
relationship, no contract, no account, no credential, and no bill:

* **No registration.** Apple requires no developer-programme membership
  (`EV-102-138`); Mozilla and Google require none either.
* **No per-message charge**, because there is no commercial intermediary.
* **No callback endpoint to secure**, because delivery status is the synchronous
  HTTP response to CoBudget's own POST (`PN-130-005`).
* **No suppression state to reconcile.** A revoked permission surfaces as a
  `410` on the next send, and CoBudget deletes the registration.

What CoBudget does operate is a VAPID key pair and the subscription store. The
key pair is `DI-91-051` material in the `TD-103-017` boundary; the store is
`DI-91-073` registrations purged on the signals `PN-130-005` lists.

The one genuine operational risk is **silent reach decay**: registrations expire,
browsers are reinstalled, and permissions are revoked, all without notifying
CoBudget until the next send. `WR-102-029` scores alerting burden, and the honest
position is that this channel generates almost none — which is a virtue until it
means nobody notices that push stopped working. Monitoring the ratio of
successful sends to `410` responses is the compensating practice, and
`OI-130-018` records that no threshold for it is approved.

### 3.2 SMS's real operating cost is registration, not messages

United States A2P messaging requires a registered origination identity before
any message is delivered at scale — brand and campaign registration for 10DLC,
or verification for a toll-free number. This is the dominant operational fact of
the channel, and it is unlike anything in the other five categories:

* **It is a lead time, not just a fee.** Registration is reviewed by carriers
  and registries, not provisioned on demand, so it sits on the critical path to
  any external SMS release.
* **It requires describing CoBudget's use case to a third-party registry.** This
  is a one-time disclosure about the *product*, not a per-message payload, so
  `NT-92-003` is not engaged — that contract constrains what the delivery
  boundary sends per message. But it is a disclosure to a party outside the
  `HG-102-011` subprocessor list as usually understood, and `OQ-130-012` asks
  what each candidate's registration actually discloses and to whom.
* **It is a recurring floor independent of volume** — see §5.3, where it is the
  headline cliff.
* **It is per origination identity**, so it is also an exit cost
  (`PN-130-016`).

`WR-102-027`–`WR-102-031` score ongoing solo-operator burden. Across the two
channels the honest position is asymmetric in a way the dimension's single score
cannot express: push is near-zero effort, SMS carries a registration process
with external review. `OI-130-019` records it rather than letting one subscore
average the two into a shape that describes neither.

### 3.3 Monitoring

Follows `PN-130-013` and the three-boundary telemetry model:

| Surface | Content | Boundary |
| --- | --- | --- |
| Ordinary operator dashboard | Attempt counts, outcome classes, `410` rate, suppression-list size — content-free | S1; `DI-91-041`; `TD-103-021` |
| Provider delivery events | Destination number, carrier status codes | Restricted diagnostics; `DI-91-062`; `TD-103-021` |
| Push send results | Subscription endpoint and HTTP status | Restricted diagnostics; the endpoint is a `DI-91-073` registration |
| Suppression state | Destination plus reason | Application state; `DI-91-059` — not telemetry |
| What members see | Nothing. Push and SMS are personal channels, not budget-space state | `DI-91-029` is the recipient's own preference data |

The last row is worth stating because it differs from every other category: a
delivery failure on these channels is **not** a budget-space health signal and
never appears on a shared surface. `CBD-74 §7` item 6 already forbids showing
another person's read, acknowledgement, or dismissal state; the same reasoning
covers their delivery failures.

### 3.4 Outage and failure behaviour

| Failure | Behaviour under the posture |
| --- | --- |
| Push service outage | Sends fail; the send job retries under `TD-103-008` bounds. In-app instances already exist and are unaffected (`PN-130-015`) |
| SMS provider outage | Same. No fallback to push or email — `PN-130-015` forbids it, because each channel is separately opt-in |
| Registration expiry or revocation | Surfaces as `410`; the registration is deleted and the recipient simply stops receiving push until they re-subscribe |
| Carrier filtering | Messages accepted by the provider and silently dropped by the carrier. **The worst failure mode on this channel**, because the provider reports success. Detectable only in aggregate, and `OQ-130-013` asks what each candidate reports |
| Opt-out divergence | On a provider whose list CoBudget cannot read, CoBudget's own state and the provider's can disagree — evaluation §7.3, and the reason `HG-102-073` fails on one candidate |
| A2P registration suspended | Total loss of the SMS channel until re-registered, with the lead time of §3.2. In-app and email are unaffected |

### 3.5 Sandbox, and the three kinds of claim

CBD-130's acceptance criteria require that sandbox, contractual and API
capability, observed quality, and assumptions be distinguished. Applied here:

| Kind of claim | How it is recorded | Example |
| --- | --- | --- |
| **API capability** | An `EV-102-*` record at Documented class against a named page | C2's opt-out operations (`EV-102-136`) |
| **Sandbox behaviour** | Not yet recorded. Reserved at `EV-102-141`–`149` | The forged-callback rejection fixture |
| **Observed quality** | Not recorded. Carrier deliverability cannot be desk-researched, and §3.4 records that it is barely observable even in production | Carrier filtering rates |
| **Assumption** | Stated as an open question or open item, never as a finding | The push opt-in funnel — §2.1 |
| **Contractual** | Not obtained for any candidate | Retention terms, subprocessor lists, price |
| **Computed** | Arithmetic from an approved input, shown so it can be rechecked | §2.2's segment conversion |

The last row is new in this package. §2.2 is not evidence about a provider — it
is a calculation from `NT-92-001`'s approved text, and it is shown rather than
asserted so that a reader can redo it when `EG-91-006` changes the text.

## 4. Exit

Per `PN-130-016`, exit differs by channel more sharply than in any other
category:

1. **Push has nothing to exit.** No contract, no vendor state, no migration.
   Subscriptions are CoBudget's and are addressed directly. This is the strongest
   portability position in the entire provider set, and it exists because
   `PN-130-006` declined a fan-out layer — a decision that would look like
   convenience-forgone until exit, when it looks like the reason there is nothing
   to unwind.
2. **SMS exit is the registration again.** Porting or re-provisioning the
   origination identity, re-registering it for A2P, and reconstructing
   suppression from CoBudget's own `DI-91-059` state. The re-registration lead
   time of §3.2 is the exit duration, and on a provider whose opt-out list
   CoBudget cannot read, the suppression state cannot be exported either — only
   rebuilt from CoBudget's own record, which `PN-130-008` is why it exists.
3. **Exit cost** — `CT-102-014` records re-registration rather than egress.
   There is no data to move.

## 5. Cost

### 5.1 No prices, and here that is a research gap rather than a structural one

No price was retrieved for any candidate and every `CT-102-*` line is `UNKNOWN`
under `CR4`.

**This differs from CBD-107 in a way worth stating.** Financial aggregators do
not publish transaction-aggregation pricing, so that category's `CR4` unknowns
could not be closed by reading at all. SMS pricing is different: per-message
rates, carrier surcharges, and registration fees are published by all three
candidates. The unknowns here are a retrieval gap, and `OQ-130-014` closes them
without a single provider conversation.

That makes this the **easiest cost record in the set to complete** and the one
whose completion matters least, for the reason §5.3 gives.

### 5.2 Cost record structure

One record per candidate; identical structure. Every unlisted `CT-102-*` line is
`UNKNOWN`.

| Field | C2 AWS | C3 Azure | C10 Twilio |
| --- | --- | --- | --- |
| Eligibility verdict | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | **`INELIGIBLE`** — priced for completeness only, per `CR3` |
| Tier priced | `UNKNOWN` — no gate is yet known to force a tier | `UNKNOWN` — but the Opt-Out Management API is in preview, so the production tier may not yet include it | `UNKNOWN` |
| **CT-102-004 minimum committed spend** | `UNKNOWN` — **the A2P registration floor is the term that matters**, §5.3 | `UNKNOWN` | `UNKNOWN` |
| CT-102-006 primary unit × Base | `UNKNOWN` × **60 segments** (`DM-102-047`, converted at §2.2) | `UNKNOWN` × 60 segments | `UNKNOWN` × 60 segments |
| Segments-per-message assumed | **1**, verified at §2.2 for GSM-7 | 1 | 1 |
| Destination scope assumed | **United States only** | United States only | United States only |
| CT-102-007 secondary units | Carrier surcharges; origination identity rental | Carrier surcharges; number rental | Carrier surcharges; number rental |
| Push cost | **Zero.** No provider, no contract, no per-message charge — §3.1 | Zero | Zero |
| CT-102-014 exit cost | Re-registration, not egress — §4 | Same | Same |

Per `CR7`, every figure above is quoted at Base. C10's record is included
because `CR3` requires an `INELIGIBLE` provider's cost be recorded for
completeness and **not compared** — being cheapest is not a route back into
consideration.

### 5.3 Cost cliffs specific to this category

| Cliff | Why it is a cliff |
| --- | --- |
| **The A2P registration floor dominates absolutely** | Registration is a recurring charge per campaign or per verified number, **independent of volume**. At `DM-102-047`'s 60 messages in a peak month, the per-message spend is trivially small whatever the rate, so the floor is essentially the entire bill. `CT-102-004`, not `CT-102-006`, is the watch line — and a comparison built on per-message rates would compare the least significant term, exactly as cost template §1 warns |
| **Carrier surcharges sit on top of the provider rate** | A per-message carrier fee is levied independently of the aggregator's price and varies by carrier. A quoted rate that excludes it understates the message cost, and all three candidates publish them separately |
| **The segment doubling on locale change** | §2.2: a non-Latin locale plus the permitted URL doubles every SMS. At Private MVP volume the absolute effect is small; the reason to record it is that it arrives silently with a translation, not with a pricing change |
| **Short codes are an order of magnitude more expensive and are not needed** | A short code carries a large recurring lease and a long provisioning review. At 60 messages a month a 10DLC or toll-free identity is sufficient, and the cliff is recorded so the option is declined deliberately rather than priced by accident |
| **Push is genuinely free, and that is not a rounding error** | It is the only channel in the provider set with no floor at all, and the comparison between the two channels in this one category is the starkest cost contrast in CBD-15 |
| **A preview feature may not be priced yet** | C3's Opt-Out Management API is in preview without an SLA (`EV-102-139`). Whatever it costs at general availability is not knowable now, and `OI-130-020` records that a cost model built on a preview feature is a model of a product that does not yet exist in production form |

## 6. Open questions

| ID | Question | Action |
| --- | --- | --- |
| OQ-130-012 | What does US A2P registration disclose about CoBudget's use case, to which registry and carriers, and is that party inside or outside the `HG-102-011` subprocessor boundary? | Retrieve ×3, then confirm contractually. §3.2 records why this is a disclosure question rather than an `NT-92-003` payload question |
| OQ-130-013 | What does each candidate report when a carrier accepts and then silently filters a message? | Retrieve ×3. §3.4 records this as the worst failure mode on the channel, and the answer determines whether it is detectable at all |
| OQ-130-014 | All `CT-102-*` lines ×3 — per-message rate, carrier surcharges, origination-identity rental, and the A2P registration floor | Retrieve. §5.1 records that this needs reading rather than provider contact, unlike CBD-107 |
| OQ-130-015 | Whether any push service publishes a TTL ceiling or retention policy for undelivered encrypted payloads | Retrieve per transport. Bounds the exposure rather than describing it, since the payload is ciphertext |
| OQ-130-016 | Support model and response commitments ×3, and whether support staff can see message bodies or destinations | `WR-102-019`/`020` score support; `HG-102-007` gates access. `EV-102-134` shows one candidate can cut support off from bodies |

## 7. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-130-017 | `DM-102-042`'s 0.35 push opt-in share assumes a one-step permission prompt. Web Push on iOS requires a Home Screen install **and then** a permission grant. | Recorded as an interaction, **not** a correction — the demand row is approved and fixed for the duration of the CBD-15 evaluations. The consequence is bounded because push costs nothing per message: a lower opt-in share costs reach, not money. |
| OI-130-018 | §3.1 identifies silent reach decay as push's only real operational risk, detectable by the ratio of successful sends to `410` responses. | No threshold is approved and none is invented here. `ME-94-010` and CBD-94 own alerting values, consistent with how CBD-106 handled the same question for email. |
| OI-130-019 | The solo-operator dimension scores one number across two channels whose burden differs by an order of magnitude — push near zero, SMS carrying an externally reviewed registration. | `WR-102-027`–`031` will produce an average describing neither channel. CBD-108 should read the subscore alongside §3.1 and §3.2 rather than instead of them. Not a rubric change; the weights are fixed. |
| OI-130-020 | C3's Opt-Out Management API is in preview without an SLA, and `HG-102-073` depends on it. | A cost and capability model resting on a preview feature is a model of a product that does not yet exist in production form. `OQ-130-011` re-verifies by November 21, 2026, sooner than the register's usual Documented shelf life. |
| OI-130-021 | No budget ceiling exists (`OI-102-017`), and this is the category least able to be constrained by one — the A2P floor is not negotiable downward by sending less. | The floor is paid whether CoBudget sends 60 messages or none. That makes SMS the one channel whose cost is genuinely a decision to offer the channel at all, and `CT-102-004` is the figure that decision rests on. |
