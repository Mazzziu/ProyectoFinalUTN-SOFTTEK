import React, { useState, useEffect } from "react";
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
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const ProductItem = () => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Photos' secondary='Jan 9, 2014' />
        </ListItem>
    );
};

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategorieAccordion = () => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                <Typography>Categoria 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Productos en esta categoría</Typography>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    {[1, 2].map((i) => (
                        <ProductItem key={i} />
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

const FormProducts = ({ data, setData }) => {
    const [categorias, setCategorias] = useState([
        { id: 1, name: "Variedad de Cafes" },
        { id: 2, name: "Variedad de Tortas" },
    ]);
    const [input, setInput] = useState("");

    const inputChange = (e) => {
        setInput(e.target.value);
    };

    const addCategory = () => {
        let id = 0;
        if (categorias.length > 0) {
            id = Number(categorias[categorias.length - 1].id) + 1;
        }
        if (input !== "") {
            console.log(categorias);
            setCategorias([
                ...categorias,
                {
                    id,
                    name: input,
                },
            ]);
            setInput("");
        }
    };

    const [selected, setSelected] = useState("");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    useEffect(() => {
        //TODO
        //peticion de las categorias o pasar el la lista por props
    }, []);

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent='space-between'
            width='100%'
            gap={5}
        >
            <Box width='100%'>
                <Stack direction='row' my='2rem' gap={2}>
                    <TextField
                        id='categoria'
                        label='Nueva categoria'
                        onChange={inputChange}
                        value={input}
                        fullWidth
                    />
                    <Button onClick={addCategory} sx={{ px: "1rem" }}>
                        Agregar
                    </Button>
                </Stack>
                <Divider />

                <Stack my={4} gap={2}>
                    <TextField id='product-name' label='Nombre del producto' />
                    <TextField
                        id='product-description'
                        label='Describe el producto'
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor='amount'>Precio</InputLabel>
                        <OutlinedInput
                            id='amount'
                            startAdornment={
                                <InputAdornment position='start'>
                                    $
                                </InputAdornment>
                            }
                            label='Precio'
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
                            {categorias.map((cat) => (
                                <MenuItem key={"cat-" + cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Box>
            <Box width='100%'>
                <Typography variant='h5' color='initial' mb={2}>
                    Resumen
                </Typography>
                <Stack>
                    <CategorieAccordion />
                    <CategorieAccordion />
                    <CategorieAccordion />
                </Stack>
            </Box>
        </Stack>
    );
};

export default FormProducts;
