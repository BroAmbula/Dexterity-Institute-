import React, { useState } from 'react';
import { ShieldAlert, Mail, Lock, User, ArrowRight } from 'lucide-react';

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type={type}
      className="block w-full pl-10 pr-3 py-3 border border-gray-700 bg-black text-white rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default function SuperAdminRegister({ onNavigate }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', accessKey: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering Super Admin:', formData);
    // TODO: Connect to backend auth/registration API
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <ShieldAlert size={48} className="mx-auto text-red-600 mb-4" />
        <h2 className="text-3xl font-extrabold text-white">Create Root Account</h2>
        <p className="mt-2 text-sm text-red-400">Restricted Testing Access</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-2xl rounded-lg border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField icon={User} type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <InputField icon={Mail} type="email" placeholder="Root Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <InputField icon={Lock} type="password" placeholder="Master Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            
            <div className="mt-6">
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition">
                Initialize Root Access <ArrowRight size={18} />
              </button>
            </div>
          </form>
          <button onClick={() => onNavigate('super-admin-login')} className="mt-6 w-full text-center text-xs text-gray-500 hover:text-white">
            Already have an account? Sign in.
          </button>
        </div>
      </div>
    </div>
  );
}