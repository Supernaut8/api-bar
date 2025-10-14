try {
  const { contextBridge } = require('electron');
  const db = require('./db/database.js');

  contextBridge.exposeInMainWorld('api', {
    saludo: () => console.log("¡Hola desde el preload!"),
    guardarPedido: (nro_mesa, id_alimento, cantidad) => db.guardarPedido(nro_mesa, id_alimento, cantidad),
    obtenerPedidos: () => db.obtenerPedidos(),
    guardarBebida: (variedad, tipo, stock, precio) => db.guardarBebida(variedad, tipo, stock, precio),
    obtenerBebidas: () => db.obtenerBebidas(),
    guardarMenu: (tipo, variedad, stock, precio) => db.guardarMenu(tipo, variedad, stock, precio),
    obtenerMenus: () => db.obtenerMenus()
  });
  console.log("Preload: DB cargada correctamente");

} catch (err) {
  console.error("Error en preload.js:", err);
}


