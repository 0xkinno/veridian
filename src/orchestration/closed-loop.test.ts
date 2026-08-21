import { describe, expect, it } from "vitest";
import { hashNormalizedSource } from "../domain/hash";
import { UnavailableMultiActorKaneCoordinator } from "../kane/multi-actor";
import { createRepairPacket, validateRepairResult } from "../repair/packet";
import { classifyFailure } from "./failure";
import { transitionVerificationCycle } from "./verification-cycle";

describe("closed-loop safety", () => {
  it("enforces verification-cycle transitions", () => {
    expect(transitionVerificationCycle("FAILED", "REPAIR_PENDING")).toBe("REPAIR_PENDING");
    expect(() => transitionVerificationCycle("READY", "VERIFIED")).toThrow("Invalid");
  });
  it("does not misclassify verifier errors as product failures", () => expect(classifyFailure({ exitCode: 2, authenticationFailed: false, applicationStarted: true, timedOut: false, evidenceValid: true, contractMutated: false, sourceDrifted: false, productAssertionsFailed: false, verifierReportedError: true })).toBe("VERIFIER_ERROR"));
  it("rejects repair scope or contract mutation", () => {
    const hash = hashNormalizedSource("immutable");
    const packet = createRepairPacket({ failedRunId: "run", claimId: "claim", criterionIds: ["ac"], invariantIds: [], sourceHash: hash, contractHash: hash, testHash: hash, evidenceLocator: "kane-run", baselineHash: hash, allowedPaths: ["src/app"], forbiddenPaths: ["contract_test.md"], attempt: 1 });
    expect(() => validateRepairResult(packet, { changedPaths: ["contract_test.md"], sourceHash: hash, contractHash: hash, testHash: hash })).toThrow();
    expect(() => validateRepairResult(packet, { changedPaths: ["src/app/page.tsx"], sourceHash: hash, contractHash: hashNormalizedSource("changed"), testHash: hash })).toThrow("immutable");
  });
  it("fails closed for unverified multi-actor execution", async () => await expect(new UnavailableMultiActorKaneCoordinator().execute({ sessions: [], barriers: [] })).rejects.toThrow("must be verified"));
});
