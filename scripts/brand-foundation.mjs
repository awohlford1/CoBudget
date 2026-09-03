// The approved brand strings, read from docs/brand-foundation.md.
//
// This is deliberately a second parser. apps/web/src/content/brand-foundation.ts
// is what the pages render; this is what the checks compare against, so a bug
// in one does not hide itself in the other. Two checks share it —
// check-public-pages.mjs, which looks for these strings in built HTML, and
// check-copy-language.mjs, which holds them to the CBD-75 standard — and they
// must agree on what "the approved copy" is.

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { repositoryRoot } from "./copy-language.mjs";

export const brandPath = join(repositoryRoot, "docs", "brand-foundation.md");

const paragraphs = (lines) =>
  lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim().split("\n").map((line) => line.trim()).join(" "))
    .filter((paragraph) => paragraph && !paragraph.startsWith("#"));

export async function readApprovedBrand() {
  const markdown = await readFile(brandPath, "utf8");

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
    brand: identity.get("Brand"),
    tagline: identity.get("Leading tagline"),
    descriptor: identity.get("Descriptor"),
    mission: paragraphs(sections.get("Mission statement") ?? [])[0],
    vision: paragraphs(sections.get("Vision statement") ?? [])[0],
    values,
    manifesto: paragraphs(sections.get("Brand manifesto") ?? []),
  };
  approved.closingLine = approved.manifesto.at(-1);
  return approved;
}

/** Every approved string, labelled, in one flat list for a checker to walk. */
export const brandStrings = (approved) => [
  ["the brand name", approved.brand],
  ["the tagline", approved.tagline],
  ["the descriptor", approved.descriptor],
  ["the mission statement", approved.mission],
  ["the vision", approved.vision],
  ...approved.values.flatMap((value, index) => [
    [`value ${index + 1} name`, value.name],
    [`value ${index + 1} text`, value.text],
  ]),
  ...approved.manifesto.map((paragraph, index) => [`manifesto paragraph ${index + 1}`, paragraph]),
];
