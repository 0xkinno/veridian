import { describe, expect, it } from "vitest";
import { calculateOrder } from "./checkout";
describe("calculateOrder", () => {
  it("calculates a clean order", () => expect(calculateOrder(49.99, 1, "", "clean")).toEqual({ subtotal: 49.99, discountAmount: 0, discountLabel: null, tax: 4, total: 53.99 }));
  it("applies SAVE20 to the taxable total", () => expect(calculateOrder(49.99, 1, "SAVE20", "clean")).toEqual({ subtotal: 49.99, discountAmount: 10, discountLabel: "20% off", tax: 3.2, total: 43.19 }));
  it("normalizes the code", () => expect(calculateOrder(50, 2, " save20 ", "clean").total).toBe(86.4));
  it("bounds quantity", () => { expect(calculateOrder(10, 99, "", "clean").subtotal).toBe(100); expect(calculateOrder(10, 0, "", "clean").subtotal).toBe(10); });
  it("keeps the repaired discounted total", () => { const result = calculateOrder(49.99, 1, "SAVE20", "bug"); expect(result.discountAmount).toBe(10); expect(result.total).toBe(43.19); });
});
