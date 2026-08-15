/**
 * Weekly and monthly period generation (CBD-27).
 *
 * This is the weekly and monthly half of the CBD-67 §8.10 boundary adapter:
 * given a cadence definition and a budget-space date, return the natural
 * boundary at or before that date and the next boundary after it. CBD-29 will
 * supply the same contract for paycheck and fixed-length custom cadences.
 *
 * Everything here is a pure function of (definition, date). That is not a
 * stylistic preference — it is INV-22, which requires the active cycle to be
 * resolved from the authoritative budget-space date and schedule, and *never*
 * to depend on a user action or on a midnight activation job having completed.
 * A pure function cannot depend on a job that did not run, so the invariant
 * holds by construction rather than by operational discipline.
 *
 * Boundaries are inclusive at both ends (INV-05), periods are contiguous and
 * non-overlapping (INV-02), and every calendar date falls in exactly one period
 * (INV-04). Those three follow from a single rule applied consistently: a
 * period runs from its own boundary through the day before the next one.
 */

import {
  addDays,
  compareDates,
  dayOfWeekIndex,
  daysInMonth,
  inclusiveDayCount,
  isoDateOf,
  partsOf,
  type ISODate,
} from "../shared/iso-date.ts";
import {
  MAX_DAY_OF_MONTH,
  MIN_DAY_OF_MONTH,
  WEEKDAYS,
  type MonthlyAnchor,
} from "./definition.ts";
import type { ValidatedCadenceDefinition } from "./validate.ts";

/** One bounded planning period. Both ends are inclusive (CBD-67 INV-05). */
export interface BudgetPeriod {
  readonly start: ISODate;
  readonly end: ISODate;
}

/**
 * The cadences this module generates, and only after validation.
 *
 * Two constraints are encoded in this one type:
 *
 * 1. Paycheck and fixed-length custom cadences are CBD-29, so passing one here
 *    is a compile error and the CBD-27/CBD-29 split lives in the signature.
 * 2. The definition must carry the validation brand. Value ranges are not
 *    expressible in the type system — `MonthlyAnchor.day` is a plain `number`,
 *    so a day of 40 is type-valid — and an unvalidated definition previously
 *    produced a silently wrong boundary rather than an error.
 */
export type WeeklyOrMonthlyDefinition = Extract<
  ValidatedCadenceDefinition,
  { cadence: "weekly" } | { cadence: "monthly" }
>;

/**
 * Upper bound on a single generation request.
 *
 * Nothing in the specifications needs unbounded generation: the setup preview
 * is four periods (§5.4) and the change-preview horizon is the closing period
 * plus a transition plus three (INV-42). Without a cap, a count taken from user
 * input could stall a request — 200,000 periods take about a second. This is
 * roughly ten years of weekly periods, which is generous for any preview while
 * still making the abuse impossible.
 */
export const MAX_GENERATED_PERIODS = 512;

/** Shift a year/month pair by whole months, carrying across year boundaries. */
function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const monthsFromZero = year * 12 + (month - 1) + delta;
  return { year: Math.floor(monthsFromZero / 12), month: (monthsFromZero % 12) + 1 };
}

/**
 * The boundary a monthly anchor produces within one specific month.
 *
 * This is where CBD-67 INV-18 lives. A saved anchor of 31 yields February 28,
 * March 31, April 30 — clamped per month to that month's final valid day, while
 * the saved anchor itself is never rewritten. Because the anchor is consulted
 * fresh for every month, the schedule returns to the 31st automatically in the
 * next month that has one; there is no state to drift.
 *
 * The `last-day` anchor is deliberately a separate branch rather than "day 31".
 * They coincide in January and diverge in February, and conflating them would
 * lose the user's stated intent.
 */
function monthlyBoundaryWithin(year: number, month: number, anchor: MonthlyAnchor): ISODate {
  const lastValidDay = daysInMonth(year, month);
  if (anchor.kind === "last-day") {
    return isoDateOf(year, month, lastValidDay);
  }

  // Second layer of defence. The validation brand should make an out-of-range
  // anchor unreachable, but a cast can still forge one, and the failure mode
  // without this check is silent: Math.min(40, 31) quietly yields the 31st, so
  // a day-40 anchor produced a plausible-looking boundary instead of an error.
  // Loud and wrong beats quiet and wrong.
  if (
    !Number.isInteger(anchor.day) ||
    anchor.day < MIN_DAY_OF_MONTH ||
    anchor.day > MAX_DAY_OF_MONTH
  ) {
    throw new RangeError(
      `monthly anchor day must be an integer ${MIN_DAY_OF_MONTH}-${MAX_DAY_OF_MONTH}, received ${String(anchor.day)}. ` +
        "Validate the definition before generating periods.",
    );
  }

  return isoDateOf(year, month, Math.min(anchor.day, lastValidDay));
}

/**
 * The natural boundary falling on or before `date`.
 *
 * "On or before" rather than "before": a date that is itself a boundary starts
 * its own period, which is the start-inclusive convention INV-69-20 requires.
 */
export function boundaryAtOrBefore(
  definition: WeeklyOrMonthlyDefinition,
  date: ISODate,
): ISODate {
  if (definition.cadence === "weekly") {
    const anchorIndex = WEEKDAYS.indexOf(definition.anchor);
    // Same second layer as the monthly anchor. An unrecognised weekday makes
    // indexOf return -1, which the modular arithmetic below absorbs into a
    // one-day shift — every boundary silently off by one, no error anywhere.
    if (anchorIndex < 0) {
      throw new RangeError(
        `unrecognised weekday anchor ${JSON.stringify(definition.anchor)}. ` +
          "Validate the definition before generating periods.",
      );
    }
    const daysSinceAnchor = (((dayOfWeekIndex(date) - anchorIndex) % 7) + 7) % 7;
    return addDays(date, -daysSinceAnchor);
  }

  const { year, month } = partsOf(date);
  const thisMonth = monthlyBoundaryWithin(year, month, definition.anchor);
  if (compareDates(thisMonth, date) <= 0) {
    return thisMonth;
  }
  const previous = shiftMonth(year, month, -1);
  return monthlyBoundaryWithin(previous.year, previous.month, definition.anchor);
}

/** The next natural boundary strictly after `date`. */
export function nextBoundaryAfter(
  definition: WeeklyOrMonthlyDefinition,
  date: ISODate,
): ISODate {
  if (definition.cadence === "weekly") {
    return addDays(boundaryAtOrBefore(definition, date), 7);
  }

  const { year, month } = partsOf(date);
  const thisMonth = monthlyBoundaryWithin(year, month, definition.anchor);
  if (compareDates(thisMonth, date) > 0) {
    return thisMonth;
  }
  const next = shiftMonth(year, month, 1);
  return monthlyBoundaryWithin(next.year, next.month, definition.anchor);
}

/**
 * The period containing `date`.
 *
 * This is the function INV-22 is about. Resolving the active cycle means
 * calling this with today's budget-space date; there is no stored "current
 * period" to fall out of date and no job whose failure could leave the answer
 * wrong. Delayed or disabled background processing cannot change the result,
 * because the result is computed rather than looked up.
 */
export function periodContaining(
  definition: WeeklyOrMonthlyDefinition,
  date: ISODate,
): BudgetPeriod {
  return {
    start: boundaryAtOrBefore(definition, date),
    end: addDays(nextBoundaryAfter(definition, date), -1),
  };
}

/** The period immediately following `period` under the same definition. */
export function periodAfter(
  definition: WeeklyOrMonthlyDefinition,
  period: BudgetPeriod,
): BudgetPeriod {
  // Starting from the day after the current end guarantees contiguity (INV-02):
  // the next period begins on the calendar day after this one ends, by
  // construction rather than by arithmetic that could drift.
  return periodContaining(definition, addDays(period.end, 1));
}

/**
 * `count` consecutive periods beginning with the one containing `from`.
 *
 * Generated on demand rather than materialised and stored. INV-77 makes future
 * periods disposable derived data; only periods that have become current are
 * authoritative, and persisting a projection would create exactly the stale
 * authoritative record that invariant forbids.
 */
export function periodsFrom(
  definition: WeeklyOrMonthlyDefinition,
  from: ISODate,
  count: number,
): readonly BudgetPeriod[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError(`count must be a non-negative integer, received ${String(count)}`);
  }
  if (count > MAX_GENERATED_PERIODS) {
    throw new RangeError(
      `count must not exceed ${MAX_GENERATED_PERIODS}, received ${count}. ` +
        "Future periods are disposable derived data (INV-77); generate the horizon you need.",
    );
  }

  const periods: BudgetPeriod[] = [];
  let current = periodContaining(definition, from);
  for (let index = 0; index < count; index += 1) {
    periods.push(current);
    current = periodAfter(definition, current);
  }
  return periods;
}

/**
 * The setup preview: the complete current anchored period plus the next three
 * (CBD-67 §5.4).
 *
 * Note that the first period is the *complete* current one, so its start may
 * precede the budget's creation date — §5.2 requires exactly that, rather than
 * opening a partial period on the signup date.
 */
export const SETUP_PREVIEW_PERIOD_COUNT = 4;

export function setupPreview(
  definition: WeeklyOrMonthlyDefinition,
  budgetSpaceDate: ISODate,
): readonly BudgetPeriod[] {
  return periodsFrom(definition, budgetSpaceDate, SETUP_PREVIEW_PERIOD_COUNT);
}

/** Inclusive length of a period in calendar days. */
export function periodLengthInDays(period: BudgetPeriod): number {
  return inclusiveDayCount(period.start, period.end);
}

/** True when `date` falls within `period`, both ends inclusive. */
export function periodContains(period: BudgetPeriod, date: ISODate): boolean {
  return compareDates(date, period.start) >= 0 && compareDates(date, period.end) <= 0;
}
