/**
 * Paycheck-anchored period generation (CBD-29, CBD-68 §7.3 and §9).
 *
 * A paycheck cadence derives its boundaries from an anchor income schedule:
 * period n runs from adjusted anchor date A[n] through the day before A[n+1],
 * inclusive (§7.3). Only the selected anchor schedule creates boundaries
 * (INV-68-02); secondary income never does (INV-68-03).
 *
 * **Why this module has a different shape to the other cadences.**
 *
 * Weekly, monthly, and fixed-length custom cadences expose boundary functions
 * that answer lazily for any date. Paycheck cannot, for two reasons that are
 * properties of the domain rather than of this code:
 *
 * 1. It is bounded by data availability. Business-day adjustment needs verified
 *    Federal Reserve holiday data, which covers a finite range, and §10.3
 *    requires blocking outside it rather than guessing.
 * 2. Boundary generation loses information. §9.2 deduplicates adjusted dates
 *    "for boundary creation" while step 9 separately retains "all source
 *    occurrences and adjustment provenance". Two paydays landing on the same
 *    adjusted date produce one boundary and two income events (INV-68-17,
 *    INV-68-16), so the mapping is many-to-one and no boundary can own the
 *    provenance of "its" occurrence.
 *
 * So this builds both views from a single pass over a stated horizon:
 * {@link buildPaycheckSchedule} returns boundaries and occurrences together.
 * They are consistent by construction rather than by a convention that a later
 * edit could break, and the horizon makes the coverage requirement explicit
 * instead of surfacing it as a failure deep inside a loop.
 */

import {
  addDays,
  compareDates,
  dayOfWeekIndex,
  daysBetween,
  daysInMonth,
  isoDateOf,
  partsOf,
  type ISODate,
} from "../shared/iso-date.ts";
import {
  adjustToBusinessDay,
  isYearCovered,
  HolidayCoverageError,
  type BusinessDayAdjustment,
} from "./business-day.ts";
import { WEEKDAYS, type MonthlyAnchor, type PaycheckPattern, type Weekday } from "./definition.ts";
import type { BoundaryFunctions } from "./period.ts";
import type { ValidatedCadenceDefinition } from "./validate.ts";

/** A validated paycheck cadence. Validation is required as for every generator. */
export type PaycheckDefinition = Extract<ValidatedCadenceDefinition, { cadence: "paycheck" }>;

/**
 * One expected payday, carrying the evidence CBD-68 §10.2 requires.
 *
 * Occurrences are retained even when two share an adjusted date, because
 * INV-68-16 requires same-date income events to keep distinct identities.
 */
export interface PaycheckOccurrence {
  /** The calendar anchor before business-day adjustment. */
  readonly unadjustedDate: ISODate;
  /** The date the payday is expected after adjustment. */
  readonly adjustedDate: ISODate;
  /** Full adjustment evidence: policy, reason, and holiday-dataset version. */
  readonly adjustment: BusinessDayAdjustment;
  /** True when a numbered monthly anchor was clamped to a shorter month. */
  readonly clampedFromDay: number | null;
}

/** Both views of a paycheck schedule, derived from one computation. */
export interface PaycheckSchedule {
  readonly boundaries: BoundaryFunctions;
  readonly occurrences: readonly PaycheckOccurrence[];
  /** Deduplicated adjusted dates, in order. These are the period boundaries. */
  readonly boundaryDates: readonly ISODate[];
  readonly horizon: PaycheckHorizon;
}

/** The inclusive date range a schedule is built for. */
export interface PaycheckHorizon {
  readonly from: ISODate;
  readonly through: ISODate;
}

function weekdayIndexOf(weekday: Weekday): number {
  const index = WEEKDAYS.indexOf(weekday);
  if (index < 0) {
    throw new RangeError(
      `unrecognised weekday ${JSON.stringify(weekday)}. Validate the definition first.`,
    );
  }
  return index;
}

/** The monthly anchor's calendar date within a month, clamped per INV-18. */
function monthlyAnchorIn(
  year: number,
  month: number,
  anchor: MonthlyAnchor,
): { date: ISODate; clampedFromDay: number | null } {
  const lastValidDay = daysInMonth(year, month);
  if (anchor.kind === "last-day") {
    return { date: isoDateOf(year, month, lastValidDay), clampedFromDay: null };
  }
  if (!Number.isInteger(anchor.day) || anchor.day < 1 || anchor.day > 31) {
    throw new RangeError(
      `monthly anchor day must be an integer 1-31, received ${String(anchor.day)}. ` +
        "Validate the definition before generating periods.",
    );
  }
  const clamped = Math.min(anchor.day, lastValidDay);
  return {
    date: isoDateOf(year, month, clamped),
    clampedFromDay: clamped === anchor.day ? null : anchor.day,
  };
}

/** The first occurrence of `weekday` on or after `from`. */
function firstWeekdayOnOrAfter(from: ISODate, weekday: Weekday): ISODate {
  const forward = (((weekdayIndexOf(weekday) - dayOfWeekIndex(from)) % 7) + 7) % 7;
  return addDays(from, forward);
}

/**
 * Unadjusted anchor dates within `[from, through]`, before sorting or
 * adjustment. This is steps 1 to 4 of the §9.2 pipeline.
 *
 * Interval patterns advance from the configured recurrence origin rather than
 * from the horizon, because §9.1 requires the cadence to be preserved from that
 * origin: a biweekly schedule advances 14 calendar days from its **unadjusted**
 * origin, and adjusting one occurrence never moves the origin.
 */
function unadjustedAnchors(
  pattern: PaycheckPattern,
  horizon: PaycheckHorizon,
): readonly { date: ISODate; clampedFromDay: number | null }[] {
  const plain = (date: ISODate) => ({ date, clampedFromDay: null });
  const results: { date: ISODate; clampedFromDay: number | null }[] = [];

  const collectInterval = (origin: ISODate, strideDays: number): void => {
    // Walk in whole strides from the configured recurrence origin, never from
    // the horizon. §9.1 requires the cadence to be preserved from that origin,
    // so a biweekly schedule advances 14 days from it regardless of which
    // window is being generated. Floor division handles an origin that falls
    // after the horizon start.
    const wholeStrides = Math.floor(daysBetween(origin, horizon.from) / strideDays);
    let current = addDays(origin, wholeStrides * strideDays);
    if (compareDates(current, horizon.from) < 0) {
      current = addDays(current, strideDays);
    }
    while (compareDates(current, horizon.through) <= 0) {
      results.push(plain(current));
      current = addDays(current, strideDays);
    }
  };

  switch (pattern.kind) {
    case "weekly": {
      let current = firstWeekdayOnOrAfter(horizon.from, pattern.weekday);
      while (compareDates(current, horizon.through) <= 0) {
        results.push(plain(current));
        current = addDays(current, 7);
      }
      break;
    }
    case "twice-per-week": {
      for (const weekday of pattern.weekdays) {
        let current = firstWeekdayOnOrAfter(horizon.from, weekday);
        while (compareDates(current, horizon.through) <= 0) {
          results.push(plain(current));
          current = addDays(current, 7);
        }
      }
      break;
    }
    case "every-two-weeks":
      collectInterval(pattern.recurrenceOrigin, 14);
      break;
    case "custom-weekly-interval":
      collectInterval(pattern.recurrenceOrigin, pattern.everyWeeks * 7);
      break;
    case "monthly":
    case "twice-per-month": {
      const anchors = pattern.kind === "monthly" ? [pattern.anchor] : pattern.anchors;
      // Start a month early so an anchor clamped backwards still lands in range.
      const start = partsOf(horizon.from);
      const end = partsOf(horizon.through);
      const firstMonth = start.year * 12 + (start.month - 1);
      const lastMonth = end.year * 12 + (end.month - 1);
      for (let cursor = firstMonth; cursor <= lastMonth; cursor += 1) {
        const year = Math.floor(cursor / 12);
        const month = (cursor % 12) + 1;
        for (const anchor of anchors) {
          const resolved = monthlyAnchorIn(year, month, anchor);
          if (
            compareDates(resolved.date, horizon.from) >= 0 &&
            compareDates(resolved.date, horizon.through) <= 0
          ) {
            results.push(resolved);
          }
        }
      }
      break;
    }
  }

  return results;
}

function assertHorizonCovered(horizon: PaycheckHorizon): void {
  const first = partsOf(horizon.from).year;
  const last = partsOf(horizon.through).year;
  if (compareDates(horizon.from, horizon.through) > 0) {
    throw new RangeError(`horizon end ${horizon.through} precedes start ${horizon.from}`);
  }
  for (let year = first; year <= last; year += 1) {
    if (!isYearCovered(year)) {
      throw new HolidayCoverageError(year);
    }
  }
}

/**
 * Build a paycheck schedule over a stated horizon.
 *
 * Implements the §9.2 ordering exactly: generate calendar anchors, clamp a
 * numbered anchor that does not exist, sort unadjusted dates, apply the
 * business-day policy, sort adjusted dates, deduplicate for boundary creation,
 * and retain every source occurrence with its adjustment provenance.
 *
 * Coverage is checked up front so an uncovered year fails at the point the
 * caller chose the horizon, rather than partway through a later query.
 */
export function buildPaycheckSchedule(
  definition: PaycheckDefinition,
  horizon: PaycheckHorizon,
): PaycheckSchedule {
  assertHorizonCovered(horizon);

  // Steps 1-4: generate calendar anchors, clamping numbered anchors as needed.
  const anchors = unadjustedAnchors(definition.pattern, horizon);

  // Step 5: sort unadjusted dates before adjusting, so the policy is applied in
  // calendar order rather than in pattern-emission order.
  const sortedAnchors = [...anchors].sort((a, b) => compareDates(a.date, b.date));

  // Step 6: apply the business-day policy. Step 9: retain every occurrence.
  const occurrences: PaycheckOccurrence[] = sortedAnchors.map((anchor) => {
    const adjustment = adjustToBusinessDay(anchor.date, definition.businessDayPolicy);
    return {
      unadjustedDate: anchor.date,
      adjustedDate: adjustment.adjustedDate,
      adjustment,
      clampedFromDay: anchor.clampedFromDay,
    };
  });

  // Step 7: sort adjusted dates. Adjustment can reorder two anchors that were
  // adjacent, so this cannot be folded into the earlier sort.
  const sortedOccurrences = [...occurrences].sort((a, b) =>
    compareDates(a.adjustedDate, b.adjustedDate),
  );

  // Step 8: deduplicate for boundary creation only. Two paydays on the same
  // adjusted date produce one boundary and stay two occurrences (INV-68-17,
  // INV-68-16), which is why a zero-day period can never arise.
  const boundaryDates: ISODate[] = [];
  for (const occurrence of sortedOccurrences) {
    if (boundaryDates.at(-1) !== occurrence.adjustedDate) {
      boundaryDates.push(occurrence.adjustedDate);
    }
  }

  return {
    boundaries: boundaryFunctionsFor(boundaryDates, horizon),
    occurrences: sortedOccurrences,
    boundaryDates,
    horizon,
  };
}

/**
 * Boundary functions backed by a materialised, deduplicated date list.
 *
 * Throws outside the generated range rather than extrapolating. Unlike the other
 * cadences, a paycheck boundary cannot be derived from arithmetic alone — it
 * depends on holiday data — so answering beyond the horizon would mean
 * inventing one.
 */
function boundaryFunctionsFor(
  boundaryDates: readonly ISODate[],
  horizon: PaycheckHorizon,
): BoundaryFunctions {
  const outOfRange = (date: ISODate, which: string): never => {
    throw new RangeError(
      `no ${which} boundary for ${date}: the paycheck schedule was built for ` +
        `${horizon.from}..${horizon.through} and generated ${boundaryDates.length} boundaries. ` +
        "Rebuild with a horizon that covers the dates you need.",
    );
  };

  return {
    boundaryAtOrBefore: (date) => {
      let found: ISODate | undefined;
      for (const boundary of boundaryDates) {
        if (compareDates(boundary, date) <= 0) {
          found = boundary;
        } else {
          break;
        }
      }
      return found ?? outOfRange(date, "preceding");
    },
    nextBoundaryAfter: (date) => {
      for (const boundary of boundaryDates) {
        if (compareDates(boundary, date) > 0) {
          return boundary;
        }
      }
      return outOfRange(date, "following");
    },
  };
}
