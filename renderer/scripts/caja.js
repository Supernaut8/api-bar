let displayCash;
let displayCash1;

const inicializaCaja = () => {

    // 1. Leer el valor inicial del storage
    const valorGuardado = localStorage.getItem('cajaEfectivo');

    displayCash = document.getElementById("openInput")
    displayCash.value = "0";

    displayCash1 = document.getElementById("closeInput")
    // 2. Establecer el valor en el input (usando el valor guardado o '0')
    displayCash1.value = valorGuardado ? valorGuardado : "0";

}

// 3. Crear una función para actualizar el input cuando cambie el storage
const actualizarEfectivoEnCaja = () => {
    const valorGuardado = localStorage.getItem('cajaEfectivo');

    if (displayCash1 && valorGuardado) {
        displayCash1.value = valorGuardado;
    }
}

const resetearMonto = () => {
    const botonReset = document.getElementById("resetButton");
    botonReset.addEventListener("click", () => {
       // Agregar modal 'Esta seguro que desea resetear el monto? Se perderá todo registro previo de efectivo', 'warning');
        console.log("Resetear monto");
        localStorage.setItem('cajaEfectivo', '0');
        actualizarEfectivoEnCaja();
    });

}

const abrirCaja = () => {
    const displayCash = document.getElementById("openInput")
    alert(`Caja abierta con un monto inicial de: $${displayCash.value}`);
}

const cerrarCaja = () => {
    const displayCash1 = document.getElementById("closeInput")
    alert(`Caja cerrada con un monto final de: $${displayCash1.value}`);
    displayCash1.value = "0";
}

// 4. Escuchar el evento 'storage' para detectar cambios de OTRA PESTAÑA
window.addEventListener('storage', (event) => {
    if (event.key === 'cajaEfectivo') {
        actualizarInputDesdeStorage();
    }
});

// Inicializar la caja cuando la página esté lista
document.addEventListener("DOMContentLoaded", () => {
    inicializaCaja();
    resetearMonto();
});
// inicializaCaja();

// export { actualizarEfectivoEnCaja };

