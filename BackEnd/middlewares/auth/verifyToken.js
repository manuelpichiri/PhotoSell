const JWT = require("jsonwebtoken");
const invalidOrMissingToken = require("../../exceptions/invalidOrMissingToken");
const excludedRoutes = [
  "/auth/login",
  "/google",
  "/google/callback",
  "/user",
  "/photos",
];

const verifyToken = (req, res, next) => {
  if (excludedRoutes.includes(req.path)) {
    return next();
  }
  const token = req.header("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    throw new invalidOrMissingToken();
  }
  try {
    const sanitizeToken = token.replace("Bearer ", "");
    const decodedToken = JWT.verify(sanitizeToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = verifyToken;
