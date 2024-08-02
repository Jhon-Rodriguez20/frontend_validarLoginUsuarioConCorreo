import { useCallback } from 'react';

const useOcultarCorreo = () => {
    const ocultarCorreo = useCallback((correo) => {
        if (!correo) return '';
        const [primeraParte, dominio] = correo.split('@');
        const parteVisible = primeraParte.slice(0, 2);
        const parteOculta = '*'.repeat(primeraParte.length - 2);
        return `${parteVisible}${parteOculta}@${dominio}`;
    }, []);

    return ocultarCorreo;
};

export default useOcultarCorreo;