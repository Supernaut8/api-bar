// mensajesAlCliente.js

// Definición global de la variable (inicialmente null)
let toastContainer = null;

// La función principal del Toast
function showToast(message, type = 'info') {
    // 1. CRÍTICO: Si el contenedor es null, intentamos buscarlo de nuevo.
    // Esto maneja llamadas que ocurren justo al inicio de la carga.
    if (toastContainer === null) {
        toastContainer = document.querySelector('.toast-container');
    }

    if (toastContainer === null) {
        console.error("ERROR: No se puede mostrar el Toast. El contenedor '.toast-container' no fue encontrado en el DOM.");
        return; 
    }
    
    // (El resto de tu lógica de Toast que usa Bootstrap)
    const bgColorClass = `bg-${type}`;
    const toastId = `toast-${Date.now()}`;
    
    const getIcon = (type) => {
        switch (type) {
            case 'success': return '✅';
            case 'danger': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    };
    
    // =========================================================
    // MODIFICACIÓN CRÍTICA DEL HTML: Mayor ancho, más padding y texto grande
    // =========================================================
    const toastHTML = `
      <div id="${toastId}" 
           class="toast align-items-center text-white ${bgColorClass} border-0 
                  w-40 p-2"             role="alert" 
           aria-live="assertive" 
           aria-atomic="true">
        <div class="d-flex align-items-center">
          
          <span class="fs-4 me-3">${getIcon(type)}</span> <div class="toast-body h6 mb-0 flex-grow-1"> ${message}
          </div>
          
          <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    // 2. Aquí es donde fallaba antes:
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: true,
      delay: 5000
    });

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
    
    toast.show();
}

// 3. Inicialización Temprana (Opcional, pero bueno para asegurar)
// Asegura que la variable 'toastContainer' se encuentre tan pronto como el DOM esté listo.
document.addEventListener('DOMContentLoaded', () => {
    toastContainer = document.querySelector('.toast-container');
});
