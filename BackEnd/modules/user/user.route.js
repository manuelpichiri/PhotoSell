const express = require("express");
const user = express.Router();
const userController = require("./user.controller");

user.get("/users", userController.findAll);
user.get("/user/:{id}", userController.findOne);

user.post("/user", userController.createUser);

user.delete("/user/:{id}", userController.deleteById);

user.patch("/user/:{id}", userController.updateUserById);

module.exports = user;
