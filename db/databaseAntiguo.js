const Database = require('better-sqlite3');
const db = new Database('pedidos.db');

// Crear tabla
db.prepare(`CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mesa INTEGER,
  alimento TEXT,
  cantidad INTEGER
)`).run();

const guardarPedido = (mesa, alimento, cantidad) => {
  const stmt = db.prepare(`INSERT INTO pedidos (mesa, alimento, cantidad) VALUES (?, ?, ?)`);
  stmt.run(mesa, alimento, cantidad);
};

const obtenerPedidos = () => {
  return db.prepare(`SELECT * FROM pedidos`).all();
};

const guardarArticulo = (descripcion, cantidad, precio) => {
  const stmt = db.prepare(`INSERT INTO alimentos (descripcion, cantidad, precio) VALUES (?, ?, ?)`);
  stmt.run(descripcion, cantidad, precio);
}

const obtenerArticulos = () => {
  return db.prepare(`SELECT * FROM alimentos`).all();
};

const guardarMenu = (descripcion, precio) => {
  const stmt = db.prepare(`INSERT INTO menus (descripcion, precio) VALUES (?, ?, ?)`);
  stmt.run(descripcion, precio);
}

const obtenerMenus = () => {
  return db.prepare(`SELECT * FROM menus`).all();
};

module.exports = {
  guardarPedido,
  obtenerPedidos,
  guardarArticulo,
  obtenerArticulos,
  guardarMenu,
  obtenerMenus
};
