import { describe, expect, it } from "vitest";
import { assertAdversarialScenario } from "./adversarial";

describe("adversarial scenario model", () => {
  it("requires independent actors and validates synchronization references", () => {
    expect(() => assertAdversarialScenario({ id: "s" as never, stableKey: "s", invariantId: "i" as never, actors: [{ id: "a" as never, stableKey: "alice", displayName: "Alice", role: "buyer" }], synchronizationPoints: [] })).toThrow("at least two");
    expect(() => assertAdversarialScenario({ id: "s" as never, stableKey: "s", invariantId: "i" as never, actors: [{ id: "a" as never, stableKey: "alice", displayName: "Alice", role: "buyer" }, { id: "b" as never, stableKey: "bob", displayName: "Bob", role: "buyer" }], synchronizationPoints: [{ id: "p" as never, stableKey: "barrier", sequence: 1, description: "release", expectedActorKeys: ["mallory"], releaseCondition: {} }] })).toThrow("unknown actor");
  });
});
