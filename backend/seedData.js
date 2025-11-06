const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");

    // Clear existing admin users (optional - comment out if you don't want to clear)
    await User.deleteMany({ role: { $in: ["director", "hod", "registrar", "chief_hostel_warden"] } });

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin users
    const adminUsers = [
      {
        name: "Director",
        email: "heymayank69@gmail.com",
        password: hashedPassword,
        role: "director",
        department: "Administration",
      },
      {
        name: "HOD Computer Science",
        email: "hustlewithdev77@gmail.com",
        password: hashedPassword,
        role: "hod",
        department: "Computer Science",
      },
      {
        name: "HOD Mechanical",
        email: "hod.mech@college.edu",
        password: hashedPassword,
        role: "hod",
        department: "Mechanical",
      },
      {
        name: "Registrar",
        email: "registrar@college.edu",
        password: hashedPassword,
        role: "registrar",
        department: "Administration",
      },
      {
        name: "Chief Hostel Warden",
        email: "chief.hostel.warden@college.edu",
        password: hashedPassword,
        role: "chief_hostel_warden",
        department: "Hostel",
      },
    ];

    await User.insertMany(adminUsers);

    console.log("✅ Seed data inserted successfully!");
    console.log("\n📋 Admin Users Created:");
    console.log("=".repeat(50));
    adminUsers.forEach((user) => {
      console.log(`Role: ${user.role.toUpperCase()}`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: admin123`);
      console.log("-".repeat(50));
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
