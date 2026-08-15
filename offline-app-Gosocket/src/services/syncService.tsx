//import indexedDBService from './offlineDB';
//import { apiService } from './remoteApi';

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
        /*
        try {
          // Get pending operations from sync queue
          const syncQueue = await indexedDBService.getSyncQueue();
          
          for (const operation of syncQueue) {
            await this.processOperation(operation);
          }
    
          // Clear sync queue after successful sync
          await indexedDBService.clearSyncQueue();
          
          // Fetch latest data from server
          await this.pullFromServer();
          
          notifySyncStatus('done');
        } catch (error) {
          notifySyncStatus('error');
          console.error('Sync failed:', error);
        } finally {
          this.syncInProgress = false;
        }
        */
    }

    /*async processOperation(operation) {
        switch (operation.operation) {
            case 'CREATE_NOTE':
                await apiService.createNote(operation.data);
                break;
            case 'UPDATE_NOTE':
                await apiService.updateNote(operation.data.id, operation.data);
                break;
            case 'DELETE_NOTE':
                await apiService.deleteNote(operation.data.id);
                break;
            default:
                console.warn('Unknown operation:', operation.operation);
        }
    }*/
}

export default new SyncData();