//Elemento descartado que puede ser reutilizado para que el Backend Local muestre el estado de la conexión con el servidor principal
export const statusText:Record<string, string> = {
    'Loading': 'Procesando solicitudes...',
    'Ok': 'Conectado y sincronizado.',
    'error': 'Sin conexipon al servidor.',
};