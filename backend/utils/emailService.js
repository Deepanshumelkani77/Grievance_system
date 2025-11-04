import nodemailer from "nodemailer";

// Debug: Log environment variables (remove after testing)
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✓ Loaded" : "✗ Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Loaded" : "✗ Missing");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: "deepumelkani123@gmail.com",
    pass: "nafr fujq gmfv fpcp",
  },
});

// Send email to admin when new complaint is submitted
export const sendComplaintNotificationToAdmin = async (complaint, adminEmail, adminName) => {
  const mailOptions = {
    from: "deepumelkani123@gmail.com",
    to: adminEmail,
    subject: `New Complaint Submitted - ${complaint.type.toUpperCase()}`,
    html: `
      <h2>New Complaint Notification</h2>
      <p>Dear ${adminName},</p>
      <p>A new complaint has been submitted and assigned to you.</p>
      
      <h3>Complaint Details:</h3>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Type:</strong> ${complaint.type}</p>
      <p><strong>Description:</strong> ${complaint.description}</p>
      <p><strong>Submitted by:</strong> ${complaint.createdBy.name} (${complaint.createdBy.email})</p>
      <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
      
      <p>Please log in to the BIAS Grievance Portal to review and take action.</p>
      
      <p>Best regards,<br>BIAS Grievance System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin:", adminEmail);
  } catch (error) {
    console.error("Error sending email to admin:", error);
  }
};

// Send email to user when complaint is accepted
export const sendComplaintAcceptedEmail = async (complaint, userEmail, userName) => {
  const mailOptions = {
    from: "deepumelkani123@gmail.com",
    to: userEmail,
    subject: "Your Complaint Has Been Accepted",
    html: `
      <h2>Complaint Accepted</h2>
      <p>Dear ${userName},</p>
      <p>Your complaint has been accepted and is being reviewed.</p>
      
      <h3>Complaint Details:</h3>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Status:</strong> <span style="color: green;">Accepted</span></p>
      <p><strong>Submitted on:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
      
      <p>We will keep you updated on the progress.</p>
      
      <p>Best regards,<br>BIAS Grievance System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Acceptance email sent to user:", userEmail);
  } catch (error) {
    console.error("Error sending acceptance email:", error);
  }
};

// Send email to user when complaint is rejected
export const sendComplaintRejectedEmail = async (complaint, userEmail, userName, reason) => {
  const mailOptions = {
    from: "deepumelkani123@gmail.com",
    to: userEmail,
    subject: "Your Complaint Has Been Rejected",
    html: `
      <h2>Complaint Rejected</h2>
      <p>Dear ${userName},</p>
      <p>We regret to inform you that your complaint has been rejected.</p>
      
      <h3>Complaint Details:</h3>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Status:</strong> <span style="color: red;">Rejected</span></p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
      <p><strong>Submitted on:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
      
      <p>If you believe this decision was made in error, please contact the administration.</p>
      
      <p>Best regards,<br>BIAS Grievance System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Rejection email sent to user:", userEmail);
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};

// Send email to user when complaint is resolved
export const sendComplaintResolvedEmail = async (complaint, userEmail, userName, actionTaken) => {
  const mailOptions = {
    from: "deepumelkani123@gmail.com",
    to: userEmail,
    subject: "Your Complaint Has Been Resolved",
    html: `
      <h2>Complaint Resolved</h2>
      <p>Dear ${userName},</p>
      <p>Your complaint has been successfully resolved.</p>
      
      <h3>Complaint Details:</h3>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Status:</strong> <span style="color: purple;">Resolved</span></p>
      ${actionTaken ? `<p><strong>Action Taken:</strong> ${actionTaken}</p>` : ""}
      <p><strong>Submitted on:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
      <p><strong>Resolved on:</strong> ${new Date().toLocaleDateString()}</p>
      
      <p>Thank you for bringing this matter to our attention.</p>
      
      <p>Best regards,<br>BIAS Grievance System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Resolution email sent to user:", userEmail);
  } catch (error) {
    console.error("Error sending resolution email:", error);
  }
};