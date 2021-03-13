"use strict"

const express = require("express");
const productController = require("../controllers/product.controller")

var authentication = require("../middlewares/authenticated");

var user = express.Router();
user.post("/createProduct", authentication.ensureAuth, productController.createProduct);
user.post("/editProduct", authentication.ensureAuth, productController.editProduct);
user.post("/deleteProduct", authentication.ensureAuth, productController.deleteProduct);


module.exports = user;