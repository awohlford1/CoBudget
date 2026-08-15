/**
 * Shared paycheck fixtures for the schedule tests, and for income tests that
 * need a validated cadence.
 *
 * The filename ends in `.test.ts` deliberately, despite holding no tests.
 * `barrel.test.ts` treats every other `.ts` file under `src/` as a module whose
 * exports must appear in a barrel, and test scaffolding has no business in the
 * package's public API. Naming it this way keeps it out of that check while
 * leaving it inside `src/`, so the lint rules — including the narrow test-only
 * exception for the validation brand — still cover it. The cost is one empty
 * file in the test run.
 *
 * Income fixtures live in `income/fixtures.test.ts` instead: anything returning
 * an `IncomeSchedule` would make the schedule layer import the income layer,
 * which the dependency-direction lint rule forbids. The split follows the
 * layering rather than taste.
 *
 * Glob patterns are spelled out in prose here on purpose — a doubled asterisk
 * followed by a slash closes a block comment, which is how this file first
 * failed to parse.
 */

import type { BusinessDayPolicy, PaycheckPattern } from "./definition.ts";
import type { PaycheckDefinition } from "./paycheck-period.ts";
import { validateCadenceDefinition } from "./validate.ts";

/** Every Friday. In August and September 2026 none of these is a holiday. */
export const FRIDAY_WEEKLY: PaycheckPattern = { kind: "weekly", weekday: "friday" };

/** The first of each month — the case where adjustment moves a date furthest. */
export const FIRST_OF_MONTH: PaycheckPattern = {
  kind: "monthly",
  anchor: { kind: "day-of-month", day: 1 },
};

/**
 * A validated paycheck cadence.
 *
 * Goes through `validateCadenceDefinition` rather than casting, because the
 * brand is the only thing standing between a generator and a value the type
 * system cannot check, and a fixture that forged one would test a state the
 * product cannot reach. A fixture that fails validation throws with the issue
 * codes, since that means the test's premise is wrong rather than its subject.
 */
export function paycheckDefinition(
  pattern: PaycheckPattern,
  businessDayPolicy: BusinessDayPolicy = "previous-business-day",
): PaycheckDefinition {
  const result = validateCadenceDefinition({ cadence: "paycheck", pattern, businessDayPolicy });
  if (!result.ok) {
    throw new Error(`fixture failed validation: ${result.issues.map((i) => i.code).join(", ")}`);
  }
  if (result.value.cadence !== "paycheck") throw new Error("fixture is not a paycheck cadence");
  return result.value;
}
