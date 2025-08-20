import nodemailer from "nodemailer";

// This function sends an email using nodemailer
const sendEmail = async (email, subject, text) => {
  try {
    // Create a transporter object to connect to the email service (Gmail here)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create a more professional HTML email format
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

    // Send the email with the given details
    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text, // Plain text version
      html: htmlContent, // HTML version for professional look
    });

    // Log success message if email is sent
    console.log("Email sent successfully!");
  } catch (error) {
    // Log error message if email sending fails
    console.error("Email not sent", error);
  }
};

// Export the sendEmail function so you can use it in other files
export default sendEmail;
