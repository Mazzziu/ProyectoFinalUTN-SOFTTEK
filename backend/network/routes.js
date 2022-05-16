const cors = require("cors");

//controllers
const clients = require("../components/Clients/network");
const menus = require("../components/Menus/network");

const routes = (server) => {
    server.use(cors());
    server.use("/clients", clients);
    server.use("/menus", menus);
};

module.exports = routes;
