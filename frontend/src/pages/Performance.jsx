import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Performance = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceReviews();
  }, []);

  const fetchPerformanceReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/performance?limit=50');
      setReviews(response.reviews || []);
    } catch (error) {
      console.error('Error fetching performance reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading performance reviews...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Performance Reviews</h1>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{review.Employee?.name}</h3>
                <p className="text-gray-600 text-sm">Period: {review.period}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{review.rating}/5</div>
                <p className="text-gray-600 text-sm">By: {review.Reviewer?.name}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600">Technical Skills</p>
                <p className="text-lg font-semibold text-gray-800">{review.technicalSkills}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Communication</p>
                <p className="text-lg font-semibold text-gray-800">{review.communication}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Teamwork</p>
                <p className="text-lg font-semibold text-gray-800">{review.teamwork}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Leadership</p>
                <p className="text-lg font-semibold text-gray-800">{review.leadership}</p>
              </div>
            </div>

            {review.review && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-700">{review.review}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                review.status === 'approved' ? 'bg-green-100 text-green-800' :
                review.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {review.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
