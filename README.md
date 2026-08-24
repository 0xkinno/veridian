# VERIDIAN

**VERIDIAN lets product teams prove their AI-built software still keeps every promise in its requirements, without trusting an agent’s completion message.**

Live demo: local build · Lane 4: Requirements that test themselves

## The Problem

A product manager writes that a discount must reduce the final checkout total. A coding agent makes the discount line appear, but the actual total remains unchanged. The interface looks plausible, the agent reports success, and the broken promise ships.

## The Solution

VERIDIAN ingests the requirement, uses Kane CLI to extract source-cited use cases and design persistent browser contracts, then presents the lineage as a Promise Graph. Real Kane evidence—not narration—decides whether a claim is proven, failed, or still owed.

## How It Works

1. A product requirement enters VERIDIAN.
2. Kane extracts testable use cases with citations.
3. Kane designs acceptance criteria and persistent browser contracts.
4. The contracts run against the real checkout in Chrome.
5. Failures become bounded repair evidence; the test contract remains unchanged.
6. The Promise Graph and proof page update from repository artifacts.

## Built With

Next.js 15, React 19, TypeScript, Prisma, Vitest, and Kane CLI 0.8.5.

## Kane CLI Integration

`context ingest` snapshots the source, `context extract` derives the use case, `design tests` creates criteria and contracts, `testmd run --agent --headless` runs the real browser, and `cover` reports requirement-level proof. Removing Kane removes VERIDIAN’s verification layer.

## Target User

VERIDIAN is for a product engineering lead reviewing AI-authored changes before release. Today they compare a requirement, an agent summary, and scattered test output manually. With VERIDIAN they see the complete claim-to-evidence chain and know exactly what is proven, failed, or still owed.

## Local Setup

```bash
npm install
npm run build
npm run start
```

Open `http://127.0.0.1:3000`. Run checks with `npm run typecheck`, `npm test`, and `npm run lint`. Kane browser verification requires an authenticated Kane CLI session.

## Judge Verification

Start the local app, then use these judge-facing views:

- Promise Graph: [http://127.0.0.1:3000/workspace](http://127.0.0.1:3000/workspace)
- Proof record: [http://127.0.0.1:3000/proof](http://127.0.0.1:3000/proof)
- Checkout target: [http://127.0.0.1:3000/checkout](http://127.0.0.1:3000/checkout)

The focused contract `.testmuai/tests/discount-total-value_test.md` reads the rendered Discount and Total values. Its unchanged SHA-256 is `D4F4BDC89A6B30E648EF2731A7C9C2D09686366BD56F5453582D1A10A3A27D53`.

The recorded proof cycle is:

1. Clean baseline: SAVE20 produced a `$20.00` discount and `$86.38` final total.
2. Bug replay: Kane caught the real application defect when the total remained `$107.98` (`application_issue/ui_data_defect`).
3. Repair replay: the one-line calculation repair restored the numeric assertion to `$86.38`.

The Promise Graph shows `FAILED -> REPAIRED -> VERIFIED`. Full NDJSON runs, coverage output, balances, evidence IDs, and the final handoff are stored in `.veridian/runs/`, `.veridian/last-cycle.json`, `doc/EVIDENCE.md`, and `doc/PHASE2_KANE_LEDGER.md`.

Coverage currently reports `8/8` designed and `8/8` proven. Typechecking and lint pass; browser route checks for `/`, `/checkout`, `/checkout/orders`, `/workspace`, `/workspace/1`, and `/proof` return HTTP 200.
