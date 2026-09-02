#!/usr/bin/env node

// The design-token contract, made a failing build rather than a convention.
// Four rules, each named in the failure:
//
//  1. Every `--color-*` token in tokens.css is declared as
//     `light-dark(<light>, <dark>)`. A token with one value, or none, fails.
//     (CBD-124)
//  2. No raw color appears anywhere under apps/web/src except the token
//     definitions. Components reference roles. (CBD-124)
//  3. The browser-chrome colours in theme-colors.ts — which HTML metadata and
//     the PWA manifest need as literals — equal the `surface` token's values,
//     so the one permitted duplication cannot drift. (CBD-124)
//  4. Every pairing declared in contrast-pairings.json meets its WCAG 2.2 AA
//     minimum in both themes, measured from the token values; every colour
//     token except the shadow appears in at least one pairing; and
//     contrast-record.md matches what was measured. A failure names the
//     pairing and the theme. Regenerate the record with `--write-record`.
//     (CBD-126)

import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const webSource = join(repositoryRoot, "apps", "web", "src");
const tokensPath = join(webSource, "styles", "tokens.css");
const themeColorsPath = join(webSource, "styles", "theme-colors.ts");
const pairingsPath = join(webSource, "styles", "contrast-pairings.json");
const recordPath = join(webSource, "styles", "contrast-record.md");
const writeRecord = process.argv.includes("--write-record");

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

// Rule 4 — every permitted pairing meets its minimum, in both themes, and the
// record matches. WCAG 2.x relative luminance and contrast ratio, computed
// from sRGB hex; the shadow token carries alpha and is not a pairing.
const MINIMUM = { text: 4.5, "non-text": 3 };

function luminance(hex) {
  const digits = hex.replace("#", "");
  const full = digits.length === 3 ? digits.replaceAll(/./g, (d) => d + d) : digits;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  const channel = (i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

function ratio(foreground, background) {
  const [lf, lb] = [luminance(foreground), luminance(background)];
  if (lf === null || lb === null) return null;
  const [lighter, darker] = lf >= lb ? [lf, lb] : [lb, lf];
  return (lighter + 0.05) / (darker + 0.05);
}

const { pairings } = JSON.parse(await readFile(pairingsPath, "utf8"));
const referenced = new Set();
const rows = [];

for (const pairing of pairings) {
  const { foreground, background, kind, use, exemption } = pairing;
  const fg = colorTokens.get(`--color-${foreground}`);
  const bg = colorTokens.get(`--color-${background}`);
  const where = `${label(pairingsPath)}: ${foreground} on ${background}`;
  if (!fg || !bg) {
    failures.push(`${where}: references a token that is not declared in tokens.css`);
    continue;
  }
  if (!(kind in MINIMUM) && kind !== "exempt") {
    failures.push(`${where}: kind must be text, non-text, or exempt`);
    continue;
  }
  if (kind === "exempt" && !exemption) {
    failures.push(`${where}: an exempt pairing must state its exemption`);
    continue;
  }
  referenced.add(foreground);
  referenced.add(background);

  const minimum = MINIMUM[kind];
  const measured = {};
  for (const theme of ["light", "dark"]) {
    const value = ratio(fg[theme], bg[theme]);
    if (value === null) {
      failures.push(`${where} in ${theme}: cannot measure — both tokens must be six-digit hex`);
      continue;
    }
    measured[theme] = value;
    if (minimum && value < minimum) {
      failures.push(
        `contrast: ${foreground} on ${background} in ${theme} is ${value.toFixed(2)}:1, below ${minimum}:1 for ${kind} — ${use}`,
      );
    }
  }
  rows.push({ foreground, background, kind, minimum, measured, use, exemption });
}

for (const name of colorTokens.keys()) {
  const role = name.replace("--color-", "");
  if (role !== "shadow" && !referenced.has(role)) {
    failures.push(`${label(tokensPath)}: ${name} appears in no pairing — declare its pairings in contrast-pairings.json or remove the token`);
  }
}

const cell = (value) => (value === undefined ? "—" : `${value.toFixed(2)}:1`);
const verdict = (row, theme) => {
  const value = row.measured[theme];
  if (value === undefined) return "—";
  if (!row.minimum) return "exempt";
  return value >= row.minimum ? "pass" : "FAIL";
};
const record = [
  "# Contrast record",
  "",
  "Generated by `node scripts/check-tokens.mjs --write-record` from the `light-dark()` values in `tokens.css` and the pairings in `contrast-pairings.json`. The gate fails when this file no longer matches what it measures, so the numbers here are always the current ones. Ratios are WCAG 2.2 contrast ratios; minimums are AA: 4.5:1 for text, 3:1 for non-text boundaries and indicators. Exempt pairings are measured and recorded, not enforced, with the clause that exempts them.",
  "",
  "| Foreground | Background | Kind | Light | Dark | Minimum | Light | Dark | Use / exemption |",
  "|---|---|---|---|---|---|---|---|---|",
  ...rows.map(
    (row) =>
      `| ${row.foreground} | ${row.background} | ${row.kind} | ${cell(row.measured.light)} | ${cell(row.measured.dark)} | ${row.minimum ? `${row.minimum}:1` : "—"} | ${verdict(row, "light")} | ${verdict(row, "dark")} | ${row.exemption ? `${row.use} ${row.exemption}` : row.use} |`,
  ),
  "",
].join("\n");

if (writeRecord) {
  await writeFile(recordPath, record, "utf8");
  console.log(`Token check: wrote ${label(recordPath)} (${rows.length} pairings)`);
} else {
  const existing = await readFile(recordPath, "utf8").catch(() => null);
  if (existing === null) {
    failures.push(`${label(recordPath)} is missing — run: node scripts/check-tokens.mjs --write-record`);
  } else if (existing.replaceAll("\r\n", "\n") !== record) {
    failures.push(`${label(recordPath)} is stale against the measured contrast — run: node scripts/check-tokens.mjs --write-record`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`Token check failed: ${failure}`);
  process.exit(1);
}
console.log(
  `Token check passed: ${colorTokens.size} colour tokens, both themes defined, no raw colour outside the definitions, ${rows.length} pairings measured in both themes and recorded`,
);
