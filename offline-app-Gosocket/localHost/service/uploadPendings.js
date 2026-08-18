import db from "./../database/database.js";
import { sendSolicitud } from "./remoteApi.js";
import { startKeepAlive, stopKeepAlive } from "./keepAlive.js";

//Obtiene todas las solicitudes con estado pendiente
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

//Envia al Backend remoto las solicitudes pendientes
export async function uploadPendings() {
    stopKeepAlive();
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
    startKeepAlive();
    return;
}

//Actualiza el estado de las solicitudes pendientes a Procesadas
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