/**
 * The expected-income lifecycle and one-time occurrence exceptions
 * (CBD-100, CBD-68 §11 and §12).
 *
 * An income schedule generates expected paydays; this module lets a user adjust
 * a single one of them, and reports where each stands between projection and
 * receipt.
 *
 * **Exceptions cannot move a boundary, structurally.** INV-68-21 and PD-68-10
 * require the four exception types to change projections only. That holds here
 * because nothing in this module is an input to boundary generation: CBD-29
 * derives boundaries from the anchor's `PaycheckDefinition` alone, and an
 * exception is applied afterwards to the occurrences that came out. There is no
 * check to forget, because there is no path to guard.
 *
 * **Skip annotates rather than removes.** §12 makes "Skipped occurrence" a
 * lifecycle *status*, not a deletion, and requires it to be reversible at any
 * stage. Dropping the occurrence from the returned list would lose the original
 * expectation that §11 requires the audit and forecast-revision history to keep,
 * and would make reversal a reconstruction rather than the removal of a fact.
 * Callers exclude skipped occurrences from a total using
 * {@link countsTowardExpectedIncome}.
 *
 * **Exceptions carry their own audit evidence.** §11 requires each one to store
 * before and after values, actor, timestamp, schedule version, and an optional
 * reason. {@link ExceptionProvenance} is a required field rather than a
 * convention, so an exception cannot be constructed without saying who made it
 * and against which schedule version. None of it is computed with here.
 *
 * **Two statuses are inputs, not derivations.**
 *
 * - `reconciled` and `reconciled-late` depend on a confirmed match, which CBD-101
 *   owns. {@link occurrenceStatus} takes the receipt date as an argument rather
 *   than inventing a matching rule here.
 * - `replaced` means "superseded by a regenerated schedule version" (§12), which
 *   is schedule-version history and belongs to CBD-28. It is present in
 *   {@link OccurrenceStatus} because §12 confirms it, but this module never
 *   returns it — a caller holding version lineage assigns it.
 *
 * **The Late window opens and closes on different bases, deliberately.** It
 * opens on the calendar day after the expected date: that business day has
 * closed without the paycheck, so the expectation is already unmet the moment it
 * ends. It closes at the end of the fifth Federal Reserve business day, which
 * measures how long a legitimate interbank transfer may still take.
 *
 * The asymmetry is the point rather than an oversight. §12 originally opened the
 * window "on the next Federal Reserve business day", which left a Friday payday
 * with no status at all across the following weekend — neither still due nor yet
 * late. Opening on the calendar day labels those days for what they are; closing
 * on business days keeps the deadline fair to the banking system. Corrected in
 * CBD-68 §12 under CBD-100.
 *
 * Coverage bound: the Late window is computed from the Federal Reserve calendar,
 * so this module inherits `business-day.ts`'s verified range and throws outside
 * it. CBD-98 tracks widening that.
 */

import { addBusinessDays } from "../schedule/business-day.ts";
import type { PaycheckOccurrence } from "../schedule/paycheck-period.ts";
import { compareDates, type ISODate } from "../shared/iso-date.ts";
import type { IncomeSchedule } from "./schedule.ts";

/** §12: Late runs through the end of the fifth Federal Reserve business day. */
export const LATE_WINDOW_BUSINESS_DAYS = 5;

/**
 * Identifies one generated occurrence so an exception can target it.
 *
 * `ordinal` distinguishes occurrences a single schedule emits on the same
 * unadjusted date. A twice-per-month schedule anchored on day 31 and last-day
 * produces two on the 31st of a 31-day month — a configuration CBD-29's tests
 * treat as legitimate rather than duplicate — and INV-68-16 requires them to
 * stay separately identifiable. It is 0 for every other case.
 *
 * The unadjusted date is the key rather than the adjusted one because
 * adjustment depends on the business-day policy, and changing that policy must
 * not silently retarget every existing exception.
 */
export interface OccurrenceRef {
  readonly scheduleId: string;
  readonly unadjustedDate: ISODate;
  readonly ordinal: number;
}

/**
 * The evidence §11 requires every exception to carry.
 *
 * Held on the exception itself rather than left to a separate audit store, for
 * the same reason `BusinessDayAdjustment` carries its dataset version: a
 * requirement that lives only in a convention is one a caller can skip without
 * anything noticing. Making it a required field means an exception cannot be
 * constructed anonymously.
 *
 * Nothing here is computed with. `recordedAt` is an ISO 8601 instant supplied by
 * the edge and is deliberately opaque — the domain never parses, orders, or
 * compares it, so it is typed as the string it is rather than dressed up as a
 * date the domain understands. `scheduleVersionId` links the exception to the
 * lineage CBD-28 owns, which is what makes it interpretable once the recurring
 * rule has moved on.
 */
export interface ExceptionProvenance {
  readonly actorId: string;
  /** ISO 8601 instant from the edge. Opaque here; never ordered or parsed. */
  readonly recordedAt: string;
  /** The schedule version in force when the exception was applied. */
  readonly scheduleVersionId: string;
  /** §11 makes the reason optional, so absence is `null` rather than "". */
  readonly reason: string | null;
}

/**
 * The four projection-only adjustments in §11.
 *
 * There is deliberately no `dismiss` or `not-expected` member. §12 states that
 * no such action exists and that Skip expresses the same intention reversibly,
 * so the closed union is what makes that true rather than an interface
 * convention that a later screen could break.
 *
 * Shift and amount-override record what they moved *from* as well as to. That
 * looks redundant — the generated occurrence still holds the original — but it
 * is not: §11 requires before and after values to be stored, and once a later
 * schedule version changes the recurring rule, regenerating no longer
 * reproduces the value the user actually changed. The stored before-value is
 * the only self-contained record. Skip has none because suppression has no
 * "after" value, and extra has none because nothing preceded it.
 */
export type OccurrenceException =
  | {
      readonly kind: "shift";
      readonly id: string;
      readonly target: OccurrenceRef;
      readonly fromDate: ISODate;
      readonly toDate: ISODate;
      readonly provenance: ExceptionProvenance;
    }
  | {
      readonly kind: "skip";
      readonly id: string;
      readonly target: OccurrenceRef;
      readonly provenance: ExceptionProvenance;
    }
  | {
      readonly kind: "extra";
      readonly id: string;
      readonly scheduleId: string;
      readonly date: ISODate;
      readonly amountMinorUnits: number;
      readonly provenance: ExceptionProvenance;
    }
  | {
      readonly kind: "amount-override";
      readonly id: string;
      readonly target: OccurrenceRef;
      readonly fromAmountMinorUnits: number;
      readonly amountMinorUnits: number;
      readonly provenance: ExceptionProvenance;
    };

/** Where an expected occurrence came from. */
export type OccurrenceOrigin =
  | {
      readonly kind: "generated";
      readonly ordinal: number;
      /** CBD-29's occurrence, retained whole so §10.2 provenance survives. */
      readonly generated: PaycheckOccurrence;
    }
  | { readonly kind: "extra"; readonly exceptionId: string };

/**
 * A stable, storable identity for a projected occurrence.
 *
 * {@link ExpectedOccurrence} carries the whole generated occurrence, which is
 * far more than a stored reference needs and includes the adjusted date, which
 * moves whenever the business-day policy changes. This is the part that does
 * not move, so a record written today still names the same occurrence later.
 *
 * The generated case reuses {@link OccurrenceRef} rather than restating its
 * fields, because identifying an occurrence and targeting one with an exception
 * are the same problem.
 */
export type OccurrenceIdentity =
  | ({ readonly kind: "generated" } & OccurrenceRef)
  | { readonly kind: "extra"; readonly exceptionId: string };

export function identityOf(occurrence: ExpectedOccurrence): OccurrenceIdentity {
  if (occurrence.origin.kind === "extra") {
    return { kind: "extra", exceptionId: occurrence.origin.exceptionId };
  }
  return {
    kind: "generated",
    scheduleId: occurrence.scheduleId,
    unadjustedDate: occurrence.origin.generated.unadjustedDate,
    ordinal: occurrence.origin.ordinal,
  };
}

export function sameIdentity(a: OccurrenceIdentity, b: OccurrenceIdentity): boolean {
  if (a.kind === "generated" && b.kind === "generated") {
    return (
      a.scheduleId === b.scheduleId &&
      a.unadjustedDate === b.unadjustedDate &&
      a.ordinal === b.ordinal
    );
  }
  if (a.kind === "extra" && b.kind === "extra") return a.exceptionId === b.exceptionId;
  return false;
}

/** One expected payday after any exceptions have been applied. */
export interface ExpectedOccurrence {
  readonly scheduleId: string;
  /** The projected date. A shift moves this; the origin keeps the original. */
  readonly date: ISODate;
  readonly amountMinorUnits: number;
  /**
   * What this occurrence was projected at before any exception changed it, or
   * `null` for one an `extra` created, since nothing preceded it.
   *
   * §12.1 reports a "prior expectation / forecast revision" — the historical
   * projected values changed by skips and amount overrides — and only the
   * projection has both figures in hand. Taken from the override's recorded
   * before-value rather than the schedule's current amount, because the two
   * diverge once the recurring amount changes after the exception was written,
   * and §11 makes the stored before-value the authoritative one.
   */
  readonly priorAmountMinorUnits: number | null;
  readonly origin: OccurrenceOrigin;
  readonly skipped: boolean;
  /** Exceptions applied to this occurrence, for audit display and reversal. */
  readonly appliedExceptionIds: readonly string[];
}

/** The confirmed lifecycle statuses of §12. */
export type OccurrenceStatus =
  | "projected"
  | "expected-today"
  | "late"
  | "missing"
  | "reconciled"
  | "reconciled-late"
  | "skipped"
  | "replaced";

/**
 * Every projected amount must stay a positive whole number of minor units.
 *
 * `IncomeSchedule` already guarantees this for the recurring amount, but an
 * amount-override or an extra occurrence supplies its own and nothing checked
 * it. A zero or negative projection is not merely odd: §13.2 computes its
 * reconciliation tolerance from the expected amount and requires it to be
 * positive, so the failure would otherwise surface much later, inside matching,
 * pointing at the wrong thing.
 *
 * Throws rather than clamping or dropping the exception. A projection silently
 * corrected to something the user did not ask for is the worse outcome.
 */
function assertProjectedAmount(amountMinorUnits: number, exceptionId: string | null): void {
  if (Number.isInteger(amountMinorUnits) && amountMinorUnits > 0) return;

  const blame = exceptionId === null ? "the schedule" : `exception ${JSON.stringify(exceptionId)}`;
  throw new RangeError(
    `projected amount must be a positive integer of minor units, received ` +
      `${String(amountMinorUnits)} from ${blame}. Validate the exception before projecting.`,
  );
}

/**
 * Apply one schedule's exceptions to the occurrences CBD-29 generated for it.
 *
 * Exceptions belonging to other schedules are ignored rather than rejected, so a
 * caller can pass the whole budget space's list once per schedule.
 *
 * Shift and extra can both reorder the result, so it is sorted by projected
 * date. Ties keep their generated order, which is what makes `ordinal` stable.
 */
export function projectOccurrences(
  schedule: IncomeSchedule,
  generated: readonly PaycheckOccurrence[],
  exceptions: readonly OccurrenceException[],
): readonly ExpectedOccurrence[] {
  const ordinals = new Map<ISODate, number>();
  const projected: ExpectedOccurrence[] = [];

  for (const occurrence of generated) {
    const ordinal = ordinals.get(occurrence.unadjustedDate) ?? 0;
    ordinals.set(occurrence.unadjustedDate, ordinal + 1);

    let date = occurrence.adjustedDate;
    let amountMinorUnits = schedule.projectedAmountMinorUnits;
    let priorAmountMinorUnits = schedule.projectedAmountMinorUnits;
    let amountFrom: string | null = null;
    let skipped = false;
    const appliedExceptionIds: string[] = [];

    for (const exception of exceptions) {
      if (exception.kind === "extra") continue;
      const { target } = exception;
      if (
        target.scheduleId !== schedule.id ||
        target.unadjustedDate !== occurrence.unadjustedDate ||
        target.ordinal !== ordinal
      ) {
        continue;
      }

      appliedExceptionIds.push(exception.id);
      if (exception.kind === "shift") date = exception.toDate;
      else if (exception.kind === "skip") skipped = true;
      else {
        amountMinorUnits = exception.amountMinorUnits;
        priorAmountMinorUnits = exception.fromAmountMinorUnits;
        amountFrom = exception.id;
      }
    }

    assertProjectedAmount(amountMinorUnits, amountFrom);
    projected.push({
      scheduleId: schedule.id,
      date,
      amountMinorUnits,
      priorAmountMinorUnits,
      origin: { kind: "generated", ordinal, generated: occurrence },
      skipped,
      appliedExceptionIds,
    });
  }

  for (const exception of exceptions) {
    if (exception.kind !== "extra" || exception.scheduleId !== schedule.id) continue;
    assertProjectedAmount(exception.amountMinorUnits, exception.id);
    projected.push({
      scheduleId: schedule.id,
      date: exception.date,
      amountMinorUnits: exception.amountMinorUnits,
      priorAmountMinorUnits: null,
      origin: { kind: "extra", exceptionId: exception.id },
      skipped: false,
      appliedExceptionIds: [exception.id],
    });
  }

  return projected.sort((a, b) => compareDates(a.date, b.date));
}

/** The purely time-based part of §12, before skip or reconciliation. */
function elapsedStatus(
  expected: ISODate,
  asOf: ISODate,
): "projected" | "expected-today" | "late" | "missing" {
  const elapsed = compareDates(asOf, expected);
  if (elapsed < 0) return "projected";
  if (elapsed === 0) return "expected-today";

  // Late opens on the calendar day after, and closes on the fifth business day.
  // See the module doc for why the two ends are measured differently.
  const lateEnds = addBusinessDays(expected, LATE_WINDOW_BUSINESS_DAYS);
  return compareDates(asOf, lateEnds) <= 0 ? "late" : "missing";
}

/**
 * Where an occurrence stands as of a budget-space date.
 *
 * `asOf` is passed in rather than read from a clock, so the same fixtures give
 * the same answer on every machine (INV-87).
 *
 * `reconciledOn` is the receipt date of a confirmed match, or `null` when none
 * exists. It is required rather than optional because whether an expectation has
 * been fulfilled is not something this module can assume a default for.
 *
 * Skip wins over everything, because §12 allows it "before or after the expected
 * date" and REC-05A applies it to an occurrence that is already Late or Missing.
 */
export function occurrenceStatus(
  occurrence: ExpectedOccurrence,
  asOf: ISODate,
  reconciledOn: ISODate | null,
): OccurrenceStatus {
  if (occurrence.skipped) return "skipped";

  if (reconciledOn !== null) {
    // §12: "Reconciled late — a Late or Missing occurrence later reconciles."
    // The distinction is what the occurrence had become by the receipt date.
    const whenReceived = elapsedStatus(occurrence.date, reconciledOn);
    return whenReceived === "late" || whenReceived === "missing" ? "reconciled-late" : "reconciled";
  }

  return elapsedStatus(occurrence.date, asOf);
}

/**
 * Whether the expectation belongs in an expected-income total (§12).
 *
 * Missing counts: it "remains in the historical expected-income total and
 * expected-versus-actual variance", which is what keeps a negative variance
 * visible instead of quietly erasing income that never arrived. Reconciled
 * counts too, because expected and actual stay separate records. Skipped does
 * not, and neither does replaced, whose expectation belongs to a superseded
 * schedule version.
 */
export function countsTowardExpectedIncome(status: OccurrenceStatus): boolean {
  return status !== "skipped" && status !== "replaced";
}

/**
 * Whether the expectation belongs in forward cash projection (§12).
 *
 * Narrower than {@link countsTowardExpectedIncome}, and the difference is the
 * point: Missing stays in the historical total while leaving the forecast, so
 * money that did not arrive stops being counted as money still coming. Anything
 * already received or withdrawn is likewise not forthcoming.
 */
export function countsTowardForwardProjection(status: OccurrenceStatus): boolean {
  return status === "projected" || status === "expected-today" || status === "late";
}
