# CBD-102 — Weighted Provider Evaluation Rubric

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Scores the non-gating qualities of a provider that has already been measured against the CBD-102 hard-gate catalog. Product Owner approval of the weights is required before CBD-103–107 score a vendor. |
| Document version | 0.1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Pending Product Owner review |
| Jira | [CBD-102](https://cobudget.atlassian.net/browse/CBD-102) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Hard-Gate Catalog v0.1.0; Demand Model v0.1.0; Cost Template v0.1.0; Evidence Register and Exception Rules v0.1.0 |
| Confluence page | [CBD-102 — Weighted Provider Evaluation Rubric](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/9142327) |
| Repository baseline | `c88a7c8` |
| Last updated | August 16, 2026 |

## 1. Purpose and relationship to the gates

This is the **weighted half** of the CBD-15 decision method. It scores qualities
that vary in degree, where the approved CBD-72/CBD-91/CBD-92 material and the
architecture baseline set no binding threshold.

The two halves are deliberately separate documents, and the separation is
load-bearing rather than editorial:

| | Hard-gate catalog | This rubric |
| --- | --- | --- |
| Question | May this provider be used at all? | How good is it, among those that may? |
| Result | Pass / Unproven / Fail / Fail + compensating control | 0–4 per criterion, weighted to 100 |
| Authority | Cites an approved source; not discretionary | Judgment against defined anchors |
| Effect of a bad result | Ineligible, or blocked pending evidence | Lower score |
| Order | **First** | Only after every gate is evaluated |

A criterion appears here precisely because it has **no** approved binding
source. If a candidate criterion can cite a `DI-91-*` class, a CBD-92 contract
ID, a CBD-72 permission, or the architecture security baseline, it is a gate and
belongs in the catalog instead. §11 of the catalog lists the candidates moved
here for exactly this reason, and every one of them is scored below.

## 2. Scoring scale

One scale applies to every criterion. Anchors are defined per criterion in
§5–§11; the general meaning is fixed here.

| Score | Anchor |
| --- | --- |
| **0** | Absent, or present in a form that actively creates work or risk for CoBudget. |
| **1** | Present but materially deficient — usable only with continuing compensating effort. |
| **2** | Adequate. Meets ordinary expectation for a serious managed provider in this category. |
| **3** | Strong. Better than ordinary, and the advantage is evidenced rather than claimed. |
| **4** | Exceptional. Evidenced, and materially reduces an identified CoBudget risk or operating burden. |

A criterion that genuinely does not apply to a category is scored `n/a` and
removed from both the numerator and the weight denominator for that category.
`n/a` is a statement that the criterion cannot apply — not a way to drop an
inconvenient low score, and each use records why.

## 3. Rules that prevent a score from hiding a problem

CBD-102's acceptance criteria require that scores cannot hide a failed hard gate
or an unsupported claim. Five rules enforce that. They are not advisory.

**R1 — Gates first, and the verdict travels with the score.** No rubric score is
computed until every applicable gate has been evaluated. A weighted score is
never reported as a bare number; it is always reported with its eligibility
verdict attached:

| Verdict | Meaning |
| --- | --- |
| `ELIGIBLE` | Every applicable gate passed. |
| `ELIGIBLE-PENDING-EVIDENCE` | One or more gates are `UNPROVEN` — evidence was Asserted or Absent, so the property is neither confirmed nor refuted — and none failed. Not disqualified, but cannot be selected until the evidence is obtained. |
| `CONDITIONAL` | One or more gates failed but carry a recorded compensating control, residual risk, and named approver under catalog §2.4 and the exception rules. |
| `INELIGIBLE` | One or more gates failed with no approved exception. |

`UNPROVEN` is defined in the evidence register §3.3 and is kept distinct from
`FAIL` because the remedy differs entirely: an unproven gate needs better
evidence, a failed one needs a compensating control or a different provider.
Collapsing them would either discard a viable provider or let an unsupported
claim through as a pass.

A high score on an `INELIGIBLE` provider is not a recommendation and is not a
tie-breaker. It is recorded only so the evaluation is reproducible.

**R2 — Assertion caps the score at 2.** A criterion scored on vendor assertion
alone — marketing copy, a sales answer, an unaudited self-attestation — cannot
score above `2`. Scores of `3` and `4` require observed behaviour, an
independent attestation, or a contractual commitment. This makes an unsupported
claim structurally incapable of lifting a provider above "adequate".

**R3 — An unsupported claim scores 0, not the benefit of the doubt.** Where a
vendor asserts a property and the evidence attempt fails to confirm it, the
criterion scores `0` and the failure is recorded. Absence of evidence is scored
as absence, because CBD-92 §10.3 fixes that a provider name alone is not closure
evidence.

**R4 — Dimensions never fully compensate.** Per-dimension subscores are always
reported alongside the total. A total is never published on its own, so strength
in one dimension cannot silently mask a `0` in another. Any criterion scoring
`0` is listed explicitly in the evaluation summary regardless of the total.

**R5 — The evidence-confidence profile is part of the result.** Every evaluation
reports the share of its criteria at each confidence level, so a well-evidenced
`2.8` is distinguishable from a mostly-asserted `2.8`. Confidence levels are
defined in the evidence register.

## 4. Dimensions and weights

Seven dimensions are required by CBD-102's acceptance criteria. Weights differ
by category because the same dimension carries genuinely different consequences
for, say, an identity provider and a database.

Comparison is **within** a category — CBD-104 compares identity providers
against each other — so per-category weight profiles preserve valid comparison
rather than undermining it. Cross-category score comparison is meaningless and
is not a supported use of this rubric.

| Dimension | Base | H hosting | I identity | D PostgreSQL | E email | F financial | N push/SMS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Security | 20 | 20 | 24 | 20 | 16 | 24 | 16 |
| Privacy | 18 | 15 | 16 | 14 | 22 | 20 | 26 |
| Solo-operator ongoing effort | 18 | 22 | 10 | 20 | 12 | 8 | 10 |
| Reliability | 15 | 18 | 16 | 20 | 18 | 16 | 18 |
| Portability | 12 | 12 | 14 | 14 | 14 | 16 | 14 |
| Support | 10 | 8 | 8 | 8 | 8 | 8 | 8 |
| Accessibility | 7 | 5 | 12 | 4 | 10 | 8 | 8 |
| **Total** | **100** | **100** | **100** | **100** | **100** | **100** | **100** |

**Every column was approved by the Product Owner on August 16, 2026.** Base
through F were approved first; column N was added later the same day with
provider category N and approved on the same reasoning. The profiles are fixed
for the duration of CBD-103–107 and CBD-130 — changing a weight mid-evaluation
invalidates comparison within that category.

### 4.1 Why the weights differ

* **Identity and financial connectivity carry the highest security weight (24).**
  Both sit directly on S4 material — `DI-91-002/003` factors and sessions,
  `DI-91-010` provider secrets — and a compromise in either is the
  account-takeover or direct-financial-compromise path named in those classes.
* **Email carries the highest privacy weight (22).** Every destination is
  personal data under `DI-91-029`, and `DI-91-049` governs the delivered copy by
  its highest permitted content sensitivity while CoBudget controls none of it
  after handoff. Financial connectivity is close behind at 20 for the
  institution-relationship exposure in `DI-91-011`.
* **Hosting and PostgreSQL carry the highest solo-operator weight (22 and 20).**
  Ongoing operational burden concentrates in compute, queues, and database
  backup/restore. Identity and financial connectivity carry the lowest (10 and
  8) because the vendor absorbs most of the recurring work once integrated.
* **Financial connectivity carries the highest portability weight (16).** Exit
  means every user re-authorizes every connection through a new provider-hosted
  ceremony; there is no data-migration substitute. Identity is next at 14 for
  the same reason — CoBudget holds no credentials, so migration means
  re-enrolment.
* **Accessibility is weighted by whether the vendor renders a surface a CoBudget
  customer sees.** Identity (12) renders hosted authentication screens, email
  (10) renders messages in the recipient's client, and financial connectivity
  (8) renders the institution authentication ceremony. PostgreSQL (4) and
  hosting (5) render only an operator console, where the only affected person is
  the solo operator.
* **Support is uniformly low (8).** `OP-92-001` and `OP-92-002` already prohibit
  the vendor-support model that would make support most valuable — direct staff
  access to customer content. What remains is genuine but bounded.
* **Push and SMS carry the highest privacy weight in the set (26).** It is the
  least controllable channel CoBudget uses. SMS crosses an unencrypted carrier
  network that retains and may mirror the message; push places a device-resident
  copy on a lock screen. `DI-91-049` and `EG-91-024` treat both as recipient- and
  platform-controlled copies CoBudget cannot retract. Security is comparatively
  low (16) only because `NT-92-001` already removes the content that would make
  a breach damaging — the body is fixed and carries nothing.

## 5. Security (non-gating)

The gates already take every binding security constraint. These criteria score
assurance quality above that floor.

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-001 | Independent security assurance | No independent assurance of any kind | Current SOC 2 Type II or ISO 27001 with relevant scope | Current assurance **plus** a scoped penetration-test summary obtainable under NDA, with remediation evidence |
| WR-102-002 | Vulnerability handling | No disclosure policy or published advisories | Published advisory feed and a stated patch commitment | Documented severity-based patch targets, met on observable history, with proactive customer notification |
| WR-102-003 | Key-management depth beyond `HG-102-024` | Provider-held keys only, no rotation control | Managed KMS with documented rotation | HSM-backed, customer-managed keys with automated rotation and non-exportability |
| WR-102-004 | Incident history and disclosure candour | Undisclosed or minimized past incidents | No material incidents, or disclosed with basic detail | Full public postmortems with cause, scope, and correction; candour visible under pressure |
| WR-102-005 | Network isolation options | Public endpoint is the only option | Private networking available | Private networking with no public endpoint required, plus egress control |
| WR-102-033 | Assurance granularity beyond `HG-102-030` | Session-level authentication only; no finer assurance concept | Step-up assurance available for nominated actions | Risk-based and per-action assurance with policy control, so a broader assurance matrix can be adopted without changing provider |

`WR-102-033` scores the headroom above the gated floor. `HG-102-030` gates
action-bound step-up for the protected actions CBD-72 names. The
`docs/architecture.md` line requiring stronger authentication for "access"
generally is an unresolved ambiguity under `CR-91-010`, pending
`EG-91-004/007`; until it resolves, a provider's ability to support a wider
assurance matrix is a scored quality rather than a binding requirement. This
criterion is `n/a` for categories that perform no authentication ceremony.

Criterion numbers are stable citation keys and are never reused or renumbered. A
number out of sequence within a dimension means the criterion was added later
and is displayed with the dimension it belongs to, following the CBD-91 §3
convention.

## 6. Privacy (non-gating)

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-006 | Subprocessor stability and notice | Undisclosed or changeable without notice | Published list with advance-change notice | Published list, meaningful notice period, and a contractual objection right |
| WR-102-007 | Residency granularity beyond `HG-102-011` | Region is best-effort or unstated at the storage layer | Region selectable and honoured for primary storage | Region honoured across primary, replica, backup, **and** support tooling, with evidence |
| WR-102-008 | Retention minimization defaults | Long or indefinite defaults, not adjustable | Adjustable retention with a reasonable default | Short defaults, per-data-type control, and verifiable deletion |
| WR-102-009 | Data-processing agreement quality | No DPA, or one that reserves broad secondary use | Standard DPA with purpose limitation | DPA with narrow purpose limitation, no secondary use, and clear breach-notification timelines |
| WR-102-010 | Telemetry minimization beyond the `AN-92-003` floor | Minimum allowlist achievable only with continuing effort | Allowlist achievable through supported configuration | Content-free telemetry is the provider's default posture, not a configuration CoBudget must maintain |

## 7. Accessibility

Scored against whichever surface the vendor renders. §4.1 explains why the
weight tracks that distinction. Where a vendor renders no customer-facing
surface, `WR-102-011` is `n/a` and the weight falls to the operator-console
criteria.

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-011 | Customer-facing rendered surfaces — hosted authentication screens, institution-link ceremonies, rendered email | Known barriers, or no conformance position | Claims WCAG 2.2 AA with a current ACR | Conformance independently evaluated, defects published with remediation dates, and the surface is customizable enough for CoBudget to correct residual issues |
| WR-102-012 | Operator console accessibility | Console unusable by keyboard or screen reader for routine tasks | Routine operational tasks completable with assistive technology | Fully conformant console, and every routine task also available through an API or CLI that bypasses the console entirely |
| WR-102-013 | Published conformance documentation | None | Current VPAT/ACR covering the evaluated product | Current, product-specific, independently prepared, and versioned with the product |

## 8. Reliability

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-014 | Demonstrated availability | No status history, or history contradicting claims | Public status page with ≥12 months of history consistent with the SLA | ≥24 months of public history, per-component, with incident detail and no undisclosed gaps |
| WR-102-015 | SLA terms and remedy | No SLA | Stated SLA with a service-credit remedy | Meaningful SLA with automatic credits and no exclusion that voids it in practice |
| WR-102-016 | Incident communication | Silent or late during incidents | Timely status updates during incidents | Timely updates, proactive customer notification, and published postmortems |
| WR-102-017 | Failover and multi-region | Single-zone only | Multi-zone within a region | Multi-region capability with documented, tested failover behaviour |
| WR-102-018 | Maintenance and forced change | Unannounced maintenance or forced breaking upgrades | Announced windows and deprecation notice | Long deprecation windows, customer-controlled upgrade timing, and no forced breaking change inside a stated support period |

## 9. Support

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-019 | Response targets on the affordable plan | No support, or targets only on a plan far above the demand model | Stated targets on a plan within the base demand tier | Meaningful targets on the affordable plan, met on observable evidence |
| WR-102-020 | Escalation path for a single-operator customer | Escalation requires an account team CoBudget will not have | Documented escalation route available to small customers | Direct engineering escalation available for severity-1 without an enterprise contract |
| WR-102-021 | Documentation quality | Sparse, stale, or contradicted by behaviour | Complete and broadly accurate | Complete, versioned, accurate against observed behaviour, with honest limitation notes |
| WR-102-022 | Effectiveness without customer-content access | Support is useless unless CoBudget grants content access it cannot grant | Support can diagnose from correlation identifiers and service state | Support is designed for content-free diagnosis and does not request customer data |

`WR-102-022` scores what remains **after** `OP-92-001/002` remove the
content-access support model. A provider whose support is only effective when
staff can read customer data does not merely score low here — it fails
`HG-102-007`.

## 10. Portability

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-023 | Export completeness | Data only, or no bulk export | Bulk export of data and schema in a documented format | Complete export of data, schema, configuration, and policy, on demand and without vendor involvement |
| WR-102-024 | Interface standardization | Wholly proprietary interface | Largely standard with proprietary extensions | Standards-based interface a competitor could satisfy without rewriting CoBudget's integration |
| WR-102-025 | Documented exit path | No migration guidance | Migration documented | Migration documented **and** demonstrated by identifiable customers who left |
| WR-102-026 | Contractual exit terms | Data return not addressed, or access ends at termination | Stated post-termination data-return period | Guaranteed return period, assisted migration, and documented deletion on exit |

## 11. Solo-operator ongoing effort

CBD-102 requires this dimension to be scored on **ongoing operational burden,
not setup alone**. This rubric applies the stricter reading: one-time setup
effort does not score at all. It is recorded as context in `WR-102-032` so that a
punishing integration is visible, but it cannot move the dimension, because a
weekend of setup and a recurring weekly obligation are not comparable costs for
a single-operator project.

| ID | Criterion | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| WR-102-027 | Recurring operational tasks | Frequent mandatory manual work — patching, cert rotation, capacity intervention | Occasional routine tasks, mostly automatable | Effectively zero recurring manual obligation; the provider absorbs it |
| WR-102-028 | Upgrade and deprecation cadence | Frequent forced migrations on short notice | Predictable major-version cadence with adequate notice | Long support windows; migrations rare, well-documented, and rehearsable |
| WR-102-029 | Alerting burden on one person | Noisy or non-actionable alerts, or none at all | Actionable alerting with reasonable defaults | Tunable, low-noise alerting that distinguishes a genuine page from routine variation |
| WR-102-030 | One-person recoverability | Common failures need vendor escalation to resolve | Documented runbooks cover common failures | Common failures are self-service and rehearsable, including restore, without vendor involvement |
| WR-102-031 | Cognitive surface | Many consoles and concepts to hold to operate safely | Coherent model with a manageable concept count | Small, coherent surface; safe operation does not require holding vendor-specific trivia |
| WR-102-032 | *Setup effort (context only — does not score)* | — | — | — |

`WR-102-030` interacts with the catalog §2.5.1 second-principal disposition.
CoBudget now staffs separated recovery duties rather than relaxing them, so a
provider's recovery model assuming separated duties is satisfiable — but a
provider that requires the *same* principal to hold data and keys is a gate
failure under `HG-102-006`, not a low score here. What this criterion scores is
how much of a recovery a single operator can complete without vendor
escalation, given that the second principal approves return to service and never
executes it.

## 12. Producing a result

An evaluation record for one provider in one category contains, in this order:

1. **Eligibility verdict** — `ELIGIBLE`, `ELIGIBLE-PENDING-EVIDENCE`,
   `CONDITIONAL`, or `INELIGIBLE` per R1, with every failed gate and its cited
   source listed, and every `UNPROVEN` gate listed separately since its remedy
   is evidence rather than a control.
2. **Compensating controls and residuals** — for a `CONDITIONAL` verdict, each
   entry per catalog §2.4, including the named approver.
3. **Per-dimension subscores** — all seven, weighted for the category, per R4.
4. **Weighted total** — out of 100, never reported without items 1 and 3.
5. **Every criterion scoring 0** — listed explicitly per R4.
6. **Evidence-confidence profile** — per R5.
7. **Open questions** — anything the evidence attempt could not resolve.

### 12.1 Worked shape

```
Provider:  <name>            Category: I — identity
Verdict:   CONDITIONAL       Gates: 9 pass, 1 fail + compensating control
  HG-102-036 FAIL — admin console requires a standing credential.
    Compensating control: hardware-key-enforced break-glass account,
      credential held in the secret manager, console access alerted.
    Residual: a durable human-held production credential exists,
      contrary to OP-92-004. Affects DI-91-002/003 (S4).
    Approver: <Product Owner>, <date>.

Security 24 × 2.8   Privacy 16 × 3.0   Solo 10 × 3.5   Reliability 16 × 2.5
Portability 14 × 1.5   Support 8 × 2.0   Accessibility 12 × 3.0
Weighted total: 2.63 / 4.00

Zero scores:      WR-102-025 (no identifiable customer has migrated off)
Confidence:       observed 48%, attested 31%, asserted 21%
Open questions:   support response targets on the base-tier plan unconfirmed
```

The verdict line is printed above the score in every report. A `CONDITIONAL` or
`INELIGIBLE` provider whose total exceeds an `ELIGIBLE` provider's does not win
on points; R1 settles the order before any total is compared.

## 13. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-102-006 | **Resolved August 16, 2026.** Product Owner approved every weight column as proposed, including column N added later the same day. | Closed. Changing any weight after scoring begins invalidates comparison within that category, so the profiles are fixed for the duration of CBD-103–107 and CBD-130. |
| OI-102-007 | `WR-102-011` names WCAG 2.2 AA as the level a vendor claim is measured against. No approved CoBudget source fixes a conformance level for a provider surface; the level is chosen here as the current common standard. | Confirm the level, or replace it with whatever CoBudget's own accessibility position turns out to be. Related to catalog §11. |
| OI-102-008 | **Resolved August 16, 2026.** `WR-102-019` scores support targets against a plan within the base demand tier, which the demand model now defines. | Closed. The base tier is 30 monthly active users, 15,600 requests/month, 0.4 GB, 250 emails in the peak month, and 61 financial connections. |
