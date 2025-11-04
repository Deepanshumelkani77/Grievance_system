const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "teacher", "worker", "hod", "warden", "registrar", "director"],
    required: true
  },
  department: String,
});

module.exports = mongoose.model("User", userSchema);
