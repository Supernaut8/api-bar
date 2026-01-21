import { tablaDePedido } from "../views/tablaPedido.js";

let bebidasData = window.api.obtenerBebidas();
const pedidosBebidas = [];
let bebidaActual = [];


const comprobarDuplicados = (bebida, variante, cantidad, precio, stock) => {
    const id_bebida = bebidasData.find(b => b.descripcion == variante).id_alimento;
    
    if (pedidosBebidas.some(b => b.descripcion === variante)) {
        const bebidaExistente = pedidosBebidas.find(b => b.descripcion === variante);
        const indice = pedidosBebidas.indexOf(bebidaExistente);
        pedidosBebidas[indice].cantidad += cantidad;
    }
    else {
        bebidaActual = [
            {
                cantidad: cantidad,
                id: id_bebida,
                descripcion: variante,
                variedad: bebida,
                precio: precio,
                stock: stock
            }
        ]
    }
    pedidosBebidas.push(...bebidaActual);
    tablaDePedido(pedidosBebidas);
}

export{ comprobarDuplicados }