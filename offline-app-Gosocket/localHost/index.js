import "dotenv/config";

import express from "express";
import cors from "cors";

import db from "./database/database.js";
import { initDatabase } from "./database/database.js";
import { startKeepAlive } from "./service/keepAlive.js";

import groupsRoutes from "./routes/groups.js"
import solicitudesRoutes from "./routes/solicitudes.js"

//import functions from "./service/process/index.js";
//functions.Template();

const app = express();
initDatabase();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
}));

/*app.get("/api/test", (req, res) => {
    db.all(`
            SELECT name
            FROM sqlite_master
            WHERE type = 'table'
        `, (err, rows) => {
            if (err) {
                console.error(err);
                return;
        }

    console.log(rows);
    res.json(rows);
    });
});*/

app.use("/api/agrupaciones", groupsRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

startKeepAlive();

app.listen(3000, () => {
    console.log("Backend funcionando en http://localhost:3000");
});