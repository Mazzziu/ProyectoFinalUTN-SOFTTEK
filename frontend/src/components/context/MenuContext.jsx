import { useState, useEffect, createContext, Children } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [loading, setLoadin] = useState(true);
    const [error, setError] = useState(false);

    const [data, setData] = useState();
    const [client, setClient] = useState();
    const [search, setSearch] = useState([]);

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
                setData(getMenu.data.data[0]);
                setClient(getUserInfo.data.data[0].name);
                setLoadin(false);
            } catch (err) {
                setLoadin(false);
                setError(err.message);
            }
        };
        findMenu();
    }, []);

    const findProduct = () => {
        if (data) {
            if (search.length > 0) {
                let categories = JSON.parse(JSON.stringify(data.categories));
                return categories.map((cat) => {
                    let newCat = cat;
                    cat.products = cat.products.filter((prod) =>
                        prod.name.toLowerCase().includes(search.toLowerCase())
                    );
                    return newCat;
                });
            }
            return data.categories;
        }
    };

    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalCart, setTotalCart] = useState(0);

    const addToCart = (product, price) => {
        setTotalItems(totalItems + 1);
        setTotalCart(totalCart + Number(price));

        //si el carrito esta vacio
        if (cart.length === 0) {
            setCart([...cart, { qty: 1, product }]);
        }

        //si ya hay productos y el elemento esta repetido
        let isRepeat = (item) => item.product._id === product._id;
        if (cart.length > 0 && cart.some(isRepeat)) {
            //actualizo su cantidad
            let copyCart = cart.map((item) => {
                if (item.product._id === product._id) {
                    item.qty += 1;
                }

                return item;
            });
            setCart(copyCart);
        } else {
            //si no esta repetido lo agrego normal
            setCart([...cart, { qty: 1, product }]);
        }
        console.log(cart);
    };

    return (
        <MenuContext.Provider
            value={{
                menu: data,
                setSearch,
                findProduct: findProduct(),
                client,
                error,
                loading,
                addToCart,
                cart,
                totalCart,
                totalItems,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };
