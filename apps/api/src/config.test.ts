import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { ConfigError, undocumentedVariables } from "@cobudget/contracts/config";

import { apiConfigSchema, loadApiConfigFrom } from "./config.js";

const validEnvironment = {
  API_PORT: "3001",
  LOG_LEVEL: "info",
  NODE_ENV: "test",
  SERVICE_VERSION: "test-sha",
} as const;

describe("API configuration", () => {
  it("loads through the shared typed configuration contract", () => {
    assert.deepEqual(loadApiConfigFrom(validEnvironment), {
      API_PORT: 3001,
      API_LISTEN_ADDRESS: undefined,
      LOG_LEVEL: "info",
      NODE_ENV: "test",
      SERVICE_VERSION: "test-sha",
    });
  });

  it("allows an explicit API listen address override", () => {
    assert.deepEqual(
      loadApiConfigFrom({ ...validEnvironment, API_LISTEN_ADDRESS: "0.0.0.0" }),
      {
        API_PORT: 3001,
        API_LISTEN_ADDRESS: "0.0.0.0",
        LOG_LEVEL: "info",
        NODE_ENV: "test",
        SERVICE_VERSION: "test-sha",
      },
    );
  });

  it("fails startup naming a missing variable without echoing values", () => {
    const { API_PORT: _removed, ...withoutPort } = validEnvironment;

    assert.throws(
      () => loadApiConfigFrom(withoutPort),
      (error: unknown) => {
        assert.ok(error instanceof ConfigError);
        assert.match(error.message, /API_PORT/);
        assert.doesNotMatch(error.message, /test-sha/);
        return true;
      },
    );
  });

  it("rejects a malformed port instead of coercing or defaulting it", () => {
    assert.throws(
      () => loadApiConfigFrom({ ...validEnvironment, API_PORT: "three thousand" }),
      (error: unknown) => {
        assert.ok(error instanceof ConfigError);
        assert.match(error.message, /API_PORT/);
        assert.doesNotMatch(error.message, /three thousand/);
        return true;
      },
    );
  });

  it("documents every API variable in the repository environment template", () => {
    const here = dirname(fileURLToPath(import.meta.url));
    const envExample = readFileSync(resolve(here, "../../../.env.example"), "utf8");

    assert.deepEqual(undocumentedVariables(apiConfigSchema, envExample), []);
  });
});
