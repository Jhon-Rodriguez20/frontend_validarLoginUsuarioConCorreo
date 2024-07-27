import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion } from "../connections/usuarioAcciones";
import { DoneOutline } from "@mui/icons-material";

function UsuarioLogueado() {
    const usuario = useSelector((estado)=> estado.usuario.usuario);
    const dispatch = useDispatch();
    const handleCerrarSesion = () => dispatch(cerrarSesion());

    return (
        <Container>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt: 12}}>
                <DoneOutline sx={{fontSize: 140, color: 'green', mb: 2}} />
                <Typography variant="h4" gutterBottom>
                    Hasta aquí termina la aplicación
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    {usuario.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{maxWidth: 600, mt: 1}}>
                    Solo es una aplicación de práctica para enviar un código de verificación al correo electrónico del usuario.
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <Button variant="contained" color="secondary" onClick={handleCerrarSesion}>
                    Cerrar sesión
                </Button>
            </Box>
        </Container>
    )
}

export {UsuarioLogueado}
