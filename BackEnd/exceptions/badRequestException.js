class badRequestException extends Error {
  constructor(message = "Something is wrong in the body ") {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = badRequestException;
