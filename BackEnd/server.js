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

//middlewares imports

//middlewares

//route

server.use("/", userRoute);

startServer(port, server);
