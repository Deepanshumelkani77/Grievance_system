const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("=".repeat(50));
console.log("📧 Email Configuration Test");
console.log("=".repeat(50));

// Check if environment variables are set
console.log("\n1. Checking Environment Variables...");
console.log("   EMAIL_USER:", process.env.EMAIL_USER || "❌ NOT SET");
console.log("   EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ SET (hidden)" : "❌ NOT SET");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log("\n❌ ERROR: Email credentials not configured!");
  console.log("\nPlease set these in your .env file:");
  console.log("EMAIL_USER=your_email@gmail.com");
  console.log("EMAIL_PASS=your_app_password");
  console.log("\nSee TEST_EMAIL.md for setup instructions.");
  process.exit(1);
}

// Create transporter (using port 465 for Render compatibility)
console.log("\n2. Creating email transporter...");
console.log("   Host: smtp.gmail.com");
console.log("   Port: 465 (SSL)");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

// Test email sending
console.log("\n3. Sending test email...");
console.log("   From:", process.env.EMAIL_USER);
console.log("   To:", process.env.EMAIL_USER, "(sending to yourself)");

const testEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "✅ Test Email - BIAS Grievance System",
      text: "If you receive this email, your email configuration is working correctly!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h1 style="color: #4CAF50;">✅ Email Test Successful!</h1>
            <p style="font-size: 16px; color: #333;">
              If you're reading this, your email configuration is working correctly!
            </p>
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2e7d32;">Configuration Details:</h3>
              <p style="margin: 5px 0;"><strong>Service:</strong> Gmail</p>
              <p style="margin: 5px 0;"><strong>From:</strong> ${process.env.EMAIL_USER}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> ✅ Working</p>
            </div>
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              <strong>Next Steps:</strong>
            </p>
            <ul style="font-size: 14px; color: #666;">
              <li>Deploy these changes to Render</li>
              <li>Set EMAIL_USER and EMAIL_PASS on Render environment variables</li>
              <li>Test by submitting a complaint</li>
            </ul>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">
              BIAS Grievance Management System
            </p>
          </div>
        </div>
      `,
    });

    console.log("\n" + "=".repeat(50));
    console.log("✅ SUCCESS! Email sent successfully!");
    console.log("=".repeat(50));
    console.log("\nMessage ID:", info.messageId);
    console.log("\n📬 Check your inbox:", process.env.EMAIL_USER);
    console.log("   (Also check SPAM folder if not in inbox)");
    console.log("\n" + "=".repeat(50));
    console.log("✅ Email configuration is working correctly!");
    console.log("=".repeat(50));
    console.log("\nYou can now:");
    console.log("1. Deploy to Render");
    console.log("2. Set environment variables on Render");
    console.log("3. Test complaint submission");
    
  } catch (error) {
    console.log("\n" + "=".repeat(50));
    console.log("❌ ERROR: Email sending failed!");
    console.log("=".repeat(50));
    console.log("\nError Message:", error.message);
    console.log("\nCommon Issues:");
    console.log("1. Invalid Gmail credentials");
    console.log("   → Make sure you're using App Password (not regular password)");
    console.log("   → Enable 2FA on Gmail first");
    console.log("\n2. Wrong App Password");
    console.log("   → Generate new app password at: https://myaccount.google.com/apppasswords");
    console.log("   → Copy it exactly (remove spaces)");
    console.log("\n3. Less secure app access");
    console.log("   → Don't use regular password, use App Password");
    console.log("\nSee TEST_EMAIL.md for detailed setup instructions.");
    console.log("=".repeat(50));
  }
};

testEmail();
