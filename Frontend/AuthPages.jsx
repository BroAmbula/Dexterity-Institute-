import React, { useState } from 'react';
import { Mail, Lock, GraduationCap, Shield, ShieldAlert, ArrowRight } from 'lucide-react';

// --- Shared UI Components ---

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type={type}
      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

// --- 1. Student Login ---

export const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Login Attempt:', { email, password });
    // TODO: Connect to Student Auth API
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-900 mb-2">
          <GraduationCap size={48} />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
          Student Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back! Access your courses and certificates.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-blue-600">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Student Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign In to Learning Hub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- 2. Admin Login ---

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Login Attempt:', { email, password });
    // TODO: Connect to Admin Auth API
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-white mb-2">
          <Shield size={48} />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Manage courses, students, and institutional data.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border-t-4 border-red-600">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Staff Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- 3. Super Admin Login ---

export const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState(''); // Extra layer for Super Admin

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Super Admin Login Attempt:', { email, password, securityCode });
    // TODO: Connect to Super Admin Auth API
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-red-600 mb-2">
          <ShieldAlert size={48} />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
          System Root Access
        </h2>
        <p className="mt-2 text-center text-sm text-red-400 font-medium">
          Restricted Area. Super Administrator Only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Root Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Master Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Additional 2FA / Security Code field for Super Admins */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Two-Factor Authentication Code</label>
              <input
                type="text"
                className="block w-full px-3 py-3 border border-gray-700 bg-black text-white rounded-lg focus:ring-red-500 focus:border-red-500 text-center tracking-widest font-mono text-lg"
                placeholder="000000"
                maxLength="6"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-white hover:bg-gray-200 transition-colors focus:outline-none">
              Authorize Access <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};