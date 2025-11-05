const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("=".repeat(60));
console.log("📧 SENDGRID EMAIL CONFIGURATION TEST (Render-Compatible)");
console.log("=".repeat(60));

// Check SendGrid API Key
console.log("\n1. Checking SendGrid Configuration...");
console.log("   SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "✅ SET (hidden)" : "❌ NOT SET");
console.log("   EMAIL_USER (for 'from' field):", process.env.EMAIL_USER || "❌ NOT SET");

if (!process.env.SENDGRID_API_KEY) {
  console.log("\n❌ ERROR: SendGrid API Key not configured!");
  console.log("\n📝 Setup Instructions:");
  console.log("1. Go to https://app.sendgrid.com/");
  console.log("2. Sign up for free account (100 emails/day)");
  console.log("3. Navigate to: Settings > API Keys");
  console.log("4. Create API Key with 'Mail Send' permissions");
  console.log("5. Copy the API key");
  console.log("\n6. Add to your .env file:");
  console.log("   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx");
  console.log("   EMAIL_USER=your-verified-sender@example.com");
  console.log("\n⚠️  IMPORTANT: You must verify sender email in SendGrid!");
  console.log("   Settings > Sender Authentication > Single Sender Verification");
  process.exit(1);
}

if (!process.env.EMAIL_USER) {
  console.log("\n⚠️  WARNING: EMAIL_USER not set. Using default sender.");
  console.log("   Set EMAIL_USER to your verified SendGrid sender email");
}

// Create SendGrid transporter (exact same as emailService.js)
console.log("\n2. Creating SendGrid transporter...");
console.log("   Host: smtp.sendgrid.net");
console.log("   Port: 587 (TLS)");
console.log("   Auth User: apikey (literal string)");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // This is literal "apikey", don't change
    pass: process.env.SENDGRID_API_KEY,
  },
});

// Test email sending
console.log("\n3. Sending test email via SendGrid...");

const testEmail = async () => {
  const fromEmail = process.env.EMAIL_USER || "noreply@biasgrievance.com";
  const toEmail = process.env.TEST_EMAIL || process.env.EMAIL_USER || "test@example.com";
  
  console.log("   From:", fromEmail);
  console.log("   To:", toEmail);
  console.log("   Note: 'From' email MUST be verified in SendGrid!");

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: "✅ SendGrid Test - BIAS Grievance System",
      text: "If you receive this email, your SendGrid configuration is working correctly!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #4CAF50; margin-top: 0;">✅ SendGrid Test Successful!</h1>
            <p style="font-size: 16px; color: #333;">
              If you're reading this, your SendGrid email configuration is working correctly!
            </p>
            
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2e7d32;">✅ Configuration Verified:</h3>
              <p style="margin: 5px 0;"><strong>Service:</strong> SendGrid SMTP</p>
              <p style="margin: 5px 0;"><strong>Host:</strong> smtp.sendgrid.net</p>
              <p style="margin: 5px 0;"><strong>Port:</strong> 587 (TLS)</p>
              <p style="margin: 5px 0;"><strong>From:</strong> ${fromEmail}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> ✅ Working on Render</p>
            </div>

            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #856404;">📌 Why SendGrid?</h4>
              <ul style="margin: 10px 0; padding-left: 20px; color: #856404;">
                <li>Gmail SMTP (port 465/587) is blocked on Render free tier</li>
                <li>SendGrid provides 100 free emails/day</li>
                <li>Works perfectly on Render and all cloud platforms</li>
                <li>No port blocking issues</li>
              </ul>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #333;">🚀 Next Steps for Render Deployment:</h4>
              <ol style="margin: 10px 0; padding-left: 20px; color: #555; line-height: 1.8;">
                <li>Go to your Render dashboard</li>
                <li>Select your backend service</li>
                <li>Navigate to <strong>Environment</strong> tab</li>
                <li>Add these environment variables:
                  <ul style="margin-top: 10px;">
                    <li><code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">SENDGRID_API_KEY</code> = Your SendGrid API key</li>
                    <li><code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">EMAIL_USER</code> = Your verified sender email</li>
                  </ul>
                </li>
                <li>Save and redeploy</li>
                <li>Test by submitting a complaint</li>
              </ol>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
              BIAS Grievance Management System<br>
              Powered by SendGrid
            </p>
          </div>
        </div>
      `,
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ SUCCESS! SendGrid email sent successfully!");
    console.log("=".repeat(60));
    console.log("\n📧 Email Details:");
    console.log("   Message ID:", info.messageId);
    console.log("   Accepted:", info.accepted);
    console.log("   Response:", info.response);
    
    console.log("\n📬 Check your inbox:", toEmail);
    console.log("   (Also check SPAM folder if not in inbox)");
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ SENDGRID CONFIGURATION IS WORKING!");
    console.log("=".repeat(60));
    
    console.log("\n🎉 Your backend is ready for Render deployment!");
    console.log("\n📝 Deployment Checklist:");
    console.log("   ✅ SendGrid configured and tested");
    console.log("   ✅ emailService.js using SendGrid");
    console.log("   ⏳ Set environment variables on Render:");
    console.log("      - SENDGRID_API_KEY");
    console.log("      - EMAIL_USER (verified sender)");
    console.log("      - MONGO_URI");
    console.log("      - JWT_SECRET");
    console.log("      - PORT (optional, Render sets automatically)");
    
  } catch (error) {
    console.log("\n" + "=".repeat(60));
    console.log("❌ ERROR: SendGrid email sending failed!");
    console.log("=".repeat(60));
    console.log("\n🔍 Error Details:");
    console.log("   Message:", error.message);
    
    if (error.message.includes("authentication")) {
      console.log("\n❌ AUTHENTICATION FAILED");
      console.log("\nCommon Causes:");
      console.log("1. Invalid SendGrid API Key");
      console.log("   → Check your API key is correct");
      console.log("   → Regenerate if needed: https://app.sendgrid.com/settings/api_keys");
      console.log("\n2. API Key doesn't have Mail Send permission");
      console.log("   → Create new key with 'Mail Send' permission");
    }
    
    if (error.message.includes("from") || error.message.includes("sender")) {
      console.log("\n❌ SENDER EMAIL NOT VERIFIED");
      console.log("\nSolution:");
      console.log("1. Go to: https://app.sendgrid.com/settings/sender_auth/senders");
      console.log("2. Click 'Verify Single Sender'");
      console.log("3. Add your email and verify it");
      console.log("4. Use the verified email as EMAIL_USER in .env");
    }
    
    console.log("\n📚 SendGrid Setup Guide:");
    console.log("1. Create account: https://signup.sendgrid.com/");
    console.log("2. Verify sender: Settings > Sender Authentication");
    console.log("3. Create API Key: Settings > API Keys");
    console.log("4. Copy key to .env as SENDGRID_API_KEY");
    console.log("=".repeat(60));
    
    console.log("\n💡 Tip: Make sure sender email is verified in SendGrid!");
  }
};

testEmail();
