# VERIDIAN Product Requirements

## Evidence taxonomy

- **Verified Kane capability:** supported by the installed Kane CLI 0.8.5 help and/or versioned official Kane documentation.
- **Observed product capability:** demonstrated by committed application behavior and recorded evidence; not assumed from external sources.
- **Proposed VERIDIAN capability:** product behavior we intend to build in Phase 1+.
- **Assumption requiring validation:** unresolved until exercised against the target application and current CLI.

## Executive Summary

VERIDIAN is a runtime product-contract workspace for AI-assisted product teams. It links a written requirement to claims, use cases, acceptance criteria, runnable Kane tests, sealed evidence, coverage, drift, and bounded repair work. The product's value is the preserved lineage from promise to proof.

## Problem

AI coding agents can change behavior faster than a human can inspect it. Existing browser checks may prove a button response but not whether the requirement remains covered, whether the source changed, or whether a failure was a product defect versus a verifier error.

## Target User

Release engineers and product-minded engineering leads responsible for approving AI-assisted changes. Today they read requirements, inspect agent summaries, run scattered tests, and manually decide whether a release still satisfies its promises.

## User Story

As a release engineer supervising AI-assisted changes, I want every release promise linked to current browser evidence so I can block a release for a real failed or stale claim without trusting an agent's summary.

## Current Workflow

AI coding agents can change behavior faster than a human can inspect it. Existing browser checks may prove a button response but not whether the requirement remains covered, whether the source changed, or whether a failure was a product defect versus a verifier error.

## Product Promise

VERIDIAN makes each release promise traceable to a real-browser verification result and makes stale, failed, and unverified promises visible before release approval.

## Invariants And Adversarial Verification

VERIDIAN treats invariants as first-class promises about behavior across one or more actors, shared state, persistence, authorization, financial totals, inventory, idempotency, uniqueness, and state transitions. An adversarial scenario may assign independent actors and synchronization points so a future Kane runner can reproduce schedules that ordinary single-user tests cannot observe.

This capability is domain agnostic. Checkout is the signature demonstration, not a hard-coded product model.

## Release Gate Requirement

Every release candidate must produce an explainable `SHIP` or `BLOCK` decision. The gate evaluates required promises, critical invariants, coverage, stale sources/contracts, failed runs, unresolved repair attempts, evidence integrity, contract mutation, and repository baseline changes. Each blocking condition must be machine-readable and linked to the affected graph node.

## Core Workflow

1. Import a requirement source into Kane's local assurance context.
2. Review extracted use cases and approve the intended requirement interpretation.
3. Design acceptance criteria, scenarios, and one runnable test per scenario through Kane.
4. Author each retained `_test.md` once, then replay the persistent contract.
5. Inspect sealed evidence and two-axis coverage.
6. If the source changes, reconcile it and show downstream drift.
7. Create a bounded repair packet from an evidence-backed failure; re-run the same contract.

## Requirement, Claim, and Lineage Models

VERIDIAN's domain graph is `Source -> Requirement -> Claim -> Use Case -> Acceptance Criterion -> Scenario -> Kane Test -> Evidence -> Coverage`. Each node has a stable local identifier, provenance, source/version hash where applicable, trust/status, timestamps, and links to its parent/children.

## Requirement Model

A requirement is a versioned, normalized statement from a source. It records exact provenance and cannot be rewritten during an active verification attempt.

## Claim Model

A claim is the smallest testable product promise. It is a proposed VERIDIAN concept mapped to reviewed Kane use cases and criteria, not a claimed native Kane node type.

## Use-Case Model

A use case is extracted by Kane from a source, retains citations, begins unreviewed/derived, and becomes an approved basis for design only after human review.

## Acceptance-Criteria Model

Acceptance criteria are designed from one reviewed use case and become immutable for an active verification contract. Editing them creates a new contract version.

## Test Model

Each scenario maps to one designed `_test.md`. A new test is authored once in a real browser before it can join a batch replay. Test definition hashes and source links prevent silent contract substitution.

## Evidence and Verdicts

Evidence is first-class metadata around a Kane execution: execution identity, test identity, criteria mappings, step outcomes, screenshots/log references, timestamps, contract/source hashes, Git state, and repair lineage. Verdicts remain distinct: `VERIFIED`, `FAILED`, `INCONCLUSIVE`, `VERIFIER_ERROR`, `STALE`, and `BLOCKED`.

## Coverage Model

The workspace displays both designed coverage and proven execution coverage. A changed source creates a drift event and marks dependent designs stale until reconciled. Coverage must never be inferred from test count alone.

Designed coverage answers whether a live test maps to a criterion. Proven coverage answers whether execution evidence currently proves it. VERIDIAN displays both axes and never merges them into a misleading single percentage.

## Drift Model

Source, contract, or test hash movement creates explicit drift. Kane reconcile is the proposed source-change primitive; VERIDIAN records impact, review decision, and resulting stale/new lineage.

## Repair Contract

A repair packet contains the failed claim, exact acceptance criterion, immutable contract/source hashes, Kane result, evidence reference, Git baseline, allowed/forbidden paths, attempt number, and expected local checks. The coding agent can propose code changes; VERIDIAN, not the agent's prose, decides whether the same contract passes.

## Agent Interaction

The agent receives a bounded implementation or repair packet and returns changed files plus local checks. The orchestrator checks Git scope and invokes Kane; agent narration has no verdict authority.

## Failure States

`PRODUCT_FAILURE`, `REQUIREMENT_DRIFT`, `TEST_CONTRACT_CHANGED`, `VERIFIER_ERROR`, `APPLICATION_START_FAILURE`, `AUTHENTICATION_FAILURE`, `TIMEOUT`, `AGENT_FAILURE`, `REPAIR_SCOPE_VIOLATION`, `EVIDENCE_INVALID`, and `INCONCLUSIVE` remain separate.

## Security

Credentials stay in Kane's secure profile or official CLI secret stores. No password is stored in this repository. Evidence paths are sanitized before display. Repair scope is allowlisted, contract hashes are checked before and after execution, and verifier errors cannot become product failures.

## Performance

Read-only workspace views should render from normalized data without invoking Kane. Long Kane operations stream state and are performed by a local/VPS runner. Target interactive route response is under one second for stored data; proof page initial load target is under five seconds.

## Accessibility

WCAG AA contrast, full keyboard access, visible focus, semantic headings, accessible status text beyond color, reduced motion, and screen-reader descriptions for graph/timeline relationships are required.

## Mobile Behavior

Phase 1 will establish typed domain operations and deterministic local reads. The product must provide designed loading/error states, WCAG AA contrast, keyboard navigation, and a 390px mobile evidence timeline. Graphs must transform vertically on mobile rather than become unreadably small.

The 390px experience uses a vertical lineage/evidence timeline, sticky release status, and full-width evidence actions. It does not shrink the desktop Promise Graph.

## Demo Scenario

Launch readiness for checkout: a requirement says customers can apply a valid discount, see the total change, complete checkout, and receive confirmation. VERIDIAN shows four claims, one intentionally real regression, Kane evidence, a bounded repair packet, and a re-run of the unchanged contract returning all four claims to proven.

## Out of Scope for the First Complete Slice

Hosted multi-tenant service, autonomous unrestricted code edits, invented Kane APIs, custom browser automation replacing Kane, arbitrary external integrations, and claims of verification without a real evidence artifact.

## Acceptance Criteria

- Every displayed claim has source provenance and a status derived from stored lineage.
- A designed test cannot be presented as proven until a Kane execution record exists.
- A failed run distinguishes product failure from verifier/infrastructure failure.
- A repair cannot change the acceptance contract silently.
- Drift is visible when source bytes/version change.
- The proof surface exposes reproducible Kane evidence references and timestamps.
