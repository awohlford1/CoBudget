import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConfigError } from "@cobudget/contracts/config";
import { runApiBootstrap, type StartupDependencies } from "./bootstrap.js";
import { loadApiConfigFrom } from "./config.js";

const valid = { NODE_ENV: "test", LOG_LEVEL: "info", SERVICE_VERSION: "local", API_PORT: "3001" };

function effects(environment: Record<string, string>) {
  const calls: string[] = [];
  const dependencies: StartupDependencies = {
    loadConfig: () => { calls.push("validate"); return loadApiConfigFrom(environment); },
    createApplication: async () => {
      calls.push("create");
      return {
        enableShutdownHooks: () => { calls.push("hooks"); },
        listen: async (port, address) => { calls.push(`listen:${address}:${port}`); },
      };
    },
    sink: () => { calls.push("ready"); },
  };
  return { calls, dependencies };
}

describe("API pre-effect validation", () => {
  for (const name of ["NODE_ENV", "LOG_LEVEL", "SERVICE_VERSION", "API_PORT"]) {
    it(`never constructs the application or opens a listener without ${name}`, async () => {
      const environment: Record<string, string> = { ...valid };
      delete environment[name];
      const { calls, dependencies } = effects(environment);
      await assert.rejects(runApiBootstrap(dependencies), ConfigError);
      assert.deepEqual(calls, ["validate"]);
    });
  }
  for (const name of ["NODE_ENV", "LOG_LEVEL", "API_PORT", "API_LISTEN_ADDRESS"]) {
    it(`never invokes effects for malformed ${name}`, async () => {
      const { calls, dependencies } = effects({ ...valid, [name]: "CBD113_VALUE_MUST_NOT_APPEAR" });
      await assert.rejects(runApiBootstrap(dependencies), ConfigError);
      assert.deepEqual(calls, ["validate"]);
    });
  }
  it("observes every effect in order on successful startup", async () => {
    const { calls, dependencies } = effects(valid);
    await runApiBootstrap(dependencies);
    assert.deepEqual(calls, ["validate", "create", "hooks", "listen:127.0.0.1:3001", "ready"]);
  });
});
