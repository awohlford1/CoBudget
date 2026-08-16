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
 * The stripping is regex-based and therefore imperfect: a string literal
 * containing `//` would truncate a line early and could hide a violation after
 * it. No such literal exists in this package today, and the failure mode is a
 * missed detection rather than a false alarm, which is the right direction for a
 * guard that must never block honest work.
 */

import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";

const FORBIDDEN = [
  { label: "rollover", pattern: /roll[\s\-_]*over/iu },
  { label: "carry-forward", pattern: /carry[\s\-_]*forward/iu },
  { label: "available-to-assign", pattern: /available[\s\-_]*to[\s\-_]*assign/iu },
];

function sourceFiles(): readonly string[] {
  return readdirSync(new URL("../", import.meta.url), { recursive: true })
    .map((entry) => String(entry).replaceAll("\\", "/"))
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".test.ts"))
    .sort();
}

function withoutComments(source: string): string {
  return source.replaceAll(/\/\*[\s\S]*?\*\//gu, "").replaceAll(/\/\/[^\n]*/gu, "");
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
  it("detects each forbidden term in ordinary code shapes", () => {
    // A guard nobody has seen fail is a guess. These are the shapes a violation
    // would actually take: an identifier, a property, and a user-facing string.
    assert.equal(withoutComments("const rolloverAmount = 0;").includes("rollover"), true);

    for (const [source, label] of [
      ["const rolloverAmount = 0;", "rollover"],
      ["target.rollOver = 1;", "rollover"],
      ["const carryForward = compute();", "carry-forward"],
      ['label = "Carry forward";', "carry-forward"],
      ["const availableToAssign = 0;", "available-to-assign"],
    ] as const) {
      const matched = FORBIDDEN.filter((term) => term.pattern.test(withoutComments(source))).map(
        (term) => term.label,
      );
      assert.deepEqual(matched, [label], source);
    }
  });

  it("ignores the same terms inside comments", () => {
    assert.equal(withoutComments("// rollover is deferred as FF-003").trim(), "");
    assert.equal(withoutComments("/* carry-forward is forbidden */").trim(), "");
  });
});
