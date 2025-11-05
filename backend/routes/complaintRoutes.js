const express = require("express");
const {
  submitComplaint,
  getMyComplaints,
  getAssignedComplaints,
  getAllComplaints,
  updateComplaintStatus,
  rejectComplaint,
  acceptComplaint,
  resolveComplaint,
  escalateComplaint,
  getAllLogs,
  getComplaintLogs,
} = require("../controller/complaintController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes - require authentication
router.post("/submit", authenticate, submitComplaint);
router.get("/my-complaints", authenticate, getMyComplaints);
router.get("/assigned", authenticate, authorize("hod", "registrar", "warden"), getAssignedComplaints);
router.get("/all", authenticate, authorize("director"), getAllComplaints);
router.put("/:complaintId/status", authenticate, updateComplaintStatus);
router.put("/:complaintId/reject", authenticate, authorize("hod", "registrar", "warden"), rejectComplaint);
router.put("/:complaintId/accept", authenticate, authorize("hod", "registrar", "warden"), acceptComplaint);
router.put("/:complaintId/resolve", authenticate, authorize("hod", "registrar", "warden", "director"), resolveComplaint);
router.put("/:complaintId/escalate", authenticate, authorize("hod", "registrar", "warden"), escalateComplaint);

// Complaint logs routes
router.get("/logs/all", authenticate, authorize("director"), getAllLogs);
router.get("/:complaintId/logs", authenticate, getComplaintLogs);

module.exports = router;
