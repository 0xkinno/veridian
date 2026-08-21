---
assurance:
  id: t-3
  base: sha256:6e49283da1b9b32c0a6cb2a7ecb6cedb8183b5e8f73376413ee28cd591d77938
---
# Show selected item and actionable checkout control on the checkout page

> Prove that a customer entering checkout with a valid selected item can see the selected item and an actionable checkout control on the checkout page before submission.

## Step 1

Open http://127.0.0.1:3000/checkout in a browser and wait for the checkout page for the selected item "Field Notes set" to finish loading.

## Step 2

Assert the checkout page shows the selected item "Field Notes set" in the checkout summary.

## Step 3

Assert the checkout page exposes a visible enabled checkout control that is ready for the customer to use.

## Step 4 — assert @verifies ac-5, ac-6

Confirm presence check: selected item on the checkout page (exists) — the stated promise: The checkout page shows the selected item.
