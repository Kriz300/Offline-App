//import React from 'react';
import { useOnlineStatus } from '../../hooks/onlineStatus';
import './ConnectionStatus.css';

const ConnectionStatus = () => {
    const isOnline = useOnlineStatus();

    return (
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
            <span
                className="status-indicator"
                title={isOnline ? 'Online' : 'Offline'}
                aria-label={isOnline ? 'Online' : 'Offline'}
            />
            <p className="status-message">
                {isOnline ? 'Online' : 'Offline'}
            </p>
        </div>
    );
};

export default ConnectionStatus;