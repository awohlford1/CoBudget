import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ConfigError, loadConfig } from "./load.ts";
import type { ConfigSchema } from "./schema.ts";

const schema = {
  REQUIRED_STRING: { kind: "string", required: true, description: "a required string" },
  OPTIONAL_STRING: { kind: "string", required: false, description: "an optional string" },
  PORT: { kind: "integer", required: true, description: "a bounded integer", min: 1, max: 65535 },
  MODE: { kind: "enum", required: true, description: "an enum", values: ["fast", "safe"] },
} as const satisfies ConfigSchema;

const valid = {
  REQUIRED_STRING: "hello",
  PORT: "8080",
  MODE: "safe",
};

function failureOf(run: () => unknown): ConfigError {
  try {
    run();
  } catch (error) {
    assert.ok(error instanceof ConfigError, "expected a ConfigError");
    return error;
  }
  assert.fail("expected loadConfig to throw");
}

describe("loadConfig", () => {
  it("returns typed values for a valid environment", () => {
    const config = loadConfig(schema, valid);

    assert.equal(config.REQUIRED_STRING, "hello");
    assert.equal(config.PORT, 8080);
    assert.equal(config.MODE, "safe");
    assert.equal(config.OPTIONAL_STRING, undefined);
  });

  // CBD-109: a required variable that is absent fails startup with a message
  // naming it — verified by removing one rather than by inspection.
  it("fails naming a required variable that is absent", () => {
    const withoutRequired = { PORT: valid.PORT, MODE: valid.MODE };

    const error = failureOf(() => loadConfig(schema, withoutRequired));

    assert.deepEqual(error.failures, [{ variable: "REQUIRED_STRING", reason: "is required and not set" }]);
    assert.match(error.message, /REQUIRED_STRING/);
  });

  it("treats an empty string as absent", () => {
    const error = failureOf(() => loadConfig(schema, { ...valid, REQUIRED_STRING: "" }));

    assert.equal(error.failures[0]?.variable, "REQUIRED_STRING");
  });

  // CBD-109: a malformed value fails the same way and is never coerced to a
  // default. Each case below would have a plausible "helpful" coercion, and
  // each is refused.
  describe("refuses a malformed value rather than coercing it", () => {
    it("rejects a non-integer where an integer is declared", () => {
      const error = failureOf(() => loadConfig(schema, { ...valid, PORT: "eighty" }));

      assert.deepEqual(error.failures, [{ variable: "PORT", reason: "must be an integer" }]);
    });

    it("rejects a decimal where an integer is declared", () => {
      const error = failureOf(() => loadConfig(schema, { ...valid, PORT: "80.5" }));

      assert.equal(error.failures[0]?.variable, "PORT");
    });

    it("rejects an integer outside the declared bounds", () => {
      assert.equal(failureOf(() => loadConfig(schema, { ...valid, PORT: "0" })).failures[0]?.reason, "must be at least 1");
      assert.equal(
        failureOf(() => loadConfig(schema, { ...valid, PORT: "70000" })).failures[0]?.reason,
        "must be at most 65535",
      );
    });

    it("rejects an enum value outside the declared set, including by case", () => {
      const error = failureOf(() => loadConfig(schema, { ...valid, MODE: "Safe" }));

      assert.deepEqual(error.failures, [{ variable: "MODE", reason: "must be one of: fast, safe" }]);
    });
  });

  it("reports every failure at once so the operator fixes them in one pass", () => {
    const error = failureOf(() => loadConfig(schema, { PORT: "nope" }));

    assert.deepEqual(
      error.failures.map((failure) => failure.variable),
      ["REQUIRED_STRING", "PORT", "MODE"],
    );
    for (const name of ["REQUIRED_STRING", "PORT", "MODE"]) {
      assert.match(error.message, new RegExp(name));
    }
  });

  it("never repeats the offending value in a failure reason", () => {
    const secret = "hunter2-should-not-appear";
    const error = failureOf(() => loadConfig(schema, { ...valid, PORT: secret }));

    assert.doesNotMatch(error.message, new RegExp(secret));
  });

  it("ignores variables the schema does not declare", () => {
    const config = loadConfig(schema, { ...valid, UNRELATED: "whatever" });

    assert.equal("UNRELATED" in config, false);
  });

  // The loaded type tells a required variable from an optional one. `tsc`
  // fails if the `@ts-expect-error` below is unused, so if ConfigOf ever stops
  // marking optional variables as possibly undefined, the build breaks here.
  it("types an optional variable as possibly undefined and a required one as not", () => {
    const config = loadConfig(schema, valid);
    const required: string = config.REQUIRED_STRING;
    // @ts-expect-error — an optional variable may be undefined
    const optional: string = config.OPTIONAL_STRING;

    assert.equal(required, "hello");
    assert.equal(optional, undefined);
  });
});
