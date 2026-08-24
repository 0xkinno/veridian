---
test: ../complete-checkout-and-confirm-order-reference-on-the_test.md
status: passed
started: 2026-08-24T04:24:37.130Z
duration_s: 325
session_id: a0b7a3d7-0fdb-4e30-8276-fb7ebe0a636a
---

# Complete checkout and confirm order reference on the confirmation page — Result

## Step 1 ✓ passed (22.8s)
md5: 4847f9354ea9c4d65c001c937429ee7e
Open http://127.0.0.1:3000/checkout in a browser and wait for the checkout page for the selected item "Field Notes set" to finish loading.

## Step 2 ✓ passed (33s)
md5: d42f0b29be32bdb72581f94b4cd4b09e
Assert the checkout page shows the selected item "Field Notes set" in the checkout summary and exposes a visible enabled checkout control that can submit the purchase.

## Step 3 ✓ passed (24.6s)
md5: 5d73d3426c0a5422cadc523abd75eccd
capture baseline: checkout page before valid submission

## Step 4 ✓ passed (30s)
md5: 5f82bf9407754ab92b8373ce44ffe225
In the shipping details section, complete the checkout form with Ada Lovelace, ada@example.com, and 12 Analytical Engine Way.

## Step 5 ✓ passed (30.3s)
md5: b80bf3e6edf2ad0fc231107242f572ce
In the payment section, submit the checkout using the valid payment reference PAY-2048.

## Step 6 ✓ passed (32.6s)
md5: d61bcaccc714242b025f020c7173184b
Assert an explicit order confirmation is shown after the submission completes.

## Step 7 ✓ passed (40.8s)
md5: bfbd9ef4c350498803864b6064d171a9
Assert the confirmation shows an order reference that identifies the completed order.

## Step 8 — assert ✓ passed (83.3s)
md5: be49203ab1c31a711bc3303923e0fc9a
Confirm state-transition check: explicit order confirmation (equals) — the stated promise: A valid checkout submission transitions from the checkout page to an explicit order confirmation.
