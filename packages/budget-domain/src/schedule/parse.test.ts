import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseCadenceDefinition, parseScheduleVersion } from "./parse.ts";
import type { ValidationResult } from "./validate.ts";

function codesOf(result: ValidationResult<unknown>): readonly string[] {
  return result.ok ? [] : result.issues.map((issue) => issue.code);
}

function pathsOf(result: ValidationResult<unknown>): readonly string[] {
  return result.ok ? [] : result.issues.map((issue) => issue.path);
}

describe("parsing rejects non-objects", () => {
  it("refuses primitives, null, and arrays", () => {
    for (const input of [null, undefined, 42, "weekly", true, []]) {
      assert.deepEqual(codesOf(parseCadenceDefinition(input)), ["input.expected-object"]);
    }
  });
});

describe("parsing narrows the cadence discriminant", () => {
  it("accepts a well-formed weekly definition", () => {
    const result = parseCadenceDefinition({ cadence: "weekly", anchor: "wednesday" });
    assert.equal(result.ok, true);
    assert.deepEqual(result.ok && result.value, { cadence: "weekly", anchor: "wednesday" });
  });

  it("rejects an unknown cadence", () => {
    assert.deepEqual(codesOf(parseCadenceDefinition({ cadence: "fortnightly" })), [
      "cadence.unsupported",
    ]);
    assert.deepEqual(codesOf(parseCadenceDefinition({})), ["cadence.unsupported"]);
  });

  it("rejects a weekday that is not a weekday", () => {
    assert.deepEqual(codesOf(parseCadenceDefinition({ cadence: "weekly", anchor: "funday" })), [
      "weekday.unsupported",
    ]);
  });

  it("rejects a weekday of the wrong type", () => {
    assert.deepEqual(codesOf(parseCadenceDefinition({ cadence: "weekly", anchor: 3 })), [
      "field.expected-string",
    ]);
  });
});

describe("parsing monthly anchors", () => {
  it("accepts both anchor kinds", () => {
    assert.equal(
      parseCadenceDefinition({ cadence: "monthly", anchor: { kind: "last-day" } }).ok,
      true,
    );
    assert.equal(
      parseCadenceDefinition({
        cadence: "monthly",
        anchor: { kind: "day-of-month", day: 15 },
      }).ok,
      true,
    );
  });

  it("rejects an unsupported anchor kind", () => {
    assert.deepEqual(
      codesOf(parseCadenceDefinition({ cadence: "monthly", anchor: { kind: "first-friday" } })),
      ["monthly-anchor.unsupported-kind"],
    );
  });

  it("separates shape failure from range failure", () => {
    // A non-numeric day is a shape problem, caught by the parser.
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({ cadence: "monthly", anchor: { kind: "day-of-month", day: "15" } }),
      ),
      ["field.expected-number"],
    );
    // A numeric day of 40 is the right shape and the wrong value, so it passes
    // parsing and is caught by validation.
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({ cadence: "monthly", anchor: { kind: "day-of-month", day: 40 } }),
      ),
      ["monthly-anchor.out-of-range"],
    );
  });
});

describe("parsing paycheck patterns", () => {
  it("accepts a supported pattern", () => {
    const result = parseCadenceDefinition({
      cadence: "paycheck",
      pattern: { kind: "twice-per-week", weekdays: ["tuesday", "friday"] },
      businessDayPolicy: "previous-business-day",
    });
    assert.equal(result.ok, true);
  });

  it("rejects an unsupported pattern kind (CBD-68 §9.3)", () => {
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({
          cadence: "paycheck",
          pattern: { kind: "bimonthly" },
          businessDayPolicy: "previous-business-day",
        }),
      ),
      ["paycheck.unsupported-pattern"],
    );
  });

  it("requires exactly two weekdays for twice-per-week", () => {
    for (const weekdays of [["monday"], ["monday", "tuesday", "friday"], "monday"]) {
      assert.deepEqual(
        codesOf(
          parseCadenceDefinition({
            cadence: "paycheck",
            pattern: { kind: "twice-per-week", weekdays },
            businessDayPolicy: "previous-business-day",
          }),
        ),
        ["field.expected-pair"],
      );
    }
  });

  it("rejects an unsupported business-day policy", () => {
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({
          cadence: "paycheck",
          pattern: { kind: "weekly", weekday: "friday" },
          businessDayPolicy: "nearest-business-day",
        }),
      ),
      ["business-day-policy.unsupported"],
    );
  });

  it("catches an out-of-range interval through validation", () => {
    // everyWeeks is numerically well-shaped, so the parser passes it through
    // and the 1-4 rule is applied by the validator.
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({
          cadence: "paycheck",
          pattern: {
            kind: "custom-weekly-interval",
            weekday: "monday",
            everyWeeks: 5,
            recurrenceOrigin: "2026-08-10",
          },
          businessDayPolicy: "previous-business-day",
        }),
      ),
      ["paycheck.interval-out-of-range"],
    );
  });

  it("rejects a recurrence origin that is not a real date", () => {
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({
          cadence: "paycheck",
          pattern: {
            kind: "every-two-weeks",
            weekday: "friday",
            recurrenceOrigin: "2026-02-30",
          },
          businessDayPolicy: "previous-business-day",
        }),
      ),
      ["field.expected-calendar-date"],
    );
  });
});

describe("parsing custom fixed-length definitions", () => {
  it("accepts a well-formed definition", () => {
    const result = parseCadenceDefinition({
      cadence: "custom-fixed-length",
      startBoundary: "2026-08-10",
      lengthInDays: 14,
    });
    assert.equal(result.ok, true);
  });

  it("rejects a start boundary that is not a real calendar date", () => {
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({
          cadence: "custom-fixed-length",
          startBoundary: "2026-02-30",
          lengthInDays: 30,
        }),
      ),
      ["field.expected-calendar-date"],
    );
  });

  it("reports every problem at once rather than only the first", () => {
    const result = parseCadenceDefinition({
      cadence: "custom-fixed-length",
      startBoundary: "not-a-date",
      lengthInDays: "thirty",
    });
    assert.deepEqual([...codesOf(result)].sort(), [
      "field.expected-calendar-date",
      "field.expected-number",
    ]);
    assert.deepEqual([...pathsOf(result)].sort(), ["lengthInDays", "startBoundary"]);
  });

  it("applies the range rule once the shape is sound (EC-69-19)", () => {
    assert.deepEqual(
      codesOf(
        parseCadenceDefinition({
          cadence: "custom-fixed-length",
          startBoundary: "2026-08-10",
          lengthInDays: 367,
        }),
      ),
      ["custom.length-out-of-range"],
    );
  });
});

describe("parsing schedule versions", () => {
  const valid = {
    versionId: "sv_1",
    budgetSpaceId: "bs_1",
    definition: { cadence: "weekly", anchor: "monday" },
    effectiveFrom: "2026-08-10",
    effectiveThrough: null,
  };

  it("accepts a well-formed open-ended version", () => {
    const result = parseScheduleVersion(valid);
    assert.equal(result.ok, true);
    assert.equal(result.ok && result.value.effectiveThrough, null);
  });

  it("accepts a closed interval", () => {
    assert.equal(parseScheduleVersion({ ...valid, effectiveThrough: "2026-09-30" }).ok, true);
  });

  it("distinguishes null from a missing or malformed end date", () => {
    // null is the normal open-ended state and must not be conflated with absent.
    assert.deepEqual(codesOf(parseScheduleVersion({ ...valid, effectiveThrough: undefined })), [
      "field.expected-calendar-date-or-null",
    ]);
    assert.deepEqual(codesOf(parseScheduleVersion({ ...valid, effectiveThrough: "soon" })), [
      "field.expected-calendar-date-or-null",
    ]);
  });

  it("prefixes nested definition issues", () => {
    const result = parseScheduleVersion({ ...valid, definition: { cadence: "fortnightly" } });
    assert.deepEqual(pathsOf(result), ["definition.cadence"]);
  });

  it("reports a non-object definition against the definition path", () => {
    const result = parseScheduleVersion({ ...valid, definition: "weekly" });
    assert.deepEqual(pathsOf(result), ["definition"]);
  });

  it("still applies version-level value rules after parsing", () => {
    const result = parseScheduleVersion({
      ...valid,
      effectiveFrom: "2026-09-01",
      effectiveThrough: "2026-08-01",
    });
    assert.deepEqual(codesOf(result), ["version.interval-reversed"]);
  });
});
