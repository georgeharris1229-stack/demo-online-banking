# Harbor Parts Co.

Static boat-parts shopping app demo with a login page, marine product catalog, live cart totals, and a lightweight checkout flow.

## Features

- Login page that sends customers into the product-picking experience
- Product catalog with categories for dock hardware, electrical, anchoring, safety, steering, and deck gear
- Search by keyword and filter by category or fitment
- Search-term highlighting in catalog results for faster scanning
- Product recommendations that react to the selected boat part and current cart
- Sort products and inspect a highlighted detail view with availability and delivery info
- Shopping cart with quantity controls, clear-cart action, coupon support, free-shipping threshold, and live totals
- Fuller checkout summary with item counts, units, account/contact previews, coupon status, tax estimate, delivery tier, savings, and a breakdown of order costs
- Wishlist with saved items and move-to-cart actions
- Stock-aware product messaging and quantity caps in the cart
- Cart, filters, and selected product persisted in local browser storage between reloads
- Standalone login page that stores a demo signed-in account for checkout
- Demo checkout form with instant order confirmation

## Run locally

Run a local static server from the repository root, then open the served URL in a browser.

```bash
python3 -m http.server 8000
```

Then visit `http://127.0.0.1:8000/index.html`.
