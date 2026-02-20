const express = require("express");
const startServer = require("./config/db");
const session = require("express-session");
const cors = require("cors");

const passport = require("passport");
const port = 4545;
const server = express();

//routes import
const orderRoutes = require("./modules/order/order.route");
const paymentRoutes = require("./modules/payment/payment.route");
const userRoute = require("./modules/user/user.route");
const photoRoute = require("./modules/photo/photo.route");
const authRoute = require("./modules/auth/auth.route");
const recoverPasswordRoute = require("./modules/recoverPassword/recoverPassowrd.route");
const oauthGoogleRoute = require("./modules/oauthGoogle/oautGoogle.route");
const {
  initGooglePassport,
} = require("./modules/oauthGoogle/oauthGoogle.config");
//middlewares imports
const errorHandler = require("./middlewares/errorHandler/errorHandler");

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
//middlewares
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

//passport
server.use(passport.initialize());
server.use(passport.session());
initGooglePassport();

//route
server.use("/", orderRoutes);
server.use("/", paymentRoutes);
server.use("/", oauthGoogleRoute);
server.use("/", recoverPasswordRoute);
server.use("/", authRoute);
server.use("/", userRoute);
server.use("/", photoRoute);

server.use(errorHandler);
startServer(port, server);
