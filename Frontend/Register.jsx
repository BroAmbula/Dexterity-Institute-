import React from 'react';

// Added onRegisterSuccess to the component props
export default function Register({ onNavigate, onRegisterSuccess }) {

  const handleSubmit = (e) => {
    e.preventDefault(); // This stops the page from reloading
    
    // TODO: Add your API call to save the user data here
    
    // Once successful, move the user to the Login page
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-black text-blue-900 mb-6">Create Account</h2>
        
        {/* Added onSubmit handler here */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
            <input type="text" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
            <input type="email" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
            <input type="password" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          
          <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button onClick={() => onNavigate('student-login')} className="text-blue-600 font-bold hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}