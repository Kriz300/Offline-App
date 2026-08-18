//Estructuras relacionadas a las agrupaciones
export interface Group {
    id: string;
    Name: string;
    agrupacion_padre_id: string;
}

export interface GroupListed {
    id: string;
    Name: string;
    agrupacion_padre_id: string;
    solicitudes_directas: number;
    solicitudes_totales: number;
}

export interface newGroup {
    Name: string;
    solicitudes_hijas: string[];
}