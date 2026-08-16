# CBD-92 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft — structural and decision review complete; Product Owner approval pending** |
| Document version | 0.1.17 |
| Owner | Alexander Wohlford |
| Jira | [CBD-92](https://cobudget.atlassian.net/browse/CBD-92) |
| Primary evidence | `docs/cbd-92-system-flow-technical-threat-model.md` v0.1.17 |
| Approved input | [CBD-91 — Private MVP Data Inventory](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/8781826) v1.0 |
| Last updated | August 16, 2026 |

## 1. Purpose and completion rule

This record proves whether the CBD-92 deliverables and acceptance criteria are
covered by explicit, reviewable evidence. It does not approve the threat model,
close its evidence gaps, or claim that an implementation enforces the modeled
boundaries.

CBD-92 is structurally complete only when:

1. every CBD-91 `DF-91-*` flow crosses only named `TB-92-*` boundaries;
2. every `EP-92-*` entry point and privileged `ACT-92-*` actor maps to applicable
   `TH-92-*` threats;
3. every required path named by Jira has diagrams, boundaries, threats, assets,
   and governing product decisions;
4. missing architecture/provider evidence is recorded without inventing an
   answer; and
5. review evidence, limitations, and unresolved findings are explicit.

Product Owner approval is the CBD-92 document-approval gate. Independent
security review is a separate mandatory prerequisite to public product launch,
not to CBD-92 approval. CBD-94 mitigation and residual-risk work is downstream
and is not a reason to mark a missing CBD-92 threat or boundary complete.

## 2. Deliverable traceability

| CBD-92 deliverable | Evidence | Status |
| --- | --- | --- |
| Context diagram | Technical model §4.1 | Drafted |
| Data-flow diagrams | Technical model §§4.2–4.4 | Drafted; four views cover DF-91-001–013 |
| Actor, system, and entry-point inventory | Technical model §3 | Drafted; 15 actors, 16 systems, 15 entry points |
| Closed-list background service-authority purpose register | Technical model §2.4 | Product Owner-approved decision; eight stable `SA-92-*` purposes with effects and stop rules |
| Financial-profile and budget-link stewardship contract | Technical model §2.5 | Product Owner-approved conceptual decisions and derived lifecycle reconciliation; thirteen stable `CA-92-*` rules include one profile per account subject for Private MVP, logical cardinalities, profile-local identities, budget-scoped joint projections, link/association controls, and distinct space-membership versus permanent-subject-loss effects; physical schema and remaining evidence stay in RF-92-006 |
| Online-only Private MVP client contract | Technical model §2.6 | Product Owner-approved decision; seven stable `CL-92-*` rules permit only a static offline shell and transient active-tab display, prohibit persisted customer-data/offline reads/writes/queues, and require live reauthorization on reconnect |
| Personal-account deletion and restoration contract | Technical model §2.7 | Product Owner-approved decision; eight stable `PA-92-*` rules define eligibility, immediate authority shutdown, 30-day grace, non-authority-restoring recovery, terminal transition, race/recreation controls and accurate completion claims |
| Content-free Private MVP push/SMS contract | Technical model §2.8 | Product Owner-approved decision; six stable `NT-92-*` rules define the fixed generic body, authenticated destination, minimum provider schema, recipient/send-time checks, callback limits and mirrored/carrier custody boundary |
| Purpose-tiered minimal Private MVP email contract | Technical model §2.9 | Product Owner-approved decision; seven stable `EM-92-*` rules define content-free routine email, action-class-only invitations, action class/deadline for lifecycle/security, non-authoritative locators, provider allowlists, stale suppression, no tracking and inbox/provider custody limits |
| No routine staff-content and dual-controlled exceptional-access contract | Technical model §2.10 | Product Owner-delegated decision; eight stable `OP-92-*` rules limit routine support to content-free diagnostics and exceptional access to incident/recovery purposes under dual approval, JIT scope, mediated execution, separated custody, evidence, review and safe customer notice |
| Product-analytics-disabled Private MVP contract | Technical model §2.11 | Product Owner-delegated decision; seven stable `AN-92-*` rules prohibit product analytics/behavioral capture, allow only content-free reliability telemetry and separately governed S3 security evidence, permit non-drillable coarse aggregates, and require new approval for future analytics |
| Trust-boundary register | Technical model §5 | Drafted; 17 stable boundaries |
| Stable-ID technical threat register | Technical model §7 | Drafted; 45 STRIDE threats |
| Initial technical-risk triage | Technical model §§2.3 and 7 | Drafted; exposure, impact ceiling, and evidence confidence only; CBD-94 owns formal likelihood and risk disposition |
| Evidence-gap disposition | Technical model §9.1 | Drafted; EG-91-001–024 consumed without invented closure |
| Architecture/provider findings | Technical model §9.2 | Drafted as RF-92-001–010 |
| CBD-93/CBD-94 handoff | Technical model §10 | Drafted |
| Acceptance and review evidence | This document §§3–10 | Drafted; review pending |

## 3. Acceptance-criteria traceability

The IDs below label the five acceptance-criterion paragraphs in CBD-92 Jira in
their published order; they do not create new Jira fields.

| Requirement | Authoritative requirement | Evidence | Assessment |
| --- | --- | --- | --- |
| CBD-92-AC01 | Every inventory flow crosses only documented boundaries. | Technical model §§4–6; this record §4 | Structurally met: all 13 flows map to named boundaries and entry points. Boundary enforcement is unverified. |
| CBD-92-AC02 | Every entry point and privileged actor has applicable threats. | Technical model §§3.1, 3.3, 7, 8; this record §§5–6 | Structurally met: all 15 entry points and 10 privileged actor classes map to threats. Independent review may add threats. |
| CBD-92-AC03 | Cross-budget, invitation, session, revocation, queue, notification, export, deletion, audit, and provider paths are covered. | Technical model §§4–7; this record §7 | Structurally met for all ten named paths. Mitigation/verification belongs to CBD-94. |
| CBD-92-AC04 | Threats cite affected data/assets and approved product decisions. | Technical model §7 and §11; this record §8 | Structurally met: each threat identifies DI assets and a governing approved input or explicitly identifies an unresolved decision. |
| CBD-92-AC05 | Missing architecture/provider evidence is explicitly scoped. | Technical model §§1, 9, 12; this record §9 | Met for draft: EG-91-001–024 and RF-92-001–010 state what is missing and the blocking effect. |

## 4. CBD-91 flow-to-boundary verification

| Flow | Required purpose/path | Diagram evidence | Named boundaries | Entry point(s) | Check |
| --- | --- | --- | --- | --- | --- |
| DF-91-001 | Authentication, recovery, session and protected assurance | §§4.1–4.2 | TB-92-001–004, 017 | EP-92-001, 015 | Covered |
| DF-91-002 | Invitation create/deliver/accept/expire/revoke | §§4.1–4.2 | TB-92-001–003, 006, 008, 012 | EP-92-002, 007, 010 | Covered |
| DF-91-003 | Authorized collaborative reads/mutations | §§4.1–4.2 | TB-92-001–007, 014 | EP-92-003–004, 008, 012 | Covered |
| DF-91-004 | Provider consent/link/callback/secret handling | §§4.1, 4.3 | TB-92-001–004, 010–011, 017 | EP-92-005, 015 | Covered conceptually; provider evidence open |
| DF-91-005 | Webhook, sync, normalization and domain events | §§4.1, 4.3 | TB-92-002, 005–011, 014, 017 | EP-92-006–008, 015 | Covered conceptually; provider, queue and physical account-schema evidence open |
| DF-91-006 | Scheduled calculation and reconciliation | §§4.1, 4.3 | TB-92-005–009, 011, 014 | EP-92-007–008 | Covered conceptually; concrete policy and queue contracts open |
| DF-91-007 | Alert evaluation and recipient instances | §§4.1, 4.4 | TB-92-005, 007–009, 012 | EP-92-007–009 | Covered conceptually; the approved fixed built-in catalog requires downstream consolidation and verification under EG-91-015 |
| DF-91-008 | External/in-app notification rendering and delivery | §§4.1, 4.4 | TB-92-001–002, 008–009, 012, 014 | EP-92-009–010 | Covered conceptually; channel/provider evidence open |
| DF-91-009 | Search/report/cache/index reads | §§4.1–4.2 | TB-92-001–007 | EP-92-003, 008 | Covered conceptually; technology/invalidation open |
| DF-91-010 | Export generation, storage and download | §§4.1, 4.4 | TB-92-001–005, 008–009, 013–014, 017 | EP-92-007, 011–012, 015 | Covered conceptually; format/storage contract open |
| DF-91-011 | Telemetry, diagnostics, analytics, support and operations | §§2.10–2.11, 4.1, 4.4 | TB-92-002, 005, 014, 017 | EP-92-012, 015 | Covered: routine staff content access and product analytics are prohibited; concrete telemetry/exception tooling remains open |
| DF-91-012 | Replica, backup, key recovery and restoration | §§4.1, 4.4 | TB-92-014–017 | EP-92-013, 015 | Covered conceptually; concrete topology/control evidence open |
| DF-91-013 | Cross-surface lifecycle disposition | §§4.1, 4.4 | TB-92-001, 005–017 | EP-92-007–015 as applicable | Covered conceptually; disposition/retention/completion evidence open |

No flow is authorized to bypass a boundary because an implementation collapses
two logical systems into one deployment unit. Conversely, splitting a modeled
system creates new concrete boundaries that must be mapped before release.

## 5. Entry-point coverage verification

| Entry point | Applicable threats | STRIDE categories present | Check |
| --- | --- | --- | --- |
| EP-92-001 Authentication/session | TH-92-001–004, 034 | S, T, I, D, E | Covered; repudiation evidence is included through consequential auth/security audit under TH-92-028 |
| EP-92-002 Invitation | TH-92-005–007, 015, 021–023, 034 | S, T, R, I, D, E | Covered |
| EP-92-003 Budget API | TH-92-008–013, 017–018, 028–029, 034 | T, R, I, D, E | Covered; spoofing is inherited from EP-92-001 and never re-proven by role alone |
| EP-92-004 Ownership/lifecycle | TH-92-004, 008, 011–013, 028, 033, 044–045 | T, R, I, D, E | Covered |
| EP-92-005 Provider link/callback | TH-92-004, 014, 016, 034–037 | S, T, I, D, E | Covered; repudiation handled by TH-92-028 |
| EP-92-006 Provider webhook | TH-92-015, 034–038 | S, T, I, D, E | Covered; repudiation handled by durable event/audit threat TH-92-028 |
| EP-92-007 Queue/scheduler | TH-92-012, 015, 021, 023, 026, 028, 033, 038–040, 044 | S, T, R, I, D, E | Covered |
| EP-92-008 Derived data | TH-92-009–013, 017–020, 028, 039–040 | T, R, I, D, E | Covered |
| EP-92-009 Alerts | TH-92-011–012, 015, 020–023, 040–041, 045 | S, T, I, D, E | Covered; repudiation handled by TH-92-028 |
| EP-92-010 Delivery channel | TH-92-021–023, 034, 041 | S, T, I, D | Covered; provider authority escalation is bounded by TB-92-012 |
| EP-92-011 Export | TH-92-011–012, 024–026, 034 | S, T, R, I, D, E | Covered |
| EP-92-012 Operations/audit query | TH-92-016, 027–030, 042 | T, R, I, E | Covered; availability of observability remains a concrete architecture concern under RF-92-002 |
| EP-92-013 Backup/restore | TH-92-028, 031–033, 043–044 | T, R, I, D, E | Covered |
| EP-92-014 Lifecycle orchestration | TH-92-012, 015, 021, 026, 028, 031–033, 044–045 | S, T, R, I, D, E | Covered |
| EP-92-015 Secret/key access | TH-92-016, 030–031, 043 | T, R, I, E | Covered; availability/rotation mechanics remain RF-92-002/007 |

## 6. Privileged-actor coverage verification

| Privileged actor | Threat coverage | Fixed authority boundary preserved | Check |
| --- | --- | --- | --- |
| Primary Owner (ACT-92-003) | TH-92-008–013, 024–026, 044–045 | Primary-only powers remain one-space, action-bound, current and unable to reach another person's secret/private authority. | Covered |
| Co-owner (ACT-92-004) | TH-92-008–013, 020, 024, 044–045 | Shared administration does not imply Primary ownership, another person's connection, or another recipient's personal state. | Covered |
| Collaborator (ACT-92-005) | TH-92-008–014, 019, 024, 036–037, 045 | Approved shared financial/self-authorized connection actions do not broaden into ownership or cross-authorizer authority. | Covered |
| Identity provider (ACT-92-009) | TH-92-001–004, 016, 034 | Identity/assurance result never substitutes for product authorization. | Covered conceptually; provider evidence open |
| Financial provider (ACT-92-010) | TH-92-014–016, 019, 035–038 | Provider data/events cannot create application membership or cross-space authority. | Covered conceptually; provider evidence open |
| Notification provider (ACT-92-011) | TH-92-021–023, 041 | Destination or delivery token cannot become authentication/authorization. | Covered conceptually; provider evidence open |
| Application service (ACT-92-012) | TH-92-008–018, 024–030 | Workload identity remains minimum-purpose and cannot bypass policy/audit/secret boundaries. | Covered conceptually; topology open |
| Background service (ACT-92-013) | TH-92-012, 015–023, 026, 028, 031–033, 038–045 | Work proves user-delegated authority or exactly one `SA-92-*` purpose, remains within its allowed effects, and performs purpose-specific execution-time checks. | Conceptual authority contract approved; concrete policy/queue enforcement open |
| Support/operations (ACT-92-014) | TH-92-027–030, 042 | `OP-92-001/002` grants no routine staff-content access and limits support to content-free diagnostics. | Covered; concrete support/tool evidence open |
| Security/recovery operator (ACT-92-015) | TH-92-016, 027–032, 043 | Data, key, restore and evidence duties are separated and cannot bypass current deletion/authorization. | Covered conceptually; recovery design open |

Viewer, Accountability Partner, invite/notification/export recipient, and an
ordinary authenticated account are threat-relevant but are not privileged
system actors. Their least-authority boundaries are nevertheless covered by
TH-92-005–13, 20–26, 29, 33, 41 and 45.

## 7. Required-path coverage

| Required path | Diagrams/flows | Boundaries | Principal threats | Assessment |
| --- | --- | --- | --- | --- |
| Cross-budget | DF-91-003–010/013 | TB-92-004–007, 009–011, 013–014, 016 | TH-92-009–012, 017–020, 024, 027, 029, 036–037 | Explicit; `CA-92-*` establishes profile stewardship and default-deny links, while concrete schema and remaining subdecisions stay in RF-92-006 |
| Invitation | DF-91-002 | TB-92-001–004, 006, 008, 012 | TH-92-005–007, 015, 021–023, 034 | Explicit |
| Session | DF-91-001/003/013 | TB-92-001–004 | TH-92-001–004, 011, 033–034 | Explicit; IdP details open |
| Revocation | DF-91-001–003/007–010/013 | TB-92-001, 003–009, 012–013, 016 | TH-92-002, 006, 011–012, 015, 020–026, 032–033, 037, 044 | Explicit |
| Queue/jobs | DF-91-002/005–008/010/013 | TB-92-008–009 | TH-92-012, 015, 021, 023, 026, 033, 038–040, 044 | Explicit; contract remains RF-92-003 |
| Notification | DF-91-002/007–008/013 | TB-92-001–002, 008–009, 012, 014, 016 | TH-92-020–023, 040–041, 045 | Explicit; channel/provider details open |
| Export | DF-91-010/013 | TB-92-001–005, 008–009, 013–014, 016–017 | TH-92-011–012, 016, 024–026, 033–034 | Explicit; schema/storage open |
| Deletion/lifecycle | DF-91-012–013 | TB-92-001, 007–017 | TH-92-028, 031–033, 043–045 | Explicit; retention/completion open |
| Audit | Every consequential flow; DF-91-011 | TB-92-006–016 | TH-92-016, 026–030, 042–044 | Explicit; schema/integrity open |
| Provider | DF-91-001/004–005/008/012 | TB-92-003, 010–012, 015, 017 | TH-92-001, 014–016, 021–023, 031, 035–038, 041 | Explicit; provider evidence open |

## 8. Threat-to-asset and decision citation audit

Each threat row in technical model §7 contains:

* at least one `DF-91-*` flow and `TB-92-*` boundary;
* affected `DI-91-*` assets or an explicit statement that all reachable classes
  are affected;
* an approved governing source such as CBD-72, CBD-67–71, or a CBD-91 approved
  rule/interim constraint; and
* `EG-91-*`, `CR-91-*`, or downstream work when evidence is missing.

| Threat family | Threat IDs | Principal assets | Governing approved decisions |
| --- | --- | --- | --- |
| Identity/session/client | TH-92-001–004, 033–034 | DI-91-001–003, 047–053 plus client copies | CBD-72 §2.1/§6.1; CBD-91 rules 3–5/9–10 |
| Invitation/membership | TH-92-005–007 | DI-91-001, 005–007, 039, 054, 065 | CBD-72 membership/consent/audit decisions; CBD-91 rules 3/5 |
| Authorization/cross-space/derived data | TH-92-008–013, 017–018, 036 | Scoped DI-91-004–040, 046, 056, 058, 060, 065, 070, 075–076 | CBD-72 §§3–8 and scenarios; CBD-91 rules 2–5 |
| Provider/financial processing | TH-92-014–016, 019, 035–039 | DI-91-007, 010–025, 031–033, 046, 051, 055–058, 066–069 | CBD-67–72 provenance/connection decisions; CBD-91 rules 1–2/6 |
| Alert/notification/channel | TH-92-020–023, 040–041, 045 | DI-91-005, 009, 027–031, 039, 041, 049, 054, 059, 073, 076 | CBD-72 §5.4/§6.3 and ALERT/LIFE scenarios; CBD-91 rules 3–5/10 |
| Export | TH-92-024–026 | DI-91-034–039, 050, 052, 060, 064 | CBD-72 §§5.7–5.8 and EXP/LIFE scenarios; CBD-91 rule 7 |
| Audit/operations/analytics | TH-92-027–030, 042 | DI-91-038, 041–043, 053, 059–063, 071 | CBD-72 §9/AUD scenarios; CBD-91 rules 1–3/8–10 |
| Backup/restore/lifecycle | TH-92-031–033, 043–045 | Applicable DI-91-001–076 and exclusions | CBD-72 §§6.3–6.5/LIFE scenarios; CBD-91 §5.1/rules 5/9–10 |

## 9. Missing-evidence scope audit

| Evidence area | Recorded gaps/findings | What CBD-92 asserts | What CBD-92 does not assert |
| --- | --- | --- | --- |
| Authorization/service authority | EG-91-007; RF-92-001 | User-delegated binding plus the eight-purpose closed `SA-92-*` list, logical policy boundary, version/recheck and stale/confused-deputy threats | Policy engine, typed/signed decision API, purpose/effect mechanism, propagation or invalidation SLO selected |
| Hosting/topology/keys | EG-91-008; RF-92-002 | Logical network, workload, store and secret separation | Vendor, region, subprocessor, encryption/KMS or workload-identity control approved |
| Queue/jobs | EG-91-011; RF-92-003 | Minimal typed payload, explicit authority/version, replay/idempotency/recheck requirements | Queue product, payload schema, retry/DLQ duration, purge or inspection control selected |
| Derived data | EG-91-016; RF-92-004 | Auth-partitioned keys, complete-input and timing/count threat boundary | Search/cache/report technology, TTL, invalidation SLO or rebuild design selected |
| Audit/evidence/telemetry | EG-91-010/018–019; RF-92-005 | `AN-92-*` disables product analytics and separates content-free reliability telemetry from S3 security evidence and customer audit | Concrete audit/security/telemetry schemas, integrity storage, access matrix, retention/deletion and negative content-capture tests approved |
| Canonical account | EG-91-001–003/012/021; CR-91-008; RF-92-006/010 | `CA-92-*` establishes the account model and space-loss/subject-loss routing; `PA-92-*` establishes personal-account deletion request, immediate authority/provider shutdown, 30-day grace and restoration without authority resurrection | Physical schema, provider/identity evidence, final per-class disposition, legal exceptions, processor/backup completion and executable routing/lifecycle contracts resolved |
| Providers | EG-91-004–006, 024; RF-92-007 | Provider-independent identity/financial/notification boundaries and threats | Provider-specific control, field, event, retention, deletion or compromise evidence approved |
| Privileged operations | EG-91-009/020; RF-92-008 | `OP-92-*` prohibits routine staff-content access and permits only dual-controlled JIT incident/recovery work with separated custody, evidence, review and notice | Concrete identities, mediated tools, organizational duty separation, notice-delay workflow and recovery rehearsal verified |
| Client/channels | EG-91-006/023–024; RF-92-009 | `CL-92-*` approves online-only customer-data behavior; `NT-92-*` approves content-free push/SMS; `EM-92-*` approves purpose-tiered minimal email, non-authoritative locators, provider allowlists, stale suppression, no tracking and recipient/provider custody boundaries | Concrete client/channel provider schemas/tests, destination/token/locator/opt-out lifecycle, localized templates, provider retention/deletion and final custody language verified |
| Lifecycle completion | EG-91-001–003/020/022; RF-92-010 | `PA-92-*` and CBD-72 define personal-account and budget-space lifecycle states; every controlled surface must receive class-specific disposition and completion evidence, while claims distinguish active-access shutdown from terminal processor/backup expiry | Final durations/legal basis/exceptions, provider duties, deletion ledger, processor/backup completion and restore reconciliation approved |

The technical model also carries EG-91-010, 012–015, 017, 022 and their stated
handoffs. No open gap is presented as an approved architecture decision.

## 10. Review findings, limitations, and approval gates

### 10.1 Current review findings

| ID | Finding | Status |
| --- | --- | --- |
| RV-92-001 | All 13 approved CBD-91 flows have named trust-boundary crossings. | Structurally complete |
| RV-92-002 | All 15 modeled entry points and 10 privileged actor classes have threat coverage. | Structurally complete |
| RV-92-003 | All ten Jira-named required paths have diagram, boundary and threat evidence. | Structurally complete |
| RV-92-004 | All 45 threats cite assets and governing inputs; missing implementation or provider evidence is cited as a gate rather than treated as authority. | Structurally complete |
| RV-92-005 | EG-91-001–024 are consumed and RF-92-001–010 define the missing architecture, provider, schema, legal or verification evidence and blocking effect. None requires another CBD-92 product choice. | Structurally and decision complete |
| RV-92-005A | The background authority ambiguity is resolved conceptually by `SA-92-001–008`; implementation still requires the RF-92-001 policy and RF-92-003 queue contracts. | Product Owner-approved decision; implementation gate remains open |
| RV-92-005B | The threat register uses technical exposure, impact ceiling, evidence confidence, and initial severity without asserting probability; formal likelihood and risk disposition remain CBD-94 work. | Product Owner-approved methodology decision; downstream risk gate remains open |
| RV-92-005C | CBD-91 §7.1 option 1 is established through `CA-92-001–007`: the financial profile is authoritative, budget exposure is explicit/default-deny, connections remain independent, and routing remains link-bound. RF-92-006 now contains only the concrete model and remaining subdecisions. | Product Owner-approved stewardship decision; account/sync implementation gate remains open |
| RV-92-005D | `CA-92-003/008` keep canonical identities profile-local and permit joint-account association only as a reversible, link-bound projection inside one budget space; no application-wide cross-person account graph exists. | Product Owner-approved canonicalization-scope decision; concrete association evidence/tests remain open |
| RV-92-005E | `CA-92-009` permits an active Primary Owner, Co-owner, or Collaborator to link only their own profile account without separate owner approval; the contributor or a current owner may unlink, but neither path transfers private connection authority. | Product Owner-approved link-authority decision; concrete transactional and negative tests remain open |
| RV-92-005F | `CA-92-010` requires unanimous, version-bound confirmation from every contributing profile subject when reliable provider identity does not establish the proposed joint-account projection; owners cannot substitute and stale or partial proposals leave accounts separate. | Product Owner-approved joint-association confirmation decision; concrete confirmation tests remain open |
| RV-92-005G | `CA-92-011` permits a contributor to withdraw their own source or a current owner to dissolve a budget-scoped joint projection without unlinking accounts or touching private connections; atomic recomputation and a version-bound non-association decision prevent stale re-merging. | Product Owner-approved projection correction/dissociation decision; concrete tests remain open |
| RV-92-005H | `CA-92-012` establishes exactly one active financial profile per CoBudget account subject for Private MVP and defines the logical connection/account/link/projection cardinalities without inferring legal-person identity or authorizing profile transfer/merge/sharing. | Product Owner-approved Private MVP cardinality decision; physical schema and tests remain open |
| RV-92-005I | `CA-92-013` reconciles approved lifecycle inputs: membership loss revokes only the affected space links, while personal-account deletion terminates the profile's connections; neither path transfers authority and permitted history becomes orphaned/not synchronizing. | Derived reconciliation complete; concrete lifecycle tests remain open |
| RV-92-005J | `CL-92-001–007` establish online-only customer-data access and mutation for Private MVP: the offline PWA is a static shell, customer data is not persisted for offline reuse, mutations are never queued, and reconnect crosses a fresh authorization/version boundary. | Product Owner-approved offline decision; concrete client route/storage and negative tests remain open |
| RV-92-005K | `PA-92-001–008` establish a 30-day personal-account deletion grace with immediate authority/provider shutdown and identity-verified restoration that never resurrects memberships, links, connections, sessions, exports, deliveries or queued work. | Product Owner-approved personal-account lifecycle decision; final disposition/legal/provider/completion evidence remains open |
| RV-92-005L | `NT-92-001–006` require every Private MVP push/SMS body to be content-free and prevent destinations, deep links, provider fields or callbacks from becoming authority or exposing event/resource context. | Product Owner-approved push/SMS decision; concrete provider schema/tests remain open |
| RV-92-005M | `EM-92-001–007` apply a purpose-tiered email ceiling: routine messages are content-free, invitations identify only the action class, lifecycle/security may add action class/deadline, and no link, provider field, callback or tracking content becomes authority or leaks prohibited context. | Product Owner-approved email decision; concrete provider/localization schemas and tests remain open |
| RV-92-005N | `OP-92-001–008` prohibit routine staff-content access and establish a closed exceptional incident/recovery path with dual approval, JIT least scope, mediated non-impersonating execution, separated recovery custody, safe evidence, independent post-use review and affected-customer notice. | Product Owner-delegated staff-access decision; concrete identity/tool/duty/rehearsal evidence remains open |
| RV-92-005O | `AN-92-001–007` disable Private MVP product analytics and behavioral capture, permit only content-free reliability telemetry and separately governed S3 security evidence, and limit product measurement to coarse non-drillable aggregates without customer-level event retention. | Product Owner-delegated analytics decision; concrete reliability/security schemas remain open and future analytics requires new approval |
| RV-92-006 | Diagram correctness, threat completeness and technical triage have not received independent security review. | Open public-launch gate; does not block CBD-92 approval |
| RV-92-007 | Product Owner has not approved CBD-92 v0.1.17 as a complete document or any downstream mitigation/risk disposition. | Open approval gate |

### 10.2 Limitations

This review is requirements-based. It does not inspect a deployed system,
source-code authorization layer, cloud configuration, provider contract,
database schema, queue payload, audit store, backup, client cache, or operational
access path. “Covered” means documented at the conceptual-threat level, not
implemented, tested, mitigated, accepted, or safe.

### 10.3 CBD-92 approval and public-launch gates

Before CBD-92 can be marked approved:

1. Product Owner reviews the system responsibility split and confirms no
   approved behavior was weakened, broadened, or silently reopened.
2. Every accepted Product Owner review change is incorporated with stable IDs
   preserved; IDs
   are deprecated rather than reused if a threat or boundary is removed.
3. The technical model and this traceability record agree on document version,
   counts, cross-references, limitations, and unresolved findings.

CBD-92 approval authorizes CBD-94 to consume the model. It does not authorize
implementation of a feature whose named evidence gap remains blocking.

Before public product launch, an independent security reviewer must challenge
diagram completeness, boundary placement, STRIDE coverage, technical triage,
evidence-gap scope, and the resulting CBD-94 mitigations and residual-risk
decisions. Accepted findings must be traced back to the affected stable IDs and
incorporated before the public-launch gate can close.

## 11. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.17 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Completed a high-scrutiny cross-document review, classified every remaining RF item as a concrete external-evidence gate rather than an unresolved CBD-92 product choice, corrected stale flow assessments for the approved authority/account/alert decisions, and prepared the package for Product Owner approval. | Decision review complete; complete document remains pending Product Owner approval |
| 0.1.16 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the analytics-disabled Private MVP contract through deliverables, DF-91-011, evidence scope and review findings while preserving concrete reliability/security telemetry schemas and any future analytics as explicit gates. | Product Owner-delegated Private MVP analytics decision; complete document remains draft |
| 0.1.15 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the no-routine-staff-content and dual-controlled exceptional-access contract through deliverables, privileged actors, missing-evidence scope and review findings while preserving concrete identities, tools, organizational separation and recovery rehearsal as release gates. | Product Owner-delegated staff-access decision; complete document remains draft |
| 0.1.14 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the purpose-tiered minimal email contract through deliverables, client/channel evidence and review findings: content-free routine email, action-class-only invitation, lifecycle/security action class/deadline, protected non-authoritative locators, provider allowlists, stale suppression, no tracking and custody limits. | Product Owner-approved Private MVP email decision; complete document remains draft |
| 0.1.13 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the content-free Private MVP push/SMS contract through deliverables, client/channel evidence and review findings: fixed generic body, authenticated destination, minimum provider fields, recipient/send-time checks, callback limits and custody boundaries. | Product Owner-approved Private MVP push/SMS decision; complete document remains draft |
| 0.1.12 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the 30-day personal-account deletion contract through deliverables, canonical-account/lifecycle evidence and review findings: immediate authority/provider shutdown, identity-verified private-data restoration without authority resurrection, terminal per-class disposition, and accurate completion claims. | Product Owner-approved personal-account lifecycle decision; complete document remains draft |
| 0.1.11 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the online-only Private MVP client contract through deliverables and review findings: static offline shell only, transient active-tab display, no persisted customer-data cache/offline read/write queue, live reconnect authorization, and accurate custody boundaries. | Product Owner-approved Private MVP offline decision; complete document remains draft |
| 0.1.10 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the derived reconciliation between space-local membership/link loss and profile-wide permanent account-subject loss through the stewardship deliverable, evidence audit and review findings, while preserving personal-account deletion workflow and concrete tests as downstream work. | Derived reconciliation of approved inputs; complete document remains draft |
| 0.1.9 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the one-profile-per-account-subject Private MVP rule and logical profile/connection/account/link/projection cardinalities through the stewardship deliverable, missing-evidence scope and review findings while preserving physical schema and tests as downstream evidence. | Product Owner-approved Private MVP cardinality decision; complete document remains draft |
| 0.1.8 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced contributor-or-owner projection correction/dissociation through the stewardship deliverable, missing-evidence scope and review findings while preserving account links, private connections, atomic recomputation and stale-evidence suppression. | Product Owner-approved projection correction/dissociation decision; complete document remains draft |
| 0.1.7 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced unanimous explicit joint-association confirmation through the stewardship deliverable, missing-evidence scope and review findings while preserving reliable-provider evidence, correction/dissociation policy and concrete tests as separate gates. | Product Owner-approved joint-association confirmation decision; complete document remains draft |
| 0.1.6 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced contributor-controlled account-link creation and contributor-or-owner termination through the stewardship deliverable, missing-evidence scope and review findings while preserving private connection authority and concrete transactional tests as implementation gates. | Product Owner-approved link-authority decision; complete document remains draft |
| 0.1.5 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the approved profile-local canonical-identity and budget-scoped joint-projection model through deliverables, evidence scope and review findings, removing cross-person canonicalization scope from RF-92-006 while preserving concrete association evidence and tests as implementation gates. | Product Owner-approved canonicalization-scope decision; complete document remains draft |
| 0.1.4 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the approved CBD-91 §7.1 option 1 through deliverables, cross-budget coverage, missing-evidence scope and review findings while preserving cross-person normalization, independent link/unlink authority, concrete schema/provider/lifecycle evidence, and account/sync implementation as open gates. | Product Owner-approved stewardship decision; complete document remains draft |
| 0.1.3 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the approved technical-triage methodology: exposure and impact ceiling replace premature probability estimates, evidence confidence exposes design dependency, and CBD-94 owns formal risk scoring and disposition. | Product Owner-approved methodology decision; complete document remains draft |
| 0.1.2 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Traced the approved closed-list `SA-92-*` background-authority contract through the deliverables, privileged-actor coverage, missing-evidence audit and review findings while preserving concrete policy/queue enforcement as an implementation gate. | Product Owner-approved authority decision; complete document remains draft |
| 0.1.1 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Recorded the Product Owner governance decision that CBD-92 may be approved without independent security review and that such review is mandatory before public product launch; updated status, evidence version, findings, and approval gates. | Product Owner-approved governance decision; complete document remains draft |
| 0.1.0 | August 15, 2026 | Codex with Alexander Wohlford as Product Owner | Created deliverable, acceptance, flow, entry-point, privileged-actor, required-path, asset/decision and missing-evidence traceability for the CBD-92 technical model v0.1.0. | Draft; Product Owner and independent security review required |
