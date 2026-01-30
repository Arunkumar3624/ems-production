# 🚀 EMS Quick Start Guide

Get your Employee Management System running in 5 minutes!

## ⚡ Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- MySQL 8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))
- Git (Optional)

## 🎯 Step 1: Prepare Your System

### Check Installation
```bash
node --version    # Should be 16+
npm --version     # Should be 8+
mysql --version   # Should be 8.0+
```

### Create MySQL Database
```bash
# Open MySQL
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE ems_db;
EXIT;
```

## 📦 Step 2: Backend Setup (5 minutes)

### Navigate to Backend
```bash
cd backend
```

### Install Dependencies
```bash
npm install
```

### Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ems_db

JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Initialize Database
```bash
npm run migrate    # Create tables
npm run seed       # Add demo data
```

### Start Backend
```bash
npm run dev
```

✅ Backend running at `http://localhost:5000`

## 🎨 Step 3: Frontend Setup (3 minutes)

### Open New Terminal & Navigate
```bash
cd frontend
```

### Install Dependencies
```bash
npm install
```

### Start Frontend
```bash
npm run dev
```

✅ Frontend running at `http://localhost:5173`

## 🔐 Step 4: Login to Dashboard

### Demo Credentials

#### Admin Account
- Email: `admin@ems.com`
- Password: `Admin@123`
- Access: Full system access

#### HR Account
- Email: `hr@ems.com`
- Password: `HR@123`
- Access: Employee & Payroll management

#### Employee Account
- Email: `employee1@ems.com`
- Password: `Employee@123`
- Access: View own records only

### Login Steps
1. Open http://localhost:5173
2. Enter credentials above
3. Click "Login"
4. Access dashboard

## 📊 Available Features

### Dashboard
- Employee count
- Department overview
- Attendance statistics
- Payroll summaries
- Performance ratings

### Employees
- View all employees
- Add new employees
- Edit employee details
- Delete employees
- Search functionality

### Departments
- Manage departments
- Set department budgets
- Assign department heads
- View department employees

### Attendance
- Track daily attendance
- View attendance history
- Generate reports
- Manage leaves

### Payroll
- Calculate salaries
- View payroll history
- Track deductions
- Manage bonuses

### Performance
- Create performance reviews
- Rate employees (1-5)
- Track skills and competencies
- Set improvement goals

## 🛠️ Useful Commands

### Backend
```bash
npm run dev       # Start development server
npm run start     # Start production server
npm run migrate   # Initialize database
npm run seed      # Add demo data
```

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## 📝 API Testing

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ems.com","password":"Admin@123"}'
```

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Check port 5000 is free
lsof -i :5000

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend Won't Start
```bash
# Check port 5173 is free
lsof -i :5173

# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database Connection Error
```bash
# Verify MySQL is running
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Check credentials in .env
# Make sure database exists:
mysql -u root -p -e "SHOW DATABASES;"
```

### Login Fails
1. Verify backend is running: http://localhost:5000/api/health
2. Check credentials: admin@ems.com / Admin@123
3. Clear browser cache: Ctrl+Shift+Delete
4. Check browser console for errors: F12

## 📚 Next Steps

### Customize the System
1. Edit company name in frontend components
2. Add your logo
3. Configure color scheme (Tailwind CSS)
4. Add more employee fields
5. Customize dashboard widgets

### Deploy to Production
See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Backend deployment to Render
- Frontend deployment to Vercel
- Database setup on PlanetScale
- CI/CD configuration

### Advanced Configuration
- Add email notifications
- Setup payment processing
- Implement 2FA authentication
- Add file upload capabilities
- Configure backup strategies

## 📖 Documentation

- [Main README](README.md) - Complete documentation
- [Backend Setup](backend/SETUP.md) - Detailed backend guide
- [Frontend Setup](frontend/SETUP.md) - Detailed frontend guide
- [Deployment Guide](DEPLOYMENT.md) - Production deployment
- [Database Schema](database/schema.sql) - SQL schema

## 🎉 Success Checklist

- [ ] MySQL is running and database created
- [ ] Backend started successfully (port 5000)
- [ ] Frontend started successfully (port 5173)
- [ ] Can login with admin account
- [ ] Can view dashboard
- [ ] Can see employees list
- [ ] Database seed data populated

## 💡 Pro Tips

1. **Keep Two Terminals Open**
   - Terminal 1: Backend `npm run dev`
   - Terminal 2: Frontend `npm run dev`

2. **Use Browser DevTools**
   - F12 to open developer tools
   - Check Console for errors
   - Check Network for API calls

3. **API Documentation**
   - All endpoints documented in main README
   - Test with curl or Postman

4. **Database Management**
   - Use MySQL Workbench for visual DB management
   - Or command line: `mysql -u root -p ems_db`

5. **Version Control**
   ```bash
   git init
   git add .
   git commit -m "Initial EMS setup"
   ```

## 🔗 Useful Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MySQL Tutorial](https://dev.mysql.com/doc/)
- [Tailwind CSS](https://tailwindcss.com)
- [Node.js Best Practices](https://nodejs.org/en/docs/)

## ❓ FAQ

**Q: Can I change the admin password?**
A: Yes, login as admin and update through user settings (feature to be added)

**Q: How do I backup my data?**
A: Use `mysqldump`: `mysqldump -u root -p ems_db > backup.sql`

**Q: Can I add more demo employees?**
A: Edit `backend/src/migrations/seed.js` and run `npm run seed` again

**Q: How do I reset the database?**
A: Run `npm run migrate` to reinitialize tables

**Q: Is this production-ready?**
A: Yes! Follow DEPLOYMENT.md for production setup

## 🆘 Need Help?

1. Check troubleshooting section above
2. Review main README.md
3. Check backend/SETUP.md or frontend/SETUP.md
4. Look for error messages in browser console or terminal
5. Verify all prerequisites are installed

---

**Congratulations! Your EMS is ready to use! 🎊**

Start with the Dashboard and explore all features. Enjoy managing your employees efficiently!

**Need to deploy?** → See [DEPLOYMENT.md](DEPLOYMENT.md)
