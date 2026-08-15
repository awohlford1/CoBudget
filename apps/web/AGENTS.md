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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
