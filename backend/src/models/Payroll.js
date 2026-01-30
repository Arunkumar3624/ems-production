import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payroll = sequelize.define(
  "Payroll",
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
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baseSalary: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    allowances: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    bonus: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    deductions: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    netSalary: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("draft", "pending", "approved", "paid", "cancelled"),
      defaultValue: "draft",
    },
    paidDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "payroll",
    indexes: [{ fields: ["employeeId", "month", "year"] }],
  },
);

export default Payroll;
