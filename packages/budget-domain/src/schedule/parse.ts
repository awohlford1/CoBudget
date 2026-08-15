/**
 * Boundary parsing: `unknown` into a typed schedule definition.
 *
 * `validate.ts` answers "are these values in range?" and takes an already-typed
 * `CadenceDefinition`. That is the right contract inside the domain, where the
 * compiler guarantees the shape — but it is worthless at the edge, where data
 * arrives as parsed JSON with no guarantees at all. Without this module a
 * malformed payload could be asserted into a `CadenceDefinition` the compiler
 * believes and the validator waves through.
 *
 * So the two jobs stay separate and compose:
 *
 *   unknown --parse (shape)--> CadenceDefinition --validate (values)--> ok
 *
 * Parsing answers "is this the right shape?" and validation answers "are these
 * values legal?". Every parse function ends by delegating to its validator, so
 * a caller at the edge needs exactly one call and gets both guarantees.
 */

import { isISODate, type ISODate } from "../shared/iso-date.ts";
import {
  BUSINESS_DAY_POLICIES,
  WEEKDAYS,
  type BusinessDayPolicy,
  type CadenceDefinition,
  type MonthlyAnchor,
  type PaycheckPattern,
  type ScheduleVersion,
  type Weekday,
} from "./definition.ts";
import {
  validateCadenceDefinition,
  validateScheduleVersion,
  type ValidationIssue,
  type ValidationResult,
} from "./validate.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pushIssue(
  issues: ValidationIssue[],
  code: string,
  path: string,
  message: string,
): undefined {
  issues.push({ code, path, message });
  return undefined;
}

function readString(
  record: Record<string, unknown>,
  key: string,
  path: string,
  issues: ValidationIssue[],
): string | undefined {
  const value = record[key];
  if (typeof value !== "string") {
    return pushIssue(issues, "field.expected-string", path, `Expected text at ${path}.`);
  }
  return value;
}

function readNumber(
  record: Record<string, unknown>,
  key: string,
  path: string,
  issues: ValidationIssue[],
): number | undefined {
  const value = record[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return pushIssue(issues, "field.expected-number", path, `Expected a number at ${path}.`);
  }
  return value;
}

function readWeekday(
  record: Record<string, unknown>,
  key: string,
  path: string,
  issues: ValidationIssue[],
): Weekday | undefined {
  const value = readString(record, key, path, issues);
  if (value === undefined) return undefined;
  if (!(WEEKDAYS as readonly string[]).includes(value)) {
    return pushIssue(
      issues,
      "weekday.unsupported",
      path,
      `Expected one of ${WEEKDAYS.join(", ")} at ${path}.`,
    );
  }
  return value as Weekday;
}

function readISODate(
  record: Record<string, unknown>,
  key: string,
  path: string,
  issues: ValidationIssue[],
): ISODate | undefined {
  const value = readString(record, key, path, issues);
  if (value === undefined) return undefined;
  if (!isISODate(value)) {
    return pushIssue(
      issues,
      "field.expected-calendar-date",
      path,
      `Expected a YYYY-MM-DD calendar date at ${path}.`,
    );
  }
  return value;
}

function parseMonthlyAnchor(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): MonthlyAnchor | undefined {
  if (!isRecord(value)) {
    return pushIssue(issues, "field.expected-object", path, `Expected an anchor object at ${path}.`);
  }
  const kind = value["kind"];
  if (kind === "last-day") {
    return { kind: "last-day" };
  }
  if (kind === "day-of-month") {
    const day = readNumber(value, "day", `${path}.day`, issues);
    return day === undefined ? undefined : { kind: "day-of-month", day };
  }
  return pushIssue(
    issues,
    "monthly-anchor.unsupported-kind",
    `${path}.kind`,
    `Expected "day-of-month" or "last-day" at ${path}.kind.`,
  );
}

function parseAnchorPair(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): readonly [MonthlyAnchor, MonthlyAnchor] | undefined {
  if (!Array.isArray(value) || value.length !== 2) {
    return pushIssue(
      issues,
      "field.expected-pair",
      path,
      `Expected exactly two anchors at ${path}.`,
    );
  }
  const first = parseMonthlyAnchor(value[0], `${path}.0`, issues);
  const second = parseMonthlyAnchor(value[1], `${path}.1`, issues);
  return first === undefined || second === undefined ? undefined : [first, second];
}

function parseWeekdayPair(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): readonly [Weekday, Weekday] | undefined {
  if (!Array.isArray(value) || value.length !== 2) {
    return pushIssue(
      issues,
      "field.expected-pair",
      path,
      `Expected exactly two weekdays at ${path}.`,
    );
  }
  const first = readWeekday({ value: value[0] }, "value", `${path}.0`, issues);
  const second = readWeekday({ value: value[1] }, "value", `${path}.1`, issues);
  return first === undefined || second === undefined ? undefined : [first, second];
}

function parsePaycheckPattern(
  value: unknown,
  issues: ValidationIssue[],
): PaycheckPattern | undefined {
  if (!isRecord(value)) {
    return pushIssue(issues, "field.expected-object", "pattern", "Expected a pattern object.");
  }

  switch (value["kind"]) {
    case "twice-per-week": {
      const weekdays = parseWeekdayPair(value["weekdays"], "pattern.weekdays", issues);
      return weekdays === undefined ? undefined : { kind: "twice-per-week", weekdays };
    }
    case "weekly": {
      const weekday = readWeekday(value, "weekday", "pattern.weekday", issues);
      return weekday === undefined ? undefined : { kind: "weekly", weekday };
    }
    case "every-two-weeks": {
      const weekday = readWeekday(value, "weekday", "pattern.weekday", issues);
      const origin = readISODate(value, "recurrenceOrigin", "pattern.recurrenceOrigin", issues);
      return weekday === undefined || origin === undefined
        ? undefined
        : { kind: "every-two-weeks", weekday, recurrenceOrigin: origin };
    }
    case "twice-per-month": {
      const anchors = parseAnchorPair(value["anchors"], "pattern.anchors", issues);
      return anchors === undefined ? undefined : { kind: "twice-per-month", anchors };
    }
    case "monthly": {
      const anchor = parseMonthlyAnchor(value["anchor"], "pattern.anchor", issues);
      return anchor === undefined ? undefined : { kind: "monthly", anchor };
    }
    case "custom-weekly-interval": {
      const weekday = readWeekday(value, "weekday", "pattern.weekday", issues);
      const origin = readISODate(value, "recurrenceOrigin", "pattern.recurrenceOrigin", issues);
      const everyWeeks = readNumber(value, "everyWeeks", "pattern.everyWeeks", issues);
      if (weekday === undefined || origin === undefined || everyWeeks === undefined) {
        return undefined;
      }
      // The 1-4 bound is a value rule, not a shape rule, so it belongs to the
      // validator. The cast carries the value through unchecked; validation
      // rejects it a moment later if it is out of range.
      return {
        kind: "custom-weekly-interval",
        weekday,
        everyWeeks: everyWeeks as 1 | 2 | 3 | 4,
        recurrenceOrigin: origin,
      };
    }
    default:
      return pushIssue(
        issues,
        "paycheck.unsupported-pattern",
        "pattern.kind",
        "Expected one of the six supported paycheck patterns (CBD-68 §9.3).",
      );
  }
}

/**
 * Parse untrusted input into a validated cadence definition.
 *
 * Structural failures short-circuit: there is no point range-checking a field
 * that is not the right type. When the shape is sound, every value rule in
 * `validateCadenceDefinition` still applies.
 */
export function parseCadenceDefinition(input: unknown): ValidationResult<CadenceDefinition> {
  const issues: ValidationIssue[] = [];

  if (!isRecord(input)) {
    return {
      ok: false,
      issues: [
        { code: "input.expected-object", path: "", message: "Expected a schedule definition object." },
      ],
    };
  }

  let candidate: CadenceDefinition | undefined;

  switch (input["cadence"]) {
    case "weekly": {
      const anchor = readWeekday(input, "anchor", "anchor", issues);
      if (anchor !== undefined) candidate = { cadence: "weekly", anchor };
      break;
    }
    case "monthly": {
      const anchor = parseMonthlyAnchor(input["anchor"], "anchor", issues);
      if (anchor !== undefined) candidate = { cadence: "monthly", anchor };
      break;
    }
    case "paycheck": {
      const pattern = parsePaycheckPattern(input["pattern"], issues);
      const policy = readString(input, "businessDayPolicy", "businessDayPolicy", issues);
      if (policy !== undefined && !(BUSINESS_DAY_POLICIES as readonly string[]).includes(policy)) {
        pushIssue(
          issues,
          "business-day-policy.unsupported",
          "businessDayPolicy",
          `Expected one of ${BUSINESS_DAY_POLICIES.join(", ")}.`,
        );
        break;
      }
      if (pattern !== undefined && policy !== undefined) {
        candidate = {
          cadence: "paycheck",
          pattern,
          businessDayPolicy: policy as BusinessDayPolicy,
        };
      }
      break;
    }
    case "custom-fixed-length": {
      const startBoundary = readISODate(input, "startBoundary", "startBoundary", issues);
      const lengthInDays = readNumber(input, "lengthInDays", "lengthInDays", issues);
      if (startBoundary !== undefined && lengthInDays !== undefined) {
        candidate = { cadence: "custom-fixed-length", startBoundary, lengthInDays };
      }
      break;
    }
    default:
      pushIssue(
        issues,
        "cadence.unsupported",
        "cadence",
        'Expected "weekly", "monthly", "paycheck", or "custom-fixed-length".',
      );
  }

  if (candidate === undefined) {
    return { ok: false, issues };
  }
  return validateCadenceDefinition(candidate);
}

/** Parse untrusted input into a validated schedule version. */
export function parseScheduleVersion(input: unknown): ValidationResult<ScheduleVersion> {
  const issues: ValidationIssue[] = [];

  if (!isRecord(input)) {
    return {
      ok: false,
      issues: [
        { code: "input.expected-object", path: "", message: "Expected a schedule version object." },
      ],
    };
  }

  const versionId = readString(input, "versionId", "versionId", issues);
  const budgetSpaceId = readString(input, "budgetSpaceId", "budgetSpaceId", issues);
  const effectiveFrom = readISODate(input, "effectiveFrom", "effectiveFrom", issues);

  // null is the normal open-ended state, not a missing value, so it is read
  // explicitly rather than treated as absent (CBD-68 INV-68-19/20).
  const rawThrough = input["effectiveThrough"];
  let effectiveThrough: ISODate | null | undefined;
  if (rawThrough === null) {
    effectiveThrough = null;
  } else if (typeof rawThrough === "string" && isISODate(rawThrough)) {
    effectiveThrough = rawThrough;
  } else {
    pushIssue(
      issues,
      "field.expected-calendar-date-or-null",
      "effectiveThrough",
      "Expected a YYYY-MM-DD calendar date or null at effectiveThrough.",
    );
  }

  const definitionResult = parseCadenceDefinition(input["definition"]);
  if (!definitionResult.ok) {
    issues.push(
      ...definitionResult.issues.map((issue) => ({
        ...issue,
        path: issue.path === "" ? "definition" : `definition.${issue.path}`,
      })),
    );
  }

  if (
    versionId === undefined ||
    budgetSpaceId === undefined ||
    effectiveFrom === undefined ||
    effectiveThrough === undefined ||
    !definitionResult.ok
  ) {
    return { ok: false, issues };
  }

  return validateScheduleVersion({
    versionId,
    budgetSpaceId,
    definition: definitionResult.value,
    effectiveFrom,
    effectiveThrough,
  });
}
