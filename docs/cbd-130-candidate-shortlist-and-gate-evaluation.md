# CBD-130 — Push and SMS Candidate Shortlist, Gate Evaluation, and Rubric Scores

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Applies the approved CBD-102 method to the push transports and to SMS candidates. It records the CBD-15 set's **first `FAIL` and first `INELIGIBLE` verdict**, and publishes rubric scores as CBD-130's deliverables require — with §8.4 stating plainly what those numbers do and do not measure. |
| Document version | 1.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-130](https://cobudget.atlassian.net/browse/CBD-130) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Push and SMS Delivery Boundary Specification v1.0; Operational and Cost Assessment v1.0; Acceptance Criteria Traceability v1.1 |
| Confluence page | [CBD-130 — Push and SMS Candidate Shortlist, Gate Evaluation, and Rubric Scores](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/13795329) |
| Repository baseline | `d0d5bb1` |
| Last updated | August 21, 2026 |

## 1. Purpose

CBD-130 requires a gate evaluation per candidate with an eligibility verdict,
rubric scores with per-dimension subscores and an evidence-confidence profile,
and evidence register entries. This document is all three, measured against the
23 CBD-102 hard gates that apply to category **N** — the 15 cross-category **X**
gates plus the 8 **N** gates — and against the posture the companion boundary
specification describes.

**This evaluation differs from its five siblings in two ways**, both required by
the ticket rather than chosen: it publishes rubric scores, which no sibling did,
and it covers a category where one of the two channels has no provider to
select. §3 and §8.4 explain both.

## 2. What this document does not do

* It selects nothing. `CR3` and rubric `R1` settle order by verdict, not by
  score, and §8.4 records why the scores here settle nothing either.
* It approves no exception. `EX-102-001` reserves that to the Product Owner, so
  §7.3 records the residual and requests the decision rather than making it.
* It provisions nothing, sends nothing, and registers no origination identity.
* It closes no `EG-91-*` gap. `EG-91-006` and `EG-91-024` remain open.

## 3. Two channels, two different questions

The category bundles push and SMS. They are not the same kind of problem, and
the boundary specification's `PN-130-003` records why:

* **Push has no provider to select.** Private MVP has no native application —
  `docs/product-plan.md` defers it — so push is Web Push to an installed PWA,
  delivered by the push service the recipient's browser chooses. §6.3 measures
  those transports against the gates as unavoidable subprocessors. There is no
  candidate column because there is no choice.
* **SMS has a real selection.** §6.2 carries three candidates and measures them
  against the full gate set.

The gate catalog does not distinguish the two channels within category N, which
produces the scoping problem finding F5 records.

### 3.1 The evidence ceiling

Ten of the 23 applicable pass tests are observation-bound: four **X** gates
(`HG-102-001`, `HG-102-004`, `HG-102-012`, `HG-102-015`) and six of the eight
**N** gates — `HG-102-068` through `HG-102-073`.

**Only one category-N gate can be settled from documents at all**: `HG-102-074`,
carrier and platform retention. That is the thinnest documentary base of any
category in the CBD-15 set, and §8.4 shows exactly what it does to the rubric
scores the ticket asks for.

`OI-103-008` authorizes non-production evaluation accounts on synthetic data.
For this category the guardrail has a sharper edge than elsewhere and
`OI-130-008` records it: executing these pass tests means **sending SMS to a
real handset**, because a carrier opt-out keyword cannot be observed to register
in a simulator. The destination must be a device the evaluator controls, and no
customer number appears in any test.

### 3.2 Symmetry

Three questions were put to all three SMS candidates and answered from each
vendor's own documentation: opt-out list readability and writability
(`EV-102-132`, `EV-102-136`, `EV-102-139`), platform retention of message
content (`EV-102-134`, `EV-102-135`, `EV-102-140`), and callback authenticity —
answered for one and unretrieved for two.

**Two asymmetries are recorded rather than smoothed.** Callback authenticity
(`HG-102-072`) was retrieved for C10 only, and encryption and network isolation
(`HG-102-010`, `WR-102-005`) for C2 only, because each vendor organises that
material differently and the retrieval followed the gate rather than the vendor.
`OQ-130-003` and `OQ-130-004` carry both.

**`OQ-130-004` is half-closed at v1.1.** The CBD-103 cross-category documentary
pass of August 21, 2026 supplies Azure's encryption position at provider level
(`EV-102-162`, `EV-102-163`), so the encryption half of that asymmetry no longer
favours C2 by retrieval alone. Two things did not change. The **network
isolation** half is still C2-only — MACsec is link-layer encryption between
datacentres, not the private-endpoint option `WR-102-005` scores — and **C10 was
not covered by the pass at all**, so the asymmetry `OQ-130-004` records is now
C10's alone rather than shared between two candidates. Neither is allowed to advantage a
candidate: C2's `HG-102-010` pass carries a limitation stating the same question
was not put to the others, and C10's documented signature weakness is **not**
counted against it relative to candidates whose mechanism is simply unknown.

## 4. Screening

### 4.1 The screen

Category N screens on one published property: **does the provider deliver A2P
SMS to United States mobile numbers under a registered origination identity,
with programmatic send, delivery callbacks, and opt-out handling?**

Push is not screened, because §3 establishes there is nothing to screen.

### 4.2 Carried into gate evaluation

| ID | Candidate | Composition evaluated |
| --- | --- | --- |
| **C2** | AWS End User Messaging SMS | Origination identity in a single US region; opt-out list with automatic `STOP` handling; delivery events |
| **C3** | Azure Communication Services SMS | ACS resource in a US data location; Opt-Out Management API; Event Grid delivery reports |
| **C10** | Twilio Programmable Messaging | Messaging Service with a US origination identity; Advanced Opt-Out; status callbacks |

`C2` and `C3` are provider identities carried from the earlier categories.
**`C10` is a new provider identity**, introduced here for the standalone SMS
slot. Other US aggregators with published documentation — Vonage, MessageBird,
Sinch and others — were **not evaluated and are not screened out**;
`OQ-130-005` carries the option of a fourth.

### 4.3 The push transports, which are not candidates

| Transport | Reached when | Chosen by |
| --- | --- | --- |
| Apple push service | Recipient uses Safari and has added the web app to the Home Screen | The recipient's browser |
| Mozilla push service | Recipient uses Firefox | The recipient's browser |
| Google push service | Recipient uses Chrome or a Chromium browser | The recipient's browser |

CoBudget contracts with none of them and, per `EV-102-138`, does not even
register with one: WebKit records that *"You do not need to be a member of the
Apple Developer Program to use it."*

## 5. Gate evaluation method

Outcomes are `PASS`, `UNPROVEN`, or `FAIL` per evidence register §3.3. The two
Config gates — `HG-102-014` and `HG-102-075` — are recorded `PASS (design)`
where the boundary specification settles CoBudget's side.

A `FAIL` requires evidence the property is absent, and §3.2 records that a
vendor's own admission is sufficient for that. One gate below meets it.

## 6. Comparison matrix

`OBS` marks a gate blocked on the §3.1 observations. `DOC` marks one
documentation can settle. `CFG` marks a Config gate.

### 6.1 Cross-category gates

| Gate | Kind | C2 AWS | C3 Azure | C10 Twilio | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-001 telemetry allowlist | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. |
| HG-102-002 correlation identifiers | DOC | `PASS` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-130-006` **Asked of the hyperscalers at v1.1 and it separates them.** C2 `EV-102-177`: a 96-bit random trace ID plus timestamp scoped to *"a single client request"*, with `user` an **optional** field the customer populates — no default persistence mechanism exists. C1 `EV-102-179`: W3C `traceparent`, 128-bit, and no end-user identifier mentioned anywhere. C3 `EV-102-178` is the exception and stays `UNPROVEN`: `operation_Id` is per-operation and clean, but the same data model defines an anonymous `user_Id` that the JavaScript SDK *"typically persists... in a user cookie"* and that feeds *"sampling score generation"*. Not required, and engaged by the browser SDK rather than server-side telemetry, so the reading is `OI-103-021` and not a `FAIL`. |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-130-006` |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. |
| HG-102-005 no standing credential | DOC | `UNPROVEN` | `PASS` | `UNPROVEN` | **Settled for C3 at v1.1** from the CBD-103 cross-category pass, reused rather than re-retrieved. The administrative access model for ACS is the Azure and Entra model, not an ACS-specific one. C3 `EV-102-011`: Privileged Identity Management — native, just-in-time, time-bound with start and end dates, approval, justification, downloadable audit history. C2 `EV-102-008`: AWS ships no native equivalent and validates four partner products — not a `FAIL`, but reachable only by buying a third party (`OI-103-017`). C10 not retrieved. |
| HG-102-006 separable custody | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Partial material at v1.1 and none of it sufficient for the four-way split. C2 `EV-102-009`: under AWS owned keys — the default for new services since 2021 — key policies cannot be changed and key activity is *"Not viewable by the customer"*, which is the **general form** of the service-level limitation `EV-102-135` already recorded for End User Messaging (*"You can't provision and use your own AWS KMS or other keys"*). C3 `EV-102-163`: Managed HSM is *"a customer-owned security domain where Microsoft has no access to your key material"*. **Firm** under catalog §2.5. `OI-102-022` still gates practice. **Asked symmetrically of all three hyperscalers at v1.1 and the answer is uniform**: backup read, restore execution and key use are separable on every one of them, and **none documents a restore-approval permission at all**. The hosting evaluation records the comparison and the reading question it raises at `OI-103-020` — read strictly, this firm gate is unsatisfiable by any hyperscaler, which mirrors the carrier half of `HG-102-074`. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `EV-102-134` records that C10's redaction blocks *"internal customer support systems"* — which bears on this gate but describes an opt-in control rather than the default staff model. `OI-102-005` flags this gate as assertion-prone. |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Unchanged at v1.1, and now specific rather than general for the two hyperscalers: both trust pages retrieved by the cross-category pass were checked for this gate and **neither addresses impersonation, break-glass, or unrestricted query** — `OQ-103-023`. C10 not retrieved. |
| HG-102-009 staff-access evidence | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | **Characterized at v1.1 for the two hyperscalers, and neither position is good.** `EV-102-012` retrieves the complete Customer Lockbox supported-services list: **Azure Communication Services does not appear on it**, so C3 has no Lockbox coverage for this candidate. C2 `EV-102-010`: AWS's customer-visible record is scoped to *"on behalf of"* service operations — the `OI-103-018` `FAIL` question. Neither flips, because absence from a list is not evidence of absence from the product. No aggregator equivalent of a cloud access-transparency log is known for C10; `OQ-130-007`. |
| HG-102-010 encryption in transit and at rest | DOC | **`PASS`** | `PASS` | `UNPROVEN` | **The `OQ-130-004` asymmetry is closed for C3 at v1.1, and C2's own pass is repaired.** C2 `EV-102-135` (TLS 1.2 in transit, at rest under service-owned KMS keys, custody stated explicitly including that no customer-managed key is possible) **plus `EV-102-009`, which supplies the algorithm `EV-102-135` did not name** — the derived encryption key is *"A 256-bit AES-GCM key only in memory of an HSM"*. At v1.0 this row passed a gate requiring *"the algorithm and key custody stated"* on a record whose own limitation said the at-rest cipher was not named; that gap is now filled rather than left standing. C3 `EV-102-162` (*"A symmetric AES-256 key"*, KEK never leaving Key Vault) and `EV-102-163` (MACsec on by default within and between regions, AES-256, SHA-384). C10 not retrieved — the asymmetry `OQ-130-004` records is now C10's alone. |
| HG-102-011 region and subprocessors | DOC | `PASS` | `UNPROVEN` | `UNPROVEN` | **Settled for C2 at v1.1, and it changes how this category's candidate set should be read — see §7.7.** `EV-102-007` is the dated, enumerated AWS-wide list the gate asks for: "Last Updated: July 28, 2026" on the page, 30-day advance-notice commitment, region scoping. Combined with `EV-102-135`'s region selection and its carrier disclosure, C2's obligations under this gate are met. **The list names Twilio, Inc. as an AWS subprocessor for "A2P messaging"**, alongside Cequens, Infobip, Vonage/Nexmo, Route Mobile, Sinch, Tanla and TeleSign. C3 keeps `EV-102-140`'s geography list but the Microsoft Online Services Subprocessor List was **not obtained** (`OQ-103-018`). C10's own list was not retrieved. `OQ-130-008` |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. The v1.1 pass sharpened why this is `UNPROVEN` rather than `FAIL`: the pass test's *"Silence fails"* means the **provider's** silence once its contract has been read, not CoBudget's failure to read it. This is the one gate that could fail every candidate in every category at once — `OQ-103-024`. **The contracts were read at v1.1 and the position is precise rather than blank.** Google's addendum states a recovery window and a 180-day expiry covering existing copies but defers region to terms not retrieved; the AWS addendum could not be parsed; and the Microsoft retention page that appears to answer this is scoped to Microsoft 365, not Azure. `OQ-103-025` names the three retrievals that would settle it. None of the three is provider silence yet, which is why this is `UNPROVEN` and not `FAIL`. |
| HG-102-014 S4 out of ordinary surfaces | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | Boundary specification §9; `TD-103-017`, `TD-103-022`. Non-exceptable. |
| HG-102-015 append-only evidence | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. `TD-103-030` places CoBudget's own audit evidence in the datastore. |

### 6.2 Push and SMS gates, measured against the SMS candidates

| Gate | Kind | C2 AWS | C3 Azure | C10 Twilio | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-068 fixed content-free body | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1 — a delivered message must be inspected on the device. No candidate is documented to append content to an SMS body. |
| HG-102-069 minimum provider payload | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. No candidate is documented to *require* a descriptive campaign or topic label on a send. |
| HG-102-070 no authority in the destination | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. `PN-130-009` forbids shortened and rewritten links on CoBudget's side; whether a provider rewrites is the observation. |
| HG-102-071 token results reported and deletable | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | **The gate's subject does not exist on this channel** — SMS has no registration token. The substantive answer is in §6.3, where Web Push reports invalid subscriptions by HTTP status. Recorded `UNPROVEN` rather than invented, and finding F5 carries the scoping problem. |
| HG-102-072 authenticated, replay-safe callbacks | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3.1. `EV-102-133`: C10 signs with HMAC-SHA1 over the URL and sorted parameters keyed by the account auth token, and **documents no replay protection**. C2 and C3 mechanisms not retrieved — `OQ-130-003`. |
| HG-102-073 programmatic opt-out and suppression | OBS | `UNPROVEN` | `UNPROVEN` | **`FAIL`** | `EV-102-136`: C2 documents full read and write — automatic `STOP` handling, `PutOptedOutNumber`, `DeleteOptedOutNumber`, list and search, plus self-managed mode. `EV-102-139`: C3 documents an API for *"adding, removing, or checking opt-out entries"*, **in preview without an SLA**. `EV-102-132`: **C10 documents that it offers neither** — see §7.3. |
| HG-102-074 carrier and platform retention disclosed | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | The platform half differs sharply — `EV-102-140` gives C3 an explicit non-retention statement, `EV-102-134` gives C10 the most detailed disclosure, `EV-102-135` leaves C2's period unstated. **The carrier half is unmet by all three and may be unmeetable** — finding F4. |
| HG-102-075 not an authority channel | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `PN-130-002`. |

### 6.3 The push transports, measured as subprocessors

Not a candidate comparison. These are the services Private MVP push necessarily
traverses, measured against the gates that have meaning for them.

| Gate | Position | Evidence |
| --- | --- | --- |
| HG-102-068 fixed body | **Structurally satisfied.** The payload is encrypted to the subscription's keys before it leaves CoBudget, so a push service cannot append, substitute, or decorate a body it cannot read | `EV-102-137` |
| HG-102-069 minimum payload | The protocol carries the endpoint, the encrypted body, and headers such as TTL and urgency. No descriptive label is required | `EV-102-137` |
| HG-102-070 no authority in the destination | `PN-130-002`; the tap target is a generic authenticated entry point. No transport rewrites URLs, because none can read the payload | `EV-102-137` |
| HG-102-071 invalid registrations reported and deletable | **Satisfied by the protocol.** A `404` or `410` on the subscription endpoint reports the registration gone, and CoBudget deletes it. No vendor feature is required | `PN-130-005` |
| HG-102-072 authenticated callbacks | **Not applicable.** There is no callback — CoBudget posts to the endpoint and reads the HTTP status synchronously | `PN-130-005` |
| HG-102-073 suppression | **Not applicable.** There is no opt-out keyword channel; permission is revoked in the browser, surfacing as `410` | `PN-130-005` |
| HG-102-074 platform retention | The push service holds ciphertext for at most the message TTL. What it retains is unreadable to it. **The lock-screen copy on the recipient's device is the real exposure**, which `NT-92-006` addresses and `EG-91-024` holds open | `EV-102-137`; `EV-102-138` |
| HG-102-011 region and subprocessors | Enumerable but not chosen: the set follows recipients' browsers, not CoBudget's selection | `EV-102-138`; finding F1 |

**No verdict is recorded for the transports**, because a verdict presumes a
choice. What is recorded is that the gates land favourably by construction —
finding F2.

### 6.4 Tally

The 23 applicable gates divide by evidence kind into 10 `OBS`, 11 `DOC`, and 2
`CFG`. Every figure is recomputed from the §6.1 and §6.2 tables by
`scripts/audit-cbd-130.py`.

| | C2 | C3 | C10 |
| --- | --- | --- | --- |
| `PASS` | 3 | 2 | 0 |
| `PASS (design)` | 2 | 2 | 2 |
| `UNPROVEN` | 18 | 19 | 20 |
| `FAIL` | 0 | 0 | 1 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `INELIGIBLE` |

**C10 carries the first `FAIL` and the first `INELIGIBLE` verdict in the CBD-15
set.** Per evidence register §3.3 an `INELIGIBLE` provider has one or more `FAIL`
without an approved exception. §7.3 records the compensating control and the
residual; only the Product Owner may approve the exception that would move the
verdict to `CONDITIONAL`.

## 7. Findings

### 7.1 Private MVP has no push provider to select — F1

`docs/product-plan.md` defers native applications and `docs/architecture.md`
puts mobile in "a later phase", so push is Web Push to an installed PWA. The
transport is whichever push service the recipient's browser uses, CoBudget
contracts with none of them, and on Apple's platform does not register with it
at all (`EV-102-138`).

The CBD-130 ticket is titled *"Evaluate and select the push and SMS provider"*.
For SMS that premise holds. For push there is nothing to select, and the honest
deliverable is a measurement of unavoidable subprocessors rather than a
comparison. `OI-130-001` records it; `OI-130-014` carries the ticket wording.

### 7.2 Encryption inverts this category's privacy profile — F2

The rubric weights this category's privacy dimension at **26, the highest weight
of any dimension in any category**, on the reasoning that push and SMS are the
least controllable channels CoBudget uses.

That reasoning holds completely for SMS and only partly for push, because the
two channels have opposite cryptographic properties:

* **Push is end-to-end encrypted by the protocol.** `EV-102-137` records that
  the payload is encrypted to a client public key with an `auth` secret
  *"as described in Message Encryption for Web Push"*. The push service relays
  ciphertext.
* **SMS has no encryption at all**, and AWS says so plainly: *"The SMS protocol
  does not support encryption... the SMS message will not be end-to-end
  encrypted"* (`EV-102-135`).

So the channel with no provider to select is also the channel with the strongest
confidentiality property, and the channel requiring a commercial intermediary is
the one with none. **Neither fact softens `NT-92-001`.** Encryption protects the
body in transit; it does not protect the copy the recipient's device decrypts
and renders on a lock screen, which is precisely why `NT-92-006` applies the
generic-body rule *even when a platform claims previews are hidden*.

### 7.3 One candidate's opt-out list is neither readable nor writable — F3

This finding produces the CBD-15 set's first `FAIL`.

`HG-102-073` requires that *"SMS opt-out keyword handling and per-channel
suppression state are programmatically readable and writable"*.

**C10 documents that its suppression state is neither**: *"Advanced Opt-Out
currently does not support changing or reporting on blocked phone numbers via
the Console or the REST API."* Under evidence register §3.2 a vendor's own
admission of a limitation is sufficient to establish absence, which is what a
`FAIL` requires. The same page establishes that keyword *configuration* is
API-available and that opt-out events reach CoBudget's webhook with an
`OptOutType` of `START`, `STOP`, or `HELP` — so the deficiency is precisely
scoped rather than general.

The contrast is clean. C2 offers automatic `STOP` handling plus
`PutOptedOutNumber`, `DeleteOptedOutNumber`, list and search operations, a
self-managed mode, and an authoritative list — *"The phone number has to be
removed from the opt-out list for it start receiving messages again"*
(`EV-102-136`). C3 offers *"adding, removing, or checking opt-out entries"*
(`EV-102-139`), though in preview.

**Compensating control and residual, per catalog §2.4 and exception rules §6.**
Recorded, not approved:

| Field | Content |
| --- | --- |
| **Failed gate and source** | `HG-102-073`, citing `NT-92-004`, `NT-92-005`, `DI-91-059` |
| **Compensating control** | `PN-130-008`: CoBudget's own `DI-91-059` suppression record is the authority. Every observable opt-out signal — the `OptOutType` webhook, an in-app preference change, a lifecycle event — writes it, and the send path consults it first. **This is CoBudget-side work**, so `EX-102-007` applies: the control is not effective until built and verified |
| **Residual — affected classes** | `DI-91-029` destinations (S3) and `DI-91-059` suppression state (S3). No S4 class is involved |
| **Residual — threat re-opened** | CoBudget cannot reconcile its suppression state against the provider's, and cannot clear a provider-side block |
| **Residual — who bears it** | The recipient, and they can perceive it: a person who texted `STOP` and later re-enables SMS in CoBudget stays blocked, with no in-product way to fix it. Only their texting `START` restores delivery |
| **Residual — detection** | Partial. A send attempt to a provider-blocked number returns an error CoBudget can log, so the divergence is detectable *on attempt* but not by reconciliation, and never proactively |
| **Residual — reversal condition** | The vendor exposing read and write access to the blocked-number list |
| **Residual — interaction** | None. This would be the only exception on this provider, so `EX-102-006`'s stacking threshold is not engaged |
| **Approver** | **Not approved.** `EX-102-001` reserves this to the Product Owner. `OI-130-009` requests the decision |

Until approved, C10 stands `INELIGIBLE`. `EX-102-003` records that an exception
never converts a `FAIL` to a `PASS` and never removes `CONDITIONAL` from any
report of that provider.

### 7.4 The one documentary category gate has a half nobody can satisfy — F4

`HG-102-074` asks for *"Written, dated retention evidence... for the carrier and
push platform."* The platform half is answerable and the three answers differ
more than any other gate in this evaluation:

* **C3 — the strongest statement in any category evaluated so far.** *"ACS does
  not retain the contents of SMS messages after successful delivery or failure
  notification. Messages are held only in transient memory"* (`EV-102-140`).
* **C10 — the most detailed disclosure, and the worst default.** Message records
  persist up to 13 months by default and the window is configurable; Message
  Redaction removes bodies and phone numbers from *"Twilio's Console, APIs, and
  internal customer support systems"*, after which unredacted information is
  accessible to production *"for up to 24 hours"* before moving to limited-access
  compliance storage (`EV-102-134`).
* **C2 — the weakest.** *"AWS End User Messaging SMS processes and stores SMS
  messages within the AWS region selected by the customer"*, with **no retention
  period stated anywhere on the retrieved page** (`EV-102-135`).

**The carrier half is unmet by all three, and appears unmeetable.** No aggregator
controls carrier retention, and C2 says so: delivery's final stages *"operate on
international mobile networks beyond AWS control"*, with downstream providers
that *"may route the SMS messages through endpoints or networks in different
regions"*.

That is not three providers failing. It is a gate whose second half no provider
in this market can satisfy — which is exactly why `NT-92-006` makes the
content ceiling the control rather than a custody promise. `OI-130-010` puts the
gate's reading to the Product Owner: whether `HG-102-074` is met by disclosing
the platform half plus a written statement that the carrier half is
uncontrollable, or whether it stands unmet for every candidate permanently.

One cross-package note, because the same source cuts both ways: `EV-102-140` is
the same Microsoft privacy page CBD-106 registered as `EV-102-063`. There the
absence of an Email non-retention statement counted **against** ACS Email; here
the presence of the SMS one counts **for** ACS SMS. Same page, same date,
opposite conclusions — which is the limitations field doing its job.

### 7.5 Category N bundles two channels the gates cannot tell apart — F5

Three of the eight category-N gates are channel-specific, and the catalog has no
mechanism to scope a gate to one channel:

* `HG-102-071` is about push registration tokens. **SMS has none.**
* `HG-102-073` is about SMS opt-out keywords. **Push has none.**
* `HG-102-072` presumes a delivery callback. **Web Push has none** — the HTTP
  status is synchronous.

§6.2 records `UNPROVEN` for `HG-102-071` against the SMS candidates rather than
inventing an outcome. The approved vocabulary offers
`PASS`, `UNPROVEN`, `FAIL` and nothing else, and this evaluation does not extend
an approved closed set. The rubric has an `n/a` concept for criteria; the gate
catalog has none for gates.

The practical consequence is a tally that slightly understates all three
candidates, since each carries an `UNPROVEN` for a property their channel cannot
have. `OI-130-011` records it as a catalog observation for CBD-108 rather than
a defect in any candidate.

### 7.6 The rubric scores rank retrieval depth, not providers — F6

Recorded here and demonstrated in §8.4, because publishing a number without this
finding attached would be the failure rubric rule R5 exists to prevent.

### 7.7 The two SMS candidates are not independent — Twilio is an AWS subprocessor — F7

This evaluation treated C2 AWS End User Messaging and C10 Twilio as separate
candidates and scored them separately. `EV-102-007` shows that is not the whole
picture.

The AWS subprocessor list names **Twilio, Inc.** against the activity *"A2P
messaging Phone number validation"*, in a grouped row with Cequens FZE, Infobip
Ltd., Nexmo Inc. (now Vonage Holdings Corp.), Route Mobile (UK) Ltd, Sinch
Americas Inc., Tanla Digital Labs FZ-LLC and TeleSign Corporation. The AWS
European Sovereign Cloud section lists Nexmo, Sinch, TeleSign and Twilio for the
same activity. A2P messaging is what AWS End User Messaging SMS *is*.

Three consequences, and it is important to state what does **not** follow.

**Selecting C2 does not avoid Twilio as a processor.** It may mean CoBudget's
messages traverse Twilio, or Infobip, or any other member of the pool, depending
on routing AWS does not expose. `PN-130-*` and the `DI-91-*` classification
treat the recipient's phone number as customer data, and that data reaches a
subprocessor CoBudget has not evaluated as a processor of its data.

**C10's `HG-102-073` `FAIL` does not transfer to C2.** The `FAIL` is about
Twilio's *own* opt-out API surface — that Advanced Opt-Out *"does not support
changing or reporting on blocked phone numbers via the Console or the REST
API"*. AWS operates its own opt-out layer above the aggregator pool, with
`PutOptedOutNumber`, `DeleteOptedOutNumber`, list and search, and an
authoritative list (§7.3). A customer of C2 uses AWS's surface, not Twilio's.
Transferring the `FAIL` would be a category error, and this evaluation does not
make it.

**This is not a finding against C2.** Disclosing the pool is exactly what
`HG-102-011` asks a provider to do, and C2 is the only candidate in this
category whose subprocessor list was obtained at all. The equivalent question
cannot yet be asked of C3 or C10 — C3's list was not obtained and C10's was not
retrieved — so what looks like a C2-specific exposure is partly an artifact of
C2 being the only candidate that could be checked. `OI-130-022` records the
question for CBD-108; `OQ-130-017` records the retrieval that would let the same
question be asked of the other two.

## 8. Rubric scores

CBD-130's deliverables require *"Rubric scores with per-dimension subscores,
every zero listed explicitly, and an evidence-confidence profile"*. That is R4
and R5 restated, so this evaluation produces them — unlike its five siblings,
which declined to publish any total. §8.4 records what changed and what did not.

Scoring follows the rules strictly. **Documented evidence caps a criterion at
`2`**, because §3.2 reserves `3` and `4` for Observed, Contractual or Attested
evidence. Absent evidence scores `0` per R3.

Two criteria are `n/a` for this category and are removed from both numerator and
denominator per §2: `WR-102-033`, which measures assurance granularity beyond an
identity gate, and `WR-102-011`, because no candidate renders a surface a
CoBudget customer sees — an SMS is rendered by the recipient's handset. Thirty
criteria remain.

### 8.1 Per-dimension subscores

| Dimension | Weight | C2 AWS | C3 Azure | C10 Twilio |
| --- | --- | --- | --- | --- |
| Security | 16 | 0.60 | 0.20 | 0.00 |
| Privacy | **26** | 1.00 | 0.80 | 0.20 |
| Reliability | 18 | 0.00 | 0.00 | 0.00 |
| Portability | 14 | 0.00 | 0.00 | 0.00 |
| Solo-operator ongoing effort | 10 | 0.00 | 0.00 | 0.00 |
| Support | 8 | 0.50 | 0.50 | 0.50 |
| Accessibility | 8 | 0.00 | 0.00 | 0.00 |
| **Weighted total** | **100** | **0.40 / 4.00** | **0.28 / 4.00** | **0.09 / 4.00** |

Verdicts travel with the scores per R1: C2 `ELIGIBLE-PENDING-EVIDENCE`, C3
`ELIGIBLE-PENDING-EVIDENCE`, C10 **`INELIGIBLE`**. C10's total is lowest and that
is immaterial — R1 settles order before any total is compared, and an
`INELIGIBLE` provider is not ranked.

### 8.2 Every criterion scoring above zero

Six cells across three candidates and thirty criteria. All rest on Documented
evidence and are therefore capped at `2`.

| Criterion | C2 | C3 | C10 | Basis |
| --- | --- | --- | --- | --- |
| WR-102-003 key-management depth | 1 | 1 | 0 | C2 `EV-102-135`: service-owned KMS keys rotated regularly, but *"You can't provision and use your own AWS KMS or other keys"* — a documented ceiling, not depth. `EV-102-009` corroborates the rotation detail (domain keys daily, backing keys yearly, HSM non-export) without lifting the ceiling. **C3 raised from 0 at v1.1**: `EV-102-162` and `EV-102-163` document customer-managed keys in Key Vault or Managed HSM, a KEK that *"never leaves Key Vault"*, and Managed HSM as *"a customer-owned security domain where Microsoft has no access to your key material"* — band-4 material on the descriptor, held to `1` because the records are **provider-level and ACS-specific key support was not established** (`OQ-103-020`). |
| WR-102-005 network isolation | 2 | 0 | 0 | `EV-102-135`: PrivateLink interface VPC endpoint documented |
| WR-102-006 subprocessor stability and notice | 2 | 0 | 0 | **C2 raised from 1 at v1.1.** The descriptor for `2` is *"Published list with advance-change notice"*, and `EV-102-007` is exactly that: an enumerated list dated on the page with *"at least 30 days"* advance notice. v1.0 scored `1` because `EV-102-135` disclosed that downstream providers exist *"without naming them or committing to notice"*; the list names them and commits. Capped at `2` by R2. **C3 stays 0 under R3**: `EV-102-167` asserts Microsoft publishes a list with six-month notice, but the list itself was **not obtained**, and R3 scores an assertion whose evidence attempt failed as `0` rather than giving it the benefit of the doubt. |
| WR-102-007 residency granularity | 2 | 2 | 0 | `EV-102-135` region selection; `EV-102-140` enumerated geographies |
| WR-102-008 retention minimization defaults | 1 | 2 | 1 | C3's explicit non-retention is the best default available; C2 stores with no stated period; C10's default is 13 months with an excellent but **opt-in** control — the criterion measures defaults |
| WR-102-021 documentation quality | 2 | 2 | 2 | Each vendor's relevant material was retrievable, structured and internally consistent, which is the criterion's own subject |

### 8.3 Every criterion scoring zero, per R4

For **all three candidates**: `WR-102-001`, `WR-102-002`, `WR-102-004`,
`WR-102-009`, `WR-102-010`, `WR-102-012`, `WR-102-013`, `WR-102-014`,
`WR-102-015`, `WR-102-016`, `WR-102-017`, `WR-102-018`, `WR-102-019`,
`WR-102-020`, `WR-102-022`, `WR-102-023`, `WR-102-024`, `WR-102-025`,
`WR-102-026`, `WR-102-027`, `WR-102-028`, `WR-102-029`, `WR-102-030`,
`WR-102-031` — twenty-four of thirty.

Additionally zero for **C3 and C10**: `WR-102-005`, `WR-102-006`.
Additionally zero for **C10**: `WR-102-003`, `WR-102-007`.

Every one is `0` because evidence is **Absent** — the question was not asked, or
was asked and not answered — not because any provider was shown to lack the
property. R3 requires absence to be scored as absence; it does not license
reading a zero as a finding about a vendor.

### 8.4 What these numbers measure, and what they do not

**They measure how much was retrieved.** C2 scores highest because one AWS page
answered four criteria at once. C10 scores lowest partly because its material is
spread across support-centre articles rather than a consolidated security page.
Neither fact is about the products.

CBD-103's evaluation §8 declined to publish a total on exactly this ground, and
its five siblings followed. CBD-130 publishes because its ticket requires it, and
the requirement is method-compliant: R4 and R5 exist to make a thin score
readable rather than to suppress it. So the number is published **with** the
profile that explains it, which is the arrangement the rubric intends.

Three cautions travel with the totals:

1. **Cross-category comparison is meaningless** and the rubric says so directly
   in §4 — these numbers cannot be set beside CBD-103's or CBD-107's.
2. **A total near zero is not a low opinion.** With 80% or more of criteria at
   Absent evidence, the arithmetic floor is near zero regardless of provider
   quality.
3. **The gate verdicts carry the real information**, and one of them — C10's
   `FAIL` — is a genuine provider property established from the vendor's own
   documentation. That single row tells CBD-108 more than all three totals.

### 8.5 Evidence-confidence profile, per R5

Share of the thirty scoring criteria at each confidence level.

| Candidate | Documented / Medium | Absent / None |
| --- | --- | --- |
| C2 AWS | 6 criteria — 20% | 24 criteria — 80% |
| C3 Azure | 4 criteria — 13% | 26 criteria — 87% |
| C10 Twilio | 2 criteria — 7% | 28 criteria — 93% |

**No criterion on any candidate rests on Observed, Contractual or Attested
evidence**, which is why no criterion scores above `2` anywhere in §8.2. This
table is the finding; the totals in §8.1 are its arithmetic consequence.

One classification note carried forward: `EV-102-134` is a vendor support-centre
article, the same class question CBD-106 raised at `OI-106-017`. Were the Product
Owner to classify that form as Asserted rather than Documented, R2 would cap the
criterion at `2` — which it already is — and the record supports no gate `PASS`,
so the outcome here is unchanged either way. Recorded so the two packages stay
consistent.

## 9. Evidence register

Records are append-only. All retrievals were performed on **August 21, 2026** by
desk research; no account was created and no message was sent.

**Number-block allocation.** `EV-102-001`–`131` are held by the hosting,
identity, PostgreSQL, email and financial-connectivity evaluations. **This
evaluation allocates `EV-102-132`–`161`**, using `132`–`140` now and reserving
`141`–`161` for this category's observation records. This is the last category
evaluation under CBD-15; a future block should start above `161`.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-132 | `HG-102-073` | Twilio (N) | "Customize users' opt-in and opt-out experience with Advanced Opt-Out", `https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out.md` | Documented | Medium | Establishes automatic handling of *"STOP, UNSUBSCRIBE, END, QUIT, STOPALL, REVOKE, OPTOUT, and CANCEL"* for long codes, that keyword and confirmation configuration is available via both Console and REST API, and that opt-out events reach a webhook with an `OptOutType` of `START`, `STOP`, or `HELP`. Establishes the §7.3 failure: *"Advanced Opt-Out currently does not support changing or reporting on blocked phone numbers via the Console or the REST API."* Also records that the feature is disabled by default and can only be disabled again by contacting support. | February 21, 2027 |
| EV-102-133 | `HG-102-072` | Twilio (N) | "Security", `https://www.twilio.com/docs/usage/security` | Documented | Medium | Establishes the `X-Twilio-Signature` header computed as HMAC-SHA1 over the full request URL with alphabetically sorted POST parameters, keyed by the account auth token, and Twilio's own note that SHA-1 is not used alone but in combination with the key. **Documents no replay protection** — no timestamp, nonce, or body-hash claim appears. Absence from this page is not proof of absence from the product; `OQ-130-003`. | February 21, 2027 |
| EV-102-134 | `HG-102-074`, `HG-102-007`, `WR-102-008` | Twilio (N) | "Message Redaction for Programmable Messaging", `https://www.twilio.com/docs/messaging/guides/privacy-message-redaction` | Documented | Medium | Establishes that redaction covers message bodies and phone numbers and blocks access through *"Twilio's Console, APIs, and internal customer support systems"*; that unredacted information is accessible to production *"for up to 24 hours"* before moving to separate limited-access compliance storage; and the per-message `ContentRetention` and `AddressRetention` overrides. Establishes a bounded, disclosed, minimizable retention posture. Does **not** state the default retention period for message records — the 13-month figure appears in separate support material not retrieved at source, and is therefore not relied on for any gate outcome. | February 21, 2027 |
| EV-102-135 | `HG-102-010`, `HG-102-011`, `HG-102-074`, `WR-102-003`, `WR-102-005`, `WR-102-006` | AWS End User Messaging SMS (N) | "Data protection in AWS End User Messaging SMS", `https://docs.aws.amazon.com/sms-voice/latest/userguide/data-protection.html` | Documented | Medium | Establishes TLS 1.2 in transit, encryption at rest under internal service-owned KMS keys rotated regularly, and that *"You can't provision and use your own AWS KMS or other keys"*. Establishes that messages are processed and stored *"within the AWS region selected by the customer"* — **with no retention period stated**. Establishes the carrier disclosure: final delivery stages *"operate on international mobile networks beyond AWS control"* and downstream providers *"may route the SMS messages through endpoints or networks in different regions"*. Establishes that *"The SMS protocol does not support encryption"*. Establishes PrivateLink interface VPC endpoints. The at-rest cipher is not named. | February 21, 2027 |
| EV-102-136 | `HG-102-073` | AWS End User Messaging SMS (N) | "Opt-out lists in AWS End User Messaging SMS", `https://docs.aws.amazon.com/sms-voice/latest/userguide/opt-out-list.html` | Documented | Medium | Establishes automatic addition on `STOP`, that *"AWS End User Messaging SMS doesn't attempt to send the message"* to a listed number, that the list is authoritative — *"The phone number has to be removed from the opt-out list for it start receiving messages again"* — and the full management surface: create a list, view details, add, search, remove, delete, and self-managed opt-outs. Establishes read and write access, which is what `HG-102-073` asks for; the exercised API call remains the observation. | February 21, 2027 |
| EV-102-137 | `HG-102-068`, `HG-102-069`, `HG-102-070`, `HG-102-074` | Web Push transports (N) | MDN, "PushSubscription: getKey() method", `https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/getKey` | Documented | Medium | Establishes that `getKey()` returns *"a client public key, which can then be sent to a server and used in encrypting push message data"*, that `p256dh` is an ECDH P-256 public key and `auth` an *"authentication secret, as described in Message Encryption for Web Push"*. Establishes that the payload is encrypted to keys the browser holds, so the push service relays ciphertext. Does **not** establish what any specific push service retains, nor anything about the decrypted copy on the recipient's device — which is the exposure `NT-92-006` and `EG-91-024` address. | February 21, 2027 |
| EV-102-138 | `HG-102-011`, `PN-130-003` | Web Push transports (N) | WebKit, "Web Push for Web Apps on iOS and iPadOS", `https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/` | Documented | Medium | Establishes that Web Push on iOS is available only to web apps added to the Home Screen, that it is *"the same W3C standards-based Web Push"* as other platforms, that it *"uses the same Apple Push Notification service that powers native push on all Apple devices"*, and that *"You do not need to be a member of the Apple Developer Program to use it"*. Establishes the Home Screen precondition bearing on `DM-102-042`. A vendor blog rather than versioned API documentation; the normative behaviour rests on the W3C and IETF specifications it cites. | February 21, 2027 |
| EV-102-139 | `HG-102-073` | Azure Communication Services SMS (N) | "Short Message Service (SMS) Opt-Out Management API", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/sms/opt-out-api-concept`, page updated March 25, 2026 | Documented | **Low** | Establishes an API *"allowing adding, removing, or checking opt-out entries, overriding the automatic management"*, an automatically maintained opt-out database with Sender, Recipient and Country fields, that an entry is deleted when a recipient opts back in, and automatic handling of mandatory keywords. **Confidence is lowered below the Documented default** because the page states the feature is *"currently in preview"*, *"provided without a service-level agreement"*, and *"We recommend that you don't use them for production workloads"* — the same treatment `EV-102-061` received for the ACS email suppression list. | November 21, 2026 |
| EV-102-140 | `HG-102-074`, `WR-102-007`, `WR-102-008` | Azure Communication Services SMS (N) | "Data residency and user privacy for Azure Communication Services", `https://learn.microsoft.com/en-us/azure/communication-services/concepts/privacy`, page updated March 25, 2026 | Documented | Medium | Establishes for SMS that ACS *"temporarily processes SMS message content and associated metadata... only for the purposes of delivery and troubleshooting"*, that *"ACS does not retain the contents of SMS messages after successful delivery or failure notification"*, and that *"Messages are held only in transient memory"*. Establishes geography selection at resource creation with an enumerated list. Covers ACS only — **states nothing about carrier retention downstream**. Same page as CBD-106's `EV-102-063`, registered separately here for a different claim on a different channel; §7.4 records that the two readings differ. | February 21, 2027 |

### 9.1 Reserved numbers

`EV-102-141`–`161` are reserved for this category's observation records.

| ID range | Held for |
| --- | --- |
| EV-102-141 | Reserved — C2 observation session, category-N gates |
| EV-102-142 | Reserved — C2 observation session, telemetry and console gates |
| EV-102-143 | Reserved — C3 observation session, category-N gates |
| EV-102-144 | Reserved — C3 observation session, telemetry and console gates |
| EV-102-145 | Reserved — C10 observation session, category-N gates |
| EV-102-146 | Reserved — C10 observation session, telemetry and console gates |
| EV-102-147 | Reserved — Web Push transport observation, delivered-message inspection |
| EV-102-148 | Reserved — carrier opt-out keyword registration, observed on a controlled handset |
| EV-102-149 | Reserved — forged and replayed callback rejection fixtures |
| EV-102-150 | Reserved — US A2P origination-identity registration evidence |
| EV-102-151 | Reserved — the §10 documentary retrievals, C2 |
| EV-102-152 | Reserved — the §10 documentary retrievals, C3 |
| EV-102-153 | Reserved — the §10 documentary retrievals, C10 |
| EV-102-154 | Reserved — the §10 documentary retrievals, push transports |
| EV-102-155 | Reserved — contractual evidence, DPA and subprocessor list |
| EV-102-156 | Reserved — contractual evidence, second candidate |
| EV-102-157 | Reserved — contractual evidence, third candidate |
| EV-102-158 | Reserved — pricing evidence, C2 |
| EV-102-159 | Reserved — pricing evidence, C3 |
| EV-102-160 | Reserved — pricing evidence, C10 |
| EV-102-161 | Reserved — localized template segment verification under `EG-91-006` |

## 10. Open questions

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-130-001 | Does any candidate append, substitute, or decorate an SMS body, and does any require a descriptive campaign or topic label on a send? | `HG-102-068`, `HG-102-069` | The observations decide both |
| OQ-130-002 | Does any candidate rewrite or shorten URLs in an SMS body? | `HG-102-070` | Observation. `PN-130-009` forbids it on CoBudget's side |
| OQ-130-003 | Callback authentication and replay protection for C2 and C3, and whether C10 offers any replay defence beyond the signature | `HG-102-072` | Retrieve ×3. C10's signature is documented and its replay position is not |
| OQ-130-004 | Encryption in transit and at rest, and network isolation, for C3 and C10 | `HG-102-010`, `WR-102-005` | Retrieve. C2 is settled by `EV-102-135`; §3.2 records the asymmetry |
| OQ-130-005 | Should a fourth SMS candidate be evaluated, and which? | Screening | CBD-108's call. No claim is made about the unevaluated field |
| OQ-130-006 | Correlation-identifier lifetime and purpose separation ×3 | `HG-102-002`, `HG-102-003` | Retrieve |
| OQ-130-007 | Whether any candidate offers customer-obtainable evidence of vendor staff access, and what C10's redaction implies for the unredacted default | `HG-102-007`, `HG-102-009` | Retrieve ×3 |
| OQ-130-008 | Dated region and subprocessor lists ×3, including the downstream carriers C2 discloses but does not name | `HG-102-011` | Retrieve, then request contractually |
| OQ-130-009 | C2's SMS message retention period, absent from the retrieved page | `HG-102-074` | Retrieve, then ask AWS directly. It is the one platform-half answer missing |
| OQ-130-010 | Whether any push service publishes a retention or TTL policy for undelivered encrypted payloads | `HG-102-074` | Retrieve per transport. The payload is ciphertext, so the answer bounds exposure rather than describing it |
| OQ-130-011 | Whether C3's Opt-Out Management API has reached general availability | `HG-102-073` | Re-verify by November 21, 2026. Preview status is the only thing holding this record at Low confidence |
| OQ-130-017 | The C3 and C10 subprocessor lists, obtained and dated | `HG-102-011`, `WR-102-006` | C2's list was obtained (`EV-102-007`) and C3's and C10's were not, so §7.7's subprocessor question can currently only be asked of the candidate that answered it. Until the other two are obtained, C2's `HG-102-011` `PASS` and its `WR-102-006` score of `2` reflect **disclosure that was retrievable**, not a gap between vendors. Microsoft's list is named at `EV-102-167` with a six-month notice commitment but sits on the Service Trust Portal; `OQ-103-018` shares this. |

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-130-008 | Ten pass tests are observation-bound, and one of them — a carrier opt-out keyword registering — **cannot be observed in a simulator**. | The `OI-103-008` authorization covers the accounts; this category additionally needs a real handset the evaluator controls. No customer number appears in any test. |
| OI-130-009 | **`HG-102-073` fails on C10, producing the CBD-15 set's first `FAIL` and first `INELIGIBLE` verdict.** §7.3 records the compensating control and the full residual. | **Product Owner decision.** `EX-102-001` reserves exception approval. Approved, C10 becomes `CONDITIONAL` and carries that label in every report of it per `EX-102-003`; unapproved, it stays `INELIGIBLE`. The residual is recipient-facing and perceivable, which `EX-102-002` requires be recorded before any approval. |
| OI-130-010 | **`HG-102-074`'s carrier half appears unsatisfiable by any provider in this market**, and the one candidate that addresses carriers does so by disclosing that they are beyond its control. | **Product Owner decision on the gate's reading.** Either the platform half plus a written uncontrollability statement satisfies it, or the gate stands permanently unmet for every candidate — in which case no category-N provider can ever be `ELIGIBLE`, which cannot be the intent. |
| OI-130-011 | Three category-N gates are channel-specific and the catalog cannot scope a gate to one channel — finding F5. | The tally understates all three candidates by one `UNPROVEN` each. A catalog observation for CBD-108, not a defect in any candidate, and this evaluation did not extend the approved outcome vocabulary to work around it. |
| OI-130-012 | Every cross-category **X** gate is `UNPROVEN` for every candidate except C2's `HG-102-010`, and no provider-level record was reused. | Matches CBD-106 and CBD-107. `OQ-130-004`, `OQ-130-006`, `OQ-130-007` and `OQ-130-008` are the remaining documentary work. |
| OI-130-013 | The rubric totals are published as the ticket requires, and §8.4 records that they rank retrieval depth rather than providers. | CBD-108 should read §8.5's profile before §8.1's totals. A reader who sees only the numbers will draw a conclusion the evidence does not support. |
| OI-130-014 | The ticket is titled *"Evaluate and select the push and SMS provider"* and §7.1 establishes that no push provider exists to select in Private MVP. | The ticket wording needs correcting for the push half. The SMS half is exactly as scoped. A Jira edit, requiring no repository change. |
| OI-130-015 | CBD-130 is the only one of the six CBD-15 category subtasks that does **not** link as blocking CBD-108. Its five siblings all do. | Either push and SMS are genuinely optional to the provider-set decision — defensible, since `NT-92-004` makes both channels opt-in — or the link is missing. Raised rather than added unilaterally. |
| OI-130-016 | Desk evaluation by one author; no provider contacted, no account created, nothing sent, no origination identity registered. | The independent security review required before public launch remains outstanding, and `EG-91-006` and `EG-91-024` remain open. |
| OI-130-022 | **C2 and C10 are not independent candidates: `EV-102-007` names Twilio as an AWS subprocessor for A2P messaging** — §7.7. | Selecting C2 does not avoid Twilio as a processor of recipient phone numbers, and the routing within AWS's aggregator pool is not exposed. It does **not** transfer C10's `HG-102-073` `FAIL` to C2, which is about Twilio's own opt-out API surface rather than AWS's. CBD-108 should hold this when reading the two candidates as alternatives. Recorded as a structural fact about the candidate set, not as a finding against C2 — disclosure is what `HG-102-011` asks for, and C2 is the only candidate here whose list was obtained. |

## 12. Recommendation

CBD-130's fifth deliverable asks for *"Recommendation with any compensating
controls, residual risks, and open questions."* No sibling package produced one,
because CBD-108 selects. This one does, for the parts the evidence supports —
and says plainly where it does not.

### 12.1 What is recommended, and supported

**Push: adopt no provider.** This is a full recommendation rather than a
deferral. §7.1 establishes there is nothing to select in Private MVP, and
`PN-130-006` declines the one thing that could be selected — a fan-out layer —
on stated grounds: it would add a subprocessor to a channel that has none of
CoBudget's choosing, and would hand an intermediary the subscription keys,
forfeiting the end-to-end encryption of finding F2. The reversal condition is
explicit and dated to an event rather than a review: when native applications
leave the deferred list.

**SMS: keep the channel, and treat its cost as a decision to offer it at all.**
The operational assessment §5.3 establishes that the A2P registration floor is
paid whether CoBudget sends sixty messages a month or none, so the SMS decision
is binary rather than volumetric. That is a recommendation about the shape of
the choice, and it holds regardless of which provider wins.

### 12.2 What is not recommended, and why

**No SMS provider is recommended.** The evidence does not support one, and
saying so is the recommendation:

* Ten of 23 pass tests are observation-bound and **none has been performed**.
  Six of the eight category-N gates are among them.
* The rubric totals rank retrieval depth rather than providers — §8.4 — so they
  cannot break the tie.
* **Two open items would change the candidate set before any comparison is
  meaningful**, and both are Product Owner decisions:
  * `OI-130-009` — whether the `HG-102-073` exception is approved. Unapproved,
    C10 is `INELIGIBLE` and the field is two. Approved, it is `CONDITIONAL` and
    the field is three.
  * `OI-130-010` — whether `HG-102-074`'s carrier half is satisfiable. Read
    strictly, **no candidate can ever be `ELIGIBLE`** in this category.

Comparing three providers before those two answers exist would produce a
recommendation that the answers could invalidate.

### 12.3 What would make an SMS recommendation supportable

In order, and none of it requires a provider conversation:

1. The two Product Owner decisions above.
2. The observation pass — one evaluation account per candidate, one controlled
   handset, and the six category-N pass tests. `OI-130-008` records the handset
   requirement.
3. The `OQ-130-014` price retrieval, which §5.1 records as reading rather than
   negotiation.

On current evidence C2 is the only candidate with a documented, authoritative,
readable and writable opt-out list and a retrieved encryption posture. **That is
not a recommendation** — it is an observation about which candidate has been
looked at most closely, and §8.4 explains why those are easy to confuse.
