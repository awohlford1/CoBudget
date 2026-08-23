# CBD-106 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Maps each CBD-106 acceptance criterion and deliverable to the exact evidence that answers it, and states plainly where the answer is a design record, a retrieved document, or an open question. |
| Document version | 1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 16 `ED-106-*` decisions including the `ED-106-002`–`ED-106-004` routing recommendation, the screening and 24-gate evaluation with its verdicts and `EV-102-052`–`070` records, the operational and cost assessment with its `CR4` unknowns, and this traceability record. It approves no provider, publishes no rubric score, performs no observation, sends no message, and writes no copy. It leaves `OI-106-001`–`017`, `OI-102-022`, `FU-95-017`, `EG-91-006`, and every `OQ-106` question open — including `OI-106-017`, the support-centre-article classification that would move C5's `HG-102-052` outcome, which this approval deliberately does **not** settle. |
| Jira | [CBD-106](https://cobudget.atlassian.net/browse/CBD-106) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Email Delivery and Content Boundary Specification v1.0; Candidate Shortlist and Gate Evaluation v1.2; Operational and Cost Assessment v1.0 |
| Confluence page | [CBD-106 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/12877869) |
| Repository baseline | `c689192` |
| Last updated | August 22, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-106-email-delivery-and-content-boundary-specification.md` | The email delivery posture and content boundary, as 16 `ED-106-*` decisions, including the authentication-versus-product routing recommendation |
| `docs/cbd-106-candidate-shortlist-and-gate-evaluation.md` | Screening, 24-gate comparison matrix over three candidates, verdicts, findings F1–F6, and evidence records `EV-102-052`–`070` |
| `docs/cbd-106-operational-and-cost-assessment.md` | Volume and rate arithmetic, deliverability and reputation, maintenance, monitoring, outage behaviour, export/migration/deletion operations, and the `CT-102-*` cost structure with `CR4` unknowns |
| `docs/cbd-106-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-106.py` | Mechanical guard over identifier resolution, matrix completeness, and the restated tallies |

The status vocabulary below is the one CBD-103's traceability record §2 defined:
**Met**, **Met (design)**, **Partially met** — with no criterion marked Met on a
claim that lacks an evidence record or a cited approved source.

## 2. Acceptance criteria

### AC1 — SPF, DKIM, DMARC, reputation, and domain setup are documented

**Status: Met.**

| Sub-criterion | Evidence |
| --- | --- |
| SPF | `ED-106-005` requires an SPF-aligned bounce or MAIL FROM domain per stream. `EV-102-053` establishes that C2's SPF alignment requires a custom MAIL FROM domain and a relaxed `aspf` policy; `EV-102-058` establishes C3's custom-domain SPF record; `EV-102-065` establishes C5's `pm_bounces` Return-Path CNAME and its SPF-alignment purpose |
| DKIM | `EV-102-052` (Easy DKIM, BYODKIM, 2048-bit default, inheritance and rotation constraints), `EV-102-058` (custom-domain DKIM records), `EV-102-065` (DKIM TXT record with 48-hour verification) |
| DMARC | `EV-102-053` (alignment rules, `_dmarc` record shape, `p=none`→`quarantine`→`reject` rollout), `EV-102-059` (Microsoft's `p=reject` where possible guidance and `rua` requirement), `EV-102-065` (Postmark's `p=none` starting policy) |
| Reputation | Operational §3.1 — the volume arithmetic, why percentage thresholds are unstable at 250 messages a month, and what the posture already does about it. §3.2 records the reputation half of the one-provider recommendation |
| Domain setup | `ED-106-005` — one subdomain per `ED-106-003` stream, no vendor-branded envelope, no event-descriptive routing. `EV-102-058` establishes that C3's managed domain is vendor-branded, making a custom domain mandatory there |

`HG-102-054` is the only gate in this package that passes on all three
candidates, and it is the gate this criterion asks about. The criterion asks that
these be *documented*, and each row above is a dated retrieval with its
limitations recorded. The policy **value** — how far the DMARC rollout goes and
when — has no approved source and is `OI-106-002`; naming that as an open
decision is what makes the setup explicit rather than assumed.

### AC2 — Idempotency, delivery events, suppression, retries, rate limits, and outage behaviour fit the notification model

**Status: Met (design).**

| Sub-criterion | Where |
| --- | --- |
| Idempotency | `ED-106-011` — keyed on the provider's stable event identifier, verified at CoBudget's edge, independent of which provider mechanism exists. `EV-102-068` establishes C5's retry-stable trace header; the C2 and C3 equivalents are `OQ-106-008` |
| Delivery events | `ED-106-012` — routed to restricted diagnostics, not the S1 stream, because they name destinations. `EV-102-057` and `EV-102-062` establish the payload and log field lists; finding F5 records why the routing is forced |
| Suppression | `ED-106-003` — per stream, with a complaint suppressing one stream and a hard bounce suppressing all. `EV-102-055`, `EV-102-061`, `EV-102-067` establish the capability on all three; finding F6 records the terminal edge each carries |
| Retries | `ED-106-015` — bounded, observable, terminal, on the `TD-103-006` outbox with `TD-103-009` dead-letter handling. **Values are open** (`OI-106-004`), and `OQ-106-011` retrieves the provider-side schedules so CoBudget's bound does not fight them |
| Rate limits | Operational §2 — not binding on any candidate at 0.0006 messages per second. What binds is account state (sandbox, default sending limits), recorded as `OI-106-013` |
| Outage behaviour | Operational §3.5 — seven failure modes with their behaviour, including the two that fail silently. `ED-106-015` fixes the in-app relationship: an external failure never removes, delays, or duplicates the in-app instance |

"Fit the notification model" is the criterion's phrase, and the notification model
is CBD-74's. Each row above is tied to it: `ED-106-010` restates CBD-74 §5.3
step 5's send-time recheck, `ED-106-011` restates step 7's callback limits, and
`ED-106-003` implements the `MN-74-02` rule that security notices are *"never
routed through alert preferences."*

### AC3 — Messages and metadata exclude unnecessary financial details, shared raw destinations, secrets, and cross-user personal state

**Status: Met (design).**

| Excluded class | How |
| --- | --- |
| Financial details | `ED-106-001` — routine email is content-free under `EM-92-001`; no tier permits an amount, balance, merchant, or account. CBD-74 §6.2's exhaustive prohibition list is the operative ceiling |
| **Shared raw destinations** | `ED-106-006` — one message, one recipient, no `Cc`, no `Bcc`. Fan-out is per recipient at the CoBudget outbox, so the provider never receives a recipient list |
| Secrets | `HG-102-014` records `PASS (design)` on all three candidates, settled by `ED-106-008`'s typed payload allowlist. The gate is non-exceptable under exception rules §5.2 |
| Cross-user personal state | `ED-106-001` and `ED-106-008` — no person, membership, role, relationship, or other recipient appears in any tier or any payload field. `ED-106-012` keeps the same exclusion on the return path, where a destination would otherwise reach the S1 telemetry surface |

The metadata half is the one this package adds beyond the approved contracts.
`ED-106-008` requires the payload be constructed from a typed allowlist rather
than serialized from a domain object, applying `TD-103-022`'s structural-redaction
principle to the one other place CoBudget hands data to a third party.
`HG-102-049` remains `UNPROVEN` on all three because the pass test exercises the
send API — no candidate is *documented* to require a descriptive label, and
`EV-102-057` shows C2 treats message tags as optional, but neither fact is the
observation.

### AC4 — Retention, deletion, subprocessors, webhook verification, sandbox, and redaction are explicit

**Status: Partially met.** This is the weakest criterion in the package, and the
gaps are named rather than absorbed.

| Sub-criterion | Status | Where |
| --- | --- | --- |
| Retention | **Explicit for C5 in writing** (45 days default, 7–365 adjustable, permanent removal at expiry, aggregate statistics kept forever — `EV-102-069`, `EV-102-070`, giving C5 the only `HG-102-052` pass, subject to the `OI-106-017` classification decision). **Open for C2 and C3**: `EV-102-056` documents an opt-in archive but not what is retained without it, and `EV-102-063` states real-time processing without the explicit non-retention statement the same page makes for SMS. `OQ-106-007` | Evaluation §7.2; `ED-106-013` |
| Deletion | **Explicit as required-and-blocked.** `ED-106-013` fixes ledger-driven propagation, horizon-stating claims, and fail-closed behaviour. The exercised deletion is the `HG-102-053` and `HG-102-012` observation. Finding F6 records the uncontrolled suppression copies that must appear in every claim | `ED-106-013`; evaluation §7.6 |
| Subprocessors | **Not explicit.** No dated subprocessor list was obtained for any candidate. `EV-102-063` establishes C3's geography selection and that Event Grid system topics are global, which is region evidence and not subprocessor evidence. `HG-102-011` is `UNPROVEN` three ways | `OQ-106-005`; `OI-106-009` |
| Webhook verification | **Explicit on CoBudget's side, partly open on the provider's.** `ED-106-011` places verification and replay rejection at the `TD-103-012` edge whatever the provider offers. `EV-102-068` establishes C5's position exactly — and negatively. C2's and C3's endpoint authentication are properties of the destination services and were not retrieved | `OQ-106-008`; evaluation §7.4 |
| Sandbox | **Explicit.** C2's sandbox restrictions and C3's default custom-domain sending limits are recorded with their two consequences: a provisioning prerequisite for production, and a partial block on the evaluation observations | Operational §2; `OI-106-013` |
| Redaction | **Explicit.** `ED-106-008` for the outbound payload, `ED-106-012` for the inbound event data, both structural rather than filter-based per `TD-103-022` | `ED-106-008`, `ED-106-012` |

Four of six are explicit; retention is explicit for one candidate of three; and
subprocessors are explicit for none. Marking this criterion Met would require
treating an unobtained list as a satisfied requirement.

### AC5 — The decision supports email first without assuming push or SMS

**Status: Met.**

| Evidence | Where |
| --- | --- |
| No decision in the package depends on a push or SMS provider existing, and none is cited as a prerequisite | Specification §1–§9 |
| No channel is a fallback for another: an email failure never escalates, and `NT-92-*` channels are not a retry path for email | `ED-106-015` |
| The mandatory channel is in-app, which generates no external volume at all and is created before any external delivery is scheduled | `ED-106-015`; CBD-74 §5.3 steps 3–4 |
| Push and SMS carry a different and narrower ceiling (`NT-92-001`) evaluated by a different subtask (CBD-130), and this package neither anticipates nor constrains that evaluation | Specification §2 |
| The demand model prices email independently of `DM-102-040`–`DM-102-047` push and SMS drivers | Operational §2 |

The one place the boundary is deliberately touched is `ED-106-004`, where an
identity provider's ceremony email is placed inside the `EM-92-003` tier — an
email-side question about an identity product, not a push or SMS assumption.

## 3. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| Provider shortlist and comparison | **Met.** One-property capability screen, two screened rows with reversibility stated, a carried-set rule, 24-gate matrix over three candidates, symmetric documentary pass on five questions | Evaluation §4–§7 |
| Authentication-versus-product routing recommendation | **Met.** `ED-106-002` recommends one provider with stated reasons and a stated reversal condition; `ED-106-003` separates the tiers into streams and subdomains with per-stream suppression semantics; `ED-106-004` takes a position on IdP ceremony email that `ID-104-018` left open | Specification §4 |
| Domain authentication, suppression, delivery event, retry, template, privacy, retention, support, cost, and exit assessment | **Partially met.** Domain authentication, suppression, delivery events, retry shape, templates, privacy, and exit are covered across the specification and operational assessment. Retention is covered for one candidate of three. **Support is scored, not priced** (`CR6`), and **cost carries no figures** — the `CT-102-*` structure is complete with every line `UNKNOWN` under `CR4` | Specification; Operational §2–§5 |

## 4. Dependencies satisfied

| Dependency | How consumed |
| --- | --- |
| Approved rubric and hard gates (CBD-102) | 24-gate matrix; verdicts per evidence register §3.3; `CR0`–`CR7` and `R1`–`R5` applied; the category-E weight profile noted where it bears on scoring (operational §3.6); `EV-102-052`–`081` block allocation extends the register without collision |
| Hosting topology (CBD-103) | `TD-103-001`, `TD-103-006`–`009`, `TD-103-012`, `TD-103-016`, `TD-103-017`, `TD-103-021`, `TD-103-022`, `TD-103-027` are load-bearing inputs throughout. The send is a job on the CBD-103 outbox; the callback endpoint sits at the CBD-103 edge; provider event data lands in the CBD-103 diagnostic boundary |
| Current CBD-12 and CBD-14 notification requirements | Consumed **through the approved CBD-73 and CBD-74 boundaries** rather than directly. CBD-74 §6.1–§6.4 already reconciles the CBD-12 acceptance criteria against the `EM-92-*` and `NT-92-*` ceilings, and records the one CBD-12 wording correction that reconciliation requires. This package inherits that reconciliation and does not repeat, revise, or extend it — the CBD-12 correction is not CBD-106's to make. CBD-14's threat-model output reaches this package as `EM-92-*`, `TH-92-006`, `TH-92-021`, the `DI-91-*` classes, and the `SR-94-*` requirements |
| Approved identity boundary (CBD-104) | `ID-104-018` and `OI-104-005` are the input to `ED-106-004`; `ID-104-019`'s adapter seam is the model `ED-106-016` follows |

## 5. Follow-up register disposition

**`FU-95-017` names CBD-106 as a target**, and the August 18, 2026 linkage pass
added the pointer comment to this issue. It is a P1 row covering *"exact copy,
notification templates, accessibility, localization, and custody disclosures."*

**This package does not close it, and does not attempt to.** The specification
states plainly that it writes no copy (§2), and CBD-73's inventory is explicit
that it defines *"semantics, not strings"*. What this package contributes to the
row, and what remains:

| Contributed | Still required for closure |
| --- | --- |
| `ED-106-001` maps every outbound email to exactly one of three approved purpose tiers, so the copy work knows which ceiling each template is written against | A Product Owner-approved copy version, template hashes, and the accessibility and comprehension results the row names |
| `ED-106-014` fixes the custody disclosure the row calls for — no remote-erasure promise, no hidden-preview claim, no channel described as private — as a normative rule, restating CBD-74 §6.4 | The exact strings that carry it, in every locale, tested for equivalent meaning across channels and assistive technology |
| `ED-106-016` requires templates live in the repository as versioned source, which is the precondition for the row's template-hash evidence to mean anything | The templates themselves, and the localization the row requires |

The row's stated effect while open — that customer-facing release of the affected
experiences is blocked — is unchanged by this package. Nothing here ships an
email.

## 6. Consistency check against the approved decisions

| Approved decision | Source | Honoured by |
| --- | --- | --- |
| Routine product email is content-free | `EM-92-001`; CBD-74 §6.1 | `ED-106-001` |
| Invitation email identifies only the action class and carries a recipient-bound locator | `EM-92-002` | `ED-106-001`, `ED-106-009` |
| Lifecycle and security email may state action class, action-required, and deadline only | `EM-92-003`; `PA-92-008`; `OP-92-008` | `ED-106-001` |
| Links locate but never authorize | `EM-92-004`; `TH-92-006` | `ED-106-009` |
| The provider allowlist is purpose-specific and encodes no prohibited context | `EM-92-005` | `ED-106-008` |
| Every attempt rechecks; stale work is suppressed; callbacks change only delivery and suppression state | `EM-92-006`; `TH-92-021` | `ED-106-010`, `ED-106-011` |
| No tracking content; the custody boundary is stated accurately | `EM-92-007`; CBD-74 §6.4 | `ED-106-007`, `ED-106-014` |
| Security and account notices are never routed through alert preferences | CBD-74 `MN-74-02` | `ED-106-003` — per-stream suppression, complaint scoped to its own stream |
| External delivery is opt-in per recipient per category; in-app is mandatory and never affected by external failure | CBD-74 §5.1 `CF-74-01`, §5.3 | `ED-106-015` |
| No preference widens external content | CBD-74 §6.2 | `ED-106-001` |
| Telemetry is content-free; derived copies inherit sensitivity | `AN-92-003`; CBD-91 §4 rule 5 | `ED-106-012` |
| Product analytics and behavioural capture are absent, not merely disabled | `AN-92-001`, `AN-92-002`; `TD-103-023` | `ED-106-007` — no remote image at all, not merely no tracking pixel |
| Every destination is personal data | `DI-91-029` | `ED-106-006`, `ED-106-012`, `ED-106-013` |
| Deletion completion fails closed and states its limits | `SR-94-124`; CBD-91 §5.1 | `ED-106-013` |
| Terminal deletion is never resurrected, and lifecycle disposition runs in dependency order | `PA-92-006`; `SA-92-008`; `TB-92-016` | `ED-106-013` |
| Identity ceremonies stay off the push and SMS channels and sit in the `EM-92-003` tier by email | `ID-104-018`; `NT-92-001` | `ED-106-004` |
| Webhook verification and replay rejection happen at the edge before the payload becomes durable | `TD-103-016`; `EP-92-010` | `ED-106-011` |
| Retention and deletion durations are open evidence gaps, not implementer choices | `EG-91-001`–`EG-91-003`; `EG-91-006`; CBD-91 §2.3 | `ED-106-013`; `OI-106-003` |

No approved decision is reopened, weakened, or reinterpreted by this package.

## 7. What this package does not establish

* **No provider is selected, and none is selectable yet.** All three candidates
  hold `ELIGIBLE-PENDING-EVIDENCE` on 1, 1, and 2 documentary passes of 24 —
  low because eleven pass tests are observation-bound, which is the highest
  share of any category evaluated so far.
* **Nothing was sent.** Eleven of 24 pass tests require sending mail and
  inspecting what arrives. The observations are authorized under `OI-103-008`
  but not performed, and `OI-106-007` records the synthetic-destination guardrail
  that applies when they are.
* **No rubric total is published and no price is stated**, under the same rules
  as the sibling evaluations (`R4`/`R5`; `CR4`).
* **Every cross-category gate is `UNPROVEN` for every candidate**, with no
  inherited provider-level passes. `OI-106-009` records that this is the widest
  evidence gap in the CBD-15 set and where the remaining work is.
* **No copy exists.** `FU-95-017` and `EG-91-006` remain open, and no
  customer-facing email ships from this package.
* **No retention, retry, DMARC policy, or alert-threshold value exists.**
  `OI-106-002`, `OI-106-003`, `OI-106-004`, and `OI-106-014` own them.
* **One matrix outcome depends on a reviewer decision this record does not
  make.** `OI-106-017` asks the Product Owner to classify vendor support-centre
  articles; classified Asserted, C5's `HG-102-052` pass becomes `UNPROVEN` and
  no candidate passes that gate.
* **Nothing is built.** Every `ED-106-*` decision is a design record;
  `EX-102-007`'s principle applies — a control that is CoBudget-side work is not
  effective until built and verified.
* **No second person has reviewed this package**, and no provider was contacted.

## 8. Review record

| Property | Value |
| --- | --- |
| Reviewed by | Alexander Wohlford — Product Owner, August 21, 2026. |
| Independent review | None. |
| Provider contact | None. All evidence is desk research retrieved August 21, 2026, including the reused cross-category records. No account was created and no message was sent. |
| Mechanical verification | `scripts/audit-cbd-106.py`; `scripts/check-doc-vocabulary.py` |
| Limitations | Evaluation §3 (evidence ceiling, remedy authorized), §3.1 (symmetry statement, and the absence of reused provider-level records); Operational §5.1 (no prices); §7 above |

### 9.1 Revision record

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | August 21, 2026 | Initial approved package. |
| 1.1 | August 21, 2026 | Reuses the CBD-103 cross-category documentary pass of the same date. Three documentary gate outcomes move: C2 gains `HG-102-011` (`EV-102-007`), C3 gains `HG-102-005` (`EV-102-011`) and `HG-102-010` (`EV-102-162`, `EV-102-163`). This **reverses v1.0's stance on provider-level reuse** for two gates, and the reversal is deliberate: `HG-102-005` and `HG-102-010` ask about an administrative access model and a platform encryption posture that ACS inherits from Azure rather than implements itself, which is not true of the category **E** gates v1.0 was guarding against. Half-answers `OQ-106-004`: `EV-102-012` establishes that **Azure Communication Services is absent from the Customer Lockbox supported-services list**. Adds `OI-106-018`, recording that `EV-102-007` names a subprocessor processing email deliverability metrics. Also carries two gates the same pass advanced without moving an outcome: `HG-102-006`, where all three hyperscalers separate backup read, restore execution and key use but none documents a restore-approval permission (`OI-103-020`), and `HG-102-013`, where the contracts were read and the remaining gap is named at `OQ-103-025`. A later retrieval in the same pass added `HG-102-010` for C2: `EV-102-174`, the current EC2 data-protection page, supplies the transport half and supersedes the historical whitepaper, closing `OQ-103-022`. A further retrieval in the same pass added `HG-102-002` for C2 (`EV-102-177`): X-Ray's trace ID is per-request and its `user` field is optional, where Application Insights documents a cookie-persisted anonymous `user_Id` that feeds sampling (`EV-102-178`), which is why C3 stays `UNPROVEN` on that gate pending `OI-103-021`. **No verdict, no observation, no price, no `ED-106-*` decision, and no acceptance-criterion status changes.** |
| 1.2 | August 22, 2026 | C5 Postmark's subprocessor list was obtained (`EV-102-181`) and **misses `HG-102-011` on one word**: it enumerates Deft, AWS and Zendesk and states its region, but carries no date, and the pass test requires the list be *"obtained and dated"*. That is a property of the page, not a retrieval gap, and it is not a `FAIL` — C5 both enumerates and commits to a region. Adds `OQ-106-013`. Records that C5 runs on AWS, so selecting it does not diversify away from C2. **No gate outcome, verdict or tally moves.** |

The v1.1 change adds no evidence of its own. Every record it relies on was
registered by the CBD-103 evaluation and is reused here rather than
re-retrieved, which is the pattern `EV-102-001`–`006` established and CBD-105
already follows. C5 Postmark gains nothing, because the pass covered the three
hyperscalers only — a gap in the pass, not a finding about Postmark.
