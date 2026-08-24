# Phase 2 Kane Credit Ledger

No paid Kane operation is invoked without a row below.

| Operation | Reason | Expected value | Balance before | Expected remaining | Actual cost | Balance after | Status |
|---|---|---|---:|---:|---:|---:|---|
| `kane-cli context ingest doc/checkout-requirement.md --mode agent` | Derive source-cited checkout use cases for the Phase 2 assurance slice | Real Kane-derived requirement graph and citations | 1,200 | 1,193.1305 | 6.8695 | 1,193.1305 | Completed; terminal stream was truncated, but local graph confirms committed derived output |

The command is intentionally limited to one source and will not be retried automatically. Any pause, error, or usage event must be recorded before another paid command.

## Human review decision

`uc-1` is explicitly recorded as `HUMAN_APPROVED` in `doc/PHASE2_REVIEW_DECISIONS.json`, tied to source version `1` and hash `sha256:d08951a00ad3bfdb65e7e05e1651dc9781d4d739e48930fe2b805b6d49792b42`.

| Operation | Reason | Expected value | Balance before | Expected remaining | Actual cost | Balance after | Status |
|---|---|---|---:|---:|---:|---:|---|
| `kane-cli design tests --use-case uc-1 --mode agent --max 4` | Design bounded acceptance criteria and one test per scenario for approved UC-1 | Source-linked persistent test design | 1,193.1305 | Unknown until Kane reports usage | Pending | Pending | Planned |
| `kane-cli design tests --use-case uc-1 --mode agent --max 4` | Design bounded acceptance criteria and one test per scenario for approved UC-1 | Source-linked persistent test design | 1,193.1305 | 1,161.9674 | 3.93 | 1,161.9674 | Completed; 6 criteria and 4 explicit input gaps |

Design review: `ac-1` through `ac-6` are recorded as `HUMAN_APPROVED` in `PHASE2_REVIEW_DECISIONS.json`. Gaps `gap-1` through `gap-4` remain unresolved and must be supplied as runtime variables before browser authoring.

| `kane-cli design tests --resume design-20260821T153516-8df3 --mode agent --message <runtime inputs>` | Continue the existing paid design session with the real local target and deterministic non-secret inputs; do not regenerate | Complete persistent `_test.md` design | 1,161.9674 | Unknown until Kane reports usage | Pending | Pending | Planned continuation |
| `kane-cli design tests --resume design-20260821T153516-8df3 --mode agent --message <runtime inputs>` | Continue existing design | Three persistent contracts | 1,161.9674 | 1,097.4913 | 64.4761 | 1,097.4913 | Completed; no regeneration |
| `kane-cli testmd run .testmuai/tests/<contract> --agent --headless --no-adaptive-heal` | Author each approved persistent contract once against local checkout target | Real contract recordings and sealed evidence packs | 1,097.4913 | Unknown until Kane reports per-run usage | Pending | Pending | Planned; one command per contract, no automatic retry |
| `kane-cli testmd run .testmuai/tests/complete-checkout-and-confirm-order-reference-on-the_test.md --agent --headless --no-adaptive-heal --timeout 180` | Author approved happy-path contract once against the real local checkout target | Authored persistent contract plus sealed real-browser evidence | 1,097.4913 | Unknown until Kane reports usage | 45.8133 | 1,051.6780 | Failed before authoring commit; local target returned HTTP 500, no `Result.md`, metadata, or evidence pack was created. Do not count as verification evidence. |

The failed authoring attempt is retained as a real credit event and technical failure. It must not be represented as a Kane verification run, PASS/FAIL product verdict, or evidence-backed result because Kane did not seal an evidence pack or commit authored metadata.

## Recovery session — 2026-08-23

Free readiness inspection confirmed Kane CLI 0.8.5 is authenticated. Exact balance before any new browser run: **1,041.8456 credits**. The local graph contains one trusted checkout source, one use case, eight acceptance criteria, and three designed contracts. No paid command has been issued in this recovery session yet.

| `kane-cli testmd run .testmuai/tests/show-selected-item-and-actionable-checkout-control-on-the_test.md --agent --headless --no-adaptive-heal --timeout 180` | Verify authored selected-item contract against rebuilt target | Real browser evidence | 1,041.8456 | 1,031.3992 | 10.4464 | 1,031.3992 | Failed with sealed evidence: server was running stale pre-alignment build and Kane found the wrong selected-item state. Product verdict: automation/state mismatch, not a confirmed product defect. Run ID `run-0`, session `c16f12d8-ed96-48cf-bd49-a84b88256bc6`. |
| Same contract replay after rebuilding aligned target | Seal valid selected-item and actionable-control evidence | Real browser evidence | 1,031.3992 | 1,008.0879 | 23.31135 | 1,008.0879 | Passed; 4/4 steps, session `144882b7-19e1-4607-987d-3f1d3c1c4d28`, evidence `993f6956-c7f4-454b-af89-68e9be3b3368.evidence`. |
| `kane-cli testmd run .testmuai/tests/complete-checkout-and-confirm-order-reference-on-the_test.md --agent --headless --no-adaptive-heal --timeout 180` | Replay happy-path confirmation contract | Real browser evidence | 1,008.0879 | 1,000.4026 | 7.6853 | 1,000.4026 | Failed with sealed evidence because a recorded assertion locator drifted from the rebuilt layout. Kane classified it `locator_rot`, `confirmed: false`; session `8369b810-b653-4432-a2bb-3f0d67f39ac1`, evidence `e0f7662e-d50f-4c69-ad38-f4b28d876514.evidence`. Final balance confirmed after settlement. |

| `kane-cli generate` + adaptive test run for SAVE20 total | Probe generated contract before deterministic replay | Real browser run | 987.0592 | 955.3553 | 31.7039 | 955.3553 | Passed automation but detected product total `$107.98`; Kane adaptively learned the incorrect live value instead of enforcing `$86.38`. Not valid product verification. Session `88e71912-7c5a-4260-90de-64baa0d57f3d`. |
| Deterministic SAVE20 replay in bug mode | Enforce generated contract against active defect | Real browser replay | 955.3553 | 950.9861 | 4.36925 | 950.9861 | Failed at final-total assertion; Kane triaged it as `automation_bug/test_data_issue` because the recorded expected value drifted. Not counted as a confirmed product verdict. Session `cc8546ff-fe2f-4865-b9a2-30f37aec1db0`. |
| Fresh clean-mode authoring of SAVE20 contract after cache purge | Re-author checkout against corrected behavior | Real browser evidence and cached recording | 948.5389 | 931.5314 | 17.0075 | 931.5314 | Passed; session `74cf8130-4aef-49ed-8b52-9cd2521105a0`. Kane recorded boolean confirmation observables, not numeric `$86.38`, so this baseline cannot detect arithmetic drift. |
| Fresh selected-item/control contract authoring | Re-author and prove selected item plus actionable control | 4/4 browser steps and sealed evidence | 929.7894 | 906.3574 | 23.431955 | 906.3574 | Passed; session `21ccb8cc-5ac1-4805-a73a-3eb947a9123d`, evidence `c4a26c27-068f-4cff-8a8b-f87f773aed37.evidence`. |
| Fresh incomplete-shipping contract authoring | Re-author and prove required-field rejection | 7/7 browser steps and sealed evidence | 902.2404 | 857.0219 | 45.218459 | 857.0219 | Passed; session `42415f0f-8ce0-4b0a-b9f3-adc0980ec26c`, evidence `b8f2f83e-ed9f-4506-ae64-b5128f05f90b.evidence`. |
| Fresh confirmation contract authoring | Re-author and prove valid checkout confirmation and order ID | 8/8 browser steps and sealed evidence | 854.3859 | 797.7211 | 57.664804 | 797.7211 | Passed; session `a0b7a3d7-0fdb-4e30-8276-fb7ebe0a636a`, evidence `2e064b5e-b27d-4b8c-8771-236f011000a2.evidence`. |

| Numeric SAVE20 baseline authoring | Author focused value assertion against repaired checkout | `$86.38` total and `$20.00` discount captured | 785.9054 | 736.3423 | 49.563085 | 736.3423 | Passed; session `55d88533-d374-424a-84d2-27f817f4695a`. |
| Numeric SAVE20 bug replay | Prove unchanged contract catches arithmetic regression | `$107.98` must fail `<$107.98` | 736.3423 | 734.1579 | 2.184375 | 734.1579 | Confirmed product failure; session `50c011ba-22cf-48e0-ac1d-ba590bb7e5d5`, evidence `4c8a7645-a564-414c-9d36-3968cf1389dc`. |
| Numeric SAVE20 repaired replay | Re-run same hash after one-line repair | Numeric assertion passes | 734.1579 | 731.6865 | 2.471375 | 731.6865 | Value assertion passed; final confirmation check separately triaged `automation_bug/locator_rot`; session `60945f2b-8eac-4282-a8cd-c5ca7ac307a8`, evidence `9afb04c3-3468-4488-8943-1dc684a43962`. |
