import React, { useState, useEffect } from 'react';
import API from '../axios';
import { getApiBaseUrl } from '../apiConfig';

export default function AddCourse({ onBack }) {
  const [form, setForm] = useState({
    title: '',
    school: '',
    description: '',
    duration: '',
    delivery_mode: '',
    eligibility: '',
    fee_usd: '',
    exchange_rate: '130',
  });
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const loadCourses = async () => {
    setLoadingCourses(true);
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/courses`);
      if (response.ok) {
        setCourses(await response.json());
      } else {
        const data = await response.json();
        console.error('Failed to load courses', data);
      }
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await API.post('/super-admin/courses', {
        ...form,
        fee_usd: Number(form.fee_usd),
        exchange_rate: Number(form.exchange_rate),
        is_active: isActive,
      });

      setSuccess('Course created successfully. It will appear on the public Courses page.');
      setForm({
        title: '',
        school: '',
        description: '',
        duration: '',
        delivery_mode: '',
        eligibility: '',
        fee_usd: '',
        exchange_rate: '130',
      });
      setIsActive(true);
      loadCourses();
    } catch {
      setError('Failed to create the course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 my-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-950">Add a Course for the Public Course Catalog</h2>
            <p className="text-xs text-gray-400 mt-1">
              Super admin can publish new courses here. Active courses are immediately available on the public Courses page.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsActive((prev) => !prev)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {isActive ? 'Active on Public Site' : 'Draft / Hidden'}
            </button>
            {onBack && (
              <button onClick={onBack} className="text-xs font-bold text-blue-600 hover:underline">
                ← Back to Command Center
              </button>
            )}
          </div>
        </div>

        {success && <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl mb-6 text-xs font-bold">✓ {success}</div>}
        {error && <div className="bg-red-50 text-red-700 p-3.5 rounded-xl mb-6 text-xs font-bold">! {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Course Title</label>
              <input
                type="text"
                placeholder="Advanced Leadership Practice"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">School / Program</label>
              <input
                type="text"
                placeholder="School of Leadership"
                value={form.school}
                onChange={(e) => handleChange('school', e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Duration</label>
              <input
                type="text"
                placeholder="8 Weeks"
                value={form.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Delivery Mode</label>
              <input
                type="text"
                placeholder="Online / Hybrid"
                value={form.delivery_mode}
                onChange={(e) => handleChange('delivery_mode', e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Eligibility</label>
            <textarea
              rows="3"
              placeholder="Who should enroll in this course?"
              value={form.eligibility}
              onChange={(e) => handleChange('eligibility', e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Course Description</label>
            <textarea
              rows="5"
              placeholder="Write a summary of what this course includes."
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Fee (USD)</label>
              <input
                type="number"
                step="0.01"
                placeholder="150.00"
                value={form.fee_usd}
                onChange={(e) => handleChange('fee_usd', e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Exchange Rate</label>
              <input
                type="number"
                step="0.01"
                placeholder="130"
                value={form.exchange_rate}
                onChange={(e) => handleChange('exchange_rate', e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition shadow-md"
          >
            {loading ? 'Publishing Course...' : 'Publish Course to Catalog'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-gray-950">Active Course Catalog Preview</h3>
            <p className="text-xs text-gray-400">Courses created by super admin appear here once live.</p>
          </div>
          <button
            onClick={loadCourses}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Refresh list
          </button>
        </div>
        {loadingCourses ? (
          <p className="text-xs text-gray-400">Loading course list...</p>
        ) : courses.length === 0 ? (
          <p className="text-xs text-gray-400">No active courses published yet.</p>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-sm text-slate-900">{course.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{course.school}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">Live</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
