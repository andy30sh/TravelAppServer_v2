const { createTestAccount } = require("nodemailer");

const mailac = 
{
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
        user: 'youremail@gmail.com',     // your gmail account (full email address)
        pass: 'yourpassword'          // your gmail password
    }
};

module.exports = mailac;

// Gmail has restriction use SMTP, follow the link below to enable email forward
// https://support.google.com/mail/answer/7126229?p=BadCredentials&visit_id=637704325906016733-1125411983&rd=2#cantsignin&zippy=%2Ci-cant-sign-in-to-my-email-client%2Cstep-check-that-imap-is-turned-on