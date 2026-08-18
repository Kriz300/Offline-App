import { useEffect, useState } from "react";
import { getGroups } from "./../services/offlineDB";
import type { Group } from "./../types/group";
import GroupCard from "./../components/groups/groupCard";
import "./css/groupList.css"

//Genera una grid de elementos Card correspondientes a las agrupaciones
function GroupList() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null|string>(null);

    useEffect(() => {
        async function cargar() {
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Error desconocido"
                );
            } finally {
                setLoading(false);
            }
        }

        cargar();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="groups-grid-page">
            <header className="groups-grid-header">
                <div>
                    <h1>Agrupaciones</h1>
                    <p>
                        {groups.length} agrupaciones
                    </p>
                </div>
            </header>
            {groups.length === 0 ? (
                <div className="groups-grid-empty">
                    No hay agrupaciones registradas.
                </div>
            ) : (
                <section className="groups-grid">
                    {groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            group={group}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}

export default GroupList;