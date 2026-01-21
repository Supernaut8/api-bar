import { ipcMain, BrowserWindow } from 'electron';
import alimentosService from './services/alimentosService.js';
import bebidasService from './services/bebidasService.js';
import menusService from './services/menusService.js';
import pedidosService from './services/pedidosService.js';
import { generarTicket80mm, ticket80mmHTML } from './tickets/ticket80mm.js';
import { generarTicketCocina } from './tickets/ticketCocina.js';

// async function imprimirHTML(html, silent = false) {
//     return new Promise(async (resolve, reject) => {
//         const win = new BrowserWindow({ show: false });

//         await win.loadURL(
//             `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
//         );

//         win.webContents.once('did-finish-load', async () => {
//             try {
//                 await win.webContents.print({
//                     silent,
//                     printBackground: true
//                 });

//                 win.close();
//                 resolve();
//             } catch (err) {
//                 win.close();
//                 reject(err);
//             }
//         });
//     });
// }
async function imprimirHTML(html, silent = false) {
    return new Promise(async (resolve, reject) => {

        const win = new BrowserWindow({
            show: true,              // 🔴 MOSTRAR PARA DEBUG
            width: 400,
            height: 600,
            webPreferences: {
                sandbox: false
            }
        });

        await win.loadURL(
            `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
        );

        win.webContents.once('did-finish-load', () => {

            // 🔴 Delay CLAVE en Windows
            setTimeout(() => {
                win.webContents.print(
                    {
                        silent,
                        printBackground: true
                    },
                    (success, errorType) => {
                        if (!success) {
                            console.error('❌ Error impresión:', errorType);
                            reject(errorType);
                        } else {
                            console.log('🖨️ Impresión OK');
                            resolve();
                        }
                        win.close();
                    }
                );
            }, 500); // ← CLAVE
        });
    });
}


function registerIpcHandlers() {

    ipcMain.handle('guardarAlimento', async (event, data) => {
        return alimentosService.guardarAlimento(data);
    });
    ipcMain.handle('obtenerAlimentos', async () => {
        return alimentosService.obtenerAlimentos();
    });

    ipcMain.handle('guardarBebida', async (event, data) => {
        return bebidasService.guardarBebida(data);
    });
    ipcMain.handle('obtenerBebidas', async () => {
        return bebidasService.obtenerBebidas();
    });
    ipcMain.handle('obtenerBebidaId', async (event, data) => {
        return bebidasService.obtenerBebidaId(data);
    });
    ipcMain.handle('consumirBebida', async (event, data) => {
        return bebidasService.consumirBebida(data);
    });


    ipcMain.handle('guardarMenu', async (event, data) => {
        return menusService.guardarMenu(data);
    });
    ipcMain.handle('obtenerMenus', async () => {
        return menusService.obtenerMenus();
    });
    ipcMain.handle('obtenerMenuId', async (event, data) => {
        return menusService.obtenerMenuId(data);
    });


    ipcMain.handle('guardarPedido', async (event, data) => {
        return pedidosService.guardarPedido(data);
    });
    ipcMain.handle('guardarDetallePedido', async (event, data) => {
        return pedidosService.guardarDetallePedido(data);
    });
    ipcMain.handle('obtenerPedidos', async () => {
        return pedidosService.obtenerPedidos();
    });
    ipcMain.handle('obtenerUltimoPedido', async () => {
        return pedidosService.obtenerUltimoPedido();
    });

    // ipcMain.handle('imprimirTicket', async (event, data) => {
    //     console.log('DATA RECIBIDA EN IPC:', data);
    //     const win = new BrowserWindow({ show: false });

    //     // === TICKET CLIENTE ===
    //     const textoCliente = generarTicket80mm(data);
    //     const htmlCliente = ticket80mmHTML(textoCliente);

    //     await win.loadURL(
    //         `data:text/html;charset=utf-8,${encodeURIComponent(htmlCliente)}`
    //     );

    //     await win.webContents.print({
    //         silent: false,        // 👈 USAR FALSE PARA PROBAR EN A4
    //         printBackground: true
    //     });

    //     // === TICKET COCINA ===
    //     const textoCocina = generarTicketCocina(data);
    //     const htmlCocina = ticket80mmHTML(textoCocina);

    //     await win.loadURL(
    //         `data:text/html;charset=utf-8,${encodeURIComponent(htmlCocina)}`
    //     );

    //     await win.webContents.print({
    //         silent: false,        // imprime segundo ticket
    //         printBackground: true
    //     });

    //     win.close();
    // });
    ipcMain.handle('imprimirTicket', async (event, data) => {
        console.log('DATA RECIBIDA EN IPC:', data);

        // === CLIENTE ===
        const textoCliente = generarTicket80mm(data);
        const htmlCliente = ticket80mmHTML(textoCliente);

        await imprimirHTML(htmlCliente, false); // silent:false para probar

        // === COCINA ===
        // const textoCocina = generarTicketCocina(data);
        // const htmlCocina = ticket80mmHTML(textoCocina);

        // await imprimirHTML(htmlCocina, false);

        return true;
    });

    ipcMain.handle('listarImpresoras', async () => {
        const win = new BrowserWindow({ show: false });
        const printers = await win.webContents.getPrintersAsync();
        win.close();
        return printers;
    });

    ipcMain.handle('test-print', async () => {
        const win = new BrowserWindow({ show: false });
        await win.loadURL('data:text/html,<h1>TEST</h1>');
        await win.webContents.print({ silent: false });
    });
}

export default registerIpcHandlers;