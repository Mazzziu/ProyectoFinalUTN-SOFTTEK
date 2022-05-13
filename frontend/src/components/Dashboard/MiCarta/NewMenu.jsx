import React, { useState } from "react";

//components
import IntroMenu from "./IntroMenu";
import FormProducts from "./FormProducts";

import {
    Box,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
} from "@mui/material";

const NewMenu = () => {
    const [data, setData] = useState({});

    const steps = [
        {
            label: "Identifica este menú",
            body: <IntroMenu setData={setData} />,
        },
        {
            label: "Crea las categorias y productos",
            body: <FormProducts data={data} setData={setData} />,
        },
    ];

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        console.log(data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <>
            <Typography variant='h2' color='initial' margin='3rem'>
                Nuevo Menú
            </Typography>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant='caption'>
                                        Last step
                                    </Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            {step.body}
                            <Box sx={{ my: "2rem" }}>
                                <div>
                                    <Button
                                        variant='contained'
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Continuar
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Atras
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                        Todos los pasos completados! es hora de guardar tu menú
                    </Typography>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={handleReset}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Guardar
                    </Button>
                </Paper>
            )}
        </>
    );
};

export default NewMenu;
