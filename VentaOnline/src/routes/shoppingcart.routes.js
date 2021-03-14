"use strict"

const express = require("express");
const shoppingCartController = require("../controllers/shoppingcart.controller")
const authenticated = require("../middlewares/authenticated")

var user = express.Router()
user.post("/addproduct/:idUser", authenticated.ensureAuth, shoppingCartController.addProduct);
user.post("/allproductsadded/:idUser", authenticated.ensureAuth, shoppingCartController.allProductsAdded);
user.post("/editproductadded/:idUser/:idShoppingCart", authenticated.ensureAuth, shoppingCartController.editProductAdded);
user.post("/deleteproductadded/:idUser/:idShoppingCart", authenticated.ensureAuth, shoppingCartController.deleteProductAdded);

module.exports = user;