# CBD-72 — Intensive Permission Matrix Audit

| Field | Value |
| --- | --- |
| Status | **Audit complete — permission contradictions resolved; delivery-evidence findings remain** |
| Audit date | August 14, 2026 |
| Dispositions current through | August 15, 2026 |
| Scope | CBD-72 matrix, scenario catalog, traceability, local CBD-68–CBD-71 decisions, live Jira CBD-12/CBD-72 |
| Method | Cell-by-cell contradiction, ambiguity, lifecycle, least-privilege, testability, and implementation-complexity review |

## 1. Executive conclusion

The initial audit found governing-scope conflicts, predecessor-package inconsistencies, ambiguous lifecycle rules, duplicate scenario identifiers, and stale expectations. The permission contradictions and duplicate-ID findings have since been resolved through the recorded Product Owner dispositions. The package is not yet implementation-ready because formal acceptance-criteria extraction, deterministic fixture completion, remaining review gates, and final package approval are still outstanding.

No product decision was changed by this audit.

## 2. Blocking contradictions

### AUD-72-001 — Collaborator bank-connection authority conflicts with governing Jira — **Resolved August 15, 2026**

**Matrix:** Permissions 31–33 allow a Collaborator to authorize and manage personally authorized connections.

**Live CBD-12 and CBD-72 Jira:** Both explicitly prohibit Collaborator bank-connection administration. CBD-12 additionally says each **owner** controls only connections personally authorized by that owner.

**Impact:** This is a deliberate new product decision, not a clarification. Implementing the matrix without amending the parent and subtask would violate the current governing scope and acceptance basis.

**Disposition:** Product Owner approved formal change control. CBD-12/CBD-72 are amended to allow owners and Collaborators to self-authorize/manage only their own connections. Each connection has exactly one authorizer; a joint account may have multiple independent connections feeding one deduplicated logical account while consent, management, revocation, provenance, and audit remain separate. Any authorizer's membership loss stops only that connection's synchronization without transferring authority.

### AUD-72-002 — Collaborator full financial export conflicts with governing Jira — **Resolved August 15, 2026**

**Matrix:** Permission 20 allows Collaborators to export the full budget-space financial dataset.

**Live CBD-12 and CBD-72 Jira:** Both explicitly prohibit Collaborator unrestricted export.

**Impact:** Bulk extraction materially increases exfiltration, post-revocation retention, coercion, and privacy risk even when the actor can read the same facts interactively. “Time-limited” controls only server download access; it cannot expire a file after download.

**Disposition:** Product Owner approved formal change control. Collaborators are equal financial contributors, not budget-space administrators, and may perform a protected allowlisted full-financial export. Viewer and Accountability Partner self-service bulk export is categorically denied; permission 21's owner-authorized Viewer snapshot is a distinct sharing action. The Collaborator export requires reauthentication, an irreversible-download warning, current authorization at generation/download, encrypted recipient-bound delivery, short server retention, rate limits, and complete audit. Administrative/security data remains outside the Collaborator package.

### AUD-72-003 — Accountability Partner provisioning contradicts the comprehensive-role decision — **Resolved August 15, 2026**

**CBD-72/live Jira:** Accountability Partner is comprehensive and financially read-only within the accepted role boundary, may create personal acknowledgements and attributed comments, and cannot be configured like a partial Viewer.

**Local CBD-68/CBD-69 artifacts:** Multiple rules and fixtures still make Partner history or alert eligibility subject to explicit provisioning, including CBD-69 INV-69-25 and ALT-04.

**Impact:** The same active Partner may receive all financial context under CBD-72 but only provisioned category alerts/history under predecessor artifacts. Authorization and notification tests will disagree.

**Disposition:** Product Owner retained the comprehensive indivisible role. Accountability Partner now has all budget-space financial and schedule resources under a deterministic fixed field boundary, with no resource-level provisioning. Merchant/payee display name and ordinary shared financial context are included; credentials, full account numbers, connection management, other members' personal state, administrative/security data, privileged telemetry/support notes, and cross-space data are excluded. Viewer is required for partial sharing. CBD-68/CBD-69 active rules and scenarios are synchronized.

### AUD-72-004 — Live CBD-12 still contains superseded alert-control rules — **Resolved August 15, 2026**

**Current package decision:** Notification settings, alert instances, and acknowledgements are personal; the relationship-level alert control was removed.

**Live CBD-12 Jira:** Still contains obsolete references to owner control of Partner informational alerts and broader per-budget alert controls including pause/dismissal behavior.

**Impact:** The parent story conflicts with the synchronized CBD-69–CBD-72 package and could cause the removed capability to reappear in design or acceptance tests.

**Disposition:** MVP alert event types, trigger meanings, and numeric thresholds are fixed built-in behavior. Eligible in-app instances are mandatory. A recipient controls only personal external delivery preferences and may archive/dismiss only their own instance from the active view; no member can pause, suppress, dismiss, or configure another person's alert. Cooldown/deduplication is system behavior. Custom thresholds and arbitrary alerting are highest-priority post-MVP FF-009. CBD-12/CBD-72 and predecessor artifacts are synchronized.

## 3. High-priority ambiguities and lifecycle gaps

### AUD-72-005 — Connection-authorizer removal is inconsistent by role — **Resolved August 15, 2026**

Collaborator removal explicitly stops synchronization and preserves imported history. Co-owner removal invalidates access and says authority does not transfer, but it does not explicitly stop synchronization. The same connection must have the same lifecycle regardless of whether its authorizer was an owner or Collaborator.

**Disposition:** Resolved with AUD-72-001. One role-neutral invariant now requires active membership for the individual authorizer. Any authorizer membership loss stops synchronization through that connection, preserves imported history/provenance, denies private management, and requires new self-authorization by an eligible active member. Authority never transfers automatically; another independent connection for the same logical joint account may continue.

### AUD-72-006 — New-connection matrix notation is circular — **Resolved August 15, 2026**

Permission 31 uses `Authorizer` in the cell for “Authorize a new bank connection,” but no authorizer exists before creation. The notation currently means authority over a specific connection already authorized by that person.

**Disposition:** Permission 31 now uses `Allow (self-consent)` for Primary Owner, Co-owner, and Collaborator. `Authorizer` is reserved for management of an existing connection under permissions 32–33.

### AUD-72-007 — Budget-plan and category entities remain ambiguous — **Resolved August 15, 2026**

“Create/edit budgets and category plans,” “delete an entire budget plan,” and “create/edit/delete individual categories” do not define whether a budget plan is per period, versioned, recurring, or the current plan. Deleting a category with transactions, bills, goals, history, or future schedules has no disposition rule.

**Disposition:** The specification now defines budget space, schedule, period, category, category target, and budget plan. A plan is the target set for one draft/future period; only owners may discard a never-active draft, while active/historical plans are retained and corrected through versions. Confirmed categories are never hard-deleted. Owners and Collaborators may archive/restore them; archival preserves historical references, removes the category from new planning/categorization, prevents new assignments, and requires future dependencies to be resolved first. Customer-facing “Remove category” language must disclose that the action archives rather than erases the category.

### AUD-72-008 — Destructive financial-resource semantics are incomplete — **Resolved August 15, 2026**

Collaborators may delete bills, goals, categories, and manual transactions, but “normal confirmation” is undefined. The matrix does not state whether deletion is soft, reversible, blocked by dependencies, or represented as a tombstone in history.

**Disposition:** The shared contract now distinguishes draft discard, archive/restore, and manual-transaction removal. Confirmed bills and goals archive with retained history and stopped future behavior; only never-confirmed, never-active, unreferenced drafts may be discarded. Manual transactions may be removed from all ordinary access and calculations after explicit impact confirmation, but removal is blocked until active financial/reconciliation dependencies are resolved. Authorized users may restore for 30 days; afterward financial and child content may be purged while a minimal non-financial audit tombstone remains. Each operation rechecks authorization/state, recalculates affected results atomically, and records a complete lifecycle audit event.

### AUD-72-009 — Notes/comments lack a lifecycle and moderation model — **Resolved August 15, 2026**

The matrix grants “add notes/comments” but does not define edit/delete authority, author-only control, owner moderation, visibility inheritance, attachments, mentions/notifications, export inclusion, or behavior after role/revocation changes.

**Disposition:** Permission 11 is split into create, own-edit, own-remove, and cross-author moderation. Owners, Collaborators, and Accountability Partners may comment on readable supported targets; Viewers may not. Only an active original author with current target access may edit/remove their content, including an Accountability Partner. Cross-author moderation is denied to every budget-space role because ownership conveys no editorial authority. Visibility and report/export inclusion follow the target at request time; removal hides the body and retains a neutral tombstone only where thread context requires it; membership loss preserves attribution but removes mutation authority. Attachments and `@mentions` are excluded from MVP. Platform safety/support handling remains a separate exceptional process outside this permission model.

### AUD-72-010 — Viewer grant independence can create invalid or misleading views — **Resolved August 15, 2026**

Independent grants are privacy-safe but may be semantically unusable: a budget without category structure, a report without all required inputs, a bill without its budget context, or an account without transaction visibility. “Settings required to interpret” is not a deterministic dependency rule.

**Disposition:** Piecemeal per-item grants are replaced by one hierarchical Viewer visibility profile per membership: Full budget, Planning, Category group, or Account group. Category/Account profiles select reusable owner-managed same-type visibility groups and inherit their descendants plus a fixed safe interpretation envelope; mixed category/account modes are prohibited. Planning excludes actuals, Category group excludes account balances and renders partially visible splits as synthetic category activity, and Account group includes complete selected-account activity without whole-budget/category targets. Derived output requires complete authorized inputs, partial views are labeled, and incompatible reports are unavailable. Profile/group changes are owner-only, atomic, audited, and invalidate all derived access paths.

### AUD-72-011 — Alert event, recipient instance, and delivery are not cleanly separated — **Resolved August 15, 2026**

The package now treats alert instances and acknowledgements as personal, while shared financial changes generate the underlying alert fact and external delivery follows personal preferences. Some older artifacts still say “one alert” or store acknowledgement actor on the fired alert.

**Disposition:** The model now defines three correlated records. A budget-space shared event owns the built-in trigger, source/material revision, safe fact, event-level deduplication/cooldown, and informational resolution. One mandatory recipient-personal in-app instance per eligible recipient owns read, firm acknowledgement, archive/dismiss, eligibility closure, and personal retention. Separate channel delivery attempts own preferences, quiet hours/digest scheduling, privacy-safe destination reference, retry lineage, provider outcome, and short operational retention. Informational resolution closes all instances and queued attempts; firm acknowledgement affects only one instance. Delivery retries create neither new events nor new instances. Layer-specific audit correlation preserves privacy.

### AUD-72-012 — Primary-transfer recipient eligibility is underspecified — **Resolved August 15, 2026**

“Eligible active member” could include a Viewer or Accountability Partner. The transfer changes a formal financially read-only support relationship directly into ownership and may bypass the ordinary role-change consent explanation. The former one-Co-owner limit also allowed Co-owner occupancy to block transfer and create operational lockout risk.

**Disposition:** The Product Owner removed the Co-owner count limit and made every other active role eligible for direct transfer acceptance, including Co-owner, Collaborator, Viewer, and Accountability Partner. Pending, inactive, revoked, expired, invited-only, and self-transfer recipients are ineligible. The recipient must authenticate and accept a versioned disclosure of full access, Primary powers, prior-role consequences, and unchanged connection authority; the current Primary separately reauthenticates and confirms. Commit is atomic and rechecks both sessions and current versions. The recipient becomes sole Primary, the outgoing Primary becomes a Co-owner, and existing Co-owners remain unchanged. Viewer profile/groups or Partner role state closes; required consent/audit history and personal preferences remain; derived artifacts and alert eligibility are recalculated. Bank-connection authority never transfers automatically.

### AUD-72-013 — Administrative/security export scope is too broad and vague — **Resolved August 15, 2026**

The Primary-only export combines membership administration and authorized security evidence without an allowlist, redaction model, retention rule, or distinction between customer-visible audit and privileged internal telemetry.

**Disposition:** Rename the capability customer administrative-history export and reserve it to the current Primary Owner. A versioned closed allowlist includes only customer-visible, budget-space-scoped invitation/membership lifecycle, roles and Viewer scope, ownership changes, and protected-action outcomes. Redact before serialization and expose denied actions only through safe categories. Categorically exclude authentication/session/device/network evidence, IP addresses, connection events/configuration, personal state, financial data, internal reasons, provider payloads, staff identities, fraud/abuse/risk signals, detection logic, privileged telemetry, and support notes. Require fresh reauthentication, generation/download authorization, recipient-bound encryption, rate limits, audit, and a non-renewable package lifetime no longer than 24 hours. Package expiry does not extend or alter source-record retention.

### AUD-72-014 — “Read-only Accountability Partner” conflicts linguistically with allowed writes — **Resolved August 15, 2026**

The Partner can comment and acknowledge alerts. These are non-financial interaction writes, but “comprehensive read-only role” can be interpreted as denying every mutation.

**Disposition:** Standardize the role as financially read-only and explicitly permit personal firm-alert acknowledgements and attributed comments on supported readable targets. These non-financial interaction writes remain personal/attributed and cannot mutate financial, schedule, permission, membership, connection, or configuration state. Viewer remains the fully read-only role.

## 4. Decisions that materially complicate implementation or safety

### CMP-72-001 — Comprehensive, indivisible Accountability Partner access

This simplifies role evaluation but maximizes disclosure. It requires exceptional clarity during invitation/acceptance and strong revocation, preview, masking, notification, and coercion safeguards. A user seeking partial support must understand they need Viewer instead.

### CMP-72-002 — Collaborator full financial export

This converts broad interactive access into one-step portable extraction. It complicates privacy review, audit, export schema versioning, asynchronous authorization checks, secure file delivery, revocation expectations, and customer messaging. Post-download revocation is impossible.

### CMP-72-003 — Collaborator-owned bank connections

This supports a realistic shared-couple use case, but creates orphaned-connection, membership-removal, consent revocation, sync ownership, provider-token lifecycle, and account-unlink semantics that did not exist under owner-only connections.

### CMP-72-004 — Viewer hierarchical profiles plus noninterference — **Reduced by AUD-72-010**

Replacing item grants with four exclusive profiles removes the combinatorial grant matrix and invalid standalone-resource views. Material complexity remains: Account/Category visibility groups, interpretation envelopes, synthetic activity for partially visible splits, report completeness predicates, version-bound caches/jobs, and atomic invalidation must still be implemented consistently across every derived system.

### CMP-72-005 — Three-layer alert state — **Clarified by AUD-72-011**

The clarified boundary prevents cross-recipient state mutation and retry duplication, but still requires event-level deduplication, idempotent recipient fan-out, authorization-change handling, separate layer retention, delivery retry lineage, and privacy-safe correlation across services.

### CMP-72-006 — Split reconciliation

CBD-69 allows one-to-many or many-to-one pending/posted splits with mismatched totals, while CBD-68 defers complex income reconciliation cardinalities. The authorization model must distinguish transaction reconciliation from income reconciliation so “split” cannot be applied to the wrong domain.

### CMP-72-007 — Immediate revocation across all derived artifacts

This is security-correct but operationally demanding. It requires version-bound cache keys, queued-job cancellation or output suppression, download-time authorization, notification suppression, open-work invalidation, and cross-service propagation guarantees.

## 5. Supporting-artifact integrity findings

1. **Resolved August 15, 2026:** The ten duplicate scenario IDs were eliminated. Weaker coverage was consolidated into the retained approved scenarios; genuinely distinct cases were renumbered `ROLE-04`, `VIEW-07`, `PART-06`, and `CONN-06`.
2. **Resolved August 15, 2026:** The contradictory Collaborator unrestricted-export/connection-repair scaffold was removed. Connection cases now follow actor-specific authorizer authority, and the retained creation scenario expressly permits Collaborator self-consent.
3. **Resolved August 15, 2026:** `OD-72-03` is closed. Permission 21 is an owner-authorized, recipient-bound Viewer snapshot—not Viewer self-service bulk export. Matrix §5.8 now defines profile-specific semantic content, exclusions, confirmation, binding, invalidation, 24-hour expiry, and audit; implementation may finalize only the physical serialization schema.
4. **Resolved August 15, 2026:** Document headers now match the current artifact versions and distinguish approved permission decisions from remaining fixture, formal-criteria, review-gate, and final-approval work.
5. Many scenarios remain `To detail`, so “approved matrix” currently lacks complete deterministic negative-test evidence.
6. **Partially resolved August 15, 2026:** Scenario-ID uniqueness and affected traceability references were mechanically checked after normalization. A complete bidirectional criterion-to-scenario coverage check remains required when formal acceptance criteria are extracted.

## 6. Recommended disposition order

1. Resolve formal change control for Collaborator export and bank connections in CBD-12/CBD-72 Jira.
2. Reconcile the Accountability Partner provisioning conflict and remove the obsolete parent-story alert-control language.
3. Define the unified connection-authorizer loss lifecycle.
4. Define budget/category/resource deletion semantics and comment lifecycle.
5. Define Viewer minimum disclosure envelopes and the alert event/instance/delivery model.
6. Clarify transfer eligibility and administrative-export allowlists.
7. **Scenario normalization and OD-72-03 closure completed August 15, 2026.** Complete the remaining fixtures and rerun full bidirectional traceability checks.
8. Only then bump the package version and request final approval.

## 7. Audit verdict

**Permission review:** complete.

**Contradiction-free:** yes within the currently audited and approved permission scope; remaining review gates may still identify new findings.

**Implementation-ready:** no.

**Primary blockers:** formal acceptance-criteria extraction, deterministic fixture completion, remaining recovery/deletion and specialist review gates, bidirectional traceability, and final package approval.

**Recommended next action:** Extract and map the formal CBD-72 acceptance criteria, complete deterministic scenario fixtures, and then rerun the full bidirectional consistency review before final package approval.
