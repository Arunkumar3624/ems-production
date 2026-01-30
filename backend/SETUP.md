# EMS Backend - Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Setup Database

#### Option A: Manual Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE ems_db;"

# Import schema
mysql -u root -p ems_db < ../database/schema.sql

# Run migrations and seed
npm run migrate
npm run seed
```

#### Option B: Automatic Setup (using seed script)
```bash
npm run migrate
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Employees
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Departments
- `GET /api/departments` - List departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Attendance
- `GET /api/attendance` - List attendance records
- `POST /api/attendance` - Create attendance
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance

### Payroll
- `GET /api/payroll` - List payroll records
- `POST /api/payroll` - Create payroll
- `PUT /api/payroll/:id` - Update payroll
- `DELETE /api/payroll/:id` - Delete payroll

### Performance
- `GET /api/performance` - List reviews
- `POST /api/performance` - Create review
- `PUT /api/performance/:id` - Update review
- `DELETE /api/performance/:id` - Delete review

## Authentication Header
All protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

## Database Credentials
Default credentials from seed:
- **Admin:** admin@ems.com / Admin@123
- **HR:** hr@ems.com / HR@123
- **Employees:** employee1-10@ems.com / Employee@123

## Troubleshooting

### MySQL Connection Error
```bash
# Check MySQL is running
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS
# Or start it in Services (Windows)

# Verify credentials in .env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
```

### Port 5000 Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Environment Variables (Production)
```env
DB_HOST=your_production_db_host
DB_USER=production_user
DB_PASSWORD=strong_password_here
DB_NAME=ems_prod_db

JWT_SECRET=your_very_long_and_random_secret_key_at_least_32_characters

PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Using Render.com
1. Push code to GitHub
2. Create New Web Service
3. Connect GitHub repository
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add Environment Variables
7. Deploy

### Using Railway
1. Connect GitHub
2. Select Node.js environment
3. Add MySQL database
4. Configure environment variables
5. Deploy

## Monitoring & Logging

### View Server Logs
```bash
npm run dev  # Development with logs
```

### Database Query Logging
Set in .env:
```env
NODE_ENV=development  # Shows SQL queries
```

## Performance Tips

1. **Database Indexes:** Already configured in schema.sql
2. **Connection Pooling:** Configured in database.js
3. **API Pagination:** Use limit and page parameters
4. **Caching:** Implement Redis for session/data caching
5. **Load Balancing:** Use PM2 for process management

## API Rate Limiting

To add rate limiting (recommended for production):
```bash
npm install express-rate-limit
```

Then in server.js:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

## Security Checklist

- ✅ Change JWT_SECRET to a strong random string
- ✅ Use HTTPS in production
- ✅ Enable CORS only for your domain
- ✅ Hash passwords (bcryptjs configured)
- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Regular security updates
- ✅ Monitor failed login attempts
- ✅ Implement 2FA (optional)

## Version Information

- Node.js: 16+
- Express: 4.18+
- Sequelize: 6.35+
- MySQL: 8.0+

## Need Help?

- Check logs: `npm run dev`
- Verify database: `mysql -u root -p ems_db -e "SHOW TABLES;"`
- Test API: Use Postman or curl
- Review documentation: See main README.md
