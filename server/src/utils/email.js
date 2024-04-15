const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //define email options
  const mailOptions = {
    from: "S4 Scheduling <S4Schedules@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
