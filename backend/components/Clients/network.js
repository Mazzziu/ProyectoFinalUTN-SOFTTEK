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
            response.error(res, err, err);
        });
});

router.get("/", (req, res) => {
    controller
        .findClient(req.query)
        .then((data) => {
            response.success(res, "Cliente encontrado", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});

router.put("/", (req, res) => {
    controller
        .updateClient(req.query.id, req.body)
        .then((data) => {
            response.success(res, "Cliente Actualizado", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});
router.get("/", (req, res) => {
    controller
        .findClient(req.query)
        .then((data) => {
            response.success(res, "Cliente encontrado", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});

module.exports = router;
