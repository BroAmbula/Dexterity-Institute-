import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../apiConfig';

export default function PaymentPortal() {
  const [enrollment, setEnrollment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract enrollment ID from the page URL query
  const searchParams = new URLSearchParams(window.location.search);
  const enrollmentId = searchParams.get('enrollment');

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      if (!enrollmentId) {
        setError('No enrollment ID was provided.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('dex_token');
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/student/my-tracks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (!response.ok) throw new Error('Could not pull payment summary.');

        // Extract the specific enrollment match
        const match = data.find(item => item.id === enrollmentId);
        if (!match) throw new Error('Selected enrollment was not found.');

        setEnrollment(match);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [enrollmentId]);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulated Successful Payment processing
    setTimeout(() => {
      alert('Card payment simulated successfully! Your tuition status has been updated to PAID.');
      setIsProcessing(false);
      window.location.href = '/student/dashboard';
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-semibold">
        Generating secure payment slip...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold p-6 text-center">
        ⚠️ {error}
      </div>
    );
  }

  const amountKES = enrollment.fee_usd * enrollment.exchange_rate;

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        <h2 className="text-xl font-black text-gray-950 mb-2">Secure Tuition Payment</h2>
        <p className="text-xs text-gray-400 mb-6">Complete enrollment for {enrollment.course_title}.</p>

        {/* Invoice Summary */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between text-xs text-gray-400 font-bold uppercase mb-1">
            <span>Amount Due</span>
            <span>Local Total (KES)</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xl font-black text-gray-900">${enrollment.fee_usd} USD</span>
            <span className="text-md font-bold text-emerald-600">KSh {amountKES.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Form (Skipping Mpesa for Card Only simulation) */}
        <div className="bg-gray-100 p-2 text-center text-xs font-bold text-gray-600 rounded-lg mb-4">
          💳 Pay Securely via Credit/Debit Card
        </div>

        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Card Information</label>
              <input 
                type="text" 
                placeholder="Card Number" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-blue-600 text-sm font-semibold" 
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="MM/YY" className="border border-gray-200 p-3 rounded-xl focus:outline-blue-600 text-sm font-semibold" required />
              <input type="text" placeholder="CVC" className="border border-gray-200 p-3 rounded-xl focus:outline-blue-600 text-sm font-semibold" required />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm mt-4"
            disabled={isProcessing}
          >
            {isProcessing ? 'Authorizing with gateway...' : `Pay $${enrollment.fee_usd} USD`}
          </button>
        </form>

      </div>
    </div>
  );
}
