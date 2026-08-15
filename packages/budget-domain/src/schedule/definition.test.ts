import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { toISODate } from "../shared/iso-date.ts";
import {
  DEFAULT_BUSINESS_DAY_POLICY,
  DEFAULT_WEEKLY_ANCHOR,
  describeCadence,
  type CadenceDefinition,
  type ScheduleVersion,
} from "./definition.ts";
import { validateCadenceDefinition, validateScheduleVersion } from "./validate.ts";

function codesOf(result: ReturnType<typeof validateCadenceDefinition>): readonly string[] {
  return result.ok ? [] : result.issues.map((issue) => issue.code);
}

function weekly(): CadenceDefinition {
  return { cadence: "weekly", anchor: DEFAULT_WEEKLY_ANCHOR };
}

function version(overrides: Partial<ScheduleVersion> = {}): ScheduleVersion {
  return {
    versionId: "sv_1",
    budgetSpaceId: "bs_1",
    definition: weekly(),
    effectiveFrom: toISODate("2026-08-10"),
    effectiveThrough: null,
    ...overrides,
  };
}

describe("defaults", () => {
  it("weekly defaults to Monday (CBD-67)", () => {
    assert.equal(DEFAULT_WEEKLY_ANCHOR, "monday");
  });

  it("business-day policy defaults to previous business day (CBD-68 §10.1)", () => {
    assert.equal(DEFAULT_BUSINESS_DAY_POLICY, "previous-business-day");
  });
});

describe("weekly and monthly definitions", () => {
  it("accepts any weekday anchor", () => {
    assert.equal(validateCadenceDefinition({ cadence: "weekly", anchor: "saturday" }).ok, true);
  });

  it("accepts numbered anchors 1 through 31", () => {
    for (const day of [1, 15, 28, 29, 30, 31]) {
      const result = validateCadenceDefinition({
        cadence: "monthly",
        anchor: { kind: "day-of-month", day },
      });
      // 29-31 are valid saved anchors. They are clamped per month at generation
      // time (INV-18); rejecting them here would break that rule outright.
      assert.equal(result.ok, true, `day ${day} should be a valid saved anchor`);
    }
  });

  it("accepts the explicit last-day anchor", () => {
    assert.equal(
      validateCadenceDefinition({ cadence: "monthly", anchor: { kind: "last-day" } }).ok,
      true,
    );
  });

  it("rejects a day outside 1-31 with a specific code", () => {
    for (const day of [0, 32, -1]) {
      const result = validateCadenceDefinition({
        cadence: "monthly",
        anchor: { kind: "day-of-month", day },
      });
      assert.deepEqual(codesOf(result), ["monthly-anchor.out-of-range"]);
    }
  });

  it("rejects a fractional day", () => {
    const result = validateCadenceDefinition({
      cadence: "monthly",
      anchor: { kind: "day-of-month", day: 15.5 },
    });
    assert.deepEqual(codesOf(result), ["monthly-anchor.not-an-integer"]);
  });
});

describe("paycheck definitions (CBD-68 §9.3)", () => {
  it("accepts each of the six supported patterns", () => {
    const origin = toISODate("2026-08-14");
    const patterns: CadenceDefinition[] = [
      {
        cadence: "paycheck",
        pattern: { kind: "twice-per-week", weekdays: ["tuesday", "friday"] },
        businessDayPolicy: "previous-business-day",
      },
      {
        cadence: "paycheck",
        pattern: { kind: "weekly", weekday: "friday" },
        businessDayPolicy: "next-business-day",
      },
      {
        cadence: "paycheck",
        pattern: { kind: "every-two-weeks", weekday: "friday", recurrenceOrigin: origin },
        businessDayPolicy: "keep-original-date",
      },
      {
        cadence: "paycheck",
        pattern: {
          kind: "twice-per-month",
          anchors: [{ kind: "day-of-month", day: 15 }, { kind: "last-day" }],
        },
        businessDayPolicy: "previous-business-day",
      },
      {
        cadence: "paycheck",
        pattern: { kind: "monthly", anchor: { kind: "day-of-month", day: 1 } },
        businessDayPolicy: "previous-business-day",
      },
      {
        cadence: "paycheck",
        pattern: {
          kind: "custom-weekly-interval",
          weekday: "friday",
          everyWeeks: 3,
          // 2026-08-14 is a Friday. The origin must fall on the stated weekday,
          // because the generator strides from the origin and never reads the
          // weekday; a mismatch would make describeCadence contradict the
          // boundaries. This fixture originally said "thursday" and was wrong.
          recurrenceOrigin: origin,
        },
        businessDayPolicy: "previous-business-day",
      },
    ];

    for (const definition of patterns) {
      assert.equal(validateCadenceDefinition(definition).ok, true, describeCadence(definition));
    }
  });

  it("requires two different weekdays for twice-per-week", () => {
    const result = validateCadenceDefinition({
      cadence: "paycheck",
      pattern: { kind: "twice-per-week", weekdays: ["friday", "friday"] },
      businessDayPolicy: "previous-business-day",
    });
    assert.deepEqual(codesOf(result), ["paycheck.duplicate-weekday"]);
  });

  it("requires two different anchors for twice-per-month", () => {
    const result = validateCadenceDefinition({
      cadence: "paycheck",
      pattern: {
        kind: "twice-per-month",
        anchors: [{ kind: "day-of-month", day: 15 }, { kind: "day-of-month", day: 15 }],
      },
      businessDayPolicy: "previous-business-day",
    });
    assert.deepEqual(codesOf(result), ["paycheck.duplicate-monthly-anchor"]);
  });

  it("treats last-day and a numbered day as different anchors", () => {
    const result = validateCadenceDefinition({
      cadence: "paycheck",
      pattern: {
        kind: "twice-per-month",
        anchors: [{ kind: "day-of-month", day: 31 }, { kind: "last-day" }],
      },
      businessDayPolicy: "previous-business-day",
    });
    // They coincide in a 31-day month but express different intents, so this is
    // a legitimate configuration rather than a duplicate.
    assert.equal(result.ok, true);
  });

  it("requires the recurrence origin to fall on the stated weekday", () => {
    // 2026-01-01 is a Thursday. Without this rule the definition validated, the
    // generator strode 14 days from Thursday, and describeCadence still said
    // "on friday" — a recurrence summary that contradicted its own boundaries.
    const result = validateCadenceDefinition({
      cadence: "paycheck",
      pattern: {
        kind: "every-two-weeks",
        weekday: "friday",
        recurrenceOrigin: toISODate("2026-01-01"),
      },
      businessDayPolicy: "previous-business-day",
    });
    assert.deepEqual(codesOf(result), ["paycheck.origin-weekday-mismatch"]);
  });

  it("applies the same rule to a custom weekly interval", () => {
    const result = validateCadenceDefinition({
      cadence: "paycheck",
      pattern: {
        kind: "custom-weekly-interval",
        weekday: "monday",
        everyWeeks: 2,
        recurrenceOrigin: toISODate("2026-01-01"),
      },
      businessDayPolicy: "previous-business-day",
    });
    assert.deepEqual(codesOf(result), ["paycheck.origin-weekday-mismatch"]);
  });

  it("reports only the invalid date when the origin is not a date at all", () => {
    // A malformed origin has no weekday, so piling a mismatch on top would be
    // noise addressed to a field the user has not yet filled in correctly.
    const result = validateCadenceDefinition({
      cadence: "paycheck",
      pattern: {
        kind: "every-two-weeks",
        weekday: "friday",
        recurrenceOrigin: "2026-02-30" as never,
      },
      businessDayPolicy: "previous-business-day",
    });
    assert.deepEqual(codesOf(result), ["recurrence-origin.invalid-date"]);
  });

  // An out-of-range everyWeeks cannot be expressed as a typed CadenceDefinition
  // without a cast, so it is exercised through the parser in parse.test.ts,
  // where the input is genuinely untyped.
});

describe("custom fixed-length definitions (CBD-68 §14.1)", () => {
  it("accepts the full supported range", () => {
    for (const lengthInDays of [1, 14, 365, 366]) {
      const result = validateCadenceDefinition({
        cadence: "custom-fixed-length",
        startBoundary: toISODate("2026-08-10"),
        lengthInDays,
      });
      assert.equal(result.ok, true, `length ${lengthInDays} should be accepted`);
    }
  });

  it("rejects 0 and 367 (EC-69-19)", () => {
    for (const lengthInDays of [0, 367, -5]) {
      const result = validateCadenceDefinition({
        cadence: "custom-fixed-length",
        startBoundary: toISODate("2026-08-10"),
        lengthInDays,
      });
      assert.deepEqual(codesOf(result), ["custom.length-out-of-range"]);
    }
  });

  it("rejects a non-integer length", () => {
    const result = validateCadenceDefinition({
      cadence: "custom-fixed-length",
      startBoundary: toISODate("2026-08-10"),
      lengthInDays: 30.5,
    });
    assert.deepEqual(codesOf(result), ["custom.length-not-an-integer"]);
  });

  // An invalid start boundary cannot be expressed as a typed ISODate without a
  // cast. Those cases live in parse.test.ts, which takes untyped input.
});

describe("schedule versions", () => {
  it("treats a null effectiveThrough as the normal open-ended state", () => {
    // CBD-68 INV-68-19/20: an activated cadence runs until explicitly replaced.
    assert.equal(validateScheduleVersion(version()).ok, true);
  });

  it("accepts a closed interval once superseded", () => {
    const result = validateScheduleVersion(
      version({ effectiveThrough: toISODate("2026-09-30") }),
    );
    assert.equal(result.ok, true);
  });

  it("rejects an interval that ends before it begins", () => {
    const result = validateScheduleVersion(
      version({ effectiveFrom: toISODate("2026-09-01"), effectiveThrough: toISODate("2026-08-01") }),
    );
    assert.equal(result.ok, false);
    assert.ok(
      !result.ok && result.issues.some((issue) => issue.code === "version.interval-reversed"),
    );
  });

  it("prefixes nested definition issues with their path", () => {
    const result = validateScheduleVersion(
      version({ definition: { cadence: "monthly", anchor: { kind: "day-of-month", day: 40 } } }),
    );
    assert.equal(result.ok, false);
    assert.ok(!result.ok && result.issues.some((issue) => issue.path === "definition.anchor.day"));
  });

  it("carries no time-zone field (CBD-67 INV-24, INV-75)", () => {
    // A time-zone change is a budget setting and must never produce a schedule
    // version. The cheapest way to guarantee that is for the type to have
    // nowhere to put one.
    const keys = Object.keys(version()).sort();
    assert.deepEqual(keys, [
      "budgetSpaceId",
      "definition",
      "effectiveFrom",
      "effectiveThrough",
      "versionId",
    ]);
  });
});

describe("adapter contract (CBD-67 §8.10)", () => {
  it("produces a human-readable summary for every cadence", () => {
    assert.equal(describeCadence(weekly()), "Weekly on monday");
    assert.equal(
      describeCadence({ cadence: "monthly", anchor: { kind: "last-day" } }),
      "Monthly on the last day of the month",
    );
    assert.equal(
      describeCadence({
        cadence: "custom-fixed-length",
        startBoundary: toISODate("2026-08-10"),
        lengthInDays: 10,
      }),
      "Every 10 days from 2026-08-10",
    );
    assert.equal(
      describeCadence({
        cadence: "paycheck",
        pattern: { kind: "weekly", weekday: "friday" },
        businessDayPolicy: "previous-business-day",
      }),
      "Paycheck: weekly on friday (previous-business-day)",
    );
  });
});

/**
 * Compile-time assertions. Never executed — `tsc --noEmit` is the assertion.
 * If a `readonly` modifier is dropped, the `@ts-expect-error` becomes unused
 * and the typecheck fails, which is exactly the signal we want for INV-61.
 */
export function _authoritativeVersionsAreImmutable(existing: ScheduleVersion): void {
  // @ts-expect-error INV-61: an authoritative schedule version is immutable.
  existing.versionId = "mutated";
  // @ts-expect-error INV-61: its definition cannot be swapped in place either.
  existing.definition = weekly();
}
