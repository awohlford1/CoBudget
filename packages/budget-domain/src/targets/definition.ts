/**
 * Category spending targets (CBD-30).
 *
 * Two record types that CBD-67 INV-79 requires be kept distinct:
 *
 * - A **base target** is the standing plan for a category under one cadence
 *   context. It is what a user edits.
 * - A **period target** is the amount that actually governed one specific
 *   period. It is derived from a base target, and once its period completes it
 *   never changes again, no matter how the base plan later evolves.
 *
 * Collapsing the two would make INV-79 unholdable: a completed period's history
 * would silently rewrite itself the next time someone adjusted a base target.
 *
 * Two absences here are deliberate:
 *
 * 1. There is no rollover, carry-forward, or available-to-assign field. INV-57
 *    forbids any amount being calculated, suggested, linked, or labelled as
 *    rollover, and FF-003 defers the capability entirely. `no-rollover.test.ts`
 *    fails the build if the vocabulary reappears.
 * 2. There is no transaction or bill input anywhere in this module. INV-09
 *    states that actual transactions and bills are never prorated; a module that
 *    cannot see one cannot prorate one.
 */

import type { Cadence } from "../schedule/definition.ts";
import type { BudgetPeriod } from "../schedule/period.ts";

/**
 * A category's stable, budget-scoped identity (INV-84).
 *
 * An alias rather than a brand. The ISODate brand exists because `2026-02-30`
 * is a well-formed string that is not a date, so validity needs a constructor to
 * enforce; a category identity has no such internal rule. What INV-84 actually
 * requires is that rounding never depend on a mutable label or on input
 * ordering, and that is enforced where it can be — by tie-breaking and ordering
 * results on this field rather than on position or name.
 */
export type CategoryId = string;

/**
 * A standing planned amount for one category, in the budget currency's minor
 * units.
 *
 * Zero is a legitimate value, not a missing one: INV-54 recomputes from "all
 * current zero-or-positive base targets", so a category the user has zeroed
 * stays in the set and contributes zero.
 */
export interface BaseTarget {
  readonly categoryId: CategoryId;
  readonly amountMinorUnits: number;
}

/**
 * The complete set of base targets for one cadence context (INV-78).
 *
 * The cadence lives on the set rather than on each target, which makes a set
 * mixing weekly and monthly targets unrepresentable rather than merely invalid.
 * INV-78 requires weekly and monthly base targets to be separate contexts with
 * no silent four-week conversion between them, and the conversion it forbids is
 * only expressible if a single set can hold both.
 *
 * The set is complete by contract. INV-54 requires recalculation to recompute
 * the *entire* category set atomically, so a partial set is not a smaller valid
 * input — it is a wrong one, and would silently drop categories from the total.
 */
export interface BaseTargetSet {
  readonly cadence: Cadence;
  readonly currency: string;
  readonly targets: readonly BaseTarget[];
}

/**
 * How a period target's amount was arrived at, which INV-79 requires a period
 * target to retain.
 *
 * `full-period` covers both an ordinary period and the INV-30 case where a
 * change lands exactly on a natural boundary, so a full period begins with full
 * base targets and no proration happens at all.
 */
export const TARGET_ORIGINS = ["full-period", "prorated-transition"] as const;

export type TargetOrigin = (typeof TARGET_ORIGINS)[number];

/**
 * The calculation history INV-79 requires, recorded in enough detail to
 * reproduce the amount without re-deriving the periods.
 *
 * `remainderUnitAwarded` is what makes the record complete. Without it the
 * stored amount cannot be re-derived from the other fields alone, because the
 * final smallest-unit adjustment under INV-36 depends on how this category's
 * fractional remainder compared with every other category's — information that
 * exists only during the allocation and is otherwise lost.
 */
export interface ProrationRecord {
  readonly baseAmountMinorUnits: number;
  readonly transitionDays: number;
  readonly basisDays: number;
  readonly remainderUnitAwarded: boolean;
}

/**
 * The amount that governed one category for one specific period.
 *
 * Every field is `readonly`, and `calculation` is `null` exactly when `origin`
 * is `full-period` — a full period's amount is its base amount, so there is no
 * derivation to record.
 */
export interface PeriodTarget {
  readonly categoryId: CategoryId;
  readonly period: BudgetPeriod;
  readonly origin: TargetOrigin;
  readonly currency: string;
  readonly amountMinorUnits: number;
  readonly calculation: ProrationRecord | null;
}

/**
 * Reject a base target set that cannot be prorated correctly.
 *
 * Throws rather than returning a result union. Every caller in this module needs
 * a valid set to proceed at all, so a union would only move the same throw to
 * each call site — and a silent default would be exactly the fallback that hides
 * a real failure.
 *
 * Duplicate identities are rejected rather than merged. Merging would produce a
 * plausible total from a set the caller did not intend, and INV-84's requirement
 * that identities are never reused makes a duplicate a caller bug rather than a
 * shape to accommodate.
 */
export function validateBaseTargetSet(set: BaseTargetSet): void {
  if (set.currency.length === 0) {
    throw new RangeError("base target set has no currency");
  }
  if (set.targets.length === 0) {
    throw new RangeError("base target set has no categories; proration needs the complete set");
  }

  const seen = new Set<CategoryId>();
  for (const target of set.targets) {
    if (target.categoryId.length === 0) {
      throw new RangeError("base target has an empty category identity");
    }
    if (seen.has(target.categoryId)) {
      throw new RangeError(
        `category ${JSON.stringify(target.categoryId)} appears more than once. ` +
          "Category identities are stable and never reused (INV-84).",
      );
    }
    seen.add(target.categoryId);

    if (!Number.isSafeInteger(target.amountMinorUnits) || target.amountMinorUnits < 0) {
      throw new RangeError(
        `category ${JSON.stringify(target.categoryId)} has amount ` +
          `${String(target.amountMinorUnits)}; base targets are zero-or-positive whole ` +
          "minor units (INV-54).",
      );
    }
  }
}
