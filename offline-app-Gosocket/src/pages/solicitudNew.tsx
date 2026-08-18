import { useState } from "react";
import { postSolicitud } from "./../services/offlineDB";

//Crea una nueva solicitud
function SolicitudNew() {
    const [name, setName] = useState<string>("");
    const [payload, setPayload] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const crear = async () => {
        const namet = name.trim();
        const payloadt = payload.trim();

        if (!namet || !payloadt) {
            setError("Datos incompletos o faltantes");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await postSolicitud({
                Name: namet,
                Payload: payloadt,
            });

            setName("");
            setPayload("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Error al crear la comanda"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Nueva Solicitud</h3>

            <div>
                <label htmlFor="nombre">
                    Nombre
                </label>
                <input
                    id="nombre"
                    type="text"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Nombre de la solicitud"
                />
                <label htmlFor="payload">
                    Payload
                </label>
                <input
                    id="payload"
                    type="text"
                    value={payload}
                    onChange={(e) =>
                        setPayload(e.target.value)
                    }
                    placeholder="Contenido de la solicitud"
                />
            </div>

            {error && (
                <p>{error}</p>
            )}

            <button
                type="button"
                onClick={crear}
                disabled={loading}
            >
                {loading
                    ? "Creando..."
                    : "Crear solicitud"}
            </button>
        </div>
    );
}

export default SolicitudNew;