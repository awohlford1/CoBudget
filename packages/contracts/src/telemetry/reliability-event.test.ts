import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { reliabilityEvent } from "./reliability-event.ts";
import type { ReliabilityEvent } from "./reliability-event.ts";

describe("reliabilityEvent", () => {
  it("passes an allowlisted event through unchanged", () => {
    const event: ReliabilityEvent = {
      service: "api",
      version: "abc123",
      operation: "startup",
      outcome: "ok",
      durationBucket: "sub-100ms",
    };

    assert.deepEqual(reliabilityEvent(event), event);
  });

  it("omits optional fields that are undefined rather than writing them", () => {
    const event = reliabilityEvent({ service: "worker", version: "v1", operation: "job", outcome: "error", errorClass: "timeout" });

    assert.deepEqual(Object.keys(event).sort(), ["errorClass", "operation", "outcome", "service", "version"]);
  });

  // AN-92-003: no subject, space, resource, or message. A caller that spreads
  // an untyped object into the logger must not be able to smuggle one through.
  it("drops any field outside the AN-92-003 allowlist at runtime", () => {
    const smuggled = {
      service: "api",
      version: "v1",
      operation: "request",
      outcome: "ok",
      userId: "u-123",
      path: "/budgets/42",
      message: "GET /budgets/42 200",
    };

    const event = reliabilityEvent(smuggled as ReliabilityEvent);

    assert.deepEqual(Object.keys(event).sort(), ["operation", "outcome", "service", "version"]);
    assert.equal("userId" in event, false);
    assert.equal("path" in event, false);
    assert.equal("message" in event, false);
  });
});
