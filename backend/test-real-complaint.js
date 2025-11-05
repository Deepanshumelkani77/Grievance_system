require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Complaint = require("./models/complaint");
const { sendComplaintNotificationToAdmin } = require("./utils/emailService");

console.log("=".repeat(60));
console.log("🧪 TESTING REAL COMPLAINT SUBMISSION WITH EMAIL");
console.log("=".repeat(60));

const testComplaint = async () => {
  try {
    // Connect to database
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");

    // Find a student user (or create a test one)
    console.log("\n2. Finding test users...");
    let student = await User.findOne({ role: "student" });
    
    if (!student) {
      console.log("   Creating test student...");
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash("test123", 10);
      student = await User.create({
        name: "Test Student",
        email: "student.test@college.edu",
        password: hashedPassword,
        role: "student",
        department: "Computer Science"
      });
      console.log("   ✅ Test student created");
    } else {
      console.log("   ✅ Student found:", student.name);
    }

    // Find HOD
    const hod = await User.findOne({ role: "hod" });
    if (!hod) {
      console.log("\n❌ ERROR: No HOD found in database!");
      console.log("   Run: node seedData.js");
      process.exit(1);
    }
    console.log("   ✅ HOD found:", hod.name, "(" + hod.email + ")");

    // Create a test complaint
    console.log("\n3. Creating test complaint...");
    const testComplaint = new Complaint({
      title: "Test Email Service - Academic Issue",
      description: "This is a test complaint to verify email notifications work correctly.",
      type: "academic",
      createdBy: student._id,
      assignedTo: hod._id,
      status: "Pending",
    });

    await testComplaint.save();
    console.log("   ✅ Complaint created:", testComplaint._id);

    // Populate the complaint
    await testComplaint.populate("createdBy", "name email role department");
    await testComplaint.populate("assignedTo", "name email role");

    // Now send the email
    console.log("\n4. Sending email notification...");
    console.log("─".repeat(60));
    
    try {
      await sendComplaintNotificationToAdmin(
        testComplaint,
        testComplaint.assignedTo.email,
        testComplaint.assignedTo.name
      );
      
      console.log("\n" + "=".repeat(60));
      console.log("✅ EMAIL TEST SUCCESSFUL!");
      console.log("=".repeat(60));
      console.log("\n📧 Email should have been sent to:", hod.email);
      console.log("\n✅ Your email service is working!");
      console.log("\nNext steps:");
      console.log("1. Check the inbox of:", hod.email);
      console.log("2. Check spam folder if not in inbox");
      console.log("3. Try submitting a real complaint from your frontend");
      
    } catch (emailError) {
      console.log("\n" + "=".repeat(60));
      console.log("❌ EMAIL SENDING FAILED!");
      console.log("=".repeat(60));
      console.error("\nError:", emailError.message);
      console.error("\nFull error:", emailError);
      
      console.log("\n🔧 Troubleshooting:");
      console.log("1. Check SENDGRID_API_KEY is set correctly");
      console.log("2. Check EMAIL_USER is verified in SendGrid");
      console.log("3. Run: node test-sendgrid.js");
    }

    // Clean up test complaint
    console.log("\n5. Cleaning up test data...");
    await Complaint.findByIdAndDelete(testComplaint._id);
    console.log("   ✅ Test complaint deleted");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
    console.log("=".repeat(60));
  }
};

testComplaint();
