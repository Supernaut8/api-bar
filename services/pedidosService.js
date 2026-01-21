import db from '../db/conection.js';

const pedidosService = {
    guardarDetallePedido: (data) => {
        console.log(data);
        const {id_pedido, id_alimento, cantidad, precio} = data;
        const stmt = db.prepare(`INSERT INTO detalle_pedido (id_pedido, id_alimento, cantidad, precio) VALUES (?, ?, ?, ?)`);
        return stmt.run(id_pedido, id_alimento, cantidad, precio);
    },

    guardarPedido: (data) => {
        console.log(data);
        const {fecha_hora, nro_mesa, total} = data;
        const stmt = db.prepare(`INSERT INTO pedido (fecha_hora, nro_mesa, total) VALUES (?, ?, ?)`);
        return stmt.run(fecha_hora, nro_mesa, total);
    },
    
    obtenerPedidos: () => {
        return db.prepare(`
            SELECT P.id_pedido, P.fecha_hora, P.nro_mesa, P.total, DP.cantidad, A.precio, A.descripcion AS nombre
            FROM pedido P
            INNER JOIN detalle_pedido DP ON DP.id_pedido = P.id_pedido
            INNER JOIN alimento A ON DP.id_alimento = A.id_alimento
        `).all();
    },
    
    obtenerUltimoPedido: () => {
        return db.prepare(`
            SELECT id_pedido, fecha_hora, nro_mesa, total
            FROM pedido
            ORDER BY id_pedido DESC
            LIMIT 1
        `).get();
    }
};

export default pedidosService;
