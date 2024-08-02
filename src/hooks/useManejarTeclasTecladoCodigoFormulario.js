import { useCallback } from 'react';

const useManejarTeclasDeTeclado = (codigo, setCodigo) => {
    const handleCodigoCampo = useCallback((index, value) => {
        if (value.match(/^[0-9]$/) || value === '') {
            const nuevoCodigo = [...codigo];
            nuevoCodigo[index] = value;
            setCodigo(nuevoCodigo);

            if (value && index < codigo.length - 1) {
                const siguienteCampo = document.getElementById(`codigo-${index + 1}`);
                if (siguienteCampo) siguienteCampo.focus();
            }
        }
    }, [codigo, setCodigo]);

    const handleTeclasDeTeclado = useCallback((index, event) => {
        if (event.key === "Backspace" && !codigo[index] && index > 0) {
            const nuevoCodigo = [...codigo];
            nuevoCodigo[index - 1] = "";
            setCodigo(nuevoCodigo);
            const prevInput = document.getElementById(`codigo-${index - 1}`);
            if (prevInput) prevInput.focus();

        } else if (event.key === "ArrowLeft" && index > 0) {
            const prevInput = document.getElementById(`codigo-${index - 1}`);
            if (prevInput) prevInput.focus();
            
        } else if (event.key === "ArrowRight" && index < codigo.length - 1) {
            const nextInput = document.getElementById(`codigo-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    }, [codigo, setCodigo]);

    return { handleCodigoCampo, handleTeclasDeTeclado };
};

export default useManejarTeclasDeTeclado;