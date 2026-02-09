class PasswordUpdateException extends Error {
  constructor(message = "Password is the same") {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = PasswordUpdateException;
