import { useState } from "react";
import { Container, Box, Grid } from "@mui/material";
import { BackdropProgreso } from "../../components/common/loading/BackdropProgreso";
import { StepperComponente } from "../../components/common/stepper/Stepper";
import StepperContenidoCrearUsuario from "../../components/common/stepper/contenidosDeSteppers/StepperContenidoCrearUsuario";
import axios from "axios";
import { SIGNUP_POST_ENDPOINT, VERIFICAR_USUARIO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { useSelector, useDispatch } from "react-redux";
import { setIdUsuario, resetUsuario } from "../../states/crearUsuarioSlice";
import { useNavigate } from "react-router-dom";

function CrearUsuarioPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [codigo, setCodigo] = useState(Array(6).fill(""));
    const dispatch = useDispatch();
    const navegar = useNavigate();
    const crearUsuarioState = useSelector((estado) => estado.crearUsuario);
    const { alertaExito, alertaError } = useAlertas();
    const steps = ["Crear Cuenta", "Confirmar Correo", "Verificar Código"];

    const registro = async () => {
        setCargando(true);
        return axios.post(SIGNUP_POST_ENDPOINT, {
            nombre: crearUsuarioState.nombre,
            email: crearUsuarioState.email,
            password: crearUsuarioState.password,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setCargando(false);
            const idUsuario = response.data.usuarioEntity.idUsuario;
            dispatch(setIdUsuario(idUsuario));
            return true;
            
        }).catch((err) => {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al crear la cuenta de usuario.";
            alertaError(mensajeError);
            return false;
        });
    };

    const verificarCodigo = async () => {
        setCargando(true);
        const codigoCompleto = codigo.join("");
        return axios.post(VERIFICAR_USUARIO_POST_ENDPOINT, {
            idUsuario: crearUsuarioState.idUsuario,
            codigo: codigoCompleto
        }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }

        }).then(() => {
            setCargando(false);
            dispatch(resetUsuario());
            localStorage.removeItem('stepActivo');
            navegar("/");
            alertaExito("Usuario verificado exitosamente.");
            return true;

        }).catch((err) => {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al verificar la cuenta de usuario.";
            alertaError(mensajeError);
            return false;
        });
    };

    const stepperFunciones = StepperContenidoCrearUsuario({
        setCargando, setErrores, setCodigo, errores,
        codigo, registro, verificarCodigo
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

export { CrearUsuarioPage }