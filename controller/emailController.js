const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, text, from } = req.body;

  const mailOptions = {
    from: from,
    to: to ,
    subject: subject ,
    text: text ,
    //If only needed
    // attachments: [
    //   {
    //     filename: '.pdf',
    //     path: path.join(__dirname, '../.pdf'),
    //     contentType: 'application/pdf'
    //   }
    // ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email has been sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
};

module.exports = {
  sendEmail
};
