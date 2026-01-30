import React from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Employee Details</h1>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600">Employee ID: {id}</p>
        <p className="text-gray-600 mt-2">Detailed view coming soon...</p>
      </div>
    </div>
  );
};

export default EmployeeDetail;
