# CBD-94 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Draft — substantive review corrections incorporated; Product Owner document approval pending** |
| Document version | 0.1.2 |
| Owner | Alexander Wohlford |
| Jira | [CBD-94](https://cobudget.atlassian.net/browse/CBD-94) |
| Primary evidence | `docs/cbd-94-risk-mitigation-requirement-register.md` v0.1.2 |
| Verification evidence | `docs/cbd-94-verification-review-inventory.md` v0.1.2 |
| Repository baseline | `be20177` on `main` |
| Last updated | August 16, 2026 |

## 1. Purpose and completion rule

This record demonstrates how every CBD-94 Jira deliverable and acceptance
criterion is addressed, proves terminal routing for the CBD-91/92/93 source
identifiers consumed by CBD-94, records contradictions and downstream update
targets without editing them out of scope, and defines the checks required
before Product Owner approval.

The companion documents are drafts. “Complete” below means the draft contains
the required definition/route; it does not mean implementation evidence exists,
a risk is accepted, a specialist gap is closed, a dependent feature is
release-ready, or CBD-94 is approved.

Live Jira was re-read on August 16, 2026 immediately before this record was
drafted. CBD-92 and CBD-93 are **Done**; CBD-94 and CBD-95 are **Ready**; CBD-14
is **In Progress**. CBD-94 is assigned to Alexander Wohlford, due August 19,
2026, consumes CBD-92/93, and blocks CBD-95. Jira remains authoritative for
mutable issue state.

## 2. Deliverable traceability

| CBD-94 deliverable | Evidence | Draft assessment |
| --- | --- | --- |
| Prioritized risk register | Risk register §§3–5 | Complete structure: 21 formal risk families, reproducible scales/overrides, complete rating rationales, source/family precedence, exact workstream and source dispositions, release effects, singular accountable owners/phases, and source routes |
| Mitigation and residual-risk decision record | Risk register §§4–5 | Complete structure: existing/required controls, terminal routes, acceptance authority, no newly accepted residuals, and explicit pending evidence/decision state |
| Security/privacy requirement catalog | Risk register §6 | Complete structure: `SR-94-001–147` across every Jira-named domain and CBD-93 human-safety concern, including v1.1 joint-projection consent/dissolution |
| Negative-test and review inventory | Verification inventory §§2–12 | Complete structure: `VT-94-001–270`, `ME-94-001–015`, `SRV-94-001–015`, `PR-94-001–005`, `MON-94-001–010`, fixtures, execution classes, evidence schema, release mapping, and limitations |
| Architecture/roadmap/Jira update list | Risk register §8; this record §11 | Complete draft list; no out-of-scope repository, Jira, or Confluence update was applied |

## 3. Acceptance-criteria traceability

Jira lists six criteria in the order below. The identifiers here are local
traceability labels; they do not create Jira fields.

| Criterion | Authoritative criterion | Evidence | Draft assessment |
| --- | --- | --- | --- |
| CBD-94-AC01 | Every material CBD-92 and CBD-93 finding has a complete risk row and disposition. | Risk register §§3.7, 4–5; this record §§4–5 | Met for the provider-independent baseline: every `TH-92-001–045` and `AB-93-001–086` has exactly one source route; source materiality/terminal disposition controls; material rows inherit a reviewed rating/owner/phase/mitigation/evidence route; control-positive rows are mandatory fixtures and explicitly unrated. |
| CBD-94-AC02 | Blocking, accepted, deferred, transferred, and evidence-pending risks are distinct. | Risk register §§3.5, 3.7 and §4 | Met: source terminal dispositions and family workstream dispositions have mutually exclusive meanings and deterministic precedence. No row is newly `Accepted` or `Deferred` without the required authority/follow-up evidence. |
| CBD-94-AC03 | Every required mitigation has an owner, phase, and verification method. | Risk register §§3.7, 4, 6; verification inventory §§3–11 | Met for the provider-independent baseline: every family has exactly one accountable function, contributors are separate, the first cited risk controls multi-risk requirements, and each requirement maps to implementation/manual/specialist evidence and monitoring where applicable. Jira implementation assignees remain follow-up state, not ambiguous document ownership. |
| CBD-94-AC04 | Requirements preserve authoritative CBD-11 outcomes and identify any genuine material conflict for Product Owner review. | Risk register §§1, 6.4, 6.10–6.12, §8; this record §9 | Met: schedule/reconciliation and alert semantics are preserved; no money-control escalation is permitted; candidate product behavior remains guarded and transferred to its exact CBD-12/73/74/75 route. Material product-plan/architecture inconsistencies are isolated as update targets. |
| CBD-94-AC05 | No risk is marked resolved solely because UI controls hide the affected action or data. | Risk register §§3.5, 6.2; verification `VT-94-018/025–035` | Met by rule: `Resolved` requires causal elimination and verification; direct API, object substitution, differential field/shape/count/timing, stale/race, queue, provider, and operational bypass tests are mandatory. No draft risk is `Resolved`. |
| CBD-94-AC06 | Private-MVP release gates are explicit. | Risk register §7; verification inventory §§7–11 | Met: 16 gates state exact evidence and blocked scope. Feature/provider/channel, process, jurisdiction, Private-MVP, and public-launch effects are distinct; `RG-94-015` preserves the approved public-launch-only independent-security policy and creates no Private-MVP penetration-test requirement. |

## 4. CBD-92 technical-finding coverage

| Risk | CBD-92 findings | Count | Family-workstream disposition |
| --- | --- | --- | --- |
| RK-94-001 | `TH-92-001–004` | 4 | Blocking |
| RK-94-002 | `TH-92-005–007` | 3 | Blocking |
| RK-94-003 | `TH-92-008–013`, `TH-92-017–018` | 8 | Blocking |
| RK-94-004 | `TH-92-014`, `TH-92-019`, `TH-92-035–037` | 5 | Blocking |
| RK-94-005 | `TH-92-015`, `TH-92-023`, `TH-92-034`, `TH-92-038–040` | 6 | Blocking |
| RK-94-006 | `TH-92-016` | 1 | Blocking |
| RK-94-007 | `TH-92-020–022`, `TH-92-041` | 4 | Transferred with per-channel block |
| RK-94-008 | `TH-92-024–026` | 3 | Blocking |
| RK-94-009 | `TH-92-027–030`, `TH-92-042` | 5 | Blocking |
| RK-94-010 | `TH-92-031–033`, `TH-92-043–045` | 6 | Blocking |
| **Total** | `TH-92-001–045` | **45** | Complete source routing |

No technical threat appears in more than one terminal source set. Shared
mitigations and tests may cite several risks without changing terminal source
ownership.

## 5. CBD-93 scenario and safeguard coverage

### 5.1 Scenario routes

| Risk | CBD-93 scenarios | Count | Treatment |
| --- | --- | --- | --- |
| RK-94-004 | `AB-93-084` | 1 | Normal joint-association control fixture routed to the financial-provider/provenance family |
| RK-94-011 | `AB-93-001–010`, `AB-93-085` | 11 | Coercion/consent/role-acquisition/joint-association risk and positive/negative fixtures; product candidates transferred |
| RK-94-012 | `AB-93-011–022` | 12 | Role visibility/monitoring risk; normal cases are control-positive evidence |
| RK-94-013 | `AB-93-023–032` | 10 | Channel/shared-device/suppression/timing risk; specialist/channel decisions transferred |
| RK-94-014 | `AB-93-033–038` | 6 | Shame/pressure/acknowledgement/comment risk; comments blocked |
| RK-94-015 | `AB-93-039–048`, `AB-93-086` | 11 | Removal/role/lifecycle/lockout and joint-projection-dissolution risk; candidates transferred |
| RK-94-016 | `AB-93-049–054` | 6 | Stale access/former member/copy-custody risk |
| RK-94-017 | `AB-93-055–062` | 8 | Inference/existence/timing risk and residuals |
| RK-94-018 | `AB-93-063–066` | 4 | Cross-space/re-contact risk; candidates transferred |
| RK-94-019 | `AB-93-067–070` | 4 | Audit/history surveillance/asymmetry risk |
| RK-94-020 | `AB-93-071–074`, `AB-93-081` | 5 | Malicious/mistaken/normal operations risk and controls |
| RK-94-021 | `AB-93-075–080`, `AB-93-082–083` | 8 | Healthy/mistaken onboarding/export/departure/archive/personal-account-deletion fixtures |
| **Total** | `AB-93-001–086` | **86** | Complete source routing |

CBD-93 has 70 `Modelled`, 13 `Accepted residual`, one `Closed by decision`, one
`Referred to CBD-12`, and one `Referred to CBD-73` scenario row. Those CBD-93
labels are preserved as source meaning. They do not override the formal
CBD-94 source-terminal and family-workstream rules.

### 5.2 Safeguard readiness routes

| Readiness status from CBD-93 §6.14 | Exact safeguard IDs | Count | CBD-94 route | Closure rule |
| --- | --- | --- | --- | --- |
| Decided; implementation evidence pending | `SG-93-053` | 1 | Adopted through `SR-94-113` | `VT-94-109/213`, export schema/evidence |
| Proposed product decision | `SG-93-001`, `SG-93-004`, `SG-93-005`, `SG-93-011`, `SG-93-014`, `SG-93-031`, `SG-93-033`, `SG-93-037`, `SG-93-050–052`, `SG-93-056`, `SG-93-058`, `SG-93-066`, `SG-93-074`, `SG-93-075`, `SG-93-081`, `SG-93-095`, `SG-93-097` | 19 | Transferred to exact CBD-12/73/74 route; current behavior fixed | Explicit Product Owner/Jira decision and controlling-artifact merge before implementation |
| Customer-copy approval pending | `SG-93-007`, `SG-93-015`, `SG-93-021`, `SG-93-024`, `SG-93-025`, `SG-93-036`, `SG-93-039`, `SG-93-042`, `SG-93-055`, `SG-93-062`, `SG-93-071`, `SG-93-089–094`, `SG-93-096` | 18 | Evidence pending; surface block where safety/consent/custody critical | `ME-94-014`, accessibility/legal/privacy as applicable, Product Owner copy approval |
| Specialist-gated | `SG-93-017`, `SG-93-046` | 2 | Transferred; monitoring off and safety claim prohibited | Exact `EG-93-001/006` closure artifact and decision |
| Operational/security design pending | `SG-93-038`, `SG-93-080`, `SG-93-083`, `SG-93-084`, `SG-93-086–088` | 7 | Blocking affected comments/operations/recovery surface | Tool/process/evidence/exercise package |
| Baseline-derived | `SG-93-002`, `SG-93-003`, `SG-93-006`, `SG-93-008–010`, `SG-93-012`, `SG-93-013`, `SG-93-016`, `SG-93-018`, `SG-93-019`, `SG-93-022`, `SG-93-023`, `SG-93-026–030`, `SG-93-032`, `SG-93-034`, `SG-93-035`, `SG-93-040`, `SG-93-041`, `SG-93-043–045`, `SG-93-047–049`, `SG-93-054`, `SG-93-057`, `SG-93-059–061`, `SG-93-063–065`, `SG-93-067–070`, `SG-93-072`, `SG-93-073`, `SG-93-076–079`, `SG-93-082`, `SG-93-085` | 49 | Adopted through `SR-94-*`; evidence pending | Applicable `VT/ME/SRV` and release gate |
| **Active total** | `SG-93-001–097` excluding retired `SG-93-020` | **96** | Complete readiness routing | `SG-93-020` remains retired tombstone |

The 19 proposed decisions are `SG-93-001`, `004`, `005`, `011`, `014`, `031`,
`033`, `037`, `050–052`, `056`, `058`, `066`, `074`, `075`, `081`, `095`,
and `097`.
This record intentionally does not decide them.

### 5.3 Individual source-finding disposition ledger

A complete CBD-94 source row is the join of: (1) the original CBD-92 or
CBD-93 source row, which remains authoritative for actor, condition, affected
people/assets, governing inputs, and source safeguards; (2) the individual
terminal route below; and (3) the referenced complete `RK-94-*` row, which
supplies formal rating, controls, owner, phase, requirements, residual state,
and release effect under risk-register §3.7 precedence. The individual terminal
disposition controls when it differs from the family workstream disposition.
Control-positive rows are fixtures only and inherit no rating or acceptance
obligation. This normalized join prevents aggregation from erasing a
source-specific actor, harm, or disposition.

| Source finding | Materiality | Complete risk row | Individual terminal disposition | Verification route |
| --- | --- | --- | --- | --- |
| TH-92-001 | Material technical threat | RK-94-001 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-001–008` |
| TH-92-002 | Material technical threat | RK-94-001 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-001–008` |
| TH-92-003 | Material technical threat | RK-94-001 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-001–008` |
| TH-92-004 | Material technical threat | RK-94-001 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-001–008` |
| TH-92-005 | Material technical threat | RK-94-002 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-009–017` |
| TH-92-006 | Material technical threat | RK-94-002 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-009–017` |
| TH-92-007 | Material technical threat | RK-94-002 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-009–017` |
| TH-92-008 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-009 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-010 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-011 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-012 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-013 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-014 | Material technical threat | RK-94-004 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-036–053` |
| TH-92-015 | Material technical threat | RK-94-005 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-054–068` |
| TH-92-016 | Material technical threat | RK-94-006 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-069–076` |
| TH-92-017 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-018 | Material technical threat | RK-94-003 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-018–035` |
| TH-92-019 | Material technical threat | RK-94-004 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-036–053` |
| TH-92-020 | Material technical threat | RK-94-007 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096` |
| TH-92-021 | Material technical threat | RK-94-007 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096` |
| TH-92-022 | Material technical threat | RK-94-007 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096` |
| TH-92-023 | Material technical threat | RK-94-005 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-054–068` |
| TH-92-024 | Material technical threat | RK-94-008 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-097–111` |
| TH-92-025 | Material technical threat | RK-94-008 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-097–111` |
| TH-92-026 | Material technical threat | RK-94-008 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-097–111` |
| TH-92-027 | Material technical threat | RK-94-009 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132` |
| TH-92-028 | Material technical threat | RK-94-009 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132` |
| TH-92-029 | Material technical threat | RK-94-009 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132` |
| TH-92-030 | Material technical threat | RK-94-009 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132` |
| TH-92-031 | Material technical threat | RK-94-010 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-133–153` |
| TH-92-032 | Material technical threat | RK-94-010 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-133–153` |
| TH-92-033 | Material technical threat | RK-94-010 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-133–153` |
| TH-92-034 | Material technical threat | RK-94-005 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-054–068` |
| TH-92-035 | Material technical threat | RK-94-004 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-036–053` |
| TH-92-036 | Material technical threat | RK-94-004 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-036–053` |
| TH-92-037 | Material technical threat | RK-94-004 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-036–053` |
| TH-92-038 | Material technical threat | RK-94-005 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-054–068` |
| TH-92-039 | Material technical threat | RK-94-005 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-054–068` |
| TH-92-040 | Material technical threat | RK-94-005 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-054–068` |
| TH-92-041 | Material technical threat | RK-94-007 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096` |
| TH-92-042 | Material technical threat | RK-94-009 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132` |
| TH-92-043 | Material technical threat | RK-94-010 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-133–153` |
| TH-92-044 | Material technical threat | RK-94-010 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-133–153` |
| TH-92-045 | Material technical threat | RK-94-010 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-133–153` |
| AB-93-001 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-002 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-003 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-004 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-005 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-006 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-007 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-008 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-009 | Material human-abuse/privacy finding | RK-94-011 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-154–166` |
| AB-93-010 | Material invitation decision | RK-94-011 | Transferred to CBD-73 through `RI-93-009`; current behavior remains | `VT-94-154–166` |
| AB-93-011 | Control-positive normal scenario | RK-94-012 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-167–180` |
| AB-93-012 | Control-positive normal scenario | RK-94-012 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-167–180` |
| AB-93-013 | Control-positive normal scenario | RK-94-012 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-167–180` |
| AB-93-014 | Control-positive normal scenario | RK-94-012 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-167–180` |
| AB-93-015 | Control-positive normal scenario | RK-94-012 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-167–180` |
| AB-93-016 | Material human-abuse/privacy finding | RK-94-012 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-167–180` |
| AB-93-017 | Material inherited residual | RK-94-012 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-167–180` |
| AB-93-018 | Material human-abuse/privacy finding | RK-94-012 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-167–180` |
| AB-93-019 | Control-positive normal scenario | RK-94-012 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-167–180` |
| AB-93-020 | Material inherited residual | RK-94-012 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-167–180` |
| AB-93-021 | Material human-abuse/privacy finding | RK-94-012 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-167–180` |
| AB-93-022 | Material human-abuse/privacy finding | RK-94-012 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-167–180` |
| AB-93-023 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-024 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-025 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-026 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-027 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-028 | Material inherited residual | RK-94-013 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-029 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-030 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-031 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-032 | Material human-abuse/privacy finding | RK-94-013 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-077–096`, `VT-94-181–187` |
| AB-93-033 | Material human-abuse/privacy finding | RK-94-014 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-188–200` |
| AB-93-034 | Material human-abuse/privacy finding | RK-94-014 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-188–200` |
| AB-93-035 | Material human-abuse/privacy finding | RK-94-014 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-188–200` |
| AB-93-036 | Material inherited residual | RK-94-014 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-188–200` |
| AB-93-037 | Material human-abuse/privacy finding | RK-94-014 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-188–200` |
| AB-93-038 | Material human-abuse/privacy finding | RK-94-014 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-188–200` |
| AB-93-039 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-040 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-041 | Material decision implemented in the controlling specification | RK-94-015 | Evidence pending; decision is authoritative but implementation/verification remains open | `VT-94-201–218` |
| AB-93-042 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-043 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-044 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-045 | Material inherited residual | RK-94-015 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-201–218` |
| AB-93-046 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-047 | Material inherited residual | RK-94-015 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-201–218` |
| AB-93-048 | Material human-abuse/privacy finding | RK-94-015 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-201–218` |
| AB-93-049 | Material human-abuse/privacy finding | RK-94-016 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-219–224` |
| AB-93-050 | Material inherited residual | RK-94-016 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-219–224` |
| AB-93-051 | Material human-abuse/privacy finding | RK-94-016 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-219–224` |
| AB-93-052 | Material product decision | RK-94-016 | Transferred to CBD-12 through `RI-93-018`; current behavior remains | `VT-94-219–224` |
| AB-93-053 | Material human-abuse/privacy finding | RK-94-016 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-219–224` |
| AB-93-054 | Material human-abuse/privacy finding | RK-94-016 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-219–224` |
| AB-93-055 | Material human-abuse/privacy finding | RK-94-017 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-225–235` |
| AB-93-056 | Material inherited residual | RK-94-017 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-225–235` |
| AB-93-057 | Material human-abuse/privacy finding | RK-94-017 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-225–235` |
| AB-93-058 | Material human-abuse/privacy finding | RK-94-017 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-225–235` |
| AB-93-059 | Material inherited residual | RK-94-017 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-225–235` |
| AB-93-060 | Material inherited residual | RK-94-017 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-225–235` |
| AB-93-061 | Material human-abuse/privacy finding | RK-94-017 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-225–235` |
| AB-93-062 | Material human-abuse/privacy finding | RK-94-017 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-225–235` |
| AB-93-063 | Material inherited residual | RK-94-018 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-236–246` |
| AB-93-064 | Material human-abuse/privacy finding | RK-94-018 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-236–246` |
| AB-93-065 | Material human-abuse/privacy finding | RK-94-018 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-236–246` |
| AB-93-066 | Material human-abuse/privacy finding | RK-94-018 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-236–246` |
| AB-93-067 | Material inherited residual | RK-94-019 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending | `VT-94-247–254` |
| AB-93-068 | Material human-abuse/privacy finding | RK-94-019 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-247–254` |
| AB-93-069 | Material human-abuse/privacy finding | RK-94-019 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-247–254` |
| AB-93-070 | Material human-abuse/privacy finding | RK-94-019 | Transferred; residual unscored pending complete mitigation evidence | `VT-94-247–254` |
| AB-93-071 | Material human-abuse/privacy finding | RK-94-020 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132`, `VT-94-255–263` |
| AB-93-072 | Material human-abuse/privacy finding | RK-94-020 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132`, `VT-94-255–263` |
| AB-93-073 | Material human-abuse/privacy finding | RK-94-020 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132`, `VT-94-255–263` |
| AB-93-074 | Material human-abuse/privacy finding | RK-94-020 | Blocking; residual unscored pending complete mitigation evidence | `VT-94-112–132`, `VT-94-255–263` |
| AB-93-075 | Control-positive normal scenario | RK-94-021 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-255–263` |
| AB-93-076 | Material human-abuse/privacy finding | RK-94-021 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-255–263` |
| AB-93-077 | Control-positive normal scenario | RK-94-021 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-255–263` |
| AB-93-078 | Material human-abuse/privacy finding | RK-94-021 | Evidence pending; residual unscored pending complete mitigation evidence | `VT-94-255–263` |
| AB-93-079 | Control-positive normal scenario | RK-94-021 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-255–263` |
| AB-93-080 | Control-positive normal scenario | RK-94-021 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-255–263` |
| AB-93-081 | Control-positive normal scenario | RK-94-020 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-112–132`, `VT-94-255–263` |
| AB-93-082 | Control-positive normal scenario | RK-94-021 | Not independently material; retained as a mandatory healthy-path/control fixture | `VT-94-255–263` |
| AB-93-083 | Control-positive normal scenario | RK-94-021 | Not independently material; retained as the mandatory healthy personal-account-deletion/restoration fixture | `VT-94-133–153/264` |
| AB-93-084 | Control-positive normal scenario | RK-94-004 | Not independently material; retained as the mandatory healthy joint-association/provenance fixture | `VT-94-036–053/265/268–269` |
| AB-93-085 | Material human-abuse/privacy finding | RK-94-011 | Transferred; current `CA-92-010/011` behavior remains, residual unscored pending complete mitigation and copy/safety evidence | `VT-94-266/268–269` |
| AB-93-086 | Material inherited residual | RK-94-015 | Evidence pending; CBD-93 residual label preserved and formal CBD-94 acceptance pending; current `CA-92-011` remains controlling | `VT-94-267/270` |

The ledger contains 131 rows: all 45 technical threats and all 86 human
scenarios. Each source appears exactly once. “Not independently material” is
limited to normal control-positive scenarios and does not remove their required
verification fixture.


## 6. CBD-91 evidence-gap routes

| Gap | CBD-94 risk/requirement route | Evidence/decision owner route | Release effect |
| --- | --- | --- | --- |
| EG-91-001 | RK-94-010/016; `SR-94-075–084` | Data lifecycle + legal/privacy + provider evidence; `ME-94-012` | Terminal deletion claims/recovery |
| EG-91-002 | RK-94-015/016; `SR-94-112/115` | CBD-12 personal-account deletion and `RI-93-018` | Personal-account deletion/attribution behavior |
| EG-91-003 | RK-94-010; `SR-94-075–084/124` | Data lifecycle + CBD-95; tombstone/provider/backup evidence | Deletion completion |
| EG-91-004 | RK-94-001/002/004; `SR-94-001–011/022` | CBD-104/identity provider + security; `ME-94-007` | All authenticated/provider-link surfaces |
| EG-91-005 | RK-94-004/005; `SR-94-022–030` | CBD-107/financial provider | Synchronized financial data |
| EG-91-006 | RK-94-002/007/013; `SR-94-007–011/044–054` | CBD-106/channel providers + privacy | Each external channel/invitation delivery |
| EG-91-007 | RK-94-003; `SR-94-012–021` | Architecture/security; `ME-94-001` | Protected and background features |
| EG-91-008 | RK-94-006/010; `SR-94-039–043/080–082` | CBD-103/105 + architecture/security | Concrete control validation/production |
| EG-91-009 | RK-94-009/014/020; `SR-94-067–074` | Operations/security; `EG-93-009` for comments | Exceptional access/recovery/comments |
| EG-91-010 | RK-94-001/009; `SR-94-063–066` | Identity/hosting/security/privacy | Session evidence/security telemetry |
| EG-91-011 | RK-94-003/005/007; `SR-94-015/031–038/048` | Architecture/reliability/security; `ME-94-003` | Customer-data workers/queued delivery |
| EG-91-012 | RK-94-004; `SR-94-023–028` | CBD-107/CBD-82/provider and schema evidence | Joint-account/duplicate-import behavior |
| EG-91-013 | RK-94-004/005; `SR-94-028/035` | FF-007 + CBD-107 | Automatic pending-to-posted matching; manual/explicit behavior otherwise |
| EG-91-014 | RK-94-012/014/020; `SR-94-096–103` | Privacy decision `EG-93-004/005` | Sensitive free-text surfaces/copy |
| EG-91-015 | RK-94-005/007/013/014; `SR-94-036/044–054/104–106` | CBD-12/CBD-74 + copy/privacy | Alerts/lifecycle notifications |
| EG-91-016 | RK-94-003/017/019; `SR-94-016–021/125–129/137/139` | Architecture/security/privacy; `ME-94-004` | Search/index/report/derived data |
| EG-91-017 | RK-94-008/016; `SR-94-055–062` | Product/security/privacy; `ME-94-011` | Each export type |
| EG-91-018 | RK-94-009/019; `SR-94-063–065/136–140` | Security/privacy; `ME-94-005` | Protected workflows/audit/history |
| EG-91-019 | RK-94-009; `SR-94-066` | Product/privacy; analytics remains disabled | Any product analytics; coarse measures only under approved rule |
| EG-91-020 | RK-94-006/010; `SR-94-080–084` | CBD-105 + infrastructure/security; `ME-94-013` | Recovery/deletion completion |
| EG-91-021 | RK-94-003/004; `SR-94-014/023–028` | CBD-82/CBD-12 + architecture/provider | Canonical account model/cross-space sync |
| EG-91-022 | RK-94-004/010/015/016; `SR-94-075–083/112/123` | Jurisdiction-scoped counsel `SRV-94-001` | Private-MVP collaboration launch/final retention policy |
| EG-91-023 | RK-94-001/007/008/016; `SR-94-005/047/053/061/121–122` | Client/export/notification UX + privacy/security | Client/external channel/export custody claims |
| EG-91-024 | RK-94-007/013; `SR-94-045/049–054` | Channel provider + privacy/identity | Push/SMS release |

All 24 CBD-91 gaps remain explicit. CBD-94 does not mark any closed merely by
restating a requirement.

## 7. CBD-92 review-finding routes

| Finding | CBD-94 route | Required evidence | Release effect |
| --- | --- | --- | --- |
| RF-92-001 | RK-94-003; `SR-94-012–021`; `ME-94-001` | Typed policy/service-purpose contract, enforcement map, version invalidation, negative tests | Protected features/workers |
| RF-92-002 | RK-94-006/010; `ME-94-002` | Concrete topology, identities, regions, stores, KMS, subprocessors, observability | Concrete validation/production launch |
| RF-92-003 | RK-94-005; `SR-94-031–034`; `ME-94-003` | Per-queue producer/consumer/purpose schemas and replay/purge controls | Customer-data workers |
| RF-92-004 | RK-94-003/017; `SR-94-016–021`; `ME-94-004` | Cache/index/report technology, partition/completeness/timing/invalidation | Derived-data features |
| RF-92-005 | RK-94-009/019; `SR-94-063–066`; `ME-94-005` | Audit/history/security/reliability taxonomies, integrity/access/lifecycle/tests | Protected workflows/security telemetry |
| RF-92-006 | RK-94-004/010; `SR-94-023–028/075–084`; `ME-94-006/012` | Physical account/lifecycle schema, provider signals, final disposition, executable tests | Accounts/sync/personal deletion |
| RF-92-007 | All provider-dependent risks; `ME-94-007` | Exact provider field/event/control/contract packages | Each provider release |
| RF-92-008 | RK-94-009/010/020; `SR-94-067–072`; `ME-94-008/013` | Identities, mediated tools, duties, JIT, evidence/review/notice, rehearsal | Exceptional operations/recovery |
| RF-92-009 | RK-94-001/007/013/016; `SR-94-005/044–054/121–122`; `ME-94-009/014` | Client storage/routes, channel schemas/providers/locales/shared-device/custody tests | Client/external channels |
| RF-92-010 | RK-94-010/016; `SR-94-075–084/124`; `ME-94-012/013` | Disposition/legal/provider/deletion ledger/backup expiry/restore reconciliation | Terminal deletion claims/recovery |
| RF-92-011 | All risk routes use approved CBD-92 §6 map; source freeze and audit in this record | Product Owner-approved crossing relation at v1.0; identifier/citation audit | CBD-94 verification validity; no new product decision open |
| RF-92-012 | RK-94-002/005/008/010/018; `SR-94-011/020/037–038/060/132`; `ME-94-010` | Concrete values, safe keys, distributed counters, uniform timing, anti-lockout tests | Every bounded `RL-92-001` surface |

All 12 findings have an evidence owner route and a precisely scoped release
effect. `RF-92-011` is a closed conceptual/Product Owner decision whose
approved mapping must be preserved; implementation boundary enforcement is
still verified under the dependent risks.

## 8. CBD-93 specialist-gap and reconciliation routes

### 8.1 Specialist gaps

| Gap | Risk/requirement | Closure evidence | Release effect |
| --- | --- | --- | --- |
| EG-93-001 | RK-94-013/017; `SR-94-116–117` | `SRV-94-002` advocacy/legal comparison and Product Owner decision | Inactive-owner/lifecycle safety claim and any candidate safety channel |
| EG-93-002 | RK-94-010/013/015/016; `SR-94-075–083/111/119` | `SRV-94-001` jurisdiction-scoped counsel | Collaboration launch in unapproved jurisdictions |
| EG-93-003 | RK-94-011/013–015/021; `SR-94-091` | `SRV-94-004`, defects/retest | Each affected safety-critical surface |
| EG-93-004 | RK-94-012/014/020; `SR-94-097` | `SRV-94-005` sensitivity model and boundary tests | Sensitive label/free-text surfaces |
| EG-93-005 | All human-abuse risks; `SR-94-092/108/117` | `SRV-94-003`; assumption decision log | Any validated-safety/user-need claim |
| EG-93-006 | RK-94-012/019; `SR-94-073` | `SRV-94-006` complete monitoring package or prohibition | Read-observation monitoring remains off |
| EG-93-007 | RK-94-015; `SR-94-115` | `SRV-94-007` deterministic deletion-window decision | Candidate member objection behavior |
| EG-93-008 | RK-94-012; `SR-94-096/101` | `SRV-94-001` non-user-data assessment/minimization | Formal `AB-93-020` residual disposition/claims |
| EG-93-009 | RK-94-014/015/020; `SR-94-074/102–103` | `SRV-94-008` operating model and exercises | Comments unshippable |
| EG-93-010 | RK-94-007/013; `SR-94-051–052` | `SRV-94-009` channel/recovery architecture and scenarios | Compromised-channel retirement/recovery behavior |

### 8.2 CBD-12 reconciliation inputs

| Inputs | Topic | CBD-94 route | Current rule until decision |
| --- | --- | --- | --- |
| RI-93-001–008 | Permissions, observer removal, reversal, removal export, archived export, deletion position, self-record, comment-subject remedy | RK-94-011/012/014/015/019; `SR-94-113/115/138` | Only RI-93-005 is decided/delivered; all other candidate behaviors absent |
| RI-93-009–011 | Invitation disclosure, re-contact controls, alternate channel | RK-94-002/011/013/018/021; `SR-94-008–011/132–133/141` | Current invitation model remains; no candidate comparative disclosure, per-inviter block, persistent decline, cross-space recipient/inviter rate limit, or alternate channel is implied |
| RI-93-012–015 | Safety channel, channel retirement, alert eligibility, notice content | RK-94-007/013/017; `SR-94-044–054/111/116–117` | Current mandatory-notice/eligibility/delivery rules remain |
| RI-93-016 | Cross-cutting copy | All human risks; `SR-94-085–109/119/122/141–146` | Baseline claims only; copy requires evidence/approval |
| RI-93-017 | Hard support-transfer refusal plus safe answer | RK-94-009/015/020; `SR-94-071/114` | Refusal is binding; safe-answer copy/evidence pending |
| RI-93-018 | Personal deletion and attributed content | RK-94-015/016; `SR-94-112/115/123` | Current retention/attribution rules remain pending product/legal decision |
| RI-93-019 | Joint-projection dissolution notice/objection position | RK-94-015; `SR-94-147` | `CA-92-011` unilateral dissolution and its safe attempt/outcome notification/audit remain controlling; no additional `SG-93-097` all-contributor pre/immediate notice, objection, veto, delay, or deadlock behavior is implied before decision |

Every `RI-93-001–019` is represented. A grouped row does not merge the
independent decisions; each retains its original stable ID and accountable
route.

## 9. CBD-11 preservation and material-conflict review

### 9.1 Preserved authoritative outcomes

| CBD-11/CBD-71 outcome | CBD-94 preservation evidence |
| --- | --- |
| Deterministic, versioned schedule definitions and materialized periods | `SR-94-035` freezes rule/input/time versions and preserves provenance/history; no security rule changes cadence behavior. |
| Primary Owner/Co-owner/Collaborator may perform approved schedule/reconciliation mutations; Viewer is read-only; Accountability Partner is financially read-only with only personal acknowledgement/attributed supported comments | `SR-94-012–019`, `SR-94-090`, `SR-94-098–105` enforce exact server role/noninterference behavior. |
| Informational alerts are provisional/self-clearing/no acknowledgement; firm alerts are settled/personal acknowledgement/non-self-clearing | `SR-94-105` and `VT-94-091/196` preserve the distinction. |
| Actual-income variance fires only after confirmed nonzero date or currency-precision difference; no extra materiality threshold | The risk/rate requirements do not add a business materiality threshold; `SR-94-035/105` preserve deterministic inputs/event semantics. |
| Concurrent changes never silently overwrite confirmed state | `SR-94-019/035` and `VT-94-021/030/061–062` enforce commit-time versions/atomic replacement. |
| Accessibility requirements apply to schedule/reconciliation/alert/error/recovery interfaces | `SR-94-091`, `SRV-94-004`, and applicable mixed implementation/accessibility cases preserve the baseline. |

### 9.2 Material conflicts and discrepancies

No CBD-94 mitigation currently requires a pivot away from approved CBD-11 or
CBD-72 behavior. The following existing planning prose conflicts with the
approved baseline and is recorded for separate post-CBD-94 reconciliation:

| Artifact discrepancy | Approved/current position | Effect in CBD-94 |
| --- | --- | --- |
| Product plan uses legacy `Owner`/`guardian` and says guardian access is scoped/revocable by the subject | Current roles are Primary Owner, Co-owner, Collaborator, Viewer, Accountability Partner; Partner visibility is comprehensive/fixed and membership control belongs to approved owner roles | Do not use plan prose as authority; `SR-94-087/145`; separate product-plan update required |
| Product plan includes optional rollover in MVP | Rollover is deferred as `FF-003` | Do not reintroduce rollover; separate plan reconciliation |
| Product plan says MVP in-app/email and puts push in Product depth; architecture says in-app/email/push/SMS in MVP | CBD-12/CBD-92 define mandatory in-app and opt-in supported email/push/SMS with strict content/provider gates | Per-channel release gate controls; plan must be reconciled separately |
| Product plan early measures may imply customer-level analytics | `AN-92-*` disables product analytics/behavioral capture; only approved coarse non-drillable aggregates may be retained | `SR-94-066`; no analytics event implementation |
| Architecture says append-only audit for “guardian actions” | CBD-72/92 require distinct resource history, Primary admin history, privileged security evidence, and operational telemetry with exact audiences/fields | `SR-94-063–065/136–140`; architecture update list |
| Architecture names Plaid and concrete stack choices without the CBD-92 hypothesis caveat | Providers/deployment products remain unapproved hypotheses until CBD-15 evidence/selection | Provider-independent requirements; selected provider release blocked |

These discrepancies do not authorize edits outside CBD-94 scope. They are
inputs to the update list and CBD-95 reconciliation. If resolving one would
change the approved product rule rather than correct stale planning prose, it
requires an explicit Product Owner decision.

## 10. Disposition and release-gate review

### 10.1 Draft family-workstream disposition inventory

| Workstream disposition | Risks | Count | Review note |
| --- | --- | --- | --- |
| Blocking | RK-94-001–006, RK-94-008–010, RK-94-014, RK-94-020 | 11 | Exact blocked scope stated per row/gate; does not always block entire MVP |
| Transferred | RK-94-007, RK-94-011–013, RK-94-015, RK-94-018–019 | 7 | Current rule remains; affected release surface still blocked where named |
| Evidence pending | RK-94-016–017, RK-94-021 | 3 | No residual acceptance or release readiness claimed |
| Accepted | None | 0 | CBD-93 residual labels still await formal CBD-94 authority/evidence |
| Deferred | None | 0 | Capability exclusion must identify Jira follow-up/owner/phase before use |
| Resolved | None | 0 | No implementation or causal-elimination evidence exists |
| **Total** | RK-94-001–021 | **21** | Every family has exactly one workstream disposition; §5.3 source dispositions are controlling per source row |

### 10.2 Gate scope audit

| Gate class | Gates | Scope rule |
| --- | --- | --- |
| CBD-94/CBD-14 process | RG-94-001, RG-94-016 | Blocks CBD-94 approval/CBD-95/final CBD-14 reconciliation, not implementation by itself |
| Whole authenticated/protected Private MVP | RG-94-002–003, RG-94-006 | Blocks broad Private-MVP implementation/launch because authority and topology are foundational |
| Feature/provider/channel | RG-94-004–011 | Blocks synchronized financial data, workers/bounded surfaces, individual channels, exports, operations/recovery, lifecycle claims, or comments exactly as stated |
| Copy/specialist/jurisdiction | RG-94-012–014 | Blocks the affected surface/claim/jurisdiction; does not silently block unrelated safe features |
| Public product launch | RG-94-015 | Independent security review is mandatory before public product launch only; no Private-MVP review or penetration-test prerequisite is created |

## 11. Architecture, roadmap, and Jira follow-up register

This is a proposal list only. No Jira issue, description, comment, link,
assignment, estimate, date, priority, or status has been changed.

| Follow-up area | Source | Minimum issue/update content | MVP effect |
| --- | --- | --- | --- |
| Policy enforcement contract | RF-92-001; RK-94-003; ME-94-001 | PEP/PDP, typed inputs/output, user/service authority, purpose/effect, versions/SLO, route/worker inventory, tests | Foundational block |
| Deployment/KMS topology | RF-92-002; RK-94-006/010; ME-94-002 | Workload/network/store/key identities/boundaries, regions/subprocessors, encryption/observability | Production block |
| Queue contracts | RF-92-003; RK-94-005; ME-94-003 | One schema/authority/retry/DLQ/replay/purge contract per queue | Worker block |
| Cache/search/report design | RF-92-004; RK-94-003/017; ME-94-004 | Fields/keys/completeness/timing/TTL/invalidation/rebuild and tests | Derived-feature block |
| Audit/telemetry | RF-92-005; RK-94-009/019; ME-94-005 | Taxonomies/allowlists/integrity/audiences/lifecycle/customer views, analytics prohibition | Protected workflow block |
| Account/provider schema | RF-92-006/007; RK-94-004; ME-94-006/007 | Profile/connection/account/link/projection/association constraints, provider evidence | Sync block |
| Operational access | RF-92-008; RK-94-009/020; ME-94-008 | Identities/tools/duties/JIT/evidence/review/notice/rehearsal | Exceptional access/recovery block |
| Client/channels | RF-92-009; RK-94-001/007/013; ME-94-009 | Static-shell/storage inventory and per-channel schema/provider/copy/tests | Per-client/channel block |
| Lifecycle/deletion/recovery | RF-92-010; RK-94-010/016; ME-94-012/013 | Final disposition/legal/provider ledger, backup expiry, isolated restore/non-resurrection | Deletion/recovery block |
| Rate/resource values | RF-92-012; RK-94-002/005/008/010/018; ME-94-010 | Per-surface values, safe keys/counters, uniformity, anti-lockout/capacity basis | Bounded-surface block |
| Export design | EG-91-017; RK-94-008/016; ME-94-011 | Three schemas, storage/KMS, exact lifetime, rates, UX/custody/deletion tests | Export block |
| Copy/accessibility | CBD-93 §6.14; ME-94-014; SRV-94-004/014 | Versioned string inventory, approval, localization, accessibility, custody/safety/legal claims | Per-surface block |
| Product decisions | RI-93-001–019 | Independent decision, current rule, options/harms, exact deterministic outcome, artifact/test updates | Candidate absent until decided |
| Legal/privacy/advocacy/research | EG-91-022; EG-93-001–008/010 | Exact closure artifact, limitations, Product Owner disposition, dependent ID updates | Claim/surface/jurisdiction gate |
| Platform safety | EG-93-009 | Operating model, tools, staffing, training, escalation/appeal, evidence, exercises | Comments block |
| Independent security review | RG-94-015 | Before public launch, independently challenge diagram/boundary/STRIDE/triage/gap/mitigation/residual scope and trace accepted findings | Public product launch block only; penetration testing remains optional pending a future explicit decision |

Immediately before any proposed Jira update is applied, the current issue and
relevant subtasks, links, status, assignment, dates, and comments MUST be
fetched and reconciled. Existing valid content MUST be preserved. A follow-up
issue MUST cite its `RK/SR/VT/ME/SRV/RG`, define closure evidence, name target
phase/owner, and avoid silently adding a deferred capability to MVP.

## 12. Bidirectional identifier and coverage audit

### 12.1 Expected stable sets

| Set | Expected | Draft route |
| --- | --- | --- |
| `DI-91-*` | 76 (`001–076`) | Risk assets/source requirements; full lifecycle coverage in `SR-94-075`, `VT-94-133` |
| `DF-91-*` | 13 (`001–013`) | Preserved through CBD-92 source threats and boundary map |
| `TH-92-*` | 45 (`001–045`) | Exactly once in §4/risk register §5.1 |
| `RF-92-*` | 12 (`001–012`) | Exactly once in §7 |
| `AB-93-*` | 86 (`001–086`) | Exactly once in §5.1/risk register §5.2 |
| active `SG-93-*` | 96 (`001–097`, excluding retired `020`) | Readiness routing in §5.2; IDs remain defined in CBD-93 |
| `EG-91-*` | 24 (`001–024`) | Exactly once in §6 |
| `EG-93-*` | 10 (`001–010`) | Exactly once in §8.1 |
| `RI-93-*` | 19 (`001–019`) | Complete grouped routes in §8.2; independent meaning preserved |
| `RK-94-*` | 21 (`001–021`) | Risk register §4 and this record §10.1 |
| `SR-94-*` | 147 (`001–147`) | Risk register §6; verification inventory §10 |
| `VT-94-*` | 270 (`001–270`) | Verification inventory §§5–6 |
| `ME-94-*` | 15 (`001–015`) | Verification inventory §7 |
| `SRV-94-*` | 15 (`001–015`) | Verification inventory §8 |
| `PR-94-*` | 5 (`001–005`) | Verification inventory §4.2 |
| `MON-94-*` | 10 (`001–010`) | Verification inventory §9 |
| `RG-94-*` | 16 (`001–016`) | Risk register §7; this record §10.2; `RG-94-015` is public-launch-only |

### 12.2 Required automated document audit

Before approval, a repository audit MUST:

1. expand every numeric range and verify the expected sets/counts;
2. detect duplicate terminal `TH-92-*` and `AB-93-*` ownership;
3. detect missing or retired `SG-93-020` use as an active safeguard;
4. verify every `RK` has source, owner, phase, verification, disposition, and
   release effect;
5. verify every `SR` maps to `VT`, `ME`, or `SRV` evidence;
6. verify every release gate maps to risks, requirements, and evidence;
7. verify referenced file paths, Jira links, Confluence links, section anchors,
   versions, and frozen Git blobs;
8. compare terminology against current CBD-72 definitions and reject legacy
   alternatives except when explicitly quoting a discrepancy;
9. scan for unsupported claims including safe, secure, private, anonymous,
   erased, deleted everywhere, real-time, consent proves voluntariness, and
   review proves compliance; and
10. compare risk scores against §3 formulas/overrides and flag a residual score
    assigned without verified mitigation.

**v0.1.2 audit result — Pass (August 16, 2026).**

| Audit | Result |
| --- | --- |
| Defined sets | `RK 21`, `SR 147`, `VT 270`, `ME 15`, `SRV 15`, `PR 5`, `MON 10`, `RG 16`; each unique and contiguous |
| Source ledger | `TH 45 + AB 86 = 131`; every source appears exactly once and maps to the same family as the risk register |
| Safeguard readiness | 96 active `SG-93-*` IDs exactly once; no missing/duplicate ID; retired `SG-93-020` absent |
| Ratings/owners | 21 score formulas/bands pass; 21 rating-rationale rows present; all family rows have exactly one accountable owner and a scoped lifecycle override where required |
| Requirements/candidates | 147 normative definitions pass; type exceptions are non-overlapping; `SG-93-005/014/095/097` remain explicit guards rather than adopted behavior, and `SG-93-096` remains copy-approval gated |
| Verification | All 270 case IDs expand once; automated/mixed execution, parameter, monitor, manual and specialist routes are defined without making optional `SRV-94-011` a gate |
| Markdown/references | Table widths, headings, trailing whitespace, patch markers, placeholders, ID bounds, eight local document paths, section references, versions, and four frozen Git blobs pass |
| Release policy | Every `RG-94-015` reference is public-launch-only; no Private-MVP independent-review or penetration-test prerequisite remains |

## 13. Current findings and approval gates

| ID | Finding | Status/effect |
| --- | --- | --- |
| RV-94-001 | The focused branch was fast-forwarded to `be20177` before publication, so CBD-92 v1.0 and CBD-93 v1.1—including `AB-93-083–086`, `SG-93-096/097`, and `RI-93-019`—are frozen and consumed. | Closed baseline discrepancy |
| RV-94-002 | All 45 technical threats and 86 human scenarios have one terminal source route under deterministic source/family precedence; control-positive rows are unrated fixtures. | Passed substantive and automated source audit |
| RV-94-003 | All 96 active safeguards have a readiness route; `SG-93-020` remains retired. | Passed complete active-set and readiness-route audit |
| RV-94-004 | All 24 `EG-91`, 12 `RF-92`, 10 `EG-93`, and 19 `RI-93` items have downstream routes. | Passed route audit; live Jira state reconciled without mutation |
| RV-94-005 | The draft defines 147 requirements and 315 verification/evidence/review/parameter/monitor IDs (`270 VT + 15 ME + 15 SRV + 5 PR + 10 MON`). | Passed definition, range, duplicate, reference, and evidence-route audit |
| RV-94-006 | No formal residual risk is newly accepted; no capability is newly deferred; no product candidate is silently adopted. | Correct draft limitation; Product Owner/residual decisions pending |
| RV-94-007 | Product-plan and architecture contradictions are isolated in §9.2 and the update list, not edited outside task scope. | Correct repository-scope handling; separate changes required after approval |
| RV-94-008 | Jira and Confluence were read but not modified. | Correct repository-first behavior |
| RV-94-009 | Independent security, legal/privacy, accessibility, advocacy, research, provider, operational, and recovery evidence is absent. Penetration testing is optional pending a future explicit decision. | Explicit blockers by applicable scope; independent security blocks public launch only |
| RV-94-010 | Substantive internal review occurred on August 16, 2026 and the Product Owner decided to preserve the approved public-launch-only independent-security policy. Complete-document Product Owner approval has not occurred. | Gate-scope decision closed; document-approval gate remains open |

## 14. Completion checklist

### Draft structure

- [x] Repository baseline fast-forwarded and frozen.
- [x] Five Jira deliverables mapped.
- [x] Six Jira acceptance criteria mapped.
- [x] Formal risk method and acceptance authority defined.
- [x] All `TH-92-*` and `AB-93-*` source rows routed.
- [x] All active `SG-93-*` readiness classes routed.
- [x] All `EG-91-*`, `RF-92-*`, `EG-93-*`, and `RI-93-*` routes recorded.
- [x] Normative requirement catalog drafted.
- [x] Implementation/manual/specialist/monitoring verification inventory drafted.
- [x] Scoped Private-MVP and public-launch release gates drafted.
- [x] Architecture/product/Jira update list drafted without applying changes.

### Required before Product Owner approval

- [x] Automated range/count/duplicate/orphan/reference audit passes.
- [x] Full prose contradiction and terminology review passes.
- [x] Every risk rating, aggregation, owner, phase, family-workstream
  disposition, and source-terminal disposition is
  reviewed against its individual source rows.
- [x] Every requirement is reviewed for enforceability, one normative meaning,
  and preservation of approved product behavior.
- [x] Every verification case has an observable expected result and forbidden
  side effects sufficient to prove its requirement.
- [x] Live Jira follow-up inventory is fetched and proposals are reconciled
  without overwriting current state.
- [ ] Product Owner decides whether the draft may be approved as the
  provider-independent CBD-94 baseline.
- [ ] Approved repository change is merged to `main` before Confluence sync.
- [ ] CBD-94 Jira completion is recorded only after merged evidence is linked.

## 15. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.2 | August 16, 2026 | Codex | Rebased onto `be20177`; reconciled CBD-92 v1.0 and CBD-93 v1.1; routed all four new scenarios, both new safeguards, and `RI-93-019`; expanded the source, requirement, verification, readiness, and audit sets; and preserved the approved public-launch-only independent-security policy without adopting any candidate. | Source reconciliation only; complete record remains draft |
| 0.1.1 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Substantive-review revision: incorporated the decision to preserve CBD-92's public-launch-only independent-security policy; corrected source/family disposition precedence and positive-fixture rating behavior; recorded singular accountability and rating review; verified candidate safeguards remain guards; added parameter/monitor coverage; updated gate/finding expectations; and completed the range, source, safeguard, rating, owner, requirement, verification, syntax, reference, and policy audits. | Product Owner gate-scope decision incorporated; complete record remains draft |
| 0.1.0 | August 16, 2026 | Codex | Initial deliverable/acceptance mapping; exhaustive source/gap/finding/reconciliation routes; CBD-11 preservation and contradiction review; disposition/gate audit; follow-up register; expected identifier sets; findings and completion checklist. | Draft for internal review |
