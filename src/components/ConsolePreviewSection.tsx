"use client";

import Link from "next/link";

export function ConsolePreviewSection() {
  return (
    <section className="section-shell" id="evidence">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="section-label">LIVE CONSOLE PREVIEW</span>
          <h2 className="section-title">An observatory for software truth.</h2>
          <p className="section-subtitle">
            Inspect real-time release candidate readiness, forensic contract traces, and automated repair suggestions.
          </p>
        </div>

        <Link href="/console" className="btn-pill-primary">
          Launch Full Console ↗
        </Link>
      </div>

      {/* Interactive Preview Container */}
      <div className="glass-panel p-0 overflow-hidden border border-white/15 shadow-2xl rounded-2xl">
        {/* Mock Top bar */}
        <div className="bg-[#0e1318] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-bold">VERIDIAN CONSOLE</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">Checkout Candidate v0.8.4</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="status-chip blocked">RELEASE BLOCKED</span>
          </div>
        </div>

        <div className="p-8 bg-[#0b0f12] grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-[#12181e] border border-white/10">
              <h4 className="font-display text-2xl text-white mb-2">Release Gate Evaluation</h4>
              <p className="text-sm text-gray-300 mb-4">
                2 critical invariants remained unverified on baseline commit <code className="text-[#48997a]">f83a219</code>.
              </p>
              <div className="space-y-2 font-mono text-xs text-red-300">
                <div className="p-3 rounded bg-red-950/30 border border-red-500/20">
                  ✖ Claim C3: Single buyer final inventory unit failed parallel race execution.
                </div>
                <div className="p-3 rounded bg-red-950/30 border border-red-500/20">
                  ✖ Claim C4: Unauthorized actor guard missing on POST /api/checkout.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#12181e] border border-white/10 text-center">
                <span className="text-gray-400 block mb-1">VERIFIED</span>
                <span className="text-2xl font-bold text-emerald-400">31</span>
              </div>
              <div className="p-4 rounded-xl bg-[#12181e] border border-white/10 text-center">
                <span className="text-gray-400 block mb-1">STALE</span>
                <span className="text-2xl font-bold text-yellow-400">4</span>
              </div>
              <div className="p-4 rounded-xl bg-[#12181e] border border-white/10 text-center">
                <span className="text-gray-400 block mb-1">VIOLATED</span>
                <span className="text-2xl font-bold text-red-400">2</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#12181e] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#48997a] uppercase tracking-wider block mb-2">
                REPAIR PATCH READY
              </span>
              <h4 className="font-display text-xl text-white mb-2">Patch REP-301</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Prisma interactive serializable transaction synthesized for row-level inventory lock.
              </p>
            </div>

            <Link
              href="/console?tab=repairs"
              className="btn-pill-primary w-full text-center justify-center py-2.5 text-xs font-mono"
            >
              Inspect Patch & Apply ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
