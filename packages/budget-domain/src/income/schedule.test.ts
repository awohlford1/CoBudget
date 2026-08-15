import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { toISODate } from "../shared/iso-date.ts";
import type { PaycheckPattern } from "../schedule/definition.ts";
import { buildPaycheckSchedule } from "../schedule/paycheck-period.ts";
import { paycheckDefinition } from "../schedule/fixtures.test.ts";
import type { ValidationResult } from "../schedule/validate.ts";
import {
  activeSecondarySchedules,
  anchorSchedule,
  validateIncomeScheduleSet,
  type IncomeSchedule,
  type IncomeScheduleSet,
} from "./schedule.ts";



// 2026-01-02 is a Friday, which the origin-weekday rule requires of these two.
const FRIDAY_WEEKLY: PaycheckPattern = { kind: "weekly", weekday: "friday" };
const FIRST_OF_MONTH: PaycheckPattern = {
  kind: "monthly",
  anchor: { kind: "day-of-month", day: 1 },
};

function income(
  id: string,
  pattern: PaycheckPattern,
  overrides: Partial<IncomeSchedule> = {},
): IncomeSchedule {
  return {
    id,
    name: `${id} income`,
    recurrence: paycheckDefinition(pattern),
    projectedAmountMinorUnits: 250_000,
    active: true,
    ...overrides,
  };
}

function codesOf(result: ValidationResult<IncomeScheduleSet>): readonly string[] {
  return result.ok ? [] : result.issues.map((issue) => issue.code).sort();
}

const HORIZON = { from: toISODate("2026-02-01"), through: toISODate("2026-06-30") };

describe("the six supported patterns (CBD-68 §9.3)", () => {
  it("can each anchor an income schedule", () => {
    const origin = toISODate("2026-01-02");
    const patterns: readonly PaycheckPattern[] = [
      { kind: "twice-per-week", weekdays: ["tuesday", "friday"] },
      { kind: "weekly", weekday: "friday" },
      { kind: "every-two-weeks", weekday: "friday", recurrenceOrigin: origin },
      {
        kind: "twice-per-month",
        anchors: [{ kind: "day-of-month", day: 15 }, { kind: "last-day" }],
      },
      { kind: "monthly", anchor: { kind: "day-of-month", day: 1 } },
      { kind: "custom-weekly-interval", weekday: "friday", everyWeeks: 3, recurrenceOrigin: origin },
    ];

    for (const pattern of patterns) {
      const set: IncomeScheduleSet = { schedules: [income("primary", pattern)], anchorId: "primary" };
      assert.equal(validateIncomeScheduleSet(set).ok, true, pattern.kind);
    }
  });

  // Hand-authored, finite, and nonrepeating sequences are not rejected here
  // because they cannot be expressed: PaycheckPattern is a closed union with no
  // end date, count, or row list (PD-68-14). The untyped edge is covered by
  // parseCadenceDefinition, exercised in schedule/parse.test.ts.
});

describe("envelope validation", () => {
  it("requires at least one schedule", () => {
    assert.deepEqual(codesOf(validateIncomeScheduleSet({ schedules: [], anchorId: "" })), [
      "income.anchor-not-found",
      "income.no-schedules",
    ]);
  });

  it("rejects a blank identifier, a blank name, and a duplicate identifier", () => {
    const set: IncomeScheduleSet = {
      schedules: [
        income("payroll", FRIDAY_WEEKLY),
        income("payroll", FIRST_OF_MONTH),
        income(" ", FIRST_OF_MONTH, { name: "  " }),
      ],
      anchorId: "payroll",
    };
    assert.deepEqual(codesOf(validateIncomeScheduleSet(set)), [
      "income.blank-id",
      "income.blank-name",
      "income.duplicate-id",
    ]);
  });

  it("requires a positive whole expected amount", () => {
    for (const amount of [0, -1, 1250.5, Number.NaN]) {
      const set: IncomeScheduleSet = {
        schedules: [income("payroll", FRIDAY_WEEKLY, { projectedAmountMinorUnits: amount })],
        anchorId: "payroll",
      };
      assert.deepEqual(codesOf(validateIncomeScheduleSet(set)), ["income.amount-not-positive"], `${amount}`);
    }
  });

  it("reports every problem at once rather than the first", () => {
    // CBD-26's reason for collecting issues: the interface needs all of them,
    // each tied to a field.
    const set: IncomeScheduleSet = {
      schedules: [income("", FRIDAY_WEEKLY, { name: "", projectedAmountMinorUnits: 0 })],
      anchorId: "missing",
    };
    assert.equal(codesOf(validateIncomeScheduleSet(set)).length, 4);
  });
});

describe("anchor selection is atomic (CBD-68 §8)", () => {
  const payroll = income("payroll", FRIDAY_WEEKLY);
  const freelance = income("freelance", FIRST_OF_MONTH);

  it("accepts exactly one active anchor among several schedules", () => {
    const set: IncomeScheduleSet = { schedules: [payroll, freelance], anchorId: "payroll" };
    assert.equal(validateIncomeScheduleSet(set).ok, true);
  });

  it("blocks disabling the anchor when no replacement is named", () => {
    const set: IncomeScheduleSet = {
      schedules: [{ ...payroll, active: false }, freelance],
      anchorId: "payroll",
    };
    assert.deepEqual(codesOf(validateIncomeScheduleSet(set)), ["income.anchor-inactive"]);
  });

  it("blocks deleting the anchor when no replacement is named", () => {
    const set: IncomeScheduleSet = { schedules: [freelance], anchorId: "payroll" };
    assert.deepEqual(codesOf(validateIncomeScheduleSet(set)), ["income.anchor-not-found"]);
  });

  it("allows that same removal once the candidate names a replacement", () => {
    // §8 in full. The removal and the new selection are one candidate, so there
    // is no accepted state in which the budget space has no anchor, and no
    // ordering of two separate calls that could leave one.
    const set: IncomeScheduleSet = { schedules: [freelance], anchorId: "freelance" };
    assert.equal(validateIncomeScheduleSet(set).ok, true);
  });

  it("leaves secondary schedules free to be disabled", () => {
    const set: IncomeScheduleSet = {
      schedules: [payroll, { ...freelance, active: false }],
      anchorId: "payroll",
    };
    assert.equal(validateIncomeScheduleSet(set).ok, true);
  });
});

describe("anchorSchedule refuses what validation would have rejected", () => {
  const payroll = income("payroll", FRIDAY_WEEKLY);

  it("throws when the anchor is absent", () => {
    assert.throws(
      () => anchorSchedule({ schedules: [payroll], anchorId: "nobody" }),
      /expected exactly one income schedule/u,
    );
  });

  it("throws when two schedules claim the anchor id", () => {
    assert.throws(
      () => anchorSchedule({ schedules: [payroll, payroll], anchorId: "payroll" }),
      /found 2/u,
    );
  });

  it("throws when the anchor is inactive rather than generating from a disabled source", () => {
    // The one case that would otherwise succeed quietly and produce a complete,
    // plausible, wrong timeline.
    assert.throws(
      () => anchorSchedule({ schedules: [{ ...payroll, active: false }], anchorId: "payroll" }),
      /is the anchor but is inactive/u,
    );
  });
});

describe("secondary schedules (INV-68-03)", () => {
  it("excludes the anchor and any inactive schedule", () => {
    const set: IncomeScheduleSet = {
      schedules: [
        income("payroll", FRIDAY_WEEKLY),
        income("bonus", FIRST_OF_MONTH),
        income("dormant", FIRST_OF_MONTH, { active: false }),
      ],
      anchorId: "payroll",
    };
    assert.deepEqual(
      activeSecondarySchedules(set).map((schedule) => schedule.id),
      ["bonus"],
    );
  });
});

describe("feeds the CBD-29 paycheck generator", () => {
  it("generates boundaries from the anchor's recurrence", () => {
    // The gap this story exists to close: before it, buildPaycheckSchedule took
    // an anchor recurrence that nothing in the product could produce.
    const set: IncomeScheduleSet = { schedules: [income("payroll", FRIDAY_WEEKLY)], anchorId: "payroll" };
    const built = buildPaycheckSchedule(anchorSchedule(set).recurrence, HORIZON);
    assert.equal(built.boundaryDates[0], "2026-02-06", "first Friday on or after 2026-02-01");
    assert.ok(built.boundaryDates.length > 1);
  });

  it("does not move a boundary when a secondary schedule is added (INV-68-03)", () => {
    const payroll = income("payroll", FRIDAY_WEEKLY);
    const before = { schedules: [payroll], anchorId: "payroll" };
    const after = { schedules: [payroll, income("bonus", FIRST_OF_MONTH)], anchorId: "payroll" };

    assert.deepEqual(
      [...buildPaycheckSchedule(anchorSchedule(after).recurrence, HORIZON).boundaryDates],
      [...buildPaycheckSchedule(anchorSchedule(before).recurrence, HORIZON).boundaryDates],
    );
  });

  it("moves boundaries only when the anchor changes (INV-68-02)", () => {
    const schedules = [income("payroll", FRIDAY_WEEKLY), income("salary", FIRST_OF_MONTH)];
    const weekly = buildPaycheckSchedule(
      anchorSchedule({ schedules, anchorId: "payroll" }).recurrence,
      HORIZON,
    );
    const monthly = buildPaycheckSchedule(
      anchorSchedule({ schedules, anchorId: "salary" }).recurrence,
      HORIZON,
    );
    assert.notDeepEqual([...weekly.boundaryDates], [...monthly.boundaryDates]);
  });
});
