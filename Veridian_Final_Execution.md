# VERIDIAN — FINAL EXECUTION (DO IN THIS EXACT ORDER)

Read HANDOFF.md, EVIDENCE.md, doc/PHASE2_KANE_LEDGER.md first.
Do NOT add features. Do NOT redesign anything. Do NOT expand scope.

## STEP 1: AUDIT (no changes)

Run:
  kane-cli balance
  npm test
  npm run build
  git status --short

Inspect the two automation-failure Kane runs. Identify the exact
locator/selector problem. Was it a stale element name? A timing
issue? A wrong URL? Write the diagnosis in EVIDENCE.md.

## STEP 2: FIX AUTOMATION ISSUES (application code only)

The checkout app DOM must match what Kane expects to find.
If Kane looks for a "Total" label and the app renders "Order Total",
fix the APP label, not the Kane test.

After fixing, verify the checkout page manually:
  curl http://127.0.0.1:3000/checkout | grep -i "total"

Confirm the page structure makes Kane's job unambiguous:
  - Product name visible
  - Quantity visible
  - Discount code input with clear label
  - "Apply" button
  - Subtotal, Discount, Tax, Total each on labeled lines
  - Checkout button
  - Confirmation page with order ID and total

Do NOT spend Kane credits yet.

## STEP 3: ACTIVATE THE BUG

Set DEMO_MODE=bug in .env.local (or equivalent).
Restart the dev server.
Verify manually:
  - Go to /checkout
  - Add item, quantity 2
  - Apply SAVE20
  - Discount line shows correct amount (20% off)
  - BUT total line does NOT subtract the discount (this is the bug)

If the bug is not producing this exact behavior, fix lib/checkout.ts
so it does. The bug must be: discount displays correctly, total is
wrong.

## STEP 4: ONE KANE FAILURE RUN (costs credits)

  kane-cli balance
  # Record balance in doc/PHASE2_KANE_LEDGER.md

  kane-cli testmd run .testmuai/tests/<checkout-contract>_test.md \
    --agent --headless --url http://127.0.0.1:3000

  kane-cli balance
  # Record new balance and credit cost

Expected: Kane reports FAIL because the total does not reflect the
discount. If Kane reports PASS, the bug is not active or the test
does not check the total. Do NOT proceed until you have a REAL
PRODUCT FAILURE (not automation failure).

Save the FULL Kane NDJSON output to .veridian/runs/fail-run.ndjson
Record: run ID, timestamp, contract hash, evidence URL, failed
criterion, expected value, actual value.

## STEP 5: REPAIR (one line fix)

Fix lib/checkout.ts: change the taxableAmount line so the discount
is actually subtracted from the total calculation.

Verify:
  git diff --name-only
  # Must show ONLY lib/checkout.ts (or equivalent app file)
  # Must NOT show any .testmuai/** file

Verify the contract hash did not change:
  sha256sum .testmuai/tests/<checkout-contract>_test.md
  # Must match the hash from Step 4

Restart the dev server (now in clean/fixed mode).
Verify manually: apply SAVE20, total now correctly reflects discount.

## STEP 6: SAME TEST RERUN (should be free replay)

  kane-cli balance

  kane-cli testmd run .testmuai/tests/<checkout-contract>_test.md \
    --agent --headless --url http://127.0.0.1:3000

  kane-cli balance
  # Record cost (should be 0 or near-0 if replaying from cache)

Expected: PASS. The same contract, same test, now passes because the
application code was fixed.

Save the FULL Kane NDJSON output to .veridian/runs/pass-run.ndjson
Record: run ID, timestamp, same contract hash, evidence URL.

## STEP 7: COVERAGE

  kane-cli cover
  kane-cli cover gaps

Save the output. Update the coverage dashboard to reflect real
numbers.

## STEP 8: PERSIST EVIDENCE

Update these with REAL data from Steps 4-7:

  .veridian/last-cycle.json  — both runs, repair, contract hashes
  EVIDENCE.md                — run IDs, timestamps, credit costs
  doc/PHASE2_KANE_LEDGER.md  — updated balance

The /proof page must read from .veridian/ and display:
  - Source requirement
  - Kane-extracted claims
  - Failed run (with evidence link)
  - Repair diff (one line)
  - Passed run (with evidence link, same contract hash)
  - Coverage: X/X proven

The /workspace Promise Graph must show the SAVE20 claim as:
  FAILED → REPAIRED → VERIFIED

All data must be REAL. No hardcoded run IDs or fake evidence.

## STEP 9: FINAL VERIFICATION

  npm test          # all pass
  npm run typecheck # clean
  npm run lint      # clean
  npm run build     # clean

Manually check every route:
  / (landing loads, communicates product in 5 seconds)
  /checkout (works with and without SAVE20)
  /checkout/orders (shows real orders)
  /workspace (Promise Graph shows real lineage)
  /workspace/[id] (claim detail shows real evidence)
  /proof (judge page shows real proof cycle)

Check: no console errors, no broken links, no placeholder text,
no "coming soon", no TODO, mobile works on 390px viewport.

## STEP 10: STOP

Do NOT add more features after Step 9.
Update README with final real evidence.
Update HANDOFF.md.
Commit everything.

The remaining work is human:
  - Record 3-minute demo video
  - Deploy landing to Vercel
  - Test all links in incognito
  - Submit via the form

STOP CONDITION: The judge can see one undeniable thing:
  requirement → Kane-derived test → real failure → repair → same
  test passes → Promise Graph → proof page → coverage.