import { toast } from 'react-toastify';

const useAlertas = () => {
    const alertaExito = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 4000,
        });
    };

    const alertaError = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 4000,
        });
    };

    return {
        alertaExito,
        alertaError,
    };
};

export default useAlertas;