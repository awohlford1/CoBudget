# CBD-76 — MVP Boundary and Readiness Record

| Field | Value |
| --- | --- |
| Status | **Approved v1.0 — the Product Owner approved this exact package on September 4, 2026.** Approval fixes the four-way boundary, the decision log, and the traceability result as the controlling CBD-12 scope record. It closes no execution, evidence, specialist, or release gate named in §§5–6 and authorizes no implementation or claim |
| Document version | 1.0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-76](https://cobudget.atlassian.net/browse/CBD-76) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Machine-readable boundary | `docs/cbd-76-mvp-boundary-register.json` |
| Traceability and completeness | `docs/cbd-76-acceptance-criteria-traceability.md` |
| Governing schedule decisions | CBD-71 **MVP Schedule Decisions v1.1**, approved August 15, 2026; `OD-72-06` and `UD-071-01` are closed |
| Governing collaboration sources | CBD-72 approved v0.1.54; CBD-73 approved v1.0.3; CBD-74 approved v1.0.1; CBD-75 approved v1.0 |
| Security/privacy reconciliation | CBD-91–95 approved package; open implementation and specialist gates remain binding |
| Governing provider decision | **CBD-108 Approved v1.0, Done** — Product Owner approved the package and its five residual risks on September 5, 2026; route B taken September 2, 2026 under CBD-103 §3.3, so **every selection stands at `ELIGIBLE-PENDING-EVIDENCE` with twenty-seven route-A observations owed** and the approval is scoped to the Private MVP phase by evidence register §3.3.1; Private-MVP push has no provider to select (CBD-130 `PN-130-003`) |
| Review date | September 4, 2026 |

> **Decision boundary:** This record consolidates approved product behavior. It does not convert an execution-level design, internal review, structural audit, or Product Owner decision into implementation evidence, external validation, legal advice, security assurance, or release approval. A capability absent from the Included rows is denied unless a more specific approved source already requires it. Prohibited, Excluded, and Deferred rows never become Included by implementation accident.

## 1. Purpose

This is the controlling Private-MVP scope and readiness record for CBD-12. It gives a future contributor one place to distinguish approved implementation requirements from prohibited behavior, excluded product categories, execution-level decisions, research, specialist evidence, and post-MVP work.

The machine-readable register is normative with this document. If prose and JSON differ, the package fails review; neither side silently wins.

## 2. Authority and classification rules

The sources are applied in this order:

1. Approved CBD-11/CBD-71 product decisions and approved Product Owner dispositions.
2. The approved CBD-72 permission model.
3. The approved CBD-73 invitation/consent lifecycle, CBD-74 alert boundary, and CBD-75 terminology/copy standard.
4. CBD-91–95 security/privacy requirements and follow-up gates, which may constrain mechanics and release but cannot silently broaden product authority.
5. This record, which classifies the resulting boundary without reopening the sources above.

The four classifications mean:

| Classification | Controlling meaning |
| --- | --- |
| Included | Required Private-MVP product behavior. Implementation is still subject to every named execution, evidence, and release gate. |
| Prohibited | Must not exist in the product or be implied by copy, data shape, control placement, support behavior, or fallback. A change requires explicit Product Owner change control and all applicable specialist review. |
| Excluded from MVP | Not part of the Private-MVP product. No design or implementation may assume it. Reconsideration begins only through the recorded conditions. |
| Deferred | A bounded decision or capability intentionally postponed from CBD-12 or from the Private-MVP feature set. Its current safe behavior remains controlling until the follow-up closes. |

Silence is not permission. A deferred or excluded item cannot enter a schema, API, interface, test fixture, provider configuration, or support process as a “temporary” implementation choice.

`EXC-76-004` is a rule about claims rather than a product capability. It is classified Excluded because CBD-76-AC05 and the CBD-12 description place it there, which is why its target phase differs from the other Excluded rows.

## 3. Versioned decision log

| ID | Decision | Status | Rationale / consequence | Owner | Decision date or deadline | Affected artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| `DL-76-001` | Roles are properties of one budget-space membership; one person may hold independent roles in different spaces. | Approved | Prevents a global role from leaking authority across spaces. | Product Owner | Approved in CBD-72; consolidated September 3, 2026 | CBD-72; CBD-12-AC01–AC02; `INC-76-001` |
| `DL-76-002` | Private MVP permits one active role per person per space; role stacking is deferred. | Approved boundary / deferred extension | Keeps permission, consent, revocation, notification, and audit evaluation unambiguous. | Product Owner | MVP decision approved; post-MVP only | CBD-72 §2.1; CBD-12-AC03; `DEF-76-001` |
| `DL-76-003` | Each space has exactly one active Primary Owner and may have multiple active Co-owners. | Approved | The former one-Co-owner limit was superseded; `FU-95-004` is closed and must not be reopened. | Product Owner | August 15–16, 2026 | CBD-72 §§2/6; CBD-12-AC06/AC28–AC29; `INC-76-001` |
| `DL-76-004` | Any other active member may accept Primary ownership after the approved protected ceremony; the outgoing Primary becomes a Co-owner, existing Co-owners remain unchanged, and prior Viewer/Partner role state closes with retained history. | Approved | Preserves one Primary without creating a second Co-owner limit or silently combining roles. | Product Owner | Approved in CBD-72/CBD-73 | CBD-72 §6.2; CBD-73 §12; CBD-12-AC06/AC28; `INC-76-001` |
| `DL-76-005` | Connection authority belongs to the individual authorizer and never transfers with budget role or Primary ownership. | Approved | Budget administration is not external-account authority. | Product Owner | Approved in CBD-72 | CBD-72 PM-72-009/011; CBD-12-AC28; `PRO-76-005` |
| `DL-76-006` | Viewer is default-deny and receives exactly one owner-managed visibility profile; Accountability Partner instead has the fixed comprehensive financially read-only boundary. | Approved | Narrow sharing uses Viewer; there is no narrow or configurable Partner variant. | Product Owner | Approved in CBD-72; terminology fixed in CBD-75 | CBD-72 §5.1/§5.3; CBD-12-AC07/AC09/AC30–AC31; `INC-76-001` |
| `DL-76-007` | Invitation, consent, expansion, reduction, revocation, removal, and restoration behavior follows CBD-73. | Approved | Link possession, channel proof, authentication, intended-recipient confirmation, and consent remain separate controls. | Product Owner | CBD-73 v1.0 approved August 18, 2026 | CBD-73; CBD-12-AC12–AC18/AC34–AC36; `INC-76-002` |
| `DL-76-008` | The built-in event categories, triggers, thresholds, eligibility, three-record model, mandatory eligible in-app instances, and system cooldown/deduplication are Included and fixed. | Approved | Member-created conditions and system behavior cannot be confused with personal presentation/delivery preferences. | Product Owner | CBD-74 v1.0 approved September 2, 2026 | CBD-72 §5.4.1; CBD-74; CBD-12-AC19–AC21; `INC-76-003` |
| `DL-76-009` | User-authored arbitrary alert rules and thresholds are deferred under FF-009. | Deferred | Retains a deterministic, privacy-reviewable Private-MVP event set. | Product Owner | Highest-priority post-MVP review; no implementation before dedicated Jira refinement | FF-009; `DEF-76-002` |
| `DL-76-010` | Push, SMS, and routine product email are content-free; preferences cannot widen them. | Approved | External delivery is a locator, not a protected-detail surface. | Product Owner | August 16, 2026 | CBD-12-AC11/AC19/AC21; CBD-74 §§5–6; `INC-76-004` |
| `DL-76-011` | A Primary-only, recipient-bound, 24-hour administrative-history package uses the approved customer-visible allowlist and excludes privileged or personal state. | Approved semantic boundary | Exact serialization, encryption, custody, and download controls remain implementation gates. | Product Owner | Approved in CBD-72/CBD-12; before export implementation | CBD-72 §5.7; FU-95-016; `INC-76-005` |
| `DL-76-012` | Accountability Partner is the sole official supportive-role term; copy may not imply money control, legal authority, punishment, surveillance, or irrevocable access. | Approved | Terminology describes voluntary bounded support, not control. | Product Owner | CBD-75 v1.0 approved September 3, 2026 | CBD-75; CBD-12-AC23–AC24; `INC-76-006` |
| `DL-76-013` | Managed provider selection is deferred from this product-definition story to CBD-108. | Deferred execution decision | Provider mechanics may not reopen the approved consent, content, authority, retention, or isolation boundary. | CBD-108 owner and Product Owner | Before provider-dependent implementation | CBD-108; `DEF-76-003` |
| `DL-76-014` | Final per-surface production copy and provider templates are not approved by the semantic standards alone. | Deferred execution/evidence package | Exact strings require versioning, cross-channel checks, accessibility/comprehension evidence, and routed specialist review. | Product Owner and named discipline owners | Before affected customer-facing release | FU-95-017; OI-73-004; OI-74-003/005; OI-75-001/002; `DEF-76-004` |
| `DL-76-015` | Formal external validation remains separate from Product Owner approval and internal audit. | Deferred evidence | Prevents unsupported safety, usability, legal, security, privacy, or market claims. | CBD-132 owner and qualified reviewers | Before the claim or release each discipline gates | CBD-132; CBD-273; `DEF-76-005` |
| `DL-76-016` | The terminal personal-account disposition is decided but not implementation- or release-ready. | Approved product rule / blocked execution | Private data deletion, retained shared facts, pseudonymization, vendor/backup limits, and non-resurrection need an exhaustive data-class/custodian schedule and specialist evidence. | Product Owner, Privacy, Legal, Security | Decided August 16, 2026 (`RI-93-018`); execution before terminal-deletion implementation or claim | FU-95-022; CBD-61; `INC-76-013`; `EXC-76-004` claim boundary |
| `DL-76-017` | A permanently unavailable sole Primary Owner is recovered by archival, never by takeover: after 90 days without authenticated Primary activity any active Co-owner or Collaborator may request archival, with member notice and a 14-day objection window that any Primary activity cancels. Support-mediated ownership transfer stays refused. | Approved | Members are not left with contributed data frozen in a space nobody can act on, and the path grants no new authority to anyone. The 90-day and 14-day values are MVP parameters that may be tuned without reopening the decision. | Product Owner | August 15, 2026 (`OD-72-01`) | CBD-72 §6.3; CBD-12-AC06/AC17/AC22; `INC-76-010`; `PRO-76-006` |
| `DL-76-018` | Budget-space deletion routes through archival, is Primary-only, opens a 30-calendar-day restore window during which export follows read scope, then purges the payload to a minimal non-financial tombstone. Archival itself has no countdown and erases nothing. | Approved | One lifecycle rather than two; every destructive step has the same shape as the approved manual-transaction contract; members always have a remedy before a purge. | Product Owner | August 15, 2026 (`OD-72-02`, `OD-72-05`) | CBD-72 §§6.4–6.5; CBD-12-AC06/AC28; `INC-76-010` |
| `DL-76-019` | A connection whose authorizer is permanently gone becomes a permanently read-only orphaned connection: never synchronized again, never adoptable or reauthorizable by another member, labeled as orphaned, with imported records and provenance still readable. Coverage resumes only through a new connection by an entitled member. | Approved | Connection authority never transfers, even by attrition; historical totals stay explainable. | Product Owner | August 15, 2026 (`OD-72-04`) | CBD-72 §6.3, PM-72-011; CBD-12-AC28; `INC-76-011`; `PRO-76-005` |
| `DL-76-020` | Only a comment's original author, while active and with target access, may edit or remove it; every role including the Primary Owner is denied authority to edit, remove, hide, or moderate another author's contribution. Serious abuse uses a separate platform safety process. | Approved | Prevents owner-side silencing of a supporter or contributor inside the budget space while keeping an abuse route outside role permissions. | Product Owner | August 15, 2026 (CBD-72 v0.1.41, `AUD-72-009`) | CBD-72 §5.6; CBD-12-AC20/AC32; `INC-76-012`; `PRO-76-007` |
| `DL-76-021` | Accountability Partner informational-alert eligibility is retained although an active Partner can observe a provisional condition about an identified household before the people in it have corrected it. The residual risk is accepted, not mitigated. | Accepted residual risk | The Product Owner, as the named risk authority under CBD-94 §3.6, accepted the `RI-93-014` residual; CBD-74 §4.3 rule 6 states it plainly so acceptance is never read as absence. | Product Owner | Retained August 16, 2026; accepted September 2, 2026 (`OI-74-006`) | CBD-74 §4.3 rule 6; CBD-12-AC09/AC19; `INC-76-003` |

The log names every closed CBD-72 §10 decision, every CBD-74 §15 closure, every Product Owner risk acceptance that shapes a CBD-12 boundary, and every decision this record classifies. Rows `DL-76-013`–`DL-76-016` are not permission to guess: each names the safe interim and route.

## 4. MVP boundary summary

The complete record is `docs/cbd-76-mvp-boundary-register.json`. This summary is deliberately short; identifiers make every row bidirectionally auditable.

### 4.1 Included

| ID | Included capability | Controlling limit |
| --- | --- | --- |
| `INC-76-001` | Budget-space roles, permissions, and ownership | One role per membership; one Primary; multiple Co-owners; individual connection authority; approved transfer ceremony. |
| `INC-76-002` | Invitation, consent, role change, revocation, and removal lifecycle | Current server state, explicit proof/consent, atomic authority changes, and space-scoped cutoff. |
| `INC-76-003` | Built-in alert facts, recipient instances, and delivery attempts | Fixed categories/triggers/thresholds/eligibility; mandatory eligible in-app; personal external delivery; system deduplication. |
| `INC-76-004` | Notification privacy and personal delivery control | Content-free routine external copies; protected detail only after authenticated authorization; recipient-owned channel, quiet-hour, time-zone, digest, and presentation choices only. |
| `INC-76-005` | Primary-only customer administrative-history export | Customer-visible allowlist only; recipient-bound; expires within 24 hours; privileged/financial/personal state excluded. |
| `INC-76-006` | Supportive role terminology and copy safety | Five exact roles; Accountability Partner is the sole support-role term; no authority, surveillance, or punishment implication. |
| `INC-76-007` | Server-side authorization, audit, isolation, and negative testing | Server-side deny by default; current versions; no cross-space or derived-data leakage; denied mutation changes nothing. |
| `INC-76-008` | Accessible collaboration and recovery behavior | Accessibility is an implementation evidence requirement, never inferred from product approval. |
| `INC-76-009` | Collaborator financial export and owner-authorized Viewer snapshot | Actor's current readable scope only; reauthentication, recipient binding, encryption, and audit; Viewer snapshot is owner-initiated, one-time, and expires within 24 hours; Viewer and Partner self-service export denied. |
| `INC-76-010` | Budget-space archival, deletion, restoration, and sole-Primary recovery | Archival preserves everything and has no countdown; deletion routes through archival with a 30-day restore window; inactivity archival after 90 days with a 14-day objection window grants no authority. |
| `INC-76-011` | Bank-connection authority and orphaned-connection handling | One individual authorizer per connection; authority never transfers; orphaned connections are read-only forever and never adoptable. |
| `INC-76-012` | Attributed notes and comments | Author-only edit and removal; no cross-author moderation by any role; comments never change protected state; Viewers do not comment. |
| `INC-76-013` | Personal-account terminal disposition | Private data deleted after the restoration window; retained shared history pseudonymized; no remote-deletion or backup-erasure claim; execution blocked until `FU-95-022` closes. |

### 4.2 Prohibited

| ID | Prohibited behavior | Enforcement implication |
| --- | --- | --- |
| `PRO-76-001` | Unauthorized access | Missing, stale, ambiguous, identifier-only, client-asserted, or cross-space authority is denied. |
| `PRO-76-002` | Money movement | No role or interaction can initiate or execute it. |
| `PRO-76-003` | Spending or purchase approval | No control or copy may approve, deny, punish, or condition spending. |
| `PRO-76-004` | Transaction blocking | Alerts, comments, acknowledgements, and roles cannot block transactions. |
| `PRO-76-005` | External-account control | Only the individual authorizer manages their connection; role/ownership never transfers it. |
| `PRO-76-006` | User lockout | No ordinary action removes or demotes the Primary Owner; no member controls another person's account; every participation state has the approved exit/recovery boundary. |
| `PRO-76-007` | Coercive monitoring | No forced acknowledgement, hidden surveillance, retaliation mechanic, or another person's personal-alert control. |
| `PRO-76-008` | Cross-budget disclosure | No resource, derived value, count, timing, cache, job, export, report, alert, or audit projection leaks another space. |

### 4.3 Excluded from MVP

| ID | Excluded capability | Reconsideration condition |
| --- | --- | --- |
| `EXC-76-001` | Legally supervised arrangements | Separate scope and qualified legal/privacy/safety/identity/jurisdiction review. |
| `EXC-76-002` | Minor accounts or arrangements involving minors | Separate minor-account product, consent, identity, safety, privacy, and legal evidence. |
| `EXC-76-003` | Employer monitoring or organizational administration | Separate validated institutional model with anti-coercion and organizational authorization review. |
| `EXC-76-004` | Unsupported legal, security, privacy, usability, or market-validation claims | Evidence from the exact qualified discipline before the claim or release. |

### 4.4 Deferred

| ID | Deferred capability | Why | Evidence/review gate | Owner / target / follow-up |
| --- | --- | --- | --- | --- |
| `DEF-76-001` | Role stacking within one budget space | Avoid permission/consent unions and ambiguous lifecycle effects. | Product model, threat/abuse review, migration, disclosure, and exhaustive authorization/isolation fixtures. | Product Owner; post-MVP; [CBD-365](https://cobudget.atlassian.net/browse/CBD-365). |
| `DEF-76-002` | User-authored arbitrary alert rules and thresholds | Preserve deterministic, bounded, privacy-reviewable built-in events. | Rule language, authority, privacy/anti-coercion, cost/limits, accessible design, and abuse/dedup/isolation tests. | Product Owner; post-MVP, named by CBD-12 as a top review priority rather than a roadmap commitment; [CBD-366](https://cobudget.atlassian.net/browse/CBD-366). |
| `DEF-76-003` | Final managed delivery-provider selection | Execution choice cannot redefine product semantics. Private-MVP push is Web Push through the recipient's browser; no push provider exists to select (CBD-130 `PN-130-003`). | Product Owner approval of the exact CBD-108 package under the route the Product Owner approved (route B, September 2, 2026), with its recorded deferrals, accepted risks, and residual-risk ownership. This record does not restate CBD-108's acceptance criteria. | CBD-108 owner and Product Owner; before provider-dependent work; [CBD-108](https://cobudget.atlassian.net/browse/CBD-108). |
| `DEF-76-004` | Final production message inventory and templates | Semantic standards do not approve every exact customer string or transport template. | Versioned copy/templates, Product Owner approval, channel/locale equivalence, accessibility/comprehension, specialist review, forbidden-field fixtures. | Product Owner plus named disciplines; before affected release; [CBD-367](https://cobudget.atlassian.net/browse/CBD-367). |
| `DEF-76-005` | Formal external validation | Internal approval is not external or specialist evidence. | Separate qualified review legs, explicit claims/methods/results, residual risks, and release dispositions. | CBD-132 owner; before gated claim/release; [CBD-132](https://cobudget.atlassian.net/browse/CBD-132), [CBD-273](https://cobudget.atlassian.net/browse/CBD-273). |

## 5. Follow-up issue and creation-action list

| Route | Boundary item | Current state | Required next evidence | Effect while open |
| --- | --- | --- | --- | --- |
| [CBD-365](https://cobudget.atlassian.net/browse/CBD-365) | `DEF-76-001` role stacking | Planning; created September 3, 2026 under CBD-8. | Product model, specialist reviews, migration/disclosure, and exhaustive authority/isolation fixtures. | One active role per membership remains mandatory; stacking is denied. |
| [CBD-366](https://cobudget.atlassian.net/browse/CBD-366) | `DEF-76-002` arbitrary alert rules | Planning; created September 3, 2026 under CBD-10 from FF-009. | Approved custom-rule authority, privacy/safety, limiter/cost, accessibility, and test package. | No user-authored condition, category, threshold, formula, or recipient automation. |
| [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) | `DEF-76-003` provider selection | **Done, Approved v1.0, September 5, 2026.** Six categories selected at `ELIGIBLE-PENDING-EVIDENCE` under route B (September 2, 2026) — Google Cloud hosting and Cloud SQL, Cognito, SES, Plaid, AWS End User Messaging — with the observation tests deferred to build and push recorded as having no provider to select. | ~~Product Owner approval of the exact package~~ **given September 5, 2026**, with its recorded deferrals, accepted risks, and residual-risk ownership. **What remains is the twenty-seven-observation route-A pass**, which converts `ELIGIBLE-PENDING-EVIDENCE` to `ELIGIBLE`. | **Provider-dependent implementation is released for the Private MVP phase only**, because evidence register §3.3.1 scopes selection at that verdict to it. Production deployment is not released, and a gate failing on first observation still invalidates its selection. Product semantics remain fixed under every route. |
| [CBD-367](https://cobudget.atlassian.net/browse/CBD-367); provider inputs CBD-106/CBD-130 | `DEF-76-004` production messages | Planning; created September 3, 2026 under CBD-10. | Exact inventory, template hashes, channel/locale equivalence, review, and forbidden-field tests. | No draft exact string or template is production-approved. |
| [CBD-132](https://cobudget.atlassian.net/browse/CBD-132), [CBD-273](https://cobudget.atlassian.net/browse/CBD-273) | `DEF-76-005` external/specialist validation | Planning. | Separate qualified legs; never combine disciplines or use internal review as a substitute. | No affected validation claim or release disposition. |
| [CBD-24](https://cobudget.atlassian.net/browse/CBD-24) | `INC-76-007` authorization enforcement | Planned implementation. | Central policy schema, call-site inventory, allow/deny fixtures, race and cross-service tests (`FU-95-006`). | Shared-resource implementation/release blocked. |
| [CBD-21](https://cobudget.atlassian.net/browse/CBD-21), CBD-41, CBD-104 | `INC-76-002` identity/invitation mechanics | Planned implementation/provider evidence. | Identity/session/assurance, invitation proof, recovery, uniformity, and compromise tests (`FU-95-007`). | Authentication and acceptance implementation blocked. |
| CBD-61 / `FU-95-014` | `INC-76-010` archival, deletion, and recovery lifecycle | Product rules decided; per-data-class lifecycle absent. | Per-class lifecycle and legal basis, authority shutdown, restore window, frozen archived scope, backup expiry, derived-copy/provider propagation, and delete/restore/exit fixtures. | Archival/deletion implementation blocked; the product rules stand. |
| CBD-61 / `FU-95-016` | `INC-76-005` and `INC-76-009` exports | Contract incomplete. | Audience-specific schemas, authorization snapshots, encryption, expiry, custody, redaction, and race tests. | Export implementation blocked. |
| CBD-61 / `FU-95-022` | `DL-76-016` / `INC-76-013` terminal account disposition | Product rule decided; execution evidence absent. | Data-class/custodian schedule, specialist evidence, pseudonym/linkage review, vendor/backup proof, non-resurrection tests. | Terminal-deletion implementation and claims blocked. |
| `FU-95-017`, `FU-95-021`, `FU-95-025`, CBD-131 | Copy/support/comments safety (`INC-76-012`) | Semantics approved; exact operational evidence open. | Exact copy, restricted operations/training, qualified review, accessibility/comprehension, and abuse fixtures. | Affected surfaces and public-launch claims blocked. |

The three creation actions identified during the first draft are now Jira issues CBD-365, CBD-366, and CBD-367. Creating a ticket closes no implementation, evidence, or release gate.

## 6. Open execution, evidence, and specialist gates

These are not unresolved CBD-12 product boundaries. They remain binding on implementation or release:

| Area | Controlling open gates | Safe interpretation |
| --- | --- | --- |
| Permission model | CBD-72 §10 `OD-72-01`–`OD-72-06`: none open; all six closed August 15, 2026 | No CBD-72 product decision is open. Implementation of its rules waits on the `FU-95-*` gates below, not on a CBD-72 decision. |
| Invitation and consent | CBD-73 `OI-73-002`–`OI-73-012` except the closed portions of `OI-73-008` | Approved lifecycle semantics stand. The named identity, data-class, copy, limiter, audit, orchestration, provider, and evidence work cannot be invented in code. |
| Alerts and delivery | CBD-74 `OI-74-002`–`OI-74-005`, `OI-74-007` | The alert product model is approved. Persistence classes, values, providers/templates, exact copy, and fixtures remain gated. |
| Terminology and copy | CBD-75 `OI-75-001`, `OI-75-002`, `OI-75-005`–`OI-75-008` | The vocabulary and semantic standard are approved. Exact surface copy, accessibility/comprehension, localization, support operations, recommendations, and future-source coverage remain open. |
| Authorization architecture | `FU-95-006` | Default-deny product requirements stand; shared implementation waits for a complete policy decision path and bypass-resistant data access. |
| Provider package | CBD-108 / `FU-95-028` | No provider-dependent behavior ships before exact-package and residual-risk approval. |
| Retention and terminal deletion | `FU-95-014`, `FU-95-022` | Copy and behavior may not promise remote deletion, immediate backup erasure, or removal of immutable permitted provenance. |
| Validation | CBD-132 / `FU-95-027` | Product Owner approval and internal audits are labeled accurately and do not satisfy specialist or external validation. |

## 7. Terminology audit

The controlling vocabulary is:

| Customer role | Internal enum |
| --- | --- |
| Primary Owner | `primary_owner` |
| Co-owner | `co_owner` |
| Collaborator | `collaborator` |
| Viewer | `viewer` |
| Accountability Partner | `accountability_partner` |

Review findings:

1. CBD-75 v1.0 closed the legacy Guardian wording and makes Accountability Partner the sole official support-role term.
2. `npm run check:copy` scans governed role/brand strings and proves each of the 14 prohibited-language rules catches its own example.
3. The CBD-12 acceptance criteria use the approved term and fixed boundary.
4. The superseded CBD-12 planning-note statements about a single Co-owner, configurable thresholds/cooldowns, and detailed external previews were corrected in Jira on September 3, 2026. The same reconciliation corrected the description's legacy account term and removed its obsolete privacy-detail preference. Live readback confirmed the old phrases are absent and the approved multiple-Co-owner, fixed-alert, content-ceiling, and personal-account decisions are present.
5. No JSON, API, test, or schema may use a retired display name as an enum. Exact display names stay out of payloads and persistence.

## 8. CBD-12 readiness recommendation

**Recommendation: approve the CBD-12 product definition as implementation-ready only after this exact CBD-76 package is approved.**

This recommendation means:

* all thirty-six CBD-12 acceptance criteria have accountable product-rule evidence: thirty-four in approved CBD-72–75, and AC26–AC27 in this package, whose evidence counts as approved only once the Product Owner approves this exact version;
* every included, prohibited, excluded, and deferred boundary is explicit;
* no high-impact product decision is hidden as an implementation choice;
* open execution and evidence gates remain binding and are not waived by closing CBD-12; and
* CBD-12 closure would approve the planning specification, not authorize release or claim that the controls have been implemented or externally validated.

The per-criterion result uses the CBD-76-AC09 vocabulary (met, partially met, unmet, blocked) and, with the CBD-1 → CBD-12 → CBD-72–76 coverage, is in the traceability record. AC26 and AC27 are partially met until this package is approved.

## 9. Approval checklist

Before promotion to v1.0 and Jira closure:

1. Product Owner reviews this document, the JSON register, and the traceability record as one package. **Done September 4, 2026; approved as v1.0.**
2. Confirm CBD-365, CBD-366, and CBD-367 preserve the deferred boundary and carry no accidental roadmap or release commitment. **Confirmed September 4, 2026 by live read; all three are in Planning and each states that its creation is not a roadmap commitment.**
3. Verify the September 3, 2026 CBD-12 Jira reconciliation remains present and the acceptance criteria remain unchanged. **Verified for v0.1; re-verified September 4, 2026 for v0.2 by live read of CBD-12, CBD-76, CBD-1, and CBD-365–CBD-367.**
4. `scripts/audit-cbd-76.py` passes and the full repository gate passes. The audit pins the package version, the draft-status strings, and the conditional-close sentence on purpose, so promotion to v1.0 edits the audit in the same change; a promotion that leaves the audit untouched fails CI. **The v1.0 pins are in place; the CI result is recorded on CBD-76 under item 6.**
5. Correct the CBD-76 Jira planning note that still states an August 31, 2026 due date; CBD-12 records September 7, 2026 for CBD-76.
6. The merge commit and successful CI evidence are recorded in CBD-76.
7. CBD-76 is transitioned before CBD-12, and CBD-12 is re-fetched immediately before its own closure.
8. Confluence remains read-only until the repository change is merged to `main`; post-merge synchronization and parity readback are recorded separately.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0 | September 4, 2026 | Alexander Wohlford — Product Owner, with Claude | **Approved.** Promoted the v0.2 content unchanged except for status, version, the §9 checklist state, and the traceability rows that approval itself satisfies (AC26 and AC27 move from partially met to met; the CBD-76 criterion rows drop “in draft”; the close recommendation becomes a closure instruction). No classification, decision, boundary text, source, owner, or gate changed. Approval accepts no evidence gap: every §5 route and §6 gate remains open and binding. | Approved September 4, 2026 |
| 1.0.1 | September 5, 2026 | Claude with Alexander Wohlford as Product Owner | **Recorded the CBD-108 approval and closure of September 5, 2026**, which three fields in this approved package still described as an In Progress draft v0.69 awaiting approval. The consequential one was `DEF-76-003`'s effect-while-open, which said provider-dependent implementation waits for an approval that has since been given. **No boundary classification, decision-log row, prohibition, or traceability outcome changed** — this records an upstream status that the package cites, not a decision this package makes. The release is stated as narrowly as the upstream permits: implementation is released for the Private MVP phase only, because evidence register §3.3.1 scopes selection at `ELIGIBLE-PENDING-EVIDENCE` to that phase and twenty-seven route-A observations remain owed. | Approved v1.0 unchanged; a patch-level editorial refresh on the CBD-95 `1.0.10` precedent, which is the repository's form for recording an upstream status inside an approved package |
| 0.2 | September 4, 2026 | Claude with Alexander Wohlford as Product Owner | Independent review of v0.1 against the live Jira issues and current governing sources. Added Included rows `INC-76-009`–`INC-76-013` for financial export and Viewer snapshot, archival/deletion/recovery, connection authority and orphaned connections, comments, and the terminal personal-account disposition, so the §2 deny rule no longer excludes approved behavior. Added decision-log rows `DL-76-017`–`DL-76-021` (`OD-72-01`, `OD-72-02`/`OD-72-05`, `OD-72-04`, comment non-moderation, and the `OI-74-006` accepted residual). Reworded `DEF-76-003` to defer to CBD-108 approval under route B and to record that push has no provider to select. Added the Primary-protection rule to `PRO-76-006`, time zone to `INC-76-004`, and the Product Owner to every Prohibited owner. Replaced the §8 self-certifying sentence and adopted the CBD-76-AC09 readiness vocabulary. The §4 tables now quote the register's capability strings verbatim and the audit enforces that. | Draft; Product Owner approval required |
| 0.1 | September 3, 2026 | Codex with Alexander Wohlford as Product Owner | Initial complete consolidation: versioned decision log, machine-readable four-way boundary, prohibited behavior list, deferred/evidence gates, follow-up and creation actions, terminology audit, CBD-1/CBD-12/CBD-72–76 traceability, per-criterion readiness, and a conditional CBD-12 recommendation. | Draft; Product Owner approval required |
