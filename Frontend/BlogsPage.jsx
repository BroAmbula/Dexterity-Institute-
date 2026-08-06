import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, BookOpen, Download } from 'lucide-react';
import { getApiBaseUrl } from './apiConfig';

export default function BlogsPage({ onNavigate }) {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const base = getApiBaseUrl();
        const [blogsRes, productsRes] = await Promise.all([
          fetch(`${base}/api/blogs`),
          fetch(`${base}/api/products`),
        ]);
        if (blogsRes.ok) setBlogs(await blogsRes.json());
        if (productsRes.ok) setProducts(await productsRes.json());
      } catch (err) {
        console.error('Failed to load publications/products', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Knowledge Base</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Publications & Research Insights</h1>
          <p className="text-slate-600">
            Read critical perspectives on behavioral psychology, student placement methodologies, vocational alignment, and small business strategy from our leadership directors.
          </p>
        </div>

        {loading && <p className="text-slate-400 text-sm font-bold mb-8">Loading publications...</p>}

        {/* Featured Big Blog - shows the most recent real post if one exists */}
        {featured && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-blue-900 bg-blue-100/60 px-3 py-1.5 rounded-full inline-block">
                Latest Feature
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                {featured.title}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {featured.summary}
              </p>
              <div className="flex items-center gap-6 text-xs font-medium text-slate-500 pt-2">
                <span className="flex items-center gap-1.5"><User size={14} /> {featured.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(featured.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('blog-detail', featured)}
                className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
              >
                Read featured article
              </button>
            </div>
            <div className="lg:col-span-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 min-h-[260px]">
              {featured.image ? (
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <BookOpen size={48} className="text-red-500 mb-4" />
                    <h4 className="font-extrabold text-white">System Announcement</h4>
                    <p className="text-xs text-gray-300 mt-1">Published directly by the Dexterity Super Admin team.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-bold mb-16">No publications yet. Check back soon.</div>
        )}

        {/* Secondary Blog Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {rest.map((blog) => (
              <div key={blog.id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="mb-5 h-48 w-full rounded-3xl object-cover" />
                )}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase">
                    Announcement
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                  <span>By {blog.author}</span>
                  <span className="text-slate-400">{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('blog-detail', blog)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
                >
                  Read article
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Digital Books & Course Bundles */}
        {products.length > 0 && (
          <div>
            <div className="max-w-2xl mb-10 space-y-2">
              <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Marketplace</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Digital Books & Course Bundles</h2>
              <p className="text-slate-600 text-sm">Downloadable resources available for purchase.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                      {product.type === 'book' ? 'Book' : 'Course Bundle'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-950">{product.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3">{product.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-black text-slate-900">KSh {Number(product.price_kes).toLocaleString()}</span>
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <Download size={12} /> ${product.price_usd}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}