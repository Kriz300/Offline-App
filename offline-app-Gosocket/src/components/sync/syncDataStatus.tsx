//Elemento descartado que puede ser reutilizado para que el Backend Local muestre el estado de la conexión con el servidor principal
import React, { useEffect, useState } from 'react';
import { subscribeToSyncStatus } from '../../services/syncService';
import { statusText } from '../../shared/syncStatus';
import './syncDataStatus.css';

export default function SyncDataStatus() {
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = subscribeToSyncStatus((newStatus:string | null) => {
            setStatus(newStatus);
            if (newStatus === 'Ok') {
                setTimeout(() => setStatus(null), 1800);
            }
            if (newStatus === 'error') {
                setTimeout(() => setStatus(null), 3000);
            }
        });
        return unsubscribe;
    }, []);
    
    if (!status) return null;
    
    console.log(status);
    return (
        <div className={`sync-notification sync-${status}`}>
            {statusText[status]}
        </div>
    );
} 