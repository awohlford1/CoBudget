# CBD-102 — Evidence Register and Exception Rules

| Field | Value |
| --- | --- |
| Status | **Approved** — Product Owner approved v1.0 on August 18, 2026. Governs how a provider claim becomes evidence, and when a failed hard gate may be accepted with a compensating control. |
| Document version | 1.3 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner. Approval covers the evidence record and its required fields, the six evidence classes and their confidence mapping, the `UNPROVEN` outcome and the four eligibility verdicts, the staleness and re-verification rules, `EX-102-001`–`007`, the §5.2 non-exceptable gates, and the residual-risk record. It grants no exception and does not close the open items in §8. **v1.3 adds §3.0.2 by Product Owner decision of August 29, 2026, resolving `OI-102-023`: material received under a non-disclosure agreement does not enter this register and therefore supports no finding.** No existing record, class, confidence, gate outcome or exception rule changes. |
| Jira | [CBD-102](https://cobudget.atlassian.net/browse/CBD-102) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | Hard-Gate Catalog v1.0; Evaluation Rubric v1.0; Demand Model v1.0; Cost Template v1.0 |
| Confluence page | [CBD-102 — Evidence Register and Exception Rules](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/9601048) |
| Repository baseline | `717f143` |
| Last updated | August 29, 2026 |

## 1. Purpose

Two jobs, closely related:

1. **The evidence register** fixes what counts as knowing something about a
   provider. Every gate result, rubric score, and cost figure traces to a
   registered evidence item, and every item records its source, retrieval date,
   confidence, and limitations.
2. **The exception rules** fix when a provider that fails a hard gate may still
   be used, who may decide that, and what must be recorded — so that an
   exception is a visible, expiring, owned decision rather than a quiet
   downgrade of an approved contract.

CBD-92 §10.3 supplies the principle both rest on: *a provider name alone is not
closure evidence.*

## 2. Evidence record

One record per claim per provider. Registered under a stable `EV-102-*` key.

| Field | Content | Required |
| --- | --- | --- |
| Evidence ID | `EV-102-NNN`, stable, never reused | Yes |
| Claim | The exact `HG-102-*`, `WR-102-*`, or `CT-102-*` item this supports | Yes |
| Provider and category | Name, and one of H / I / D / E / F / N | Yes |
| **Source** | Precise enough to re-retrieve: URL plus page title, document title with version, contract clause number, the test performed and its result, or the named person and channel for a direct answer | Yes |
| **Retrieval date** | The date the evidence was obtained, not the date it was written | Yes |
| Evidence class | Per §3 | Yes |
| **Confidence** | Derived from class per §3, or lowered with a reason | Yes |
| **Limitations** | What this evidence does *not* establish — the scope, version, region, or plan tier it fails to cover | Yes |
| Re-verify by | Per §4 | Yes |
| Superseded by | The `EV-102-*` that replaced it, where applicable | If applicable |

A claim with no evidence record is not a finding. It is an open question, and it
appears in the evaluation's open-questions list.

### 2.1 Limitations is not an optional field

The most common failure in provider evaluation is evidence that is real but
narrower than the claim it is used for: a SOC 2 report covering a different
product line, documentation describing a higher plan tier, a status page
covering one region, a DPA clause that applies only to a named subprocessor.

Recording limitations is what makes that visible. An evidence record whose
limitations field is empty is treated as **incomplete**, not as unlimited.

## 3. Evidence classes and confidence

Classes are ordered by strength. Confidence uses the CBD-92 §2.3 scale rather
than a new one.

| Class | Meaning | Confidence | Example |
| --- | --- | --- | --- |
| **Observed** | CoBudget performed the test and recorded the result | High | A restore executed into an isolated environment for `HG-102-041`; a captured telemetry payload for `HG-102-001` |
| **Contractual** | A binding commitment in an executed or offered DPA, MSA, or SLA | High | A data-residency clause for `HG-102-011` |
| **Attested** | Independent third-party evaluation | Medium | SOC 2 Type II, ISO 27001, an independent penetration-test summary, an independently prepared ACR for `WR-102-013` |
| **Documented** | The vendor's own versioned technical documentation | Medium | Published API reference establishing per-surface rate policies for `HG-102-021` |
| **Asserted** | Vendor statement without independent support | Low | A sales answer, a marketing page, a support-ticket reply, an unaudited self-attestation |
| **Absent** | Sought and not obtained | None | — |

### 3.0.1 Where a source is hosted does not decide its class — Product Owner decision, August 22, 2026

`OI-106-017` asked how to classify a vendor **support-centre article**, a form
§3 did not place. The answer is that **class follows what the statement is
about, not where it is published**:

* A statement about **how the product behaves** — an API's semantics, a
  feature's configuration surface, a documented limitation — is **Documented**
  wherever the vendor publishes it, including a help centre.
* A statement about the vendor's **own internal practice** — staff vetting,
  operator conduct, internal approval processes — is **Asserted**, including
  when it appears on a formal documentation site.

The "support-ticket reply" example under Asserted stands, and is not the same
thing: a reply written to one customer is not published documentation. The
distinction that matters is verifiability by another reader, not the URL.

This is the line `EV-102-001` already drew in practice. That record was
classified Asserted because it described AWS's internal controls, not because it
sat on a trust page. Applying the same rule, a support-centre article describing
how suppression works is Documented, and a trust page describing how engineers
are supervised is Asserted.

### 3.0.2 Material received under a non-disclosure agreement is not evidence — Product Owner decision, August 29, 2026

`OI-102-023` asked where NDA'd material belongs, once the CBD-15 scope
amendment of August 22, 2026 made it obtainable for the first time. The answer
is that **it does not enter this register at all.**

* A document received under a non-disclosure agreement, or through a trust
  portal whose terms restrict onward disclosure, **is not registered as an
  `EV-102-*` record** — not quoted, not cited, not summarized, and not named.
* It therefore **supports no finding**. §2 already fixes the consequence: *a
  claim with no evidence record is not a finding. It is an open question.* A
  gate the material bears on stays `UNPROVEN` under §3.3, and a criterion it
  would have supported stays at whatever its registrable evidence earns.
* This is not a judgment about the material's quality. A SOC 2 Type II report
  read under NDA may be entirely convincing and still move nothing here,
  because this register's unit is a record a second reader can check, and that
  one cannot be made checkable without disclosing it.

**The rule attaches to the document's terms, not to its type or to the fact it
contains.** A DPA the vendor publishes is registrable exactly as before —
`EV-102-168` is one. The same DPA handed over under an NDA is not. And if a
fact first learned from restricted material is *independently* obtainable on
registrable terms — a published page, a clause in an executed agreement, an
observation CoBudget performs — that retrieval is registered normally. The
record must stand on the registrable source alone, and the retrieval must
actually have been made rather than inferred.

**What restricted material may still legitimately do**, none of which is a
register entry: decide whether to pursue a candidate at all; design an
observation, by telling CoBudget what to test and where; and frame a question
whose *answer* can be obtained on registrable terms.

#### Why this rather than the two alternatives

**The repository is public.** The programme document that raised this recorded
only that the repository "is not an access-controlled store." It is in fact a
public GitHub repository, and every clone carries its full history. That
removes option 3 outright — verbatim NDA'd clause text excluded from the
Confluence sync would still be published to the world through git — and it
weakens option 1, because a document's issuer, date, scope and existence are
themselves commonly restricted by the agreements that supply them. Option 2 is
the only disposition that does not publish NDA-derived material anywhere.

The cost is real and is accepted knowingly: this register will be silent about
material CoBudget has read. That is preferred to a register that is either
inaccurate about what a second reader can check, or accurate and in breach.

#### Consequences recorded rather than discovered later

* **Category F.** `HG-102-011`, `HG-102-013`, `HG-102-007`–`009`, `HG-102-010`,
  `HG-102-002` and `HG-102-003` cannot be closed for any aggregator by material
  that arrives under an NDA. Where a route imposes no NDA, material from it is
  ordinary Documented or Attested evidence and registers normally.
* **This makes "does the route impose an NDA?" the property that decides
  whether a route can produce evidence at all**, rather than a matter of
  convenience. It re-ranks the four routes in
  `docs/cbd-107-evidence-request-programme.md` §3 on grounds that document did
  not have when it was written.
* **The rubric ceiling stands.** Rule `R2` and §3.2 are unchanged: a category F
  criterion whose only stronger material is NDA-bound stays at `2`. CBD-108
  inherits that asymmetry and must weigh it as a limit of what was obtainable
  on publishable terms, not as a finding about the aggregators.
* **Nothing already registered moves.** No existing `EV-102-*` record was
  sourced under an NDA.

### 3.1 Confidence may be lowered but never raised

A record may carry confidence **below** its class where the limitations warrant
it — an Attested SOC 2 whose scope excludes the evaluated product is Low, not
Medium. Confidence is never raised above the class. Two Asserted sources
agreeing remain Low; repetition is not corroboration.

### 3.2 What each result needs

| Result | Minimum evidence |
| --- | --- |
| Hard gate `PASS` | **Documented or stronger.** A gate never passes on Asserted evidence alone |
| Hard gate `FAIL` | Any class, including Asserted — a vendor saying it cannot do something is sufficient to establish that it cannot |
| Rubric score 3 or 4 | Observed, Contractual, or Attested — this is rubric rule R2 stated in evidence terms |
| Rubric score 1 or 2 | Documented or Asserted |
| Rubric score 0 | Absent evidence, or evidence showing absence — rubric rule R3 |
| Cost figure | Documented or stronger. An Asserted price is recorded as unknown under cost rule CR4 |

The asymmetry between `PASS` and `FAIL` is deliberate. A vendor's own admission
of a limitation is reliable in a way its claim of a capability is not.

### 3.3 The `UNPROVEN` gate outcome

§3.2 creates a fourth possible gate result, distinct from pass and fail:

| Outcome | Meaning | Remedy |
| --- | --- | --- |
| `PASS` | Documented or stronger evidence confirms the property | — |
| `UNPROVEN` | Evidence is Asserted or Absent; the property is neither confirmed nor refuted | Obtain better evidence |
| `FAIL` | Evidence shows the property is absent | A compensating control under §5, or a different provider |

`UNPROVEN` matters because its remedy is completely different from a `FAIL`'s.
Collapsing the two either discards a viable provider or, worse, lets an
unsupported claim through as a pass — which CBD-102's acceptance criteria
prohibit directly.

This adds a verdict to the three in rubric rule R1:

| Verdict | Condition |
| --- | --- |
| `ELIGIBLE` | Every applicable gate `PASS` |
| `ELIGIBLE-PENDING-EVIDENCE` | One or more `UNPROVEN`, none `FAIL`. Cannot be selected until resolved, but is not disqualified |
| `CONDITIONAL` | One or more `FAIL` carrying an approved exception under §5 |
| `INELIGIBLE` | One or more `FAIL` without an approved exception |

## 4. Staleness and re-verification

Provider facts change, and an evaluation that outlives its evidence is an
assertion. Each class carries a default shelf life from its retrieval date:

| Class | Re-verify after | Reason |
| --- | --- | --- |
| Observed | 6 months | Provider behaviour changes without announcement |
| Contractual | Contract term or amendment | Binding until changed |
| Attested | End of the report period, typically 12 months | An attestation covers a stated window and does not extend past it |
| Documented | 6 months | Documentation tracks the product |
| Asserted | 3 months | Weakest and most likely to be superseded |

Two rules apply on top:

* **Re-verify before final selection.** Any evidence supporting a gate result
  must be current on the date the provider is chosen, not merely on the date it
  was gathered. A stale gate result reverts to `UNPROVEN`.
* **A material provider change invalidates related evidence immediately**,
  regardless of shelf life — a pricing change, an acquisition, a subprocessor
  addition, a plan-tier restructure, or a disclosed breach.

## 5. Exception rules

### 5.1 An exception is not a way to amend a contract

The `SA-92-*`, `CA-92-*`, `CL-92-*`, `PA-92-*`, `NT-92-*`, `EM-92-*`,
`OP-92-*`, `AN-92-*`, and `RL-92-*` registers are Product Owner-approved
normative contracts. CBD-92 §1 is explicit: *a downstream ticket or
implementation may not relax one without a new Product Owner decision and a new
stable ID.*

CBD-102 is a downstream ticket. It follows that:

* An exception may accept a **residual risk** against a contract while the
  contract stands unchanged.
* An exception may **never** relax, reinterpret, or carve an "except when"
  into the contract itself. That requires amending CBD-92 through its own
  change mechanism, with a new Product Owner decision and a new stable ID.

The distinction is practical, not procedural. "We accept that this provider's
telemetry carries one field beyond the `AN-92-003` allowlist, and here is the
residual" is an exception. "`AN-92-003` doesn't really mean that" is an
unauthorized amendment.

| ID | Rule |
| --- | --- |
| EX-102-001 | Only the Product Owner may approve an exception. An evaluator cannot accept a residual against a contract they did not approve. |
| EX-102-002 | Every exception records: the failed gate and its cited source; the compensating control and whether it is a vendor capability or CoBudget work; the residual risk per §6; the approver; the approval date; and the expiry. |
| EX-102-003 | An exception never converts a `FAIL` into a `PASS`, never aggregates into a rubric score, and never removes the `CONDITIONAL` verdict from any report of that provider. |
| EX-102-004 | Exceptions expire — 12 months from approval, or at the end of the Private MVP phase, whichever is sooner. An expired exception reverts the gate to `FAIL` and the provider to `INELIGIBLE` until re-approved. |
| EX-102-005 | Every accepted residual is handed to CBD-94 as a risk-register input. CBD-92 §10.2 assigns residual-risk disposition to CBD-94, and an exception granted here does not pre-empt that. |
| EX-102-006 | Exceptions do not stack silently. A provider carrying more than two exceptions, or any exception on a gate citing S4 material, requires a full re-evaluation rather than another individual approval. |
| EX-102-007 | A compensating control that is CoBudget-side work is not effective until built and verified. Until then the exception is provisional and the gate remains `FAIL`. |

### 5.2 Gates that may not be excepted

Where a cited source states its constraint unconditionally and supplies no
amendment path, no compensating control is meaningful and no exception may be
granted. Changing these requires amending the source.

**This list was confirmed by the Product Owner on August 16, 2026.** It bounds
what may be approved under `EX-102-001`, so adding to or removing from it is
itself a Product Owner decision.

| Gate | Why it cannot be excepted |
| --- | --- |
| `HG-102-056` — provider-hosted institution authentication | The architecture security baseline states *do not collect or store online-banking credentials* without qualification, and `DI-91-010` records that raw online-banking credentials are never collected. There is no control that compensates for collecting them. |
| `HG-102-028` — IdP credential boundary | `DI-91-002` places every factor and recovery secret outside CoBudget entirely, prohibiting them from application storage, logs, analytics, exports, and support. |
| `HG-102-014` — S4 material out of ordinary provider surfaces | CBD-91 §2.1 and `DI-91-051` make this a residence rule for the most sensitive tier, not a control strength to be traded. |

`HG-102-004` is deliberately **not** on this list. `AN-92-001` disables product
analytics unconditionally for Private MVP, but `AN-92-007` supplies an explicit
amendment path requiring new Product Owner and privacy approval. A provider that
cannot disable behavioural capture therefore fails a gate that can only be
changed by taking that path — which is a contract amendment, not an exception.

## 6. Residual-risk record

Every exception carries one. A compensating control without a residual statement
is an assertion that the control is complete, which would make it a pass.

| Field | Content |
| --- | --- |
| Affected data classes | The `DI-91-*` classes exposed, with their sensitivity tier |
| Threat re-opened | The `TH-92-*` ID where one applies, or a plain statement where none does |
| Who bears it | CoBudget customers, the operator, or both. Where customers bear it, say whether they can perceive it |
| Detection | How CoBudget would know the residual had been realized. "We would not know" is a valid and important answer |
| Reversal condition | What would have to change — a vendor capability, a plan tier, a provider swap — to remove the residual |
| Interaction | Whether this residual compounds with another accepted exception |

The detection field carries more weight than its size suggests. A residual that
cannot be detected is materially worse than one that can, and CBD-92's threat
model repeatedly treats undetectable compromise as the more severe case.

## 7. Register maintenance

* Evidence records are append-only. A superseded item is marked with its
  successor rather than edited, preserving why an earlier decision looked
  correct at the time.
* Each evaluation reports its **evidence-confidence profile** — the share of
  criteria at each confidence level — as rubric rule R5 requires. The profile is
  computed from registered records, not estimated.
* Open questions are carried forward between CBD-103–107 rather than closed by
  silence. A question that stops being asked is recorded as `Absent` evidence,
  which scores 0 under rubric rule R3.

## 8. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-102-018 | §3.3 adds `ELIGIBLE-PENDING-EVIDENCE` to the three verdicts in rubric rule R1. The rubric is updated to match in the same change. | Both documents must stay synchronized; a future edit to one requires the other. |
| OI-102-019 | The shelf lives in §4 are judgment. No approved source sets an evidence-currency period. | Reasonable defaults; adjust if evaluation runs long enough for staleness to bite. |
| OI-102-020 | **Resolved August 16, 2026.** Product Owner confirmed the three non-exceptable gates in §5.2 as complete and correct: `HG-102-056`, `HG-102-028`, and `HG-102-014`. | Closed. Adding to or removing from the list is now itself a Product Owner decision, and `HG-102-004` remains deliberately outside it because `AN-92-007` supplies an amendment path. |
| OI-102-021 | `EX-102-006` sets the stacking threshold at more than two exceptions. The number is arbitrary. | Adjust if it proves too tight or too loose in CBD-103–107. |
| OI-102-023 | ~~**Material received under an NDA cannot be recorded the way this register records everything else.**~~ **Resolved by Product Owner decision, August 29, 2026 — §3.0.2.** NDA'd material does not enter the register, is not quoted, cited, summarized or named, and supports no finding; a gate it bears on stays `UNPROVEN`. The deciding fact was one the options were not weighed against when they were written: **the repository is public**, not merely un-access-controlled, so both alternatives would have published NDA-derived material to the world through git. | Closed. The cost is accepted knowingly: this register is silent about material CoBudget has read, which is preferred to a register that is either inaccurate about what a second reader can check, or accurate and in breach. **The consequence lands on category F**, whose gate set cannot be closed by NDA-bound material and whose rubric ceiling of `2` therefore stands — see `OI-102-024` for the phase this decision does *not* cover. |
| OI-102-024 | **§3.0.2 is scoped to evaluation, and CoBudget will not stay in the evaluation phase.** Once a provider is selected, CoBudget executes agreements that are ordinarily confidential, and `HG-102-013` together with the Contractual evidence class in §3 expects gate outcomes to rest on exactly those instruments. Under §3.0.2 as written, a confidential executed DPA is not registrable, so the gate it was built to answer could not pass at the moment CoBudget finally holds the document. | **Not a defect in the decision and not for CBD-108 to solve** — the evaluation phase is genuinely different, because nothing is signed and no instrument is held. Raised so the transition is a decision rather than a surprise: a register serving a customer holding executed contracts needs a disposition this one deliberately does not have, and the natural moment to take it is when the first agreement is executed, not before. |
