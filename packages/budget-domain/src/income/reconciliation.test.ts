import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildPaycheckSchedule } from "../schedule/paycheck-period.ts";
import { validateCadenceDefinition } from "../schedule/validate.ts";
import { toISODate } from "../shared/iso-date.ts";
import {
  identityOf,
  projectOccurrences,
  type ExpectedOccurrence,
  type OccurrenceIdentity,
} from "./occurrence.ts";
import type { IncomeSchedule } from "./schedule.ts";
import {
  classifyCandidate,
  reconcile,
  rejectionOf,
  unmatch,
  validateReconciliationLink,
  varianceOf,
  withinAmountTolerance,
  withinDateWindow,
  type ActualIncome,
  type MatchContext,
  type MatchProvenance,
  type ReconcileOptions,
} from "./reconciliation.ts";

const USD: MatchContext = { budgetCurrency: "USD", sourceCompatible: true };

function expectedOn(date: string, amountMinorUnits = 200_000, skipped = false): ExpectedOccurrence {
  return {
    scheduleId: "payroll",
    date: toISODate(date),
    amountMinorUnits,
    origin: { kind: "extra", exceptionId: "fixture" },
    skipped,
    appliedExceptionIds: [],
  };
}

function received(date: string, amountMinorUnits = 200_000, currency = "USD"): ActualIncome {
  return { id: "ACT-1", receivedOn: toISODate(date), amountMinorUnits, currency };
}

/** A real weekly-Friday schedule, for the tests that need generated boundaries. */
function paycheckSchedule(): IncomeSchedule {
  const result = validateCadenceDefinition({
    cadence: "paycheck",
    pattern: { kind: "weekly", weekday: "friday" },
    businessDayPolicy: "previous-business-day",
  });
  if (!result.ok || result.value.cadence !== "paycheck") {
    throw new Error("fixture failed validation");
  }
  return {
    id: "payroll",
    name: "Payroll",
    recurrence: result.value,
    projectedAmountMinorUnits: 200_000,
    active: true,
  };
}

describe("amount tolerance is exact at the boundary (§13.2, AC4)", () => {
  it("admits a difference of precisely five percent, above and below", () => {
    // REC-09: $2,000 expected against $1,900 is exactly 5% below and qualifies.
    assert.equal(withinAmountTolerance(200_000, 190_000), true, "exactly 5% below");
    assert.equal(withinAmountTolerance(200_000, 210_000), true, "exactly 5% above");
  });

  it("excludes one minor unit beyond it", () => {
    // REC-10 case B: $1,899.99 is more than 5% below and is not a candidate.
    assert.equal(withinAmountTolerance(200_000, 189_999), false);
    assert.equal(withinAmountTolerance(200_000, 210_001), false);
  });

  it("holds at an expected amount whose five percent is not a whole unit", () => {
    // 199_999 has no exact 5%: the integer form asks 9_999 x 100 <= 199_999 x 5,
    // or 999_900 <= 999_995, so the last admitted difference is 9,999 and the
    // first rejected one is 10,000. Named for what it checks rather than for
    // beating floating point — a probe found the float form agrees here.
    assert.equal(withinAmountTolerance(199_999, 190_000), true, "9,999 under");
    assert.equal(withinAmountTolerance(199_999, 189_999), false, "10,000 under");
  });

  it("refuses a non-positive expected amount rather than answering", () => {
    for (const expected of [0, -1, 1250.5]) {
      assert.throws(() => withinAmountTolerance(expected, 100), /must be a positive integer/u);
    }
  });
});

describe("date window is exact at the boundary (§13.2, AC3)", () => {
  // Expected Monday 2026-11-23. Thanksgiving falls on Thursday 2026-11-26,
  // inside the forward half, so the fifth business day after is Tuesday
  // 2026-12-01 rather than Monday 2026-11-30.
  const expected = toISODate("2026-11-23");

  it("includes the fifth business day on each side", () => {
    assert.equal(withinDateWindow(expected, toISODate("2026-12-01")), true, "fifth after");
    assert.equal(withinDateWindow(expected, toISODate("2026-11-16")), true, "fifth before");
  });

  it("excludes the sixth business day on each side", () => {
    assert.equal(withinDateWindow(expected, toISODate("2026-12-02")), false, "sixth after");
    assert.equal(withinDateWindow(expected, toISODate("2026-11-13")), false, "sixth before");
  });

  it("includes a weekend date lying between the endpoints", () => {
    // Only the counting skips non-business days; membership is a plain
    // calendar-range test, so income posted on a Saturday inside the window
    // still qualifies.
    assert.equal(withinDateWindow(expected, toISODate("2026-11-28")), true);
  });
});

describe("candidate classification (§13.3 matrix)", () => {
  it("row 1 — exact date, amount, currency, and compatible source", () => {
    assert.equal(classifyCandidate(expectedOn("2026-08-21"), received("2026-08-21"), USD), "exact");
  });

  it("row 2 — inside both tolerances but not exact", () => {
    assert.equal(
      classifyCandidate(expectedOn("2026-08-21"), received("2026-08-24"), USD),
      "suggested",
      "non-exact date",
    );
    assert.equal(
      classifyCandidate(expectedOn("2026-08-21"), received("2026-08-21", 195_000), USD),
      "suggested",
      "non-exact amount",
    );
  });

  it("row 3 — inside one tolerance and outside the other", () => {
    assert.equal(
      classifyCandidate(expectedOn("2026-08-21"), received("2026-08-21", 100_000), USD),
      "manual-only",
      "date exact, amount far outside",
    );
    assert.equal(
      classifyCandidate(expectedOn("2026-08-21"), received("2026-10-01"), USD),
      "manual-only",
      "amount exact, date far outside",
    );
  });

  it("outside both tolerances is not a candidate", () => {
    assert.equal(
      classifyCandidate(expectedOn("2026-08-21"), received("2026-10-01", 100_000), USD),
      "none",
    );
  });

  it("a skipped expectation is never a candidate (REC-05B)", () => {
    // Income arriving after a skip is unexpected actual income until the user
    // reverses the skip, so even an otherwise perfect pair yields nothing.
    const skipped = expectedOn("2026-08-21", 200_000, true);
    assert.equal(classifyCandidate(skipped, received("2026-08-21"), USD), "none");
  });

  it("downgrades when any one of the four exact conditions changes (AC1)", () => {
    const occurrence = expectedOn("2026-08-21");
    assert.equal(classifyCandidate(occurrence, received("2026-08-21"), USD), "exact");

    assert.equal(
      classifyCandidate(occurrence, received("2026-08-24"), USD),
      "suggested",
      "date changed",
    );
    assert.equal(
      classifyCandidate(occurrence, received("2026-08-21", 195_000), USD),
      "suggested",
      "amount changed",
    );
    assert.equal(
      classifyCandidate(occurrence, received("2026-08-21", 200_000, "EUR"), USD),
      "manual-only",
      "currency changed",
    );
    assert.equal(
      classifyCandidate(occurrence, received("2026-08-21"), { ...USD, sourceCompatible: false }),
      "suggested",
      "source identity no longer compatible",
    );
  });

  it("never reconciles or suggests across a currency mismatch (AC5)", () => {
    // Regardless of numeric proximity, including an otherwise perfect pair.
    for (const amount of [200_000, 195_000, 190_000]) {
      const tier = classifyCandidate(
        expectedOn("2026-08-21"),
        received("2026-08-21", amount, "EUR"),
        USD,
      );
      assert.notEqual(tier, "exact", `${amount}`);
      assert.notEqual(tier, "suggested", `${amount}`);
    }
  });
});

describe("set resolution (§13.3 rows 1, 5, 6)", () => {
  const options: ReconcileOptions = {
    budgetCurrency: "USD",
    sourceCompatible: () => true,
    rejected: [],
    links: [],
  };

  it("row 1 — reconciles a unique exact pair automatically", () => {
    const outcome = reconcile([expectedOn("2026-08-21")], [received("2026-08-21")], options);
    assert.equal(outcome.automatic.length, 1);
    assert.equal(outcome.suggested.length, 0);
    assert.deepEqual(outcome.unmatchedActualIds, []);
  });

  it("row 6 — two expectations qualifying for one receipt produce no automatic match (AC2)", () => {
    // The exact pair does not win: §13.2 requires no competing candidate, and
    // the second expectation is inside both tolerances of the same receipt.
    const outcome = reconcile(
      [expectedOn("2026-08-21"), expectedOn("2026-08-24")],
      [received("2026-08-21")],
      options,
    );
    assert.equal(outcome.automatic.length, 0, "ambiguity blocks automatic matching");
    assert.equal(outcome.suggested.length, 2, "both are offered for confirmation");
  });

  it("row 5 — a receipt with no candidate is reported unmatched", () => {
    const outcome = reconcile(
      [expectedOn("2026-08-21")],
      [received("2026-12-01", 900_000)],
      options,
    );
    assert.deepEqual(outcome.unmatchedActualIds, ["ACT-1"]);
    assert.equal(outcome.automatic.length + outcome.suggested.length, 0);
  });

  it("does not offer a manual-only pair, and reports its receipt unmatched", () => {
    // Same date, amount far outside tolerance: reachable by explicit search,
    // never offered.
    const outcome = reconcile(
      [expectedOn("2026-08-21")],
      [received("2026-08-21", 100_000)],
      options,
    );
    assert.equal(outcome.automatic.length + outcome.suggested.length, 0);
    assert.deepEqual(outcome.unmatchedActualIds, ["ACT-1"]);
  });

  it("treats an already-linked expectation and receipt as no longer available", () => {
    const occurrence = expectedOn("2026-08-21");
    const actual = received("2026-08-21");
    const outcome = reconcile([occurrence], [actual], {
      ...options,
      links: [
        {
          id: "LINK-1",
          occurrences: [identityOf(occurrence)],
          actualIds: [actual.id],
          provenance: { by: "automatic", recordedAt: "2026-08-21T09:00:00-04:00", tier: "exact" },
          unmatchedBy: null,
        },
      ],
    });
    assert.equal(outcome.automatic.length, 0);
    assert.equal(outcome.suggested.length, 0);
  });
});

describe("rejection memory (§13.2, AC6)", () => {
  const base: ReconcileOptions = {
    budgetCurrency: "USD",
    sourceCompatible: () => true,
    rejected: [],
    links: [],
  };
  const declined: MatchProvenance = {
    by: "user",
    actorId: "ACTOR-01",
    recordedAt: "2026-08-25T09:00:00-04:00",
    tier: "suggested",
  };

  it("does not offer the same unchanged pairing again", () => {
    const occurrence = expectedOn("2026-08-21");
    const actual = received("2026-08-24");
    assert.equal(reconcile([occurrence], [actual], base).suggested.length, 1);

    const rejected = [rejectionOf(occurrence, actual, declined)];
    const after = reconcile([occurrence], [actual], { ...base, rejected });
    assert.equal(after.suggested.length, 0);
    assert.deepEqual(after.unmatchedActualIds, ["ACT-1"]);
  });

  it("offers it again once either side changes", () => {
    const occurrence = expectedOn("2026-08-21");
    const rejected = [rejectionOf(occurrence, received("2026-08-24"), declined)];

    // A corrected amount is a different proposition, so the bar lifts.
    const corrected = received("2026-08-24", 195_000);
    assert.equal(reconcile([occurrence], [corrected], { ...base, rejected }).suggested.length, 1);
  });

  it("lets a rejection promote the surviving pair to automatic", () => {
    // Declining the competitor removes it from consideration, so the exact
    // pair is no longer contested.
    const exact = expectedOn("2026-08-21");
    const competitor = expectedOn("2026-08-24");
    const actual = received("2026-08-21");

    assert.equal(reconcile([exact, competitor], [actual], base).automatic.length, 0);

    const rejected = [rejectionOf(competitor, actual, declined)];
    const after = reconcile([exact, competitor], [actual], { ...base, rejected });
    assert.equal(after.automatic.length, 1);
    assert.equal(after.suggested.length, 0);
  });
});

describe("the link model permits groups that MVP refuses (AC9)", () => {
  const provenance: MatchProvenance = {
    by: "user",
    actorId: "ACTOR-01",
    recordedAt: "2026-08-24T09:00:00-04:00",
    tier: "suggested",
  };
  const one: OccurrenceIdentity = {
    kind: "generated",
    scheduleId: "payroll",
    unadjustedDate: toISODate("2026-08-21"),
    ordinal: 0,
  };
  const two: OccurrenceIdentity = { kind: "extra", exceptionId: "EXC-1" };

  it("accepts one expectation matched to one receipt", () => {
    const link = { id: "L1", occurrences: [one], actualIds: ["ACT-1"], provenance, unmatchedBy: null };
    assert.equal(validateReconciliationLink(link).ok, true);
  });

  it("represents a group in the type but rejects it in MVP", () => {
    // That this compiles is half the assertion: §13.2 requires the model not to
    // preclude future reconciliation groups, so the restriction is policy in
    // the validator rather than a shape that would have to change later.
    const group = {
      id: "L2",
      occurrences: [one, two],
      actualIds: ["ACT-1", "ACT-2"],
      provenance,
      unmatchedBy: null,
    };
    const result = validateReconciliationLink(group);
    assert.equal(result.ok, false);
    assert.deepEqual(
      result.ok ? [] : result.issues.map((issue) => issue.code),
      ["reconciliation.group-not-supported"],
    );
  });

  it("requires both sides to be present", () => {
    const empty = { id: "L3", occurrences: [], actualIds: [], provenance, unmatchedBy: null };
    const result = validateReconciliationLink(empty);
    assert.deepEqual(
      result.ok ? [] : result.issues.map((issue) => issue.code).sort(),
      ["reconciliation.no-actual", "reconciliation.no-occurrence"],
    );
  });
});

describe("unmatching (§13.3 row 7, AC7)", () => {
  const options: ReconcileOptions = {
    budgetCurrency: "USD",
    sourceCompatible: () => true,
    rejected: [],
    links: [],
  };
  const matched: MatchProvenance = {
    by: "automatic",
    recordedAt: "2026-08-21T09:00:00-04:00",
    tier: "exact",
  };
  const undone: MatchProvenance = {
    by: "user",
    actorId: "ACTOR-01",
    recordedAt: "2026-08-26T11:00:00-04:00",
    tier: "exact",
  };

  function boundLink(occurrence: ExpectedOccurrence, actual: ActualIncome) {
    return {
      id: "LINK-1",
      occurrences: [identityOf(occurrence)],
      actualIds: [actual.id],
      provenance: matched,
      unmatchedBy: null,
    };
  }

  it("returns both records to candidacy and keeps both actions on record", () => {
    const occurrence = expectedOn("2026-08-21");
    const actual = received("2026-08-21");
    const link = boundLink(occurrence, actual);

    assert.equal(
      reconcile([occurrence], [actual], { ...options, links: [link] }).automatic.length,
      0,
      "while bound, neither side is a candidate",
    );

    const removed = unmatch(link, undone);
    assert.deepEqual(removed.provenance, matched, "who matched them survives the undoing");
    assert.deepEqual(removed.unmatchedBy, undone, "and so does who undid it");

    assert.equal(
      reconcile([occurrence], [actual], { ...options, links: [removed] }).automatic.length,
      1,
      "separate again, so the pair is matchable once more",
    );
  });

  it("does not mutate the link it was given", () => {
    const link = boundLink(expectedOn("2026-08-21"), received("2026-08-21"));
    unmatch(link, undone);
    assert.equal(link.unmatchedBy, null);
  });

  it("refuses a second unmatch rather than overwriting the first", () => {
    const link = boundLink(expectedOn("2026-08-21"), received("2026-08-21"));
    assert.throws(() => unmatch(unmatch(link, undone), undone), /already unmatched/u);
  });
});

describe("no reconciliation outcome moves a boundary (§13.3, AC8)", () => {
  // Every row of the §13.3 matrix records "None" under boundary and target
  // effect. That holds structurally — reconciliation is not an input to
  // generation — so this exists to fail if anyone ever wires one into the
  // other, which is the only way it could stop being true.
  const schedule = paycheckSchedule();
  const horizon = { from: toISODate("2026-08-01"), through: toISODate("2026-09-30") };
  const built = buildPaycheckSchedule(schedule.recurrence, horizon);
  const projected = projectOccurrences(schedule, built.occurrences, []);

  const first = projected[0];
  const second = projected[1];
  assert.ok(first !== undefined && second !== undefined, "fixture needs two occurrences");

  const link = {
    id: "LINK-1",
    occurrences: [identityOf(first)],
    actualIds: ["ACT-1"],
    provenance: {
      by: "automatic" as const,
      recordedAt: "2026-08-07T09:00:00-04:00",
      tier: "exact" as const,
    },
    unmatchedBy: null,
  };
  const options: ReconcileOptions = {
    budgetCurrency: "USD",
    sourceCompatible: () => true,
    rejected: [],
    links: [],
  };

  const rows: readonly { readonly label: string; readonly run: () => void }[] = [
    { label: "1 unique exact", run: () => void reconcile([first], [received(first.date)], options) },
    { label: "2 within both tolerances", run: () => void reconcile([first], [received("2026-08-10")], options) },
    { label: "3 within one tolerance only", run: () => void reconcile([first], [received(first.date, 100_000)], options) },
    { label: "4 missing", run: () => void reconcile([first], [], options) },
    { label: "5 unexpected", run: () => void reconcile([], [received("2026-08-07")], options) },
    { label: "6 multiple candidates", run: () => void reconcile([first, second], [received(first.date)], options) },
    {
      label: "7 match removed",
      run: () => {
        const removed = unmatch(link, {
          by: "user",
          actorId: "ACTOR-01",
          recordedAt: "2026-08-26T11:00:00-04:00",
          tier: "exact",
        });
        void reconcile([first], [received(first.date)], { ...options, links: [removed] });
      },
    },
  ];

  for (const row of rows) {
    it(`row ${row.label} leaves boundaries and projections untouched`, () => {
      const boundariesBefore = [...built.boundaryDates];
      const projectionsBefore = projected.map((o) => `${o.date}:${String(o.amountMinorUnits)}`);

      row.run();

      assert.deepEqual(
        [...buildPaycheckSchedule(schedule.recurrence, horizon).boundaryDates],
        boundariesBefore,
        "boundaries regenerate identically",
      );
      assert.deepEqual(
        projected.map((o) => `${o.date}:${String(o.amountMinorUnits)}`),
        projectionsBefore,
        "an actual never overwrites a projected date or amount (§13.2)",
      );
    });
  }
});

describe("variance (§13.2)", () => {
  it("reproduces the REC-03 worked example", () => {
    // $2,000 expected 2026-08-21 against $1,950 received 2026-08-24:
    // +3 calendar days, +1 business day, −$50, −2.5%.
    const variance = varianceOf(expectedOn("2026-08-21"), received("2026-08-24", 195_000));
    assert.deepEqual(variance, {
      calendarDays: 3,
      businessDays: 1,
      amountMinorUnits: -5_000,
      percent: -2.5,
    });
  });

  it("is zero on every axis for an exact match", () => {
    assert.deepEqual(varianceOf(expectedOn("2026-08-21"), received("2026-08-21")), {
      calendarDays: 0,
      businessDays: 0,
      amountMinorUnits: 0,
      percent: 0,
    });
  });

  it("signs an early and smaller receipt negatively", () => {
    // REC-02: expected Friday, received the Thursday before.
    const variance = varianceOf(expectedOn("2026-08-21"), received("2026-08-20", 190_000));
    assert.equal(variance.calendarDays, -1);
    assert.equal(variance.businessDays, -1);
    assert.equal(variance.amountMinorUnits, -10_000);
    assert.equal(variance.percent, -5);
  });
});
