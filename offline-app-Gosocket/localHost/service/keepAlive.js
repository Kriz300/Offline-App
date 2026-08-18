import { uploadPendings } from "./uploadPendings.js";

const REMOTE_URL = process.env.VITE_REMOTE_API_URL;
const INTERVAL = process.env.VITE_SYNC_INTERVAL;//30_000;

let timer = null;

async function keepAlive() {
    try {
        const response = await fetch(`${REMOTE_URL}/keepalive`);

        if (!response.ok) {
            console.error(
                `KeepAlive: Backend respondió ${response.status}`
            );
            return;
        }

        console.log(`KeepAlive OK: ${new Date().toISOString()}`);
        uploadPendings();
        
    } catch (error) {
        console.error(
            "KeepAlive: Error 500",
            error.message
        );
    }
}

export function startKeepAlive() {

    if (timer) {
        return;
    }
    console.log("Iniciando KeepAlive...");
    //keepAlive();
    timer = setInterval(
        keepAlive,
        INTERVAL
    );
}

export function stopKeepAlive() {

    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    console.log("KeepAlive detenido");
}