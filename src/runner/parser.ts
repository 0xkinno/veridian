export type KaneVerdict = "PASS" | "FAIL" | "VERIFIER_ERROR" | "INCONCLUSIVE";
export interface ParsedKaneRun { verdict: KaneVerdict; status?: string; summary?: string; testUrl?: string; credits: number; steps: number }
export function parseKaneNdjson(output: string): ParsedKaneRun {
  const events = output.split(/\r?\n/).filter(Boolean).flatMap(line => { try { return [JSON.parse(line) as Record<string, unknown>]; } catch { return []; } });
  const terminal = [...events].reverse().find(event => event.type === "test_md_done" || event.type === "run_end");
  const status = String(terminal?.overall_status ?? terminal?.status ?? "");
  const hasError = events.some(event => event.type === "error");
  const incomplete = !terminal;
  const verdict: KaneVerdict = incomplete ? "INCONCLUSIVE" : hasError ? "VERIFIER_ERROR" : status === "passed" ? "PASS" : status === "failed" ? "FAIL" : "INCONCLUSIVE";
  const summary = typeof terminal?.summary === "string" ? terminal.summary : undefined;
  const testUrl = typeof terminal?.test_url === "string" ? terminal.test_url : typeof terminal?.share_url === "string" ? terminal.share_url : undefined;
  return { verdict, ...(status ? { status } : {}), ...(summary ? { summary } : {}), ...(testUrl ? { testUrl } : {}), credits: events.reduce((total,event) => total + (typeof event.credits_consumed === "number" ? event.credits_consumed : 0), 0), steps: events.filter(event => typeof event.step === "number" || event.type === "test_md_step_end").length };
}
