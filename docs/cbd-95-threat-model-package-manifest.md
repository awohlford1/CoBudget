# CBD-95 — Threat-Model and Data-Inventory Package Manifest

| Field | Value |
| --- | --- |
| Status | **Complete draft — Product Owner approval pending** |
| Document version | 0.1.24 |
| Owner | Alexander Wohlford |
| Jira | [CBD-95](https://cobudget.atlassian.net/browse/CBD-95) |
| Parent | [CBD-14](https://cobudget.atlassian.net/browse/CBD-14) |
| Repository baseline | `43e87be93a37097bf0e91cd4d3b4c2f98aa4aa15` |
| Companion reconciliation | `docs/cbd-95-cbd-12-reconciliation-matrix.md` |
| Companion follow-up register | `docs/cbd-95-architecture-roadmap-follow-up-register.md` |
| Completion evidence | `docs/cbd-95-acceptance-criteria-traceability.md` |
| Last updated | August 16, 2026 |

## 1. Purpose and authority

This manifest issues the versioned CBD-14 initial threat-model and data-inventory
package required by CBD-95. It identifies the exact repository sources,
authority, stable identifiers, limitations, and change triggers that a future
reader must use together. It does not duplicate the normative registers and it
does not replace the source artifact in which an identifier is defined.

The package is provider-independent. It is sufficient to constrain product,
architecture, implementation, verification, provider evaluation, and release
work, but it is not implementation evidence or a release approval.

The authority order for this package is:

1. Product Owner-approved CBD-11/CBD-71 and CBD-72 product decisions;
2. approved CBD-91 data, flow, and lifecycle baseline;
3. approved CBD-92 technical model and normative contracts;
4. approved CBD-93 human-abuse analysis, with candidate safeguards kept
   distinct from approved behavior;
5. approved CBD-94 risk, requirement, verification, and gate baseline; and
6. CBD-95 reconciliation and completion evidence, which may classify and route
   those sources but may not silently amend them.

When an earlier planning or Jira field conflicts with a later explicit approved
decision, the discrepancy is recorded and the later approved decision remains
controlling until the Product Owner decides otherwise. This rule does not
permit CBD-95 to invent new behavior.

## 2. Frozen repository package

The following blobs were resolved from the clean `origin/main` baseline at
`43e87be` on August 16, 2026. The intervening CBD-102 and repository-tooling
commits changed none of these frozen sources. A blob change requires the impact
review in §8.

| Component | Version and status | Git blob | Normative use |
| --- | --- | --- | --- |
| `docs/cbd-91-private-mvp-data-inventory.md` | v1.0.1; approved v1.0 plus controlled RF-72-61 amendment | `1e1134415915238752440da4b2e4acaa293d20e6` | 76 data classes, 13 flows, copy/noninterference rules, 24 evidence gaps, conflict register, lifecycle decisions |
| `docs/cbd-92-system-flow-technical-threat-model.md` | v1.0; approved | `7c69addb47f843e080827ba8241636cb948ccad5` | Actors, systems, entry points, trust boundaries, 45 technical threats, 12 review findings, nine normative contract families |
| `docs/cbd-92-acceptance-criteria-traceability.md` | v1.0; approved | `6938bbb0ca8eafad11b4712f1b3d35da432723af` | CBD-92 deliverable/criterion evidence, coverage review, limitations, and public-launch policy |
| `docs/cbd-93-privacy-coercion-abuse-analysis.md` | v1.1; approved | `b84aa6f2aed66c7ffad35a4fc58eead1602bcf65` | 86 abuse scenarios, 96 active safeguards, 10 evidence gaps, residual-analysis register, 19 independent CBD-12 inputs |
| `docs/cbd-94-risk-mitigation-requirement-register.md` | v1.0; approved | `8be224d4ef5779f1743bdd7b4a53f731f31d564e` | 21 risk families, source dispositions, 147 normative requirements, 16 release/process gates |
| `docs/cbd-94-verification-review-inventory.md` | v1.0; approved | `e139cdd75646f8070b8e253ff6cc95c1f6bca966` | 270 verification cases, 15 manual packages, 15 specialist reviews, fixtures, parameters, monitors, and evidence rules |
| `docs/cbd-94-acceptance-criteria-traceability.md` | v1.0.1; approved | `113f7e279fabed75e28748eea7362d9e2111675e` | Bidirectional source routes, expected sets, twelve-part audit, discrepancies, and approval record |
| `docs/cbd-94-exhaustive-review-findings.md` | v1.0; accepted, all findings closed | `c7c02611b7b2c6cfc78ed5467e013b615128b8c6` | Independent re-execution evidence and closed `RV-94-011–017` findings |

The then-current CBD-12/CBD-72 target package is deliberately not called an
approved CBD-14 source package component. It is the reconciliation target:

| Target | Current repository/Jira state | Git blob where applicable |
| --- | --- | --- |
| CBD-12 Jira | In Progress; 36 numbered acceptance criteria; updated August 15, 2026 | Live Jira record, not mirrored locally |
| `docs/cbd-72-collaboration-permission-model.md` | v0.1.52; permission decisions approved, final package gates pending | `f0fb564aada318b125451b9ec2752fcd5657e7e1` |
| `docs/cbd-72-authorization-scenario-catalog.md` | v0.1.13; rule inventory approved, deterministic fixtures pending | `ecc8bd56cd75042f4918c4f51e2a7e43c1ef1d48` |
| `docs/cbd-72-acceptance-criteria-traceability.md` | v0.1.12; all product decisions closed, CBD-14 and other review gates pending | `ed4a410d0442310ecc733a2e547b14ba881039e0` |
| CBD-73 / CBD-74 / CBD-75 / CBD-76 Jira | Ready; each contains current planning text plus the discrepancies recorded by CBD-95 | Live Jira records, not mirrored locally |

## 3. Stable identifier inventory

Ranges are inclusive. A range is shorthand for every individual identifier;
retired identifiers remain tombstones and are never reused.

| Family | Expected set | Defining source | Package meaning |
| --- | --- | --- | --- |
| `DI-91-*` | 76 (`001–076`) | CBD-91 | Data classes |
| `DF-91-*` | 13 (`001–013`) | CBD-91 | Data flows |
| `TH-92-*` | 45 (`001–045`) | CBD-92 | Technical threats |
| `RF-92-*` | 12 (`001–012`) | CBD-92 | Architecture/evidence findings |
| `SA/CA/CL/PA/NT/EM/OP/AN/RL-92-*` | Exact sets defined in CBD-92 §§2.4–2.12 | CBD-92 | Approved normative product/technical contracts |
| `AB-93-*` | 86 (`001–086`) | CBD-93 | Human-abuse and privacy scenarios |
| active `SG-93-*` | 96 (`001–097`, excluding retired `020`) | CBD-93 | Active safeguards and candidate safeguards |
| `EG-91-*` | 24 (`001–024`) | CBD-91 | Data/lifecycle/provider evidence gaps |
| `EG-93-*` | 10 (`001–010`) | CBD-93 | Specialist/research/operating-model gaps |
| `RI-93-*` | 19 (`001–019`) | CBD-93 | Independent Product Owner reconciliation inputs; all `RI-93-001–019` are decided |
| `RK-94-*` | 21 (`001–021`) | CBD-94 register | Risk families |
| `SR-94-*` | 147 (`001–147`) | CBD-94 register | Normative security/privacy requirements and guards |
| `VT-94-*` | 270 (`001–270`) | CBD-94 verification inventory | Ordered verification cases |
| `ME-94-*` | 15 (`001–015`) | CBD-94 verification inventory | Manual evidence packages |
| `SRV-94-*` | 15 (`001–015`) | CBD-94 verification inventory | Specialist reviews and operational exercises |
| `FX-94-*` | 10 (`001–010`) | CBD-94 verification inventory | Reusable fixture families |
| `PR-94-*` | 5 (`001–005`) | CBD-94 verification inventory | Open parameter registries |
| `MON-94-*` | 10 (`001–010`) | CBD-94 verification inventory | Monitoring and escalation obligations |
| `RG-94-*` | 16 (`001–016`) | CBD-94 register | Process, feature, release, and review gates |

CBD-95 adds only `RC-95-*` reconciliation rows, `FU-95-*` follow-up routes, and
`RV-95-*` review findings. It does not renumber an upstream family.

## 4. Package component contract

### 4.1 CBD-91 — data and lifecycle authority

CBD-91 controls classification, audience, prohibited disclosure, flow input,
copy/noninterference, and lifecycle-gap scope. It is not a production schema or
final legal retention schedule. Open `EG-91-*` items remain open even where
CBD-92 or CBD-94 defines a safe ceiling for later implementation.

### 4.2 CBD-92 — technical boundary and approved contracts

CBD-92 controls system/trust-boundary placement and the approved `SA`, `CA`,
`CL`, `PA`, `NT`, `EM`, `OP`, `AN`, and `RL` contracts. These are product and
technical decisions, not optional threat suggestions. In particular:

- customer-data features are online-only for Private MVP;
- push and SMS use one fixed content-free semantic body;
- routine product email is content-free, with purpose-tiered invitation and
  lifecycle/security exceptions;
- routine support has no customer-content path;
- exceptional access and recovery are dual-controlled and separated;
- product analytics and behavioral capture are disabled; and
- every named surface has a concrete, safe rate/resource ceiling before
  release.

### 4.3 CBD-93 — human-harm evidence and decision boundary

CBD-93 controls the human-abuse scenarios, harm analysis, and specialist gaps.
An `SG-93-*` row may be a baseline safeguard, a candidate, a guard, or an
evidence route. Its presence alone does not approve behavior. The 19
`RI-93-*` rows remain independent decisions; grouping them for presentation
does not merge them.

`RI-93-001` is decided: Private MVP retains the current five-role model, Viewer
remains the narrow read-only option, and no supportive-contributor or
configurable/scoped Partner variant is added. `RI-93-002` is decided: access
remains owner-managed and no member-specific observer block is added for
Private MVP; safe leave/unlink paths and accurate prior-copy limitations remain
required. `RI-93-003` is decided: protected authority/scope reductions take
immediate effect and cannot be reversed by the acting person alone; restoration
requires a fresh consented and audited grant. `RI-93-004` is decided: removal
creates no new export entitlement or package for Private MVP. `RI-93-005` is
decided and delivered: export follows the member's frozen archival-time read
scope during the restore window. `RI-93-006` is decided: the Primary-only
deletion flow retains notice, the 30-day restore window, and archival export but
adds no member objection, veto, or delay authority. `RI-93-007` is decided: an
authenticated current or former member may view/export a separate allowlisted
administrative record about themselves while retained; account-subject
authority does not restore budget membership or expose financial, hidden,
other-member, security/support, or operational data. `RI-93-008` is decided: a
person targeted by another author's comment may report it and detach its
association from their own attributed record/presentation without editing,
globally hiding, or deleting the preserved content/evidence or changing
financial state. `RI-93-009` is decided: invitations add concise two-way
category/authority and privacy-boundary disclosure without exposing actual
financial values, hidden resources, private member details, or an unauthorized
member list before acceptance. `RI-93-010A` is approved: a recipient may block
one inviter account across all spaces until the recipient removes the block;
future invitations are suppressed with uniform non-disclosing outcomes and
existing memberships are unchanged. `RI-93-010B` is also approved: decline
presents an explicit unselected choice between the current invitation only and
decline plus the approved inviter block. It adds no separate persistent-decline
state and never converts dismissal, interruption, or ambiguity into a block.
`RI-93-010C` is approved as a pair-scoped cross-space limit for each
authenticated inviter account and privacy-preserving recipient key. It counts
inviter-originated create/resend attempts across spaces, creates no
recipient-wide quota, and cannot block recipient actions, existing memberships,
or unrelated inviters. Uniform outcomes, no raw-recipient counter/log fields,
and the open `PR-94-002` parameter and recovery-evidence gate remain binding.
`RI-93-011` is decided: during acceptance the recipient may optionally verify a
different personal notification-only destination. It activates only after
successful verification and atomic acceptance, remains subject to existing
purpose/channel ceilings, is invisible to the inviter, and grants no identity,
login, recovery, primary-contact, account, invitation-proof, or acceptance
authority. The invited channel is not automatically made a personal
notification destination. Failed or abandoned verification activates nothing
and does not block ordinary acceptance. `RI-93-012` is decided: lifecycle
notices about a subject always create the mandatory authenticated in-app
instance and may use only that subject's verified private safety channel for an
additional external copy. Missing, unavailable, or failed safety delivery never
falls back to another external destination. The channel follows its transport's
content ceiling, is invisible and unchangeable to other members, and grants no
identity, login, recovery, primary-contact, account, or lifecycle-decision
authority. This supersedes CBD-72 §6.3/CBD-91 §7.3 “every channel on record”
only for that subject's external routing; separately entitled members retain
their own in-app events. Focused source synchronization remains open.
`RI-93-013` is decided: an authenticated subject may mark a destination
compromised, immediately quarantining new/queued delivery, its tokens/version,
any safety designation, and any identity/login/factor/recovery authority. A
safe authority replacement must be independently verified before the old
binding is atomically removed. The compromised channel cannot approve its own
retirement, replacement, reactivation, or recovery; support cannot bypass the
boundary. Failure leaves it quarantined, uses the approved identity-recovery
path, and leaves lifecycle routing in-app-only until a new safety channel is
verified. Exact assurance and recovery design remain open under `EG-93-010`.
`RI-93-014` is decided: retain current informational-alert eligibility for
active Primary Owners, Co-owners, Collaborators, and Accountability Partners
within role authorization/masking; Viewers remain ineligible. Add no
subject-first delay or person-responsibility framing. The alert states only an
authorized pending fact and possible changing outcome, excludes actor
attribution, creates no acknowledgement/required-action state, and self-clears
on resolution. Personal delivery and channel ceilings remain unchanged. The
`AB-93-031` observation/surveillance risk remains explicit and unaccepted; no
CBD-95 choice is residual-risk acceptance. `RI-93-015` is decided as a tiered
semantic notice contract. Authenticated in-app notices provide safe event,
before/after role/profile/scope class, effective/scheduled time, material
consequence, remaining state, and supported next-step/deadline detail. Actor
identity follows existing customer-audit entitlement only. Notices exclude
financial/hidden/newly inaccessible content, private reasons/state, precise
inactivity history/countdown, speculation, and unsupported remedies. External
copies remain within `NT/EM-92-*` ceilings. Exact strings, localization,
accessibility/comprehension, privacy/safety review, and tests remain open under
`EG-91-015`. `RI-93-016` is decided as a normative cross-cutting semantic
standard for invitations, consent, roles/permissions, alerts, lifecycle,
channels, exports, comments, recovery, provider/error, and support surfaces.
Completed reauthentication or recorded consent is not proof of free or
voluntary agreement. Channel control is not represented as sole control, and
delivered notifications, downloaded packages, screenshots, printouts, and
recipient-controlled copies are not represented as revocable or erasable by a
server action. Copy does not characterize another person's circumstances or
reasons, imply unsupported authority or accountability, or claim safety,
confidentiality, validation, or compliance. Irreversible consequences are
disclosed before action. Exact strings, locale equivalence,
accessibility/comprehension, privacy/safety/legal evidence, and tests remain
gated. `RI-93-017` is decided for Private MVP: the hard denial of
support-mediated membership, role, ownership, connection-authority, or other
authority transfer is paired with a bounded honest answer. Support cannot
override the rule through escalation; confirm hidden space, membership, owner,
or other-member state; inspect customer content; identify, contact, or mediate
with another member; characterize circumstances; recommend interpersonal
contact; or promise recovery. It may describe only applicable already-approved
personal account/session recovery, in-product leave/unlink, account-subject
record, subject-available evidence, restricted reporting, and generic
owner-managed invitation boundaries without claiming that any restores access.
Exact copy, restricted handling, training, and scenario evidence remain gated;
no public-launch expansion is approved. `RI-93-018` is decided: after the
30-day restoration window, private identity/authentication/recovery, contact,
notification, preference/draft, profile/connection/provider, and
server-controlled derived data is deleted under approved class schedules;
secrets are revoked and supported vendor deletion is requested. Necessary
shared financial facts, provenance, comments, consent, and administrative
history may remain only for an approved service/evidence/legal purpose and
schedule, with customer-visible attribution changed to “Former member” and
cross-space/customer-visible identifiers removed. Any internal subject link is
restricted, purpose-bound, non-customer-visible, and time-limited to audit,
security/abuse evidence, deletion enforcement, non-resurrection, or documented
legal obligations. A minimal deletion ledger remains. Backup/provider expiry
and recipient-controlled copies are described honestly, not as immediate or
remote erasure. Exact schedules, linkage design, implementation, and qualified
privacy/legal evidence remain gated. `RI-93-019` is decided: a current
Primary Owner or Co-owner may immediately dissolve the exact budget-scoped
joint projection after current authority/version/lifecycle/consequence checks.
Contributors receive authenticated in-app pre-notice where safely feasible
without making delivery or acknowledgement a commit dependency and always an
immediate post-outcome notice; external copies remain at their channel ceiling.
The notice explains the separate presentation and derived recomputation while
confirming that links, private connections/provenance, membership, ownership,
financial facts, and other spaces are unchanged. It exposes no private reason
or provenance. Contributors gain no objection, veto, delay, acknowledgement,
or approval position and retain their existing right to remove only their own
source. Re-association remains evidence-bound or unanimously confirmed. The
`AB-93-086` forced-itemization/agency residual remains explicit and unaccepted;
copy, implementation, specialist, and release evidence remain gated. All 19
`RI-93-*` inputs are now decided; no later candidate may be inferred from that
completion.

### 4.4 CBD-94 — risk, requirement, verification, and gate authority

CBD-94 fixes the provider-independent risk model and normative requirement
ceiling. All 21 risks remain without verified residual scores; no residual risk
was accepted by CBD-94. The verification inventory defines obligations, not
passing results. A release gate closes only with its exact evidence and
accountable authority.

`RG-94-015` blocks public product launch until an independent security review;
it does not create a Private-MVP penetration-testing prerequisite.
`RG-94-016` is the CBD-95 final reconciliation gate. Closing it proves package
coverage, CBD-12 outcomes, limitations, and change control; it does not close
the implementation, provider, specialist, legal, privacy, accessibility,
safety, recovery, or public-launch gates.

## 5. Package-wide invariants

The issued package preserves these non-negotiable rules:

1. UI hiding is never authorization; every protected read, mutation, job,
   report, package, notification detail, and audit view is checked server-side.
2. Budget-space identifiers are locators, not authority. Cross-space processing
   is default-deny and complete scope travels with every derived copy.
3. Service authority is closed-list and purpose-bound. It cannot become a
   general bypass of user authority or lifecycle controls.
4. Role, scope, consent, lifecycle, policy, and material versions are rechecked
   at the point that an effect commits or protected detail renders.
5. Revocation invalidates controlled stale reads, jobs, caches, reports,
   packages, and queued delivery; security, audit, deletion, retention, and
   recovery obligations continue only through their approved service purpose.
6. Notification, export, audit, support, telemetry, backup, and provider copies
   are separate disclosure surfaces with independent allowlists and lifecycles.
7. Downloaded and recipient/provider/platform-controlled copies are never
   described as remotely erasable by CoBudget.
8. No role gains money movement, purchase approval, transaction blocking,
   external-account control, another person's acknowledgement, or user lockout.
9. Approved financial and schedule behavior is not weakened by a security
   control; a true conflict requires an explicit Product Owner decision.
10. Candidate safeguards are not silently adopted, and excluding a capability
    is not evidence that the underlying risk is resolved.

## 6. Publication and repository/Confluence state

The CBD-72, CBD-91, CBD-92, and CBD-94 Confluence pages were read on August 16,
2026 and their visible headers match the repository versions listed in §2.
CBD-93 page version 3 was updated on August 16, 2026, but its body exceeds the
connector's synchronous Markdown conversion limit; the merged repository blob
therefore remains the mechanically verifiable authority.

One editorial discrepancy remains in the CBD-93 repository header: it still
labels the linked page a “Published v0.1.2 copy” even though the Confluence page
has since advanced. CBD-95 does not edit the approved CBD-93 source; the issue is
recorded as follow-up `FU-95-005`.

No CBD-95 Confluence target exists at this draft version. CBD-95 pages must not
be created or updated until the corresponding repository documents merge to
`main`. Page registration and synchronization are post-merge work under the
repository's Confluence policy.

## 7. Evidence and limitation statement

This package is an initial internal threat model and data inventory. It reduces
uncertainty and establishes enforceable requirements, but it is not:

- legal, regulatory, compliance, or data-protection advice;
- penetration testing, a security certification, or proof of security;
- an independent security, privacy, accessibility, survivor/advocacy, or
  data-governance review;
- provider due diligence for an unselected service;
- production implementation, operational exercise, or release evidence; or
- market, usability, coercion-safety, or affected-population validation.

Architecture, provider, jurisdiction, data-class, role, channel, offline,
analytics, operations, retention, and safety-process changes can invalidate
parts of the analysis. A positive internal review must not be represented as
external validation.

## 8. Change control and supersession

A change to any of the following requires a CBD-95 impact review before the
package may be cited as current:

- a CBD-91 data class, flow, audience, copy, or lifecycle rule;
- a CBD-92 trust boundary, threat, normative contract, or review finding;
- a CBD-93 scenario, safeguard readiness class, evidence gap, residual, or
  `RI-93-*` decision;
- a CBD-94 risk rating/disposition, requirement, verification route, parameter,
  monitor, or release gate;
- a controlling CBD-12/CBD-72 role, permission, visibility, consent,
  notification, export, audit, archival, deletion, recovery, or cross-space
  rule; or
- an architecture/provider decision that concretizes an open `RF`, `EG`, `PR`,
  `ME`, `SRV`, or `RG` route.

The impact review must identify affected stable IDs, update all forward and
reverse routes, rerun `scripts/audit-cbd-95.py`, and preserve the old revision
in history. A new provider or implementation result closes only the exact
evidence scope tested; it does not update this package by implication.

## 9. Current package disposition

The repository evidence is complete enough to perform CBD-12 reconciliation.
No missing source family blocks the CBD-95 document audit. This result closes
no implementation, specialist-evidence, residual-risk, exact-version approval,
or release gate. All 19 `RI-93-*` product inputs are decided, but those
decisions are requirements rather than implementation or release evidence.

During CBD-95 review on August 16, 2026, the Product Owner reaffirmed the
approved CBD-92 content-free ceiling for push, SMS, and routine email. Protected
detail remains in-app and purpose-specific invitation, lifecycle, and security
email allowlists remain unchanged. This decision does not change a frozen
upstream blob; it resolves `RV-95-001` in favor of the existing authority and
leaves the stale CBD-12, CBD-74, and CBD-58 fields as source-correction work.

The Product Owner also selected the literal dual-control operating model: a
genuinely independent second human must approve before exceptional
customer-content access, key recovery, privileged recovery, or return to
service. The requester cannot self-approve and a solo operator cannot invoke
the path. Retrospective review is additional evidence, not a substitute for
pre-access approval. This reaffirms `OP-92-004/006`; implementation and exercise
evidence remain open under `FU-95-013` and `RG-94-006/009/010`.

The Product Owner retained free-form shared comments as required Private-MVP
scope. Because comments are not optional to that milestone, `EG-93-009` and
`RG-94-011` now block Private-MVP launch until a staffed platform-safety
operating model, qualified safety/privacy review, and operational exercises
pass. This decision creates no budget-space role moderation authority and does
not decide the separate `RI-93-008` remedy candidate.

The controlling reconciliation result is in
`docs/cbd-95-cbd-12-reconciliation-matrix.md`. The package may be approved as a
versioned initial baseline once that matrix, the follow-up register, the
traceability record, and the automated audit pass together and the Product
Owner approves their exact versions.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.0 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Froze the CBD-91 through CBD-94 repository blobs, recorded the live CBD-12/CBD-72 target state, issued the stable-ID inventory, defined component authority and invariants, recorded Confluence state, and established limitations and change control. | Draft; Product Owner approval pending |
| 0.1.1 | August 16, 2026 | Codex | Recorded the Product Owner's reaffirmation of the existing CBD-92 content-free external-notification ceiling and its source-correction effect. | Decision approved; package approval pending |
| 0.1.2 | August 16, 2026 | Codex | Recorded the Product Owner's requirement for genuinely independent pre-access approval of exceptional customer-content and recovery operations; preserved implementation and exercise gates. | Decision approved; implementation and package approval pending |
| 0.1.3 | August 16, 2026 | Codex | Recorded shared comments as required Private-MVP scope and the resulting platform-safety launch gate without changing role authority or deciding the comment-subject remedy. | Decision approved; safety evidence and package approval pending |
| 0.1.4 | August 16, 2026 | Codex | Recorded `RI-93-001`: retain the current five roles for Private MVP and add no narrower supportive-contributor or configurable/scoped Partner variant. | Decision approved; package approval pending |
| 0.1.5 | August 16, 2026 | Codex | Recorded `RI-93-002`: retain owner-managed access for Private MVP, add no selective observer block, and require accurate leave/unlink and prior-copy limitations. | Decision approved; package approval pending |
| 0.1.6 | August 16, 2026 | Codex | Recorded `RI-93-003`: immediate authority/scope reduction with no actor-only reversal; restoration requires a fresh consented grant. | Decision approved; package approval pending |
| 0.1.7 | August 16, 2026 | Codex | Recorded `RI-93-004`: immediate removal with no new removal-time export entitlement or package for Private MVP. | Decision approved; package approval pending |
| 0.1.8 | August 16, 2026 | Codex | Recorded `RI-93-006`: retain Primary-only deletion and existing safeguards without a member objection, veto, or delay position. | Decision approved; package approval pending |
| 0.1.9 | August 16, 2026 | Codex | Recorded `RI-93-007`: add a separate account-subject administrative record accessible after removal while retained, with no budget authority or broader disclosure. | Decision approved; schema/evidence and package approval pending |
| 0.1.10 | August 16, 2026 | Codex | Recorded `RI-93-008`: add report plus subject-controlled association detachment while preserving authored content/evidence and denying global moderation/financial effect. | Decision approved; safety evidence and package approval pending |
| 0.1.11 | August 16, 2026 | Codex | Recorded `RI-93-009`: add two-way invitation category/authority disclosure while preserving the pre-consent data and member-enumeration boundary. | Decision approved; copy/evidence and package approval pending |
| 0.1.12 | August 16, 2026 | Codex | Recorded `RI-93-010A`: add a recipient-controlled cross-space per-inviter block with recipient-only removal, existing-membership preservation, and non-disclosing outcomes. | Choice approved; implementation/evidence and remaining choices pending |
| 0.1.13 | August 16, 2026 | Codex | Recorded `RI-93-010B`: require an explicit decline-once versus decline-and-block choice using the approved inviter block, with no separate persistent-decline state or ambiguous-action escalation. | Choice approved; implementation/evidence and remaining choices pending |
| 0.1.14 | August 16, 2026 | Codex | Recorded `RI-93-010C`: add a pair-scoped cross-space invitation limiter with privacy-preserving keys, uniform outcomes, no recipient-wide exhaustion, and no interference with recipient actions or unrelated inviters. | Decision complete; parameters, implementation/evidence, and remaining choices pending |
| 0.1.15 | August 16, 2026 | Codex | Recorded `RI-93-011`: allow an optional separately verified notification-only destination during acceptance without granting identity, login, recovery, primary-contact, account, or invitation authority or exposing it to the inviter. | Decision approved; implementation/evidence and remaining choices pending |
| 0.1.16 | August 16, 2026 | Codex | Recorded `RI-93-012`: route subject lifecycle notices to mandatory in-app plus only the verified private safety channel, with no external fallback or authority escalation and focused CBD-72/CBD-91 synchronization required. | Decision approved; source synchronization, implementation/evidence, and remaining choices pending |
| 0.1.17 | August 16, 2026 | Codex | Recorded `RI-93-013`: add fail-closed compromised-channel retirement with immediate delivery/authority quarantine, independently verified replacement before atomic removal, in-app-only safety fallback, and no compromised-channel or support approval path. | Decision approved; identity/recovery design, implementation/evidence, and remaining choices pending |
| 0.1.18 | August 16, 2026 | Codex | Recorded `RI-93-014`: retain current informational-alert eligibility, including active Accountability Partners, while prohibiting blame/actor attribution and preserving provisional, non-actionable, self-clearing semantics; residual observation risk remains unaccepted. | Decision approved; copy/implementation/evidence, risk disposition, and remaining choices pending |
| 0.1.19 | August 16, 2026 | Codex | Recorded `RI-93-015`: adopt tiered transparent scope/lifecycle notice semantics—safe before/after consequence and next-step detail in authenticated in-app, channel-ceiling external copies, and no hidden data, private reasons, precise inactivity history, or unsupported remedy claims. | Decision approved; exact copy/evidence and remaining choices pending |
| 0.1.20 | August 16, 2026 | Codex | Recorded `RI-93-016`: adopt a normative cross-cutting semantic standard for consent, channel control, recipient-controlled copies, third-party circumstances, authority/accountability, and disclosure of irreversible consequences before action. | Decision approved; exact copy/evidence and remaining choices pending |
| 0.1.21 | August 16, 2026 | Codex | Recorded `RI-93-017`: for Private MVP, pair the hard support-transfer refusal with a bounded honest response and only applicable authorized routes, without investigation, hidden-state disclosure, member contact, mediation, or recovery promises. | Decision approved; exact copy/operations evidence and remaining choices pending |
| 0.1.22 | August 16, 2026 | Codex | Recorded `RI-93-018`: delete private data after terminal account deletion, pseudonymize necessary retained shared history as “Former member,” restrict and time-bound internal linkage, preserve minimal purpose-bound evidence/deletion records, and make no recipient-copy or immediate-backup erasure claim. | Decision approved; schedules/design/evidence and final choice pending |
| 0.1.23 | August 16, 2026 | Codex | Recorded `RI-93-019`: retain immediate owner/co-owner joint-projection dissolution with safe pre-notice where feasible and mandatory immediate post-notice, no contributor objection/veto/delay/acknowledgement position, unchanged contributor self-source removal, and explicit unaccepted forced-itemization risk. | All `RI-93-*` decisions complete; copy/implementation/evidence and package approval pending |
| 0.1.24 | August 16, 2026 | Codex | Rebaselined to current `origin/main` `43e87be`; verified that all eleven frozen CBD-72/CBD-91–94 blobs remain exact and that intervening CBD-102 and repository-tooling commits do not change package authority or scope. | Rebaseline complete; final audit and Product Owner approval pending |
