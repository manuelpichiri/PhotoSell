const JWT = require("jsonwebtoken");
const userSchema = require("../user/user.schema");
const userNotFound = require("../../exceptions/notFoundException");
const EmailService = require("../mail/mail.service");

const email = new EmailService();

const recoverPassword = async (body) => {
  const { email } = body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    throw new userNotFound("User not found");
  }

  const token = JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );
  await email.send(
    body.email,
    "Link per reindirizzamento",
    "Token recupero password",
  );
};

module.exports = {
  recoverPassword,
};
