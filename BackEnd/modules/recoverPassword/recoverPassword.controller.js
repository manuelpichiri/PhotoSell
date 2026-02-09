const recoverPasswordService = require("./recoverPassword.service");

const recoverPasswordUser = async (req, res) => {
  try {
    const body = req.body;
    const refreshPassword = await recoverPasswordService.recoverPassword(body);
    res.status(200).send({
      statusCode: 200,
      message: "la mail è stata inviata all'utente",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request refreshPassword",
    });
  }
};

module.exports = {
  recoverPasswordUser,
};
