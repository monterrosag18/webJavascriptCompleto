/**
 * RestorApp - Authentication
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Verificar si ya está logueado
    if (userManager.isLoggedIn()) {
        redirectUser();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const role = document.getElementById('userRole').value;

        if (!name || !email) {
            alert('Please fill in all fields');
            return;
        }

        // Login
        userManager.login(name, email, role);
        
        // Redirect based on role
        redirectUser();
    });

    function redirectUser() {
        if (userManager.isAdmin()) {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'menu.html';
        }
    }
});
