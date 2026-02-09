const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  tranporter;
  tranporterOptions = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "carrie82@ethereal.email",
      pass: "GPyVmAhqzu7WHm7UY8",
    },
  };

  constructor() {
    this.tranporter = nodemailer.createTransport(this.tranporterOptions);
  }
  async send(to, subject, message) {
    try {
      const emailOption = {
        from: "noreply@manuel.com",
        to,
        subject,
        html: message,
      };
      this.tranporter.sendMail(emailOption);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = EmailService;
