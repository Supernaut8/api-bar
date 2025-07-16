// archivo: alimentos.js
// import {alimento} from "./alimento.js"
import { tablaDePedido } from "./views/tablaPedido.js";

const agregaAlimentos = () => {
  const pedidos = [];
  const alimentos = [];
  const form = document.getElementById("order-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const datos = new FormData(form);

    const nro_mesa = parseInt(datos.get("mesa"));
    if (!nro_mesa) {
      alert("Debe seleccionar una mesa");
      return;
    }

    const categorias = ["Bebidas", "Pizzas", "Platos", "Entradas", "Postres"];

    const pedidoActual = [];

    categorias.forEach((categoria) => {
      const alimento = datos.get(`alimento${categoria}`);
      const cantidadStr = datos.get(`cantidad${categoria}`);
      const cantidad = parseInt(cantidadStr);
      const precioStr = datos.get(`alimento${categoria.precio}`);
      const precio = parseFloat(precioStr);

      if (alimento && cantidadStr && !isNaN(cantidad) && cantidad > 0) {
        window.api.guardarPedido(nro_mesa, alimento, cantidad);
        pedidoActual.push({ nro_mesa, alimento, cantidad, precio });
        alimentos.push(pedidoActual.alimento)
      }
    });

    if (pedidoActual.length === 0) {
      alert("Debe completar al menos un alimento con su cantidad válida");
      return;
    }
    const costoDelPedido = () => {
      alimentos.reduce((sum, precio) => sum + alimentos.precio, 0);
    }

    pedidos.push(...pedidoActual);
    tablaDePedido(pedidos);
    costoDelPedido(pedidoActual)
    form.reset();
  });
};

const cargarPedidos = () => {
  const pedidos = window.api.obtenerPedidos();
  tablaDePedido(pedidos);
};

document.addEventListener("DOMContentLoaded", () => {
  agregaAlimentos();
  cargarPedidos();
});
