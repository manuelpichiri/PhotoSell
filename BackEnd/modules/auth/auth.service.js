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
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return { token };
};

module.exports = { login };
