import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { ReadinessReport } from "@cobudget/contracts/health";
import type { ReliabilityEvent } from "@cobudget/contracts/telemetry";

import { serializeReadiness, serializeReliability } from "./telemetry.js";

describe("worker structured logs", () => {
  it("serializes only the shared readiness contract", () => {
    const report = {
      service: "worker",
      version: "test-sha",
      status: "ready",
      secret: "must-not-leak",
    } as ReadinessReport;

    assert.deepEqual(JSON.parse(serializeReadiness(report)), {
      service: "worker",
      version: "test-sha",
      status: "ready",
    });
  });

  it("drops non-allowlisted fields at the reliability boundary", () => {
    const event = {
      service: "worker",
      version: "test-sha",
      operation: "job",
      outcome: "ok",
      accountId: "must-not-leak",
      amount: 42_00,
    } as ReliabilityEvent;

    assert.deepEqual(JSON.parse(serializeReliability(event)), {
      service: "worker",
      version: "test-sha",
      operation: "job",
      outcome: "ok",
    });
  });
});
