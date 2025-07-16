const Database = require('better-sqlite3');
const path = require('path');

// Ruta absoluta (mejor para evitar problemas de ubicación)
const dbPath = path.join(__dirname, 'barDB.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Crear tabla si no existe

db.prepare(`
  CREATE TABLE IF NOT EXISTS mesa (
    nro INTEGER PRIMARY KEY,
    id_pedido INTEGER,
    FOREIGN KEY("id_pedido") REFERENCES "pedido"("id")
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS alimento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT UNIQUE NOT NULL,
    stock INTEGER,
    precio REAL    
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nro_mesa INTEGER,
    id_alimento INTEGER,    
    cantidad INTEGER,
    FOREIGN KEY("nro_mesa") REFERENCES "mesa"("nro")
    FOREIGN KEY("id_alimento") REFERENCES "alimento"("id")
  )
`).run();

function guardarPedido(nro_mesa, alimento, cantidad) {
  const stmt = db.prepare(`INSERT INTO pedido (nro_mesa, alimento, cantidad) VALUES (?, ?, ?)`);
  stmt.run(nro_mesa, alimento, cantidad);
}

function obtenerPedidos() {
  const stmt = db.prepare(`SELECT * FROM pedido`);
  return stmt.all();
}

function guardarArticulo(nombre, cantidad, precio) {
  const stmt = db.prepare(`INSERT INTO alimento (nombre, stock, precio)VALUES (?, ?, ?)
                          ON CONFLICT(nombre) DO UPDATE SET
                            stock = stock + excluded.stock,
                            precio = excluded.precio`);
  stmt.run(nombre, cantidad, precio);
  //const stmt = db.prepare(`INSERT INTO alimento (nombre, stock, precio) VALUES (?, ?, ?)`);
  //stmt.run(nombre, stock, precio);
}

function obtenerArticulos() {
  const stmt = db.prepare(`SELECT * FROM alimento`);
  return stmt.all();
}

module.exports = {
  guardarPedido,
  obtenerPedidos,
  guardarArticulo,
  obtenerArticulos
};
