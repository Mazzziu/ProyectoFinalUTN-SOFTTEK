import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

const ProductItem = ({ product, onDelete }) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge='end' aria-label='delete' onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar alt={product.name} src={product.img}>
                <Avatar
                    alt='imagen de producto'
                    src={product.img}
                    sx={{ width: "60px", height: "60px", mr: "1rem" }}
                />
            </ListItemAvatar>
            <ListItemText
                primary={product.name}
                secondary={product.description}
            />
            <Typography mr='1rem'>${product.price}</Typography>
        </ListItem>
    );
};

export default ProductItem;
