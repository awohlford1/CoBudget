# CBD-107 — Acceptance Criteria Traceability and Review Record

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 21, 2026. Maps each CBD-107 acceptance criterion and deliverable to the exact evidence that answers it, and states plainly where the answer is a design record, a retrieved document, or an open question. §4 records a dependency the ticket states backwards. |
| Document version | 1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the 18 `FC-107-*` decisions, the screening and 27-gate evaluation with its verdicts and `EV-102-092`–`109` records, the lifecycle and coverage map with its `PS-107-*` register, the operational and cost assessment with its `CR4` unknowns, and this traceability record. It approves no provider, publishes no rubric score, performs no observation, connects to no institution, and selects no institution-quality scoring algorithm. It leaves `OI-107-001`–`021`, `OI-102-022`, `FU-95-012`, `EG-91-005`, `EG-91-012`, `EG-91-021`, and every `OQ-107` question open — including `OI-107-008`, the `HG-102-060` reading that would move three verdicts, which this approval deliberately does **not** settle. |
| Jira | [CBD-107](https://cobudget.atlassian.net/browse/CBD-107) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Connection and Provenance Boundary Specification v1.0; Candidate Shortlist and Gate Evaluation v1.2; Transaction Lifecycle and Coverage Map v1.0; Operational and Cost Assessment v1.0 |
| Confluence page | [CBD-107 — Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/13598721) |
| Repository baseline | `c689192` |
| Last updated | August 22, 2026 |

## 1. Package contents

| Document | Purpose |
| --- | --- |
| `docs/cbd-107-connection-and-provenance-boundary-specification.md` | The connection, provenance, and synchronization posture, as 18 `FC-107-*` decisions |
| `docs/cbd-107-candidate-shortlist-and-gate-evaluation.md` | Screening, 27-gate matrix over four candidates, findings F1–F6, evidence records `EV-102-092`–`109` |
| `docs/cbd-107-transaction-lifecycle-and-coverage-map.md` | Account-type coverage, the transaction lifecycle and data-field capability map, and the `PS-107-*` provider-signal register |
| `docs/cbd-107-operational-and-cost-assessment.md` | Volume and metering, connection operations, monitoring, outage behaviour, exit, and the `CT-102-*` structure with `CR4` unknowns |
| `docs/cbd-107-acceptance-criteria-traceability.md` | This record |
| `scripts/audit-cbd-107.py` | Mechanical guard over identifier resolution, matrix completeness, and the restated tallies |

The status vocabulary is the one CBD-103's traceability record §2 defined:
**Met**, **Met (design)**, **Partially met** — with no criterion marked Met on a
claim that lacks an evidence record or a cited approved source.

## 2. Acceptance criteria

### AC1 — Authorization-date reliability for pending expenses, and posted/settlement dates for all covered transaction types

**Status: Partially met.** The date-field half is answered thoroughly; the
"all covered transaction types" half is not, because account-type coverage was
retrieved for one candidate of four.

| Sub-criterion | Evidence |
| --- | --- |
| Authorization-date reliability | **Answered, and the answer is that it is not reliable.** C6 documents `authorized_date` as *"The date that the transaction was authorized"* and recommends it over `date`, but qualifies it *"when available"*, records `authorized_datetime` as *"returned for select financial institutions"*, and states that *"not all institutions provide pending transactions"* (`EV-102-092`). Reliability is institution-dependent and best-effort, and the provider says so |
| Pending expenses | Lifecycle map §4.1 maps the pending marker, posted marker, superseded marker, identifier behaviour and linkage evidence for all four candidates |
| Posted and settlement dates | Lifecycle map §4.2 tabulates occurrence and posting fields for all four: `authorized_date`/`date` (C6), `transacted_at`/`posted_at` (C7), `transactionDate`/`postedDate` (C8), `transactionTimestamp`/`postedTimestamp` (C9) |
| **The trap this criterion exists to catch** | C6's `date` is polymorphic — *"For pending transactions, the date that the transaction occurred; for posted transactions, the date that the transaction posted."* A period assignment computed from it moves when a transaction posts, silently changing a closed period's totals. Lifecycle map §4.2 and `OI-107-014` |
| All covered transaction types | **Not established.** Account-type schemas were retrieved for C6 only (`OQ-107-012`), so the date fields are not confirmed to behave identically across checking, savings and credit-card accounts on the other three |

### AC2 — Additions, modifications, removals, pending-to-posted, identity, duplicates, delayed/out-of-order events, cursors, webhook verification/replay, and recovery polling are evaluated

**Status: Met.** Every item on the list is evaluated with cited evidence.

| Sub-criterion | Where |
| --- | --- |
| Additions, modifications, removals | Finding F1. Only C6 exposes them as explicit streams (`EV-102-092`); the other three require poll-and-diff, and `FC-107-010` prices that |
| Pending-to-posted behaviour | Finding F3 and lifecycle map §4.1 — four candidates, four behaviours, only one with an explicit back-reference |
| Identity | Finding F2 — `HG-102-062`, with C6's stability contingent on the `FC-107-005` repair path and C9's native across re-link |
| Duplicates | `FC-107-007` canonicalization; `CA-92-002` guarantees two connections to one institution are independent, so duplicates are legitimate. Whether any provider deduplicates across connections is `OQ-107-015`, and `CA-92-003` means CoBudget must not rely on it either way |
| Delayed and out-of-order events | C7 documents it explicitly — *"It's possible to receive an earlier payload... after receiving a more recent payload"* — with a `revision` field and dedup guidance (`EV-102-097`). `FC-107-012` handles it at the edge for all candidates |
| Cursors | Finding F1 and `FC-107-009` — one cursor per connection, never per account, and only C6 has one at all |
| Webhook verification and replay | Finding F4 — four mechanisms across four candidates; `FC-107-012` verifies and replay-rejects at CoBudget's edge regardless |
| Recovery polling | `FC-107-013` makes scheduled reconciliation mandatory; operational §3.2 records the poll window must exceed the 15-day mutability horizon C8 documents |

### AC3 — CoBudget never receives banking credentials; tokens can be isolated, encrypted, revoked, and excluded from logs, analytics, exports, and audit payloads

**Status: Met (design).**

| Sub-criterion | Evidence |
| --- | --- |
| Never receives credentials | `FC-107-001`. `HG-102-056` is non-exceptable and remains `UNPROVEN` pending the traced flow, but finding F5 records that all four keep the credential away from CoBudget and that C9 additionally keeps it away from the aggregator (`EV-102-105`) |
| Tokens isolated and encrypted | `FC-107-002` places them in the `TD-103-017`/`TD-103-018` boundary. C9's own guidance agrees: the refresh token *"must be treated as highly confidential"* and belongs in *"encrypted credentials or server-side storage"* (`EV-102-106`) |
| Tokens revocable | Documented on C6 (`EV-102-094`), C8 (`EV-102-102`) and C9 (`EV-102-105`). The exercised disconnect is the `HG-102-063` observation |
| Excluded from logs, analytics, exports, audit | `HG-102-014` records `PASS (design)` on all four, settled by `FC-107-002`. Non-exceptable under exception rules §5.2 |

### AC4 — Independent authorizers, joint-account duplicate connections, disconnect, preserved history/provenance, consent, export, and deletion satisfy CBD-12/CBD-72

**Status: Met (design).**

| Sub-criterion | Evidence |
| --- | --- |
| Independent authorizers | **`HG-102-057` is the one gate all four candidates pass** (finding F6). C6's *"linking the same account at the same institution twice will result in two Items"* and C9's *"sub is only unique for each sign in"* are `CA-92-002` in vendors' own words |
| Joint-account duplicate connections | `FC-107-003` and `FC-107-007`; `CA-92-008` budget-scoped projection with `CA-92-010` unanimous confirmation where provider identity is not reliable |
| Disconnect | `FC-107-006` — unlink affects one space, disconnect terminates one connection, and `CA-92-013` orphan state is never resurrected |
| Preserved history and provenance | `FC-107-008` two-layer model; `DI-91-068` per-connection observations with reversible edges |
| Consent | `FC-107-004` places consent in the authorizer's financial-profile domain per `CA-92-001`; `CA-92-009` governs link creation |
| Export and deletion | `FC-107-016` and `FC-107-017`; operational §4 |

CBD-72 is satisfied through `PM-72-009`, `PM-72-011`, and permissions 31–33.
CBD-12's notification and visibility requirements reach this package through
`DI-91-056` and the approved CBD-74 boundary rather than directly.

### AC5 — Sandbox, contractual/API capability, observed institution quality, and assumptions are distinguished

**Status: Met.**

Operational §3.5 is this criterion in table form: API capability is an
`EV-102-*` record at Documented class against a named page; sandbox behaviour is
reserved at `EV-102-110`–`117` and not yet recorded; observed institution quality
is **not recorded at all** and is not obtainable by desk research; assumptions are
stated as open questions or open items and never as findings; and contractual
evidence was obtained for no candidate.

The criterion asks for the distinction, not for all four kinds of evidence, and
the distinction is drawn explicitly and applied throughout — most visibly in
lifecycle map §3.3, which refuses to treat published institution counts as
evidence.

### AC6 — Pricing covers access, connections/products, minimums, refresh/retry usage, support, and growth cliffs

**Status: Partially met.** The structure is complete and every figure is
`UNKNOWN`.

| Sub-criterion | Status |
| --- | --- |
| Access, connections and products | Structure recorded at operational §5.2, with the provider's own unit required before any figure |
| **Minimums** | Named as the term most likely to dominate at 61 connections — `CT-102-004`, not `CT-102-006`, is the watch line |
| Refresh and retry usage | Operational §5.3 — where refresh is metered, the poll cadence three of four candidates require *is* a price |
| Support | `WR-102-019`/`020` score it; `CR6` keeps it scored rather than priced; `OQ-107-022` adds the `HG-102-007` question of what support staff can see |
| Growth cliffs | Six recorded at operational §5.3, headed by the connections-versus-accounts unit mismatch the cost template warned about in advance |
| **Figures** | None. `OI-107-018` records why this is structural: aggregators do not publish this pricing, so closing it requires provider contact rather than more reading |

## 3. Deliverables

| Deliverable | Status | Where |
| --- | --- | --- |
| U.S. aggregator shortlist and hard-gate comparison | **Met.** Capability screen, carried set of four with stated grounds, 27-gate matrix, six findings | Evaluation §4–§7 |
| Checking, savings, and credit-card coverage assessment | **Partially met.** The requirement is scoped precisely and account types are documented for C6; the other three are `OQ-107-012`, and institution coverage is deliberately not measured because published counts are inadmissible under the evidence rules | Lifecycle map §3; `OI-107-013` |
| Transaction lifecycle and data-field capability map | **Met.** Four lifecycles side by side, the date-field analysis, and a ten-field capability map with unknowns marked rather than defaulted | Lifecycle map §4–§5 |
| Consent, ownership, reauthentication, revocation, deletion, webhook, cursor, sandbox, institution-health, support, cost, and adapter-exit assessment | **Partially met.** Every element is assessed; cost carries no figures and support is scored rather than priced | Specification; Operational |
| Provider-signal record for future `FF-007` research, without selecting a scoring algorithm | **Met.** Eleven `PS-107-*` rows with source and granularity, and §6.2 refuses two specific temptations by name | Lifecycle map §6 |

## 4. Dependencies — and one the ticket states backwards

| Dependency as stated | Disposition |
| --- | --- |
| Approved rubric | **Satisfied.** 27-gate matrix; verdicts per evidence register §3.3; `CR0`–`CR7` and `R1`–`R5` applied; `EV-102-092`–`131` block extends the register without collision |
| Approved CBD-69 through CBD-72 requirements | **Satisfied.** CBD-72 supplies `PM-72-009`, `PM-72-011` and permissions 31–33, and is Done. The CBD-69–71 cadence and period work is consumed indirectly: lifecycle map §4.2 raises a period-assignment consequence back to it at `OI-107-014` |
| **Completed CBD-14 provider-specific findings** | **Not satisfied — and it cannot be, because the dependency runs the other way.** |

CBD-92's own traceability records the direction: for `EG-91-005`–`006`,
*"Provider-independent CBD-92 can complete; vendor-specific risks/tests wait for
CBD-106/107 and CBD-15."* `EG-91-005` correspondingly holds *"Financial provider
selection, exact objects/IDs/payloads, lifecycle events, cursor/webhook
behavior, provider retention/deletion, and institution quality"* open and names
CBD-15/CBD-107 as its target.

So CBD-107 **produces** the provider-specific findings rather than consuming
them. The ticket's dependency line has it inverted, and waiting for CBD-14 to
supply what CBD-107 exists to create would deadlock both.

**This package follows the approved documents rather than the ticket text**, and
proceeds. The discrepancy is recorded here rather than silently worked around,
and `OI-107-021` carries the ticket correction. No approved document is
reinterpreted to reach this conclusion — CBD-92's traceability states it
directly.

## 5. Follow-up register disposition

**`FU-95-012` names CBD-107 as a target.** It is a **P0** row — the highest
priority in the register — covering *"Provider data, provenance, webhook
authenticity, and financial lifecycle"*, and its effect while open is that
*"Financial connectivity and provider-derived financial state are blocked."*

**This package does not close it.** The row's required closure evidence is
*"Provider sandbox evidence; signed-webhook fixtures; reconciliation/dedup
results; disconnect/revoke exercise; provenance UI/copy review"* — none of which
a design record and a documentary pass supply.

| Contributed | Still required for closure |
| --- | --- |
| `FC-107-008` defines the two-layer source-observation and normalized model with reversible provenance edges, and `FC-107-011` defines pending-to-posted handling | Reconciliation and deduplication results from a live sandbox |
| `FC-107-012` defines webhook verification and replay rejection at the edge, and finding F4 records what each candidate actually offers | Signed-webhook fixtures, including a forged and a replayed payload rejected in test |
| `FC-107-006` defines connection ownership, disconnect, and terminal state | An exercised disconnect and revoke on one of two connections |
| `FC-107-014` defines raw-payload custody, and `FC-107-002` least-privilege token handling | Provider sandbox evidence |
| Lifecycle map §5 defines the normalized schema's required fields and their sources | Provenance UI and copy review, which `FU-95-017` also gates |

`EV-102-118`–`120` are reserved in the evaluation for exactly this evidence. The
row's release block is unchanged by this package.

## 6. Consistency check against the approved decisions

| Approved decision | Source | Honoured by |
| --- | --- | --- |
| Never collect or store online-banking credentials | Architecture § Security baseline; `DI-91-010` | `FC-107-001`; non-exceptable per exception rules §5.2 |
| Connection stewardship stays in the authorizer's financial profile | `CA-92-001` | `FC-107-004` |
| Each connection has exactly one authorizer and inherits nothing | `CA-92-002`; `PM-72-011` | `FC-107-003`; `HG-102-057` passes on all four |
| Canonicalization requires reliable provider identity or explicit confirmation | `CA-92-003`; `CA-92-010` | `FC-107-007` |
| Normalized records retain reversible edges to every contributing connection | `CA-92-003`; `DI-91-068` | `FC-107-008` |
| A webhook cannot create or reactivate a link | `CA-92-006` | `FC-107-012` |
| Unlink and disconnect are separate effects | `CA-92-007` | `FC-107-006` |
| One financial profile per subject; many connections per profile | `CA-92-012` | `FC-107-003` |
| Orphaned connections reach a terminal state nobody may adopt | `CA-92-013`; `PA-92-006` | `FC-107-006`; `HG-102-064` remains `UNPROVEN` on all four |
| Cursor is bound to the exact connection | `DI-91-055` | `FC-107-009` — connection-level cursor only, never per account |
| Raw sync payloads never reach a customer role, support, logs, analytics or exports | `DI-91-057` | `FC-107-014`; `HG-102-067` `PASS (design)` |
| Members see only the allowlisted health status | `DI-91-056`; CBD-72 permission 33 | `FC-107-015`; `HG-102-066` `PASS (design)` |
| Verified webhook envelope retains no raw payload or reusable signature material | `DI-91-012` | `FC-107-012` |
| Webhook verification and replay rejection happen at the edge | `TD-103-016`; `EP-92-006` | `FC-107-012` |
| Scheduled reconciliation recovers missed webhooks | Architecture § Synchronization flow step 8 | `FC-107-013` |
| Integer minor units with a currency code | Architecture § Key data rules | Lifecycle map §5.1; **not yet confirmed on any candidate** — `OI-107-015` |
| Bank feeds are automatically updated, not guaranteed real-time | Architecture § Synchronization flow | Operational §2.2 |
| Deletion completion fails closed and states its limits | `SR-94-124` | `FC-107-016` |
| Unsupported provider fields are marked unsupported, not defaulted | `EG-91-005` interim position | Lifecycle map §5.3 |
| A provider name is a hypothesis until CBD-15 selects | `CR-91-006` | Evaluation §2; `FC-107-018` refuses a scoring algorithm on the same principle |

No approved decision is reopened, weakened, or reinterpreted by this package.

## 7. What this package does not establish

* **No provider is selected, recommended, or ranked.** All four hold
  `ELIGIBLE-PENDING-EVIDENCE`; CBD-108 selects.
* **`OI-107-008` is unresolved and it is the highest-consequence open item in
  the CBD-15 set.** `HG-102-060` has two defensible readings. On one, three of
  four candidates fail and become `INELIGIBLE` absent an exception, leaving a
  single eligible aggregator and pre-empting CBD-108's selection. This package
  records `UNPROVEN` for all four and refuses to decide by drafting.
* **Nothing was connected.** Nine pass tests require observation; no account was
  created, no institution connected, and no credential entered anywhere.
* **No price exists, and reading will not produce one** — `OI-107-018`.
* **Institution coverage is unmeasured**, and published counts are inadmissible
  (lifecycle map §3.3). CBD-108 must not read the gap as an advantage for any
  candidate.
* **Amount representation is unconfirmed on every candidate** despite being the
  field that carries money — `OI-107-015`.
* **`FU-95-012` stays open at P0**, and financial connectivity remains blocked
  by it.
* **Every cross-category X gate is `UNPROVEN`** for every candidate, with no
  inherited passes — `OI-107-009`.
* **Nothing is built.** Every `FC-107-*` decision is a design record, and the
  three `PASS (design)` gates are CoBudget obligations CBD-94 must prove.
* **No second person has reviewed this package**, and no provider was contacted.

## 8. Review record

| Property | Value |
| --- | --- |
| Reviewed by | Alexander Wohlford — Product Owner, August 21, 2026. |
| Independent review | None. |
| Provider contact | None. All evidence is desk research retrieved August 21, 2026. No account was created, no institution was connected, and no sandbox was exercised. |
| Mechanical verification | `scripts/audit-cbd-107.py`; `scripts/check-doc-vocabulary.py` |
| Limitations | Evaluation §3 (evidence ceiling), §3.1 (two recorded retrieval asymmetries); lifecycle map §3.2 and §3.3 (coverage); operational §5.1 (no prices, structurally); §7 above |

## 9. Open item raised by this record

| ID | Item | Effect |
| --- | --- | --- |
| OI-107-021 | The CBD-107 ticket lists *"completed CBD-14 provider-specific findings"* as a dependency. CBD-92's traceability states the opposite direction — *"vendor-specific risks/tests wait for CBD-106/107 and CBD-15"* — and `EG-91-005` names CBD-15/CBD-107 as the target that produces them. | **The ticket needs correcting**, not this package. Waiting for CBD-14 to supply what CBD-107 exists to create would deadlock both. This package followed the approved documents and proceeded, per §4. The correction is a Jira edit, applied directly when authorized; it requires no repository change and no Confluence synchronization. |

## 10. Revision record

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | August 21, 2026 | Initial approved package. |
| 1.1 | August 21, 2026 | Records that the CBD-103 cross-category documentary pass of the same date **moved nothing in this category, and could not have** — it was run at provider level against AWS, Azure and Google Cloud, and no category **F** candidate is one of them. Evaluation §3.1 now states the consequence: this package holds the largest block of open cross-category cells in the CBD-15 set, forty against twenty-six or fewer elsewhere, which is a retrieval-priority fact for CBD-108. Adds `OQ-107-023`, carrying the one result of that pass which does reach this category — that `HG-102-013`'s *"Silence fails"* concerns the **provider's** silence once its contract has been read, so the gate is `UNPROVEN` here rather than `FAIL` and reading the four aggregator DPAs is the only thing that can move it. **No record, gate outcome, verdict, tally, price, or `FC-107-*` decision changes.** |
| 1.2 | August 22, 2026 | Adds §3.2 and `OQ-107-024`: the `HG-102-011` sweep put the same question to all ten CBD-15 provider identities, and **all four candidates in this category withhold the material** — C6 behind a Trust Center request, C7 behind an NDA, C8 behind a privacy contact, C9 not at all (`EV-102-182`–`185`). None is a `FAIL`, because the gate fails a provider that will not enumerate and a gated list has not been shown to be refused. The consequence is a method question rather than an evidence one: **this category's documentary gap is not closable by desk research**, and `OI-103-022` puts that to the Product Owner. Adds `OQ-107-025`, recording C9's pass-through claim as worth testing and relied on for nothing. **No gate outcome, verdict or tally moves.** |

The v1.1 change adds no evidence and moves no outcome. It exists so that a
reader comparing the six categories does not mistake this package's lack of a
documentary-pass revision for an oversight: the pass was deliberately scoped to
the three hyperscalers, and this category shares no candidate with them.
