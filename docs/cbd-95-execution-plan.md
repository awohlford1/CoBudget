# CBD-95 — Consolidation and CBD-12 Reconciliation Execution Plan

| Field | Value |
| --- | --- |
| Status | **Executed — package audit passed; Product Owner review pending** |
| Plan version | 0.1.2 |
| Owner | Alexander Wohlford |
| Jira | [CBD-95](https://cobudget.atlassian.net/browse/CBD-95) |
| Parent | [CBD-14](https://cobudget.atlassian.net/browse/CBD-14) |
| Downstream gate | [CBD-76](https://cobudget.atlassian.net/browse/CBD-76) |
| Repository branch | `codex/cbd-95-plan` |
| Planning baseline | `43e87be` on August 16, 2026 |
| Last updated | August 16, 2026 |

## 1. Purpose and intended outcome

CBD-95 will issue the reviewed CBD-14 threat-model and data-inventory package,
prove that its identifiers and routes are internally consistent, reconcile the
then-current CBD-12 collaboration requirements against that package, and state
what the result permits next.

The intended outcome is an approval-ready repository document set that:

1. identifies the exact approved CBD-91 through CBD-94 inputs without copying
   or weakening their normative content;
2. gives every security-sensitive CBD-12 area one explicit reconciliation
   outcome and supporting evidence;
3. proves bidirectional traceability among data, flow, threat, abuse, risk,
   requirement, verification, gate, and reconciliation identifiers;
4. preserves every unresolved evidence, specialist-review, product-decision,
   implementation, and release gate at its actual scope;
5. records proposed architecture, product-plan, roadmap, and Jira follow-up
   work without editing those out-of-scope artifacts; and
6. recommends whether the CBD-14 security gate permits CBD-72 to proceed toward
   final approval and whether CBD-76 may start.

CBD-95 is a consolidation and reconciliation task. It does not implement a
mitigation, execute the CBD-94 verification inventory, accept a residual risk,
close a specialist or release gate without its required evidence, or prove
that CoBudget is secure.

This plan was executed against the stated baseline on August 16, 2026. The
resulting artifacts are listed in §4; the current audit result and approval
state are authoritative in
`docs/cbd-95-acceptance-criteria-traceability.md`.

## 2. Entry state and dependency controls

### 2.1 Cleared entry dependency

Live Jira state on August 16, 2026 records CBD-94 as **Done** and CBD-95 as
**Ready**. The approved CBD-94 package is present in the repository. This clears
the dependency that previously prohibited CBD-95 work.

Execution must pause and rebaseline if, before the first CBD-95 evidence commit:

- CBD-94 is reopened or its approved baseline changes;
- an upstream CBD-91 through CBD-94 artifact changes without an accompanying
  change-control record;
- the CBD-12 description, acceptance criteria, or CBD-72 through CBD-76
  governing artifacts change materially; or
- a new Product Owner decision changes a controlling CBD-72 or CBD-92 rule.

Rebaselining means fetching live Jira state, updating the branch from
`origin/main`, recording the new source versions and Git blobs, and rerunning
all affected traceability and reconciliation checks. It does not mean silently
carrying forward the current plan's conclusions.

### 2.2 Downstream dependency

CBD-95 blocks CBD-76, which records final MVP role boundaries and deferred
decisions. CBD-76 must not consume a draft CBD-95 recommendation. It may proceed
only after the exact CBD-95 document versions are approved and the Jira link
still represents the live dependency.

CBD-95 may recommend that CBD-72's CBD-14 security gate is satisfied while
leaving unrelated CBD-72 work open. Current non-CBD-14 work includes fixture
completion, independent matrix and cross-document audits, accessibility,
architecture, privacy, and quality reviews, exact-version Product Owner
approval, and post-merge publication. The recommendation must not collapse
those separate gates into the CBD-95 result.

## 3. Source baseline

The first execution step will freeze the exact Git blob and document version
for every source below. The table records the planning baseline; the final
package manifest will record the execution baseline.

| Source | Planning version/status | CBD-95 use |
| --- | --- | --- |
| `docs/cbd-91-private-mvp-data-inventory.md` | v1.0.1, approved baseline plus controlled amendment | Data classes, flows, copy/noninterference rules, evidence gaps, conflicts, and lifecycle expectations |
| `docs/cbd-92-system-flow-technical-threat-model.md` | v1.0, approved | Actors, systems, entry points, trust boundaries, technical threats, normative contracts, and review findings |
| `docs/cbd-92-acceptance-criteria-traceability.md` | v1.0, approved | CBD-92 completion evidence, source coverage, limitations, and public-launch gates |
| `docs/cbd-93-privacy-coercion-abuse-analysis.md` | v1.1, approved | Human-abuse scenarios, safeguards, evidence gaps, accepted-analysis residuals, and CBD-12 reconciliation inputs |
| `docs/cbd-94-risk-mitigation-requirement-register.md` | v1.0, approved | Risk families, dispositions, normative requirements, release gates, and proposed update list |
| `docs/cbd-94-verification-review-inventory.md` | v1.0, approved | Verification cases, evidence packages, specialist reviews, fixtures, parameters, monitoring, and result rules |
| `docs/cbd-94-acceptance-criteria-traceability.md` | v1.0.1, approved | Source routing, identifier expectations, audit obligations, discrepancies, and approval evidence |
| `docs/cbd-94-exhaustive-review-findings.md` | v1.0, accepted; all findings closed | Independent-review evidence and known process limitations |
| `docs/cbd-72-collaboration-permission-model.md` | v0.1.52; permission decisions approved, package gates pending | Current role, scope, permission, lifecycle, authorization, and audit rules |
| `docs/cbd-72-authorization-scenario-catalog.md` | v0.1.13; rule inventory approved, fixtures pending | Current positive and denied authorization scenarios |
| `docs/cbd-72-acceptance-criteria-traceability.md` | v0.1.12; CBD-14 and other review gates pending | CBD-72 criterion mapping, open findings, and exact remaining work |
| CBD-12 Jira description, acceptance criteria, comments, and subtasks | Live state at execution start; planning snapshot contains `CBD-12-AC01–36` | Then-current collaboration requirement baseline and sequencing authority |
| CBD-14 and CBD-95 Jira descriptions, acceptance criteria, links, comments, and status | Live state at execution start | Scope, deliverables, completion criteria, and dependency authority |

Repository files are the working source during this branch. Confluence is
read-only until the corresponding repository changes have merged into `main`.
If repository and Confluence content differ, the final CBD-95 review record will
name the discrepancy and preserve the repository version during active work.

## 4. Planned repository deliverables

| Planned artifact | Purpose | Completion contract |
| --- | --- | --- |
| `docs/cbd-95-threat-model-package-manifest.md` | Issue the versioned CBD-14 package without duplicating its governing content | Lists every approved component, document version, Git blob, authority, limitations, supersession rule, and downstream use; identifies any publication discrepancy |
| `docs/cbd-95-cbd-12-reconciliation-matrix.md` | Reconcile all security-sensitive CBD-12 rules | Gives every required area and every affected rule a stable reconciliation ID, one permitted outcome, evidence routes, mitigation/decision status, release effect, and follow-up route |
| `docs/cbd-95-architecture-roadmap-follow-up-register.md` | Separate required change work from completed analysis | Lists each proposed architecture, product-plan, roadmap, specialist, provider, operational, and Jira action with source IDs, owner role, phase, closure evidence, MVP effect, and live issue/link disposition |
| `docs/cbd-95-acceptance-criteria-traceability.md` | Prove CBD-95 and CBD-14 completion | Maps every Jira criterion and deliverable to evidence; records bidirectional-ID audit results, contradictions, limitations, review findings, approval evidence, change control, and the scoped CBD-72/CBD-76 readiness recommendation |
| `scripts/audit-cbd-95.py` | Make the mechanical completeness claims repeatable | Fails on identifier, range, route, status, terminology, version, link, unsupported-claim, or matrix-completeness defects and prints an auditable summary |

The manifest is an index and authority record, not a new copy of CBD-91 through
CBD-94. A requirement or decision remains defined in its source artifact and is
referenced by stable ID from the CBD-95 set.

## 5. Reconciliation method

### 5.1 Required coverage

The matrix will cover, at minimum, every CBD-95-named security-sensitive area:

1. permissions;
2. resource visibility;
3. invitations and consent;
4. role changes and ownership transfer;
5. revocation, removal, and stale access;
6. authentication assurance and sessions;
7. alerts and acknowledgements;
8. notification channels and previews;
9. masking, derived data, search, reports, and inference;
10. customer, administrative, security, and operational audit evidence;
11. exports, owner-authorized snapshots, and downloaded custody;
12. archival, deletion, restoration, and personal-account lifecycle;
13. recovery, backups, secrets, and exceptional access; and
14. cross-budget isolation and cross-space correlation.

Additional rows will be added where a current CBD-12 rule has a material CBD-14
route that is not represented by those area labels. Grouping may organize the
document, but it may not merge independent requirements or decisions.

### 5.2 Required row schema

Every reconciliation row will contain:

- a stable `RC-95-*` identifier;
- the CBD-12 criterion, description rule, or CBD-72 permission/scenario being
  classified;
- the affected role, resource, action, lifecycle state, and channel;
- supporting `DI/DF/TH/RF/AB/SG/EG/RI/RK/SR/VT/ME/SRV/RG` routes;
- one reconciliation outcome from §5.3;
- the controlling current rule while evidence or a decision remains open;
- the required mitigation, Product Owner decision, or closure evidence;
- the exact release or approval effect;
- any residual risk and the authority permitted to accept it;
- the follow-up issue or proposed `FU-95-*` record; and
- the effect on the CBD-72 and CBD-76 readiness recommendations.

Every matrix claim must resolve in both directions: an upstream ID cited as
affecting CBD-12 must reach at least one reconciliation row, and every
reconciliation row must resolve to defined upstream evidence.

### 5.3 Permitted outcomes

| Outcome | Meaning | Required evidence |
| --- | --- | --- |
| Pass unchanged | The current CBD-12/CBD-72 rule remains controlling and CBD-14 requires no new scoped condition on that rule | Exact current rule plus complete upstream routes and no unresolved material contradiction |
| Pass with mitigation | The approved product rule remains, but release or implementation requires a named CBD-94 mitigation, verification route, or scoped restriction | Exact `SR/VT/ME/SRV/RG` routes, owner, phase, and blocked scope while open |
| Blocked pending decision/evidence | The rule or affected surface cannot receive the requested readiness result until a named decision, evidence package, specialist review, or contradiction is resolved | Current interim rule, decision/evidence owner, closure contract, and exact blocked scope |
| Out of CBD-14 scope | The rule has no security/privacy reconciliation outcome for CBD-14 and is governed elsewhere | Positive evidence that it is outside scope plus the authoritative owner/artifact; absence of analysis is not sufficient |

An `RI-93-*` candidate is not an adopted CBD-12 requirement merely because it
appears beneficial. It remains absent until the Product Owner decides it and
the controlling artifact is updated. Likewise, an analysis-level CBD-93
residual is not a formally accepted CBD-94 or CBD-95 residual without the
required acceptance authority and evidence.

### 5.4 Conflict handling

When current sources disagree, the matrix will:

1. quote no more than needed to identify each conflicting rule;
2. apply the source precedence and change-control rules already recorded by
   CBD-91 through CBD-94;
3. preserve an approved CBD-11/CBD-71/CBD-72 product outcome unless CBD-14 has
   found a genuine material conflict;
4. record a Product Owner decision or leave the row blocked; and
5. identify every artifact and test route that the eventual decision must
   update.

Stale planning prose is not a material product conflict when the approved rule
is already clear. It belongs in the follow-up register and must not be used as
authority.

## 6. Execution sequence

### Phase 1 — Freeze and verify the baseline

1. Update the branch from `origin/main` and require a clean working tree.
2. Fetch live CBD-12, CBD-14, CBD-72 through CBD-76, and CBD-91 through CBD-95
   Jira state, including descriptions, acceptance criteria, subtasks, links,
   status, assignment, dates, and comments.
3. Record source versions, Git commit, Git blobs, Jira update timestamps, and
   any repository/Confluence discrepancy in the package manifest.
4. Confirm CBD-94 remains Done and its approved source-coverage gate remains
   closed. If not, stop and rebaseline.
5. Run the upstream CBD-94 audit obligations before relying on their counts and
   routes.

### Phase 2 — Build the package manifest

1. Define package component order and authority.
2. Record the purpose, normative status, limitations, and supersession trigger
   for each component.
3. State the combined limitation: this is an initial internal model, not legal
   review, penetration testing, certification, compliance validation, market
   validation, or proof of production security.
4. Identify open evidence and specialist gaps without restating them as new
   CBD-95 requirements.

### Phase 3 — Reconcile CBD-12

1. Extract the then-current CBD-12 description and acceptance criteria into a
   normalized rule inventory without creating a repository mirror of Jira.
2. Map CBD-72 permissions, scenarios, invariants, and open review gates to the
   applicable CBD-12 rules.
3. Route CBD-91 through CBD-94 evidence into the fourteen required areas.
4. Assign one §5.3 outcome to every row and record blockers at their exact
   scope.
5. Review the 19 independent `RI-93-*` candidates individually; do not infer a
   shared decision from a grouped route.
6. Record material contradictions for Product Owner decision and keep
   undecided rows blocked.

### Phase 4 — Trace follow-up work and readiness

1. Reconcile the approved CBD-94 update lists with current repository and Jira
   state.
2. Reuse an existing issue when its live scope and closure evidence match; do
   not create duplicates.
3. Assign stable `FU-95-*` IDs to proposals. Each proposal must cite source IDs,
   owner role, target phase, closure evidence, release effect, and the current
   issue/link result.
4. Record architecture and product-plan corrections as separate proposed work.
   Do not edit `docs/architecture.md`, `docs/product-plan.md`, or unrelated
   documents on the CBD-95 branch.
5. Produce separate recommendations for CBD-72's CBD-14 gate, CBD-76 start,
   CBD-14 completion, Private-MVP surfaces, and public launch. One positive
   recommendation must not imply the others.

Immediately before proposing or applying a Jira update, fetch and reconcile the
live issue, relevant subtasks, links, status, assignment, dates, and comments.
The active CBD-95 document branch does not itself authorize Jira mutations;
applying one also requires explicit authorization for that Jira change.

### Phase 5 — Audit and review

1. Run `scripts/audit-cbd-95.py` and retain its exact output summary in the
   traceability record.
2. Perform a substantive cross-document review for incorrect authority,
   over-broad gate language, hidden product changes, merged decisions,
   unsupported conclusions, and missing healthy-path evidence.
3. Record findings as stable `RV-95-*` entries with severity, evidence,
   disposition, and affected IDs.
4. Rerun the audit after every substantive correction.
5. Obtain Product Owner approval for the exact document versions. Approval must
   state what it does and does not close.

### Phase 6 — Merge and synchronize

1. Merge the reviewed repository change to `main` through its focused pull
   request.
2. Only after merge, create or identify the CBD-95 Confluence target pages,
   because Confluence copies remain read-only during active document work.
3. Register those page IDs in `scripts/sync-confluence.py` through a separate
   focused repository change, merge that change, and then synchronize the
   approved pages from `main` in dependency order.
4. Read each page back and compare it with the merged repository source.
5. Re-fetch Jira before recording final evidence or changing CBD-95/CBD-14/
   CBD-72/CBD-76 workflow state, and apply only changes the user has explicitly
   authorized.

## 7. Mechanical audit contract

The CBD-95 audit will fail unless all of the following pass:

1. upstream expected sets expand exactly as recorded by the approved CBD-94
   traceability baseline: `DI 76`, `DF 13`, `TH 45`, `RF 12`, `AB 86`, active
   `SG 96` excluding retired `SG-93-020`, `EG-91 24`, `EG-93 10`, `RI 19`,
   `RK 21`, `SR 147`, `VT 270`, `ME 15`, `SRV 15`, `FX 10`, `PR 5`, `MON 10`,
   and `RG 16`;
2. every defined `RC-95-*`, `FU-95-*`, and `RV-95-*` ID is unique, contiguous
   within its document, and resolves from every citation;
3. every CBD-14 and CBD-95 deliverable and acceptance criterion has evidence or
   an explicit blocker;
4. the then-current CBD-12 criterion set is complete (`CBD-12-AC01–36` in the
   planning snapshot), all fourteen §5.1 areas have at least one row, and every
   current security-sensitive CBD-12 rule has exactly one reconciliation
   outcome;
5. every matrix row contains the required §5.2 fields and one permitted status;
6. upstream-to-matrix and matrix-to-upstream identifier routes are complete;
7. every `RI-93-*`, open `EG-*`, `RF-92-*`, and `RG-94-*` relevant to CBD-12 has
   an explicit route or justified out-of-scope result;
8. no accepted, deferred, resolved, verified, or gate-closed claim lacks the
   required authority and evidence;
9. `RG-94-015` remains public-launch-only and `RG-94-016` is not confused with
   implementation or launch readiness;
10. current role and lifecycle terminology is used, with legacy terms allowed
    only inside an identified discrepancy;
11. local paths, Jira links, Confluence links, section references, versions,
    and frozen Git blobs resolve;
12. tables have consistent widths and no duplicate headings, placeholders,
    patch markers, or trailing whitespace remain;
13. unsupported claims such as safe, secure, private, anonymous, erased,
    deleted everywhere, real-time, guaranteed, or review proves compliance are
    rejected unless the text explicitly limits or prohibits the claim; and
14. the branch does not modify unrelated repository documents or represent a
    pre-merge Confluence copy as authoritative.

## 8. Completion and approval criteria

CBD-95 is ready for Product Owner approval only when:

- all planned artifacts in §4 exist and pass the audit;
- every CBD-14 and CBD-95 acceptance criterion resolves to evidence or an
  explicit blocker;
- the exact upstream baseline is frozen and reproducible;
- every stable upstream ID resolves bidirectionally through the package;
- every security-sensitive CBD-12 rule has one reconciliation outcome;
- every material contradiction has a Product Owner decision or remains an
  explicit blocker;
- all residual risks, specialist gates, follow-up work, and release effects are
  stated at their correct scope;
- the limitations and change-control rules are explicit;
- the readiness recommendation distinguishes CBD-72, CBD-76, CBD-14,
  Private-MVP surfaces, and public launch; and
- the exact document versions and review findings receive Product Owner
  approval.

Approval of CBD-95 may close `RG-94-016` when its required evidence passes. It
does not by itself close `RG-94-002` through `RG-94-015`, execute any `VT`, `ME`,
or `SRV` result, accept any residual risk, complete CBD-72's remaining fixture
or review work, or approve a production release.

## 9. Estimate and working checkpoints

The Jira estimate is six hours. The working allocation is:

| Work | Planned time | Review checkpoint |
| --- | ---: | --- |
| Baseline freeze and package manifest | 1.0h | Sources, versions, hashes, authority, and limitations are complete |
| CBD-12/CBD-72 rule extraction and reconciliation | 2.0h | Fourteen areas and all affected rules have draft outcomes |
| Traceability, follow-up register, and readiness recommendations | 1.0h | Every route, proposal, and blocked scope is explicit |
| Automated audit and substantive review | 1.0h | Mechanical audit passes; all review findings dispositioned |
| Product Owner review corrections and approval record | 1.0h | Exact versions approved or explicit blockers retained |

If unresolved decisions or evidence require external review, their completion
is not silently absorbed into the six-hour estimate. CBD-95 will record the
blocker, owner, scope, and follow-up route.

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.0 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Created the repository-first execution plan after CBD-94 reached Done. Defined source controls, five planned artifacts, the fourteen-area CBD-12 reconciliation method, status taxonomy, work phases, audit contract, completion gates, and six-hour allocation. | Draft for Product Owner review |
| 0.1.1 | August 16, 2026 | Codex | Recorded that the plan was executed against the frozen baseline and routed current audit/approval state to the CBD-95 traceability record. | Executed; Product Owner review pending |
| 0.1.2 | August 16, 2026 | Codex | Rebaselined the approval candidate to current `origin/main` `43e87be`; confirmed the eleven frozen CBD-72/CBD-91–94 source blobs were unchanged by the intervening CBD-102 and repository-tooling commits. | Executed; final audit and Product Owner approval pending |
