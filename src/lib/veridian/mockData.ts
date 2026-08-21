// INTERNAL_FIXTURE_ADAPTER: Default fixture data for VERIDIAN demo mode
// Codex will replace this adapter with live Kane runner & database hooks.

import {
  ClaimItem,
  PromiseGraphNode,
  EvidenceRecord,
  DriftRecord,
  RepairPatch,
  CoverageMetrics,
  ReleaseGateStatus,
  AdversarialVerificationState,
} from "./types";

export const FIXTURE_CLAIMS: ClaimItem[] = [
  {
    id: "claim-101",
    key: "C1",
    title: "Checkout total equals displayed total",
    sourceFile: "doc/checkout-requirement.md",
    lineRange: "L12-L18",
    useCase: "UC-1 / Complete Checkout",
    acceptanceCriterion: "Final charged price strictly matches item list total plus calculated tax",
    invariant: "AMOUNT_CHARGED === SUM(ITEM_PRICES) + TAX",
    kaneTest: "kane/checkout_total_match.spec.ts",
    status: "VERIFIED",
    origin: "REAL",
    lastRunId: "run-901",
    evidenceId: "ev-901",
  },
  {
    id: "claim-102",
    key: "C2",
    title: "Successful checkout survives reload",
    sourceFile: "doc/checkout-requirement.md",
    lineRange: "L22-L29",
    useCase: "UC-1 / Complete Checkout",
    acceptanceCriterion: "Order confirmation state persists upon browser refresh without double-charging",
    invariant: "RELOAD(ORDER_PAGE) -> DISPLAY_SAME_ORDER_REF",
    kaneTest: "kane/checkout_reload_persistence.spec.ts",
    status: "VERIFIED",
    origin: "REAL",
    lastRunId: "run-902",
    evidenceId: "ev-902",
  },
  {
    id: "claim-103",
    key: "C3",
    title: "Only one buyer can consume the final inventory unit",
    sourceFile: "doc/checkout-requirement.md",
    lineRange: "L34-L45",
    useCase: "UC-2 / Inventory Lock Under Contention",
    acceptanceCriterion: "Concurrent checkouts for last unit yield exactly 1 success and N-1 inventory errors",
    invariant: "COUNT(SUCCESSFUL_CHECKOUTS) <= INITIAL_STOCK",
    kaneTest: "kane/checkout_race_condition.spec.ts",
    status: "FAILED",
    origin: "REAL",
    lastRunId: "run-903",
    evidenceId: "ev-903",
    repairId: "rep-301",
    driftDetected: true,
  },
  {
    id: "claim-104",
    key: "C4",
    title: "Unauthorized actor cannot complete checkout",
    sourceFile: "doc/checkout-requirement.md",
    lineRange: "L50-L58",
    useCase: "UC-3 / Security & Boundary Protection",
    acceptanceCriterion: "Missing auth tokens or invalid headers return HTTP 401/403 with zero db mutation",
    invariant: "MUTATION_COUNT(UNAUTH_REQUEST) === 0",
    kaneTest: "kane/checkout_unauth_guard.spec.ts",
    status: "FAILED",
    origin: "REAL",
    lastRunId: "run-904",
    evidenceId: "ev-904",
    repairId: "rep-302",
    driftDetected: true,
  },
];

export const FIXTURE_PROMISE_GRAPH: PromiseGraphNode[] = [
  {
    id: "pg-1",
    stage: "SOURCE",
    label: "Requirements Baseline",
    subtext: "doc/checkout-requirement.md",
    status: "VERIFIED",
    details: "4 formal claims declared in versioned markdown specification.",
  },
  {
    id: "pg-2",
    stage: "CLAIM",
    label: "Extracted Promises",
    subtext: "4 Formal Claims Registered",
    status: "VERIFIED",
    details: "Claims mapped to checkout invariants and boundary conditions.",
  },
  {
    id: "pg-3",
    stage: "USE_CASE",
    label: "Target Use Cases",
    subtext: "UC-1, UC-2, UC-3",
    status: "VERIFIED",
    details: "Complete checkout flow, race contention, and authorization guards.",
  },
  {
    id: "pg-4",
    stage: "CRITERION",
    label: "Acceptance Criteria",
    subtext: "Deterministic assertions",
    status: "VERIFIED",
    details: "Executable invariants derived for total calculation, stock lock, and auth.",
  },
  {
    id: "pg-5",
    stage: "INVARIANT",
    label: "Formal Invariants",
    subtext: "4 Non-negotiable Rules",
    status: "FAILED",
    details: "Inventory lock invariant violated during multi-actor race test.",
  },
  {
    id: "pg-6",
    stage: "KANE_TEST",
    label: "Kane Browser Contracts",
    subtext: "Playwright / Chromium Engine",
    status: "FAILED",
    details: "2 tests failed due to race condition and missing auth header check.",
  },
  {
    id: "pg-7",
    stage: "EXECUTION",
    label: "Real Execution Traces",
    subtext: "Headless Chromium Runner",
    status: "FAILED",
    details: "Execution captured 2 unhandled concurrency exceptions.",
  },
  {
    id: "pg-8",
    stage: "EVIDENCE",
    label: "Forensic Evidence Ledger",
    subtext: "Immutable Execution Hash",
    status: "FAILED",
    details: "Evidence EV-903 records race condition breach at step 4.",
  },
  {
    id: "pg-9",
    stage: "COVERAGE",
    label: "Invariant Coverage",
    subtext: "87.5% Requirement Coverage",
    status: "STALE",
    details: "2 invariants lack verified proof on current commit hash.",
  },
  {
    id: "pg-10",
    stage: "DRIFT",
    label: "Drift Analyzer",
    subtext: "2 Spec Mutations Detected",
    status: "FAILED",
    details: "Unverified code change in api/checkout route bypasses stock lock.",
  },
  {
    id: "pg-11",
    stage: "REPAIR",
    label: "Autonomous Repair Engine",
    subtext: "2 Patches Generated",
    status: "PENDING",
    details: "Prisma transaction repair patch ready for application.",
  },
  {
    id: "pg-12",
    stage: "RELEASE_DECISION",
    label: "Release Gate",
    subtext: "RELEASE BLOCKED",
    status: "FAILED",
    details: "Gate blocked candidate v0.8.4 from shipping to production.",
  },
];

export const FIXTURE_EVIDENCE_RECORDS: Record<string, EvidenceRecord> = {
  "ev-903": {
    evidenceId: "EV-903",
    runId: "RUN-903",
    claimId: "claim-103",
    contractHash: "0x8f7a2d1e4c9b3a7f",
    sourceHash: "0xc4b2a19d8e7f6a5b",
    repositoryBaseline: "git:main@f83a219",
    timestamp: "2026-08-21T17:28:42.109Z",
    browser: "Chromium 124.0.6367 (Headless)",
    actors: ["Actor A (buyer_101)", "Actor B (buyer_102)"],
    verdict: "FAILED",
    timeline: [
      {
        stage: "01 Requirement",
        title: "Claim C3 Loaded",
        timestamp: "+0ms",
        detail: "Invariant: COUNT(SUCCESSFUL_CHECKOUTS) <= INITIAL_STOCK",
        status: "OK",
      },
      {
        stage: "02 Test Contract",
        title: "Kane Concurrency Harness Spawned",
        timestamp: "+14ms",
        detail: "Initializing 2 parallel browser contexts targeting /checkout",
        status: "OK",
      },
      {
        stage: "03 Execution",
        title: "Synchronized HTTP POST /api/checkout",
        timestamp: "+182ms",
        detail: "Actor A and Actor B issue POST at delta t = 1.2ms",
        status: "OK",
      },
      {
        stage: "04 Observation",
        title: "Double Allocation Detected",
        timestamp: "+294ms",
        detail: "Both requests returned HTTP 200 with valid order references",
        status: "FAIL",
      },
      {
        stage: "05 Failure",
        title: "Invariant Breach Recorded",
        timestamp: "+310ms",
        detail: "Final inventory dropped to -1. Expected stock >= 0.",
        status: "FAIL",
      },
      {
        stage: "06 Repair",
        title: "Patch REP-301 Synthesized",
        timestamp: "+420ms",
        detail: "Prisma transaction isolation level upgraded to Serializable",
        status: "WARN",
      },
      {
        stage: "07 Verdict",
        title: "Release Gate Notification",
        timestamp: "+450ms",
        detail: "Candidate v0.8.4 marked RELEASE BLOCKED",
        status: "FAIL",
      },
    ],
    failureTrace: {
      expected: "Actor A -> HTTP 200, Actor B -> HTTP 409 (Out of stock)",
      observed: "Actor A -> HTTP 200 (ORD-881), Actor B -> HTTP 200 (ORD-882)",
      stackTrace:
        "InvariantViolationError: AT MOST ONE ACTOR MAY CLAIM THE FINAL UNIT\n  at checkInventoryInvariant (src/domain/adversarial.ts:42)\n  at KaneRunner.observeOutcome (src/kane/adapter.ts:88)\n  at processTicksAndRejections (node:internal/process/task_queues:95:5)",
    },
  },
  "ev-904": {
    evidenceId: "EV-904",
    runId: "RUN-904",
    claimId: "claim-104",
    contractHash: "0x1a2b3c4d5e6f7a8b",
    sourceHash: "0x9f8e7d6c5b4a3f2e",
    repositoryBaseline: "git:main@f83a219",
    timestamp: "2026-08-21T17:28:44.821Z",
    browser: "Chromium 124.0.6367 (Headless)",
    actors: ["Actor C (unauthenticated_client)"],
    verdict: "FAILED",
    timeline: [
      {
        stage: "01 Requirement",
        title: "Claim C4 Loaded",
        timestamp: "+0ms",
        detail: "Invariant: MUTATION_COUNT(UNAUTH_REQUEST) === 0",
        status: "OK",
      },
      {
        stage: "02 Test Contract",
        title: "Security Boundary Suite",
        timestamp: "+10ms",
        detail: "Targeting POST /api/checkout without Authorization header",
        status: "OK",
      },
      {
        stage: "03 Observation",
        title: "Unprotected Route Mutation",
        timestamp: "+145ms",
        detail: "Server accepted request and mutated order ledger without token",
        status: "FAIL",
      },
      {
        stage: "04 Failure",
        title: "Authorization Guard Missing",
        timestamp: "+160ms",
        detail: "Expected HTTP 401 Unauthenticated, received HTTP 200 OK",
        status: "FAIL",
      },
      {
        stage: "05 Verdict",
        title: "Evidence Ledger Written",
        timestamp: "+190ms",
        detail: "Claim C4 status marked FAILED",
        status: "FAIL",
      },
    ],
    failureTrace: {
      expected: "HTTP 401 / 403 Response",
      observed: "HTTP 200 OK with order creation",
      stackTrace:
        "BoundaryViolationError: MUTATION_COUNT(UNAUTH_REQUEST) === 0\n  at verifyAuthGuard (src/domain/release-gate.ts:61)\n  at KaneRunner.evaluateClaim (src/kane/adapter.ts:112)",
    },
  },
};

export const FIXTURE_REPAIRS: RepairPatch[] = [
  {
    repairId: "rep-301",
    claimId: "claim-103",
    claimTitle: "Only one buyer can consume the final inventory unit",
    suggestedPatch: "Wrap checkout inventory deduction in Prisma interactive transaction with row lock",
    diff: `--- a/src/app/api/checkout/route.ts
+++ b/src/app/api/checkout/route.ts
@@ -14,7 +14,9 @@ export async function POST(req: Request) {
-  const product = await prisma.product.findUnique({ where: { id } });
-  await prisma.product.update({ where: { id }, data: { stock: product.stock - 1 } });
+  await prisma.$transaction(async (tx) => {
+    const product = await tx.product.findUnique({ where: { id }, select: { stock: true } });
+    if (!product || product.stock < 1) throw new Error("OUT_OF_STOCK");
+    await tx.product.update({ where: { id }, data: { stock: product.stock - 1 } });
+  }, { isolationLevel: "Serializable" });`,
    targetFile: "src/app/api/checkout/route.ts",
    status: "GENERATED",
    createdTimestamp: "2026-08-21T17:29:01.000Z",
  },
  {
    repairId: "rep-302",
    claimId: "claim-104",
    claimTitle: "Unauthorized actor cannot complete checkout",
    suggestedPatch: "Inject auth session validation check before processing payload",
    diff: `--- a/src/app/api/checkout/route.ts
+++ b/src/app/api/checkout/route.ts
@@ -4,3 +4,6 @@ export async function POST(req: Request) {
+  const session = await getAuthSession(req);
+  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
+`,
    targetFile: "src/app/api/checkout/route.ts",
    status: "GENERATED",
    createdTimestamp: "2026-08-21T17:29:05.000Z",
  },
];

export const FIXTURE_DRIFTS: DriftRecord[] = [
  {
    id: "drift-01",
    claimId: "claim-103",
    claimTitle: "Only one buyer can consume the final inventory unit",
    type: "UNVERIFIED_CODE_CHANGE",
    file: "src/app/api/checkout/route.ts",
    detectedAt: "2026-08-21T17:24:00.000Z",
    severity: "CRITICAL",
    description: "Modified stock deduction query without running Kane race condition test suite.",
  },
  {
    id: "drift-02",
    claimId: "claim-104",
    claimTitle: "Unauthorized actor cannot complete checkout",
    type: "INVARIANT_WEAKENING",
    file: "src/domain/release-gate.ts",
    detectedAt: "2026-08-21T17:26:12.000Z",
    severity: "HIGH",
    description: "Bypassed token verification logic in developmental build environment.",
  },
];

export const FIXTURE_COVERAGE: CoverageMetrics = {
  totalClaims: 37,
  verifiedClaims: 31,
  staleClaims: 4,
  violatedClaims: 2,
  pendingClaims: 0,
  invariantCoveragePct: 83.7,
  branchCoveragePct: 91.2,
  evidenceIntegrityScore: 99.4,
};

export const FIXTURE_RELEASE_GATE: ReleaseGateStatus = {
  decision: "BLOCKED",
  candidateVersion: "Checkout / v0.8.4",
  targetApp: "Veridian E-Commerce Core Target",
  blockingReasons: [
    "Claim C3 (Inventory lock under contention) invariant violated during race execution.",
    "Claim C4 (Unauthorized actor protection) failed security boundary check.",
  ],
  summary: {
    verifiedCount: 31,
    staleCount: 4,
    violatedCount: 2,
    coveragePct: 83.7,
    driftCount: 2,
    openRepairsCount: 2,
  },
  lastCheckedTimestamp: "2026-08-21T17:30:00.000Z",
};

export const FIXTURE_ADVERSARIAL_VERIFICATION: AdversarialVerificationState = {
  id: "adv-881",
  title: "FINAL INVENTORY RACE CONDITION",
  sharedResource: "Product stock counter (INITIAL_STOCK = 1)",
  actorA: {
    name: "Actor A (Buyer 1)",
    action: "POST /api/checkout (qty: 1)",
    status: "SUCCESS",
  },
  actorB: {
    name: "Actor B (Buyer 2)",
    action: "POST /api/checkout (qty: 1)",
    status: "REJECTED",
  },
  invariantDescription: "AT MOST ONE ACTOR MAY CLAIM THE FINAL UNIT",
  concurrencyOutcome: "SYNCHRONIZED_RACE_PREVENTED",
  verifiedAt: "2026-08-21T17:31:00.000Z",
};
