const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: "clients" },
    menuId: { type: Schema.Types.ObjectId, ref: "menus" },
    complete: Boolean,
    mesa: String,
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "products" },
            cantidad: Number,
        },
    ],
    total: Number,
});

const model = new mongoose.model("orders", schema);
module.exports = model;
