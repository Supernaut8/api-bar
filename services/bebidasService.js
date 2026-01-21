import db from '../db/conection.js';
import alimentosService from './alimentosService.js';

const bebidasService = {
    guardarBebida: (data) => {
        const { stock } = data;
        const tipo = 'bebidas';
        const idAlimento = alimentosService.guardarAlimento(data, tipo);
        const stmt = db.prepare(`
            INSERT INTO bebida (stock, id_alimento) VALUES (?, ?)
            ON CONFLICT(id_alimento) DO UPDATE SET
            stock = stock + excluded.stock
        `);
        const info = stmt.run(stock, idAlimento);
        // return { id_bebida: info.lastInsertRowid, id_alimento: idAlimento };
        return { id_alimento: idAlimento };
    },

    obtenerBebidas: () => {
        return db.prepare(`
            SELECT A.id_alimento, A.descripcion, A.variedad, A.precio, B.id_bebida, B.stock
            FROM alimento A
            INNER JOIN bebida B ON A.id_alimento = B.id_alimento
            WHERE A.tipo = 'bebidas'
        `).all();
    },

    obtenerBebidaId: (data) => {
        const{ id_alimento } = data
        return db.prepare(` 
            SELECT a.id_alimento, a.descripcion, a.variedad, a.precio, b.id_bebida, b.stock
            FROM alimento a
            INNER JOIN bebida b ON a.id_alimento = b.id_alimento
            WHERE a.id_alimento = ?
        `).get(id_alimento);
    },

    consumirBebida: (data) => {
        console.log("Contenido de data: ", data)
        const{ id_alimento, cantidad } = data
        return db.prepare(`
        UPDATE bebida 
        SET stock = stock - ? 
        WHERE id_alimento = ?
    `).run(cantidad, id_alimento);
    }
};

export default bebidasService;
