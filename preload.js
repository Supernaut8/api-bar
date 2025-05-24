const { contextBridge } = require('electron');
const db = require('./db/database');

contextBridge.exposeInMainWorld('api', {
  getMesas: () => db.getMesas(),
  agregarComanda: (mesaId, detalles) => db.agregarComanda(mesaId, detalles)
});