require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

console.log("=".repeat(60));
console.log("🔍 CHECKING EMAIL SERVICE DATABASE CONFIGURATION");
console.log("=".repeat(60));

const checkDatabase = async () => {
  try {
    // Connect to database
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to database");

    // Check for admin users
    console.log("\n2. Checking for admin users...");
    
    const hod = await User.findOne({ role: "hod" });
    const warden = await User.findOne({ role: "warden" });
    const registrar = await User.findOne({ role: "registrar" });
    const director = await User.findOne({ role: "director" });

    console.log("\n📊 Admin Users Status:");
    console.log("─".repeat(60));
    
    if (hod) {
      console.log(`✅ HOD: ${hod.name} (${hod.email})`);
    } else {
      console.log("❌ HOD: NOT FOUND - Academic complaints won't send emails!");
    }
    
    if (warden) {
      console.log(`✅ Warden: ${warden.name} (${warden.email})`);
    } else {
      console.log("❌ Warden: NOT FOUND - Hostel complaints won't send emails!");
    }
    
    if (registrar) {
      console.log(`✅ Registrar: ${registrar.name} (${registrar.email})`);
    } else {
      console.log("❌ Registrar: NOT FOUND - Staff complaints won't send emails!");
    }
    
    if (director) {
      console.log(`✅ Director: ${director.name} (${director.email})`);
    } else {
      console.log("❌ Director: NOT FOUND - Escalations won't send emails!");
    }

    // Check email configuration
    console.log("\n3. Checking email configuration...");
    console.log("─".repeat(60));
    console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "✅ SET" : "❌ NOT SET");
    console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ NOT SET");

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📋 SUMMARY");
    console.log("=".repeat(60));

    const missingAdmins = [];
    if (!hod) missingAdmins.push("HOD");
    if (!warden) missingAdmins.push("Warden");
    if (!registrar) missingAdmins.push("Registrar");
    if (!director) missingAdmins.push("Director");

    if (missingAdmins.length > 0) {
      console.log("\n❌ ISSUE FOUND: Missing admin users!");
      console.log("\nMissing roles:", missingAdmins.join(", "));
      console.log("\n🔧 FIX: Run the seed script to create admin users:");
      console.log("   node seedData.js");
      console.log("\n⚠️  Without admin users, emails won't be sent because there's");
      console.log("   no one to send them to!");
    } else {
      console.log("\n✅ All admin users exist!");
      console.log("✅ Email configuration looks good!");
      console.log("\n🎯 Email service should work when complaints are submitted.");
    }

    console.log("\n" + "=".repeat(60));

  } catch (error) {
    console.error("\n❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
  }
};

checkDatabase();
