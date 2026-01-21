import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { inicializarMesas, crearTablas } from './dataBase.js';

// --- 1. CONFIGURACIÓN DE RUTAS ---

// Detectamos si estamos en producción (dentro del ASAR
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Usamos process.resourcesPath que es muy confiable en Electron para detectar producción
const isProd = process.mainModule ? process.mainModule.filename.includes('app.asar') : __dirname.includes('app.asar');
const baseDir = isProd
    ? path.join(process.env.APPDATA, 'ApiBar') // Carpeta en la PC del cliente
    : path.join(__dirname, '..', 'local_db');  // Carpeta en el proyecto

// Asegurar que la carpeta exista antes de crear la DB
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

const dbPath = path.join(baseDir, 'barDB.db');
const db = new Database(dbPath);

// --- 2. OPTIMIZACIÓN DE SQLITE ---

db.pragma('foreign_keys = ON'); // Activar integridad referencial
db.pragma('journal_mode = WAL'); // Altamente recomendado para mejor rendimiento


//--- 3. INICIALIZACIÓN DE LA BASE DE DATOS ---
function inicializarBD() {
    try {
        crearTablas(db);
        inicializarMesas(db);
        console.log(`Base de datos lista en: ${dbPath}`);
    } catch (err) {
        console.error("Error fatal al inicializar la DB:", err.message);
    }
}

inicializarBD();
export default db;