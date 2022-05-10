import React, { useRef } from "react";
import {
    Box,
    Stack,
    TextField,
    FormHelperText,
    Typography,
    Button,
    Alert,
    AlertTitle,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import useLogin from "./hooks/useLogin";

const SignUp = () => {
    const navigate = useNavigate();

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();

    const {
        emailValid,
        passwordValid,
        emailError,
        passwordError,
        formError,
        formSuccess,
        signUp,
    } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            emailValid(email.current.value) &&
            passwordValid(password.current.value, repassword.current.value)
        ) {
            console.log("guardando");
            signUp({
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            });
        }
    };

    return (
        <Stack height='100%' justifyContent='space-around'>
            <Typography variant='h3' color='initial' textAlign='end'>
                Es hora de darle un giro a esa carta!
            </Typography>

            <Box component='form' mt={2}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    inputRef={name}
                    label='Nombre de tu negocio'
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    inputRef={email}
                    label='Email'
                    name='email'
                    autoComplete='email'
                    error={emailError}
                    onChange={(e) => emailValid(e.target.value)}
                    autoFocus
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
                    inputRef={password}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='repassword'
                    label='Repite la contraseña'
                    type='password'
                    id='repassword'
                    onChange={(e) =>
                        passwordValid(e.target.value, password.current.value)
                    }
                    error={passwordError}
                    inputRef={repassword}
                />
                {passwordError && (
                    <FormHelperText error id='password-error'>
                        Las contraseñas no coinciden
                    </FormHelperText>
                )}

                <Stack mt={5}>
                    <Button variant='contained' onClick={handleSubmit}>
                        Registrarse
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
                <Alert severity='success'>Registrado correctamente!</Alert>
            )}
        </Stack>
    );
};

export default SignUp;
