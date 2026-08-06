import React from 'react';

export default function BlogDetailPage({ onNavigate, blog }) {
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-slate-50 text-slate-800">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg border border-slate-200 p-8 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-4">Blog post not found</h1>
          <p className="text-sm text-slate-500 mb-6">Please return to Publications and choose a blog post to read.</p>
          <button
            onClick={() => onNavigate('blogs')}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
          >
            Back to Publications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-8">
        <button
          onClick={() => onNavigate('blogs')}
          className="text-sm font-bold text-blue-700 hover:text-blue-900"
        >
          ← Back to Publications
        </button>

        {blog.image && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <img src={blog.image} alt={blog.title} className="w-full object-cover max-h-96" />
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">{blog.title}</h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 mb-8">
            <p>By {blog.author}</p>
            <p>{new Date(blog.created_at).toLocaleDateString()}</p>
          </div>
          <div className="prose prose-slate max-w-none text-sm leading-7">
            {blog.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
