import { describe, expect, it } from "vitest";
import { KaneCliAdapter } from "./adapter";
import { normalizeKaneTerminalEvidence } from "./normalize";

describe("Kane adapter safety boundary", () => {
  it("does not claim unimplemented operations are executable", () => {
    expect(new KaneCliAdapter().runContract()).toMatchObject({ state: "NOT_IMPLEMENTED" });
  });

  it("rejects terminal events without Kane provenance", () => {
    expect(() => normalizeKaneTerminalEvidence({ type: "run_end", status: "passed", summary: "passed" })).toThrow("provenance");
  });
});
