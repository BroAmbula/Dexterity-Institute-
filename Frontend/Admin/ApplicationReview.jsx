import React, { useState } from 'react';

export default function ApplicationReview() {
  const [applications, setApplications] = useState([
    { id: 'app_1', student: 'Abdi Ibrahim', course: 'Startup Launch', school: "Eagle's Nest Hub", status: 'PENDING' },
    { id: 'app_2', student: 'Joy Kendi', course: 'Workplace Leadership', school: 'School of Leadership', status: 'PENDING' },
    { id: 'app_3', student: 'Marcus Ochieng', course: 'CareerCraft Senior Secondary', school: 'School of CareerCraft', status: 'REVIEWING' }
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    alert(`Application successfully marked as ${newStatus}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-950">Admissions Processing Center</h2>
          <p className="text-xs text-gray-400">Review student credentials, update processing milestones, and finalize approvals.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-bold border-b border-gray-100">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Program Details</th>
                <th className="p-4">Process State</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-bold text-gray-900">{app.student}</td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-800">{app.course}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{app.school}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      app.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {app.status === 'PENDING' && (
                      <button 
                        onClick={() => updateStatus(app.id, 'REVIEWING')}
                        className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition"
                      >
                        Start Review
                      </button>
                    )}
                    <button 
                      onClick={() => updateStatus(app.id, 'APPROVED')}
                      className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg transition"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(app.id, 'REJECTED')}
                      className="text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}