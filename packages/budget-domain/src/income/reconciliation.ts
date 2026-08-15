/**
 * Matching actual income against expected occurrences (CBD-101, CBD-68 §13).
 *
 * This module answers one question about one pair: how closely does this
 * received transaction correspond to this expectation? Deciding what to *do*
 * about it also depends on whether anything else competes for either side,
 * which is a property of the whole set rather than of a pair.
 *
 * **`exact` does not mean "reconcile it".** §13.2 permits an automatic match
 * only for "one unique eligible expected occurrence and one unique eligible
 * actual transaction ... with no competing candidate". Uniqueness is not
 * visible from a single pair, so {@link CandidateTier} reports how well the two
 * correspond and nothing more. The tier is named for the correspondence rather
 * than the outcome, so that nobody reads `exact` as permission.
 *
 * **The amount tolerance is integer arithmetic.** §13.2 defines it as
 * `absolute(actual − expected) ≤ absolute(expected) × 0.05` and requires
 * boundary equality to qualify, so the comparison is rearranged to
 * `difference × 100 ≤ expected × 5`.
 *
 * This is not fixing an observed bug. A probe compared both forms at the exact
 * boundary for every expected amount up to 4,000,000 minor units, and one unit
 * outside it up to 500,000, and found no disagreement — `0.05` rounds to a
 * double slightly *above* one twentieth, which happens to make the float form
 * inclusive exactly where §13.2 wants it. The integer form is used because it is
 * exact by construction rather than by that coincidence: it stays correct if the
 * tolerance changes, if amounts grow, or if a currency with different minor
 * units arrives, none of which the float form's accidental correctness survives
 * without re-checking.
 *
 * **Currency sits on the actual, not on the schedule.** CBD-68 §4 gives a budget
 * space one authoritative currency, which is why `IncomeSchedule` has no
 * currency field and must not gain one. Received money, by contrast, arrives in
 * whatever the payer sent. A mismatch fails the amount tolerance, which is
 * enough to keep it from ever reconciling or being suggested without inventing
 * a separate rule §13 does not state.
 *
 * **A skipped occurrence is not a candidate.** REC-05B is explicit: income
 * arriving after a skip "is unexpected actual income unless the user reverses
 * the skip and reconciles it". A Missing occurrence *is* still a candidate —
 * REC-05 has one reconcile in a later period — so absence and suppression are
 * treated differently.
 *
 * Not here: link records, ambiguity resolution, and rejection memory, which
 * need the whole candidate set; and permission, which is CBD-68 PD-68-12 at the
 * edge rather than a property of the match.
 */

import { addBusinessDays, businessDaysBetween } from "../schedule/business-day.ts";
import type { ValidationIssue, ValidationResult } from "../schedule/validate.ts";
import { compareDates, daysBetween, type ISODate } from "../shared/iso-date.ts";
import {
  identityOf,
  sameIdentity,
  type ExpectedOccurrence,
  type OccurrenceIdentity,
} from "./occurrence.ts";

/** §13.2: the window reaches five business days either side of the expectation. */
export const SUGGESTION_WINDOW_BUSINESS_DAYS = 5;

/** §13.2: the amount tolerance, as a whole percent of the expected amount. */
export const AMOUNT_TOLERANCE_PERCENT = 5;

/** One received transaction, as CBD-69 defines actual income (§13.1). */
export interface ActualIncome {
  readonly id: string;
  /** Posted, settled, or manually confirmed receipt date — never a pending one. */
  readonly receivedOn: ISODate;
  readonly amountMinorUnits: number;
  /** Compared against the budget space's currency; a mismatch never qualifies. */
  readonly currency: string;
}

/** What the domain cannot determine for itself about a candidate pair. */
export interface MatchContext {
  /** The budget space's one authoritative currency (CBD-68 §4). */
  readonly budgetCurrency: string;
  /**
   * Whether the payer identity behind the actual is compatible with the one
   * behind the expectation.
   *
   * Supplied rather than derived because §13 requires "compatible source
   * identity" without defining what makes two identities compatible — that is a
   * feed-matching heuristic over payer names and account numbers, not a rule
   * this module can honestly claim to implement. §13.2 says missing or weaker
   * identity "limits the result to a suggestion", so `false` covers both
   * unknown and mismatched.
   */
  readonly sourceCompatible: boolean;
}

/**
 * How closely one actual corresponds to one expectation, per the §13.3 matrix.
 *
 * - `exact` — same date, same amount, budget currency, compatible source. Row 1,
 *   and eligible for automatic reconciliation *if* it also proves unique.
 * - `suggested` — inside both tolerances but not exact. Row 2, always requires
 *   confirmation.
 * - `manual-only` — inside one tolerance and outside the other. Row 3: never
 *   offered, but reachable by an explicitly initiated search.
 * - `none` — outside both tolerances, or not a candidate at all.
 */
export type CandidateTier = "exact" | "suggested" | "manual-only" | "none";

/**
 * Whether an amount is within §13.2's tolerance of the expectation.
 *
 * Throws on a non-positive expected amount rather than answering, because
 * §13.2 states the expected amount must be positive and a tolerance computed
 * from zero would silently admit only an exact match while looking like a
 * tolerance check.
 */
export function withinAmountTolerance(
  expectedMinorUnits: number,
  actualMinorUnits: number,
): boolean {
  if (!Number.isInteger(expectedMinorUnits) || expectedMinorUnits <= 0) {
    throw new RangeError(
      `expected amount must be a positive integer of minor units, received ` +
        `${String(expectedMinorUnits)}. CBD-68 §13.2 requires it to be positive.`,
    );
  }
  if (!Number.isInteger(actualMinorUnits)) {
    throw new RangeError(
      `actual amount must be an integer of minor units, received ${String(actualMinorUnits)}.`,
    );
  }

  const difference = Math.abs(actualMinorUnits - expectedMinorUnits);
  return difference * 100 <= expectedMinorUnits * AMOUNT_TOLERANCE_PERCENT;
}

/**
 * Whether a receipt date falls in §13.2's window around the expected date.
 *
 * The endpoints are the fifth qualifying business day on each side, so the
 * sixth is outside by construction. Membership itself is a plain calendar-range
 * test: a weekend date between the endpoints is inside the window, because only
 * the *counting* excludes non-business days.
 */
export function withinDateWindow(expected: ISODate, receivedOn: ISODate): boolean {
  const earliest = addBusinessDays(expected, -SUGGESTION_WINDOW_BUSINESS_DAYS);
  const latest = addBusinessDays(expected, SUGGESTION_WINDOW_BUSINESS_DAYS);
  return compareDates(receivedOn, earliest) >= 0 && compareDates(receivedOn, latest) <= 0;
}

/**
 * How one actual corresponds to one expectation.
 *
 * Currency is folded into the amount tolerance rather than checked separately:
 * §13.2 says a currency mismatch "never qualifies", and failing the amount
 * tolerance is exactly what that means in matrix terms — never row 1 or row 2,
 * at most row 3 if the date happens to line up.
 */
export function classifyCandidate(
  occurrence: ExpectedOccurrence,
  actual: ActualIncome,
  context: MatchContext,
): CandidateTier {
  // REC-05B: a skipped expectation is not an eligible candidate at all, so
  // income arriving against it stays unexpected until the skip is reversed.
  if (occurrence.skipped) return "none";

  const currencyMatches = actual.currency === context.budgetCurrency;
  const amountQualifies =
    currencyMatches && withinAmountTolerance(occurrence.amountMinorUnits, actual.amountMinorUnits);
  const dateQualifies = withinDateWindow(occurrence.date, actual.receivedOn);

  if (!amountQualifies && !dateQualifies) return "none";
  if (!amountQualifies || !dateQualifies) return "manual-only";

  const sameDate = occurrence.date === actual.receivedOn;
  const sameAmount = occurrence.amountMinorUnits === actual.amountMinorUnits;
  if (sameDate && sameAmount && context.sourceCompatible) return "exact";

  return "suggested";
}

/**
 * The difference between what was expected and what arrived (§13.2).
 *
 * Signed from the expectation's point of view, so a late or larger receipt is
 * positive. REC-03 is the worked case: $2,000 expected 2026-08-21 against
 * $1,950 received 2026-08-24 gives +3 calendar days, +1 business day, −5,000
 * minor units, −2.5%.
 *
 * `percent` is a display figure and is the one value here computed in floating
 * point. It is deliberately not what {@link withinAmountTolerance} tests, so a
 * value that renders as exactly −5.00% still gets an exact integer decision.
 */
export interface MatchVariance {
  readonly calendarDays: number;
  readonly businessDays: number;
  readonly amountMinorUnits: number;
  readonly percent: number;
}

export function varianceOf(occurrence: ExpectedOccurrence, actual: ActualIncome): MatchVariance {
  if (!Number.isInteger(occurrence.amountMinorUnits) || occurrence.amountMinorUnits <= 0) {
    throw new RangeError(
      `expected amount must be a positive integer of minor units, received ` +
        `${String(occurrence.amountMinorUnits)}.`,
    );
  }

  const amountMinorUnits = actual.amountMinorUnits - occurrence.amountMinorUnits;
  return {
    calendarDays: daysBetween(occurrence.date, actual.receivedOn),
    businessDays: businessDaysBetween(occurrence.date, actual.receivedOn),
    amountMinorUnits,
    percent: (amountMinorUnits / occurrence.amountMinorUnits) * 100,
  };
}

/**
 * How a link came about, and how much confidence stands behind it (§13.2).
 *
 * The tier doubles as the "confidence where applicable" §13.2 asks for, rather
 * than inventing a second scale that could disagree with it. Narrowing the
 * automatic case to `"exact"` in the type is the point: an automatic link can
 * only ever have been an exact correspondence, and now cannot be recorded
 * otherwise.
 */
export type MatchProvenance =
  | { readonly by: "automatic"; readonly recordedAt: string; readonly tier: "exact" }
  | {
      readonly by: "user";
      readonly actorId: string;
      readonly recordedAt: string;
      readonly tier: CandidateTier;
    };

/**
 * A confirmed correspondence between expectations and receipts.
 *
 * Holds arrays on both sides even though MVP only ever populates one of each.
 * §13.2 defers split, combined, partial, and many-to-many reconciliation "while
 * the domain model must not preclude future reconciliation groups", and a pair
 * of scalar fields would preclude exactly that — the shape would have to change
 * and every stored link migrate. The one-to-one restriction is therefore MVP
 * policy enforced by {@link validateReconciliationLink}, not a shape.
 *
 * Expected and actual stay separate records throughout; a link references them
 * and never absorbs or rewrites either (§13.2).
 */
export interface ReconciliationLink {
  readonly id: string;
  readonly occurrences: readonly OccurrenceIdentity[];
  readonly actualIds: readonly string[];
  readonly provenance: MatchProvenance;
  /**
   * Who unmatched this link, or `null` while it still binds.
   *
   * Required rather than optional so a caller must say which it is, and
   * recorded on the link rather than deleting the row because §13.2 requires
   * unmatching to preserve audit history: the record of who matched these two
   * has to survive the undoing, alongside who undid it.
   */
  readonly unmatchedBy: MatchProvenance | null;
}

/**
 * Undo a match, leaving both records and the history of both actions (§13.3
 * row 7).
 *
 * The expectation and the receipt return to candidacy automatically, because
 * {@link reconcile} only treats a link as binding while `unmatchedBy` is null.
 *
 * "Leaves the actual income intact" is structural rather than checked: this
 * takes a link and a provenance, so there is no `ActualIncome` in scope for it
 * to alter. Unmatching twice throws instead of being quietly idempotent, since
 * the second actor's action would otherwise vanish from the history the
 * operation exists to preserve.
 */
export function unmatch(
  link: ReconciliationLink,
  provenance: MatchProvenance,
): ReconciliationLink {
  if (link.unmatchedBy !== null) {
    throw new RangeError(
      `link ${JSON.stringify(link.id)} was already unmatched; unmatching it again would ` +
        "overwrite the record of who did so first.",
    );
  }
  return { ...link, unmatchedBy: provenance };
}

/** Enforce the MVP cardinality that {@link ReconciliationLink} deliberately permits. */
export function validateReconciliationLink(
  link: ReconciliationLink,
): ValidationResult<ReconciliationLink> {
  const issues: ValidationIssue[] = [];

  if (link.occurrences.length === 0) {
    issues.push({
      code: "reconciliation.no-occurrence",
      path: "occurrences",
      message: "A match needs an expected paycheck.",
    });
  }
  if (link.actualIds.length === 0) {
    issues.push({
      code: "reconciliation.no-actual",
      path: "actualIds",
      message: "A match needs a received payment.",
    });
  }
  if (link.occurrences.length > 1 || link.actualIds.length > 1) {
    issues.push({
      code: "reconciliation.group-not-supported",
      path: link.occurrences.length > 1 ? "occurrences" : "actualIds",
      message: "Match one expected paycheck to one received payment.",
    });
  }

  return issues.length === 0 ? { ok: true, value: link } : { ok: false, issues };
}

/**
 * A pairing the user declined, recorded so it is not offered again (§13.2).
 *
 * Stores the values that were current when it was declined, not just the two
 * identities, because §13.2 only bars re-suggesting "the same **unchanged**
 * pairing". A corrected amount or a re-dated receipt is a different proposition
 * and becomes suggestible again on its own merits.
 */
export interface RejectedPairing {
  readonly occurrence: OccurrenceIdentity;
  readonly occurrenceDate: ISODate;
  readonly occurrenceAmountMinorUnits: number;
  readonly actualId: string;
  readonly actualReceivedOn: ISODate;
  readonly actualAmountMinorUnits: number;
  readonly provenance: MatchProvenance;
}

/** Snapshot a pairing at the moment it is declined. */
export function rejectionOf(
  occurrence: ExpectedOccurrence,
  actual: ActualIncome,
  provenance: MatchProvenance,
): RejectedPairing {
  return {
    occurrence: identityOf(occurrence),
    occurrenceDate: occurrence.date,
    occurrenceAmountMinorUnits: occurrence.amountMinorUnits,
    actualId: actual.id,
    actualReceivedOn: actual.receivedOn,
    actualAmountMinorUnits: actual.amountMinorUnits,
    provenance,
  };
}

function wasRejected(
  occurrence: ExpectedOccurrence,
  actual: ActualIncome,
  rejected: readonly RejectedPairing[],
): boolean {
  const identity = identityOf(occurrence);
  return rejected.some(
    (rejection) =>
      sameIdentity(identity, rejection.occurrence) &&
      rejection.occurrenceDate === occurrence.date &&
      rejection.occurrenceAmountMinorUnits === occurrence.amountMinorUnits &&
      rejection.actualId === actual.id &&
      rejection.actualReceivedOn === actual.receivedOn &&
      rejection.actualAmountMinorUnits === actual.amountMinorUnits,
  );
}

/** One expectation paired with one receipt, and how closely they correspond. */
export interface CandidatePair {
  readonly occurrence: ExpectedOccurrence;
  readonly actual: ActualIncome;
  readonly tier: CandidateTier;
}

export interface ReconciliationOutcome {
  /** Unique exact pairs, reconcilable without asking (§13.3 row 1). */
  readonly automatic: readonly CandidatePair[];
  /** Pairs needing confirmation, including every ambiguity (rows 2 and 6). */
  readonly suggested: readonly CandidatePair[];
  /**
   * Receipts with no automatic or suggested pair (row 5).
   *
   * A `manual-only` candidate may still exist for one of these: row 3 keeps
   * such a pair reachable by an explicitly initiated search but never offers
   * it, so it is absent here by design rather than by oversight.
   */
  readonly unmatchedActualIds: readonly string[];
}

export interface ReconcileOptions {
  readonly budgetCurrency: string;
  /** See {@link MatchContext.sourceCompatible} — the caller decides this. */
  readonly sourceCompatible: (actual: ActualIncome, occurrence: ExpectedOccurrence) => boolean;
  readonly rejected: readonly RejectedPairing[];
  /** Existing links. Anything already linked is no longer a candidate. */
  readonly links: readonly ReconciliationLink[];
}

/**
 * Decide what may reconcile automatically, what to offer, and what is left.
 *
 * The uniqueness rule is applied conservatively. §13.2 permits an automatic
 * match only where there is "no competing candidate", and §13.3 row 6 sends
 * multiple candidates to review, so a pair reconciles automatically only when
 * it is the sole surviving candidate for both its expectation and its receipt —
 * even when the competitor is merely a suggestion and this pair is exact.
 * Asking a question that turns out to be unnecessary is recoverable; matching
 * the wrong paycheck silently is not.
 *
 * Rejected pairings are removed before uniqueness is assessed, so declining a
 * competitor can promote the remaining pair to automatic. That follows from
 * §13.2 treating rejection as removing the pairing from consideration rather
 * than merely hiding it.
 */
export function reconcile(
  occurrences: readonly ExpectedOccurrence[],
  actuals: readonly ActualIncome[],
  options: ReconcileOptions,
): ReconciliationOutcome {
  // An unmatched link is history, not a binding, so both sides are candidates
  // again (§13.3 row 7).
  const binding = options.links.filter((link) => link.unmatchedBy === null);
  const linkedActuals = new Set(binding.flatMap((link) => link.actualIds));
  const linkedOccurrences = binding.flatMap((link) => link.occurrences);

  const open = occurrences.filter(
    (occurrence) =>
      !linkedOccurrences.some((linked) => sameIdentity(identityOf(occurrence), linked)),
  );
  const openActuals = actuals.filter((actual) => !linkedActuals.has(actual.id));

  const pairs: CandidatePair[] = [];
  for (const occurrence of open) {
    for (const actual of openActuals) {
      const tier = classifyCandidate(occurrence, actual, {
        budgetCurrency: options.budgetCurrency,
        sourceCompatible: options.sourceCompatible(actual, occurrence),
      });
      // Row 3 is never offered, only reachable by an explicit manual search.
      if (tier !== "exact" && tier !== "suggested") continue;
      if (wasRejected(occurrence, actual, options.rejected)) continue;
      pairs.push({ occurrence, actual, tier });
    }
  }

  const automatic: CandidatePair[] = [];
  const suggested: CandidatePair[] = [];
  for (const pair of pairs) {
    const identity = identityOf(pair.occurrence);
    const competitors = pairs.filter(
      (other) =>
        other !== pair &&
        (other.actual.id === pair.actual.id ||
          sameIdentity(identityOf(other.occurrence), identity)),
    );
    if (pair.tier === "exact" && competitors.length === 0) automatic.push(pair);
    else suggested.push(pair);
  }

  const offered = new Set([...automatic, ...suggested].map((pair) => pair.actual.id));
  return {
    automatic,
    suggested,
    unmatchedActualIds: actuals.filter((a) => !offered.has(a.id)).map((a) => a.id),
  };
}
