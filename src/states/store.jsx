import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import usuarioReducer from "./sliceReducers";
import crearUsuarioReducer from "./crearUsuarioSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["usuario", "crearUsuario"],
};

const rootReducer = combineReducers({
    usuario: usuarioReducer,
    crearUsuario: crearUsuarioReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }),
});

const persistor = persistStore(store);
export { store, persistor }