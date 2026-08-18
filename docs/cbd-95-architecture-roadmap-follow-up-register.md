# CBD-95 — Architecture, Roadmap, and Follow-up Register

| Field | Value |
| --- | --- |
| Status | **Approved v1.0.1 — implementation and specialist evidence remain open by design** |
| Document version | 1.0.7 |
| Owner | Alexander Wohlford |
| Jira | [CBD-95](https://cobudget.atlassian.net/browse/CBD-95) |
| Governing package | `docs/cbd-95-threat-model-package-manifest.md` |
| Reconciliation matrix | `docs/cbd-95-cbd-12-reconciliation-matrix.md` |
| Frozen source baseline | `43e87be93a37097bf0e91cd4d3b4c2f98aa4aa15` |
| Merged to `main` | `5c90a74bed2d85dc4f5ed97ca1abb49e7b067515` |
| Last updated | August 18, 2026 |

## 1. Purpose

This register turns the approved CBD-91 through CBD-94 analysis into bounded
implementation, evidence, specialist-review, and source-correction work. It is
not an implementation architecture, a release approval, or authorization to
edit Jira or Confluence. The target issue and proposed scope are recorded so
that work can be reconciled against live Jira immediately before any update.

The register follows four rules:

1. an existing approved product decision is not reopened merely because an
   implementation detail is unresolved;
2. a requirement definition is not treated as passing implementation evidence;
3. a Product Owner input, residual-risk acceptance, or specialist conclusion
   is never silently converted into an engineering choice; and
4. the more restrictive approved rule controls while material sources conflict.

## 2. Status, priority, and closure semantics

| Term | Meaning |
| --- | --- |
| Product decision | Changes or completes product authority, role, visibility, lifecycle, channel, interaction, or release scope. Product Owner action is required. |
| Source correction | Reconciles stale or contradictory issue/document wording with an already approved decision. It does not authorize a product change. |
| Architecture decision | Selects a technical design inside approved product scope. It needs documented threat impact, rollback, and evidence, but not a product decision unless it alters user-visible behavior or authority. |
| Implementation | Builds a control whose normative behavior is already defined. |
| Verification | Produces repeatable evidence against the exact version under review. |
| Specialist evidence | Requires qualified accessibility, privacy, safety/advocacy, legal, research, or independent-security review; internal completion is not a substitute. |
| Release blocker | The affected capability or release cannot proceed until the row closes. It does not necessarily block approval of this documentation package if retained explicitly. |

Priorities are security ordered: **P0** blocks foundational authorization,
identity, isolation, or safe release claims; **P1** blocks a capability or
private-MVP gate; **P2** is required before its named milestone; **P3** is
repository/process hygiene with no current runtime effect.

## 3. Follow-up register

| ID | Pri. | Area and source | Target / current state | Required bounded work | Closure evidence | Effect while open |
| --- | --- | --- | --- | --- | --- | --- |
| FU-95-001 | P0 | External preview conflict; `RV-95-001`, `RV-95-008`, `NT-92-*`, `EM-92-*`, `SR-94-044–054/109/122` | CBD-12 AC21, CBD-74 AC04, CBD-74 AC05, and CBD-58 are inconsistent with later approved CBD-92 ceilings. `NT-92-001` and `EM-92-001` also prohibit the budget-space identification that CBD-12 AC21 and CBD-74 AC04 currently mandate | Apply the August 16, 2026 Product Owner decision: retain content-free push, SMS, and routine email, keep protected detail in-app, preserve purpose-specific email allowlists, and correct the three stale Jira surfaces without reopening CBD-92. | Current live-field diff; recorded Product Owner decision; reconciled acceptance criteria/descriptions; affected traceability and tests updated | Product conflict is resolved and the source corrections were applied August 16, 2026. Implementation must use the content-free ceiling and remains gated by `RG-94-007/012`. Closing this row requires Product Owner acceptance of the applied corrections. |
| FU-95-002 | P0 | Alert authority conflict; `RV-95-002`, `RV-95-008`, CBD-12 AC19, CBD-72 §5.4 | CBD-74 AC02, AC09, and description are stale. AC11 is an audit-event requirement that grants no configuration authority and needs no edit | Correct CBD-74 so users cannot create arbitrary alert rules or pause/disable eligible mandatory in-app alerts and cannot own trigger, threshold, cooldown, or dedup logic. Preserve only approved personal external delivery, quiet-hours/digest where supported, and presentation state. | Live CBD-74 comparison; corrected fields; CBD-11/CBD-71/CBD-72 inheritance trace; negative fixtures | **Closed August 16, 2026 by Product Owner acceptance.** CBD-74 AC02, AC09, and the description state the fixed built-in behavior; AC11 was correctly left alone. |
| FU-95-003 | P1 | Accountability Partner wording; `RV-95-003`, `RI-93-001` | CBD-75 AC02 says “scoped support” | Replace only the ambiguous phrase with the approved comprehensive, fixed-field-boundary, financially read-only definition. Do not create a narrower Partner variant. | Live-field diff and terminology review against CBD-12/CBD-72 | **Closed August 16, 2026 by Product Owner acceptance.** CBD-75 AC02 carries the approved comprehensive, fixed-boundary, financially read-only definition. |
| FU-95-004 | P0 | Stale deferred-product list; `RV-95-004` | CBD-76 AC06 contradicts CBD-76 description and approved CBD-72 | Remove multiple Co-owners, fixed Partner configuration, and exact built-in alert categories/triggers/thresholds from the deferred list. Retain only genuinely deferred items. | Live CBD-76 comparison; corrected AC; Product Owner confirmation that no settled decision was reopened | **Closed August 16, 2026 by Product Owner acceptance.** AC06 defers only genuinely deferred items and states that multiple Co-owners, the fixed Partner boundary, and built-in alert categories/triggers/thresholds are approved and Included. CBD-76 start is no longer withheld by CBD-95. |
| FU-95-005 | P3 | Source version metadata; `RV-95-005`, `RV-95-007`, `RV-95-008`, and CBD-93 stale header text | CBD-73/74/75/76 cite CBD-71 v1.0; the CBD-12 description additionally calls v1.1 pending and `OD-72-06` unsettled; CBD-93 repository header describes an older published copy | Correct each item only in its authorized focused task. Cite CBD-71 v1.1 as authoritative and record `OD-72-06` and `UD-071-01` as closed. Do not create a broad cleanup change or edit Confluence before merge. | Focused repository/Jira diffs, merged versions, then post-merge Confluence comparison | **Closed August 16, 2026 by Product Owner acceptance.** CBD-73–76 cite v1.1, and the CBD-12 preamble and DEPENDENCIES bullet record `OD-72-06` and `UD-071-01` closed. The CBD-93 repository header was corrected on its own focused branch at CBD-93 v1.1.1, with the manifest §2 record and the audit's frozen-blob constant re-frozen in the same change. No product behavior changed. |
| FU-95-006 | P0 | Policy decision point and server enforcement; `RK-94-001/003/005/012`, `SR-94-001–021/031–038/085–105` | CBD-24 exists but is materially thinner than the approved control contract | Specify a single deny-by-default policy decision path with account/profile, space, membership role, consent, resource scope, purpose/effect, lifecycle, policy/auth/target versions, assurance, and service-authority inputs. Make data-access helpers and mutation commits incapable of bypassing it. | Architecture decision record; complete policy schema; call-site inventory; deterministic allow/deny fixtures; cross-service negative tests; commit-time race tests | All shared-resource implementation and release remain blocked. |
| FU-95-007 | P0 | Identity, invitation proof, sessions, and reauthentication; `RK-94-001/002`, `SR-94-001–011` | CBD-21, CBD-41, and CBD-104 exist; provider and concrete controls remain open | Define identity-provider boundary, session issuance/rotation/revocation, assurance freshness, invited-channel proof, opaque one-time reconciliation codes, recovery separation, uniform responses, and compromised-session tests. | Provider decision; data-flow update; session/token schemas; rate values; deterministic identity/invitation/recovery test results | Authentication, invitation acceptance, protected actions, and recovery are blocked. |
| FU-95-008 | P0 | Hosting topology, KMS, secrets, and service identity; `RK-94-006/020`, `SR-94-039–043/068–073` | CBD-48, CBD-103, and CBD-120 exist; exact provider/topology remains open | Select managed hosting and key-management controls; define environment/account separation, workload identity, secret envelope, rotation, break-glass custody, log redaction, local-development boundary, and restore/redeploy path. Never place provider tokens in client storage or ordinary application logs. | Approved provider evidence; topology and trust-boundary diagram; KMS/IAM policy review; rotation/revocation exercise; secret-scanning and log-leak tests | Provider connectivity, production deployment, and protected-data processing are blocked. |
| FU-95-009 | P0 | Durable jobs, queues, callbacks, and stale authority; `RK-94-005/007/013`, `SR-94-031–038/044–054/110–124` | CBD-51, CBD-56, and CBD-121 cover pieces | Carry policy/auth/target versions and purpose through jobs; reauthorize before effect; use idempotency and transactional outbox/inbox patterns; revoke queued work after scope/lifecycle change; authenticate callbacks; bound retries and dead letters. | Job envelope schema; state machine; queue ACLs; replay/stale/race/duplicate fixtures; recovery and reconciliation results | No asynchronous effect may ship until authority remains correct after delay/retry. |
| FU-95-010 | P0 | Derived data, cache, search, reports, packages, and noninterference; `RK-94-012/017/018`, `SR-94-093–101/125–135` | CBD-24, CBD-45, and CBD-57 are partial; no focused issue covers the full derived-surface contract | Create a focused implementation issue after approval. Inventory every derived copy, key it by authorization and data version, atomically invalidate on scope change, suppress hidden identifiers/counts/shapes/timing, and prevent cross-space joins and completeness oracles. | Derived-copy inventory; cache/search/report schemas; invalidation SLO; cross-space and hidden-data fixtures; timing/pagination/error review | Viewer/masked surfaces, search, reports, notification packages, and cross-space reuse are blocked. |
| FU-95-011 | P0 | Audit, security evidence, and telemetry separation; `RK-94-009/019`, `SR-94-063–074/136–140`, `RI-93-007` | CBD-45, CBD-60, and CBD-122 exist but do not yet form one reviewed schema | Define separate customer history, account-subject self-service administration, personal delivery state, security/support evidence, and operational telemetry. Allowlist fields; bind actor/target/purpose/outcome/version; authorize former-subject access without membership restoration; redact other-member, hidden, secret, security, and operational detail; make evidence tamper-evident and access-controlled. | Event catalog and audience matrix; subject-record schema; post-removal authorization proof; retention/access policy; redaction/noninterference tests; integrity/tamper exercise; operational dashboards and alert tests | Protected actions, the new self-service record, customer audit claims, security investigation, and production operations are blocked. |
| FU-95-012 | P0 | Provider data, provenance, webhook authenticity, and financial lifecycle; `RK-94-004/006`, `SR-94-022–030/039–043` | CBD-46, CBD-51, CBD-53, and CBD-107 exist | Define provider adapter and normalized schemas, raw-payload custody, source/provenance labels, pending-to-posted transitions, correction/removal handling, webhook signature/replay protection, connection ownership, token revocation, and least-privilege scopes. | Provider sandbox evidence; signed-webhook fixtures; reconciliation/dedup results; disconnect/revoke exercise; provenance UI/copy review | Financial connectivity and provider-derived financial state are blocked. |
| FU-95-013 | P0 | Exceptional access and dual control; `OP-92-004/006`, `RK-94-020`, `SR-94-068–073`, `RG-94-006/009/010` | CBD-62 and CBD-120 identify a solo-operator conflict | Apply the August 16, 2026 Product Owner decision: a genuinely independent second human must approve before any exceptional customer-content access, key recovery, privileged recovery, or return-to-service action. The requester cannot approve their own request; a solo operator cannot invoke the path. Implement separate identities/credentials or custody, purpose/scope/time binding, mediation, evidence, customer notice, post-use review, and automatic revocation. | Named independent approver and enforceable availability; separation/custody design; access workflow; same-person/absent-approver denial tests; simulated invocation/revocation/recovery; independent evidence review | Product decision is closed. Production exceptional access, privileged recovery, and return-to-service remain blocked until the second-approver control is implemented and exercised; retrospective review is not a substitute. |
| FU-95-014 | P0 | Archive, deletion, personal-account lifecycle, backups, and restore; `RK-94-010/015/016`, `PA-92-*`, `SR-94-075–084/110–124` | CBD-61, CBD-62, and CBD-119 cover portions | Define per-data-class lifecycle and legal/contractual basis, authority shutdown, restore window, frozen archived scope, backup expiry, derived-copy/provider propagation, retained attribution, personal-account closure, recovery isolation, and user-facing custody limits. | Approved lifecycle schedule; data-class disposition table; delete/restore/backups exercises; provider propagation evidence; privacy/legal review of claims | Archive/delete/account-exit launch claims remain blocked. |
| FU-95-015 | P0 | Rates, quotas, abuse ceilings, and resource exhaustion; `RK-94-002/005/018`, `RL-92-*`, `SR-94-126–135` | CBD-123 exists; concrete values and shared enforcement are open | Select per-subject, actor, recipient, inviter, space, provider, IP/risk, and global keys as applicable; use shared atomic enforcement; constrain invitations, authentication, exports, reports, webhooks, jobs, and notifications; preserve uniformity. | Approved parameter record; shared limiter design; concurrency/bypass/provider-failure/load tests; monitoring thresholds | Abuse-sensitive and externally billable surfaces are blocked. |
| FU-95-016 | P1 | Export schemas, authorization snapshots, encryption, expiry, and custody; `RK-94-008/016`, `SR-94-055–062/113/119/122`, `RI-93-007` | CBD-61 is too thin for the full export contract | Define separate Primary/Co-owner, Collaborator, Viewer-snapshot, target-readable, Primary admin-history, subject-only self-administration, and archived-scope schemas where approved. Bind the subject record to authenticated account-subject authority after removal without restoring membership; reauthorize generation/download; encrypt, expire, rate-limit, audit, and disclose post-download custody. | Schema/audience review; golden/redaction fixtures; post-removal authorization, revocation, race, expiry, key/storage tests; accessibility/privacy/copy evidence | Export capability, including subject self-administration, and accurate custody claims are blocked. |
| FU-95-017 | P1 | Exact copy, notification templates, accessibility, localization, and custody disclosures; `RK-94-007/011/013/016/021`, `SR-94-044–061/085–092/107–122/141–145`, `RI-93-009/011–016` | CBD-73–75 and CBD-106 are planned; `RI-93-016` semantics are approved but exact strings/evidence are absent | Produce a versioned copy inventory for invitations—including the approved two-way category/authority/privacy comparison and the invitation-proof versus notification-destination boundary—consent, role/scope, lifecycle, tiered safe before/after consequences/remaining access/next steps, safety-channel selection/failure/no-fallback, compromised-channel quarantine/replacement/recovery state, non-blaming provisional alerts, exit, support refusal, external notifications, exports, comments, errors, provider state, and safety limitations. Enforce the approved semantic standard: recorded consent/reauthentication is not proof of voluntariness; channel control is not sole control; delivered or recipient-controlled copies are not remotely revocable or erasable; another person's circumstances/reasons are not characterized; unsupported authority/accountability is not implied; and irreversible consequences appear before action. Test equivalent meaning across channels/locales and assistive technology; never introduce pre-consent data, member enumeration, identity/recovery authority, transport-confidentiality claims, hidden fallback, unsafe reactivation, support bypass, actor blame, hidden/newly inaccessible content, private reasons/state, precise inactivity history, unsupported remedies, or safety/confidentiality/validation/compliance claims. | Product Owner-approved copy version; template hashes; accessibility/comprehension results; privacy/safety/legal evidence where routed; channel-render, destination-verification, authority-separation, safety-routing/failure, compromised-channel, provisional-alert, before/after notice, irreversible-consequence, custody/sole-control, actor-entitlement, forbidden-field, and no-pre-consent-disclosure fixtures | The semantic contract is approved, but exact copy, locale/accessibility equivalence, specialist evidence, and affected invitation, alert, lifecycle, export, comment, and support experiences remain blocked. |
| FU-95-018 | P0 | Agency decisions `RI-93-001–008` and `RI-93-019` | All inputs are decided; CBD-12/CBD-73–76 are likely focused targets; implementation/evidence are absent | Apply `RI-93-001–008`. Implement `RI-93-019` as immediate current Primary/Co-owner joint-projection dissolution after current authority/version/lifecycle/consequence checks, with safe authenticated in-app pre-notice where feasible, mandatory immediate post-notice, channel-ceiling external copies, no contributor objection/veto/delay/acknowledgement/approval state, unchanged contributor self-source removal, accurate recomputation and unchanged-link/private-connection/authority disclosure, safe audit, and evidence-bound or unanimous re-association. Preserve `AB-93-086` as explicit and unaccepted. Route changes through threat, permission, lifecycle, schema, copy, platform-safety, and test impact review. | Subject-record and comment-association schemas; audience/evidence/copy rules; joint-projection state/recomputation contract; pre/post notice templates; authority, version, stale/race, notice-failure, deduplication, balance, transaction, reconciliation, alert, report, derivative, reassociation, privacy, forced-itemization, preservation, noninterference, abuse, retaliation, and audit fixtures | All agency choices are decided but remain implementation/evidence-blocked. No decision completion accepts residual risk, closes `SR-94-146/147`, or authorizes release. |
| FU-95-019 | P1 | Invitation decisions `RI-93-009–011` | `RI-93-009–011` are decided; CBD-73 is the likely focused target | Implement two-way safe disclosure and all three approved `RI-93-010` protections: recipient-controlled cross-space per-inviter blocking, explicit decline-once/decline-and-block choice, and pair-scoped cross-space limiting. Bind the limiter to authenticated inviter plus a privacy-preserving recipient key; count inviter-originated create/resend attempts, not recipient actions; create no recipient-wide quota; use uniform responses/timing; store/log no raw recipient identifier; and preserve existing memberships and unrelated inviters. Record exact limiter parameters/evidence in `PR-94-002`. During acceptance, allow an optional separately verified notification-only destination that activates only on atomic acceptance, follows current channel ceilings, is invisible to the inviter, and grants no identity, login, recovery, primary-contact, account, invitation-proof, or acceptance authority. Do not automatically make the invited channel a personal notification destination; failed/stale verification activates nothing and does not block ordinary acceptance. | Revised invitation/block/limit/destination schemas and requirements; explicit-choice and notification-boundary copy; destination verification, activation, failure, replay, stale, and atomicity tests; decline/block/limit fixtures; inviter-visibility denial; invited-channel non-promotion; login/recovery/identity non-escalation; response/timing equivalence; legitimate-recipient and unrelated-inviter noninterference; existing-membership, race, abuse, accessibility, and localization evidence | `RI-93-009–011` are decided but implementation/evidence- and applicable `PR-94-002`-blocked. Baseline invitations still require existing gates. |
| FU-95-020 | P1 | Notification/lifecycle decisions `RI-93-012–015` | `RI-93-012–015` are decided; CBD-72 §6.3 and CBD-91 §7.3 require a focused source amendment only for safety routing, and CBD-74 is the likely implementation target | Synchronize the approved strict safety-channel rule into CBD-72/CBD-91 only through a separately authorized focused change: mandatory authenticated in-app notice plus only the subject's verified safety channel, never fallback externally. Implement subject-only fail-closed channel retirement with immediate delivery/authority quarantine, independent replacement, no channel/support bypass, and approved restricted recovery. Preserve current informational-alert eligibility, exclude Viewers, add no subject-first delay, omit actor/responsibility attribution, preserve provisional/non-actionable/self-clearing semantics, and keep `AB-93-031` unaccepted. Implement the tiered semantic notice contract: authenticated in-app safe event and before/after class, time, material consequence, remaining state, and supported next step/deadline; actor identity only under existing audit entitlement; inactive-owner process and objection path without precise inactivity history/countdown; no financial/hidden/newly inaccessible content, private reasons/state, speculation, or unsupported remedies; external copies remain within `NT/EM-92-*`. | Product Owner-approved safety-routing source diffs; versioned routing/destination/recovery, alert, and notice schemas; quarantine/replacement/no-fallback/authority-separation; eligibility/Viewer denial/provisional semantics; before/after consequence/remaining-state/next-step and actor-entitlement cases; forbidden-field, inactivity-inference, channel-ceiling, audit, localization, accessibility, comprehension, and race fixtures | `RI-93-012–015` are decided but source/design/copy and implementation/evidence-blocked as applicable. Current external routing controls until focused amendments merge; exact copy remains unapproved; no residual risk is accepted. |
| FU-95-021 | P1 | Cross-cutting copy and support response `RI-93-016/017` | Both semantic decisions are approved for Private MVP; CBD-75 is the likely focused copy target; implementation and evidence are absent | Implement the approved cross-cutting semantic standard. Implement the bounded shut-out-subject response: hard denial of support-mediated membership/role/ownership/connection-authority transfer; no escalation override, hidden-state confirmation, content inspection, member identification/contact/mediation, circumstance characterization, interpersonal-contact recommendation, or recovery promise; and only applicable authorized account/session recovery, in-product leave/unlink, account-subject record, subject-available evidence, restricted-reporting, and generic owner-managed-invitation boundary guidance. Apply uniform non-enumerating outcomes, restricted handling for safety disclosures, and no public-launch expansion. | Versioned copy inventory; Product Owner approval of exact strings; locale/accessibility/comprehension and privacy/safety/legal evidence; restricted intake and staff procedure/training; authority-denial, impersonation, enumeration, unsafe-contact, false-remedy, content-access, escalation-bypass, and safety-disclosure scenario tests | `RI-93-016/017` semantics are approved, but exact copy, restricted operations, training, implementation, and evidence remain blocked; no public-launch support expansion is approved. |
| FU-95-022 | P0 | Personal-account terminal disposition `RI-93-018` | Product rule is decided; CBD-12, CBD-61, and CBD-76 are likely focused targets; exact schedules/design/evidence are absent | Implement the approved terminal disposition: delete private account/profile/connection/provider and server-controlled derived data after the restoration window; revoke/rotate secrets and request supported vendor deletion; pseudonymize necessary retained shared financial facts, provenance, comments, consent, and administrative history as “Former member”; remove customer-visible/cross-space identifiers; restrict and time-bound internal linkage; retain a minimal non-resurrection/deletion ledger; and state backup/provider/recipient-copy limitations accurately. Produce an exhaustive data-class and custodian schedule before any terminal-deletion claim. | Approved data-class/custodian schedule; qualified privacy/legal evidence; schema and pseudonym/linkage review; vendor-deletion evidence; key/token revocation; cache/index/package purge; backup-expiry proof; authorization, restore-versus-terminal race, recreation/non-resurrection, attribution, audit-integrity, and copy fixtures | The product rule is approved, but terminal-deletion and plain-language exit claims remain blocked until schedules, design, implementation, provider/backup evidence, specialist approval, and tests pass. |
| FU-95-023 | P3 | Product-plan drift identified by CBD-94 | `docs/product-plan.md` is outside active CBD-95 document scope | In a separate focused branch after consent, reconcile stale role names, rollover assumptions, channel descriptions, and analytics claims against approved product contracts. Do not edit as part of CBD-95. | User-approved focused change, independent merge, post-merge Confluence sync if applicable | No runtime effect; readers may otherwise rely on stale planning prose. |
| FU-95-024 | P3 | Architecture-document drift identified by CBD-94 | `docs/architecture.md` is outside active CBD-95 document scope | In a separate focused branch after consent, replace stale role/provider/security hypotheses only after relevant architecture/provider decisions are approved. Preserve explicit unknowns. | User-approved focused change, reviewed architecture decision references, independent merge | No runtime effect; current architecture prose is not implementation evidence. |
| FU-95-025 | P0 | Platform safety and shared comments; `EG-93-009`, `RK-94-014`, `SR-94-102–105`, `RG-94-011`, `RI-93-008` | CBD-131 covers the required operating model. It was created on August 18, 2026 under CBD-2, is blocked by CBD-95, and carries the `EG-93-009` closure elements as acceptance criteria | Keep free-form comments in Private MVP and implement report plus subject-controlled detachment of the subject-owned association. Create a focused issue for intake, evidence/content preservation, association semantics, confidentiality limits, response ownership, staffing/training, abuse scenarios, qualified review, and exercises. No role gains global moderation authority; detachment cannot edit/delete authored content or alter financial state. | Focused issue/owner; approved operating model and schemas; qualified safety/privacy review; report/detach/response exercise; preservation, audience, abuse, disclosure, retaliation, evidence-access, race, and failure-case results | Product scope/remedy are decided. Shared comments and **Private-MVP launch** remain blocked until `EG-93-009` and `RG-94-011` close. Acknowledgements remain separate personal, non-authorizing state. |
| FU-95-026 | P0 | Independent security review; `RG-94-015` | CBD-65 covers security testing but does not itself establish independence | Define reviewer independence, exact reviewed build/configuration, threat/requirement scope, severity policy, remediation/retest, exceptions, and signed disposition for public launch. Penetration testing is not silently asserted as the required method. | Independent report and retest evidence tied to exact build; accepted exceptions by named risk authority | Public launch is blocked; private MVP still requires its applicable internal and specialist gates. |
| FU-95-027 | P1 | Legal, privacy, accessibility, advocacy/safety, and research evidence; `EG-91-*`, `RF-92-*`, `EG-93-*`, `RG-94-010/012–014` | No single Jira issue currently owns the whole evidence program | Split into focused reviews with qualified owners, exact artifacts/builds, questions, methods, participants or limitations, findings, remediation, and sign-off. Do not combine distinct disciplines or treat internal review as external validation. | Dated reports tied to exact versions; finding dispositions; retests where applicable; explicit limitations | Claims and capabilities named by each evidence gate remain blocked; documentation approval may proceed with the blockers explicit. |
| FU-95-028 | P0 | Managed-provider evidence and exit plans; `RK-94-006`, `SR-94-039–043/146`, `PR-94-*` | CBD-15 and CBD-102–108 exist; no providers are selected | Apply the approved rubric to hosting/runtime, identity, email, financial connectivity, storage/KMS/observability as applicable. Record data use/retention, regions, subprocessors, auth/scopes, callbacks, deletion/export, incident evidence, quotas, cost-abuse ceilings, portability, and failure behavior. | Approved decision package; contract/document evidence; sandbox/exit test; residuals; exact parameter record | Provider-dependent implementation and production deployment are blocked. |
| FU-95-029 | P2 | Post-merge publication and source parity | **Registered and published.** All four CBD-95 pages exist — `9797633`, `9830401`, `9863169`, `9895937` — and an August 18, 2026 readback confirmed all twelve CBD-91–95 pages match their repository document versions. Each later revision supersedes its published copy | Register the CBD-95 target page IDs in `scripts/sync-confluence.py` through a separate focused change, merge it, then publish/synchronize the package in dependency order and compare title, version, stable IDs, tables, limitations, hashes/links, and revision history. | Merge SHA; page-registration change; Confluence page IDs/versions; parity report with no unresolved material drift | Publication is no longer blocked by the merge gate. It remains blocked on page registration and on Product Owner approval of the exact versions, so no page may be created from an unapproved revision. |
| FU-95-030 | P2 | Final workflow evidence and links; `RV-95-006` | CBD-95 In Progress, CBD-14 In Progress, CBD-72 In Progress, CBD-76 Ready. The inverted-link work is closed. The register's follow-ups were identified against existing Jira work but not linked from it, so the routing was invisible from the target issues | With explicit user authorization and an immediate live refetch, attach exact repository/Confluence evidence, retain open implementation/specialist gates, correct only authorized stale fields, and transition issues only when their actual criteria are met. Separately, reverse links `10000–10003` and `10009` by deleting and recreating each in the correct direction; confirm the intended CBD-76 → CBD-77/78/79 → CBD-80 order before touching `10010–10013`. Leave ids `10034` and above unchanged. | Live before/after snapshots; approved version/SHA; corrected link graph read back from both endpoints; comments; status transitions; no overwritten concurrent changes | The Product Owner authorized the `RV-95-001–008` corrections on August 16, 2026; nine field corrections and five link replacements were applied and no status was transitioned. Jira enforces CBD-76's downstream position again. All fourteen inverted links were removed on August 16, 2026 and the dependency order rebuilt, including CBD-91 → CBD-92 and CBD-91 → CBD-93. `10013`–`10016` were deleted and the CBD-77 → CBD-81 cluster rebuilt as CBD-77/78/79 → CBD-80 → CBD-81 once CBD-13's deliverable ordering supplied the authoritative sequence. A complete project-wide enumeration over all 130 CBD issues confirms none remain inverted, and the four heuristic flags were reviewed and confirmed correct by the Product Owner, closing the `RV-95-006` link work in full. On August 18, 2026, under explicit authorization, the linkage pass added a pointer comment to each of the 37 distinct issues this register names as a target, listing the `FU-95-*` rows that route work to it; `FU-95-025` and `FU-95-027` name no existing issue and remain identified-only. Closure evidence, exact repository and Confluence versions, and status transitions remain outstanding. Any further mutation needs its own authorization. |

### 3.1 Existing Jira target index

These are resolvable existing targets, not newly created work. A row that calls
for a new focused issue remains only a proposal until authorized.

| Work area | Existing Jira targets |
| --- | --- |
| Parent, reconciliation, permissions, and downstream boundary | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12), [CBD-14](https://cobudget.atlassian.net/browse/CBD-14), [CBD-24](https://cobudget.atlassian.net/browse/CBD-24), [CBD-72](https://cobudget.atlassian.net/browse/CBD-72), [CBD-73](https://cobudget.atlassian.net/browse/CBD-73), [CBD-74](https://cobudget.atlassian.net/browse/CBD-74), [CBD-75](https://cobudget.atlassian.net/browse/CBD-75), [CBD-76](https://cobudget.atlassian.net/browse/CBD-76), [CBD-95](https://cobudget.atlassian.net/browse/CBD-95) |
| Identity, invitation, sharing, and audit | [CBD-21](https://cobudget.atlassian.net/browse/CBD-21), [CBD-41](https://cobudget.atlassian.net/browse/CBD-41), [CBD-43](https://cobudget.atlassian.net/browse/CBD-43), [CBD-45](https://cobudget.atlassian.net/browse/CBD-45), [CBD-104](https://cobudget.atlassian.net/browse/CBD-104) |
| Provider and financial lifecycle | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15), [CBD-46](https://cobudget.atlassian.net/browse/CBD-46), [CBD-48](https://cobudget.atlassian.net/browse/CBD-48), [CBD-51](https://cobudget.atlassian.net/browse/CBD-51), [CBD-53](https://cobudget.atlassian.net/browse/CBD-53), [CBD-102](https://cobudget.atlassian.net/browse/CBD-102), [CBD-103](https://cobudget.atlassian.net/browse/CBD-103), [CBD-106](https://cobudget.atlassian.net/browse/CBD-106), [CBD-107](https://cobudget.atlassian.net/browse/CBD-107), [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Alerts, notifications, delivery, and reporting | [CBD-56](https://cobudget.atlassian.net/browse/CBD-56), [CBD-57](https://cobudget.atlassian.net/browse/CBD-57), [CBD-58](https://cobudget.atlassian.net/browse/CBD-58), [CBD-60](https://cobudget.atlassian.net/browse/CBD-60), [CBD-106](https://cobudget.atlassian.net/browse/CBD-106), [CBD-121](https://cobudget.atlassian.net/browse/CBD-121), [CBD-122](https://cobudget.atlassian.net/browse/CBD-122), [CBD-123](https://cobudget.atlassian.net/browse/CBD-123) |
| Lifecycle, operations, restore, and testing | [CBD-61](https://cobudget.atlassian.net/browse/CBD-61), [CBD-62](https://cobudget.atlassian.net/browse/CBD-62), [CBD-65](https://cobudget.atlassian.net/browse/CBD-65), [CBD-119](https://cobudget.atlassian.net/browse/CBD-119), [CBD-120](https://cobudget.atlassian.net/browse/CBD-120) |

## 4. Architecture workstreams and security boundaries

| Workstream | Normative boundary | Principal follow-ups | Minimum evidence before implementation approval |
| --- | --- | --- | --- |
| Identity and assurance | Channel control, account identity, session authority, reauthentication, invitation proof, recovery, and notification destination are distinct | `FU-95-007`, `FU-95-015`, `FU-95-019` | Threat-linked schemas; uniform failure cases; session/recovery/rate fixtures |
| Authorization and isolation | Every read, mutation, derived surface, and delayed effect denies by default and reevaluates current authority | `FU-95-006`, `FU-95-009`, `FU-95-010` | Central policy contract; complete call-site inventory; cross-space and stale-version negative tests |
| Data and provider custody | Financial provenance, service secrets, provider callbacks, exports, logs, backups, and downloaded copies have separate custody limits | `FU-95-008`, `FU-95-012`, `FU-95-014`, `FU-95-016`, `FU-95-028` | Provider/topology decisions; per-copy data lifecycle; revocation/restore/exit exercises |
| Notifications and interactions | Mandatory in-app notices survive optional-channel failure; external surfaces remain content-free; comments create a separate safety surface | `FU-95-001`, `FU-95-002`, `FU-95-009`, `FU-95-017`, `FU-95-020`, `FU-95-025` | Channel/template fixtures; idempotency; privacy/accessibility review; operating model for comments |
| Audit and operations | Customer history, personal delivery state, security evidence, and operational telemetry remain separate and least-privileged | `FU-95-011`, `FU-95-013`, `FU-95-015`, `FU-95-026` | Event/audience catalog; evidence integrity; alerting exercises; exceptional-access decision |
| Lifecycle and agency | Authority shutdown is immediate; retention, restore, attribution, notices, and irreversible copies are stated per data class | `FU-95-014`, `FU-95-018`, `FU-95-021`, `FU-95-022`, `FU-95-027` | Product decisions; lifecycle schedule; specialist evidence; delete/restore/exit fixtures |

No workstream may use UI hiding, provider behavior, eventual cleanup, support
discretion, or an audit entry as a substitute for server-side authorization.

## 5. Sequencing and dependency roadmap

| Stage | Entry condition | Work | Exit condition |
| --- | --- | --- | --- |
| 0 — CBD-95 review | Exact CBD-91–94 sources frozen | Resolve/acknowledge `FU-95-001–005`, review all `RI-93-*`, run the package audit, and approve exact CBD-95 documents | Product Owner approval or explicit blockers recorded; no source conflict hidden |
| 1 — Foundational decisions | CBD-95 exact version approved; CBD-76 boundary corrected | Implement the decided independent-approver, agency/copy/lifecycle, and comments-safety operating models in `FU-95-013/018–022/025`; close remaining provider decisions in `FU-95-028` | Stable scope and provider/operating assumptions for implementation |
| 2 — Security foundations | Stage 1 decisions available | Implement identity, authorization, topology/secrets, audit, shared limits, and lifecycle foundations in `FU-95-006–008`, `FU-95-011`, `FU-95-014–015` | Foundational deterministic fixtures and architecture/security reviews pass |
| 3 — Capability controls | Foundation evidence passes | Implement workers/providers/derived surfaces/exports/copy in `FU-95-009–010`, `FU-95-012`, `FU-95-016–017` | Capability-specific positive, negative, race, failure, and recovery evidence passes |
| 4 — Specialist and operational closure | Exact release candidate exists | Close `FU-95-026–027`, perform recovery/incident/provider-exit exercises, remediate and retest | Applicable private-MVP gates formally pass or have authorized residual acceptance |
| 5 — Public launch gate | Exact public candidate and private-MVP evidence exist | Complete independent security review and all public-only evidence | `RG-94-015` and every other applicable launch gate formally close |

Stages express evidence dependencies, not permission to begin CBD-76 early.
CBD-76 remains downstream of approved CBD-95 through the existing issue link.

## 6. Product decisions requiring attention

All `RI-93-001–019` product inputs are decided. Their implementation and
evidence remain under `FU-95-018–022`; decision completion is not evidence that
the controls work. Acceptance of any residual risk remains solely with the
authority named in CBD-94 §3.6, and no such acceptance is granted here.

Twenty-three product choices are now recorded on August 16, 2026:

- the Product Owner retained the approved content-free push, SMS, and
  routine-email ceiling. Protected detail remains in-app and purpose-specific
  email allowlists remain unchanged. `FU-95-001` is source-correction work;
  and
- the Product Owner required a genuinely independent second approver before
  exceptional customer-content access, key recovery, privileged recovery, or
  return to service. A solo operator cannot invoke that path. `FU-95-013` is
  now implementation and exercise work, not an open operating-model choice;
  and
- the Product Owner retained free-form shared comments as required Private-MVP
  scope. Consequently, `EG-93-009` and `RG-94-011` block Private-MVP launch
  until the platform-safety operating model, staffing, qualified review, and
  exercises pass. No role-based moderation or `RI-93-008` remedy is implied;
  and
- for `RI-93-001`, the Product Owner retained the current five roles for
  Private MVP. Viewer remains the narrow read-only option; no new
  supportive-contributor or configurable/scoped Partner variant is added; and
- for `RI-93-002`, the Product Owner retained owner-managed membership and
  visibility for Private MVP. No selective observer block is added; the product
  must disclose safe leave/unlink paths and the inability to recall prior
  recipient-controlled copies; and
- for `RI-93-003`, the Product Owner retained immediate protected reductions
  with no actor-only reversal. Restoration requires a fresh consented and
  audited grant; stale access must remain invalidated; and
- for `RI-93-004`, the Product Owner retained immediate removal without a new
  removal-time export entitlement or package. Existing authorized exports stay
  pre-removal, and the separate archival export remains unchanged; and
- for `RI-93-006`, the Product Owner retained Primary-only deletion with
  accurate notices, the 30-day restore window, and frozen-scope archival export
  but no other-member objection, veto, or delay authority; and
- for `RI-93-007`, the Product Owner approved a separate, allowlisted
  administrative record about oneself. Authenticated account-subject access
  remains after removal while retained but restores no membership and reveals
  no financial, hidden, other-member, security/support, or operational data;
  and
- for `RI-93-008`, the Product Owner approved report plus subject-controlled
  detachment of the comment's association from the subject's attributed
  record/presentation. Authored content/evidence remains preserved; no global
  moderation or financial effect is created; and
- for `RI-93-009`, the Product Owner approved concise two-way invitation
  disclosure of category/authority visibility and what remains private, with
  no actual pre-consent financial data, hidden resources, private member
  details, or unauthorized member list; and
- for `RI-93-010A`, the Product Owner approved a recipient-controlled
  account-level block against one inviter across all spaces until recipient
  removal. It suppresses future invitations with non-disclosing outcomes and
  leaves existing memberships unchanged; and
- for `RI-93-010B`, the Product Owner approved an explicit unselected choice
  between declining the current invitation once and declining plus invoking
  the approved inviter block. No separate persistent-decline state is added,
  and interruption or ambiguity cannot create a block; and
- for `RI-93-010C`, the Product Owner approved a pair-scoped cross-space limit
  keyed to authenticated inviter and a privacy-preserving recipient token. It
  counts inviter create/resend attempts, not recipient actions, creates no
  recipient-wide quota, uses uniform non-disclosing outcomes, and leaves exact
  values, key derivation, storage, and recovery evidence to `PR-94-002`; and
- for `RI-93-011`, the Product Owner approved an optional separately verified
  notification-only destination during acceptance. It activates only after
  atomic acceptance, remains invisible to the inviter, and gains no identity,
  login, recovery, primary-contact, account, invitation-proof, or acceptance
  authority. The invited channel is not automatically promoted to a personal
  destination, and failed or abandoned verification activates nothing; and
- for `RI-93-012`, the Product Owner approved mandatory authenticated in-app
  lifecycle notice plus only the subject's verified private safety channel for
  external delivery. Missing or failed safety delivery never falls back to
  another external destination; the channel gains no identity/recovery/account
  authority, and the older “every channel on record” text requires a focused
  CBD-72/CBD-91 amendment before implementation; and
- for `RI-93-013`, the Product Owner approved fail-closed compromised-channel
  retirement: immediately quarantine delivery, tokens, safety designation, and
  any identity/login/recovery authority; verify a safe replacement
  independently before atomic binding removal; allow neither channel
  self-approval nor support bypass; and use in-app-only safety routing plus the
  approved restricted recovery path on failure; and
- for `RI-93-014`, the Product Owner retained current informational-alert
  eligibility, including active Accountability Partners, without a
  subject-first delay. Alerts omit actor/responsibility attribution and remain
  provisional, non-actionable, and self-clearing. The observation/surveillance
  risk remains explicit and unaccepted pending formal disposition; and
- for `RI-93-015`, the Product Owner approved tiered transparent notice
  semantics: safe before/after consequence, remaining-state, and supported
  next-step detail authenticated in-app; external content at its channel
  ceiling; and no hidden/newly inaccessible data, private reasons, precise
  inactivity history/countdown, speculation, or unsupported remedies; and
- for `RI-93-016`, the Product Owner approved a normative cross-cutting
  semantic standard: recorded consent/reauthentication is not proof of
  voluntariness; channel control is not sole control; delivered and
  recipient-controlled copies are not remotely revocable or erasable; copy
  does not characterize another person's circumstances/reasons or imply
  unsupported authority/accountability; and irreversible consequences are
  disclosed before action. Exact strings and specialist evidence remain gated;
  and
- for `RI-93-017`, the Product Owner approved a Private-MVP-only bounded honest
  response for a shut-out subject. Support cannot transfer authority, override
  the denial through escalation, investigate content or hidden membership,
  identify/contact/mediate with another member, recommend interpersonal
  contact, or promise recovery. It may provide only applicable already-approved
  self-service, subject-record, evidence, restricted-reporting, and generic
  owner-managed-invitation boundary guidance. Exact copy, restricted handling,
  training, and scenario evidence remain gated; and
- for `RI-93-018`, the Product Owner approved deletion of private
  account/profile/connection/provider data after terminal account deletion and
  pseudonymization of necessary retained shared history as “Former member.”
  Internal linkage is restricted, purpose-bound, non-customer-visible, and
  time-limited; a minimal deletion ledger prevents resurrection. Exact class
  schedules, provider/backup expiry, implementation, copy, and qualified
  privacy/legal evidence remain gated, and recipient-controlled copies are not
  described as remotely erasable; and
- for `RI-93-019`, the Product Owner retained immediate Primary/Co-owner
  dissolution of a budget-scoped joint projection with safe pre-notice where
  feasible and mandatory immediate post-notice. Contributors gain no objection,
  veto, delay, acknowledgement, or approval state and retain immediate removal
  of only their own source. Notices disclose operational effects without
  private provenance/reasons, and reassociation stays evidence-bound or
  unanimous. `AB-93-086` remains explicit and unaccepted; implementation and
  `SR-94-146/147` evidence remain gated.

Source corrections in `FU-95-002–005` do not change approved scope. They still
require live-state reconciliation and authorization before Jira or out-of-scope
repository documents are changed.

## 7. Release and completion rules

CBD-95 documentation may be approved with implementation or specialist gates
open only if every such gate is named, routed, and described without implying
that the product is secure, compliant, validated, or ready to launch.

The following claims are prohibited until the corresponding evidence exists:

- that authorization or cross-budget isolation is effective before the exact
  implementation and negative/race tests pass;
- that data is erased from downloads, inboxes, carriers, providers, logs, or
  backups without per-custodian evidence;
- that consent is voluntary or coercion-safe because a person clicked or
  reauthenticated;
- that accessibility, survivor safety, privacy, legal compliance, usability,
  market fit, or independent security has been validated by internal review;
  and
- that closing CBD-14 or approving CBD-95 is a production release decision.

## 8. Change control

Before changing a target Jira issue, fetch its current description, acceptance
criteria, status, links, subtasks, assignments, dates, and comments and compare
them with the proposed row. Preserve concurrent valid changes. Before changing
an out-of-scope repository document, obtain consent and use a separate focused
branch and pull request. Synchronize a repository-backed document to Confluence
only after its exact change merges to `main`.

Any follow-up closure that changes a role, authority, visibility, lifecycle,
channel, interaction, provider custody promise, or release effect requires a
new impact pass across CBD-12, CBD-72, the CBD-91–95 package, tests, copy, and
the readiness recommendation.

## 9. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.0 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Routed source conflicts, architecture work, all undecided Product Owner inputs, implementation evidence, specialist review, publication, and workflow closure into 30 security-first follow-ups with explicit effects and evidence. | Complete draft; Product Owner decisions and approval pending |
| 0.1.1 | August 16, 2026 | Codex | Recorded the approved content-free external-notification decision and narrowed `FU-95-001` to live Jira source correction and downstream evidence. | Decision approved; remaining decisions and package approval pending |
| 0.1.2 | August 16, 2026 | Codex | Recorded the independent-second-approver decision and narrowed `FU-95-013` from an operating-model choice to implementation, denial testing, recovery exercise, and evidence. | Decision approved; implementation and package approval pending |
| 0.1.3 | August 16, 2026 | Codex | Recorded shared comments as required Private-MVP scope and elevated `EG-93-009`/`RG-94-011` to Private-MVP launch blockers without creating role-based moderation or deciding `RI-93-008`. | Decision approved; safety operating model/evidence and package approval pending |
| 0.1.4 | August 16, 2026 | Codex | Recorded `RI-93-001` as closed absent for Private MVP: retain the five roles, use Viewer for narrower read-only access, and add no scoped/configurable Partner variant. | Decision approved; remaining decisions and package approval pending |
| 0.1.5 | August 16, 2026 | Codex | Recorded `RI-93-002` as closed absent for Private MVP: retain owner-managed access, add no selective observer block, and require honest exit/unlink and prior-copy limitations. | Decision approved; remaining decisions and package approval pending |
| 0.1.6 | August 16, 2026 | Codex | Recorded `RI-93-003` as closed absent: protected reductions are immediate and actor-irreversible; restoration requires fresh consent and audit. | Decision approved; remaining decisions and package approval pending |
| 0.1.7 | August 16, 2026 | Codex | Recorded `RI-93-004` as closed absent for Private MVP: removal immediately ends access and creates no new export entitlement or package. | Decision approved; remaining decisions and package approval pending |
| 0.1.8 | August 16, 2026 | Codex | Recorded `RI-93-006` as closed absent for Private MVP: retain Primary-only deletion safeguards but add no member objection, veto, or delay authority. | Decision approved; remaining decisions and package approval pending |
| 0.1.9 | August 16, 2026 | Codex | Recorded `RI-93-007` as approved: add an account-subject, allowlisted self-administration record accessible after removal while retained without restoring membership. | Decision approved; implementation/evidence and package approval pending |
| 0.1.10 | August 16, 2026 | Codex | Recorded `RI-93-008` as approved: add report plus subject-controlled association detachment while preserving content/evidence and denying global moderation or financial effect. | Decision approved; safety implementation/evidence and package approval pending |
| 0.1.11 | August 16, 2026 | Codex | Recorded `RI-93-009` as approved: add concise two-way invitation category/authority/privacy disclosure without exposing actual pre-consent data or an unauthorized member list. | Decision approved; copy/implementation/evidence and package approval pending |
| 0.1.12 | August 16, 2026 | Codex | Recorded `RI-93-010A` as approved: add a recipient-controlled cross-space per-inviter account block with non-disclosing outcomes and no existing-membership effect. | Choice approved; implementation/evidence and remaining decisions pending |
| 0.1.13 | August 16, 2026 | Codex | Recorded `RI-93-010B` as approved: require an explicit decline-once versus decline-and-block choice using the approved block, with no separate persistent state or ambiguous-action escalation. | Choice approved; implementation/evidence and remaining decisions pending |
| 0.1.14 | August 16, 2026 | Codex | Recorded `RI-93-010C` as approved: add a pair-scoped cross-space invitation limiter with privacy-preserving keys, no recipient-wide exhaustion, uniform outcomes, and no interference with recipient actions or unrelated inviters. | Decision complete; parameters, implementation/evidence, and remaining decisions pending |
| 0.1.15 | August 16, 2026 | Codex | Recorded `RI-93-011` as approved: allow an optional separately verified notification-only destination during acceptance without identity/recovery/account escalation, invited-channel promotion, or inviter visibility. | Decision approved; implementation/evidence and remaining decisions pending |
| 0.1.16 | August 16, 2026 | Codex | Recorded `RI-93-012` as approved: route subject lifecycle notices to mandatory in-app plus only the verified private safety channel, with no external fallback or authority escalation and a focused CBD-72/CBD-91 amendment required. | Decision approved; source synchronization, implementation/evidence, and remaining decisions pending |
| 0.1.17 | August 16, 2026 | Codex | Recorded `RI-93-013` as approved: add fail-closed compromised-channel retirement with immediate delivery/authority quarantine, independently verified replacement before atomic removal, in-app-only safety fallback, and no compromised-channel or support approval path. | Decision approved; identity/recovery design, implementation/evidence, and remaining decisions pending |
| 0.1.18 | August 16, 2026 | Codex | Recorded `RI-93-014` as approved: retain current informational-alert eligibility, including active Accountability Partners, while prohibiting blame/actor attribution and preserving provisional, non-actionable, self-clearing semantics; residual observation risk remains unaccepted. | Decision approved; copy/implementation/evidence, risk disposition, and remaining decisions pending |
| 0.1.19 | August 16, 2026 | Codex | Recorded `RI-93-015` as approved: adopt tiered transparent scope/lifecycle notice semantics—safe before/after consequence and next-step detail in authenticated in-app, channel-ceiling external copies, and no hidden data, private reasons, precise inactivity history, or unsupported remedy claims. | Decision approved; exact copy/evidence and remaining decisions pending |
| 0.1.20 | August 16, 2026 | Codex | Recorded `RI-93-016` as approved: adopt a normative cross-cutting semantic standard for consent, channel control, recipient-controlled copies, third-party circumstances, authority/accountability, and disclosure of irreversible consequences before action. | Decision approved; exact copy/evidence and remaining decisions pending |
| 0.1.21 | August 16, 2026 | Codex | Recorded `RI-93-017` as approved for Private MVP: pair the hard support-transfer refusal with a bounded honest response and only applicable authorized routes, without investigation, hidden-state disclosure, member contact, mediation, or recovery promises. | Decision approved; exact copy/operations evidence and remaining decisions pending |
| 0.1.22 | August 16, 2026 | Codex | Recorded `RI-93-018` as approved: delete private data after terminal account deletion, pseudonymize necessary retained shared history as “Former member,” restrict and time-bound internal linkage, preserve minimal purpose-bound evidence/deletion records, and make no recipient-copy or immediate-backup erasure claim. | Decision approved; schedules/design/evidence and final decision pending |
| 0.1.23 | August 16, 2026 | Codex | Recorded `RI-93-019` as approved: retain immediate owner/co-owner joint-projection dissolution with safe pre-notice where feasible and mandatory immediate post-notice, no contributor objection/veto/delay/acknowledgement position, unchanged contributor self-source removal, and explicit unaccepted forced-itemization risk. | All `RI-93-*` decisions complete; implementation/evidence and package approval pending |
| 0.1.24 | August 16, 2026 | Codex | Rebaselined to current `origin/main` `43e87be`; confirmed the eleven frozen CBD-72/CBD-91–94 sources, follow-up scope, blocker effects, and sequencing remain unchanged by intervening CBD-102 and repository-tooling commits. | Rebaseline complete; final audit and package approval pending |
| 0.1.25 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Post-merge review correction. Recorded the `5c90a74` merge, released `FU-95-029` from the merge gate while keeping it blocked on page registration and exact-version approval, and repaired four §6 bullets that ended a sentence before a bare “and”. No follow-up scope, priority, closure evidence, blocker effect, or sequencing changed. | Correction applied; package approval still pending |
| 0.1.26 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Routed `RV-95-006–008` from the live Jira audit. `FU-95-030` gains the nine inverted Blocks links and the exact reversal instruction; `FU-95-001` gains CBD-74 AC04 and the budget-space identification clause; `FU-95-002` records that CBD-74 AC11 needs no edit; `FU-95-005` gains CBD-76 and the CBD-12 v1.1 contradiction. No follow-up was added or removed, and no priority, closure evidence, or sequencing changed. | Routes recorded; Jira corrections unauthorized and package approval pending |
| 0.1.27 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the applied state in `FU-95-001–005` and `FU-95-030` after the authorized corrections: nine field corrections across CBD-12, CBD-58, and CBD-73–76, and five Blocks-link replacements restoring the CBD-76 dependency chain. Each row now separates what was applied from what still requires Product Owner acceptance. No follow-up was added or removed, and no priority, closure evidence, or sequencing changed. | Corrections applied; `FU-95-001–005` closure pending Product Owner acceptance |
| 1.0 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Approved release. The Product Owner closed `FU-95-002`, `FU-95-003`, `FU-95-004`, and `FU-95-005` on their applied corrections, and deliberately kept `FU-95-001` open because it also carries external-preview implementation and copy work gated by `RG-94-007/012`. Recorded that `FU-95-005` closure covers the Jira surfaces only: the CBD-93 repository header is a frozen authority blob and needs its own branch plus a re-freeze. Recorded the rebuilt CBD-72 → CBD-75 chain, the surviving inverted link `10013`, and the deliberately empty CBD-77 → CBD-81 cluster in `FU-95-030`. Promoted to v1.0 on Product Owner approval. | **Approved v1.0** |
| 1.0.1 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Factual correction to `FU-95-030`. The v1.0 text stated that link `10013` was still live and that `10014`, `10015`, and `10016` had been deleted; live Jira showed the inverse, an error caused by a truncated JQL response that omitted CBD-80 and CBD-81. All twelve identified inverted links are now removed and the CBD-77 → CBD-81 cluster is verified empty. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. The Product Owner reviewed and confirmed the corrected record on August 16, 2026. | **Approved v1.0.1** — corrected record confirmed by Product Owner |
| 1.0.2 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Closed the CBD-93 repository-header item in `FU-95-005` after the correction landed at CBD-93 v1.1.1 with the manifest blob record and audit constant re-frozen. `FU-95-005` is now fully closed. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. | Correction to approved v1.0.1; scope unchanged |
| 1.0.3 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Closed the `RV-95-006` link work in `FU-95-030` after a complete project-wide enumeration. Two further inverted links, `10004` and `10005`, were found on CBD-91 and corrected, bringing the batch to fourteen. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. | Correction to approved v1.0.2; scope unchanged |
| 1.0.4 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Closed the `RV-95-006` link work in `FU-95-030` in full. The CBD-77 → CBD-81 cluster was rebuilt on CBD-13's deliverable ordering, and the four heuristic-flagged links were confirmed correct by the Product Owner. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. | Correction to approved v1.0.3; scope unchanged |
| 1.0.5 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded as part of the CBD-14 close-out audit. Refreshed the `FU-95-029` current-state field, which still said no CBD-95 Confluence pages exist. All four are registered and published, and the August 18, 2026 readback confirmed repository parity across all twelve CBD-91–95 pages. The follow-up stays open because each later revision supersedes its published copy. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. | Correction to approved v1.0.4; outcomes unchanged |
| 1.0.6 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded as part of the CBD-14 close-out audit. Refreshed `FU-95-030`, whose current-state field still described the inverted-link work as open, and recorded the August 18, 2026 linkage pass: a pointer comment on each of the 37 distinct issues this register names as a target, with `FU-95-025` and `FU-95-027` identified as having no existing issue. `FU-95-030` stays open for closure evidence, exact versions, and status transitions. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. | Correction to approved v1.0.5; outcomes unchanged |
| 1.0.7 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded as part of the CBD-14 close-out audit. Recorded CBD-131 as the focused issue for `FU-95-025`, created August 18, 2026 under CBD-2 and blocked by CBD-95, with the `EG-93-009` closure elements as its acceptance criteria. The follow-up had no Jira home despite gating Private-MVP launch through `RG-94-011`. `FU-95-025` stays open: creating the issue closes no gate. No follow-up was added or removed, and no priority, closure evidence, blocker effect, or sequencing changed. | Correction to approved v1.0.6; outcomes unchanged |
