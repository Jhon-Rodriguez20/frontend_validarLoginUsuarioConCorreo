import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nombre: '',
    email: '',
    password: '',
    idUsuario: null,
};

// Función para cargar el estado desde localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('crearUsuarioState');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Error loading state: ", err);
        return initialState;
    }
};

// Función para guardar el estado en localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('crearUsuarioState', serializedState);
    } catch (err) {
        console.error("Error saving state: ", err);
    }
};

const crearUsuarioSlice = createSlice({
    name: 'crearUsuario',
    initialState: loadState(),
    reducers: {
        setUsuario: (state, action) => {
            const { nombre, email, password } = action.payload;
            state.nombre = nombre;
            state.email = email;
            state.password = password;
            saveState(state); // Guardar el estado actualizado
        },
        setIdUsuario: (state, action) => {
            state.idUsuario = action.payload;
            saveState(state); // Guardar el estado actualizado
        },
        resetUsuario: () => {
            saveState(initialState);
            return initialState;
        },
    },
});

export const { setUsuario, setIdUsuario, resetUsuario } = crearUsuarioSlice.actions;
export default crearUsuarioSlice.reducer;