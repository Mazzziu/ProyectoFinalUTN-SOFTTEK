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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategorieOverview = ({ data }) => {
    return (
        data.categories.length > 0 && (
            <Box width='100%'>
                <Typography variant='h5' color='initial' mb={2}>
                    Resumen
                </Typography>
                <Stack>
                    {data.categories.map((cat) => (
                        <Accordion key={"cat-" + cat.title}>
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
            </Box>
        )
    );
};

export default CategorieOverview;
