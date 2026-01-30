import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    presentToday: 0,
    pendingPayroll: 0
  });
  const [payrollData, setPayrollData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch employees
        const empsRes = await api.get('/employees?limit=1');
        setStats(prev => ({ ...prev, totalEmployees: empsRes.total || 0 }));

        // Fetch departments
        const deptsRes = await api.get('/departments');
        setStats(prev => ({ ...prev, totalDepartments: deptsRes.length || 0 }));

        // Fetch payroll data
        const payrollRes = await api.get('/payroll?limit=100');
        setPayrollData(payrollRes.records || []);

        // Fetch attendance
        const attRes = await api.get('/attendance?limit=100');
        setAttendanceData(attRes.records || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const attendanceStats = [
    { name: 'Present', value: attendanceData.filter(a => a.status === 'present').length, fill: '#10b981' },
    { name: 'Absent', value: attendanceData.filter(a => a.status === 'absent').length, fill: '#ef4444' },
    { name: 'Leave', value: attendanceData.filter(a => a.status.includes('leave')).length, fill: '#f59e0b' }
  ];

  const salaryData = [
    { month: 'Jan', amount: payrollData.filter(p => p.month === 1).reduce((sum, p) => sum + (p.netSalary || 0), 0) / 1000 },
    { month: 'Feb', amount: payrollData.filter(p => p.month === 2).reduce((sum, p) => sum + (p.netSalary || 0), 0) / 1000 },
    { month: 'Mar', amount: payrollData.filter(p => p.month === 3).reduce((sum, p) => sum + (p.netSalary || 0), 0) / 1000 }
  ];

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.firstName || 'User'}! 👋</h1>
        <p className="text-gray-600 mt-2">Here's your HR dashboard overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Employees</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalEmployees}</p>
          <p className="text-xs text-gray-500 mt-2">Active staff members</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Departments</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalDepartments}</p>
          <p className="text-xs text-gray-500 mt-2">Organization units</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Present Today</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{attendanceStats[0].value}</p>
          <p className="text-xs text-gray-500 mt-2">Current attendance</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Payroll This Month</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">${(salaryData[2]?.amount || 0).toFixed(0)}K</p>
          <p className="text-xs text-gray-500 mt-2">Total expenses</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Payroll Expense</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}K`} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" name="Amount ($K)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition">Manage Employees</button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition">View Payroll</button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition">Track Attendance</button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition">Performance Reviews</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
