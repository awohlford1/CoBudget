import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { CadenceDefinition, MonthlyAnchor } from "../schedule/definition.ts";
import {
  periodContaining,
  weeklyMonthlyBoundaries,
  type BudgetPeriod,
  type WeeklyOrMonthlyDefinition,
} from "../schedule/period.ts";
import { validateCadenceDefinition } from "../schedule/validate.ts";
import { toISODate } from "../shared/iso-date.ts";
import type { BaseTarget, BaseTargetSet, PeriodTarget } from "./definition.ts";
import { fullPeriodTargets, prorateTransitionTargets } from "./proration.ts";

function validated(definition: CadenceDefinition): WeeklyOrMonthlyDefinition {
  const result = validateCadenceDefinition(definition);
  if (!result.ok) {
    throw new Error(`fixture failed validation: ${result.issues.map((i) => i.code).join(", ")}`);
  }
  if (result.value.cadence !== "weekly" && result.value.cadence !== "monthly") {
    throw new Error(`fixture is not a CBD-27 cadence: ${result.value.cadence}`);
  }
  return result.value;
}

/**
 * The basis period exactly as a caller derives it: the complete new-schedule
 * natural period containing the transition's first date (INV-35). Going through
 * the real generator rather than a hand-written pair keeps these fixtures honest
 * about which period the denominator actually comes from.
 */
function basisFor(definition: WeeklyOrMonthlyDefinition, effective: string): BudgetPeriod {
  return periodContaining(weeklyMonthlyBoundaries(definition), toISODate(effective));
}

function period(start: string, end: string): BudgetPeriod {
  return { start: toISODate(start), end: toISODate(end) };
}

function set(cadence: BaseTargetSet["cadence"], targets: readonly BaseTarget[]): BaseTargetSet {
  return { cadence, currency: "USD", targets };
}

/** Amounts by category, which is what every assertion below is really about. */
function amounts(targets: readonly PeriodTarget[]): Record<string, number> {
  return Object.fromEntries(targets.map((t) => [t.categoryId, t.amountMinorUnits]));
}

function total(targets: readonly PeriodTarget[]): number {
  return targets.reduce((sum, t) => sum + t.amountMinorUnits, 0);
}

describe("INV-35 transition proration ratio", () => {
  it("prorates a mid-week weekly change at the documented 5/7", () => {
    // CBD-87: a weekly change effective Wednesday June 17 closes the old period
    // June 16 and runs a June 17-21 transition before the first full period.
    const monday = validated({ cadence: "weekly", anchor: "monday" });
    const basis = basisFor(monday, "2026-06-17");
    assert.equal(`${basis.start}..${basis.end}`, "2026-06-15..2026-06-21");

    const transition = period("2026-06-17", "2026-06-21");
    const result = prorateTransitionTargets(
      set("weekly", [
        { categoryId: "groceries", amountMinorUnits: 70_000 },
        { categoryId: "fuel", amountMinorUnits: 14_000 },
      ]),
      "weekly",
      transition,
      basis,
    );

    assert.deepEqual(amounts(result), { fuel: 10_000, groceries: 50_000 });
    assert.equal(result[0]?.calculation?.transitionDays, 5);
    assert.equal(result[0]?.calculation?.basisDays, 7);
  });

  it("prorates a mid-month monthly change at the documented 14/30", () => {
    const firstOfMonth = validated({ cadence: "monthly", anchor: { kind: "day-of-month", day: 1 } });
    const basis = basisFor(firstOfMonth, "2026-06-17");
    assert.equal(`${basis.start}..${basis.end}`, "2026-06-01..2026-06-30");

    const result = prorateTransitionTargets(
      set("monthly", [
        { categoryId: "rent", amountMinorUnits: 90_000 },
        { categoryId: "food", amountMinorUnits: 30_000 },
      ]),
      "monthly",
      period("2026-06-17", "2026-06-30"),
      basis,
    );

    assert.deepEqual(amounts(result), { food: 14_000, rent: 42_000 });
    assert.equal(result[0]?.calculation?.transitionDays, 14);
    assert.equal(result[0]?.calculation?.basisDays, 30);
  });

  it("uses the leap day in a February basis period", () => {
    const firstOfMonth = validated({ cadence: "monthly", anchor: { kind: "day-of-month", day: 1 } });
    const basis = basisFor(firstOfMonth, "2028-02-20");
    assert.equal(`${basis.start}..${basis.end}`, "2028-02-01..2028-02-29");

    const result = prorateTransitionTargets(
      set("monthly", [{ categoryId: "food", amountMinorUnits: 29_000 }]),
      "monthly",
      period("2028-02-20", "2028-02-29"),
      basis,
    );

    // 10/29, not 10/28: the denominator is the real length of the basis period.
    assert.deepEqual(amounts(result), { food: 10_000 });
    assert.equal(result[0]?.calculation?.basisDays, 29);
  });

  it("spans a month boundary for a non-first-day monthly anchor", () => {
    const fifteenth: MonthlyAnchor = { kind: "day-of-month", day: 15 };
    const definition = validated({ cadence: "monthly", anchor: fifteenth });
    const basis = basisFor(definition, "2026-06-20");
    assert.equal(`${basis.start}..${basis.end}`, "2026-06-15..2026-07-14");

    const result = prorateTransitionTargets(
      set("monthly", [{ categoryId: "food", amountMinorUnits: 30_000 }]),
      "monthly",
      period("2026-06-20", "2026-07-14"),
      basis,
    );

    assert.deepEqual(amounts(result), { food: 25_000 });
    assert.equal(result[0]?.calculation?.transitionDays, 25);
    assert.equal(result[0]?.calculation?.basisDays, 30);
  });

  it("rejects a basis period that does not end with the transition", () => {
    assert.throws(
      () =>
        prorateTransitionTargets(
          set("monthly", [{ categoryId: "food", amountMinorUnits: 30_000 }]),
          "monthly",
          period("2026-06-17", "2026-06-30"),
          period("2026-06-01", "2026-07-31"),
        ),
      /must share an end date/u,
    );
  });

  it("refuses to convert base targets across cadence contexts", () => {
    // INV-78: no silent four-week conversion. The set says weekly, the schedule
    // says monthly, so the call fails rather than reinterpreting the amounts.
    assert.throws(
      () =>
        prorateTransitionTargets(
          set("weekly", [{ categoryId: "food", amountMinorUnits: 30_000 }]),
          "monthly",
          period("2026-06-17", "2026-06-30"),
          period("2026-06-01", "2026-06-30"),
        ),
      /INV-78/u,
    );
  });
});

describe("INV-37 half-up midpoint rounding", () => {
  /** A 1/2 ratio, so the rounded total is exactly `base / 2`. */
  function halfOf(baseMinorUnits: number, currency: string): number {
    const result = prorateTransitionTargets(
      { cadence: "custom-fixed-length", currency, targets: [{ categoryId: "only", amountMinorUnits: baseMinorUnits }] },
      "custom-fixed-length",
      period("2026-06-02", "2026-06-02"),
      period("2026-06-01", "2026-06-02"),
    );
    return total(result);
  }

  it("rounds a midpoint up rather than to even", () => {
    // The discriminator against banker's rounding, which would give 0, 2, 2.
    assert.equal(halfOf(1, "USD"), 1);
    assert.equal(halfOf(3, "USD"), 2);
    assert.equal(halfOf(5, "USD"), 3);
  });

  it("rounds immediately below and above a midpoint the ordinary way", () => {
    const quarter = (baseMinorUnits: number): number =>
      total(
        prorateTransitionTargets(
          set("custom-fixed-length", [{ categoryId: "only", amountMinorUnits: baseMinorUnits }]),
          "custom-fixed-length",
          period("2026-06-04", "2026-06-04"),
          period("2026-06-01", "2026-06-04"),
        ),
      );

    assert.equal(quarter(1), 0); // 0.25
    assert.equal(quarter(2), 1); // 0.50, the midpoint
    assert.equal(quarter(3), 1); // 0.75
  });

  it("behaves identically for zero, two, and three fractional digits", () => {
    // The claim this asserts is an identity, not a coincidence: every amount is
    // a whole minor unit, so "the currency's supported precision" is already
    // expressed by the unit and there is no precision-dependent branch to take.
    // One yen, one cent, and one fils all round the same way at the midpoint.
    for (const currency of ["JPY", "USD", "BHD"]) {
      assert.equal(halfOf(1, currency), 1, `${currency} midpoint`);
      assert.equal(halfOf(3, currency), 2, `${currency} midpoint`);
    }
  });
});

describe("INV-36 largest-remainder allocation", () => {
  /** Ratio 1/3 over three categories, which is where remainders appear. */
  function thirds(targets: readonly BaseTarget[]): readonly PeriodTarget[] {
    return prorateTransitionTargets(
      set("custom-fixed-length", targets),
      "custom-fixed-length",
      period("2026-06-03", "2026-06-03"),
      period("2026-06-01", "2026-06-03"),
    );
  }

  it("sums exactly when the total rounds up, breaking ties on category identity", () => {
    // 30/3 = 10. Each category floors to 3 with remainder 1, leaving one unit to
    // place. All three remainders tie, so the smallest identity takes it — never
    // the input order, which puts charlie first here.
    const result = thirds([
      { categoryId: "charlie", amountMinorUnits: 10 },
      { categoryId: "bravo", amountMinorUnits: 10 },
      { categoryId: "alpha", amountMinorUnits: 10 },
    ]);

    assert.deepEqual(amounts(result), { alpha: 4, bravo: 3, charlie: 3 });
    assert.equal(total(result), 10);
  });

  it("sums exactly when the total rounds down and awards nothing", () => {
    // 52/5 = 10.4, which rounds to 10 and equals the sum of the floors, so the
    // one category carrying a remainder still receives no extra unit.
    const result = prorateTransitionTargets(
      set("custom-fixed-length", [
        { categoryId: "alpha", amountMinorUnits: 12 },
        { categoryId: "bravo", amountMinorUnits: 20 },
        { categoryId: "charlie", amountMinorUnits: 20 },
      ]),
      "custom-fixed-length",
      period("2026-06-05", "2026-06-05"),
      period("2026-06-01", "2026-06-05"),
    );

    assert.deepEqual(amounts(result), { alpha: 2, bravo: 4, charlie: 4 });
    assert.equal(total(result), 10);
    assert.equal(result.every((t) => t.calculation?.remainderUnitAwarded === false), true);
  });

  it("sums exactly when every category divides evenly", () => {
    const result = prorateTransitionTargets(
      set("custom-fixed-length", [
        { categoryId: "alpha", amountMinorUnits: 10 },
        { categoryId: "bravo", amountMinorUnits: 20 },
        { categoryId: "charlie", amountMinorUnits: 30 },
      ]),
      "custom-fixed-length",
      period("2026-06-02", "2026-06-02"),
      period("2026-06-01", "2026-06-02"),
    );

    assert.deepEqual(amounts(result), { alpha: 5, bravo: 10, charlie: 15 });
    assert.equal(total(result), 30);
  });

  it("awards a unit to every category when the deficit equals the category count", () => {
    // Both categories floor to 1 with remainder 9/10, and 38/10 rounds to 4, so
    // the deficit is 2 — the upper bound the allocation asserts it never exceeds.
    const result = prorateTransitionTargets(
      set("custom-fixed-length", [
        { categoryId: "alpha", amountMinorUnits: 19 },
        { categoryId: "bravo", amountMinorUnits: 19 },
      ]),
      "custom-fixed-length",
      period("2026-06-10", "2026-06-10"),
      period("2026-06-01", "2026-06-10"),
    );

    assert.deepEqual(amounts(result), { alpha: 2, bravo: 2 });
    assert.equal(total(result), 4);
  });

  it("never awards a unit to a zeroed category", () => {
    // INV-54 keeps zeroed categories in the set. A remainder of zero can never
    // reach the front of the ordering, so alpha stays at zero while the unit
    // goes to a category that actually has a fraction to round.
    const result = thirds([
      { categoryId: "alpha", amountMinorUnits: 0 },
      { categoryId: "bravo", amountMinorUnits: 10 },
      { categoryId: "charlie", amountMinorUnits: 10 },
    ]);

    assert.deepEqual(amounts(result), { alpha: 0, bravo: 4, charlie: 3 });
    assert.equal(total(result), 7);
  });
});

describe("INV-84 stable category identity", () => {
  const targets: readonly BaseTarget[] = [
    { categoryId: "alpha", amountMinorUnits: 10 },
    { categoryId: "bravo", amountMinorUnits: 10 },
    { categoryId: "charlie", amountMinorUnits: 10 },
  ];

  function thirdsOf(order: readonly BaseTarget[]): readonly PeriodTarget[] {
    return prorateTransitionTargets(
      set("custom-fixed-length", order),
      "custom-fixed-length",
      period("2026-06-03", "2026-06-03"),
      period("2026-06-01", "2026-06-03"),
    );
  }

  it("produces an identical result under every input ordering", () => {
    // Six permutations of three categories, all of which tie on remainder — the
    // case where an order-dependent tiebreak would be visible.
    const expected = thirdsOf(targets);
    const permutations = [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ];

    for (const order of permutations) {
      const shuffled = order.map((index) => {
        const target = targets[index];
        if (target === undefined) throw new Error("bad permutation fixture");
        return target;
      });
      assert.deepEqual(thirdsOf(shuffled), expected, `ordering ${order.join("")}`);
    }
  });

  it("gives a recreated identity no claim on the old one's allocation", () => {
    // Archiving "alpha" and recreating the same display name under a new
    // identity is, to this module, simply a different category. The tie now
    // resolves to bravo, because identity is the only thing it can resolve on.
    const recreated = thirdsOf([
      { categoryId: "zulu", amountMinorUnits: 10 },
      { categoryId: "bravo", amountMinorUnits: 10 },
      { categoryId: "charlie", amountMinorUnits: 10 },
    ]);

    assert.deepEqual(amounts(recreated), { bravo: 4, charlie: 3, zulu: 3 });
  });

  it("carries no display name for a rename to change", () => {
    // The strongest form of the rename criterion: a mutable label is not part of
    // the input, so no rename can reach the calculation at all. If a name field
    // is ever added to BaseTarget, this fails and the claim gets re-examined.
    const [first] = targets;
    assert.deepEqual(Object.keys(first ?? {}).sort(), ["amountMinorUnits", "categoryId"]);
  });
});

describe("full-period targets", () => {
  it("returns base amounts unchanged with no calculation record", () => {
    // INV-30: a change landing on a natural boundary creates no transition and
    // no proration, so the period simply opens with full base targets.
    const result = fullPeriodTargets(
      set("weekly", [
        { categoryId: "groceries", amountMinorUnits: 70_000 },
        { categoryId: "fuel", amountMinorUnits: 14_000 },
      ]),
      "weekly",
      period("2026-06-22", "2026-06-28"),
    );

    assert.deepEqual(amounts(result), { fuel: 14_000, groceries: 70_000 });
    assert.equal(result.every((t) => t.calculation === null), true);
    assert.equal(result.every((t) => t.origin === "full-period"), true);
  });
});
