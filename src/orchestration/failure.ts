export type FailureClass =
  | "PRODUCT_FAILURE"
  | "REQUIREMENT_DRIFT"
  | "TEST_CONTRACT_CHANGED"
  | "VERIFIER_ERROR"
  | "APPLICATION_START_FAILURE"
  | "AUTHENTICATION_FAILURE"
  | "TIMEOUT"
  | "AGENT_FAILURE"
  | "REPAIR_SCOPE_VIOLATION"
  | "EVIDENCE_INVALID"
  | "INCONCLUSIVE";

export interface FailureSignals {
  exitCode?: number;
  authenticationFailed: boolean;
  applicationStarted: boolean;
  timedOut: boolean;
  evidenceValid: boolean;
  contractMutated: boolean;
  sourceDrifted: boolean;
  productAssertionsFailed: boolean;
  verifierReportedError: boolean;
}

export function classifyFailure(signals: FailureSignals): FailureClass {
  if (signals.authenticationFailed) return "AUTHENTICATION_FAILURE";
  if (!signals.applicationStarted) return "APPLICATION_START_FAILURE";
  if (signals.timedOut) return "TIMEOUT";
  if (!signals.evidenceValid) return "EVIDENCE_INVALID";
  if (signals.contractMutated) return "TEST_CONTRACT_CHANGED";
  if (signals.sourceDrifted) return "REQUIREMENT_DRIFT";
  if (signals.verifierReportedError || signals.exitCode === 2) return "VERIFIER_ERROR";
  if (signals.productAssertionsFailed) return "PRODUCT_FAILURE";
  return "INCONCLUSIVE";
}
