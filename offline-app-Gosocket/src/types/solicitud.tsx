//Estructuras relacionadas a las solicitudes
export type SolicitudStatus =
    | "Pending"
    | "Processed"
    | "Failed";

export interface Solicitud {
    id: string;
    Name: string;
    Payload: string;
    Status: SolicitudStatus;
    createdAt: string;
}

export interface newSolicitud {
    Name: string;
    Payload: string;
}