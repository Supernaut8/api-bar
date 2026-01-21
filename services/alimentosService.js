import db from '../db/conection.js';

const alimentosService = {
    guardarAlimento: (data, tipo) => {
        const { descripcion, variedad, precio } = data;
        db.prepare(`
            INSERT INTO alimento (descripcion, variedad, precio, tipo)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(descripcion, tipo) DO UPDATE SET
                variedad = excluded.variedad,
                precio = excluded.precio
        `).run(descripcion, variedad, precio, tipo);
        const row = db.prepare(`
            SELECT id_alimento
            FROM alimento
            WHERE descripcion = ? AND tipo = ?
        `).get(descripcion, tipo);
        return row.id_alimento;
    },

    obtenerAlimentos: () => {
        return db.prepare(`
            SELECT A.id_alimento, A.descripcion, A.variedad, A.precio, A.tipo
            FROM alimento A
        `).all();
    },
};

export default alimentosService;    
