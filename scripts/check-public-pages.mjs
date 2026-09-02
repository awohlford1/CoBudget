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
//     — headings, navigation, chrome — must not use shame, fear, or
//     surveillance framing, must not describe anything as real-time or
//     instantaneous, and must not name the role CBD-12 has not settled.
//  3. Trackers. Neither page may reference a resource on another origin:
//     no script, image, frame, stylesheet, preconnect, or prefetch beyond
//     this site (AN-92-001, AN-92-002). A public page that loads nothing
//     external cannot carry an analytics SDK, a pixel, or session replay.

import { readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(repositoryRoot, "docs", "brand-foundation.md");
const buildRoot = join(repositoryRoot, "apps", "web", ".next", "server", "app");
const pages = {
  landing: join(buildRoot, "index.html"),
  mission: join(buildRoot, "mission.html"),
};

const failures = [];
const label = (path) => relative(repositoryRoot, path).replaceAll("\\", "/");

// --- The approved strings, read independently of the app's parser. ---------

const markdown = await readFile(sourcePath, "utf8");
const sections = new Map();
let heading = "";
for (const line of markdown.split(/\r?\n/)) {
  const h2 = line.match(/^## (.+)$/);
  if (h2) {
    heading = h2[1];
    sections.set(heading, []);
  } else {
    sections.get(heading)?.push(line);
  }
}
const paragraphs = (lines) =>
  lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim().split("\n").map((l) => l.trim()).join(" "))
    .filter((p) => p && !p.startsWith("#"));

const identity = new Map();
for (const line of sections.get("Brand name and identity") ?? []) {
  const row = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
  if (row) identity.set(row[1], row[2]);
}
const values = [];
for (const block of (sections.get("Core values") ?? []).join("\n").split(/^### \d+\. /m).slice(1)) {
  const [name, ...rest] = block.split("\n");
  values.push({ name: name.trim(), text: paragraphs(rest)[0] });
}
const approved = {
  tagline: identity.get("Leading tagline"),
  descriptor: identity.get("Descriptor"),
  mission: paragraphs(sections.get("Mission statement") ?? [])[0],
  vision: paragraphs(sections.get("Vision statement") ?? [])[0],
  values,
  manifesto: paragraphs(sections.get("Brand manifesto") ?? []),
};
approved.closingLine = approved.manifesto.at(-1);

for (const [key, value] of Object.entries(approved)) {
  if (value === undefined || (Array.isArray(value) && value.length === 0)) {
    failures.push(`${label(sourcePath)}: could not read the ${key}`);
  }
}
if (approved.values.length !== 7) failures.push(`${label(sourcePath)}: expected seven values, read ${approved.values.length}`);

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

const FORBIDDEN = [
  /\bshame\b/i, /\bshaming\b/i, /\bashamed\b/i, /\bguilt\b/i, /\bguilty\b/i,
  /\bfear\b/i, /\bafraid\b/i, /\bscared\b/i,
  /\bsurveillance\b/i, /\bspy(?:ing)?\b/i, /\bmonitor(?:ing|ed)?\b/i, /\bpolic(?:e|ing)\b/i,
  /\breal[- ]time\b/i, /\binstant(?:ly|aneous)?\b/i,
  /\bGuardian\b/, /\bAccountability Partner\b/,
];

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

  for (const pattern of FORBIDDEN) {
    const hit = remainder.match(pattern);
    if (hit) failures.push(`${page_}: forbidden wording "${hit[0]}" outside the approved copy`);
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
  `Public pages check passed: Mission page renders the approved content in order and ends with the closing line; landing renders the tagline, descriptor, and mission; no forbidden wording; nothing loads from another origin`,
);
