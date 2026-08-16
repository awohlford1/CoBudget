# CBD-102 — Evidence Register and Exception Rules

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Governs how a provider claim becomes evidence, and when a failed hard gate may be accepted with a compensating control. |
| Document version | 0.1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Pending Product Owner review |
| Jira | [CBD-102](https://cobudget.atlassian.net/browse/CBD-102) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | [Hard-Gate Catalog](cbd-102-provider-requirements-hard-gate-catalog.md) v0.1.0; [Evaluation Rubric](cbd-102-provider-evaluation-rubric.md) v0.1.0; [Demand Model](cbd-102-demand-model.md) v0.1.0; [Cost Template](cbd-102-cost-template.md) v0.1.0 |
| Repository baseline | `52d764a` |
| Last updated | August 16, 2026 |

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
| Provider and category | Name, and one of H / I / D / E / F | Yes |
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
