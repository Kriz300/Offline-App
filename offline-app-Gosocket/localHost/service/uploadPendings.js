import db from "./../database/database.js";
import { sendSolicitud } from "./remoteApi.js";

async function getPendings() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM solicitud WHERE Status = "Pending" ORDER BY createdAt ASC;`,
            [],
            (err, rows) => {
                if (err) {
                    console.error("Error obteniendo solicitudes pendientes:", err);
                    reject(err);
                    return {
                        error: "Error obteniendo solicitudes pendientes"
                    };
                }
                resolve(rows);
            });
    });
}

export async function uploadPendings() {
    let getSolicitudes = await getPendings();
    
    for (const solicitud of getSolicitudes) {
        try {
            const result = await sendSolicitud(solicitud);
            console.log(
                `Solicitud ${solicitud.id} sincronizada`
            );
            console.log(result);
            updateStatus(solicitud.id, result.status);
        } catch (error) {
            console.error(
                `No se pudo sincronizar ${solicitud.id}:`,
                error.message
            );
        }
    }
    return "ok";
}

async function updateStatus(solicitudId, status) {
    console.log(status);
    return new Promise((resolve, reject) => {
        db.run(`
            UPDATE solicitud
            SET Status = ?
            WHERE id = ?
        `, [status, solicitudId], function (err) {

            if (err) {
                reject(err);
                return;
            }

            if (this.changes === 0) {
                reject(
                    new Error(
                        `No se encontró la solicitud ${solicitudId}`
                    )
                );
                return;
            }

            console.log(
                `Solicitud ${solicitudId} actualizada a ${status}`
            );

            resolve();
        });
    });
}