import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useMenu = () => {
    const [loading, setLoadin] = useState(true);
    const [error, setError] = useState(false);

    const [menu, setMenu] = useState();
    const [client, setClient] = useState();
    let { menuId } = useParams();
    const SERVER = import.meta.env.VITE_APP_SERVER;
    useEffect(() => {
        const findMenu = async () => {
            try {
                let getMenu = await axios.get(SERVER + `/menus/${menuId}`);
                console.log(getMenu.data.data[0].clientId);
                let getUserInfo = await axios.get(
                    SERVER + `/clients?id=${getMenu.data.data[0].clientId}`
                );
                setMenu(getMenu.data.data[0]);
                setClient(getUserInfo.data.data[0].name);
                setLoadin(false);
            } catch (err) {
                setLoadin(false);
                setError(err.message);
            }
        };
        findMenu();
    }, []);

    return { menu, client, error, loading };
};

export default useMenu;
