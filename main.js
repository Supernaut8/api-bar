import { app, BrowserWindow} from 'electron';
import registerIpcHandlers  from './ipcHandlers.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { generarTicket80mm, ticket80mmHTML } from './tickets/ticket80mm.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();
});