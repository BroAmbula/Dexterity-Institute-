import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://dexterity-institute-production.up.railway.app';
      const response = await fetch(`${apiBaseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password.');
      }

      const payload = data?.data && typeof data.data === 'object' ? data.data : data;
      const user = payload?.user ?? (typeof payload?.role === 'string' ? payload : null);
      const token = payload?.token || payload?.access_token;

      if (!token || !user || typeof user.role !== 'string') {
        throw new Error('The server returned an incomplete login response. Please try again or contact support.');
      }

      // 1. Store dynamic details securely in local storage
      localStorage.setItem('dex_token', token);
      localStorage.setItem('dex_user_role', user.role);
      localStorage.setItem('dex_user_name', user.name || '');

      // 2. Direct user straight to their corresponding control dashboard
      if (user.role === 'SUPER_ADMIN') {
        window.location.href = '/super-admin/dashboard';
      } else if (user.role === 'ADMIN') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/student/dashboard';
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-gray-800">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-950">Access Dexterity</h2>
          <p className="text-xs text-gray-400 mt-1">Provide credentials to enter your management or student space.</p>
        </div>

        {/* Dynamic Errors */}
        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-3.5 rounded-xl border border-red-100 mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Input fields */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1.5">Registered Email</label>
            <input 
              type="email" 
              placeholder="name@dexterity.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-blue-600 text-sm font-semibold"
              required 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1.5">Secret Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-blue-600 text-sm font-semibold"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition text-sm mt-6"
            disabled={loading}
          >
            {loading ? 'Verifying Credentials...' : 'Access Dashboard ➔'}
          </button>
        </form>

      </div>
    </div>
  );
}
