import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function CorreoFormulario({ email, onChange, error, helperText }) {
    const handleChange = (e) => {
        const value = e.target.value;
        onChange(value);
    };

    return (
        <TextField
            fullWidth
            variant="standard"
            type="email"
            label="Correo electrónico"
            name="email"
            value={email}
            onChange={handleChange}
            error={!!error}
            helperText={helperText}
            autoComplete="email"
        />
    );
}

CorreoFormulario.propTypes = {
    email: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    helperText: PropTypes.string,
};

export default CorreoFormulario;