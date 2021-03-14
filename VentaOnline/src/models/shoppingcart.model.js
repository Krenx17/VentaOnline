const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoppingCartSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: "users"},
    producto: {type: Schema.Types.ObjectId, ref: "products"},
    cantidad: Number,
    estado: String
})

module.exports = mongoose.model("shoppingcarts", ShoppingCartSchema)