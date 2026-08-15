import { useEffect, useState } from "react";
import { getSolicitudes } from "./../services/offlineDB";
import type { Solicitud } from "./../types/solicitud";
import SolicitudCard from "../components/solicitudes/solicitudCard";

function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null|string>(null);

    useEffect(() => {
        async function cargar() {
            try {
                const data = await getSolicitudes();
                setSolicitudes(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Error desconocido"
                );
            } finally {
                setLoading(false);
            }
        }

        cargar();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Solicitudes</h1>

            {solicitudes.map((solicitud) => (
                <SolicitudCard
                    key={solicitud.id}
                    solicitud={solicitud}
                />
            ))}
        </div>
    );
}

export default Solicitudes;