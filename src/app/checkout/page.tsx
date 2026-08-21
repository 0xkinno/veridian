"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Order = { reference: string };

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const body = (await response.json()) as { error?: string; order?: Order };
    if (!response.ok || !body.order) {
      setError(body.error ?? "Checkout could not be completed.");
    } else {
      setOrder(body.order);
    }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#0b0f12] text-white p-6 md:p-16">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#48997a] hover:underline mb-8"
        >
          ← Return to VERIDIAN Assurance
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <section className="space-y-6">
            <span className="font-mono text-xs text-[#48997a] uppercase tracking-widest block">
              CHECKOUT TARGET · REAL APP SURFACE
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-normal text-white">
              Reserve the Field Notes set.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              A deliberately small release target for source-backed browser assurance.
            </p>

            <div className="p-6 rounded-2xl bg-[#12181e] border border-white/10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#48997a]/20 text-[#48997a] border border-[#48997a]/30 font-bold font-mono text-xl flex items-center justify-center">
                FN
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Field Notes set</h3>
                <p className="text-sm text-gray-400">Three archival notebooks · $48.00</p>
              </div>
            </div>
          </section>

          <form
            className="p-8 rounded-2xl bg-[#12181e] border border-white/15 shadow-2xl space-y-4"
            onSubmit={submit}
          >
            <h2 className="font-display text-2xl text-white mb-4">Complete checkout</h2>

            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase mb-1">Full name</label>
              <input
                name="name"
                required
                placeholder="Ada Lovelace"
                className="w-full bg-[#0b0f12] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#48997a] outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="ada@example.com"
                className="w-full bg-[#0b0f12] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#48997a] outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase mb-1">Shipping address</label>
              <input
                name="address"
                required
                placeholder="12 Analytical Engine Way"
                className="w-full bg-[#0b0f12] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#48997a] outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase mb-1">Payment reference</label>
              <input
                name="payment"
                required
                placeholder="PAY-2048"
                className="w-full bg-[#0b0f12] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#48997a] outline-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300" role="alert">
                {error}
              </div>
            )}

            {order ? (
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2" role="status">
                <span className="font-mono text-xs text-emerald-400 font-bold block uppercase tracking-wider">
                  ORDER CONFIRMED
                </span>
                <b className="font-mono text-3xl text-white block">{order.reference}</b>
                <p className="text-xs text-gray-400 font-mono">
                  Your release target produced a traceable order reference.
                </p>
              </div>
            ) : (
              <button
                className="btn-pill-primary w-full justify-center py-3 text-sm mt-4"
                disabled={busy}
                type="submit"
              >
                {busy ? "Processing…" : "Place order"} <span aria-hidden="true">↗</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
