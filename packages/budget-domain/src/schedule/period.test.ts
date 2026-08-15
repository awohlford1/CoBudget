import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addDays, toISODate, type ISODate } from "../shared/iso-date.ts";
import type { CadenceDefinition, MonthlyAnchor, Weekday } from "./definition.ts";
import {
  MAX_GENERATED_PERIODS,
  SETUP_PREVIEW_PERIOD_COUNT,
  boundaryAtOrBefore,
  nextBoundaryAfter,
  periodAfter,
  periodContaining,
  periodContains,
  periodLengthInDays,
  periodsFrom,
  setupPreview,
  weeklyMonthlyBoundaries,
  type BudgetPeriod,
  type WeeklyOrMonthlyDefinition,
} from "./period.ts";
import { validateCadenceDefinition } from "./validate.ts";

/**
 * Every fixture goes through validation, because the generator now requires the
 * validation brand. That is deliberate friction: it means these tests take the
 * same path production does, rather than a shortcut only tests can use.
 */
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

function weekly(anchor: Weekday): WeeklyOrMonthlyDefinition {
  return validated({ cadence: "weekly", anchor });
}

function monthly(anchor: MonthlyAnchor): WeeklyOrMonthlyDefinition {
  return validated({ cadence: "monthly", anchor });
}

function onDay(day: number): WeeklyOrMonthlyDefinition {
  return monthly({ kind: "day-of-month", day });
}

/** Forge an unvalidated definition to prove the runtime defences fire. */
function forged(definition: CadenceDefinition): WeeklyOrMonthlyDefinition {
  return definition as WeeklyOrMonthlyDefinition;
}

function span(period: BudgetPeriod): string {
  return `${period.start}..${period.end}`;
}

/**
 * The generic helpers take a {@link BoundaryFunctions} (CBD-67 §8.10) so that all
 * four cadences share one implementation. These wrappers keep the test bodies
 * reading in terms of a definition, which is what each assertion is about.
 */
function containing(definition: WeeklyOrMonthlyDefinition, date: ISODate): BudgetPeriod {
  return periodContaining(weeklyMonthlyBoundaries(definition), date);
}

function afterOf(definition: WeeklyOrMonthlyDefinition, period: BudgetPeriod): BudgetPeriod {
  return periodAfter(weeklyMonthlyBoundaries(definition), period);
}

function periodsOf(
  definition: WeeklyOrMonthlyDefinition,
  from: ISODate,
  count: number,
): readonly BudgetPeriod[] {
  return periodsFrom(weeklyMonthlyBoundaries(definition), from, count);
}

function previewOf(
  definition: WeeklyOrMonthlyDefinition,
  budgetSpaceDate: ISODate,
): readonly BudgetPeriod[] {
  return setupPreview(weeklyMonthlyBoundaries(definition), budgetSpaceDate);
}

describe("weekly periods — CBD-67 §5.2 worked example", () => {
  // The specification states these outcomes directly for a budget-space date of
  // Wednesday, August 12, 2026, so they are used verbatim rather than invented.
  const budgetSpaceDate = toISODate("2026-08-12");

  it("matches the published anchor table", () => {
    assert.equal(span(containing(weekly("monday"), budgetSpaceDate)), "2026-08-10..2026-08-16");
    assert.equal(
      span(containing(weekly("wednesday"), budgetSpaceDate)),
      "2026-08-12..2026-08-18",
    );
    assert.equal(span(containing(weekly("friday"), budgetSpaceDate)), "2026-08-07..2026-08-13");
  });

  it("opens the complete current period even when it began before today (§5.2)", () => {
    // A Friday anchor on a Wednesday means the current period started six days
    // ago. Setup must open that whole period, not a partial one from today.
    const period = containing(weekly("friday"), budgetSpaceDate);
    assert.equal(period.start, "2026-08-07");
    assert.equal(periodLengthInDays(period), 7);
  });

  it("gives every weekday anchor a seven-day period", () => {
    for (const anchor of [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ] as const) {
      assert.equal(periodLengthInDays(containing(weekly(anchor), budgetSpaceDate)), 7);
    }
  });

  it("treats a date that is itself a boundary as starting its own period (INV-69-20)", () => {
    const period = containing(weekly("monday"), toISODate("2026-08-10"));
    assert.equal(period.start, "2026-08-10");
    assert.equal(period.end, "2026-08-16");
  });
});

describe("monthly clamping — CBD-67 INV-18", () => {
  it("clamps a 31st anchor per month without rewriting the saved anchor", () => {
    const definition = onDay(31);
    assert.equal(boundaryAtOrBefore(definition, toISODate("2026-01-31")), "2026-01-31");
    assert.equal(boundaryAtOrBefore(definition, toISODate("2026-02-28")), "2026-02-28");
    assert.equal(boundaryAtOrBefore(definition, toISODate("2026-04-30")), "2026-04-30");
    // The saved anchor is untouched, so March restores the 31st automatically.
    assert.equal(boundaryAtOrBefore(definition, toISODate("2026-03-31")), "2026-03-31");
  });

  it("returns to the saved date in the next month that contains it", () => {
    // February clamps to 28; March must go back to 31 rather than staying at 28.
    const periods = periodsOf(onDay(31), toISODate("2026-01-31"), 4).map(span);
    assert.deepEqual(periods, [
      "2026-01-31..2026-02-27",
      "2026-02-28..2026-03-30",
      "2026-03-31..2026-04-29",
      "2026-04-30..2026-05-30",
    ]);
  });

  it("clamps to February 29 in a leap year and 28 otherwise", () => {
    assert.equal(boundaryAtOrBefore(onDay(30), toISODate("2028-02-29")), "2028-02-29");
    assert.equal(boundaryAtOrBefore(onDay(30), toISODate("2026-02-28")), "2026-02-28");
  });

  it("keeps last-day distinct from day 31", () => {
    const lastDay = monthly({ kind: "last-day" });
    // They agree in January and diverge in February, which is exactly why they
    // are modelled as different anchors rather than the same number.
    assert.equal(boundaryAtOrBefore(lastDay, toISODate("2026-01-31")), "2026-01-31");
    assert.equal(boundaryAtOrBefore(lastDay, toISODate("2026-02-28")), "2026-02-28");
    assert.deepEqual(periodsOf(lastDay, toISODate("2026-01-31"), 3).map(span), [
      "2026-01-31..2026-02-27",
      "2026-02-28..2026-03-30",
      "2026-03-31..2026-04-29",
    ]);
  });

  it("handles a first-of-month anchor across a year boundary", () => {
    assert.deepEqual(periodsOf(onDay(1), toISODate("2026-12-15"), 2).map(span), [
      "2026-12-01..2026-12-31",
      "2027-01-01..2027-01-31",
    ]);
  });
});

describe("contiguity and coverage — INV-02, INV-04, INV-05", () => {
  const definitions: readonly WeeklyOrMonthlyDefinition[] = [
    weekly("monday"),
    weekly("thursday"),
    weekly("sunday"),
    onDay(1),
    onDay(15),
    onDay(29),
    onDay(30),
    onDay(31),
    monthly({ kind: "last-day" }),
  ];

  it("assigns every date in a 400-day span to exactly one period", () => {
    // 400 days crosses a February, a leap-year boundary is covered separately,
    // and every anchor above is exercised against the same span.
    for (const definition of definitions) {
      let date = toISODate("2026-01-01");
      for (let offset = 0; offset < 400; offset += 1) {
        const period = containing(definition, date);

        assert.ok(periodContains(period, date), `${date} not inside its own period`);
        // Both ends of a period must resolve back to that same period, which is
        // what "exactly one" means operationally.
        assert.deepEqual(containing(definition, period.start), period);
        assert.deepEqual(containing(definition, period.end), period);
        // No gap and no overlap: the next day after the end starts the next period.
        const next = containing(definition, addDays(period.end, 1));
        assert.equal(next.start, addDays(period.end, 1));

        date = addDays(date, 1);
      }
    }
  });

  it("crosses February 29 without gap or duplication (INV-69-19)", () => {
    for (const definition of definitions) {
      const before = containing(definition, toISODate("2028-02-28"));
      const leapDay = containing(definition, toISODate("2028-02-29"));
      const after = containing(definition, toISODate("2028-03-01"));
      for (const period of [before, leapDay, after]) {
        assert.ok(periodContains(period, period.start));
      }
      assert.ok(periodContains(leapDay, toISODate("2028-02-29")));
    }
  });

  it("keeps periodAfter consistent with recomputing from the next day", () => {
    for (const definition of definitions) {
      const period = containing(definition, toISODate("2026-05-20"));
      assert.deepEqual(
        afterOf(definition, period),
        containing(definition, addDays(period.end, 1)),
      );
    }
  });
});

describe("daylight saving — CBD-69 INV-69-18", () => {
  it("does not change a period's calendar-day count across a transition", () => {
    // US transitions in 2026: spring forward March 8, fall back November 1.
    // Date-only arithmetic should be blind to both, and this test exists to
    // keep it that way if the implementation ever changes.
    for (const transition of ["2026-03-08", "2026-11-01"]) {
      const period = containing(weekly("monday"), toISODate(transition));
      assert.equal(periodLengthInDays(period), 7, `week containing ${transition}`);
      assert.ok(periodContains(period, toISODate(transition)));
    }
  });

  it("gives March and November their true lengths under a first-of-month anchor", () => {
    assert.equal(periodLengthInDays(containing(onDay(1), toISODate("2026-03-08"))), 31);
    assert.equal(periodLengthInDays(containing(onDay(1), toISODate("2026-11-01"))), 30);
  });
});

describe("boundary adapter contract — CBD-67 §8.10", () => {
  it("returns the boundary at or before and the next boundary after any date", () => {
    const definition = weekly("monday");
    const date = toISODate("2026-08-12");
    assert.equal(boundaryAtOrBefore(definition, date), "2026-08-10");
    assert.equal(nextBoundaryAfter(definition, date), "2026-08-17");
  });

  it("treats nextBoundaryAfter as strictly after, even on a boundary", () => {
    const definition = weekly("monday");
    const onBoundary = toISODate("2026-08-10");
    assert.equal(boundaryAtOrBefore(definition, onBoundary), "2026-08-10");
    assert.equal(nextBoundaryAfter(definition, onBoundary), "2026-08-17");
  });

  it("supplies the first periods after a transition date (INV-29 example)", () => {
    // CBD-67 INV-29 works this through: a change to weekly-on-Monday effective
    // Wednesday June 17 puts the first full weekly period at June 22-28.
    assert.equal(span(containing(weekly("monday"), toISODate("2026-06-22"))), "2026-06-22..2026-06-28");
  });
});

describe("setup preview — CBD-67 §5.4", () => {
  it("returns the current period plus the next three", () => {
    const preview = previewOf(weekly("monday"), toISODate("2026-08-12"));
    assert.equal(preview.length, SETUP_PREVIEW_PERIOD_COUNT);
    assert.deepEqual(preview.map(span), [
      "2026-08-10..2026-08-16",
      "2026-08-17..2026-08-23",
      "2026-08-24..2026-08-30",
      "2026-08-31..2026-09-06",
    ]);
  });

  it("is contiguous across the whole preview", () => {
    const preview = previewOf(onDay(31), toISODate("2026-01-15"));
    for (let index = 1; index < preview.length; index += 1) {
      const previous = preview[index - 1];
      const current = preview[index];
      assert.ok(previous !== undefined && current !== undefined);
      assert.equal(current.start, addDays(previous.end, 1));
    }
  });

  it("rejects a negative or fractional count", () => {
    assert.throws(() => periodsOf(weekly("monday"), toISODate("2026-08-12"), -1), RangeError);
    assert.throws(() => periodsOf(weekly("monday"), toISODate("2026-08-12"), 1.5), RangeError);
  });
});

describe("resolution is computed, never stored — CBD-67 INV-22", () => {
  it("returns the same period no matter how often or in what order it is called", () => {
    // The invariant forbids the active cycle from depending on a user action or
    // on a midnight job having completed. A pure function cannot depend on a job
    // that did not run, so this asserts the property the invariant protects.
    const definition = onDay(15);
    const date = toISODate("2026-08-14");
    const first = containing(definition, date);

    // Interleave unrelated calls that would disturb any hidden state.
    containing(definition, toISODate("2027-01-01"));
    periodsOf(weekly("sunday"), toISODate("2020-06-06"), 12);
    containing(weekly("monday"), toISODate("2026-08-14"));

    assert.deepEqual(containing(definition, date), first);
    assert.deepEqual(containing(definition, date), first);
  });
});

describe("defence against unvalidated definitions", () => {
  it("refuses an unrecognised weekday instead of shifting every boundary", () => {
    // Before this check, indexOf returned -1 and the modular arithmetic absorbed
    // it: the result was 2026-08-09..2026-08-15, a plausible period that is
    // silently one day wrong. Loud and wrong beats quiet and wrong.
    assert.throws(
      () => containing(forged({ cadence: "weekly", anchor: "funday" as Weekday }), toISODate("2026-08-12")),
      /unrecognised weekday anchor/u,
    );
  });

  it("refuses an out-of-range monthly anchor instead of clamping it", () => {
    // Math.min(40, 31) previously yielded a boundary of 2026-07-31 with no error.
    for (const day of [40, 0, -3, 15.5]) {
      assert.throws(
        () =>
          containing(
            forged({ cadence: "monthly", anchor: { kind: "day-of-month", day } }),
            toISODate("2026-08-14"),
          ),
        /monthly anchor day must be an integer/u,
        `day ${day} should be refused`,
      );
    }
  });

  it("accepts every anchor the validator accepts", () => {
    // The defence must not be stricter than validation, or valid schedules break.
    for (const day of [1, 15, 28, 29, 30, 31]) {
      assert.doesNotThrow(() => containing(onDay(day), toISODate("2026-08-14")));
    }
  });
});

describe("generation is bounded", () => {
  it("allows the maximum and refuses one more", () => {
    assert.equal(
      periodsOf(weekly("monday"), toISODate("2026-01-05"), MAX_GENERATED_PERIODS).length,
      MAX_GENERATED_PERIODS,
    );
    assert.throws(
      () => periodsOf(weekly("monday"), toISODate("2026-01-05"), MAX_GENERATED_PERIODS + 1),
      /must not exceed/u,
    );
  });

  it("covers every preview horizon the specifications require", () => {
    // Setup preview is 4 (§5.4); the change-preview horizon is the closing
    // period plus a transition plus three (INV-42). The cap must not bind here.
    assert.ok(SETUP_PREVIEW_PERIOD_COUNT <= MAX_GENERATED_PERIODS);
    assert.ok(5 <= MAX_GENERATED_PERIODS);
  });
});

describe("review gaps", () => {
  it("boundaryAtOrBefore is idempotent", () => {
    for (const definition of [weekly("thursday"), onDay(31), monthly({ kind: "last-day" })]) {
      for (const date of ["2026-01-15", "2026-02-28", "2026-12-31", "2028-02-29"]) {
        const once = boundaryAtOrBefore(definition, toISODate(date));
        assert.equal(boundaryAtOrBefore(definition, once), once, `${date} not idempotent`);
      }
    }
  });

  it("clamps a day-29 anchor in a non-leap February", () => {
    // Covered incidentally by the 400-day sweep, but never asserted directly,
    // and it is the exact boundary between the two February behaviours.
    assert.equal(boundaryAtOrBefore(onDay(29), toISODate("2026-02-28")), "2026-02-28");
    assert.equal(boundaryAtOrBefore(onDay(29), toISODate("2028-02-29")), "2028-02-29");
    assert.deepEqual(periodsOf(onDay(29), toISODate("2026-01-29"), 3).map(span), [
      "2026-01-29..2026-02-27",
      "2026-02-28..2026-03-28",
      "2026-03-29..2026-04-28",
    ]);
  });

  it("periodContains is inclusive at both ends and false outside", () => {
    const period = containing(weekly("monday"), toISODate("2026-08-12"));
    assert.equal(periodContains(period, toISODate("2026-08-10")), true, "start is inside");
    assert.equal(periodContains(period, toISODate("2026-08-16")), true, "end is inside");
    assert.equal(periodContains(period, toISODate("2026-08-09")), false);
    assert.equal(periodContains(period, toISODate("2026-08-17")), false);
  });

  it("periodLengthInDays reports inclusive calendar days", () => {
    assert.equal(periodLengthInDays(containing(weekly("monday"), toISODate("2026-08-12"))), 7);
    assert.equal(periodLengthInDays(containing(onDay(1), toISODate("2026-02-10"))), 28);
    assert.equal(periodLengthInDays(containing(onDay(1), toISODate("2028-02-10"))), 29);
    assert.equal(periodLengthInDays(containing(onDay(1), toISODate("2026-07-10"))), 31);
  });

  it("throws at the calendar extremes rather than wrapping", () => {
    // There is genuinely no boundary before year 1 or after year 9999. The error
    // names a rendering limit rather than the situation, which is acceptable for
    // a range a budgeting product will never reach — recorded here so the
    // behaviour is a known choice rather than a surprise.
    assert.throws(() => boundaryAtOrBefore(onDay(15), toISODate("0001-01-10")), RangeError);
    assert.throws(() => containing(weekly("monday"), toISODate("9999-12-30")), RangeError);
  });
});

describe("boundary-function contract — CBD-67 §8.10 validation requirement", () => {
  // BoundaryFunctions is a public extension point, so the contract cannot be
  // assumed from the implementations in this package. §8.10 requires
  // "validation proving that generated periods are chronological, contiguous,
  // non-overlapping, and open-ended"; these are the properties every other rule
  // depends on.
  const anyDate = toISODate("2026-08-15");

  it("refuses a boundary that falls after the requested date", () => {
    assert.throws(
      () =>
        periodContaining(
          {
            boundaryAtOrBefore: () => toISODate("2026-08-20"),
            nextBoundaryAfter: () => toISODate("2026-08-25"),
          },
          anyDate,
        ),
      /is after the requested date/u,
    );
  });

  it("refuses a next boundary that is not strictly after the requested date", () => {
    assert.throws(
      () =>
        periodContaining(
          {
            boundaryAtOrBefore: () => toISODate("2026-08-10"),
            nextBoundaryAfter: () => anyDate,
          },
          anyDate,
        ),
      /not strictly after the requested date/u,
    );
  });

  it("refuses boundaries that would produce a period ending before it starts", () => {
    // This previously produced the period 2026-08-20..2026-08-09 — an end before
    // its own start — with no error at all. It is caught by the strictly-after
    // rule rather than a separate chronology check, because start <= date < next
    // already implies chronology. Writing this test is what revealed the third
    // check was unreachable.
    assert.throws(
      () =>
        periodContaining(
          {
            boundaryAtOrBefore: () => toISODate("2026-08-20"),
            nextBoundaryAfter: () => toISODate("2026-08-10"),
          },
          toISODate("2026-08-20"),
        ),
      /not strictly after the requested date/u,
    );
  });

  it("never returns a period whose end precedes its start", () => {
    // The property the two checks exist to guarantee, asserted directly rather
    // than inferred from them.
    for (const definition of [weekly("monday"), onDay(31), monthly({ kind: "last-day" })]) {
      for (const date of ["2026-01-01", "2026-02-28", "2026-08-15", "2028-02-29"]) {
        const period = containing(definition, toISODate(date));
        assert.ok(
          period.start <= period.end,
          `${span(period)} ends before it starts`,
        );
      }
    }
  });

  it("refuses a non-advancing implementation instead of repeating a period", () => {
    // periodsFrom previously returned the same period three times and presented
    // it as a consecutive sequence.
    const stuck = {
      boundaryAtOrBefore: () => toISODate("2026-08-10"),
      nextBoundaryAfter: () => toISODate("2026-08-11"),
    };
    assert.throws(() => periodsFrom(stuck, toISODate("2026-08-10"), 3), RangeError);
  });

  it("accepts every well-formed implementation in this package", () => {
    // The contract check must not be stricter than the cadences it guards.
    for (const definition of [weekly("monday"), onDay(31), monthly({ kind: "last-day" })]) {
      assert.doesNotThrow(() => containing(definition, anyDate));
    }
  });
});

describe("determinism — CBD-67 INV-87", () => {
  it("generates identical periods under different machine time zones", () => {
    const script = [
      'const m = await import("./src/schedule/period.ts");',
      'const d = await import("./src/shared/iso-date.ts");',
      'const weekly = { cadence: "weekly", anchor: "monday" };',
      'const monthly = { cadence: "monthly", anchor: { kind: "day-of-month", day: 31 } };',
      "const out = [",
      '  ...m.setupPreview(m.weeklyMonthlyBoundaries(weekly), d.toISODate("2026-08-12")),',
      '  ...m.setupPreview(m.weeklyMonthlyBoundaries(monthly), d.toISODate("2026-01-15")),',
      "].map((p) => `${p.start}..${p.end}`);",
      'process.stdout.write(out.join(","));',
    ].join("");

    const zones = ["UTC", "America/New_York", "Asia/Kolkata", "Pacific/Kiritimati", "Etc/GMT+12"];
    const results = zones.map((timeZone) =>
      execFileSync(process.execPath, ["--input-type=module", "-e", script], {
        cwd: new URL("../../", import.meta.url),
        env: { ...process.env, TZ: timeZone },
        encoding: "utf8",
      }),
    );

    const [first] = results;
    assert.ok(first !== undefined && first.startsWith("2026-08-10..2026-08-16"));
    for (const [index, result] of results.entries()) {
      assert.equal(result, first, `zone ${String(zones[index])} disagreed`);
    }
  });
});

/**
 * Compile-time assertions. Never executed — `tsc --noEmit` is the assertion.
 * If any of these stops being an error, the expectation goes unused and the
 * typecheck fails, which is the signal we want.
 */
export function _onlyValidatedWeeklyAndMonthly(date: ISODate): void {
  // @ts-expect-error paycheck generation is CBD-29, not CBD-27.
  containing({ cadence: "paycheck", pattern: { kind: "weekly", weekday: "friday" }, businessDayPolicy: "previous-business-day" }, date);
  // @ts-expect-error fixed-length custom generation is CBD-29, not CBD-27.
  containing({ cadence: "custom-fixed-length", startBoundary: date, lengthInDays: 14 }, date);
  // @ts-expect-error an unvalidated definition cannot reach the generator at all.
  containing({ cadence: "weekly", anchor: "monday" }, date);
}
