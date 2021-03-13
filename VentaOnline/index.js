"use strict"

const mongoose = require("mongoose");
const app = require("./app");

const User = require("./src/models/user.model");
const Category = require("./src/models/category.model")
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ventasonline", {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    app.listen(3000,function (){
        var userModel = new User();
        var categoryModel = new Category();

        User.find({$or: [
            {usuario: "Admin"}
        ]}).exec((err, UsersFind)=>{
            if(err) console.log("Error en la petición");
            if (UsersFind && UsersFind.length>=1){
                console.log("Ya existe el usuario administrador");
            }else {
                userModel.usuario = "Admin";
                userModel.password = "123456"
                userModel.rol = "ROL_ADMIN";
                bcrypt.hash("123456", null, null, (err,encryptpass)=>{
                    userModel.password=encryptpass;
                    userModel.save((err,saveUser)=>{
                        if(saveUser){
                            console.log("El usuario admin a sido creado con exito")
                        }
                    })
                })
            }
        })
        Category.find({$or: [
            {categoria: "default"}
        ]}).exec((err, categoryFind)=>{
            if (err) return res.status(500).send({mesaje: "Error en la petición"})
            if (categoryFind && categoryFind.length>=1) {
                console.log("Ya existe una categoria default")
            }else{
                categoryModel.categoria = "default"
                categoryModel.save((err, saveCategory)=>{
                    if (err) return res.status(500).send({mesaje: "Error en la petición"})
                    if (!saveCategory) return res.status(500).send({mesaje: "No se a podido guardar la categoría"})
                    if (saveCategory){
                        console.log("Se a creado la categoría con exito")
                    }
                })
            }
        })
    })
}).catch(err=>console.log(err));