export type MultiActorRuntimeState = "UNAVAILABLE" | "NOT_IMPLEMENTED" | "READY";

export interface ActorSessionPlan { actorKey: string; objective: string; variablesFile?: string; }
export interface SynchronizationBarrierPlan { key: string; actorKeys: readonly string[]; timeoutMs: number; }
export interface MultiActorVerificationPlan { sessions: readonly ActorSessionPlan[]; barriers: readonly SynchronizationBarrierPlan[]; }

export interface MultiActorKaneCoordinator {
  capability(): { state: MultiActorRuntimeState; reason: string };
  execute(plan: MultiActorVerificationPlan): Promise<never>;
}

export class UnavailableMultiActorKaneCoordinator implements MultiActorKaneCoordinator {
  capability() { return { state: "NOT_IMPLEMENTED" as const, reason: "Independent Kane session orchestration and barrier behavior must be verified against installed CLI behavior before execution." }; }
  async execute(_plan: MultiActorVerificationPlan): Promise<never> { throw new Error(this.capability().reason); }
}
