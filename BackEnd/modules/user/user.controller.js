const userService = require("./user.service");

const findAll = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (users.lenght === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No user found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request",
    });
  }
};
const createUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await userService.createUser(body);
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request createUser",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request deleteUserById",
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await userService.updateUser(id, body);
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request updateUserById",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getSingleUser(id);
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request updateUserById",
    });
  }
};

const uploadFile = async (req, res, next) => {
  try {
    const img = req.file.path;

    res.status(200).json({ img: img });
  } catch (error) {
    next(e);
  }
};

const uploadFileOnCloudByIdUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const img = req.file.path;
    const post = await userService.updateUser(id, { photo: img });

    res.status(200).send({
      statusCode: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  createUser,
  deleteById,
  updateUserById,
  findOne,
  uploadFileOnCloudByIdUser,
  uploadFile,
};
