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
 * **One gap in §12, resolved deliberately.** Late "begins on the next Federal
 * Reserve business day", so for a Friday payday the Saturday and Sunday after it
 * are past the expected date but before the Late window opens, and §12's table
 * names no status for them. Scenario REC-03 confirms the timing without closing
 * the gap: a Friday 2026-08-21 expectation becomes Late on Monday 2026-08-24.
 * Those days are reported as `expected-today`, whose income and forecast
 * behaviour §12 defines identically to Late minus the label. Reporting them as
 * Late instead would contradict the rule and would tell a user their pay is late
 * while the banks that owe it are shut. Worth tightening in CBD-68 so the label
 * is stated rather than inferred.
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
 * The four projection-only adjustments in §11.
 *
 * There is deliberately no `dismiss` or `not-expected` member. §12 states that
 * no such action exists and that Skip expresses the same intention reversibly,
 * so the closed union is what makes that true rather than an interface
 * convention that a later screen could break.
 */
export type OccurrenceException =
  | { readonly kind: "shift"; readonly id: string; readonly target: OccurrenceRef; readonly toDate: ISODate }
  | { readonly kind: "skip"; readonly id: string; readonly target: OccurrenceRef }
  | {
      readonly kind: "extra";
      readonly id: string;
      readonly scheduleId: string;
      readonly date: ISODate;
      readonly amountMinorUnits: number;
    }
  | {
      readonly kind: "amount-override";
      readonly id: string;
      readonly target: OccurrenceRef;
      readonly amountMinorUnits: number;
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

/** One expected payday after any exceptions have been applied. */
export interface ExpectedOccurrence {
  readonly scheduleId: string;
  /** The projected date. A shift moves this; the origin keeps the original. */
  readonly date: ISODate;
  readonly amountMinorUnits: number;
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
      else amountMinorUnits = exception.amountMinorUnits;
    }

    projected.push({
      scheduleId: schedule.id,
      date,
      amountMinorUnits,
      origin: { kind: "generated", ordinal, generated: occurrence },
      skipped,
      appliedExceptionIds,
    });
  }

  for (const exception of exceptions) {
    if (exception.kind !== "extra" || exception.scheduleId !== schedule.id) continue;
    projected.push({
      scheduleId: schedule.id,
      date: exception.date,
      amountMinorUnits: exception.amountMinorUnits,
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

  // The gap described in the module doc: past the expected date, but the Late
  // window has not opened because the next business day has not arrived.
  if (compareDates(asOf, addBusinessDays(expected, 1)) < 0) return "expected-today";

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
