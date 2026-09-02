# CoBudget development

## Requirements

- Node.js 24
- npm 11

On Windows PowerShell systems that block script shims, use `npm.cmd` anywhere
this guide shows `npm` (for example, `npm.cmd run dev`).

## Install

From the repository root:

```sh
npm install
```

## Run the web application

```sh
npm run dev
```

Then open `http://localhost:3000`.

## Run the API application

Copy the safe local configuration template once, then adjust it if needed:

```sh
cp .env.example .env.local
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead.

Start the API from the repository root:

```sh
npm run dev:api
```

The API binds on port 3001 by default and by default binds to `127.0.0.1` in
development/test, and `0.0.0.0` in production. Override the bind address with
`API_LISTEN_ADDRESS` in `.env.local` if you need a different interface. Its
process-only readiness response is at `/health`, and its OpenAPI document is at
`/openapi.json`. Neither endpoint requires a database or another service.

The API rejects bodies over 1 MiB, bounds headers and request time, does not
trust caller-supplied request IDs or forwarding headers, sends hardened response
headers, and makes responses non-cacheable by default. Cross-origin access is
disabled unless a later feature adds a reviewed allowlist. Production responses
also send HSTS; local HTTP responses deliberately do not. TLS termination and
the required per-surface rate limits are deployment-edge controls, not replaced
by these application defaults.

## Run the worker application

The worker uses the same `.env.local` shared configuration as the API. Start it
as a separate process from the repository root:

```sh
npm run dev:worker
```

For a production-equivalent start, build the workspace and run the compiled
artifact (the start command does not depend on the TypeScript development
loader):

```sh
npm run build --workspace=@cobudget/worker
npm run start:worker
```

It writes structured startup and readiness records, then remains idle until
`SIGINT` or `SIGTERM`. Either signal produces one structured shutdown record and
a clean exit. Shutdown work is idempotent and has a ten-second safety deadline,
so a future resource drain cannot leave a deployment stuck indefinitely. The
worker has no queue, database, scheduler, provider client, or jobs yet; those
dependencies belong to their own implementation stories.

## Validate changes

```sh
npm run check
```

This checks documentation and tokens, then runs linting, type checking, tests,
and production builds across all workspaces.

## Workspace conventions

- Deployable applications belong in `apps/`.
- Shared libraries belong in `packages/` only after at least two applications
  need them.
- Pages are Server Components unless browser APIs or interactive state require a
  Client Component.
- Secrets belong in untracked `.env.local` files. When a variable is introduced,
  add a safe placeholder and description to `.env.example`.
- Financial information, authentication data, and provider tokens must never be
  included in logs, fixtures, screenshots, or analytics events.
