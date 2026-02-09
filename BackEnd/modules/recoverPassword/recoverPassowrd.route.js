const express = require("express");
const recoverPassword = express.Router();
const recoverPasswordController = require("./recoverPassword.controller");

recoverPassword.post(
  "/recover-password",
  recoverPasswordController.recoverPasswordUser,
);

module.exports = recoverPassword;
