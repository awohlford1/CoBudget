# CBD-73 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — Product Owner review required** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-73](https://cobudget.atlassian.net/browse/CBD-73) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Lifecycle specification | `docs/cbd-73-invitation-consent-lifecycle-specification.md` |
| Message inventory | `docs/cbd-73-customer-message-inventory.md` |
| Test inventory | `docs/cbd-73-negative-recovery-test-inventory.md` |
| Last updated | August 18, 2026 |

## 1. Completion rule

CBD-73 is complete only when the lifecycle specification covers every required state, transition, verification, consent, change, revocation, removal, and transfer behavior with actor, preconditions, resulting state, customer message, notification, audit event, and failure/recovery defined; every CBD-73 criterion and every supported CBD-12 criterion maps to specification and scenario evidence in both directions; the routed `RI-93-009`–`RI-93-011` and applicable `RI-93-001`–`RI-93-019` decisions are carried without weakening; the discrepancies in §6 are dispositioned; the exact version is approved by the Product Owner; the Jira issue is synchronized (description, acceptance criteria, and traceability summary all matching, per the RF-72-57 standard); and the approved artifacts are published to Confluence after merge.

## 2. Deliverable traceability

| Jira deliverable | Evidence | Scenario evidence | Status |
| --- | --- | --- | --- |
| State diagram and transition table | Specification §4.2 (diagram), §4.1/§4.4 (states and transitions) | INV, VER families | **Drafted.** Product Owner review required |
| Invitation and consent data requirements | Specification §13 (DR-73-01–09), §5–§6 | CNS-03, DST-05, TRF-03 | **Drafted.** Product Owner review required |
| Customer-facing message inventory | Message inventory §3 (MSG-73-001 through MSG-73-042, 28 rows) with §2 semantic rules | Message assertions embedded across families | **Drafted at semantic level.** Exact strings gated under `FU-95-017` |
| Revocation/removal checklist | Specification §11.2 (RC-73-01–14) | RVK-01–12 | **Drafted.** Product Owner review required |
| Audit-event inventory | Specification §14 (AE-73-01–26) with placement rules | Audit assertions in every denied/committed scenario | **Drafted.** Product Owner review required |
| Negative and recovery test inventory | Test inventory §3 (57 scenarios, 8 families), §4 required-case check | All | **Drafted.** Fixture elaboration remains test-design scope under `VT-94-*` |

## 3. Per-criterion acceptance-criteria mapping

Forward direction: every CBD-73 criterion maps to controlling specification evidence and at least one scenario.

| AC | Requirement (abbreviated) | Specification evidence | Scenario evidence |
| --- | --- | --- | --- |
| CBD-73-AC01 | State model for creation, pending, delivered, accepted, expired, superseded, cancelled, failed, and consumed outcomes. | §4.1–§4.2; Consumed on the code object (§4.1, §4.3) | INV-01–09 |
| CBD-73-AC02 | Creation records space, inviter, channel, destination, role, visibility scope, issue time, expiry, and version. | §4.4 TR-73-01; §13 DR-73-01 | INV-01, INV-06, CNS-04 |
| CBD-73-AC03 | Pre-acceptance disclosure of space, inviter, role, resources, actions, restrictions, alert behavior, and revocation method. | §7.2; MSG-73-016 | CNS-04, CNS-05, VER-02 |
| CBD-73-AC04 | Explicit affirmative acceptance separate from link opening and channel verification; consent evidence fields. | §6; §4.4 TR-73-13; §13 DR-73-04 | CNS-01, CNS-03 |
| CBD-73-AC05 | Resend/replacement invalidates superseded codes; duplicate, expired, cancelled, failed, and consumed codes have safe recovery. | §4.3; §4.4 TR-73-05/TR-73-14; §4.4 item 4 | INV-02, INV-03, INV-05, INV-06, INV-09 |
| CBD-73-AC06 | Expansion requires explicit disclosure and new consent before expanded access begins. | §10 items 2–3; IC-73-007 | CHG-01, CHG-03, CHG-06 |
| CBD-73-AC07 | Reduction takes effect immediately and notifies without requiring consent. | §10 item 4; MSG-73-032 | CHG-02 |
| CBD-73-AC08 | Self-revocation without another party's approval; authorized owner removal through prominent confirmation flows. | §11.1; RC-73-14; carried with the CBD-12-AC17 sole-Primary exception (§6 item 1 below) | RVK-01, RVK-06, RVK-07 |
| CBD-73-AC09 | Immediate authorization/alert cutoff, queued-notification suppression, scoped session invalidation without global sign-out, cache/job/active-request execution requirements. | §11.2 RC-73-01–07; IC-73-008 | RVK-01, RVK-02, RVK-08 |
| CBD-73-AC10 | No effect on sign-in, other memberships, or roles elsewhere; prior codes cannot restore; restoration needs a new invitation. | RC-73-08/RC-73-10; IC-73-006/IC-73-008 | RVK-03, RVK-04, RVK-10 |
| CBD-73-AC11 | Lifecycle events notify affected users where appropriate and are budget-space scoped and auditable; contributed work remains attributed. | §14 with placement rules; §7.3; RC-73-09/RC-73-12; IC-73-009 | RVK-05, RVK-08, TRF-03 |
| CBD-73-AC12 | Each lifecycle state defines actor, preconditions, resulting state, message, notifications, audit event, and failure/recovery. | §4.4 transition-table columns; §10–§12 for post-acceptance flows | Every scenario's assertion contract (test inventory §1) |
| CBD-73-AC13 | Consent and revocation copy is voluntary, accessible, nonjudgmental, with a safe path to decline or leave. | §6 item 5; message inventory §2 items 1–2; MSG-73-013/017/033/036 | DCL-01, DCL-04, RVK-06 |
| CBD-73-AC14 | Test inventory covers wrong recipient/channel, wrong space, invalid/expired/reused code, revoked consent, stale session, queued alert, unauthorized role change, cross-space isolation. | Test inventory §3–§4 | Test inventory §4 table |
| CBD-73-AC15 | Recipient must verify control of the exact invited channel; a forwarded link is insufficient. | §5; IC-73-003 | VER-01, VER-03, VER-05 |
| CBD-73-AC16 | Link exposes only an opaque single-use code; server-side record is authoritative for role, scope, recipient, consent, and state. | §4.3; IC-73-002 | INV-09, VER-01, RVK-03 |
| CBD-73-AC17 | After invited-channel verification the invitation may attach to an existing account with a different primary contact. | §5 item 4; §4.4 TR-73-10 | VER-04 |

Reverse direction: every scenario family resolves to at least one criterion — INV to AC01/AC02/AC05; VER to AC15/AC16/AC17; CNS to AC03/AC04; DCL to AC13 and the §5 routed decisions; DST to the §5 routed `RI-93-011` decision under AC12's lifecycle contract; CHG to AC06/AC07; RVK to AC08–AC11/AC14; TRF to AC08/AC11/AC12 via specification §12. Every message row's trigger resolves to a specification transition, checklist item, or governing decision (message inventory §4), and every message ID cited by the specification resolves to a row. No scenario, message, or criterion is orphaned.

**Known limit.** This mapping records that draft evidence exists for each criterion, not that any row is approved. Every scenario status is `Drafted; Product Owner rule review required`, and exact copy remains gated; per-criterion sufficiency is asserted at draft rule level only.

## 4. Supported CBD-12 criteria

CBD-73's traceability summary claims support for CBD-12-AC12 through AC18, AC22, AC27, and AC34 through AC36. Each maps to package evidence:

| CBD-12 AC | Package evidence |
| --- | --- |
| AC12 — invitation behavior for creation/delivery, acceptance, expiration, resend, replacement, cancellation, failure | Specification §4 |
| AC13 — pre-acceptance identification of space, inviter, role, resources, actions, restrictions, alert behavior, revocation method | Specification §7.2; MSG-73-016 |
| AC14 — explicit affirmative consent with recorded person, space, role, scope, timestamp, copy version, source | Specification §6; DR-73-04 |
| AC15 — duplicate, superseded, expired, and used links have defined safe recovery | Specification §4.3–§4.4; MSG-73-020; INV/VER scenarios |
| AC16 — expansion re-consent; immediate notified reductions; explicit revocation/removal authorization, messaging, resulting state | Specification §10–§11; MSG-73-030–035 |
| AC17 — unilateral revocation with the bounded sole-Primary exception; immediate cutoff; code invalidation; re-invitation; other-space isolation; retained attributed work | Specification §11; IC-73-006/008/009/014; RVK scenarios |
| AC18 — lifecycle events notify affected users and produce budget-space-scoped audit events | Specification §14; §7.3; MSG rows 019/031/032/035/042 |
| AC22 — safety: coercion-aware copy, revocation, recovery, support resources, no member left without a supported exit | Message inventory §2; MSG-73-034/036; IC-73-014; specification §11.3 |
| AC27 — precision separating implementation requirements from execution-level decisions and test classes | Specification §15 register; test inventory families; this record |
| AC34 — one invited channel; verified control before acceptance | Specification §5; VER scenarios |
| AC35 — opaque single-use code resolving the authoritative record; invalidation on resend/replacement/cancellation/acceptance/expiration | Specification §4.3; INV-02/09 |
| AC36 — attachment to an existing account with a different primary contact after verification | Specification §5 item 4; VER-04 |

## 5. Routed decisions and follow-up coverage

The August 18, 2026 CBD-73 Jira comment routes four `FU-95-*` rows here. This section records what this package supplies and what remains open. Nothing here closes a register row; closure requires the evidence each row names.

| Row | What this package supplies | What remains open |
| --- | --- | --- |
| `FU-95-005` (P3, closed August 16, 2026) | This package cites CBD-71 **v1.1** and CBD-72 **v0.1.53** as authoritative throughout, consistent with the closed row. | Nothing — the row is closed; this package must simply not regress it. |
| `FU-95-017` (P1) | The versioned invitation/consent/lifecycle copy inventory at semantic level, including the two-way disclosure comparison (§7.2 items 3–4), the invitation-proof versus notification-destination boundary (IC-73-005; specification §9), and the `RI-93-016` semantic standard enforced across every row (message inventory §2). | Exact strings, template hashes, locale/accessibility/comprehension evidence, specialist review, and every fixture the row names. The row's semantic contract is carried; its evidence is not produced here. |
| `FU-95-018` (P0) | The CBD-73-scope portions of the decided agency rules: `RI-93-003` no-reversal restoration (specification §10 item 4), `RI-93-007` subject-record reference in removal messaging (MSG-73-034), `RI-93-017` support-refusal boundary (specification §12 item 6; TRF-04). | `RI-93-001/002/004–006/008/019` implementations target other issues (CBD-12/74/75/76 and the platform-safety/lifecycle work); all implementation and `SR-94-146/147` evidence remains blocked per the register. |
| `FU-95-019` (P1) | Complete requirement-level incorporation of `RI-93-009` (two-way disclosure, §7.2), `RI-93-010A` (inviter block, §8.2), `RI-93-010B` (explicit unselected decline choice, §8.1/MSG-73-017), `RI-93-010C` (pair-scoped limit, §8.3), and `RI-93-011` (notification-only destination, §9), with schemas (DR-73-05–07), copy semantics, and scenarios (DCL, DST families). | Exact limiter parameters and evidence in `PR-94-002`; implementation and the row's full fixture list; the row stays open until that evidence exists. |

## 6. Discrepancy and decision register

Discrepancies follow the approved-documents-over-ticket-text rule: the approved CBD-12/CBD-72 outcomes govern, and the Jira text needs correction under authorized change control.

| # | Item | Disposition |
| --- | --- | --- |
| 1 | **CBD-73-AC08 omits the sole-Primary exception.** The Jira AC states unconditional self-revocation, while amended CBD-12-AC17 and CBD-72 §6.3 carry the bounded exception (a sole active Primary Owner's exits are transfer and archival, both always offered). | Package follows the approved documents (IC-73-014; RVK-06). CBD-73-AC08 in Jira needs a correcting amendment when the package is synchronized; flagged for Product Owner authorization. |
| 2 | **Declined state extends the AC01 minimum list.** AC01 does not name a declined outcome, but the approved `RI-93-010B` decision requires an explicit decline choice and the CBD-73 scope names rejected invitations. | Declined is modeled as a distinct terminal state (specification §4.1). AC01's list is treated as a minimum; the Jira AC may be amended to include Declined at synchronization. |
| 3 | **Creating-authority revocation cancels open invitations** (specification §4.4 item 6). This deterministic rule is a CBD-73 proposal derived from PM-72-003 default-deny reasoning, not an existing approved outcome. | Routed for Product Owner decision as specification §15 item 8. |
| 4 | **Inviter-visible presentation of a decline** (distinguishable from expiry or not) is undecided; the specification defaults to a non-attributing presentation pending decision. | Routed for Product Owner decision as specification §15 item 7, with the `FU-95-017` copy review. |
| 5 | **Viewer initial-profile composition.** CBD-72 §5.1 item 1 (a new Viewer membership starts with no profile) composes with CBD-73-AC02's required permitted-visibility-scope field: an invitation may carry an intended initial profile that is disclosed, consented, and applied atomically at acceptance; an invitation without one produces a no-visibility membership. | Recorded as the specification §7.2 closing rule; explicitly part of the Product Owner review scope (CNS-05 exercises both paths). |
| 6 | **Planning-note due date is stale.** The Jira planning notes say due August 21, 2026 sequenced after CBD-72 (August 19); the live due date is August 24, 2026. | Informational only; no package impact. Correct with the next authorized Jira update if the Product Owner wishes. |

## 7. Governing inheritance

| Source | Required inherited outcome | Evidence |
| --- | --- | --- |
| CBD-72 v0.1.53 (approved August 18, 2026) | Invitation/membership administration authority (permissions 24–29), one-active-role and one-Primary invariants, protected-action contract, transfer mechanics, sole-owner exits, connection-authorizer boundary, comments attribution, audit schema | Specification §3/§10–§12/§14 cite the controlling sections; no CBD-72 outcome is restated with different meaning |
| CBD-71 MVP Schedule Decisions v1.1 (approved August 15, 2026) | Alert semantics (informational/firm), mandatory in-app instances, personal delivery preferences, server-side enforcement (SD-071-047), accessibility (SD-071-048) | Specification IC-73-011/IC-73-013; RC-73-02/03 use the CBD-72 §5.4.1 three-record model that inherits SD-071-044 |
| `RI-93-009`–`RI-93-011`, `RI-93-012` routing context, `RI-93-016`, `RI-93-017` (August 16, 2026 decisions) | Two-way disclosure, decline/block/limit protections, notification-only destination, safety-channel context for lifecycle notices, semantic copy standard, support-refusal rule | Specification §7–§9, §12; message inventory §2; §5 above |
| August 16, 2026 channel decision (`FU-95-001`) | Content-free push/SMS/routine email; protected detail in-app; purpose-specific email allowlists | Message inventory §2 item 3; specification §7.1 |
| CBD-91 v1.0.1 data inventory | Data-class boundaries for invitation secrets, status, consent evidence, memberships, workflow records, display identity | Specification §13 data-class column |

## 8. Review gates

| Gate | Required evidence | Current result |
| --- | --- | --- |
| Package completeness | All six Jira deliverables drafted with bidirectional criterion mapping | **Draft complete** — §2/§3 of this record |
| Product Owner review | Row-level review and approval of the specification, message semantics, and scenarios, including §6 items 3–5 decisions | **Pending** |
| Decision incorporation | `RI-93-009`–`011` and applicable agency/copy decisions carried without weakening | **Drafted** — §5; verification against the register §6 text done at draft time |
| Copy and specialist evidence | Exact strings, accessibility, localization, safety review | **Open** under `FU-95-017`/`EG-91-006`/`FU-95-027`; not a package-approval blocker if named and routed (CBD-95 §7 completion rule) |
| Fixtures | Deterministic fixtures for the 57 scenarios | **Routed** to test design under `VT-94-*`, matching the CBD-72 disposition |
| Jira synchronization | Description, acceptance criteria, and traceability summary all match the approved package (RF-72-57 standard), including the §6 items 1–2 amendments | **Pending**; requires Product Owner authorization |
| Publication | Confluence pages match the approved merged versions | **Pending**; post-merge per repository working rules |

## 9. Work remaining before approval

1. Product Owner row-by-row review of the lifecycle specification, message inventory, and test inventory.
2. Product Owner decisions on specification §15 items 7 and 8 (decline presentation; creating-authority cancellation) and confirmation of the §6 item 5 Viewer initial-profile composition.
3. Record Product Owner approval of the exact versions.
4. With explicit authorization and a live refetch: synchronize CBD-73 in Jira (including the §6 items 1–2 acceptance-criteria amendments) under the RF-72-57 all-fields standard.
5. After merge to `main`: publish the four package documents to Confluence, register their page IDs in `scripts/sync-confluence.py` through the established process, and verify parity.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft: completion rule, deliverable and per-criterion traceability in both directions, supported CBD-12 criteria mapping, routed `FU-95-*` coverage statement, discrepancy register (six items), governing inheritance, review gates, and remaining work. | Draft; Product Owner review required |
