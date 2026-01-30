import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Payroll = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const response = await api.get('/payroll?limit=50');
      setRecords(response.records || []);
    } catch (error) {
      console.error('Error fetching payroll:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading payroll records...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Payroll</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Employee</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Period</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Base Salary</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bonus</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Deductions</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Net Salary</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{record.Employee?.name}</td>
                <td className="px-6 py-4 text-sm">{record.month}/{record.year}</td>
                <td className="px-6 py-4 text-sm">${record.baseSalary?.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">${record.bonus?.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">${record.deductions?.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">${record.netSalary?.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    record.status === 'paid' ? 'bg-green-100 text-green-800' :
                    record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
