# CBD-75 — Role Terminology and Customer-Facing Copy Standard

| Field | Value |
| --- | --- |
| Status | **Draft v0.3 — Product Owner review and approval required. Per-surface strings remain gated by `OI-75-001`** |
| Document version | 0.3 |
| Owner | Alexander Wohlford |
| Jira | [CBD-75](https://cobudget.atlassian.net/browse/CBD-75) |
| Parent | [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) |
| Governing permission model | CBD-72 v0.1.54 — §2.1, §2.2, §5.1, §5.3, §5.8 |
| Governing lifecycle | CBD-73 v1.0.2 — §2 cross-cutting semantic rules; the `MSG-73-*` inventory |
| Governing alert boundary | CBD-74 v1.0.1 — `CP-74-01`–`CP-74-08`, `AB-74-015`, `PB-74-06`, `PB-74-09`, `PB-74-12`, §6.2, §6.4 |
| Semantic standard | `RI-93-016` and `RI-93-017`, approved August 16, 2026; enforcement gate `FU-95-021` |
| Brand source | `docs/brand-foundation.md`; brand decided September 2, 2026 |
| Machine-readable registers | `docs/cbd-75-prohibited-language-register.json`, `docs/cbd-75-approved-copy.json` |
| Enforcement | `npm run check:copy`, `npm run check:pages`, `python3 scripts/audit-cbd-75.py` |
| Traceability | `docs/cbd-75-acceptance-criteria-traceability.md` |
| Last updated | September 3, 2026 |

> **Authority.** CBD-72 controls the permission model, CBD-73 the lifecycle semantics, CBD-74 the alert boundary, and `docs/brand-foundation.md` the brand. This document controls only how those decisions are named and worded. Where it appears to change one of them, the governing source wins and this document is wrong.

## 1. Purpose and contract

This is the single vocabulary for collaboration roles and the single standard for customer-facing copy. Everything that names a role — requirements, schemas, API contracts, tests, analytics, support macros, and the words a customer reads — resolves here.

It approves two things outright: the role names, their written forms, their internal identifiers, and their short and long customer descriptions; and the copy standard that every surface must satisfy. It does not approve per-surface strings. Those stay with the packages that own the surfaces, gated under `OI-75-001`.

Two of its registers are machine-readable and enforced on every build. That is deliberate. A copy standard that lives only in prose is advice, and the first deadline turns advice into a suggestion.

## 2. Scope and authority

In scope: the role vocabulary; product naming in customer copy; the cross-cutting copy requirements; the reusable message patterns; the prohibited-language register; the consistency checklist; and the validation plan.

Out of scope: the permission model itself, the lifecycle state machine, alert triggers and thresholds, and per-surface exact strings. This document may not narrow, widen, or reinterpret a permission. Where a plain-language description and the permission model disagree, the description is defective — §6 and §7 exist to catch that, and one such defect was caught during this draft, recorded at `RD-75-04`.

No new role term or enum is created. `RC-95-023` approves none, and the closed set of five is inherited from CBD-72 §2.2.

## 3. The role vocabulary

### 3.1 Canonical role register

Roles belong to a membership in one budget space, never to a person globally, and a person holds exactly one role per space (CBD-72 §2.1). Copy must never imply otherwise.

| ID | Role | Plural | Internal enum | Short description |
| --- | --- | --- | --- | --- |
| `RD-75-01` | Primary Owner | Primary Owners | `primary_owner` | Looks after this budget space. Only the Primary Owner can hand it over, archive it, or delete it. |
| `RD-75-02` | Co-owner | Co-owners | `co_owner` | Shares the day-to-day running of this budget space with the Primary Owner. Cannot remove the Primary Owner or delete the space. |
| `RD-75-03` | Collaborator | Collaborators | `collaborator` | Plans and records the shared budget as an equal contributor. Cannot manage members, permissions, or anyone else's bank connections. |
| `RD-75-04` | Viewer | Viewers | `viewer` | Reads one shared view of this budget space and cannot change anything in it. |
| `RD-75-05` | Accountability Partner | Accountability Partners | `accountability_partner` | Gives voluntary support with a read-only view of the whole shared budget. Cannot move money, change anything, or block a payment. |

The long descriptions follow. Each is approved copy, held to §6 on every build.

**`RD-75-01` Primary Owner.** The Primary Owner looks after this budget space. Every budget space has exactly one. Only the Primary Owner can hand the space to someone else, archive it, or delete it, and each of those steps asks for a fresh sign-in first. Like everyone else, the Primary Owner manages only the bank connections they set up themselves. A Primary Owner who wants to step away hands the space over or archives it, so no one is ever stuck.

**`RD-75-02` Co-owner.** A Co-owner shares the day-to-day running of the budget space: budgets, categories, bills, goals, members, and shared settings. A Co-owner cannot remove the Primary Owner, take the space over, or delete it, and manages only the bank connections they set up themselves. A budget space can have more than one Co-owner.

**`RD-75-03` Collaborator.** A Collaborator takes part in the shared budget as an equal contributor. They can plan budgets and targets, add and edit categories, bills, and goals, record manual transactions, categorize imported ones, and leave comments. They cannot manage members or permissions, cannot change anyone else's bank connection, and cannot archive or delete the budget space.

**`RD-75-04` Viewer.** A Viewer reads one shared view of the budget space, chosen for them by the Primary Owner or a Co-owner: the whole budget, planning only, selected category groups, or selected account groups. A Viewer sees what that view includes and nothing outside it, and cannot edit, comment, or export anything themselves. Only the Primary Owner or a Co-owner can make a copy of that view to hand to the Viewer, and the copy stops working within a day. A new Viewer starts without a view and so sees nothing until one is chosen.

**`RD-75-05` Accountability Partner.** An Accountability Partner gives voluntary support. They see the whole shared budget — balances, transactions, categories, bills, goals, and reports — and cannot change any of it. They never see bank credentials, connection settings, or anyone else's notification settings. They can acknowledge their own firm alerts and leave comments, and none of that moves money, alters a budget, or changes who sees what. An Accountability Partner can end the arrangement themselves at any time, without anyone else agreeing, and the Primary Owner or a Co-owner can end it too. When someone should see less than the whole budget, invite them as a Viewer instead.

One further approved string belongs with the roles, because it is what a narrowed role's screens say about themselves.

| ID | Approved label | Where it appears | Source |
| --- | --- | --- | --- |
| `RD-75-06` | Shared view—not the full budget | Every derived view, report, and total whose visibility profile is anything other than Full budget | CBD-72 §5.1 item 10, inherited verbatim rather than decided here |

### 3.2 Written forms and internal identifiers

1. Role names are capitalized in customer copy as proper role names, in the exact forms in §3.1. Co-owner takes a hyphen and a lowercase second element; Co-Owner and co owner are wrong.
2. Accountability Partner is never shortened. Partner alone means a person's partner in the everyday sense, which is a likely reading in a product built for couples.
3. Plurals are the forms in §3.1. There is no possessive form of a role name in customer copy; write the Primary Owner's settings, not Primary Owners settings.
4. Internal identifiers are the snake_case enum values in §3.1, used in schemas, API contracts, tests, and analytics. `scripts/check-copy-language.mjs` derives the enum from the name and fails if the two disagree, so a rename cannot silently leave the enum behind.
5. Display names never appear in an API payload, an analytics property, or a database column. Those carry the enum, and the surface resolves the name. This is what makes localization possible later under `OI-75-005`.

### 3.3 Terms that are not roles

The following are prohibited as role names. `PL-75-02` and `PL-75-10` enforce the list.

| Term | Why it is not used | Use instead |
| --- | --- | --- |
| Guardian | Implies legal guardianship, which the MVP excludes. Retired from the product vocabulary; `SR-94-145` requires removing it from the remaining planning prose, tracked at `OI-75-004`. | Accountability Partner |
| Owner, bare | Ambiguous between Primary Owner and Co-owner, which differ on exactly the protected actions a reader needs to know about. | Primary Owner, or Co-owner |
| Partner, bare | Collides with the everyday sense of the word. | Accountability Partner |
| Admin, Administrator | Not a role in this product. Administration is a set of permissions two roles hold, not an identity. | Primary Owner, or Co-owner |
| Supervisor, Monitor, Observer, Watcher | Describe observation as the relationship. The product's support role is consensual and bounded. | Accountability Partner |
| Read-only user, Guest, Subscriber | Not roles. Read-only is a property of two different roles with very different scope. | Viewer, or Accountability Partner |
| Member | Correct as a general word for anyone with a membership, and never a role. Copy that needs a role must name one. | The specific role |

## 4. Product naming

The brand was decided on September 2, 2026 and is recorded in `docs/brand-foundation.md`, which stays the source. This section states the rule that governs its use; it does not restate the approved strings, because a second copy is a second thing to drift.

| ID | Rule |
| --- | --- |
| `RT-75-01` | MoneyPact is the customer-facing name. CoBudget is the internal codename and appears in nothing a customer can read. |
| `RT-75-02` | Customer-readable surfaces are page titles, the web app manifest, store listings, public pages, email subject lines and bodies, push and SMS bodies, in-product copy, receipts, and support replies. All use MoneyPact. |
| `RT-75-03` | Internal surfaces keep CoBudget: the repository, the `@cobudget/*` package scope, the Jira project key, database and schema identifiers, service names, code comments, and this documentation set. Renaming them is not in scope and buys nothing. |
| `RT-75-04` | The approved fixed strings — brand, primary domain, app-store title, descriptor, and leading tagline — live in `docs/brand-foundation.md`. Checks read them from there rather than from a copy, so the source cannot drift away from what ships. |
| `RT-75-05` | Naming the product is not customer-specific content. Where the external content ceiling permits an invitation, lifecycle, authentication, or material security email to identify itself, it identifies itself as MoneyPact. That does not breach `PB-74-09` or CBD-12-AC21, because the product's own name says nothing about the recipient, the budget space, or the event. |
| `RT-75-06` | The written form is MoneyPact: one word, two capitals. Money Pact, Moneypact, moneypact, and MONEYPACT are wrong, except where a style sheet uppercases a heading. The possessive is MoneyPact's. |

`PL-75-11` enforces `RT-75-01` and `RT-75-06` mechanically. `RT-75-02` through `RT-75-05` are review items on the §7 checklist, because no check can tell which surface a string is destined for.

## 5. The copy standard

### 5.1 Cross-cutting requirements

These apply to every customer-facing surface. CBD-73 §2 states the same standard for the lifecycle messages it owns and CBD-74 §11 for alerts; this is the general form both inherit, so a new surface starts from the standard rather than from whichever package it most resembles.

| ID | Requirement | Source |
| --- | --- | --- |
| `CS-75-01` | Recorded consent or a completed reauthentication is never described as proof that a person agreed freely. It proves an action happened, not that it was wanted. | `RI-93-016` |
| `CS-75-02` | Control of a channel is never described as sole control. Devices are shared, forwarded, and mirrored. | `RI-93-016`, `AB-74-015` |
| `CS-75-03` | A delivered copy is never described as recallable, erasable, or hidden from a lock screen. | `AB-74-015`, `PB-74-12` |
| `CS-75-04` | No copy characterizes another person's circumstances, reasons, motives, or state. | `RI-93-016`, `RI-93-014` |
| `CS-75-05` | No copy implies authority, accountability, safety, confidentiality, validation, or compliance that the product does not provide or the evidence does not support. | `RI-93-016`, CBD-12-AC25 |
| `CS-75-06` | An irreversible consequence is disclosed before the action, never only in the confirmation that follows it. | `RI-93-016` |
| `CS-75-07` | A role, permission, or alert is never introduced by what it grants without what it withholds. The limit travels with the capability, in the same surface. | CBD-12-AC24, `CP-74-01` |
| `CS-75-08` | Every surface that grants or widens access names the way to reduce or end it, stated without penalty framing. | `CP-74-06`, CBD-12-AC22 |
| `CS-75-09` | No message, status, count, timing difference, or error reveals another person's existence, decision, or private state. | CBD-73 §2 rule 4 |
| `CS-75-10` | Data freshness is described accurately. Nothing is real-time, live, or instant. | `docs/brand-foundation.md` |
| `CS-75-11` | Plain language: everyday words, short sentences, no legal register, and no term of art without a plain gloss on first use. Surfaces meet the `SD-071-048` accessibility requirements. | CBD-12-AC24, `CP-74-08` |
| `CS-75-12` | Role and lifecycle terms use §3 exactly. Product naming uses §4 exactly. | CBD-73 §2 rule 11, CBD-12-AC23 |

### 5.2 Reusable message patterns

Each pattern fixes the parts of a message and their order. A surface picks a pattern and fills it; it does not invent a shape. Exact strings remain gated under `OI-75-001`.

| ID | Pattern | Required parts, in order | Never |
| --- | --- | --- | --- |
| `PT-75-01` | Disclosure before consent | What is shared; what the other person can do with it; what they cannot do; that taking part is voluntary; how to decline now; how to end it later | Pre-consent financial data; another member's identity beyond the safe display identity; urgency or a countdown |
| `PT-75-02` | Confirmation before an irreversible action | The exact target, named; what happens, in the present tense; what does not change; an explicit confirmation that names the target | Bundling a second action; describing the consequence only afterwards; a generic yes |
| `PT-75-03` | Outcome notice | The authoritative result after reconciliation; when it took effect; what changed; what did not | Partial success; provider detail; a second outcome for a retry or a duplicate request |
| `PT-75-04` | Neutral terminal outcome | One wording covering every outcome that must not be distinguished: declined, withdrawn, expired, suppressed. The state, and the next step if any | Which outcome occurred; who decided; any reason, characterization, or judgement |
| `PT-75-05` | Denial | What is not possible; the product boundary that makes it so; one authorized route, if one applies | A hidden-state reason; an escalation that would override the boundary; identifying or offering contact with another member; a promise of recovery |
| `PT-75-06` | Alert | The condition; the affected resource within the reader's own scope; whether it is provisional or settled | Naming or implying who caused it; blame; evaluation; anything derived that would attribute responsibility |
| `PT-75-07` | Channel and custody disclosure | The custody limits, at the point of choosing a channel or category; that a channel enabled for one category makes every message on it mean that category | Claiming previews are hidden, that a channel is private, or that a delivered message can be recalled |
| `PT-75-08` | Scope label | `RD-75-06` on any derived view outside Full budget; unavailable stated as unavailable | Rendering a partial report as complete; showing an unreadable value as zero |
| `PT-75-09` | Error and recovery | What happened, in the reader's terms; whether anything changed; the next safe step | Internal cause; provider payload or status; blame; a retry that would produce a second outcome |

`PT-75-05` carries the approved `RI-93-017` shape: support cannot transfer membership, role, ownership, or connection authority, escalation does not override that, and the honest limitation is stated rather than left as silence. Its exact copy, restricted intake, and staff procedure remain gated under `OI-75-006`.

## 6. Prohibited and misleading language

### 6.1 How the register works

`docs/cbd-75-prohibited-language-register.json` is the machine-readable half of this section. The document is the authority; `scripts/audit-cbd-75.py` fails if the two disagree in either direction.

Three properties of the register matter more than the word lists:

**Scope.** A rule applies to every surface, to product copy, or to public marketing pages. `PL-75-14` keeps role names off marketing pages and would be absurd applied to the in-product copy whose job is to explain those roles.

**Denial.** CBD-12-AC09 requires the product to say plainly that it cannot move money and cannot block a transaction. A word list forbids that honest sentence along with the false one. So a rule marked as permitting denial is satisfied when a negator precedes the match in the same sentence. Rules that do not permit denial are prohibited even when denied, because naming shame or surveillance supplies the frame that the denial then fails to remove.

**Self-proof.** Every rule carries an example it must catch, and every rule permitting denial carries a denial it must let through. Both are asserted on each run. A regex that matches nothing is how a guard dies quietly: the build stays green and the rule stops existing.

What is scanned is declared copy only — the strings in `docs/cbd-75-approved-copy.json`, the approved brand strings, and the built public pages. Documentation prose is never scanned, because a document must be free to name a prohibited phrase in order to prohibit it.

### 6.2 The rules

| ID | Prohibits | Denial permitted | Use instead |
| --- | --- | --- | --- |
| `PL-75-01` | Spending authority: approving, permitting, or authorizing another person's spending; allowances | Yes | The actual capability, with its limit |
| `PL-75-02` | Custodial and legal authority: guardian, custodian, trustee, dependant, supervisor | No | Accountability Partner, and `RD-75-05` |
| `PL-75-03` | Surveillance of another person: monitor, surveillance, spy, police, oversight, keeping tabs, tracking a person | No | What a person can see, in their own scope, and why they were invited |
| `PL-75-04` | Shame, fear, blame, and judgement: shame, guilt, fear, afraid, anxious, blame, irresponsible, reckless, overspender, bad habits | No | The financial fact and the affected resource |
| `PL-75-05` | Punishment and enforcement: punish, penalty, disciplinary, enforce, sanction | No | The state of the budget, never a consequence for a person |
| `PL-75-06` | Money movement and transaction control: blocking a payment, freezing an account, moving money, controlling an account, locking someone out | Yes | What the product does with the record, not with the money |
| `PL-75-07` | Irrevocable access: permanent access, always able to see, unlimited, forever | No | How the arrangement ends and who can end it |
| `PL-75-08` | Confidentiality and recall the product cannot deliver: recall, unsend, remote erasure, private notification, only you can see | Yes | The custody disclosure in `PT-75-07` |
| `PL-75-09` | False immediacy: real-time, instant, live balances, up to the minute | Yes | When the data was last updated |
| `PL-75-10` | Retired and ambiguous role terms: bare owner, bare partner, admin, observer, read-only user, sub-account | No | The exact names in §3.1 |
| `PL-75-11` | Internal codename and misspelled brand: CoBudget, Money Pact, Moneypact | No | MoneyPact, spelled and cased exactly |
| `PL-75-12` | Obligation and coercion framing: you owe them, accountable to, required to share, has a right to see, justify your spending | No | What the person chose to share, and how they can stop |
| `PL-75-13` | Unsupported safety, security, and compliance claims: bank-level, military-grade, certified, guaranteed, proven, validated | Yes | What the product does. Claim conformance only when `VP-75-06` evidence exists |
| `PL-75-14` | Role names on public marketing pages | No | Ordinary words. Name roles inside the product, where the boundary can be shown beside them |

`PL-75-14` deserves its reason stated once. A public page introduces the product, not the role model. A role named there arrives without the boundary that makes it safe, which is exactly the authority `PL-75-02` and `PL-75-03` prohibit implying, and the boundary does not fit on a marketing page. The ban predates this document, where it was justified on the ground that CBD-12 had not settled the role. That ground expired when `FU-95-003` closed on August 16, 2026. The ban is kept on the new reason, not the old one.

### 6.3 Recorded exceptions

Approved brand copy is held to this standard. One exception is recorded, and the check fails if it stops matching, so the ledger cannot outlive the copy it excuses.

| Where | Rule | Phrase | Kind | Settled by |
| --- | --- | --- | --- | --- |
| The mission statement | `PL-75-10` | partners | Rule limit | Not a defect |

In the mission statement, partners means life partners, disambiguated by the company it keeps. `PL-75-10` cannot tell that from the role term, and narrowing the pattern enough to try would let the genuinely ambiguous cases through. It is recorded as a known limit of the rule, not a defect in the copy.

**Three copy defects were found, and are now corrected.** The v0.1 draft recorded them as enforced exceptions rather than fixing them, because rewriting approved brand copy is a Product Owner decision and not an editorial one. That decision was taken on September 3, 2026, and `docs/brand-foundation.md` changed in the same commit as this section.

| Where | Was | Now | Rule |
| --- | --- | --- | --- |
| Mission statement | collaborative tools and real-time insights | collaborative tools and clear insights | `PL-75-09` |
| Value 6, Stability | consistent habits, shared oversight, and meaningful insights | consistent habits, shared understanding, and meaningful insights | `PL-75-03` |
| Manifesto paragraph 4 | shared visibility, real-time insights, and gentle accountability | shared visibility, practical insights, and gentle accountability | `PL-75-09` |

The two real-time promises were one defect stated twice. The brand foundation forbids promising instantaneous bank updates three sections below the mission that promised them, and the aggregation provider's schedule could not have delivered them in any case. Shared oversight was the framing CBD-12-AC24 and `SG-93-093` prohibit, sitting in the one value most likely to be quoted back as a description of what the product does. All three were live on the public pages until this change.

## 7. Consistency checklist

`CBD-75-AC04` requires one vocabulary across every artifact. Some of that is machine-checkable and some is not; the column says which, because a checklist that hides the difference is worse than one that admits it.

| ID | Artifact and check | How it is checked |
| --- | --- | --- |
| `CK-75-01` | Requirements in Jira and in `docs/` name roles in the §3.1 forms | Review |
| `CK-75-02` | Schemas carry the §3.1 enum values and admit no sixth role | Review until a schema exists; then a migration test |
| `CK-75-03` | API contracts in `@cobudget/contracts` expose enum values, never display names | Review until the contract exists; then a type test |
| `CK-75-04` | Tests name roles by enum or canonical display name | Review |
| `CK-75-05` | Analytics events carry the enum, never free text and never a copy string | Review |
| `CK-75-06` | No retired term from §3.3 survives outside a register that names it as retired | Review; the live exception is `OI-75-004` |
| `CK-75-07` | Every string in `docs/cbd-75-approved-copy.json` clears the register | `npm run check:copy` |
| `CK-75-08` | Public pages clear the register at public-page scope and render only approved brand strings | `npm run check:pages` |
| `CK-75-09` | The document and its two JSON registers agree in both directions | `python3 scripts/audit-cbd-75.py` |
| `CK-75-10` | Support replies use §3 vocabulary and the `PT-75-05` shape | Review; gated by `OI-75-006` |

## 8. Validation plan and evidence

`CBD-75-AC09` requires observations to be labeled by evidence type and forbids recording an unsupported claim as validated. The rules below are the labeling discipline; the table after them is what this package actually holds today.

| ID | Rule |
| --- | --- |
| `VP-75-01` | Every recorded observation carries its evidence type, sample, date, and who produced it. An unlabeled observation is not evidence. |
| `VP-75-02` | Internal review is never recorded as user validation. Reading copy carefully is not the same as watching someone misread it. |
| `VP-75-03` | Meeting `SD-071-048` is a requirement, not evidence of conformance. Conformance needs assistive-technology testing. |
| `VP-75-04` | Comprehension of consent and disclosure copy requires a study with people outside the team. |
| `VP-75-05` | Safety and coercion language requires specialist review, owned by CBD-14 and gated by `FU-95-027`. |
| `VP-75-06` | No legal, security, privacy, accessibility, or market claim is recorded as validated without the corresponding specialist record. `PL-75-13` blocks the claim in copy; this blocks it in the record. |
| `VP-75-07` | The evidence log uses the fixed columns below, so a gap is visible as an empty cell rather than an absent row. |

Evidence log. This is the template and the current state; every row is honest about holding nothing yet.

| Claim | Evidence type | Sample | Date | Produced by | Status |
| --- | --- | --- | --- | --- | --- |
| The role vocabulary is unambiguous to customers | Comprehension study | — | — | — | **None held** — `OI-75-002` |
| Role and consent copy is accessible | Assistive-technology test | — | — | — | **None held** — `OI-75-002` |
| Copy does not enable coercion | Specialist safety review | — | — | — | **None held** — CBD-14, `FU-95-027` |
| Copy makes no unsupported legal or privacy claim | Specialist legal review | — | — | — | **None held** — `FU-95-027` |
| The vocabulary matches the approved permission model | Internal review against CBD-72 | Five roles, all §3.1 strings | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Held. Not user validation (`VP-75-02`) |
| Approved copy clears the prohibited-language register | Mechanical check | 11 strings, 25 brand strings, 14 rules | September 2, 2026 | `npm run check:copy` | Held. Proves conformance to this standard, nothing about comprehension |

## 9. Open-issue register

| ID | Issue | Status and effect |
| --- | --- | --- |
| `OI-75-001` | Per-surface exact strings are not approved here. This document approves role names, forms, enums, short and long role descriptions, and the standard. | CBD-73 `MSG-73-*` and CBD-74 `CP-74-*` strings stay gated under `FU-95-017` and `OI-73-004`. Nothing ships as final copy. |
| `OI-75-002` | No accessibility or comprehension evidence exists for any copy in this package. | `SD-071-048` is asserted as a requirement, never as conformance. `VP-75-03` and `VP-75-04` bind. |
| `OI-75-003` | Approved brand copy breached this standard in three places: real-time in the mission statement and the manifesto, and shared oversight in the Stability value. All three were live on the public pages. | **Closed September 3, 2026 by Product Owner decision.** The three strings were corrected in `docs/brand-foundation.md`, the exceptions were removed from the register, and §6.3 records what changed. The public pages render the corrected copy, since they read the brand document at build time. |
| `OI-75-004` | Legacy guardian vocabulary survived in `docs/product-plan.md` and `docs/architecture.md`, which `SR-94-145` required removing. The product plan also framed the Accountability Partner naming decision as still open and described the role's access as scoped and revocable by the subject, which CBD-94 records as materially misleading. | **Prose corrected September 3, 2026.** Both files now use the approved vocabulary, the naming decision is stated as settled, and the Accountability Partner boundary reads comprehensive, fixed-field, financially read-only. `CK-75-06` passes on review. **Still open:** four records still describe the corrected condition in the present tense — CBD-91 `CR-91-003` and `CR-91-004`, and the two `docs/architecture.md` and `docs/product-plan.md` rows in CBD-94 §8. Amending either document invalidates its pinned blob hash in `scripts/audit-cbd-73.py`, `scripts/audit-cbd-95.py`, `docs/cbd-73-acceptance-criteria-traceability.md`, and `docs/cbd-95-threat-model-package-manifest.md`, so that correction is its own decision with its own re-pin. |
| `OI-75-005` | The vocabulary and the register are English-only. A locale may have no equivalent for Accountability Partner, and the register's patterns do not transfer. | No localized copy is approved. §3.2 item 5 keeps display names out of payloads so this stays possible. |
| `OI-75-006` | The `RI-93-017` support response has its semantic shape at `PT-75-05`, but exact copy, restricted intake, staff procedure, and training are absent. | Gated by `FU-95-021` and `FU-95-025`. No support macro is approved. `CK-75-10` cannot pass. |
| `OI-75-007` | `SG-93-014` least-privilege recommendation behavior stays unimplemented until CBD-12 or CBD-75 records an explicit Product Owner decision (`SR-94-142`). | No copy may imply a role can be narrowed or can contribute outside its approved boundary. §3.1 descriptions state fixed boundaries only. |
| `OI-75-008` | The register covers declared copy sources. No in-product copy module exists yet, so coverage is the approved strings, the brand strings, and two public pages. | Coverage grows as copy lands. Every new copy source must be declared, or the standard silently stops applying to it. |

## 10. Revision history

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.3 | September 3, 2026 | Claude with Alexander Wohlford as Product Owner | Legacy vocabulary correction. `docs/product-plan.md` and `docs/architecture.md` now use the approved role names, state the naming decision as settled, and describe the Accountability Partner boundary as comprehensive, fixed-field, and financially read-only, satisfying `SR-94-145`. `OI-75-004` records the prose as corrected and stays open for the four records that still describe the old condition in the present tense. No rule, role, pattern, or checklist item changed. | Draft; Product Owner review required |
| 0.2 | September 3, 2026 | Claude with Alexander Wohlford as Product Owner | Brand copy correction. The Product Owner decided the three defects the v0.1 draft had recorded as exceptions rather than fixed. `docs/brand-foundation.md` changed in the same commit: the mission statement and the manifesto no longer promise real-time insights, and the Stability value no longer describes the product as shared oversight. `OI-75-003` is closed, the register's exception list keeps only the `PL-75-10` rule limit, and §6.3 records what changed so the finding is not lost with the defect. No rule, role, pattern, or checklist item changed. | Draft; Product Owner review required |
| 0.1 | September 2, 2026 | Claude with Alexander Wohlford as Product Owner | Initial complete draft. Role vocabulary `RD-75-01`–`RD-75-06`, product naming `RT-75-01`–`RT-75-06`, copy standard `CS-75-01`–`CS-75-12`, message patterns `PT-75-01`–`PT-75-09`, prohibited language `PL-75-01`–`PL-75-14`, consistency checklist `CK-75-01`–`CK-75-10`, validation plan `VP-75-01`–`VP-75-07`, and eight open issues. Two machine-readable registers and two build checks, each proven to fail on a deliberate violation. Recorded four exceptions where approved brand copy breaches the standard, three of them genuine defects awaiting a Product Owner decision. | Draft; Product Owner review required |
