"use client";

import { useState } from "react";
import { FIXTURE_CLAIMS } from "@/lib/veridian/mockData";

export function SignatureDemoSection() {
  const [activeStep, setActiveStep] = useState<"VIOLATED" | "EVIDENCE" | "REPAIR" | "VERIFIED">("VIOLATED");
  const [repaired, setRepaired] = useState(false);

  function handleApplyRepair() {
    setActiveStep("REPAIR");
    setTimeout(() => {
      setRepaired(true);
      setActiveStep("VERIFIED");
    }, 1200);
  }

  function handleReset() {
    setRepaired(false);
    setActiveStep("VIOLATED");
  }

  return (
    <section className="section-shell" id="signature-demo">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="section-label">SIGNATURE DEMO · PROOF RUN</span>
          <h2 className="section-title">Checkout Release Readiness</h2>
          <p className="section-subtitle">
            Observe how VERIDIAN identifies invariant breaches in browser contracts, captures evidence, synthesizes patches, and re-executes verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="btn-pill-secondary font-mono text-xs"
          >
            Reset Demo
          </button>
        </div>
      </div>

      {/* Interactive Proof Run Console */}
      <div className="glass-panel p-0 overflow-hidden border border-white/10 shadow-2xl">
        {/* Console Header Bar */}
        <div className="bg-[#0e1318] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
            <span className="text-gray-400 font-semibold ml-2">TARGET: Checkout Target / v0.8.4</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">PROOFS:</span>
            <span className="text-emerald-400">2 Verified</span>
            <span className={repaired ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
              {repaired ? "2 Verified" : "2 Violated"}
            </span>
          </div>
        </div>

        {/* 4 Promises Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0b0f12]">
          {FIXTURE_CLAIMS.map((claim, idx) => {
            const isTargetClaim = claim.id === "claim-103";
            const currentStatus = isTargetClaim
              ? repaired
                ? "VERIFIED"
                : "FAILED"
              : claim.id === "claim-104"
              ? repaired
                ? "VERIFIED"
                : "FAILED"
              : "VERIFIED";

            return (
              <div
                key={claim.id}
                className={`p-5 rounded-xl border transition-all ${
                  currentStatus === "VERIFIED"
                    ? "bg-[#12181e]/80 border-emerald-500/30"
                    : "bg-[#1f1414]/90 border-red-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-[#48997a] font-bold">0{idx + 1} · {claim.key}</span>
                  <span
                    className={`status-chip ${
                      currentStatus === "VERIFIED" ? "verified" : "failed"
                    }`}
                  >
                    {currentStatus === "VERIFIED" ? "VERIFIED" : "VIOLATED"}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white mb-2">{claim.title}</h4>
                <p className="text-xs text-gray-400 font-mono mb-3">{claim.acceptanceCriterion}</p>

                <div className="text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5">
                  Invariant: <code className="text-gray-300">{claim.invariant}</code>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Simulation Control Box */}
        <div className="p-6 bg-[#0e141a] border-t border-white/10">
          {!repaired ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  CRITICAL INVARIANT VIOLATED (Claim C3)
                </div>
                <p className="text-sm text-gray-300 max-w-xl">
                  Inventory lock failed under concurrent load. Double allocation observed during parallel browser execution. Forensic Evidence EV-903 captured.
                </p>
              </div>

              <button
                onClick={handleApplyRepair}
                disabled={activeStep === "REPAIR"}
                className="btn-pill-primary px-6 py-2.5 text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-lg shadow-emerald-500/20"
              >
                {activeStep === "REPAIR" ? "Applying Repair Patch..." : "Apply Repair REP-301 & Re-verify ↗"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  ALL CONTRACTS VERIFIED · SHIP GATE READY
                </div>
                <p className="text-sm text-gray-300 max-w-xl">
                  Patch REP-301 applied. Prisma serializable row lock active. Contract re-executed with zero invariant violations.
                </p>
              </div>

              <span className="status-chip verified px-4 py-2 text-xs">
                RELEASE GATE APPROVED
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
