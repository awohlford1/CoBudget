# CBD-75 — Acceptance-Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft v0.2 — Product Owner review and approval required** |
| Document version | 0.2 |
| Owner | Alexander Wohlford |
| Jira | [CBD-75](https://cobudget.atlassian.net/browse/CBD-75) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Standard | `docs/cbd-75-role-terminology-and-copy-standard.md` |
| Machine-readable registers | `docs/cbd-75-prohibited-language-register.json`, `docs/cbd-75-approved-copy.json` |
| Mechanical audit | `python3 scripts/audit-cbd-75.py` |
| Last updated | September 3, 2026 |

## 1. Purpose

This records what CBD-75 delivered against each of its ten acceptance criteria, which CBD-12 criteria it supports, what it found while being written, and what it deliberately did not do.

A mechanical audit pass proves structure. It does not prove that a description matches the permission it describes, and this package contains a worked example of the difference: `RD-75-04` passed every structural check while telling a Viewer they could not export, when CBD-72 §5.1 item 11 permits them to download an owner-created snapshot. That was caught by reading the source, not by running the audit.

## 2. Governing sources and versions

| Source | Version consumed | What is taken from it |
| --- | --- | --- |
| `docs/cbd-72-collaboration-permission-model.md` | v0.1.54 | §2.1 membership model; §2.2 the five roles; §5.1 Viewer hierarchy and the scope label; §5.3 the Accountability Partner field boundary; §5.8 the owner-authorized Viewer snapshot |
| `docs/cbd-73-invitation-consent-lifecycle-specification.md` and its message inventory | v1.0.2 | §2 cross-cutting semantic rules, generalized into `CS-75-01`–`CS-75-12`; the surfaces `PT-75-01`–`PT-75-05` shape |
| `docs/cbd-74-accountability-alert-boundary-specification.md` | v1.0.1 | `CP-74-01`–`CP-74-08`; `AB-74-015`; `PB-74-06`, `PB-74-09`, `PB-74-12`; §6.2 and §6.4 |
| `docs/cbd-93-privacy-coercion-abuse-analysis.md` | Current | `SG-93-021`, `SG-93-093` and the copy safeguards routed to CBD-75 |
| `docs/cbd-94-risk-mitigation-requirement-register.md` | Current | `SR-94-089`, `SR-94-142`, `SR-94-145` |
| `docs/cbd-95-cbd-12-reconciliation-matrix.md` | v1.0.2 | `RC-95-023`, `RC-95-024`; `RI-93-016` and `RI-93-017` decision text |
| `docs/brand-foundation.md` | Brand decided September 2, 2026 | The naming rule behind `RT-75-01`–`RT-75-06`, and the approved strings the checks read directly |

Unlike CBD-73 and CBD-74, this package does not pin its governing sources by content hash. Those packages inherit specific numbered requirements whose wording matters exactly. CBD-75 inherits a vocabulary and a semantic standard, and pinning a hash would fail on every unrelated edit to a large document while catching nothing this package depends on. `CK-75-01` covers the vocabulary by review instead. This is a deliberate difference, recorded so it is not read as an omission.

## 3. Package contents

| File | Role |
| --- | --- |
| `docs/cbd-75-role-terminology-and-copy-standard.md` | The authority. Eight registers, ten sections |
| `docs/cbd-75-prohibited-language-register.json` | The 14 rules, their patterns, their self-proof examples, and the recorded exceptions |
| `docs/cbd-75-approved-copy.json` | The customer strings this package approves outright |
| `docs/cbd-75-acceptance-criteria-traceability.md` | This record |
| `scripts/copy-language.mjs` | The engine: scope resolution and negation |
| `scripts/brand-foundation.mjs` | The approved brand strings, parsed independently of the app |
| `scripts/check-copy-language.mjs` | Applies the register to the approved strings and the brand strings |
| `scripts/check-public-pages.mjs` | Amended to apply the same register to built pages at public-page scope |
| `scripts/audit-cbd-75.py` | Structural audit; enforces document-to-register agreement in both directions |

There is no separate negative-scenario test inventory, and that is a scope decision rather than an oversight. CBD-73 and CBD-74 specify runtime behavior, so their contracts need scenarios that a future implementation must satisfy. CBD-75 specifies vocabulary and wording, and its equivalent is the two build checks, each proven to fail on a deliberate violation. Copy scenarios that do belong to a runtime surface stay with the package that owns the surface.

## 4. Discrepancy register

| # | Finding | Status |
| --- | --- | --- |
| 1 | The approved mission statement and manifesto promised real-time insights, and the Stability value described the product as building resilience through shared oversight. All three breached this standard, contradicted the brand foundation's own copy guidance three sections below the mission, and were live on the public pages. | **Corrected September 3, 2026 by Product Owner decision**, closing `OI-75-003`. The v0.1 draft recorded them as enforced exceptions instead of fixing them, because rewriting approved brand copy is not an editorial call. `docs/brand-foundation.md` now reads clear insights, shared understanding, and practical insights; the standard's §6.3 records what changed and the register's exception list keeps only the `PL-75-10` rule limit. |
| 2 | `CBD-12-AC21` specified that an invitation email may identify itself as a CoBudget invitation, which the September 2, 2026 brand decision makes wrong on a customer-readable surface. | **Corrected in Jira September 2, 2026** on Product Owner authorization. AC21 now says MoneyPact and carries the naming rule. |
| 3 | `CBD-12-AC17` and `CBD-12-AC36` referred to CoBudget sign-in and an existing CoBudget account in requirement prose. | **Reworded in Jira September 2, 2026** to product sign-in and an existing product account, which commits to neither name. Flagged for Product Owner confirmation, since the authorization named AC21 only. |
| 4 | The first draft of `RD-75-04` told a Viewer they could not export. CBD-72 §5.1 item 11 prohibits Viewer-initiated bulk export but permits downloading an owner-created snapshot under §5.8. | **Corrected before approval.** The description now separates what a Viewer cannot do themselves from what an owner can hand them, and states the snapshot's expiry. |
| 5 | The first draft of `RD-75-05` said an Accountability Partner sees the shared budget in full. CBD-72 §5.3 explicitly qualifies comprehensive as all budget-space financial and schedule resources, not all stored fields. | **Corrected before approval.** The description now names the excluded fields and states who can end the arrangement, per CBD-12-AC17. |
| 6 | `scripts/check-public-pages.mjs` banned the term Accountability Partner on the ground that CBD-12 had not settled the role. That ground expired when `FU-95-003` closed on August 16, 2026. | **Corrected.** The ban is kept as `PL-75-14` on a new and stated reason: a role named without its boundary implies authority the standard prohibits. |
| 7 | Legacy guardian vocabulary survives in `docs/product-plan.md` and `docs/architecture.md`. The product plan additionally frames the Accountability Partner naming decision as still open, and describes the role's access as scoped and revocable by the subject, which CBD-94 records as materially misleading. | **Open — `OI-75-004`.** `SR-94-145` requires the removal. `FU-95-005` directs that such corrections happen in their own focused task and forbids a broad cleanup change, so this package records the defect and does not fix it. The same change must amend CBD-91 `CR-91-003` and `CR-91-004`, which describe the contradiction and would otherwise be left recording a condition that had been corrected. |
| 8 | `CBD-75-AC02` was checked live rather than reconstructed from `FU-95-003`'s closure note. | **No discrepancy.** The live criterion carries the approved comprehensive, fixed-boundary, financially read-only definition. `FU-95-003`'s closure is confirmed against the field, not against its own summary. |

Finding 7 is the pattern this project has now hit twice: a register that records a problem is not the same as a fixed problem, and correcting the problem without amending the register leaves a second, quieter defect behind. It is written into `OI-75-004` as a requirement on whoever takes that task.

## 5. Per-criterion mapping

| Criterion | Requirement | Delivered by | Verified by |
| --- | --- | --- | --- |
| `CBD-75-AC01` | Accountability Partner is the sole official term | §3.1 `RD-75-05`; §3.3 retires Guardian and every observational synonym | `PL-75-02` and `PL-75-10`, both proven to fire; `CK-75-06` by review |
| `CBD-75-AC02` | Canonical definitions for all five roles | §3.1 long descriptions `RD-75-01`–`RD-75-05`, each read against CBD-72 §2.2, §5.1, §5.3, §5.8 | Source review, which corrected two overclaims before approval; `npm run check:copy` |
| `CBD-75-AC03` | Internal enum, capitalization, singular and plural | §3.1 table; §3.2 items 1–5 | `check-copy-language.mjs` derives each enum from its name and fails on disagreement |
| `CBD-75-AC04` | One vocabulary across requirements, data model, APIs, tests, analytics, docs, and copy | §7 `CK-75-01`–`CK-75-10`, each labeled mechanical or review | `npm run check:copy`, `npm run check:pages`, `audit-cbd-75.py`; the rest by review, with `OI-75-004` the live exception |
| `CBD-75-AC05` | Invitation and consent copy in plain language | `PT-75-01`; `CS-75-01`, `CS-75-06`, `CS-75-08`, `CS-75-11` | Semantic rules only; exact strings gated by `OI-75-001` |
| `CBD-75-AC06` | Consistent reusable pattern across settings, role change, revocation, alerts, acknowledgement, errors, and help | §5.2 `PT-75-01`–`PT-75-09`, each fixing required parts and their order | Structure audited; exact strings gated by `OI-75-001` |
| `CBD-75-AC07` | No implied legal authority, spending permission, money control, blocking, punishment, surveillance, or irrevocable access | `PL-75-01`, `PL-75-02`, `PL-75-03`, `PL-75-05`, `PL-75-06`, `PL-75-07`, `PL-75-12` | All seven proven to catch their own examples; the two that permit denial proven to allow it |
| `CBD-75-AC08` | Accessible, concise, inclusive, supportive, voluntary, nonjudgemental | `CS-75-11`; `PL-75-04`; `PL-75-09`; `CP-74-08` inherited | Language rules mechanical; accessibility and comprehension hold no evidence, `OI-75-002` |
| `CBD-75-AC09` | Evidence labeled by type; no unsupported claim recorded as validated | §8 `VP-75-01`–`VP-75-07` and the evidence log, whose four empty rows are the current honest state | `VP-75-02` and `VP-75-06` bind the record; `PL-75-13` blocks the same claim in copy |
| `CBD-75-AC10` | Consistency checklist and prohibited-language list for future reviews | §6 and the JSON register; §7 the checklist | `audit-cbd-75.py` enforces document-to-register agreement both ways |

## 6. Supported CBD-12 criteria

| CBD-12 criterion | How CBD-75 supports it |
| --- | --- |
| AC09 — Accountability Partner boundary | `RD-75-05` states the comprehensive scope, the excluded fields, the read-only limit, and the exit, in customer words |
| AC13 — Pre-acceptance disclosure | `PT-75-01` fixes the parts and their order |
| AC16 — Expansion needs new consent; reduction is immediate | `CS-75-06` and `CS-75-08`; `PT-75-02` and `PT-75-03` |
| AC19 — Alert preferences are personal and never widen content | `PT-75-07`; `PL-75-08`; `CS-75-02` and `CS-75-03` |
| AC22 — Safety, non-retaliation, and a supported way out for everyone | `CS-75-08`; `PL-75-05`, `PL-75-07`, `PL-75-12`; `RD-75-01` states the sole-owner exit and `RD-75-05` the Partner's |
| AC23 — Canonical glossary; Accountability Partner the sole term | §3 in full. This is the criterion CBD-75 exists to satisfy |
| AC24 — Accessible, supportive, non-authority copy | §5.1 and §6 in full |
| AC25 — Evidence labeled; no unsupported validation claim | §8 in full |

## 7. Evidence gates

| Gate | Required evidence | Status |
| --- | --- | --- |
| Exact per-surface strings | Product Owner approval of exact copy for every `MSG-73-*` row and every `CP-74-*` surface, versioned, with external template hashes | **OPEN — `OI-75-001` / `FU-95-017` / `OI-73-004`** |
| Accessibility | Assistive-technology testing against `SD-071-048` | **OPEN — `OI-75-002`** |
| Comprehension | A study with people outside the team on consent and disclosure copy | **OPEN — `OI-75-002`** |
| Safety and coercion review | Specialist review of role, alert, revocation, and support language | **OPEN — CBD-14 / `FU-95-027`** |
| Brand copy correction | Product Owner decision on the three defects in §6.3 | **CLOSED September 3, 2026.** Decision taken, all three corrected, `OI-75-003` closed |
| Legacy vocabulary removal | Focused change to `docs/product-plan.md` and `docs/architecture.md`, amending CBD-91 `CR-91-003` and `CR-91-004` in the same change | **OPEN — `OI-75-004`** |
| Localization | Equivalent role terms and an equivalent register per supported locale | **OPEN — `OI-75-005`** |
| Support response | Exact copy, restricted intake, procedure, and training for `PT-75-05` | **OPEN — `OI-75-006`** |

## 8. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.2 | September 3, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the brand copy correction. Finding 1 moves from open to corrected and its evidence gate closes; `OI-75-003` is closed in the standard. Seven findings remain as recorded, and `OI-75-004` stays open for its own focused task. No criterion mapping changed. | Draft; Product Owner review required |
| 0.1 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Initial record for the CBD-75 v0.1 draft. Eight discrepancy findings, three of them corrected in this change and two corrected in Jira; ten criteria mapped; eight CBD-12 criteria supported; eight evidence gates open. | Draft; Product Owner review required |
