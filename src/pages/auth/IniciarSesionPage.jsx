import { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IniciarSesionForm } from "../../components/auth/IniciarSesionForm";
import { autenticacion } from "../../connections/usuarioAcciones";
import { BackdropProgreso } from "../../components/common/loading/BackdropProgreso";
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { Login } from "@mui/icons-material";

function IniciarSesionPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const navegar = useNavigate();
    const enviarAccion = useDispatch();
    const { alertaError } = useAlertas();

    const iniciarSesion = ({ email, password }) => {
        const mensaje = {};
        setErrores(mensaje);
        setCargando(true);

        enviarAccion(autenticacion({ email, password }))
            .then(() => {
                setCargando(false);
                navegar("/usuario-logueado");
            })
            .catch((err) => {
                setCargando(false);
                const mensajeError = err.response?.data?.mensaje || "Ocurrió un error al iniciar sesión.";
                alertaError(mensajeError);
            })
    }

    return (
        <Container 
            maxWidth="xs" 
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                mb: 7.5
            }}
        >
            <BackdropProgreso abrir={cargando}/>
            <Box 
                sx={{
                    width: '85%',
                    maxWidth: '90%',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 8,
                    bgcolor: 'background.paper'
                }}
            >
                <Box display="flex" justifyContent="center" mb={3}>
                    <Login color="secondary" sx={{ fontSize: 70 }} />
                </Box>
                <Typography variant="subtitle1" color="text.secondary" mb={3} align="center" gutterBottom>
                    ¡Bienvenido de nuevo!
                </Typography>
                <IniciarSesionForm errores={errores} callback={iniciarSesion} />
                <Box mt={9}>
                    <Typography variant="subtitle1" color="text.secondary" textAlign="center">
                        ¿No tienes una cuenta? 
                        <Button 
                            size="medium"
                            color="secondary"
                            variant="contained"
                            sx={{ ml: 1, borderRadius: 5 }}
                            component={Link} 
                            to={'/usuario/registrarse'}
                        >
                            Regístrate aquí
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export { IniciarSesionPage }