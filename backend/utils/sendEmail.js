const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async ({ to, subject, text }) => {
  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: "MUTES <postmaster@" + process.env.MAILGUN_DOMAIN + ">",
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
