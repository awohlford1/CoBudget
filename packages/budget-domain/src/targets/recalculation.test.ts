import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { BudgetPeriod } from "../schedule/period.ts";
import { toISODate } from "../shared/iso-date.ts";
import type { BaseTargetSet, PeriodTarget } from "./definition.ts";
import { prorateTransitionTargets } from "./proration.ts";
import {
  TRANSITION_TARGET_CHOICES,
  applyBaseTargetChange,
  recalculationAllowed,
  type TransitionRecalculation,
} from "./recalculation.ts";

function period(start: string, end: string): BudgetPeriod {
  return { start: toISODate(start), end: toISODate(end) };
}

const TRANSITION = period("2026-06-17", "2026-06-30");
const BASIS = period("2026-06-01", "2026-06-30");

function baseTargets(rent: number, food: number): BaseTargetSet {
  return {
    cadence: "monthly",
    currency: "USD",
    targets: [
      { categoryId: "rent", amountMinorUnits: rent },
      { categoryId: "food", amountMinorUnits: food },
    ],
  };
}

function context(set: BaseTargetSet, budgetSpaceDate: string): TransitionRecalculation {
  return {
    baseTargets: set,
    scheduleCadence: "monthly",
    transition: TRANSITION,
    basis: BASIS,
    budgetSpaceDate: toISODate(budgetSpaceDate),
  };
}

const ORIGINAL = prorateTransitionTargets(baseTargets(90_000, 30_000), "monthly", TRANSITION, BASIS);

function amounts(targets: readonly PeriodTarget[]): Record<string, number> {
  return Object.fromEntries(targets.map((t) => [t.categoryId, t.amountMinorUnits]));
}

describe("INV-55 recalculation window", () => {
  it("stays open through the transition's final date", () => {
    assert.equal(recalculationAllowed(TRANSITION, toISODate("2026-06-30")), true);
  });

  it("closes on the day after the transition ends", () => {
    assert.equal(recalculationAllowed(TRANSITION, toISODate("2026-07-01")), false);
  });

  it("is open on the transition's first date", () => {
    assert.equal(recalculationAllowed(TRANSITION, toISODate("2026-06-17")), true);
  });
});

describe("INV-53 explicit recalculation choice", () => {
  it("offers exactly two choices and no implicit third", () => {
    assert.deepEqual([...TRANSITION_TARGET_CHOICES], ["recalculate", "leave-unchanged"]);
  });

  it("leaves the transition untouched when told to", () => {
    const result = applyBaseTargetChange(
      "leave-unchanged",
      ORIGINAL,
      context(baseTargets(120_000, 60_000), "2026-06-20"),
    );

    // The base plan nearly doubled and the transition did not move, because the
    // caller said so. An implicit recalculation is what INV-53 forbids.
    assert.deepEqual(amounts(result), amounts(ORIGINAL));
    assert.deepEqual(amounts(result), { food: 14_000, rent: 42_000 });
  });

  it("recomputes the complete category set when told to", () => {
    const result = applyBaseTargetChange(
      "recalculate",
      ORIGINAL,
      context(baseTargets(120_000, 60_000), "2026-06-20"),
    );

    // INV-54: every category is recomputed from the current base plan in one
    // step, not just the ones whose base amount changed.
    assert.deepEqual(amounts(result), { food: 28_000, rent: 56_000 });
  });
});

describe("INV-56 category changes during an active transition", () => {
  it("routes an added category through the same choice", () => {
    const withSavings: BaseTargetSet = {
      cadence: "monthly",
      currency: "USD",
      targets: [
        { categoryId: "rent", amountMinorUnits: 90_000 },
        { categoryId: "food", amountMinorUnits: 30_000 },
        { categoryId: "savings", amountMinorUnits: 30_000 },
      ],
    };

    assert.deepEqual(
      amounts(applyBaseTargetChange("leave-unchanged", ORIGINAL, context(withSavings, "2026-06-20"))),
      { food: 14_000, rent: 42_000 },
    );
    assert.deepEqual(
      amounts(applyBaseTargetChange("recalculate", ORIGINAL, context(withSavings, "2026-06-20"))),
      { food: 14_000, rent: 42_000, savings: 14_000 },
    );
  });

  it("keeps a zeroed category in the recomputed set", () => {
    const result = applyBaseTargetChange(
      "recalculate",
      ORIGINAL,
      context(baseTargets(90_000, 0), "2026-06-20"),
    );

    assert.deepEqual(amounts(result), { food: 0, rent: 42_000 });
  });
});

describe("recalculation refusals", () => {
  it("throws rather than silently declining after the window closes", () => {
    // Returning the existing targets would leave the caller believing a
    // recalculation happened. Both outcomes look the same from the outside,
    // which is exactly why this one has to be loud.
    assert.throws(
      () =>
        applyBaseTargetChange(
          "recalculate",
          ORIGINAL,
          context(baseTargets(120_000, 60_000), "2026-07-01"),
        ),
      /INV-55/u,
    );
  });

  it("still honours leave-unchanged after the window closes", () => {
    assert.deepEqual(
      amounts(
        applyBaseTargetChange(
          "leave-unchanged",
          ORIGINAL,
          context(baseTargets(120_000, 60_000), "2026-07-01"),
        ),
      ),
      amounts(ORIGINAL),
    );
  });

  it("rejects current targets belonging to another period", () => {
    // INV-79 in its most direct form: a completed period's targets must not be
    // reachable here, so a set covering the wrong period fails rather than being
    // returned as though it were the transition's.
    const completed = prorateTransitionTargets(
      baseTargets(90_000, 30_000),
      "monthly",
      period("2026-05-17", "2026-05-31"),
      period("2026-05-01", "2026-05-31"),
    );

    assert.throws(
      () =>
        applyBaseTargetChange(
          "leave-unchanged",
          completed,
          context(baseTargets(90_000, 30_000), "2026-06-20"),
        ),
      /not the transition/u,
    );
  });
});
