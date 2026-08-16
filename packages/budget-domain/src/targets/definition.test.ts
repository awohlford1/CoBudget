import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { TARGET_ORIGINS, validateBaseTargetSet, type BaseTargetSet } from "./definition.ts";

function set(targets: BaseTargetSet["targets"], currency = "USD"): BaseTargetSet {
  return { cadence: "monthly", currency, targets };
}

describe("validateBaseTargetSet", () => {
  it("accepts a complete set including zeroed categories", () => {
    assert.doesNotThrow(() =>
      validateBaseTargetSet(
        set([
          { categoryId: "rent", amountMinorUnits: 90_000 },
          { categoryId: "savings", amountMinorUnits: 0 },
        ]),
      ),
    );
  });

  it("rejects a negative amount", () => {
    assert.throws(
      () => validateBaseTargetSet(set([{ categoryId: "rent", amountMinorUnits: -1 }])),
      /zero-or-positive/u,
    );
  });

  it("rejects a fractional amount", () => {
    // Amounts are whole minor units. A fractional cent here would survive into
    // the proration numerator and reintroduce the floating-point error the
    // integer arithmetic exists to avoid.
    assert.throws(
      () => validateBaseTargetSet(set([{ categoryId: "rent", amountMinorUnits: 12.5 }])),
      /whole/u,
    );
  });

  it("rejects a duplicate category identity rather than merging it", () => {
    assert.throws(
      () =>
        validateBaseTargetSet(
          set([
            { categoryId: "rent", amountMinorUnits: 10 },
            { categoryId: "rent", amountMinorUnits: 20 },
          ]),
        ),
      /more than once/u,
    );
  });

  it("rejects an empty category identity", () => {
    assert.throws(
      () => validateBaseTargetSet(set([{ categoryId: "", amountMinorUnits: 10 }])),
      /empty category identity/u,
    );
  });

  it("rejects an empty set", () => {
    // INV-54 recomputes the complete category set, so an empty set is a wrong
    // input rather than a smaller valid one.
    assert.throws(() => validateBaseTargetSet(set([])), /no categories/u);
  });

  it("rejects a missing currency", () => {
    assert.throws(
      () => validateBaseTargetSet(set([{ categoryId: "rent", amountMinorUnits: 10 }], "")),
      /no currency/u,
    );
  });
});

describe("target origins", () => {
  it("offers exactly the two derivations a period target can have", () => {
    assert.deepEqual([...TARGET_ORIGINS], ["full-period", "prorated-transition"]);
  });
});
