import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Download, ShieldCheck } from 'lucide-react';
import { getApiBaseUrl } from './apiConfig';

export default function ProductCheckout({ onNavigate, product }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const isFree = Number(product?.price_kes) === 0 && Number(product?.price_usd) === 0;
  const isLoggedIn = !!localStorage.getItem('user_role');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <p className="text-lg font-bold text-slate-900 mb-4">No product selected.</p>
          <button
            onClick={() => onNavigate('blogs')}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 transition"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <p className="text-lg font-bold text-slate-900 mb-4">Login Required</p>
          <p className="text-sm text-slate-500 mb-6">Please login to access the checkout page for this product.</p>
          <button
            onClick={() => onNavigate('student-login')}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setError('');
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
      const response = await fetch(`${getApiBaseUrl()}/api/products/${product.id}/purchase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product.id }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Checkout failed.');

      if (isFree) {
        onNavigate('free-downloads');
      } else {
        alert(result.message || 'Purchase successful. You can now download your product from your dashboard.');
        onNavigate('student-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Checkout could not be completed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <button
            onClick={() => onNavigate('blogs')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft size={16} /> Back to Marketplace
          </button>
          <div className="mt-4">
            <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-bold">Checkout</p>
            <h1 className="text-3xl font-black text-slate-950 mt-3">{product.title}</h1>
            <p className="text-sm text-slate-500 mt-2">{product.type === 'book' ? 'Book download' : 'Course bundle access'}</p>
          </div>
        </div>

        <div className="p-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Product details</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{product.title}</h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              {product.type === 'course' && product.course_outline && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">Course outline</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc list-inside">
                    {JSON.parse(product.course_outline || '[]').map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Order summary</span>
              <div className="mt-4 text-3xl font-black text-slate-950">
                {isFree ? 'Free' : `KSh ${Number(product.price_kes).toLocaleString()}`}
              </div>
              {!isFree && <p className="text-sm text-slate-500 mt-2">or USD ${Number(product.price_usd).toFixed(2)}</p>}
            </div>

            {error && <div className="bg-red-50 text-red-700 p-3 rounded-2xl mb-4 text-xs font-bold">⚠️ {error}</div>}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-900 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800 transition disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : isFree ? 'Download Now' : 'Purchase Now'}
            </button>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>Secure checkout. Your payment is encrypted and handled safely.</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="flex items-center gap-2 mb-3">
                <Download size={16} />
                <span>Instant access</span>
              </div>
              <p>{isFree ? 'Free downloads are available immediately after checkout.' : 'A payment receipt will be sent once the purchase is complete.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
