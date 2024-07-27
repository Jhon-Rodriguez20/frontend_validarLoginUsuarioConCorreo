import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    conectado: false,
    usuario: {},
};

const sliceReducers = createSlice({
    name: 'frontend_validarLoginUsuarioConCorreo',
    initialState,
    reducers: {
        usuario: (estado, accion) => {
            estado.conectado = accion.payload.conectado;
            estado.usuario = accion.payload.usuario;
        }
    },
});

export const { usuario } = sliceReducers.actions;
export default sliceReducers.reducer;