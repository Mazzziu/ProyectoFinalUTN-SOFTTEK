import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";
import useDB from "./useDB";

const useOrders = () => {
    const SERVER = import.meta.env.VITE_APP_SERVER;
    const socket = io(SERVER);
    const { enqueueSnackbar } = useSnackbar();
    const { DB, loading } = useDB();
    const [orders, setOrders] = useState(null);
    const clientId = JSON.parse(localStorage.getItem("LOGIN")).id;

    const handleSocket = useCallback(() => {
        DB.get(`/orders?id=${clientId}&complete=false`).then((data) => {
            enqueueSnackbar("Nueva Orden!", {
                variant: "success",
            });
            setOrders(data);
        });
    });

    useEffect(() => {
        DB.get(`/orders?id=${clientId}&complete=false`).then((data) =>
            setOrders(data)
        );
        socket.on(clientId, handleSocket);
    }, []);

    const completeOrder = (orderId) => {
        console.log(orderId);
        DB.put("/orders/complete?id=" + orderId);
        let newOrders = orders.filter((order) => order._id !== orderId);
        setOrders(newOrders);
    };

    return {
        orders,
        loading,
        clientId,
        completeOrder,
    };
};

export default useOrders;
