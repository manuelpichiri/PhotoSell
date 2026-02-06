const HttpException = require("../../exceptions/index");
const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
    });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      statusCode: 400,
      message: "Mongoose Error: object ID is invalid or malformed",
      error: err.error,
    });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(err.statusCode ?? 400).json({
      statusCode: err.statusCode ?? 400,
      message:
        "Mongoose: one of more passed or required props failed the validation",
      errors: err.errors,
    });
  }
  if (err instanceof mongoose.Error.MongooseServerSelectionError) {
    return res.status(503).json({
      statusCode: 503,
      message: "Unable to connect to mongoDB",
      error: err.error,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: "An error ha occurred, plase try again or contact the developer",
  });
};

module.exports = errorHandler;
