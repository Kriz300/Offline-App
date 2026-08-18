//Elemento descartado que puede ser reutilizado para que el Backend Local muestre el estado de la conexión con el servidor principal

//import indexedDBService from './offlineDB';

// --- Sync status event system ---
const listeners:Array<(status:string|null) => void> = [];
export function subscribeToSyncStatus(listener:(status: string|null) => void) {
    listeners.push(listener);
    return () => {
        const idx = listeners.indexOf(listener);
        if (idx > -1) listeners.splice(idx, 1);
    };
}
function notifySyncStatus(status:string|null) {
    listeners.forEach((listener) => listener(status));
}
// --- End event system ---

class SyncData {
    isOnline: boolean;
    syncInProgress: boolean;

    constructor() {
        this.isOnline = navigator.onLine;
        this.syncInProgress = false;

        window.addEventListener('online', this.handleOnline.bind(this));
        window.addEventListener('offline', this.handleOffline.bind(this));
    }

    handleOnline() {
        this.isOnline = true;
        this.syncData();
    }

    handleOffline() {
        this.isOnline = false;
    }

    async syncData() {
        if (!this.isOnline || this.syncInProgress) {
            return;
        }

        this.syncInProgress = true;
        notifySyncStatus('Loading');
    }
}

export default new SyncData();