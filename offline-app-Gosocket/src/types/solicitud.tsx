export interface Solicitud {
    id: string;
    Name: string;
    Payload: string;
    Status: "pendiente" | "preparando" | "listo" | "entregado";
    createdAt: string;
}