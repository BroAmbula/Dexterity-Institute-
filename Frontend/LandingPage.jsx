import React from 'react';
import { ChevronRight, CheckCircle2, Shield, Target, Award, ArrowUpRight } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const stats = [
    { value: "4+", label: "Specialized Schools" },
    { value: "100%", label: "Research-Informed Content" },
    { value: "2026", label: "Active Cohort Trimester" },
    { value: "Non-Profit", label: "CLG Legal Status" }
  ];

  return (
    <div className="bg-white text-slate-800">
      
      {/* Hero Core Segment */}
      <section className="bg-slate-900 text-white px-6 sm:px-8 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(30,58,138,0.35),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(220,38,38,0.1),transparent)]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10 inline-block">
              Lifeskills Institute & Systems
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
              Empowering People.<br />
              <span className="text-blue-400">Strengthening Institutions.</span><br />
              Transforming Futures.
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Synthesizing occupational behavioral psychology, academic structural frameworks, and incubation tracks to build resilient human ecosystems across Kenya and beyond.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onNavigate('partner')} 
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-xl text-sm font-bold transition flex items-center gap-2 shadow-lg hover:shadow-red-600/20"
              >
                Partner With Us <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => onNavigate('courses')} 
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-7 py-4 rounded-xl text-sm font-bold transition flex items-center gap-2"
              >
                Explore Course Syllabus <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 h-[400px] bg-slate-950/60 rounded-3xl overflow-hidden border border-white/10 p-8 flex flex-col justify-between relative hidden lg:flex shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-blue-400">
                <Target size={24} />
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Active Session
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">Eagle's Nest Incubation Hub</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nurturing emerging commercial ventures and startups from early functional launch validation layouts up through corporate excellence metrics.
              </p>
              <button 
                onClick={() => onNavigate('courses')}
                className="text-xs text-red-400 font-bold flex items-center gap-1 hover:text-white transition pt-2"
              >
                View Incubator Stages <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Statistics Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-10 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-2xl sm:text-4xl font-black text-blue-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Operational Schools Summary Blocks */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-red-600 font-extrabold text-xs uppercase tracking-wider">Framework Infrastructure</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Systemic Specialized Schools</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We deliver learning tracts explicitly optimized to target emotional maturity frameworks, vocational safety profiles, and corporate leadership advancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-extrabold text-lg text-slate-900">School of CareerCraft</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Age- and career-stage-specific guidance from primary school through professional career advancement.
              </p>
            </div>
            <button onClick={() => onNavigate('courses')} className="text-xs font-bold text-blue-900 hover:text-red-600 transition flex items-center gap-1">
              Browse Tracks <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-extrabold text-lg text-slate-900">Eagle's Nest Hub</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic business journeys addressing Startup Launch, Growth, Expansion, Excellence, and Turnaround.
              </p>
            </div>
            <button onClick={() => onNavigate('courses')} className="text-xs font-bold text-blue-900 hover:text-red-600 transition flex items-center gap-1">
              View Journeys <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-extrabold text-lg text-slate-900">School of Personal Dev</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mastering foundational productivity, physical well-being, lifelong communication skills, and character integrity.
              </p>
            </div>
            <button onClick={() => onNavigate('courses')} className="text-xs font-bold text-blue-900 hover:text-red-600 transition flex items-center gap-1">
              Explore Topics <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-extrabold text-lg text-slate-900">School of Leadership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A rigorous tract tracking executive excellence across workplace teams, youth pipelines, non-profits, and communities.
              </p>
            </div>
            <button onClick={() => onNavigate('courses')} className="text-xs font-bold text-blue-900 hover:text-red-600 transition flex items-center gap-1">
              Analyze Curriculums <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}