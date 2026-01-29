/**
 * RestorApp - Profile Page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!userManager.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize
    loadUserProfile();
    renderOrders();
    setupEventListeners();
});

// ==========================================
// User Profile
// ==========================================
function loadUserProfile() {
    const user = userManager.currentUser;
    
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('avatarImg').src = 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=22c55e&color=fff&size=80`;

    // Stats
    const orders = ordersManager.orders.filter(o => 
        o.customer.email === user.email
    );
    
    document.getElementById('totalOrders').textContent = orders.length || user.orders;
    document.getElementById('loyaltyPoints').textContent = user.loyaltyPoints;
    document.getElementById('totalSpent').textContent = `$${user.totalSpent}`;
}

// ==========================================
// Orders List
// ==========================================
function renderOrders(filter = 'all') {
    const container = document.getElementById('ordersList');
    let orders = ordersManager.orders;
    
    // Filtrar por usuario si no es admin
    const user = userManager.currentUser;
    if (!userManager.isAdmin()) {
        orders = orders.filter(o => o.customer.email === user.email);
    }

    // Filtrar por estado
    if (filter !== 'all') {
        orders = orders.filter(o => o.status === filter);
    }

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-receipt"></i>
                <h4>No orders yet</h4>
                <p>Your order history will appear here</p>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card" data-order-id="${order.id}">
            <div class="order-info">
                <h4>${order.id}</h4>
                <p>${order.date} • ${order.items.length} item${order.items.length > 1 ? 's' : ''}</p>
            </div>
            <div class="order-meta">
                <div class="order-total">${formatPrice(order.total)}</div>
                <span class="order-status ${getStatusClass(order.status)}">
                    ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.order-card').forEach(card => {
        card.addEventListener('click', () => {
            const orderId = card.dataset.orderId;
            showOrderDetail(orderId);
        });
    });
}

// ==========================================
// Order Detail Modal
// ==========================================
function showOrderDetail(orderId) {
    const order = ordersManager.orders.find(o => o.id === orderId);
    if (!order) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'orderDetailModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark-card text-white">
                <div class="modal-header border-dark">
                    <h5 class="modal-title">Order ${order.id}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">${order.date}</span>
                        <span class="order-status ${getStatusClass(order.status)}">
                            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                    
                    <h6 class="text-muted mb-3">Items</h6>
                    ${order.items.map(item => `
                        <div class="d-flex justify-content-between py-2 border-bottom border-dark">
                            <div>
                                <span class="badge bg-secondary me-2">${item.qty}x</span>
                                ${item.name}
                            </div>
                            <span>${formatPrice(item.price * item.qty)}</span>
                        </div>
                    `).join('')}
                    
                    <div class="mt-4 p-3 rounded" style="background: var(--bg-dark-input);">
                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${formatPrice(order.total / 1.08)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Tax (8%)</span>
                            <span>${formatPrice(order.total - (order.total / 1.08))}</span>
                        </div>
                        <div class="d-flex justify-content-between fw-bold pt-2 border-top border-dark">
                            <span>Total</span>
                            <span>${formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
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

    // Logout button in profile
    document.getElementById('logoutBtn').addEventListener('click', () => {
        userManager.logout();
        window.location.href = 'index.html';
    });

    // Edit Profile button
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        showEditProfileModal();
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.dataset.filter) {
                document.querySelectorAll('.filter-tab[data-filter]').forEach(t => 
                    t.classList.remove('active')
                );
                tab.classList.add('active');
                renderOrders(tab.dataset.filter);
            }
        });
    });
}

// ==========================================
// Edit Profile Modal
// ==========================================
function showEditProfileModal() {
    const user = userManager.currentUser;
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'editProfileModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark-card text-white">
                <div class="modal-header border-dark">
                    <h5 class="modal-title">Edit Profile</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editProfileForm">
                        <div class="mb-3">
                            <label class="form-label text-muted">Full Name</label>
                            <input type="text" class="form-control bg-dark text-white border-secondary" 
                                   id="editName" value="${user.name}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Email</label>
                            <input type="email" class="form-control bg-dark text-white border-secondary" 
                                   id="editEmail" value="${user.email}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">Phone</label>
                            <input type="tel" class="form-control bg-dark text-white border-secondary" 
                                   id="editPhone" value="${user.phone || ''}" placeholder="+1 (555) 000-0000">
                        </div>
                    </form>
                </div>
                <div class="modal-footer border-dark">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-success" id="saveProfileBtn">
                        <i class="bi bi-check2 me-1"></i>Save Changes
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Save button handler
    document.getElementById('saveProfileBtn').addEventListener('click', () => {
        const newName = document.getElementById('editName').value.trim();
        const newEmail = document.getElementById('editEmail').value.trim();
        const newPhone = document.getElementById('editPhone').value.trim();

        if (!newName || !newEmail) {
            alert('Name and email are required');
            return;
        }

        // Update user
        user.name = newName;
        user.email = newEmail;
        user.phone = newPhone;
        user.initials = newName.split(' ').map(n => n[0]).join('').toUpperCase();
        
        userManager.saveUser(user);
        loadUserProfile();
        
        bsModal.hide();
    });

    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}
