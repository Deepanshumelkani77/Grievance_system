const sgMail = require("@sendgrid/mail");

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Verified sender email
const FROM_EMAIL = process.env.EMAIL_SENDER || "noreply@biasgrievance.com";

/**
 * Send email to admin when new complaint is submitted
 */
const sendComplaintNotificationToAdmin = async (complaint, adminEmail, adminName) => {
  console.log("📧 Sending email notification to admin...");
  console.log("   To:", adminEmail);
  console.log("   Admin:", adminName);
  console.log("   Complaint:", complaint.title);

  const msg = {
    to: adminEmail,
    from: FROM_EMAIL,
    subject: `New Complaint Submitted - ${complaint.type.toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Complaint Notification</h2>
        <p>Dear ${adminName},</p>
        <p>A new complaint has been submitted and assigned to you.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Complaint Details:</h3>
          <p><strong>Title:</strong> ${complaint.title}</p>
          <p><strong>Type:</strong> ${complaint.type.toUpperCase()}</p>
          <p><strong>Description:</strong> ${complaint.description}</p>
          <p><strong>Submitted by:</strong> ${complaint.createdBy.name} (${complaint.createdBy.email})</p>
          <p><strong>Department:</strong> ${complaint.createdBy.department || 'N/A'}</p>
          <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
        </div>
        
        <p>Please log in to the BIAS Grievance Portal to review and take action.</p>
        
        <p style="margin-top: 30px; color: #6b7280;">
          Best regards,<br>
          <strong>BIAS Grievance System</strong>
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully!");
    console.log("   To:", adminEmail);
  } catch (error) {
    console.error("❌ Failed to send email to admin:", adminEmail);
    console.error("   Error:", error.response?.body || error.message);
    throw error;
  }
};

/**
 * Send email to user when complaint is accepted
 */
const sendComplaintAcceptedEmail = async (complaint, userEmail, userName) => {
  console.log("📧 Sending acceptance email...");
  console.log("   To:", userEmail);

  const msg = {
    to: userEmail,
    from: FROM_EMAIL,
    subject: "Your Complaint Has Been Accepted",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">✅ Complaint Accepted</h2>
        <p>Dear ${userName},</p>
        <p>Good news! Your complaint has been accepted and is now being processed.</p>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="margin-top: 0; color: #15803d;">Complaint Details:</h3>
          <p><strong>Title:</strong> ${complaint.title}</p>
          <p><strong>Type:</strong> ${complaint.type.toUpperCase()}</p>
          <p><strong>Status:</strong> <span style="color: #16a34a;">ACCEPTED</span></p>
          <p><strong>Date Accepted:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>Your complaint is being reviewed and action will be taken shortly.</p>
        <p>You can log in to the portal to track the progress of your complaint.</p>
        
        <p style="margin-top: 30px; color: #6b7280;">
          Best regards,<br>
          <strong>BIAS Grievance System</strong>
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Acceptance email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Failed to send acceptance email:", error.response?.body || error.message);
    throw error;
  }
};

/**
 * Send email to user when complaint is rejected
 */
const sendComplaintRejectedEmail = async (complaint, userEmail, userName, reason) => {
  console.log("📧 Sending rejection email...");
  console.log("   To:", userEmail);

  const msg = {
    to: userEmail,
    from: FROM_EMAIL,
    subject: "Your Complaint Has Been Rejected",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Complaint Rejected</h2>
        <p>Dear ${userName},</p>
        <p>We regret to inform you that your complaint has been reviewed and rejected.</p>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="margin-top: 0; color: #991b1b;">Complaint Details:</h3>
          <p><strong>Title:</strong> ${complaint.title}</p>
          <p><strong>Type:</strong> ${complaint.type.toUpperCase()}</p>
          <p><strong>Status:</strong> <span style="color: #dc2626;">REJECTED</span></p>
          <p><strong>Date Rejected:</strong> ${new Date().toLocaleDateString()}</p>
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        </div>
        
        <p>If you believe this decision was made in error or have additional information, please contact the administration office.</p>
        
        <p style="margin-top: 30px; color: #6b7280;">
          Best regards,<br>
          <strong>BIAS Grievance System</strong>
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Rejection email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Failed to send rejection email:", error.response?.body || error.message);
    throw error;
  }
};

/**
 * Send email to user when complaint is resolved/completed
 */
const sendComplaintResolvedEmail = async (complaint, userEmail, userName, response) => {
  console.log("📧 Sending resolution email...");
  console.log("   To:", userEmail);

  const msg = {
    to: userEmail,
    from: FROM_EMAIL,
    subject: "Your Complaint Has Been Resolved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">✅ Complaint Resolved</h2>
        <p>Dear ${userName},</p>
        <p>Great news! Your complaint has been successfully resolved.</p>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="margin-top: 0; color: #15803d;">Complaint Details:</h3>
          <p><strong>Title:</strong> ${complaint.title}</p>
          <p><strong>Type:</strong> ${complaint.type.toUpperCase()}</p>
          <p><strong>Status:</strong> <span style="color: #16a34a;">COMPLETED</span></p>
          <p><strong>Date Resolved:</strong> ${new Date().toLocaleDateString()}</p>
          ${response ? `<p><strong>Resolution:</strong> ${response}</p>` : ''}
        </div>
        
        <p>Thank you for bringing this matter to our attention. We hope the resolution is satisfactory.</p>
        <p>You can log in to the portal to view the complete details and resolution.</p>
        
        <p style="margin-top: 30px; color: #6b7280;">
          Best regards,<br>
          <strong>BIAS Grievance System</strong>
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Resolution email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Failed to send resolution email:", error.response?.body || error.message);
    throw error;
  }
};

/**
 * Send email to Director when complaint is escalated
 */
const sendComplaintEscalatedToDirectorEmail = async (complaint, directorEmail, directorName, escalatedBy) => {
  console.log("📧 Sending escalation email to Director...");
  console.log("   To:", directorEmail);

  const msg = {
    to: directorEmail,
    from: FROM_EMAIL,
    subject: "⚠️ Escalated Complaint - Requires Your Attention",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ea580c;">⚠️ Complaint Escalated to You</h2>
        <p>Dear ${directorName},</p>
        <p>A complaint has been escalated to your attention and requires immediate review.</p>
        
        <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c;">
          <h3 style="margin-top: 0; color: #c2410c;">Complaint Details:</h3>
          <p><strong>Title:</strong> ${complaint.title}</p>
          <p><strong>Type:</strong> ${complaint.type.toUpperCase()}</p>
          <p><strong>Description:</strong> ${complaint.description}</p>
          <p><strong>Status:</strong> <span style="color: #ea580c;">ESCALATED</span></p>
          <p><strong>Submitted by:</strong> ${complaint.createdBy.name} (${complaint.createdBy.email})</p>
          <p><strong>Department:</strong> ${complaint.createdBy.department || 'N/A'}</p>
          <p><strong>Escalated by:</strong> ${escalatedBy}</p>
          <p><strong>Escalation Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p style="color: #c2410c; font-weight: bold;">⚠️ This complaint requires your immediate attention and decision.</p>
        <p>Please log in to the BIAS Grievance Portal to review and take action.</p>
        
        <p style="margin-top: 30px; color: #6b7280;">
          Best regards,<br>
          <strong>BIAS Grievance System</strong>
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Escalation email sent to Director:", directorEmail);
  } catch (error) {
    console.error("❌ Failed to send escalation email:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = {
  sendComplaintNotificationToAdmin,
  sendComplaintAcceptedEmail,
  sendComplaintRejectedEmail,
  sendComplaintResolvedEmail,
  sendComplaintEscalatedToDirectorEmail,
};
