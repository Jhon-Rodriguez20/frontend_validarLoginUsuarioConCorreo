import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../../states/store";
import { usuario } from "../../states/sliceReducers";
import { cerrarSesion } from "../usuarioAcciones";

export const setAutenticacionToken = (token) => {
    if(token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const getAutenticacionToken = ()=> {
    if(localStorage.token) {
        setAutenticacionToken(localStorage.token);
        const tokenDecodificado = jwtDecode(localStorage.token);
        store.dispatch(usuario({ usuario: tokenDecodificado, conectado: true }));
        const tiempoActualToken = Math.floor(Date.now() / 1000);

        if(tokenDecodificado.exp < tiempoActualToken) {
            store.dispatch(cerrarSesion());
            window.location.href = "/";
        }
    }
}