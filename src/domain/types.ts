import type { RecordOrigin, TrustStatus, VerificationStatus } from "./enums";

export type LineageId = string & { readonly __brand: "LineageId" };
export type Sha256 = string & { readonly __brand: "Sha256" };

export interface Lineage {
  projectId: LineageId;
  sourceDocumentId: LineageId;
  sourceVersionId: LineageId;
  requirementId: LineageId;
  claimId: LineageId;
  useCaseId: LineageId;
  criterionIds: readonly LineageId[];
  verificationContractId: LineageId;
}

export interface SourceReference {
  locator: string;
  version: string;
  normalizedHash: Sha256;
}

export interface PromiseGraphNode {
  id: LineageId;
  stableKey: string;
  origin: RecordOrigin;
  trust: TrustStatus;
}

export interface VerificationContractSnapshot {
  lineage: Lineage;
  definitionRef: string;
  sourceHash: Sha256;
  criterionHashes: readonly Sha256[];
  testHash: Sha256;
  contractHash: Sha256;
}

export interface VerificationRunSnapshot {
  id: LineageId;
  contractId: LineageId;
  origin: RecordOrigin;
  status: VerificationStatus;
  sourceHash: Sha256;
  contractHash: Sha256;
  testHash: Sha256;
}

export function assertLineage(lineage: Lineage): Lineage {
  if (lineage.criterionIds.length === 0) {
    throw new Error("A verification contract requires at least one acceptance criterion lineage ID.");
  }
  return lineage;
}
