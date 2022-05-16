import React, { createContext, useState } from "react";

const MenuContext = createContext();

const CreateMenuContext = ({ children }) => {
    const [menu, setMenu] = useState({
        clientId: "",
        title: "",
        description: "",
        cover: "",
        categories: [],
    });

    return (
        <MenuContext.Provider value={setMenu}>{children}</MenuContext.Provider>
    );
};

export default CreateMenuContext;
