import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { inventory, root, sources, scanJavaScript, validateInventory } from "./check-environment.mjs";
import { python } from "./python-runtime.mjs";

const template = readFileSync(join(root, ".env.example"), "utf8");
const files = sources();

describe("environment contract", () => {
  it("accepts the complete repository inventory", () => {
    assert.deepEqual(validateInventory(inventory, template, files), []);
  });
  for (const variable of inventory.variables.filter(v => v.template === "included")) {
    it(`rejects the isolated removal of ${variable.name} from the template`, () => {
      const changed = template.split(/\r?\n/).filter(line => !line.startsWith(`${variable.name}=`)).join("\n");
      assert.ok(validateInventory(inventory, changed, files).some(f => f.includes(`${variable.name}: missing template`)));
    });
  }
  it("rejects an orphan, duplicate, undocumented, or unsafe template value", () => {
    for (const change of [template + "\nORPHAN=value\n", template + "\nAPI_PORT=3001\n",
      template.replace("CONFLUENCE_API_TOKEN=", "CONFLUENCE_API_TOKEN=synthetic-secret"),
      template.replace(/# TCP port[^\n]*\r?\n/, "")]) {
      assert.ok(validateInventory(inventory, change, files).length > 0);
    }
  });
  it("rejects schema drift and a stale consumer", () => {
    const changed = structuredClone(inventory);
    changed.variables.find(v => v.name === "API_PORT").validation.max = 65536;
    assert.ok(validateInventory(changed, template, files).some(f => f.includes("API_PORT: inventory validation differs")));
    changed.variables.find(v => v.name === "LOG_LEVEL").consumer.push("scripts/check-environment.mjs");
    assert.ok(validateInventory(changed, template, files).some(f => f.includes("LOG_LEVEL: stale consumer")));
  });
  it("requires all platform/test classifications and rejects a new environment schema consumer", () => {
    for (const name of ["CI", "SCARF_ANALYTICS", "TZ"]) {
      const changed = { ...inventory, variables: inventory.variables.filter(v => v.name !== name) };
      assert.ok(validateInventory(changed, template, files).some(f => f.includes(name)));
    }
    assert.ok(scanJavaScript('loadConfigFromEnvironment({EXTRA: {kind: "string", required: true}})', "apps/new/config.ts").length);
  });
  it("fails the production guard for undeclared JS and Python fixtures", () => {
    for (const [path, source] of [["apps/fixture.ts", "process.env.CBD_113_UNDECLARED"],
      ["scripts/fixture.py", 'import os\nos.environ.get("CBD_113_UNDECLARED")']]) {
      const errors = validateInventory(inventory, template, { ...files, [path]: source });
      assert.ok(errors.some(f => f.includes("CBD_113_UNDECLARED")));
    }
  });
  it("rejects computed, destructured, imported and aliased reads", () => {
    for (const source of ['process["env"]["UNKNOWN"]', "process.env[name]", "const {env} = process",
      "const e = process.env", 'import {env as e} from "node:process"', 'require("process").env',
      "const p = process; p.env.X", "globalThis.process.env.X", "process[key]",
      "const read = loadConfigFromEnvironment; read(schema)", "const read = config.loadConfigFromEnvironment"]) {
      assert.ok(scanJavaScript(source, "apps/fixture.ts").length, source);
    }
    assert.deepEqual(scanJavaScript('// process.env.COMMENT\nconst s = "process.env.STRING"', "apps/fixture.ts"), []);
  });
  it("runs isolated Python configuration, scanner and pre-effect tests", () => {
    const result = python([join(root, "scripts/test_tool_config.py")]);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  });
});
