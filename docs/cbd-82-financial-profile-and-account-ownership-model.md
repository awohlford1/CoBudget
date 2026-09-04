# CBD-82 — Financial Profile and Linked-Account Ownership Model

| Field | Value |
| --- | --- |
| Status | **Draft v0.1 — Product Owner review and approval required. Physical schema, provider evidence, and tests remain gated by `OI-82-001` and `OI-82-002`** |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Jira | [CBD-82](https://cobudget.atlassian.net/browse/CBD-82) |
| Parent | [CBD-22](https://cobudget.atlassian.net/browse/CBD-22) |
| Governing account model | CBD-92 `CA-92-001`–`CA-92-012`, approved v1.0 and amended to v1.0.1 |
| Governing permission model | CBD-72 v0.1.54 — §2.1, §2.2, §5.3, §6 |
| Data inventory | CBD-91 v1.0.5 — `DI-91-013`, `DI-91-046`, `EG-91-012`, `EG-91-021` |
| Architecture decision closed | `RF-92-006`, in part; see §13 |
| Scenario catalog | `docs/cbd-82-account-lifecycle-scenario-catalog.md` |
| Traceability | `docs/cbd-82-acceptance-criteria-traceability.md` |
| Mechanical audit | `python3 scripts/audit-cbd-82.py` |
| Last updated | September 3, 2026 |

> **Authority.** CBD-92 `CA-92-*` decides the model and CBD-72 decides the permissions. This document makes both implementable: it names entities, identifiers, cardinalities, states, and outcomes so that a sibling task can build and test the boundary without making a product decision. Where it appears to change a governing rule, the governing source wins and this document is wrong.

## 1. Purpose and contract

`RF-92-006` records that the `CA-92-*` account model and the `PA-92-*` deletion semantics are established while the concrete schema and executable contracts are not. This document supplies the missing half that is decidable now: the logical model. It does not select a database, define physical tables, or choose a provider.

The test it must pass is the one `RF-92-006` states. No single identifier, event, connection, normalization decision, link actor, confirmation, lifecycle event, restoration, or stale link may grant, correlate, route, retain, restore, or terminate authority in another profile or another space. Every rule below exists to make one of those impossible.

## 2. Scope and authority

In scope: logical entities and their fields; identifiers and their stability; cardinality and uniqueness; the authority matrix; the account-to-space link contract; canonicalization and joint projection; lifecycle states and the outcome matrix; prohibitions; retention and audit obligations.

Out of scope: physical schema and migrations, the profile and preferences API, provider synchronization, and user interface. Those are sibling CBD-22 tasks and consume this document rather than revising it.

Two domains exist and neither is subordinate. **`EG-91-021` is answered here:** the financial profile is the authoritative steward of connections, canonical accounts, and provenance; the budget space is the authoritative steward of its own overlays and visibility. Neither reads the other's private state, and the account-to-space link is the only bridge. That answer is not new — it is `CA-92-001` and `CA-92-005` read together — but `EG-91-021` asked for it to be stated as a single decision, and §5 states it.

## 3. Logical entities

| ID | Entity | Authoritative domain | Identifier | Notes |
| --- | --- | --- | --- | --- |
| `EN-82-01` | Account subject | Identity | Opaque, stable, never reused | The authenticated person. A later account reusing a contact identifier is a different subject (`PA-92-007`) |
| `EN-82-02` | Financial profile | Profile | Opaque; one active per subject | The authority domain for everything below it. No selector, transfer, merge, split, nesting, or sharing exists |
| `EN-82-03` | Provider connection | Profile | Opaque, profile-scoped | Carries its own consent, secret reference, cursor, revocation state, repair state, and lifecycle. Exactly one authorizer |
| `EN-82-04` | Connection observation | Profile | Opaque, connection-scoped | The immutable provider-supplied record. Never edited; corrections arrive as later observations |
| `EN-82-05` | Profile-local canonical account | Profile | Opaque, profile-scoped | The normalized account. Belongs to exactly one profile and never spans profiles |
| `EN-82-06` | Provenance edge | Profile | Composite of account and connection | Reversible. Records which connection contributed which observations to which canonical account, and on what basis |
| `EN-82-07` | Account-to-space link | Shared boundary | Opaque; versioned | Binds exactly one canonical account, one contributing subject, and one budget space. The only bridge between domains |
| `EN-82-08` | Budget-scoped joint projection | Budget space | Opaque, space-scoped; versioned | References two or more current links for presentation and duplicate prevention in one space only |
| `EN-82-09` | Projection source reference | Budget space | Composite of projection and link | Reversible. Removing one leaves the others intact |
| `EN-82-10` | Non-association decision | Budget space | Opaque, space-scoped | Records a rejected association bound to the exact evidence version that was rejected |
| `EN-82-11` | Space-local account overlay | Budget space | Composite of link and space | Alias, classification, and other space-specific presentation. Never alters a provider fact |
| `EN-82-12` | Joint-association proposal | Budget space | Opaque; versioned; expiring | Carries every contributor, version, candidate, disclosure version, and expiry for a `CA-92-010` ceremony |

Identifiers are opaque and stable. None encodes a provider identifier, an account number, a subject, or a space, because an identifier that encodes its context becomes a correlation channel across the boundary this model exists to hold.

## 4. Cardinality and uniqueness

| ID | Rule | Source |
| --- | --- | --- |
| `CD-82-01` | One account subject has exactly one active financial profile. Zero is the state before first use; two is prohibited | `CA-92-012` |
| `CD-82-02` | One financial profile has zero or more provider connections. One connection belongs to exactly one profile | `CA-92-012` |
| `CD-82-03` | One connection has exactly one authorizer, who is the profile subject. The authorizer is fixed for the life of the connection | `CA-92-002` |
| `CD-82-04` | One connection produces zero or more observations. One observation belongs to exactly one connection | `CA-92-002` |
| `CD-82-05` | One profile has zero or more canonical accounts. One canonical account belongs to exactly one profile | `CA-92-012` |
| `CD-82-06` | One canonical account carries one or more provenance edges. One edge names exactly one canonical account and exactly one connection | `CA-92-003` |
| `CD-82-07` | One canonical account has zero or more account-to-space links. One link names exactly one account, one contributing subject, and one budget space | `CA-92-004` |
| `CD-82-08` | A canonical account has at most one active link per budget space. A second link to the same space is a version of the first, not a sibling | `CA-92-004` |
| `CD-82-09` | One budget space has zero or more joint projections. One projection belongs to exactly one space | `CA-92-008` |
| `CD-82-10` | One projection references two or more current links, each through exactly one source reference. A projection of one is not a projection and is dissolved automatically | `CA-92-008`, `CA-92-011` |
| `CD-82-11` | Two links in one projection never share a contributing subject. A person contributes at most one source to a given projection | `CA-92-008` |
| `CD-82-12` | A non-association decision names exactly one space, one candidate set, and the evidence version rejected. It does not span spaces | `CA-92-011` |

**The prohibited relations are as load-bearing as the permitted ones.** There is no entity joining two profiles, no entity joining two spaces, no application-wide canonical account, and no path from a projection in one space to anything in another. If a future requirement seems to need one, it is a change to `CA-92-*`, not to this document.

## 5. The authority matrix

Five actors appear, and the model works only because they are kept distinct.

| ID | Rule |
| --- | --- |
| `AU-82-01` | The **profile subject** is the sole actor for connection creation, repair, reauthorization, disconnect, and every private connection field. No budget role reaches these, ever, including a Primary Owner of a space the account is linked to |
| `AU-82-02` | The **connection authorizer** is the profile subject and does not change. Ownership transfer, membership loss, role change, archival, and deletion never move it (`CA-92-002`, CBD-12-AC28) |
| `AU-82-03` | The **contributing member** is a subject who holds both a profile account and a current membership in the space. Only they may create a link from their own account to that space (`CA-92-009`) |
| `AU-82-04` | A **Primary Owner or Co-owner** may unlink any account-to-space link in their space and may dissolve a projection there. That authority stops at the boundary: it grants no connection access, no repair, no reauthorization, no disconnect, no provenance view, and nothing in another space (`CA-92-009`, `CA-92-011`) |
| `AU-82-05` | A **Collaborator** may link their own account and may unlink only their own link. They hold no owner unlink authority |
| `AU-82-06` | A **Viewer or Accountability Partner** may do neither. They read what their role permits through §7 and nothing more |
| `AU-82-07` | Link creation requires no separate owner approval. The contributing member's own authority is sufficient, because they are sharing their own account into a space they already belong to (`CA-92-009`) |
| `AU-82-08` | Termination is two-sided. The contributing subject or a current Primary Owner or Co-owner may unlink; either is sufficient and neither needs the other (`CA-92-009`) |
| `AU-82-09` | Every operation rechecks current role, entitlement, link version, projection version, and lifecycle state at commit. A check at request time is not a check |
| `AU-82-10` | Nobody may link another person's account. There is no delegation, no invitation, and no owner-initiated link on a member's behalf |

## 6. The account-to-space link

The link is the only bridge between the two domains, so its contract carries the whole boundary.

| ID | Rule |
| --- | --- |
| `LK-82-01` | A link starts default-deny. Until it exists and is active, the space sees no account, no balance, no transaction, and no signal that an account exists |
| `LK-82-02` | Creation requires the contributing member's current authority, a current membership, and an explicit disclosure of what the space will see, what will synchronize, what unlinking stops, and what history is retained afterwards |
| `LK-82-03` | The link carries a version. Every read, route, projection, and derived value resolves against the current version, and a version change invalidates open work rather than mutating it |
| `LK-82-04` | The link grants the safe account representation and future routing for that space only. It grants no private connection control, no source provenance, no membership, no ownership, and nothing in another space |
| `LK-82-05` | Absence, ambiguity, staleness, or removal fails closed. A missing link is never treated as an unrestricted link |
| `LK-82-06` | Removal is atomic, immediately suppresses link-authorized work, recomputes projections and derived values, notifies safely, and is audited |
| `LK-82-07` | A provider identifier, webhook, normalization match, or previously removed link cannot create or reactivate a link. Reactivation is a new link with a new version and a new disclosure |

## 7. Canonicalization and joint projection

Two different questions are often confused, and separating them is most of the safety.

**Within one profile** (`AS-82-01`–`AS-82-03`), observations from different connections may share a normalized canonical account when approved reliable provider identity or the subject's explicit confirmation establishes it. Every contributing connection keeps a reversible provenance edge. Weak identifiers, names, balances, timing, and membership never merge records on their own.

**Across profiles** (`AS-82-04`–`AS-82-08`), nothing merges. A budget-scoped joint projection is a presentation and duplicate-prevention device inside one space. It has no application-wide identity, reveals no other profile or space, and is recomputed whenever a source, connection, or link changes.

| ID | Rule |
| --- | --- |
| `AS-82-01` | Profile-local canonicalization requires approved reliable provider identity or the subject's explicit confirmation. Nothing else suffices |
| `AS-82-02` | Every canonical account retains a reversible edge to each contributing connection and its observations. Canonicalization is never destructive |
| `AS-82-03` | A canonical split restores separate accounts and preserves both histories. It never deletes an observation |
| `AS-82-04` | A joint projection requires every source to be explicitly linked to that space first. A link is a precondition, not a consequence |
| `AS-82-05` | Where reliable provider identity does not establish the association, every distinct contributing subject must confirm explicitly, against the exact space, representations, effect, and boundary. A non-contributing owner cannot substitute for a contributor (`CA-92-010`) |
| `AS-82-06` | The proposal binds every contributor, version, candidate, disclosure version, and expiry. All confirmations and versions are rechecked at one atomic commit |
| `AS-82-07` | A decline, expiry, membership change, link change, missing confirmation, or ambiguous participant set leaves every candidate separate, and reveals neither another person's response nor a private association |
| `AS-82-08` | A rejected association records a space-scoped non-association decision bound to the evidence version rejected, so the same stale signal cannot immediately recreate it. Re-association needs materially new approved evidence or a fresh unanimous confirmation |

## 8. Lifecycle and the outcome matrix

Seven events change what a space can see, and the value of this table is that they differ.

| ID | Event | Space visibility | Future sync and routing | Retained history | Connection | Other spaces |
| --- | --- | --- | --- | --- | --- | --- |
| `OC-82-01` | Budget unlink | Stops for that space | Stops for that space | Retained under CBD-91 §7.2 | Untouched and still active | Unaffected |
| `OC-82-02` | Projection dissolution | Sources appear separately | Continues per link | Retained; deduplication recomputed | Untouched | Unaffected |
| `OC-82-03` | Provider disconnect or revocation | Marked not syncing | Stops for that connection only | Retained with provenance | Terminated for that connection only | Unaffected except through shared links |
| `OC-82-04` | Authorizer membership loss | Stops for that space | Stops through that authorizer's links to that space | Retained and attributed | Untouched; authority never transfers | Unaffected |
| `OC-82-05` | Budget-space archival | Stops active use | Stops generating | Preserved entirely | Untouched | Unaffected |
| `OC-82-06` | Reconnect | Requires a new link | Resumes only through a new active link | Reconciled, never resurrected | New or repaired connection | Unaffected |
| `OC-82-07` | Account-subject deletion | Stops immediately | Stops immediately | Per `PA-92-006` disposition | Revoked and destroyed as supported | Links removed; no space inherits authority |

| ID | Rule |
| --- | --- |
| `LC-82-01` | Unlink and disconnect are different events affecting different scopes, and conflating them is the defect this table exists to prevent (`CA-92-007`) |
| `LC-82-02` | Authorizer membership loss stops synchronization through that connection for that space, preserves imported records and provenance, and never transfers connection authority or activates another connection automatically (CBD-12 in-scope; `CA-92-002`) |
| `LC-82-03` | A partial failure in any multi-step operation leaves the prior state intact. There is no half-linked, half-projected, or half-dissolved state |
| `LC-82-04` | Concurrency is resolved by version, not by arrival order. A stale actor's commit fails and is audited rather than overwriting a newer decision |

## 9. Prohibitions

| ID | Prohibited without exception |
| --- | --- |
| `PB-82-01` | Any application-wide, cross-person canonical account |
| `PB-82-02` | Automatic transfer of connection authority by any route |
| `PB-82-03` | Linking an account a person does not hold in their own profile |
| `PB-82-04` | Creating or reactivating a link from a provider event, identifier, match, or prior link |
| `PB-82-05` | Merging accounts on weak identifiers, names, balances, timing, or shared membership |
| `PB-82-06` | Exposing a projection, association, or non-association in one space to another space |
| `PB-82-07` | Disclosing another contributor's confirmation, decline, or private provenance |
| `PB-82-08` | Any budget role reaching a private connection field, secret, cursor, or repair path |
| `PB-82-09` | Treating a missing, stale, or ambiguous link as permission |
| `PB-82-10` | Resurrecting purged data through restore, replay, retry, or reconnect |

## 10. Data, retention, and notice

| ID | Requirement |
| --- | --- |
| `DR-82-01` | Every retained field carries a purpose, an audience, a sensitivity class, and a retention rule or a named gate. A field with none of these is not persisted |
| `DR-82-02` | Provider secrets, cursors, and private configuration live only in the profile domain and are never projected into a space, an export, an audit payload, or a notice |
| `DR-82-03` | Provenance edges are permitted immutable records. Customer copy never promises their removal, and never promises remote deletion of anything a recipient already holds |
| `DR-82-04` | Retained history after unlink or disconnect follows the CBD-91 §7.2 interim policy and remains subject to its gates. This document sets no retention period |
| `AE-82-01` | Link creation, link removal, projection formation, projection dissolution, source removal, non-association, disconnect, reconnect, and every denial produce an audit event bound to actor, space, versions, and outcome |
| `AE-82-02` | Audit payloads carry no provider secret, no raw observation, no other person's private state, and no cross-space correlation |
| `AE-82-03` | Notices are safe by the channel that carries them: the `NT-92-001` fixed body on push and SMS, the `EM-92-003` ceiling on lifecycle email, and full detail only on the authenticated in-app surface |

## 11. Handoff to sibling tasks

A sibling task implementing persistence, APIs, or synchronization consumes §3 through §10 and needs no new product decision. Where it finds one missing, that is a defect in this document and a change here, not a local choice.

## 12. Open issues

| ID | Issue | Status and effect |
| --- | --- | --- |
| `OI-82-001` | Physical schema, indexes, partitioning, and migration remain unmade. `RF-92-006` also names provider association signals and identity-verification implementation, which depend on the CBD-15 selection that has not happened | Open. This document closes the logical half of `RF-92-006` only, and says so in §13 rather than implying more |
| `OI-82-002` | No deterministic fixtures or negative tests exist yet. The scenario catalog states rule-level expectations that test design implements, following the disposition CBD-72 used for the same question | Open under the CBD-94 verification inventory |
| `OI-82-003` | Retention periods for provenance edges, non-association decisions, and post-unlink history are not set here and remain with `EG-91-001` and CBD-91 §7.2 | Open. `DR-82-04` binds |
| `OI-82-004` | `EG-91-012` provider identity reliability is unresolved until a provider is selected, so `AS-82-01`'s "approved reliable provider identity" has a shape but no concrete test | Open under CBD-15 and CBD-107. Until it closes, `CA-92-010` unanimous confirmation is the only available path |

## 13. What this closes, and what it does not

`RF-92-006` names five things: the physical schema, provider association signals, identity-verification implementation, the final per-class deletion disposition, and executable sync and lifecycle contracts.

This document supplies the logical model beneath the last of those and answers `EG-91-021`. It does not supply the other four, and three of them cannot be supplied until a provider is selected. `RF-92-006` should therefore be narrowed rather than closed when this package is approved, in the same way `CR-91-008` was narrowed rather than closed: the part that was decidable is decided, and the part that waits on evidence still waits.

## 14. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1 | September 3, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft. Twelve entities, twelve cardinality rules, ten authority rules, seven link rules, eight association rules, a seven-event outcome matrix with four lifecycle rules, ten prohibitions, seven data and audit requirements, and four open issues. Answers `EG-91-021` by naming the financial profile steward of connections, accounts, and provenance and the budget space steward of its own overlays, with the account-to-space link as the only bridge. | Draft; Product Owner review required |
