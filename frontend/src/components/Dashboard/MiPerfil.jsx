import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Stack,
    Box,
    TextField,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import useDB from "../../hooks/useDB";
import useBase64 from "../../hooks/useBase64";

const Input = styled("input")({
    display: "none",
});

const MiPerfil = () => {
    const { DB, loading } = useDB();
    const clientId = JSON.parse(localStorage.getItem("LOGIN")).id;
    const [data, setData] = useState({});

    useEffect(() => {
        DB.get("/clients?id=" + clientId).then((data) => setData(data[0]));
    }, []);

    const [editName, setEditName] = useState(true);
    const handleName = (e) => {
        let copyData = data;
        copyData.name = e.target.value;
        setData(copyData);
    };

    const [editEmail, setEditEmail] = useState(true);
    const handleEmail = (e) => {
        let copyData = data;
        copyData.email = e.target.value;
        setData(copyData);
    };

    const [avatar, setAvatar] = useBase64(null);
    const handleAvatar = (e) => {
        let copyData = data;
        setAvatar(e.target.files[0], (img) => {
            copyData.avatar = img;
            setData(copyData);
        });
    };

    const save = (e) => {
        e.preventDefault();
        let { name, email, avatar } = data;
        DB.update("/clients?id=" + clientId, { name, email, avatar });
        console.log(data);
    };

    return (
        <Stack p='2rem' width='100%'>
            <Typography variant='h5' color='initial'>
                Modificar mis datos
            </Typography>
            {!loading && (
                <Box component='form'>
                    <Stack gap={3} width='60%'>
                        <Stack direction='row' justifyContent='space-between'>
                            <TextField
                                variant='standard'
                                disabled={editName}
                                label={data.name}
                                onChange={handleName}
                                fullWidth
                            />
                            <IconButton
                                color='primary'
                                sx={{ width: "3rem", height: "3rem" }}
                                onClick={() => setEditName(!editName)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <TextField
                                variant='standard'
                                label={data.email}
                                disabled={editEmail}
                                onChange={handleEmail}
                                fullWidth
                            />
                            <IconButton
                                color='primary'
                                sx={{ width: "3rem", height: "3rem" }}
                                onClick={() => setEditEmail(!editEmail)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Stack>

                        <label htmlFor='avatar-file'>
                            <Typography variant='h5' color='initial' mb='1rem'>
                                Sube una foto de perfil.
                            </Typography>
                            <Input
                                id='avatar-file'
                                accept='image/*'
                                type='file'
                                onChange={handleAvatar}
                            />
                            <Button
                                variant='contained'
                                component='span'
                                color='secondary'
                            >
                                Seleccionar
                            </Button>
                        </label>
                        <Button
                            variant='contained'
                            color='success'
                            startIcon={<SaveIcon />}
                            onClick={save}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Box>
            )}
        </Stack>
    );
};

export default MiPerfil;
