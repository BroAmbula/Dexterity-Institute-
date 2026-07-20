import React, { useState } from 'react';
import { apiRequest } from './apiConfig';

export default function Register({ onNavigate, onRegisterSuccess }) {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', password_confirmation: '' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('register');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiRequest('/api/register', { method: 'POST', body: JSON.stringify(formData) });
      setNotice(data.message);
      setStep('verify');
    } catch (err) {
      setError(err.message || 'Could not create your account.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiRequest('/api/verify-email', {
        method: 'POST',
        token: null,
        body: JSON.stringify({ email: formData.email, otp }),
      });
      setNotice('Email verified. You can now sign in.');
      onRegisterSuccess?.();
    } catch (err) {
      setError(err.message || 'Could not verify the code.');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/api/resend-verification-code', {
        method: 'POST',
        token: null,
        body: JSON.stringify({ email: formData.email }),
      });
      setNotice(data.message);
    } catch (err) {
      setError(err.message || 'Could not send another code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-black text-blue-900 mb-2">
          {step === 'register' ? 'Create Account' : 'Verify Your Email'}
        </h2>
        {step === 'verify' && <p className="text-sm text-slate-600 mb-6">Enter the six-digit code sent to {formData.email}.</p>}
        {notice && <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {step === 'register' ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-3">
              <input name="first_name" value={formData.first_name} onChange={updateField} placeholder="First name" className="w-full p-3 rounded-lg border border-slate-200" required />
              <input name="last_name" value={formData.last_name} onChange={updateField} placeholder="Last name" className="w-full p-3 rounded-lg border border-slate-200" required />
            </div>
            <input name="email" type="email" value={formData.email} onChange={updateField} placeholder="Email address" className="w-full p-3 rounded-lg border border-slate-200" required />
            <input name="password" type="password" value={formData.password} onChange={updateField} placeholder="Password (at least 8 characters)" className="w-full p-3 rounded-lg border border-slate-200" minLength="8" required />
            <input name="password_confirmation" type="password" value={formData.password_confirmation} onChange={updateField} placeholder="Confirm password" className="w-full p-3 rounded-lg border border-slate-200" required />
            <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 disabled:opacity-60">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerify}>
            <input value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" placeholder="123456" className="w-full p-3 rounded-lg border border-slate-200 text-center text-xl tracking-[0.4em]" maxLength="6" required />
            <button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 disabled:opacity-60">
              {loading ? 'Verifying…' : 'Verify Email'}
            </button>
            <button type="button" onClick={resendCode} disabled={loading} className="w-full text-sm font-bold text-blue-700 hover:underline">Resend code</button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button onClick={() => onNavigate('student-login')} className="text-blue-600 font-bold hover:underline">Login here</button>
        </p>
      </div>
    </div>
  );
}
