// VERIDIAN SERVICE ADAPTER
// Isolated data layer interface for frontend UI components.
// INTERNAL_FIXTURE_ADAPTER: Replace with real Codex Kane API calls.

import {
  ClaimItem,
  PromiseGraphNode,
  EvidenceRecord,
  DriftRecord,
  RepairPatch,
  CoverageMetrics,
  ReleaseGateStatus,
  AdversarialVerificationState,
} from "./types";

import {
  FIXTURE_CLAIMS,
  FIXTURE_PROMISE_GRAPH,
  FIXTURE_EVIDENCE_RECORDS,
  FIXTURE_REPAIRS,
  FIXTURE_DRIFTS,
  FIXTURE_COVERAGE,
  FIXTURE_RELEASE_GATE,
  FIXTURE_ADVERSARIAL_VERIFICATION,
} from "./mockData";

class VeridianServiceAdapter {
  private claims: ClaimItem[] = [...FIXTURE_CLAIMS];
  private repairs: RepairPatch[] = [...FIXTURE_REPAIRS];
  private releaseGate: ReleaseGateStatus = { ...FIXTURE_RELEASE_GATE };

  async getClaims(): Promise<ClaimItem[]> {
    return Promise.resolve(this.claims);
  }

  async getPromiseGraph(): Promise<PromiseGraphNode[]> {
    return Promise.resolve(FIXTURE_PROMISE_GRAPH);
  }

  async getEvidence(evidenceId: string): Promise<EvidenceRecord | null> {
    const record = FIXTURE_EVIDENCE_RECORDS[evidenceId.toLowerCase()] ?? FIXTURE_EVIDENCE_RECORDS["ev-903"];
    return Promise.resolve(record ?? null);
  }

  async getRepairs(): Promise<RepairPatch[]> {
    return Promise.resolve(this.repairs);
  }

  async getDrifts(): Promise<DriftRecord[]> {
    return Promise.resolve(FIXTURE_DRIFTS);
  }

  async getCoverage(): Promise<CoverageMetrics> {
    return Promise.resolve(FIXTURE_COVERAGE);
  }

  async getReleaseGate(): Promise<ReleaseGateStatus> {
    return Promise.resolve(this.releaseGate);
  }

  async getAdversarialVerification(): Promise<AdversarialVerificationState> {
    return Promise.resolve(FIXTURE_ADVERSARIAL_VERIFICATION);
  }

  // INTERNAL_FIXTURE_ADAPTER: Action to apply a repair patch
  async applyRepair(repairId: string): Promise<{ success: boolean; updatedClaimId: string }> {
    const repair = this.repairs.find((r) => r.repairId === repairId);
    if (!repair) return { success: false, updatedClaimId: "" };

    repair.status = "APPLIED";

    // Update claim status to VERIFIED upon applying repair
    const claim = this.claims.find((c) => c.id === repair.claimId);
    if (claim) {
      claim.status = "VERIFIED";
      claim.driftDetected = false;
    }

    // Check if any violations remain
    const activeViolations = this.claims.filter((c) => c.status === "FAILED");
    if (activeViolations.length === 0) {
      this.releaseGate.decision = "SHIP";
      this.releaseGate.blockingReasons = [];
    }

    return Promise.resolve({ success: true, updatedClaimId: repair.claimId });
  }
}

export const veridianAdapter = new VeridianServiceAdapter();
