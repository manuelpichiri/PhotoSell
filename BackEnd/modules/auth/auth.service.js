const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userSchema = require("../user/user.schema");

const userNotFound = require("../../exceptions/notFoundException");
const invalidPassword = require("../../exceptions/validationException");

const login = async (body) => {
  const { email, password } = body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    throw new userNotFound("User not found");
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    throw new invalidPassword("password is invalid");
  }
  const token = JWT.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return { token };
};

module.exports = { login };
