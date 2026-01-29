/**
 * RestorApp - Menu Page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!userManager.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize
    renderProducts('all');
    renderCart();
    setupEventListeners();
});

// ==========================================
// Products Rendering
// ==========================================
function renderProducts(category) {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = category === 'all' 
        ? menuProducts 
        : menuProducts.filter(p => p.category === category);

    grid.innerHTML = filteredProducts.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.05}s">
            <div class="product-image" style="position: relative;">
                <img src="${product.image}" alt="${product.name}" 
                     style="width: 100%; height: 150px; object-fit: cover;">
                ${product.badge ? `
                    <span class="product-badge ${getBadgeClass(product.badge)}">
                        ${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}
                    </span>
                ` : ''}
            </div>
            <div class="product-info">
                <div class="product-title">
                    <span>${product.name}</span>
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="bi bi-plus-circle"></i>
                    Add to order
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// Cart Rendering
// ==========================================
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.items.length === 0) {
        emptyCart.style.display = 'block';
        cartContainer.innerHTML = '';
        cartContainer.appendChild(emptyCart);
    } else {
        emptyCart.style.display = 'none';
        cartContainer.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-variant">${item.category}</div>
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity(${item.id}, ${item.qty - 1})">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.qty + 1})">
                            <i class="bi bi-plus"></i>
                        </button>
                        <button onclick="removeFromCart(${item.id})" style="margin-left: auto; color: var(--accent-red);">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span class="price">${formatPrice(item.price * item.qty)}</span>
                </div>
            </div>
        `).join('');
    }

    // Update totals
    document.getElementById('subtotal').textContent = formatPrice(cart.getSubtotal());
    document.getElementById('tax').textContent = formatPrice(cart.getTax());
    document.getElementById('total').textContent = formatPrice(cart.getTotal());
}

// ==========================================
// Cart Actions
// ==========================================
function addToCart(productId) {
    const product = menuProducts.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
        renderCart();
        showToast(`${product.name} added to cart!`);
    }
}

function updateCartQuantity(productId, qty) {
    cart.updateQuantity(productId, qty);
    renderCart();
}

function removeFromCart(productId) {
    cart.removeItem(productId);
    renderCart();
    showToast('Item removed from cart');
}

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    // Sidebar Logout
    document.getElementById('sidebarLogout').addEventListener('click', (e) => {
        e.preventDefault();
        userManager.logout();
        window.location.href = 'index.html';
    });

    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.dataset.category);
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = menuProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
        renderFilteredProducts(filtered);
    });

    // Confirm order
    document.getElementById('confirmOrder').addEventListener('click', () => {
        if (cart.items.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }

        // Create order
        const user = userManager.currentUser;
        const order = {
            customer: {
                name: user.name,
                email: user.email,
                phone: '+1 (555) 000-0000',
                initials: user.initials
            },
            items: cart.items.map(item => ({
                name: item.name,
                qty: item.qty,
                price: item.price
            })),
            total: cart.getTotal()
        };

        ordersManager.addOrder(order);
        cart.clearCart();
        renderCart();
        showToast('Order confirmed! Thank you!');
    });
}

function renderFilteredProducts(products) {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="bi bi-search"></i>
                <h4>No products found</h4>
                <p>Try a different search term</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.05}s">
            <div class="product-image" style="position: relative;">
                <img src="${product.image}" alt="${product.name}" 
                     style="width: 100%; height: 150px; object-fit: cover;">
                ${product.badge ? `
                    <span class="product-badge ${getBadgeClass(product.badge)}">
                        ${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}
                    </span>
                ` : ''}
            </div>
            <div class="product-info">
                <div class="product-title">
                    <span>${product.name}</span>
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="bi bi-plus-circle"></i>
                    Add to order
                </button>
            </div>
        </div>
    `).join('');
}
