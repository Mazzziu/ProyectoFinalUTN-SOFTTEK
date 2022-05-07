import React, { useState, useRef } from "react";
import {
    Box,
    Stack,
    TextField,
    FormHelperText,
    Typography,
    Button,
} from "@mui/material";
const SignUp = ({ setSignup }) => {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

    const passwordValid = () => {
        if (password.current.value !== repassword.current.value) {
            setPasswordError(true);
            return true;
        }
        setPasswordError(false);
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailValid && passwordValid) {
            //lets Go
        }

        console.log(name.current.value);
        console.log(email.current.value);
        console.log(password.current.value);
        console.log(repassword.current.value);
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
                    onChange={emailValid}
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
                    type='repassword'
                    id='repassword'
                    onChange={passwordValid}
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
                            setSignup(false);
                        }}
                    >
                        Atras
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default SignUp;
