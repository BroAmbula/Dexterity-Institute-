import React, { useState } from 'react';
import { Search, Clock, BarChart, GraduationCap, ChevronRight, Filter, ShieldCheck, X, DollarSign, Smartphone } from 'lucide-react';

export default function CoursePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currencyInKES, setCurrencyInKES] = useState(true);

  const schools = [
    'All',
    'School of CareerCraft',
    "Eagle's Nest Incubation Hub",
    'School of Personal Development',
    'School of Leadership'
  ];

  const courses = [
    // --- School of CareerCraft ---
    {
      id: 1,
      title: "CareerCraft Primary",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "4 Weeks",
      deliveryMode: "In-Person Workshops",
      eligibility: "Primary School Students (Ages 9-12)",
      feeUSD: 40,
      exchangeRate: 130,
      description: "Early childhood self-awareness discovery, foundational curiosity building, and cognitive interest mapping frameworks tailored for younger minds."
    },
    {
      id: 2,
      title: "CareerCraft Junior Secondary",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "6 Weeks",
      deliveryMode: "Hybrid",
      eligibility: "Junior Secondary Students",
      feeUSD: 55,
      exchangeRate: 130,
      description: "Subject selection preparation, introductory critical thinking, and collaborative team-building mechanics for early teenage transitions."
    },
    {
      id: 3,
      title: "CareerCraft Senior Secondary",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "8 Weeks",
      deliveryMode: "Hybrid (Virtual + Weekend In-Person)",
      eligibility: "Senior Secondary / High School Students",
      feeUSD: 75,
      exchangeRate: 130,
      description: "Pre-university planning, vocational profiling, structured communication fundamentals, and transitional psychological adjustment tools."
    },
    {
      id: 4,
      title: "CareerCraft Campus",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "10 Weeks",
      deliveryMode: "Online Blended",
      eligibility: "Undergraduates & College Students",
      feeUSD: 100,
      exchangeRate: 130,
      description: "Academic balancing strategies, leadership modeling, personal brand architecture, and early internship positioning pathways."
    },
    {
      id: 5,
      title: "CareerCraft Graduate Launch",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "6 Weeks",
      deliveryMode: "Intensive Hybrid",
      eligibility: "Recent Graduates & Job Seekers",
      feeUSD: 120,
      exchangeRate: 130,
      description: "Tactical resume engineering, professional portfolio building, interview simulation chambers, and workplace culture acculturation."
    },
    {
      id: 6,
      title: "CareerCraft Career Climber",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "8 Weeks",
      deliveryMode: "Evening / Weekend Virtual",
      eligibility: "Early to Mid-Level Professionals",
      feeUSD: 180,
      exchangeRate: 130,
      description: "Advanced corporate negotiation, structural performance optimization, high-impact public presenting, and corporate positioning."
    },
    {
      id: 7,
      title: "CareerCraft Career Pivot",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "12 Weeks",
      deliveryMode: "Blended Cohort Learning",
      eligibility: "Professionals Changing Industries",
      feeUSD: 220,
      exchangeRate: 130,
      description: "Transferable skills audit, cross-industry network mapping, and modern capability restructuring plans for smooth occupation switches."
    },
    {
      id: 8,
      title: "CareerCraft Peak Performance",
      school: "School of CareerCraft",
      tagline: "CareerCraft provides age- and career-stage-specific guidance from primary school through professional career advancement.",
      duration: "4 Weeks",
      deliveryMode: "Exclusive Executive Cohort",
      eligibility: "Executives & Senior Management",
      feeUSD: 350,
      exchangeRate: 130,
      description: "Advanced mental resilience models, holistic lifestyle harmony, macro organizational influence, and legacy leadership development."
    },

    // --- Eagle's Nest Business Incubation Hub ---
    {
      id: 9,
      title: "Startup Launch",
      school: "Eagle's Nest Incubation Hub",
      duration: "12 Weeks",
      deliveryMode: "Incubator Hub / On-site",
      eligibility: "Aspiring Founders with Verified Concepts",
      feeUSD: 150,
      exchangeRate: 130,
      description: "Ideation vetting, MVP architecture, basic customer discovery, and initial business legalization steps."
    },
    {
      id: 10,
      title: "Business Growth",
      school: "Eagle's Nest Incubation Hub",
      duration: "16 Weeks",
      deliveryMode: "Hybrid Workspace Access",
      eligibility: "Early-stage operational businesses",
      feeUSD: 250,
      exchangeRate: 130,
      description: "Customer acquisition loops, systematic sales modeling, branding, and early operational team structure."
    },
    {
      id: 11,
      title: "Business Expansion",
      school: "Eagle's Nest Incubation Hub",
      duration: "24 Weeks",
      deliveryMode: "Strategic Coaching Sessions",
      eligibility: "Profitable SMBs ready to scale markets",
      feeUSD: 400,
      exchangeRate: 130,
      description: "Multi-regional scaling frameworks, automation processes, capital deployment, and franchise/channel mapping."
    },
    {
      id: 12,
      title: "Business Excellence",
      school: "Eagle's Nest Incubation Hub",
      duration: "8 Weeks",
      deliveryMode: "Masterclass Series",
      eligibility: "Established Corporate and SMB Directors",
      feeUSD: 500,
      exchangeRate: 130,
      description: "Corporate governance architectures, world-class operational compliance, IP protection, and optimization strategy."
    },
    {
      id: 13,
      title: "Business Turnaround",
      school: "Eagle's Nest Incubation Hub",
      duration: "10 Weeks",
      deliveryMode: "Private Consultative Cohort",
      eligibility: "Struggling or Stagnant Enterprises",
      feeUSD: 450,
      exchangeRate: 130,
      description: "Debt restructuring, product-market fit audits, overhead reduction, and strategic pivot planning execution."
    },

    // --- School of Personal Development ---
    {
      id: 14,
      title: "Foundations of Personal Development",
      school: "School of Personal Development",
      duration: "4 Weeks",
      deliveryMode: "Virtual / Self-Paced Available",
      eligibility: "Open to All",
      feeUSD: 30,
      exchangeRate: 130,
      description: "Mindset realignment frameworks, paradigm shifted self-analysis, and setting actionable personal objectives."
    },
    {
      id: 15,
      title: "Physical Well-being and Healthy Living",
      school: "School of Personal Development",
      duration: "6 Weeks",
      deliveryMode: "Hybrid Classes",
      eligibility: "Open to All",
      feeUSD: 45,
      exchangeRate: 130,
      description: "Somatic health awareness, sleep hygiene science, stress physiology management, and nutritional basics."
    },
    {
      id: 16,
      title: "Mental Growth and Lifelong Learning",
      school: "School of Personal Development",
      duration: "6 Weeks",
      deliveryMode: "Virtual Live Trimester",
      eligibility: "Open to All",
      feeUSD: 50,
      exchangeRate: 130,
      description: "Advanced speed-reading, cognitive mapping models, logic analysis, and building permanent informational memory systems."
    },
    {
      id: 17,
      title: "Achievement, Productivity, and Time Management",
      school: "School of Personal Development",
      duration: "4 Weeks",
      deliveryMode: "Online Interventions",
      eligibility: "Students & Professionals",
      feeUSD: 60,
      exchangeRate: 130,
      description: "Deep work design, digital distraction removal, calendar framework execution, and procrastination management."
    },
    {
      id: 18,
      title: "Communication and Relationship Skills",
      school: "School of Personal Development",
      duration: "6 Weeks",
      deliveryMode: "Interactive Workshop Hub",
      eligibility: "Open to All",
      feeUSD: 70,
      exchangeRate: 130,
      description: "Active listening training, interpersonal boundaries blueprinting, emotional intelligence mastery, and conflict resolution."
    },
    {
      id: 19,
      title: "Career and Financial Development",
      school: "School of Personal Development",
      duration: "8 Weeks",
      deliveryMode: "Hybrid Classroom",
      eligibility: "Young Adults & Families",
      feeUSD: 90,
      exchangeRate: 130,
      description: "Personal cashflow frameworks, basic investing avenues, diversification strategy, and wealth protection models."
    },
    {
      id: 20,
      title: "Purpose, Values, and Character Development",
      school: "School of Personal Development",
      duration: "6 Weeks",
      deliveryMode: "In-Person Small Groups",
      eligibility: "Open to All",
      feeUSD: 80,
      exchangeRate: 130,
      description: "Ethical reasoning systems, inner core value definitions, and authentic individual branding anchored on character integrity."
    },

    // --- School of Leadership ---
    {
      id: 21,
      title: "Emerging Leaders (Youth Leadership)",
      school: "School of Leadership",
      duration: "6 Weeks",
      deliveryMode: "Hybrid Classrooms",
      eligibility: "Ages 16 - 24 Only",
      feeUSD: 50,
      exchangeRate: 130,
      description: "Self-leadership development, community organization mechanics, project planning, and peer-to-peer accountability systems."
    },
    {
      id: 22,
      title: "Workplace Leadership",
      school: "School of Leadership",
      duration: "8 Weeks",
      deliveryMode: "Virtual Corporate Timings",
      eligibility: "Supervisors, Managers & Team Leads",
      feeUSD: 160,
      exchangeRate: 130,
      description: "Managing operational dynamics, delegation structures, goal-setting strategy, and team motivation psychological practices."
    },
    {
      id: 23,
      title: "Non-Profit Leadership",
      school: "School of Leadership",
      duration: "10 Weeks",
      deliveryMode: "Online Blended Learning",
      eligibility: "NGO Workers, Founders, and Grant Managers",
      feeUSD: 140,
      exchangeRate: 130,
      description: "Grant tracking procedures, compliance structures, stakeholder relationship modeling, and localized sustainable impact mapping."
    },
    {
      id: 24,
      title: "Community and Volunteer Leadership",
      school: "School of Leadership",
      duration: "6 Weeks",
      deliveryMode: "In-Person Field Training",
      eligibility: "Community Activists & Change Agents",
      feeUSD: 40,
      exchangeRate: 130,
      description: "Mobilizing local volunteer pools, project sustainability frameworks, and communication channels with institutional partners."
    }
  ];

  const filteredCourses = activeTab === 'All' 
    ? courses 
    : courses.filter(c => c.school === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,rgba(30,58,138,0.3),transparent)]" />
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="text-red-500 font-bold uppercase tracking-wider text-xs">Curriculum Catalog</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Develop Specialized Lifeskills</h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Explore professional, research-informed developmental programs designed to bridge the gap between academic theory and institutional workforce execution.
            </p>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-slate-500 mb-4 font-semibold text-xs uppercase tracking-wider">
            <Filter size={16} /> Filter by Academy/School
          </div>
          <div className="flex flex-wrap gap-2">
            {schools.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-900 border-blue-900 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div className="p-6 sm:p-8 space-y-4">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md inline-block">
                  {course.school}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{course.title}</h3>
                
                {course.tagline && (
                  <p className="text-xs font-medium italic text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {course.tagline}
                  </p>
                )}
                
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-900" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-900" />
                    <span className="truncate">{course.deliveryMode}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-red-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-sm"
                >
                  Learn More & Apply <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DYNAMIC COMPREHENSIVE COURSE MODAL DETAIL ELEMENT */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-900 text-white">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-red-400">
                  {selectedCourse.school}
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">{selectedCourse.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white/80 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content Core */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow">
              
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Overview</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedCourse.description}</p>
              </div>

              {/* Data Specifications Grid Layout */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Duration</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Delivery Mode</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourse.deliveryMode}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/60">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Eligibility Requirements</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourse.eligibility}</p>
                </div>
              </div>

              {/* FEES DISPLAY ZONE */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                  <div>
                    <p className="text-xs font-bold text-blue-950">Tuition & Registration Fee</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">
                      {currencyInKES ? (
                        <span>KES {(selectedCourse.feeUSD * selectedCourse.exchangeRate).toLocaleString()}</span>
                      ) : (
                        <span>USD ${selectedCourse.feeUSD}</span>
                      )}
                    </p>
                  </div>

                  <button 
                    onClick={() => setCurrencyInKES(!currencyInKES)}
                    className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100 transition shadow-xs flex items-center gap-1.5"
                  >
                    Display in {currencyInKES ? 'USD ($)' : 'KES (Sh)'}
                  </button>
                </div>

                {currencyInKES && (
                  <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-100 text-xs">
                    <Smartphone size={20} className="text-emerald-600 flex-shrink-0" />
                    <p className="leading-relaxed">
                      <strong>Kenyan User Detection:</strong> Direct local integration supports localized payments via standard safe Lipa Na <strong>M-Pesa Express</strong> channels instantly.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Form Intent Button Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-4">
              <button 
                onClick={() => setSelectedCourse(null)}
                className="w-full bg-white border text-slate-700 font-bold text-sm py-3 rounded-xl hover:bg-slate-100 transition text-center"
              >
                Cancel
              </button>
              <button 
                onClick={() => onNavigate('student-payments')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 rounded-xl transition text-center shadow-md flex items-center justify-center gap-1"
              >
                Proceed to Apply <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}