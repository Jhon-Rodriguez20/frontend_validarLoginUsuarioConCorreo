import './css/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { IniciarSesionPage } from "./pages/auth/IniciarSesionPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './states/store';
import { getAutenticacionToken } from "./connections/helpers/token";
import { CrearUsuarioPage } from './pages/auth/CrearUsuarioPage';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { RutaPrivada } from './routes/RutaPrivada';
import { UsuarioLogueado } from './pages/UsuarioLogueado';
import { RecuperarContrasenaPage } from './pages/auth/RecuperarContrasenaPage';

getAutenticacionToken();

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<IniciarSesionPage />} />
                        <Route path='/usuario/registrarse' element={<CrearUsuarioPage />} />
                        <Route path='/recuperar/contraseña' element={<RecuperarContrasenaPage />} />
                        <Route element={<RutaPrivada/>}>
                            <Route path='/usuario-logueado' element={<UsuarioLogueado/>} />
                        </Route>
                    </Routes>
                <ToastContainer/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;