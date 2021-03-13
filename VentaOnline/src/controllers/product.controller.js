"use strict"

const User = require("../models/user.model");
const Category = require("../models/category.model")
const Product = require("../models/product.model")

function createProduct(req, res){
    var productModel = Product();
    var params = req.body;

    if (req.user.rol === "ROL_ADMIN"){
        productModel.producto = params.producto;
        productModel.stock = params.stock;
        productModel.precio = params.precio;
        productModel.ventas = 0;
        productModel.categoria = params.categoria;
        productModel.save((err,saveProduct)=>{
            if (err) return res.status(500).send({mesaje: "Error en la petición"});
            if(saveProduct){
                return res.status(200).send({mesaje: "El producto se creo con exito"})
            }else{
                return res.status(500).send({mesaje: "No se logro guardar el producto"});
            }
        })
    }else{
        return res.status(500).send({mesaje: "No posees los permisos necesarios"});
    }
}

function editProduct(req, res){
    var idProduct = req.body.idProduct
    var params = req.body

    if (req.user.rol === "ROL_ADMIN"){
        Product.findByIdAndUpdate(idProduct, params, {new:true}, (err, updateProduct)=>{
            if(err) return res.status(500).send({mesaje: "Error en la petición al actualizar"});
            if(!updateProduct) return res.status(500).send({mesaje: "No se pudo actualizar la empresa"});
            return res.status(200).send({updateProduct});
        })
    }else{
        return res.status(500).send({mesaje: "No posees los permisos necesarios"});
    }
}

function deleteProduct(req, res){
    if (req.user.rol === "ROL_ADMIN"){
        //
    }else{
        return res.status(500).send({mesaje: "No posees los permisos necesarios"});
    }
}

module.exports={
    createProduct,
    editProduct,
    deleteProduct
}