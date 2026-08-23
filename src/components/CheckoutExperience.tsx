"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { calculateOrder, formatCurrency, PRODUCT } from "@/lib/checkout";

interface StoredOrder { reference: string; createdAt: string; quantity: number; discountCode: string | null; total: number; status: string }

export function CheckoutExperience() {
  const [quantity, setQuantity] = useState(1);
  const [discountInput, setDiscountInput] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const calculation = useMemo(() => calculateOrder(PRODUCT.unitPrice, quantity, discountCode), [quantity, discountCode]);

  function applyDiscount() {
    if (discountInput.trim().toUpperCase() === "SAVE20") { setDiscountCode("SAVE20"); setDiscountMessage("SAVE20 applied - 20% removed from your order."); }
    else { setDiscountCode(""); setDiscountMessage("That code is not valid. Try SAVE20."); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(null);
    try {
      const form = new FormData(event.currentTarget); form.set("quantity", String(quantity)); form.set("discountCode", discountCode);
      const response = await fetch("/api/checkout", { method: "POST", body: form });
      const body = (await response.json()) as { error?: string; order?: StoredOrder };
      if (!response.ok || !body.order) throw new Error(body.error ?? "Checkout could not be completed.");
      setOrder(body.order);
      const existing = JSON.parse(localStorage.getItem("veridian-orders") ?? "[]") as StoredOrder[];
      localStorage.setItem("veridian-orders", JSON.stringify([body.order, ...existing].slice(0, 20)));
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Checkout could not be completed."); }
    finally { setBusy(false); }
  }

  if (order) return <main className="checkout-shell"><section className="confirmation-card" aria-live="polite"><span className="proof-kicker">Order confirmed</span><div className="confirmation-mark" aria-hidden="true">✓</div><h1>Your release workspace is ready.</h1><div className="confirmation-facts"><div><span>Order ID</span><strong>{order.reference}</strong></div><div><span>Total</span><strong>{formatCurrency(order.total)}</strong></div></div><p>Order <strong>{order.reference}</strong> was completed for <strong>{formatCurrency(order.total)}</strong>.</p><div className="confirmation-actions"><Link href="/checkout/orders" className="button primary">View order history</Link><Link href="/workspace" className="button secondary">Open VERIDIAN workspace</Link></div></section></main>;

  return <main className="checkout-shell">
    <header className="checkout-nav"><Link href="/" className="wordmark">VERIDIAN</Link><div className="checkout-nav-links"><Link href="/workspace">Workspace</Link><Link href="/checkout/orders">Orders</Link></div></header>
    <div className="checkout-grid">
      <section className="checkout-editorial"><span className="proof-kicker">Verified commerce specimen / 01</span><h1>A checkout simple enough to see. Subtle enough to fail.</h1><p className="checkout-lede">This is the real product surface Kane verifies. Apply SAVE20, inspect the mathematics, and complete the order without leaving the browser.</p><div className="product-plate"><div className="product-glyph">V</div><div><span>Release assurance</span><h2>{PRODUCT.name}</h2><p>{PRODUCT.description}</p></div><strong>{formatCurrency(PRODUCT.unitPrice)}</strong></div><div className="specimen-note"><span>Requirement</span><p>The discount must reduce the actual final total, not merely appear as a line item.</p></div></section>
      <form className="checkout-card" onSubmit={submit}><div className="checkout-card-heading"><div><span className="proof-kicker">Secure checkout</span><h2>Complete your order</h2></div><span className="secure-label">TLS / LIVE</span></div>
        <label>Full name<input name="name" required autoComplete="name" placeholder="Ada Lovelace" /></label><label>Email address<input name="email" type="email" required autoComplete="email" placeholder="ada@example.com" /></label><label>Billing address<input name="address" required autoComplete="street-address" placeholder="12 Analytical Engine Way" /></label><label>Payment reference<input name="payment" required placeholder="PAY-2048" /></label>
        <div className="quantity-row"><label htmlFor="quantity">Quantity</label><div className="stepper"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button><output id="quantity">{quantity}</output><button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button></div></div>
        <div className="discount-control"><label htmlFor="discount">Discount code</label><div><input id="discount" value={discountInput} onChange={(event) => setDiscountInput(event.target.value)} placeholder="SAVE20" /><button type="button" onClick={applyDiscount}>Apply</button></div>{discountMessage && <p className={discountCode ? "success-text" : "error-text"}>{discountMessage}</p>}</div>
        <div className="order-summary"><div className="summary-product"><span>Product</span><strong>{PRODUCT.name}</strong></div><div><span>Quantity</span><strong>{quantity}</strong></div><div><span>Subtotal</span><strong>{formatCurrency(calculation.subtotal)}</strong></div><div><span>Discount {calculation.discountLabel && `(${calculation.discountLabel})`}</span><strong className="discount-value">-{formatCurrency(calculation.discountAmount)}</strong></div><div><span>Tax (8%)</span><strong>{formatCurrency(calculation.tax)}</strong></div><div className="order-total"><span>Total</span><strong data-testid="order-total">{formatCurrency(calculation.total)}</strong></div></div>
        {error && <p className="form-error" role="alert">{error}</p>}<button className="checkout-submit" disabled={busy} type="submit">{busy ? "Completing order..." : `Pay ${formatCurrency(calculation.total)}`}</button><p className="checkout-fineprint">No payment is processed. This deterministic local specimen exists for browser assurance.</p>
      </form>
    </div>
  </main>;
}
