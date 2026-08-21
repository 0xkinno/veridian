import type { LineageId, Sha256 } from "./types";

export type InvariantKind = "SINGLE_USER" | "MULTI_ACTOR" | "SHARED_STATE" | "PERSISTENCE" | "AUTHORIZATION" | "FINANCIAL_TOTAL" | "INVENTORY" | "IDEMPOTENCY" | "UNIQUENESS" | "STATE_TRANSITION";

export interface InvariantDefinition {
  id: LineageId;
  stableKey: string;
  title: string;
  statement: string;
  kind: InvariantKind;
  critical: boolean;
  contentHash: Sha256;
}

export interface ActorDefinition {
  id: LineageId;
  stableKey: string;
  displayName: string;
  role: string;
  authorizationContext?: Readonly<Record<string, string>>;
}

export interface SynchronizationPointDefinition {
  id: LineageId;
  stableKey: string;
  sequence: number;
  description: string;
  expectedActorKeys: readonly string[];
  releaseCondition: Readonly<Record<string, unknown>>;
}

export interface AdversarialScenarioDefinition {
  id: LineageId;
  stableKey: string;
  invariantId: LineageId;
  actors: readonly ActorDefinition[];
  synchronizationPoints: readonly SynchronizationPointDefinition[];
}

export function assertAdversarialScenario(definition: AdversarialScenarioDefinition): AdversarialScenarioDefinition {
  if (definition.actors.length < 2) throw new Error("An adversarial scenario requires at least two independent actors.");
  const actorKeys = new Set(definition.actors.map((actor) => actor.stableKey));
  for (const point of definition.synchronizationPoints) {
    if (point.expectedActorKeys.some((key) => !actorKeys.has(key))) throw new Error(`Synchronization point references unknown actor: ${point.stableKey}`);
  }
  return definition;
}
