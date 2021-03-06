const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
});

const model = new mongoose.model("clients", schema);
module.exports = model;
