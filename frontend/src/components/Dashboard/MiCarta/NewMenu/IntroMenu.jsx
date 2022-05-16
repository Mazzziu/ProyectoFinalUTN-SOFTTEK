import React from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import useBase64 from "../../../hooks/useBase64";

const IntroMenu = ({ setData }) => {
    const handleInput = (e) => {
        setData((prev) => {
            return {
                ...prev,
                title: e.target.value,
            };
        });
    };

    const handleDesctipton = (e) => {
        setData((prev) => {
            return {
                ...prev,
                description: e.target.value,
            };
        });
    };

    const [imgMenu, setImgMenu] = useBase64(null);
    const handleCover = (e) => {
        setImgMenu(e.target.files[0], (img) => {
            setData((prev) => {
                return {
                    ...prev,
                    cover: img,
                };
            });
        });
    };

    const Input = styled("input")({
        display: "none",
    });

    return (
        <Box component='form' mt={3}>
            <Stack gap={3}>
                <TextField
                    id='title'
                    label='Titulo del Menú'
                    onChange={handleInput}
                    fullWidth
                />
                <TextField
                    id='menu-description'
                    multiline
                    label='Descripcion del menu'
                    onChange={handleDesctipton}
                />
                <Stack direction={{ xs: "column", md: "row" }} gap={3}>
                    <label htmlFor='contained-button-file'>
                        <Typography variant='h5' color='initial' mb='1rem'>
                            Sube una portada para tu menu
                        </Typography>
                        <Input
                            accept='image/*'
                            id='contained-button-file'
                            multiple
                            type='file'
                            onChange={handleCover}
                        />
                        <Button
                            variant='contained'
                            component='span'
                            color='secondary'
                        >
                            Seleccionar
                        </Button>
                    </label>
                    {imgMenu && (
                        <Box
                            component='img'
                            src={imgMenu}
                            alt='portada del menu'
                            sx={{ maxWidth: "50%" }}
                        />
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

export default IntroMenu;
