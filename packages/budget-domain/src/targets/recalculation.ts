/**
 * The transition-target recalculation decision (CBD-30).
 *
 * While a transition period is active its targets cannot be edited directly
 * (INV-53). Saving a base-target change instead forces one explicit decision:
 * recompute the transition from the new base plan, or leave it as it stands.
 * INV-56 routes category additions, archivals, and zeroing through the same
 * decision, which needs no separate path here because those changes arrive as a
 * different complete base target set.
 *
 * Two properties are structural rather than tested into place:
 *
 * - The choice is a required positional argument with no default value, so
 *   "explicit, non-default" (INV-53) cannot be satisfied by accident or silently
 *   regress into an implicit recalculation.
 * - Nothing here accepts a completed period or a schedule version. A function
 *   with no input for them cannot rewrite a completed period's targets (INV-79)
 *   or create a schedule version as a side effect of a target change (INV-56).
 */

import type { Cadence } from "../schedule/definition.ts";
import type { BudgetPeriod } from "../schedule/period.ts";
import { compareDates, type ISODate } from "../shared/iso-date.ts";
import type { BaseTargetSet, PeriodTarget } from "./definition.ts";
import { prorateTransitionTargets } from "./proration.ts";

export const TRANSITION_TARGET_CHOICES = ["recalculate", "leave-unchanged"] as const;

export type TransitionTargetChoice = (typeof TRANSITION_TARGET_CHOICES)[number];

/** Everything a recalculation needs, grouped so the choice stays the leading argument. */
export interface TransitionRecalculation {
  readonly baseTargets: BaseTargetSet;
  readonly newCadence: Cadence;
  readonly transition: BudgetPeriod;
  readonly basis: BudgetPeriod;
  readonly budgetSpaceDate: ISODate;
}

/**
 * Whether recalculation is still open on `budgetSpaceDate`.
 *
 * INV-55 keeps it available through the transition's final budget-space date and
 * rejects it after the next local midnight — so the deadline is the end of the
 * transition's last day, and the first date on which it is closed is the day
 * after `transition.end`.
 *
 * A date before the transition begins returns `true`. This predicate answers only
 * INV-55's deadline; whether a change has been confirmed and become authoritative
 * at all is the pending-change lifecycle, which is CBD-86 and CBD-87.
 */
export function recalculationAllowed(
  transition: BudgetPeriod,
  budgetSpaceDate: ISODate,
): boolean {
  return compareDates(budgetSpaceDate, transition.end) <= 0;
}

function samePeriod(a: BudgetPeriod, b: BudgetPeriod): boolean {
  return a.start === b.start && a.end === b.end;
}

/**
 * Apply a base-target change to an active transition under an explicit choice.
 *
 * `leave-unchanged` returns the current targets untouched. `recalculate`
 * recomputes the complete category set from the current base targets in one step
 * (INV-54) — a whole-set replacement rather than a per-category edit, so there is
 * no intermediate state in which some categories reflect the new plan and others
 * the old one.
 *
 * Recalculation past the INV-55 deadline throws rather than quietly returning the
 * existing targets. Both would leave the transition unchanged, but only one tells
 * the caller that the recalculation it asked for did not happen.
 */
export function applyBaseTargetChange(
  choice: TransitionTargetChoice,
  current: readonly PeriodTarget[],
  recalculation: TransitionRecalculation,
): readonly PeriodTarget[] {
  const { baseTargets, newCadence, transition, basis, budgetSpaceDate } = recalculation;

  const foreign = current.find((target) => !samePeriod(target.period, transition));
  if (foreign !== undefined) {
    throw new RangeError(
      `current target for category ${JSON.stringify(foreign.categoryId)} covers ` +
        `${foreign.period.start}..${foreign.period.end}, not the transition ` +
        `${transition.start}..${transition.end}`,
    );
  }

  if (choice === "leave-unchanged") {
    return current;
  }

  if (!recalculationAllowed(transition, budgetSpaceDate)) {
    throw new RangeError(
      `recalculation closed after ${transition.end}; budget-space date is ${budgetSpaceDate}. ` +
        "Recalculation remains available only through the transition's final date (INV-55).",
    );
  }

  return prorateTransitionTargets(baseTargets, newCadence, transition, basis);
}
