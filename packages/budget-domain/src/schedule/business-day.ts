/**
 * Federal Reserve business days and non-business-day adjustment (CBD-68 §10).
 *
 * CBD-68 §10.1 is explicit that this is the **Federal Reserve Financial
 * Services** schedule and not the OPM federal-employee calendar, "because its
 * closure rules can differ from Federal Reserve banking operations". The
 * difference is not academic: OPM gives employees the preceding Friday off when
 * a holiday falls on a Saturday, while Federal Reserve Banks stay open that
 * Friday. Using the wrong calendar would move real paydays.
 *
 * The confirmed weekend rule is asymmetric:
 *
 * - A holiday on **Saturday** leaves the preceding Friday a business day, so it
 *   produces no weekday closure at all.
 * - A holiday on **Sunday** closes the following Monday, so that Monday is not
 *   a business day.
 *
 * Only the five fixed-date holidays can land on a weekend; the six floating
 * ones are defined as a weekday and never move.
 *
 * **Coverage is deliberately bounded.** PD-68-05 requires a verified dataset and
 * states that an uncovered year must block confirmation and "not silently use
 * weekday-only logic". The dates here are computed rather than transcribed, but
 * they are only offered for years that have been checked against the published
 * schedule — {@link FEDERAL_RESERVE_CALENDAR}. Asking about an uncovered year
 * throws rather than guessing, because a plausible wrong payday is worse than a
 * refusal. The Federal Reserve itself publishes only a rolling five-year window,
 * so no implementation can be unbounded. Advancing coverage is tracked in
 * CBD-98.
 *
 * One consequence of bounded coverage is worth stating rather than discovering:
 * adjusting **backward** from the first days of the earliest covered year
 * crosses into an uncovered year and throws. January 1 2026 is both a holiday
 * and the start of the window, so `previous-business-day` cannot be applied to
 * it — answering would mean asserting something about December 31 2025 that has
 * not been verified. Forward adjustment from the same date is fine. This is the
 * bounded-coverage rule working as specified, not a defect, but it does narrow
 * the usable range slightly at the lower edge.
 */

import {
  addDays,
  dayOfWeekIndex,
  daysInMonth,
  isoDateOf,
  partsOf,
  toISODate,
  type ISODate,
} from "../shared/iso-date.ts";
import type { BusinessDayPolicy } from "./definition.ts";

const MONDAY = 0;
const THURSDAY = 3;
const SATURDAY = 5;
const SUNDAY = 6;

/**
 * Provenance for the holiday data, required by CBD-68 §10.2 and §10.3, which
 * ask for the source, the covered years, a dataset version, and a verification
 * date. Exposed as data so a consumer can record which calendar produced a
 * stored adjustment.
 */
export interface HolidayCalendarProvenance {
  readonly source: string;
  readonly datasetVersion: string;
  readonly verifiedFrom: number;
  readonly verifiedThrough: number;
  readonly verifiedOn: ISODate;
}

export const FEDERAL_RESERVE_CALENDAR: HolidayCalendarProvenance = {
  source: "Federal Reserve Financial Services standard holiday schedule",
  datasetVersion: "frfs-2026-2030",
  verifiedFrom: 2026,
  verifiedThrough: 2030,
  verifiedOn: toISODate("2026-08-14"),
};

/** A named Federal Reserve holiday on a specific calendar date. */
export interface FederalReserveHoliday {
  readonly date: ISODate;
  readonly name: string;
}

/** Thrown when holiday data is requested for a year outside verified coverage. */
export class HolidayCoverageError extends RangeError {
  readonly year: number;

  constructor(year: number) {
    super(
      `Federal Reserve holiday data is verified for ${FEDERAL_RESERVE_CALENDAR.verifiedFrom}-` +
        `${FEDERAL_RESERVE_CALENDAR.verifiedThrough} only; ${year} is not covered. ` +
        "Confirmation is blocked for schedules requiring holiday adjustment (CBD-68 §10.3). " +
        "Extend and re-verify the calendar rather than falling back to weekday-only logic.",
    );
    this.name = "HolidayCoverageError";
    this.year = year;
  }
}

export function isYearCovered(year: number): boolean {
  return (
    year >= FEDERAL_RESERVE_CALENDAR.verifiedFrom && year <= FEDERAL_RESERVE_CALENDAR.verifiedThrough
  );
}

function assertYearCovered(year: number): void {
  if (!isYearCovered(year)) {
    throw new HolidayCoverageError(year);
  }
}

/** The `n`th occurrence of a weekday in a month, 1-indexed. */
function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): ISODate {
  const firstOfMonth = isoDateOf(year, month, 1);
  const offsetToFirst = (((weekday - dayOfWeekIndex(firstOfMonth)) % 7) + 7) % 7;
  return isoDateOf(year, month, 1 + offsetToFirst + (n - 1) * 7);
}

/** The final occurrence of a weekday in a month. */
function lastWeekdayOfMonth(year: number, month: number, weekday: number): ISODate {
  const lastOfMonth = isoDateOf(year, month, daysInMonth(year, month));
  const daysBack = (((dayOfWeekIndex(lastOfMonth) - weekday) % 7) + 7) % 7;
  return addDays(lastOfMonth, -daysBack);
}

/**
 * The eleven Federal Reserve holidays for a covered year, in calendar order.
 *
 * These are the dates the holiday *falls* on, before any weekend observance.
 * Observance is applied by {@link isBusinessDay}, because a Sunday holiday
 * closes a different day than the one the holiday names.
 */
export function federalReserveHolidays(year: number): readonly FederalReserveHoliday[] {
  assertYearCovered(year);
  return [
    { date: isoDateOf(year, 1, 1), name: "New Year's Day" },
    { date: nthWeekdayOfMonth(year, 1, MONDAY, 3), name: "Martin Luther King, Jr. Day" },
    { date: nthWeekdayOfMonth(year, 2, MONDAY, 3), name: "Washington's Birthday" },
    { date: lastWeekdayOfMonth(year, 5, MONDAY), name: "Memorial Day" },
    { date: isoDateOf(year, 6, 19), name: "Juneteenth National Independence Day" },
    { date: isoDateOf(year, 7, 4), name: "Independence Day" },
    { date: nthWeekdayOfMonth(year, 9, MONDAY, 1), name: "Labor Day" },
    { date: nthWeekdayOfMonth(year, 10, MONDAY, 2), name: "Columbus Day" },
    { date: isoDateOf(year, 11, 11), name: "Veterans Day" },
    { date: nthWeekdayOfMonth(year, 11, THURSDAY, 4), name: "Thanksgiving Day" },
    { date: isoDateOf(year, 12, 25), name: "Christmas Day" },
  ];
}

/** Why a date is not a business day. `null` means it is one. */
export type NonBusinessDayReason =
  | { readonly kind: "weekend" }
  | { readonly kind: "holiday"; readonly holiday: string }
  | { readonly kind: "holiday-observed"; readonly holiday: string };

/**
 * Why `date` is not a business day, or `null` if it is.
 *
 * The `holiday-observed` case is the Sunday rule: the Monday after a Sunday
 * holiday is closed even though the holiday itself falls on the Sunday. There is
 * no matching Saturday case, because Federal Reserve Banks remain open on the
 * preceding Friday.
 */
export function nonBusinessDayReason(date: ISODate): NonBusinessDayReason | null {
  const { year } = partsOf(date);
  assertYearCovered(year);

  const weekday = dayOfWeekIndex(date);
  if (weekday === SATURDAY || weekday === SUNDAY) {
    return { kind: "weekend" };
  }

  const holidays = federalReserveHolidays(year);
  const onThisDate = holidays.find((holiday) => holiday.date === date);
  if (onThisDate !== undefined) {
    return { kind: "holiday", holiday: onThisDate.name };
  }

  if (weekday === MONDAY) {
    const previousDay = addDays(date, -1);
    // The Sunday before a Monday can belong to the previous year, so consult
    // that year's list rather than assuming both fall in the same one.
    const sundayYear = partsOf(previousDay).year;
    if (isYearCovered(sundayYear)) {
      const observed = federalReserveHolidays(sundayYear).find(
        (holiday) => holiday.date === previousDay,
      );
      if (observed !== undefined) {
        return { kind: "holiday-observed", holiday: observed.name };
      }
    }
  }

  return null;
}

/** True when Federal Reserve Banks are open on `date`. */
export function isBusinessDay(date: ISODate): boolean {
  return nonBusinessDayReason(date) === null;
}

/**
 * The evidence CBD-68 §10.2 requires every adjusted occurrence to retain.
 *
 * Returned rather than a bare date because §10.2 lists the unadjusted date, the
 * adjusted date, the policy used, the reason when adjustment occurs, and the
 * holiday-data version. Schedule version and occurrence-exception reference
 * belong to the occurrence that owns this adjustment, not to the calendar.
 */
export interface BusinessDayAdjustment {
  readonly unadjustedDate: ISODate;
  readonly adjustedDate: ISODate;
  readonly policy: BusinessDayPolicy;
  readonly reason: NonBusinessDayReason | null;
  readonly datasetVersion: string;
}

/**
 * Guard against an unbounded walk if the calendar were ever misconfigured.
 *
 * Exported because it is also the *reach* of adjustment: no policy can move a
 * date further than this, so a caller generating anchors for a date window must
 * look this far outside it to find every anchor that could adjust into range.
 * {@link adjustToBusinessDay} throws rather than exceeding it.
 */
export const MAX_ADJUSTMENT_STEPS = 14;

/**
 * Apply a non-business-day policy, retaining the evidence of what happened.
 *
 * `keep-original-date` records the reason without moving the date, so a caller
 * can still show why a payday lands on a weekend or holiday.
 */
export function adjustToBusinessDay(
  date: ISODate,
  policy: BusinessDayPolicy,
): BusinessDayAdjustment {
  const reason = nonBusinessDayReason(date);
  const base = {
    unadjustedDate: date,
    policy,
    reason,
    datasetVersion: FEDERAL_RESERVE_CALENDAR.datasetVersion,
  } as const;

  if (reason === null || policy === "keep-original-date") {
    return { ...base, adjustedDate: date };
  }

  const step = policy === "previous-business-day" ? -1 : 1;
  let candidate = date;
  for (let taken = 0; taken < MAX_ADJUSTMENT_STEPS; taken += 1) {
    candidate = addDays(candidate, step);
    if (isBusinessDay(candidate)) {
      return { ...base, adjustedDate: candidate };
    }
  }

  // Unreachable with a correct calendar: the longest real run of consecutive
  // non-business days is four. Throwing beats looping or returning a wrong date.
  throw new RangeError(
    `no business day found within ${MAX_ADJUSTMENT_STEPS} days of ${date} under policy ${policy}`,
  );
}
