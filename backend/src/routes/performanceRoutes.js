import express from "express";
import Performance from "../models/Performance.js";
import Employee from "../models/Employee.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get performance reviews
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { employeeId, period, status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (employeeId) where.employeeId = employeeId;
    if (period) where.period = period;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Performance.findAndCountAll({
      where,
      include: [
        { model: Employee, as: "Employee", attributes: ["id", "name"] },
        { model: Employee, as: "Reviewer", attributes: ["id", "name"] },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      reviews: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single performance review
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id, {
      include: [
        { model: Employee, as: "Employee", attributes: ["id", "name"] },
        { model: Employee, as: "Reviewer", attributes: ["id", "name"] },
      ],
    });

    if (!performance) {
      return res.status(404).json({ message: "Performance review not found" });
    }

    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create performance review (HR/Manager only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const {
        employeeId,
        reviewerId,
        period,
        rating,
        technicalSkills,
        communication,
        teamwork,
        leadership,
        review,
        goals,
        improvementAreas,
      } = req.body;

      const performance = await Performance.create({
        employeeId,
        reviewerId,
        period,
        rating,
        technicalSkills,
        communication,
        teamwork,
        leadership,
        review,
        goals,
        improvementAreas,
      });

      res.status(201).json({
        message: "Performance review created",
        performance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update performance review
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "hr"),
  async (req, res) => {
    try {
      const performance = await Performance.findByPk(req.params.id);

      if (!performance) {
        return res
          .status(404)
          .json({ message: "Performance review not found" });
      }

      await performance.update(req.body);

      res.json({
        message: "Performance review updated",
        performance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Delete performance review
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const performance = await Performance.findByPk(req.params.id);

      if (!performance) {
        return res
          .status(404)
          .json({ message: "Performance review not found" });
      }

      await performance.destroy();

      res.json({ message: "Performance review deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
