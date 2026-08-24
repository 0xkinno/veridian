---
mode: testing
max_steps: 20
timeout: 120
target: chrome
headless: true
---

# Session: discount-total-value

## Step 1  Open checkout
Go to http://127.0.0.1:3000/checkout

## Step 2  Select quantity
Set the quantity field to 2

## Step 3  Apply discount
Type "SAVE20" into the discount code field and click the Apply button

## Step 4  Store the discount
Store the value shown next to "Discount" as 'discount_amount'

## Step 5  Store the total
Store the value shown next to "Total" as 'final_total'

## Step 6  Verify discount is applied to total
Verify that the final total is less than $107.98. The discount must reduce the actual charged amount, not merely display as a line item.

## Step 7  Complete checkout
Click the checkout button and verify the confirmation page shows an order reference
