const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");

router.post("/login", (req, res) => {
    controller
        .login(req.body)
        .then((data) => {
            response.success(res, data.msg, data);
        })
        .catch((err) => {
            console.log(err);
            response.error(res, err, err);
        });
});

router.post("/", (req, res) => {
    controller
        .saveClient(req.body)
        .then((data) => {
            response.success(res, "Cliente guardado", data);
        })
        .catch((err) => {
            response.error(res, "Error al guardar cliente", err);
        });
});

router.get("/", (req, res) => {
    controller
        .findClient(req.query.email)
        .then((data) => {
            response.success(res, "Cliente encontrado", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});

module.exports = router;
