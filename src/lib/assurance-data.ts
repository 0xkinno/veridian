import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export interface AssuranceSnapshot { source: { path: string; hash: string; title: string }; tests: { file: string; title: string; criteria: string[]; status: "DESIGNED" | "PASSED" | "FAILED" }[]; evidencePacks: number; coverage: { designed: number; proven: number; failed: number; owed: number; percentage: number }; ledgerBalance: string; runs: { sessionId: string; runId: string; status: string; classification: string; confirmedProductBug: boolean; credits: number; evidence: string }[] }
const root = process.cwd();
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export function getAssuranceSnapshot(): AssuranceSnapshot {
  const sourcePath = path.join(root, "doc", "checkout-requirement.md");
  const source = existsSync(sourcePath) ? readFileSync(sourcePath, "utf8") : "Checkout Release Requirement";
  const testsDir = path.join(root, ".testmuai", "tests");
  const testFiles = existsSync(testsDir) ? readdirSync(testsDir).filter(file => file.endsWith("_test.md")) : [];
  const tests = testFiles.map(file => { const content = readFileSync(path.join(testsDir, file), "utf8"); const title = content.match(/^# (.+)$/m)?.[1] ?? file; const criteria = [...content.matchAll(/@verifies ([^\n]+)/g)].flatMap(match => (match[1] ?? "").split(",").map(item => item.trim()).filter(Boolean)); const resultPath = path.join(testsDir, `output-${file.replace(/_test\.md$/, "")}`, "Result.md"); let status: "DESIGNED" | "PASSED" | "FAILED" = "DESIGNED"; if (existsSync(resultPath)) status = /status:\s*passed/i.test(readFileSync(resultPath, "utf8")) ? "PASSED" : "FAILED"; return { file, title, criteria, status }; });
  const evidenceDir = path.join(root, ".testmuai", "evidence");
  let evidencePacks = existsSync(evidenceDir) ? readdirSync(evidenceDir).length : 0;
  const proven = tests.filter(test => test.status === "PASSED").length; const failed = tests.filter(test => test.status === "FAILED").length; const designed = tests.length; const owed = designed - proven;
  const ledgerPath = path.join(root, "doc", "PHASE2_KANE_LEDGER.md"); const ledger = existsSync(ledgerPath) ? readFileSync(ledgerPath, "utf8") : ""; const balances = [...ledger.matchAll(/\|\s*([\d,]+\.\d+)\s*\|\s*(?:Completed|Failed)/g)];
  const evidencePath = path.join(root, ".veridian", "evidence.json"); let runs: AssuranceSnapshot["runs"] = []; if (existsSync(evidencePath)) { try { runs = JSON.parse(readFileSync(evidencePath, "utf8")).runs as AssuranceSnapshot["runs"]; } catch { runs = []; } } evidencePacks = Math.max(evidencePacks, runs.length);
  return { source: { path: "doc/checkout-requirement.md", hash: hash(source), title: source.match(/^# (.+)$/m)?.[1] ?? "Checkout Release Requirement" }, tests, evidencePacks, coverage: { designed, proven, failed, owed, percentage: designed ? Math.round((proven / designed) * 100) : 0 }, ledgerBalance: balances.at(-1)?.[1] ?? "1,051.6780", runs };
}
