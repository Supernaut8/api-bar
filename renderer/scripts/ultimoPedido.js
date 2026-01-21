import { obtenerUltimoPedido } from "./getData.js";

// Simulación de la función generarTicket80mm para el DOM
async function renderizarPedido(alimentos, fecha, mesa, total) {
    const ultimoPedido = await obtenerUltimoPedido();
    console.log(ultimoPedido)
    const container = document.getElementById('ticket-thermal-container');

    let html = `
                <span class="text-center-ticket bold-ticket">EFECTO REBOTE</span>
                <div class="ticket-line"></div>
                <div>Mesa: ${mesa}</div>
                <div>Fecha: ${fecha}</div>
                <div class="ticket-line"></div>
            `;

    alimentos.forEach(item => {
        const subtotal = item.cantidad * item.precioUnit;
        html += `
                    <div style="margin-top: 5px;">
                        <span class="bold-ticket">${item.nombre}</span>
                        <div class="item-row">
                            <span>  ${item.cantidad} x $${item.precioUnit}</span>
                            <span>$${subtotal}</span>
                        </div>
                    </div>
                `;
    });

    html += `
                <div class="ticket-line"></div>
                <div class="item-row bold-ticket" style="font-size: 16px;">
                    <span>TOTAL:</span>
                    <span>$${total}</span>
                </div>
                <div class="ticket-line"></div>
                <span class="text-center-ticket">Gracias por su visita</span>
            `;

    container.innerHTML = html;
}

// Ejemplo de uso: Aquí podrías levantar los datos de localStorage o de tu estado
const mockAlimentos = [
    { nombre: "Pinta Honey", cantidad: 2, precioUnit: 2500 },
    { nombre: "Hamburguesa Completa", cantidad: 1, precioUnit: 8500 }
];

// Llamada inicial
renderizarPedido(mockAlimentos, new Date().toLocaleString(), "12", 13500);