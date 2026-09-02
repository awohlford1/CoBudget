/**
 * Guards against barrel drift, on the same reasoning as
 * `packages/budget-domain/src/barrel.test.ts`: a public function added to a
 * module and not re-exported from its `index.ts` works, passes its own tests,
 * and is unreachable by consumers, and nothing else notices.
 *
 * Modules are discovered from the filesystem so that a new module is covered
 * without anyone remembering to list it. Coverage is runtime values only;
 * type-only exports cannot be enumerated at runtime.
 */

import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const sourceRoot = dirname(fileURLToPath(import.meta.url));

/** Dynamic import needs a URL; a bare absolute path is rejected on Windows. */
function importPath(path: string): Promise<Record<string, unknown>> {
  return import(pathToFileURL(path).href);
}

const modules = readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

function isSourceFile(name: string): boolean {
  return name.endsWith(".ts") && !name.endsWith(".test.ts") && name !== "index.ts";
}

describe("barrels", () => {
  assert.ok(modules.length > 0, "no modules discovered");

  for (const moduleName of modules) {
    it(`${moduleName}/index.ts re-exports every runtime export of its files`, async () => {
      const moduleDir = resolve(sourceRoot, moduleName);
      const barrel = await importPath(resolve(moduleDir, "index.ts"));
      const files = readdirSync(moduleDir).filter(isSourceFile);

      for (const file of files) {
        const source = await importPath(resolve(moduleDir, file));
        for (const name of Object.keys(source)) {
          assert.ok(name in barrel, `${moduleName}/${file} exports ${name}, which ${moduleName}/index.ts does not re-export`);
        }
      }
    });
  }
});
