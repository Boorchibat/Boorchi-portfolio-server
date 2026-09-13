const transporter = require("../../mailer");

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required",
      });
    }

    await transporter.sendMail({
      from: "boorchi@boorchi.com",
      to: "boorchi@boorchi.com",
      replyTo: email,
      subject: subject || "New contact form message",
      text: `From: ${name} <${email}>

Email: ${email}

Message:
${message}`,
    });

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
};

module.exports = {
  sendContactEmail,
};