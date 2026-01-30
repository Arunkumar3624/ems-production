import express from "express";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import { validateDepartment } from "../middleware/validation.js";

const router = express.Router();

// Get all departments
router.get("/", authMiddleware, async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [
        {
          model: Employee,
          as: "head",
          attributes: ["id", "name"],
        },
      ],
      order: [["name", "ASC"]],
    });

    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get department with employees
router.get("/:id/employees", authMiddleware, async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const employees = await Employee.findAll({
      where: { departmentId: req.params.id },
    });

    res.json({
      department,
      employees,
      employeeCount: employees.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create department (Admin/HR only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  validateDepartment,
  async (req, res) => {
    try {
      const department = await Department.create(req.body);

      res.status(201).json({
        message: "Department created successfully",
        department,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update department (Admin/HR only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      await department.update(req.body);

      res.json({
        message: "Department updated successfully",
        department,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Delete department (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      await department.destroy();

      res.json({ message: "Department deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
