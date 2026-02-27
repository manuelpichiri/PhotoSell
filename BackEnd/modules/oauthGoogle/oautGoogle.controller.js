const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { user } = req;
    const redirectUrl = `${process.env.FE_URL}?user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const manageOauthCallback = (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      return res.redirect(`${process.env.FE_URL}/login?oauth=nouser`);
    }

    const payload = {
      id: user._id?.toString?.() || user._id,
      email: user.email,
      role: user.role || "user",
      provider: user.provider || "google",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.redirect(
      `${process.env.FE_URL}/oauth-success?token=${encodeURIComponent(token)}`,
    );
  } catch (error) {
    console.error("OAUTH CALLBACK ERROR:", error);
    next(error);
  }
};

module.exports = {
  auth,
  manageOauthCallback,
};
