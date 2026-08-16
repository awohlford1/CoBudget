# CBD-94 — Verification, Negative-Test, and Specialist-Review Inventory

| Field | Value |
| --- | --- |
| Status | **Approved v1.0 — provider-independent CBD-94 baseline.** Approval fixes the verification obligations. It records no passing result, closes no release gate, and closes no evidence or specialist gap. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Jira | [CBD-94](https://cobudget.atlassian.net/browse/CBD-94) |
| Governing register | `docs/cbd-94-risk-mitigation-requirement-register.md` v1.0 |
| Repository baseline | `be20177` on `main` |
| Last updated | August 16, 2026 |

## 1. Purpose and verification rule

This inventory defines how every CBD-94 mitigation and `SR-94-*` requirement
is verified. It combines automated negative tests, state/race/recovery tests,
manual architecture and operational evidence, accessibility/copy review,
provider evidence, and qualified specialist review.

A requirement is not verified merely because:

* a control appears in UI;
* a happy-path test passes;
* an endpoint returns `403` once;
* a provider advertises a feature;
* a policy or runbook says staff should not perform an action;
* a review meeting occurred;
* a ticket moved to Done; or
* a person says the design appears safe.

Verification MUST prove the named enforcement point, approved behavior,
forbidden side effects, stale/race behavior, evidence artifact, tested version,
environment, provider/configuration where applicable, and limitation. A test
that cannot observe the required server/provider/operational property is not
evidence for that property.

## 2. Stable identifiers and result states

| Prefix | Meaning |
| --- | --- |
| `VT-94-*` | Implementation verification case executed as automated (`A`) or mixed automated-plus-qualified-review (`M`) evidence |
| `ME-94-*` | Manual architecture, configuration, schema, provider, or operational evidence package |
| `SRV-94-*` | Qualified specialist review or exercise |
| `FX-94-*` | Required reusable fixture family |
| `PR-94-*` | Versioned quantitative, timing, SLO, or allowlist parameter contract |
| `MON-94-*` | Privacy-bounded operational security monitoring and escalation control |

| Result | Meaning |
| --- | --- |
| Pass | Exact expected behavior and every forbidden-side-effect assertion passed for the recorded version/configuration. |
| Fail | At least one expected assertion, invariant, evidence requirement, or cleanup check failed. |
| Blocked | The test cannot run because its design, provider, tool, environment, or prerequisite is absent. The release gate remains open. |
| Not applicable | Allowed only with a written source/requirement rationale and reviewer approval; it cannot be used because implementation omitted a required surface. |

Flaky, skipped, quarantined, manually overridden, or non-deterministic results
are not Pass. Security-critical time/timing tests MUST record distributions and
tolerances rather than rely on one observation.

## 3. Required evidence record

Every `VT`, `ME`, `SRV`, and `MON` result MUST record:

| Field | Required content |
| --- | --- |
| Evidence ID | Stable case/package/review ID and immutable result/artifact locator |
| Source | `RK-94-*`, `SR-94-*`, `TH-92-*`, `AB-93-*`, gap/finding, and release gate IDs |
| Evidence owner | Exactly one accountable function: the first cited risk's owner unless the `ME/SRV/MON` row explicitly assigns another; reviewers/contributors remain separate |
| Version | Commit/build, schema/policy/template version, infrastructure/configuration revision, and provider/version |
| Environment | Local/test/staging/isolated-recovery/production-readiness context; production customer data MUST NOT be used for test convenience |
| Fixture | Actors, roles/states, spaces/profiles/resources, data sensitivity, channels/providers, clocks, and prior events |
| Preconditions | Authentication/assurance, authorization versions, lifecycle, provider state, queue/cache/index state, and clock |
| Action/fault | Exact request/event/concurrent change/replay/failure/operator action |
| Expected result | Allowed state/output and authoritative reason class |
| Forbidden side effects | State, audit, event, notification, package, queue, provider, timing, rate-counter, cache/index, secret, and cross-scope effects that MUST NOT occur |
| Cleanup | Fixture/secret/package/provider/job cleanup and proof that cleanup did not hide a failure |
| Result/limitations | Pass/Fail/Blocked/Not applicable, reviewer, date, open defects, and exact untested boundary |

Every `VT-94-*` case specification MUST bind all fields above before it is
Pass-eligible. The concise registry description is the stable proof obligation,
not permission to omit fixtures, preconditions, the exact action/fault,
observable oracle, or forbidden effects. A mixed (`M`) case requires both its
automated assertions and its named `ME/SRV` judgment; automation cannot decide
whether language is accessible, comprehensible, non-coercive, or survivor-safe.
The evidence owner assembles and signs the record but cannot substitute their
own opinion for a required independent or qualified reviewer.

## 4. Reusable fixture families

| Fixture | Required variants |
| --- | --- |
| FX-94-001 Identity | Unauthenticated, current account, different account, recovered account, logged-out account, stale session, stolen session, switched account, weak/fresh assurance, expired assurance, compromised destination |
| FX-94-002 Membership | Primary Owner, Co-owner, Collaborator, Viewer with each profile, Viewer without profile, Accountability Partner, invitee, pending/rejected/expired/revoked/inactive/former member |
| FX-94-003 Scope | Two account profiles, at least three budget spaces, same/different role across spaces, hidden/visible resources, same identifier shapes, cross-space object substitution |
| FX-94-004 Financial provider | Two authorizers, joint and unrelated accounts, duplicate/ambiguous provider identity, pending/posted/removed transactions, out-of-order/replayed webhooks, revoked/disconnected/orphaned connections |
| FX-94-005 Async | Current/stale/unknown envelope versions, duplicate/reordered/expired/poison jobs, retry exhaustion, DLQ replay, concurrent policy/lifecycle change |
| FX-94-006 Alerts/channels | Informational/firm/lifecycle/security/invitation events, eligible/ineligible recipients, changed destination, opt-out, stale token, mirrored/shared device, email forwarding, delayed send/callback |
| FX-94-007 Export | Financial/admin/Viewer packages, allowed/denied fields, current/stale scope, intended/wrong recipient, generated/failed/downloaded/expired/revoked/deleted states |
| FX-94-008 Lifecycle | Active/archive/restore/delete-request/cancel/purge/personal-account-delete/restore states; partial provider/processor/backup failure; stale sessions/jobs/packages/links |
| FX-94-009 Operations | Routine support, requester, approver, data custodian, key custodian, reviewer, malicious operator, compromised operator, expired grant, false purpose, bypass attempt |
| FX-94-010 Human safety | Healthy voluntary use, mistaken assignment, coercive observer, shared/monitored channel, subject disengagement, retaliatory removal, unwanted invitation, former member, non-user counterparty |

Synthetic fixtures MUST use conspicuous forbidden-value canaries for S3/S4
fields, secrets, hidden resources, other spaces, support notes, and security
evidence so disclosure into output/log/queue/provider/audit/export can be
detected automatically.

### 4.1 Coverage-combination rule

“All variants” does not mean an undocumented Cartesian explosion. Coverage is
complete only under these rules:

1. CBD-72 role/permission outcomes, lifecycle transitions, package types,
   service-authority purposes/effects, and explicit allowlists use exhaustive
   finite enumeration;
2. every listed fixture variant appears at least once for every applicable
   invariant and forbidden effect;
3. independent environment/provider/channel dimensions use pairwise coverage
   unless a source threat identifies a higher-order interaction;
4. identifiers, ordering, replay, timing, and concurrency use property-based or
   model-based generation plus fixed regression seeds; and
5. a coverage manifest records excluded combinations and the exact rationale.

No Pass may be claimed from a representative example when the authoritative
permission/state matrix requires exhaustive enumeration.

### 4.2 Open parameter registry

| Parameter | Required decision | Accountable owner | Evidence and current state |
| --- | --- | --- | --- |
| PR-94-001 Session invalidation SLO | Exact maximum propagation time by logout, recovery, factor/credential change, account deletion, security revocation, and distributed session store; measurement point and failure behavior | Security | `SR-94-002`; `ME-94-001/002/007`; **Open — affected session release blocked** |
| PR-94-002 Rate/resource values | Per `RL-92-001` surface: window, threshold, burst, safe counting key, counter store/consistency, quota/ceiling, anti-lockout rule, capacity basis, and owner approval. Candidate `SG-93-095` cross-space dimensions remain absent until CBD-73 approval. | Reliability | `SR-94-011/037/060/132`; `ME-94-010`; **Open — affected bounded surfaces blocked** |
| PR-94-003 Response/timing equivalence | Compared classes, status/body/header/length/pagination contract, controlled environment, warm-up, sample size/power, distribution/statistical test, tolerance/effect bound, retry/rate side effects, and reviewer | Security | `SR-94-007/020/126`; `ME-94-004/010`; **Open — affected oracle-sensitive surfaces blocked** |
| PR-94-004 Safe action/reason/copy classes | Closed versioned allowlists for invitation/refusal, health, lifecycle, notification, error/recovery and custody classes, with source rule, audience/channel/locale and Product Owner approval | Product | `SR-94-007/018/111/128`; `ME-94-005/014`; **Open where source does not already fix the class** |
| PR-94-005 Controlled-copy invalidation SLO | Exact maximum invalidation/disposition time per session, client, cache, index, job, package, provider, replica and backup surface, including clock start and timeout outcome | Data Lifecycle | `SR-94-121`; `ME-94-012/013`; **Open — affected lifecycle claims blocked** |

## 5. Implementation verification suites

Ranges are inclusive stable case families. Each individual case in a range is
defined by its ordered case registry in §6 and the required evidence schema in
§3. Parameter matrices follow §4.1; a single representative example does not
complete a family.

Execution class is fixed as follows:

| Class | Exact cases | Completion rule |
| --- | --- | --- |
| `M` mixed | `VT-94-164/166/187–193/199–200/217/219–232/235/247–250/255–262/266–267/269` | Automated behavior/absence assertions plus the mapped `ME/SRV` copy, accessibility, safety, residual, or comprehension judgment must both pass. |
| `A` automated | Every other `VT-94-*` case | The full executable case and forbidden-effect oracle run without human judgment as the deciding assertion. Provider/fault harness setup may be manual, but the result is machine-observed. |

The **Fixtures** column names the §4 fixture families a suite consumes. It is a
minimum, not a ceiling: an individual case MUST still record the exact fixture,
variants, and preconditions required by §3, and MAY require a family the suite
row does not name. Every `FX-94-001–010` family is consumed by at least one
suite, and every suite names at least one family.

| Cases | Suite | Requirements | Principal source | Fixtures | Release gate |
| --- | --- | --- | --- | --- | --- |
| `VT-94-001–008` | Authentication, recovery, session, assurance, origin | `SR-94-001–006` | `TH-92-001–004` | `FX-94-001` | `RG-94-002` |
| `VT-94-009–017` | Invitation enumeration, locator, consent, atomicity | `SR-94-007–011`, `SR-94-132–133/141/144` | `TH-92-005–007`; `AB-93-004/010/065–066/079` | `FX-94-001–002` | `RG-94-003/005/012` |
| `VT-94-018–035` | Authorization, tenant isolation, stale/race, masking, cache/search/report | `SR-94-012–021`, `SR-94-093–095/125–131/135/139` | `TH-92-008–013/017–018`; inference scenarios | `FX-94-001–003` | `RG-94-003` |
| `VT-94-036–053` | Provider link, connection authority, provenance, association/split/unlink | `SR-94-022–030`, `SR-94-118` | `TH-92-014/019/035–037` | `FX-94-003–004` | `RG-94-004` |
| `VT-94-054–068` | Queue/job/retry/rate/calculation/alert-state layers | `SR-94-031–038` | `TH-92-015/023/034/038–040` | `FX-94-005–006` | `RG-94-005` |
| `VT-94-069–076` | Secret non-propagation, custody, rotation | `SR-94-039–043` | `TH-92-016` | `FX-94-005/009` | `RG-94-006` |
| `VT-94-077–096` | Alert eligibility, templates, providers, channels, shared devices | `SR-94-044–054`, `SR-94-104–109` | `TH-92-020–023/041`; `AB-93-023–032` | `FX-94-006` | `RG-94-007/012` |
| `VT-94-097–111` | Export schemas, authorization, snapshot, locator, download, custody | `SR-94-055–062`, `SR-94-113` | `TH-92-024–026`; export abuse/residual scenarios | `FX-94-002/007` | `RG-94-008` |
| `VT-94-112–132` | Audit/telemetry/support/exceptional access/platform boundary | `SR-94-063–074`, `SR-94-136–140` | `TH-92-027–030/042`; `AB-93-067–074/081` | `FX-94-009` | `RG-94-009/011` |
| `VT-94-133–153` | Archive/delete/restore/backups/recovery/authority resurrection | `SR-94-075–084`, `SR-94-110–124` | `TH-92-031–033/043–045`; lifecycle abuse scenarios | `FX-94-008` | `RG-94-010` |
| `VT-94-154–166` | Coercion/consent/role/transfer/export/connection disclosures and non-escalation | `SR-94-085–092`, `SR-94-110/115` | `AB-93-001–010` | `FX-94-002/010` | `RG-94-012/014` |
| `VT-94-167–180` | Role visibility, monitoring, sensitive content, search/read aggregation | `SR-94-093–101`, `SR-94-125–129` | `AB-93-011–022` | `FX-94-002/010` | `RG-94-003/012/014` |
| `VT-94-181–187` | Lifecycle notice/safety-channel residual fixtures | `SR-94-052–054`, `SR-94-111/116–117` | `AB-93-028–029/057–058`; `EG-93-001/010` | `FX-94-006/010` | `RG-94-007/012/014` |
| `VT-94-188–200` | Shame/pressure/acknowledgement/comment noninterference | `SR-94-089–090`, `SR-94-098–109` | `AB-93-033–038` | `FX-94-006/010` | `RG-94-011/012` |
| `VT-94-201–218` | Retaliatory removal, scope change, lockout, lifecycle agency | `SR-94-110–120` | `AB-93-039–048` | `FX-94-002/008/010` | `RG-94-003/008/010/012` |
| `VT-94-219–224` | Former member, stale access, copy custody | `SR-94-112/119/121–124` | `AB-93-049–054` | `FX-94-002/007–008` | `RG-94-008/010/012` |
| `VT-94-225–235` | Inference, existence, timing, health, withheld results | `SR-94-016–020`, `SR-94-116–118/125–129` | `AB-93-055–062` | `FX-94-003/010` | `RG-94-003/005/012/014` |
| `VT-94-236–246` | Cross-space isolation, correlation, invitation re-contact | `SR-94-130–135` | `AB-93-063–066` | `FX-94-003/010` | `RG-94-003/005/012` |
| `VT-94-247–254` | Audit/history audience, aggregation, self-record candidate | `SR-94-063–065`, `SR-94-136–140` | `AB-93-067–070` | `FX-94-002/009` | `RG-94-009/012` |
| `VT-94-255–263` | Healthy/mistaken role, invitation, export, departure, support, archive | `SR-94-141–145` plus applicable domain requirements | `AB-93-075–082` | `FX-94-002/007/010` | Applicable domain gate and `RG-94-012` |
| `VT-94-264–270` | Personal-account deletion and joint-account association/coercion/dissolution | `SR-94-022–030/075–092/110–124/146–147` | `AB-93-083–086`; `SG-93-096/097`; `RI-93-019` | `FX-94-004/008/010` | `RG-94-004/010/012/014` |

## 6. Ordered implementation verification case registry

Each description includes an implicit assertion that denied or stale attempts
change no protected state and create no unauthorized event, job, alert,
notification, package, provider action, customer-visible audit, or cache/index
entry. Required security denial evidence is tested separately and MUST itself
exclude secrets and denied content.

### 6.1 Identity and invitation (`VT-94-001–017`)

| ID | Required case and expected outcome |
| --- | --- |
| VT-94-001 | Forge or misbind IdP subject/client/assurance result; server rejects before membership lookup and records safe security evidence. |
| VT-94-002 | Replay/fix a pre-authentication or pre-recovery session; identifier rotates and old session is unusable. |
| VT-94-003 | Logout, recovery, factor change, security revocation, and account deletion invalidate all affected sessions within `PR-94-001`. |
| VT-94-004 | Switch between two accounts in one browser; customer state, caches, drafts, open responses, and authorization versions cannot cross accounts. |
| VT-94-005 | Submit a protected action with weak, expired, wrong-action, wrong-space, or wrong-target assurance; deny with no effect. |
| VT-94-006 | Substitute action/target after fresh assurance; action-bound verification denies the substituted request. |
| VT-94-007 | Cross-origin/CSRF/content-type/method/replay matrix for every protected action class; only approved request forms reach policy evaluation. |
| VT-94-008 | Logout/access loss/offline/reconnect matrix; reachable client state purges, offline customer reads/mutations fail, and reconnect obtains fresh live authority. |
| VT-94-009 | Invitation create/status response equivalence across existing, nonexistent, ineligible, unauthorized, expired, rejected, revoked, and already-member recipients; no unapproved block/persistent-decline behavior is assumed. |
| VT-94-010 | Invitation response/header/length/timing/rate-counter distribution does not enumerate account, membership, space, or token state. |
| VT-94-011 | Intercept/forward locator to wrong authenticated subject/channel; no membership or target disclosure. |
| VT-94-012 | Replay used, expired, replaced, revoked, rejected, or stale-version locator; no membership or secondary effect. |
| VT-94-013 | Accept after inviter loses authority, recipient loses eligibility, role/scope changes, or space archives; commit-time denial and invalidation are consistent. |
| VT-94-014 | Race two accept/revoke/replace requests; exactly one valid terminal membership/invitation outcome and one coherent evidence chain. |
| VT-94-015 | Inject failure at membership, token, consent, audit, and notice steps; no access-conferring partial commit and retry converges once. |
| VT-94-016 | Exhaust invitation counters from attacker-controlled identities; uniform response holds and legitimate recipient/inviter recovery is not locked out. |
| VT-94-017 | Pending/rejected/expired/revoked/inactive invitation matrix yields no reads, derived data, search, report, alerts, jobs, exports, or existence signals. |

### 6.2 Authorization and noninterference (`VT-94-018–035`)

| ID | Required case and expected outcome |
| --- | --- |
| VT-94-018 | Execute every CBD-72 denied action directly against the API despite hidden/disabled UI; server denies with no protected effect. |
| VT-94-019 | Substitute every scoped object ID across subject, profile, space, member, resource, author, recipient, connection, package, and provider callback. |
| VT-94-020 | Omit/malformed/unknown role, profile, policy, purpose, effect, lifecycle, or authorization version; default denial never broadens authority. |
| VT-94-021 | Change role/profile/membership/consent/lifecycle between read/precheck and commit; transactional version check prevents stale effect. |
| VT-94-022 | Reuse a prior response/form/open tab after scope loss; data is not refreshed/disclosed and mutation fails. |
| VT-94-023 | Attempt every unlisted `SA-92-*` purpose and each cross-purpose effect; workload is denied and cannot fall back to system authority. |
| VT-94-024 | Forge service identity or envelope subject/space/resource; workload identity and payload authority are independently rejected. |
| VT-94-025 | Differential field test compares allowed/denied schemas, nulls, keys, shapes, IDs, counts, sort order, errors, pagination, and content length. |
| VT-94-026 | Timing-distribution test compares visible/hidden/nonexistent/cross-space resources under cache hit/miss, search, report, and denial. |
| VT-94-027 | Cache key omits each authority dimension one at a time; canary from another scope never becomes readable. |
| VT-94-028 | Index/search partition key omits each authority dimension; cross-scope canary never returns or changes counts/facets/timing. |
| VT-94-029 | Report receives incomplete/hidden inputs; it is withheld with the `PR-94-004` safe class and never rendered as partial-complete. |
| VT-94-030 | Concurrent policy/lifecycle/target mutations in all orderings; no lost update or silent overwrite of protected state. |
| VT-94-031 | Viewer profile widening/narrowing/removal invalidates client/cache/index/report/package/job state within `PR-94-005`. |
| VT-94-032 | Accountability Partner/Viewer/Collaborator field-boundary snapshot tests prove exact allowed and prohibited fields, derived values, and exports. |
| VT-94-033 | Cross-space audit/error/notification side-effect test proves a denied request does not reveal target existence indirectly. |
| VT-94-034 | Pagination/rate-limit interaction cannot enumerate hidden result count or cause a victim-scoped denial of service. |
| VT-94-035 | Full policy decision contract coverage test maps each protected route/worker to subject, scope, field, action, purpose/effect, and version inputs. |

### 6.3 Financial provider and provenance (`VT-94-036–053`)

| ID | Required case and expected outcome |
| --- | --- |
| VT-94-036 | Provider callback with wrong/missing/replayed/expired state, nonce/PKCE, subject, profile, attempt, provider, redirect, or effect creates no connection/link. |
| VT-94-037 | One account subject cannot create or reactivate a second active financial profile through concurrency, restore, provider reuse, or stale link. |
| VT-94-038 | Profile identifier is never treated as legal identity or authority to merge/transfer/share another subject's provider data. |
| VT-94-039 | Two authorizers connect the same joint account; consent, secret, cursor, revocation, raw observations, and audit remain independent. |
| VT-94-040 | One authorizer's disconnect/revocation stops only their connection and correctly recomputes any presentation without adopting authority. |
| VT-94-041 | Membership/ownership transfer cannot transfer, rotate, manage, or revoke another person's provider connection. |
| VT-94-042 | Ambiguous provider account identity requires approved evidence/confirmation before association; no silent merge occurs. |
| VT-94-043 | Explicit non-association/split survives webhook replay, resync, restore, provider identity change, and stale job. |
| VT-94-044 | Association retains reversible provenance to all sources and never combines consent/authority/cursors. |
| VT-94-045 | Pending-to-posted/revised/removed transaction sequence preserves source history and deterministically replaces derived state. |
| VT-94-046 | Duplicate/out-of-order provider events converge once without lost facts, duplicate facts, or mixed-space routing. |
| VT-94-047 | Provider webhook authentication/replay failure is recorded safely before no downstream work is enqueued. |
| VT-94-048 | Poison/paginated provider data cannot cross connection scope or advance cursor past unprocessed facts. |
| VT-94-049 | Space unlink, subject loss, provider revocation, and permanent authorizer loss execute distinct approved outcomes. |
| VT-94-050 | Orphaned-connection reason exposes only approved state and no private authorizer/provider failure detail. |
| VT-94-051 | Provider compromise/unavailable/deceptive identity fixtures fail closed without inventing completeness or authority. |
| VT-94-052 | Provider token/secret never appears in domain rows, jobs, logs, audit, support, analytics, exports, or clients. |
| VT-94-053 | Physical profile/connection/account/link/projection schema constraints and migrations enforce all logical cardinality and isolation rules. |

### 6.4 Async, rates, and secrets (`VT-94-054–076`)

| ID | Required case and expected outcome |
| --- | --- |
| VT-94-054 | Unknown/malformed envelope producer, version, purpose, effect, subject, space, resource, expiry, or authority mode is rejected before lookup/effect. |
| VT-94-055 | Duplicate exact job/event executes each material effect once and leaves one coherent audit/effect record. |
| VT-94-056 | Reordered jobs with version dependencies converge to approved current state or explicit terminal conflict. |
| VT-94-057 | Expired job cannot act; it records safe terminal state without revealing target detail to an unauthorized actor. |
| VT-94-058 | Poison message follows bounded retry/DLQ policy without blocking unrelated tenant/partition work. |
| VT-94-059 | Manual/automated DLQ redrive requires current purpose authority and cannot replay stale customer authority. |
| VT-94-060 | Retry storm respects worker/provider/store ceilings and ends terminally without duplicate/lost ordered progress. |
| VT-94-061 | Calculator freezes inputs/rules/time boundary and atomically publishes one derived revision with provenance. |
| VT-94-062 | Calculation failure/mixed version never replaces a valid prior revision or hides uncertainty. |
| VT-94-063 | Alert event, recipient instance, personal state, and delivery attempt remain independent under retries/concurrency. |
| VT-94-064 | One recipient cannot acknowledge/archive/dismiss/change delivery state for another recipient. |
| VT-94-065 | Every `RL-92-001` surface enforces approved window/threshold/burst/resource values at all replicas. |
| VT-94-066 | Throttled status/body/header/length/timing is equivalent across existent/nonexistent/eligible/ineligible/authorized/unauthorized targets. |
| VT-94-067 | Attacker counter exhaustion cannot lock the legitimate subject out of authentication, invitation, provider link, export, or lifecycle recovery. |
| VT-94-068 | Counter reset/failover/distributed-race tests neither bypass ceilings nor create tenant/cross-subject interference. |
| VT-94-069 | Static and runtime secret-canary scan covers logs, traces, errors, audit, jobs, support, analytics, exports, client bundles, and crash reports. |
| VT-94-070 | Database/queue/cache/index/report access identities cannot read KMS/provider secret stores absent exact purpose. |
| VT-94-071 | Operator with data access cannot decrypt without separate key duty; key custodian cannot browse customer data. |
| VT-94-072 | Secret rotation invalidates old callback/connection/package/signing uses without breaking isolation or reviving stale state. |
| VT-94-073 | Secret revocation reaches every dependent workload and produces no secret value in evidence/notice. |
| VT-94-074 | Backup/restore excludes prohibited secrets and restores allowed encrypted material only through separated custody. |
| VT-94-075 | Build/config/template/provider-field change cannot add a secret-bearing field without allowlist/schema failure. |
| VT-94-076 | Incident fixture proves detection, rotation/revocation, affected-surface enumeration, and safe evidence/notice without routine content access. |

### 6.5 Notifications and exports (`VT-94-077–111`)

| ID | Required case and expected outcome |
| --- | --- |
| VT-94-077 | Alert evaluation uses only authorized current inputs and produces instances only for currently eligible recipients. |
| VT-94-078 | Access/role/profile/consent/lifecycle/destination/template changes after enqueue suppress or safely reroute stale delivery at send time. |
| VT-94-079 | In-app instance exists for each eligible recipient regardless of another member's preferences/state. |
| VT-94-080 | Another member cannot mute/pause/suppress/dismiss/archive or configure the subject's delivery/preferences. |
| VT-94-081 | Every push/SMS body equals the approved fixed content-free body across event classes/locales/fallbacks/errors. |
| VT-94-082 | Push/SMS provider payload, tags, collapse keys, token fields, deep links, callbacks, and logs contain no protected context/authority. |
| VT-94-083 | Routine email contains no customer/event detail; invitation email only safe action class; lifecycle/security email only safe action class/deadline. |
| VT-94-084 | Email subjects, preheaders, headers, tags, locators, redirects, referrers, tracking, and provider metadata obey the purpose allowlist. |
| VT-94-085 | Locator opens generic authenticated destination; forwarded/wrong-user/expired/stale locator grants no authority or context. |
| VT-94-086 | Provider callback can update delivery attempt only and cannot acknowledge, change preferences, authenticate, or recreate facts. |
| VT-94-087 | Duplicate/replayed/delayed callback and provider retry cannot duplicate messages/instances or change product truth. |
| VT-94-088 | Destination ownership change, token rotation, opt-out, bounce, suppression, compromise, and retirement preserve mandatory in-app notice and no recovery authority. |
| VT-94-089 | Shared/locked/mirrored/forwarded/carrier/inbox device tests expose only approved CoBudget-use/timing residual, never event/resource context. |
| VT-94-090 | Lifecycle notice remains unsuppressible under approved rule while content stays minimal and safe. |
| VT-94-091 | Informational alert provisional/self-clear behavior and firm alert settled/personal-ack behavior remain distinct. |
| VT-94-092 | One person's provisional event is not attributed/blamed beyond the approved authoritative event scope. |
| VT-94-093 | Per-channel deduplication by material revision and retry/cooldown behavior produces the approved number of deliveries. |
| VT-94-094 | Localization, truncation, fallback, screen-reader, magnification/cast, and notification-preview tests preserve confidentiality and normative meaning. |
| VT-94-095 | Provider retention/deletion request and evidence match destination/token/message/callback field inventory. |
| VT-94-096 | Customer channel/custody copy accurately states shared-device/provider/recipient-copy limits and contains no unsupported safety/confidentiality claim. |
| VT-94-097 | Financial/admin/Viewer package schema tests reject every cross-type and unallowlisted field/object. |
| VT-94-098 | Generation binds correct requester/recipient/type/space/read scope/field scope/assurance/policy/auth/material revision/expiry. |
| VT-94-099 | Scope or authorization changes during generation cannot create mixed-snapshot or over-broad package. |
| VT-94-100 | Package integrity/provenance/audit exactly match delivered contents after success/failure/retry. |
| VT-94-101 | Wrong recipient, wrong subject, transferred/enumerated locator, logged key, or substituted object path cannot download. |
| VT-94-102 | Expired/revoked/deleted/stale-invalidated package cannot download and reveals no package/target existence. |
| VT-94-103 | Download-time authentication and package authorization are rechecked independently from generation. |
| VT-94-104 | Package store is inaccessible to ordinary API/support/workers and respects encryption/key separation. |
| VT-94-105 | Primary/Viewer packages expire and delete within ≤24h; financial-export lifetime matches approved exact value. |
| VT-94-106 | Export rate/resource responses are uniform and cannot lock a legitimate requester out through attacker exhaustion. |
| VT-94-107 | Package failure/partial write never exposes incomplete content or leaves audit/package state claiming success. |
| VT-94-108 | Pre-download copy names exact scope and permanent recipient custody; accessibility/comprehension evidence passes. |
| VT-94-109 | Archived read-scope export uses frozen `DI-91-075` snapshot and member scope throughout restore window. |
| VT-94-110 | Access loss/package invalidation/delete propagates to controlled package copies and deletion ledger. |
| VT-94-111 | Downloaded-copy residual is accurately retained in evidence/copy; test does not claim remote deletion of downloaded file. |

### 6.6 Audit, operations, lifecycle, and recovery (`VT-94-112–153`)

| ID | Required case and expected outcome |
| --- | --- |
| VT-94-112 | Required event matrix emits approved taxonomy/fields with actor/target/policy/auth/correlation/order and no prohibited content. |
| VT-94-113 | Omit/drop/reorder/duplicate/overwrite/forge/selectively-delete audit events; integrity/omission controls detect each fault. |
| VT-94-114 | No single operator can alter evidence undetectably or approve/review their own exceptional path. |
| VT-94-115 | Customer resource history applies current audience and safe schema; cross-role/private/security/support canaries remain absent. |
| VT-94-116 | Admin history never leaks into ordinary target history; ordinary target history never gains Primary-only fields. |
| VT-94-117 | Denied audit query does not reveal count, timing, actor, target, hidden-resource gaps, or cross-space IDs. |
| VT-94-118 | Product analytics SDK/events/cookies/identifiers/behavioral capture are absent from client/server/build/provider configuration. |
| VT-94-119 | Reliability telemetry is content-free and non-correlating; security evidence is S3, purpose/access/lifecycle separated. |
| VT-94-120 | Coarse product measures cannot drill to customer/space/device/destination/event history or reconstruct behavior. |
| VT-94-121 | Routine support tool exposes only approved content-free fields and opaque customer-supplied correlation. |
| VT-94-122 | Routine staff attempt database/log/content browsing, impersonation, moderation, role/connection/lifecycle mutation, or resource existence lookup; tool denies. |
| VT-94-123 | False/unapproved exceptional purpose, self-approval, missing duty, excessive scope/time, or wrong tenant/fields is denied. |
| VT-94-124 | Approved exceptional access is mediated/non-impersonating, JIT, exact-scope, and automatically expires/revokes. |
| VT-94-125 | Data/key/approval/evidence/return-to-service duties cannot be combined by one operator or one credential. |
| VT-94-126 | Exceptional tool action creates safe immutable evidence, post-use review, and approved customer notice/delay workflow. |
| VT-94-127 | Support-mediated ownership/role/connection transfer has no API/tool/escalation override. |
| VT-94-128 | Abuse/support S3 text and operator notes never enter customer audit/admin export/notifications/analytics/ordinary logs. |
| VT-94-129 | Read-side behavioral monitoring is absent unless exact approved `EG-93-006` package is present. |
| VT-94-130 | Comment endpoints remain disabled/unreleased while platform-safety gate is open. |
| VT-94-131 | If comments are later enabled, harassment/unlawful/accidental-disclosure exercise follows approved process without granting member moderation authority. |
| VT-94-132 | Recovery exercise proves routine support remains content-free and exceptional access cannot return stale/deleted authority to service. |
| VT-94-133 | Disposition matrix coverage test finds every `DI-91-*` class × location × lifecycle event × provider/processor. |
| VT-94-134 | Archive preserves/read-only freezes exact approved state and notices members without beginning deletion. |
| VT-94-135 | Restore returns exact approved role/profile state and does not revive revoked sessions/connections/packages/jobs. |
| VT-94-136 | Delete request/cancel/purge transitions enforce Primary-only authority, window, notice, idempotency, and dependency order. |
| VT-94-137 | Personal-account deletion/restoration follows `PA-92-*` and cannot create duplicate identity/profile or cross-space authority. |
| VT-94-138 | Inject failure at each store/cache/index/job/package/provider/client/replica/backup step; ledger remains incomplete and retry converges safely. |
| VT-94-139 | Controlled clients/caches/indexes/jobs/packages invalidate within named SLO after membership/lifecycle loss. |
| VT-94-140 | Provider disconnect/deletion request/completion/exception/timeout maps to ledger and never silently counts timeout as success. |
| VT-94-141 | Backup contents match included/excluded class inventory and contain no prohibited secret. |
| VT-94-142 | Backup expiry/retention/legal-hold behavior matches approved disposition and produces reviewable evidence. |
| VT-94-143 | Isolated restore uses separated data/key custody and no production/customer role can access the environment. |
| VT-94-144 | Restored state reconciles deletion/lifecycle ledgers before any return to service. |
| VT-94-145 | Restore cannot resurrect purged records, sessions, roles, links, connections, consent, packages, jobs, secrets, or stale provider data. |
| VT-94-146 | Forged/replayed/out-of-order lifecycle request cannot lock out, duplicate identity, partially delete, or race provider work. |
| VT-94-147 | Lifecycle rate/resource exhaustion cannot prevent legitimate cancellation/recovery or disclose state. |
| VT-94-148 | Tombstone contains only approved non-financial fields and obeys purpose/access/retention/deletion rule. |
| VT-94-149 | Former-member attribution retains no active contact/delivery/provider/role authority and matches final legal/retention decision. |
| VT-94-150 | Customer status/copy distinguishes immediate access shutdown, controlled-copy completion, provider/processor exceptions, backup expiry, and uncontrolled copies. |
| VT-94-151 | Stale open tab, job, notification, export, provider callback, audit query, and recovery attempt after purge all fail without resurrection. |
| VT-94-152 | Full recovery rehearsal records RTO/RPO, coverage, unresolved gaps, evidence integrity, independent review, and controlled return to service. |
| VT-94-153 | Terminal completion proof identifies every surface and refuses completion when any required evidence is missing. |

### 6.7 Human-abuse scenario and healthy-path verification (`VT-94-154–270`)

The 117 cases in this family execute the 86 source scenarios plus required
cross-channel, accessibility, non-escalation, and healthy-path variants. The
mapping below is terminal and bidirectional; one case may carry several source
scenarios only where the actor, state, safeguard, and expected outcome are the
same.

| Cases | Exact source/fixture route and expected proof |
| --- | --- |
| `VT-94-154–163` | One case per `AB-93-001–010`; preserve current behavior, prove baseline safeguards/non-escalation, and assert candidate `RI-93-*` behavior is absent until approved. |
| `VT-94-164` | Coercion ceremony copy does not claim fresh authentication proves voluntary consent. |
| `VT-94-165` | Every coercion-related control leaves money movement, spending approval/blocking, external-account control, and user lockout unavailable. |
| `VT-94-166` | Automated copy-version/presence/focus/semantic-structure assertions cover transfer, scope loss, provider authorization, export, and permanence; `SRV-94-004/014` decide accessibility and comprehension. |
| `VT-94-167–178` | One case per `AB-93-011–022`; normal cases prove exact role boundary, adversarial cases prove safeguards/residuals without invented narrowing. |
| `VT-94-179` | Repeated authorized search/read aggregation remains inside scope and follows the approved audit/privacy decision; monitoring is not silently enabled. |
| `VT-94-180` | Non-user counterparty names receive no enrichment, cross-space correlation, analytics, or notification propagation. |
| `VT-94-181–184` | One case each for `AB-93-028`, `AB-93-029`, `AB-93-057`, `AB-93-058`; approved mandatory notice/cancellation behavior holds and residual harm remains explicit. |
| `VT-94-185` | A monitored/shared channel receives only approved minimal lifecycle content and cannot mutate product/recovery state. |
| `VT-94-186` | Channel retirement preserves mandatory in-app notice and does not confer or destroy recovery authority. |
| `VT-94-187` | Automated inventory/lint proves no released customer/internal string uses the prohibited survivor-safe claim absent `EG-93-001/005`; `SRV-94-002/003/014` review meaning and limitations. |
| `VT-94-188–193` | One case per `AB-93-033–038`; acknowledgement/comment/indicator controls preserve personal state, attribution, noninterference, and no shame/control framing. |
| `VT-94-194` | Another person cannot acknowledge, dismiss, archive, or satisfy the subject's alert. |
| `VT-94-195` | Acknowledgement cannot change financial/schedule/permission/member/connection/configuration state. |
| `VT-94-196` | Informational alert self-clears without acknowledgement; firm alert remains settled/personal. |
| `VT-94-197` | Comment endpoint remains unavailable while `EG-93-009` is open. |
| `VT-94-198` | Comment author may use only approved self-edit/correction path; another role gains no moderation authority. |
| `VT-94-199` | Automated platform-boundary assertions prove budget-space roles cannot access support/abuse text or platform-safety powers; the operating exercise is exclusively `SRV-94-008`. |
| `VT-94-200` | Automated accessibility-tree, focus, truncation, fallback, and approved-copy snapshot assertions pass; `SRV-94-004/014` decide accessibility, localization meaning, and comprehension. |
| `VT-94-201–210` | One case per `AB-93-039–048`; role reduction/removal/archive/delete/connection loss/support refusal follows approved rule with immediate invalidation and no staff bypass. |
| `VT-94-211` | Scope-change required notice uses approved before/after class without hidden financial detail. |
| `VT-94-212` | Removed/former member's stale tab/cache/index/report/job/package matrix fails immediately. |
| `VT-94-213` | Archived member read-scope export uses frozen scope and produces no mutation. |
| `VT-94-214` | Candidate removal-time export is absent until `RI-93-004` decision. |
| `VT-94-215` | Candidate deletion objection/deadlock behavior is absent until `RI-93-006/EG-93-007` decision. |
| `VT-94-216` | Candidate self-record/observer-removal/reversal/comment-subject remedy is absent until each independent decision. |
| `VT-94-217` | Shut-out support uses the Product Owner-approved `PR-94-004` response version, discloses no other-member fact, and cannot transfer authority; `SRV-94-014` decides copy meaning. |
| `VT-94-218` | Healthy transfer/archive/removal path remains possible; mitigations do not block approved voluntary use. |
| `VT-94-219–224` | One case per `AB-93-049–054`; controlled stale access invalidates, attribution/retention follows current rule, and uncontrolled copies receive no false erasure claim. |
| `VT-94-225–232` | One case per `AB-93-055–062`; status/body/header/length/timing/count/reason/notice/report inference is tested and residuals remain explicit. |
| `VT-94-233` | Inactive-owner ineligible/eligible request timing distributions and rate counters are equivalent under `PR-94-003`. |
| `VT-94-234` | Every attempt is audited safely while notice content names no inactivity date/interval. |
| `VT-94-235` | Health/withheld-report output uses only the approved `PR-94-004` class and exposes no additional field, code, count, or completeness state; human copy approval remains `SRV-94-014`. |
| `VT-94-236–239` | One case per `AB-93-063–066`; no server cross-space correlation/lookup, invitation re-contact limits follow approved decisions, and human-memory residual is explicit. |
| `VT-94-240` | Same subject/identifier across several spaces cannot produce global customer-visible lookup/search/report/export. |
| `VT-94-241` | Authorized person in two spaces sees each independently and no combined product insight. |
| `VT-94-242` | Unwanted inviter receives no recipient/prior-relationship existence signal. |
| `VT-94-243` | Existing approved invitation counters use safe keys and uniform responses without creating cross-space per-recipient/per-inviter state; that candidate state remains absent until `RI-93-010` approval. |
| `VT-94-244` | Per-inviter block candidate remains absent until approved; no documentation implies it exists. |
| `VT-94-245` | Persistent decline candidate remains absent until approved; rejection/expiry current behavior remains correct. |
| `VT-94-246` | Cross-space per-recipient/per-inviter limit candidate/value gate cannot be represented as implemented before decision/test. |
| `VT-94-247–250` | One case per `AB-93-067–070`; exact audience/aggregation limits, subject-evidence asymmetry, and residual/candidate routes are preserved. |
| `VT-94-251` | Primary administrative history and ordinary target history schemas cannot substitute for each other. |
| `VT-94-252` | Aggregated target history search/pagination cannot create broader behavioral profile than approved audience/purpose. |
| `VT-94-253` | Candidate self-record endpoint/export remains absent until `RI-93-007` decision. |
| `VT-94-254` | Security/support/operator evidence never appears in customer audit/admin history. |
| `VT-94-255–262` | One case per `AB-93-075–082`; automated behavior matches current rules and approved copy versions, while `SRV-94-004/014` decides accessibility/comprehension and no candidate disclosure/recommendation is implied. |
| `VT-94-263` | Cross-suite healthy-path regression proves the full control set does not prevent approved voluntary invitation, collaboration, export, departure, support, archive, and restore behavior. |
| `VT-94-264` | `AB-93-083`: personal-account deletion enforces sole-Primary-Owner orphan prevention, fresh protected confirmation, atomic authority shutdown, the 30-day pending window, identity-verified cancellation, no ordinary-use access while pending, no resurrection of prior authority, and the approved retained-shared-history boundary. |
| `VT-94-265` | `AB-93-084`: two independently authorized contributors can complete a genuine `CA-92-010` association; the exact versioned inputs commit atomically, duplicate prevention changes only the budget-scoped representation, and no private-connection or cross-space authority is created. |
| `VT-94-266` | `AB-93-085`: a technically valid coerced confirmation receives every approved enforcement protection but is never represented as proof of willingness; withdrawal remains available and observably changes the shared presentation exactly as disclosed. |
| `VT-94-267` | `AB-93-086`: an authorized Primary Owner or Co-owner may exercise the current unilateral `CA-92-011` dissolution; re-separation and all dependent balances, transactions, reconciliation, alerts, reports, and derivatives recompute atomically without disclosing previously unauthorized data, while the inherited residual remains explicit and formally unaccepted by CBD-94. |
| `VT-94-268` | Joint-association confirmation binds the exact space, safe account representations, contributors, source/profile/link/disclosure versions, and intended effect; a decline or stale/mismatched commit reveals no response, creates no association, and changes no authority. |
| `VT-94-269` | Release automation blocks joint-association confirmation unless the exact `SG-93-096` disclosure version has Product Owner approval and automated presence/version/scope assertions pass; `SRV-94-004/014` determines accessibility and meaning. |
| `VT-94-270` | The additional `SG-93-097` every-contributor pre/immediate dissolution notice and every contributor objection/veto/delay/deadlock path remain absent until `RI-93-019` is explicitly decided; the existing `CA-92-011` safe attempt/outcome notification and audit still occur, no UI/API/job/copy/documentation implies an unapproved contributor position, and the current dissolution path remains covered by `VT-94-267`. |

## 7. Manual evidence packages

| ID | Evidence package | Minimum artifact and reviewer | Gates |
| --- | --- | --- | --- |
| ME-94-001 | Policy enforcement architecture | Typed request/decision contract, enforcement inventory for every route/worker, policy/version propagation and invalidation SLO; architecture + security review | `RG-94-003` |
| ME-94-002 | Deployment/trust topology | Network/workload/store/key/provider boundaries, identities, region/residency, encryption/KMS, subprocessors, observability; architecture + security | `RG-94-006` |
| ME-94-003 | Queue contract set | One producer/consumer/purpose schema per queue with retries/DLQ/replay/purge; architecture + reliability + security | `RG-94-005` |
| ME-94-004 | Cache/search/report design | Indexed fields, partition/auth keys, completeness, timing defense, TTL/SLO, invalidation/rebuild; architecture + security/privacy | `RG-94-003` |
| ME-94-005 | Audit/telemetry schemas | Taxonomies/allowlists, integrity, access tiers, retention/deletion, customer views, product-analytics absence; security + privacy | `RG-94-009` |
| ME-94-006 | Financial physical schema | Profile/connection/account/link/projection/association/non-association constraints and migrations; architecture + product/security | `RG-94-004` |
| ME-94-007 | Provider evidence set | Exact identity/financial/notification/hosting/storage/logging fields/events/contracts/retention/deletion/compromise evidence; CBD-15 route + security/privacy/legal as applicable | Applicable provider gate |
| ME-94-008 | Operational-access tooling | Staff identities, mediated screens/APIs, distinct duties, JIT expiry, evidence/review/notice, bypass denials; security + operations | `RG-94-009` |
| ME-94-009 | Client/channel inventory | Routes/storage/service worker/static shell, templates/provider fields/destinations/locators/opt-outs/callbacks/locales/custody; client + privacy/security | `RG-94-007` |
| ME-94-010 | Rate/resource decision | Concrete values, safe keys, distributed counters, uniform response/timing tolerance, anti-lockout design, capacity basis; product + architecture/security/reliability | `RG-94-005` |
| ME-94-011 | Export design | Three schemas, formats, package storage/KMS, exact lifetimes, rate limits, download UX, deletion proof; product + security/privacy | `RG-94-008` |
| ME-94-012 | Disposition/deletion ledger | `DI` × location × event matrix, legal basis/exception, provider/backup coverage, action/duration/SLA/steward/test; lifecycle + privacy/legal/security | `RG-94-010/013` |
| ME-94-013 | Recovery architecture and rehearsal | Backup inventory, isolated environment, duty separation, RTO/RPO, ledger reconciliation, authority non-resurrection, independent review | `RG-94-009/010` |
| ME-94-014 | Copy inventory | Every safety/consent/authority/custody/error/recovery string, trigger/audience/channel/locale, source requirement, approval, test; product/content/privacy | `RG-94-012` |
| ME-94-015 | Traceability/build evidence | Bidirectional source-risk-requirement-test-gate-follow-up graph, versioned build/config/provider locators, unresolved blockers | `RG-94-001/016` |

## 8. Specialist reviews and operational exercises

Attendance, an informal opinion, or a generic policy does not close these
reviews. Each result MUST meet the exact CBD-91 §6.1 or CBD-93 §8.1 closure
contract and record jurisdictions/populations/scope/limitations.

| ID | Review/exercise | Required result | Gate |
| --- | --- | --- | --- |
| SRV-94-001 | Jurisdiction-scoped legal/privacy review | Exact launch markets, retention/deletion/preservation/notice/provider/non-user-data duties, prohibited claims, exceptions, re-review triggers | `RG-94-013`; `EG-91-022`, `EG-93-002/008` |
| SRV-94-002 | Domestic-violence/coercive-control advocacy review | Compare mandatory notice alternatives, affected populations, failure modes, limitations; Product Owner disposition without population-wide claim | `RG-94-014`; `EG-93-001` |
| SRV-94-003 | Survivor-informed research | Approved safe protocol, findings/dissent/sampling limits/non-generalizability, decision log; no safety-proof claim | `RG-94-014`; `EG-93-005` |
| SRV-94-004 | Accessibility review | Safety-critical screen reader, magnification/casting, cognitive/duress, irreversible action, keyboard/focus/error recovery, defect retest | `RG-94-012`; `EG-93-003` |
| SRV-94-005 | Sensitive-content privacy decision | Uniform/declared model, classes/surfaces, read/write/display/export/notification rules and negative tests | `RG-94-012/014`; `EG-93-004` |
| SRV-94-006 | Read-observation monitoring decision | Approve complete fields/purpose/basis/access/retention/deletion/review/misuse/test package or record prohibition | `RG-94-009/014`; `EG-93-006` |
| SRV-94-007 | Deletion-window product decision | Deterministic comparison/disposition for objection/delay/export/other options and every actor/state/deadlock case | `RG-94-010/012`; `EG-93-007` |
| SRV-94-008 | Platform-safety operating review/exercise | Scope, prohibited powers, intake/severity/SLO/staffing/on-call, evidence, communication, escalation/appeal, audit/training, exercised cases | `RG-94-011`; `EG-93-009` |
| SRV-94-009 | Notification/recovery channel architecture review | Compromise/retirement/recovery/stale-token/no-channel outcomes prove separation of destination and recovery authority | `RG-94-002/007`; `EG-93-010` |
| SRV-94-010 | Independent public-launch security review | Before public product launch, independently challenge diagram completeness, boundary placement, STRIDE coverage, technical triage, evidence-gap scope, and resulting CBD-94 mitigations/residual decisions; trace and incorporate accepted findings | `RG-94-015`; public product launch only |
| SRV-94-011 | Penetration test — optional pending future decision | If separately commissioned, record implementation scope, methods, findings, owner/date/retest and limitations across auth/session/IDOR/cross-tenant/provider/webhook/queue/export/audit/operations/lifecycle/recovery | No current release gate; this version does not require a penetration test for Private MVP or public launch |
| SRV-94-012 | Incident-response/tabletop | Identity/provider/secret/cross-tenant/notification/deletion/backup incidents, evidence/notice/duty separation and lessons tracked | `RG-94-009` |
| SRV-94-013 | Recovery exercise | Isolated restore, deletion-ledger reconciliation, non-resurrection, return-to-service authorization | `RG-94-010` |
| SRV-94-014 | Content/localization review | Product Owner copy approval, privacy/legal as applicable, normative localization equivalence, no legacy authority terms | `RG-94-012` |
| SRV-94-015 | Final CBD-95 review | Bidirectional IDs, CBD-12 reconciliation, limitations, accepted risks, follow-up work, change-control and readiness decision | `RG-94-016` |

## 9. Operational security monitoring and escalation

These controls detect abuse or control failure without enabling product
analytics or customer-behavior profiling. Signals are purpose-separated S3
security evidence under `AN-92-*`; they use pseudonymous correlation, exclude
customer content and denied values, and are unavailable to customer roles and
routine support. Every alert records build/config versions, severity, owner,
response SLO, disposition, and the §3.8 escalation route from the governing
register.

| Monitor | Privacy-bounded signal and required detection | Accountable owner / escalation | Verification |
| --- | --- | --- | --- |
| MON-94-001 Authentication/recovery | Content-free counts/classes for failed authentication, recovery, assurance, replay, stale-session use, subject/client/action binding mismatch, and revocation propagation breach | Security; Critical for systemic bypass, High for scoped control failure | `VT-94-001–008`; `PR-94-001` |
| MON-94-002 Invitations/rates | Invitation enumeration/replay/atomicity failures, rate-control bypass, distributed-counter drift, and attacker-induced legitimate-recipient lockout without recording recipient existence or relationship | Identity; Critical for unauthorized membership, High for enumeration/availability | `VT-94-009–017/065–068`; `PR-94-002/003` |
| MON-94-003 Authorization/isolation | Cross-subject/profile/space/resource/field/purpose denial classes, stale-policy commits, cache/index/report scope mismatch, and canary disclosure; never record denied content | Security Architecture; Critical for confirmed cross-scope access, High for enforcement drift | `VT-94-018–035` |
| MON-94-004 Provider/provenance | Callback authentication/replay mismatch, wrong connection/profile/link route, provider identity ambiguity, provenance break, disconnect/unlink partial state, and provider compromise/outage class | Financial Data; Critical for wrong-subject/cross-space authority, High for integrity/availability | `VT-94-036–053`; provider evidence `ME-94-007` |
| MON-94-005 Queues/resources | Unknown purpose/version, forged workload, duplicate effect, ordering/expiry breach, poison/DLQ/redrive failure, retry ceiling, quota exhaustion, and calculation revision mismatch | Reliability; Critical for cross-scope/authority effect, High for corruption or sustained denial | `VT-94-054–068`; `PR-94-002` |
| MON-94-006 Channels/exports | Stale or unauthorized send, template/schema drift, callback authority attempt, repeated/abnormal package generation/download, wrong-recipient/expired locator, and package deletion failure without message/package content | Notifications for channels; Security for exports; Critical for confirmed unauthorized disclosure, High for control failure | `VT-94-077–111`; `PR-94-004` |
| MON-94-007 Secrets/keys | Secret canary in prohibited sink, unexpected secret-store reader/writer, rotation/revocation failure, old-key use, backup exclusion failure, and custody-duty combination | Security; Critical immediate stop-ship and incident route | `VT-94-069–076`; `ME-94-002/007/013` |
| MON-94-008 Audit/operations | Audit omission/integrity alarm, exceptional-purpose denial/bypass, self-approval, excessive/expired grant, impersonation/moderation/transfer attempt, evidence mutation, or missed post-use review/notice | Security; Critical for undetected privileged mutation or authority bypass, High otherwise | `VT-94-112–132`; `ME-94-005/008` |
| MON-94-009 Lifecycle/recovery | Partial or stalled disposition, provider/processor timeout, deletion claim mismatch, backup-expiry breach, restoration outside isolation, stale-authority resurrection, and recreation collision | Data Lifecycle; Critical for terminal-deletion corruption/authority resurrection, High otherwise | `VT-94-133–153`; `PR-94-005`; `ME-94-012/013` |
| MON-94-010 Control/configuration drift | Deployed route/provider/template/locale/policy/schema/config differs from the version with passing evidence, required surface lacks instrumentation, or a prohibited analytics/comment/candidate feature becomes reachable | Security; reopen affected risks/gates immediately, Critical/High follows affected control | Build/config attestation in `ME-94-015`; applicable `VT/ME/SRV` rerun |

## 10. Requirement-to-verification completeness

| Requirement range | Implementation verification | Manual/specialist evidence |
| --- | --- | --- |
| `SR-94-001–011` | `VT-94-001–017` | `ME-94-001/002/007/010`; `SRV-94-009/010` |
| `SR-94-012–021` | `VT-94-018–035`, `VT-94-225–235` | `ME-94-001/004/005`; `SRV-94-010` |
| `SR-94-022–030` | `VT-94-036–053`, `VT-94-265/268` | `ME-94-002/006/007`; `SRV-94-001/010` |
| `SR-94-031–038` | `VT-94-054–068` | `ME-94-003/010`; `SRV-94-010` |
| `SR-94-039–043` | `VT-94-069–076` | `ME-94-002/007/013`; `SRV-94-010/012/013` |
| `SR-94-044–054` | `VT-94-077–096`, `VT-94-181–187` | `ME-94-007/009/014`; `SRV-94-002/004/009/014` |
| `SR-94-055–062` | `VT-94-097–111`, `VT-94-219–224` | `ME-94-011/012/014`; `SRV-94-001/004/010/014` |
| `SR-94-063–074` | `VT-94-112–132`, `VT-94-247–254` | `ME-94-005/008/014`; `SRV-94-006/008/010/012` |
| `SR-94-075–084` | `VT-94-133–153`, `VT-94-201–224/264` | `ME-94-007/012/013`; `SRV-94-001/007/010/012/013` |
| `SR-94-085–101` | `VT-94-154–180`, `VT-94-255–269` | `ME-94-014`; `SRV-94-002–005/014` |
| `SR-94-102–109` | `VT-94-188–200` | `ME-94-014`; `SRV-94-004/008/014` |
| `SR-94-110–124` | `VT-94-201–224/264/267/270`, `VT-94-133–153` | `ME-94-012–014`; `SRV-94-001/002/004/007/014` |
| `SR-94-125–140` | `VT-94-225–254`, `VT-94-018–035/112–132` | `ME-94-004/005/010/014`; `SRV-94-002/006/010/014` |
| `SR-94-141–145` | `VT-94-009–017`, `VT-94-154–180`, `VT-94-255–263` | `ME-94-014`; `SRV-94-004/014` |
| `SR-94-146–147` | `VT-94-265–270` | `ME-94-006/014/015`; `SRV-94-002–004/014`; explicit `RI-93-019` Product Owner decision for `SR-94-147` |

Every `SR-94-001–147` has implementation and/or manual/specialist evidence. A
requirement whose nature is product/legal/safety judgment still needs
automated tests proving the decided behavior and the absence of unapproved
behavior.

## 11. Release-evidence rules

1. Critical and High risks require all applicable implementation suites plus
   manual architecture/provider/operational evidence and every specialist
   review required by the applicable current gate. Optional `SRV-94-011` is not
   implied by this rule.
2. A suite Pass is scoped to its recorded code, policy, schema, infrastructure,
   provider, template, locale, and configuration versions.
3. Any material change to those inputs invalidates affected Pass results until
   impact analysis and rerun are complete.
4. Release evidence MUST list open tests, blocked tests, quarantined failures,
   exceptions, and untested surfaces; totals alone are insufficient.
5. A feature excluded from release MUST have route-level enforcement and a
   negative test proving the endpoint/job/provider/operation is unavailable.
6. Production evidence collection MUST follow `OP-92-*` and MUST NOT create a
   routine staff-content path or product analytics.
7. Security evidence retention/access/deletion follows the approved S3 schema,
   not the customer-audit or product-measurement path.
8. `RG-94-015` and `SRV-94-010` apply to public product launch only. Neither an
   independent review nor a penetration test is a Private-MVP prerequisite in
   the approved CBD-92 policy baseline preserved by this document.

## 12. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 1.0 | August 16, 2026 | Alexander Wohlford as Product Owner, Claude assisting | **Approved as CBD-94 v1.0.** Promoted the v0.1.4 content unchanged; the only edits were status, version, the governing-register reference, and one self-descriptive “draft” wording in §11. No case, requirement, fixture, parameter, monitor, evidence package, gate, or execution class was altered by approval. Approval fixes the verification obligations as the controlling baseline; it records no `Pass`, `Fail`, or `Blocked` result and closes no gate. Every `VT`, `ME`, `SRV`, `PR`, and `MON` route remains unexecuted. Confluence publication follows the merge to `main`. | **Product Owner approved** |
| 0.1.4 | August 16, 2026 | Claude with Alexander Wohlford as Product Owner | Product Owner disposition on `RV-94-012`: bound the ten `FX-94-*` fixture families to the verification suites that consume them by adding a Fixtures column to §5, so every family is consumed by at least one suite and every suite names at least one family. Recorded that the column is a minimum and that §3 still requires each individual evidence record to name its exact fixture, variants, and preconditions. No case, requirement, parameter, monitor, evidence package, gate, or source mapping was changed. | Product Owner method decision incorporated; complete inventory remains draft |
| 0.1.3 | August 16, 2026 | Claude | Independent exhaustive-review corrections. `RV-94-013`: moved `VT-94-217` from the `A` automated class to the `M` mixed class, because its own §6.7 text makes `SRV-94-014` the deciding judgment on copy meaning, which §5 forbids an `A` case from doing; the mixed set is now 42 cases. `RV-94-017`: removed the redundant `SR-94-035–036` restatement from the `VT-94-054–068` suite row, where those requirements are already inside `SR-94-031–038`. No case, requirement, fixture, parameter, monitor, evidence package, or gate mapping was added or removed. Open review finding `RV-94-012` (unreferenced `FX-94-001–010` fixture families) remains recorded in the traceability record §13 and is not resolved here. | Editorial and classification correction only; complete inventory remains draft |
| 0.1.2 | August 16, 2026 | Codex | Reconciled CBD-93 v1.1 by adding seven contiguous cases for `AB-93-083–086`, `SG-93-096/097`, and `RI-93-019`; mapped `SR-94-146/147`; and retained the public-launch-only independent-security policy and optional penetration-test status. | Source reconciliation only; complete inventory remains draft |
| 0.1.1 | August 16, 2026 | Codex with Alexander Wohlford as Product Owner | Substantive-review revision: preserved the public-launch-only independent-security gate and made penetration testing optional pending a future decision; classified automated versus mixed cases; separated automated assertions from human judgment; defined coverage-combination rules and five stable parameter contracts; and added ten privacy-bounded operational-security monitors with escalation routes. | Product Owner gate decision incorporated; complete inventory remains draft |
| 0.1.0 | August 16, 2026 | Codex | Initial inventory defining 263 ordered automated cases, 15 manual evidence packages, 15 specialist reviews/exercises, reusable fixtures, evidence schema, and complete `SR-94-001–145` verification mapping. | Draft for internal review |
