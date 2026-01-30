<<<<<<< HEAD
# Employee Management System (EMS) - Production Ready

A complete, enterprise-grade Employee Management System built with React, Node.js, Express, and MySQL. This system is production-ready and follows industry best practices for security, performance, and scalability.

## 🎯 Features

### Core Features
- ✅ **User Authentication** - JWT-based secure login/registration
- ✅ **Role-Based Access Control** - Admin, HR, and Employee roles
- ✅ **Employee Management** - Complete CRUD operations
- ✅ **Department Management** - Organize and manage departments
- ✅ **Attendance Tracking** - Track employee attendance and leaves
- ✅ **Payroll Management** - Calculate and manage salaries
- ✅ **Performance Reviews** - Employee performance evaluations
- ✅ **Analytics Dashboard** - Real-time insights and charts

### Technical Features
- 🔒 Password hashing with bcrypt
- 🔑 JWT token-based authentication
- 📊 Interactive charts and analytics
- 📱 Responsive design for all devices
- 🌐 RESTful API architecture
- 🗄️ Relational database with Sequelize ORM
- 🚀 Production-ready deployment configuration
- 📝 Complete API documentation

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT
- **Validation:** Express Validator
- **Security:** Helmet, CORS, Bcrypt

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** Zustand
- **HTTP Client:** Fetch API
- **Charts:** Recharts
- **Date Handling:** date-fns

## 📋 Database Schema

### Users Table
```sql
- id (Primary Key)
- email (Unique)
- password (Hashed)
- role (admin, hr, employee)
- firstName, lastName
- isActive
- lastLogin
- timestamps
```

### Employees Table
```sql
- id (Primary Key)
- userId (Foreign Key - Users)
- name, email, phone
- departmentId (Foreign Key - Departments)
- designation, joiningDate
- salary, status
- address, city, state, zipCode
- emergencyContact, emergencyPhone
- timestamps
```

### Departments Table
```sql
- id (Primary Key)
- name (Unique)
- description
- headId (Foreign Key - Employees)
- budget
- isActive
- timestamps
```

### Attendance Table
```sql
- id (Primary Key)
- employeeId (Foreign Key - Employees)
- date, status (present, absent, half_day, sick_leave, paid_leave, unpaid_leave)
- checkInTime, checkOutTime
- remarks
- timestamps
```

### Payroll Table
```sql
- id (Primary Key)
- employeeId (Foreign Key - Employees)
- month, year
- baseSalary, allowances, bonus
- deductions, tax
- netSalary
- status (draft, pending, approved, paid, cancelled)
- paidDate, remarks
- timestamps
```

### Performance Table
```sql
- id (Primary Key)
- employeeId (Foreign Key - Employees)
- reviewerId (Foreign Key - Employees)
- period, rating (1-5)
- technicalSkills, communication, teamwork, leadership
- review, goals, improvementAreas
- status (draft, submitted, approved, closed)
- timestamps
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- MySQL 8.0+
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Configure environment variables:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ems_db

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000

FRONTEND_URL=http://localhost:5173
```

5. **Create MySQL database:**
```bash
mysql -u root -p -e "CREATE DATABASE ems_db;"
```

6. **Initialize database and seed data:**
```bash
npm run migrate
npm run seed
```

7. **Start the backend server:**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "employee"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Employee Endpoints

#### Get All Employees
```
GET /api/employees?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Single Employee
```
GET /api/employees/:id
Authorization: Bearer <token>
```

#### Create Employee (HR/Admin only)
```
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1-555-0123",
  "departmentId": 1,
  "designation": "Senior Developer",
  "joiningDate": "2024-01-15",
  "salary": 75000
}
```

#### Update Employee (HR/Admin only)
```
PUT /api/employees/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "phone": "+1-555-0456"
}
```

#### Delete Employee (Admin only)
```
DELETE /api/employees/:id
Authorization: Bearer <token>
```

### Department Endpoints

#### Get All Departments
```
GET /api/departments
Authorization: Bearer <token>
```

#### Create Department (HR/Admin only)
```
POST /api/departments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Engineering",
  "description": "Software Engineering Team",
  "budget": 500000
}
```

### Attendance Endpoints

#### Get Attendance Records
```
GET /api/attendance?page=1&limit=20&employeeId=1&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

#### Create Attendance Record (HR/Admin only)
```
POST /api/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": 1,
  "date": "2024-01-15",
  "status": "present",
  "checkInTime": "09:00:00",
  "checkOutTime": "17:30:00",
  "remarks": "Regular working day"
}
```

### Payroll Endpoints

#### Get Payroll Records
```
GET /api/payroll?month=1&year=2024&status=paid
Authorization: Bearer <token>
```

#### Create Payroll Record (HR/Admin only)
```
POST /api/payroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": 1,
  "month": 1,
  "year": 2024,
  "baseSalary": 50000,
  "allowances": 5000,
  "bonus": 0,
  "deductions": 2000,
  "tax": 8000
}
```

### Performance Endpoints

#### Get Performance Reviews
```
GET /api/performance?employeeId=1&period=Q1-2024
Authorization: Bearer <token>
```

#### Create Performance Review (HR/Admin only)
```
POST /api/performance
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": 1,
  "reviewerId": 2,
  "period": "Q1-2024",
  "rating": 4.5,
  "technicalSkills": 4.5,
  "communication": 4,
  "teamwork": 4.5,
  "leadership": 4,
  "review": "Excellent performance",
  "goals": "Lead new project",
  "improvementAreas": "Delegation"
}
```

## 🔐 Security Features

### Implemented Security Measures
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication with expiration
- ✅ CORS configuration
- ✅ Helmet.js for security headers
- ✅ Input validation with express-validator
- ✅ SQL injection prevention via ORM
- ✅ Role-based access control (RBAC)
- ✅ Environment variable configuration
- ✅ Secure password requirements

### Best Practices for Production
- Change JWT_SECRET to a strong random string
- Use HTTPS only in production
- Implement rate limiting
- Add logging and monitoring
- Regular security audits
- Keep dependencies updated

## 📊 Demo Credentials

### Admin Account
- **Email:** admin@ems.com
- **Password:** Admin@123
- **Role:** Admin (Full access)

### HR Account
- **Email:** hr@ems.com
- **Password:** HR@123
- **Role:** HR (Employee & Payroll management)

### Employee Account
- **Email:** employee1@ems.com
- **Password:** Employee@123
- **Role:** Employee (Limited access)

## 🚀 Deployment

### Backend Deployment (Render/Railway)

#### Using Render
1. Create Render account and connect GitHub
2. Create new Web Service
3. Select Node.js environment
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables from `.env`
7. Deploy

#### Using Railway
1. Connect GitHub repository
2. Select Node.js
3. Add MySQL plugin
4. Set environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Set VITE_API_URL environment variable

#### Using Netlify
1. Build frontend: `npm run build`
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

## 📁 Project Structure

```
EMS/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Employee.js
│   │   │   ├── Department.js
│   │   │   ├── Attendance.js
│   │   │   ├── Payroll.js
│   │   │   └── Performance.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   ├── departmentRoutes.js
│   │   │   ├── attendanceRoutes.js
│   │   │   ├── payrollRoutes.js
│   │   │   └── performanceRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── migrations/
│   │   │   ├── migrate.js
│   │   │   └── seed.js
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── EmployeeDetail.jsx
│   │   │   ├── Departments.jsx
│   │   │   ├── Attendance.jsx
│   │   │   ├── Payroll.jsx
│   │   │   └── Performance.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   └── authStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── database/
│   └── schema.sql
│
└── README.md
```

## 🔧 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running: `mysql.server start` (macOS) or check Services (Windows)
- Verify DB credentials in `.env`
- Create database: `CREATE DATABASE ems_db;`

### Port Already in Use
- Backend: `lsof -i :5000` then `kill -9 <PID>`
- Frontend: `lsof -i :5173` then `kill -9 <PID>`

### CORS Errors
- Ensure FRONTEND_URL in backend `.env` matches frontend URL
- Check CORS middleware in server.js

### Authentication Issues
- Verify JWT_SECRET is set
- Check token in localStorage (browser DevTools)
- Ensure Authorization header format: `Bearer <token>`

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT Authentication](https://jwt.io/)

## 📝 License

MIT License - feel free to use this project for learning and commercial purposes.

## 🤝 Support

For issues, feature requests, or contributions, please create an issue or pull request.

---

**Made with ❤️ - Production Ready Employee Management System**
=======
# ems-production
>>>>>>> da5f7d730a2a213223ccd1c147082964190e918f
