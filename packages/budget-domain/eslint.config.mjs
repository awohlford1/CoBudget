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

const INCOME_DIRECTION_MESSAGE =
  "Income is built on top of cadence definitions, not the other way round: " +
  "CBD-68 §8 has the anchor income schedule supply the paycheck cadence that " +
  "CBD-29 generates boundaries from. Importing income here would make that a " +
  "cycle. Pass the anchor's recurrence in as an argument instead.";

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

const VALIDATED_MESSAGE =
  "Casting to a validated definition bypasses validateCadenceDefinition, which " +
  "is the only thing standing between the period generator and a value the " +
  "type system cannot check — MonthlyAnchor.day is a plain number, so a day of " +
  "40 is type-valid and once produced a silently wrong boundary. Validate or " +
  "parse the definition instead.";

function brandCastSelectors(typeName, message) {
  return [
    { selector: `TSAsExpression > TSTypeReference > Identifier[name="${typeName}"]`, message },
    { selector: `TSTypeAssertion > TSTypeReference > Identifier[name="${typeName}"]`, message },
  ];
}

/** Banned everywhere except the module that legitimately mints each brand. */
const ISO_DATE_CAST_SELECTORS = brandCastSelectors("ISODate", BRAND_MESSAGE);

const VALIDATED_CAST_SELECTORS = [
  ...brandCastSelectors("ValidatedCadenceDefinition", VALIDATED_MESSAGE),
  ...brandCastSelectors("WeeklyOrMonthlyDefinition", VALIDATED_MESSAGE),
];

/**
 * Forbid a layer from importing layers it must sit above or beside.
 *
 * Takes `[pattern, message]` pairs rather than one message for all of them.
 * Two different rules are enforced here — the CBD-67 §8.10 cadence and
 * classification seam, and the direction of the income dependency — and a
 * single block carries only one `no-restricted-imports` entry, so a shared
 * message would have to explain the wrong rule for half the violations.
 */
function forbidImportsFrom(...groups) {
  return {
    "no-restricted-imports": [
      "error",
      { patterns: groups.map(([group, message]) => ({ group: [group], message })) },
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
      "no-restricted-syntax": [
        "error",
        ...CLOCK_SELECTORS,
        ...ISO_DATE_CAST_SELECTORS,
        ...VALIDATED_CAST_SELECTORS,
      ],
      "no-restricted-globals": ["error", { name: "Date", message: DATE_MESSAGE }],
    },
  },

  {
    // Owns the ISODate brand, so it is the one place allowed to construct one
    // and the one place allowed to touch Date. Its own tests assert the
    // arithmetic is identical under five different machine time zones.
    files: ["src/shared/iso-date.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...CLOCK_SELECTORS, ...VALIDATED_CAST_SELECTORS],
      "no-restricted-globals": "off",
    },
  },

  {
    // Owns the validation brand, and is the only place allowed to mint it.
    files: ["src/schedule/validate.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...CLOCK_SELECTORS, ...ISO_DATE_CAST_SELECTORS],
    },
  },

  {
    // Tests must be able to forge invalid values, because proving a defence
    // fires requires constructing the state it defends against. The exception
    // is narrow and greppable: it applies only to the validation brand, only in
    // test files, and never to ISODate or the clock rules.
    files: ["src/**/*.test.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...CLOCK_SELECTORS, ...ISO_DATE_CAST_SELECTORS],
    },
  },

  {
    // Primitives sit below every engine and may depend on none of them.
    files: ["src/shared/**/*.ts"],
    rules: forbidImportsFrom(
      ["**/schedule/**", SEAM_MESSAGE],
      ["**/classification/**", SEAM_MESSAGE],
      ["**/income/**", INCOME_DIRECTION_MESSAGE],
    ),
  },

  {
    files: ["src/schedule/**/*.ts"],
    rules: forbidImportsFrom(
      ["**/classification/**", SEAM_MESSAGE],
      ["**/income/**", INCOME_DIRECTION_MESSAGE],
    ),
  },

  {
    files: ["src/classification/**/*.ts"],
    rules: forbidImportsFrom(
      ["**/schedule/**", SEAM_MESSAGE],
      ["**/income/**", INCOME_DIRECTION_MESSAGE],
    ),
  },

  {
    // Income reads cadence definitions and primitives, and nothing else. It is
    // above schedule, so it may import it; classification is across the §8.10
    // seam either way.
    files: ["src/income/**/*.ts"],
    rules: forbidImportsFrom(["**/classification/**", SEAM_MESSAGE]),
  },
]);
