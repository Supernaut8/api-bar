let displayCash;
let displayCash1;

const inicializaCaja = () => {

    // document.addEventListener("DOMContentLoaded", () => {
        // 1. Leer el valor inicial del storage
        const valorGuardado = localStorage.getItem('cajaEfectivo');

        displayCash = document.getElementById("openInput")
        displayCash.value = "0";

        displayCash1 = document.getElementById("closeInput")
        // 2. Establecer el valor en el input (usando el valor guardado o '0')
        displayCash1.value = valorGuardado ? valorGuardado : "0";
        // let efectivoAlCierre = parseFloat(displayCash1.value);
        // console.log(efectivoAlCierre);
    // });
}

// 3. Crear una función para actualizar el input cuando cambie el storage
const actualizarEfectivoEnCaja = () => {
    const valorGuardado = localStorage.getItem('cajaEfectivo');

    if (displayCash1 && valorGuardado) {
        displayCash1.value = valorGuardado;
    }
    // let efectivoAlCierre = parseFloat(displayCash1.value, 10);
    // console.log(efectivoAlCierre)
    // efectivoAlCierre = efectivoAlCierre + efectivo;

    // displayCash1.value = efectivoAlCierre.toString();
}

const resetearMonto = () => {
    const displayCash = document.getElementById("openInput") 
    displayCash.value = "0";
    const displayCash1 = document.getElementById("closeInput")
    displayCash1.value = "0";
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
    inicializaCaja()
});
// inicializaCaja();

// export { actualizarEfectivoEnCaja };

