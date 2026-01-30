# Deployment Guide - EMS

## Prerequisites
- Git repository initialized
- Backend: Render.com or Railway.com account
- Frontend: Vercel or Netlify account
- MySQL: Cloud database (Planetscale, AWS RDS, or similar)

## Backend Deployment (Render)

### Step 1: Prepare Code
```bash
# Ensure .env.example is committed
git add .env.example
git commit -m "Add environment configuration"
git push origin main
```

### Step 2: Create Render Service
1. Go to [render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** ems-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free or Paid

### Step 3: Set Environment Variables
In Render Dashboard → Environment:
```
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ems_prod_db
JWT_SECRET=generate_strong_random_secret_here
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 4: Deploy Database
```bash
# Using MySQL on Planetscale (recommended)
1. Create account at planetscale.com
2. Create database
3. Get connection string
4. Run migrations: mysql ems_prod_db < schema.sql
5. Run seed: npm run seed (if needed)
```

### Step 5: Test API
```bash
curl https://ems-backend-xxxx.onrender.com/api/health
```

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Connect Project
```bash
cd frontend
vercel
# Follow prompts to connect GitHub
```

### Step 3: Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://ems-backend-xxxx.onrender.com/api
```

### Step 4: Deploy
```bash
vercel --prod
# Or automatically deploy on push to main
```

### Step 5: Verify
```bash
# Check deployment at your Vercel URL
# https://your-project.vercel.app
```

## Alternative: Railway Deployment

### Backend on Railway
1. Go to [railway.app](https://railway.app)
2. New Project → GitHub
3. Select EMS repository
4. Add MySQL plugin
5. Configure environment variables
6. Deploy

### Frontend on Railway
1. Create new service
2. Connect frontend folder
3. Set build command: `npm run build`
4. Set start command: None (Static)
5. Deploy

## Database Setup

### Option 1: PlanetScale (MySQL Compatible)
```bash
# Create free MySQL database
1. Sign up at planetscale.com
2. Create database
3. Get connection string
4. Update DB credentials in Render/Railway

mysql -u user -p -h host database < schema.sql
```

### Option 2: AWS RDS
```bash
1. Create RDS MySQL instance
2. Configure security groups
3. Get endpoint and credentials
4. Update environment variables
5. Run schema.sql
```

### Option 3: DigitalOcean Managed Database
```bash
1. Create managed MySQL database
2. Whitelist Render/Railway IPs
3. Update connection details
4. Initialize schema
```

## GitHub Actions CI/CD

### Setup Automatic Deployment
1. Create `.github/workflows/deploy.yml`
2. Add secrets:
   - RENDER_API_KEY
   - VERCEL_TOKEN
   - DATABASE_URL

3. Push changes to trigger deployment

## Environment Configuration by Deployment

### Development
```env
NODE_ENV=development
DB_HOST=localhost
API_URL=http://localhost:5000
```

### Staging
```env
NODE_ENV=development
DB_HOST=staging_db_host
API_URL=https://staging-api.yourdomain.com
```

### Production
```env
NODE_ENV=production
DB_HOST=prod_db_host
API_URL=https://api.yourdomain.com
JWT_SECRET=strong_secret_key
FRONTEND_URL=https://yourdomain.com
```

## Post-Deployment Checklist

### Backend
- [ ] API health check passes
- [ ] Database migrations successful
- [ ] JWT authentication works
- [ ] CORS configured for frontend
- [ ] Environment variables set
- [ ] Logging configured
- [ ] Backup strategy in place

### Frontend
- [ ] App loads without errors
- [ ] Login page displays
- [ ] Authentication flow works
- [ ] API calls are successful
- [ ] Responsive design works
- [ ] Analytics configured
- [ ] Error monitoring setup

### Database
- [ ] Backups configured
- [ ] Connection limits set
- [ ] User permissions restricted
- [ ] SSL/TLS enabled
- [ ] Firewall rules configured
- [ ] Monitoring alerts set

## SSL/HTTPS Configuration

### Render (Automatic)
- Automatically provides SSL certificate
- HTTPS enabled by default
- No additional configuration needed

### Vercel (Automatic)
- SSL certificate included
- HTTPS forced
- CDN for static files

### Custom Domain Setup
```bash
# Add CNAME record in DNS:
# CNAME: your-domain.com → render-xxx.onrender.com
# Wait for DNS propagation (24 hours)
```

## Monitoring & Logging

### Backend Logs
```bash
# Render Dashboard
1. Go to Service
2. Click "Logs"
3. View real-time logs

# Check specific errors:
# curl https://your-api.com/api/health
```

### Frontend Monitoring
```bash
# Vercel Dashboard
1. Go to project
2. Analytics → Functions
3. View performance metrics
```

### Database Monitoring
- Connection count
- Query performance
- Disk usage
- Backup status

## Scaling Considerations

### Horizontal Scaling
- Database replication
- Load balancing
- Multiple backend instances
- CDN for static assets

### Vertical Scaling
- Upgrade instance size
- Increase memory
- More CPU cores
- SSD storage

## Cost Optimization

### Free Tier Services
- **Render:** Free tier available
- **Vercel:** Free tier for frontend
- **PlanetScale:** Free tier MySQL
- **Total Cost:** $0-50/month for small projects

### Cost Reduction
1. Use free tier during development
2. Optimize database queries
3. Enable caching
4. Compress static assets
5. Use CDN

## Troubleshooting Deployment

### Backend Won't Start
1. Check logs in Render dashboard
2. Verify environment variables
3. Check package.json start script
4. Test locally first

### Frontend Build Fails
1. Check build logs
2. Verify Node.js version
3. Clear cache: `npm ci`
4. Check for missing dependencies

### Database Connection Fails
1. Verify credentials
2. Check firewall/security groups
3. Test connection locally
4. Check certificate (if SSL)

### CORS Errors
```javascript
// In backend server.js:
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## Backup & Recovery

### Database Backup
```bash
# Manual backup
mysqldump -h host -u user -p database > backup.sql

# Automated backups (recommended)
# Use PlanetScale or RDS automatic backups
```

### Code Backup
```bash
# Git already backs up your code
# Keep multiple branches for safety
git push origin main
```

## Security in Production

- ✅ Change all default credentials
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS/SSL
- ✅ Configure firewall rules
- ✅ Set up WAF (Web Application Firewall)
- ✅ Enable audit logging
- ✅ Regular security updates
- ✅ Monitor failed login attempts

## Performance Optimization in Production

1. **Database:** Add indexes, optimize queries
2. **Caching:** Implement Redis
3. **API:** Pagination, filtering
4. **Frontend:** Code splitting, lazy loading
5. **CDN:** Static asset distribution
6. **Compression:** gzip enabled
7. **Monitoring:** APM tools

## Support & Documentation

- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/docs
- MySQL Docs: https://dev.mysql.com/doc/
- Error Tracking: Sentry.io or similar

---

**Your EMS is now ready for production! 🚀**
