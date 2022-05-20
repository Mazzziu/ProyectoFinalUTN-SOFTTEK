const Model = require("./model");
const MenuModel = require("../Menus/model");
const { socket } = require("../../socket");

const saveOrder = (data) => {
    const { clientId, menuId, complete, mesa, items, date, total } = data;

    const menu = new Model({
        clientId: clientId,
        menuId,
        complete,
        mesa: Number(mesa),
        items,
        total,
        date,
    });

    socket.io.emit(clientId, "Nueva orden!");
    return menu.save();
};

const getOrders = (params) => {
    let query = {};
    if (params.hasOwnProperty("id")) {
        query.id = params.id;
    }
    if (params.hasOwnProperty("complete")) {
        query.complete = params.complete;
    }
    if (params.hasOwnProperty("mesa")) {
        query.mesa = params.mesa;
    }

    return new Promise((resolve, reject) => {
        Model.find(query)
            .populate("items.productId")
            .exec((err, populated) => {
                if (err) reject(err);
                resolve(populated);
            });
    });
};

const completeOrder = (id) => {
    return Model.findOneAndUpdate({ _id: id }, { complete: true });
};

module.exports = {
    saveOrder,
    getOrders,
    completeOrder,
};
