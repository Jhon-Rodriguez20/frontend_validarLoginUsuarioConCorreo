import { useState, useCallback } from 'react';

const useValidarContrasena = () => {
    const [contrasenaError, setContrasenaError] = useState('');

    const validarContrasena = useCallback((contrasena) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!contrasena) {
            setContrasenaError('La contraseña es obligatoria');
            return false;
        } else if (!passwordRegex.test(contrasena)) {
            setContrasenaError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, dos números y un carácter especial (*, $, &, #)');
            return false;
        }
        setContrasenaError('');
        return true;
    }, []);

    return { contrasenaError, validarContrasena };
};

export default useValidarContrasena;