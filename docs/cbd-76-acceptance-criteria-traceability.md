# CBD-76 — Acceptance-Criteria Traceability and Completeness Report

| Field | Value |
| --- | --- |
| Status | **Approved v1.0 — synchronized with the CBD-76 boundary record; the Product Owner approved the exact package on September 4, 2026** |
| Document version | 1.0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-76](https://cobudget.atlassian.net/browse/CBD-76) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Boundary record | `docs/cbd-76-mvp-boundary-and-readiness-record.md` |
| Machine-readable boundary | `docs/cbd-76-mvp-boundary-register.json` |
| Review date | September 4, 2026 |

## 1. Method and evidence labels

This report checks three directions:

1. every CBD-1 criterion has accountable Story coverage;
2. every CBD-12 criterion has accountable CBD-72–76 evidence; and
3. every CBD-76 criterion resolves to a concrete package artifact and current readiness result.

Evidence labels are not interchangeable:

| Label | Meaning |
| --- | --- |
| Product decision | Product Owner-approved required behavior. It does not prove implementation or external validity. |
| Specification evidence | A reviewed rule, matrix, lifecycle, scenario, or boundary artifact. |
| Structural/mechanical evidence | A script proves shape, references, exact strings, or negative guard behavior. It does not prove customer comprehension or real-world control effectiveness. |
| Implementation evidence | Executed code and deterministic tests against the approved rule. Mostly future work for CBD-12. |
| Specialist/external evidence | Qualified legal, privacy, safety, accessibility, security, customer, or market review. Open unless explicitly named as held. |

## 2. CBD-1 to Story coverage

| Epic criterion | Accountable Story / evidence | CBD-12 relationship | Result |
| --- | --- | --- | --- |
| `CBD-1-AC01` workflows, states, edge cases | CBD-11 and CBD-67–71 | CBD-12 inherits the schedule/reconciliation permission and alert consequences; it is not the workflow owner. | Covered; no CBD-12 gap |
| `CBD-1-AC02` roles, sharing, consent, alerts, audit, revocation, prohibitions | CBD-12; CBD-72–76 | Direct owner. | Covered |
| `CBD-1-AC03` threat model and sensitive data | CBD-14; CBD-91–95 | CBD-12 consumes constraints and keeps implementation gates open. | Covered; no claim of implementation |
| `CBD-1-AC04` managed providers | CBD-15; CBD-102–108/130 | CBD-12 defers provider selection as an execution decision without reopening product semantics. | Covered; **CBD-108 approved at v1.0 and closed September 5, 2026**, with selections at `ELIGIBLE-PENDING-EVIDENCE` and the observation pass owed |
| `CBD-1-AC05` beta metrics | CBD-13; CBD-77–80 | CBD-76 blocks CBD-77, CBD-78, and CBD-79 in Jira by supplying stable scope; CBD-80 is not blocked by it. | Covered by accountable planned work |
| `CBD-1-AC06` unresolved/deferred decisions | CBD-12/CBD-76 plus story-local registers | Directly delivered by the four-way boundary and follow-up register. | Covered; creation actions must settle before approval |
| `CBD-1-AC07` plan/architecture/security/accessibility/brand/freshness consistency | CBD-11–15 collectively; CBD-12 via CBD-72–76 | CBD-75 controls role/copy language; CBD-76 records remaining execution gates. | Covered at specification level |
| `CBD-1-AC08` legal/regulatory risk and professional gates | CBD-14/CBD-94/CBD-132 | CBD-12 excludes unsupported claims and routes specialist validation. | Covered; specialist evidence remains open |
| `CBD-1-AC09` validation type, evidence, owner, approval, revision | All approved packages; CBD-76 §3 and this §1 | CBD-12 distinguishes Product Owner approval from implementation and external validation. | Covered |
| `CBD-1-AC10` end-to-end traceability | Story traceability records; this report | Directly maps all CBD-12 and CBD-76 criteria. | Covered |
| `CBD-1-AC11` final discovery handoff | CBD-76 for CBD-12; eventual CBD-1 close-out across CBD-11–15 | This package provides the collaboration boundary, deferrals, residual gates, and downstream routes. | Covered for CBD-12; Epic-wide handoff remains CBD-1 work |

No CBD-1 criterion is orphaned. This report does not mark CBD-1 complete: CBD-13 and CBD-15 retain accountable unfinished work.

## 3. CBD-12 per-criterion readiness

Each criterion carries one of the four CBD-76-AC09 values, followed by the basis: **Met** (the product rule is approved in CBD-72–75 and a contributor can implement without inventing a product authority or lifecycle decision), **Partially met** (the product rule exists but its evidence is not yet approved), **Unmet**, or **Blocked** (an unresolved high-impact product boundary). Met never waives the execution/evidence gates in the governing source; those appear in the last column.

| CBD-12 criterion | Governing evidence | Readiness | Remaining implementation/evidence boundary |
| --- | --- | --- | --- |
| `AC01` roles per budget-space membership | CBD-72 §§2–4; `DL-76-001` | Met; product rule approved | Policy and persistence fixtures |
| `AC02` independent roles across spaces | CBD-72 §7; XSP scenarios | Met; product rule approved | Cross-space negative tests |
| `AC03` one role per space; no stacking | CBD-72 §2.1; `DEF-76-001` | Met; product rule approved | Role stacking stays denied/post-MVP |
| `AC04` complete permission matrix | CBD-72 §4 permissions 1–35 | Met; product rule approved | Implementation call-site/test coverage |
| `AC05` explicit/default-deny permissions | CBD-72 §2.4; PM-72-001 | Met; product rule approved | `FU-95-006`, CBD-24 |
| `AC06` ownership, transfer, recovery, archive | CBD-72 §6; `DL-76-003/004/017/018`; `INC-76-010` | Met; product rule approved | Protected-action identity and lifecycle tests |
| `AC07` Viewer profile | CBD-72 §5.1 | Met; product rule approved | Data-access/derived-view fixtures |
| `AC08` Collaborator boundary | CBD-72 §§2.2/4; `INC-76-009` | Met; product rule approved | Authorization and immutable-provider-field tests |
| `AC09` Accountability Partner boundary | CBD-72 §5.3; CBD-75 `RD-75-05`; `DL-76-021` accepted residual | Met; product rule approved | Safety/accessibility/authorization evidence |
| `AC10` authorization inputs | CBD-72 §8; `INC-76-007` | Met; product rule approved | `FU-95-006`, CBD-24 |
| `AC11` cross-space isolation and content-free external copies | CBD-72 §7; CBD-74 §§6/13; `INC-76-004/007` | Met; product rule approved | Network/queue/cache/report negative tests |
| `AC12` invitation lifecycle | CBD-73 §4 | Met; product rule approved | `OI-73-002`–`OI-73-012` execution gates |
| `AC13` pre-acceptance disclosure | CBD-73 §7; CBD-75 `PT-75-01` | Met; product rule approved | Exact copy/accessibility/comprehension |
| `AC14` explicit versioned consent | CBD-73 §§5–7 | Met; product rule approved | Identity, audit, atomicity, race fixtures |
| `AC15` safe code recovery | CBD-73 §§4–5 | Met; product rule approved | Entropy, rate, provider, replay evidence |
| `AC16` expansion/reduction/revocation | CBD-73 §§10–11 | Met; product rule approved | Cutoff/orchestration/notice evidence |
| `AC17` unilateral exit and sole-Primary exception | CBD-72 §6; CBD-73 §11; `INC-76-010/013` | Met; product rule approved | Recovery and terminal-account gates |
| `AC18` lifecycle notices and audit | CBD-73 §§7/14 | Met; product rule approved | Exact audiences, storage, integrity, delivery evidence |
| `AC19` personal alert preferences; fixed built-in behavior | CBD-72 §5.4.1; CBD-74 §§4–8; `INC-76-003/004` | Met; product rule approved | Exact values/provider/templates and fixtures |
| `AC20` acknowledgements/comments do not mutate protected state | CBD-72 §5.6; CBD-74 §7; `INC-76-012`; `DL-76-020` | Met; product rule approved | CBD-131 comments-safety operating evidence |
| `AC21` fixed external content ceilings | CBD-74 §6; CBD-92 NT-92/EM-92; `DL-76-010` | Met; product rule approved | Provider/template and forbidden-field evidence |
| `AC22` coercion, access, exit, recovery safety | CBD-73/74; CBD-75 §5/§6; `PRO-76-006/007` | Met; product rule approved | Qualified safety review and operational evidence |
| `AC23` canonical glossary | CBD-75 §3; CBD-76 §7 | Met; product rule approved | Continuous copy-source coverage/localization |
| `AC24` accessible, voluntary, non-authority copy | CBD-75 §§5–8 | Met; semantic requirement approved | Exact-copy accessibility/comprehension/specialist evidence open |
| `AC25` accurate validation labels | CBD-75 §8; CBD-76 §1/§6; this §1 | Met; labels applied in approved CBD-75 and in this package | Formal external evidence remains explicitly open |
| `AC26` four-way boundary and deferred details | CBD-76 §§2–6; JSON register; CBD-365–CBD-367 | Met; register approved at v1.0 on September 4, 2026 | Merge and CI evidence recorded on CBD-76 |
| `AC27` implementation-ready distinction and traceability | CBD-76 in full; this report | Met; package approved at v1.0 on September 4, 2026 | Merge and CI evidence recorded on CBD-76 |
| `AC28` owner administration and individual connection authority | CBD-72 §§4.3/6; `DL-76-003–005/019`; `INC-76-011` | Met; product rule approved | Reauthentication, audit, connection-authority fixtures |
| `AC29` Primary removal of a Co-owner | CBD-72 §6.1 | Met; product rule approved | Protected-action and concurrent-change tests |
| `AC30` Viewer profile and account fields | CBD-72 §5.1/§5.8; `INC-76-009` | Met; product rule approved | Query, masking, derived-data tests |
| `AC31` Viewer noninterference | CBD-72 §5.2; XSP/VIS/REP scenarios | Met; product rule approved | Search/cache/report/notification tests |
| `AC32` Collaborator allowed work | CBD-72 §4.1 | Met; product rule approved | Per-action authorization/audit tests |
| `AC33` Collaborator denials and audit | CBD-72 §4/§9 | Met; product rule approved | Immutable-field/administration denial tests |
| `AC34` invited-channel verification | CBD-73 §5 | Met; product rule approved | Identity/provider/rate/replay evidence |
| `AC35` opaque single-use reconciliation code | CBD-73 §§4–5 | Met; product rule approved | Entropy, storage, invalidation, race tests |
| `AC36` attach to an existing personal account | CBD-73 §5 | Met; product rule approved | Intended-recipient, account-switch, identity and recovery tests |

### 3.1 Reverse mapping to CBD-72–76

This table matches the traceability summaries in the CBD-12 and CBD-76 Jira notes as read on September 4, 2026, so the repository and Jira state one relation the same way.

| Subtask | CBD-12 coverage |
| --- | --- |
| CBD-72 | AC01–AC11 and AC27–AC33 |
| CBD-73 | AC12–AC18, AC22, AC27, and AC34–AC36 |
| CBD-74 | AC09, AC19–AC22, and AC27 |
| CBD-75 | AC23–AC25; also supplies copy/terminology evidence cited under AC09/AC13/AC16/AC19/AC21/AC22 |
| CBD-76 | AC09, AC11, AC22, AC23, and AC25–AC27, plus the consolidation of every Included, Prohibited, Excluded, and Deferred boundary |

Every CBD-12 criterion maps forward to at least one subtask, and every subtask has criterion coverage. At v1.0 every CBD-12 criterion is met at the product-rule level; the implementation, evidence, and release gates in the last column of §3 remain open.

## 4. CBD-76 per-criterion mapping

| CBD-76 criterion | Package evidence | Current result |
| --- | --- | --- |
| `CBD-76-AC01` versioned decision log | Boundary record §3, `DL-76-001`–`DL-76-021` | Met; approved at v1.0 |
| `CBD-76-AC02` four-way classification | Boundary record §§2/4; JSON `classifications` (13 Included, 8 Prohibited, 4 Excluded, 5 Deferred) | Met; the audit compares the §4 tables to the register verbatim |
| `CBD-76-AC03` deferred/excluded rationale, risk/gate, owner, phase, Jira | JSON `DEF-76-*` and `EXC-76-*`; boundary record §§4.3–5; CBD-365–CBD-367 | Met |
| `CBD-76-AC04` eight prohibited behaviors | JSON `PRO-76-001`–`PRO-76-008`; boundary record §4.2 | Met |
| `CBD-76-AC05` supervised/minor/employer/organization/unsupported claims excluded | JSON `EXC-76-001`–`EXC-76-004`; boundary record §4.3 | Met |
| `CBD-76-AC06` exact deferred list and settled Included items | JSON `DEF-76-001`–`DEF-76-005`; `INC-76-001/003/009–013`; `DL-76-002/003/006/008/009/013–021`; CBD-365–CBD-367 | Met |
| `CBD-76-AC07` CBD-1/CBD-12/subtask traceability | This report §§2–3 | Met |
| `CBD-76-AC08` terminology consistency | Boundary record §7; CBD-75 v1.0 and copy audit; September 3 Jira readback | Met; stale CBD-12 planning and description phrases were corrected |
| `CBD-76-AC09` per-CBD-12 readiness | This report §3, using the met / partially met / unmet / blocked vocabulary | Met; AC26 and AC27 became met on exact-package approval |
| `CBD-76-AC10` future-contributor distinction | Boundary record §§1–9; JSON required fields; this report §1 | Met; approved at v1.0 |

## 5. Discrepancy register

| ID | Finding | Current effect | Required closure |
| --- | --- | --- | --- |
| `RF-76-001` | CBD-12 planning notes said one Co-owner may exist, although AC06/AC28 and approved CBD-72 permit multiple Co-owners. | **Resolved September 3, 2026:** the notes now preserve multiple active Co-owners and specific-Co-owner removal semantics. | Live readback confirmed the stale single-Co-owner phrases are absent. |
| `RF-76-002` | CBD-12 planning notes said members choose alert thresholds and cooldowns, although AC19 and approved CBD-74 fix built-in thresholds and system-owned cooldown/deduplication. | **Resolved September 3, 2026:** the notes now preserve fixed built-in behavior and FF-009 as the post-MVP custom-rule route. | Live readback confirmed the obsolete configurable-threshold/cooldown phrase is absent. |
| `RF-76-003` | CBD-12 planning notes said external previews identify the budget space and can be made more detailed, although AC11/AC19/AC21 require fixed content-free push/SMS/routine email. | **Resolved September 3, 2026:** the notes and description now preserve the content-free ceiling and prevent preference-driven widening. | Live readback confirmed the obsolete preview/privacy-detail phrases are absent. |
| `RF-76-004` | No dedicated Jira issue was initially found for role stacking, FF-009 implementation, or the final production message inventory. | **Resolved September 3, 2026:** CBD-365, CBD-366, and CBD-367 were created under CBD-8/CBD-10 with the deferred boundary and evidence gates. | No further CBD-76 action; issue creation closes no implementation/evidence gate. |
| `RF-76-005` | Some approved-source headers/history retain wording about pending package approval while their status rows name later exact approval. | No substantive decision conflict; a reader must use the latest status and revision row. | Do not broaden this task into unrelated source cleanup; record only if a focused source task is authorized. |
| `RF-76-006` | v0.1 had eight Included rows while §2 denied any capability absent from them. Approved CBD-72 behavior had no row: Collaborator financial export and the Viewer snapshot, archival/deletion/restoration and inactivity recovery, connection authority and orphaned connections, comments, and the decided terminal personal-account disposition. | **Resolved September 4, 2026 (v0.2):** `INC-76-009`–`INC-76-013` added with sources, owners, and gates. | None; the deny rule now matches the approved product. |
| `RF-76-007` | v0.1 §3 claimed no high-impact decision was unnamed, but omitted `OD-72-01` inactivity archival, `OD-72-02`/`OD-72-05` deletion via archival, `OD-72-04` orphaned connections, cross-author comment non-moderation, and the `OI-74-006` accepted Partner residual. | **Resolved September 4, 2026 (v0.2):** `DL-76-017`–`DL-76-021` added and the claim reworded to what the log actually covers. | None. |
| `RF-76-008` | v0.1 `DEF-76-003` restated CBD-108's acceptance criteria (pricing, cost thresholds, observation gates) and said provider-dependent implementation stays blocked, although the Product Owner took CBD-103 §3.3 route B on September 2, 2026, selecting providers at `ELIGIBLE-PENDING-EVIDENCE` with observation tests deferred to build. It also did not record that Private-MVP push has no provider to select. | **Resolved September 4, 2026 (v0.2):** the gate defers to Product Owner approval of the exact CBD-108 package under the approved route, and CBD-130 `PN-130-003` is cited. | None; CBD-108 approval remains the gate. |
| `RF-76-009` | v0.1 readiness rows used five ad-hoc labels instead of the CBD-76-AC09 vocabulary, marked AC26/AC27 “Met in draft” although the package is unapproved, and §8 called this package approved evidence. | **Resolved September 4, 2026 (v0.2):** every row uses met / partially met / unmet / blocked with a stated basis; AC26 and AC27 are partially met; §8 reworded. | None. |
| `RF-76-010` | v0.1 §3.1 differed from the CBD-12 and CBD-76 Jira traceability summaries in which criteria CBD-72, CBD-74, and CBD-76 support. | **Resolved September 4, 2026 (v0.2):** §3.1 now states the Jira relation verbatim. | None. |
| `RF-76-011` | The CBD-76 Jira planning note still says the subtask is due August 31, 2026, while the CBD-12 notes record September 7, 2026. | Open; a scheduling note, not a decision conflict. | Correct the CBD-76 note in the closure Jira pass (boundary record §9 item 5). |
| `RF-76-012` | The v0.1 audit could not detect a prose/JSON difference the record itself says fails review, accepted a prose paragraph as a Jira follow-up key, and did not check that every boundary ID cited in prose exists in the register. | **Resolved September 4, 2026 (v0.2):** the audit compares each §4 table row to the register's capability string, requires Deferred `followUp` to be a Jira key that appears in §5, checks every cited `INC/PRO/EXC/DEF-76-*` and `DL-76-*` ID exists, and checks the readiness vocabulary. | None. |

## 6. Completeness and readiness conclusion

The package contains no unexplained product-boundary gap. The remaining items are visible and typed:

* `RF-76-001`–`RF-76-004` are resolved Jira reconciliation and follow-up-routing findings; CBD-365–CBD-367 preserve the deferred work;
* `RF-76-006`–`RF-76-010` and `RF-76-012` are v0.1 review findings resolved in v0.2; `RF-76-011` is an open Jira scheduling note;
* named `OI-*`, `FU-95-*`, `RG-94-*`, and `VT-94-*` items are execution, evidence, specialist, or release gates; and
* `RF-76-005` is deliberately not expanded into unrelated document work.

Current recommendation: **close CBD-76 at v1.0 once the merge commit and successful CI are recorded on the ticket, then re-fetch CBD-12 and close it.** Closure approves the planning specification only; it does not close any `OI-*`, `FU-95-*`, `RG-94-*`, or `VT-94-*` gate, authorize release, or claim implementation or external validation.

## 7. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0 | September 4, 2026 | Alexander Wohlford — Product Owner, with Claude | **Approved.** Status and version promoted with the boundary record. AC26 and AC27 move from partially met to met on approval; the CBD-76 criterion rows drop “in draft”; §6 becomes a closure instruction. No mapping, discrepancy, or evidence label changed. | Approved September 4, 2026 |
| 0.2 | September 4, 2026 | Claude with Alexander Wohlford as Product Owner | Independent review of v0.1. Adopted the CBD-76-AC09 readiness vocabulary with AC26 and AC27 partially met; aligned §3.1 to the CBD-12 and CBD-76 Jira traceability summaries; cited the new `INC-76-009`–`INC-76-013` and `DL-76-017`–`DL-76-021` rows; corrected the CBD-1-AC05 blocking relation to CBD-77–CBD-79; recorded `RF-76-006`–`RF-76-012`. | Draft; synchronized Product Owner review required |
| 0.1 | September 3, 2026 | Codex with Alexander Wohlford as Product Owner | Initial bidirectional CBD-1 → Story → CBD-12 → CBD-72–76 map; thirty-six CBD-12 readiness rows; ten CBD-76 criterion rows; evidence-label contract; five discrepancies; conditional readiness conclusion. | Draft; synchronized Product Owner review required |
