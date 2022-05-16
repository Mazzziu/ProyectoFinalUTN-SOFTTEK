const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const c = require("ansi-colors");

//config
const PORT = process.env.PORT || 3400;
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use("/public", express.static(path.join(__dirname, "./public")));

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
