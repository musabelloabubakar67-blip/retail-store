const STATE_KEY = "retailos-prototype-state-v5";
const CART_KEY = "retailos-prototype-cart-v5";
const POS_CART_KEY = "retailos-prototype-pos-cart-v5";
const BASE_PATH = window.__APP_BASE_PATH__ || "";

function appPathFromLocation() {
  const pathname = location.pathname || "/";
  if (BASE_PATH && pathname === BASE_PATH) return "/";
  if (BASE_PATH && pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length) || "/";
  return pathname;
}

function appUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

function assetUrl(path) {
  return `${BASE_PATH}/${path.replace(/^\/+/, "")}`;
}

const CONFIG = {
  businessName: "RetailOS Store",
  sameDayCutoff: "12:00 PM",
  pickupReadyBy: "4:00 PM",
  transferReadyText: "Pickup ready in 1-2 business days after confirmation",
  currency: "NGN"
};

const seedState = {
  role: "owner",
  nextOrderId: 1004,
  nextSaleId: 4,
  nextTransferId: 4,
  nextMovementId: 14,
  products: [
    {
      id: "p1",
      sku: "BAG-001",
      slug: "everyday-tote-bag",
      name: "Everyday Tote Bag",
      category: "Bags",
      priceKobo: 1850000,
      costKobo: 1120000,
      initials: "TB",
      palette: "teal",
      description: "Structured daily tote with reinforced handles and a lined inner pocket.",
      details: ["Soft grain finish", "Laptop sleeve", "Zip closure"],
      tags: ["Popular", "Work"]
    },
    {
      id: "p2",
      sku: "SHO-104",
      slug: "urban-runner-sneakers",
      name: "Urban Runner Sneakers",
      category: "Shoes",
      priceKobo: 4250000,
      costKobo: 2910000,
      initials: "UR",
      palette: "blue",
      description: "Lightweight sneakers for errands, travel, and everyday movement.",
      details: ["Cushioned sole", "Breathable upper", "True to size"],
      tags: ["New", "Unisex"]
    },
    {
      id: "p3",
      sku: "TSH-210",
      slug: "cotton-logo-tee",
      name: "Cotton Logo Tee",
      category: "Apparel",
      priceKobo: 950000,
      costKobo: 420000,
      initials: "CT",
      palette: "rose",
      description: "Midweight cotton tee with a clean retail logo mark.",
      details: ["100% cotton", "Regular fit", "Machine washable"],
      tags: ["Basics", "Restocked"]
    },
    {
      id: "p4",
      sku: "WCH-032",
      slug: "classic-wristwatch",
      name: "Classic Wristwatch",
      category: "Accessories",
      priceKobo: 3675000,
      costKobo: 2140000,
      initials: "CW",
      palette: "amber",
      description: "Minimal analogue wristwatch with a polished case and leather strap.",
      details: ["Leather strap", "Water resistant", "Gift boxed"],
      tags: ["Gift"]
    },
    {
      id: "p5",
      sku: "CAP-018",
      slug: "structured-face-cap",
      name: "Structured Face Cap",
      category: "Apparel",
      priceKobo: 720000,
      costKobo: 310000,
      initials: "FC",
      palette: "slate",
      description: "Structured cap with adjustable back strap and embroidered front panel.",
      details: ["Adjustable", "Curved brim", "Embroidered mark"],
      tags: ["Casual"]
    }
  ],
  stock: {
    p1: { warehouse: { quantity: 32, reserved: 1 }, shop: { quantity: 6, reserved: 0 }, quarantine: 0 },
    p2: { warehouse: { quantity: 19, reserved: 0 }, shop: { quantity: 3, reserved: 0 }, quarantine: 0 },
    p3: { warehouse: { quantity: 80, reserved: 6 }, shop: { quantity: 14, reserved: 0 }, quarantine: 1 },
    p4: { warehouse: { quantity: 12, reserved: 0 }, shop: { quantity: 2, reserved: 1 }, quarantine: 0 },
    p5: { warehouse: { quantity: 41, reserved: 0 }, shop: { quantity: 5, reserved: 0 }, quarantine: 0 }
  },
  transfers: [
    { id: 1, productId: "p3", quantity: 6, status: "pending", createdBy: "manager", createdAt: "2026-07-08T08:16:00.000Z", source: "Low shop stock" },
    { id: 2, productId: "p2", quantity: 2, status: "in-transit", createdBy: "manager", dispatchedBy: "warehouse", createdAt: "2026-07-08T08:28:00.000Z", dispatchedAt: "2026-07-08T08:40:00.000Z", source: "Manual replenishment" },
    { id: 3, productId: "p1", quantity: 3, status: "confirmed", createdBy: "manager", dispatchedBy: "warehouse", receivedBy: "cashier", createdAt: "2026-07-08T07:05:00.000Z", dispatchedAt: "2026-07-08T07:20:00.000Z", receivedAt: "2026-07-08T07:52:00.000Z", source: "Opening floor stock" }
  ],
  orders: [
    {
      id: "ORD-1001",
      customer: { name: "Amina Yusuf", phone: "0803 111 2222", email: "amina@example.com" },
      items: [{ productId: "p1", quantity: 1, fulfilment: "delivery", priceKobo: 1850000 }],
      status: "paid",
      totalKobo: 1850000,
      address: "12 Admiralty Way, Lekki",
      createdAt: "2026-07-08T08:45:00.000Z"
    },
    {
      id: "ORD-1002",
      customer: { name: "David Okoro", phone: "0812 333 4444", email: "david@example.com" },
      items: [{ productId: "p4", quantity: 1, fulfilment: "pickup", priceKobo: 3675000, pickupPath: "shop" }],
      status: "ready-for-pickup",
      totalKobo: 3675000,
      address: "",
      createdAt: "2026-07-08T09:10:00.000Z"
    }
  ],
  sales: [
    { id: 1, channel: "pos", items: [{ productId: "p3", quantity: 1, priceKobo: 950000 }], totalKobo: 950000, paymentMethod: "Cash", at: "2026-07-08T08:03:00.000Z" },
    { id: 2, channel: "pos", items: [{ productId: "p5", quantity: 2, priceKobo: 720000 }], totalKobo: 1440000, paymentMethod: "Transfer", at: "2026-07-08T08:31:00.000Z" },
    { id: 3, channel: "online", items: [{ productId: "p1", quantity: 1, priceKobo: 1850000 }], totalKobo: 1850000, paymentMethod: "Paystack", at: "2026-07-08T08:45:00.000Z" }
  ],
  movements: [
    { id: 1, type: "receiving", productId: "p1", quantity: 35, location: "warehouse", actor: "owner", note: "Opening stocktake", at: "2026-07-08T07:00:00.000Z" },
    { id: 2, type: "receiving", productId: "p2", quantity: 21, location: "warehouse", actor: "owner", note: "Opening stocktake", at: "2026-07-08T07:00:00.000Z" },
    { id: 3, type: "receiving", productId: "p3", quantity: 86, location: "warehouse", actor: "owner", note: "Opening stocktake", at: "2026-07-08T07:00:00.000Z" },
    { id: 4, type: "receiving", productId: "p4", quantity: 14, location: "warehouse", actor: "owner", note: "Opening stocktake", at: "2026-07-08T07:00:00.000Z" },
    { id: 5, type: "receiving", productId: "p5", quantity: 46, location: "warehouse", actor: "owner", note: "Opening stocktake", at: "2026-07-08T07:00:00.000Z" },
    { id: 6, type: "transfer", productId: "p1", quantity: 3, location: "warehouse-to-shop", actor: "manager", note: "Transfer task created", at: "2026-07-08T07:05:00.000Z" },
    { id: 7, type: "transfer", productId: "p1", quantity: 3, location: "in-transit", actor: "warehouse", note: "Dispatched from warehouse", at: "2026-07-08T07:20:00.000Z" },
    { id: 8, type: "transfer", productId: "p1", quantity: 3, location: "shop", actor: "cashier", note: "Received at shop", at: "2026-07-08T07:52:00.000Z" },
    { id: 9, type: "sale", productId: "p3", quantity: 1, location: "shop", actor: "cashier", note: "POS sale #1", at: "2026-07-08T08:03:00.000Z" },
    { id: 10, type: "sale", productId: "p5", quantity: 2, location: "shop", actor: "cashier", note: "POS sale #2", at: "2026-07-08T08:31:00.000Z" },
    { id: 11, type: "reservation", productId: "p1", quantity: 1, location: "warehouse", actor: "system", note: "Online order ORD-1001 reserved for delivery", at: "2026-07-08T08:45:00.000Z" },
    { id: 12, type: "reservation", productId: "p4", quantity: 1, location: "shop", actor: "system", note: "Online order ORD-1002 reserved for pickup", at: "2026-07-08T09:10:00.000Z" },
    { id: 13, type: "adjustment", productId: "p3", quantity: 1, location: "quarantine", actor: "manager", note: "Damaged return quarantined", at: "2026-07-08T09:15:00.000Z" }
  ],
  paymentMethods: ["Cash", "Card", "Transfer"]
};

let state = loadJson(STATE_KEY, seedState);
let cart = loadJson(CART_KEY, []);
let posCart = loadJson(POS_CART_KEY, []);
let checkoutDraft = {
  name: "Demo Customer",
  phone: "0800 000 0000",
  email: "customer@example.com",
  address: "15 Demo Street, Lagos"
};

const staffRoutes = new Set([
  "/staff",
  "/pos",
  "/admin",
  "/admin/inventory",
  "/admin/transfers",
  "/admin/receiving",
  "/admin/orders",
  "/admin/returns",
  "/admin/audit"
]);

const routeTitles = {
  "/pos": "Shop POS",
  "/admin": "Management Dashboard",
  "/admin/inventory": "Inventory",
  "/admin/transfers": "Transfers",
  "/admin/receiving": "Receiving",
  "/admin/orders": "Online Orders",
  "/admin/returns": "Returns",
  "/admin/audit": "Audit"
};

const $ = (selector) => document.querySelector(selector);

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function saveAll() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  localStorage.setItem(POS_CART_KEY, JSON.stringify(posCart));
}

function productById(id) {
  return state.products.find((product) => product.id === id);
}

function productBySlug(slug) {
  return state.products.find((product) => product.slug === slug);
}

function available(productId, location) {
  const level = state.stock[productId][location];
  return level.quantity - level.reserved;
}

function money(kobo) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: CONFIG.currency,
    maximumFractionDigits: 0
  }).format(kobo / 100);
}

function nowIso() {
  return new Date().toISOString();
}

function navigate(path, replace = false) {
  if (replace) history.replaceState({}, "", appUrl(path));
  else history.pushState({}, "", appUrl(path));
  render();
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toast.timeout);
  toast.timeout = window.setTimeout(() => element.classList.remove("show"), 2600);
}

function addMovement(type, productId, quantity, location, note, actor = state.role) {
  state.movements.unshift({
    id: state.nextMovementId++,
    type,
    productId,
    quantity,
    location,
    actor,
    note,
    at: nowIso()
  });
}

function totals() {
  const warehouse = state.products.reduce((sum, product) => sum + available(product.id, "warehouse"), 0);
  const shop = state.products.reduce((sum, product) => sum + available(product.id, "shop"), 0);
  const reserved = state.products.reduce((sum, product) => sum + state.stock[product.id].warehouse.reserved + state.stock[product.id].shop.reserved, 0);
  const inTransit = state.transfers.filter((transfer) => transfer.status === "in-transit").reduce((sum, transfer) => sum + transfer.quantity, 0);
  const sales = state.sales.reduce((sum, sale) => sum + sale.totalKobo, 0);
  return { warehouse, shop, reserved, inTransit, sales };
}

function render() {
  saveAll();
  const path = appPathFromLocation() === "/staff" ? "/pos" : appPathFromLocation();
  const app = $("#app");
  if (path !== appPathFromLocation()) {
    history.replaceState({}, "", appUrl(path));
  }

  if (staffRoutes.has(path)) {
    app.innerHTML = renderStaffShell(path);
  } else {
    app.innerHTML = renderPublicShell(path);
  }
  hydrateRouteLinks();
}

function renderPublicShell(path) {
  return `
    <header class="site-header public-header">
      <a class="brand" href="/" data-route="/">
        <span class="brand-mark">RO</span>
        <span><strong>${CONFIG.businessName}</strong><small>Online store</small></span>
      </a>
      <nav class="public-nav" aria-label="Customer navigation">
        ${navLink("/", "Home", path)}
        ${navLink("/products", "Shop", path)}
        ${navLink("/cart", `Cart <span class="badge">${cartCount()}</span>`, path)}
      </nav>
      <div class="public-actions" aria-label="Store actions">
        <span aria-hidden="true">Search</span>
        <span aria-hidden="true">Account</span>
        <a href="/cart" data-route="/cart" aria-label="Cart">${cartCount()}</a>
      </div>
    </header>
    <main class="public-shell">${renderPublicPage(path)}</main>
  `;
}

function renderStaffShell(path) {
  const t = totals();
  return `
    <header class="site-header staff-mobile-header">
      <a class="brand" href="/pos" data-route="/pos">
        <span class="brand-mark">IN</span>
        <span><strong>Internal</strong><small>${routeTitles[path] || "Staff"}</small></span>
      </a>
      <a class="quiet-link" href="/" data-route="/">Storefront</a>
    </header>
    <main class="staff-shell">
      <aside class="staff-sidebar">
        <div class="staff-brand">
          <span class="brand-mark">IN</span>
          <span><strong>RetailOS Internal</strong><small>POS, warehouse, admin</small></span>
        </div>
        <nav class="staff-nav" aria-label="Staff navigation">
          ${staffNav("/pos", "POS", path)}
          ${staffNav("/admin", "Dashboard", path)}
          ${staffNav("/admin/orders", "Online orders", path)}
          ${staffNav("/admin/inventory", "Inventory", path)}
          ${staffNav("/admin/transfers", "Transfers", path)}
          ${staffNav("/admin/receiving", "Receiving", path)}
          ${staffNav("/admin/returns", "Returns", path)}
          ${staffNav("/admin/audit", "Audit", path)}
          ${staffNav("/", "Storefront", path)}
        </nav>
        <div class="role-box">
          <label>Active role<select id="roleSelect">${["owner", "manager", "cashier", "warehouse"].map((role) => `<option value="${role}" ${state.role === role ? "selected" : ""}>${titleCase(role)}</option>`).join("")}</select></label>
          <button class="ghost-button" data-action="reset-demo">Reset demo data</button>
        </div>
      </aside>
      <section class="staff-main">
        <header class="staff-topbar">
          <div><p class="eyebrow">Single inventory source</p><h1>${routeTitles[path] || "Staff"}</h1></div>
          <div class="stock-strip">
            <span>Warehouse ${t.warehouse}</span>
            <span>Shop ${t.shop}</span>
            <span>Reserved ${t.reserved}</span>
            <span>In transit ${t.inTransit}</span>
          </div>
        </header>
        ${renderStaffPage(path)}
      </section>
    </main>
  `;
}

function navLink(href, label, path) {
  return `<a href="${appUrl(href)}" data-route="${href}" class="${path === href ? "active" : ""}">${label}</a>`;
}

function staffNav(href, label, path) {
  return `<a href="${appUrl(href)}" data-route="${href}" class="${path === href ? "active" : ""}">${label}</a>`;
}

function hydrateRouteLinks() {
  document.querySelectorAll("a[data-route]").forEach((link) => {
    link.setAttribute("href", appUrl(link.getAttribute("data-route")));
  });
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderPublicPage(path) {
  if (path === "/") return renderHomePage();
  if (path === "/products") return renderShopPage();
  if (path.startsWith("/products/")) return renderProductDetail(path.split("/").pop());
  if (path === "/cart") return renderCartPage();
  if (path === "/checkout") return renderCheckoutPage();
  if (path.startsWith("/order/")) return renderOrderConfirmation(path.split("/").pop());
  return renderShopPage();
}

function renderHomePage() {
  return `
    ${renderEditorialHero()}
    ${renderStoreBenefits()}
    ${renderCategoryMosaic()}
    ${renderHomeFeatureSection()}
    ${renderFulfilmentEditorial()}
    ${renderBestsellerStrip()}
  `;
}

function renderShopPage() {
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "All";
  const query = params.get("q") || "";
  const products = filteredProducts(category, query);
  const isFiltered = category !== "All" || query.trim();
  return `
    <section class="shop-hero">
      <p class="eyebrow">Shop</p>
      <h1>Choose delivery or pickup.</h1>
      <p>Browse available pieces, then select delivery or pickup at checkout.</p>
    </section>
    <section class="store-controls editorial-controls" id="products">
      <label>Search<input id="storeSearch" type="search" value="${escapeAttr(query)}" placeholder="Search products or SKU" /></label>
      <label>Category<select id="categoryFilter">${["All", ...categories()].map((item) => `<option value="${item}" ${item === category ? "selected" : ""}>${item}</option>`).join("")}</select></label>
    </section>
    <section class="editorial-section">
      ${renderSectionHeader(isFiltered ? "Shop results" : "All products", isFiltered ? "Matching products" : "The full collection", `${products.length} product${products.length === 1 ? "" : "s"} ready to shop.`)}
      <div class="product-grid editorial-product-grid">
        ${products.map(renderProductCard).join("") || `<div class="empty-state">No matching products.</div>`}
      </div>
    </section>
  `;
}

function renderEditorialHero() {
  const heroProduct = state.products[0];
  return `
    <section class="editorial-hero">
      <div class="hero-copy editorial-hero-copy">
        <p class="eyebrow">New season edit</p>
        <h1>Everyday pieces, ready your way.</h1>
        <p>Timeless design. Thoughtful details. Made for how you shop.</p>
        <div class="hero-actions">
          <a class="primary-button button-link" href="/products" data-route="/products">Shop now</a>
        </div>
      </div>
      ${renderFeatureTile(heroProduct, "large", "Featured")}
    </section>
  `;
}

function renderStoreBenefits() {
  const benefits = [
    ["Delivery", "Fast and reliable to your door"],
    ["Pickup", "Collect at your convenience"],
    ["Secure payments", "Pay safely with trusted partners"],
    ["Easy returns", "Simple returns within 14 days"]
  ];
  return `<section class="store-benefits">${benefits.map(([title, copy]) => `<article><span aria-hidden="true"></span><strong>${title}</strong><p>${copy}</p></article>`).join("")}</section>`;
}

function renderHomeFeatureSection() {
  return `
    <section class="editorial-section">
      ${renderSectionHeader("Best sellers", "Best sellers", "Favourite pieces with clear delivery and pickup choices.", `<a class="quiet-link" href="/products" data-route="/products">View all</a>`)}
      <div class="product-grid editorial-product-grid">
        ${state.products.slice(0, 4).map(renderProductCard).join("")}
      </div>
    </section>
  `;
}

function renderSectionHeader(kicker, title, copy, action = "") {
  return `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${kicker}</p>
        <h2>${title}</h2>
      </div>
      <p>${copy}</p>
      ${action}
    </div>
  `;
}

function renderFeatureTile(product, size, label) {
  const promise = fulfilmentPromise(product.id, "delivery");
  return `
    <a href="/products/${product.slug}" data-route="/products/${product.slug}" class="feature-tile feature-tile-${size} product-shot category-shot" style="${productImageStyle(product)}">
      <span>${label}</span>
      <strong>${product.name}</strong>
      <em>${money(product.priceKobo)} - ${promise.available ? "Delivery available" : "Pickup available"}</em>
    </a>
  `;
}

function renderFulfilmentEditorial() {
  const featureProduct = productById("p4");
  return `
    <section class="editorial-story">
      <div class="story-image product-shot category-shot" style="${productImageStyle(featureProduct)}"></div>
      <div class="story-copy">
        <p class="eyebrow">Delivery and pickup</p>
        <h2>Choose the option that fits your day.</h2>
        <p>Some pieces are ready for same-day pickup, while others are best for delivery. If pickup needs extra time, the ready window is shown clearly before checkout.</p>
        <div class="story-metrics">
          <span><strong>01</strong> Choose a product</span>
          <span><strong>02</strong> Pick delivery or pickup</span>
          <span><strong>03</strong> Confirm your order</span>
        </div>
      </div>
    </section>
  `;
}

function renderCategoryMosaic() {
  return `
    <section class="editorial-section">
      ${renderSectionHeader("Shop by category", "Shop by category", "Browse the collection by category.", `<a class="quiet-link" href="/products" data-route="/products">View all</a>`)}
      <div class="category-mosaic">
        ${categories().map((category, index) => renderCategoryTile(category, index)).join("")}
      </div>
    </section>
  `;
}

function renderCategoryTile(category, index) {
  const sizeClass = index === 0 ? "wide" : index === 2 ? "tall" : "";
  const count = state.products.filter((item) => item.category === category).length;
  return `
    <a href="/products?category=${encodeURIComponent(category)}" data-route="/products?category=${encodeURIComponent(category)}" class="category-tile ${sizeClass} category-shot" style="${categoryVisualStyle(category)}">
      <span>${category}</span>
      <strong>${count} product${count === 1 ? "" : "s"}</strong>
    </a>
  `;
}

function categoryImageUrl(category) {
  const images = {
    Bags: assetUrl("assets/category-bags.png"),
    Shoes: assetUrl("assets/category-shoes.png"),
    Apparel: assetUrl("assets/category-apparel.png"),
    Accessories: assetUrl("assets/category-accessories.png")
  };
  return images[category] || assetUrl("assets/storefront-hero.png");
}

function categoryImageFocus(category) {
  const focus = {
    Bags: "50% 52%",
    Shoes: "50% 56%",
    Apparel: "50% 48%",
    Accessories: "50% 52%"
  };
  return focus[category] || "50% 50%";
}

function categoryVisualStyle(category) {
  return `--category-image: url(${categoryImageUrl(category)}); --category-focus: ${categoryImageFocus(category)};`;
}

function renderBestsellerStrip() {
  return `
    <section class="editorial-section">
      ${renderSectionHeader("Editorial", "Designed to move with you", "Functional pieces. Elevated materials. Simple ways to receive your order.", `<a class="quiet-link" href="/products" data-route="/products">Explore the collection</a>`)}
      <div class="best-seller-strip">
        ${state.products.slice(0, 4).map(renderCompactProductCard).join("")}
      </div>
    </section>
  `;
}

function renderCompactProductCard(product) {
  return `
    <article class="compact-product">
      <a href="/products/${product.slug}" data-route="/products/${product.slug}" class="compact-product-image product-shot category-shot" style="${productImageStyle(product)}"><span>${product.initials}</span></a>
      <div>
        <span>${product.category}</span>
        <strong><a href="/products/${product.slug}" data-route="/products/${product.slug}">${product.name}</a></strong>
        <em>${money(product.priceKobo)}</em>
      </div>
    </article>
  `;
}

function filteredProducts(category, query) {
  return state.products.filter((product) => {
    const categoryMatch = category === "All" || product.category === category;
    const queryMatch = `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  });
}

function categories() {
  return [...new Set(state.products.map((product) => product.category))];
}

function renderProductCard(product) {
  const delivery = fulfilmentPromise(product.id, "delivery");
  const pickup = fulfilmentPromise(product.id, "pickup");
  return `
    <article class="product-card">
      <a href="/products/${product.slug}" data-route="/products/${product.slug}" class="product-media product-shot category-shot ${product.palette}" style="${productImageStyle(product)}">
        <span>${product.initials}</span>
      </a>
      <div class="product-body">
        <div>
          <div class="product-meta">${product.category} - ${product.sku}</div>
          <h2><a href="/products/${product.slug}" data-route="/products/${product.slug}">${product.name}</a></h2>
        </div>
        <strong class="price">${money(product.priceKobo)}</strong>
        <div class="fulfilment-list">
          ${delivery.available ? `<span class="pill status-ok">Delivery available</span>` : ""}
          ${pickup.available ? `<span class="pill ${pickup.needsTransfer ? "status-in-transit" : "status-ok"}">${pickup.label}</span>` : ""}
          ${!delivery.available && !pickup.available ? `<span class="pill status-none">Out of stock</span>` : ""}
        </div>
        <p class="helper-text">${delivery.available ? delivery.copy : pickup.copy}</p>
        <div class="split-actions">
          <button class="primary-button" data-add-cart="${product.id}" data-fulfilment="delivery" ${delivery.available ? "" : "disabled"}>Delivery</button>
          <button class="outline-button" data-add-cart="${product.id}" data-fulfilment="pickup" ${pickup.available ? "" : "disabled"}>Pickup</button>
        </div>
      </div>
    </article>
  `;
}

function fulfilmentPromise(productId, fulfilment) {
  const warehouse = available(productId, "warehouse");
  const shop = available(productId, "shop");

  if (fulfilment === "delivery") {
    if (warehouse > 0) {
      return { available: true, label: "Delivery available", copy: "Delivery is available for this item.", needsTransfer: false };
    }
    return shop > 0
      ? { available: false, label: "Delivery unavailable", copy: "Pickup is available today. Delivery is not available for this item right now.", needsTransfer: false }
      : { available: false, label: "Out of stock", copy: "This item is currently unavailable.", needsTransfer: false };
  }

  if (shop > 0) {
    return { available: true, label: "Pickup today", copy: `Pickup today if ordered before ${CONFIG.sameDayCutoff}. Ready by ${CONFIG.pickupReadyBy}.`, needsTransfer: false };
  }
  if (warehouse > 0) {
    return { available: true, label: "Pickup in 1-2 days", copy: `Delivery is recommended for fastest service. Pickup can still be arranged. ${CONFIG.transferReadyText}.`, needsTransfer: true };
  }
  return { available: false, label: "Out of stock", copy: "This item is currently unavailable.", needsTransfer: false };
}

function productShotPosition(productId) {
  const positions = {
    p1: "72% 47%",
    p2: "42% 62%",
    p3: "68% 82%",
    p4: "55% 87%",
    p5: "90% 72%"
  };
  return positions[productId] || "50% 50%";
}

function productImageStyle(product) {
  return `--shot-position: ${productShotPosition(product.id)}; ${categoryVisualStyle(product.category)}`;
}

function renderProductDetail(slug) {
  const product = productBySlug(slug);
  if (!product) return `<section class="empty-state">Product not found.</section>`;
  const delivery = fulfilmentPromise(product.id, "delivery");
  const pickup = fulfilmentPromise(product.id, "pickup");
  return `
    <section class="detail-layout">
      <div class="detail-media product-shot category-shot ${product.palette}" style="${productImageStyle(product)}"><span>${product.initials}</span></div>
      <div class="detail-copy">
        <p class="eyebrow">${product.category} - ${product.sku}</p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <strong class="detail-price">${money(product.priceKobo)}</strong>
        <div class="detail-options">
          <article class="promise-card">
            <h3>Delivery</h3>
            <p>${delivery.copy}</p>
            <button class="primary-button" data-add-cart="${product.id}" data-fulfilment="delivery" ${delivery.available ? "" : "disabled"}>Add for delivery</button>
          </article>
          <article class="promise-card">
            <h3>Pickup</h3>
            <p>${pickup.copy}</p>
            <button class="outline-button" data-add-cart="${product.id}" data-fulfilment="pickup" ${pickup.available ? "" : "disabled"}>Add for pickup</button>
          </article>
        </div>
        <ul class="detail-list">${product.details.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
    </section>
  `;
}

function renderCartPage() {
  const subtotal = cartTotal();
  return `
    <section class="page-heading">
      <div><p class="eyebrow">Shopping cart</p><h1>Your cart</h1></div>
      <a href="/products" data-route="/products" class="outline-button button-link">Continue shopping</a>
    </section>
    <section class="checkout-layout">
      <div class="panel">
        <div class="panel-heading"><h2>Items</h2><span>${cartCount()} units</span></div>
        <div class="stack">${cart.length ? cart.map(renderCartRow).join("") : `<div class="empty-state">Your cart is empty.</div>`}</div>
      </div>
      <aside class="panel order-summary">
        <div class="panel-heading"><h2>Summary</h2><span>${cartCount()} units</span></div>
        <div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
        <div class="summary-line"><span>Payment</span><span>Paystack</span></div>
        <a class="primary-button button-link ${cart.length ? "" : "disabled-link"}" href="/checkout" data-route="/checkout">Checkout</a>
      </aside>
    </section>
  `;
}

function renderCartRow(item) {
  const product = productById(item.productId);
  const promise = fulfilmentPromise(item.productId, item.fulfilment);
  return `
    <article class="line-card cart-row">
      <div class="mini-media category-shot ${product.palette}" style="${productImageStyle(product)}"><span>${product.initials}</span></div>
      <div>
        <strong>${product.name}</strong>
        <div class="muted">${item.fulfilment === "delivery" ? "Delivery" : promise.label} - ${money(product.priceKobo)}</div>
      </div>
      <input type="number" min="1" value="${item.quantity}" data-cart-qty="${item.productId}" data-fulfilment="${item.fulfilment}" />
      <button class="icon-button" data-remove-cart="${item.productId}" data-fulfilment="${item.fulfilment}" aria-label="Remove ${product.name}">x</button>
    </article>
  `;
}

function renderCheckoutPage() {
  if (!cart.length) return `<section class="empty-state">Your cart is empty. <a href="/products" data-route="/products">Shop products</a></section>`;
  return `
    <section class="page-heading">
      <div><p class="eyebrow">Secure payment</p><h1>Checkout</h1></div>
      <a href="/cart" data-route="/cart" class="outline-button button-link">Back to cart</a>
    </section>
    <form id="checkoutForm" class="checkout-layout">
      <section class="panel form-stack">
        <div class="panel-heading"><h2>Customer details</h2><span>Guest checkout</span></div>
        <label>Full name<input name="name" value="${escapeAttr(checkoutDraft.name)}" required /></label>
        <label>Phone<input name="phone" value="${escapeAttr(checkoutDraft.phone)}" required /></label>
        <label>Email<input name="email" type="email" value="${escapeAttr(checkoutDraft.email)}" required /></label>
        <label>Delivery address<textarea name="address" rows="4">${escapeHtml(checkoutDraft.address)}</textarea></label>
      </section>
      <aside class="panel order-summary">
        <div class="panel-heading"><h2>Order summary</h2><span>${cartCount()} units</span></div>
        <div class="stack">${cart.map(renderCompactCartLine).join("")}</div>
        <div class="summary-line"><span>Total</span><strong>${money(cartTotal())}</strong></div>
        <button class="primary-button" type="submit">Pay with Paystack</button>
        <p class="helper-text">You will receive your order confirmation after payment.</p>
      </aside>
    </form>
  `;
}

function renderCompactCartLine(item) {
  const product = productById(item.productId);
  return `<div class="compact-line"><span>${product.name} x ${item.quantity}</span><strong>${money(product.priceKobo * item.quantity)}</strong></div>`;
}

function renderOrderConfirmation(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId);
  if (!order) return `<section class="empty-state">Order not found.</section>`;
  return `
    <section class="order-success">
      <p class="eyebrow">Order confirmed</p>
      <h1>${order.id}</h1>
      <p>${order.customer.name}, your order is confirmed. We will send fulfilment updates using the contact details provided.</p>
      <div class="status-steps">
        ${order.items.map((item) => `<div class="line-card"><strong>${productById(item.productId).name}</strong><span>${item.fulfilment === "delivery" ? "Delivery order" : pickupStatusText(item)}</span></div>`).join("")}
      </div>
      <div class="hero-actions">
        <a href="/products" data-route="/products" class="primary-button button-link">Keep shopping</a>
      </div>
    </section>
  `;
}

function pickupStatusText(item) {
  if (item.pickupPath === "shop") return "Pickup reserved for today";
  return CONFIG.transferReadyText;
}

function renderStaffPage(path) {
  if (path === "/pos") return renderPosPage();
  if (path === "/admin") return renderDashboard();
  if (path === "/admin/orders") return renderOrdersPage();
  if (path === "/admin/inventory") return renderInventoryPage();
  if (path === "/admin/transfers") return renderTransfersPage();
  if (path === "/admin/receiving") return renderReceivingPage();
  if (path === "/admin/returns") return renderReturnsPage();
  if (path === "/admin/audit") return renderAuditPage();
  return renderDashboard();
}

function renderDashboard() {
  const t = totals();
  const openOrders = state.orders.filter((order) => !["shipped", "collected", "cancelled"].includes(order.status)).length;
  const openTransfers = state.transfers.filter((transfer) => transfer.status !== "confirmed").length;
  return `
    <section class="metric-grid">
      ${metric("Sales", money(t.sales))}
      ${metric("Open orders", openOrders)}
      ${metric("Open transfers", openTransfers)}
      ${metric("Reserved units", t.reserved)}
    </section>
    <section class="content-grid">
      <div class="panel">
        <div class="panel-heading"><h2>Low shop stock</h2><span>Replenish from warehouse</span></div>
        <div class="stack">${state.products.filter((product) => available(product.id, "shop") <= 4).map((product) => `<div class="line-card dashboard-row"><div><strong>${product.name}</strong><span class="muted">${product.sku}</span></div><span class="pill status-pending">${available(product.id, "shop")} in shop</span></div>`).join("") || `<div class="empty-state">No low shop stock.</div>`}</div>
      </div>
      <div class="panel">
        <div class="panel-heading"><h2>Operational queue</h2><span>Warehouse and shop work</span></div>
        <div class="stack">
          ${state.orders.slice(0, 4).map(renderOrderQueueRow).join("")}
        </div>
      </div>
    </section>
  `;
}

function metric(label, value) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`;
}

function renderOrderQueueRow(order) {
  return `<div class="line-card dashboard-row"><div><strong>${order.id}</strong><span class="muted">${order.customer.name} - ${order.items.length} line(s)</span></div><span class="pill ${orderStatusClass(order.status)}">${order.status.replaceAll("-", " ")}</span></div>`;
}

function renderPosPage() {
  const query = new URLSearchParams(location.search).get("scan") || "";
  const products = state.products.filter((product) => `${product.name} ${product.sku}`.toLowerCase().includes(query.toLowerCase()));
  return `
    <section class="pos-command-strip">
      <div>
        <p class="eyebrow">Cashier mode</p>
        <h2>Walk-in sale</h2>
      </div>
      <label class="pos-search">Search or scan<input id="posSearch" value="${escapeAttr(query)}" placeholder="Scan barcode, SKU, or product name" /></label>
      <div class="pos-till-stats">
        <span>${posCartCount()} units</span>
        <strong>${money(posCartTotal())}</strong>
      </div>
    </section>
    <section class="pos-filter-bar" aria-label="Product filters">
      <span class="active">All</span>
      ${categories().map((category) => `<span>${category}</span>`).join("")}
    </section>
    <section class="workbench pos-grid">
      <div class="pos-catalog-panel">
        <div class="section-label">
          <span>Shop floor catalogue</span>
          <strong>${products.length} items</strong>
        </div>
        <div class="pos-product-grid">${products.map(renderPosProduct).join("")}</div>
        <div class="recent-sales">
          <div class="section-label"><span>Recent sales</span><strong>View all</strong></div>
          <div class="recent-sale-list">${state.sales.slice(0, 3).map((sale) => `<div><span>S-${String(sale.id).padStart(4, "0")}</span><span>${new Date(sale.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span><strong>${money(sale.totalKobo)}</strong><span class="pill status-ok">Paid</span></div>`).join("")}</div>
        </div>
      </div>
      <aside class="panel order-summary pos-sale-panel">
        <div class="receipt-header">
          <div>
            <p class="eyebrow">Receipt</p>
            <h2>Current sale</h2>
          </div>
          <span class="receipt-chip">${posCartCount()} units</span>
        </div>
        <div class="receipt-lines">${posCart.length ? posCart.map(renderPosCartRow).join("") : `<div class="empty-state pos-empty">Add products from the catalogue to start a sale.</div>`}</div>
        <div class="payment-box">
          <label>Payment method<select id="paymentMethod">${state.paymentMethods.map((method) => `<option>${method}</option>`).join("")}</select></label>
        </div>
        <div class="pos-total-card">
          <span>Total due</span>
          <strong>${money(posCartTotal())}</strong>
        </div>
        <button class="primary-button pos-complete-button" data-action="complete-pos" ${posCart.length ? "" : "disabled"}>Complete sale</button>
        <div class="receipt-paper">
          <strong>${CONFIG.businessName}</strong>
          <span>Main Street Store</span>
          <div>${posCart.length ? posCart.map((item) => `<p><span>${productById(item.productId).name} x${item.quantity}</span><b>${money(productById(item.productId).priceKobo * item.quantity)}</b></p>`).join("") : `<p><span>No items</span><b>${money(0)}</b></p>`}</div>
          <p><span>Total</span><b>${money(posCartTotal())}</b></p>
        </div>
      </aside>
    </section>
  `;
}

function renderPosProduct(product) {
  const shop = available(product.id, "shop");
  return `<article class="pos-product-card">
    <div class="pos-product-media category-shot ${product.palette}" style="${productImageStyle(product)}"><span>${product.initials}</span></div>
    <div class="pos-product-copy">
      <span>${product.sku}</span>
      <strong>${product.name}</strong>
      <em>${money(product.priceKobo)}</em>
    </div>
    <div class="pos-product-footer">
      <span class="${shop <= 2 ? "stock-warn" : ""}">${shop} in shop</span>
      <button class="small-button" data-add-pos="${product.id}" ${shop <= 0 ? "disabled" : ""}>Add</button>
    </div>
  </article>`;
}

function renderPosCartRow(item) {
  const product = productById(item.productId);
  return `<div class="line-card pos-sale-row">
    <div class="mini-media receipt-product-mark product-shot category-shot" style="${productImageStyle(product)}"><span>${product.initials}</span></div>
    <div>
      <strong>${product.name}</strong>
      <span class="muted">${product.sku} - ${money(product.priceKobo)} each</span>
    </div>
    <input data-pos-qty="${product.id}" type="number" min="1" value="${item.quantity}" aria-label="Quantity for ${product.name}" />
    <div class="line-total">${money(product.priceKobo * item.quantity)}</div>
    <button class="icon-button" data-remove-pos="${product.id}" aria-label="Remove ${product.name}">x</button>
  </div>`;
}

function renderOrdersPage() {
  return `
    <section class="panel">
      <div class="panel-heading"><h2>Online order queue</h2><span>Paid orders from storefront</span></div>
      <div class="order-board">${state.orders.map(renderOrderCard).join("")}</div>
    </section>
  `;
}

function renderOrderCard(order) {
  const hasDelivery = order.items.some((item) => item.fulfilment === "delivery");
  const hasPickup = order.items.some((item) => item.fulfilment === "pickup");
  return `
    <article class="order-card">
      <header>
        <div><strong>${order.id}</strong><span>${order.customer.name} - ${order.customer.phone}</span></div>
        <span class="pill ${orderStatusClass(order.status)}">${order.status.replaceAll("-", " ")}</span>
      </header>
      <div class="stack">${order.items.map((item) => `<div class="compact-line"><span>${productById(item.productId).name} x ${item.quantity}</span><span>${item.fulfilment}</span></div>`).join("")}</div>
      <div class="summary-line"><span>Total</span><strong>${money(order.totalKobo)}</strong></div>
      <div class="transfer-actions">
        ${hasDelivery ? `<button class="small-button" data-order-action="ship" data-order="${order.id}" ${order.status === "paid" ? "" : "disabled"}>Mark shipped</button>` : ""}
        ${hasPickup ? `<button class="small-button" data-order-action="ready" data-order="${order.id}" ${["paid", "awaiting-transfer"].includes(order.status) ? "" : "disabled"}>Mark ready</button><button class="small-button" data-order-action="collect" data-order="${order.id}" ${order.status === "ready-for-pickup" ? "" : "disabled"}>Mark collected</button>` : ""}
      </div>
    </article>
  `;
}

function orderStatusClass(status) {
  if (["shipped", "collected", "ready-for-pickup"].includes(status)) return "status-ok";
  if (status === "awaiting-transfer") return "status-in-transit";
  return "status-pending";
}

function renderInventoryPage() {
  const lowStock = state.products.filter((product) => available(product.id, "shop") <= 4).length;
  const outOfStock = state.products.filter((product) => available(product.id, "shop") + available(product.id, "warehouse") <= 0).length;
  return `
    <section class="inventory-summary">
      ${metric("Total SKUs", state.products.length)}
      ${metric("Total stock value", money(state.products.reduce((sum, product) => sum + (available(product.id, "warehouse") + available(product.id, "shop")) * product.priceKobo, 0)))}
      ${metric("Low stock items", lowStock)}
      ${metric("Out of stock", outOfStock)}
      ${metric("Stock locations", 2)}
    </section>
    <section class="panel">
      <div class="panel-heading"><h2>Location-aware inventory</h2><span>Internal detail only</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>SKU</th><th>Product</th><th>Warehouse</th><th>Shop</th><th>Reserved</th><th>In transit</th><th>Quarantine</th></tr></thead>
          <tbody>${state.products.map(renderInventoryRow).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderInventoryRow(product) {
  const stock = state.stock[product.id];
  const inTransit = state.transfers.filter((transfer) => transfer.productId === product.id && transfer.status === "in-transit").reduce((sum, transfer) => sum + transfer.quantity, 0);
  return `<tr><td>${product.sku}</td><td><div class="inventory-product-cell"><div class="mini-media category-shot ${product.palette}" style="${productImageStyle(product)}"><span>${product.initials}</span></div><div><strong>${product.name}</strong><span class="muted">${product.category}</span></div></div></td><td>${stockCell(stock.warehouse)}</td><td>${stockCell(stock.shop)}</td><td>${stock.warehouse.reserved + stock.shop.reserved}</td><td>${inTransit}</td><td>${stock.quarantine}</td></tr>`;
}

function stockCell(level) {
  return `<div class="number-stack"><strong>${level.quantity}</strong><span>${level.quantity - level.reserved} available</span></div>`;
}

function renderTransfersPage() {
  return `
    <section class="workbench">
      <div class="panel">
        <div class="panel-heading"><h2>Create transfer</h2><span>Warehouse to shop</span></div>
        <form id="transferForm" class="form-stack">
          <label>Product<select name="productId">${state.products.map((product) => `<option value="${product.id}">${product.sku} - ${product.name}</option>`).join("")}</select></label>
          <label>Quantity<input name="quantity" type="number" min="1" value="1" /></label>
          <button class="primary-button">Create transfer task</button>
        </form>
      </div>
      <div class="panel">
        <div class="panel-heading"><h2>Transfer queue</h2><span>Three-state handoff</span></div>
        <div class="stack">${state.transfers.map(renderTransferCard).join("")}</div>
      </div>
    </section>
  `;
}

function renderTransferCard(transfer) {
  const product = productById(transfer.productId);
  return `<article class="line-card"><div class="transfer-row"><div><strong>#${transfer.id} ${product.name}</strong><span class="muted">${transfer.quantity} units - ${transfer.source || "Manual transfer"}</span></div><span class="pill ${transferStatusClass(transfer.status)}">${transfer.status.replace("-", " ")}</span></div><div class="transfer-actions"><button class="small-button" data-transfer-action="dispatch" data-transfer="${transfer.id}" ${transfer.status === "pending" ? "" : "disabled"}>Dispatch</button><button class="small-button" data-transfer-action="confirm" data-transfer="${transfer.id}" ${transfer.status === "in-transit" ? "" : "disabled"}>Confirm received</button></div></article>`;
}

function transferStatusClass(status) {
  if (status === "pending") return "status-pending";
  if (status === "in-transit") return "status-in-transit";
  return "status-ok";
}

function renderReceivingPage() {
  return `<section class="panel narrow-panel"><div class="panel-heading"><h2>Receive into warehouse</h2><span>Supplier stock</span></div><form id="receivingForm" class="form-stack"><label>Product<select name="productId">${state.products.map((product) => `<option value="${product.id}">${product.sku} - ${product.name}</option>`).join("")}</select></label><label>Supplier<input name="supplier" value="Opening count" /></label><label>Quantity<input name="quantity" type="number" min="1" value="5" /></label><button class="primary-button">Receive stock</button></form></section>`;
}

function renderReturnsPage() {
  return `<section class="panel narrow-panel"><div class="panel-heading"><h2>Walk-in return</h2><span>Inspection gate</span></div><form id="returnForm" class="form-stack"><label>Product<select name="productId">${state.products.map((product) => `<option value="${product.id}">${product.sku} - ${product.name}</option>`).join("")}</select></label><label>Quantity<input name="quantity" type="number" min="1" value="1" /></label><label>Condition<select name="condition"><option value="resellable">Resellable</option><option value="damaged">Damaged</option></select></label><button class="primary-button">Process return</button></form></section>`;
}

function renderAuditPage() {
  return `<section class="panel"><div class="panel-heading"><h2>Movement log</h2><span>Every stock change has a row</span></div><div class="timeline">${state.movements.map(renderMovement).join("")}</div></section>`;
}

function renderMovement(movement) {
  const product = productById(movement.productId);
  return `<article class="timeline-item"><strong>${movement.type.toUpperCase()} - ${product.name} - ${movement.quantity}</strong><span>${movement.note} at ${movement.location} by ${movement.actor}</span><time>${new Date(movement.at).toLocaleString()}</time></article>`;
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + productById(item.productId).priceKobo * item.quantity, 0);
}

function posCartCount() {
  return posCart.reduce((sum, item) => sum + item.quantity, 0);
}

function posCartTotal() {
  return posCart.reduce((sum, item) => sum + productById(item.productId).priceKobo * item.quantity, 0);
}

function addToCart(productId, fulfilment) {
  const promise = fulfilmentPromise(productId, fulfilment);
  if (!promise.available) {
    toast("That fulfilment option is unavailable.");
    return;
  }
  const existing = cart.find((item) => item.productId === productId && item.fulfilment === fulfilment);
  const max = fulfilment === "delivery" ? available(productId, "warehouse") : available(productId, "shop") + available(productId, "warehouse");
  if (existing && existing.quantity >= max) {
    toast("No more available for that option.");
    return;
  }
  if (existing) existing.quantity += 1;
  else cart.push({ productId, fulfilment, quantity: 1 });
  toast("Added to cart.");
  render();
}

function addToPos(productId) {
  const max = available(productId, "shop");
  const existing = posCart.find((item) => item.productId === productId);
  if (existing && existing.quantity >= max) {
    toast("No more shop stock available.");
    return;
  }
  if (existing) existing.quantity += 1;
  else posCart.push({ productId, quantity: 1 });
  render();
}

function updateCartQuantity(productId, fulfilment, value) {
  const item = cart.find((entry) => entry.productId === productId && entry.fulfilment === fulfilment);
  if (!item) return;
  const max = fulfilment === "delivery" ? available(productId, "warehouse") : available(productId, "shop") + available(productId, "warehouse");
  item.quantity = Math.max(1, Math.min(Number(value) || 1, max));
  render();
}

function updatePosQuantity(productId, value) {
  const item = posCart.find((entry) => entry.productId === productId);
  if (!item) return;
  item.quantity = Math.max(1, Math.min(Number(value) || 1, available(productId, "shop")));
  render();
}

function completeCheckout(form) {
  const data = new FormData(form);
  checkoutDraft = {
    name: data.get("name").trim(),
    phone: data.get("phone").trim(),
    email: data.get("email").trim(),
    address: data.get("address").trim()
  };

  const invalid = cart.find((item) => {
    const max = item.fulfilment === "delivery" ? available(item.productId, "warehouse") : available(item.productId, "shop") + available(item.productId, "warehouse");
    return item.quantity > max;
  });
  if (invalid) {
    toast(`${productById(invalid.productId).name} no longer has enough stock.`);
    return;
  }

  const orderId = `ORD-${state.nextOrderId++}`;
  const orderItems = cart.map((item) => {
    const product = productById(item.productId);
    const orderItem = { ...item, priceKobo: product.priceKobo };
    if (item.fulfilment === "delivery") {
      state.stock[item.productId].warehouse.reserved += item.quantity;
      addMovement("reservation", item.productId, item.quantity, "warehouse", `Online order ${orderId} reserved for delivery`, "system");
    } else if (available(item.productId, "shop") >= item.quantity) {
      state.stock[item.productId].shop.reserved += item.quantity;
      orderItem.pickupPath = "shop";
      addMovement("reservation", item.productId, item.quantity, "shop", `Online order ${orderId} reserved for pickup`, "system");
    } else {
      state.stock[item.productId].warehouse.reserved += item.quantity;
      orderItem.pickupPath = "warehouse-transfer";
      createTransfer(item.productId, item.quantity, `Collect order ${orderId}`);
      addMovement("reservation", item.productId, item.quantity, "warehouse", `Online order ${orderId} reserved pending pickup transfer`, "system");
    }
    return orderItem;
  });

  const status = orderItems.some((item) => item.pickupPath === "warehouse-transfer") ? "awaiting-transfer" : "paid";
  const totalKobo = cartTotal();
  state.orders.unshift({
    id: orderId,
    customer: { name: checkoutDraft.name, phone: checkoutDraft.phone, email: checkoutDraft.email },
    items: orderItems,
    status,
    totalKobo,
    address: checkoutDraft.address,
    createdAt: nowIso()
  });
  state.sales.unshift({ id: state.nextSaleId++, channel: "online", items: orderItems, totalKobo, paymentMethod: "Paystack", at: nowIso() });
  cart = [];
  toast("Payment verified. Order created.");
  navigate(`/order/${orderId}`, true);
}

function completePosSale() {
  if (!posCart.length) return;
  const invalid = posCart.find((item) => item.quantity > available(item.productId, "shop"));
  if (invalid) {
    toast(`${productById(invalid.productId).name} does not have enough shop stock.`);
    return;
  }
  const saleId = state.nextSaleId++;
  const items = posCart.map((item) => {
    const product = productById(item.productId);
    state.stock[item.productId].shop.quantity -= item.quantity;
    addMovement("sale", item.productId, item.quantity, "shop", `POS sale #${saleId}`);
    return { productId: item.productId, quantity: item.quantity, priceKobo: product.priceKobo };
  });
  const totalKobo = items.reduce((sum, item) => sum + item.priceKobo * item.quantity, 0);
  const method = $("#paymentMethod")?.value || "Cash";
  state.sales.unshift({ id: saleId, channel: "pos", items, totalKobo, paymentMethod: method, at: nowIso() });
  posCart = [];
  toast(`POS sale complete: ${money(totalKobo)}`);
  render();
}

function createTransfer(productId, quantity, source = "Manual transfer") {
  state.transfers.unshift({
    id: state.nextTransferId++,
    productId,
    quantity,
    status: "pending",
    createdBy: state.role,
    createdAt: nowIso(),
    source
  });
}

function submitTransfer(form) {
  const data = new FormData(form);
  const productId = data.get("productId");
  const quantity = Math.max(1, Number(data.get("quantity")) || 1);
  if (available(productId, "warehouse") < quantity) {
    toast("Warehouse does not have enough available stock.");
    return;
  }
  state.stock[productId].warehouse.reserved += quantity;
  createTransfer(productId, quantity);
  addMovement("transfer", productId, quantity, "warehouse-to-shop", "Transfer task created; warehouse stock reserved");
  toast("Transfer task created.");
  render();
}

function dispatchTransfer(id) {
  const transfer = state.transfers.find((entry) => entry.id === id);
  if (!transfer || transfer.status !== "pending") return;
  const level = state.stock[transfer.productId].warehouse;
  if (level.quantity < transfer.quantity || level.reserved < transfer.quantity) {
    toast("Transfer stock is inconsistent.");
    return;
  }
  level.quantity -= transfer.quantity;
  level.reserved -= transfer.quantity;
  transfer.status = "in-transit";
  transfer.dispatchedBy = state.role;
  transfer.dispatchedAt = nowIso();
  addMovement("transfer", transfer.productId, transfer.quantity, "in-transit", "Dispatched from warehouse; sellable nowhere");
  toast("Transfer dispatched.");
  render();
}

function confirmTransfer(id) {
  const transfer = state.transfers.find((entry) => entry.id === id);
  if (!transfer || transfer.status !== "in-transit") return;
  state.stock[transfer.productId].shop.quantity += transfer.quantity;
  transfer.status = "confirmed";
  transfer.receivedBy = state.role;
  transfer.receivedAt = nowIso();
  addMovement("transfer", transfer.productId, transfer.quantity, "shop", "Received at shop; now sellable from shop");
  toast("Transfer confirmed.");
  render();
}

function receiveStock(form) {
  const data = new FormData(form);
  const productId = data.get("productId");
  const quantity = Math.max(1, Number(data.get("quantity")) || 1);
  const supplier = data.get("supplier") || "Unspecified supplier";
  state.stock[productId].warehouse.quantity += quantity;
  addMovement("receiving", productId, quantity, "warehouse", `Received from ${supplier}`);
  toast("Warehouse stock received.");
  render();
}

function processReturn(form) {
  const data = new FormData(form);
  const productId = data.get("productId");
  const quantity = Math.max(1, Number(data.get("quantity")) || 1);
  if (data.get("condition") === "damaged") {
    state.stock[productId].quarantine += quantity;
    addMovement("return", productId, quantity, "shop quarantine", "Walk-in return inspected as damaged");
    toast("Return moved to quarantine.");
  } else {
    state.stock[productId].shop.quantity += quantity;
    addMovement("return", productId, quantity, "shop", "Walk-in return inspected as resellable");
    toast("Return added back to shop stock.");
  }
  render();
}

function orderAction(orderId, action) {
  const order = state.orders.find((entry) => entry.id === orderId);
  if (!order) return;
  if (action === "ship") {
    order.items.filter((item) => item.fulfilment === "delivery").forEach((item) => {
      const level = state.stock[item.productId].warehouse;
      level.quantity -= item.quantity;
      level.reserved -= item.quantity;
      addMovement("sale", item.productId, item.quantity, "warehouse", `Order ${order.id} shipped`);
    });
    order.status = "shipped";
    toast("Order shipped.");
  }
  if (action === "ready") {
    order.status = "ready-for-pickup";
    toast("Order marked ready for pickup.");
  }
  if (action === "collect") {
    order.items.filter((item) => item.fulfilment === "pickup").forEach((item) => {
      const level = state.stock[item.productId].shop;
      if (level.reserved >= item.quantity) level.reserved -= item.quantity;
      level.quantity -= item.quantity;
      addMovement("sale", item.productId, item.quantity, "shop", `Order ${order.id} collected`);
    });
    order.status = "collected";
    toast("Order collected.");
  }
  render();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

document.addEventListener("click", (event) => {
  const route = event.target.closest("[data-route]");
  if (route) {
    event.preventDefault();
    navigate(route.getAttribute("data-route"));
    return;
  }

  const addCart = event.target.closest("[data-add-cart]");
  if (addCart) addToCart(addCart.dataset.addCart, addCart.dataset.fulfilment);

  const removeCart = event.target.closest("[data-remove-cart]");
  if (removeCart) {
    cart = cart.filter((item) => !(item.productId === removeCart.dataset.removeCart && item.fulfilment === removeCart.dataset.fulfilment));
    render();
  }

  const addPos = event.target.closest("[data-add-pos]");
  if (addPos) addToPos(addPos.dataset.addPos);

  const removePos = event.target.closest("[data-remove-pos]");
  if (removePos) {
    posCart = posCart.filter((item) => item.productId !== removePos.dataset.removePos);
    render();
  }

  const action = event.target.closest("[data-action]");
  if (action?.dataset.action === "complete-pos") completePosSale();
  if (action?.dataset.action === "reset-demo") {
    state = structuredClone(seedState);
    cart = [];
    posCart = [];
    toast("Demo data reset.");
    render();
  }

  const transfer = event.target.closest("[data-transfer-action]");
  if (transfer?.dataset.transferAction === "dispatch") dispatchTransfer(Number(transfer.dataset.transfer));
  if (transfer?.dataset.transferAction === "confirm") confirmTransfer(Number(transfer.dataset.transfer));

  const order = event.target.closest("[data-order-action]");
  if (order) orderAction(order.dataset.order, order.dataset.orderAction);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "storeSearch") {
    const params = new URLSearchParams(location.search);
    params.set("q", event.target.value);
    history.replaceState({}, "", appUrl(`/products?${params.toString()}`));
    render();
  }
  if (event.target.id === "categoryFilter") {
    const params = new URLSearchParams(location.search);
    params.set("category", event.target.value);
    history.replaceState({}, "", appUrl(`/products?${params.toString()}`));
    render();
  }
  if (event.target.id === "posSearch") {
    const params = new URLSearchParams();
    if (event.target.value) params.set("scan", event.target.value);
    history.replaceState({}, "", appUrl(`/pos${params.toString() ? `?${params.toString()}` : ""}`));
    render();
  }
  if (event.target.matches("[data-cart-qty]")) updateCartQuantity(event.target.dataset.cartQty, event.target.dataset.fulfilment, event.target.value);
  if (event.target.matches("[data-pos-qty]")) updatePosQuantity(event.target.dataset.posQty, event.target.value);
});

document.addEventListener("change", (event) => {
  if (event.target.id === "roleSelect") {
    state.role = event.target.value;
    toast(`Role switched to ${state.role}.`);
    render();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "checkoutForm") {
    event.preventDefault();
    completeCheckout(event.target);
  }
  if (event.target.id === "transferForm") {
    event.preventDefault();
    submitTransfer(event.target);
  }
  if (event.target.id === "receivingForm") {
    event.preventDefault();
    receiveStock(event.target);
  }
  if (event.target.id === "returnForm") {
    event.preventDefault();
    processReturn(event.target);
  }
});

window.addEventListener("popstate", render);
render();
