import assert from "node:assert/strict";
import { it } from "node:test";

it("deliberately fails for the CBD-112 negative control", () => {
  assert.fail("CBD-112 deliberate test failure");
});
