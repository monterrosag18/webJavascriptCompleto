/**
 * RestorApp - Data Store
 * Datos centralizados para productos, carrito y órdenes
 */

// ==========================================
// Productos del Menú
// ==========================================
const menuProducts = [
    // Burgers
    {
        id: 1,
        name: "Classic Beef Burger",
        description: "Premium beef patty with lettuce, tomato, onions, and special sauce",
        price: 9.99,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
        badge: "popular"
    },
    {
        id: 2,
        name: "Double Bacon Melt",
        description: "Two beef patties, crispy bacon, melted cheese, and caramelized onions",
        price: 12.99,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=200&fit=crop",
        badge: "bestseller"
    },
    {
        id: 3,
        name: "Chicken Supreme",
        description: "Grilled chicken breast with avocado, swiss cheese and chipotle mayo",
        price: 10.99,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&h=200&fit=crop",
        badge: null
    },
    {
        id: 4,
        name: "Veggie Delight",
        description: "Plant-based patty with fresh vegetables and vegan mayo",
        price: 11.49,
        category: "burgers",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop",
        badge: "new"
    },

    // Sides
    {
        id: 5,
        name: "Golden Fries",
        description: "Perfectly crispy potatoes with sea salt, served with ketchup",
        price: 3.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop",
        badge: "popular"
    },
    {
        id: 6,
        name: "Onion Rings",
        description: "Crispy battered onion rings with ranch dipping sauce",
        price: 4.49,
        category: "sides",
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop",
        badge: null
    },
    {
        id: 7,
        name: "Mozzarella Sticks",
        description: "Golden fried mozzarella with marinara sauce",
        price: 5.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=300&h=200&fit=crop",
        badge: null
    },
    {
        id: 8,
        name: "Loaded Nachos",
        description: "Tortilla chips with cheese, jalapeños, sour cream and guacamole",
        price: 7.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop",
        badge: "bestseller"
    },

    // Drinks
    {
        id: 9,
        name: "Cola Zero",
        description: "Chilled zero sugar cola with ice, refreshing taste",
        price: 2.49,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=200&fit=crop",
        badge: "popular"
    },
    {
        id: 10,
        name: "Fresh Lemonade",
        description: "Homemade lemonade with fresh lemons and mint",
        price: 3.49,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
        badge: null
    },
    {
        id: 11,
        name: "Milkshake",
        description: "Creamy milkshake - chocolate, vanilla or strawberry",
        price: 4.99,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop",
        badge: "new"
    },
    {
        id: 12,
        name: "Iced Coffee",
        description: "Cold brew coffee with milk and ice",
        price: 3.99,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop",
        badge: null
    },

    // Pizza
    {
        id: 13,
        name: "Pepperoni Slice",
        description: "Large NY style slice with mozzarella and pepperoni",
        price: 4.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
        badge: "bestseller"
    },
    {
        id: 14,
        name: "Margherita",
        description: "Classic tomato, fresh mozzarella and basil",
        price: 4.49,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop",
        badge: null
    },
    {
        id: 15,
        name: "BBQ Chicken",
        description: "BBQ sauce, grilled chicken, red onions and cilantro",
        price: 5.49,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
        badge: "new"
    },
    {
        id: 16,
        name: "Donut Box",
        description: "Assorted glazed donuts and frosted favorites",
        price: 8.99,
        category: "sides",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=200&fit=crop",
        badge: "popular"
    }
];

// ==========================================
// Órdenes de Ejemplo
// ==========================================
const sampleOrders = [
    {
        id: "#ORD-4302",
        customer: {
            name: "Alice Smith",
            email: "alice.smith@example.com",
            phone: "+1 (555) 123-4567",
            initials: "AS"
        },
        date: "Jan 27, 2026",
        items: [
            { name: "Classic Beef Burger", qty: 2, price: 9.99 },
            { name: "Golden Fries", qty: 1, price: 3.99 },
            { name: "Cola Zero", qty: 2, price: 2.49 }
        ],
        status: "delivered",
        total: 45.00
    },
    {
        id: "#ORD-4301",
        customer: {
            name: "Bob Jones",
            email: "bob.jones@example.com",
            phone: "+1 (555) 234-5678",
            initials: "BJ"
        },
        date: "Jan 27, 2026",
        items: [
            { name: "Double Bacon Melt", qty: 1, price: 12.99 }
        ],
        status: "processing",
        total: 15.00
    },
    {
        id: "#ORD-4299",
        customer: {
            name: "Charlie Day",
            email: "charlie@example.com",
            phone: "+1 (555) 345-6789",
            initials: "CD"
        },
        date: "Jan 26, 2026",
        items: [
            { name: "Pepperoni Slice", qty: 3, price: 4.99 },
            { name: "Fresh Lemonade", qty: 2, price: 3.49 }
        ],
        status: "delivered",
        total: 88.26
    },
    {
        id: "#ORD-4282",
        customer: {
            name: "Diana Prince",
            email: "diana@example.com",
            phone: "+1 (555) 456-7890",
            initials: "DP"
        },
        date: "Jan 25, 2026",
        items: [
            { name: "Veggie Delight", qty: 1, price: 11.49 },
            { name: "Onion Rings", qty: 1, price: 4.49 }
        ],
        status: "cancelled",
        total: 14.00
    },
    {
        id: "#ORD-4278",
        customer: {
            name: "Ryan Wright",
            email: "ryan@example.com",
            phone: "+1 (555) 567-8901",
            initials: "RW"
        },
        date: "Jan 25, 2026",
        items: [
            { name: "Donut Box", qty: 2, price: 8.99 },
            { name: "Iced Coffee", qty: 2, price: 3.99 }
        ],
        status: "ready",
        total: 52.00
    }
];

// ==========================================
// Cart Management
// ==========================================
class CartManager {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('restorapp_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('restorapp_cart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({ ...product, qty: 1 });
        }
        this.saveCart();
        return this.items;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        return this.items;
    }

    updateQuantity(productId, qty) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.qty = qty;
            if (item.qty <= 0) {
                return this.removeItem(productId);
            }
        }
        this.saveCart();
        return this.items;
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    getTax() {
        return this.getSubtotal() * 0.08;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        return this.items;
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    }
}

// ==========================================
// Orders Management
// ==========================================
class OrdersManager {
    constructor() {
        this.orders = this.loadOrders();
    }

    loadOrders() {
        const saved = localStorage.getItem('restorapp_orders');
        if (saved) {
            return JSON.parse(saved);
        }
        // Cargar órdenes de ejemplo la primera vez
        this.saveOrders(sampleOrders);
        return sampleOrders;
    }

    saveOrders(orders = this.orders) {
        localStorage.setItem('restorapp_orders', JSON.stringify(orders));
    }

    addOrder(order) {
        const newOrder = {
            id: `#ORD-${4300 + this.orders.length + 1}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'processing',
            ...order
        };
        this.orders.unshift(newOrder);
        this.saveOrders();
        return newOrder;
    }

    updateStatus(orderId, status) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            this.saveOrders();
        }
        return order;
    }

    getOrdersByStatus(status) {
        if (status === 'all') return this.orders;
        return this.orders.filter(o => o.status === status);
    }

    getStats() {
        const total = this.orders.length;
        const pending = this.orders.filter(o => o.status === 'processing').length;
        const revenue = this.orders
            .filter(o => o.status === 'delivered')
            .reduce((sum, o) => sum + o.total, 0);
        return { total, pending, revenue };
    }
}

// ==========================================
// User Management
// ==========================================
class UserManager {
    constructor() {
        this.currentUser = this.loadUser();
    }

    loadUser() {
        const saved = localStorage.getItem('restorapp_user');
        return saved ? JSON.parse(saved) : null;
    }

    saveUser(user) {
        localStorage.setItem('restorapp_user', JSON.stringify(user));
        this.currentUser = user;
    }

    login(name, email, role) {
        const user = {
            name,
            email,
            role,
            initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
            orders: 12,
            loyaltyPoints: 450,
            totalSpent: 85
        };
        this.saveUser(user);
        return user;
    }

    logout() {
        localStorage.removeItem('restorapp_user');
        this.currentUser = null;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.currentUser?.role === 'admin';
    }
}

// ==========================================
// Utility Functions
// ==========================================
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getStatusClass(status) {
    const classes = {
        'delivered': 'status-delivered',
        'processing': 'status-processing',
        'ready': 'status-delivered',
        'cancelled': 'status-cancelled'
    };
    return classes[status] || 'status-processing';
}

function getBadgeClass(badge) {
    const classes = {
        'popular': 'badge-popular',
        'bestseller': 'badge-bestseller',
        'new': 'badge-new'
    };
    return classes[badge] || '';
}

// Instancias globales
const cart = new CartManager();
const ordersManager = new OrdersManager();
const userManager = new UserManager();
