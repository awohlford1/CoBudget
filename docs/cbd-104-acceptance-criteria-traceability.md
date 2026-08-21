# CBD-104 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026 and v1.1 on August 21, 2026. Maps each CBD-104 acceptance criterion and deliverable to the exact evidence that answers it, and states plainly where the answer is a design record rather than a verified property. v1.2 records the reuse of the CBD-103 cross-category documentary pass — see §9.1. No acceptance criterion changes status and no verdict moves. |
| Document version | 1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 19 identity-boundary decisions, the screening and 25-gate evaluation with its verdicts and evidence register, the integration and cost assessment with its stated prices and `CR4` unknowns, and this traceability record. It approves no provider, publishes no rubric score, gathers no observation evidence, closes no `FU-95-007` work, and leaves `OI-104-007`–`OI-104-014`, `OI-102-022`, and every `OQ-104` question open. The v1.1 re-approval covers the corrected C2 step-up finding, the four records supporting it, and the narrowed `OQ-104-007`; it changes no gate outcome, verdict, tally, or price. **The v1.2 re-approval covers three moved documentary gate outcomes reused from the CBD-103 pass and one new open question; it settles none of `OI-103-017`, `OI-103-018`, or `OI-103-019`, which reserve readings to the Product Owner.** |
| Jira | [CBD-104](https://cobudget.atlassian.net/browse/CBD-104) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Identity Integration Boundary Specification v1.1; Candidate Shortlist and Gate Evaluation v1.2; Integration, Outage, Support, Cost, and Exit Assessment v1.1 |
| Confluence page | [CBD-104 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/13172737) |
| Repository baseline | `d0d5bb1` |
| Last updated | August 21, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-104-identity-integration-boundary-specification.md` | The managed-identity boundary, as 19 `ID-104-*` decisions |
| `docs/cbd-104-candidate-shortlist-and-gate-evaluation.md` | Shortlist, screening, 25-gate comparison matrix, verdicts, and the `EV-102-*` evidence register |
| `docs/cbd-104-operational-and-cost-assessment.md` | Integration surface, outage, rate limits, telemetry, cost with prices, support, and the migration/exit plan |
| `docs/cbd-104-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-104.py` | Mechanical guard over identifier resolution, matrix completeness, and the restated tallies |

## 2. Status vocabulary used below

CBD-104 is a research and evaluation task, so most criteria are answered by a
design record or a piece of retrieved evidence rather than by a working
system. The distinction is kept visible, using the same vocabulary CBD-103
established:

| Status | Meaning |
| --- | --- |
| **Met** | The criterion asks for a documented outcome, and the document exists and answers it |
| **Met (design)** | The criterion is answered by a design decision with a cited approved source. Nothing is built, and this is not evidence that the design works |
| **Partially met** | Part of the criterion is answered and part is named as an open question with a retrieval action |

No criterion is marked Met on the strength of a claim that has no evidence
record behind it.

## 3. Acceptance criteria

### AC1 — MFA, passkey direction, secure recovery, session revocation, and fresh reauthentication are evaluated

**Status: Met**, with every gate outcome carried at its true strength.

| Sub-criterion | Evaluated where | Result |
| --- | --- | --- |
| MFA | `HG-102-029` matrix row; `ID-104-008` | `PASS` on all three from documented evidence. It is also the gate that forces the `CR0` tier on C4 and C2 |
| Passkey direction | `HG-102-029`; `ID-104-008`; `ID-104-019` | `PASS` on all three carried candidates, and the **screen that removed Google Cloud Identity Platform** from the category (`EV-102-029`). The direction is settled: passkeys are a first-class factor, and the RP ID is a CoBudget domain |
| Secure recovery | `ID-104-009`; `HG-102-032`; `SR-94-006` | Boundary settled — recovery is an IdP ceremony, separated from notification destinations, non-resurrecting, and enumeration-resistant. The provider-behaviour half is `HG-102-032`, an observation gate |
| Session revocation | `HG-102-031` matrix row; evaluation §7.2; `ID-104-004`–`006` | `UNPROVEN` on all three, with materially different documented positions recorded per candidate. The finding that survives: no candidate's provider-side session surface can substitute for the application-session boundary |
| Fresh reauthentication | `HG-102-030`, `HG-102-037`; evaluation §7.1; `ID-104-007` | `UNPROVEN` on all three, and **the sharpest differentiator in the category**. C4 documents a per-action primitive with no stated validity window; C3 documents Conditional Access authentication context; **C2 was revised at v1.1** — `prompt=login` plus an `auth_time` claim is a native primitive needing no customer-built orchestration, which retires the documentary `FAIL` risk v1.0 recorded. No candidate documents an assurance-level claim |

"Evaluated" is met in full. Four of the five sub-criteria terminate in an
`UNPROVEN` gate rather than a `PASS`, which is the correct outcome of
evaluating them against pass tests that require observation — not a gap in
the evaluation.

### AC2 — CoBudget remains authoritative for application roles and permissions

**Status: Met (design).**

| Evidence | Where |
| --- | --- |
| CoBudget is the sole authority for roles and permissions; provider RBAC, groups, organizations, and fine-grained authorization are deliberately unused | `ID-104-003` |
| No budget-space role claim is carried in any provider-issued token | `ID-104-003` |
| One IdP identity per account subject; budget spaces, memberships, and Viewer profiles are never synchronized to the directory | `ID-104-002` |
| The approved sources that force it — default-deny, server-side evaluation at open and mutation time, and an authentication result that grants no role by itself | `PM-72-001`, `PM-72-002`, CBD-72 §8, `SR-94-001` |
| The consequence stated plainly: a provider losing or corrupting its directory can deny access but can never widen it | Boundary §4 |
| Exit consequence — memberships, roles, and permissions are untouched by a provider change | Assessment §8.1 |

This criterion is the one CBD-104 answers most completely, because it is
satisfied by refusing capability rather than by acquiring it. Nothing needs
to be observed on a provider to establish it.

### AC3 — Enumeration resistance, rate limits, abuse controls, audit events, export/deletion, and isolation implications are documented

**Status: Partially met.**

| Sub-criterion | Status | Where |
| --- | --- | --- |
| Enumeration resistance | **Partially met.** The requirement, its uniform-response shape, and the hosted-surface consequence are documented; C2's API-level configuration and its two documented residuals are established (`EV-102-026`). The pass test's hosted-screen comparison is unperformed for all three, and the C4/C3 documentary halves are unretrieved | Evaluation §7.4, `HG-102-032`; `ID-104-009`; `OQ-104-011` |
| Rate limits | **Partially met.** Where each ceiling is enforced is settled, including the finding that a hosted-ceremony integration makes throttling a **vendor** property. No values exist, by `RL-92-007`/`ME-94-010` design | Assessment §4; `OI-104-002` |
| Abuse controls | **Partially met.** Lockout-that-cannot-be-weaponized and pre-authentication counting keys are settled at CoBudget's edge; provider-side lockout behaviour is unretrieved | Assessment §4; `OQ-104-019` |
| Audit events | **Met (design).** The three-boundary routing of authentication evidence, and the decision that CoBudget's audit store — not provider logs — is the record of record, with the retention arithmetic that forces it | `ID-104-011`, `ID-104-012`; assessment §5; `EV-102-028` |
| Export / deletion | **Partially met.** Deletion propagation, the evidence it must produce, and the provider-retention disclosure are settled as requirements; the export side is documented as the exit asset table. Both `HG-102-012` and `HG-102-035` are observation gates and unperformed | `ID-104-013`; assessment §8.1; `OQ-104-017` |
| Isolation implications | **Met.** Three-tenant environment isolation, and the blast-radius consequence of keeping budget-space structure out of the directory | `ID-104-002`, `ID-104-014`; assessment §5 |

The honest reading of "documented" sets this to Partially met: naming a
provider's rate limits as a question makes the *requirement* explicit, not
the *limit*. Two sub-criteria are fully answered because they are CoBudget
design decisions rather than vendor properties.

### AC4 — Custom domain/templates, sandbox, SDK/API, webhook reliability, and failure behaviour are covered

**Status: Partially met.**

| Sub-criterion | Status | Where |
| --- | --- | --- |
| Custom domain | **Met.** Required by `ID-104-019`, with the RP-ID reasoning that makes it an exit-cost decision rather than a branding one, and the per-candidate prerequisite facts | Assessment §2.1; `EV-102-021`, `EV-102-023` |
| Templates | **Partially met.** Template control is partial by construction and is a scored quality; the ceremony-email boundary CoBudget does not control is stated rather than assumed away | Assessment §2.1, §2.2; `ID-104-018`; `OI-104-005` |
| Sandbox | **Partially met.** Three isolated tenants are required; whether each candidate permits them, and at what cost, is unretrieved | Assessment §2.5; `ID-104-014`; `OQ-104-018` |
| SDK / API | **Met (design).** Standard OIDC with PKCE, no provider SDK in the domain layer, and an explicit list of what is deliberately unused | Assessment §2.3; `ID-104-019` |
| Webhook reliability | **Partially met.** The dependency is identified and its asymmetry stated — CoBudget-originated revocation does not depend on it, provider-originated events do — with the topology posture that applies. No candidate's delivery guarantee is retrieved | Assessment §2.4; `ID-104-006`; `OQ-104-020` |
| Failure behaviour | **Met.** Component-by-component outage table, with both the payoff and the cost of `ID-104-004` stated in prose | Assessment §3, §3.1 |

The failure-behaviour row carries the finding most likely to matter later:
**identity availability is on the critical path for every CBD-72 protected
action, with no approved fallback** (`OI-104-012`).

### AC5 — Pricing uses the actual billable unit and exposes threshold cliffs

**Status: Met**, with unobtained lines marked `UNKNOWN` under `CR4`.

| Sub-criterion | Status | Where |
| --- | --- | --- |
| The actual billable unit | **Met.** Monthly active users, Base 30 and High 120, from `DM-102-005 × DM-102-008` — and each provider's own MAU definition recorded and converted explicitly, as cost template §5.1 requires | Assessment §6.2 |
| Prices | **Met** for the lines that were retrieved. Three complete `CT-102-*` records with figures, and every unobtained line marked `UNKNOWN` rather than zero | Assessment §6.4; `EV-102-017`–`020` |
| `CR0` tier discipline | **Met.** The tier priced is the cheapest that clears every gate, and the gate forcing it is named per candidate | Assessment §6.3 |
| Threshold cliffs | **Met.** Seven specific cliffs with their triggers, including the two that could move a candidate's cost by an unbounded amount | Assessment §6.7 |
| Comparison discipline | **Met.** `CR1` permanence reasoning, `CR3` gates-over-cost, `CR7` single-scenario quoting, and four qualifications preventing the figures from reading as a ranking | Assessment §6.5, §6.6 |

This is the criterion where CBD-104 goes further than its CBD-103 sibling
could. Identity list pricing is published at the billable unit, so §6.1
records why prices are stated here when CBD-103 stated none, and the
distinction between a **permanent allowance** and a **time-limited
reduction** is argued rather than assumed — it is what keeps two candidates'
zero figures inside the `CT-102-017` comparison figure legitimately.

## 4. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| Provider shortlist and comparison | **Met.** Six-capability screen, two candidates screened out with the missing class named, three carried into a 25-gate matrix with a stated carried-set rule | Evaluation §4, §6 |
| Authentication assessment | Met (design) | `ID-104-001`–`003`; `HG-102-028`, `HG-102-029` |
| Recovery assessment | Met (design) | `ID-104-009`; evaluation §6.2 |
| Session assessment | **Met.** Boundary settled and the per-candidate documentary positions established | `ID-104-004`–`006`; evaluation §7.2 |
| MFA / passkey assessment | **Met** | `ID-104-008`; `HG-102-029`, `HG-102-034`; evaluation §6.2 |
| Invitation assessment | Met (design) | `ID-104-010`; evaluation §6.2 |
| Event assessment | **Partially met.** The dependency and its tolerance are settled; no candidate's delivery guarantee is retrieved | `ID-104-006`, `ID-104-011`; assessment §2.4; `OQ-104-020` |
| Export / deletion assessment | **Partially met** | `ID-104-013`; assessment §8.1; `OQ-104-017` |
| Lifecycle assessment | Met (design) | `ID-104-013`, `ID-104-014` |
| Cost plan | **Met**, with `CR4` unknowns | Assessment §6 |
| Migration / exit plan | **Met.** Asset-by-asset portability, the asymmetry against hosting, and a five-step migration sequence | Assessment §8 |

The event row is the one that would be easiest to overstate. The boundary
decision that depends on it (`ID-104-006`) is written, and the design's
tolerance for delivery failure is analysed — but no candidate's actual
delivery mechanism, authentication, or guarantee has been retrieved, so the
row is Partially met rather than Met.

## 5. Dependency satisfied

CBD-104's stated dependency is the *"approved rubric and then-current
CBD-12/CBD-14 requirements."*

| Consumed | How |
| --- | --- |
| Hard-Gate Catalog v1.1 | All 15 **X** and 10 **I** gates evaluated per candidate |
| Evaluation Rubric v1.1 | `R1` verdicts applied; `R4` and `R5` are why no total is published (evaluation §8) |
| Demand Model v1.1 | Identity MAU Base 30 / High 120 priced throughout; `DM-102-022` used in the outage assessment |
| Cost Template v1.1 | `CT-102-001`–`021` filled per candidate with `CR0`–`CR7` applied |
| Evidence Register and Exception Rules v1.1 | Fifteen `EV-102-*` records opened; §3.2 classes and §3.3 verdicts applied; §7 open-question carry-forward followed; §4 re-verification dates set per class |
| CBD-12 / CBD-72 | Permissions 20a, 20b, 27, 29, 34, 35 and §6.1 drive `ID-104-007`; `PM-72-001`–`003` and `PM-72-010` drive `ID-104-002`–`004` |
| CBD-14 (`SR-94-001`–`011`) | Each identity requirement mapped in §8 below |
| CBD-103 package | `TD-103-*` decisions consumed as the runtime this boundary plugs into; `EV-102-001`–`016` and the `OI-103-008` route-A authorization inherited |

Two upstream positions are advanced by this package:

* **The route-A observation authorization is shown to extend to this
  category.** `OI-103-008` was resolved against the CBD-102 pass tests
  generally and amended CBD-15's scope, so CBD-104 needs no separate scope
  decision. Evaluation §3 records that, and `OI-104-008` records that
  authorization gathers no evidence.
* **The `EV-102-*` register is continued rather than forked.** One register
  serves every CBD-15 category, so CBD-104 takes only numbers no sibling
  holds: the unused `EV-102-017`–`029` block, then `EV-102-040`–`041`
  above the 030-to-039 block the CBD-105 evaluation holds, leaving
  `EV-102-007`–`012` to CBD-103's completion pass and reserving
  `EV-102-042`–`047` for this package's.

`OI-102-022` — the unfilled second principal — is **not** advanced, and
`HG-102-006` remains gated in practice by it for this category as for every
other.

## 6. FU-95-007 disposition

`FU-95-007` (P0) routes to CBD-104: *"Identity, invitation proof, sessions,
and reauthentication."* Its required bounded work, item by item:

| Required bounded work | Where | Status |
| --- | --- | --- |
| Define identity-provider boundary | `ID-104-001`–`003`, `ID-104-019` | Met (design) |
| Session issuance / rotation / revocation | `ID-104-004`–`006` | Met (design). Schemas are CBD-21's |
| Assurance freshness | `ID-104-007` | Met (design) |
| Invited-channel proof | `ID-104-010` | **Boundary only.** The ceremony is CBD-73's and remains blocked by `OI-73-001` |
| Opaque one-time reconciliation codes | `ID-104-010` | **Not CBD-104's.** Recorded as CoBudget application records requiring no provider capability |
| Recovery separation | `ID-104-009` | Met (design) |
| Uniform responses | `ID-104-009`; `HG-102-032` | Met (design) for CoBudget's surfaces; the provider half is an unperformed observation |
| Compromised-session tests | — | **Not started.** No test exists |
| Provider decision | Evaluation §6 | **Not closed.** Three candidates evaluated, none selectable. Selection is CBD-108 |
| Data-flow update | Boundary §13 | Met (design) — identity boundary diagram against the CBD-103 topology |
| Session / token schemas | — | **Not started.** CBD-21 owns them |
| Rate values | — | **Not started.** `RL-92-007` / `ME-94-010` own them (`OI-104-002`) |
| Deterministic identity / invitation / recovery test results | — | **Not started** |

**`FU-95-007` remains open.** Its closure evidence requires a provider
decision, a data-flow update, session and token schemas, rate values, and
deterministic test results. This package supplies the boundary and the
data-flow update, and advances the provider decision to a measured shortlist.
It supplies no schemas, no values, and no test results. Its stated effect —
*"Authentication, invitation acceptance, protected actions, and recovery are
blocked"* — is unchanged.

## 7. What this package does not establish

Stated plainly, because a traceability record that only lists what was
achieved is the easiest place for a package to overstate itself.

* **No provider is selected.** All three candidates hold
  `ELIGIBLE-PENDING-EVIDENCE`, with nine observation gates unresolved each.
* **No observation has been performed.** The route-A authorization exists;
  no evaluation tenant has been created (`OI-104-008`).
* **The evidence pass was symmetric on five claims and asymmetric
  elsewhere** (`OI-104-007`). It changes no verdict, because all three
  candidates share one, but it must be completed before CBD-108 ranks
  anything.
* **The standalone field is represented by one vendor** (`OI-104-009`), on
  stated grounds rather than by exhaustive comparison.
* **No rubric score is published** (evaluation §8).
* **Prices are list prices with unknown lines**, not quotes, and two of three
  totals depend on unresolved tier questions (`OI-104-013`).
* **Nothing is built, rehearsed, or tested.** Every `ID-104-*` is a design
  record. `HG-102-014` is `PASS (design)` on all three, which is a statement
  about provider eligibility, not evidence that CoBudget built the control.
* **Nothing here has been reviewed by a second person**, and no provider was
  contacted. The independent security review that CBD-92 §1 and the
  architecture baseline require before public launch remains outstanding.
* **No CBD-11, CBD-12, CBD-14, or CBD-73 decision is changed.** Where this
  package cites one, it cites it as a binding input.

## 8. Consistency check against CBD-12 and CBD-14

The approved decisions most likely to be contradicted by an identity
boundary, and where each is honoured.

| Approved decision | Source | Honoured by |
| --- | --- | --- |
| An authentication result must not grant a budget-space role by itself | `SR-94-001` | `ID-104-003` — the IdP authenticates; CoBudget authorizes |
| Session identifiers rotate after authentication, recovery, assurance elevation, and account switch; logout, recovery, factor change, deletion, and security revocation invalidate affected sessions | `SR-94-002` | `ID-104-004`, `ID-104-006` — bidirectional invalidation over a CoBudget-held session record |
| Protected actions require current server-side authorization and, where CBD-72 requires it, fresh assurance bound to subject, space, action class, and target | `SR-94-003` | `ID-104-007` — action-bound assurance validated at commit with current CBD-72 §8 inputs |
| Account switch, logout, and access loss clear reachable app-controlled customer state and require a new live authorization boundary | `SR-94-005` | `ID-104-004`, `ID-104-006`; `CL-92-002` forbids client persistence |
| Identity and recovery support must not impersonate, transfer ownership, change a role, or convert channel possession into product authority | `SR-94-006` | `ID-104-009`; assessment §7 applies the same test to the **vendor's** staff via `HG-102-008` |
| Invitation responses and observable timing are equivalent across every failure class; no response asserts an unverified subject fact | `SR-94-007` | `ID-104-010` — the ceremony stays CoBudget's; `HG-102-032` covers the IdP's own surfaces |
| An invitation locator is opaque, single-use, recipient-bound, and stored only as a one-way verifier | `SR-94-008`; `IC-73-002` | `ID-104-010` — a CoBudget application record (`DI-91-006`), never a provider token |
| Channel control is not sole control; verification confers no identity, login, recovery, or account authority | `IC-73-005` | `ID-104-009`, `ID-104-010` — invited channel never becomes login, recovery, or destination |
| Invitation surfaces must not let an attacker lock a legitimate recipient out through counter exhaustion | `SR-94-011` | Assessment §4; `RL-92-005`, `HG-102-023` |
| Permission loss invalidates open work; a later submission is rejected against current authority | `PM-72-003` | `ID-104-006` — permission-loss events revoke the session and the provider artifacts |
| Factors and recovery secrets remain IdP-only; session and assurance results are minimal, bound, fresh, revocable, and non-replayable | `TB-92-003`; `DI-91-002` | `ID-104-001`, `ID-104-005`, `ID-104-007` |
| Authentication evidence is restricted single-purpose security evidence, never product analytics | `AN-92-004`; `DI-91-053` | `ID-104-011`; `HG-102-033` |
| Required security and audit evidence makes omission detectable | `SR-94-064` | `ID-104-012` — audit commits transactionally on CoBudget's side under `TD-103-030` |
| Routine staff access to customer content is default-deny | `OP-92-001` | Assessment §7; `HG-102-007`, `HG-102-008` |
| Environments are separated at the provider's strongest isolation boundary, with synthetic data only outside production | `TD-103-024`–`026` | `ID-104-014` |
| High-impact secrets live in a dedicated secret manager and never in ordinary surfaces | `SR-94-039`–`043`; `DI-91-051` | `ID-104-016` |

One tension was found and resolved rather than papered over. `DI-91-003`
places session credentials at "IdP, client and application edge" and
`SR-94-002` requires invalidation within `PR-94-001`, while every shortlisted
provider issues self-contained tokens that remain signature-valid after
revocation, gates per-session revocation behind a plan tier, or revokes
per-user with a propagation delay. `ID-104-004` resolves it by locating
session authority in CoBudget's own store, and `OI-104-001` records the
consequence: `HG-102-031` is still evaluated as written against provider-held
artifacts, and the narrowing affects how a result is weighed in CBD-108
rather than what is measured.

## 9. Review record

| Property | Value |
| --- | --- |
| Reviewed by | Alexander Wohlford — Product Owner. Package approved at v1.0 on August 21, 2026, and re-approved at v1.1 on August 21, 2026. |
| Independent review | None. No second person has read any document in this package. |
| Provider contact | None. All evidence is desk research retrieved August 20 and August 21, 2026. `OQ-104-007` is drafted for AWS but has not been sent. |
| Mechanical verification | `scripts/audit-cbd-104.py`; `scripts/check-doc-vocabulary.py` |
| Limitations | Evaluation §3 (no observation performed), §3.1 (partial asymmetry); assessment §6.6 (list prices with unknowns); §7 above |

### 9.1 Revision record

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | August 21, 2026 | Initial approved package. |
| 1.1 | August 21, 2026 | Corrects the C2 step-up finding. Four records (`EV-102-048`–`EV-102-051`) establish from current AWS documentation that Cognito offers `prompt=login` forced reauthentication and an `auth_time` claim, needing no customer-built orchestration. `EV-102-025`, the 2022 reference architecture the v1.0 finding rested on, is marked superseded and retained unedited. Evaluation §7.1 is rewritten, the `HG-102-030` and `HG-102-037` matrix evidence is revised, `OQ-104-007` is narrowed to three residuals, and the assessment records that `HG-102-030` forces C2's `CR0` tier a second time. **No gate outcome, verdict, tally, or price changes.** |
| 1.2 | August 21, 2026 | Reuses the CBD-103 cross-category documentary pass of the same date rather than re-retrieving it, which is the reuse pattern `EV-102-001`–`006` already established. Three documentary gate outcomes move: C2 gains `HG-102-011` (`EV-102-007`, an enumerated AWS subprocessor list dated on the page); C3 gains `HG-102-005` (`EV-102-011`, Privileged Identity Management, native) and `HG-102-010` (`EV-102-162`, `EV-102-163`). `EV-102-012` converts this package's v1.0 caution into a positive finding: **Microsoft Entra External ID is absent from the Customer Lockbox supported-services list**, so v1.0's refusal to reuse `EV-102-005` was right for a stronger reason than caution. Adds `OQ-104-021`, recording that the pass covered the three hyperscalers only and so left C4 Auth0 behind on the gates it touched. **No verdict, no observation, no price, no `ID-104-*` decision, and no acceptance-criterion status changes.** |

The v1.1 change is a correction of an evidence position, not a new
evaluation. It was found by re-reading primary vendor documentation rather
than by any provider contact, and it is exactly the failure mode
`EV-102-025`'s own limitations field predicted: strong evidence about 2022,
weak evidence about the platform generation actually under evaluation.
