// /api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,     // e.g., info@huntorca.com
      pass: process.env.EMAIL_PASS      // App password (not your regular email password)
    },
  });

  try {
    await transporter.sendMail({
      from: `"HuntOrca Bot" <${process.env.EMAIL_USER}>`,
      to: "info@huntorca.com",
      subject: "New Waitlist Signup",
      text: `Email collected: ${email}`,
    });

    res.status(200).json({ message: "Thanks! You're on the waitlist." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email." });
  }
}
