# CBD-108 — Carried Item Disposition Register

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Gives an explicit disposition to every open question and open item carried forward by the six CBD-15 category packages — **227 in total**, none closed by silence. Evidence register §7 requires that carrying: *"A question that stops being asked is recorded as `Absent` evidence, which scores 0 under rubric rule R3."* Completeness is guaranteed mechanically by `scripts/audit-cbd-108.py`; the class assigned to each item is derived from the item's own recorded text by the stated rule in §3, and 23 items are recorded as **not derivable**, which is itself a finding. |
| Document version | 0.40 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. **Not yet reviewed.** |
| Jira | [CBD-108](https://cobudget.atlassian.net/browse/CBD-108) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Provider Set Disposition Register v0.40; Cross-Category Coherence Review v0.40; Combined Cost Model v0.40; Acceptance Criteria Traceability v0.40; Evidence Retrieval Pass v0.40 |
| Confluence page | **Not published.** Registration follows approval. |
| Repository baseline | `8ccf59f` |
| Last updated | August 29, 2026 |

## 1. Why this register exists

Each category evaluation carried its unresolved questions forward rather than
closing them, on the rule the evidence register §7 sets: a question that stops
being asked becomes `Absent` evidence and scores `0`. CBD-108 is where those
carries land, and the ticket's sixth acceptance criterion — *"CBD-14 findings
have explicit dispositions"* — is the specific case of a general obligation.

**The volume is larger than any single evaluation's summary suggests.** Counting
across every document in each package, not only the evaluations:

| Package | Open questions | Open items | Total |
| --- | --- | --- | --- |
| CBD-103 — Hosting | 29 | 22 | 51 |
| CBD-104 — Identity | 21 | 14 | 35 |
| CBD-105 — PostgreSQL | 11 | 13 | 24 |
| CBD-106 — Email | 13 | 18 | 31 |
| CBD-107 — Financial connectivity | 25 | 21 | 46 |
| CBD-130 — Push and SMS | 18 | 22 | 40 |
| **Total** | **117** | **110** | **227** |

## 2. What a disposition is here, and what it is not

**A disposition names what would resolve an item — not whether it is resolved.**
Assigning `OQ-103-024` to "retrieval" does not read the DPA; it records that a
document exists, that reading it is the action, and that no observation, decision
or vendor conversation substitutes.

This register **resolves nothing**. Its value is that after it, no carried item
is in an undefined state, and the work implied by 227 items is visible as six
kinds of work rather than as an undifferentiated backlog.

## 3. How the class was assigned

Two different guarantees apply, and conflating them would overstate the second.

**Completeness is mechanical.** `scripts/audit-cbd-108.py` collects every
`OQ-*` and `OI-*` identifier defined in the six packages and fails if any is
missing from this register, appears twice, or appears here without being defined
in a package. That check is exact and reproducible.

**Classification is derived, and therefore reviewable rather than authoritative.**
Each item's class comes from matching its own recorded disposition text against
an ordered rule list, first match winning. The order is `D1`, `D9`, `D8`, `D4`,
`D2`, `D5`, `D6`, `D3`, `D7`, and it is stated in the audit script so the
derivation can be re-run rather than trusted. Where no rule matches, the item is
recorded as **`D0` — not derivable**, rather than forced into a class that reads
as a decision.

This coupling is live rather than notional: editing an item's text in a source
package changes what the rules derive for it, and the audit fails until this
table is regenerated. `OI-107-021` moved from `D0` to `D1` on August 29, 2026
when its closure was recorded, and the guard caught the drift.

**23 items are `D0`.** That is the finding: roughly one carried item in ten does
not state, in its own text, what would resolve it. Those are the items whose
disposition requires a person to read them, and they are enumerated below rather
than hidden in a total.

## 4. The register

| Class | Meaning | Count | Items |
| --- | --- | --- | --- |
| **D1** | Already resolved in the source package before CBD-108 opened | 15 | `OI-103-008`, `OI-103-017`, `OI-103-018`, `OI-103-019`, `OI-103-020`, `OI-103-021`, `OI-103-022`, `OI-106-017`, `OI-107-008`, `OI-107-021`, `OI-130-009`, `OI-130-010`, `OQ-103-003`, `OQ-103-022`, `OQ-105-011` |
| **D2** | Discharged by the authorized route-A observation pass | 24 | `OI-104-007`, `OI-104-008`, `OI-105-003`, `OI-105-007`, `OI-105-008`, `OI-106-007`, `OI-106-013`, `OI-107-007`, `OI-107-010`, `OI-107-016`, `OI-130-001`, `OI-130-008`, `OI-130-011`, `OQ-103-012`, `OQ-103-028`, `OQ-104-007`, `OQ-104-011`, `OQ-104-019`, `OQ-105-003`, `OQ-106-006`, `OQ-107-014`, `OQ-107-021`, `OQ-130-001`, `OQ-130-002` |
| **D3** | Discharged by retrieval — a document exists and has not been read | 91 | `OI-103-010`, `OI-104-002`, `OI-105-004`, `OI-105-005`, `OI-105-012`, `OI-106-009`, `OI-107-002`, `OI-107-015`, `OQ-103-001`, `OQ-103-002`, `OQ-103-004`, `OQ-103-005`, `OQ-103-006`, `OQ-103-007`, `OQ-103-008`, `OQ-103-009`, `OQ-103-010`, `OQ-103-013`, `OQ-103-014`, `OQ-103-015`, `OQ-103-016`, `OQ-103-017`, `OQ-103-018`, `OQ-103-019`, `OQ-103-020`, `OQ-103-021`, `OQ-103-023`, `OQ-103-025`, `OQ-103-027`, `OQ-104-001`, `OQ-104-002`, `OQ-104-003`, `OQ-104-004`, `OQ-104-008`, `OQ-104-009`, `OQ-104-010`, `OQ-104-012`, `OQ-104-016`, `OQ-104-017`, `OQ-104-018`, `OQ-104-020`, `OQ-105-001`, `OQ-105-002`, `OQ-105-004`, `OQ-105-005`, `OQ-105-006`, `OQ-105-007`, `OQ-105-008`, `OQ-105-009`, `OQ-105-010`, `OQ-106-001`, `OQ-106-003`, `OQ-106-004`, `OQ-106-005`, `OQ-106-007`, `OQ-106-008`, `OQ-106-009`, `OQ-106-010`, `OQ-106-011`, `OQ-106-012`, `OQ-106-013`, `OQ-107-001`, `OQ-107-003`, `OQ-107-004`, `OQ-107-005`, `OQ-107-006`, `OQ-107-007`, `OQ-107-009`, `OQ-107-011`, `OQ-107-012`, `OQ-107-013`, `OQ-107-015`, `OQ-107-016`, `OQ-107-017`, `OQ-107-018`, `OQ-107-019`, `OQ-107-023`, `OQ-107-025`, `OQ-130-003`, `OQ-130-004`, `OQ-130-006`, `OQ-130-007`, `OQ-130-008`, `OQ-130-009`, `OQ-130-010`, `OQ-130-011`, `OQ-130-012`, `OQ-130-013`, `OQ-130-015`, `OQ-130-017`, `OQ-130-018` |
| **D4** | Requires provider contact — no published document can answer it | 10 | `OI-103-015`, `OI-107-018`, `OQ-103-011`, `OQ-104-005`, `OQ-104-006`, `OQ-104-021`, `OQ-107-008`, `OQ-107-010`, `OQ-107-020`, `OQ-130-014` |
| **D5** | Requires a Product Owner decision or a CoBudget operating decision | 18 | `OI-103-001`, `OI-103-006`, `OI-103-013`, `OI-104-005`, `OI-104-013`, `OI-105-002`, `OI-105-013`, `OI-106-002`, `OI-106-003`, `OI-106-004`, `OI-106-005`, `OI-106-014`, `OI-106-016`, `OI-107-003`, `OI-107-004`, `OI-107-020`, `OI-130-003`, `OI-130-021` |
| **D6** | Owned by CBD-108 itself | 26 | `OI-103-009`, `OI-103-011`, `OI-104-001`, `OI-104-009`, `OI-104-010`, `OI-105-009`, `OI-105-010`, `OI-106-001`, `OI-106-010`, `OI-106-011`, `OI-106-018`, `OI-107-001`, `OI-107-011`, `OI-107-013`, `OI-107-017`, `OI-130-013`, `OI-130-015`, `OI-130-019`, `OI-130-022`, `OQ-103-024`, `OQ-104-013`, `OQ-104-014`, `OQ-104-015`, `OQ-106-002`, `OQ-107-002`, `OQ-130-005` |
| **D7** | Deferred to build or to a later ticket | 5 | `OI-103-004`, `OI-103-005`, `OI-104-003`, `OI-105-001`, `OI-130-005` |
| **D8** | Accepted limitation — no action available at selection time | 14 | `OI-103-007`, `OI-103-012`, `OI-103-016`, `OI-104-006`, `OI-104-011`, `OI-104-012`, `OI-105-006`, `OI-105-011`, `OI-106-006`, `OI-106-012`, `OI-107-006`, `OI-107-012`, `OI-130-007`, `OI-130-016` |
| **D9** | Blocked by the `OI-102-023` NDA constraint | 1 | `OQ-107-024` |
| **D0** | Not derivable from the item's own recorded text — requires reading | 23 | `OI-103-002`, `OI-103-003`, `OI-103-014`, `OI-104-004`, `OI-104-014`, `OI-106-008`, `OI-106-015`, `OI-107-005`, `OI-107-009`, `OI-107-014`, `OI-107-019`, `OI-130-002`, `OI-130-004`, `OI-130-006`, `OI-130-012`, `OI-130-014`, `OI-130-017`, `OI-130-018`, `OI-130-020`, `OQ-103-026`, `OQ-103-029`, `OQ-107-022`, `OQ-130-016` |

## 5. What the distribution says

**`D3` at 91 items is the largest class by a wide margin, and it is the cheapest
work in the set.** These are documents that exist and have not been read —
pricing pages, licence tiers, API references, retention policies. Roughly two
fifths of the entire CBD-15 backlog is ordinary desk retrieval, requiring no
account, no vendor conversation, no Product Owner decision, and no observation.

**`D2` at 24 items is the class that blocks selection**, and it is a single
action rather than 24. The route-A observation pass discharges them together;
none can be discharged without it.

**`D6` at 26 items is what CBD-108 itself owes.** The companion documents in this
package address them — coherence, cost comparison, and the per-category
dispositions — and the traceability record maps which document answers which.

**`D4` at 10 items cannot be closed by any amount of reading.** Only the vendor
can answer, which makes them the items most likely to be forgotten by a desk
process and the ones with the longest lead time.

**`D9` is a single item, and its size understates it.** `OI-102-023`'s
constraint does not merely block one question; it caps what category F's
evidence can ever establish while its material stays NDA-bound. The item count is
one; the consequence is a whole category's rubric ceiling.

**`D0` at 23 items is a defect in the corpus, not in this register.** An item
whose own text does not say what would resolve it cannot be scheduled, assigned,
or estimated. Reading and reclassifying those 23 is the smallest piece of work in
this package with a disproportionate effect on the legibility of the rest.

## 6. What this register does not do

* **It resolves no item**, changes no gate outcome, and moves no verdict.
* **It does not re-open resolved items.** The 15 in `D1` were resolved by
  Product Owner decision in their own packages and are listed for completeness
  only.
* **It does not prioritize.** §5 observes which classes are cheap and which are
  blocking; sequencing them is a Product Owner call, and the disposition register
  companion records the review triggers per category.
* **It does not assign owners.** Every item's owner is the Product Owner or
  CoBudget by default, and no other role exists to assign to.

## 7. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-108-015 | **23 carried items do not state what would resolve them** and are recorded as `D0`. | The classification is honest about its own limit rather than guessing. Reading those 23 is a small, well-defined task that would remove the register's one soft spot. |
| OI-108-016 | **The class assignment is derived by rule from each item's recorded text, not by reading the item.** A badly worded disposition will be classified by its wording. | Stated so the register is not read as an editorial judgment on 227 items. Completeness is exact; classification is a starting position, and `scripts/audit-cbd-108.py` makes re-deriving it a single command. |
| OI-108-017 | **`D3`'s 91 retrievals are unowned and unscheduled.** They are the cheapest work in the CBD-15 corpus and nothing is currently driving them. | The largest available improvement to the evidence position, and it needs no authorization that does not already exist. |
