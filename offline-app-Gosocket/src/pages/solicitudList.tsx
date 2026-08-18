import { useEffect, useState } from "react";
import { getSolicitudes } from "./../services/offlineDB";
import type { Solicitud } from "./../types/solicitud";
import SolicitudCard from "./../components/solicitudes/solicitudCard";
import "./css/solicitudList.css";

//Genera una grid de elementos Card correspondientes a las solicitudes
function SolicitudList() {
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

    if (loading) {
        return (
            <main className="solicitudes-grid-page">
                <p>Cargando solicitudes...</p>
            </main>
        );
    }
    if (error) {
        return (
            <main className="solicitudes-grid-page">
                <p className="solicitudes-grid-error">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <div className="solicitudes-grid-page">
            <header className="solicitudes-grid-header">
                <div>
                    <h1>Solicitudes</h1>
                    <p>
                        {solicitudes.length} solicitudes
                    </p>
                </div>
            </header>
            {solicitudes.length === 0 ? (
                <div className="solicitudes-grid-empty">
                    No hay solicitudes registradas.
                </div>
            ) : (
                <section className="solicitudes-grid">
                    {solicitudes.map((solicitud) => (
                    <SolicitudCard
                        key={solicitud.id}
                        solicitud={solicitud}
                    />
                ))}
                </section>
            )}
        </div>
    );
}

export default SolicitudList;