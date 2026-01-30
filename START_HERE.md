# 👋 Welcome to EMS - Employee Management System

**A Complete, Production-Ready Enterprise HR Application**

> Built with React, Node.js, Express, and MySQL | Fully Documented | Ready to Deploy

## 🎯 What is EMS?

EMS is a modern, full-stack Employee Management System designed for enterprise HR departments. It provides complete functionality for managing employees, attendance, payroll, performance reviews, and departmental organization.

**This is NOT a demo or tutorial project** — it's production-ready code that can be deployed immediately.

## ⚡ Quick Start (Choose One)

### 🚀 Fastest Way - 5 Minutes
Follow the **Quick Start Guide**:
```bash
→ Read: QUICKSTART.md
```

### 🔧 Automated Setup (Windows)
```bash
→ Run: setup.bat
```

### 🔧 Automated Setup (Linux/Mac)
```bash
→ Run: bash setup.sh
```

### 📚 Detailed Step-by-Step
- Backend: `backend/SETUP.md`
- Frontend: `frontend/SETUP.md`

## 📖 Documentation Index

Choose what you need:

| Document | Purpose |
|----------|---------|
| **QUICKSTART.md** | Get running in 5 minutes |
| **README.md** | Complete system documentation |
| **backend/SETUP.md** | Detailed backend configuration |
| **frontend/SETUP.md** | Detailed frontend setup |
| **API_TESTING.md** | Test all API endpoints |
| **DEPLOYMENT.md** | Deploy to production |
| **PROJECT_STRUCTURE.md** | Understand the codebase |

## 🎯 Three Ways to Get Started

### Option 1: Quick Demo (2 minutes)
```bash
# Just want to see it working?
1. Read QUICKSTART.md (section: Step 1-4)
2. Login with: admin@ems.com / Admin@123
3. Explore the dashboard
```

### Option 2: Development Setup (10 minutes)
```bash
# Want to develop and modify?
1. Run setup.bat (Windows) or bash setup.sh (Linux/Mac)
2. Configure MySQL credentials in backend/.env
3. npm run migrate && npm run seed in backend/
4. npm run dev in both backend/ and frontend/
```

### Option 3: Production Deployment (30 minutes)
```bash
# Ready for production?
1. Read DEPLOYMENT.md
2. Follow Render.com setup for backend
3. Follow Vercel setup for frontend
4. Configure MySQL on PlanetScale
5. Deploy!
```

## 🌟 Key Features at a Glance

### 👥 Employee Management
- ✅ Complete CRUD for employees
- ✅ Department assignment
- ✅ Salary tracking
- ✅ Contact information
- ✅ Employment status

### 📅 Attendance System
- ✅ Daily attendance tracking
- ✅ Check-in/check-out times
- ✅ Leave management
- ✅ Attendance reports

### 💰 Payroll Management
- ✅ Salary calculation
- ✅ Allowances & deductions
- ✅ Tax tracking
- ✅ Bonus management
- ✅ Payment status

### ⭐ Performance Reviews
- ✅ Employee ratings (1-5)
- ✅ Skill assessments
- ✅ Goal tracking
- ✅ Improvement areas

### 📊 Analytics Dashboard
- ✅ Real-time statistics
- ✅ Charts and visualizations
- ✅ Attendance trends
- ✅ Payroll summaries

### 🔐 Security & Access
- ✅ JWT authentication
- ✅ Role-based access (Admin/HR/Employee)
- ✅ Password hashing
- ✅ Protected routes

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────┐
│         Frontend (React + Vite)                      │
│  ├─ Dashboard with Charts                           │
│  ├─ Employee Management                             │
│  ├─ Payroll & Attendance                            │
│  └─ Authentication (JWT)                            │
└──────────────┬──────────────────────────────────────┘
               │ API Calls
┌──────────────▼──────────────────────────────────────┐
│      Backend (Express.js + Node.js)                  │
│  ├─ REST API (30+ endpoints)                        │
│  ├─ JWT Authentication                              │
│  ├─ Role-Based Access Control                       │
│  ├─ Input Validation                                │
│  └─ Error Handling                                  │
└──────────────┬──────────────────────────────────────┘
               │ Database Queries
┌──────────────▼──────────────────────────────────────┐
│        Database (MySQL 8.0)                          │
│  ├─ Users (Authentication)                          │
│  ├─ Employees (Staff Directory)                     │
│  ├─ Departments (Organization)                      │
│  ├─ Attendance (Time Tracking)                      │
│  ├─ Payroll (Salary Management)                     │
│  └─ Performance (Reviews)                           │
└─────────────────────────────────────────────────────┘
```

## 🗂️ What's Included

### Code Files
- ✅ 25+ backend modules
- ✅ 10+ frontend components
- ✅ Complete database schema
- ✅ Migration scripts

### Documentation
- ✅ 7 comprehensive guides
- ✅ 900+ lines in main README
- ✅ API documentation with examples
- ✅ Troubleshooting guides

### Demo Data
- ✅ 1 Admin user
- ✅ 1 HR user
- ✅ 10 employees
- ✅ 4 departments
- ✅ Sample records (attendance, payroll, reviews)

### Setup Scripts
- ✅ Windows batch script
- ✅ Linux/Mac shell script

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js + Sequelize |
| **Database** | MySQL 8.0 |
| **Authentication** | JWT + bcrypt |
| **Deployment** | Render + Vercel + PlanetScale |

## 📋 Pre-Requirements

### Must Have
- Node.js 16+ ([Download](https://nodejs.org/))
- MySQL 8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))

### Nice to Have
- Postman (for API testing)
- MySQL Workbench (for database management)
- Git (for version control)

## 🚀 Next Steps

### 👉 Start Here
1. **First-time setup?** → Read [QUICKSTART.md](QUICKSTART.md)
2. **Need detailed steps?** → Check [backend/SETUP.md](backend/SETUP.md)
3. **Ready to deploy?** → See [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Want to test APIs?** → Follow [API_TESTING.md](API_TESTING.md)

### 📚 Want to Learn More?
- Main documentation: [README.md](README.md)
- Project structure: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🔐 Demo Credentials

Use these to login immediately after setup:

```
┌─────────────────────────────────────┐
│ ADMIN ACCOUNT                       │
├─────────────────────────────────────┤
│ Email: admin@ems.com                │
│ Pass:  Admin@123                    │
│ Role:  Full access                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HR ACCOUNT                          │
├─────────────────────────────────────┤
│ Email: hr@ems.com                   │
│ Pass:  HR@123                       │
│ Role:  Employee & Payroll mgmt      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ EMPLOYEE ACCOUNT                    │
├─────────────────────────────────────┤
│ Email: employee1@ems.com            │
│ Pass:  Employee@123                 │
│ Role:  View own records only        │
└─────────────────────────────────────┘
```

## ⚠️ Important Notes

### Development
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- Keep both running in separate terminals
- CORS is configured for localhost development

### Security
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use strong MySQL password
- ⚠️ Enable HTTPS when deployed
- ⚠️ Update FRONTEND_URL in backend .env

## 🐛 Troubleshooting

### Quick Fixes
- **Port already in use?** → Change PORT in .env or kill process
- **MySQL won't connect?** → Check credentials in .env
- **Can't login?** → Verify seed data ran: `npm run seed`
- **API 404 errors?** → Ensure backend is running on port 5000

### Detailed Help
→ See **Troubleshooting** section in [README.md](README.md)

## 🎓 Learning Paths

### For Backend Developers
1. Read [backend/SETUP.md](backend/SETUP.md)
2. Study `backend/src/server.js` (main entry)
3. Review `backend/src/routes/` (API endpoints)
4. Check `backend/src/models/` (database schema)

### For Frontend Developers
1. Read [frontend/SETUP.md](frontend/SETUP.md)
2. Check `frontend/src/App.jsx` (routing)
3. Study `frontend/src/pages/` (page components)
4. Review `frontend/src/services/api.js` (API calls)

### For DevOps/Deployment
1. Review [DEPLOYMENT.md](DEPLOYMENT.md)
2. Check [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
3. Study Render and Vercel documentation
4. Configure CI/CD pipeline

## 📞 Support Resources

### Documentation
- Main README: Comprehensive system documentation
- API_TESTING: Complete API examples
- DEPLOYMENT: Production setup guide
- PROJECT_STRUCTURE: Code organization

### Code Examples
- API usage: See [API_TESTING.md](API_TESTING.md)
- Component examples: See `frontend/src/pages/`
- Database queries: See `backend/src/models/`

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend starts: `npm run dev` (no errors)
- [ ] Frontend starts: `npm run dev` (no errors)
- [ ] Can access: `http://localhost:5173`
- [ ] Can login: admin@ems.com / Admin@123
- [ ] Dashboard loads with data
- [ ] Can view employees, departments, etc.
- [ ] API works: `curl http://localhost:5000/api/health`

## 🎉 Ready to Go!

You now have a complete, production-ready HR management system. Here's what you can do:

1. ✅ **Use it immediately** - Login and explore
2. 🔧 **Customize it** - Modify for your needs
3. 🚀 **Deploy it** - Put it online
4. 📚 **Learn from it** - Study best practices
5. 🤝 **Extend it** - Add new features

## 🌍 Deployment Options

### Backend
- **Render.com** (Recommended - free tier available)
- Railway.com
- AWS Heroku alternative
- DigitalOcean

### Frontend
- **Vercel** (Recommended - made for Vite/React)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Database
- **PlanetScale** (MySQL compatible - free tier)
- AWS RDS
- DigitalOcean
- Traditional hosting MySQL

## 📝 License

MIT License - Use freely for personal and commercial projects.

## 🎯 Questions?

1. **Setup issue?** → Check QUICKSTART.md
2. **API question?** → See API_TESTING.md
3. **Code question?** → Review PROJECT_STRUCTURE.md
4. **Deployment?** → Follow DEPLOYMENT.md

---

## 🚀 Let's Get Started!

**Choose your path:**

👉 **New to this?** [QUICKSTART.md](QUICKSTART.md)

👉 **Developer setup?** [backend/SETUP.md](backend/SETUP.md) + [frontend/SETUP.md](frontend/SETUP.md)

👉 **Ready to deploy?** [DEPLOYMENT.md](DEPLOYMENT.md)

👉 **Full details?** [README.md](README.md)

---

**Welcome to your new Enterprise HR System! 🎊**

*Built with ❤️ for production use | Fully documented | Ready to deploy*
