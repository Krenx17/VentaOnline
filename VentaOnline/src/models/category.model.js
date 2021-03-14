const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = Schema({
    categoria: String
})

module.exports = mongoose.model("categories", CategorySchema)