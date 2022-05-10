const c = require("ansi-colors");

exports.success = (res, mensaje, data) => {
    res.status(200).send({
        error: "",
        msg: mensaje,
        data: data,
    });
};
exports.error = (res, msgUser, details) => {
    console.log(c.bgRed("[Response Error] " + details));
    res.status(200).send({
        error: msgUser,
        msg: "",
        data: {},
    });
};
