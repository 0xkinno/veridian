"use client";

import { useState } from "react";
import { FIXTURE_PROMISE_GRAPH } from "@/lib/veridian/mockData";
import { PromiseGraphNode } from "@/lib/veridian/types";

export function PromiseGraphSection() {
  const [selectedNode, setSelectedNode] = useState<PromiseGraphNode>(FIXTURE_PROMISE_GRAPH[4]!);

  return (
    <section className="section-shell" id="promise-graph">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="section-label">ASSURANCE LINEAGE</span>
          <h2 className="section-title">Every promise leaves a trail.</h2>
          <p className="section-subtitle">
            From markdown product requirements to browser execution traces, forensic evidence, and final ship/block decisions.
          </p>
        </div>

        <div className="font-mono text-xs text-[#48997a] border border-[#48997a]/30 bg-[#48997a]/10 px-4 py-2 rounded-full self-start md:self-auto">
          12 STAGES CONNECTED
        </div>
      </div>

      {/* Atmospheric Lineage Path Visualizer */}
      <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-b from-[#12181e]/90 to-[#0b0f12]/95 border border-white/10 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#48997a]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Connected Line SVG */}
        <div className="hidden lg:block absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#48997a]/60 via-[#d99b26]/40 to-[#e65245]/60 z-0"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 relative z-10">
          {FIXTURE_PROMISE_GRAPH.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const isFailed = node.status === "FAILED";
            const isStale = node.status === "STALE";

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`node-card text-left transition-all ${
                  isFailed
                    ? "node-failed"
                    : isStale
                    ? "node-stale"
                    : "node-verified"
                } ${isSelected ? "ring-2 ring-[#48997a] bg-[#1a232c]" : ""}`}
              >
                <div className="node-stage">
                  <span>{node.stage}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isFailed
                        ? "bg-red-500/20 text-red-400"
                        : isStale
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {node.status}
                  </span>
                </div>
                <div className="node-title font-sans">{node.label}</div>
                <div className="node-subtext font-mono">{node.subtext}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Drawer Card */}
      {selectedNode && (
        <div className="glass-panel p-8 border-l-4 border-l-[#48997a]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <span className="font-mono text-xs text-[#48997a] tracking-wider uppercase">
                STAGE {selectedNode.stage} DETAIL
              </span>
              <h3 className="text-2xl font-display font-semibold text-white mt-1">
                {selectedNode.label}
              </h3>
            </div>
            <span
              className={`status-chip ${
                selectedNode.status === "FAILED"
                  ? "blocked"
                  : selectedNode.status === "STALE"
                  ? "stale"
                  : "verified"
              }`}
            >
              {selectedNode.status}
            </span>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-6">
            {selectedNode.details}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-gray-500 block mb-1">PROVENANCE ORIGIN</span>
              <span className="text-gray-200">Git commit main@f83a219</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">VERIFICATION ENGINE</span>
              <span className="text-gray-200">Kane Playwright Runner</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">CONTRACT INTEGRITY</span>
              <span className="text-[#36b37e]">SHA-256 Verified</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
