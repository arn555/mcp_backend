const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "arnzkie909@gmail.com",
    pass: "svungmyhlpgcoboz", 
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: {
      name: 'Web Wizard',
      address: 'arnzkie909@gmail.com',
    },
    to: to || 'arnzkie909@gmail.com',
    subject: subject || "Default Subject",
    text: text || "This is the default email body.",
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
