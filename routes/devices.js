const express = require("express");
const {
  createDeviceReport,
  getDeviceReports,
  getDeviceReportById,
  updateDeviceReport,
  deleteDeviceReport,
} = require("../controllers/deviceController");

const router = express.Router();

// POST /api/devices/report - Create new device report
router.post("/report", createDeviceReport);

// GET /api/devices/reports - Get all device reports (with pagination and filtering)
router.get("/reports", getDeviceReports);

// GET /api/devices/reports/:id - Get specific device report
router.get("/reports/:id", getDeviceReportById);


const auth = require("../middleware/auth");
// PUT /api/devices/reports/:id - Update device report (admin only)
router.put("/reports/:id", auth, updateDeviceReport);

// DELETE /api/devices/reports/:id - Delete device report (admin only)
router.delete("/reports/:id", auth, deleteDeviceReport);

module.exports = router;
