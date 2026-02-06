class validationException extends Error {
  constructor(message = "Email non valida e Password non valida") {
    super(message);
    this.statusCode = 422;
  }
}
module.exports = validationException;
