import sequelize from "../config/database.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Attendance from "../models/Attendance.js";
import Payroll from "../models/Payroll.js";
import Performance from "../models/Performance.js";

// Define associations
User.hasOne(Employee, { foreignKey: "userId", onDelete: "CASCADE" });
Employee.belongsTo(User, { foreignKey: "userId" });

Department.hasMany(Employee, {
  foreignKey: "departmentId",
  onDelete: "SET NULL",
});
Employee.belongsTo(Department, { foreignKey: "departmentId" });

Department.belongsTo(Employee, {
  foreignKey: "headId",
  as: "head",
  onDelete: "SET NULL",
});
Employee.hasMany(Department, {
  foreignKey: "headId",
  as: "departmentsHeaded",
  onDelete: "SET NULL",
});

Employee.hasMany(Attendance, { foreignKey: "employeeId", onDelete: "CASCADE" });
Attendance.belongsTo(Employee, { foreignKey: "employeeId" });

Employee.hasMany(Payroll, { foreignKey: "employeeId", onDelete: "CASCADE" });
Payroll.belongsTo(Employee, { foreignKey: "employeeId" });

Employee.hasMany(Performance, {
  foreignKey: "employeeId",
  as: "reviews",
  onDelete: "CASCADE",
});
Performance.belongsTo(Employee, { foreignKey: "employeeId", as: "Employee" });

Employee.hasMany(Performance, {
  foreignKey: "reviewerId",
  as: "reviewsGiven",
  onDelete: "CASCADE",
});
Performance.belongsTo(Employee, { foreignKey: "reviewerId", as: "Reviewer" });

export const initializeDatabase = async () => {
  try {
    console.log("🔄 Synchronizing database...");
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✅ Database synchronized successfully");
  } catch (error) {
    console.error("❌ Error synchronizing database:", error);
    throw error;
  }
};

export default initializeDatabase;
