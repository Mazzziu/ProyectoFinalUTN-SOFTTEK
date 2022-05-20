import React, { useContext, useEffect, useState } from "react";
import {
    Stack,
    MenuItem,
    Typography,
    Select,
    FormControl,
    InputLabel,
    Button,
    Drawer,
} from "@mui/material";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import { useMediaQuery } from "react-responsive";

import { MenuContext } from "../context/MenuContext";
import CartItems from "./CartItems";

const Cart = ({ showCart, setShowCart }) => {
    const xs = useMediaQuery({ query: "(min-width: 0px)" });
    const sm = useMediaQuery({ query: "(min-width: 600px)" });
    const md = useMediaQuery({ query: "(min-width: 960px)" });

    let width = "40vw";
    if (xs) {
        width = "84vw";
    }
    if (sm) {
        width = "60vw";
    }
    if (md) {
        width = "40vw";
    }

    const { totalCart, cart, sendOrder } = useContext(MenuContext);
    const [disable, setDisable] = useState(true);
    const [mesas, setMesas] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [selectMesa, setSelectMesa] = useState("");

    useEffect(() => {
        if (cart.length > 0 && selectMesa !== "") {
            setDisable(false);
        }
    }, [cart, selectMesa]);

    return (
        <Drawer
            sx={{
                zIndex: "0",
            }}
            anchor='left'
            open={showCart}
            onClose={() => setShowCart(false)}
        >
            <Stack width={width} p='2rem' gap={4}>
                <Typography variant='h4' color='initial'>
                    Mi Pedido
                </Typography>

                <CartItems />

                <Stack gap={2}>
                    <Typography variant='h6' color='initial' align='right'>
                        Total de la orden: ${totalCart}
                    </Typography>

                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            Selecciona tu mesa
                        </InputLabel>
                        <Select
                            value={selectMesa}
                            label='Selecciona una categoría'
                            onChange={(e) => setSelectMesa(e.target.value)}
                        >
                            {mesas.map((mesa) => (
                                <MenuItem key={"mesa-" + mesa} value={mesa}>
                                    Mesa {mesa}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        color='success'
                        variant='contained'
                        sx={{ mt: "2rem", py: "1rem" }}
                        startIcon={<RoomServiceIcon />}
                        disabled={disable}
                        onClick={() => sendOrder(selectMesa)}
                    >
                        Confirmar Orden
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export default Cart;
