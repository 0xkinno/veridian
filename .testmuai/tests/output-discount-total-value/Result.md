---
test: ../discount-total-value_test.md
status: passed
started: 2026-08-24T10:34:06.758Z
duration_s: 302
session_id: 55d88533-d374-424a-84d2-27f817f4695a
---

# Session: discount-total-value — Result

## Step 1  Open checkout ✓ passed (16.8s)
md5: 3369ebd26280e5fb44813ba8713c3f6d
Go to http://127.0.0.1:3000/checkout

## Step 2  Select quantity ✓ passed (23.3s)
md5: bf3763412490be4fbd7dd1e51d073483
Set the quantity field to 2

## Step 3  Apply discount ✓ passed (39.4s)
md5: 01c3e8012b0793fb6d9072bc4079c02b
Type "SAVE20" into the discount code field and click the Apply button

## Step 4  Store the discount ✓ passed (38.8s)
md5: d272227ef881c889618c63703d3e872e
Store the value shown next to "Discount" as 'discount_amount'

## Step 5  Store the total ✓ passed (39.1s)
md5: d8659508f63670741f58fe490c23d1d3
Store the value shown next to "Total" as 'final_total'

## Step 6  Verify discount is applied to total ✓ passed (49.4s)
md5: 955d6f6b4fca092aa8d49d32d6b5df37
Verify that the final total is less than $107.98. The discount must reduce the actual charged amount, not merely display as a line item.

## Step 7  Complete checkout ✓ passed (53.3s)
md5: aa339d2c193a16a8ba5f965a2fe486b0
Click the checkout button and verify the confirmation page shows an order reference
