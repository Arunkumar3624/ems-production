import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Attendance = sequelize.define(
  "Attendance",
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "present",
        "absent",
        "half_day",
        "sick_leave",
        "paid_leave",
        "unpaid_leave",
      ),
      defaultValue: "present",
    },
    checkInTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    checkOutTime: {
      type: DataTypes.TIME,
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
    tableName: "attendance",
    indexes: [{ fields: ["employeeId", "date"] }],
  },
);

export default Attendance;
