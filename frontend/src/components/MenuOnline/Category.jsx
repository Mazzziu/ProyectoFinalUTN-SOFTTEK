import React from "react";
import { Typography, Stack } from "@mui/material";
import Product from "./Product";

const Category = ({ cat }) => {
    return (
        <Stack gap={4}>
            <Typography variant='h4' color='initial'>
                {cat.title}
            </Typography>
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent='start'
                alignItems='center'
                gap={3}
                // sx={{ backgroundColor: "#f433" }}
            >
                {cat.products.map((product) => (
                    <Product key={product._id} item={product} />
                ))}
            </Stack>
        </Stack>
    );
};

export default Category;
