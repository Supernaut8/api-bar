import { tablaDePedido } from "./views/tablaPedido.js";

document.addEventListener("DOMContentLoaded", () => {
  // Obtener y mostrar pedidos guardados
  console.log(window.api);
  const pedidos = window.api.obtenerPedidos();
  const bebidas = window.api.obtenerBebidas();
  tablaDePedido(pedidos);

  // Opcional: Podés cargar más cosas acá si agregás más funcionalidades
});
