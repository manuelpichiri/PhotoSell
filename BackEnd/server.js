const express = require("express");
const startServer = require("./config/db");
const cors = require("cors");
const port = 4545;
const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

//routes import
const userRoute = require("./modules/user/user.route");
const photoRoute = require("./modules/photo/photo.route");
const authRoute = require("./modules/auth/auth.route");
const recoverPasswordRoute = require("./modules/recoverPassword/recoverPassowrd.route");
const oauthGoogleRoute = require("./modules/oauthGoogle/oautGoogle.route");
//middlewares imports
const errorHandler = require("./middlewares/errorHandler/errorHandler");
//middlewares

//route
server.use("/", oauthGoogleRoute);
server.use("/", recoverPasswordRoute);
server.use("/", authRoute);
server.use("/", userRoute);
server.use("/", photoRoute);

server.use(errorHandler);
startServer(port, server);
