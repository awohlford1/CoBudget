# CBD-104 — Integration, Outage, Support, Cost, and Exit Assessment

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Records the integration and cost half of CBD-104 against the approved CBD-102 cost template. Unlike its CBD-103 sibling, it **does** carry prices: identity list pricing is published at the billable unit, so §6 states figures with their evidence and marks only the genuinely unobtained lines `UNKNOWN` under `CR4`. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-104](https://cobudget.atlassian.net/browse/CBD-104) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Identity Integration Boundary Specification v1.0; Candidate Shortlist and Gate Evaluation v1.0; Acceptance Criteria Traceability v1.0 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `6b1ac8e` |
| Last updated | August 21, 2026 |

## 1. Purpose

CBD-104's third deliverable is a *"cost and migration/exit plan"*, and its
acceptance criteria additionally require that custom domain and templates,
sandbox, SDK and API, webhook reliability, and failure behaviour are covered,
and that *"pricing uses the actual billable unit and exposes threshold
cliffs."* This document is all of that.

It assesses the **boundary**, not a provider, except where a figure or a
limit is a per-candidate fact. Where a statement depends on which provider is
selected, it says so and names the question rather than guessing.

## 2. Integration surface

### 2.1 Custom domain and rendered ceremonies

`ID-104-001` puts every credential ceremony on IdP-served surfaces, and
`ID-104-019` puts those surfaces on a CoBudget-owned custom domain. The
assessment of that shape:

| Property | Assessment |
| --- | --- |
| What the customer sees | Provider-rendered screens on a CoBudget domain. The provider controls the DOM; CoBudget controls the domain, the branding inputs the provider exposes, and nothing else. |
| Why the domain is load-bearing | The **WebAuthn Relying Party ID** derives from it. A passkey enrolled against a vendor domain cannot be presented to a successor provider; one enrolled against a CoBudget domain can, if the successor serves the same RP ID. This is the largest exit-cost reducer available at integration time (§8). |
| Custom domain as a gate-adjacent prerequisite | Not merely cosmetic on two candidates: C3 requires a custom URL domain before a passkey can be registered at all, and C4 binds an enrolled passkey to the first domain it was enrolled against under multiple custom domains (`EV-102-023`, `EV-102-021`). |
| Accessibility consequence | The vendor renders a surface a CoBudget customer sees, which is why rubric §4.1 weights identity accessibility at 12 — the highest of the seven categories. `WR-102-011` scores it; no approved source makes a conformance level binding on a vendor (`OI-102-007`). |
| Template control | Partial by construction. CoBudget controls copy only to the extent the provider's template system allows, which is a scored quality rather than a gate. `FU-95-017` owns the approved copy inventory and is not satisfied by any vendor template. |

### 2.2 Ceremony email is a boundary CoBudget does not fully control

`ID-104-018` records that ceremony messages the IdP sends as itself —
verification codes, recovery links, factor-enrollment prompts — sit outside
the `EM-92-*` content tiers that bind CoBudget's own email, because those
contracts bind CoBudget's messages and no approved source yet binds a message
the provider originates.

This is the identity category's counterpart to a gate that exists in category
E: `HG-102-047` gives CoBudget exact content control over its own email. No
equivalent gate covers a provider's ceremony email, so the position must be
recorded rather than assumed. Three sub-questions per candidate: whether the
sending domain can be CoBudget's, whether the body can be brought under
CoBudget's template control, and whether the provider can be made to hand the
message to the CBD-106 provider instead of sending it. None was retrieved;
`OI-104-005` carries the disposition and `OQ-104-015` carries the retrieval.

### 2.3 SDK, API, and the domain-layer seam

| Property | Assessment |
| --- | --- |
| Protocol | Standard OIDC authorization code with PKCE (`ID-104-019`), which every carried candidate publishes |
| Where provider code may live | The edge adapter only. No provider SDK inside domain modules, mirroring the `TD-103-001` seam that keeps hosting exit an infrastructure exercise |
| Management API use | Identity deletion (`ID-104-013`), artifact revocation (`ID-104-005`), and tenant configuration (`ID-104-015`). Each is an operational dependency, not a request-path dependency |
| What is deliberately unused | Provider roles, groups, RBAC, fine-grained authorization, and organizations (`ID-104-003`); provider machine-to-machine tokens (`ID-104-017`); the provider-hosted session as the API authority (`ID-104-004`) |
| Consequence | The integration consumes a small, standard subset of each product. That is what makes `WR-102-024` interface standardization scorable well here, and it is a deliberate reduction of lock-in rather than an accident of scope |

### 2.4 Event delivery and its reliability

`ID-104-006` makes provider-side security events — factor removal, recovery
completion, account disable, risk detection — an input to CoBudget's session
invalidation. That places a reliability requirement on a delivery channel
whose guarantees have not been retrieved for any candidate (`OQ-104-020`).

The design's tolerance for that is asymmetric, and the asymmetry is worth
stating because it determines how much the answer matters:

* **CoBudget-originated revocation does not depend on it.** Logout,
  permission loss, recovery completed through CoBudget's own flow, and every
  `PM-72-003` event revoke the application session directly, because
  `ID-104-004` puts that record in CoBudget's datastore.
* **Provider-originated events do depend on it.** A factor removed or an
  account disabled at the IdP reaches CoBudget only through this channel. A
  lost event leaves an application session live that a security event should
  have ended — the stale-authority condition `SR-94-110` prohibits.

Where a candidate's event delivery is a webhook, the topology's existing
posture applies unchanged: signature verification and replay rejection at the
edge before the payload becomes durable (`TD-103-016`), bounded retry with a
dead-letter destination (`TD-103-008`). Where it is a log stream or a polled
API, a periodic reconciliation of security-relevant state is the equivalent
of `TD-103-010` step 5, and it is what keeps a missed event from being
permanent. Neither shape is settled per candidate yet.

### 2.5 Sandbox and non-production tenants

`ID-104-014` requires three isolated tenants sharing no key, credential, or
identity, mirroring `TD-103-024`. Two properties matter for selection and
neither was retrieved (`OQ-104-018`): whether the provider permits three
isolated tenants at all, and whether non-production tenants carry a price
that is material against a category whose Base cost is at most $35 a month.
A per-tenant floor would be the rare case where a development environment
costs more than production usage.

## 3. Outage and failure behaviour

Component-by-component, given the boundary. This is a design property, not a
measurement, and it changes if `ID-104-004` changes.

| Component unavailable | Immediate effect | What continues | Recovery | Durable-loss risk |
| --- | --- | --- | --- | --- |
| IdP ceremony surfaces | No sign-in, no sign-up, no factor enrollment, no recovery | **Every existing application session: all ordinary reads and writes continue** | Provider recovery | None. No credential state is CoBudget's to lose. |
| IdP step-up ceremony | **Every protected action fails closed** — permissions 20a, 20b, 27, 29, 34, 35 and the archived-space workflows are unavailable | Ordinary reads and writes | Provider recovery | None. A protected action denied is a denial, not a partial commit (`PM-72-004`). |
| IdP event stream | Provider-originated security events do not arrive | Everything, including CoBudget-originated revocation | Reconciliation (§2.4), where designed | A security event that should have ended a session may not, until reconciliation or session expiry. |
| IdP management API | No identity deletion, no artifact revocation at the provider | Everything else, including application-session revocation | Provider recovery | None immediate. A lifecycle deletion deadline could be missed, which `SR-94-121` treats as a disposition obligation rather than a loss. |
| CoBudget session store (datastore) | Total outage | Nothing | CBD-105 | Per the CBD-105 recovery objective. Out of scope here. |

### 3.1 The row that is the payoff, and the row that is the cost

**The first row is the payoff from `ID-104-004`.** Because the application
session is CoBudget's own record rather than a provider assertion validated
per request, an identity-provider outage stops *new* authentication without
ending *existing* sessions. For a budgeting product whose sessions are
weekly-to-monthly (`DM-102-022`), that converts a total outage into a
degraded one for everybody already signed in.

**The second row is its cost, and it is not avoidable.** Step-up
reauthentication is a ceremony only the IdP can perform (`ID-104-001`), so
protected actions are unavailable for the duration of an IdP outage. That is
correct rather than unfortunate — the alternative is a CoBudget-side bypass
of a required assurance ceremony, which `SR-94-003` and CBD-72 §6.1 prohibit
— but it should be stated plainly: **identity availability is on the critical
path for every CBD-72 protected action, with no approved fallback.**
`OI-104-012` records it.

No approved source sets an availability threshold — catalog §11 moved uptime
to rubric `WR-102-014`/`WR-102-015` — so this is a recorded consequence, not
a gate.

## 4. Rate limits and abuse controls

`RL-92-003` and `RL-92-004` govern the identity surfaces directly, and
`SR-94-011` requires concrete values plus a guarantee that an attacker cannot
lock a legitimate subject out through counter exhaustion.

| Control | Where it is enforced | Status |
| --- | --- | --- |
| Per-surface ceilings on `EP-92-001` authentication, registration, recovery | CoBudget's edge under `TD-103-013`, plus whatever the provider enforces on its hosted surfaces | Design fixed; values open (`OI-104-002`) |
| Counting keys on pre-authentication surfaces | Caller-controlled and infrastructure-derived, never a claimed account identifier (`TD-103-014`, `HG-102-022`) | Design fixed |
| Uniform throttled and unthrottled responses | Both CoBudget's edge (`HG-102-020`) and the provider's hosted screens (`HG-102-032`) | Provider half is an observation gate |
| Lockout that cannot be weaponized | `RL-92-005`, `HG-102-023`, `SR-94-011` | Design fixed; the provider's own lockout behaviour on hosted screens is not retrieved (`OQ-104-019`) |

The provider half deserves emphasis. On a hosted-ceremony integration,
CoBudget's edge does not see the failed password attempt — the provider does.
Enumeration resistance, lockout policy, and throttling behaviour on those
screens are therefore **vendor properties**, which is exactly why
`HG-102-032`'s pass test compares responses and observable timing on
IdP-hosted screens rather than on CoBudget's API. Service limits on the
authentication endpoints are `OQ-104-019` and were not retrieved for any
candidate.

## 5. Telemetry, audit, and isolation implications

Three consequences of the boundary that belong in an operational record:

**Provider log retention is shorter than CoBudget's evidence obligations.**
C4 retains tenant logs for 1 day on the free tier, 5 days on Essentials, 10
on Professional, and 30 on Enterprise (`EV-102-028`). Retention for C2 and C3
was not retrieved. This is the operational reason `ID-104-012` puts the audit
store of record on CoBudget's side, written transactionally under
`TD-103-030`: an obligation that outlives provider retention cannot rest on
provider logs. Log streaming into CoBudget's own boundaries is the mechanism
that makes provider events usable at all beyond the retention window.

**Authentication evidence is S3 security evidence, not telemetry.**
`ID-104-011` routes it to the restricted destination under `DI-91-053`, never
to the S1 reliability sink and never to analytics. `HG-102-033` is the gate,
and it remains `UNPROVEN` for all three candidates.

**Isolation is a tenant property, not a namespace property.** `ID-104-014`
requires the provider's strongest boundary between environments, and
`ID-104-002` keeps budget-space structure out of the directory entirely — so
a directory compromise exposes account subjects and their factor metadata,
not the household relationship graph. That is a deliberate reduction of blast
radius and is the main isolation implication the CBD-104 acceptance criteria
ask to be documented.

## 6. Cost

### 6.1 Why this section carries prices when its CBD-103 sibling did not

Cost rule `CR4` requires an unobtained figure to be marked unknown rather
than estimated, and evidence register §3.2 requires Documented-or-stronger
evidence for any cost figure. CBD-103 marked every line `UNKNOWN` because no
hosting price had been retrieved.

Identity is different in a way that matters: the billable unit is published,
the demand quantity is small enough to sit inside published tiers, and four
pricing pages were retrieved and registered (`EV-102-017`, `EV-102-018`,
`EV-102-019`, `EV-102-020`). Documented evidence exists, so the figures are
stated. Lines that were **not** retrieved — seats, taxes, support plans — are
still `UNKNOWN`, and a total carrying an unknown says so rather than
silently treating it as zero.

### 6.2 The billable unit, and the unit mismatch

`CT-102-006` is priced against the demand model's identity row: **monthly
active users, Base 30, High 120** (`DM-102-005 × DM-102-008`, per demand
model §9 and cost template §5).

Cost template §5.1 requires recording the provider's own unit *and its
definition*, then converting explicitly. The three definitions are not the
same:

| Candidate | The provider's own MAU definition | Effect against `DM-102-005 × DM-102-008` |
| --- | --- | --- |
| C2 Cognito | A user for whom the application "generates an identity operation ... like administrative creation or update, sign-up, sign-in, sign-out, token refresh, password change" (`EV-102-018`) | **Broader.** Non-authentication operations count. `ID-104-004` reduces IdP token refresh by keeping the session on CoBudget's side, but administrative operations still count a user active. |
| C3 Entra External ID | "Unique external users who authenticate to your tenants within a calendar month," combined across all linked tenants (`EV-102-019`) | Close to the demand row, but **combines every linked tenant** — so the three `ID-104-014` environments count together where they share a subscription. |
| C4 Auth0 | "Any non-internal (non-employee) user that authenticated during a given month for a given tenant" (`EV-102-017`) | Closest to the demand row. A subject who signs in once in the month counts once. |

**At Private MVP volume the mismatch changes no answer**, because all three
counts stay far below every free allowance. It is recorded because a
conversion that is not written down is where a cost comparison goes quietly
wrong, and because the C3 tenant-combining rule and the C2 broader definition
both bite before the C4 definition would.

### 6.3 `CR0` — the tier priced, and the gate that forces it

`CR0` prices the cheapest tier that clears every hard gate. Two candidates
are forced above their cheapest tier by an already-established gate:

| Candidate | Cheapest tier | Tier priced under `CR0` | Gate that forces it |
| --- | --- | --- | --- |
| C2 Cognito | Lite ($0.0055/MAU) | **Essentials ($0.015/MAU)** | `HG-102-029`. Passkeys and choice-based authentication require the Essentials feature plan or higher (`EV-102-022`, `EV-102-018`). |
| C3 Entra External ID | External ID core | **External ID core, pending `OQ-104-016`** | None established. But MFA enforcement and step-up both run through Conditional Access (`EV-102-023`), and whether Conditional Access sits inside the free "core features" (`EV-102-020`) is unresolved. If it does not, `HG-102-029` and `HG-102-030` force a paid tier and this row changes. |
| C4 Auth0 | Free (25,000 MAU) | **Essentials B2C, $35/month** | `HG-102-029`. The free plan does not carry MFA (`EV-102-017`); MFA begins at Essentials. A plan that cannot enforce MFA is not a cheaper option, it is not an option. |

### 6.4 Cost records

One record per candidate, following cost template §4, quoted at **Base
demand, 30 MAU** per `CR7`.

**C2 — Amazon Cognito, category I**

```
Tier priced: Essentials feature plan     Forced by: HG-102-029 (passkeys need Essentials)
Verdict: ELIGIBLE-PENDING-EVIDENCE       Quoted: USD, list price, August 20, 2026

A  Recurring floor
   CT-102-001 plan base                          $  0.00   usage-priced, no plan fee
   CT-102-002 platform fee                       $  0.00
   CT-102-003 per-seat x 2                       $  0.00   operator access is IAM, not a priced seat
   CT-102-004 minimum committed spend            $  0.00
   CT-102-005 support plan                       UNKNOWN   AWS support is separate; no identity gate forces a plan yet
B  Variable at Base (30 MAU)
   CT-102-006 MAU at $0.015                      $  0.00   inside the 10,000-MAU allowance
   CT-102-007 secondary metered                  $  0.00   no SMS factor, no M2M
   CT-102-008 included allowance                 10,000 MAU, stated permanent (EV-102-018)
   CT-102-009 overage                            $0.015 per MAU above 10,000
C  Time-limited  [EXCLUDED from CT-102-017 per CR1]
   CT-102-010 free-tier allowance                treated as CT-102-008, not section C - see 6.5
   CT-102-011 credits                            UNKNOWN
   CT-102-012 introductory pricing               none published
D  Additive
   CT-102-013 taxes                              UNKNOWN
   CT-102-014 exit cost                          re-enrolment, not egress - see section 8

E  CT-102-016 month 1                            $  0.00 + unknowns
   CT-102-017 steady-state monthly               $  0.00 + unknowns  <- comparison figure
   CT-102-018 12-month total                     $  0.00 + unknowns
   CT-102-019 36-month total                     $  0.00 + unknowns
   CT-102-020 steady state at High (120 MAU)     $  0.00   (inside the allowance)
   CT-102-021 first overage threshold            10,000 MAU

Unknown: CT-102-005, CT-102-011, CT-102-013                       [CR4]
```

**C3 — Microsoft Entra External ID, category I**

```
Tier priced: External ID core, PENDING OQ-104-016
Verdict: ELIGIBLE-PENDING-EVIDENCE       Quoted: USD, list price, August 20, 2026

A  Recurring floor
   CT-102-001 plan base                          $  0.00   core features free to 50,000 MAU (EV-102-020)
   CT-102-002 platform fee                       $  0.00   requires a linked Azure subscription (EV-102-019)
   CT-102-003 per-seat x 2                       UNKNOWN   admin access is Entra role-based; seat cost not established
   CT-102-004 minimum committed spend            $  0.00
   CT-102-005 support plan                       UNKNOWN   Azure support separate; CBD-103 EV-102-005 records a
                                                           Developer-plan floor forced by HG-102-009 for Azure hosting
B  Variable at Base (30 MAU)
   CT-102-006 MAU                                $  0.00   inside the 50,000-MAU allowance
   CT-102-007 secondary metered                  $  0.00   SMS add-on unused (ID-104-008); M2M add-on unused (ID-104-017)
   CT-102-008 included allowance                 50,000 MAU of "core features" - scope unresolved, OQ-104-016
   CT-102-009 overage                            UNKNOWN   per-MAU rate beyond the allowance not on the page retrieved
C  Time-limited  [EXCLUDED from CT-102-017 per CR1]
   CT-102-010 free-tier allowance                permanence not explicitly stated - see 6.5
   CT-102-011 credits                            UNKNOWN
   CT-102-012 introductory pricing               UNKNOWN
D  Additive
   CT-102-013 taxes                              UNKNOWN
   CT-102-014 exit cost                          re-enrolment, not egress - see section 8

E  CT-102-016 month 1                            $  0.00 + unknowns
   CT-102-017 steady-state monthly               $  0.00 + unknowns  <- comparison figure
   CT-102-018 12-month total                     $  0.00 + unknowns
   CT-102-019 36-month total                     $  0.00 + unknowns
   CT-102-020 steady state at High (120 MAU)     $  0.00   (inside the allowance)
   CT-102-021 first overage threshold            50,000 MAU, subject to OQ-104-016

Unknown: CT-102-003, CT-102-005, CT-102-009, CT-102-011, CT-102-012, CT-102-013   [CR4]
```

**C4 — Auth0, category I**

```
Tier priced: Essentials B2C     Forced by: HG-102-029 (MFA absent on Free)
Verdict: ELIGIBLE-PENDING-EVIDENCE     Quoted: USD, list price, August 20, 2026

A  Recurring floor
   CT-102-001 plan base                          $ 35.00   (EV-102-017)
   CT-102-002 platform fee                       $  0.00   none published
   CT-102-003 per-seat x 2                       UNKNOWN   admin-seat pricing not established
   CT-102-004 minimum committed spend            $  0.00   self-serve, no commitment published
   CT-102-005 support plan                       UNKNOWN   Essentials support level not established
B  Variable at Base (30 MAU, DM-102-005 x DM-102-008)
   CT-102-006 MAU                                $  0.00   tier starts at 500 MAU
   CT-102-007 secondary metered                  $  0.00   no SMS factor (ID-104-008), no M2M (ID-104-017)
   CT-102-008 included allowance                 500 MAU, 1 log stream, 5-day log retention
   CT-102-009 overage                            billed at the next tier up (EV-102-017)
C  Time-limited  [EXCLUDED from CT-102-017 per CR1]
   CT-102-010 free-tier allowance                Free plan exists but fails HG-102-029; not an option
   CT-102-011 credits                            UNKNOWN
   CT-102-012 introductory pricing               none published; annual billing = 11x monthly
D  Additive
   CT-102-013 taxes                              UNKNOWN
   CT-102-014 exit cost                          re-enrolment, not egress - see section 8

E  CT-102-016 month 1                            >= $   35.00  (unknowns above)
   CT-102-017 steady-state monthly               >= $   35.00  <- comparison figure
   CT-102-018 12-month total                     >= $  385.00  (annual billing, 11x)
   CT-102-019 36-month total                     >= $1,155.00
   CT-102-020 steady state at High (120 MAU)     >= $   35.00  (still inside the 500-MAU tier)
   CT-102-021 first overage threshold               500 MAU

Unknown: CT-102-003, CT-102-005, CT-102-011, CT-102-013           [CR4]
```

### 6.5 A permanent allowance is not a time-limited reduction

`CR1` excludes section C from the comparison figure precisely because a
twelve-month credit makes an expensive provider look cheapest during exactly
the window in which the decision is made. Two candidates' zero figures could
be mistaken for that distortion, and they are not:

* C2's allowance is documented as permanent — the free tier *"does not
  automatically expire at the end of your 12-month AWS Free Tier term, and it
  is available to both existing and new AWS customers indefinitely"*
  (`EV-102-018`). A standing tier allowance is `CT-102-008`, which belongs in
  section B and stays inside the comparison figure.
* C3's 50,000-MAU allowance is stated without any expiry (`EV-102-020`). It
  reads as a standing allowance and is recorded as one — but the evidence
  does not *assert* permanence, so the limitation is carried rather than
  assumed, and `OQ-104-016` asks for it alongside the core-feature scope.

### 6.6 The comparison, stated carefully

At Base demand the steady-state figures are **C2 $0.00 + unknowns, C3 $0.00 +
unknowns, and C4 ≥ $35.00/month**. Four qualifications keep that from being
read as a ranking:

1. **`CR3` — cost never overrides a gate.** All three verdicts are
   `ELIGIBLE-PENDING-EVIDENCE`, with nine observation gates unresolved for
   each. Cheapest is not a route into selection.
2. **The zero figures carry unresolved tier risk.** C3's zero depends on
   Conditional Access being a free core feature (`OQ-104-016`); C2's depends
   on no gate forcing the Plus plan, which has **no free tier at all**
   (`EV-102-018`), and on no gate forcing a paid AWS support plan.
3. **C4's $35 carries tier risk in the opposite direction, and it is
   larger.** Per-session revocation endpoints are Enterprise-plan features
   (`EV-102-027`). If `HG-102-031` cannot be satisfied by refresh-token
   revocation on Essentials, `CR0` moves C4 from $35/month to a
   contact-sales Enterprise tier — an unbounded move, and the sharpest cost
   cliff in the category. `OQ-104-008` resolves it.
4. **`OI-102-017` — there is no budget ceiling.** Cost is recorded and
   compared but cannot exclude a provider.

At this scale the honest summary is that **identity cost is close to a
rounding error against the decision's other terms**, and the category should
be settled on gates, integration fit, and exit cost rather than on a $35
monthly difference.

### 6.7 Cost cliffs

Acceptance criterion 5 requires threshold cliffs to be explicit. These are
the specific thresholds, not a general instruction to watch cost.

| Cliff | Why it is a cliff here | Trigger |
| --- | --- | --- |
| C2 Plus plan | Plus has **no free tier**, so adopting it makes every MAU billable from the first one | Any gate or control that requires adaptive or threat-detection features |
| C2 / C3 free-allowance exit | 10,000 MAU (C2) and 50,000 MAU (C3) | Far beyond High (120); a post-Private-MVP concern |
| C3 core-feature scope | If Conditional Access is not a free core feature, the whole zero figure moves | `OQ-104-016` |
| C4 MFA tier floor | `HG-102-029` is unsatisfiable on Free, so the $35 applies from the first user | Gate-forced; applies at Low demand |
| C4 Enterprise session management | `HG-102-031` may require per-session endpoints available only on Enterprise (`EV-102-027`) | Gate-forced, unresolved (`OQ-104-008`); unbounded |
| Support-plan floor | CBD-103 established a Developer-plan floor for Azure hosting via `HG-102-009` (`EV-102-005`); the identity equivalents are unresolved for all three | Gate-forced, not volume-driven |
| Non-production tenants | Three isolated tenants are required by `ID-104-014`; a per-tenant floor would exceed production usage cost | `OQ-104-018` |

Demand model §9.1's inversion applies here directly: identity is one of the
two categories metered **per active user**, so it scales with people rather
than sitting inside a flat tier. At Private MVP volume every candidate is far
inside its allowance, so the scaling term is dormant — which is exactly why
the floors and the gate-forced tiers, not the per-MAU rates, decide this
category.

## 7. Support

`WR-102-019`–`022` score support; this records what CoBudget can actually
use.

The binding constraint is unchanged from CBD-103 §7: `OP-92-001` and
`OP-92-002` remove the support model that would make vendor support most
valuable, and `HG-102-007` fails a provider whose support is only effective
when staff can read customer data. Identity adds one wrinkle worth stating.

| Property | Assessment |
| --- | --- |
| What support may be told | A correlation identifier and a safe error class. Never customer content, account existence, factor state, or recovery status |
| The identity-specific wrinkle | An identity support interaction is the classic route to account takeover. `SR-94-006` prohibits identity or recovery support from impersonating a customer, transferring ownership, or converting channel possession into product authority — and `HG-102-008` applies the same prohibition to the **vendor's** staff. A vendor whose support can reset a factor on request is a standing account-takeover path CoBudget does not control |
| What disqualifies a provider | Support that requires customer-data access (`HG-102-007`), or a break-glass impersonation capability that is not technically constrained (`HG-102-008`). Both are `UNPROVEN` for all three candidates |
| Support as a cost | `CT-102-005`, `UNKNOWN` on every candidate. C4's free tier is community support only (`EV-102-017`), which is one more reason Free was never the priced tier |
| Rubric weight | 8 of 100 — the lowest dimension, for the reason rubric §4.1 gives |

## 8. Exit and migration

Identity carries the second-highest portability weight in the rubric (14),
behind financial connectivity (16), and rubric §4.1 gives the reason:
CoBudget holds no credentials, so migration means re-enrolment. This section
is the migration and exit plan CBD-104's deliverables require.

### 8.1 What exit actually costs

| Asset | Portable? | Consequence |
| --- | --- | --- |
| Account subject records and profile attributes | Expected yes, by administrative API export | Ordinary data migration; the smallest part of the problem |
| Budget spaces, memberships, roles, permissions | **Not affected at all** | `ID-104-002` and `ID-104-003` keep every one of these in CoBudget's datastore. A provider change touches none of it — the single largest exit-cost reduction in the boundary |
| Passwords | Unresolved (`OQ-104-017`) | Where hashes cannot be exported in a form a successor accepts, every password user must reset. This is the classic identity-migration tax |
| Passkeys | **Portable only if the RP ID is preserved** | `ID-104-019` puts the RP ID on a CoBudget domain precisely so a successor can serve it. Whether public keys can be exported and imported is `OQ-104-017` |
| MFA enrollments (TOTP seeds) | Unresolved (`OQ-104-017`) | Seeds are `DI-91-002` S4 material CoBudget never holds; re-enrolment is the likely path |
| Session state | Not applicable | `ID-104-004` makes sessions CoBudget's, so a provider change does not sign anyone out |
| Audit and assurance evidence | **Not affected** | `ID-104-012` keeps the store of record on CoBudget's side |

### 8.2 The asymmetry worth carrying to CBD-108

CBD-103 §8 recorded that hosting is the *most* portable category, because no
customer action is required to leave. Identity is the mirror case in one
specific respect: **the parts of an identity migration that require customer
action are exactly the parts CoBudget cannot perform on the customer's
behalf** — a password reset, a passkey re-enrolment, a factor
re-registration. The boundary reduces that set as far as it can be reduced
(no roles, no memberships, no sessions, no audit at the vendor; the RP ID on
CoBudget's domain), but it cannot reduce it to zero.

Two consequences for selection: an identity mistake is more expensive to
reverse than a hosting mistake at the same scale, and it grows more expensive
with every user who enrolls — which argues for resolving the nine observation
gates before enrolment begins rather than after.

### 8.3 Migration plan shape

Should a change of provider be required, the sequence the boundary supports:

1. Stand up the successor tenant and serve the **same custom domain and RP
   ID** (`ID-104-019`).
2. Import account subjects and whatever credential material proves portable
   under `OQ-104-017`.
3. Switch the edge's OIDC relying-party configuration. Because the session is
   CoBudget's (`ID-104-004`), existing sessions are unaffected and the switch
   is not a mass sign-out.
4. Re-enrol what could not be migrated, on next sign-in rather than by
   campaign.
5. Delete identities at the outgoing provider under `ID-104-013` and capture
   the deletion evidence `HG-102-035` requires.

Step 3 is what makes the rest survivable, and it is a property of
`ID-104-004` rather than of any vendor.

## 9. Open questions and items

| ID | Question | Owner |
| --- | --- | --- |
| OQ-104-015 | The `CT-102-*` lines marked `UNKNOWN` in §6.4 — seats, support plans, taxes, credits, the C3 per-MAU rate beyond the allowance — and the §2.2 ceremony-email sub-questions | Retrieve per candidate before CBD-108 |
| OQ-104-016 | Which Entra External ID features sit inside the free 50,000-MAU "core", specifically **Conditional Access**, on which C3's MFA enforcement and step-up both depend; and whether the allowance is permanent | Retrieve; it moves C3's entire cost record |
| OQ-104-017 | Credential portability on exit per candidate: password-hash export, passkey public-key export and RP-ID preservation, TOTP seed portability | Retrieve; determines the §8.1 re-enrolment set |
| OQ-104-018 | Whether each candidate permits three isolated non-production tenants, and at what cost | Retrieve; `ID-104-014` depends on it |
| OQ-104-019 | Provider service limits, and lockout, throttling, and abuse-control behaviour on hosted ceremony surfaces | Retrieve, then observe alongside `HG-102-032` |
| OQ-104-020 | Provider security-event delivery: mechanism, authentication, replay protection, delivery guarantee, and backfill on failure | Retrieve; `ID-104-006` depends on it |

| ID | Item | Effect |
| --- | --- | --- |
| OI-104-012 | Identity availability is on the critical path for every CBD-72 protected action, with no approved fallback (§3.1). | A recorded consequence, not a gate — no approved source sets an availability threshold. It should inform how `WR-102-014`/`WR-102-015` reliability evidence is weighed for this category specifically. |
| OI-104-013 | The §6.6 figures are list prices at Base demand with several `UNKNOWN` lines, and two of the three totals depend on unresolved tier questions. | They are a starting position for CBD-108, not a settled comparison. `OI-102-017` records that no budget ceiling exists, so cost cannot exclude a provider in any case. |
| OI-104-014 | The three candidates' MAU definitions differ materially (§6.2), and C3 combines MAU across linked tenants. | Harmless at Private MVP volume, where every count sits far inside its allowance. It stops being harmless as usage approaches an allowance, and the conversion is written down here so a later comparison does not silently inherit the wrong unit. |
