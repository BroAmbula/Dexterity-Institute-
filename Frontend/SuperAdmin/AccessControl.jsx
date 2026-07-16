import React, { useState } from 'react';

export default function AccessControl() {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Alvin Wekesa', email: 'alvin@dexterity.com', role: 'SUPER_ADMIN', status: 'ACTIVE' },
    { id: 'u2', name: 'Jane Mwende', email: 'mwende.j@gmail.com', role: 'ADMIN', status: 'ACTIVE' },
    { id: 'u3', name: 'John Doe', email: 'j.doe@outlook.com', role: 'STUDENT', status: 'ACTIVE' },
    { id: 'u4', name: 'Mark Limisi', email: 'limisi@gmail.com', role: 'STUDENT', status: 'BANNED' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const changeRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert(`User Role adjusted to ${newRole}`);
  };

  const toggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
    setUsers(users.map(u => u.id === id ? { ...u, status: nextStatus } : u));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Table Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-950">Identity and Access Control</h2>
            <p className="text-xs text-gray-400">Manage user privileges, promote admins, or restrict access.</p>
          </div>
          <input 
            type="text" 
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-blue-600 w-full md:w-64"
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-bold border-b border-gray-100">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role Matrix</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <select 
                      value={user.role} 
                      onChange={(e) => changeRole(user.id, e.target.value)}
                      className="bg-gray-100 border-0 rounded-lg p-1.5 text-xs font-bold text-gray-700 focus:outline-none"
                    >
                      <option value="STUDENT">STUDENT</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleStatus(user.id, user.status)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${user.status === 'ACTIVE' ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {user.status === 'ACTIVE' ? 'Ban Access' : 'Reinstate'}
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