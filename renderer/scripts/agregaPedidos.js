import generarTicket80mm from "./generaTicketCliente.js";
import { obtenerAlimentos, obtenerUltimoPedido } from "./getData.js";
import { limpiarEstadoPedido } from "./pedido.js";

let alimentosEnMemoria = [];

export function agregarPedido(pedidos, efectivo) {
    alimentosEnMemoria = pedidos;
}

document.addEventListener("DOMContentLoaded", () => {
    const campoAConservar = document.getElementById('mesa');
    const form = document.getElementById("order");
    if (!form) return;

    // //Manejo del boton de impresion de ticket
    // const botonImprimir = document.getElementById("imprimir");
    // botonImprimir.textContent = "Imprimir Ticket";
    // botonImprimir.style.display = "none";
    // //------------------------------------------------------------------

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // 1. Referencia al botón y deshabilitar
        const btnEnviar = form.querySelector('input[type="submit"]');
        if (btnEnviar) btnEnviar.disabled = true;

        try {
            const alimentos = await obtenerAlimentos();
            if (alimentosEnMemoria.length === 0) {
                if (btnEnviar) btnEnviar.disabled = false;
                return;
            }

            // botonImprimir.style.display = "block";

            const [{ nro_mesa }] = alimentosEnMemoria;

            const total = alimentosEnMemoria.reduce((acc, alimento) => acc + (Math.round(alimento.precioUnit) * alimento.cantidad), 0)
            console.log(total)
            const ahora = new Date();
            const fecha_hora = ahora.toISOString();
            const fechaTicket = ahora.toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false // Usa formato 24h
            });

            await window.api.guardarPedido({ fecha_hora, nro_mesa, total });
            const pedidoActual = await obtenerUltimoPedido();
            console.log(pedidoActual);
            // alimentosEnMemoria.forEach(alimento => {
            //     const id_pedido = pedidoActual.id_pedido;
            //     const id_alimento = alimentos.find(alim => alim.descripcion == alimento.nombre).id_alimento;
            //     const cantidad = alimento.cantidad;
            //     const precio = alimento.precioUnit;
            //     console.log(fecha_hora, nro_mesa, total);
            //     console.log(id_pedido, id_alimento, cantidad, precio);
            //     window.api.guardarDetallePedido({ id_pedido, id_alimento, cantidad, precio });
            //     if (alimento.tipo == 'bebidas')
            //         window.api.consumirBebida({ id_alimento, cantidad });
            // });
            for (const alimento of alimentosEnMemoria) {
                const id_pedido = pedidoActual.id_pedido;
                const alimEncontrado = alimentos.find(alim => alim.descripcion === alimento.nombre);

                if (alimEncontrado) {
                    const id_alimento = alimEncontrado.id_alimento;
                    const { cantidad, precioUnit: precio } = alimento;

                    // Aquí el await funcionará correctamente si la función padre es async
                    await window.api.guardarDetallePedido({ id_pedido, id_alimento, cantidad, precio });

                    if (alimento.tipo === 'bebidas' || alimento.tipo === 'cerveza') {
                        await window.api.consumirBebida({ id_alimento, cantidad });
                    }
                }
            }
            generarTicket80mm(alimentosEnMemoria, fechaTicket, nro_mesa, total);

            window.api.listarImpresoras().then(printers => {
                console.log(printers);
            });
            //Envio automaticamente a imprimer ticket al enviar pedido:
            window.api.imprimirTicket({
                alimentos: alimentosEnMemoria,
                fecha: fechaTicket,
                mesa: nro_mesa,
                total: total
            });
            console.log(alimentosEnMemoria);
            console.log(generarTicket80mm(alimentosEnMemoria, fechaTicket, nro_mesa, total));

            const registrarVenta = (efectivoNuevo) => {
                // 1. Obtener el or actual (o 0 si es la primera vez)
                let efectivoActual = parseFloat(localStorage.getItem('cajaEfectivo')) || 0;

                // 2. Calcular y guardar el nuevo total
                let nuevoTotal = efectivoActual + efectivoNuevo;

                // 3. Almacenar el nuevo or en el localStorage (compartido entre pestañas)
                localStorage.setItem('cajaEfectivo', nuevoTotal.toString());
            }

            registrarVenta((total));


            // Limpieza
            const tabla = document.querySelector('#order-table');
            if (tabla) tabla.innerHTML = '';

            showToast('Pedido cargado con éxito', 'success');
            function resetearorConservado() {
                campoAConservar.ue = '';
            }
            resetearorConservado();
        } catch (error) {
            console.error(error);
            showToast('Error al cargar pedido', 'danger');
        } finally {
            // 2. Volver a habilitar después de limpiar todo
            if (btnEnviar) btnEnviar.disabled = false;
            alimentosEnMemoria = [];
            limpiarEstadoPedido();
            form.reset();
        }
    });
    // imprimir.addEventListener('click', () => {
    //     const pedido = detalleDelPedido(alimentos);
    //     window.api.imprimirTicket(pedido);
    // });
});