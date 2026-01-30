# EMS Frontend - Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Environment Configuration

### Development (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.prod)
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Features

### Pages Implemented
- ✅ **Login/Register** - User authentication
- ✅ **Dashboard** - Analytics and overview
- ✅ **Employees** - CRUD operations
- ✅ **Departments** - Department management
- ✅ **Attendance** - Track attendance
- ✅ **Payroll** - View payroll data
- ✅ **Performance** - Review management

### Components
- **Layout** - Sidebar navigation and header
- **ProtectedRoute** - Authentication guard
- **API Service** - Centralized HTTP client

### Responsive Design
- Mobile first approach
- Tailwind CSS utilities
- Responsive grid layouts
- Mobile navigation

## Authentication Flow

1. User logs in at `/login`
2. JWT token stored in localStorage
3. Token sent in Authorization header
4. Middleware checks token validity
5. Invalid tokens redirect to login
6. Session persists across page refreshes

## API Integration

### API Service (`src/services/api.js`)
```javascript
// GET request
const data = await api.get('/employees');

// POST request
const result = await api.post('/employees', formData);

// PUT request
await api.put(`/employees/${id}`, updatedData);

// DELETE request
await api.delete(`/employees/${id}`);
```

### Token Management
Token automatically:
- Stored in localStorage
- Sent in all API requests
- Cleared on logout
- Checked on app startup

## State Management (Zustand)

### Auth Store (`src/store/authStore.js`)
```javascript
// Get state
const { user, token } = useAuthStore();

// Update auth
const setAuth = useAuthStore(state => state.setAuth);
setAuth(user, token);

// Logout
const logout = useAuthStore(state => state.logout);
logout();
```

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- Imported in `src/index.css`
- Pre-built components using utilities

### Color Scheme
- Primary: Blue (#2563eb)
- Secondary: Purple (#7c3aed)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)

## Charts & Visualizations

### Recharts Integration
```javascript
import { LineChart, BarChart, PieChart } from 'recharts';

// Line Chart - Payroll trends
// Bar Chart - Department salaries
// Pie Chart - Attendance distribution
```

## Project Structure

```
src/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Employees.jsx
│   ├── Departments.jsx
│   ├── Attendance.jsx
│   ├── Payroll.jsx
│   └── Performance.jsx
├── components/
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
├── services/
│   └── api.js
├── store/
│   └── authStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## Development Workflow

### Hot Module Replacement (HMR)
Vite provides instant updates on file save:
```bash
npm run dev
```

### Build Optimization
```bash
npm run build
# Creates optimized dist/ folder
```

### Preview Production Build
```bash
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port 5173 Already in Use
```bash
# Find and kill process
lsof -i :5173
kill -9 <PID>
```

### API Connection Error
1. Ensure backend is running on port 5000
2. Check VITE_API_URL in .env
3. Verify CORS is enabled in backend
4. Check browser console for errors

### Token Expiration
- Tokens expire after 7 days (configurable in backend)
- Clear localStorage and login again
- Token auto-refreshed on page reload

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## Performance Optimization

### Code Splitting
Routes are automatically code-split by Vite

### Image Optimization
Use optimized image formats (WebP, JPEG)

### Bundle Analysis
```bash
npm run build  # Check dist/ size
```

## Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set `VITE_API_URL` environment variable
4. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Set Build command: `npm run build`
3. Set Publish directory: `dist`
4. Add environment variables
5. Deploy

### Self-Hosted
1. Build: `npm run build`
2. Upload `dist/` folder to server
3. Configure web server for SPA routing
4. Set API URL in production

## Environment Variables

### Required
- `VITE_API_URL` - Backend API endpoint

### Optional
- `VITE_APP_NAME` - Application name
- `VITE_LOG_LEVEL` - Logging level

## Testing

### Manual Testing Checklist
- [ ] Login with all user roles
- [ ] CRUD operations for employees
- [ ] View attendance records
- [ ] Check payroll calculations
- [ ] Performance review creation
- [ ] Responsive design on mobile
- [ ] API error handling
- [ ] Token expiration handling

## Production Checklist

- [ ] Set production API URL
- [ ] Build successfully
- [ ] Test in production environment
- [ ] Monitor error logs
- [ ] Setup analytics
- [ ] Configure error tracking
- [ ] Enable HTTPS
- [ ] Setup backup strategy

## Performance Metrics (Target)

- Page Load: < 3s
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Support

For issues:
1. Check browser console for errors
2. Verify API connection
3. Check .env configuration
4. Review main README.md
5. Check GitHub issues

---

**Frontend is production-ready and optimized for performance!**
