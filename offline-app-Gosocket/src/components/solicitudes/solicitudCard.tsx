import type { Solicitud } from "./../../types/solicitud";
import "./solicitudCard.css";

interface Props {
    solicitud: Solicitud;
}

function SolicitudCard({ solicitud }: Props) {
    return (
        <article className="solicitud-card">
            <div className="solicitud-card__header">
                <div>
                    <h3 className="solicitud-card__title">
                        {solicitud.Name}
                    </h3>
                </div>
                <span className={`solicitud-card__status solicitud-card__status--${solicitud.Status}`}>
                    Estado: {solicitud.Status}
                </span>
            </div>
            <div>
                <p>{solicitud.Payload}</p>
            </div>
            <p className="solicitud-card__date">
                {new Date(solicitud.createdAt).toLocaleString()}
            </p>
        </article>
    );
}

export default SolicitudCard;