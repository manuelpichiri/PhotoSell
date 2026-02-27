const userService = require("./user.service");
const EmailService = require("../mail/mail.service");
const bcrypt = require("bcrypt");
const passwordException = require("../../exceptions/passwordUpdateException");
const email = new EmailService();

const findAll = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (users.length === 0) {
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
    await email.send(user.email, "Test prova nodemailer", "Welcome on board");
    return res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error.message,
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
      message: "an error during the request findone",
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
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({ image: req.file.path });
  } catch (error) {
    console.log(error.message);
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
