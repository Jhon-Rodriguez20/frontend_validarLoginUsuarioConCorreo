import { useSelector, useDispatch } from 'react-redux';
import { setUsuario } from '../../../../states/crearUsuarioSlice';
import { CrearUsuarioForm } from "../../../auth/CrearUsuarioForm";
import CodigoFormulario from '../../../forms/CodigoFormulario';
import { Box, Typography } from '@mui/material';
import useOcultarCorreo from '../../../../hooks/useOcultarCorreoUsuario';
import useManejarTeclasDeTeclado from '../../../../hooks/useManejarTeclasTecladoCodigoFormulario';
import useValidarCorreo from '../../../../hooks/useValidarCorreo';
import useValidarContrasena from '../../../../hooks/useValidarContrasena';
import { useEffect } from 'react';

const StepperContenidoCrearUsuario = ({ setErrores, setCodigo, errores, codigo, registro, verificarCodigo }) => {
    const dispatch = useDispatch();
    const ocultarCorreo = useOcultarCorreo();
    const { handleCodigoCampo, handleTeclasDeTeclado } = useManejarTeclasDeTeclado(codigo, setCodigo);
    const crearUsuarioState = useSelector((estado) => estado.crearUsuario);
    const { correoError, validarCorreo } = useValidarCorreo();
    const { contrasenaError, validarContrasena } = useValidarContrasena();

    useEffect(() => {
        setErrores((prevErrores) => ({
            ...prevErrores,
            email: correoError,
            password: contrasenaError
        }));
    }, [correoError, contrasenaError, setErrores]);

    const validarFormulario = ({ nombre, email, password }) => {
        const errores = {};
        (!nombre) ? errores.nombre = 'El nombre es obligatorio' : setErrores({});
        if (!validarCorreo(email)) errores.email = correoError;
        if (!validarContrasena(password)) errores.password = contrasenaError;
        return errores;
    };

    const handleSiguienteStep = async (stepActivo) => {
        if (stepActivo === 0) {
            const nuevosErrores = validarFormulario(crearUsuarioState);
            setErrores((prevErrores) => ({
                ...prevErrores,
                ...nuevosErrores,
            }));

            if (Object.keys(nuevosErrores).length > 0) {
                return false;
            }
            setErrores({});
            return true;
        } else if (stepActivo === 1) {
            return await registro();
        } else if (stepActivo === 2) {
            return await verificarCodigo();
        }
        return true;
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
                        <Typography variant="h5" mt={7} mb={2}>
                            Confirmar correo electrónico
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Se va a enviar un código de verificación al siguiente correo:
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'purple', fontWeight: 'bold' }} gutterBottom>
                            {crearUsuarioState.email}
                        </Typography>
                    </Box>
                );
            case 2:
                return (
                    <CodigoFormulario
                        codigo={codigo}
                        setCodigo={setCodigo}
                        errores={errores}
                        handleCodigoCampo={handleCodigoCampo}
                        handleTeclasDeTeclado={handleTeclasDeTeclado}
                        ocultarCorreo={ocultarCorreo}
                        correo={crearUsuarioState.email}
                        reenviarCodigo={registro}
                    />
                );
            default:
                return <Typography variant="body1">Paso desconocido</Typography>;
        }
    };

    return { handleSiguienteStep, renderizarContenidoStepper }
};

export default StepperContenidoCrearUsuario;