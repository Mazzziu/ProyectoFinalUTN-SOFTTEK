import React, { useEffect, useState } from "react";
import { Grid, Typography, Stack, Avatar, Link, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import useLogin from "../../hooks/useLogin";
import { Outlet, useNavigate } from "react-router-dom";

const Page = () => {
    const { isLogin } = useLogin();
    const navigate = useNavigate();

    const imgUrl = [
        "https://img.freepik.com/vector-gratis/taza-cafe-expreso-granos-cafe_79603-1038.jpg?t=st=1652959926~exp=1652960526~hmac=2867f70e82499cdbbef4b50625a0840fdafcc77af3d8423003fe7e6c3ddaed55&w=1800",
        "https://img.freepik.com/vector-gratis/cafe-cafe-patron-vector_53876-61353.jpg?w=1380&t=st=1652936129~exp=1652936729~hmac=8261d663760395367e04b00dab06a7494e09104abf09522f0dee443916e25d0b",
        "https://img.freepik.com/vector-gratis/pizarra-comida-rapida_1284-5620.jpg?w=1380&t=st=1652936148~exp=1652936748~hmac=dcc572e2ba68442b20faac15dc2ebf2736c7592651a66a9389e07b4755c55c84",
        "https://img.freepik.com/vector-gratis/comida-rapida-patrones-fisuras_1284-10646.jpg?t=st=1652926554~exp=1652927154~hmac=7f78da850acbdbfe28894b439a2b38acc09006b631e4c94c88731d86874b7da2&w=1380",
        "https://img.freepik.com/vector-gratis/diseno-patron-pizza_1284-888.jpg?w=1380",
        "https://img.freepik.com/vector-gratis/restaurante-simbolos-patrones-fisuras-doodle-sketch_1284-12804.jpg?w=1380",
        "https://img.freepik.com/vector-gratis/fondo-comida-rapida-grafico-lineal-coleccion-refrigerios-comida-chatarra-ilustracion-vista-superior-grabada-ilustracion-vectorial_91128-1528.jpg?w=2000",
        "https://img.freepik.com/vector-gratis/concepto-comida-rapida-hamburguesa-ilustracion-vector-boceto-dibujado-mano_91128-1522.jpg?t=st=1652927976~exp=1652928576~hmac=386bdb9d8ee42fbd76cf294ed54fb55f48033ec8db9acead5d61a2bc12bf8789&w=1380",
        "https://img.freepik.com/vector-gratis/fondo-cafe-realista-dibujos_157027-1110.jpg?t=st=1652936143~exp=1652936743~hmac=97c88bf2893e4fb1eba5c6bb678c16d0dd009e781b851d5bbc4260a656729c0b&w=2000",
        "https://img.freepik.com/vector-gratis/coleccion-cafe-pizarra-dibujada-mano_79603-1654.jpg?t=st=1652961648~exp=1652962248~hmac=023c6ace617dc69bc4bf0d4cea3106b14a9a0d6bc74d26877bb7451aa42b8504&w=1800",
    ];
    const [img, setImg] = useState(imgUrl[Math.floor(Math.random() * 10)]);

    useEffect(() => {
        if (isLogin()) {
            navigate("./dashboard/carta");
        }
    }, []);

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
                                backgroundImage: `url(${img})`,
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
