const nodemailer = require("nodemailer");
//hello
// Use SendGrid for Render compatibility (free tier blocks SMTP)
// SendGrid: Free 100 emails/day, works on Render
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // This is literal "apikey", don't change
    pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
  },
});

// Fallback to Gmail for local development (if SENDGRID_API_KEY not set)
// This won't work on Render free tier, but works locally
if (!process.env.SENDGRID_API_KEY && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  console.log("⚠️  Using Gmail (local dev only - won't work on Render free tier)");
  const gmailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Use Gmail transporter for local dev
  transporter.sendMail = gmailTransporter.sendMail.bind(gmailTransporter);
}

// Send email to admin when new complaint is submitted
const sendComplaintNotificationToAdmin = async (complaint, adminEmail, adminName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@biasgrievance.com",
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
const sendComplaintAcceptedEmail = async (complaint, userEmail, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@biasgrievance.com",
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
const sendComplaintRejectedEmail = async (complaint, userEmail, userName, reason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@biasgrievance.com",
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
const sendComplaintResolvedEmail = async (complaint, userEmail, userName, actionTaken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@biasgrievance.com",
    to: userEmail,
    subject: "Your Complaint Has Been Completed",
    html: `
      <h2>Complaint Completed</h2>
      <p>Dear ${userName},</p>
      <p>Your complaint has been successfully completed and resolved.</p>
      
      <h3>Complaint Details:</h3>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Status:</strong> <span style="color: green;">Completed</span></p>
      ${actionTaken ? `<p><strong>Action Taken:</strong> ${actionTaken}</p>` : ""}
      <p><strong>Submitted on:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
      <p><strong>Completed on:</strong> ${new Date().toLocaleDateString()}</p>
      
      <p>Thank you for bringing this matter to our attention.</p>
      
      <p>Best regards,<br>BIAS Grievance System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Completion email sent to user:", userEmail);
  } catch (error) {
    console.error("Error sending completion email:", error);
  }
};

// Send email to director when complaint is escalated
const sendComplaintEscalatedToDirectorEmail = async (complaint, directorEmail, directorName, escalatedBy) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@biasgrievance.com",
    to: directorEmail,
    subject: `Escalated Complaint - Requires Your Attention`,
    html: `
      <h2>Complaint Escalated to You</h2>
      <p>Dear ${directorName},</p>
      <p>A complaint has been escalated to you for review and resolution.</p>
      
      <h3>Complaint Details:</h3>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Type:</strong> ${complaint.type.toUpperCase()}</p>
      <p><strong>Description:</strong> ${complaint.description}</p>
      <p><strong>Status:</strong> <span style="color: orange;">Escalated</span></p>
      <p><strong>Escalated by:</strong> ${escalatedBy}</p>
      <p><strong>Original submitter:</strong> ${complaint.createdBy.name} (${complaint.createdBy.email})</p>
      <p><strong>Submitted on:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
      
      <p>This complaint requires your immediate attention. Please log in to the BIAS Grievance Portal to review and resolve it.</p>
      
      <p>Best regards,<br>BIAS Grievance System</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Escalation email sent to director:", directorEmail);
  } catch (error) {
    console.error("Error sending escalation email to director:", error);
  }
};

module.exports = {
  sendComplaintNotificationToAdmin,
  sendComplaintAcceptedEmail,
  sendComplaintRejectedEmail,
  sendComplaintResolvedEmail,
  sendComplaintEscalatedToDirectorEmail,
};