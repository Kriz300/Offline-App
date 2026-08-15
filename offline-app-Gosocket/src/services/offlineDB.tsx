const API_URL = "http://localhost:3000/api";

export async function getSolicitudes() {
    const response = await fetch(`${API_URL}/solicitudes`);

    if (!response.ok) {
        throw new Error("Error al obtener las solicitudes");
    }

    return response.json();
}