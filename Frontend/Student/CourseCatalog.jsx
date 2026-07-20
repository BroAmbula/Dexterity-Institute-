import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../apiConfig';

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submittingId, setSubmittingId] = useState(null);

  // Pull live active courses from Laravel database
  useEffect(() => {
    const fetchActiveCourses = async () => {
      try {
        const token = localStorage.getItem('dex_token');
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/student/active-courses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load course list.');
        }

        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCourses();
  }, []);

  // Submit application to Supabase
  const handleApply = async (courseId) => {
    setSubmittingId(courseId);
    setError('');

    try {
      const token = localStorage.getItem('dex_token');
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/student/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ course_id: courseId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not submit enrollment.');
      }

      alert('Success! Your application has been logged and sent for Admin review.');
      window.location.href = '/student/dashboard'; // Route back to see the pending status

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-semibold">
        Fetching live curriculum catalog...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950">System Curriculum Catalog</h1>
          <p className="text-gray-500">Secure an academic track across our four customized, specialized schools.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-4 rounded-xl border border-red-100 mb-6">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => {
            // Each course stores its own global exchange rate from Super Admin controls
            const exchangeRate = course.exchange_rate || 130.00;
            const kesPrice = course.fee_usd * exchangeRate;

            return (
              <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">
                    {course.school}
                  </span>
                  
                  <h3 className="text-lg font-black text-gray-900 mt-3 mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{course.description || 'No description provided.'}</p>

                  {/* Metadata Specs */}
                  <div className="flex gap-4 text-xs font-bold text-gray-400 mb-6">
                    <div>⏳ {course.duration || 'Flexible'}</div>
                    <div>💻 {course.delivery_mode || 'Online'}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">Tuition cost</span>
                      <span className="font-black text-gray-900 text-lg">${course.fee_usd} USD</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">Local Conversion</span>
                      <span className="font-black text-emerald-600 text-sm">KSh {kesPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleApply(course.id)}
                    disabled={submittingId !== null}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-sm transition disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    {submittingId === course.id ? 'Filing Application...' : 'Apply for Enrollment'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
