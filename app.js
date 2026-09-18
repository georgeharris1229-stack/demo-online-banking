const products = [
    {
        id: "cleat-kit",
        name: "316 Stainless Cleat Kit",
        category: "Dock Hardware",
        thickness: "Dockside",
        badge: "Best seller",
        price: 84.99,
        unit: "kit",
        stock: 12,
        material: "316 stainless steel",
        description: "Corrosion-resistant cleat kit with backing plates and hardware for dock and deck installs.",
        inventory: "In stock",
        leadTime: "Delivers in 2 days",
        icon: "⚓",
        applications: ["Dock line tie-offs", "Bow upgrades", "Deck hardware replacement"]
    },
    {
        id: "nav-light-pair",
        name: "LED Navigation Light Pair",
        category: "Electrical",
        thickness: "Offshore",
        badge: "Editor pick",
        price: 69.5,
        unit: "pair",
        stock: 18,
        material: "Sealed marine polymer",
        description: "Low-draw red and green bow lights with waterproof housing for night visibility.",
        inventory: "In stock",
        leadTime: "Ships today",
        icon: "💡",
        applications: ["Night cruising", "Coastal compliance", "Bow refits"]
    },
    {
        id: "bilge-pump",
        name: "Automatic Bilge Pump",
        category: "Electrical",
        thickness: "Maintenance",
        badge: "Trending",
        price: 96.0,
        unit: "each",
        stock: 4,
        material: "Composite housing",
        description: "1100 GPH bilge pump with float switch for center consoles, skiffs, and utility boats.",
        inventory: "Low stock",
        leadTime: "Delivers in 3 days",
        icon: "🚤",
        applications: ["Bilge replacement", "Utility skiffs", "Emergency drainage"]
    },
    {
        id: "anchor-roller",
        name: "Anchor Roller Assembly",
        category: "Anchoring",
        thickness: "Offshore",
        price: 74.25,
        unit: "each",
        stock: 10,
        material: "Galvanized steel",
        description: "Bow roller assembly that smooths anchor deployment and protects the rub rail.",
        inventory: "In stock",
        leadTime: "Ships today",
        icon: "🪝",
        applications: ["Anchor retrieval", "Bow protection", "Trailered boats"]
    },
    {
        id: "marine-fasteners",
        name: "Marine Fastener Assortment",
        category: "Dock Hardware",
        thickness: "Maintenance",
        badge: "New",
        price: 58.0,
        unit: "box",
        stock: 9,
        material: "Stainless steel",
        description: "Mixed screws, bolts, washers, and lock nuts sized for common boat hardware service jobs.",
        inventory: "In stock",
        leadTime: "Delivers in 2 days",
        icon: "🔩",
        applications: ["Console refits", "Hatch hardware swaps", "Cleat installation"]
    },
    {
        id: "fender-two-pack",
        name: "Inflatable Fender Two-Pack",
        category: "Dock Hardware",
        thickness: "Dockside",
        price: 52.0,
        unit: "each",
        stock: 15,
        material: "UV-resistant PVC",
        description: "Twin fender set for protecting hull sides during docking, rafting, and marina tie-ups.",
        inventory: "In stock",
        leadTime: "Delivers in 2 days",
        icon: "🛟",
        applications: ["Marina slips", "Side tie docking", "Weekend rafting"]
    },
    {
        id: "vhf-radio",
        name: "Fixed Mount VHF Radio",
        category: "Electronics",
        thickness: "Offshore",
        price: 149.5,
        unit: "unit",
        stock: 3,
        material: "Marine electronics enclosure",
        description: "Water-resistant VHF radio with DSC calling and clear display for communication on the water.",
        inventory: "Low stock",
        leadTime: "Ships in 1-2 days",
        icon: "📻",
        applications: ["Safety communication", "Offshore running", "Harbor coordination"]
    },
    {
        id: "boarding-ladder",
        name: "Folding Boarding Ladder",
        category: "Deck Gear",
        thickness: "Family",
        price: 127.75,
        unit: "each",
        stock: 11,
        material: "Anodized aluminum",
        description: "Compact transom ladder with wide steps for easier boarding from the water or dock.",
        inventory: "In stock",
        leadTime: "Ships in 1-2 days",
        icon: "🪜",
        applications: ["Swim platforms", "Family cruising", "Dock reboarding"]
    },
    {
        id: "hydraulic-steering-kit",
        name: "Hydraulic Steering Kit",
        category: "Steering",
        thickness: "Offshore",
        badge: "Premium",
        price: 389.0,
        unit: "kit",
        stock: 2,
        material: "Marine-grade hoses and helm pump",
        description: "Full steering conversion kit for smoother helm response on larger center consoles.",
        inventory: "Special order",
        leadTime: "Ships in 5-7 days",
        icon: "🧭",
        applications: ["Helm upgrades", "Offshore rigs", "Repower projects"]
    },
    {
        id: "life-jacket-pack",
        name: "Adult Life Jacket Pack",
        category: "Safety",
        thickness: "Family",
        price: 119.99,
        unit: "each",
        stock: 7,
        material: "USCG-approved flotation foam",
        description: "Four-pack of adult life jackets sized for day boats, guests, and family trips.",
        inventory: "In stock",
        leadTime: "Delivers tomorrow",
        icon: "🦺",
        applications: ["Family outings", "Guest gear", "Safety compliance"]
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
const STORAGE_PREFIX = "harbor-parts-co";
const LEGACY_STORAGE_PREFIX = "lumacart";
const storageKeys = {
    cart: `${STORAGE_PREFIX}-cart`,
    filters: `${STORAGE_PREFIX}-filters`,
    selectedProductId: `${STORAGE_PREFIX}-selected-product`,
    wishlist: `${STORAGE_PREFIX}-wishlist`,
    coupon: `${STORAGE_PREFIX}-coupon`,
    user: `${STORAGE_PREFIX}-user`
};
const legacyStorageKeys = {
    cart: `${LEGACY_STORAGE_PREFIX}-cart`,
    filters: `${LEGACY_STORAGE_PREFIX}-filters`,
    selectedProductId: `${LEGACY_STORAGE_PREFIX}-selected-product`,
    wishlist: `${LEGACY_STORAGE_PREFIX}-wishlist`,
    coupon: `${LEGACY_STORAGE_PREFIX}-coupon`,
    user: `${LEGACY_STORAGE_PREFIX}-user`
};

const cart = new Map();
const wishlist = new Set();
const productsById = new Map(products.map((product) => [product.id, product]));
let selectedProductId = products[0].id;
let activeCouponCode = "";
let currentUser = null;

const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const shippingEstimate = document.getElementById("shippingEstimate");
const cartTotal = document.getElementById("cartTotal");
const quoteMessage = document.getElementById("quoteMessage");
const accountLink = document.getElementById("accountLink");
const accountStatusChip = document.getElementById("accountStatusChip");
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
const summaryAccount = document.getElementById("summaryAccount");
const summaryContact = document.getElementById("summaryContact");
const summaryAddress = document.getElementById("summaryAddress");
const summaryPayment = document.getElementById("summaryPayment");
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
const customerNameInput = document.getElementById("customerName");
const customerEmailInput = document.getElementById("customerEmail");
const shippingAddressInput = document.getElementById("projectNotes");
const paymentMethodInput = document.getElementById("paymentMethod");
const recommendationsCaption = document.getElementById("recommendationsCaption");
const recommendationsGrid = document.getElementById("recommendationsGrid");

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

function readStoredValue(key, legacyKey = "") {
    if (!storage) {
        return null;
    }

    try {
        const value = storage.getItem(key);
        if (value !== null) {
            return value;
        }

        if (!legacyKey) {
            return null;
        }

        const legacyValue = storage.getItem(legacyKey);
        if (legacyValue !== null) {
            storage.setItem(key, legacyValue);
            storage.removeItem(legacyKey);
        }

        return legacyValue;
    } catch {
        return null;
    }
}

function handleRecommendationsClick(event) {
    const detailButton = event.target.closest("button[data-recommend-detail-id]");
    if (detailButton) {
        renderProductDetail(detailButton.dataset.recommendDetailId);
        detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    const addButton = event.target.closest("button[data-recommend-id]");
    if (!addButton) {
        return;
    }

    addToCart(addButton.dataset.recommendId, 1);
}

function readStoredJson(key, legacyKey = "") {
    const value = readStoredValue(key, legacyKey);
    if (!value) {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

function writeStoredValue(key, value, legacyKey = "") {
    if (!storage) {
        return;
    }

    storage.setItem(key, value);
    if (legacyKey) {
        storage.removeItem(legacyKey);
    }
}

function writeStoredJson(key, value, legacyKey = "") {
    writeStoredValue(key, JSON.stringify(value), legacyKey);
}

function removeStoredValue(key, legacyKey = "") {
    if (!storage) {
        return;
    }

    storage.removeItem(key);
    if (legacyKey) {
        storage.removeItem(legacyKey);
    }
}

function loadStoredUser() {
    const storedUser = readStoredJson(storageKeys.user, legacyStorageKeys.user);
    if (!storedUser || typeof storedUser !== "object") {
        return;
    }

    const name = sanitizePlainText(storedUser.name || "");
    const email = String(storedUser.email || "").trim();
    if (!email) {
        return;
    }

    currentUser = {
        name: name || email.split("@")[0],
        email
    };
}

function loadStoredSelection() {
    if (!storage) {
        return;
    }

    const storedProductId = readStoredValue(storageKeys.selectedProductId, legacyStorageKeys.selectedProductId);
    if (storedProductId && productsById.has(storedProductId)) {
        selectedProductId = storedProductId;
    }
}

function loadStoredFilters() {
    const storedFilters = readStoredJson(storageKeys.filters, legacyStorageKeys.filters);
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
    }, legacyStorageKeys.filters);
}

function loadStoredCart() {
    const storedCart = readStoredJson(storageKeys.cart, legacyStorageKeys.cart);
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
    writeStoredJson(storageKeys.cart, [...cart.entries()], legacyStorageKeys.cart);
}

function loadStoredWishlist() {
    const storedWishlist = readStoredJson(storageKeys.wishlist, legacyStorageKeys.wishlist);
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
    writeStoredJson(storageKeys.wishlist, [...wishlist], legacyStorageKeys.wishlist);
}

function loadStoredCoupon() {
    if (!storage) {
        return;
    }

    const storedCoupon = readStoredValue(storageKeys.coupon, legacyStorageKeys.coupon);
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

function renderAccountStatus() {
    const label = currentUser ? `Hi, ${currentUser.name}` : "Guest";
    accountStatusChip.textContent = label;
    accountLink.textContent = currentUser ? "Account" : "Login";
}

function shippingPreview() {
    const value = sanitizePlainText(shippingAddressInput.value);
    return value || "Add a shipping address";
}

function contactPreview() {
    const name = sanitizePlainText(customerNameInput.value);
    const email = customerEmailInput.value.trim();

    if (name && email) {
        return `${name} · ${email}`;
    }

    if (email) {
        return email;
    }

    if (currentUser?.email) {
        return currentUser.email;
    }

    return "Add your email";
}

function paymentPreview() {
    return paymentMethodInput.value || "Card ending in 4242";
}

function renderCheckoutContext() {
    summaryAccount.textContent = currentUser ? `${currentUser.name} account` : "Guest checkout";
    summaryContact.textContent = contactPreview();
    summaryAddress.textContent = shippingPreview();
    summaryPayment.textContent = paymentPreview();
}

function recommendationScore(product, baseProduct) {
    let score = 0;

    if (product.category === baseProduct.category) {
        score += 4;
    }

    if (product.thickness === baseProduct.thickness) {
        score += 2;
    }

    if (product.badge) {
        score += 1;
    }

    if (!cart.has(product.id)) {
        score += 1;
    }

    if (product.inventory === "In stock") {
        score += 1;
    }

    return score;
}

function recommendationReason(product, baseProduct) {
    if (product.category === baseProduct.category && product.thickness === baseProduct.thickness) {
        return `Matches your ${baseProduct.thickness} ${baseProduct.category.toLowerCase()} pick`;
    }

    if (product.category === baseProduct.category) {
        return `Another popular ${product.category.toLowerCase()} pick`;
    }

    if (product.thickness === baseProduct.thickness) {
        return `More for ${product.thickness} fitment`;
    }

    return "Popular with shoppers like you";
}

function renderRecommendations() {
    const baseProduct = productsById.get(selectedProductId) || products[0];
    const recommendedProducts = products
        .filter((product) => product.id !== baseProduct.id)
        .sort((left, right) => recommendationScore(right, baseProduct) - recommendationScore(left, baseProduct))
        .slice(0, 3);

    recommendationsCaption.textContent = cart.size
        ? `Inspired by ${baseProduct.name} and tuned around what is already in your cart.`
        : `Inspired by ${baseProduct.name}.`;

    recommendationsGrid.innerHTML = recommendedProducts.map((product) => `
        <article class="recommendation-card">
            <p class="product-category">${escapeHtml(product.category)}</p>
            <h3>${escapeHtml(product.name)}</h3>
            <p class="product-description">${escapeHtml(recommendationReason(product, baseProduct))}</p>
            <div class="product-highlights">
                <span class="inventory-pill ${inventoryClass(product.inventory)}">${escapeHtml(product.inventory)}</span>
                <span class="lead-time">${escapeHtml(product.leadTime)}</span>
            </div>
            <div class="product-card-footer product-card-actions">
                <strong>${currency(product.price)}</strong>
                <div class="button-group">
                    <button class="btn-secondary" type="button" data-recommend-detail-id="${escapeHtml(product.id)}">View</button>
                    <button class="btn-primary" type="button" data-recommend-id="${escapeHtml(product.id)}">Add</button>
                </div>
            </div>
        </article>
    `).join("");
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
                    <span class="pill">${escapeHtml(product.thickness)} fitment</span>
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

    writeStoredValue(storageKeys.selectedProductId, product.id, legacyStorageKeys.selectedProductId);

    renderRecommendations();
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();
    resultsCount.textContent = `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`;

    if (!filteredProducts.length) {
        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products match those filters</h3>
                <p>Try another category, clear the fitment filter, or search for a broader term.</p>
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
    const freeShippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
    const shippingProgress = discountedSubtotal <= 0
        ? 0
        : Math.min(100, Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
    const shippingSavings = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? STANDARD_SHIPPING : 0;
    const savings = shippingSavings + discount;
    const coupon = activeCoupon();

    cartCount.textContent = `${count} item${count === 1 ? "" : "s"}`;
    cartSubtotal.textContent = currency(subtotal);
    shippingEstimate.textContent = freight === 0 && subtotal > 0 ? "Free" : currency(freight);
    cartTotal.textContent = currency(discountedSubtotal + freight + tax);
    shippingMessage.textContent = discountedSubtotal > 0 && freeShippingGap === 0
        ? "You unlocked free shipping."
        : `Add ${currency(freeShippingGap || FREE_SHIPPING_THRESHOLD)} to unlock free shipping.`;
    shippingProgressBar.style.width = `${shippingProgress}%`;
    summaryItemCount.textContent = String(distinctItems);
    summaryUnitCount.textContent = String(count);
    summaryCoupon.textContent = coupon ? `${activeCouponCode} · ${coupon.label}` : "No coupon";
    summaryDelivery.textContent = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? "Free standard shipping" : "Standard shipping";
    summaryTax.textContent = currency(tax);
    summarySavings.textContent = savings > 0 ? currency(savings) : "$0.00";
    breakdownSubtotal.textContent = currency(subtotal);
    breakdownDiscount.textContent = `-${currency(discount)}`;
    breakdownShipping.textContent = freight === 0 && subtotal > 0 ? "Free" : currency(freight);
    breakdownTax.textContent = currency(tax);
    breakdownEta.textContent = deliveryEstimate(entries);
    renderCheckoutContext();
    clearCartButton.disabled = !entries.length;
    removeCouponButton.disabled = !activeCouponCode;
    applyCouponButton.disabled = !couponInput.value.trim();
    saveCart();
    renderWishlist();
    renderRecommendations();

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
    addToCart("cleat-kit", 1);
    addToCart("marine-fasteners", 1);
    addToCart("nav-light-pair", 1);
    addToCart("bilge-pump", 1);
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
        removeStoredValue(storageKeys.coupon, legacyStorageKeys.coupon);
        setCouponMessage("Enter a valid coupon code like SAVE10 or WELCOME5.", "error");
        renderCart();
        return;
    }

    activeCouponCode = code;
    writeStoredValue(storageKeys.coupon, code, legacyStorageKeys.coupon);
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
    removeStoredValue(storageKeys.coupon, legacyStorageKeys.coupon);
    clearCouponMessage();
    renderCart();
}

function handleQuoteSubmit(event) {
    event.preventDefault();

    if (!currentUser) {
        setQuoteMessage("Sign in from the login page before placing your order.", "error");
        return;
    }

    if (!cart.size) {
        setQuoteMessage("Add at least one product before placing your order.", "error");
        return;
    }

    const customerName = sanitizePlainText(customerNameInput.value) || currentUser.name || "customer";
    const customerEmail = customerEmailInput.value.trim() || currentUser.email;
    setQuoteMessage(`Thanks, ${customerName}. Your order for ${cartCount.textContent} is confirmed, and a receipt will be sent to ${customerEmail}.`, "success");
    quoteForm.reset();
    cart.clear();
    activeCouponCode = "";
    couponInput.value = "";
    removeStoredValue(storageKeys.coupon, legacyStorageKeys.coupon);
    clearCouponMessage();
    customerNameInput.value = currentUser.name;
    customerEmailInput.value = currentUser.email;
    renderCart();
}

populateFilters();
loadStoredUser();
loadStoredCart();
loadStoredWishlist();
loadStoredCoupon();
loadStoredSelection();
renderAccountStatus();
customerNameInput.value = currentUser?.name || "";
customerEmailInput.value = currentUser?.email || "";
renderProducts();
renderCart();
renderProductDetail();
renderRecommendations();

productGrid.addEventListener("click", handleProductGridClick);
cartItems.addEventListener("click", handleCartClick);
recommendationsGrid.addEventListener("click", handleRecommendationsClick);
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
customerNameInput.addEventListener("input", renderCheckoutContext);
customerEmailInput.addEventListener("input", renderCheckoutContext);
shippingAddressInput.addEventListener("input", renderCheckoutContext);
paymentMethodInput.addEventListener("change", renderCheckoutContext);
quoteForm.addEventListener("submit", handleQuoteSubmit);
bundleButton.addEventListener("click", addBundle);
quoteForm.addEventListener("input", clearQuoteMessage);
detailAddButton.addEventListener("click", () => addToCart(detailAddButton.dataset.productId, 1));
