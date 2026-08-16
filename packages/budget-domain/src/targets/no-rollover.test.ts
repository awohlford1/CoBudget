/**
 * Guards INV-57 and FF-003: no code path computes, suggests, links, or labels a
 * rollover amount.
 *
 * This is a source scan rather than a behavioural test because the requirement
 * is an absence. There is no call that should return zero and no state that
 * should stay empty — the capability simply must not exist, and the only way to
 * assert that is to look at what was written.
 *
 * Comments are stripped before scanning, deliberately. Several modules explain
 * that rollover is forbidden and why, and a guard that punished the explanation
 * would push the reasoning out of the codebase to satisfy itself. What is banned
 * is an identifier, a string, or a label — something that could reach a user or
 * a stored amount.
 *
 * The two comment forms are stripped in one left-to-right pass rather than two.
 * Two passes are wrong in either order, and both failure modes are real. Block
 * comments first lets a line comment that happens to contain a block opener
 * swallow everything down to the next block terminator, deleting real code and
 * hiding any violation inside it. Line comments first lets a URL inside a block
 * comment consume that comment's own terminator, stranding its prose to be
 * scanned as code and failing an honest file. One alternation has neither
 * problem, because at each position the engine commits to whichever form
 * actually starts there. Both cases are covered by tests below, in the shapes
 * prose cannot express without reintroducing the hazard.
 *
 * The remaining limitation is string literals: `"http://x"` still ends a line
 * early, so a violation placed after one on the same line would be missed. That
 * is a missed detection rather than a false alarm, which is the right direction
 * for a guard that must never block honest work.
 */

import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";

/**
 * Inflections matter here. An earlier version matched only `carry forward` and
 * `roll over`, which let `carryOver`, `carriedForward`, and `rolledOver` through
 * — three of the most natural names a violation would actually be given.
 */
const FORBIDDEN = [
  { label: "rollover", pattern: /roll(ed|s|ing)?[\s\-_]*over/iu },
  { label: "carry-forward", pattern: /carr(y|ies|ied|ying)[\s\-_]*(forward|over)/iu },
  { label: "available-to-assign", pattern: /available[\s\-_]*to[\s\-_]*assign/iu },
];

function sourceFiles(): readonly string[] {
  return readdirSync(new URL("../", import.meta.url), { recursive: true })
    .map((entry) => String(entry).replaceAll("\\", "/"))
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".test.ts"))
    .sort();
}

function withoutComments(source: string): string {
  return source.replaceAll(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/gu, "");
}

const FILES = sourceFiles();

describe("INV-57 no rollover or carry-forward", () => {
  it("finds source files to scan", () => {
    // Guards the guard: a discovery bug would otherwise make every assertion
    // below vacuously pass, which is the failure mode a source scan is most
    // prone to.
    assert.ok(FILES.length > 0, "no source files discovered");
  });

  for (const file of FILES) {
    it(`has no rollover vocabulary in ${file}`, () => {
      const code = withoutComments(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"));
      const found = FORBIDDEN.filter(({ pattern }) => pattern.test(code)).map(({ label }) => label);
      assert.deepEqual(
        found,
        [],
        `${file} contains ${found.join(", ")} outside a comment. Balance rollover and ` +
          "carry-forward are deferred as FF-003 and forbidden by CBD-67 INV-57.",
      );
    });
  }
});

describe("the guard itself", () => {
  function matches(source: string): readonly string[] {
    return FORBIDDEN.filter((term) => term.pattern.test(withoutComments(source))).map(
      (term) => term.label,
    );
  }

  it("detects each forbidden term in the shapes a violation would take", () => {
    // A guard nobody has seen fail is a guess. These are the names the capability
    // would plausibly be given, including the inflections an earlier version of
    // this pattern missed entirely.
    for (const [source, label] of [
      ["const rolloverAmount = 0;", "rollover"],
      ["target.rollOver = 1;", "rollover"],
      ["const rolledOver = previous();", "rollover"],
      ["function rollsOver() {}", "rollover"],
      ["const carryForward = compute();", "carry-forward"],
      ["const carryOver = compute();", "carry-forward"],
      ["const carriedForward = compute();", "carry-forward"],
      ['label = "Carry forward";', "carry-forward"],
      ["const availableToAssign = 0;", "available-to-assign"],
      ["const available_to_assign = 0;", "available-to-assign"],
    ] as const) {
      assert.deepEqual(matches(source), [label], source);
    }
  });

  it("ignores the same terms inside either comment form", () => {
    assert.deepEqual(matches("// rollover is deferred as FF-003"), []);
    assert.deepEqual(matches("/* carry-forward is forbidden */"), []);
  });

  it("does not let a line comment swallow the code beneath it", () => {
    // The block-comments-first bug: `/*` inside a line comment used to open a
    // block that ran to the next `*/`, deleting the violation in between.
    const source = ["// an aside mentioning /* a block opener", "const carryOver = 1;", "/* real */"].join(
      "\n",
    );
    assert.deepEqual(matches(source), ["carry-forward"]);
  });

  it("does not let a URL inside a block comment leak that comment's prose", () => {
    // The line-comments-first bug in the other direction: stripping `//x */`
    // first would strand `/* rollover ... http:` as unclosed, and the prose would
    // then be scanned as code and fail an honest file.
    assert.deepEqual(matches("/* rollover is banned, see http://x/y */"), []);
  });
});
