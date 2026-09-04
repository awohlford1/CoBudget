# CBD-76 — MVP Boundary and Readiness Record

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — Product Owner approval required** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-76](https://cobudget.atlassian.net/browse/CBD-76) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Machine-readable boundary | `docs/cbd-76-mvp-boundary-register.json` |
| Traceability and completeness | `docs/cbd-76-acceptance-criteria-traceability.md` |
| Governing schedule decisions | CBD-71 **MVP Schedule Decisions v1.1**, approved August 15, 2026; `OD-72-06` and `UD-071-01` are closed |
| Governing collaboration sources | CBD-72 approved v0.1.54; CBD-73 approved v1.0.3; CBD-74 approved v1.0.1; CBD-75 approved v1.0 |
| Security/privacy reconciliation | CBD-91–95 approved package; open implementation and specialist gates remain binding |
| Review date | September 3, 2026 |

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
| `DL-76-016` | The terminal personal-account disposition is decided but not implementation- or release-ready. | Approved product rule / blocked execution | Private data deletion, retained shared facts, pseudonymization, vendor/backup limits, and non-resurrection need an exhaustive data-class/custodian schedule and specialist evidence. | Product Owner, Privacy, Legal, Security | Before terminal-deletion implementation or claim | FU-95-022; CBD-61; `EXC-76-004` claim boundary |

No high-impact CBD-12 product-boundary decision remains unnamed. Rows `DL-76-013`–`DL-76-016` are not permission to guess: each names the safe interim and route.

## 4. MVP boundary summary

The complete record is `docs/cbd-76-mvp-boundary-register.json`. This summary is deliberately short; identifiers make every row bidirectionally auditable.

### 4.1 Included

| ID | Included capability | Controlling limit |
| --- | --- | --- |
| `INC-76-001` | Roles, permissions, and ownership | One role per membership; one Primary; multiple Co-owners; individual connection authority; approved transfer ceremony. |
| `INC-76-002` | Invitation, consent, role/scope change, revocation, and removal | Current server state, explicit proof/consent, atomic authority changes, and space-scoped cutoff. |
| `INC-76-003` | Built-in alerts | Fixed categories/triggers/thresholds/eligibility; mandatory eligible in-app; personal external delivery; system deduplication. |
| `INC-76-004` | Notification privacy and personal delivery control | Content-free routine external copies; protected detail only after authenticated authorization. |
| `INC-76-005` | Primary administrative-history export | Customer-visible allowlist only; recipient-bound; expires within 24 hours; privileged/financial/personal state excluded. |
| `INC-76-006` | Role terminology and copy safety | Five exact roles; Accountability Partner is the sole support-role term; no authority, surveillance, or punishment implication. |
| `INC-76-007` | Authorization, audit, isolation, and negative tests | Server-side deny by default; current versions; no cross-space or derived-data leakage; denied mutation changes nothing. |
| `INC-76-008` | Accessible collaboration and recovery | Accessibility is an implementation evidence requirement, never inferred from product approval. |

### 4.2 Prohibited

| ID | Prohibited behavior | Enforcement implication |
| --- | --- | --- |
| `PRO-76-001` | Unauthorized access | Missing, stale, ambiguous, identifier-only, client-asserted, or cross-space authority is denied. |
| `PRO-76-002` | Money movement | No role or interaction can initiate or execute it. |
| `PRO-76-003` | Spending or purchase approval | No control or copy may approve, deny, punish, or condition spending. |
| `PRO-76-004` | Transaction blocking | Alerts, comments, acknowledgements, and roles cannot block transactions. |
| `PRO-76-005` | External-account control | Only the individual authorizer manages their connection; role/ownership never transfers it. |
| `PRO-76-006` | User lockout | No member controls another person's account; every participation state has the approved exit/recovery boundary. |
| `PRO-76-007` | Coercive monitoring | No forced acknowledgement, hidden surveillance, retaliation mechanic, or another person's personal-alert control. |
| `PRO-76-008` | Cross-budget disclosure | No resource, derived value, count, timing, cache, job, export, report, alert, or audit projection leaks another space. |

### 4.3 Excluded from MVP

| ID | Excluded capability | Reconsideration condition |
| --- | --- | --- |
| `EXC-76-001` | Legally supervised arrangements | Separate scope and qualified legal/privacy/safety/identity/jurisdiction review. |
| `EXC-76-002` | Minor accounts or arrangements involving minors | Separate minor-account product, consent, identity, safety, privacy, and legal evidence. |
| `EXC-76-003` | Employer monitoring or organizational administration | Separate validated institutional model with anti-coercion and organizational authorization review. |
| `EXC-76-004` | Unsupported legal, security, privacy, usability, or market claims | Evidence from the exact qualified discipline before the claim or release. |

### 4.4 Deferred

| ID | Deferred capability | Why | Evidence/review gate | Owner / target / follow-up |
| --- | --- | --- | --- | --- |
| `DEF-76-001` | Role stacking | Avoid permission/consent unions and ambiguous lifecycle effects. | Product model, threat/abuse review, migration, disclosure, and exhaustive authorization/isolation fixtures. | Product Owner; post-MVP; [CBD-365](https://cobudget.atlassian.net/browse/CBD-365). |
| `DEF-76-002` | User-authored arbitrary alert rules | Preserve deterministic, bounded, privacy-reviewable built-in events. | Rule language, authority, privacy/anti-coercion, cost/limits, accessible design, and abuse/dedup/isolation tests. | Product Owner; highest-priority post-MVP; [CBD-366](https://cobudget.atlassian.net/browse/CBD-366). |
| `DEF-76-003` | Final managed delivery-provider selection | Execution choice cannot redefine product semantics. | CBD-108 exact package, pricing, coherence, cost thresholds, legal/contract needs, residual risks, observation gates. | CBD-108 owner and Product Owner; before provider-dependent work; [CBD-108](https://cobudget.atlassian.net/browse/CBD-108). |
| `DEF-76-004` | Final production message inventory and templates | Semantic standards do not approve every exact customer string or transport template. | Versioned copy/templates, Product Owner approval, channel/locale equivalence, accessibility/comprehension, specialist review, forbidden-field fixtures. | Product Owner plus named disciplines; before affected release; [CBD-367](https://cobudget.atlassian.net/browse/CBD-367). |
| `DEF-76-005` | Formal external validation | Internal approval is not external or specialist evidence. | Separate qualified review legs, explicit claims/methods/results, residual risks, and release dispositions. | CBD-132 owner; before gated claim/release; [CBD-132](https://cobudget.atlassian.net/browse/CBD-132), [CBD-273](https://cobudget.atlassian.net/browse/CBD-273). |

## 5. Follow-up issue and creation-action list

| Route | Boundary item | Current state | Required next evidence | Effect while open |
| --- | --- | --- | --- | --- |
| [CBD-365](https://cobudget.atlassian.net/browse/CBD-365) | `DEF-76-001` role stacking | Planning; created September 3, 2026 under CBD-8. | Product model, specialist reviews, migration/disclosure, and exhaustive authority/isolation fixtures. | One active role per membership remains mandatory; stacking is denied. |
| [CBD-366](https://cobudget.atlassian.net/browse/CBD-366) | `DEF-76-002` arbitrary alert rules | Planning; created September 3, 2026 under CBD-10 from FF-009. | Approved custom-rule authority, privacy/safety, limiter/cost, accessibility, and test package. | No user-authored condition, category, threshold, formula, or recipient automation. |
| [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) | `DEF-76-003` provider selection | In Progress at review. | Approved exact provider package, cost thresholds, coherence, residual risks, and observation gates. | Provider-dependent implementation remains blocked; product semantics remain fixed. |
| [CBD-367](https://cobudget.atlassian.net/browse/CBD-367); provider inputs CBD-106/CBD-130 | `DEF-76-004` production messages | Planning; created September 3, 2026 under CBD-10. | Exact inventory, template hashes, channel/locale equivalence, review, and forbidden-field tests. | No draft exact string or template is production-approved. |
| [CBD-132](https://cobudget.atlassian.net/browse/CBD-132), [CBD-273](https://cobudget.atlassian.net/browse/CBD-273) | `DEF-76-005` external/specialist validation | Planning. | Separate qualified legs; never combine disciplines or use internal review as a substitute. | No affected validation claim or release disposition. |
| [CBD-24](https://cobudget.atlassian.net/browse/CBD-24) | `INC-76-007` authorization enforcement | Planned implementation. | Central policy schema, call-site inventory, allow/deny fixtures, race and cross-service tests (`FU-95-006`). | Shared-resource implementation/release blocked. |
| [CBD-21](https://cobudget.atlassian.net/browse/CBD-21), CBD-41, CBD-104 | `INC-76-002` identity/invitation mechanics | Planned implementation/provider evidence. | Identity/session/assurance, invitation proof, recovery, uniformity, and compromise tests (`FU-95-007`). | Authentication and acceptance implementation blocked. |
| CBD-61 / `FU-95-016` | `INC-76-005` exports | Contract incomplete. | Audience-specific schemas, authorization snapshots, encryption, expiry, custody, redaction, and race tests. | Export implementation blocked. |
| CBD-61 / `FU-95-022` | `DL-76-016` terminal account disposition | Product rule decided; execution evidence absent. | Data-class/custodian schedule, specialist evidence, pseudonym/linkage review, vendor/backup proof, non-resurrection tests. | Terminal-deletion implementation and claims blocked. |
| `FU-95-017`, `FU-95-021`, CBD-131 | Copy/support/comments safety | Semantics approved; exact operational evidence open. | Exact copy, restricted operations/training, qualified review, accessibility/comprehension, and abuse fixtures. | Affected surfaces and public-launch claims blocked. |

The three creation actions identified during the first draft are now Jira issues CBD-365, CBD-366, and CBD-367. Creating a ticket closes no implementation, evidence, or release gate.

## 6. Open execution, evidence, and specialist gates

These are not unresolved CBD-12 product boundaries. They remain binding on implementation or release:

| Area | Controlling open gates | Safe interpretation |
| --- | --- | --- |
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

* all thirty-six CBD-12 acceptance criteria have accountable approved product-rule evidence in CBD-72–75 or this package;
* every included, prohibited, excluded, and deferred boundary is explicit;
* no high-impact product decision is hidden as an implementation choice;
* open execution and evidence gates remain binding and are not waived by closing CBD-12; and
* CBD-12 closure would approve the planning specification, not authorize release or claim that the controls have been implemented or externally validated.

The per-criterion result and the CBD-1 → CBD-12 → CBD-72–76 coverage are in the traceability record.

## 9. Approval checklist

Before promotion to v1.0 and Jira closure:

1. Product Owner reviews this document, the JSON register, and the traceability record as one package.
2. Confirm CBD-365, CBD-366, and CBD-367 preserve the deferred boundary and carry no accidental roadmap or release commitment.
3. Verify the September 3, 2026 CBD-12 Jira reconciliation remains present and the acceptance criteria remain unchanged. **Verified for v0.1.**
4. `scripts/audit-cbd-76.py` passes and the full repository gate passes.
5. The merge commit and successful CI evidence are recorded in CBD-76.
6. CBD-76 is transitioned before CBD-12, and CBD-12 is re-fetched immediately before its own closure.
7. Confluence remains read-only until the repository change is merged to `main`; post-merge synchronization and parity readback are recorded separately.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | September 3, 2026 | Codex with Alexander Wohlford as Product Owner | Initial complete consolidation: versioned decision log, machine-readable four-way boundary, prohibited behavior list, deferred/evidence gates, follow-up and creation actions, terminology audit, CBD-1/CBD-12/CBD-72–76 traceability, per-criterion readiness, and a conditional CBD-12 recommendation. | Draft; Product Owner approval required |
