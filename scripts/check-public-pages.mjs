#!/usr/bin/env node

// CBD-20: the public pages, checked against their source rather than read.
// Runs after `next build`, on the prerendered HTML, and fails naming the page
// and the sentence or resource at fault:
//
//  1. Copy. An independent reading of docs/brand-foundation.md — not the
//     parser the pages use — must find every approved string in the built
//     page: on the Mission page the mission, the vision, all seven values
//     (name and text), and every manifesto paragraph, in the required order,
//     with the closing line as the last text in <main>; on the landing page
//     the tagline, the descriptor, and the mission. Drift in either direction
//     fails.
//  2. Language. With the approved strings removed, what remains of each page
//     — headings, navigation, chrome — is held to the CBD-75 prohibited-
//     language register at public-page scope. The register is the single list;
//     this script no longer keeps one of its own. That scope includes
//     PL-75-14, which keeps role names off marketing pages: a role named
//     without the boundary that makes it safe implies exactly the authority
//     the standard prohibits, and the boundary does not fit here. The ban is
//     deliberate, not a leftover from when the role was unsettled — that was
//     settled when FU-95-003 closed on August 16, 2026.
//
//     The approved strings removed here are not unchecked. They are held to
//     the same register by scripts/check-copy-language.mjs, which is the only
//     thing that looks at them.
//  3. Trackers. Neither page may reference a resource on another origin:
//     no script, image, frame, stylesheet, preconnect, or prefetch beyond
//     this site (AN-92-001, AN-92-002). A public page that loads nothing
//     external cannot carry an analytics SDK, a pixel, or session replay.

import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";

import { brandPath, readApprovedBrand } from "./brand-foundation.mjs";
import { describe, loadRegister, repositoryRoot, scan } from "./copy-language.mjs";

const buildRoot = join(repositoryRoot, "apps", "web", ".next", "server", "app");
const pages = {
  landing: join(buildRoot, "index.html"),
  mission: join(buildRoot, "mission.html"),
};

const failures = [];
const label = (path) => relative(repositoryRoot, path).replaceAll("\\", "/");

// --- The approved strings, read independently of the app's parser. ---------

const approved = await readApprovedBrand();
const register = await loadRegister();

for (const [key, value] of Object.entries(approved)) {
  if (value === undefined || (Array.isArray(value) && value.length === 0)) {
    failures.push(`${label(brandPath)}: could not read the ${key}`);
  }
}
if (approved.values.length !== 7) failures.push(`${label(brandPath)}: expected seven values, read ${approved.values.length}`);

// --- The built pages. -------------------------------------------------------

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (html) =>
  html
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] ?? match);
const normalise = (text) => decode(text).replaceAll(/[’‘]/g, "'").replaceAll(/\s+/g, " ").trim();
const textOf = (html) =>
  normalise(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
const mainOf = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";

function check(page, html, required, { endsWith } = {}) {
  const page_ = label(pages[page]);
  const main = textOf(mainOf(html));
  const whole = textOf(html);
  let cursor = 0;
  let remainder = whole;

  // Each required string must appear at or after the previous one. A page may
  // quote a line earlier as well — the Mission page leads with the manifesto's
  // first line — so the search starts from the cursor, not the top.
  for (const [what, text] of required) {
    const needle = normalise(text);
    const at = main.indexOf(needle, cursor);
    if (at === -1) {
      failures.push(
        main.includes(needle)
          ? `${page_}: ${what} appears out of the required order`
          : `${page_}: ${what} is not rendered as approved — expected "${needle.slice(0, 60)}…"`,
      );
      continue;
    }
    cursor = at;
    remainder = remainder.replaceAll(needle, " ");
  }

  if (endsWith) {
    const needle = normalise(endsWith);
    if (!main.endsWith(needle)) {
      failures.push(`${page_}: <main> must end with the closing line "${needle}" — it ends with "…${main.slice(-60)}"`);
    }
  }

  // The remainder is lossy on purpose: approved strings are cut out of it so
  // the manifesto is not judged by rules written for chrome. Cutting can leave
  // a fragment, so the rule that reports a violation is not always the rule a
  // reader would have predicted — "Accountability Partner" loses its first
  // word to the value of the same name and is caught as a bare role term. The
  // finding is still real; only the attribution shifts.
  for (const finding of scan(remainder, "public-page", register.rules)) {
    failures.push(describe(`${page_}, outside the approved copy`, finding));
  }

  for (const match of html.matchAll(/<(script|img|iframe|link|source|video|audio)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi)) {
    const [, tag, url] = match;
    if (/^(?:https?:)?\/\//i.test(url) && !/^(?:https?:)?\/\/localhost\b/i.test(url)) {
      failures.push(`${page_}: <${tag}> loads ${url} from another origin — public pages load nothing external (AN-92-001, AN-92-002)`);
    }
  }
}

if (failures.length === 0) {
  const html = {};
  for (const [page, path] of Object.entries(pages)) {
    html[page] = await readFile(path, "utf8").catch(() => null);
    if (html[page] === null) failures.push(`${label(path)} is missing — run the build first`);
  }

  if (html.mission) {
    check(
      "mission",
      html.mission,
      [
        ["the mission statement", approved.mission],
        ["the vision", approved.vision],
        ...approved.values.flatMap((value, index) => [
          [`value ${index + 1} name`, value.name],
          [`value ${index + 1} text`, value.text],
        ]),
        ...approved.manifesto.map((paragraph, index) => [`manifesto paragraph ${index + 1}`, paragraph]),
      ],
      { endsWith: approved.closingLine },
    );
  }
  if (html.landing) {
    check("landing", html.landing, [
      ["the descriptor", approved.descriptor],
      ["the tagline", approved.tagline],
      ["the mission statement", approved.mission],
    ]);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`Public pages check failed: ${failure}`);
  process.exit(1);
}
console.log(
  `Public pages check passed: Mission page renders the approved content in order and ends with the closing line; landing renders the tagline, descriptor, and mission; the remaining page text clears all ${register.rules.length} CBD-75 rules at public-page scope; nothing loads from another origin`,
);
