const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password' // Replace with your email password or app password
  }
});

// Function to send an email
const sendMail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Example usage
sendMail('recipient@example.com', 'Test Email', 'Hello! This is a test email from Node.js');

module.exports = sendMail;
