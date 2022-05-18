const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    description: String,
    price: Number,
    img: String,
});

const model = new mongoose.model("products", schema);
module.exports = model;
