import React, { useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Stack,
    Avatar,
    Link,
    Box,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Page = () => {
    const [signup, setSignup] = useState(false);
    const [signin, setSignin] = useState(false);

    const imgUrl =
        "https://images.pexels.com/photos/6640262/pexels-photo-6640262.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    return (
        <Grid
            container
            sx={{
                minHeight: "100vh",
                overflow: "scroll",
            }}
        >
            <Grid item xs={12}>
                <Grid container minHeight='calc(100vh - 60px)'>
                    <Grid item xs={12} md={6} p={5}>
                        {!signin && !signup && (
                            <Stack height='100%' justifyContent='space-around'>
                                <Typography
                                    variant='h2'
                                    color='initial'
                                    textAlign='end'
                                >
                                    Crea tu menu Digital
                                </Typography>
                                <Stack alignItems='center' spacing={3}>
                                    <Button
                                        variant='contained'
                                        onClick={() => setSignup(true)}
                                    >
                                        Registrarse
                                    </Button>
                                    <Button onClick={() => setSignin(true)}>
                                        Iniciar sesion
                                    </Button>
                                </Stack>
                            </Stack>
                        )}
                        {signin && <SignIn setSignin={setSignin} />}
                        {signup && <SignUp setSignup={setSignup} />}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component='div'
                            height='100%'
                            sx={{
                                backgroundImage: `url(${imgUrl})`,
                                objectFit: "fill",
                                backgroundPosition: "center",
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>

            {/* footer */}
            <Grid item xs={12} height='60px' sx={{ backgroundColor: "black" }}>
                <Stack
                    direction='row'
                    justifyContent='space-around'
                    height='100%'
                >
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Avatar src='https://avatars.githubusercontent.com/u/38535118?v=4'></Avatar>
                        <Typography variant='p' color='white'>
                            Desarrollado por Farias Matias
                        </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <GitHubIcon sx={{ color: "#fff" }} />
                        <Link
                            href='https://github.com/Mazzziu/ProyectoFinalUTN-SOFTTEK'
                            color='#fff'
                        >
                            Link del proyecto
                        </Link>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Page;
