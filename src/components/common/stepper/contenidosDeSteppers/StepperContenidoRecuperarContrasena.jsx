import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CorreoFormulario from '../../../forms/CorreoFormulario';
import ContrasenaFormulario from '../../../forms/ContrasenaFormulario';
import CodigoFormulario from '../../../forms/CodigoFormulario';
import { useSelector } from 'react-redux';
import useOcultarCorreo from '../../../../hooks/useOcultarCorreoUsuario';
import useManejarTeclasDeTeclado from '../../../../hooks/useManejarTeclasTecladoCodigoFormulario';
import useValidarCorreo from '../../../../hooks/useValidarCorreo';
import useValidarContrasena from '../../../../hooks/useValidarContrasena';
import { useEffect } from 'react';

const StepperContenidoRecuperarContrasena = ({
    setErrores,
    setCodigo,
    errores,
    codigo,
    solicitarCodigo,
    verificarCodigo,
    actualizarContrasena,
    email,
    onEmailChange,
    password,
    onPasswordChange,
}) => {

    const ocultarCorreo = useOcultarCorreo();
    const { handleCodigoCampo, handleTeclasDeTeclado } = useManejarTeclasDeTeclado(codigo, setCodigo);
    const recuperarContrasenaState = useSelector((estado) => estado.recuperarContrasena);
    const { correoError, validarCorreo } = useValidarCorreo();
    const { contrasenaError, validarContrasena } = useValidarContrasena();

    useEffect(() => {
        setErrores((prevErrores) => ({
            ...prevErrores,
            email: correoError,
            password: contrasenaError,
        }));
    }, [correoError, contrasenaError, setErrores]);

    const handleSiguienteStep = async (stepActivo) => {
        if (stepActivo === 0) {
            if (!validarCorreo(email)) {
                setErrores({ email: correoError });
                return false;
            } else {
                setErrores({});
                return await solicitarCodigo();
            }
        } else if (stepActivo === 1) {
            return await verificarCodigo();
        } else if (stepActivo === 2) {
            if (!validarContrasena(password)) {
                setErrores({ password: contrasenaError });
                return false;
            } else {
                setErrores({});
                return await actualizarContrasena();
            }
        }
        return true;
    };

    const renderizarContenidoStepper = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <Box textAlign="center">
                        <Typography variant="h5" mt={7} mb={4}>
                            Recuperar Contraseña
                        </Typography>
                        <CorreoFormulario
                            email={email}
                            onChange={onEmailChange}
                            error={errores.email}
                            helperText={errores.email}
                        />
                    </Box>
                );
            case 1:
                return (
                    <CodigoFormulario
                        codigo={codigo}
                        setCodigo={setCodigo}
                        errores={errores}
                        handleCodigoCampo={handleCodigoCampo}
                        handleTeclasDeTeclado={handleTeclasDeTeclado}
                        ocultarCorreo={ocultarCorreo}
                        correo={recuperarContrasenaState.email}
                        reenviarCodigo={solicitarCodigo}
                    />
                );
            case 2:
                return (
                    <>
                        <Typography variant="h5" mt={7} mb={4} textAlign="center">
                            Actualizar Contraseña
                        </Typography>
                        <ContrasenaFormulario
                            label="Nueva Contraseña"
                            password={password}
                            onChange={onPasswordChange}
                            error={errores.password}
                            helperText={errores.password}
                        />
                    </>
                );
            default:
                return <Typography variant="h6">Paso no encontrado</Typography>;
        }
    };

    return { handleSiguienteStep, renderizarContenidoStepper };
};

StepperContenidoRecuperarContrasena.propTypes = {
    setErrores: PropTypes.func.isRequired,
    setCodigo: PropTypes.func.isRequired,
    errores: PropTypes.object.isRequired,
    codigo: PropTypes.array.isRequired,
    solicitarCodigo: PropTypes.func.isRequired,
    verificarCodigo: PropTypes.func.isRequired,
    actualizarContrasena: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
};

export default StepperContenidoRecuperarContrasena;