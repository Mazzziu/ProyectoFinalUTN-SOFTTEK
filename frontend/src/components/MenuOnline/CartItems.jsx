import React, { useContext } from "react";
import { Typography, Stack, Chip } from "@mui/material";
import ProductItem from "../Dashboard/MiCarta/NewMenu/ProductItem";
import { MenuContext } from "../context/MenuContext";

const CartItems = () => {
    const { cart, deleteItem } = useContext(MenuContext);
    return cart.length > 0 ? (
        cart.map((item) => (
            <Stack
                key={"item-" + item.product._id}
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
                    onDelete={() => deleteItem(item.product._id)}
                />
            </Stack>
        ))
    ) : (
        <Typography variant='body1' color='initial'>
            No hay items en tu orden
        </Typography>
    );
};

export default CartItems;
