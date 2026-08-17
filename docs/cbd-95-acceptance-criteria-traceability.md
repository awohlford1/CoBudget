# CBD-95 — Acceptance-Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved v1.0.1 — mechanical audit passed; Product Owner approved v1.0 and confirmed the v1.0.1 correction on August 16, 2026** |
| Document version | 1.0.3 |
| Owner | Alexander Wohlford |
| Jira | [CBD-95](https://cobudget.atlassian.net/browse/CBD-95) |
| Parent | [CBD-14](https://cobudget.atlassian.net/browse/CBD-14) |
| Frozen source baseline | `43e87be93a37097bf0e91cd4d3b4c2f98aa4aa15` |
| Merged to `main` | `5c90a74bed2d85dc4f5ed97ca1abb49e7b067515` |
| Audit command | `python scripts/audit-cbd-95.py` |
| Last updated | August 16, 2026 |

## 1. Purpose and assessment boundary

This record demonstrates how the CBD-95 deliverables, six CBD-95 acceptance
criteria, and ten parent CBD-14 acceptance criteria resolve to the exact
repository evidence. It also records review findings, source state,
limitations, readiness, approval requirements, and change control.

“Met” in this record means that the initial internal documentation and routing
criterion is evidenced. It never means that a mitigation is implemented, a
test result passes, a specialist has validated the product, a residual risk is
accepted, or a release is approved. An explicit blocker is a valid CBD-95
criterion outcome only where Jira expressly permits “evidence or an explicit
blocker”; it remains a blocker for the affected capability or later gate.

## 2. Frozen review state

### 2.1 Repository

The sources were frozen from the `origin/main` review baseline:

`43e87be93a37097bf0e91cd4d3b4c2f98aa4aa15`

The CBD-95 package has since merged to `main` as
`5c90a74bed2d85dc4f5ed97ca1abb49e7b067515`. The commits between the freeze and
the merge add CBD-102 artifacts and repository tooling. A direct path
comparison and the frozen-blob audit confirm that none of the eleven
CBD-72/CBD-91–94 authority sources changed, and the audit reverifies all eleven
blobs on every run.

Integrity is anchored to blob identity rather than to a commit SHA. An earlier
revision asserted that `origin/main` still equalled the freeze commit, which
made the audit unrunnable the moment this package merged; the assertion added
nothing the blob checks did not already provide and has been removed.

The exact upstream component blobs, versions, authority, and Confluence state
are recorded in `docs/cbd-95-threat-model-package-manifest.md` §§2 and 6. The
automated audit independently resolves those blobs from the working tree.

### 2.2 Live Jira read

The source state was read from Jira on August 16, 2026 and independently
re-verified against live state later the same day. No Jira mutation was
performed or authorized by this repository work.

The re-verification confirmed the load-bearing counts: CBD-12 carries exactly 36
acceptance criteria in its acceptance-criteria field, and all 36 reconciliation
rows map `RC-95-0NN` to `ACNN` with no index mismatch. CBD-14 carries exactly
ten, held in its description rather than its acceptance-criteria field, and all
ten resolve to §5. It also established `RV-95-006–008`.

| Issue | Live state used by this review |
| --- | --- |
| CBD-12 | In Progress; 36 numbered acceptance criteria; assigned to Alexander Wohlford; five subtasks CBD-72–76 with CBD-72 In Progress and CBD-73–76 Ready |
| CBD-14 | In Progress; due August 19, 2026; CBD-91–94 Done and CBD-95 Ready; related to CBD-72 |
| CBD-72 | In Progress; permission decisions approved in the repository package; deterministic fixtures and independent/specialist/package gates still open |
| CBD-73 / CBD-74 / CBD-75 | Ready; the version and scope discrepancies recorded as `RV-95-001–005` and `RV-95-008` were corrected on August 16, 2026 |
| CBD-76 | Ready; downstream of CBD-95 through the corrected Blocks link. AC06 and the CBD-71 version line were corrected on August 16, 2026 |
| CBD-91 / CBD-92 / CBD-93 / CBD-94 | Done |
| CBD-95 | In Progress; due August 19, 2026; blocked by CBD-94, blocks CBD-108, and — after the `RV-95-006` correction — blocks CBD-76 |

CBD-95 has a live Blocks relationship with CBD-108. The Jira response renders
CBD-108 as the outward issue and CBD-95 as the blocker, which is the intended
direction. The CBD-94 → CBD-95 link is likewise correct. The CBD-76 link was
stored in the reverse direction; under the authorized `RV-95-006` correction it
was replaced with a correct-direction link, verified from both endpoints against
the CBD-94 → CBD-95 pattern. Four inverted links elsewhere in the early batch
remain open and are recorded rather than reinterpreted.

## 3. Deliverable traceability

| CBD-95 Jira deliverable | Repository evidence | Assessment |
| --- | --- | --- |
| Versioned CBD-14 threat-model and data-inventory package | `docs/cbd-95-threat-model-package-manifest.md` | Complete draft: exact components, versions, blobs, stable sets, authority, invariants, publication state, limitations, and supersession triggers are recorded. |
| Acceptance-criteria traceability and review record | This document | Complete draft: CBD-14/CBD-95 criteria, deliverables, audit contract/result, review findings, readiness, approval, and change control are recorded. |
| CBD-12 reconciliation matrix | `docs/cbd-95-cbd-12-reconciliation-matrix.md` | Complete draft: `RC-95-001–036` give all current CBD-12 criteria exactly one outcome; fourteen security-sensitive areas and `RI-93-001–019` are independently covered. |
| Architecture and roadmap change list | `docs/cbd-95-architecture-roadmap-follow-up-register.md` §§3–5 | Complete draft: architecture workstreams, dependencies, source corrections, decision work, implementation work, evidence, and release effects are separated. |
| Follow-up issue register and readiness recommendation | Follow-up register `FU-95-001–030`; reconciliation matrix §7; this record §10 | Complete draft: existing targets and proposed focused work are named; no external mutation is implied. Readiness is split by CBD-72, CBD-76, CBD-14, Private MVP, and public launch. |

## 4. CBD-95 acceptance-criteria traceability

Jira lists six criteria in the order below. Local identifiers preserve that
order and are not new Jira fields.

| Criterion | Authoritative criterion | Evidence | Assessment |
| --- | --- | --- | --- |
| CBD-95-AC01 | Every CBD-14 criterion has evidence or an explicit blocker. | §5; manifest §§2–7; CBD-91–94 source artifacts | **Met for complete draft.** All ten parent criteria have exact evidence. Implementation, provider, specialist, Product Owner, and release blockers remain scoped instead of being reported as failed documentation work. |
| CBD-95-AC02 | Every stable threat/risk/requirement ID resolves bidirectionally. | §6; `scripts/audit-cbd-95.py`; approved CBD-94 traceability §§4–7; manifest §3 | **Met for the frozen package.** The route is intentionally transitive: source `DI/DF/TH/RF/AB/SG/EG/RI` → CBD-94 `RK/SR` → `VT/ME/SRV/FX/PR/MON/RG` → CBD-95 `RC/FU/RV`. The clean audit verified every exact expected set, frozen blob, local path, per-row follow-up route, and CBD-95 citation, and it now checks the CBD-94 reverse-route leg for all twelve routed families rather than five, so the transitive claim is enforced rather than asserted: 3,820 checks, zero failures, zero warnings. |
| CBD-95-AC03 | Every CBD-12 security-sensitive area has a recorded reconciliation outcome. | Reconciliation matrix §§2–3 | **Met.** Fourteen named areas route to `RC-95-*`; all 36 current CBD-12 criteria have exactly one outcome: 2 Pass unchanged, 33 Pass with mitigation, 1 Blocked, 0 Out of scope. |
| CBD-95-AC04 | Material contradictions are resolved by Product Owner decision or remain explicit blockers. | Reconciliation matrix §5; follow-up `FU-95-001–005/030`; §8 | **Met with explicit source blockers.** Eight contradictions are recorded. On August 16, 2026, the Product Owner resolved `RV-95-001` by retaining the CBD-92 content-free ceiling; CBD-12, CBD-74, and CBD-58 correction remains open. `RV-95-002–005` are scoped source corrections. `RV-95-006–008` were added by the live Jira audit and cover the inverted Blocks links, the CBD-12 contradiction of approved CBD-71 v1.1, and the scope errors in the finding set itself. All remain unauthorized external work. |
| CBD-95-AC05 | Limitations state that the initial internal model is not legal review, penetration testing, certification, or proof of security. | Manifest §7; follow-up register §7; §9 | **Met.** The statement also excludes compliance, production implementation, independent security/privacy/accessibility/safety review, provider due diligence, operational exercise, market/usability/coercion validation, and release approval. |
| CBD-95-AC06 | Final approval evidence and change-control rules are recorded. | Manifest §8; reconciliation matrix §8; follow-up register §8; §§11–12 | **Met.** Required evidence and rules are recorded and the Product Owner approved the exact v1.0 versions on August 16, 2026 with blockers acknowledged. The merge SHA and post-merge publication evidence do not yet exist, are recorded as outstanding in §11, and are not fabricated. |

## 5. CBD-14 acceptance-criteria traceability

The ten criteria below are taken in order from the live CBD-14 description read
August 16, 2026.

| Criterion | Authoritative criterion | Evidence | Draft assessment and remaining boundary |
| --- | --- | --- | --- |
| CBD-14-AC01 | Every in-scope data class has source/owner, sensitivity, purpose, audience, boundary, lifecycle expectation, and prohibited disclosure. | CBD-91 §§3–8; `DI-91-001–076`, `DF-91-001–013`, `EG-91-001–024`; CBD-91 trace routes preserved by manifest §§2–4 | **Met for the provider-independent initial inventory.** Provider, jurisdiction, concrete storage, and terminal per-class lifecycle evidence remain explicit gaps and follow-ups `FU-95-008/012/014/022/028`. |
| CBD-14-AC02 | System actors, dependencies, entry points, data flows, and trust boundaries are documented. | CBD-92 §§2–5 and appendices; `TH-92-001–045`, `RF-92-001–012`; CBD-91 flows | **Met for the initial model.** Unselected providers and final deployment topology remain open under `FU-95-008/012/028` and require re-review when selected. |
| CBD-14-AC03 | Technical threats and human-abuse/coercion scenarios are both covered. | CBD-92 `TH-92-001–045`; CBD-93 `AB-93-001–086`, active `SG-93-*`, `EG-93-001–010` | **Met.** Coverage is not a claim that coercion or survivor safety can be detected or prevented; specialist and affected-population evidence remains open. |
| CBD-14-AC04 | Every material threat has likelihood, impact, affected assets/users, mitigation, owner, verification, target phase, and residual-risk status. | CBD-94 risk register §§3–7; `RK-94-001–021`, `SR-94-001–147`; verification inventory `VT/ME/SRV/RG-94-*`; CBD-94 traceability | **Met as a provider-independent requirement/evidence route.** All residual scores remain unverified and no residual was newly accepted. Actual results and formal acceptance require their named authorities. |
| CBD-14-AC05 | Cross-budget isolation, invitation abuse, authorization bypass, stale/revoked access, queued notifications, shared-device previews, audit integrity, export, deletion, and provider compromise have explicit outcomes. | CBD-94 risk families and requirements; reconciliation matrix §2; follow-ups `FU-95-001/006–016/025/028` | **Met.** Each surface has an approved ceiling, verification route, and blocked effect. Explicit outcome does not mean successful implementation. |
| CBD-14-AC06 | CBD-11 decisions remain authoritative and are not silently weakened or contradicted. | Manifest §§1, 4.2, and 5; CBD-94 register preservation rules; reconciliation `RC-95-019/020/023/025/027`; `RV-95-002` | **Met.** Fixed schedule/alert/role/money-authority outcomes are preserved. Stale CBD-74 wording is blocked rather than treated as a new product decision. |
| CBD-14-AC07 | CBD-12 receives a documented result for permissions, consent, revocation, alerts, masking, and audit behavior. | Reconciliation matrix §§2–3; `RC-95-001–036` | **Met with one explicit source-correction blocker.** All named areas and all current CBD-12 criteria have outcomes. The Product Owner retained the later approved content-free ceiling; `RC-95-021` remains blocked only until the contradictory CBD-12/CBD-74/CBD-58 fields are corrected. |
| CBD-14-AC08 | Blocking Private-MVP risks are distinguished from accepted residuals and post-MVP follow-ups. | CBD-94 register §§3.5–3.8 and §7; follow-up register §§2–7; reconciliation §§6–7 | **Met.** No residual is newly accepted. Capability, Private-MVP, process, public-launch, and documentation gates are separated; `RG-94-015` remains public-launch-only. |
| CBD-14-AC09 | Required architecture, roadmap, and Jira updates are identified and linked. | Follow-up register `FU-95-001–030`, especially §§3–5 and 8 | **Met as an update plan.** Existing targets are identified by Jira key and proposed focused work is explicit. No Jira/Confluence/out-of-scope repository update is applied without authorization and a current-state comparison. |
| CBD-14-AC10 | Review evidence and limitations are recorded without legal, market, or production-security validation claims. | CBD-92/93/94 traceability and limitations; manifest §§6–7; follow-up register §§6–7; §§7–9 | **Met.** Internal and automated review evidence is named at its actual scope. Final CBD-95 Product Owner review is still pending and cannot be represented as specialist or release validation. |

## 6. Bidirectional identifier and audit contract

### 6.1 Expected upstream sets

| Family | Exact expected set | Forward authority | Reverse route |
| --- | --- | --- | --- |
| `DI-91-*` | `001–076` (76) | CBD-91 inventory | CBD-91 gaps/flows → CBD-92/94 family routes → CBD-95 area outcomes/follow-ups |
| `DF-91-*` | `001–013` (13) | CBD-91 flow table | CBD-92 boundaries/threats → CBD-94 families → CBD-95 manifest/reconciliation |
| `TH-92-*` | `001–045` (45) | CBD-92 threat register | CBD-94 traceability source matrix → `RK/SR/VT/RG` → CBD-95 outcomes/follow-ups |
| `RF-92-*` | `001–012` (12) | CBD-92 review findings | CBD-94 gap routes → requirements/gates → CBD-95 follow-ups |
| `AB-93-*` | `001–086` (86) | CBD-93 abuse register | CBD-94 traceability source matrix → risk/evidence routes → CBD-95 outcomes/follow-ups |
| active `SG-93-*` | `001–097` except retired `020` (96) | CBD-93 safeguard register | CBD-93 readiness/guard class → CBD-94 route or explicit candidate status → CBD-95 decision register |
| `EG-91-*` | `001–024` (24) | CBD-91 evidence gaps | CBD-94 gap/follow-up routes → `FU-95-*` |
| `EG-93-*` | `001–010` (10) | CBD-93 evidence gaps | CBD-94 gate/specialist routes → `FU-95-017/025/027` as applicable |
| `RI-93-*` | `001–019` (19) | CBD-93 Product Owner inputs | Reconciliation matrix §4 → `FU-95-018–022`; all `001–019` decided |
| `RK-94-*` | `001–021` (21) | CBD-94 risk register | `SR/VT/ME/SRV/RG-94-*` and all CBD-95 required areas |
| `SR-94-*` | `001–147` (147) | CBD-94 requirement catalog | Verification inventory and CBD-95 reconciliation/follow-up routes |
| `VT-94-*` | `001–270` (270) | CBD-94 verification inventory | Requirement/risk coverage and CBD-95 evidence blockers |
| `ME-94-*` | `001–015` (15) | CBD-94 verification inventory | Risk/requirement/gate closure routes |
| `SRV-94-*` | `001–015` (15) | CBD-94 verification inventory | Specialist/operational gate routes and `FU-95-013/017/025–027` |
| `FX-94-*` | `001–010` (10) | CBD-94 verification inventory | Test cases, requirements, and capability follow-ups |
| `PR-94-*` | `001–005` (5) | CBD-94 verification inventory | Parameter-dependent requirements and `FU-95-015/028` |
| `MON-94-*` | `001–010` (10) | CBD-94 verification inventory | Operational requirements, evidence packages, and `FU-95-011/015` |
| `RG-94-*` | `001–016` (16) | CBD-94 release/process gate table | Requirements/evidence plus CBD-95 readiness and follow-ups |

### 6.2 CBD-95 sets

| Family | Exact set | Definition and route rule |
| --- | --- | --- |
| `RC-95-*` | `001–036` | Defined once per current CBD-12 criterion in the reconciliation matrix and routed to upstream evidence, required action, and at least one `FU-95-*` follow-up record |
| `FU-95-*` | `001–030` | Defined in the follow-up register and routed to upstream IDs, existing/proposed work, closure evidence, and blocked effect |
| `RV-95-*` | `001–008` | Defined in reconciliation §5 and reviewed in §8 below; each routes to a follow-up |

The approved CBD-94 audit is not duplicated manually. CBD-95 rechecks its
expected source sets, source blobs, and the new `RC/FU/RV` layers. That composes
the existing source-to-risk-to-evidence routes with the CBD-95
risk-to-product/follow-up routes while keeping the defining artifact clear.

### 6.3 Open gap and decision reverse routes

| Source set | CBD-95 terminal route |
| --- | --- |
| `EG-91-001–003` | Lifecycle, deletion, restore, and terminal-disposition work `FU-95-014/022/027`; provider propagation where applicable `FU-95-028` |
| `EG-91-004` | Identity/session/recovery and provider evidence `FU-95-007/028` |
| `EG-91-005` | Financial-provider schema and due diligence `FU-95-012/028` |
| `EG-91-006` | Channel ceiling conflict, templates, accessibility, and provider evidence `FU-95-001/017/028` |
| `EG-91-007` | Policy, delayed authority, and derived-copy architecture `FU-95-006/009/010` |
| `EG-91-008` | Deployment/KMS/topology and provider evidence `FU-95-008/028` |
| `EG-91-009` | Exceptional access and platform-safety operating model `FU-95-013/025` |
| `EG-91-010` | Identity/security evidence and telemetry separation `FU-95-007/011` |
| `EG-91-011` | Durable worker and queue contracts `FU-95-009` |
| `EG-91-012–013` | Provider provenance, joint-account lifecycle, and reconciliation evidence `FU-95-012` |
| `EG-91-014–015` | Derived-data/content privacy, fixed alert correction, templates, and specialist evidence `FU-95-002/009/010/017/020/027` |
| `EG-91-016` | Cache/search/report/noninterference architecture `FU-95-010` |
| `EG-91-017` | Export schemas and custody evidence `FU-95-016` |
| `EG-91-018` | Audit/evidence/telemetry architecture `FU-95-011` |
| `EG-91-019` | Closed for current scope by approved `AN-92-*`: product analytics is disabled. Any future analytics capability requires a new Product Owner decision and full re-review; the stale planning reference remains isolated by `FU-95-023/024`. |
| `EG-91-020` | Topology/backup and lifecycle/restore evidence `FU-95-008/014` |
| `EG-91-021` | Provider/canonical-account/provenance implementation `FU-95-012` |
| `EG-91-022` | Lifecycle decision, terminal disposition, specialist evidence, and provider terms `FU-95-014/022/027/028` |
| `EG-91-023–024` | Client/derived-copy/channel/identity/template/provider work `FU-95-001/007/008/010/017/028` |
| `RF-92-001–005` | In order: policy `FU-95-006`; topology `FU-95-008/028`; queues `FU-95-009`; derived surfaces `FU-95-010`; audit/telemetry `FU-95-011` |
| `RF-92-006–010` | Account/lifecycle `FU-95-012/014/022`; provider evidence `FU-95-028`; operations/recovery `FU-95-013/014`; channels `FU-95-001/017/028`; terminal deletion `FU-95-014/022/027/028` |
| `RF-92-011` | Closed in the approved CBD-92 package and rechecked through the CBD-94 source-coverage audit; no new CBD-95 action unless a flow/boundary changes. |
| `RF-92-012` | Concrete distributed rate/resource values and tests `FU-95-015` |
| `EG-93-001–004` | Lifecycle-channel decision and advocacy/legal/privacy/accessibility evidence `FU-95-017/020/027`, plus derived-content privacy `FU-95-010` |
| `EG-93-005–008` | Research/advocacy/privacy/legal program `FU-95-027`; read-monitoring remains disabled; deletion-agency decision `FU-95-018` |
| `EG-93-009` | Shared comments/platform-safety scope and operating model `FU-95-025` |
| `EG-93-010` | Channel retirement and identity separation `FU-95-007/020` |
| `RI-93-001` | Decided: keep the current five roles for Private MVP; Viewer remains the narrow read-only option and no supportive-contributor or scoped/configurable Partner variant is added. |
| `RI-93-002` | Decided: retain owner-managed access for Private MVP, add no selective observer block, and require accurate safe leave/unlink and prior-copy limitations. |
| `RI-93-003` | Decided: protected authority/scope reductions take immediate effect, cannot be reversed by the actor alone, and require fresh consent for restoration. |
| `RI-93-004` | Decided: removal immediately ends access and creates no removal-time export entitlement or package for Private MVP. |
| `RI-93-005` | Decided and delivered as frozen archival-time read-scope export; verify through `FU-95-014/016` |
| `RI-93-006` | Decided: retain Primary-only deletion, notices, restore window, and archival export without a member objection, veto, or delay position. |
| `RI-93-007` | Decided: add an allowlisted account-subject administrative record accessible after removal while retained without restoring membership or disclosing broader data. |
| `RI-93-008` | Decided: add report plus subject-controlled detachment of a comment association while preserving authored content/evidence and denying global moderation or financial effect. |
| `RI-93-009` | Decided: add concise two-way invitation category/authority/privacy disclosure without actual pre-consent data or unauthorized member enumeration. |
| `RI-93-010` | Decided: A adds a recipient-controlled account-level block against one inviter across all spaces until recipient removal; future invitations are suppressed with uniform, non-disclosing outcomes and existing memberships remain unchanged. B requires an explicit unselected choice between declining once and declining plus invoking A, with no separate persistent-decline state or ambiguous-action escalation. C adds a pair-scoped cross-space limit for each authenticated inviter–recipient pair, with privacy-preserving keys, no recipient-wide quota, no interference with recipient actions or unrelated inviters, and exact parameter/recovery evidence under `PR-94-002`. |
| `RI-93-011` | Decided: during acceptance, the recipient may optionally verify a different personal notification-only destination. It activates only after successful verification and atomic acceptance, remains invisible to the inviter, does not automatically promote the invited channel, and grants no identity, login, recovery, primary-contact, account, invitation-proof, or acceptance authority. Failed or abandoned verification activates nothing and does not block ordinary acceptance. |
| `RI-93-012` | Decided: every lifecycle notice about a subject creates the mandatory authenticated in-app instance and may additionally use only that subject's verified private safety channel. Missing/unavailable/failed safety delivery never falls back externally; the channel is invisible and unchangeable to other members, follows its transport ceiling, and grants no identity/login/recovery/account/lifecycle authority. CBD-72 §6.3/CBD-91 §7.3 source synchronization remains open under `FU-95-020`; current external routing controls until that focused amendment merges. |
| `RI-93-013` | Decided: from authenticated in-app, the subject may immediately quarantine a compromised destination from delivery, queued work, tokens/version, safety designation, and any identity/login/factor/recovery authority. A safe replacement must be independently verified before atomic removal of the old binding; the compromised channel cannot approve retirement/replacement/reactivation/recovery, and support cannot bypass. Failure leaves it quarantined, uses the approved identity-recovery path, and leaves lifecycle routing in-app-only. Exact assurance/recovery design remains open under `EG-93-010`/`FU-95-020`. |
| `RI-93-014` | Decided: retain current informational-alert eligibility for active Primary Owners, Co-owners, Collaborators, and Accountability Partners under role authorization/masking; Viewers remain ineligible. Add no subject-first delay or person-responsibility framing. Alerts omit actor attribution, state only a provisional fact that may change, carry no acknowledgement/required-action state, and self-clear on resolution. `AB-93-031` observation/surveillance risk remains explicit and unaccepted under `FU-95-020`. |
| `RI-93-015` | Decided: use tiered transparent semantics. Authenticated in-app notices provide safe event and before/after role/profile/scope class, effective/scheduled time, material consequence, remaining state/access, and supported next step/deadline; actor identity follows existing customer-audit entitlement only. Inactive-owner notices disclose the process and objection path without precise inactivity history/countdown. Financial/hidden/newly inaccessible content, private reasons/state, speculation, and unsupported remedies are prohibited. External copies remain within `NT/EM-92-*`; exact strings/evidence remain open under `FU-95-017/020`. |
| `RI-93-016` | Decided: apply a normative semantic standard across applicable surfaces. Recorded consent/reauthentication is not proof of voluntariness; channel control is not sole control; delivered and recipient-controlled copies are not remotely revocable/erasable; another person's circumstances/reasons are not characterized; unsupported authority/accountability and safety/confidentiality/validation/compliance claims are prohibited; irreversible consequences are disclosed before action. Exact strings, locale/accessibility/comprehension equivalence, specialist evidence, and tests remain open under `FU-95-017/021/027`. |
| `RI-93-017` | Decided for Private MVP: pair the hard support-transfer denial with a bounded honest response. Support cannot override authority through escalation, confirm hidden state, inspect content, identify/contact/mediate with another member, recommend interpersonal contact, or promise recovery. It may provide only applicable authorized account/session recovery, in-product leave/unlink, account-subject record, subject-available evidence, restricted-reporting, and generic owner-managed-invitation boundary guidance. Exact copy, restricted handling, training, and evidence remain open under `FU-95-021/025/027`; public-launch expansion is not approved. |
| `RI-93-018` | Decided: after terminal personal-account deletion, delete private account/profile/connection/provider and server-controlled derived data under approved class schedules; pseudonymize necessary retained shared history as “Former member”; remove customer-visible/cross-space identifiers; restrict and time-bound internal subject linkage; preserve a minimal deletion/non-resurrection ledger and only purpose-bound evidence; state provider/backup expiry and recipient-copy limits honestly. Exact schedules, design, implementation, copy, privacy/legal evidence, and tests remain open under `FU-95-014/022/027`. |
| `RI-93-019` | Decided: current Primary/Co-owner joint-projection dissolution remains immediate after current authority/version/lifecycle/consequence checks. Contributors receive safe authenticated in-app pre-notice where feasible and mandatory immediate post-notice, with channel-ceiling external copies, but no objection/veto/delay/acknowledgement/approval position; they retain immediate removal of only their own source. Notice explains separate presentation/recomputation and unchanged links/private connections/authority without private provenance/reasons. Reassociation remains evidence-bound or unanimous. `AB-93-086` remains explicit and unaccepted; exact copy, implementation, specialist, and `SR-94-146/147` evidence remain open under `FU-95-017/018/020/027`. |
| `RI-93-009–011` | Independent invitation decisions `FU-95-019` |
| `RI-93-012–015` | Independent notification/lifecycle decisions `FU-95-020` |
| `RI-93-016` | Approved semantic-standard implementation and exact-copy/evidence work `FU-95-017/021/027` |
| `RI-93-017` | Approved Private-MVP bounded support-response implementation and evidence work `FU-95-021/025/027` |
| `RI-93-018` | Approved personal-account terminal disposition implementation/evidence `FU-95-014/022/027` |

### 6.4 Release-gate reverse routes

| Gate | CBD-95 disposition and terminal route |
| --- | --- |
| `RG-94-001` | Closed by the approved CBD-94 source audit; CBD-95 rechecks the exact families and frozen blobs before relying on it. |
| `RG-94-002` | Open identity/session evidence gate → `FU-95-007/028`. |
| `RG-94-003` | Open authorization/isolation evidence gate → `FU-95-006/009/010`. |
| `RG-94-004` | Open synchronized-financial-provider gate → `FU-95-012/028`. |
| `RG-94-005` | Open jobs/rates gate → `FU-95-009/015`. |
| `RG-94-006` | Open secrets/topology gate → `FU-95-008/028`. |
| `RG-94-007` | Open per-external-channel gate → `FU-95-001/017/020/028`; in-app remains separately assessed. |
| `RG-94-008` | Open per-export-schema gate → `FU-95-016`. |
| `RG-94-009` | Open audit/operations/exceptional-access/recovery gate → `FU-95-011/013/014`. |
| `RG-94-010` | Open lifecycle/recovery and terminal-deletion-claim gate → `FU-95-014/022/027/028`. |
| `RG-94-011` | Open shared-comments gate → `FU-95-025`. Because the Product Owner retained comments as required Private-MVP scope, this capability gate now also blocks Private-MVP launch. |
| `RG-94-012` | Open per-surface copy/accessibility gate → `FU-95-003/017/019–021/027`. |
| `RG-94-013` | Open jurisdiction-scoped legal/privacy collaboration gate → `FU-95-014/022/027/028`. |
| `RG-94-014` | Open named safety/research surfaces-and-claims gate → `FU-95-017–021/025/027`; it is not a blanket “safe” claim. |
| `RG-94-015` | Open public-launch-only independent-security gate → `FU-95-026`; it does not block Private-MVP launch. |
| `RG-94-016` | **Closed August 16, 2026.** The documentation audit passes and the Product Owner approved the exact v1.0 document versions with the recorded blockers acknowledged. Closing it proves package coverage, CBD-12 outcomes, limitations, and change control only; it closes no implementation, provider, specialist, legal, privacy, accessibility, safety, recovery, or public-launch gate. |

### 6.5 Mechanical audit result

The current candidate was executed on August 16, 2026 with Python 3.12.10
resolved from `PATH`. The portable command is `python scripts/audit-cbd-95.py`.
Exit code was 0.

```text
CBD-95 AUDIT PASS: 3957 checks, 0 failures, 0 warnings; 18 upstream families, 11 frozen blobs, 36 RC rows, 30 FU rows, 8 RV findings, 19 RI decisions, 14 required areas, 6 CBD-95 ACs, 10 CBD-14 ACs
```

The count moved from 3,642 to 3,910 across three revisions, and almost none of
that is the package growing. Revision 0.1.26 added per-row follow-up routes,
CBD-95 citation resolution, and the transitive reverse-route leg for seven
further families; 0.1.27 widened the expected `RV-95-*` set from five to eight;
0.1.28 records applied state. Check totals from different revisions therefore
describe different check sets and must never be compared as evidence of
stability. Each newly added or widened check was confirmed to fail on a
deliberately introduced violation before being relied on.

Any substantive edit after this result invalidates it and requires a clean
rerun before approval. A passing documentation audit does not execute any
`VT-94-*`, `ME-94-*`, or `SRV-94-*` evidence obligation and does not close
`RG-94-016` without Product Owner approval.

## 7. Substantive review method

The review checks more than identifier syntax. It asks whether the package:

1. assigns product authority to the correct source;
2. changes a role, visibility boundary, lifecycle, channel, or interaction
   without Product Owner approval;
3. uses UI behavior, logging, cleanup, or provider behavior as authorization;
4. collapses separate account, channel, invitation, recovery, session, or
   service authorities;
5. treats a candidate safeguard, verification obligation, or internal review
   as an implemented or validated control;
6. hides healthy-path, race, stale, retry, recovery, and failure-mode evidence;
7. overstates deletion, consent voluntariness, anonymity, confidentiality,
   safety, privacy, security, compliance, or release readiness;
8. merges independent `RI-93-*` decisions;
9. broadens a feature, provider, Private-MVP, process, or public-launch gate;
10. accepts residual risk without the authority in CBD-94 §3.6; or
11. edits Jira, Confluence, architecture, product-plan, or other out-of-scope
    artifacts without authorization.

## 8. Review findings

| ID | Severity | Finding | Disposition and evidence |
| --- | --- | --- | --- |
| RV-95-001 | Critical to affected channel approval | CBD-12 AC21 and CBD-74 AC05 allow richer opt-in external previews, while later approved CBD-92 `NT/EM-92-*` require content-free push/SMS and routine email. | **Product decision closed; source corrections applied August 16, 2026.** The Product Owner retained the CBD-92 ceiling; protected detail stays in-app and purpose-specific email allowlists are unchanged. CBD-12 AC21, CBD-74 AC04, CBD-74 AC05, and CBD-58 were corrected the same day. Routed to `RC-95-021` and `FU-95-001`; affected implementation stays gated by `RG-94-007/012` and `FU-95-001` closure awaits Product Owner acceptance. |
| RV-95-002 | High to CBD-74 scope | CBD-74 allows user-created/paused/disabled eligible alerts and member-owned trigger/cooldown/dedup configuration contrary to fixed CBD-11/CBD-71, CBD-12 AC19, and CBD-72 rules. | **Applied August 16, 2026.** CBD-74 AC02, AC09, and the description now fix trigger, threshold, cooldown, and deduplication as product behavior. AC11 was correctly left unchanged per `RV-95-008`. Routed to `RC-95-019` and `FU-95-002`. |
| RV-95-003 | Medium terminology/scope ambiguity | CBD-75 calls the Accountability Partner “scoped support,” which can imply a narrower resource-scoped role. | **Applied August 16, 2026.** CBD-75 AC02 now states the approved comprehensive, fixed-field, financially read-only boundary and points to Viewer for narrower scope. Routed to `RC-95-009/023` and `FU-95-003`. |
| RV-95-004 | High to CBD-76 boundary | CBD-76 AC06 incorrectly defers multiple Co-owners, exact Partner scope, and exact built-in alert categories/triggers/thresholds despite approved CBD-72 decisions. | **Applied August 16, 2026.** CBD-76 AC06 now defers only genuinely deferred items and states that multiple Co-owners, the fixed Partner boundary, and built-in alert categories/triggers/thresholds are approved and Included. Routed to `RC-95-026` and `FU-95-004`; CBD-76 remains blocked by CBD-95 through the corrected link. |
| RV-95-005 | Low version traceability | CBD-73/74/75 descriptions cite CBD-71 v1.0 although their inherited alert behavior depends on approved v1.1; CBD-93 also has stale publication wording. | **Applied August 16, 2026 for the Jira surfaces.** CBD-73, CBD-74, CBD-75, and CBD-76 now cite CBD-71 v1.1; CBD-76 was added to the set by `RV-95-008`. Routed to `FU-95-005`; no behavior changed. The CBD-93 repository header was corrected at CBD-93 v1.1.1 on a separate focused branch, with the manifest blob record and audit constant re-frozen in the same change. |
| RV-95-006 | Critical to the CBD-76 dependency control | Twelve Blocks links in the early id batch `10000–10016` were stored inverse to the documented dependency order. Link `10009` recorded CBD-76 as blocking CBD-95, the reverse of this package's gate. Links created later, ids `10034` and above, are correct. The batch was first reported as nine because the initial sweep queried only issues already in CBD-95's scope. | **Partly applied August 16, 2026.** The five links touching CBD-76 were deleted and replaced in the correct direction: CBD-95 blocks CBD-76, CBD-75 blocks CBD-76, and CBD-76 blocks CBD-77/78/79. Direction was confirmed from both endpoints against the known-correct CBD-94 → CBD-95 link. Jira enforces CBD-76's downstream position again. **All twelve identified inverted links were removed on August 16, 2026.** The CBD-72 → CBD-75 chain and the CBD-76 cluster were rebuilt correctly; `10013`, `10014`, `10015`, and `10016` were deleted without replacement, leaving the CBD-77 → CBD-81 cluster deliberately empty per Product Owner decision, with CBD-80 verified to hold no links. A complete project-wide enumeration remains outstanding, so inverted links may exist outside the identified batch. Routed to `FU-95-030`. |
| RV-95-007 | High to reconciliation-target authority | The live CBD-12 description calls CBD-71 `SD-071-044` a pending v1.1 amendment "the CBD-71 register marks not authoritative" and says `OD-72-06` "is not settled." | **Applied August 16, 2026.** The CBD-12 inheritance preamble now cites v1.1 as authoritative, records v1.0 as retained history, and states `OD-72-06` and `UD-071-01` closed. The DEPENDENCIES bullet carried the same stale claim and was corrected with it. Routed to `FU-95-005`. |
| RV-95-008 | Medium finding-scope defect | `RV-95-001` omits CBD-74 AC04 and the budget-space identification clause of CBD-12 AC21; `RV-95-005` omits CBD-76; `RV-95-002` names CBD-74 AC11, which grants no configuration authority. | **Applied August 16, 2026.** CBD-74 AC04 and the CBD-12 AC21 budget-space clause were corrected with the `RV-95-001` set; CBD-76 was corrected with the `RV-95-005` set; CBD-74 AC11 was left unchanged. Routed to `FU-95-001/002/005`. A live text sweep of CBD-12, CBD-58, and CBD-73–76 returns no remaining stale phrasing, confirming a corrector working only from `RV-95-001–005` would have left two fields behind. |

`RV-95-001` has its Product Owner outcome but is not operationally closed until
the authorized current-state source corrections are applied. `RV-95-002–005`
also require their authorized source corrections. CBD-95 may be approved with
the corrections explicit only if the Product Owner accepts the stated blocker
effects and does not claim the affected downstream approvals.

### 8.1 Post-merge package review

`RV-95-*` is reserved for material conflicts between this package and its
external sources. The defects below were found in the package itself during
post-merge review on August 16, 2026, and were corrected in this revision
rather than assigned new `RV` identifiers, which would have widened a set with
a different meaning. No product decision, reconciliation outcome, residual, or
release effect changed.

| Defect | Correction |
| --- | --- |
| The audit asserted `origin/main` equalled the freeze commit, so merging this package made the audit permanently unrunnable and deadlocked the change-control rule that requires a clean rerun before approval | Assertion removed; blob identity is the integrity control (§2.1) |
| `git()` returned `stdout.strip()`, consuming the leading space that `git status --porcelain` uses for a worktree-only change and corrupting the first reported path, so the out-of-scope guard rejected files that were in scope | Changed to `rstrip()`; guard reverified against a deliberate violation |
| Execution plan §7 claimed a fourteen-point audit contract the script did not implement, including per-row schema, routing, and link resolution | §7 split into script-enforced (§7.1) and review-enforced (§7.2); the unimplemented routing checks were added rather than only documented |
| All 36 matrix rows omitted the plan §5.2 follow-up field, and the follow-up register cited no `RC-95-*`, so 31 criteria had no path to the work that unblocks them | `Follow-up` column added to every row and mechanically enforced |
| The transitive reverse route was verified for five of twelve families, so a later CBD-94 revision could falsify AC02 while the audit stayed green | Reverse-route check extended to all twelve routed families |
| Four follow-up register §6 bullets ended a sentence before a bare “and” | Repaired to the list's `; and` form |
| The audit result recorded a runtime and `PATH` limitation that no longer held | Re-recorded against Python 3.12.10 resolved from `PATH` |

## 9. Evidence limitations

This is an initial internal model, not legal or regulatory advice, privacy or
compliance validation, penetration testing, certification, or proof of
security. It is not an independent security review, provider assessment,
production incident exercise, accessibility validation, survivor/advocacy
validation, usability or market validation, or evidence that implementation
matches the requirements.

Specific residual limitations include:

- coercion cannot be inferred from a completed consent or reauthentication
  ceremony;
- people with legitimate access can remember, photograph, forward, download,
  or recopy data outside CoBudget custody;
- content-free external notifications still reveal that CoBudget activity
  occurred and can be observed or suppressed;
- provider, carrier, inbox, operating-system, backup, and recipient copies have
  their own retention and deletion boundaries;
- a solo operator cannot invoke exceptional customer-content access, key
  recovery, privileged recovery, or return-to-service operations. The Product
  Owner requires a genuinely independent second approver before access; and
- architecture, providers, jurisdictions, capabilities, and final schemas can
  invalidate the analysis and require change control.

## 10. Readiness recommendation

| Decision surface | Recommendation | Exact effect |
| --- | --- | --- |
| CBD-95 document package | **Approved v1.0.1** | All required artifacts exist, the mechanical audit passes, and the Product Owner approved the exact v1.0 versions on August 16, 2026 with the recorded blockers acknowledged, then confirmed the v1.0.1 correction to the `RV-95-006` link state the same day. |
| `RG-94-016` final reconciliation gate | **Closed** | The audit passes and the exact manifest, matrix, register, and traceability record are approved with blockers acknowledged. |
| CBD-72 CBD-14 security-sensitive reconciliation | **Satisfied** | Package coverage is complete, the `RV-95-001` conflict is decided, its stale Jira fields are corrected, and CBD-95 is approved at v1.0. This closes only the CBD-14 reconciliation; CBD-72's fixture, independent-audit, accessibility, architecture, privacy, quality, approval, and publication gates are independent and remain open. |
| CBD-76 start | **Permitted from the CBD-95 side** | AC06 is corrected and CBD-95 is approved, so CBD-95 no longer withholds CBD-76. The Blocks link remains until CBD-95 reaches Done. CBD-76 stays subject to its own readiness and to completed CBD-72–75 outputs. |
| CBD-14 completion | **Documentation criteria satisfied** | CBD-91–94 are Done, all ten criteria resolve to evidence, and the CBD-95 consolidation is approved with blockers acknowledged. Transitioning the CBD-14 issue is a separate workflow action that this record does not perform. |
| Private-MVP implementation/launch | **Not ready** | Foundational architecture, implementation, provider, operational, lifecycle, copy, and specialist gates remain open. Because comments are retained in required MVP scope, `EG-93-009`/`RG-94-011` are explicit Private-MVP launch blockers. |
| Public product launch | **Not ready** | All applicable Private-MVP work plus `RG-94-015` independent security review remain open. No new penetration-testing prerequisite is inferred. |

## 11. Final approval evidence

The following record must be completed against exact versions; blank evidence
is not approval.

| Approval item | Required evidence | Current state |
| --- | --- | --- |
| Exact repository baseline | Merge commit and the five CBD-95 document blobs plus audit-script blob | **Merged and locatable.** The approved package landed on `main` in two merges: `7b2bb44b1f2c26625b0cdfb445eeae828391dc4f` (PR #53 — audit repair, applied source corrections, and the v1.0/v1.0.1 approval) and `29ec698` (PR #54 — the CBD-93 v1.1.1 editorial correction and its coordinated re-freeze). The approval originally bound to v1.0 content rather than a commit because the branch was uncommitted at approval time; these SHAs supply the immutable baseline that was outstanding. Current approved versions on `main`: plan 1.0, manifest 1.0.1, matrix 1.0.1, register 1.0.2, this record 1.0.2 |
| Mechanical audit | Clean command, UTC/local date, Python version, exit code 0, counts, and no warnings/failures | Passed August 16, 2026 with Python 3.12.10: 3,910 checks, exit 0, zero failures, zero warnings; rerun required after any substantive edit |
| Substantive review | `RV-95-001–008` read with affected criteria, current controlling rules, and blocker effects | Acknowledged by the Product Owner on August 16, 2026 at v1.0, and the corrected `RV-95-006` link state confirmed at v1.0.1. `RV-95-006` is closed as a Jira-enforcement gap: all twelve identified inverted links are removed and the CBD-76 dependency is enforced again. A project-wide enumeration remains outstanding |
| Product decisions | Explicit disposition for `RV-95-001`, exceptional-access and comments operating models, and every `RI-93-*` current-rule effect | External channels remain content-free; exceptional access needs independent approval; comments stay in MVP behind the safety launch gate. `RI-93-001–006` settle authority/lifecycle limits and archival export; `RI-93-007` adds the post-removal subject record; `RI-93-008` adds report/detach; `RI-93-009` adds safe two-way invitation disclosure; `RI-93-010` adds recipient-controlled blocking, explicit decline behavior, and a pair-scoped cross-space limiter without recipient-wide exhaustion; `RI-93-011` adds a separately verified notification-only destination during acceptance without identity/recovery escalation or inviter visibility; `RI-93-012` adds strict in-app-plus-safety-channel lifecycle routing with no external fallback and requires focused CBD-72/CBD-91 synchronization; `RI-93-013` adds fail-closed compromised-channel quarantine and independent replacement without support bypass; `RI-93-014` retains current informational-alert eligibility with no blame/actor attribution while leaving observation risk unaccepted; `RI-93-015` adopts tiered transparent notice semantics; `RI-93-016` adopts the normative cross-cutting semantic standard; `RI-93-017` adopts a Private-MVP-only bounded honest support response; `RI-93-018` deletes private terminal-account data and pseudonymizes retained shared history; `RI-93-019` retains immediate owner/co-owner joint-projection dissolution with safe pre/post notice, no contributor objection/veto/delay/acknowledgement state, unchanged contributor self-source removal, and explicit unaccepted forced-itemization risk. All 19 `RI-93-*` inputs are decided; implementation, exact copy, evidence, residual-risk disposition, and release gates remain open. |
| Residual risk | Any acceptance identifies exact risk, evidence, expiry/review date, and authorized role under CBD-94 §3.6 | None proposed or accepted by CBD-95 |
| Readiness | Separate decisions for `RG-94-016`, CBD-72, CBD-76, CBD-14, Private MVP, and public launch | Recorded in §10. `RG-94-016` closed; CBD-72's CBD-14 gate satisfied; CBD-76 no longer withheld by CBD-95; CBD-14 documentation criteria satisfied. Private MVP and public launch remain **not ready** and are unaffected by this approval |
| Publication | Post-merge Confluence page IDs/versions and parity readback | Not applicable before merge; routed to `FU-95-029` |
| Jira workflow | Current-state refetch, authorized exact comments/links/status changes, and before/after evidence | Product Owner authorized the `RV-95-001–008` corrections on August 16, 2026. Nine field corrections across CBD-12, CBD-58, CBD-73–76 and five Blocks-link replacements were applied, each preceded by a current-state refetch and followed by read-back. No status transition was made. Remaining work routed to `FU-95-030` |

Product Owner approval must name the exact document versions and may state:

> Approved as the initial internal CBD-14 consolidation and CBD-12
> reconciliation baseline, with the listed Product Owner decisions recorded and
> their implementation work, specialist evidence, residual-risk dispositions,
> and release gates remaining open at their recorded scope.

It must not be shortened into a claim that the product is secure, compliant,
validated, penetration-tested, certified, or ready for Private-MVP or public
launch.

## 12. Change control

Any change to an upstream blob, stable identifier, CBD-12 criterion, approved
CBD-72/CBD-92 product rule, review finding, reconciliation outcome, follow-up
effect, or readiness recommendation invalidates the prior audit and approval.
The next revision must:

1. freeze the new source state;
2. compare the changed authority with every affected forward and reverse route;
3. update the manifest, `RC/FU/RV` rows, readiness, and revision histories;
4. rerun `scripts/audit-cbd-95.py` against the exact candidate;
5. obtain Product Owner review for any product or release effect; and
6. merge repository evidence before synchronizing its Confluence copy.

Immediately before a Jira mutation, fetch the current issue, relevant subtasks,
links, status, assignment, dates, acceptance criteria, description, and
comments. Preserve concurrent valid content. A repository approval does not
authorize the external mutation.

## 13. Completion checklist

- [x] Five CBD-95 deliverables mapped to repository evidence.
- [x] Six CBD-95 acceptance criteria mapped.
- [x] Ten CBD-14 acceptance criteria mapped.
- [x] All 36 current CBD-12 criteria assigned one reconciliation outcome; none remains blocked after the `RC-95-021` reclassification.
- [x] Fourteen security-sensitive areas explicitly routed.
- [x] All 19 `RI-93-*` inputs kept independent and treated as decided.
- [x] Thirty bounded architecture, roadmap, decision, evidence, publication, and workflow follow-ups recorded.
- [x] Eight material/source findings recorded with controlling rules and effects.
- [x] Limitations and no-new-residual-acceptance boundary recorded.
- [x] Mechanical audit passes on the current candidate (rerun after any substantive edit).
- [x] `RV-95-001` receives a Product Owner decision: retain the CBD-92 content-free ceiling.
- [x] `FU-95-013` receives a Product Owner decision: require genuinely independent approval before exceptional access/recovery.
- [x] `FU-95-025` receives a Product Owner decision: retain comments and make the platform-safety gate a Private-MVP launch blocker.
- [x] Live Jira re-verification confirms 36 CBD-12 and 10 CBD-14 acceptance criteria and all 36 `RC-95-*` index mappings.
- [x] CBD-12 AC21, CBD-74 AC04, CBD-74 AC05, and CBD-58 received their authorized current-state source corrections.
- [x] The CBD-12 inheritance preamble and DEPENDENCIES bullet in `RV-95-007` cite approved CBD-71 v1.1.
- [x] The five inverted Blocks links touching CBD-76 are replaced in the correct direction.
- [x] All twelve identified inverted Blocks links `10000–10016` are removed; the CBD-72 → CBD-75 chain and CBD-76 cluster are rebuilt in the correct direction.
- [ ] A complete project-wide enumeration of Blocks links is performed to confirm none remain inverted outside the identified batch.
- [ ] The intended dependency order for CBD-77 through CBD-81 is established from an authoritative source before that cluster is rebuilt.
- [ ] `FU-95-001–005` are accepted and closed by the Product Owner.
- [x] Exact CBD-95 document versions receive Product Owner approval at v1.0.
- [x] `RG-94-016` receives its authorized closure decision.
- [x] `FU-95-002–005` closed on their applied corrections; `FU-95-001` deliberately kept open.
- [x] The CBD-95 package is merged to `main` as `5c90a74`.
- [x] The post-merge correction revisions are reviewed and merged as `7b2bb44` (PR #53) and `29ec698` (PR #54).
- [x] The merge SHAs are recorded in §11 as the immutable approval baseline.
- [ ] Post-merge Confluence page registration, synchronization, parity check, and authorized Jira evidence are completed.

## 14. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.0 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Mapped all CBD-95 deliverables, six CBD-95 and ten CBD-14 criteria; defined stable-set routes; recorded five review findings, limitations, readiness, exact approval evidence, change control, and completion checklist. | Complete draft; audit and Product Owner approval pending |
| 0.1.1 | August 16, 2026 | Codex | Recorded the initial clean Python 3.12.13 audit result, complete gap/gate reverse routes, and exact approved `TH/AB/RK/SR/VT` reverse-route checks: 2,931 checks, zero failures, zero warnings. | Complete draft; Product Owner approval pending |
| 0.1.2 | August 16, 2026 | Codex | Recorded the Product Owner's decision to retain content-free push, SMS, and routine email; narrowed `RV-95-001` to source correction, preserved downstream channel gates, and reran the audit: 2,950 checks, zero failures, zero warnings. | Decision approved; source corrections and package approval pending |
| 0.1.3 | August 16, 2026 | Codex | Recorded the Product Owner's independent-second-approver requirement for exceptional access/recovery; preserved implementation, denial-test, recovery-exercise, and evidence gates; and reran the audit: 2,973 checks, zero failures, zero warnings. | Decision approved; implementation and package approval pending |
| 0.1.4 | August 16, 2026 | Codex | Recorded shared comments as required Private-MVP scope, elevated the platform-safety gate to a Private-MVP launch blocker without changing moderation authority or deciding `RI-93-008`, and reran the audit: 2,992 checks, zero failures, zero warnings. | Decision approved; safety evidence and package approval pending |
| 0.1.5 | August 16, 2026 | Codex | Recorded `RI-93-001`: retain the current five-role Private-MVP model, keep Viewer as the narrow read-only option, add no supportive-contributor or scoped/configurable Partner variant, and rerun the audit: 3,013 checks, zero failures, zero warnings. | Decision approved; remaining inputs and package approval pending |
| 0.1.6 | August 16, 2026 | Codex | Recorded `RI-93-002`: retain owner-managed access for Private MVP, add no selective observer block, require accurate exit/unlink and prior-copy limitations, and rerun the audit: 3,030 checks, zero failures, zero warnings. | Decision approved; remaining inputs and package approval pending |
| 0.1.7 | August 16, 2026 | Codex | Recorded `RI-93-003`: make protected reductions immediate and actor-irreversible, require fresh consent for restoration, preserve invalidation and audit evidence, and rerun the audit: 3,045 checks, zero failures, zero warnings. | Decision approved; remaining inputs and package approval pending |
| 0.1.8 | August 16, 2026 | Codex | Recorded `RI-93-004`: removal immediately ends access, creates no removal-time export entitlement/package for Private MVP, and reran the audit: 3,059 checks, zero failures, zero warnings. | Decision approved; remaining inputs and package approval pending |
| 0.1.9 | August 16, 2026 | Codex | Recorded `RI-93-006`: retain Primary-only deletion with notice, restore window, and archival export but no member objection, veto, or delay authority; reran the audit: 3,075 checks, zero failures, zero warnings. | Decision approved; remaining inputs and package approval pending |
| 0.1.10 | August 16, 2026 | Codex | Recorded `RI-93-007`: add a separate account-subject, allowlisted administrative record accessible after removal while retained without restoring budget membership or broader disclosure; reran the audit: 3,093 checks, zero failures, zero warnings. | Decision approved; implementation/evidence and package approval pending |
| 0.1.11 | August 16, 2026 | Codex | Recorded `RI-93-008`: add report plus subject-controlled comment-association detachment while preserving authored content/evidence and denying global moderation or financial effect; reran the audit: 3,111 checks, zero failures, zero warnings. | Decision approved; safety implementation/evidence and package approval pending |
| 0.1.12 | August 16, 2026 | Codex | Recorded `RI-93-009`: add concise two-way invitation category/authority/privacy disclosure without exposing actual pre-consent data or an unauthorized member list; reran the audit: 3,128 checks, zero failures, zero warnings. | Decision approved; copy/implementation/evidence and package approval pending |
| 0.1.13 | August 16, 2026 | Codex | Recorded `RI-93-010A`: add a recipient-controlled account-level block against one inviter across all spaces until recipient removal, suppress future invitations without disclosing account/block state, and leave existing memberships unchanged; reran the audit: 3,159 checks, zero failures, zero warnings. | Choice approved; implementation/evidence and remaining decisions pending |
| 0.1.14 | August 16, 2026 | Codex | Recorded `RI-93-010B`: require an explicit decline-once versus decline-and-block choice using the approved inviter block, add no separate persistent-decline state, and never infer blocking from dismissal, interruption, or ambiguity; reran the audit: 3,177 checks, zero failures, zero warnings. | Choice approved; implementation/evidence and remaining decisions pending |
| 0.1.15 | August 16, 2026 | Codex | Recorded `RI-93-010C`: add a pair-scoped cross-space limiter for each authenticated inviter–recipient pair, using privacy-preserving keys, uniform outcomes, no recipient-wide exhaustion, and no interference with recipient actions or unrelated inviters; reran the audit: 3,199 checks, zero failures, zero warnings. | Decision complete; parameter approval, implementation/evidence, and remaining decisions pending |
| 0.1.16 | August 16, 2026 | Codex | Recorded `RI-93-011`: allow an optional separately verified notification-only destination during acceptance without granting identity, login, recovery, primary-contact, account, invitation-proof, or acceptance authority or exposing it to the inviter; reran the audit: 3,239 checks, zero failures, zero warnings. | Decision approved; implementation/evidence and remaining decisions pending |
| 0.1.17 | August 16, 2026 | Codex | Recorded `RI-93-012`: route subject lifecycle notices to mandatory authenticated in-app plus only the verified private safety channel, with no external fallback or authority escalation and focused CBD-72/CBD-91 synchronization required; reran the audit: 3,282 checks, zero failures, zero warnings. | Decision approved; source synchronization, implementation/evidence, and remaining decisions pending |
| 0.1.18 | August 16, 2026 | Codex | Recorded `RI-93-013`: add fail-closed compromised-channel retirement with immediate delivery/authority quarantine, independently verified replacement before atomic removal, in-app-only safety fallback, and no compromised-channel or support approval path; reran the audit: 3,324 checks, zero failures, zero warnings. | Decision approved; identity/recovery design, implementation/evidence, and remaining decisions pending |
| 0.1.19 | August 16, 2026 | Codex | Recorded `RI-93-014`: retain current informational-alert eligibility, including active Accountability Partners, while prohibiting blame/actor attribution and preserving provisional, non-actionable, self-clearing semantics; residual observation risk remains explicit and unaccepted; reran the audit: 3,366 checks, zero failures, zero warnings. | Decision approved; copy/implementation/evidence, risk disposition, and remaining decisions pending |
| 0.1.20 | August 16, 2026 | Codex | Recorded `RI-93-015`: adopt tiered transparent scope/lifecycle notice semantics—safe before/after consequence and next-step detail in authenticated in-app, channel-ceiling external copies, and no hidden data, private reasons, precise inactivity history, or unsupported remedy claims; reran the audit: 3,409 checks, zero failures, zero warnings. | Decision approved; exact copy/evidence and remaining decisions pending |
| 0.1.21 | August 16, 2026 | Codex | Recorded `RI-93-016`: adopt a normative cross-cutting semantic standard for consent, channel control, recipient-controlled copies, third-party circumstances, authority/accountability, and pre-action irreversible consequences; reran the audit: 3,462 checks, zero failures, zero warnings. | Decision approved; exact copy/evidence and remaining decisions pending |
| 0.1.22 | August 16, 2026 | Codex | Recorded `RI-93-017`: for Private MVP, pair the hard support-transfer refusal with a bounded honest response and only applicable authorized routes, without investigation, hidden-state disclosure, member contact, mediation, or recovery promises; reran the audit: 3,515 checks, zero failures, zero warnings. | Decision approved; exact copy/operations evidence and remaining decisions pending |
| 0.1.23 | August 16, 2026 | Codex | Recorded `RI-93-018`: after terminal personal-account deletion, delete private account/profile/connection data, pseudonymize necessary retained shared history as “Former member,” restrict and time-bound internal linkage, preserve only purpose-bound evidence/deletion records, and make no recipient-copy or immediate-backup erasure claim; reran the audit: 3,571 checks, zero failures, zero warnings. | Decision approved; schedules/design/evidence and final decision pending |
| 0.1.24 | August 16, 2026 | Codex | Recorded `RI-93-019`: retain immediate owner/co-owner joint-projection dissolution with safe pre-notice where feasible and mandatory immediate post-notice, no contributor objection/veto/delay/acknowledgement position, unchanged contributor self-source removal, and explicit unaccepted forced-itemization risk; reran the audit: 3,626 checks, zero failures, zero warnings. | All `RI-93-*` decisions complete; implementation/evidence and package approval pending |
| 0.1.25 | August 16, 2026 | Codex | Rebaselined to current `origin/main` `43e87be`; verified all eleven frozen authority blobs are unchanged; corrected AC06 to acknowledge the existing audit evidence; corrected the approval template to distinguish recorded Product Owner decisions from open implementation/evidence/risk/release work; and reran the audit: 3,642 checks, zero failures, zero warnings. | Review findings corrected; Product Owner approval pending |
| 0.1.26 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Post-merge package review. Recorded the `5c90a74` merge and re-anchored integrity to blob rather than commit identity, which unblocked the audit; repaired the porcelain path-parsing defect; enforced per-row follow-up routes, CBD-95 citation resolution, and the transitive reverse-route leg for all twelve routed families; recorded the findings and dispositions in §8.1; and reran the audit: 3,820 checks, zero failures, zero warnings, with each new check confirmed to fail on a deliberate violation. No acceptance criterion outcome, product decision, residual, readiness recommendation, or release effect changed. | Correction applied; Product Owner approval still pending |
| 0.1.27 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Live Jira audit. Re-verified the reconciliation target against live state: CBD-12 carries exactly 36 acceptance criteria, CBD-14 exactly 10, and all 36 `RC-95-*` index mappings hold; `RV-95-001–005` are each confirmed against live field text. Added `RV-95-006–008` for the nine inverted Blocks links, the CBD-12 contradiction of approved CBD-71 v1.1, and the scope errors in the existing finding set. Corrected §2.2 and the CBD-76 readiness rows, which previously asserted a live link direction that Jira does not record. Widened the audit's expected `RV-95-*` set to eight and reran: 3,891 checks, zero failures, zero warnings, guard confirmed firing. No reconciliation outcome, product decision, or residual changed. | Findings recorded; Jira corrections prepared but unauthorized; approval pending |
| 0.1.28 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the applied state after the authorized Jira corrections. Seven findings are fully applied and `RV-95-006` is partly applied: the five CBD-76 links were replaced in the correct direction, restoring Jira enforcement of CBD-76's downstream position, while four inverted links elsewhere remain open. Corrected §2.2, the CBD-76 readiness rows, the approval-evidence Jira row, and the completion checklist. `RC-95-021` stays **Blocked** by design, with the reasoning recorded in the matrix. No acceptance-criterion outcome, product decision, residual, or release effect changed. | Corrections applied; approval and `FU-95-001–005` closure pending |
| 1.0 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Approved release. The Product Owner approved the exact document versions, closing `RG-94-016` and marking CBD-95-AC06 met. `RC-95-021` was reclassified to Pass with mitigation, leaving no blocked CBD-12 criterion. `FU-95-002–005` closed; `FU-95-001` kept open for its implementation and copy work. Readiness updated: CBD-72's CBD-14 gate satisfied, CBD-76 no longer withheld, CBD-14 documentation criteria satisfied. Private MVP and public launch are unchanged and remain not ready. §11 records that the approval binds to v1.0 content rather than a merge SHA, because the branch was uncommitted at approval time. | **Approved v1.0** |
| 1.0.1 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Factual correction to `RV-95-006` and the §13 checklist. The v1.0 text stated that link `10013` survived and that `10014`, `10015`, and `10016` had been deleted; live Jira showed the inverse. The error came from a JQL response that returned five of seven requested issues with `hasNextPage` true, so CBD-80 and CBD-81 were paginated off and their links were never read — the same truncated-query fault that earlier under-reported the batch as nine. All twelve identified inverted links are now removed, verified against CBD-77 and CBD-80 directly. No acceptance-criterion outcome, product decision, residual, readiness recommendation, or release effect changed. Because the v1.0 approval bound to content this revision amends, the Product Owner reviewed and confirmed the corrected record on August 16, 2026. | **Approved v1.0.1** — corrected record confirmed by Product Owner |
| 1.0.2 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the CBD-93 v1.1.1 editorial header correction against `RV-95-005`, closing the last item that follow-up carried. CBD-93 is a frozen authority source, so the correction changed its blob and the manifest §2 record and audit frozen-blob constant were re-frozen in the same change. Editorial only: no scenario, safeguard, evidence gap, residual, or `RI-93-*` decision moved, and no acceptance-criterion outcome, reconciliation outcome, readiness recommendation, or release effect changed. | Correction to approved v1.0.1; outcomes unchanged |
| 1.0.3 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the merge SHAs in §11, supplying the immutable baseline the v1.0 approval could not name because the branch was uncommitted at approval time. The package landed as `7b2bb44` (PR #53) and `29ec698` (PR #54). Checked off the corresponding §13 items. Evidence only: no acceptance-criterion outcome, product decision, residual, readiness recommendation, or release effect changed. | Approval evidence completed; outcomes unchanged |
