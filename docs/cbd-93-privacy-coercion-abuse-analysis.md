# CBD-93 — Privacy, Coercion, Surveillance, and Abuse-Case Analysis

| Field | Value |
| --- | --- |
| Status | **Draft — review required** |
| Document version | 0.1.2 |
| Owner | Alexander Wohlford |
| Reviewer | Not yet reviewed. This document has received no independent safety, privacy, legal, accessibility, or survivor-research review. |
| Jira | [CBD-93](https://cobudget.atlassian.net/browse/CBD-93) |
| Confluence page | Not yet published. Publication follows the repository-first workflow after merge to `main`. |
| Parent | [CBD-14](https://cobudget.atlassian.net/browse/CBD-14) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Repository baseline | `14d6b64` |
| Last updated | August 15, 2026 |

## 1. Purpose and authority

This document is the human-centered privacy, coercion, surveillance, and abuse
analysis required by CBD-93. It models what identified people can do to each
other through CoBudget's approved permission model, and what CoBudget discloses
about a person to the people around them. It is the counterpart to CBD-92, which
models technical threats at trust boundaries; the two are complementary and
neither substitutes for the other. A control that is technically correct can
still be an instrument of coercion, and this analysis exists to find those cases.

The authoritative inputs are the Product Owner-approved **CBD-91 Private MVP
Data Inventory v1.0.1** (`docs/cbd-91-private-mvp-data-inventory.md`) and the
Product Owner-approved decisions in **CBD-12/CBD-72**
(`docs/cbd-72-collaboration-permission-model.md`), whose six open decisions are
closed. This analysis may identify a required safeguard, an evidence gap, or an
accepted residual. It does not silently change an approved outcome. Where an
approved decision creates an abuse surface that cannot be designed away without
reopening that decision, this document records the residual and states plainly
who bears the harm, rather than asserting a mitigation that does not exist.

CBD-91 §9 records that this work may begin and must consume unresolved decisions
as gaps without inventing answers. Two CBD-91 items are referred here by name and
are dispositioned in this document:

| Referred item | Source | Disposition here |
| --- | --- | --- |
| Accepted residual on `DI-91-076` — a §6.3 archival request tells every active member that the Primary Owner was inactive for at least the threshold period | CBD-91 §7.3 clause 8 | Modelled in `AB-93-055` through `AB-93-058`; safeguards `SG-93-041` through `SG-93-046`; residual restated and bounded in §9.2 |
| `EG-91-014` — privacy handling for sensitive labels, goal/bill purposes, and coercive or safety-relevant plans | CBD-91 §6 | Requirement produced in §7.2; safeguards `SG-93-018` through `SG-93-024`; residual scope recorded as `EG-93-004` |

### 1.1 What this document is not

It is not a legal conclusion, a clinical or domestic-violence advocacy
assessment, a completed accessibility review, or validated user research. No
person with lived experience of financial abuse has reviewed it. Every statement
about what a survivor would want, need, or do is an unvalidated product
assumption and is labelled as one. §8 lists these as evidence gaps with a named
review gate rather than treating them as findings.

It also does not rate or prioritize risk. Likelihood, severity ranking, and
mitigation sequencing belong to CBD-94, which consumes this catalog together
with the CBD-92 technical threat register.

## 2. Method and conventions

### 2.1 Actor postures

Every scenario names a posture. The same role produces different cases under
different postures, and a permission model that is correct for the mistaken
actor may be an ideal instrument for the malicious one.

| Posture | Meaning |
| --- | --- |
| **Malicious** | Acts deliberately against another person's interest, using only authority the product grants. |
| **Coercive** | Obtains the other person's genuine, recorded, technically valid consent through pressure, threat, or dependency. Every authorization check passes. |
| **Compromised** | Legitimate member whose account, device, session, or notification channel is under another person's control. |
| **Mistaken** | Acts in good faith and causes disclosure or loss of agency through misunderstanding scope. |
| **Over-privileged** | Holds more authority than the relationship needs, usually because the product offered no narrower option. |

### 2.2 Harm classes

| ID | Harm class | Meaning |
| --- | --- | --- |
| HC-93-01 | Financial surveillance | Continuous or retrospective observation of a person's spending, income, obligations, or balances beyond what they intended to share. |
| HC-93-02 | Loss of agency | The person can no longer control their own data, participation, visibility, or exit. |
| HC-93-03 | Physical-safety exposure | Disclosure that reveals location, movement, escape planning, or the fact that a person is preparing to leave. |
| HC-93-04 | Psychological harm | Shame, fear, forced accountability rituals, or the sustained sense of being watched. |
| HC-93-05 | Economic harm | Loss of access to financial records, planning capability, or the ability to act on one's own money. |
| HC-93-06 | Relationship disclosure | Disclosure of who a person is connected to, or that a connection changed. |
| HC-93-07 | Loss of evidentiary records | Loss of records the person needs for a legal, benefits, immigration, custody, or administrative process. |
| HC-93-08 | Sensitive-attribute inference | Inference of health, disability, pregnancy, addiction, debt distress, immigration status, sexuality, or religion from financial data. |
| HC-93-09 | Re-contact and continued harassment | Product surfaces used to reach a person who has ended the relationship. |
| HC-93-10 | Third-party harm | Harm to a person who is not a CoBudget user, disclosed through another person's financial records. |

### 2.3 Affected-user classes

`Subject` (the person the data describes), `author`, `authorizer`, `other
members`, `invited non-member`, `former member`, `non-user third party`, and
`operations actor`. A scenario may harm someone who never agreed to anything and
has no account; those cases are marked `non-user third party` and are the least
protected by any consent mechanism.

### 2.4 Safeguard classes

The CBD-93 acceptance criteria require product safeguards, technical controls,
operational controls, copy requirements, and matters requiring specialist review
to be distinguished. `SG-93-xxx` IDs run in one sequence with an explicit class:

| Class | Meaning |
| --- | --- |
| **Product** | A behavior, permission, or lifecycle rule the product must implement. Usually an input to CBD-12/CBD-72. |
| **Technical** | An enforcement or engineering control. Usually an input to CBD-92/CBD-94. |
| **Operational** | A staff, support, process, or vendor control. |
| **Copy** | A required customer-facing wording or disclosure obligation. Input to CBD-75. |
| **Specialist review** | A question this project cannot answer without named external expertise. |

### 2.5 Scenario notation

Each scenario records the acting posture and role, the target, the mechanism in
approved product terms, the harm classes, the affected users, the governing rule
or data class, and the resulting safeguards. Status values are:

* **Modelled** — the case is described and safeguards are assigned.
* **Accepted residual** — the case follows from an approved decision and cannot
  be removed without reopening it; the residual is stated and bounded.
* **Referred** — the case belongs to another ticket's scope and is handed over
  with its evidence.
* **Closed by decision** — the Product Owner ruled on the underlying approved
  permission while this analysis was in progress, and the ruling removes the
  exposure rather than mitigating it. The row is retained with its original
  exposure and the decision that closed it.

No scenario is marked *resolved* here. Risk resolution is CBD-94's output, and
“closed by decision” is a narrower claim: the permission changed, so the case no
longer arises.

## 3. Role and lifecycle coverage map

The first CBD-93 acceptance criterion requires every CBD-12 role and lifecycle
state to appear in both normal and adversarial scenarios. This section is the
coverage proof; §4 through §6 contain the scenarios.

### 3.1 Role coverage

| Role | Normal case | Adversarial cases |
| --- | --- | --- |
| Primary Owner | `AB-93-011`, `AB-93-075` | `AB-93-002`, `AB-93-005`, `AB-93-039`, `AB-93-041`, `AB-93-042`, `AB-93-043`, `AB-93-044`, `AB-93-067`, `AB-93-068` |
| Co-owner | `AB-93-012`, `AB-93-076` | `AB-93-008`, `AB-93-006`, `AB-93-040`, `AB-93-055`, `AB-93-063` |
| Collaborator | `AB-93-013`, `AB-93-077` | `AB-93-005`, `AB-93-034`, `AB-93-036`, `AB-93-051`, `AB-93-055`, `AB-93-078` |
| Viewer | `AB-93-014` | `AB-93-016`, `AB-93-040`, `AB-93-060`, `AB-93-061` |
| Accountability Partner | `AB-93-015` | `AB-93-001`, `AB-93-009`, `AB-93-017`, `AB-93-018`, `AB-93-033`, `AB-93-076` |
| Invite recipient | `AB-93-079` | `AB-93-004`, `AB-93-010`, `AB-93-065`, `AB-93-066` |
| Former member | `AB-93-080` | `AB-93-049`, `AB-93-050`, `AB-93-051`, `AB-93-052`, `AB-93-066` |
| Support / operations actor | `AB-93-081` | `AB-93-071`, `AB-93-072`, `AB-93-073`, `AB-93-074` |
| Connection authorizer | `AB-93-019` | `AB-93-007`, `AB-93-045`, `AB-93-059` |
| Non-user third party | — | `AB-93-020`, `AB-93-062`, `AB-93-070` |

### 3.2 Lifecycle-state coverage

CBD-72 §2.1 states that pending, rejected, expired, revoked, and inactive
memberships confer no access. That invariant is about authorization. The
adversarial question is different: what does the *state itself* disclose, and
what does a transition between states do to the person it happens to.

| Lifecycle state | Governing rule | Normal case | Adversarial cases |
| --- | --- | --- | --- |
| Invited / pending | CBD-72 §2.1; `DI-91-054` | `AB-93-079` | `AB-93-004`, `AB-93-010`, `AB-93-065`, `AB-93-066` |
| Accepted / active | CBD-72 §2.2 | `AB-93-011`–`AB-93-015` | Throughout §4 |
| Rejected | CBD-72 §2.1 | `AB-93-079` | `AB-93-065` |
| Expired | CBD-72 §2.1; `DI-91-006` | `AB-93-079` | `AB-93-064` |
| Revoked | Permission 24; `DI-91-005` | `AB-93-080` | `AB-93-039`, `AB-93-049`, `AB-93-050` |
| Inactive | CBD-72 §2.1 | `AB-93-080` | `AB-93-055`, `AB-93-056` |
| Role changed | Permission 25 | `AB-93-076` | `AB-93-008`, `AB-93-040` |
| Viewer no-profile | CBD-72 §5.1 item 1 | `AB-93-014` | `AB-93-040` |
| Viewer profile assigned / changed / removed | Permission 22 | `AB-93-014` | `AB-93-040`, `AB-93-060` |
| Primary ownership transferred | CBD-72 §6.2 | `AB-93-075` | `AB-93-002`, `AB-93-043` |
| Co-owner removed | Permission 27; §6.1 | `AB-93-076` | `AB-93-039` |
| Sole Primary Owner attempting exit | CBD-72 §6.3 | `AB-93-075` | `AB-93-046`, `AB-93-047` |
| Primary inactivity threshold crossed | CBD-72 §6.3; `DI-91-076` | — | `AB-93-055`–`AB-93-058` |
| Budget space archived | CBD-72 §6.5; `DI-91-075` | `AB-93-082` | `AB-93-041`, `AB-93-048`, `AB-93-053` |
| Archived, pending deletion | CBD-72 §6.4 | `AB-93-082` | `AB-93-042` |
| Purged | CBD-72 §6.4 item 4; `DI-91-074` | `AB-93-082` | `AB-93-042`, `AB-93-062` |
| Connection authorizer active | PM-72-011 | `AB-93-019` | `AB-93-007` |
| Connection authorizer membership lost | CBD-72 §6.3 | `AB-93-019` | `AB-93-045` |
| Connection permanently orphaned | OD-72-04; `DI-91-056` | — | `AB-93-045`, `AB-93-059` |
| Personal account deleted | `EG-91-002` | — | `AB-93-052`, `AB-93-059` |

### 3.3 Disclosure-channel coverage

The second acceptance criterion requires both direct disclosure and inference.
Every scenario in §4 is tagged with its channel; this table is the index.

| Channel | Kind | Scenarios |
| --- | --- | --- |
| Direct in-app read within an authorized scope | Direct | `AB-93-011`–`AB-93-022`, `AB-93-033`–`AB-93-038` |
| Notification content on a delivered channel | Direct | `AB-93-023`–`AB-93-032` |
| Export, snapshot, or downloaded copy | Direct | `AB-93-005`, `AB-93-006`, `AB-93-050`, `AB-93-051`, `AB-93-067` |
| Audit and administrative history | Direct | `AB-93-067`–`AB-93-070` |
| Metadata — status labels, lifecycle state, reasons | Inference | `AB-93-055`–`AB-93-059`, `AB-93-064` |
| Aggregates, totals, and derived indicators | Inference | `AB-93-021`, `AB-93-036`, `AB-93-060` |
| Previews, counts, search, and empty states | Inference | `AB-93-060`, `AB-93-061` |
| Timing, cadence, and delivery patterns | Inference | `AB-93-030`, `AB-93-031`, `AB-93-057` |
| Existence and non-existence of a record | Inference | `AB-93-061`, `AB-93-062`, `AB-93-064` |

## 4. Abuse, coercion, and privacy scenario catalog

Scenario IDs are stable. They are never renumbered, reused, or made dependent on
display order. A numerical gap means a case was withdrawn during review and its
ID retired.

Each row states the mechanism in approved product terms. Where a row describes
something the approved model already prohibits, the row exists because the
prohibition needs a negative test, not because the behavior is expected.

### 4.1 Coerced consent and role acquisition

Coercion is the hardest class in this catalog because every authorization check
passes. The consent evidence in `DI-91-007` is genuine, versioned, and
attributable; the reauthentication evidence in `DI-91-052` proves the subject was
present and authenticated. Neither proves willingness. The product cannot detect
coercion, so the safeguards below aim at reversibility, delay, and making a
coerced grant cheap to undo rather than at refusing the grant.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-001 | Coercive · prospective Accountability Partner | An abusive partner or family member requires the subject to invite them as an Accountability Partner. The role is designed for voluntary support and grants comprehensive, financially read-only visibility of every budget plan, category, bill, goal, account, balance, transaction history, merchant/payee display name, schedule, reconciliation history, report, total, trend, and shared comment. Consent is recorded and valid. | HC-93-01, HC-93-02, HC-93-04 | Subject, other members | CBD-72 §5.3; `DI-91-007` | SG-93-001, SG-93-002, SG-93-005, SG-93-011 | Modelled |
| AB-93-002 | Coercive · Co-owner | The coercer pressures the Primary Owner into transferring Primary ownership under §6.2. The transfer is atomic and fully audited, and the outgoing Primary Owner **always becomes a Co-owner**, so the coercer gains every protected action while the subject retains day-to-day administration that looks like continuity. The subject loses both unilateral exits — transfer and archival — that §6.3 guarantees only to the Primary Owner. | HC-93-02, HC-93-05 | Subject | CBD-72 §6.2 items 6–7; §6.3; permission 29 | SG-93-003, SG-93-004, SG-93-047, SG-93-048 | Modelled |
| AB-93-003 | Coercive · any member | Fresh reauthentication under §6.1 is required for protected actions. Under coercion the ceremony is performed with the coercer present. `DI-91-052` then records a high-assurance result bound to the subject, the action, and the space, which later reads as deliberate authorization. | HC-93-02, HC-93-07 | Subject | CBD-72 §6.1; `DI-91-052` | SG-93-004, SG-93-006, SG-93-089 | Modelled |
| AB-93-004 | Coercive · Primary Owner or Co-owner | The invitation is sent to an email address or phone number the coercer controls or monitors. CBD-72 requires verified control of the invited channel before acceptance, which the coercer satisfies on their own monitored channel. The invitation bearer secret `DI-91-006` reaches the coercer, not the intended person. | HC-93-01, HC-93-02, HC-93-06 | Subject, invited non-member | CBD-12 invitation scope; `DI-91-006`, `DI-91-054` | SG-93-007, SG-93-008, SG-93-090 | Modelled |
| AB-93-005 | Coercive · Primary Owner, Co-owner, or Collaborator | The subject is required to generate a full financial export and hand over the downloaded file. Generation is authorized, allowlisted, rate-limited, and audited; the server package expires. `DI-91-050` records that once downloaded, the copy is outside CoBudget custody permanently, and CBD-91 §4 rule 7 forbids claiming otherwise. Expiry of the server package changes nothing for the subject. | HC-93-01, HC-93-03, HC-93-08 | Subject, other members, non-user third party | `DI-91-034`, `DI-91-050`, `DI-91-064`; CBD-91 §4 rule 7 | SG-93-009, SG-93-057, SG-93-058, SG-93-091 | Modelled |
| AB-93-006 | Coercive · Primary Owner or Co-owner | An owner is pressured into generating an owner-authorized Viewer snapshot under §5.8 for a Viewer the coercer controls, or the coercer as owner generates one to establish a durable copy of that Viewer's readable scope. The package is recipient-bound and expires within 24 hours; the download is permanent. | HC-93-01, HC-93-02 | Subject, other members | CBD-72 §5.8; `DI-91-036`, `DI-91-050` | SG-93-009, SG-93-010, SG-93-057, SG-93-091 | Modelled |
| AB-93-007 | Coercive · connection authorizer | The subject is pressured into authorizing a bank connection for an account they are entitled to access, exposing balance and complete transaction history to the budget space. PM-72-011 correctly binds the connection to the individual authorizer, so revocation is available to the subject alone — but revoking is a visible act with interpersonal cost, and `DI-91-056` will label the resulting state to every member who can read the account. | HC-93-01, HC-93-02, HC-93-08 | Subject, non-user third party | PM-72-009, PM-72-011; `DI-91-011`, `DI-91-056` | SG-93-011, SG-93-012, SG-93-059, SG-93-092 | Modelled |
| AB-93-008 | Malicious · Primary Owner or Co-owner | The subject is moved from Collaborator to Viewer with a narrow profile under permission 25. The coercer keeps full visibility of the shared finances while the subject is reduced to a Planning profile that excludes accounts, balances, transactions, and every actual-derived value. Visibility asymmetry becomes a control mechanism inside a nominally shared household. | HC-93-02, HC-93-05 | Subject | Permissions 22, 25; CBD-72 §5.1 items 1–4 | SG-93-013, SG-93-049, SG-93-093 | Modelled |
| AB-93-009 | Over-privileged · Accountability Partner | A parent, community figure, or other authority is invited as an Accountability Partner for ostensibly supportive reasons. The role has **no resource-level grants**; CBD-72 §5.3 states that Viewer is required for partial sharing. The subject who wanted to share one category shares everything, because the product offered no narrower supportive option. | HC-93-01, HC-93-04, HC-93-08 | Subject | CBD-72 §5.3; §2.2 | SG-93-002, SG-93-011, SG-93-014, SG-93-093 | Modelled |
| AB-93-010 | Coercive · invite recipient | The invited person is pressured to accept before they can see what accepting exposes about **them**. The versioned disclosure in §6.2 covers ownership transfer; ordinary role invitations have no equivalent approved pre-acceptance disclosure of what the accepting person's own activity and attributed actions will reveal to existing members. | HC-93-02, HC-93-06 | Invited non-member | CBD-72 §6.2 item 2 by contrast; CBD-73 scope | SG-93-005, SG-93-015, SG-93-094 | Referred to CBD-73 |

### 4.2 Role visibility in normal use and unwanted monitoring

`AB-93-011` through `AB-93-015` and `AB-93-019` state what each role legitimately
sees in ordinary, consensual use. They are the baseline the adversarial rows are
measured against, and they are the reason the adversarial rows are hard: in most
cases nothing malfunctions. The observer sees exactly what the model grants.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-011 | Normal · Primary Owner | The Primary Owner administers the space, reads all shared financial and planning data, and reads the Primary-only administrative audit history. This is the widest ordinary read position in the product, and exactly one person holds it at all times under PM-72-008. | Baseline | — | CBD-72 §2.2, §4; `DI-91-060` | SG-93-016, SG-93-077 | Modelled |
| AB-93-012 | Normal · Co-owner | A Co-owner shares day-to-day administration and full financial visibility but cannot remove or demote the Primary Owner, transfer ownership, archive, or delete. Multiple Co-owners may exist simultaneously. | Baseline | — | CBD-72 §2.2, §6 | SG-93-016 | Modelled |
| AB-93-013 | Normal · Collaborator | A Collaborator contributes equally to planning and reconciliation across the whole space and may export full financial data, but administers nothing and reaches only bank connections they personally authorized. | Baseline | — | CBD-72 §2.2; `DI-91-034` | SG-93-016, SG-93-057 | Modelled |
| AB-93-014 | Normal · Viewer | A Viewer reads exactly one owner-assigned visibility profile and its inherited scope. A new Viewer with no profile sees nothing. Derived output outside Full budget is labelled “Shared view—not the full budget”, and a report requiring unavailable inputs is withheld rather than rendered partial. | Baseline | — | CBD-72 §5.1 | SG-93-013, SG-93-060 | Modelled |
| AB-93-015 | Normal · Accountability Partner | An accepted Partner reads comprehensive financial and schedule content within the fixed field boundary, may acknowledge their own firm alerts, and may comment on readable targets. They mutate no financial state. | Baseline | — | CBD-72 §5.3 | SG-93-011, SG-93-014 | Modelled |
| AB-93-016 | Malicious · Viewer with Account-group profile | An Account-group Viewer receives each selected account's safe identity, balance, **all** readable transactions, and reconciliation history. Pointed at the subject's primary account, the profile is a complete, continuously refreshed record of where the subject went and what they bought. CBD-72 §9 audits protected reads, but it does not define whether an ordinary in-scope read of financial detail by a scoped role is a protected read, so whether continuous observation leaves any trace is currently undecided. | HC-93-01, HC-93-03, HC-93-08 | Subject, non-user third party | CBD-72 §5.1 item 6; §9 | SG-93-013, SG-93-017, SG-93-060, SG-93-078 | Modelled |
| AB-93-017 | Malicious · Accountability Partner | The Partner field boundary explicitly includes the transaction **merchant-or-payee display name**. Repeated observation yields the subject's pharmacy, clinic, therapist, attorney, shelter, place of worship, and daily route. Nothing in the approved model narrows this, because narrowing it would defeat the role's stated purpose. | HC-93-01, HC-93-03, HC-93-08 | Subject, non-user third party | CBD-72 §5.3 field boundary | SG-93-011, SG-93-018, SG-93-019 | Accepted residual |
| AB-93-018 | Malicious · Accountability Partner or Co-owner | The subject cannot mute, pause, or narrow an existing observer. CBD-12 states that no relationship-level pause, suppression, or cross-account alert control exists, and membership administration under permissions 24–25 belongs to Primary Owner and Co-owner only. A Collaborator subject watched by an owner-invited Partner cannot remove that Partner; their only exit is leaving the space and losing access to household finances they depend on. | HC-93-01, HC-93-02, HC-93-04 | Subject | CBD-12 alert scope; permissions 24–25; CBD-72 §5.4 | SG-93-020, SG-93-021, SG-93-049 | Modelled |
| AB-93-019 | Normal · connection authorizer | Each bank connection has exactly one individual authorizer who alone manages and revokes it. A joint account may carry several independent connections; consent, management, revocation, provenance, and audit stay separate per connection, and authority never transfers. | Baseline | — | PM-72-011; CBD-72 §6.3 | SG-93-012, SG-93-059 | Modelled |
| AB-93-020 | Malicious · any reading role | Imported transactions disclose the subject's counterparties. A non-user third party — a landlord, a support worker, a relative receiving money, a clinic — appears in the shared record with a display name, an amount, and a date. That person never consented, holds no membership, receives no notice, and has no revocation path. | HC-93-01, HC-93-10 | Non-user third party | `DI-91-015`, `DI-91-068`; CBD-72 §5.3 | SG-93-018, SG-93-022, SG-93-092 | Accepted residual |
| AB-93-021 | Malicious · any reading role | Income schedules and expected occurrences are S3 precisely because they expose payday and employment timing, and `DI-91-020` inherits that sensitivity because materialized period boundaries reproduce the same inference. An observer learns when the subject is paid, whether that changed, and therefore whether the subject's employment changed — without reading a transaction. | HC-93-01, HC-93-08 | Subject | `DI-91-019`, `DI-91-020`, `DI-91-021` | SG-93-019, SG-93-064 | Modelled |
| AB-93-022 | Malicious · any reading role | Search over an authorized scope is a targeted interrogation tool, not only a discovery aid. An observer repeatedly queries one merchant, amount range, or category to test a hypothesis about the subject. Every query sits inside the observer's authorized scope, so no denial fires, and whether the §9 protected-read requirement extends to repeated in-scope search is undefined. | HC-93-01, HC-93-04 | Subject | `DI-91-032`; CBD-72 §9 | SG-93-017, SG-93-078, SG-93-079 | Modelled |

### 4.3 Notification leakage and shared-device exposure

This family is where the product's safety intentions most directly collide with
its delivery mechanics. CoBudget controls eligibility and payload up to the
moment of delivery. After that, `DI-91-049` records that the provider, carrier,
inbox, operating system, and device control the copy, and CBD-91 §4 rule 7
forbids claiming that revocation retracts it.

`EG-91-024` scopes the SMS and push threat surface and is not closed. Rows here
that depend on carrier or platform behavior are stated as requirements against
that gap, not as resolved controls.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-023 | Compromised · subject's own channel | SMS crosses an unencrypted carrier network, is retained by the carrier, and mirrors by default to any device or account configured to receive the subject's messages. An abuser with a paired tablet, a family plan, or a mirrored desktop client reads every CoBudget SMS the subject receives, including safety-relevant lifecycle notices. | HC-93-01, HC-93-03, HC-93-04 | Subject | `DI-91-049`; `EG-91-024`; CBD-91 §5.1 delivered-copy row | SG-93-025, SG-93-026, SG-93-027, SG-93-091 | Modelled |
| AB-93-024 | Compromised · subject's own device | Push and OS notifications surface on a locked screen by default. `DI-91-030` requires the narrowest allowlist for push and SMS for exactly this reason. A preview that names a category, a merchant, an amount, or a bill is readable by anyone near the device. | HC-93-01, HC-93-03 | Subject | `DI-91-030`, `DI-91-049`, `DI-91-073` | SG-93-026, SG-93-028, SG-93-091 | Modelled |
| AB-93-025 | Compromised · shared inbox | Households frequently share an email address, or one person administers the other's mailbox. Email notices, invitations, and lifecycle notices addressed to the subject land where the observer reads them. Verified control of the channel is satisfied; sole control is not. | HC-93-01, HC-93-06 | Subject | `DI-91-049`, `DI-91-054` | SG-93-007, SG-93-025, SG-93-029 | Modelled |
| AB-93-026 | Malicious · abuser holding a mirrored device | SMS opt-out keywords are handled at the carrier and provider layer and are **destination-scoped, not identity-scoped**. An abuser replying `STOP` from a mirrored device suppresses the subject's SMS channel. `DI-91-059` records opt-out replies as delivery-suppression state. The subject's mandatory in-app instance survives, but a subject who has stopped opening the app loses the notices most relevant to their safety. | HC-93-02, HC-93-03 | Subject | `DI-91-059`; `EG-91-024`; CBD-72 §5.4.1 item 3 | SG-93-030, SG-93-031, SG-93-091 | Modelled |
| AB-93-027 | Compromised · abuser with device access | `DI-91-047` browser and PWA persistence keeps app-controlled state on the device. On a shared or seized device, previously rendered financial data remains reachable until purge, and purge is only possible while the client is reachable. `EG-91-023` leaves client purge guarantees open. | HC-93-01, HC-93-02 | Subject | `DI-91-047`, `DI-91-048`; `EG-91-023` | SG-93-032, SG-93-061, SG-93-062 | Modelled |
| AB-93-028 | Malicious · Primary Owner or Co-owner | CBD-72 §6.3 requires an inactive-owner archival request to notify every active member and the Primary Owner **through every channel on record**. The requirement exists to prevent covert action. For a subject who has left and whose old channels are monitored, the same requirement guarantees that the abuser is told. The safety control and the leak are the same mechanism. | HC-93-02, HC-93-03, HC-93-09 | Subject | CBD-72 §6.3; CBD-91 §7.3 item 4 | SG-93-033, SG-93-041, SG-93-042, SG-93-091 | Accepted residual |
| AB-93-029 | Malicious · any member | CBD-91 §7.3 item 4 makes notices addressed to the subject of a threshold judgement unsuppressible by another member's preferences. That is correct. It also means the subject cannot suppress them **for their own safety** on a channel they no longer control, and the approved model provides no way to retire a compromised channel from lifecycle-notice routing without losing the notice entirely. | HC-93-03, HC-93-09 | Subject | CBD-91 §7.3 item 4; `DI-91-029` | SG-93-031, SG-93-033, SG-93-034 | Modelled |
| AB-93-030 | Malicious · any reading role | Delivery cadence is itself a signal. `DI-91-029` holds quiet hours and time zone; `DI-91-059` holds per-attempt outcome and timing. Even without content, a pattern of when the subject's device is reachable and when their quiet hours fall discloses sleep schedule, work schedule, and travel. | HC-93-01, HC-93-03 | Subject | `DI-91-029`, `DI-91-059` | SG-93-034, SG-93-065, SG-93-079 | Modelled |
| AB-93-031 | Malicious · any eligible recipient | An informational alert self-clears when its source resolves. The **appearance and disappearance** of an alert is observable to every eligible recipient and carries information the resolved state no longer shows. An observer who watches continuously learns of a provisional overspend the subject corrected before anyone was meant to notice. | HC-93-01, HC-93-04 | Subject | CBD-72 §5.4.1 items 5–6; `DI-91-027` | SG-93-065, SG-93-066 | Modelled |
| AB-93-032 | Compromised · shared or family device | `DI-91-073` push registration tokens bind to a device installation, not to a person. On a family tablet where the subject once signed in, an unrevoked token can route a notice to a device the abuser holds. Token deletion is required on logout, account switch, uninstall, and rotation, but each of those depends on the client being reachable. | HC-93-01, HC-93-03 | Subject | `DI-91-073`; `EG-91-023`, `EG-91-024` | SG-93-028, SG-93-032, SG-93-062 | Modelled |

### 4.4 Shame, pressure, and forced acknowledgement

CoBudget's stated purpose includes collaborative financial accountability. The
same mechanics that make accountability work — attribution, visibility, and
acknowledgement — are the mechanics of shaming when the relationship is not
healthy. The approved model already keeps personal alert state private; the
open exposure is in attributed shared content and in the absence of any remedy
for content another person authored.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-033 | Malicious · Accountability Partner or Co-owner | The observer demands that the subject open the app and acknowledge a firm alert in their presence. Acknowledgement state is correctly personal and invisible to other members, so the product has no in-band record that the ritual occurred — and no signal that would let anyone intervene. The product's privacy guarantee is intact; the harm is unaffected by it. | HC-93-04 | Subject | CBD-72 §5.4.1 item 4; `DI-91-028` | SG-93-035, SG-93-036, SG-93-093 | Modelled |
| AB-93-034 | Malicious · Primary Owner, Co-owner, Collaborator, or Accountability Partner | Comments are attributed, persistent, and visible to everyone who can read the target. **No owner or member may edit, remove, hide, or moderate another author's contribution** under §5.6 item 4. A member harassed through comments on their own transactions has no in-product remedy at all. §5.6 item 9 routes serious abuse to a separate platform safety process that does not yet exist and is not specified. | HC-93-04, HC-93-08 | Subject, author | CBD-72 §5.6 items 4, 9; `DI-91-026`; `EG-91-009` | SG-93-037, SG-93-038, SG-93-039 | Modelled |
| AB-93-035 | Malicious · Primary Owner, Co-owner, or Collaborator | Category assignment is a judgement rendered in the shared record. Recategorizing the subject's spending into a pejorative or exposing category — or into one that reveals a sensitive attribute — is an approved overlay mutation under `DI-91-017` that cannot change the source fields but does change how every reader sees the subject's activity. | HC-93-04, HC-93-08 | Subject | `DI-91-017`; permissions 7–8 | SG-93-023, SG-93-040 | Modelled |
| AB-93-036 | Malicious · any reading role | Variance, over-target, and forecast indicators are derived precisely to make budget state legible. In an adversarial relationship they are the exhibit in a recurring argument. `DI-91-031` is S3 and correctly scoped, and the harm needs no scope violation at all. | HC-93-04, HC-93-05 | Subject | `DI-91-031`; CBD-72 §5.2 | SG-93-036, SG-93-093 | Accepted residual |
| AB-93-037 | Malicious · Primary Owner or Co-owner | Goal names and progress are shared planning content. A goal the subject created for a private purpose — legal fees, a deposit, travel — is visible with its target and its progress, and its **rate of change** shows whether the subject is still contributing. `DI-91-025` records that goals can expose health, family, housing, or escape plans. | HC-93-03, HC-93-04 | Subject | `DI-91-025`; `EG-91-014` | SG-93-018, SG-93-023, SG-93-024 | Modelled |
| AB-93-038 | Malicious · Primary Owner or Co-owner | Manual transactions are clearly labelled as manual and permanently distinguishable from imported provenance. An abuser creates manual entries that assert spending the subject did not make, or annotates real spending, producing a shared record the subject cannot remove — only an authorized Primary Owner, Co-owner, or Collaborator may remove a manual transaction, and a Viewer or Partner subject has no such authority. | HC-93-04, HC-93-07 | Subject | `DI-91-016`; CBD-72 §5.5 items 1, 3 | SG-93-040, SG-93-050 | Modelled |

### 4.5 Role misuse, retaliatory removal, and lockout

CBD-12 prohibits user lockout, and the approved lifecycle honors that for
*accounts*. The cases below concern a narrower and unprohibited outcome: a
member who keeps their account and loses everything the account was for. The
strongest findings in this document are here, because the lifecycle actions that
protect a budget space from being orphaned are the same actions that let one
member freeze or destroy what everyone else contributed.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-039 | Malicious · Primary Owner | The Primary Owner removes the subject's membership under permission 24, or removes a Co-owner under the §6.1 protected-action contract. Revocation immediately invalidates access and derived artifacts. The subject loses every record of shared household finances they helped build, including their own attributed comments, which remain visible to everyone else under §5.6 item 7 while the former author can no longer read, edit, or remove them. | HC-93-02, HC-93-05, HC-93-07 | Subject, former member | Permissions 24, 27; CBD-72 §5.6 item 7 | SG-93-047, SG-93-051, SG-93-052, SG-93-063 | Modelled |
| AB-93-040 | Malicious · Primary Owner or Co-owner | A Viewer's profile is narrowed or removed under permission 22. The change is atomic, invalidates open work, and is notified and audited. What the notice **says** is unspecified: `EG-91-015` leaves the notice catalog open, so whether the affected Viewer learns that their scope narrowed, or merely that something changed, is undecided. Silent information starvation is a control technique, and the difference is entirely in the copy. | HC-93-02, HC-93-04 | Subject | Permission 22; `EG-91-015` | SG-93-013, SG-93-049, SG-93-093 | Modelled |
| AB-93-041 | Malicious · Primary Owner | Archival under §6.5 stops mutation, synchronization, invitations, and alert generation for **every** member. As originally written, §6.5 item 10 also barred any export or snapshot from an archived space, so a Primary Owner could freeze the space and simultaneously remove every other member's route to a portable copy of the records they contributed — members kept read-only access but could not get a copy out. The sharpest form was the §6.4 restore window, where members are notified twice that everything will be purged, can read all of it, and could export none of it. **Closed by Product Owner decision, August 15, 2026: export follows read scope, bounded by the frozen `DI-91-075` snapshot.** Carried by CBD-72 §6.5 item 11 under RF-72-61 and adopted by CBD-91 v1.0.1; both are merged. This row is retained with its original exposure. | HC-93-02, HC-93-05, HC-93-07 | Other members, subject | CBD-72 §6.5 items 3, 10; §6.4 item 2; permission 35; `DI-91-034`–`DI-91-036` | SG-93-053, SG-93-054, SG-93-055 | Closed by decision |
| AB-93-042 | Malicious · Primary Owner | Deletion under §6.4 purges the financial payload, planning history, reconciliation history, interactions, and imported records irreversibly, leaving only a minimal non-financial tombstone. Every active member is notified when the 30-day restore window opens, is cancelled, and shortly before it closes — but **no member has any objection right**. Compare §6.3, where a member-initiated archival request grants the Primary Owner a 14-day objection window. The asymmetry runs against the people with the least authority. | HC-93-05, HC-93-07 | Other members | CBD-72 §6.4 items 2–4 against §6.3 | SG-93-055, SG-93-056, SG-93-093 | Modelled |
| AB-93-043 | Malicious · Primary Owner | Ownership is transferred to the subject under §6.2 while the coercer, as outgoing Primary, **always becomes a Co-owner** and keeps full day-to-day administration. Responsibility moves; authority barely does. If the recipient was a Viewer or Accountability Partner, their prior profile and role-specific alert eligibility end, so a subject accepting under pressure also loses the narrow scope they had chosen. | HC-93-02, HC-93-04 | Subject | CBD-72 §6.2 items 6–7 | SG-93-003, SG-93-047, SG-93-048 | Modelled |
| AB-93-044 | Malicious · Primary Owner | Shared settings under permission 30 include currency, locale, time zone, and budgeting conventions. Changing them alters how every member's financial data is presented and how period boundaries fall, without touching a single financial record. It is a low-visibility way to make the shared budget unusable or misleading for another member. | HC-93-05 | Other members | Permission 30; `DI-91-004` | SG-93-050, SG-93-079 | Modelled |
| AB-93-045 | Malicious · departing connection authorizer | An authorizer who leaves permanently orphans their connection under OD-72-04. The connection is read-only forever, no member including the Primary Owner may adopt or reauthorize it, and coverage resumes only if another entitled member authorizes a **new** connection to the same account. An abuser who was the sole entitled authorizer can permanently end the household's visibility of a joint account on their way out. The anti-inheritance rule is correct; the abuse case is a direct consequence of it. | HC-93-05 | Other members | OD-72-04; CBD-72 §6.3; PM-72-011 | SG-93-059, SG-93-092 | Accepted residual |
| AB-93-046 | Malicious · household situation | Every exit available to a sole Primary Owner is loud. Transfer requires a recipient who authenticates and accepts. Archival notifies every active member. Deletion routes through archival and notifies again. There is no quiet exit. A Primary Owner leaving an abusive household cannot disengage without the other members — including the abuser — being told, and being told at the moment of maximum risk. | HC-93-02, HC-93-03, HC-93-09 | Subject | CBD-72 §6.2, §6.3, §6.4, §6.5 | SG-93-048, SG-93-053, SG-93-056 | Modelled |
| AB-93-047 | Malicious · abuser holding Primary ownership | A subject whose abuser is the Primary Owner has no recovery path. Support-mediated transfer of Primary ownership remains blocked pending an identity-verified procedure, and `EG-91-009` records that such requests are refused rather than resolved through an administrative shortcut. That is the right security posture and it leaves the subject with nothing but leaving. The refusal must be disclosed honestly rather than presented as a temporary limitation. | HC-93-02, HC-93-05, HC-93-07 | Subject | CBD-72 §6.3; `EG-91-009` | SG-93-051, SG-93-056, SG-93-085, SG-93-094 | Accepted residual |
| AB-93-048 | Malicious · Primary Owner | `DI-91-075` freezes each member's role and Viewer profile at the instant of archival and governs reads for the entire archived life of the space. An owner who narrows a Viewer's profile and then immediately archives makes that narrowed scope permanent: no role or profile may change while archived, so the reduction cannot be undone by anyone except through Primary-only restoration. | HC-93-02, HC-93-05 | Subject | `DI-91-075`; CBD-72 §6.5 items 9–10 | SG-93-049, SG-93-054 | Modelled |

### 4.6 Stale access, former members, and copies outside custody

CBD-91 §4 rules 4 and 7 already require immediate invalidation of user-delegated
work and forbid claiming that revocation retracts a copy a recipient already
holds. The cases here separate the two halves: what invalidation must actually
cover, and what it can never reach.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-049 | Malicious · removed member | Revocation must invalidate reads, caches, indexes, queued deliveries, pending downloads, snapshots, alert eligibility, and open jobs at once. Any lag is a window in which a person removed for their conduct still receives the subject's financial data. `EG-91-007` leaves invalidation latency and its service-level objective undecided, so the width of that window is currently unknown. | HC-93-01, HC-93-02 | Subject | CBD-91 §4 rule 4; `DI-91-040`, `DI-91-039`; `EG-91-007` | SG-93-061, SG-93-063, SG-93-067 | Modelled |
| AB-93-050 | Malicious · former member | A full financial export downloaded while the person was a member is permanent. `DI-91-050` states plainly that CoBudget cannot guarantee remote deletion, expiry, or revocation of a downloaded or user-copied file. Removing the member does not reduce what they hold; it only stops the next copy. | HC-93-01, HC-93-03 | Subject, other members, non-user third party | `DI-91-050`; CBD-91 §4 rule 7 | SG-93-057, SG-93-058, SG-93-091 | Accepted residual |
| AB-93-051 | Malicious · Collaborator preparing to leave | A Collaborator may export full financial data from a versioned allowlist limited to their current readable scope — which is the whole shared space. There is no cooling-off period, no owner visibility of intent before the fact, and no restriction tied to a pending membership change. The last act before departure can lawfully be a complete copy. | HC-93-01, HC-93-07 | Other members | CBD-72 §2.2; `DI-91-034` | SG-93-057, SG-93-058, SG-93-080 | Modelled |
| AB-93-052 | Malicious · account deletion | `EG-91-002` leaves personal-account deletion, grace, restoration, and orphan-prevention behavior unresolved. The interaction that matters here is a subject deleting their account to escape observation while their attributed comments, manual transactions, and consent history are retained for other members and for audit. What a departing person can actually make disappear is currently undecided. | HC-93-02, HC-93-04 | Subject, former member | `EG-91-002`; CBD-72 §5.6 item 7 | SG-93-052, SG-93-063 | Referred to CBD-12 |
| AB-93-053 | Compromised · backup restoration | `DI-91-044` restoration must reconcile against current authorization and deletion state before service resumes. Without that reconciliation, restoring a backup silently reinstates a revoked membership, a widened Viewer profile, or purged content. `EG-91-020` leaves the deletion ledger and resurrection prevention open. | HC-93-01, HC-93-02 | Subject | `DI-91-044`, `DI-91-045`; `EG-91-020` | SG-93-067, SG-93-068 | Modelled |
| AB-93-054 | Compromised · queued work | `DI-91-039` requires every job to declare its authority mode and to fail closed on stale or ambiguous authority. A queued notification, export, or snapshot generated under an authorization that has since been revoked must be suppressed rather than delivered. `EG-91-011` leaves the schema and execution-time recheck open, so this is currently a requirement rather than a control. | HC-93-01 | Subject | `DI-91-039`; CBD-91 §4 rules 2, 9; `EG-91-011` | SG-93-061, SG-93-067 | Modelled |

### 4.7 Inference through metadata, aggregates, timing, and existence

PM-72-006 and CBD-91 §4 rule 3 already forbid counts, totals, labels, shape,
timing, validation errors, suggestions, empty states, and the existence of a
job, package, or alert from revealing a hidden resource. The cases here are the
ones where the *approved* disclosure is itself the inference — where nothing is
leaking, and a person is still learning something about another person that the
other person did not choose to tell them.

`AB-93-055` through `AB-93-058` are the disposition of the `DI-91-076` accepted
residual that CBD-91 §7.3 clause 8 referred to this ticket by name.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-055 | Malicious · Co-owner or Collaborator | The §6.3 archival-request affordance is available to every entitled role at all times and the server decides. An observer polls it to pin the Primary Owner's inactivity threshold and thereby recover a last-activity date. CBD-91 §7.3 items 1–3 bound this: no pre-request indicator, coarse `eligible_since` storage with no precise timestamp, a uniform response that does not distinguish ineligibility from any other refusal, per-requester rate limiting, and an audit record for every attempt. The probe is bounded, not eliminated. | HC-93-01, HC-93-06 | Subject | CBD-72 §6.3; CBD-91 §7.3 items 1–3, §4 rule 10; `DI-91-076` | SG-93-041, SG-93-043, SG-93-044 | Modelled |
| AB-93-056 | Malicious · Co-owner or Collaborator | Once a request is made, the OD-72-01 notification tells **every active member** that the Primary Owner was inactive for at least the threshold period. In an abusive household this is a status report on a person: that they are not using the account, and therefore that they may have left, been hospitalized, lost their device, or died. CBD-91 §7.3 clause 8 records this as inherent to the approved decision and refers the coercion and surveillance cases here. It cannot be designed away without reopening OD-72-01. | HC-93-02, HC-93-03, HC-93-06, HC-93-09 | Subject, other members | CBD-91 §7.3 clause 8; OD-72-01 | SG-93-042, SG-93-045, SG-93-046, SG-93-091 | Accepted residual |
| AB-93-057 | Malicious · observer with channel access | CBD-91 §7.3 item 4 requires advance notice to the Primary Owner as the threshold approaches, plus notice of every attempt. Both are unsuppressible by design. Delivered to a monitored channel, they hand the observer a countdown and a confirmation that the subject has been absent — the two facts the coarse-storage rule was written to withhold. The leak is not in the stored data; it is in the mandatory notice. | HC-93-03, HC-93-09 | Subject | CBD-91 §7.3 items 2, 4; `DI-91-049` | SG-93-033, SG-93-042, SG-93-046 | Modelled |
| AB-93-058 | Malicious · Co-owner or Collaborator | Any authenticated Primary Owner activity, or an objection from them, cancels the request outright. For a subject who has deliberately disengaged, the request is therefore a compulsion: re-authenticate into an account the abuser may monitor, or lose the space. The objection window that protects an absent owner from silent archival simultaneously forces a fled owner to signal that they are alive and reachable. | HC-93-02, HC-93-03, HC-93-09 | Subject | CBD-72 §6.3 | SG-93-045, SG-93-046, SG-93-056 | Modelled |
| AB-93-059 | Malicious · any member reading the account | `DI-91-056` carries exactly one safe semantic reason for an orphaned connection: that its authorizer is permanently unavailable and coverage can never resume on that connection. Members need the reason to understand why data stopped. The reason also discloses, to everyone who can read the account, that a specific identified person is permanently gone — an inference about death, incapacity, or account deletion that no other surface would provide. | HC-93-06, HC-93-08 | Authorizer, other members | `DI-91-056`; OD-72-04; `CR-91-011` | SG-93-059, SG-93-069, SG-93-092 | Accepted residual |
| AB-93-060 | Malicious · Viewer | CBD-72 §5.1 item 10 withholds a report entirely rather than rendering it partially. That is the right choice against misleading output, and unavailability is itself informative: it tells the Viewer that inputs exist which they cannot see. The same applies to the §5.1 item 9 synthetic split-transaction record, where a visible allocation smaller than a familiar merchant's usual total implies a hidden allocation. | HC-93-01 | Subject | CBD-72 §5.1 items 9–10; PM-72-006 | SG-93-060, SG-93-070, SG-93-093 | Accepted residual |
| AB-93-061 | Malicious · any reading role | Tombstones are existence oracles. `DI-91-058` prevents silent recreation of a purged manual transaction, and §5.6 item 6 shows a neutral “Comment removed” marker where reply context requires it. Both correctly withhold content and both confirm that something was there and was taken away — which is exactly the fact a person removing content was trying not to publish. | HC-93-02, HC-93-04 | Subject, author | `DI-91-058`; CBD-72 §5.6 item 6 | SG-93-070, SG-93-093 | Modelled |
| AB-93-062 | Malicious · former member | `DI-91-074` preserves a budget-space tombstone after purge, and `DI-91-070` gives requesters a customer-visible completion receipt. Neither may retain purged content. The residual is that the space's prior existence, its creation and archival times, and the deleting actor survive, and a former member can learn that the space was destroyed and by whom. `EG-91-003` leaves tombstone retention duration unresolved. | HC-93-06, HC-93-07 | Former member, non-user third party | `DI-91-074`, `DI-91-070`; `EG-91-003` | SG-93-070, SG-93-081 | Modelled |

### 4.8 Cross-budget disclosure and re-contact

PM-72-010 makes cross-space identifiers insufficient authority and CBD-72 §7
gives worked isolation examples. Those cover authorization. The cases below
concern correlation and contact — where the product is the channel through which
someone reaches a person who has ended the relationship.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-063 | Malicious · member of two spaces | A person holds independent roles in two budget spaces — Co-owner in one, Viewer in another — and correlates what they see. No boundary is crossed: they are entitled to both views. The disclosure is the join, and no server-side control can prevent a person from remembering. | HC-93-01, HC-93-06 | Subject | PM-72-010; CBD-72 §7 | SG-93-071, SG-93-093 | Accepted residual |
| AB-93-064 | Malicious · prospective inviter | Invitation by email address or phone number risks becoming a recipient-existence oracle. `DI-91-054` prohibits exactly that, and the prohibition needs a negative test: acceptance, rejection, expiry, resend, cancellation, and error paths must be indistinguishable to the inviter with respect to whether the address already has a CoBudget account. | HC-93-06, HC-93-09 | Invited non-member | `DI-91-001`, `DI-91-054`; CBD-12 invitation scope | SG-93-072, SG-93-073 | Modelled |
| AB-93-065 | Malicious · removed member or stranger | An invitation is a message delivered to an email address or phone number. Someone removed from a space, or with no relationship at all, can create a new budget space and invite the subject repeatedly. Each invitation is a delivered notification the subject did not ask for. The approved model has no per-recipient block, no cross-space invitation rate limit, and no way for a person to refuse invitations from a specific individual. | HC-93-04, HC-93-09 | Subject, invited non-member | CBD-12 invitation scope; `DI-91-054`; CBD-73 | SG-93-074, SG-93-075, SG-93-076 | Modelled |
| AB-93-066 | Malicious · former member | CBD-12 permits safe attachment of an invitation to an existing CoBudget account after invited-channel verification, **even when the account uses a different primary contact**. Someone who knows one of the subject's secondary channels can therefore attach an invitation to the subject's existing account without knowing their primary identity. `DI-91-065` shared display identity then correlates the person across spaces. | HC-93-06, HC-93-09 | Subject | CBD-12 invitation scope; `DI-91-065` | SG-93-072, SG-93-074, SG-93-076 | Modelled |

### 4.9 Audit and administrative-history abuse

Audit exists to make abuse visible. Whoever can read it can also use it. The
approved model concentrates administrative history in exactly one role.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-067 | Malicious · Primary Owner | The customer administrative-history export under §5.7 is a portable dossier of the space's relationships: membership transitions, role changes, Viewer scope changes, ownership transitions, and protected-action outcomes with safe actor and affected-member display identifiers. The redaction allowlist correctly excludes contact details, financial data, and security evidence. It cannot exclude the relationship history itself, which is the package's purpose. | HC-93-06, HC-93-01 | Other members, former member | CBD-72 §5.7; `DI-91-035`, `DI-91-060` | SG-93-077, SG-93-080, SG-93-082 | Accepted residual |
| AB-93-068 | Malicious · Primary Owner | `DI-91-060` gives the Primary Owner a standing view of administrative history without an export. Who was invited, when they accepted, when a role changed, when a Viewer's scope was narrowed, and when someone left is a continuous record of the household's relationships, held by one person and readable at any time. | HC-93-06 | Other members | `DI-91-060` | SG-93-077, SG-93-079 | Modelled |
| AB-93-069 | Malicious · any member reading a target | `DI-91-037` makes ordinary resource audit history visible wherever the target is readable. Aggregated across targets, it is an activity timeline for the subject: what they touched, when, and how often. Each individual disclosure is proportionate; the aggregate is a behavioral profile. | HC-93-01, HC-93-04 | Subject | `DI-91-037`; `EG-91-018` | SG-93-079, SG-93-082 | Modelled |
| AB-93-070 | Malicious · Primary Owner | The asymmetry runs the wrong way for a person being harmed. A subject who needs a record of what was done to them — profile narrowed, membership revoked, space archived — cannot obtain the administrative history, because §5.7 restricts the export to the current Primary Owner. The person with the most authority has the evidence; the person harmed by that authority does not. | HC-93-02, HC-93-07 | Subject, former member | CBD-72 §5.7 item 1 | SG-93-081, SG-93-082, SG-93-086 | Modelled |

### 4.10 Support and operations actors

`EG-91-009` leaves the support and staff access model, moderation, break-glass,
approval, and customer notification open, and records the still-blocked
support-mediated ownership transfer. Every row here is written against that gap.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-071 | Malicious · operations actor | `DI-91-043` support submissions and operator notes are S3 free text; `DI-91-038` and `DI-91-062` hold privileged security and diagnostic evidence. A staff member with routine tooling access and a personal interest in a specific customer is an insider surveillance case that no budget-space permission touches. Operational access is default-deny and, where not yet specified, an evidence gap. | HC-93-01, HC-93-03 | Subject | `DI-91-038`, `DI-91-043`, `DI-91-062`; `EG-91-009` | SG-93-083, SG-93-084, SG-93-087 | Modelled |
| AB-93-072 | Malicious · abuser contacting support | An abuser contacts support claiming to be a locked-out owner and asks for ownership of the subject's space. CBD-72 §6.3 blocks support-mediated transfer outright and `EG-91-009` requires refusal rather than an administrative shortcut. The control is correct and load-bearing; it must be a hard product rule that no escalation path can override, not a policy staff can be talked past. | HC-93-02, HC-93-05 | Subject | CBD-72 §6.3; `EG-91-009` | SG-93-085, SG-93-087 | Modelled |
| AB-93-073 | Malicious · abuser impersonating the subject | An abuser who controls the subject's email or phone contacts support to change a notification destination, cancel a protected action, or trigger a lifecycle request. Channel possession is the impersonation vector, and it is the same possession that `AB-93-023` and `AB-93-025` establish. | HC-93-02, HC-93-03 | Subject | `DI-91-043`, `DI-91-063`; `EG-91-009` | SG-93-084, SG-93-086, SG-93-088 | Modelled |
| AB-93-074 | Mistaken · operations actor | A subject disclosing abuse to support creates the most dangerous free text in the system. It must never reach the customer administrative-history export — §5.7 item 3 already excludes support notes and internal reasons — and it must never surface through any customer-facing audit, status, or correlation surface readable by another member. | HC-93-03, HC-93-04 | Subject | `DI-91-043`, `DI-91-063`; CBD-72 §5.7 item 3 | SG-93-084, SG-93-087, SG-93-088 | Modelled |

### 4.11 Mistaken and over-privileged actors in ordinary use

Most harm in this catalog does not require an abuser. These rows are the
good-faith path, and they matter because the defaults they expose are the
defaults every household gets.

| ID | Posture · actor | Case and mechanism | Harm | Affected | Governing input | Safeguards | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AB-93-075 | Normal · Primary Owner | A Primary Owner leaving a healthy household transfers ownership to an accepting recipient or archives the space. Both exits work as designed, every member is notified, nothing is erased, and the space is never orphaned. This is the case the lifecycle was built for and it should stay the easy path. | Baseline | — | CBD-72 §6.2, §6.3, §6.5 | SG-93-048, SG-93-053 | Modelled |
| AB-93-076 | Mistaken · Co-owner | A Co-owner invites a supportive relative as an Accountability Partner to help with budgeting. The relative receives comprehensive visibility including merchant and payee display names for every member of the space — not only for the person who wanted help. Nobody acted badly and the other members were never asked. | HC-93-01, HC-93-06 | Other members | CBD-72 §5.3; permission 24 | SG-93-002, SG-93-005, SG-93-014, SG-93-093 | Modelled |
| AB-93-077 | Normal · Collaborator | A Collaborator exports their household's financial data for a tax appointment, sees the irreversible-download warning, and downloads once. The allowlist, reauthentication, recipient binding, rate limit, and audit all work. | Baseline | — | `DI-91-034`, `DI-91-064` | SG-93-057, SG-93-091 | Modelled |
| AB-93-078 | Over-privileged · Collaborator | A housemate who shares exactly one recurring bill is added as a Collaborator, because Collaborator is the role that permits contributing. They receive full visibility of the entire shared budget space and full financial export authority. Viewer would restrict their reading but also remove their ability to contribute at all. The product has no role for a partial financial participant. | HC-93-01, HC-93-06 | Other members | CBD-72 §2.2, §5.1 | SG-93-014, SG-93-016, SG-93-093 | Modelled |
| AB-93-079 | Normal · invite recipient | A person receives an invitation on a channel they control, verifies it, reads what the role grants, and accepts, rejects, or lets it expire. Pending, rejected, and expired states confer no access, no derived data, and no alerts. | Baseline | — | CBD-72 §2.1; `DI-91-006`, `DI-91-054` | SG-93-015, SG-93-072 | Modelled |
| AB-93-080 | Normal · former member | A member revokes their own participation without another party's approval. Access and derived artifacts invalidate immediately; their attributed contributions remain with the targets they belong to. | Baseline | — | CBD-72 §6.3; §5.6 item 7 | SG-93-052, SG-93-061 | Modelled |
| AB-93-081 | Normal · operations actor | Support resolves a case through least-privilege tooling and safe correlation metadata, without silent access to the customer's financial content and without reassigning any role. | Baseline | — | `DI-91-063`; `EG-91-009` | SG-93-083, SG-93-087 | Modelled |
| AB-93-082 | Normal · archived budget space | A Primary Owner archives a space that is no longer in use. Everything is preserved and readable, every member is notified, no countdown starts, and restoration returns every role and profile to exactly where it stood. | Baseline | — | CBD-72 §6.5; `DI-91-075` | SG-93-054, SG-93-055 | Modelled |

## 5. Harm and affected-user analysis

### 5.1 Harm-class incidence

| Harm class | Scenarios | Who bears it | What makes it distinctive |
| --- | --- | --- | --- |
| HC-93-01 Financial surveillance | `AB-93-001`, `AB-93-004`–`AB-93-007`, `AB-93-009`, `AB-93-016`–`AB-93-018`, `AB-93-020`–`AB-93-025`, `AB-93-030`, `AB-93-031`, `AB-93-032`, `AB-93-049`–`AB-93-051`, `AB-93-053`, `AB-93-054`, `AB-93-055`, `AB-93-060`, `AB-93-063`, `AB-93-067`, `AB-93-069`, `AB-93-071`, `AB-93-076`, `AB-93-078` | Subject, other members, non-user third party | Almost never requires a scope violation. The observer sees what the model grants; the harm is in continuity and intent, which the model does not represent. |
| HC-93-02 Loss of agency | `AB-93-001`–`AB-93-004`, `AB-93-006`, `AB-93-008`, `AB-93-010`, `AB-93-018`, `AB-93-026`, `AB-93-027`, `AB-93-028`, `AB-93-039`–`AB-93-043`, `AB-93-046`–`AB-93-049`, `AB-93-052`, `AB-93-056`, `AB-93-058`, `AB-93-061`, `AB-93-070`, `AB-93-072`, `AB-93-073` | Subject, former member | Concentrated in lifecycle transitions. The person loses control at exactly the moment they most need it, and the transition is usually irreversible by them alone. |
| HC-93-03 Physical-safety exposure | `AB-93-005`, `AB-93-016`, `AB-93-017`, `AB-93-020`, `AB-93-023`, `AB-93-024`, `AB-93-026`, `AB-93-028`–`AB-93-030`, `AB-93-032`, `AB-93-037`, `AB-93-046`, `AB-93-050`, `AB-93-056`–`AB-93-058`, `AB-93-071`, `AB-93-073`, `AB-93-074` | Subject | The only class where a disclosure can lead to physical harm. Concentrated in merchant/payee names, goal labels, delivered notification copies, and lifecycle notices routed to monitored channels. |
| HC-93-04 Psychological harm | `AB-93-001`, `AB-93-009`, `AB-93-018`, `AB-93-022`–`AB-93-024`, `AB-93-031`, `AB-93-033`–`AB-93-038`, `AB-93-040`, `AB-93-061`, `AB-93-065`, `AB-93-069` | Subject, author | The product surfaces are working correctly in nearly every case. The harm lives in the relationship and is delivered through attribution, visibility, and acknowledgement. |
| HC-93-05 Economic harm | `AB-93-002`, `AB-93-008`, `AB-93-036`, `AB-93-039`, `AB-93-041`, `AB-93-042`, `AB-93-044`, `AB-93-045`, `AB-93-047`, `AB-93-048`, `AB-93-072` | Subject, other members | Loss of records or planning capability rather than loss of money. CoBudget moves no money, so every economic harm here is informational. |
| HC-93-06 Relationship disclosure | `AB-93-004`, `AB-93-010`, `AB-93-020`, `AB-93-025`, `AB-93-055`, `AB-93-056`, `AB-93-059`, `AB-93-062`–`AB-93-064`, `AB-93-066`–`AB-93-068`, `AB-93-076`, `AB-93-078` | Subject, other members, invited non-member | Usually metadata rather than content. Membership state, invitation state, connection state, and audit history each disclose who is connected to whom and when that changed. |
| HC-93-07 Loss of evidentiary records | `AB-93-003`, `AB-93-039`, `AB-93-041`, `AB-93-042`, `AB-93-047`, `AB-93-051`, `AB-93-062`, `AB-93-070` | Subject, former member | Matters most in exactly the situations this analysis exists for. A person leaving an abusive household often needs the financial record they are about to lose access to. |
| HC-93-08 Sensitive-attribute inference | `AB-93-005`, `AB-93-007`, `AB-93-009`, `AB-93-016`, `AB-93-017`, `AB-93-020`, `AB-93-021`, `AB-93-034`, `AB-93-035`, `AB-93-059` | Subject, non-user third party | Derives from category labels, goal and bill purposes, merchant names, and income cadence. This is the `EG-91-014` surface; §7.2 is its disposition. |
| HC-93-09 Re-contact and harassment | `AB-93-028`, `AB-93-029`, `AB-93-046`, `AB-93-056`–`AB-93-058`, `AB-93-064`–`AB-93-066` | Subject, invited non-member | The product becomes a delivery channel to a person who has ended the relationship. Invitations and mandatory lifecycle notices are both such channels. |
| HC-93-10 Third-party harm | `AB-93-020`, `AB-93-062` | Non-user third party | The only class where the harmed person has no account, no notice, no consent, and no recourse. Consent mechanisms cannot reach them by construction. |

### 5.2 Affected-user analysis

| Affected class | Principal exposure | Recourse available in the approved model | Gap |
| --- | --- | --- | --- |
| Subject | Continuous observation within an authorized scope; lifecycle actions taken about them by someone with more authority | Revoke their own participation; revoke connections they personally authorized; configure their own channels | Cannot end an observer's access without leaving; cannot obtain the administrative record of what was done to them (`AB-93-018`, `AB-93-070`) |
| Author | Attributed content that outlives their membership and that no one may moderate | Edit or remove their own content while active and while the target is readable | No remedy against another author's content about them; the §5.6 item 9 platform process is unspecified (`AB-93-034`) |
| Authorizer | Connection state disclosed to the space through `DI-91-056`; revocation is visible | Sole authority to manage and revoke their own connection; authority never transfers | Orphaning is terminal and its reason discloses their permanent unavailability (`AB-93-059`) |
| Other members | Data they contributed becomes unreachable or destroyed by a Primary Owner's protected action | Notice at each lifecycle step | No objection right at deletion; no export path once archived (`AB-93-041`, `AB-93-042`) |
| Invited non-member | Receives a delivered message and a bearer secret before any relationship exists | Reject, or let the invitation expire | No block, no per-inviter refusal, no cross-space invitation rate limit (`AB-93-065`) |
| Former member | Attributed content remains readable to others; downloaded copies they hold remain theirs | Revoke participation | Cannot read, edit, or remove their own prior content; account-deletion interaction unresolved under `EG-91-002` (`AB-93-052`) |
| Non-user third party | Appears in another person's financial record by name, amount, and date | None | No notice, no consent, no revocation path. Structural and unresolvable within the product (`AB-93-020`) |
| Operations actor | Holds privileged access to restricted content | Governed by an access model that does not yet exist | `EG-91-009` is open; every operational safeguard here is a requirement rather than a control (`AB-93-071`) |

### 5.3 The structural pattern

Three patterns recur across the catalog and are more useful to CBD-94 than any
individual scenario.

1. **Authority concentrates and recourse does not.** The Primary Owner holds
   archival, deletion, ownership transfer, membership administration, Viewer
   scope administration, and the only administrative-history export. Every
   member has exactly one guaranteed remedy — leaving — and leaving costs them
   access to records they contributed. The person with the least authority in a
   space bears the most harm from its lifecycle actions.
2. **Safety mechanisms are notification-based, and notification is the leak.**
   Mandatory, unsuppressible notice is the approved answer to covert action, and
   it is correct against a covert adversary. Against an adversary who monitors
   the subject's channels it is the delivery mechanism. `AB-93-028`,
   `AB-93-029`, and `AB-93-057` are the same finding reached from three
   directions, and no amount of payload minimization resolves it, because the
   fact that a notice was sent is the disclosure.
3. **Correct scope decisions produce inference by construction.** Withholding an
   incomplete report, labelling an orphaned connection, keeping a tombstone,
   and notifying an archival request are each the right call in isolation.
   Each also tells an observer something true about another person. These are
   recorded as accepted residuals in §9 rather than treated as defects, because
   the alternative in every case is a worse outcome.

## 6. Required safeguards

Every safeguard carries a class per §2.4 and a verification route. A safeguard
that constrains an approved CBD-12/CBD-72 permission is **not** asserted here as
a decision; it is raised as a reconciliation input in §11 and marked
`Input to CBD-12` in the Verification column. §10 checks the whole set against
the CBD-93 non-escalation criterion.

### 6.1 Consent, invitation, and role acquisition

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-001 | Product | A person whose financial data an observer can read must be able to end that observer's access to their own data without another member's approval and without leaving the budget space. | AB-93-001 | Input to CBD-12; then MEM/PART negative test |
| SG-93-002 | Product | Adding an Accountability Partner or any comprehensive-visibility role notifies every active member whose data becomes readable, naming the added person and the inviter. | AB-93-001, AB-93-009, AB-93-076 | MEM family test |
| SG-93-003 | Copy | The ownership-transfer disclosure must state that the outgoing Primary Owner becomes a Co-owner with continuing day-to-day administration, and that the outgoing owner loses the §6.3 unilateral exits. | AB-93-002, AB-93-043 | OWN family test against approved copy |
| SG-93-004 | Product | A protected action that permanently reduces another person's authority or scope carries a reversal window in which the acting person alone may undo it without the counterparty's involvement. | AB-93-002, AB-93-003 | Input to CBD-12; then OWN/LIFE test |
| SG-93-005 | Product | Every role invitation carries a versioned pre-acceptance disclosure stating what the accepting person will see and what existing members will see about them. | AB-93-001, AB-93-010, AB-93-076 | Input to CBD-73; then MEM test |
| SG-93-006 | Technical | Reauthentication evidence records that a ceremony occurred at an assurance level. It must never be rendered in any customer-facing surface as evidence of intent, willingness, or agreement. | AB-93-003 | AUD negative test on `DI-91-052` rendering |
| SG-93-007 | Copy | Invitation and channel copy must state that CoBudget verifies control of a channel, not sole control, and that a shared inbox or mirrored device will receive the message. | AB-93-004, AB-93-025 | Copy review with CBD-75 |
| SG-93-008 | Technical | The invitation bearer secret is single-use, short-expiry, and bound so that channel possession alone cannot replay it after acceptance, cancellation, or expiry. | AB-93-004 | MEM/AUTH negative test |
| SG-93-009 | Copy | The pre-download warning must state that CoBudget cannot delete, expire, or revoke a copy once downloaded, restating CBD-91 §4 rule 7 in customer language. | AB-93-005, AB-93-006 | EXP family test against approved copy |
| SG-93-010 | Product | Generating an owner-authorized Viewer snapshot notifies the recipient Viewer and every owner, so the disclosure is never silent. | AB-93-006 | EXP family test |
| SG-93-015 | Copy | Invitation copy names the specific role, states the exact scope in plain terms, and states that the recipient may end it. | AB-93-010, AB-93-079 | Input to CBD-73/CBD-75 |

### 6.2 Visibility scope and monitoring

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-011 | Product | The product needs a supportive role narrower than Accountability Partner, or a scoped Partner variant, so that a person wanting help with one part of their finances is not required to expose all of it. | AB-93-001, AB-93-007, AB-93-009, AB-93-015, AB-93-017 | Input to CBD-12 |
| SG-93-012 | Product | A connection authorizer may revoke their own connection at any time without another member's approval, and revocation is never gated on a lifecycle state of the budget space. | AB-93-007, AB-93-019 | CONN family test |
| SG-93-013 | Product | A Viewer profile or scope-group change notifies the affected Viewer with copy stating whether their scope widened or narrowed and what is no longer available. | AB-93-008, AB-93-014, AB-93-016, AB-93-040 | VIEW/MEM test; depends on `EG-91-015` |
| SG-93-014 | Product | Role selection presents the least-privilege option that satisfies the stated purpose and explains what each option exposes about every member, not only about the person being added. | AB-93-009, AB-93-015, AB-93-076, AB-93-078 | Input to CBD-12/CBD-75 |
| SG-93-016 | Technical | Every read of another member's financial data is authorized server-side at request time against current membership, role, profile, scope groups, and authorization version. Hiding a control is not enforcement. | AB-93-011–AB-93-013, AB-93-078 | AUTH family test; PM-72-002 |
| SG-93-017 | Technical | Systematic-observation detection operates on aggregate read volume inside the restricted `DI-91-038` boundary. It is never exposed to any budget-space role and never becomes a per-member activity view. | AB-93-016, AB-93-022 | Security design review; `EG-91-010`/`EG-91-018` |
| SG-93-019 | Technical | Generated periods and transition records inherit the sensitivity of the schedule that produced them. A Planning-profile Viewer must not learn income cadence beyond what the profile grants. | AB-93-017, AB-93-021, AB-93-037 | VIEW/VIS test on `DI-91-020` |
| SG-93-020 | Product | A member may end their own exposure to a specific observer without leaving the budget space. | AB-93-018 | Input to CBD-12 |
| SG-93-021 | Copy | Role and alert copy must not imply that being observed is a condition of participating, or that a person owes another member an account of their spending. | AB-93-018 | Input to CBD-75 |
| SG-93-022 | Product | Counterparty display names are third-party personal data. They must not be enriched, correlated across budget spaces, or used in analytics, and they carry the same handling as the transaction they belong to. | AB-93-020 | `DI-91-042` schema review; `EG-91-019` |

### 6.3 Sensitive labels and free text

These safeguards are the disposition of `EG-91-014`. §7.2 states the full
handling requirement they implement.

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-018 | Product | Category names, goal and bill purposes, comment bodies, and manual-transaction descriptions are treated as potentially safety-relevant content. They never appear in an SMS or push payload, a lock-screen preview, an operational log, a product-analytics event, or any surface outside the target's own authorization. | AB-93-017, AB-93-020, AB-93-037 | VIS/ALERT negative tests; §7.2 |
| SG-93-023 | Product | No feature may require a person to write a descriptive purpose in shared text in order to use it. A goal, bill, or category must be fully usable with a non-descriptive label. | AB-93-035, AB-93-037 | REP/CAT test; §7.2 |
| SG-93-024 | Copy | At creation time, a goal, bill, category, or comment states which roles will be able to read it before it is saved. | AB-93-037 | Input to CBD-75; §7.2 |

### 6.4 Notification channels and shared devices

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-025 | Copy | Channel selection states that SMS crosses an unencrypted carrier network, is retained by the carrier, and may mirror to other devices, and that an email address may be shared or administered by someone else. | AB-93-023, AB-93-025 | Input to CBD-75; `EG-91-024` |
| SG-93-026 | Technical | Per-channel payload allowlists, with SMS and push the narrowest. No financial value, merchant or payee name, category label, or protected-action prompt may appear in an SMS or push body or a lock-screen preview. | AB-93-023, AB-93-024 | ALERT negative test; `DI-91-030` |
| SG-93-027 | Product | SMS is never the sole channel for a safety-relevant lifecycle notice. The mandatory in-app instance always exists and at least one additional durable channel is attempted where the recipient has one. | AB-93-023 | ALERT/LIFE test |
| SG-93-028 | Technical | Push registration tokens are deleted on logout, account switch, uninstall, rotation, and any provider unregistered result, and the subject can review and revoke registered devices. | AB-93-024, AB-93-032 | `DI-91-073` lifecycle test; `EG-91-023` |
| SG-93-029 | Product | A person changes their own notification destinations without another member's involvement, approval, or visibility. | AB-93-025 | SET/ALERT test; CBD-72 §5.4 |
| SG-93-030 | Technical | A carrier opt-out suppresses only that destination. It never suppresses the mandatory in-app instance, and the resulting suppressed state is surfaced to the subject in-app so they can see that SMS delivery is off. | AB-93-026 | ALERT test; `EG-91-024` |
| SG-93-031 | Product | A person may retire a compromised channel from all routing. Lifecycle notices then route to remaining channels and the mandatory in-app instance; they are never silently dropped. | AB-93-026, AB-93-029 | Input to CBD-12; then ALERT test |
| SG-93-032 | Technical | Client-persisted state is partitioned by subject, budget space, and authorization version, purged on logout and account switch, and invalidated immediately on authorization change. | AB-93-027, AB-93-032 | `DI-91-047` test; `EG-91-023` |
| SG-93-033 | Product | A person may designate a safety channel for lifecycle notices about themselves, distinct from their ordinary alert channels. | AB-93-028, AB-93-029, AB-93-057 | Input to CBD-12; specialist review under SG-93-046 |
| SG-93-034 | Technical | Quiet hours, time zone, digest selection, and delivery-attempt outcomes are personal-account state. No other member may read them, and they are never used to derive presence, location, or availability. | AB-93-029, AB-93-030 | ALERT/SET negative test; `DI-91-029`, `DI-91-059` |

### 6.5 Interactions, acknowledgement, and shared content

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-035 | Technical | Acknowledgement, read state, and archive/dismiss state are personal. No surface — audit visible to another role, report, export, or snapshot — exposes another recipient's state. | AB-93-033 | ALERT/AUD negative test; `DI-91-028` |
| SG-93-036 | Copy | Alert, variance, and over-target copy describes a fact. It never assigns blame, implies a person must answer to another member, or frames a budget outcome as a personal failing. | AB-93-033, AB-93-036 | Input to CBD-75 |
| SG-93-037 | Product | A person who is the subject of another author's comment needs a remedy. At minimum: report to the platform, and detach the comment from their own attributed record. CBD-72 §5.6 item 4 stands until CBD-12 decides otherwise. | AB-93-034 | Input to CBD-12 |
| SG-93-038 | Operational | The platform safety and support process that CBD-72 §5.6 item 9 depends on must be specified — intake, triage, authority, timeline, and outcome — before comments ship. | AB-93-034 | Operational readiness gate; `EG-91-009` |
| SG-93-039 | Copy | Comment composition states that comments are attributed, persistent, visible to everyone who can read the target, and removable only by their author. | AB-93-034 | Input to CBD-75; INT test |
| SG-93-040 | Technical | Every overlay, categorization, and manual-transaction mutation records actor, time, and semantic delta, and is visible to the person whose activity it re-describes. | AB-93-035, AB-93-038 | DATE/MAN/AUD test; PM-72-007 |
| SG-93-050 | Product | A person may annotate or contest a shared record that describes them, even where they may not remove it. | AB-93-038, AB-93-044 | Input to CBD-12 |

### 6.6 Inactive-owner threshold and archival request

These safeguards implement CBD-91 §7.3 and §4 rule 10 and bound the accepted
residual restated in §9.2. They do not reopen OD-72-01.

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-041 | Technical | An ineligible archival request returns a result indistinguishable from any other refusal, revealing no date, remaining interval, or prior attempt. Response timing must not distinguish the cases either. | AB-93-055 | LIFE negative test incl. timing; CBD-91 §7.3 item 3 |
| SG-93-042 | Copy | The archival-request notification states that a request was made under the inactive-owner path and what happens next. It must not print a last-activity date, a precise interval, or a countdown. The recipient may infer that the threshold was met; nothing finer may be disclosed. | AB-93-056, AB-93-057 | Input to CBD-75; `EG-91-015` |
| SG-93-043 | Technical | `DI-91-076` persists only the coarse derived eligibility state. No precise last-activity timestamp is persisted in that class, and the state is never combined across budget spaces or reused for presence, analytics, support, or product purposes. | AB-93-055 | Data-model review; CBD-91 §7.3 items 2, 5–7 |
| SG-93-044 | Technical | Archival-request attempts are rate-limited per requester per budget space and every attempt is audited, including ineligible ones, so the endpoint cannot be polled to pin the threshold date. | AB-93-055 | LIFE/AUD test; CBD-91 §7.3 item 3 |
| SG-93-045 | Product | Any authenticated interaction with the budget space by the Primary Owner cancels a pending request. Cancellation must not require the Primary Owner to read a notice on a particular channel or to perform a distinct objection ceremony. | AB-93-056, AB-93-058 | LIFE test; CBD-72 §6.3 |
| SG-93-046 | Specialist review | Whether mandatory, unsuppressible notice to an absent subject is the right default when that subject may have deliberately disengaged for their safety. The notice is the approved anti-covert-observation control and is simultaneously the disclosure in `AB-93-057` and the compulsion in `AB-93-058`. This project cannot resolve the tension without domestic-violence advocacy and legal input. | AB-93-028, AB-93-029, AB-93-056–AB-93-058 | Specialist review gate `EG-93-001` |

### 6.7 Lifecycle: removal, scope reduction, archival, deletion, and exit

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-047 | Product | Any action that removes or reduces another member's access notifies the affected person directly, stating what changed and what they can still do. | AB-93-002, AB-93-039, AB-93-043 | MEM/LIFE test; permissions 22, 24–25 |
| SG-93-048 | Copy | The sole-Primary-Owner exit flow presents both supported exits and states, before commit, exactly which members will be notified and what the notice will say. | AB-93-002, AB-93-043, AB-93-046, AB-93-075 | OWN/LIFE test; CBD-72 §6.3 |
| SG-93-049 | Product | A scope reduction is notified to the affected person in plain before/after terms rather than as an undifferentiated “your access changed”. | AB-93-008, AB-93-018, AB-93-040, AB-93-048 | VIEW/MEM test; `EG-91-015` |
| SG-93-051 | Product | Before a removal takes effect, the removed member is offered an export bounded by the scope they already held. This widens nothing; it preserves what they could already read. | AB-93-039, AB-93-047 | Input to CBD-12; then EXP test |
| SG-93-052 | Product | A departing member may take a copy of their own contributed content and is told plainly what remains attributed to them and readable by others after they leave. | AB-93-039, AB-93-052, AB-93-080 | Input to CBD-12; INT/EXP test |
| SG-93-053 | Product | Archival must not be the mechanism that strips other members of any path to their own records. Export follows read scope: a member may export exactly the scope frozen for them by `DI-91-075`, including throughout the §6.4 restore window. **Product Owner approved August 15, 2026** and carried by CBD-72 §6.5 item 11 under RF-72-61, superseding the original §6.5 item 10 prohibition. | AB-93-041, AB-93-046, AB-93-075 | `LIFE-08` in the CBD-72 scenario catalog; fixture pending |
| SG-93-054 | Technical | The `DI-91-075` archival snapshot can neither widen nor narrow any member's visibility relative to their live scope at the instant of archival. | AB-93-041, AB-93-048, AB-93-082 | LIFE negative test on `DI-91-075` |
| SG-93-055 | Copy | Notice before an irreversible lifecycle step states exactly what will be destroyed or frozen, and what each member can do before it happens. | AB-93-041, AB-93-042, AB-93-082 | Input to CBD-75; LIFE test |
| SG-93-056 | Product | Members should hold a defined position in the §6.4 deletion window comparable to the §6.3 objection window. Deletion currently destroys every member's records with notice but no objection right, while an inactive-owner archival request — which erases nothing — grants a 14-day objection window. | AB-93-042, AB-93-046, AB-93-047, AB-93-058 | Input to CBD-12; asymmetry finding |

### 6.8 Stale access, invalidation, and copies outside custody

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-057 | Copy | Export and snapshot generation carries an explicit irreversible-download warning naming the custody transfer, shown before the package is created. | AB-93-005, AB-93-006, AB-93-050, AB-93-051, AB-93-077 | EXP test; `DI-91-050` |
| SG-93-058 | Product | Generating a full financial export notifies the other members whose data is in the package. Export becomes visible rather than silent. | AB-93-005, AB-93-050, AB-93-051 | Input to CBD-12; then EXP test |
| SG-93-059 | Copy | The orphaned-connection label states the operational consequence and the remedy. It never characterizes why the authorizer is unavailable and never carries a variant that discloses circumstance. | AB-93-007, AB-93-019, AB-93-045, AB-93-059 | CONN test; `DI-91-056` allowlist |
| SG-93-060 | Copy | A withheld report and a shared-view label must not distinguish “there is no data” from “there is data you cannot see”. | AB-93-014, AB-93-016, AB-93-060 | REP/VIS negative test; PM-72-006 |
| SG-93-061 | Technical | Any authorization change immediately invalidates reads, caches, indexes, search results, queued deliveries, pending downloads, snapshots, alert eligibility, open jobs, and reachable client state. | AB-93-049, AB-93-054, AB-93-080 | AUTH/VIEW test; CBD-91 §4 rule 4; `EG-91-007` |
| SG-93-062 | Copy | Statements about client-side purge must be honest: app-controlled state is purged when the client is reachable, and CoBudget cannot guarantee purge on an unreachable device. | AB-93-027, AB-93-032 | Input to CBD-75; `EG-91-023` |
| SG-93-063 | Technical | Former-member attribution is preserved without leaving any read path through the lost membership. A former member must not reach their own prior content through attribution. | AB-93-039, AB-93-049 | INT/MEM negative test; CBD-72 §5.6 item 7 |
| SG-93-067 | Technical | Queued and delayed work fails closed on missing, ambiguous, or stale authority and rechecks current authorization at execution time rather than relying on authority captured at creation. | AB-93-049, AB-93-053, AB-93-054 | AUTH test; CBD-91 §4 rules 2, 9; `EG-91-011` |
| SG-93-068 | Technical | Backup restoration reconciles against current authorization and deletion state before service resumes, so a restore cannot reinstate a revoked membership, a widened profile, or purged content. | AB-93-053 | Restore-reconciliation test; `EG-91-020` |

### 6.9 Inference, existence signals, and derived data

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-064 | Technical | Derived period boundaries, projections, and cadence indicators must not disclose income timing to a role whose profile excludes income. | AB-93-021 | VIS/REP test; `DI-91-019`–`DI-91-021` |
| SG-93-065 | Technical | The existence, appearance, and disappearance of an alert must not disclose a fact the observer is not eligible to read. Informational resolution closes instances without leaving a residual trace visible to others. | AB-93-030, AB-93-031 | ALERT negative test; `DI-91-027` |
| SG-93-066 | Product | Informational-alert eligibility should be reconsidered where the alert describes one identified person's provisional overspend and other members receive it before that person can correct it. | AB-93-031 | Input to CBD-12 |
| SG-93-069 | Technical | The `DI-91-056` reason allowlist carries exactly one semantic value. No additional reason code, status variant, or diagnostic detail that discloses an authorizer's circumstances may be added. | AB-93-059 | CONN negative test; OD-72-04 |
| SG-93-070 | Technical | Tombstones and completion receipts carry no content and appear only where the target was already readable. A tombstone must never become an existence oracle for someone who could not have read the original. | AB-93-061, AB-93-062 | MAN/INT/LIFE negative test; `DI-91-058`, `DI-91-074` |

### 6.10 Cross-budget correlation and re-contact

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-071 | Copy | Role and sharing copy states that visibility in one budget space is independent of another, and that CoBudget cannot prevent a person from combining what they are entitled to see in each. | AB-93-063 | Input to CBD-75 |
| SG-93-072 | Technical | Invitation responses are uniform with respect to whether the address or number already has a CoBudget account. Status, timing, and error paths must be indistinguishable to the inviter. | AB-93-064, AB-93-066, AB-93-079 | MEM/XSP negative test; `DI-91-054` |
| SG-93-073 | Technical | Invitation status disclosed to the inviter is limited to the lifecycle of that specific invitation and carries no recipient-existence or recipient-activity signal. | AB-93-064 | MEM negative test |
| SG-93-074 | Product | A person may block invitations from a specific individual, and cross-space invitation attempts to one recipient are rate-limited. | AB-93-065, AB-93-066 | Input to CBD-12/CBD-73 |
| SG-93-075 | Product | Declining an invitation may be made permanent for that inviter, so declining once does not invite repetition. | AB-93-065 | Input to CBD-73 |
| SG-93-076 | Technical | Shared display identity must not correlate a person across budget spaces without their action, and must never serve as a contact or identity authority. | AB-93-065, AB-93-066 | XSP negative test; `DI-91-065` |

### 6.11 Audit and administrative history

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-077 | Technical | Generating or exporting administrative history is itself an audited event, and the fact that it occurred is disclosable to the members whose relationship history it contains. | AB-93-011, AB-93-067, AB-93-068 | AUD/EXP test; CBD-72 §5.7 item 6 |
| SG-93-078 | Technical | The CBD-72 §9 definition of a protected read must explicitly cover scoped Viewer and Accountability Partner reads of financial detail, so that read-only roles are not audit-invisible. | AB-93-016, AB-93-022 | AUD coverage review; `EG-91-018` |
| SG-93-079 | Technical | No customer-facing surface aggregates another member's actions into a behavioral timeline. Audit views remain target-scoped rather than actor-scoped. | AB-93-022, AB-93-030, AB-93-044, AB-93-068, AB-93-069 | AUD negative test; `DI-91-037` |
| SG-93-080 | Operational | Export and administrative-export volume is monitored for anomalous extraction inside the restricted security boundary, and that monitoring is never exposed to any budget-space role. | AB-93-051, AB-93-067 | Security design review; `DI-91-038` |
| SG-93-081 | Product | A person may obtain the administrative record about themselves — their own membership, role, scope, and lifecycle transitions — without holding Primary ownership. This is their own record and widens nothing. | AB-93-062, AB-93-070 | Input to CBD-12; then EXP/AUD test |
| SG-93-082 | Technical | Audit payloads never copy credentials, tokens, or data the audit viewer is unauthorized to inspect, and never carry support notes or internal reasons into a customer-visible surface. | AB-93-067, AB-93-069, AB-93-070 | AUD negative test; CBD-72 §9, §5.7 item 3 |

### 6.12 Support and operations

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-083 | Operational | Staff access to customer content is default-deny, purpose-bound, approved, time-boxed, and audited. No silent access, no standing broad grant. | AB-93-071, AB-93-081 | Operational gate; `EG-91-009` |
| SG-93-084 | Operational | Any support action that changes a notification destination, cancels a protected action, or triggers a lifecycle request requires identity verification that does not rest solely on possession of a channel. | AB-93-071, AB-93-073, AB-93-074 | Operational gate; `EG-91-009` |
| SG-93-085 | Product | Refusal of support-mediated ownership transfer is a product rule that denies the action, not a staff policy. No escalation path may override it until an identity-verified recovery procedure is approved and security-reviewed. | AB-93-047, AB-93-072 | LIFE negative test; CBD-72 §6.3; `EG-91-009` |
| SG-93-086 | Operational | A documented, honest response exists for a person who reports being shut out of a budget space by another member, stating what CoBudget will and will not do rather than leaving the person without an answer. | AB-93-070, AB-93-073 | Operational gate; pairs with SG-93-085 |
| SG-93-087 | Operational | Staff access to a customer's budget space is notified to the customer unless a named, audited security exception applies. | AB-93-071, AB-93-074, AB-93-081 | Operational gate; `EG-91-009` |
| SG-93-088 | Operational | Support content containing a safety disclosure is handled on a restricted path and never enters a customer-facing export, audit, status, or correlation surface. | AB-93-073, AB-93-074 | Operational gate; `DI-91-043`, `DI-91-063` |

### 6.13 Cross-cutting copy requirements

CBD-12 already requires customer-facing terminology that avoids implying legal
authority, spending permission, punishment, surveillance entitlement,
transaction blocking, or irrevocable access. These extend that requirement to
the surfaces this analysis identified.

| ID | Class | Safeguard | Answers | Verification |
| --- | --- | --- | --- | --- |
| SG-93-089 | Copy | No surface describes recorded consent or a completed reauthentication as evidence that a person agreed freely or willingly. | AB-93-003 | Input to CBD-75 |
| SG-93-090 | Copy | Invitation copy must not imply that the invited channel is private to the invited person. | AB-93-004 | Input to CBD-75 |
| SG-93-091 | Copy | No surface claims that revoking access, expiring a package, or deleting server data retracts a delivered notification, downloaded export, screenshot, or printout. | AB-93-005, AB-93-006, AB-93-023, AB-93-024, AB-93-026, AB-93-028, AB-93-050, AB-93-056, AB-93-077 | Input to CBD-75; CBD-91 §4 rule 7 |
| SG-93-092 | Copy | No surface characterizes a third party's personal circumstances. Status copy states operational facts and remedies only. | AB-93-007, AB-93-020, AB-93-045, AB-93-059 | Input to CBD-75 |
| SG-93-093 | Copy | Role, alert, scope, and lifecycle language must not imply authority the product does not grant, or frame one member as accountable to another. | AB-93-008, AB-93-009, AB-93-033, AB-93-036, AB-93-040, AB-93-042, AB-93-060, AB-93-061, AB-93-063, AB-93-076, AB-93-078 | Input to CBD-75; CBD-12 terminology scope |
| SG-93-094 | Copy | Every disclosure a person cannot undo is stated before the action, in plain language, naming the specific consequence. | AB-93-010, AB-93-047 | Input to CBD-75 |

## 7. Content-handling requirements

### 7.1 Free text and provider-derived content

CBD-91 §4 rule 6 already treats free text and provider payloads as containing S3
data unless a narrower schema and redaction boundary are proven. This analysis
adds one distinction that matters for abuse cases: free text in CoBudget is not
only sensitive, it is frequently *about a person other than its author*. A
comment describes a member's spending, a manual transaction asserts what someone
did, and a merchant name identifies a non-user third party. Handling rules that
protect the author are not sufficient; the subject of the content needs standing
too, which is what `SG-93-037`, `SG-93-040`, and `SG-93-050` provide.

### 7.2 Sensitive labels, goal and bill purposes, and safety-relevant plans

This subsection is the CBD-93 disposition of `EG-91-014`, whose safe interim
position was to treat labels and free text as S3 and apply target-level
authorization, avoiding content in previews, logs, and analytics. That interim
position is confirmed and extended below. Closure of `EG-91-014` still requires
the specialist review in `EG-93-001`–`EG-93-004`; this section states the product
requirement, not the closure.

**Which content is in scope.** Category names and group names (`DI-91-023`),
goal names, purposes, and targets (`DI-91-025`), bill payee and purpose
(`DI-91-024`), note and comment bodies (`DI-91-026`), manual-transaction
descriptions (`DI-91-016`), transaction overlay reason text (`DI-91-017`), and
provider-supplied merchant or payee display names (`DI-91-015`, `DI-91-068`).

**Why it cannot be solved by classification alone.** Every class above is already
S3 and already scoped correctly. The abuse surface is not that the data is
under-classified; it is that the data is *legitimately readable* by the person it
endangers the subject with. `AB-93-017`, `AB-93-020`, and `AB-93-037` are all
in-scope reads. Classification does not help. The requirement below therefore
governs propagation, optionality, and disclosure rather than access.

1. **No propagation beyond the target's own authorization.** In-scope content
   never appears in an SMS or push payload, a lock-screen or inbox preview, an
   operational log, a product-analytics event, a diagnostic trace, a support
   correlation record, or any derived surface whose audience differs from the
   target's. This is `SG-93-018` and it is stricter than the S3 default, which
   would otherwise permit copies wherever S3 is permitted.
2. **Descriptive text is always optional.** No feature may require a person to
   name a purpose in shared text in order to use it. A goal, bill, or category
   must be fully functional with a non-descriptive label, and the interface must
   not treat an unlabelled resource as incomplete or nudge toward disclosure.
   This is `SG-93-023`.
3. **Audience is stated before the content is saved.** At creation and edit time,
   the interface states which roles will be able to read the content. A person
   choosing what to write must know who will read it at the moment they write it,
   not afterwards. This is `SG-93-024`.
4. **Third-party names are not enriched.** Merchant and payee display names
   identify people and organizations who are not CoBudget users and gave no
   consent. They are never enriched, geocoded, categorized into inferred
   sensitive segments, correlated across budget spaces, or emitted to analytics.
   This is `SG-93-022`.
5. **No sensitive-content detection.** CoBudget must not attempt to classify
   which of a person's categories or goals are sensitive. Detection would require
   reading and modelling exactly the content this section protects, would fail
   for the cases that matter most, and would create a new inference surface. The
   product treats all in-scope content as potentially safety-relevant rather than
   trying to identify which parts are.

**Residual.** Rules 1–5 do not prevent an authorized reader from reading. A
person who shares a budget space with someone dangerous, and who records a goal
named for its real purpose, is exposed by design and by their own entry. The
product can make the audience clear before they write, keep the content off every
secondary surface, and never require them to write it. It cannot make shared
content unreadable to the people it is shared with. This residual is
`EG-93-004`, and closing it requires the advocacy input in `EG-93-001` rather
than another product control.

## 8. Evidence gaps

The CBD-93 acceptance criteria require unresolved legal, accessibility, privacy,
and research questions to be labelled without unsupported validation claims.
Every row below is an open question, not a finding. None of them has been
answered, and none may be treated as answered by the existence of a safeguard
that depends on it.

| Gap ID | Unresolved question | Safe interim position | Accountable decision-maker | Blocks |
| --- | --- | --- | --- | --- |
| EG-93-001 | Whether mandatory, unsuppressible lifecycle notice is the right default when the notified person may have disengaged for their safety, and what the alternative would be. `AB-93-028`, `AB-93-029`, `AB-93-057`, and `AB-93-058` are the same tension from four directions. | Keep the approved mandatory notice. Do not weaken an anti-covert-observation control on the strength of an unvalidated assumption about what a person at risk would prefer. Minimize payload under `SG-93-042`. | Domestic-violence and coercive-control advocacy review, with legal counsel | `SG-93-033`, `SG-93-046`; §9.2 residual disposition |
| EG-93-002 | Legal obligations and exposure where a product mediates financial coercion — jurisdictional duties, whether mandatory notice is lawful and appropriate in each jurisdiction, and any obligation to preserve records a person needs for a protective or custody proceeding. | Make no claim about legal adequacy. Preserve records under the approved retention rules and do not design new destruction paths pending review. | Pre-launch legal and privacy counsel; pairs with `EG-91-022` | Private-MVP launch approval for collaboration features |
| EG-93-003 | Accessibility of safety-critical copy and exit flows: comprehension under duress, screen-reader exposure of sensitive labels, magnified or cast displays, and cognitive load in irreversible confirmations. | Apply the approved accessibility requirements to every safety surface as a baseline and treat them as necessary but unproven for this context. | Accessibility review with CBD-75 | Copy approval for `SG-93-003`, `SG-93-048`, `SG-93-055`, `SG-93-094` |
| EG-93-004 | Which content classes qualify as sensitive, whether user-declared sensitivity is workable in a shared space at all, and the residual that a person may not recognize a label as sensitive until after they have written it. | Apply §7.2 rules 1–5 to every in-scope class uniformly rather than attempting to identify sensitive subsets. | `EG-93-001` advocacy input with the accountable privacy decision-maker | Closure of `EG-91-014` |
| EG-93-005 | No user research exists, and no person with lived experience of financial abuse has reviewed this catalog. Every statement about what a subject would want, need, or do is an unvalidated product assumption. | Label assumptions as assumptions throughout. Do not cite this document as evidence that a safeguard meets a real need. | Product research with advocacy partners | Any claim that CBD-93 validates safety outcomes |
| EG-93-006 | Whether systematic-observation detection (`SG-93-017`) is an acceptable privacy trade, and what retention, access control, and review it would require. Detecting surveillance requires observing reads. | Do not build read-side behavioral monitoring until the trade is decided. Aggregate, restricted-boundary detection only, never exposed to a budget-space role. | Accountable security and privacy decision-makers with CBD-92/CBD-94 | `SG-93-017`; audit coverage under `EG-91-018` |
| EG-93-007 | Whether a member objection right at deletion (`SG-93-056`) is compatible with the one-Primary lifecycle, and what happens when members object and the Primary Owner insists. An unresolvable standoff is worse than the current asymmetry. | Keep the approved §6.4 behavior. Raise the asymmetry as a CBD-12 decision rather than assuming an objection right is the answer. | CBD-12 with the Product Owner | `SG-93-056`; `RI-93-006` |
| EG-93-008 | Whether any notice, consent, or rights framework applies to non-user third parties named in imported transactions, and what a workable one would look like given that CoBudget has no relationship with them. | Minimize: no enrichment, no correlation, no analytics on counterparty names. Make no claim that third-party interests are addressed. | Legal and privacy counsel with `EG-93-002` | Closure of the `AB-93-020` residual |
| EG-93-009 | Scope, authority, staffing, and timeline of the platform safety process that CBD-72 §5.6 item 9 depends on for harassment, unlawful content, and accidental disclosure. | Treat comments as unshippable until the process exists. Do not rely on budget-space role permissions to address abuse in shared content. | Operational owner with `EG-91-009` | `SG-93-037`, `SG-93-038`; comment feature readiness |
| EG-93-010 | Whether a person can retire a compromised notification channel without losing account recovery, given that the same channels frequently serve both purposes. | Keep notification destinations separate from identity and recovery factors. `DI-91-029` already forbids reusing an SMS number as an authentication factor without a separate approved decision. | CBD-12 alert work with `EG-91-004` identity design | `SG-93-031`, `SG-93-033`; `RI-93-013` |

## 9. Accepted residuals

### 9.1 What an accepted residual means here

An accepted residual is a harm that follows from an approved decision and that
cannot be removed without reopening that decision. Recording one is not approval
of the harm. It is a refusal to claim a mitigation that does not exist, so that
CBD-94 rates a real risk rather than a paper one and the Product Owner can
reopen the underlying decision with full information if they choose.

### 9.2 Inactive-owner archival eligibility disclosure

CBD-91 §7.3 clause 8 recorded this residual and referred its coercion and
surveillance cases here by name. The disposition is as follows.

**What is bounded.** `SG-93-041` through `SG-93-045` implement CBD-91 §7.3 and
§4 rule 10: no pre-request indicator, coarse `eligible_since` storage with no
persisted last-activity timestamp, a uniform and timing-equalized refusal, a
per-requester rate limit, an audit record for every attempt including ineligible
ones, notice content that names no date or interval, and cancellation through any
authenticated interaction rather than a separate objection ceremony. Together
these prevent the threshold from being polled into a behavioural timeline.

**What remains.** Three things, none of which the bounding above reaches.

1. Once a request is made, every active member learns that the Primary Owner was
   inactive for at least the threshold period (`AB-93-056`). The interval is
   inherent to the notification OD-72-01 requires.
2. The advance notice to the subject and the per-attempt notices are
   unsuppressible by design, and on a monitored channel they hand an observer a
   countdown and a confirmation of absence (`AB-93-057`).
3. Because any authenticated Primary Owner activity cancels the request, the
   objection mechanism compels a subject who deliberately disengaged to
   re-authenticate into a monitored account or lose the space (`AB-93-058`).

**Why it is accepted rather than mitigated.** Each item is the direct consequence
of a control that exists to prevent something worse. Removing the member
notification would allow a budget space to be archived out from under an absent
owner without telling anyone. Removing the advance and per-attempt notices would
make observation of a person covert, which CBD-91 §4 rule 10 exists to forbid.
Removing the cancellation-on-activity rule would strip the absent owner's only
defence. The product cannot distinguish an owner who is unreachable from an owner
who is hiding, and every control that protects the first harms the second.

**Who bears it.** A Primary Owner who has disengaged from a budget space shared
with someone dangerous, and whose contact channels that person can still reach.
This is precisely the population this analysis exists to protect, which is why
the residual is stated at this length rather than as a table row.

**What would change it.** `EG-93-001` — advocacy and legal review of whether
mandatory notice is the right default here — and `SG-93-033`, a designated safety
channel for lifecycle notices about oneself. Neither is decided. Until then the
approved behavior stands and this residual is real.

### 9.3 Residual register

Twelve §4 rows carry the **Accepted residual** status and map to the eleven
entries below; `AB-93-028` and `AB-93-056` are two faces of the same residual
and share the last row.

| Residual | Scenarios | Approved decision it follows from | Why it cannot be designed away here |
| --- | --- | --- | --- |
| Comprehensive Partner visibility includes merchant and payee display names | `AB-93-017` | CBD-72 §5.3 fixed field boundary | Narrowing it defeats the role's stated purpose; a narrower role is `RI-93-001`, not a fix to this one |
| Non-user third parties appear in shared financial records | `AB-93-020` | Imported transaction provenance, `DI-91-015` | CoBudget has no relationship with them; consent mechanisms cannot reach them by construction (`EG-93-008`) |
| Legible budget indicators become argument exhibits | `AB-93-036` | `DI-91-031` derived data; CBD-12 accountability purpose | Making budget state illegible defeats the product |
| Downloaded copies are permanent | `AB-93-050` | `DI-91-050`; CBD-91 §4 rule 7 | Custody transfers on download; the honest response is disclosure (`SG-93-057`, `SG-93-091`), not a false assurance |
| Orphaned-connection reason discloses permanent unavailability | `AB-93-059` | OD-72-04; `DI-91-056` | Members cannot otherwise understand why data stopped or that a new connection is the only remedy |
| Departing authorizer permanently ends a connection | `AB-93-045` | OD-72-04; PM-72-011 | Anti-inheritance is the point; allowing adoption would let someone inherit another person's provider authorization |
| Withheld reports and split-activity records imply hidden inputs | `AB-93-060` | CBD-72 §5.1 items 9–10 | The alternative is a misleading partial report, which is worse |
| Cross-space correlation by a person entitled to both views | `AB-93-063` | PM-72-010 scope | No server-side control prevents a person from remembering |
| Concentrated administrative history in the Primary Owner | `AB-93-067` | CBD-72 §5.7 item 1 | The package's purpose is relationship history; `RI-93-007` gives the subject their own record rather than narrowing this one |
| Support-mediated recovery is refused, leaving a shut-out member with no path | `AB-93-047` | CBD-72 §6.3; `EG-91-009` | Any recovery path an abuser could also use is worse than none; the honest disclosure is `SG-93-086` |
| Mandatory lifecycle notice reaches a monitored channel, and the inactive-owner archival request discloses the Primary Owner's absence | `AB-93-028`, `AB-93-056`; §9.2 also covers the modelled cases `AB-93-057` and `AB-93-058` | OD-72-01; CBD-72 §6.3; CBD-91 §7.3 clause 8 | See §9.2 |

## 10. Non-escalation check

The third CBD-93 acceptance criterion requires that no safeguard grant another
user money movement, spending approval, transaction blocking, external-account
control, or user lockout. All 94 safeguards were checked against each
prohibition.

| Prohibited capability | Result | Basis |
| --- | --- | --- |
| Money movement | No safeguard grants it | CoBudget moves no money in the Private MVP. No safeguard in §6 creates, requests, or authorizes a transfer, and none introduces a payment surface. |
| Spending approval | No safeguard grants it | No safeguard makes one member's action conditional on another member's approval of a purchase. `SG-93-004`, `SG-93-051`, and `SG-93-056` add reversal windows, export offers, and a proposed objection position around **administrative** actions only. |
| Transaction blocking | No safeguard grants it | No safeguard prevents, delays, reverses, or flags an external transaction. `SG-93-040` and `SG-93-050` add attribution and annotation to records already created; PM-72-009 keeps bank-provided fields immutable to every role. |
| External-account control | No safeguard grants it | `SG-93-012` and `SG-93-059` operate only on the CoBudget connection record and its label. `SG-93-069` narrows a status allowlist. No safeguard reaches a provider account, and none permits adoption or reauthorization of another person's connection, which OD-72-04 forbids. |
| User lockout | No safeguard grants it | Checked individually against the four safeguards that could be read as approaching it, below. |

The four safeguards that required individual scrutiny:

| Safeguard | Why it was checked | Determination |
| --- | --- | --- |
| `SG-93-001`, `SG-93-020` — end a specific observer's access to your own data without leaving | Removes someone's read access | Not lockout. CBD-12 prohibits locking an **Owner out of a budget space**. These end one person's view of another person's data; they remove nobody's membership, account, or access to their own space. Raised as `RI-93-002` for CBD-12 to decide, not asserted here. |
| `SG-93-037`, `SG-93-050` — remedy for the subject of another author's comment | Touches CBD-72 §5.6 item 4, which denies every role authority to moderate another author's contribution | Not asserted as a decision. §5.6 item 4 stands. Raised as `RI-93-008`. The minimum proposed — report to platform, detach from one's own attributed record — does not edit, hide, or delete another author's content. |
| `SG-93-056` — member position in the deletion window | Constrains a Primary Owner's protected action | Not lockout. The Primary Owner retains their account, their membership, their ownership, and the space. Raised as `RI-93-006` with the standoff problem recorded as `EG-93-007`; not asserted. |
| `SG-93-074` — block invitations from a specific individual | Prevents one person from reaching another | Not lockout. It prevents unsolicited contact with a person who is not a member of the inviter's space. It removes no existing access and touches no budget space either person belongs to. |

Three safeguards widen a read audience and were checked for scope expansion:
`SG-93-051` and `SG-93-052` offer a departing member an export **bounded by the
scope they already held**, `SG-93-081` gives a person the administrative record
**about themselves**, and `SG-93-058` notifies members that an export of their
own household data occurred. None returns data the recipient could not already
read, and none widens any allowlist in `DI-91-034`–`DI-91-036`.

## 11. CBD-12 reconciliation inputs

These are inputs to CBD-12, not changes to it. CBD-72's approved decisions
govern until the Product Owner decides otherwise, and this analysis does not
edit the CBD-12/CBD-72 artifacts. Each input names the safeguard it carries and
the scenarios that produced it.

### 11.1 Permissions

| ID | Input | Carries | From |
| --- | --- | --- | --- |
| RI-93-001 | A supportive role narrower than Accountability Partner, or a scoped Partner variant, so a person sharing one part of their finances is not required to expose all of it. Today the only narrower option is Viewer, which removes the ability to contribute. | SG-93-011, SG-93-014 | `AB-93-009`, `AB-93-015`, `AB-93-078` |
| RI-93-002 | A member's ability to end a specific observer's access to their own data without leaving the budget space. Today only Primary Owner and Co-owner may remove a member, so a watched Collaborator has no remedy but departure. | SG-93-001, SG-93-020 | `AB-93-018` |
| RI-93-003 | A reversal window on protected actions that permanently reduce another person's authority or scope, undoable by the acting person alone. | SG-93-004 | `AB-93-002`, `AB-93-003` |
| RI-93-004 | An export offered to a member at removal, bounded by the scope they already held. | SG-93-051, SG-93-052 | `AB-93-039`, `AB-93-047` |
| RI-93-005 | A path for members to obtain their own records across archival. **Decided August 15, 2026: export follows read scope**, bounded by the frozen `DI-91-075` snapshot and available throughout the §6.4 restore window. The original §6.5 item 10 prohibition had no recorded rationale, was absent from the OD-72-05 decision record, was not among the activities §6.5 item 3 enumerates as ended by archival, and ran against RF-72-60's stated intent that members not be left with contributed financial data frozen. Scope is immutable while archived, so the package-invalidation trigger the live rules rely on cannot be needed. **Delivered:** CBD-72 §6.5 items 10–12 and §6.4 item 2 amended under RF-72-61, `LIFE-08` added to the scenario catalog, and CBD-91 v1.0.1 adopted the change across `DI-91-004`, `DI-91-034`–`DI-91-036`, `DI-91-075`, and `DF-91-003`. | SG-93-053 | `AB-93-041`, `AB-93-046` |
| RI-93-006 | A defined member position in the §6.4 deletion window. Deletion destroys every member's records with notice but no objection right, while a §6.3 archival request — which erases nothing — grants a 14-day objection window. The asymmetry runs against the members with the least authority. | SG-93-055, SG-93-056 | `AB-93-042` |
| RI-93-007 | Self-service access to the administrative record about oneself, without holding Primary ownership. | SG-93-081 | `AB-93-070` |
| RI-93-008 | A remedy for a person who is the subject of another author's comment. CBD-72 §5.6 item 4 denies every role the authority to moderate another author's contribution, and §5.6 item 9 routes serious abuse to a platform process that does not yet exist. | SG-93-037, SG-93-050 | `AB-93-034` |

### 11.2 Invitations

| ID | Input | Carries | From |
| --- | --- | --- | --- |
| RI-93-009 | A versioned pre-acceptance disclosure for every role invitation, stating what the accepting person will see and what existing members will see about them. Ownership transfer has one under §6.2 item 2; ordinary invitations do not. | SG-93-005, SG-93-015 | `AB-93-010` |
| RI-93-010 | A per-inviter block and a cross-space invitation rate limit per recipient, so invitations cannot become a re-contact channel. | SG-93-074, SG-93-075 | `AB-93-065`, `AB-93-066` |
| RI-93-011 | The ability to nominate a different notification channel at acceptance time, since the invited channel is verified for control but not for sole control. | SG-93-007, SG-93-029 | `AB-93-004`, `AB-93-025` |

### 11.3 Alerts and notifications

| ID | Input | Carries | From |
| --- | --- | --- | --- |
| RI-93-012 | A designated safety channel for lifecycle notices about oneself, distinct from ordinary alert channels. | SG-93-033 | `AB-93-028`, `AB-93-029`, `AB-93-057` |
| RI-93-013 | Channel retirement: a person may remove a compromised channel from all routing without losing the notice, and without losing account recovery. | SG-93-031 | `AB-93-026`, `AB-93-029` |
| RI-93-014 | Reconsidered informational-alert eligibility where an alert describes one identified person's provisional overspend and other members see it before that person can correct it. | SG-93-066 | `AB-93-031` |
| RI-93-015 | Notice content for scope reductions and lifecycle events. Permissions 22 and 25 require notification; what the notice says is undecided under `EG-91-015`, and the difference between “your access changed” and a plain before/after statement is the difference between a transparent change and silent information starvation. | SG-93-013, SG-93-042, SG-93-049 | `AB-93-040`, `AB-93-056` |

### 11.4 Copy and terminology

| ID | Input | Carries | From |
| --- | --- | --- | --- |
| RI-93-016 | The §6.13 cross-cutting copy set, extending CBD-12's existing terminology requirement to consent framing, channel privacy, delivered-copy claims, third-party circumstances, accountability language, and pre-action disclosure of irreversible consequences. | SG-93-089–SG-93-094, plus SG-93-003, SG-93-007, SG-93-009, SG-93-021, SG-93-024, SG-93-025, SG-93-036, SG-93-039, SG-93-048, SG-93-055, SG-93-059, SG-93-060, SG-93-062, SG-93-071 | Throughout §4 |

### 11.5 Recovery and lifecycle

| ID | Input | Carries | From |
| --- | --- | --- | --- |
| RI-93-017 | Support-mediated ownership transfer stays refused as a **product rule** that denies the action rather than a staff policy, paired with a documented honest response for a person who reports being shut out by another member. The refusal is correct; leaving the person without an answer is not. | SG-93-085, SG-93-086 | `AB-93-047`, `AB-93-072` |
| RI-93-018 | The interaction between personal-account deletion and attributed content: what a departing person can make disappear, and what stays attributed to them. `EG-91-002` leaves this unresolved and it determines whether leaving is a real remedy. | SG-93-052, SG-93-063 | `AB-93-052` |

## 12. Traceability

| Source | Controlling input used by this analysis | Coverage |
| --- | --- | --- |
| CBD-91 v1.0.1 / `docs/cbd-91-private-mvp-data-inventory.md` | Data classes, sensitivity, audience, prohibited disclosure, lifecycle, noninterference and copy rules §4, evidence gaps §6, and the §7.3 inactive-owner policy with its clause 8 referral | `DI-91-001`–`DI-91-076` cited throughout §4; §7.3 disposed in §9.2; `EG-91-014` disposed in §7.2 |
| CBD-12 / CBD-72 approved specification | Five roles, one-active-role and one-Primary invariants, lifecycle states, Viewer hierarchy, Partner boundary, personal notification boundary, three-record alert model, destructive-resource contract, comments lifecycle, export allowlists, ownership/recovery/archival/deletion, cross-budget isolation, audit inventory, and the six closed open decisions | §3 coverage map; every §4 row's governing input; §11 reconciliation inputs |
| CBD-12 Jira description | Role definitions, prohibited capabilities, terminology requirements, and the MVP boundary register classifying coercive monitoring and cross-budget disclosure as Prohibited | §2.1 postures; §10 non-escalation check; `SG-93-093` |
| CBD-92 (in progress, parallel) | Technical trust-boundary and STRIDE modeling over the same `DI-91` classes and `DF-91` flows | Deliberately not duplicated here; §1 states the division. Enforcement-side safeguards `SG-93-016`, `SG-93-061`, `SG-93-067`, `SG-93-068` are stated as requirements and route to CBD-92/CBD-94 for design |
| CBD-94 (blocked on this) | Risk prioritization, mitigation catalog, and verification | This document supplies unrated scenarios, harms, safeguards, residuals, and gaps. It deliberately assigns no likelihood or severity |
| `docs/cbd-72-authorization-scenario-catalog.md` | Scenario-family prefixes used as the verification route in §6 | ROLE, VIEW, PART, COLL, OWN, CONN, XSP, AUTH, CAT, REC, DATE, VIS, EXP, REP, MEM, SET, ALERT, MAN, INT, AUD, LIFE |
| CBD-73, CBD-74, CBD-75, CBD-76 | Invitation/consent flows, alert boundaries, terminology and copy, and the MVP boundary register | `RI-93-009`–`RI-93-011` to CBD-73; `RI-93-012`–`RI-93-015` to CBD-74; `RI-93-016` to CBD-75 |

## 13. Acceptance-criteria check

“Satisfied” below means the required structure is present and complete in this
draft. It does not mean the analysis has been reviewed, that a safeguard is
approved, or that any evidence gap is closed.

| CBD-93 criterion | Evidence | Status |
| --- | --- | --- |
| Every CBD-12 role and lifecycle state is represented in normal and adversarial scenarios | §3.1 maps all five roles plus invite recipient, former member, support/operations actor, connection authorizer, and non-user third party to at least one normal and one adversarial scenario. §3.2 maps 20 lifecycle states, including every membership state, Viewer profile state, ownership transition, connection-authorizer state, and budget-space lifecycle state | Satisfied structurally. Three lifecycle states — the inactivity threshold, permanent connection orphaning, and personal-account deletion — carry adversarial scenarios only. The first two have no normal-use form; the third is unresolved under `EG-91-002`. This is marked in §3.2 rather than padded with invented cases |
| Scenarios cover both direct disclosure and inference through metadata, aggregates, previews, or timing | §3.3 indexes every scenario by channel across four direct and five inference channels. §4.7 is dedicated to inference and holds `AB-93-055`–`AB-93-062` | Satisfied |
| Safeguards do not grant money movement, spending approval, transaction blocking, external-account control, or user lockout | §10 checks all 94 safeguards against each prohibition, scrutinizes the four that approach user lockout individually, and confirms that the three audience-widening safeguards return only data the recipient could already read | Satisfied |
| Unresolved legal, accessibility, privacy, and research questions are labelled without unsupported validation claims | §8 records `EG-93-001`–`EG-93-010` covering advocacy, legal, accessibility, sensitive-content scope, absent user research, read-side monitoring, the deletion-objection standoff, third-party rights, the platform safety process, and channel retirement. §1.1 states plainly that no survivor has reviewed this work | Satisfied. `EG-93-005` is load-bearing: no claim in this document is validated by research |
| Findings are testable or assigned a concrete review/evidence gate | Every §6 safeguard carries a Verification route — a CBD-72 scenario family for testable behavior, `Input to CBD-12` where it would constrain an approved permission, or a named review gate. Sixteen safeguards route to CBD-12 rather than asserting a decision; `SG-93-053` was decided during review and now routes to a test | Satisfied |

| Deliverable | Location |
| --- | --- |
| Stable-ID abuse/coercion/privacy scenario catalog | §4, `AB-93-001`–`AB-93-082` |
| Harm and affected-user analysis | §5, `HC-93-01`–`HC-93-10` and §5.2 |
| Required safeguards and evidence gaps | §6, `SG-93-001`–`SG-93-094`; §8, `EG-93-001`–`EG-93-010` |
| CBD-12 reconciliation inputs for permissions, invitations, alerts, copy, and recovery | §11, `RI-93-001`–`RI-93-018` across all five named areas |

| Readiness question | Current disposition |
| --- | --- |
| Is this catalog approved? | No. It is a draft and has received no review of any kind. |
| May CBD-94 risk prioritization begin? | Yes, on the understanding that scenarios are unrated by design and that eleven residuals in §9.3 are real rather than mitigated. |
| Are the safeguards approved product decisions? | Almost none. `SG-93-053` was decided by the Product Owner during review and is carried by a separate CBD-72 amendment. Sixteen others would constrain an approved CBD-12/CBD-72 permission and are raised in §11 as inputs. The rest are requirements pending review. |
| Is `EG-91-014` closed? | No. §7.2 produces the handling requirement CBD-91 asked for; closure additionally needs `EG-93-001`–`EG-93-004`. |
| Is the `DI-91-076` residual resolved? | No. §9.2 bounds it and states what remains. Resolution needs `EG-93-001`. |
| Does this document validate CoBudget's safety for people experiencing financial abuse? | No, and it must not be cited as though it does. `EG-93-005` records that no research and no lived-experience review exist. |

## 14. Review evidence, limitations, and revision history

This draft was produced at repository baseline `5336b67` by reading
`docs/cbd-91-private-mvp-data-inventory.md` v1.0,
`docs/cbd-72-collaboration-permission-model.md`,
`docs/cbd-72-authorization-scenario-catalog.md`, and the live Jira descriptions,
statuses, links, and comments for CBD-12, CBD-14, CBD-91, CBD-92, and CBD-93 on
August 15, 2026. Where this document states what an approved decision says, that
statement was checked against the current text rather than recalled.

It was then rebaselined to `14d6b64`, which carries the two amendments this
analysis produced: CBD-72 0.1.52 under RF-72-61, and CBD-91 v1.0.1 adopting it.
No scenario, harm, safeguard, gap, or residual changed as a result other than
`AB-93-041`, `SG-93-053`, and `RI-93-005`, which are the rows that raised it.

Known limitations:

* No independent safety, privacy, legal, accessibility, or data-governance review
  has occurred, and no person with lived experience of financial abuse has read
  this catalog (`EG-93-005`).
* The application does not exist. Every scenario reasons from approved
  specifications, so a case that depends on implementation behavior — timing,
  cache latency, client purge, provider and carrier conduct — is stated as a
  requirement against an open gap rather than as an observed behavior.
* Risk is deliberately unrated. Any ranking implied by section order or scenario
  count is an artifact of organization, not an assessment.
* CBD-92 is in progress in parallel. Where a safeguard depends on enforcement
  architecture, it is stated as a requirement and routed rather than designed.
* The scenario set is not claimed to be exhaustive. It is claimed to cover every
  role, lifecycle state, and disclosure channel identified in §3, which is a
  weaker and checkable claim.

| Version | Date | Author | Change | Approval |
| --- | --- | --- | --- | --- |
| 0.1.2 | August 15, 2026 | Claude with Alexander Wohlford as Product Owner | Rebaselined from `5336b67` to `14d6b64` after the two amendments this analysis produced were merged: CBD-72 0.1.52 under RF-72-61, and CBD-91 v1.0.1 adopting it. `AB-93-041`, `SG-93-053`, and `RI-93-005` no longer describe the amendments as pending and now cite the delivered rules; `SG-93-053` verifies against `LIFE-08` in the CBD-72 scenario catalog. Source references updated from CBD-91 v1.0 to v1.0.1. The 0.1.1 entry below is retained as written and records what was true at that revision. No scenario, harm, safeguard, evidence gap, or residual changed. | Editorial rebaseline; no new decision |
| 0.1.1 | August 15, 2026 | Claude with Alexander Wohlford as Product Owner | Recorded the Product Owner decision on `RI-93-005`: **export follows read scope from an archived budget space**, bounded by the frozen `DI-91-075` snapshot and available throughout the §6.4 restore window. The original §6.5 item 10 prohibition had no recorded rationale, was absent from the OD-72-05 decision record, was not among the activities §6.5 item 3 enumerates as ended by archival, and ran against RF-72-60's stated intent that members not be left with contributed financial data frozen. `AB-93-041` is retained with its original exposure under a new **Closed by decision** status defined in §2.5; `SG-93-053` now routes to a test rather than to CBD-12. Corrected the §9.3 register to account for `AB-93-028`, which carried the Accepted-residual status without a register entry. The CBD-72 §6.5 amendment carrying this decision is a separate change; `DI-91-034`–`DI-91-036` in CBD-91 v1.0 still state the superseded prohibition and need a follow-up amendment under change control. | Product Owner approved the archived-export decision; document otherwise draft |
| 0.1.0 | August 15, 2026 | Claude with Alexander Wohlford as Product Owner | Initial analysis: actor postures, harm classes, role and lifecycle coverage map, 82-scenario abuse/coercion/privacy catalog, harm and affected-user analysis, 94 safeguards across five classes, §7.2 disposition of `EG-91-014`, ten evidence gaps, eleven accepted residuals including the §9.2 `DI-91-076` disposition referred by CBD-91 §7.3 clause 8, non-escalation check, and eighteen CBD-12 reconciliation inputs. | Draft; review required |
