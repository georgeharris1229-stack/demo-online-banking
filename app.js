const products = [
    {
        id: "anchor-kit",
        name: "Deluxe Anchor Kit",
        category: "Boat Parts",
        thickness: "n/a",
        price: 189.99,
        unit: "kit",
        material: "Galvanized steel",
        description: "Anchor, chain, shackles, and line sized for center console and work boats."
    },
    {
        id: "cleat-set",
        name: "316 Stainless Cleat Set",
        category: "Boat Parts",
        thickness: "n/a",
        price: 74.5,
        unit: "pair",
        material: "316 stainless steel",
        description: "Corrosion-resistant dock and deck cleats for mooring upgrades."
    },
    {
        id: "bilge-pump",
        name: "Automatic Bilge Pump",
        category: "Boat Parts",
        thickness: "n/a",
        price: 96.0,
        unit: "unit",
        material: "Composite housing",
        description: "1100 GPH pump with float switch for small craft and utility vessels."
    },
    {
        id: "marine-fasteners",
        name: "Marine Fastener Assortment",
        category: "Boat Parts",
        thickness: "n/a",
        price: 58.25,
        unit: "box",
        material: "Stainless steel",
        description: "Mixed screws, bolts, washers, and lock nuts for hardware replacements."
    },
    {
        id: "sheet-plate-18",
        name: "Mild Steel Plate",
        category: "Steel",
        thickness: "1/8\"",
        price: 84.0,
        unit: "sheet",
        material: "A36 steel",
        description: "4x8 structural plate for brackets, patch work, and general fabrication."
    },
    {
        id: "sheet-plate-316",
        name: "Mild Steel Plate",
        category: "Steel",
        thickness: "3/16\"",
        price: 126.0,
        unit: "sheet",
        material: "A36 steel",
        description: "Mid-weight plate for dock repairs, trailer reinforcement, and framing."
    },
    {
        id: "sheet-plate-14",
        name: "Mild Steel Plate",
        category: "Steel",
        thickness: "1/4\"",
        price: 158.5,
        unit: "sheet",
        material: "A36 steel",
        description: "Heavy-duty plate suited for ramps, support pads, and welded fixtures."
    },
    {
        id: "checker-plate-38",
        name: "Checker Plate",
        category: "Steel",
        thickness: "3/8\"",
        price: 214.75,
        unit: "sheet",
        material: "Carbon steel",
        description: "Slip-resistant deck plate for gangways, work platforms, and shop floors."
    },
    {
        id: "rebar-bundle",
        name: "Rebar Bundle",
        category: "Construction Materials",
        thickness: "1/2\"",
        price: 132.0,
        unit: "bundle",
        material: "Grade 60 steel",
        description: "Concrete reinforcement bundle for footings, pilings, and retaining walls."
    },
    {
        id: "angle-iron",
        name: "Angle Iron Length",
        category: "Construction Materials",
        thickness: "1/4\"",
        price: 46.25,
        unit: "length",
        material: "Hot rolled steel",
        description: "20-foot angle stock for trailers, bracing, shelving, and general fabrication."
    }
];

const cart = new Map();

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
const searchInput = document.getElementById("searchInput");
const quoteForm = document.getElementById("quoteForm");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const bundleButton = document.getElementById("bundleButton");

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
        .filter((value) => value !== "n/a")
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
    const term = searchInput.value.trim().toLowerCase();

    return products.filter((product) => {
        const categoryMatch = category === "all" || product.category === category;
        const thicknessMatch = thickness === "all" || product.thickness === thickness;
        const termMatch = !term || [product.name, product.category, product.description, product.material]
            .join(" ")
            .toLowerCase()
            .includes(term);

        return categoryMatch && thicknessMatch && termMatch;
    });
}

function productCard(product) {
    const steelMeta = product.thickness !== "n/a"
        ? `<span class="pill">${escapeHtml(product.thickness)} thickness</span>`
        : `<span class="pill neutral">Standard fitment</span>`;

    return `
        <article class="product-card">
            <div class="product-card-header">
                <div>
                    <p class="product-category">${escapeHtml(product.category)}</p>
                    <h3>${escapeHtml(product.name)}</h3>
                </div>
                ${steelMeta}
            </div>
            <p class="product-description">${escapeHtml(product.description)}</p>
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
            <div class="product-card-footer">
                <strong>${currency(product.price)}</strong>
                <button class="btn-primary" type="button" data-product-id="${escapeHtml(product.id)}">Add to cart</button>
            </div>
        </article>
    `;
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();
    resultsCount.textContent = `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`;

    if (!filteredProducts.length) {
        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products match those filters</h3>
                <p>Try another category, remove the thickness filter, or search for a broader term.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map(productCard).join("");
}

function addToCart(productId, quantity = 1) {
    const currentQuantity = cart.get(productId) || 0;
    cart.set(productId, currentQuantity + quantity);
    clearQuoteMessage();
    renderCart();
}

function updateCartQuantity(productId, nextQuantity) {
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
        if (!products.some((item) => item.id === productId)) {
            cart.delete(productId);
        }
    }

    const entries = [...cart.entries()];
    const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
    const subtotal = entries.reduce((sum, [productId, quantity]) => {
        const product = products.find((item) => item.id === productId);
        return sum + (product ? product.price * quantity : 0);
    }, 0);
    const freight = subtotal > 0 ? Math.max(45, subtotal * 0.08) : 0;

    cartCount.textContent = `${count} item${count === 1 ? "" : "s"}`;
    cartSubtotal.textContent = currency(subtotal);
    shippingEstimate.textContent = currency(freight);
    cartTotal.textContent = currency(subtotal + freight);

    if (!entries.length) {
        cartItems.innerHTML = `
            <div class="empty-state compact">
                <h3>Your cart is empty</h3>
                <p>Add marine hardware or steel stock to build a quote request.</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = entries.map(([productId, quantity]) => {
        const product = products.find((item) => item.id === productId);
        return `
            <article class="cart-item">
                <div>
                    <h3>${escapeHtml(product.name)}</h3>
                    <p>${escapeHtml(product.category)}${product.thickness !== "n/a" ? ` · ${escapeHtml(product.thickness)}` : ""}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-button" type="button" data-action="decrease" data-product-id="${escapeHtml(productId)}">−</button>
                    <span>${quantity}</span>
                    <button class="qty-button" type="button" data-action="increase" data-product-id="${escapeHtml(productId)}">+</button>
                    <strong>${currency(product.price * quantity)}</strong>
                </div>
            </article>
        `;
    }).join("");
}

function addBundle() {
    cart.set("cleat-set", (cart.get("cleat-set") || 0) + 1);
    cart.set("marine-fasteners", (cart.get("marine-fasteners") || 0) + 1);
    cart.set("sheet-plate-316", (cart.get("sheet-plate-316") || 0) + 2);
    clearQuoteMessage();
    renderCart();
}

function handleProductGridClick(event) {
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
    searchInput.value = "";
    renderProducts();
}

function handleQuoteSubmit(event) {
    event.preventDefault();

    if (!cart.size) {
        setQuoteMessage("Add at least one product before submitting a quote request.", "error");
        return;
    }

    const customerName = sanitizePlainText(document.getElementById("customerName").value) || "customer";
    setQuoteMessage(`Thanks, ${customerName}. Your quote request was prepared with ${cartCount.textContent}. Our team will email pricing and delivery options shortly.`, "success");
    quoteForm.reset();
}

populateFilters();
renderProducts();
renderCart();

productGrid.addEventListener("click", handleProductGridClick);
cartItems.addEventListener("click", handleCartClick);
categoryFilter.addEventListener("change", renderProducts);
thicknessFilter.addEventListener("change", renderProducts);
searchInput.addEventListener("input", renderProducts);
clearFiltersButton.addEventListener("click", clearFilters);
quoteForm.addEventListener("submit", handleQuoteSubmit);
bundleButton.addEventListener("click", addBundle);
quoteForm.addEventListener("input", clearQuoteMessage);
