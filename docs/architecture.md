# CoBudget technical architecture

> **Authority.** This is a planning note, not a design record. Where it touches
> anything CBD-92 has decided, the fifty normative `CL/PA/NT/EM/OP/AN/RL-92-*`
> contracts control and this document only points at them. The twelve
> `RF-92-001`–`RF-92-012` architecture decisions are open: nothing here resolves
> one, and naming a technology below does not select it.

## Direction

Begin with a TypeScript modular monolith backed by PostgreSQL. Deploy the API
and background workers separately, but keep the business modules in one
codebase. Split services only when measured scale or team ownership justifies
the operational cost.

## Proposed stack

Two tables, because the single table this replaced hid the distinction that
matters. `CR-91-006` and CBD-15 hold that every provider name is a hypothesis
until selection evidence exists. The application frameworks are no longer
hypotheses; they are in the repository and running.

### Implemented in this repository

| Layer | Choice | Where |
| --- | --- | --- |
| Web | Next.js, React, TypeScript, PWA support | `apps/web` |
| API | NestJS with Fastify and OpenAPI | `apps/api` |
| Background work | Dedicated worker process | `apps/worker` |

### Hypothesis, pending selection

None of these is chosen. Each name records the shape of the requirement rather
than a decision, and each sits behind a selection gate.

| Layer | Working hypothesis | Selection gate |
| --- | --- | --- |
| Data | Managed PostgreSQL with a typed SQL layer | CBD-19; `RF-92-002` |
| Identity | Managed identity provider with MFA/passkeys | CBD-21, CBD-103; `RF-92-002`, `RF-92-007` |
| Financial data | Provider adapter, with Plaid as an illustrative first implementation rather than a selection | CBD-15, CBD-104; `RF-92-007` |
| Email | Purpose-tiered provider under `EM-92-*` | CBD-106; `RF-92-009` |
| SMS | Provider under `NT-92-*` | CBD-130; `RF-92-009` |
| Push | Web Push to an installed PWA. Private MVP has no native application, so there is no push provider to select | CBD-130 `PN-130-003` |
| Mobile | Expo and React Native in a later phase | Deferred by the product plan |
| Jobs | Durable queues, scheduled reconciliation, dedicated workers | `RF-92-003` |
| Infrastructure | Containerized services, managed cloud resources, Terraform | CBD-105; `RF-92-002` |
| Observability | Structured logs, traces, error reporting, and job-health metrics, all inside the `AN-92-003` content-free allowlist | `RF-92-005` |

Notifications are not a stack choice and are not listed above. In-app is
mandatory for every eligible recipient; email, Web Push, and SMS are opt-in per
user and per supported event or category. Their content ceilings are fixed by
`NT-92-*` and `EM-92-*` and are not an implementation decision.

## Domain modules

- Identity and access
- Budget spaces and memberships
- Financial connections and accounts
- Transactions and categorization
- Budget schedules and generated periods
- Bills and recurring items
- Goals and contributions
- Alert rules and deliveries
- Reporting
- Consent and audit history

## Key data rules

- Store monetary amounts as integer minor units with a currency code.
- Store timestamps in UTC and keep a budget-space timezone for calendar rules.
- Generate concrete budget periods from versioned schedule definitions.
- Preserve historical periods when a user changes a schedule.
- Store provider connections, canonical accounts, and canonical transaction
  source records in the individual account subject's financial profile.
- Expose a canonical account to a budget space only through an explicit,
  versioned account-to-budget assignment. Keep each budget space's
  classification, category, reporting, permission, and assignment history as
  separate overlays without duplicating the canonical account or transaction.
- Authorize every access server-side. Budget-space membership never grants
  authority over another person's provider connection or unrelated
  financial-profile records.
- Treat imported transactions as changeable records because pending items can
  be posted, modified, or removed.
- Encrypt financial-provider tokens separately from ordinary application data.

## Approved CBD-92 contracts

Fifty normative rules in seven families, binding as written in
`docs/cbd-92-system-flow-technical-threat-model.md`. They are summarized here so
that this document cannot be read as silent about them. An architecture decision
that contradicts one is wrong rather than a variation.

| Family | Rules | What it fixes |
| --- | --- | --- |
| `CL-92-*` | 7 | Client and offline behavior: an allowlisted static shell only, no persistent customer-data cache, no offline mutation or queue, and reconnect treated as a fresh authorization boundary |
| `PA-92-*` | 8 | Personal-account deletion and restoration: orphan prevention, immediate authority shutdown, a thirty-day recoverable state, and restoration that returns data without resurrecting prior authority |
| `NT-92-*` | 6 | Push and SMS transport: one fixed content-free body, a generic authenticated destination, a minimum provider payload, send-time eligibility rechecks, and an honest custody boundary |
| `EM-92-*` | 7 | Email content by purpose tier: routine mail content-free, invitation mail identifying only the action class, lifecycle and security mail permitted a deadline, and links that locate but never authorize |
| `OP-92-*` | 8 | Staff access: default-deny with no routine path to customer content, a content-free support surface, a closed exceptional-purpose list, dual approval, and mediated execution without impersonation |
| `AN-92-*` | 7 | Analytics and telemetry: product analytics disabled for Private MVP, no session replay or behavioral capture, a content-free reliability allowlist, and purpose separation between reliability, security, support, and audit |
| `RL-92-*` | 7 | Rate, quota, and resource ceilings: a closed list of bounded surfaces, uniform throttled responses, safe counting keys, and limits that cannot be turned against a legitimate subject |

## Open architecture decisions

Twelve decisions this document does not make, recorded so their absence is
visible rather than mistaken for permission. `RF-92-005` states the trap
outright: the absence of an approved telemetry schema is a prohibition, not a
licence.

| ID | Decision required | Blocks |
| --- | --- | --- |
| `RF-92-001` | A policy evaluation point and a typed, signed decision contract covering subject, tenant, resource, field, purpose, effect, and version, with a version-propagation rule and an invalidation objective | Protected features and worker implementation |
| `RF-92-002` | Deployment topology: network, workload, store, and key boundaries, service identities, region and residency, encryption and KMS, subprocessors, observability evidence | Concrete control validation and launch |
| `RF-92-003` | A per-queue contract for each producer and consumer: schema, authority mode, versions, expiry, retry and backoff, dead-letter, replay, inspection, purge | Customer-data workers |
| `RF-92-004` | Cache, search, and report technology with indexed fields, partition key, completeness rule, timing and count defense, TTL, invalidation, and rebuild | Derived-data features |
| `RF-92-005` | Versioned audit, customer-history, security-evidence, and permitted-telemetry schemas with field allowlists, ordering and integrity, access tiers, and retention | Protected workflows and any telemetry release |
| `RF-92-006` | The physical account schema and executable lifecycle contracts behind the `CA-92-*` account model and `PA-92-*` deletion semantics | Account, synchronization, and personal-account deletion |
| `RF-92-007` | Provider authentication, financial, notification, retention and deletion, and compromise evidence, mapped to `DI`, `DF`, `TB`, and `TH` identifiers | Provider release |
| `RF-92-008` | Operator identities, mediated tooling, separation of duties, evidence capture, notice workflow, and recovery rehearsal behind `OP-92-*` | Exceptional operational access and recovery release |
| `RF-92-009` | Concrete client cache and channel-provider schemas: templates, destinations, tokens, locators, opt-out, callbacks, localization, and custody language | Offline features and external-channel release |
| `RF-92-010` | Terminal deletion proven across every store, provider, derived copy, job, package, client, and backup, with a deletion ledger and restore reconciliation | Terminal deletion claims and launch readiness |
| `RF-92-011` | Product Owner confirmation of the CBD-92 §6 flow-to-boundary crossing map | Nothing directly, but an error there propagates into every CBD-94 verification target |
| `RF-92-012` | Concrete `RL-92-*` windows, thresholds, burst allowances, counting-key derivation, and counter storage | Release of every rate-limited surface |

## Synchronization flow

1. Verify and durably record each provider webhook.
2. Return quickly, then enqueue an idempotent synchronization job.
3. Fetch incremental changes using the saved provider cursor.
4. Apply additions, modifications, and removals in a database transaction.
5. Write domain events to a transactional outbox.
6. Recalculate affected budgets and evaluate alert rules asynchronously.
7. Deliver notifications with deduplication, cooldowns, and retry limits.
8. Run scheduled reconciliation to recover from missed webhooks.

Bank feeds should be described as automatically updated rather than guaranteed
real-time. The interface must show connection health and the last successful
provider update.

## Security baseline

- Do not collect or store online-banking credentials.
- Use least-privilege authorization and deny access by default.
- Require stronger authentication for access, export, and connection changes.
- Verify provider webhook signatures and reject replay attempts.
- Encrypt data in transit, provider tokens at the field level, and backups at
  rest.
- Exclude secrets and financial details from logs and product analytics.
- Maintain distinct append-only evidence rather than one audit log: budget-space
  resource history visible to members, Primary-Owner administrative history, and
  privileged security evidence, each with its own audience and fields.
- Support consent revocation, data export, and deletion.
- Test backup restoration and incident response before public launch.
- Conduct independent security and legal review before broad production use.

## Critical automated tests

- Timezones, daylight-saving changes, and period boundary calculations
- Irregular paycheck schedules and mid-period schedule changes
- Duplicate, delayed, and out-of-order financial-data webhooks
- Pending-to-posted transaction replacement
- Notification deduplication and cooldown behavior
- Cross-budget-space authorization attempts
- Role and visibility-profile changes, and consent revocation
- Historical reporting after category or budget edits
