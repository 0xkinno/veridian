export const verifiedKaneCli085Capabilities = {
  version: "0.8.5",
  commands: ["whoami", "balance", "context", "design", "testmd", "testrun", "cover", "maintain", "evidence", "run"] as const,
  evidence: "Evidence packs are produced by supported run/test commands and must be retained as external Kane output.",
} as const;

export type KaneOperationState = "AVAILABLE" | "UNAVAILABLE" | "NOT_IMPLEMENTED";
