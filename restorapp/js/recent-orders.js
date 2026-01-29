// RestorApp - Recent Orders Page

document.addEventListener('DOMContentLoaded', () => {
    if (!userManager.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    renderRecentOrders();
});

function renderRecentOrders() {
    const container = document.getElementById('ordersList');
    let orders = ordersManager.orders;
    const user = userManager.currentUser;
    if (!userManager.isAdmin()) {
        orders = orders.filter(o => o.customer.email === user.email);
    }
    if (orders.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="bi bi-receipt"></i><h4>No recent orders</h4></div>`;
        return;
    }
    container.innerHTML = orders.map(order => `
        <div class="order-card mb-3">
            <div class="order-info">
                <h4>Order <span class="text-secondary">${order.id || ''}</span></h4>
                <p class="mb-1">${order.date || ''}</p>
                <p class="mb-1">${order.items.length} items</p>
                <span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div class="order-meta text-end">
                <div class="order-total">$${order.total.toFixed(2)}</div>
                <div class="text-muted small">${order.customer.name}</div>
            </div>
        </div>
    `).join('');
}
