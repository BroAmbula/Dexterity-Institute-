import React, { useState } from 'react';
import API from '../../utils/axios';

export default function AddProduct({ onBack }) {
  const [form, setForm] = useState({ title: '', description: '', type: 'book', price_kes: '', price_usd: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (file) data.append('file', file);

    try {
      await API.post('/super-admin/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Digital asset uploaded! Downloads will be securely gated behind payment verification.');
      setForm({ title: '', description: '', type: 'book', price_kes: '', price_usd: '' });
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload product package.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 my-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-950">Upload Digital Book or Course Bundle</h2>
          <p className="text-xs text-gray-400 mt-1">Sell downloadable textbooks or full course packages for instructors to teach.</p>
        </div>
        {onBack && (
          <button onClick={onBack} className="text-xs font-bold text-blue-600 hover:underline">
            ← Back to Command Center
          </button>
        )}
      </div>

      {success && <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl mb-6 text-xs font-bold">✅ {success}</div>}
      {error && <div className="bg-red-50 text-red-700 p-3.5 rounded-xl mb-6 text-xs font-bold">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Product Type</label>
            <select 
              value={form.type} 
              onChange={e => setForm({...form, type: e.target.value})} 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm bg-white font-semibold"
            >
              <option value="book">Book (Downloadable eBook)</option>
              <option value="course">Course Bundle (For Instructors to Teach)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Product Title</label>
            <input 
              type="text" 
              placeholder="Advanced Laravel Architecture Guide"
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm font-semibold" 
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Price (KES)</label>
            <input 
              type="number" 
              placeholder="1500"
              value={form.price_kes} 
              onChange={e => setForm({...form, price_kes: e.target.value})} 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm font-semibold" 
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Price (USD)</label>
            <input 
              type="number" 
              placeholder="15.00"
              value={form.price_usd} 
              onChange={e => setForm({...form, price_usd: e.target.value})} 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm font-semibold" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Secure Download File (PDF / ZIP Bundle)</label>
          <input 
            type="file" 
            onChange={e => setFile(e.target.files[0])} 
            className="w-full border border-gray-200 p-2 rounded-xl text-sm bg-gray-50" 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Description & Material Overview</label>
          <textarea 
            rows="4" 
            placeholder="Describe what is included in this bundle..."
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            className="w-full border border-gray-200 p-3 rounded-xl text-sm font-semibold" 
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition shadow-md"
        >
          {loading ? 'Uploading Package...' : 'Publish Product to Marketplace ➔'}
        </button>
      </form>
    </div>
  );
}