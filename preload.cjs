try {
  const { contextBridge, ipcRenderer } = require('electron');
  
  contextBridge.exposeInMainWorld('api', {
    saludo: () => console.log("¡Hola desde el preload!"),

    guardarPedido: (data) => ipcRenderer.invoke('guardarPedido', data),
    guardarDetallePedido: (data) => ipcRenderer.invoke('guardarDetallePedido', data),
    obtenerPedidos: () => ipcRenderer.invoke('obtenerPedidos'),
    obtenerUltimoPedido: () => ipcRenderer.invoke('obtenerUltimoPedido'),
    imprimirTicket: (data) => ipcRenderer.invoke('imprimirTicket', data),

    listarImpresoras: () => ipcRenderer.invoke('listarImpresoras'),
    testPrint: () => ipcRenderer.invoke('test-print'),

    obtenerAlimentos: () => ipcRenderer.invoke('obtenerAlimentos'),
    guardarAlimento: (data) => ipcRenderer.invoke('guardarAlimento', data),

    guardarBebida: (data) => ipcRenderer.invoke('guardarBebida', data),
    obtenerBebidas: () => ipcRenderer.invoke('obtenerBebidas'),
    consumirBebida: (data) => ipcRenderer.invoke('consumirBebida', data),

    guardarMenu: (data) => ipcRenderer.invoke('guardarMenu', data),
    obtenerMenus: () => ipcRenderer.invoke('obtenerMenus')
  });
  console.log("Preload: DB cargada correctamente");

} catch (err) {
  console.error("Error en preload.js:", err);
}


