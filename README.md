# CoBudget

CoBudget is a planned web and mobile budgeting application built around flexible
budget periods and collaborative financial accountability.

Users will be able to budget weekly, monthly, by paycheck, or on a custom
schedule; connect financial accounts; manage bills and goals; review reports;
and invite trusted people into a budget space with viewer, collaborator, or
guardian permissions.

## Project status

Planning and product validation. No application code has been added yet.

## Product principles

- Flexible periods are a core domain concept, not a reporting filter.
- Financial data access is private, explicit, revocable, and auditable.
- Collaboration permissions follow least privilege.
- Bank data freshness is communicated honestly.
- The first release proves the budgeting and accountability workflows before
  adding money movement or other regulated capabilities.

## Documentation

- [Brand foundation](docs/brand-foundation.md)
- [Product plan](docs/product-plan.md)
- [Technical architecture](docs/architecture.md)

## Proposed repository layout

The implementation is expected to become a TypeScript monorepo:

```text
apps/
  api/       Backend API
  web/       Responsive web application
  mobile/    Expo mobile application (later phase)
  worker/    Background sync and notification workers
packages/
  domain/    Shared domain rules and types
  api-client/
  config/
  design-tokens/
docs/
infra/       Infrastructure as code
```

This structure is documented only; the folders will be created when
implementation begins.

## Local development

Development commands will be documented after the application stack is
scaffolded.

## License

No license has been selected. All rights are reserved until a license is added.
