import React, { useState, useContext } from "react";
//mui
import { Typography, Avatar, Stack } from "@mui/material";

//context
import { MenuContext } from "../context/MenuContext";

//components
import Cart from "./Cart";
import Category from "./Category";
import OrderButton from "./OrderButton";
import SearchProduct from "./SearchProduct";

const MenuOnline = () => {
    const { findProduct, client, loading } = useContext(MenuContext);
    const [showCart, setShowCart] = useState(false);

    return (
        !loading && (
            <Stack
                my={3}
                gap={5}
                alignItems='center'
                sx={{ position: "relative" }}
            >
                <Stack alignItems='center' gap={3}>
                    <Avatar
                        src={client.avatar}
                        sx={{ width: "100px", height: "100px" }}
                    />
                    <Typography variant='h4' color='initial'>
                        {client.name}
                    </Typography>
                </Stack>

                <SearchProduct />

                <Stack width='90%' gap={10}>
                    {findProduct.map(
                        (cat) =>
                            cat.products.length > 0 && (
                                <Category key={cat._id} cat={cat} />
                            )
                    )}
                </Stack>

                <OrderButton showCart={showCart} setShowCart={setShowCart} />
                <Cart showCart={showCart} setShowCart={setShowCart} />
            </Stack>
        )
    );
};

export default MenuOnline;
