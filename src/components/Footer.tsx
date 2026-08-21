"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070a0d] py-16 px-6 md:px-12 text-[#f0f4f2]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
        {/* Top: Logo ([small V icon] VERIDIAN) + Tagline */}
        <div className="space-y-3 max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#48997a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5l8 14L20 5" />
              <path d="M8 5l4 7 4-7" />
            </svg>
            <span className="font-display text-2xl font-bold tracking-widest text-white">
              VERIDIAN
            </span>
          </Link>
          <p className="text-sm text-gray-400 font-sans leading-relaxed">
            Release-assurance system that turns software promises into executable proof.
          </p>
        </div>

        {/* Links: DOCS ↗, GITHUB ↗ (https://github.com/0xkinno/veridian), CONSOLE ↗ (/console) */}
        <div className="flex flex-wrap items-center gap-8 font-mono text-xs tracking-wider">
          <a
            href="#product"
            className="text-gray-300 hover:text-[#48997a] transition-colors flex items-center gap-1.5"
          >
            DOCS <span className="text-[#48997a]">↗</span>
          </a>
          <a
            href="https://github.com/0xkinno/veridian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#48997a] transition-colors flex items-center gap-1.5"
          >
            GITHUB <span className="text-[#48997a]">↗</span>
          </a>
          <Link
            href="/console"
            className="text-[#48997a] font-semibold hover:underline flex items-center gap-1.5"
          >
            CONSOLE <span className="text-[#48997a]">↗</span>
          </Link>
        </div>
      </div>

      {/* Bottom: © 2026 VERIDIAN Assurance Technologies · Built on Kane Engine v0.8.4 | Kane Engine Operational · Latency: 1.2ms */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-500">
        <div>© 2026 VERIDIAN Assurance Technologies · Built on Kane Engine v0.8.4</div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Kane Engine Operational
          </span>
          <span className="text-gray-700">·</span>
          <span>Latency: 1.2ms</span>
        </div>
      </div>
    </footer>
  );
}
