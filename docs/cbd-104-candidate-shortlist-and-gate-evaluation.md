# CBD-104 — Identity Candidate Shortlist and Gate Evaluation

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Applies the approved CBD-102 method to managed-identity candidates against the companion boundary specification. It selects no provider; CBD-108 does that. **No candidate reaches `ELIGIBLE`, because the authorized observation pass has not been performed — §3 explains the position this evaluation inherits from CBD-103.** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-104](https://cobudget.atlassian.net/browse/CBD-104) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Identity Integration Boundary Specification v0.1; Integration, Outage, Support, Cost, and Exit Assessment v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `6b1ac8e` |
| Last updated | August 20, 2026 |

## 1. Purpose

CBD-104 must produce a provider shortlist and comparison for the managed
identity category. This document is that comparison. It measures candidates
against the 25 CBD-102 hard gates that apply to category **I** — the 15
cross-category **X** gates plus the 10 **I** gates — using the evidence
classes and verdicts the CBD-102 evidence register fixes.

The boundary those candidates are measured against is the companion Identity
Integration Boundary Specification. A provider is evaluated on whether it can
hold that boundary, not on general merit.

## 2. What this document does not do

* It selects and recommends nothing. `CR3` and rubric `R1` both forbid a
  score or a cost from settling an order that the gates have not settled.
* It provisions nothing and creates no account or tenant. The observation
  accounts authorized on August 20, 2026 (§3) have not been created.
* It publishes no weighted rubric total. §8 explains why, and why publishing
  one now would break rubric rule `R4`.
* It closes no `EG-91-*` evidence gap and no `RF-92-*` review finding.

## 3. The evidence position this evaluation starts from

CBD-103 established, and the Product Owner resolved, the structural fact that
governs this evaluation too: a set of CBD-102 pass tests name observations
that can only be made on a live provider account, and desk research cannot
substitute for them — several were written specifically to reject documentary
evidence.

The resolution is already in place. On August 20, 2026 the Product Owner
resolved `OI-103-008` by route A: non-production evaluation accounts holding
only synthetic data are authorized solely to execute CBD-102 hard-gate pass
tests, under five recorded guardrails, and the CBD-15 OUT OF SCOPE bullet was
amended accordingly. That authorization is written against the CBD-102 pass
tests generally, so it covers this category's observation gates as well —
CBD-104 does not need its own scope decision.

What the authorization does not do is gather evidence. **No observation has
been performed for any identity candidate**, so every gate whose pass test
requires one is `UNPROVEN` here, and every candidate terminates at
`ELIGIBLE-PENDING-EVIDENCE` — not disqualified, and not selectable until the
observations run. Under the route-A guardrails, observations run only on
candidates without a documentary `FAIL`; §6.3 shows no candidate carries one,
so all three candidates are eligible for the observation pass.

Nine of the 25 applicable pass tests are observation-bound:

| Gate | What its pass test requires |
| --- | --- |
| `HG-102-001` | Field-level schema control demonstrated on a live account, with a captured payload |
| `HG-102-004` | Disablement verified by observed absence in network traffic and stored data |
| `HG-102-012` | A deletion request exercised and its request/response captured |
| `HG-102-015` | Immutability or retention-lock demonstrated |
| `HG-102-030` | A protected-action reauthentication performed and the resulting assertion inspected |
| `HG-102-031` | Individual session revocation exercised and observed on the next protected call |
| `HG-102-032` | Responses and observable timing compared across existing and non-existent identifiers on hosted screens |
| `HG-102-035` | An identity deletion exercised, with response, effective date, and residual retention captured |
| `HG-102-037` | Assertion lifetime and replay protection verified |

### 3.1 What this pass did instead, and where it is asymmetric

The documentary pass behind this evaluation was run **symmetrically across
the three carried candidates on five priority claims**: pricing at the actual
billable unit, passkey and MFA availability on the evaluated tier, the
step-up reauthentication primitive, session-revocation capability, and
enumeration-resistance configuration. Fifteen evidence records were
registered on August 20, 2026 (§9).

Beyond those five claims the pass is asymmetric, in the same sense CBD-103
§3.4 disclosed: several gates were not researched for any candidate, and a
few notes attach to one candidate and not the others because the research
followed the sharpest questions. As in CBD-103, this does not invalidate the
comparison, because all three candidates hold the same verdict and no ranking
is produced. Every `UNPROVEN` below means "not yet asked or not yet
answered," never "the provider lacks this." `OI-104-007` records the
obligation to complete the pass symmetrically before CBD-108 ranks anything.

## 4. Screening

### 4.1 The capability screen

Candidates were screened before gate evaluation on one published, checkable
property: **does the provider's published catalog offer, first-party, every
capability class the boundary specification consumes?**

| # | Capability class | Boundary decision it serves |
| --- | --- | --- |
| 1 | Managed operation — the vendor runs the service | CBD-15 "managed identity" premise |
| 2 | Standard OIDC relying-party protocol (authorization code + PKCE) | `ID-104-019` |
| 3 | MFA enforceable by policy, with passkeys as a first-party factor | `ID-104-008`; `HG-102-029` |
| 4 | Server-side revocation API over provider-held authority artifacts | `ID-104-005`; `HG-102-031` |
| 5 | Programmatic identity deletion through an administrative API | `ID-104-013`; `HG-102-035` |
| 6 | A security event stream CoBudget can consume | `ID-104-006`; `ID-104-011` |

**A screen is not a verdict.** Nothing below is recorded as `INELIGIBLE`. A
screened-out candidate has not been measured against a gate, and the screen
is reversible if the published catalog is wrong or changes.

### 4.2 The carried-set rule

The identity category has one structural choice the hosting category did not:
each CBD-103 hosting candidate's ecosystem publishes a first-party identity
service, and using it would add **no new subprocessor** to the provider set,
while every standalone identity vendor adds one under `HG-102-011`. The
carried set is therefore chosen to expose that choice to CBD-108 rather than
pre-empt it:

* the ecosystem identity service of each CBD-103 hosting candidate that
  passes the capability screen, and
* one provider-neutral standalone, so the comparison contains the alternative
  that no hosting selection forecloses.

The standalone slot is filled by Auth0 (Okta Customer Identity Cloud) on
three stated grounds: its hosted-ceremony model matches `ID-104-001`'s
strictest reading directly; its published documentation is deep enough on the
differentiator gates — step-up, enumeration, session revocation — to support
documentary evaluation now; and its assurance and incident documentation
surface is the largest in the standalone field, which matters for the
`WR-102-*` scoring that follows the evidence pass. Other standalone vendors
with published passkey support — Clerk, Stytch, FusionAuth Cloud, Descope,
Kinde, WorkOS — were **not evaluated and are not screened out**; no claim is
made about their catalogs, and `OQ-104-014` carries the option of evaluating
a second standalone if CBD-108 wants one.

### 4.3 Screened out

| Candidate | Missing capability class | Basis |
| --- | --- | --- |
| Google Cloud Identity Platform | 3 | Its own authentication-concepts documentation enumerates password, email, phone/SMS, federated, custom, and anonymous methods with SMS and TOTP multi-factor options, and names no passkey, WebAuthn, or FIDO2 method. `EV-102-029`. Absence from this page is not proof of absence from the whole catalog; `OQ-104-013` carries confirmation. |
| Self-hosted identity (Keycloak, Ory self-hosted) | 1 | Contradicts the "managed provider" premise of CBD-15 and moves every gate from Vendor to Config, transferring the operational burden to the single operator that rubric dimension `WR-102-027`–`031` exists to protect — the same reasoning as CBD-103 §4.2's self-managed-IaaS row. |

The Google row has a cross-category consequence recorded as a finding in
§7.3: the C1 hosting ecosystem currently offers no screen-passing first-party
identity service, so a C1 hosting selection forces a standalone identity
vendor and the extra subprocessor that comes with one.

### 4.4 Carried into gate evaluation

Candidate identifiers are **provider identities carried across categories**,
following the convention CBD-105 states: `C1` is Google Cloud, `C2` is AWS,
and `C3` is Microsoft Azure in every category they appear in, so CBD-108 can
weigh a cross-category set without holding a translation table. `C4` is a new
provider identity, introduced here because the standalone slot has no hosting
counterpart. `C1` appears in this category only as a screened-out row (§4.3),
which is itself the finding in §7.3.

| ID | Candidate | Composition evaluated |
| --- | --- | --- |
| **C2** | Amazon Cognito | User pool on the Essentials plan; Managed Login hosted ceremonies on a custom domain; choice-based authentication with passkeys; user pool API |
| **C3** | Microsoft Entra External ID | External tenant; Microsoft-hosted sign-in on a custom URL domain; email + password local accounts with passkey (FIDO2) and email OTP; Conditional Access; Microsoft Graph |
| **C4** | Auth0 (Okta Customer Identity Cloud) | Universal Login hosted ceremonies on a custom domain; database connection with passkeys; Management API; log streaming |

Each composition is one plausible arrangement of that provider's published
product, not the only one. The evaluated plan follows cost rule `CR0` and is
recorded per candidate in the companion assessment §6.

## 5. Gate evaluation method

Each gate carries one outcome per candidate, per evidence register §3.3:

| Outcome | Meaning here |
| --- | --- |
| `PASS` | Documented or stronger evidence confirms the property, and the pass test is satisfiable by that evidence |
| `UNPROVEN` | Evidence is Asserted or Absent — including "the pass test needs an observation not yet performed" |
| `FAIL` | Evidence shows the property is absent |

The one gate marked **Config** in the catalog for this category is recorded
as `PASS (design)` where the boundary specification settles CoBudget's side
and no evidence of provider foreclosure exists. A `PASS (design)` is a
statement about provider eligibility, not evidence that CoBudget built the
control; CBD-94 verification must prove the build separately.

## 6. Comparison matrix

`OBS` marks a gate whose pass test requires a live-account observation. `DOC`
marks one documentation or a contract can settle. `CFG` marks a Config gate.

### 6.1 Cross-category gates

| Gate | Kind | C2 Cognito | C3 Entra External ID | C4 Auth0 | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-001 telemetry allowlist | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Observation authorized, not performed. Captured payload required. |
| HG-102-002 correlation identifiers | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-104-001` |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Acute for identity vendors, whose parent platforms operate large shared identity surfaces. `OQ-104-002` |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Observation required; screenshot explicitly insufficient. |
| HG-102-005 no standing credential | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved for any identity console. `OQ-104-012` |
| HG-102-006 separable custody | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Also gated in practice by `OI-102-022`. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | For C2, `EV-102-001` (CBD-103) is Asserted for AWS generally, which cannot produce a `PASS`. `OQ-104-006` |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-104-006` |
| HG-102-009 staff-access evidence | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved for identity surfaces. CBD-103's `EV-102-005` Customer Lockbox list did not establish Entra coverage. `OQ-104-006` |
| HG-102-010 encryption in transit and at rest | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. Expected straightforward. `OQ-104-003` |
| HG-102-011 region and subprocessors | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved and must be obtained **and dated**. C3 note: the only published residency add-on covers Australia and Japan (`EV-102-019`), so the United States external-tenant residency position needs explicit confirmation. `OQ-104-004` |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Request must be exercised. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Contractual class; not obtained. Silence fails, so it must be asked explicitly. `OQ-104-005` |
| HG-102-014 S4 out of ordinary surfaces | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `ID-104-001`, `ID-104-016`, `TD-103-022`. Non-exceptable under evidence register §5.2. |
| HG-102-015 append-only evidence | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Retention-lock must be demonstrated. |

### 6.2 Identity gates

| Gate | Kind | C2 Cognito | C3 Entra External ID | C4 Auth0 | Evidence |
| --- | --- | --- | --- | --- | --- |
| HG-102-028 IdP credential boundary | DOC | `PASS` | `PASS` | `PASS` | Hosted-ceremony integration models: `EV-102-018` (C2 Managed Login), `EV-102-023` (C3 Microsoft-hosted sign-in page), `EV-102-021` (C4 Universal Login). Under `ID-104-001` no embedded variant is used; each record's limitations note the excluded modes. |
| HG-102-029 MFA and passkeys first-class | DOC | `PASS` | `PASS` | `PASS` | C2: passkeys and MFA factor configuration on Essentials (`EV-102-018`, `EV-102-022` — low confidence, fetch directly). C3: passkeys (FIDO2) and email OTP with Conditional Access enforcement; passkey registration requires a custom URL domain (`EV-102-023`). C4: passkeys on all tiers, MFA from the Essentials tier — the free tier fails this gate, which is a `CR0` tier-forcing fact (`EV-102-017`, `EV-102-021`). Policy-enforcement mechanics for C2 and C4 not separately retrieved: `OQ-104-010`. |
| HG-102-030 action-bound step-up | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Observation required. The documentary positions differ sharply — see §7.1. `OQ-104-007` |
| HG-102-031 individual session revocation | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Observation required. Documented capability differs materially — see §7.2. `OQ-104-008`, `OQ-104-009` |
| HG-102-032 enumeration resistance | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Observation required on hosted screens. C2's API-level configuration is thoroughly documented, including its residual sign-up disclosure — see §7.4. `OQ-104-011` |
| HG-102-033 auth evidence not analytics | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Data-flow documentation not retrieved. C4's bounded log product (`EV-102-028`) is adjacent but does not answer the analytics-reuse question. `OQ-104-002` |
| HG-102-034 SMS never the only factor | DOC | `PASS` | `PASS` | `PASS` | C2: passkey and email OTP factors (`EV-102-018`, `EV-102-022`). C3: email OTP and passkeys; SMS is an optional paid add-on and not a first factor (`EV-102-023`). C4: passkey and OTP factors beyond SMS (`EV-102-017`, `EV-102-021`). Phone-as-identity is optional configuration on every candidate and unused under `ID-104-008`. |
| HG-102-035 identity deletion and retention | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Deletion must be exercised and residual retention captured. `OQ-104-013` |
| HG-102-036 no durable identity-console credential | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-104-012` |
| HG-102-037 assurance validity and replay | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Verification required. C4's step-up documentation states no validity window (`EV-102-024`), which sharpens the observation. `OQ-104-009` |

### 6.3 Tally

The 25 applicable gates divide by evidence kind into 9 `OBS`, 15 `DOC`, and 1
`CFG`. Every figure in this table is recomputed from the §6.1 and §6.2 tables
by `scripts/audit-cbd-104.py`, so it cannot drift from the matrix it
summarizes.

|  | C2 | C3 | C4 |
| --- | --- | --- | --- |
| `PASS` | 3 | 3 | 3 |
| `PASS (design)` | 1 | 1 | 1 |
| `UNPROVEN` | 21 | 21 | 21 |
| `FAIL` | 0 | 0 | 0 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |

No candidate carries a `FAIL`, so no compensating control, exception, or
residual-risk record is required, no `CONDITIONAL` verdict arises, and — per
the route-A guardrail — all three candidates qualify for the observation
pass.

## 7. Findings that survive the evidence position

Four findings rest on retrieved documentation and are usable now.

### 7.1 `HG-102-030` step-up is the sharpest differentiator in the category

The gate exists because CBD-72 permissions 20a, 20b, 27, 29, 34, and 35 each
require fresh reauthentication bound to actor, action, budget space, and a
short validity window. The three candidates document materially different
positions.

**C4 Auth0 — a documented primitive, with an open window question.** Auth0
documents step-up directly: an application requests it per action through
scopes or checks the ID token's authentication claims before a sensitive
page, and validates the result from token claims (`EV-102-024`). What the
retrieved page does not state is a validity window for the elevated result —
the half of the `HG-102-030` pass test that inspects expiry — so the
observation must establish it, and `HG-102-037` shares the same question.

**C2 Amazon Cognito — no native primitive; AWS's own reference builds it
customer-side.** AWS's step-up reference architecture states that the
solution requires a customer-deployed Lambda authorizer, two DynamoDB tables,
a purpose-built SDK, and custom endpoints, with Cognito providing only the
OAuth token issuance underneath (`EV-102-025`, published September 2022).
Under catalog §2.3, a **Vendor** gate fails where the product does not have
the property, and CoBudget-side construction cannot create it. What keeps
this `UNPROVEN` rather than `FAIL` is the age of that evidence relative to
the platform: Cognito's authentication surface was rebuilt in the Essentials
generation (`EV-102-018`, `EV-102-022`), and whether its current choice-based
re-authentication can yield an assertion bound to an action with a stated
validity window is exactly the question `OQ-104-007` puts to AWS before the
observation pass. If the answer is no, this becomes the category's first
documentary `FAIL`, and under the route-A guardrail C2 would drop out of the
observation pass.

**C3 Entra External ID — a documented primitive at a coarser grain.**
External tenants support "step-up MFA with Conditional Access authentication
context," applied "when users access sensitive data or perform critical
actions" (`EV-102-023`, page dated May 21, 2026). The mechanism binds an
authentication-context claim to designated actions; whether the resulting
assertion carries the short, action-bound validity window the pass test
inspects is the observation's job.

### 7.2 Session-revocation authority must be CoBudget's on every candidate

`ID-104-004` locates the application session in CoBudget's own store. The
retrieved evidence shows this is not optional politeness — on each candidate,
relying on the provider's session artifacts alone would fail some part of
`PM-72-003` or `SR-94-002`:

* **C4** exposes per-session list/revoke endpoints, but on the Enterprise
  plan only, deletion is asynchronous and eventually consistent, and
  refresh tokens "can remain active after a session has expired or been
  deleted" (`EV-102-027`). On the `CR0`-priced Essentials tier the
  per-session surface is absent, and the artifacts CoBudget can revoke are
  the refresh tokens themselves — `OQ-104-008`.
* **C2** documents per-refresh-token revocation and global sign-out, and
  states plainly that revoked JWTs "will still be valid if they are verified
  using any JWT library that verifies the signature and expiration of the
  token" (`EV-102-040`). Prompt revocation is therefore a property of
  whoever checks revocation state — which `ID-104-004` makes CoBudget.
* **C3** revokes per user, not per session — `revokeSignInSessions`
  invalidates all refresh tokens and session cookies for the user, with "a
  small delay of a few minutes before tokens are revoked" (`EV-102-041`).
  All-sessions is the right shape for recovery and account lock; the
  individual-session half of the gate text, and conditional-access-based
  token re-evaluation in external tenants, are `OQ-104-009`.

The finding: the gate remains evaluable as written against provider-held
artifacts, but no candidate's provider-side session surface can substitute
for the application session boundary, and CBD-108 should weigh `HG-102-031`
observations in that light.

### 7.3 The C1 hosting ecosystem has no screen-passing identity service

Google Cloud Identity Platform's own concepts documentation names no passkey
support (`EV-102-029`), and it screens out of this category on capability
class 3. The cross-category consequence belongs to CBD-108's coherence
review (`OI-103-011`): selecting C1 for hosting forces a standalone identity
vendor, which adds a subprocessor under `HG-102-011`; selecting C2 or C3
keeps an ecosystem identity option open. This is recorded as a fact about
the current published catalogs, not a preference among them, and
`OQ-104-013` carries re-confirmation before CBD-108 relies on it.

### 7.4 Enumeration resistance is best documented on C2, and its residual is disclosed

Cognito's `PreventUserExistenceErrors` configuration is documented in detail:
uniform authentication failures, simulated challenges for nonexistent users
in choice-based flows, simulated recovery responses — and its residuals are
documented with equal candour: the `SignUp` operation "always returns
`UsernameExistsException` when a username is already taken" unless
alias-attribute configuration is used, and SRP flows with alias attributes
may not fully suppress existence (`EV-102-026`). This gives C2 the strongest
documentary starting position on `HG-102-032`, while the hosted-surface
observation the pass test actually requires remains open for all three
candidates (`OQ-104-011` carries the C4 and C3 documentary halves, which
were not retrieved).

## 8. Why no weighted rubric total is published

Rubric rule `R4` requires per-dimension subscores alongside any total so that
strength in one dimension cannot mask a `0` in another, and `R5` requires an
evidence-confidence profile with every result. The confidence profile for
every candidate here is dominated by Absent evidence, and `R3` scores absent
evidence as `0` — a total computed now would describe the research effort,
not the provider, exactly as CBD-103 §8 concluded for hosting. Evidence
register §7 is followed instead: the open questions in §10 are carried
forward rather than closed by silence, so no criterion has yet become a `0`.
Rule `R1` makes deferral harmless: all three candidates hold the same
verdict, so no ordering information is withheld.

## 9. Evidence register

Records are append-only in one register shared by every CBD-15 category
evaluation, so this package takes numbers no sibling holds. `EV-102-001`–`006`
and `013`–`016` are CBD-103's, `EV-102-007`–`012` remain reserved by CBD-103
§9 for its own completion pass, and the block from 030 to 039 is held by the
CBD-105 evaluation. CBD-104 therefore fills the unused `EV-102-017`–`029`
block and continues at `EV-102-040`. Numbers are never reused or renumbered,
so the resulting gap is a record of who registered what, not an error.

All retrievals below were performed on **August 20, 2026** by desk research;
none involved a provider account.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-017 | `HG-102-029`, `HG-102-034`, `CT-102-001`–`012` | Auth0 (I) | "Pricing", `https://auth0.com/pricing` | Documented | Medium | Establishes plan structure (Free / Essentials $35 / Professional $240 B2C monthly), 25,000-MAU free tier, passkeys on all tiers, MFA beginning at Essentials, one custom domain on Free with card verification, log streams by tier, per-session management restricted to Enterprise-adjacent tiers, the MAU definition ("any non-internal user that authenticated during a given month"), and next-tier-up overage billing. A marketing pricing matrix, not versioned product documentation; feature rows are coarse, and MFA policy-enforcement mechanics are not established. | February 20, 2027 |
| EV-102-018 | `HG-102-028`, `HG-102-029`, `HG-102-034`, `CT-102-001`–`012` | Amazon Cognito (I) | "Amazon Cognito Pricing", `https://aws.amazon.com/cognito/pricing/` | Documented | Medium | Establishes Lite/Essentials/Plus per-MAU rates ($0.0055/$0.015/$0.020), a permanent 10,000-MAU free tier on Lite and Essentials, no free tier on Plus, M2M token-request pricing, SMS via SNS billed separately, Essentials adding passwordless (passkeys, email, SMS) and Managed Login, and the MAU definition counting any identity operation including token refresh. Marketing pricing page; feature rows are coarse. | February 20, 2027 |
| EV-102-019 | `HG-102-011`, `CT-102-002`, `CT-102-007` | Microsoft Entra External ID (I) | "External ID Pricing" concept article, `https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing`, page dated June 22, 2026 | Documented | Medium | Establishes the MAU billing definition (unique external users authenticating per calendar month), the add-on model — M2M authentication and SMS phone authentication billed per transaction, Go-Local residency add-on available only in Australia and Japan — and the Azure-subscription linkage requirement. States no dollar figures; the free allowance is `EV-102-020`. | February 20, 2027 |
| EV-102-020 | `CT-102-001`, `CT-102-010` | Microsoft Entra External ID (I) | "Microsoft Entra pricing", `https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing` | Documented | Medium | Establishes "External ID core features are free for your first 50,000 monthly active users." Does not enumerate which features are "core," and states no per-MAU rate beyond the allowance; both are `OQ-104-016`. | February 20, 2027 |
| EV-102-021 | `HG-102-028`, `HG-102-029`, `ID-104-019` | Auth0 (I) | "Passkeys", `https://auth0.com/docs/authenticate/database-connections/passkeys` | Documented | Medium | Establishes passkeys for database connections across Universal Login, embedded, and native integrations; a 20-passkey-per-user cap; CORS/RP-ID configuration; and that under multiple custom domains a passkey binds to the first domain enrolled against. Does not state plan gating; `EV-102-017` covers tiers. Embedded and native modes are excluded by `ID-104-001` regardless of availability. | February 20, 2027 |
| EV-102-022 | `HG-102-029`, `HG-102-034` | Amazon Cognito (I) | "Authentication flows", `https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow-methods.html`, retrieved via search index | Documented | Low | Establishes that choice-based authentication (passkey, email OTP, SMS OTP, password) requires the Essentials feature plan or higher, and that passkey authentication can satisfy MFA when `FactorConfiguration` is `MULTI_FACTOR_WITH_USER_VERIFICATION`. Confidence held at Low because the page content was obtained through a search index rather than a direct fetch; fetch directly before selection, per the `EV-102-006` precedent. | February 20, 2027 |
| EV-102-023 | `HG-102-028`, `HG-102-029`, `HG-102-030`, `HG-102-034`, `ID-104-019` | Microsoft Entra External ID (I) | "MFA in external tenants", `https://learn.microsoft.com/en-us/entra/external-id/customers/concept-multifactor-authentication-customers`, page dated May 21, 2026 | Documented | Medium | Establishes second factors (email OTP; SMS as a paid add-on, not a first factor; passkey/FIDO2), Conditional Access MFA enforcement, step-up via Conditional Access authentication context, the Microsoft-hosted sign-in page model, and passkey prerequisites — custom URL domain required, MFA before registration, local accounts only (unavailable behind external IdPs or email-OTP first factor). Does not state assertion lifetimes or per-action validity windows. | February 20, 2027 |
| EV-102-024 | `HG-102-030`, `HG-102-037` | Auth0 (I) | "Step-up Authentication", `https://auth0.com/docs/secure/multi-factor-authentication/step-up-authentication` | Documented | Medium | Establishes per-action step-up requested through scopes (APIs) or ID-token claim checks (web apps), validated from token claims. States **no validity window** for the elevated result and no replay-protection detail; both halves of the `HG-102-037` question remain open. | February 20, 2027 |
| EV-102-025 | `HG-102-030` | Amazon Cognito (I) | AWS Security Blog, "Implement step-up authentication with Amazon Cognito, Part 1", `https://aws.amazon.com/blogs/security/implement-step-up-authentication-with-amazon-cognito-part-1-solution-overview/`, published September 7, 2022 | Asserted | Low | AWS's own reference architecture: step-up requires a customer-deployed Lambda authorizer, two DynamoDB tables, a purpose-built SDK, and custom endpoints, with Cognito supplying only OAuth token issuance. Strong evidence the primitive was not native in 2022; weak evidence about the post-2024 Essentials platform. A blog, not versioned product documentation. Used only to sharpen `OQ-104-007`, never for a `PASS`. | November 20, 2026 |
| EV-102-026 | `HG-102-032` | Amazon Cognito (I) | "Managing user existence error responses", `https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-managing-errors.html` | Documented | Medium | Establishes `PreventUserExistenceErrors` uniform-response behaviour across authentication, recovery, and confirmation, simulated challenges and delivery responses, and the documented residuals: `SignUp` discloses taken usernames absent alias-attribute configuration, and SRP with alias attributes may not fully suppress existence. API-level behaviour; the `HG-102-032` pass test additionally requires hosted-screen observation. | February 20, 2027 |
| EV-102-027 | `HG-102-031` | Auth0 (I) | "Manage User Sessions with Auth0 Management API", `https://auth0.com/docs/manage-users/sessions/manage-user-sessions-with-auth0-management-api` | Documented | Medium | Establishes per-user session listing, per-session and all-session revocation endpoints, their restriction to Enterprise plans, asynchronous eventually-consistent deletion, back-channel logout on deletion, and that refresh tokens can remain active after session deletion. Does not establish the revocation surface available on non-Enterprise tiers; `OQ-104-008`. | February 20, 2027 |
| EV-102-028 | `HG-102-033`, `ID-104-012`, `CT-102-007` | Auth0 (I) | "Log Data Retention", `https://auth0.com/docs/deploy-monitor/logs/log-data-retention` | Documented | Medium | Establishes tenant log retention by plan — 1 day (Starter/Free), 5 days (Essentials), 10 days (Professional), 30 days (Enterprise) — and log streaming as the externalization path. Does not answer the `HG-102-033` analytics-reuse question; it bounds how long provider-side evidence exists, which is why `ID-104-012` keeps the store of record on CoBudget's side. | February 20, 2027 |
| EV-102-029 | Screening class 3 | Google Cloud Identity Platform (I) | "Authentication concepts", `https://docs.cloud.google.com/identity-platform/docs/concepts-authentication` | Documented | Medium | Enumerates password, email, phone/SMS, federated (Google, Facebook, Twitter, GitHub), custom, and anonymous methods, with SMS and TOTP MFA guides, and names no passkey, WebAuthn, or FIDO2 method. Absence from this page is not proof of absence from the entire catalog; used for screening only, and `OQ-104-013` carries confirmation. No gate outcome rests on this record. | February 20, 2027 |
| EV-102-040 | `HG-102-031` | Amazon Cognito (I) | "Ending user sessions with token revocation", `https://docs.aws.amazon.com/cognito/latest/developerguide/token-revocation.html` | Documented | Medium | Establishes per-refresh-token revocation (`RevokeToken`, the `/oauth2/revoke` endpoint) that leaves other refresh tokens untouched, self-service and administrative global sign-out, revocation enabled by default on new app clients, and the caveat that revoked JWTs remain valid to any verifier that checks only signature and expiry. Establishes capability, not the exercised pass test. | February 20, 2027 |
| EV-102-041 | `HG-102-031` | Microsoft Entra External ID (I) | Microsoft Graph v1.0 reference, "user: revokeSignInSessions", `https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions`, content updated July 23, 2025 | Documented | Medium | Establishes per-user revocation of all refresh tokens and browser session cookies via `signInSessionsValidFromDateTime` reset, a stated propagation delay of up to a few minutes, and least-privilege permissions. Per-user only — no per-session granularity — and the note that it does not cover external users signing in through a home tenant concerns B2B guests; external-tenant consumer accounts are local. Access-token behaviour until expiry is not stated here; `OQ-104-009`. | February 20, 2027 |

Six further numbers are reserved, following CBD-103 §9's practice, so the
completing symmetric pass can register its records adjacent to the questions
they answer without renumbering:

| ID | Status |
| --- | --- |
| EV-102-042 | **Reserved** for the symmetric completion required by `OI-104-007` |
| EV-102-043 | **Reserved** for the symmetric completion required by `OI-104-007` |
| EV-102-044 | **Reserved** for the symmetric completion required by `OI-104-007` |
| EV-102-045 | **Reserved** for the symmetric completion required by `OI-104-007` |
| EV-102-046 | **Reserved** for the symmetric completion required by `OI-104-007` |
| EV-102-047 | **Reserved** for the symmetric completion required by `OI-104-007` |

## 10. Open questions carried forward

Per evidence register §7, these are carried to CBD-108 rather than closed. A
question that stops being asked becomes `Absent` evidence and scores `0`.

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-104-001 | Correlation-identifier lifetime and scope; does any candidate default to a persistent end-user identifier in its telemetry? | `HG-102-002` | Retrieve for all three |
| OQ-104-002 | Is authentication evidence joined into any shared identity, analytics, or advertising surface of the vendor's wider platform? | `HG-102-003`, `HG-102-033` | Inspect each vendor's data-flow and privacy documentation |
| OQ-104-003 | At-rest and in-transit encryption with algorithm and key custody stated | `HG-102-010` | Retrieve for all three |
| OQ-104-004 | Region list and subprocessor list, obtained **and dated**, including the C3 United States external-tenant residency position and the C4 tenant-region options | `HG-102-011` | Retrieve for all three |
| OQ-104-005 | Contractual statement of provider backup retention, region, and expiry for identity data. Silence fails this gate. | `HG-102-013` | Ask each vendor explicitly |
| OQ-104-006 | Customer-obtainable evidence of vendor staff access to identity data — including whether Customer Lockbox covers Entra External ID surfaces, and what Auth0 support access to a tenant produces as evidence | `HG-102-007`–`009` | Retrieve; put to vendors where undocumented |
| OQ-104-007 | Does current Cognito (Essentials generation) offer an action-bindable reauthentication assertion with a stated validity window, without customer-built orchestration? | `HG-102-030` | Put directly to AWS before the observation pass; a "no" is a documentary `FAIL` under §7.1 |
| OQ-104-008 | Which provider-held artifacts can be revoked on Auth0's non-Enterprise tiers, and does that surface cover every `ID-104-005` artifact? | `HG-102-031` | Retrieve; affects the `CR0` tier in assessment §6 |
| OQ-104-009 | C3 per-session revocation granularity, continuous-access token re-evaluation in external tenants, and assertion lifetime configuration; C4 step-up validity window | `HG-102-031`, `HG-102-037` | Retrieve for C3 and C4 |
| OQ-104-010 | MFA policy-enforcement mechanics on the evaluated tier for C4 and C2 (enforce-for-all-users configuration) | `HG-102-029` | Fetch the MFA policy documentation directly, including a direct fetch replacing `EV-102-022` |
| OQ-104-011 | Hosted-surface enumeration behaviour and its configurability for C4 and C3; hosted Managed Login behaviour for C2 beyond the API-level `EV-102-026` | `HG-102-032` | Retrieve, then observe |
| OQ-104-012 | Just-in-time, expiring administrative access for each identity console, and standing-credential defaults | `HG-102-005`, `HG-102-036` | Retrieve for all three |
| OQ-104-013 | Confirm the two screening judgments from primary catalogs: Google Cloud Identity Platform's passkey absence, and each screened-but-not-carried standalone's actual capability set | Screening | Re-confirm before CBD-108 relies on §7.3 |
| OQ-104-014 | Should a second standalone identity vendor be evaluated before selection? The standalone slot carries one candidate by the §4.2 rule. | Screening | CBD-108 decision |

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-104-007 | The documentary evidence pass was symmetric on five priority claims and asymmetric elsewhere (§3.1). | Harmless now — all three candidates hold one verdict and no ranking is produced. Must be completed symmetrically before CBD-108 ranks anything, and before observations run on a candidate whose documentary position could still produce a `FAIL`. Mirrors `OI-103-009`. |
| OI-104-008 | The route-A observation authorization (CBD-15 amendment, August 20, 2026) covers this category's nine observation gates, but no observation account exists and no observation has been performed. | The §6.3 verdicts stand until the observations are actually gathered. Authorization gathers no evidence. |
| OI-104-009 | The standalone slot carries a single candidate, selected on stated grounds in §4.2 rather than by exhaustive comparison of standalone vendors. | A defensible but narrow representation of the standalone field. `OQ-104-014` puts the widening decision to CBD-108 rather than closing it by silence. |
| OI-104-010 | §7.3's cross-category consequence — a C1 hosting selection forces a standalone identity vendor — rests on one screening record (`EV-102-029`). | CBD-108's coherence review (`OI-103-011`) should re-confirm it from primary catalogs (`OQ-104-013`) before weighing hosting and identity selections together. |
| OI-104-011 | No part of this evaluation has been reviewed by anyone other than its author, and no provider was contacted. | It is a desk evaluation. The independent security review that CBD-92 §1 and the architecture baseline require before public launch remains outstanding and is not substituted for by anything here. |
