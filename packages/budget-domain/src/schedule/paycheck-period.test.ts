import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addDays, daysBetween, toISODate } from "../shared/iso-date.ts";
import { HolidayCoverageError } from "./business-day.ts";
import type { CadenceDefinition, BusinessDayPolicy, PaycheckPattern } from "./definition.ts";
import {
  buildPaycheckSchedule,
  type PaycheckDefinition,
  type PaycheckHorizon,
} from "./paycheck-period.ts";
import { periodContaining, periodLengthInDays, periodsFrom, type BudgetPeriod } from "./period.ts";
import { validateCadenceDefinition } from "./validate.ts";

function paycheck(
  pattern: PaycheckPattern,
  businessDayPolicy: BusinessDayPolicy = "previous-business-day",
): PaycheckDefinition {
  const result = validateCadenceDefinition({ cadence: "paycheck", pattern, businessDayPolicy });
  if (!result.ok) {
    throw new Error(`fixture failed validation: ${result.issues.map((i) => i.code).join(", ")}`);
  }
  if (result.value.cadence !== "paycheck") {
    throw new Error("fixture is not a paycheck cadence");
  }
  return result.value;
}

function forged(definition: CadenceDefinition): PaycheckDefinition {
  return definition as PaycheckDefinition;
}

function horizon(from: string, through: string): PaycheckHorizon {
  return { from: toISODate(from), through: toISODate(through) };
}

function span(period: BudgetPeriod): string {
  return `${period.start}..${period.end}`;
}

describe("period formula — CBD-68 §7.3", () => {
  it("runs period n from A[n] through the day before A[n+1]", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "weekly", weekday: "friday" }),
      horizon("2026-08-01", "2026-09-30"),
    );
    const first = periodContaining(schedule.boundaries, toISODate("2026-08-10"));
    assert.equal(span(first), "2026-08-07..2026-08-13");
    assert.equal(periodLengthInDays(first), 7);
  });

  it("plugs into the shared period helpers unchanged", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "weekly", weekday: "friday" }),
      horizon("2026-08-01", "2026-10-31"),
    );
    assert.deepEqual(periodsFrom(schedule.boundaries, toISODate("2026-08-07"), 3).map(span), [
      "2026-08-07..2026-08-13",
      "2026-08-14..2026-08-20",
      "2026-08-21..2026-08-27",
    ]);
  });
});

describe("interval recurrence — CBD-68 §9.1", () => {
  it("advances 14 days from the unadjusted origin, not from the horizon", () => {
    // The acceptance criterion states this directly. An origin well before the
    // horizon must still set the phase of every generated occurrence.
    const schedule = buildPaycheckSchedule(
      paycheck({
        kind: "every-two-weeks",
        weekday: "friday",
        recurrenceOrigin: toISODate("2026-01-02"),
      }),
      horizon("2026-08-01", "2026-09-30"),
    );
    const dates = schedule.occurrences.map((o) => o.unadjustedDate);
    // 2026-01-02 is a Friday. August 14 is exactly 224 days later, which is 16
    // strides of 14 — so the phase set in January still governs August. Landing
    // on August 7 instead would mean the generator had re-phased to the horizon.
    assert.deepEqual(dates, ["2026-08-14", "2026-08-28", "2026-09-11", "2026-09-25"]);
    for (const date of dates) {
      assert.equal(daysBetween(toISODate("2026-01-02"), date) % 14, 0, `${date} is off-cadence`);
    }
  });

  it("keeps the origin fixed when an occurrence is adjusted", () => {
    // New Year's Day 2027 is a Friday and lands exactly on this cadence (364
    // days after the origin, 26 strides). It is a holiday, so that occurrence
    // moves back to Thursday December 31 — but the *next* one must still be 14
    // days after the unadjusted January 1, not after the adjusted date.
    // Otherwise one holiday would permanently shift every future payday.
    const schedule = buildPaycheckSchedule(
      paycheck({
        kind: "every-two-weeks",
        weekday: "friday",
        recurrenceOrigin: toISODate("2026-01-02"),
      }),
      horizon("2026-12-01", "2027-02-28"),
    );

    const newYear = schedule.occurrences.find((o) => o.unadjustedDate === "2027-01-01");
    assert.ok(newYear !== undefined, "expected an occurrence on New Year's Day");
    assert.equal(newYear.adjustedDate, "2026-12-31", "moved off the holiday");
    assert.deepEqual(newYear.adjustment.reason, {
      kind: "holiday",
      holiday: "New Year's Day",
    });

    const following = schedule.occurrences.find((o) => o.unadjustedDate === "2027-01-15");
    assert.ok(
      following !== undefined,
      "the next occurrence is 14 days after the unadjusted January 1, not after December 31",
    );
    assert.equal(following.adjustedDate, "2027-01-15", "an ordinary Friday needs no adjustment");
  });

  it("supports the 1, 2, 3, and 4 week custom interval", () => {
    for (const everyWeeks of [1, 2, 3, 4] as const) {
      const schedule = buildPaycheckSchedule(
        paycheck({
          kind: "custom-weekly-interval",
          weekday: "wednesday",
          everyWeeks,
          recurrenceOrigin: toISODate("2026-08-05"),
        }),
        horizon("2026-08-05", "2026-10-31"),
      );
      const [first, second] = schedule.occurrences;
      assert.ok(first !== undefined && second !== undefined);
      assert.equal(first.unadjustedDate, "2026-08-05", `${everyWeeks}-week origin`);
      assert.equal(
        second.unadjustedDate,
        addDays(toISODate("2026-08-05"), everyWeeks * 7),
        `${everyWeeks}-week interval should advance ${everyWeeks * 7} days`,
      );
    }
  });
});

describe("duplicate adjusted anchors — INV-68-17, INV-68-16", () => {
  it("collapses to one boundary while keeping both income events", () => {
    // A 1st-and-15th schedule where both anchors adjust onto the same date.
    // August 2026: the 1st is a Saturday and the 15th is a Saturday, so with
    // previous-business-day they land on July 31 and August 14 respectively —
    // distinct. Use a month where two anchors genuinely collide instead.
    const schedule = buildPaycheckSchedule(
      paycheck({
        kind: "twice-per-month",
        anchors: [
          { kind: "day-of-month", day: 4 },
          { kind: "day-of-month", day: 5 },
        ],
      }),
      horizon("2026-07-01", "2026-07-31"),
    );
    // July 4 2026 is a Saturday and July 5 is a Sunday; both move back to
    // Friday July 3 under the default policy.
    const july = schedule.occurrences.filter((o) => o.adjustedDate === "2026-07-03");
    assert.equal(july.length, 2, "two income events retain distinct identities");
    assert.deepEqual(
      july.map((o) => o.unadjustedDate),
      ["2026-07-04", "2026-07-05"],
      "each keeps its own unadjusted date",
    );
    assert.equal(
      schedule.boundaryDates.filter((d) => d === "2026-07-03").length,
      1,
      "one boundary, not two",
    );
  });

  it("never produces a zero-day period", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({
        kind: "twice-per-month",
        anchors: [
          { kind: "day-of-month", day: 4 },
          { kind: "day-of-month", day: 5 },
        ],
      }),
      horizon("2026-01-01", "2026-12-31"),
    );
    for (let index = 1; index < schedule.boundaryDates.length; index += 1) {
      const previous = schedule.boundaryDates[index - 1];
      const current = schedule.boundaryDates[index];
      assert.ok(previous !== undefined && current !== undefined);
      assert.notEqual(previous, current, "duplicate boundary would mean a zero-day period");
    }
  });
});

describe("monthly anchors clamp — INV-18", () => {
  it("clamps a 31st anchor and records that it was clamped", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "monthly", anchor: { kind: "day-of-month", day: 31 } }),
      horizon("2026-01-01", "2026-04-30"),
    );
    assert.deepEqual(
      schedule.occurrences.map((o) => o.unadjustedDate),
      ["2026-01-31", "2026-02-28", "2026-03-31", "2026-04-30"],
    );
    const february = schedule.occurrences.find((o) => o.unadjustedDate === "2026-02-28");
    assert.equal(february?.clampedFromDay, 31, "provenance records the saved anchor");
    const march = schedule.occurrences.find((o) => o.unadjustedDate === "2026-03-31");
    assert.equal(march?.clampedFromDay, null, "March was not clamped");
  });

  it("supports the last-day anchor", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "monthly", anchor: { kind: "last-day" } }),
      horizon("2028-01-01", "2028-03-31"),
    );
    assert.deepEqual(
      schedule.occurrences.map((o) => o.unadjustedDate),
      ["2028-01-31", "2028-02-29", "2028-03-31"],
      "February 2028 is a leap year",
    );
  });
});

describe("provenance — CBD-68 §10.2", () => {
  it("retains the unadjusted date, policy, reason, and dataset version", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "monthly", anchor: { kind: "day-of-month", day: 4 } }, "previous-business-day"),
      horizon("2026-07-01", "2026-07-31"),
    );
    const [occurrence] = schedule.occurrences;
    assert.ok(occurrence !== undefined);
    assert.equal(occurrence.unadjustedDate, "2026-07-04");
    assert.equal(occurrence.adjustedDate, "2026-07-03");
    assert.equal(occurrence.adjustment.policy, "previous-business-day");
    assert.deepEqual(occurrence.adjustment.reason, { kind: "weekend" });
    assert.match(occurrence.adjustment.datasetVersion, /frfs/u);
  });

  it("records no reason when no adjustment was needed", () => {
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "monthly", anchor: { kind: "day-of-month", day: 14 } }),
      horizon("2026-08-01", "2026-08-31"),
    );
    const [occurrence] = schedule.occurrences;
    assert.ok(occurrence !== undefined);
    assert.equal(occurrence.adjustedDate, occurrence.unadjustedDate);
    assert.equal(occurrence.adjustment.reason, null);
  });
});

describe("horizon and coverage — CBD-68 §10.3", () => {
  it("refuses a horizon reaching an uncovered year, at build time", () => {
    // Failing here means the caller learns at the point they chose the horizon,
    // not partway through a later boundary query.
    assert.throws(
      () =>
        buildPaycheckSchedule(
          paycheck({ kind: "weekly", weekday: "friday" }),
          horizon("2030-01-01", "2031-06-30"),
        ),
      HolidayCoverageError,
    );
  });

  it("refuses a reversed horizon", () => {
    assert.throws(
      () =>
        buildPaycheckSchedule(
          paycheck({ kind: "weekly", weekday: "friday" }),
          horizon("2026-09-30", "2026-08-01"),
        ),
      /precedes start/u,
    );
  });

  it("refuses a boundary query outside the generated range", () => {
    // Unlike the other cadences, a paycheck boundary cannot be derived from
    // arithmetic alone, so answering beyond the horizon would mean inventing it.
    const schedule = buildPaycheckSchedule(
      paycheck({ kind: "weekly", weekday: "friday" }),
      horizon("2026-08-01", "2026-08-31"),
    );
    assert.throws(
      () => periodContaining(schedule.boundaries, toISODate("2027-05-01")),
      /Rebuild with a horizon/u,
    );
  });
});

describe("defence against unvalidated definitions", () => {
  it("refuses an out-of-range monthly anchor", () => {
    assert.throws(
      () =>
        buildPaycheckSchedule(
          forged({
            cadence: "paycheck",
            pattern: { kind: "monthly", anchor: { kind: "day-of-month", day: 40 } },
            businessDayPolicy: "previous-business-day",
          }),
          horizon("2026-08-01", "2026-08-31"),
        ),
      /monthly anchor day must be an integer/u,
    );
  });

  it("refuses an unrecognised weekday", () => {
    assert.throws(
      () =>
        buildPaycheckSchedule(
          forged({
            cadence: "paycheck",
            pattern: { kind: "weekly", weekday: "funday" as never },
            businessDayPolicy: "previous-business-day",
          }),
          horizon("2026-08-01", "2026-08-31"),
        ),
      /unrecognised weekday/u,
    );
  });
});

/** Compile-time assertions. Never executed — `tsc --noEmit` is the assertion. */
export function _requiresValidatedPaycheckDefinition(h: PaycheckHorizon): void {
  // @ts-expect-error an unvalidated definition cannot reach the generator.
  buildPaycheckSchedule({ cadence: "paycheck", pattern: { kind: "weekly", weekday: "friday" }, businessDayPolicy: "previous-business-day" }, h);
  // @ts-expect-error weekly generation is CBD-27, not this module.
  buildPaycheckSchedule({ cadence: "weekly", anchor: "monday" }, h);
}
