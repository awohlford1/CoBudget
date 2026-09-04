# CBD-76 — Acceptance-Criteria Traceability and Completeness Report

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — synchronized review required with the CBD-76 boundary record** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-76](https://cobudget.atlassian.net/browse/CBD-76) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Boundary record | `docs/cbd-76-mvp-boundary-and-readiness-record.md` |
| Machine-readable boundary | `docs/cbd-76-mvp-boundary-register.json` |
| Review date | September 3, 2026 |

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
| `CBD-1-AC04` managed providers | CBD-15; CBD-102–108/130 | CBD-12 defers provider selection as an execution decision without reopening product semantics. | Covered; CBD-108 remains in progress |
| `CBD-1-AC05` beta metrics | CBD-13; CBD-77–80 | CBD-76 blocks the metric-definition sequence by supplying stable scope. | Covered by accountable planned work |
| `CBD-1-AC06` unresolved/deferred decisions | CBD-12/CBD-76 plus story-local registers | Directly delivered by the four-way boundary and follow-up register. | Covered; creation actions must settle before approval |
| `CBD-1-AC07` plan/architecture/security/accessibility/brand/freshness consistency | CBD-11–15 collectively; CBD-12 via CBD-72–76 | CBD-75 controls role/copy language; CBD-76 records remaining execution gates. | Covered at specification level |
| `CBD-1-AC08` legal/regulatory risk and professional gates | CBD-14/CBD-94/CBD-132 | CBD-12 excludes unsupported claims and routes specialist validation. | Covered; specialist evidence remains open |
| `CBD-1-AC09` validation type, evidence, owner, approval, revision | All approved packages; CBD-76 §3 and this §1 | CBD-12 distinguishes Product Owner approval from implementation and external validation. | Covered |
| `CBD-1-AC10` end-to-end traceability | Story traceability records; this report | Directly maps all CBD-12 and CBD-76 criteria. | Covered |
| `CBD-1-AC11` final discovery handoff | CBD-76 for CBD-12; eventual CBD-1 close-out across CBD-11–15 | This package provides the collaboration boundary, deferrals, residual gates, and downstream routes. | Covered for CBD-12; Epic-wide handoff remains CBD-1 work |

No CBD-1 criterion is orphaned. This report does not mark CBD-1 complete: CBD-13 and CBD-15 retain accountable unfinished work.

## 3. CBD-12 per-criterion readiness

“Met at product-rule level” means a contributor can implement without inventing a product authority or lifecycle decision. It does not waive the execution/evidence gates in the governing source.

| CBD-12 criterion | Governing evidence | Readiness | Remaining implementation/evidence boundary |
| --- | --- | --- | --- |
| `AC01` roles per budget-space membership | CBD-72 §§2–4; `DL-76-001` | Met at product-rule level | Policy and persistence fixtures |
| `AC02` independent roles across spaces | CBD-72 §7; XSP scenarios | Met at product-rule level | Cross-space negative tests |
| `AC03` one role per space; no stacking | CBD-72 §2.1; `DEF-76-001` | Met at product-rule level | Role stacking stays denied/post-MVP |
| `AC04` complete permission matrix | CBD-72 §4 permissions 1–35 | Met at product-rule level | Implementation call-site/test coverage |
| `AC05` explicit/default-deny permissions | CBD-72 §2.4; PM-72-001 | Met at product-rule level | `FU-95-006`, CBD-24 |
| `AC06` ownership, transfer, recovery, archive | CBD-72 §6; `DL-76-003/004` | Met at product-rule level | Protected-action identity and lifecycle tests |
| `AC07` Viewer profile | CBD-72 §5.1 | Met at product-rule level | Data-access/derived-view fixtures |
| `AC08` Collaborator boundary | CBD-72 §§2.2/4 | Met at product-rule level | Authorization and immutable-provider-field tests |
| `AC09` Accountability Partner boundary | CBD-72 §5.3; CBD-75 `RD-75-05` | Met at product-rule level | Safety/accessibility/authorization evidence |
| `AC10` authorization inputs | CBD-72 §8; `INC-76-007` | Met at product-rule level | `FU-95-006`, CBD-24 |
| `AC11` cross-space isolation and content-free external copies | CBD-72 §7; CBD-74 §§6/13; `INC-76-004/007` | Met at product-rule level | Network/queue/cache/report negative tests |
| `AC12` invitation lifecycle | CBD-73 §4 | Met at product-rule level | `OI-73-002`–`OI-73-012` execution gates |
| `AC13` pre-acceptance disclosure | CBD-73 §7; CBD-75 `PT-75-01` | Met at product-rule level | Exact copy/accessibility/comprehension |
| `AC14` explicit versioned consent | CBD-73 §§5–7 | Met at product-rule level | Identity, audit, atomicity, race fixtures |
| `AC15` safe code recovery | CBD-73 §§4–5 | Met at product-rule level | Entropy, rate, provider, replay evidence |
| `AC16` expansion/reduction/revocation | CBD-73 §§10–11 | Met at product-rule level | Cutoff/orchestration/notice evidence |
| `AC17` unilateral exit and sole-Primary exception | CBD-72 §6; CBD-73 §11 | Met at product-rule level | Recovery and terminal-account gates |
| `AC18` lifecycle notices and audit | CBD-73 §§7/14 | Met at product-rule level | Exact audiences, storage, integrity, delivery evidence |
| `AC19` personal alert preferences; fixed built-in behavior | CBD-72 §5.4.1; CBD-74 §§4–8; `INC-76-003/004` | Met at product-rule level | Exact values/provider/templates and fixtures |
| `AC20` acknowledgements/comments do not mutate protected state | CBD-72 §5.6; CBD-74 §7 | Met at product-rule level | CBD-131 comments-safety operating evidence |
| `AC21` fixed external content ceilings | CBD-74 §6; CBD-92 NT-92/EM-92; `DL-76-010` | Met at product-rule level | Provider/template and forbidden-field evidence |
| `AC22` coercion, access, exit, recovery safety | CBD-73/74; CBD-75 §5/§6; `PRO-76-006/007` | Met at product-rule level | Qualified safety review and operational evidence |
| `AC23` canonical glossary | CBD-75 §3; CBD-76 §7 | Met at product-rule level | Continuous copy-source coverage/localization |
| `AC24` accessible, voluntary, non-authority copy | CBD-75 §§5–8 | Met as a semantic requirement | Exact-copy accessibility/comprehension/specialist evidence open |
| `AC25` accurate validation labels | CBD-75 §8; CBD-76 §1/§6; this §1 | Met | Formal external evidence remains explicitly open |
| `AC26` four-way boundary and deferred details | CBD-76 §§2–6; JSON register; CBD-365–CBD-367 | Met in draft | Exact-package approval and audit remain |
| `AC27` implementation-ready distinction and traceability | CBD-76 in full; this report | **Met in draft; package approval pending** | Exact-package Product Owner approval and merge evidence |
| `AC28` owner administration and individual connection authority | CBD-72 §§4.3/6; `DL-76-003–005` | Met at product-rule level | Reauthentication, audit, connection-authority fixtures |
| `AC29` Primary removal of a Co-owner | CBD-72 §6.1 | Met at product-rule level | Protected-action and concurrent-change tests |
| `AC30` Viewer profile and account fields | CBD-72 §5.1 | Met at product-rule level | Query, masking, derived-data tests |
| `AC31` Viewer noninterference | CBD-72 §5.2; XSP/VIS/REP scenarios | Met at product-rule level | Search/cache/report/notification tests |
| `AC32` Collaborator allowed work | CBD-72 §4.1 | Met at product-rule level | Per-action authorization/audit tests |
| `AC33` Collaborator denials and audit | CBD-72 §4/§9 | Met at product-rule level | Immutable-field/administration denial tests |
| `AC34` invited-channel verification | CBD-73 §5 | Met at product-rule level | Identity/provider/rate/replay evidence |
| `AC35` opaque single-use reconciliation code | CBD-73 §§4–5 | Met at product-rule level | Entropy, storage, invalidation, race tests |
| `AC36` attach to an existing personal account | CBD-73 §5 | Met at product-rule level | Intended-recipient, account-switch, identity and recovery tests |

### 3.1 Reverse mapping to CBD-72–76

| Subtask | CBD-12 coverage |
| --- | --- |
| CBD-72 | AC01–AC11 and AC28–AC33; also supplies parts of AC17/AC19/AC20/AC22 |
| CBD-73 | AC12–AC18 and AC34–AC36; also supplies parts of AC22/AC24/AC27 |
| CBD-74 | AC19–AC21; also supplies parts of AC09/AC11/AC18/AC22/AC24/AC27 |
| CBD-75 | AC23–AC25; also supplies copy/terminology evidence for AC09/AC13/AC16/AC19/AC21/AC22/AC27 |
| CBD-76 | AC25–AC27 and the consolidation of every Included, Prohibited, Excluded, and Deferred boundary |

Every CBD-12 criterion maps forward to at least one subtask, and every subtask has criterion coverage. AC27 is the only current CBD-12 closure condition not yet fully satisfied.

## 4. CBD-76 per-criterion mapping

| CBD-76 criterion | Package evidence | Current result |
| --- | --- | --- |
| `CBD-76-AC01` versioned decision log | Boundary record §3, `DL-76-001`–`DL-76-016` | Met in draft; exact-version Product Owner approval pending |
| `CBD-76-AC02` four-way classification | Boundary record §§2/4; JSON `classifications` | Met in draft; audit must pass |
| `CBD-76-AC03` deferred/excluded rationale, risk/gate, owner, phase, Jira | JSON `DEF-76-*` and `EXC-76-*`; boundary record §§4.3–5; CBD-365–CBD-367 | Met in draft |
| `CBD-76-AC04` eight prohibited behaviors | JSON `PRO-76-001`–`PRO-76-008`; boundary record §4.2 | Met in draft |
| `CBD-76-AC05` supervised/minor/employer/organization/unsupported claims excluded | JSON `EXC-76-001`–`EXC-76-004`; boundary record §4.3 | Met in draft |
| `CBD-76-AC06` exact deferred list and settled Included items | JSON `DEF-76-001`–`DEF-76-005`; `INC-76-001/003`; `DL-76-002/003/006/008/009/013–015`; CBD-365–CBD-367 | Met in draft |
| `CBD-76-AC07` CBD-1/CBD-12/subtask traceability | This report §§2–3 | Met in draft |
| `CBD-76-AC08` terminology consistency | Boundary record §7; CBD-75 v1.0 and copy audit; September 3 Jira readback | Met in draft; stale CBD-12 planning and description phrases were corrected |
| `CBD-76-AC09` per-CBD-12 readiness | This report §3 | Met as a conditional recommendation; exact-package approval remains pending |
| `CBD-76-AC10` future-contributor distinction | Boundary record §§1–9; JSON required fields; this report §1 | Met in draft; review approval pending |

## 5. Discrepancy register

| ID | Finding | Current effect | Required closure |
| --- | --- | --- | --- |
| `RF-76-001` | CBD-12 planning notes said one Co-owner may exist, although AC06/AC28 and approved CBD-72 permit multiple Co-owners. | **Resolved September 3, 2026:** the notes now preserve multiple active Co-owners and specific-Co-owner removal semantics. | Live readback confirmed the stale single-Co-owner phrases are absent. |
| `RF-76-002` | CBD-12 planning notes said members choose alert thresholds and cooldowns, although AC19 and approved CBD-74 fix built-in thresholds and system-owned cooldown/deduplication. | **Resolved September 3, 2026:** the notes now preserve fixed built-in behavior and FF-009 as the post-MVP custom-rule route. | Live readback confirmed the obsolete configurable-threshold/cooldown phrase is absent. |
| `RF-76-003` | CBD-12 planning notes said external previews identify the budget space and can be made more detailed, although AC11/AC19/AC21 require fixed content-free push/SMS/routine email. | **Resolved September 3, 2026:** the notes and description now preserve the content-free ceiling and prevent preference-driven widening. | Live readback confirmed the obsolete preview/privacy-detail phrases are absent. |
| `RF-76-004` | No dedicated Jira issue was initially found for role stacking, FF-009 implementation, or the final production message inventory. | **Resolved September 3, 2026:** CBD-365, CBD-366, and CBD-367 were created under CBD-8/CBD-10 with the deferred boundary and evidence gates. | No further CBD-76 action; issue creation closes no implementation/evidence gate. |
| `RF-76-005` | Some approved-source headers/history retain wording about pending package approval while their status rows name later exact approval. | No substantive decision conflict; a reader must use the latest status and revision row. | Do not broaden this task into unrelated source cleanup; record only if a focused source task is authorized. |

## 6. Completeness and readiness conclusion

The package contains no unexplained product-boundary gap. The remaining items are visible and typed:

* `RF-76-001`–`RF-76-004` are resolved Jira reconciliation and follow-up-routing findings;
* `RF-76-004` is closed follow-up routing; CBD-365–CBD-367 preserve the deferred work;
* named `OI-*`, `FU-95-*`, `RG-94-*`, and `VT-94-*` items are execution, evidence, specialist, or release gates; and
* `RF-76-005` is deliberately not expanded into unrelated document work.

Current recommendation: **do not close CBD-76 or CBD-12 at v0.1.** Obtain Product Owner approval of the exact package, merge through a focused PR with successful CI, then transition CBD-76 and CBD-12 in that order after fresh Jira reads.

## 7. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | September 3, 2026 | Codex with Alexander Wohlford as Product Owner | Initial bidirectional CBD-1 → Story → CBD-12 → CBD-72–76 map; thirty-six CBD-12 readiness rows; ten CBD-76 criterion rows; evidence-label contract; five discrepancies; conditional readiness conclusion. | Draft; synchronized Product Owner review required |
