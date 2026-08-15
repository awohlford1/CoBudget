/**
 * Shared income fixtures.
 *
 * Named `.test.ts` for the reason given in `schedule/fixtures.test.ts`, and
 * separate from that file because it returns an `IncomeSchedule`: putting this
 * alongside the cadence fixtures would make the schedule layer import the
 * income layer, which the dependency-direction lint rule forbids.
 */

import { paycheckDefinition, FRIDAY_WEEKLY } from "../schedule/fixtures.test.ts";
import type { PaycheckPattern } from "../schedule/definition.ts";
import type { IncomeSchedule } from "./schedule.ts";

/**
 * An active payroll schedule paying $2,000 in minor units.
 *
 * The amount is round on purpose: 200,000 has an exact 5%, which is what makes
 * CBD-101's tolerance boundary expressible without a fixture that quietly
 * depends on rounding.
 */
export function incomeSchedule(pattern: PaycheckPattern = FRIDAY_WEEKLY): IncomeSchedule {
  return {
    id: "payroll",
    name: "Payroll",
    recurrence: paycheckDefinition(pattern),
    projectedAmountMinorUnits: 200_000,
    active: true,
  };
}
