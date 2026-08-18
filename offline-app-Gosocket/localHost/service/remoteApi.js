const REMOTE_URL = process.env.VITE_REMOTE_API_URL;

export async function sendSolicitud(solicitud) {
    const response = await fetch(`${REMOTE_URL}/solicitudes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: solicitud.id,
            Name: solicitud.Name,
            Payload: solicitud.Payload,
            Status: solicitud.Status,
            createdAt: new Date(solicitud.createdAt).toISOString()
        })
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        throw new Error(
            data?.errors ||
            "El servidor no responde"
        );
    }

    if (!response.ok) {
        throw new Error(
            data?.errors ||
            `Servidor remoto respondió ${response.status}`
        );
    }
    
    if (!data?.success) {
        throw new Error(
            data?.errors ||
            "El servidor no confirmó la recepción de la solicitud"
        );
    }

    return data;
}