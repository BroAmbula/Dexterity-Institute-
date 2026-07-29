import React, { useState } from 'react';
import { getApiBaseUrl } from '../apiConfig';

export default function AddAdmin({ onBack }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
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
      const baseUrl = getApiBaseUrl();

      const response = await fetch(`${baseUrl}/api/super-admin/admin`, {
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
        throw new Error(data.message || 'Failed to create admin account.');
      }

      setMessage(`Staff account created! They can now log in at the Admin Login page with this email and password.`);
      setFormData({ name: '', email: '', password: '', role: 'admin' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-gray-950">Add Admin / Staff</h1>
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
            minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Access Level</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="admin">Admin (operational access)</option>
            <option value="super-admin">Super Admin (full system access)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? 'Creating...' : 'Create Staff Account'}
        </button>
      </form>
    </div>
  );
}