const userSchema = require("./user.schema");

const createUser = async (body) => {
  const newUser = new userSchema(body);

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

const findOrCreateGoogleUser = async (googleUser) => {
  if (!googleUser.email) throw new Error("Missing email from Google");

  let user = await userSchema.findOne({ email: googleUser.email });

  if (!user) {
    user = await userSchema.create({
      ...googleUser,
      provider: "google",
    });
  }

  return user;
};

const getSingleUser = async (id) => {
  const user = await userSchema.findById(id).populate("photo");
  return user;
};

const updateUser = async (id, body) => {
  const user = await userSchema.findByIdAndUpdate(
    id,
    body,

    { new: true },
  );

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
  findOrCreateGoogleUser,
};
