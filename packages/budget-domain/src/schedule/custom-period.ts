/**
 * Fixed-length custom cadence generation (CBD-29, CBD-68 §14).
 *
 * A custom cadence is one inclusive start boundary and one fixed length from 1
 * to 366 calendar days, repeating indefinitely (INV-68-12). It is deliberately
 * not an arbitrary period-construction engine: PD-68-14 replaced the earlier
 * hand-authored-rows model, and §14.1 rejects period lists, one-time schedules,
 * end dates, and repetition counts. Those are deferred as FF-010.
 *
 * That restriction is what makes the generator trivially correct. CBD-68 §14.2
 * observes that this rule "cannot create gaps, overlaps, duplicate rows,
 * unsorted rows, or silent truncation" — not because the code is careful, but
 * because a start plus a constant stride has nowhere to put such a defect.
 */

import { addDays, daysBetween, type ISODate } from "../shared/iso-date.ts";
import { MAX_CUSTOM_PERIOD_DAYS, MIN_CUSTOM_PERIOD_DAYS } from "./definition.ts";
import type { BoundaryFunctions } from "./period.ts";
import type { ValidatedCadenceDefinition } from "./validate.ts";

/** A validated custom cadence. Validation is required for the same reason as CBD-27. */
export type CustomFixedLengthDefinition = Extract<
  ValidatedCadenceDefinition,
  { cadence: "custom-fixed-length" }
>;

function assertUsableLength(lengthInDays: number): void {
  // Second layer behind the validation brand, matching the weekly and monthly
  // generators. A non-integer or zero length would make the stride arithmetic
  // below produce nonsense rather than fail, and a negative one would walk
  // backwards forever.
  if (
    !Number.isInteger(lengthInDays) ||
    lengthInDays < MIN_CUSTOM_PERIOD_DAYS ||
    lengthInDays > MAX_CUSTOM_PERIOD_DAYS
  ) {
    throw new RangeError(
      `custom period length must be an integer ${MIN_CUSTOM_PERIOD_DAYS}-${MAX_CUSTOM_PERIOD_DAYS}, ` +
        `received ${String(lengthInDays)}. Validate the definition before generating periods.`,
    );
  }
}

/**
 * The boundary at or before `date` under a fixed-length rule.
 *
 * Uses floor division so the arithmetic is correct for dates before the start
 * boundary as well as after it. Extrapolating backwards is deliberate: the
 * adapter answers only where boundaries fall under this rule, and bounding that
 * to the interval a schedule version actually governed is CBD-28's concern, not
 * this function's. Weekly and monthly behave the same way — every date has a
 * preceding Monday, whether or not a budget existed then.
 */
function boundaryAtOrBeforeUnchecked(
  definition: CustomFixedLengthDefinition,
  date: ISODate,
): ISODate {
  const elapsed = daysBetween(definition.startBoundary, date);
  const periodIndex = Math.floor(elapsed / definition.lengthInDays);
  return addDays(definition.startBoundary, periodIndex * definition.lengthInDays);
}

export function customBoundaryAtOrBefore(
  definition: CustomFixedLengthDefinition,
  date: ISODate,
): ISODate {
  assertUsableLength(definition.lengthInDays);
  return boundaryAtOrBeforeUnchecked(definition, date);
}

/** The next boundary strictly after `date`. */
export function customNextBoundaryAfter(
  definition: CustomFixedLengthDefinition,
  date: ISODate,
): ISODate {
  assertUsableLength(definition.lengthInDays);
  return addDays(boundaryAtOrBeforeUnchecked(definition, date), definition.lengthInDays);
}

/**
 * The fixed-length custom implementation of {@link BoundaryFunctions}, which is
 * the boundary-generating element of the CBD-67 §8.10 contract and not the whole
 * of it — see the interface for what remains unbuilt.
 *
 * Plugs into exactly the same period helpers as weekly and monthly, so
 * containment, contiguity, and previews need no cadence-specific handling.
 *
 * The length is validated once here rather than on every call. The definition is
 * captured and cannot change afterwards, so re-checking inside each closure
 * would be repeated work rather than defence. The exported functions above keep
 * their own checks, because they are separate entry points.
 */
export function customBoundaries(definition: CustomFixedLengthDefinition): BoundaryFunctions {
  assertUsableLength(definition.lengthInDays);
  return {
    boundaryAtOrBefore: (date) => boundaryAtOrBeforeUnchecked(definition, date),
    nextBoundaryAfter: (date) =>
      addDays(boundaryAtOrBeforeUnchecked(definition, date), definition.lengthInDays),
  };
}
