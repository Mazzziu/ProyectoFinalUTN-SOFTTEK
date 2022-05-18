import React from "react";
import {
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Button,
    CardActions,
    Stack,
} from "@mui/material";

const Product = ({ item }) => {
    let { _id, name, img, description, price } = item;
    return (
        <Card sx={{ width: "270px", height: "380px" }}>
            <CardActionArea onClick={() => console.log(_id)}>
                <CardMedia
                    component='img'
                    alt='portada del menu'
                    height='140'
                    image={img}
                />
                <CardContent sx={{ height: "155px" }}>
                    <Stack justifyContent='space-between'>
                        <Stack sx={{ height: "107px" }}>
                            <Typography
                                gutterBottom
                                variant='h6'
                                component='div'
                            >
                                {name}
                            </Typography>
                            <Typography
                                height='50px'
                                variant='body2'
                                color='text.secondary'
                                paragraph
                                sx={{
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {description}
                            </Typography>
                        </Stack>
                        <Typography
                            variant='h5'
                            color='initial'
                            mt='1rem'
                            p='0.5rem'
                            align='center'
                        >
                            ${price}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => console.log(_id)}
                    fullWidth
                >
                    Agregar
                </Button>
            </CardActions>
        </Card>
    );
};

export default Product;
