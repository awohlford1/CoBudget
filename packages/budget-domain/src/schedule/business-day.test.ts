import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addDays, daysBetween, toISODate } from "../shared/iso-date.ts";
import {
  FEDERAL_RESERVE_CALENDAR,
  HolidayCoverageError,
  addBusinessDays,
  adjustToBusinessDay,
  businessDaysBetween,
  federalReserveHolidays,
  isBusinessDay,
  isYearCovered,
  nonBusinessDayReason,
} from "./business-day.ts";

function dates(year: number): readonly string[] {
  return federalReserveHolidays(year).map((holiday) => holiday.date);
}

describe("published schedule — verified against the Federal Reserve source", () => {
  // These are the dates published at frbservices.org/about/holiday-schedules,
  // checked on 2026-08-14. PD-68-05 requires the data to be verified against
  // that source, so the fixtures are the published dates rather than the output
  // of the code under test.
  it("matches the published 2026 dates", () => {
    assert.deepEqual(dates(2026), [
      "2026-01-01", // New Year's Day
      "2026-01-19", // Martin Luther King, Jr. Day
      "2026-02-16", // Washington's Birthday
      "2026-05-25", // Memorial Day
      "2026-06-19", // Juneteenth
      "2026-07-04", // Independence Day (Saturday)
      "2026-09-07", // Labor Day
      "2026-10-12", // Columbus Day
      "2026-11-11", // Veterans Day
      "2026-11-26", // Thanksgiving Day
      "2026-12-25", // Christmas Day
    ]);
  });

  it("matches the published 2027 dates", () => {
    assert.deepEqual(dates(2027), [
      "2027-01-01",
      "2027-01-18",
      "2027-02-15",
      "2027-05-31", // Memorial Day is the *last* Monday, not the fourth
      "2027-06-19", // Saturday
      "2027-07-04", // Sunday
      "2027-09-06",
      "2027-10-11",
      "2027-11-11",
      "2027-11-25",
      "2027-12-25", // Saturday
    ]);
  });

  it("returns eleven holidays in calendar order for every covered year", () => {
    for (let year = FEDERAL_RESERVE_CALENDAR.verifiedFrom; year <= FEDERAL_RESERVE_CALENDAR.verifiedThrough; year += 1) {
      const holidays = federalReserveHolidays(year);
      assert.equal(holidays.length, 11, `${year} should have eleven holidays`);
      const sorted = [...holidays].map((h) => h.date).sort();
      assert.deepEqual(holidays.map((h) => h.date), sorted, `${year} is not in calendar order`);
    }
  });
});

describe("coverage is bounded — PD-68-05, CBD-68 §10.3", () => {
  it("refuses years outside the verified range rather than extrapolating", () => {
    // The rule is computable for any year, which is exactly the danger: the
    // specification requires an uncovered year to block rather than to silently
    // produce weekday-only logic.
    assert.throws(() => federalReserveHolidays(2025), HolidayCoverageError);
    assert.throws(() => federalReserveHolidays(2031), HolidayCoverageError);
    assert.throws(() => isBusinessDay(toISODate("2031-06-15")), HolidayCoverageError);
  });

  it("names the uncovered year in the error", () => {
    try {
      federalReserveHolidays(2031);
      assert.fail("expected HolidayCoverageError");
    } catch (error) {
      assert.ok(error instanceof HolidayCoverageError);
      assert.equal(error.year, 2031);
      assert.match(error.message, /2031 is not covered/u);
    }
  });

  it("reports coverage without throwing", () => {
    assert.equal(isYearCovered(2025), false);
    assert.equal(isYearCovered(2026), true);
    assert.equal(isYearCovered(2030), true);
    assert.equal(isYearCovered(2031), false);
  });

  it("carries the provenance §10.2 requires", () => {
    assert.match(FEDERAL_RESERVE_CALENDAR.source, /Federal Reserve Financial Services/u);
    assert.ok(FEDERAL_RESERVE_CALENDAR.datasetVersion.length > 0);
    assert.ok(FEDERAL_RESERVE_CALENDAR.verifiedThrough >= FEDERAL_RESERVE_CALENDAR.verifiedFrom);
  });
});

describe("the asymmetric weekend rule — CBD-68 §10.1", () => {
  it("leaves the Friday before a Saturday holiday a business day", () => {
    // Independence Day 2026 falls on Saturday. The OPM calendar would close
    // Friday July 3; Federal Reserve Banks stay open. Using the wrong calendar
    // here would move a real payday.
    assert.equal(isBusinessDay(toISODate("2026-07-03")), true);
    assert.equal(nonBusinessDayReason(toISODate("2026-07-03")), null);
  });

  it("closes the Monday after a Sunday holiday", () => {
    // Independence Day 2027 falls on Sunday, so Monday July 5 is closed even
    // though it is not itself the holiday.
    assert.deepEqual(nonBusinessDayReason(toISODate("2027-07-05")), {
      kind: "holiday-observed",
      holiday: "Independence Day",
    });
    assert.equal(isBusinessDay(toISODate("2027-07-05")), false);
  });

  it("does not close the Monday after a Saturday holiday", () => {
    // Christmas 2027 is a Saturday. Monday December 27 is an ordinary business
    // day — only the Sunday rule shifts a closure onto a Monday.
    assert.equal(isBusinessDay(toISODate("2027-12-27")), true);
  });

  it("reports weekends and holidays distinctly", () => {
    assert.deepEqual(nonBusinessDayReason(toISODate("2026-07-04")), { kind: "weekend" });
    assert.deepEqual(nonBusinessDayReason(toISODate("2026-12-25")), {
      kind: "holiday",
      holiday: "Christmas Day",
    });
    assert.equal(nonBusinessDayReason(toISODate("2026-08-14")), null, "an ordinary Friday");
  });
});

describe("adjustment policies — CBD-68 §10.1", () => {
  it("moves backward to the nearest business day", () => {
    // Saturday July 4 2026 with the default policy lands on Friday July 3,
    // which stays open under the Saturday rule.
    const adjustment = adjustToBusinessDay(toISODate("2026-07-04"), "previous-business-day");
    assert.equal(adjustment.adjustedDate, "2026-07-03");
    assert.equal(adjustment.unadjustedDate, "2026-07-04");
    assert.deepEqual(adjustment.reason, { kind: "weekend" });
  });

  it("moves forward to the nearest business day", () => {
    // Sunday July 4 2027 forward skips Monday July 5, which is the observed
    // closure, landing on Tuesday July 6.
    const adjustment = adjustToBusinessDay(toISODate("2027-07-04"), "next-business-day");
    assert.equal(adjustment.adjustedDate, "2027-07-06");
  });

  it("keeps the original date but still records why", () => {
    const adjustment = adjustToBusinessDay(toISODate("2026-07-04"), "keep-original-date");
    assert.equal(adjustment.adjustedDate, "2026-07-04");
    assert.deepEqual(adjustment.reason, { kind: "weekend" });
  });

  it("leaves a business day untouched with no reason", () => {
    const adjustment = adjustToBusinessDay(toISODate("2026-08-14"), "previous-business-day");
    assert.equal(adjustment.adjustedDate, "2026-08-14");
    assert.equal(adjustment.reason, null);
  });

  it("skips a holiday adjacent to a weekend", () => {
    // Christmas 2026 is a Friday. Moving backward from Saturday December 26
    // must skip it and land on Thursday December 24.
    assert.equal(
      adjustToBusinessDay(toISODate("2026-12-26"), "previous-business-day").adjustedDate,
      "2026-12-24",
    );
  });

  it("records the dataset version on every adjustment", () => {
    for (const policy of ["previous-business-day", "next-business-day", "keep-original-date"] as const) {
      const adjustment = adjustToBusinessDay(toISODate("2026-07-04"), policy);
      assert.equal(adjustment.datasetVersion, FEDERAL_RESERVE_CALENDAR.datasetVersion);
      assert.equal(adjustment.policy, policy);
    }
  });

  it("always lands on a business day when it moves", () => {
    // Sweep a full covered year and assert the postcondition, rather than
    // trusting that the individual fixtures above cover every shape.
    for (const policy of ["previous-business-day", "next-business-day"] as const) {
      let date = toISODate("2027-01-02");
      for (let offset = 0; offset < 360; offset += 1) {
        const adjustment = adjustToBusinessDay(date, policy);
        assert.equal(
          isBusinessDay(adjustment.adjustedDate),
          true,
          `${date} under ${policy} produced non-business ${adjustment.adjustedDate}`,
        );
        date = addDays(date, 1);
      }
    }
  });

  it("blocks rather than guessing when adjustment would leave coverage", () => {
    // January 1 2026 is both a holiday and the first day of the verified window.
    // Moving backward would require knowing whether December 31 2025 was a
    // business day, which has not been verified — so it throws rather than
    // assuming. The practical consequence is that the first days of the window
    // cannot adjust backward; that is a real limitation of bounded coverage
    // rather than a defect, and it is tracked in CBD-98.
    assert.throws(
      () => adjustToBusinessDay(toISODate("2026-01-01"), "previous-business-day"),
      HolidayCoverageError,
    );
    // Forward adjustment from the same date stays inside coverage and works.
    assert.equal(
      adjustToBusinessDay(toISODate("2026-01-01"), "next-business-day").adjustedDate,
      "2026-01-02",
    );
  });

  it("never moves further than a real run of closures requires", () => {
    // The longest genuine run is four days: a Thursday holiday, Friday holiday,
    // and the weekend. Anything larger would mean the calendar is wrong.
    // Starts clear of January 1 so backward adjustment stays inside coverage.
    let date = toISODate("2026-01-05");
    for (let offset = 0; offset < 355; offset += 1) {
      for (const policy of ["previous-business-day", "next-business-day"] as const) {
        const { unadjustedDate, adjustedDate } = adjustToBusinessDay(date, policy);
        assert.ok(
          Math.abs(daysBetween(unadjustedDate, adjustedDate)) <= 4,
          `${date} under ${policy} moved to ${adjustedDate}`,
        );
      }
      date = addDays(date, 1);
    }
  });
});

describe("counting business days forward (CBD-68 §12, §13.2)", () => {
  it("treats the starting date as day zero", () => {
    // REC-03 fixes this: one business day after Friday 2026-08-21 is Monday
    // 2026-08-24, not the Saturday and not the Friday itself.
    assert.equal(addBusinessDays(toISODate("2026-08-21"), 1), "2026-08-24");
  });

  it("counts the fifth business day for the Late and suggestion windows", () => {
    // Mon 24th is 1, Tue 25th 2, Wed 26th 3, Thu 27th 4, Fri 28th 5.
    assert.equal(addBusinessDays(toISODate("2026-08-21"), 5), "2026-08-28");
  });

  it("skips a holiday inside the window rather than consuming a count", () => {
    // Thanksgiving 2026 is Thursday 2026-11-26. From Monday 2026-11-23 the
    // fifth business day is Tuesday 2026-12-01; a weekday-only count would
    // wrongly give Monday 2026-11-30.
    assert.equal(addBusinessDays(toISODate("2026-11-23"), 5), "2026-12-01");
    assert.equal(isBusinessDay(toISODate("2026-11-26")), false);
  });

  it("counts from a start date that is not itself a business day", () => {
    // A keep-original-date policy can leave an expectation on a Sunday. Day
    // zero is still the date given, so counting begins the following Monday.
    assert.equal(addBusinessDays(toISODate("2026-08-23"), 1), "2026-08-24");
  });

  it("counts backward for a negative count", () => {
    // §13.2's suggestion window reaches five business days either side.
    assert.equal(addBusinessDays(toISODate("2026-08-24"), -1), "2026-08-21");
    assert.equal(addBusinessDays(toISODate("2026-08-28"), -5), "2026-08-21");
  });

  it("skips a holiday counting backward too", () => {
    // Mirror of the forward case: from Tuesday 2026-12-01 the fifth business
    // day back is Monday 2026-11-23, with Thanksgiving inside the window.
    assert.equal(addBusinessDays(toISODate("2026-12-01"), -5), "2026-11-23");
  });

  it("refuses a count of zero or a non-integer", () => {
    for (const count of [0, 1.5, -2.5, Number.NaN]) {
      assert.throws(
        () => addBusinessDays(toISODate("2026-08-21"), count),
        /count must be a non-zero integer/u,
      );
    }
  });

  it("throws rather than walking past verified coverage", () => {
    assert.throws(
      () => addBusinessDays(toISODate("2030-12-24"), 10),
      (error: unknown) => error instanceof HolidayCoverageError,
    );
  });
});

describe("measuring business days between two dates (CBD-68 §13.2 variance)", () => {
  it("reproduces the REC-03 worked example", () => {
    // Expected Friday 2026-08-21, received Monday 2026-08-24: the scenario
    // states +3 calendar days and +1 business day.
    const expected = toISODate("2026-08-21");
    const received = toISODate("2026-08-24");
    assert.equal(daysBetween(expected, received), 3);
    assert.equal(businessDaysBetween(expected, received), 1);
  });

  it("is zero for the same date and signed by direction", () => {
    assert.equal(businessDaysBetween(toISODate("2026-08-21"), toISODate("2026-08-21")), 0);
    assert.equal(businessDaysBetween(toISODate("2026-08-24"), toISODate("2026-08-21")), -1);
  });

  it("excludes a holiday from the count", () => {
    // Monday 2026-11-23 to Tuesday 2026-12-01 spans 8 calendar days but only 5
    // business days, because Thanksgiving and two weekends fall inside.
    const from = toISODate("2026-11-23");
    const to = toISODate("2026-12-01");
    assert.equal(daysBetween(from, to), 8);
    assert.equal(businessDaysBetween(from, to), 5);
  });

  it("inverts addBusinessDays when the anchor is a business day", () => {
    const anchor = toISODate("2026-08-21");
    assert.equal(isBusinessDay(anchor), true);
    for (const n of [1, 2, 3, 4, 5]) {
      assert.equal(businessDaysBetween(anchor, addBusinessDays(anchor, n)), n, `+${n}`);
      assert.equal(businessDaysBetween(anchor, addBusinessDays(anchor, -n)), -n, `-${n}`);
    }
  });

  it("does not invert from a non-business anchor, as documented", () => {
    // Saturday. The only date in the half-open range back to Friday is the
    // Saturday itself, which is not a business day — so the count is 0, not -1.
    // Reachable under keep-original-date, where an expectation can sit on a
    // weekend, so it is pinned rather than left to surprise someone.
    const saturday = toISODate("2026-08-22");
    assert.equal(isBusinessDay(saturday), false);
    assert.equal(addBusinessDays(saturday, -1), "2026-08-21");
    assert.equal(businessDaysBetween(saturday, toISODate("2026-08-21")), 0);
  });
});
