import './css/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { IniciarSesionPage } from "./pages/auth/IniciarSesionPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './states/store';
import { getAutenticacionToken } from "./connections/helpers/token";
import { CrearUsuarioPage } from './pages/auth/CrearUsuarioPage';
import { ToastContainer } from 'react-toastify';
import { RutaPrivada } from './routes/RutaPrivada';
import { UsuarioLogueado } from './pages/UsuarioLogueado';

getAutenticacionToken();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IniciarSesionPage />} />
          <Route path='/usuario/registrarse' element={<CrearUsuarioPage />} />
          <Route element={<RutaPrivada/>}>
            <Route path='/usuario-logueado' element={<UsuarioLogueado/>} />
          </Route>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </Provider>
  )
}

export default App;