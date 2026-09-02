import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { baseConfigSchema } from "./base.ts";
import type { LogLevel, NodeEnvironment } from "./base.ts";
import { undocumentedVariables } from "./env-example.ts";
import { loadConfig } from "./load.ts";

/**
 * CBD-109: `.env.example` documents every variable read, with no real secret
 * values. This test is what makes that a constraint rather than a habit — a
 * variable added to the schema without a placeholder fails the build.
 *
 * The path climbs from `packages/contracts/src/config` to the repository root.
 * That depth is a fact about the source layout; the base tsconfig is `noEmit`,
 * so there is no emitted copy at a different depth to get it wrong.
 */
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const envExample = readFileSync(resolve(repositoryRoot, ".env.example"), "utf8");

describe("baseConfigSchema", () => {
  it("loads from a complete environment", () => {
    const config = loadConfig(baseConfigSchema, {
      NODE_ENV: "test",
      LOG_LEVEL: "info",
      SERVICE_VERSION: "0.0.0-test",
    });

    assert.equal(config.NODE_ENV, "test");
    assert.equal(config.LOG_LEVEL, "info");
    assert.equal(config.SERVICE_VERSION, "0.0.0-test");
  });

  it("is documented variable-for-variable in .env.example", () => {
    assert.deepEqual(undocumentedVariables(baseConfigSchema, envExample), []);
  });

  it("carries a description for every variable, because .env.example is written from it", () => {
    for (const [name, spec] of Object.entries(baseConfigSchema)) {
      assert.ok(spec.description.length > 0, `${name} has no description`);
    }
  });

  // ConfigOf derives narrow types from the schema declaration. `assert.equal`
  // would accept a widened `string` just as happily, so the narrowing is
  // asserted where it lives: `tsc` fails if an `@ts-expect-error` is unused.
  it("derives narrow types from the declaration, at compile time", () => {
    // @ts-expect-error — "staging" is not a declared NODE_ENV value
    const environment: NodeEnvironment = "staging";
    // @ts-expect-error — "trace" is not a declared LOG_LEVEL value
    const level: LogLevel = "trace";
    const config = loadConfig(baseConfigSchema, { NODE_ENV: "test", LOG_LEVEL: "info", SERVICE_VERSION: "v" });
    // A required variable is present with its value type, never `undefined`.
    const version: string = config.SERVICE_VERSION;

    assert.notEqual(environment, config.NODE_ENV);
    assert.notEqual(level, config.LOG_LEVEL);
    assert.equal(version, "v");
  });
});
