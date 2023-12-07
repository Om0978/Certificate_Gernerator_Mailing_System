const nodemailer = require("nodemailer");

exports.sendEmail = async (userName, userEmail, fileName, pdfBuffer) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omgarg450@gmail.com",
      pass: "jeas flcs ccub tsfo",
    },
  });

  const mailOptions = {
    from: "omgarg450@gmail.com",
    to: userEmail,
    subject: "Tree Donation Certificate",
    text: `Thanks! ${userName} for Donating money for trees plantions Please found below your donation certificate`,
    attachments:[
        {
            filename:fileName,
            content:pdfBuffer,
            encoding:"base64"
        }
    ]
  };

  await transporter.sendMail(mailOptions);
};
