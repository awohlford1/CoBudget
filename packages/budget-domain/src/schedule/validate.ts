/**
 * Schedule definition validation (CBD-26).
 *
 * The discriminated union in `definition.ts` already makes shape errors
 * impossible — you cannot construct a weekly cadence carrying a fixed length.
 * What remains is the class of constraint TypeScript cannot express: an integer
 * between 1 and 31, two anchors that must differ, a string that must be a real
 * calendar date. That is what this module checks.
 *
 * Validation returns issues rather than throwing. CBD-26's acceptance criteria
 * require invalid input to block preview and confirmation *with a specific
 * message*, which means the caller needs every problem at once, each tied to a
 * field and a stable code the interface can map to copy. A thrown exception
 * reports one problem and loses the rest.
 *
 * Throwing is still right for programmer error — `toISODate` throws, because a
 * malformed date literal in our own source is a bug, not user input.
 */

import { isISODate } from "../shared/iso-date.ts";
import {
  BUSINESS_DAY_POLICIES,
  MAX_CUSTOM_PERIOD_DAYS,
  MAX_DAY_OF_MONTH,
  MIN_CUSTOM_PERIOD_DAYS,
  MIN_DAY_OF_MONTH,
  WEEKDAYS,
  type CadenceDefinition,
  type MonthlyAnchor,
  type PaycheckPattern,
  type ScheduleVersion,
  type Weekday,
} from "./definition.ts";

/** A single validation failure, addressed to a field and carrying a stable code. */
export interface ValidationIssue {
  /** Stable identifier for interface copy and tests. Never localised. */
  readonly code: string;
  /** Dotted path to the offending field, e.g. `pattern.weekdays`. */
  readonly path: string;
  /** Plain-language description of what is wrong. */
  readonly message: string;
}

export type ValidationResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly issues: readonly ValidationIssue[] };

declare const validatedBrand: unique symbol;

/**
 * Marks a value as having passed validation.
 *
 * Written as a distributive conditional so that `Validated<A | B>` becomes
 * `(A & brand) | (B & brand)` rather than `(A | B) & brand`. That keeps
 * discriminated-union narrowing and `Extract` working normally on the result.
 */
export type Validated<T> = T extends unknown
  ? T & { readonly [validatedBrand]: true }
  : never;

/**
 * A cadence definition that has passed {@link validateCadenceDefinition}.
 *
 * This exists because value ranges are not expressible in the type system:
 * `MonthlyAnchor.day` is a plain `number`, so `{ kind: "day-of-month", day: 40 }`
 * is type-valid and only validation rejects it. Without this brand, the period
 * generator had no way to require that its input had been checked, and quietly
 * produced a boundary of 2026-07-31 for a day-40 anchor instead of refusing.
 *
 * Only this module can mint the brand, so "unvalidated definition reaches the
 * generator" becomes a compile error rather than a silent wrong answer.
 */
export type ValidatedCadenceDefinition = Validated<CadenceDefinition>;

function isWeekday(value: string): value is Weekday {
  return (WEEKDAYS as readonly string[]).includes(value);
}

function checkWeekday(value: Weekday, path: string, issues: ValidationIssue[]): void {
  if (!isWeekday(value)) {
    issues.push({
      code: "weekday.unsupported",
      path,
      message: `Choose a weekday. Received ${JSON.stringify(value)}.`,
    });
  }
}

function checkMonthlyAnchor(anchor: MonthlyAnchor, path: string, issues: ValidationIssue[]): void {
  if (anchor.kind === "last-day") return;

  if (!Number.isInteger(anchor.day)) {
    issues.push({
      code: "monthly-anchor.not-an-integer",
      path: `${path}.day`,
      message: "Choose a whole-numbered day of the month.",
    });
    return;
  }
  if (anchor.day < MIN_DAY_OF_MONTH || anchor.day > MAX_DAY_OF_MONTH) {
    issues.push({
      code: "monthly-anchor.out-of-range",
      path: `${path}.day`,
      // A saved anchor of 29-31 is valid and is clamped per month at generation
      // time (INV-18); only a day outside 1-31 is rejected here.
      message: `Choose a day from ${MIN_DAY_OF_MONTH} to ${MAX_DAY_OF_MONTH}. Received ${anchor.day}.`,
    });
  }
}

function sameMonthlyAnchor(a: MonthlyAnchor, b: MonthlyAnchor): boolean {
  if (a.kind === "last-day" || b.kind === "last-day") {
    return a.kind === b.kind;
  }
  return a.day === b.day;
}

function checkRecurrenceOrigin(origin: string, path: string, issues: ValidationIssue[]): void {
  if (!isISODate(origin)) {
    issues.push({
      code: "recurrence-origin.invalid-date",
      path,
      message: `Enter a valid calendar date. Received ${JSON.stringify(origin)}.`,
    });
  }
}

function checkPaycheckPattern(
  pattern: PaycheckPattern,
  issues: ValidationIssue[],
): void {
  switch (pattern.kind) {
    case "twice-per-week": {
      const [first, second] = pattern.weekdays;
      checkWeekday(first, "pattern.weekdays.0", issues);
      checkWeekday(second, "pattern.weekdays.1", issues);
      if (first === second) {
        issues.push({
          code: "paycheck.duplicate-weekday",
          path: "pattern.weekdays",
          message: "Choose two different weekdays.",
        });
      }
      return;
    }
    case "weekly":
      checkWeekday(pattern.weekday, "pattern.weekday", issues);
      return;
    case "every-two-weeks":
      checkWeekday(pattern.weekday, "pattern.weekday", issues);
      checkRecurrenceOrigin(pattern.recurrenceOrigin, "pattern.recurrenceOrigin", issues);
      return;
    case "twice-per-month": {
      const [first, second] = pattern.anchors;
      checkMonthlyAnchor(first, "pattern.anchors.0", issues);
      checkMonthlyAnchor(second, "pattern.anchors.1", issues);
      if (sameMonthlyAnchor(first, second)) {
        issues.push({
          code: "paycheck.duplicate-monthly-anchor",
          path: "pattern.anchors",
          message: "Choose two different monthly anchors.",
        });
      }
      return;
    }
    case "monthly":
      checkMonthlyAnchor(pattern.anchor, "pattern.anchor", issues);
      return;
    case "custom-weekly-interval":
      checkWeekday(pattern.weekday, "pattern.weekday", issues);
      checkRecurrenceOrigin(pattern.recurrenceOrigin, "pattern.recurrenceOrigin", issues);
      if (![1, 2, 3, 4].includes(pattern.everyWeeks)) {
        issues.push({
          code: "paycheck.interval-out-of-range",
          path: "pattern.everyWeeks",
          message: `Choose an interval of 1, 2, 3, or 4 weeks. Received ${String(pattern.everyWeeks)}.`,
        });
      }
      return;
  }
}

/**
 * Validate a cadence definition before it may be previewed or activated.
 *
 * A definition that passes is one the CBD-27/CBD-29 generators can turn into a
 * chronological, contiguous, non-overlapping, open-ended timeline. Anything
 * that would block that is reported here rather than surfacing later as a
 * malformed period (EC-69-19).
 */
export function validateCadenceDefinition(
  definition: CadenceDefinition,
): ValidationResult<ValidatedCadenceDefinition> {
  const issues: ValidationIssue[] = [];

  switch (definition.cadence) {
    case "weekly":
      checkWeekday(definition.anchor, "anchor", issues);
      break;

    case "monthly":
      checkMonthlyAnchor(definition.anchor, "anchor", issues);
      break;

    case "paycheck":
      checkPaycheckPattern(definition.pattern, issues);
      if (!(BUSINESS_DAY_POLICIES as readonly string[]).includes(definition.businessDayPolicy)) {
        issues.push({
          code: "business-day-policy.unsupported",
          path: "businessDayPolicy",
          message: `Choose a supported policy. Received ${JSON.stringify(definition.businessDayPolicy)}.`,
        });
      }
      break;

    case "custom-fixed-length":
      if (!isISODate(definition.startBoundary)) {
        issues.push({
          code: "custom.invalid-start-boundary",
          path: "startBoundary",
          message: `Enter a valid start date. Received ${JSON.stringify(definition.startBoundary)}.`,
        });
      }
      if (!Number.isInteger(definition.lengthInDays)) {
        issues.push({
          code: "custom.length-not-an-integer",
          path: "lengthInDays",
          message: "Enter a whole number of days.",
        });
      } else if (
        definition.lengthInDays < MIN_CUSTOM_PERIOD_DAYS ||
        definition.lengthInDays > MAX_CUSTOM_PERIOD_DAYS
      ) {
        issues.push({
          code: "custom.length-out-of-range",
          path: "lengthInDays",
          message: `Enter a length from ${MIN_CUSTOM_PERIOD_DAYS} to ${MAX_CUSTOM_PERIOD_DAYS} days. Received ${definition.lengthInDays}.`,
        });
      }
      break;
  }

  // The single minting site for the brand, exactly as isoDateOf is for ISODate.
  // A lint rule forbids this cast anywhere else in production source.
  return issues.length === 0
    ? { ok: true, value: definition as ValidatedCadenceDefinition }
    : { ok: false, issues };
}

/**
 * Validate a schedule version's own fields, then its definition.
 *
 * `effectiveThrough` of `null` is the normal, current state: an activated
 * cadence is open-ended until explicitly replaced (CBD-68 INV-68-19/20). A
 * non-null value is only ever set by a confirmed replacement, and must not
 * precede the interval's own start.
 */
export function validateScheduleVersion(
  version: ScheduleVersion,
): ValidationResult<ScheduleVersion> {
  const issues: ValidationIssue[] = [];

  if (!isISODate(version.effectiveFrom)) {
    issues.push({
      code: "version.invalid-effective-from",
      path: "effectiveFrom",
      message: `Enter a valid effective date. Received ${JSON.stringify(version.effectiveFrom)}.`,
    });
  }

  if (version.effectiveThrough !== null) {
    if (!isISODate(version.effectiveThrough)) {
      issues.push({
        code: "version.invalid-effective-through",
        path: "effectiveThrough",
        message: `Enter a valid end date. Received ${JSON.stringify(version.effectiveThrough)}.`,
      });
    } else if (
      isISODate(version.effectiveFrom) &&
      version.effectiveThrough < version.effectiveFrom
    ) {
      issues.push({
        code: "version.interval-reversed",
        path: "effectiveThrough",
        message: "A schedule version cannot end before it begins.",
      });
    }
  }

  const definitionResult = validateCadenceDefinition(version.definition);
  if (!definitionResult.ok) {
    issues.push(
      ...definitionResult.issues.map((issue) => ({
        ...issue,
        path: `definition.${issue.path}`,
      })),
    );
  }

  return issues.length === 0 ? { ok: true, value: version } : { ok: false, issues };
}
