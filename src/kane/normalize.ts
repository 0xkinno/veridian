import type { RecordOrigin, VerificationStatus } from "../domain/enums";

export interface KaneRunTerminalEvent {
  type: "run_end";
  status: "passed" | "failed";
  summary: string;
  test_url?: string;
  session_dir?: string;
}

export interface NormalizedKaneEvidence {
  origin: RecordOrigin;
  status: VerificationStatus;
  summary: string;
  evidenceLocator: string;
}

export function normalizeKaneTerminalEvidence(event: KaneRunTerminalEvent, origin: RecordOrigin = "REAL"): NormalizedKaneEvidence {
  if (!event.session_dir && !event.test_url) throw new Error("Kane terminal evidence lacks a provenance locator.");
  return {
    origin,
    status: event.status === "passed" ? "VERIFIED" : "FAILED",
    summary: event.summary,
    evidenceLocator: event.session_dir ?? event.test_url ?? "",
  };
}
