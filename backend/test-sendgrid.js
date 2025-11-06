require("dotenv").config();
const sgMail = require("@sendgrid/mail");

console.log("=".repeat(60));
console.log("📧 TESTING SENDGRID EMAIL SERVICE");
console.log("=".repeat(60));

const testSendGrid = async () => {
  try {
    // Check environment variables
    console.log("\n1. Checking Environment Variables...");
    
    if (!process.env.SENDGRID_API_KEY) {
      console.log("❌ SENDGRID_API_KEY not found in .env file");
      console.log("\n🔧 Fix: Add this to your .env file:");
      console.log("   SENDGRID_API_KEY=SG.your_api_key_here");
      process.exit(1);
    }
    console.log("✅ SENDGRID_API_KEY is set");
    
    if (!process.env.EMAIL_SENDER) {
      console.log("❌ EMAIL_SENDER not found in .env file");
      console.log("\n🔧 Fix: Add this to your .env file:");
      console.log("   EMAIL_SENDER=your-verified-email@example.com");
      process.exit(1);
    }
    console.log("✅ EMAIL_SENDER is set:", process.env.EMAIL_SENDER);

    // Initialize SendGrid
    console.log("\n2. Initializing SendGrid...");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("✅ SendGrid initialized");

    // Send test email
    console.log("\n3. Sending test email...");
    const testEmail = process.env.TEST_EMAIL || process.env.EMAIL_SENDER;
    console.log(`   From: ${process.env.EMAIL_SENDER}`);
    console.log(`   To: ${testEmail}`);
    console.log("   Subject: Test Email from BIAS Grievance System");

    const msg = {
      to: testEmail,
      from: process.env.EMAIL_SENDER,
      subject: "✅ SendGrid Test - BIAS Grievance System",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎉 SendGrid Email Service is Working!</h2>
          <p>Congratulations! Your SendGrid email service has been successfully configured.</p>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="margin-top: 0; color: #15803d;">✅ Test Results:</h3>
            <p><strong>Status:</strong> SUCCESS</p>
            <p><strong>Service:</strong> SendGrid</p>
            <p><strong>Sender:</strong> ${process.env.EMAIL_SENDER}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>Your complaint management system is now ready to send email notifications!</p>
          
          <h3>Email Notifications Enabled:</h3>
          <ul>
            <li>✅ New complaint notifications to admins</li>
            <li>✅ Acceptance notifications to users</li>
            <li>✅ Rejection notifications to users</li>
            <li>✅ Resolution notifications to users</li>
            <li>✅ Escalation notifications to Director</li>
          </ul>
          
          <p style="margin-top: 30px; color: #6b7280;">
            Best regards,<br>
            <strong>BIAS Grievance System</strong>
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);

    console.log("\n" + "=".repeat(60));
    console.log("✅ EMAIL SENT SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n📧 Email Details:");
    console.log("   From:", process.env.EMAIL_SENDER);
    console.log("   To:", testEmail);
    console.log("\n✅ SendGrid email service is working perfectly!");
    console.log("\n📬 Check your inbox:", testEmail);
    console.log("   (Also check spam folder if not in inbox)");
    console.log("\n🎉 Your email service is ready for production!");
    console.log("=".repeat(60));

  } catch (error) {
    console.log("\n" + "=".repeat(60));
    console.log("❌ FAILED TO SEND EMAIL!");
    console.log("=".repeat(60));
    console.error("\n🔍 Error Details:");
    console.error("   Message:", error.message);
    
    if (error.response) {
      console.error("   Status Code:", error.response.statusCode);
      console.error("   Body:", JSON.stringify(error.response.body, null, 2));
    }

    console.log("\n🔧 Common Issues & Fixes:");
    
    if (error.message.includes("API key")) {
      console.log("\n1. Invalid API Key:");
      console.log("   - Go to: https://app.sendgrid.com/settings/api_keys");
      console.log("   - Create a new API key");
      console.log("   - Copy it to .env as: SENDGRID_API_KEY=SG.xxx");
    }
    
    if (error.message.includes("from address") || error.response?.body?.errors?.[0]?.message?.includes("from")) {
      console.log("\n2. Sender Email Not Verified:");
      console.log("   - Go to: https://app.sendgrid.com/settings/sender_auth");
      console.log("   - Click 'Verify a Single Sender'");
      console.log("   - Add your email and verify it");
      console.log("   - Update .env: EMAIL_SENDER=your-verified-email@example.com");
    }
    
    console.log("\n3. Check your .env file has:");
    console.log("   SENDGRID_API_KEY=SG.your_api_key");
    console.log("   EMAIL_SENDER=your-verified-email@example.com");
    
    process.exit(1);
  }
};

testSendGrid();
