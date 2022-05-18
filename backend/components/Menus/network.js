const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");

router.post("/", (req, res) => {
    controller
        .saveMenu(req.body)
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
        .findClientMenu(req.query.id)
        .then((data) => {
            response.success(res, "Menus encontrados", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});

router.get("/:menuId", (req, res) => {
    controller
        .getMenu(req.params.menuId)
        .then((data) => {
            response.success(res, "Menu encontrado", data);
        })
        .catch((err) => {
            response.error(res, err, err);
        });
});

module.exports = router;
