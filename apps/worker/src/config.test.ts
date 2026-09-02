import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { ConfigError, undocumentedVariables } from "@cobudget/contracts/config";

import { loadWorkerConfigFrom, workerConfigSchema } from "./config.js";

const validEnvironment = {
  LOG_LEVEL: "info",
  NODE_ENV: "test",
  SERVICE_VERSION: "test-sha",
} as const;

describe("worker configuration", () => {
  it("loads the shared base configuration without a worker-only copy", () => {
    assert.deepEqual(loadWorkerConfigFrom(validEnvironment), validEnvironment);
  });

  it("fails startup naming a missing variable without echoing values", () => {
    const { LOG_LEVEL: _removed, ...withoutLogLevel } = validEnvironment;

    assert.throws(
      () => loadWorkerConfigFrom(withoutLogLevel),
      (error: unknown) => {
        assert.ok(error instanceof ConfigError);
        assert.match(error.message, /LOG_LEVEL/);
        assert.doesNotMatch(error.message, /test-sha/);
        return true;
      },
    );
  });

  it("documents every variable the worker reads", () => {
    const here = dirname(fileURLToPath(import.meta.url));
    const envExample = readFileSync(resolve(here, "../../../.env.example"), "utf8");

    assert.deepEqual(undocumentedVariables(workerConfigSchema, envExample), []);
  });
});
