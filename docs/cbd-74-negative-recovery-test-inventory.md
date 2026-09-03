# CBD-74 — Alert Negative and Recovery Test Inventory

| Field | Value |
| --- | --- |
| Status | **Approved v1.0.1 — Product Owner approved this exact version on September 2, 2026. `OI-74-002`–`OI-74-005` and `OI-74-007` remain open gates on implementation and release, not on this approval** |
| Document version | 1.0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-74](https://cobudget.atlassian.net/browse/CBD-74) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Governing specification | `docs/cbd-74-accountability-alert-boundary-specification.md` |
| Traceability | `docs/cbd-74-acceptance-criteria-traceability.md` |
| Last updated | September 2, 2026 |

## 1. Assertion contract

Every completed scenario states the actor and their membership, the budget space, the alert category and event revision, the recipient's preference and scope state at start, the action, the expected visible result for each affected person, the protected-state delta, the audit outcome, and the delivery outcome per channel.

A denied scenario passes only when the control is absent from the interface, a direct request is denied server-side, protected state is unchanged, no restricted content or existence signal is returned or inferable through body, shape, count, timing, or error, and a safe audit event is recorded.

An external-content scenario passes only when the transmitted body, subject, provider payload, template identifier, tags, headers, and callback fields are each inspected and contain nothing from the §6.2 prohibited list.

Scenario identifiers are stable, repository-unique, and never reused or renumbered. Deterministic fixture elaboration is test-design scope under `VT-94-*` (`OI-74-007`).

## 2. Scenario families

| Prefix | Family | Minimum coverage |
| --- | --- | --- |
| CAT-74 | Category, class, and eligibility | Each category's class behavior; role eligibility including Viewer exclusion and Partner inclusion; partial-readability suppression |
| CFG-74 | Configuration ownership | Recipient-owned set; prohibited configuration; suggestion without activation; cross-space independence |
| DLV-74 | Delivery sequence, rendering and send-time recheck | Mandatory in-app instance; opt-in gating; separate rendering and send checks; stale suppression; provider payload and channel metadata; callback limits; failure isolation |
| PRV-74 | Preview and detail-view content | External ceiling per transport; no preference widening; in-app authorization on open; custody and timing disclosure; locale equivalence; locator leakage |
| ACK-74 | Acknowledgement, comment, dismissal | Firm-only acknowledgement; informational rejection; personal scope; no authority; no escalation |
| SUP-74 | Deduplication, cooldown, quiet hours | At most one event per revision; retry behavior; quiet-hour deferment and no override |
| RVK-74 | Revocation and scope change | Eligibility end; instance closure; queued suppression; scope reduction; other-space isolation |
| XSP-74 | Cross-space isolation | Independent settings; foreign identifiers; shared destination; no cross-space batching; simultaneous immediate delivery |

## 3. Scenario inventory

### 3.1 `CAT-74-*` — category, class, and eligibility

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| CAT-74-T01 | Each of `CAT-74-01`–`CAT-74-03` fires, then its underlying provisional record resolves. | Each creates one shared event and one mandatory in-app instance per eligible recipient with exactly one AE-74-01 and one AE-74-05 each. No acknowledgement control or state exists on any instance. On resolution the shared event resolves, associated instances close, and queued unsent delivery is suppressed, recording AE-74-03. No copy asserts that a limit was exceeded. | `AB-74-009`; `SD-071-043`; §4.1 |
| CAT-74-T02 | Each of `CAT-74-04`–`CAT-74-06` fires and the underlying condition later changes immaterially, then materially. | Each creates one firm event with acknowledgement available. An immaterial change creates no second event. A material revision creates exactly one new linked event with its own AE-74-01. No firm event self-clears. | `AB-74-012`; §4.1; `PD-68-16`; `DR-74-01` |
| CAT-74-T03 | A Viewer holding each of the four profile types is present when every informational category fires. | No informational instance is created for the Viewer under any profile, preference, or scope-group combination. No AE-74-05 exists for that Viewer, and no surface, count, or empty state reveals that the event occurred. | §4.3 rule 1; CBD-72 §5.1 item 10 |
| CAT-74-T04 | A firm overspending event depends on one category inside and one category outside an Account-group Viewer's profile. | No instance is created for that Viewer, because a stated input is unreadable. The absent instance is not a redacted, partial, or zero-substituted instance. Owner, Collaborator, and Partner instances for the same event are unaffected. | `AB-74-006`; §4.3 rule 2; `PM-72-006` |
| CAT-74-T05 | An active Accountability Partner is present when informational and firm categories fire. | The Partner receives instances for both classes, with no subject-first delay, bounded by the fixed CBD-72 §5.3 field boundary. Content omits actor attribution. The `RI-93-014` residual is recorded, not treated as mitigated. | §4.3 rules 3 and 6; `RI-93-014`; `AB-74-008` |
| CAT-74-T06 | A person with a pending invitation, and separately a person whose membership is expired or revoked, exist when every category fires. | No instance is created for either, in any category, and no delivery is attempted. Inactive membership produces no eligibility signal anywhere. | §4.3 rule 5; CBD-72 §2.1; CBD-73 `IC-73-001` |
| CAT-74-T07 | A member's role changes from Collaborator to Viewer while an informational event is active, and separately a Viewer's profile widens while a firm event is active. | Eligibility is recomputed on the change: the new Viewer's informational instance closes, and the widened Viewer receives an instance for the still-active firm event only if the whole fact is now readable. Other recipients are unaffected. | §4.3 rule 4; CBD-72 §5.4.1 item 2 |
| CAT-74-T08 | Alert content for every category is inspected for actor attribution. | No body, title, detail, digest, or audit-visible field names or implies which person caused the condition, and no surface derives it. | `AB-74-008`; `PB-74-10`; `CP-74-04` |

### 3.2 `CFG-74-*` — configuration ownership

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| CFG-74-T01 | Each role attempts to create, edit, rename, retire, pause, or disable a built-in category, trigger, threshold, cooldown, or deduplication rule, through the interface and by direct request. | No control is offered and every direct request is denied server-side with no state change and exactly one AE-74-22. The category set is unchanged. | `AB-74-001`; CBD-74-AC02; `FU-95-002` |
| CFG-74-T02 | A Primary Owner and a Co-owner each attempt to view or change another member's channels, quiet hours, digest choice, instance state, acknowledgement, or dismissal. | Every attempt is denied with no state change and exactly one AE-74-22. The response reveals neither the settings nor whether any are configured. | `PB-74-07`; CBD-72 §5.4; CBD-74-AC09 |
| CFG-74-T03 | A member suggests that another member enable SMS for a category; the recipient ignores it, then later enables it themselves. | The suggestion creates no preference, no verification, and no delivery, recording exactly one AE-74-16. The suggester learns nothing about the recipient's preference state or response. Only the recipient's own action on a channel they verified activates delivery, recording AE-74-14. | §5.2; CBD-12-AC19 |
| CFG-74-T04 | A recipient opts every channel out for every category. | External delivery stops entirely. The mandatory in-app instance is still created for every eligible event, and no surface suggests the person can stop receiving in-app instances. | `AB-74-002`; `CF-74-01` |
| CFG-74-T05 | A recipient attempts to set a delivery destination they do not own or have not verified. | Rejected with no preference change and no delivery, and the response discloses nothing about whether that destination exists or belongs to anyone. | `DR-74-05`; `SR-94-051` |
| CFG-74-T06 | A person who is a member of spaces A and B changes quiet hours, digest, and channel opt-ins in A. | B's settings, instances, and dismissal state are byte-for-byte unchanged, and no surface in B reflects the A change. | `AB-74-011`; `RV-74-05`; `DR-74-04` |

### 3.3 `DLV-74-*` — delivery sequence and send-time recheck

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| DLV-74-T01 | A firm event fires for four eligible recipients with differing channel opt-ins, including one with none. | Exactly one shared event and exactly four in-app instances exist. Delivery attempts are created only for opted-in channels. The recipient with no channels still holds a complete in-app instance. | §5.3 items 1–4; `AB-74-002` |
| DLV-74-T02 | Between scheduling and send, the recipient loses membership; in a second fixture their profile narrows below the event's inputs; in a third the event is superseded by a material revision. | Each send-time recheck fails and the attempt is suppressed with exactly one AE-74-12 recording the suppression class. No message is transmitted, and no in-app instance is deleted by the suppression. | §5.3 item 5; `NT-92-005`; `SR-94-048` |
| DLV-74-T03 | An external send fails at the provider, retries within limits, then fails terminally. | Retries reuse the same attempt lineage and create no second event or instance. Terminal failure records AE-74-12 and leaves the in-app instance intact and unread-state unchanged. No customer surface reports provider failure detail. | `SD-071-044`; §5.3; `DR-74-03` |
| DLV-74-T04 | A delivery callback attempts to acknowledge the instance, change a preference, authenticate the recipient, and recreate a suppressed event. | Every attempt is refused. Only delivery-attempt state changes, recording AE-74-13. Replay and duplicate callbacks are idempotent. | `NT-92-005`; `SR-94-050` |
| DLV-74-T05 | The same trigger fires twice against one source revision, and the fan-out job runs twice. | Exactly one shared event and one instance per recipient exist. The repeat records AE-74-02 and creates nothing. | `AB-74-012`; §8.1 |
| DLV-74-T06 | The provider payload, template identifier, tags, headers, callback fields, collapse or grouping key, badge or unread count, and priority, sound, or channel tier are captured for a firm overspending delivery on each channel, and compared against the same capture for an informational delivery. | Each carries only the allowlisted minimum. No field encodes the space, person, category, condition, amount, or resource, including through template naming, analytics labels, collapse keys, badge counts, or per-class tiers. The two captures differ in no field, so class is not derivable from transport metadata. One template per transport is used for all six categories. | `NT-92-003`; `EM-92-005`; `SR-94-049`; `PB-74-09`; §5.3 item 6; §6.2 |
| DLV-74-T07 | A message is rendered for a recipient, then the recipient loses eligibility during a quiet-hour deferment before the send. | The rendering-time check passes and the send-time check fails independently, the rendered message is discarded rather than sent, and the suppression is audited. A single combined check at either point alone would fail this scenario. | `SR-94-048`; `AB-74-003`; §5.3 item 5 |

### 3.4 `PRV-74-*` — preview and detail-view content

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| PRV-74-T01 | Every category delivers to push, SMS, and routine email, and each transmitted body, subject, and preview is inspected on a locked shared device. | Push and SMS carry only the fixed `NT-92-001` content-free body. Email carries only the `EM-92-001` generic subject and body. Nothing identifies the space, person, category, condition, amount, merchant, label, deadline, or resource. | `AB-74-004`; §6.1; §6.2 |
| PRV-74-T02 | A recipient enables every available preference and requests richer previews, a trusted-device exception, and a verbosity increase. | No control exists, and no preference, setting, or opt-in adds any customer-specific content to any external transport. External bodies are byte-identical to `PRV-74-T01`. | `PB-74-09`; CBD-74-AC05; CBD-12-AC21 |
| PRV-74-T03 | A recipient opens protected alert detail after their profile narrowed below some of the event's inputs. | The open re-evaluates authorization. Only currently readable content appears; withheld content is absent rather than masked in a way that reveals its existence. The open records AE-74-17. | `AB-74-005`; §6.3 items 1–2 |
| PRV-74-T04 | A person whose membership ended opens a link to an alert detail view, then replays a stale in-app deep link. | Both are denied with no content and a safe reason class only, recording AE-74-18. The denial reveals neither the content nor whether the event still exists. | `AB-74-005`; `RV-74-02` |
| PRV-74-T05 | The in-app instance is inspected for budget-space identification, alongside the external bodies for the same event. | The in-app surface identifies the budget space; every external transport identifies nothing. The CBD-12-AC11 and AC21 reconciliation holds in exactly one direction. | §6.3 item 3; `OI-74-008` |
| PRV-74-T06 | Channel settings and delivered-copy copy are inspected for custody claims. | Copy states the shared-device, inbox, carrier, mirror, forwarding, backup, screenshot, provider-retention, and timing limits accurately, and claims no confidentiality, sole control, preview suppression, or remote erasure. The timing statement is present wherever a channel or category is chosen. | `AB-74-015`; `CP-74-05`; `SR-94-053`; §6.4 |
| PRV-74-T07 | Every external body and template is rendered in each supported locale and inspected. | Each rendering carries the same fixed content-free body with the same semantics, and no locale variant, pluralization, date or currency format, or right-to-left rendering introduces a customer-specific value, a category signal, or a length difference from which one could be inferred. A locale whose approved rendering is missing suppresses external delivery rather than falling back to another locale's text. | §6.1; §6.2; `SR-94-054`; `CP-74-08`; `OI-74-003` |
| PRV-74-T08 | An external notice's locator is followed, and the request chain, referrer headers, redirects, and access logs are inspected. | The locator resolves only to a generic authenticated entry point, authorizes nothing, and carries no resource, event, space, or recipient identifier in path, query, or fragment. No identifier reaches a third party through a referrer or redirect, and no access log records one where a wider audience can read it than may open the instance. A denied or expired locator returns the same safe outcome class as any other denied open. | §6.3 item 5; `SR-94-047`; `SR-94-049`; `EM-92-004` |

### 3.5 `ACK-74-*` — acknowledgement, comment, dismissal

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| ACK-74-T01 | A recipient acknowledges their own firm instance while three other recipients hold instances for the same event. | Only the actor's instance changes, recording exactly one AE-74-08. The shared event, every other instance, every delivery attempt, and all financial state are unchanged, and no other member can see that the acknowledgement occurred. | §7 items 2 and 6; CBD-72 permission 12; `DR-74-02` |
| ACK-74-T02 | Each role submits a direct acknowledgement request against an informational instance. | Every request is rejected with no state change, recording AE-74-09. No acknowledgement control or state exists on informational instances for any role. | `AB-74-009`; CBD-72 permission 13 |
| ACK-74-T03 | An Accountability Partner acknowledges a firm instance and comments on a supported readable target, then attempts a financial mutation, a permission change, and a connection action from the alert surface. | The acknowledgement and comment succeed as attributed personal and interaction records. Every mutation attempt is denied with no state change. Neither action approves spending, releases a hold, or changes any protected state. | `AB-74-007`; `PB-74-01`–`PB-74-05`; CBD-72 §5.3 |
| ACK-74-T04 | A firm instance goes unacknowledged past every configured window. | No reminder, report, ranking, score, or status reaches any other member. No surface anywhere shows that the person did not acknowledge. | `PB-74-06`; `AB-74-014` |
| ACK-74-T05 | A recipient dismisses their own instance for an unresolved condition. | The instance leaves that person's active view only. The shared event, the condition, other recipients' instances, and any reconciliation state are unchanged, recording AE-74-10. A later material revision still produces a new event. | §7 item 7; `PD-68-16` |
| ACK-74-T06 | A comment author edits and removes their own comment on an alert target; another member and an owner attempt the same. | Author-only edit and removal succeed under CBD-72 §5.6, recording AE-74-19. Every cross-author attempt is denied, including by the Primary Owner. | CBD-72 permission 11d; §7 item 4 |

### 3.6 `SUP-74-*` — deduplication, cooldown, quiet hours

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| SUP-74-T01 | The same unresolved condition re-evaluates repeatedly within the cooldown window. | Repeats are suppressed at the event layer with AE-74-02 and create no instance or delivery. No member surface exposes the cooldown value or offers to change it. | §8.2; `AB-74-001` |
| SUP-74-T02 | A firm event fires inside a recipient's quiet hours while another recipient has none. | The in-app instance is created immediately for both. External delivery is deferred only for the recipient in quiet hours and sent normally for the other. | §8.3 items 1–3 |
| SUP-74-T03 | A deferred external attempt reaches the end of the quiet-hour window after the recipient lost eligibility, and in a second fixture after the event was superseded. | Each deferred attempt is re-evaluated and suppressed rather than delivered late, recording AE-74-12. | §8.3 item 2; `SR-94-048` |
| SUP-74-T04 | An owner attempts to mark a category urgent enough to bypass another member's quiet hours, and a member attempts to bypass their own for a budget alert. | No override exists for either. Budget alerts never bypass quiet hours. A mandatory notice under §4.2 is unaffected by the quiet-hour setting because it is not a budget alert. | §8.3 item 4; `AB-74-010`; `PB-74-11` |
| SUP-74-T05 | A recipient selects digest delivery while several events fire across categories. | In-app instances appear individually and immediately. External digest delivery batches at the recipient's cadence, still carries only the content-free body, and each batched attempt passes its own send-time recheck. | `CF-74-04`; §6.1; §5.3 item 5 |

### 3.7 `RVK-74-*` — revocation and scope change

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| RVK-74-T01 | A Collaborator is removed while holding open instances, queued external attempts, and an unacknowledged firm instance. | Eligibility ends atomically; open instances close; queued unsent attempts are suppressed; no new instance is created for a still-active event. Each asynchronous completion records AE-74-21. Already-delivered copies remain and are never described as recallable. | `RV-74-01`–`RV-74-03`; CBD-73 `RC-73-02`/`RC-73-03` |
| RVK-74-T02 | A Viewer's profile is narrowed while instances exist both inside and outside the new scope. | Instances outside the new scope close and instances inside remain. Future events produce instances only within the new scope. Membership continues. | `RV-74-04` |
| RVK-74-T03 | A removed member retries alert detail opens, digest links, and acknowledgement using previously valid handles. | Every path denies without content or existence signal, recording AE-74-18 or AE-74-22 as applicable, with no protected-state change. | `RV-74-02`; `AB-74-005` |
| RVK-74-T04 | A person removed from space A holds membership in space B with the same verified email address. | A's eligibility, instances, and queued delivery end. B's settings, instances, dismissal state, and delivery continue unchanged, and no message reveals the A change. | `RV-74-05`; `AB-74-011` |
| RVK-74-T05 | A member's own consent to a shared resource is withdrawn, narrowing what they may read, while events referencing that resource are active. | Eligibility for those events ends and their instances close, without ending the membership itself or affecting categories still within scope. | `AB-74-013`; CBD-74-AC03 |
| RVK-74-T06 | Membership ends while a mandatory lifecycle notice for that same person is pending. | The mandatory notice is created and remains available under CBD-73 `RC-73-12`, independent of the alert suppression. Alert suppression never suppresses it. | `RV-74-06`; `AB-74-010`; `PB-74-11` |
| RVK-74-T07 | A person has the same verified destination associated with memberships in spaces A and B. Their membership in A ends while an unsent attempt is queued for A. | A's association is atomically retired with exactly one `AE-74-23`, and A's queued attempt is suppressed. B's association stays active and still delivers, and the destination itself remains verified and owned by that person. Queue suppression alone does not satisfy the retirement. | `RV-74-08`; `RV-74-03`; `RV-74-05`; `DR-74-07`; `AE-74-23`; CBD-73 `RC-73-03` |

### 3.8 `XSP-74-*` — cross-space isolation

| ID | Scenario | Expected outcome | Governing rules |
| --- | --- | --- | --- |
| XSP-74-T01 | An actor in space B submits a space A event identifier, instance identifier, and preference identifier through B authority. | Each is denied before any protected detail is returned, with no state change and exactly one AE-74-20 per attempt. No response confirms that the foreign object exists. | `AB-74-011`; `PM-72-010` |
| XSP-74-T02 | A person holds an Accountability Partner membership in space A and a Collaborator membership in space B, with the same verified destination. | Delivery decisions are made per membership. No message, digest, count, or surface combines the two spaces or reveals that both memberships exist. | §13; `PB-74-08` |
| XSP-74-T03 | Simultaneous events fire in both of a person's spaces inside one digest window. | Each space's content stays separate. The external digest still carries only the content-free body, so no combination is possible on the external transport, and the in-app surfaces remain space-scoped. Batches are never combined across spaces. | §13; §6.1; §8.4 item 4 |
| XSP-74-T04 | The same person has immediate, not digest, delivery enabled on one destination for memberships in two spaces, and events fire in both within seconds. | Two separate attempts are made, each scoped to its own membership, and neither body, provider payload, nor callback reveals that the other exists. The inspection records that simultaneous arrival is a volume signal no content rule removes, and that §6.4 timing disclosure is the control that covers it. | §13; §8.4 item 4; §6.4; `PB-74-08` |

## 4. Required-case coverage check

`CBD-74-AC13` names eight minimum cases. Each resolves to at least one scenario.

| Required case | Scenarios |
| --- | --- |
| Duplicate triggers | `DLV-74-T05`, `SUP-74-T01`, `CAT-74-T02` |
| Quiet hours | `SUP-74-T02`, `SUP-74-T03`, `SUP-74-T04` |
| Revoked consent | `RVK-74-T05`, `RVK-74-T01` |
| Changed resource scope | `RVK-74-T02`, `CAT-74-T04`, `CAT-74-T07`, `PRV-74-T03` |
| Queued delivery | `DLV-74-T02`, `SUP-74-T03`, `RVK-74-T01` |
| Wrong budget space | `XSP-74-T01`, `XSP-74-T02`, `RVK-74-T04` |
| Unauthorized detail access | `PRV-74-T03`, `PRV-74-T04`, `RVK-74-T03`, `CFG-74-T02` |
| Minimized preview content | `PRV-74-T01`, `PRV-74-T02`, `DLV-74-T06`, `PRV-74-T06` |

## 5. Totals

This inventory contains **51 scenarios in 8 families**: 8 `CAT-74-T*`, 6 `CFG-74-T*`, 7 `DLV-74-T*`, 8 `PRV-74-T*`, 6 `ACK-74-T*`, 5 `SUP-74-T*`, 7 `RVK-74-T*`, and 4 `XSP-74-T*`.

## 6. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0.1 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Brand amendment. The §6.1 transport bodies and the §6.4 custody copy specified customer-readable text naming CoBudget: a push and email body announcing "a CoBudget update", the public CoBudget application URL, and custody copy saying CoBudget does not promise confidentiality. The September 2, 2026 brand decision makes MoneyPact the customer-facing name and keeps CoBudget as the internal codename, so all five now say MoneyPact. No rule, ceiling, or prohibition changes; the naming standard is `RT-75-*` in the CBD-75 package. | Product Owner authorized September 2, 2026 |
| 1.0 | September 2, 2026 | Alexander Wohlford — Product Owner | **Approved.** Product Owner approval of the exact 51-scenario inventory. Deterministic fixtures remain routed to `VT-94-*` under `OI-74-007`. | Approved September 2, 2026 |
| 0.3 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Added four scenarios for the second review round: `DLV-74-T07` separate rendering and send rechecks, `PRV-74-T07` locale equivalence, `PRV-74-T08` locator leakage through referrer, redirect, and access log, and `XSP-74-T04` simultaneous immediate delivery across two spaces on one destination. Extended `DLV-74-T06` to capture collapse keys, badge counts, and per-class tiers and to compare firm against informational, and `PRV-74-T06` to check the timing and provider-retention disclosure. Total is 51 scenarios in 8 families. | Draft; Product Owner approval outstanding |
| 0.2 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Added `RVK-74-T07`, covering atomic retirement of a destination association on membership end while the same verified destination stays active for another space, which queue suppression alone does not satisfy. Total is 47 scenarios in 8 families; the 44 in the v0.1 entry was already wrong when written. | Draft; Product Owner approval outstanding |
| 0.1 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft: assertion contract, eight families, 46 scenarios, and the `CBD-74-AC13` required-case coverage check. | Draft; Product Owner review required |
