import { describe, expect, it } from "vitest";
import { reconcileReportedKaneCost, recordPlannedKaneOperation } from "./ledger";

describe("credit ledger", () => {
  it("keeps cost unknown without an exact Kane report", () => {
    const planned = recordPlannedKaneOperation({ operation: "testmd run", reason: "contract replay", expectedValue: "release evidence", balanceBefore: 1200, expectedAfter: 1150 });
    expect(reconcileReportedKaneCost(planned)).toMatchObject({ costStatus: "UNKNOWN" });
  });
});
