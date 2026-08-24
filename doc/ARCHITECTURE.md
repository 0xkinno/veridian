# VERIDIAN Architecture (Phase 0 Proposal)

## Boundaries

The web application is a read/write presentation and orchestration surface. Kane CLI remains the external assurance primitive. Kane's `.context/` store remains Kane-owned and append-only; VERIDIAN reads it through CLI commands or a controlled adapter and never hand-edits it.

## Proposed Components

1. **Presentation:** Next.js App Router, strict TypeScript, editorial enterprise verification UI.
2. **Domain layer:** typed entities for projects, sources, claims, use cases, criteria, scenarios, contracts, runs, evidence, coverage, drift, repairs, Git snapshots, agent tasks, and release decisions.
3. **Kane adapter:** argument-array process runner for `context`, `design`, `testmd`, `testrun`, `cover`, `maintain`, and `evidence`; parses terminal events and preserves raw artifacts outside the database.
4. **Orchestrator:** single-writer command queue, credit ledger, contract-hash gate, failure classifier, repair-packet builder, and re-verification state machine.
5. **Persistence:** PostgreSQL/Prisma only when Phase 1 confirms deployment needs; local filesystem artifacts remain references, not blobs in the database.
6. **Git boundary:** baseline/result SHA, changed-file manifest, diff hash, and repair scope.

## Invariants And Adversarial Verification

- **IMPLEMENTED foundation:** `Invariant` is a first-class, source-linked Promise Graph entity with explicit kinds for single-user, multi-actor, shared-state, persistence, authorization, financial totals, inventory, idempotency, uniqueness, and state transitions.
- **IMPLEMENTED foundation:** `AdversarialScenario`, `Actor`, and `SynchronizationPoint` describe independent sessions and ordered synchronization barriers without assuming checkout or any other product domain.
- **PLANNED execution:** a later runner will map actors to independent Kane browser sessions and coordinate barriers through an application-owned synchronization service. Phase 1/2 does not claim this engine exists.
- **Security boundary:** actor authorization contexts are metadata references, never raw credentials. Runtime tokens and secrets remain outside the graph.

## Release Gate

`ReleaseCandidate` freezes source, repository baseline, and contract-set hashes. `ReleaseGate` evaluates required claims, critical invariants, designed/proven coverage, freshness, failed runs, unresolved repairs, evidence integrity, contract mutation, and repository movement. Its output is `SHIP` or `BLOCK` with a machine-readable reason graph. The pure evaluator is implemented and tested; database-backed orchestration remains planned.

## State Machine

`DRAFT -> DESIGNED -> READY -> VERIFYING -> VERIFIED | REPAIR_PENDING | VERIFIER_ERROR -> REPAIRING -> REVERIFYING -> VERIFIED | REJECTED`.

## Data Flow

`Source -> Kane context -> reviewed use case -> Kane design -> authored _test.md -> Kane evidence pack -> normalized run -> coverage/drift -> release decision`.

## Verified Integration Surface

Installed CLI 0.8.5 exposes `context ingest/extract/review/list`, `design tests/explain`, `testmd run`, `testrun run`, `cover/gaps`, `maintain reconcile/evolve`, and `evidence validate/serve/merge`. Official docs confirm source citations, review checkpoints, requirement-linked criteria, cached `_test.md` replay, sealed evidence packs, two-axis coverage, and reconcile flows. Paid assurance operations are extraction, design, and reconcile; local inspection/coverage/review/explain/validation are free.

| Claim | Classification | Verification source |
|---|---|---|
| Sources land in `.context/`; extraction proposes cited use cases | Verified Kane capability | Installed `context` help; official `assurance/context.md` |
| Agent proposals require review before trust | Verified Kane capability | Official `assurance/overview.md` and `assurance/automation.md` |
| Design yields criteria, scenarios, and one test per scenario | Verified Kane capability | Installed `design tests --help`; official `assurance/design.md` |
| `_test.md` authoring is persisted and later steps replay | Verified Kane capability | Installed `testmd run --help`; official `testmd/running.md` |
| Batch runs require authored tests and seal one evidence pack | Verified Kane capability | Installed `testrun run --help`; official `testrun.md` |
| Coverage separates designed and proven axes | Verified Kane capability | Installed `cover gaps --help`; official `assurance/coverage.md` |
| Reconcile triages changed sources and preserves review judgement | Verified Kane capability | Installed `maintain reconcile --help`; official `assurance/maintain.md` |
| Claim nodes and release decisions are native Kane entities | Assumption rejected | They are proposed VERIDIAN entities, not documented Kane entities |
| Kane will reliably verify the future checkout demo | Assumption requiring validation | Must be proven with the real app and evidence pack in Phase 2/4 |

## Source Precedence

For Kane facts: installed 0.8.5 help first, then official repository documentation at commit `78f38901d945add68288c7b23e6284418ba934bb`, then observed runtime output. Competitor documentation never establishes a Kane capability.

## Validation Required Before Implementation Claims

We must validate exact NDJSON schemas against a real local source and app, project/folder behavior, evidence pack paths, and whether current 0.8.5 output field names match all reference examples. No paid command is authorized in Phase 0.
# Recovery architecture — current

VERIDIAN is a narrow checkout assurance product. The App Router exposes landing, workspace, contract detail, proof, checkout, and order history routes. `src/lib/assurance-data.ts` derives display state from the requirement, Kane `_test.md` contracts, Result files, the credit ledger, and `.veridian/evidence.json`. `src/lib/checkout.ts` is the deterministic commerce calculation boundary. `src/runner` parses Kane NDJSON and computes coverage without spending credits. Kane remains the only browser-verification layer.
