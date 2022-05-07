import React, { useRef, useState } from "react";
import {
    Box,
    TextField,
    FormHelperText,
    Button,
    Stack,
    Typography,
} from "@mui/material";

const SignIn = ({ setSignin }) => {
    const email = useRef();
    const password = useRef();

    const [emailError, setEmailError] = useState(false);

    const emailValid = () => {
        let regex = /^([da-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
        if (!regex.test(email.current.value)) {
            setEmailError(true);
            return true;
        } else {
            setEmailError(false);
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailValid()) {
            //lets go
        }

        console.log("email: ", email.current.value);
        console.log("pass: ", password.current.value);
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
                    onChange={emailValid}
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
                        Iniciar Sesion
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setSignin(false);
                        }}
                    >
                        Atras
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default SignIn;
