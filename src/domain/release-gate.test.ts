import { describe, expect, it } from "vitest";
import { evaluateReleaseGate } from "./release-gate";

const clear = { requiredPromises: [{ id: "claim-1", satisfied: true }], criticalInvariants: [{ id: "inv-1", proven: true }], coverageComplete: true, staleSourceOrContract: false, failedRuns: [], unresolvedRepairs: [], evidenceIntegrityValid: true, contractMutated: false, repositoryBaselineChanged: false };

describe("explainable release gate", () => {
  it("ships only when every gate input is clear", () => expect(evaluateReleaseGate(clear).verdict).toBe("SHIP"));
  it("blocks with machine-readable reasons", () => {
    const result = evaluateReleaseGate({ ...clear, criticalInvariants: [{ id: "inv-1", proven: false }], failedRuns: ["run-1"] });
    expect(result.verdict).toBe("BLOCK");
    expect(result.reasons.map((reason) => reason.code)).toEqual(["CRITICAL_INVARIANT_UNPROVEN", "FAILED_RUN"]);
  });
});
