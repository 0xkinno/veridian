---
test: ../reject-incomplete-required-shipping-details-during-checkout_test.md
status: passed
started: 2026-08-24T04:18:00.630Z
duration_s: 223
session_id: 42415f0f-8ce0-4b0a-b9f3-adc0980ec26c
---

# Reject incomplete required shipping details during checkout — Result

## Step 1 ✓ passed (22.3s)
md5: 4847f9354ea9c4d65c001c937429ee7e
Open http://127.0.0.1:3000/checkout in a browser and wait for the checkout page for the selected item "Field Notes set" to finish loading.

## Step 2 ✓ passed (28.7s)
md5: bb4832af02fdb1ae8cd3fce2f2783d29
Assert the checkout page shows the selected item "Field Notes set" and exposes a visible enabled checkout control.

## Step 3 ✓ passed (26.2s)
md5: d5d5952214672194deb98ec086ffc34d
In the shipping details section, enter Ada Lovelace, ada@example.com, and 12 Analytical Engine Way, but leave one field that the checkout marks as required incomplete.

## Step 4 ✓ passed (25.2s)
md5: 2e4528c40f317cfdf7503eea8dfd208f
Attempt to submit checkout with the incomplete required shipping field still missing.

## Step 5 ✓ passed (36s)
md5: 773c804d2ad15cdfe24dda00003726e3
Assert the page shows clear validation tied to the incomplete required shipping field.

## Step 6 ✓ passed (32s)
md5: 80010efd6debc685f780f7533cc01312
Assert no explicit order confirmation is shown after the rejected submission.

## Step 7 — assert ✓ passed (29.1s)
md5: 81c52616821eb6016728732e411eef4c
Confirm 'transition to an explicit order confirmation after submitting incomplete required shipping fields' does NOT appear (forbidden-presence) — the stated promise: Submitting incomplete required shipping fields does not transition checkout to an explicit order confirmation.
