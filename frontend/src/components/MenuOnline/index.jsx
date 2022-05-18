import React, { useState, useEffect } from "react";

import {
    Grid,
    Typography,
    TextField,
    InputAdornment,
    Avatar,
    Stack,
    Fab,
    Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomServiceIcon from "@mui/icons-material/RoomService";

import Category from "./Category";
import Order from "./Order";

import useMenu from "../../hooks/useMenu";

const MenuOnline = () => {
    const { menu, client, loading } = useMenu();
    const [show, setShow] = useState(false);
    console.log(client);
    console.log(menu);
    return (
        !loading && (
            <Stack
                my={3}
                gap={5}
                alignItems='center'
                sx={{ position: "relative" }}
            >
                <Stack alignItems='center' gap={3}>
                    <Avatar sx={{ width: "100px", height: "100px" }} />
                    <Typography variant='h4' color='initial'>
                        {client}
                    </Typography>
                </Stack>

                <Stack width='50%'>
                    <TextField
                        id='search'
                        variant='standard'
                        placeholder='Buscar'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Stack width='90%' gap={10}>
                    {menu.categories.map((cat) => (
                        <Category key={cat._id} cat={cat} />
                    ))}
                </Stack>

                <Stack
                    alignSelf='flex-end'
                    sx={{
                        position: "-webkit-sticky",
                        position: "sticky",
                        bottom: "25px",
                        right: "50px",
                        zIndex: "1",
                    }}
                >
                    <Fab
                        variant='extended'
                        color='primary'
                        onClick={() => setShow((prevState) => !prevState)}
                    >
                        <RoomServiceIcon sx={{ mr: 1 }} />
                        {!show ? "Ver Orden" : "Ocultar"}
                    </Fab>
                </Stack>

                <Drawer
                    sx={{
                        zIndex: "0",
                    }}
                    anchor='left'
                    open={show}
                    onClose={() => setShow(false)}
                >
                    <Stack>
                        <Order></Order>
                    </Stack>
                </Drawer>
            </Stack>
        )
    );
};

export default MenuOnline;
