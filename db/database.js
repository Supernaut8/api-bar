//---BASE DE DATOS CON MESAS DEFAULT---
function inicializarMesas(db) {
    const insertMesa = db.prepare(`
        INSERT OR IGNORE INTO mesa (nro)
        VALUES (?)
    `);

    for (let i = 1; i <= 7; i++) {
        insertMesa.run(i);
    }
}

// --- CREACIÓN DE TODAS LAS TABLAS---
function crearTablas(db) {
    const schema = `
        CREATE TABLE IF NOT EXISTS alimento (
            id_alimento INTEGER PRIMARY KEY AUTOINCREMENT,
            descripcion TEXT NOT NULL,
            variedad TEXT,
            precio REAL NOT NULL,
            tipo TEXT NOT NULL CHECK (tipo IN ('bebidas', 'comidas')),
            UNIQUE (descripcion, tipo)
        );

        CREATE TABLE IF NOT EXISTS bebida (
            id_bebida INTEGER PRIMARY KEY AUTOINCREMENT,
            stock INTEGER NOT NULL DEFAULT 0,
            id_alimento INTEGER NOT NULL UNIQUE,
            FOREIGN KEY(id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS menu (
            id_menu INTEGER PRIMARY KEY AUTOINCREMENT,
            id_alimento INTEGER NOT NULL UNIQUE,
            FOREIGN KEY(id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS mesa (
            nro INTEGER PRIMARY KEY,
            estado TEXT DEFAULT 'libre'
        );

        CREATE TABLE IF NOT EXISTS pedido (
            id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha_hora TEXT DEFAULT (datetime('now', 'localtime')),
            nro_mesa INTEGER,
            total REAL,
            FOREIGN KEY(nro_mesa) REFERENCES mesa(nro)
        );

        CREATE TABLE IF NOT EXISTS detalle_pedido (
            id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, 
            id_pedido INTEGER,
            id_alimento INTEGER,    
            cantidad INTEGER,
            precio REAL, 
            FOREIGN KEY(id_pedido) REFERENCES pedido(id_pedido),
            FOREIGN KEY(id_alimento) REFERENCES alimento(id_alimento)
        );
    `
    db.exec(schema); // .exec es mejor para scripts de múltiples consultas
}

export { inicializarMesas, crearTablas };