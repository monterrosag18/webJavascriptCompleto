/* =============================================
   APP.JS - JavaScript combinando todas las secciones
   ============================================= */

// =============================================
// DATOS - De apis/json-server.html
// =============================================
const products = [
    {
        id: 1,
        name: "MacBook Pro 14\"",
        category: "laptops",
        price: 1999,
        oldPrice: 2199,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        stock: 10,
        rating: 4.8
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "phones",
        price: 1199,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        stock: 25,
        rating: 4.9
    },
    {
        id: 3,
        name: "AirPods Pro",
        category: "accessories",
        price: 249,
        oldPrice: 279,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400",
        stock: 50,
        rating: 4.7
    },
    {
        id: 4,
        name: "Dell XPS 15",
        category: "laptops",
        price: 1599,
        oldPrice: 1799,
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
        stock: 8,
        rating: 4.6
    },
    {
        id: 5,
        name: "Samsung Galaxy S24",
        category: "phones",
        price: 999,
        oldPrice: 1099,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        stock: 15,
        rating: 4.5
    },
    {
        id: 6,
        name: "Logitech MX Master 3",
        category: "accessories",
        price: 99,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        stock: 30,
        rating: 4.8
    }
];

// =============================================
// CLASE CARRITO - De ecommerce/carrito.html
// =============================================
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.updateUI();
    }
    
    // LocalStorage - De javascript/storage.html
    loadFromStorage() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
    
    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateUI();
        this.showToast(`${product.name} añadido al carrito`);
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateUI();
    }
    
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveToStorage();
                this.updateUI();
            }
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    // DOM - De javascript/dom.html
    updateUI() {
        // Actualizar contador
        const countEl = document.getElementById('cartCount');
        if (countEl) {
            countEl.textContent = this.getCount();
        }
        
        // Actualizar total
        const totalEl = document.getElementById('cartTotal');
        if (totalEl) {
            totalEl.textContent = `$${this.getTotal().toFixed(2)}`;
        }
        
        // Actualizar botón checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.items.length === 0;
        }
        
        // Renderizar items
        this.renderCartItems();
    }
    
    renderCartItems() {
        const container = document.getElementById('cartItems');
        if (!container) return;
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <i class="bi bi-cart-x"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            return;
        }
        
        // De javascript/arrays-objetos.html - map para renderizar
        container.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h6>${item.name}</h6>
                    <span class="price">$${item.price}</span>
                    <div class="quantity-controls mt-2">
                        <button onclick="cart.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-2" onclick="cart.removeItem(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Toast - De bootstrap/componentes.html
    showToast(message) {
        // Crear container si no existe
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerHTML = `
            <div class="toast-header bg-success text-white">
                <i class="bi bi-check-circle me-2"></i>
                <strong class="me-auto">Éxito</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }
}

// Instancia global del carrito
const cart = new ShoppingCart();

// =============================================
// RENDERIZAR PRODUCTOS - De ecommerce/tienda.html
// =============================================
let currentProducts = [...products];

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    // De javascript/arrays-objetos.html - map y template literals
    grid.innerHTML = productsToRender.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="product-card position-relative">
                ${product.oldPrice ? '<span class="badge-sale">OFERTA</span>' : ''}
                <img src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h5 class="mb-2">${product.name}</h5>
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="text-warning">
                            ${'★'.repeat(Math.floor(product.rating))}
                        </span>
                        <small class="text-muted">(${product.rating})</small>
                    </div>
                    <div class="mb-3">
                        <span class="price">$${product.price}</span>
                        ${product.oldPrice ? `<span class="old-price ms-2">$${product.oldPrice}</span>` : ''}
                    </div>
                    <button class="btn btn-add-cart w-100" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus me-2"></i>Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// =============================================
// FILTROS Y BÚSQUEDA - De javascript/arrays-objetos.html
// =============================================
function filterByCategory(category) {
    if (category === 'all') {
        currentProducts = [...products];
    } else {
        // Usando filter de arrays
        currentProducts = products.filter(p => p.category === category);
    }
    renderProducts(currentProducts);
}

function searchProducts(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    // Usando filter + includes
    currentProducts = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    renderProducts(currentProducts);
}

function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    
    // De javascript/arrays-objetos.html - sort
    switch(sortBy) {
        case 'price-asc':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            currentProducts = [...products];
    }
    renderProducts(currentProducts);
}

// =============================================
// AUTENTICACIÓN - De auth/login.html + storage.html
// =============================================
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userMenu = document.getElementById('userMenu');
    const userBtn = document.getElementById('userBtn');
    
    if (user) {
        userBtn.innerHTML = `<i class="bi bi-person-check me-1"></i>${user.name}`;
        userMenu.innerHTML = `
            <li><a class="dropdown-item" href="perfil.html">Mi Perfil</a></li>
            <li><a class="dropdown-item" href="pedidos.html">Mis Pedidos</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="logout()">Cerrar Sesión</a></li>
        `;
    }
}

function logout() {
    localStorage.removeItem('user');
    location.reload();
}

// =============================================
// INICIALIZACIÓN - De javascript/eventos.html
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    checkAuth();
});

// Exportar para uso global si es necesario
window.cart = cart;
window.addToCart = addToCart;
window.filterByCategory = filterByCategory;
window.searchProducts = searchProducts;
window.sortProducts = sortProducts;