import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    idUsuario: null
};

const recuperarContrasenaSlice = createSlice({
    name: 'recuperarContrasena',
    initialState,
    reducers: {
        setRecuperarContrasena: (state, action) => {
            state.email = action.payload.email;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setIdUsuario: (state, action) => {
            state.idUsuario = action.payload;
        },
        resetRecuperarContrasena: (state) => {
            state.email = '';
            state.idUsuario = null;
        },
    },
});

export const { setRecuperarContrasena, setEmail, setIdUsuario, resetRecuperarContrasena } = recuperarContrasenaSlice.actions;
export default recuperarContrasenaSlice.reducer;