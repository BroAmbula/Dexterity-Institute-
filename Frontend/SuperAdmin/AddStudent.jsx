import React, { useState } from 'react';

export default function AddStudent({ onBack }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://dexterity-institute-production.up.railway.app';

      const response = await fetch(`${baseUrl}/api/super-admin/students`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to enroll student.');
      }

      setMessage('Student successfully enrolled!');
      setFormData({ name: '', email: '', password: '', phone: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-gray-950">Enroll New Student</h1>
        <button onClick={onBack} className="text-xs font-bold text-gray-500 hover:text-gray-900">
          ← Back to Dashboard
        </button>
      </div>

      {message && <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-4 text-sm font-bold">{message}</div>}
      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4 text-sm font-bold">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Temporary Password</label>
          <input 
            type="password" 
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
          <input 
            type="text" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? 'Enrolling...' : 'Save Student Account'}
        </button>
      </form>
    </div>
  );
}