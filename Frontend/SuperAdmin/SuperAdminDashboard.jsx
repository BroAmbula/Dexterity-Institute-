import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../apiConfig';

export default function SuperAdminDashboard({ onNavigate }) {
  const [metrics, setMetrics] = useState({
    revenue_usd: 0,
    revenue_kes: 0,
    total_students: 0,
    active_students: 0,
    pending_reviews: 0,
    conversion_rate: 0
  });

  const [schoolDistribution, setSchoolDistribution] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'applications'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        const baseUrl = getApiBaseUrl();
        
        // 1. Fetch Stats
        const response = await fetch(`${baseUrl}/api/super-admin/dashboard/stats`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `Failed to fetch metrics (Status: ${response.status})`);
        }

        const data = await response.json();
        const metricsData = data.metrics || data;
        setMetrics(metricsData);

        const distributionData = data.distribution || metricsData.distribution || [];
        setSchoolDistribution(
          distributionData.map((item) => ({
            ...item,
            color: item.name?.includes('Career') 
              ? 'bg-blue-600' 
              : item.name?.includes('Leadership') 
              ? 'bg-amber-500' 
              : item.name?.includes('Personal') 
              ? 'bg-purple-600' 
              : 'bg-emerald-600'
          }))
        );

        // 2. Fetch Pending Enrollments
        const enrollResponse = await fetch(`${baseUrl}/api/super-admin/enrollments`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (enrollResponse.ok) {
          const enrollData = await enrollResponse.json();
          setEnrollments(Array.isArray(enrollData) ? enrollData : enrollData.enrollments || enrollData.data || []);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleApprove = async (enrollmentId) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
      const baseUrl = getApiBaseUrl();

      const response = await fetch(`${baseUrl}/api/super-admin/enrollments/${enrollmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to approve application');
      }

      // Remove approved item from local state list and update counters
      setEnrollments(prev => prev.filter(item => item.id !== enrollmentId));
      setMetrics(prev => ({
        ...prev,
        pending_reviews: Math.max(0, (prev.pending_reviews || 1) - 1),
        active_students: (prev.active_students || 0) + 1
      }));
      
      setSuccessMsg('Student application approved and successfully enrolled!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalActiveStudents = metrics.active_students || metrics.total_students || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & View Toggles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-950">Super Admin Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Global financial oversight and academic distribution matrices.</p>
          </div>
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('applications')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${currentView === 'applications' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span>Pending Applications</span>
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px]">
                {metrics.pending_reviews || enrollments.length}
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-4 rounded-xl border border-red-100 shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-4 rounded-xl border border-emerald-100 shadow-sm">
            ✨ {successMsg}
          </div>
        )}

        {loading ? (
          <div className="text-xs text-gray-400 font-semibold">Loading super-admin metrics...</div>
        ) : currentView === 'applications' ? (
          /* Applications Approval View */
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-gray-950">Pending Student Applications</h2>
                <p className="text-xs text-gray-400 mt-0.5">Review and approve incoming student admission requests.</p>
              </div>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                ← Back to Dashboard
              </button>
            </div>

            {enrollments.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-xs text-gray-400 space-y-2">
                <p>🎉 All caught up! There are no pending applications.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{enrollment.student_name || enrollment.name || 'Student Applicant'}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        📧 {enrollment.email} {enrollment.phone ? `• 📞 ${enrollment.phone}` : ''}
                      </p>
                      <p className="text-xs font-semibold text-blue-600 mt-1">
                        Course / Track: {enrollment.course_name || enrollment.track || 'General Admission'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApprove(enrollment.id)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                      >
                        Approve & Enroll
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Revenue (USD)</span>
                <h3 className="text-2xl font-black text-gray-900 mt-2">${(metrics.revenue_usd || 0).toLocaleString()}</h3>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Revenue (KES)</span>
                <h3 className="text-2xl font-black text-emerald-600 mt-2">KSh {(metrics.revenue_kes || 0).toLocaleString()}</h3>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Students</span>
                <h3 className="text-2xl font-black text-gray-900 mt-2">{totalActiveStudents.toLocaleString()}</h3>
              </div>

              <div 
                onClick={() => setCurrentView('applications')}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-amber-200 transition"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Applications</span>
                <h3 className="text-2xl font-black text-amber-500 mt-2">{metrics.pending_reviews || enrollments.length || 0}</h3>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Conversion Rate</span>
                <h3 className="text-2xl font-black text-blue-600 mt-2">{metrics.conversion_rate || 0}%</h3>
              </div>
            </div>

            {/* Main Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* School Distribution Metrics */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <h2 className="text-base font-black text-gray-950">Student Distribution</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Live breakdown of active academic registrations.</p>
                </div>

                <div className="space-y-6">
                  {schoolDistribution.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-xs text-gray-400">
                      No school distribution data available.
                    </div>
                  ) : (
                    schoolDistribution.map((school, i) => {
                      const percentage = totalActiveStudents > 0 
                        ? Math.min(100, Math.max(0, (school.students / totalActiveStudents) * 100)) 
                        : 0;
                      
                      return (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span>{school.name}</span>
                            <span className="text-gray-500">{school.students} Students</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${school.color}`} 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Quick Actions Panel Connected to Navigation */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div>
                  <h2 className="text-base font-black text-gray-950">Super Admin Tools</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Direct access to critical administrative pipelines.</p>
                </div>
                
                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => setCurrentView('applications')}
                    className="w-full py-3.5 px-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition text-xs flex justify-between items-center shadow-sm"
                  >
                    <span>Review Pending Applications</span>
                    <span>→</span>
                  </button>

                  <button 
                    onClick={() => onNavigate && onNavigate('add-student')}
                    className="w-full py-3.5 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-xs flex justify-between items-center shadow-sm"
                  >
                    <span>Enroll New Student</span>
                    <span>→</span>
                  </button>

                  <button 
                    onClick={() => onNavigate && onNavigate('add-blog')}
                    className="w-full py-3.5 px-4 bg-gray-950 text-white font-bold rounded-xl hover:bg-gray-800 transition text-xs flex justify-between items-center shadow-sm"
                  >
                    <span>Publish Blog Post</span>
                    <span>→</span>
                  </button>
                  
                  <button 
                    onClick={() => onNavigate && onNavigate('add-course')}
                    className="w-full py-3.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition text-xs flex justify-between items-center shadow-sm"
                  >
                    <span>Upload Course or Book</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}