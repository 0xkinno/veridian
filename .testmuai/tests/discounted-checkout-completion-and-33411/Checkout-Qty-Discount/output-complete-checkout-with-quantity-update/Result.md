---
test: ../complete-checkout-with-quantity-update_test.md
status: passed
started: 2026-08-23T19:09:46.019Z
duration_s: 173
session_id: 88e71912-7c5a-426f-90de-64baa0d57f3d
---

# Complete checkout with quantity update, discount, and payment verification — Result

## Step 1 ✓ passed (129.8s)
md5: c56576b135800ef979af9880805511f1
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
