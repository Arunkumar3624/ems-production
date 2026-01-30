#!/bin/bash

# EMS Setup Script - Automated Setup for Development

echo "🚀 Starting EMS Setup..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
echo "✅ npm found: $(npm --version)"

if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL not found. Please install MySQL 8.0+"
    echo "   You can still continue, but will need to set up MySQL manually"
fi

# Setup Backend
echo -e "${BLUE}Setting up backend...${NC}"
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env created. Please edit with your MySQL credentials"
fi

echo "📦 Installing backend dependencies..."
npm install

echo "✅ Backend setup complete!"

# Setup Frontend
echo -e "${BLUE}Setting up frontend...${NC}"
cd ../frontend

echo "📦 Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"

# Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ EMS Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Configure MySQL database:"
echo "   mysql -u root -p"
echo "   CREATE DATABASE ems_db;"
echo ""
echo "2. Edit backend/.env with your MySQL credentials"
echo ""
echo "3. Initialize database:"
echo "   cd backend"
echo "   npm run migrate"
echo "   npm run seed"
echo ""
echo "4. Start backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "5. Start frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "6. Open http://localhost:5173 in your browser"
echo ""
echo -e "${YELLOW}Demo Credentials:${NC}"
echo "Email: admin@ems.com"
echo "Password: Admin@123"
echo ""
echo "📚 For more help, see QUICKSTART.md"
