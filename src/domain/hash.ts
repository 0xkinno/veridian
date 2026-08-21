import { createHash } from "node:crypto";
import type { Sha256 } from "./types";

type CanonicalValue = null | boolean | number | string | readonly CanonicalValue[] | { readonly [key: string]: CanonicalValue };

function canonicalize(value: CanonicalValue): string {
  if (value === null || typeof value === "boolean" || typeof value === "number") return JSON.stringify(value);
  if (typeof value === "string") return JSON.stringify(value.replace(/\r\n/g, "\n").trim());
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const objectValue = value as { readonly [key: string]: CanonicalValue };
  return `{${Object.keys(objectValue).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(objectValue[key] ?? null)}`).join(",")}}`;
}

export function sha256(value: CanonicalValue): Sha256 {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex") as Sha256;
}

export function hashNormalizedSource(content: string): Sha256 {
  return sha256({ content: content.replace(/\r\n/g, "\n").trim() });
}

export function hashRequirementOrClaim(stableKey: string, content: string): Sha256 {
  return sha256({ stableKey, content });
}

export function hashAcceptanceCriterion(stableKey: string, statement: string): Sha256 {
  return sha256({ stableKey, statement });
}

export function hashVerificationContract(input: {
  readonly definitionRef: string;
  readonly sourceHash: Sha256;
  readonly criterionHashes: readonly Sha256[];
  readonly testHash: Sha256;
}): Sha256 {
  return sha256({ ...input, criterionHashes: [...input.criterionHashes].sort() });
}

export function hashGitBaseline(input: { readonly commit: string; readonly tree: string; readonly trackedPaths: readonly string[] }): Sha256 {
  return sha256({ ...input, trackedPaths: [...input.trackedPaths].sort() });
}
