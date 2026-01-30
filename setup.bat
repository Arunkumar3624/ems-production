@echo off
REM EMS Setup Script - Automated Setup for Windows Development

echo 🚀 Starting EMS Setup...
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 16+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm not found. Please install npm
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%

REM Setup Backend
echo.
echo Setting up backend...
cd backend

if not exist ".env" (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✅ .env created. Please edit with your MySQL credentials
)

echo 📦 Installing backend dependencies...
call npm install

echo ✅ Backend setup complete!

REM Setup Frontend
echo.
echo Setting up frontend...
cd ..\frontend

echo 📦 Installing frontend dependencies...
call npm install

echo ✅ Frontend setup complete!

REM Summary
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✨ EMS Setup Complete!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo Next Steps:
echo 1. Configure MySQL database:
echo    - Open MySQL Command Line Client
echo    - CREATE DATABASE ems_db;
echo.
echo 2. Edit backend\.env with your MySQL credentials
echo.
echo 3. Initialize database:
echo    - Open Command Prompt in backend folder
echo    - npm run migrate
echo    - npm run seed
echo.
echo 4. Start backend (Command Prompt 1):
echo    cd backend
echo    npm run dev
echo.
echo 5. Start frontend (Command Prompt 2):
echo    cd frontend
echo    npm run dev
echo.
echo 6. Open http://localhost:5173 in your browser
echo.
echo Demo Credentials:
echo Email: admin@ems.com
echo Password: Admin@123
echo.
echo For more help, see QUICKSTART.md
echo.
pause
