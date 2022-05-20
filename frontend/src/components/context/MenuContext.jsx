import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useDB from "../../hooks/useDB";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [loading, setLoadin] = useState(true);
    const [error, setError] = useState(false);

    const [data, setData] = useState();
    const [client, setClient] = useState();
    const [search, setSearch] = useState([]);

    let { menuId } = useParams();
    const { DB } = useDB();
    const SERVER = import.meta.env.VITE_APP_SERVER;

    useEffect(() => {
        const findMenu = async () => {
            try {
                let getMenu = await axios.get(SERVER + `/menus/${menuId}`);
                let getUserInfo = await axios.get(
                    SERVER + `/clients?id=${getMenu.data.data[0].clientId}`
                );
                setData(getMenu.data.data[0]);
                setClient({
                    name: getUserInfo.data.data[0].name,
                    avatar: getUserInfo.data.data[0].avatar,
                });
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
    };

    const deleteItem = (id) => {
        let copyCart = cart.filter((item) => {
            if (item.product._id !== id) {
                return item;
            } else {
                setTotalItems(totalItems - item.qty);
                setTotalCart(totalCart - item.qty * Number(item.product.price));
            }
        });
        setCart(copyCart);
    };

    const sendOrder = (mesa) => {
        let items = cart.map((item) => {
            return {
                productId: item.product._id,
                qty: item.qty,
            };
        });
        let dataToSend = {
            clientId: data.clientId,
            menuId: data._id,
            complete: false,
            items: items,
            total: totalCart,
            mesa: mesa,
            date: new Date(),
        };

        console.log(dataToSend);

        DB.save("/orders", dataToSend).then((res) => {
            console.log(res);
        });
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
                deleteItem,
                sendOrder,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };
