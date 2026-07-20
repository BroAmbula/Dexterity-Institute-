import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../apiConfig';

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch student's real-time academic tracks on load
  useEffect(() => {
    const fetchMyTracks = async () => {
      try {
        // FIXED: Using 'token' to match what we saved in Register.jsx
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/student/my-tracks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch enrollment tracks.');
        }

        setEnrollments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTracks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-semibold">
        Syncing academic records with the server...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-950">
              Welcome back!
            </h1>
            <p className="text-gray-500">Track your current application files, school fees, and program modules.</p>
          </div>
          <a href="/student/catalog" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition">
            Browse Course Catalog ➔
          </a>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-4 rounded-xl border border-red-100 mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Program Status Board */}
        <h2 className="text-xl font-extrabold text-gray-950 mb-4">My Academic Track</h2>
        
        {enrollments.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-400 font-medium">You are not currently enrolled in any programs.</p>
            <a href="/student/catalog" className="text-blue-600 hover:text-blue-700 font-bold text-sm mt-2 inline-block">
              Apply for your first class now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((item) => {
              const feeInKES = item.fee_usd * item.exchange_rate;
              
              return (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">
                          {item.school}
                        </span>
                        <h3 className="text-lg font-black text-gray-900 mt-2">{item.course_title}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-50 py-4 my-4">
                      <div>
                        <span className="text-xs text-gray-400 font-semibold uppercase">Admission</span>
                        <p className={`text-sm font-black mt-0.5 ${
                          item.application_status === 'APPROVED' ? 'text-emerald-600' : 'text-amber-500'
                        }`}>
                          {item.application_status}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 font-semibold uppercase">Payment</span>
                        <p className={`text-sm font-black mt-0.5 ${
                          item.payment_status === 'PAID' ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {item.payment_status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    {item.application_status === 'APPROVED' && item.payment_status === 'UNPAID' ? (
                      <div className="flex items-center justify-between gap-4 bg-red-50/50 p-3 rounded-xl border border-red-100/50">
                        <div>
                          <p className="text-[11px] text-gray-400 font-bold">TUITION DUE</p>
                          <p className="text-sm font-black text-gray-900">
                            ${item.fee_usd} <span className="text-xs text-gray-400 font-medium">(~ KSh {feeInKES.toLocaleString()})</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => window.location.href = `/student/payment?enrollment=${item.id}`}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition"
                        >
                          Pay Tuition
                        </button>
                      </div>
                    ) : item.application_status === 'PENDING' ? (
                      <p className="text-xs text-gray-400 font-medium italic text-center py-2 bg-gray-50 rounded-lg">
                        Your application is being reviewed by admissions staff.
                      </p>
                    ) : (
                      <button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded-xl text-sm transition">
                        Enter Virtual Classroom
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}