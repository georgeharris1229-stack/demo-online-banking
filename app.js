const products = [
    {
        id: "wireless-headphones",
        name: "Wireless Headphones",
        category: "Tech",
        thickness: "Focus",
        badge: "Best seller",
        price: 129.99,
        unit: "each",
        stock: 12,
        material: "Soft-touch plastic & memory foam",
        description: "Noise-isolating headphones with 30-hour battery life and quick pairing.",
        inventory: "In stock",
        leadTime: "Delivers in 2 days",
        icon: "🎧",
        applications: ["Remote work", "Travel listening", "Workout playlists"]
    },
    {
        id: "smart-desk-lamp",
        name: "Smart Desk Lamp",
        category: "Home",
        thickness: "Focus",
        badge: "Editor pick",
        price: 68.5,
        unit: "each",
        stock: 18,
        material: "Aluminum",
        description: "Adjustable LED task lamp with touch controls and warm-to-cool light modes.",
        inventory: "In stock",
        leadTime: "Ships today",
        icon: "💡",
        applications: ["Home office setup", "Bedside reading", "Study sessions"]
    },
    {
        id: "insulated-bottle",
        name: "Insulated Water Bottle",
        category: "Wellness",
        thickness: "Reset",
        badge: "Trending",
        price: 32.0,
        unit: "each",
        stock: 4,
        material: "Stainless steel",
        description: "Double-wall bottle that keeps drinks cold for 24 hours or hot for 12.",
        inventory: "Low stock",
        leadTime: "Delivers in 3 days",
        icon: "🧴",
        applications: ["Gym sessions", "Commutes", "Desk hydration"]
    },
    {
        id: "aroma-diffuser",
        name: "Aromatherapy Diffuser",
        category: "Wellness",
        thickness: "Reset",
        price: 44.25,
        unit: "each",
        stock: 10,
        material: "Ceramic & BPA-free reservoir",
        description: "Ultrasonic diffuser with ambient light settings and automatic shutoff.",
        inventory: "In stock",
        leadTime: "Ships today",
        icon: "🌿",
        applications: ["Evening wind-down", "Bedroom comfort", "Yoga spaces"]
    },
    {
        id: "throw-blanket",
        name: "Chunky Knit Throw Blanket",
        category: "Home",
        thickness: "Cozy",
        badge: "New",
        price: 58.0,
        unit: "each",
        stock: 9,
        material: "Recycled polyester knit",
        description: "Soft oversized blanket designed for couches, reading nooks, and guest rooms.",
        inventory: "In stock",
        leadTime: "Delivers in 2 days",
        icon: "🛋️",
        applications: ["Living room styling", "Movie nights", "Guest room layers"]
    },
    {
        id: "portable-speaker",
        name: "Portable Bluetooth Speaker",
        category: "Tech",
        thickness: "Reset",
        price: 88.0,
        unit: "each",
        stock: 15,
        material: "Mesh fabric & silicone",
        description: "Compact waterproof speaker with rich bass and 14-hour playback.",
        inventory: "In stock",
        leadTime: "Delivers in 2 days",
        icon: "🔊",
        applications: ["Patio hangs", "Weekend trips", "Kitchen audio"]
    },
    {
        id: "planner-set",
        name: "Weekly Planner Set",
        category: "Accessories",
        thickness: "Focus",
        price: 24.5,
        unit: "set",
        stock: 3,
        material: "Recycled paper",
        description: "Minimal desk planner with habit tracker, sticky tabs, and goal sheets.",
        inventory: "Low stock",
        leadTime: "Ships in 1-2 days",
        icon: "📒",
        applications: ["Goal planning", "Desk organization", "Class schedules"]
    },
    {
        id: "canvas-tote",
        name: "Canvas Market Tote",
        category: "Accessories",
        thickness: "Cozy",
        price: 27.75,
        unit: "each",
        stock: 11,
        material: "Organic cotton canvas",
        description: "Structured everyday tote with interior pocket and reinforced straps.",
        inventory: "In stock",
        leadTime: "Ships in 1-2 days",
        icon: "👜",
        applications: ["Weekend errands", "Farmers market", "Daily carry"]
    },
    {
        id: "standing-desk-riser",
        name: "Standing Desk Riser",
        category: "Home",
        thickness: "Focus",
        badge: "Premium",
        price: 149.0,
        unit: "each",
        stock: 2,
        material: "Engineered wood & steel",
        description: "Adjustable desktop riser for switching between sitting and standing.",
        inventory: "Special order",
        leadTime: "Ships in 5-7 days",
        icon: "🖥️",
        applications: ["Ergonomic workstations", "Shared desks", "Study setups"]
    },
    {
        id: "yoga-mat",
        name: "Cushioned Yoga Mat",
        category: "Wellness",
        thickness: "Reset",
        price: 39.99,
        unit: "each",
        stock: 7,
        material: "Non-slip natural rubber",
        description: "Supportive mat with alignment lines for stretching, yoga, and mobility sessions.",
        inventory: "In stock",
        leadTime: "Delivers tomorrow",
        icon: "🧘",
        applications: ["Morning stretches", "Home workouts", "Meditation"]
    }
];

const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING = 12.99;
const ESTIMATED_TAX_RATE = 0.07;
const coupons = {
    SAVE10: { type: "percent", value: 0.1, label: "10% off" },
    WELCOME5: { type: "fixed", value: 5, label: "$5 off" }
};
const storage = (() => {
    try {
        return typeof localStorage === "undefined" ? null : localStorage;
    } catch {
        return null;
    }
})();
const storageKeys = {
    cart: "lumacart-cart",
    filters: "lumacart-filters",
    selectedProductId: "lumacart-selected-product",
    wishlist: "lumacart-wishlist",
    coupon: "lumacart-coupon"
};

const cart = new Map();
const wishlist = new Set();
const productsById = new Map(products.map((product) => [product.id, product]));
let selectedProductId = products[0].id;
let activeCouponCode = "";

const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const shippingEstimate = document.getElementById("shippingEstimate");
const cartTotal = document.getElementById("cartTotal");
const quoteMessage = document.getElementById("quoteMessage");
const categoryFilter = document.getElementById("categoryFilter");
const thicknessFilter = document.getElementById("thicknessFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");
const quoteForm = document.getElementById("quoteForm");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const clearCartButton = document.getElementById("clearCartButton");
const bundleButton = document.getElementById("bundleButton");
const detailPanel = document.getElementById("detailPanel");
const detailIcon = document.getElementById("detailIcon");
const detailCategory = document.getElementById("detailCategory");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const detailMaterial = document.getElementById("detailMaterial");
const detailThickness = document.getElementById("detailThickness");
const detailInventory = document.getElementById("detailInventory");
const detailLeadTime = document.getElementById("detailLeadTime");
const detailApplications = document.getElementById("detailApplications");
const detailAddButton = document.getElementById("detailAddButton");
const detailStockNote = document.getElementById("detailStockNote");
const shippingMessage = document.getElementById("shippingMessage");
const shippingProgressBar = document.getElementById("shippingProgressBar");
const summaryItemCount = document.getElementById("summaryItemCount");
const summaryUnitCount = document.getElementById("summaryUnitCount");
const summaryCoupon = document.getElementById("summaryCoupon");
const summaryDelivery = document.getElementById("summaryDelivery");
const summaryTax = document.getElementById("summaryTax");
const summarySavings = document.getElementById("summarySavings");
const breakdownSubtotal = document.getElementById("breakdownSubtotal");
const breakdownDiscount = document.getElementById("breakdownDiscount");
const breakdownShipping = document.getElementById("breakdownShipping");
const breakdownTax = document.getElementById("breakdownTax");
const breakdownEta = document.getElementById("breakdownEta");
const couponInput = document.getElementById("couponInput");
const applyCouponButton = document.getElementById("applyCouponButton");
const removeCouponButton = document.getElementById("removeCouponButton");
const couponMessage = document.getElementById("couponMessage");
const wishlistCount = document.getElementById("wishlistCount");
const wishlistItems = document.getElementById("wishlistItems");

function currency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    }[character]));
}

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setQuoteMessage(message, state) {
    quoteMessage.textContent = message;
    quoteMessage.className = `quote-message ${state}`;
}

function clearQuoteMessage() {
    quoteMessage.textContent = "";
    quoteMessage.className = "quote-message";
}

function sanitizePlainText(value) {
    return String(value).replace(/[<>&]/g, "").trim();
}

function uniqueValues(key) {
    return [...new Set(products.map((product) => product[key]))];
}

function readStoredJson(key) {
    if (!storage) {
        return null;
    }

    try {
        const value = storage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
}

function writeStoredJson(key, value) {
    if (!storage) {
        return;
    }

    storage.setItem(key, JSON.stringify(value));
}

function removeStoredValue(key) {
    if (!storage) {
        return;
    }

    storage.removeItem(key);
}

function loadStoredSelection() {
    if (!storage) {
        return;
    }

    const storedProductId = storage.getItem(storageKeys.selectedProductId);
    if (storedProductId && productsById.has(storedProductId)) {
        selectedProductId = storedProductId;
    }
}

function loadStoredFilters() {
    const storedFilters = readStoredJson(storageKeys.filters);
    if (!storedFilters) {
        return;
    }

    if (typeof storedFilters.category === "string") {
        categoryFilter.value = storedFilters.category;
    }

    if (typeof storedFilters.collection === "string") {
        thicknessFilter.value = storedFilters.collection;
    }

    if (typeof storedFilters.sort === "string") {
        sortFilter.value = storedFilters.sort;
    }

    if (typeof storedFilters.search === "string") {
        searchInput.value = storedFilters.search;
    }
}

function saveFilters() {
    writeStoredJson(storageKeys.filters, {
        category: categoryFilter.value,
        collection: thicknessFilter.value,
        sort: sortFilter.value,
        search: searchInput.value
    });
}

function loadStoredCart() {
    const storedCart = readStoredJson(storageKeys.cart);
    if (!Array.isArray(storedCart)) {
        return;
    }

    storedCart.forEach((entry) => {
        if (!Array.isArray(entry) || entry.length !== 2) {
            return;
        }

        const [productId, quantity] = entry;
        if (!productsById.has(productId) || !Number.isInteger(quantity) || quantity <= 0) {
            return;
        }

        cart.set(productId, quantity);
    });
}

function saveCart() {
    writeStoredJson(storageKeys.cart, [...cart.entries()]);
}

function loadStoredWishlist() {
    const storedWishlist = readStoredJson(storageKeys.wishlist);
    if (!Array.isArray(storedWishlist)) {
        return;
    }

    storedWishlist.forEach((productId) => {
        if (typeof productId === "string" && productsById.has(productId)) {
            wishlist.add(productId);
        }
    });
}

function saveWishlist() {
    writeStoredJson(storageKeys.wishlist, [...wishlist]);
}

function loadStoredCoupon() {
    if (!storage) {
        return;
    }

    const storedCoupon = storage.getItem(storageKeys.coupon);
    if (storedCoupon && coupons[storedCoupon]) {
        activeCouponCode = storedCoupon;
        couponInput.value = storedCoupon;
    }
}

function setCouponMessage(message, state = "") {
    couponMessage.textContent = message;
    couponMessage.className = `coupon-message${state ? ` ${state}` : ""}`;
}

function clearCouponMessage() {
    setCouponMessage("");
}

function activeCoupon() {
    return coupons[activeCouponCode] || null;
}

function discountAmount(subtotal) {
    const coupon = activeCoupon();
    if (!coupon || subtotal <= 0) {
        return 0;
    }

    if (coupon.type === "percent") {
        return Math.min(subtotal, Number((subtotal * coupon.value).toFixed(2)));
    }

    return Math.min(subtotal, coupon.value);
}

function populateFilters() {
    uniqueValues("category").forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    uniqueValues("thickness")
        .sort((left, right) => left.localeCompare(right))
        .forEach((thickness) => {
            const option = document.createElement("option");
            option.value = thickness;
            option.textContent = thickness;
            thicknessFilter.appendChild(option);
        });

    loadStoredFilters();
}

function getFilteredProducts() {
    const category = categoryFilter.value;
    const thickness = thicknessFilter.value;
    const sortOrder = sortFilter.value;
    const term = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        const categoryMatch = category === "all" || product.category === category;
        const thicknessMatch = thickness === "all" || product.thickness === thickness;
        const termMatch = !term || [product.name, product.category, product.description, product.material, product.thickness]
            .join(" ")
            .toLowerCase()
            .includes(term);

        return categoryMatch && thicknessMatch && termMatch;
    });

    if (sortOrder === "price-asc") {
        return [...filteredProducts].sort((left, right) => left.price - right.price);
    }

    if (sortOrder === "price-desc") {
        return [...filteredProducts].sort((left, right) => right.price - left.price);
    }

    if (sortOrder === "name-asc") {
        return [...filteredProducts].sort((left, right) => left.name.localeCompare(right.name));
    }

    return filteredProducts;
}

function inventoryClass(inventory) {
    return inventory.toLowerCase().replace(/\s+/g, "-");
}

function highlightMatch(value, term) {
    const safeValue = escapeHtml(value);
    if (!term) {
        return safeValue;
    }

    const pattern = new RegExp(`(${escapeRegExp(term)})`, "ig");
    return safeValue.replace(pattern, "<mark>$1</mark>");
}

function stockMessage(product) {
    if (product.inventory === "Special order") {
        return `Limited run • ${product.stock} reserved for quick ship`;
    }

    if (product.inventory === "Low stock") {
        return `Only ${product.stock} left in stock`;
    }

    return `${product.stock} ready to ship`;
}

function clampQuantity(product, quantity) {
    return Math.min(quantity, product.stock);
}

function deliveryEstimate(entries) {
    if (!entries.length) {
        return "—";
    }

    const productsInCart = entries
        .map(([productId]) => productsById.get(productId))
        .filter(Boolean);

    if (productsInCart.some((product) => product.inventory === "Special order")) {
        return "5-7 business days";
    }

    if (productsInCart.some((product) => product.inventory === "Low stock")) {
        return "2-3 business days";
    }

    return "1-2 business days";
}

function productCard(product) {
    const term = searchInput.value.trim();
    const badge = product.badge
        ? `<span class="product-badge">${escapeHtml(product.badge)}</span>`
        : "";
    const wishlistAction = wishlist.has(product.id) ? "Saved" : "Save";
    const wishlistStateClass = wishlist.has(product.id) ? " active" : "";

    return `
        <article class="product-card">
            <div class="product-card-header">
                <div>
                    <p class="product-category">${escapeHtml(product.category)}</p>
                    <h3>${highlightMatch(product.name, term)}</h3>
                </div>
                <div class="card-pill-stack">
                    ${badge}
                    <span class="pill">${escapeHtml(product.thickness)} collection</span>
                </div>
            </div>
            <p class="product-description">${highlightMatch(product.description, term)}</p>
            <div class="product-highlights">
                <span class="inventory-pill ${inventoryClass(product.inventory)}">${escapeHtml(product.inventory)}</span>
                <span class="lead-time">${escapeHtml(product.leadTime)}</span>
            </div>
            <p class="stock-note">${escapeHtml(stockMessage(product))}</p>
            <dl class="product-meta">
                <div>
                    <dt>Material</dt>
                    <dd>${escapeHtml(product.material)}</dd>
                </div>
                <div>
                    <dt>Unit</dt>
                    <dd>${escapeHtml(product.unit)}</dd>
                </div>
            </dl>
            <div class="product-card-footer product-card-actions">
                <strong>${currency(product.price)}</strong>
                <div class="button-group">
                    <button class="btn-secondary wishlist-button${wishlistStateClass}" type="button" data-wishlist-id="${escapeHtml(product.id)}">${wishlistAction}</button>
                    <button class="btn-secondary" type="button" data-detail-id="${escapeHtml(product.id)}">View details</button>
                    <button class="btn-primary" type="button" data-product-id="${escapeHtml(product.id)}">Add to cart</button>
                </div>
            </div>
        </article>
    `;
}

function renderProductDetail(productId = selectedProductId) {
    const product = productsById.get(productId) || products[0];
    selectedProductId = product.id;

    detailIcon.textContent = product.icon;
    detailCategory.textContent = product.category;
    detailName.textContent = product.name;
    detailDescription.textContent = product.description;
    detailMaterial.textContent = product.material;
    detailThickness.textContent = product.thickness;
    detailInventory.textContent = product.inventory;
    detailLeadTime.textContent = product.leadTime;
    detailStockNote.textContent = stockMessage(product);
    detailApplications.innerHTML = product.applications
        .map((application) => `<li>${escapeHtml(application)}</li>`)
        .join("");
    detailAddButton.dataset.productId = product.id;

    if (storage) {
        storage.setItem(storageKeys.selectedProductId, product.id);
    }
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();
    resultsCount.textContent = `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`;

    if (!filteredProducts.length) {
        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products match those filters</h3>
                <p>Try another category, clear the collection filter, or search for a broader term.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map(productCard).join("");
}

function addToCart(productId, quantity = 1) {
    const product = productsById.get(productId);
    if (!product || quantity <= 0) {
        return;
    }

    const currentQuantity = cart.get(productId) || 0;
    const nextQuantity = clampQuantity(product, currentQuantity + quantity);
    if (nextQuantity === currentQuantity) {
        setQuoteMessage(`Only ${product.stock} ${product.unit}${product.stock === 1 ? "" : "s"} available for ${product.name}.`, "error");
        return;
    }

    cart.set(productId, nextQuantity);
    clearQuoteMessage();
    renderCart();
}

function updateCartQuantity(productId, nextQuantity) {
    const product = productsById.get(productId);
    if (!product) {
        cart.delete(productId);
        clearQuoteMessage();
        renderCart();
        return;
    }

    clearQuoteMessage();
    if (nextQuantity <= 0) {
        cart.delete(productId);
    } else {
        const cappedQuantity = clampQuantity(product, nextQuantity);
        if (cappedQuantity < nextQuantity) {
            setQuoteMessage(`Cart quantity capped at ${product.stock} for ${product.name}.`, "error");
        }
        cart.set(productId, cappedQuantity);
    }
    renderCart();
}

function renderCart() {
    for (const productId of [...cart.keys()]) {
        if (!productsById.has(productId)) {
            cart.delete(productId);
        }
    }

    const entries = [...cart.entries()];
    const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
    const distinctItems = entries.length;
    const subtotal = entries.reduce((sum, [productId, quantity]) => {
        const product = productsById.get(productId);
        return sum + (product ? product.price * quantity : 0);
    }, 0);
    const discount = discountAmount(subtotal);
    const discountedSubtotal = subtotal - discount;
    const freight = discountedSubtotal > 0 ? (discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING) : 0;
    const tax = discountedSubtotal > 0 ? Number((discountedSubtotal * ESTIMATED_TAX_RATE).toFixed(2)) : 0;
    const freeShippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const shippingProgress = subtotal <= 0
        ? 0
        : Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    const shippingSavings = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? STANDARD_SHIPPING : 0;
    const savings = shippingSavings + discount;
    const coupon = activeCoupon();

    cartCount.textContent = `${count} item${count === 1 ? "" : "s"}`;
    cartSubtotal.textContent = currency(subtotal);
    shippingEstimate.textContent = freight === 0 && subtotal > 0 ? "Free" : currency(freight);
    cartTotal.textContent = currency(discountedSubtotal + freight + tax);
    shippingMessage.textContent = subtotal > 0 && freeShippingGap === 0
        ? "You unlocked free shipping."
        : `Add ${currency(freeShippingGap || FREE_SHIPPING_THRESHOLD)} to unlock free shipping.`;
    shippingProgressBar.style.width = `${shippingProgress}%`;
    summaryItemCount.textContent = String(distinctItems);
    summaryUnitCount.textContent = String(count);
    summaryCoupon.textContent = coupon ? `${activeCouponCode} · ${coupon.label}` : "No coupon";
    summaryDelivery.textContent = discountedSubtotal >= FREE_SHIPPING_THRESHOLD
        ? "Free standard shipping"
        : count > 0
            ? "Standard shipping"
            : "Standard shipping";
    summaryTax.textContent = currency(tax);
    summarySavings.textContent = savings > 0 ? currency(savings) : "$0.00";
    breakdownSubtotal.textContent = currency(subtotal);
    breakdownDiscount.textContent = `-${currency(discount)}`;
    breakdownShipping.textContent = freight === 0 && subtotal > 0 ? "Free" : currency(freight);
    breakdownTax.textContent = currency(tax);
    breakdownEta.textContent = deliveryEstimate(entries);
    clearCartButton.disabled = !entries.length;
    removeCouponButton.disabled = !activeCouponCode;
    applyCouponButton.disabled = !couponInput.value.trim();
    saveCart();
    renderWishlist();

    if (!entries.length) {
        cartItems.innerHTML = `
            <div class="empty-state compact">
                <h3>Your cart is empty</h3>
                <p>Add products to start building your order.</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = entries.map(([productId, quantity]) => {
        const product = productsById.get(productId);
        return `
            <article class="cart-item">
                <div>
                    <h3>${escapeHtml(product.name)}</h3>
                    <p>${escapeHtml(product.category)} · ${escapeHtml(product.thickness)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-button" type="button" aria-label="Decrease quantity of ${escapeHtml(product.name)}" data-action="decrease" data-product-id="${escapeHtml(productId)}">−</button>
                    <span role="status" aria-live="polite">Qty: ${quantity}</span>
                    <button class="qty-button" type="button" aria-label="Increase quantity of ${escapeHtml(product.name)}" data-action="increase" data-product-id="${escapeHtml(productId)}"${quantity >= product.stock ? " disabled" : ""}>+</button>
                    <strong>${currency(product.price * quantity)}</strong>
                </div>
            </article>
        `;
    }).join("");

    if (discount > 0) {
        cartItems.innerHTML += `
            <article class="cart-item discount-row">
                <div>
                    <h3>Coupon applied</h3>
                    <p>${escapeHtml(activeCouponCode)} · ${escapeHtml(activeCoupon().label)}</p>
                </div>
                <div class="cart-item-controls">
                    <strong>-${currency(discount)}</strong>
                </div>
            </article>
        `;
    }
}

function addBundle() {
    addToCart("wireless-headphones", 1);
    addToCart("smart-desk-lamp", 1);
    addToCart("insulated-bottle", 1);
    addToCart("aroma-diffuser", 1);
}

function handleProductGridClick(event) {
    const wishlistButton = event.target.closest("button[data-wishlist-id]");
    if (wishlistButton) {
        toggleWishlist(wishlistButton.dataset.wishlistId);
        return;
    }

    const detailButton = event.target.closest("button[data-detail-id]");
    if (detailButton) {
        renderProductDetail(detailButton.dataset.detailId);
        detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    const button = event.target.closest("button[data-product-id]");
    if (!button) {
        return;
    }
    addToCart(button.dataset.productId, 1);
}

function handleCartClick(event) {
    const button = event.target.closest("button[data-product-id]");
    if (!button) {
        return;
    }

    const productId = button.dataset.productId;
    const currentQuantity = cart.get(productId) || 0;

    if (button.dataset.action === "increase") {
        updateCartQuantity(productId, currentQuantity + 1);
    }

    if (button.dataset.action === "decrease") {
        updateCartQuantity(productId, currentQuantity - 1);
    }
}

function clearFilters() {
    categoryFilter.value = "all";
    thicknessFilter.value = "all";
    sortFilter.value = "featured";
    searchInput.value = "";
    renderProducts();
    saveFilters();
}

function handleFiltersChange() {
    renderProducts();
    saveFilters();
}

function clearCart() {
    if (!cart.size) {
        return;
    }

    cart.clear();
    clearQuoteMessage();
    renderCart();
}

function renderWishlist() {
    const items = [...wishlist].map((productId) => productsById.get(productId)).filter(Boolean);
    wishlistCount.textContent = `${items.length} saved`;

    if (!items.length) {
        wishlistItems.innerHTML = `
            <div class="empty-state compact">
                <h3>No saved items</h3>
                <p>Save products to revisit them later.</p>
            </div>
        `;
        saveWishlist();
        renderProducts();
        return;
    }

    wishlistItems.innerHTML = items.map((product) => `
        <article class="wishlist-item">
            <div>
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.category)} · ${escapeHtml(product.thickness)}</p>
            </div>
            <div class="button-group">
                <button class="btn-secondary" type="button" data-wishlist-remove-id="${escapeHtml(product.id)}">Remove</button>
                <button class="btn-primary" type="button" data-wishlist-cart-id="${escapeHtml(product.id)}">Move to cart</button>
            </div>
        </article>
    `).join("");

    saveWishlist();
    renderProducts();
}

function toggleWishlist(productId) {
    if (!productsById.has(productId)) {
        return;
    }

    if (wishlist.has(productId)) {
        wishlist.delete(productId);
    } else {
        wishlist.add(productId);
    }

    renderWishlist();
}

function handleWishlistClick(event) {
    const moveButton = event.target.closest("button[data-wishlist-cart-id]");
    if (moveButton) {
        const productId = moveButton.dataset.wishlistCartId;
        wishlist.delete(productId);
        addToCart(productId, 1);
        renderWishlist();
        return;
    }

    const removeButton = event.target.closest("button[data-wishlist-remove-id]");
    if (!removeButton) {
        return;
    }

    wishlist.delete(removeButton.dataset.wishlistRemoveId);
    renderWishlist();
}

function applyCoupon() {
    const code = sanitizePlainText(couponInput.value).toUpperCase();
    if (!code || !coupons[code]) {
        activeCouponCode = "";
        removeStoredValue(storageKeys.coupon);
        setCouponMessage("Enter a valid coupon code like SAVE10 or WELCOME5.", "error");
        renderCart();
        return;
    }

    activeCouponCode = code;
    if (storage) {
        storage.setItem(storageKeys.coupon, code);
    }
    couponInput.value = code;
    setCouponMessage(`${code} applied: ${coupons[code].label}.`, "success");
    renderCart();
}

function removeCoupon() {
    if (!activeCouponCode) {
        return;
    }

    activeCouponCode = "";
    couponInput.value = "";
    removeStoredValue(storageKeys.coupon);
    clearCouponMessage();
    renderCart();
}

function handleQuoteSubmit(event) {
    event.preventDefault();

    if (!cart.size) {
        setQuoteMessage("Add at least one product before placing your order.", "error");
        return;
    }

    const customerName = sanitizePlainText(document.getElementById("customerName").value) || "customer";
    const customerEmail = document.getElementById("customerEmail").value.trim();
    setQuoteMessage(`Thanks, ${customerName}. Your order for ${cartCount.textContent} is confirmed, and a receipt will be sent to ${customerEmail}.`, "success");
    quoteForm.reset();
    cart.clear();
    activeCouponCode = "";
    removeStoredValue(storageKeys.coupon);
    clearCouponMessage();
    renderCart();
}

populateFilters();
loadStoredCart();
loadStoredWishlist();
loadStoredCoupon();
loadStoredSelection();
renderProducts();
renderCart();
renderProductDetail();

productGrid.addEventListener("click", handleProductGridClick);
cartItems.addEventListener("click", handleCartClick);
wishlistItems.addEventListener("click", handleWishlistClick);
categoryFilter.addEventListener("change", handleFiltersChange);
thicknessFilter.addEventListener("change", handleFiltersChange);
sortFilter.addEventListener("change", handleFiltersChange);
searchInput.addEventListener("input", handleFiltersChange);
clearFiltersButton.addEventListener("click", clearFilters);
clearCartButton.addEventListener("click", clearCart);
applyCouponButton.addEventListener("click", applyCoupon);
removeCouponButton.addEventListener("click", removeCoupon);
couponInput.addEventListener("input", () => {
    clearCouponMessage();
    applyCouponButton.disabled = !couponInput.value.trim();
});
quoteForm.addEventListener("submit", handleQuoteSubmit);
bundleButton.addEventListener("click", addBundle);
quoteForm.addEventListener("input", clearQuoteMessage);
detailAddButton.addEventListener("click", () => addToCart(detailAddButton.dataset.productId, 1));
