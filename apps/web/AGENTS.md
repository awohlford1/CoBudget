# Working in `apps/web`

Guidance for anyone — human or agent — making changes in this workspace.

## The generated block below is committed on purpose

The block at the end of this file, delimited by HTML comments containing
`BEGIN:nextjs-agent-rules` and `END:nextjs-agent-rules`, is written by Next.js rather than by us. `next dev` re-adds it whenever it is missing or out of date.

**Leave it in place.** Deleting it from a working tree or dropping it from a diff does not remove it; the next `next dev` writes it back and the change reappears as uncommitted noise. Committing it is what keeps `git status` clean.

Do not hand-edit inside the delimiters either. The generator replaces that whole span on its next run, so edits there are silently discarded. Text outside the span is preserved, which is why this section sits above it — put anything of our own here.

**Do not write either delimiter literally anywhere in this file.** The generator locates the span with `indexOf` on the first match, so a delimiter quoted in prose — even inside backticks or a code fence — is treated as the real thing. It then replaces everything from that point to the next closing delimiter, mangling the surrounding sentence and leaving the file with two copies of the block. This was verified by running the generator against a draft of this file that did quote them; that is why the delimiters are named in parts above rather than reproduced.

Decided under CBD-97, which asked whether this file's generated content should be committed or excluded. Committed, because unlike a build artifact it is content a reader is meant to actually read, and because the generator's re-add behaviour makes excluding it self-defeating. The generator is at `node_modules/next/dist/server/lib/generate-agent-files.js` if you want to confirm any of this rather than take it on trust.

`CLAUDE.md` in this directory is a one-line `@AGENTS.md` import, so it inherits everything here and needs no copy of its own.

## Contrast with `next-env.d.ts`

That file is also generated, and CBD-97 reached the opposite conclusion for it: untracked and gitignored, because it is a pure build artifact whose contents flip depending on whether `next dev` or `next build` ran last, and nothing reads it — `tsconfig.json` already includes the generated route types directly. See the comment in the repository `.gitignore`.

The distinction is whether a human is meant to read the file, not whether a tool generates it.

## Theming and design tokens

Decided under CBD-124. `src/styles/tokens.css` is the only vocabulary for colour, radius, elevation, and type. Every colour token names a role (`surface`, `on-surface-muted`, `border-strong`, `interactive`, `danger`) and is declared once as `light-dark(light, dark)`, so both themes exist for every token by construction and switching theme changes values, never rules. Tailwind's default palette is reset in that file: `bg-surface` exists, `bg-red-500` does not.

Three rules are enforced by `scripts/check-tokens.mjs`, which runs in `npm run check`:

- A `--color-*` token declared any way other than `light-dark(<light>, <dark>)` fails the build.
- A raw colour — hex, `rgb()`, `oklch()`, and the rest — anywhere under `src/` other than `tokens.css` and `theme-colors.ts` fails the build. Reference a role.
- `theme-colors.ts` holds the two chrome colours that HTML metadata and the manifest need as literals, and the check verifies they equal `--color-surface`.

Theme resolution: `:root { color-scheme: light dark }` in `globals.css` follows `prefers-color-scheme`; `data-theme="light" | "dark"` on `<html>` pins one scheme. The attribute is written in exactly two places — the inline script in the root layout (`src/theme/theme-script.ts`), which runs before first paint from the stored choice, and `applyTheme` in `src/theme/theme.ts` — and read in exactly one, `globals.css`. Components never branch on it. The choice persists in `localStorage` under `cobudget-theme`; storing it on the user record is CBD-22's.

## Components

Decided under CBD-125. The set lives in `src/components/`, one file per component, and consumes tokens only through Tailwind utilities (`bg-surface-raised`, `text-on-surface-muted`, `border-border-strong`); the token gate makes any other colour a failing build. Every component is a Server Component except `Dialog`, which needs `showModal()`, and the `ThemeToggle`. Add a `"use client"` only for a browser API or interactive state, and say why in the file's comment.

States are attributes, not props that pick a stylesheet: `disabled`, `aria-busy` (loading), and `aria-invalid` (error) are the real HTML, and Tailwind's `disabled:`, `aria-busy:`, and `aria-invalid:` variants style them. Hover, active, and focus-visible are widened in `src/styles/states.css` so `data-state="hover"` (or `"active"`, `"focus-visible"`) forces them — which is how `/foundation` renders every state of every component statically, in both themes, with no component aware of it. The page sets `color-scheme` per column through the `scheme-light` and `scheme-dark` rules in `globals.css` — a stylesheet rule, never an inline style, because the CSS pipeline polyfills `light-dark()` around the `color-scheme` declarations it can see — and because the tokens are `@theme inline`, every utility inside resolves against it. A `var(--color-…)` in handwritten CSS does not: it is resolved once at `:root` and inherited, so it suits page chrome only. The page renders its children once per column and derives every `id` and radio `name` from the column's scheme, because two copies of one id break label and error association. Keep `/foundation` unlinked and `noindex`; it is a working surface for review, not a customer page.

The select's option list is the one part of a native control the OS would otherwise paint. `globals.css` opts every `select` into the customizable select (`appearance: base-select` on the control and its `::picker(select)`), so the list and its options are rendered in the page and take the roles like any surface, while keyboard, typeahead, and screen-reader behaviour stay the platform's. Those are global rules because options are the consumer's elements with no class of their own. Browsers without support — Safari at the time of writing — ignore the declarations and keep the native list; that is the accepted fallback, not a bug to work around with a custom listbox.

Contrast is measured, not judged, and the measurement is the gate (CBD-126). `src/styles/contrast-pairings.json` declares every pairing the tokens permit — a foreground role on a background role, with its kind: text (4.5:1), non-text (3:1, for boundaries and indicators that identify a control), or exempt, which is measured and recorded but not enforced and must state the clause that exempts it. The token check measures each pairing from the `light-dark()` values in both themes and fails naming the pairing and the theme; it also fails if a colour token appears in no pairing, so a new role cannot arrive unmeasured. `src/styles/contrast-record.md` is the record, generated by `node scripts/check-tokens.mjs --write-record` and verified on every run, so it is always current. The recorded exemptions: disabled text (1.4.3), the lime `accent` fill on either surface (1.4.11 — its `on-accent` label identifies the control, so no control may rely on that fill alone), decorative `border`, and the focus ring's relation to a fill it never touches.

The keyboard, screen-reader, and reduced-motion verification is a hand pass, written up in `accessibility-record.md` in this directory with the date, the environment, what was done, and what is still owed. Update it when a component changes; the contrast half updates itself.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
