import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";

function StepperComponente({ steps, onSiguienteStep, children, orientacion = "horizontal" }) {
    const [stepActivo, setStepActivo] = useState(() => {
        const stepGuardado = localStorage.getItem('stepActivo');
        return stepGuardado !== null ? Number(stepGuardado) : 0;
    });

    useEffect(() => {
        localStorage.setItem('stepActivo', stepActivo);
    }, [stepActivo]);

    const handleSiguienteStep = async () => {
        const puedeContinuar = await onSiguienteStep(stepActivo);
        if (puedeContinuar) setStepActivo((preStepActivo) => preStepActivo + 1);
    };

    const handleDevolverStep = () => setStepActivo((preStepActivo) => preStepActivo - 1);

    return (
        <Box flexDirection="column" alignItems="center">
            <Stepper activeStep={stepActivo} orientation={orientacion}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box mt={2} width="100%">
                {children(stepActivo)}
                <Box mt={5} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="secondary" disabled={stepActivo === 0} onClick={handleDevolverStep}>
                        Atrás
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleSiguienteStep}>
                        {stepActivo === steps.length - 1 ? "Finalizar" : "Siguiente"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

StepperComponente.propTypes = {
    steps: PropTypes.array.isRequired,
    onSiguienteStep: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    orientacion: PropTypes.string
}

export { StepperComponente }