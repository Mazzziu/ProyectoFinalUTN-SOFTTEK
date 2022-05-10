import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <Stack height='100%' justifyContent='space-around'>
            <Typography variant='h2' color='initial' textAlign='end'>
                Crea tu menu Digital
            </Typography>
            <Stack alignItems='center' spacing={3}>
                <Button variant='contained' onClick={() => navigate("/signup")}>
                    Registrarse
                </Button>
                <Button onClick={() => navigate("/signin")}>
                    Iniciar sesion
                </Button>
            </Stack>
        </Stack>
    );
};

export default LoginPage;
