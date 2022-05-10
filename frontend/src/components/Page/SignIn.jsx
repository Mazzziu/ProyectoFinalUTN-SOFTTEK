import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    TextField,
    FormHelperText,
    Button,
    Stack,
    Typography,
    Alert,
    AlertTitle,
} from "@mui/material";
import useLogin from "./hooks/useLogin";

const SignIn = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const {
        emailError,
        emailValid,
        formError,
        formLoading,
        formSuccess,
        signIn,
    } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("email: ", email.current.value);
        console.log("pass: ", password.current.value);
        if (signIn(email.current.value, password.current.value)) {
            signIn(email.current.value, password.current.value);
            navigate("/dashboard"); //navegar al dashboard
        }
    };

    return (
        <Stack height='100%' justifyContent='space-around'>
            <Typography variant='h3' color='initial' textAlign='end'>
                Bienvenido nuevamente
            </Typography>
            <Box component='form' mt={2}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={(e) => emailValid(e.target.value)}
                    error={emailError}
                    inputRef={email}
                />
                {emailError && (
                    <FormHelperText error id='email-error'>
                        Formato de email invalido
                    </FormHelperText>
                )}

                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Contraseña'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    inputRef={password}
                />
                <Stack mt={5}>
                    <Button variant='contained' onClick={handleSubmit}>
                        {formLoading ? "Cargando..." : "Iniciar Sesion"}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("../");
                        }}
                    >
                        Atras
                    </Button>
                </Stack>
            </Box>

            {formSuccess && formError.status && (
                <Alert severity='error'>
                    <AlertTitle>Errorr</AlertTitle>
                    {formError.msg}
                </Alert>
            )}

            {formSuccess && !formError.status && (
                <Alert severity='success'>Bienvenido!</Alert>
            )}
        </Stack>
    );
};

export default SignIn;
