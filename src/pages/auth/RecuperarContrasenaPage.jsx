import { useState } from 'react';
import { Container, Box, Grid } from "@mui/material";
import { BackdropProgreso } from '../../components/common/loading/BackdropProgreso';
import { StepperComponente } from '../../components/common/stepper/Stepper';
import StepperContenidoRecuperarContrasena from '../../components/common/stepper/contenidosDeSteppers/StepperContenidoRecuperarContrasena';
import axios from 'axios';
import { SOLICITAR_CODIGO_RECUPERACION_POST_ENDPOINT, VERIFICAR_CODIGO_RECUPERACION_POST_ENDPOINT, ACTUALIZAR_CONTRASENA_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setIdUsuario, resetRecuperarContrasena } from '../../states/recuperarContrasenaSlice';
import { useNavigate } from 'react-router-dom';

function RecuperarContrasenaPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [codigo, setCodigo] = useState(Array(6).fill(""));
    const [nuevaContrasena, setPassword] = useState('');
    const dispatch = useDispatch();
    const navegar = useNavigate();
    const recuperarContrasenaState = useSelector((estado) => estado.recuperarContrasena);
    const { alertaExito, alertaError } = useAlertas();
    const steps = ["Ingresar Correo", "Confirmar Código", "Actualizar Contraseña"];
    const handleEmailChange = (newEmail) => dispatch(setEmail(newEmail));
    const handlePasswordChange = (newPassword) => setPassword(newPassword);

    const solicitarCodigo = async () => {
        setCargando(true);
        try {
            await axios.post(SOLICITAR_CODIGO_RECUPERACION_POST_ENDPOINT, { email: recuperarContrasenaState.email });
            setCargando(false);
            return true;
        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al solicitar el código de verificación.";
            alertaError(mensajeError);
            return false;
        }
    };

    const verificarCodigo = async () => {
        setCargando(true);
        try {
            const response = await axios.post(VERIFICAR_CODIGO_RECUPERACION_POST_ENDPOINT, { email: recuperarContrasenaState.email, codigo: codigo.join('') });
            dispatch(setIdUsuario(response.data.idUsuario));
            setCargando(false);
            return true;
        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al verificar el código de verificación.";
            alertaError(mensajeError);
            return false;
        }
    };

    const actualizarContrasena = async () => {
        setCargando(true);
        try {
            await axios.post(ACTUALIZAR_CONTRASENA_POST_ENDPOINT, { idUsuario: recuperarContrasenaState.idUsuario, nuevaContrasena });
            setCargando(false);
            dispatch(resetRecuperarContrasena());
            localStorage.removeItem('stepActivo');
            navegar("/");
            alertaExito("Contraseña actualizada con éxito.");
            return true;
        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al actualizar la contraseña.";
            alertaError(mensajeError);
            return false;
        }
    };

    const stepperFunciones = StepperContenidoRecuperarContrasena({
        stepIndex: 0, setErrores, setCodigo, errores,
        codigo, solicitarCodigo, verificarCodigo,
        actualizarContrasena, email: recuperarContrasenaState.email,
        onEmailChange: handleEmailChange, password: nuevaContrasena,
        onPasswordChange: handlePasswordChange
    });

    return (
        <Container>
            <BackdropProgreso abrir={cargando} />
            <Box mt={4} display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={11} md={11} lg={12}>
                        <StepperComponente steps={steps} onSiguienteStep={stepperFunciones.handleSiguienteStep} orientacion="horizontal">
                            {(stepActivo) => stepperFunciones.renderizarContenidoStepper(stepActivo)}
                        </StepperComponente>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export { RecuperarContrasenaPage }