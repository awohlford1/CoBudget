import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The approved brand content, read from `docs/brand-foundation.md` at build
 * time and parsed into the pieces the public pages render.
 *
 * The pages never carry a copy of the mission, vision, values, manifesto,
 * tagline, or descriptor: they render what this module returns, so the
 * approved wording cannot drift from its source. Changing customer-facing
 * wording means changing the document first, which is the rule in AGENTS.md.
 * `scripts/check-public-pages.mjs` then diffs the built HTML against its own
 * reading of the same document, so a parsing mistake here fails the build
 * rather than reaching a customer.
 *
 * Server-only: it reads the filesystem. The pages that import it are Server
 * Components prerendered at build, so nothing reads the document at runtime.
 */
export interface Value {
  readonly name: string;
  readonly text: string;
}

export interface BrandFoundation {
  readonly brand: string;
  readonly descriptor: string;
  readonly tagline: string;
  readonly mission: string;
  readonly vision: string;
  readonly values: readonly Value[];
  /** Every manifesto paragraph, in order, ending with the closing line. */
  readonly manifesto: readonly string[];
  readonly closingLine: string;
}

// `next build` runs with the workspace directory as its working directory.
const SOURCE = resolve(process.cwd(), "../../docs/brand-foundation.md");

function paragraphsOf(lines: readonly string[]): string[] {
  const paragraphs: string[] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (line.trim() === "") {
      if (current.length > 0) paragraphs.push(current.join(" "));
      current = [];
    } else {
      current.push(line.trim());
    }
  }
  if (current.length > 0) paragraphs.push(current.join(" "));
  return paragraphs;
}

function parse(markdown: string): BrandFoundation {
  const sections = new Map<string, string[]>();
  let heading = "";
  for (const line of markdown.split(/\r?\n/)) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      heading = h2[1];
      sections.set(heading, []);
      continue;
    }
    sections.get(heading)?.push(line);
  }

  const section = (name: string): string[] => {
    const lines = sections.get(name);
    if (!lines) throw new Error(`brand-foundation.md has no "## ${name}" section`);
    return lines;
  };

  const identity = new Map<string, string>();
  for (const line of section("Brand name and identity")) {
    const row = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (row && row[1] !== "Element" && !/^-+$/.test(row[1])) identity.set(row[1], row[2]);
  }
  const identityValue = (element: string): string => {
    const value = identity.get(element);
    if (!value) throw new Error(`brand-foundation.md identity table has no "${element}" row`);
    return value;
  };

  const values: Value[] = [];
  let name = "";
  let body: string[] = [];
  const flush = () => {
    if (!name) return;
    const [text] = paragraphsOf(body);
    if (!text) throw new Error(`brand-foundation.md value "${name}" has no text`);
    values.push({ name, text });
  };
  for (const line of section("Core values")) {
    const h3 = line.match(/^### \d+\. (.+)$/);
    if (h3) {
      flush();
      name = h3[1];
      body = [];
    } else {
      body.push(line);
    }
  }
  flush();
  if (values.length !== 7) throw new Error(`brand-foundation.md declares ${values.length} values, not seven`);

  const [mission] = paragraphsOf(section("Mission statement"));
  const [vision] = paragraphsOf(section("Vision statement"));
  const manifesto = paragraphsOf(section("Brand manifesto"));
  const closingLine = manifesto.at(-1);
  if (!mission || !vision || manifesto.length < 2 || !closingLine) {
    throw new Error("brand-foundation.md is missing the mission, the vision, or the manifesto");
  }

  return {
    brand: identityValue("Brand"),
    descriptor: identityValue("Descriptor"),
    tagline: identityValue("Leading tagline"),
    mission,
    vision,
    values,
    manifesto,
    closingLine,
  };
}

export const brandFoundation: BrandFoundation = parse(readFileSync(SOURCE, "utf8"));
