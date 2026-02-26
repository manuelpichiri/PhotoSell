const express = require("express");
const order = express.Router();
const orderController = require("./order.controller");
const verifyToken = require("../../middlewares/auth/verifyToken");
order.get("/order", orderController.findAllOrders);
order.get("/order/:id", orderController.findOrderById);
order.get("/order/user/:id", orderController.findOrderByIduser);

order.post("/order", verifyToken, orderController.createOrder);

order.delete("/order/:id", orderController.deleteOrderById);

order.patch("/order/:id", orderController.updateOrderById);

module.exports = order;
