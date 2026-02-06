const express = require("express");
const auth = express.Router();
const auhtController = require("./auth.controller");

auth.post("/auth/login", auhtController.login);

module.exports = auth;
