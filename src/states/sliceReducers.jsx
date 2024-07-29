import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    conectado: false,
    usuario: {}
};

const sliceReducers = createSlice({
    name: 'frontend_validarLoginUsuarioConCorreo',
    initialState,
    reducers: {
        usuario: (state, action) => {
            state.conectado = action.payload.conectado;
            state.usuario = action.payload.usuario;
        },
    },
});

export const { usuario } = sliceReducers.actions;
export default sliceReducers.reducer;