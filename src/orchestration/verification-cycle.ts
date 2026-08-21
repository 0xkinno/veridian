import type { VerificationStatus } from "../domain/enums";

export type VerificationCycleState =
  | "READY"
  | "VERIFYING"
  | "FAILED"
  | "REPAIR_PENDING"
  | "REPAIRING"
  | "REVERIFYING"
  | "VERIFIED"
  | "BLOCKED"
  | "ERROR";

const transitions: Readonly<Record<VerificationCycleState, readonly VerificationCycleState[]>> = {
  READY: ["VERIFYING", "BLOCKED"],
  VERIFYING: ["FAILED", "VERIFIED", "ERROR"],
  FAILED: ["REPAIR_PENDING", "BLOCKED"],
  REPAIR_PENDING: ["REPAIRING", "BLOCKED"],
  REPAIRING: ["REVERIFYING", "BLOCKED", "ERROR"],
  REVERIFYING: ["VERIFIED", "FAILED", "ERROR"],
  VERIFIED: [],
  BLOCKED: [],
  ERROR: [],
};

export function transitionVerificationCycle(current: VerificationCycleState, next: VerificationCycleState): VerificationCycleState {
  if (!transitions[current].includes(next)) throw new Error(`Invalid verification-cycle transition: ${current} -> ${next}`);
  return next;
}

export function toVerificationStatus(state: VerificationCycleState): VerificationStatus {
  if (state === "VERIFIED") return "VERIFIED";
  if (state === "FAILED" || state === "BLOCKED") return "FAILED";
  if (state === "ERROR") return "ERROR";
  if (state === "VERIFYING" || state === "REPAIRING" || state === "REVERIFYING") return "RUNNING";
  return "PENDING";
}
