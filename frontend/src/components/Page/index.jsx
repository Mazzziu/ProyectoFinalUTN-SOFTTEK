import React, { useEffect } from "react";
import { Grid, Typography, Stack, Avatar, Link, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import useLogin from "../../hooks/useLogin";
import { Outlet, useNavigate } from "react-router-dom";

const Page = () => {
    const { isLogin } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin()) {
            navigate("./dashboard/carta");
        }
    }, []);

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
                        <Outlet />
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
