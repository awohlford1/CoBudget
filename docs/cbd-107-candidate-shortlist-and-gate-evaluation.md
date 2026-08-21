# CBD-107 — Financial-Data Connectivity Candidate Shortlist and Gate Evaluation

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Applies the approved CBD-102 method to U.S. financial-data aggregators. It selects no provider; CBD-108 does that. No candidate reaches `ELIGIBLE` until the authorized observations are performed — §3 records why. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-107](https://cobudget.atlassian.net/browse/CBD-107) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Connection and Provenance Boundary Specification v0.1; Transaction Lifecycle and Coverage Map v0.1; Operational and Cost Assessment v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `c15b526` |
| Last updated | August 21, 2026 |

## 1. Purpose

CBD-107's first deliverable is a U.S. aggregator shortlist and hard-gate
comparison. This document is that comparison. It measures candidates against the
27 CBD-102 hard gates that apply to category **F** — the 15 cross-category **X**
gates plus the 12 **F** gates — using the evidence classes and verdicts the
CBD-102 evidence register fixes, against the posture the companion Connection
and Provenance Boundary Specification describes.

## 2. What this document does not do

* It selects and recommends nothing; `CR3` and rubric `R1` settle order by
  verdict, not by score or cost.
* It provisions nothing, creates no account, and connects to no institution.
* It publishes no weighted rubric total, for the reasons CBD-103's evaluation §8
  records.
* It closes no `EG-91-*` evidence gap and does not close `FU-95-012`.
* It measures coverage and transaction-field capability only where a gate
  depends on them. The companion Transaction Lifecycle and Coverage Map carries
  CBD-107's second, third, and fifth deliverables.

## 3. The evidence ceiling — and why this category has the least of it

Nine of the 27 applicable pass tests are observation-bound: four **X** gates
(`HG-102-001`, `HG-102-004`, `HG-102-012`, `HG-102-015`) and five **F** gates.

| Gate | The observation its pass test names |
| --- | --- |
| `HG-102-056` | *"The consent flow is traced"* |
| `HG-102-059` | *"A forged and a replayed webhook are both rejected in test"* |
| `HG-102-060` | *"Cursor semantics are documented and observed to be per connection"* |
| `HG-102-063` | *"A disconnect is exercised on one of two connections"* |
| `HG-102-065` | *"Written, dated retention and deletion evidence is obtained and a deletion exercised"* |

**This is the lowest observation-bound share of any category evaluated so far** —
nine of 27 at 33%, against eleven of 24 in email, ten of 27 in hosting, nine of
25 in identity, and eight of 24 in PostgreSQL. Five of the twelve **F** gates can
be settled from documentation, and this evaluation settles nine of those twenty
documentary opportunities outright. Category F rewards reading, because
aggregators publish detailed integration documentation and the gates ask about
data-model properties a specification can state.

**The remedy for the rest already exists.** `OI-103-008` authorizes
non-production evaluation accounts holding only synthetic data, and states that
it extends to the sibling categories. Every candidate below offers a sandbox with
fictional institutions, so the observations need no real bank and no real
credential. `OI-107-007` records the one category-specific guardrail: a sandbox
institution is the only acceptable target, and no evaluator's own bank
credentials are entered anywhere.

### 3.1 Symmetry

Five questions were put to all four candidates and answered from each vendor's
own documentation: the connection model and its per-authorization independence,
webhook authenticity, transaction identifier behaviour across the
pending-to-posted transition, incremental-synchronization mechanism, and account
identifier stability. Those five carry findings F1 through F4 and F6.

**Two questions were not symmetric, and the asymmetry is recorded rather than
smoothed.** Token custody guidance (`HG-102-058`) was retrieved for C9 only, and
account identifier stability across re-link was retrieved for C6 and C9 but not
for C7 or C8. Both gaps are documentation-retrieval gaps rather than product
findings, both are carried as `OQ-107-004` and `OQ-107-005`, and neither is
allowed to advantage a candidate: C9's `HG-102-058` pass is recorded with a
limitation stating that the same question was not put to the others.

**No provider-level records are reused.** C6, C7, C8 and C9 are provider
identities that appear in no other CBD-15 category, so every cross-category **X**
gate starts from nothing. §6.1 shows the consequence.

## 4. Screening

### 4.1 The screen

Following the capability screen CBD-104 §4.1 established, category F screens on
one published, checkable property: **does the provider's published catalog offer,
first-party, every capability class the boundary specification consumes?**

| # | Capability class | Boundary decision it serves |
| --- | --- | --- |
| 1 | Managed U.S. aggregation across checking, savings, and credit-card accounts | CBD-15 premise; deliverable 2 |
| 2 | A credential ceremony CoBudget never renders or relays | `FC-107-001`; `HG-102-056` |
| 3 | Per-authorization connections with independent lifecycle | `FC-107-003`; `HG-102-057` |
| 4 | Tokens CoBudget can hold in its own encrypted boundary | `FC-107-002`; `HG-102-058` |
| 5 | Transaction retrieval with per-observation identifiers | `FC-107-008`; `HG-102-061` |
| 6 | Per-connection revocation | `FC-107-006`; `HG-102-063` |
| 7 | A sandbox with fictional institutions | Ticket AC5; §3 observations |

**A screen is not a verdict.** Nothing below is recorded as `INELIGIBLE`, and
every screening row is reversible.

### 4.2 The carried set

Four candidates are carried, one more than the sibling categories. The ticket
asks specifically *"whether Plaid or another managed aggregator"* fits, which
makes a two-candidate comparison too thin to answer the question, and the
category contains two genuinely different access models rather than one:

* **Aggregator model** — the provider holds the institution relationship and
  presents a normalized API. C6, C7 and C8.
* **Data-access-network model** — the consumer authenticates directly with their
  institution over OAuth, and the network brokers permissioned API access under
  an interchange standard. C9.

Carrying only aggregators would leave the model that most directly satisfies
`HG-102-056` — the one gate that may never be excepted — unmeasured. Carrying
C9 also surfaces the trade the aggregator model hides: the strongest credential
posture in the set comes with the weakest synchronization model in the set, and
CBD-108 needs both halves of that.

| ID | Candidate | Composition evaluated |
| --- | --- | --- |
| **C6** | Plaid | Transactions product; Link for the credential ceremony including update mode; `/transactions/sync` cursor; Item-scoped access tokens; signed webhooks |
| **C7** | MX | Platform API; MX-hosted connect widget; members as connections; background aggregation with the aggregation webhook |
| **C8** | Mastercard Open Finance (Finicity) | Data Connect for the ceremony; Transaction Aggregation with date-range retrieval; consent receipts; Data Connect webhooks |
| **C9** | Akoya | Data Access Network on the FDX interchange standard; institution-hosted OAuth/OIDC; Transactions and Balances products; consent and maintenance notifications |

Each composition is one plausible arrangement of that provider's published
product, not the only one.

### 4.3 Screened out

| Candidate | Missing capability class | Basis |
| --- | --- | --- |
| Direct institution integrations without an aggregator | 1 | Contradicts the managed premise of CBD-15 and multiplies every gate by the number of institutions. `DM-102-010` prices 61 connections at Base across an unbounded institution set; a per-institution integration is not reachable at that scale by one operator. |
| Screen-scraping-only providers with no institution-permissioned path | 2 | Where the only access method requires the consumer to hand credentials to the provider for replay, the `HG-102-056` question becomes materially harder and `DI-91-010`'s prohibition is under continuous pressure. Not evaluated and **not** screened out as a class; no claim is made about any specific vendor's methods, and `OQ-107-001` carries confirmation of which access methods each carried candidate actually uses. |

Other U.S. aggregators with published documentation — Yodlee, Teller, and
others — were **not evaluated and are not screened out**. No claim is made about
their catalogs, and `OQ-107-002` carries the option of evaluating a fifth if
CBD-108 wants one.

## 5. Gate evaluation method

Outcomes are `PASS`, `UNPROVEN`, or `FAIL` per evidence register §3.3. The three
gates marked **Config** in the catalog for this gate set — `HG-102-014`,
`HG-102-066` and `HG-102-067` — are recorded `PASS (design)` where the boundary
specification settles CoBudget's side and no evidence of provider foreclosure
exists. A `PASS (design)` is a statement about provider eligibility, not evidence
that CoBudget built the control.

Category F carries **two** Config gates of its own, more than any other category.
That is a property of the contracts: `HG-102-066` error mapping and
`HG-102-067` raw-payload confinement are things CoBudget does to provider output
rather than things a provider supplies.

## 6. Comparison matrix

`OBS` marks a gate blocked on the §3 observations. `DOC` marks one documentation
or a contract can settle. `CFG` marks a Config gate.

### 6.1 Cross-category gates

| Gate | Kind | C6 Plaid | C7 MX | C8 Mastercard | C9 Akoya | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| HG-102-001 telemetry allowlist | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. No candidate's telemetry surface was retrieved. |
| HG-102-002 correlation identifiers | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-107-003` |
| HG-102-003 purpose separation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OQ-107-003` |
| HG-102-004 behavioural capture off | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. Concerns each vendor's own console. |
| HG-102-005 no standing credential | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. No provider-level record is reused — §3.1. |
| HG-102-006 separable custody | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OI-102-022` still gates practice. |
| HG-102-007 no routine staff path | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OI-102-005` flags this gate as assertion-prone, and it matters more here than anywhere: these providers hold `DI-91-057` payloads. |
| HG-102-008 no impersonation | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. `OI-102-005` |
| HG-102-009 staff-access evidence | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. No aggregator equivalent of a cloud access-transparency log is known to exist; `OQ-107-006` asks the question rather than assuming the answer. |
| HG-102-010 encryption in transit and at rest | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not compiled to the pass test's algorithm-and-custody standard. C9's TLS 1.2 floor is incidentally recorded in `EV-102-105`. |
| HG-102-011 region and subprocessors | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | No dated subprocessor list obtained for any candidate. `OQ-107-007` |
| HG-102-012 evidenced deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. `HG-102-065` is this gate's category-F instance. |
| HG-102-013 contractual backup behaviour | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Not retrieved. |
| HG-102-014 S4 out of ordinary surfaces | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `PASS (design)` | `FC-107-002`; `TD-103-017`, `TD-103-018`. Non-exceptable under exception rules §5.2. |
| HG-102-015 append-only evidence | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. `TD-103-030` places CoBudget's own audit evidence in the datastore. |

### 6.2 Financial-data connectivity gates

| Gate | Kind | C6 Plaid | C7 MX | C8 Mastercard | C9 Akoya | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| HG-102-056 provider-hosted ceremony | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — the pass test traces the flow. **Two models, not one**: C9 documents institution-hosted OAuth where the credential reaches neither CoBudget nor the network (`EV-102-105`); C6, C7 and C8 use a provider-hosted ceremony. See §7.5. Non-exceptable. |
| HG-102-057 per-authorization independence | DOC | **`PASS`** | **`PASS`** | **`PASS`** | **`PASS`** | The one gate all four pass. `EV-102-094`, `EV-102-098`, `EV-102-102`, `EV-102-106`. See §7.6. |
| HG-102-058 token in CoBudget's encrypted boundary | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | **`PASS`** | `EV-102-106`: C9 instructs that the refresh token *"must be treated as highly confidential"* and be kept in *"encrypted credentials or server-side storage"*. **The same question was not put to C6, C7 or C8** — this is a retrieval asymmetry, not a product finding (§3.1, `OQ-107-004`). |
| HG-102-059 signed, replay-safe webhooks | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — a forged and a replayed webhook must both be rejected in test. Four candidates, four mechanisms, spanning an asymmetric signature with a body hash to no payload signature at all. `EV-102-093`, `EV-102-097`, `EV-102-101`, `EV-102-109`. See §7.4. |
| HG-102-060 connection-scoped cursor | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3, but the documentary position is decisive and asymmetric: **only C6 has a cursor at all** (`EV-102-092`). C7 uses background aggregation with page-based reads (`EV-102-100`), C8 date ranges with a 15-day lookback (`EV-102-104`), C9 offset and limit (`EV-102-108`). See §7.1 and `OI-107-008` — the gate's reading decides three verdicts. |
| HG-102-061 immutable observations, stable keys | DOC | **`PASS`** | `UNPROVEN` | **`PASS`** | `UNPROVEN` | `EV-102-092`: C6 exposes stable `transaction_id` with explicit `modified` and `removed` streams. `EV-102-104`: C8 exposes `uniqueTransactionId` and a shadow status as its change signal. C7's most common pending-to-posted behaviour re-keys without a documented linkage field (`EV-102-099`); C9's mutation behaviour was not retrieved. See §7.3. |
| HG-102-062 stable account identifier | DOC | **`PASS`** | `UNPROVEN` | `UNPROVEN` | **`PASS`** | `EV-102-095` with `EV-102-096`: C6's identifier is stable across the in-place repair path `FC-107-005` requires, with two recorded residuals. `EV-102-107`: C9's `sub` claim *"remains consistent between refreshes and re-links"*. C7 and C8 not retrieved — `OQ-107-005`. See §7.2. |
| HG-102-063 per-connection disconnect | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3 — one of two connections must be disconnected and the other observed to continue. Documented capability on C6 (`EV-102-094`), C8 (`EV-102-102`) and C9 (`EV-102-105`). |
| HG-102-064 permanent terminal state | DOC | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | No candidate's documentation establishes a state that **cannot** be re-created by a later authorization, which is what `CA-92-013` orphan permanence needs. Removal and revocation are documented; irreversibility is not. `OQ-107-008` |
| HG-102-065 disclosed retention and deletion | OBS | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | `UNPROVEN` | Blocked by §3. `EV-102-102` records that C8 makes previously retrieved data unretrievable after consent revocation — which confirms `FC-107-016`'s reasoning rather than satisfying the gate. |
| HG-102-066 provider error detail excluded | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `PASS (design)` | `FC-107-015` — the `DI-91-056` allowlist. |
| HG-102-067 raw payload confined | CFG | `PASS (design)` | `PASS (design)` | `PASS (design)` | `PASS (design)` | `FC-107-014` — service-only staging, deleted after normalization. |

### 6.3 Tally

The 27 applicable gates divide by evidence kind into 9 `OBS`, 15 `DOC`, and 3
`CFG`. Every figure in this table is recomputed from the §6.1 and §6.2 tables by
`scripts/audit-cbd-107.py`, so it cannot drift from the matrix it summarizes.

| | C6 | C7 | C8 | C9 |
| --- | --- | --- | --- | --- |
| `PASS` | 3 | 1 | 2 | 3 |
| `PASS (design)` | 3 | 3 | 3 | 3 |
| `UNPROVEN` | 21 | 23 | 22 | 21 |
| `FAIL` | 0 | 0 | 0 | 0 |
| **Verdict** | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |

No candidate carries a `FAIL`, so no compensating control, exception, or
residual-risk record is required, and nothing in exception rules §5 is engaged.
**`OI-107-008` is the reason that sentence may not survive review**: on one
reading of `HG-102-060`, three candidates fail it.

## 7. Findings

### 7.1 Only one candidate offers cursor-based incremental synchronization — F1

`HG-102-060` requires incremental synchronization to be cursor-based and the
cursor to be connection-scoped. The documentary position across the four is
asymmetric in a way no other gate in the CBD-15 set has been:

* **C6** — `/transactions/sync` returns `added`, `modified` and `removed` arrays
  against a caller-held cursor that *"represents the last update requested"*,
  with `has_more` pagination and a documented restart rule when a page fails
  (`EV-102-092`). This is a true delta stream, and it is the only one.
* **C7** — no cursor. MX *"automatically aggregates each `member` approximately
  every 24 hours"*, with `successfully_aggregated_at` and `aggregated_at`
  timestamps to tell the caller whether data is fresh, page-based pagination for
  reads, and a documented constraint that *"you cannot run a new aggregation
  within three hours of a successful aggregation"* (`EV-102-100`).
* **C8** — no cursor. Date-range retrieval with `start` and `moreAvailable`
  pagination, plus a **15-day lookback**: data *"is refreshed daily with the
  previous 15 days to accommodate any changes made to transactions reported
  earlier"*, because *"It is common for traditional financial institutions to
  alter transaction data as far back as 15 days"* (`EV-102-104`). An optional
  push notification carries changes.
* **C9** — no cursor. `offset` and `limit` with time parameters, up to two years
  of history, and webhooks that carry **consent and maintenance events only,
  never data** (`EV-102-108`, `EV-102-109`).

The consequence for CoBudget is `FC-107-010`: against three of four candidates,
synchronization is poll-and-diff, and CoBudget must supply the comparison key,
the window policy, the correction rule, and its own removal detection. C8's
15-day lookback is the most useful number in this finding, because it is a
vendor's own statement of how far back financial history mutates — a figure the
poll window must exceed on **every** candidate, including the one with a cursor.

### 7.2 Identifier stability splits on integration path, and one candidate makes it native — F2

`HG-102-062` asks whether a stable account identifier exists, because
`CA-92-003` forbids merging on weak signals.

* **C6** — `account_id` *"will not change unless Plaid can't reconcile the
  account"*, but it **does** change if the token is deleted and the credentials
  re-linked, and if *"the name of the account changes"*. `persistent_account_id`
  is *"currently supported only for Items at institutions that use Tokenized
  Account Numbers (i.e., Chase, PNC, and US Bank)"* (`EV-102-095`).
  **Read alone that is a failure.** It is not, because update mode preserves the
  Item: *"An Item's `access_token` does not change when using Link in update
  mode"* (`EV-102-096`). Stability is therefore a property of CoBudget's repair
  path, which is why `FC-107-005` fixes that path. Two residuals survive: the
  rename case, which no design avoids, and the three-institution limit on the
  persistent identifier.
* **C9** — stability is native. The `sub` claim *"remains consistent between
  refreshes and **re-links** for the same user"*, and `accountId` is *"unique and
  persistent for a given sub claim"* (`EV-102-107`). The canonicalization key is
  the composite, and it survives the path C6's does not.
* **C7 and C8** — not retrieved. `OQ-107-005`.

The comparative point is narrow and real: C6 requires a correct integration to
keep its identifier stable, C9 keeps it stable regardless. Under `FC-107-005`
both work, but only one of them tolerates a mistake.

### 7.3 The pending-to-posted transition is where the candidates diverge most — F3

This is CBD-107's first acceptance criterion, and no two candidates behave alike:

* **C6** — a posted transaction is a new record carrying
  `pending_transaction_id`, *"the ID of a posted transaction's associated pending
  transaction"* (`EV-102-092`). **An explicit back-reference — the only one in
  the set.**
* **C7** — a transaction *"may be updated from `PENDING` to `POSTED` and keep the
  same `guid`"*, but *"If a single transaction can't be updated, the `PENDING`
  transaction will often be deleted and replaced with a new `POSTED` transaction
  (with a new `guid`)... **this is the most common scenario**"* (`EV-102-099`).
  No linkage field is documented for the common case.
* **C8** — *"There is no continuity guarantee for transactions to move from
  pending to active"*; a pending record may be *"marked as shadow and a new
  transaction record with an active status may appear"* (`EV-102-103`). The
  shadow status is the change signal, which is what keeps this inside
  `HG-102-061` rather than outside it.
* **C9** — FDX `status` with `postedTimestamp` and `transactionTimestamp` is
  visible in the transactions response (`EV-102-108`), but the transition
  behaviour was not retrieved. `OQ-107-009`.

`FC-107-011` is written against the worst case rather than the best: pending and
posted are two observations, joined only on provider evidence. On C6 that
evidence exists and the join is automatic. On C7's common path it does not, and
some pairs will not auto-join — a visible consequence recorded at `OI-107-003`
rather than papered over with amount-and-date matching.

**One correction is recorded here deliberately.** An earlier reading of C8's
documentation treated *"the transaction ID may not always be unique"* as a
failure of `HG-102-061`. That is the wrong field: the same documentation directs
callers to `uniqueTransactionId` *"rather than the simple transaction ID value
(`id`)"*. C8 passes.

### 7.4 Four candidates, four webhook authenticity mechanisms — F4

* **C6** — a `Plaid-Verification` JWT with `alg` of `ES256`, a `kid` resolving
  to a JWK, an `iat` claim the caller checks so the webhook is *"not more than 5
  minutes old"*, and a `request_body_sha256` the caller compares with a
  constant-time method (`EV-102-093`). Asymmetric signature, body integrity, and
  replay window — the strongest position in any category evaluated so far.
* **C8** — an HMAC-SHA256 of the body under a shared Partner Secret in the
  `X-Finicity-Signature` header, with *"Store the eventId and ignore webhooks
  with an ID that have already been processed to prevent replay attacks"*
  (`EV-102-101`). Symmetric secret; verification is *recommended* rather than
  required; the published example re-serializes the parsed body, which is a
  fragile way to compute a signature.
* **C7** — **no payload signature documented.** Endpoint authentication only:
  *"HTTP Basic Authorization"*, *"Mutual Certificate Authentication"*, or
  *"OAuth 2 Access Token Authentication"* (`EV-102-097`). Mutual TLS is a
  genuinely strong sender check, so this is weaker in kind rather than simply
  weak. Out-of-order delivery is explicitly documented, with dedup by logged
  event.
* **C9** — webhooks are described as *"authenticated POST requests"* with **no
  mechanism documented on the retrieved pages**, and they carry consent and
  maintenance events only (`EV-102-109`). `OQ-107-010`.

`FC-107-012` puts verification and replay rejection at CoBudget's edge whatever
the provider offers, so no candidate is disqualified by this. The differences are
security-dimension rubric material, and the dimension is weighted 24 here — the
joint highest in the rubric.

### 7.5 The credential ceremony has two models, and the difference is one subprocessor's exposure — F5

`HG-102-056` is the catalog's single hardest gate and may never be excepted. All
four candidates keep the credential away from CoBudget, which is what the gate
requires. They do not all keep it away from the same number of parties:

* **C9** sends the consumer to their own institution: *"the user must first
  authenticate with their financial institution and authorize their data to be
  shared"*, returning an authorization code by OAuth 2.0 with OIDC
  (`EV-102-105`). The credential reaches the institution and nobody else — not
  CoBudget, and not the network.
* **C6, C7 and C8** run a provider-hosted ceremony. The credential does not reach
  CoBudget, which satisfies the gate, but it does reach the aggregator.

The gate does not distinguish these, and this evaluation does not re-type an
approved gate. But `DI-91-010`'s concern is the existence of copies, and one
model has fewer. `FC-107-001` records the preference; the rubric security
dimension is where it scores.

### 7.6 Per-authorization independence is the one gate all four pass — F6

`HG-102-057` requires each connection to have exactly one authorizer with its own
consent, secret, cursor, revocation state, observations and provenance, and no
inheritance between connections. Every candidate's core object matches:

* **C6** — an Item is *"a login at a financial institution"*, and *"linking the
  same account at the same institution twice will result in two Items with
  different `item_id` values"* (`EV-102-094`) — precisely the `CA-92-002` case of
  two connections that appear to represent the same logical account.
* **C7** — a member is *"the connection between an end user and a financial
  institution"*, scoped to one user and one institution (`EV-102-098`).
* **C8** — consent receipts scope to an institution login, with revocation
  available per `institutionLogin` as well as per receipt (`EV-102-102`).
* **C9** — tokens are granted *"per consumer for your specific app, tied to their
  current account authorization"*, and the `sub` claim *"is only unique for each
  sign in"* — a person with a personal and a business login at one institution
  has two (`EV-102-106`).

That last detail matters more than it looks: it is `CA-92-002` and `CA-92-012`
described in a vendor's own words, and it means the contracts were written
against how this market actually works rather than against an idealized model.

## 8. Evidence register

Records are append-only under the CBD-102 evidence register rules. All retrievals
below were performed on **August 21, 2026** by desk research; none involved a
provider account, and no institution was connected.

**Number-block allocation.** `EV-102-001`–`051` are held by the hosting,
identity and PostgreSQL evaluations, `052`–`081` by the transactional email
evaluation, and `082`–`091` are the PostgreSQL evaluation's corrected
observation reservation. **This evaluation allocates `EV-102-092`–`131`**, using
`092`–`109` now and reserving `110`–`131` for this category's observation
records — nine observation-bound gates across four candidates needs the room.
A concurrently drafted CBD-130 evaluation must claim a block above `131`.

| ID | Claim | Provider | Source | Class | Conf. | Limitations | Re-verify by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-102-092 | `HG-102-060`, `HG-102-061` | Plaid (F) | "Transactions", `https://plaid.com/docs/api/products/transactions/` | Documented | Medium | Establishes `/transactions/sync` with a caller-held cursor that *"represents the last update requested"*, `added`/`modified`/`removed` arrays *"ordered by ascending last modified time"*, `has_more` pagination with a documented full-restart rule on page failure, a 256-character base64 cursor bound, and `pending_transaction_id` as the posted-to-pending back-reference. Establishes that filtering by `account_id` *"effectively creates a separate incremental update stream — and therefore a separate cursor"*, which `FC-107-009` declines to use. Establishes the transaction date fields the lifecycle map §4.2 rests on: `date` is polymorphic — *"For pending transactions, the date that the transaction occurred; for posted transactions, the date that the transaction posted"* — while `authorized_date` is *"The date that the transaction was authorized"*, with the guidance that it *"is generally preferable to use over the `date` field for posted transactions"*. Establishes that `datetime` and `authorized_datetime` are *"returned for select financial institutions"* and *"may contain default time values (such as 00:00:00)"*, and that *"not all institutions provide pending transactions."* Does **not** state whether a transaction identifier survives the pending-to-posted transition; the back-reference field exists because it does not. Amount type and precision are not stated — `OQ-107-016`. | February 21, 2027 |
| EV-102-093 | `HG-102-059` | Plaid (F) | "Webhook verification", `https://plaid.com/docs/api/webhooks/webhook-verification/` | Documented | Medium | Establishes the `Plaid-Verification` JWT with a required `ES256` algorithm, `kid`-based JWK retrieval through `/webhook_verification_key/get`, an `iat` check rejecting webhooks *"more than 5 minutes old"*, and a `request_body_sha256` payload claim to be compared in constant time. Key rotation is indicated by `kid` with `created_at`/`expired_at` but not described in detail. Establishes capability, not the exercised pass test. | February 21, 2027 |
| EV-102-094 | `HG-102-057`, `HG-102-063`, `HG-102-064` | Plaid (F) | "Items", `https://plaid.com/docs/api/items/` | Documented | Medium | Establishes that an Item is *"a login at a financial institution"*, that *"linking the same account at the same institution twice will result in two Items with different `item_id` values"*, and that `/item/remove` invalidates that Item's `access_token` *"as well as any processor tokens or bank account tokens associated with the Item"*. Establishes that removal is **not** deletion: *"Removing an Item does not affect any Asset Reports or Audit Copies you have already created."* Does **not** state the effect on other Items for the same user, nor whether removal is irreversible in the `CA-92-013` sense. | February 21, 2027 |
| EV-102-095 | `HG-102-062` | Plaid (F) | "Accounts", `https://plaid.com/docs/api/accounts/` | Documented | Medium | Establishes that `account_id` *"will not change unless Plaid can't reconcile the account with the data returned by the financial institution"*, that a changed account name yields a new `account_id`, and that it *"can also change if the `access_token` is deleted and the same credentials... are used to generate a new `access_token` on a later date"*. Establishes `persistent_account_id` as *"A unique and persistent identifier... across different Items for depository accounts"*, limited to *"institutions that use Tokenized Account Numbers (i.e., Chase, PNC, and US Bank)"*, and for depository accounts only. Establishes the account type and subtype schema the coverage map §3.2 rests on: `depository` with `checking` and `savings`, `credit` with `credit card` and `charge card`, plus `loan`, `investment` and `other`; and the transactions limits *"Transactions does not support loan types other than student or mortgage"* and that some subtypes are *"opt-in only"* unless named in the Link subtypes filter. Establishes that `persistent_account_id` does **not** extend to credit-card accounts, which is the account type §3.1 makes second-most important. | February 21, 2027 |
| EV-102-096 | `HG-102-062`, `FC-107-005` | Plaid (F) | "Update mode", `https://plaid.com/docs/link/update-mode/` | Documented | Medium | Establishes that *"An Item's `access_token` does not change when using Link in update mode"* and that the exchange step need not be repeated, so the Item and its account identifiers survive an in-place repair. Establishes the three triggers: `ITEM_LOGIN_REQUIRED`, `PENDING_EXPIRATION`/`PENDING_DISCONNECT`, and permission or consent changes. This record is what converts `EV-102-095`'s apparent failure into a design constraint. | February 21, 2027 |
| EV-102-097 | `HG-102-059` | MX (F) | "Webhooks", `https://docs.mx.com/resources/webhooks/` | Documented | Medium | Establishes three endpoint authentication options — *"HTTP Basic Authorization"*, *"Mutual Certificate Authentication"*, *"OAuth 2 Access Token Authentication (Client Credentials)"* — and **no payload signature mechanism**. Establishes documented out-of-order delivery, the guidance to *"log every event you process and don't process any event that has already been logged"*, a `revision` field for object-based webhooks, and automatic retry over roughly 12–15 hours. Absence of a signature from this page is not proof of absence from the product; `OQ-107-010`. | February 21, 2027 |
| EV-102-098 | `HG-102-057` | MX (F) | "List members", `https://docs.mx.com/api-reference/platform-api/reference/list-members` | Documented | Medium | Establishes that a member represents *"the connection between an end user and a financial institution"*, scoped to one user through `/users/{user_identifier}/members` and to one institution through `institution_guid`/`institution_code`, with `connection_status` values including CONNECTED, DISCONNECTED and FAILED. Establishes the dual identifier model: `guid` is *"The unique identifier for the member. Defined by MX"* and `id` is *"The unique partner-defined identifier"*. | February 21, 2027 |
| EV-102-099 | `HG-102-061` | MX (F) | "List transactions", `https://docs.mx.com/api-reference/platform-api/reference/list-transactions` | Documented | Medium | Establishes `status` values POSTED and PENDING, the `date`/`transacted_at`/`posted_at` field set with `date` using *"`posted_at` as a fallback"*, and the pending-to-posted behaviour: a transaction *"may be updated from `PENDING` to `POSTED` and keep the same `guid`"*, but where it cannot be updated the pending record *"will often be deleted and replaced with a new `POSTED` transaction (with a new `guid`)... this is the most common scenario"*. **No linkage field between the deleted pending record and its replacement is documented.** | February 21, 2027 |
| EV-102-100 | `HG-102-060` | MX (F) | "Account Aggregation", `https://docs.mx.com/products/connectivity/account-aggregation` | Documented | Medium | Establishes background aggregation *"approximately every 24 hours"* per member, the `successfully_aggregated_at` and `aggregated_at` freshness timestamps, page-based pagination with `current_page`/`total_pages`, and the constraint that *"you cannot run a new aggregation within three hours of a successful aggregation"*. Establishes **no cursor and no delta mechanism**; the retrieved page does not describe how a caller determines what changed. | February 21, 2027 |
| EV-102-101 | `HG-102-059` | Mastercard Open Finance (F) | "Mastercard Data Connect Webhooks", `https://developer.mastercard.com/open-finance-us/documentation/webhooks/webhooks-connect/` | Documented | Medium | Establishes the `X-Finicity-Signature` header — *"The X-Finicity-Signature header gets added to every event sent"* — computed as a SHA-256 HMAC of the body under the Partner Secret, with replay guidance to *"Store the eventId and ignore webhooks with an ID that have already been processed"*, and a 3-day exponential-backoff retry schedule. Verification is framed as a recommendation: *"If you're using webhooks for sensitive or critical information, we recommend that you verify the signature."* The published example computes the HMAC over a re-serialized body. Does not cover Data Connect Components, which use a separate system. | February 21, 2027 |
| EV-102-102 | `HG-102-057`, `HG-102-063`, `HG-102-065` | Mastercard Open Finance (F) | "Consent Management", `https://developer.mastercard.com/open-finance-us/documentation/consent-management/index.md` | Documented | Medium | Establishes consent receipts recording *"institution details with specific accounts the customer selected"* and the data types accessed, revocation by `DELETE /data-sharing-consents/{consent_receipt_id}` or per `institutionLogins/{institution_login_id}`, and that after revocation *"you will no longer be able to retrieve any data or reports based on that data"*. Records exist only from 28 June 2023. Does **not** state whether revoked data is deleted from the provider or merely made inaccessible, which is the half `HG-102-065` needs. | February 21, 2027 |
| EV-102-103 | `HG-102-061` | Mastercard Open Finance (F) | "Understanding Transaction Data", `https://developer.mastercard.com/open-finance-us/documentation/products/manage/transaction-data/understanding-transaction-data/index.md` | Documented | Medium | Establishes three statuses — active, pending, and shadow, where a shadow transaction was *"found in an account in an earlier aggregation, but not in the institution's current data records"* — and that *"There is no continuity guarantee for transactions to move from pending to active"*, a pending record possibly being *"marked as shadow and a new transaction record with an active status may appear"*. Establishes that *"Pending transactions can only change to active or be removed from the response, they cannot change to shadow."* Warns that *"the transaction ID may not always be unique"*, which `EV-102-104` resolves. | February 21, 2027 |
| EV-102-104 | `HG-102-060`, `HG-102-061` | Mastercard Open Finance (F) | "Transaction Data", `https://developer.mastercard.com/open-finance-us/documentation/products/manage/transaction-data/index.md` | Documented | Medium | Establishes date-range retrieval through `GET /aggregation/v3/customers/{customerId}/transactions` with *"no maximum window between fromDate and toDate"*, a recommended *"minimum time period of 15 days"*, and `start`/`moreAvailable` pagination capped at 1,000 records. Establishes the **15-day lookback**: data *"is refreshed daily with the previous 15 days"* because *"It is common for traditional financial institutions to alter transaction data as far back as 15 days"*, longer for some liability accounts. Establishes `uniqueTransactionId` as the identifier to use *"rather than the simple transaction ID value (id)"*, and TxPUSH notifications as an alternative to daily polling. **No cursor.** | February 21, 2027 |
| EV-102-105 | `HG-102-056`, `HG-102-063` | Akoya (F) | "Authentication & Authorization Basics", `https://docs.akoya.com/akoya/guides/authentication-and-authorization-basics` | Documented | Medium | Establishes that *"the user must first authenticate with their financial institution and authorize their data to be shared"*, that the app sends the consumer *"to their provider's sign in page via Akoya"* with `connector`, `client_id`, `redirect_uri`, `response_type` and `scope`, and that the consumer *"completes account selection, agrees to terms with their provider"* before an authorization code is returned. Establishes a `Revoke` endpoint that *"nullifies a previously granted token"*, and a `601 "Customer not found"` error when a customer revokes access. Establishes the institution-hosted model; does not establish that no credential ever transits the network, which is the observation. | February 21, 2027 |
| EV-102-106 | `HG-102-057`, `HG-102-058`, `HG-102-064` | Akoya (F) | "Token Overview", `https://docs.akoya.com/akoya/guides/token-overview` | Documented | Medium | Establishes OAuth 2.0 with OIDC, a `grant_id` returned with each token set, an ID token functioning as the bearer token with a *"24 hour maximum"* lifetime and a recommended 15-minute working assumption, and refresh-token rotation where the response warns a token may have *"already been claimed by another client"*. Establishes token custody guidance: the refresh token *"must be treated as highly confidential"* and CoBudget should *"keep each consumer token secure by using encrypted credentials or server-side storage"*. Establishes provider-dependent refresh lifetimes — perpetual, set (commonly a year), or rolling. Establishes that tokens are granted *"per consumer for your specific app, tied to their current account authorization"*. | February 21, 2027 |
| EV-102-107 | `HG-102-062` | Akoya (F) | "Unique Token Keys and Values", `https://docs.akoya.com/akoya/guides/unique-keys-and-values` | Documented | Medium | Establishes that the `sub` claim *"remains consistent between refreshes and re-links for the same user"* and is *"only unique for each sign in"*, so one person's personal and business logins are distinct subjects. Establishes that `accountId` is *"not guaranteed unique within the Akoya system at large and is not guaranteed to be unique across the data provider"* but is *"unique and persistent for a given sub claim"* — making the composite the canonicalization key. Establishes that id and refresh tokens are not unique on refresh. | February 21, 2027 |
| EV-102-108 | `HG-102-060`, `HG-102-061` | Akoya (F) | "PFM Account Aggregation", `https://docs.akoya.com/akoya/guides/pfm-account-aggregation-use-case` | Documented | Medium | Establishes transaction retrieval by `GET /transactions/{version}/{providerId}/{accountId}` with `offset` and `limit` and *"time parameters"*, a default limit of 50, and *"up to two years of an account's transaction history"*. Establishes the FDX-shaped response with `transactionId`, `status`, `postedTimestamp`, `transactionTimestamp`, `transactionType` and `amount`, and the `x-akoya-interaction-type`, `x-akoya-intent-type` and `x-akoya-last-access` request headers. Establishes **no cursor and no change stream**. Does not state pending-to-posted transition behaviour; `OQ-107-009`. | February 21, 2027 |
| EV-102-109 | `HG-102-059` | Akoya (F) | "Intro to Webhooks" and "Webhooks Technical Guide", `https://docs.akoya.com/akoya/reference/webhooks-intro` and `https://docs.akoya.com/akoya/reference/webhooks` | Documented | Medium | Establishes that **only two event types exist** — maintenance and consent — and that consent notifications fire *"when a user revokes their consent at a data provider's portal, or when they add or remove accounts"*. Establishes that Akoya sends *"authenticated POST requests"* and retries three times, but **describes no signature, HMAC, or endpoint authentication mechanism** on either page. No data-change webhook exists, which is why `EV-102-108`'s polling model is the only synchronization path. | February 21, 2027 |

### 8.1 Reserved numbers

`EV-102-110`–`131` are reserved for this category's observation records.

| ID range | Held for |
| --- | --- |
| EV-102-110 | Reserved — C6 observation session, category-F gates |
| EV-102-111 | Reserved — C6 observation session, telemetry and console gates |
| EV-102-112 | Reserved — C7 observation session, category-F gates |
| EV-102-113 | Reserved — C7 observation session, telemetry and console gates |
| EV-102-114 | Reserved — C8 observation session, category-F gates |
| EV-102-115 | Reserved — C8 observation session, telemetry and console gates |
| EV-102-116 | Reserved — C9 observation session, category-F gates |
| EV-102-117 | Reserved — C9 observation session, telemetry and console gates |
| EV-102-118 | Reserved — signed-webhook forgery and replay fixtures, `FU-95-012` closure evidence |
| EV-102-119 | Reserved — disconnect and revoke exercise, `FU-95-012` closure evidence |
| EV-102-120 | Reserved — reconciliation and deduplication results, `FU-95-012` closure evidence |
| EV-102-121 | Reserved — the §9 documentary retrievals, C6 |
| EV-102-122 | Reserved — the §9 documentary retrievals, C7 |
| EV-102-123 | Reserved — the §9 documentary retrievals, C8 |
| EV-102-124 | Reserved — the §9 documentary retrievals, C9 |
| EV-102-125 | Reserved — institution coverage evidence, C6 |
| EV-102-126 | Reserved — institution coverage evidence, C7 |
| EV-102-127 | Reserved — institution coverage evidence, C8 |
| EV-102-128 | Reserved — institution coverage evidence, C9 |
| EV-102-129 | Reserved — contractual evidence, DPA and subprocessor list |
| EV-102-130 | Reserved — contractual evidence, second candidate |
| EV-102-131 | Reserved — pricing evidence |

## 9. Open questions carried forward

| ID | Question | Gate | Action |
| --- | --- | --- | --- |
| OQ-107-001 | Which access methods does each carried candidate actually use per institution — institution-permissioned API, or credential-based retrieval? | `HG-102-056` | Retrieve ×4. §4.3's screening row and finding F5 both depend on it, and the answer is likely per-institution rather than per-provider |
| OQ-107-002 | Should a fifth candidate be evaluated, and which? | Screening | CBD-108's call. The §4.2 grounds for the carried four are stated; no claim is made about the unevaluated field |
| OQ-107-003 | Correlation-identifier lifetime and purpose separation ×4 | `HG-102-002`, `HG-102-003` | Retrieve. No CBD-15 sibling covers these providers |
| OQ-107-004 | Token custody guidance and whether any SDK mandates its own token store ×3 | `HG-102-058` | Retrieve for C6, C7 and C8. C9 is settled by `EV-102-106`; the asymmetry is recorded in §3.1 |
| OQ-107-005 | Account identifier stability across reauthentication and re-link for C7 and C8 | `HG-102-062` | Retrieve. C6 and C9 are settled by `EV-102-095`/`096` and `EV-102-107` |
| OQ-107-006 | Whether any candidate offers customer-obtainable evidence of vendor staff access to customer data | `HG-102-009` | Retrieve ×4. No aggregator equivalent of a cloud access-transparency log is known; the question may resolve to a documented absence |
| OQ-107-007 | Dated region and subprocessor lists ×4 | `HG-102-011` | Retrieve. This category's subprocessor chain includes the institutions themselves and any downstream network |
| OQ-107-008 | Whether a connection can reach a state no later authorization can re-create, as `CA-92-013` orphan permanence requires | `HG-102-064` | Retrieve ×4, then put to each provider directly. No candidate's documentation settles it |
| OQ-107-009 | C9's pending-to-posted transition behaviour and whether `transactionId` survives it | `HG-102-061` | Retrieve. C6, C7 and C8 are settled; this is the one asymmetric cell in finding F3 |
| OQ-107-010 | Webhook payload authentication mechanism for C7 and C9 | `HG-102-059` | Retrieve, then put to each provider. Absence from the retrieved pages is not proof of absence from the product |
| OQ-107-011 | Whether C8's TxPUSH notifications carry transaction changes reliably enough to substitute for the 15-day poll | `HG-102-060` | Retrieve. It is the closest thing to a change stream outside C6 |

## 10. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-107-007 | Nine pass tests are observation-bound. Every candidate offers a sandbox with fictional institutions, so the `OI-103-008` authorization covers them without a real bank. | Verdicts stay `ELIGIBLE-PENDING-EVIDENCE` until the observations run. The guardrail is that a sandbox institution is the only acceptable target and no evaluator's own credentials are entered anywhere. |
| OI-107-008 | **`HG-102-060` has two defensible readings and they decide three verdicts.** The gate's requirement sentence says *"Incremental synchronization is cursor-based"*; its failure condition names only *"Cross-connection cursor sharing"*. Read on the requirement, C7, C8 and C9 fail — they have no cursor. Read on the failure condition, they do not fail, because a provider with no cursor shares none. | **Product Owner decision, and the highest-consequence open item in the CBD-15 set.** On the first reading three of four candidates become `INELIGIBLE` absent an exception, which would leave one eligible aggregator and effectively pre-empt CBD-108's selection. This evaluation records `UNPROVEN` for all four and refuses to make that choice by drafting. |
| OI-107-009 | Every cross-category **X** gate is `UNPROVEN` for every candidate, with no inherited passes. | Matches CBD-106's position and for the same reason: these are new provider identities. `OQ-107-003`, `OQ-107-006` and `OQ-107-007` are the largest remaining documentary work. |
| OI-107-010 | `FU-95-012` is P0 and names this issue among four. Its closure evidence is provider sandbox evidence, signed-webhook fixtures, reconciliation and deduplication results, and an exercised disconnect. | This package supplies none of it and does not close the row. Financial connectivity and provider-derived financial state remain blocked. `EV-102-118`–`120` are reserved for that evidence. |
| OI-107-011 | This evaluation covers category **F** only; cross-category coherence is CBD-108's acceptance criterion. | The one cross-category interaction is subprocessor count: C9 adds the institution's own OAuth surface rather than an aggregator's credential store, which changes the `HG-102-011` disclosure shape rather than merely lengthening the list. |
| OI-107-012 | Desk evaluation by one author; no provider contacted, no account created, no institution connected, nothing built. | The independent security review required before public launch remains outstanding, and `EG-91-005`, `EG-91-012` and `EG-91-021` remain open. |
