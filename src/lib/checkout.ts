export const PRODUCT = { id: "field-notes", name: "Field Notes set", description: "Three archival notebooks paired with a release-assurance specimen.", unitPrice: 49.99 } as const;
export interface OrderCalculation { subtotal: number; discountAmount: number; discountLabel: string | null; tax: number; total: number }
const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
export function calculateOrder(price: number, quantity: number, discountCode = "", demoMode = process.env.NEXT_PUBLIC_DEMO_MODE ?? process.env.DEMO_MODE ?? "clean"): OrderCalculation {
  void demoMode;
  const safeQuantity = Math.min(10, Math.max(1, Math.trunc(quantity)));
  const subtotal = money(price * safeQuantity);
  const validDiscount = discountCode.trim().toUpperCase() === "SAVE20";
  const discountAmount = validDiscount ? money(subtotal * 0.2) : 0;
  const taxableAmount = money(subtotal - discountAmount);
  const tax = money(taxableAmount * 0.08);
  return { subtotal, discountAmount, discountLabel: validDiscount ? "20% off" : null, tax, total: money(taxableAmount + tax) };
}
export function formatCurrency(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value); }
