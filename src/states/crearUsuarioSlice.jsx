import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nombre: '',
    email: '',
    password: '',
    idUsuario: null
};

const crearUsuarioSlice = createSlice({
    name: 'crearUsuario',
    initialState,
    reducers: {
        setUsuario(state, action) {
            state.nombre = action.payload.nombre;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setIdUsuario(state, action) {
            state.idUsuario = action.payload;
        },
        resetUsuario() {
            return initialState;
        }
    }
});

export const { setUsuario, setIdUsuario, resetUsuario } = crearUsuarioSlice.actions;
export default crearUsuarioSlice.reducer;