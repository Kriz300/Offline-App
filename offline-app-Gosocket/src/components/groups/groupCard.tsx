 import type { GroupListed } from "./../../types/group";
 import "./groupCard.css";
 
 interface Props {
     group: GroupListed;
 }
 
 //Componente que muestra los datos de una agrupación
 function GroupCard({ group }: Props) {
    console.log(group);
     return (
        <article className="group-card">
             <div className="group-card__header">
                 <div>
                     <h3 className="group-card__title">
                         {group.Name}
                     </h3>
                 </div>
                 <span className={`group-card__status`}>
                     Cantidad total de solicitudes: {group.solicitudes_totales}
                 </span>
             </div>
             <div>
                 <p>Solicitudes asociadas: {group.solicitudes_totales}</p>
             </div>
         </article>
     );
 }
 
 export default GroupCard;