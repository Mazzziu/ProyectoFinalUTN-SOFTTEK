import React from "react";

//components
import ProductItem from "./ProductItem";

import {
    Typography,
    List,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategorieOverview = ({ data, setData }) => {
    const findProductAndRemove = (indiceCat, indiceProd) => {
        let copyData = JSON.parse(JSON.stringify(data));
        copyData.categories[indiceCat].products.splice(indiceProd, 1);
        setData(copyData);
    };

    const [expandAll, setExpandAll] = React.useState(false);
    const [expanded, setExpanded] = React.useState("panel0");
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box width='100%'>
            <Typography variant='h5' color='initial' mb={2}>
                Resumen del Menu
            </Typography>
            {data.categories.length > 1 && (
                <Stack direction='row' alignItems='center' my='1rem'>
                    <Switch onChange={() => setExpandAll(!expandAll)} />
                    <Typography variant='body2' color='initial'>
                        Ver Completo
                    </Typography>
                </Stack>
            )}
            {data.categories.length > 0 && (
                <Stack>
                    {data.categories.map((cat, idxCat) => (
                        <Accordion
                            key={"cat-" + cat.title}
                            expanded={
                                expanded === `panel${idxCat}` || expandAll
                            }
                            onChange={handleChange(`panel${idxCat}`)}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{cat.title}</Typography>
                            </AccordionSummary>
                            {cat.products.length > 0 ? (
                                <AccordionDetails>
                                    <Typography>
                                        Productos en esta categoría
                                    </Typography>
                                    <List
                                        sx={{
                                            width: "100%",
                                            bgcolor: "background.paper",
                                        }}
                                    >
                                        {cat.products.map((product, idx) => (
                                            <ProductItem
                                                key={"producto-" + idx}
                                                product={product}
                                                onDelete={() =>
                                                    findProductAndRemove(
                                                        idxCat,
                                                        idx
                                                    )
                                                }
                                            />
                                        ))}
                                    </List>
                                </AccordionDetails>
                            ) : (
                                <AccordionDetails>
                                    <Typography>
                                        No hay productos en esta categoría
                                    </Typography>
                                </AccordionDetails>
                            )}
                        </Accordion>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default CategorieOverview;
