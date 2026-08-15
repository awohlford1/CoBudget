/**
 * Per-period income totals (CBD-100, CBD-68 §12.1).
 *
 * §12.1 asks each canonical period to report current expected income, actual
 * income, the variance between them, the prior expectation before revisions,
 * and an explanation when a receipt in one period fulfils an expectation from
 * another. This computes those five and nothing else.
 *
 * **The two sides are assigned by different dates, which is the whole point.**
 * An expectation belongs to the period containing its *projected* date; a
 * receipt belongs to the period containing its *receipt* date. §12.1 is explicit
 * that reconciling across a boundary must happen "without reclassifying the
 * actual receipt date", so a late paycheck leaves its expectation in the period
 * that expected it and counts its money in the period that received it. Neither
 * side is moved to meet the other, and neither is counted twice.
 *
 * {@link PeriodIncome.fulfilledAcrossPeriods} is what keeps that legible. It
 * carries no money — it is the explanation §12.1 asks for, listed on both the
 * expecting and the receiving period so a report spanning either can describe
 * the relationship.
 *
 * **Expected income and forward projection are separate figures.** §12 keeps a
 * Missing occurrence in the historical expected total and its negative variance
 * while removing it from forward-looking cash projection, so a single total
 * cannot express both. Reporting them side by side is what makes that rule
 * observable rather than merely stated.
 *
 * **Prior expectation follows the pre-exception values.** A shifted occurrence
 * contributes its prior figure to the period it was originally expected in, not
 * the one it moved to, and a skipped one still contributes there — that is what
 * makes the revision visible as a change rather than an absence.
 *
 * Not here: targets, which are CBD-30 and which §13.3 confirms reconciliation
 * never alters; and any notion of a period being current or closed, which is
 * CBD-28's lineage.
 */

import { periodContains, type BudgetPeriod } from "../schedule/period.ts";
import type { ISODate } from "../shared/iso-date.ts";
import {
  countsTowardExpectedIncome,
  countsTowardForwardProjection,
  identityOf,
  occurrenceStatus,
  sameIdentity,
  type ExpectedOccurrence,
  type OccurrenceIdentity,
} from "./occurrence.ts";
import type { ActualIncome, ReconciliationLink } from "./reconciliation.ts";

/**
 * A receipt in one period fulfilling an expectation from another (§12.1).
 *
 * Explanatory only: it contributes no amount to either period, because both
 * sides are already counted once in their own.
 */
export interface CrossPeriodFulfilment {
  readonly linkId: string;
  readonly occurrence: OccurrenceIdentity;
  /** The projected date, which stays in its own period. */
  readonly expectedOn: ISODate;
  readonly actualId: string;
  /** The receipt date, which is never reclassified to meet the expectation. */
  readonly receivedOn: ISODate;
}

export interface PeriodIncome {
  readonly period: BudgetPeriod;
  /** Non-skipped projections dated inside this period (§12.1). */
  readonly expectedMinorUnits: number;
  /** Receipts dated inside this period, matched or not (§12.1). */
  readonly actualMinorUnits: number;
  /** Actual minus expected, per §12.1's stated direction. */
  readonly varianceMinorUnits: number;
  /** What this period expected before skips and amount overrides (§12.1). */
  readonly priorExpectedMinorUnits: number;
  /** Expected income still ahead: excludes Missing and Skipped (§12). */
  readonly forwardProjectedMinorUnits: number;
  readonly fulfilledAcrossPeriods: readonly CrossPeriodFulfilment[];
}

export interface PeriodIncomeOptions {
  /** The budget-space date the lifecycle is evaluated against (INV-87). */
  readonly asOf: ISODate;
  readonly links: readonly ReconciliationLink[];
}

/**
 * Total expected and actual income for each period.
 *
 * `occurrences` and `actuals` may reach outside `periods`; anything falling in
 * no listed period is simply not counted, since it belongs to a period the
 * caller did not ask about. That is scoping, not silent loss.
 *
 * Throws when a binding link names a receipt absent from `actuals`. The status
 * of the expectation it matches cannot be determined without it, and quietly
 * reporting that expectation as unreconciled would understate actual income in
 * exactly the cross-period case §12.1 exists to explain.
 */
export function periodIncome(
  periods: readonly BudgetPeriod[],
  occurrences: readonly ExpectedOccurrence[],
  actuals: readonly ActualIncome[],
  options: PeriodIncomeOptions,
): readonly PeriodIncome[] {
  const binding = options.links.filter((link) => link.unmatchedBy === null);
  const actualById = new Map(actuals.map((actual) => [actual.id, actual]));

  const receiptFor = (occurrence: ExpectedOccurrence): ISODate | null => {
    const identity = identityOf(occurrence);
    const link = binding.find((candidate) =>
      candidate.occurrences.some((linked) => sameIdentity(linked, identity)),
    );
    if (link === undefined) return null;

    const [actualId] = link.actualIds;
    if (actualId === undefined) return null;

    const actual = actualById.get(actualId);
    if (actual === undefined) {
      throw new RangeError(
        `link ${JSON.stringify(link.id)} names actual income ${JSON.stringify(actualId)}, ` +
          "which was not supplied. Pass every receipt its links reference, including ones " +
          "outside the reported periods.",
      );
    }
    return actual.receivedOn;
  };

  const fulfilments: CrossPeriodFulfilment[] = [];
  for (const link of binding) {
    for (const identity of link.occurrences) {
      const occurrence = occurrences.find((candidate) =>
        sameIdentity(identityOf(candidate), identity),
      );
      if (occurrence === undefined) continue;

      for (const actualId of link.actualIds) {
        const actual = actualById.get(actualId);
        if (actual === undefined) continue;

        const expectedIn = periods.find((period) => periodContains(period, occurrence.date));
        const receivedIn = periods.find((period) => periodContains(period, actual.receivedOn));
        // Only worth explaining when the two sit in different periods. Within
        // one period the expectation and the receipt already read together.
        if (expectedIn !== undefined && expectedIn === receivedIn) continue;

        fulfilments.push({
          linkId: link.id,
          occurrence: identity,
          expectedOn: occurrence.date,
          actualId,
          receivedOn: actual.receivedOn,
        });
      }
    }
  }

  return periods.map((period) => {
    let expectedMinorUnits = 0;
    let forwardProjectedMinorUnits = 0;
    let priorExpectedMinorUnits = 0;

    for (const occurrence of occurrences) {
      if (periodContains(period, occurrence.date)) {
        const status = occurrenceStatus(occurrence, options.asOf, receiptFor(occurrence));
        if (countsTowardExpectedIncome(status)) expectedMinorUnits += occurrence.amountMinorUnits;
        if (countsTowardForwardProjection(status)) {
          forwardProjectedMinorUnits += occurrence.amountMinorUnits;
        }
      }

      // The prior figure belongs where the occurrence was originally expected,
      // which a shift may since have moved it away from.
      if (occurrence.priorAmountMinorUnits !== null) {
        const priorDate =
          occurrence.origin.kind === "generated"
            ? occurrence.origin.generated.adjustedDate
            : occurrence.date;
        if (periodContains(period, priorDate)) {
          priorExpectedMinorUnits += occurrence.priorAmountMinorUnits;
        }
      }
    }

    const actualMinorUnits = actuals
      .filter((actual) => periodContains(period, actual.receivedOn))
      .reduce((total, actual) => total + actual.amountMinorUnits, 0);

    return {
      period,
      expectedMinorUnits,
      actualMinorUnits,
      varianceMinorUnits: actualMinorUnits - expectedMinorUnits,
      priorExpectedMinorUnits,
      forwardProjectedMinorUnits,
      fulfilledAcrossPeriods: fulfilments.filter(
        (fulfilment) =>
          periodContains(period, fulfilment.expectedOn) ||
          periodContains(period, fulfilment.receivedOn),
      ),
    };
  });
}
