const cors = require("cors");

//controllers
const clients = require("../components/Clients/network");

const routes = (server) => {
    server.use(cors());
    server.use("/clients", clients);
};

module.exports = routes;
