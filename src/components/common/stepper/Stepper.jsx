import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";

function StepperComponente({ steps, onNextStep, children, orientation = "horizontal" }) {
    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep !== null ? Number(savedStep) : 0;
    });

    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);

    const handleNext = async () => {
        if (await onNextStep(activeStep)) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box flexDirection="column" alignItems="center">
            <Stepper activeStep={activeStep} orientation={orientation}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box mt={2} width="100%">
                {children(activeStep)}
                <Box mt={5} display="flex" justifyContent="space-between">
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Atrás
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

StepperComponente.propTypes = {
    steps: PropTypes.array.isRequired,
    onNextStep: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    orientation: PropTypes.string
};

export { StepperComponente }