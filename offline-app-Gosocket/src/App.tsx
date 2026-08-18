//import { useState } from 'react'
//import ConnectionStatus from './components/connection/connectionStatus';
//import SyncDataStatus from './components/sync/syncDataStatus';
import SolicitudList from "./pages/solicitudList";
import SolicitudNew from "./pages/solicitudNew";
import GroupList from "./pages/groupList";
import GroupNew from "./pages/groupNew";
import './App.css'

function App() {
    return (
        <div className="app">
            {/*
            <SyncDataStatus />
            <header className="app-header">
                <h1>Offline-First Notes App</h1>
                <ConnectionStatus />
            </header>
            */}
            <header className="app-header">
                <h1>Offline-First Notes App</h1>
            </header>
            <SolicitudNew />
            <SolicitudList />
            <h1>Offline-First Notes App</h1>
            <GroupNew />
            <GroupList />
        </div>
    );
}

export default App
