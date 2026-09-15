# LumaCart

Static shopping app demo for browsing curated lifestyle products, adding items to a cart, and completing a lightweight checkout flow.

## Features

- Product catalog with categories for tech, home, wellness, and accessories
- Search by keyword and filter by category or collection
- Search-term highlighting in catalog results for faster scanning
- Sort products and inspect a highlighted detail view with availability and delivery info
- Shopping cart with quantity controls, clear-cart action, coupon support, free-shipping threshold, and live totals
- Checkout summary cards for item count, delivery tier, and shipping savings
- Wishlist with saved items and move-to-cart actions
- Stock-aware product messaging and quantity caps in the cart
- Cart, filters, and selected product persisted in local browser storage between reloads
- Demo checkout form with instant order confirmation

## Run locally

Run a local static server from the repository root, then open the served URL in a browser.

```bash
python3 -m http.server 8000
```

Then visit `http://127.0.0.1:8000/index.html`.
