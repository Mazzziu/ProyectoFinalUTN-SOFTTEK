import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useMenu = () => {
    const [loading, setLoadin] = useState(true);
    const [error, setError] = useState(false);

    const [menu, setMenu] = useState();
    const [menuSearch, setMenuSearch] = useState(null);
    const [client, setClient] = useState();

    let { menuId } = useParams();
    const SERVER = import.meta.env.VITE_APP_SERVER;

    useEffect(() => {
        const findMenu = async () => {
            try {
                let getMenu = await axios.get(SERVER + `/menus/${menuId}`);
                // console.log(getMenu.data.data[0].clientId);
                let getUserInfo = await axios.get(
                    SERVER + `/clients?id=${getMenu.data.data[0].clientId}`
                );
                setMenu(getMenu.data.data[0]);
                setClient(getUserInfo.data.data[0].name);
                if (menuSearch === null) {
                    console.log("actualizo menuSearch");
                    setMenuSearch(getMenu.data.data[0]);
                }
                setLoadin(false);
            } catch (err) {
                setLoadin(false);
                setError(err.message);
            }
        };
        findMenu();
    }, []);

    const search = (value) => {
        console.log(value);
        setMenuSearch(menu);

        if (value === "") {
            setMenuSearch(menu);
        } else {
            let itemsFound = menu.categories.map((cat) => {
                let newCat = cat;
                cat.products = cat.products.filter((prod) =>
                    prod.name.includes(value)
                );
                return newCat;
            });
            let newMenu = menu;
            newMenu.categories = itemsFound;
            console.log(newMenu);
            setMenuSearch(newMenu);
        }
        //console.log(menu);
    };

    return {
        menu: menuSearch,
        searchProduct: search,
        client,
        error,
        loading,
    };
};

export default useMenu;
