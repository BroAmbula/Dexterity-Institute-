import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    active_students: 398,
    pending_applications: 14,
    completed_courses: 52
  });

  const [recentApplications, setRecentApplications] = useState([
    { id: '1', name: 'Faith Mutua', course: 'Startup Launch', date: '2026-07-16' },
    { id: '2', name: 'Brian Omondi', course: 'Emerging Leaders', date: '2026-07-15' },
    { id: '3', name: 'Clara Chebet', course: 'CareerCraft Campus', date: '2026-07-15' }
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950">Operations Control</h1>
          <p className="text-gray-500">Day-to-day class registries, student profiling, and applications review.</p>
        </div>

        {/* Actionable Cards Grid */}
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

        {/* Live Application Pipeline */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-950">Active Applications Queue</h2>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All Queue ➔</button>
          </div>

          <div className="divide-y divide-gray-100">
            {recentApplications.map((app) => (
              <div key={app.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-gray-900">{app.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Applied to: <span className="font-semibold text-gray-600">{app.course}</span></p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-gray-400">{app.date}</span>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg transition">
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