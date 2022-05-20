import React from "react";
import { Stack, Typography } from "@mui/material";

import useOrders from "../../../hooks/useOrders";

import CardOrder from "./CardOrder";

const Ordenes = () => {
    const { orders, loading, completeOrder } = useOrders();

    return (
        <Stack p='2rem'>
            {loading && (
                <Typography variant='h5' color='initial'>
                    Cargando ordenes
                </Typography>
            )}
            {!loading && orders && (
                <Stack gap={4}>
                    {orders.map((order) => (
                        <CardOrder
                            key={order._id}
                            order={order}
                            onComplete={() => completeOrder(order._id)}
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default Ordenes;
