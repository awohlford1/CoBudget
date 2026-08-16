/**
 * Transition proration and deterministic category allocation (CBD-30).
 *
 * When a schedule change lands mid-period, the shortened transition period gets
 * a reduced share of each category's base target. Three approved invariants
 * govern the arithmetic, and they apply in this order:
 *
 * - **INV-35** fixes the ratio: transition calendar days over the calendar days
 *   in the complete new-schedule natural period containing those dates.
 * - **INV-37** rounds the *overall* prorated total, half-up, to the currency's
 *   supported precision — before any category is allocated.
 * - **INV-36** then divides that exact rounded total among the categories, with
 *   any smallest-unit discrepancy assigned by largest fractional remainder.
 *
 * The order is the whole point. Rounding each category first and summing gives a
 * total that disagrees with the headline figure, which is the specific defect
 * INV-36 exists to prevent.
 *
 * **On minor units and "supported precision".** Every amount here is an integer
 * count of the budget currency's minor unit — cents for USD, yen for JPY, fils
 * for BHD. That representation *is* INV-37's precision: rounding to a whole
 * minor unit is rounding to the currency's last supported digit. There is no
 * precision parameter because there is nothing left for one to decide, so
 * currencies with zero, two, and three fractional digits share a single code
 * path. Floating-point money never appears; the ratio is carried as an exact
 * integer numerator and denominator until the one rounding step.
 */

import type { Cadence } from "../schedule/definition.ts";
import { periodLengthInDays, type BudgetPeriod } from "../schedule/period.ts";
import { inclusiveDayCount } from "../shared/iso-date.ts";
import {
  validateBaseTargetSet,
  type BaseTarget,
  type BaseTargetSet,
  type CategoryId,
  type PeriodTarget,
} from "./definition.ts";

/**
 * Total ordering on category identity.
 *
 * Deliberately not `localeCompare`, which varies with the runtime's locale data
 * and would make allocation depend on where the code runs — the same class of
 * machine-dependent result that INV-87 forbids for dates. Plain relational
 * comparison on the identity string is absolute.
 */
function compareIds(a: CategoryId, b: CategoryId): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Establish that this proration stays inside exact integer arithmetic.
 *
 * This is a precondition for the whole calculation, not merely for the rounding
 * step that first needed it. `Math.floor(n / d)` and `n % d` are exact for safe
 * integers and lossy beyond them, so every floor and remainder below depends on
 * this having passed. Because the total is the sum of non-negative amounts, no
 * per-category product can exceed the total product — checking the total once
 * therefore covers every category, and no per-category check is needed.
 *
 * `2n + d` rather than `n` is the bound, because that is the largest
 * intermediate {@link roundHalfUp} forms. Rejecting a value that is safe as `n`
 * but not as `2n + d` costs nothing real: it would take a budget of roughly
 * forty-five trillion in major units to reach.
 */
function assertExactArithmetic(numerator: number, denominator: number): void {
  if (numerator < 0) {
    throw new RangeError(`proration requires a non-negative numerator, received ${numerator}`);
  }
  if (!Number.isSafeInteger(2 * numerator + denominator)) {
    throw new RangeError(
      `proration overflows exact integer arithmetic at ${numerator}/${denominator}. ` +
        "Amounts are whole minor units and must stay within the safe integer range.",
    );
  }
}

/**
 * Half-up rounding of a non-negative rational, in exact integer arithmetic.
 *
 * `floor((2n + d) / 2d)` is `floor(n/d + 1/2)`, which rounds a midpoint upward:
 * 0.5 becomes 1 and 1.5 becomes 2. That is INV-37's half-up rule rather than
 * banker's rounding, and doing it on integers avoids the binary-fraction error
 * that would make a value "exactly at the midpoint" land on either side
 * depending on the amount.
 *
 * Requires {@link assertExactArithmetic} to have passed for the same operands.
 */
function roundHalfUp(numerator: number, denominator: number): number {
  return Math.floor((2 * numerator + denominator) / (2 * denominator));
}

/** One category's exact share, split into whole units and the leftover fraction. */
interface Share {
  readonly target: BaseTarget;
  readonly floorUnits: number;
  readonly remainder: number;
}

/**
 * The prorated period targets for a transition period.
 *
 * `basis` is the complete new-schedule natural period containing the transition
 * — for a change effective June 17 under a monthly day-1 anchor, the transition
 * is June 17-30 and the basis is June 1-30, giving INV-35's documented 14/30.
 * Callers derive it with `periodContaining(newScheduleBoundaries,
 * transition.start)`.
 *
 * That derivation is not taken on trust. A transition runs to the day before the
 * next new-schedule boundary, and so does the natural period containing its
 * start, so the two must share an end date. Checking that catches a mismatched
 * pair however it was produced, which a helper that computed the basis here
 * could not do — a caller who computed it wrongly would simply not call the
 * helper.
 *
 * `scheduleCadence` must come from the authoritative schedule version, and must
 * match the base target set's own cadence. That comparison is what catches a
 * weekly set being spent against a monthly schedule, which INV-78 forbids
 * converting silently.
 *
 * The limit of that guard is worth stating rather than implying: a caller who
 * passes `baseTargets.cadence` here compares the value with itself and learns
 * nothing. The check catches a set fetched for the wrong context — the realistic
 * mistake — and cannot catch a caller who declines to consult the schedule at
 * all. Nothing available at this layer can, because the schedule version is not
 * an input to arithmetic over periods.
 *
 * A transition spanning the whole basis period is permitted and computes to the
 * identity. Whether a transition should have been created at all is INV-30's
 * question and belongs to schedule-change execution, not to arithmetic.
 */
export function prorateTransitionTargets(
  baseTargets: BaseTargetSet,
  scheduleCadence: Cadence,
  transition: BudgetPeriod,
  basis: BudgetPeriod,
): readonly PeriodTarget[] {
  validateBaseTargetSet(baseTargets);

  if (baseTargets.cadence !== scheduleCadence) {
    throw new RangeError(
      `base targets belong to the ${baseTargets.cadence} context but the schedule is ` +
        `${scheduleCadence}. Weekly and monthly base targets are separate contexts and a ` +
        "cadence change requires explicit target review, never a silent conversion (INV-78).",
    );
  }

  if (transition.end !== basis.end) {
    throw new RangeError(
      `transition ${transition.start}..${transition.end} and basis period ` +
        `${basis.start}..${basis.end} must share an end date. The basis is the complete ` +
        "new-schedule natural period containing the transition (INV-35).",
    );
  }

  const transitionDays = inclusiveDayCount(transition.start, transition.end);
  const basisDays = periodLengthInDays(basis);
  if (transitionDays > basisDays) {
    throw new RangeError(
      `transition of ${transitionDays} days exceeds its ${basisDays}-day basis period`,
    );
  }

  // Guarding the total product first is what makes every floor and remainder
  // below exact; see assertExactArithmetic. This call must stay above the share
  // loop, not merely above the rounding.
  const totalBase = baseTargets.targets.reduce((sum, target) => sum + target.amountMinorUnits, 0);
  const totalNumerator = totalBase * transitionDays;
  assertExactArithmetic(totalNumerator, basisDays);

  // INV-37: the overall total is rounded once, before any category is allocated.
  const roundedTotal = roundHalfUp(totalNumerator, basisDays);

  const shares: readonly Share[] = baseTargets.targets.map((target) => {
    const exact = target.amountMinorUnits * transitionDays;
    return {
      target,
      floorUnits: Math.floor(exact / basisDays),
      remainder: exact % basisDays,
    };
  });

  const allocatedFloor = shares.reduce((sum, share) => sum + share.floorUnits, 0);
  const deficit = roundedTotal - allocatedFloor;

  // Not defensive padding: these bounds are provable, so a violation means the
  // arithmetic above is wrong rather than the input. Each floor loses less than
  // one unit, so the deficit cannot exceed the category count, and half-up
  // rounding of a non-negative value never lands below the sum of the floors.
  if (deficit < 0 || deficit > shares.length) {
    throw new RangeError(
      `largest-remainder deficit ${deficit} is outside 0..${shares.length}; ` +
        "proration arithmetic is wrong",
    );
  }

  // INV-36: the leftover smallest units go to the largest fractional remainders.
  // Ties break on stable category identity, never on input order or label, which
  // is what makes reordering and renaming produce identical outcomes (INV-84).
  // A zero-remainder category can never be reached: the deficit is bounded by
  // the number of categories that have a remainder at all.
  const awarded = new Set<CategoryId>(
    shares
      .toSorted(
        (a, b) => b.remainder - a.remainder || compareIds(a.target.categoryId, b.target.categoryId),
      )
      .slice(0, deficit)
      .map((share) => share.target.categoryId),
  );

  return shares
    .toSorted((a, b) => compareIds(a.target.categoryId, b.target.categoryId))
    .map((share) => {
      const remainderUnitAwarded = awarded.has(share.target.categoryId);
      return {
        categoryId: share.target.categoryId,
        period: transition,
        origin: "prorated-transition",
        currency: baseTargets.currency,
        amountMinorUnits: share.floorUnits + (remainderUnitAwarded ? 1 : 0),
        calculation: {
          baseAmountMinorUnits: share.target.amountMinorUnits,
          transitionDays,
          basisDays,
          remainderUnitAwarded,
        },
      };
    });
}

/**
 * The period targets for a full period, which are the base amounts unchanged.
 *
 * This is INV-30's case: when a change takes effect on a date that is already a
 * natural boundary under the new cadence, a full period begins with full base
 * targets and no transition or proration is created. It is also every ordinary
 * period that no change touched.
 *
 * Results are ordered by category identity, matching
 * {@link prorateTransitionTargets}, so the two are directly comparable.
 */
export function fullPeriodTargets(
  baseTargets: BaseTargetSet,
  scheduleCadence: Cadence,
  period: BudgetPeriod,
): readonly PeriodTarget[] {
  validateBaseTargetSet(baseTargets);

  if (baseTargets.cadence !== scheduleCadence) {
    throw new RangeError(
      `base targets belong to the ${baseTargets.cadence} context but the schedule is ` +
        `${scheduleCadence} (INV-78).`,
    );
  }

  return baseTargets.targets
    .toSorted((a, b) => compareIds(a.categoryId, b.categoryId))
    .map((target) => ({
      categoryId: target.categoryId,
      period,
      origin: "full-period",
      currency: baseTargets.currency,
      amountMinorUnits: target.amountMinorUnits,
      calculation: null,
    }));
}
