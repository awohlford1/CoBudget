import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  addDays,
  compareDates,
  daysBetween,
  daysInMonth,
  inclusiveDayCount,
  isISODate,
  isLeapYear,
  isoDateOf,
  lastDayOfMonth,
  partsOf,
  toISODate,
} from "./iso-date.ts";

describe("validation", () => {
  it("accepts a well-formed real date", () => {
    assert.equal(isISODate("2026-08-14"), true);
  });

  it("rejects well-formed dates that do not exist", () => {
    // Matches the pattern, is not a date. Accepting this would let a value that
    // belongs to no period reach period assignment (CBD-69 INV-69-19).
    assert.equal(isISODate("2026-02-30"), false);
    assert.equal(isISODate("2026-04-31"), false);
    assert.equal(isISODate("2026-13-01"), false);
    assert.equal(isISODate("2026-00-10"), false);
    assert.equal(isISODate("2026-01-00"), false);
  });

  it("rejects malformed strings", () => {
    for (const bad of ["2026-8-14", "26-08-14", "2026/08/14", "", "today", "2026-08-14T00:00:00Z"]) {
      assert.equal(isISODate(bad), false, `expected ${JSON.stringify(bad)} to be rejected`);
    }
  });

  it("toISODate throws rather than returning a sentinel", () => {
    assert.throws(() => toISODate("2026-02-30"), RangeError);
  });

  it("isoDateOf zero-pads", () => {
    assert.equal(isoDateOf(2026, 1, 5), "2026-01-05");
  });

  it("partsOf round-trips", () => {
    assert.deepEqual(partsOf(toISODate("2026-08-14")), { year: 2026, month: 8, day: 14 });
  });
});

describe("year bounds and the Date.UTC two-digit-year trap", () => {
  it("does not silently shift early years by 1900", () => {
    // Date.UTC(50, 2, 10) means 1950, not year 50. An earlier version of
    // toEpochDay inherited that, so addDays("0050-03-10", 1) returned
    // "1950-03-11" with no error. setUTCFullYear has no such legacy mapping.
    assert.equal(addDays(toISODate("0050-03-10"), 1), "0050-03-11");
    assert.equal(addDays(toISODate("0099-12-31"), 1), "0100-01-01");
    assert.equal(daysBetween(toISODate("0050-01-01"), toISODate("0050-01-02")), 1);
  });

  it("agrees with isoDateOf about which years exist", () => {
    // A guard that admits values its own constructor rejects is not a guard.
    assert.equal(isISODate("0000-01-01"), false);
    assert.throws(() => isoDateOf(0, 1, 1), RangeError);

    assert.equal(isISODate("0001-01-01"), true);
    assert.equal(isoDateOf(1, 1, 1), "0001-01-01");

    assert.equal(isISODate("9999-12-31"), true);
    assert.throws(() => isoDateOf(10_000, 1, 1), RangeError);
  });
});

describe("leap years and month lengths", () => {
  it("applies the full Gregorian rule, not just divisible-by-four", () => {
    assert.equal(isLeapYear(2024), true);
    assert.equal(isLeapYear(2026), false);
    assert.equal(isLeapYear(1900), false, "century years are not leap unless divisible by 400");
    assert.equal(isLeapYear(2000), true);
  });

  it("February 29 exists only in a leap year", () => {
    assert.equal(isISODate("2028-02-29"), true);
    assert.equal(isISODate("2026-02-29"), false);
  });

  it("reports month lengths used by monthly anchor clamping (CBD-67 INV-18)", () => {
    assert.equal(daysInMonth(2026, 2), 28);
    assert.equal(daysInMonth(2028, 2), 29);
    assert.equal(daysInMonth(2026, 4), 30);
    assert.equal(daysInMonth(2026, 12), 31);
  });

  it("lastDayOfMonth supports the explicit last-day anchor", () => {
    assert.equal(lastDayOfMonth(toISODate("2026-02-01")), "2026-02-28");
    assert.equal(lastDayOfMonth(toISODate("2028-02-15")), "2028-02-29");
    assert.equal(lastDayOfMonth(toISODate("2026-04-30")), "2026-04-30");
  });
});

describe("arithmetic", () => {
  it("crosses month and year boundaries", () => {
    assert.equal(addDays(toISODate("2026-08-31"), 1), "2026-09-01");
    assert.equal(addDays(toISODate("2026-12-31"), 1), "2027-01-01");
    assert.equal(addDays(toISODate("2027-01-01"), -1), "2026-12-31");
  });

  it("crosses February 29 correctly in both directions", () => {
    assert.equal(addDays(toISODate("2028-02-28"), 1), "2028-02-29");
    assert.equal(addDays(toISODate("2028-02-29"), 1), "2028-03-01");
    assert.equal(addDays(toISODate("2026-02-28"), 1), "2026-03-01", "no Feb 29 in a common year");
  });

  it("orders chronologically", () => {
    const earlier = toISODate("2026-08-14");
    const later = toISODate("2026-09-01");
    assert.ok(compareDates(earlier, later) < 0);
    assert.ok(compareDates(later, earlier) > 0);
    assert.equal(compareDates(earlier, earlier), 0);
  });

  it("distinguishes exclusive from inclusive day counts", () => {
    const day = toISODate("2026-08-14");
    assert.equal(daysBetween(day, day), 0, "exclusive difference of a date with itself is zero");
    assert.equal(inclusiveDayCount(day, day), 1, "a single-day period is one calendar day");
  });

  it("produces the calendar-day figures used by INV-35 proration", () => {
    // Weekly 5/7: a Wednesday-through-Sunday transition inside a 7-day period.
    assert.equal(inclusiveDayCount(toISODate("2026-06-17"), toISODate("2026-06-21")), 5);
    assert.equal(inclusiveDayCount(toISODate("2026-06-22"), toISODate("2026-06-28")), 7);
    // Monthly 14/30: June 17-30 inside a 30-day June.
    assert.equal(inclusiveDayCount(toISODate("2026-06-17"), toISODate("2026-06-30")), 14);
    assert.equal(inclusiveDayCount(toISODate("2026-06-01"), toISODate("2026-06-30")), 30);
  });

  it("rejects a reversed range rather than returning a negative length", () => {
    assert.throws(
      () => inclusiveDayCount(toISODate("2026-06-30"), toISODate("2026-06-01")),
      RangeError,
    );
  });
});

describe("determinism (CBD-67 INV-87)", () => {
  it("produces identical results under different machine time zones", () => {
    // The invariant requires the same business inputs to yield the same results
    // regardless of the machine's zone. Asserting that in-process would be
    // unconvincing because the zone is read at process start, so each zone runs
    // in its own child process.
    const script = [
      'const m = await import("./src/shared/iso-date.ts");',
      'const d = m.toISODate("2028-02-28");',
      "const out = [",
      "  m.addDays(d, 1),",
      "  m.addDays(d, -1),",
      '  m.lastDayOfMonth(m.toISODate("2028-02-10")),',
      '  String(m.inclusiveDayCount(m.toISODate("2026-06-17"), m.toISODate("2026-06-30"))),',
      '  String(m.daysBetween(m.toISODate("2026-12-31"), m.toISODate("2027-01-01"))),',
      "];",
      "process.stdout.write(out.join(\",\"));",
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
    assert.equal(first, "2028-02-29,2028-02-27,2028-02-29,14,1");
    for (const [index, result] of results.entries()) {
      assert.equal(result, first, `zone ${String(zones[index])} disagreed`);
    }
  });
});
