import React, { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Button, Box, Stack, CssBaseline } from "@mui/material";
import CardMenu from "./CardMenu";
import { useNavigate } from "react-router-dom";
const MiCarta = () => {
    const navigate = useNavigate();
    const SERVER = import.meta.env.VITE_APP_SERVER;

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        let clientId = JSON.parse(localStorage.getItem("LOGIN")).id;

        axios
            .get(`${SERVER}/menus?id=${clientId}`)
            .then(({ data }) => {
                console.log(data.data);
                setMenus(data.data);
            })
            .catch((err) => console.log(err));
    }, []);

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
                {menus.map((carta) => (
                    <CardMenu
                        key={carta._id}
                        id={carta._id}
                        title={carta.title}
                        desc={carta.description}
                        cover={carta.cover}
                        setMenus={setMenus}
                    />
                ))}
                <Button variant='text' onClick={() => navigate("./new-menu")}>
                    + Crear menu
                </Button>
            </Stack>
        </>
    );
};

export default MiCarta;
