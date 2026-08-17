import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/DB.db", (err) => {
    if (err) {
        console.error("Error al conectar con SQLite:", err.message);
    } else {
        console.log("SQLite conectado");
    }
});

/* db.run To Do:
** Pasar de grupos en relación 1:N a M:N
** Generar proceso para evitar ciclos:
** Opción 1: Trigger en SQL
** Opción 2: Verificación en js con consulta al usuario.
*/

export function initDatabase() {
    console.log("Creando tablas...");
    db.exec(`
        PRAGMA foreign_keys = ON;
        DROP TABLE groups;
        
        CREATE TABLE IF NOT EXISTS solicitud (
            id TEXT PRIMARY KEY,
            Name TEXT NOT NULL,
            Payload TEXT NOT NULL,
            Status TEXT NOT NULL DEFAULT 'PENDING',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS groups (
            id TEXT PRIMARY KEY,
            Name TEXT NOT NULL,
            Father_id TEXT,

            FOREIGN KEY (Father_id)
                REFERENCES groups(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS group_solicitud (
            group_id TEXT NOT NULL,
            solicitud_id TEXT NOT NULL,

            PRIMARY KEY (group_id, solicitud_id),

            FOREIGN KEY (group_id)
                REFERENCES groups(id)
                ON DELETE CASCADE,

            FOREIGN KEY (solicitud_id)
                REFERENCES solicitud(id)
                ON DELETE CASCADE
        );
    `);
}

export default db;