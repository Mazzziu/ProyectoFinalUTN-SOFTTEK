import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem, Stack } from "@mui/material";

import DialogWindow from "../../DialogWindow";

import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import { CopyToClipboard } from "react-copy-to-clipboard";
import useDB from "../../../hooks/useDB";

const CardMenu = ({ id, title, desc, cover, setMenus }) => {
    const URL = "http://localhost:3000/view/" + id;
    const { DB, loading, error, done } = useDB();
    const [showDialog, setShowDialog] = useState(false);

    const openLink = () => {
        window.open(URL);
    };

    const [copied, setCopied] = useState(false);
    const copyLink = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const deleteMenu = () => {
        DB.delete(`/menus?id=${id}`);
        //uso el estado general de los menus obtenido en el componente padre: <MiCarta/>
        setMenus((prevState) => {
            let newStateMenu = prevState.filter((menu) => menu._id !== id);
            return newStateMenu;
        });
    };

    //estados de mui
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    //estado que controla el display de menu de opciones
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ width: "300px" }}>
            <CardActionArea onClick={() => console.log(id)}>
                <CardMedia
                    component='img'
                    alt='portada del menu'
                    height='140'
                    image={cover}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Stack
                    width='100%'
                    direction='row'
                    justifyContent='space-between'
                >
                    <Button size='small' color='secondary' onClick={openLink}>
                        <ReplyIcon />
                        Ver
                    </Button>
                    <CopyToClipboard text={URL} onCopy={copyLink}>
                        <Button
                            size='small'
                            color={!copied ? "info" : "success"}
                        >
                            <LinkIcon />
                            {!copied ? "Copiar Link" : "Copiado!"}
                        </Button>
                    </CopyToClipboard>
                    <div>
                        <Button
                            id='basic-button'
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <SettingsIcon />
                        </Button>
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {/* <MenuItem onClick={handleClose}>
                                <AutoFixHighIcon />
                                Editar
                            </MenuItem> */}
                            <MenuItem
                                onClick={() => {
                                    setShowDialog(true);
                                    handleClose();
                                }}
                            >
                                <DeleteIcon /> Eliminar
                            </MenuItem>
                        </Menu>
                    </div>
                </Stack>
            </CardActions>
            <DialogWindow
                title={`Eliminar "${title}"`}
                content='¿Estas seguro de eliminar este menú?'
                show={showDialog}
                setShow={setShowDialog}
                onSuccess={deleteMenu}
            />
        </Card>
    );
};

export default CardMenu;
