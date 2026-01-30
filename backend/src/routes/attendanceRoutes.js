import express from "express";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get attendance records
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { employeeId, startDate, endDate, page = 1, limit = 20 } = req.query;

    const where = {};
    if (employeeId) where.employeeId = employeeId;

    if (startDate && endDate) {
      where.date = {
        [require("sequelize").Op.between]: [
          new Date(startDate),
          new Date(endDate),
        ],
      };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Attendance.findAndCountAll({
      where,
      include: [{ model: Employee, attributes: ["id", "name"] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["date", "DESC"]],
    });

    res.json({
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      records: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single attendance record
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create attendance record (HR/Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const { employeeId, date, status, checkInTime, checkOutTime, remarks } =
        req.body;

      const attendance = await Attendance.create({
        employeeId,
        date,
        status,
        checkInTime,
        checkOutTime,
        remarks,
      });

      res.status(201).json({
        message: "Attendance record created",
        attendance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update attendance record
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const attendance = await Attendance.findByPk(req.params.id);

      if (!attendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }

      await attendance.update(req.body);

      res.json({
        message: "Attendance record updated",
        attendance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Delete attendance record
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const attendance = await Attendance.findByPk(req.params.id);

      if (!attendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }

      await attendance.destroy();

      res.json({ message: "Attendance record deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
