const orderSchema = require("./order.schema");
const photoSchema = require("../photo/photo.schema");
const userSchema = require("../user/user.schema");

const getOrders = async () => {
  const orders = await orderSchema
    .find()
    .populate("items", "image title")
    .populate("user", "firstName lastName email");
  return orders;
};

const getSingleOrder = async (id) => {
  const order = await orderSchema
    .findById(id)
    .populate("items", "image title")
    .populate("user", "firstName lastName email");

  return order;
};

const deleteOrder = async (id) => {
  const order = await orderSchema.findByIdAndDelete(id);
  return order;
};

const updateOrder = async (id, body) => {
  (delete body.total, delete body.items, delete body.user); // questa  è tutta roba che non deve arrivare al cliente, poiché potrebbe essere cambiata
  const order = await orderSchema.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const createOrder = async (body) => {
  const photoIds = body.items.map((i) => i.photoId);

  const photos = await photoSchema.find({
    _id: { $in: photoIds },
  });

  if (photos.length !== photoIds.length) {
    throw new Error("One or more photo not found");
  }

  const user = await userSchema.findById(body.user);
  if (!user) {
    throw new Error("User not found");
  }

  const photoMap = new Map(photos.map((p) => [String(p._id), p]));

  const total = body.items.reduce((sum, item) => {
    const photo = photoMap.get(String(item.photoId));
    if (!photo) throw new Error("Photo not found");
    return sum + photo.price * item.qty;
  }, 0);

  const order = new orderSchema({
    user: body.user,
    items: body.items,
    total,
    status: "pending",
    delivery: body.delivery || "digital",
  });

  return order.save();
};

const findOrderByUserId = async (id) => {
  const order = await orderSchema
    .find({ user: id })
    .populate("items", "image title")
    .populate("user", "firstName lastName email");
  return order;
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  getOrders,
  findOrderByUserId,
};
