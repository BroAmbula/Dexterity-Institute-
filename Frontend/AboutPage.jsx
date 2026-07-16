import React from 'react';
import { ShieldCheck, Target, Heart, Award, ChevronRight } from 'lucide-react';

// --- Direct Local Image Imports (matching your exact file system spelling) ---
import CharlseOOndijo from './Charlse O Ondijo.jpeg'; // Spelled 'Charlse' in your sidebar!
import DrSylvesterOdanga from './Dr Sylivester Odanga.jpeg'; // Spelled 'Sylivester' in your sidebar!
import GodwinOSaka from './Godwin O Saka.jpeg';
import GuyOOwino from './Guy O Owino.jpeg';
import RachelOnyango from './Rachel Onyango.jpeg';
import ReubenSiso from './Reuben Siso.jpeg';
import WinnieWadera from './Winnie Wadera.jpeg';

export default function AboutPage() {
  
  // Leadership team structured data
  const leadershipTeam = [
    {
      name: "Dr. Sylvester J. O. Odanga",
      role: "Founder & Executive Director",
      description: "Educational Psychologist, Researcher, Author, and Career Development specialist.",
      image: DrSylvesterOdanga
    },
    {
      name: "Charles O. Ondijo",
      role: "Director and Chairperson",
      description: "Technical and Vocational Training Expert.",
      image: CharlseOOndijo
    },
    {
      name: "Guy O. Owino",
      role: "Director and Chairperson",
      description: "Educational and Adolescent Expert.",
      image: GuyOOwino
    },
    {
      name: "Reuben O. Siso",
      role: "Member",
      description: "Business Development Strategist and Entrepreneur.",
      image: ReubenSiso
    },
    {
      name: "Godwin O. Saka",
      role: "Member",
      description: "Digital Business Expert.",
      image: GodwinOSaka
    },
    {
      name: "Winnie Wadera Kiriga",
      role: "Member",
      description: "Life skills, Communication and Online Business Expert.",
      image: WinnieWadera
    },
    {
      name: "Rachel A. Onyango",
      role: "Member",
      description: "Community Development and Gender Specialist.",
      image: RachelOnyango
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* SECTION 1: About Dexterity Initiative (Hero) */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 px-6 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.4),transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">Who We Are</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              About Dexterity Initiative
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              We are a dedicated lifeskills institute bridging the crucial gap between academic systems and practical real-world success. Our methodology pairs behavioral psychology, robust research, and experiential career mentoring to foster thriving, complete individuals.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-200">
                <Target size={16} className="text-blue-400" /> Fully Accredited
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-200">
                <ShieldCheck size={16} className="text-red-400" /> Evidence-Based Programs
              </div>
            </div>
          </div>
          <div className="md:col-span-5 h-[350px] bg-slate-800 rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
            {/* Visual element / abstract graphic matching site style */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 to-red-900/50 mix-blend-multiply" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold">Empowering Young Minds</h3>
              <p className="text-sm text-gray-300 mt-2">Connecting education, research-backed mental resilience, and functional employability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Meet the Leadership Team */}
      {/* Placed precisely after 'About Dexterity Initiative' and before 'Programs'[cite: 1] */}
      <section className="py-24 px-6 sm:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Introduction[cite: 1] */}
          <div className="max-w-3xl mb-16">
            <span className="text-red-600 font-bold uppercase tracking-wider text-sm block mb-2">Our Guides</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Meet the Leadership Team[cite: 1]
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Experienced professionals committed to empowering people, strengthening institutions, and transforming futures through research, education, career development, and mental health promotion.[cite: 1]
            </p>
          </div>

          {/* Grid Layout for Team Members[cite: 1] */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {leadershipTeam.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
              >
                {/* Photo frame */}
                <div className="h-64 bg-slate-100 relative overflow-hidden group">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      // Fallback placeholder in case files fail to resolve locally
                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/60 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded backdrop-blur-sm">
                    {member.name === "Dr. Sylvester J. O. Odanga" ? "Founder" : "Directorate"}
                  </div>
                </div>

                {/* Details card */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-red-600 mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Concluding Team statement[cite: 1] */}
          <div className="bg-blue-950 text-white rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-y-10 translate-x-10 pointer-events-none">
              <Award size={300} />
            </div>
            <div className="max-w-4xl relative z-10">
              <p className="text-lg md:text-xl font-medium leading-relaxed italic">
                "Our leadership team brings together expertise in education, psychology, research, business, and community development, united by a shared commitment to empowering people, strengthening institutions, and transforming futures."[cite: 1]
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Programs Section (Transitions from About) */}
      <section className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Where We Head Next</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Explore Our Programs
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We synthesize core research into highly specialized learning tracts. From institutional organizational training to individual youth career coaching, our programs are optimized for systemic long-term advancement.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-red-100 rounded-full mt-1 text-red-600">
                    <ChevronRight size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-950">CareerCraft Programs</h4>
                    <p className="text-sm text-slate-600">Employability and tactical skills designed for secondary grads and college alumni.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-blue-100 rounded-full mt-1 text-blue-900">
                    <ChevronRight size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-950">Eagle's Nest Incubation Hub</h4>
                    <p className="text-sm text-slate-600">A business and innovation incubator fueling upcoming entrepreneurs.</p>
                  </div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition duration-250 shadow-md">
                Browse Curriculum <ChevronRight size={16} />
              </button>
            </div>

            <div className="bg-slate-100 rounded-3xl p-8 relative overflow-hidden min-h-[350px] flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-blue-950/20" />
              <div className="relative z-10 text-center max-w-sm mx-auto space-y-4">
                <p className="text-red-600 font-semibold uppercase tracking-wider text-xs">Admissions</p>
                <h3 className="text-2xl font-bold text-slate-900">Ready to begin your transition journey?</h3>
                <p className="text-slate-600 text-sm">Join thousands of students and change-makers refining their life skills this session.</p>
                <div className="pt-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-md transition">
                    Enroll Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}