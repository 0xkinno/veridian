export type GateVerdict = "SHIP" | "BLOCK";

export type GateReasonCode =
  | "MISSING_REQUIRED_PROMISE"
  | "CRITICAL_INVARIANT_UNPROVEN"
  | "COVERAGE_INCOMPLETE"
  | "STALE_SOURCE_OR_CONTRACT"
  | "FAILED_RUN"
  | "UNRESOLVED_REPAIR"
  | "EVIDENCE_INVALID"
  | "CONTRACT_MUTATED"
  | "BASELINE_CHANGED";

export interface GateReason {
  code: GateReasonCode;
  subjectId: string;
  detail: string;
  children?: readonly GateReason[];
}

export interface ReleaseGateInput {
  requiredPromises: readonly { id: string; satisfied: boolean }[];
  criticalInvariants: readonly { id: string; proven: boolean }[];
  coverageComplete: boolean;
  staleSourceOrContract: boolean;
  failedRuns: readonly string[];
  unresolvedRepairs: readonly string[];
  evidenceIntegrityValid: boolean;
  contractMutated: boolean;
  repositoryBaselineChanged: boolean;
}

export interface ReleaseGateResult {
  verdict: GateVerdict;
  reasons: readonly GateReason[];
}

export function evaluateReleaseGate(input: ReleaseGateInput): ReleaseGateResult {
  const reasons: GateReason[] = [];
  for (const promise of input.requiredPromises.filter((item) => !item.satisfied)) reasons.push({ code: "MISSING_REQUIRED_PROMISE", subjectId: promise.id, detail: "Required promise has no satisfying evidence." });
  for (const invariant of input.criticalInvariants.filter((item) => !item.proven)) reasons.push({ code: "CRITICAL_INVARIANT_UNPROVEN", subjectId: invariant.id, detail: "Critical invariant lacks proven verification." });
  if (!input.coverageComplete) reasons.push({ code: "COVERAGE_INCOMPLETE", subjectId: "coverage", detail: "Designed and proven coverage are incomplete." });
  if (input.staleSourceOrContract) reasons.push({ code: "STALE_SOURCE_OR_CONTRACT", subjectId: "freshness", detail: "Source or verification contract is stale." });
  for (const runId of input.failedRuns) reasons.push({ code: "FAILED_RUN", subjectId: runId, detail: "A required verification run failed." });
  for (const repairId of input.unresolvedRepairs) reasons.push({ code: "UNRESOLVED_REPAIR", subjectId: repairId, detail: "A repair attempt remains unresolved." });
  if (!input.evidenceIntegrityValid) reasons.push({ code: "EVIDENCE_INVALID", subjectId: "evidence", detail: "Evidence integrity could not be established." });
  if (input.contractMutated) reasons.push({ code: "CONTRACT_MUTATED", subjectId: "contract", detail: "The verified contract changed after baseline capture." });
  if (input.repositoryBaselineChanged) reasons.push({ code: "BASELINE_CHANGED", subjectId: "repository", detail: "Repository baseline changed outside the approved candidate." });
  return { verdict: reasons.length === 0 ? "SHIP" : "BLOCK", reasons };
}
