// /api/send-email.js - Ultra minimal version
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
    // Log the email
    console.log(`New waitlist signup: ${email} at ${new Date().toISOString()}`);
    
    // Return success
    return res.status(200).json({ 
      message: "Thanks! You're on the waitlist. We'll be in touch soon!" 
    });
    
  } catch (error) {
    console.error("Error processing email:", error);
    return res.status(500).json({ 
      message: "Something went wrong. Please try again." 
    });
  }
}