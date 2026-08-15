import parser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * Lint rules that enforce architectural claims this package makes about itself.
 *
 * Each rule below turns a comment into a failing build. A convention nobody
 * checks is not a constraint.
 *
 * Note on composition: `no-restricted-syntax` replaces rather than merges when
 * a later config block targets the same rule. Any block that narrows it must
 * therefore restate every selector it still wants, which is why the audited
 * exception below repeats the clock selectors instead of only dropping one.
 */

const SEAM_MESSAGE =
  "CBD-67 §8.10 separates cadence-specific boundary generation from the " +
  "cadence-neutral lifecycle, and CBD-69 §1 treats period boundaries as an " +
  "input rather than something classification derives. Pass the values you " +
  "need in as arguments instead of importing across the seam.";

const CLOCK_MESSAGE =
  "Reading the wall clock makes results depend on when and where the code " +
  "runs, which CBD-67 INV-87 forbids. The budget-space date is resolved at " +
  "the edge and passed in as an ISODate.";

const DATE_MESSAGE =
  "Date is an instant and its local-time methods read the machine zone, which " +
  "risks moving a calendar date across a boundary (CBD-67 INV-07, CBD-69 " +
  "INV-69-03). All Date usage is confined to src/shared/iso-date.ts, which " +
  "uses only UTC accessors. Build what you need from the helpers there.";

const BRAND_MESSAGE =
  "Casting to ISODate bypasses validation and can smuggle an impossible date " +
  "such as 2026-02-30 past every guard in the domain. Use toISODate or " +
  "isoDateOf, which validate, or parseCadenceDefinition at an untrusted edge.";

/** Banned everywhere, including iso-date.ts: nothing in a pure domain reads the clock. */
const CLOCK_SELECTORS = [
  {
    selector: 'NewExpression[callee.name="Date"][arguments.length=0]',
    message: CLOCK_MESSAGE,
  },
  {
    selector: 'CallExpression[callee.object.name="Date"][callee.property.name="now"]',
    message: CLOCK_MESSAGE,
  },
];

/** Banned everywhere except the module that legitimately mints the brand. */
const BRAND_CAST_SELECTORS = [
  {
    selector: 'TSAsExpression > TSTypeReference > Identifier[name="ISODate"]',
    message: BRAND_MESSAGE,
  },
  {
    selector: 'TSTypeAssertion > TSTypeReference > Identifier[name="ISODate"]',
    message: BRAND_MESSAGE,
  },
];

function forbidImportsFrom(...patterns) {
  return {
    "no-restricted-imports": [
      "error",
      { patterns: patterns.map((group) => ({ group: [group], message: SEAM_MESSAGE })) },
    ],
  };
}

export default defineConfig([
  globalIgnores(["node_modules/**"]),

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser,
      ecmaVersion: 2023,
      sourceType: "module",
    },
    rules: {
      "no-restricted-syntax": ["error", ...CLOCK_SELECTORS, ...BRAND_CAST_SELECTORS],
      "no-restricted-globals": ["error", { name: "Date", message: DATE_MESSAGE }],
    },
  },

  {
    // The single audited exception. This module owns the brand, so it is the
    // one place allowed to construct one and the one place allowed to touch
    // Date. Its own tests assert the arithmetic is identical under five
    // different machine time zones.
    files: ["src/shared/iso-date.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...CLOCK_SELECTORS],
      "no-restricted-globals": "off",
    },
  },

  {
    // Primitives sit below both engines and may depend on neither.
    files: ["src/shared/**/*.ts"],
    rules: forbidImportsFrom("**/schedule/**", "**/classification/**"),
  },

  {
    files: ["src/schedule/**/*.ts"],
    rules: forbidImportsFrom("**/classification/**"),
  },

  {
    files: ["src/classification/**/*.ts"],
    rules: forbidImportsFrom("**/schedule/**"),
  },
]);
