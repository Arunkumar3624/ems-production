# EMS API Testing Guide

Complete guide to test all EMS APIs using curl or Postman.

## 📌 Base URL
```
http://localhost:5000/api
```

## 🔐 Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing Tools

### Using curl
```bash
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer your_token_here"
```

### Using Postman
1. Import the postman_collection.json
2. Set variable: `base_url=http://localhost:5000/api`
3. Set variable: `token` after login
4. Use variables in requests: `{{base_url}}` and `{{token}}`

### Using Browser Console
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/employees', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log(data));
```

---

## 🔓 PUBLIC ENDPOINTS (No Auth Required)

### Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔑 AUTH ENDPOINTS

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 11,
    "email": "newuser@example.com",
    "role": "employee",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ems.com",
    "password": "Admin@123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@ems.com",
    "role": "admin",
    "firstName": "Admin",
    "lastName": "User"
  }
}
```

### 3. Get Current User
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "id": 1,
  "email": "admin@ems.com",
  "password": "$2a$10$...",
  "role": "admin",
  "firstName": "Admin",
  "lastName": "User",
  "isActive": true,
  "lastLogin": "2024-01-15T10:25:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T10:25:00.000Z"
}
```

### 4. Logout
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

---

## 👥 EMPLOYEE ENDPOINTS

### 1. Get All Employees
```bash
TOKEN="your_jwt_token_here"

# Basic
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer $TOKEN"

# With Pagination
curl -X GET "http://localhost:5000/api/employees?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# With Filters
curl -X GET "http://localhost:5000/api/employees?page=1&limit=10&departmentId=1&status=active" \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "total": 10,
  "page": 1,
  "pages": 1,
  "employees": [
    {
      "id": 1,
      "userId": 2,
      "name": "Employee 1",
      "email": "employee1@ems.com",
      "phone": "+1-555-1001",
      "departmentId": 1,
      "designation": "Senior Developer",
      "joiningDate": "2023-01-15",
      "salary": "75000.00",
      "status": "active",
      "address": "1 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "emergencyContact": "Parent",
      "emergencyPhone": "+1-555-0000",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Employee
```bash
TOKEN="your_jwt_token_here"
EMPLOYEE_ID=1

curl -X GET http://localhost:5000/api/employees/$EMPLOYEE_ID \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "id": 1,
  "userId": 2,
  "name": "Employee 1",
  "email": "employee1@ems.com",
  "phone": "+1-555-1001",
  "departmentId": 1,
  "designation": "Senior Developer",
  "joiningDate": "2023-01-15",
  "salary": "75000.00",
  "status": "active",
  "address": "1 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "emergencyContact": "Parent",
  "emergencyPhone": "+1-555-0000",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### 3. Create Employee (Admin/HR only)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/employees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1-555-0123",
    "departmentId": 1,
    "designation": "Senior Developer",
    "joiningDate": "2024-01-15",
    "salary": 85000,
    "address": "123 Oak Avenue",
    "city": "New York",
    "state": "NY",
    "zipCode": "10002",
    "emergencyContact": "John Smith",
    "emergencyPhone": "+1-555-0124"
  }'
```

Response:
```json
{
  "message": "Employee created successfully",
  "employee": {
    "id": 11,
    "userId": 12,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1-555-0123",
    "departmentId": 1,
    "designation": "Senior Developer",
    "joiningDate": "2024-01-15",
    "salary": "85000.00",
    "status": "active",
    "address": "123 Oak Avenue",
    "city": "New York",
    "state": "NY",
    "zipCode": "10002",
    "emergencyContact": "John Smith",
    "emergencyPhone": "+1-555-0124",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update Employee (Admin/HR only)
```bash
TOKEN="your_jwt_token_here"
EMPLOYEE_ID=1

curl -X PUT http://localhost:5000/api/employees/$EMPLOYEE_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1-555-9999",
    "designation": "Lead Developer",
    "salary": 95000
  }'
```

Response:
```json
{
  "message": "Employee updated successfully",
  "employee": {
    "id": 1,
    "phone": "+1-555-9999",
    "designation": "Lead Developer",
    "salary": "95000.00"
  }
}
```

### 5. Delete Employee (Admin only)
```bash
TOKEN="your_jwt_token_here"
EMPLOYEE_ID=1

curl -X DELETE http://localhost:5000/api/employees/$EMPLOYEE_ID \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "message": "Employee deleted successfully"
}
```

---

## 🏢 DEPARTMENT ENDPOINTS

### 1. Get All Departments
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/departments \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
[
  {
    "id": 1,
    "name": "Information Technology",
    "description": "Software development and IT operations",
    "headId": null,
    "budget": "500000.00",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Create Department (Admin/HR only)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/departments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marketing",
    "description": "Marketing and Brand Management",
    "budget": 200000
  }'
```

### 3. Get Department Employees
```bash
TOKEN="your_jwt_token_here"
DEPT_ID=1

curl -X GET http://localhost:5000/api/departments/$DEPT_ID/employees \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📅 ATTENDANCE ENDPOINTS

### 1. Get Attendance Records
```bash
TOKEN="your_jwt_token_here"

# All records
curl -X GET http://localhost:5000/api/attendance \
  -H "Authorization: Bearer $TOKEN"

# Filter by employee and date range
curl -X GET "http://localhost:5000/api/attendance?employeeId=1&startDate=2024-01-01&endDate=2024-01-31&page=1&limit=20" \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "total": 5,
  "page": 1,
  "pages": 1,
  "records": [
    {
      "id": 1,
      "employeeId": 1,
      "date": "2024-01-15",
      "status": "present",
      "checkInTime": "09:00:00",
      "checkOutTime": "17:30:00",
      "remarks": "Regular working day",
      "createdAt": "2024-01-15T09:00:00.000Z",
      "updatedAt": "2024-01-15T17:30:00.000Z"
    }
  ]
}
```

### 2. Create Attendance (Admin/HR only)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/attendance \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": 1,
    "date": "2024-01-16",
    "status": "absent",
    "remarks": "Sick leave"
  }'
```

---

## 💰 PAYROLL ENDPOINTS

### 1. Get Payroll Records
```bash
TOKEN="your_jwt_token_here"

# All records
curl -X GET http://localhost:5000/api/payroll \
  -H "Authorization: Bearer $TOKEN"

# Filter by employee and period
curl -X GET "http://localhost:5000/api/payroll?employeeId=1&month=1&year=2024&status=paid" \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "total": 1,
  "page": 1,
  "pages": 1,
  "records": [
    {
      "id": 1,
      "employeeId": 1,
      "month": 1,
      "year": 2024,
      "baseSalary": "50000.00",
      "allowances": "5000.00",
      "bonus": "0.00",
      "deductions": "2000.00",
      "tax": "8000.00",
      "netSalary": "45000.00",
      "status": "paid",
      "paidDate": "2024-01-28T00:00:00.000Z",
      "remarks": null,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-28T00:00:00.000Z"
    }
  ]
}
```

### 2. Create Payroll (Admin/HR only)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/payroll \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": 1,
    "month": 2,
    "year": 2024,
    "baseSalary": 50000,
    "allowances": 5000,
    "bonus": 2000,
    "deductions": 2000,
    "tax": 8000
  }'
```

---

## ⭐ PERFORMANCE ENDPOINTS

### 1. Get Performance Reviews
```bash
TOKEN="your_jwt_token_here"

curl -X GET "http://localhost:5000/api/performance?employeeId=1&period=Q1-2024" \
  -H "Authorization: Bearer $TOKEN"
```

Response:
```json
{
  "total": 1,
  "page": 1,
  "pages": 1,
  "reviews": [
    {
      "id": 1,
      "employeeId": 1,
      "reviewerId": 2,
      "period": "Q1-2024",
      "rating": "4.5",
      "technicalSkills": "4.5",
      "communication": "4.0",
      "teamwork": "4.5",
      "leadership": "4.0",
      "review": "Great performance this quarter",
      "goals": "Improve documentation",
      "improvementAreas": "Time management",
      "status": "approved",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Create Performance Review (Admin/HR only)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/performance \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": 1,
    "reviewerId": 2,
    "period": "Q2-2024",
    "rating": 4.5,
    "technicalSkills": 4.5,
    "communication": 4,
    "teamwork": 4.5,
    "leadership": 4,
    "review": "Excellent performance",
    "goals": "Lead new project initiative",
    "improvementAreas": "Delegation skills"
  }'
```

---

## 🧪 Postman Collection

Save as `postman_collection.json`:

```json
{
  "info": {
    "name": "EMS API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    { "key": "base_url", "value": "http://localhost:5000/api" },
    { "key": "token", "value": "" }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"admin@ems.com\",\"password\":\"Admin@123\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🔄 Common Workflows

### Workflow 1: Register and Login
```bash
# 1. Register
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')

# 2. Use token for subsequent requests
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer $TOKEN"
```

### Workflow 2: Create Employee with Complete Data
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:5000/api/employees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice.johnson@company.com",
    "phone": "+1-555-2000",
    "departmentId": 1,
    "designation": "Product Manager",
    "joiningDate": "2024-01-01",
    "salary": 100000,
    "address": "456 Main St",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02101",
    "emergencyContact": "Robert Johnson",
    "emergencyPhone": "+1-555-2001"
  }'
```

---

## ✅ Success Indicators

API is working correctly if:
- ✅ Health check returns 200 OK
- ✅ Login returns JWT token
- ✅ Token can access protected endpoints
- ✅ CRUD operations return appropriate status codes
- ✅ Pagination works with page/limit parameters
- ✅ Filters work with query parameters

---

**Happy Testing! 🎉**
