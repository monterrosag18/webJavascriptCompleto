/**
 * RestorApp - Admin Dashboard
 */

let selectedOrderId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication and admin role
    if (!userManager.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }

    if (!userManager.isAdmin()) {
        window.location.href = '../menu.html';
        return;
    }

    // Initialize
    loadStats();
    renderOrdersTable();
    setupEventListeners();
});

// ==========================================
// Stats
// ==========================================
function loadStats() {
    const stats = ordersManager.getStats();
    
    document.getElementById('totalOrdersStat').textContent = 
        stats.total.toLocaleString();
    document.getElementById('pendingOrdersStat').textContent = 
        stats.pending;
    document.getElementById('todayRevenue').textContent = 
        formatPrice(stats.revenue);
}

// ==========================================
// Orders Table
// ==========================================
function renderOrdersTable(filter = 'all') {
    const tbody = document.getElementById('ordersTableBody');
    let orders = ordersManager.orders;

    if (filter !== 'all') {
        orders = orders.filter(o => o.status === filter);
    }

    tbody.innerHTML = orders.map(order => `
        <tr data-order-id="${order.id}" 
            class="${order.id === selectedOrderId ? 'selected' : ''}"
            onclick="selectOrder('${order.id}')">
            <td><strong>${order.id}</strong></td>
            <td>
                <div class="customer-info">
                    <div class="customer-avatar">${order.customer.initials}</div>
                    <span>${order.customer.name}</span>
                </div>
            </td>
            <td>${order.date}</td>
            <td>
                <span class="order-status ${getStatusClass(order.status)}">
                    ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </td>
            <td><strong>${formatPrice(order.total)}</strong></td>
        </tr>
    `).join('');

    // Select first order if none selected
    if (!selectedOrderId && orders.length > 0) {
        selectOrder(orders[0].id);
    }
}

// ==========================================
// Order Detail
// ==========================================
function selectOrder(orderId) {
    selectedOrderId = orderId;
    const order = ordersManager.orders.find(o => o.id === orderId);
    
    if (!order) return;

    // Update table selection
    document.querySelectorAll('#ordersTableBody tr').forEach(row => {
        row.classList.toggle('selected', row.dataset.orderId === orderId);
    });

    // Update detail panel
    document.getElementById('detailOrderId').textContent = order.id;
    
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.textContent = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    statusBadge.className = `order-status ${getStatusClass(order.status)}`;

    document.getElementById('detailCustomer').innerHTML = `
        <div class="customer-avatar">${order.customer.initials}</div>
        <div class="detail-customer-info">
            <h4>${order.customer.name}</h4>
            <p>${order.customer.email}<br>${order.customer.phone}</p>
        </div>
    `;

    document.getElementById('detailItems').innerHTML = order.items.map(item => `
        <div class="detail-item">
            <div class="detail-item-info">
                <span class="detail-item-qty">${item.qty}</span>
                <span>${item.name}</span>
            </div>
            <span>${formatPrice(item.price * item.qty)}</span>
        </div>
    `).join('');

    const subtotal = order.total / 1.08;
    const tax = order.total - subtotal;

    document.getElementById('detailTotals').innerHTML = `
        <div class="detail-totals-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="detail-totals-row">
            <span>Tax (8%)</span>
            <span>${formatPrice(tax)}</span>
        </div>
        <div class="detail-totals-row total">
            <span>Total</span>
            <span>${formatPrice(order.total)}</span>
        </div>
    `;

    document.getElementById('statusSelect').value = order.status;
}

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    // Update status
    document.getElementById('updateStatusBtn').addEventListener('click', () => {
        if (!selectedOrderId) return;

        const newStatus = document.getElementById('statusSelect').value;
        ordersManager.updateStatus(selectedOrderId, newStatus);
        
        loadStats();
        renderOrdersTable();
        selectOrder(selectedOrderId);
        
        showAdminToast(`Order ${selectedOrderId} updated to ${newStatus}`);
    });

    // Filter button
    document.querySelector('.btn-action').addEventListener('click', () => {
        showFilterModal();
    });
}

// ==========================================
// Filter Modal
// ==========================================
function showFilterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content bg-dark-card text-white">
                <div class="modal-header border-dark">
                    <h5 class="modal-title">Filter Orders</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-light" onclick="filterOrders('all')">All Orders</button>
                        <button class="btn btn-outline-warning" onclick="filterOrders('processing')">Processing</button>
                        <button class="btn btn-outline-info" onclick="filterOrders('ready')">Ready</button>
                        <button class="btn btn-outline-success" onclick="filterOrders('delivered')">Delivered</button>
                        <button class="btn btn-outline-danger" onclick="filterOrders('cancelled')">Cancelled</button>
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

    window.filterOrders = (status) => {
        bsModal.hide();
        selectedOrderId = null;
        renderOrdersTable(status);
    };
}

// ==========================================
// Toast for Admin
// ==========================================
function showAdminToast(message) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <div class="toast show bg-success text-white">
            <div class="toast-body d-flex align-items-center gap-2">
                <i class="bi bi-check-circle"></i>
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}
