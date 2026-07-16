import React, { useState, useEffect } from 'react';

export default function SuperAdminDashboard() {
  const [metrics, setMetrics] = useState({
    revenue_usd: 12540.00,
    revenue_kes: 1630200.00,
    total_students: 412,
    pending_reviews: 14,
    conversion_rate: 68.4
  });

  const [schoolDistribution, setSchoolDistribution] = useState([
    { name: 'School of CareerCraft', students: 185, color: 'bg-blue-600' },
    { name: "Eagle's Nest Incubation Hub", students: 94, color: 'bg-emerald-600' },
    { name: 'School of Personal Development', students: 112, color: 'bg-purple-600' },
    { name: 'School of Leadership', students: 21, color: 'bg-amber-500' }
  ]);

  // Placeholder for real backend integration later
  useEffect(() => {
    // fetch('/api/admin/dashboard/stats').then(...)
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950">Super Admin Command Center</h1>
          <p className="text-gray-500">Global financial oversight and academic distribution matrices.</p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase">Revenue (USD)</span>
            <h3 className="text-2xl font-black text-gray-900 mt-2">${metrics.revenue_usd.toLocaleString()}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase">Revenue (KES)</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-2">KSh {metrics.revenue_kes.toLocaleString()}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase">Active Students</span>
            <h3 className="text-2xl font-black text-gray-900 mt-2">{metrics.total_students}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase">Pending Applications</span>
            <h3 className="text-2xl font-black text-amber-500 mt-2">{metrics.pending_reviews}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase">Conversion Rate</span>
            <h3 className="text-2xl font-black text-blue-600 mt-2">{metrics.conversion_rate}%</h3>
          </div>

        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* School Distribution Metrics */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-950 mb-6">Student Distribution</h2>
            <div className="space-y-6">
              {schoolDistribution.map((school, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>{school.name}</span>
                    <span className="text-gray-500">{school.students} Students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${school.color}`} 
                      style={{ width: `${(school.students / metrics.total_students) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-950 mb-4">Super Admin Tools</h2>
            <p className="text-xs text-gray-500 mb-6">Direct access to critical administrative pipelines.</p>
            
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition text-left text-sm flex justify-between">
                <span>Manage Global Exchange Rates</span>
                <span>➔</span>
              </button>
              <button className="w-full py-3 px-4 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition text-left text-sm flex justify-between">
                <span>Configure Staff Access</span>
                <span>➔</span>
              </button>
              <button className="w-full py-3 px-4 bg-amber-50 text-amber-700 font-semibold rounded-xl hover:bg-amber-100 transition text-left text-sm flex justify-between">
                <span>Verify M-Pesa Discrepancy</span>
                <span>➔</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}