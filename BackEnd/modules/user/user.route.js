const express = require("express");
const user = express.Router();
const userController = require("./user.controller");
const { cloudUpload } = require("../../middlewares/uploads/index");

user.get("/users", userController.findAll);
user.get("/user/:id", userController.findOne);

user.post("/user", userController.createUser);
user.post(
  "/user/cloud",
  cloudUpload.single("photo"),
  userController.uploadFile,
);

user.delete("/user/:id", userController.deleteById);

user.patch("/user/:id", userController.updateUserById);

user.patch(
  "/user/:id/photo",
  cloudUpload.single("photo"),
  userController.updateUserById,
);

module.exports = user;
