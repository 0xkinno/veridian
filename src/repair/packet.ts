import { sha256 } from "../domain/hash";
import type { Sha256 } from "../domain/types";
import { isRepairScopeAllowed } from "../git/baseline";

export interface RepairPacketInput {
  failedRunId: string;
  claimId: string;
  criterionIds: readonly string[];
  invariantIds: readonly string[];
  sourceHash: Sha256;
  contractHash: Sha256;
  testHash: Sha256;
  evidenceLocator: string;
  baselineHash: Sha256;
  allowedPaths: readonly string[];
  forbiddenPaths: readonly string[];
  attempt: number;
}

export interface RepairPacket extends RepairPacketInput {
  packetHash: Sha256;
}

export function createRepairPacket(input: RepairPacketInput): RepairPacket {
  if (input.attempt < 1) throw new Error("Repair attempt must be positive.");
  if (input.allowedPaths.length === 0) throw new Error("Repair packet requires an explicit allowed path set.");
  if (!input.evidenceLocator.trim()) throw new Error("Repair packet requires real evidence provenance.");
  return { ...input, packetHash: sha256({
    failedRunId: input.failedRunId,
    claimId: input.claimId,
    criterionIds: input.criterionIds,
    invariantIds: input.invariantIds,
    sourceHash: input.sourceHash,
    contractHash: input.contractHash,
    testHash: input.testHash,
    evidenceLocator: input.evidenceLocator,
    baselineHash: input.baselineHash,
    allowedPaths: input.allowedPaths,
    forbiddenPaths: input.forbiddenPaths,
    attempt: input.attempt,
  }) };
}

export function validateRepairResult(packet: RepairPacket, result: { changedPaths: readonly string[]; sourceHash: Sha256; contractHash: Sha256; testHash: Sha256 }): void {
  if (!isRepairScopeAllowed(packet.allowedPaths, result.changedPaths)) throw new Error("Repair changed files outside the approved scope.");
  if (result.changedPaths.some((path) => packet.forbiddenPaths.includes(path))) throw new Error("Repair changed an explicitly forbidden file.");
  if (packet.sourceHash !== result.sourceHash || packet.contractHash !== result.contractHash || packet.testHash !== result.testHash) throw new Error("Repair mutated the immutable verification contract.");
}
