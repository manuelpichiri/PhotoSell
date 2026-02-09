const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { user } = req;
    const redirectUrl = `${process.env.FE_URL}/sucess?user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const manageOauthCallback = async (req, res, next) => {
  try {
    const { user } = req;

    const token = jwt.sign(user, process.env.JWT_SECRET);
    const redirectUrl = `${process.env.FE_URL}/sucess?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  manageOauthCallback,
};
