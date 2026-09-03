# CBD-74 — Accountability Alert Boundary Specification

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — Product Owner review required** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-74](https://cobudget.atlassian.net/browse/CBD-74) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Governing schedule decisions | CBD-71 **MVP Schedule Decisions v1.1**, approved August 15, 2026 — `SD-071-016`, `SD-071-043`, `SD-071-044`, `SD-071-046`–`SD-071-048` |
| Governing permission model | CBD-72 **v0.1.53**, approved August 18, 2026 — permissions 1, 11a–11d, 12, 13, 22, 24, 25; §5.1, §5.3, §5.4, §5.4.1 |
| Governing consent lifecycle | CBD-73 **v1.0.1**, approved August 18, 2026 — `IC-73-019`, `RC-73-02`, `RC-73-03`, `RC-73-12` |
| Governing transport ceilings | CBD-92 **v1.0.1** — `NT-92-001`–`NT-92-006`, `EM-92-001`–`EM-92-007` |
| Governing security requirements | CBD-94 **v1.0** — `SR-94-044`–`SR-94-054` |
| Governing product decisions | `RI-93-012`–`RI-93-015`, recorded August 16, 2026 in `docs/cbd-95-architecture-roadmap-follow-up-register.md` §6 |
| Test inventory | `docs/cbd-74-negative-recovery-test-inventory.md` |
| Traceability and review | `docs/cbd-74-acceptance-criteria-traceability.md` |
| Mechanical audit | `python scripts/audit-cbd-74.py` |
| Last updated | August 18, 2026 |

> **Authority.** The approved CBD-11/CBD-71 alert decisions, the CBD-72 permission model, the CBD-92 transport ceilings, the CBD-94 security requirements, and the `RI-93-012`–`RI-93-015` product decisions are controlling inputs. This specification applies them to accountability alerts. It cannot weaken or broaden an approved outcome. Where this document and a governing source appear to differ, the governing source controls and the difference is recorded in the traceability register.

## 1. Purpose

This specification defines the complete boundary around accountability alerts: which alert categories exist, who is eligible to receive each one, what each recipient may configure, what may leave the product on an external channel, what a recipient may do with an alert, and what alerts can never do.

It is written so that an interface designer, a server-side policy author, a data modeler, a copywriter, a threat reviewer, and a test author can each act from it without inferring intent. Every rule below is stated as a requirement with a defined subject and a defined outcome.

## 2. Scope and vocabulary

The three-record model is inherited from CBD-72 §5.4.1 and `SD-071-044`. This document adds no fourth record type.

| Term | Exact meaning in this document |
| --- | --- |
| Shared alert event | The budget-space-scoped record of one built-in trigger firing against one source at one material revision. It holds the safe fact. It holds no recipient state. |
| Recipient instance | The personal, membership-scoped in-app record created for one eligible recipient of one shared event. It holds read, acknowledgement, and archive/dismiss state for that person only. |
| Delivery attempt | One personal, channel-scoped attempt to deliver a notice of an instance over email, push, or SMS. It holds channel outcome only. |
| Built-in category | One of the six approved triggers enumerated in §4.1. The set is closed; no member and no configuration may add to it. |
| Firm alert | An alert describing a settled fact. It supports acknowledgement and does not self-clear (`SD-071-043`). |
| Informational alert | An alert describing a provisional outcome. It never asserts that a limit was exceeded, self-clears when its source resolves, and exposes no acknowledgement operation (`SD-071-043`; CBD-72 permission 13). |
| Delivery preference | A recipient-owned choice governing whether and when their own optional external delivery occurs. It never changes whether an event fires, who else is eligible, or whether an in-app instance is created. |
| Mandatory notice | A membership, consent, or security notice. It is not a budget alert, is never suppressible, and is governed by §4.2. |
| Eligibility | The determination, made per recipient per event, that a person may receive an instance. It is a function of current membership, role, consent, and resource visibility — never of preference. |
| Actor attribution | Naming which person caused the condition an alert describes. Prohibited in alert content by `RI-93-014` (§6.4). |
| External channel | Email, push, or SMS. Every external channel is optional, recipient-controlled, and content-capped by §6. |

## 3. Governing invariants

Every rule in this document is subordinate to these invariants. Where a later section appears to permit something an invariant forbids, the invariant controls.

| ID | Invariant | Source |
| --- | --- | --- |
| AB-74-001 | The built-in category set in §4.1 is closed. No member, preference, role, or configuration may create, author, rename, retire, or add a category, trigger, threshold, cooldown, or deduplication rule. Those are fixed product behavior. | `SD-071-044`; `DD-071-009`; CBD-74-AC02; `FU-95-002` |
| AB-74-002 | Every eligible recipient receives exactly one mandatory in-app instance per shared event. Its creation is not conditional on any preference, and no member — including an owner — may mute, pause, suppress, delete, or configure another person's instance. | `SD-071-044`; `SR-94-044`; CBD-72 §5.4; CBD-74-AC09 |
| AB-74-003 | Eligibility is evaluated per recipient against current membership, role, consent, and resource visibility at event creation, at material revision, at send time, and at protected-detail open time. Preference never widens eligibility, and eligibility never depends on another member's settings. | CBD-72 `PM-72-002`; §5.4.1 item 2; `NT-92-004`; `SR-94-048` |
| AB-74-004 | Every external delivery is capped by its transport contract and by purpose. Push and SMS carry the fixed content-free `NT-92-001` body. Routine alert email is content-free under `EM-92-001`. No preference, setting, opt-in, template, tag, header, or provider field may widen that content. | `NT-92-001`–`NT-92-003`; `EM-92-001`; `EM-92-005`; `SR-94-045`/`SR-94-046`/`SR-94-049`; CBD-74-AC04/AC05 |
| AB-74-005 | Protected alert detail exists only inside an authenticated in-app surface, and opening it re-evaluates current authorization. A recipient whose access narrowed sees only what their current scope permits, and an unauthorized open is denied without disclosing the withheld content. | CBD-72 `PM-72-002`; CBD-74-AC06; `SR-94-047` |
| AB-74-006 | Derived alert content obeys the CBD-72 §5.2 noninterference rule. An alert is created for a recipient only when every input the alert states is readable by that recipient. A partly readable fact produces no instance for that recipient rather than a redacted or zero-substituted one. | CBD-72 §5.1 item 10, §5.2; `PM-72-006` |
| AB-74-007 | An alert, acknowledgement, or comment changes no financial, schedule, permission, membership, connection, or configuration state. It approves nothing, blocks nothing, and controls no external account. | CBD-72 permissions 11a–11d, 12; CBD-12-AC20; CBD-74-AC07/AC14 |
| AB-74-008 | Alert content omits actor and responsibility attribution. It states the condition and the affected resource within the recipient's scope; it does not name who caused it, and no surface derives that from the alert. | `RI-93-014`; CBD-12-AC24 |
| AB-74-009 | Informational alerts are provisional. They never assert that a limit was exceeded, expose no acknowledgement operation or state, and self-clear when the underlying provisional record resolves. A direct acknowledgement request against an informational instance is rejected without state change. | `SD-071-043`; CBD-72 permission 13 |
| AB-74-010 | Budget alerts and mandatory notices are separate systems. A delivery preference, quiet-hour window, dismissal, or channel opt-out never suppresses a mandatory membership, consent, or security notice. | CBD-74-AC01; CBD-73 `IC-73-019`; `RC-73-02` |
| AB-74-011 | Alert state is budget-space scoped. Membership, preference, instance, and dismissal state in one budget space has no effect in another, and no alert may combine or disclose data across spaces. | CBD-72 `PM-72-010`; CBD-12-AC11; CBD-74-AC10 |
| AB-74-012 | Cooldown and deduplication are system-owned. One shared event exists per built-in rule, source identity, and material source revision; retries and duplicate triggers create no second event or instance. | `SD-071-044`; CBD-72 §5.4.1 item 1; CBD-74-AC08 |
| AB-74-013 | Loss of membership, role, consent, or resource visibility stops future eligibility immediately, closes the affected instances, and suppresses queued unsent delivery, without altering that person's state in any other budget space. | CBD-73 `RC-73-02`/`RC-73-03`/`RC-73-10`; `NT-92-005`; CBD-74-AC03/AC10 |
| AB-74-014 | No alert behavior may be used to pressure, punish, or surveil. There is no escalation path that reports non-acknowledgement, no delivery receipt to another member, and no visibility into whether another person read, acknowledged, or dismissed an instance. | CBD-12-AC22/AC24; `RI-93-014`; CBD-74-AC09/AC12 |
| AB-74-015 | Copy never claims confidentiality or recall it cannot deliver. Delivered external copies are recipient- and platform-controlled, and no surface promises remote erasure, sole control, or preview suppression. | `NT-92-006`; `EM-92-007`; `SR-94-053`; `RI-93-016` |

## 4. Alert category and recipient matrix

### 4.1 The closed built-in category set

These six categories are the complete Private-MVP set, inherited without change from `SD-071-043` and `SD-071-044`. `PD-68-16` governs `CAT-74-06`.

| ID | Category | Class | Trigger, exactly as approved | Self-clears | Acknowledgeable |
| --- | --- | --- | --- | --- | --- |
| CAT-74-01 | Pending-activity warning | Informational | A pending record creates provisional category impact that has not settled. | Yes, when the provisional record resolves | No |
| CAT-74-02 | Duplicate-review indicator | Informational | A pending and posted pair is in Duplicate-review. | Yes, on resolution of the review | No |
| CAT-74-03 | Late or missing income indicator | Informational | Expected income has not been received or reconciled when expected. | Yes, on receipt or reconciliation | No |
| CAT-74-04 | Settled overspending | Firm | Settled spending exceeds the active period/category budget. | No | Yes |
| CAT-74-05 | Late-adjustment overage | Firm | A late settlement creates or increases overage in an ended period. | No | Yes |
| CAT-74-06 | Confirmed actual-income variance | Firm | Reconciliation is confirmed and the actual receipt date or currency amount differs from expectation by a nonzero date or currency-precision amount. No additional materiality threshold applies. Deduplicates by reconciliation revision; a material correction may create one new event. | No | Yes |

`CAT-74-06`'s firm classification is **derived, not quoted**: `SD-071-043` names the firm set as settled overspending and late-adjustment overage without listing income variance, while `PD-68-16` fires it only on *confirmed* reconciliation and never self-clears, which meets the `SD-071-043` definition of a settled fact. The derivation is recorded as `OI-74-001` for explicit Product Owner confirmation and is not treated as settled by this draft.

### 4.2 Mandatory notices, which are not budget alerts

These are enumerated so the boundary in `AB-74-010` is unambiguous. Their content and routing are owned elsewhere; this document only fixes their separation from alerts.

| ID | Notice class | Owner | Separation rule |
| --- | --- | --- | --- |
| MN-74-01 | Membership and consent lifecycle notices — invitation outcome, role or scope change, revocation, removal, ownership transfer | CBD-73 §14, `MSG-73-*` | Mandatory authenticated in-app instance, created independently of membership authority. External copy only to the subject's verified private safety channel with no fallback. No alert preference, quiet hour, digest, or dismissal affects it. |
| MN-74-02 | Security and account notices — authentication, recovery, material security events | CBD-94 security scope; `EM-92-003` | Never routed through alert preferences. External copy is limited to safe action class, whether action is required, and a deadline. |

### 4.3 Recipient eligibility by role

Eligibility is the intersection of the role rule below and `AB-74-003`/`AB-74-006`. `Eligible` never means "always receives"; it means the role is permitted, subject to current scope and readability.

| Category | Primary Owner | Co-owner | Collaborator | Viewer | Accountability Partner |
| --- | --- | --- | --- | --- | --- |
| CAT-74-01 informational | Eligible | Eligible | Eligible | **Never** | Eligible |
| CAT-74-02 informational | Eligible | Eligible | Eligible | **Never** | Eligible |
| CAT-74-03 informational | Eligible | Eligible | Eligible | **Never** | Eligible |
| CAT-74-04 firm | Eligible | Eligible | Eligible | Eligible only when the settled fact and every input it states are entirely readable within the Viewer's current profile | Eligible within the fixed §5.3 field boundary |
| CAT-74-05 firm | Eligible | Eligible | Eligible | Same Viewer rule as `CAT-74-04` | Eligible within the fixed §5.3 field boundary |
| CAT-74-06 firm | Eligible | Eligible | Eligible | Same Viewer rule as `CAT-74-04` | Eligible within the fixed §5.3 field boundary |

Rules governing this matrix:

1. **A Viewer never receives an informational alert**, in any category, under any profile or preference. This is categorical (CBD-72 §5.1 item 10).
2. **A Viewer receives a firm alert only when the whole fact is readable.** If any stated input falls outside the current profile, no instance is created for that Viewer. A redacted, partial, or zero-substituted instance is prohibited (`AB-74-006`).
3. **An Accountability Partner is eligible for both classes**, including informational, per the `RI-93-014` decision of August 16, 2026, with no subject-first delay. Partner instances remain inside the fixed CBD-72 §5.3 field boundary.
4. **Eligibility is recomputed** at event creation, at material revision, and on any membership, role, profile, scope-group, or consent change while the event is active. A newly eligible recipient receives an instance for a still-active event; a recipient who loses eligibility loses access to their instance and their unsent delivery is suppressed, with no effect on other recipients (CBD-72 §5.4.1 item 2).
5. **A pending, rejected, expired, revoked, or otherwise inactive membership confers no eligibility**, and no invitation state creates an instance (CBD-72 §2.1; CBD-73 `IC-73-001`).
6. **`RI-93-014` residual, recorded not resolved.** Retaining Partner informational eligibility means an active Partner can observe a provisional condition about an identified household before the people in it have corrected it. The Product Owner retained this on August 16, 2026; the observation and surveillance risk remains explicit and unaccepted pending formal disposition. `AB-74-008` limits the harm by removing actor attribution, but does not remove the residual.

## 5. Configuration and delivery rules

### 5.1 What a recipient owns

A recipient's alert settings belong to exactly one membership in exactly one budget space (CBD-12-AC19; CBD-74-AC02). A person who belongs to three budget spaces has three independent settings records, and changing one changes nothing in the others.

The complete set of recipient-owned choices is closed:

| ID | Recipient-owned choice | Bounds |
| --- | --- | --- |
| CF-74-01 | Which of their own verified external channels receive delivery, per supported category | Channels must be verified and owned by that recipient. Opting every channel out never removes the in-app instance. |
| CF-74-02 | Quiet hours | Expressed against `CF-74-03`. Governs deferment only, per §8.3. |
| CF-74-03 | Time zone used to evaluate quiet hours and digests | Personal-account state. |
| CF-74-04 | Digest or immediate external delivery, per supported category | Affects external timing only, never in-app instance creation. |
| CF-74-05 | Personal archive or dismiss state for their own instance | Removes the instance from that person's active view only. Changes no shared event, no other instance, and no financial fact. |
| CF-74-06 | Personal acknowledgement of their own firm instance | Firm categories only. See §7. |

Nothing else is configurable. In particular, no recipient and no owner may set or change a category, trigger, threshold, cooldown window, deduplication key, eligibility rule, another person's preference, another person's instance state, or whether an in-app instance exists (`AB-74-001`, `AB-74-002`).

### 5.2 Suggestion without silent activation

A member may suggest that another member enable an external channel for a category. The suggestion is inert: it creates no preference, no channel verification, and no delivery. Activation requires the recipient's own action on their own settings, on a channel they have verified (CBD-12-AC19; description scope). A suggestion that is ignored produces no notice to the suggester beyond the fact that they made it, and never reports the recipient's current preference state.

### 5.3 Delivery sequence

Delivery follows this exact order. Each step is a precondition for the next.

1. A built-in trigger fires. Exactly one shared event is created per rule, source identity, and material revision (`AB-74-012`). A repeat trigger against the same revision creates nothing.
2. Eligibility is computed per recipient (`AB-74-003`, `AB-74-006`). Fan-out is idempotent on event plus recipient.
3. One mandatory in-app instance is created for each eligible recipient (`AB-74-002`). This step never consults a preference.
4. For each recipient with a matching opted-in external channel, delivery is scheduled subject to quiet hours and digest choice (§8.3).
5. At send time, the delivery boundary rechecks recipient identity, destination ownership and version, opt-in, current eligibility, authorization and lifecycle versions, template version, material revision, and suppression state (`SR-94-048`; `NT-92-004`; `EM-92-006`). Any failed recheck suppresses the attempt.
6. The provider receives only the allowlisted minimum: destination or token, the fixed body or approved template identifier, channel controls, an opaque attempt or correlation identifier, and minimum delivery metadata (`NT-92-003`; `EM-92-005`).
7. Provider callbacks may update delivery-attempt state only. A callback never authenticates anyone, acknowledges an instance, creates or recreates an event, or changes a preference (`NT-92-005`; `SR-94-050`).

An external delivery failure at any step never removes, delays, or duplicates the in-app instance (`SD-071-044`).

## 6. Notification preview and detail-view data rules

### 6.1 External content ceiling

| Transport | Exactly what may appear | Governing contract |
| --- | --- | --- |
| Push | The fixed content-free body: a statement that a CoBudget update exists and an instruction to open CoBudget. Tapping opens a generic authenticated entry point or notification inbox. | `NT-92-001`, `NT-92-002` |
| SMS | The same fixed content-free body. A URL, if present, is only the ordinary public CoBudget application URL. | `NT-92-001`, `NT-92-002` |
| Routine alert email | A generic subject and body stating only that a CoBudget update is available and directing the recipient to authenticate. | `EM-92-001` |

No alert email qualifies for the `EM-92-002` invitation tier or the `EM-92-003` lifecycle and security tier. Every alert email is routine product email and is therefore content-free.

### 6.2 Prohibited in every external transport

An external alert notification must not contain, encode, imply, or allow inference of any of the following. This list is exhaustive of the categories named by the governing contracts and is not a set of examples:

budget-space name or identifier; any person's name, role, membership, or relationship; account or institution identity; event category or alert condition; amount, balance, or currency value; merchant or payee; category, goal, or bill label; comment text; period or deadline; lifecycle state; reason; resource identifier or locator; recipient state; and any provider template name, tag, category, header, analytics label, or callback field that encodes any of the above (`AB-74-004`; `NT-92-001`/`NT-92-003`; `EM-92-001`/`EM-92-005`; `SR-94-045`/`SR-94-046`/`SR-94-049`).

**No preference widens this.** There is no per-user opt-in, verbosity level, privacy-detail setting, or trusted-device exception that adds customer-specific content to an external notification (CBD-74-AC05; CBD-12-AC21).

### 6.3 In-app detail

Protected alert detail appears only in an authenticated in-app surface. On open, authorization is re-evaluated against current membership, role, consent, resource visibility, and authorization version (`AB-74-005`).

1. A recipient whose scope narrowed since the instance was created sees only what their current scope permits; content outside it is absent, not masked in a way that reveals its existence (`PM-72-006`).
2. A recipient who lost eligibility entirely cannot open the instance, and the denial discloses neither the content nor the reason beyond a safe outcome class.
3. The in-app instance identifies the budget space. This is the surface CBD-12-AC11 refers to; the external transports remain content-free under CBD-12-AC21. CBD-12-AC11 already states this split in terms, having been corrected on August 16, 2026, so no correction to it is outstanding (`OI-74-008`, closed).
4. Detail content states the condition and the affected resource within the recipient's scope, and omits actor attribution (`AB-74-008`).

### 6.4 Shared-device and custody honesty

Copy accompanying channel settings must state plainly that lock screens, notification centers, paired devices, carriers, SMS forwarding, inboxes, backups, and screenshots are outside CoBudget's control; that delivered copies cannot be recalled or erased remotely; and that CoBudget does not promise confidentiality after delivery (`NT-92-006`; `EM-92-007`; `SR-94-053`). It must not claim that previews are hidden or that a channel is private.

## 7. Acknowledgement and comment behavior

1. **Firm only.** Acknowledgement exists solely on firm instances (`CAT-74-04`–`CAT-74-06`). An informational instance exposes no acknowledgement control or state, and a direct request against one is rejected without state change (`AB-74-009`; CBD-72 permission 13).
2. **Personal only.** Acknowledging mutates the actor's own instance. It never changes the shared event, another recipient's instance, a delivery attempt, or any financial fact (CBD-72 permission 12).
3. **Who may acknowledge.** Acknowledgement is the `CF-74-06` recipient-owned choice. Primary Owner, Co-owner, Collaborator, and Accountability Partner may acknowledge their own firm instance. A Viewer may acknowledge their own firm instance where one exists under §4.3 rule 2.
4. **Comments** are attributed interaction records on supported readable targets, governed by CBD-72 §5.6. Only the author may edit or remove their own comment; no role may moderate another author's comment.
5. **No authority.** Neither acknowledgement nor comment approves spending, releases a hold, blocks or permits a transaction, edits financial data, changes permissions or membership, or controls an external account (`AB-74-007`; CBD-12-AC20).
6. **No escalation.** Not acknowledging produces no reminder to another member, no report, no status visible to anyone else, and no consequence. No surface shows another person's read, acknowledgement, or dismissal state (`AB-74-014`).
7. **Dismissal is not resolution.** Archiving or dismissing an instance removes it from that person's active view only. It does not resolve the condition, clear another recipient's instance, confirm or reject a reconciliation, or alter the shared event (`PD-68-16`; CBD-72 §5.4.1 item 4).

## 8. Cooldown, deduplication, quiet hours, dismissal, and pause

### 8.1 Deduplication

One shared event exists per built-in rule, source identity, and material source revision. A materially changed source revision may create one new linked event; an immaterial change creates none. Delivery retries never create another event or instance (`AB-74-012`; CBD-72 §5.4.1 item 1).

### 8.2 Cooldown

Cooldown is system-owned and suppresses repeated equivalent facts for the same unresolved condition. It is not a member setting, is not disclosed as a configurable value, and never suppresses a mandatory notice. Exact windows are execution-level (`OI-74-004`).

### 8.3 Quiet hours

1. Quiet hours defer **external delivery only**. The in-app instance is created immediately and is visible whenever the recipient opens the product (`AB-74-002`).
2. Deferred external attempts are evaluated again when the window ends, and remain subject to the full send-time recheck in §5.3 item 5. An attempt whose event became stale or whose recipient lost eligibility during the window is suppressed, not delivered late.
3. The quiet-hour window (`CF-74-02`) is evaluated in the recipient's own `CF-74-03` time zone.
4. **Quiet hours have no override.** No category, no severity, and no other member's action bypasses another person's quiet hours for a budget alert. The `MN-74-01` membership and consent notices and the `MN-74-02` security notices are not budget alerts and are not governed by this section (`AB-74-010`).

### 8.4 Dismissal and pause

1. A recipient may archive or dismiss their own instance at any time (`CF-74-05`).
2. A recipient may pause their own external delivery by opting out of channels or categories (`CF-74-01`). There is no product feature that pauses in-app instance creation, and no member may pause another person's alerts (`AB-74-002`).
3. Dismissal and pause are invisible to other members. No surface reports that a person dismissed, paused, or opted out (`AB-74-014`).

## 9. Membership-change and revocation effects

These effects are the alert-side complement of the CBD-73 revocation checklist and add no new authority.

| ID | Effect | Timing |
| --- | --- | --- |
| RV-74-01 | Ordinary alert eligibility ends. No new instance is created for the former recipient in that budget space, including for a still-active shared event. | Atomic with the membership or scope change |
| RV-74-02 | The former recipient's open instances in that space close and are no longer openable. | Atomic |
| RV-74-03 | Queued and unsent external delivery attempts for that space are suppressed. Already-delivered copies remain with the recipient and are never described as recallable. | Immediate |
| RV-74-04 | A scope reduction that leaves membership intact narrows eligibility rather than ending it: categories and resources outside the new scope stop producing instances, and existing instances outside the new scope close. | Atomic with the reduction |
| RV-74-05 | The person's alert settings, instances, and dismissal state in every other budget space are untouched, as is their sign-in. | Always |
| RV-74-06 | Mandatory notices under §4.2 are unaffected. Membership end does not suppress the subject's own lifecycle notice, which CBD-73 `RC-73-12` creates independently of membership authority. | Always |
| RV-74-07 | Every effect above is audited under §12, and asynchronous completions record their own completion event so the cutoff is provable. | With each step |

## 10. Prohibitions

The following are prohibited without exception. No configuration, role, preference, provider behavior, or future execution-level decision may introduce them (CBD-74-AC14).

| ID | Prohibited |
| --- | --- |
| PB-74-01 | An alert, acknowledgement, or comment that grants, withholds, or implies **purchase or spending approval**. |
| PB-74-02 | Any alert-driven **transaction blocking, hold, freeze, or reversal**. |
| PB-74-03 | Any alert-driven **control of an external financial account or connection**. |
| PB-74-04 | Any alert-derived **ownership, permission, or membership authority**, including implying that a Partner or owner can act because they were alerted. |
| PB-74-05 | Any alert-driven **lockout** of a person from their account, their budget space, or their own data. |
| PB-74-06 | **Escalation for non-acknowledgement** — reporting, reminding, ranking, scoring, or otherwise surfacing that a person did not acknowledge, read, or act. |
| PB-74-07 | **Cross-member visibility of personal alert state** — another person's destinations, preferences, quiet hours, instances, read state, acknowledgements, or dismissals. |
| PB-74-08 | **Cross-space routing or aggregation** of alert data. |
| PB-74-09 | **Widening external content** by preference, opt-in, trusted device, or provider metadata. |
| PB-74-10 | **Actor or responsibility attribution** in alert content, and any surface that derives it from an alert. |
| PB-74-11 | **Suppressing a mandatory notice** through any alert preference, quiet hour, dismissal, or channel opt-out. |
| PB-74-12 | **Claiming confidentiality, recall, or erasure** of a delivered external copy. |

## 11. Copy requirements

Exact strings are gated by `OI-74-003` and CBD-75. These are the binding semantic requirements.

| ID | Requirement |
| --- | --- |
| CP-74-01 | Alert copy is factual and describes the condition, not the person. It states what happened to which resource within the reader's scope, without blame, judgement, praise, or evaluative framing. |
| CP-74-02 | Informational copy is explicitly provisional and never asserts a limit was exceeded. It states that the underlying record may still change and that the alert clears itself. |
| CP-74-03 | Firm copy states a settled fact, and acknowledgement copy makes clear that acknowledging communicates awareness only and approves, authorizes, and changes nothing. |
| CP-74-04 | No copy names or implies who caused the condition (`AB-74-008`). |
| CP-74-05 | Channel and preference copy discloses the §6.4 custody limits accurately and claims no confidentiality, privacy, or recall it cannot deliver. |
| CP-74-06 | Every alert surface offers an accessible route to the reader's own delivery settings and to the supported way to leave or reduce sharing, stated without penalty framing (CBD-74-AC12). |
| CP-74-07 | Copy never implies surveillance entitlement, monitoring duty, spending permission, punishment, or irrevocable access (CBD-12-AC24). |
| CP-74-08 | Alert, settings, and acknowledgement surfaces meet the inherited `SD-071-048` accessibility requirements: programmatic labels and relationships, keyboard operation, managed focus, announced state changes, non-color cues, and accessible recovery. |

## 12. Data requirements

Field lists are semantic requirements. Physical schemas may narrow but not broaden them. Class assignments follow CBD-91; new or split classes are gated by `OI-74-002`.

| ID | Record | Required content | Class |
| --- | --- | --- | --- |
| DR-74-01 | Shared alert event | Event identifier; budget space; built-in category; firm or informational class; source resource and material revision; safe fact payload within the space's own scope; trigger and observed time; deduplication key; lifecycle state; audit correlation. Holds no recipient state and no actor attribution. | CBD-72 §5.4.1 layer 1 |
| DR-74-02 | Recipient instance | Instance identifier; event reference; recipient account and membership; authorization version at creation; created and closed time; read state; firm acknowledgement state; personal archive or dismiss state. Holds no other recipient's state and no external outcome. | CBD-72 §5.4.1 layer 2; `DI-91-030` |
| DR-74-03 | Delivery attempt | Attempt identifier; instance and event correlation; channel; privacy-safe destination reference; rendered template version or hash; requested, sent, failed, or suppressed status and time; provider receipt or error class; retry lineage. Holds no notification content. | CBD-72 §5.4.1 layer 3; `DI-91-059` |
| DR-74-04 | Recipient delivery preferences | Recipient account; budget-space membership; per-category channel opt-in; quiet-hour window; time zone; digest or immediate selection; preference version. Visible and editable only to that recipient. | `DI-91-029` |
| DR-74-05 | Verified notification destination | Recipient account; channel type; destination or token with verified ownership; verification and rotation state; suppression state from provider callbacks. Separate from authentication and recovery authority. | `DI-91-029`/`DI-91-049`; `SR-94-051`/`SR-94-052` |
| DR-74-06 | Eligibility evaluation record | Event reference; recipient membership; inputs evaluated (membership, role, consent, profile and scope-group versions, readability outcome); result; evaluation time and stage. Restricted evidence; never a customer-visible surface. | `DI-91-005`/`DI-91-008` |

## 13. Cross-budget isolation

| Example | Required outcome |
| --- | --- |
| A person is a Collaborator in Household A and an Accountability Partner in Household B. | Two independent settings records. Opting out of email in A changes nothing in B. An A event never produces a B instance, and no surface combines them. |
| A person is removed from Household A while holding membership in Household B. | A's eligibility, instances, and queued delivery end. B's settings, instances, and dismissal state are untouched (`RV-74-05`). |
| An event identifier from Household A is submitted through a Household B membership. | Denied before any protected detail is returned; no state changes; a cross-space denial audit event is recorded (`PM-72-010`). |
| A recipient's single email address is verified in both spaces. | Delivery decisions are made per membership. Suppression, opt-out, or quiet hours in one space never alters the other, and no message reveals that both exist. |

## 14. Audit-event inventory

Every event uses the CBD-72 §9 envelope: event identifier, time, actor or system principal, acting membership and role where applicable, budget space, action, target type and safe identifier, decision or result, policy or rule version, safe reason class, correlation identifier, and safe semantic delta. Payloads never contain notification content, raw destinations, another recipient's state, or protected financial detail.

| ID | Event | Notes |
| --- | --- | --- |
| AE-74-01 | Shared event created | Exactly one per rule, source identity, and material revision. Records deduplication key and class. |
| AE-74-02 | Shared event deduplicated or suppressed by cooldown | Records the key matched; no second event exists. |
| AE-74-03 | Shared event resolved or self-cleared | Informational categories only; closes associated instances. |
| AE-74-04 | Eligibility evaluated | Per recipient per evaluation stage, with the safe result class. Restricted audience. |
| AE-74-05 | Recipient instance created | One per eligible recipient per event; idempotent on repeat fan-out. |
| AE-74-06 | Recipient instance closed by resolution, scope loss, or membership end | Records the cause class, never another member's detail. |
| AE-74-07 | Instance read | Personal-account scope. |
| AE-74-08 | Firm acknowledgement recorded | Personal-account scope; never visible to another member. |
| AE-74-09 | Informational acknowledgement rejected | Safe denial; no state change. |
| AE-74-10 | Personal archive or dismiss state changed | Personal-account scope. |
| AE-74-11 | Delivery attempt requested | Records channel and privacy-safe destination reference only. |
| AE-74-12 | Delivery attempt sent, failed, or suppressed | Records the outcome class and suppression reason class; no content. |
| AE-74-13 | Delivery callback processed | Records that only delivery state changed. |
| AE-74-14 | Preference changed by its owner | Personal-account scope; records before and after within that person's own settings. |
| AE-74-15 | Destination verified, rotated, or retired | Personal-account scope; no raw destination in the payload. |
| AE-74-16 | Suggestion made to another member | Records that a suggestion occurred; never the recipient's preference state or response. |
| AE-74-17 | Protected detail opened | Records the authorization result at open time. |
| AE-74-18 | Protected detail open denied | Safe reason class only. |
| AE-74-19 | Comment created, edited, or removed on an alert target | Follows CBD-72 §5.6 audit rules. |
| AE-74-20 | Cross-space attempt denied | Records the denial without disclosing the foreign target. |
| AE-74-21 | Revocation or scope-change alert effect completed | One per `RV-74-01`–`RV-74-04` effect that completes asynchronously, proving the cutoff. |
| AE-74-22 | Denied alert mutation | Any attempt to create, edit, pause, or disable a built-in alert, or to change another person's settings or instance state; no state change. |

Placement rules:

1. Personal-account state — preferences, destinations, instance read, acknowledgement, and dismissal — is audited in personal-account scope and never appears in a budget-space surface or export available to another member (`PB-74-07`).
2. Budget-space audit may record that an alert event occurred and that a required effect completed, without exposing any recipient's personal state.
3. Delivery evidence records channel outcome only. It never carries the message body, the raw destination, or the event's financial content.
4. `AE-74-04` and `AE-74-18` are restricted security evidence, not customer-visible history.

## 15. Open-issue register

Every row is open unless its route records a closure date. The interim behavior stated is binding until the row closes; none of it substitutes for the decision or evidence named.

| ID | Open issue | Binding interim behavior | Route and effect |
| --- | --- | --- | --- |
| OI-74-001 | **`CAT-74-06` class confirmation.** `SD-071-043` does not name confirmed actual-income variance in the firm set, while `PD-68-16` gives it settled-fact behavior. | Treated as firm: acknowledgeable, no self-clear. It is never treated as informational, and no Viewer receives it unless the whole fact is readable. | Product Owner confirmation against CBD-71/CBD-68. Affects acknowledgement and Viewer eligibility for one category only. |
| OI-74-002 | **CBD-91 class assignment** for the eligibility-evaluation record and any split of preference from destination state. | `DR-74-06` is restricted evidence and appears in no customer surface. | CBD-91 focused amendment; blocks persistence design. |
| OI-74-003 | **Exact copy, localization, accessibility, and comprehension evidence** for alert, settings, acknowledgement, and custody strings. | §11 semantics are binding; no string ships without approval. | `FU-95-017`; CBD-75; blocks customer-facing release. |
| OI-74-004 | **Exact cooldown windows, digest cadence, quiet-hour defaults, and retry limits.** | System-owned and non-configurable; no value is implied to members. | Execution-level with `FU-95-015`; blocks implementation of §8. |
| OI-74-005 | **Provider selection and per-channel template approval**, including proof that template names, tags, and headers encode nothing prohibited by §6.2. | The §6 ceiling is binding regardless of provider. | `EG-91-006`/CBD-106; blocks external delivery release. |
| OI-74-006 | **`RI-93-014` residual disposition.** Partner informational eligibility is retained; the observation and surveillance risk is explicit and unaccepted. | Eligibility per §4.3; `AB-74-008` removes actor attribution. | Named risk authority per CBD-94 §3.6; does not block this specification but remains open. |
| OI-74-007 | **Deterministic fixtures** for the test inventory. | Rule-level inventory only. | `VT-94-*` test design; blocks implementation sign-off. |
| OI-74-008 | **CBD-12 alert-preference wording.** Opened against `CBD-12-AC11` on the belief that it mandated budget-space identification in every notification. That was already false when this draft was written: `AC11` was corrected on August 16, 2026 and states that in-app surfaces identify the space while push, SMS, and routine email stay content-free under `AC21`. The genuine stale field was `CBD-12-AC19`, which still listed member-configurable "privacy detail". | §6.3 item 3 and §6.2 govern unchanged; no interim behavior depended on either wording. | **Closed September 2, 2026.** `AC11` needed no correction. `AC19` was corrected the same day to remove "privacy detail", to name the closed `CF-74-01`–`CF-74-06` choices, and to state that `AC21` content is never widened by preference. |

## 16. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft: closed six-category set with recipient matrix, mandatory-notice separation, recipient-owned configuration set, delivery sequence, external content ceiling and prohibitions, in-app detail rules, acknowledgement and comment boundaries, deduplication/cooldown/quiet-hours/dismissal, revocation effects, twelve prohibitions, copy requirements, data requirements, cross-space isolation, twenty-two audit events, and the open-issue register. | Draft; Product Owner review required |
