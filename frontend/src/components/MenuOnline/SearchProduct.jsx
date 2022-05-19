import React, { useContext } from "react";
import { Stack, TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { MenuContext } from "../context/MenuContext";

const SearchProduct = () => {
    const { setSearch } = useContext(MenuContext);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <Stack width='50%'>
            <TextField
                id='search'
                variant='standard'
                placeholder='Buscar'
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
};

export default SearchProduct;
