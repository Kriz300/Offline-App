import { useEffect, useState } from "react";
import { postGroup, getSolicitudes } from "./../services/offlineDB";
import type { Solicitud } from "../types/solicitud";
import SolicitudSelector from "./../components/solicitudes/solicitudSelector";

function SolicitudNew() {
    const [name, setName] = useState<string>("");
    //const [father, setFather] = useState<string>("");
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [solicitudesSeleccionadas, setSolicitudesSeleccionadas] = useState<Solicitud[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const crear = async () => {
        const namet = name.trim();
        //const fathert = father.trim();

        if (!namet) { //|| !fathert
            setError("Datos incompletos o faltantes");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await postGroup({
                Name: namet,
                solicitudes_hijas: solicitudesSeleccionadas.map((solicitud) => solicitud.id)
            });

            setName("");
            //setFather("");
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
        <div>
            <h3>Nueva Agrupación</h3>

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
                    placeholder="Nombre de la Agrupación"
                />
                <SolicitudSelector
                    solicitudes={solicitudes}
                    solicitudesSeleccionadas={solicitudesSeleccionadas}
                    onChange={setSolicitudesSeleccionadas}
                />
                {/** Asignar padre en la creación // Asignar hijo o padre en el edit
                <label htmlFor="payload">
                    Payload
                </label>
                <input
                    id="father"
                    type="text"
                    value={fahter}
                    onChange={(e) =>
                        setFather(e.target.value)
                    }
                    placeholder="Padre de la agrupación"
                />
                */}
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
                    : "Crear agrupación"}
            </button>
        </div>
    );
}

export default SolicitudNew;