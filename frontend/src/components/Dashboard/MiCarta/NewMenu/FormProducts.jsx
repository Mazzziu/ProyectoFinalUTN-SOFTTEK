import React, { useState } from "react";
import {
    Box,
    Stack,
    TextField,
    Button,
    FormControl,
    Select,
    InputLabel,
    InputAdornment,
    MenuItem,
    Divider,
    OutlinedInput,
    Typography,
    Avatar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
const Input = styled("input")({
    display: "none",
});

import CategorieOverview from "./CategorieOverview";
import useBase64 from "../../../../hooks/useBase64";

const FormProducts = ({ data, setData }) => {
    //crea categorias
    const [category, setCategory] = useState("");
    const categoryChange = (e) => {
        setCategory(e.target.value);
    };
    const addCategory = () => {
        if (category !== "") {
            if (!data.categories.some((el) => el.title === category))
                setData({
                    ...data,
                    categories: [
                        ...data.categories,
                        {
                            title: category,
                            products: [],
                        },
                    ],
                });
            setCategory("");
        }
    };

    //categoria seleccionada
    const [selected, setSelected] = useState("");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    // datos del producto
    const [product, setProduct] = useState({});
    const onChangeInputProduct = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };
    const [productImg, setProductImg] = useBase64(null);
    const onLoadImagen = (e) => {
        setProductImg(e.target.files[0], (productImg) => {
            setProduct({
                ...product,
                img: productImg,
            });
        });
    };

    //agrego los productos en sus respectivas categorias
    const addProduct = () => {
        //busco la categoria seleccionada
        const idx = data.categories.findIndex((el) => el.title === selected);
        let categoriesAux = data.categories;
        //cargo producto en vector de esa categoria
        categoriesAux[idx].products.push(product);
        setData({
            ...data,
            categories: categoriesAux,
        });
    };

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent='space-between'
            width='100%'
            gap={5}
        >
            <Box width='100%'>
                <Box
                    component='form'
                    sx={{
                        position: "-webkit-sticky",
                        position: "sticky",
                        top: "120px",
                    }}
                >
                    <Stack direction='row' my='2rem' gap={2}>
                        <TextField
                            id='categoria'
                            label='Nueva categoria'
                            onChange={categoryChange}
                            value={category}
                            fullWidth
                        />
                        <Button onClick={addCategory} sx={{ px: "1rem" }}>
                            Agregar
                        </Button>
                    </Stack>
                    <Divider />

                    <Stack my={4} gap={2}>
                        <Stack direction='row' gap={2} alignItems='center'>
                            <Avatar
                                alt='imagen de producto'
                                src={productImg}
                                sx={{ width: "100px", height: "100px" }}
                            />
                            <TextField
                                id='product-name'
                                name='name'
                                label='Nombre del producto'
                                onChange={onChangeInputProduct}
                                fullWidth
                            />

                            <label htmlFor='product-icon'>
                                <Input
                                    accept='image/*'
                                    id='product-icon'
                                    type='file'
                                    onChange={onLoadImagen}
                                />
                                <IconButton
                                    color='primary'
                                    aria-label='Foto del producto'
                                    component='span'
                                >
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Stack>
                        <TextField
                            id='product-description'
                            name='description'
                            label='Describe el producto'
                            onChange={onChangeInputProduct}
                        />
                        <FormControl fullWidth>
                            <InputLabel htmlFor='amount'>Precio</InputLabel>
                            <OutlinedInput
                                id='amount'
                                name='price'
                                startAdornment={
                                    <InputAdornment position='start'>
                                        $
                                    </InputAdornment>
                                }
                                label='Precio'
                                onChange={onChangeInputProduct}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                                Selecciona una categoría
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selected}
                                label='Selecciona una categoría'
                                onChange={handleSelect}
                            >
                                {data.categories.length > 0 ? (
                                    data.categories.map((cat, idx) => (
                                        <MenuItem
                                            key={"cat-" + idx}
                                            value={cat.title}
                                        >
                                            {cat.title}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem>
                                        No hay categorias, cree una
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Button
                            variant='outlined'
                            sx={{ maxWidth: "50%", alignSelf: "center" }}
                            onClick={addProduct}
                        >
                            + Agregar Producto
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <CategorieOverview data={data} setData={setData} />
        </Stack>
    );
};

export default FormProducts;
