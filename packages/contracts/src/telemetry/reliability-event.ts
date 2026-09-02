/**
 * The shape of a reliability log line, fixed to the `AN-92-003` S1 allowlist.
 *
 * CBD-92 `AN-92-003` permits ordinary reliability telemetry to carry exactly:
 * service or component and deployed version, a coarse operation class, a safe
 * outcome or error class, a duration or capacity bucket, and an aggregate
 * health count. It carries no subject, budget space, resource, message body,
 * or identifier of any kind.
 *
 * This type is the allowlist as a type. There is no field on it for anything
 * outside the list, so a log line built from it cannot carry more. CBD-17 sets
 * the logging shape once, at the start, because narrowing it later is harder
 * than starting narrow; this is where it is set.
 *
 * Both the API (CBD-110) and the worker (CBD-111) import it from here. It is
 * the type CBD-17 requires to be shared through the workspace package, so that
 * changing it breaks the type check in both.
 */

/** Coarse buckets, so a duration never becomes a timing side channel. */
export type DurationBucket = "sub-100ms" | "100ms-1s" | "1s-10s" | "over-10s";

/** Coarse capacity buckets for queues, pools, and similar bounded resources. */
export type CapacityBucket = "idle" | "nominal" | "elevated" | "saturated";

export type Outcome = "ok" | "error";

export interface ReliabilityEvent {
  /** Service or component that emitted the event. */
  readonly service: string;
  /** Deployed version, from `SERVICE_VERSION`. */
  readonly version: string;
  /** Coarse operation class — `startup`, `request`, `job` — never a path or a name. */
  readonly operation: string;
  readonly outcome: Outcome;
  /** A safe error class such as `timeout` or `config`. Never a message. */
  readonly errorClass?: string;
  readonly durationBucket?: DurationBucket;
  readonly capacityBucket?: CapacityBucket;
  /** An aggregate count, never a per-subject one. */
  readonly healthCount?: number;
}

const ALLOWED_KEYS = [
  "service",
  "version",
  "operation",
  "outcome",
  "errorClass",
  "durationBucket",
  "capacityBucket",
  "healthCount",
] as const satisfies readonly (keyof ReliabilityEvent)[];

/**
 * Builds an event carrying only the allowlisted keys.
 *
 * The type already forbids extra fields at compile time. This exists for the
 * boundary where a logger is handed a value it did not construct — a spread
 * object, a caught error's properties — and enforces the same allowlist at
 * runtime, so a field that slipped past the type checker is dropped rather
 * than emitted. `undefined` optional fields are omitted, not written as null.
 */
export function reliabilityEvent(fields: ReliabilityEvent): ReliabilityEvent {
  const event: Record<string, unknown> = {};
  for (const key of ALLOWED_KEYS) {
    const value = fields[key];
    if (value !== undefined) {
      event[key] = value;
    }
  }
  return event as unknown as ReliabilityEvent;
}
