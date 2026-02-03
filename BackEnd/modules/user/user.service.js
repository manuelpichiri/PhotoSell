const userSchema = require("./user.schema");
const bcrypt = require("bcrypt");

const createUser = async (body) => {
  const saltRounds = 15;
  const newUser = new userSchema({
    ...body,
    password: await bcrypt.hash(body.password, saltRounds),
  });

  const savedUser = await newUser.save();
  return savedUser;
};

const getUsers = async () => {
  const users = await userSchema.find();
  return {
    statusCode: 200,
    users,
  };
};

const getSingleUser = async (id) => {
  const user = await userSchema.findById(id);
  return {
    statusCode: 200,
    user,
  };
};

const updateUser = async (id, body) => {
  const user = await userSchema.findByIdAndUpdate(id, body, { new: true });
  return {
    statusCode: 200,
    user,
  };
};

const deleteUser = async (id) => {
  const user = await userSchema.findByIdAndDelete(id);

  return {
    statusCode: 200,
    user,
  };
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
