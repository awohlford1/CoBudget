import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildPaycheckSchedule } from "../schedule/paycheck-period.ts";
import { periodsFrom } from "../schedule/period.ts";
import { validateCadenceDefinition } from "../schedule/validate.ts";
import { toISODate } from "../shared/iso-date.ts";
import { identityOf, projectOccurrences, type OccurrenceException } from "./occurrence.ts";
import { periodIncome } from "./period-income.ts";
import type { ActualIncome, MatchProvenance, ReconciliationLink } from "./reconciliation.ts";
import type { IncomeSchedule } from "./schedule.ts";

const MATCHED: MatchProvenance = {
  by: "automatic",
  recordedAt: "2026-08-21T09:00:00-04:00",
  tier: "exact",
};

function provenance() {
  return {
    actorId: "ACTOR-01",
    recordedAt: "2026-08-01T09:00:00-04:00",
    scheduleVersionId: "SV-1",
    reason: null,
  };
}

/** Weekly on Friday: boundaries 2026-08-07, 08-14, 08-21, 08-28, 09-04. */
function payroll(): IncomeSchedule {
  const result = validateCadenceDefinition({
    cadence: "paycheck",
    pattern: { kind: "weekly", weekday: "friday" },
    businessDayPolicy: "previous-business-day",
  });
  if (!result.ok || result.value.cadence !== "paycheck") throw new Error("fixture invalid");
  return {
    id: "payroll",
    name: "Payroll",
    recurrence: result.value,
    projectedAmountMinorUnits: 200_000,
    active: true,
  };
}

const HORIZON = { from: toISODate("2026-08-01"), through: toISODate("2026-09-30") };

function setUp(exceptions: readonly OccurrenceException[] = []) {
  const schedule = payroll();
  const built = buildPaycheckSchedule(schedule.recurrence, HORIZON);
  const occurrences = projectOccurrences(schedule, built.occurrences, exceptions);
  const periods = periodsFrom(built.boundaries, toISODate("2026-08-07"), 3);
  return { schedule, built, occurrences, periods };
}

function received(id: string, date: string, amountMinorUnits = 200_000): ActualIncome {
  return { id, receivedOn: toISODate(date), amountMinorUnits, currency: "USD" };
}

describe("period totals (§12.1)", () => {
  it("counts an expectation in the period holding its projected date", () => {
    const { occurrences, periods } = setUp();
    const totals = periodIncome(periods, occurrences, [], {
      asOf: toISODate("2026-08-01"),
      links: [],
    });

    // Periods are 08-07..08-13, 08-14..08-20, 08-21..08-27, each holding one
    // Friday payday.
    assert.deepEqual(
      totals.map((t) => t.expectedMinorUnits),
      [200_000, 200_000, 200_000],
    );
    assert.deepEqual(
      totals.map((t) => t.actualMinorUnits),
      [0, 0, 0],
    );
    assert.deepEqual(
      totals.map((t) => t.varianceMinorUnits),
      [-200_000, -200_000, -200_000],
      "variance is actual minus expected",
    );
  });

  it("counts a receipt in the period holding its receipt date", () => {
    const { occurrences, periods } = setUp();
    const totals = periodIncome(periods, occurrences, [received("A1", "2026-08-14")], {
      asOf: toISODate("2026-08-14"),
      links: [],
    });

    assert.deepEqual(
      totals.map((t) => t.actualMinorUnits),
      [0, 200_000, 0],
    );
    assert.equal(totals[1]?.varianceMinorUnits, 0, "expected and actual agree in that period");
  });

  it("keeps a Missing expectation in the total but out of the forecast (§12)", () => {
    const { occurrences, periods } = setUp();
    // Well past the fifth business day after every payday in the window.
    const totals = periodIncome(periods, occurrences, [], {
      asOf: toISODate("2026-09-30"),
      links: [],
    });

    assert.deepEqual(
      totals.map((t) => t.expectedMinorUnits),
      [200_000, 200_000, 200_000],
      "historical expected total is preserved",
    );
    assert.deepEqual(
      totals.map((t) => t.forwardProjectedMinorUnits),
      [0, 0, 0],
      "and removed from forward-looking cash projection",
    );
    assert.deepEqual(
      totals.map((t) => t.varianceMinorUnits),
      [-200_000, -200_000, -200_000],
      "the negative variance remains",
    );
  });

  it("removes a skipped expectation from both figures but keeps the prior one", () => {
    const target = { scheduleId: "payroll", unadjustedDate: toISODate("2026-08-14"), ordinal: 0 };
    const { occurrences, periods } = setUp([
      { kind: "skip", id: "S1", target, provenance: provenance() },
    ]);
    const totals = periodIncome(periods, occurrences, [], {
      asOf: toISODate("2026-08-01"),
      links: [],
    });

    assert.equal(totals[1]?.expectedMinorUnits, 0, "skipped leaves the current total");
    assert.equal(totals[1]?.forwardProjectedMinorUnits, 0, "and the forecast");
    assert.equal(
      totals[1]?.priorExpectedMinorUnits,
      200_000,
      "but the revision stays visible as a change rather than an absence",
    );
  });

  it("reports an amount override against its recorded before-value", () => {
    const target = { scheduleId: "payroll", unadjustedDate: toISODate("2026-08-14"), ordinal: 0 };
    const { occurrences, periods } = setUp([
      {
        kind: "amount-override",
        id: "O1",
        target,
        fromAmountMinorUnits: 200_000,
        amountMinorUnits: 150_000,
        provenance: provenance(),
      },
    ]);
    const totals = periodIncome(periods, occurrences, [], {
      asOf: toISODate("2026-08-01"),
      links: [],
    });

    assert.equal(totals[1]?.expectedMinorUnits, 150_000);
    assert.equal(totals[1]?.priorExpectedMinorUnits, 200_000);
  });

  it("leaves a shifted expectation's prior figure in the period it left", () => {
    // Moved from Friday 2026-08-14 into the following period.
    const target = { scheduleId: "payroll", unadjustedDate: toISODate("2026-08-14"), ordinal: 0 };
    const { occurrences, periods } = setUp([
      {
        kind: "shift",
        id: "SH1",
        target,
        fromDate: toISODate("2026-08-14"),
        toDate: toISODate("2026-08-24"),
        provenance: provenance(),
      },
    ]);
    const totals = periodIncome(periods, occurrences, [], {
      asOf: toISODate("2026-08-01"),
      links: [],
    });

    assert.equal(totals[1]?.expectedMinorUnits, 0, "the money moved out of its old period");
    assert.equal(totals[1]?.priorExpectedMinorUnits, 200_000, "but is still shown as revised away");
    assert.equal(totals[2]?.expectedMinorUnits, 400_000, "and landed alongside the 08-21 payday");
  });
});

describe("cross-period reconciliation (§12.1, REC-05)", () => {
  it("leaves the expectation and the receipt in their own periods, explained on both", () => {
    const { occurrences, periods } = setUp();
    const expectation = occurrences.find((o) => o.date === "2026-08-14");
    assert.ok(expectation !== undefined, "fixture needs the 08-14 payday");

    // Expected 08-14 in period 2; received 08-24, inside period 3.
    const actual = received("A1", "2026-08-24");
    const link: ReconciliationLink = {
      id: "L1",
      occurrences: [identityOf(expectation)],
      actualIds: [actual.id],
      provenance: MATCHED,
      unmatchedBy: null,
    };

    const totals = periodIncome(periods, occurrences, [actual], {
      asOf: toISODate("2026-08-31"),
      links: [link],
    });

    assert.equal(totals[1]?.expectedMinorUnits, 200_000, "period A retains its expectation");
    assert.equal(totals[1]?.actualMinorUnits, 0, "and records no actual income");
    assert.equal(totals[2]?.actualMinorUnits, 200_000, "period B records the receipt on its date");

    assert.equal(totals[1]?.fulfilledAcrossPeriods.length, 1, "explained on the expecting side");
    assert.equal(totals[2]?.fulfilledAcrossPeriods.length, 1, "and on the receiving side");
    assert.equal(totals[1]?.fulfilledAcrossPeriods[0]?.linkId, "L1");
  });

  it("counts the money exactly once across the two periods", () => {
    const { occurrences, periods } = setUp();
    const expectation = occurrences.find((o) => o.date === "2026-08-14");
    assert.ok(expectation !== undefined);
    const actual = received("A1", "2026-08-24");

    const totals = periodIncome(periods, occurrences, [actual], {
      asOf: toISODate("2026-08-31"),
      links: [
        {
          id: "L1",
          occurrences: [identityOf(expectation)],
          actualIds: [actual.id],
          provenance: MATCHED,
          unmatchedBy: null,
        },
      ],
    });

    assert.equal(
      totals.reduce((sum, t) => sum + t.actualMinorUnits, 0),
      200_000,
      "one receipt, counted in one period",
    );
    assert.equal(
      totals.reduce((sum, t) => sum + t.expectedMinorUnits, 0),
      600_000,
      "three expectations, each counted once",
    );
  });

  it("adds no explanation when both sides fall in the same period", () => {
    const { occurrences, periods } = setUp();
    const expectation = occurrences.find((o) => o.date === "2026-08-14");
    assert.ok(expectation !== undefined);
    const actual = received("A1", "2026-08-17");

    const totals = periodIncome(periods, occurrences, [actual], {
      asOf: toISODate("2026-08-31"),
      links: [
        {
          id: "L1",
          occurrences: [identityOf(expectation)],
          actualIds: [actual.id],
          provenance: MATCHED,
          unmatchedBy: null,
        },
      ],
    });

    assert.deepEqual(
      totals.flatMap((t) => t.fulfilledAcrossPeriods),
      [],
    );
  });

  it("refuses to report when a link names a receipt it was not given", () => {
    const { occurrences, periods } = setUp();
    const expectation = occurrences.find((o) => o.date === "2026-08-14");
    assert.ok(expectation !== undefined);

    assert.throws(
      () =>
        periodIncome(periods, occurrences, [], {
          asOf: toISODate("2026-08-31"),
          links: [
            {
              id: "L1",
              occurrences: [identityOf(expectation)],
              actualIds: ["MISSING"],
              provenance: MATCHED,
              unmatchedBy: null,
            },
          ],
        }),
      /names actual income "MISSING", which was not supplied/u,
    );
  });
});
