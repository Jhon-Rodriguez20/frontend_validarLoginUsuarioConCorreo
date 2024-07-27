import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./sliceReducers";
import crearUsuarioReducer from "./crearUsuarioStore";

const store = configureStore({
    reducer: {
        usuario: usuarioReducer,
        crearUsuario: crearUsuarioReducer,
    }
});

export { store }