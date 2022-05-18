const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: "clients" },
    active: Boolean,
    title: String,
    description: String,
    cover: String,
    categories: [
        {
            title: String,
            products: [{ type: Schema.Types.ObjectId, ref: "products" }],
        },
    ],
});

const model = new mongoose.model("menus", schema);
module.exports = model;
