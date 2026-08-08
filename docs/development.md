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

## Validate changes

```sh
npm run check
```

This runs ESLint, the TypeScript compiler, and a production Next.js build.

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
