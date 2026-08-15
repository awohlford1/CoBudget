import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { PaycheckPattern } from "../schedule/definition.ts";
import { buildPaycheckSchedule, type PaycheckDefinition } from "../schedule/paycheck-period.ts";
import { validateCadenceDefinition } from "../schedule/validate.ts";
import { toISODate } from "../shared/iso-date.ts";
import {
  countsTowardExpectedIncome,
  countsTowardForwardProjection,
  occurrenceStatus,
  projectOccurrences,
  type ExpectedOccurrence,
  type OccurrenceException,
  type OccurrenceRef,
} from "./occurrence.ts";
import type { IncomeSchedule } from "./schedule.ts";

function recurrence(pattern: PaycheckPattern): PaycheckDefinition {
  const result = validateCadenceDefinition({
    cadence: "paycheck",
    pattern,
    businessDayPolicy: "previous-business-day",
  });
  if (!result.ok) {
    throw new Error(`fixture failed validation: ${result.issues.map((i) => i.code).join(", ")}`);
  }
  if (result.value.cadence !== "paycheck") throw new Error("fixture is not a paycheck cadence");
  return result.value;
}

function schedule(pattern: PaycheckPattern): IncomeSchedule {
  return {
    id: "payroll",
    name: "Payroll",
    recurrence: recurrence(pattern),
    projectedAmountMinorUnits: 200_000,
    active: true,
  };
}

/** Every Friday in the window is a business day, so no adjustment moves a date. */
const FRIDAY_WEEKLY: PaycheckPattern = { kind: "weekly", weekday: "friday" };
const HORIZON = { from: toISODate("2026-08-01"), through: toISODate("2026-09-30") };

function ref(unadjustedDate: string, ordinal = 0): OccurrenceRef {
  return { scheduleId: "payroll", unadjustedDate: toISODate(unadjustedDate), ordinal };
}

/**
 * A lifecycle fixture. Uses an `extra` origin so the status tests need no
 * generated occurrence — the status depends only on the projected date.
 */
function expectedOn(date: string, overrides: Partial<ExpectedOccurrence> = {}): ExpectedOccurrence {
  return {
    scheduleId: "payroll",
    date: toISODate(date),
    amountMinorUnits: 200_000,
    origin: { kind: "extra", exceptionId: "fixture" },
    skipped: false,
    appliedExceptionIds: [],
    ...overrides,
  };
}

describe("occurrence exceptions are projection-only (§11, INV-68-21)", () => {
  const payroll = schedule(FRIDAY_WEEKLY);
  const built = buildPaycheckSchedule(payroll.recurrence, HORIZON);

  const allFour: readonly OccurrenceException[] = [
    { kind: "shift", id: "e1", target: ref("2026-08-07"), toDate: toISODate("2026-08-10") },
    { kind: "skip", id: "e2", target: ref("2026-08-14") },
    { kind: "amount-override", id: "e3", target: ref("2026-08-21"), amountMinorUnits: 150_000 },
    {
      kind: "extra",
      id: "e4",
      scheduleId: "payroll",
      date: toISODate("2026-08-18"),
      amountMinorUnits: 50_000,
    },
  ];

  it("each of the four types changes the projection", () => {
    const base = projectOccurrences(payroll, built.occurrences, []);
    const adjusted = projectOccurrences(payroll, built.occurrences, allFour);

    assert.equal(adjusted.length, base.length + 1, "extra adds one occurrence");
    assert.ok(
      adjusted.some((o) => o.date === "2026-08-10"),
      "shift moved an occurrence to a new date",
    );
    assert.ok(
      adjusted.some((o) => o.skipped && o.origin.kind === "generated"),
      "skip marked an occurrence",
    );
    assert.ok(
      adjusted.some((o) => o.amountMinorUnits === 150_000),
      "override changed an amount",
    );
  });

  it("none of them moves a period boundary", () => {
    // The assertion that matters is not that the two boundary lists match —
    // exceptions are not an input to generation, so they trivially would. It is
    // that a projection moved onto a date which did *not* become a boundary,
    // while the date it left remained one.
    assert.ok(built.boundaryDates.includes(toISODate("2026-08-07")), "origin stays a boundary");
    assert.ok(
      !built.boundaryDates.includes(toISODate("2026-08-10")),
      "the shifted-to date did not become one",
    );
    assert.ok(
      !built.boundaryDates.includes(toISODate("2026-08-18")),
      "the extra occurrence created no boundary",
    );
  });

  it("a skipped paycheck does not lengthen a period (PD-68-10)", () => {
    const adjusted = projectOccurrences(payroll, built.occurrences, allFour);
    const skipped = adjusted.find(
      (o) => o.origin.kind === "generated" && o.origin.generated.unadjustedDate === "2026-08-14",
    );

    assert.equal(skipped?.skipped, true, "the occurrence is retained, marked skipped");
    assert.deepEqual(
      [...buildPaycheckSchedule(payroll.recurrence, HORIZON).boundaryDates],
      [...built.boundaryDates],
      "the period either side of the skipped payday is unchanged",
    );
  });

  it("restores the original expectation when an exception is removed (reversibility)", () => {
    const base = projectOccurrences(payroll, built.occurrences, []);
    const withSkip = projectOccurrences(payroll, built.occurrences, [allFour[1]!]);

    assert.notDeepEqual(withSkip, base);
    assert.deepEqual(projectOccurrences(payroll, built.occurrences, []), base);
  });

  it("ignores exceptions belonging to another schedule", () => {
    const foreign: OccurrenceException = {
      kind: "skip",
      id: "other",
      target: { scheduleId: "freelance", unadjustedDate: toISODate("2026-08-14"), ordinal: 0 },
    };
    assert.deepEqual(
      projectOccurrences(payroll, built.occurrences, [foreign]),
      projectOccurrences(payroll, built.occurrences, []),
    );
  });
});

describe("occurrences sharing an unadjusted date stay distinct (INV-68-16)", () => {
  // Day-31 and last-day both land on 2026-07-31, a configuration CBD-29 treats
  // as legitimate rather than duplicate. They must remain separately targetable.
  const payroll = schedule({
    kind: "twice-per-month",
    anchors: [{ kind: "day-of-month", day: 31 }, { kind: "last-day" }],
  });
  const july = { from: toISODate("2026-07-01"), through: toISODate("2026-07-31") };
  const built = buildPaycheckSchedule(payroll.recurrence, july);

  it("produces two occurrences and one boundary (INV-68-17)", () => {
    const projected = projectOccurrences(payroll, built.occurrences, []);
    assert.deepEqual(
      projected.map((o) => o.date),
      ["2026-07-31", "2026-07-31"],
    );
    assert.deepEqual([...built.boundaryDates], ["2026-07-31"]);
  });

  it("targets one of them by ordinal without touching the other", () => {
    const projected = projectOccurrences(payroll, built.occurrences, [
      { kind: "skip", id: "s", target: ref("2026-07-31", 0) },
    ]);
    assert.deepEqual(
      projected.map((o) => o.skipped),
      [true, false],
    );
  });
});

describe("the expected-income lifecycle (§12)", () => {
  it("reports Projected before the expected date and Expected today on it", () => {
    const occurrence = expectedOn("2026-08-21");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-08-20"), null), "projected");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-08-21"), null), "expected-today");
  });

  it("does not report Late before the window opens", () => {
    // §12 opens Late on the next business day, and REC-03 confirms that is
    // Monday 2026-08-24 for a Friday 2026-08-21 expectation. The weekend in
    // between is past the expected date but not Late — see the module doc.
    const occurrence = expectedOn("2026-08-21");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-08-22"), null), "expected-today");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-08-23"), null), "expected-today");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-08-24"), null), "late");
  });

  it("ends the Late window at the fifth business day, counting past a holiday", () => {
    // Expected Monday 2026-11-23. Thanksgiving falls on Thursday 2026-11-26
    // inside the window, so the fifth business day is Tuesday 2026-12-01. A
    // weekday-only count would have ended it on Monday 2026-11-30.
    const occurrence = expectedOn("2026-11-23");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-11-24"), null), "late");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-11-26"), null), "late");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-11-30"), null), "late");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-12-01"), null), "late");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-12-02"), null), "missing");
  });

  it("reports Skipped at every stage, and skip outranks the calendar", () => {
    // §12 allows Skip "before or after the expected date", and REC-05A applies
    // it to an occurrence that is already Late or Missing.
    const occurrence = expectedOn("2026-08-21", { skipped: true });
    for (const asOf of ["2026-08-01", "2026-08-21", "2026-08-24", "2026-12-31"]) {
      assert.equal(occurrenceStatus(occurrence, toISODate(asOf), null), "skipped", asOf);
    }
  });

  it("distinguishes Reconciled from Reconciled late by what it had become", () => {
    const occurrence = expectedOn("2026-08-21");
    const asOf = toISODate("2026-12-31");

    assert.equal(occurrenceStatus(occurrence, asOf, toISODate("2026-08-21")), "reconciled");
    assert.equal(occurrenceStatus(occurrence, asOf, toISODate("2026-08-24")), "reconciled-late");
    assert.equal(occurrenceStatus(occurrence, asOf, toISODate("2026-09-30")), "reconciled-late");
  });

  it("never moves the expectation when it reconciles (REC-05)", () => {
    // The other half of REC-05 — the actual belonging to the receipt-date
    // period — is CBD-101's, since actual transactions do not exist here.
    const occurrence = expectedOn("2026-08-21");
    assert.equal(occurrenceStatus(occurrence, toISODate("2026-09-30"), toISODate("2026-09-15")), "reconciled-late");
    assert.equal(occurrence.date, "2026-08-21", "the expectation keeps its own date");
  });
});

describe("which totals a status belongs to (§12)", () => {
  it("keeps Missing in the expected total but out of the forecast", () => {
    assert.equal(countsTowardExpectedIncome("missing"), true);
    assert.equal(countsTowardForwardProjection("missing"), false);
  });

  it("removes Skipped from both", () => {
    assert.equal(countsTowardExpectedIncome("skipped"), false);
    assert.equal(countsTowardForwardProjection("skipped"), false);
  });

  it("keeps a live expectation in both", () => {
    for (const status of ["projected", "expected-today", "late"] as const) {
      assert.equal(countsTowardExpectedIncome(status), true, status);
      assert.equal(countsTowardForwardProjection(status), true, status);
    }
  });

  it("keeps a reconciled expectation in the total but not the forecast", () => {
    // Expected and actual stay separate records, so the expectation still
    // counts; it is no longer money still to come.
    for (const status of ["reconciled", "reconciled-late"] as const) {
      assert.equal(countsTowardExpectedIncome(status), true, status);
      assert.equal(countsTowardForwardProjection(status), false, status);
    }
  });
});

/** Compile-time assertions. Never executed — `tsc --noEmit` is the assertion. */
export function _noDismissAction(): void {
  // @ts-expect-error §12 confirms no Dismiss, Mark not expected, or Not
  // received action exists; Skip expresses that intention reversibly.
  const dismissed: OccurrenceException = { kind: "dismiss", id: "x", target: ref("2026-08-07") };
  void dismissed;
}
