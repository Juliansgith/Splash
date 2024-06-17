const transporter = require('./EmailService');

// Email options
const mailOptions = {
    from: 'testmailby@zohomail.eu',  // sender address
    to: 'julianjcooper2002@gmail.com',  // list of receivers
    subject: 'Hello from NodeMailer',  // Subject line
    text: 'This is a plain text email sent from Node.js using Nodemailer.',  // plain text body
    html: '<b>This is a plain text email sent from Node.js using Nodemailer.</b>'  // html body
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Email sent: ' + info.response);
});
