import { Box, Typography, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CodigoFormulario = ({ codigo, errores, handleCodigoCampo, handleTeclasDeTeclado,
    ocultarCorreo, correo, reenviarCodigo }) => {

    return (
        <>
            <Box textAlign="center">
                <Typography variant="h5" mt={5} mb={1}>Ingresar código de verificación</Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Se ha enviado un código de 6 dígitos al correo {ocultarCorreo(correo)}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1.5}>
                {codigo.map((value, index) => (
                    <TextField
                        key={index}
                        id={`codigo-${index}`}
                        variant='outlined'
                        inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '2em' } }}
                        value={value}
                        onChange={(e) => handleCodigoCampo(index, e.target.value)}
                        onKeyDown={(e) => handleTeclasDeTeclado(index, e)}
                        error={!!errores.codigo}
                        helperText={errores.codigo && index === codigo.length - 1 ? errores.codigo : ''}
                    />
                ))}
            </Box>
            <Box textAlign="center">
                <Typography variant="subtitle1" color="text.secondary" mt={5} mb={1}>
                    ¿No te llegó el código?
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    sx={{ borderRadius: 5 }}
                    onClick={reenviarCodigo}
                >
                    Reenviar código
                </Button>
            </Box>
        </>
    );
};

CodigoFormulario.propTypes = {
    codigo: PropTypes.array.isRequired,
    setCodigo: PropTypes.func.isRequired,
    errores: PropTypes.object.isRequired,
    handleCodigoCampo: PropTypes.func.isRequired,
    handleTeclasDeTeclado: PropTypes.func.isRequired,
    ocultarCorreo: PropTypes.func.isRequired,
    correo: PropTypes.string.isRequired,
    reenviarCodigo: PropTypes.func.isRequired,
};

export default CodigoFormulario;