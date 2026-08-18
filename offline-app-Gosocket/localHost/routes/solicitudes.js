import express from "express";
import { randomUUID } from "node:crypto";
import db from "./../database/database.js";

const router = express.Router();

router.get("/", (req, res) => {
    db.all("SELECT * FROM solicitud;", (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Error consultando SQLite"
            });
        }
        res.json(rows);
    }); 
});

router.get("/:id", (req, res) => {
    db.get(`SELECT * FROM solicitud WHERE id = ?;`,
        [req.params.id],
        (err, row) => {
            if (err) {
                 console.error("Error obteniendo solicitud:", err);

                return res.status(500).json({
                    error: "Error obteniendo solicitud"
                });
            }
            if (!row) {
                return res.status(404).json({
                    error: "Solicitud no encontrada"
                });
            }
            res.json(row);
        });
});

router.post("/", (req, res) => {
    const { Name, Payload } = req.body;

    if (!Name || !Payload) {
        return res.status(400).json({
            error: "Faltan datos"
        });
    }

    const id = randomUUID();

    const result = db.run(`
        INSERT INTO solicitud (
                id,
                Name,
                Payload,
                Status
            )
            VALUES (?,?,?,?)
        `,[id, Name, Payload, "Pending"],
        (err, row) => {
            if (err) {
                console.error("Error creando solicitud:", err);

                return res.status(500).json({
                    error: "Error creando solicitud"
                });
            }
            db.get(`
            SELECT
                id,
                Name,
                Payload,
                Status,
                createdAt
            FROM solicitud
            WHERE id = ?
            `,
            [id],
            (err, row) => {

                if (err) {
                    console.error("Error obteniendo solicitud creada:", err);

                    return res.status(500).json({
                        error: "Solicitud creada pero no se pudo recuperar"
                    });
                }

                res.status(201).json({
                    id: id,
                    message: "Ok 200"
                });
            });
        });
});

router.put("/:id", (req, res) => {
    const { id, Name } = req.body;

    db.run(`
            UPDATE solicitud
            SET Name = ?
            WHERE id = ?
        `, [Name, id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: "Error obteniendo solicitud actualizada"
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
            DELETE FROM solicitud
            WHERE id = ?
        `,[runreq.params.id],
        (err, row) => {
            if (err) {
                console.error("Error eliminando solicitud:", err);

                return res.status(500).json({
                    error: "Error eliminando solicitud"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Solicitud no encontrada"
                });
            }
            res.status(204).send();
        });
});

export default router;