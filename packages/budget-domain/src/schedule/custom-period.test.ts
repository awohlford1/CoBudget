import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addDays, toISODate, type ISODate } from "../shared/iso-date.ts";
import type { CadenceDefinition } from "./definition.ts";
import {
  customBoundaries,
  customBoundaryAtOrBefore,
  customNextBoundaryAfter,
  type CustomFixedLengthDefinition,
} from "./custom-period.ts";
import {
  periodContains,
  periodLengthInDays,
  periodContaining,
  periodsFrom,
  setupPreview,
  type BudgetPeriod,
} from "./period.ts";
import { validateCadenceDefinition } from "./validate.ts";

function custom(startBoundary: string, lengthInDays: number): CustomFixedLengthDefinition {
  const result = validateCadenceDefinition({
    cadence: "custom-fixed-length",
    startBoundary: toISODate(startBoundary),
    lengthInDays,
  });
  if (!result.ok) {
    throw new Error(`fixture failed validation: ${result.issues.map((i) => i.code).join(", ")}`);
  }
  if (result.value.cadence !== "custom-fixed-length") {
    throw new Error("fixture is not a custom cadence");
  }
  return result.value;
}

/** Forge an unvalidated definition to prove the runtime defence fires. */
function forged(definition: CadenceDefinition): CustomFixedLengthDefinition {
  return definition as CustomFixedLengthDefinition;
}

function span(period: BudgetPeriod): string {
  return `${period.start}..${period.end}`;
}

function periodsOf(
  definition: CustomFixedLengthDefinition,
  from: string,
  count: number,
): readonly string[] {
  return periodsFrom(customBoundaries(definition), toISODate(from), count).map(span);
}

describe("generation formula — CBD-68 §14.2", () => {
  it("runs period 1 from S through S + L − 1", () => {
    // The specification states the formula directly, so it is asserted directly.
    const definition = custom("2026-08-10", 14);
    const first = periodContaining(customBoundaries(definition), toISODate("2026-08-10"));
    assert.equal(span(first), "2026-08-10..2026-08-23");
    assert.equal(periodLengthInDays(first), 14);
  });

  it("starts every later period the day after the previous ends", () => {
    assert.deepEqual(periodsOf(custom("2026-08-10", 14), "2026-08-10", 4), [
      "2026-08-10..2026-08-23",
      "2026-08-24..2026-09-06",
      "2026-09-07..2026-09-20",
      "2026-09-21..2026-10-04",
    ]);
  });

  it("supports the full 1 to 366 day range", () => {
    assert.equal(
      span(periodContaining(customBoundaries(custom("2026-08-10", 1)), toISODate("2026-08-10"))),
      "2026-08-10..2026-08-10",
      "a one-day period starts and ends on the same date",
    );
    assert.equal(
      periodLengthInDays(
        periodContaining(customBoundaries(custom("2026-01-01", 366)), toISODate("2026-06-01")),
      ),
      366,
    );
  });

  it("keeps a fixed stride across month, year, and leap-day boundaries", () => {
    // A 10-day stride from mid-February 2028 walks straight over February 29
    // without special handling, because the stride is in calendar days.
    assert.deepEqual(periodsOf(custom("2028-02-20", 10), "2028-02-20", 3), [
      "2028-02-20..2028-02-29",
      "2028-03-01..2028-03-10",
      "2028-03-11..2028-03-20",
    ]);
    assert.deepEqual(periodsOf(custom("2026-12-26", 10), "2026-12-26", 2), [
      "2026-12-26..2027-01-04",
      "2027-01-05..2027-01-14",
    ]);
  });
});

describe("structural guarantees — CBD-68 §14.2, INV-68-11, INV-68-12", () => {
  const definitions = [
    custom("2026-01-01", 1),
    custom("2026-01-01", 7),
    custom("2026-03-15", 10),
    custom("2026-01-01", 30),
    custom("2026-06-17", 45),
    custom("2026-01-01", 366),
  ];

  it("assigns every date in a 400-day span to exactly one period", () => {
    for (const definition of definitions) {
      const adapter = customBoundaries(definition);
      let date = toISODate("2026-01-01");
      for (let offset = 0; offset < 400; offset += 1) {
        const period = periodContaining(adapter, date);
        assert.ok(periodContains(period, date), `${date} not inside its own period`);
        assert.deepEqual(periodContaining(adapter, period.start), period);
        assert.deepEqual(periodContaining(adapter, period.end), period);
        // Contiguous with no gap and no overlap.
        assert.equal(periodContaining(adapter, addDays(period.end, 1)).start, addDays(period.end, 1));
        date = addDays(date, 1);
      }
    }
  });

  it("gives every generated period exactly the configured length", () => {
    for (const definition of definitions) {
      for (const period of periodsFrom(customBoundaries(definition), toISODate("2026-05-05"), 12)) {
        assert.equal(
          periodLengthInDays(period),
          definition.lengthInDays,
          `${span(period)} under a ${definition.lengthInDays}-day rule`,
        );
      }
    }
  });

  it("is idempotent at the boundary function", () => {
    for (const definition of definitions) {
      for (const date of ["2026-01-01", "2026-02-28", "2026-12-31", "2028-02-29"]) {
        const once = customBoundaryAtOrBefore(definition, toISODate(date));
        assert.equal(customBoundaryAtOrBefore(definition, once), once);
      }
    }
  });

  it("treats nextBoundaryAfter as strictly after, even on a boundary", () => {
    const definition = custom("2026-08-10", 14);
    const onBoundary = toISODate("2026-08-10");
    assert.equal(customBoundaryAtOrBefore(definition, onBoundary), "2026-08-10");
    assert.equal(customNextBoundaryAfter(definition, onBoundary), "2026-08-24");
  });
});

describe("dates before the start boundary", () => {
  it("extrapolates backwards rather than failing", () => {
    // The adapter answers only where boundaries fall under the rule. Bounding
    // that to the interval a schedule version governed is CBD-28's job. Weekly
    // and monthly behave identically: every date has a preceding Monday.
    const definition = custom("2026-08-10", 7);
    assert.equal(customBoundaryAtOrBefore(definition, toISODate("2026-08-09")), "2026-08-03");
    assert.equal(customBoundaryAtOrBefore(definition, toISODate("2026-08-03")), "2026-08-03");
    assert.equal(customBoundaryAtOrBefore(definition, toISODate("2026-08-02")), "2026-07-27");
  });

  it("keeps floor division correct across the start boundary", () => {
    // Negative elapsed days are where a naive truncating division would put the
    // boundary one period too late.
    const definition = custom("2026-08-10", 10);
    const before = periodContaining(customBoundaries(definition), toISODate("2026-08-05"));
    assert.equal(span(before), "2026-07-31..2026-08-09");
    assert.equal(periodLengthInDays(before), 10);
  });
});

describe("defence against unvalidated definitions", () => {
  it("refuses a length outside the supported range", () => {
    for (const lengthInDays of [0, 367, -5, 14.5]) {
      assert.throws(
        () =>
          customBoundaryAtOrBefore(
            forged({
              cadence: "custom-fixed-length",
              startBoundary: toISODate("2026-08-10"),
              lengthInDays,
            }),
            toISODate("2026-08-14"),
          ),
        /custom period length must be an integer/u,
        `length ${lengthInDays} should be refused`,
      );
    }
  });

  it("refuses at adapter construction, not only at first use", () => {
    // Failing early gives a caller the error at the point the mistake was made.
    assert.throws(
      () =>
        customBoundaries(
          forged({
            cadence: "custom-fixed-length",
            startBoundary: toISODate("2026-08-10"),
            lengthInDays: 0,
          }),
        ),
      /custom period length must be an integer/u,
    );
  });

  it("accepts every length the validator accepts", () => {
    for (const lengthInDays of [1, 2, 30, 365, 366]) {
      assert.doesNotThrow(() => customBoundaries(custom("2026-08-10", lengthInDays)));
    }
  });
});

describe("shares the CBD-27 helpers unchanged", () => {
  it("works with setupPreview", () => {
    assert.deepEqual(
      setupPreview(customBoundaries(custom("2026-08-10", 14)), toISODate("2026-08-15")).map(span),
      [
        "2026-08-10..2026-08-23",
        "2026-08-24..2026-09-06",
        "2026-09-07..2026-09-20",
        "2026-09-21..2026-10-04",
      ],
    );
  });

  it("is bounded by the same generation cap", () => {
    assert.throws(
      () => periodsFrom(customBoundaries(custom("2026-08-10", 7)), toISODate("2026-08-10"), 10_000),
      /must not exceed/u,
    );
  });
});

/** Compile-time assertions. Never executed — `tsc --noEmit` is the assertion. */
export function _requiresValidatedCustomDefinition(date: ISODate): void {
  // @ts-expect-error an unvalidated definition cannot reach the generator.
  customBoundaries({ cadence: "custom-fixed-length", startBoundary: date, lengthInDays: 14 });
  // @ts-expect-error weekly generation is CBD-27, not this module.
  customBoundaries({ cadence: "weekly", anchor: "monday" });
}
