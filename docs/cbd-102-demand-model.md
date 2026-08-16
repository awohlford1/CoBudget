# CBD-102 — Private MVP Demand Model

| Field | Value |
| --- | --- |
| Status | **Draft — not approved.** Planning assumptions for provider sizing and cost comparison. Not a forecast, a commitment, or a capacity guarantee. |
| Document version | 0.1.0 |
| Owner | Alexander Wohlford |
| Reviewer | Pending Product Owner review |
| Jira | [CBD-102](https://cobudget.atlassian.net/browse/CBD-102) |
| Parent | [CBD-15](https://cobudget.atlassian.net/browse/CBD-15) — Select initial managed providers |
| Companions | [Hard-Gate Catalog](cbd-102-provider-requirements-hard-gate-catalog.md) v0.1.0; [Evaluation Rubric](cbd-102-provider-evaluation-rubric.md) v0.1.0 |
| Repository baseline | `c061a5b` |
| Last updated | August 16, 2026 |

## 1. Purpose

This model supplies the quantities that CBD-103–107 need in order to price and
size a provider, and to judge whether a plan tier fits. It answers one question:
**how much of each billable thing does Private MVP consume?**

It has three consumers:

1. **The cost template**, which needs a quantity for each category's billable
   unit before any price can be compared.
2. **The rubric**, where `WR-102-019` scores support targets on "a plan within
   the base demand tier" and cannot be scored until that tier is defined.
3. **CBD-94's rate-ceiling work**, where `PR-94-002` requires a *capacity basis*
   for each `RL-92-001` bounded surface. This model supplies that basis. It does
   **not** supply the ceilings themselves, which remain `RL-92-007` and
   `ME-94-010` work.

## 2. What these numbers are, and are not

CoBudget has no users. Every figure below is **judgment**, not measurement.
There is no telemetry to derive them from — and under `AN-92-001` there will not
be product analytics to derive them from later either, so this model will be
corrected by operational reality rather than by a behavioural dataset.

Three rules keep that honest:

* **Every assumption states its basis.** A figure derived from another figure
  shows the arithmetic. A figure resting on judgment says so.
* **Confidence is recorded per assumption**, using the CBD-92 §2.3 scale
  (High / Medium / Low), so that a load-bearing guess is visible as a guess.
* **The High scenario is headroom, not a forecast.** It is the level Private MVP
  must not fall over at, used to check that a plan tier has room. Treating it as
  a growth projection would overbuy every category.

Where a figure is rounded, it is rounded **up**, because the cost of undersizing
a provider mid-evaluation is higher than the cost of a slightly generous plan.

## 3. Scenarios

| Scenario | Represents | Use |
| --- | --- | --- |
| **Low** | Earliest private testing: the operator plus a few friendly households. | Confirms a provider is usable at near-zero volume without a minimum that dominates cost. |
| **Base** | The Private MVP planning target. | **The tier used for cost comparison and for `WR-102-019`.** |
| **High** | Headroom ceiling for Private MVP — the point at which the phase would end and a re-evaluation would be due. | Confirms a plan tier has room, and identifies which driver breaks first. |

## 4. Population

| ID | Driver | Unit | Low | Base | High | Basis | Conf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DM-102-001 | Budget spaces | spaces | 5 | 25 | 100 | Judgment. A space is one household under CBD-72; Private MVP is invite-only. | Low |
| DM-102-002 | Members per space | memberships/space | 2.0 | 2.4 | 2.6 | Judgment from the CBD-72 role model: one Primary Owner (`PM-72-008`) plus typically one Co-owner or Collaborator, occasionally a Viewer or Accountability Partner. | Medium |
| DM-102-003 | Total memberships | memberships | 10 | 60 | 260 | `DM-102-001 × DM-102-002`. | Low |
| DM-102-004 | Memberships per subject | memberships/subject | 1.0 | 1.2 | 1.3 | Judgment. Most people belong to one household; a minority also appear in a second space, which CBD-72 §7 treats as ordinary. | Medium |
| DM-102-005 | Account subjects | subjects | 10 | 50 | 200 | `DM-102-003 ÷ DM-102-004`. Each subject has exactly one financial profile under `CA-92-012`. | Low |
| DM-102-006 | Contributing share | fraction of subjects | 0.80 | 0.75 | 0.75 | Only Primary Owner, Co-owner, and Collaborator may authorize a connection under CBD-72 permission 31; Viewers and Accountability Partners cannot. | Medium |
| DM-102-007 | Contributing subjects | subjects | 8 | 38 | 150 | `DM-102-005 × DM-102-006`, rounded up. | Low |
| DM-102-008 | Weekly active share | fraction of subjects | 0.70 | 0.60 | 0.60 | Judgment. Budgeting is a weekly-to-monthly habit, and the CBD-71 cadence model assumes periodic rather than daily engagement. | Low |

## 5. Financial connectivity

| ID | Driver | Unit | Low | Base | High | Basis | Conf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DM-102-009 | Connections per contributing subject | connections | 1.0 | 1.6 | 2.5 | Judgment. `CA-92-012` permits many connections per profile, each with exactly one authorizer; a person typically links a primary bank and a card issuer at a different institution. | Medium |
| DM-102-010 | Provider connections | connections | 8 | 61 | 375 | `DM-102-007 × DM-102-009`, rounded up. **This is the billable unit for CBD-107.** | Low |
| DM-102-011 | Provider accounts per connection | accounts | 1.5 | 2.2 | 3.0 | Judgment. One connection may contribute observations for several provider accounts under `CA-92-012` — commonly a checking and a savings account at one institution. | Medium |
| DM-102-012 | Connected provider accounts | accounts | 12 | 135 | 1,125 | `DM-102-010 × DM-102-011`, rounded up. | Low |
| DM-102-013 | Transactions per account per month | transactions | 25 | 40 | 60 | Judgment blended across account types: a primary checking or card account runs high, a savings account runs near zero. | Medium |
| DM-102-014 | Imported transactions per month | transactions | 300 | 5,400 | 67,500 | `DM-102-012 × DM-102-013`. | Low |
| DM-102-015 | Source observations per transaction | observations | 1.0 | 1.1 | 1.3 | `DI-91-068` requires each independently authorized connection to retain a distinct observation, so a jointly held account observed by two connections produces two. | Medium |
| DM-102-016 | Provider webhooks per connection per day | events | 2 | 3 | 6 | Judgment. Providers batch account updates rather than emitting one event per transaction. | Low |
| DM-102-017 | Provider webhooks per month | events | 480 | 5,490 | 67,500 | `DM-102-010 × DM-102-016 × 30`. | Low |

## 6. Workload

| ID | Driver | Unit | Low | Base | High | Basis | Conf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DM-102-018 | Scheduled reconciliation runs per month | jobs | 240 | 1,830 | 11,250 | `DM-102-010 × 30`. The architecture synchronization flow requires scheduled reconciliation to recover missed webhooks. | Medium |
| DM-102-019 | Synchronization jobs per month | jobs | 720 | 7,320 | 78,750 | `DM-102-017 + DM-102-018`. | Low |
| DM-102-020 | Downstream jobs per sync job | jobs | 3 | 3 | 3 | The architecture flow fans out to recalculation, alert evaluation, and delivery. Each is a distinct `SA-92-*` purpose — `SA-92-003`, `SA-92-005`, and delivery under recipient authority. | Medium |
| DM-102-021 | Background jobs per month | jobs | 2,880 | 29,280 | 315,000 | `DM-102-019 × (1 + DM-102-020)`. **Primary queue-volume figure for CBD-103.** | Low |
| DM-102-022 | Sessions per active subject per week | sessions | 3 | 3 | 4 | Judgment consistent with `DM-102-008`. | Low |
| DM-102-023 | API requests per session | requests | 40 | 40 | 50 | Judgment. Every read is server-authorized under `PM-72-002` and `CL-92-002` forbids a persistent client cache, so an online-only client makes more requests than a cache-backed one would. | Medium |
| DM-102-024 | API requests per month | requests | 3,700 | 15,600 | 104,000 | `DM-102-005 × DM-102-008 × DM-102-022 × DM-102-023 × 4.33`, rounded up. | Low |
| DM-102-025 | Period-generation jobs per month | jobs | 10 | 50 | 200 | `SA-92-002` generates period state per space per boundary; at most a few per space per month under the CBD-71 cadence model. | Medium |

`DM-102-023` deserves emphasis for CBD-103 sizing: the `CL-92-002` prohibition
on persisting customer data client-side means CoBudget cannot trade requests for
a local cache. Request volume is structurally higher than a comparable offline-capable
product, and that is a deliberate approved constraint rather than an
optimization gap.

## 7. Storage

| ID | Driver | Unit | Low | Base | High | Basis | Conf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DM-102-026 | Rows per imported transaction | rows | 4 | 5 | 6 | One normalized record (`DI-91-015`), its source observations (`DI-91-068`), overlays (`DI-91-017`), reconciliation state (`DI-91-018`), and audit history (`DI-91-037`). | Medium |
| DM-102-027 | Stored bytes per transaction cluster | KB | 2 | 3 | 4 | Judgment including indexes and append-only audit rows. | Low |
| DM-102-028 | Transaction storage, year 1 | MB | 8 | 195 | 3,240 | `DM-102-014 × 12 × DM-102-027`, rounded up. Decimal MB, matching how cloud storage is billed. | Low |
| DM-102-029 | Non-transaction application storage | MB | 20 | 150 | 800 | Spaces, memberships, schedules, periods, plans, categories, bills, goals, comments, audit. Judgment; small relative to transactions. | Low |
| DM-102-030 | Total database size, year 1 | GB | 0.1 | 0.4 | 4.1 | `DM-102-028 + DM-102-029`, rounded up. The Low figure is raised to a 0.1 GB floor because no provider meters below it. **Sizing figure for CBD-105.** | Low |
| DM-102-031 | Object storage for export packages | GB | <0.1 | <0.1 | 0.2 | Export packages are short-lived: `DI-91-035` and `DI-91-036` expire within 24 hours and `DI-91-034` has short server retention. Storage is transient, not accumulating. | Medium |
| DM-102-032 | Log and telemetry ingest per month | GB | 0.2 | 1.0 | 8.0 | Constrained by the `AN-92-003` S1 allowlist, which excludes customer content and persistent identifiers, so records are small and structurally bounded. | Low |

## 8. Email and notification

Volumes follow the `EM-92-*` purpose tiers, which are separately opt-in per
category under `EG-91-006` and `NT-92-004`. In-app notification is mandatory for
every eligible recipient and generates **no** external cost.

| ID | Driver | Unit | Low | Base | High | Basis | Conf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DM-102-033 | Invitation emails, year 1 | messages | 13 | 78 | 338 | `DM-102-003 × 1.3` for resend and replacement under CBD-72 permission 24. `EM-92-002` tier. | Medium |
| DM-102-034 | Lifecycle and security emails, year 1 | messages | 25 | 150 | 600 | Recovery, deletion, archival, restore-window and protected-action notices; roughly three per subject per year. `EM-92-003` tier. | Low |
| DM-102-035 | Alert events per space per month | events | 4 | 6 | 8 | Judgment. The MVP catalog is fixed and deduplicated with cooldowns; custom rules are deferred under FF-009. | Low |
| DM-102-036 | Email opt-in share | fraction of recipients | 0.40 | 0.40 | 0.50 | Judgment. Email is opt-in per user and per category; in-app is the default and is mandatory. | Low |
| DM-102-037 | Routine product emails, year 1 | messages | 192 | 1,728 | 12,480 | `DM-102-001 × DM-102-035 × DM-102-002 × DM-102-036 × 12`, rounded up. `EM-92-001` tier, content-free. | Low |
| DM-102-038 | Total emails, year 1 | messages | 230 | 1,956 | 13,418 | `DM-102-033 + DM-102-034 + DM-102-037`. **Billable-unit figure for CBD-106.** | Low |
| DM-102-039 | Peak monthly email | messages | 40 | 250 | 1,600 | Judgment, allowing for an onboarding burst rather than an even spread. ESP plans meter monthly. | Low |

### 8.1 Push and SMS

Added August 16, 2026 with provider category **N**. Both channels are per-user
and per-category opt-in under `NT-92-004`, and both carry only the fixed
`NT-92-001` content-free body, so volume follows the same alert driver as email
with a different opt-in share.

| ID | Driver | Unit | Low | Base | High | Basis | Conf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DM-102-040 | Devices per subject | devices | 1.2 | 1.5 | 2.0 | Judgment. A phone plus, for some, a tablet or second browser install. Each is a separate `DI-91-073` registration. | Medium |
| DM-102-041 | Registered push tokens | tokens | 12 | 75 | 400 | `DM-102-005 × DM-102-040`. Tokens rotate and are reissued, so this is a live count rather than a cumulative one. | Low |
| DM-102-042 | Push opt-in share | fraction of recipients | 0.30 | 0.35 | 0.45 | Judgment. Lower than in-app, which is mandatory, and higher than SMS, which costs the recipient nothing but feels more intrusive. | Low |
| DM-102-043 | SMS opt-in share | fraction of recipients | 0.05 | 0.10 | 0.15 | Judgment. SMS is the least-adopted channel: it carries the same content-free body as push with more intrusion and, in `EG-91-024` terms, the worst custody properties. | Low |
| DM-102-044 | Push messages, year 1 | messages | 144 | 1,512 | 11,232 | `DM-102-001 × DM-102-035 × DM-102-002 × DM-102-042 × 12`. | Low |
| DM-102-045 | SMS messages, year 1 | messages | 24 | 432 | 3,744 | `DM-102-001 × DM-102-035 × DM-102-002 × DM-102-043 × 12`. | Low |
| DM-102-046 | Peak monthly push | messages | 20 | 200 | 1,400 | Judgment over `DM-102-044`, allowing an onboarding burst. | Low |
| DM-102-047 | Peak monthly SMS | messages | 5 | 60 | 500 | Judgment over `DM-102-045`, allowing an onboarding burst. | Low |

**SMS is billed per segment, not per message, and per destination country.** The
`NT-92-001` fixed body is short enough to fit one segment in most encodings, but
a localized equivalent may not — a body that tips into a second segment doubles
the line. `DM-102-045` counts messages; the cost template must convert to
segments using the approved template's actual length, and record the
destination countries in scope.

## 9. Category sizing summary

The figure each provider category is actually priced on.

| Category | Billable unit | Low | Base | High | Source |
| --- | --- | --- | --- | --- | --- |
| **H** hosting/runtime | API requests/month | 3,700 | 15,600 | 104,000 | `DM-102-024` |
| **H** jobs | Background jobs/month | 2,880 | 29,280 | 315,000 | `DM-102-021` |
| **H** telemetry | Log ingest GB/month | 0.2 | 1.0 | 8.0 | `DM-102-032` |
| **I** identity | Monthly active users | 7 | 30 | 120 | `DM-102-005 × DM-102-008` |
| **D** PostgreSQL | Database GB | 0.1 | 0.4 | 4.1 | `DM-102-030` |
| **E** email | Messages/month, peak | 40 | 250 | 1,600 | `DM-102-039` |
| **F** financial | Connections/month | 8 | 61 | 375 | `DM-102-010` |
| **N** push | Messages/month, peak | 20 | 200 | 1,400 | `DM-102-046` |
| **N** SMS | Messages/month, peak | 5 | 60 | 500 | `DM-102-047` (convert to segments) |

### 9.1 The finding that matters most for cost

**At every scenario including High, Private MVP sits below the entry tier of
essentially every managed provider in every category.** Base is 30 monthly
active users, a sub-gigabyte database, 250 emails in the peak month, and 61
financial connections.

The consequence for CBD-103–107 is direct: **cost will be dominated by plan
minimums, platform fees, and per-seat floors — not by usage.** A per-unit price
comparison is close to meaningless at this scale. The cost template must
therefore lead with the minimum monthly commitment and the cheapest tier that
clears the hard gates, and treat variable usage as a secondary term.

This also inverts a common assumption about the High scenario. High is not where
cost becomes painful; the categories that hurt at High are the ones metered per
connection or per active user — `DM-102-010` and identity MAU — because those
scale linearly with people rather than sitting inside a flat tier.

## 10. Sensitivity

Which assumption moves the answer most, and what to watch.

| Rank | Assumption | Why it dominates | What would invalidate it |
| --- | --- | --- | --- |
| 1 | `DM-102-010` connections | The only unit metered per-item in most financial-provider pricing, so it scales linearly with no flat tier to absorb it. Also drives webhooks, sync jobs, and most transaction volume. | Real linking behaviour differing from 1.6 connections per contributor; a provider pricing per account rather than per connection. |
| 2 | `DM-102-001` spaces and `DM-102-005` subjects | Drive identity MAU, email, and request volume together. Everything downstream is proportional. | Private MVP being materially larger or smaller than 25 spaces. |
| 3 | `DM-102-013` transactions per account | Drives storage, job volume, and recalculation cost. | Users linking high-volume business accounts rather than personal ones. |
| 4 | `DM-102-020` downstream job fan-out | Multiplies queue volume fourfold; the largest single multiplier in the model. | An implementation that batches recalculation across a space rather than per sync. |
| 5 | `DM-102-036` email opt-in share | Only affects a category already far below any plan floor. | Little would change the conclusion; email cost is floor-dominated at every scenario. |

Ranks 1 and 4 are the two worth measuring first once real traffic exists.

## 11. Open items

| ID | Item | Effect |
| --- | --- | --- |
| OI-102-009 | Every figure is judgment; confidence is `Low` on most totals because they compound several `Medium` inputs. No measurement exists or will exist pre-launch. | The model is fit for choosing a plan tier and comparing providers. It is **not** fit for a capacity commitment, an SLO, or a rate ceiling stated as a hard number. |
| OI-102-010 | `DM-102-020` assumes fan-out of three downstream jobs per sync. The actual number depends on an implementation that does not exist yet. | Largest multiplier in the model. Confirm against the CBD-103 runtime design before treating `DM-102-021` as a sizing commitment. |
| OI-102-011 | **Resolved August 16, 2026.** Push and SMS are modelled in §8.1 following the category **N** decision. | Closed. One dependency remains: `DM-102-045` counts SMS messages, and converting to billable segments requires the approved localized template text, which `EG-91-006` and `EG-91-024` still own. |
| OI-102-012 | The model assumes a single deployment region. `HG-102-011` gates region selection but no approved source fixes how many regions Private MVP runs in. | Multi-region would multiply hosting and database figures. Confirm single-region before CBD-103 pricing. |
| OI-102-013 | `PR-94-002` requires a capacity basis per `RL-92-001` surface. §9 supplies aggregate volumes, not per-surface ones. | CBD-94 must decompose these totals per entry point before setting ceilings. This model does not do that decomposition. |
