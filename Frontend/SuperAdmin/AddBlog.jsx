import React, { useState, useEffect } from 'react';
import API from '../axios';
import { getApiBaseUrl } from '../apiConfig';

export default function AddBlog({ onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [myBlogs, setMyBlogs] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadBlogs = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/blogs`);
      if (res.ok) setMyBlogs(await res.json());
    } catch (err) {
      console.error('Failed to load blogs', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    if (image) data.append('image', image);

    try {
      await API.post('/super-admin/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Blog post published live successfully!');
      setTitle('');
      setContent('');
      setImage(null);
      loadBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Error publishing blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await API.delete(`/super-admin/blogs/${id}`);
      setMyBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete blog post.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 my-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-950">Publish System Blog Post</h2>
            <p className="text-xs text-gray-400 mt-1">Broadcast announcements, tech guides, or institutional news.</p>
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
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Blog Title</label>
            <input 
              type="text" 
              placeholder="Future of TVET Education in Kenya..."
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600 font-semibold" 
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Featured Cover Image</label>
            <input 
              type="file" 
              onChange={e => setImage(e.target.files[0])} 
              className="w-full border border-gray-200 p-2 rounded-xl text-sm bg-gray-50" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Content Body</label>
            <textarea 
              rows="8" 
              placeholder="Write your article or curriculum breakdown here..."
              value={content} 
              onChange={e => setContent(e.target.value)} 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-blue-600 font-semibold" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-gray-950 hover:bg-black text-white px-6 py-3.5 rounded-xl font-bold text-sm transition shadow-md"
          >
            {loading ? 'Publishing...' : 'Publish Post Live ➔'}
          </button>
        </form>
      </div>

      {/* Manage existing posts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-800">
        <h3 className="text-lg font-extrabold text-gray-950 mb-4">Your Published Posts</h3>
        {loadingList && <p className="text-xs text-gray-400 font-bold">Loading...</p>}
        {!loadingList && myBlogs.length === 0 && (
          <p className="text-xs text-gray-400 font-bold">No blog posts published yet.</p>
        )}
        <div className="space-y-3">
          {myBlogs.map((blog) => (
            <div key={blog.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
              <div>
                <p className="font-bold text-sm text-gray-900">{blog.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(blog.id)}
                disabled={deletingId === blog.id}
                className="text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg transition disabled:opacity-50"
              >
                {deletingId === blog.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}