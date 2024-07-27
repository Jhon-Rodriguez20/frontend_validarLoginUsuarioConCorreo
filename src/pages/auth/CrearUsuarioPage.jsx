import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIdUsuario, resetUsuario, setUsuario } from "../../states/crearUsuarioStore";
import { CrearUsuarioForm } from "../../components/auth/CrearUsuarioForm";
import { StepperComponente } from "../../components/common/stepper/Stepper";
import axios from "axios";
import { SIGNUP_POST_ENDPOINT, VERIFICARUSUARIO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { useLocation, useNavigate } from "react-router-dom";
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { Box, TextField, Typography, Grid, Container, Button } from "@mui/material";
import { BackdropProgreso } from "../../components/common/loading/BackdropProgreso";

function CrearUsuarioPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [codigo, setCodigo] = useState(Array(6).fill(""));
    const dispatch = useDispatch();
    const navegar = useNavigate();
    const location = useLocation();
    const crearUsuarioState = useSelector((estado) => estado.crearUsuario);
    const steps = ["Crear Cuenta", "Confirmar Correo", "Verificar Código"];
    const { alertaExito, alertaError } = useAlertas();

    useEffect(() => {
        if (!location.pathname.startsWith('/usuario/registrarse/')) {
            dispatch(resetUsuario());
            localStorage.removeItem('activeStep');
        }
    }, [location.pathname, dispatch]);

    const validarFormulario = ({ nombre, email, password }) => {
        const errores = {};
        if (!nombre) errores.nombre = "El nombre es obligatorio";
        if (!email) errores.email = "El correo electrónico es obligatorio";
        if (!password) {
            errores.password = "La contraseña es obligatoria";
        } else if (!/^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
            errores.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, dos números y un carácter especial (*, $, &, #)";
        }
        return errores;
    };

    const registro = async () => {
        setCargando(true);
        try {
            const response = await axios.post(SIGNUP_POST_ENDPOINT, {
                nombre: crearUsuarioState.nombre,
                email: crearUsuarioState.email,
                password: crearUsuarioState.password,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCargando(false);
            const idUsuario = response.data.usuarioEntity.idUsuario;
            dispatch(setIdUsuario(idUsuario));
            return true;
        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al crear la cuenta de usuario.";
            alertaError(mensajeError);
            return false;
        }
    };

    const verificarCodigo = async () => {
        setCargando(true);
        try {
            const codigoCompleto = codigo.join("");
            await axios.post(VERIFICARUSUARIO_POST_ENDPOINT, {
                idUsuario: crearUsuarioState.idUsuario,
                codigo: codigoCompleto
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCargando(false);
            dispatch(resetUsuario());
            localStorage.removeItem('activeStep');
            navegar("/");
            alertaExito("Usuario verificado exitosamente.");
            return true;
        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al verificar la cuenta de usuario.";
            alertaError(mensajeError);
            return false;
        }
    };

    const handleNextStep = async (activeStep) => {
        if (activeStep === 0) {
            const newErrores = validarFormulario(crearUsuarioState);
            if (Object.keys(newErrores).length > 0) {
                setErrores(newErrores);
                return false;
            } else {
                return true;
            }
        } else if (activeStep === 1) {
            return await registro();
        } else if (activeStep === 2) {
            return await verificarCodigo();
        }
        return true;
    };

    const handleCodigoChange = (index, value) => {
        if (value.match(/^[0-9]$/) || value === "") {
            const newCodigo = [...codigo];
            newCodigo[index] = value;
            setCodigo(newCodigo);

            // Mover el cursor automáticamente al siguiente campo si el valor es un número
            if (value && index < codigo.length - 1) {
                const nextInput = document.getElementById(`codigo-${index + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !codigo[index] && index > 0) {
            const newCodigo = [...codigo];
            newCodigo[index - 1] = "";
            setCodigo(newCodigo);
            const prevInput = document.getElementById(`codigo-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        } else if (event.key === "ArrowLeft" && index > 0) {
            const prevInput = document.getElementById(`codigo-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        } else if (event.key === "ArrowRight" && index < codigo.length - 1) {
            const nextInput = document.getElementById(`codigo-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <Typography variant="h5" textAlign="center" mt={7}>Crear cuenta de usuario</Typography>
                        <CrearUsuarioForm
                            errores={errores}
                            initialValues={crearUsuarioState}
                            onChange={({ nombre, email, password }) => {
                                dispatch(setUsuario({ nombre, email, password }));
                            }}
                        />
                    </>
                );
            case 1:
                return (
                    <Box textAlign="center">
                        <Typography variant="h5" mt={10} mb={2}>Confirmar correo electrónico</Typography>
                        <Typography variant="body1" color="text.secondary">Se va a enviar un código de verificación al correo {crearUsuarioState.email}.</Typography>
                    </Box>
                );
            case 2:
                return (
                    <>
                        <Box textAlign="center">
                            <Typography className="subtitulo" variant="h5" mt={5} mb={1}>Ingresar código de verificación</Typography>
                            <Typography variant="body1" color="text.secondary" mb={4}>
                                Se ha enviado un código de 6 dígitos al correo {crearUsuarioState.email}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" gap={1.5}>
                            {codigo.map((value, index) => (
                                <TextField
                                    key={index}
                                    id={`codigo-${index}`}
                                    variant="outlined"
                                    inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '2em' } }}
                                    value={value}
                                    onChange={(e) => handleCodigoChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    error={!!errores.codigo}
                                    helperText={index === 0 && errores.codigo ? errores.codigo : ''}
                                />
                            ))}
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h6" color="text.secondary" mt={5} mb={1}>¿No te llegó el código?</Typography>
                            <Button variant="contained" color="secondary"
                                size="large" sx={{ borderRadius: 5 }}>
                                Reenviar código</Button>
                        </Box>
                    </>
                );
            default:
                return <Typography variant="body1">Paso desconocido</Typography>;
        }
    };

    return (
        <Container>
            <BackdropProgreso abrir={cargando} />
            <Box 
                mt={4} 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="70vh"
            >
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={11} md={8} lg={8}>
                        <StepperComponente steps={steps} onNextStep={handleNextStep} orientation="horizontal">
                            {(activeStep) => renderStepContent(activeStep)}
                        </StepperComponente>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export { CrearUsuarioPage }