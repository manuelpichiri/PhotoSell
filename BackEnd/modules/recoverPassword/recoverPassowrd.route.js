const express = require("express");
const recoverPassword = express.Router();
const recoverPasswordController = require("./recoverPassword.controller");

recoverPassword.post(
  "/recover-password",
  recoverPasswordController.recoverPasswordUser,
);
recoverPassword.post(
  "/reset-password",
  recoverPasswordController.resetPasswordUser,
);

module.exports = recoverPassword;
