const authService = require("./auth.service");

const login = async (req, res, next) => {
  try {
    const { token } = await authService.login(req.body);
    res.status(200).send({
      statusCode: 200,
      message: "login successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
