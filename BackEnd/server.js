require("dotenv").config();
const express = require("express");
const startServer = require("./config/db");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

const port = 4545;
const server = express();

// routes
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

const errorHandler = require("./middlewares/errorHandler/errorHandler");

server.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://photo-sell-eight.vercel.app",
      "https://photo-sell-hf09op2m9-manuels-projects-686a304a.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
server.options("*", cors());

server.use((req, res, next) => {
  console.log("REQ:", req.method, req.path, "AUTH:", req.headers.authorization);
  next();
});

server.use(express.json());

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

server.use(passport.initialize());
server.use(passport.session());
initGooglePassport();

server.use("/", authRoute); // login deve stare comunque escluso nel middleware
server.use("/", oauthGoogleRoute);
server.use("/", recoverPasswordRoute);

server.use("/", userRoute);
server.use("/", photoRoute);
server.use("/", orderRoutes);
server.use("/", paymentRoutes);

server.use(errorHandler);

startServer(port, server);
