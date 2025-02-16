const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

class Email {
  constructor(user) {
    this.user = user;
    this.from = "shivamrawat06994@gmail.com";
    this.username = user.username;
    this.sendTo = user.email;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendOTP(OTP) {
    const html = pug.renderFile(`${__dirname}/../views/email.pug`, {
      firstName: this.username,
      OTP,
      subject: "Verify OTP",
    });
    const mailOptions = {
      from: this.from,
      to: this.sendTo,
      subject: "Verify OTP",
      html,
      text: convert(html),
    };
    await this.newTransport().sendMail(mailOptions);
  }
}

module.exports = Email;
