//controllers
const clients = require("../components/Clients/network");
const menus = require("../components/Menus/network");
const orders = require("../components/Orders/network");
const products = require("../components/Products/network");

const routes = (server) => {
    server.use("/clients", clients);
    server.use("/menus", menus);
    server.use("/orders", orders);
    server.use("/products", products);
};

module.exports = routes;
