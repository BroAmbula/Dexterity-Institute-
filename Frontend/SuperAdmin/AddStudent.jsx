import React, { useState } from 'react';
import API from '../../utils/axios';

export default function AddStudent({ onBack }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await API.post('/super-admin/students', formData);
      setSuccess('Student successfully enrolled and registered!');
      setFormData({ name: '', email: '', password: '', phone: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 my-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-950">Enroll Student Manually</h2>
          <p className="text-xs text-gray-400 mt-1">Create an active student profile directly into the system database.</p>
        </div>
        {onBack && (
          <button onClick={onBack} className="text-xs font-bold text-blue-600 hover:underline">
            ← Back to Command Center
          </button>
        )}
      </div>

      {success && <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl mb-6 text-xs font-bold">✅ {success}</div>}
      {error && <div className="bg-red-50 text-red-700 p-3.5 rounded-xl mb-6 text-xs font-bold">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600 font-semibold" 
            required 
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Email Address</label>
          <input 
            type="email" 
            placeholder="student@dexterity.com"
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600 font-semibold" 
            required 
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Temporary Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600 font-semibold" 
            required 
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Phone Number</label>
          <input 
            type="text" 
            placeholder="+2547XXXXXXXX"
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600 font-semibold" 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition text-sm mt-4 shadow-md"
        >
          {loading ? 'Saving Student Profile...' : 'Complete Manual Enrollment ➔'}
        </button>
      </form>
    </div>
  );
}