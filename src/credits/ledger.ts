import type { CreditCostStatus } from "../domain/enums";

export interface CreditLedgerDraft {
  operation: string;
  reason: string;
  expectedValue: string;
  balanceBefore: number;
  expectedAfter: number;
  projectId?: string;
  runId?: string;
}

export interface CreditLedgerEntry extends CreditLedgerDraft {
  createdAt: Date;
  costStatus: CreditCostStatus;
  actualCost?: number;
  balanceAfter?: number;
}

export function recordPlannedKaneOperation(draft: CreditLedgerDraft): CreditLedgerEntry {
  if (draft.expectedAfter > draft.balanceBefore) throw new Error("Expected balance cannot exceed the recorded starting balance.");
  return { ...draft, createdAt: new Date(), costStatus: "UNKNOWN" };
}

export function reconcileReportedKaneCost(entry: CreditLedgerEntry, actualCost?: number, balanceAfter?: number): CreditLedgerEntry {
  if (actualCost === undefined || balanceAfter === undefined) return { ...entry, costStatus: "UNKNOWN" };
  return { ...entry, actualCost, balanceAfter, costStatus: "REPORTED" };
}
