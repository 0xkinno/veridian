"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/checkout";
interface StoredOrder { reference: string; createdAt: string; quantity: number; discountCode: string | null; total: number; status: string }
export function OrderHistory() {
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);
  useEffect(() => { setOrders(JSON.parse(localStorage.getItem("veridian-orders") ?? "[]") as StoredOrder[]); }, []);
  return <main className="workspace-page"><header className="workspace-topbar"><Link href="/" className="wordmark">VERIDIAN</Link><nav><Link href="/checkout">Checkout</Link><Link href="/workspace">Workspace</Link></nav></header><section className="workspace-intro"><span className="proof-kicker">Checkout ledger</span><h1>Completed orders.</h1><p>Browser-local order history for the deterministic checkout specimen.</p></section><section className="orders-panel">{orders === null ? <div className="skeleton-row" /> : orders.length === 0 ? <div className="orders-empty"><span>Ledger clear</span><h2>No completed orders in this browser.</h2><p>Complete the checkout once and its reference, total, discount, and status will appear here.</p><Link href="/checkout" className="button primary">Run checkout</Link></div> : orders.map(order => <article className="order-row" key={order.reference}><div><span>{order.reference}</span><strong>{new Date(order.createdAt).toLocaleString()}</strong></div><div><span>Quantity</span><strong>{order.quantity}</strong></div><div><span>Discount</span><strong>{order.discountCode ?? "None"}</strong></div><div><span>Total</span><strong>{formatCurrency(order.total)}</strong></div><span className="status-badge verified">{order.status}</span></article>)}</section></main>;
}
