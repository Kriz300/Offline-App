//Contiene las funciones para interactuar con el backend local
import type { newSolicitud } from "./../types/solicitud";
import type { newGroup } from "./../types/group";

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

//Obtiene todas las solicitudes almacenadas localmente
export async function getSolicitudes() {
    console.log(`URL: ${API_URL}/solicitudes`);
    const response = await fetch(`${API_URL}/solicitudes`);

    if (!response.ok) {
        throw new Error("Error al obtener las solicitudes");
    }

    return response.json();
}

//Envia una nueva solicitud para que el backend local la procese
export async function postSolicitud(
    data: newSolicitud
): Promise<newSolicitud> {
    const response = await fetch(`${API_URL}/solicitudes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al crear la solicitud");
    }

    return response.json();
}

//Obtiene todas las agrupaciones almacenadas localmente
export async function getGroups() {
    const response = await fetch(`${API_URL}/agrupaciones`);

    if (!response.ok) {
        throw new Error("Error al obtener las agrupaciones");
    }

    return response.json();
}

//Envia una nueva agrupación para que el backend local la procese
export async function postGroup(
    data: newGroup
): Promise<newGroup> {
    const response = await fetch(`${API_URL}/agrupaciones`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al crear la agrupación");
    }

    return response.json();
}