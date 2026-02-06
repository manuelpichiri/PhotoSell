const validateUserBody = (req, res, next) => {
  const errors = [];

  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    role,
    isCompany,
    isActive,
    photo,
  } = req.body;

  const allRoles = ["admin", "user", "company"];

  if (typeof firstName !== "string") {
    errors.push("First name must be a string");
  }
  if (typeof lastName !== "string") {
    errors.push("Last name must be a string");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("email must be valid");
  }
  if (typeof password !== "string" && password.length < 8) {
    errors.push("password must contain 8 characters");
  }
  if (dateOfBirth instanceof Date && !isNaN(dateOfBirth.valueOf())) {
    errors.push("Date must be valid");
  }
  if (typeof role !== "string") {
    errors.push("role must be a string");
  } else if (!allRoles.includes(role)) {
    errors.push("invalid role");
  }
  if (typeof isCompany !== "boolean") {
    errors.push("isCompany must be a boolean");
  }
  if (typeof isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }
  if (photo && !/^[0-9a-fA-F]{24}$/.test(photo)) {
    // controllo se lo user ha un id composto da 24 caratteri esadecimali
    errors.push("photo must me a valid mongodb objectID string");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
  } else {
    next();
  }
};

module.exports = validateUserBody;
