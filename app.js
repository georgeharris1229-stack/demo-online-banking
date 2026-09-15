const products = [
    {
        id: "wireless-headphones",
        name: "Wireless Headphones",
        category: "Tech",
        thickness: "Focus",
        price: 129.99,
        unit: "each",
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
        price: 68.5,
        unit: "each",
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
        price: 32.0,
        unit: "each",
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
        price: 58.0,
        unit: "each",
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
        price: 149.0,
        unit: "each",
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
        material: "Non-slip natural rubber",
        description: "Supportive mat with alignment lines for stretching, yoga, and mobility sessions.",
        inventory: "In stock",
        leadTime: "Delivers tomorrow",
        icon: "🧘",
        applications: ["Morning stretches", "Home workouts", "Meditation"]
    }
];

const cart = new Map();
const productsById = new Map(products.map((product) => [product.id, product]));
let selectedProductId = products[0].id;

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

function productCard(product) {
    return `
        <article class="product-card">
            <div class="product-card-header">
                <div>
                    <p class="product-category">${escapeHtml(product.category)}</p>
                    <h3>${escapeHtml(product.name)}</h3>
                </div>
                <span class="pill">${escapeHtml(product.thickness)} collection</span>
            </div>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-highlights">
                <span class="inventory-pill ${inventoryClass(product.inventory)}">${escapeHtml(product.inventory)}</span>
                <span class="lead-time">${escapeHtml(product.leadTime)}</span>
            </div>
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
    detailApplications.innerHTML = product.applications
        .map((application) => `<li>${escapeHtml(application)}</li>`)
        .join("");
    detailAddButton.dataset.productId = product.id;
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
    if (!productsById.has(productId) || quantity <= 0) {
        return;
    }

    const currentQuantity = cart.get(productId) || 0;
    cart.set(productId, currentQuantity + quantity);
    clearQuoteMessage();
    renderCart();
}

function updateCartQuantity(productId, nextQuantity) {
    if (!productsById.has(productId)) {
        cart.delete(productId);
        clearQuoteMessage();
        renderCart();
        return;
    }

    if (nextQuantity <= 0) {
        cart.delete(productId);
    } else {
        cart.set(productId, nextQuantity);
    }
    clearQuoteMessage();
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
    const subtotal = entries.reduce((sum, [productId, quantity]) => {
        const product = productsById.get(productId);
        return sum + (product ? product.price * quantity : 0);
    }, 0);
    const freight = subtotal > 0 ? (subtotal >= 150 ? 0 : 12.99) : 0;

    cartCount.textContent = `${count} item${count === 1 ? "" : "s"}`;
    cartSubtotal.textContent = currency(subtotal);
    shippingEstimate.textContent = freight === 0 && subtotal > 0 ? "Free" : currency(freight);
    cartTotal.textContent = currency(subtotal + freight);

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
                    <button class="qty-button" type="button" aria-label="Increase quantity of ${escapeHtml(product.name)}" data-action="increase" data-product-id="${escapeHtml(productId)}">+</button>
                    <strong>${currency(product.price * quantity)}</strong>
                </div>
            </article>
        `;
    }).join("");
}

function addBundle() {
    cart.set("wireless-headphones", (cart.get("wireless-headphones") || 0) + 1);
    cart.set("smart-desk-lamp", (cart.get("smart-desk-lamp") || 0) + 1);
    cart.set("insulated-bottle", (cart.get("insulated-bottle") || 0) + 1);
    cart.set("aroma-diffuser", (cart.get("aroma-diffuser") || 0) + 1);
    clearQuoteMessage();
    renderCart();
}

function handleProductGridClick(event) {
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
    renderCart();
}

populateFilters();
renderProducts();
renderCart();
renderProductDetail();

productGrid.addEventListener("click", handleProductGridClick);
cartItems.addEventListener("click", handleCartClick);
categoryFilter.addEventListener("change", renderProducts);
thicknessFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);
searchInput.addEventListener("input", renderProducts);
clearFiltersButton.addEventListener("click", clearFilters);
quoteForm.addEventListener("submit", handleQuoteSubmit);
bundleButton.addEventListener("click", addBundle);
quoteForm.addEventListener("input", clearQuoteMessage);
detailAddButton.addEventListener("click", () => addToCart(detailAddButton.dataset.productId, 1));
