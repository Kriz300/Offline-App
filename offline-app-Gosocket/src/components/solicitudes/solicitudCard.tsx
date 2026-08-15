import type { Solicitud } from "./../../types/solicitud";

interface Props {
    solicitud: Solicitud;
}

function SolicitudCard({ solicitud }: Props) {
    return (
        <div>
            <h3>{solicitud.Name}</h3>
            <p>Estado: {solicitud.Status}</p>
            <p>{new Date(solicitud.createdAt).toLocaleString()}</p>
        </div>
    );
}

export default SolicitudCard;