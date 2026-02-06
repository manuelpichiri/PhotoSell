const validatePhotoBody = (req, res, next) => {
  const errors = [];

  const { category, title, user } = req.body;

  if (typeof category !== "string") {
    errors.push("category must be a string");
  }
  if (typeof title !== "string") {
    errors.push("title must be a string");
  }
  if (user && !/^[0-9a-fA-F]{24}$/.test(user)) {
    errors.push("user must be a valid mongodb object Id");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
  } else {
    next();
  }
};

module.exports = validatePhotoBody;
