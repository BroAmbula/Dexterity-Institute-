import React from 'react';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogsPage() {
  const blogs = [
    {
      title: "Bridging the Gap: Mental Resilience in the Modern Kenyan Workplace",
      author: "Dr. Sylvester J. O. Odanga",
      date: "July 12, 2026",
      category: "Mental Health Research",
      summary: "Exploring the psychological adaptation challenges that recent university graduates experience during their initial six months of professional employment.",
      readTime: "6 min read"
    },
    {
      title: "Why Standard CVs are Failing Young Professionals—And How to Pivot",
      author: "Charles O. Ondijo",
      date: "June 28, 2026",
      category: "Career Crafting",
      summary: "A practical evaluation of functional portfolio building, narrative positioning, and micro-credential certifications.",
      readTime: "4 min read"
    },
    {
      title: "Synthesizing Digital Business Models for Social Transformation",
      author: "Godwin O. Saka",
      date: "May 15, 2026",
      category: "Entrepreneurship",
      summary: "How upcoming incubation setups can maximize structural digital business mechanics without scaling setup costs.",
      readTime: "5 min read"
    }
  ];

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

        {/* Featured Big Blog */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-blue-900 bg-blue-100/60 px-3 py-1.5 rounded-full inline-block">
              Primary Academic Feature
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
              Behavioral Economics and Mentorship Ecosystems in SSA Secondary Institutions
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A comprehensive policy analysis of structured mentoring frameworks in sub-Saharan high schools, mapping long-term occupational selection behaviors against localized early psychological mentoring strategies.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium text-slate-500 pt-2">
              <span className="flex items-center gap-1.5"><User size={14} /> Dr. Sylvester J. O. Odanga</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> August 2026 Issue</span>
            </div>
          </div>
          <div className="lg:col-span-5 h-[220px] bg-slate-900 rounded-2xl flex flex-col justify-center p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
            <BookOpen size={48} className="text-red-500 mb-4" />
            <h4 className="font-extrabold">Direct PDF Resource</h4>
            <p className="text-xs text-gray-300 mt-1">Download complete institutional synthesis report on behavioral mentoring strategies.</p>
            <button className="text-xs text-red-400 font-bold mt-4 hover:text-white transition inline-flex items-center gap-1">
              Read Paper <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Secondary Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div key={i} className="flex flex-col justify-between border-b border-slate-200 pb-8 md:border-b-0 md:pb-0">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase">
                  {blog.category}
                </span>
                <h3 className="text-xl font-bold text-slate-950 leading-snug hover:text-blue-900 transition cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>By {blog.author}</span>
                <span className="text-slate-400">{blog.readTime}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}