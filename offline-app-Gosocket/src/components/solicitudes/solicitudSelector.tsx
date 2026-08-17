import { useMemo, useState } from "react";
import type { Solicitud } from "./../../types/solicitud";
//import "./SolicitudSelector.css";

interface SolicitudSelectorProps {
    solicitudes: Solicitud[];
    solicitudesSeleccionadas: Solicitud[];
    onChange: (solicitudes: Solicitud[]) => void;
}

export default function SolicitudSelector({
    solicitudes,
    solicitudesSeleccionadas,
    onChange,
}: SolicitudSelectorProps) {
    const [busqueda, setBusqueda] = useState("");
    const [solicitudId, setSolicitudId] = useState<string | "">("");

    const solicitudesFiltradas = useMemo(() => {
        const texto = busqueda.toLowerCase().trim();

        if (!texto) {
            return solicitudes;
        }

        return solicitudes.filter((solicitud) =>
            solicitud.Name
                .toLowerCase()
                .includes(texto)
        );
    }, [solicitudes, busqueda]);

    const agregar = () => {
        if (solicitudId === "") {
            return;
        }

        const solicitud = solicitudes.find(
            (item) => item.id === solicitudId
        );

        if (!solicitud) {
            return;
        }

        const yaExiste = solicitudesSeleccionadas.some(
            (item) => item.id === solicitud.id
        );

        if (yaExiste) {
            return;
        }

        onChange([
            ...solicitudesSeleccionadas,
            solicitud,
        ]);

        setSolicitudId("");
    };

    const eliminar = (id: string) => {
        onChange(
            solicitudesSeleccionadas.filter(
                (solicitud) => solicitud.id !== id
            )
        );
    };

    return (
        <div className="solicitud-selector">
            <div className="solicitud-selector__search">
                <input
                    type="text"
                    placeholder="Buscar solicitud por nombre..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                />
            </div>

            <div className="solicitud-selector__select">
                <select
                    value={solicitudId}
                    onChange={(e) =>
                        setSolicitudId(
                            e.target.value === ""
                                ? ""
                                : String(e.target.value)
                        )
                    }
                >
                    <option value="">
                        Seleccionar solicitud
                    </option>

                    {solicitudesFiltradas.map(
                        (solicitud) => (
                            <option
                                key={solicitud.id}
                                value={solicitud.id}
                            >
                                {solicitud.Name}
                            </option>
                        )
                    )}
                </select>

                <button type="button" onClick={agregar} disabled={solicitudId === ""}> Agregar </button>
            </div>

            <div className="solicitud-selector__list">
                {solicitudesSeleccionadas.length === 0 ? (
                    <p>
                        No hay solicitudes agregadas.
                    </p>
                ) : (
                    solicitudesSeleccionadas.map(
                        (solicitud) => (
                            <div className="solicitud-selector__item" key={solicitud.id}>
                                <div>
                                    <strong>
                                        {solicitud.Name}
                                    </strong>
                                    <button type="button" onClick={() =>eliminar(solicitud.id)}>Eliminar</button>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}