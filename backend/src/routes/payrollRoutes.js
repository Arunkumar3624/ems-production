import express from "express";
import Payroll from "../models/Payroll.js";
import Employee from "../models/Employee.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get payroll records
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { employeeId, month, year, status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (employeeId) where.employeeId = employeeId;
    if (month) where.month = month;
    if (year) where.year = year;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Payroll.findAndCountAll({
      where,
      include: [{ model: Employee, attributes: ["id", "name"] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ["year", "DESC"],
        ["month", "DESC"],
      ],
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

// Get single payroll record
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const payroll = await Payroll.findByPk(req.params.id, {
      include: [{ model: Employee, attributes: ["id", "name", "designation"] }],
    });

    if (!payroll) {
      return res.status(404).json({ message: "Payroll record not found" });
    }

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create payroll record (HR/Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const {
        employeeId,
        month,
        year,
        baseSalary,
        allowances,
        bonus,
        deductions,
        tax,
      } = req.body;

      const netSalary = baseSalary + allowances + bonus - deductions - tax;

      const payroll = await Payroll.create({
        employeeId,
        month,
        year,
        baseSalary,
        allowances,
        bonus,
        deductions,
        tax,
        netSalary,
      });

      res.status(201).json({
        message: "Payroll record created",
        payroll,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update payroll record
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const payroll = await Payroll.findByPk(req.params.id);

      if (!payroll) {
        return res.status(404).json({ message: "Payroll record not found" });
      }

      // Recalculate net salary if components change
      if (
        req.body.baseSalary ||
        req.body.allowances ||
        req.body.bonus ||
        req.body.deductions ||
        req.body.tax
      ) {
        const baseSalary = req.body.baseSalary || payroll.baseSalary;
        const allowances = req.body.allowances || payroll.allowances;
        const bonus = req.body.bonus || payroll.bonus;
        const deductions = req.body.deductions || payroll.deductions;
        const tax = req.body.tax || payroll.tax;

        req.body.netSalary = baseSalary + allowances + bonus - deductions - tax;
      }

      await payroll.update(req.body);

      res.json({
        message: "Payroll record updated",
        payroll,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Delete payroll record
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const payroll = await Payroll.findByPk(req.params.id);

      if (!payroll) {
        return res.status(404).json({ message: "Payroll record not found" });
      }

      await payroll.destroy();

      res.json({ message: "Payroll record deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
