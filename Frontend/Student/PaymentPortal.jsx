import React, { useState } from 'react';
import { Smartphone, CreditCard, Lock, ChevronLeft, ShieldCheck } from 'lucide-react';

export default function PaymentPortal({ onNavigate, course }) {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('user_role');
  
  const [currency, setCurrency] = useState('KES'); // Default to KES
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ phone: '', cardNumber: '', cvc: '' });

  // 1. Guard Clause: Authentication Check
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center max-w-sm">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-950 mb-2">Login Required</h2>
          <p className="text-sm text-gray-500 mb-6">You must be logged into the Student Portal to process payments.</p>
          <button 
            onClick={() => onNavigate('student-login')} 
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // 2. Guard Clause: Course Selection
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 text-center">
        <div>
          <p className="font-bold text-lg mb-4">No course selected.</p>
          <button onClick={() => onNavigate('courses')} className="text-blue-600 underline font-bold">Return to Courses</button>
        </div>
      </div>
    );
  }

  const amountKES = course.feeUSD * course.exchangeRate;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API calls
    setTimeout(() => {
      alert(currency === 'KES' 
        ? 'M-Pesa STK Push sent successfully to your phone!' 
        : 'PayPal/Card transaction authorized successfully!');
      setIsProcessing(false);
      onNavigate('student-dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white">
          <button onClick={() => onNavigate('courses')} className="text-slate-400 hover:text-white mb-4 flex items-center gap-1 text-xs font-bold uppercase">
            <ChevronLeft size={14} /> Back
          </button>
          <h2 className="text-xl font-bold">Checkout</h2>
          <p className="text-xs text-slate-400 mt-1">{course.title}</p>
        </div>

        <div className="p-6">
          {/* Currency Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button 
              onClick={() => setCurrency('KES')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${currency === 'KES' ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
            >
              PAY IN KSH
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${currency === 'USD' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              PAY IN USD
            </button>
          </div>

          {/* Amount Display */}
          <div className="mb-6 p-4 border-2 border-dashed rounded-2xl text-center">
            <p className="text-xs text-gray-400 font-bold uppercase">Total Due</p>
            <p className="text-3xl font-black text-gray-900 mt-1">
              {currency === 'KES' ? `KSh ${amountKES.toLocaleString()}` : `$${course.feeUSD}`}
            </p>
          </div>

          {/* Conditional Forms */}
          <form onSubmit={handlePayment} className="space-y-4">
            {currency === 'KES' ? (
              // M-Pesa Form
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex gap-3 items-center">
                  <Smartphone className="text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">M-Pesa Express</p>
                    <p className="text-[10px] text-emerald-700">Enter your M-Pesa registered phone number.</p>
                  </div>
                </div>
                <input 
                  type="tel" 
                  placeholder="07XX XXX XXX" 
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl font-bold text-gray-900"
                />
              </div>
            ) : (
              // Card/PayPal Form
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-center">
                  <CreditCard className="text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-blue-900">Card / PayPal</p>
                    <p className="text-[10px] text-blue-700">Secure international payment gateway.</p>
                  </div>
                </div>
                <input type="text" placeholder="Card Number" required className="w-full p-4 border border-gray-200 rounded-xl text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="MM/YY" required className="p-4 border border-gray-200 rounded-xl text-sm" />
                  <input type="text" placeholder="CVC" required className="p-4 border border-gray-200 rounded-xl text-sm" />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition shadow-lg mt-4 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Complete Payment (${currency})`}
            </button>
            
            <p className="flex items-center justify-center gap-1 text-[10px] text-gray-400 font-bold uppercase mt-4">
              <ShieldCheck size={12} /> Secure 256-bit Encrypted Transaction
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}