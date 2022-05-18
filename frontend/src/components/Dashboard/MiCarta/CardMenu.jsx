import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardMenu = ({ id, title, desc, cover }) => {
    const deleteMenu = () => {};
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => navigate("/view/" + id)}>
                <CardMedia
                    component='img'
                    alt='portada del menu'
                    height='140'
                    image={cover}
                />
                <CardContent>
                    <Chip label='Activada' size='small' color='success' />
                    <Typography gutterBottom variant='h5' component='div'>
                        {title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='secondary'>
                    Editar
                </Button>
                <Button size='small' color='error' onClick={deleteMenu}>
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardMenu;
