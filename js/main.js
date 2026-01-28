/* ============================================
   JAVASCRIPT PRINCIPAL - WebGuía Completa
   ============================================
   Archivo: main.js
   Descripción: Funcionalidades principales del sitio
   ============================================ */

// ====== ESPERAR A QUE EL DOM CARGUE ======
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 WebGuía Completa - Inicializado');
    
    // Inicializar todas las funcionalidades
    initCopyButtons();
    initScrollToTop();
    initSmoothScroll();
    initNavbarScroll();
    initTooltips();
    initAnimations();
});

// ============================================
// FUNCIÓN: Copiar código al portapapeles
// ============================================
function initCopyButtons() {
    // Seleccionar todos los botones de copiar
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            // Obtener el contenedor de código más cercano
            const codeContainer = this.closest('.card-body, .example-code, .code-container');
            const codeElement = codeContainer.querySelector('pre code, pre');
            
            if (codeElement) {
                try {
                    // Copiar el texto al portapapeles
                    await navigator.clipboard.writeText(codeElement.textContent);
                    
                    // Mostrar feedback visual
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="bi bi-check2 me-1"></i>¡Copiado!';
                    this.classList.add('btn-success');
                    this.classList.remove('btn-outline-primary', 'btn-outline-secondary', 'btn-outline-warning');
                    
                    // Restaurar después de 2 segundos
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('btn-success');
                        this.classList.add('btn-outline-primary');
                    }, 2000);
                    
                } catch (err) {
                    console.error('Error al copiar:', err);
                    showToast('Error al copiar el código', 'error');
                }
            }
        });
    });
}

// ============================================
// FUNCIÓN: Botón scroll to top
// ============================================
function initScrollToTop() {
    // Crear el botón si no existe
    let scrollBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(scrollBtn);
    }
    
    // Mostrar/ocultar según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Acción del botón
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FUNCIÓN: Smooth scroll para enlaces internos
// ============================================
function initSmoothScroll() {
    // Seleccionar todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignorar si es solo "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calcular offset por el navbar fijo
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FUNCIÓN: Efecto en navbar al hacer scroll
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.98)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = '';
        }
    });
}

// ============================================
// FUNCIÓN: Inicializar tooltips de Bootstrap
// ============================================
function initTooltips() {
    // Verificar si Bootstrap está disponible
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
}

// ============================================
// FUNCIÓN: Animaciones al hacer scroll
// ============================================
function initAnimations() {
    // Observador de intersección para animaciones
    const animatedElements = document.querySelectorAll('.card, .example-container, [data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// FUNCIÓN: Mostrar notificaciones toast
// ============================================
function showToast(message, type = 'info') {
    // Crear contenedor si no existe
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Definir colores según tipo
    const bgColors = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-info'
    };
    
    const icons = {
        success: 'bi-check-circle',
        error: 'bi-x-circle',
        warning: 'bi-exclamation-triangle',
        info: 'bi-info-circle'
    };
    
    // Crear el toast
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgColors[type]} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi ${icons[type]} me-2"></i>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // Mostrar el toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remover del DOM después de ocultarse
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// ============================================
// FUNCIÓN: Toggle del código (mostrar/ocultar)
// ============================================
function toggleCode(buttonElement) {
    const codeBlock = buttonElement.closest('.example-container').querySelector('.example-code');
    
    if (codeBlock) {
        codeBlock.classList.toggle('d-none');
        
        if (codeBlock.classList.contains('d-none')) {
            buttonElement.innerHTML = '<i class="bi bi-code-slash me-1"></i>Ver Código';
        } else {
            buttonElement.innerHTML = '<i class="bi bi-eye-slash me-1"></i>Ocultar Código';
        }
    }
}

// ============================================
// FUNCIÓN: Resaltar sintaxis básica
// ============================================
function highlightCode(element) {
    let code = element.innerHTML;
    
    // Palabras clave JavaScript
    const jsKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 
                        'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends',
                        'async', 'await', 'try', 'catch', 'throw', 'import', 'export', 'default'];
    
    // Resaltar strings
    code = code.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="code-string">$&</span>');
    
    // Resaltar comentarios
    code = code.replace(/(\/\/.*$)/gm, '<span class="code-comment">$&</span>');
    code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$&</span>');
    
    // Resaltar keywords
    jsKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        code = code.replace(regex, '<span class="code-keyword">$1</span>');
    });
    
    // Resaltar números
    code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');
    
    element.innerHTML = code;
}

// ============================================
// FUNCIÓN: Filtrar elementos (para búsqueda)
// ============================================
function filterElements(searchInput, containerSelector, itemSelector) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll(itemSelector);
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        
        if (text.includes(searchTerm) || searchTerm === '') {
            item.style.display = '';
            item.classList.add('animate-fadeInUp');
        } else {
            item.style.display = 'none';
        }
    });
}

// ============================================
// FUNCIÓN: Debounce para optimizar eventos
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// FUNCIÓN: LocalStorage helpers
// ============================================
const storage = {
    // Guardar datos
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error guardando en localStorage:', e);
            return false;
        }
    },
    
    // Obtener datos
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error leyendo localStorage:', e);
            return null;
        }
    },
    
    // Eliminar datos
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error eliminando de localStorage:', e);
            return false;
        }
    },
    
    // Limpiar todo
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error limpiando localStorage:', e);
            return false;
        }
    }
};

// ============================================
// FUNCIÓN: Validación de formularios
// ============================================
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        // Limpiar errores previos
        input.classList.remove('is-invalid', 'is-valid');
        
        // Validar campo requerido
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
            return;
        }
        
        // Validar email
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
                return;
            }
        }
        
        // Validar teléfono
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
                return;
            }
        }
        
        // Validar contraseña (mínimo 8 caracteres)
        if (input.type === 'password' && input.value && input.value.length < 8) {
            input.classList.add('is-invalid');
            isValid = false;
            return;
        }
        
        // Si llegó aquí, el campo es válido
        if (input.value) {
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// ============================================
// FUNCIÓN: Formatear moneda
// ============================================
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// ============================================
// FUNCIÓN: Formatear fecha
// ============================================
function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Date(date).toLocaleDateString('es-ES', { ...defaultOptions, ...options });
}

// ============================================
// Exponer funciones globalmente si es necesario
// ============================================
window.WebGuia = {
    showToast,
    toggleCode,
    filterElements,
    storage,
    validateForm,
    formatCurrency,
    formatDate,
    debounce
};

console.log('✅ main.js cargado correctamente');
