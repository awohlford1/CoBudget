# CBD-107 — Transaction Lifecycle, Coverage, and Provider-Signal Map

| Field | Value |
| --- | --- |
| Status | **Draft** — awaiting Product Owner review. Carries CBD-107's second, third, and fifth deliverables: the account-type coverage assessment, the transaction lifecycle and data-field capability map, and the provider-signal record for future `FF-007` research. It selects no provider and no scoring algorithm. |
| Document version | 0.1 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner |
| Jira | [CBD-107](https://cobudget.atlassian.net/browse/CBD-107) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Connection and Provenance Boundary Specification v0.1; Candidate Shortlist and Gate Evaluation v0.1; Operational and Cost Assessment v0.1; Acceptance Criteria Traceability v0.1 |
| Confluence page | Not yet registered. Publication follows merge to `main`, per AGENTS.md. |
| Repository baseline | `c15b526` |
| Last updated | August 21, 2026 |

## 1. Purpose

Three of CBD-107's five deliverables are not gate questions and do not fit the
evaluation matrix. They are collected here:

| Deliverable | Section |
| --- | --- |
| Checking, savings, and credit-card coverage assessment | §3 |
| Transaction lifecycle and data-field capability map | §4 and §5 |
| Provider-signal record for future `FF-007` research, without selecting a scoring algorithm | §6 |

Every claim below carries the `EV-102-*` record that supports it. Where a
candidate was not asked, the cell says so rather than being left blank, because
an unasked question and a negative answer are different things.

## 2. What this document does not do

* It ranks nothing and recommends nothing.
* It selects no institution-quality scoring algorithm. `FC-107-018` holds that
  line and §6.2 restates why.
* It measures no institution counts. §3.3 records why that number is not
  evidence in the CBD-102 sense.
* It closes no `EG-91-*` gap. `EG-91-005` explicitly holds *"exact objects/IDs/
  payloads, lifecycle events... and institution quality"* open, which is most of
  this document's subject matter.

## 3. Account-type coverage

### 3.1 What CoBudget actually needs

`DM-102-011` prices 2.2 provider accounts per connection at Base — *"commonly a
checking and a savings account at one institution"*. `DM-102-013` blends 40
transactions per account per month across account types, noting that *"a primary
checking or card account runs high, a savings account runs near zero."*

So the requirement is narrow and specific:

| Account type | Why CoBudget needs it | Transaction volume |
| --- | --- | --- |
| **Checking** | The primary spending account; most transactions and most budget-relevant activity | High |
| **Savings** | Goal balances and transfers; near-zero transaction volume | Near zero |
| **Credit card** | The other primary spending surface, and the one where pending-versus-posted matters most | High |

Loans, investments, mortgages, and brokerage accounts are **out of scope for
Private MVP**. The product plan's scope does not include net-worth tracking, and
`DM-102-011`'s basis names only depository accounts. A provider's investment
coverage is therefore not a Private MVP advantage, and this document does not
score it.

### 3.2 What each candidate documents

| Candidate | Checking | Savings | Credit card | Documented limits | Evidence |
| --- | --- | --- | --- | --- | --- |
| **C6** Plaid | `depository`/`checking` | `depository`/`savings` | `credit`/`credit card`, `charge card` | *"Transactions does not support loan types other than student or mortgage"*; some subtypes are *"opt-in only... unless it is present in the subtypes filter"* | `EV-102-095` |
| **C7** MX | Not retrieved | Not retrieved | Not retrieved | Transaction object carries `is_expense`, `is_income`, `is_fee`, `type` of `CREDIT`/`DEBIT` — type-agnostic in shape | `EV-102-099`; `OQ-107-012` |
| **C8** Mastercard | Not retrieved | Not retrieved | Not retrieved as such, but liability accounts are named: the 15-day lookback *"may be longer for certain liability account types"* | `EV-102-104`; `OQ-107-012` |
| **C9** Akoya | Not retrieved | Not retrieved | Not retrieved | Response shape is FDX-typed — the retrieved example returns `depositTransaction` for a deposit account and an `IRA` investment account, so the type discrimination is in the schema | `EV-102-108`; `OQ-107-012` |

**Only C6's account-type schema was retrieved.** This is the least symmetric part
of the package and it is recorded as such: `OQ-107-012` carries the equivalent
retrieval for the other three, and no conclusion about their coverage is drawn
from the gap. The FDX standard C9 implements defines deposit, loan, line-of-credit
and investment transaction types, so its answer is likely structural rather than
per-institution — but *likely* is not evidence.

One asymmetry is worth stating plainly because it cuts the other way: C6's
documented limits are visible **because** its schema documentation was retrieved.
A candidate with no retrieved limits is not thereby a candidate without limits.

### 3.3 Institution coverage is not measured here

Every candidate publishes an institution count. None of those numbers is
admissible under the CBD-102 evidence rules:

* A marketing count is **Asserted** evidence, capped at Low confidence by
  §3.1, and §3.2 permits a rubric score of at most `2` on it.
* The counts are not comparable. They mix institutions supporting different
  products, different account types, and different access methods, and none of
  them states which subset supports transactions for checking, savings, and
  credit-card accounts — the only subset CoBudget needs.
* The question that actually matters is per-institution, not aggregate: whether
  *the specific institutions CoBudget's customers use* are covered, with
  transactions, on a permissioned rather than credential-replay path.

`OQ-107-001` carries the access-method question and `OQ-107-013` carries the
coverage question in its usable form — a named institution list checked against
each candidate's published coverage lookup. Until then, coverage is an
**open question, not a finding**, and CBD-108 should not treat any candidate as
having a coverage advantage on this package's evidence.

## 4. The transaction lifecycle

### 4.1 Four candidates, four lifecycles

| | C6 Plaid | C7 MX | C8 Mastercard | C9 Akoya |
| --- | --- | --- | --- | --- |
| Pending marker | `pending` boolean | `status` `PENDING` | `status` pending | FDX `status` |
| Posted marker | `pending` false | `status` `POSTED` | `status` active | FDX `status` `POSTED` |
| Superseded marker | `removed` array | deletion | `status` shadow | Not retrieved |
| Identifier across transition | **New id, with `pending_transaction_id` back-reference** | Same `guid` when updatable; **most commonly deleted and replaced with a new `guid`** | **"no continuity guarantee"**; may become shadow plus a new active record | Not retrieved |
| Linkage evidence | **Explicit field** | None documented for the common case | Status signal, no back-reference | Not retrieved |
| Evidence | `EV-102-092` | `EV-102-099` | `EV-102-103` | `OQ-107-009` |

C6 is the only candidate that supplies an explicit back-reference. C8 supplies a
change signal without a back-reference. C7 documents that its common path
supplies neither. C9's behaviour was not retrieved.

`FC-107-011` is written against that spread: pending and posted are two
observations, joined only on provider evidence, never on amount-and-date
proximity. On C6 the join is automatic; on C7's common path it does not happen at
all, and the operational assessment prices that.

### 4.2 The date-field trap

This is the most product-relevant finding in the package, and it is the direct
answer to CBD-107's first acceptance criterion.

**On at least one candidate, the primary date field changes meaning when a
transaction posts.** C6 documents `date` as *"For pending transactions, the date
that the transaction occurred; for posted transactions, the date that the
transaction posted."* Those are different days. A transaction authorized on the
31st and posted on the 2nd carries the 31st while pending and the 2nd once
posted — in the same field.

The consequence is a correctness problem, not a presentation one. CoBudget
assigns transactions to budget periods, and `docs/architecture.md` § Key data
rules requires historical periods to be preserved across schedule changes.
A period assignment computed from `date` would move a transaction from one month
to the next when it posts, silently changing a closed period's totals.

C6 also supplies the fix and names it: `authorized_date` is *"The date that the
transaction was authorized"*, and for posted transactions *"the `date` field will
indicate the posted date, but `authorized_date` will indicate the day the
transaction was authorized"*. The documentation's own guidance is that
*"`authorized_date`, when available, is generally preferable to use over the
`date` field for posted transactions, as it will generally represent the date the
user actually made the transaction."*

**But "when available" is the whole difficulty.** The same documentation records
that `datetime` and `authorized_datetime` are *"returned for select financial
institutions"* and *"may contain default time values (such as 00:00:00)"*, and
that *"not all institutions provide pending transactions"* at all. Authorization-
date reliability is therefore **institution-dependent and best-effort**, and the
provider says so rather than claiming otherwise.

The other candidates' date fields:

| Candidate | Occurrence / authorization | Posting | Notes | Evidence |
| --- | --- | --- | --- | --- |
| **C6** | `authorized_date`, `authorized_datetime` | `date`, `datetime` | `date` is polymorphic by status; `authorized_*` is *"when available"*; `*_datetime` for *"select financial institutions"* | `EV-102-092` |
| **C7** | `transacted_at` — *"The date and time the transaction took place"* | `posted_at` — *"the transaction was posted to the account"* | `date` is a search field *"generally the same as `transacted_at`, but uses `posted_at` as a fallback"* — a documented fallback rather than a polymorphic meaning | `EV-102-099` |
| **C8** | `transactionDate` | `postedDate` | `createdDate` also present; the page does not define the three | `EV-102-103` |
| **C9** | `transactionTimestamp` | `postedTimestamp` | FDX-defined; both present in the retrieved example | `EV-102-108` |

C7 and C9 keep occurrence and posting in **separate, stably-named fields**, which
is structurally safer than C6's polymorphic `date` even though C6's
`authorized_date` is richer when populated.

**The CoBudget rule that follows**, and it is a `FC-107-011` consequence rather
than a new decision: period assignment uses the authorization or occurrence date
where the provider supplies one, falls back to the posting date where it does
not, and **records which was used on the observation**. A period total must never
change because a transaction's status changed, and the only way to guarantee that
is to store the basis alongside the value rather than recomputing it later.
`EG-91-005` holds the exact field mapping open; `OI-107-014` records the value
question this raises for CBD-11.

### 4.3 What the map does not settle

Two lifecycle behaviours no candidate's retrieved documentation establishes:

* **Correction of a posted transaction.** All four can modify or remove, but none
  of the retrieved pages states whether a corrected amount arrives as a
  modification to the same record or as a removal plus an addition. That
  distinction decides whether CoBudget's `DI-91-068` observation history shows a
  correction or a deletion-and-reinsertion. `OQ-107-014`.
* **Duplicate suppression across two connections to the same institution.**
  `CA-92-002` guarantees the two connections are independent, so the same
  real-world transaction can legitimately appear twice. Nothing in the retrieved
  documentation says whether any provider deduplicates across Items, members,
  consents or grants — and `CA-92-003` means CoBudget must not rely on it if it
  does. `OQ-107-015`.

## 5. Data-field capability map

### 5.1 The fields CoBudget needs, and why

Derived from `DI-91-015` normalized transactions, `DI-91-068` source
observations, and `docs/architecture.md` § Key data rules.

| Field | Why it is needed | Approved source |
| --- | --- | --- |
| Stable observation identifier | Per-observation provenance and idempotent re-import | `HG-102-061`; `DI-91-068` |
| Account identifier | Binds the observation to one account within one connection | `HG-102-062`; `CA-92-003` |
| Amount in exact minor units | Integer minor units with a currency code; no float arithmetic | Architecture § Key data rules |
| Currency code | Same rule | Architecture § Key data rules |
| Occurrence or authorization date | Period assignment that does not move — §4.2 | `DI-91-015`; CBD-11 |
| Posting date | Reconciliation and the pending-to-posted join | `FC-107-011` |
| Status | Pending, posted, or superseded | `FC-107-011` |
| Description as provided | The immutable source field; never the only basis for a merge | `DI-91-068`; `CA-92-003` |
| Direction | Debit or credit, explicitly rather than by amount sign | `DI-91-015` |
| Pending linkage | The join evidence, where the provider supplies it | `FC-107-011` |

### 5.2 What each candidate supplies

`Y` means documented on a retrieved page. `—` means not retrieved. A parenthetical
records the caveat.

| Field | C6 Plaid | C7 MX | C8 Mastercard | C9 Akoya |
| --- | --- | --- | --- | --- |
| Stable observation identifier | `Y` `transaction_id` | `Y` `guid` (unstable across the common pending-to-posted path) | `Y` `uniqueTransactionId` (not the `id` field) | `Y` `transactionId` |
| Account identifier | `Y` `account_id` | `Y` `account_guid` | `Y` `accountId` | `Y` `accountId` |
| Amount | `Y` | `Y` | `Y` | `Y` (retrieved example shows a signed decimal) |
| Currency code | — | — | — | `Y` `currency.currencyCode` |
| Occurrence / authorization date | `Y` `authorized_date` (*"when available"*) | `Y` `transacted_at` | `Y` `transactionDate` | `Y` `transactionTimestamp` |
| Posting date | `Y` `date` / `datetime` (polymorphic) | `Y` `posted_at` | `Y` `postedDate` | `Y` `postedTimestamp` |
| Status | `Y` `pending` boolean | `Y` `status` | `Y` active/pending/shadow | `Y` `status` |
| Description | `Y` | `Y` | `Y` | `Y` `description` |
| Direction | `Y` (amount sign plus category) | `Y` `type` `CREDIT`/`DEBIT`, `is_expense` | — | `Y` `transactionType` |
| Pending linkage | `Y` `pending_transaction_id` | **No** — none documented | Status signal only | — |

Two observations from the table rather than from any one cell:

* **Amount representation was not confirmed as integer minor units on any
  candidate.** Every retrieved example shows a decimal number. `docs/architecture.md`
  requires integer minor units with a currency code, so the adapter converts on
  ingest and the conversion is a place a rounding error would be invisible.
  `OQ-107-016` retrieves each provider's documented amount type and precision;
  until then this is the least-verified field in the map despite being the one
  that carries money.
* **Currency was retrieved only for C9.** Private MVP is USD-only, so this is low
  risk, but a field that is assumed rather than read is exactly what `DI-91-068`
  provenance is supposed to prevent. `OQ-107-016` covers it.

### 5.3 Unknown is recorded as unknown

`EG-91-005`'s interim position requires that unsupported fields be *"marked
unsupported"* rather than defaulted. Applied here: where a provider does not
supply a field CoBudget needs, the observation records its absence explicitly.
A missing `authorized_date` produces an observation whose period basis is the
posting date **and says so**, not an observation that silently pretends the
posting date was the authorization date.

This is why §4.2's rule stores the basis alongside the value. It is also why the
`Y`/`—` distinction in §5.2 is kept rather than collapsed into a score.

## 6. Provider-signal record

### 6.1 What each candidate publishes

CBD-107's fifth deliverable asks for a provider-signal record for future
`FF-007` research. These rows carry stable `PS-107-*` keys so `FF-007` can cite
them without re-deriving them.

| ID | Signal | Available on | Granularity | Evidence |
| --- | --- | --- | --- | --- |
| PS-107-001 | Connection status enumeration | C7 — `connection_status` with `CONNECTED`, `DISCONNECTED`, `FAILED` | Per connection | `EV-102-098` |
| PS-107-002 | Aggregation freshness timestamps | C7 — `successfully_aggregated_at`, `aggregated_at` | Per connection | `EV-102-100` |
| PS-107-003 | Reauthentication-required signal | C6 — `ITEM_LOGIN_REQUIRED`, `PENDING_EXPIRATION`, `PENDING_DISCONNECT` | Per connection | `EV-102-096` |
| PS-107-004 | Consent-revoked-at-provider notification | C9 — consent webhook fires when a user *"revokes their consent at a data provider's portal"* | Per grant | `EV-102-109` |
| PS-107-005 | Platform maintenance and outage notification | C9 — maintenance webhook for *"Planned or unplanned outages"* | Network-wide | `EV-102-109` |
| PS-107-006 | Consent record with active/inactive institution connection state | C8 — consent receipt records *"whether the financial institution connection is active or inactive"* | Per institution login | `EV-102-102` |
| PS-107-007 | Token-expiry model as a reauthentication predictor | C9 — refresh tokens are perpetual, set (*"commonly a year"*), or rolling, **varying by data provider** | Per institution | `EV-102-106` |
| PS-107-008 | Transaction-mutability window | C8 — the 15-day lookback, *"longer for certain liability account types"* | Per account type | `EV-102-104` |
| PS-107-009 | Refresh-rate floor | C7 — *"you cannot run a new aggregation within three hours of a successful aggregation"* | Per connection | `EV-102-100` |
| PS-107-010 | Pending-transaction availability | C6 — *"not all institutions provide pending transactions"* | Per institution | `EV-102-092` |
| PS-107-011 | Authorization-date availability | C6 — `authorized_date` *"when available"*; `*_datetime` for *"select financial institutions"* | Per institution | `EV-102-092` |

`PS-107-007`, `PS-107-010` and `PS-107-011` are the three most useful rows for
`FF-007`, because each is a **per-institution** signal rather than a
per-provider one. They are also the three that cannot be evaluated without live
connections across a range of institutions, which is precisely what makes them
future research rather than present findings.

### 6.2 What is deliberately not decided

No weighting, threshold, ranking, or composite score is selected, and none is
implied by the ordering above. `FC-107-018` states the reason and `CR-91-006`
supplies the principle in miniature: a signal is an observation, and turning
observations into a quality judgement is a modelling decision `FF-007` owns.

Two temptations are named so they are refused explicitly rather than by
omission:

* **Counting signals is not scoring providers.** C7 appears in four rows above
  and C8 in two. That reflects which pages were retrieved and which vendors
  document operational state verbosely, not which provider is more reliable.
* **A provider that publishes a limitation is not worse than one that does
  not.** C6's *"not all institutions provide pending transactions"* and C8's
  15-day lookback are disclosures. Their absence from another candidate's
  documentation is an unasked question, not a better answer — the same rule
  §3.2 applies to coverage.

## 7. Open questions

| ID | Question | Serves | Action |
| --- | --- | --- | --- |
| OQ-107-012 | Account-type and subtype schemas for C7, C8 and C9, and which types support transactions | Deliverable 2 | Retrieve ×3. Only C6's was retrieved, and §3.2 refuses to infer the rest |
| OQ-107-013 | Coverage of a named institution list — the specific institutions CoBudget's customers use — checked against each candidate's published lookup, for checking, savings and credit-card transactions | Deliverable 2 | The usable form of the coverage question. Aggregate counts are inadmissible under §3.3 |
| OQ-107-014 | Whether a corrected posted transaction arrives as a modification or as a removal plus an addition, ×4 | `FC-107-008`; `FU-95-012` | Retrieve, then confirm by observation. Decides what `DI-91-068` history shows |
| OQ-107-015 | Whether any provider deduplicates across two connections to the same institution, ×4 | `CA-92-002`, `CA-92-003` | Retrieve. CoBudget must not rely on it either way, but must know whether it happens |
| OQ-107-016 | Documented amount type and precision, and currency-code availability, ×4 | Architecture § Key data rules | Retrieve. The least-verified field in §5.2 is the one carrying money |
| OQ-107-017 | Whether `PS-107-007`, `010` and `011` per-institution signals are retrievable in bulk, or only observable per connection | `FF-007` | Determines whether `FF-007` can start from provider data or must accumulate its own |

## 8. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-107-013 | Account-type coverage was retrieved for one candidate of four, and institution coverage for none. | **This is the least complete part of the package.** Deliverable 2 is partially met, the traceability record says so, and CBD-108 must not read the gap as a coverage advantage for any candidate. |
| OI-107-014 | §4.2 establishes that period assignment must use a stored basis rather than a recomputed date, or a closed period's totals can change when a transaction posts. | This is a CBD-11 and CBD-12 consequence surfaced by provider evidence, not a CBD-107 decision. It needs to reach whoever owns period assignment before that code is written. `EG-91-005` holds the field mapping open. |
| OI-107-015 | Amount representation was not confirmed as integer minor units on any candidate. | `docs/architecture.md` requires them, so the adapter converts. A conversion that is never verified is a rounding error nobody sees. `OQ-107-016` closes it. |
| OI-107-016 | The `PS-107-*` register records availability only. No signal has been observed, and none has been shown to correlate with anything. | `FF-007` starts from an inventory rather than a survey, which is the point. It does not start from evidence that these signals are useful. |
