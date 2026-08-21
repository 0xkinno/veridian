import { describe, expect, it } from "vitest";
import { hashAcceptanceCriterion, hashNormalizedSource, hashVerificationContract } from "./hash";

describe("deterministic Promise Graph hashes", () => {
  it("normalizes line endings and surrounding source whitespace", () => {
    expect(hashNormalizedSource(" checkout\r\nready ")).toBe(hashNormalizedSource("checkout\nready"));
  });

  it("changes the criterion hash when the contract content changes", () => {
    expect(hashAcceptanceCriterion("AC-1", "checkout succeeds")).not.toBe(hashAcceptanceCriterion("AC-1", "checkout fails"));
  });

  it("makes criterion ordering irrelevant but captures contract mutation", () => {
    const sourceHash = hashNormalizedSource("source");
    const testHash = hashNormalizedSource("test");
    const first = hashVerificationContract({ definitionRef: "checkout_test.md", sourceHash, criterionHashes: [hashAcceptanceCriterion("A", "one"), hashAcceptanceCriterion("B", "two")], testHash });
    const reordered = hashVerificationContract({ definitionRef: "checkout_test.md", sourceHash, criterionHashes: [hashAcceptanceCriterion("B", "two"), hashAcceptanceCriterion("A", "one")], testHash });
    const changed = hashVerificationContract({ definitionRef: "checkout_test.md", sourceHash, criterionHashes: [hashAcceptanceCriterion("A", "three")], testHash });
    expect(first).toBe(reordered);
    expect(first).not.toBe(changed);
  });
});
