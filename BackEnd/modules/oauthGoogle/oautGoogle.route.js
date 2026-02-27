const express = require("express");
const oauth = express.Router();
const passport = require("passport");
const oauthGoogleController = require("./oautGoogle.controller");

oauth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

oauth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  oauthGoogleController.manageOauthCallback,
);

module.exports = oauth;
