export const recordOrigins = ["REAL", "DEVELOPMENT_FIXTURE"] as const;
export type RecordOrigin = (typeof recordOrigins)[number];

export const trustStatuses = ["PENDING", "DERIVED", "TRUSTED", "REJECTED", "STALE"] as const;
export type TrustStatus = (typeof trustStatuses)[number];

export const verificationStatuses = [
  "PENDING",
  "RUNNING",
  "FAILED",
  "VERIFIED",
  "ERROR",
  "STALE",
  "INCONCLUSIVE",
] as const;
export type VerificationStatus = (typeof verificationStatuses)[number];

export type EvidenceStatus = "PENDING" | "VALID" | "INVALID" | "UNAVAILABLE";
export type CreditCostStatus = "UNKNOWN" | "REPORTED";
export type ReleaseStatus = "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED" | "STALE";

export function canRepresentRealVerifiedEvidence(origin: RecordOrigin, status: VerificationStatus): boolean {
  return origin === "REAL" && status === "VERIFIED";
}
