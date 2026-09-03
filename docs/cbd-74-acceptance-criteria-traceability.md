# CBD-74 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved v1.0 — Product Owner approved this exact version on September 2, 2026. `OI-74-002`–`OI-74-005` and `OI-74-007` remain open gates on implementation and release, not on this approval** |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Jira | [CBD-74](https://cobudget.atlassian.net/browse/CBD-74) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Specification | `docs/cbd-74-accountability-alert-boundary-specification.md` |
| Test inventory | `docs/cbd-74-negative-recovery-test-inventory.md` |
| Reviewed repository baseline | `d95988c` on `main` |
| Mechanical audit | `python scripts/audit-cbd-74.py`; structural evidence only, never open-issue closure |
| Last updated | September 2, 2026 |

## 1. Completion and evidence boundary

A row marked **Mapped** means the requirement and its scenario evidence exist at draft-rule level. It does not mean the rule is approved, implemented, fixture-backed, accessible, specialist-reviewed, or safe to release.

CBD-74 package approval requires all of the following:

1. every CBD-74 criterion and supported CBD-12 criterion maps in both directions to exact specification and scenario evidence;
2. the §4 discrepancies are dispositioned by the Product Owner, including the two that contradict approved sources;
3. `OI-74-001` is confirmed, since one category's firm classification is derived rather than quoted, and every other open issue is either closed or remains an explicit gate at the stated impact;
4. the Product Owner approves the exact version; and
5. only after approval, an authorized Jira synchronization covers description, acceptance criteria, and traceability summary together, and only a merged repository version is published to Confluence.

## 2. Governing sources

Values are the exact versions this draft was written against. A later source change requires an impact review.

| Source | Version used | What CBD-74 takes from it |
| --- | --- | --- |
| CBD-71 MVP Schedule Decisions | v1.1, approved August 15, 2026 | `SD-071-043` firm/informational classes, `SD-071-044` three-record model and income-variance trigger, `SD-071-046`–`SD-071-048`. `SD-071-016` was listed here in error and is removed; see §4 row 7 |
| CBD-72 Collaboration Permission Model | v0.1.54; approved August 18, 2026 at v0.1.53, §5.4 amended September 2, 2026 | Roles, permissions 11a–11d/12/13, §5.1 Viewer hierarchy, §5.3 Partner boundary, §5.4 personal-settings boundary, §5.4.1 three-record model, §9 audit envelope |
| CBD-73 Invitation, Consent, and Revocation Lifecycle | v1.0.1, approved August 18, 2026 | `IC-73-019` mandatory notice independence, `RC-73-02` alert-eligibility end, `RC-73-03` queued suppression and destination-association retirement, `RC-73-12` subject notice |
| CBD-92 System Flow and Technical Threat Model | v1.0.1 | `NT-92-001`–`NT-92-006` push/SMS ceiling, `EM-92-001`–`EM-92-007` email tiers |
| CBD-94 Risk and Security/Privacy Requirement Register | v1.0 | `SR-94-044`–`SR-94-054` |
| CBD-68 Paycheck and Custom Cadence | approved | `PD-68-16` confirmed actual-income variance trigger and deduplication |
| CBD-95 Follow-up Register | v1.0.9 | `RI-93-012`–`RI-93-015` dispositions; `FU-95-001`, `FU-95-002`, `FU-95-020` routing |

## 3. Jira deliverable traceability

| Jira deliverable | Specification evidence | Scenario evidence | Result |
| --- | --- | --- | --- |
| Alert category and recipient matrix | §4.1 closed six-category set, §4.2 mandatory-notice separation, §4.3 role eligibility with six rules | `CAT-74-T01`–`CAT-74-T08` | **Mapped.** `OI-74-001` gates one category's class |
| Configuration and delivery rules | §5.1 closed recipient-owned set, §5.2 suggestion rule, §5.3 seven-step delivery sequence | `CFG-74-T01`–`CFG-74-T06`, `DLV-74-T01`–`DLV-74-T06` | **Mapped.** Values gated by `OI-74-004` |
| Notification-preview and detail-view data rules | §6.1 per-transport ceiling, §6.2 prohibition list with its governing residual clause, §6.3 in-app detail, §6.4 custody honesty | `PRV-74-T01`–`PRV-74-T06`, `DLV-74-T06` | **Mapped.** Templates gated by `OI-74-005` |
| Acknowledgement/comment behavior | §7 items 1–7 | `ACK-74-T01`–`ACK-74-T06` | **Mapped** |
| Cooldown, deduplication, quiet-hour, digest, pause, dismissal, revocation rules | §8.1–§8.5, §9 `RV-74-01`–`RV-74-08` | `SUP-74-T01`–`SUP-74-T05`, `RVK-74-T01`–`RVK-74-T07` | **Mapped.** Windows gated by `OI-74-004` |
| Alert audit-event and test inventory | §14 `AE-74-01`–`AE-74-23` with placement rules; test inventory §§1–5 | All 51 scenarios | **Mapped.** Fixtures gated by `OI-74-007` |

## 4. Discrepancy register

Approved documents outrank ticket text. Where the ticket contradicts an approved source, the approved source governs and the ticket needs an authorized correction.

| # | Discrepancy | Disposition |
| --- | --- | --- |
| 1 | ~~**The CBD-74 planning notes contradict the corrected acceptance criteria**, still promising an identified budget space and "per-user opt-in for more detail within current scope".~~ | **Resolved; the row was stale when written.** A live read on September 2, 2026 found the CBD-74 planning notes already carrying a `CORRECTED PREVIEW BOUNDARY` entry that supersedes the earlier text and states every external transport is content-free. No Jira correction is outstanding. |
| 2 | ~~**CBD-12-AC11 and CBD-12-AC21 conflict.** AC11 requires every notification to identify the budget space; AC21 forbids that in push, SMS, and routine email.~~ | **Withdrawn; the premise was false when written.** Live `CBD-12-AC11` reads "Every relevant authenticated in-app screen and in-app notification identifies the budget space it concerns. External notifications do not: push, SMS, and routine product email remain content-free under AC21, so budget-space context appears only after authentication." That is the §6.3 item 3 split verbatim. `AC11` was corrected on August 16, 2026, two days before this draft asserted the conflict. `OI-74-008` is closed. |
| 3 | ~~**"Configurable alert" and "invalid rules" language in `CBD-74-AC03` and `CBD-74-AC10` predates `FU-95-002`.**~~ | **Resolved; the row was stale when written.** Live `CBD-74-AC03` already carries the clarifying sentence stating that *configuration* means the recipient's own delivery choices for a built-in category, and that the category set and its triggers are fixed product behavior and never member-authored. Live `AC10` refers only to the recipient's own delivery configuration. No correction is outstanding. |
| 3a | **`CBD-12-AC19` granted a member-configurable "privacy detail".** Found September 2, 2026 by reading the live criterion rather than the register. It listed "privacy detail" among what each member "can configure", which contradicts `AC21`, the closed `CF-74-01`–`CF-74-06` set in §5.1, the §6.2 statement that no privacy-detail setting exists, and `PB-74-09`. The draft cited `AC19` as governing at §5.1 without noticing. | **Corrected in Jira on September 2, 2026** with Product Owner authorization. "Privacy detail" is removed; the criterion now names the recipient-owned choices that actually exist and states that `AC21` external content is never widened by preference. This, not `AC11`, was the stale parent criterion. |
| 4 | **`CAT-74-06` firm classification is derived.** `SD-071-043` lists only settled overspending and late-adjustment overage as firm; `PD-68-16` gives confirmed income variance settled-fact behavior. | Treated as firm with the derivation stated in §4.1 and gated by `OI-74-001`. Not asserted as quoted. |
| 5 | **Planning-note scheduling text is stale.** It says due August 25, 2026; the live due date is August 26, 2026. | Informational; no package impact. Correct with the next authorized Jira update. |
| 6 | **`RI-93-014` residual is unaccepted.** Partner informational eligibility permits observation of a provisional condition before the household can correct it. | Retained per the August 16, 2026 decision, recorded in §4.3 rule 6 and `OI-74-006`. Not treated as mitigated by `AB-74-008`. |
| 7 | **`SD-071-016` was cited as a governing input but is Superseded.** CBD-71 §4A states the 19 grouping rows there "are **Superseded** and cannot be approved or implemented", and `SD-071-020`–`SD-071-050` replace them. `SD-071-016` is the predecessor of `SD-071-043`/`SD-071-044`, which this package also cites. | **Corrected September 2, 2026.** Removed from the specification header and from §2 above. No rule depended on it: it was never used in the body, and its content is subsumed by `SD-071-043` and `SD-071-044`. Found by source verification during the September 2 review. |
| 8 | **CBD-73 `RC-73-03` was implemented in half.** The rule requires both suppressing queued attempts *and* atomically retiring the destination association bound to the ended membership. The draft characterised it as "queued suppression" and implemented only that; `DR-74-05` carried no membership or budget-space binding, so the second half could not be expressed at all. §9's preamble nonetheless claimed to be the complete alert-side complement of the CBD-73 checklist. | **Corrected September 2, 2026.** `RV-74-08` adds the retirement effect, `DR-74-07` adds the destination-association record that makes it expressible, `AE-74-23` audits it, and `RVK-74-T07` tests it, including that another membership's association survives. |
| 9 | **§6.2 declared its prohibition list exhaustive; `NT-92-001` ends in a residual clause.** A closed enumeration is strictly narrower than a ceiling ending in "or other customer-specific content", and the list omitted support/security facts and every non-text vector: collapse keys, badge counts, and per-class priority or sound tiers. `EM-92-007`'s no-tracking half was absent from the package entirely, and §5.3's "channel controls" allowance was undefined. | **Corrected September 2, 2026.** §6.2 now states the list is not closed and that `NT-92-001` controls where they differ, adds the missing vectors and the email no-tracking rule, and §5.3 item 6 defines channel controls as transport mechanics carrying no customer-specific value, with one template per transport so neither template identity nor rendered-template version partitions traffic by category. |
| 10 | **`SR-94-048` requires a recheck at rendering *and* at send; only send was specified.** `AB-74-003` named four evaluation points and no rendering stage, so a message rendered before a quiet-hour or digest deferment could be sent after the recipient lost eligibility. | **Corrected September 2, 2026.** `AB-74-003` and §5.3 item 5 now require both checks independently, and `DLV-74-T07` fails if either is collapsed into the other. |
| 11 | **`MN-74-01` applied the subject-notice rule to every lifecycle recipient, and had no external content ceiling.** `IC-73-019` governs the *subject's* notice; `RC-73-12` and CBD-72 §6.3 give other recipients their notice under their own entitlements and ordinary preferences. The row also pointed at CBD-73 §14, which is the audit-event inventory rather than the notice content. | **Corrected September 2, 2026.** `MN-74-01` now separates the two recipient classes, states that §6.1 and §6.2 cap external content for both, and points at CBD-73 §11.3, §7, and the customer message inventory. A revocation notice carries no exemption from the ceiling. |
| 12 | **`SR-94-053`'s timing limit was omitted from §6.4.** Every other custody limit was disclosed. Timing is the one control over the inference a content-free notification cannot remove: enabling a channel for a single category makes every message on it mean that category. | **Corrected September 2, 2026.** §6.4 adds timing and provider retention, requires the statement wherever a channel or category is chosen, and states that no §6.2 content rule mitigates it. `PRV-74-T06` checks for it. |
| 13 | **The digest had no specification.** §5.3 item 4 pointed at §8.3, which covers quiet hours only; no digest subsection existed, while `SUP-74-T05` already asserted digest behavior. The test inventory was ahead of the specification. | **Corrected September 2, 2026.** New §8.4 defines digest behavior in six rules, including that a batch carries no more than a single notice, states no count, is never combined across spaces, and is not sent when empty. |
| 14 | **`SR-94-047` locator protection and `SR-94-051` destination retention were never stated.** No rule addressed referrer, redirect, or access-log leakage of a locator, or when a destination is retired and what retirement must not affect. | **Corrected September 2, 2026.** §6.3 item 5 covers locator leakage, `DR-74-05` covers retention and retirement including that it never affects sign-in or recovery, and `PRV-74-T08` tests the locator chain. |
| 15 | **Four citations attributed rules to sources that do not state them.** `SD-071-043` was credited with firm acknowledgement and non-self-clearing behavior and with informational alerts *exposing* no acknowledgement operation, when it says only that none is *required*; `AB-74-001` credited `SD-071-044` with closing thresholds and cooldown, which it does not mention; `CP-74-08` described a widened accessibility scope as inherited; `PD-68-16` was credited with a self-clearing property and cited for a dismissal rule it does not address. Every rule was correct; only the attributions were wrong. | **Corrected September 2, 2026.** Each now names its real source: CBD-72 §5.4.1 item 6 and CBD-71 §8A for firm behavior, CBD-72 permission 13 for the stronger informational rule, CBD-72 §5.4 and CBD-71 §8A for fixed thresholds and cooldown. `CP-74-08` now says the wider scope is this document's choice. The `CAT-74-06` self-clearing inference is stated as inferred and left to `OI-74-001`. |
| 16 | **Three lower-order precision defects.** `AB-74-012` and §8.1 said "one shared event exists" where CBD-72 §5.4.1 item 1 says "at most one", which cooldown suppression makes material; §7.4 enumerated nobody for commenting while §4.3 newly granted Viewers firm-alert eligibility, leaving Viewer commenting readable as permitted against three CBD-72 statements; `SD-071-047` and `RI-93-016` were declared as inputs but never engaged. | **Corrected September 2, 2026.** "At most one" restored with the reason; §7.4 states who may comment and that a Viewer may not, on any target; §6.3 item 2 reconciles `SD-071-047` with the non-revealing denied read; `RI-93-016` is declared in the header alongside the `RG-94-007`/`RG-94-012` release gates the package carries but does not close. |

## 5. Per-criterion mapping

| AC | Requirement | Specification evidence | Scenario evidence |
| --- | --- | --- | --- |
| CBD-74-AC01 | Categories enumerated with eligible roles, prerequisites, and configurable-versus-mandatory classification. | §4.1, §4.2, §4.3 | `CAT-74-T01`–`CAT-74-T06`, `RVK-74-T06` |
| CBD-74-AC02 | Settings belong to one membership in one space and cover only recipient-owned choices; category, trigger, threshold, cooldown, deduplication are fixed. | §5.1, `AB-74-001`, `AB-74-012` | `CFG-74-T01`, `CFG-74-T04`, `CFG-74-T06`, `SUP-74-T01` |
| CBD-74-AC03 | Created and delivered only while membership, consent, role permission, and resource visibility remain valid; invalid configurations disable automatically. | `AB-74-003`, `AB-74-013`, §5.3 item 5, §9 | `DLV-74-T02`, `RVK-74-T01`, `RVK-74-T05`, `CAT-74-T06` |
| CBD-74-AC04 | Every external attempt is scoped to one recipient and one purpose and discloses no space, person, category, or resource; space context is in-app only. | `AB-74-004`, §6.1, §6.2, §6.3 item 3 | `PRV-74-T01`, `PRV-74-T05`, `DLV-74-T06` |
| CBD-74-AC05 | Previews carry only the fixed content-free body; no preference adds customer-specific detail. | §6.2, `PB-74-09` | `PRV-74-T01`, `PRV-74-T02` |
| CBD-74-AC06 | Opening protected detail requires current authorization and fails safely; reduced access limits or stops future previews. | `AB-74-005`, §6.3, §9 | `PRV-74-T03`, `PRV-74-T04`, `RVK-74-T02`, `RVK-74-T03` |
| CBD-74-AC07 | Acknowledgements and comments communicate support only and control no financial state. | `AB-74-007`, §7 items 2 and 5 | `ACK-74-T01`, `ACK-74-T03`, `ACK-74-T06` |
| CBD-74-AC08 | Cooldown and deduplication prevent repeats for the same unresolved event; quiet hours define deferment and exceptions. | §8.1, §8.2, §8.3 | `SUP-74-T01`–`SUP-74-T05`, `DLV-74-T05` |
| CBD-74-AC09 | Every permitted member controls their own delivery and instance state without punitive escalation; nobody edits built-ins or another person's state; mandatory in-app instances cannot be suppressed. | `AB-74-002`, `AB-74-014`, §5.1, §8.4, `PB-74-06`, `PB-74-07` | `CFG-74-T01`, `CFG-74-T02`, `CFG-74-T04`, `ACK-74-T04`, `ACK-74-T05` |
| CBD-74-AC10 | Revocation, removal, role reduction, consent loss, or visibility reduction disables affected configuration, stops future alerts, and defines queued-delivery handling without touching other spaces. | §9 `RV-74-01`–`RV-74-07`, `AB-74-013` | `RVK-74-T01`–`RVK-74-T06`, `XSP-74-T02` |
| CBD-74-AC11 | Configuration, generation, delivery, suppression, acknowledgement, comment, pause, dismissal, failure, and revocation effects produce scoped audit events. | §14 `AE-74-01`–`AE-74-22` with placement rules | Every scenario's audit assertion |
| CBD-74-AC12 | Copy is supportive, factual, voluntary, nonjudgmental, with an accessible route to manage or revoke sharing. | §11 `CP-74-01`–`CP-74-08` | `CAT-74-T08`, `PRV-74-T06`, `ACK-74-T04` |
| CBD-74-AC13 | Test inventory covers the eight named cases. | Test inventory §4 | Test inventory §4 table |
| CBD-74-AC14 | Explicit prohibition of purchase approval, transaction blocking, account control, ownership authority, and lockout. | §10 `PB-74-01`–`PB-74-12` | `ACK-74-T03`, `ACK-74-T04`, `CFG-74-T01`, `CFG-74-T02` |

**Reverse direction.** Every family resolves to at least one criterion: `CAT-74-T*` to AC01/AC03/AC12; `CFG-74-T*` to AC02/AC09/AC14; `DLV-74-T*` to AC03/AC04/AC08; `PRV-74-T*` to AC04/AC05/AC06/AC12; `ACK-74-T*` to AC07/AC09/AC14; `SUP-74-T*` to AC08/AC09; `RVK-74-T*` to AC03/AC06/AC10; `XSP-74-T*` to AC10. No scenario is orphaned and no criterion lacks evidence.

## 6. Supported CBD-12 criteria

| CBD-12 AC | Evidence |
| --- | --- |
| AC09 — Partner comprehensive, financially read-only, cannot move money, block transactions, edit data, administer ownership, or lock out | §4.3 rule 3; §10 `PB-74-01`–`PB-74-05`; `ACK-74-T03` |
| AC11 — Changes in one space do not affect memberships or alert preferences in another; every relevant screen and notification identifies the space | `AB-74-011`; §13; §6.3 item 3 with the `OI-74-008` reconciliation; `CFG-74-T06`, `XSP-74-T01` |
| AC17 — Revocation effects, immediate cutoff, queued suppression, other spaces unaffected | §9; `RVK-74-T01`, `RVK-74-T04` |
| AC18 — Lifecycle events notify affected users and produce space-scoped audit events | §14; §4.2; `RVK-74-T06` |
| AC19 — Preferences belong to one membership; permitted members configure their own; cooldown and deduplication system-owned; suggestion without silent activation | §5.1, §5.2, §8.1, §8.2; `CFG-74-T03`, `SUP-74-T01` |
| AC20 — Acknowledgements and comments cannot modify finances, ownership, permission scope, or external accounts | `AB-74-007`; §7 item 5; `ACK-74-T03` |
| AC21 — External content fixed by purpose tier and not widenable by preference | §6.1, §6.2; `PRV-74-T01`, `PRV-74-T02` |
| AC22 — Safety: coercion, pausing, revocation, non-retaliatory messaging | `AB-74-014`; §8.4; §10 `PB-74-06`; §11 `CP-74-06`/`CP-74-07`; `ACK-74-T04` |
| AC24 — Copy accessible, supportive, nonjudgmental; implies no authority, punishment, or surveillance entitlement | §11; `CAT-74-T08`, `PRV-74-T06` |
| AC27 — Precision separating requirements from execution-level decisions and test classes | §15 open-issue register; test inventory families; this record |

## 7. Routed follow-up coverage

Nothing here closes a register row; each row closes on the evidence it names.

| Row | What this package supplies | What remains |
| --- | --- | --- |
| `FU-95-001` (P0, external preview conflict) | §6 applies the content-free ceiling to every alert transport and states the exhaustive prohibition. The stale CBD-74 planning-note text is recorded in §4 item 1 rather than followed. | Product Owner acceptance of the applied corrections, plus the CBD-12-AC11 correction in `OI-74-008`. |
| `FU-95-002` (P0, alert authority conflict) | `AB-74-001` and §5.1 state the closed built-in set and the closed recipient-owned set, so no member owns trigger, threshold, cooldown, or deduplication logic. Residual "rule" wording is dispositioned in §4 item 3. | Negative fixtures under `OI-74-007`. |
| `FU-95-020` (P1, `RI-93-012`–`RI-93-015`) | `RI-93-014` eligibility retained in §4.3 with actor attribution removed and the residual recorded; `RI-93-015` tiered semantics carried into §11 and the in-app detail rules; `RI-93-012` safety-channel routing consumed as the §4.2 boundary that alerts must not touch. | `RI-93-013` compromised-channel retirement mechanics, exact copy, and the CBD-91 source alignment remain with the register and `OI-74-002`/`OI-74-003`. |

## 8. Review gates

| Gate | Required evidence | Current result |
| --- | --- | --- |
| Package completeness | Six deliverables mapped in both directions | **Complete** — §3, §5 |
| Source consistency | No rule contradicts CBD-71, CBD-72, CBD-73, CBD-92, or CBD-94 | **Draft verified** by construction; §4 records the two contradictions found in ticket text rather than sources |
| Product Owner review | Row-level approval, including the §4 dispositions and `OI-74-001` | **Approved September 2, 2026** by Alexander Wohlford, on this exact version, after the nineteen-finding review. `OI-74-001` confirmed firm; `OI-74-006` accepted as a named residual risk rather than mitigated |
| Copy and specialist evidence | Exact strings, accessibility, localization, safety review | **Open** under `OI-74-003`; named and routed |
| Fixtures | Deterministic fixtures for 51 scenarios | **Routed** to `VT-94-*` under `OI-74-007` |
| Jira synchronization | Description, acceptance criteria, and traceability summary all match | **Authorized and applied September 2, 2026**, after approval and after the merge of the §4 corrections |
| Publication | Confluence pages match the approved merged version | **Pending**; post-merge |

## 9. Remaining work

1. Product Owner review of the specification, matrix, and scenarios.
2. Disposition of `OI-74-001` and the §4 discrepancies, including whether to correct `CBD-74-AC03`/`AC10` wording and `CBD-12-AC11`.
3. Record Product Owner approval of the exact version.
4. With authorization and a live refetch, synchronize CBD-74 in Jira across all three fields.
5. After merge, register Confluence targets and publish, then verify read-back parity.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0 | September 2, 2026 | Alexander Wohlford — Product Owner | **Approved.** Recorded Product Owner approval of the exact package: §8 review gates updated, `OI-74-001` confirmed and `OI-74-006` accepted as a named residual risk, and the authorized Jira synchronization applied the same day. | Approved September 2, 2026 |
| 0.3 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded discrepancy rows 10 through 16 for the remaining review findings and their corrections: the missing rendering-time recheck, the over-broad and uncapped `MN-74-01`, the omitted timing disclosure, the unspecified digest, the absent locator and destination-retention rules, four misattributed citations, and three precision defects. Scenario total updated to 51. | Draft; Product Owner approval outstanding |
| 0.2 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Product Owner review corrections. Withdrew rows 1, 2, and 3 as stale when written, since live CBD-12 and CBD-74 fields already carried the reconciliations they asked for; `OI-74-008` closed with no change to `CBD-12-AC11`. Added row 3a for the `CBD-12-AC19` privacy-detail contradiction the draft missed, corrected in Jira the same day. Added rows 7, 8, and 9 for the Superseded `SD-071-016` citation, the half-implemented `RC-73-03`, and the false §6.2 exhaustiveness claim. Corrected the scenario total from 44 to 47 and the audit-event range to `AE-74-23`. | Draft; Product Owner approval outstanding |
| 0.1 | August 18, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft: governing-source baseline, deliverable and per-criterion traceability in both directions, supported CBD-12 mapping, six-item discrepancy register, routed follow-up coverage, review gates, and remaining work. | Draft; Product Owner review required |
