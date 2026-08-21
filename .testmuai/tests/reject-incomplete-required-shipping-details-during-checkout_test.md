---
assurance:
  id: t-2
  base: sha256:118c8df75e6ee45135c0aebedeb0ef8c32a8f06cfcd832fcc0b85d842fc6da73
---
# Reject incomplete required shipping details during checkout

> Prove that checkout blocks completion and shows clear validation when a required shipping field is left incomplete.

## Step 1

Open http://127.0.0.1:3000/checkout in a browser and wait for the checkout page for the selected item "Field Notes set" to finish loading.

## Step 2

Assert the checkout page shows the selected item "Field Notes set" and exposes a visible enabled checkout control.

## Step 3

In the shipping details section, enter Ada Lovelace, ada@example.com, and 12 Analytical Engine Way, but leave one field that the checkout marks as required incomplete.

## Step 4

Attempt to submit checkout with the incomplete required shipping field still missing.

## Step 5

Assert the page shows clear validation tied to the incomplete required shipping field.

## Step 6

Assert no explicit order confirmation is shown after the rejected submission.

## Step 7 — assert @verifies ac-8, ac-3, ac-4, ac-5, ac-6

Confirm 'transition to an explicit order confirmation after submitting incomplete required shipping fields' does NOT appear (forbidden-presence) — the stated promise: Submitting incomplete required shipping fields does not transition checkout to an explicit order confirmation.
