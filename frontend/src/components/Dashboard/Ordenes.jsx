import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useDB from "../../hooks/useDB";

import {
    Stack,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";

const Ordenes = () => {
    const SERVER = import.meta.env.VITE_APP_SERVER;
    const socket = io(SERVER);

    const [notificacion, setNotificacion] = useState("");
    const { DB, loading, error, done: orders } = useDB();

    const clientId = JSON.parse(localStorage.getItem("LOGIN")).id;
    socket.on(clientId, (data) => {
        console.log(data);
        setNotificacion(data);
    });

    useEffect(() => {
        console.log(notificacion);
        DB.get("/orders");
        console.log(orders.data);
    }, [notificacion]);

    return (
        <Stack p='2rem'>
            {loading && (
                <Typography variant='h5' color='initial'>
                    Cargando ordenes
                </Typography>
            )}
            {!loading && orders.status && (
                <Stack gap={4}>
                    {orders.data.map((order) => (
                        <Card key={order._id}>
                            <CardContent>
                                <Typography variant='h5' color='initial'>
                                    Mesa #{order.mesa}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' color='success'>
                                    Completar
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default Ordenes;
