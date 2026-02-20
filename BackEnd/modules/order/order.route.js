const express = require("express");
const order = express.Router();
const orderController = require("./order.controller");

order.get("/order", orderController.findAllOrders);
order.get("/order/:id", orderController.findOrderById);

order.post("/order", orderController.createOrder);

order.delete("/order/:id", orderController.deleteOrderById);

order.patch("/order/:id", orderController.updateOrderById);

module.exports = order;
