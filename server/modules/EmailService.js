require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: "testmailby",
    pass: "haha123HAHA!"
  }
});

module.exports = transporter;


