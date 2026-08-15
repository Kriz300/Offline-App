import express from "express";
import db from "./../database/database.js";

const router = express.Router();

router.get("/", (req, res) => {
    const groups = db
        .prepare("SELECT * FROM groups")
        .all();
    res.json(groups);
});

router.get("/:id", (req, res) => {
    // obtener agrupación
});

router.post("/", (req, res) => {
    // crear agrupación
});

router.put("/:id", (req, res) => {
    // modificar agrupación
});

router.delete("/:id", (req, res) => {
    // eliminar agrupación
});

router.get("/:id/solicitudes", (req, res) => {
    // listar solicitudes
});

router.post("/:id/solicitudes/:solicitudId", (req, res) => {
    // agregar solicitud
});

router.delete("/:id/solicitudes/:solicitudId", (req, res) => {
    // quitar solicitud
});

router.get("/:id/groups", (req, res) => {
    // listar subgroups
});

router.post("/:id/groups/:groupId", (req, res) => {
    // agregar relación
});

router.delete("/:id/groups/:groupId", (req, res) => {
    // quitar relación
});

router.get("/:id/list", (req, res) => {
    // obtener árbol completo
});

router.post("/:id/ToDO", (req, res) => {
    // ejecutar acción sobre todo el grupo
});

export default router;