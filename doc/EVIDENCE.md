# Evidence Ledger

## Setup evidence

- Node: `v24.14.1`.
- Kane CLI: `0.8.5`.
- Kane skill: `0.0.17` installed to Codex/Claude/Gemini skill locations.
- Identity: OAuth profile `default`, environment `prod`, user `ojilerekingsley`, token valid on 2026-08-21.
- Balance: 1,200 available and 1,200 total on 2026-08-21.

## Paid operation ledger

| Operation | Reason | Expected value | Balance before | Balance after | Status |
|---|---|---|---:|---:|---|
| `context extract` | None in Phase 0 | None | N/A | N/A | Not run |
| `design tests` | None in Phase 0 | None | N/A | N/A | Not run |
| `maintain reconcile` | None in Phase 0 | None | N/A | N/A | Not run |

## Browser/evidence runs

No paid browser or assurance execution has been run in this phase.

## Credit consumption plan

Starting balance: 1,200. Protect 400 credits for final demo evidence and recovery.

| Stage | Maximum planned allocation | Rule |
|---|---:|---|
| First source extraction | 120 | One focused checkout corpus; no duplicate extraction |
| Test design | 180 | One reviewed use case, starting with `--max 4` |
| Initial browser authoring | 180 | Author persistent contracts once |
| Failure and pass evidence | 180 | Replay unchanged contracts; do not regenerate |
| Reconcile/drift demonstration | 100 | One controlled source version change |
| Contingency | 40 | Only for a diagnosed failure |
| Protected reserve | 400 | Requires explicit user approval |

Before every paid operation: query balance, append operation/reason/expected value/current balance, run once, then record reported and ending credits. Never auto-retry a paid turn.
# Recovery Kane evidence — 2026-08-23

- PASS: session `144882b7-19e1-4607-987d-3f1d3c1c4d28`, evidence `993f6956-c7f4-454b-af89-68e9be3b3368.evidence`, selected item and enabled checkout control.
- FAIL / not product bug: session `c16f12d8-ed96-48cf-bd49-a84b88256bc6`, evidence `56ed0453-dfff-46b2-b24f-83a7a984346c.evidence`, stale running build.
- FAIL / not product bug: session `8369b810-b653-4432-a2bb-3f0d67f39ac1`, evidence `e0f7662e-d50f-4c69-ad38-f4b28d876514.evidence`, locator drift.
- Exact costs and balances are in `doc/PHASE2_KANE_LEDGER.md`.

## Final execution automation diagnosis

- Session `c16f12d8-ed96-48cf-bd49-a84b88256bc6`: wrong application state. Kane navigated correctly to `/checkout`, but the running server was a stale pre-alignment build whose selected product did not match the authored contract's `Field Notes set`. This was not a timing failure or a product assertion failure.
- Session `8369b810-b653-4432-a2bb-3f0d67f39ac1`: stale cached composite locator/state. The evidence screenshot and the assertion's own two sub-results showed `Field Notes set` and an enabled Pay button, but the replay-level `checkout_summary_selected_item` variable remained `false`, producing a contradictory failed composite assertion. The application contributed ambiguity because the product name appeared in the editorial product plate rather than within the order summary Kane was instructed to inspect.
- Application correction: the order summary now contains explicit `Product`, `Quantity`, `Subtotal`, `Discount`, `Tax`, and `Total` rows. Confirmation now contains separately labeled `Order ID` and `Total` fields. No `_test.md` prose was modified.

## Final SAVE20 repair cycle

- Bug activation was manually verified with quantity `2` and `SAVE20`: discount displayed `$19.996`, while the bug-mode total was `$107.98` instead of `$86.38`.
- Production repair changed `src/lib/checkout.ts` to always calculate tax and total from `subtotal - discountAmount`; `.env.local` was returned to clean mode.
- Kane generated and persisted one focused contract under `.testmuai/tests/discounted-checkout-completion-and-33411/` without hand-editing it.
- Adaptive authoring run `88e71912-7c5a-4260-90de-64baa0d57f3d` consumed `29.72664` credits and observed `$107.98`; Kane learned that live value, so it is explicitly excluded from product proof.
- Deterministic replay session `cc8546ff-fe2f-4865-b9a2-30f37aec1db0` consumed `4.36925` credits and failed the final-total step, but Kane triaged the sealed result as `automation_bug/test_data_issue` because the recorded expected value drifted. It is not represented as a confirmed product failure.
- Manual clean-mode API verification now returns total `$86.38` for the same inputs.
- Coverage audit: designed `8/8` acceptance criteria; proven `2/8`; Kane reports `3` failing and `3` not yet run.

## Proof-cycle hardening — 2026-08-24

- Lens competitor repository is present at `research/competitors/lens` (commit `a2bde50`) and was audited for its Stop hook, `.lens` baseline/flow-map, JSON store, Seatline UI, and Kane contracts. Findings are recorded in `doc/COMPETITIVE_ANALYSIS.md` and `doc/COMPETITIVE_COMPARISON.md`.
- Stale generated `output-*` recordings were removed before clean re-authoring.
- Clean baseline authoring session `74cf8130-4aef-49ed-8b52-9cd2521105a0` passed and consumed `13.786275` credits. Its generated observables confirm total presence, not a numeric `$86.38` equality.
- Bug-mode manual API verification returned `$107.98`; strict replay session `397b96bd-f934-46b0-9d94-ab65e968198e` passed because the contract only checked that a total exists. This is documented as a contract-quality limitation, not a product-failure verdict.
- Repair restored `const taxableAmount = money(subtotal - discountAmount)` and clean-mode API verification returned `$86.38`.
- Fresh selected-item/control evidence: session `21ccb8cc-5ac1-4805-a73a-3eb947a9123d`, 4/4 steps passed, evidence `c4a26c27-068f-4cff-8a8b-f87f773aed37.evidence`.
- Fresh incomplete-shipping evidence: session `42415f0f-8ce0-4b0a-b9f3-adc0980ec26c`, 7/7 steps passed, evidence `b8f2f83e-ed9f-4506-ae64-b5128f05f90b.evidence`.
- Fresh confirmation evidence: session `a0b7a3d7-0fdb-4e30-8276-fb7ebe0a636a`, 8/8 steps passed, evidence `2e064b5e-b27d-4b8c-8771-236f011000a2.evidence`.
- Kane coverage now reports designed `8/8`, proven `8/8`, `0` failing, `0` blocked, and `0` not yet run. Final balance: `785.9054` credits.

## Numeric SAVE20 proof cycle â€” 2026-08-24

- Contract: `.testmuai/tests/discount-total-value_test.md`; SHA-256 `D4F4BDC89A6B30E648EF2731A7C9C2D09686366BD56F5453582D1A10A3A27D53`.
- Clean baseline authoring: session `55d88533-d374-424a-84d2-27f817f4695a`, PASS, captured `discount_amount=-$20.00` and `final_total=$86.38`, aggregate cost `49.563085` credits; full NDJSON is `.veridian/runs/value-baseline.ndjson`.
- Bug replay: session `50c011ba-22cf-48e0-ac1d-ba590bb7e5d5`, FAIL at numeric Step 6, evidence `4c8a7645-a564-414c-9d36-3968cf1389dc`, classification `application_issue/ui_data_defect`, expected `<$107.98`, actual `$107.98`, cost `2.184375` credits.
- Repair replay: session `60945f2b-8eac-4282-a8cd-c5ca7ac307a8`, evidence `9afb04c3-3468-4488-8943-1dc684a43962`, numeric value assertion passed with `$86.38`; final confirmation assertion was separately triaged as `automation_bug/locator_rot`, because the page visibly contained order reference `VD-MT75HHXZ`. This is retained in `.veridian/runs/value-pass-locator-issue.ndjson`.
- Initial infrastructure baseline session `aa8c3cba-9232-49b2-9852-48131442ca2c` failed with connection refused and is not product evidence.
- Coverage command output is persisted in `.veridian/runs/value-cover.txt` and `.veridian/runs/value-coverage-gaps.txt`: designed `8/8`, proven `8/8`, zero gaps in the live graph.
