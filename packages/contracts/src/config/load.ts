import type { ConfigOf, ConfigSchema, VariableSpec } from "./schema.ts";

/**
 * One variable that failed validation, and why.
 *
 * `reason` describes what was expected and never repeats the offending value:
 * a malformed secret is still a secret, and a startup error may be logged.
 */
export interface ConfigFailure {
  readonly variable: string;
  readonly reason: string;
}

/**
 * Thrown when the environment does not satisfy the schema. The message lists
 * every failing variable by name, so an operator fixes them in one pass rather
 * than one restart at a time.
 */
export class ConfigError extends Error {
  readonly failures: readonly ConfigFailure[];

  constructor(failures: readonly ConfigFailure[]) {
    const lines = failures.map((failure) => `  ${failure.variable}: ${failure.reason}`);
    super(`Invalid configuration:\n${lines.join("\n")}`);
    this.name = "ConfigError";
    this.failures = failures;
  }
}

/** Matches an optionally signed run of digits and nothing else. */
const INTEGER_PATTERN = /^-?\d+$/;

function validateValue(name: string, spec: VariableSpec, raw: string): { value: unknown } | { failure: ConfigFailure } {
  switch (spec.kind) {
    case "string":
      return { value: raw };

    case "integer": {
      if (!INTEGER_PATTERN.test(raw)) {
        return { failure: { variable: name, reason: "must be an integer" } };
      }
      const value = Number(raw);
      if (!Number.isSafeInteger(value)) {
        return { failure: { variable: name, reason: "must be a safe integer" } };
      }
      if (spec.min !== undefined && value < spec.min) {
        return { failure: { variable: name, reason: `must be at least ${spec.min}` } };
      }
      if (spec.max !== undefined && value > spec.max) {
        return { failure: { variable: name, reason: `must be at most ${spec.max}` } };
      }
      return { value };
    }

    case "enum": {
      if (!spec.values.includes(raw)) {
        return { failure: { variable: name, reason: `must be one of: ${spec.values.join(", ")}` } };
      }
      return { value: raw };
    }
  }
}

/**
 * Validates `env` against `schema` and returns the typed configuration.
 *
 * Pure: the environment is a parameter, so tests pass a plain object and the
 * result depends on nothing else. Applications use `loadConfigFromEnvironment`
 * below, which supplies `process.env`.
 *
 * Rules, each of which is a CBD-109 acceptance criterion:
 *
 * - A required variable that is absent or empty fails, naming the variable.
 * - A malformed value fails the same way. It is never coerced to a default —
 *   a value the operator set wrongly is a configuration error, not a hint.
 * - Every failure is collected before throwing, so the message is complete.
 * - Variables not in the schema are ignored. The schema declares what an
 *   application reads; it does not police the environment it runs in.
 */
export function loadConfig<S extends ConfigSchema>(
  schema: S,
  env: Readonly<Record<string, string | undefined>>,
): ConfigOf<S> {
  const failures: ConfigFailure[] = [];
  const loaded: Record<string, unknown> = {};

  for (const [name, spec] of Object.entries(schema)) {
    const raw = env[name];

    if (raw === undefined || raw === "") {
      if (spec.required) {
        failures.push({ variable: name, reason: "is required and not set" });
      } else {
        loaded[name] = undefined;
      }
      continue;
    }

    const result = validateValue(name, spec, raw);
    if ("failure" in result) {
      failures.push(result.failure);
    } else {
      loaded[name] = result.value;
    }
  }

  if (failures.length > 0) {
    throw new ConfigError(failures);
  }

  return loaded as unknown as ConfigOf<S>;
}

/**
 * The one place this package reads `process.env`. CBD-110 and CBD-111 require
 * configuration to come through the shared loader rather than from
 * `process.env` directly, and routing every read through here is what makes
 * that checkable.
 */
export function loadConfigFromEnvironment<S extends ConfigSchema>(schema: S): ConfigOf<S> {
  return loadConfig(schema, process.env);
}
