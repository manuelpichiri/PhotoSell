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

  if (!firstName || typeof firstName !== "string") {
    errors.push("First name must be a valid string");
  }

  if (!lastName || typeof lastName !== "string") {
    errors.push("Last name must be a valid string");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Email must be valid");
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    errors.push("Password must contain at least 8 characters");
  }

  if (dateOfBirth && isNaN(new Date(dateOfBirth))) {
    errors.push("Date must be valid");
  }

  if (role && !allRoles.includes(role)) {
    errors.push("Invalid role");
  }

  if (isCompany !== undefined && typeof isCompany !== "boolean") {
    errors.push("isCompany must be a boolean");
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  if (photo && !/^[0-9a-fA-F]{24}$/.test(photo)) {
    errors.push("Photo must be a valid MongoDB ObjectId");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
module.exports = validateUserBody;
