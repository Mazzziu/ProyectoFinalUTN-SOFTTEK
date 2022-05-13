import React from "react";

import { Typography, Button, Box, Stack, CssBaseline } from "@mui/material";
import CartaPreview from "./CartaPreview";
import { useNavigate } from "react-router-dom";
const MiCarta = () => {
    const navigate = useNavigate();
    return (
        <>
            <Typography variant='h2' color='initial' sx={{ m: "3rem" }}>
                Mis Cartas
            </Typography>
            <CssBaseline />
            <Stack
                direction='row'
                sx={{ overflow: scroll, flexWrap: "wrap" }}
                gap={3}
            >
                <CartaPreview />
                <CartaPreview />
                <CartaPreview />
                <Button variant='text' onClick={() => navigate("./new-menu")}>
                    + Crear menu
                </Button>
            </Stack>
        </>
    );
};

export default MiCarta;
