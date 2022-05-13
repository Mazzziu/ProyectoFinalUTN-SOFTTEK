import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

export default function CartaPreview() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component='img'
                alt='portada del menu'
                height='140'
                image='/static/images/cards/contemplative-reptile.jpg'
            />
            <CardContent>
                <Chip label='Activada' size='small' color='success' />
                <Typography gutterBottom variant='h5' component='div'>
                    Titulo del menu
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Descripcion del menu Descripcion del menu Descripcion del
                    menu Descripcion del menu Descripcion del menu Descripcion
                    del menu Descripcion del menu
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' color='secondary'>
                    Editar
                </Button>
                <Button size='small' color='error'>
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
}
