# CBD-107 — Connection and Provenance Boundary Specification

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Defines the financial-connectivity posture CBD-107 evaluates aggregators against. It selects no provider; the candidate evaluation measures against it, and CBD-108 makes the selection. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-107](https://cobudget.atlassian.net/browse/CBD-107) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Candidate Shortlist and Gate Evaluation v1.0; Transaction Lifecycle and Coverage Map v1.0; Operational and Cost Assessment v1.0; Acceptance Criteria Traceability v1.0 |
| Confluence page | [CBD-107 — Connection and Provenance Boundary Specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/13500417) |
| Repository baseline | `c15b526` |
| Last updated | August 21, 2026 |

## 1. Purpose and authority

CBD-107 must determine *"whether Plaid or another managed aggregator best meets
the Private-MVP transaction and consent requirements."* A provider cannot be
measured against a posture that has not been described, so this document
describes it first and the candidate evaluation measures providers against it.

Every decision carries a stable `FC-107-*` key and cites the approved source
that forces it, following the convention CBD-103 established with `TD-103-*`,
CBD-104 with `ID-104-*`, CBD-105 with `DP-105-*`, and CBD-106 with `ED-106-*`.
Where no approved source settles a question, this document says so and records
an open item rather than inventing a value.

The authoritative inputs are the `CA-92-001`–`CA-92-013` connection and account
contracts, the `SYS-92-009` financial provider boundary with trust boundaries
`TB-92-010` and `TB-92-011`, the approved CBD-102 method, the approved CBD-103
topology, the CBD-91 data classification, the CBD-94 requirements, the approved
CBD-72 permission model, and `docs/architecture.md`. `FC-107-*` numbers are
never reused or renumbered.

**This is the category where the approved contracts are most detailed and the
provider models differ most.** `CA-92-*` already fixes what a connection is, who
owns it, and what may be merged. What this document adds is the integration
posture those contracts imply — how reauthentication happens, what may be used
as a canonicalization key, how synchronization recovers, and what a provider
must never be allowed to become.

## 2. What this document does not do

* It selects no provider and provisions nothing. CBD-108 selects.
* It sets no retention value, no reconciliation cadence, and no rate ceiling.
  §11 records what owns each.
* It closes no `EG-91-*` evidence gap. `EG-91-005` (provider selection, exact
  objects, lifecycle events, cursor and webhook behaviour, provider retention,
  institution quality), `EG-91-012` (canonical joint-account association,
  provider identity reliability, deduplication evidence, multi-connection
  precedence, disconnect effects), and `EG-91-021` (financial-profile versus
  budget-space stewardship) remain open and are consumed here as explicit
  unknowns.
* It does not close `FU-95-012`. That P0 row names four issues including this
  one, and its closure evidence is provider sandbox evidence, signed-webhook
  fixtures, reconciliation and deduplication results, and an exercised
  disconnect — none of which a design record supplies.
* It selects no institution-quality scoring algorithm. `FC-107-018` records why.
* It implements nothing. Every decision is a design record, and `EX-102-007`
  applies.

## 3. What CoBudget never holds

`FC-107-001` — **CoBudget never collects, transmits, proxies, or stores
institution credentials, and the authentication ceremony belongs to the provider
or to the institution.**

This is the least negotiable decision in the package. `docs/architecture.md`
§ Security baseline states it without qualification, `DI-91-010` records that
raw online-banking credentials are never collected, and `HG-102-056` is one of
the three gates exception rules §5.2 places beyond any exception — *"There is no
control that compensates for collecting them."*

Two consequences the evaluation measures:

* The credential ceremony runs in a provider-hosted or institution-hosted
  context. A provider whose integration requires CoBudget to render a credential
  field, or to relay one, fails outright and no compensating control is
  available.
* An institution-hosted OAuth ceremony is **stronger** than a provider-hosted
  one, because the credential never reaches the aggregator either. The
  evaluation records which model each candidate uses rather than treating both
  as equivalent, since the difference is exactly one subprocessor's worth of
  credential exposure.

**Source:** Architecture § Security baseline; `DI-91-010`; `DF-91-004`;
`TB-92-010`; `HG-102-056`; exception rules §5.2.

`FC-107-002` — **Provider secret material is S4, field-encrypted, separated from
ordinary application data, and absent from every ordinary surface.**

Access tokens, refresh tokens, client secrets, and webhook verification secrets
are `DI-91-010` and `DI-91-051` material. They rest only in the field-encrypted
secret boundary `TD-103-017` and `TD-103-018` establish, with keys in the KMS
boundary `DP-105-002` places under separated custody.

They never appear in logs, telemetry, analytics, exports, audit payloads,
support views, error messages, or a budget space. `HG-102-014` gates this, it is
non-exceptable, and it is a residence rule rather than a control strength to be
traded.

One provider-shaped hazard the evaluation checks: an SDK that mandates its own
plaintext local token store forecloses this and fails `HG-102-058`. A provider
whose refresh token rotates on every use adds a durability requirement — the new
token must be persisted transactionally with its use, or the connection is lost.

**Source:** `DI-91-010`, `DI-91-051`; `HG-102-014`, `HG-102-058`; `TD-103-017`,
`TD-103-018`; `TB-92-017`; CBD-91 §2.1.

## 4. The connection is the unit of authority

`FC-107-003` — **One connection is one authorizer's one login at one
institution, and it carries its own everything.**

`CA-92-002` is unusually explicit: each provider connection has exactly one
authorizer and retains its own consent, secret, cursor, revocation state,
observations, provenance, repair, and disconnect lifecycle *"even when another
connection appears to represent the same logical account. No connection inherits
another connection's authority."*

The integration therefore stores, per connection: the consent record and its
version, the secret material, the cursor or synchronization watermark, the
revocation and health state, the source observations, and the provenance edges.
Nothing in that list is shared, inherited, or defaulted from another connection,
and two connections that happen to reach the same bank account remain two
connections with two independent lifecycles.

`CA-92-012` permits many connections per financial profile and exactly one
profile per account subject in Private MVP. `DM-102-009` prices 1.6 connections
per contributing subject at Base, so the multi-connection case is the ordinary
case rather than an edge.

**Source:** `CA-92-002`, `CA-92-012`; `HG-102-057`; CBD-72 `PM-72-011`,
permission 31; `DI-91-011`; `DM-102-009`.

`FC-107-004` — **Connection state lives in the authorizer's financial-profile
domain, and no budget-space role reaches it.**

`CA-92-001` places provider consent, connection-private configuration, tokens,
cursors, source observations, revocation state, and private provenance in the
individual authorizer's authority domain, and states that budget-space role or
ownership never grants access to them. A Primary Owner of a budget space has no
more access to a Collaborator's connection than any other member does — which is
none.

Exposure to a budget space happens only through the `CA-92-004` account-to-space
link, which is independently authorized, versioned, and revocable, and which
carries only the safe account representation. The link is not the connection,
and unlinking is not disconnecting: `CA-92-007` separates the two effects, and
`FC-107-006` below implements them.

**Source:** `CA-92-001`, `CA-92-004`, `CA-92-009`; CBD-72 `PM-72-011`;
`EG-91-021` consumed as open.

`FC-107-005` — **Reauthentication repairs the existing connection in place. It
never removes and re-creates it.**

This decision exists because of a finding the evaluation records in detail: on at
least one candidate, the provider account identifier is stable across an in-place
repair and **not** stable across a remove-and-relink. The same candidate
documents that its persistent identifier is available at three named institutions
only. Whether that candidate satisfies `HG-102-062` therefore depends on which
path CoBudget takes, and this decision takes the safe one.

Operationally:

* A connection that needs reauthentication enters a repair state and is repaired
  through the provider's in-place update path, preserving the connection
  identity, its cursor, and its account identifiers.
* Remove-and-recreate is reserved for a deliberate disconnect under
  `FC-107-006`, never used as a repair shortcut, and never triggered
  automatically.
* Where a provider offers no in-place repair path, that is a material finding
  recorded against the candidate rather than a behaviour CoBudget adopts.

`CA-92-002` already lists *repair* as a distinct lifecycle stage alongside
consent, revocation, and disconnect. This decision gives that word an
implementation.

**Source:** `CA-92-002`; `HG-102-062`; `DI-91-011`; `DI-91-055`; evaluation
finding F2.

`FC-107-006` — **Disconnect terminates exactly one connection, unlink affects
exactly one space, and a terminal state is never resurrected.**

`CA-92-007` separates the two effects and this decision keeps them separate:

| Action | Effect | Never |
| --- | --- | --- |
| **Unlink** | Stops future access, routing, and link-authorized work for one budget space | Does not revoke the provider connection |
| **Disconnect** | Terminates the authorizer's one connection and revokes its provider authorization | Does not terminate or transfer another connection, including one reaching the same institution |

A connection whose authorizer is permanently gone reaches the `CA-92-013`
orphaned terminal state, which no other party may adopt, reauthorize, or
resurrect. `PA-92-006` and `TB-92-016` make terminal deletion non-resurrectable
generally; `HG-102-064` gates the provider's ability to support it.

Retained history after either action follows the approved CBD-91 §7.2 interim
policy and remains subject to its legal and lifecycle gates. This document does
not narrow that policy.

**Source:** `CA-92-007`, `CA-92-013`; CBD-72 permission 32, `OD-72-04`;
`HG-102-063`, `HG-102-064`; `PA-92-006`; `TB-92-016`; `DI-91-011`.

## 5. Identity, canonicalization, and provenance

`FC-107-007` — **Canonicalization uses a provider identifier documented stable
across refresh and repair, or it uses explicit confirmation. It never uses weak
signals.**

`CA-92-003` permits observations within one financial profile to share a
normalized identity *"only after reliable provider identity or explicit
confirmation"*, and states that *"weak identifiers, names, balances, timing, or
membership alone never merge records."*

That is two routes, and the choice between them is a provider property:

1. **Reliable provider identity.** An identifier the provider documents as
   stable across token refresh and across reauthentication. `HG-102-062` gates
   its availability. Where it exists, canonicalization is automatic.
2. **Explicit confirmation.** Where the provider offers no such identifier, or
   offers one only at some institutions, canonicalization falls back to the
   `CA-92-010` unanimous confirmation contract for joint associations and to the
   authorizer's own confirmation within a profile.

**The fallback is a real cost, not a formality.** It puts a confirmation step in
front of a person, and `CA-92-010` requires that confirmation to name the exact
space, representations, association effect, duplicate-prevention behaviour, and
absence of cross-space authority. A provider whose identifiers force the fallback
routinely is materially more expensive in customer friction than one whose
identifiers do not, and the evaluation records which is which.

`EG-91-012` holds provider identity reliability and deduplication evidence open,
and nothing here narrows it.

**Source:** `CA-92-003`, `CA-92-008`, `CA-92-010`; `HG-102-062`; `EG-91-012`;
`DI-91-068`; CBD-72 `PM-72-009`.

`FC-107-008` — **Every normalized record retains reversible edges to each
contributing connection's immutable source observation.**

`DI-91-068` fixes that every independently authorized connection retains a
distinct observation set with its exact connection and authorizer provenance
permanently bound. `CA-92-003` requires the normalized presentation to retain
reversible edges to every contributing connection.

So the data model is two-layer and the layers never collapse:

* **Source observations** — immutable, per connection, preserving the provider's
  own fields as received. Corrections arrive as new observations or as
  provider-signalled modifications, never as in-place edits that destroy the
  prior state.
* **Normalized presentation** — derived, reversible, and able to name every
  observation that contributed to it.

`HG-102-061` gates the provider half: source fields must be retrievable as
immutable observations with stable per-observation identifiers, and a provider
that *silently* mutates or re-keys history fails. The word doing the work is
*silently* — a provider that re-keys with an explicit change signal is
recoverable, and the evaluation distinguishes the two cases carefully, because
at least one candidate re-keys with a signal and at least one documents that its
per-observation identifier is not unique on its own.

**Source:** `CA-92-003`, `CA-92-005`; `DI-91-068`, `DI-91-015`; `HG-102-061`;
CBD-72 `PM-72-009`; `TB-92-011`.

## 6. Synchronization

`FC-107-009` — **Incremental synchronization is cursor-based where a cursor
exists, and the cursor is connection-scoped — exactly one per connection.**

`DI-91-055` binds the cursor to the exact connection, and `HG-102-060` gates the
provider's cursor as connection-scoped rather than account- or
institution-global.

One candidate offers a subtlety worth deciding in advance rather than
discovering: its cursor is per connection by default, but filtering a sync call
by account creates a *separate* incremental stream and therefore a separate
cursor, obliging the caller to maintain account-and-cursor pairs. CoBudget uses
the connection-level cursor only. Per-account cursors would multiply the
watermark state `DI-91-055` binds to one connection and would make a missed page
on one account silently diverge from the others.

**Source:** `DI-91-055`; `HG-102-060`; `CA-92-002`, `CA-92-006`; Architecture
§ Synchronization flow step 3; evaluation finding F3.

`FC-107-010` — **Where a provider offers no cursor and no change stream,
synchronization is poll-and-diff, and that is recorded as a cost rather than
treated as equivalent.**

Not every candidate offers a delta. At least one exposes transactions only
through offset, limit, and time parameters, with no provider-issued cursor and no
modification or removal signal, and delivers webhooks for consent and
maintenance events but not for data.

Against such a provider, CoBudget must fetch a time window, compare it against
stored source observations, and derive additions, modifications, and removals
itself. That is a working design, and it is materially more CoBudget-side
machinery than consuming a delta: it needs a comparison key, a window policy, a
correction rule, and its own removal-detection semantics, all of which are
exactly the surface `FU-95-012` requires evidence for.

This decision does not disqualify such a provider. It requires that the
difference be priced in the `WR-102-027`–`WR-102-031` solo-operator subscore and
named in the operational assessment, rather than absorbed silently into "the
adapter handles it".

**Source:** `HG-102-060`; `DI-91-057`, `DI-91-068`; `WR-102-027`–`WR-102-031`;
Architecture § Synchronization flow; `FU-95-012`; evaluation finding F4.

`FC-107-011` — **Pending and posted are distinct observations joined by explicit
provider evidence, never merged on heuristics.**

This is the decision CBD-107's first acceptance criterion is really asking
about, and the candidates differ more here than anywhere else. Across the
evaluated set, a pending transaction that posts may keep its identifier,
may be deleted and replaced by a new identifier with no linkage field, may be
marked with a superseding status and replaced, or may be linked to its successor
by an explicit back-reference field.

CoBudget's rule does not depend on which:

* A pending observation and a posted observation are **two observations**. The
  posted one does not overwrite the pending one.
* They are joined only by evidence the provider supplies — a stable identifier
  carried across the transition, an explicit back-reference to the pending
  record, or an explicit superseding-status signal.
* **Absent that evidence, they are not joined.** Amount-and-date proximity,
  merchant-string similarity, and timing are exactly the weak signals
  `CA-92-003` forbids for merging, and the fact that they usually work is not a
  reason to rely on them for financial records people are held accountable
  against.
* An unjoined pending observation that the provider stops returning is resolved
  by the `FC-107-013` reconciliation pass, not by inference at read time.

The consequence is deliberate and visible: on a provider that supplies no linkage
evidence, some pending-to-posted pairs will not be auto-joined, and the
presentation must be honest about that rather than guess. `CBD-11` preserves
historical periods and `docs/architecture.md` § Key data rules requires exact
integer minor units; neither tolerates a silent double-count.

**Source:** `CA-92-003`; `DI-91-015`, `DI-91-018`, `DI-91-068`; `HG-102-061`;
CBD-107 acceptance criteria 1 and 2; Architecture § Key data rules; evaluation
finding F5.

`FC-107-012` — **Webhooks are verified and replay-rejected at the edge before
the payload becomes durable, and a webhook never carries authority.**

`TD-103-016` already fixes the placement: signature verification and replay
rejection happen at the `TD-103-012` edge, before anything is written.
`DI-91-012` fixes what survives — a verified envelope binding the minimum event,
provider, and connection identity, with no raw transaction payload and no
reusable signature material retained.

What a webhook may do is narrow:

* It may signal that a connection has changes, that consent state moved, that
  reauthentication is required, or that the provider had an incident.
* It may **not** be the source of financial data, create or reactivate an
  account-to-space link, establish authority, or change product state.
  `CA-92-006` states it directly: a provider identifier, webhook, normalization
  match, or prior link cannot create or reactivate a link.
* A webhook that fails verification is dropped and counted, never partially
  applied.

Provider mechanisms vary across the evaluated set from an asymmetric signature
with a body hash and an issued-at claim, through a shared-secret HMAC, to
endpoint authentication with no payload signature at all. The design does not
depend on which, but the differences are security-dimension rubric material and
the evaluation records them per candidate.

**Source:** `DI-91-012`; `HG-102-059`; `EP-92-006`; `TD-103-012`, `TD-103-016`;
`CA-92-006`; Architecture § Synchronization flow steps 1–2; evaluation
finding F6.

`FC-107-013` — **Scheduled reconciliation is the recovery path, and it is not
optional.**

`docs/architecture.md` § Synchronization flow step 8 requires a scheduled
reconciliation pass to recover from missed webhooks, and this posture leans on it
harder than a webhook-only design would: it is also how a poll-and-diff provider
works at all (`FC-107-010`), how an unjoined pending observation is resolved
(`FC-107-011`), and how a silently failed connection is detected.

**No approved source sets its cadence**, its lookback window, or its rate
ceiling. `RL-92-007` and `ME-94-010` hold rate and resource values open
generally; `OI-107-004` records these specific ones. The provider-side ceiling
interacts: several candidates meter or throttle refresh calls, so the cadence is
also a cost line, recorded at `CT-102-007`.

**Source:** Architecture § Synchronization flow step 8; `TD-103-002`,
`TD-103-008`; `RL-92-007`; `ME-94-010`; `DI-91-055`.

## 7. Raw payload, derived state, and what members see

`FC-107-014` — **Raw incremental-sync payloads are service-only, minimized, and
deleted once durable source observations exist.** *(Settles Config gate
`HG-102-067`.)*

`DI-91-057` confines the connection-specific incremental-sync payload to a
service-only encrypted processing boundary and prohibits it from reaching any
customer role, ordinary support, logs, analytics, or exports. The staging copy
exists to be normalized and then to stop existing.

**Source:** `DI-91-057`; `HG-102-067`; `TB-92-011`; `TD-103-021`, `TD-103-022`.

`FC-107-015` — **Budget-space members see an allowlisted health status and
nothing else about a connection.** *(Settles Config gate `HG-102-066`.)*

`DI-91-056` allows eligible members a derived status — whether a linked account
is current, delayed, needs the authorizer, or is permanently orphaned. Provider
failure codes, institution configuration, cursor internals, retry counts, and
the authorizer's personal circumstances are not in that allowlist and are not
inferable from it.

`docs/architecture.md` requires the interface to show connection health and the
last successful provider update, and to describe bank feeds as *automatically
updated rather than guaranteed real-time*. Both are satisfied inside the
allowlist.

**Source:** `DI-91-056`; `HG-102-066`; CBD-72 permission 33; `CR-91-011`;
Architecture § Synchronization flow.

## 8. Retention, deletion, and exit

`FC-107-016` — **Provider-held records have a disclosed retention and an
exercised deletion path, and every completion claim states its horizon.**

`HG-102-065` gates written, dated retention and deletion evidence for consent,
account, transaction, and connection records, and requires a deletion to be
exercised. `DI-91-045` carries completion on the lifecycle ledger, and
`SR-94-124` makes a claim that cannot state its horizon fail closed.

One candidate documents that revoking consent makes previously retrieved data
unretrievable from the provider. That does **not** threaten CoBudget's retained
history, because `DI-91-068` source observations are already stored
CoBudget-side — but it does confirm why they must be. A design that re-fetched
history on demand would lose it at revocation.

**Source:** `HG-102-065`, `HG-102-012`; `DI-91-011`, `DI-91-045`, `DI-91-068`;
`SR-94-121`, `SR-94-124`; `EG-91-005`; CBD-91 §5.1 provider row, §7.2.

`FC-107-017` — **Exit is an adapter boundary, and exit means every user
re-authorizes.**

The rubric weights portability highest in this category at 16, for a reason
§4.1 states plainly: exit means every user re-authorizes every connection
through a new provider-hosted ceremony, and there is no data-migration
substitute.

The posture minimizes what else is lost:

* The **normalized schema is CoBudget's**, not the provider's. Source
  observations are stored with their provider fields preserved, so history
  survives a provider change even though live connections do not.
* Provider code lives in the adapter, never in domain modules — the seam
  `TD-103-001` and `ID-104-019` already keep.
* A provider implementing a published interchange standard is materially more
  portable than one with a proprietary schema, and `WR-102-024` scores that.
* Exit cost is therefore dominated by customer re-authorization friction rather
  than by egress, and `CT-102-014` records it as such.

**Source:** `WR-102-023`–`WR-102-026`; rubric §4.1; `TD-103-001`, `TD-103-027`;
`ID-104-019`; `DI-91-068`.

## 9. Institution-quality signals

`FC-107-018` — **Institution-quality signals are recorded as dated observations
with their source. No scoring algorithm is selected.**

CBD-107's fifth deliverable asks for a provider-signal record for future
`FF-007` research *"without selecting a scoring algorithm"*, and this decision
holds that line.

What is recorded per candidate: which institution-health or connection-status
signals the provider publishes, at what granularity, whether they are
per-institution or per-connection, whether history is available, and what the
provider states about their meaning. What is **not** decided: any weighting,
threshold, ranking, or composite score.

The reason is `CR-91-006` in miniature — a signal is an observation, and turning
observations into a quality judgement is a modelling decision `FF-007` owns.
Recording the raw availability now means `FF-007` starts with an inventory
instead of a survey.

**Source:** CBD-107 deliverable 5; `FF-007`; `DI-91-056`; `CR-91-006`;
`EG-91-005`.

## 10. Gate disposition carried by this specification

| Gate | What this specification settles | What remains a provider question |
| --- | --- | --- |
| `HG-102-014` (Config) | `FC-107-002` — no S4 value on any ordinary surface. Non-exceptable | Nothing; this gate is CoBudget's |
| `HG-102-066` (Config) | `FC-107-015` — the `DI-91-056` allowlist | Whether provider failure detail can be mapped out |
| `HG-102-067` (Config) | `FC-107-014` — service-only staging, deleted after normalization | Whether the payload can be confined at all |
| `HG-102-056` | `FC-107-001` — CoBudget renders no credential field | Whether the ceremony is provider- or institution-hosted |
| `HG-102-057` | `FC-107-003` — per-connection state | Whether the provider's model is per-authorization independent |
| `HG-102-058` | `FC-107-002` — encrypted secret boundary | Whether the SDK mandates its own token store |
| `HG-102-059` | `FC-107-012` — verify and replay-reject at the edge | Whether the webhook is signed at all |
| `HG-102-060` | `FC-107-009` — one cursor per connection | Whether a cursor exists and is connection-scoped |
| `HG-102-061` | `FC-107-008` — two-layer model with reversible edges | Whether observations are immutable and stably keyed |
| `HG-102-062` | `FC-107-005`, `FC-107-007` — repair not re-link; confirmation fallback | Whether a stable identifier exists |
| `HG-102-063`/`064` | `FC-107-006` — one connection, one terminal state | Whether the provider supports per-connection revocation and irreversible termination |
| `HG-102-065` | `FC-107-016` — horizon-stating claims | Whether retention is disclosed and deletion evidenced |

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-107-001 | `FC-107-005` requires an in-place repair path, which not every candidate documents. | Where none exists, `HG-102-062` cannot be satisfied by CoBudget design and becomes a genuine provider limitation. CBD-108 weighs it. |
| OI-107-002 | `FC-107-007`'s confirmation fallback has no approved copy, and `FU-95-017` owns the strings. | The fallback is specified as a rule, not as an experience. No confirmation flow ships from this document. |
| OI-107-003 | `FC-107-011` accepts that some pending-to-posted pairs will not be auto-joined on providers that supply no linkage evidence. | This is a deliberate correctness-over-tidiness choice. The presentation consequence — and whether it is acceptable to the Product Owner — is a CBD-11/CBD-12 question this document raises rather than settles. |
| OI-107-004 | Reconciliation cadence, lookback window, and refresh-rate ceiling have no approved source (`RL-92-007`, `ME-94-010`). | `FC-107-013` fixes that reconciliation is mandatory, not how often. The value is also a cost line, so it is chosen with pricing rather than before it. |
| OI-107-005 | `EG-91-005`, `EG-91-012`, and `EG-91-021` are consumed as open. | Provider-specific inventory and threats, deduplication evidence, and the stewardship question remain outstanding. This document narrows none of them. |
| OI-107-006 | This specification has been reviewed by no one but its author, nothing in it is built, and no provider was contacted. | Design record only. `FU-95-012` remains open and financial connectivity remains blocked by it. |
