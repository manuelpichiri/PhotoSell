const express = require("express");
const user = express.Router();
const userController = require("./user.controller");
const { cloudUpload } = require("../../middlewares/uploads/index");
const validateUserBody = require("../../middlewares/user/validateBodyUser.js");

user.get("/users", userController.findAll);
user.get("/user/:id", userController.findOne);

user.post("/user", userController.createUser);
user.post(
  "/user/:id/cloud",
  cloudUpload.single("photo"),
  userController.uploadFileOnCloudByIdUser,
);
//recover password
//richiama il controller e il serivizio che: controlla che la mail esista se la mail esiste genera un token che vale 5 min
//invia la mail contentente il link con query string (all'interno il token) es https://miosito.com/recoverpassword?token=a213sdawdaw
user.delete("/user/:id", userController.deleteById);

user.patch("/user/:id", userController.updateUserById);

user.patch(
  "/user/:id/photo",
  cloudUpload.single("photo"),
  userController.updateUserById,
);

module.exports = user;

//utilizzare express validator
