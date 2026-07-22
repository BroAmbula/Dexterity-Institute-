import React, { useState } from 'react';

export default function ConfigureStaffModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Ensure your login token key matches what you store upon login (e.g., 'token' or 'dex_token')
    const token = localStorage.getItem('token') || localStorage.getItem('dex_token');
    
    try {
      const response = await fetch('https://dexterity-institute-production.up.railway.app/api/super-admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Admin account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        alert(data.message || 'Failed to create admin account.');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Create Staff Account</h3>
      
      <form onSubmit={handleCreateAdmin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minlength="6"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Role Privilege</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="admin">Operations Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Authorize & Create Account'}
        </button>
      </form>
    </div>
  );
}