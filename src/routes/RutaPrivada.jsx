import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function RutaPrivada() {
    const conectado = useSelector(estado=> estado.usuario.conectado);
    return (conectado) ? <Outlet/> : <Navigate to={"/"} replace />
}

export {RutaPrivada}