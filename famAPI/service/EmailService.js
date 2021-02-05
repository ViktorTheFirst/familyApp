const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
  sendgridTransport({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const sendConfirmationEmail = async (user) => {
  console.log('INSIDE sendConfirmationEmail - user: ', user);
  try {
    const url = `http://localhost:4000/api/v1/auth/verify/${user._id}`;
    const res = await transport.sendMail({
      from: 'familyspace@tutanota.com',
      to: `${user.email} `,
      subject: 'FamilySpace Confirmation Email',
      html: `Hello family member, this is a Confirmation Email from FamilySpace
      press the link to confirm your registration <a href= ${url}> Verify your account</a>`,
    });

    return res;
  } catch (err) {
    console.log('err inside sendConfirmationEmail', err);
  }
};

exports.sendConfirmationEmail = sendConfirmationEmail;
