const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");

router.post("/", (req, res) => {
    controller
        .saveProduct(req.body)
        .then((data) => {
            response.success(res, data.msg, data);
        })
        .catch((err) => {
            console.log(err);
            response.error(res, err, err);
        });
});

router.get("/", (req, res) => {
    controller
        .getProduct(req.query.id)
        .then((data) => {
            response.success(res, "Productos encontradas", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});

module.exports = router;
