// VERIDIAN FRONTEND TYPES & DOMAIN INTERFACES
// Designed for seamless backend wiring by Codex

export type RecordOrigin = "REAL" | "DEVELOPMENT_FIXTURE";
export type VerificationStatus = "PENDING" | "RUNNING" | "FAILED" | "VERIFIED" | "ERROR" | "STALE" | "INCONCLUSIVE";
export type ReleaseGateDecision = "SHIP" | "BLOCKED" | "PENDING";

export interface ClaimItem {
  id: string;
  key: string; // e.g. C1, C2, C3, C4
  title: string;
  sourceFile: string;
  lineRange: string;
  useCase: string;
  acceptanceCriterion: string;
  invariant: string;
  kaneTest: string;
  status: VerificationStatus;
  origin: RecordOrigin;
  lastRunId?: string;
  evidenceId?: string;
  repairId?: string;
  driftDetected?: boolean;
}

export interface PromiseGraphNode {
  id: string;
  stage: "SOURCE" | "CLAIM" | "USE_CASE" | "CRITERION" | "INVARIANT" | "KANE_TEST" | "EXECUTION" | "EVIDENCE" | "COVERAGE" | "DRIFT" | "REPAIR" | "RELEASE_DECISION";
  label: string;
  subtext: string;
  status: VerificationStatus;
  details: string;
}

export interface VerificationRun {
  runId: string;
  claimId: string;
  claimTitle: string;
  contractHash: string;
  sourceHash: string;
  repoBaseline: string;
  timestamp: string;
  browser: string;
  durationMs: number;
  status: VerificationStatus;
  actorCount: number;
  steps: {
    index: number;
    description: string;
    status: "PASS" | "FAIL" | "SKIP";
    durationMs: number;
    screenshotUrl?: string;
  }[];
}

export interface EvidenceRecord {
  evidenceId: string;
  runId: string;
  claimId: string;
  contractHash: string;
  sourceHash: string;
  repositoryBaseline: string;
  timestamp: string;
  browser: string;
  actors: string[];
  verdict: VerificationStatus;
  timeline: {
    stage: string;
    title: string;
    timestamp: string;
    detail: string;
    status: "OK" | "WARN" | "FAIL";
  }[];
  failureTrace?: {
    expected: string;
    observed: string;
    stackTrace: string;
    screenshotAnchor?: string;
  };
}

export interface DriftRecord {
  id: string;
  claimId: string;
  claimTitle: string;
  type: "SPEC_MUTATION" | "UNVERIFIED_CODE_CHANGE" | "INVARIANT_WEAKENING";
  file: string;
  detectedAt: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
}

export interface RepairPatch {
  repairId: string;
  claimId: string;
  claimTitle: string;
  suggestedPatch: string;
  diff: string;
  targetFile: string;
  status: "GENERATED" | "APPLIED" | "VERIFIED" | "REJECTED";
  createdTimestamp: string;
}

export interface CoverageMetrics {
  totalClaims: number;
  verifiedClaims: number;
  staleClaims: number;
  violatedClaims: number;
  pendingClaims: number;
  invariantCoveragePct: number;
  branchCoveragePct: number;
  evidenceIntegrityScore: number;
}

export interface ReleaseGateStatus {
  decision: ReleaseGateDecision;
  candidateVersion: string;
  targetApp: string;
  blockingReasons: string[];
  summary: {
    verifiedCount: number;
    staleCount: number;
    violatedCount: number;
    coveragePct: number;
    driftCount: number;
    openRepairsCount: number;
  };
  lastCheckedTimestamp: string;
}

export interface AdversarialVerificationState {
  id: string;
  title: string;
  sharedResource: string;
  actorA: { name: string; action: string; status: "IDLE" | "ATTEMPTING" | "SUCCESS" | "REJECTED" };
  actorB: { name: string; action: string; status: "IDLE" | "ATTEMPTING" | "SUCCESS" | "REJECTED" };
  invariantDescription: string;
  concurrencyOutcome: "SYNCHRONIZED_RACE_PREVENTED" | "CONCURRENCY_VIOLATION";
  verifiedAt: string;
}
