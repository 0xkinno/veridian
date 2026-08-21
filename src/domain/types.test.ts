import { describe, expect, it } from "vitest";
import { canRepresentRealVerifiedEvidence } from "./enums";
import { assertLineage, type LineageId } from "./types";

const id = (value: string) => value as LineageId;

describe("lineage and fixture safety", () => {
  it("rejects a verification contract without criteria", () => {
    expect(() => assertLineage({ projectId: id("p"), sourceDocumentId: id("s"), sourceVersionId: id("v"), requirementId: id("r"), claimId: id("c"), useCaseId: id("u"), criterionIds: [], verificationContractId: id("vc") })).toThrow("at least one");
  });

  it("never presents a development fixture as real verified evidence", () => {
    expect(canRepresentRealVerifiedEvidence("DEVELOPMENT_FIXTURE", "VERIFIED")).toBe(false);
    expect(canRepresentRealVerifiedEvidence("REAL", "VERIFIED")).toBe(true);
  });
});
