import React, { useState, useEffect } from 'react';
import API from '../axios';
import { getApiBaseUrl } from '../apiConfig';

export default function AddProduct({ onBack }) {
  const [form, setForm] = useState({ title: '', description: '', type: 'book', price_kes: '', price_usd: '' });
  const [isFree, setIsFree] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [myProducts, setMyProducts] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/products`);
      if (res.ok) setMyProducts(await res.json());
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (isFree) {
      data.set('price_kes', '0');
      data.set('price_usd', '0');
    }
    if (file) data.append('file', file);

    try {
      await API.post('/super-admin/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Digital asset uploaded! Downloads will be securely gated behind payment verification.');
      setForm({ title: '', description: '', type: 'book', price_kes: '', price_usd: '' });
      setFile(null);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload product package.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await API.delete(`/super-admin/products/${id}`);
      setMyProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 my-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-800">
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
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <input
                id="freeBook"
                type="checkbox"
                checked={isFree}
                onChange={() => setIsFree(prev => !prev)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="freeBook" className="text-sm font-bold text-gray-700">
                Publish as a free book
              </label>
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
                value={isFree ? '0' : form.price_kes} 
                onChange={e => setForm({...form, price_kes: e.target.value})} 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm font-semibold" 
                required 
                disabled={isFree}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Price (USD)</label>
              <input 
                type="number" 
                placeholder="15.00"
                value={isFree ? '0' : form.price_usd} 
                onChange={e => setForm({...form, price_usd: e.target.value})} 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm font-semibold" 
                required 
                disabled={isFree}
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

      {/* Manage existing products */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-800">
        <h3 className="text-lg font-extrabold text-gray-950 mb-4">Your Uploaded Books & Bundles</h3>
        {loadingList && <p className="text-xs text-gray-400 font-bold">Loading...</p>}
        {!loadingList && myProducts.length === 0 && (
          <p className="text-xs text-gray-400 font-bold">No products uploaded yet.</p>
        )}
        <div className="space-y-3">
          {myProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
              <div>
                <p className="font-bold text-sm text-gray-900">{product.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {product.type === 'book' ? 'Book' : 'Course Bundle'} • KSh {Number(product.price_kes).toLocaleString()} / ${product.price_usd}
                </p>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                disabled={deletingId === product.id}
                className="text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg transition disabled:opacity-50"
              >
                {deletingId === product.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}