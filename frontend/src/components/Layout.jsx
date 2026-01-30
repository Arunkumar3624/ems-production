import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">EMS</h1>
          <p className="text-sm text-gray-400 mt-1">Employee Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" label="Dashboard" icon="📊" />
          <NavLink to="/employees" label="Employees" icon="👥" />
          <NavLink to="/departments" label="Departments" icon="🏢" />
          <NavLink to="/attendance" label="Attendance" icon="📅" />
          <NavLink to="/payroll" label="Payroll" icon="💰" />
          <NavLink to="/performance" label="Performance" icon="⭐" />
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
              <p className="text-gray-600 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">🔔</button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">⚙️</button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ to, label, icon }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default Layout;
