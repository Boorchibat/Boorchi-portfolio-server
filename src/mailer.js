const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "boorchi@boorchi.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
