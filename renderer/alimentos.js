import { tablaDePedido } from "./views/tablaPedido.js";

const agregaAlimentos = () => {
    const pedidos = [];

    const form = document.getElementById("order-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const mesa = document.getElementById("mesa").value;
        if (!mesa) {
            alert("Debés seleccionar una mesa.");
            return;
        }

        const categorias = [
            { alimentoId: "alimentoBebidas", cantidadId: "cantidadBebidas" },
            { alimentoId: "alimentoPizzas", cantidadId: "cantidadPizzas" },
            { alimentoId: "alimentoPlatos", cantidadId: "cantidadPlatos" },
            { alimentoId: "alimentoEntradas", cantidadId: "cantidadEntradas" },
            { alimentoId: "alimentoPostres", cantidadId: "cantidadPostres" }
        ];

        const pedidoActual = [];

        categorias.forEach(({alimentoId, cantidadId}) => {
            const alimento = document.getElementById(alimentoId).value;
            const cantidad = document.getElementById(cantidadId).value;

            if (alimento && cantidad) {
                pedidoActual.push({
                    mesa: mesa,
                    alimento: alimento,
                    cantidad: cantidad
                });
            }
            console.log(pedidoActual)
        });

        if (pedidoActual.length === 0) {
            alert("Tienes items sin completar");
            return;
        }

        pedidos.push(...pedidoActual);
        tablaDePedido(pedidos)
        console.log("Pedidos acumulados: ", pedidos);
        form.reset()
    });
};

export { agregaAlimentos }

document.addEventListener("DOMContentLoaded", agregaAlimentos);

