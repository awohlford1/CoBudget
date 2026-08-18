# CBD-73 — Negative and Recovery Test Inventory

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — Product Owner review required** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-73](https://cobudget.atlassian.net/browse/CBD-73) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Governing specification | `docs/cbd-73-invitation-consent-lifecycle-specification.md` |
| Message inventory | `docs/cbd-73-customer-message-inventory.md` |
| Traceability | `docs/cbd-73-acceptance-criteria-traceability.md` |
| Last updated | August 18, 2026 |

## 1. Purpose and assertion contract

This inventory supplies the negative and recovery acceptance evidence for the CBD-73 lifecycle. Every completed scenario must state the actor and their membership or possession state, the budget space, the invitation/membership/proposal state and versions at start, the action, the expected visible result, the protected-state delta (which must be none for every denial), the audit outcome, and the notification outcome.

A denied scenario passes only when the action is unavailable or safely absorbed in the interface, a direct request is denied server-side, protected state is unchanged, no restricted data or existence signal is returned or inferable (including through response timing and shape), and a safe audit event is recorded. A recovery scenario passes only when the person is left with the specification's stated safe, understandable next step.

Scenario IDs are stable and never reused or renumbered. Family prefixes are new to CBD-73 and do not collide with the CBD-72 catalog families recorded in `docs/cbd-93-privacy-coercion-abuse-analysis.md` §12.

## 2. Scenario families

| Prefix | Family | Minimum coverage |
| --- | --- | --- |
| INV | Invitation lifecycle | Creation authority, supersede/cancel/expiry invalidation, delivery failure recovery, duplicate handling, archived-space refusal |
| VER | Channel verification and attachment | Forwarded link, wrong channel, bounded attempts, account attachment with differing primary contact, verification-is-not-consent |
| CNS | Consent and disclosure | No pre-acceptance access, stale disclosure version, consent-evidence completeness, ceremony-surface data boundary |
| DCL | Decline, block, and limiting | Decline once, decline and block, uniform non-disclosure, cross-space block scope, pair-scoped limiting, unrelated-inviter noninterference |
| DST | Notification-only destination | Activation only on acceptance, failure isolation, inviter invisibility, non-promotion, authority non-escalation, replay |
| CHG | Role and scope change | Expansion consent gate, reduction immediacy, mixed change, stale proposal, unauthorized change attempt |
| RVK | Revocation and removal | Self-revocation, sole-Primary exception, owner removal, protected Co-owner removal, cutoff completeness (sessions, queues, jobs, in-flight), code non-restoration, attribution retention, cross-space isolation |
| TRF | Ownership-transfer consent | Dual consent, stale/self/unaccepted denial, prior-role closure evidence |

## 3. Scenario inventory

Status for every row is `Drafted; Product Owner rule review required`. Deterministic fixture elaboration is test-design scope under the CBD-94 verification inventory (`VT-94-*`), matching the CBD-72 disposition.

### 3.1 INV — invitation lifecycle

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| INV-01 | A Collaborator, Viewer, and Accountability Partner each attempt to create, resend, and cancel an invitation; a Co-owner attempts to create a Co-owner invitation. | Every attempt is denied server-side with no invitation record, no state change, and a denial audit event; no control is offered. Co-owner invitations are Primary-only. | CBD-72 permissions 24/26; IC-73-011; TR-73-01 |
| INV-02 | An owner resends an invitation; the original link is then presented. | A successor invitation exists; the superseded invitation and its code are permanently invalid; presenting the old code yields the uniform `MSG-73-020` outcome, no state change, and AE-73-14. | TR-73-05; IC-73-006; CBD-73-AC05 |
| INV-03 | An owner cancels a pending invitation; the recipient later opens the link. | The invitation is Cancelled and its code invalid; the holder sees the uniform outcome with the safe recovery path; nothing discloses who cancelled or why. | TR-73-06; MSG-73-020; IC-73-010 |
| INV-04 | An invitation reaches its expiry while the recipient has the ceremony open but has not accepted. | The commit-time recheck denies acceptance; no membership, consumed code, or destination activation exists; the recipient sees `MSG-73-021` with the fresh-invitation recovery. | TR-73-07/TR-73-13; PM-72-003 |
| INV-05 | Delivery conclusively fails (bounce) for an invitation. | The invitation is Failed; the inviter sees the safe failure class and the resend/replace or cancel recovery; no recipient account existence or block state is disclosed. | TR-73-04; MSG-73-003; IC-73-010 |
| INV-06 | An owner creates a second invitation to the same intended recipient while one is active in the same space. | TR-73-05 semantics apply: the older invitation is superseded and invalidated; exactly one active invitation remains; both events are audited and linked. | §4.4 item 4; CBD-73-AC05 |
| INV-07 | An owner attempts to create an invitation in an archived budget space. | Denied: archival stops invitations. No record is created; the denial is audited. | `DI-91-004`; TR-73-01 preconditions |
| INV-08 | The membership that created a pending invitation is removed; the recipient then attempts acceptance. | The invitation was cancelled by the system at the creating authority's revocation (cause recorded); acceptance is denied with the uniform outcome; another owner may issue a fresh invitation. | §4.4 item 6; PM-72-003 |
| INV-09 | An accepted invitation's code is presented again after acceptance, from the same and from a different device. | The code is Consumed; every presentation is denied with the uniform outcome, changes nothing, creates AE-73-14, and repeated attempts feed abuse controls. | §4.3; IC-73-006; CBD-12-AC35 |

### 3.2 VER — channel verification and attachment

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| VER-01 | A person who received a forwarded invitation link — valid code, wrong hands — attempts to proceed without control of the invited channel. | Channel verification fails; the ceremony cannot reach disclosure or acceptance; no budget-space, inviter, or recipient detail is disclosed pre-verification; bounded attempts and uniform outcomes apply. | IC-73-003; §7.1; MSG-73-010/011 |
| VER-02 | The invitation was sent to the wrong channel (a typo destination controlled by a stranger); the stranger verifies the channel and views the disclosure. | Verification succeeds because the stranger controls the invited channel, but the disclosure shows no financial data and acceptance binds only through an authenticated account; the inviting owner's recovery is cancel or replace toward the correct destination, invalidating this invitation. The scenario documents the wrong-recipient residual: pre-acceptance disclosure content is the two-way disclosure minimum, which is why it excludes financial data and member lists. | §7.2; `RI-93-009`; TR-73-05/06 |
| VER-03 | Verification is attempted repeatedly with wrong proofs, then abandoned. | Attempts are bounded, cooled down, and uniformly answered; the invitation remains active and unusable for acceptance; no lockout of the invitation itself creates an inviter-visible signal. | §5 item 6; `FU-95-015`; IC-73-010 |
| VER-04 | A verified recipient signs in to an existing CoBudget account whose primary email differs from the invited channel, and accepts. | Acceptance attaches to that account; membership activates; the invited channel is not added to the account and not promoted to any destination; consent evidence names the account, not the channel. | CBD-73-AC17; CBD-12-AC36; §5 item 4 |
| VER-05 | A recipient verifies the channel, then stops; later a different person with the same link attempts acceptance in a fresh context. | Verification evidence is ceremony-bound: the new context must verify again; nothing persisted from the earlier ceremony confers progress or disclosure. | §5 items 1–3; DR-73-03 |
| VER-06 | After verification, the person attempts to use the verified state as account authority: password reset, sign-in, or contact change for the account that holds the invited channel. | Nothing: channel verification grants no identity, login, recovery, or account authority anywhere; identity flows are separate (`FU-95-007`). | IC-73-005; VER family boundary |

### 3.3 CNS — consent and disclosure

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| CNS-01 | A recipient opens the link and verifies the channel but never accepts; meanwhile every read, search, export, alert, and derived surface is checked for their visibility into the space, and members' surfaces are checked for the pending invitee. | Nothing on either side: no access, no alert eligibility, no search or derived presence, no member-visible ceremony detail. Pending confers nothing. | IC-73-001; §4.4 items 3/7; CBD-72 §2.1 |
| CNS-02 | The disclosure version changes (replacement invitation) while a recipient holds the old ceremony open; they attempt acceptance against the superseded version. | Commit denies: acceptance binds to the current version only; the recipient re-enters through the successor invitation and sees the current disclosure. | §6 item 3; TR-73-13 preconditions |
| CNS-03 | An acceptance commits; the consent evidence record is inspected. | It contains person, budget space, membership, role, resource scope, timestamp, consent-copy version, and source resolving to the acceptance surface and invitation version — all populated, none inferable-only. | CBD-73-AC04; DR-73-04 |
| CNS-04 | The pre-verification ceremony surface and the external message are inspected for data content. | The external message carries only the approved minimum within channel ceilings; pre-verification surfaces show no budget-space, inviter, member, or financial detail; the full disclosure appears only after verification, and actual financial data appears nowhere pre-acceptance. | §7.1; `RI-93-009`; MSG-73-002/010 |
| CNS-05 | A Viewer invitation carrying an intended initial profile is accepted; a second Viewer invitation carrying no profile is accepted. | The first membership activates with exactly the disclosed, consented profile; the second activates with no profile and no visibility until a §10 consented assignment. Both consent records name the resulting scope. | §7.2 item 3 and closing rule; CBD-72 §5.1 items 1–2 |

### 3.4 DCL — decline, block, and limiting

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| DCL-01 | A verified recipient declines once; the same inviter later invites them again. | The invitation is Declined and its code invalid; no block exists; the later invitation proceeds normally subject to limits. | TR-73-11; §8.1 |
| DCL-02 | A verified recipient chooses decline-and-block; the inviter creates invitations to them from two different budget spaces afterward. | Both later invitations are suppressed with uniform non-disclosing outcomes; the inviter observes nothing distinguishing suppression from an ordinary unaccepted invitation; no notification reaches the recipient. | TR-73-12; §8.2; `RI-93-010A` |
| DCL-03 | The blocked inviter and the blocking recipient share an existing budget space; the block is created. | Nothing changes in the shared space: memberships, roles, visibility, alerts, and interactions continue under existing rules. | §8.2 item 3 |
| DCL-04 | The ceremony is interrupted (closed, timed out) at the choice surface. | No decline and no block exists; the invitation remains active until expiry or another terminal transition. | TR-73-11 recovery; `RI-93-010B` |
| DCL-05 | The recipient removes their block; the same inviter invites again. | The new invitation proceeds normally; block removal is recipient-only, audited in personal-account scope, and invisible to the inviter. | §8.2 items 1/4; AE-73-26 |
| DCL-06 | One inviter exhausts the pair-scoped limit against one recipient by repeated create/resend. | Further attempts produce uniform, non-disclosing outcomes with equivalent response and timing; no recipient-wide quota is consumed; limiter state holds no raw recipient identifier. | §8.3; `RI-93-010C`; `RL-92-003`–`005` |
| DCL-07 | While DCL-06's limit is exhausted, an unrelated inviter invites the same recipient, and the limited inviter invites a different recipient. | Both succeed normally: the limit binds one inviter–recipient pair only, in both directions. | §8.3 item 2; `FU-95-019` |
| DCL-08 | An owner inspects budget-space audit surfaces and the administrative-history export for evidence of blocks or limits affecting their invitations. | Nothing: block and limiter records never appear in budget-space audit or export surfaces; denied creations show only the uniform inviter-facing behavior. | §14 item 4; CBD-72 §5.7 |
| DCL-09 | A recipient with no CoBudget account is targeted; block and limiter behavior is compared with an account-holding recipient. | Outcomes are indistinguishable: privacy-preserving matching covers unlinked destinations, and no response reveals whether an account exists. | §8.2 item 5; IC-73-010 |

### 3.5 DST — notification-only destination

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| DST-01 | A recipient nominates and verifies a destination, then declines the invitation. | Nothing activates; the destination record is inert; no delivery ever occurs to it. | §9 item 3 |
| DST-02 | A recipient nominates a destination whose verification fails or is abandoned, then accepts. | Acceptance completes normally; no destination activates; the invited channel is not promoted as a substitute. | §9 items 2/6; `RI-93-011` |
| DST-03 | After an acceptance with an active destination, the inviter and every other member attempt to view it through membership surfaces, audit, and export. | Invisible everywhere: personal-account state only. | §9 item 4; CBD-72 §5.4 |
| DST-04 | The destination is presented as authority: sign-in, recovery, invitation proof for a later invitation, or acceptance channel. | Nothing: the destination grants no identity, login, recovery, primary-contact, account, invitation-proof, or acceptance authority. | §9 item 5; IC-73-005 |
| DST-05 | A stale destination-verification proof from an earlier ceremony is replayed in a new acceptance. | Denied: destination verification is ceremony-bound and activation is atomic with its own acceptance only; no activation occurs. | §9 items 2–3; DR-73-07 |

### 3.6 CHG — role and scope change

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| CHG-01 | An owner proposes Viewer→Collaborator; the member has not yet consented; the member's access is inspected; then the member consents. | Before consent nothing changes and no expanded access exists; after consent the transition commits atomically with new consent evidence, and orientation notices issue. | §10 items 2–3; IC-73-007; MSG-73-030/031 |
| CHG-02 | An owner reduces a Viewer's profile scope; timing of effect and notice is measured. | The reduction commits immediately and atomically — reads, search, reports, alerts, caches, open work, and pending packages invalidate — and the member receives the safe before/after notice; consent is neither sought nor required. | §10 item 4; CBD-72 permission 22; MSG-73-032 |
| CHG-03 | An owner proposes a mixed change (Collaborator→Viewer with an initial profile). | The change is consent-gated as a whole; nothing applies before consent; on consent the atomic transition applies both the loss and the disclosed new scope. | §10 item 2 |
| CHG-04 | A member consents to an expansion after the owner modified the proposal. | Commit denies: consent binds the proposal version; the modified proposal requires fresh disclosure and consent. | §10 item 5; PM-72-005 |
| CHG-05 | A Collaborator, Viewer, and Accountability Partner each attempt to change their own or another member's role or scope directly. | Denied with no control offered, no state change, and denial audit: change proposal authority is owner-only under CBD-72 permissions 22/25/26. | CBD-72 §4.3; IC-73-011 |
| CHG-06 | An owner attempts to expand a member's access unilaterally by editing the membership record through any direct path. | Denied: no path applies expanded access without the member's new consent; the attempt is audited. | IC-73-007; CBD-12-AC16 |
| CHG-07 | A member declines an expansion proposal, and a proposal expires unconsented. | Nothing changes in either case; the proposer sees the safe outcome; declining an expansion has no effect on current access. | §10 item 3; AE-73-18 |

### 3.7 RVK — revocation and removal

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| RVK-01 | A Collaborator self-revokes while holding an open editing session, a queued alert delivery, a scheduled job, and an in-flight mutation. | The membership ends at commit: the session loses this space's authority without global sign-out; queued unsent deliveries are suppressed; the job reauthorizes and denies before effect; the in-flight mutation fails its commit-time recheck with no partial state; every cutoff completion is audited. | RC-73-01–07; AE-73-21/23; CBD-73-AC09 |
| RVK-02 | A removed member immediately retries reads, searches, exports, report opens, and alert interactions with previously valid handles, links, and cached artifacts. | Every path denies; caches, derived artifacts, pending downloads, and packages are invalidated; no response leaks the data through shape, counts, or timing. | RC-73-01/05; PM-72-006 |
| RVK-03 | A removed member presents every invitation code they ever held for that space, including the originally accepted one. | All permanently invalid; access is restorable only by a new invitation and full ceremony. | RC-73-08; IC-73-006; CBD-12-AC17 |
| RVK-04 | A member of spaces A and B is removed from A; their session, memberships, alerts, and blocks are inspected in B and at account level. | B and the account are untouched: sign-in persists, B's role and alerts continue, personal settings and blocks persist. | RC-73-10; IC-73-008; CBD-73-AC10 |
| RVK-05 | After removal, the space's records are inspected for the former member's contributions and identity presentation. | Contributed shared work remains, attributed via the safe display identity; the former member cannot read, edit, or remove it through the ended membership. | RC-73-09; IC-73-009; CBD-72 §5.6 item 7 |
| RVK-06 | A sole active Primary Owner attempts self-revocation, deactivation, and membership deletion. | Each is denied without state change; the flow always offers both supported exits — transfer and archival — and the denial with exits offered is audited. | IC-73-014; MSG-73-036; AE-73-24; CBD-72 §6.3 |
| RVK-07 | A Co-owner attempts to remove another Co-owner; a Collaborator attempts to remove a Viewer; the Primary removes a Co-owner with a stale reauthentication and then with a fresh one. | The first two deny (permission 27 is Primary-only; permission 24 is owner-only). The stale protected action denies at commit; the fresh one commits with the full §6.1 contract and RC-73 checklist. | CBD-72 permissions 24/27, §6.1; RC-73-14 |
| RVK-08 | A removal commits while a notification to the removed member is mid-delivery, and delivered external copies already exist. | Queued unsent attempts are suppressed; already-delivered copies are untouched and never claimed revocable; the member and owner notices follow the safe semantics. | RC-73-03/12; `RI-93-016` |
| RVK-09 | A connection-authorizing Collaborator is removed while their connection is syncing. | That connection's synchronization stops; imported records and provenance remain; private configuration becomes inaccessible; no member inherits the connection. | RC-73-11; CBD-72 §6.3; PM-72-011 |
| RVK-10 | A removed member's account later reappears through a fresh invitation and acceptance to the same space. | A new membership with new consent evidence exists; prior consent, roles, and scopes confer nothing; history attribution links the person's contributions per the display-identity rules. | IC-73-006; §6 item 4; DR-73-04 |
| RVK-11 | A cross-space actor holding valid membership in space B replays space A identifiers (membership, invitation, proposal, package) through every lifecycle API. | Default deny before protected detail; no state change; cross-space denial audit events. | CBD-72 PM-72-010; IC-73-012 |
| RVK-12 | An owner attempts removal with a confirmation naming a different member than the commit target (stale selection), and concurrently with another owner's removal of the same member. | The mismatched confirmation denies; the concurrent duplicate resolves deterministically with one commit and one no-op denial; no double effects or partial state. | RC-73-14; PM-72-005 |

### 3.8 TRF — ownership-transfer consent

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| TRF-01 | A transfer is attempted with recipient acceptance but no fresh Primary confirmation, then with confirmation but a stale recipient disclosure version. | Both deny at commit with no partial change: the ceremony requires both current consents against current versions. | §12 items 2–4; CBD-72 §6.2 items 3–5 |
| TRF-02 | Transfer to a pending invitee, an inactive member, and the Primary themself. | Each denies safely with no role, membership, or connection change, matching CBD-72 OWN-06. | CBD-72 §6.2 item 1/5; §12 item 4 |
| TRF-03 | A Viewer accepts a transfer; after commit, the consent and audit trail is inspected. | Recipient consent evidence (with disclosure version and assurance reference), Primary confirmation evidence, and the commit form one correlated group; the prior Viewer profile state closed atomically; personal preferences persisted. | §12 items 2–3/5; AE-73-25 |
| TRF-04 | A shut-out member asks support to transfer ownership or reveal hidden membership state. | Refused as a product rule; the response follows the `RI-93-017` bounded honest-response scope (CBD-75 copy), and no support path mutates ownership. | §12 item 6; CBD-72 §6.3 |

## 4. Required-case coverage check

CBD-73-AC14 names a minimum case set. Each resolves to at least one scenario:

| Required case | Scenarios |
| --- | --- |
| Wrong recipient / wrong channel | VER-01, VER-02 |
| Wrong budget space | RVK-11 |
| Invalid, expired, or reused reconciliation code | INV-02, INV-04, INV-09, RVK-03 |
| Revoked consent | RVK-01, RVK-02, RVK-03, CHG-07 |
| Stale session | RVK-01, RVK-02 |
| Queued alert | RVK-01, RVK-08 |
| Unauthorized role change | CHG-05, CHG-06 |
| Cross-space isolation | RVK-04, RVK-11, DCL-02, DCL-03 |

## 5. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft: assertion contract, eight scenario families, 57 scenarios (9 INV, 6 VER, 5 CNS, 9 DCL, 5 DST, 7 CHG, 12 RVK, 4 TRF), and the AC14 required-case coverage check. | Draft; Product Owner review required |
