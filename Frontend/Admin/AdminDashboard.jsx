import React, { useState, useEffect } from 'react';
import { apiRequest } from '../apiConfig';

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    active_students: 0,
    pending_applications: 0,
    completed_courses: 0
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetching stats and the latest applications queue
        const [statsData, appsData] = await Promise.all([
          apiRequest('/api/admin/dashboard/stats'),
          apiRequest('/api/admin/enrollments') 
        ]);
        
        setStats(statsData);
        setRecentApplications(appsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950">Operations Control</h1>
          <p className="text-gray-500">Day-to-day class registries, student profiling, and applications review.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-4 rounded-xl border border-red-100 mb-6">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="text-gray-400 font-semibold mb-8">Loading admin metrics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase">My Active Students</span>
              <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.active_students}</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-amber-500 uppercase">Awaiting Admission Review</span>
              <h3 className="text-3xl font-black text-amber-500 mt-2">{stats.pending_applications}</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase">Graduated to Date</span>
              <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.completed_courses}</h3>
            </div>
          </div>
        )}

        {/* Live Application Pipeline */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-950">Active Applications Queue</h2>
            <button 
              onClick={() => onNavigate('admin-enrollments')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              View All Queue ➔
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {recentApplications.length === 0 ? (
              <p className="text-sm text-gray-400">No recent applications to display.</p>
            ) : recentApplications.slice(0, 5).map((app) => (
              <div key={app.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-gray-900">{app.student_name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Applied to: <span className="font-semibold text-gray-600">{app.course_title}</span></p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-gray-400">{new Date(app.created_at).toLocaleDateString()}</span>
                  <button 
                    onClick={() => onNavigate('application-review', app)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                  >
                    Process
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}