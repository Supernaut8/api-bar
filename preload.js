// const { contextBridge } = require('electron');
// const db = require('./db/database');

// contextBridge.exposeInMainWorld('api', {
//   getMesas: () => db.getMesas(),
//   agregarComanda: (mesaId, detalles) => db.agregarComanda(mesaId, detalles)
// });

try {
  const { contextBridge } = require('electron');
  const db = require('./db/database.js');

  //console.log("Preload: DB cargada correctamente");

  contextBridge.exposeInMainWorld('api', {
    saludo: ()=> console.log("¡Hola desde el preload!"),
    guardarPedido: (nro_mesa, alimento, cantidad) => db.guardarPedido(nro_mesa, alimento, cantidad),
    obtenerPedidos: () => db.obtenerPedidos(),
    guardarArticulo: (nombre, stock, precio) => db.guardarArticulo(nombre, stock, precio),
    //obtenerArticulos: () => db.obtenerArticulos()
  });
  console.log("Preload: DB cargada correctamente");
} catch (err) {
  console.error("Error en preload.js:", err);
}


// const { contextBridge } = require('electron');
// const path = require('path');
// const db = require(path.join(__dirname, './db/database.js'));
// contextBridge.exposeInMainWorld('api', {
//   guardarPedido: (mesa, alimento, cantidad) => db.guardarPedido(mesa, alimento, cantidad),
//   obtenerPedidos: () => db.obtenerPedidos()
// });
// console.log("preload ok")