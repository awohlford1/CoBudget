/**
 * Budget schedule definitions (CBD-26).
 *
 * A definition describes the *rule* that generates period boundaries. It does
 * not generate them — that is CBD-27 (weekly and monthly) and CBD-29 (paycheck
 * and fixed-length custom), both of which implement the CBD-67 §8.10 boundary
 * adapter against these types.
 *
 * Two absences here are deliberate and load-bearing:
 *
 * 1. There is no time-zone field. CBD-67 INV-24 and INV-75 make the
 *    budget-space time zone a separate budget setting; changing it must never
 *    create a schedule version. Putting a zone on this type would make that
 *    invariant impossible to hold.
 * 2. There is no end date, occurrence count, or expiry. Every activated cadence
 *    is open-ended until explicitly replaced through a CBD-67 schedule change
 *    (CBD-68 INV-68-19, INV-68-20, PD-68-14).
 */

import type { ISODate } from "../shared/iso-date.ts";

export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

/** CBD-67: weekly schedules default to Monday and allow any weekday anchor. */
export const DEFAULT_WEEKLY_ANCHOR: Weekday = "monday";

/**
 * CBD-67: monthly schedules allow a numbered day 1-31 or an explicit last-day
 * rule. These are modelled as distinct shapes rather than a magic number such
 * as 32 or -1, because INV-18 requires the saved anchor to survive clamping
 * unchanged — the generator must be able to tell "the 31st, clamped this month"
 * from "the last day, whatever that is".
 */
export type MonthlyAnchor =
  | { readonly kind: "day-of-month"; readonly day: number }
  | { readonly kind: "last-day" };

export const MIN_DAY_OF_MONTH = 1;
export const MAX_DAY_OF_MONTH = 31;

/** CBD-68 §10.1 non-business-day policy. Previous business day is the default. */
export const BUSINESS_DAY_POLICIES = [
  "previous-business-day",
  "next-business-day",
  "keep-original-date",
] as const;

export type BusinessDayPolicy = (typeof BUSINESS_DAY_POLICIES)[number];

export const DEFAULT_BUSINESS_DAY_POLICY: BusinessDayPolicy = "previous-business-day";

/** CBD-68 §9.3 permits exactly these six recurring patterns and no others. */
export type PaycheckPattern =
  | { readonly kind: "twice-per-week"; readonly weekdays: readonly [Weekday, Weekday] }
  | { readonly kind: "weekly"; readonly weekday: Weekday }
  | { readonly kind: "every-two-weeks"; readonly weekday: Weekday; readonly recurrenceOrigin: ISODate }
  | { readonly kind: "twice-per-month"; readonly anchors: readonly [MonthlyAnchor, MonthlyAnchor] }
  | { readonly kind: "monthly"; readonly anchor: MonthlyAnchor }
  | {
      readonly kind: "custom-weekly-interval";
      readonly weekday: Weekday;
      readonly everyWeeks: 1 | 2 | 3 | 4;
      readonly recurrenceOrigin: ISODate;
    };

/** CBD-68 §14.1: one start boundary and one fixed length from 1 to 366 days. */
export const MIN_CUSTOM_PERIOD_DAYS = 1;
export const MAX_CUSTOM_PERIOD_DAYS = 366;

/**
 * The four supported cadences, as a discriminated union on `cadence`.
 *
 * A union rather than one wide optional-field record: it makes illegal
 * combinations unrepresentable. There is no way to express a weekly schedule
 * that also carries a fixed length, so no validator has to reject one.
 */
export type CadenceDefinition =
  | { readonly cadence: "weekly"; readonly anchor: Weekday }
  | { readonly cadence: "monthly"; readonly anchor: MonthlyAnchor }
  | {
      readonly cadence: "paycheck";
      readonly pattern: PaycheckPattern;
      readonly businessDayPolicy: BusinessDayPolicy;
    }
  | {
      readonly cadence: "custom-fixed-length";
      readonly startBoundary: ISODate;
      readonly lengthInDays: number;
    };

export type Cadence = CadenceDefinition["cadence"];

/**
 * An immutable record of the configuration that governed a budget space over a
 * date interval (CBD-67 INV-61, INV-76).
 *
 * `effectiveThrough` is `null` for the current version, expressing the
 * open-ended rule directly. It is set only when a confirmed change supersedes
 * this version, which is what lets a completed period keep pointing at the
 * version that actually governed it (INV-03, INV-62).
 *
 * Every field is `readonly`. That is not decoration: INV-61 requires an
 * authoritative version to be immutable, and the compiler is a cheaper guard
 * than a code review.
 */
export interface ScheduleVersion {
  readonly versionId: string;
  readonly budgetSpaceId: string;
  readonly definition: CadenceDefinition;
  readonly effectiveFrom: ISODate;
  readonly effectiveThrough: ISODate | null;
}

/**
 * A human-readable recurrence summary, required of every cadence by the
 * CBD-67 §8.10 adapter contract for preview, confirmation, history, and audit.
 *
 * Deliberately plain and unlocalised: this is the domain's own description of
 * the rule, not display copy. Presentation and translation belong to the
 * interface layer.
 */
export function describeCadence(definition: CadenceDefinition): string {
  switch (definition.cadence) {
    case "weekly":
      return `Weekly on ${definition.anchor}`;
    case "monthly":
      return `Monthly on ${describeMonthlyAnchor(definition.anchor)}`;
    case "paycheck":
      return `Paycheck: ${describePaycheckPattern(definition.pattern)} (${definition.businessDayPolicy})`;
    case "custom-fixed-length":
      return `Every ${definition.lengthInDays} days from ${definition.startBoundary}`;
  }
}

function describeMonthlyAnchor(anchor: MonthlyAnchor): string {
  return anchor.kind === "last-day" ? "the last day of the month" : `day ${anchor.day}`;
}

function describePaycheckPattern(pattern: PaycheckPattern): string {
  switch (pattern.kind) {
    case "twice-per-week":
      return `twice per week on ${pattern.weekdays[0]} and ${pattern.weekdays[1]}`;
    case "weekly":
      return `weekly on ${pattern.weekday}`;
    case "every-two-weeks":
      return `every two weeks on ${pattern.weekday} from ${pattern.recurrenceOrigin}`;
    case "twice-per-month":
      return `twice per month on ${describeMonthlyAnchor(pattern.anchors[0])} and ${describeMonthlyAnchor(pattern.anchors[1])}`;
    case "monthly":
      return `monthly on ${describeMonthlyAnchor(pattern.anchor)}`;
    case "custom-weekly-interval":
      return `every ${pattern.everyWeeks} week(s) on ${pattern.weekday} from ${pattern.recurrenceOrigin}`;
  }
}

