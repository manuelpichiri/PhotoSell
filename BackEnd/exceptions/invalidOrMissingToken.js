class invalidOrMissingToken extends Error {
  constructor(message = "invalid Token") {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = invalidOrMissingToken;
