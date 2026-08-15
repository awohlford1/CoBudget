/**
 * Calendar dates for the budget domain.
 *
 * An `ISODate` is a calendar date with no time and no zone. That is not a
 * convenience — it is the type-level enforcement of two approved invariants:
 *
 * - CBD-69 INV-69-03: transaction time is never used to classify a transaction
 *   into a budget period.
 * - CBD-67 INV-07: once a budget date is established, a time-zone conversion
 *   must never move it to another calendar date.
 *
 * A value that cannot hold a time or an offset cannot violate either rule, so
 * the whole class of "we accidentally converted through a zone" bug becomes
 * unrepresentable rather than merely untested.
 *
 * Time zones enter the system in exactly one place: deciding which calendar
 * date "today" is in a budget space (CBD-67 INV-11). That resolution happens at
 * the edge and produces an `ISODate`, which is then passed inward. Nothing in
 * this module knows what a time zone is.
 */

declare const isoDateBrand: unique symbol;

/** A calendar date in `YYYY-MM-DD` form. Construct via {@link toISODate} or {@link isoDateOf}. */
export type ISODate = string & { readonly [isoDateBrand]: true };

/** The decomposed civil fields of an {@link ISODate}. `month` is 1-12, not 0-11. */
export interface DateParts {
  readonly year: number;
  readonly month: number;
  readonly day: number;
}

const MILLISECONDS_PER_DAY = 86_400_000;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/u;

/** `YYYY-MM-DD` can only render these years, so both constructors share the bound. */
export const MIN_YEAR = 1;
export const MAX_YEAR = 9999;

/**
 * The only two functions in the domain that touch `Date`, and they use nothing
 * but UTC accessors. Both are absolute: they produce identical results on every
 * machine in every zone, which is what CBD-67 INV-87 requires.
 *
 * Do not add a third. If you need more calendar arithmetic, build it from these.
 *
 * Note the deliberate avoidance of `Date.UTC`: it maps years 0-99 onto
 * 1900-1999, so `Date.UTC(50, 2, 10)` silently means 1950. `setUTCFullYear` has
 * no such legacy behaviour, and a silent 1,900-year shift is exactly the class
 * of wrong answer this module exists to make impossible.
 */
function toEpochDay(year: number, month: number, day: number): number {
  const utc = new Date(0);
  utc.setUTCFullYear(year, month - 1, day);
  return utc.getTime() / MILLISECONDS_PER_DAY;
}

function fromEpochDay(epochDay: number): DateParts {
  const utc = new Date(epochDay * MILLISECONDS_PER_DAY);
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: utc.getUTCDate(),
  };
}

/** True for a Gregorian leap year. */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Days in a given month, 28-31. Needed by the monthly-anchor clamping rule
 * (CBD-67 INV-18): an anchor of 31 in a 30-day month clamps to that month's
 * final valid day without changing the saved anchor.
 */
export function daysInMonth(year: number, month: number): number {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(`month must be an integer 1-12, received ${String(month)}`);
  }
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  // 30 days hath September, April, June, and November.
  return month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;
}

function isRealCalendarDate(year: number, month: number, day: number): boolean {
  // The year bound is shared with isoDateOf on purpose. A guard that admits
  // values its own constructor rejects is not a guard.
  if (year < MIN_YEAR || year > MAX_YEAR) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;
  return day <= daysInMonth(year, month);
}

/**
 * Narrowing guard. Rejects both malformed strings and well-formed impossible
 * ones: `2026-02-30` matches the pattern but is not a date, and accepting it
 * would let an unclassifiable value reach period assignment (INV-69-19).
 */
export function isISODate(value: string): value is ISODate {
  const match = ISO_DATE_PATTERN.exec(value);
  if (match === null) return false;

  // Capture groups 1-3 are guaranteed present by a successful match, but
  // noUncheckedIndexedAccess types them as possibly undefined, so check.
  const [, rawYear, rawMonth, rawDay] = match;
  if (rawYear === undefined || rawMonth === undefined || rawDay === undefined) return false;

  return isRealCalendarDate(Number(rawYear), Number(rawMonth), Number(rawDay));
}

/** Parse a `YYYY-MM-DD` string, throwing if it is not a real calendar date. */
export function toISODate(value: string): ISODate {
  if (!isISODate(value)) {
    throw new RangeError(`not a valid YYYY-MM-DD calendar date: ${JSON.stringify(value)}`);
  }
  return value;
}

/** Build an `ISODate` from civil fields, throwing if they do not name a real date. */
export function isoDateOf(year: number, month: number, day: number): ISODate {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new RangeError("year, month, and day must be integers");
  }
  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw new RangeError(
      `year must be ${MIN_YEAR}-${MAX_YEAR} to render as YYYY-MM-DD, received ${year}`,
    );
  }
  if (!isRealCalendarDate(year, month, day)) {
    throw new RangeError(`not a real calendar date: ${year}-${month}-${day}`);
  }
  const yyyy = String(year).padStart(4, "0");
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}` as ISODate;
}

/**
 * Decompose into civil fields.
 *
 * Fixed-offset slicing rather than a regex match: the format is fixed-width, so
 * this needs no type assertion. The earlier version asserted the match was
 * non-null, which would have produced silent `NaN` for any value that reached
 * here through a cast rather than a constructor.
 */
export function partsOf(date: ISODate): DateParts {
  return {
    year: Number(date.slice(0, 4)),
    month: Number(date.slice(5, 7)),
    day: Number(date.slice(8, 10)),
  };
}

/** The last calendar day of the month containing `date`. Supports the last-day monthly anchor. */
export function lastDayOfMonth(date: ISODate): ISODate {
  const { year, month } = partsOf(date);
  return isoDateOf(year, month, daysInMonth(year, month));
}

/** Shift by whole days. Negative values move backward. */
export function addDays(date: ISODate, days: number): ISODate {
  if (!Number.isInteger(days)) {
    throw new RangeError(`days must be an integer, received ${String(days)}`);
  }
  const { year, month, day } = partsOf(date);
  const shifted = fromEpochDay(toEpochDay(year, month, day) + days);
  return isoDateOf(shifted.year, shifted.month, shifted.day);
}

/** Total ordering: negative if `a` precedes `b`, zero if equal, positive if `a` follows `b`. */
export function compareDates(a: ISODate, b: ISODate): number {
  // ISO 8601 dates are zero-padded, so lexicographic order is chronological order.
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Exclusive day count: `b - a`. Zero when equal, negative when `b` precedes `a`. */
export function daysBetween(a: ISODate, b: ISODate): number {
  const from = partsOf(a);
  const to = partsOf(b);
  return toEpochDay(to.year, to.month, to.day) - toEpochDay(from.year, from.month, from.day);
}

/**
 * Inclusive day count across `[start, end]`, which is the calendar-day figure
 * CBD-67 uses throughout: period lengths (INV-05, inclusive boundaries) and the
 * proration numerator and denominator (INV-35). A single-day period counts 1,
 * not 0, so this is deliberately not `daysBetween`.
 */
export function inclusiveDayCount(start: ISODate, end: ISODate): number {
  const span = daysBetween(start, end);
  if (span < 0) {
    throw new RangeError(`end ${end} precedes start ${start}`);
  }
  return span + 1;
}
