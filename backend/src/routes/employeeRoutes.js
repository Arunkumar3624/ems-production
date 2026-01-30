import express from "express";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import User from "../models/User.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { validateEmployee } from "../middleware/validation.js";

const router = express.Router();

// Get all employees
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, departmentId, status } = req.query;

    const where = {};
    if (departmentId) where.departmentId = departmentId;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Employee.findAndCountAll({
      where,
      include: [
        { model: Department, attributes: ["id", "name"] },
        { model: User, attributes: ["id", "email"], as: "User" },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      employees: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single employee
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [{ model: Department, attributes: ["id", "name"] }],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create employee (HR/Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  validateEmployee,
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        departmentId,
        designation,
        joiningDate,
        salary,
        address,
        city,
        state,
        zipCode,
        emergencyContact,
        emergencyPhone,
      } = req.body;

      // Create user first
      const user = await User.create({
        email,
        password: "TempPassword123!", // Should be changed on first login
        role: "employee",
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" "),
      });

      // Create employee
      const employee = await Employee.create({
        userId: user.id,
        name,
        email,
        phone,
        departmentId,
        designation,
        joiningDate,
        salary,
        address,
        city,
        state,
        zipCode,
        emergencyContact,
        emergencyPhone,
      });

      res.status(201).json({
        message: "Employee created successfully",
        employee,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update employee (HR/Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      await employee.update(req.body);

      res.json({
        message: "Employee updated successfully",
        employee,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Delete employee (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      await employee.destroy();

      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
