import { useState, useCallback } from 'react';

const useValidarCorreo = () => {
    const [correoError, setCorreoError] = useState('');

    const validarCorreo = useCallback((correo) => {
        if (!correo) {
            setCorreoError('El correo electrónico es obligatorio');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setCorreoError('El correo electrónico no es válido');
            return false;
        }
        setCorreoError('');
        return true;
    }, []);

    return { correoError, validarCorreo };
};

export default useValidarCorreo;