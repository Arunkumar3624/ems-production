import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Performance = sequelize.define(
  "Performance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    period: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: false,
    },
    technicalSkills: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0,
    },
    communication: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0,
    },
    teamwork: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0,
    },
    leadership: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    goals: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    improvementAreas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "submitted", "approved", "closed"),
      defaultValue: "draft",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "performance",
  },
);

export default Performance;
