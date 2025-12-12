const Database = require('better-sqlite3');
const path = require('path');

// Ruta absoluta (mejor para evitar problemas de ubicación)
const dbPath = path.join(__dirname, 'barDB.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Crear tabla si no existe

// db.prepare(`
//   CREATE TABLE IF NOT EXISTS alimento (
//     id_alimento INTEGER PRIMARY KEY AUTOINCREMENT,
//     Descripcion	TEXT UNIQUE,
//     variedad	TEXT,
// 	  precio	REAL  
//   )
// `).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS alimento (
    id_alimento INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT UNIQUE NOT NULL,
    variedad TEXT,
    precio REAL NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS bebida (
    id_bebida INTEGER PRIMARY KEY AUTOINCREMENT,
    stock INTEGER NOT NULL,
    id_alimento INTEGER NOT NULL UNIQUE,
    FOREIGN KEY(id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS menu (
    id_menu INTEGER PRIMARY KEY AUTOINCREMENT,
    id_alimento INTEGER NOT NULL UNIQUE,
    FOREIGN KEY(id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE
  )
`).run();

// db.prepare(`
//   CREATE TABLE IF NOT EXISTS bebida (
//     id_bebida INTEGER PRIMARY KEY,
//     stock INTEGER,
//     esBebida INTEGER DEFAULT 0,
//     FOREIGN KEY("id_bebida") REFERENCES "alimento1"("id_alimento")  
//   )
// `).run();

// db.prepare(`
//   CREATE TABLE IF NOT EXISTS menu (
//     id_menu INTEGER PRIMARY KEY,     
//     esBebida INTEGER DEFAULT 0,
//     FOREIGN KEY("id_menu") REFERENCES "alimento1"("id_alimento")
//   )
// `).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS mesa (
    nro INTEGER PRIMARY KEY,
    id_pedido INTEGER,
    FOREIGN KEY("id_pedido") REFERENCES "pedido"("id_pedido")
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS pedido (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    nro_mesa INTEGER,
    id_alimento INTEGER,    
    cantidad INTEGER,
    FOREIGN KEY("nro_mesa") REFERENCES "mesa"("nro")
    FOREIGN KEY("id_alimento") REFERENCES "alimento"("id_alimento")
  )
`).run();

function guardarPedido(nro_mesa, id_alimento, cantidad) {
  const stmt = db.prepare(`INSERT INTO pedido (nro_mesa, id_alimento, cantidad) VALUES (?, ?, ?)`);
  stmt.run(nro_mesa, id_alimento, cantidad);
}

function obtenerPedidos() {
  const stmt = db.prepare(`SELECT * FROM pedido`);
  return stmt.all();
}
function guardarAlimento(descripcion, variedad, precio) {
  const stmt = db.prepare(`INSERT INTO alimento (descripcion, variedad, precio)VALUES (?, ?, ?)
                  ON CONFLICT(descripcion) DO UPDATE SET
                  variedad = excluded.variedad,
                  precio = excluded.precio
               `);
  //stmt.run(descripcion, variedad, precio);
  const info = stmt.run(descripcion, variedad, precio);
  // Si se insertó un nuevo registro, devuelve el nuevo ID.
    if (info.changes > 0 && info.lastInsertRowid !== 0) {
        return info.lastInsertRowid;
    }
    
    // Si NO se insertó (fue un UPDATE), debemos buscar el ID existente.
    // Buscamos el ID por la columna de conflicto (descripcion).
    const row = db.prepare('SELECT id_alimento FROM alimento WHERE descripcion = ?').get(descripcion);
    
    return row.id_alimento; // Devolvemos el ID existente.
}

function guardarBebida(descripcion, variedad, stock, precio) {
  // 1️⃣ Crear primero el alimento
  const idAlimento = guardarAlimento(descripcion, variedad, precio);

  // 2️⃣ Crear la bebida asociada
  const stmt = db.prepare(`INSERT INTO bebida (stock, id_alimento)VALUES (?, ?)
                  ON CONFLICT(id_alimento) DO UPDATE SET
                  stock = stock + excluded.stock
               `);
  const info = stmt.run(stock, idAlimento);
  return { id_bebida: info.lastInsertRowid, id_alimento: idAlimento };
}

// function guardarBebida(variedad, tipo, stock, precio) {
//   const stmt = db.prepare(`INSERT INTO bebida (variedad, tipo, stock, precio)VALUES (?, ?, ?, ?)
//                           ON CONFLICT(variedad) DO UPDATE SET
//                             stock = stock + excluded.stock,
//                             precio = excluded.precio`);
//   stmt.run(variedad, tipo, stock, precio);
// }

// function obtenerBebidas() {
//   const stmt = db.prepare(`SELECT * FROM bebida`);
//   return stmt.all();
// }

function obtenerBebidas() {
  const stmt = db.prepare(`SELECT a.id_alimento, a.descripcion, a.variedad, a.precio, b.id_bebida, b.stock
                  FROM alimento a
                  INNER JOIN bebida b ON a.id_alimento = b.id_alimento;`
                );
  return stmt.all();
}

function guardarMenu(descripcion, variedad, precio) {
  const idAlimento = guardarAlimento(descripcion, variedad, precio);
  const stmt = db.prepare(`INSERT INTO menu (id_alimento)VALUES (?)`);
  const info = stmt.run(idAlimento);
  return { id_menu: info.lastInsertRowid, id_alimento: idAlimento };
}

// function guardarMenu(tipo, variedad, stock, precio) {
//   const stmt = db.prepare(`INSERT INTO menu (tipo, variedad, stock, precio)VALUES (?, ?, ?, ?)`);
//   stmt.run(tipo, variedad, stock, precio);
// }

function obtenerMenus() {
  const stmt = db.prepare(`SELECT a.id_alimento, a.descripcion, a.variedad, a.precio, m.id_menu
                  FROM alimento a
                  INNER JOIN menu m ON a.id_alimento = m.id_alimento;`
                );
  return stmt.all();
}

module.exports = {
  guardarPedido,
  obtenerPedidos,
  guardarAlimento,
  guardarBebida,
  obtenerBebidas,
  guardarMenu,
  obtenerMenus
};
