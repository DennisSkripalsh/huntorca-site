// /api/send-email.js - Simple version without nodemailer
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  try {
    // Log the email (you can replace this with your preferred method)
    console.log(`New waitlist signup: ${email}`);
    
    // You could also:
    // - Save to a database
    // - Send to a webhook service like Zapier
    // - Use a service like EmailJS, Formspree, or Netlify Forms
    // - Save to a simple JSON file or CSV
    
    // For now, just return success
    res.status(200).json({ 
      message: "Thanks! You're on the waitlist. We'll be in touch soon!" 
    });
    
  } catch (error) {
    console.error("Error processing email:", error);
    res.status(500).json({ 
      message: "Something went wrong. Please try again." 
    });
  }
}