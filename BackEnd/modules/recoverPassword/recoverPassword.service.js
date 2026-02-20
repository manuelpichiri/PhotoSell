const JWT = require("jsonwebtoken");
const userSchema = require("../user/user.schema");
const userNotFound = require("../../exceptions/notFoundException");
const EmailService = require("../mail/mail.service");
const notFoundException = require("../../exceptions/notFoundException");

const emails = new EmailService();

const recoverPassword = async (body) => {
  const { email } = body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return;
  }

  const token = JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5m" },
  );
  const link = `${process.env.FE_URL}/reset-password?token=${token}`;
  await emails.send(
    user.email,
    "Recover password",
    `<p>Click Here for recevore your password:</p> <a href="${link}">${link}</a>`,
  );
};

const resetPassword = async (body) => {
  const { token, password } = body;

  let decoded;
  try {
    decoded = JWT.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const e = new Error("Token is not valid");
    e.statusCode = 400;
    throw e;
  }

  const user = await userSchema.findById(decoded.id);
  if (!user) throw new notFoundException("User not found");

  user.password = password;
  await user.save();
};

module.exports = {
  recoverPassword,
  resetPassword,
};
