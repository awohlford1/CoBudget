# CBD-94 — Risk, Mitigation, and Security/Privacy Requirement Register

| Field | Value |
| --- | --- |
| Status | **Approved v1.0 — provider-independent CBD-94 baseline.** Approval fixes the risk model, requirements, and gates. It accepts no residual risk, closes no release gate, and closes no evidence or specialist gap. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Jira | [CBD-94](https://cobudget.atlassian.net/browse/CBD-94) |
| Parent | [CBD-14](https://cobudget.atlassian.net/browse/CBD-14) |
| Consumes | CBD-91 v1.0.1; CBD-92 approved v1.0; CBD-93 approved v1.1 |
| Repository baseline | `be20177` on `main` |
| Last updated | August 16, 2026 |

## 1. Purpose, authority, and completion boundary

This register converts the approved CBD-92 technical-threat model and CBD-93
human-abuse analysis into formal risks, required mitigations, normative
security/privacy requirements, verification routes, ownership, target phases,
residual-risk decisions, and explicit Private-MVP and public-launch release
effects.

This document does not reopen approved CBD-11 schedule behavior or approved
CBD-12/CBD-72 authorization, role, consent, visibility, notification, audit,
and lifecycle behavior. A mitigation may enforce, verify, restrict the release
scope of, or identify a material conflict with an approved behavior. It may not
silently replace that behavior. Candidate `SG-93-*` or `RI-93-*` behavior that
would change CBD-12 remains unapproved until its accountable product route
records a decision.

This document is an internal, provider-independent product/security analysis. It
is not implementation evidence, legal advice, penetration testing,
certification, survivor-informed validation, an independent security review,
or launch approval. Jira remains authoritative for workflow status, assignee,
priority, dates, links, and current follow-up ownership. Repository documents
are authoritative while this document change is active; Confluence remains
read-only until the repository change is merged to `main`.

CBD-94 is complete only when the companion verification inventory and
traceability record prove that every source identifier has one terminal route,
every required mitigation has an owner/phase/verification method, and every
release effect is scoped without ambiguity.

## 2. Frozen source baseline

| Source | Frozen version | Required use in CBD-94 |
| --- | --- | --- |
| `docs/cbd-91-private-mvp-data-inventory.md` | v1.0.1; Git blob `1e1134415915238752440da4b2e4acaa293d20e6` | `DI-91-001–076`, `DF-91-001–013`, copy/noninterference rules, `EG-91-001–024`, and approved lifecycle/custody constraints |
| `docs/cbd-92-system-flow-technical-threat-model.md` | approved v1.0; Git blob `7c69addb47f843e080827ba8241636cb948ccad5` | 45 `TH-92-*` threats, 17 boundaries, 15 entry points, nine normative contracts, and `RF-92-001–012` |
| `docs/cbd-92-acceptance-criteria-traceability.md` | approved v1.0; Git blob `6938bbb0ca8eafad11b4712f1b3d35da432723af` | Authoritative flow/boundary relation, actor/entry-point coverage, and CBD-92 limitation/approval record |
| `docs/cbd-93-privacy-coercion-abuse-analysis.md` | approved v1.1; Git blob `b84aa6f2aed66c7ffad35a4fc58eead1602bcf65` | 86 `AB-93-*` scenarios, 96 active safeguards, `EG-93-001–010`, 13 accepted-residual scenario rows represented by 12 residual-register entries, and `RI-93-001–019` |
| `docs/cbd-72-*` suite | Product Owner-approved controlling baseline | Current role, permission, invitation, visibility, alert, lifecycle, ownership, connection, export, audit, and non-escalation behavior |
| CBD-94 Jira description | Live read August 16, 2026 | Purpose, five deliverables, six acceptance criteria, dependency, and estimate boundary |

Ranges in this document are inclusive. An identifier range is shorthand for
every individual stable ID in the range; the companion traceability record
expands and audits coverage so a missing interior ID cannot be hidden by range
notation.

Within one code-formatted citation, a slash-separated suffix inherits the last
fully written prefix and identifies discrete IDs, not a range. For example,
`SR-94-004/010` means exactly `SR-94-004` and `SR-94-010`; `SR-94-004–010`
means every ID from 004 through 010 inclusive.

## 3. Formal risk method

### 3.1 Risk statement

Every risk uses the form: **Given the named preconditions, an identified actor
or failure can perform/cause an event against named people/assets, resulting in
the stated harm.** The row must distinguish inherent exposure, existing
controls, required mitigation, and the residual remaining after verified
mitigation.

Normal `AB-93-*` scenarios may be control-positive evidence rather than
independent risks. They still map to a risk family and a verification fixture;
they are never silently discarded.

### 3.2 Likelihood scale

| Score | Name | Definitive meaning |
| --- | --- | --- |
| 1 | Rare | Requires several independent exceptional failures, extraordinary privileged collusion, or a condition not expected during the product lifetime. |
| 2 | Unlikely | Technically feasible, but requires uncommon access, timing, or conditions not present in ordinary use. |
| 3 | Possible | A credible actor or ordinary system failure can reach the condition during expected Private-MVP operation. |
| 4 | Likely | The condition is readily reachable, likely to be attempted, or expected to recur without a dedicated control. |
| 5 | Almost certain | The disclosure/harm is inherent in approved ordinary behavior or is continuously reachable by design. |

Likelihood rationale MUST cite actor access, required preconditions, reachable
surfaces, expected frequency, existing controls, and evidence quality. Low
evidence confidence never means low likelihood. If evidence cannot support one
score, the row uses the highest credible score and remains `Evidence pending`.

### 3.3 Impact scale

| Score | Name | Definitive meaning |
| --- | --- | --- |
| 1 | Negligible | Transient inconvenience; no protected-data, durable authority, or material agency consequence. |
| 2 | Minor | Limited and reversible harm to one subject or workflow without high-sensitivity disclosure. |
| 3 | Moderate | Meaningful privacy, integrity, availability, accessibility, or agency harm requiring intervention. |
| 4 | Major | Substantial financial/privacy harm, durable lockout, meaningful cross-space disclosure, or multi-person effect. |
| 5 | Severe | Systemic tenant breach, irreversible S3/S4 disclosure, authority compromise, destructive lifecycle failure, unsafe coercion consequence, or unrecoverable evidence loss. |

Impact rationale MUST name affected people, data sensitivity, authority,
scope, reversibility, duration, copy propagation, and downstream harm.

### 3.4 Priority and overrides

`inherent score = likelihood × impact` and `residual score = post-control
likelihood × post-control impact`.

| Score | Priority |
| --- | --- |
| 20–25 | Critical |
| 12–19 | High |
| 6–11 | Medium |
| 1–5 | Low |

Two mandatory overrides apply:

1. a credible cross-budget/cross-profile authority or S4 confidentiality
   breach is at least **High**; and
2. terminal deletion corruption, unrecoverable authority resurrection, or
   systemic authentication compromise is **Critical**.

### 3.5 Dispositions

| Disposition | Meaning and required evidence |
| --- | --- |
| `Blocking` | Private MVP or the named release surface MUST NOT ship until the mitigation is implemented and verification passes. |
| `Accepted` | The named authority knowingly accepts a precisely stated residual after verified controls, with scope, review date, expiry if any, and reopening triggers. |
| `Deferred` | The capability is excluded from the current release and has a follow-up owner, rationale, evidence gate, and target phase. Deferral is not risk acceptance. |
| `Transferred` | A named product, provider, legal, operational, or specialist route owns the decision/evidence. Transfer does not unblock release unless an approved interim constraint removes the affected capability. |
| `Evidence pending` | A control direction exists, but architecture, implementation, provider, test, operating, or specialist proof is absent. |
| `Resolved` | The causal condition is eliminated and verified across all affected surfaces. UI hiding alone never qualifies. |
| `Not independently material` | A source row is a positive fixture or is wholly subsumed by a named risk with identical actor, asset, harm, control, phase, owner, disposition, and verification route. |

Each `RK-94-*` family has exactly one **workstream disposition**. The individual
source-finding disposition in the companion traceability record is controlling
for that `TH-92-*` or `AB-93-*` row and may differ from the workstream
disposition. `Release effect` records the exact scope that stays blocked while
a transferred or evidence-pending dependency is open.

### 3.6 Acceptance authority

| Residual class | Minimum acceptance authority |
| --- | --- |
| Critical security, cross-tenant, authentication, lifecycle, or recovery risk | For Private MVP: Product Owner after written accountable-security recommendation and exact scope/expiry/reopening record. Before public product launch, the independent security review required by `RG-94-015` must also cover the acceptance. |
| High security/privacy risk | Product Owner after written security/privacy recommendation from the accountable function |
| Coercion, surveillance, or survivor-safety risk | Product Owner after qualified advocacy/privacy input; legal input where notice, preservation, deletion, or customer claims are implicated |
| Legal/compliance uncertainty | Cannot be accepted by internal product/engineering judgment alone; jurisdiction-scoped counsel disposition is required |
| Provider residual | Product Owner after accountable architecture/security recommendation and provider-contract/control evidence |
| Medium/Low operational residual | Named accountable operational owner, unless another row or law requires Product Owner/specialist approval |

Where several classes apply, their evidence/authority requirements are
cumulative. `RG-94-015` adds independent review at public launch; it is not
silently pulled into Private-MVP acceptance.

No residual in this version is newly accepted. CBD-93's “accepted
residual” label records harm inherited from an approved product decision; it
does not substitute for CBD-94 formal rating and acceptance.

### 3.7 Aggregation and source-row precedence

The three records form one normalized risk model with deterministic
precedence:

1. the approved CBD-92/CBD-93 source row controls the actor, condition,
   affected people/assets, governing input, and source safeguards;
2. the companion individual ledger controls materiality and terminal
   disposition for that source finding;
3. the `RK-94-*` row controls the conservative family rating, accountable
   owner, target phase, required mitigation, verification family, and release
   effect for material source rows; and
4. a control-positive row marked `Not independently material` is a mandatory
   fixture only. It has no inherited likelihood, impact, residual score, or
   acceptance obligation.

A family may aggregate different source dispositions only when the findings
share one mitigation workstream, one accountable owner, one target phase, one
verification family, and one release effect. The family workstream disposition
does not overwrite a source-row terminal disposition. If a material source
finding cannot use the family rating rationale without qualification, it MUST
receive an explicit source-rating override or be split into a new family.

For a requirement that cites several risks, the first listed `RK-94-*` is the
accountable owner and target phase; later risks identify consulted workstreams.
No plus-separated list of functions constitutes shared accountability.

The §4 requirement column and the §6 `Principal risk/source` column encode two
different relations and are deliberately not symmetric. The §4 column is the
**dependency set**: every requirement a family's mitigation depends on,
including requirements another family owns. The §6 column is the **ownership
set**: the accountable family first, then consulted workstreams. A requirement
may therefore appear in a family's §4 mitigation set without naming that family
in §6. Where the two differ, §6 controls ownership, phase, and accountability,
and §4 controls what that family's release effect depends on. An audit MUST
treat a §4-only edge as a dependency edge rather than a traceability defect.

### 3.8 Escalation, stop-ship, and reopening rules

| Trigger | Mandatory action | Decision authority and deadline |
| --- | --- | --- |
| New or failed **Critical** finding | Stop the affected release surface immediately; preserve safe evidence; notify the accountable owner, Security, and Product Owner. | Same-business-day triage. Work resumes only after verified closure or acceptance under §3.6. |
| New or failed **High** finding | Block the affected surface unless an already-approved constraint removes the capability; create a traced decision/evidence record. | Triage within two business days; Product Owner acceptance is required where §3.6 assigns it. |
| Medium/Low finding | Track owner, phase, evidence, and release effect; do not let it disappear through aggregation. | Accountable owner disposition before the next affected release. |
| Missing legal/specialist/provider evidence | Apply the exact jurisdiction, claim, provider, or surface gate. | No engineering or internal-product waiver may substitute for the authority named in §3.6. |
| Failed, expired, invalidated, or materially changed evidence | Reopen the affected risk and gate; prior Pass/Accepted status is no longer release evidence. | Re-review before the affected release proceeds. |

Mandatory reopening triggers are: changed product authority or lifecycle;
changed provider, architecture, schema, policy, key topology, channel, locale,
or operating tool; a control failure or incident; a new affected population or
jurisdiction; expired acceptance; or evidence that no longer covers the
released build/configuration.

## 4. Prioritized risk register

The source column is exhaustive over `TH-92-001–045` and
`AB-93-001–086`. Section 5 expands the terminal route for every risk and
safeguard family.

A risk-family row groups findings that share one principal mitigation,
accountable owner, phase, verification family, and release effect. It does not
erase source-specific actors, affected people, assets, harms, or terminal
dispositions. The complete row for a material source is the normalized join of
its authoritative CBD-92/CBD-93 row, its individual terminal entry in the
companion traceability record §5.3, and the `RK-94-*` family row below under
§3.7 precedence.

| Risk | Risk statement and affected people/assets | Source findings | Existing controls | Inherent L/I/score | Required mitigation and requirements | Accountable owner / contributors / phase / verification | Workstream disposition | Release effect and residual position |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RK-94-001 | A forged, replayed, stolen, stale, or misbound authentication, recovery, session, assurance, origin, or protected-action request can grant another subject's authority or execute a Critical action. Affects every account/member and `DI-91-001–003`, `005`, `047–048`, `052–053`. | `TH-92-001–004` | Managed-IdP direction; fresh-assurance and server-authorization rules; no factor secrets in CoBudget | 3/5/**15 High**; `TH-92-001/002/004` are **Critical by override** | `SR-94-001–006`, action-bound assurance, session rotation/revocation, origin/CSRF defense, account-switch isolation, recovery non-escalation | Accountable: Security; contributor: Identity / before authenticated feature release / `VT-94-001–008` | Blocking | All authenticated customer surfaces blocked until identity architecture and negative tests pass; residual unscored pending provider choice and `EG-91-004/010`. |
| RK-94-002 | Invitation enumeration, intercepted/replayed locators, or partial membership commits can disclose relationships or create membership without current recipient consent and inviter authority. Affects invitees, members, `DI-91-005–007`, `039`, `054`, `065`. | `TH-92-005–007` | Pending/rejected/expired states grant nothing; invitation locator is non-authoritative; audit/notice/token-invalidation rules | 4/5/**20 Critical** | `SR-94-007–011`, uniform responses, recipient binding, one-time/versioned locators, commit-time eligibility, transactional state/audit/notice, `RL-92-*` values | Accountable: Identity; contributor: Collaboration / before invitations / `VT-94-009–017` | Blocking | Invitation surface blocked; residual requires CBD-73 invitation-copy and re-contact decisions plus provider evidence. |
| RK-94-003 | A coarse role check, IDOR, stale authority, cache/index omission, hidden-field residue, error/count/timing oracle, service confused-deputy, or concurrent stale commit can cross subject/profile/budget/resource/field/purpose boundaries. Affects all scoped S2–S4 data and every role. | `TH-92-008–013`, `TH-92-017–018` | CBD-72 matrix, default denial, versioned authority, `SA-92-*`, complete-input/withholding rules | 4/5/**20 Critical** | `SR-94-012–021`, typed policy decisions, tenant/subject/resource/field keys everywhere, purpose/effect enforcement, commit-time versions, differential noninterference | Accountable: Security Architecture; contributor: Application Architecture / before protected API, worker, search, report, or cache release / `VT-94-018–035` | Blocking | Every protected/derived surface blocked until enforcement and tests pass; `RF-92-001/004` remain open. |
| RK-94-004 | Forged provider callbacks, ambiguous financial identity, stale/incorrect profile links, normalization/projection errors, or over-broad unlink/disconnect can transfer authority, leak across spaces, lose provenance, or terminate the wrong connection. | `TH-92-014`, `TH-92-019`, `TH-92-035–037`; control-positive `AB-93-084` | One profile per account subject; individual connection authority; explicit links; immutable source provenance; no authority inheritance | 3/5/**15 High** | `SR-94-022–030/146`, state/nonce/callback binding, reversible provenance graph, confirmation/non-association evidence, per-connection custody, split/recompute and space-loss/subject-loss tests | Accountable: Financial Data; contributors: Architecture, Security / before provider integration / `VT-94-036–053`, `VT-94-265/268–269` | Blocking | Synchronized financial data blocked pending provider evidence, physical schema, approved joint-association copy, and `EG-91-005/012/013/021–022`; manual accounts may proceed if isolated. |
| RK-94-005 | Forged/replayed/reordered jobs, provider volume, poison data, unbounded retry, resource exhaustion, mixed calculations, or conflated event/recipient/delivery state can corrupt facts, duplicate effects, create enumeration or deny service. | `TH-92-015`, `TH-92-023`, `TH-92-034`, `TH-92-038–040` | Transactional-outbox direction; `SA-92-*`; idempotency/audit rules; `RL-92-*` shape | 4/4/**16 High** | `SR-94-031–038`, typed signed/versioned envelopes, idempotency/effect ledger, ordering/expiry/DLQ, bounded retry, per-surface ceilings, atomic calculation replacement, separate alert layers | Accountable: Reliability; contributor: Architecture / before background workers / `VT-94-054–068` | Blocking | Customer-data workers and bounded surfaces blocked until queue contracts and rate values pass; `RF-92-003/012` open. |
| RK-94-006 | A provider/application secret, callback credential, cursor, package key, or signing material can escape into ordinary stores, jobs, logs, support, backups, or clients and grant durable external/application access. | `TH-92-016` | Secret-prohibited data columns; field-encryption direction; no routine staff content | 3/5/**15 High** | `SR-94-039–043`, inventory/allowlist, separated KMS custody, envelope encryption, rotation/revocation, redaction/canary scanning, backup exclusion | Accountable: Security; contributor: Infrastructure / before any provider or production secret / `VT-94-069–076` | Blocking | Provider and production release blocked; residual pending topology/KMS/provider evidence. |
| RK-94-007 | Alert evaluation, queued delivery, template/provider metadata, destination compromise, callback behavior, lock-screen/mirrored-device exposure, or channel reuse as authority can disclose protected context, suppress safety notices, or mutate another person's state. | `TH-92-020–022`, `TH-92-041` | Mandatory in-app instance; opt-in external channels; `NT-92-*` content-free push/SMS; `EM-92-*` minimal email; personal delivery state | 4/4/**16 High** | `SR-94-044–054`, fixed schemas, send-time authorization, event/instance/attempt separation, callback non-authority, destination lifecycle, compromised-channel retirement route, custody copy | Accountable: Notifications; contributors: Privacy, Identity / before each channel / `VT-94-077–096` | Transferred | In-app may ship after its own controls; each external channel stays blocked pending provider schema/tests, CBD-74 decisions, copy/accessibility, and `EG-93-010`. |
| RK-94-008 | Export scope/type/recipient/assurance substitution, mixed snapshots, enumerable or transferable packages, stale downloads, or incomplete audit can irreversibly disclose other people's financial/administrative data. | `TH-92-024–026` | Semantic allowlist ceilings; recipient binding; reauthentication; ≤24h admin/Viewer packages; permanent-copy disclosure | 4/5/**20 Critical** | `SR-94-055–062`, three package schemas, frozen authorization snapshot, package integrity/provenance, download-time recheck, non-enumerable locator, rate limit, custody acknowledgement | Accountable: Security; contributors: Data Lifecycle, Product / before exports / `VT-94-097–111` | Blocking | All exports blocked until schemas/storage/lifetime/tests close `EG-91-017`; already-approved archived read-scope export still requires evidence. |
| RK-94-009 | Staff, diagnostics, analytics, audit, or exceptional operations can exceed `OP-92-*`, capture customer content, forge/omit evidence, reveal hidden customer state, or evade dual control. | `TH-92-027–030`, `TH-92-042` | Product analytics disabled; content-free routine support; dual-controlled JIT incident/recovery exception; customer-audit boundaries | 3/5/**15 High** | `SR-94-063–074`, telemetry schemas, mediated no-impersonation tooling, duty separation, tamper/omission evidence, personal-state segregation, post-use review/notice, hard no-transfer support rule | Accountable: Security; contributors: Operations, Privacy / before production operations or protected audit / `VT-94-112–132` | Blocking | Protected workflows, exceptional access, security telemetry, and comments remain blocked until schemas/tool evidence and exercises exist; routine content-free support only. |
| RK-94-010 | Backup/restore or lifecycle orchestration can omit data, include secrets, partially delete, resurrect sessions/roles/provider authority, corrupt terminal deletion, or restore outside separated custody. | `TH-92-031–033`, `TH-92-043–045` | `PA-92-*`; CBD-72 archive/restore/delete state machines; separated recovery custody; deletion cannot be claimed beyond controlled copies | 3/5/**15 High**; `TH-92-032/033/044` are **Critical by override** | `SR-94-075–084`, per-class disposition matrix, dependency-ordered lifecycle ledger, provider/processor completion, backup expiry, isolated restore reconciliation, no-authority-resurrection tests | Accountable: Data Lifecycle; contributors: Security, Infrastructure, Legal / before deletion claims or recovery release / `VT-94-133–153` | Blocking | Terminal deletion, personal-account deletion/restoration, and production recovery blocked pending `RF-92-006/010`, legal/provider evidence, and rehearsal. |
| RK-94-011 | Coercion can turn valid consent, reauthentication, ownership transfer, invitation, export, provider connection or joint-account association, or scope reduction into evidence/means of surveillance and control. | `AB-93-001–010`, `AB-93-085` | Atomic/versioned actions; audit; individual connection authority; current role boundaries; irreversible-copy rules | 4/5/**20 Critical** | Adopt baseline `SG-93-*` controls through `SR-94-085–092/146`; route observer-removal, reversal, narrower-role, invitation-disclosure, alternate-channel, and joint-projection candidates through `RI-93-001–003/009/011/019`; qualified safety/copy review | Accountable: Product; contributors: Privacy, Safety / before collaboration surface / `VT-94-154–166`, `VT-94-266/268–269` | Transferred | Current model remains authoritative. Affected invitation/role/transfer/export/joint-association surfaces require baseline controls; candidate behavior is blocked from implementation pending the named CBD-12/73/75 decisions. |
| RK-94-012 | Approved broad role visibility, repeated reads/search, merchant/payee data, schedule timing, or asymmetric membership authority can become continuous unwanted monitoring of subjects and non-user third parties. | `AB-93-011–022` | Fixed role boundaries; Viewer profiles; withholding over misleading partial reports; no enrichment/analytics on counterparties | 5/5/**25 Critical** | `SR-94-093–101`, exact role disclosure, least-scope defaults, protected-read/search evidence decision, no counterparty enrichment/correlation, honest residual language; route `RI-93-001/002` and `EG-93-006/008` | Accountable: Product; contributors: Privacy, Security / before broad collaboration roles/search / `VT-94-167–180` | Transferred | Accountability Partner and scoped-read surfaces remain governed by CBD-72; formal residual acceptance and specialist decisions required before launch claims. |
| RK-94-013 | Notifications on shared/monitored channels can reveal use/timing, permit third-party suppression, expose provisional facts, or force a subject to re-enter a monitored account to preserve authority. | `AB-93-023–032` | Content-free external bodies; mandatory in-app instance; personal archive/dismiss; lifecycle notices unsuppressible | 5/4/**20 Critical** | `SR-94-044–054`, safety-critical copy, per-destination retirement, recovery-factor separation; route `RI-93-012–015`, `EG-93-001/003/010` | Accountable: Notifications; contributors: Privacy, Safety, Identity / before external and lifecycle notices / `VT-94-077–096`, `VT-94-181–187` | Transferred | External/lifecycle notice surfaces blocked to the extent named specialist/copy/channel gates are unmet; mandatory-notice baseline remains unchanged. |
| RK-94-014 | Alerts, acknowledgements, comments, legible budget indicators, and accountability language can facilitate shame, forced acknowledgement, harassment, or unilateral narrative control. | `AB-93-033–038` | Acknowledgement is personal and non-authoritative; no spending approval/blocking; current comment permissions and attribution | 5/4/**20 Critical** | `SR-94-102–109`, prohibit coercive success framing, preserve noninterference, author correction/history, safety copy; route comment remedy through `RI-93-008` and platform-safety gate `EG-93-009` | Accountable: Product; contributors: Content Design, Platform Safety / before alerts/comments / `VT-94-188–200` | Blocking | Comments unshippable until platform-safety operating model and exercises pass; alerts require copy/noninterference tests. |
| RK-94-015 | Retaliatory removal, role/profile reduction, ownership/lifecycle or joint-projection dissolution asymmetry, connection loss, support refusal, or deletion can lock a person out of shared records, erase access they depend on, or re-itemize a jointly presented account without contributor agreement. | `AB-93-039–048`, `AB-93-086` | Immediate revocation; notices; Primary-only ownership rules; archived read-scope export; no support-mediated transfer; `CA-92-011` unilateral dissolution | 5/5/**25 Critical** | `SR-94-110–120/147`, mutation-time authority, before/after notice, bounded self-record/export paths, deterministic lifecycle; route `RI-93-004–008/017/019` and `EG-93-007/009` | Accountable: Product; contributors: Privacy, Safety, Data Lifecycle / before role/lifecycle/removal/joint-projection release / `VT-94-201–218`, `VT-94-267/270` | Transferred | Current rules remain, including `CA-92-011`; removal/deletion/comment/joint-projection surfaces are blocked where current safeguards/evidence are insufficient. No staff bypass or unapproved contributor position may be introduced. |
| RK-94-016 | Stale access or copies outside custody can preserve data after removal, unlink, archival, deletion, channel change, or package expiry, while inaccurate copy promises undermine informed consent. | `AB-93-049–054` | Server invalidation; source/history rules; recipient-controlled-copy limitation; archive snapshot | 5/5/**25 Critical** | `SR-94-055–062`, `SR-94-075–084`, `SR-94-121–124`; per-surface invalidation, custody boundaries, accurate deletion/export copy, attributed-content decision via `RI-93-018` | Accountable: Data Lifecycle; contributors: Privacy, Content Design / before export/removal/deletion claims / `VT-94-097–111`, `VT-94-133–153`, `VT-94-219–224` | Evidence pending | Downloaded copies remain a real residual. Controlled-copy claims blocked pending disposition/evidence; no promise of remote erasure. |
| RK-94-017 | Metadata, timing, counts, withheld outputs, lifecycle notices, connection-health reasons, aggregates, and existence signals can reveal hidden behavior or data even when fields are masked correctly. | `AB-93-055–062` | Uniform/timing-equalized refusal; coarse inactive eligibility; withheld-report labeling; content-free notifications | 5/4/**20 Critical** | `SR-94-016–021`, `SR-94-125–129`, timing/count/shape equivalence, minimum necessary reason classes, non-pollable lifecycle, copy stating unavoidable inference; advocacy/privacy review of notice residual | Accountable: Privacy; contributors: Security, Product / before derived/lifecycle surfaces / `VT-94-025–035`, `VT-94-225–235` | Evidence pending | Formal residual acceptance pending. Any field-hiding-only “resolution” is prohibited. |
| RK-94-018 | A person with legitimate access to several spaces, or an unwanted inviter, can correlate subjects across spaces or use invitations as a persistent re-contact channel. | `AB-93-063–066` | Tenant-scoped server processing; no server-side cross-space analytics; current invitation expiry/rejection | 5/4/**20 Critical** | `SR-94-130–135`, no global identity/resource disclosure, no cross-space correlation; route cross-space recipient/inviter limits, block, and persistent-decline candidates through `RI-93-010` | Accountable: Identity; contributors: Collaboration, Privacy / before multi-space/invitations / `VT-94-236–246` | Transferred | Human memory across authorized views is an unavoidable residual; candidate re-contact controls remain absent pending CBD-73 decisions. |
| RK-94-019 | Concentrated, aggregated, or over-broad audit and administrative history can become a relationship/activity surveillance record while the subject lacks access to evidence about actions taken against them. | `AB-93-067–070` | Target-readable history; Primary administrative history; internal/customer evidence separation | 5/4/**20 Critical** | `SR-94-063–074`, `SR-94-136–140`, exact audience/field/aggregation limits, self-record route decision `RI-93-007`, search/export noninterference | Accountable: Security; contributors: Privacy, Product / before audit/history / `VT-94-112–132`, `VT-94-247–254` | Transferred | Administrative-history surface blocked pending schema and audience verification; self-record candidate remains unapproved. |
| RK-94-020 | Malicious/mistaken operators or support contacts can abuse sensitive submissions, impersonation narratives, exceptional grants, or undocumented paths to expose content or mutate customer authority. | `AB-93-071–074`, `AB-93-081` | `OP-92-*`; content-free support; no support-mediated transfer; support notes excluded from customer history | 3/5/**15 High** | `SR-94-063–074`, hard tool denial, no impersonation, purpose-bound grants, safe abuse submission handling, redaction, separated evidence, training/exercises | Accountable: Operations; contributors: Security, Privacy / before support/incident operations / `VT-94-112–132` | Blocking | Only verified content-free routine support may operate; exceptional access/recovery blocked pending `RF-92-008`. |
| RK-94-021 | Ordinary or mistaken role assignment, export, invitation, former-member, archive, or personal-account departure behavior can over-share or fail because the role/copy/lifecycle consequence is misunderstood despite technically correct enforcement. | `AB-93-075–080`, `AB-93-082–083` | Current role descriptions, consent, audit, archive/read-scope export, no-access pending states, `PA-92-*` protected deletion/restoration | 4/4/**16 High** for material `AB-93-076/078`; control-positive rows are unrated | `SR-94-085–101`, `SR-94-141–145`, versioned disclosure, comprehension/accessibility, exact current-rule copy, and explicit absence of unapproved recommendation/disclosure candidates | Accountable: Product; contributors: Content Design, Accessibility, Privacy / before collaboration onboarding or personal-account deletion / `VT-94-154–180`, `VT-94-255–264` | Evidence pending | Collaboration copy/onboarding and personal-account deletion surfaces are blocked where Product Owner copy and accessibility evidence are incomplete. |

**Residual-rating state for every row.** Residual likelihood, impact, and score
are **Unscored — evidence pending** for all `RK-94-001–021` in this version because
none of the complete required mitigation sets has implementation and
verification evidence. A Blocking or Transferred family-workstream disposition does not
permit a speculative residual score. After the applicable `VT/ME/SRV` evidence
passes, the row MUST record residual likelihood, impact, score, rationale,
acceptance authority, review date, and reopening triggers before it can become
`Accepted` or `Resolved`.

### 4.1 Inherent-rating rationale and evidence confidence

The table below is part of each material family's formal rating. “Low
implementation confidence” means the architecture/provider/control evidence is
absent; it does not lower the score.

| Risk | Likelihood rationale | Impact rationale and evidence confidence |
| --- | --- | --- |
| RK-94-001 | A credential/session attacker or ordinary recovery/session binding failure can reach authentication, recovery, assurance, logout, switch, and protected-action surfaces during expected use. Managed-IdP and server-check directions reduce reachability, but provider and implementation evidence are absent; **Possible (3)** is the highest supported frequency. | Wrong-subject authority can affect every account and S3/S4 authority evidence, persist through sessions, and cause systemic compromise; **Severe (5)**. `TH-92-001/002/004` additionally meet the mandatory Critical override because a forged or misbound authentication result, a session that survives logout/revocation/account switch, and a protected action forced under a valid session each constitute systemic authentication compromise; CBD-92 independently triaged all three as Critical. Non-overridden `TH-92-003` remains High, matching its CBD-92 triage. Implementation confidence is low. |
| RK-94-002 | Invitation status is routinely reachable by inviters and recipients, while locators pass through external channels; enumeration, interception, replay, and partial commit are credible recurring attempts despite no-access pending states; **Likely (4)**. | Relationship disclosure or unauthorized membership can expose multiple people's financial data and durable collaboration authority; **Severe (5)**. Baseline confidence is high; implementation/provider confidence is low. |
| RK-94-003 | Every protected API, worker, cache, index, search, and report exercises scope enforcement; stale versions, omitted keys, IDOR, and confused-deputy failures are readily reachable until a typed enforcement contract exists; **Likely (4)**. | A defect can cross subject/profile/space/resource/field boundaries and expose or mutate S3/S4 data at systemic scale; **Severe (5)**. Requirements confidence is high; implementation confidence is low. |
| RK-94-004 | Provider callbacks, normalization, identity evidence, links, and lifecycle changes are ordinary integration paths, but exploitation or failure requires provider/integration conditions; **Possible (3)**. | Wrong-subject or cross-space financial authority, provenance loss, or destructive disconnect can create substantial or irreversible financial/privacy harm; **Severe (5)**. Provider/schema evidence confidence is low. |
| RK-94-005 | Retries, reordering, poison inputs, bursts, stale work, and concurrent calculation are expected operating conditions on every worker path; current idempotency/rate directions are not concrete; **Likely (4)**. | Corruption, duplicated effects, inference, and availability loss can affect several people or services but are normally recoverable with authoritative source history; **Major (4)**. Implementation confidence is low. |
| RK-94-006 | Leakage requires a secret-bearing path plus a prohibited sink or custody failure, but secrets traverse build, runtime, provider, backup, and recovery boundaries; **Possible (3)**. | Escaped provider/application secrets can grant durable external or systemic application authority and propagate into retained copies; **Severe (5)**. Topology/KMS/provider evidence confidence is low. |
| RK-94-007 | Notification generation/delivery and shared-device/provider custody occur in ordinary operation; stale destinations, previews, metadata, retries, and monitored channels recur despite content ceilings; **Likely (4)**. | Disclosure or suppression can affect relationship safety and lifecycle awareness, but fixed content-free bodies and non-authorizing channels bound the ordinary technical impact; **Major (4)**. Provider/copy evidence confidence is low. |
| RK-94-008 | Export generation and download deliberately create portable copies; substitution, stale scope, locator misuse, and snapshot faults are readily attempted or encountered whenever exports are enabled; **Likely (4)**. | Packages can irreversibly disclose several people's S3 financial/relationship data outside CoBudget custody; **Severe (5)**. Baseline scope confidence is high; implementation/storage confidence is low. |
| RK-94-009 | Abuse requires staff/tool access or a telemetry/audit configuration failure; those paths are restricted by the approved no-routine-content and dual-control direction, so **Possible (3)** is conservative. | Bypass can expose any S3/S4 class, defeat evidence, or mutate authority across customers and remain difficult to reverse; **Severe (5)**. Tooling/identity evidence confidence is low. |
| RK-94-010 | Backup, lifecycle, deletion, and restore execute less often than ordinary reads but will occur during expected operation and recovery; incomplete coverage/races are credible while ledgers and rehearsals are absent; **Possible (3)**. | General failures can destroy or expose S3 data; **Severe (5)**. `TH-92-032/033/044` additionally meet the mandatory Critical override because they can corrupt terminal deletion or resurrect authority. Evidence confidence is low. |
| RK-94-011 | A coercive actor with relationship access can repeatedly reach invitations, transfers, exports, connection/joint-association, assurance, and scope-change ceremonies; current controls cannot prove voluntariness; **Likely (4)**. | Coercion can cause durable surveillance, authority loss, irreversible disclosure, or unsafe control over the subject; **Severe (5)**. Scenario confidence is high; affected-population and joint-association-copy evidence are pending. |
| RK-94-012 | Once an approved broad role reads financial data, merchant/payee, schedule, and repeated-observation disclosure are inherent and continuously reachable; **Almost certain (5)** for material rows. | Continuous financial/relationship surveillance and non-user third-party disclosure can be durable, repeated, and unsafe; **Severe (5)**. Approved-boundary evidence is high; formal acceptance/specialist evidence is pending. |
| RK-94-013 | Mandatory notices and ordinary external-channel delivery inherently expose use/timing to the selected/shared destination when the named conditions exist; **Almost certain (5)**. | Monitored-channel disclosure or suppression can materially affect agency and safety, while content-free bodies limit direct financial detail; **Major (4)**. Product-rule evidence is high; provider/safety evidence is pending. |
| RK-94-014 | Legible indicators and accountability interactions are intentionally visible; their use in shame/control is inherent in the adversarial context, and comments add a readily reachable harassment surface if enabled; **Almost certain (5)**. | The harm can be repeated, coercive, and multi-person but generally does not itself transfer financial authority; **Major (4)**. Scenario evidence is high; copy/platform-safety evidence is pending. |
| RK-94-015 | Under the named removal, sole-authorizer, ownership, joint-projection dissolution, and support-refusal conditions, access loss, forced re-itemization, or lack of remedy follows the approved rule by design; **Almost certain (5)**. | Durable lockout, loss of relied-on records, surveillance through re-separated presentation, and unsafe lifecycle asymmetry can be severe and difficult or impossible to reverse; **Severe (5)**. Rule evidence is high; acceptance/specialist evidence is pending. |
| RK-94-016 | Downloaded copies and recipient/provider custody limits inherently persist after later revocation, while controlled stale-state failures remain continuously reachable until implementation proof exists; **Almost certain (5)**. | S3 copies can propagate indefinitely outside CoBudget control and false erasure claims can compound irreversible disclosure; **Severe (5)**. Custody-limit evidence is high; controlled-copy evidence is low. |
| RK-94-017 | Status, timing, count, absence, reason, and withheld-output signals are produced by ordinary behavior; at least some inference is unavoidable by design; **Almost certain (5)**. | These signals can reveal sensitive activity or circumstances repeatedly, but safe classes and noninterference limit content/authority exposure; **Major (4)**. Scenario evidence is high; tolerance/design evidence is pending. |
| RK-94-018 | A person legitimately authorized in multiple spaces can always remember/correlate the views; invitation re-contact is repeatedly reachable without candidate controls; **Almost certain (5)** for the material residual. | Cross-space human correlation and unwanted contact can expose relationships or behavior across people without a server boundary violation; **Major (4)**. Human-residual evidence is high; re-contact decision evidence is pending. |
| RK-94-019 | When administrative history/export is used, its relationship dossier is inherent; aggregation/search can repeatedly concentrate it; **Almost certain (5)** for the accepted residual. | The portable relationship/activity profile can affect members and former members durably, though its allowlist excludes financial content and security evidence; **Major (4)**. Baseline evidence is high; schema/acceptance evidence is pending. |
| RK-94-020 | Abuse requires operational access, a deceptive submission, compromised operator, or tool bypass; approved content-free/JIT boundaries reduce ordinary reachability, so **Possible (3)** is conservative. | A successful bypass can expose S3/S4 content, mutate authority, or defeat evidence across customers; **Severe (5)**. Operational-tool evidence confidence is low. |
| RK-94-021 | Mistaken broad-role selection and misunderstood copy/lifecycle consequences are credible during ordinary onboarding even without malicious intent; **Likely (4)** for `AB-93-076/078`. | Over-sharing can expose several members' complete financial data and portable copies; **Major (4)**. Control-positive rows are unrated; copy/accessibility evidence is pending. |

### 4.2 Formal priority order

Stable IDs remain domain-ordered; formal risk priority is score-ordered:

| Order | Priority/score | Risks |
| --- | --- | --- |
| 1 | Critical / 25 | `RK-94-012/015/016` |
| 2 | Critical / 20 | `RK-94-002/003/008/011/013/014/017/018/019`; source-specific `TH-92-001/002/004` within `RK-94-001` and `TH-92-032/033/044` within `RK-94-010` |
| 3 | High / 16 | `RK-94-005/007/021` |
| 4 | High / 15 | `RK-94-004/006/009/020`; non-overridden `RK-94-001` and `RK-94-010` sources |

Within one score, release work follows the narrowest dependency order that
unblocks foundational authority/topology first, then the affected feature or
claim. A lower numeric family can therefore be an earlier implementation gate
without being relabelled as a higher inherent risk.

## 5. Mitigation and residual-risk decision record

### 5.1 Technical finding routes

| Risk | Complete source set | Principal dependencies | Required terminal route |
| --- | --- | --- | --- |
| RK-94-001 | `TH-92-001–004` | `EG-91-004/010`, identity provider, `RF-92-002` | Blocking until identity/session/assurance implementation and tests pass |
| RK-94-002 | `TH-92-005–007` | `EG-91-006/011/018`, CBD-73, `RF-92-012` | Blocking invitation release |
| RK-94-003 | `TH-92-008–013`, `TH-92-017–018` | `EG-91-007/011/014–016/018–019/021/023`, `RF-92-001/004/005` | Blocking protected/derived surfaces |
| RK-94-004 | `TH-92-014`, `TH-92-019`, `TH-92-035–037`; control-positive `AB-93-084` | `EG-91-004–005/012–013/021–022`, CBD-15/CBD-75/CBD-82 | Blocking synchronized-financial and joint-association surfaces pending provider/schema/copy evidence |
| RK-94-005 | `TH-92-015`, `TH-92-023`, `TH-92-034`, `TH-92-038–040` | `EG-91-005–008/010–013/015–017/024`, `RF-92-003/012` | Blocking workers and bounded surfaces |
| RK-94-006 | `TH-92-016` | `EG-91-004–005/008/017–020`, `RF-92-002/007` | Blocking production secrets/providers |
| RK-94-007 | `TH-92-020–022`, `TH-92-041` | `EG-91-006/011/015/023–024`, `EG-93-010`, CBD-74, `RF-92-009` | Per-channel transfer with explicit surface block |
| RK-94-008 | `TH-92-024–026` | `EG-91-004/007/017–018/023`, `RF-92-009` | Blocking every export type until its schema/tests pass |
| RK-94-009 | `TH-92-027–030`, `TH-92-042` | `EG-91-009–010/018–020`, `EG-93-006/009`, `RF-92-005/008` | Blocking protected operations/audit/telemetry |
| RK-94-010 | `TH-92-031–033`, `TH-92-043–045` | `EG-91-001–009/011/017–024`, `RF-92-002/006/008/010` | Blocking terminal deletion/recovery claims |

Every `TH-92-001–045` appears exactly once in this table. Shared controls do
not merge the source threat IDs or their affected `DF/TB/EP/DI` citations.

### 5.2 Human scenario routes

| Risk | Complete scenario set | Scenario treatment |
| --- | --- | --- |
| RK-94-004 | `AB-93-084` | Control-positive joint-association fixture; technical/provider family remains formally rated from its material threats |
| RK-94-011 | `AB-93-001–010`, `AB-93-085` | Formal coercion risks, including coerced joint association, plus normal invitation/consent counterfactuals; proposed product changes transferred |
| RK-94-012 | `AB-93-011–022` | Normal role visibility is positive/control evidence; adversarial monitoring and accepted residuals are formally rated |
| RK-94-013 | `AB-93-023–032` | Direct/timing/shared-device leakage and suppression risks; mandatory-notice residual retained pending specialist review |
| RK-94-014 | `AB-93-033–038` | Interaction/content abuse risks; comments are feature-blocking pending platform-safety evidence |
| RK-94-015 | `AB-93-039–048`, `AB-93-086` | Removal, lifecycle, support-refusal, joint-projection-dissolution, and lockout risks; approved rules stay fixed until product decision |
| RK-94-016 | `AB-93-049–054` | Stale access and uncontrolled-copy risks; remote-erasure claims prohibited |
| RK-94-017 | `AB-93-055–062` | Inference and existence risks; uniformity tests plus explicit residual handling |
| RK-94-018 | `AB-93-063–066` | Cross-space memory residual and invitation re-contact controls |
| RK-94-019 | `AB-93-067–070` | Audit/history surveillance and subject-evidence asymmetry |
| RK-94-020 | `AB-93-071–074`, `AB-93-081` | Malicious/mistaken/normal operations fixtures; hard operational boundary |
| RK-94-021 | `AB-93-075–080`, `AB-93-082–083` | Normal/mistaken/over-privileged fixtures for copy, comprehension, lifecycle, personal-account departure, and least-scope tests |

Every `AB-93-001–086` appears exactly once. The thirteen CBD-93 scenario rows
labelled accepted residual, represented by twelve CBD-93 residual-register
entries, remain **formal acceptance pending** here. CBD-94 will record
an `Accepted` disposition only after the §3.6 authority and evidence exist.

### 5.3 Safeguard adoption routes

| CBD-93 readiness class | IDs/count | CBD-94 disposition |
| --- | --- | --- |
| Decided; implementation evidence pending | `SG-93-053` (1) | Adopt as a requirement; evidence pending until archived-export fixtures pass |
| Proposed product decision | 19 IDs exactly as CBD-93 §6.14 | `Transferred`; current CBD-72/CBD-92 behavior remains; no candidate may be implemented as approved |
| Customer-copy approval pending | 18 IDs exactly as CBD-93 §6.14 | `Evidence pending`; dependent surface blocked where copy is safety/consent/custody critical |
| Specialist-gated | `SG-93-017`, `SG-93-046` | `Transferred`; observation detection remains off and inactive-owner safety claims remain prohibited |
| Operational/security design pending | 7 IDs exactly as CBD-93 §6.14 | `Blocking` for the affected operational/comment/recovery surface |
| Baseline-derived | 49 IDs exactly as CBD-93 §6.14 | Adopt through `SR-94-*`; implementation and verification evidence pending |

`SG-93-020` remains a retired tombstone and is never reused. `SG-93-074`,
`SG-93-075`, and `SG-93-095` retain their normalized, independent meanings.

## 6. Normative security and privacy requirement catalog

These requirements are provider-independent ceilings. Concrete architecture
may narrow data/effects; it may not broaden them. `MUST`, `MUST NOT`, `SHOULD`,
and `MAY` use their RFC 2119 meanings.

Each requirement inherits the accountable owner and target phase of its first
listed `RK-94-*` under §3.7. The verification inventory supplies its evidence
owner and method. Requirement type is deterministic:

| Type | Exact IDs | Interpretation |
| --- | --- | --- |
| Architecture/evidence contract | `SR-94-021/030/037/039/063/075/082` | Defines a design or evidence artifact that must exist; not a runtime assertion by itself. |
| Verification/approval obligation | `SR-94-043/054/084/091/108/120/143` | Defines required proof or qualified review; paired runtime requirements carry system behavior. |
| Product-decision guard | `SR-94-073/074/115/132/133/138/141/142/147` | Prohibits an unapproved capability or decision from entering the release. |
| Risk/claim governance | `SR-94-101/117/129/134/145` | Governs residual-risk statements, claims, or reconciliation rather than runtime processing. |
| Runtime/product/data control | Every other `SR-94-*` | Directly constrains released behavior, data, authority, or operations. |

Open quantitative or allowlist values use the stable `PR-94-*` parameter
registry in the verification inventory. “Approved” never means an informal or
unversioned value.

### 6.1 Identity, sessions, assurance, and invitations

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-001 | Every authentication, recovery, and assurance result MUST be bound to one account subject, client context, assurance level, issued/expiry time, and identity-provider evidence; it MUST NOT grant a budget-space role by itself. | RK-94-001; `TH-92-001` |
| SR-94-002 | Session identifiers MUST rotate after authentication, recovery, assurance elevation, and account switch; logout, recovery, credential/factor change, account deletion, and security revocation MUST invalidate affected sessions within `PR-94-001`. | RK-94-001; `TH-92-002` |
| SR-94-003 | Protected actions MUST require current server-side authorization and, where CBD-72 requires it, fresh assurance bound to the exact subject, space, action class, and target. | RK-94-001; `TH-92-001/004` |
| SR-94-004 | State-changing browser requests MUST enforce approved origin, CSRF, content-type, method, and anti-replay controls; client values MUST NOT select actor, role, policy result, or assurance. | RK-94-001; `TH-92-004` |
| SR-94-005 | Account switch, logout, access loss, and reconnect MUST clear reachable app-controlled customer state and require a new live authorization boundary; no customer mutation may be queued offline. | RK-94-001/003; `CL-92-*` |
| SR-94-006 | Identity/recovery support MUST NOT impersonate a customer, transfer ownership, change a role, mutate a budget space, or convert channel possession into product authority. | RK-94-001/020; `OP-92-*` |
| SR-94-007 | Invitation creation/status/acceptance responses, headers, body shape, and observable timing MUST be equivalent for nonexistent, ineligible, unauthorized, expired, rejected, revoked, and already-member targets under `PR-94-003/004`; no response may assert an unverified subject fact. | RK-94-002; `TH-92-005` |
| SR-94-008 | An invitation locator MUST be high entropy, purpose-specific, one-time, recipient-bound, versioned, expiring, stored only as a one-way verifier, and insufficient without authenticated recipient proof and current eligibility. Any design unable to use a one-way verifier is blocked pending an explicit Security-approved architecture exception and equivalent replay/theft proof. | RK-94-002; `TH-92-006` |
| SR-94-009 | Invitation acceptance MUST recheck inviter authority, recipient identity/channel control, role/scope disclosure version, invitation state, membership state, space lifecycle, and rate/resource state at commit. | RK-94-002; `TH-92-006/007` |
| SR-94-010 | Membership commit, invitation invalidation, consent evidence, audit, and required notices MUST share one atomic state transition or a recoverable idempotent protocol with no access-conferring partial state. | RK-94-002; `TH-92-007` |
| SR-94-011 | Invitation surfaces MUST implement concrete `RL-92-*` values and MUST NOT let an attacker lock a legitimate recipient out through counter exhaustion. | RK-94-002/018; `RF-92-012` |

### 6.2 Authorization, isolation, masking, caches, search, and reports

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-012 | Every protected read/mutation MUST evaluate authenticated subject, account profile, budget space, membership state, role, Viewer profile, resource, field, action, purpose/effect where applicable, lifecycle, consent, policy version, and target version server-side. | RK-94-003; `TH-92-008–013` |
| SR-94-013 | Missing, stale, malformed, unrecognized, or unverifiable authority input MUST deny by default and MUST NOT fall back to a broader role, default tenant, system actor, or UI decision. | RK-94-003; CBD-72 default denial |
| SR-94-014 | Object identifiers MUST be treated only as locators. Every lookup, join, mutation, event, cache entry, index document, report, package, and audit view MUST carry and verify the complete subject/space/resource scope independently. | RK-94-003; `TH-92-009/017` |
| SR-94-015 | Background work MUST prove either current user-delegated authority or exactly one approved `SA-92-*` purpose and MUST be unable to perform an unlisted effect or cross-purpose effect. | RK-94-003/005; `TH-92-012` |
| SR-94-016 | Masking MUST remove denied values, identifiers, shapes, counts, ordering, pagination effects, errors, resource existence, derived inputs, and side-channel distinctions—not only visible fields. | RK-94-003/017; `TH-92-010/018` |
| SR-94-017 | Cache, index, search, and report keys MUST include every tenant, subject/recipient, role/profile, resource scope, authorization version, and input-completeness dimension that can change output. | RK-94-003; `TH-92-017` |
| SR-94-018 | A report requiring unavailable inputs MUST be withheld with the CBD-72 safe class recorded in `PR-94-004`; a partial result MUST NOT be represented as complete. | RK-94-003/017; CBD-72 §5.1 |
| SR-94-019 | Protected commits MUST recheck authority, lifecycle, ownership, consent, policy, and target versions in the same transaction/conditional write that applies the effect. | RK-94-003; `TH-92-013` |
| SR-94-020 | Denied and allowed paths MUST use the rate, pagination, response, header, and timing-equivalence contract in `PR-94-002/003` and MUST NOT create an enumeration or completeness oracle. | RK-94-003/005/017; `RL-92-*` |
| SR-94-021 | Concrete policy, cache, search, and report designs MUST map back to `DF-91-*`, `TB-92-*`, `EP-92-*`, `TH-92-*`, and all affected `DI-91-*` before release. | RK-94-003; `RF-92-001/004` |

### 6.3 Financial providers, profiles, connections, and provenance

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-022 | Provider-link initiation and callback MUST bind subject, profile, connection attempt, provider, redirect origin, state, nonce/PKCE equivalent, expiry, and intended effect; replay or mismatch MUST create no connection or link. | RK-94-004; `TH-92-014` |
| SR-94-023 | Exactly one active financial profile MUST exist per CoBudget account subject for Private MVP; this logical profile MUST NOT assert legal-person identity or authorize merge/transfer/sharing. | RK-94-004; `CA-92-012` |
| SR-94-024 | Each provider connection MUST retain one individual authorizer, its own consent, cursor, secrets, raw observations, revocation, lifecycle, and provenance; authority MUST NOT transfer with role/ownership. | RK-94-004; PM-72-011 |
| SR-94-025 | Normalization and joint-account association MUST retain reversible edges to every source connection/record and MUST use approved provider evidence or explicit confirmation without merging authority. | RK-94-004; `TH-92-019/036` |
| SR-94-026 | A non-association/split decision MUST be versioned and effective so stale provider observations or retries cannot silently re-merge profiles, projections, or spaces. | RK-94-004; `TH-92-019/036` |
| SR-94-027 | Unlink, disconnect, revocation, membership loss, and permanent-subject-loss workflows MUST distinguish space access from private connection authority and MUST stop/recompute only the approved connection/projection scope. | RK-94-004; `TH-92-037` |
| SR-94-028 | Source facts MUST remain immutable/provenanced while permitted space overlays remain separately attributed and versioned; synchronization MUST NOT rewrite history without source evidence. | RK-94-004/005; CBD-67–71 |
| SR-94-029 | Provider webhooks MUST be authenticated, replay-protected, durably recorded before acknowledgement, bounded, and routed only to connection-provenanced work. | RK-94-004/005; `TH-92-015/038` |
| SR-94-030 | Selected providers MUST supply approved authentication, field/event, identity-reliability, retention/deletion, regional/subprocessor, compromise, outage, and contract evidence mapped to CBD-91/92/94 IDs. | RK-94-004; `RF-92-007` |

### 6.4 Queues, retries, calculations, alerts, and rate/resource controls

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-031 | Each queue MUST have one versioned schema defining producer, consumer, authority mode, purpose/effects, subject/space/resource scope, correlation, idempotency, ordering, expiry, and prohibited fields. | RK-94-005; `RF-92-003` |
| SR-94-032 | Consumers MUST authenticate producer/workload identity, validate the complete envelope before lookup, and reject unknown versions/purposes/effects without fallback. | RK-94-005; `TH-92-015` |
| SR-94-033 | Each material effect MUST use a durable idempotency/effect key scoped to purpose, target, material revision, and authorization version; exact replay MUST NOT duplicate effects. | RK-94-005; `TH-92-015/023/040` |
| SR-94-034 | Retry/backoff, poison-message handling, inspection, redrive, and DLQ replay MUST be bounded, audited, purpose-authorized, and end in an explicit terminal state. | RK-94-005; `TH-92-015/038` |
| SR-94-035 | Calculations/reconciliation MUST use one frozen input/rule/time-boundary version and atomically replace the intended derived revision while preserving prior provenance/history. | RK-94-005; `TH-92-039` |
| SR-94-036 | Alert event, personal recipient instance, personal acknowledgement/archive/dismiss state, and delivery attempt MUST be distinct records; one subject MUST NOT mutate another subject's personal state. | RK-94-005/007; `TH-92-040` |
| SR-94-037 | `PR-94-002` MUST record concrete per-surface windows, thresholds, bursts, counting keys, counter storage, quotas, resource ceilings, accountable approval, and capacity basis for every `RL-92-001` surface before release. | RK-94-005; `RF-92-012` |
| SR-94-038 | Throttling MUST use uniform safe responses/timing and MUST NOT allow an attacker to exhaust another subject's legitimate authentication, invitation, provider, export, or lifecycle recovery path. | RK-94-005; `RL-92-003/005` |

### 6.5 Secrets and cryptographic custody

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-039 | The architecture MUST inventory every secret/key/token/cursor/signing value, its owner, purpose, store, readers, writers, rotation, revocation, backup status, and prohibited destinations. | RK-94-006 |
| SR-94-040 | Provider tokens and high-impact application secrets MUST use separated encryption/KMS custody and MUST NOT appear in ordinary domain rows, queues, logs, audit, diagnostics, support, analytics, exports, or clients. | RK-94-006; CBD-91 rule 1 |
| SR-94-041 | Workload and operator access to secrets MUST be least-privilege, strongly authenticated, purpose-bound, time-bounded where human, and independently auditable. | RK-94-006/009/010 |
| SR-94-042 | Secret rotation/revocation MUST identify and invalidate every dependent session, callback, connection, package, queue, replica, and backup recovery path without reactivating prior authority. | RK-94-006/010 |
| SR-94-043 | Build/runtime scanning and negative tests MUST prove prohibited secret fields do not enter logs, errors, traces, queues, audit, support, analytics, exports, or client bundles. | RK-94-006 |

### 6.6 Notifications and channels

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-044 | Every eligible recipient MUST receive their own mandatory in-app instance for supported events; optional external delivery MUST be controlled only by that recipient and event/category. | RK-94-007/013; CBD-72 §5.4 |
| SR-94-045 | Every Private-MVP push/SMS body MUST use the fixed content-free `NT-92-001` text and MUST NOT expose person, space, role, event class, deadline, amount, merchant/payee, category, goal, bill, state, action, or resource locator. | RK-94-007/013; `NT-92-*` |
| SR-94-046 | Email MUST follow `EM-92-*`: content-free routine email; invitation action class only; lifecycle/security safe action class and deadline only; no customer content or relationship/resource detail. | RK-94-007/013; `EM-92-*` |
| SR-94-047 | External-message locators MUST be protected, non-authoritative, purpose-specific, and safe against redirect/referrer/log leakage; opening MUST enter an authenticated destination with fresh authorization. | RK-94-007; `TH-92-021/022/041` |
| SR-94-048 | Rendering and send MUST separately recheck recipient, destination ownership, opt-in, eligibility, authorization/lifecycle/template versions, material revision, and suppression state. | RK-94-007; `TH-92-020–022` |
| SR-94-049 | Provider envelope fields, tags, headers, identifiers, callbacks, bounces, and logs—excluding the visible body governed by `SR-94-045/046`—MUST use a purpose allowlist and MUST NOT carry authority or protected event/resource context. | RK-94-007; `TH-92-022/023/041` |
| SR-94-050 | Delivery callbacks MAY update delivery-attempt state only; they MUST NOT authenticate, acknowledge product state, change preferences, or create/recreate event/recipient facts. | RK-94-007; `TH-92-023` |
| SR-94-051 | Destinations and push tokens MUST be treated as personal data with verified ownership, change/revocation, stale-token cleanup, provider suppression, and deletion/retention behavior. | RK-94-007/013; `DI-91-049/059/073` |
| SR-94-052 | Notification destinations MUST remain separate from authentication and recovery authority. Channel compromise/retirement MUST NOT grant recovery or silently suppress the required in-app notice. | RK-94-007/013; `EG-93-010` |
| SR-94-053 | Channel copy MUST accurately disclose shared-device, inbox, carrier, mirror, provider, forwarding, timing, and recipient-controlled-copy limits without claiming sole control or confidentiality. | RK-94-007/013/021; `SG-93-089–094` |
| SR-94-054 | Each channel MUST pass exact template/provider-schema, localization-equivalence, preview, stale-send, opt-out, callback, deduplication, shared-device, and accessibility tests before release. | RK-94-007/013; `RF-92-009` |

### 6.7 Exports and downloaded custody

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-055 | Financial export, Primary administrative-history export, and Viewer snapshot MUST have separate versioned field/object/file schemas and semantic allowlists; one package type MUST NOT select another's scope. | RK-94-008/016 |
| SR-94-056 | Generation MUST bind requester, recipient, type, space, frozen read/field scope, assurance, policy/auth versions, requested/material revision, and package expiry. | RK-94-008 |
| SR-94-057 | Package content MUST derive from one internally consistent authorization/data snapshot and carry integrity/provenance evidence matching the audit/package record. | RK-94-008 |
| SR-94-058 | Download MUST recheck package identity, intended recipient, current authentication, permitted package state, expiry, revocation, and any approved invalidation trigger; object paths/keys MUST be non-enumerable and unlogged. | RK-94-008 |
| SR-94-059 | Package storage MUST be encrypted, purpose-isolated, inaccessible to ordinary application/support paths, deletion-ledgered, and limited to the approved lifetime; Primary/Viewer packages MUST be no more than 24 hours. | RK-94-008/010 |
| SR-94-060 | Export rate/resource controls MUST use the export values and safe counting keys in `PR-94-002` and MUST NOT leak target existence or permit attacker-induced requester lockout. | RK-94-008; `RL-92-*` |
| SR-94-061 | Before download, the recipient MUST receive accessible copy stating the exact scope, permanence after download, downstream sharing risk, and that CoBudget cannot revoke or remotely erase recipient-controlled copies. | RK-94-008/016; `DI-91-050` |
| SR-94-062 | Package creation, failure, download, expiry, revocation, and deletion MUST be audited without recording package secrets or denied content. | RK-94-008/009 |

### 6.8 Audit, telemetry, staff access, and platform safety

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-063 | Audit/security/customer-history taxonomies MUST define event/field allowlists, actor/subject/target, decision/policy/auth versions, correlation/order/integrity, audience, retention/deletion, and prohibited content. | RK-94-009/019 |
| SR-94-064 | Required security/audit evidence MUST make omission, reordering, overwrite, selective deletion, forgery, and correlation loss detectable; no single operational actor may silently alter evidence. | RK-94-009; `TH-92-028` |
| SR-94-065 | Customer audit/history views MUST apply current authorization and dedicated safe schemas; they MUST NOT expose secrets, security evidence, support notes, another subject's personal state, hidden-resource gaps, or cross-space identifiers. | RK-94-009/019 |
| SR-94-066 | Product analytics and behavioral capture MUST remain disabled for Private MVP. Reliability telemetry MUST be content-free; S3 security evidence MUST be purpose/access/lifecycle separated; aggregates MUST be non-drillable. | RK-94-009; `AN-92-*` |
| SR-94-067 | Routine staff support MUST be technically limited to the `OP-92-002` content-free allowlist and an opaque customer-provided correlation value; staff MUST NOT browse content, impersonate, moderate, or infer resource existence. | RK-94-009/020; `OP-92-*` |
| SR-94-068 | Exceptional incident/recovery access MUST use an approved closed purpose, distinct strongly authenticated requester/approver, JIT minimum scope, mediated non-impersonating tools, and automatic expiry/revocation. | RK-94-009/020; `OP-92-003–005` |
| SR-94-069 | Data, key, approval, evidence, and return-to-service duties MUST remain organizationally and technically separated; one person MUST NOT combine customer data and keys or approve their own access. | RK-94-009/010/020; `OP-92-004/006` |
| SR-94-070 | Exceptional use MUST create safe evidence, post-use review, and affected-customer notice unless a separately approved temporary notice-delay condition applies and is reviewed. | RK-94-009/020; `OP-92-007/008` |
| SR-94-071 | Support-mediated ownership/role/connection transfer MUST be a hard denied product action with no escalation override; the customer response MUST state the limitation honestly without exposing another member. | RK-94-009/015/020; `RI-93-017` baseline component |
| SR-94-072 | Abuse/support submissions and operator notes MUST be isolated S3 free text, excluded from all budget-member/admin exports and customer history, and accessible only through the approved operating purpose. | RK-94-020; `AB-93-071/074` |
| SR-94-073 | Read-side behavioral monitoring such as `SG-93-017` MUST remain disabled unless `EG-93-006` closes with a complete privacy/security control package and Product Owner disposition. | RK-94-012/019 |
| SR-94-074 | Shared comments MUST NOT ship until `EG-93-009` closes with the full platform-safety operating model, tool boundaries, staffing, evidence controls, training, escalation/appeal rules, and exercised abuse cases. | RK-94-014/015/020 |

### 6.9 Lifecycle, deletion, recovery, and backups

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-075 | A disposition matrix MUST assign every `DI-91-*` class, copy location, lifecycle event, and provider/processor one action, duration/SLA, exception/legal basis, accountable steward, and verification method. | RK-94-010/016 |
| SR-94-076 | Archive, restore, delete request/cancel, terminal purge, personal-account deletion/restoration, membership loss, unlink, and provider revocation MUST use explicit versioned state machines and dependency order. | RK-94-010/015/016 |
| SR-94-077 | Lifecycle orchestration MUST be idempotent, race-safe, retry-bounded, coverage-ledgered, and unable to declare completion while a controlled surface remains unprocessed. | RK-94-010 |
| SR-94-078 | Active-access shutdown MUST be distinguished from terminal processor/provider/backup expiry; customer copy MUST NOT claim remote deletion of recipient-controlled copies. | RK-94-010/016 |
| SR-94-079 | Restore MUST reconcile current legal/policy state and MUST NOT resurrect purged data, old identity authority, sessions, roles, links, connections, consent, packages, jobs, secrets, or stale provider state. | RK-94-010; `TH-92-032/043–045` |
| SR-94-080 | Backup scope MUST enumerate included/excluded classes, tenant mapping, keys, regions, access, retention/expiry, legal holds, and restore controls; prohibited secrets MUST remain excluded. | RK-94-006/010 |
| SR-94-081 | Recovery MUST occur in an isolated, access-controlled environment with separated data/key custody, evidence, reconciliation to deletion/lifecycle ledgers, independent review, and controlled return to service. | RK-94-010 |
| SR-94-082 | Providers/processors MUST supply contract and technical evidence for disconnect, deletion request, completion, retention exception, backup expiry, and failure/escalation behavior. | RK-94-004/010 |
| SR-94-083 | The minimal post-purge tombstone MUST contain no financial content and MUST have an approved purpose, field schema, retention duration, access, and deletion trigger before terminal-deletion claims. | RK-94-010; `DI-91-074` |
| SR-94-084 | Production release MUST include exercised backup restore, account restoration, budget archive/restore/delete, personal-account deletion/restoration, provider disconnect, partial-failure, and authority-non-resurrection scenarios. | RK-94-010 |

### 6.10 Consent, coercion resistance, role comprehension, and agency

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-085 | Every invitation/role/transfer/protected-action disclosure MUST use accurate role authority, visibility, affected-person, permanence, notice, copy, and reversal language; it MUST NOT describe reauthentication as proof of freedom from coercion. | RK-94-011/021; `SG-93-003–006/089–094` |
| SR-94-086 | Existing members affected by a new broad reading role MUST receive the approved notice without implying veto/consent rights the current model does not grant. | RK-94-011/012/021; `AB-93-076` |
| SR-94-087 | Role-selection UX MUST state that Accountability Partner visibility is comprehensive and not resource-scoped, Viewer is read-only/scoped, and Collaborator is full-space financial participation; it MUST NOT imply a narrower supportive role exists. | RK-94-011/012/021 |
| SR-94-088 | Protected actions MUST disclose irreversible or durable consequences before commit, including ownership loss, removal/scope loss, provider disconnection, export permanence, archival/deletion, and notices to others. | RK-94-011/015/021 |
| SR-94-089 | Customer copy MUST avoid money-control, approval, policing, enforcement, surveillance, shame, blame, success/failure, and legal-guardian implications not granted by the product. | RK-94-014/021; CBD-12 copy boundary |
| SR-94-090 | No safeguard or interaction MAY grant money movement, spending approval, transaction blocking, external-account control, another person's acknowledgement, or user lockout. | RK-94-011–015; CBD-93 non-escalation |
| SR-94-091 | Safety-critical disclosures and irreversible/exit flows MUST meet approved accessibility requirements and pass screen-reader, magnification/casting, cognitive-load, duress-comprehension, keyboard, focus, and error-recovery review. | RK-94-011/013/015/021; `EG-93-003` |
| SR-94-092 | Where coercion cannot be distinguished from voluntary action, the product MUST state the limitation, preserve approved notice/audit/revocation controls, and MUST NOT claim that consent ceremonies make the action safe. | RK-94-011; `EG-93-005` |

### 6.11 Monitoring, sensitive content, interaction, and inference

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-093 | Every role's exact field/resource/derived/report/export visibility MUST be versioned, testable, and disclosed; no broad role may be represented as selective. | RK-94-012/021 |
| SR-94-094 | New Viewer and pending/inactive roles MUST default to no access; scope changes MUST invalidate cached/queued/derived/package state immediately and use approved before/after notice copy. | RK-94-012/015 |
| SR-94-095 | Search over authorized data MUST NOT expose hidden fields/resources and MUST be evaluated as a repeated-observation surface in audit/privacy design. | RK-94-003/012/019 |
| SR-94-096 | Merchant/payee and other provider-derived free text MUST NOT be enriched, globally correlated, used for analytics, copied into notifications, or treated as safe labels merely because imported. | RK-94-012; `EG-93-008` |
| SR-94-097 | User-entered labels, goal/bill purposes, comments, descriptions, and support text MUST use the uniform sensitive-content handling rules in CBD-93 §7 until `EG-93-004` approves another model. | RK-94-012/014/020 |
| SR-94-098 | Acknowledgement MUST remain a personal record only and MUST NOT alter financial state, approve conduct, satisfy another person's obligation, or be required to regain access. | RK-94-014; CBD-72 §5.4.1 |
| SR-94-099 | Interaction displays MUST preserve author, version/correction history, target, and non-financial effect while preventing one member from silently rewriting another's record. | RK-94-014 |
| SR-94-100 | Derived indicators MUST remain accurate/legible but customer copy MUST NOT frame them as grounds for control, blame, approval, or intervention by another role. | RK-94-014/017 |
| SR-94-101 | Accepted unavoidable visibility—merchant/payee names, non-user counterparties, authorized cross-space memory, withheld-report inference—MUST be stated as residual risk and MUST NOT be described as eliminated by access control. | RK-94-012/017/018 |
| SR-94-102 | Comment creation/editing MUST be permission checked and attributed; another budget-space role MUST NOT gain moderation authority through CBD-94. | RK-94-014 |
| SR-94-103 | The platform-safety process, not a budget-space role, MUST own unlawful/harassing/accidental-disclosure escalation if comments are released. | RK-94-014; `EG-93-009` |
| SR-94-104 | Alert acknowledgement/dismiss/archive presentation MUST distinguish personal state from shared financial fact and MUST NOT expose private delivery/preference state. | RK-94-014 |
| SR-94-105 | Informational alerts MUST remain provisional, self-clear, and require no acknowledgement; firm alerts MUST describe settled facts and retain personal acknowledgement semantics. | RK-94-014; CBD-11/CBD-71 |
| SR-94-106 | Alert rendering MUST NOT identify one person as blameworthy where the authoritative event is space-level or derived from shared inputs. | RK-94-014 |
| SR-94-107 | Error/recovery copy MUST NOT instruct a user to obtain another person's credentials, channel, provider access, or approval. | RK-94-014/020 |
| SR-94-108 | Safety/copy review MUST record unsupported assumptions and MUST NOT claim validation by affected populations absent `EG-93-005` closure. | RK-94-011–015/021 |
| SR-94-109 | Localized safety/authority/custody copy MUST preserve normative meaning; truncation, preview, or fallback MUST NOT strengthen a claim or disclose protected context. | RK-94-013/014/021 |

### 6.12 Removal, lifecycle agency, stale copies, cross-space, and self-records

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-110 | Role/profile reduction, removal, transfer, archival, deletion, connection loss, and subject departure MUST be authorized at commit and MUST create no partial authority state. | RK-94-015 |
| SR-94-111 | Required notices MUST use the versioned safe action/reason classes in `PR-94-004` and state the material access consequence without exposing hidden financial/resource details or unsupported remedies. | RK-94-013/015/017 |
| SR-94-112 | A departing/removed subject MUST lose future access immediately while attributed shared contributions and source facts follow the approved retention/attribution decision; unresolved personal-account deletion behavior remains explicit. | RK-94-015/016; `RI-93-018` |
| SR-94-113 | Archived read-scope export MUST use the frozen `DI-91-075` snapshot and the requesting member's authorized read scope throughout the restore window; archive restoration MUST preserve the approved role/profile state. | RK-94-008/015; `SG-93-053` |
| SR-94-114 | Support MUST give a safe, honest response to a shut-out subject while refusing ownership/role transfer and without exposing another member or promising a nonexistent recovery. | RK-94-015/020; `RI-93-017` baseline component |
| SR-94-115 | Candidate removal-time export, deletion objection, self-administrative record, observer removal, reversal window, or comment-subject remedy MUST NOT be implemented until its `RI-93-*` route records an approved deterministic rule. | RK-94-011/012/014/015/019 |
| SR-94-116 | Inactive-owner eligibility MUST have no pre-request indicator, use coarse state without a persisted activity timeline, return a uniform refusal, rate limit requests, audit every attempt, and cancel under the approved activity rule. | RK-94-013/017; CBD-91 §7.3 |
| SR-94-117 | The inactive-owner notice residual and monitored-channel harm MUST remain explicit; no internal review may describe the approved behavior as survivor-safe absent `EG-93-001/005`. | RK-94-013/017 |
| SR-94-118 | Connection-health/orphaned-state reasons MUST use only the exact `PR-94-004` allowlisted reason necessary to explain stopped data and MUST NOT reveal private provider/authorizer details. | RK-94-004/017 |
| SR-94-119 | Removal, archival, deletion, and exit interfaces MUST state which data/access stops now, which shared history remains, which controlled copies expire later, and which downloaded/recipient copies cannot be erased. | RK-94-015/016 |
| SR-94-120 | Every lifecycle and authority-loss scenario MUST have stale-tab, queued-work, concurrent-change, notification, export, provider, audit, backup, and restore verification. | RK-94-010/015/016 |
| SR-94-121 | Controlled server/client/cache/index/job/package/provider copies MUST invalidate or receive their approved disposition after access/lifecycle loss within the per-surface SLO in `PR-94-005`. | RK-94-010/016 |
| SR-94-122 | Downloaded, recipient-controlled, forwarded, mirrored, inbox, carrier, OS, and third-party copies MUST be excluded from remote-erasure claims and covered by accurate pre-disclosure copy. | RK-94-007/008/016 |
| SR-94-123 | Former-member identifiers/attribution MUST remain only to the extent approved by the final retention/legal decision and MUST NOT preserve active role, contact, delivery, or provider authority. | RK-94-015/016 |
| SR-94-124 | A deletion-completion result MUST identify uncompleted/exception surfaces and MUST fail closed rather than silently treating provider/backup timeout as success. | RK-94-010/016 |
| SR-94-125 | Inactive eligibility, hidden inputs, withheld reports, connection state, and lifecycle timing MUST be modeled as disclosure channels in tests and residual decisions. | RK-94-017 |
| SR-94-126 | Uniform response defenses MUST cover status, body, headers, length, pagination, the `PR-94-003` timing distribution, retry behavior, rate counters, notification side effects, and audit visibility. | RK-94-003/017 |
| SR-94-127 | Aggregate/derived displays MUST reveal no more precision, membership, account, category, or time detail than the recipient's complete authorized inputs support. | RK-94-003/017 |
| SR-94-128 | Minimum necessary health/lifecycle explanations MUST use only the versioned safe classes in `PR-94-004` and MUST NOT expose why another person acted, disappeared, revoked, or lost authority. | RK-94-015/017 |
| SR-94-129 | Residual inference that cannot be removed without misleading the customer MUST be documented and accepted explicitly rather than hidden by generic error text. | RK-94-017 |
| SR-94-130 | Product processing, telemetry, search, audit, support, and identifiers MUST NOT correlate a person or financial behavior across budget spaces except for the minimum account-level authority required by approved behavior. | RK-94-003/018 |
| SR-94-131 | A person independently authorized in several spaces MUST receive no server-side cross-space search/report/export or combined insight in Private MVP beyond the minimum non-financial account authority expressly allowed by `SR-94-130`. | RK-94-018 |
| SR-94-132 | The cross-space per-recipient/per-inviter rate-control candidate in `SG-93-095`/`RI-93-010` MUST remain unimplemented until CBD-73 records an explicit Product Owner decision and `PR-94-002` records approved values and safe keys. Existing approved per-surface controls remain required. | RK-94-002/018; candidate guard |
| SR-94-133 | Per-inviter block and persistent decline behavior MUST remain unimplemented until CBD-73 records the independent `SG-93-074/075` decisions. | RK-94-018 |
| SR-94-134 | Human memory/copy correlation by a person legitimately authorized in several spaces MUST be recorded as an unavoidable residual, not as a solved tenant-isolation problem. | RK-94-018 |
| SR-94-135 | Global email/phone/provider identifiers MUST never become a customer-visible cross-space membership or resource lookup. | RK-94-018 |
| SR-94-136 | Administrative and resource-history audiences MUST be field-allowlisted and distinct; Primary-only administration history MUST NOT leak through ordinary target history. | RK-94-009/019 |
| SR-94-137 | Audit/history aggregation, search, pagination, and export MUST be treated as behavioral-profile surfaces and bounded by purpose, audience, retention, and noninterference tests. | RK-94-019 |
| SR-94-138 | The candidate self-service record about oneself MUST remain unimplemented until `RI-93-007` receives a Product Owner decision defining fields, redaction, other-person privacy, retention, and lifecycle. | RK-94-019 |
| SR-94-139 | Denied audit/history access MUST NOT reveal event count, actor, target existence, timing, or hidden-resource gaps. | RK-94-003/019 |
| SR-94-140 | Security/operations evidence MUST be inaccessible to budget-space roles even when it references an event visible in customer history. | RK-94-009/019/020 |
| SR-94-141 | The comparative pre-acceptance invitation disclosure in `SG-93-005`/`RI-93-009` MUST remain unimplemented until CBD-73 records an explicit Product Owner decision. Current invitation copy MUST accurately describe the recipient's approved role and MUST NOT imply the candidate disclosure already exists. | RK-94-011/021; candidate guard |
| SR-94-142 | The least-privilege recommendation behavior in `SG-93-014` MUST remain unimplemented until its CBD-12/CBD-75 route records an explicit Product Owner decision. Current role copy MAY describe existing roles accurately but MUST NOT imply that a role can be narrowed or contribute outside its approved boundary. | RK-94-012/021; candidate guard |
| SR-94-143 | Healthy-path fixtures for invitation, export, departure, support, and archive MUST pass alongside adversarial fixtures; a control that blocks the approved healthy path is not acceptable mitigation. | RK-94-021 |
| SR-94-144 | Pending/rejected/expired/revoked/inactive invitations and roles MUST expose no financial data, derived output, search result, report, alert, package, or background effect. | RK-94-002/021 |
| SR-94-145 | Product/copy review MUST remove the legacy `Owner`/`guardian` alternatives where they conflict with `Primary Owner`, `Co-owner`, and `Accountability Partner`, without altering the controlling role model. | RK-94-021; CBD-12 terminology |

### 6.13 Joint-account projection consent and dissolution

| ID | Requirement | Principal risk/source |
| --- | --- | --- |
| SR-94-146 | A budget-scoped joint-account association MUST NOT be released until the `SG-93-096` pre-confirmation disclosure is versioned and Product Owner-approved; it MUST identify the exact space and safe account representations, what every contributor will see, the duplicate-prevention effect on balances/reports/alerts, the absence of private-connection or cross-space authority, each contributor's unilateral source-withdrawal right, and the fact that withdrawal is observable to other contributors. | RK-94-004/011; `AB-93-084/085`; `SG-93-096` |
| SR-94-147 | The additional `SG-93-097` requirement to notify every contributing profile subject before dissolution where permitted and always immediately after, and any contributor objection, veto, delay, or deadlock behavior, MUST remain unimplemented until `RI-93-019` receives an explicit Product Owner decision and controlling-artifact update. Until then `CA-92-011` unilateral dissolution, safe attempt/outcome notification, and audit remain controlling; release evidence MUST prove atomic re-separation/recomputation, no new data disclosure or authority, and no claim that contributors approved dissolution. | RK-94-015; `AB-93-086`; candidate guard |

## 7. Private-MVP and public-launch release gates

| Gate | Required evidence | Blocked scope while open |
| --- | --- | --- |
| RG-94-001 Source coverage | Every `TH-92-*`, `AB-93-*`, active `SG-93-*`, `EG-91-*`, `RF-92-*`, `EG-93-*`, and `RI-93-*` has one audited route | CBD-94 approval and CBD-95 start |
| RG-94-002 Identity/session | Identity architecture/provider evidence and `VT-94-001–008` pass | All authenticated customer features |
| RG-94-003 Authorization/isolation | Typed enforcement contract and cross-scope/stale/race/noninterference tests pass | All protected/shared/derived features |
| RG-94-004 Financial provider | Provider/schema/provenance/connection/link evidence and tests pass | Synchronized financial data only |
| RG-94-005 Jobs/rates | Queue contracts, `RL-92-*` values, resource tests, and terminal retry behavior pass | Customer-data workers and bounded surfaces |
| RG-94-006 Secrets/topology | Deployment/workload/network/store/KMS/secret evidence passes | Provider and production deployment |
| RG-94-007 Channels | Per-channel schema/provider/copy/accessibility/shared-device tests pass | The individual external channel; in-app assessed separately |
| RG-94-008 Exports | All three package schemas and generation/download/custody/deletion tests pass | Each unverified export type |
| RG-94-009 Audit/operations | Schemas, tool-enforced staff boundary, dual control, evidence, review, notice, and exercises pass | Protected workflows, exceptional access, recovery, and security telemetry as applicable |
| RG-94-010 Lifecycle/recovery | Final disposition/legal/provider evidence, deletion ledger, backup expiry, isolated restore, and non-resurrection tests pass | Terminal-deletion claims and production recovery |
| RG-94-011 Comments/platform safety | `EG-93-009` operating model and exercised cases pass | Shared comments only |
| RG-94-012 Copy/accessibility | Versioned copy inventory, Product Owner approval, localization equivalence, accessibility evidence, and required legal/privacy review pass | Each safety/consent/custody-critical surface lacking evidence |
| RG-94-013 Legal/privacy | `EG-91-022`, `EG-93-002`, and provider terms approve actual jurisdictions, duties, claims, retention, deletion, and non-user data position | Private-MVP collaboration launch in unapproved jurisdictions |
| RG-94-014 Safety/research | Required advocacy/privacy decisions close `EG-93-001/005/006/008` without unsupported validation claims | Only the surfaces/claims named by the applicable gap; no blanket “safe” claim |
| RG-94-015 Independent security | Before public product launch, an independent security reviewer challenges diagram completeness, boundary placement, STRIDE coverage, technical triage, evidence-gap scope, and the resulting CBD-94 mitigations/residual decisions; accepted findings are traced to affected stable IDs and incorporated | Public product launch only; this gate does **not** block Private-MVP launch |
| RG-94-016 Final reconciliation | CBD-95 proves bidirectional IDs, CBD-12 outcomes, limitations, change control, and remaining blockers | CBD-14 completion and final CBD-12 readiness recommendation |

Gate closure has exactly one accountable owner: `RG-94-001/011–016` Product
Owner; `RG-94-002/006/008–009` Security; `RG-94-003` Security Architecture;
`RG-94-004` Financial Data; `RG-94-005` Reliability; `RG-94-007`
Notifications; and `RG-94-010` Data Lifecycle. Required legal, privacy,
accessibility, advocacy, platform-safety, provider, or independent reviewers
supply mandatory evidence but do not unilaterally change product scope or close
a Product Owner gate.

No gate is implied to block more scope than the table states. In particular,
`RG-94-015` preserves the approved CBD-92 public-launch policy and creates no
Private-MVP penetration-test or independent-review prerequisite. Penetration
testing may be commissioned through a future explicit decision, but this version
does not make it a release gate. Excluding a capability from Private MVP is a
documented `Deferred` decision with follow-up work; it is not evidence that the
underlying risk was resolved.

## 8. Architecture, product-plan, and Jira update list

This section records changes for later, separately scoped work. It does not
edit those artifacts or Jira.

| Target | Required reconciliation | Reason/source |
| --- | --- | --- |
| `docs/architecture.md` | Add `CL/PA/NT/EM/OP/AN/RL-92-*`, typed authorization/service-purpose contract, tenant/cache/index keys, queue schemas, audit/telemetry boundaries, deletion/recovery ledger, and provider-evidence gates | CBD-92 normative contracts and `RF-92-001–012` |
| `docs/architecture.md` | Mark Plaid and every named technology/provider as a hypothesis until CBD-15 evidence and selection | CBD-92 provider-independent limit |
| `docs/architecture.md` | Replace “append-only audit history for access and guardian actions” with the approved differentiated customer/admin/security evidence model and current role terms | CBD-72/CBD-92/CBD-93 |
| `docs/product-plan.md` | Reconcile legacy `Owner`/`guardian` terminology and the statement that Accountability Partner is scoped/revocable by the subject with the approved Primary Owner/Co-owner/Accountability Partner boundaries | CBD-72/CBD-93; current prose is materially misleading |
| `docs/product-plan.md` | Remove optional rollover from MVP or explicitly point to deferred `FF-003` | Approved cadence scope and future-feature register |
| `docs/product-plan.md` | Reconcile notification scope: mandatory in-app plus opt-in supported email/push/SMS versus the plan's in-app/email MVP and push-in-Product-depth statements | CBD-12/CBD-92 channel contracts |
| `docs/product-plan.md` | State product analytics is disabled for Private MVP; early measures may use only the approved coarse, non-drillable aggregates until a new analytics decision | `AN-92-*` |
| CBD-12/73/74/75 | Decide the 19 proposed safeguards and copy/channel/accessibility routes without silently modifying CBD-72 or CBD-92 | CBD-93 §6.14 and `RI-93-001–019` |
| CBD-15 and provider subtasks | Attach identity/financial/notification/hosting/storage/logging provider evidence mapped to CBD-91/92/94 IDs | `RF-92-002/007/009/010` |
| Architecture/security follow-up | Define policy decision contract, physical schemas, queues, rates, audit/telemetry, secret/KMS topology, disposition ledger, and recovery | `RF-92-001–006/008/010/012` |
| Legal/privacy/accessibility/safety follow-up | Attach the exact `EG-91-*`/`EG-93-*` closure artifacts; attendance or informal opinion does not close a gap | CBD-91 §6.1; CBD-93 §8.1 |

Before any Jira change is proposed or applied, the current issue, subtasks,
links, status, assignment, dates, and comments MUST be fetched again. Follow-up
issues MUST name the source risk/requirement/gate, owner, target phase, and
closure evidence, and MUST NOT silently expand Private-MVP scope.

## 9. Change control and limitations

Changes to a controlling CBD-72 decision, any normative CBD-92 contract, a
source risk rating/disposition, release gate, accepted residual, or requirement
MUST update this document, the verification inventory, and the traceability
record together. A new provider, data class, flow, role, surface, channel,
offline behavior, operational path, retention rule, jurisdiction, or analytics
event triggers re-review of affected IDs.

Implementation evidence can close an evidence-pending row only for the exact
version, environment, provider, scope, and limitation tested. A passing UI test
does not prove server authorization, tenant isolation, queue enforcement,
provider custody, deletion completion, backup expiry, or safety outcome.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0 | August 16, 2026 | Alexander Wohlford as Product Owner, Claude assisting | **Approved as CBD-94 v1.0.** Promoted the v0.1.4 content unchanged to the approved provider-independent CBD-94 baseline; the only edits were status, version, and the self-descriptive “draft” wording in §1, §3.6, §4, and §7. No risk, rating, override, disposition, requirement, gate, route, or release effect was altered by approval. Approval fixes the risk model, requirements, and gates as the controlling baseline; it accepts no residual risk, closes no release gate, and closes no evidence or specialist gap. All 21 families remain residual-unscored and evidence-pending. Confluence publication follows the merge to `main` under the repository working rules. | **Product Owner approved** |
| 0.1.4 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Product Owner dispositions on two open review findings. `RV-94-011`: applied the §3.4 mandatory Critical override as a scoped source-level override on `TH-92-001/002/004` within `RK-94-001`, mirroring the existing `TH-92-032/033/044` treatment in `RK-94-010`; the family inherent rating remains 3/5/15 High, non-overridden `TH-92-003` remains High, and §4.1 and §4.2 were updated. The override also reconciles CBD-94 with CBD-92's frozen initial triage, which independently rated those same three threats Critical and `TH-92-003` High. `RV-94-015`: added the §3.7 rule that the §4 requirement column is the dependency set and the §6 `Principal risk/source` column is the ownership set, making the 54 one-directional edges correct by definition rather than a traceability defect. No source routing, requirement text, disposition, owner, gate, or release effect was changed. | Product Owner rating and method decisions incorporated; complete document remains draft |
| 0.1.3 | August 16, 2026 | Claude | Independent exhaustive-review corrections recorded as `RV-94-016`: replaced two stale `v0.1.1` self-scopes in §3.6 and §4 with version-agnostic wording so the no-new-acceptance rule and the unscored-residual rule cannot silently expire against a later draft. No risk, rating, requirement, disposition, gate, or route was changed. Open review findings `RV-94-011` (unapplied §3.4 authentication override) and `RV-94-015` (one-directional risk→requirement edges) remain recorded in the traceability record §13 and are not resolved here. | Editorial correction only; complete document remains draft |
| 0.1.2 | August 16, 2026 | Codex | Rebased the draft onto `be20177` after CBD-92 v1.0 and CBD-93 v1.1 merged. Routed `AB-93-083–086`, `SG-93-096/097`, and `RI-93-019` without changing any approved source behavior; added joint-association disclosure and dissolution-decision guards; and preserved the approved public-launch-only independent-security policy. | Source reconciliation only; complete document remains draft |
| 0.1.1 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Substantive-review revision: preserved the approved public-launch-only independent-security policy; removed a mandatory penetration-test implication; corrected CBD-93 residual count; defined source/family precedence, singular accountability and escalation; added complete rating rationales; corrected inherent-residual likelihoods and scoped lifecycle overrides; classified requirements; parameterized open values; and converted `SG-93-005/014/095` requirements into candidate guards. | Product Owner decision on independent-security gate incorporated; complete document remains draft |
| 0.1.0 | August 16, 2026 | Codex | Initial CBD-94 formal risk method; 21 risk families covering all 45 CBD-92 threats and 82 CBD-93 scenarios; 145 normative requirements; 16 release gates; and architecture/roadmap/Jira update list. | Draft for internal review; no risk acceptance or product decision granted |
