#!/usr/bin/env node

// CBD-124: the design-token contract, made a failing build rather than a
// convention. Three rules, each named in the failure:
//
//  1. Every `--color-*` token in tokens.css is declared as
//     `light-dark(<light>, <dark>)`. A token with one value, or none, fails.
//  2. No raw color appears anywhere under apps/web/src except the token
//     definitions. Components reference roles.
//  3. The browser-chrome colours in theme-colors.ts — which HTML metadata and
//     the PWA manifest need as literals — equal the `surface` token's values,
//     so the one permitted duplication cannot drift.

import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const webSource = join(repositoryRoot, "apps", "web", "src");
const tokensPath = join(webSource, "styles", "tokens.css");
const themeColorsPath = join(webSource, "styles", "theme-colors.ts");

// The only files allowed to contain a colour literal.
const definitionFiles = new Set([tokensPath, themeColorsPath]);

const failures = [];
const label = (path) => relative(repositoryRoot, path).replaceAll("\\", "/");

// Rule 1 — every colour token carries both themes.
const tokensCss = await readFile(tokensPath, "utf8");
const colorTokens = new Map();
for (const match of tokensCss.matchAll(/^\s*(--color-[a-z0-9-]+)\s*:\s*([^;]+);/gm)) {
  const [, name, value] = match;
  const pair = value.trim().match(/^light-dark\(\s*(.+?)\s*,\s*(.+?)\s*\)$/s);
  if (!pair) {
    failures.push(`${label(tokensPath)}: ${name} must be declared as light-dark(<light>, <dark>)`);
    continue;
  }
  colorTokens.set(name, { light: pair[1], dark: pair[2] });
}
if (!/^\s*--color-\*\s*:\s*initial;/m.test(tokensCss)) {
  failures.push(`${label(tokensPath)}: the default palette must be reset with --color-*: initial`);
}
if (colorTokens.size === 0) {
  failures.push(`${label(tokensPath)}: no --color-* tokens found`);
}

// Rule 2 — no raw colour outside the definitions.
const literal = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/i;

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(path)));
    } else if (/\.(?:css|ts|tsx)$/.test(entry.name)) {
      files.push(path);
    }
  }
  return files;
}

for (const path of await sourceFiles(webSource)) {
  if (definitionFiles.has(path)) continue;
  const lines = (await readFile(path, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (literal.test(line)) {
      failures.push(`${label(path)}:${index + 1}: raw colour outside the token definitions — reference a role`);
    }
  });
}

// Rule 3 — the chrome colours mirror the surface token.
const themeColors = await readFile(themeColorsPath, "utf8");
const surface = colorTokens.get("--color-surface");
for (const theme of ["light", "dark"]) {
  const declared = themeColors.match(new RegExp(theme + ': "([^"]+)"'))?.[1];
  const expected = surface?.[theme];
  if (!declared) {
    failures.push(`${label(themeColorsPath)}: no ${theme} chrome colour declared`);
  } else if (expected && declared.toLowerCase() !== expected.toLowerCase()) {
    failures.push(`${label(themeColorsPath)}: ${theme} chrome colour ${declared} does not match --color-surface (${expected})`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`Token check failed: ${failure}`);
  process.exit(1);
}
console.log(`Token check passed: ${colorTokens.size} colour tokens, both themes defined, no raw colour outside the definitions`);
