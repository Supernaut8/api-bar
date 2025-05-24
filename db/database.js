const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'bar.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS mesas (id INTEGER PRIMARY KEY, nombre TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS comandas (id INTEGER PRIMARY KEY, mesa_id INTEGER, detalle TEXT)`);
  db.run(`INSERT OR IGNORE INTO mesas (id, nombre) VALUES (1, 'Mesa 1'), (2, 'Mesa 2')`);
});

module.exports = {
  getMesas: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mesas', (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  agregarComanda: (mesaId, detalle) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO comandas (mesa_id, detalle) VALUES (?, ?)', [mesaId, detalle], function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID });
      });
    });
  }
};
