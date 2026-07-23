import React, { useState } from 'react';
import SuperAdminDashboard from './SuperAdminDashboard';
import AddStudent from './AddStudent';
import AddBlog from './AddBlog';
import AddProduct from './AddProduct';

export default function SuperAdminPanel({ onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-800">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-20 shadow-sm gap-4">
        <div className="flex items-center gap-2">
          <span className="font-black text-gray-950 text-base uppercase tracking-wider">Super Admin Portal</span>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setCurrentTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${currentTab === 'dashboard' ? 'bg-gray-950 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Command Center
          </button>
          
          <button 
            onClick={() => setCurrentTab('add-student')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${currentTab === 'add-student' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Enroll Student
          </button>

          <button 
            onClick={() => setCurrentTab('add-blog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${currentTab === 'add-blog' ? 'bg-gray-950 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Publish Blog
          </button>

          <button 
            onClick={() => setCurrentTab('add-course')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${currentTab === 'add-course' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Upload Course / Book
          </button>

          {onLogout && (
            <button 
              onClick={onLogout}
              className="ml-4 px-4 py-2 rounded-xl text-xs font-bold border border-red-200 text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Main View Renderer */}
      <main className="flex-1">
        {currentTab === 'dashboard' && <SuperAdminDashboard onNavigate={setCurrentTab} />}
        {currentTab === 'add-student' && <AddStudent onBack={() => setCurrentTab('dashboard')} />}
        {currentTab === 'add-blog' && <AddBlog onBack={() => setCurrentTab('dashboard')} />}
        {currentTab === 'add-course' && <AddProduct onBack={() => setCurrentTab('dashboard')} />}
      </main>
    </div>
  );
}