const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.HOST_SMTP,
  port: process.env.PORT_SMTP,
  auth: {
    user: process.env.USER_AUTH_SMTP,
    pass: process.env.PASSWORD_AUTH_SMTP,
  },
});

// await transporter.sendMail({
//     from: 'from_address@example.com',
//     to: 'to_address@example.com',
//     subject: 'Test Email Subject',
//     text: 'Example Plain Text Message Body'
// });

// await transporter.sendMail({
//     from: process.env.MAIL_USERNAME,
//     to: 'coba@gmail.com',
//     subject: 'Test email',
//     text: 'Coba email'
// })

module.exports = (email, subject, text) => {
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error", err);
      console.log("Email not send");
    } else {
      console.log("Successfylly send email");
      return "Successfully send email";
    }
  });
};
