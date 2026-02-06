class notFoundException extends Error {
  constructor(message = "User/photo not found") {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = notFoundException;
