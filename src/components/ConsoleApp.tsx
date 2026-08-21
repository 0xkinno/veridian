"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { veridianAdapter } from "@/lib/veridian/adapter";
import {
  ClaimItem,
  PromiseGraphNode,
  EvidenceRecord,
  DriftRecord,
  RepairPatch,
  CoverageMetrics,
  ReleaseGateStatus,
  AdversarialVerificationState,
} from "@/lib/veridian/types";

export type ConsoleTab =
  | "overview"
  | "promise-graph"
  | "requirements"
  | "verification"
  | "evidence"
  | "coverage"
  | "drift"
  | "repairs"
  | "release-gate"
  | "adversarial";

interface ConsoleAppProps {
  initialTab?: ConsoleTab;
}

export function ConsoleApp({ initialTab = "overview" }: ConsoleAppProps) {
  const [activeTab, setActiveTab] = useState<ConsoleTab>(initialTab);
  const [claims, setClaims] = useState<ClaimItem[]>([]);
  const [graphNodes, setGraphNodes] = useState<PromiseGraphNode[]>([]);
  const [evidenceRecord, setEvidenceRecord] = useState<EvidenceRecord | null>(null);
  const [repairs, setRepairs] = useState<RepairPatch[]>([]);
  const [drifts, setDrifts] = useState<DriftRecord[]>([]);
  const [coverage, setCoverage] = useState<CoverageMetrics | null>(null);
  const [releaseGate, setReleaseGate] = useState<ReleaseGateStatus | null>(null);
  const [adversarial, setAdversarial] = useState<AdversarialVerificationState | null>(null);

  const [patchApplied, setPatchApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    async function loadConsoleData() {
      const claimsData = await veridianAdapter.getClaims();
      const graphData = await veridianAdapter.getPromiseGraph();
      const evidenceData = await veridianAdapter.getEvidence("ev-903");
      const repairsData = await veridianAdapter.getRepairs();
      const driftsData = await veridianAdapter.getDrifts();
      const coverageData = await veridianAdapter.getCoverage();
      const gateData = await veridianAdapter.getReleaseGate();
      const advData = await veridianAdapter.getAdversarialVerification();

      setClaims(claimsData);
      setGraphNodes(graphData);
      setEvidenceRecord(evidenceData);
      setRepairs(repairsData);
      setDrifts(driftsData);
      setCoverage(coverageData);
      setReleaseGate(gateData);
      setAdversarial(advData);
    }
    loadConsoleData();
  }, []);

  async function handleApplyRepairPatch(repairId: string) {
    setIsApplying(true);
    const result = await veridianAdapter.applyRepair(repairId);
    if (result.success) {
      setPatchApplied(true);
      const updatedClaims = await veridianAdapter.getClaims();
      const updatedGate = await veridianAdapter.getReleaseGate();
      setClaims(updatedClaims);
      setReleaseGate(updatedGate);
    }
    setIsApplying(false);
  }

  return (
    <div className="console-container min-h-screen bg-[#0b0f12] text-white">
      {/* Console Sidebar Navigation */}
      <aside className="console-sidebar">
        {/* Top-Left Brand Capsule */}
        <div className="flex items-center justify-between px-3 py-3 mb-6 border-b border-white/10">
          <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-wider text-white">
            <svg className="w-5 h-5 text-[#48997a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5l8 14L20 5" />
              <path d="M8 5l4 7 4-7" />
            </svg>
            VERIDIAN
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#48997a]/20 text-[#48997a] border border-[#48997a]/30 font-bold">
            v0.8.4
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "promise-graph", label: "Promise Graph", icon: "🕸️" },
            { id: "requirements", label: "Requirements", icon: "📄" },
            { id: "verification", label: "Verification", icon: "⚡" },
            { id: "evidence", label: "Evidence", icon: "🔍" },
            { id: "coverage", label: "Coverage", icon: "🎯" },
            { id: "drift", label: "Drift", icon: "📉" },
            { id: "repairs", label: "Repairs", icon: "🛠️" },
            { id: "release-gate", label: "Release Gate", icon: "🚪" },
            { id: "adversarial", label: "Adversarial", icon: "⚔️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ConsoleTab)}
              className={`sidebar-item ${activeTab === tab.id ? "active" : ""}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 px-3 text-[11px] font-mono text-gray-500">
          <div className="flex justify-between items-center mb-1">
            <span>TARGET:</span>
            <span className="text-gray-300 font-semibold">Checkout Core</span>
          </div>
          <div className="flex justify-between items-center">
            <span>ENGINE:</span>
            <span className="text-[#48997a] font-semibold">Kane Runner</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="console-main">
        {/* Top Console Status Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#48997a] tracking-widest uppercase font-semibold">
                RELEASE CANDIDATE WORKSPACE
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="font-mono text-xs text-gray-400">Checkout / v0.8.4</span>
            </div>
            <h1 className="font-display text-3xl font-normal text-white mt-1 capitalize">
              {activeTab.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`status-chip ${
                releaseGate?.decision === "SHIP" ? "verified" : "blocked"
              }`}
            >
              GATE: {releaseGate?.decision ?? "BLOCKED"}
            </span>

            <Link href="/checkout" className="btn-pill-secondary font-mono text-xs">
              View Target Surface ↗
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* High-level Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5">
                <span className="text-xs font-mono text-gray-400">TOTAL CLAIMS</span>
                <p className="text-3xl font-mono font-bold text-white mt-2">
                  {coverage?.totalClaims ?? 37}
                </p>
                <span className="text-xs text-emerald-400 font-mono mt-1 block">100% Mapped</span>
              </div>

              <div className="glass-panel p-5">
                <span className="text-xs font-mono text-gray-400">VERIFIED CLAIMS</span>
                <p className="text-3xl font-mono font-bold text-emerald-400 mt-2">
                  {releaseGate?.decision === "SHIP" ? 33 : 31}
                </p>
                <span className="text-xs text-gray-400 font-mono mt-1 block">Passed Contract</span>
              </div>

              <div className="glass-panel p-5">
                <span className="text-xs font-mono text-gray-400">VIOLATED INVARIANTS</span>
                <p className="text-3xl font-mono font-bold text-red-400 mt-2">
                  {releaseGate?.decision === "SHIP" ? 0 : 2}
                </p>
                <span className="text-xs text-red-400/80 font-mono mt-1 block">Requires Repair</span>
              </div>

              <div className="glass-panel p-5">
                <span className="text-xs font-mono text-gray-400">COVERAGE SCORE</span>
                <p className="text-3xl font-mono font-bold text-[#48997a] mt-2">
                  {coverage?.invariantCoveragePct ?? 83.7}%
                </p>
                <span className="text-xs text-gray-400 font-mono mt-1 block">Formal Criteria</span>
              </div>
            </div>

            {/* Claims Table */}
            <div className="glass-panel p-6">
              <h3 className="font-display text-xl text-white mb-4">
                Release Candidate Claims & Invariants
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-white/10 font-mono text-xs text-gray-400">
                      <th className="py-3 px-4">KEY</th>
                      <th className="py-3 px-4">CLAIM TITLE</th>
                      <th className="py-3 px-4">INVARIANT</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {claims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#48997a]">
                          {claim.key}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white">{claim.title}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-gray-400">
                          {claim.invariant}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`status-chip ${
                              claim.status === "VERIFIED" ? "verified" : "failed"
                            }`}
                          >
                            {claim.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => {
                              setActiveTab("evidence");
                            }}
                            className="text-xs font-mono text-[#48997a] hover:underline"
                          >
                            Inspect Evidence ↗
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROMISE GRAPH */}
        {activeTab === "promise-graph" && (
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h3 className="font-display text-2xl text-white mb-2">Interactive Promise Graph</h3>
              <p className="text-sm text-gray-400 mb-6">
                Complete assurance lineage connecting source markdown specifications to Playwright tests, forensic evidence, and gate status.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {graphNodes.map((node) => (
                  <div
                    key={node.id}
                    className={`p-4 rounded-xl border ${
                      node.status === "FAILED"
                        ? "bg-red-950/20 border-red-500/30"
                        : node.status === "STALE"
                        ? "bg-yellow-950/20 border-yellow-500/30"
                        : "bg-emerald-950/20 border-emerald-500/30"
                    }`}
                  >
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-gray-400">{node.stage}</span>
                      <span
                        className={
                          node.status === "FAILED"
                            ? "text-red-400"
                            : node.status === "STALE"
                            ? "text-yellow-400"
                            : "text-emerald-400"
                        }
                      >
                        {node.status}
                      </span>
                    </div>
                    <div className="font-semibold text-white text-base mb-1">{node.label}</div>
                    <div className="font-mono text-xs text-gray-400">{node.subtext}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EVIDENCE */}
        {activeTab === "evidence" && evidenceRecord && (
          <div className="space-y-8">
            {/* Forensic Overview Header */}
            <div className="glass-panel p-6 border-l-4 border-l-red-500">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">EVIDENCE ID:</span>
                  <span className="text-white font-bold">{evidenceRecord.evidenceId}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">RUN ID:</span>
                  <span className="text-white">{evidenceRecord.runId}</span>
                </div>
                <span className="status-chip failed">{evidenceRecord.verdict}</span>
              </div>

              <h3 className="font-display text-2xl text-white mb-2">
                Forensic Browser Execution Evidence
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs text-gray-300">
                <div>
                  <span className="text-gray-500 block">CONTRACT HASH</span>
                  <code>{evidenceRecord.contractHash}</code>
                </div>
                <div>
                  <span className="text-gray-500 block">REPOSITORY BASELINE</span>
                  <code>{evidenceRecord.repositoryBaseline}</code>
                </div>
                <div>
                  <span className="text-gray-500 block">EXECUTION BROWSER</span>
                  <span>{evidenceRecord.browser}</span>
                </div>
              </div>
            </div>

            {/* Timeline Trace */}
            <div className="glass-panel p-6">
              <h4 className="font-display text-xl text-white mb-6">
                Execution Timeline (&quot;Flight Recorder for Software&quot;)
              </h4>

              <div className="evidence-timeline">
                {evidenceRecord.timeline.map((step, idx) => (
                  <div key={idx} className="timeline-step">
                    <div className="timeline-time">
                      <span className="text-[#48997a] font-bold block">{step.stage}</span>
                      <span className="text-gray-500">{step.timestamp}</span>
                    </div>
                    <div className="timeline-body">
                      <h4
                        className={
                          step.status === "FAIL"
                            ? "text-red-400 font-bold"
                            : step.status === "WARN"
                            ? "text-yellow-400"
                            : "text-white"
                        }
                      >
                        {step.title}
                      </h4>
                      <p>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Trace Box */}
            {evidenceRecord.failureTrace && (
              <div className="glass-panel p-6">
                <h4 className="font-display text-xl text-white mb-4">Failure Trace & Exception</h4>
                <pre className="code-block text-red-300 whitespace-pre-wrap">
                  {evidenceRecord.failureTrace.stackTrace}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: REPAIRS */}
        {activeTab === "repairs" && (
          <div className="space-y-6">
            {repairs.map((repair) => (
              <div key={repair.repairId} className="glass-panel p-6 border-l-4 border-l-[#48997a]">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-xs text-[#48997a]">REPAIR PATCH · {repair.repairId}</span>
                    <h3 className="font-display text-2xl text-white mt-1">{repair.claimTitle}</h3>
                  </div>

                  <button
                    onClick={() => handleApplyRepairPatch(repair.repairId)}
                    disabled={isApplying || patchApplied}
                    className={`btn-pill-primary px-6 py-2.5 text-sm ${
                      patchApplied ? "bg-gray-600 text-white cursor-not-allowed" : "bg-emerald-500 text-black hover:bg-emerald-400"
                    }`}
                  >
                    {patchApplied ? "Patch Applied ✓" : isApplying ? "Applying..." : "Apply Repair Patch ↗"}
                  </button>
                </div>

                <p className="text-sm text-gray-300 mb-4">{repair.suggestedPatch}</p>

                <div className="font-mono text-xs text-gray-400 mb-2">TARGET FILE: {repair.targetFile}</div>

                <pre className="code-block overflow-x-auto text-xs">
                  {repair.diff.split("\n").map((line, i) => {
                    if (line.startsWith("+")) {
                      return <span key={i} className="diff-add">{line}</span>;
                    }
                    if (line.startsWith("-")) {
                      return <span key={i} className="diff-remove">{line}</span>;
                    }
                    return <span key={i}>{line}{"\n"}</span>;
                  })}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* TAB 9: RELEASE GATE */}
        {activeTab === "release-gate" && (
          <div className="space-y-8">
            <div
              className={`glass-panel p-8 border-l-8 ${
                releaseGate?.decision === "SHIP" ? "border-l-emerald-500" : "border-l-red-500"
              }`}
            >
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
                FINAL RELEASE ASSURANCE DECISION
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <div>
                  <h2
                    className={`font-display text-6xl font-bold tracking-tight ${
                      releaseGate?.decision === "SHIP" ? "text-emerald-400" : "text-red-500"
                    }`}
                  >
                    {releaseGate?.decision === "SHIP" ? "SHIP APPROVED" : "DO NOT SHIP"}
                  </h2>
                  <p className="text-gray-300 text-base mt-2">
                    Candidate: <span className="font-mono text-white font-semibold">{releaseGate?.candidateVersion}</span>
                  </p>
                </div>

                <span
                  className={`status-chip px-6 py-3 text-sm ${
                    releaseGate?.decision === "SHIP" ? "verified" : "blocked"
                  }`}
                >
                  {releaseGate?.decision === "SHIP" ? "READY FOR DEPLOY" : "SHIPMENT BLOCKED"}
                </span>
              </div>

              {releaseGate?.decision !== "SHIP" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 mb-6">
                  <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                    BLOCKING EVIDENCE REASONS:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-200 space-y-1 font-mono">
                    {releaseGate?.blockingReasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveTab("evidence")}
                  className="btn-pill-primary px-6 py-2.5 text-sm"
                >
                  Inspect Blocking Evidence ↗
                </button>
                <button
                  onClick={() => setActiveTab("repairs")}
                  className="btn-pill-secondary px-6 py-2.5 text-sm"
                >
                  View Open Repairs ({releaseGate?.summary.openRepairsCount})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: ADVERSARIAL */}
        {activeTab === "adversarial" && adversarial && (
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <span className="font-mono text-xs text-[#48997a] uppercase tracking-widest block mb-1">
                MULTI-ACTOR ADVERSARIAL VERIFICATION
              </span>
              <h3 className="font-display text-3xl text-white mb-2">{adversarial.title}</h3>
              <p className="text-sm text-gray-400 mb-6 font-mono">
                Invariant: <code className="text-emerald-400">{adversarial.invariantDescription}</code>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-xl bg-[#12181e] border border-emerald-500/30">
                  <span className="font-mono text-xs text-gray-400 block mb-1">ACTOR A</span>
                  <h4 className="text-lg font-bold text-white mb-2">{adversarial.actorA.name}</h4>
                  <p className="font-mono text-xs text-gray-300 mb-4">{adversarial.actorA.action}</p>
                  <span className="status-chip verified">{adversarial.actorA.status}</span>
                </div>

                <div className="p-6 rounded-xl bg-[#1f1414] border border-red-500/30">
                  <span className="font-mono text-xs text-gray-400 block mb-1">ACTOR B</span>
                  <h4 className="text-lg font-bold text-white mb-2">{adversarial.actorB.name}</h4>
                  <p className="font-mono text-xs text-gray-300 mb-4">{adversarial.actorB.action}</p>
                  <span className="status-chip failed">{adversarial.actorB.status}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-gray-300 flex justify-between items-center">
                <span>CONCURRENCY OUTCOME:</span>
                <span className="text-emerald-400 font-bold">{adversarial.concurrencyOutcome}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB DRIFT */}
        {activeTab === "drift" && (
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <span className="font-mono text-xs text-red-400 font-bold block mb-1">SPEC & CODE DRIFT DETECTED</span>
              <h3 className="font-display text-2xl text-white mb-4">Detected Drift Records ({drifts.length})</h3>

              <div className="space-y-4">
                {drifts.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl bg-[#1a0f12] border border-red-500/30 font-mono text-xs">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-red-400 font-bold">{d.type}</span>
                      <span className="text-gray-500">{d.detectedAt}</span>
                    </div>
                    <h4 className="text-sm font-sans font-bold text-white mb-1">{d.claimTitle}</h4>
                    <p className="text-gray-300 font-sans text-xs mb-2">{d.description}</p>
                    <span className="text-[#48997a]">FILE: {d.file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT TAB FALLBACK */}
        {["requirements", "verification", "coverage"].includes(activeTab) && (
          <div className="glass-panel p-8 text-center py-16">
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="font-display text-2xl text-white capitalize mb-2">
              {activeTab.replace("-", " ")} Workspace
            </h3>
            <p className="text-gray-400 max-w-md mx-auto text-sm font-mono mb-6">
              Active verification data connected to candidate Checkout v0.8.4.
            </p>
            <button
              onClick={() => setActiveTab("overview")}
              className="btn-pill-primary px-6 py-2 text-sm"
            >
              Back to Overview
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
