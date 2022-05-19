import React, { useContext } from "react";
import { Stack, Fab, Badge } from "@mui/material";
import RoomServiceIcon from "@mui/icons-material/RoomService";

import { MenuContext } from "../context/MenuContext";

const OrderButton = ({ showCart, setShowCart }) => {
    const { totalItems } = useContext(MenuContext);

    return (
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
                onClick={() => setShowCart((prevState) => !prevState)}
                sx={{
                    width: "150px",
                    py: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Badge badgeContent={totalItems} color='secondary'>
                    <RoomServiceIcon />
                </Badge>
                {!showCart ? "Ver Orden" : "Ocultar"}
            </Fab>
        </Stack>
    );
};

export default OrderButton;
