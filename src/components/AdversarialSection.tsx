"use client";

import Link from "next/link";
import { FIXTURE_ADVERSARIAL_VERIFICATION } from "@/lib/veridian/mockData";

export function AdversarialSection() {
  const adv = FIXTURE_ADVERSARIAL_VERIFICATION;

  return (
    <section className="section-shell" id="release-gate">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="section-label">ADVERSARIAL CONCURRENCY VERIFICATION</span>
          <h2 className="section-title">Multi-Actor State Proofs</h2>
          <p className="section-subtitle">
            Simultaneously orchestrate independent browser actors to stress shared application invariants under severe race conditions.
          </p>
        </div>

        <Link href="/console?tab=adversarial" className="btn-pill-secondary font-mono text-xs">
          Open Multi-Actor Studio ↗
        </Link>
      </div>

      <div className="glass-panel p-8 relative overflow-hidden border border-white/15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#48997a]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-mono text-xs text-gray-400 pb-4 border-b border-white/10">
          <div>
            <span>TARGET RESOURCE: </span>
            <span className="text-white font-bold">{adv.sharedResource}</span>
          </div>

          <span className="status-chip verified">
            {adv.concurrencyOutcome}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Actor A Card */}
          <div className="p-6 rounded-2xl bg-[#12181e] border border-emerald-500/30 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-emerald-400 font-bold">BROWSER CONTEXT 01</span>
              <span className="status-chip verified">{adv.actorA.status}</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{adv.actorA.name}</h4>
            <p className="font-mono text-xs text-gray-300 bg-black/40 p-3 rounded-lg border border-white/5">
              {adv.actorA.action}
            </p>
          </div>

          {/* Actor B Card */}
          <div className="p-6 rounded-2xl bg-[#1a0f12] border border-red-500/30 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-red-400 font-bold">BROWSER CONTEXT 02</span>
              <span className="status-chip failed">{adv.actorB.status}</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{adv.actorB.name}</h4>
            <p className="font-mono text-xs text-gray-300 bg-black/40 p-3 rounded-lg border border-white/5">
              {adv.actorB.action}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs flex flex-wrap justify-between items-center gap-4">
          <span className="text-gray-400">INVARIANT ASSERTION:</span>
          <code className="text-emerald-400 font-bold">{adv.invariantDescription}</code>
        </div>
      </div>
    </section>
  );
}
