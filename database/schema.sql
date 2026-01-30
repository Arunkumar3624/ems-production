-- Employee Management System Database Schema
-- MySQL 8.0+

-- Create Database
CREATE DATABASE IF NOT EXISTS ems_db;
USE ems_db;

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'hr', 'employee') DEFAULT 'employee',
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  isActive BOOLEAN DEFAULT TRUE,
  lastLogin DATETIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Departments Table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  headId INT,
  budget DECIMAL(12, 2) DEFAULT 0,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_headId (headId)
);

-- Employees Table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  departmentId INT,
  designation VARCHAR(100),
  joiningDate DATE NOT NULL,
  salary DECIMAL(10, 2) DEFAULT 0,
  status ENUM('active', 'inactive', 'on_leave', 'terminated') DEFAULT 'active',
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zipCode VARCHAR(20),
  emergencyContact VARCHAR(100),
  emergencyPhone VARCHAR(20),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_departmentId (departmentId),
  INDEX idx_status (status)
);

-- Add foreign key for department head after employees table exists
ALTER TABLE departments
ADD CONSTRAINT fk_department_head
FOREIGN KEY (headId) REFERENCES employees(id) ON DELETE SET NULL;

-- Attendance Table
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeId INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'half_day', 'sick_leave', 'paid_leave', 'unpaid_leave') DEFAULT 'present',
  checkInTime TIME,
  checkOutTime TIME,
  remarks TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE,
  UNIQUE KEY unique_employee_date (employeeId, date),
  INDEX idx_date (date),
  INDEX idx_status (status)
);

-- Payroll Table
CREATE TABLE payroll (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeId INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  baseSalary DECIMAL(10, 2) DEFAULT 0,
  allowances DECIMAL(10, 2) DEFAULT 0,
  bonus DECIMAL(10, 2) DEFAULT 0,
  deductions DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  netSalary DECIMAL(10, 2) DEFAULT 0,
  status ENUM('draft', 'pending', 'approved', 'paid', 'cancelled') DEFAULT 'draft',
  paidDate DATETIME,
  remarks TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE,
  UNIQUE KEY unique_employee_period (employeeId, month, year),
  INDEX idx_status (status),
  INDEX idx_year_month (year, month)
);

-- Performance Table
CREATE TABLE performance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeId INT NOT NULL,
  reviewerId INT NOT NULL,
  period VARCHAR(20) NOT NULL,
  rating DECIMAL(3, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  technicalSkills DECIMAL(3, 1) DEFAULT 0,
  communication DECIMAL(3, 1) DEFAULT 0,
  teamwork DECIMAL(3, 1) DEFAULT 0,
  leadership DECIMAL(3, 1) DEFAULT 0,
  review TEXT,
  goals TEXT,
  improvementAreas TEXT,
  status ENUM('draft', 'submitted', 'approved', 'closed') DEFAULT 'draft',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewerId) REFERENCES employees(id) ON DELETE CASCADE,
  INDEX idx_employeeId (employeeId),
  INDEX idx_reviewerId (reviewerId),
  INDEX idx_period (period),
  INDEX idx_status (status)
);

-- Create Indexes for better query performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_employees_department ON employees(departmentId);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_attendance_employee_date ON attendance(employeeId, date);
CREATE INDEX idx_payroll_employee_period ON payroll(employeeId, month, year);
CREATE INDEX idx_performance_employee ON performance(employeeId);

-- Sample data (optional - run seed.js instead for more data)
INSERT INTO users (email, password, role, firstName, lastName) VALUES
('admin@ems.com', '$2a$10$...hashed_password...', 'admin', 'Admin', 'User'),
('hr@ems.com', '$2a$10$...hashed_password...', 'hr', 'HR', 'Manager');

COMMIT;
