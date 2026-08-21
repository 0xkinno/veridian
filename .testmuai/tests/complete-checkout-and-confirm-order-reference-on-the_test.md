---
assurance:
  id: t-1
  base: sha256:55bde7cc085bd1ef1926361d5847379f77381e2b8028e3f5d00c0bbbbc35640c
---
# Complete checkout and confirm order reference on the confirmation page

> Prove that a customer with the selected item, complete shipping details, and a valid payment submission reaches an explicit confirmation that includes an order reference for the completed order.

## Step 1

Open http://127.0.0.1:3000/checkout in a browser and wait for the checkout page for the selected item "Field Notes set" to finish loading.

## Step 2

Assert the checkout page shows the selected item "Field Notes set" in the checkout summary and exposes a visible enabled checkout control that can submit the purchase.

## Step 3

capture baseline: checkout page before valid submission

## Step 4

In the shipping details section, complete the checkout form with Ada Lovelace, ada@example.com, and 12 Analytical Engine Way.

## Step 5

In the payment section, submit the checkout using the valid payment reference PAY-2048.

## Step 6

Assert an explicit order confirmation is shown after the submission completes.

## Step 7

Assert the confirmation shows an order reference that identifies the completed order.

## Step 8 — assert @verifies ac-7, ac-1, ac-2, ac-5, ac-6

Confirm state-transition check: explicit order confirmation (equals) — the stated promise: A valid checkout submission transitions from the checkout page to an explicit order confirmation.
