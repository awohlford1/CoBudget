# CBD-106 — Deliverability, Operations, Cost, and Exit Assessment

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Records the operational and cost half of CBD-106 against the approved CBD-102 cost template. **It contains no prices**; §5 records every price line as unknown under cost rule `CR4`, with the tier and add-on interactions already known named so they are not discovered at pricing time. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-106](https://cobudget.atlassian.net/browse/CBD-106) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Email Delivery and Content Boundary Specification v0.1; Candidate Shortlist and Gate Evaluation v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `d98defd` |
| Last updated | August 21, 2026 |

## 1. Purpose

CBD-106's third deliverable requires a *"domain authentication, suppression,
delivery event, retry, template, privacy, retention, support, cost, and exit
assessment."* This document is that, for the parts the Email Delivery and Content
Boundary Specification does not already own: the specification fixes the posture
(`ED-106-*`); this records what operating it looks like and what it costs to the
extent evidence exists.

## 2. Volume, rate, and what actually constrains sending

The demand model prices this category on messages per month, and the numbers are
small enough that throughput is not a design question:

| Input | Base | High | Source |
| --- | --- | --- | --- |
| Total emails, year 1 | 1,956 | 13,418 | `DM-102-038` |
| Peak month | 250 | 1,600 | `DM-102-039` |
| Invitation tier, year 1 | 78 | 338 | `DM-102-033` |
| Lifecycle and security tier, year 1 | 150 | 600 | `DM-102-034` |
| Routine product tier, year 1 | 1,728 | 12,480 | `DM-102-037` |
| Average send rate at peak | ≈ 0.0001/s | ≈ 0.0006/s | Derived: 250 ÷ 2,629,800 s |

**The billing unit and the demand unit match, which is unusual and worth
stating.** Cost template §5.1 warns that a provider's unit will often not match
the model's, and that the conversion is where a comparison goes quietly wrong —
the SMS segment case being the sharpest. Here `ED-106-006` sends one message per
recipient, providers meter per message, and `DM-102-039` counts messages. No
conversion is required, and none should be introduced.

Three consequences follow, and none of them is about throughput:

* **Rate limits are not binding on any candidate.** A default transactional
  sending rate on any managed provider is orders of magnitude above 0.0006
  messages per second. `RL-92-006` per-tenant concurrency caps constrain
  CoBudget's own surfaces, not this one.
* **A dedicated IP address is the wrong purchase at this volume**, on every
  candidate. Dedicated IPs require sustained volume to establish and hold a
  reputation; 250 messages a month cannot warm one and cannot keep one warm. The
  shared pool is not a compromise here — it is the correct choice, and
  `CT-102-007` records the dedicated-IP line as deliberately not purchased rather
  than as unpriced.
* **The binding constraint is account state, not capacity.** C2 begins in a
  sandbox in which sending is restricted to verified addresses and the bulk
  suppression operations are unavailable until production access is granted
  (`EV-102-055`). C3 documents *"default sending limits"* on custom domains that
  must be raised (`EV-102-060`). Both are provisioning-lead-time items, and both
  interact with the §3 observations in the evaluation — a sandbox account can
  execute some pass tests and not others. `OI-106-013` records it.

## 3. Deliverability, reputation, maintenance, monitoring, and outage

### 3.1 Reputation is statistically noisy at this volume, and no content decision fixes that

This is the operational finding of the category, and it is arithmetic rather than
judgment. Providers act on complaint rates in the region of a tenth of a percent
and bounce rates in the region of a few percent. At `DM-102-039` Base volume:

| Event | Rate it produces in a 250-message month |
| --- | --- |
| One complaint | 0.4% |
| One hard bounce | 0.4% |
| Three hard bounces | 1.2% |

**A single recipient pressing the spam button can put the account above a
threshold designed for senders whose denominator is in the millions.** Nothing in
the message content prevents this, and CoBudget's content is already the least
complaint-prone content it is possible to send — `EM-92-001` routine mail says
only that an update exists.

What the posture already does about it, none of it added for this reason but all
of it load-bearing here:

* External delivery is opt-in per user and per category (`CF-74-01`,
  `NT-92-004`), so nobody receives routine email who did not ask for it. In-app
  is the mandatory channel and generates no external volume at all.
* `ED-106-003` puts the three tiers on separate streams and subdomains, so a
  complaint about routine alert mail lands on the routine stream's reputation and
  not on the lifecycle stream that carries security notices.
* Invitation mail — the one tier sent to addresses that have consented to
  nothing, and therefore the highest-complaint-risk tier — is isolated on its own
  subdomain by the same decision.

What CoBudget should watch is the **absolute count**, not the rate. A complaint
rate computed on a denominator of 250 is false precision, and a provider
dashboard that reports it as a percentage is inviting a wrong conclusion in both
directions. `OI-106-014` records that no approved source sets an alerting
threshold for this.

### 3.2 The same arithmetic is why `ED-106-002` recommends one provider

Splitting 250 messages a month across two providers produces two senders with
half the volume each, on two separate reputations, with two warm-up curves and
two sets of thresholds — for a separation `ED-106-003` already provides inside
one account. The specification records this as a preference with stated reasons;
this section is the operational half of the reason.

### 3.3 Maintenance

The provider operates the sending infrastructure. What CoBudget operates is DNS
and templates:

* **DNS records** — DKIM public keys, the SPF-aligned bounce or MAIL FROM
  record, and the DMARC policy, per stream subdomain under `ED-106-005`. These
  are the operational dependency, and they are the failure mode: an expired or
  mistyped record degrades deliverability silently rather than erroring.
* **DKIM key rotation** carries a documented constraint on at least one
  candidate: `EV-102-052` records that C2 restricts changing key length to once
  per 24 hours and forbids switching to the length already configured, because
  in-transit mail is authenticated against the published key. Rotation is
  therefore a planned operation with a settling period, not a click.
* **DMARC policy progression** from `p=none` to enforcement is a scheduled
  operation with a monitoring period, documented by both C2 (`EV-102-053`) and
  C3 (`EV-102-059`). `OI-106-002` owns the schedule.
* **Templates** deploy from the repository under `ED-106-016`, so a template
  change is a deployment (`TD-103-027`), reviewable and revertible, rather than
  a console edit.

`WR-102-027`–`WR-102-031` score ongoing solo-operator burden, and this category's
honest position is that the burden is low and concentrated: nothing to patch,
nothing to scale, and a short list of DNS records whose failure is quiet.

### 3.4 Monitoring

The posture follows `ED-106-012` and the three-boundary telemetry model
(`TD-103-021`):

| Surface | Content | Boundary |
| --- | --- | --- |
| Ordinary operator dashboard | Attempt counts, outcome classes, absolute bounce and complaint counts, queue depth and age | S1, `DI-91-041` |
| Provider delivery and bounce events | Destination address, SMTP diagnostics — `EV-102-057`, `EV-102-062` show the field lists | Restricted diagnostics, `DI-91-062`, `TD-103-021` |
| Suppression state | Destination plus reason | Application state, `DI-91-059` — not telemetry |
| Engagement metrics | Opens, clicks, user agents, recipient IP addresses | **Do not exist.** `ED-106-007` turns tracking off, so the entire engagement surface every candidate offers is unused |

The fourth row is worth stating positively rather than as an absence: a
substantial part of what each candidate sells — deliverability analytics built on
open and click data — is unavailable to CoBudget by design. That is a real
reduction in what the provider can tell CoBudget about its own mail, accepted
deliberately under `EM-92-007`, and it should be scored as a cost of the posture
rather than treated as a provider deficiency.

The one substitute available is the delivery event itself: `EV-102-057` and
`EV-102-062` both establish per-recipient delivery, bounce, and complaint
reporting, which answers *did it arrive* without answering *did anyone read it*.
For a product whose external mail says only "there is an update", *did it arrive*
is the only question that matters.

### 3.5 Outage and failure behaviour

| Failure | Behaviour under the posture |
| --- | --- |
| Provider send-API outage | External copies are delayed. The send job retries under `TD-103-008` bounds; in-app instances already exist and are unaffected (CBD-74 §5.3). No fallback to another channel — `ED-106-015` |
| Provider callback outage | Delivery and suppression state goes stale, not wrong. Suppression already applied stays applied; new bounces arrive late. `ED-106-010`'s send-time recheck degrades in the safe direction, because a missing suppression update means a message is attempted rather than a message being wrongly sent to a suppressed address |
| CoBudget callback endpoint outage | Provider retries on its own schedule — documented for C5 (`EV-102-068`), unretrieved for C2 and C3 (`OQ-106-008`). `ED-106-011` idempotency makes replays harmless |
| DNS or DKIM misconfiguration | Silent deliverability degradation. This is the failure with no error message, and the reason DMARC aggregate reporting (`rua`) is part of `ED-106-005` rather than optional |
| Domain reputation event | Delivery degrades across the affected stream only, because `ED-106-003` separates them. Recovery is provider-mediated and can take days; there is no CoBudget-side remedy |
| Suppression state divergence | CoBudget's `DI-91-059` state is the record and the provider's list is a cache (`ED-106-016`), so divergence is repaired by re-asserting from CoBudget's state — except for the entries §7.6 of the evaluation shows CoBudget cannot remove |
| Account suspension | Total loss of the external channel. In-app is unaffected, which is the whole reason `ED-106-015` places the mandatory instance first |

### 3.6 A note on the accessibility dimension

Rubric §4.1 weights accessibility at 10 for category E — third highest — on the
ground that email *"renders messages in the recipient's client"*. In this
category most of that surface is CoBudget's own template rather than the vendor's
rendering, and the approved copy that will occupy it is blocked under
`FU-95-017`. The vendor half that remains scorable is its console (`WR-102-011`),
its handling of plain-text alternatives, and anything it injects into a message.
That is a smaller vendor surface than the weight implies, and `WR-102-011`
scoring should say so rather than distribute the weight over CoBudget's own
unfinished work.

## 4. Export, migration, and deletion

The plan itself is `ED-106-013` and `ED-106-016`; operationally:

1. **Routine export capability** — there is little to export. Templates are
   already repository source, delivery events are already in CoBudget's
   restricted diagnostics boundary, and suppression state is already mirrored in
   `DI-91-059`. This is the least lock-in of any category in the provider set.
2. **Migration** — verify domains at the successor, publish new DKIM and SPF
   records, re-point streams, re-assert suppression from CoBudget's own state,
   cut over by configuration (`TD-103-027`). No customer action. The migration
   window is bounded by DNS propagation, not by data volume.
3. **Deletion** — lifecycle-ledger-driven (`DI-91-045`), with completion claims
   stating the provider horizon per `ED-106-013` and failing closed per
   `SR-94-124`. Two classes of uncontrolled copy must appear in the claim: the
   recipient's own delivered copy (`EM-92-007`), and the suppression and
   complaint records the evaluation's finding F6 shows no candidate lets CoBudget
   fully delete.
4. **Exit cost** — negligible. There is no data egress: `CT-102-014` records what
   the successor's domain verification and any export API calls cost, which is
   expected to be nothing, and "expected to be nothing" is still recorded as
   `UNKNOWN` under `CR4` rather than as zero.

## 5. Cost

### 5.1 No prices, same rule as the sibling categories

No price was retrieved for any candidate; every `CT-102-*` line is `UNKNOWN`
under `CR4` and the evidence register's rule that an Asserted price is recorded
as unknown.

What the demand model already establishes is more decisive here than in any other
category: at 250 messages in a peak month, **the sending volume is very likely
inside a free or included allowance on every candidate.** If that proves true,
`CT-102-017` steady-state cost for this category is composed almost entirely of
`CT-102-003` seats and `CT-102-005` support, with the headline usage term at or
near zero — which would make this the one category where cost is least likely to
influence the decision. That is a hypothesis with an obvious retrieval attached
(`OQ-106-010`), not a finding, and `CR4` forbids recording it as a number.

### 5.2 Cost record structure

One record per candidate; identical structure; abridged here to the fields with
category-E content. Every unlisted `CT-102-*` line is `UNKNOWN`.

| Field | C2 Amazon SES | C3 ACS Email | C5 Postmark |
| --- | --- | --- | --- |
| Tier priced | `UNKNOWN` — no gate is yet known to force a tier | `UNKNOWN` — the custom-domain sending-limit increase is a prerequisite whose price is unretrieved | `UNKNOWN` — the `OI-106-003` retention choice may force the Retention Add-on; see §5.3 |
| Eligibility verdict | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |
| CT-102-003 seats × 2 | `UNKNOWN` — the §2.5.1 second principal needs an account identity wherever key or approval custody applies | `UNKNOWN` | `UNKNOWN` — a standalone vendor's seat model is independent of the hosting account's, so this line is additive rather than absorbed |
| CT-102-005 support plan | `UNKNOWN` — folds into the AWS account support plan the hosting evaluation already prices | `UNKNOWN` — folds into the Azure account support plan | `UNKNOWN` — **a separate support relationship**, not folded into any hosting account |
| CT-102-006 messages/month × rate | `UNKNOWN` × 250 Base, 1,600 High (`DM-102-039`) | `UNKNOWN` × same | `UNKNOWN` × same |
| CT-102-007 secondary units | Dedicated IP (**not purchased**, §2); archive storage if `ED-106-013` ever enables it; event-destination charges | Dedicated IP (**not purchased**); Azure Monitor log ingestion and retention for the `EV-102-062` categories; Event Grid operations | Dedicated IP (**not purchased**); Retention Add-on (§5.3) |
| CT-102-008 included allowance | `UNKNOWN` — likely to exceed Base volume entirely (§5.1) | `UNKNOWN` — same | `UNKNOWN` — same |
| CT-102-014 exit cost | `UNKNOWN`, expected negligible — §4 | `UNKNOWN`, expected negligible | `UNKNOWN`, expected negligible |
| CT-102-021 first overage threshold | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |

### 5.3 Cost cliffs specific to this category

| Cliff | Why it is a cliff | Evidence |
| --- | --- | --- |
| **Retention minimization is a paid feature on C5** | `EV-102-069` establishes 45 days by default and a 7–365 day range through the Retention Add-on. `HG-102-052` passes at the default, so this is not gate-forced — but `ED-106-013` prefers the shortest bounded retention, and `OI-106-003` may choose 7 days. If it does, **a privacy posture decision becomes a line item**, which is precisely the `CR0` shape: the capability the posture requires lives behind a payment | `EV-102-069` |
| **Azure's suppression list is in preview** | A preview feature carries no price and no SLA (`EV-102-061`). General availability may bring both. A cost model built on today's preview is a model of a product that does not yet exist in production form | `EV-102-061` |
| **Sending-limit and production-access gates** | C2's sandbox and C3's default custom-domain sending limits are account-state prerequisites rather than prices, but each may be tied to a plan or an approval that has one. They also delay the evaluation observations, which has a schedule cost | `EV-102-055`, `EV-102-060` |
| **A standalone adds a support and seat relationship the ecosystem candidates absorb** | C2 and C3 sit inside AWS and Azure accounts the hosting evaluation already prices, so their `CT-102-003` and `CT-102-005` lines may already be paid. C5's are new money. This is the standing cost of the extra subprocessor `HG-102-011` already records as a gate consideration | Structural |
| **Dedicated IP** | Offered by every candidate as a deliverability upgrade, and it is a recurring floor that buys nothing at this volume (§2). It is named here so it is declined deliberately rather than bought reflexively at provisioning | §2 |
| **Log ingestion on C3** | `EV-102-062`'s three log categories flow into an Azure Monitor workspace CoBudget pays for and sets retention on. Small at this volume, but it is a metered secondary unit the other candidates do not have in the same shape | `EV-102-062` |

## 6. Open questions

Operational additions to the evaluation's §9 list; same carry-forward rule.

| ID | Question | Action |
| --- | --- | --- |
| OQ-106-010 | All `CT-102-*` price lines ×3 at the `CR0` gate-clearing tier, and specifically the included monthly allowance | Retrieve. §5.1's hypothesis — that Base volume sits inside every candidate's allowance — is checkable in one page per candidate and would settle how much cost matters here |
| OQ-106-011 | Provider retry schedules and delivery-attempt expiry for C2 and C3, to inform the `OI-106-004` CoBudget-side retry ceiling | Retrieve. C5's is documented (`EV-102-068`). CoBudget's own bound should not duplicate or fight the provider's |
| OQ-106-012 | Documented bounce and complaint rate thresholds at which each provider throttles, warns, or suspends, and whether any is expressed as an absolute count rather than a rate | Retrieve ×3. §3.1 shows why: a rate threshold applied to a 250-message denominator behaves very differently from how it was designed to |

## 7. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-106-013 | Account state — C2's sandbox, C3's default sending limits — gates both production sending and part of the evaluation's observation set. | Provisioning lead time is on the critical path for closing this category's evidence, not just for launch. Plan the `OI-103-008` evaluation accounts with the production-access step included. |
| OI-106-014 | No approved source sets a bounce or complaint alerting threshold, and §3.1 shows the usual percentage thresholds are unstable at this volume. | CoBudget should alert on absolute counts with a stated rationale, and `ME-94-010`/CBD-94 own the values. Until then, a provider's own percentage dashboard is the only signal and it is a misleading one. |
| OI-106-015 | `ED-106-007` forecloses the engagement analytics every candidate sells, so a substantial part of each product is unused. | Scored as a cost of the posture, not a provider deficiency. It also means deliverability problems will be detected from delivery events and DMARC aggregate reports rather than from engagement decay, which is slower. |
| OI-106-016 | No budget ceiling exists (`OI-102-017`), and this is the category least likely to be constrained by one. | Same consequence as the sibling categories in form, but inverted in practice: cost is unlikely to exclude any candidate here, so the decision rests almost entirely on the gate evidence that §3 of the evaluation shows is not yet obtained. |
