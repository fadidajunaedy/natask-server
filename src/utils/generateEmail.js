const nodemailer = require("nodemailer");
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};
const emailResetPassword = async (user, resetPasswordToken) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Reset Your Password - Natask`,
      html: `
        <p>Hi ${user.name},</p>
        <p>We received a request to reset your password for your Natatask account. If you didn’t request this, please ignore this email.</p>
        <p>Click the link below to reset your password:</p>
        <br/>
        <a
          href="${process.env.CLIENT_URL}/auth/reset-password/${resetPasswordToken}"
          target="_blank">
            ${process.env.CLIENT_URL}/auth/reset-password/${resetPasswordToken}
        </a>
        <br/>
        <p>This link will expire in 30 minutes.</p>
        <br/>
        <p>Best,</p>
        <p>Natask</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send reset password email:", error);
  }
};

module.exports = { emailResetPassword };
