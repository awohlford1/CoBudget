# CBD-107 — Connection Operations, Support, Cost, and Exit Assessment

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Records the operational and cost half of CBD-107 against the approved CBD-102 cost template. **It contains no prices**; §5 records every line as unknown under cost rule `CR4`, and §5.1 records why that is structural in this category rather than a research gap. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-107](https://cobudget.atlassian.net/browse/CBD-107) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Connection and Provenance Boundary Specification v0.1; Candidate Shortlist and Gate Evaluation v0.1; Transaction Lifecycle and Coverage Map v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `c15b526` |
| Last updated | August 21, 2026 |

## 1. Purpose

CBD-107's fourth deliverable requires an assessment of *"consent, connection
ownership, reauthentication, revocation, deletion, webhook, cursor, sandbox,
institution-health, support, cost, and adapter-exit"*. The boundary
specification owns the design half of that list; this document owns the
operating half and the cost.

## 2. Volume, rate, and the unit that will be billed

| Input | Base | High | Source |
| --- | --- | --- | --- |
| Provider connections | 61 | 375 | `DM-102-010` — **the stated billable unit for CBD-107** |
| Connected provider accounts | 135 | 1,125 | `DM-102-012` |
| Imported transactions per month | 5,400 | 67,500 | `DM-102-014` |
| Provider webhooks per month | 5,490 | 67,500 | `DM-102-017` |
| Scheduled reconciliation runs per month | 1,830 | 11,250 | `DM-102-018` |
| Source observations per transaction | 1.1 | 1.3 | `DM-102-015` |

### 2.1 The unit mismatch the cost template warned about

Cost template §5.1 names this category specifically: *"Financial providers may
meter per account (`DM-102-012`: Base 135, High 1,125) rather than per
connection (`DM-102-010`: Base 61, High 375) — a difference of more than 2× at
Base and 3× at High."*

That warning is the single most important cost fact in this package, and it
outranks any per-unit rate. A provider quoting a lower per-unit price on accounts
than a competitor quotes on connections may still be the more expensive choice at
CoBudget's shape of demand, because `DM-102-011` prices 2.2 accounts per
connection at Base and 3.0 at High.

**Every cost record in §5 therefore states the provider's own unit and its
definition before any figure**, and the conversion to the demand model's unit is
written down rather than performed silently. A conversion that is not written
down is, in the template's words, the most likely place for a cost comparison to
go quietly wrong.

Three further metering shapes are plausible in this market and are recorded so a
quote is read against them rather than into them:

* **Per API call or per refresh.** Interacts directly with §3.1: three of four
  candidates have no cursor, so CoBudget polls, and the poll cadence becomes a
  cost line rather than only an operational one.
* **Per product.** Transactions, identity, balance and account verification are
  commonly separate products. CoBudget needs transactions and balances and does
  not need identity or verification, so a bundled quote may price capability the
  posture forbids using.
* **Per active connection versus per created connection.** A connection that has
  reached the `CA-92-013` orphaned terminal state should stop billing. Whether it
  does is `OQ-107-018`.

### 2.2 Rate is not a constraint; cadence is

At Base, 5,490 webhooks and 1,830 reconciliation runs per month is roughly
0.003 events per second. No candidate's rate limit is threatened by CoBudget's
volume.

What binds is the **other** direction — how often CoBudget may refresh:

* **C7** documents a floor: *"you cannot run a new aggregation within three hours
  of a successful aggregation"*, alongside background aggregation *"approximately
  every 24 hours"* (`EV-102-100`). Freshness is therefore capped at three hours
  by the provider, not chosen by CoBudget.
* **C8** documents a daily cadence with a 15-day lookback (`EV-102-104`).
* **C6** has a cursor, so freshness is bounded by webhook latency rather than by
  poll cadence (`EV-102-092`).
* **C9** has neither cursor nor data webhook, so freshness is entirely CoBudget's
  poll choice — and entirely CoBudget's cost.

`docs/architecture.md` already requires that bank feeds be described as
*automatically updated rather than guaranteed real-time*, and `DI-91-056` limits
what members see to a health summary. Both are satisfied at any of these
cadences. `OI-107-004` still owns the value.

## 3. Operating a connection estate

### 3.1 The recurring load is reauthentication, and CoBudget cannot do it

This category differs from every sibling in one way that dominates its operating
profile: **when a connection breaks, the operator cannot fix it.** Only the
authorizer can, by completing a ceremony. Hosting, database and email failures
are the operator's to resolve; a broken bank connection is a customer's.

The volume is set by provider and institution policy rather than by CoBudget:

* **C9** documents three refresh-token regimes that vary *by data provider* —
  perpetual, a set expiry *"commonly a year"*, or a rolling window that resets on
  use (`EV-102-106`, `PS-107-007`). A rolling window means an inactive customer's
  connection expires precisely because they were inactive.
* **C6** signals the need through `ITEM_LOGIN_REQUIRED`, `PENDING_EXPIRATION` and
  `PENDING_DISCONNECT`, and repairs in place through update mode
  (`EV-102-096`, `PS-107-003`).
* **C7** exposes `connection_status` with `CONNECTED`, `DISCONNECTED` and
  `FAILED` (`EV-102-098`, `PS-107-001`).
* **C8** records connection active or inactive state on the consent receipt
  (`EV-102-102`, `PS-107-006`).

Every candidate signals the state. None of them removes the work. At `DM-102-010`
Base volume of 61 connections, even an annual reauthentication cycle produces a
steady trickle of customer-facing interruptions, and `FC-107-005` requires each
one to go through the in-place repair path rather than a re-link.

`WR-102-027`–`WR-102-031` score ongoing solo-operator burden. The honest position
for this category: the burden is **low in operator hours and high in customer
friction**, and the rubric scores the former. That mismatch is recorded at
`OI-107-017` rather than resolved by mis-scoring.

### 3.2 Poll-and-diff is the second recurring load

`FC-107-010` accepts poll-and-diff for providers without a delta stream, and
requires the cost be named rather than absorbed. Named here:

| Work | Applies to | Why it exists |
| --- | --- | --- |
| Comparison key selection | C7, C8, C9 | No `removed` array, so absence must be inferred by comparing a fetched window against stored observations |
| Poll window policy | C7, C8, C9 | Must exceed the provider's mutability window — C8 documents 15 days, and nothing suggests the others mutate less |
| Correction detection | C7, C8, C9 | A changed amount on an existing observation must be distinguished from a new observation |
| Removal detection | C7, C8, C9 | Distinguishing a deleted transaction from one that fell outside the fetched window is the hard case |
| Cursor and page-restart handling | C6 | Smaller, but real: the cursor's documented failure rule restarts the whole pagination loop from the first page's cursor |

The last row is worth stating because it prevents an unfair comparison: C6 is
cheaper here, not free.

**C8's 15-day figure is the most useful number in this document.** It is a
vendor's own statement that institutions *"alter transaction data as far back as
15 days"*, and it bounds the poll window on **every** candidate including C6 —
a cursor tells CoBudget what the provider changed, not what the institution
changed before the provider noticed.

### 3.3 Monitoring

Follows `FC-107-015` and the three-boundary telemetry model:

| Surface | Content | Boundary |
| --- | --- | --- |
| Ordinary operator dashboard | Sync job outcomes, webhook counts, connection counts by health class, reconciliation lag — content-free | S1; `DI-91-041`; `TD-103-021` |
| Connection health detail | Provider status codes, institution identity, cursor state, retry counts | Restricted diagnostics; `DI-91-055`, `DI-91-062` |
| Raw sync payloads | Provider transaction data before normalization | Service-only, deleted after normalization; `DI-91-057`; `FC-107-014` |
| What members see | Current, delayed, needs the authorizer, or permanently orphaned | `DI-91-056` allowlist; `FC-107-015` |

The gap between rows two and four is the whole of `HG-102-066`. A member learning
*which* institution failed, or *why*, or that the authorizer's credentials
changed, is a leak of `DI-91-011` private management state into a shared surface.

### 3.4 Outage and failure behaviour

| Failure | Behaviour under the posture |
| --- | --- |
| Provider API outage | Sync jobs retry under `TD-103-008` bounds. Members see the `DI-91-056` delayed state. No financial data is lost, because source observations are already durable |
| Provider webhook outage | Changes arrive late. `FC-107-013` reconciliation is the recovery path, which is why it is mandatory rather than optional |
| Single institution outage | One connection degrades; every other connection is unaffected, because `FC-107-003` shares no state between them |
| Credential or consent expiry | Connection enters repair. Only the authorizer can clear it — §3.1 |
| Provider deprecates an API version | The adapter absorbs it. `FC-107-017` keeps provider code out of domain modules for exactly this reason. C9's own changelog records a v2 deprecation, so this is a live rather than theoretical risk |
| Provider account suspension | Total loss of new financial data. Stored observations and all derived budget state survive, because `DI-91-068` is CoBudget's, not the provider's |
| Consent revoked at the institution | C9 notifies through the consent webhook (`PS-107-004`). On candidates without that signal, the next sync failure is the notification, which is slower |

### 3.5 Sandbox, and the three kinds of claim

CBD-107's fifth acceptance criterion requires that *"Sandbox, contractual/API
capability, observed institution quality, and assumptions are distinguished"*.
This package keeps them apart as follows:

| Kind of claim | How it is recorded | Example from this package |
| --- | --- | --- |
| **API capability** | An `EV-102-*` record at Documented class against a named page | C6's cursor semantics (`EV-102-092`) |
| **Sandbox behaviour** | Not yet recorded. Reserved at `EV-102-110`–`117` for the §3 observations | The forged-webhook rejection test |
| **Observed institution quality** | Not recorded at all, and not obtainable without live connections across many institutions | `PS-107-010`, `PS-107-011` |
| **Assumption** | Stated as an open question or an open item, never as a finding | Institution coverage — lifecycle map §3.3 |
| **Contractual** | Not obtained for any candidate | Retention, deletion, subprocessors, price |

Every candidate publishes a sandbox with fictional institutions, which is what
makes the `OI-103-008` authorization usable here without a real bank. `OI-107-007`
records the guardrail.

The row that matters most is the third. **Observed institution quality is the
thing a real evaluation of this category would most want and the thing this
package least has**, because it cannot be desk-researched. `FF-007` exists for it,
and the lifecycle map §6 gives it an inventory to start from.

## 4. Export, migration, and deletion

1. **Export** — source observations and normalized transactions are CoBudget's
   own data in CoBudget's own schema (`FC-107-017`). Nothing needs extracting
   from the provider.
2. **Migration** — the expensive part is not data. Every customer must complete a
   new ceremony with the successor for every connection: 61 ceremonies at Base,
   375 at High. There is no data-migration substitute, which is why rubric §4.1
   weights portability highest in this category at 16.
3. **What survives a provider change** — all history, because `DI-91-068`
   observations are stored locally. What does not survive is live connectivity and
   the provider identifiers the observations carry, so post-migration
   canonicalization must bridge old and new identifier spaces. That bridge is a
   `CA-92-003` problem, and on a candidate whose identifiers do not survive even
   a *re-link* it is a harder one.
4. **Deletion** — `FC-107-016` propagates on the `DI-91-045` ledger with
   horizon-stating claims. C8's documented behaviour — data unretrievable after
   consent revocation — is recorded as confirming the local-storage posture
   rather than as a deletion guarantee, because unretrievable by CoBudget is not
   the same as deleted by the provider (`EV-102-102`, `OQ-107-019`).
5. **Exit cost** — `CT-102-014` records customer re-authorization friction rather
   than egress. Egress is negligible; the friction is not, and it is the one exit
   cost in the whole provider set that is paid by customers rather than by
   CoBudget.

## 5. Cost

### 5.1 No prices, and in this category that is structural

No price was retrieved for any candidate, and every `CT-102-*` line is `UNKNOWN`
under `CR4`.

**This category differs from its siblings in why.** Hosting, database and email
providers publish price lists; the gap there is research effort. U.S. financial
aggregators generally do not publish transaction-aggregation pricing, quoting
instead against volume, product mix and contract term. So `CR4` here is not a gap
that more reading closes — it needs provider contact, which this package has not
made and which `OI-107-018` records as the blocking step for CBD-108.

Two consequences follow. First, **cost cannot be compared in this category until
someone talks to four vendors**, and that is a scheduling fact CBD-108 should
know now rather than discover at pricing time. Second, an aggregator quote
typically arrives attached to a contract, so `HG-102-011` subprocessor
disclosure, `HG-102-065` retention and deletion terms, and price are likely to
become obtainable in the same conversation. `OQ-107-007` and `OQ-107-020` should
be asked together with pricing rather than separately.

### 5.2 Cost record structure

One record per candidate; identical structure; every unlisted `CT-102-*` line is
`UNKNOWN`.

| Field | C6 Plaid | C7 MX | C8 Mastercard | C9 Akoya |
| --- | --- | --- | --- | --- |
| Provider's own billable unit | `UNKNOWN` — §2.1; must be stated before any figure | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |
| Conversion to demand model | Written down explicitly per §2.1, never performed silently | Same | Same | Same |
| Tier priced | `UNKNOWN` — no gate is yet known to force a tier | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |
| Eligibility verdict | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` | `ELIGIBLE-PENDING-EVIDENCE` |
| CT-102-003 seats × 2 | `UNKNOWN` — §2.5.1 second principal needs an account identity wherever key or approval custody applies | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |
| CT-102-004 minimum committed spend | `UNKNOWN` — **the term most likely to dominate** at 61 connections; an aggregator minimum can exceed usage many times over | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |
| CT-102-006 primary unit × Base | `UNKNOWN` × 61 connections or 135 accounts — §2.1 | `UNKNOWN` × same | `UNKNOWN` × same | `UNKNOWN` × same |
| CT-102-007 secondary units | Per-product fees; refresh calls | Refresh calls above the 3-hour floor | Per-product fees; TxPUSH | Poll volume — highest, since there is no delta stream |
| CT-102-014 exit cost | Customer re-authorization friction, not egress — §4 | Same | Same | Same |
| CT-102-021 first overage threshold | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |

### 5.3 Cost cliffs specific to this category

| Cliff | Why it is a cliff | Evidence |
| --- | --- | --- |
| **Connections versus accounts** | More than 2× at Base and 3× at High for the same customer base. A comparison that does not state its unit is not a comparison | Cost template §5.1; `DM-102-010`, `DM-102-012` |
| **Minimum committed spend** | At 61 connections, a floor set for a larger customer is the entire bill, and usage growth is free until it is not. `CT-102-004` is the watch line, not `CT-102-006` | `DM-102-010`; `CR1` |
| **Poll volume where there is no cursor** | Three of four candidates require polling, and the window must exceed a 15-day mutability horizon. Where refresh is metered, the poll cadence is a price | `EV-102-100`, `EV-102-104`, `EV-102-108`; §3.2 |
| **Per-product bundling** | CoBudget needs transactions and balances only. A bundle that includes identity or verification prices capability `FC-107-002` and `EM-92-*` adjacent posture forbid using | §2.1 |
| **Orphaned connections that keep billing** | `CA-92-013` terminal connections should stop costing. If they bill until explicitly removed, the deletion path becomes a cost control as well as a privacy control | `OQ-107-018` |
| **Contract term** | An aggregator agreement with a multi-year term converts `CT-102-019` from a projection into a commitment, and `OI-102-017` records that no budget ceiling exists to check it against | `OI-102-017`; §5.1 |

## 6. Open questions

| ID | Question | Action |
| --- | --- | --- |
| OQ-107-018 | Whether a connection in a terminal or orphaned state continues to bill, ×4 | Ask with pricing. Decides whether deletion is also a cost control |
| OQ-107-019 | Whether revoked or deleted data is erased at the provider or merely made unretrievable, ×4 | `HG-102-065` needs the first; C8's page establishes only the second |
| OQ-107-020 | All `CT-102-*` lines ×4, with each provider's own unit and its definition stated | **Requires provider contact.** §5.1 records why reading will not close it |
| OQ-107-021 | Whether any candidate offers a development or low-volume tier that clears every gate, and what it excludes | The `CR0` trap in this category: a cheap tier that omits webhooks or a sandbox is not a cheaper option |
| OQ-107-022 | Support model and response commitments ×4, and whether support staff can see customer financial data | `WR-102-019`/`020` score support quality; `HG-102-007` gates what support may access, and here that is `DI-91-057` payloads |

## 7. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-107-017 | The solo-operator rubric dimension scores operator hours, and this category's recurring load is **customer friction** rather than operator hours. | `WR-102-027`–`031` will score this category favourably for the wrong reason. CBD-108 should read the subscore alongside §3.1 rather than instead of it. Not a rubric change — the weights are fixed for the duration of CBD-103–107. |
| OI-107-018 | Pricing in this category requires provider contact, which this package has not made. | **Blocking step for CBD-108**, and it should be sequenced now: the same conversation likely yields subprocessor lists and retention terms, which `OQ-107-007` and `OQ-107-019` also need. |
| OI-107-019 | The poll window must exceed the provider's transaction-mutability horizon, documented at 15 days on one candidate and unstated on the other three. | A window chosen shorter than the true horizon loses corrections silently. `OQ-107-014` and the C8 figure are the only evidence available; treating 15 days as a floor for all four is an assumption, and it is recorded as one. |
| OI-107-020 | No budget ceiling exists (`OI-102-017`), and this is the category most likely to carry a minimum commitment and a contract term. | A fully evidenced, gate-clearing recommendation could be unaffordable or unterminable, with no documented basis for having ruled it out earlier. `CT-102-004` and `CT-102-019` are the figures to watch. |
