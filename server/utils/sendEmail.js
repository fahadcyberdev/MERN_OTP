import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #333;">${subject}</h2>
        <p style="font-size: 16px; color: #555;">
          ${text}
        </p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 14px; color: #888;">
          If you did not request this, please ignore this email.<br>
          <strong>Thank you,<br>Auth System By Fahad Hosen</strong>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text, 
      html: htmlContent, 
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email not sent", error);
  }
};

export default sendEmail;
