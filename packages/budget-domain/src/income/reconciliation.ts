/**
 * Matching actual income against expected occurrences (CBD-101, CBD-68 §13).
 *
 * This module answers one question about one pair: how closely does this
 * received transaction correspond to this expectation? Deciding what to *do*
 * about it also depends on whether anything else competes for either side,
 * which is a property of the whole set rather than of a pair.
 *
 * **`exact` does not mean "reconcile it".** §13.2 permits an automatic match
 * only for "one unique eligible expected occurrence and one unique eligible
 * actual transaction ... with no competing candidate". Uniqueness is not
 * visible from a single pair, so {@link CandidateTier} reports how well the two
 * correspond and nothing more. The tier is named for the correspondence rather
 * than the outcome, so that nobody reads `exact` as permission.
 *
 * **The amount tolerance is integer arithmetic.** §13.2 defines it as
 * `absolute(actual − expected) ≤ absolute(expected) × 0.05` and requires
 * boundary equality to qualify, so the comparison is rearranged to
 * `difference × 100 ≤ expected × 5`.
 *
 * This is not fixing an observed bug. A probe compared both forms at the exact
 * boundary for every expected amount up to 4,000,000 minor units, and one unit
 * outside it up to 500,000, and found no disagreement — `0.05` rounds to a
 * double slightly *above* one twentieth, which happens to make the float form
 * inclusive exactly where §13.2 wants it. The integer form is used because it is
 * exact by construction rather than by that coincidence: it stays correct if the
 * tolerance changes, if amounts grow, or if a currency with different minor
 * units arrives, none of which the float form's accidental correctness survives
 * without re-checking.
 *
 * **Currency sits on the actual, not on the schedule.** CBD-68 §4 gives a budget
 * space one authoritative currency, which is why `IncomeSchedule` has no
 * currency field and must not gain one. Received money, by contrast, arrives in
 * whatever the payer sent. A mismatch fails the amount tolerance, which is
 * enough to keep it from ever reconciling or being suggested without inventing
 * a separate rule §13 does not state.
 *
 * **A skipped occurrence is not a candidate.** REC-05B is explicit: income
 * arriving after a skip "is unexpected actual income unless the user reverses
 * the skip and reconciles it". A Missing occurrence *is* still a candidate —
 * REC-05 has one reconcile in a later period — so absence and suppression are
 * treated differently.
 *
 * Not here: link records, ambiguity resolution, and rejection memory, which
 * need the whole candidate set; and permission, which is CBD-68 PD-68-12 at the
 * edge rather than a property of the match.
 */

import { addBusinessDays, businessDaysBetween } from "../schedule/business-day.ts";
import { compareDates, daysBetween, type ISODate } from "../shared/iso-date.ts";
import type { ExpectedOccurrence } from "./occurrence.ts";

/** §13.2: the window reaches five business days either side of the expectation. */
export const SUGGESTION_WINDOW_BUSINESS_DAYS = 5;

/** §13.2: the amount tolerance, as a whole percent of the expected amount. */
export const AMOUNT_TOLERANCE_PERCENT = 5;

/** One received transaction, as CBD-69 defines actual income (§13.1). */
export interface ActualIncome {
  readonly id: string;
  /** Posted, settled, or manually confirmed receipt date — never a pending one. */
  readonly receivedOn: ISODate;
  readonly amountMinorUnits: number;
  /** Compared against the budget space's currency; a mismatch never qualifies. */
  readonly currency: string;
}

/** What the domain cannot determine for itself about a candidate pair. */
export interface MatchContext {
  /** The budget space's one authoritative currency (CBD-68 §4). */
  readonly budgetCurrency: string;
  /**
   * Whether the payer identity behind the actual is compatible with the one
   * behind the expectation.
   *
   * Supplied rather than derived because §13 requires "compatible source
   * identity" without defining what makes two identities compatible — that is a
   * feed-matching heuristic over payer names and account numbers, not a rule
   * this module can honestly claim to implement. §13.2 says missing or weaker
   * identity "limits the result to a suggestion", so `false` covers both
   * unknown and mismatched.
   */
  readonly sourceCompatible: boolean;
}

/**
 * How closely one actual corresponds to one expectation, per the §13.3 matrix.
 *
 * - `exact` — same date, same amount, budget currency, compatible source. Row 1,
 *   and eligible for automatic reconciliation *if* it also proves unique.
 * - `suggested` — inside both tolerances but not exact. Row 2, always requires
 *   confirmation.
 * - `manual-only` — inside one tolerance and outside the other. Row 3: never
 *   offered, but reachable by an explicitly initiated search.
 * - `none` — outside both tolerances, or not a candidate at all.
 */
export type CandidateTier = "exact" | "suggested" | "manual-only" | "none";

/**
 * Whether an amount is within §13.2's tolerance of the expectation.
 *
 * Throws on a non-positive expected amount rather than answering, because
 * §13.2 states the expected amount must be positive and a tolerance computed
 * from zero would silently admit only an exact match while looking like a
 * tolerance check.
 */
export function withinAmountTolerance(
  expectedMinorUnits: number,
  actualMinorUnits: number,
): boolean {
  if (!Number.isInteger(expectedMinorUnits) || expectedMinorUnits <= 0) {
    throw new RangeError(
      `expected amount must be a positive integer of minor units, received ` +
        `${String(expectedMinorUnits)}. CBD-68 §13.2 requires it to be positive.`,
    );
  }
  if (!Number.isInteger(actualMinorUnits)) {
    throw new RangeError(
      `actual amount must be an integer of minor units, received ${String(actualMinorUnits)}.`,
    );
  }

  const difference = Math.abs(actualMinorUnits - expectedMinorUnits);
  return difference * 100 <= expectedMinorUnits * AMOUNT_TOLERANCE_PERCENT;
}

/**
 * Whether a receipt date falls in §13.2's window around the expected date.
 *
 * The endpoints are the fifth qualifying business day on each side, so the
 * sixth is outside by construction. Membership itself is a plain calendar-range
 * test: a weekend date between the endpoints is inside the window, because only
 * the *counting* excludes non-business days.
 */
export function withinDateWindow(expected: ISODate, receivedOn: ISODate): boolean {
  const earliest = addBusinessDays(expected, -SUGGESTION_WINDOW_BUSINESS_DAYS);
  const latest = addBusinessDays(expected, SUGGESTION_WINDOW_BUSINESS_DAYS);
  return compareDates(receivedOn, earliest) >= 0 && compareDates(receivedOn, latest) <= 0;
}

/**
 * How one actual corresponds to one expectation.
 *
 * Currency is folded into the amount tolerance rather than checked separately:
 * §13.2 says a currency mismatch "never qualifies", and failing the amount
 * tolerance is exactly what that means in matrix terms — never row 1 or row 2,
 * at most row 3 if the date happens to line up.
 */
export function classifyCandidate(
  occurrence: ExpectedOccurrence,
  actual: ActualIncome,
  context: MatchContext,
): CandidateTier {
  // REC-05B: a skipped expectation is not an eligible candidate at all, so
  // income arriving against it stays unexpected until the skip is reversed.
  if (occurrence.skipped) return "none";

  const currencyMatches = actual.currency === context.budgetCurrency;
  const amountQualifies =
    currencyMatches && withinAmountTolerance(occurrence.amountMinorUnits, actual.amountMinorUnits);
  const dateQualifies = withinDateWindow(occurrence.date, actual.receivedOn);

  if (!amountQualifies && !dateQualifies) return "none";
  if (!amountQualifies || !dateQualifies) return "manual-only";

  const sameDate = occurrence.date === actual.receivedOn;
  const sameAmount = occurrence.amountMinorUnits === actual.amountMinorUnits;
  if (sameDate && sameAmount && context.sourceCompatible) return "exact";

  return "suggested";
}

/**
 * The difference between what was expected and what arrived (§13.2).
 *
 * Signed from the expectation's point of view, so a late or larger receipt is
 * positive. REC-03 is the worked case: $2,000 expected 2026-08-21 against
 * $1,950 received 2026-08-24 gives +3 calendar days, +1 business day, −5,000
 * minor units, −2.5%.
 *
 * `percent` is a display figure and is the one value here computed in floating
 * point. It is deliberately not what {@link withinAmountTolerance} tests, so a
 * value that renders as exactly −5.00% still gets an exact integer decision.
 */
export interface MatchVariance {
  readonly calendarDays: number;
  readonly businessDays: number;
  readonly amountMinorUnits: number;
  readonly percent: number;
}

export function varianceOf(occurrence: ExpectedOccurrence, actual: ActualIncome): MatchVariance {
  if (!Number.isInteger(occurrence.amountMinorUnits) || occurrence.amountMinorUnits <= 0) {
    throw new RangeError(
      `expected amount must be a positive integer of minor units, received ` +
        `${String(occurrence.amountMinorUnits)}.`,
    );
  }

  const amountMinorUnits = actual.amountMinorUnits - occurrence.amountMinorUnits;
  return {
    calendarDays: daysBetween(occurrence.date, actual.receivedOn),
    businessDays: businessDaysBetween(occurrence.date, actual.receivedOn),
    amountMinorUnits,
    percent: (amountMinorUnits / occurrence.amountMinorUnits) * 100,
  };
}
