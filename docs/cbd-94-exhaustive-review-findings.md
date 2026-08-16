# CBD-94 — Exhaustive Review Findings

| Field | Value |
| --- | --- |
| Status | **Accepted v1.0 — independent review of the CBD-94 v0.1.2 document set; all seven findings closed** |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Jira | [CBD-94](https://cobudget.atlassian.net/browse/CBD-94) |
| Reviewed artifacts | `docs/cbd-94-risk-mitigation-requirement-register.md` v0.1.2; `docs/cbd-94-verification-review-inventory.md` v0.1.2; `docs/cbd-94-acceptance-criteria-traceability.md` v0.1.2 |
| Disposition | Findings folded into traceability §13 as `RV-94-011`–`RV-94-017`. Four corrected in the v0.1.3 set; the remaining three closed by Product Owner decision in the v0.1.4 set. The reviewed set was approved as **CBD-94 v1.0** on August 16, 2026 |
| Repository baseline | `cb54da7` on `main` (CBD-94 set merged by PR #43 at `4ff751a`) |
| Method | Machine expansion of every identifier range plus independent re-execution of the ten audit obligations in traceability §12.2 |
| Last updated | August 16, 2026 |

## 1. Scope and method

This record is an independent re-execution of the audit that traceability
§12.2 reports as **Pass**. Every numeric range in the three documents was
expanded programmatically and each relation that the set states more than once
was diffed rather than read, because the CBD-9x registers restate the same
relation two to four times in different sections.

Findings continue the `RV-94-*` sequence used by traceability §13, which ends
at `RV-94-010`. Severity reflects the effect on release gating and on the
bidirectional audit that `ME-94-015` requires, not document tidiness.

## 2. Findings

| ID | Severity | Finding | Status |
| --- | --- | --- | --- |
| RV-94-011 | **High** | The §3.4 mandatory Critical override is never applied to authentication. | Closed in risk register v0.1.4 — scoped override on `TH-92-001/002/004` |
| RV-94-012 | **Medium** | `FX-94-001–010` is orphaned from the traceability graph. | Closed in verification inventory v0.1.4 — suite-level fixture binding |
| RV-94-013 | **Medium** | `VT-94-217` is classified automated while its own text delegates the deciding judgment to a reviewer. | Closed in verification inventory v0.1.3 |
| RV-94-014 | **Medium** | `RG-94-006` is placed in two mutually exclusive gate-scope classes. | Closed in traceability record v0.1.3 |
| RV-94-015 | **Low** | 54 risk→requirement edges are one-directional. | Closed in risk register v0.1.4 — §3.7 dependency/ownership rule |
| RV-94-016 | **Low** | Two stale `v0.1.1` self-references survive in the v0.1.2 register. | Closed in risk register v0.1.3 |
| RV-94-017 | **Cosmetic** | One verification suite restates a requirement sub-range redundantly. | Closed in verification inventory v0.1.3 |

### RV-94-011 — the mandatory Critical override is never applied to authentication (High)

Register §3.4 states two mandatory overrides. The second names three
independent triggers:

> terminal deletion corruption, unrecoverable authority resurrection, or
> systemic authentication compromise is **Critical**.

The first two triggers are applied. Register §4 marks `TH-92-032/033/044`
**Critical by override** inside `RK-94-010`, and §4.1 justifies it explicitly.
The third trigger is applied nowhere in the document set.

`RK-94-001` is the authentication family. It carries `TH-92-001–004`, its risk
statement covers forged, replayed, stolen, stale, and misbound authentication,
recovery, session, and assurance requests, and its §4.1 impact rationale states
that wrong-subject authority can "persist through sessions, and cause systemic
compromise". It is nevertheless rated 3/5/**15 High**, is listed in the §4.2
`High / 15` band, and records no override.

This is the same structural situation as `RK-94-010`: a family whose ordinary
computed score is 15 but that contains sources meeting an override trigger.
`RK-94-010` receives a scoped source-level override; `RK-94-001` does not.

The consequence is not cosmetic. §3.8 gives a Critical finding same-business-day
triage and immediate stop-ship of the affected surface, against two business
days for a High finding. §3.6 assigns Critical security/authentication residuals
to the Product Owner after a written accountable-security recommendation, and
adds the `RG-94-015` independent review before public launch.

**Corroborating evidence from the frozen source.** CBD-92's own
`Exposure / impact / confidence / initial` triage column rates these four
threats independently:

| Source | CBD-92 initial triage | CBD-94 `RK-94-001` as drafted |
| --- | --- | --- |
| `TH-92-001` authentication/recovery result forged, misbound, or accepted for the wrong subject | Conditional / Critical / Low / **Critical** | High (15) |
| `TH-92-002` stolen/fixed/replayed session usable after logout, recovery, revocation, or account switch | **Broad** / Critical / High / **Critical** | High (15) |
| `TH-92-003` shared/lost/offline device, service-worker, cache, or reconnect path | Broad / High / High / **High** | High (15) |
| `TH-92-004` CSRF/origin confusion/parameter substitution under a valid session | Conditional / Critical / Medium / **Critical** | High (15) |

Three of the four were triaged Critical at source, and the one triaged High is
the one that is not authentication compromise. CBD-92 does delegate formal
rating to CBD-94, so this is not automatically an error — but it means the
finding rests on two independent lines of evidence rather than the unapplied
§3.4 trigger alone, and no downgrade rationale was recorded.

**Disposition — closed in risk register v0.1.4 by Product Owner decision.** A
scoped source-level Critical override is recorded on `TH-92-001/002/004` within
`RK-94-001`, exactly mirroring the `TH-92-032/033/044` treatment in
`RK-94-010`. The family inherent rating stays 3/5/15 High and non-overridden
`TH-92-003` stays High, matching CBD-92. §4.1 carries the rationale and §4.2
moves the overridden sources into the Critical/20 band. The change tightens
`RG-94-002` escalation to same-business-day stop-ship under §3.8; it accepts no
residual, so the §3.6 written accountable-security recommendation is still
required before any residual on those sources may be accepted.

### RV-94-012 — `FX-94-001–010` is orphaned from the traceability graph (Medium)

Inventory §4 defines ten "required reusable fixture families". Inventory §3
makes **Fixture** a mandatory field of every `VT`, `ME`, `SRV`, and `MON`
evidence record, and §4.1 defines coverage completeness in terms of "every
listed fixture variant".

No `FX-94-*` identifier is cited anywhere in the three documents outside its own
defining table. No verification case, evidence package, specialist review, or
monitor names the fixture family it requires.

The gap is invisible to the mandated audit because `FX-94` is also missing from
the two places that enumerate the tracked sets:

* traceability §12.1 lists `DI/DF/TH/RF/AB/SG/EG-91/EG-93/RI/RK/SR/VT/ME/SRV/PR/MON/RG` and omits `FX`; and
* `RV-94-005` counts 315 verification identifiers as `270 VT + 15 ME + 15 SRV + 5 PR + 10 MON`, again excluding `FX`.

So the bidirectional graph required by `ME-94-015` cannot detect that no case
binds a fixture, and §4.1's coverage-combination rules have no per-case anchor.

**Disposition — closed in verification inventory v0.1.4 and traceability
v0.1.4.** A Fixtures column was added to the 21 suite rows in inventory §5,
binding all ten families so every case inherits a fixture route. The column is
explicitly a minimum, and §3 still requires each individual evidence record to
name its exact fixture, variants, and preconditions. `FX-94` is now a tracked
set in traceability §12.1, is counted in `RV-94-005` (which rises from 315 to
325), and new audit obligation 12 checks the binding in both directions.

### RV-94-013 — `VT-94-217` is misclassified as automated (Medium)

Inventory §5 fixes execution class exhaustively. Class `M` is "automated
behavior/absence assertions plus the mapped `ME/SRV` copy, accessibility,
safety, residual, or comprehension judgment"; class `A` is "every other
`VT-94-*` case", whose result runs "without human judgment as the deciding
assertion".

The declared `M` set is
`VT-94-164/166/187–193/199–200/219–232/235/247–250/255–262/266–267/269`.

`VT-94-217` is not in it, yet its §6.7 text reads: "Shut-out support uses the
Product Owner-approved `PR-94-004` response version, discloses no other-member
fact, and cannot transfer authority; **`SRV-94-014` decides copy meaning**."

Fifteen cases in §6 delegate a decision to a named `ME`/`SRV` reviewer.
Fourteen are classified `M`. `VT-94-217` is the sole exception, so this reads as
an omission from the `M` list rather than a deliberate classification.

The case matters: it is the shut-out-subject support response reached through
`RK-94-015` and `RI-93-017`, where §3 already warns that "automation cannot
decide whether language is accessible, comprehensible, non-coercive, or
survivor-safe".

**Disposition — closed in verification inventory v0.1.3.** `VT-94-217` added to
the `M` set, which is now 42 cases.

### RV-94-014 — `RG-94-006` occupies two mutually exclusive gate classes (Medium)

Traceability §10.2 partitions the sixteen release gates into five scope
classes. `RG-94-006` appears in two of them:

| Gate class | Listed gates | Stated scope rule |
| --- | --- | --- |
| Whole authenticated/protected Private MVP | `RG-94-002–003`, **`RG-94-006`** | "Blocks broad Private-MVP implementation/launch because authority and topology are foundational" |
| Feature/provider/channel | **`RG-94-004–011`** | "Blocks synchronized financial data, workers/bounded surfaces, individual channels, exports, operations/recovery, lifecycle claims, or comments exactly as stated" |

Every other gate is classified exactly once. The two rules give the
secrets/topology gate different blocked scope — broad Private-MVP launch versus
only the named feature surfaces — and register §7 adds a third formulation for
the same gate, "Provider and production deployment". Register §7 also warns that
"no gate is implied to block more scope than the table states", which this
double placement defeats.

**Disposition — closed in traceability record v0.1.3.** The feature class now
reads `RG-94-004–005`, `RG-94-007–011`, leaving `RG-94-006` solely in the
foundational class, which its own rationale — "authority and topology are
foundational" — already supported. New audit obligation 11 checks the partition.

### RV-94-015 — 54 risk→requirement edges are one-directional (Low)

Register §2 defines range notation strictly: "An identifier range is shorthand
for every individual stable ID in the range." Applying that rule, the §4
mitigation column and the §6 `Principal risk/source` column disagree in one
direction for **54 pairs, across 10 risks, touching 46 distinct requirements**:

| Risk | Requirements claimed in §4 whose §6 row never names that risk |
| --- | --- |
| RK-94-009 | `SR-94-072–074` |
| RK-94-011 | `SR-94-089` |
| RK-94-012 | `SR-94-098–100` |
| RK-94-013 | `SR-94-047–050` |
| RK-94-015 | `SR-94-116–118` |
| RK-94-016 | `SR-94-056–060/062/077/079–084` |
| RK-94-017 | `SR-94-017/019/021` |
| RK-94-019 | `SR-94-064/066–072/074` |
| RK-94-020 | `SR-94-063–066/073` |
| RK-94-021 | `SR-94-090/092/094–101` |

The reverse direction is deliberate and documented: §3.7 lets a requirement cite
several risks with only the first accountable. What is undocumented is the
forward direction, where a risk's mitigation set sweeps in requirements owned by
another family. A reader applying §2's range rule literally concludes that
`RK-94-009` must deliver `SR-94-072–074`, which §3.7 assigns to `RK-94-020`,
`RK-94-012/019`, and `RK-94-014/015/020` respectively.

No correctness defect follows — §3.7 makes §6 controlling for ownership, and the
verification pairing is sound (every requirement a risk names is carried by a
`VT` suite that risk also names, with zero exceptions). But `ME-94-015` requires
a *bidirectional* graph, and these 54 edges fail it.

**Disposition — closed in risk register v0.1.4 by Product Owner decision.**
§3.7 now states that the §4 requirement column is the dependency set and the §6
`Principal risk/source` column is the ownership set, that the two are
deliberately not symmetric, that §6 controls ownership while §4 controls
release-effect dependency, and that an audit MUST treat a §4-only edge as a
dependency edge rather than a traceability defect. No requirement row was
edited, so the `Principal risk` column keeps its intended meaning.

### RV-94-016 — stale `v0.1.1` self-references in the v0.1.2 register (Low)

Two normative passages in the v0.1.2 register still scope themselves to v0.1.1:

* §3.6: "No residual in this **v0.1.1** draft is newly accepted."
* §4: "are **Unscored — evidence pending** for all `RK-94-001–021` at **v0.1.1** because…"

Both statements remain true of v0.1.2, so the effect is confined to the version
label. A reader checking whether the no-new-acceptance rule still binds the
current draft cannot tell from the text.

**Disposition.** Corrected in register v0.1.3 by making both passages
version-agnostic rather than pinning them to a version number, so the defect
cannot recur at the next bump instead of merely resetting to the current number.
The v1.0 promotion carried the same treatment through §1 and §7.

### RV-94-017 — redundant sub-range in one suite row (Cosmetic)

Inventory §5 gives `VT-94-054–068` the requirements "`SR-94-031–038`,
`SR-94-035–036`". `SR-94-035` and `SR-94-036` are already inside `SR-94-031–038`.

## 3. Audit obligations independently re-verified as passing

The ten obligations in traceability §12.2 were re-executed. Everything below
passed independently, and the mechanical portion of the §12.2 **Pass** claim is
confirmed.

| Check | Result |
| --- | --- |
| Frozen Git blobs (§12.2 obligation 7) | All four hashes resolve exactly at `be20177` and are unchanged at `cb54da7` |
| Declared identifier sets (obligation 1) | `RK 21`, `SR 147`, `VT 270`, `ME 15`, `SRV 15`, `PR 5`, `MON 10`, `RG 16` — each contiguous, correctly counted, no interior gaps |
| Dangling references | Zero: every `RK/SR/VT/ME/SRV/MON/PR/RG/FX` id cited anywhere is defined |
| Source-set existence | All `DI-91` 76, `DF-91` 13, `EG-91` 24, `TH-92` 45, `RF-92` 12, `AB-93` 86, `SG-93` 97, `EG-93` 10, `RI-93` 19 exist in the frozen sources; nothing cited is absent |
| CBD-92 baseline sizes (register §2) | 17 trust boundaries, 15 entry points, 45 threats, 12 review findings all verified against the source |
| Terminal source routing (obligation 2) | `TH-92` and `AB-93` sets agree across all four statements — register §4, register §5.1/5.2, traceability §4/§5.1, and the §5.3 ledger — with each source appearing exactly once, no duplicates, no omissions |
| Declared per-risk counts | Every count in traceability §4 and §5.1 matches its expanded id list |
| `SG-93` readiness (obligation 3) | All six classes match CBD-93 §6.14 **id for id**; 96 active; retired `SG-93-020` absent from every class |
| Risk completeness (obligation 4) | All 21 families carry source, owner, phase, verification, disposition, and release effect |
| Owner singularity | 21/21 have exactly one `Accountable:` function; no plus-separated shared accountability |
| Requirement→evidence (obligation 5) | All 147 requirements have a `VT` route in both inventory §5 and §10, with zero disjoint pairings between the two statements |
| Risk→verification coverage | Every requirement a risk names is carried by a `VT` suite that risk also names — zero uncovered |
| Gate mapping (obligation 6) | All 16 gates are cited by at least one `VT`/`ME`/`SRV` evidence row; gate ownership in register §7 covers `RG-94-001–016` exactly once |
| Scores against §3 formulas (obligation 10) | All 21 `L × I = score` products and priority bands are arithmetically correct; §4.2's four bands account for all 21 families including the split treatment of `RK-94-010`; no residual score is assigned anywhere |
| Requirement-type partition | 28 explicitly typed requirements across four types, non-overlapping, remainder correctly falls to the catch-all |
| Route uniqueness | `EG-91` 24, `RF-92` 12, `EG-93` 10, `RI-93` 19 — each appears exactly once in its route table |
| Residual accounting | Exactly 13 `Material inherited residual` ledger rows, matching the claimed 13 accepted-residual scenario rows over 12 CBD-93 register entries |
| Unsupported-claim scan (obligation 9) | Clean — no assertive use of safe, secure, private, anonymous, erased, deleted everywhere, real-time, or guarantee |
| Disposition inventory | Register §4 and traceability §10.1 agree on all 21; Blocking 11, Transferred 7, Evidence pending 3, and zero Accepted/Deferred/Resolved |

## 4. Process observation

The CBD-94 set was merged to `main` by PR #43 while two boxes in traceability
§14 remain unchecked: "Product Owner decides whether the draft may be approved"
and "Approved repository change is merged to `main` before Confluence sync." The
merge therefore preceded the approval its own checklist sequences first.

Nothing in the merged content asserts approval — every document still reads
**Draft** — so this is a workflow-ordering note, not a content defect. It does
mean the repository-first convention now permits Confluence publication of a set
whose Product Owner approval gate is still open, so the publication step should
wait for that decision.

## 5. Limitations

This review covers the internal consistency, identifier integrity, and
self-declared audit obligations of the three CBD-94 documents against their
frozen CBD-91/92/93 sources. It does not assess whether the risk ratings are
correct as security judgments, whether the mitigation set is sufficient, or
whether any specialist, legal, provider, or accessibility conclusion is sound.
It is not an independent security review and does not satisfy `RG-94-015`.

## 6. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0 | August 16, 2026 | Alexander Wohlford as Product Owner, Claude assisting | **Accepted as part of the approved CBD-94 v1.0 set.** Findings and dispositions unchanged; only status, version, and the disposition note were edited. The §4 process observation is retained as the historical record of the v0.1.2 merge ordering and is not a defect in the approved set. | **Product Owner accepted** |
| 0.1.2 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded Product Owner dispositions closing `RV-94-011`, `RV-94-012`, and `RV-94-015` in the v0.1.4 document set. Added CBD-92's frozen initial-triage evidence to `RV-94-011`, which independently rated `TH-92-001/002/004` Critical and `TH-92-003` High. All seven findings are now closed. | Dispositions recorded; the reviewed set remains draft pending Product Owner document approval |
| 0.1.1 | August 16, 2026 | Claude | Recorded disposition after folding the findings into traceability §13. `RV-94-013/014/016/017` corrected in the v0.1.3 document set; `RV-94-011/012/015` remain open with named closure routes. | Review record updated; open findings unchanged |
| 0.1.0 | August 16, 2026 | Claude | Independent exhaustive review of the CBD-94 v0.1.2 set; seven findings recorded as `RV-94-011–017`; nineteen audit obligations re-verified as passing. | Draft for Product Owner review; no CBD-94 document was modified |
