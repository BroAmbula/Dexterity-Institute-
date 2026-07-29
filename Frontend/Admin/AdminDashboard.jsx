import React, { useState, useEffect } from 'react';
import { Users, Clock, GraduationCap, ArrowRight, AlertTriangle } from 'lucide-react';
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
        const [statsData, appsData] = await Promise.all([
          apiRequest('/api/admin/dashboard/stats'),
          apiRequest('/api/admin/enrollments')
        ]);

        setStats(statsData);
        setRecentApplications(Array.isArray(appsData) ? appsData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const initials = (name) => (name || '?')
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto p-6 sm:p-8">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-blue-700 font-bold uppercase tracking-wider text-xs">Operations</span>
            <h1 className="text-3xl font-extrabold text-slate-950 mt-1">Operations Control</h1>
            <p className="text-slate-500 text-sm mt-1">Day-to-day class registries, student profiling, and applications review.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-semibold p-4 rounded-2xl mb-6 flex items-center gap-2">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">My Active Students</span>
              <h3 className="text-4xl font-black text-slate-950 mt-2">
                {loading ? <span className="text-slate-200">—</span> : stats.active_students}
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">
              <Users size={20} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">Awaiting Admission Review</span>
              <h3 className="text-4xl font-black text-amber-500 mt-2">
                {loading ? <span className="text-slate-200">—</span> : stats.pending_applications}
              </h3>
            </div>
            <div className="bg-amber-50 text-amber-500 p-3 rounded-xl">
              <Clock size={20} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Graduated to Date</span>
              <h3 className="text-4xl font-black text-slate-950 mt-2">
                {loading ? <span className="text-slate-200">—</span> : stats.completed_courses}
              </h3>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
              <GraduationCap size={20} />
            </div>
          </div>
        </div>

        {/* Live Application Pipeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Active Applications Queue</h2>
              <p className="text-xs text-slate-400 mt-0.5">Pending student admissions requiring review</p>
            </div>
            <button
              onClick={() => onNavigate('admin-enrollments')}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
            >
              View All Queue <ArrowRight size={12} />
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-400 text-sm font-semibold">Loading applications...</div>
          ) : recentApplications.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <GraduationCap size={20} />
              </div>
              <p className="text-sm font-bold text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-400 mt-1">There are no pending applications right now.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentApplications.slice(0, 5).map((app) => (
                <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/60 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {initials(app.user?.name)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{app.user?.name || 'Unknown Applicant'}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Applied to: <span className="font-semibold text-slate-600">{app.course?.title || 'General Admission'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                      {new Date(app.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onNavigate('application-review', app)}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}