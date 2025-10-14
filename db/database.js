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
  CREATE TABLE IF NOT EXISTS bebida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    variedad TEXT UNIQUE NOT NULL,
    stock INTEGER,
    precio REAL    
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    variedad TEXT,
    stock INTEGER,
    precio REAL    
    esBebida INTEGER DEFAULT 0
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nro_mesa INTEGER,
    id_alimento INTEGER,    
    cantidad INTEGER,
    FOREIGN KEY("nro_mesa") REFERENCES "mesa"("nro")
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

function guardarBebida(variedad, tipo, stock, precio) {
  const stmt = db.prepare(`INSERT INTO bebida (variedad, tipo, stock, precio)VALUES (?, ?, ?, ?)
                          ON CONFLICT(variedad) DO UPDATE SET
                            stock = stock + excluded.stock,
                            precio = excluded.precio`);
  stmt.run(variedad, tipo, stock, precio);
  //const stmt = db.prepare(`INSERT INTO alimento (variedad, tipo, stock, precio) VALUES (?, ?, ?)`);
  //stmt.run(variedad, tipo, stock, precio);
}

function obtenerBebidas() {
  const stmt = db.prepare(`SELECT * FROM bebida`);
  return stmt.all();
}

function guardarMenu(tipo, variedad, stock, precio) {
  const stmt = db.prepare(`INSERT INTO menu (tipo, variedad, stock, precio)VALUES (?, ?, ?, ?)`);
  stmt.run(tipo, variedad, stock, precio);
}

function obtenerMenus() {
  const stmt = db.prepare(`SELECT * FROM menu`);
  return stmt.all();
}

module.exports = {
  guardarPedido,
  obtenerPedidos,
  guardarBebida,
  obtenerBebidas,
  guardarMenu,
  obtenerMenus
};
