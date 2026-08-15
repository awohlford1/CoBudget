/**
 * Guards against barrel drift.
 *
 * Adding a public function to a module and forgetting to re-export it from its
 * `index.ts` fails silently: the function works, its tests pass, and consumers
 * simply cannot reach it. Nothing else in the toolchain notices, because an
 * unexported symbol is not an error.
 *
 * These tests compare each module's runtime exports against its barrel. They
 * cover values only — type-only exports do not exist at runtime and cannot be
 * enumerated this way, so a forgotten `export type` still slips through. That
 * is a narrower gap than the one being closed, and worth stating rather than
 * implying the check is total.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import * as isoDateModule from "./shared/iso-date.ts";
import * as sharedBarrel from "./shared/index.ts";

import * as definitionModule from "./schedule/definition.ts";
import * as parseModule from "./schedule/parse.ts";
import * as periodModule from "./schedule/period.ts";
import * as validateModule from "./schedule/validate.ts";
import * as scheduleBarrel from "./schedule/index.ts";

function assertFullyReExported(
  moduleLabel: string,
  barrelLabel: string,
  module: Record<string, unknown>,
  barrel: Record<string, unknown>,
): void {
  const missing = Object.keys(module)
    .filter((name) => !(name in barrel))
    .sort();
  assert.deepEqual(
    missing,
    [],
    `${moduleLabel} exports ${missing.join(", ")} which ${barrelLabel} does not re-export`,
  );
}

describe("shared barrel", () => {
  it("re-exports every runtime export of iso-date.ts", () => {
    assertFullyReExported("iso-date.ts", "shared/index.ts", isoDateModule, sharedBarrel);
  });
});

describe("schedule barrel", () => {
  it("re-exports every runtime export of definition.ts", () => {
    assertFullyReExported("definition.ts", "schedule/index.ts", definitionModule, scheduleBarrel);
  });

  it("re-exports every runtime export of validate.ts", () => {
    assertFullyReExported("validate.ts", "schedule/index.ts", validateModule, scheduleBarrel);
  });

  it("re-exports every runtime export of parse.ts", () => {
    assertFullyReExported("parse.ts", "schedule/index.ts", parseModule, scheduleBarrel);
  });

  it("re-exports every runtime export of period.ts", () => {
    assertFullyReExported("period.ts", "schedule/index.ts", periodModule, scheduleBarrel);
  });
});

describe("package entry points", () => {
  it("exposes no root barrel, keeping the §8.10 seam structural", () => {
    // The package.json exports map deliberately offers only ./shared and
    // ./schedule. A root barrel would give classification a convenient path
    // into schedule and undo the boundary the lint rules enforce.
    const packageJson = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as { exports: Record<string, unknown> };

    assert.deepEqual(Object.keys(packageJson.exports).sort(), ["./schedule", "./shared"]);
    assert.equal(Object.hasOwn(packageJson.exports, "."), false, "no root entry point");
  });
});
