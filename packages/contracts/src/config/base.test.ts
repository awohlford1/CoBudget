import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { baseConfigSchema } from "./base.ts";
import { loadConfig } from "./load.ts";

/**
 * CBD-109: `.env.example` documents every variable read, with no real secret
 * values. This test is what makes that a constraint rather than a habit — a
 * variable added to the schema without a placeholder fails the build.
 */
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const envExample = readFileSync(resolve(repositoryRoot, ".env.example"), "utf8");

function declaredInExample(name: string): boolean {
  return new RegExp(`^${name}=`, "m").test(envExample);
}

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
    for (const name of Object.keys(baseConfigSchema)) {
      assert.ok(declaredInExample(name), `.env.example does not declare ${name}`);
    }
  });

  it("carries a description for every variable, because .env.example is written from it", () => {
    for (const [name, spec] of Object.entries(baseConfigSchema)) {
      assert.ok(spec.description.length > 0, `${name} has no description`);
    }
  });
});
