import { Link } from "react-router-dom";
import type { ArriendoTerminado } from "../types/arriendo";

type ArriendoTerminadoFilaProps = {
    arriendo: ArriendoTerminado,
    onBorrar: (arriendoId:number) => void
}

export default function ArriendoTerminadoFila({ arriendo, onBorrar }: ArriendoTerminadoFilaProps) {

    return (
        <tr>
            <td>{arriendo.id}</td>
            <td>{arriendo.nombreCliente}</td>
            <td>{arriendo.rutCliente}</td>
            <td>{arriendo.tipoVehiculo}</td>
            <td>{arriendo.patenteVehiculo}</td>
            <td>{new Date(arriendo.fechaInicio).toLocaleDateString("es-CL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })}
            </td>
            <td>
                {arriendo.fechaFin
                    ? new Date(arriendo.fechaFin).toLocaleDateString("es-CL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })
                    : "Sin devolución"}
            </td>
            <td>
                <Link className="btn btn-danger" onClick={() => onBorrar(arriendo.id)} to={""}>
                    <i className="bi bi-trash3-fill"></i>
                </Link>
            </td>
        </tr>
    )
}