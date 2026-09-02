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
 * outside the list, so a log line built from it cannot carry more — and the
 * fields that could smuggle free text are closed unions rather than strings,
 * so a request path or an error message cannot be passed off as a "class".
 * CBD-17 sets the logging shape once, at the start, because narrowing it later
 * is harder than starting narrow; this is where it is set. Adding a member to
 * one of these unions is deliberate and reviewed, which is the point.
 *
 * Both the API (CBD-110) and the worker (CBD-111) import it from here. It is
 * the type CBD-17 requires to be shared through the workspace package, so that
 * changing it breaks the type check in both.
 */

/** Coarse operation classes — a phase or kind of work, never a path or a name. */
export type OperationClass = "startup" | "shutdown" | "health" | "request" | "job";

/** Safe error classes — what kind of thing went wrong, never what it said. */
export type ErrorClass = "config" | "timeout" | "unavailable" | "internal" | "unknown";

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
  readonly operation: OperationClass;
  readonly outcome: Outcome;
  readonly errorClass?: ErrorClass;
  readonly durationBucket?: DurationBucket;
  readonly capacityBucket?: CapacityBucket;
  /** An aggregate count, never a per-subject one. */
  readonly healthCount?: number;
}

/**
 * The allowlist as a value, for the runtime filter below.
 *
 * Typed as `Record<keyof ReliabilityEvent, true>` rather than as an array so
 * that the compiler enforces it in both directions: a key here that is not on
 * the type is an excess property, and a field added to the type without a key
 * here is a missing property. Either is a build failure, which is what keeps
 * the runtime allowlist from silently diverging from the type.
 */
const ALLOWED: Readonly<Record<keyof ReliabilityEvent, true>> = {
  service: true,
  version: true,
  operation: true,
  outcome: true,
  errorClass: true,
  durationBucket: true,
  capacityBucket: true,
  healthCount: true,
};

// The only cast in this module: Object.keys returns string[] by design, and the
// object above is typed so its keys are exactly keyof ReliabilityEvent.
const ALLOWED_KEYS = Object.keys(ALLOWED) as readonly (keyof ReliabilityEvent)[];

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
