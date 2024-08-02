import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function ContrasenaFormulario({ password, onChange, error, helperText, label }) {
    const handlePasswordChange = (event) => {
        const nuevaPassword = event.target.value;
        onChange(nuevaPassword);
    };

    return (
        <TextField
            fullWidth
            variant="standard"
            type="password"
            label={label}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!error}
            helperText={helperText}
        />
    );
}

ContrasenaFormulario.propTypes = {
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
};

export default ContrasenaFormulario;