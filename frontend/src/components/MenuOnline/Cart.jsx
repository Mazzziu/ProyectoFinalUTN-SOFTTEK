import React, { useContext } from "react";
import {
    Stack,
    MenuItem,
    Typography,
    Select,
    Chip,
    FormControl,
    InputLabel,
    Button,
    Drawer,
} from "@mui/material";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import { useMediaQuery } from "react-responsive";

import ProductItem from "../Dashboard/MiCarta/NewMenu/ProductItem";

import { MenuContext } from "../context/MenuContext";

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

    const { cart, totalCart, totalItems } = useContext(MenuContext);

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
                <Typography variant='h6' color='initial'>
                    Mi Pedido
                </Typography>

                {cart.length > 0 &&
                    cart.map((item) => (
                        <Stack
                            key={"item-" + item._id}
                            direction='row'
                            alignItems='center'
                        >
                            <Chip label={item.qty} />
                            <ProductItem
                                product={{
                                    name: item.product.name,
                                    img: item.product.img,
                                    description: item.product.description,
                                    price: item.product.price,
                                }}
                            />
                        </Stack>
                    ))}

                <Stack gap={2}>
                    <Typography variant='body1' color='initial' align='right'>
                        Total de la orden: ${totalCart}
                    </Typography>

                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            Selecciona tu mesa
                        </InputLabel>
                        <Select
                            // value={selected}
                            label='Selecciona una categoría'
                            // onChange={handleSelect}
                        >
                            {[1, 2, 3, 4, 5, 6].map((mesa) => (
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
                    >
                        Confirmar Orden
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export default Cart;
