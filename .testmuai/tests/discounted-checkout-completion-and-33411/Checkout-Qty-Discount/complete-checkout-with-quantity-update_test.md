---
mode: testing
max_steps: 30
timeout: 300
variables: {}
---

# Complete checkout with quantity update, discount, and payment verification

## Step 1
Complete checkout with quantity update, discount, and payment verification

Verifies a user can update item quantity, apply a discount code, fill in personal and payment details, and successfully complete a checkout, confirming the final price and order reference.

Navigate to http://127.0.0.1:3000/checkout
Change quantity to 2
Apply discount code SAVE20
Fill the checkout form:
Full name: Ada Lovelace
Email: ada@example.com
Shipping address: 12 Analytical Engine Way
Credit card number: PAY-2048
Complete the order
Verify the final total on the confirmation page.
Verify the presence of an order reference number.
