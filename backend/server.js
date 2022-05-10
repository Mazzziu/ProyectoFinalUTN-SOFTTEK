const express = require("express");
const app = express();
require("dotenv").config();
const c = require("ansi-colors");

//config
const PORT = process.env.PORT || 3400;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
const routes = require("./network/routes");
routes(app);

//db
const db = require("./db");
const DB_URL = process.env.DB_CONNECT;
db.connect(DB_URL);

//server
app.listen(PORT, () => {
    console.log(
        c.greenBright("[SERVER] Success: connected at http://localhost:" + PORT)
    );
});
