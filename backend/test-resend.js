require("dotenv").config();
const { Resend } = require("resend");

console.log("=".repeat(60));
console.log("📧 TESTING RESEND EMAIL SERVICE");
console.log("=".repeat(60));

const testResend = async () => {
  try {
    // Check if API key is set
    console.log("\n1. Checking Resend API Key...");
    if (!process.env.RESEND_API_KEY) {
      console.log("❌ RESEND_API_KEY not found in .env file");
      console.log("\n🔧 Fix: Add this to your .env file:");
      console.log("   RESEND_API_KEY=re_your_api_key_here");
      process.exit(1);
    }
    console.log("✅ RESEND_API_KEY is set");

    // Initialize Resend
    console.log("\n2. Initializing Resend...");
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("✅ Resend initialized");

    // Send test email
    console.log("\n3. Sending test email...");
    const testEmail = process.env.TEST_EMAIL || "test@example.com";
    console.log(`   To: ${testEmail}`);
    console.log("   From: BIAS Grievance <onboarding@resend.dev>");

    const { data, error } = await resend.emails.send({
      from: "BIAS Grievance <onboarding@resend.dev>",
      to: testEmail,
      subject: "✅ Test Email from BIAS Grievance System",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎉 Resend Email Service is Working!</h2>
          <p>Congratulations! Your Resend email service has been successfully configured.</p>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="margin-top: 0; color: #15803d;">✅ Test Results:</h3>
            <p><strong>Status:</strong> SUCCESS</p>
            <p><strong>Service:</strong> Resend</p>
            <p><strong>Sender:</strong> BIAS Grievance System</p>
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
    });

    if (error) {
      console.log("\n❌ Failed to send email!");
      console.error("   Error:", error);
      
      if (error.message.includes("API key")) {
        console.log("\n🔧 Fix: Check your RESEND_API_KEY is correct");
        console.log("   1. Go to https://resend.com/api-keys");
        console.log("   2. Copy your API key");
        console.log("   3. Update .env file: RESEND_API_KEY=your_key");
      }
      
      process.exit(1);
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ EMAIL SENT SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n📧 Email Details:");
    console.log("   Message ID:", data.id);
    console.log("   To:", testEmail);
    console.log("\n✅ Resend email service is working perfectly!");
    console.log("\n📬 Check your inbox:", testEmail);
    console.log("   (Also check spam folder if not in inbox)");
    console.log("\n🎉 Your email service is ready for production!");
    console.log("=".repeat(60));

  } catch (error) {
    console.log("\n❌ Error:", error.message);
    console.error(error);
  }
};

testResend();
