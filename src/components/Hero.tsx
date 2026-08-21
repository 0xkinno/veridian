"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-section relative bg-[#0b0f12] overflow-hidden" id="product">
      {/* Subtle ambient glow — no background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#48997a]/5 rounded-full blur-[160px]" />
      </div>

      <div className="hero-content relative z-10">
        <div className="hero-eyebrow">
          <span className="w-2 h-2 rounded-full bg-[#48997a] animate-pulse"></span>
          Release-Assurance System · Kane Engine v0.8.4
        </div>

        <h1 className="hero-headline font-display">
          Know what your software <em>promised.</em>
          <br />
          Prove what it <em>actually does.</em>
        </h1>

        <p className="hero-lede">
          VERIDIAN turns product requirements into executable proof — connecting claims,
          browser verification, evidence, drift, and release decisions in one continuous chain.
        </p>

        <div className="hero-cta-group">
          <Link href="/console" className="btn-pill-primary px-8 py-3 text-base">
            Open VERIDIAN <span aria-hidden="true">↗</span>
          </Link>

          <a href="#signature-demo" className="btn-pill-secondary px-6 py-3 text-base">
            See the proof
          </a>
        </div>

        {/* Live System Indicator Badge */}
        <div className="mt-12 inline-flex items-center gap-6 px-6 py-3 rounded-full bg-black/60 border border-white/10 backdrop-blur-md font-mono text-xs text-gray-300 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">TARGET:</span>
            <span className="text-white font-semibold">Checkout v0.8.4</span>
          </div>
          <div className="h-3 w-[1px] bg-white/20"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">STATUS:</span>
            <span className="text-[#e65245] font-semibold">RELEASE BLOCKED</span>
          </div>
          <div className="h-3 w-[1px] bg-white/20"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">PROOFS:</span>
            <span className="text-[#36b37e]">31 Passed</span>
            <span className="text-[#e65245]">2 Violated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
