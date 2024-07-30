import { useSelector, useDispatch } from "react-redux";
import { setUsuario } from "../../../states/crearUsuarioSlice";
import { CrearUsuarioForm } from "../../auth/CrearUsuarioForm";
import { Box, TextField, Typography, Button } from "@mui/material";

const StepperContenido = ({ setErrores, setCodigo, errores, codigo, registro, verificarCodigo }) => {
    const dispatch = useDispatch();
    const crearUsuarioState = useSelector((estado) => estado.crearUsuario);

    const validarFormulario = ({ nombre, email, password }) => {
        const errores = {};
        if (!nombre) errores.nombre = "El nombre es obligatorio";
        if (!email) errores.email = "El correo electrónico es obligatorio";
        if (!password) errores.password = "La contraseña es obligatoria";
        if (!/^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) errores.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, dos números y un carácter especial (*, $, &, #)";
        return errores;
    };

    const ocultarCorreo = (correo) => {
        if (!correo) return '';
        let parteVisible, parteOculta;
        const [primeraParte, dominio] = correo.split('@');
        
        if (primeraParte.length <= 2) {
            parteVisible = primeraParte;
            parteOculta = '';
        } else {
            parteVisible = primeraParte.slice(0, 2);
            parteOculta = '*'.repeat(primeraParte.length - 2);
        }
    
        return `${parteVisible}${parteOculta}@${dominio}`;
    };

    const handleSiguienteStep = async (stepActivo) => {
        return stepActivo === 0 ? (() => {
            const nuevosErrores = validarFormulario(crearUsuarioState);
            return Object.keys(nuevosErrores).length > 0
                ? (setErrores(nuevosErrores), false)
                : (setErrores({}), true); 
            })
        () : stepActivo === 1
            ? await registro()
            : stepActivo === 2
            ? await verificarCodigo()
            : true;
    };    

    const handleCodigoCampo = (index, value) => {
        if (value.match(/^[0-9]$/) || value === "") {
            const nuevoCodigo = [...codigo];
            nuevoCodigo[index] = value;
            setCodigo(nuevoCodigo);

            if (value && index < codigo.length - 1) {
                const siguienteCampo = document.getElementById(`codigo-${index + 1}`);
                if (siguienteCampo) siguienteCampo.focus();
            }
        }
    };

    const handleTeclasDeTeclado = (index, event) => {
        event.key === "Backspace" && !codigo[index] && index > 0 ? (() => {
            const nuevoCodigo = [...codigo];
            nuevoCodigo[index - 1] = "";
            setCodigo(nuevoCodigo);
            const prevInput = document.getElementById(`codigo-${index - 1}`);
            prevInput && prevInput.focus();
        })
        () : event.key === "ArrowLeft" && index > 0 ? (() => {
                const prevInput = document.getElementById(`codigo-${index - 1}`);
                prevInput && prevInput.focus();
            })
            () : event.key === "ArrowRight" && index < codigo.length - 1 ? (() => {
                const nextInput = document.getElementById(`codigo-${index + 1}`);
                nextInput && nextInput.focus();
            })
        () : null;
    };    

    const renderizarContenidoStepper = (stepIndex) => {
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
                        <Typography variant="h5" mt={7} mb={2}>Confirmar correo electrónico</Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>Se va a enviar un código de verificación al siguiente correo:</Typography>
                        <Typography variant="h6" sx={{ color: 'purple', fontWeight: 'bold' }} gutterBottom>{crearUsuarioState.email}</Typography>
                    </Box>
                );
            case 2:
                return (
                    <>
                        <Box textAlign="center">
                            <Typography className="subtitulo" variant="h5" mt={5} mb={1}>Ingresar código de verificación</Typography>
                            <Typography variant="body1" color="text.secondary" mb={4}>
                                Se ha enviado un código de 6 dígitos al correo {ocultarCorreo(crearUsuarioState.email)}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" gap={1.5}>
                            {codigo.map((value, index) => (
                                <TextField
                                    key={index}
                                    id={`codigo-${index}`}
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '2em' } }}
                                    value={value}
                                    onChange={(e) => handleCodigoCampo(index, e.target.value)}
                                    onKeyDown={(e) => handleTeclasDeTeclado(index, e)}
                                    error={!!errores.codigo}
                                    helperText={index === 0 && errores.codigo ? errores.codigo : ''}
                                />
                            ))}
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="subtitle1" color="text.secondary" mt={5} mb={1}>¿No te llegó el código?</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="medium"
                                sx={{ borderRadius: 5 }}
                                onClick={registro}
                            >
                                Reenviar código
                            </Button>
                        </Box>
                    </>
                );
            default:
                return <Typography variant="body1">Paso desconocido</Typography>;
        }
    };

    return { handleSiguienteStep, handleCodigoCampo, handleTeclasDeTeclado, renderizarContenidoStepper }
}

export default StepperContenido;