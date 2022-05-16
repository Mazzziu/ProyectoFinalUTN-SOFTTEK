import React, { useState } from "react";

//components
import IntroMenu from "./IntroMenu";
import FormProducts from "./FormProducts";
//import AlertMsg from "../../../AlertMsg";

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
// import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import useDB from "../../../hooks/useDB";

const NewMenu = () => {
    const [data, setData] = useState({
        clientId: JSON.parse(localStorage.getItem("LOGIN")).id,
        title: "",
        description: "",
        cover: "",
        categories: [],
    });

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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { loading, error, done, DB } = useDB();

    const handleFinish = () => {
        console.log(data);
        DB.save("/menus", data)
            .then((stored) => {
                console.log(stored);
                setActiveStep(0);
                setData({
                    clientId: JSON.parse(localStorage.getItem("LOGIN")).id,
                    title: "",
                    description: "",
                    cover: "",
                    categories: [],
                });
            })
            .catch((err) => console.log(err));
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
                        <StepContent
                            TransitionProps={{ unmountOnExit: loading }}
                        >
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
                        startIcon={<SaveIcon />}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                        disable={loading}
                    >
                        {loading ? "Guardando" : "Guardar"}
                    </Button>
                    <Button
                        variant='text'
                        color='primary'
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Atras
                    </Button>
                </Paper>
            )}
            {/* <AlertMsg show={done.status} type='success' msg='Menú Guardado!' />
            <AlertMsg show={error.status} type='error' msg={error.msg} /> */}
        </>
    );
};

export default NewMenu;
