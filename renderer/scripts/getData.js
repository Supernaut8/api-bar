const obtenerAlimentos = async () => {
    try {
        const alimentosData = await window.api.obtenerAlimentos();
        console.log("alimentos disponibles: ", alimentosData);
        return alimentosData;
    }
    catch (error) {
        console.error("Error al obtener alimentos: ", error);
        return [];
    }
}

const obtenerMenus = async () => {
    try {
        const comidasData = await window.api.obtenerMenus();
        console.log("Menus disponibles: ", comidasData);
        return comidasData;
    }
    catch (error) {
        console.error("Error al obtener menús:", error);
        return [];
    }
}

const obtenerBebidas = async () => {
    try {
        const bebidasData = await window.api.obtenerBebidas();
        console.log("Bebidas disponibles: ", bebidasData);
        return bebidasData;
    }
    catch (error) {
        console.error("Error al obtener bebidas: ", error);
        return [];
    }
}

const obtenerPedidos = async () => {
    try {
        const pedidosData = await window.api.obtenerPedidos();
        console.log("Pedidos realizados: ", pedidosData);
        return pedidosData;
    }
    catch (error) {
        console.error("Error al obtener pedidos: ", error);
        return [];
    }
}

const obtenerUltimoPedido = async () => {
    try {
        const pedidoData = await window.api.obtenerUltimoPedido();
        console.log("Último pedido realizado: ", pedidoData);
        return pedidoData;
    }
    catch (error) {
        console.error("Error al obtener último pedido: ", error);
        return [];
    }
}

export { obtenerAlimentos, obtenerBebidas, obtenerMenus, obtenerPedidos, obtenerUltimoPedido };