# CBD-82 — Acceptance-Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — Product Owner review and approval required** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-82](https://cobudget.atlassian.net/browse/CBD-82) |
| Parent | [CBD-22](https://cobudget.atlassian.net/browse/CBD-22) |
| Model | `docs/cbd-82-financial-profile-and-account-ownership-model.md` |
| Scenario catalog | `docs/cbd-82-account-lifecycle-scenario-catalog.md` |
| Mechanical audit | `python3 scripts/audit-cbd-82.py` |
| Last updated | September 3, 2026 |

## 1. Purpose

What CBD-82 delivered against each of its twelve acceptance criteria, what it found while being written, and what it deliberately did not decide.

## 2. Governing sources

| Source | Version consumed | What is taken from it |
| --- | --- | --- |
| `docs/cbd-92-system-flow-technical-threat-model.md` | v1.0.1 | `CA-92-001`–`CA-92-012` account contracts; `PA-92-006`/`PA-92-007` deletion semantics; `RF-92-006` |
| `docs/cbd-72-collaboration-permission-model.md` | v0.1.54 | §2.1 membership model; §2.2 role boundaries; §5.2 derived-value rule; §6 ownership transfer |
| `docs/cbd-91-private-mvp-data-inventory.md` | v1.0.5 | `DI-91-013`, `DI-91-046`, `EG-91-001`, `EG-91-012`, `EG-91-021`, and §7.2 retained-history policy |
| `docs/cbd-94-risk-mitigation-requirement-register.md` | v1.0.4 | The verification-inventory route for deterministic fixtures |

This package does not pin its sources by content hash. It consumes a closed set of numbered contracts whose identifiers the audit checks directly, which catches the drift that matters without failing on unrelated edits to large documents.

## 3. Per-criterion mapping

| Criterion | Requirement | Delivered by | Verified by |
| --- | --- | --- | --- |
| `CBD-82-AC01` | Logical schema states every entity, identifier, owner, state, cardinality rule, and prohibited relation | §3 `EN-82-01`–`EN-82-12`; §4; §9 | `audit-cbd-82.py` pins all twelve entities and twelve cardinality rules |
| `CBD-82-AC02` | Proves one profile per subject, one profile per connection and account, one space per link and projection | §4 `CD-82-01`–`CD-82-12` | `CANON`, `JOINT`, `ISO` scenarios |
| `CBD-82-AC03` | Authority matrix proves connection management belongs only to the authorizer | §5 `AU-82-01`–`AU-82-10` | `AUTH-82-T01`–`T03` |
| `CBD-82-AC04` | Link contract: current authority, default-deny, versioned, revocable, no wider grant | §6 `LK-82-01`–`LK-82-07` | `LNK-82-T01`–`T07`, `ISO-82-T01` |
| `CBD-82-AC05` | Joint behavior: matching and confirmation paths, reversible edges, no authority merging, correction rights | §7 `AS-82-04`–`AS-82-08` | `JOINT-82-T01`–`T08` |
| `CBD-82-AC06` | Weak identifiers never auto-merge; confirm, decline, split, stale, retry outcomes specified | §7 `AS-82-01`–`AS-82-03`; `PB-82-05` | `CANON-82-T01`–`T06` |
| `CBD-82-AC07` | Lifecycle matrix distinguishes seven events with exact effects | §8 `OC-82-01`–`OC-82-07`, `LC-82-01`–`LC-82-04` | `LIFE-82-T01`–`T08` |
| `CBD-82-AC08` | One unlink stops one space only, without revoking the connection | `OC-82-01`; `LC-82-01` | `LIFE-82-T01`, `AUTH-82-T05` |
| `CBD-82-AC09` | Authorizer membership loss preserves, never transfers, never auto-activates | `OC-82-04`; `LC-82-02` | `LIFE-82-T03`, `LIFE-82-T04` |
| `CBD-82-AC10` | Cross-profile and cross-space identifiers, counts, timing, caches, concurrency have deterministic outcomes | §9 `PB-82-06`; `LC-82-04`; §3 identifier rule | `ISO-82-T01`–`T07`, `LIFE-82-T08` |
| `CBD-82-AC11` | Every retained field has purpose, audience, sensitivity, and a rule or named gate; copy promises no impossible deletion | §10 `DR-82-01`–`DR-82-04` | `DEL-82-T03`, `DEL-82-T04` |
| `CBD-82-AC12` | Traceability maps decisions to sources; every open decision has a disposition or follow-up | This record; §12 `OI-82-001`–`OI-82-004` | `audit-cbd-82.py` |

## 4. Discrepancy register

| # | Finding | Status |
| --- | --- | --- |
| 1 | `RF-92-006` names five unresolved things, and only one of them is decidable without a selected provider. Treating it as a single open decision made it look larger and more blocked than it is. | **Recorded.** §13 of the model states which part this package closes and which four remain, and proposes narrowing `RF-92-006` rather than closing it, in the same way `CR-91-008` was narrowed. |
| 2 | `EG-91-021` asks which domain is the authoritative steward for canonical accounts. The answer already existed, distributed across `CA-92-001` and `CA-92-005`, but had never been stated as one decision, which is why the gap stayed open. | **Answered in §2 of the model.** The financial profile stewards connections, accounts, and provenance; the budget space stewards its own overlays and visibility; the link is the only bridge. No new decision was required. |
| 3 | CBD-82's twelve acceptance criteria live in the Jira description rather than in the Acceptance Criteria field, unlike CBD-12 and CBD-75. The field is empty. | **Recorded, not corrected.** The criteria are complete and unambiguous where they are, and populating the field is a Jira change nobody authorized. Flagged because a reader checking the field would conclude the ticket has none. |
| 4 | CBD-82 cannot move to In Progress. Its parent story CBD-22 has no available transition, and above that the epic CBD-4 is in Planning. | **Recorded.** CBD-82 is Ready, assigned, and dated. Opening a story and an epic to satisfy a workflow rule is a larger decision than starting one subtask, so it was left for the Product Owner. |

## 5. What this package does not decide

Physical schema, indexes, and migrations. Provider association signals and identity-verification implementation, both of which wait on the CBD-15 selection. The final per-class deletion disposition, which is `EG-91-001`. Retention periods, which stay with CBD-91 §7.2. Deterministic fixtures, which are test-design scope.

A sibling task that finds itself making a product, authority, or lifecycle decision has found a defect here, and the fix belongs in the model rather than in the implementation.

## 6. Evidence gates

| Gate | Required evidence | Status |
| --- | --- | --- |
| Physical model | Approved schema, indexes, partitioning, migration plan | **OPEN — `OI-82-001`** |
| Provider identity reliability | CBD-15 selection and `EG-91-012` evidence for what makes provider identity reliable | **OPEN — `OI-82-004`** |
| Deterministic fixtures | Negative tests for every isolation scenario, under the CBD-94 verification inventory | **OPEN — `OI-82-002`** |
| Retention | `EG-91-001` per-class schedule and CBD-91 §7.2 disposition | **OPEN — `OI-82-003`** |
| Product Owner approval | Approval naming this exact version | **OPEN** |

## 7. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | September 3, 2026 | Claude with Alexander Wohlford as Product Owner | Initial record for the CBD-82 v0.1 draft. Twelve criteria mapped, four findings, five evidence gates open. | Draft; Product Owner review required |
