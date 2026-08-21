import { hashGitBaseline } from "../domain/hash";

export interface GitBaselineInput {
  commit: string;
  tree: string;
  trackedPaths: readonly string[];
}

export function createGitBaseline(input: GitBaselineInput) {
  return { ...input, baselineHash: hashGitBaseline(input) };
}

export function isRepairScopeAllowed(allowedPaths: readonly string[], changedPaths: readonly string[]): boolean {
  return changedPaths.every((path) => allowedPaths.some((allowed) => path === allowed || path.startsWith(`${allowed}/`)));
}
