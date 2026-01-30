import sequelize from "../config/database.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Attendance from "../models/Attendance.js";
import Payroll from "../models/Payroll.js";
import Performance from "../models/Performance.js";
import { initializeDatabase } from "./migrate.js";

const seedDatabase = async () => {
  try {
    // Initialize database (which sets up associations)
    await initializeDatabase();

    console.log("🌱 Seeding database...");

    // Clear existing data
    await Attendance.destroy({ where: {} });
    await Payroll.destroy({ where: {} });
    await Performance.destroy({ where: {} });
    await Employee.destroy({ where: {} });
    await Department.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create admin user
    const adminUser = await User.create({
      email: "admin@ems.com",
      password: "Admin@123",
      role: "admin",
      firstName: "Admin",
      lastName: "User",
    });

    // Create HR user
    const hrUser = await User.create({
      email: "hr@ems.com",
      password: "HR@123",
      role: "hr",
      firstName: "HR",
      lastName: "Manager",
    });

    // Create departments
    const deptIT = await Department.create({
      name: "Information Technology",
      description: "Software development and IT operations",
      budget: 500000,
    });

    const deptHR = await Department.create({
      name: "Human Resources",
      description: "HR and recruitment",
      budget: 200000,
    });

    const deptSales = await Department.create({
      name: "Sales",
      description: "Sales and business development",
      budget: 300000,
    });

    const deptFinance = await Department.create({
      name: "Finance",
      description: "Accounting and financial planning",
      budget: 250000,
    });

    // Create employees
    const employees = [];

    for (let i = 1; i <= 10; i++) {
      const user = await User.create({
        email: `employee${i}@ems.com`,
        password: "Employee@123",
        role: "employee",
        firstName: `Employee${i}`,
        lastName: "User",
      });

      const dept = [deptIT, deptHR, deptSales, deptFinance][
        Math.floor(Math.random() * 4)
      ];

      const employee = await Employee.create({
        userId: user.id,
        name: `Employee ${i}`,
        email: `employee${i}@ems.com`,
        phone: `+1-555-${String(1000 + i).padStart(4, "0")}`,
        departmentId: dept.id,
        designation: [
          "Senior Developer",
          "Junior Developer",
          "Manager",
          "Analyst",
        ][Math.floor(Math.random() * 4)],
        joiningDate: new Date("2023-01-15"),
        salary: Math.round((50000 + Math.random() * 50000) / 100) * 100,
        address: `${i} Main Street`,
        city: "New York",
        state: "NY",
        zipCode: "10001",
        emergencyContact: "Parent",
        emergencyPhone: "+1-555-0000",
      });

      employees.push(employee);
    }

    // Create attendance records
    for (let i = 0; i < 30; i++) {
      const randomEmployee =
        employees[Math.floor(Math.random() * employees.length)];
      const date = new Date();
      date.setDate(date.getDate() - i);

      await Attendance.create({
        employeeId: randomEmployee.id,
        date,
        status: ["present", "absent", "half_day", "sick_leave"][
          Math.floor(Math.random() * 4)
        ],
        checkInTime: "09:00:00",
        checkOutTime: "17:30:00",
        remarks: "Regular working day",
      });
    }

    // Create payroll records
    for (const employee of employees) {
      for (let month = 1; month <= 3; month++) {
        const baseSalary = 50000;
        const allowances = 5000;
        const bonus = month === 3 ? 10000 : 0;
        const deductions = 2000;
        const tax = 8000;

        await Payroll.create({
          employeeId: employee.id,
          month,
          year: 2024,
          baseSalary,
          allowances,
          bonus,
          deductions,
          tax,
          netSalary: baseSalary + allowances + bonus - deductions - tax,
          status: "paid",
          paidDate: new Date(2024, month - 1, 28),
        });
      }
    }

    // Create performance reviews
    for (const employee of employees) {
      const randomReviewer =
        employees[Math.floor(Math.random() * employees.length)];
      if (randomReviewer.id !== employee.id) {
        await Performance.create({
          employeeId: employee.id,
          reviewerId: randomReviewer.id,
          period: "Q4-2024",
          rating: Math.round((3 + Math.random() * 2) * 10) / 10,
          technicalSkills: Math.round((3 + Math.random() * 2) * 10) / 10,
          communication: Math.round((3 + Math.random() * 2) * 10) / 10,
          teamwork: Math.round((3 + Math.random() * 2) * 10) / 10,
          leadership: Math.round((2.5 + Math.random() * 2.5) * 10) / 10,
          review: "Great performance this quarter. Keep up the good work!",
          goals: "Improve documentation and mentoring",
          improvementAreas: "Time management",
          status: "approved",
        });
      }
    }

    console.log("✅ Database seeded successfully!");
    console.log(`
    📊 Seeding Summary:
    - Admin User: admin@ems.com / Admin@123
    - HR User: hr@ems.com / HR@123
    - 10 Employees: employee1@ems.com - employee10@ems.com / Employee@123
    - 4 Departments
    - 30 Attendance Records
    - 30 Payroll Records
    - 10 Performance Reviews
    `);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
