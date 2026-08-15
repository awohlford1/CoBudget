# CoBudget technical architecture

## Direction

Begin with a TypeScript modular monolith backed by PostgreSQL. Deploy the API
and background workers separately, but keep the business modules in one
codebase. Split services only when measured scale or team ownership justifies
the operational cost.

## Proposed stack

| Layer | Initial choice |
| --- | --- |
| Web | Next.js, React, TypeScript, PWA support |
| Mobile | Expo and React Native in a later phase |
| API | NestJS with Fastify and OpenAPI |
| Data | Managed PostgreSQL with a typed SQL layer |
| Identity | Managed identity provider with MFA/passkeys |
| Financial data | Provider adapter with Plaid as the first implementation |
| Jobs | Durable queues, scheduled reconciliation, dedicated workers |
| Notifications | In-app, email, push, and SMS in MVP. In-app is mandatory for every eligible recipient; email, push, and SMS are opt-in per user and per supported event or category |
| Infrastructure | Containerized services, managed cloud resources, Terraform |
| Observability | Structured logs, traces, error reporting, and job-health metrics |

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
- Scope financial records to a budget space and authorize access server-side.
- Treat imported transactions as changeable records because pending items can
  be posted, modified, or removed.
- Encrypt financial-provider tokens separately from ordinary application data.

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
- Maintain append-only audit history for access and guardian actions.
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
- Guardian permission changes and consent revocation
- Historical reporting after category or budget edits
