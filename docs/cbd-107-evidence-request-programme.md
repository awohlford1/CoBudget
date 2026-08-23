# CBD-107 — Aggregator Evidence Request Programme

| Field | Value |
| --- | --- |
| Status | **Working programme document, not a governing artifact.** It plans retrievals; it establishes no gate outcome and settles no verdict. Nothing here may be cited as evidence. The `EV-102-*` register remains the only place a retrieval becomes evidence. |
| Document version | 1.0 |
| Owner | Alexander Wohlford |
| Jira | [CBD-107](https://cobudget.atlassian.net/browse/CBD-107) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Confluence page | **Not published.** No page is registered in `scripts/sync-confluence.py`, deliberately — see §7. |
| Repository baseline | `df04231` |
| Last updated | August 22, 2026 |

## 1. Why this exists

The `HG-102-011` sweep of August 22, 2026 established that **all four
financial-connectivity candidates gate their subprocessor and compliance
material behind a request or an NDA**, where every other CBD-15 category's
equivalent material is public. That is recorded at the evaluation §3.2 and §7.9
of the hosting evaluation, with `EV-102-182`–`185` as the records.

The consequence was a method problem rather than an evidence one: this
category's documentary gap could not be closed by reading, because the documents
are not published. `OI-103-022` put that to the Product Owner, who **amended
CBD-15's scope on August 22, 2026** to permit trust-portal access requests and
evaluation NDAs, solely to obtain provider evaluation evidence — no contract, no
purchasing, no production data, and no production account.

This document is the plan that amendment makes possible. It exists so the
requests are made deliberately, ask for the right things, and are not repeated.

## 2. What each request must obtain, and what it closes

The same five items are wanted from all four candidates. Asking for the same
list of each is deliberate: an asymmetric request produces an asymmetric
evaluation, which is the defect `OI-103-009` spent this whole pass correcting.

| Requested item | Gate or question it bears on | Why this item specifically |
| --- | --- | --- |
| **Dated subprocessor list** | `HG-102-011` | The gate all four currently miss. The pass test needs the list *obtained and dated*; a categorical description of recipient types does not satisfy it. |
| **Data processing addendum or master agreement** | `HG-102-013`, and the contractual half of `HG-102-011` | `HG-102-013`'s pass test says *"Silence fails"*, so the contract must be read to know whether the provider is silent. It is the one gate that could fail every candidate in every category simultaneously. |
| **SOC 2 Type II report** | `HG-102-007`, `HG-102-008`, `HG-102-009` | Operator access, impersonation and break-glass, and customer-obtainable evidence of staff access. No vendor publishes these; a control report is where they are described and tested. **A SOC 3 report is not a substitute** — it carries no control detail. |
| **Encryption and key-management detail** | `HG-102-010` | The pass test needs the algorithm **and** key custody stated. Marketing security pages state neither with the precision the gate asks for. |
| **Prefilled CAIQ or SIG questionnaire** | `HG-102-002`, `HG-102-003`, and often subprocessors | A completed questionnaire usually answers correlation-identifier handling and purpose separation in one document, which is otherwise the hardest pair to source. |

One candidate-specific addition. For **C9 Akoya**, ask whether the SOC 2 scope
covers the pass-through claim recorded at `OQ-107-025` — that Akoya *"does not
store any data accessed or shared on its network"* and that *"at no point does
Akoya know who the consumer is or what data they are sharing."* That claim would
bear on several gates at once if sustained, and it currently supports none,
because it appears on a marketing security page with no architectural
description attached. The SOC 2 scope statement is what would test it.

## 3. The four routes

| Candidate | Mechanism | NDA | What is advertised |
| --- | --- | --- | --- |
| **C6 Plaid** | Trust Center, `https://security.plaid.com/` | Not stated | Its own launch announcement lists SOC 2 Type 2, ISO 27001, ISO 27701, penetration-test results, prefilled vendor questionnaires, and cyber insurance |
| **C7 MX** | MX Trust Exchange by UpGuard, `https://trust.upguard.com/0c5d7a1f-f033-4b3d-ae9c-ea6b73bf5b0e` | **Yes, explicitly** — *"Request access to documents shared securely under NDA"* | A **SOC 3** Type 2 report and two whitepapers |
| **C8 Mastercard / Finicity** | No portal. A due-diligence request through an account contact — Finicity offers to *"send prepared materials for review along with a due diligence guide, plus provide a representative"* — or the published privacy contact `ob.privacy@mastercard.com` | Unknown | Not enumerated |
| **C9 Akoya** | No portal found. Direct request | Unknown | SOC 2 Type II completed May 2021, audited by a big-four firm against the Security and Confidentiality criteria |

**Recommended order: C6 first.** It is the only route that is self-serve and
does not state an NDA requirement, so it tests whether this material actually
closes the gates **before** anything is signed with C7 or C8. C6 is also the
only aggregator with a cursor at all, which makes it the candidate whose
evidence is most likely to matter.

**C7 is the request most likely to disappoint.** Its portal advertises a SOC 3
report, which is a public-summary document carrying neither the control detail
`HG-102-007`–`009` need nor a subprocessor list. An NDA that yields only a SOC 3
buys nothing this programme wants. Ask what else is available **before** signing,
rather than signing to find out.

## 4. Why this matters beyond filling gaps

Rubric rule `R2` caps a criterion scored on vendor assertion at `2`, and reserves
`3` and `4` for observed behaviour, an independent attestation, or a contractual
commitment. Every evidence record in this category today is Documented or
Absent.

**A SOC 2 report is Attested and a signed addendum is Contractual.** They are
therefore the only route by which any category **F** criterion can score above
`2` — not because the aggregators are weaker than other providers, but because
nothing has been obtained from them that the rubric permits to score higher.
Until these requests are made, this category is structurally capped below every
other one, and any comparison CBD-108 draws across categories inherits that
artifact.

## 5. The problem to settle before the first document arrives

**Material received under NDA cannot be recorded the way the evidence register
records everything else.**

The register's method is verbatim quotation with a source URL and a retrieval
date. That is what makes a record checkable by a second reader, and it is why
every `EV-102-*` limitation field quotes the vendor rather than paraphrasing.
Published `EV-102-*` records also synchronize to Confluence.

A document received under NDA cannot be quoted into a published record. Three
dispositions are available and the register does not currently choose between
them:

1. **Cite without quoting.** The record names the document, its date and its
   scope, and states the conclusion drawn, with no quoted text. Weakest for a
   second reader, and it moves the register toward the assertion it was built to
   avoid — but it keeps the evidence trail continuous.
2. **Keep NDA'd material out of the register entirely.** It informs a gate
   outcome without appearing as a record. Cleanest legally, worst for
   traceability: a gate outcome would rest on something the register does not
   contain, which `CBD-92` §10.3 is precisely about.
3. **Record it, and do not publish it.** The record exists in the repository
   with its quotations and is excluded from the Confluence sync. Preserves the
   method at the cost of a private tier the register has never had, and the
   repository is not an access-controlled store.

This is a method question of the same shape as `OI-106-017`, and it should be
settled **before** the first NDA'd document arrives rather than after, because
the disposition changes how the document may be read and stored from the moment
it is received. Raised at `OI-102-023` in the evidence register.

## 6. What this programme does not do

* It obtains nothing. Every route above is a request that a person must make;
  none has been made.
* It creates no account, signs no agreement, and enters no identity or company
  detail anywhere. The CBD-15 amendment permits those acts; it does not perform
  them.
* It changes no gate outcome, no verdict, no tally and no rubric score. Nothing
  in this document is evidence, and no `EV-102-*` record cites it.
* It does not settle `OI-102-023`. Until that is settled, an NDA may be signed
  but the resulting document has no agreed home.

## 7. Why this document is not published to Confluence

Every other CBD-107 document is a governing artifact that CBD-108 reads. This
one is an operational plan naming request routes and contact addresses, and it
will be stale the moment the requests are made. It is deliberately left out of
`scripts/sync-confluence.py` and out of `scripts/audit-cbd-107.py`'s package
file list, so that neither treats it as part of the approved package. If the
programme's **results** need publishing, they belong in the evaluation's
evidence register, which is already a synchronized target.
