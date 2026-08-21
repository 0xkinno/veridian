import type { KaneOperationState } from "./capabilities";

export interface KaneCommand {
  readonly command: string;
  readonly args: readonly string[];
  readonly state: KaneOperationState;
  readonly reason?: string;
}

export interface KaneAdapter {
  getContext(): KaneCommand;
  designTests(): KaneCommand;
  runContract(): KaneCommand;
  retrieveEvidence(): KaneCommand;
  reconcileCoverage(): KaneCommand;
}

const unavailable = (command: string, reason: string): KaneCommand => ({ command, args: [], state: "NOT_IMPLEMENTED", reason });

export class KaneCliAdapter implements KaneAdapter {
  getContext(): KaneCommand { return unavailable("context", "Command wiring requires a verified project context and Phase 2 execution authorization."); }
  designTests(): KaneCommand { return unavailable("design tests", "Test-design invocation is deferred until a source-backed contract is approved."); }
  runContract(): KaneCommand { return unavailable("testmd run", "No verification contract may run until Phase 2 and a ledger pre-record exist."); }
  retrieveEvidence(): KaneCommand { return unavailable("evidence", "Evidence retrieval is only meaningful for an actual Kane verification run."); }
  reconcileCoverage(): KaneCommand { return unavailable("maintain reconcile", "Coverage reconciliation is deferred until verified contract and evidence inputs exist."); }
}
