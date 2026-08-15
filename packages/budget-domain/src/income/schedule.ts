/**
 * Income sources and the anchor selection that drives paycheck boundaries
 * (CBD-99, CBD-68 §7.1 and §8).
 *
 * CBD-68 §4 defines an income schedule as "recurrence and date-adjustment rules
 * that generate expected occurrences". That is exactly a validated paycheck
 * cadence, so {@link IncomeSchedule.recurrence} reuses `PaycheckDefinition`
 * rather than restating its pattern and policy fields. The reuse is
 * load-bearing rather than tidiness: only `validateCadenceDefinition` can mint
 * that brand, so a day-40 monthly anchor cannot reach an income schedule any
 * more than it can reach the generator.
 *
 * Three absences are deliberate.
 *
 * 1. **No currency.** §4 gives the *budget space* one authoritative currency, so
 *    a per-schedule currency would allow a set that disagrees with itself. Same
 *    argument that keeps the time zone out of `definition.ts`.
 * 2. **No end date, occurrence count, or expiry.** Every activated schedule
 *    repeats indefinitely until an authorized replacement is confirmed
 *    (INV-68-19, INV-68-20). `PaycheckDefinition` already has nowhere to put one,
 *    so this holds structurally rather than by validation.
 * 3. **No `disableAnchor` or `deleteSchedule` operation.** §8 requires disabling
 *    or deleting the current anchor to be blocked "until another valid anchor is
 *    selected as part of the same confirmed change". Validating the whole set at
 *    once makes that rule fall out instead of needing to be enforced: a
 *    candidate that drops or disables the anchor without naming a replacement
 *    fails validation, and there is no partially applied state in between
 *    (INV-68-15). A pair of narrower mutators would have to reconstruct that
 *    guarantee, and could be called in the wrong order.
 *
 * Not here: the schedule-change lifecycle — effective dates, preview,
 * confirmation, audit — which belongs to CBD-67 and CBD-28; occurrence and
 * boundary generation, which is CBD-29; and the expected-income lifecycle and
 * projected amounts over time, which is CBD-100.
 *
 * Nothing in this module accepts a transaction. That is what makes "an
 * unexpected deposit never becomes an anchor occurrence" (§8, INV-68-07) true by
 * construction rather than by a check that could be forgotten.
 */

import type { PaycheckDefinition } from "../schedule/paycheck-period.ts";
import type { ValidationIssue, ValidationResult } from "../schedule/validate.ts";

/**
 * One named income source and the rule that generates its expected paydays.
 *
 * `projectedAmountMinorUnits` is an integer count of the budget currency's
 * minor unit — 125000 for $1,250.00. Named for the unit rather than documented
 * as one, because a caller passing 1250.5 should be wrong at the call site and
 * not merely wrong in the totals.
 */
export interface IncomeSchedule {
  readonly id: string;
  readonly name: string;
  readonly recurrence: PaycheckDefinition;
  readonly projectedAmountMinorUnits: number;
  readonly active: boolean;
}

/**
 * Every income schedule in a budget space, and which one anchors the timeline.
 *
 * Held as one value rather than as separate schedules and an anchor pointer,
 * because the rule worth protecting is a relationship between them: exactly one
 * active schedule creates boundaries (INV-68-02) and every other is secondary
 * (INV-68-03). Split across two values, that relationship could be broken by
 * updating one without the other.
 */
export interface IncomeScheduleSet {
  readonly schedules: readonly IncomeSchedule[];
  readonly anchorId: string;
}

/**
 * Check a proposed set before it may be previewed or activated.
 *
 * Collects every issue rather than throwing on the first, for the reason given
 * in `validate.ts`: the interface needs all of them at once, each tied to a
 * field and a stable code.
 *
 * Pattern-level problems cannot appear here. They were rejected when the
 * `PaycheckDefinition` was validated, which is the only way to obtain one.
 */
export function validateIncomeScheduleSet(
  candidate: IncomeScheduleSet,
): ValidationResult<IncomeScheduleSet> {
  const issues: ValidationIssue[] = [];

  if (candidate.schedules.length === 0) {
    issues.push({
      code: "income.no-schedules",
      path: "schedules",
      message: "Add at least one income schedule.",
    });
  }

  const seenIds = new Set<string>();
  candidate.schedules.forEach((schedule, index) => {
    const path = `schedules.${index}`;

    if (schedule.id.trim().length === 0) {
      issues.push({
        code: "income.blank-id",
        path: `${path}.id`,
        message: "Every income schedule needs an identifier.",
      });
    } else if (seenIds.has(schedule.id)) {
      issues.push({
        code: "income.duplicate-id",
        path: `${path}.id`,
        message: `Two income schedules share the identifier ${JSON.stringify(schedule.id)}. Give each one its own.`,
      });
    } else {
      seenIds.add(schedule.id);
    }

    if (schedule.name.trim().length === 0) {
      issues.push({
        code: "income.blank-name",
        path: `${path}.name`,
        message: "Name this income schedule.",
      });
    }

    // §13.2 calculates its reconciliation tolerance against the expected amount
    // and requires it to be positive, so zero and negative are rejected here
    // rather than producing a tolerance of zero much later.
    if (
      !Number.isInteger(schedule.projectedAmountMinorUnits) ||
      schedule.projectedAmountMinorUnits <= 0
    ) {
      issues.push({
        code: "income.amount-not-positive",
        path: `${path}.projectedAmountMinorUnits`,
        message: "Enter an expected amount greater than zero.",
      });
    }
  });

  const anchors = candidate.schedules.filter((schedule) => schedule.id === candidate.anchorId);
  const [anchor] = anchors;

  if (anchor === undefined) {
    issues.push({
      code: "income.anchor-not-found",
      path: "anchorId",
      message: "Choose the paycheck schedule that sets your budget dates.",
    });
  } else if (!anchor.active) {
    // This is the §8 rule doing its work. Turning the anchor off, or removing it
    // outright, only passes when the same candidate names a replacement.
    issues.push({
      code: "income.anchor-inactive",
      path: "anchorId",
      message:
        "The paycheck schedule that sets your budget dates must be active. " +
        "Choose a different one, or turn this one back on.",
    });
  }

  return issues.length === 0 ? { ok: true, value: candidate } : { ok: false, issues };
}

/**
 * The schedule that creates period boundaries (INV-68-02).
 *
 * Throws rather than returning `undefined` for any state validation would have
 * rejected. An inactive anchor is called out separately because it is the one
 * case that would otherwise succeed quietly and generate a whole timeline from a
 * disabled income source — a plausible wrong answer rather than an obvious one.
 */
export function anchorSchedule(set: IncomeScheduleSet): IncomeSchedule {
  const matches = set.schedules.filter((schedule) => schedule.id === set.anchorId);
  const [anchor, ...duplicates] = matches;

  if (anchor === undefined || duplicates.length > 0) {
    throw new RangeError(
      `expected exactly one income schedule with id ${JSON.stringify(set.anchorId)}, found ` +
        `${matches.length}. Validate the set before reading its anchor.`,
    );
  }
  if (!anchor.active) {
    throw new RangeError(
      `income schedule ${JSON.stringify(set.anchorId)} is the anchor but is inactive, so its ` +
        "boundaries would come from a disabled source. Validate the set before reading its anchor.",
    );
  }
  return anchor;
}

/**
 * Every schedule that projects income without creating a boundary (INV-68-03).
 *
 * Named for `active` because that is the set a caller wants: projecting from a
 * disabled source would overstate expected income. Use `set.schedules` directly
 * to list everything for management.
 */
export function activeSecondarySchedules(set: IncomeScheduleSet): readonly IncomeSchedule[] {
  return set.schedules.filter((schedule) => schedule.active && schedule.id !== set.anchorId);
}
