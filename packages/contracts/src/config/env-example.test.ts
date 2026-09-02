import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { undocumentedVariables } from "./env-example.ts";
import type { ConfigSchema } from "./schema.ts";

const schema = {
  ALPHA: { kind: "string", required: true, description: "first" },
  BETA: { kind: "string", required: false, description: "second" },
} as const satisfies ConfigSchema;

describe("undocumentedVariables", () => {
  it("returns nothing when every variable is declared", () => {
    assert.deepEqual(undocumentedVariables(schema, "ALPHA=one\nBETA=\n"), []);
  });

  it("names a variable that is missing", () => {
    assert.deepEqual(undocumentedVariables(schema, "ALPHA=one\n"), ["BETA"]);
  });

  it("does not count a commented-out placeholder as declared", () => {
    assert.deepEqual(undocumentedVariables(schema, "ALPHA=one\n# BETA=\n"), ["BETA"]);
  });

  it("does not count a mention in a comment or a description as declared", () => {
    assert.deepEqual(undocumentedVariables(schema, "# BETA is optional\nALPHA=1\n"), ["BETA"]);
  });

  it("accepts Windows line endings", () => {
    assert.deepEqual(undocumentedVariables(schema, "ALPHA=one\r\nBETA=two\r\n"), []);
  });

  it("does not match a prefix of a longer name", () => {
    assert.deepEqual(undocumentedVariables(schema, "ALPHA_LONGER=one\nBETA=\n"), ["ALPHA"]);
  });
});
