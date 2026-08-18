import express from "express";
import { randomUUID } from "node:crypto";
import db from "./../database/database.js";

const router = express.Router();

router.get("/", (req, res) => {
    db.all(`
            WITH RECURSIVE jerarquia AS (

                /*Marcar agrupación como nodo del arbol*/
                SELECT
                    id AS raiz_id,
                    id AS group_id
                FROM groups

                UNION ALL

                /*Buscar hijos*/
                SELECT
                    j.raiz_id,
                    a.id
                FROM jerarquia j
                INNER JOIN groups a
                    ON a.Father_id = j.group_id
            )

            SELECT
                a.id,
                a.Name,

                /*Padre*/
                padre.id AS Father_id,
                padre.Name AS padre_name,

                /*Solicitudes asociadas directamente a la agrupación*/
                (
                    SELECT COUNT(DISTINCT gs.solicitud_id)
                    FROM group_solicitud gs
                    WHERE gs.group_id = a.id
                ) AS solicitudes_directas,

                /*solicitudes de sub agrupaciones*/
                (
                    SELECT COUNT(DISTINCT gs.solicitud_id)
                    FROM group_solicitud gs
                    INNER JOIN jerarquia j
                        ON j.group_id = gs.group_id
                    WHERE j.raiz_id = a.id
                ) AS solicitudes_totales

            FROM groups a

            LEFT JOIN groups padre
                ON padre.id = a.Father_id

            /*TODO ORDER BY a.created_at DESC*/;
        `, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error consultando SQLite"
                });
            }
            res.json(rows);
    });

    /*db.all("SELECT * FROM groups;", (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Error consultando SQLite"
            });
        }
        res.json(rows);
    });*/
});

router.get("/:id", (req, res) => {
    db.get(`SELECT * FROM groups WHERE id = ?;`,
        [req.params.id],
        (err, row) => {
            if (err) {
                 console.error("Error obteniendo agrupación:", err);

                return res.status(500).json({
                    error: "Error obteniendo agrupación"
                });
            }
            if (!row) {
                return res.status(404).json({
                    error: "Agrupación no encontrada"
                });
            }
            res.json(row);
        });
});

router.post("/", (req, res) => {
    const { Name, solicitudes_hijas } = req.body;
    if (!Name) {// || !Father
        return res.status(400).json({
            error: "Faltan datos"
        });
    }
    try {
        db.serialize(() => {
            db.run("BEGIN TRANSACTION", (err) => {
                if (err) {
                    return res.status(500).json({
                        error: "No se pudo iniciar la transacción"
                    });
                }
                const id = randomUUID();
                db.run(`
                    INSERT INTO groups(
                            id,
                            Name,
                            Father_id
                        )
                        VALUES (?,?,?)
                    `,[id, Name, null],
                    (err, row) => {
                        if (err) {
                            db.run("ROLLBACK", () => {
                                console.error("Error creando agrupación:", err);

                                return res.status(500).json({
                                    error: "Error creando agrupación"
                                });
                            });
                        }
                        // Insertar solicitudes
                        const stmt = db.prepare(`
                            INSERT INTO group_solicitud (
                                group_id,
                                solicitud_id
                            )
                            VALUES (?, ?)
                        `);

                        let error = null;

                        for (const solicitudId of solicitudes_hijas) {
                            try {
                                stmt.run([
                                    id,
                                    solicitudId
                                ]);
                            } catch (err) {
                                error = err;
                                break;
                            }
                        }
                        stmt.finalize((finalizeError) => {

                            if (error || finalizeError) {

                                db.run("ROLLBACK", () => {

                                    console.error(
                                        error || finalizeError
                                    );

                                    return res.status(500).json({
                                        error: "Error asignando solicitudes"
                                    });
                                });
                            }
                            db.run("COMMIT", (err) => {
                                if (err) {
                                    db.run("ROLLBACK", () => {
                                        return res.status(500).json({
                                            error: "Error confirmando agrupación"
                                        });
                                    });
                                }

                                return res.status(201).json({
                                    id,
                                    Name,
                                    solicitudes_hijas
                                });

                            });

                        });
                    });
            });
        });
    } catch (error) {
        console.log(error);
    }
});

router.put("/:id", (req, res) => {
    const { id, Name } = req.body;

    db.run(`
            UPDATE groups
            SET Name = ?
            WHERE id = ?
        `, [Name, id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: "Error obteniendo agrupación actualizada"
                });
            }
            res.json({
                id: Number(id),
                message: `Nuevo nombre ${Name} guardado correctamente`
            });
        });
});

router.delete("/:id", (req, res) => {
    db.run(`
            DELETE FROM groups
            WHERE id = ?
        `,[runreq.params.id],
        (err, row) => {
            if (err) {
                console.error("Error eliminando agrupación:", err);

                return res.status(500).json({
                    error: "Error eliminando agrupación"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Agrupación no encontrada"
                });
            }
            res.status(204).send();
        });
});

//Reconstruir
router.post("/addSolicitud", (req, res) => {

    const { groupId, solicitudId } = req.body;
    console.log("Here?");

    if (!groupId || !solicitudId) {
        return res.status(400).json({
            error: "Faltan datos"
        });
    }

    db.get(`
        SELECT id
        FROM groups
        WHERE id = ?
    `, [groupId], (err, agrupacion) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "Error buscando agrupación"
            });
        }

        if (!agrupacion) {
            return res.status(404).json({
                error: "Agrupación no encontrada"
            });
        }

        // Verificar solicitud
        db.get(`
            SELECT id
            FROM solicitudes
            WHERE id = ?
        `, [solicitudId], (err, solicitud) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Error buscando solicitud"
                });
            }
            if (!solicitud) {
                return res.status(404).json({
                    error: "Solicitud no encontrada"
                });
            }

            // Crear relación
            db.run(`
                INSERT INTO group_solicitud (
                    agrupacion_id,
                    solicitud_id
                )
                VALUES (?, ?)
            `, [
                groupId,
                solicitudId
            ], function (err) {
                if (err) {
                    if (err.code === "SQLITE_CONSTRAINT") {
                        return res.status(409).json({
                            error: "La solicitud ya pertenece a esta agrupación"
                        });
                    }
                    console.error(err);

                    return res.status(500).json({
                        error: "Error asignando solicitud"
                    });
                }

                res.status(201).json({
                    message: "Solicitud agregada correctamente",
                    groupId,
                    solicitudId
                });
            });
        });
    });
});

router.post("/:id/ToDO", (req, res) => {
    // ejecutar acción sobre todo el grupo
});

export default router;