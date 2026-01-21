import db from '../db/conection.js';
import alimentosService from './alimentosService.js';

const menusService = {
    guardarMenu: (data) => {
        const tipo = 'comidas';
        const idAlimento = alimentosService.guardarAlimento(data, tipo);
        const info = db.prepare(`INSERT INTO menu (id_alimento) VALUES (?)`).run(idAlimento);
        return { id_menu: info.lastInsertRowid, id_alimento: idAlimento };
    },

    obtenerMenus: () => {
        return db.prepare(`
            SELECT a.id_alimento, a.descripcion, a.variedad, a.precio, m.id_menu
            FROM alimento a
            INNER JOIN menu m ON a.id_alimento = m.id_alimento
            WHERE a.tipo = 'comidas'
        `).all();
    },

    obtenerMenuId: (id_alimento) => {
        return db.prepare(`
            SELECT a.id_alimento, a.descripcion, a.variedad, a.precio, m.id_menu
            FROM alimento a
            INNER JOIN menu m ON a.id_alimento = m.id_alimento
            WHERE a.id_alimento = ?
        `).get(id_alimento);
    }
};

export default menusService;