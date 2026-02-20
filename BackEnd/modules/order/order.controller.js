const orderService = require("./order.service");

const findAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    if (!orders || orders.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No order found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      orders,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request findAllOrders",
    });
  }
};

const findOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getSingleOrder(id);
    if (!order) {
      return res.status(404).send({
        statusCode: 404,
        message: "Order not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      order,
    });
  } catch (error) {
    res.status(500).send({
      error,
      statusCode: 500,
      message: "an error during the request findOrderById",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, delivery } = req.body;
    const order = await orderService.createOrder({
      user: userId,
      items,
      delivery,
    });

    res.status(200).send({
      statusCode: 200,
      order,
    });
  } catch (error) {
    res.status(500).send({
      error,
      statusCode: 500,
      message: "an error during the request createOrder",
    });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const order = await orderService.updateOrder(id, body);
    res.status(200).send({
      statusCode: 200,
      order,
    });
  } catch (error) {
    res.status(500).send({
      error,
      statusCode: 500,
      message: "an error during the request updateOrder",
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.deleteOrder(id);
    res.status(200).send({
      statusCode: 200,
      order,
    });
  } catch (error) {
    res.status(500).send({
      error,
      statusCode: 500,
      message: "an error during the request deleteOrder",
    });
  }
};

module.exports = {
  deleteOrderById,
  updateOrderById,
  createOrder,
  findOrderById,
  findAllOrders,
};
