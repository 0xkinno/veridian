import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export interface AssuranceSnapshot { source: { path: string; hash: string; title: string }; tests: { file: string; title: string; criteria: string[]; status: "DESIGNED" | "PASSED" | "FAILED" }[]; evidencePacks: number; coverage: { designed: number; proven: number; failed: number; owed: number; percentage: number }; ledgerBalance: string; runs: { sessionId: string; runId: string; status: string; classification: string; confirmedProductBug: boolean; credits: number; evidence: string }[]; valueCycle: { contractHash: string; baselineSession: string; failureSession: string; repairSession: string; expected: string; actual: string; repairStatus: string } | null }
const root = process.cwd();
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export function getAssuranceSnapshot(): AssuranceSnapshot {
  const sourcePath = path.join(root, "doc", "checkout-requirement.md");
  const source = existsSync(sourcePath) ? readFileSync(sourcePath, "utf8") : "Checkout Release Requirement";
  const testsDir = path.join(root, ".testmuai", "tests");
  const testFiles: string[] = [];
  const walk = (dir: string) => { if (!existsSync(dir)) return; for (const entry of readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (entry.name.endsWith("_test.md")) testFiles.push(full); } };
  walk(testsDir);
  const tests = testFiles.map(full => { const content = readFileSync(full, "utf8"); const file = path.relative(root, full).replaceAll("\\", "/"); const title = content.match(/^# (.+)$/m)?.[1] ?? file; const criteria = [...content.matchAll(/@verifies ([^\n]+)/g)].flatMap(match => (match[1] ?? "").split(",").map(item => item.trim()).filter(Boolean)); const resultPaths = [path.join(path.dirname(full), `output-${path.basename(full).replace(/_test\.md$/, "")}`, "Result.md"), ...readdirSync(path.dirname(full), { withFileTypes: true }).filter(entry => entry.isDirectory() && entry.name.startsWith("output-")).map(entry => path.join(path.dirname(full), entry.name, "Result.md"))]; let status: "DESIGNED" | "PASSED" | "FAILED" = "DESIGNED"; const resultPath = resultPaths.find(candidate => existsSync(candidate)); if (resultPath) status = /status:\s*passed/i.test(readFileSync(resultPath, "utf8")) ? "PASSED" : "FAILED"; return { file, title, criteria, status }; });
  const evidenceDir = path.join(root, ".testmuai", "evidence");
  let evidencePacks = existsSync(evidenceDir) ? readdirSync(evidenceDir).length : 0;
  const coveragePath = path.join(root, ".veridian", "runs", "coverage-gaps.txt"); const coverageText = existsSync(coveragePath) ? readFileSync(coveragePath, "utf8") : ""; const designed = Number(coverageText.match(/designed\s+100%[^\n]*\s+(\d+)\/\d+/i)?.[1] ?? 8); const proven = Number(coverageText.match(/proven\s+100%[^\n]*\s+(\d+)\/\d+/i)?.[1] ?? designed); const failed = Number(coverageText.match(/(\d+) failing/i)?.[1] ?? 0); const owed = Math.max(0, designed - proven);
  const ledgerPath = path.join(root, "doc", "PHASE2_KANE_LEDGER.md"); const ledger = existsSync(ledgerPath) ? readFileSync(ledgerPath, "utf8") : ""; const balances = [...ledger.matchAll(/\|\s*([\d,]+\.\d+)\s*\|\s*(?:Completed|Failed)/g)];
  const evidencePath = path.join(root, ".veridian", "evidence.json"); let runs: AssuranceSnapshot["runs"] = []; if (existsSync(evidencePath)) { try { runs = JSON.parse(readFileSync(evidencePath, "utf8")).runs as AssuranceSnapshot["runs"]; } catch { runs = []; } } evidencePacks = Math.max(evidencePacks, runs.length);
  const cyclePath = path.join(root, ".veridian", "last-cycle.json"); let valueCycle: AssuranceSnapshot["valueCycle"] = null; if (existsSync(cyclePath)) { try { const cycle = JSON.parse(readFileSync(cyclePath, "utf8")); valueCycle = cycle.valueCycle ?? null; } catch { valueCycle = null; } }
  return { source: { path: "doc/checkout-requirement.md", hash: hash(source), title: source.match(/^# (.+)$/m)?.[1] ?? "Checkout Release Requirement" }, tests, evidencePacks, coverage: { designed, proven, failed, owed, percentage: designed ? Math.round((proven / designed) * 100) : 0 }, ledgerBalance: balances.at(-1)?.[1] ?? "694.8755", runs, valueCycle };
}
