const recoverPasswordService = require("./recoverPassword.service");

const recoverPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;
    const refreshPassword = await recoverPasswordService.recoverPassword({
      email,
    });
    res.status(200).send({
      statusCode: 200,
      message: "la mail è stata inviata all'utente",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const resetPasswordUser = async (req, res) => {
  try {
    await recoverPasswordService.resetPassword(req.body);

    res.status(200).send({
      statusCode: 200,
      message: "Password is update ",
    });
  } catch (error) {
    res.status(error.statusCode || 400).send({
      statusCode: error.statusCode || 400,
      message: error.message || "Errore reset password",
    });
  }
};

module.exports = {
  recoverPasswordUser,
  resetPasswordUser,
};
