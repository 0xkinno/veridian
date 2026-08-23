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
